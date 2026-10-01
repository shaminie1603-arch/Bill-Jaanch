import React, { useState } from 'react';
import { ClaimData, CaseState, CaseTimelineEvent } from '../types';
import { Clock, CheckCircle2, AlertTriangle, ArrowRight, FastForward, RotateCcw, Send, BellRing, Scale } from 'lucide-react';

interface TimelineSectionProps {
  claim: ClaimData;
  onSimulate7Days: () => void;
  onSimulate14Days: () => void;
  onResetSimulation: () => void;
  onSendReminder: () => void;
  onSendEscalation: () => void;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  claim,
  onSimulate7Days,
  onSimulate14Days,
  onResetSimulation,
  onSendReminder,
  onSendEscalation,
}) => {
  const [reminderDraftApproved, setReminderDraftApproved] = useState(false);
  const [escalationDraftApproved, setEscalationDraftApproved] = useState(false);

  const getStatusIcon = (status: CaseTimelineEvent['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'current':
        return <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />;
      case 'action_required':
        return <AlertTriangle className="w-4 h-4 text-rose-600 animate-pulse" />;
      case 'upcoming':
      default:
        return <span className="w-2 h-2 rounded-full bg-slate-300" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Simulation Controls for 3-minute Hackathon Demo */}
      <div className="bg-slate-900 text-white rounded-lg p-6 shadow-md border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                Hackathon Demo Accelerator
              </span>
              <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                Simulated Time Machine
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">
              Autonomous Timeline & Follow-Up Agent
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 max-w-2xl">
              Insurance companies in India have a statutory 15-day TAT under IRDAI guidelines. Use these simulated clock accelerators to test autonomous reminder triggers and regulatory escalation paths.
            </p>
          </div>

          {/* Quick Simulation Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onSimulate7Days}
              className="px-3.5 py-2 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded transition-colors flex items-center gap-1.5 shadow-sm"
              title="Fast-forward 7 days to trigger reminder"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>Simulate 7 Days (Reminder Due)</span>
            </button>

            <button
              onClick={onSimulate14Days}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded transition-colors flex items-center gap-1.5"
              title="Fast-forward 14 days to trigger escalation"
            >
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span>Simulate 14 Days (Escalation)</span>
            </button>

            <button
              onClick={onResetSimulation}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
              title="Reset Timeline to Baseline"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Current State Diagnostic Banner */}
        <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-2.5 bg-slate-800/80 rounded border border-slate-700/60">
            <span className="text-slate-400 block text-[11px]">Current Case State</span>
            <span className="font-bold text-emerald-400 font-mono text-sm">{claim.status}</span>
          </div>
          <div className="p-2.5 bg-slate-800/80 rounded border border-slate-700/60">
            <span className="text-slate-400 block text-[11px]">Statutory Clock (IRDAI)</span>
            <span className="font-medium text-slate-200">
              {claim.status === 'REMINDER_DUE'
                ? 'Day 8 of 15 (No Insurer Acknowledgment)'
                : claim.status === 'ESCALATION_REVIEW'
                ? 'Day 15 of 15 (Statutory Deadline Elapsed)'
                : 'Day 1 of 15 (Appeal Ready/Dispatched)'}
            </span>
          </div>
          <div className="p-2.5 bg-slate-800/80 rounded border border-slate-700/60">
            <span className="text-slate-400 block text-[11px]">Next Automated Agent Action</span>
            <span className="font-medium text-amber-300">
              {claim.status === 'REMINDER_DUE'
                ? 'Dispatch Stage-1 Grievance Reminder'
                : claim.status === 'ESCALATION_REVIEW'
                ? 'File GRO Escalation & Prepare Ombudsman Form'
                : 'Await Insurer Formal Acknowledgment'}
            </span>
          </div>
        </div>
      </div>

      {/* Autonomous Action Callouts when Reminder or Escalation is Due */}
      {claim.status === 'REMINDER_DUE' && (
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-5 shadow-xs text-xs space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <BellRing className="w-4 h-4 text-amber-700 animate-bounce" />
              <span>Agent Notification: 7-Day Follow-Up Reminder Due</span>
            </div>
            <span className="text-amber-800 font-mono text-[11px]">Milestone #TL-07</span>
          </div>
          <p className="text-amber-900 leading-relaxed">
            The appeal was dispatched 7 days ago, but Star Health TPA has not furnished an acknowledgment or clarification. The Bill Jaanch agent has automatically prepared a Stage-1 reminder citing IRDAI turnaround timelines.
          </p>
          <div className="p-3 bg-white rounded border border-amber-200 text-slate-700 font-mono text-[11px]">
            “RE: URGENT REMINDER - Unresolved Grievance Ref #{claim.claimId} (Disputed ₹34,000). Statutory acknowledgment overdue under IRDAI Master Circular 2020. Kindly confirm claim review status within 48 hours.”
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                onSendReminder();
                setReminderDraftApproved(true);
              }}
              className="px-3.5 py-1.5 font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{reminderDraftApproved ? 'Reminder Dispatched ✓' : 'Approve & Dispatch Reminder'}</span>
            </button>
          </div>
        </div>
      )}

      {claim.status === 'ESCALATION_REVIEW' && (
        <div className="bg-rose-50 border border-rose-300 rounded-lg p-5 shadow-xs text-xs space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
              <Scale className="w-4 h-4 text-rose-700" />
              <span>Escalation Trigger: 15-Day Statutory Deadline Reached</span>
            </div>
            <span className="text-rose-800 font-mono text-[11px]">Milestone #TL-08</span>
          </div>
          <p className="text-rose-900 leading-relaxed">
            15 days have elapsed without satisfactory resolution of the ₹34,000 deduction. In accordance with Indian insurance consumer protection law, this claim is now eligible for immediate escalation to:
          </p>
          <ul className="list-disc list-inside text-rose-800 space-y-1">
            <li><strong>Principal Grievance Redressal Officer (GRO)</strong> of Star Health</li>
            <li><strong>IRDAI Bima Bharosa Portal</strong> (Token generation)</li>
            <li><strong>Insurance Ombudsman</strong> (Preparation of Form VI-A for legal redressal)</li>
          </ul>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                onSendEscalation();
                setEscalationDraftApproved(true);
              }}
              className="px-3.5 py-1.5 font-semibold text-white bg-rose-800 hover:bg-rose-900 rounded transition-colors flex items-center gap-1.5"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{escalationDraftApproved ? 'Escalation Package Assembled ✓' : 'Assemble Ombudsman Dossier'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Visual Vertical Timeline */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-6">
          End-to-End Case Progression & Audit Log
        </h3>

        <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {claim.timeline.map((event) => {
            const isDone = event.status === 'completed';
            const isCurrent = event.status === 'current';
            const isAction = event.status === 'action_required';

            return (
              <div key={event.id} className="relative group">
                {/* Node marker */}
                <div className="absolute -left-[27px] top-0.5 bg-white p-0.5 rounded-full">
                  {getStatusIcon(event.status)}
                </div>

                {/* Event Box */}
                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-semibold text-sm text-slate-900">{event.title}</span>
                    <span className="text-xs font-mono text-slate-500">{event.date}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {event.description}
                  </p>

                  {event.actionLabel && isCurrent && (
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Active Step: {event.actionLabel}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
