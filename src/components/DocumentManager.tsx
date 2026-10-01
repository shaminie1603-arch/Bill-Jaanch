import React, { useState } from 'react';
import { ClaimData } from '../types';
import { UploadCloud, FileText, CheckCircle2, Clock, Eye, AlertCircle, RefreshCw } from 'lucide-react';

interface DocumentManagerProps {
  claim: ClaimData;
  onRefreshExtraction?: () => void;
}

export const DocumentManager: React.FC<DocumentManagerProps> = ({
  claim,
  onRefreshExtraction,
}) => {
  const [selectedDoc, setSelectedDoc] = useState<'bill' | 'policy' | 'rejection' | 'discharge'>('bill');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');

  const documents = [
    {
      id: 'bill',
      title: 'Hospital Itemized Invoice',
      filename: 'Apollo_Final_Bill_APO-89421.pdf',
      status: 'Extracted & Audited',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      summary: `${claim.hospitalBill.hospitalName} · 28 line items · ₹${claim.hospitalBill.netAmount.toLocaleString('en-IN')}`,
      type: 'PDF',
      size: '1.4 MB',
    },
    {
      id: 'policy',
      title: 'Insurance Policy Schedule & T&C',
      filename: 'Star_Health_Comprehensive_Gold_Terms.pdf',
      status: 'Indexed & Mapped',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      summary: `${claim.insurancePolicy.insurerName} · SI: ₹${claim.insurancePolicy.sumInsured.toLocaleString('en-IN')} · 4 Clauses Flagged`,
      type: 'PDF',
      size: '3.8 MB',
    },
    {
      id: 'rejection',
      title: 'Settlement / Deduction Letter',
      filename: 'Settlement_Letter_ST-2026-99120.pdf',
      status: 'Deductions Analyzed',
      badgeColor: 'text-amber-800 bg-amber-50 border-amber-200',
      summary: `5 Deductions Identified · ₹${claim.settlement.totalDeducted.toLocaleString('en-IN')} Deducted`,
      type: 'PDF',
      size: '820 KB',
    },
    {
      id: 'discharge',
      title: 'Discharge Summary & OT Notes',
      filename: 'Discharge_Summary_SYN-PT-8942.pdf',
      status: 'Clinical Evidence Verified',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      summary: 'Laparoscopic Cholecystectomy · OT Surgical Consumables Verified',
      type: 'PDF',
      size: '1.1 MB',
    },
  ];

  const handleSimulateUpload = (docName: string) => {
    setIsProcessing(true);
    setProcessingStep('Extracting bill line items…');
    setTimeout(() => {
      setProcessingStep('Finding relevant policy clauses…');
      setTimeout(() => {
        setProcessingStep('Mapping rejection reasons and statutory guidelines…');
        setTimeout(() => {
          setIsProcessing(false);
          setProcessingStep('');
          if (onRefreshExtraction) onRefreshExtraction();
        }, 600);
      }, 600);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone & Guidance */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Document Intelligence Vault</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Upload your hospital bill, insurance policy, and deduction letter. All synthetic documents are processed and cross-referenced together.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSimulateUpload('All Documents')}
              disabled={isProcessing}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
              <span>Re-run Extraction Engine</span>
            </button>
          </div>
        </div>

        {/* Drag and Drop Zone */}
        <div
          onClick={() => handleSimulateUpload('Uploaded File')}
          className="border-2 border-dashed border-slate-300 hover:border-slate-400 bg-slate-50/60 rounded-lg p-6 text-center cursor-pointer transition-colors"
        >
          <div className="max-w-md mx-auto space-y-2">
            <div className="w-10 h-10 mx-auto rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div className="text-sm font-semibold text-slate-800">
              Drop hospital bills, policy documents, or settlement notices
            </div>
            <p className="text-xs text-slate-500">
              Supports PDF, PNG, JPG files. Demo mode uses pre-loaded synthetic documents.
            </p>
          </div>
        </div>

        {/* Processing Indicator if active */}
        {isProcessing && (
          <div className="mt-4 p-3 bg-slate-900 text-white rounded text-xs flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
              <span>{processingStep}</span>
            </div>
            <span className="text-slate-400 font-mono">Agent Engine Running</span>
          </div>
        )}
      </div>

      {/* Uploaded Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            onClick={() => setSelectedDoc(doc.id as any)}
            className={`p-4 bg-white rounded-lg border cursor-pointer transition-all ${
              selectedDoc === doc.id
                ? 'border-slate-900 ring-1 ring-slate-900 shadow-sm'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="p-2 bg-slate-100 rounded text-slate-700">
                <FileText className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${doc.badgeColor}`}>
                {doc.status}
              </span>
            </div>

            <div className="font-semibold text-sm text-slate-900 line-clamp-1">{doc.title}</div>
            <div className="text-xs text-slate-500 font-mono truncate mt-0.5">{doc.filename}</div>

            <div className="mt-3 pt-2 border-t border-slate-100 text-xs text-slate-600 line-clamp-2">
              {doc.summary}
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
              <span>{doc.type} · {doc.size}</span>
              <span className="text-slate-900 font-medium flex items-center gap-1 hover:underline">
                <Eye className="w-3 h-3" />
                Inspect
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Structured Extraction Intelligence Viewer */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Document Intelligence Extractor
            </span>
            <h3 className="text-base font-bold text-slate-900">
              {selectedDoc === 'bill' && 'Hospital Invoice Structured Data'}
              {selectedDoc === 'policy' && 'Insurance Policy Clauses & Schedule'}
              {selectedDoc === 'rejection' && 'Settlement Rejection Reasons'}
              {selectedDoc === 'discharge' && 'Clinical Discharge Summary & Operative Record'}
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Source: Synthetic Sandbox #{claim.claimId}
          </span>
        </div>

        {/* Tab-Specific Structured Data View */}
        {selectedDoc === 'bill' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-3 rounded border border-slate-200 text-xs">
              <div>
                <span className="text-slate-500 block">Hospital</span>
                <span className="font-semibold text-slate-900">{claim.hospitalBill.hospitalName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Patient ID (Synthetic)</span>
                <span className="font-semibold font-mono text-slate-900">{claim.hospitalBill.patientIdentifier}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Admission / Discharge</span>
                <span className="font-semibold text-slate-900">{claim.hospitalBill.admissionDate} to {claim.hospitalBill.dischargeDate}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Room Category</span>
                <span className="font-semibold text-slate-900">{claim.hospitalBill.roomCategory}</span>
              </div>
            </div>

            <div className="text-xs font-semibold text-slate-700">
              Extracted Line Items Summary ({claim.hospitalBill.lineItems.length} Items Total)
            </div>

            <div className="border border-slate-200 rounded overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Item Code</th>
                    <th className="p-2.5">Description</th>
                    <th className="p-2.5">Category</th>
                    <th className="p-2.5 text-right">Qty</th>
                    <th className="p-2.5 text-right">Unit Price</th>
                    <th className="p-2.5 text-right">Total Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {claim.hospitalBill.lineItems.slice(0, 6).map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="p-2.5 font-mono text-slate-600">{item.code}</td>
                      <td className="p-2.5 font-medium text-slate-900">{item.name}</td>
                      <td className="p-2.5 text-slate-600">{item.category}</td>
                      <td className="p-2.5 text-right font-mono tabular-nums">{item.qty}</td>
                      <td className="p-2.5 text-right font-mono tabular-nums">₹{item.unitPrice.toLocaleString('en-IN')}</td>
                      <td className="p-2.5 text-right font-mono tabular-nums font-semibold">₹{item.total.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-2 text-center bg-slate-50 border-t border-slate-200 text-slate-500 text-xs">
                Showing 6 of 28 extracted items. Open the "Bill Audit" tab to review the complete itemized schedule.
              </div>
            </div>
          </div>
        )}

        {selectedDoc === 'policy' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-3 rounded border border-slate-200 text-xs">
              <div>
                <span className="text-slate-500 block">Insurer & Product</span>
                <span className="font-semibold text-slate-900">{claim.insurancePolicy.productName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Sum Insured</span>
                <span className="font-semibold font-mono text-slate-900">₹{claim.insurancePolicy.sumInsured.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Room Rent Limit</span>
                <span className="font-semibold text-slate-900">{claim.insurancePolicy.roomRentLimitDescription}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Post-Hospitalization</span>
                <span className="font-semibold text-slate-900">{claim.insurancePolicy.postHospitalizationDays} Days Admissible</span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-700 block">
                Extracted Regulatory & Policy Clauses Mapped to Claims
              </span>
              {claim.insurancePolicy.clauses.map((clause) => (
                <div key={clause.id} className="p-3 border border-slate-200 rounded-lg bg-white space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{clause.section}: {clause.title}</span>
                    <span className="text-slate-500 font-mono">{clause.sourceDoc}</span>
                  </div>
                  <p className="text-xs text-slate-700 bg-slate-50 p-2 rounded border border-slate-100 italic">
                    "{clause.exactText}"
                  </p>
                  <p className="text-xs text-slate-600">
                    <strong className="text-slate-800">Agent Interpretation:</strong> {clause.simplifiedExplanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedDoc === 'rejection' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3 rounded border border-slate-200 text-xs">
              <div>
                <span className="text-slate-500 block">Settlement Ref #</span>
                <span className="font-semibold font-mono text-slate-900">{claim.settlement.settlementNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Total Claimed / Approved</span>
                <span className="font-semibold font-mono text-slate-900">₹{claim.settlement.totalClaimed.toLocaleString('en-IN')} / ₹{claim.settlement.totalApproved.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Total Deductions</span>
                <span className="font-bold font-mono text-rose-700">₹{claim.settlement.totalDeducted.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="border border-slate-200 rounded overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Deduction Reason</th>
                    <th className="p-2.5">Cited Clause</th>
                    <th className="p-2.5 text-right">Amount</th>
                    <th className="p-2.5 text-center">Initial Assessment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {claim.settlement.deductions.map((ded) => (
                    <tr key={ded.id} className="hover:bg-slate-50">
                      <td className="p-2.5">
                        <div className="font-semibold text-slate-900">{ded.category}</div>
                        <div className="text-[11px] text-slate-500">{ded.insurerReason}</div>
                      </td>
                      <td className="p-2.5 font-mono text-slate-700">{ded.citedPolicyClause || 'Unspecified'}</td>
                      <td className="p-2.5 text-right font-mono tabular-nums font-semibold text-rose-700">₹{ded.amount.toLocaleString('en-IN')}</td>
                      <td className="p-2.5 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          ded.assessment === 'CHALLENGEABLE'
                            ? 'bg-amber-100 text-amber-800'
                            : ded.assessment === 'NEEDS_REVIEW'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-100 text-slate-800'
                        }`}>
                          {ded.assessment}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedDoc === 'discharge' && (
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
              <div className="font-semibold text-slate-900">Operative Procedure Note</div>
              <p className="text-slate-700">
                Patient underwent Laparoscopic Cholecystectomy under General Anesthesia on 22-09-2026. Micro-surgical barrier drapes, laparoscopic port cannula, and absorbable polyglactin sutures utilized intra-operatively to ensure sterile field and hemostasis. Post-operative recovery in HDU uneventful. Discharged on oral medications on 25-09-2026.
              </p>
            </div>
            <div className="p-3 bg-emerald-50 rounded border border-emerald-200 text-emerald-900 space-y-1">
              <div className="font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Clinical Admissibility Ground</span>
              </div>
              <p>
                Operative notes prove direct surgical necessity of the ₹12,000 surgical consumables disallowed by the insurer under general non-medical exclusions.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
