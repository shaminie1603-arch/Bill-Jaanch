import React, { useState } from 'react';
import { ClaimData, BillFinding } from '../types';
import { AlertTriangle, CheckCircle2, HelpCircle, ArrowRight, ShieldCheck, Filter } from 'lucide-react';

interface FindingsPageProps {
  claim: ClaimData;
  onNavigateToAppeal: () => void;
}

export const FindingsPage: React.FC<FindingsPageProps> = ({
  claim,
  onNavigateToAppeal,
}) => {
  const [selectedConfidence, setSelectedConfidence] = useState<string>('all');

  const findings = claim.findings.filter((f) => {
    if (selectedConfidence === 'all') return true;
    return f.confidence === selectedConfidence;
  });

  const getStatusBadge = (status: string) => {
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
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Needs Review
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Audit Findings & Evidence Dossier
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Consolidated findings from the hospital bill forensic audit and policy cross-check. Every item includes source citations, confidence classifications, and concrete recommended steps.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToAppeal}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors flex items-center gap-1.5"
            >
              <span>Draft Appeal from Findings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Confidence System Filter */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Filter by Evidence Confidence:</span>
          <div className="flex items-center gap-1">
            {['all', 'HIGH', 'MEDIUM'].map((c) => (
              <button
                key={c}
                onClick={() => setSelectedConfidence(c)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  selectedConfidence === c
                    ? 'bg-slate-900 text-white font-medium'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c === 'all' ? 'All Findings (4)' : `${c} Confidence`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Findings Grid */}
      <div className="space-y-4">
        {findings.map((finding) => (
          <div
            key={finding.id}
            className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs transition-all hover:border-slate-300"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {finding.id}
                </span>
                <span className="text-xs font-medium text-slate-600">
                  {finding.category}
                </span>
                {getStatusBadge(finding.assessment)}
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-500">
                  Confidence: <strong className="text-slate-800">{finding.confidence}</strong>
                </span>
                <span className="text-slate-300">|</span>
                <span className="font-mono font-bold text-sm text-slate-900 tabular-nums">
                  ₹{finding.amount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Description & Item */}
            <div className="my-3 space-y-1">
              <h3 className="text-base font-bold text-slate-900">{finding.item}</h3>
              <p className="text-xs font-medium text-slate-700">{finding.description}</p>
            </div>

            {/* Evidence & Explanation Box */}
            <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-2 mb-3">
              <div className="text-slate-700 leading-relaxed">
                <strong className="text-slate-800">Reasoning:</strong> {finding.explanation}
              </div>

              {finding.benchmarkContext && (
                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600 font-mono">
                  Benchmark: {finding.benchmarkContext}
                </div>
              )}
            </div>

            {/* Metadata Badges & Recommended Action */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-500 text-[11px]">
                <span>Source: <strong className="text-slate-700">{finding.sourceDocument}</strong></span>
                {finding.policyClauseRef && (
                  <>
                    <span>·</span>
                    <span>Clause: <strong className="text-slate-700">{finding.policyClauseRef}</strong></span>
                  </>
                )}
              </div>

              <div className="text-xs text-slate-800 bg-emerald-50/60 border border-emerald-200 px-3 py-1.5 rounded">
                <strong>Recommended Action:</strong> {finding.recommendedAction}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
