import React, { useState } from 'react';
import { ClaimData } from '../types';
import { FileText, Download, Copy, Check, Edit3, Send, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

interface AppealGeneratorProps {
  claim: ClaimData;
  onUpdateAppealLetter: (newText: string) => void;
  onApproveAndSend: () => void;
}

export const AppealGenerator: React.FC<AppealGeneratorProps> = ({
  claim,
  onUpdateAppealLetter,
  onApproveAndSend,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(claim.appealLetterText);
  const [copied, setCopied] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(claim.appealLetterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([claim.appealLetterText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `BillJaanch_Appeal_${claim.claimId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSaveEdit = () => {
    onUpdateAppealLetter(editText);
    setIsEditing(false);
  };

  const handleAIAssistAppeal = async () => {
    setIsRegenerating(true);
    try {
      const res = await fetch('/api/gemini/appeal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          claimId: claim.claimId,
          patientName: claim.hospitalBill.patientName,
          hospitalName: claim.hospitalBill.hospitalName,
          policyNumber: claim.insurancePolicy.policyNumber,
          deductions: claim.settlement.deductions.filter((d) => d.challengeableAmount > 0),
        }),
      });
      const data = await res.json();
      if (data.appealText) {
        onUpdateAppealLetter(data.appealText);
        setEditText(data.appealText);
      }
    } catch (e) {
      console.error('Error generating with Gemini', e);
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleConfirmSend = () => {
    onApproveAndSend();
    setShowSendModal(false);
    setSendSuccess(true);
  };

  return (
    <div className="space-y-6">
      {/* Header and Compliance Guidance */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                Evidence-Backed Formal Appeal Letter
              </h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                Grievance Ready
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Synthesized from extracted hospital invoices, Star Health policy schedule clauses, and IRDAI circulars. Formatted for the Insurer Grievance Redressal Desk.
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleAIAssistAppeal}
              disabled={isRegenerating}
              className="px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded transition-colors flex items-center gap-1.5"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
              <span>{isRegenerating ? 'Drafting with Gemini...' : 'Polish Tone with AI'}</span>
            </button>

            <button
              onClick={() => {
                if (isEditing) {
                  handleSaveEdit();
                } else {
                  setEditText(claim.appealLetterText);
                  setIsEditing(true);
                }
              }}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded transition-colors flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-600" />
              <span>{isEditing ? 'Save Edits' : 'Edit Letter'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Download (.txt)</span>
            </button>

            <button
              onClick={() => setShowSendModal(true)}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Send className="w-3.5 h-3.5 text-emerald-400" />
              <span>Approve & Send</span>
            </button>
          </div>
        </div>

        {/* Mandatory User Approval and Safety Notice */}
        <div className="mt-4 p-3 bg-amber-50/70 border border-amber-200 rounded text-xs text-amber-900 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Mandatory Human Approval Protocol:</strong> Bill Jaanch generates structured grievance drafts for your review. You must inspect, verify the factual accuracy, and explicitly approve the appeal prior to submission. Bill Jaanch never sends unapproved external correspondence.
          </p>
        </div>
      </div>

      {/* Success Notification if Appeal Sent */}
      {sendSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-lg text-xs text-emerald-900 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-700" />
            <div>
              <strong>Appeal Dispatched to Insurer Grievance Redressal Desk.</strong> Case state updated to <em>"WAITING_FOR_INSURER"</em>. The statutory 15-day IRDAI response clock is now running.
            </div>
          </div>
          <span className="font-mono text-emerald-700 font-semibold">Stage 1 Active</span>
        </div>
      )}

      {/* Letter Content Viewer / Editor */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs font-mono text-xs leading-relaxed text-slate-800">
        {isEditing ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-slate-500 font-sans pb-2 border-b border-slate-200">
              <span className="font-semibold text-slate-800 text-xs">Direct Letter Editor</span>
              <span className="text-[11px]">Markdown / Text format</span>
            </div>
            <textarea
              rows={22}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-4 border border-slate-300 rounded font-mono text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 bg-slate-50"
            />
            <div className="flex justify-end gap-2 font-sans">
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="whitespace-pre-wrap selection:bg-amber-100 max-w-4xl mx-auto">
            {claim.appealLetterText}
          </div>
        )}
      </div>

      {/* Approve & Send Modal */}
      {showSendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
              <Send className="w-5 h-5 text-slate-900" />
              <h3 className="text-base font-bold text-slate-900">Confirm & Approve Appeal Submission</h3>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <p>
                You are approving the submission of this appeal to:
              </p>
              <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1 font-sans">
                <div><strong>Recipient:</strong> Claims Grievance Officer, Star Health</div>
                <div><strong>Claim Reference:</strong> {claim.claimId}</div>
                <div><strong>Disputed Amount:</strong> ₹34,000 (out of ₹52,000 deducted)</div>
                <div><strong>Delivery Channels:</strong> Insurer Portal + Registered Email</div>
              </div>
              <p className="text-slate-500 italic">
                By clicking "Confirm Submission", you certify that you have reviewed the point-by-point statements and authorized this correspondence.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                onClick={() => setShowSendModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSend}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors"
              >
                Confirm Submission & Start Clock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
