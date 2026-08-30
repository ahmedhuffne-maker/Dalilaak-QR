import React, { useRef, useState, useEffect } from 'react';
import { 
  Download, 
  Printer, 
  FileText, 
  Copy, 
  Check, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Sparkles,
  Eye,
  SlidersHorizontal,
  Image as ImageIcon,
  QrCode,
  Upload,
  Trash2,
  Dices
} from 'lucide-react';
import confetti from 'canvas-confetti';
import jsPDF from 'jspdf';
import { PosterConfig, PosterFormat } from '../types';
import { renderPosterToCanvas, generateHighResBlob, getDimensionsForFormat } from '../utils/canvasRenderer';
import { MockupViewer } from './MockupViewer';

interface PreviewPanelProps {
  config: PosterConfig;
  onChangeFormat: (format: PosterFormat) => void;
  onChangeConfig?: React.Dispatch<React.SetStateAction<PosterConfig>>;
  onRandomMix?: () => void;
  isRendering: boolean;
  setIsRendering: (state: boolean) => void;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  config,
  onChangeFormat,
  onChangeConfig,
  onRandomMix,
  isRendering,
  setIsRendering
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const qrFileInputRef = useRef<HTMLInputElement>(null);
  const [viewMode, setViewMode] = useState<'canvas' | 'mockup'>('canvas');
  const [zoom, setZoom] = useState<number>(100);
  const [copied, setCopied] = useState(false);
  const [canvasDataUrl, setCanvasDataUrl] = useState<string>('');
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

  // Format list
  const formats: { id: PosterFormat; label: string; desc: string }[] = [
    { id: 'a4_quad', label: 'A4 شيت (4 كروت)', desc: '210 × 297 مم (4 بطاقات للقص)' },
    { id: 'a3_quad', label: 'A3 شيت (4 كروت)', desc: '297 × 420 مم (4 بطاقات كبيرة للقص)' },
    { id: 'a4', label: 'A4 ملصق جداري', desc: '210 × 297 مم (عمودي قياسي)' },
    { id: 'a4_landscape', label: 'A4 أفقي عريض', desc: '297 × 210 مم (أفقي قياسي)' },
    { id: 'a3', label: 'A3 بوستر كبير', desc: '297 × 420 مم (عمودي كبير)' },
    { id: 'a3_landscape', label: 'A3 أفقي عريض', desc: '420 × 297 مم (أفقي كبير)' },
    { id: 'a5', label: 'A5 ستاند طاولة', desc: '148 × 210 مم (طاولات)' },
    { id: 'square', label: 'مربع ستيكر', desc: 'ستيكر 1:1' },
    { id: 'badge', label: 'ستيكر كاشير', desc: 'كارت وكاشير' },
  ];

  // Re-render canvas when config changes
  useEffect(() => {
    let isCancelled = false;

    const render = async () => {
      if (!canvasRef.current) return;
      setIsRendering(true);

      try {
        if (document.fonts) {
          await document.fonts.ready;
        }

        await renderPosterToCanvas(canvasRef.current, config, 1.5);

        if (!isCancelled && canvasRef.current) {
          setCanvasDataUrl(canvasRef.current.toDataURL('image/png'));
        }
      } catch (err) {
        console.error('Render error:', err);
      } finally {
        if (!isCancelled) {
          setIsRendering(false);
        }
      }
    };

    const timeout = setTimeout(render, 50);
    return () => {
      isCancelled = true;
      clearTimeout(timeout);
    };
  }, [config, setIsRendering]);

  // Download High-Res PNG (3x / 300 DPI equivalent)
  const handleDownloadPng = async () => {
    try {
      setIsRendering(true);
      const blob = await generateHighResBlob(config, 3.0);
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const filename = `dalilak-poster-${(config.businessName || 'review').replace(/\s+/g, '-')}-${Date.now()}.png`;
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);

      confetti({
        particleCount: 80,
        spread: 65,
        origin: { y: 0.7 }
      });
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsRendering(false);
    }
  };

  // Export PDF
  const handleExportPdf = async () => {
    try {
      setIsRendering(true);
      const blob = await generateHighResBlob(config, 2.5);
      if (!blob) return;

      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });

      const dims = getDimensionsForFormat(config.format);
      const isLandscape = dims.width > dims.height;
      const isA3 = config.format === 'a3' || config.format === 'a3_landscape' || config.format === 'a3_quad';

      const pdf = new jsPDF({
        orientation: isLandscape ? 'landscape' : 'portrait',
        unit: 'mm',
        format: isA3 ? 'a3' : config.format === 'a5' ? 'a5' : 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(base64, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`dalilak-review-standee-${Date.now()}.pdf`);

      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.7 }
      });
    } catch (err) {
      console.error('PDF export error:', err);
    } finally {
      setIsRendering(false);
    }
  };

  // Direct Browser Print
  const handleDirectPrint = () => {
    if (!canvasDataUrl) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html dir="rtl">
        <head>
          <title>طباعة ملصق تقييم - ${config.businessName}</title>
          <style>
            @page {
              size: auto;
              margin: 0mm;
            }
            body {
              margin: 0;
              padding: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              background: #fff;
            }
            img {
              max-width: 100%;
              max-height: 100vh;
              object-fit: contain;
              display: block;
              margin: auto;
            }
          </style>
        </head>
        <body>
          <img src="${canvasDataUrl}" onload="window.print(); window.close();" />
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Copy to Clipboard
  const handleCopyToClipboard = async () => {
    try {
      const blob = await generateHighResBlob(config, 2.0);
      if (blob && navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.warn('Clipboard write failed:', err);
    }
  };

  const handleQrFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onChangeConfig) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChangeConfig((prev) => ({
          ...prev,
          qrType: 'uploaded',
          uploadedQrDataUrl: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDropFile = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && onChangeConfig) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChangeConfig((prev) => ({
          ...prev,
          qrType: 'uploaded',
          uploadedQrDataUrl: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-slate-900/85 backdrop-blur-xl rounded-3xl border border-slate-800/90 shadow-2xl flex flex-col h-full overflow-hidden">
      
      {/* Top Bar: View Mode Switcher & Zoom Controls */}
      <div className="p-2.5 sm:p-3.5 border-b border-slate-800/80 bg-slate-950/60 flex flex-wrap items-center justify-between gap-2">
        
        {/* View Mode Switcher (Canvas vs Realistic Mockup) */}
        <div className="flex items-center gap-1 bg-slate-850 p-1 rounded-2xl border border-slate-750 shadow-inner">
          <button
            type="button"
            onClick={() => setViewMode('canvas')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[36px] ${
              viewMode === 'canvas'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black scale-100'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>تصميم الملصق</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('mockup')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[36px] ${
              viewMode === 'mockup'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black scale-100'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">المعاينة الواقعية (3D)</span>
            <span className="sm:hidden">معاينة 3D</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Remix Button */}
          {onRandomMix && (
            <button
              type="button"
              onClick={onRandomMix}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 rounded-xl text-xs font-black shadow-md shadow-amber-500/20 transition-all cursor-pointer transform active:scale-95 border border-amber-300/40 min-h-[36px]"
              title="توليد مزج عشوائي متناسق"
            >
              <Dices className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>مزج ✨</span>
            </button>
          )}

          {/* Zoom Controls (Active in Canvas Mode) */}
          {viewMode === 'canvas' && (
            <div className="flex items-center gap-1 bg-slate-850 p-1 rounded-xl border border-slate-750 shadow-sm min-h-[36px]">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(40, z - 15))}
                className="p-1 text-slate-400 hover:text-slate-100 hover:bg-slate-750 rounded-lg transition-colors cursor-pointer"
                title="تصغير"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoom(100)}
                className="text-[11px] font-bold text-slate-200 hover:text-amber-400 px-1 py-0.5 rounded transition-colors cursor-pointer"
                title="100%"
              >
                {zoom}%
              </button>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(150, z + 15))}
                className="p-1 text-slate-400 hover:text-slate-100 hover:bg-slate-750 rounded-lg transition-colors cursor-pointer"
                title="تكبير"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Dedicated Formats Bar: Mobile Scrollable & Touch-Friendly */}
      <div className="px-3 sm:px-4 py-2.5 bg-slate-950/50 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">مقاس القالب:</span>
        </div>

        <div className="flex items-center gap-1.5 flex-nowrap shrink-0">
          {formats.map((fmt) => {
            const isSelected = config.format === fmt.id;
            return (
              <button
                key={fmt.id}
                type="button"
                onClick={() => onChangeFormat(fmt.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 border min-h-[34px] ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm ring-1 ring-amber-500/40 font-black'
                    : 'bg-slate-850 hover:bg-slate-800 text-slate-300 border-slate-750 hover:border-slate-650'
                }`}
                title={fmt.desc}
              >
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />}
                <span>{fmt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hidden File Input for Preview QR Upload */}
      <input
        ref={qrFileInputRef}
        type="file"
        onChange={handleQrFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Interactive Quick QR Code Upload Bar */}
      {onChangeConfig && (
        <div className="px-3 sm:px-4 py-2.5 bg-slate-950/70 border-b border-slate-800/70 flex items-center justify-between gap-3 text-right">
          {config.uploadedQrDataUrl ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2.5">
                <div className="p-1 bg-white rounded-lg shadow shrink-0">
                  <img
                    src={config.uploadedQrDataUrl}
                    alt="QR"
                    className="w-7 h-7 object-contain rounded"
                  />
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    تم دمج رمز QR المخصص
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => qrFileInputRef.current?.click()}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 transition-colors cursor-pointer min-h-[32px]"
                >
                  استبدال
                </button>
                <button
                  type="button"
                  onClick={() => onChangeConfig((p) => ({ ...p, uploadedQrDataUrl: null, qrType: 'generated' }))}
                  className="p-1 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center"
                  title="حذف والرجوع للتلقائي"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div 
              onClick={() => qrFileInputRef.current?.click()}
              className="flex items-center justify-between w-full cursor-pointer group hover:bg-slate-900/60 p-1 rounded-xl transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-200 group-hover:text-amber-300 transition-colors">
                    رفع كود QR مخصص للدمج الفوري
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-lg shadow-sm transition-transform group-hover:scale-105 cursor-pointer shrink-0"
              >
                + رفع الكود
              </button>
            </div>
          )}
        </div>
      )}

      {/* Canvas / Mockup Display Stage with Drag-and-Drop */}
      <div 
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDraggingOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDraggingOver(false);
        }}
        onDrop={handleDropFile}
        className={`flex-1 bg-slate-950/90 p-3 sm:p-6 overflow-auto flex items-center justify-center relative min-h-[380px] sm:min-h-[480px] transition-colors ${
          isDraggingOver ? 'bg-amber-500/10 ring-2 ring-amber-500/60 ring-inset' : ''
        }`}
      >
        
        {/* Drag Overlay Feedback */}
        {isDraggingOver && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm pointer-events-none text-center p-4">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border border-amber-500/60 flex items-center justify-center text-amber-400 mb-3 animate-bounce">
              <Upload className="w-8 h-8" />
            </div>
            <span className="text-sm font-black text-amber-300">أفلت صورة الـ QR Code الآن</span>
            <span className="text-xs text-slate-300 mt-1">سيتم دمج الكود فوراً داخل تصميم الإعلان</span>
          </div>
        )}

        {/* Loading Overlay */}
        {isRendering && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-500/40 text-amber-400 text-xs font-bold shadow-lg animate-pulse">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>جاري التحديث...</span>
          </div>
        )}

        <div 
          className={`transition-transform duration-200 flex items-center justify-center max-w-full ${viewMode === 'canvas' ? '' : 'hidden'}`}
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}
        >
          <canvas
            ref={canvasRef}
            id="poster-canvas"
            className="max-h-[580px] sm:max-h-[640px] max-w-full w-auto object-contain rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-slate-700/60"
          />
        </div>

        {viewMode === 'mockup' && (
          <div className="w-full h-full min-h-[380px]">
            <MockupViewer canvasDataUrl={canvasDataUrl} format={config.format} />
          </div>
        )}

      </div>

      {/* Bottom Export Actions Bar - Mobile-Responsive with Great Touch Targets */}
      <div className="p-3 sm:p-4 border-t border-slate-800/80 bg-slate-950/90 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Export Quality Note */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-[11px] sm:text-xs">توليد عالي الدقة 300 DPI جاهز للطباعة الفورية والمطابع</span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 sm:flex items-center gap-2 w-full sm:w-auto justify-end">
          
          {/* Copy Image */}
          <button
            onClick={handleCopyToClipboard}
            className="inline-flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold py-2.5 px-3 rounded-xl border border-slate-700 transition-colors cursor-pointer min-h-[44px]"
            title="نسخ الصورة للحافظة"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">تم النسخ</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>نسخ الصورة</span>
              </>
            )}
          </button>

          {/* Export PDF */}
          <button
            onClick={handleExportPdf}
            className="inline-flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold py-2.5 px-3 rounded-xl border border-slate-700 transition-colors cursor-pointer min-h-[44px]"
            title="تصدير ملف PDF للطباعة"
          >
            <FileText className="w-3.5 h-3.5 text-rose-400" />
            <span>ملف PDF</span>
          </button>

          {/* Direct Print */}
          <button
            onClick={handleDirectPrint}
            className="inline-flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold py-2.5 px-3 rounded-xl border border-slate-700 transition-colors cursor-pointer min-h-[44px]"
            title="طباعة فورية"
          >
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span>طباعة</span>
          </button>

          {/* Download High Res PNG */}
          <button
            onClick={handleDownloadPng}
            className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black py-2.5 px-4 rounded-xl shadow-lg shadow-amber-500/25 transition-all cursor-pointer active:scale-95 min-h-[44px]"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>تحميل الملصق (PNG)</span>
          </button>

        </div>

      </div>

    </div>
  );
};
