import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, HelpCircle, CheckCircle2, Sparkles, Building2, Stethoscope } from 'lucide-react';

export const PreAdmissionPlanner: React.FC = () => {
  const [procedure, setProcedure] = useState('Laparoscopic Cholecystectomy (Gallbladder)');
  const [plannedRoom, setPlannedRoom] = useState('Deluxe Single Room (₹7,500/day)');
  const [estimatedCost, setEstimatedCost] = useState('1,60,000');
  const [policyLimit, setPolicyLimit] = useState('1% of Sum Insured (₹4,000/day)');
  const [sumInsured, setSumInsured] = useState('4,00,000');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);

  const presets = [
    {
      title: 'Gallbladder Surgery (Cholecystectomy)',
      procedure: 'Laparoscopic Cholecystectomy',
      room: 'Deluxe Single Room (₹7,500/day)',
      cost: '1,60,000',
      policy: '1% of Sum Insured (₹4,000/day)',
    },
    {
      title: 'Total Knee Replacement (TKR)',
      procedure: 'Unilateral Total Knee Arthroplasty',
      room: 'Twin Sharing / Semi-Private (₹4,000/day)',
      cost: '2,80,000',
      policy: '1% of Sum Insured (₹5,000/day)',
    },
    {
      title: 'Cataract Surgery with Premium IOL',
      procedure: 'Phacoemulsification with Multifocal Lens',
      room: 'Daycare Ward (₹0 Room Rent)',
      cost: '75,000',
      policy: 'Sub-limit of ₹35,000 per eye',
    },
  ];

  const handleRunAIAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/gemini/preadmission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          procedure,
          plannedRoom,
          estimatedCost,
          policyDetails: `Sum Insured ₹${sumInsured}, Room limit: ${policyLimit}`,
        }),
      });
      const data = await res.json();
      if (data.advisoryText) {
        setAiAdvice(data.advisoryText);
      }
    } catch (e) {
      console.error('Error getting pre-admission advice', e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
            Preventive Claim Defense
          </span>
          <h2 className="text-lg font-bold text-slate-900">
            Pre-Admission Risk & Cost Auditor
          </h2>
        </div>
        <p className="text-xs text-slate-500 max-w-3xl">
          Evaluate planned treatment, bed categories, and sub-limits before admission. Identify potential room-rent proportionate traps and generate the exact questions to ask the hospital desk in writing.
        </p>

        {/* Preset quick loaders */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Load Planned Treatment:</span>
          {presets.map((preset) => (
            <button
              key={preset.title}
              onClick={() => {
                setProcedure(preset.procedure);
                setPlannedRoom(preset.room);
                setEstimatedCost(preset.cost);
                setPolicyLimit(preset.policy);
                setAiAdvice(null);
              }}
              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors font-medium"
            >
              {preset.title}
            </button>
          ))}
        </div>
      </div>

      {/* Input Parameters Form */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Planned Hospitalization Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Planned Procedure</label>
            <input
              type="text"
              value={procedure}
              onChange={(e) => setProcedure(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded focus:ring-1 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Proposed Room Category</label>
            <input
              type="text"
              value={plannedRoom}
              onChange={(e) => setPlannedRoom(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded focus:ring-1 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Estimated Hospital Quote (₹)</label>
            <input
              type="text"
              value={estimatedCost}
              onChange={(e) => setEstimatedCost(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded focus:ring-1 focus:ring-slate-900 font-mono"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Policy Room Rent Limit</label>
            <input
              type="text"
              value={policyLimit}
              onChange={(e) => setPolicyLimit(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded focus:ring-1 focus:ring-slate-900"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleRunAIAnalysis}
            disabled={isAnalyzing}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors flex items-center gap-1.5"
          >
            <Sparkles className={`w-3.5 h-3.5 text-emerald-400 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAnalyzing ? 'Auditing with Gemini...' : 'Analyze Pre-Admission Risks'}</span>
          </button>
        </div>
      </div>

      {/* Structured Pre-Admission Defense Guidance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Room Rent Caution Card */}
        <div className="bg-amber-50/50 border border-amber-200 rounded-lg p-5 text-xs space-y-3">
          <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Room Rent Proportionate Deduction Risk</span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            Your planned room tariff of <strong>{plannedRoom}</strong> appears to exceed the standard policy eligibility cap of <strong>{policyLimit}</strong>.
          </p>
          <div className="p-3 bg-white rounded border border-amber-200 space-y-1">
            <span className="font-semibold text-slate-900 block">The Proportionate Scaledown Danger:</span>
            <p className="text-slate-600 text-[11px]">
              If you exceed your room rent cap, the insurer does not merely deduct the bed difference; they proportionately scale down surgeon fees, OT charges, and nursing rounds by <strong>~35% to 45%</strong>!
            </p>
          </div>
          <div className="text-[11px] text-amber-900 font-semibold">
            Action: Request a Twin-Sharing or Semi-Private room to remain strictly within ₹4,000/day.
          </div>
        </div>

        {/* Consumable Package Risk */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 text-xs space-y-3">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <Stethoscope className="w-4 h-4 text-slate-700" />
            <span>Surgical Consumables & Non-Payables Check</span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            Laparoscopic procedures routinely incur ₹10,000 to ₹15,000 in surgical packs, sterile drapes, and trocar disposables.
          </p>
          <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
            <span className="font-semibold text-slate-800 block">Pre-Auth Strategy:</span>
            <p className="text-slate-600 text-[11px]">
              Ask the hospital billing coordinator: <em>"Are surgical disposables bundled inside the OT surgical package, or will they be itemized as standalone consumables?"</em>
            </p>
          </div>
          <div className="text-[11px] text-slate-600">
            Bundled OT packages protect against separate non-payable item rejections by insurers.
          </div>
        </div>
      </div>

      {/* Critical Checklist for Hospital & Insurer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Questions for Hospital */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
            <Building2 className="w-4 h-4 text-slate-700" />
            <span>5 Questions to Ask the Hospital Billing Desk</span>
          </div>
          <ol className="list-decimal list-inside space-y-2 text-slate-700">
            <li>
              <strong>Room Category Entitlement:</strong> Is this room billed as a "Single Room" or a "Deluxe Suite" in your hospital billing system?
            </li>
            <li>
              <strong>Doctor Fee Room-Grading:</strong> Do senior surgeon and anesthetist fees increase if the patient upgrades room category?
            </li>
            <li>
              <strong>Surgical Consumable Bundling:</strong> Will OT drapes, gloves, and sutures be part of the package or billed separately?
            </li>
            <li>
              <strong>Pre-Op Consultation Bundling:</strong> Is the Pre-Anesthetic Checkup (PAC) billed as an unbundled consultation?
            </li>
            <li>
              <strong>Pharmacy Invoices:</strong> Will discharge medicines include an itemized retail tax invoice with GSTIN and batch numbers?
            </li>
          </ol>
        </div>

        {/* Confirmations from Insurer */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>3 Written Confirmations from Insurer / TPA</span>
          </div>
          <ol className="list-decimal list-inside space-y-2 text-slate-700">
            <li>
              <strong>Cashless Pre-Authorization Approval:</strong> Obtain the initial sanctioned authorization letter before elective surgery.
            </li>
            <li>
              <strong>Specific Sub-Limits Check:</strong> Confirm if the policy contains a disease sub-limit (e.g., gallbladder cap or cataract cap).
            </li>
            <li>
              <strong>Post-Hospitalization Claim Window:</strong> Verify that post-discharge outpatient medications are reimbursable up to 60 days.
            </li>
          </ol>
          <div className="p-3 bg-slate-50 rounded border border-slate-200 text-[11px] text-slate-500 italic mt-3">
            *Decision Support Notice: This pre-admission advisory is based on typical Indian health insurance policies and IRDAI regulations. Always confirm final coverage terms with your insurer.
          </div>
        </div>
      </div>

      {/* AI Advisory Output if Generated */}
      {aiAdvice && (
        <div className="bg-white border border-emerald-300 rounded-lg p-6 shadow-sm text-xs space-y-3">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Gemini Pre-Admission Tailored Risk Report</span>
          </div>
          <div className="whitespace-pre-wrap font-mono text-slate-800 bg-slate-50 p-4 rounded border border-slate-200">
            {aiAdvice}
          </div>
        </div>
      )}
    </div>
  );
};
