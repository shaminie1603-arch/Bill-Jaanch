import React from 'react';
import { CaseState } from '../types';
import { CheckCircle2, Clock, AlertTriangle, ArrowRight, ShieldCheck, FileCheck, Layers } from 'lucide-react';

interface CaseStatusBarProps {
  status: CaseState;
  onAdvanceTimeline?: () => void;
  onNavigateTab: (tab: string) => void;
}

export const CaseStatusBar: React.FC<CaseStatusBarProps> = ({
  status,
  onAdvanceTimeline,
  onNavigateTab,
}) => {
  const steps: { key: CaseState; label: string; index: number }[] = [
    { key: 'DOCUMENT_COLLECTION', label: 'Documents Received', index: 1 },
    { key: 'ANALYSIS', label: 'Analysis Complete', index: 2 },
    { key: 'APPEAL_READY', label: 'Appeal Ready', index: 3 },
    { key: 'WAITING_FOR_INSURER', label: 'Waiting for Insurer', index: 4 },
    { key: 'REMINDER_DUE', label: 'Reminder Due', index: 5 },
    { key: 'ESCALATION_REVIEW', label: 'Escalation Review', index: 6 },
  ];

  const currentStepIndex = steps.find((s) => s.key === status)?.index || 3;

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Agentic Claim Workflow
          </span>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>Current Status:</span>
            <span className="text-emerald-700">
              {steps.find((s) => s.key === status)?.label || status}
            </span>
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {status === 'APPEAL_READY' && (
            <button
              onClick={() => onNavigateTab('appeal')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors flex items-center gap-1.5"
            >
              <span>Review Appeal Letter</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {status === 'WAITING_FOR_INSURER' && (
            <div className="flex items-center gap-1 text-xs text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
              <Clock className="w-3.5 h-3.5" />
              <span>Awaiting TPA Response (Day 5 of 15)</span>
            </div>
          )}

          {status === 'REMINDER_DUE' && (
            <div className="flex items-center gap-1 text-xs font-semibold text-rose-800 bg-rose-50 px-2.5 py-1 rounded border border-rose-300">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>Follow-Up Reminder Triggered</span>
            </div>
          )}

          {status === 'ESCALATION_REVIEW' && (
            <div className="flex items-center gap-1 text-xs font-semibold text-rose-900 bg-rose-100 px-2.5 py-1 rounded border border-rose-300">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />
              <span>Escalation to GRO Recommended</span>
            </div>
          )}
        </div>
      </div>

      {/* Pipeline Stepper */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2 pt-2 border-t border-slate-100">
        {steps.map((step) => {
          const isDone = step.index < currentStepIndex;
          const isCurrent = step.index === currentStepIndex;
          const isPending = step.index > currentStepIndex;

          return (
            <div
              key={step.key}
              className={`p-2.5 rounded border text-left flex flex-col justify-between transition-all ${
                isCurrent
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : isDone
                  ? 'bg-slate-50 text-slate-800 border-slate-200'
                  : 'bg-white text-slate-400 border-slate-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-medium">0{step.index}</span>
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : isCurrent ? (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                ) : null}
              </div>
              <div className="text-xs font-medium leading-tight">{step.label}</div>
            </div>
          );
        })}
      </div>

      {/* Document & Analysis Verification Badges */}
      <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {/* Documents Audited */}
        <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded border border-slate-200">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-700" />
            <span className="font-medium text-slate-800">4 Documents Cross-Audited</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <span>Bill ✓</span>
            <span>·</span>
            <span>Policy ✓</span>
            <span>·</span>
            <span>Settlement ✓</span>
            <span>·</span>
            <span>Discharge ✓</span>
          </div>
        </div>

        {/* Engine Pipeline Status */}
        <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded border border-slate-200">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-700" />
            <span className="font-medium text-slate-800">Cross-Check Status</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-700 font-medium">
            <span>Bill Audit ✓</span>
            <span className="text-slate-300">·</span>
            <span>Policy Clauses ✓</span>
            <span className="text-slate-300">·</span>
            <span>Evidence Map ✓</span>
          </div>
        </div>
      </div>
    </div>
  );
};
