import { SupportedLanguage } from '../types';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  subheadline: string;
  analyzeClaim: string;
  seeHowItWorks: string;
  loadDemoClaim: string;
  claimId: string;
  hospitalBill: string;
  amountClaimed: string;
  amountApproved: string;
  amountDeducted: string;
  potentiallyChallengeable: string;
  likelySupported: string;
  evidenceBasedEstimate: string;
  challengeableDisclaimer: string;
  safetyDisclaimer: string;
  finalQuote: string;
  tabs: {
    dashboard: string;
    documents: string;
    billAudit: string;
    deductions: string;
    findings: string;
    appeal: string;
    timeline: string;
    preAdmission: string;
    mcpToolkit: string;
  };
  statuses: {
    supported: string;
    challengeable: string;
    needsReview: string;
    insufficientEvidence: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    appName: 'Bill Jaanch',
    tagline: 'Understand Your Hospital Bill. Challenge What Doesn’t Add Up.',
    subheadline: 'Bill Jaanch cross-references your itemized hospital invoice, insurance policy clauses, and settlement letter to uncover deductions that appear challengeable, provide documentary evidence, and draft formal appeals.',
    analyzeClaim: 'Analyze a Claim',
    seeHowItWorks: 'See How It Works',
    loadDemoClaim: 'Load Demo Claim (₹1.84L Bill / ₹52K Deducted)',
    claimId: 'Claim ID',
    hospitalBill: 'Hospital Bill',
    amountClaimed: 'Amount Claimed',
    amountApproved: 'Amount Approved',
    amountDeducted: 'Amount Deducted',
    potentiallyChallengeable: 'Potentially Challengeable',
    likelySupported: 'Likely Supported',
    evidenceBasedEstimate: 'Evidence-Based Estimate',
    challengeableDisclaimer: '₹34,000 appears challengeable based on the uploaded documents and available reference evidence.',
    safetyDisclaimer: 'Bill Jaanch provides document-based decision support. It does not provide medical, legal, or financial advice. Users should verify findings and review all communications before sending them.',
    finalQuote: '“The hospital knows the bill. The insurer knows the policy. Now the patient can understand both.”',
    tabs: {
      dashboard: 'Dashboard',
      documents: 'Documents',
      billAudit: 'Bill Audit',
      deductions: 'Clause Map & Deductions',
      findings: 'Findings',
      appeal: 'Appeal Generator',
      timeline: 'Timeline & Follow-up',
      preAdmission: 'Pre-Admission Mode',
      mcpToolkit: 'Bharat Claims MCP',
    },
    statuses: {
      supported: 'Supported',
      challengeable: 'Challengeable',
      needsReview: 'Needs Review',
      insufficientEvidence: 'Insufficient Evidence',
    },
  },
  hi: {
    appName: 'बिल जाँच (Bill Jaanch)',
    tagline: 'अस्पताल के बिल को समझें। जो सही न लगे, उस पर सवाल उठाएं।',
    subheadline: 'बिल जाँच आपके अस्पताल बिल, बीमा पॉलिसी और कटौती पत्र का मिलान करके सबूत-आधारित अपील तैयार करता है।',
    analyzeClaim: 'दावे की जाँच करें',
    seeHowItWorks: 'यह कैसे काम करता है',
    loadDemoClaim: 'डेमो दावा लोड करें (₹1.84 लाख बिल / ₹52,000 कटौती)',
    claimId: 'दावा संख्या (Claim ID)',
    hospitalBill: 'अस्पताल बिल',
    amountClaimed: 'दावा की गई राशि',
    amountApproved: 'स्वीकृत राशि',
    amountDeducted: 'काटी गई राशि',
    potentiallyChallengeable: 'संभावित चुनौती योग्य राशि',
    likelySupported: 'पॉलिसी अनुसार मान्य',
    evidenceBasedEstimate: 'सबूत-आधारित अनुमान',
    challengeableDisclaimer: 'दस्तावेजों और संदर्भ साक्ष्यों के आधार पर ₹34,000 की कटौती पर पुनर्विचार संभव प्रतीत होता है।',
    safetyDisclaimer: 'बिल जाँच दस्तावेज़-आधारित निर्णय सहायता प्रदान करता है। यह कोई कानूनी, चिकित्सीय या वित्तीय सलाह नहीं है।',
    finalQuote: '“अस्पताल को बिल पता है। बीमा कंपनी को पॉलिसी पता है। अब मरीज दोनों को समझ सकता है।”',
    tabs: {
      dashboard: 'डैशबोर्ड',
      documents: 'दस्तावेज़',
      billAudit: 'बिल ऑडिट',
      deductions: 'क्लॉज और कटौती मैप',
      findings: 'निष्कर्ष',
      appeal: 'अपील पत्र तैयार करें',
      timeline: 'समयरेखा व फॉलो-अप',
      preAdmission: 'भर्ती से पहले जाँच',
      mcpToolkit: 'भारत क्लेम्स MCP',
    },
    statuses: {
      supported: 'समर्थित (Supported)',
      challengeable: 'चुनौती योग्य (Challengeable)',
      needsReview: 'समीक्षा आवश्यक (Needs Review)',
      insufficientEvidence: 'अपर्याप्त साक्ष्य (Insufficient)',
    },
  },
  ta: {
    appName: 'பில் ஜாஞ்ச் (Bill Jaanch)',
    tagline: 'உங்கள் மருத்துவமனை பில்லைப் புரிந்து கொள்ளுங்கள். நியாயமற்ற பிடித்தங்களை எதிர்த்து கேளுங்கள்.',
    subheadline: 'பில் ஜாஞ்ச் உங்கள் மருத்துவமனை ரசீது, காப்பீட்டுக் கொள்கை மற்றும் தீர்வு கடிதத்தை ஆய்வு செய்து ஆதாரத்துடன் மேல்முறையீடு செய்ய உதவுகிறது.',
    analyzeClaim: 'கோரிக்கையை ஆராய்க',
    seeHowItWorks: 'எவ்வாறு செயல்படுகிறது',
    loadDemoClaim: 'மாதிரி கோரிக்கையை ஏற்று (₹1.84 லட்சம் பில் / ₹52,000 பிடித்தம்)',
    claimId: 'கோரிக்கை எண்',
    hospitalBill: 'மருத்துவமனை பில்',
    amountClaimed: 'கோரப்பட்ட தொகை',
    amountApproved: 'ஒப்புதல் அளிக்கப்பட்ட தொகை',
    amountDeducted: 'பிடித்தம் செய்யப்பட்ட தொகை',
    potentiallyChallengeable: 'மறுபரிசீலனை செய்யக்கூடிய தொகை',
    likelySupported: 'விதிகளுக்கு உட்பட்ட பிடித்தம்',
    evidenceBasedEstimate: 'ஆதார அடிப்படையிலான மதிப்பீடு',
    challengeableDisclaimer: 'பதிவேற்றப்பட்ட ஆவணங்களின்படி ₹34,000 பிடித்தம் மேல்முறையீடு செய்ய தகுதியுடையதாகக் காணப்படுகிறது.',
    safetyDisclaimer: 'பில் ஜாஞ்ச் ஆவண அடிப்படையிலான முடிவெடுக்கும் ஆதரவை மட்டுமே வழங்குகிறது; இது மருத்துவ அல்லது சட்ட ஆலோசனையல்ல.',
    finalQuote: '“மருத்துவமனைக்கு பில் தெரியும். காப்பீட்டு நிறுவனத்திற்கு பாலிசி தெரியும். இப்போது நோயாளியும் இரண்டையும் புரிந்து கொள்ள முடியும்.”',
    tabs: {
      dashboard: 'முகப்பு பலகை',
      documents: 'ஆவணங்கள்',
      billAudit: 'பில் தணிக்கை',
      deductions: 'பாலிசி & பிடித்த வரைபடம்',
      findings: 'கண்டுபிடிப்புகள்',
      appeal: 'மேல்முறையீட்டு கடிதம்',
      timeline: 'காலவரிசை & பின்தொடர்தல்',
      preAdmission: 'சேர்க்கைக்கு முந்தைய ஆய்வு',
      mcpToolkit: 'பாரத் கிளைம்ஸ் MCP',
    },
    statuses: {
      supported: 'ஆதரவுள்ளது (Supported)',
      challengeable: 'சவால் செய்யத்தக்கது (Challengeable)',
      needsReview: 'மறுஆய்வு தேவை (Needs Review)',
      insufficientEvidence: 'போதுமான ஆதாரமில்லை',
    },
  },
};
