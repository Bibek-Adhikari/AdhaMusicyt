import React, { useState } from 'react';
import { X, Globe, Terminal, Check, Copy, ExternalLink, Sparkles } from 'lucide-react';

interface VercelGuideModalProps {
  onClose: () => void;
}

export function VercelGuideModal({ onClose }: VercelGuideModalProps) {
  const [copied, setCopied] = useState(false);

  const vercelJsonContent = `{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`;

  const copyConfig = () => {
    navigator.clipboard.writeText(vercelJsonContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-white/10 text-white border border-white/20 flex items-center justify-center">
            <Globe className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Deploy Adha Music on Vercel</h3>
            <p className="text-xs text-slate-400">Step-by-step guide to launch your app live on Vercel.</p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-slate-300">
          
          {/* Step 1 */}
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">1</span>
              <span>Method A: Deploy via Vercel CLI</span>
            </div>
            <p className="text-slate-400">Run the following commands in your project terminal:</p>
            <div className="bg-slate-900 p-2.5 rounded-xl font-mono text-[11px] text-indigo-300 border border-slate-800 space-y-1">
              <p>npm install -g vercel</p>
              <p>vercel</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">2</span>
              <span>Method B: Deploy via GitHub + Vercel Dashboard</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-slate-400">
              <li>Push your code to a GitHub repository.</li>
              <li>Go to <a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="text-indigo-400 underline inline-flex items-center gap-1">vercel.com/new <ExternalLink className="w-3 h-3" /></a></li>
              <li>Import your GitHub repository and click <strong className="text-white">Deploy</strong>.</li>
            </ol>
          </div>

          {/* Vercel.json configuration preview */}
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs">`vercel.json` included in root:</span>
              <button
                onClick={copyConfig}
                className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied!' : 'Copy vercel.json'}</span>
              </button>
            </div>
            <pre className="bg-slate-900 p-2.5 rounded-xl font-mono text-[11px] text-emerald-400 border border-slate-800 overflow-x-auto">
              {vercelJsonContent}
            </pre>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition"
            >
              Close & Return to App
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
