export type AssessmentStatus = 'SUPPORTED' | 'CHALLENGEABLE' | 'NEEDS_REVIEW' | 'INSUFFICIENT_EVIDENCE';

export type CaseState =
  | 'DOCUMENT_COLLECTION'
  | 'ANALYSIS'
  | 'APPEAL_READY'
  | 'WAITING_FOR_INSURER'
  | 'REMINDER_DUE'
  | 'ESCALATION_REVIEW'
  | 'RESOLVED';

export interface BillLineItem {
  id: string;
  code: string;
  name: string;
  category: 'Room & Nursing' | 'ICU & Monitoring' | 'Surgery & OT' | 'Consumables & PPE' | 'Pharmacy' | 'Diagnostics' | 'Administrative';
  date: string;
  qty: number;
  unitPrice: number;
  total: number;
  referenceBenchmark?: {
    min: number;
    max: number;
    source: string;
    note: string;
  };
  auditFlag?: 'above_reference' | 'possible_duplicate' | 'possible_unbundling' | 'normal';
  auditFindingId?: string;
}

export interface HospitalBill {
  id: string;
  billNumber: string;
  hospitalName: string;
  hospitalAddress: string;
  patientIdentifier: string; // Synthetic e.g. SYN-PT-8942
  patientName: string; // Synthetic demo name
  admissionDate: string;
  dischargeDate: string;
  roomCategory: string;
  treatingDoctor: string;
  department: string;
  subtotal: number;
  taxes: number;
  discounts: number;
  netAmount: number;
  lineItems: BillLineItem[];
}

export interface PolicyClause {
  id: string;
  section: string;
  title: string;
  category: string;
  exactText: string;
  simplifiedExplanation: string;
  sourceDoc: string;
  pageNumber: number;
}

export interface InsurancePolicy {
  policyNumber: string;
  insurerName: string;
  tpaName: string;
  productName: string;
  sumInsured: number;
  policyPeriod: string;
  roomRentLimitDescription: string;
  roomRentDailyLimit: number;
  copayPercentage: number;
  waitingPeriodPecYears: number;
  postHospitalizationDays: number;
  clauses: PolicyClause[];
}

export interface ClaimDeduction {
  id: string;
  category: string;
  amount: number;
  insurerReason: string;
  citedPolicyClause?: string;
  policyClauseId?: string;
  relatedBillItemIds: string[];
  assessment: AssessmentStatus;
  agentReasoning: string;
  challengeableAmount: number;
  supportedAmount: number;
  recommendedAction: string;
  evidenceSnippets: {
    label: string;
    text: string;
    source: string;
  }[];
}

export interface SettlementLetter {
  settlementNumber: string;
  claimId: string;
  date: string;
  totalClaimed: number;
  totalApproved: number;
  totalDeducted: number;
  deductions: ClaimDeduction[];
}

export interface BillFinding {
  id: string;
  category: 'Billing Pattern' | 'Reference Benchmark' | 'Consumables & PPE' | 'Room Proportionate' | 'Documentation';
  item: string;
  amount: number;
  assessment: AssessmentStatus;
  sourceDocument: string;
  policyClauseRef?: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  explanation: string;
  recommendedAction: string;
  benchmarkContext?: string;
}

export interface CaseTimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming' | 'action_required';
  category: 'system' | 'user' | 'insurer' | 'regulatory';
  actionLabel?: string;
}

export interface ClaimData {
  claimId: string;
  status: CaseState;
  createdAt: string;
  lastUpdated: string;
  hospitalBill: HospitalBill;
  insurancePolicy: InsurancePolicy;
  settlement: SettlementLetter;
  findings: BillFinding[];
  timeline: CaseTimelineEvent[];
  appealLetterText: string;
  appealApprovedByUser: boolean;
  appealSentDate?: string;
  reminderSentCount: number;
}

export type SupportedLanguage = 'en' | 'hi' | 'ta';
