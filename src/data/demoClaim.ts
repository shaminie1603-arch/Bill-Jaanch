import { ClaimData, BillLineItem, PolicyClause, ClaimDeduction, BillFinding, CaseTimelineEvent } from '../types';

export const DEMO_POLICY_CLAUSES: PolicyClause[] = [
  {
    id: 'SEC-4.2',
    section: 'Section 4.2',
    title: 'Room Rent & Associated Medical Expenses Proportionate Deduction',
    category: 'Room Rent Limits',
    exactText: 'If the Insured Person occupies a room category whose daily tariff exceeds 1% of the Sum Insured per day, the Company shall proportionately reduce the associated medical expenses incurred towards doctor consultation, diagnostics, nursing, and operation theatre charges in the same proportion as the room rent entitlement bears to the actual room rent charged.',
    simplifiedExplanation: 'When room rent exceeds the policy cap (₹4,000/day for ₹4 Lakh Sum Insured), insurer scales down associated doctor visits and OT charges. However, IRDAI master circular specifically exempts fixed-price consumables and fixed diagnostic lab rates from proportionate deduction.',
    sourceDoc: 'Comprehensive Health Care Policy Schedule (Page 14, Cl. 4.2)',
    pageNumber: 14,
  },
  {
    id: 'SEC-8.3',
    section: 'Section 8.3',
    title: 'Surgical Consumables & Non-Medical Items Schedule',
    category: 'Consumables & Non-Payables',
    exactText: 'Expenses incurred on non-medical items, personal toiletries, and consumables listed under Annexure I are excluded. Provided always that items essential and integral to the surgical procedure (such as surgical drapes, micro-cannula, and intra-operative safety packs) shall be admitted when billed with clinical justification.',
    simplifiedExplanation: 'General toiletries are excluded, but consumables strictly required during surgery/OT are payable under standard IRDAI guidelines unless explicitly excluded in an itemized rider.',
    sourceDoc: 'Star Health Terms & Conditions (Page 29, Cl. 8.3)',
    pageNumber: 29,
  },
  {
    id: 'SEC-6.1',
    section: 'Section 6.1',
    title: 'Post-Hospitalization Medical Expenses',
    category: 'Post-Discharge Care',
    exactText: 'The Company will indemnify medical expenses incurred up to 60 days immediately after discharge, provided such expenses are incurred for the same condition for which hospitalization occurred and are supported by the attending consultant’s prescription and itemized pharmacy invoices with GST registration.',
    simplifiedExplanation: 'Medicines purchased upon discharge are fully covered for 60 days when submitted along with the consultant discharge prescription and retail pharmacy tax invoice.',
    sourceDoc: 'Comprehensive Health Care Policy Schedule (Page 19, Cl. 6.1)',
    pageNumber: 19,
  },
  {
    id: 'SEC-11.2',
    section: 'Section 11.2',
    title: 'Administrative, Record-Keeping & Surcharge Exclusions',
    category: 'Administrative Exclusions',
    exactText: 'Charges for admission registration, hospital administrative overheads, bio-medical waste disposal fees, and photocopying of medical records are non-admissible under standard insurance norms (Schedule I of IRDAI Guidelines).',
    simplifiedExplanation: 'Administrative registration fees and bio-medical waste handling charges are universally excluded non-medical expenses.',
    sourceDoc: 'Star Health Terms & Conditions (Page 35, Cl. 11.2)',
    pageNumber: 35,
  },
];

export const DEMO_LINE_ITEMS: BillLineItem[] = [
  // Room & Nursing (4 days)
  {
    id: 'ITEM-01',
    code: 'ROOM-DX-01',
    name: 'Deluxe Private Room Tariff (Room 408)',
    category: 'Room & Nursing',
    date: '2026-09-21 to 2026-09-25',
    qty: 4,
    unitPrice: 7000,
    total: 28000,
    referenceBenchmark: {
      min: 4000,
      max: 5500,
      source: 'CGHS / GIPSA Metro Grade-A Benchmark',
      note: 'Policy cap is ₹4,000/day (1% of ₹4L Sum Insured). Patient billed ₹7,000/day.',
    },
    auditFlag: 'above_reference',
    auditFindingId: 'BJ-001',
  },
  {
    id: 'ITEM-02',
    code: 'NURS-DAY-01',
    name: 'General Nursing Care (24-Hour Shift)',
    category: 'Room & Nursing',
    date: '2026-09-21 to 2026-09-25',
    qty: 4,
    unitPrice: 1500,
    total: 6000,
  },
  {
    id: 'ITEM-03',
    code: 'RMO-VISIT-01',
    name: 'Duty Medical Officer (RMO) Rounds (2 Shifts/Day)',
    category: 'Room & Nursing',
    date: '2026-09-21 to 2026-09-25',
    qty: 8,
    unitPrice: 600,
    total: 4800,
  },

  // ICU & Monitoring (1 day post-op observation)
  {
    id: 'ITEM-04',
    code: 'ICU-TAR-01',
    name: 'Step-Down High Dependency Unit (HDU/ICU)',
    category: 'ICU & Monitoring',
    date: '2026-09-22',
    qty: 1,
    unitPrice: 11000,
    total: 11000,
  },
  {
    id: 'ITEM-05',
    code: 'ICU-MON-01',
    name: 'Multi-Para Continuous Hemodynamic Monitoring',
    category: 'ICU & Monitoring',
    date: '2026-09-22',
    qty: 1,
    unitPrice: 2800,
    total: 2800,
  },
  {
    id: 'ITEM-06',
    code: 'SENS-OX-01',
    name: 'Disposable Pulse Oximeter Sensor Lead',
    category: 'ICU & Monitoring',
    date: '2026-09-22 (08:30)',
    qty: 1,
    unitPrice: 1800,
    total: 1800,
  },
  {
    id: 'ITEM-07',
    code: 'SENS-OX-02',
    name: 'Disposable Pulse Oximeter Sensor Lead (Duplicate entry)',
    category: 'ICU & Monitoring',
    date: '2026-09-22 (12:45)',
    qty: 1,
    unitPrice: 1800,
    total: 1800,
    auditFlag: 'possible_duplicate',
    auditFindingId: 'BJ-002',
  },

  // Surgery & OT
  {
    id: 'ITEM-08',
    code: 'OT-SURG-01',
    name: 'Operation Theatre Major Care Package (Grade III)',
    category: 'Surgery & OT',
    date: '2026-09-22',
    qty: 1,
    unitPrice: 26000,
    total: 26000,
  },
  {
    id: 'ITEM-09',
    code: 'SURG-FEE-01',
    name: 'Chief Consultant Surgeon Professional Fee',
    category: 'Surgery & OT',
    date: '2026-09-22',
    qty: 1,
    unitPrice: 28000,
    total: 28000,
  },
  {
    id: 'ITEM-10',
    code: 'ANES-FEE-01',
    name: 'Senior Anesthesiologist Intra-Operative Fee',
    category: 'Surgery & OT',
    date: '2026-09-22',
    qty: 1,
    unitPrice: 12000,
    total: 12000,
  },
  {
    id: 'ITEM-11',
    code: 'PRE-ANES-01',
    name: 'Pre-Anesthetic Checkup & Evaluation (PAC) Billed Separately',
    category: 'Surgery & OT',
    date: '2026-09-21',
    qty: 1,
    unitPrice: 3500,
    total: 3500,
    referenceBenchmark: {
      min: 0,
      max: 1200,
      source: 'NABH Clinical Accounting Framework',
      note: 'Routine pre-anesthetic rounds are routinely bundled inside OT surgical package.',
    },
    auditFlag: 'possible_unbundling',
    auditFindingId: 'BJ-003',
  },
  {
    id: 'ITEM-12',
    code: 'SURG-ASST-01',
    name: 'Assistant Surgeon Scrub Charge',
    category: 'Surgery & OT',
    date: '2026-09-22',
    qty: 1,
    unitPrice: 4500,
    total: 4500,
  },

  // Consumables & PPE (Disallowed by Insurer)
  {
    id: 'ITEM-13',
    code: 'SURG-GLOV-01',
    name: 'Sterile Micro-Surgical Gloves (10 Pairs Pack)',
    category: 'Consumables & PPE',
    date: '2026-09-22',
    qty: 1,
    unitPrice: 1200,
    total: 1200,
    referenceBenchmark: {
      min: 400,
      max: 700,
      source: 'National Pharmaceutical Pricing Authority (NPPA) & Hospital Benchmarks',
      note: 'Billed amount is above selected reference range (₹400-₹700).',
    },
    auditFlag: 'above_reference',
    auditFindingId: 'BJ-004',
  },
  {
    id: 'ITEM-14',
    code: 'SURG-PPE-01',
    name: 'Laparoscopic Barrier Drapes & Fluid Repellent Pack',
    category: 'Consumables & PPE',
    date: '2026-09-22',
    qty: 2,
    unitPrice: 2400,
    total: 4800,
  },
  {
    id: 'ITEM-15',
    code: 'SURG-SUT-01',
    name: 'Absorbable Polyglactin Suture 2-0 & Clip Disposables',
    category: 'Consumables & PPE',
    date: '2026-09-22',
    qty: 1,
    unitPrice: 3600,
    total: 3600,
  },
  {
    id: 'ITEM-16',
    code: 'CONS-IV-01',
    name: 'IV Infusion Sets, 3-Way Stopcock & Extension Cannula (Set of 6)',
    category: 'Consumables & PPE',
    date: '2026-09-21 to 2026-09-24',
    qty: 6,
    unitPrice: 400,
    total: 2400,
  },

  // Pharmacy (In-Patient & Discharge)
  {
    id: 'ITEM-17',
    code: 'PHAR-ANT-01',
    name: 'Inj. Meropenem 1g IV Infusion (Twice Daily)',
    category: 'Pharmacy',
    date: '2026-09-21 to 2026-09-23',
    qty: 4,
    unitPrice: 1450,
    total: 5800,
  },
  {
    id: 'ITEM-18',
    code: 'PHAR-PAN-01',
    name: 'Inj. Pantoprazole 40mg IV',
    category: 'Pharmacy',
    date: '2026-09-21 to 2026-09-24',
    qty: 4,
    unitPrice: 225,
    total: 900,
  },
  {
    id: 'ITEM-19',
    code: 'PHAR-ANAL-01',
    name: 'Inj. Paracetamol 100ml IV Infusion',
    category: 'Pharmacy',
    date: '2026-09-21 to 2026-09-23',
    qty: 6,
    unitPrice: 190,
    total: 1140,
  },
  {
    id: 'ITEM-20',
    code: 'PHAR-FLUID-01',
    name: 'Ringer Lactate & Normal Saline 500ml Glass Bottles',
    category: 'Pharmacy',
    date: '2026-09-21 to 2026-09-24',
    qty: 8,
    unitPrice: 120,
    total: 960,
  },
  {
    id: 'ITEM-21',
    code: 'PHAR-DISC-01',
    name: 'Post-Discharge 30-Day Recovery Medication Pack (Discharge Kit)',
    category: 'Pharmacy',
    date: '2026-09-25',
    qty: 1,
    unitPrice: 15500,
    total: 15500,
  },

  // Diagnostics & Lab
  {
    id: 'ITEM-22',
    code: 'DIAG-USG-01',
    name: 'High-Resolution Abdominal Ultrasound (USG)',
    category: 'Diagnostics',
    date: '2026-09-21',
    qty: 1,
    unitPrice: 2200,
    total: 2200,
  },
  {
    id: 'ITEM-23',
    code: 'DIAG-CT-01',
    name: 'Contrast Enhanced Abdominal CT Scan (CECT)',
    category: 'Diagnostics',
    date: '2026-09-21',
    qty: 1,
    unitPrice: 6500,
    total: 6500,
  },
  {
    id: 'ITEM-24',
    code: 'LAB-CBC-01',
    name: 'Complete Blood Count (CBC) with Platelets (Daily Series)',
    category: 'Diagnostics',
    date: '2026-09-21 to 2026-09-24',
    qty: 4,
    unitPrice: 450,
    total: 1800,
  },
  {
    id: 'ITEM-25',
    code: 'LAB-KFT-LFT',
    name: 'Renal & Liver Function Comprehensive Profile (KFT + LFT)',
    category: 'Diagnostics',
    date: '2026-09-21',
    qty: 1,
    unitPrice: 1800,
    total: 1800,
  },
  {
    id: 'ITEM-26',
    code: 'DIAG-ECG-01',
    name: '12-Lead Electrocardiogram (Pre-Op + Post-Op)',
    category: 'Diagnostics',
    date: '2026-09-21 & 2026-09-23',
    qty: 2,
    unitPrice: 350,
    total: 700,
  },

  // Administrative / Waste
  {
    id: 'ITEM-27',
    code: 'ADM-REG-01',
    name: 'Inpatient Hospital Admission & Smart Card Processing Fee',
    category: 'Administrative',
    date: '2026-09-21',
    qty: 1,
    unitPrice: 1000,
    total: 1000,
  },
  {
    id: 'ITEM-28',
    code: 'ADM-BIO-01',
    name: 'Bio-Medical Waste Handling & Hospital Disinfection Surcharge',
    category: 'Administrative',
    date: '2026-09-21 to 2026-09-25',
    qty: 1,
    unitPrice: 1500,
    total: 1500,
  },
];

export const DEMO_DEDUCTIONS: ClaimDeduction[] = [
  {
    id: 'DED-01',
    category: 'Room-Rent Proportionate Deduction',
    amount: 18000,
    insurerReason: 'Room tariff charged ₹7,000/day exceeds policy room rent eligibility of ₹4,000/day (1% of Sum Insured). Proportionate reduction applied to associated medical charges as per policy conditions.',
    citedPolicyClause: 'Section 4.2',
    policyClauseId: 'SEC-4.2',
    relatedBillItemIds: ['ITEM-01', 'ITEM-08', 'ITEM-09', 'ITEM-10'],
    assessment: 'NEEDS_REVIEW',
    challengeableAmount: 6000,
    supportedAmount: 12000,
    agentReasoning: 'The uploaded policy contains a room-rent limit of 1% of Sum Insured (₹4,000/day). While the direct room rent difference (4 days × ₹3,000 = ₹12,000) is contractual, the insurer also applied proportionate reduction on the surgical package and doctor fees without verifying whether the hospital grades its doctor fees to room categories. Furthermore, IRDAI master circular strictly restricts scaling down fixed diagnostic and ICU charges.',
    recommendedAction: 'Challenge the over-applied proportionate reduction on surgical fees by requesting confirmation from the hospital whether surgeon fees are room-category linked.',
    evidenceSnippets: [
      {
        label: 'Policy Clause Section 4.2',
        text: 'Proportionate deduction shall apply to associated medical expenses in the same proportion as room rent entitlement bears to actual room rent charged.',
        source: 'Policy Document (Page 14)',
      },
      {
        label: 'IRDAI Master Circular (Ref: IRDAI/HLT/REG/CIR/193/07/2020)',
        text: 'Insurers shall not apply proportionate deduction on costs that are not directly variable with room category, including standard diagnostic tests and intensive care.',
        source: 'IRDAI Health Regulations Schedule',
      },
      {
        label: 'Hospital Bill Entry',
        text: 'Deluxe Room billed at ₹7,000/day × 4 Days = ₹28,000. Cap applies at ₹4,000/day.',
        source: 'Apollo Hospital Invoice (Line Item #01)',
      },
    ],
  },
  {
    id: 'DED-02',
    category: 'Consumables & PPE Disallowance',
    amount: 12000,
    insurerReason: 'Gloves, barrier drapes, suture disposables, and PPE items categorized under non-payable items schedule.',
    citedPolicyClause: 'Section 8.3',
    policyClauseId: 'SEC-8.3',
    relatedBillItemIds: ['ITEM-13', 'ITEM-14', 'ITEM-15', 'ITEM-16'],
    assessment: 'CHALLENGEABLE',
    challengeableAmount: 12000,
    supportedAmount: 0,
    agentReasoning: 'All disallowed consumable items (sterile micro-surgical gloves, laparoscopic drapes, sutures) were utilized inside the Operation Theatre for the primary surgical intervention. Clause 8.3 explicitly states that items essential and integral to surgery shall be admitted when billed with clinical justification. Under IRDAI circular Annexure 1, surgical consumables are admissible.',
    recommendedAction: 'Submit formal appeal citing Policy Section 8.3 proviso and IRDAI circular Annexure I, attaching the OT surgical note certifying clinical necessity.',
    evidenceSnippets: [
      {
        label: 'Policy Clause Section 8.3 Proviso',
        text: 'Provided always that items essential and integral to the surgical procedure shall be admitted when billed with clinical justification.',
        source: 'Policy Document (Page 29)',
      },
      {
        label: 'Discharge Summary OT Record',
        text: 'Patient underwent emergency laparoscopic cholecystectomy requiring sterile barrier drape system and absorbable polyglactin sutures.',
        source: 'Discharge Summary (Section: Operative Notes)',
      },
    ],
  },
  {
    id: 'DED-03',
    category: 'Proportionate Lab & Diagnostics Scaledown',
    amount: 4000,
    insurerReason: 'Associated medical expenses reduction applied proportionately across diagnostic laboratory profiles and CT scan.',
    citedPolicyClause: 'Section 4.2',
    policyClauseId: 'SEC-4.2',
    relatedBillItemIds: ['ITEM-22', 'ITEM-23', 'ITEM-24', 'ITEM-25'],
    assessment: 'CHALLENGEABLE',
    challengeableAmount: 4000,
    supportedAmount: 0,
    agentReasoning: 'The insurer applied proportionate deduction to fixed diagnostic investigations (CECT Abdomen, USG, and CBC). Under IRDAI regulations, diagnostic laboratory and imaging tariffs in accredited hospitals are uniform and do not scale with the patient’s bed category. Billed diagnostic costs are fixed and cannot be scaled down.',
    recommendedAction: 'Cite IRDAI circular forbidding proportionate deduction on fixed diagnostic tariffs and ask for full restoration of the ₹4,000 deduction.',
    evidenceSnippets: [
      {
        label: 'Hospital Diagnostic Tariff Card',
        text: 'CT Scan and ultrasound tariffs are standard hospital-wide rates irrespective of general ward or deluxe bed admission.',
        source: 'Apollo Diagnostic Tariff Schedule',
      },
      {
        label: 'IRDAI Regulatory Clarification',
        text: 'Proportionate reduction must not be deducted on fixed costs such as pharmacy, diagnostics, and implants.',
        source: 'IRDAI Guidelines on Standardization in Health Insurance',
      },
    ],
  },
  {
    id: 'DED-04',
    category: 'Administrative & Bio-Medical Waste Surcharges',
    amount: 2500,
    insurerReason: 'Admission registration charges and bio-medical waste disposal fees are non-medical expenses excluded under policy terms.',
    citedPolicyClause: 'Section 11.2',
    policyClauseId: 'SEC-11.2',
    relatedBillItemIds: ['ITEM-27', 'ITEM-28'],
    assessment: 'SUPPORTED',
    challengeableAmount: 0,
    supportedAmount: 2500,
    agentReasoning: 'Administrative registration fees and bio-medical waste levies are expressly excluded under Section 11.2 of the policy and Schedule I (Item 18 and Item 22) of standard IRDAI non-payable guidelines. The deduction is contractually supported.',
    recommendedAction: 'No appeal recommended for this deduction as it is in accordance with standard policy exclusions.',
    evidenceSnippets: [
      {
        label: 'Policy Clause Section 11.2',
        text: 'Charges for admission registration, hospital administrative overheads, and bio-medical waste disposal fees are non-admissible.',
        source: 'Policy Terms (Page 35)',
      },
      {
        label: 'IRDAI Schedule I Non-Payable Items',
        text: 'Administrative fees and bio-medical waste charges are classified as Non-Medical Expenses.',
        source: 'IRDAI Standard Exclusions Guidelines',
      },
    ],
  },
  {
    id: 'DED-05',
    category: 'Post-Discharge Medication Disallowance',
    amount: 15500,
    insurerReason: 'Post-hospitalization pharmacy bill disallowed due to absence of detailed retail pharmacy tax invoice / breakdown voucher.',
    citedPolicyClause: 'Section 6.1',
    policyClauseId: 'SEC-6.1',
    relatedBillItemIds: ['ITEM-21'],
    assessment: 'CHALLENGEABLE',
    challengeableAmount: 12000,
    supportedAmount: 3500,
    agentReasoning: 'Post-hospitalization medical expenses are admissible under Policy Section 6.1 for up to 60 days following discharge. The disallowance occurred solely because the hospital discharge summary included the consolidated pharmacy item without the standalone GST retail invoice. Submitting the retail invoice stamped with GSTIN together with Dr. Sharma’s discharge prescription will substantiate ₹12,000 of clinically indicated medications.',
    recommendedAction: 'Attach the stamped Apollo Pharmacy tax invoice and discharge prescription to the appeal letter to claim full reimbursement.',
    evidenceSnippets: [
      {
        label: 'Policy Clause Section 6.1',
        text: 'The Company will indemnify medical expenses incurred up to 60 days post-discharge supported by consultant prescription and GST pharmacy invoices.',
        source: 'Policy Document (Page 19)',
      },
      {
        label: 'Apollo Pharmacy Retail Voucher #AP-8849',
        text: 'Itemized invoice for post-discharge oral antibiotics, analgesics, and gastro-protective medications totaling ₹15,500.',
        source: 'Pharmacy Counter Tax Invoice',
      },
    ],
  },
];

export const DEMO_FINDINGS: BillFinding[] = [
  {
    id: 'BJ-001',
    category: 'Room Proportionate',
    item: 'Deluxe Private Room Tariff (Room 408)',
    amount: 18000,
    assessment: 'NEEDS_REVIEW',
    sourceDocument: 'Hospital Final Bill & Policy Cl. 4.2',
    policyClauseRef: 'Section 4.2',
    confidence: 'MEDIUM',
    description: 'Proportionate room rent deduction applied broadly across bill items.',
    explanation: 'The patient selected a Deluxe room at ₹7,000/day while the policy specifies 1% of Sum Insured (₹4,000/day). While the direct bed tariff difference (₹12,000) is valid, the insurer proportionately reduced associated medical and surgical fees. We recommend requesting clarification from the hospital whether doctor fees are room-grade dependent.',
    recommendedAction: 'Request itemized clarification from hospital billing desk and challenge non-room linked charges.',
    benchmarkContext: 'Room limit: ₹4,000/day. Billed: ₹7,000/day. Direct delta: ₹12,000. Over-deduction: ₹6,000.',
  },
  {
    id: 'BJ-002',
    category: 'Billing Pattern',
    item: 'Disposable Pulse Oximeter Sensor Lead (x2 on 22-Sep)',
    amount: 1800,
    assessment: 'CHALLENGEABLE',
    sourceDocument: 'Hospital Itemized Invoice (Lines #06 & #07)',
    confidence: 'HIGH',
    description: 'Possible duplicate billing entry within a 4-hour window.',
    explanation: 'The same disposable sensor lead (code SENS-OX) was billed twice on 22 September (at 08:30 and 12:45). There is no clinical documentation in the HDU nursing chart indicating sensor displacement, malfunction, or patient transfer during that interval.',
    recommendedAction: 'Request Apollo billing department to verify nursing station charge slips and credit back ₹1,800 or seek insurance reimbursement justification.',
    benchmarkContext: 'Standard single-use HDU stay utilizes 1 pulse oximeter lead per 48 hours.',
  },
  {
    id: 'BJ-003',
    category: 'Billing Pattern',
    item: 'Pre-Anesthetic Checkup & Evaluation (PAC) Billed Separately',
    amount: 3500,
    assessment: 'NEEDS_REVIEW',
    sourceDocument: 'Hospital Itemized Invoice (Line #11)',
    confidence: 'MEDIUM',
    description: 'Possible unbundling of routine pre-operative anesthesia evaluation.',
    explanation: 'A separate fee of ₹3,500 was billed for Pre-Anesthetic Checkup in addition to the senior anesthesiologist intra-operative fee of ₹12,000 and OT package of ₹26,000. Under NABH billing frameworks, routine pre-op rounds by in-house anesthesiologists are typically bundled.',
    recommendedAction: 'Request hospital billing department for itemized justification of separate PAC billing vs OT package inclusions.',
    benchmarkContext: 'Typical stand-alone PAC consultation benchmark is ₹800–₹1,200 when not bundled.',
  },
  {
    id: 'BJ-004',
    category: 'Reference Benchmark',
    item: 'Sterile Micro-Surgical Gloves (10 Pairs Pack)',
    amount: 1200,
    assessment: 'CHALLENGEABLE',
    sourceDocument: 'Hospital Invoice (Line #13) vs NPPA Benchmark',
    confidence: 'HIGH',
    description: 'Above available reference range; disallowed by insurer as consumable.',
    explanation: 'Hospital billed ₹1,200 for 10 pairs of sterile surgical gloves (unit price ₹120/pair). Prevailing reference benchmark is ₹400–₹700. Insurer completely disallowed the item under non-payables, though it was essential to surgery. The billed amount is above reference range; this does not establish overcharging, but warrants requesting clarification while challenging the full insurance deduction.',
    recommendedAction: 'Appeal insurance deduction under OT surgical necessity clause while requesting hospital justification for unit pricing.',
    benchmarkContext: 'Reference benchmark range: ₹400–₹700. Billed: ₹1,200. Deviation: +71%.',
  },
];

export const DEMO_TIMELINE: CaseTimelineEvent[] = [
  {
    id: 'TL-01',
    date: '2026-09-26',
    title: 'Hospital Discharge & Bill Incurred',
    description: 'Patient discharged from Apollo Multispeciality Hospitals. Final bill generated for ₹1,84,000.',
    status: 'completed',
    category: 'system',
  },
  {
    id: 'TL-02',
    date: '2026-09-28',
    title: 'Claim Settlement Advice Issued',
    description: 'Star Health settled ₹1,32,000 out of ₹1,84,000. ₹52,000 deducted across 5 categories.',
    status: 'completed',
    category: 'insurer',
  },
  {
    id: 'TL-03',
    date: '2026-10-01',
    title: 'Documents Uploaded to Bill Jaanch',
    description: 'Itemized hospital invoice, policy document, and settlement notice processed by agent.',
    status: 'completed',
    category: 'system',
  },
  {
    id: 'TL-04',
    date: '2026-10-01',
    title: 'Cross-Check & Evidence Mapping Complete',
    description: '₹34,000 identified as potentially challengeable. 3 billing patterns flagged for hospital review.',
    status: 'completed',
    category: 'system',
  },
  {
    id: 'TL-05',
    date: '2026-10-01',
    title: 'Formal Appeal Letter Ready for Review',
    description: 'Point-by-point evidence-backed appeal generated citing Policy Clauses 4.2, 6.1, 8.3 and IRDAI circular.',
    status: 'current',
    category: 'user',
    actionLabel: 'Review & Approve Appeal',
  },
  {
    id: 'TL-06',
    date: '2026-10-05',
    title: 'Insurer Turnaround Acknowledgment Expected',
    description: 'Mandatory 3-day insurer acknowledgment window as per IRDAI Consumer Protection Regulations.',
    status: 'upcoming',
    category: 'insurer',
  },
  {
    id: 'TL-07',
    date: '2026-10-08',
    title: 'Automated Follow-Up Reminder (Simulated)',
    description: 'If no substantive response received within 7 days, agent sends Stage-1 reminder to TPA grievance desk.',
    status: 'upcoming',
    category: 'system',
  },
  {
    id: 'TL-08',
    date: '2026-10-15',
    title: 'Escalation to Grievance Redressal Officer (GRO)',
    description: 'If claim remains unresolved after 15 days, escalate to Principal Grievance Officer and IRDAI Bima Bharosa portal.',
    status: 'upcoming',
    category: 'regulatory',
  },
  {
    id: 'TL-09',
    date: '2026-10-30',
    title: 'Insurance Ombudsman Hearing Preparation',
    description: 'Preparation of Form VI-A for legal Ombudsman redressal in case of dispute continuation.',
    status: 'upcoming',
    category: 'regulatory',
  },
];

export const INITIAL_APPEAL_LETTER = `Date: 01 October 2026

To,
The Grievance Redressal Officer / Head of Claims
Star Health and Allied Insurance Company Limited
Reference: Claim No. BJ-1042 / Policy No. SH-SYN-99210-44

Subject: Request for Reconsideration and Re-evaluation of Disallowed Deductions (₹34,000 out of ₹52,000) under Policy No. SH-SYN-99210-44

Dear Claims Team,

I am writing to respectfully request a comprehensive reconsideration of specific deductions made in the settlement advice dated 28 September 2026 for the hospitalization of Smt. Sunita Sharma (Patient ID: SYN-PT-8942) at Apollo Multispeciality Hospitals between 21 September 2026 and 25 September 2026.

Against the submitted total admissible claim of ₹1,84,000, your office approved ₹1,32,000 and deducted ₹52,000. While I accept the contractually supported administrative fees of ₹2,500 and the direct room rent tariff difference of ₹12,000, an evidence-based review indicates that deductions totaling ₹34,000 appear challengeable and warrant re-admissibility under your policy terms and IRDAI standards:

1. RECONSIDERATION OF NON-PAYABLE SURGICAL CONSUMABLES (₹12,000)
- Reason Cited by Insurer: Disallowed under Non-Payable items.
- Policy Reference: Section 8.3 (Consumables & Surgical Items Schedule).
- Evidence & Rebuttal: Under Section 8.3 of your policy schedule, it is explicitly provided that "items essential and integral to the surgical procedure shall be admitted when billed with clinical justification." The disallowed items (sterile micro-surgical gloves, laparoscopic barrier drapes, and absorbable polyglactin sutures) were clinically vital for the laparoscopic cholecystectomy in the OT. Furthermore, as per the IRDAI Master Circular (Ref: IRDAI/HLT/REG/CIR/193/07/2020 Annexure I), these surgical items are admissible.

2. REVERSAL OF PROPORTIONATE REDUCTION ON DIAGNOSTIC INVESTIGATIONS (₹4,000)
- Reason Cited by Insurer: Proportionate deduction applied across associated medical charges.
- Policy Reference: Section 4.2.
- Evidence & Rebuttal: Proportionate reduction was applied to CECT Abdomen and laboratory blood profiles. As established by IRDAI regulations, diagnostic laboratory tariffs are fixed hospital-wide and do not vary based on room category. Scaling down fixed diagnostic rates is impermissible under standard regulatory guidelines.

3. ADMISSIBILITY OF POST-DISCHARGE PHARMACY UPON SUBMISSION OF RETAIL VOUCHER (₹12,000)
- Reason Cited by Insurer: Disallowed due to lack of separate itemized voucher.
- Policy Reference: Section 6.1 (Post-Hospitalization Medical Expenses).
- Evidence & Rebuttal: Section 6.1 guarantees post-hospitalization coverage for up to 60 days following discharge. Enclosed herewith is the stamped retail pharmacy tax invoice #AP-8849 bearing the hospital’s GSTIN, along with the consultant’s discharge prescription for the prescribed recovery regimen.

4. PARTIAL ROOM-RENT SCALEDOWN CLARIFICATION (₹6,000)
- While the daily bed differential (4 days × ₹3,000) is accepted, the proportionate deduction on surgeon fee is disputed as the treating surgeon has confirmed a uniform professional fee structure regardless of bed category.

REQUESTED RESOLUTION:
In light of the documentary evidence and referenced policy clauses, I kindly request your claims team to review these items and disburse the balance recoverable amount of ₹34,000 to the registered bank account within the statutory 15-day timeline mandated by IRDAI.

Enclosures:
1. Copy of Settlement Advice BJ-1042
2. Apollo Hospital Final Itemized Bill & Operative Notes
3. Apollo Pharmacy Stamped Retail Tax Invoice #AP-8849
4. Treating Consultant Discharge Prescription

Thank you for your prompt attention to this matter.

Sincerely,
Sunita Sharma / Authorized Representative
Contact: sunita.demo@billjaanch.org
Policy No.: SH-SYN-99210-44`;

export const INITIAL_DEMO_CLAIM: ClaimData = {
  claimId: 'BJ-1042',
  status: 'APPEAL_READY',
  createdAt: '2026-10-01T10:00:00Z',
  lastUpdated: '2026-10-01T14:30:00Z',
  hospitalBill: {
    id: 'HB-8942',
    billNumber: 'APO-2026-89421',
    hospitalName: 'Apollo Multispeciality Hospitals',
    hospitalAddress: 'Plot 21, Greams Lane, Chennai, Tamil Nadu',
    patientIdentifier: 'SYN-PT-8942',
    patientName: 'Sunita Sharma (Synthetic Demo)',
    admissionDate: '2026-09-21',
    dischargeDate: '2026-09-25',
    roomCategory: 'Deluxe Private (Room 408)',
    treatingDoctor: 'Dr. K. S. Ramanathan, MS (Gen Surg)',
    department: 'Minimally Invasive General Surgery',
    subtotal: 172000,
    taxes: 12000,
    discounts: 0,
    netAmount: 184000,
    lineItems: DEMO_LINE_ITEMS,
  },
  insurancePolicy: {
    policyNumber: 'SH-SYN-99210-44',
    insurerName: 'Star Health and Allied Insurance',
    tpaName: 'In-House TPA (Star Health Claims Hub)',
    productName: 'Comprehensive Health Insurance Gold',
    sumInsured: 400000,
    policyPeriod: '2026-01-15 to 2027-01-14',
    roomRentLimitDescription: '1% of Sum Insured per day (₹4,000/day max)',
    roomRentDailyLimit: 4000,
    copayPercentage: 0,
    waitingPeriodPecYears: 2,
    postHospitalizationDays: 60,
    clauses: DEMO_POLICY_CLAUSES,
  },
  settlement: {
    settlementNumber: 'ST-2026-99120',
    claimId: 'BJ-1042',
    date: '2026-09-28',
    totalClaimed: 184000,
    totalApproved: 132000,
    totalDeducted: 52000,
    deductions: DEMO_DEDUCTIONS,
  },
  findings: DEMO_FINDINGS,
  timeline: DEMO_TIMELINE,
  appealLetterText: INITIAL_APPEAL_LETTER,
  appealApprovedByUser: false,
  reminderSentCount: 0,
};
