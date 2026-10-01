import React from 'react';
import { ClaimDeduction, ClaimData } from '../types';
import { BookOpen, FileText, CheckCircle2, AlertTriangle, ShieldCheck, X } from 'lucide-react';

interface EvidenceModalProps {
  deduction: ClaimDeduction | null;
  claim: ClaimData;
  onClose: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({
  deduction,
  claim,
  onClose,
}) => {
  if (!deduction) return null;

  const matchedClause = claim.insurancePolicy.clauses.find(
    (c) => c.id === deduction.policyClauseId
  );
  const matchedBillItems = claim.hospitalBill.lineItems.filter((item) =>
    deduction.relatedBillItemIds.includes(item.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-3xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 my-8">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                Evidence Dossier #{deduction.id}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-800">
                {deduction.assessment}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">
              {deduction.category} · Disallowed Amount: ₹{deduction.amount.toLocaleString('en-IN')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Side-by-Side Document Evidence Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Column 1: Hospital Bill Record */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 font-semibold text-slate-900 pb-2 border-b border-slate-200">
              <FileText className="w-4 h-4 text-slate-600" />
              <span>Source Document 1: Hospital Invoice</span>
            </div>
            <div className="space-y-2">
              <div className="text-slate-500">
                Hospital: <strong className="text-slate-800">{claim.hospitalBill.hospitalName}</strong>
              </div>
              <div className="space-y-1.5">
                <span className="font-medium text-slate-700 block">Linked Incurred Items:</span>
                {matchedBillItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-2 bg-white rounded border border-slate-200 flex justify-between items-center"
                  >
                    <div>
                      <div className="font-semibold text-slate-800">{item.name}</div>
                      <div className="text-[10px] text-slate-500">Qty: {item.qty} × ₹{item.unitPrice.toLocaleString('en-IN')}</div>
                    </div>
                    <span className="font-mono font-bold text-slate-900">
                      ₹{item.total.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Policy Clause & Regulatory Standard */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 font-semibold text-slate-900 pb-2 border-b border-slate-200">
              <BookOpen className="w-4 h-4 text-slate-600" />
              <span>Source Document 2: Policy & IRDAI Norms</span>
            </div>
            <div className="space-y-2">
              <div className="text-slate-500">
                Clause: <strong className="text-slate-800">{matchedClause?.section || 'Standard Exclusions'}</strong>
              </div>
              <div className="p-2.5 bg-white rounded border border-slate-200 text-slate-700 italic leading-relaxed">
                "{matchedClause?.exactText || 'Schedule of standard exclusions applies.'}"
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                {matchedClause?.sourceDoc}
              </div>
            </div>
          </div>
        </div>

        {/* Evidence Snippets Table */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-slate-800">
            Documentary Evidence & Regulatory Precedents
          </h4>
          <div className="space-y-2">
            {deduction.evidenceSnippets.map((snip, idx) => (
              <div key={idx} className="p-3 bg-white border border-slate-200 rounded text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span className="font-semibold text-slate-800">{snip.label}</span>
                  <span className="font-mono">{snip.source}</span>
                </div>
                <p className="text-slate-700 italic">“{snip.text}”</p>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Reasoning & Rebuttal Framework */}
        <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-lg text-xs space-y-2">
          <div className="font-semibold text-amber-900 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Agent Cross-Check Finding</span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            {deduction.agentReasoning}
          </p>
          <div className="pt-2 border-t border-amber-200/60 flex flex-col sm:flex-row justify-between text-[11px] text-slate-600 gap-1">
            <span><strong>Potentially Challengeable:</strong> ₹{deduction.challengeableAmount.toLocaleString('en-IN')}</span>
            <span><strong>Contractually Supported:</strong> ₹{deduction.supportedAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs">
          <span className="text-slate-500">
            Review ground before generating appeal letter
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors"
          >
            Done Inspecting
          </button>
        </div>
      </div>
    </div>
  );
};
