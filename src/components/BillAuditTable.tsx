import React, { useState } from 'react';
import { BillLineItem, ClaimData } from '../types';
import { Search, AlertTriangle, Filter, CheckCircle2, Info, ArrowUpRight, HelpCircle } from 'lucide-react';

interface BillAuditTableProps {
  claim: ClaimData;
  onOpenFinding?: (findingId: string) => void;
}

export const BillAuditTable: React.FC<BillAuditTableProps> = ({ claim, onOpenFinding }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [flagFilter, setFlagFilter] = useState<'all' | 'flagged'>('all');
  const [selectedItemForModal, setSelectedItemForModal] = useState<BillLineItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Items (28)' },
    { id: 'Room & Nursing', label: 'Room & Nursing' },
    { id: 'ICU & Monitoring', label: 'ICU & Monitoring' },
    { id: 'Surgery & OT', label: 'Surgery & OT' },
    { id: 'Consumables & PPE', label: 'Consumables & PPE' },
    { id: 'Pharmacy', label: 'Pharmacy' },
    { id: 'Diagnostics', label: 'Diagnostics' },
    { id: 'Administrative', label: 'Administrative' },
  ];

  const filteredItems = claim.hospitalBill.lineItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesFlag = flagFilter === 'all' || (flagFilter === 'flagged' && item.auditFlag && item.auditFlag !== 'normal');
    return matchesSearch && matchesCategory && matchesFlag;
  });

  const flaggedCount = claim.hospitalBill.lineItems.filter(
    (i) => i.auditFlag && i.auditFlag !== 'normal'
  ).length;

  return (
    <div className="space-y-6">
      {/* Header and Compliance Guidance */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">Hospital Bill Forensic Audit</h2>
              <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                {flaggedCount} Patterns Flagged for Clarification
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Cross-checked against CGHS/GIPSA metro benchmarks and clinical bundling standards. Flagged items represent charges worth requesting clarification on, not conclusive determinations of overcharging.
            </p>
          </div>

          {/* Quick Filter Pill */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFlagFilter(flagFilter === 'all' ? 'flagged' : 'all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded border transition-colors flex items-center gap-1.5 ${
                flagFilter === 'flagged'
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>{flagFilter === 'flagged' ? 'Showing Flagged Only' : `Show Flagged (${flaggedCount})`}</span>
            </button>
          </div>
        </div>

        {/* Filter controls & Search */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col md:flex-row gap-3 justify-between items-center">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white font-medium'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search line items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1 text-xs border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Main Itemized Audit Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3 w-16">Item ID</th>
                <th className="p-3">Description & Clinical Shift</th>
                <th className="p-3">Category</th>
                <th className="p-3 text-right">Qty</th>
                <th className="p-3 text-right">Unit Price</th>
                <th className="p-3 text-right">Total Amount</th>
                <th className="p-3">Audit Finding / Benchmark</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => {
                const isFlagged = item.auditFlag && item.auditFlag !== 'normal';

                return (
                  <tr
                    key={item.id}
                    className={`transition-colors ${
                      isFlagged ? 'bg-amber-50/30 hover:bg-amber-50/50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="p-3 font-mono text-slate-500 font-medium">
                      {item.code}
                    </td>

                    <td className="p-3 max-w-xs">
                      <div className="font-semibold text-slate-900">{item.name}</div>
                      <div className="text-[11px] text-slate-500">{item.date}</div>
                    </td>

                    <td className="p-3 text-slate-600">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {item.category}
                      </span>
                    </td>

                    <td className="p-3 text-right font-mono tabular-nums text-slate-800">
                      {item.qty}
                    </td>

                    <td className="p-3 text-right font-mono tabular-nums text-slate-800">
                      ₹{item.unitPrice.toLocaleString('en-IN')}
                    </td>

                    <td className="p-3 text-right font-mono tabular-nums font-bold text-slate-900">
                      ₹{item.total.toLocaleString('en-IN')}
                    </td>

                    {/* Audit Finding / Benchmark */}
                    <td className="p-3">
                      {item.auditFlag === 'above_reference' && (
                        <div className="flex flex-col gap-0.5">
                          <span className="text-amber-800 font-semibold flex items-center gap-1 text-[11px]">
                            <AlertTriangle className="w-3 h-3 text-amber-600" />
                            Above reference range
                          </span>
                          <span className="text-[10px] text-slate-500">
                            Ref: {item.referenceBenchmark?.min ? `₹${item.referenceBenchmark.min} - ₹${item.referenceBenchmark.max}` : 'Hospital cap limit'}
                          </span>
                        </div>
                      )}

                      {item.auditFlag === 'possible_duplicate' && (
                        <div className="flex flex-col gap-0.5">
                          <span className="text-rose-800 font-semibold flex items-center gap-1 text-[11px]">
                            <AlertTriangle className="w-3 h-3 text-rose-600" />
                            Possible duplicate
                          </span>
                          <span className="text-[10px] text-slate-500">
                            2 identical entries 4h apart
                          </span>
                        </div>
                      )}

                      {item.auditFlag === 'possible_unbundling' && (
                        <div className="flex flex-col gap-0.5">
                          <span className="text-blue-800 font-semibold flex items-center gap-1 text-[11px]">
                            <Info className="w-3 h-3 text-blue-600" />
                            Possible unbundling
                          </span>
                          <span className="text-[10px] text-slate-500">
                            Pre-op evaluation separated from OT package
                          </span>
                        </div>
                      )}

                      {(!item.auditFlag || item.auditFlag === 'normal') && (
                        <span className="text-slate-400 text-[11px] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          Within standard bounds
                        </span>
                      )}
                    </td>

                    <td className="p-3 text-center">
                      <button
                        onClick={() => setSelectedItemForModal(item)}
                        className="px-2 py-1 text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Subtotal */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-600 gap-2">
          <span>
            Displaying {filteredItems.length} of {claim.hospitalBill.lineItems.length} line items
          </span>
          <div className="flex items-center gap-4 font-mono">
            <span>Subtotal: ₹{claim.hospitalBill.subtotal.toLocaleString('en-IN')}</span>
            <span>Taxes: ₹{claim.hospitalBill.taxes.toLocaleString('en-IN')}</span>
            <span className="font-bold text-slate-900 text-sm">
              Net Billed: ₹{claim.hospitalBill.netAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Item Detail / Benchmark Inspection Modal */}
      {selectedItemForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  Line Item Inspection · {selectedItemForModal.code}
                </span>
                <h3 className="text-base font-bold text-slate-900">{selectedItemForModal.name}</h3>
              </div>
              <button
                onClick={() => setSelectedItemForModal(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded text-xs border border-slate-200">
              <div>
                <span className="text-slate-500 block">Quantity</span>
                <span className="font-semibold font-mono text-slate-900">{selectedItemForModal.qty}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Billed Unit Price</span>
                <span className="font-semibold font-mono text-slate-900">₹{selectedItemForModal.unitPrice.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Total Incurred</span>
                <span className="font-bold font-mono text-slate-900">₹{selectedItemForModal.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Benchmark Analysis */}
            {selectedItemForModal.referenceBenchmark ? (
              <div className="p-3 bg-amber-50/60 rounded border border-amber-200 text-xs space-y-2">
                <div className="font-semibold text-amber-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Reference Benchmark Comparison</span>
                </div>
                <div className="text-slate-700">
                  <strong>Selected Reference Range:</strong> ₹{selectedItemForModal.referenceBenchmark.min.toLocaleString('en-IN')} – ₹{selectedItemForModal.referenceBenchmark.max.toLocaleString('en-IN')}
                </div>
                <div className="text-slate-600 text-[11px]">
                  <strong>Source:</strong> {selectedItemForModal.referenceBenchmark.source}
                </div>
                <p className="text-slate-700 text-xs bg-white p-2 rounded border border-amber-100 italic">
                  “{selectedItemForModal.referenceBenchmark.note}”
                </p>
                <div className="text-[11px] text-slate-500">
                  *Disclaimer: Being above a reference range does not establish overcharging; it provides an objective ground to request itemized justification.
                </div>
              </div>
            ) : (
              <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs text-slate-600">
                This item charge is within prevailing statutory and hospital schedule ranges.
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedItemForModal(null)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
