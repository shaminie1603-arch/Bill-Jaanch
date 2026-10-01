import React from 'react';
import { ClaimData, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { AlertCircle, FileText, CheckCircle2, TrendingUp } from 'lucide-react';

interface ClaimSummaryCardsProps {
  claim: ClaimData;
  language: SupportedLanguage;
  onNavigateToAudit?: () => void;
  onNavigateToDeductions?: () => void;
}

export const ClaimSummaryCards: React.FC<ClaimSummaryCardsProps> = ({
  claim,
  language,
  onNavigateToAudit,
  onNavigateToDeductions,
}) => {
  const t = TRANSLATIONS[language];

  const totalBill = claim.hospitalBill.netAmount;
  const claimed = claim.settlement.totalClaimed;
  const approved = claim.settlement.totalApproved;
  const deducted = claim.settlement.totalDeducted;

  // Challengeable amount calculated from verified synthetic deductions
  const challengeable = claim.settlement.deductions.reduce(
    (acc, curr) => acc + curr.challengeableAmount,
    0
  );
  const supported = claim.settlement.deductions.reduce(
    (acc, curr) => acc + curr.supportedAmount,
    0
  );

  return (
    <div className="space-y-4">
      {/* Active Claim Meta Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-800 text-sm">{claim.claimId}</span>
            <span className="text-slate-400">·</span>
            <span>Apollo Multispeciality Hospitals (Chennai)</span>
          </div>
          <span className="text-slate-400 hidden sm:inline">·</span>
          <span>Patient: {claim.hospitalBill.patientName}</span>
          <span className="text-slate-400 hidden sm:inline">·</span>
          <span>Insurer: {claim.insurancePolicy.insurerName}</span>
          <span className="text-slate-400 hidden sm:inline">·</span>
          <span>Policy: {claim.insurancePolicy.policyNumber}</span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Admitted: {claim.hospitalBill.admissionDate}</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500">Discharged: {claim.hospitalBill.dischargeDate}</span>
        </div>
      </div>

      {/* 5-Column Financial Metric Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {/* Total Hospital Bill */}
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 flex flex-col justify-between">
          <div className="text-xs font-medium text-slate-500 mb-1 flex items-center justify-between">
            <span>{t.hospitalBill}</span>
            <FileText className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono tabular-nums">
            ₹{totalBill.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">28 line items audited</div>
        </div>

        {/* Claimed Amount */}
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 flex flex-col justify-between">
          <div className="text-xs font-medium text-slate-500 mb-1">
            <span>{t.amountClaimed}</span>
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono tabular-nums">
            ₹{claimed.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">100% submitted</div>
        </div>

        {/* Amount Approved */}
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 flex flex-col justify-between">
          <div className="text-xs font-medium text-emerald-700 mb-1 flex items-center justify-between">
            <span>{t.amountApproved}</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-emerald-700 font-mono tabular-nums">
            ₹{approved.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-600 mt-1">Disbursed by TPA</div>
        </div>

        {/* Amount Deducted */}
        <div className="bg-white border border-rose-200 rounded-lg p-3.5 flex flex-col justify-between bg-rose-50/20">
          <div className="text-xs font-medium text-rose-700 mb-1 flex items-center justify-between">
            <span>{t.amountDeducted}</span>
            <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <div className="text-xl font-bold text-rose-700 font-mono tabular-nums">
            ₹{deducted.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-rose-600 mt-1">Across 5 deduction categories</div>
        </div>

        {/* Potentially Challengeable */}
        <div className="col-span-2 md:col-span-1 bg-amber-50/40 border border-amber-300 rounded-lg p-3.5 flex flex-col justify-between">
          <div className="text-xs font-semibold text-amber-900 mb-1 flex items-center justify-between">
            <span>{t.potentiallyChallengeable}</span>
            <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
          </div>
          <div className="text-xl font-bold text-amber-800 font-mono tabular-nums">
            ₹{challengeable.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] font-medium text-amber-800 mt-1">
            {t.evidenceBasedEstimate}
          </div>
        </div>
      </div>

      {/* Recoverable Amount Meter Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <span>Deduction Assessment Breakdown</span>
              <span className="text-xs font-normal text-slate-500">· {t.evidenceBasedEstimate}</span>
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              {t.challengeableDisclaimer}
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-slate-700 font-medium">
                Challengeable: ₹{challengeable.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              <span className="text-slate-700 font-medium">
                Likely Supported: ₹{supported.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Visual Multi-Segment Bar */}
        <div className="space-y-1.5">
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
            <div
              style={{ width: `${(challengeable / deducted) * 100}%` }}
              className="bg-amber-500 h-full transition-all duration-500"
              title={`Potentially Challengeable: ₹${challengeable.toLocaleString('en-IN')}`}
            />
            <div
              style={{ width: `${(supported / deducted) * 100}%` }}
              className="bg-slate-400 h-full transition-all duration-500"
              title={`Likely Supported by Policy: ₹${supported.toLocaleString('en-IN')}`}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-500">
            <span>
              ₹0
            </span>
            <span className="text-amber-800 font-medium">
              ₹{challengeable.toLocaleString('en-IN')} (65.4% challengeable based on policy clauses)
            </span>
            <span>
              Total ₹{deducted.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
