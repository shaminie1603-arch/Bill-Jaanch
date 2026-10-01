import React, { useState } from 'react';
import { ClaimData, ClaimDeduction } from '../types';
import { FileCheck, BookOpen, AlertCircle, ArrowUpRight, CheckCircle2, HelpCircle, ShieldAlert } from 'lucide-react';

interface DeductionClauseMapProps {
  claim: ClaimData;
  onOpenEvidenceModal: (deduction: ClaimDeduction) => void;
}

export const DeductionClauseMap: React.FC<DeductionClauseMapProps> = ({
  claim,
  onOpenEvidenceModal,
}) => {
  const [filterAssessment, setFilterAssessment] = useState<string>('all');

  const deductions = claim.settlement.deductions.filter((d) => {
    if (filterAssessment === 'all') return true;
    return d.assessment === filterAssessment;
  });

  const getAssessmentBadge = (status: string) => {
    switch (status) {
      case 'SUPPORTED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            Supported
          </span>
        );
      case 'CHALLENGEABLE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            Challengeable
          </span>
        );
      case 'NEEDS_REVIEW':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Needs Review
          </span>
        );
      case 'INSUFFICIENT_EVIDENCE':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
            Insufficient Evidence
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview & Instructions */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Clause-to-Deduction Evidence Map
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl">
              Every deduction made by the insurer is mapped to the cited reason, statutory circulars (IRDAI), policy wording, and corresponding hospital charges. Click <strong>[View Evidence]</strong> to inspect side-by-side verification documents.
            </p>
          </div>

          {/* Assessment Filter buttons */}
          <div className="flex items-center gap-1 text-xs p-1 bg-slate-100 rounded border border-slate-200">
            {['all', 'CHALLENGEABLE', 'NEEDS_REVIEW', 'SUPPORTED'].map((filter) => (
              <button
                key={filter}
                onClick={() => setFilterAssessment(filter)}
                className={`px-2.5 py-1 rounded capitalize font-medium transition-colors ${
                  filterAssessment === filter
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {filter === 'all' ? 'All (5)' : filter.replace('_', ' ').toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Deduction Cards & Table Hybrid */}
      <div className="space-y-4">
        {deductions.map((ded, index) => {
          const matchedClause = claim.insurancePolicy.clauses.find(
            (c) => c.id === ded.policyClauseId
          );
          const matchedBillItems = claim.hospitalBill.lineItems.filter((item) =>
            ded.relatedBillItemIds.includes(item.id)
          );

          return (
            <div
              key={ded.id}
              className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs transition-all hover:border-slate-300"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      #{ded.id}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">{ded.category}</h3>
                    {getAssessmentBadge(ded.assessment)}
                  </div>
                  <p className="text-xs text-slate-600">
                    <strong className="text-slate-800">Insurer Stated Reason:</strong> {ded.insurerReason}
                  </p>
                </div>

                <div className="flex items-center md:flex-col md:items-end justify-between gap-1 text-right shrink-0">
                  <span className="text-xs text-slate-500">Deduction Amount</span>
                  <span className="text-lg font-bold font-mono text-rose-700 tabular-nums">
                    ₹{ded.amount.toLocaleString('en-IN')}
                  </span>
                  {ded.challengeableAmount > 0 && (
                    <span className="text-[11px] font-semibold text-amber-800">
                      ₹{ded.challengeableAmount.toLocaleString('en-IN')} challengeable
                    </span>
                  )}
                </div>
              </div>

              {/* 3-Column Mapping Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4 text-xs">
                {/* 1. Policy Evidence Clause */}
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <div className="font-semibold text-slate-800 mb-1 flex items-center justify-between">
                    <span>1. Policy Evidence</span>
                    <span className="font-mono text-slate-500 text-[10px]">{ded.citedPolicyClause || 'Standard'}</span>
                  </div>
                  <p className="text-slate-600 line-clamp-3 italic text-[11px]">
                    "{matchedClause?.exactText || 'Policy exclusion schedule applies.'}"
                  </p>
                  <div className="mt-2 text-[10px] text-slate-500 font-mono">
                    {matchedClause?.sourceDoc || 'Contract schedule'}
                  </div>
                </div>

                {/* 2. Related Bill Items */}
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <div className="font-semibold text-slate-800 mb-1 flex items-center justify-between">
                    <span>2. Linked Bill Items ({matchedBillItems.length})</span>
                    <span className="text-slate-500 text-[10px]">Hospital Invoice</span>
                  </div>
                  <div className="space-y-1">
                    {matchedBillItems.slice(0, 2).map((item) => (
                      <div key={item.id} className="text-[11px] flex justify-between text-slate-700">
                        <span className="truncate pr-1">{item.name}</span>
                        <span className="font-mono tabular-nums shrink-0">₹{item.total.toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                    {matchedBillItems.length > 2 && (
                      <span className="text-[10px] text-slate-400">
                        +{matchedBillItems.length - 2} more items in invoice
                      </span>
                    )}
                  </div>
                </div>

                {/* 3. Agent Reasoning & Ground */}
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <div className="font-semibold text-slate-800 mb-1 flex items-center justify-between">
                    <span>3. Cross-Check Reasoning</span>
                    <span className="text-slate-500 text-[10px]">Decision Support</span>
                  </div>
                  <p className="text-slate-700 text-[11px] leading-relaxed line-clamp-3">
                    {ded.agentReasoning}
                  </p>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                <div className="text-slate-600">
                  <strong className="text-slate-800">Recommended Action:</strong> {ded.recommendedAction}
                </div>

                <button
                  onClick={() => onOpenEvidenceModal(ded)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-900 bg-white border border-slate-300 hover:bg-slate-50 rounded transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <BookOpen className="w-3.5 h-3.5 text-slate-700" />
                  <span>View Evidence Dossier</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
