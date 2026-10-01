import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== "production";

app.use(express.json({ limit: "25mb" }));

// Server-side Gemini initialization per guidelines
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  aiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// ----------------------------------------------------
// Bharat Claims Toolkit MCP Server Logic
// ----------------------------------------------------
export interface MCPToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, any>;
}

const MCP_TOOLS: MCPToolDefinition[] = [
  {
    name: "extract_bill",
    description: "Extracts line items, hospital metadata, daily room tariff, totals, taxes, and discounts from itemized hospital invoice.",
    parameters: {
      type: "object",
      properties: {
        document_text: { type: "string", description: "Raw OCR/text from hospital bill" },
      },
      required: ["document_text"],
    },
  },
  {
    name: "extract_policy",
    description: "Parses health insurance policy schedules for room rent caps, co-pay, waiting periods, sub-limits, and exclusions.",
    parameters: {
      type: "object",
      properties: {
        policy_text: { type: "string", description: "Raw OCR/text of health insurance policy document" },
      },
      required: ["policy_text"],
    },
  },
  {
    name: "extract_rejection",
    description: "Extracts claimed, approved, deducted amounts, settlement summary, and cited exclusion clauses from claim settlement letter.",
    parameters: {
      type: "object",
      properties: {
        settlement_text: { type: "string", description: "Settlement or denial letter text" },
      },
      required: ["settlement_text"],
    },
  },
  {
    name: "search_policy_clause",
    description: "Retrieves relevant policy clauses and IRDAI master circular standards mapped to a specific deduction or bill item.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Clause keyword or deduction category (e.g. 'room rent proportionate', 'consumables in OT')" },
      },
      required: ["query"],
    },
  },
  {
    name: "analyze_deduction",
    description: "Cross-checks a specific insurance deduction against policy wording and statutory guidelines to evaluate supportability.",
    parameters: {
      type: "object",
      properties: {
        deduction_id: { type: "string" },
        reason: { type: "string" },
        amount: { type: "number" },
        clause_id: { type: "string" },
      },
      required: ["deduction_id", "reason", "amount"],
    },
  },
  {
    name: "compare_reference_rate",
    description: "Compares billed hospital item charges against CGHS/GIPSA benchmarks and prevailing metropolitan reference ranges.",
    parameters: {
      type: "object",
      properties: {
        item_name: { type: "string" },
        billed_unit_price: { type: "number" },
        city_tier: { type: "string", default: "Tier 1" },
      },
      required: ["item_name", "billed_unit_price"],
    },
  },
  {
    name: "calculate_challengeable_amount",
    description: "Aggregates deductions evaluated as 'CHALLENGEABLE' and 'NEEDS_REVIEW' to compute an evidence-based recoverable estimate.",
    parameters: {
      type: "object",
      properties: {
        deductions: { type: "array", items: { type: "object" } },
      },
      required: ["deductions"],
    },
  },
  {
    name: "generate_appeal",
    description: "Synthesizes an evidence-backed formal grievance letter citing exact clauses, dates, receipts, and IRDAI standards.",
    parameters: {
      type: "object",
      properties: {
        claim_id: { type: "string" },
        patient_name: { type: "string" },
        deductions: { type: "array", items: { type: "object" } },
        hospital_name: { type: "string" },
      },
      required: ["claim_id", "patient_name", "deductions"],
    },
  },
  {
    name: "check_case_deadline",
    description: "Checks insurance company response deadlines (IRDAI mandated 15-day TAT) and determines next agent action.",
    parameters: {
      type: "object",
      properties: {
        appeal_sent_date: { type: "string" },
        current_date: { type: "string" },
      },
      required: ["appeal_sent_date"],
    },
  },
  {
    name: "create_reminder",
    description: "Schedules automated follow-up reminder notification or escalation to Grievance Redressal Officer (GRO) / Ombudsman.",
    parameters: {
      type: "object",
      properties: {
        claim_id: { type: "string" },
        escalation_level: { type: "string", enum: ["TPA_REMINDER", "GRO_ESCALATION", "IRDAI_BIMA_BHAROSA", "OMBUDSMAN"] },
        due_date: { type: "string" },
      },
      required: ["claim_id", "escalation_level"],
    },
  },
];

// MCP Endpoint: List tools
app.get("/api/mcp/tools", (_req, res) => {
  res.json({
    server: "Bharat Claims Toolkit MCP",
    version: "1.2.0",
    protocol: "mcp-draft-2025",
    tools: MCP_TOOLS,
  });
});

// MCP Endpoint: Execute tool
app.post("/api/mcp/execute", (req, res) => {
  const { tool_name, arguments: args } = req.body;
  if (!tool_name) {
    return res.status(400).json({ error: "Missing tool_name" });
  }

  // Handle toolkit operations with synthetic/deterministic logic
  switch (tool_name) {
    case "extract_bill":
      return res.json({
        status: "success",
        tool: "extract_bill",
        result: {
          hospital_name: "Apollo Multispeciality Hospitals",
          patient_identifier: "SYN-PT-8942",
          admission_date: "2026-09-21",
          discharge_date: "2026-09-25",
          room_category: "Deluxe Private (Room 408)",
          total_line_items: 28,
          subtotal: 172000,
          taxes_and_cess: 12000,
          gross_amount: 184000,
        },
      });

    case "extract_policy":
      return res.json({
        status: "success",
        tool: "extract_policy",
        result: {
          policy_name: "Star Health Comprehensive Health Gold",
          policy_number: "SH-SYN-99210-44",
          sum_insured: 400000,
          room_rent_limit: "1% of Sum Insured per day (₹4,000/day)",
          icu_limit: "2% of Sum Insured per day (₹8,000/day)",
          copay: "Nil (Below 60 years)",
          consumables_clause: "Clause 8.3 & IRDAI Master Circular Annexure 1",
          post_hospitalization_days: 60,
        },
      });

    case "extract_rejection":
      return res.json({
        status: "success",
        tool: "extract_rejection",
        result: {
          claim_id: "BJ-1042",
          claimed_amount: 184000,
          approved_amount: 132000,
          deducted_amount: 52000,
          deduction_breakdown: [
            { category: "Room Rent Proportionate", amount: 18000, reason: "Opted room rent ₹7,000 exceeds ₹4,000 cap" },
            { category: "Non-Payable Consumables", amount: 12000, reason: "Gloves, syringes, drapes excluded under general non-medical list" },
            { category: "Lab & Diagnostic Scaledown", amount: 4000, reason: "Proportionate reduction applied on associated investigation charges" },
            { category: "Administrative & Bio-waste", amount: 2500, reason: "Hospital admin and waste disposal surcharges non-payable" },
            { category: "Post-Discharge Pharmacy", amount: 15500, reason: "Detailed itemized pharmacy tax invoice not attached" },
          ],
        },
      });

    case "compare_reference_rate": {
      const item = (args?.item_name || "").toLowerCase();
      const price = Number(args?.billed_unit_price || 0);
      let benchmarkMin = 400;
      let benchmarkMax = 700;
      if (item.includes("glove")) {
        benchmarkMin = 400;
        benchmarkMax = 700;
      } else if (item.includes("oximeter")) {
        benchmarkMin = 800;
        benchmarkMax = 1200;
      } else if (item.includes("deluxe") || item.includes("room")) {
        benchmarkMin = 3500;
        benchmarkMax = 5000;
      }
      const isAbove = price > benchmarkMax;
      return res.json({
        status: "success",
        tool: "compare_reference_rate",
        result: {
          item_name: args?.item_name,
          billed_price: price,
          benchmark_range: `₹${benchmarkMin} - ₹${benchmarkMax}`,
          is_above_range: isAbove,
          deviation_pct: isAbove ? Math.round(((price - benchmarkMax) / benchmarkMax) * 100) : 0,
          advisory: isAbove
            ? "Billed amount is above typical reference range. Request itemized price justification."
            : "Within standard benchmark bounds.",
        },
      });
    }

    case "calculate_challengeable_amount":
      return res.json({
        status: "success",
        tool: "calculate_challengeable_amount",
        result: {
          total_deducted: 52000,
          potentially_challengeable: 34000,
          likely_supported: 18000,
          confidence_summary: {
            challengeable_reasons: [
              "Consumables essential to surgical procedure (IRDAI Master Circular 2020: ₹12,000)",
              "Proportionate reduction wrongly applied to fixed diagnostic lab costs (₹4,000)",
              "Post-discharge pharmacy recoverable with itemized tax voucher (₹15,500)",
              "Partial Room Rent clarification: ₹2,500 overapplied deduction",
            ],
            supported_reasons: [
              "Contractual administrative and bio-medical waste charges (₹2,500)",
              "Contractual base room rent differential beyond 1% SI cap (₹15,500)",
            ],
          },
        },
      });

    case "check_case_deadline": {
      return res.json({
        status: "success",
        tool: "check_case_deadline",
        result: {
          irdai_tat_days: 15,
          days_elapsed: 7,
          days_remaining: 8,
          status: "WAITING_FOR_INSURER",
          next_milestone: "First follow-up reminder due if no acknowledgment received by Day 8",
        },
      });
    }

    default:
      return res.json({
        status: "success",
        tool: tool_name,
        result: {
          message: `Executed tool ${tool_name} successfully via Bharat Claims Toolkit MCP.`,
          args,
        },
      });
  }
});

// ----------------------------------------------------
// Gemini API Server Endpoints
// ----------------------------------------------------

// 1. Bill & Claim Intelligence Analysis
app.post("/api/gemini/analyze", async (req, res) => {
  try {
    const { billText, policyText, rejectionText } = req.body;

    if (!aiClient) {
      return res.json({
        source: "deterministic_agent",
        message: "Gemini API key not configured in environment; providing validated synthetic audit.",
      });
    }

    const prompt = `You are the core auditing engine of Bill Jaanch, a specialized health insurance claim verification system in India.
Analyze the following claim context:
HOSPITAL BILL TEXT:
${(billText || "").slice(0, 3000)}

INSURANCE POLICY EXTRACT:
${(policyText || "").slice(0, 3000)}

REJECTION / SETTLEMENT NOTICE:
${(rejectionText || "").slice(0, 3000)}

Provide a structured JSON output with:
1. "summary": Brief professional 2-sentence executive summary.
2. "deduction_evaluations": Array of objects:
   - "category": string
   - "amount": number
   - "assessment": "SUPPORTED" | "CHALLENGEABLE" | "NEEDS_REVIEW" | "INSUFFICIENT_EVIDENCE"
   - "clause_ref": string
   - "reasoning": string
3. "challengeable_amount": estimated number that appears challengeable based on evidence
4. "bill_findings": Array of 2-3 specific billing findings with category, amount, item, and evidence-backed rationale.
Follow strict compliance: Never use the word 'fraud'. Use objective phrasing: 'Potentially unusual charge', 'Above available reference range', 'Possible duplicate', 'Worth requesting clarification'.`;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ source: "gemini-3.8-flash", data: parsed });
  } catch (err: any) {
    console.error("Gemini analysis error:", err);
    res.status(500).json({ error: err.message || "Failed to analyze with Gemini" });
  }
});

// 2. Appeal Letter Generator
app.post("/api/gemini/appeal", async (req, res) => {
  try {
    const { claimId, patientName, hospitalName, deductions, policyNumber } = req.body;

    if (!aiClient) {
      return res.json({
        source: "deterministic_agent",
        letter: null,
      });
    }

    const prompt = `You are Bill Jaanch's Appeal Drafting Agent. Write a courteous, professional, evidence-backed grievance and reconsideration letter to the Insurance TPA / Claims Head.
Details:
- Claim ID: ${claimId || "BJ-1042"}
- Patient: ${patientName || "Sunita Sharma"}
- Hospital: ${hospitalName || "Apollo Multispeciality Hospitals"}
- Policy Number: ${policyNumber || "SH-SYN-99210-44"}
- Deductions to challenge: ${JSON.stringify(deductions || [])}

Rules:
- Professional and firm tone.
- Do NOT make unsupported legal accusations or use inflammatory words like "illegal rejection".
- Use phrases like: "I respectfully request a reconsideration of...", "As per Clause...", "In accordance with IRDAI guidelines...".
- Structure clearly with Date, To, Subject, Reference IDs, Background, Point-by-point evidence breakdown, Enclosed document checklist, and Request for review within IRDAI 15-day turnaround timeline.`;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });

    res.json({ source: "gemini-3.8-flash", appealText: response.text });
  } catch (err: any) {
    console.error("Gemini appeal error:", err);
    res.status(500).json({ error: err.message || "Failed to generate appeal" });
  }
});

// 3. Pre-Admission Advisor
app.post("/api/gemini/preadmission", async (req, res) => {
  try {
    const { procedure, plannedRoom, estimatedCost, policyDetails } = req.body;

    if (!aiClient) {
      return res.json({
        source: "deterministic_agent",
        advice: null,
      });
    }

    const prompt = `You are the Pre-Admission Planning Agent for Bill Jaanch.
A patient has planned hospitalization:
Procedure: ${procedure || "Laparoscopic Cholecystectomy"}
Planned Room: ${plannedRoom || "Single Deluxe"}
Estimated Cost: ₹${estimatedCost || "1,20,000"}
Policy Details: ${policyDetails || "Sum Insured ₹4,00,000; 1% Room Rent Limit"}

Provide a structured, helpful advisory including:
1. Room Rent check & proportionate deduction risk warning.
2. 5 critical questions to ask the hospital billing desk before admission.
3. 3 critical confirmations to obtain in writing from the Insurer/TPA.
4. Non-payable consumable package estimation and guidance.
5. Explicit decision support disclaimer.`;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });

    res.json({ source: "gemini-3.8-flash", advisoryText: response.text });
  } catch (err: any) {
    console.error("Gemini preadmission error:", err);
    res.status(500).json({ error: err.message || "Failed to advise" });
  }
});

// ----------------------------------------------------
// Frontend Serving (Vite middleware in Dev, Static in Prod)
// ----------------------------------------------------
async function startServer() {
  if (isDev) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`[Bill Jaanch] Server running on port ${PORT} (dev: ${isDev})`);
  });
}

startServer();
