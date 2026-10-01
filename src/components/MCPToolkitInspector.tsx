import React, { useState } from 'react';
import { Terminal, Play, CheckCircle2, RefreshCw, Code2, Cpu } from 'lucide-react';

export const MCPToolkitInspector: React.FC = () => {
  const tools = [
    {
      name: 'extract_bill',
      description: 'Extracts line items, hospital metadata, daily room tariff, totals, taxes, and discounts from itemized hospital invoice.',
      defaultArgs: { document_text: 'Apollo Hospital Invoice #APO-89421. Patient: SYN-PT-8942. Room: Deluxe 408 (₹7,000/day). Gross: ₹1,84,000.' },
    },
    {
      name: 'extract_policy',
      description: 'Parses health insurance policy schedules for room rent caps, co-pay, waiting periods, sub-limits, and exclusions.',
      defaultArgs: { policy_text: 'Star Health Comprehensive Gold. Sum Insured: ₹4,00,000. Room Rent Cap: 1% SI/day (₹4,000/day). Consumables: Clause 8.3.' },
    },
    {
      name: 'extract_rejection',
      description: 'Extracts claimed, approved, deducted amounts, settlement summary, and cited exclusion clauses from claim settlement letter.',
      defaultArgs: { settlement_text: 'Claim #BJ-1042. Total Claimed: ₹1,84,000. Approved: ₹1,32,000. Deducted: ₹52,000 across 5 items.' },
    },
    {
      name: 'compare_reference_rate',
      description: 'Compares billed hospital item charges against CGHS/GIPSA benchmarks and prevailing metropolitan reference ranges.',
      defaultArgs: { item_name: 'Sterile Micro-Surgical Gloves (10 Pairs Pack)', billed_unit_price: 1200, city_tier: 'Metro Grade A' },
    },
    {
      name: 'calculate_challengeable_amount',
      description: 'Aggregates deductions evaluated as CHALLENGEABLE and NEEDS_REVIEW to compute an evidence-based recoverable estimate.',
      defaultArgs: { deductions: [{ category: 'Consumables', amount: 12000 }, { category: 'Diagnostics', amount: 4000 }, { category: 'Pharmacy', amount: 15500 }] },
    },
    {
      name: 'check_case_deadline',
      description: 'Checks insurance company response deadlines (IRDAI mandated 15-day TAT) and determines next agent action.',
      defaultArgs: { appeal_sent_date: '2026-10-01', current_date: '2026-10-08' },
    },
    {
      name: 'search_policy_clause',
      description: 'Retrieves relevant policy clauses and IRDAI master circular standards mapped to a specific deduction or bill item.',
      defaultArgs: { query: 'surgical consumables in OT' },
    },
    {
      name: 'analyze_deduction',
      description: 'Cross-checks a specific insurance deduction against policy wording and statutory guidelines to evaluate supportability.',
      defaultArgs: { deduction_id: 'DED-02', reason: 'Consumables non-payable', amount: 12000, clause_id: 'SEC-8.3' },
    },
    {
      name: 'generate_appeal',
      description: 'Synthesizes an evidence-backed formal grievance letter citing exact clauses, dates, receipts, and IRDAI standards.',
      defaultArgs: { claim_id: 'BJ-1042', patient_name: 'Sunita Sharma', hospital_name: 'Apollo Hospital' },
    },
    {
      name: 'create_reminder',
      description: 'Schedules automated follow-up reminder notification or escalation to Grievance Redressal Officer (GRO) / Ombudsman.',
      defaultArgs: { claim_id: 'BJ-1042', escalation_level: 'GRO_ESCALATION', due_date: '2026-10-15' },
    },
  ];

  const [selectedTool, setSelectedTool] = useState(tools[3]); // compare_reference_rate default
  const [customArgs, setCustomArgs] = useState(JSON.stringify(tools[3].defaultArgs, null, 2));
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<any>(null);

  const handleSelectTool = (tool: typeof tools[0]) => {
    setSelectedTool(tool);
    setCustomArgs(JSON.stringify(tool.defaultArgs, null, 2));
    setExecutionResult(null);
  };

  const handleExecute = async () => {
    setIsRunning(true);
    try {
      let parsedArgs = {};
      try {
        parsedArgs = JSON.parse(customArgs);
      } catch (err) {
        // use raw if parse fails
      }

      const res = await fetch('/api/mcp/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tool_name: selectedTool.name,
          arguments: parsedArgs,
        }),
      });

      const data = await res.json();
      setExecutionResult(data);
    } catch (err: any) {
      setExecutionResult({ error: err.message || 'Execution error' });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <div className="p-1.5 bg-slate-900 rounded text-emerald-400">
            <Cpu className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Bharat Claims Toolkit · Model Context Protocol (MCP) Server
          </h2>
        </div>
        <p className="text-xs text-slate-500 max-w-3xl">
          Bill Jaanch operates as an agentic architecture decomposed into granular, verifiable MCP tools rather than a monolithic black-box prompt. Judges and developers can inspect the active tool registry, schemas, and live execution traces below.
        </p>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>Server Endpoint: /api/mcp/execute</span>
          <span>Protocol: Model Context Protocol (MCP draft-2025)</span>
          <span>Active Tools: 10</span>
        </div>
      </div>

      {/* Main 2-Column Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Tool Selector */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
            Tool Registry (10 Tools)
          </span>

          <div className="space-y-1">
            {tools.map((tool) => (
              <button
                key={tool.name}
                onClick={() => handleSelectTool(tool)}
                className={`w-full text-left p-2.5 rounded transition-all text-xs font-mono flex items-center justify-between ${
                  selectedTool.name === tool.name
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span>{tool.name}()</span>
                <span className="text-[10px] opacity-70">Execute →</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Execution Sandbox & Results */}
        <div className="lg:col-span-8 space-y-4">
          {/* Tool Documentation Card */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs text-xs space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-mono text-sm font-bold text-slate-900">
                {selectedTool.name}()
              </span>
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                MCP Tool Registered
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed">{selectedTool.description}</p>
          </div>

          {/* Interactive Arguments Input */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Input Arguments (JSON Schema)</span>
              </span>

              <button
                onClick={handleExecute}
                disabled={isRunning}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Play className={`w-3 h-3 text-emerald-400 ${isRunning ? 'animate-spin' : ''}`} />
                <span>{isRunning ? 'Invoking MCP...' : 'Execute Tool'}</span>
              </button>
            </div>

            <textarea
              rows={4}
              value={customArgs}
              onChange={(e) => setCustomArgs(e.target.value)}
              className="w-full p-3 font-mono text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

          {/* Execution Trace Output */}
          <div className="bg-slate-950 text-slate-200 rounded-lg p-5 shadow-md border border-slate-800 space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono text-emerald-400 font-semibold">
                  Tool Execution Response Trace
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Status: 200 OK</span>
            </div>

            {executionResult ? (
              <pre className="font-mono text-xs overflow-x-auto p-3 bg-slate-900 rounded text-emerald-300 max-h-64 leading-relaxed">
                {JSON.stringify(executionResult, null, 2)}
              </pre>
            ) : (
              <div className="p-6 text-center text-slate-500 font-mono text-xs">
                Click [Execute Tool] above to trigger this MCP tool on the server and view structured output.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
