/**
 * Application Packet PDF Generator (12-Page Format)
 * Matches ISC application packet format with Capital & Co branding
 */

import QRCode from 'qrcode';

interface ApplicationPacketData {
  qrCodeDataUrl?: string; // Base64 QR code data URL
  // Application Metadata
  applicationId: string;
  submissionId: string;
  formDate: string;

  // Agency Information
  agencyName: string;
  agentName: string;
  agencyAddress: string;
  agencyCity: string;
  agencyState: string;
  agencyZip: string;
  agencyPhone: string;
  agencyEmail: string;
  capitalCoLogoSVG?: string; // SVG content for Capital & Co logo

  // Applicant/Insured Information
  companyName: string;
  dba?: string;
  contactPerson: string;
  applicantAddress: string;
  applicantCity: string;
  applicantState: string;
  applicantZip: string;
  applicantPhone: string;
  applicantEmail: string;
  fein: string;
  entityType: string;
  yearsInBusiness: number;
  yearsExperienceInTrades: number;
  statesOfOperation: string;
  workIn5Boroughs: boolean;
  otherBusinessNames?: string;
  paymentOption: string;

  // Loss History
  generalLiabilityLosses?: {
    dateOfLoss: string;
    amountOfLoss: string;
  }[];

  // Quote Information
  quoteType: string;
  carrierName: string;
  coverageType: string;
  desiredCoverageDates: string;
  /** When true (approved quote), state-specific forms section is included in the packet */
  includeStateForms?: boolean;

  /** When true, pages 8, 9, 10 are excluded from packet */
  excludePages8910?: boolean;


  // General Liability Coverages
  aggregateLimit: string;
  occurrenceLimit: string;
  productsCompletedOpsLimit: string;
  personalAdvertisingInjuryLimit: string;
  fireLegalLimit: string;
  medPayLimit: string;
  selfInsuredRetention: string;

  // Class Code & Gross Receipts
  classCode: string;
  grossReceipts: string;

  // Current Exposures
  estimatedTotalGrossReceipts: string;
  estimatedSubContractingCosts: string;
  estimatedMaterialCosts: string;
  estimatedTotalPayroll: string;
  numberOfFieldEmployees: string; // Format: "Owner + X"

  // Work Performed
  workDescription: string;
  percentageResidential: number;
  percentageCommercial: number;
  percentageNewConstruction: number;
  percentageRemodel: number;
  maxInteriorStories: number;
  maxExteriorStories: number;
  maxExteriorDepthBelowGrade: number;
  performOCIPWork: boolean;
  ocipReceipts?: string;
  nonOCIPReceipts?: string;
  lossesInLast5Years: number;

  // Work Experience Questions (Yes/No with explanations)
  performHazardousWork?: boolean;
  hazardousWorkExplanation?: string;
  performMedicalFacilitiesWork?: boolean;
  medicalFacilitiesExplanation?: string;
  performStructuralWork?: boolean;
  performTractHomeWork?: boolean;
  tractHomeExplanation?: string;
  workCondoConstruction?: boolean;
  performCondoRepairOnly?: boolean;
  performRoofingOps?: boolean;
  roofingExplanation?: string;
  performWaterproofing?: boolean;
  waterproofingExplanation?: string;
  useHeavyEquipment?: boolean;
  heavyEquipmentExplanation?: string;
  workOver5000SqFt?: boolean;
  workOver5000SqFtPercent?: number;
  workOver5000SqFtExplanation?: string;
  workCommercialOver20000SqFt?: boolean;
  commercialOver20000SqFtPercent?: number;
  commercialOver20000SqFtExplanation?: string;
  licensingActionTaken?: boolean;
  licensingActionExplanation?: string;
  allowedLicenseUseByOthers?: boolean;
  allowedLicenseUseByOthersExplanation?: string;
  judgementsOrLiens?: boolean;
  judgementsExplanation?: string;
  lawsuitsOrClaims?: boolean;
  lawsuitsExplanation?: string;
  knownIncidentsOrClaims?: boolean;
  potentialClaimsExplanation?: string;

  // Written Contract Questions
  writtenContractForAllWork?: boolean;
  contractHasStartDate?: boolean;
  contractStartDateExplanation?: string;
  contractHasScopeOfWork?: boolean;
  contractScopeExplanation?: string;
  contractIdentifiesSubcontractedTrades?: boolean;
  contractSubcontractedTradesExplanation?: string;
  contractHasSetPrice?: boolean;
  contractSetPriceExplanation?: string;
  contractSignedByAllParties?: boolean;
  contractSignedExplanation?: string;
  doSubcontractWork?: boolean;
  alwaysCollectCertificatesFromSubs?: boolean;
  collectCertificatesExplanation?: string;
  requireSubsEqualInsuranceLimits?: boolean;
  subsEqualLimitsExplanation?: string;
  requireSubsNameAsAdditionalInsured?: boolean;
  subsAdditionalInsuredExplanation?: string;
  haveStandardFormalAgreementWithSubs?: boolean;
  standardAgreementExplanation?: string;
  agreementHasHoldHarmless?: boolean;
  holdHarmlessExplanation?: string;
  requireSubsWorkersComp?: boolean;
  subsWorkersCompExplanation?: string;

  // Policy Endorsements
  policyEndorsements?: string;

  // Policy Endorsements (checkbox-driven)
  blanketAdditionalInsured?: boolean;
  blanketWaiverOfSubrogation?: boolean;
  blanketPrimaryWording?: boolean;
  blanketPerProjectAggregate?: boolean;
  blanketCompletedOperations?: boolean;
  noticeOfCancellationThirdParties?: boolean;

  // Application Agreement - Signatures
  applicantSignature?: string;
  applicantSignatureDate?: string;
  applicantTitle?: string;
  producerSignature?: string;
  producerSignatureDate?: string;

  // Page 9: Disclosure of Premium
  terrorismCoveragePremium?: string;
  rejectionStatementSignature?: string;
  rejectionStatementDate?: string;
  rejectionStatementPrintedName?: string;

  // Page 10: Surplus Lines Compliance
  policyNumber?: string;
  surplusLinesSignature?: string;
  surplusLinesDate?: string;

  // Page 11: Loss Warranty Letter
  lossWarrantyCompanySignature?: string;
  lossWarrantyDate?: string;
  lossWarrantySignature?: string;
  lossWarrantyTitle?: string;

  // Page 12: Invoice Statement
  programName?: string;
  premium?: string;
  stateTax?: string;
  associationDues?: string;
  policyFee?: string;
  inspectionFee?: string;
  fireMarshalTax?: string;
  totalCostOfPolicy?: string;
  depositPremium?: string;
  depositAssociationDues?: string;
  depositStateTax?: string;
  depositPolicyFee?: string;
  depositInspectionFee?: string;
  depositFireMarshal?: string;
  aiProcessingFee?: string;
  totalDeposit?: string;
  totalToRetain?: string;
  totalToBeSent?: string;
  invoiceProducerSignature?: string;
}


const formatUSD = (value?: number | string) => {
  if (!value) return '$0.00';
  return `$${parseFloat(value.toString()).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};


/**
 * Generate QR code URL (using a QR code API service)
 * For PDFShift compatibility, we use smaller size or text-only in production
 */
function generateQRCodeURL(text: string, size: number = 100, useTextFallback: boolean = false): string {
  // In production/PDFShift, use text-only to reduce size
  if (useTextFallback || process.env.VERCEL || process.env.NODE_ENV === 'production') {
    return ''; // Return empty to use text-only fallback
  }
  // Using a free QR code API - smaller size for better compatibility
  return `https://api.qrserver.com/v1/create-qr-code/?size=${Math.min(size, 60)}x${Math.min(size, 60)}&data=${encodeURIComponent(text)}`;
}

/**
 * Format Yes/No with styled options
 */
function formatYesNo(value: boolean | null | undefined, defaultValue?: boolean): string {
  // If value is explicitly null or undefined and no default, show neither selected
  if (value === null || value === undefined) {
    if (defaultValue === undefined) {
      return '<span class="yes-option">Yes</span><span class="no-option">No</span>';
    }
    // Use default value if provided
    return defaultValue
      ? '<span class="yes-option selected">Yes</span><span class="no-option">No</span>'
      : '<span class="yes-option">Yes</span><span class="no-option selected">No</span>';
  }
  // Value is explicitly true or false
  return value
    ? '<span class="yes-option selected">Yes</span><span class="no-option">No</span>'
    : '<span class="yes-option">Yes</span><span class="no-option selected">No</span>';
}

/**
 * Generate Capital & Co Logo HTML (with two hands)
 * Optimized: Uses SVG reference to avoid duplication
 */
function generateCapitalCoLogoHTML(svgContent?: string, size: string = '100%', logoId: string = 'capital-co-logo'): string {
  if (svgContent) {
    // Optimize SVG: Remove XML declaration, comments, and unnecessary whitespace
    let optimizedSVG = svgContent
      .replace(/<\?xml[^>]*\?>/g, '') // Remove XML declaration
      .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/>\s+</g, '><') // Remove space between tags
      .trim();

    // Extract viewBox if present, or use default
    const viewBoxMatch = optimizedSVG.match(/viewBox=["']([^"']+)["']/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 100 120';

    // Remove existing width/height/style attributes
    optimizedSVG = optimizedSVG.replace(/<svg([^>]*)>/, `<svg$1>`);

    // Create optimized inline SVG with proper sizing
    return `<svg viewBox="${viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:${size};height:${size};" preserveAspectRatio="xMidYMid meet">${optimizedSVG.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}</svg>`;
  }
  // SVG fallback (simple placeholder)
  return `<svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:${size};height:${size};"><defs><linearGradient id="handsGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#7dd3fc" stop-opacity="0.95"/><stop offset="50%" stop-color="#60a5fa" stop-opacity="0.9"/><stop offset="100%" stop-color="#3b82f6" stop-opacity="0.85"/></linearGradient></defs><path d="M30 15 Q35 10 45 12 Q55 14 60 20 Q65 28 62 38 Q60 45 55 50 Q50 52 45 50 Q40 48 38 45 Q35 40 35 35 Q33 28 35 22 Q32 18 30 15 Z" fill="url(#handsGradient)"/><path d="M70 15 Q65 10 55 12 Q45 14 40 20 Q35 28 38 38 Q40 45 45 50 Q50 52 55 50 Q60 48 62 45 Q65 40 65 35 Q67 28 65 22 Q68 18 70 15 Z" fill="url(#handsGradient)"/><ellipse cx="50" cy="45" rx="12" ry="8" fill="url(#handsGradient)" opacity="0.4"/></svg>`;
}

/**
 * Generate Page 1: Bind Request Checklist
 */
/**
 * Generate QR Code as base64 data URL (no external API calls)
 */
async function generateQRCodeBase64(text: string, size: number = 200): Promise<string> {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(text, {
      width: size,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'M'
    });
    return qrCodeDataUrl;
  } catch (error) {
    console.error('[QR Code] Error generating QR code:', error);
    // Return a simple placeholder SVG if QR generation fails
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5RUiBDb2RlPC90ZXh0Pjwvc3ZnPg==';
  }
}

/**
 * Generate QR Code HTML with embedded base64 data URL
 */
function generateQRCodeHTML(qrCodeDataUrl: string): string {
  return `<div class="qr-code"><img src="${qrCodeDataUrl}" alt="QR Code" style="width: 0.7in; height: 0.7in; display: block;" /></div>`;
}

// Generate Page 1: Bind Request Checklist

// function generatePage1(data: ApplicationPacketData): string {
//   const qrCodeText = `${data.applicationId}`;
//   const qrCodePageText = `00${data.applicationId}P1`;

//   return `
//     <div class="page page1-specific" style="page-break-after: always;">
//       <div class="sidebar sidebar-page1">
//         <div class="logo-container logo-page1">
//           <div class="logo logo-sterling-page1">
//           ${generateCapitalCoLogoHTML(data.capitalCoLogoSVG)}
//             <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
//               <defs>
//                 <linearGradient id="sterlingGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
//                   <stop offset="0%" stop-color="#00BCD4" stop-opacity="0.9" />
//                   <stop offset="100%" stop-color="#0097A7" stop-opacity="0.95" />
//                 </linearGradient>
//                 <linearGradient id="sterlingGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
//                   <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.25" />
//                   <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.1" />
//                 </linearGradient>
//               </defs>
//               <path d="M50 10 L80 25 L80 55 Q80 75 50 90 Q20 75 20 55 L20 25 Z" fill="url(#sterlingGradient1)" />
//               <path d="M50 25 L65 40 L50 70 L35 40 Z" fill="url(#sterlingGradient2)" />
//               <path d="M50 30 L50 65" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" />
//               <path d="M40 47 L60 47" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" opacity="0.8" />
//             </svg>
//           </div>
//         </div>
//         <div class="sidebar-title-vertical page1-title">Bind Request Checklist</div>
//         <div class="qr-container qr-page1">
//           ${data.qrCodeDataUrl ? generateQRCodeHTML(data.qrCodeDataUrl) : `<div class="qr-code-text-only">${qrCodeText}</div>`}
//           <div class="qr-text qr-text-page1">${qrCodeText}</div>
//           <div class="qr-page qr-page-text">${qrCodePageText}</div>
//           <div class="producer-icon">
//             <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 0.48in; height: 0.48in;">
//               <circle cx="28" cy="16" r="8" stroke="#1f2937" stroke-width="2.5" fill="none" stroke-linecap="round"/>
//               <path d="M12 50c0-6.627 5.373-12 12-12h8c6.627 0 12 5.373 12 12" stroke="#1f2937" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
//               <rect x="20" y="30" width="16" height="12" rx="2" stroke="#1f2937" stroke-width="2.5" fill="none"/>
//               <path d="M24 30V26c0-1.105.895-2 2-2h4c1.105 0 2 .895 2 2v4" stroke="#1f2937" stroke-width="2.5" fill="none" stroke-linecap="round"/>
//               <line x1="26" y1="36" x2="30" y2="36" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
//             </svg>
//           </div>
//           <div class="producer-label">Producer</div>
//         </div>
//       </div>
//       <div class="main-content main-content-page1">
//         <div class="header-info-page1">
//           <div class="broker-name-page1"><strong>Broker Name:</strong> ${data.agencyName}</div>
//           <div class="applicant-name-page1"><strong>Applicant Name:</strong> ${data.companyName}</div>
//           <div class="application-id-page1"><strong>Application ID:</strong> ${data.applicationId}</div>
//         </div>
//         <div class="instructions-page1">
//           Thank you for your business. In order to expedite your request efficiently, we will need you to submit the following documents:
//         </div>
//         <div class="checklist-page1">
//           <div class="checklist-item-page1"><span class="checkbox-square"></span> Signed Application</div>
//           <div class="checklist-item-page1"><span class="checkbox-square"></span> Signed Loss Warranty Letter</div>
//           <div class="checklist-item-page1"><span class="checkbox-square"></span> Signed Terrorism Coverage Disclosure Notice</div>
//           <div class="checklist-item-page1"><span class="checkbox-square"></span> Signed Surplus Lines Affidavit</div>
//           <div class="checklist-item-page1"><span class="checkbox-square"></span> Copy of Applicant Contractor License (If Applicable)</div>
//           <div class="checklist-item-page1"><span class="checkbox-square"></span> Signed Invoice Statement</div>
//           <div class="checklist-item-page1"><span class="checkbox-square"></span> Signed Finance Agreement</div>
//         </div>
//         <div class="last-text">
//           <div class="submission-instructions-page1">
//             Please submit complete and approved apps by visiting the application detail page for App ${data.applicationId} and uploading the above documents.
//           </div>
//           <div class="binding-instructions-page1">
//             All documents must be submitted to be bound by Integrated Specialty Coverages, LLC, no binds are in effect until Broker receives confirmation from Integrated Specialty Coverages, LLC via email.
//           </div>
//         </div>
//         <div class="page-number page-number-page1">Page 1 of 1</div>
//       </div>
//     </div>
//   `;
// }

/**
 * Generate Page 2: Insurance Application - ISC Format (All details on one page)
 */
const blueAngelLogoSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="612" height="408" viewBox="0 0 612 408">
<image href="data:image/png;base64,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GGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGNF+38Utz5fQqx+vgAAAABJRU5ErkJggg==" width="612" height="408" />
</svg>
`;

const sjjLogoSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1600" viewBox="0 0 1600 1600">
<image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABkAAAAZACAYAAAAhDI6nAAEAAElEQVR4nOz9aZRl613fef6eZ+9zTkRm3kEDGtEAYtCAmQRGDAaBGWy3MWCwjV1tl+1enttVq1d316rqale52+7qqlpl7IYqt+0qe7mMl22MZxtMGSEQYpJASEhIgACBJJCEkHR1783MiDh7ePrFPhEZmTfv1RVXQvTW56OViptxTpxz9hnyxf7G8/zLNLcAAAAAAACsSf1YPwAAAAAAAICPNAEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABYHQEEAAAAAABY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QAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAAAAAAAgNURQAD+/+3ZgQwAAADAIH/re3ylEQAAAACwI0AAAAAAAIAdAQIAAAAAAOwIEAAAAAAAYEeAAAAAAAAAOwIEAAAAAADYESAAAAAAAMCOAAEAAAAAAHYECAAAAAAAsCNAAAAAAACAHQECAAAAAADsCBAAAAAAAGBHgAAAAAAAADsCBAAAAAAA2BEgAAAAAADAjgABAAAAAAB2BAgAAAAAALAjQAAAAAAAgB0BAgAAAAAA7AgQAAAAAABgR4AAAAAAAAA7AgQAAAAAANgRIAAAAAAAwI4AAQAAAAAAdgQIAAAAAACwI0AAAAAAAIAdAQIAAAAAAOwEWYZfIW01k2IAAAAASUVORK5CYII=" width="1600" height="1600"/>
</svg>
`;

function generatePage2(data: ApplicationPacketData): string {

  // ⭐ PASTE HERE
  const email = data.agencyEmail?.toLowerCase() || "";

  let selectedLogo = data.capitalCoLogoSVG;

  if (email === "info@blueangel.com") {
    selectedLogo = blueAngelLogoSVG;
  }

  if (email === "info@sjjinsurance.com") {
    selectedLogo = sjjLogoSVG;
  }

  // existing code
  const qrCodeText = `${data.applicationId}`;
  const qrCodePageText = `00${data.applicationId}P2`;


  return `
    <div class="page page2-isc" style="page-break-after: always;">
      <div class="main-content main-content-page2">

            <!-- Top Agency + Logo -->
            <div class="header-top-page2">
                <div class="agency-info-page2-left">
                    <div class="agency-name-page2">${data.agencyName}</div>
                    <div>${data.agentName}</div>
                    <div>${data.agencyAddress}</div>
                    <div>${data.agencyCity}, ${data.agencyState} ${data.agencyZip}</div>
                    <div>${data.agencyPhone}</div>
                    <div>email: ${data.agencyEmail}</div>
                </div>

                <div class="logo-icon-page2-hands">
                    ${generateCapitalCoLogoHTML(selectedLogo)}
                </div>
            </div>

            <!-- Application ID -->
            <div class="application-id-large-page2">
                General Liability Application ID: ${data.applicationId}
            </div>

            <!-- 3 Column Layout -->
            <div class="app-id-quote-parallel-page2">

                <!-- Date -->
                <div>
                    <div class="section-title-page2">Date</div>
                    <div class="date-section-page2">${data.formDate}</div>
                </div>

                <!-- Insured Information -->
                <div>
                    <div class="section-title-page2">Insured Information</div>
                    <div class="insured-detail-page2"><strong>${data.companyName}</strong></div>
                    <div class="insured-detail-page2">${data.contactPerson}</div>
                    <div class="insured-detail-page2">${data.applicantAddress}</div>
                    <div class="insured-detail-page2">
                        ${data.applicantCity}, ${data.applicantState} ${data.applicantZip}
                    </div>
                    <div class="insured-detail-page2">${data.applicantPhone}</div>
                    <div class="insured-detail-page2">email: ${data.applicantEmail}</div>
                </div>

                <!-- Quote Information -->
                <div>
                    <div class="section-title-page2">Quote Information</div>
                    <div class="quote-detail-page2">${data.quoteType}</div>
                    <div class="quote-detail-page2">${data.carrierName}</div>
                    <div class="quote-detail-page2">${data.coverageType}</div>
                    <div class="quote-detail-page2">
                        Desired Coverage Dates: ${data.desiredCoverageDates}
                    </div>
                </div>

            </div>

            <div class="applicant-info-section-page2">
                <div class="section-title-underline-page2">APPLICANT INFORMATION</div>
                <div class="applicant-field-page2"><strong>Mailing Address:</strong> ${data.applicantAddress}</div>
                <div class="applicant-field-page2"><strong>FEIN:</strong> ${data.fein || 'N/A'}</div>
                <div class="applicant-field-page2"><strong>Entity of Company:</strong> ${data.entityType}</div>
                <div class="applicant-field-page2"><strong>Years in Business:</strong> ${data.yearsInBusiness}</div>
                <div class="applicant-field-page2"><strong>Years of experience in the Trades:</strong>
                    ${data.yearsExperienceInTrades}</div>
                <div class="applicant-field-page2"><strong>States of Operation:</strong> ${data.statesOfOperation}</div>
                <div class="applicant-field-page2"><strong>Work in 5 Boroughs:</strong> ${data.workIn5Boroughs ? 'Yes' :
      'No'}</div>
                <div class="applicant-field-page2"><strong>Other Business Names:</strong> ${data.otherBusinessNames ||
    'No'}</div>
                <div class="applicant-field-page2"><strong>Payment Option:</strong> ${data.paymentOption}</div>
            </div>

            <div class="coverages-section-page2">
                <div class="section-title-underline-page2">GENERAL LIABILITY COVERAGES</div>
                <table class="coverages-table-page2">
                    <tr>
                        <td><strong>Aggregate:</strong></td>
                        <td>${data.aggregateLimit}</td>
                    </tr>
                    <tr>
                        <td><strong>Occurrence:</strong></td>
                        <td>${data.occurrenceLimit}</td>
                    </tr>
                    <tr>
                        <td><strong>Products/Completed Ops:</strong></td>
                        <td>${data.productsCompletedOpsLimit}</td>
                    </tr>
                    <tr>
                        <td><strong>Personal/Advertising Injury:</strong></td>
                        <td>${data.personalAdvertisingInjuryLimit}</td>
                    </tr>
                    <tr>
                        <td><strong>Fire Legal:</strong></td>
                        <td>${data.fireLegalLimit}</td>
                    </tr>
                    <tr>
                        <td><strong>Med Pay:</strong></td>
                        <td>${data.medPayLimit}</td>
                    </tr>
                    <tr>
                        <td><strong>Deductible:</strong></td>
                        <td>${data.selfInsuredRetention}</td>
                    </tr>
                </table>
            </div>

            <div class="section-title-underline-page2 section-divider-page2 "></div>

            <div class="class-code-gross-section-page2">

                <div>
                    <div class="class-code-title-page2">CLASS CODE</div>
                    <div class="class-code-value-page2">${data.classCode}</div>
                </div>

                <div>
                    <div class="gross-receipts-title-page2">GROSS RECEIPTS</div>
                    <div class="gross-receipts-value-page2">${data.grossReceipts}</div>
                </div>

            </div>
        </div>
    </div>
  `;
}

/**
 * Generate Page 3: Current Exposures, Work Performed, Work Experience (ISC Format - All on One Page)
 */
function generatePage3(data: ApplicationPacketData): string {
  const qrCodeText = `${data.applicationId}`;
  const qrCodePageText = `00${data.applicationId}P3`;

  return `
    <div class="page page3-isc" style="page-break-after: always;">
      <div class="main-content main-content-page3">
        <div class="section-title-uppercase-page3">CURRENT EXPOSURES</div>
        <div class="exposures-grid-page3">
          <div class="exposure-item-page3">Estimated Total Gross Receipts:<strong> ${data.estimatedTotalGrossReceipts}</strong></div>
          <div class="exposure-item-page3">Estimated Sub Contracting Costs:<strong> ${data.estimatedSubContractingCosts}</strong> </div>
          <div class="exposure-item-page3">Estimated Material Costs:<strong> ${data.estimatedMaterialCosts}</strong></div>
          <div class="exposure-item-page3">Estimated Total Payroll: <strong> ${data.estimatedTotalPayroll}</strong> </div>
          <div class="exposure-item-page3">Number of Field Employees*:<strong> ${data.numberOfFieldEmployees}</strong> </div>
        </div>
        <div class="footnote-page3">* For purposes of this application, "Employee" is defined as an individual working for you (the applicant), which receives a W-2 tax form or you withhold & pay employment related taxes for that individual.</div>
        
        <div class="section-title-uppercase-page3">WORK PERFORMED</div>
        <div class="work-description-page3">Complete Descriptions of operations that for which you are currently applying for insurance:<strong> ${data.workDescription || ''}</strong> </div>
        <div class="work-percentages-page3">
          <div class="percentage-item-page3">Percentage of Residential work performed:<strong> ${data.percentageResidential}</strong> %</div>
          <div class="percentage-item-page3">Percentage of Commercial work performed:<strong> ${data.percentageCommercial}</strong> %</div>
          <div class="percentage-item-page3">Percentage of New (Ground Up) work performed:<strong> ${data.percentageNewConstruction}</strong> %</div>
          <div class="percentage-item-page3">Percentage of Remodel/Service/Repair work performed:<strong> ${data.percentageRemodel}</strong> %</div>
        </div>
        <div class="structural-details-page3">
          <div class="detail-item-page3">Maximum # of Interior Stories:<strong> ${data.maxInteriorStories}</strong> </div>
          <div class="detail-item-page3">Maximum # of Exterior Stories: <strong>${data.maxExteriorStories}</strong></div>
          <div class="detail-item-page3">Maximum Exterior Depth Below Grade in Feet: <strong>${data.maxExteriorDepthBelowGrade}</strong></div>
        </div>
        <div class="ocip-section-page3">
          <div class="ocip-question-page3">
            Will you perform OCIP (Wrap-up) work?
            <div class="ocip-answer">
              ${formatYesNo(data.performOCIPWork)}
            </div>
          </div>

          ${data.performOCIPWork ? `
          <div class="ocip-followup-page3">
            If "Yes", what are the estimated receipts for work covered separately under OCIP/Wrap-up:
            <strong>${data.ocipReceipts || ''}</strong>
          </div>
          ` : ''}

          <div class="ocip-receipts-page3">
            Estimated Receipts for non-Wrap/OCIP:
            <strong>${data.nonOCIPReceipts || ''}</strong>
          </div>

          <div class="losses-page3">
            Number of losses in the last 5 years:
            <strong>${data.lossesInLast5Years}</strong>
          </div>
        </div>
        
        <div class="section-title-uppercase-page3">WORK EXPERIENCE</div>
        <div class="work-experience-questions-page3">
          <div class="question-item-page3">
            <div class="question-text-page3">Will you or do you perform or subcontract any work involving the following: blasting operations, hazardous waste, asbestos, mold, PCBs, oil fields, dams/levees, bridges, quarries, railroads, earthquake retrofitting, fuel tanks, pipelines, or foundation repair?</div>
            <div class="yes-no-options-page3">${formatYesNo(data.performHazardousWork)}</div>
            ${data.performHazardousWork ? `<div class="explanation-field-page3">If "Yes", please explain: ${data.hazardousWorkExplanation || ''}</div>` : ''}
          </div>
          
          <div class="question-item-page3">
            <div class="question-text-page3">Will you or do you perform or subcontract any work involving the following: medical facilities (including new construction), hospitals (including new construction), churches or other house of worship, museums, historic buildings, airports, schools/playgrounds/recreational facilities (including new construction)?</div>
            <div class="yes-no-options-page3">${formatYesNo(data.performMedicalFacilitiesWork)}</div>
            ${data.performMedicalFacilitiesWork ? `<div class="explanation-field-page3">If "Yes", please explain: ${data.medicalFacilitiesExplanation || ''}</div>` : ''}
          </div>
          
          <div class="question-item-page3">
            <div class="question-text-page3">Will you perform structural work?</div>
            <div class="yes-no-options-page3">${formatYesNo(data.performStructuralWork)}</div>
          </div>
          
          <div class="question-item-page3">
            <div class="question-text-page3">Will you perform work in new tract home developments of 25 or more units?</div>
            <div class="yes-no-options-page3">${formatYesNo(data.performTractHomeWork)}</div>
            ${data.performTractHomeWork ? `<div class="explanation-field-page3">If "Yes", please explain: ${data.tractHomeExplanation || ''}</div>` : ''}
          </div>
          
          <div class="question-item-page3">
            <div class="question-text-page3">Will any of your work involve the construction of or be for new condominiums/townhouses/multi-unit residences?: </div>
            <div class="yes-no-options-page3">${formatYesNo(data.workCondoConstruction)}</div>
          </div>
          
          <div class="question-item-page3">
            <div class="question-text-page3">Will you perform repair only for individual unit owners of condominiums/townhouses/multi-unit residences?:</div>
            <div class="yes-no-options-page3">${formatYesNo(data.performCondoRepairOnly)}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generate Page 4: Work Experience - Continued (ISC Format - All on One Page)
 */
function generatePage4(data: ApplicationPacketData): string {
  const qrCodeText = `${data.applicationId}`;
  const qrCodePageText = `00${data.applicationId}P4`;
  console.log(data.allowedLicenseUseByOthers);
  console.log(data.allowedLicenseUseByOthersExplanation);
  return `
    <div class="page page4-isc" style="page-break-after: always;">
      <div class="main-content main-content-page4">

        <div class="section-title-uppercase-page">
          WORK EXPERIENCE - CONT.
        </div>

        <div class="work-experience-questions-page4">
          <!-- 1 -->
          <div class="question-item-page4">
            <div class="question-text-page4">
              <span>Will you perform or subcontract any roofing operations, work on the roof or deck work on roofs?</span>
                <div class="yes-no-options-page4">
                  ${formatYesNo(data.performRoofingOps)}
                  </div>
                  </div>
                  ${data.performRoofingOps ? `
                  <div class="explanation-field-page4">
                    If "Yes", please explain: ${data.roofingExplanation || ''}
                  </div>` : ``}
              </div>

                <!-- 2 -->
                <div class="question-item-page4">
                    <div class="question-text-page4">
                        <span>Does your company perform any waterproofing?</span>
                        <div class="yes-no-options-page4">
                          ${formatYesNo(data.performWaterproofing)}
                        </div>
                    </div>
                    ${data.performWaterproofing ? `
                    <div class="explanation-field-page4">
                        If "Yes", please explain: ${data.waterproofingExplanation || ''}
                    </div>` : ``}
                </div>

                <!-- 3 -->
                <div class="question-item-page4">
                    <div class="question-text-page4">
                        <span>Do you use motorized or heavy equipment in any of your operations?</span>
                        <div class="yes-no-options-page4">
                            ${formatYesNo(data.useHeavyEquipment)}
                        </div>
                    </div>
                    ${data.useHeavyEquipment ? `
                    <div class="explanation-field-page4">
                        If "Yes", please explain: ${data.heavyEquipmentExplanation || ''}
                    </div>` : ``}
                </div>

                <!-- 4 -->
                <div class="question-item-page4">
                    <div class="question-text-page4">
                        <span>Will you perform work (new/remodel) on single family residences, in which the dwelling
                            exceeds 5,000 square feet?</span>
                        <div class="yes-no-options-page4">
                            ${formatYesNo(data.workOver5000SqFt)}
                        </div>
                    </div>
                    ${data.workOver5000SqFt ? `
                    <div class="explanation-field-page4">
                        If "Yes", please explain: ${data.workOver5000SqFtExplanation || ''}
                    </div>` : ``}

                    <div class="percentage-field-page4">
                        What percentage of your work will be on homes over 5,000 square feet:
                        ${data.workOver5000SqFtPercent || 0}%
                    </div>
                </div>

                <!-- 5 -->
                <div class="question-item-page4">
                    <div class="question-text-page4">
                        <span>Will you perform work on commercial buildings over 20,000 square feet?</span>
                        <div class="yes-no-options-page4">
                            ${formatYesNo(data.workCommercialOver20000SqFt)}
                        </div>
                    </div>
                    ${data.workCommercialOver20000SqFt ? `
                    <div class="explanation-field-page4">
                        If "Yes", please explain: ${data.commercialOver20000SqFtExplanation || ''}
                    </div>` : ``}

                    <div class="percentage-field-page4">
                        What percentage of your work will be on commercial buildings over 20,000 square feet: ${data.commercialOver20000SqFtPercent || 0}%
                    </div>
                </div>

                <!-- 6 -->
                <div class="question-item-page4">
                    <div class="question-text-page4">
                        <span>Has any licensing authority taken any action against you, your company or any
                            affiliates?</span>
                        <div class="yes-no-options-page4">
                          ${formatYesNo(data.licensingActionTaken)}
                        </div>
                    </div>
                    ${data.licensingActionTaken ? `
                    <div class="explanation-field-page4">
                        If "Yes", please explain: ${data.licensingActionExplanation || ''}
                    </div>` : ``}
                </div>

                <!-- 7 -->
                <div class="question-item-page4">
                    <div class="question-text-page4">
                        <span>Have you allowed or will you allow your license to be used by any other contractor?</span>
                        <div class="yes-no-options-page4">
                            ${formatYesNo(data.allowedLicenseUseByOthers)}
                        </div>
                    </div>
                    ${data.allowedLicenseUseByOthers ? `
                    <div class="explanation-field-page4">
                        If "Yes", please explain: ${data.allowedLicenseUseByOthersExplanation || ''}
                    </div>` : ``}
                </div>

                <!-- 8 -->
                <div class="question-item-page4">
                    <div class="question-text-page4">
                        <span>Has the applicant or business owner ever had any judgements or liens filed against them or
                            filed for bankruptcy?</span>
                        <div class="yes-no-options-page4">
                            ${formatYesNo(data.judgementsOrLiens)}
                        </div>
                    </div>
                    ${data.judgementsOrLiens ? `
                    <div class="explanation-field-page4">
                        If "Yes", please explain: ${data.judgementsExplanation || ''}
                    </div>` : ``}
                </div>

                <!-- 9 -->
                <div class="question-item-page4">
                  <div class="question-text-page4">
                    <span>Has any lawsuit ever been filed or any claim otherwise been made against your company (including any partnership or any joint venture of which you have been a member of, any of your company's predecessors, or any person, company or entities on whose behalf your company has assumed liability?</span>
                    <div class="yes-no-options-page4">
                      ${formatYesNo(data.lawsuitsOrClaims)}
                    </div>
                  </div>
                  ${data.lawsuitsOrClaims ? `
                  <div class="explanation-field-page4">
                    If "Yes", please explain: ${data.lawsuitsExplanation || ''}
                  </div>` : ``}
                </div>

                <!-- 10 -->
                <div class="question-item-page4">
                    <div class="question-text-page4">
                        <span>Is your company aware of any facts, circumstances, incidents, situations, damages or accidents (including but not limited to: faulty or defective workmanship, product failure, construction dispute, property damage or construction worker injury) that a reasonably prudent person might expect to give rise to a claim or lawsuit, whether valid or not, which might directly or indirectly involve the company?</span>
                        <div class="yes-no-options-page4">
                            ${formatYesNo(data.knownIncidentsOrClaims)}
                        </div>
                    </div>
                    ${data.knownIncidentsOrClaims ? `
                    <div class="explanation-field-page4">
                        If "Yes", please explain: ${data.potentialClaimsExplanation || ''}
                    </div>` : ``}
                </div>

                <div class="section-title-uppercase-page"></div>

                <!-- LOSS HISTORY -->
                ${data.generalLiabilityLosses && data.generalLiabilityLosses.length > 0 ? `
                <div class="loss-history-section">
                    <strong>General Liability Loss Information</strong>

                    <table class="loss-table">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Date of Loss</th>
                                <th>Amount of Loss</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.generalLiabilityLosses.map(loss => `
                            <tr>
                                <td>General Liability</td>
                                <td>${loss.dateOfLoss || "-"}</td>
                                <td>${loss.amountOfLoss || "-"}</td>
                            </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>
                ` : `
                <div class="loss-history-section">
                    <strong>Loss History:</strong> No losses reported
                </div>
                `}

            </div>
        </div>
    </div>
  `;
}

/**
 * Generate Page 5: Written Contract & Policy Endorsements (ISC Format - All on One Page)
 */
function generatePage5(data: ApplicationPacketData): string {
  const qrCodeText = `${data.applicationId}`;
  const qrCodePageText = `00${data.applicationId}P5`;

  return `
    <div class="page page4-isc" style="page-break-after: always;">
      <div class="main-content main-content-page4">
        <div class="section-title-uppercase-page">WRITTEN CONTRACT</div>
        
        <div class="work-experience-questions-page4">

          <div class="question-item-page4">
            <div class="question-text-page4"><span>Do you have a written contract for all work you perform?</span>
              <div class="yes-no-options-page4">${formatYesNo(data.writtenContractForAllWork)}</div>
            </div>
            ${data.writtenContractForAllWork ? `<div class="explanation-field-page4">If "Yes", answer the following questions:</div>` : ''}
            ${data.writtenContractForAllWork ? `
            <div class="question-item-page4">
              <div class="question-text-page4"><span>Does the contract identify a start date for the work?</span>
                <div class="yes-no-options-page4">${formatYesNo(data.contractHasStartDate, true)}</div>
              </div>
              
              ${!data.contractHasStartDate ? `<div class="explanation-field-page4"><span>If "No", please explain:</span> ${data.contractStartDateExplanation || ''}</div>` : ''}
            </div>
            <div class="question-item-page4">
              <div class="question-text-page4"><span>Does the contract identify a precise scope of work?</span>
                <div class="yes-no-options-page4">${formatYesNo(data.contractHasScopeOfWork, true)}</div>
              </div>
              
              ${!data.contractHasScopeOfWork ? `<div class="explanation-field-page4"><span>If "No", please explain:</span> ${data.contractScopeExplanation || ''}</div>` : ''}
            </div>
            <div class="question-item-page4">
              <div class="question-text-page4"><span>Does the contract identify all subcontracted trades (if any)?</span>
                <div class="yes-no-options-page4">${formatYesNo(data.contractIdentifiesSubcontractedTrades, true)}</div>
              </div>              
              ${!data.contractIdentifiesSubcontractedTrades ? `<div class="explanation-field-page4"><span>If "No", please explain:</span> ${data.contractSubcontractedTradesExplanation || ''}</div>` : ''}
            </div>
            <div class="question-item-page4">
              <div class="question-text-page4"><span>Does the contract provide a set price?</span></div>
              <div class="yes-no-options-page4">${formatYesNo(data.contractHasSetPrice, true)}</div>
              ${!data.contractHasSetPrice ? `<div class="explanation-field-page4"><span>If "No", please explain:</span> ${data.contractSetPriceExplanation || ''}</div>` : ''}
            </div>
            <div class="question-item-page4">
              <div class="question-text-page4"><span>Is the contract signed by all parties to the contract?</span>
                <div class="yes-no-options-page4">${formatYesNo(data.contractSignedByAllParties, true)} </div>
              </div>
              
              ${!data.contractSignedByAllParties ? `<div class="explanation-field-page4"><span>If "No", please explain:</span> ${data.contractSignedExplanation || ''}</div>` : ''}
            </div>
            ` : ''}
          </div>
          
          <div class="question-item-page4">
            <div class="question-text-page4"><span>Do you subcontract work?</span>
              <div class="yes-no-options-page4">${formatYesNo(data.doSubcontractWork)}</div>
            </div>
            
            ${data.doSubcontractWork ? `<div class="explanation-field-page4">If "Yes", answer the following questions:</div>` : ''}
            ${data.doSubcontractWork ? `
            <div class="question-item-page4">
              <div class="question-text-page4"><span>Do you always collect certificates of insurance from subcontractors?</span>
                <div class="yes-no-options-page4">${formatYesNo(data.alwaysCollectCertificatesFromSubs, true)}</div>
              </div>
              
              ${!data.alwaysCollectCertificatesFromSubs ? `<div class="explanation-field-page4"><span>If "No", please explain:</span> ${data.collectCertificatesExplanation || ''}</div>` : ''}
            </div>
            <div class="question-item-page4">
              <div class="question-text-page4"><span>Do you require subcontractors to have insurance limits equal to your own?</span>
                <div class="yes-no-options-page4">${formatYesNo(data.requireSubsEqualInsuranceLimits, true)}</div>
              </div>
              ${!data.requireSubsEqualInsuranceLimits ? `<div class="explanation-field-page4"><span>If "No", please explain:</span> ${data.subsEqualLimitsExplanation || ''}</div>` : ''}
            </div>
            <div class="question-item-page4">
              <div class="question-text-page4"><span>Do you always require subcontractors to name you as additional insured?</span>
                <div class="yes-no-options-page4">${formatYesNo(data.requireSubsNameAsAdditionalInsured, true)}</div>
              </div>
              ${!data.requireSubsNameAsAdditionalInsured ? `<div class="explanation-field-page4"><span>If "No", please explain:</span> ${data.subsAdditionalInsuredExplanation || ''}</div>` : ''}
            </div>
            <div class="question-item-page4">
              <div class="question-text-page4"><span>Do you have a standard formal agreement with subcontractors?</span>
                <div class="yes-no-options-page4">${formatYesNo(data.haveStandardFormalAgreementWithSubs, true)}</div>
              </div>
              
              ${!data.haveStandardFormalAgreementWithSubs ? `<div class="explanation-field-page4"><span>If "No", please explain:</span> ${data.standardAgreementExplanation || ''}</div>` : ''}
              ${data.haveStandardFormalAgreementWithSubs ? `
              <div class="sub-question-item-page4">
                <div class="question-text-page4"><span>If "Yes", does it have a hold harmless/indemnification agreement in your favor?</span>
                  <div class="yes-no-options-page4">${formatYesNo(data.agreementHasHoldHarmless, true)}</div>
                </div>
                
                ${!data.agreementHasHoldHarmless ? `<div class="explanation-field-page4"><span>If "No", please explain:</span> ${data.holdHarmlessExplanation || ''}</div>` : ''}
              </div>
              ` : ''}
            </div>
            <div class="question-item-page4">
              <div class="question-text-page4"><span>Do you require subcontractors to carry Worker's Compensation?</span>
                <div class="yes-no-options-page4">${formatYesNo(data.requireSubsWorkersComp, true)}</div>
              </div>
              
              ${!data.requireSubsWorkersComp ? `<div class="explanation-field-page4"><span>If "No", please explain:</span> ${data.subsWorkersCompExplanation || ''}</div>` : ''}
            </div>
            ` : ''}
          </div>
        </div>
        
        <div class="section-title-uppercase-page policy-endorsements-title-page5">POLICY ENDORSEMENTS</div>
        <div class="policy-endorsements-content-page5">${data.policyEndorsements}</div>
        
      </div>
    </div>
  `;
}

/**
 * Generate Page 6: Notice & Policy Exclusions (ISC Format - All on One Page)
 */
function generatePage6(data: ApplicationPacketData): string {
  const qrCodeText = `${data.applicationId}`;
  const qrCodePageText = `00${data.applicationId}P6`;

  return `
    <div class="page page6-isc" style="page-break-after: always;">
      <div class="main-content main-content-page6">
        <div class="section-title-uppercase-page6">NOTICE</div>
        
        <div class="notice-content-page6">
          <p>This is a quotation only. No coverage is in effect until an application is approved and policy binder is received. This policy is issued by your insurance company. Nothing is bound until final underwriting approval. Your insurance company may not be subject to all of the insurance laws and regulations of your state. State insurance insolvency guaranty funds may not available. Therefore please consult with your insurance agent for further information.</p>
          
          <p>Please note that your policy is subject to audit. Audits are routinely performed and specifically provided for in the policy. The initial premium is regarded as a deposit premium only since the underwriters are relying on the accuracy of the information provided by the insured. This includes the estimated gross receipts. Thus, the audit is necessary to verify the financial information provided since the premium is based upon these representations. ${data.carrierName} policies are audited by Zoom Professional Services. Zoom is the authorized representative in regard to your policy audit. We appreciate your anticipated cooperation.</p>
        </div>
        
        <div class="initial-line-page6">Initial: _________________________</div>
        
        <div class="section-title-uppercase-page6">POLICY EXCLUSIONS</div>
        
        <div class="exclusions-content-page6">
          <p><strong>Section I – Coverages, Coverage A – Bodily Injury and Property Damage Liability:</strong> Expected or Intended Injury; Action Over; Worker's Compensation and Similar Laws; Aircraft, Auto or Watercraft; Mobile Equipment; Drywall Manufactured in China; Exterior Insulation and Finish Systems ("EIFS"); Assault and Battery; Professional Services; Damage to Property; Damage to Your Product; Damage to Your Work; Damage to Impaired Property or Property Not Physically Injured; Recall of Products; Work or Impaired Property; Personal and Advertising Injury; Subsidence, Movement, or Vibration of Land; School or Recreational Facility; Deleterious Substances; Open Structure "Water" Damage; Heating Devices; Explosives; Communicable Disease; Abuse or Molestation; Prior Work and Prior Products; Wrap Up.</p>
          
          <p><strong>Common Policy Exclusions:</strong> Past Work or Construction Projects; Buildings and Structures Exceeding Three Stories; Water or Fire Damage Liability; Hospital, Medical or Care Facilities; Physical or Mental Disability or Impairment; Material Misrepresentation; Overspray; House/Structure Raising; Fall from Heights; Animals; Independent Contractors/Subcontractors Sublimit; Airports; House of Worship; Underground Utility Location; Fire Suppression Systems; Collapse; Injury or Damage to Day Laborers; Undisclosed Waterproofing Operations; Abandoned Work; Urethane or Spray Roofing; Museums and Historic Buildings and Structures; Tract Home Project.</p>
          
          <p><strong>Coverage B – Personal and Advertising Injury:</strong> Knowing Violation of Rights of Another; Material Published with Knowledge of Falsity; Material Published Prior to Policy Period; Insureds in Media and Internet Type Business; Electronic Chat Rooms, Bulletin Boards, or Social Media; Unauthorized Use of Another's Name or Product; "Bodily Injury" and "Property Damage"; Quality or Performance of Goods – Failure to Conform to Statements; Wrong Description of Prices; Infringement of Copyright, Patent, Trademark or Trade Secret; Expected or Intended Injury or Damage; Common Policy Exclusions.</p>
          
          <p><strong>Coverage C – Medical Payments:</strong> Any Insured; Hired Person; Injury on Normally Occupied Premises; Workers Compensation and Similar Laws; Athletic Activities; Products-Completed Operations Hazard, Coverage A and B Exclusions.</p>
          
          <p><strong>Section II. Common Policy Exclusions:</strong> Breach of Contract/Contractual Liability; Employer's Liability; Pollution; Residential Project/Structure Size Restriction Exclusion; Commercial or Mixed Use Building/Project Size Restriction Exclusion; Multi-Unit Structures; War or Terrorism; Employment Practices; Cross Suits; Fraudulent, Intentional, or Criminal Acts; Unlicensed Contractors; Non-Compliance with Safety Regulations; Prior Litigation; Prior Knowledge; Ongoing Operations; Unsolicited Communications; Punitive Damages, Fines or Penalties; Attorney, Expert, and Vendor Fees and Costs of Others; Classification Limitation Exclusion; Social and Entertainment Activities and Events; Force Majeure or Acts of God; Liquor Liability; State Specific Operations; Electronic Data; Mental Injury; Roofing Operations; Louisiana Operations; Slip and Fall, Underground Horizontal Drilling, Cyber.</p>
          
          <p>Please refer to the policy for a complete list of exclusions. This list is subject to change and may differ from prior policy years.</p>
        </div>
        
        <div class="initial-line-page6">* I have read and understand the policy exclusions identified above. Initial: _________________________</div>
  
      </div>
    </div>
  `;
}

/**
 * Generate Page 7: Application Agreement (ISC Format - All on One Page)
 */
function generatePage7(data: ApplicationPacketData): string {
  const qrCodeText = `${data.applicationId}`;
  const qrCodePageText = `00${data.applicationId}P7`;

  return `
    <div class="page page7-isc" style="page-break-after: always;">
      <div class="main-content main-content-page7">
        <div class="section-title-uppercase-page7">APPLICATION AGREEMENT</div>     
        <div class="agreement-content-page7">
          <p>The purpose of this application is to assist in the underwriting process information contained herein is specifically relied upon in determination of insurability. The no loss letter shall be the basis of any insurance that may be issued and will be a part of such policy. The undersigned, therefore, warrants that the information contained herein is true and accurate to the best of his/her knowledge, information and belief.</p>
          
          <p>The undersigned Applicant warrants that the above statements and particulars, together with any attached or appended documents or materials ("this Application"), are true and complete and do not misrepresent, misstate or omit any material facts. The undersigned Applicant warrants that the representations and information supplied in each of the above sections entitled Applicant Information, Entity of Company, Additional Business Names, Description of Operations, Estimated Exposures, Previous Exposures, Work Experience and related information are specifically relied upon in the determination of insurability, are material to the risk to be insured, and will be a part of any policy issued. The undersigned Applicant understands that any misrepresentation or omission of any information in any part of this Application shall constitute grounds for immediate cancellation of coverage and denial of claims, if any. It is further understood that the applicant and or affiliated company is under a continuing obligation to immediately notify his/her underwriter through his/her broker of any material alteration of the information given. The Applicant agrees to notify the Company of any material changes in the answers to the questions on this Application which may arise prior to the effective date of any policy issued pursuant to this Application. The Applicant understands that any outstanding quotations may be modified or withdrawn based upon such changes at the sole discretion of the Company.</p>
          
          <p>Notwithstanding any of the foregoing, the Applicant understands the Company is not obligated nor under any duty to issue a policy of insurance based upon this Application. The Applicant further understands that, if a policy is issued, this Application will be incorporated into and form a part of such policy and any false information provided on this application will result in the nullification of such policy. Furthermore, the Applicant authorizes the Company, as administrative and servicing manager, to make any investigation and inquiry in connection with the Application as it may deem necessary.</p>
          
          <p>For your protection, this information is provided as required by applicable State and Federal law. Any person who knowingly presents false, fraudulent, misleading, incomplete or misleading facts or information or aids, abets, solicits, or conspires with any person to do so, for the purpose of obtaining insurance coverage, amending insurance coverage, seeking insurance benefits or to make a claim for the payment of a loss, is unlawful and is guilty of a crime and may be subject to fines and confinement in state or federal prison.</p>
        </div>
        
        <div class="initial-line-page7">Initial: _________________________</div>
        
        <div class="agreement-content-page7">
          <p>The applicant acknowledges that explanation of the terms, conditions and provisions of the policy of insurance, including but not limited to coverage being afforded, amendments, endorsements, exclusions and any other such information effecting the policy of insurance are provided solely by the applicant's agent, broker or producer and NOT the Company. The coverage type, nature, amounts and insurance needs of the applicant are the sole responsibility of the applicant and its agent/ broker or producer. The applicant understands the agent/ broker or producer has no authority to act on behalf of the insurance company.</p>
        </div>
        
        <div class="initial-line-page7">Initial: _________________________</div>
        
        <div class="agreement-content-page7">
          <p>If you are applying for a "claims made" policy then please note that policy provides coverage only for "claims made" and reported to the company in writing during the policy period. Thus there is NO retroactive coverage. Please consult your policy and or agent/broker for further information.</p>
        </div>
        
        <div class="initial-line-page7">Initial: _________________________</div>
        
        <div class="agreement-content-page7">
          <p>The coverage provided by your policy may also be subject to other limitations including, but not limited to, sublimits of liability and/or, per- project shared aggregate limits of liability. In addition, defense costs and claim expenses are included within the applicable limits of liability. This means that the limits of liability available to pay indemnity, settlements, judgments and "claim expenses" will be reduced, and may be exhausted, by payment of "claim expenses" including payment of any defense fees and costs. Please consult your policy and or agent/broker for further information.</p>
        </div>
        
        <div class="initial-line-page7">Initial: _________________________</div>
        
        <div class="agreement-content-page7">
          <p>Applicants must strictly comply with all applicable state and/or other governmental licensing requirements and regulations. Should an applicant's license become suspended, revoked or inactive at any time during the policy period, then NO coverage will be afforded under the policy.</p>
        </div>
        
        <div class="initial-line-page7">Initial: _________________________</div>
        
        <div class="agreement-content-page7">
          <p><strong>* Deposit Premium & Fees are fully earned.</strong></p>
          
          <p>We will compute all premiums for this policy in accordance with our rules and rates. Premium shown in this policy as advance premium is a deposit premium only and is based upon the information provided by the applicant and or its agent. This information is subject to audit.</p>
          
          <p>Please note that issuance of the policy includes membership in Preferred Contractors Association (PCA). For a complete list of benefits and information, visit the website at www.pcamembers.com</p>
        </div>
        
        <div class="signature-section-page7">

          <div class="signature-field-page7" style="display: flex; gap: 0.3in; align-items: flex-end;">
            <div class="signature-field-page7" style="flex: 1;">
              <div class="signature-label-page7">Signature of Applicant</div>
              <div class="signature-line-page7">${data.applicantSignature || ' '}</div>
            </div>
          
            <div class="signature-field-page7" style="flex: 1;">
              <div class="signature-label-page7">Date</div>
              <div class="signature-line-page7">${data.applicantSignatureDate || ' '}</div>
            </div>
          </div>

          <div class="signature-field-page7">
            <div class="signature-label-page7">Title (Owner, Officer, Partner)</div>
            <div class="signature-line-page7">${data.applicantTitle || ' '}</div>
          </div>
          <div class="signature-field-page7">
            <div class="signature-label-page7">Signature of Producer (Agent or Broker)</div>
            <div class="signature-line-page7">${data.producerSignature || ' '}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generate Page 8: Terrorism Coverage Disclosure Notice (ISC Format - All on One Page)
 */
function generatePage8(data: ApplicationPacketData): string {
  const qrCodeText = `${data.applicationId}`;
  const qrCodePageText = `00${data.applicationId}P8`;

  return `
    <div class="page page8-isc" style="page-break-after: always;">
      <div class="main-content main-content-page8">
        <div class="carrier-header-page8">
          <div class="carrier-name-large-page8">${data.carrierName}</div>
          <div class="endorsement-notice-page8">THIS ENDORSEMENT CHANGES THE POLICY. PLEASE READ IT CAREFULLY</div>
          <div class="carrier-name-medium-page8">${data.carrierName}</div>
          <div class="policy-type-page8">COMMERCIAL GENERAL LIABILITY POLICY</div>
          <div class="document-title-page8">**TERRORISM COVERAGE DISCLOSURE NOTICE**</div>
          <div class="section-title-bold-page8">**TERRORISM COVERAGE PROVIDED UNDER THIS POLICY**</div>
        </div>
        
        <div class="terrorism-content-page8">
          <p>The Terrorism Risk Insurance Act of 2002 and amendments thereto (collectively referred to as the "Act") established a program within the Department of the Treasury, under which the federal government shares, with the insurance industry, the risk of loss from future terrorist attacks. An act of terrorism is defined as any act certified by the Secretary of the Treasury, in concurrence with the Secretary of State and the Attorney General of the United States, to be an act of terrorism; to be a violent act or an act that is dangerous to human life, property or infrastructure; to have resulted in damage within the United States, or outside the United States in the case of an air carrier or vessel or the premises of a United States Mission; and to have been committed by an individual or individuals as part of an effort to coerce the civilian population of the United States or to influence the policy or affect the conduct of the United States Government by coercion.</p>
          
          <p>In accordance with the Act we are required to offer you coverage for losses resulting from an act of terrorism that is certified under the federal program as an act of terrorism. The policy's other provisions will still apply to such an act. <strong>This offer does not include coverage for incidents of nuclear, biological, chemical, or radiological terrorism which will be excluded from your policy.</strong> Your decision is needed on this question: do you choose to pay the premium for terrorism coverage stated in this offer of coverage, or do you reject the offer of coverage and not pay the premium? You may accept or reject this offer.</p>
          
          <p>If your policy provides commercial property coverage, in certain states, statutes or regulations may require coverage for fire following an act of terrorism. In those states, if terrorism results in fire, we will pay for the loss or damage caused by that fire, subject to all applicable policy provisions including the Limit of Insurance on the affected property. Such coverage for fire applies only to direct loss or damage by fire to Covered Property. Therefore, for example, the coverage does not apply to insurance provided under Business Income and/or Extra Expense coverage forms or endorsements that apply to those coverage forms, or to Legal Liability coverage forms or Leasehold Interest coverage forms.</p>
          
          <p>Your premium <strong>will include</strong> the additional premium for terrorism as stated in the section of this Notice titled <strong>DISCLOSURE OF PREMIUM.</strong></p>
        </div>
        
        <div class="section-title-bold-page8">DISCLOSURE OF FEDERAL PARTICIPATION IN PAYMENT OF TERRORISM LOSSES</div>
        
        <div class="terrorism-content-page8">
          <p>You should know that where coverage is provided by this policy for losses resulting from certified acts of terrorism, such losses may be partially reimbursed by the United States government under a formula established by federal law. However, your policy may contain other exclusions which might affect your coverage, such as an exclusion for nuclear events. Under the formula, the United States government generally <strong>reimburses 80% beginning on January 1, 2020</strong> of covered terrorism losses exceeding the statutorily established deductible paid by the insurance company providing the coverage.</p>
        </div>
        
        <div class="section-title-bold-page8">DISCLOSURE OF CAP ON ANNUAL LIABILITY</div>
        
        <div class="terrorism-content-page8">
          <p><strong>You Should Also Know That the Terrorism Risk Insurance Act, As Amended, Contains A $100 Billion Cap That Limits U.S. Government Reimbursement As Well As Insurers' Liability For Losses Resulting From Certified Acts Of Terrorism When The Amount Of Such Losses In Any One Calendar Year Exceeds $100 Billion. If The Aggregate Insured Losses For All Insurers Exceed $100 Billion, Your Coverage May Be Reduced.</strong></p>
        </div>
        
        <div class="agreement-content-page8" style="margin-top: 0.08in;">
          <p><strong>* Deposit Premium & Fees are fully earned.</strong></p>
          
          <p>We will compute all premiums for this policy in accordance with our rules and rates. Premium shown in this policy as advance premium is a deposit premium only and is based upon the information provided by the applicant and or its agent. This information is subject to audit.</p>
          
          <p>Please note that issuance of the policy includes membership in Preferred Contractors Association (PCA). For a complete list of benefits and information, visit the website at www.pcamembers.com</p>
        </div>
        
        <div class="signature-section-page8">
          <div class="signature-field-page8" style="display: flex; gap: 0.3in; align-items: flex-end;">
            <div style="flex: 1;">
              <div class="signature-label-page8">Signature of Applicant</div>
              <div class="signature-line-page8">${data.applicantSignature || ' '}</div>
            </div>
            <div style="flex: 1;">
              <div class="signature-label-page8">Date</div>
              <div class="signature-line-page8">${data.applicantSignatureDate || ' '}</div>
            </div>
          </div>
          <div class="signature-field-page8">
            <div class="signature-label-page8">Title (Owner, Officer, Partner)</div>
            <div class="signature-line-page8">${data.applicantTitle || ' '}</div>
          </div>
          <div class="signature-field-page8">
            <div class="signature-label-page8">Signature of Producer (Agent or Broker)</div>
            <div class="signature-line-page8">${data.producerSignature || ' '}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generate Page 9: Disclosure of Premium (Terrorism Coverage) - ISC Format
 */
function generatePage9(data: ApplicationPacketData): string {
  const qrCodeText = `${data.applicationId}`;
  const qrCodePageText = `00${data.applicationId}P9`;

  return `
    <div class="page page9-isc" style="page-break-after: always;">
      <div class="main-content main-content-page9">
        <div class="carrier-header-page9">
          <div class="carrier-name-large-page9">${data.carrierName}</div>
          <div class="carrier-divider-page9"></div>
        </div>
        
        <div class="section-title-bold-page9">DISCLOSURE OF PREMIUM</div>
        
        <div class="premium-disclosure-content-page9">
          <p><strong>Your premium for terrorism coverage is:</strong> ${data.terrorismCoveragePremium || '$0.00'}</p>
          
          <p>Premium charged is for the policy period up to your policy expiration. (This charge/amount is applied to obtain the final premium.)</p>
          
          <p><strong>You may choose to reject the offer by signing the statement below and returning it to us.</strong> Your policy will be changed to exclude the described coverage. If you chose to accept this offer, this form does not have to be returned.</p>
        </div>
        
        <div class="section-title-bold-page9 rejection-title-page9">REJECTION STATEMENT</div>
        
        <div class="rejection-statement-box-page9">
          <p>I hereby decline to purchase coverage for certified acts of terrorism. I understand that an exclusion of certain terrorism losses will be made part of this policy.</p>
        </div>
        
        <div class="signature-section-page9">
          <div class="signature-field-page9">
            <div class="signature-label-page9">Member/Insured: <strong>${data.companyName}</strong></div>
            <div class="signature-line-page9 signature-line-extended-page9"></div>
          </div>
          <div class="signature-field-page9" style="display: flex; gap: 0.3in; align-items: flex-end;">
            <div style="flex: 1;">
              <div class="signature-label-page9">Member/Insured Signature:</div>
              <div class="signature-line-page9">${data.rejectionStatementSignature || ' '}</div>
            </div>
            <div style="flex: 1;">
              <div class="signature-label-page9">Date:</div>
              <div class="signature-line-page9">${data.rejectionStatementDate || ' '}</div>
            </div>
          </div>
          <div class="signature-field-page9">
            <div class="signature-label-page9">Printed Name/Title:</div>
            <div class="signature-line-page9">${data.rejectionStatementPrintedName || ' '}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generate Page 10: Surplus Lines Compliance Certification - ISC Format
 */
function generatePage10(data: ApplicationPacketData): string {
  const qrCodeText = `${data.applicationId}`;
  const qrCodePageText = `00${data.applicationId}P10`;

  return `
    <div class="page page10-isc" style="page-break-after: always;">
      <div class="main-content main-content-page10">
        <div class="section-title-bold-page10">SURPLUS LINES COMPLIANCE CERTIFICATION</div>
        
        <div class="certification-content-page10">
          <p>I, the retail or producing resident or non‐resident licensed producer/agent/broker, affirm I have expressly advised the insured prior to placement of the insurance that I was unable to obtain the full amount or kind of insurance necessary to protect the desired risk(s) from authorized insurers, as required by the risk state, currently writing this type of coverage in this State.</p>
          
          <p>In addition, I confirm that coverage was not procured for the purpose of securing a lower premium rate than would be accepted by an authorized insurer nor to secure any other competitive advantage.</p>
          
          <p>Under the penalty of suspension or revocation of my producer/agent/broker's license, the facts contained in this certification are true and correct.</p>
        </div>
        
        <div class="signature-section-page10">
          <div class="signature-field-page10">
            <div class="signature-label-page10">TBD-AppID ${data.applicationId}</div>
            <div class="signature-line-page10">${data.policyNumber || ' '}</div>
          </div>
          <div class="signature-field-page10">
            <div class="signature-label-page10">Policy Number</div>
            <div class="signature-line-page10">${data.policyNumber || ' '}</div>
          </div>
          <div class="signature-field-page10">
            <div class="signature-label-page10">Signature of Licensed Retail/Producing Agent/Broker</div>
            <div class="signature-line-page10">${data.surplusLinesSignature || ' '}</div>
          </div>
          <div class="signature-field-page10" style="display: flex; gap: 0.3in; align-items: flex-end;">
            <div style="flex: 1;">
              <div class="signature-label-page10">Date</div>
              <div class="signature-line-page10">${data.surplusLinesDate}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generate Page 11: Loss Warranty Letter - ISC Format
 */
function generatePage11(data: ApplicationPacketData): string {


  // ⭐ PASTE HERE
  const email = data.agencyEmail?.toLowerCase() || "";

  let selectedLogo = data.capitalCoLogoSVG;

  if (email === "info@blueangel.com") {
    selectedLogo = blueAngelLogoSVG;
  }

  if (email === "info@sjjinsurance.com") {
    selectedLogo = sjjLogoSVG;
  }
  // existing code
  const qrCodeText = `${data.applicationId}`;
  const qrCodePageText = `00${data.applicationId}P11`;

  return `
    <div class="page page11-isc" style="page-break-after: always;">
      <div class="main-content main-content-page11">
        <div class="header-section-page11">
          <div class="header-left-page11">
            <div class="applicant-info-page11">
              <div class="applicant-name-large-page11">${data.companyName}</div>
              <div class="applicant-address-page11">${data.applicantAddress}</div>
              <div class="applicant-city-state-zip-page11">${data.applicantCity}, ${data.applicantState} ${data.applicantZip}</div>
              <div class="applicant-phone-page11">${data.applicantPhone}</div>
              <div class="applicant-email-page11">email: ${data.applicantEmail}</div>
              <div class="quote-id-page11">Quote ID: ${data.applicationId}</div>
            </div>
          </div>
          <div class="header-right-page11">
            <div class="logo-capital-co-page11-right">
              ${generateCapitalCoLogoHTML(selectedLogo)}
            </div>
          </div>
        </div>
        
        <div class="warranty-content-page11">
          <p>During the last Five (5) years, we warrant that with respect to the insurance being applied for:</p>
          
          <ol class="warranty-list-page11">
            <li>I/ we have not sustained a loss</li>
            <li>Have not had a claim made against us</li>
            <li>Have not been denied coverage or had coverage canceled by an insurance company</li>
            <li>Have no knowledge or a reason to anticipate a claims or loss.</li>
          </ol>
          
          <p>If my business is less than five (5) years old, the above referenced warranty applies to work performed through all my prior business entities whether as an owner or an employee. The undersigned Applicant understands and agrees that all of the statements, information and responses provided in the Application for this policy are material to the risk sought to be insured, and that the entirety of the information provided in the Application forms a basis for the insurer to provide the requested insurance, and that said insurance is provided in reliance on such material representations.</p>
          
          <p>The undersigned Applicant further authorizes the Insurer or its representative to obtain directly or on Applicant's behalf, any and all loss runs or other such information identifying any claim, action or loss against the undersigned Applicant or the denial of coverage or cancelation of insurance. This authorization shall also include and encompass any prior business entity as provided above. The Insurer or its representative may contact the undersigned Applicant's Insurance Brokers, Agents, Insurers, Attorneys or other such individuals for this information and its release.</p>
          
          <p>I understand that this warranty and authorization for release of information as provided above will be incorporated into the insurance contract.</p>
        </div>
        
        <div class="signature-section-page11">
          <div class="signature-field-page11">
            <div class="signature-label-page11"><strong>${data.companyName}</strong></div>
            <div class="signature-line-page11">${data.lossWarrantyCompanySignature || ' '}</div>
            <div class="signature-row-page11">
              <div class="signature-label-small-page11" style="margin-right: auto;">Company/ Member</div>
              <div class="signature-label-small-page11">Date</div>
              <div class="signature-line-page11 signature-line-date-page11">${data.lossWarrantyDate}</div>
            </div>
          </div>
          <div class="signature-field-page11">
            <div class="signature-label-page11">Signature of Partner, Officer, Principal or Owner</div>
            <div class="signature-line-page11">${data.lossWarrantySignature || ' '}</div>
            <div class="signature-label-small-page11" style="margin-top: 0.05in;">Title</div>
            <div class="signature-line-page11">${data.lossWarrantyTitle || ' '}</div>
          </div>
        </div>
        
        <div class="warranty-footer-page11">
          <p><strong>Warranty:</strong> The purpose of this no loss letter is to assist in the underwriting process information contained herein is specifically relied upon in determination of insurability. The undersigned, therefore, warrants that the information contained herein is true and accurate to the best of his/her knowledge, information and belief. This no loss letter shall be the basis of any insurance that may be issued and will be a part of such policy. It is understood that any misrepresentation or omission shall constitute grounds for immediate cancellation of coverage and denial of claims, if any. It is further understood that the applicant and or affiliated company is under a continuing obligation to immediately notify his/her underwriter through his/her broker of any material alteration of the information given.</p>
        </div>
        
      </div>
    </div>
  `;
}

/**
 * Generate Page 12: Invoice Statement - ISC Format
 */
function generatePage12(data: ApplicationPacketData): string {
  const qrCodeText = `${data.applicationId}`;
  const qrCodePageText = `00${data.applicationId}P12`;

  return `
    <div class="page page12-isc" style="page-break-after: always;">
      <div class="main-content main-content-page12">
        <div class="invoice-header-page12">
          <div class="invoice-field-page12"><strong>Program:</strong> ${data.programName || 'Standard GL A-Rated'}</div>
          <div class="invoice-field-page12"><strong>Applicant Name:</strong> ${data.companyName}</div>
          <div class="invoice-field-page12"><strong>Application ID:</strong> ${data.applicationId}</div>
        </div>
        
        <div class="invoice-section-page12">
          <div class="invoice-section-title-page12">TOTAL COST OF POLICY*</div>
          <div class="invoice-row-page12">
            <div class="invoice-label-page12">Premium</div>
            <div class="invoice-value-page12">${data.premium || '$0.00'}</div>
          </div>
          <div class="invoice-row-page12">
            <div class="invoice-label-page12">Surplus Lines Tax</div>
            <div class="invoice-value-page12">${data.stateTax || '$0.00'}</div>
          </div>
          <div class="invoice-row-page12">
            <div class="invoice-label-page12">Carrier Policy Fee</div>
            <div class="invoice-value-page12">${data.associationDues || '$0.00'}</div>
          </div>
          <!-- just for frontend yet -->
          <div class="invoice-row-page12">
             <div class="invoice-label-page12">Stamping Fee</div>
             <div class="invoice-value-page12">${data.inspectionFee || '$0.00'}</div>
           </div>
          <div class="invoice-row-page12">
            <div class="invoice-label-page12">Sterling Insurance Services Fees</div>
            <div class="invoice-value-page12">${data.policyFee || '$0.00'}</div>
          </div>
          <div class="invoice-row-page12">
            <div class="invoice-label-page12">Fire Marshal Tax</div>
            <div class="invoice-value-page12">${data.fireMarshalTax || '$0.00'}</div>
          </div>
          <div class="invoice-row-total-page12">
            <div class="invoice-label-page12"><strong>TOTAL COST OF POLICY*</strong></div>
            <div class="invoice-value-page12"><strong>${data.totalCostOfPolicy || '$0.00'}</strong></div>
          </div>
        </div>
        
        <div class="invoice-section-page12">
          <div class="invoice-section-title-page12">TOTAL DEPOSIT*</div>
          <div class="invoice-row-page12">
            <div class="invoice-label-page12">Premium</div>
            <div class="invoice-value-page12">${data.depositPremium || '$0.00'}</div>
          </div>
          <div class="invoice-row-page12">
            <div class="invoice-label-page12">Carrier Policy Fee</div>
            <div class="invoice-value-page12">${data.depositAssociationDues || '$0.00'}</div>
          </div>
          <div class="invoice-row-page12">
            <div class="invoice-label-page12">Surplus Lines Tax</div>
            <div class="invoice-value-page12">${data.depositStateTax || '$0.00'}</div>
          </div>
          <div class="invoice-row-page12">
            <div class="invoice-label-page12">Stamping Fee</div>
            <div class="invoice-value-page12">${data.depositPolicyFee || '$0.00'}</div>
          </div>
          <div class="invoice-row-page12">
            <div class="invoice-label-page12">Fire Marshal Tax</div>
            <div class="invoice-value-page12">${data.depositFireMarshal || '$0.00'}</div>
          </div>
          <div class="invoice-row-page12">
            <div class="invoice-label-page12">Sterling Insurance Services Fees</div>
            <div class="invoice-value-page12">${data.depositInspectionFee || '$0.00'}</div>
          </div>
          <!--<div class="invoice-row-page12">
                <div class="invoice-label-page12">15% AI Processing Fee</div>
                <div class="invoice-value-page12">${data.aiProcessingFee || '$0.00'}</div>
              </div>-->

          <div class="invoice-row-total-page12">
            <div class="invoice-label-page12"><strong>TOTAL DEPOSIT*</strong></div>
            <div class="invoice-value-page12"><strong>${data.totalDeposit || '$0.00'}</strong></div>
          </div>
        </div>
        
        <div class="invoice-section-page12">
          <div class="invoice-section-title-page12">TOTAL TO RETAIN*</div>
          <div class="invoice-row-page12">
            <div class="invoice-label-page12">10% Commission on Total (${data.totalCostOfPolicy || '$0.00'})</div>
            <div class="invoice-value-page12">${data.totalToRetain || '$0.00'}</div>
          </div>
          <div class="invoice-row-total-page12">
            <div class="invoice-label-page12"><strong>TOTAL TO RETAIN*</strong></div>
            <div class="invoice-value-page12"><strong>${data.totalToRetain || '$0.00'}</strong></div>
          </div>
        </div>
        
        <div class="invoice-section-page12">
          <div class="invoice-section-title-page12">TOTAL TO BE SENT</div>
          <div class="invoice-row-page12">
            <div class="invoice-label-page12"><strong>MAKE CHECK PAYABLE FOR </strong>from agency</div>
            <div class="invoice-value-page12"><strong>${data.totalToBeSent || '$0.00'}</strong></div>
          </div>


          <!-- just for frontend yet -->
          <div class="invoice-row-page12">
            <div class="invoice-label-page12"><strong>MAKE CHECK PAYABLE FOR</strong>finance company</div>
            <div class="invoice-value-page12"><strong>$0.00</strong></div>
          </div>
        </div>
        
        <div class="payment-option-page12"><strong>Payment Option:</strong> ${data.paymentOption || '3rd Party Finance'}</div>
        
        <div class="binding-statement-page12">
          <p>The binding of this insurance policy is an agreement to the above-referenced prices and its terms and conditions</p>
          <div class="signature-field-page12">
            <div class="signature-label-page12">Signature of Producer (Agent or Broker):</div>
            <div class="signature-line-page12">${data.invoiceProducerSignature || '_________________________'}</div>
          </div>
        </div>
        
        <div class="invoice-disclaimer-page12">
          <p>*Please note that any added agency broker fee or other charge, fee or cost assessed to the insured is your sole responsibility. All such amounts added in connection with this policy shall be in compliance with all applicable state and federal law.</p>
        </div>
      </div>
    </div>
  `;
}

/** State display names for state forms section */
const STATE_DISPLAY_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas',
  KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts',
  MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri', MT: 'Montana',
  NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico',
  NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma',
  OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
  VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
  DC: 'District of Columbia',
};

/** Resolve state name or 2-letter code to 2-letter code (e.g. "Pennsylvania" -> "PA"). */
function toStateCode(state: string): string {
  const s = (state || '').trim();
  if (!s) return '';
  const upper = s.toUpperCase();
  if (s.length === 2) return upper;
  const entry = Object.entries(STATE_DISPLAY_NAMES).find(([, name]) => name.toLowerCase() === s.toLowerCase());
  return entry ? entry[0] : upper.slice(0, 2);
}

/** Shared wrapper for Pennsylvania form pages — full width, no sidebar. */
function paFormPageWrapper(data: ApplicationPacketData, pageLabel: string, bodyHtml: string): string {
  return `
    <div class="page state-forms-isc pa-form-page pa-form-no-sidebar" style="page-break-after: always;">
      <div class="pa-form-content-full">
        ${bodyHtml}
        <div class="pa-form-page-number">${pageLabel}</div>
      </div>
    </div>
  `;
}

/**
 * Pennsylvania 1609-PR (REV. 08/12) – Page 1: Header, boxes, intro, DECLARATION BY PRODUCER grid and footnotes.
 */
function generatePennsylvaniaFormPage1(data: ApplicationPacketData): string {
  const insuredName = data.companyName || '';
  const location = data.applicantAddress || '';
  const city = data.applicantCity || '';
  const state = data.applicantState || '';
  const zip = data.applicantZip || '';
  const coverageType = data.coverageType || data.quoteType || '';
  const workDesc = data.workDescription || '';
  const aggregateLimit = data.aggregateLimit || '';
  const occurrenceLimit = data.occurrenceLimit || '';
  const dates = data.desiredCoverageDates || '';
  const [fromDate = '', toDate = ''] = dates.includes(' - ') ? dates.split(' - ').map((s: string) => s.trim()) : [dates, ''];

  const body = `
    <div class="pa-form-doc">
      <div class="pa-form-header-block">
        <div class="pa-form-title">COMMONWEALTH OF PENNSYLVANIA INSURANCE DEPARTMENT</div>
        <div class="pa-form-meta">
          <span class="pa-form-rev">1609-PR (REV. 08/12)</span>
          <span class="pa-form-note">(Must be included with SLL Affidavit type 1609-SLL/1609-PR)</span>
        </div>
      </div>
      <div class="pa-form-two-boxes">
        <div class="pa-form-box pa-form-box-left">
          <div class="pa-form-box-title">Pennsylvania Surplus Lines Association</div>
          <div class="pa-form-box-address">180 Sheree Blvd., Suite 3100</div>
          <div class="pa-form-box-address">Exton, PA  19341</div>
        </div>
        <div class="pa-form-box pa-form-box-right">
          <div class="pa-form-id-row"><span class="pa-form-id-label">Customer ID #</span><span class="pa-ul pa-ul-id"></span></div>
          <div class="pa-form-id-row"><span class="pa-form-id-label">Policy #</span><span class="pa-ul pa-ul-id"></span></div>
          <div class="pa-form-id-row"><span class="pa-form-id-label">Binder #</span><span class="pa-ul pa-ul-id"></span></div>
        </div>
      </div>
      <p class="pa-form-intro">
        Report of transactions with unlicensed insurer(s) in accordance with Section 1609 of Article XVI, Surplus Lines of the Insurance Company Law, Act of May 17, 1921, P.L. 682, No. 284, as amended
      </p>
      <div class="pa-form-section-title">DECLARATION BY PRODUCER</div>
      <table class="pa-form-declaration-table" cellpadding="0" cellspacing="0">
        <colgroup>
          <col class="pa-form-col-label" />
          <col class="pa-form-col-input" />
          <col class="pa-form-col-small" />
          <col class="pa-form-col-small" />
          <col class="pa-form-col-small" />
        </colgroup>
        <tr>
          <td class="pa-form-td-label">Insured Name</td>
          <td class="pa-form-td-input" colspan="4"><span class="pa-ul pa-ul-long">${insuredName}</span></td>
        </tr>
        <tr>
          <td class="pa-form-td-label">Location of Risk***</td>
          <td class="pa-form-td-input"><span class="pa-ul pa-ul-mid">${location}</span></td>
          <td class="pa-form-td-small"><span class="pa-form-cell-label">City</span><span class="pa-ul pa-ul-short">${city}</span></td>
          <td class="pa-form-td-small"><span class="pa-form-cell-label">State</span><span class="pa-ul pa-ul-short">${state}</span></td>
          <td class="pa-form-td-small"><span class="pa-form-cell-label">Zip</span><span class="pa-ul pa-ul-short">${zip}</span></td>
        </tr>
        <tr>
          <td class="pa-form-td-label">Type of Coverage:</td>
          <td class="pa-form-td-input"><span class="pa-ul pa-ul-long">${coverageType}</span></td>
          <td class="pa-form-td-label">Description of Insured's Operation:</td>
          <td class="pa-form-td-input" colspan="2"><span class="pa-ul pa-ul-long">${workDesc}</span></td>
        </tr>
        <tr>
          <td class="pa-form-td-label">Amount of Insurance<br/><span class="pa-form-label-sub">(Total Insured Value)</span></td>
          <td class="pa-form-td-small"><span class="pa-form-cell-label">Property*</span><span class="pa-ul pa-ul-amt">${aggregateLimit ? '$ ' + aggregateLimit : ''}</span></td>
          <td class="pa-form-td-small" colspan="3"><span class="pa-form-cell-label">Casualty**</span><span class="pa-ul pa-ul-amt">${occurrenceLimit ? '$ ' + occurrenceLimit : ''}</span></td>
        </tr>
        <tr>
          <td class="pa-form-td-label">Effective Dates<br/><span class="pa-form-label-sub">(term) of Coverage</span></td>
          <td class="pa-form-td-small"><span class="pa-form-cell-label">FROM</span><span class="pa-ul pa-ul-date">${fromDate}</span></td>
          <td class="pa-form-td-small" colspan="3"><span class="pa-form-cell-label">TO</span><span class="pa-ul pa-ul-date">${toDate}</span></td>
        </tr>
      </table>
      <div class="pa-form-footnotes">
        <span>*Total Insured Value</span>
        <span>** General or Policy Aggregate</span>
        <span>***If more than one location of risk, then give address with most exposure</span>
      </div>
      <p class="pa-form-declaration">
        I declare under the penalties provided for perjury, that I have made a diligent effort to procure the insurance coverage described above from licensed insurers which are authorized to transact the kind of insurance involved and which provide, in the usual course of business, coverage comparable to the coverage being sought and have been unable to procure said insurance. I have documented a declination of coverage from at least three admitted insurers.
      </p>
      <p class="pa-form-declaration">
        I further declare under the penalties provided for perjury, that at the time of presenting a quotation to the insured, the insured was given notice in writing, either directly or through the producer, that:
      </p>
      <p class="pa-form-notice">
        The insurer with whom the insurance is to be placed is not admitted to transact business in this Commonwealth and is subject to limited regulation by the Department; and in the event of the insolvency of the insurer, losses will not be paid by the Pennsylvania Property and Casualty Insurance Guaranty Association.
      </p>
      <p class="pa-form-legal pa-form-legal-dark">
        ALL applicable provisions of ARTICLE XVI of the Insurance Company Law (40 P.S. §991.1601 et seq.) and Title 31 PA Code, Chapter 124 have been or will be complied with.
      </p>
      <div class="pa-form-producer-block">
        <div class="pa-form-producer-col">
          <div class="pa-form-producer-row">
            <span class="pa-form-label pa-form-label-dark">Name of Producer Agency:</span>
            <span class="pa-ul pa-ul-producer">${data.agencyName || ''}</span>
          </div>
          <div class="pa-form-hint">(Type or Print Name of Producer Agency)</div>
          <div class="pa-form-producer-row">
            <span class="pa-form-label pa-form-label-dark">Name of Producer:</span>
            <span class="pa-ul pa-ul-producer">${data.agentName || ''}</span>
          </div>
          <div class="pa-form-hint">(Type or Print Name of Individual Producer)</div>
        </div>
        <div class="pa-form-producer-col">
          <div class="pa-form-producer-row">
            <span class="pa-form-label pa-form-label-dark">License # of Producer Agency:</span>
            <span class="pa-ul pa-ul-producer"></span>
          </div>
          <div class="pa-form-hint">(Agency's License No.)</div>
          <div class="pa-form-producer-row">
            <span class="pa-form-label pa-form-label-dark">License # of Producer:</span>
            <span class="pa-ul pa-ul-producer"></span>
          </div>
          <div class="pa-form-hint">(Individual's License No.)</div>
        </div>
      </div>
      <div class="pa-form-signature-block">
        <span class="pa-form-label pa-form-sig-label">Signature of Producer</span>
        <span class="pa-ul pa-ul-sig"></span>
        <span class="pa-form-label pa-form-date-label pa-form-label-dark">Date:</span>
        <span class="pa-ul pa-ul-date-sig"></span>
      </div>
      <div class="pa-form-sig-hint">(Signature of Producer)</div>
    </div>
  `;
  return paFormPageWrapper(data, 'Pennsylvania 1609-PR – Page 1', body);
}

/**
 * Pennsylvania 1609-SLL – Page 2: Electronic Signature Addendum to the Declaration
 */
function generatePennsylvaniaFormPage2(data: ApplicationPacketData): string {
  const policyNum = ''; // Policy # filled at binding
  const effectiveDate = data.desiredCoverageDates || '';
  const [fromDate = ''] = effectiveDate.includes(' - ') ? effectiveDate.split(' - ').map((s: string) => s.trim()) : [effectiveDate];

  const body = `
    <div class="pa-form-doc pa-form-addendum">
      <div class="pa-form-addendum-title">Electronic Signature 1609-SLL Addendum to the Declaration</div>
      <p class="pa-form-addendum-intro">
        With respect to this filing for Policy #<span class="pa-ul pa-ul-addendum">${policyNum}</span> with a policy effective date of <span class="pa-ul pa-ul-addendum">${fromDate}</span>,
        consisting of the 1609-SLL and the 1609-PR in combination, the following is applicable.
      </p>
      <p class="pa-form-addendum-body">
        By submitting this addendum to the Pennsylvania Surplus Lines Association, I affirm that I am a
        duly licensed Surplus Lines Licensee, and that I have entered into an agreement with the duly
        licensed Producer indicated on the 1609-PR, forming a part of this Surplus Lines filing. This
        declaration is being submitted electronically and that the electronic signature appearing on this
        1609-PR provided by the duly licensed producer is in accordance with said agreement.
      </p>
    </div>
  `;
  return paFormPageWrapper(data, 'Pennsylvania 1609-SLL – Page 2', body);
}

/**
 * Washington Surplus Lines Certification form
 */
function generateWashingtonFormPage(data: ApplicationPacketData): string {
  const stateName = toStateCode(data.applicantState || '') === 'WA' ? 'Washington' : (data.applicantState || '');
  const insuredName = data.companyName || '';
  const coverageProvided = data.coverageType || data.quoteType || '';
  const producerName = data.agentName || '';
  const agencyName = data.agencyName || '';

  const body = `
    <div class="wa-form-doc">
      <div class="wa-form-header">
        <div class="wa-form-badge">OFFICIAL DOCUMENT</div>
        <div class="wa-form-title">State of Washington</div>
        <div class="wa-form-subtitle">Office of the Insurance Commissioner</div>
        <div class="wa-form-doc-type">Surplus Lines Certification</div>
      </div>
      <div class="wa-form-info-block">
        <div class="wa-form-block-label">Filing Information</div>
        <div class="wa-form-field-row">
          <span class="wa-form-field-label">To</span>
          <span class="wa-form-field-sep">:</span>
          <span class="wa-form-field-value">Insurance Commissioner</span>
        </div>
        <div class="wa-form-field-row">
          <span class="wa-form-field-label">State</span>
          <span class="wa-form-field-sep">:</span>
          <span class="wa-form-ul wa-form-ul-long">${stateName}</span>
          <span class="wa-form-field-hint">(State insured is located in)</span>
        </div>
        <div class="wa-form-field-row">
          <span class="wa-form-field-label">Insured Name</span>
          <span class="wa-form-field-sep">:</span>
          <span class="wa-form-ul wa-form-ul-long">${insuredName}</span>
        </div>
        <div class="wa-form-field-row">
          <span class="wa-form-field-label">Coverage Provided</span>
          <span class="wa-form-field-sep">:</span>
          <span class="wa-form-ul wa-form-ul-long">${coverageProvided}</span>
        </div>
      </div>
      <div class="wa-form-producer-section">
        <div class="wa-form-block-label">Certifying Party</div>
        <div class="wa-form-producer-row">
          <span class="wa-form-field-label">I</span>
          <span class="wa-form-ul wa-form-ul-producer">${producerName}</span>
          <span class="wa-form-field-label">of</span>
          <span class="wa-form-ul wa-form-ul-agency">${agencyName}</span>
        </div>
        <div class="wa-form-producer-hints">
          <span class="wa-form-producer-hint">Producer/Agent</span>
          <span class="wa-form-producer-hint">Agency Name</span>
        </div>
      </div>
      <div class="wa-form-certify-block">
        <p class="wa-form-certify">
          hereby certify that I have made diligent effort to place this insurance with companies
          admitted to write business in the state of <span class="wa-form-ul wa-form-ul-inline">${stateName}</span> for this class. I am unable
          to place the full amount or kind of insurance with companies admitted to transact and
          who are actually writing the particular kind and class of insurance in this state. I am
          therefore placing this insurance in the <span class="wa-form-emphasis">SURPLUS LINES MARKET</span>.
        </p>
      </div>
      <div class="wa-form-disclosure-section">
        <div class="wa-form-block-label">Required Disclosure</div>
        <p class="wa-form-disclosure-intro">
          The Insured was expressly advised prior to placement of this insurance in the <span class="wa-form-emphasis">SURPLUS LINES</span> market that:
        </p>
        <div class="wa-form-disclosure-list">
          <div class="wa-form-disclosure-item">
            <span class="wa-form-bullet">A</span>
            <span>The Surplus Lines insurer with whom the insurance was placed is not licensed in this state and is not subject to its supervision.</span>
          </div>
          <div class="wa-form-disclosure-item">
            <span class="wa-form-bullet">B</span>
            <span>In the event of the insolvency of the SURPLUS LINES insurer, losses will not be paid by the STATE INSURANCE GUARANTY FUND.</span>
          </div>
        </div>
      </div>
      <div class="wa-form-signature-block">
        <div class="wa-form-block-label">Authorized Signature</div>
        <div class="wa-form-sig-row">
          <span class="wa-form-sig-label">Signature of Producing Agent</span>
          <span class="wa-form-ul wa-form-ul-sig"></span>
        </div>
        <div class="wa-form-date-row">
          <span class="wa-form-date-label">Date</span>
          <span class="wa-form-ul wa-form-ul-date"></span>
        </div>
      </div>
    </div>
  `;
  return paFormPageWrapper(data, 'Washington Surplus Lines Certification', body);
}

/**
 * Texas Diligent Effort form (Form No. 1.1) — SLTX style
 * Uses sltxLogoBase64 when provided (from public/logos/sltx-logo.png)
 */
function generateTexasFormPage(data: ApplicationPacketData, sltxLogoBase64?: string): string {
  const insuredName = data.companyName || '';
  const agencyName = data.agencyName || '';
  const agentName = data.agentName || '';
  const coverageType = data.coverageType || data.quoteType || '';
  const carrierName = data.carrierName || '';

  const body = `
    <div class="tx-form-doc">
      <div class="tx-form-header">
        <div class="tx-form-logo">
          ${sltxLogoBase64
      ? `<img src="${sltxLogoBase64}" alt="SLTX" class="tx-logo-img" />`
      : `<div class="tx-logo-wrapper">
            <div class="tx-logo-svg-wrap">
              <svg class="tx-logo-svg" viewBox="0 0 120 52" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="34" fill="#ff6600" font-family="Arial,sans-serif" font-weight="bold" font-size="24">SL</text>
                <text x="32" y="34" fill="none" stroke="#0066b3" stroke-width="1.2" font-family="Arial,sans-serif" font-weight="bold" font-size="24" paint-order="stroke">TX</text>
                <line x1="72" y1="42" x2="112" y2="10" stroke="#0066b3" stroke-width="1.2"/>
                <line x1="68" y1="46" x2="108" y2="14" stroke="#ff6600" stroke-width="1.2"/>
                <line x1="2" y1="48" x2="44" y2="32" stroke="#0066b3" stroke-width="1.5"/>
                <line x1="6" y1="46" x2="48" y2="30" stroke="#ff6600" stroke-width="1.5"/>
                <line x1="10" y1="44" x2="52" y2="28" stroke="#d4a574" stroke-width="1.5"/>
                <line x1="14" y1="42" x2="56" y2="26" stroke="#0066b3" stroke-width="1.5"/>
              </svg>
            </div>
            <div class="tx-logo-text">
              <span class="tx-logo-surplus">SURPLUS<sup>™</sup></span>
              <span class="tx-logo-lines">LINES</span>
              <span class="tx-logo-office">STAMPING OFFICE OF TEXAS</span>
            </div>
          </div>`}
        </div>
        <div class="tx-form-number">Form No. 1.1</div>
      </div>
      <h1 class="tx-form-title">Texas Diligent Effort</h1>
      <p class="tx-form-intro">
        Form may serve as evidence that diligent effort was performed in accordance with
        <span class="tx-form-link">Texas Insurance Code §981.004</span>.
      </p>
      <div class="tx-form-section">
        <div class="tx-section-title">BROKER INFORMATION</div>
        <div class="tx-field-row"><span class="tx-field-label">Retail Broker:</span><span class="tx-ul tx-ul-long">${agencyName}</span></div>
        <div class="tx-field-row"><span class="tx-field-label">Retail Broker License No.:</span><span class="tx-ul tx-ul-long"></span></div>
        <div class="tx-field-row"><span class="tx-field-label">Surplus Lines Broker:</span><span class="tx-ul tx-ul-long"></span></div>
        <div class="tx-field-row"><span class="tx-field-label">Surplus Lines Broker License No.:</span><span class="tx-ul tx-ul-long"></span></div>
        <div class="tx-field-row tx-options-row">
          <span class="tx-field-label">Broker Type:</span>
          <span class="tx-option"><span class="tx-checkbox">□</span> Wholesale Broker</span>
          <span class="tx-option"><span class="tx-checkbox">□</span> Managing General Agent</span>
        </div>
      </div>
      <div class="tx-form-section">
        <div class="tx-section-title">POLICY INFORMATION</div>
        <div class="tx-field-row"><span class="tx-field-label">Policy/Binder No.:</span><span class="tx-ul tx-ul-long"></span></div>
        <div class="tx-field-row"><span class="tx-field-label">Insured Name:</span><span class="tx-ul tx-ul-long">${insuredName}</span></div>
        <div class="tx-field-row tx-options-row">
          <span class="tx-field-label">Coverage Type:</span>
          <span class="tx-option"><span class="tx-checkbox">□</span> Personal</span>
          <span class="tx-option"><span class="tx-checkbox">□</span> Commercial</span>
        </div>
      </div>
      <div class="tx-form-section tx-form-section-carrier">
        <div class="tx-section-title">CARRIER INFORMATION</div>
        <div class="tx-field-row"><span class="tx-field-label">Surplus Lines Carrier:</span><span class="tx-ul tx-ul-long">${carrierName}</span></div>
        <div class="tx-field-row"><span class="tx-field-label">Declination(s):</span><span class="tx-ul tx-ul-long"></span></div>
        <div class="tx-field-row tx-options-row tx-options-three">
          <span class="tx-field-label">Declination Reason:</span>
          <span class="tx-option"><span class="tx-checkbox">□</span> Capacity Reached</span>
          <span class="tx-option"><span class="tx-checkbox">□</span> Underwriting Reason</span>
          <span class="tx-option"><span class="tx-checkbox">□</span> Other</span>
        </div>
        <div class="tx-field-row"><span class="tx-field-label">Comment (if any):</span><span class="tx-ul tx-ul-long"></span></div>
      </div>
      <div class="tx-form-section">
        <div class="tx-section-title">SURPLUS LINES PRINCIPAL BROKER ACKNOWLEDGEMENT</div>
        <p class="tx-ack-statement">An attempt to place this business with the admitted market was performed.</p>
        <div class="tx-sig-block">
          <div class="tx-sig-row">
            <span class="tx-field-label">Signed:</span><span class="tx-ul tx-ul-sig"></span>
          </div>
          <div class="tx-sig-row tx-sig-row-date">
            <span class="tx-field-label">Date:</span><span class="tx-ul tx-ul-date"></span>
          </div>
          <div class="tx-sig-row">
            <span class="tx-field-label">Printed Name:</span><span class="tx-ul tx-ul-long">${agentName}</span>
          </div>
        </div>
      </div>
      <div class="tx-form-footer">
        <p class="tx-footer-italic">Attach additional correspondence as evidence and file with SLTX and/or keep for your records in the event of audits, investigations, or lawsuits.</p>
        <p class="tx-footer-italic">Texas does not have an export or white list for surplus lines coverage. Workers' compensation and private passenger auto are prohibited coverages in the Texas excess and surplus lines market.</p>
        <p class="tx-footer-bullet"><span class="tx-form-link">*Exempt commercial purchasers (TIC 981.0031)</span> need not provide evidence of diligent effort.</p>
        <p class="tx-footer-bullet"><span class="tx-form-link">*Industrial insureds (TIC 981.0033)</span> need not provide evidence of diligent effort.</p>
        <p class="tx-disclaimer"><strong>Disclaimer:</strong> SLTX is not liable for determining if diligent effort has occurred, as determinations are made in Texas by a court of law.</p>
      </div>
    </div>
  `;
  return paFormPageWrapper(data, 'Texas Diligent Effort – Form No. 1.1', body);
}

/**
 * Oregon Diligent Search Statement form
 */
function generateOregonFormPage(data: ApplicationPacketData): string {
  const insuredName = data.companyName || '';
  const coverageType = data.coverageType || data.quoteType || '';
  const dates = data.desiredCoverageDates || '';
  const [inceptionDate = '', expirationDate = ''] = dates.includes(' - ') ? dates.split(' - ').map((s: string) => s.trim()) : [dates, ''];

  const body = `
    <div class="or-form-doc">
      <h1 class="or-form-title">DILIGENT SEARCH STATEMENT</h1>
      <div class="or-form-fields">
        <div class="or-field-row">
          <span class="or-field-label">To:</span>
          <span class="or-field-value">Insurance Commissioner, State of Oregon</span>
        </div>
        <div class="or-field-row">
          <span class="or-field-label">Insured Name:</span>
          <span class="or-ul or-ul-long">${insuredName}</span>
        </div>
        <div class="or-field-row">
          <span class="or-field-label">Policy Number:</span>
          <span class="or-ul or-ul-long"></span>
        </div>
        <div class="or-field-row">
          <span class="or-field-label">Policy Inception Date:</span>
          <span class="or-ul or-ul-long">${inceptionDate}</span>
        </div>
        <div class="or-field-row">
          <span class="or-field-label">Policy Expiration Date:</span>
          <span class="or-ul or-ul-long">${expirationDate}</span>
        </div>
        <div class="or-field-row">
          <span class="or-field-label">Type of Coverage Provided:</span>
          <span class="or-ul or-ul-long">${coverageType}</span>
        </div>
      </div>
      <p class="or-paragraph">
        I have determined that, as per the definition as stated in the federal <strong>Nonadmitted and Reinsurance Reform Act of 2010 Sec. 527</strong>, Oregon is the "home state" for this policy. (A copy of the federal Nonadmitted and Reinsurance Reform Act of 2010 can be viewed online at <a href="https://www.OregonSLA.org" class="or-link">www.OregonSLA.org</a> under "Publications").
      </p>
      <p class="or-paragraph or-indent">
        The Insured was expressly advised prior to placement of this insurance in the <strong>SURPLUS LINE MARKET</strong> that:
      </p>
      <div class="or-bullets">
        <p class="or-bullet"><strong>A.</strong> The Surplus Lines insurer with whom the insurance was placed is not licensed in this state and is not subject to its supervision.</p>
        <p class="or-bullet"><strong>B.</strong> In the event of the insolvency of the <strong>SURPLUS LINES</strong> insurer, losses will not be paid by the <strong>STATE INSURANCE GUARANTY FUND</strong>.</p>
      </div>
      <div class="or-select-prompt">
        <span class="or-select-text">Select (check) Statement 1, Statement 2, OR Statement 3:</span>
      </div>
      <div class="or-red-divider">
        <span class="or-red-arrow">→</span>
        <span class="or-red-dash"></span>
      </div>
      <div class="or-statement or-statement-1">
        <p class="or-statement-title"><span class="or-checkbox"></span> Statement 1:</p>
        <p class="or-statement-text">I hereby certify that I have made a diligent effort to place this insurance with companies admitted to write business in Oregon for this class. I am unable to place the full amount or kind of insurance with companies admitted to transact and who are actually writing the particular kind and class of insurance in this state. I am therefore placing this insurance in the <strong>SURPLUS LINE MARKET</strong>.</p>
      </div>
      <div class="or-dash-line"></div>
      <div class="or-statement or-statement-2">
        <p class="or-statement-title"><span class="or-checkbox"></span> Statement 2:</p>
        <p class="or-statement-text">I have determined that the insured is currently registered with Oregon as a <strong>Risk Purchasing Group (RPG)</strong>, to purchase liability insurance on a group basis, and that this policy placement is exempt from the Diligent Search requirement.</p>
      </div>
      <div class="or-dash-line"></div>
      <div class="or-statement or-statement-3">
        <p class="or-statement-title"><span class="or-checkbox"></span> Statement 3:</p>
        <p class="or-statement-text">I have determined that, as per the definition as stated in the <strong>Nonadmitted and Reinsurance Reform Act of 2010 Sec. 527</strong>, this insured is an <strong>exempt commercial purchaser</strong>, that the requirements as set forth in the federal <strong>Nonadmitted and Reinsurance Reform Act of 2010 Sec. 525</strong> have been complied with, and that this policy placement is exempt from the Diligent Search requirement. (A copy of the federal Nonadmitted and Reinsurance Reform Act of 2010 can be viewed online at <a href="https://www.OregonSLA.org" class="or-link">www.OregonSLA.org</a> under "Publications").</p>
      </div>
      <div class="or-dash-line"></div>
      <div class="or-signature-block">
        <div class="or-sig-row">
          <span class="or-field-label">Printed Name of Producing Agent</span>
          <span class="or-ul or-ul-sig">${data.agentName || ''}</span>
        </div>
        <div class="or-sig-row">
          <span class="or-field-label">Signature of Producing Agent</span>
          <span class="or-ul or-ul-sig"></span>
        </div>
        <div class="or-sig-row">
          <span class="or-field-label">Printed Name of Agency</span>
          <span class="or-ul or-ul-sig">${data.agencyName || ''}</span>
        </div>
        <div class="or-sig-row">
          <span class="or-field-label">Date Signed</span>
          <span class="or-ul or-ul-date"></span>
        </div>
      </div>
    </div>
  `;
  return paFormPageWrapper(data, 'Oregon Diligent Search Statement', body);
}

/**
 * Nevada Surplus Lines Association – DECLINATION DETAIL (NSLA 105)
 */
function generateNevadaFormPage(data: ApplicationPacketData): string {
  const insuredName = data.companyName || '';
  const brokerName = data.agentName || '';
  const agencyName = data.agencyName || '';

  const body = `
    <div class="nv-form-doc">
      <div class="nv-form-header">
        <h1 class="nv-form-org">Nevada Surplus Lines Association</h1>
        <h2 class="nv-form-title">DECLINATION DETAIL</h2>
      </div>
      
      <p class="nv-form-intro">
        This form is to be used when the policy provides insurance for coverage that cannot be written with admitted insurers. (Category is not listed on open lines eligible for export). In pursuant of 685A.215 of NRS, identify three admitted insurers marketing the class of insurance that declined the risk. Include with this submission form NSLA 101.
      </p>
      
      <div class="nv-form-field-row">
        <span class="nv-form-label">NAME OF INSURED</span>
        <span class="nv-form-ul nv-form-ul-long">${insuredName}</span>
      </div>
      <div class="nv-form-field-row">
        <span class="nv-form-label">POLICY NUMBER</span>
        <span class="nv-form-ul nv-form-ul-long"></span>
      </div>
      
      <div class="nv-form-decline-block">
        <p class="nv-form-decline-heading">1.</p>
        <div class="nv-form-field-row">
          <span class="nv-form-label">Admitted Insurer</span>
          <span class="nv-form-ul nv-form-ul-long"></span>
        </div>
        <div class="nv-form-field-row">
          <span class="nv-form-label">Address</span>
          <span class="nv-form-ul nv-form-ul-long"></span>
        </div>
        <div class="nv-form-field-row nv-form-row-two-col">
          <span class="nv-form-label">Phone Number</span>
          <span class="nv-form-ul nv-form-ul-phone"></span>
          <span class="nv-form-label nv-form-label-underwriter">Underwriter</span>
          <span class="nv-form-ul nv-form-ul-underwriter"></span>
        </div>
        <div class="nv-form-field-row">
          <span class="nv-form-label">Reason For Declination (enter code from bottom)</span>
          <span class="nv-form-ul nv-form-ul-long"></span>
        </div>
      </div>
      
      <div class="nv-form-decline-block">
        <p class="nv-form-decline-heading">2.</p>
        <div class="nv-form-field-row">
          <span class="nv-form-label">Admitted Insurer</span>
          <span class="nv-form-ul nv-form-ul-long"></span>
        </div>
        <div class="nv-form-field-row">
          <span class="nv-form-label">Address</span>
          <span class="nv-form-ul nv-form-ul-long"></span>
        </div>
        <div class="nv-form-field-row nv-form-row-two-col">
          <span class="nv-form-label">Phone Number</span>
          <span class="nv-form-ul nv-form-ul-phone"></span>
          <span class="nv-form-label nv-form-label-underwriter">Underwriter</span>
          <span class="nv-form-ul nv-form-ul-underwriter"></span>
        </div>
        <div class="nv-form-field-row">
          <span class="nv-form-label">Reason For Declination (enter code from bottom)</span>
          <span class="nv-form-ul nv-form-ul-long"></span>
        </div>
      </div>
      
      <div class="nv-form-decline-block">
        <p class="nv-form-decline-heading">3.</p>
        <div class="nv-form-field-row">
          <span class="nv-form-label">Admitted Insurer</span>
          <span class="nv-form-ul nv-form-ul-long"></span>
        </div>
        <div class="nv-form-field-row">
          <span class="nv-form-label">Address</span>
          <span class="nv-form-ul nv-form-ul-long"></span>
        </div>
        <div class="nv-form-field-row nv-form-row-two-col">
          <span class="nv-form-label">Phone Number</span>
          <span class="nv-form-ul nv-form-ul-phone"></span>
          <span class="nv-form-label nv-form-label-underwriter">Underwriter</span>
          <span class="nv-form-ul nv-form-ul-underwriter"></span>
        </div>
        <div class="nv-form-field-row">
          <span class="nv-form-label">Reason For Declination (enter code from bottom)</span>
          <span class="nv-form-ul nv-form-ul-long"></span>
        </div>
      </div>
      
      <p class="nv-form-codes-heading">Reason for Declination Codes:</p>
      <div class="nv-form-codes-grid">
        <div class="nv-form-codes-col">
          <p class="nv-form-code-item">1 – Unacceptable class of business</p>
          <p class="nv-form-code-item">2 – Age of building</p>
          <p class="nv-form-code-item">3 – Declined to quote</p>
          <p class="nv-form-code-item">4 – Doesn't fit underwriting requirement</p>
        </div>
        <div class="nv-form-codes-col">
          <p class="nv-form-code-item">5 – No Market</p>
          <p class="nv-form-code-item">6 – No Prior Insurance</p>
          <p class="nv-form-code-item">7 – Excessive claims</p>
          <p class="nv-form-code-item">8 – Other (please explain)</p>
        </div>
      </div>
      
      <p class="nv-form-explanation">
        <strong>PLEASE</strong> PROVIDE ANY ADDITIONAL EXPLANATION AND EFFORTS TO PLACE THIS INSURANCE WITH AN ADMITTED INSURER THAT WOULD HELP SUPPORT THE NEED TO PLACE THE POLICY WITH A SURPLUS LINES COMPANY.
      </p>
      
      <div class="nv-form-sig-block">
        <div class="nv-form-sig-row nv-form-sig-left">
          <span class="nv-form-label">PRINT BROKER'S NAME</span>
          <span class="nv-form-ul nv-form-ul-sig">${brokerName}</span>
        </div>
        <div class="nv-form-sig-row nv-form-sig-center">
          <span class="nv-form-label">SIGNATURE</span>
          <span class="nv-form-ul nv-form-ul-sig"></span>
        </div>
        <div class="nv-form-sig-row nv-form-sig-right">
          <span class="nv-form-label">DATE</span>
          <span class="nv-form-ul nv-form-ul-sig"></span>
        </div>
      </div>
      
      <div class="nv-form-footer">
        <span class="nv-form-footer-left">NSLA 105 7/01/99</span>
        <span class="nv-form-footer-right">*Signature date must be the effective date or prior*</span>
      </div>
    </div>
  `;
  return paFormPageWrapper(data, 'Nevada Surplus Lines Association – Declination Detail', body);
}

/**
 * Florida Surplus Lines Disclosure and Acknowledgement
 */
function generateFloridaFormPage(data: ApplicationPacketData): string {
  const agencyName = data.agencyName || '';
  const insuredName = data.companyName || '';
  const carrierName = data.carrierName || '';
  const coverageType = data.coverageType || data.quoteType || '';
  const effectiveDate = data.desiredCoverageDates ? data.desiredCoverageDates.split(' - ').map((s: string) => s.trim())[0] || 'TBD' : 'TBD';

  const body = `
    <div class="fl-form-doc">
      <h1 class="fl-form-title">Surplus Lines Disclosure and Acknowledgement</h1>
      
      <p class="fl-form-paragraph">
        At my direction, <span class="fl-form-ul fl-form-ul-agency">${agencyName}</span> has placed my coverage in the surplus lines market.
      </p>
      <p class="fl-form-hint">*name of insurance agency*</p>
      
      <p class="fl-form-paragraph">
        As required by Florida Statute 626.916, I have agreed to this placement. I understand that coverage may be available in the admitted market and that persons insured by surplus lines carriers are not protected by the Florida Insurance Guaranty Act with respect to any right of recovery for the obligation of an insolvent unlicensed insurer. Additionally, I understand surplus lines insurers' policy rates and forms are not approved by any Florida regulatory agency.
      </p>
      
      <p class="fl-form-paragraph">
        I further understand the policy forms, conditions, premiums, and deductibles used by surplus lines insurers may be different from those found in policies used in the admitted market. I have been advised to carefully read the entire policy.
      </p>
      
      <div class="fl-form-field-block">
        <span class="fl-form-ul fl-form-ul-field">${insuredName}</span>
        <span class="fl-form-label-below">Named Insured</span>
      </div>
      
      <div class="fl-form-sig-row">
        <div class="fl-form-sig-left">
          <div class="fl-form-sig-line-row">
            <span class="fl-form-label-inline">By:</span>
            <span class="fl-form-ul fl-form-ul-sig"></span>
          </div>
          <span class="fl-form-label-below">Signature of Named Insured</span>
        </div>
        <div class="fl-form-sig-right">
          <div class="fl-form-sig-line-row">
            <span class="fl-form-label-inline">Date</span>
            <span class="fl-form-ul fl-form-ul-date"></span>
          </div>
          <span class="fl-form-label-below">Date</span>
        </div>
      </div>
      
      <div class="fl-form-field-block">
        <span class="fl-form-ul fl-form-ul-long"></span>
        <span class="fl-form-label-below">Printed Name and Title of Person Signing</span>
      </div>
      
      <div class="fl-form-field-block">
        <span class="fl-form-ul fl-form-ul-field">${carrierName}</span>
        <span class="fl-form-label-below">Name of Excess and Surplus Lines Carrier</span>
      </div>
      
      <div class="fl-form-field-block">
        <span class="fl-form-ul fl-form-ul-field">${coverageType}</span>
        <span class="fl-form-label-below">Type of Insurance</span>
      </div>
      
      <div class="fl-form-field-block">
        <span class="fl-form-ul fl-form-ul-field">${effectiveDate}</span>
        <span class="fl-form-label-below">Effective Date of Coverage</span>
      </div>
    </div>
  `;
  return paFormPageWrapper(data, 'Florida Surplus Lines Disclosure and Acknowledgement', body);
}

/**
 * California Important Notice – Surplus Line Disclosure (Page 1)
 */
function generateCaliforniaFormPage1(data: ApplicationPacketData): string {
  const body = `
    <div class="ca-form-doc">
      <h1 class="ca-form-title">IMPORTANT NOTICE:</h1>
      <div class="ca-form-content">
        <p class="ca-form-item"><strong>1.</strong> The insurance policy that you are applying to purchase is being issued by an insurer that is not licensed by the State of California. These companies are called "nonadmitted" or "surplus line" insurers.</p>
        <p class="ca-form-item"><strong>2.</strong> The insurer is not subject to the financial solvency regulation and enforcement that apply to California licensed insurers.</p>
        <p class="ca-form-item"><strong>3.</strong> The insurer does not participate in any of the insurance guarantee funds created by California law. Therefore, these funds will not pay your claims or protect your assets if the insurer becomes insolvent and is unable to make payments as promised.</p>
        <p class="ca-form-item"><strong>4.</strong> The insurer should be licensed either as a foreign insurer in another state in the United States or as a non-United States (alien) insurer. You should ask questions of your insurance agent, broker, or "surplus line" broker or contact the California Department of Insurance at the toll-free number 1-800-927-4357 or internet website www.insurance.ca.gov. Ask whether or not the insurer is licensed as a foreign or non-United States (alien) insurer and for additional information about the insurer. You may also visit the NAIC's internet website at www.naic.org. The NAIC—the National Association of Insurance Commissioners—is the regulatory support organization created and governed by the chief insurance regulators in the United States.</p>
      </div>
    </div>
  `;
  return paFormPageWrapper(data, 'California Surplus Line Disclosure (Page 1)', body);
}

/**
 * California Important Notice – Surplus Line Disclosure (Page 2)
 */
function generateCaliforniaFormPage2(data: ApplicationPacketData): string {
  const insuredName = data.companyName || '';
  const body = `
    <div class="ca-form-doc">
      <div class="ca-form-content">
        <p class="ca-form-item"><strong>5.</strong> Foreign insurers should be licensed by a state in the United States and you may contact that state's department of insurance to obtain more information about that insurer. You can find a link to each state from this NAIC internet website: https://naic.org/state_web_map.htm.</p>
        <p class="ca-form-item"><strong>6.</strong> For non-United States (alien) insurers, the insurer should be licensed by a country outside of the United States and should be on the NAIC's International Insurers Department (IID) listing of approved nonadmitted non-United States insurers. Ask your agent, broker, or "surplus line" broker to obtain more information about that insurer.</p>
        <p class="ca-form-item"><strong>7.</strong> California maintains a "List of Approved Surplus Line Insurers (LASLI)." Ask your agent or broker if the insurer is on that list, or view that list at the internet website of the California Department of Insurance: www.insurance.ca.gov/01-consumers/120-company/07-lasli/lasli.cfm.</p>
        <p class="ca-form-item"><strong>8.</strong> If you, as the applicant, required that the insurance policy you have purchased be effective immediately, either because existing coverage was going to lapse within two business days or because you were required to have coverage within two business days, and you did not receive this disclosure form and a request for your signature until after coverage became effective, you have the right to cancel this policy within five days of receiving this disclosure. If you cancel coverage, the premium will be prorated and any broker's fee charged for this insurance will be returned to you.</p>
      </div>
      <div class="ca-form-sig-block">
        <div class="ca-form-sig-row">
          <span class="ca-form-label">Date:</span>
          <span class="ca-form-ul"></span>
        </div>
        <div class="ca-form-sig-row">
          <span class="ca-form-label">Insured:</span>
          <span class="ca-form-ul">${insuredName}</span>
        </div>
      </div>
      <div class="ca-form-footer">D-1 (Effective January 1, 2020)</div>
    </div>
  `;
  return paFormPageWrapper(data, 'California Surplus Line Disclosure (Page 2)', body);
}

/**
 * California DILIGENT SEARCH REPORT (SL-2 FORM) – Page 3
 * The Surplus Line Association of California; exact layout, grey sections, black number boxes, table.
 */
function generateCaliforniaFormPage3(data: ApplicationPacketData): string {
  const insuredName = data.companyName || '';
  const coverageType = data.coverageType || data.quoteType || '';
  const agentName = data.agentName || '';
  const agencyName = data.agencyName || '';

  const body = `
    <div class="ca-sl2-doc" style="page-break-inside: avoid;">
      <div class="ca-sl2-header">
        <p class="ca-sl2-org">The Surplus Line Association of California</p>
        <p class="ca-sl2-title">DILIGENT SEARCH REPORT (SL-2 FORM)</p>
      </div>
      
      <div class="ca-sl2-section">
        <span class="ca-sl2-num">1</span>
        <div class="ca-sl2-section-body">
          <p class="ca-sl2-instruction">Before completing this report, please review the instructions on page 2.</p>
          <p class="ca-sl2-statement">I, <span class="ca-sl2-ul ca-sl2-ul-name">${agentName}</span>, hereby submit that I performed or supervised this diligent search, and I am:</p>
          <p class="ca-sl2-option"><strong>(A)</strong> licensed as an individual agent-broker for the applicable lines of insurance or surplus line broker under California license number <span class="ca-sl2-ul ca-sl2-ul-mid"></span></p>
          <p class="ca-sl2-or">OR</p>
          <p class="ca-sl2-option"><strong>(B)</strong> licensed and an endorsee on the license of <span class="ca-sl2-ul ca-sl2-ul-mid">${agencyName}</span> (Full Name of Organization), California license number <span class="ca-sl2-ul ca-sl2-ul-mid"></span></p>
        </div>
      </div>
      
      <div class="ca-sl2-section ca-sl2-section-grey">
        <span class="ca-sl2-num">2</span>
        <div class="ca-sl2-section-body">
          <p class="ca-sl2-option"><strong>(A)</strong> Name of Insured: <span class="ca-sl2-ul ca-sl2-ul-long">${insuredName}</span></p>
          <p class="ca-sl2-option"><strong>(B)</strong> Description of Risk: <span class="ca-sl2-ul ca-sl2-ul-long"></span></p>
          <p class="ca-sl2-hint">(e.g., Tattoo Parlor, Cannabis Dispensary, Vacant Building, <strong>NOT TYPE OF COVERAGE</strong>)</p>
          <p class="ca-sl2-option"><strong>(C)</strong> Type of Insurance or Coverage Code: <span class="ca-sl2-ul ca-sl2-ul-long">${coverageType}</span></p>
        </div>
      </div>
      
      <div class="ca-sl2-section">
        <span class="ca-sl2-num">3</span>
        <div class="ca-sl2-section-body">
          <p class="ca-sl2-intro">Describe the diligent efforts made to place this coverage with admitted insurers by completing (A) or, if applicable, (B) below.</p>
          <p class="ca-sl2-option"><strong>(A)</strong> List the insurers admitted in California who actually write the type of insurance described on lines 2(B) and 2(C) to which you or someone under your supervision submitted the risk described in lines 2(A) through 2(C). Please complete ALL sections of the table below.</p>
          <div class="ca-sl2-table">
            <div class="ca-sl2-table-row ca-sl2-table-header">
              <div class="ca-sl2-table-cell ca-sl2-cell-header"><span>INSURER 1</span></div>
              <div class="ca-sl2-table-cell ca-sl2-cell-header"><span>INSURER 2</span></div>
              <div class="ca-sl2-table-cell ca-sl2-cell-header"><span>INSURER 3</span></div>
            </div>
            <div class="ca-sl2-table-row">
              <div class="ca-sl2-table-cell"><span class="ca-sl2-cell-label">NAIC ID</span><span class="ca-sl2-input"></span></div>
              <div class="ca-sl2-table-cell"><span class="ca-sl2-cell-label">NAIC ID</span><span class="ca-sl2-input"></span></div>
              <div class="ca-sl2-table-cell"><span class="ca-sl2-cell-label">NAIC ID</span><span class="ca-sl2-input"></span></div>
            </div>
            <div class="ca-sl2-table-row">
              <div class="ca-sl2-table-cell"><span class="ca-sl2-cell-label">MONTH, YEAR OF DECLINATION</span><span class="ca-sl2-input"></span></div>
              <div class="ca-sl2-table-cell"><span class="ca-sl2-cell-label">MONTH, YEAR OF DECLINATION</span><span class="ca-sl2-input"></span></div>
              <div class="ca-sl2-table-cell"><span class="ca-sl2-cell-label">MONTH, YEAR OF DECLINATION</span><span class="ca-sl2-input"></span></div>
            </div>
            <div class="ca-sl2-table-row">
              <div class="ca-sl2-table-cell"><span class="ca-sl2-cell-label">FULL NAME OF ADMITTED INSURER</span><span class="ca-sl2-input"></span></div>
              <div class="ca-sl2-table-cell"><span class="ca-sl2-cell-label">FULL NAME OF ADMITTED INSURER</span><span class="ca-sl2-input"></span></div>
              <div class="ca-sl2-table-cell"><span class="ca-sl2-cell-label">FULL NAME OF ADMITTED INSURER</span><span class="ca-sl2-input"></span></div>
            </div>
            <div class="ca-sl2-table-row">
              <div class="ca-sl2-table-cell"><span class="ca-sl2-cell-label">CONTACT INFORMATION</span><span class="ca-sl2-input ca-sl2-input-sub">FULL NAME</span><span class="ca-sl2-input ca-sl2-input-sub">PHONE / EMAIL</span><span class="ca-sl2-input ca-sl2-input-sub">OR WEBSITE</span></div>
              <div class="ca-sl2-table-cell"><span class="ca-sl2-cell-label">CONTACT INFORMATION</span><span class="ca-sl2-input ca-sl2-input-sub">FULL NAME</span><span class="ca-sl2-input ca-sl2-input-sub">PHONE / EMAIL</span><span class="ca-sl2-input ca-sl2-input-sub">OR WEBSITE</span></div>
              <div class="ca-sl2-table-cell"><span class="ca-sl2-cell-label">CONTACT INFORMATION</span><span class="ca-sl2-input ca-sl2-input-sub">FULL NAME</span><span class="ca-sl2-input ca-sl2-input-sub">PHONE / EMAIL</span><span class="ca-sl2-input ca-sl2-input-sub">OR WEBSITE</span></div>
            </div>
          </div>
          <p class="ca-sl2-option"><strong>(B)</strong> If you did not list at least three insurers in 3(A) above, describe in detail how you determined that fewer than THREE admitted insurers write the type of insurance described on lines 2(B) and 2(C).</p>
          <div class="ca-sl2-textarea"></div>
        </div>
      </div>
      
      <div class="ca-sl2-section ca-sl2-section-grey">
        <span class="ca-sl2-num">4</span>
        <div class="ca-sl2-section-body">
          <p class="ca-sl2-option">Is the type of insurance you are reporting as identified in line 2(C) <strong>private passenger automobile liability or health</strong>? <span class="ca-sl2-yn">Yes <span class="ca-sl2-cb"></span> No <span class="ca-sl2-cb"></span></span></p>
          <p class="ca-sl2-addendum">If you answered "yes," please complete the <span class="ca-sl2-link">Diligent Search Report Addendum</span>.</p>
        </div>
      </div>
      
      <p class="ca-sl2-cert">The undersigned licensee hereby certifies that this report is true and correct, and that this risk is not being placed with a non-admitted insurer for the sole purpose of securing a rate or premium lower than the lowest rate or premium available from an admitted insurer.</p>
      
      <div class="ca-sl2-sig-row">
        <div class="ca-sl2-sig-block">
          <span class="ca-sl2-ul ca-sl2-ul-sig"></span>
          <span class="ca-sl2-sig-label">(Signature of Licensee Named on Line 1)</span>
        </div>
        <div class="ca-sl2-sig-block">
          <span class="ca-sl2-ul ca-sl2-ul-sig"></span>
          <span class="ca-sl2-sig-label">(Date)</span>
        </div>
      </div>
      
      <div class="ca-sl2-footer" style="page-break-inside: avoid;">SL-2 Form (Revised 01/2024)</div>
    </div>
  `;
  return paFormPageWrapper(data, 'California Diligent Search Report (SL-2)', body);
}

/**
 * Colorado Statement of Diligent Effort
 * Dark blue header/border, grey underlines, watermark; fits on one page.
 */
function generateColoradoFormPage(data: ApplicationPacketData): string {
  const agentName = data.agentName || '';
  const agencyName = data.agencyName || '';
  const insuredName = data.companyName || '';
  const coverageType = data.coverageType || data.quoteType || '';

  const body = `
    <div class="co-form-doc" style="page-break-inside: avoid;">
      <div class="co-form-border">
        <div class="co-form-watermark" aria-hidden="true">COLORADO<br>1876</div>
        <header class="co-form-header">STATEMENT OF DILIGENT EFFORT</header>
        
        <div class="co-form-intro-row">
          <span class="co-form-intro-text">I,</span>
          <span class="co-form-ul co-form-ul-intro"></span>
          <span class="co-form-intro-text">License #:</span>
          <span class="co-form-ul co-form-ul-license"></span>
        </div>
        <div class="co-form-field-block co-form-field-centered">
          <span class="co-form-label-above">Name of Retail/Producing Agent</span>
          <span class="co-form-ul co-form-ul-long">${agentName}</span>
        </div>
        <div class="co-form-field-row">
          <span class="co-form-label">Name of Agency:</span>
          <span class="co-form-ul co-form-ul-long">${agencyName}</span>
        </div>
        <div class="co-form-field-row">
          <span class="co-form-label">Have sought to obtain:</span>
          <span class="co-form-ul co-form-ul-long"></span>
        </div>
        <div class="co-form-field-row co-form-row-inline">
          <span class="co-form-label">Specific Type of Coverage</span>
          <span class="co-form-ul co-form-ul-mid"></span>
          <span class="co-form-label">for</span>
          <span class="co-form-ul co-form-ul-mid"></span>
          <span class="co-form-label">Named Insured</span>
          <span class="co-form-ul co-form-ul-mid">${insuredName}</span>
          <span class="co-form-label">from the following</span>
        </div>
        <div class="co-form-field-row">
          <span class="co-form-label">authorized insurers currently writing this type of coverage:</span>
          <span class="co-form-ul co-form-ul-long"></span>
        </div>
        
        <div class="co-form-insurer-block">
          <p class="co-form-insurer-num">(1) Authorized Insurer:</p>
          <div class="co-form-field-row">
            <span class="co-form-label">Person Contacted</span>
            <span class="co-form-ul co-form-ul-long"></span>
          </div>
          <p class="co-form-hint">(or indicate if obtained online declination)</p>
          <div class="co-form-field-row co-form-row-two">
            <span class="co-form-label">Telephone Number/Email:</span>
            <span class="co-form-ul co-form-ul-mid"></span>
            <span class="co-form-label">Date of Contact:</span>
            <span class="co-form-ul co-form-ul-date"></span>
          </div>
          <div class="co-form-field-row">
            <span class="co-form-label">The reason(s) for declination by the insurer was (were) as follows</span>
            <span class="co-form-ul co-form-ul-long"></span>
          </div>
          <p class="co-form-hint">(Attach electronic declinations if applicable)</p>
        </div>
        
        <div class="co-form-insurer-block">
          <p class="co-form-insurer-num">(2) Authorized Insurer:</p>
          <div class="co-form-field-row">
            <span class="co-form-label">Person Contacted</span>
            <span class="co-form-ul co-form-ul-long"></span>
          </div>
          <p class="co-form-hint">(or indicate if obtained online declination)</p>
          <div class="co-form-field-row co-form-row-two">
            <span class="co-form-label">Telephone Number/Email:</span>
            <span class="co-form-ul co-form-ul-mid"></span>
            <span class="co-form-label">Date of Contact:</span>
            <span class="co-form-ul co-form-ul-date"></span>
          </div>
          <div class="co-form-field-row">
            <span class="co-form-label">The reason(s) for declination by the insurer was (were) as follows</span>
            <span class="co-form-ul co-form-ul-long"></span>
          </div>
          <p class="co-form-hint">(Attach electronic declinations if applicable)</p>
        </div>
        
        <div class="co-form-insurer-block">
          <p class="co-form-insurer-num">(3) Authorized Insurer:</p>
          <div class="co-form-field-row">
            <span class="co-form-label">Person Contacted</span>
            <span class="co-form-ul co-form-ul-long"></span>
          </div>
          <p class="co-form-hint">(or indicate if obtained online declination)</p>
          <div class="co-form-field-row co-form-row-two">
            <span class="co-form-label">Telephone Number/Email:</span>
            <span class="co-form-ul co-form-ul-mid"></span>
            <span class="co-form-label">Date of Contact:</span>
            <span class="co-form-ul co-form-ul-date"></span>
          </div>
          <div class="co-form-field-row">
            <span class="co-form-label">The reason(s) for declination by the insurer was (were) as follows</span>
            <span class="co-form-ul co-form-ul-long"></span>
          </div>
          <p class="co-form-hint">(Attach electronic declinations if applicable)</p>
        </div>
        
        <div class="co-form-sig-row">
          <div class="co-form-sig-block">
            <span class="co-form-label">Signature of Retail/Producing Agent</span>
            <span class="co-form-ul co-form-ul-sig"></span>
          </div>
          <div class="co-form-sig-block">
            <span class="co-form-label">Date</span>
            <span class="co-form-ul co-form-ul-date"></span>
          </div>
        </div>
        
        <div class="co-form-attest">
          <span class="co-form-checkbox"></span>
          <p class="co-form-attest-text">OR, by checking this box, I attest that I am familiar with the insurance market and this particular risk cannot be placed in the admitted market. I understand that the requirement to satisfy due diligence by documentation that the coverage required was not procurable after a comprehensive search was made from a minimum of three admitted insurers shall be waived. A written record documenting knowledge of the insurance market shall be maintained by the broker and must be current within 90 days of writing this policy.</p>
        </div>
        <div class="co-form-sig-row">
          <div class="co-form-sig-block">
            <span class="co-form-label">Signature of Producing Agent</span>
            <span class="co-form-ul co-form-ul-sig"></span>
          </div>
          <div class="co-form-sig-block">
            <span class="co-form-label">Date</span>
            <span class="co-form-ul co-form-ul-date"></span>
          </div>
        </div>
        
        <p class="co-form-definition">"Diligent effort" means seeking coverage from and having been rejected by at least three authorized insurers currently writing this type of coverage and documenting these rejections. Surplus lines agents must verify that a diligent effort form was completed by retaining a properly documented statement of diligent effort from the retail or producing agent. Declinations must be documented on a risk-by-risk basis.</p>
        
        <div class="co-form-footer-rev">Rev. 4/15/2025 | Colorado Division of Insurance</div>
      </div>
    </div>
  `;
  return paFormPageWrapper(data, 'Colorado Statement of Diligent Effort', body);
}

/**
 * New York Part C – Affidavit by Producing Broker (NYSID Form 41C)
 */
function generateNewYorkFormPage(data: ApplicationPacketData): string {
  const name = data.agentName || '';
  const address = data.agencyAddress || '';
  const city = data.agencyCity || '';
  const state = data.agencyState || '';
  const zip = data.agencyZip || '';
  const insuredName = data.companyName || '';

  const body = `
    <div class="ny-form-doc ny-form-page1" style="page-break-inside: avoid;">
      <h1 class="ny-form-title">PART C – AFFIDAVIT BY PRODUCING BROKER</h1>
      <div class="ny-form-section ny-form-section-1">
        <div class="ny-form-section-head-row">
          <span class="ny-form-section-heading">1. PRODUCING BROKER INFORMATION</span>
          <span class="ny-form-inline-label">AFFIDAVIT NO.</span>
          <span class="ny-form-input-box ny-form-box-affidavit"></span>
        </div>
        <div class="ny-form-row-boxes">
          <div class="ny-form-field-block">
            <span class="ny-form-input-box ny-form-box-name">${name}</span>
            <span class="ny-form-label-below">Name</span>
          </div>
          <div class="ny-form-field-block">
            <span class="ny-form-input-box ny-form-box-license"></span>
            <span class="ny-form-label-below">License No. BR-</span>
          </div>
        </div>
        <div class="ny-form-row-boxes ny-form-row-address">
          <div class="ny-form-field-block ny-form-field-addr">
            <span class="ny-form-input-box ny-form-box-addr">${address}</span>
            <span class="ny-form-label-below">Address</span>
          </div>
          <div class="ny-form-field-block">
            <span class="ny-form-input-box ny-form-box-city">${city}</span>
            <span class="ny-form-label-below">City</span>
          </div>
          <div class="ny-form-field-block">
            <span class="ny-form-input-box ny-form-box-state">${state}</span>
            <span class="ny-form-label-below">State</span>
          </div>
          <div class="ny-form-field-block">
            <span class="ny-form-input-box ny-form-box-zip">${zip}</span>
            <span class="ny-form-label-below">Zip Code</span>
          </div>
        </div>
      </div>
      <div class="ny-form-section ny-form-section-boxed">
        <p class="ny-form-section-heading">2. RISK INFORMATION:</p>
        <div class="ny-form-field-block ny-form-field-insured">
          <span class="ny-form-input-box ny-form-box-insured">${insuredName}</span>
          <span class="ny-form-label-below">Name of the Insured</span>
        </div>
        <p class="ny-form-note">(The name of the insured must be precisely the same in this affidavit and the declarations page, binder, cover note or confirmation of coverage.)</p>
      </div>
      <div class="ny-form-section ny-form-section-boxed">
        <p class="ny-form-section-heading">3. DISCLOSURE INFORMATION</p>
        <div class="ny-form-question-row">
          <span class="ny-form-yn">
            <span class="ny-form-cb"></span> Yes
            <span class="ny-form-cb ny-form-cb-right"></span> No
          </span>
          <span class="ny-form-question">Did you personally provide a written Notice of Excess Line Placement (Form: NELP/2011) to the insured as required by Section 2118 of the New York Insurance Law and Regulation 41?</span>
        </div>
      </div>
      <div class="ny-form-section ny-form-section-boxed">
        <p class="ny-form-section-heading">4. DECLINATION INFORMATION</p>
        <p class="ny-form-declination-item">
          <span class="ny-form-yn"><span class="ny-form-cb"></span> Yes <span class="ny-form-cb ny-form-cb-right"></span> No</span>
          <strong>(a)</strong> Has the Superintendent determined that declinations are not required for this type of risk? IF ANSWER TO QUESTION (a) IS "YES", SKIP QUESTIONS (b) AND (c) GO ON TO THE AFFIRMATION SECTION.
        </p>
        <p class="ny-form-declination-item">
          <span class="ny-form-yn"><span class="ny-form-cb"></span> Yes <span class="ny-form-cb ny-form-cb-right"></span> No</span>
          <strong>(b)</strong> Does the insured qualify as an "Exempt Commercial Purchaser" that made a written request consistent with the requirements of New York Insurance Law Section 2118(b)(3)(F)? IF ANSWER TO QUESTION (b) IS "YES", SKIP QUESTION (c) GO ON TO THE AFFIRMATION SECTION.
        </p>
        <p class="ny-form-declination-item">
          <span class="ny-form-yn"><span class="ny-form-cb"></span> Yes <span class="ny-form-cb ny-form-cb-right"></span> No</span>
          <strong>(c)</strong> Was the risk described above submitted by the producing broker to companies: (1) each authorized in New York to write coverages of the kind requested; (2) which the licensee has reason to believe might consider writing the type of coverage or class of insurance involved; and (3) was such risk declined by each such company? If the answer to QUESTION (c) above is "YES", COMPLETE THE FOLLOWING SCHEDULE:
        </p>
      </div>
      <p class="ny-form-subsection-heading">AUTHORIZED COMPANIES DECLINING THE RISK</p>
      <div class="ny-form-decline-schedule">
        <div class="ny-form-decline-row">
          <span class="ny-form-label">1. Name of company</span>
          <span class="ny-form-ul ny-form-ul-company"></span>
          <span class="ny-form-label ny-form-label-date">Date of Declin.:</span>
          <span class="ny-form-ul ny-form-ul-date"></span>
          <span class="ny-form-label ny-form-label-naic">NAIC Code</span>
          <span class="ny-form-ul ny-form-ul-naic"></span>
        </div>
        <p class="ny-form-reason-intro">I believed this insurer would consider underwriting this risk because:</p>
        <div class="ny-form-reason-list">
          <div class="ny-form-reason-item"><span class="ny-form-cb"></span> Recent acceptance by the insurer of a risk, requiring that type of coverage or class of Insurance.</div>
          <div class="ny-form-reason-item"><span class="ny-form-cb"></span> Advertising by the insurer or its agent indicating it entertains that type of risk/coverage.</div>
          <div class="ny-form-reason-item"><span class="ny-form-cb"></span> Media communications (Newspapers, Trade Magazines, Radio) which indicate the insurer will underwrite that type of coverage.</div>
          <div class="ny-form-reason-item"><span class="ny-form-cb"></span> Communications with other professionals, such as brokers, agents, risk managers, insurance department or ELANY Personnel indicating the insurer entertains such risks.</div>
          <div class="ny-form-reason-item"><span class="ny-form-cb"></span> Any other valid basis you can document. <span class="ny-form-ul ny-form-ul-other"></span></div>
        </div>
      </div>
      <div class="ny-form-footer-combined" style="page-break-inside: avoid;">
        <span class="ny-form-footer-left">NYSID Form 41C - W (Ed. January 2023)</span>
        <span class="ny-form-footer-center">Page 1 of 2</span>
        <span class="ny-form-footer-right">New York Part C – Affidavit by Producing Broker (Page 1)</span>
      </div>
    </div>
  `;
  return paFormPageWrapper(data, '', body);
}

/**
 * New York Part C – Affidavit by Producing Broker - Page 2 (NYSID Form 41C)
 * AUTHORIZED COMPANIES DECLINING THE RISK (entries 2–3) and AFFIRMATION
 */
function generateNewYorkFormPage2(data: ApplicationPacketData): string {
  const affiantName = data.agentName || '';

  const body = `
    <div class="ny-form-doc ny-form-page2">
      <h1 class="ny-form-title">PART C – AFFIDAVIT BY PRODUCING BROKER</h1>
      <div class="ny-form-section ny-form-section-1">
        <p class="ny-form-section-heading"><span class="ny-form-inline-label">AFFIDAVIT NO.</span> <span class="ny-form-ul ny-form-ul-affidavit"></span></p>
      </div>
      <p class="ny-form-subsection-heading">AUTHORIZED COMPANIES DECLINING THE RISK</p>
      <div class="ny-form-decline-schedule">
        <div class="ny-form-decline-block">
          <div class="ny-form-decline-row">
            <span class="ny-form-label">2. Name of Company</span>
            <span class="ny-form-ul ny-form-ul-company"></span>
            <span class="ny-form-label ny-form-label-date">Date of Declin.:</span>
            <span class="ny-form-ul ny-form-ul-date"></span>
          </div>
          <div class="ny-form-decline-row">
            <span class="ny-form-label">NAIC Code</span>
            <span class="ny-form-ul ny-form-ul-naic"></span>
          </div>
          <p class="ny-form-reason-intro">I believed this insurer would consider underwriting this risk because:</p>
          <div class="ny-form-reason-list">
            <div class="ny-form-reason-item"><span class="ny-form-cb"></span> Recent acceptance by the insurer of a risk, requiring that type of coverage or class of Insurance.</div>
            <div class="ny-form-reason-item"><span class="ny-form-cb"></span> Advertising by the insurer or its agent indicating it entertains that type of risk/coverage.</div>
            <div class="ny-form-reason-item"><span class="ny-form-cb"></span> Media communications (Newspapers, Trade Magazines, Radio) which indicate the insurer will underwrite that type of coverage.</div>
            <div class="ny-form-reason-item"><span class="ny-form-cb"></span> Communications with other professionals, such as brokers, agents, risk managers, insurance department or ELANY Personnel indicating the insurer entertains such risks.</div>
            <div class="ny-form-reason-item"><span class="ny-form-cb"></span> Any other valid basis you can document. <span class="ny-form-ul ny-form-ul-other"></span></div>
          </div>
        </div>
        <div class="ny-form-decline-block">
          <div class="ny-form-decline-row">
            <span class="ny-form-label">3. Name of Company</span>
            <span class="ny-form-ul ny-form-ul-company"></span>
            <span class="ny-form-label ny-form-label-date">Date of Declin.:</span>
            <span class="ny-form-ul ny-form-ul-date"></span>
          </div>
          <div class="ny-form-decline-row">
            <span class="ny-form-label">NAIC Code</span>
            <span class="ny-form-ul ny-form-ul-naic"></span>
          </div>
          <p class="ny-form-reason-intro">I believed this insurer would consider underwriting this risk because:</p>
          <div class="ny-form-reason-list">
            <div class="ny-form-reason-item"><span class="ny-form-cb"></span> Recent acceptance by the insurer of a risk, requiring that type of coverage or class of Insurance.</div>
            <div class="ny-form-reason-item"><span class="ny-form-cb"></span> Advertising by the insurer or its agent indicating it entertains that type of risk/coverage.</div>
            <div class="ny-form-reason-item"><span class="ny-form-cb"></span> Media communications (Newspapers, Trade Magazines, Radio) which indicate the insurer will underwrite that type of coverage.</div>
            <div class="ny-form-reason-item"><span class="ny-form-cb"></span> Communications with other professionals, such as brokers, agents, risk managers, insurance department or ELANY Personnel indicating the insurer entertains such risks.</div>
            <div class="ny-form-reason-item"><span class="ny-form-cb"></span> Any other valid basis you can document. <span class="ny-form-ul ny-form-ul-other"></span></div>
          </div>
        </div>
      </div>
      <div class="ny-form-affirmation-box">
        <p class="ny-form-affirmation-heading">AFFIRMATION</p>
        <p class="ny-form-affirmation-text">
          I, <span class="ny-form-ul ny-form-ul-affiant">${affiantName}</span>, am the licensee or sublicensee of the named broker in Section 1 of this affirmation and I hereby affirm under penalties of perjury that all of the information contained herein is true to the best of my knowledge and belief.
        </p>
        <div class="ny-form-affirmation-sig-row">
          <div class="ny-form-sig-left">
            <span class="ny-form-label">Signature of Affiant</span>
            <span class="ny-form-ul ny-form-ul-sig"></span>
          </div>
          <div class="ny-form-sig-right">
            <span class="ny-form-label">Date</span>
            <span class="ny-form-ul ny-form-ul-date"></span>
          </div>
        </div>
      </div>
      <div class="ny-form-footer">
        <span class="ny-form-footer-left">NYSID Form 41C - W (Ed. January 2023)</span>
        <span class="ny-form-footer-right">Page 2 of 2</span>
      </div>
    </div>
  `;
  return paFormPageWrapper(data, 'New York Part C – Affidavit by Producing Broker (Page 2)', body);
}

/**
 * New York Notice of Excess Line Placement - Page 3
 * Cost breakdown and signature form
 */
function generateNewYorkFormPage3(data: ApplicationPacketData): string {
  const insuredName = data.companyName || '';
  const producerName = data.agentName || '';

  const body = `
    <div class="ny-form-doc ny-form-page3" style="page-break-inside: avoid;">
      <div class="ny-form-notice-box"></div>
      <h1 class="ny-form-notice-title">NOTICE OF EXCESS LINE PLACEMENT</h1>
      <div class="ny-form-notice-date">Date: <span class="ny-form-ul ny-form-ul-date"></span></div>
      
      <p class="ny-form-notice-text">
        Consistent with the requirements of the New York Insurance Law and Regulation 41 
        <span class="ny-form-ul ny-form-ul-insured">${insuredName}</span> is hereby advised that all or a portion of the required coverages have been 
        placed by <span class="ny-form-ul ny-form-ul-producer">${producerName}</span> with insurers not authorized to do an insurance business in 
        New York and which are not subject to supervision by this State. Placements with unauthorized insurers can 
        only be made under one of the following circumstances:
      </p>
      
      <div class="ny-form-notice-list">
        <p class="ny-form-notice-list-item">
          <strong>a)</strong> A diligent effort was first made to place the required insurance with companies authorized in New 
          York to write coverages of the kind requested; or
        </p>
        <p class="ny-form-notice-list-item">
          <strong>b)</strong> NO diligent effort was required because i) the coverage qualifies as an "Export List" risk, or ii) the 
          insured qualifies as an "Exempt Commercial Purchaser."
        </p>
      </div>
      
      <p class="ny-form-notice-text">
        Policies issued by such unauthorized insurers may not be subject to all of the regulations of the 
        Superintendent of Financial Services pertaining to policy forms. In the event of insolvency of the 
        unauthorized insurers, losses will not be covered by any New York State security fund.
      </p>
      
      <h2 class="ny-form-cost-title">TOTAL COST FORM (NON TAX ALLOCATED PREMIUM TRANSACTION)</h2>
      
      <p class="ny-form-cost-text">
        In consideration of your placing my insurance as described in the policy referenced below, I agree to pay the 
        total cost below which includes all premiums, inspection charges<sup>(1)</sup> and a service fee that includes taxes, 
        stamping fees, and (if indicated) a fee<sup>(1)</sup> for compensation in addition to commissions received, and other 
        expenses<sup>(1)</sup>.
      </p>
      
      <p class="ny-form-cost-text">
        I further understand and agree that all fees, inspection charges and other expenses denoted by<sup>(1)</sup> are fully 
        earned from the inception date of the policy and are non-refundable regardless of whether said policy is 
        cancelled. Any policy changes which generate additional premium are subject to additional tax and stamping 
        fee charges.
      </p>
      
      <div class="ny-form-cost-table">
        <div class="ny-form-cost-row ny-form-cost-header">
          <div class="ny-form-cost-col-left">Re: Policy No.</div>
          <div class="ny-form-cost-col-right">Insurer</div>
        </div>
        
        <div class="ny-form-cost-row">
          <div class="ny-form-cost-col-full"><strong>Policy Premium</strong></div>
          <div class="ny-form-cost-col-amount">$</div>
        </div>
        
        <div class="ny-form-cost-section">
          <div class="ny-form-cost-row">
            <div class="ny-form-cost-col-full"><strong><u>Insurer Imposed Charges:</u></strong></div>
          </div>
          <div class="ny-form-cost-row">
            <div class="ny-form-cost-col-left">Policy Fees<sup>(1)</sup></div>
            <div class="ny-form-cost-col-amount">$</div>
          </div>
          <div class="ny-form-cost-row">
            <div class="ny-form-cost-col-left">Inspection Fees<sup>(1)</sup></div>
            <div class="ny-form-cost-col-amount">$__________________</div>
          </div>
          <div class="ny-form-cost-row">
            <div class="ny-form-cost-col-full"><strong>Total Taxable Charges</strong></div>
            <div class="ny-form-cost-col-amount">$</div>
          </div>
        </div>
        
        <div class="ny-form-cost-section">
          <div class="ny-form-cost-row">
            <div class="ny-form-cost-col-full"><strong><u>Service Fee Charges:</u></strong></div>
          </div>
          <div class="ny-form-cost-row">
            <div class="ny-form-cost-col-left">Excess Line Tax (3.60%)</div>
            <div class="ny-form-cost-col-amount">$</div>
          </div>
          <div class="ny-form-cost-row">
            <div class="ny-form-cost-col-left">Stamping Fee</div>
            <div class="ny-form-cost-col-amount">$</div>
          </div>
          <div class="ny-form-cost-row">
            <div class="ny-form-cost-col-left">Broker Fee<sup>(1)</sup></div>
            <div class="ny-form-cost-col-amount">$</div>
          </div>
          <div class="ny-form-cost-row">
            <div class="ny-form-cost-col-left">Inspection Fee<sup>(1)</sup></div>
            <div class="ny-form-cost-col-amount">$</div>
          </div>
          <div class="ny-form-cost-row">
            <div class="ny-form-cost-col-left">Other Expenses (specify)<sup>(1)</sup> _____________________________</div>
            <div class="ny-form-cost-col-amount">$ ___________________</div>
          </div>
          <div class="ny-form-cost-row ny-form-cost-total">
            <div class="ny-form-cost-col-left"><strong>Total Policy Cost</strong></div>
            <div class="ny-form-cost-col-amount"><strong>$ ___________________</strong></div>
          </div>
        </div>
      </div>
      
      <div class="ny-form-page3-footer" style="page-break-inside: avoid;">
        <div class="ny-form-signature-section">
          <div class="ny-form-signature-line">_____________________________________</div>
          <div class="ny-form-signature-label">(Signature of Insured)</div>
        </div>
        <p class="ny-form-footnote"><sup>(1)</sup> = Fully earned</p>
      </div>
    </div>
  `;
  return paFormPageWrapper(data, 'New York Notice of Excess Line Placement (Page 3)', body);
}

/**
 * Generate State-Specific Forms section (included only for approved quotes).
 * Uses submission state (applicantState). Each state has different forms; content can be extended per state.
 */
function generateStateFormsPage(data: ApplicationPacketData): string {
  const stateCode = toStateCode(data.applicantState || '');
  const stateName = stateCode ? (STATE_DISPLAY_NAMES[stateCode] || data.applicantState || stateCode) : 'Applicant State';

  return `
    <div class="page state-forms-isc pa-form-no-sidebar" style="page-break-after: always;">
      <div class="pa-form-content-full state-forms-content">
        <div class="section-title-uppercase-page">State-Specific Forms – ${stateName}</div>
        <p class="state-forms-intro">This section contains the state-required forms for <strong>${stateName}</strong> (${stateCode || 'N/A'}) as applicable to this application.</p>
        <div class="state-forms-placeholder">
          <p><strong>Application ID:</strong> ${data.applicationId}</p>
          <p><strong>Applicant:</strong> ${data.companyName}</p>
          <p><strong>State of operation:</strong> ${stateName}</p>
          <p class="state-forms-note">State-specific form content for ${stateName} will appear here. Forms vary by state.</p>
        </div>
        <div class="pa-form-page-number">State Forms – ${stateName}</div>
      </div>
    </div>
  `;
}

/**
 * Map form submission data to ApplicationPacketData format
 */
/**
 * Helper function to load SLTX logo PNG (for Texas form)
 * Place the file at: public/logos/sltx-logo.png
 */
export async function loadSltxLogo(): Promise<string | undefined> {
  try {
    const fs = await import('fs');
    const path = await import('path');
    const logosDir = path.join(process.cwd(), 'public', 'logos');
    const possibleNames = ['sltx-logo.png', 'sltx.png', 'sltx.logo.png'];
    for (const name of possibleNames) {
      const logoPath = path.join(logosDir, name);
      if (fs.existsSync(logoPath)) {
        const buffer = fs.readFileSync(logoPath);
        return `data:image/png;base64,${buffer.toString('base64')}`;
      }
    }
  } catch (error) {
    console.warn('Could not load SLTX logo:', error);
  }
  return undefined;
}

/**
 * Helper function to load Capital & Co logo SVG
 */
export async function loadCapitalCoLogo(): Promise<string | undefined> {
  try {
    const fs = await import('fs');
    const path = await import('path');
    const logoPath = path.join(process.cwd(), 'public', 'logos', 'capital-co-logo.svg');

    if (fs.existsSync(logoPath)) {
      const logoSVG = fs.readFileSync(logoPath, 'utf-8');
      return logoSVG;
    }
  } catch (error) {
    console.warn('Could not load Capital & Co logo:', error);
  }
  return undefined;
}

export function mapFormDataToPacketData(
  formData: any,
  submissionId: string,
  agency: any,
  quote?: any,
  submission?: any,
  capitalCoLogoSVG?: string,
  excludePages8910?: boolean
): ApplicationPacketData {
  // Extract class code and description
  const classCodeWork = formData.classCodeWork || {};
  const classCodes = Object.keys(classCodeWork);
  const firstClassCode = classCodes[0] || '';
  const classCodeDescription = formData.carrierApprovedDescription || firstClassCode;

  // Calculate field employees
  const activeOwners = formData.activeOwnersInField || 0;
  const fieldEmployees = formData.fieldEmployees || 0;
  const numberOfFieldEmployees = activeOwners > 0
    ? `Owner + ${fieldEmployees}`
    : `${fieldEmployees}`;

  // Format dates
  const formDate = formData.effectiveDate
    ? new Date(formData.effectiveDate).toLocaleDateString()
    : new Date().toLocaleDateString();

  const coverageDates = formData.effectiveDate && formData.expirationDate
    ? `${new Date(formData.effectiveDate).toLocaleDateString()} - ${new Date(formData.expirationDate).toLocaleDateString()}`
    : formData.effectiveDate
      ? `${new Date(formData.effectiveDate).toLocaleDateString()} - ${new Date(new Date(formData.effectiveDate).setFullYear(new Date(formData.effectiveDate).getFullYear() + 1)).toLocaleDateString()}`
      : '';

  // Format states of operation
  const statesOfOperation = Array.isArray(formData.statesOfOperation)
    ? formData.statesOfOperation.join(', ')
    : (formData.statesOfOperation || formData.state || '');

  // Format address
  const applicantAddress = formData.streetAddress
    ? `${formData.streetAddress}${formData.aptSuite ? ', ' + formData.aptSuite : ''}`
    : '';

  // Format agency address
  const agencyAddress = agency?.address?.street || '';
  const agencyCity = agency?.address?.city || '';
  const agencyState = agency?.address?.state || '';
  const agencyZip = agency?.address?.zip || '';

  // endorsements
  const endorsements: string[] = [];

  if (formData.blanketAdditionalInsured) {
    endorsements.push("Blanket Additional Insured");
  }

  if (formData.blanketWaiverOfSubrogation) {
    endorsements.push("Blanket Waiver of Subrogation");
  }

  if (formData.blanketPrimaryWording) {
    endorsements.push("Blanket Primary Wording");
  }

  if (formData.blanketPerProjectAggregate) {
    endorsements.push("Blanket Per Project Aggregate");
  }

  if (formData.blanketCompletedOperations) {
    endorsements.push("Blanket Completed Operations");
  }

  if (formData.noticeOfCancellationThirdParties) {
    endorsements.push("Notice of Cancellation to Third Parties");
  }


  // Get applicant state safely
  // const applicantState = formData.state?.toString().trim() || "";

  // Normalize quote status safely
  const quoteStatus = quote?.status?.toString().trim().toUpperCase() || "";

  // Check if approved
  // const isApproved = quoteStatus === "APPROVED";

  // Final condition for including state forms
  // const includeStateForms = applicantState !== "" && isApproved;

  // console.log("Applicant State:", applicantState);
  console.log("Quote Status:", quoteStatus);
  // console.log("Include State Forms:", includeStateForms);


  return {
    // Application Metadata
    applicationId: formData.applicationId || submissionId.substring(0, 7) || '0000000',
    submissionId: submissionId,
    formDate: formDate,
    // Agency Information
    agencyName: agency?.name || 'Gamaty Insurance Agency LLC DBA Capital & Co Insurance Services',
    agentName: formData.agentName,
    agencyAddress: agencyAddress,
    agencyCity: agencyCity,
    agencyState: agencyState,
    agencyZip: agencyZip,
    agencyPhone: agency?.phone || '(310) 284-2136',
    agencyEmail: agency?.email || 'eidan@capcoinsurance.com',

    // Applicant/Insured Information
    companyName: formData.companyName || formData.business_name || '',
    dba: formData.dba,
    contactPerson: `${formData.firstName || ''} ${formData.lastName || ''}`.trim() || formData.contactPerson || '',
    applicantAddress: applicantAddress,
    applicantCity: formData.city || '',
    applicantState: (formData.state || formData.addressState || '').trim(),

    // exclude pages
    excludePages8910: !!excludePages8910,

    // applicantState: applicantState,


    applicantZip: (formData.zipCode || formData.zip || '').trim(),
    applicantPhone: formData.phone || '',
    applicantEmail: formData.email || '',
    fein: formData.companyFEIN || formData.EIN || 'N/A',
    entityType: formData.entityType || '',
    yearsInBusiness: formData.yearsInBusiness || 0,
    yearsExperienceInTrades: formData.yearsExperienceInTrades || 0,
    statesOfOperation: statesOfOperation,
    workIn5Boroughs: formData.workIn5Boroughs || false,
    otherBusinessNames: formData.otherBusinessNames || 'No',
    paymentOption: formData.paymentOption || '3rd Party Finance',

    // Loss History
    generalLiabilityLosses: Array.isArray(formData.generalLiabilityLosses)
      ? formData.generalLiabilityLosses
      : [],

    // Quote Information
    quoteType: quote?.type || 'General Liability',
    carrierName: quote?.carrierName || 'Richmond National Insurance',
    coverageType: quote?.coverageType || 'Manuscript Occurrence',
    desiredCoverageDates: coverageDates,

    // Include state forms when we have an applicant state (show in packet for new submissions and when quote approved)
    includeStateForms: !!((formData.state || formData.addressState || '').trim()) &&
      !!(quote?.status && ['APPROVED'].includes(quote.status)),

    // includeStateForms: includeStateForms,


    // General Liability Coverages
    aggregateLimit: formData.generalLiabilityLimit || '$1,000,000',
    occurrenceLimit: formData.generalLiabilityLimit || '$1,000,000',
    productsCompletedOpsLimit: formData.generalLiabilityLimit || '$1,000,000',
    personalAdvertisingInjuryLimit: formData.generalLiabilityLimit || '$1,000,000',
    fireLegalLimit: formData.fireLegalLimit || '$50,000',
    medPayLimit: formData.medicalExpenseLimit || '$5,000',
    selfInsuredRetention: formData.deductible || '$2,500',

    // Class Code & Gross Receipts
    classCode: classCodeDescription || firstClassCode,
    grossReceipts: formData.estimatedGrossReceipts ? `$${parseInt(formData.estimatedGrossReceipts).toLocaleString()}` : '$0',

    // Current Exposures
    estimatedTotalGrossReceipts: formData.estimatedGrossReceipts ? `$${parseInt(formData.estimatedGrossReceipts).toLocaleString()}` : '$0',
    estimatedSubContractingCosts: formData.estimatedSubcontractingCosts ? `$${parseInt(formData.estimatedSubcontractingCosts).toLocaleString()}` : '$0',
    estimatedMaterialCosts: formData.estimatedMaterialCosts ? `$${parseInt(formData.estimatedMaterialCosts).toLocaleString()}` : '$0',
    estimatedTotalPayroll: formData.totalPayrollAmount || '0',
    numberOfFieldEmployees: numberOfFieldEmployees,

    // Work Performed
    workDescription: formData.carrierApprovedDescription || '',
    percentageResidential: formData.residentialPercent || 0,
    percentageCommercial: formData.commercialPercent || 0,
    percentageNewConstruction: formData.newConstructionPercent || 0,
    percentageRemodel: formData.remodelPercent || 0,
    maxInteriorStories: formData.maxInteriorStories || 0,
    maxExteriorStories: formData.maxExteriorStories || 0,
    maxExteriorDepthBelowGrade: formData.maxExteriorDepthBelowGrade || 0,
    performOCIPWork: formData.performOCIPWork || false,
    ocipReceipts: formData.ocipReceipts,
    nonOCIPReceipts: formData.nonOCIPReceipts,
    lossesInLast5Years: formData.lossesInLast5Years || 0,

    // Work Experience Questions
    performHazardousWork: formData.performHazardousWork,
    hazardousWorkExplanation: formData.hazardousWorkExplanation,
    performMedicalFacilitiesWork: formData.performMedicalFacilities,
    medicalFacilitiesExplanation: formData.medicalFacilitiesExplanation,
    performStructuralWork: formData.performStructuralWork || false,
    performTractHomeWork: formData.workNewTractHomes,
    tractHomeExplanation: formData.tractHomeExplanation,
    workCondoConstruction: formData.workCondoConstruction,
    performCondoRepairOnly: formData.performCondoStructuralRepair,
    performRoofingOps: formData.performRoofingOps,
    roofingExplanation: formData.roofingExplanation,
    performWaterproofing: formData.performWaterproofing,
    waterproofingExplanation: formData.waterproofingExplanation,
    useHeavyEquipment: formData.useHeavyEquipment,
    heavyEquipmentExplanation: formData.heavyEquipmentExplanation,
    workOver5000SqFt: formData.workOver5000SqFt,
    workOver5000SqFtPercent: formData.workOver5000SqFtPercent,
    workOver5000SqFtExplanation: formData.workOver5000SqFtExplanation,
    workCommercialOver20000SqFt: formData.workCommercialOver20000SqFt,
    commercialOver20000SqFtPercent: formData.commercialOver20000SqFtPercent,
    commercialOver20000SqFtExplanation: formData.commercialOver20000SqFtExplanation,
    licensingActionTaken: formData.licensingActionTaken,
    licensingActionExplanation: formData.licensingActionExplanation,
    allowedLicenseUseByOthers: formData.allowedLicenseUseByOthers,
    allowedLicenseUseByOthersExplanation: formData.allowedLicenseUseByOthersExplanation,
    judgementsOrLiens: formData.judgementsOrLiens,
    judgementsExplanation: formData.judgementsExplanation,
    lawsuitsOrClaims: formData.lawsuitsOrClaims,
    lawsuitsExplanation: formData.lawsuitsExplanation,
    knownIncidentsOrClaims: formData.knownIncidentsOrClaims,
    potentialClaimsExplanation: formData.potentialClaimsExplanation,

    // Written Contract Questions
    writtenContractForAllWork: formData.writtenContractForAllWork,
    contractHasStartDate: formData.contractHasStartDate,
    contractStartDateExplanation: formData.contractStartDateExplanation,
    contractHasScopeOfWork: formData.contractHasScopeOfWork,
    contractScopeExplanation: formData.contractScopeExplanation,
    contractIdentifiesSubcontractedTrades: formData.contractIdentifiesSubcontractedTrades,
    contractSubcontractedTradesExplanation: formData.contractSubcontractedTradesExplanation,
    contractHasSetPrice: formData.contractHasSetPrice,
    contractSetPriceExplanation: formData.contractSetPriceExplanation,
    contractSignedByAllParties: formData.contractSignedByAllParties,
    contractSignedExplanation: formData.contractSignedExplanation,
    agreementHasHoldHarmless: formData.agreementHasHoldHarmless,
    holdHarmlessExplanation: formData.holdHarmlessExplanation,
    doSubcontractWork: formData.useSubcontractors,

    alwaysCollectCertificatesFromSubs: formData.collectSubCertificates,
    collectCertificatesExplanation: formData.collectSubCertificatesExplanation,

    requireSubsEqualInsuranceLimits: formData.requireSubInsuranceEqual,
    subsEqualLimitsExplanation: formData.requireSubInsuranceEqualExplanation,

    requireSubsNameAsAdditionalInsured: formData.requireAdditionalInsured,
    subsAdditionalInsuredExplanation: formData.requireAdditionalInsuredExplanation,

    haveStandardFormalAgreementWithSubs: formData.haveWrittenSubContracts,
    standardAgreementExplanation: formData.haveWrittenSubContractsExplanation,

    requireSubsWorkersComp: formData.requireWorkersComp,
    subsWorkersCompExplanation: formData.requireWorkersCompExplanation,

    // Policy Endorsements (flags)
    blanketAdditionalInsured: formData.blanketAdditionalInsured ?? false,
    blanketWaiverOfSubrogation: formData.blanketWaiverOfSubrogation ?? false,
    blanketPrimaryWording: formData.blanketPrimaryWording ?? false,
    blanketPerProjectAggregate: formData.blanketPerProjectAggregate ?? false,
    blanketCompletedOperations: formData.blanketCompletedOperations ?? false,
    noticeOfCancellationThirdParties: formData.noticeOfCancellationThirdParties ?? false,

    // Policy Endorsements (rendered text)
    policyEndorsements: endorsements.length
      ? endorsements.join(", ")
      : "None",


    // Application Agreement - Signatures
    applicantSignature: formData.applicantSignature,
    applicantSignatureDate: formData.applicantSignatureDate || formDate,
    applicantTitle: formData.applicantTitle,
    producerSignature: formData.producerSignature,
    producerSignatureDate: formData.producerSignatureDate || formDate,

    // Page 9: Disclosure of Premium
    terrorismCoveragePremium: formData.terrorismCoveragePremium || '$126.66',
    rejectionStatementSignature: formData.rejectionStatementSignature,
    rejectionStatementDate: formData.rejectionStatementDate,
    rejectionStatementPrintedName: formData.rejectionStatementPrintedName,

    // Page 10: Surplus Lines Compliance
    policyNumber: formData.policyNumber || quote?.policyNumber,
    surplusLinesSignature: formData.surplusLinesSignature,
    surplusLinesDate: formData.surplusLinesDate || formDate,

    // Page 11: Loss Warranty Letter
    lossWarrantyCompanySignature: formData.lossWarrantyCompanySignature,
    lossWarrantyDate: formData.lossWarrantyDate || formDate,
    lossWarrantySignature: formData.lossWarrantySignature,
    lossWarrantyTitle: formData.lossWarrantyTitle || formData.applicantTitle,


    //  programName: formData.programName || submission?.programName || 'Standard GL A-Rated',
    // premium: formData.premium || (quote?.carrierQuoteUSD ? `$${parseFloat(quote.carrierQuoteUSD.toString()).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$0.00'),
    // stateTax: formData.stateTax || (quote?.premiumTaxAmountUSD ? `$${parseFloat(quote.premiumTaxAmountUSD.toString()).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$0.00'),
    // associationDues: formData.associationDues || (quote?.carrierFeesUSD ? `$${parseFloat(quote.carrierFeesUSD.toString()).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$0.00'),
    // policyFee: formData.policyFee || (quote?.sterlingFeesUSD ? `$${parseFloat(quote.sterlingFeesUSD.toString()).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$0.00'),
    // inspectionFee: formData.inspectionFee || (quote?.stampingFeeAmountUSD ? `$${parseFloat(quote.stampingFeeAmountUSD.toString()).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$0.00'),
    // totalCostOfPolicy: formData.totalCostOfPolicy || (quote?.finalAmount ? `$${parseFloat(quote.finalAmount.toString()).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$0.00'),
    // depositPremium: formData.depositPremium || (quote?.depositPremium ? `$${parseFloat(quote.depositPremium.toString()).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$0.00'),
    // depositAssociationDues: formData.depositAssociationDues || (quote?.depositAssociationDues ? `$${parseFloat(quote.depositAssociationDues.toString()).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$0.00'),
    // depositStateTax: formData.depositStateTax || (quote?.depositStateTax ? `$${parseFloat(quote.depositStateTax.toString()).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$0.00'),
    // depositPolicyFee: formData.depositPolicyFee || (quote?.depositPolicyFee ? `$${parseFloat(quote.depositPolicyFee.toString()).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$0.00'),
    // depositInspectionFee: formData.depositInspectionFee || (quote?.depositInspectionFee ? `$${parseFloat(quote.depositInspectionFee.toString()).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$0.00'),
    // aiProcessingFee: formData.aiProcessingFee || '$0.00',
    // totalDeposit: formData.totalDeposit || (quote?.totalDeposit ? `$${parseFloat(quote.totalDeposit.toString()).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$0.00'),
    // totalToRetain: formData.totalToRetain || (quote?.totalToRetain ? `$${parseFloat(quote.totalToRetain.toString()).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$0.00'),
    // totalToBeSent: formData.totalToBeSent || (quote?.totalToBeSent ? `$${parseFloat(quote.totalToBeSent.toString()).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$0.00'),
    // invoiceProducerSignature: formData.invoiceProducerSignature || formData.producerSignature,
    // capitalCoLogoSVG: capitalCoLogoSVG,


    // Page 12: Invoice Statement
    programName: formData.programName || submission?.programName || 'Standard GL A-Rated',
    premium: formData.premium || formatUSD(quote?.carrierQuoteUSD),
    stateTax: formData.stateTax || formatUSD(quote?.premiumTaxAmountUSD),
    associationDues: formData.associationDues || formatUSD(quote?.carrierFeesUSD),
    policyFee: formatUSD(quote?.sterlingInsuranceServicesFeesUSD),
    inspectionFee: formatUSD(quote?.stampingFeeAmountUSD),
    fireMarshalTax: formatUSD(quote?.fireMarshalTaxAmountUSD),
    totalCostOfPolicy: formatUSD(quote?.finalAmountUSD),


    depositPremium: formatUSD(quote?.depositPremiumUSD),
    depositAssociationDues: formatUSD(quote?.depositCarrierFeesUSD),
    depositStateTax: formatUSD(quote?.depositTaxUSD),
    depositPolicyFee: formatUSD(quote?.depositStampingUSD),
    depositInspectionFee: formatUSD(quote?.depositSterlingFeesUSD),
    depositFireMarshal: formatUSD(quote?.depositFireMarshalUSD),
    totalDeposit: formatUSD(quote?.totalDepositUSD),

    totalToRetain: formatUSD(quote?.totalToRetainUSD),
    totalToBeSent: formData.totalToBeSent || (quote?.totalToBeSent ? `$${parseFloat(quote.totalToBeSent.toString()).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$0.00'),
    invoiceProducerSignature: formData.invoiceProducerSignature || formData.producerSignature,
    capitalCoLogoSVG: capitalCoLogoSVG,
  };
}


const cssContent = `
    /* ============================================
       PROFESSIONAL DESIGN SYSTEM - CSS VARIABLES
       ============================================ */
    :root {
      /* Brand Colors */
      --primary-color: #4A9EFF;
      --primary-dark: #3a7fd4;
      --primary-light: #6bb0ff;
      --secondary-color: #1f2937;
      --accent-color: #10b981;
      --warning-color: #f59e0b;
      --error-color: #ef4444;
      
      /* Text Colors */
      --text-primary: #1f2937;
      --text-secondary: #6b7280;
      --text-tertiary: #9ca3af;
      --text-inverse: #ffffff;
      --heading-color: #0f172a;
      --heading-dark: #000000;
      
      /* Background Colors */
      --bg-white: #ffffff;
      --bg-light: #f9fafb;
      --bg-medium: #f3f4f6;
      --bg-dark: #e5e7eb;
      
      /* Border Colors */
      --border-light: #e5e7eb;
      --border-medium: #d1d5db;
      --border-dark: #9ca3af;
      
      /* Spacing System */
      --spacing-xs: 0.1in;
      --spacing-sm: 0.15in;
      --spacing-md: 0.25in;
      --spacing-lg: 0.4in;
      --spacing-xl: 0.6in;
      
      /* Typography - Inter Font */
      --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
      --font-size-xs: 9pt;
      --font-size-sm: 10pt; /* Field labels: 13-14px ≈ 10-10.5pt */
      --font-size-base: 12pt; /* Input text: 16-18px ≈ 12-13.5pt */
      --font-size-lg: 13.5pt; /* Input text larger: 18px ≈ 13.5pt */
      --font-size-xl: 16.5pt; /* Section headers: 22-24px ≈ 16.5-18pt */
      --font-size-2xl: 18pt; /* Section headers larger: 24px ≈ 18pt */
      
      /* Shadows */
      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
      --shadow-md: 0 2px 4px rgba(0, 0, 0, 0.1);
      --shadow-lg: 0 4px 8px rgba(0, 0, 0, 0.15);
      --shadow-xl: 0 8px 16px rgba(0, 0, 0, 0.1);
      --shadow-premium: 0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    /* Ensure all text elements have explicit colors for CustomJS compatibility */
    /* Base fallback - will be overridden by more specific selectors */
    body, p, div, span, h1, h2, h3, h4, h5, h6, label, td, th, li {
      color: #1f2937;
    }
    
    /* Inter Font Face - Modern Fintech Style */
    @font-face {
      font-family: 'Arial';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: local('Inter Regular'), local('Inter-Regular');
    }
    
    @font-face {
      font-family: 'Arial';
      font-style: normal;
      font-weight: 500;
      font-display: swap;
      src: local('Inter Medium'), local('Inter-Medium');
    }
    
    @font-face {
      font-family: 'Arial';
      font-style: normal;
      font-weight: 600;
      font-display: swap;
      src: local('Inter SemiBold'), local('Inter-SemiBold');
    }
    
    body {
      font-family: 'Arial','Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', 'Helvetica', sans-serif;
      font-size: 12pt;
      font-weight: 400; /* Inter Regular */
      line-height: 1.6;
      color: #1f2937 !important; /* Explicit black/dark gray for CustomJS compatibility */
      background: #ffffff !important;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    /* Ensure base text elements inherit explicit color for CustomJS */
    p, div, span, h1, h2, h3, h4, h5, h6, label, td, th, li {
      color: #1f2937;
    }
    
    .page {
      width: 8.5in;
      height: 11in;            /* FIXED height */
      display: flex;
      position: relative;
      background: #fff;
      page-break-after: always;
      overflow: hidden;
    }
    .pa-form-page.page {
      max-height: none;
      overflow: visible;
    }
    
    .main-content {
      position: relative;
      z-index: 1;
    }
    
    .sidebar {
      width: 1.08in;
      background: linear-gradient(180deg, #f9fafb 0%, #ffffff 100%);
      padding: 0.4in 0.25in;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      border-right: 2px solid #e5e7eb;
      box-shadow: inset -2px 0 4px rgba(0, 0, 0, 0.02);
      z-index: 1;
    }
    
    .logo-container {
      margin-bottom: 0.25in;
    }
    
    .logo {
      width: 0.65in;
      height: 0.65in;
      background: linear-gradient(135deg, #4A9EFF 0%, #3a7fd4 100%);
      color: #ffffff;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 20pt;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
      border: 2px solid rgba(255, 255, 255, 0.3);
      position: relative;
    }
    
    .logo::after {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      right: 2px;
      height: 30%;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, transparent 100%);
      border-radius: 12px 12px 0 0;
      pointer-events: none;
    }
    
    .sidebar-title {
      writing-mode: vertical-rl;
      text-orientation: mixed;
      font-size: 15pt;
      font-weight: 700;
      color: #1f2937;
      margin: 0.4in 0;
      transform: rotate(180deg);
      letter-spacing: 1px;
    }
    
    .sidebar-title-vertical {
      writing-mode: vertical-rl;
      text-orientation: mixed;
      font-size: 17pt;
      font-weight: 700;
      color: #1f2937;
      margin: 0.4in 0;
      transform: rotate(180deg);
      letter-spacing: 1px;
    }
    
    .qr-container {
      position: absolute;
      bottom: 0.4in;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    
    .qr-code {
      background: #ffffff;
      padding: 0.1in;
      border-radius: 10px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
      border: 2px solid #e5e7eb;
      position: relative;
      overflow: hidden;
    }
    
    .qr-code::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(74, 158, 255, 0.03) 0%, transparent 100%);
      pointer-events: none;
    }
    
    .qr-code img {
      width: 0.85in;
      height: 0.85in;
      display: block;
    }
    
    .qr-code-text-only {
      width: 0.85in;
      height: 0.85in;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      border: 2px solid #4A9EFF;
      border-radius: 8px;
      font-size: var(--font-size-xs);
      font-weight: 700;
      color: #4A9EFF;
      text-align: center;
      padding: 0.05in;
      word-break: break-all;
      box-shadow: var(--shadow-sm);
    }
    
    .qr-text {
      font-size: 9pt;
      font-weight: 600;
      margin-top: 0.08in;
      color: #1f2937;
      letter-spacing: 0.5px;
    }
    
    .qr-page {
      font-size: 8pt;
      color: #6b7280;
      margin-top: 0.03in;
    }
    
    .applicant-icon {
      font-size: 20pt;
      margin-top: var(--spacing-xs);
      color: #4A9EFF;
      background: linear-gradient(135deg, rgba(74, 158, 255, 0.1) 0%, rgba(74, 158, 255, 0.05) 100%);
      width: 0.5in;
      height: 0.5in;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow-sm);
      border: 2px solid #4A9EFF;
    }
    
    .applicant-label {
      font-size: var(--font-size-xs);
      color: #6b7280;
      margin-top: var(--spacing-xs);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      padding: 0.03in 0.1in;
      background: #f9fafb;
      border-radius: 12px;
      border: 1px solid #e5e7eb;
    }
    
    .main-content {
      flex: 1;
      width: calc(8.5in - 1.08in);
      padding: 0.45in 0.4in 0.35in 0.4in;
    }
    
    .header-info {
      margin-bottom: var(--spacing-lg);
      padding: var(--spacing-md);
      padding-bottom: var(--spacing-md);
      border-bottom: 3px solid #4A9EFF;
      background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
      border-radius: 8px;
      box-shadow: var(--shadow-sm);
    }
    
    .broker-name {
      font-size: var(--font-size-lg);
      font-weight: 700;
      margin-bottom: var(--spacing-sm);
      color: #1f2937;
      letter-spacing: 0.5px;
      line-height: 1.5;
    }
    
    .applicant-name {
      font-size: var(--font-size-lg);
      font-weight: 700;
      margin-bottom: var(--spacing-xs);
      color: #1f2937;
      line-height: 1.5;
    }
    
    .application-id {
      font-size: var(--font-size-sm);
      color: #6b7280;
      font-weight: 600;
      letter-spacing: 0.3px;
    }
    
    .instructions {
      margin: var(--spacing-md) 0;
      font-size: var(--font-size-base);
      line-height: 1.8;
      color: #6b7280;
      padding: var(--spacing-md);
      background: linear-gradient(135deg, rgba(74, 158, 255, 0.05) 0%, transparent 100%);
      border-radius: 8px;
      border-left: 4px solid #4A9EFF;
      box-shadow: var(--shadow-sm);
    }
    
    .instructions p {
      margin-bottom: var(--spacing-sm);
      text-align: justify;
    }
    
    .instructions p:first-child::before {
      content: 'ℹ';
      display: inline-block;
      margin-right: var(--spacing-xs);
      color: #4A9EFF;
      font-weight: 700;
      font-size: 12pt;
    }
    
    .checklist {
      margin: 0.25in 0;
    }
    
    .checklist-item {
      font-size: var(--font-size-base);
      margin: var(--spacing-sm) 0;
      padding: var(--spacing-sm) var(--spacing-md);
      padding-left: var(--spacing-lg);
      line-height: 1.8;
      color: #1f2937;
      background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
      border-radius: 8px;
      border-left: 4px solid #4A9EFF;
      box-shadow: var(--shadow-sm);
      position: relative;
      font-weight: 500;
    }
    
    .checklist-item::before {
      content: '✓';
      position: absolute;
      left: var(--spacing-sm);
      top: 50%;
      transform: translateY(-50%);
      width: 0.2in;
      height: 0.2in;
      background: #4A9EFF;
      color: #ffffff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10pt;
      font-weight: 700;
      box-shadow: var(--shadow-sm);
    }
    
    .checklist-item:hover {
      background: linear-gradient(135deg, #f3f4f6 0%, #f9fafb 100%);
      transform: translateX(3px);
      box-shadow: var(--shadow-md);
    }
    
    .submission-instructions,
    .binding-instructions {
      margin: var(--spacing-md) 0;
      font-size: var(--font-size-sm);
      color: #6b7280;
      line-height: 1.8;
      padding: var(--spacing-sm) var(--spacing-md);
      background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
      border-left: 4px solid #4A9EFF;
      border-radius: 8px;
      box-shadow: var(--shadow-sm);
      border-top: 1px solid #e5e7eb;
      border-right: 1px solid #e5e7eb;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .submission-instructions strong,
    .binding-instructions strong {
      color: #1f2937;
      font-weight: 700;
    }
    
    /* ============================================
       PAGE 1 SPECIFIC STYLES - MATCHES ISC FORMAT
       ============================================ */
    .page1-specific .sidebar-page1 {
      background: #e5e7eb;
      width: 1.08in;
      min-height: 11in;
      padding: 0.35in 0.2in;
      border-right: 1px solid #d1d5db;
      box-shadow: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      min-height: 10.3in;
    }
    
    .page1-specific .logo-container.logo-page1 {
      flex-shrink: 0;
      margin-top: 0.3in;
      margin-bottom: auto;
    }
    
    .page1-specific .logo-sterling-page1 {
      width: 0.6in;
      height: 0.6in;
      background: linear-gradient(135deg, #1A1F2E 0%, #2A3240 50%, #1A1F2E 100%);
      border-radius: 8px;
      border: 1px solid rgba(0, 188, 212, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    
    .page1-specific .page1-title {
      font-size: 30pt;
      font-weight: 500;
      color: #252D3B;
      letter-spacing: 2px;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      white-space: nowrap;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(180deg);
      margin: 0;
    }
    
    .page1-specific .qr-container.qr-page1 {
      flex-shrink: 0;
      margin-top: auto;
      margin-bottom: 0.3in;
      position: absolute;
      bottom: 0.22in;
    }
    
    .page1-specific .qr-text-page1 {
      font-size: 9pt;
      margin-top: 0.06in;
      font-weight: 500;
    }
    
    .page1-specific .qr-page-text {
      font-size: 7pt;
      margin-top: 0.02in;
      color: #6b7280;
    }
    
    .page1-specific .producer-icon {
      width: 0.55in;
      height: 0.55in;
      margin-top: 0.12in;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f8f9fa;
      border: 1.5px solid #e0e0e0;
      border-radius: 6px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
      padding: 0.08in;
    }
    
    .page1-specific .producer-icon svg {
      width: 100%;
      height: 100%;
      display: block;
      filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.08));
    }
    
    .page1-specific .producer-label {
      font-size: 9pt;
      margin-top: 0.05in;
      color: #374151;
      font-weight: 500;
      text-transform: none;
      background: transparent;
      border: none;
      padding: 0;
      letter-spacing: 0.5px;
      border-radius: 0;
    }
    
    .page1-specific .main-content-page1 {
      padding: 0.5in 0.6in;
    }
    
    .page1-specific .header-info-page1 {
      margin-bottom: 0.3in;
      padding: 0;
      background: transparent;
      border: none;
      box-shadow: none;
    }
    
    .page1-specific .broker-name-page1,
    .page1-specific .applicant-name-page1,
    .page1-specific .application-id-page1 {
      font-size: 11pt;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.05in;
      line-height: 1.5;
      letter-spacing: 0;
    }
    
    .page1-specific .broker-name-page1 strong,
    .page1-specific .applicant-name-page1 strong,
    .page1-specific .application-id-page1 strong {
      font-weight: 400;
      color: #1f2937;
    }
    
    .page1-specific .instructions-page1 {
      font-size: 11pt;
      line-height: 1.6;
      color: #1f2937;
      margin: 0.50in 0;
      padding: 0;
      background: transparent;
      border: none;
      border-radius: 0;
      box-shadow: none;
    }
    
    .page1-specific .checklist-page1 {
      margin: 0.25in 0;
      padding-left:30px;
    }
    
    .page1-specific .checklist-item-page1 {
      font-size: 11pt;
      margin: 0.15in 0;
      padding: 0.08in 0;
      padding-left: 0.3in;
      line-height: 1.6;
      color: #1f2937;
      background: transparent;
      border: none;
      border-radius: 0;
      box-shadow: none;
      position: relative;
      font-weight: 400;
    }
    
    .page1-specific .checkbox-square {
      position: absolute;
      left: 0;
      top: 0.12in;
      width: 0.18in;
      height: 0.18in;
      border: 1.5px solid #1f2937;
      background: #ffffff;
      display: inline-block;
      border-radius: 2px;
    }
    
    .page1-specific .last-text .submission-instructions-page1,
    .page1-specific .last-text .binding-instructions-page1 {
      font-size: 11pt;
      line-height: 1.6;
      color: #1f2937;
      margin: 0.2in 0;
      padding: 0;
      background: transparent;
      border: none;
      border-radius: 0;
      box-shadow: none;
    }
    
    .page1-specific .page-number-page1 {
      position: absolute;
      bottom: 0.4in;
      right: 0.6in;
      font-size: 9pt;
      color: #6b7280;
      font-weight: 400;
    }

    .page1-specific .last-text {
      margin-top: 0.50in;
    }

    /* ============================================
       PAGE 2 SPECIFIC STYLES - ISC APPLICATION FORMAT
       ============================================ */
    .page2-isc .sidebar-page2 {
        background: #e5e7eb;
        width: 1.8in;
        padding: 0.25in 0.15in;
        border-right: 1px solid #d1d5db;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }

    .page2-isc .logo-capital-co-hands {
        width: 1.8in;
        height: 1.8in;
        background: transparent;
        border-radius: 0;
        margin-bottom: 0.25in;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: none;
        flex-shrink: 0;
        padding: 0;
    }

    .page2-isc .logo-capital-co-hands svg,
    .page2-isc .logo-capital-co-hands img {
        width: 100% !important;
        height: 100% !important;
        object-fit: contain;
    }

    .page2-isc .qr-container.qr-page2 {
        flex-shrink: 0;
        margin-top: auto;
        margin-bottom: 0.15in;
        position: relative;
        bottom: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        visibility: visible;
        opacity: 1;
    }

    .page2-isc .qr-container.qr-page2 .qr-code {
        display: block;
        visibility: visible;
        opacity: 1;
        margin-bottom: 0.05in;
    }

    .page2-isc .qr-container.qr-page2 .qr-code img {
        display: block;
        visibility: visible;
        opacity: 1;
        width: 0.7in !important;
        height: 0.7in !important;
    }

    .page2-isc .page2-title {
        font-size: 24pt;
        font-weight: 600;
        color: #374151;
        letter-spacing: 2px;
        writing-mode: vertical-rl;
        text-orientation: mixed;
        white-space: nowrap;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(180deg);
        margin: 0;
    }

    .page2-isc .qr-page2 {
        bottom: 0.3in;
    }

    .page2-isc .qr-text-page2 {
        font-size: 9pt;
        margin-top: 0.06in;
        font-weight: 500;
    }

    .page2-isc .qr-page-text-page2 {
        font-size: 7pt;
        margin-top: 0.02in;
        color: #6b7280;
    }

    .page2-isc .applicant-icon-page2 {
        width: 0.55in;
        height: 0.55in;
        margin-top: 0.12in;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f8f9fa;
        border: 1.5px solid #e0e0e0;
        border-radius: 6px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
        padding: 0.08in;
    }

    .page2-isc .applicant-icon-page2 svg {
        width: 100%;
        height: 100%;
        filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.08));
    }

    /* General applicant icon styling for all pages */
    .applicant-icon {
        width: 0.55in;
        height: 0.55in;
        margin-top: 0.12in;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f8f9fa;
        border: 1.5px solid #e0e0e0;
        border-radius: 6px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
        padding: 0.08in;
    }

    .applicant-icon svg {
        width: 100%;
        height: 100%;
        display: block;
        filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.08));
    }

    .page2-isc .applicant-label-page2 {
        font-size: 9pt;
        margin-top: 0.05in;
        color: #374151;
        font-weight: 500;
        text-transform: none;
        background: transparent;
        border: none;
        padding: 0;
    }

    .page2-isc .main-content-page2 {
        padding: 0.35in 0.45in 0.25in 0.45in;
        font-size: 9.5pt;
        line-height: 1.25;
        color: #1f2937;
        max-height: 11in;
        overflow: visible;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .page2-isc .header-top-page2 {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.2in;
        padding-bottom: 0.03in;
        flex-shrink: 0;
    }

    .page2-isc .agency-info-page2-left {
        font-size: 10pt;
        line-height: 1.5;
        color: #1f2937;
        text-align: left;
        flex: 1;
    }

    .page2-isc .logo-brand-page2 {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0;
        flex-shrink: 0;
    }

    .page2-isc .logo-icon-page2-hands {
        width: 2in;
        height: auto;
        background: transparent;
        border-radius: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: none;
        padding: 0;
    }

    .page2-isc .logo-icon-page2-hands svg,
    .page2-isc .logo-icon-page2-hands img {
        width: 100%;
        height: auto;
        object-fit: contain;
    }

    .page2-isc .agency-info-page2 {
        font-size: 10pt;
        line-height: 1.4;
        color: #1f2937;
        text-align: right;
    }

    .page2-isc .agency-name-page2 {
        font-weight: 600;
        margin-bottom: 2px;
    }

    .page2-isc .agency-contact-page2,
    .page2-isc .agency-address-page2,
    .page2-isc .agency-city-state-zip-page2,
    .page2-isc .agency-phone-page2,
    .page2-isc .agency-email-page2 {
        margin-bottom: 0.015in;
        font-size: 9.5pt;
    }

    .page2-isc .agency-info-page2-left .agency-name-page2,
    .page2-isc .agency-info-page2-left .agency-contact-page2,
    .page2-isc .agency-info-page2-left .agency-address-page2,
    .page2-isc .agency-info-page2-left .agency-city-state-zip-page2,
    .page2-isc .agency-info-page2-left .agency-phone-page2,
    .page2-isc .agency-info-page2-left .agency-email-page2 {
        margin-bottom: 0.015in;
    }

    .page2-isc .app-id-quote-parallel-page2 {
        display: grid;
        grid-template-columns: 1fr 1.5fr 1.5fr;
        column-gap: 0.35in;
        margin-top: 0.05in;
        align-items: flex-start;
        margin-bottom: 0.05in;
        gap: 0.2in;
        flex-shrink: 0;
    }

    .page2-isc .app-id-column-page2 {
        flex: 1;
    }

    .page2-isc .quote-column-page2 {
        flex: 1;
        text-align: right;
    }

    .page2-isc .application-id-large-page2 {
        margin: 0.15in 0 0.15in 0;
        font-size: 9.5pt;
        font-weight: 600;
        /* margin-bottom: 0.05in; */
        color: #1f2937;
        line-height: 1.25;
    }

    .page2-isc .date-section-page2 {
        font-size: 10.5pt;
        color: #1f2937;
        line-height: 1.25;
    }

    .page2-isc .insured-info-section-page2 {
        margin-bottom: 0.04in;
        padding-bottom: 0.02in;
        flex-shrink: 0;
    }

    .page2-isc .section-title-page2 {
        font-size: 11pt;
        font-weight: 600;
        margin-bottom: 0.08in;
        color: #1f2937;
        line-height: 1.2;
    }

    .page2-isc .insured-detail-page2 {
        font-size: 9.5pt;
        line-height: 1.2;
        margin-bottom: 0.01in;
        color: #1f2937;
    }

    .insured-detail-page2,
    .quote-detail-page2,
    .date-section-page2 {
        margin-bottom: 3px;
        font-size: 10pt;
    }

    .page2-isc .quote-detail-page2 {
        font-size: 9.5pt;
        line-height: 1.2;
        margin-bottom: 0.03in;
        color: #1f2937;
        text-align: left;
    }

    .page2-isc .quote-column-page2 .section-title-page2 {
        text-align: left;
    }

    .page2-isc .applicant-info-section-page2 {
        margin-bottom: 0.05in;
        flex-shrink: 0;
    }

    .applicant-info-section-page2,
    .coverages-section-page2 {
        margin-top: 0.18in;
    }

    .page2-isc .section-title-underline-page2 {
        font-size: 10pt;
        font-weight: 700;
        text-transform: uppercase;
        margin-bottom: 6px;
        padding-bottom: 2px;
        border-bottom: 2px solid #000;
        color: #0f172a;
        letter-spacing: 0.3px;
        line-height: 1.2;
        position: relative;
    }

    .page2-isc .section-title-underline-page2::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 0.3in;
        height: 2px;
        background: #a36c27;
    }

    .page2-isc .applicant-field-page2 {
        font-size: 10pt;
        line-height: 1.25;
        margin-bottom: 2px;
        color: #1f2937;
    }

    .page2-isc .coverages-section-page2 {
        margin-bottom: 0.04in;
        flex-shrink: 0;
    }

    .page2-isc .section-divider-page2 {
        width: 100%;
        height: 2px;
        background: #0f172a;
        margin-bottom: 0.06in;
        margin-top: 0.03in;
        flex-shrink: 0;
        position: relative;
    }

    .page2-isc .section-divider-page2::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0.3in;
        height: 2px;
        background: #4A9EFF;
    }

    .page2-isc .coverages-table-page2 {
        width: 100%;
        border-collapse: collapse;
        font-size: 10pt;
        margin-top: 0.03in;
    }

    .page2-isc .coverages-table-page2 td {
        padding: 1px 0;
        border-bottom: none;
        color: #1f2937;
        vertical-align: top;
        line-height: 1.2;
    }

    .page2-isc .coverages-table-page2 td:first-child {
        width: 70%;
        font-weight: 600;
    }

    .page2-isc .coverages-table-page2 td:last-child {
        width: 30%;
        text-align: right;
        font-weight: 600;
    }

    .page2-isc .class-code-gross-section-page2 {
        margin-top: 0.18in;
        border-top: 2px solid #000;
        padding-top: 6px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 0.35in;
    }

    .page2-isc .class-code-column-page2,
    .page2-isc .gross-receipts-column-page2 {
        flex: 1;
        visibility: visible;
        opacity: 1;
        display: flex;
        flex-direction: column;
    }

    .page2-isc .class-code-title-page2,
    .page2-isc .gross-receipts-title-page2 {
        font-size: 10.5pt;
        font-weight: 700;
        text-transform: uppercase;
        margin-bottom: 3px;
    }

    .page2-isc .class-code-divider-page2 {
        width: 1px;
        height: 1.1in;
        background: #1f2937;
        flex-shrink: 0;
        margin: 0 0.2in;
        align-self: flex-start;
        margin-top: 0.2in;
    }

    .page2-isc .class-code-value-page2,
    .page2-isc .gross-receipts-value-page2 {
        font-size: 10pt;
        font-weight: 600;
        background: none;
        border: none;
        padding: 0;
    }

    .page2-isc .page-number-page2 {
        position: absolute;
        bottom: 0.35in;
        right: 0.4in;
        font-size: 10pt;
        color: #6b7280;
        font-weight: 400;
    }

    .applicant-field-page2 strong {
        font-weight: 600;
    }

    /* Remove fancy divider */
    .section-divider-page2 {
        display: none;
    }

    /* Remove vertical divider */
    .class-code-divider-page2 {
        display: none;
    }
    
    /* ============================================
       PAGE 3 - ISC FORMAT: CURRENT EXPOSURES, WORK PERFORMED, WORK EXPERIENCE
       ============================================ */

    .page3-isc .main-content-page3 {
      padding: 0.4in 0.5in;
      font-size: 9.5pt;
      line-height: 1.2;
      width: 100%;
      max-width: 100%;
    }

    /* SECTION HEADERS */
    .page3-isc .section-title-uppercase-page3 {
      font-size: 10pt;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 6px;
      padding-bottom: 2px;
      border-bottom: 2px solid #000;
      color: #0f172a;
      letter-spacing: 0.3px;
      line-height: 1.2;
      position: relative;
    }

    .page3-isc .section-title-uppercase-page3::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 0.3in;
      height: 2px;
      background: #a36c27;
    }

    /* CURRENT EXPOSURES */
    .page3-isc .exposure-item-page3 {
      margin-bottom: 2px;
      font-weight: 400;
    }

    .page3-isc .exposure-item-page3 strong {
      font-weight: 600;
    }

    /* FOOTNOTE */
    .page3-isc .footnote-page3 {
      font-size: 8.5pt;
      margin-top: 4px;
      margin-bottom: 8px;
      color: #000;
      font-style: normal;
    }

    /* WORK PERFORMED */
    .page3-isc .work-description-page3,
    .page3-isc .percentage-item-page3,
    .page3-isc .detail-item-page3,
    .page3-isc .ocip-question-page3,
    .page3-isc .ocip-receipts-page3,
    .page3-isc .losses-page3 {
    margin-bottom: 2px;
    }

    .page3-isc .percentage-item-page3 strong,
    .page3-isc .detail-item-page3 strong,
    .page3-isc .work-description-page3 strong,
    .page3-isc .ocip-question-page3 strong,
    .page3-isc .ocip-receipts-page3 strong,
    .page3-isc .losses-page3 strong {
      font-weight: 600;
    }

    /* WORK EXPERIENCE */
    .page3-isc .question-item-page3 {
      font-weight: 400 !important;
      position: relative;
      margin-bottom: 14px;
      padding-right: 1.2in;
    }

    .page3-isc .question-text-page3 strong {
      font-weight: 400 !important;
      line-height: 1.2;
    }

    .page3-isc .yes-option,
    .page3-isc .no-option {
      font-weight: 400;
    }

    .page3-isc .selected {
      font-weight: 700;
      text-decoration: underline;
      text-decoration-thickness: 1.5px;
    }
    .page3-isc .question-text-page3 {
      font-weight: 400 !important;
      color: #000;
      margin-bottom: 2px;
    }

    /* YES / NO RIGHT SIDE */
    .page3-isc .yes-no-options-page3 {
      position: absolute;
      right: 0;
      top: 0;
      display: flex;
      gap: 0.3in;
      font-size: 9.5pt;
    }
    .page3-isc .yes-no-options-page3,
    .page3-isc .ocip-answer {
      position: absolute;
      right: 0;
      top: 0;
      display: flex;
      gap: 0.25in;  /* SAME gap as OCIP */
      font-size: 9pt;
    }

    .page3-isc .yes-no-options-page3 strong {
      font-weight: 400;
    }

    /* SELECTED OPTION */
    .page3-isc .yes-no-options-page3 .selected {
      font-weight: 700;
      text-decoration: underline;
      text-decoration-thickness: 1.5px;
    }

    /* Explanation */
    .page3-isc .explanation-field-page3 {
      font-size: 8.8pt;
      margin-top: 3px;
      margin-left: 0.15in;
      color: #000;
    }

    /* Remove extra spacing blocks */
    .page3-isc .work-percentages-page3,
    .page3-isc .structural-details-page3,
    .page3-isc .ocip-section-page3,
    .page3-isc .work-experience-questions-page3 {
      margin-bottom: 6px;
    }

    .page3-isc .question-item-page3,
    .page3-isc .ocip-question-page3 {
      position: relative;
      padding-right: 1.4in;
    }

    /* ============================================
       PAGE 4 - ISC FORMAT: WORK EXPERIENCE - CONT.
       ============================================ */
    .page4-isc .sidebar-page4 {
      background: #e5e7eb;
      width: 1.8in;
      padding: 0.35in 0.2in;
      border-right: 1px solid #d1d5db;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }
    
    .page4-isc .logo-capital-co-hands-page4 {
      width: 1.8in;
      height: 1.8in;
      background: transparent;
      border-radius: 0;
      margin-bottom: 0.25in;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: none;
      flex-shrink: 0;
      padding: 0;
    }
    
    .page4-isc .logo-capital-co-hands-page4 svg,
    .page4-isc .logo-capital-co-hands-page4 img {
      width: 100% !important;
      height: 100% !important;
      object-fit: contain;
    }
    
    .page4-isc .page4-title {
      font-size: 24pt;
      font-weight: 600;
      color: #374151;
      letter-spacing: 2px;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      white-space: nowrap;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(180deg);
      margin: 0;
    }
    
    .page4-isc .main-content-page4 {
      padding: 0.3in 0.4in;
      font-size: 10pt;
      line-height: 1.3;
      max-height: 10.5in;
      overflow: visible;
      display: flex;
      flex-direction: column;
      // width: 87.5%; /* Use 85-90% of page width */
      // max-width: 87.5%;
    }
    
    .page4-isc .section-title-uppercase-page {
      font-size: 10pt;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 6px;
      padding-bottom: 2px;
      border-bottom: 2px solid #000;
      color: #0f172a;
      letter-spacing: 0.3px;
      line-height: 1.2;
      width: 100%;
      position: relative;
    }
    
    .page4-isc .section-title-uppercase-page::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 0.3in;
      height: 2px;
      background: #a36c27;
    }
    
    .page4-isc .work-experience-questions-page4 {
      margin-top: 0.06in;
    }
    
    .page4-isc .question-item-page4 {
      margin-bottom: 0.18in;
      display: flex;
      flex-direction: column;
    }
    
    .page4-isc .question-text-page4 {
      font-size: 10pt;
      line-height: 1.3;
      color: #000000 !important;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .page4-isc .question-text-page4 span {
      color: #000000 !important;
      /* FORCE BLACK ON TEXT */
    }
    
    .page4-isc .yes-no-options-page4 {
      display: flex;
      gap: 0.35in;
      font-size: 10pt;
      font-weight: 400;
      color: #000000;
    }
    
    .page4-isc .yes-no-options-page4 .yes-option,
    .page4-isc .yes-no-options-page4 .no-option {
      font-weight: 400;
      color: #000000;
    }
    // .page4-isc .yes-no-options-page4 .selected {
    //   font-weight: 800;   /* MUCH BOLDER */
    //   color: #000000;
    // }
    
    .page4-isc .yes-no-options-page4 .yes-option.selected {
      background: transparent;
      border: none;
      color: #1f2937;
      font-weight: 800;
      text-decoration: underline;
      text-decoration-thickness: 2px;
    }
    
    .page4-isc .yes-no-options-page4 .no-option.selected {
      background: transparent;
      border: none;
      color: #1f2937;
      font-weight: 800;
      text-decoration: underline;
      text-decoration-thickness: 2px;
    }
    
    .page4-isc .explanation-field-page4 {
      font-size: 9.5pt;
      line-height: 1.25;
      margin-top: 0.05in;
      margin-left: 0.2in;
      color: #000000;
    }
    
    .page4-isc .percentage-field-page4 {
      font-size: 10pt;
      font-weight: 400;
      line-height: 1.25;
      margin-top: 0.08in;
      color: #000000;
    }
    
    .page4-isc .page-number-page4 {
      position: absolute;
      bottom: 0.35in;
      right: 0.35in;
      font-size: 10pt;
      color: #6b7280;
      font-weight: 400;
    }


    .loss-history-section {
      margin-top: 16px;
      font-size: 12px;
    }

    .loss-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 0.1in;
      font-size: 9.5pt;
    }

    .loss-table th,
    .loss-table td {
      border: 1px solid #000000;
      padding: 4px 6px;
    }

    .loss-table th {
      font-weight: 700;
      background: #ffffff;
    }
    
     
    
    /* ============================================
       PAGE 6 - ISC FORMAT: NOTICE & POLICY EXCLUSIONS
       ============================================ */
    .page6-isc .sidebar-page6 {
      background: #e5e7eb;
      width: 1.8in;
      padding: 0.35in 0.2in;
      border-right: 1px solid #d1d5db;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }
    
    .page6-isc .logo-capital-co-hands-page6 {
      width: 1.8in;
      height: 1.8in;
      background: transparent;
      border-radius: 0;
      margin-bottom: 0.25in;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: none;
      flex-shrink: 0;
      padding: 0;
    }
    
    .page6-isc .logo-capital-co-hands-page6 svg,
    .page6-isc .logo-capital-co-hands-page6 img {
      width: 100% !important;
      height: 100% !important;
      object-fit: contain;
    }
    
    .page6-isc .logo-isc-blue {
      width: 0.55in;
      height: 0.55in;
      background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
      border-radius: 8px;
      font-size: 16pt;
      margin-bottom: 0.25in;
    }
    
    .page6-isc .page6-title {
      font-size: 24pt;
      font-weight: 600;
      color: #374151;
      letter-spacing: 2px;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      white-space: nowrap;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(180deg);
      margin: 0;
    }
    
    .page6-isc .main-content-page6 {
      padding: 0.25in 0.35in;
      font-size: 9pt;
      line-height: 1.2;
      max-height: 10.5in;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    
    .page6-isc .section-title-uppercase-page6 {
      font-size: 10pt;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 6px;
      padding-bottom: 2px;
      border-bottom: 2px solid #000;
      color: #0f172a;
      letter-spacing: 0.3px;
      line-height: 1.2;
      width: 100%;
      position: relative;
    }
    }
    
    .page6-isc .section-title-uppercase-page6::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 0.3in;
      height: 2px;
      background: #a36c27 !important;
    }
    
    .page6-isc .notice-content-page6 {
      margin-bottom: 0.08in;
    }
    
    .page6-isc .notice-content-page6 p {
      font-size: 9pt;
      line-height: 1.2;
      margin-bottom: 0.05in;
      color: #1f2937;
    }
    
    .page6-isc .initial-line-page6 {
      font-size: 9pt;
      margin-top: 0.05in;
      margin-bottom: 0.08in;
      color: #1f2937;
    }
    
    .page6-isc .exclusions-content-page6 {
      margin-top: 0.06in;
    }
    
    .page6-isc .exclusions-content-page6 p {
      font-size: 8.5pt;
      line-height: 1.2;
      margin-bottom: 0.04in;
      color: #1f2937;
    }
    
    .page6-isc .page-number-page6 {
      position: absolute;
      bottom: 0.35in;
      right: 0.35in;
      font-size: 10pt;
      color: #6b7280;
      font-weight: 400;
    }
    
    /* ============================================
       PAGE 7 - ISC FORMAT: APPLICATION AGREEMENT
       ============================================ */
    .page7-isc .sidebar-page7 {
      background: #e5e7eb;
      width: 1.8in;
      padding: 0.35in 0.2in;
      border-right: 1px solid #d1d5db;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }
    
    .page7-isc .logo-capital-co-hands-page7 {
      width: 1.8in;
      height: 1.8in;
      background: transparent;
      border-radius: 0;
      margin-bottom: 0.25in;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: none;
      flex-shrink: 0;
      padding: 0;
    }
    
    .page7-isc .logo-capital-co-hands-page7 svg,
    .page7-isc .logo-capital-co-hands-page7 img {
      width: 100% !important;
      height: 100% !important;
      object-fit: contain;
    }
    
    .page7-isc .logo-isc-blue {
      width: 0.55in;
      height: 0.55in;
      background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
      border-radius: 8px;
      font-size: 16pt;
      margin-bottom: 0.25in;
    }
    
    .page7-isc .page7-title {
      font-size: 24pt;
      font-weight: 600;
      color: #374151;
      letter-spacing: 2px;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      white-space: nowrap;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(180deg);
      margin: 0;
    }
    
    .page7-isc .main-content-page7 {
      padding: 0.4in 0.5in;
      font-size: 9pt;
      line-height: 1;
      display: flex;
      flex-direction: column;
    }
    
    .page7-isc .section-title-uppercase-page7 {
      font-size: 10pt;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 0.04in;
      padding-bottom: 0.05in;
      border-bottom: 2px solid #000;
      letter-spacing: 0.5px;
    }
    
    .page7-isc .section-title-uppercase-page7::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 0.3in;
      height: 2px;
      background: #a36c27;
    }
    
    .page7-isc .agreement-content-page7 {
      margin-top: 0.04in;
      margin-bottom: 0.06in;
    }
    
    .page7-isc .agreement-content-page7 p {
      font-size: 8pt;
      font-weight: 400 !important;
      line-height: 1.2;
      margin-bottom: 0.04in;
      text-align: justify;
      color: #3b3a3a;
    }
    
    .page7-isc .initial-line-page7 {
      font-size: 9pt;
      margin-top: 0.15in;
      margin-bottom: 0.1in;
    }
    
    .page7-isc .signature-section-page7 {
      margin-top: 0.05in;
      gap: 0.03in;
    }
    
    .page7-isc .signature-field-page7 {
      margin-bottom: 0.05in;
    }
    
    .page7-isc .signature-label-page7 {
      font-size: 9pt;
      font-weight: 600;
      margin-bottom: 0.05in;
    }
    
    .page7-isc .signature-line-page7 {
      font-size: 9pt;
      border-bottom: 1px solid #000;
      min-height: 0.25in;
      margin-top: 0.12in;
    }
    
    .page7-isc .page-number-page7 {
      position: absolute;
      bottom: 0.35in;
      right: 0.35in;
      font-size: 10pt;
      color: #6b7280;
      font-weight: 400;
    }
    
    /* ============================================
       PAGE 8 - ISC FORMAT: TERRORISM COVERAGE DISCLOSURE NOTICE
       ============================================ */
    .page8-isc .sidebar-page8 {
      background: #e5e7eb;
      width: 1.8in;
      padding: 0.35in 0.2in;
      border-right: 1px solid #d1d5db;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }
    
    .page8-isc .logo-capital-co-hands-page8 {
      width: 1.8in;
      height: 1.8in;
      background: transparent;
      border-radius: 0;
      margin-bottom: 0.25in;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: none;
      flex-shrink: 0;
      padding: 0;
    }
    
    .page8-isc .logo-capital-co-hands-page8 svg,
    .page8-isc .logo-capital-co-hands-page8 img {
      width: 100% !important;
      height: 100% !important;
      object-fit: contain;
    }
    
    .page8-isc .logo-isc-blue {
      width: 0.55in;
      height: 0.55in;
      background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
      border-radius: 8px;
      font-size: 16pt;
      margin-bottom: 0.25in;
    }
    
    .page8-isc .page8-title {
      font-size: 24pt;
      font-weight: 600;
      color: #374151;
      letter-spacing: 2px;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      white-space: nowrap;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(180deg);
      margin: 0;
    }
    
    .page8-isc .main-content-page8 {
      padding: 0.25in 0.35in;
      font-size: 9pt;
      line-height: 1.2;
      max-height: 10.5in;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    
    .page8-isc .carrier-header-page8 {
      margin-bottom: 0.08in;
    }
    
    .page8-isc .carrier-name-large-page8 {
      font-size: 12pt;
      font-weight: 700;
      text-align: center;
      margin-bottom: 0.05in;
      color: #1f2937;
    }
    
    .page8-isc .endorsement-notice-page8 {
      font-size: 9pt;
      font-weight: 600;
      text-align: center;
      margin-bottom: 0.04in;
      color: #1f2937;
    }
    
    .page8-isc .carrier-name-medium-page8 {
      font-size: 11pt;
      font-weight: 700;
      text-align: center;
      margin-bottom: 0.03in;
      color: #1f2937;
    }
    
    .page8-isc .policy-type-page8 {
      font-size: 10pt;
      font-weight: 600;
      text-align: center;
      margin-bottom: 0.03in;
      color: #1f2937;
    }
    
    .page8-isc .document-title-page8 {
      font-size: 11pt;
      font-weight: 700;
      text-align: center;
      margin-bottom: 0.03in;
      color: #1f2937;
    }
    
    .page8-isc .section-title-bold-page8 {
      font-size: var(--font-size-xl); /* 22-24px ≈ 16.5-18pt */
      font-weight: 600; /* Inter SemiBold */
      margin-top: 0.03in;
      margin-bottom: 0.04in;
      color: #0f172a;
      text-decoration: underline;
      letter-spacing: 0.3px;
    }
    
    .page8-isc .terrorism-content-page8 {
      margin-bottom: 0.04in;
    }
    
    .page8-isc .terrorism-content-page8 p {
      font-size: 9pt;
      line-height: 1.2;
      margin-bottom: 0.03in;
      color: #1f2937;
    }
    
    .page8-isc .agreement-content-page8 {
      margin-bottom: 0.04in;
    }
    
    .page8-isc .agreement-content-page8 p {
      font-size: 9pt;
      line-height: 1.2;
      margin-bottom: 0.04in;
      color: #1f2937;
    }
    
    .page8-isc .signature-section-page8 {
      margin-top: 0.1in;
      display: flex;
      flex-direction: column;
      gap: 0.08in;
    }
    
    .page8-isc .signature-field-page8 {
      margin-bottom: 0.05in;
    }
    
    .page8-isc .signature-label-page8 {
      font-size: 9pt;
      font-weight: 600;
      margin-bottom: 0.02in;
      color: #1f2937;
    }
    
    .page8-isc .signature-line-page8 {
      font-size: 9pt;
      border-bottom: 1px solid #1f2937;
      min-height: 0.2in;
      color: #1f2937;
      margin-top: 0.12in;
      padding-bottom: 0.05in;
    }
    
    .page8-isc .page-number-page8 {
      position: absolute;
      bottom: 0.35in;
      right: 0.35in;
      font-size: 10pt;
      color: #6b7280;
      font-weight: 400;
    }
    
    /* ============================================
       PAGE 9 - ISC FORMAT: DISCLOSURE OF PREMIUM (TERRORISM)
       ============================================ */
    .page9-isc .sidebar-page9 {
      background: #e5e7eb;
      width: 1.8in;
      padding: 0.35in 0.2in;
      border-right: 1px solid #d1d5db;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }
    
    .page9-isc .logo-capital-co-hands-page9 {
      width: 1.8in;
      height: 1.8in;
      background: transparent;
      border-radius: 0;
      margin-bottom: 0.25in;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: none;
      flex-shrink: 0;
      padding: 0;
    }
    
    .page9-isc .logo-capital-co-hands-page9 svg,
    .page9-isc .logo-capital-co-hands-page9 img {
      width: 100% !important;
      height: 100% !important;
      object-fit: contain;
    }
    
    .page9-isc .logo-isc-blue {
      width: 0.55in;
      height: 0.55in;
      background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
      border-radius: 8px;
      font-size: 16pt;
      margin-bottom: 0.25in;
    }
    
    .page9-isc .page9-title {
      font-size: 24pt;
      font-weight: 600;
      color: #374151;
      letter-spacing: 2px;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      white-space: nowrap;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(180deg);
      margin: 0;
    }
    
    .page9-isc .main-content-page9 {
      padding: 0.25in 0.35in;
      font-size: 10pt;
      line-height: 1.3;
      max-height: 10.5in;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    
    .page9-isc .carrier-header-page9 {
      margin-bottom: 0.1in;
    }
    
    .page9-isc .carrier-name-large-page9 {
      font-size: 14pt;
      font-weight: 700;
      text-align: center;
      margin-bottom: 0.05in;
      color: #1f2937;
    }
    
    .page9-isc .carrier-divider-page9 {
      border-bottom: 1px solid #1f2937;
      margin-bottom: 0.1in;
    }
    
    .page9-isc .section-title-bold-page9 {
      font-size: var(--font-size-xl); /* 22-24px ≈ 16.5-18pt */
      font-weight: 600; /* Inter SemiBold */
      text-align: center;
      text-decoration: underline;
      margin-bottom: 0.08in;
      color: #0f172a;
      letter-spacing: 0.5px;
    }
    
    .page9-isc .rejection-title-page9 {
      margin-top: 0.15in;
    }
    
    .page9-isc .premium-disclosure-content-page9 p {
      font-size: 10pt;
      line-height: 1.3;
      margin-bottom: 0.05in;
      color: #1f2937;
    }
    
    .page9-isc .rejection-statement-box-page9 {
      border: 1px solid #1f2937;
      padding: 0.1in;
      margin-top: 0.08in;
      margin-bottom: 0.15in;
    }
    
    .page9-isc .rejection-statement-box-page9 p {
      font-size: 10pt;
      line-height: 1.3;
      color: #1f2937;
      margin: 0;
    }
    
    .page9-isc .signature-section-page9 {
      margin-top: 0.15in;
      display: flex;
      flex-direction: column;
      gap: 0.1in;
    }
    
    .page9-isc .signature-field-page9 {
      margin-bottom: 0.08in;
    }
    
    .page9-isc .signature-label-page9 {
      font-size: 10pt;
      font-weight: 600;
      margin-bottom: 0.03in;
      color: #1f2937;
    }
    
    .page9-isc .signature-line-page9 {
      font-size: 10pt;
      border-bottom: 1px solid #1f2937;
      min-height: 0.2in;
      color: #1f2937;
      margin-top: 0.2in;
    }
    
    .page9-isc .signature-line-extended-page9 {
      width: 3in;
    }
    
    .page9-isc .footer-code-page9 {
      position: absolute;
      bottom: 0.35in;
      left: 1.7in;
      font-size: 9pt;
      color: #6b7280;
      font-weight: 400;
    }
    
    .page9-isc .page-number-page9 {
      position: absolute;
      bottom: 0.35in;
      right: 0.35in;
      font-size: 10pt;
      color: #6b7280;
      font-weight: 400;
    }
    
    /* ============================================
       PAGE 10 - ISC FORMAT: SURPLUS LINES COMPLIANCE CERTIFICATION
       ============================================ */
    .page10-isc .main-content-page10 {
      padding: 0.5in 0.75in;
      font-size: 10pt;
      line-height: 1.3;
      max-height: 11in;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 100%;
    }
    
    .page10-isc .section-title-bold-page10 {
      font-size: var(--font-size-xl); /* 22-24px ≈ 16.5-18pt */
      font-weight: 600; /* Inter SemiBold */
      text-align: center;
      text-decoration: underline;
      margin-bottom: 0.15in;
      margin-top: 0.15in;
      color: #0f172a;
      letter-spacing: 0.5px;
    }
    
    .page10-isc .certification-content-page10 p {
      font-size: 10pt;
      line-height: 1.3;
      margin-bottom: 0.1in;
      color: #1f2937;
    }
    
    .page10-isc .signature-section-page10 {
      margin-top: 0.2in;
      display: flex;
      flex-direction: column;
      gap: 0.1in;
    }
    
    .page10-isc .signature-field-page10 {
      margin-bottom: 0.08in;
    }
    
    .page10-isc .signature-label-page10 {
      font-size: 10pt;
      font-weight: 600;
      margin-bottom: 0.03in;
      color: #1f2937;
    }
    
    .page10-isc .signature-line-page10 {
      font-size: 10pt;
      border-bottom: 1px solid #1f2937;
      min-height: 0.2in;
      color: #1f2937;
      margin-top: 0.2in;
    }
    
    .page10-isc .page-number-page10 {
      position: absolute;
      bottom: 0.35in;
      right: 0.35in;
      font-size: 10pt;
      color: #6b7280;
      font-weight: 400;
    }
    
    /* ============================================
       PAGE 11 - ISC FORMAT: LOSS WARRANTY LETTER
       ============================================ */
    .page11-isc .sidebar-page11 {
      background: #e5e7eb;
      width: 1.8in;
      padding: 0.35in 0.2in;
      border-right: 1px solid #d1d5db;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }
    
    .page11-isc .logo-capital-co-hands-page11 {
      width: 1.8in;
      height: 1.8in;
      background: transparent;
      border-radius: 0;
      margin-bottom: 0.25in;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: none;
      flex-shrink: 0;
      padding: 0;
    }
    
    .page11-isc .logo-capital-co-hands-page11 svg,
    .page11-isc .logo-capital-co-hands-page11 img {
      width: 100% !important;
      height: 100% !important;
      object-fit: contain;
    }
    
    .page11-isc .page11-title {
      font-size: 24pt;
      font-weight: 600;
      color: #374151;
      letter-spacing: 2px;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      white-space: nowrap;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(180deg);
      margin: 0;
    }
    
    .page11-isc .main-content-page11 {
      padding: 0.25in 0.35in;
      font-size: 10pt;
      line-height: 1.3;
      max-height: 10.5in;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    
    .page11-isc .header-section-page11 {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.15in;
      align-items: flex-start;
    }
    
    .page11-isc .header-left-page11,
    .page11-isc .header-right-page11 {
      flex: 1;
    }
    
    .page11-isc .header-right-page11 {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
    }
    
    .page11-isc .logo-capital-co-page11-right {
      width: 1.5in;
      height: 1.5in;
      background: transparent;
      border-radius: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: none;
      flex-shrink: 0;
      padding: 0;
      margin-bottom: 0.1in;
    }
    
    .page11-isc .logo-capital-co-page11-right svg,
    .page11-isc .logo-capital-co-page11-right img {
      width: 100% !important;
      height: 100% !important;
      object-fit: contain;
    }
    
    .page11-isc .applicant-name-large-page11 {
      font-size: 11pt;
      font-weight: 700;
      margin-bottom: 0.05in;
      color: #1f2937;
    }
    
    .page11-isc .applicant-address-page11,
    .page11-isc .applicant-city-state-zip-page11,
    .page11-isc .applicant-phone-page11,
    .page11-isc .applicant-email-page11,
    .page11-isc .quote-id-page11 {
      font-size: 9pt;
      line-height: 1.3;
      margin-bottom: 0.03in;
      color: #1f2937;
    }
    
    
    .page11-isc .warranty-content-page11 p {
      font-size: 10pt;
      line-height: 1.3;
      margin-bottom: 0.06in;
      color: #1f2937;
    }
    
    .page11-isc .warranty-list-page11 {
      margin-left: 0.25in;
      margin-top: 0.06in;
      margin-bottom: 0.1in;
      font-size: 10pt;
      line-height: 1.3;
      color: #1f2937;
    }
    
    .page11-isc .signature-section-page11 {
      margin-top: 0.15in;
      display: flex;
      flex-direction: column;
      gap: 0.1in;
    }
    
    .page11-isc .signature-field-page11 {
      margin-bottom: 0.08in;
    }
    
    .page11-isc .signature-label-page11 {
      font-size: 10pt;
      font-weight: 600;
      margin-bottom: 0.03in;
      color: #1f2937;
    }
    
    .page11-isc .signature-label-small-page11 {
      font-size: 9pt;
      color: #1f2937;
      display: inline-block;
      margin-right: 0.3in;
    }
    
    .page11-isc .signature-row-page11 {
      display: flex;
      gap: 0.3in;
      align-items: flex-end;
      margin-top: 0.05in;
    }
    
    .page11-isc .signature-line-page11 {
      font-size: 10pt;
      border-bottom: 1px solid #1f2937;
      min-height: 0.2in;
      color: #1f2937;
      width: 100%;
      margin-top: 0.2in;
    }
    
    .page11-isc .signature-line-date-page11 {
      width: 1.5in;
      margin-left: auto;
      flex: 0 0 1.5in;
    }
    
    .page11-isc .warranty-footer-page11 {
      margin-top: 0.15in;
      font-size: 9pt;
      line-height: 1.3;
    }
    
    .page11-isc .warranty-footer-page11 p {
      margin: 0;
      color: #1f2937;
    }
    
    .page11-isc .page-number-page11 {
      position: absolute;
      bottom: 0.35in;
      right: 0.35in;
      font-size: 10pt;
      color: #6b7280;
      font-weight: 400;
    }
    
    /* ============================================
       PAGE 12 - ISC FORMAT: INVOICE STATEMENT
       ============================================ */
    .page12-isc .sidebar-page12 {
      background: #e5e7eb;
      width: 1.8in;
      padding: 0.35in 0.2in;
      border-right: 1px solid #d1d5db;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }
    
    .page12-isc .logo-sterling-page12 {
      width: 0.6in;
      height: 0.6in;
      background: linear-gradient(135deg, #1A1F2E 0%, #2A3240 50%, #1A1F2E 100%);
      border-radius: 8px;
      border: 1px solid rgba(0, 188, 212, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      margin-bottom: 0.25in;
    }
    
    .page12-isc .logo-sterling-page12 svg {
      width: 100% !important;
      height: 100% !important;
    }
    
    .page12-isc .page12-title {
      font-size: 24pt;
      font-weight: 600;
      color: #374151;
      letter-spacing: 2px;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      white-space: nowrap;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(180deg);
      margin: 0;
    }
    
    .page12-isc .main-content-page12 {
      padding: 0.25in 0.35in;
      font-size: 10pt;
      line-height: 1.3;
      max-height: 10.5in;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    
    .page12-isc .invoice-header-page12 {
      margin-bottom: 0.15in;
    }
    
    .page12-isc .invoice-field-page12 {
      font-size: 10pt;
      line-height: 1.3;
      margin-bottom: 0.04in;
      color: #1f2937;
    }
    
    .page12-isc .invoice-section-page12 {
      margin-top: 0.12in;
      margin-bottom: 0.1in;
    }
    
    .page12-isc .invoice-section-title-page12 {
      font-size: 11pt;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 0.06in;
      color: #1f2937;
      border-bottom: 1.5px solid #1f2937;
      padding-bottom: 0.02in;
    }
    
    .page12-isc .invoice-row-page12 {
      display: flex;
      justify-content: space-between;
      padding: 0.03in 0;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .page12-isc .invoice-label-page12 {
      font-size: 10pt;
      color: #1f2937;
    }
    
    .page12-isc .invoice-value-page12 {
      font-size: 10pt;
      font-weight: 600;
      text-align: right;
      color: #1f2937;
    }
    
    .page12-isc .invoice-row-total-page12 {
      display: flex;
      justify-content: space-between;
      padding: 0.05in 0;
      margin-top: 0.05in;
      border-top: 2px solid #1f2937;
      border-bottom: 2px solid #1f2937;
    }
    
    .page12-isc .payment-option-page12 {
      font-size: 10pt;
      margin-top: 0.12in;
      margin-bottom: 0.1in;
      color: #1f2937;
    }
    
    .page12-isc .binding-statement-page12 {
      margin-top: 0.1in;
      font-size: 9pt;
    }
    
    .page12-isc .binding-statement-page12 p {
      margin-bottom: 0.05in;
      color: #1f2937;
    }
    
    .page12-isc .signature-field-page12 {
      margin-top: 0.05in;
    }
    
    .page12-isc .signature-label-page12 {
      font-size: 9pt;
      font-weight: 600;
      margin-bottom: 0.02in;
      color: #1f2937;
    }
    
    .page12-isc .signature-line-page12 {
      font-size: 9pt;
      border-bottom: 1px solid #1f2937;
      min-height: 0.2in;
      color: #1f2937;
    }
    
    .page12-isc .invoice-disclaimer-page12 {
      margin-top: 0.1in;
      font-size: 8pt;
      font-style: italic;
    }
    
    .page12-isc .invoice-disclaimer-page12 p {
      margin: 0;
      color: #6b7280;
    }
    
    .page12-isc .page-number-page12 {
      position: absolute;
      bottom: 0.35in;
      right: 0.35in;
      font-size: 10pt;
      color: #6b7280;
      font-weight: 400;
    }
    
    .state-forms-isc .main-content-page12.state-forms-content {
      padding: 0.25in 0.35in;
      font-size: 10pt;
      line-height: 1.35;
      color: #1f2937;
    }
    .state-forms-isc .state-forms-intro {
      margin-top: 0.1in;
      margin-bottom: 0.15in;
      color: #374151;
    }
    .state-forms-isc .state-forms-placeholder {
      margin-top: 0.15in;
      padding: 0.15in;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
    }
    .state-forms-isc .state-forms-placeholder p {
      margin: 0.08in 0;
      color: #1f2937;
    }
    .state-forms-isc .state-forms-note {
      margin-top: 0.12in;
      font-size: 9pt;
      color: #6b7280;
    }
    
    /* State forms: full width, no sidebar */
    .pa-form-no-sidebar {
      display: block !important;
      padding: 0;
    }
    .pa-form-no-sidebar .pa-form-content-full {
      width: 100%;
      box-sizing: border-box;
      padding: 0.5in 0.6in 0.55in 0.6in;
      min-height: 11in;
      position: relative;
      font-size: 10pt;
      line-height: 1.4;
      color: #000000;
    }
    .pa-form-no-sidebar .pa-form-page-number {
      position: absolute;
      bottom: 0.35in;
      right: 0.6in;
      font-size: 9pt;
      color: #4b5563;
    }
    .pa-form-no-sidebar .state-forms-content {
      padding: 0.5in 0.6in;
    }
    
    /* Pennsylvania 1609-PR form — clean, professional, easy to read */
    .pa-form-doc {
      font-family: Arial, Helvetica, sans-serif;
      color: #111827;
      line-height: 1.45;
      font-size: 9pt;
    }
    .pa-form-header-block {
      text-align: center;
      margin-bottom: 0.16in;
    }
    .pa-form-title {
      font-weight: 700;
      font-size: 11pt;
      letter-spacing: 0.03em;
      color: #111827;
    }
    .pa-form-meta {
      font-size: 8pt;
      margin-top: 0.05in;
      color: #4b5563;
    }
    .pa-form-rev { display: block; font-weight: 600; color: #374151; }
    .pa-form-note {
      font-size: 7pt;
      display: block;
      margin-top: 0.03in;
      color: #6b7280;
      font-style: italic;
    }
    
    .pa-form-two-boxes {
      display: flex;
      justify-content: space-between;
      align-items: stretch;
      margin-bottom: 0.16in;
      gap: 0.22in;
    }
    .pa-form-box {
      border: 1px solid #374151;
      padding: 0.11in 0.14in;
      font-size: 8pt;
      line-height: 1.4;
      background: #ffffff;
    }
    .pa-form-box-left { flex: 1; min-width: 0; }
    .pa-form-box-right {
      width: 2.1in;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
    .pa-form-box-title {
      font-weight: 700;
      margin-bottom: 0.05in;
      font-size: 8.5pt;
      color: #111827;
    }
    .pa-form-box-address {
      margin-bottom: 0.02in;
      color: #374151;
    }
    .pa-form-id-row {
      display: flex;
      align-items: baseline;
      gap: 0.1in;
      margin-bottom: 0.06in;
    }
    .pa-form-id-row:last-child { margin-bottom: 0; }
    .pa-form-id-label {
      white-space: nowrap;
      font-size: 8pt;
      font-weight: 600;
      color: #374151;
    }
    .pa-form-box-right .pa-ul-id {
      border-bottom: none;
      min-height: 0.9em;
      flex: 1;
      min-width: 1.2in;
      display: inline-block;
    }
    
    .pa-form-intro {
      font-size: 8.5pt;
      margin-bottom: 0.14in;
      line-height: 1.5;
      color: #374151;
      text-align: justify;
    }
    .pa-form-section-title {
      font-weight: 700;
      margin-bottom: 0.1in;
      font-size: 10pt;
      letter-spacing: 0.02em;
      color: #111827;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 0.05in;
    }
    .pa-form-declaration-table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #374151;
      margin-bottom: 0.12in;
      font-size: 8.5pt;
      table-layout: fixed;
    }
    .pa-form-col-label { width: 1.55in; }
    .pa-form-col-input { width: auto; }
    .pa-form-col-small { width: 1in; }
    .pa-form-declaration-table td {
      border: 1px solid #d1d5db;
      border-bottom: none;
      padding: 0.07in 0.1in;
      vertical-align: middle;
      min-height: 0.26in;
    }
    .pa-form-declaration-table tr:last-child td {
      border-bottom: 1px solid #374151;
    }
    .pa-form-declaration-table .pa-ul {
      min-height: 0.9em;
      border-bottom: none;
      display: inline;
    }
    .pa-form-td-label {
      font-weight: 600;
      font-size: 8pt;
      background: #f8fafc;
      color: #374151;
    }
    .pa-form-td-input { min-width: 0; color: #111827; }
    .pa-form-td-small { text-align: center; color: #111827; }
    .pa-form-cell-label {
      display: block;
      font-size: 7pt;
      font-weight: 600;
      margin-bottom: 0.02in;
      color: #6b7280;
      letter-spacing: 0.02em;
    }
    .pa-form-label-sub {
      font-weight: normal;
      font-size: 6.5pt;
      color: #6b7280;
    }
    .pa-ul {
      display: inline-block;
      border-bottom: 1px solid #374151;
      min-height: 1.15em;
      vertical-align: bottom;
    }
    .pa-ul-mid { min-width: 1.4in; }
    .pa-ul-short { min-width: 0.7in; }
    .pa-ul-long { min-width: 2.8in; flex: 1; }
    .pa-ul-amt { min-width: 1.1in; }
    .pa-ul-date { min-width: 1.1in; }
    .pa-ul-producer { min-width: 1.5in; flex: 1; }
    .pa-ul-sig { min-width: 2.2in; flex: 1; margin-left: 0.1in; }
    .pa-ul-date-sig { min-width: 1in; margin-left: 0.1in; }
    .pa-form-footnotes {
      font-size: 6.5pt;
      margin-bottom: 0.12in;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 0.1in 0.25in;
      color: #6b7280;
      line-height: 1.35;
    }
    .pa-form-footnotes span { flex: 1; min-width: 1.2in; }
    .pa-form-doc .pa-form-declaration {
      margin-bottom: 0.1in;
      line-height: 1.5;
      font-size: 8pt;
      color: #374151;
      text-align: justify;
    }
    .pa-form-notice {
      margin-left: 0.25in;
      margin-bottom: 0.1in;
      font-size: 8pt;
      line-height: 1.5;
      color: #4b5563;
      text-align: justify;
    }
    .pa-form-legal {
      font-weight: 700;
      margin: 0.1in 0;
      font-size: 8pt;
      line-height: 1.45;
      color: #374151;
    }
    .pa-form-legal-dark { color: #000000 !important; }
    .pa-form-label-dark { color: #000000 !important; font-weight: 700; }
    .pa-form-producer-block {
      display: flex;
      gap: 0.35in;
      margin-top: 0.16in;
      margin-bottom: 0.12in;
      padding-top: 0.1in;
      border-top: 1px solid #e5e7eb;
    }
    .pa-form-producer-col { flex: 1; }
    .pa-form-producer-row {
      display: flex;
      align-items: baseline;
      gap: 0.12in;
      margin-bottom: 0.08in;
    }
    .pa-form-producer-row .pa-form-label {
      min-width: 1.5in;
      font-weight: 600;
      font-size: 8pt;
      color: #374151;
    }
    .pa-form-hint {
      font-size: 6.5pt;
      color: #9ca3af;
      margin-bottom: 0.1in;
    }
    .pa-form-signature-block {
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 0.12in;
      margin-top: 0.14in;
      padding-top: 0.06in;
    }
    .pa-form-sig-label {
      color: #000000 !important;
      font-weight: 700;
    }
    .pa-form-date-label {
      margin-left: 0.25in;
      min-width: auto !important;
      font-weight: 600;
      font-size: 8pt;
      color: #374151;
    }
    .pa-form-sig-hint {
      font-size: 6.5pt;
      text-align: center;
      margin-top: 0.03in;
      color: #9ca3af;
    }
    
    /* Pennsylvania 1609-SLL Addendum (Page 2) */
    .pa-form-addendum .pa-form-addendum-title {
      font-weight: 700;
      font-size: 11pt;
      color: #000000;
      margin-bottom: 0.18in;
      text-align: center;
      letter-spacing: 0.02em;
    }
    .pa-form-addendum-intro {
      font-size: 9pt;
      line-height: 1.5;
      color: #374151;
      margin-bottom: 0.14in;
    }
    .pa-form-addendum-body {
      font-size: 9pt;
      line-height: 1.55;
      color: #374151;
    }
    .pa-ul-addendum {
      display: inline-block;
      border-bottom: 1px solid #000000;
      min-width: 1.2in;
      min-height: 1em;
      vertical-align: bottom;
    }
    
    /* Washington Surplus Lines — Fintech-grade professional */
    .wa-form-doc {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
      color: #1e293b;
      line-height: 1.6;
      font-size: 9pt;
    }
    .wa-form-header {
      text-align: center;
      margin-bottom: 0.28in;
      padding-bottom: 0.2in;
      border-bottom: 1px solid #e2e8f0;
    }
    .wa-form-badge {
      font-size: 6.5pt;
      font-weight: 600;
      letter-spacing: 0.15em;
      color: #64748b;
      margin-bottom: 0.12in;
    }
    .wa-form-title {
      font-weight: 600;
      font-size: 14pt;
      letter-spacing: 0.02em;
      color: #0f172a;
    }
    .wa-form-subtitle {
      font-size: 9pt;
      font-weight: 500;
      color: #64748b;
      margin-top: 0.04in;
    }
    .wa-form-doc-type {
      font-weight: 600;
      font-size: 10pt;
      color: #0f172a;
      margin-top: 0.08in;
    }
    .wa-form-block-label {
      font-size: 7pt;
      font-weight: 600;
      letter-spacing: 0.08em;
      color: #64748b;
      margin-bottom: 0.1in;
      text-transform: uppercase;
    }
    .wa-form-info-block {
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 0.16in 0.18in;
      margin-bottom: 0.24in;
      background: #f8fafc;
    }
    .wa-form-info-block .wa-form-block-label { margin-bottom: 0.12in; }
    .wa-form-field-row {
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 0.04in;
      margin-bottom: 0.12in;
    }
    .wa-form-field-row:last-child { margin-bottom: 0; }
    .wa-form-field-label {
      font-weight: 500;
      font-size: 9pt;
      color: #334155;
      min-width: 1.4in;
    }
    .wa-form-field-sep { color: #94a3b8; }
    .wa-form-field-value { color: #475569; font-weight: 500; }
    .wa-form-field-hint {
      font-size: 7pt;
      color: #94a3b8;
      margin-left: 0.08in;
    }
    .wa-form-ul {
      display: inline-block;
      border-bottom: 1px solid #1e293b;
      min-height: 1.15em;
      vertical-align: bottom;
    }
    .wa-form-ul-long { min-width: 2.5in; flex: 1; }
    .wa-form-ul-inline { min-width: 1.1in; }
    .wa-form-ul-producer { min-width: 1.7in; }
    .wa-form-ul-agency { min-width: 1.9in; flex: 1; }
    .wa-form-ul-sig { min-width: 2.4in; flex: 1; }
    .wa-form-ul-date { min-width: 1.4in; }
    .wa-form-producer-section {
      margin-bottom: 0.22in;
    }
    .wa-form-producer-row {
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 0.1in;
    }
    .wa-form-producer-hints {
      display: flex;
      gap: 1.35in;
      margin-top: 0.05in;
      padding-left: 0.12in;
    }
    .wa-form-producer-hint {
      font-size: 7pt;
      color: #94a3b8;
    }
    .wa-form-certify-block {
      margin-bottom: 0.22in;
    }
    .wa-form-certify {
      font-size: 9pt;
      line-height: 1.65;
      color: #475569;
      margin: 0;
      text-align: justify;
    }
    .wa-form-emphasis {
      font-weight: 600;
      color: #1e293b;
    }
    .wa-form-disclosure-section {
      margin-bottom: 0.26in;
    }
    .wa-form-disclosure-intro {
      font-size: 9pt;
      line-height: 1.6;
      color: #475569;
      margin-bottom: 0.12in;
    }
    .wa-form-disclosure-list {
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 0.14in 0.18in;
      background: #ffffff;
    }
    .wa-form-disclosure-item {
      display: flex;
      gap: 0.12in;
      font-size: 9pt;
      line-height: 1.6;
      color: #475569;
      margin-bottom: 0.1in;
      text-align: justify;
    }
    .wa-form-disclosure-item:last-child { margin-bottom: 0; }
    .wa-form-bullet {
      font-weight: 600;
      color: #0f172a;
      min-width: 0.2in;
    }
    .wa-form-signature-block {
      display: flex;
      flex-direction: column;
      gap: 0.16in;
      padding: 0.2in 0;
      margin-top: 0.06in;
      border-top: 1px solid #e2e8f0;
    }
    .wa-form-sig-row {
      display: flex;
      align-items: baseline;
      gap: 0.14in;
    }
    .wa-form-date-row {
      display: flex;
      align-items: baseline;
      gap: 0.14in;
    }
    .wa-form-sig-label {
      font-weight: 600;
      font-size: 9pt;
      color: #0f172a;
      white-space: nowrap;
      min-width: 2in;
    }
    .wa-form-date-label {
      font-weight: 600;
      font-size: 9pt;
      color: #0f172a;
      min-width: 0.45in;
    }
    
    /* Texas Diligent Effort — clean, professional, easy to read */
    .tx-form-doc {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      color: #1e293b;
      font-size: 9pt;
      line-height: 1.5;
      padding-bottom: 0.3in;
    }
    .tx-form-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.24in;
      padding-bottom: 0.16in;
      border-bottom: 1px solid #e2e8f0;
    }
    .tx-form-logo {
      display: flex;
      align-items: flex-start;
    }
    .tx-logo-wrapper {
      display: flex;
      align-items: flex-start;
      gap: 0.1in;
    }
    .tx-logo-img {
      height: 0.85in;
      width: auto;
      max-width: 2.5in;
      object-fit: contain;
    }
    .tx-logo-svg-wrap {
      width: 1.9in;
      flex-shrink: 0;
    }
    .tx-logo-svg {
      width: 100%;
      height: auto;
    }
    .tx-logo-text {
      display: flex;
      flex-direction: column;
    }
    .tx-logo-surplus {
      font-weight: 700;
      font-size: 14pt;
      color: #0f172a;
    }
    .tx-logo-surplus sup {
      font-size: 0.55em;
      vertical-align: super;
    }
    .tx-logo-lines {
      font-weight: 400;
      font-size: 10pt;
      color: #0f172a;
    }
    .tx-logo-office {
      font-size: 7pt;
      color: #64748b;
      margin-top: 0.02in;
    }
    .tx-form-number {
      font-size: 9pt;
      color: #64748b;
      font-weight: 500;
    }
    .tx-form-title {
      font-weight: 700;
      font-size: 17pt;
      text-align: center;
      margin: 0 0 0.14in 0;
      color: #0f172a;
      letter-spacing: 0.02em;
    }
    .tx-form-intro {
      font-size: 9pt;
      text-align: center;
      margin-bottom: 0.16in;
      color: #475569;
      line-height: 1.55;
    }
    .tx-form-link {
      color: #2563eb;
      text-decoration: underline;
    }
    .tx-form-section {
      margin-bottom: 0.14in;
      padding: 0.1in 0.14in;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
    }
    .tx-section-title {
      font-weight: 700;
      font-size: 9pt;
      letter-spacing: 0.06em;
      margin-bottom: 0.08in;
      color: #0f172a;
    }
    .tx-field-row {
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 0.08in;
      margin-bottom: 0.06in;
    }
    .tx-field-row:last-child { margin-bottom: 0; }
    .tx-field-label {
      font-size: 9pt;
      font-weight: 500;
      color: #334155;
      min-width: 2.1in;
    }
    .tx-ul {
      display: inline-block;
      border-bottom: 1px solid #334155;
      min-height: 1.15em;
      vertical-align: bottom;
      flex: 1;
      min-width: 2in;
    }
    .tx-ul-long { min-width: 3in; flex: 1; }
    .tx-ul-sig { min-width: 2.2in; flex: 1; }
    .tx-ul-date {
      min-width: 1.2in;
      max-width: 1.5in;
      flex: none;
    }
    .tx-options-row {
      display: flex;
      align-items: baseline;
      gap: 0.22in;
      margin-bottom: 0.1in;
    }
    .tx-options-three {
      gap: 0.35in;
      flex-wrap: wrap;
    }
    .tx-form-section-carrier .tx-options-row {
      margin-top: 0.02in;
      margin-bottom: 0.1in;
      align-items: baseline;
    }
    .tx-option { font-size: 9pt; color: #475569; }
    .tx-checkbox { font-family: Arial; }
    .tx-ack-statement {
      font-size: 9pt;
      margin: 0 0 0.14in 0;
      color: #475569;
      line-height: 1.5;
    }
    .tx-sig-block {
      margin-top: 0.12in;
      padding-top: 0.1in;
      border-top: 1px solid #e2e8f0;
    }
    .tx-sig-row {
      display: flex;
      align-items: baseline;
      gap: 0.1in;
      margin-bottom: 0.1in;
      flex-wrap: wrap;
    }
    .tx-sig-row-date .tx-ul-date {
      max-width: 1.5in;
    }
    .tx-form-footer {
      margin-top: 0.18in;
      padding-top: 0.12in;
      border-top: 1px solid #334155;
      page-break-inside: avoid;
    }
    .tx-footer-italic {
      font-size: 8pt;
      font-style: italic;
      color: #334155;
      margin-bottom: 0.06in;
      line-height: 1.45;
    }
    .tx-footer-bullet {
      font-size: 8pt;
      font-style: italic;
      color: #334155;
      margin-bottom: 0.05in;
      line-height: 1.45;
    }
    .tx-disclaimer {
      font-size: 8pt;
      font-style: italic;
      color: #334155;
      margin: 0.08in 0 0 0;
      line-height: 1.45;
    }
    
    /* Oregon Diligent Search Statement — matches official form */
    .or-form-doc {
      font-family: 'Times New Roman', Times, serif;
      color: #000000;
      font-size: 10pt;
      line-height: 1.4;
    }
    .or-form-title {
      font-size: 14pt;
      font-weight: bold;
      text-align: center;
      margin: 0 0 0.2in 0;
      letter-spacing: 0.15em;
    }
    .or-form-fields { margin-bottom: 0.18in; }
    .or-field-row {
      display: flex;
      align-items: baseline;
      margin-bottom: 0.06in;
    }
    .or-field-label {
      min-width: 2.2in;
      font-size: 10pt;
    }
    .or-field-value {
      font-size: 10pt;
      margin-left: 0.1in;
    }
    .or-ul {
      display: inline-block;
      border-bottom: 1px solid #000000;
      min-height: 1.1em;
      flex: 1;
      min-width: 2.5in;
      margin-left: 0.1in;
      vertical-align: bottom;
    }
    .or-ul-long { min-width: 3in; }
    .or-ul-sig { min-width: 3in; }
    .or-ul-date { min-width: 1.5in; }
    .or-paragraph {
      margin: 0 0 0.1in 0;
      font-size: 10pt;
      text-align: justify;
    }
    .or-indent { margin-left: 0.2in; }
    .or-bullets { margin: 0.1in 0 0.18in 0.4in; }
    .or-bullet {
      margin: 0 0 0.06in 0;
      font-size: 10pt;
      text-align: justify;
    }
    .or-select-prompt { margin-bottom: 0.08in; }
    .or-select-text {
      color: #c00;
      font-weight: bold;
      text-decoration: underline;
      font-size: 10pt;
    }
    .or-red-divider {
      display: flex;
      align-items: center;
      gap: 0.08in;
      margin-bottom: 0.14in;
    }
    .or-red-arrow {
      color: #c00;
      font-size: 12pt;
    }
    .or-red-dash {
      flex: 1;
      height: 0;
      border-bottom: 2px dashed #c00;
    }
    .or-statement {
      margin-bottom: 0.12in;
    }
    .or-statement-title {
      font-weight: bold;
      margin: 0 0 0.06in 0;
      font-size: 10pt;
      color: #c00;
      display: flex;
      align-items: center;
      gap: 0.08in;
    }
    .or-checkbox {
      display: inline-block;
      width: 0.14in;
      height: 0.14in;
      border: 2px solid #c00;
      background: #fff;
      flex-shrink: 0;
    }
    .or-statement-text {
      margin: 0 0 0 0.25in;
      font-size: 10pt;
      line-height: 1.45;
      text-align: justify;
    }
    .or-dash-line {
      border-bottom: 2px dashed #000000;
      margin: 0.12in 0;
    }
    .or-link {
      color: #000000;
      text-decoration: underline;
    }
    .or-signature-block { margin-top: 0.2in; }
    .or-sig-row {
      display: flex;
      align-items: baseline;
      margin-bottom: 0.1in;
    }
    .or-sig-row .or-field-label { min-width: 2.2in; }
    .or-sig-row .or-ul { margin-left: 0.1in; }
    
    /* Nevada Surplus Lines Association – DECLINATION DETAIL (NSLA 105) */
    .nv-form-doc {
      font-family: 'Times New Roman', Times, serif;
      font-size: 10pt;
      color: #000000;
      line-height: 1.4;
    }
    .nv-form-header {
      text-align: center;
      margin-bottom: 0.2in;
    }
    .nv-form-org {
      font-size: 12pt;
      font-weight: bold;
      font-style: italic;
      margin: 0 0 0.08in 0;
      color: #000000;
    }
    .nv-form-title {
      font-size: 12pt;
      font-weight: bold;
      font-style: italic;
      margin: 0;
      color: #000000;
    }
    .nv-form-intro {
      text-align: left;
      margin: 0 0 0.18in 0;
      font-size: 10pt;
      line-height: 1.5;
    }
    .nv-form-field-row {
      display: flex;
      align-items: baseline;
      margin-bottom: 0.12in;
    }
    .nv-form-label {
      font-weight: bold;
      font-size: 10pt;
      min-width: 2.8in;
      flex-shrink: 0;
    }
    .nv-form-ul {
      display: inline-block;
      border-bottom: 1px solid #000000;
      min-height: 1.1em;
      flex: 1;
      min-width: 2in;
      margin-left: 0.1in;
      vertical-align: bottom;
    }
    .nv-form-ul-long { min-width: 3.5in; }
    .nv-form-row-two-col {
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 0.15in;
    }
    .nv-form-ul-phone { min-width: 1.5in; }
    .nv-form-label-underwriter { min-width: 1in; margin-left: 0.2in; }
    .nv-form-ul-underwriter { min-width: 2in; }
    .nv-form-decline-block {
      margin-bottom: 0.2in;
      padding-bottom: 0.15in;
      border-bottom: 1px solid #e5e7eb;
    }
    .nv-form-decline-heading {
      font-weight: bold;
      font-size: 10pt;
      margin: 0 0 0.12in 0;
    }
    .nv-form-codes-heading {
      font-weight: bold;
      font-style: italic;
      text-align: center;
      margin: 0.2in 0 0.12in 0;
      font-size: 10pt;
      color: #000000;
    }
    .nv-form-codes-grid {
      display: flex;
      gap: 0.5in;
      margin-bottom: 0.2in;
    }
    .nv-form-codes-col {
      flex: 1;
    }
    .nv-form-code-item {
      margin: 0 0 0.06in 0;
      font-size: 10pt;
      color: #000000;
    }
    .nv-form-explanation {
      font-size: 9pt;
      margin: 0 0 0.2in 0;
      line-height: 1.5;
      text-align: left;
    }
    .nv-form-sig-block {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 0.2in;
      margin: 0.2in 0 0.15in 0;
    }
    .nv-form-sig-row {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.04in;
      flex: 1;
    }
    .nv-form-sig-center { align-items: center; }
    .nv-form-sig-right { align-items: flex-end; }
    .nv-form-sig-right .nv-form-ul { margin-left: 0; }
    .nv-form-ul-sig {
      min-width: 2in;
      width: 100%;
    }
    .nv-form-footer {
      display: flex;
      justify-content: space-between;
      margin-top: 0.15in;
      padding-top: 0.08in;
      font-size: 9pt;
      color: #333;
    }
    .nv-form-footer-left {}
    .nv-form-footer-right {}
    
    /* Florida Surplus Lines Disclosure and Acknowledgement */
    .fl-form-doc {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 10pt;
      color: #000000;
      line-height: 1.4;
    }
    .fl-form-title {
      font-size: 12pt;
      font-weight: bold;
      margin: 0 0 0.2in 0;
      text-align: left;
    }
    .fl-form-paragraph {
      margin: 0 0 0.15in 0;
      text-align: left;
      line-height: 1.5;
    }
    .fl-form-paragraph .fl-form-ul {
      display: inline-block;
      border-bottom: 1px solid #000000;
      min-width: 3in;
      min-height: 1.1em;
      margin: 0 0.05in;
      vertical-align: bottom;
    }
    .fl-form-ul-agency { min-width: 3.5in; }
    .fl-form-hint {
      font-size: 9pt;
      font-style: italic;
      color: #555;
      margin: -0.08in 0 0.15in 0;
    }
    .fl-form-field-block {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.03in;
      margin-bottom: 0.2in;
    }
    .fl-form-ul {
      display: inline-block;
      border-bottom: 1px solid #000000;
      min-height: 1.1em;
      min-width: 2in;
    }
    .fl-form-ul-field { min-width: 3.5in; }
    .fl-form-ul-long { min-width: 4.5in; width: 100%; }
    .fl-form-label-below {
      font-size: 10pt;
      color: #000000;
    }
    .fl-form-sig-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.3in;
      margin-bottom: 0.2in;
    }
    .fl-form-sig-left {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.03in;
    }
    .fl-form-sig-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.03in;
    }
    .fl-form-sig-line-row {
      display: flex;
      align-items: baseline;
      gap: 0.1in;
    }
    .fl-form-sig-right .fl-form-sig-line-row {
      flex-direction: row;
      align-items: baseline;
    }
    .fl-form-ul-sig { min-width: 3in; flex: 1; }
    .fl-form-ul-date { min-width: 1.5in; }
    .fl-form-label-inline {
      font-size: 10pt;
      flex-shrink: 0;
    }
    .fl-form-label-date {}
    
    /* California Surplus Line Disclosure (D-1) – two pages */
    .ca-form-doc {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 10pt;
      color: #000000;
      line-height: 1.5;
    }
    .ca-form-title {
      font-size: 12pt;
      font-weight: bold;
      margin: 0 0 0.2in 0;
    }
    .ca-form-content {
      margin-bottom: 0.2in;
    }
    .ca-form-item {
      margin: 0 0 0.15in 0;
      text-align: left;
    }
    .ca-form-sig-block {
      margin-top: 0.25in;
    }
    .ca-form-sig-row {
      display: flex;
      align-items: baseline;
      margin-bottom: 0.15in;
      gap: 0.15in;
    }
    .ca-form-sig-row .ca-form-label {
      flex-shrink: 0;
    }
    .ca-form-ul {
      display: inline-block;
      border-bottom: 1px solid #000000;
      min-height: 1.1em;
      flex: 1;
      min-width: 2in;
    }
    .ca-form-footer {
      margin-top: 0.3in;
      font-size: 9pt;
      color: #333;
    }
    
    /* California DILIGENT SEARCH REPORT (SL-2 FORM) – Page 3 */
    .ca-sl2-doc {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 8.5pt;
      color: #000000;
      line-height: 1.3;
      padding-bottom: 0.08in;
    }
    .ca-sl2-header {
      text-align: center;
      margin-bottom: 0.1in;
    }
    .ca-sl2-org {
      margin: 0 0 0.04in 0;
      font-size: 9.5pt;
    }
    .ca-sl2-title {
      margin: 0;
      font-size: 10pt;
      font-weight: bold;
    }
    .ca-sl2-section {
      display: flex;
      align-items: flex-start;
      gap: 0.08in;
      margin-bottom: 0.08in;
    }
    .ca-sl2-section-grey .ca-sl2-section-body {
      background: #f1f5f9;
      border: 1px solid #000000;
      padding: 0.08in;
    }
    .ca-sl2-num {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 0.22in;
      height: 0.22in;
      background: #000000;
      color: #ffffff;
      font-weight: bold;
      font-size: 10pt;
      flex-shrink: 0;
    }
    .ca-sl2-section-body { flex: 1; }
    .ca-sl2-instruction {
      margin: 0 0 0.06in 0;
      font-size: 8.5pt;
    }
    .ca-sl2-statement { margin: 0 0 0.06in 0; }
    .ca-sl2-ul {
      display: inline-block;
      border-bottom: 1px solid #000000;
      min-height: 0.9em;
      min-width: 1.5in;
    }
    .ca-sl2-ul-name { min-width: 3in; }
    .ca-sl2-ul-mid { min-width: 2in; }
    .ca-sl2-ul-long { min-width: 2.5in; }
    .ca-sl2-ul-sig { min-width: 2.5in; width: 100%; }
    .ca-sl2-option { margin: 0 0 0.05in 0; }
    .ca-sl2-or {
      text-align: center;
      margin: 0.02in 0;
      font-size: 8.5pt;
    }
    .ca-sl2-hint {
      font-size: 7.5pt;
      color: #333;
      margin: -0.03in 0 0.05in 0;
    }
    .ca-sl2-intro { margin: 0 0 0.06in 0; }
    .ca-sl2-table {
      border: 1px solid #000000;
      margin: 0.06in 0;
      width: 100%;
    }
    .ca-sl2-table-row {
      display: flex;
      border-bottom: 1px solid #000000;
    }
    .ca-sl2-table-row:last-child { border-bottom: none; }
    .ca-sl2-table-cell {
      flex: 1;
      border-right: 1px solid #000000;
      padding: 0.04in;
      display: flex;
      flex-direction: column;
      gap: 0.02in;
    }
    .ca-sl2-table-cell:last-child { border-right: none; }
    .ca-sl2-cell-header {
      background: #000000;
      color: #ffffff;
      font-weight: bold;
      font-size: 7pt;
      padding: 0.04in;
      justify-content: center;
      align-items: center;
    }
    .ca-sl2-cell-header span { text-align: center; }
    .ca-sl2-cell-label {
      font-size: 7pt;
      font-weight: bold;
    }
    .ca-sl2-input {
      border: 1px solid #000000;
      min-height: 0.18in;
      background: #fff;
    }
    .ca-sl2-input-sub {
      min-height: 0.14in;
      margin-top: 0.01in;
    }
    .ca-sl2-textarea {
      border: 1px solid #000000;
      min-height: 0.45in;
      background: #fff;
      margin-top: 0.05in;
    }
    .ca-sl2-yn {
      display: inline-flex;
      align-items: center;
      gap: 0.06in;
    }
    .ca-sl2-cb {
      display: inline-block;
      width: 0.1in;
      height: 0.1in;
      border: 1.5px solid #000000;
      background: #fff;
      vertical-align: middle;
    }
    .ca-sl2-addendum { margin: 0.05in 0 0 0; }
    .ca-sl2-link {
      color: #2563eb;
      text-decoration: underline;
    }
    .ca-sl2-cert {
      margin: 0.08in 0;
      font-size: 8.5pt;
      line-height: 1.35;
    }
    .ca-sl2-sig-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 0.2in;
      margin: 0.08in 0;
    }
    .ca-sl2-sig-block {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.02in;
      flex: 1;
    }
    .ca-sl2-sig-label {
      font-size: 7.5pt;
      color: #333;
    }
    .ca-sl2-footer {
      font-size: 7.5pt;
      color: #333;
      margin-top: 0.05in;
      margin-bottom: 0;
    }
    
    /* Colorado Statement of Diligent Effort */
    .co-form-doc {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 9pt;
      color: #000000;
      line-height: 1.3;
      position: relative;
      padding: 0.15in;
    }
    .co-form-watermark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 42pt;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.07);
      text-align: center;
      pointer-events: none;
      line-height: 1.2;
    }
    .co-form-watermark-sub {
      font-size: 12pt;
      display: block;
      margin: 0.02in 0;
    }
    .co-form-border {
      position: relative;
      border: 2px solid #1e3a5f;
      padding: 0.15in;
      background: #ffffff;
      overflow: hidden;
    }
    .co-form-border > .co-form-watermark {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .co-form-header {
      position: relative;
      z-index: 1;
      background: #1e3a5f;
      color: #ffffff;
      font-size: 11pt;
      font-weight: bold;
      text-transform: uppercase;
      text-align: center;
      padding: 0.12in 0.15in;
      margin: -0.15in -0.15in 0.15in -0.15in;
    }
    .co-form-intro-row {
      display: flex;
      align-items: baseline;
      gap: 0.1in;
      margin-bottom: 0.06in;
    }
    .co-form-intro-text { flex-shrink: 0; }
    .co-form-ul {
      display: inline-block;
      border-bottom: 1px solid #999999;
      min-height: 1em;
      flex: 1;
      min-width: 1in;
    }
    .co-form-ul-intro { min-width: 2in; }
    .co-form-ul-license { min-width: 1.2in; }
    .co-form-ul-long { min-width: 2.5in; }
    .co-form-ul-mid { min-width: 1.2in; }
    .co-form-ul-date { min-width: 1.2in; }
    .co-form-ul-sig { min-width: 2in; }
    .co-form-field-block { margin-bottom: 0.06in; }
    .co-form-field-centered {
      text-align: center;
    }
    .co-form-field-centered .co-form-ul { margin: 0 auto; }
    .co-form-label-above {
      display: block;
      font-size: 9pt;
      margin-bottom: 0.02in;
      text-align: center;
    }
    .co-form-field-row {
      display: flex;
      align-items: baseline;
      gap: 0.1in;
      margin-bottom: 0.05in;
      flex-wrap: wrap;
    }
    .co-form-label {
      flex-shrink: 0;
      font-size: 9pt;
    }
    .co-form-row-inline { flex-wrap: wrap; }
    .co-form-insurer-block {
      margin-bottom: 0.1in;
      padding-bottom: 0.08in;
      border-bottom: 1px solid #e5e7eb;
    }
    .co-form-insurer-num {
      font-weight: bold;
      margin: 0 0 0.05in 0;
      font-size: 9pt;
    }
    .co-form-hint {
      font-size: 8pt;
      font-style: italic;
      color: #000000;
      margin: -0.02in 0 0.04in 0;
    }
    .co-form-row-two {
      flex-wrap: wrap;
    }
    .co-form-sig-divider {
      border: none;
      border-top: 1px solid #cbd5e1;
      margin: 0.12in 0 0.08in 0;
    }
    .co-form-sig-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 0.2in;
      margin: 0.1in 0;
    }
    .co-form-sig-block {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.02in;
      flex: 1;
    }
    .co-form-definition {
      font-size: 8.5pt;
      line-height: 1.4;
      margin: 0.1in 0;
      text-align: left;
    }
    .co-form-footer-rev {
      font-size: 8pt;
      text-align: right;
      margin: 0.08in 0;
    }
    .co-form-attest {
      display: flex;
      align-items: flex-start;
      gap: 0.1in;
      margin: 0.1in 0;
    }
    .co-form-checkbox {
      display: inline-block;
      width: 0.14in;
      height: 0.14in;
      border: 2px solid #000000;
      background: #fff;
      flex-shrink: 0;
    }
    .co-form-attest-text {
      flex: 1;
      font-size: 8.5pt;
      line-height: 1.4;
      margin: 0;
    }
    
    /* New York Part C – Affidavit by Producing Broker (NYSID Form 41C) */
    .ny-form-doc {
      font-family: 'Times New Roman', Times, serif;
      font-size: 9.5pt;
      color: #000000;
      line-height: 1.25;
    }
    .ny-form-page1 {
      padding-bottom: 0.15in;
      page-break-inside: avoid;
    }
    .ny-form-page1 .ny-form-title {
      font-size: 11pt;
      font-weight: bold;
      text-align: center;
      margin: 0 0 0.1in 0;
    }
    .ny-form-page1 .ny-form-section { margin-bottom: 0.08in; }
    .ny-form-section-heading {
      font-weight: bold;
      margin: 0 0 0.05in 0;
      font-size: 9.5pt;
    }
    .ny-form-inline-label { font-weight: normal; }
    .ny-form-section-head-row {
      display: flex;
      align-items: center;
      gap: 0.1in;
      margin-bottom: 0.08in;
      flex-wrap: wrap;
    }
    .ny-form-input-box {
      display: inline-block;
      border: 1px solid #000000;
      min-height: 0.28in;
      padding: 0.04in 0.08in;
      font-size: 10pt;
      background: #fff;
    }
    .ny-form-box-affidavit { min-width: 1.2in; }
    .ny-form-box-name { min-width: 2.2in; }
    .ny-form-box-license { min-width: 1.5in; }
    .ny-form-box-addr { min-width: 2.5in; flex: 1; }
    .ny-form-box-city { min-width: 1.4in; }
    .ny-form-box-state { min-width: 0.7in; }
    .ny-form-box-zip { min-width: 1in; }
    .ny-form-field-block {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.03in;
    }
    .ny-form-label-below {
      font-size: 9pt;
      color: #000;
    }
    .ny-form-row-boxes {
      display: flex;
      align-items: flex-end;
      gap: 0.1in;
      margin-bottom: 0.08in;
      flex-wrap: wrap;
    }
    .ny-form-row-address { margin-bottom: 0.06in; }
    .ny-form-field-addr { flex: 1; min-width: 2in; }
    .ny-form-field-addr .ny-form-input-box { width: 100%; }
    .ny-form-field-insured .ny-form-input-box { min-width: 3in; }
    .ny-form-footer-combined {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.12in;
      padding-top: 0.08in;
      font-size: 7.5pt;
      color: #333;
      flex-wrap: wrap;
      gap: 0.08in;
      page-break-inside: avoid;
    }
    .ny-form-footer-center { flex: 1; text-align: center; }
    .ny-form-section-boxed {
      border: 3px solid #000000;
      padding: 0.08in;
      margin: 0.08in 0;
    }
    .ny-form-row-inline {
      display: flex;
      align-items: baseline;
      margin-bottom: 0.06in;
      flex-wrap: wrap;
      gap: 0.05in;
    }
    .ny-form-row-city-state-zip { flex-wrap: wrap; }
    .ny-form-label {
      font-size: 10pt;
      white-space: nowrap;
    }
    .ny-form-label-state { margin-left: 0.2in; }
    .ny-form-label-date { margin-left: 0.15in; }
    .ny-form-label-naic { margin-left: 0.15in; }
    .ny-form-ul {
      display: inline-block;
      border-bottom: 1px solid #000000;
      min-height: 1.1em;
      flex: 1;
      min-width: 1.5in;
      vertical-align: bottom;
    }
    .ny-form-ul-affidavit { min-width: 1.2in; max-width: 2in; }
    .ny-form-ul-license { min-width: 1.5in; }
    .ny-form-ul-name { min-width: 2.5in; }
    .ny-form-ul-addr { min-width: 3in; }
    .ny-form-ul-city { min-width: 1.5in; }
    .ny-form-ul-state { min-width: 0.8in; }
    .ny-form-ul-zip { min-width: 1in; }
    .ny-form-ul-insured { min-width: 3in; }
    .ny-form-ul-company { min-width: 2.5in; }
    .ny-form-ul-date { min-width: 1.2in; }
    .ny-form-ul-naic { min-width: 1in; }
    .ny-form-ul-other { min-width: 1.5in; margin-left: 0.1in; }
    .ny-form-note {
      font-size: 8.5pt;
      color: #333;
      margin: 0.04in 0 0 0;
      font-style: italic;
    }
    .ny-form-question-row {
      display: flex;
      align-items: flex-start;
      gap: 0.1in;
      margin-bottom: 0.05in;
    }
    .ny-form-yn {
      flex-shrink: 0;
      font-size: 10pt;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 0.04in;
    }
    .ny-form-question { flex: 1; }
    .ny-form-cb {
      display: inline-block;
      width: 0.12in;
      height: 0.12in;
      border: 1.5px solid #000000;
      background: #fff;
      flex-shrink: 0;
      vertical-align: middle;
    }
    .ny-form-cb-right { margin-left: 0.08in; }
    .ny-form-declination-item {
      margin: 0 0 0.08in 0;
      font-size: 9.5pt;
      display: flex;
      align-items: flex-start;
      gap: 0.08in;
    }
    .ny-form-declination-item .ny-form-yn { margin-top: 0.02in; }
    .ny-form-subsection-heading {
      font-weight: bold;
      text-align: center;
      margin: 0.1in 0 0.08in 0;
      font-size: 9.5pt;
    }
    .ny-form-decline-schedule { margin-top: 0.08in; }
    .ny-form-decline-row {
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 0.06in;
      margin-bottom: 0.06in;
    }
    .ny-form-reason-intro { margin: 0.06in 0 0.05in 0; font-size: 9.5pt; }
    .ny-form-reason-list { margin-left: 0; }
    .ny-form-reason-item {
      display: flex;
      align-items: flex-start;
      gap: 0.06in;
      margin-bottom: 0.04in;
      font-size: 9pt;
    }
    .ny-form-reason-item .ny-form-cb { flex-shrink: 0; margin-top: 0.02in; }
    .ny-form-footer {
      display: flex;
      justify-content: space-between;
      margin-top: 0.25in;
      padding-top: 0.1in;
      font-size: 9pt;
      color: #333;
    }
    .ny-form-footer-left {}
    .ny-form-footer-right {}
    .ny-form-decline-block {
      margin-bottom: 0.2in;
    }
    .ny-form-affirmation-box {
      border: 3px solid #000000;
      padding: 0.15in;
      margin-top: 0.2in;
    }
    .ny-form-affirmation-heading {
      font-weight: bold;
      text-align: center;
      margin: 0 0 0.12in 0;
      font-size: 11pt;
    }
    .ny-form-affirmation-text {
      margin: 0 0 0.15in 0;
      font-size: 10pt;
      line-height: 1.5;
    }
    .ny-form-affirmation-sig-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 0.2in;
      margin-top: 0.15in;
    }
    .ny-form-sig-left, .ny-form-sig-right {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.04in;
    }
    .ny-form-sig-left { flex: 1; min-width: 2.5in; }
    .ny-form-sig-right { align-items: flex-end; }
    .ny-form-affirmation-sig-row .ny-form-ul-date { min-width: 1.2in; }
    .ny-form-ul-affiant { min-width: 2in; }
    .ny-form-ul-sig { min-width: 2.5in; width: 100%; }
    
    /* New York Page 3 - Notice of Excess Line Placement */
    .ny-form-page3 {
      font-family: 'Times New Roman', Times, serif;
      font-size: 9.5pt;
      line-height: 1.3;
      color: #000000;
      padding-bottom: 0.1in;
    }
    .ny-form-notice-box {
      width: 100%;
      height: 0.4in;
      border: 2px solid #000000;
      margin: 0 auto 0.08in auto;
      max-width: 4in;
    }
    .ny-form-notice-title {
      font-size: 11pt;
      font-weight: bold;
      text-align: center;
      margin: 0 0 0.08in 0;
    }
    .ny-form-notice-date {
      text-align: center;
      margin-bottom: 0.08in;
      font-size: 9.5pt;
    }
    .ny-form-notice-date .ny-form-ul {
      display: inline-block;
      border-bottom: 1px solid #000000;
      min-width: 1.5in;
      min-height: 1em;
    }
    .ny-form-notice-text {
      text-align: justify;
      margin: 0 0 0.06in 0;
      font-size: 9.5pt;
      line-height: 1.35;
    }
    .ny-form-notice-text .ny-form-ul {
      display: inline-block;
      border-bottom: 1px solid #000000;
      min-width: 2in;
      min-height: 1em;
      margin: 0 0.05in;
    }
    .ny-form-ul-insured { min-width: 2.5in; }
    .ny-form-ul-producer { min-width: 2in; }
    .ny-form-notice-list {
      margin: 0.06in 0 0.06in 0.2in;
    }
    .ny-form-notice-list-item {
      margin: 0 0 0.05in 0;
      text-indent: -0.3in;
      padding-left: 0.3in;
      line-height: 1.35;
    }
    .ny-form-cost-title {
      font-size: 10pt;
      font-weight: bold;
      text-align: center;
      text-decoration: underline;
      margin: 0.1in 0 0.08in 0;
    }
    .ny-form-cost-text {
      text-align: justify;
      margin: 0 0 0.06in 0;
      font-size: 9.5pt;
      line-height: 1.35;
    }
    .ny-form-cost-text sup {
      font-size: 7pt;
      vertical-align: super;
    }
    .ny-form-cost-table {
      margin: 0.1in 0;
      font-size: 9.5pt;
    }
    .ny-form-cost-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding: 0.02in 0;
      border-bottom: 1px solid #000000;
    }
    .ny-form-cost-header {
      border-bottom: 2px solid #000000;
      padding-bottom: 0.04in;
      margin-bottom: 0.05in;
    }
    .ny-form-cost-col-left {
      flex: 1;
      padding-right: 0.2in;
    }
    .ny-form-cost-col-right {
      flex: 1;
      text-align: right;
    }
    .ny-form-cost-col-full {
      flex: 1;
    }
    .ny-form-cost-col-amount {
      min-width: 1.5in;
      text-align: right;
      padding-left: 0.2in;
    }
    .ny-form-cost-section {
      margin: 0.08in 0;
    }
    .ny-form-cost-total {
      border-top: 2px solid #000000;
      border-bottom: 3px double #000000;
      padding: 0.05in 0;
      margin-top: 0.05in;
    }
    .ny-form-page3-footer {
      margin-top: 0.1in;
    }
    .ny-form-signature-section {
      margin: 0 0 0.06in 0;
    }
    .ny-form-signature-line {
      border-bottom: 1px solid #000000;
      width: 3.5in;
      min-height: 0.25in;
      margin-bottom: 0.03in;
    }
    .ny-form-signature-label {
      font-size: 8.5pt;
      color: #000;
    }
    .ny-form-footnote {
      margin-top: 0.06in;
      margin-bottom: 0;
      font-size: 8.5pt;
      color: #333;
    }
    .ny-form-footnote sup {
      font-size: 7pt;
      vertical-align: super;
    }
    
    .header-section {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--spacing-lg);
      padding: var(--spacing-md);
      padding-bottom: var(--spacing-md);
      border-bottom: 3px solid #4A9EFF;
      align-items: flex-start;
      background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
      border-radius: 8px 8px 0 0;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
      position: relative;
      overflow: hidden;
    }
    
    .header-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #4A9EFF 0%, #6bb0ff 50%, #4A9EFF 100%);
    }
    
    .header-left,
    .header-right {
      flex: 1;
    }
    
    .logo-small {
      width: 0.5in;
      height: 0.5in;
      background: linear-gradient(135deg, #4A9EFF 0%, #3a7fd4 100%);
      color: #ffffff;
      border-radius: 10px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 18pt;
      margin-bottom: var(--spacing-sm);
      box-shadow: var(--shadow-md);
      border: 2px solid rgba(255, 255, 255, 0.2);
    }
    
    .agency-info {
      font-size: 10pt;
      line-height: 1.7;
      color: #374151;
    }
    
    .agency-info > div {
      margin-bottom: 0.06in;
    }
    
    .agency-name {
      font-weight: 700;
      font-size: 10.5pt;
      margin-bottom: 0.08in;
      color: #1f2937;
    }
    
    .brand-name {
      font-size: var(--font-size-2xl);
      font-weight: 700;
      color: #1f2937;
      letter-spacing: -0.3px;
      margin-bottom: var(--spacing-xs);
      line-height: 1.3;
    }
    
    .brand-subtitle {
      font-size: var(--font-size-base);
      color: #6b7280;
      font-weight: 500;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      font-size: 10pt;
    }
    
    .application-id-section {
      font-size: var(--font-size-base);
      margin-bottom: var(--spacing-md);
      padding: var(--spacing-sm) var(--spacing-md);
      background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
      border-left: 4px solid #4A9EFF;
      border-radius: 8px;
      font-weight: 600;
      color: #1f2937;
      box-shadow: var(--shadow-sm);
      border-top: 1px solid #e5e7eb;
      border-right: 1px solid #e5e7eb;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .two-column-section {
      display: flex;
      gap: 0.4in;
      margin-bottom: 0.3in;
      align-items: flex-start;
    }
    
    .column-left,
    .column-right {
      flex: 1;
    }
    
    .section-title {
      font-size: var(--font-size-xl); /* 22-24px ≈ 16.5-18pt */
      font-weight: 600; /* Inter SemiBold */
      margin-bottom: var(--spacing-sm);
      text-transform: uppercase;
      color: #1f2937;
      letter-spacing: 0.5px;
      line-height: 1.3;
    }
    
    .section-title-underline {
      font-size: var(--font-size-xl); /* 22-24px ≈ 16.5-18pt */
      font-weight: 600; /* Inter SemiBold */
      margin: var(--spacing-md) 0 var(--spacing-sm) 0;
      text-transform: uppercase;
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 6px;
      text-decoration-color: #4A9EFF;
      color: #1f2937;
      letter-spacing: 0.5px;
      line-height: 1.3;
    }
    
    .section-title-uppercase {
      font-size: var(--font-size-xl); /* 22-24px ≈ 16.5-18pt */
      font-weight: 600; /* Inter SemiBold */
      margin: var(--spacing-lg) 0 var(--spacing-md) 0;
      text-transform: uppercase;
      color: #1f2937;
      letter-spacing: 0.5px;
      padding: var(--spacing-xs) var(--spacing-sm);
      padding-bottom: var(--spacing-xs);
      border-bottom: 3px solid #4A9EFF;
      line-height: 1.3;
      background: linear-gradient(135deg, rgba(74, 158, 255, 0.05) 0%, transparent 100%);
      border-radius: 6px 6px 0 0;
      position: relative;
    }
    
    .section-title-uppercase::after {
      content: '';
      position: absolute;
      bottom: -3px;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #4A9EFF 0%, #6bb0ff 50%, #4A9EFF 100%);
    }
    
    .field-row {
      font-size: var(--font-size-base); /* 16-18px ≈ 12-13.5pt - Input text */
      font-weight: 400; /* Inter Regular */
      margin: var(--spacing-sm) 0;
      padding: var(--spacing-xs) var(--spacing-sm);
      line-height: 1.6;
      color: #6b7280;
      border-bottom: 1px dotted #e5e7eb;
      position: relative;
      padding-left: var(--spacing-md);
    }
    
    .field-row::before {
      content: '▸';
      position: absolute;
      left: 0;
      color: #4A9EFF;
      font-weight: 700;
      font-size: 10pt;
    }
    
    .field-row strong {
      color: #1f2937;
      font-weight: 500; /* Inter Medium for field labels */
      font-size: var(--font-size-sm); /* 13-14px ≈ 10-10.5pt */
      letter-spacing: 0.2px;
      display: inline-block;
      min-width: 2.5in;
      margin-right: var(--spacing-xs);
    }
    
    .field-row:last-child {
      border-bottom: none;
    }
    
    .field-value {
      font-size: var(--font-size-base); /* 16-18px ≈ 12-13.5pt - Input text */
      font-weight: 400; /* Inter Regular */
      margin: var(--spacing-xs) 0;
      color: #1f2937;
      line-height: 1.6;
    }
    
    .field-value-large {
      font-size: var(--font-size-xl);
      font-weight: 700;
      margin-top: var(--spacing-sm);
      color: #1f2937;
      letter-spacing: 0.3px;
    }
    
    .quote-information-section,
    .applicant-information-section {
      margin: 0.3in 0;
    }
    
    .coverages-section {
      margin: 0.3in 0;
    }
    
    .coverages-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-sm);
      margin-top: var(--spacing-sm);
      padding: var(--spacing-md);
      background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
      border-radius: 10px;
      border: 1px solid #e5e7eb;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
      position: relative;
    }
    
    .coverages-grid::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, #4A9EFF 0%, transparent 100%);
      border-radius: 10px 10px 0 0;
    }
    
    .coverage-item {
      font-size: var(--font-size-sm);
      padding: var(--spacing-xs) 0;
      line-height: 1.7;
      color: #6b7280;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .coverage-item:last-child {
      border-bottom: none;
    }
    
    .coverage-item strong {
      color: #1f2937;
      font-weight: 600;
      display: inline-block;
      min-width: 2.5in;
    }
    
    .class-code-section {
      display: flex;
      gap: 0.4in;
      margin: 0.3in 0;
      padding: 0.2in;
      background: #f9fafb;
      border-radius: 6px;
    }
    
    .class-code-left,
    .class-code-right {
      flex: 1;
    }
    
    .exposures-grid {
      margin: 0.2in 0;
    }
    
    .exposure-item {
      font-size: var(--font-size-sm);
      margin: var(--spacing-sm) 0;
      line-height: 1.8;
      color: #6b7280;
      padding: var(--spacing-xs) var(--spacing-sm);
      border-bottom: 1px solid #e5e7eb;
      background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
      border-radius: 6px;
      border-left: 2px solid #4A9EFF;
      position: relative;
    }
    
    .exposure-item::before {
      content: '●';
      position: absolute;
      left: var(--spacing-xs);
      color: #4A9EFF;
      font-size: 8pt;
    }
    
    .exposure-item:last-child {
      border-bottom: none;
    }
    
    .exposure-item strong {
      color: #1f2937;
      font-weight: 600;
      display: inline-block;
      min-width: 2.5in;
      margin-left: var(--spacing-sm);
    }
    
    .footnote {
      font-size: var(--font-size-xs);
      color: #9ca3af;
      margin: var(--spacing-sm) 0;
      font-style: italic;
      line-height: 1.7;
      padding: var(--spacing-sm) var(--spacing-md);
      background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
      border-left: 3px solid #d1d5db;
      border-radius: 6px;
      box-shadow: var(--shadow-sm);
      position: relative;
    }
    
    .footnote::before {
      content: '※';
      position: absolute;
      left: var(--spacing-xs);
      top: var(--spacing-xs);
      color: #9ca3af;
      font-size: 10pt;
    }
    
    .work-description {
      margin: 0.2in 0;
    }
    
    .description-text {
      font-size: var(--font-size-sm);
      margin-top: var(--spacing-xs);
      padding: var(--spacing-sm);
      background: #ffffff;
      border: 2px solid #d1d5db;
      border-radius: 8px;
      min-height: 0.7in;
      line-height: 1.8;
      color: #1f2937;
      box-shadow: var(--shadow-sm);
      transition: border-color 0.2s;
    }
    
    .description-text:focus {
      border-color: #4A9EFF;
      outline: none;
      box-shadow: 0 0 0 3px rgba(74, 158, 255, 0.1);
    }
    
    .work-percentages,
    .structural-details {
      margin: 0.2in 0;
    }
    
    .percentage-item,
    .detail-item {
      font-size: var(--font-size-sm);
      margin: var(--spacing-sm) 0;
      line-height: 1.8;
      color: #6b7280;
      padding: var(--spacing-xs) var(--spacing-sm);
      background: #ffffff;
      border-left: 2px solid #4A9EFF;
      border-radius: 4px;
      position: relative;
    }
    
    .percentage-item::before,
    .detail-item::before {
      content: '▹';
      position: absolute;
      left: var(--spacing-xs);
      color: #4A9EFF;
      font-size: 8pt;
    }
    
    .percentage-item strong,
    .detail-item strong {
      color: #1f2937;
      font-weight: 600;
      display: inline-block;
      min-width: 2in;
      margin-left: var(--spacing-sm);
    }
    
    .ocip-section {
      margin: 0.2in 0;
    }
    
    .ocip-question,
    .ocip-followup,
    .ocip-receipts,
    .losses {
      font-size: 10pt;
      margin: 0.12in 0;
      line-height: 1.7;
      color: #374151;
    }
    
    .ocip-question strong,
    .ocip-followup strong,
    .ocip-receipts strong,
    .losses strong {
      color: #1f2937;
      font-weight: 600;
    }
    
    .work-experience-questions {
      margin: 0.2in 0;
    }
    
    .question-item {
      margin: var(--spacing-md) 0;
      padding: var(--spacing-md);
      padding-bottom: var(--spacing-md);
      border-bottom: 2px solid #e5e7eb;
      background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
      border-radius: 8px;
      border-left: 3px solid #4A9EFF;
      box-shadow: var(--shadow-sm);
      position: relative;
    }
    
    .question-item::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: linear-gradient(180deg, #4A9EFF 0%, #6bb0ff 100%);
      border-radius: 8px 0 0 8px;
    }
    
    .question-item:last-child {
      border-bottom: none;
    }
    
    .question-text {
      font-size: var(--font-size-sm);
      margin-bottom: var(--spacing-xs);
      line-height: 1.8;
      color: #6b7280;
      text-align: justify;
    }
    
    .question-text strong {
      color: #1f2937;
      font-weight: 700;
      letter-spacing: 0.2px;
    }
    
    .yes-no-options {
      font-size: var(--font-size-sm);
      margin: var(--spacing-xs) 0;
      padding: var(--spacing-xs) var(--spacing-sm);
      font-weight: 600;
      color: #1f2937;
      background: #f9fafb;
      border-radius: 6px;
      display: inline-block;
      border: 1px solid #e5e7eb;
    }
    
    .yes-no-options span {
      margin: 0 var(--spacing-xs);
      padding: 0 var(--spacing-xs);
    }
    
    .yes-no-options span[style*="underline"] {
      color: #4A9EFF;
      font-weight: 700;
    }
    
    .explanation-field {
      font-size: 10pt;
      margin-top: 0.1in;
      padding: 0.1in;
      padding-left: 0.15in;
      background: #f9fafb;
      border-left: 3px solid #d1d5db;
      border-radius: 4px;
      line-height: 1.7;
      color: #374151;
    }
    
    .explanation-field strong {
      color: #1f2937;
      font-weight: 600;
    }
    
    .percentage-field {
      font-size: 10pt;
      margin-top: 0.1in;
      padding: 0.08in 0;
      color: #374151;
    }
    
    .percentage-field strong {
      color: #1f2937;
      font-weight: 600;
    }
    
    .page-number {
      position: absolute;
      bottom: 0.4in;
      right: 0.6in;
      font-size: var(--font-size-xs);
      color: #9ca3af;
      font-weight: 600;
      padding: 0.06in 0.18in;
      background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
      border-radius: 20px;
      border: 1px solid #e5e7eb;
      box-shadow: var(--shadow-sm);
      letter-spacing: 0.5px;
    }
    
    /* Professional Badges */
    .badge {
      display: inline-block;
      padding: 0.05in 0.15in;
      border-radius: 20px;
      font-size: var(--font-size-xs);
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      box-shadow: var(--shadow-sm);
    }
    
    .badge-primary {
      background: #4A9EFF;
      color: #ffffff;
      border: 1px solid #3a7fd4;
    }
    
    .badge-success {
      background: var(--accent-color);
      color: #ffffff;
      border: 1px solid #059669;
    }
    
    .badge-warning {
      background: var(--warning-color);
      color: #ffffff;
      border: 1px solid #d97706;
    }
    
    .badge-secondary {
      background: #f3f4f6;
      color: #1f2937;
      border: 1px solid #d1d5db;
    }
    
    /* Application ID Badge */
    .application-id-badge {
      display: inline-block;
      padding: 0.08in 0.2in;
      background: linear-gradient(135deg, #4A9EFF 0%, #3a7fd4 100%);
      color: #ffffff;
      border-radius: 25px;
      font-size: var(--font-size-sm);
      font-weight: 700;
      letter-spacing: 1px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
      border: 2px solid rgba(255, 255, 255, 0.3);
      position: relative;
    }
    
    .application-id-badge::before {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      right: 2px;
      height: 40%;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, transparent 100%);
      border-radius: 25px 25px 0 0;
      pointer-events: none;
    }
    
    .sub-question-header {
      font-size: var(--font-size-base);
      font-weight: 700;
      margin: var(--spacing-sm) 0 var(--spacing-xs) 0;
      color: #1f2937;
      padding: var(--spacing-sm) var(--spacing-md);
      background: linear-gradient(135deg, #f3f4f6 0%, #f9fafb 100%);
      border-left: 4px solid #4A9EFF;
      border-radius: 6px;
      box-shadow: var(--shadow-sm);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-size: 10pt;
    }
    
    .sub-question-item {
      margin: var(--spacing-sm) 0;
      padding: var(--spacing-sm) var(--spacing-md);
      padding-left: var(--spacing-lg);
      background: #ffffff;
      border-left: 2px solid #d1d5db;
      border-radius: 4px;
      position: relative;
    }
    
    .sub-question-item::before {
      content: '→';
      position: absolute;
      left: var(--spacing-sm);
      color: #4A9EFF;
      font-weight: 700;
    }
    
    .policy-endorsements-content {
      font-size: 11pt;
      margin-top: 0.15in;
      padding: 0.15in;
      background: #f9fafb;
      border-radius: 6px;
      font-weight: 600;
      color: #1f2937;
    }
    
    .notice-content,
    .exclusions-content,
    .agreement-content,
    .terrorism-content {
      font-size: 10pt;
      line-height: 1.8;
      margin: 0.2in 0;
      color: #374151;
    }
    
    .notice-content p,
    .exclusions-content p,
    .agreement-content p,
    .terrorism-content p {
      margin: 0.15in 0;
      text-align: justify;
    }
    
    .initial-line {
      font-size: 10pt;
      margin: 0.2in 0;
      padding-top: 0.15in;
      padding-bottom: 0.1in;
      border-top: 1px solid #e5e7eb;
      color: #374151;
      font-weight: 500;
    }
    
    .signature-section {
      margin-top: var(--spacing-lg);
      padding: var(--spacing-md);
      border-top: 3px solid #4A9EFF;
      background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
      position: relative;
      overflow: hidden;
    }
    
    .signature-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #4A9EFF 0%, #6bb0ff 50%, #4A9EFF 100%);
    }
    
    .signature-field {
      margin: var(--spacing-md) 0;
      padding: var(--spacing-sm);
      background: #ffffff;
      border-radius: 6px;
      border: 1px solid #e5e7eb;
    }
    
    .signature-label {
      font-size: var(--font-size-sm);
      font-weight: 600;
      margin-bottom: var(--spacing-xs);
      color: #1f2937;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-size: 9pt;
    }
    
    .signature-line {
      font-size: var(--font-size-sm);
      border-bottom: 2px dotted #1f2937;
      min-width: 3.5in;
      padding-bottom: var(--spacing-xs);
      color: #1f2937;
      margin-top: var(--spacing-xs);
      background: #ffffff;
    }
    
    .signature-date {
      font-size: var(--font-size-xs);
      color: #6b7280;
      margin-top: var(--spacing-xs);
      font-style: italic;
    }
    
    .carrier-header {
      text-align: center;
      margin-bottom: var(--spacing-lg);
      padding: var(--spacing-md);
      padding-bottom: var(--spacing-md);
      border-bottom: 3px solid #4A9EFF;
      background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
      border-radius: 8px;
      box-shadow: var(--shadow-sm);
    }
    
    .carrier-name-large {
      font-size: var(--font-size-2xl);
      font-weight: 700;
      margin-bottom: var(--spacing-sm);
      color: #1f2937;
      letter-spacing: 0.8px;
      text-transform: uppercase;
    }
    
    .endorsement-notice {
      font-size: 10.5pt;
      font-weight: 700;
      margin: 0.12in 0;
      text-transform: uppercase;
      color: #dc2626;
      letter-spacing: 0.5px;
    }
    
    .carrier-name-medium {
      font-size: 13pt;
      font-weight: 700;
      margin: 0.12in 0;
      color: #1f2937;
    }
    
    .policy-type {
      font-size: 10.5pt;
      margin: 0.08in 0;
      color: #6b7280;
      font-weight: 500;
    }
    
    .document-title {
      font-size: 12pt;
      font-weight: 700;
      margin: 0.2in 0;
      color: #1f2937;
    }
    
    .section-title-bold {
      font-size: var(--font-size-xl); /* 22-24px ≈ 16.5-18pt */
      font-weight: 600; /* Inter SemiBold */
      margin: var(--spacing-md) 0 var(--spacing-md) 0;
      text-transform: uppercase;
      color: #1f2937;
      letter-spacing: 0.5px;
      padding: var(--spacing-xs) var(--spacing-sm);
      border-bottom: 3px solid #4A9EFF;
      background: #f9fafb;
      border-radius: 8px 8px 0 0;
    }
    
    .premium-disclosure-content,
    .certification-content,
    .warranty-content {
      font-size: 10pt;
      line-height: 1.8;
      margin: 0.2in 0;
      color: #374151;
    }
    
    .premium-disclosure-content p,
    .certification-content p,
    .warranty-content p {
      margin: 0.15in 0;
      text-align: justify;
    }
    
    .premium-disclosure-content strong,
    .certification-content strong,
    .warranty-content strong {
      color: #1f2937;
      font-weight: 600;
    }
    
    .rejection-statement-box {
      border: 3px solid var(--warning-color);
      padding: var(--spacing-md);
      margin: var(--spacing-md) 0;
      font-size: var(--font-size-sm);
      background: linear-gradient(135deg, #fef3c7 0%, #fef9e7 100%);
      border-radius: 8px;
      line-height: 1.8;
      color: #1f2937;
      box-shadow: var(--shadow-md);
    }
    
    .applicant-name-large {
      font-size: 13pt;
      font-weight: 700;
      margin-bottom: 0.08in;
      color: #1f2937;
    }
    
    .applicant-address,
    .applicant-city-state-zip,
    .applicant-phone,
    .applicant-email,
    .quote-id {
      font-size: 10pt;
      margin: 0.05in 0;
      line-height: 1.6;
      color: #374151;
    }
    
    .warranty-footer {
      font-size: 9pt;
      line-height: 1.7;
      margin-top: 0.35in;
      padding: 0.15in;
      background: #f9fafb;
      border-left: 3px solid #d1d5db;
      border-radius: 4px;
      color: #374151;
    }
    
    .warranty-footer strong {
      color: #1f2937;
      font-weight: 600;
    }
    
    .invoice-header {
      margin-bottom: 0.3in;
      padding-bottom: 0.2in;
      border-bottom: 2px solid #e5e7eb;
    }
    
    .invoice-field {
      font-size: 10pt;
      margin: 0.08in 0;
      line-height: 1.6;
      color: #374151;
    }
    
    .invoice-field strong {
      color: #1f2937;
      font-weight: 600;
    }
    
    .invoice-section {
      margin: 0.3in 0;
    }
    
    .invoice-section-title {
      font-size: var(--font-size-base);
      font-weight: 700;
      margin-bottom: var(--spacing-sm);
      text-transform: uppercase;
      color: #1f2937;
      letter-spacing: 0.8px;
      padding: var(--spacing-sm) var(--spacing-md);
      border-bottom: 3px solid #4A9EFF;
      background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
      border-radius: 8px 8px 0 0;
      box-shadow: var(--shadow-sm);
      position: relative;
    }
    
    .invoice-section-title::before {
      content: '';
      position: absolute;
      bottom: -3px;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #4A9EFF 0%, #6bb0ff 50%, #4A9EFF 100%);
    }
    
    .invoice-row {
      display: flex;
      justify-content: space-between;
      padding: var(--spacing-xs) var(--spacing-sm);
      border-bottom: 1px solid #e5e7eb;
      font-size: var(--font-size-sm);
      line-height: 1.7;
      color: #6b7280;
      transition: background-color 0.2s;
    }
    
    .invoice-row:nth-child(even) {
      background: #f9fafb;
    }
    
    .invoice-row:hover {
      background: #f3f4f6;
    }
    
    .invoice-row-total {
      display: flex;
      justify-content: space-between;
      padding: var(--spacing-sm) var(--spacing-md);
      border-top: 3px solid #4A9EFF;
      margin-top: var(--spacing-xs);
      font-size: var(--font-size-base);
      font-weight: 700;
      color: #1f2937;
      background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
      border-radius: 0 0 8px 8px;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
      position: relative;
    }
    
    .invoice-row-total::before {
      content: '';
      position: absolute;
      top: -3px;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #4A9EFF 0%, #6bb0ff 50%, #4A9EFF 100%);
    }
    
    .invoice-label {
      flex: 1;
      font-weight: 500;
    }
    
    .invoice-value {
      text-align: right;
      min-width: 1.3in;
      font-weight: 600;
      color: #1f2937;
    }
    
    .invoice-row-total .invoice-label {
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .invoice-row-total .invoice-value {
      font-weight: 700;
      font-size: var(--font-size-lg);
      color: #4A9EFF;
    }
    
    .payment-option {
      font-size: var(--font-size-sm);
      margin: var(--spacing-md) 0;
      padding: var(--spacing-sm) var(--spacing-md);
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
      border-left: 4px solid var(--accent-color);
      border-radius: 8px;
      color: #1f2937;
      font-weight: 600;
      box-shadow: var(--shadow-sm);
      border-top: 1px solid #e5e7eb;
      border-right: 1px solid #e5e7eb;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .payment-option strong {
      color: var(--accent-color);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .binding-statement {
      font-size: 10pt;
      margin: 0.25in 0;
      line-height: 1.7;
      color: #374151;
    }
    
    .invoice-disclaimer {
      font-size: 9pt;
      font-style: italic;
      margin-top: 0.25in;
      line-height: 1.6;
      color: #6b7280;
      padding: 0.1in;
      background: #f9fafb;
      border-radius: 4px;
    }
    
    @media print {
      .page {
        page-break-after: always;
      }
      .page:last-child {
        page-break-after: auto;
      }
    }
  `;


/**
 * Generate the complete 12-page application packet HTML
 */
export async function generateApplicationPacketHTML(data: ApplicationPacketData): Promise<string> {
  // Generate QR codes for all pages upfront (base64 data URLs, no external API calls)
  const qrCodeText = data.applicationId;
  let qrCodeDataUrl: string;

  try {
    qrCodeDataUrl = await generateQRCodeBase64(qrCodeText, 80);
  } catch (error) {
    console.error('[Application Packet] Error generating QR code, using placeholder:', error);
    qrCodeDataUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5RUiBDb2RlPC90ZXh0Pjwvc3ZnPg==';
  }

  // Add QR code data URL to data object for page generation
  const dataWithQR = { ...data, qrCodeDataUrl };


  const pagesBeforeStateForms = [
    generatePage2(dataWithQR),
    generatePage3(dataWithQR),
    generatePage4(dataWithQR),
    generatePage5(dataWithQR),
    generatePage6(dataWithQR),
    generatePage7(dataWithQR),

    ...(data.excludePages8910
      ? []
      : [
        generatePage8(dataWithQR),
        generatePage9(dataWithQR),
        generatePage10(dataWithQR),
      ]),

    generatePage11(dataWithQR),
  ];


  const stateFormPages: string[] = [];
  if (data.includeStateForms && data.applicantState) {
    const stateCode = toStateCode(data.applicantState);
    if (stateCode === 'PA') {
      stateFormPages.push(generatePennsylvaniaFormPage1(dataWithQR));
      stateFormPages.push(generatePennsylvaniaFormPage2(dataWithQR));
    } else if (stateCode === 'WA') {
      stateFormPages.push(generateWashingtonFormPage(dataWithQR));
    } else if (stateCode === 'TX') {
      const sltxLogo = await loadSltxLogo();
      stateFormPages.push(generateTexasFormPage(dataWithQR, sltxLogo));
    } else if (stateCode === 'OR') {
      stateFormPages.push(generateOregonFormPage(dataWithQR));
    } else if (stateCode === 'NV') {
      stateFormPages.push(generateNevadaFormPage(dataWithQR));
    } else if (stateCode === 'FL') {
      stateFormPages.push(generateFloridaFormPage(dataWithQR));
    } else if (stateCode === 'CA') {
      stateFormPages.push(generateCaliforniaFormPage1(dataWithQR));
      stateFormPages.push(generateCaliforniaFormPage2(dataWithQR));
      stateFormPages.push(generateCaliforniaFormPage3(dataWithQR));
    } else if (stateCode === 'CO') {
      stateFormPages.push(generateColoradoFormPage(dataWithQR));
    } else if (stateCode === 'NY') {
      stateFormPages.push(generateNewYorkFormPage(dataWithQR));
      stateFormPages.push(generateNewYorkFormPage2(dataWithQR));
      stateFormPages.push(generateNewYorkFormPage3(dataWithQR));
    } else {
      stateFormPages.push(generateStateFormsPage(dataWithQR));
    }
  }
  // const pages = [...pagesBeforeStateForms, ...stateFormPages, generatePage12(dataWithQR)].join('');
  const pages = [...pagesBeforeStateForms, ...stateFormPages].join('');
  // Minify page body to reduce HTML size (PDFShift 2MB limit)
  const pagesMinified = pages.replace(/>\s+</g, '><').replace(/\s+/g, ' ');

  // Optimize CSS and minify HTML to reduce size for PDFShift 2MB limit
  const optimizedCSS = optimizeCSS(cssContent);
  const fullHTML = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${optimizedCSS}</style></head><body>${pagesMinified}</body></html>`;

  return minifyHTML(fullHTML);
}

export async function generateInvoiceHTML(
  data: ApplicationPacketData
): Promise<string> {
  const qrCodeText = data.applicationId;
  let qrCodeDataUrl: string;

  try {
    qrCodeDataUrl = await generateQRCodeBase64(qrCodeText, 80);
  } catch {
    qrCodeDataUrl = '';
  }

  const dataWithQR = { ...data, qrCodeDataUrl };

  const invoicePage = generatePage12(dataWithQR);

  const optimizedCSS = optimizeCSS(cssContent);

  const fullHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>${optimizedCSS}</style>
      </head>
      <body>
        ${invoicePage}
      </body>
    </html>
  `;

  return minifyHTML(fullHTML);
}


/**
 * Optimize CSS by removing unnecessary whitespace and comments
 */
function optimizeCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/\s*{\s*/g, '{')
    .replace(/\s*}\s*/g, '}')
    .replace(/\s*:\s*/g, ':')
    .replace(/\s*;\s*/g, ';')
    .replace(/\s*,\s*/g, ',')
    .replace(/;}/g, '}')
    .trim();
}

/**
 * Minify HTML by removing unnecessary whitespace and optimizing SVG
 */
function minifyHTML(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/>\s+</g, '><') // Remove space between tags
    // Optimize SVG content - remove unnecessary whitespace in paths and attributes
    .replace(/(<svg[^>]*>)/gi, (match) => match.replace(/\s+/g, ' ').replace(/\s*=\s*/g, '='))
    .replace(/(<path[^>]*>)/gi, (match) => match.replace(/\s+/g, ' ').replace(/\s*=\s*/g, '='))
    .replace(/(<circle[^>]*>)/gi, (match) => match.replace(/\s+/g, ' ').replace(/\s*=\s*/g, '='))
    .replace(/(<ellipse[^>]*>)/gi, (match) => match.replace(/\s+/g, ' ').replace(/\s*=\s*/g, '='))
    .replace(/(<rect[^>]*>)/gi, (match) => match.replace(/\s+/g, ' ').replace(/\s*=\s*/g, '='))
    .replace(/(<polygon[^>]*>)/gi, (match) => match.replace(/\s+/g, ' ').replace(/\s*=\s*/g, '='))
    .replace(/(<polyline[^>]*>)/gi, (match) => match.replace(/\s+/g, ' ').replace(/\s*=\s*/g, '='))
    .replace(/(<defs[^>]*>)/gi, (match) => match.replace(/\s+/g, ' ').replace(/\s*=\s*/g, '='))
    .replace(/(<linearGradient[^>]*>)/gi, (match) => match.replace(/\s+/g, ' ').replace(/\s*=\s*/g, '='))
    .replace(/(<stop[^>]*>)/gi, (match) => match.replace(/\s+/g, ' ').replace(/\s*=\s*/g, '='))
    .trim();
}

