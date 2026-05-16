import React, { useState } from 'react';
import { Upload, FileSpreadsheet, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function SmartUploader() {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      toast.success('Database Synchronized', {
        description: '142 New Permits imported to Municipal Grid.',
      });
    }, 2500);
  };

  return (
    <div 
      onClick={handleUpload}
      className="bento-card !p-12 border-dashed border-orange-500/20 flex flex-col items-center justify-center group cursor-pointer hover:bg-orange-500/[0.02] transition-all"
    >
      <div className="w-16 h-16 bg-orange-500/10 rounded-3xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
        {isUploading ? <Loader2 className="animate-spin" size={32} /> : <Upload size={32} />}
      </div>
      <h4 className="text-white font-black text-lg uppercase tracking-tighter italic">Sync Municipal Data</h4>
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Drop CSV or Click to Browse</p>
    </div>
  );
}