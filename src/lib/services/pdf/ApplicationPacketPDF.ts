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
  paymentOption?: string;

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
  submissionNumber?: string;
  premium?: string;
  stateTax?: string;
  associationDues?: string;
  policyFee?: string;
  inspectionFee?: string;
  surplusLinesTax?: string;
  carrierPolicyFee?: string;
  sterlingFees?: string;
  stampingFee?: string;
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
  totalToFinanceCompany?: string;
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
<svg xmlns="http://www.w3.org/2000/svg" width="190" viewBox="0 0 612 408">
<image href="data:image/png;base64,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GGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGNF+38Utz5fQqx+vgAAAABJRU5ErkJggg==" width="612" height="408" />
</svg>
`;

const sjjLogoSVG = `
<svg 
  viewBox="0 0 1600 1600"
  width="190"
  preserveAspectRatio="xMidYMid meet"
  xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0, -350)">
<path fill="#FDFEFF" opacity="1.000000" stroke="none" 
	d="
M888.000000,1601.000000 
	C592.000000,1601.000000 296.500000,1601.000000 1.000000,1601.000000 
	C1.000000,1067.666626 1.000000,534.333313 1.000000,1.000000 
	C534.333313,1.000000 1067.666626,1.000000 1601.000000,1.000000 
	C1601.000000,534.333313 1601.000000,1067.666626 1601.000000,1601.000000 
	C1363.500000,1601.000000 1126.000000,1601.000000 888.000000,1601.000000 
M370.045471,872.092163 
	C370.045471,872.092163 370.184814,872.023865 370.551025,871.745117 
	C370.776306,871.521179 370.920624,871.253601 371.130402,870.393555 
	C371.225067,870.229675 371.319763,870.065735 371.670532,869.704163 
	C371.821014,869.545898 371.942627,869.367920 372.018921,869.054871 
	C372.018921,869.054871 372.131714,869.025696 372.521759,868.752563 
	C372.762695,868.527039 372.914001,868.252075 373.089691,867.405884 
	C373.166748,867.245361 373.243774,867.084839 373.626282,866.709167 
	C373.807251,866.528809 373.934998,866.316345 374.191406,865.451477 
	C374.291748,865.260803 374.392090,865.070129 374.699371,864.709534 
	C374.820831,864.578125 374.929718,864.437012 375.058624,864.121033 
	C375.058624,864.121033 375.213776,864.055542 375.863220,863.880981 
	C376.603760,862.281860 377.344269,860.682739 378.764069,858.911987 
	C382.082825,855.672363 385.172943,852.329285 384.794434,846.901123 
	C388.818756,844.824829 388.058777,841.148682 388.259613,837.059265 
	C390.835510,828.706360 393.411377,820.353516 396.686188,811.882629 
	C396.733643,810.564270 396.781097,809.245972 396.821777,807.253906 
	C396.941986,806.822510 397.062225,806.391174 397.651062,805.456604 
	C397.720978,804.776001 397.790894,804.095398 397.615417,802.960266 
	C397.722565,802.640808 397.829712,802.321350 398.739380,801.831055 
	C399.125763,797.037231 399.512115,792.243408 399.658295,786.851501 
	C399.741333,786.216980 399.824341,785.582397 400.504089,784.377136 
	C400.641785,783.570129 400.898895,782.763306 400.899841,781.956177 
	C400.930603,755.228699 400.950134,728.501282 400.903473,701.773865 
	C400.901367,700.564758 400.267822,699.356628 399.127502,697.995911 
	C393.029297,696.996094 386.868408,696.276917 380.847168,694.932373 
	C371.183014,692.774414 361.611237,690.202759 351.854492,687.124268 
	C346.860718,685.765320 341.866913,684.406372 336.102509,683.067383 
	C334.162170,682.329590 332.189056,681.667297 330.287140,680.841064 
	C321.933289,677.211853 313.578522,673.583252 305.266113,669.860657 
	C298.563873,666.859070 291.657898,664.182556 285.314911,660.539124 
	C275.852478,655.103943 266.864044,648.848572 257.514221,643.206787 
	C256.229736,642.431702 253.623123,642.518494 252.317841,643.323547 
	C244.169525,648.349609 236.448700,654.100891 228.137634,658.822266 
	C219.054779,663.982056 209.664719,668.699890 200.077560,672.844727 
	C190.909775,676.808289 181.397964,680.037537 171.889648,683.136353 
	C160.347916,686.898071 148.750793,690.579163 136.988281,693.543884 
	C128.561386,695.667969 119.823364,696.557739 111.256760,697.992676 
	C110.839844,700.453735 110.252373,702.363647 110.234497,704.278870 
	C110.114723,717.109314 110.116188,729.940857 110.197205,743.273560 
	C110.436279,743.511414 110.675346,743.749329 111.084648,744.912903 
	C111.081718,756.927490 111.078781,768.942017 110.468391,781.514771 
	C111.001411,785.682922 111.534439,789.851135 112.119400,794.900696 
	C113.451729,801.804626 114.784050,808.708496 116.155434,816.130005 
	C116.352531,816.403809 116.549622,816.677551 116.987541,817.608215 
	C116.990982,818.072327 116.994431,818.536377 116.491440,819.394714 
	C116.977631,820.263184 117.463829,821.131714 118.167107,822.305481 
	C118.167107,822.305481 118.109184,822.675537 118.043221,823.588684 
	C117.881851,827.925354 118.018715,832.152344 122.130699,834.950073 
	C122.130699,834.950073 122.110489,834.863403 122.038582,835.733887 
	C122.143188,839.054016 120.933792,842.987244 125.985390,844.050720 
	C125.985390,844.050720 125.948822,844.117371 125.980095,844.910217 
	C127.342308,847.595032 128.704514,850.279785 130.002945,852.992249 
	C130.002945,852.992249 130.031738,852.929016 130.146530,853.337830 
	C130.269470,853.604614 130.460968,853.806274 131.012405,854.332275 
	C131.012405,854.332275 131.056458,854.816772 131.148529,855.267151 
	C131.263870,855.565369 131.461639,855.791382 132.028778,856.299255 
	C132.028778,856.299255 132.093704,856.750305 132.039276,857.559204 
	C133.402771,859.679810 134.766266,861.800354 136.044281,863.984802 
	C136.044281,863.984802 136.084427,863.885986 136.031464,864.674011 
	C137.062241,866.089966 138.093033,867.505920 139.039230,868.990051 
	C139.039230,868.990051 139.082642,868.890503 139.037689,869.654968 
	C141.560104,873.106506 144.082520,876.558044 146.956802,880.640503 
	C148.636002,882.849670 150.315201,885.058777 152.000656,887.999207 
	C152.983597,889.006287 153.966537,890.013367 155.000610,891.000183 
	C155.000610,891.000183 154.990341,891.054260 155.202515,891.459412 
	C155.388123,891.712524 155.626770,891.896973 156.401337,892.269226 
	C156.580917,892.579590 156.760483,892.889954 156.992310,893.864868 
	C157.645813,894.580872 158.299301,895.296814 159.516861,896.221680 
	C160.008316,896.825623 160.499756,897.429504 161.006805,898.770508 
	C162.278229,899.871216 163.549667,900.971863 164.936783,902.072632 
	C164.936783,902.072632 164.923859,902.187561 164.975632,902.969971 
	C164.660583,907.352600 166.675385,909.379272 171.487518,909.499268 
	C173.335220,911.162292 175.130692,912.888123 177.039993,914.477234 
	C184.020721,920.287109 191.039398,926.051453 198.340286,932.445557 
	C199.914658,933.379395 201.489014,934.313293 203.265915,935.576843 
	C203.441772,935.774658 203.653549,935.920166 204.371048,936.201660 
	C204.585312,936.455139 204.799591,936.708679 205.061569,937.617249 
	C206.041916,938.076660 207.022247,938.536072 208.612274,939.074768 
	C209.071091,939.444153 209.529907,939.813538 210.251175,940.544922 
	C210.462646,940.769287 210.717987,940.918762 210.998108,940.998840 
	C210.998108,940.998840 211.010727,940.981750 211.011566,941.723267 
	C211.763458,946.756836 215.075546,946.970703 218.996429,945.996338 
	C218.996429,945.996338 219.017746,945.967957 219.111908,946.677795 
	C220.821976,948.614624 222.532043,950.551514 224.470566,952.747131 
	C225.510117,952.219055 226.769760,951.579224 228.726364,951.051880 
	C240.817978,958.857422 253.364182,964.086914 268.724304,957.990906 
	C271.712555,958.317017 274.482056,959.262756 277.478424,956.901672 
	C281.119812,954.032166 285.625885,952.288391 289.466919,949.636292 
	C293.799194,946.644897 297.807861,943.184814 302.006775,939.983337 
	C302.006775,939.983337 301.938843,939.954468 302.698242,939.995056 
	C303.909241,940.196411 305.120239,940.397766 306.696899,940.659851 
	C306.766541,939.282288 306.827301,938.079651 307.007965,936.925598 
	C307.007965,936.925598 306.884338,936.897278 307.554077,936.890259 
	C308.030884,936.251587 308.507660,935.612915 309.001312,934.999329 
	C309.001312,934.999329 308.976990,934.983459 309.698120,934.984436 
	C310.456177,934.296387 311.214203,933.608337 312.242371,932.375549 
	C313.093994,931.888733 313.945587,931.401917 315.609650,930.969360 
	C319.070587,931.161621 321.019867,929.692993 321.586121,925.720642 
	C324.087158,923.374329 326.588165,921.028015 329.693573,918.507019 
	C333.458527,914.988281 337.223511,911.469543 341.452148,907.818542 
	C341.767487,907.614319 341.870758,907.332397 342.077667,906.344788 
	C346.303345,901.865601 350.529053,897.386414 355.491913,892.915100 
	C359.768463,889.200195 365.145813,886.263000 365.520081,878.947388 
	C366.408661,877.637878 367.297272,876.328369 368.550903,874.747742 
	C368.775665,874.528748 368.920441,874.265747 369.133789,873.392273 
	C369.234985,873.225342 369.336182,873.058472 369.672485,872.714050 
	C369.811096,872.572754 369.930908,872.416992 370.045471,872.092163 
M476.293884,820.261047 
	C476.293884,820.261047 476.552979,820.145935 477.226135,820.585083 
	C479.812744,820.413208 481.339417,819.470093 480.306763,816.311523 
	C480.306763,816.311523 480.548492,816.157837 481.254852,816.615417 
	C483.118591,815.604492 484.982300,814.593567 486.846008,813.582581 
	C486.147705,812.695435 485.449402,811.808228 484.965942,810.195129 
	C489.584656,800.607849 488.986572,791.259888 484.361328,781.853333 
	C485.544617,781.015503 486.727905,780.177612 488.869293,778.661377 
	C484.582458,777.612976 481.580994,776.878906 478.024841,775.887024 
	C477.173126,775.014099 476.321381,774.141235 476.144623,772.857422 
	C477.204956,768.005981 473.393524,770.773987 471.401520,770.045959 
	C471.122498,769.971436 470.933868,769.798340 470.915863,768.709778 
	C469.078217,766.473511 467.026886,764.377625 465.446564,761.972290 
	C461.963989,756.671692 456.687042,754.926941 450.331573,753.874939 
	C449.874420,753.285828 449.417236,752.696716 448.983978,751.227600 
	C448.649689,748.802551 448.646454,746.271301 447.910217,743.975159 
	C446.500580,739.578918 447.255798,738.108948 451.825867,736.987915 
	C453.636688,736.543762 455.316132,735.563904 457.852631,734.490723 
	C456.237091,733.477966 455.797485,733.263489 455.434021,732.958252 
	C455.023590,732.613708 454.681488,732.187683 454.214600,731.697144 
	C460.283234,729.063599 467.745667,732.539185 470.901642,739.138794 
	C474.574585,746.819458 480.018188,748.706909 487.163788,744.236877 
	C488.928772,743.132751 489.686737,740.418823 490.907623,738.444824 
	C489.004272,737.628967 487.100922,736.813110 485.028961,735.341675 
	C485.060760,734.894714 485.092590,734.447693 485.847473,733.897217 
	C490.410583,731.001892 489.287628,726.548523 488.479431,722.565430 
	C488.117310,720.780823 486.188599,718.578796 483.137421,721.181702 
	C481.802460,720.954346 480.467499,720.726990 478.996613,719.692566 
	C476.993103,716.035767 473.907593,716.829041 470.762878,717.624939 
	C469.596130,717.920227 468.159851,718.409973 467.194183,717.997253 
	C464.589752,716.884338 462.172333,715.333740 459.680695,713.956848 
	C459.634338,714.475220 459.587982,714.993652 459.541626,715.512085 
	C457.165985,716.008484 454.805573,716.800232 452.410767,716.923462 
	C449.665955,717.064697 447.808350,717.664795 447.259247,721.023865 
	C444.146118,722.704956 440.849121,724.119995 437.956207,726.119629 
	C430.831696,731.044373 424.314728,747.212952 430.834167,757.306885 
	C435.833435,765.047241 442.540405,770.608887 449.777222,775.952209 
	C457.059296,781.328979 465.418945,785.475891 469.930359,794.162415 
	C473.033173,800.136719 473.114380,806.834229 468.915466,812.660217 
	C465.150879,817.883606 457.399139,820.870422 451.657532,819.563782 
	C442.396210,817.456238 436.788818,811.275574 433.050171,803.061707 
	C431.905487,800.546875 430.126373,799.005676 427.773376,800.268311 
	C426.109467,801.161255 424.153076,803.556030 424.211365,805.214111 
	C424.364532,809.571777 425.065948,814.062683 426.509277,818.162415 
	C427.313171,820.446045 429.723389,823.132568 431.947968,823.775635 
	C440.402191,826.219910 448.812653,830.056335 458.093262,827.729919 
	C458.424072,828.015930 458.754913,828.301941 459.085724,828.588013 
	C459.390472,828.081787 459.695251,827.575562 460.661652,826.893494 
	C461.107727,826.986938 461.553833,827.080444 462.096039,827.870300 
	C464.100739,831.622559 466.779297,833.237915 470.155579,831.448364 
	C469.628815,828.663513 469.244965,826.634094 469.269653,824.138489 
	C470.582336,823.602600 471.894989,823.066650 474.093445,822.817261 
	C474.762238,822.034058 475.431030,821.250916 476.293884,820.261047 
M953.075134,817.557312 
	C955.372620,816.824707 962.133606,807.670349 961.614929,805.573425 
	C961.056580,803.316528 959.988708,801.185669 959.042725,798.201050 
	C959.137695,797.135559 959.232666,796.070129 960.000488,794.881531 
	C962.461182,793.362610 963.092285,791.984985 959.576904,790.187317 
	C959.661926,789.458374 959.746948,788.729431 960.607422,787.876648 
	C961.404846,785.145996 962.830444,782.428589 962.888489,779.682190 
	C963.111511,769.136353 963.052307,758.576355 962.724548,748.033264 
	C962.650879,745.664307 961.066467,743.342346 960.063110,740.186462 
	C960.339172,737.457397 960.615234,734.728271 961.608337,731.936829 
	C962.552246,731.307556 963.475891,730.645142 964.444214,730.055847 
	C966.579224,728.756592 969.811462,725.919312 970.682190,726.513611 
	C973.231995,728.253845 976.244507,731.201721 976.571045,733.971741 
	C977.694397,743.500427 977.594910,753.166809 978.319153,762.753662 
	C978.505432,765.220032 980.004456,767.587280 981.069397,770.923889 
	C981.011169,777.949219 980.953003,784.974548 980.228271,792.131653 
	C980.429138,793.421448 980.629944,794.711182 980.973206,796.792969 
	C980.925903,797.861633 980.878601,798.930237 980.125793,800.161011 
	C979.687439,803.060425 978.689270,806.008728 978.937561,808.848022 
	C979.342957,813.484985 977.380615,818.260376 974.421692,817.541687 
	C971.065796,816.726562 968.588501,817.912292 968.433960,820.792114 
	C968.230347,824.584656 969.402466,828.457886 970.123718,832.269836 
	C970.154541,832.432739 971.640503,832.502808 972.375671,832.321228 
	C978.687073,830.762085 984.933411,828.831055 991.591064,829.849182 
	C992.329712,829.962097 993.217590,829.117554 993.951904,829.236755 
	C996.440063,829.640564 998.903992,830.224243 1001.350891,830.842834 
	C1003.383545,831.356750 1005.379272,832.016968 1007.391296,832.612366 
	C1007.667847,831.012756 1007.935181,829.411499 1008.223389,827.814026 
	C1008.632080,825.548096 1009.166382,823.296875 1009.414734,821.014160 
	C1009.503235,820.200256 1009.173706,818.879211 1008.591370,818.530762 
	C1005.364624,816.599548 1002.001099,814.896790 998.094971,812.494385 
	C998.094971,801.697266 998.094971,790.900146 998.094971,780.174316 
	C1005.175659,778.129578 1009.138306,778.532349 1011.587158,781.845093 
	C1014.292297,785.504333 1016.656311,789.414185 1019.312378,793.111755 
	C1025.406616,801.595520 1030.832031,810.721252 1037.902222,818.306458 
	C1050.039062,831.327576 1060.592651,833.435120 1076.155640,827.835876 
	C1077.302124,827.423340 1077.966431,825.671143 1078.854980,824.541809 
	C1077.569702,824.139832 1076.086304,823.109375 1075.032715,823.441833 
	C1069.702271,825.123169 1064.747437,823.671997 1061.064453,820.378662 
	C1055.527710,815.427612 1050.529175,809.763367 1045.928589,803.909790 
	C1041.838135,798.705200 1038.542969,792.866699 1035.007080,787.238708 
	C1032.821533,783.759949 1030.842285,780.151611 1028.752563,776.570862 
	C1040.795654,770.893250 1046.820923,761.384888 1046.658447,749.118408 
	C1046.487549,736.226929 1039.405640,727.222412 1026.981323,722.103027 
	C1025.706909,720.722107 1024.431763,719.341919 1023.158203,717.960022 
	C1019.064331,713.518127 1014.683350,714.372009 1011.236145,720.395813 
	C1008.491150,720.541382 1005.746094,720.686951 1002.884399,720.200256 
	C1001.922668,720.414856 1000.960876,720.629395 999.110657,720.998840 
	C991.407715,720.943665 983.704773,720.888428 975.999084,720.083313 
	C975.218994,716.454773 965.885925,712.731628 962.013428,714.716064 
	C959.563110,715.971741 955.977600,716.601196 956.255554,720.968750 
	C955.504333,720.922119 954.753052,720.875427 953.977600,720.083740 
	C952.678711,719.064758 951.497620,717.814575 950.054321,717.078979 
	C947.677124,715.867432 945.130310,714.988953 942.050049,713.721008 
	C942.394043,713.549988 941.984314,713.874939 941.529236,713.961060 
	C937.291870,714.763184 935.462769,717.712830 935.407715,721.606140 
	C935.360046,724.981750 937.111938,727.167908 940.545898,728.661133 
	C942.149475,729.358459 943.256348,732.552307 943.505188,734.737915 
	C944.079956,739.786926 944.122498,744.910461 944.149780,750.005005 
	C944.219604,763.039551 944.067444,776.075989 944.237427,789.108643 
	C944.271790,791.745911 945.333008,794.369873 946.270691,797.691101 
	C945.902161,798.814087 945.533691,799.937073 944.379578,801.036377 
	C938.706299,801.522034 939.471619,807.167786 937.034058,810.245728 
	C935.893005,811.686523 935.318726,814.064819 933.896118,814.706055 
	C928.828552,816.990356 923.577881,818.879333 917.753235,818.094360 
	C916.528076,817.929199 915.142151,818.957581 913.071228,819.286377 
	C907.730286,818.549011 903.534119,815.841858 901.864746,810.764221 
	C900.088196,805.360535 898.319031,799.669373 898.182434,794.063904 
	C897.729004,775.458191 897.837463,756.831909 898.112061,738.219177 
	C898.200256,732.244324 898.814270,726.019104 904.783325,722.238586 
	C905.066162,722.059448 904.819702,721.044556 904.819702,720.042542 
	C894.635071,720.042542 884.600952,720.014648 874.568237,720.122314 
	C874.049255,720.127930 873.542786,721.292175 873.012085,722.796082 
	C873.752197,727.058228 874.492371,731.320435 875.260925,735.745911 
	C877.129944,735.845886 878.570007,735.922974 880.341064,736.817383 
	C880.490845,742.210693 880.640625,747.604004 880.029602,753.001892 
	C878.932739,753.544312 876.971741,753.968750 876.878967,754.648193 
	C876.271057,759.101013 876.002563,763.605347 875.755859,768.100159 
	C875.613403,770.695740 876.330750,773.498596 875.580872,775.866028 
	C874.180847,780.286499 875.644531,784.093201 880.577820,786.737793 
	C880.553528,787.785645 880.529236,788.833435 879.725708,789.898499 
	C878.336243,789.721558 876.946716,789.544556 875.557251,789.367554 
	C875.494446,789.872314 875.431580,790.377075 875.368774,790.881836 
	C877.173828,791.255493 878.978882,791.629089 880.932739,792.892029 
	C880.904358,795.594543 880.875977,798.297119 880.202087,801.120483 
	C880.465576,802.080322 880.729004,803.040161 881.118225,804.738159 
	C881.531738,806.109314 881.945312,807.480469 881.692383,809.306396 
	C880.365845,815.065430 881.109436,816.271606 886.880554,817.168091 
	C887.625854,818.096985 888.371155,819.025940 888.462952,820.229126 
	C887.422852,820.778870 886.382812,821.328613 885.161072,821.974365 
	C888.975464,823.975159 892.737488,825.257202 895.603943,827.623962 
	C899.334412,830.703979 904.304016,831.241516 908.958618,827.999084 
	C913.305786,828.024597 917.652954,828.050049 922.083862,828.658081 
	C922.408508,828.963806 922.733093,829.269531 923.057678,829.575195 
	C923.371765,829.066162 923.685852,828.557129 924.851807,827.826294 
	C926.890015,827.848022 928.928223,827.869690 930.986633,828.670105 
	C931.478210,829.778137 931.969788,830.886230 932.461304,831.994263 
	C932.824036,831.805725 933.186768,831.617188 933.549500,831.428650 
	C933.366821,830.004761 933.184204,828.580811 933.715149,826.971252 
	C935.142883,826.705566 936.570557,826.439880 938.003906,826.955383 
	C938.069885,831.204895 940.837036,830.377930 943.084045,829.316406 
	C945.103088,828.362671 946.616394,825.873657 948.633972,825.470947 
	C954.081909,824.383606 953.509033,821.236877 952.299438,817.283325 
	C952.299438,817.283325 952.439575,817.105469 953.075134,817.557312 
M1412.135742,823.131531 
	C1412.135742,823.131531 1412.236938,823.161438 1411.443237,823.141296 
	C1410.639648,824.706055 1409.472778,826.207031 1409.182373,827.861816 
	C1409.032593,828.715942 1410.437134,830.710388 1411.144775,830.712952 
	C1418.146484,830.738831 1425.158203,830.609131 1432.149536,830.214722 
	C1438.791870,829.840027 1445.406250,828.988037 1452.046997,828.565186 
	C1454.991089,828.377747 1457.968994,828.794434 1460.932617,828.821655 
	C1464.836670,828.857483 1468.762207,829.014526 1472.640015,828.676941 
	C1475.759521,828.405212 1479.869995,829.652710 1481.138794,824.262451 
	C1481.720703,823.827087 1482.302490,823.391785 1483.760620,822.981567 
	C1485.363525,822.893250 1486.966553,822.804932 1487.753174,822.761597 
	C1490.687622,815.698975 1493.309326,809.389099 1495.943604,803.048767 
	C1490.312012,799.503906 1484.533813,799.607483 1478.960571,801.251404 
	C1477.275146,801.748474 1476.432739,804.881287 1475.031128,806.671204 
	C1474.474121,807.382629 1473.505127,807.880371 1472.624390,808.211365 
	C1468.010742,809.945251 1465.904419,813.294739 1465.313110,818.589050 
	C1462.208984,818.677002 1459.104858,818.764954 1455.853760,818.150574 
	C1454.449707,817.435303 1452.882202,816.925659 1451.673218,815.964905 
	C1448.412964,813.373901 1443.385132,811.096802 1442.512573,807.784973 
	C1440.258423,799.230652 1440.134155,790.171204 1442.191895,781.351501 
	C1442.452881,780.232422 1443.551514,778.984924 1444.597778,778.432068 
	C1448.087524,776.588196 1458.925659,778.145508 1461.475708,781.097473 
	C1464.522949,784.624756 1467.588501,786.206360 1472.550537,785.200012 
	C1476.458252,784.407349 1478.096436,783.064636 1478.034302,779.169739 
	C1477.948242,773.778748 1478.112671,768.384033 1478.151489,762.990784 
	C1478.172485,760.065063 1478.155273,757.139160 1478.155273,754.352173 
	C1474.019287,755.052185 1471.126465,755.366333 1468.340942,756.091858 
	C1467.069214,756.423035 1466.041748,757.621033 1464.846802,758.330688 
	C1461.148315,760.527344 1457.599854,763.132324 1453.641235,764.676758 
	C1451.263062,765.604553 1448.161865,765.200867 1445.518677,764.697388 
	C1444.285645,764.462585 1442.913574,762.735718 1442.424561,761.387573 
	C1441.830322,759.749756 1442.508057,757.642761 1441.890381,756.023010 
	C1441.187378,754.180359 1439.661621,752.651489 1438.297729,750.337830 
	C1438.364014,749.896240 1438.430298,749.454590 1439.204346,748.969604 
	C1440.118286,747.767456 1441.673584,746.641113 1441.826050,745.349121 
	C1442.285278,741.459656 1442.287720,737.505798 1442.292358,733.576843 
	C1442.295288,731.055420 1442.161499,729.026306 1445.885864,729.554565 
	C1447.114624,729.728821 1448.620850,727.948059 1450.898560,726.876099 
	C1455.281860,727.540405 1459.665161,728.204712 1464.099976,729.663574 
	C1464.503540,735.763367 1469.071533,735.623535 1473.922485,736.318970 
	C1475.830322,736.207153 1477.738037,736.095337 1480.486328,735.922058 
	C1485.127563,733.991394 1482.304932,729.960693 1482.943359,726.927612 
	C1483.545654,724.065979 1482.112793,722.630310 1478.915405,722.441895 
	C1477.276978,721.632080 1475.638428,720.822205 1473.988281,719.239014 
	C1473.100830,714.311951 1469.778564,714.542480 1466.134521,715.578430 
	C1465.069092,715.881348 1464.068237,716.735840 1463.028564,716.752075 
	C1457.332764,716.840881 1451.592896,717.151123 1445.950806,716.575745 
	C1442.159424,716.189148 1440.972046,718.015076 1439.076904,720.985657 
	C1434.385254,720.933777 1429.693481,720.881958 1424.970459,720.066895 
	C1420.597778,718.446350 1416.308838,716.452637 1411.799561,715.440125 
	C1410.501221,715.148560 1407.610229,717.344421 1410.050659,720.642090 
	C1410.056641,721.033752 1410.062622,721.425476 1410.094604,722.578857 
	C1411.286987,724.840454 1411.936401,727.806641 1413.778076,729.225769 
	C1418.466797,732.838745 1419.448364,736.894043 1418.539795,742.629028 
	C1418.024780,745.880249 1417.170044,750.397217 1421.512695,753.776245 
	C1421.479858,755.149536 1421.447021,756.522766 1420.634033,758.027954 
	C1418.857544,761.324463 1415.000977,764.301636 1419.444214,768.456726 
	C1420.178711,769.143616 1419.964722,770.975098 1419.978149,772.279907 
	C1420.031006,777.434143 1420.097046,782.591736 1419.964966,787.743103 
	C1419.880737,791.026367 1419.285889,794.297546 1419.222778,797.580017 
	C1419.107422,803.582642 1419.216675,809.589600 1419.221802,815.879211 
	C1419.221802,815.879211 1418.963867,815.999878 1418.188965,816.000610 
	C1413.127197,815.867676 1412.738647,819.625977 1412.135742,823.131531 
M1109.543823,858.817505 
	C1109.739990,858.676147 1109.883789,858.493713 1110.901001,858.095093 
	C1117.548096,858.087524 1124.197510,857.974487 1130.841553,858.114197 
	C1134.486694,858.190857 1134.531372,856.565186 1133.574829,854.156494 
	C1123.545898,854.156494 1113.821655,854.156494 1103.869141,854.156494 
	C1103.869141,861.611938 1103.869141,868.737122 1103.869141,875.862305 
	C1103.869141,883.120911 1103.869141,890.379578 1103.869141,897.828918 
	C1114.415039,897.828918 1124.481567,897.828918 1134.612305,897.828918 
	C1135.561157,895.093567 1135.102783,893.830383 1131.904663,893.884766 
	C1124.599854,894.009033 1117.289795,893.833435 1109.799805,893.452698 
	C1109.642334,893.249756 1109.442993,893.104248 1109.046387,892.090332 
	C1109.046387,887.352844 1109.046387,882.615417 1109.046387,877.743713 
	C1115.515503,877.743713 1121.314331,877.872437 1127.099976,877.652649 
	C1128.536377,877.598145 1129.930054,876.415283 1131.343384,875.751038 
	C1129.861572,874.998779 1128.430298,873.748657 1126.887939,873.591797 
	C1122.955078,873.191650 1118.972412,873.279297 1114.943604,872.618469 
	C1113.264282,870.299133 1111.971191,870.678162 1110.225464,873.394836 
	C1109.894287,868.590271 1109.562988,863.785645 1109.543823,858.817505 
M789.530823,858.818604 
	C789.733643,858.675232 789.882141,858.488586 790.903992,858.097595 
	C798.685059,858.097595 806.466064,858.097595 814.247131,858.097595 
	C814.583496,857.684875 814.919861,857.272217 815.256287,856.859497 
	C814.348938,855.853088 813.460632,853.992615 812.531250,853.971924 
	C802.915466,853.757690 793.293091,853.840271 784.203857,853.840271 
	C784.203857,868.848999 784.203857,883.320679 784.203857,897.677551 
	C795.073914,897.677551 805.308899,897.677551 815.543884,897.677551 
	C815.763916,897.167175 815.983948,896.656738 816.203979,896.146362 
	C814.945496,895.411377 813.706970,894.082581 812.425171,894.039368 
	C804.949768,893.787598 797.464294,893.837341 789.794983,893.453186 
	C789.633057,893.247375 789.428528,893.101135 789.020935,892.089539 
	C789.020935,887.346497 789.020935,882.603455 789.020935,877.746887 
	C795.867554,877.746887 802.015198,877.886108 808.147339,877.640564 
	C809.532593,877.585022 810.864258,876.190796 812.220642,875.412781 
	C811.947327,874.880493 811.674011,874.348145 811.400696,873.815857 
	C804.008606,873.815857 796.616577,873.815857 789.208740,873.815857 
	C789.208740,868.562378 789.208740,863.772705 789.530823,858.818604 
M681.692444,826.999451 
	C682.127869,827.057373 682.563232,827.115234 683.156921,827.853760 
	C685.210876,829.326843 687.243103,832.000366 689.322998,832.038025 
	C694.618042,832.133911 700.684265,833.833496 704.839478,832.605103 
	C709.128418,831.337158 712.719238,830.211365 717.234863,830.804749 
	C720.039612,831.173279 723.156921,830.299622 725.945068,829.398926 
	C730.408020,827.956970 731.625854,822.395935 727.687561,820.170288 
	C723.461182,817.781982 721.706543,814.463196 720.499512,810.242920 
	C720.243164,809.346375 718.974854,808.739319 718.031128,807.074768 
	C718.064941,802.049988 718.098694,797.025146 718.701355,791.912659 
	C718.998840,791.591370 719.296265,791.270081 719.593811,790.948792 
	C719.101501,790.632507 718.609253,790.316162 717.946472,789.178223 
	C717.999512,787.785522 718.052490,786.392761 718.845276,784.825439 
	C719.913635,777.345520 720.982056,769.865601 721.897888,763.453552 
	C723.947021,762.412842 725.500793,761.623718 727.606689,761.064880 
	C728.455078,761.894958 729.303406,762.725037 730.035095,764.317566 
	C730.696411,767.039856 730.616821,770.322876 732.167725,772.371826 
	C735.796814,777.166382 740.245911,781.334839 744.287781,785.824463 
	C746.613525,788.407776 747.578430,792.437622 751.979126,792.798157 
	C752.334045,792.827271 752.535034,793.923279 752.929382,794.428406 
	C754.273926,796.151062 755.695923,797.813171 757.043701,799.533325 
	C758.088989,800.867371 758.914856,802.407166 760.102722,803.589905 
	C764.878906,808.346008 769.750427,813.006775 774.650391,817.635376 
	C774.752502,817.731873 775.622559,817.015320 776.739258,816.992493 
	C777.217590,817.970764 777.695923,818.948975 777.594849,820.335083 
	C778.114685,824.353638 778.634521,828.372192 779.083862,831.845886 
	C782.871643,831.551025 787.122620,831.283203 791.342651,830.763733 
	C791.657227,830.725037 791.749756,828.882935 792.126038,827.340637 
	C792.705261,826.877563 793.284485,826.414490 794.575928,825.875000 
	C797.325562,823.305176 796.088257,821.902710 792.994507,820.174805 
	C793.011230,818.783203 793.027954,817.391602 793.774780,815.843506 
	C795.643188,813.582275 796.106873,811.525513 792.666504,809.091553 
	C792.808228,801.061035 792.950012,793.030457 793.869446,784.799377 
	C794.246277,783.283936 794.904236,781.778015 794.955627,780.251587 
	C795.368835,767.984070 795.395508,755.696472 796.128296,743.450134 
	C796.445190,738.155090 794.944641,732.206787 799.838074,727.792908 
	C800.832947,726.895569 801.193604,725.125793 801.459900,723.686707 
	C801.546570,723.218018 800.403320,722.521851 799.906494,721.071228 
	C798.463318,720.709778 797.026306,720.068420 795.575867,720.036316 
	C790.000916,719.913025 784.419922,720.066528 778.845032,719.943115 
	C776.674072,719.895081 774.513306,719.387390 772.328796,719.086426 
	C774.406616,722.838989 777.155029,725.949036 777.857910,729.467651 
	C779.216431,736.269409 779.833984,743.290344 780.021118,750.240295 
	C780.440735,765.817993 780.408508,781.407898 780.441528,796.868652 
	C780.441528,796.868652 780.287476,796.944702 779.609497,796.782227 
	C773.335144,789.372375 767.067383,781.956909 760.785034,774.553833 
	C747.749878,759.193359 734.735046,743.815430 721.642761,728.503723 
	C719.109375,725.540833 716.686951,721.257324 713.460693,720.393372 
	C708.330688,719.019470 702.567566,720.009460 696.287109,719.988464 
	C694.773804,719.464661 693.264648,718.542664 691.746094,718.527100 
	C690.168396,718.510803 688.581604,719.370972 686.142822,720.032837 
	C677.185913,720.032837 668.228943,720.032837 658.982544,720.032837 
	C661.282593,723.794128 664.057617,726.793335 665.030334,730.293396 
	C666.394958,735.203796 666.856750,740.479675 666.939026,745.611450 
	C667.250488,765.042175 667.335876,784.477844 667.303406,803.911377 
	C667.296692,807.941589 666.423828,811.970337 665.253113,816.077148 
	C658.685608,819.199097 656.339478,824.416687 657.675110,831.700317 
	C659.893066,831.466187 662.152527,831.306885 664.386597,830.976257 
	C670.061890,830.136169 676.136780,830.888794 681.692444,826.999451 
M533.911987,718.169189 
	C532.279358,714.629822 529.264221,712.873962 525.648010,713.389343 
	C521.941345,713.917664 523.214722,717.377014 522.255737,719.972473 
	C521.504456,719.925232 520.753113,719.877991 520.002502,719.053833 
	C520.157593,717.501831 520.312622,715.949768 520.455627,714.518433 
	C517.840271,714.018372 515.345032,714.078735 513.418213,713.061829 
	C509.321320,710.899536 505.901245,712.645813 503.670105,715.297546 
	C502.394745,716.813293 502.721375,720.528320 503.586029,722.766663 
	C504.554535,725.273865 506.965698,727.216003 508.709167,729.435364 
	C509.499481,730.441345 510.615417,731.433777 510.859314,732.585693 
	C512.042969,738.176392 512.925781,743.830383 514.060791,749.432373 
	C514.249451,750.363770 515.158020,751.149353 515.898254,752.659485 
	C515.849365,753.105408 515.800537,753.551331 515.007141,754.137451 
	C514.338196,755.667603 513.129761,757.189880 513.107178,758.729614 
	C513.052002,762.492920 513.785461,766.265808 513.761658,770.032043 
	C513.725220,775.799866 513.293152,781.564453 513.076050,787.332153 
	C512.797913,794.721985 512.727844,802.124268 512.236633,809.499146 
	C512.035339,812.521057 513.024292,816.426208 508.535095,817.699768 
	C508.269196,817.775208 507.950562,818.668091 508.086914,819.007935 
	C510.178802,824.221680 504.558380,826.435669 503.564606,830.484741 
	C503.300751,831.559875 501.466400,832.720886 500.177643,832.984558 
	C496.356995,833.766296 495.423645,836.008911 495.755585,839.968750 
	C494.910370,840.953552 494.065155,841.938354 492.453522,842.975769 
	C491.738708,843.772949 491.023895,844.570129 490.309052,845.367310 
	C491.821136,846.368042 493.333221,847.368835 495.982819,849.122498 
	C495.424500,846.197632 495.212219,845.085632 495.666748,843.805176 
	C496.111084,843.905090 496.555420,844.005066 497.121857,844.787842 
	C497.693970,845.355042 498.330841,845.870972 498.827454,846.497986 
	C501.576141,849.968323 505.542145,849.433533 508.923523,848.732849 
	C510.639252,848.377319 511.719421,845.380676 513.304565,843.795654 
	C514.143860,842.956421 515.430603,842.545044 516.547058,842.006165 
	C522.114990,839.319092 528.856323,837.831665 529.424011,829.938171 
	C529.493530,828.970886 528.271973,827.910767 527.852661,826.166931 
	C528.812744,823.411072 529.772766,820.655151 531.509705,817.897217 
	C532.926147,816.674805 535.401428,815.587646 535.577881,814.206787 
	C536.391541,807.839233 537.053101,801.368164 536.769104,794.978638 
	C536.619263,791.605286 534.421326,788.322876 532.997498,784.072998 
	C533.046936,772.382202 533.096375,760.691406 533.709534,748.913208 
	C534.007019,748.595886 534.304504,748.278625 534.602051,747.961365 
	C534.120361,747.640686 533.638672,747.319946 533.010925,746.088013 
	C533.063782,742.392639 533.116699,738.697205 533.982422,734.960938 
	C537.533203,733.169312 535.998230,730.584595 535.379578,727.850708 
	C535.379578,727.850708 535.764160,727.722473 536.697815,728.492004 
	C539.261841,728.667725 541.825928,728.843445 545.949768,729.126038 
	C541.761841,724.030457 548.571655,717.421509 540.677612,713.516357 
	C539.987610,715.762451 539.473877,717.434692 538.136902,719.006653 
	C536.758301,718.956909 535.379639,718.907104 533.911987,718.169189 
M804.687195,802.096191 
	C800.707642,803.938599 801.224426,809.154663 805.968811,813.735413 
	C805.925476,814.489929 805.882202,815.244385 805.093811,816.120972 
	C804.433716,818.279358 803.464661,820.413513 803.292603,822.610168 
	C803.237305,823.315369 805.175232,824.513245 806.391235,824.925598 
	C813.066650,827.189575 819.797119,829.292419 826.520996,831.411316 
	C827.264099,831.645508 828.115967,831.817078 828.866211,831.697388 
	C832.012939,831.195251 835.208130,830.804626 838.253296,829.918640 
	C840.728821,829.198303 844.639832,830.626709 845.589050,825.635437 
	C849.392639,823.810974 853.196228,821.986511 857.084717,820.841248 
	C858.429871,825.187866 861.114319,824.106506 862.448975,821.428528 
	C863.714050,818.890076 863.452698,815.591003 863.878357,812.020508 
	C864.547913,811.333191 865.217468,810.645874 866.700256,809.981689 
	C871.051453,810.726807 872.831177,807.498840 873.343384,804.437500 
	C873.537476,803.277405 870.018372,801.496033 868.069153,799.129883 
	C868.086731,797.086487 868.104309,795.043152 868.855652,792.820435 
	C868.792236,790.275818 869.014343,787.678589 868.559509,785.205994 
	C868.281067,783.692566 866.973633,782.364136 866.110962,780.963318 
	C862.297119,774.770630 859.777527,767.196167 850.693909,766.624207 
	C850.180542,766.591858 849.714722,765.816101 849.225525,765.387756 
	C845.222778,761.882935 841.399841,758.141968 837.176697,754.926636 
	C829.979370,749.447021 826.203430,744.023254 828.271667,735.881348 
	C830.383301,734.662476 832.364197,734.204407 832.988708,733.026917 
	C834.697815,729.804749 837.477966,729.190308 840.128540,730.340210 
	C843.820312,731.941589 847.237183,734.291565 850.495422,736.695557 
	C851.295410,737.285767 851.041687,739.324829 851.240967,740.702332 
	C851.422058,741.953613 851.152588,743.511536 851.807068,744.399780 
	C852.978088,745.988953 861.199707,744.835449 863.545105,742.699097 
	C864.132141,741.800293 864.719177,740.901489 865.835510,739.901917 
	C865.656433,739.266968 865.477356,738.632080 865.106689,737.136047 
	C865.060120,733.024170 865.258606,728.886658 864.833191,724.814331 
	C864.685730,723.402954 862.990479,722.153259 861.988708,720.123535 
	C861.515320,718.816284 861.041931,717.509033 860.074158,714.836609 
	C858.238464,717.563171 857.118896,719.226135 855.295959,721.106323 
	C853.530823,721.039368 851.765686,720.972412 849.918945,720.215881 
	C848.018005,717.738220 846.341675,713.238708 842.676697,715.935181 
	C840.590515,717.469971 839.367981,717.412842 837.754700,716.747620 
	C834.339722,715.339294 832.789062,716.805237 831.254456,720.155579 
	C827.515991,721.476746 823.777588,722.797913 819.939880,723.456604 
	C817.404968,722.674561 811.055969,725.588135 810.124146,728.231567 
	C808.932739,731.611450 807.810303,735.061462 807.194580,738.575195 
	C806.959473,739.916626 808.207764,741.518066 808.903259,743.851746 
	C808.842651,745.566528 808.782104,747.281250 808.074768,749.012817 
	C807.531860,749.388672 806.988953,749.764587 806.445984,750.140381 
	C807.238342,750.427612 808.030640,750.714844 809.059082,751.663574 
	C809.355591,752.776001 809.652100,753.888367 809.213928,755.157410 
	C806.784119,760.337402 809.472046,766.794556 814.659241,768.079590 
	C818.125854,768.938477 819.953003,770.689697 818.305603,774.291565 
	C825.479675,778.715210 826.638794,778.987122 833.788818,777.995178 
	C834.192444,778.349487 834.596008,778.703796 834.994080,779.739014 
	C835.702454,781.308594 836.050293,783.865662 837.180969,784.278503 
	C842.361938,786.169983 841.101746,794.330994 847.630615,794.748108 
	C847.831238,794.760986 847.534424,797.127014 848.105347,797.960266 
	C849.146179,799.479370 850.664246,800.671509 852.191711,802.736816 
	C852.100647,803.491028 852.009521,804.245300 851.191040,805.099854 
	C848.601013,806.475952 848.026306,808.124573 850.273499,810.852600 
	C848.564087,812.681091 846.854675,814.509644 844.782471,815.734009 
	C841.517944,814.251221 840.751892,816.558838 839.423645,819.173279 
	C839.011475,819.284790 838.599243,819.396362 837.783203,818.810425 
	C832.963074,815.707458 825.330322,816.994263 822.719727,810.030396 
	C820.500000,808.545288 818.102966,806.975098 817.183594,804.784729 
	C816.010742,801.990479 816.031616,798.695129 815.465393,795.163208 
	C811.734863,795.163208 808.078247,795.163208 803.819336,795.163208 
	C805.330872,797.493958 806.195312,798.826904 806.873047,800.636230 
	C806.431763,801.148682 805.990417,801.661133 804.687195,802.096191 
M1337.051025,735.954407 
	C1337.606934,735.593872 1338.162842,735.233398 1339.415161,735.164612 
	C1340.424927,735.245972 1341.434692,735.327332 1342.444458,735.408691 
	C1342.147949,734.526062 1341.851440,733.643494 1342.013672,732.206665 
	C1343.277954,731.543701 1344.542236,730.880737 1346.041992,731.000122 
	C1347.432861,733.331055 1349.351807,735.286377 1351.957520,733.202087 
	C1358.029175,728.345032 1364.671021,727.138184 1372.119751,728.756287 
	C1372.924438,728.931030 1374.032837,727.707642 1375.646973,727.043457 
	C1376.431030,727.394104 1377.215088,727.744690 1378.010010,728.820435 
	C1379.914795,731.175537 1381.702515,733.639343 1383.757568,735.855164 
	C1385.797119,738.054443 1389.620605,739.044678 1388.160278,743.286011 
	C1392.475708,744.663391 1396.802368,748.104004 1400.345337,741.153442 
	C1400.615967,738.435974 1400.886597,735.718567 1401.881836,732.887878 
	C1405.015137,731.398621 1404.556274,728.681274 1403.124756,726.746033 
	C1402.240479,725.550720 1403.734375,721.731506 1399.259399,722.810425 
	C1397.839966,722.484436 1396.420410,722.158447 1394.879639,721.192871 
	C1393.919678,721.442932 1392.959717,721.693054 1391.234253,722.063110 
	C1387.535645,720.729309 1383.837158,719.395508 1379.489746,717.744873 
	C1377.329834,715.006409 1374.991577,713.799316 1371.060059,714.266052 
	C1364.060425,715.097046 1356.927002,715.012878 1349.854126,714.926392 
	C1345.996216,714.879333 1343.777344,715.898499 1343.743530,720.737793 
	C1342.843872,720.862488 1341.944092,720.987183 1340.582642,720.526123 
	C1339.472778,720.488098 1338.319092,720.234497 1337.260376,720.449036 
	C1332.383179,721.437195 1327.532471,722.555786 1322.287231,723.712524 
	C1322.845093,728.672302 1317.602905,729.030273 1313.995728,731.022095 
	C1313.995728,732.191895 1314.308594,733.321716 1313.941772,734.150940 
	C1312.340820,737.769897 1310.714233,741.399780 1308.754150,744.829712 
	C1307.485718,747.049316 1304.727173,748.724182 1304.204468,751.002808 
	C1302.883667,756.762024 1302.322754,762.712708 1301.775391,768.616089 
	C1301.677612,769.672119 1303.103760,770.869385 1303.968384,772.826355 
	C1303.920654,774.217285 1303.873047,775.608154 1303.102783,777.187683 
	C1301.519653,780.271362 1300.424683,783.246826 1304.994141,785.427734 
	C1304.994141,785.427734 1305.053955,785.878784 1304.782715,786.530762 
	C1305.065186,790.462219 1304.682129,794.599609 1305.816895,798.267395 
	C1306.955566,801.947876 1309.690918,805.115295 1311.565918,808.594116 
	C1312.793457,810.871460 1313.114502,814.140320 1314.935059,815.490051 
	C1318.678955,818.265747 1323.464233,819.626343 1327.248657,822.361084 
	C1331.290283,825.281677 1339.096680,823.635376 1338.571045,831.621704 
	C1343.749756,831.045166 1348.492920,830.617188 1353.194946,829.914062 
	C1354.206177,829.762878 1355.068604,828.618164 1356.738159,827.736389 
	C1357.492065,827.824768 1358.246094,827.913208 1359.131348,828.740662 
	C1362.603394,831.550537 1373.874268,831.132324 1376.699463,828.033447 
	C1376.965088,827.742249 1376.813599,827.070740 1377.432495,826.101807 
	C1378.926636,825.993774 1380.420654,825.885803 1382.214233,826.431580 
	C1384.933350,826.288208 1387.651001,826.063171 1390.371704,826.019226 
	C1395.291138,825.939880 1400.756836,827.017517 1401.862183,819.819580 
	C1401.941650,819.301575 1402.698486,818.748962 1403.266724,818.469116 
	C1405.581543,817.329407 1406.392822,815.871826 1405.335205,813.235107 
	C1404.948486,812.271118 1405.722046,810.696472 1406.254395,809.532104 
	C1410.577271,800.074585 1410.484497,799.914307 1399.830811,800.001160 
	C1398.831909,800.009338 1397.743530,799.791504 1396.858643,800.117676 
	C1395.877686,800.479248 1394.573120,801.179810 1394.299316,802.021973 
	C1393.338135,804.979004 1392.759277,808.060425 1391.775391,811.632202 
	C1391.229492,811.866882 1390.683594,812.101562 1389.759033,811.688904 
	C1385.952026,811.496765 1382.116943,811.023315 1378.366333,811.397034 
	C1377.760864,811.457275 1377.531006,815.286560 1376.521729,817.740967 
	C1375.348755,817.871765 1374.175903,818.002502 1372.925293,817.467834 
	C1372.472290,817.090271 1372.015747,816.381653 1371.566895,816.386536 
	C1367.243774,816.433228 1362.893188,816.939453 1358.613525,816.574097 
	C1356.768188,816.416565 1354.419434,814.934021 1353.427124,813.347839 
	C1350.341431,808.415222 1343.423706,807.882263 1341.143066,802.216919 
	C1341.107788,802.129395 1340.811523,802.176880 1340.678833,802.094238 
	C1335.485474,798.854980 1334.532715,792.284729 1330.030640,788.489075 
	C1329.863770,788.348389 1330.081421,787.821350 1329.979004,787.522827 
	C1329.449951,785.982727 1328.784180,784.484375 1328.338745,782.922180 
	C1327.765747,780.913025 1327.292847,778.869568 1326.891846,776.818298 
	C1326.268921,773.631897 1327.577393,769.680786 1323.147827,767.239319 
	C1323.621460,764.483154 1324.094971,761.727051 1325.362305,758.919434 
	C1326.282104,757.336426 1327.238037,755.773071 1328.113403,754.165710 
	C1329.390625,751.820435 1330.044922,748.696716 1331.973267,747.238098 
	C1335.797363,744.345459 1337.862061,741.223328 1337.051025,735.954407 
M1219.082031,751.497864 
	C1224.202393,757.309814 1229.366211,763.084167 1234.432617,768.942810 
	C1241.434326,777.039368 1248.341797,785.217163 1255.327271,793.327759 
	C1264.805054,804.332153 1274.219116,815.395142 1283.930420,826.190247 
	C1285.285889,827.697021 1288.694824,828.957092 1290.209229,828.265198 
	C1291.693604,827.587097 1292.625854,824.282837 1292.663452,822.111572 
	C1292.795898,814.460815 1292.298218,806.801514 1292.299316,799.145508 
	C1292.301514,783.819946 1292.217529,768.486938 1292.663330,753.171387 
	C1292.992432,741.858459 1290.060913,729.728271 1300.448608,719.776978 
	C1290.334595,719.776978 1281.243164,719.776978 1270.744995,719.776978 
	C1277.063232,723.989136 1279.095947,729.308350 1279.284058,735.455078 
	C1279.623169,746.532166 1280.025146,757.608643 1280.212280,768.688660 
	C1280.365234,777.745605 1280.243408,786.807251 1280.243408,796.900452 
	C1278.439453,795.519348 1277.439819,794.998779 1276.767090,794.202148 
	C1267.056763,782.702515 1257.438843,771.124634 1247.700439,759.649109 
	C1236.963379,746.997009 1226.131226,734.425842 1215.315918,721.840454 
	C1214.713013,721.138916 1213.925171,720.169739 1213.157837,720.105042 
	C1207.937622,719.665100 1202.699707,719.434570 1196.439575,719.077820 
	C1198.303589,721.370178 1199.810303,722.852722 1200.859375,724.608826 
	C1202.122192,726.722595 1203.693237,729.003540 1203.910889,731.326294 
	C1204.646362,739.176270 1205.477661,747.106018 1205.118652,754.952393 
	C1204.226440,774.445496 1207.244019,794.069702 1203.182861,813.447144 
	C1206.013794,818.612732 1202.040771,820.637024 1198.828979,823.114014 
	C1198.093750,823.681030 1197.791626,824.809692 1197.290283,825.679810 
	C1198.113281,825.810242 1198.932739,826.020874 1199.760010,826.058533 
	C1206.982666,826.388000 1214.205078,826.757629 1221.431885,826.937195 
	C1222.964355,826.975281 1224.514771,826.286743 1227.484619,825.605469 
	C1219.590942,821.314087 1217.870239,815.471008 1217.977417,808.642517 
	C1218.050659,803.981873 1217.728516,799.316406 1217.712280,794.652649 
	C1217.660889,779.845825 1217.669800,765.038757 1218.211548,750.650513 
	C1218.436768,750.706543 1218.661865,750.762573 1219.082031,751.497864 
M1114.030884,806.518188 
	C1116.543335,800.416748 1118.929077,794.257629 1121.663696,788.257568 
	C1122.288940,786.885681 1124.080444,785.186646 1125.397705,785.131470 
	C1132.708374,784.825623 1140.048096,784.780396 1147.354370,785.131836 
	C1148.988037,785.210510 1151.328735,786.894470 1151.975708,788.419617 
	C1155.163696,795.934814 1158.185303,803.553467 1160.615479,811.338562 
	C1161.421631,813.920776 1160.534790,817.157471 1159.963745,820.002869 
	C1159.523682,822.195007 1158.366333,824.243103 1157.664551,826.011230 
	C1169.477661,826.011230 1180.672485,826.011230 1192.395508,826.011230 
	C1191.586548,825.097534 1191.200806,824.331482 1190.584839,824.018250 
	C1185.417114,821.390625 1182.423584,816.925781 1180.357300,811.783325 
	C1174.516479,797.247375 1168.797607,782.662415 1163.006348,768.106384 
	C1156.649780,752.129822 1150.266357,736.164062 1144.002319,720.463501 
	C1135.834473,720.463501 1128.128418,720.463501 1119.582275,720.463501 
	C1122.031982,722.743713 1124.133423,724.235779 1125.626953,726.191833 
	C1128.271118,729.654724 1131.501465,733.358154 1129.650513,738.092712 
	C1125.039795,749.886230 1120.026855,761.522034 1115.207520,773.234314 
	C1110.752075,784.061890 1106.410522,794.936951 1101.879150,805.732361 
	C1099.139526,812.258972 1096.565063,818.968567 1089.805420,822.685608 
	C1087.987183,823.685425 1086.270020,824.869019 1083.852173,826.376099 
	C1093.909302,826.376099 1102.813232,826.376099 1111.745117,826.376099 
	C1108.848267,819.259277 1109.048096,817.427612 1114.030884,806.518188 
M570.363770,835.972961 
	C577.233521,830.989624 581.015198,824.148926 582.034180,815.840576 
	C582.855103,809.147644 583.721619,802.416870 583.840820,795.690063 
	C584.118042,780.045410 583.817383,764.391113 584.022339,748.744324 
	C584.155273,738.601746 582.390259,728.000366 590.119263,719.487793 
	C578.927917,719.487793 568.111389,719.487793 556.484009,719.487793 
	C558.469666,721.647949 560.471741,723.182922 561.605408,725.204773 
	C563.474548,728.538391 565.365295,732.059143 566.170837,735.736694 
	C567.064270,739.815857 566.941284,744.159851 566.930847,748.387695 
	C566.872314,772.171936 569.107239,795.979492 564.268677,819.680725 
	C562.255859,829.540283 557.622864,835.837830 548.447937,839.305664 
	C546.554321,840.021362 544.946289,841.492676 543.206665,842.615723 
	C543.549438,843.379456 543.892273,844.143127 544.235046,844.906860 
	C549.740784,843.594421 555.319519,842.522095 560.724670,840.878723 
	C563.930115,839.904114 566.861633,838.028748 570.363770,835.972961 
M851.064758,873.943115 
	C850.411499,877.712708 849.752686,881.481384 849.114868,885.253601 
	C849.060974,885.572388 849.099243,885.926819 849.176392,886.244812 
	C850.083740,889.979431 851.006714,893.710266 851.969971,897.622498 
	C853.057556,897.622498 854.552856,897.622498 856.384521,897.622498 
	C856.384521,892.960388 856.384521,888.696472 856.384521,884.029907 
	C861.011963,884.029907 865.305786,883.941589 869.589783,884.106689 
	C870.415100,884.138550 871.405762,885.009705 871.971191,885.757446 
	C874.222778,888.734863 876.481140,891.725952 878.458374,894.886414 
	C880.272583,897.786255 882.501770,898.874390 886.139893,897.457764 
	C882.838135,892.612732 879.580017,887.831726 876.302917,883.022888 
	C884.081421,878.566467 886.958740,873.440918 885.845154,866.705261 
	C884.708557,859.830627 880.787354,855.258911 873.045166,854.309326 
	C865.915527,853.434937 858.594238,854.123413 851.089844,854.123413 
	C851.089844,860.783081 851.089844,866.910278 851.064758,873.943115 
M723.902954,869.508850 
	C720.589905,863.915649 723.159607,858.392578 729.789917,858.151245 
	C734.227600,857.989807 738.710510,859.444519 743.196655,859.979004 
	C744.348999,860.116333 745.590088,859.508911 746.790405,859.243530 
	C746.101868,858.152527 745.553711,856.250244 744.701843,856.102783 
	C739.343445,855.175476 733.921753,854.148743 728.512634,854.100830 
	C722.244873,854.045288 717.451782,858.670471 716.942566,863.780457 
	C716.157410,871.659302 720.693665,875.207336 727.042114,876.991882 
	C731.344238,878.201111 735.842529,879.116455 739.759705,881.125244 
	C741.781067,882.161804 744.246887,885.717529 743.786743,887.381348 
	C743.159912,889.648010 740.200806,892.204895 737.764404,892.858643 
	C730.775940,894.733826 723.838623,894.203125 718.187012,888.816833 
	C715.845581,892.334656 716.397339,894.118042 719.521545,895.750671 
	C725.525696,898.888367 731.973572,898.270142 738.268860,897.835388 
	C743.997314,897.439819 748.662720,892.408325 749.025269,887.362183 
	C749.474854,881.104126 747.383179,878.330688 740.527893,875.894104 
	C735.158630,873.985657 729.821045,871.987976 723.902954,869.508850 
M1194.217163,877.051270 
	C1188.914551,875.385681 1183.615479,873.708069 1178.307983,872.058228 
	C1174.308472,870.815002 1172.026611,868.358154 1172.975708,863.976929 
	C1173.821411,860.072327 1176.711426,857.961182 1180.446045,858.097473 
	C1184.555542,858.247498 1188.686890,859.094727 1192.705200,860.065918 
	C1196.408569,860.960999 1196.348145,861.210815 1197.375732,856.886475 
	C1191.687256,853.922852 1185.755737,852.907227 1179.283081,853.900391 
	C1172.534790,854.935913 1168.127930,857.869385 1167.679443,862.412781 
	C1166.906860,870.238525 1169.453369,874.328430 1176.818237,876.658752 
	C1180.024414,877.673340 1183.339844,878.348145 1186.614624,879.139893 
	C1191.621216,880.350464 1194.346924,883.401062 1193.988037,887.708374 
	C1193.572998,892.688416 1189.163696,893.758728 1185.843506,893.744202 
	C1181.080322,893.723328 1176.033936,892.616699 1171.664917,890.703186 
	C1168.591675,889.357178 1167.334473,889.454407 1166.013550,892.178589 
	C1171.805786,898.821594 1180.201294,898.904968 1189.825439,897.413696 
	C1199.555786,895.905945 1203.856812,883.146912 1194.217163,877.051270 
M1067.360352,889.899902 
	C1065.411499,890.337891 1063.043701,890.216492 1061.584595,891.308716 
	C1054.476318,896.630127 1043.429932,893.531494 1038.184082,886.794922 
	C1033.276489,880.492798 1033.677368,868.936890 1039.540405,863.075012 
	C1045.675537,856.941162 1055.217529,856.606323 1062.421631,861.127258 
	C1065.750366,863.216248 1067.336548,862.810303 1068.910522,859.672058 
	C1061.056519,851.334106 1045.713867,851.710999 1037.937500,857.830627 
	C1030.558960,863.637146 1025.658936,875.085754 1032.230957,887.206360 
	C1038.659668,899.062683 1058.185669,902.411255 1067.617798,892.935608 
	C1068.090820,892.460388 1067.828247,891.252991 1067.360352,889.899902 
M937.306763,898.022827 
	C938.169189,897.393311 939.451904,896.952209 939.831238,896.105957 
	C946.025391,882.290039 952.105591,868.422913 958.284912,854.400269 
	C954.416260,853.396606 952.334839,854.377991 950.921387,857.859985 
	C946.532654,868.671082 941.847046,879.361755 937.199341,890.280823 
	C936.420593,889.741272 935.846130,889.562439 935.686096,889.200500 
	C931.068115,878.756287 926.253906,868.388428 922.031494,857.785156 
	C920.458923,853.836060 918.380005,853.507080 914.700378,854.525757 
	C916.289062,858.354126 917.685425,861.923218 919.238586,865.422607 
	C923.501648,875.027466 927.729309,884.651001 932.231750,894.143433 
	C932.994751,895.752197 935.051575,896.747253 937.306763,898.022827 
M989.703369,895.316406 
	C989.652100,899.559265 992.329590,897.794800 994.476868,897.800232 
	C994.476868,883.031982 994.476868,868.629761 994.476868,853.863403 
	C992.777771,853.948792 991.389587,854.018555 989.700500,854.103455 
	C989.700500,867.767395 989.700500,881.059692 989.703369,895.316406 
M531.450378,823.321655 
	C532.215027,823.204102 532.979675,823.086609 533.744324,822.969116 
	C533.660828,822.530334 533.577332,822.091614 533.493835,821.652832 
	C532.780151,821.993958 532.066528,822.335144 531.450378,823.321655 
M1495.201782,815.607300 
	C1495.206055,815.213806 1495.210327,814.820374 1495.214600,814.426880 
	C1495.051270,814.425293 1494.745972,814.412720 1494.745117,814.423706 
	C1494.714844,814.815247 1494.713135,815.209045 1495.201782,815.607300 
z"/>
<path fill="#3C5DA7" opacity="1.000000" stroke="none" 
	d="
M111.075851,780.956604 
	C111.078781,768.942017 111.081718,756.927490 111.022789,744.169189 
	C110.666733,743.207703 110.372536,742.989868 110.078339,742.772095 
	C110.116188,729.940857 110.114723,717.109314 110.234497,704.278870 
	C110.252373,702.363647 110.839844,700.453735 111.256760,697.992676 
	C119.823364,696.557739 128.561386,695.667969 136.988281,693.543884 
	C148.750793,690.579163 160.347916,686.898071 171.889648,683.136353 
	C181.397964,680.037537 190.909775,676.808289 200.077560,672.844727 
	C209.664719,668.699890 219.054779,663.982056 228.137634,658.822266 
	C236.448700,654.100891 244.169525,648.349609 252.317841,643.323547 
	C253.623123,642.518494 256.229736,642.431702 257.514221,643.206787 
	C266.864044,648.848572 275.852478,655.103943 285.314911,660.539124 
	C291.657898,664.182556 298.563873,666.859070 305.266113,669.860657 
	C313.578522,673.583252 321.933289,677.211853 330.287140,680.841064 
	C332.189056,681.667297 334.162170,682.329590 336.764038,683.297485 
	C342.283844,684.953735 347.142151,686.379822 352.000427,687.805908 
	C361.611237,690.202759 371.183014,692.774414 380.847168,694.932373 
	C386.868408,696.276917 393.029297,696.996094 399.549805,698.525818 
	C399.878906,726.720276 399.785736,754.384766 399.475006,781.696411 
	C398.746857,772.290283 398.236298,763.236938 397.725708,754.183655 
	C397.218567,754.054810 396.711395,753.925964 396.204254,753.797119 
	C395.497559,754.700806 394.328094,755.529541 394.167389,756.521606 
	C393.591034,760.080322 393.365845,763.695374 392.988556,767.287109 
	C392.686096,770.166626 392.355591,773.043335 391.957886,775.466309 
	C391.878235,751.785889 391.878235,728.560425 391.878235,705.631409 
	C384.089447,704.160095 377.204742,703.047119 370.406464,701.543152 
	C339.427948,694.690063 309.981049,683.719727 282.273071,668.221619 
	C279.671265,666.766418 278.255554,667.147461 276.508118,669.423218 
	C271.332886,676.163147 268.007507,683.633240 266.462952,692.020264 
	C265.620453,690.992065 265.098267,689.983459 264.592865,689.007324 
	C257.464325,689.007324 249.636673,688.958069 241.810394,689.039734 
	C239.684845,689.061951 237.536041,689.336853 235.444839,689.739441 
	C226.398956,691.480835 217.287842,692.985596 208.368011,695.239624 
	C203.374161,696.501587 198.707840,699.059631 193.864059,700.573425 
	C194.196564,695.193848 194.558960,690.274536 195.028458,683.901184 
	C170.232803,693.810120 145.820190,701.988831 119.921982,705.303284 
	C119.921982,733.223328 119.921982,760.692871 119.630325,788.189087 
	C118.709969,782.584106 118.081261,776.952515 117.452553,771.320923 
	C117.083900,771.312500 116.715256,771.304016 116.346603,771.295593 
	C114.800728,774.565369 113.254852,777.835144 111.550568,781.069092 
	C111.392166,781.033203 111.075851,780.956604 111.075851,780.956604 
z"/>
<path fill="#93CEF0" opacity="1.000000" stroke="none" 
	d="
M209.988708,940.182922 
	C209.529907,939.813538 209.071091,939.444153 208.157608,938.757935 
	C206.806564,937.948120 205.910187,937.455200 205.013855,936.962280 
	C204.799591,936.708679 204.585312,936.455139 204.067017,935.913269 
	C203.594879,935.378418 203.361679,935.252502 203.063370,935.247131 
	C201.489014,934.313293 199.914658,933.379395 198.331955,931.802734 
	C199.658096,927.807617 199.243759,924.606812 195.773453,923.246582 
	C190.844360,921.314819 189.424103,917.241211 188.389435,912.967163 
	C197.135269,919.439087 205.656311,925.712219 213.888092,932.344360 
	C216.672485,934.587585 218.786438,935.252869 222.206696,933.604431 
	C225.868668,931.839661 230.029968,931.110962 234.221954,930.224731 
	C236.244141,930.848938 238.245499,930.757385 239.755356,931.574280 
	C252.070450,938.237244 265.043579,936.826904 277.343903,933.021362 
	C288.491089,929.572693 298.223358,923.159485 305.588409,913.178894 
	C317.505920,897.029175 321.395020,879.793396 315.692291,860.526733 
	C312.988708,851.392578 308.559631,843.457825 302.051880,836.130859 
	C289.806976,822.344482 274.160095,818.561951 256.973877,818.104980 
	C252.029022,817.973511 247.062408,818.660706 241.912659,818.694824 
	C236.428116,810.976624 231.136688,803.536194 226.190552,796.095093 
	C227.876556,796.717346 229.347290,798.059387 230.536545,797.844421 
	C237.407257,796.602173 244.149933,794.446899 251.056366,793.667297 
	C257.385223,792.952881 264.069550,792.599731 270.232697,793.864197 
	C279.280243,795.720520 287.992920,799.193237 296.886932,801.847900 
	C297.500580,802.031006 298.435028,801.139343 299.500854,800.947998 
	C306.200287,811.784912 312.847931,822.291260 318.987000,833.086792 
	C329.531982,851.630249 329.779388,871.871338 326.903748,892.121826 
	C325.789520,899.968384 321.739716,907.398071 318.892517,915.073730 
	C318.830688,915.076172 318.903564,915.022583 319.322449,914.956543 
	C322.900604,912.558105 326.132782,910.172058 329.720642,907.966797 
	C329.901978,910.237732 329.740753,912.329163 329.548737,914.417664 
	C329.417877,915.841064 329.243896,917.260559 329.089233,918.681763 
	C326.588165,921.028015 324.087158,923.374329 320.974243,925.977539 
	C318.507324,927.794678 316.652252,929.354858 314.797180,930.915039 
	C313.945587,931.401917 313.093994,931.888733 311.796082,932.708069 
	C310.558868,933.688171 309.767914,934.335815 308.976990,934.983459 
	C308.976990,934.983459 309.001312,934.999329 308.682251,935.039062 
	C307.870270,935.684937 307.377289,936.291138 306.884338,936.897278 
	C306.884338,936.897278 307.007965,936.925598 306.614563,936.934204 
	C304.793701,937.946716 303.366272,938.950562 301.938843,939.954468 
	C301.938843,939.954468 302.006775,939.983337 301.632782,940.011841 
	C290.143585,946.015869 279.028351,951.991333 267.913147,957.966858 
	C253.364182,964.086914 240.817978,958.857422 228.163879,950.737488 
	C224.740189,948.938049 221.878983,947.452942 219.017761,945.967896 
	C219.017746,945.967957 218.996429,945.996338 218.817520,945.716980 
	C216.095978,943.952332 213.553345,942.467041 211.010712,940.981750 
	C211.010727,940.981750 210.998108,940.998840 210.899506,940.790222 
	C210.590042,940.326721 210.319321,940.193848 209.988708,940.182922 
z"/>
<path fill="#4B4847" opacity="1.000000" stroke="none" 
	d="
M793.863647,825.951477 
	C793.284485,826.414490 792.705261,826.877563 791.687561,827.732117 
	C787.467468,830.081055 785.262634,827.638550 783.043396,825.197693 
	C781.434387,823.428101 779.798279,821.683167 778.174255,819.927246 
	C777.695923,818.948975 777.217590,817.970764 776.254028,816.567505 
	C774.383850,814.728577 772.914612,813.387024 771.626892,811.889404 
	C757.785461,795.792114 743.972473,779.670288 730.151733,763.555176 
	C729.303406,762.725037 728.455078,761.894958 727.218933,760.632935 
	C724.044495,756.887939 721.257874,753.574890 718.105530,749.827148 
	C718.105530,761.923706 718.105530,773.461853 718.105530,785.000061 
	C718.052490,786.392761 717.999512,787.785522 717.956116,789.919922 
	C718.021362,791.107910 718.076965,791.554138 718.132446,792.000366 
	C718.098694,797.025146 718.064941,802.049988 718.034912,807.935974 
	C718.915222,815.130554 719.256592,821.714661 726.825867,824.911682 
	C726.486633,825.315552 726.147461,825.719421 725.808289,826.123291 
	C716.264465,826.123291 706.720642,826.123291 697.176819,826.123291 
	C697.004822,825.709900 696.832764,825.296448 696.660706,824.883057 
	C701.515930,822.587585 704.968506,819.319458 705.046997,813.762146 
	C705.366455,791.127258 705.787598,768.492920 705.934143,745.856812 
	C705.995972,736.304199 706.387695,726.431580 697.072266,719.999573 
	C702.567566,720.009460 708.330688,719.019470 713.460693,720.393372 
	C716.686951,721.257324 719.109375,725.540833 721.642761,728.503723 
	C734.735046,743.815430 747.749878,759.193359 760.785034,774.553833 
	C767.067383,781.956909 773.335144,789.372375 779.908875,797.033936 
	C780.325562,797.188049 780.442932,797.090393 780.560303,796.992798 
	C780.408508,781.407898 780.440735,765.817993 780.021118,750.240295 
	C779.833984,743.290344 779.216431,736.269409 777.857910,729.467651 
	C777.155029,725.949036 774.406616,722.838989 772.328796,719.086426 
	C774.513306,719.387390 776.674072,719.895081 778.845032,719.943115 
	C784.419922,720.066528 790.000916,719.913025 795.575867,720.036316 
	C797.026306,720.068420 798.463318,720.709778 799.508423,721.525024 
	C794.086304,725.831604 793.347229,731.641235 793.221741,737.135620 
	C792.857361,753.083069 793.092041,769.044189 793.091736,784.999939 
	C792.950012,793.030457 792.808228,801.061035 792.718384,809.969788 
	C792.861694,812.565369 792.953186,814.282654 793.044678,816.000000 
	C793.027954,817.391602 793.011230,818.783203 792.996338,820.953125 
	C793.286743,823.138184 793.575195,824.544800 793.863647,825.951477 
z"/>
<path fill="#4B4847" opacity="1.000000" stroke="none" 
	d="
M1217.655518,750.231812 
	C1217.669800,765.038757 1217.660889,779.845825 1217.712280,794.652649 
	C1217.728516,799.316406 1218.050659,803.981873 1217.977417,808.642517 
	C1217.870239,815.471008 1219.590942,821.314087 1227.484619,825.605469 
	C1224.514771,826.286743 1222.964355,826.975281 1221.431885,826.937195 
	C1214.205078,826.757629 1206.982666,826.388000 1199.760010,826.058533 
	C1198.932739,826.020874 1198.113281,825.810242 1197.290283,825.679810 
	C1197.791626,824.809692 1198.093750,823.681030 1198.828979,823.114014 
	C1202.040771,820.637024 1206.013794,818.612732 1203.182861,813.447144 
	C1207.244019,794.069702 1204.226440,774.445496 1205.118652,754.952393 
	C1205.477661,747.106018 1204.646362,739.176270 1203.910889,731.326294 
	C1203.693237,729.003540 1202.122192,726.722595 1200.859375,724.608826 
	C1199.810303,722.852722 1198.303589,721.370178 1196.439575,719.077820 
	C1202.699707,719.434570 1207.937622,719.665100 1213.157837,720.105042 
	C1213.925171,720.169739 1214.713013,721.138916 1215.315918,721.840454 
	C1226.131226,734.425842 1236.963379,746.997009 1247.700439,759.649109 
	C1257.438843,771.124634 1267.056763,782.702515 1276.767090,794.202148 
	C1277.439819,794.998779 1278.439453,795.519348 1280.243408,796.900452 
	C1280.243408,786.807251 1280.365234,777.745605 1280.212280,768.688660 
	C1280.025146,757.608643 1279.623169,746.532166 1279.284058,735.455078 
	C1279.095947,729.308350 1277.063232,723.989136 1270.744995,719.776978 
	C1281.243164,719.776978 1290.334595,719.776978 1300.448608,719.776978 
	C1290.060913,729.728271 1292.992432,741.858459 1292.663330,753.171387 
	C1292.217529,768.486938 1292.301514,783.819946 1292.299316,799.145508 
	C1292.298218,806.801514 1292.795898,814.460815 1292.663452,822.111572 
	C1292.625854,824.282837 1291.693604,827.587097 1290.209229,828.265198 
	C1288.694824,828.957092 1285.285889,827.697021 1283.930420,826.190247 
	C1274.219116,815.395142 1264.805054,804.332153 1255.327271,793.327759 
	C1248.341797,785.217163 1241.434326,777.039368 1234.432617,768.942810 
	C1229.366211,763.084167 1224.202393,757.309814 1218.990234,750.911865 
	C1218.484131,750.294556 1218.069824,750.263184 1217.655518,750.231812 
z"/>
<path fill="#4A4645" opacity="1.000000" stroke="none" 
	d="
M1003.001099,720.832458 
	C1005.746094,720.686951 1008.491150,720.541382 1012.003540,720.399536 
	C1017.514709,721.211792 1022.258545,722.020325 1027.002319,722.828857 
	C1039.405640,727.222412 1046.487549,736.226929 1046.658447,749.118408 
	C1046.820923,761.384888 1040.795654,770.893250 1028.752563,776.570862 
	C1030.842285,780.151611 1032.821533,783.759949 1035.007080,787.238708 
	C1038.542969,792.866699 1041.838135,798.705200 1045.928589,803.909790 
	C1050.529175,809.763367 1055.527710,815.427612 1061.064453,820.378662 
	C1064.747437,823.671997 1069.702271,825.123169 1075.032715,823.441833 
	C1076.086304,823.109375 1077.569702,824.139832 1078.854980,824.541809 
	C1077.966431,825.671143 1077.302124,827.423340 1076.155640,827.835876 
	C1060.592651,833.435120 1050.039062,831.327576 1037.902222,818.306458 
	C1030.832031,810.721252 1025.406616,801.595520 1019.312378,793.111755 
	C1016.656311,789.414185 1014.292297,785.504333 1011.587158,781.845093 
	C1009.138306,778.532349 1005.175659,778.129578 998.094971,780.174316 
	C998.094971,790.900146 998.094971,801.697266 998.453491,813.203857 
	C1000.874573,818.150879 1002.937134,822.388428 1004.916565,826.455322 
	C994.507751,826.455322 983.371399,826.455322 970.937805,826.455322 
	C972.528687,824.579041 973.126038,823.198181 974.103394,822.832153 
	C980.255432,820.528381 981.290833,815.697449 980.968445,809.976501 
	C980.781494,806.658630 980.867920,803.325256 980.831299,799.998901 
	C980.878601,798.930237 980.925903,797.861633 980.974487,796.000977 
	C980.948792,794.139221 980.921753,793.069580 980.894775,791.999878 
	C980.953003,784.974548 981.011169,777.949219 981.061523,769.998718 
	C980.977844,761.304199 981.038879,753.530212 980.775513,745.767212 
	C980.613647,740.996582 980.668457,736.025024 979.300415,731.548767 
	C978.157104,727.808228 975.087830,724.656250 972.842773,721.199463 
	C973.733398,721.096191 974.867615,720.964722 976.001831,720.833191 
	C983.704773,720.888428 991.407715,720.943665 999.926758,720.993652 
	C1001.495544,720.936462 1002.248352,720.884460 1003.001099,720.832458 
M997.962158,747.501709 
	C997.962158,755.577576 997.962158,763.653442 997.962158,772.192505 
	C1008.244812,771.035522 1019.860352,774.776550 1025.761353,763.558472 
	C1030.798706,753.982422 1030.795410,743.502441 1024.010498,734.300659 
	C1017.468506,725.428345 1007.960510,727.755066 997.963318,728.169617 
	C997.963318,734.602905 997.963318,740.552917 997.962158,747.501709 
z"/>
<path fill="#4B4847" opacity="1.000000" stroke="none" 
	d="
M880.847656,800.999634 
	C880.875977,798.297119 880.904358,795.594543 880.928284,792.177307 
	C880.784241,790.935486 880.644592,790.408386 880.505005,789.881287 
	C880.529236,788.833435 880.553528,787.785645 880.574219,785.905884 
	C880.643860,774.381775 880.717163,763.689575 880.790405,752.997314 
	C880.640625,747.604004 880.490845,742.210693 880.246948,735.996826 
	C880.089844,729.515076 878.115540,724.880554 873.030518,721.916992 
	C873.542786,721.292175 874.049255,720.127930 874.568237,720.122314 
	C884.600952,720.014648 894.635071,720.042542 904.819702,720.042542 
	C904.819702,721.044556 905.066162,722.059448 904.783325,722.238586 
	C898.814270,726.019104 898.200256,732.244324 898.112061,738.219177 
	C897.837463,756.831909 897.729004,775.458191 898.182434,794.063904 
	C898.319031,799.669373 900.088196,805.360535 901.864746,810.764221 
	C903.534119,815.841858 907.730286,818.549011 913.796265,819.605713 
	C918.013245,819.966248 921.514587,820.193604 924.995300,820.016113 
	C939.612183,819.270691 944.077148,812.406067 945.165222,801.060059 
	C945.533691,799.937073 945.902161,798.814087 946.139282,796.919434 
	C946.352600,794.746399 946.990967,793.346375 946.997437,791.943420 
	C947.081482,773.698364 947.218018,755.451294 947.007812,737.208557 
	C946.943176,731.597107 945.334351,726.273499 940.094971,722.913818 
	C939.288147,722.396423 938.659119,721.601868 937.947876,720.935425 
	C940.969666,720.267883 943.501160,720.777588 946.053528,720.924316 
	C948.692383,721.076050 951.351562,720.875305 954.001831,720.828735 
	C954.753052,720.875427 955.504333,720.922119 957.030884,720.964417 
	C960.823669,720.631409 963.841187,720.302734 966.132263,720.053162 
	C964.228271,724.393066 962.559814,728.196106 960.891357,731.999207 
	C960.615234,734.728271 960.339172,737.457397 960.046387,741.056274 
	C959.963745,757.284241 959.897888,772.642395 959.832031,788.000488 
	C959.746948,788.729431 959.661926,789.458374 959.434204,790.841431 
	C959.303650,792.665222 959.315674,793.834900 959.327637,795.004639 
	C959.232666,796.070129 959.137695,797.135559 958.960876,798.971680 
	C956.732544,805.530029 954.586060,811.317749 952.439575,817.105469 
	C952.439575,817.105469 952.299438,817.283325 951.975830,817.544495 
	C947.100952,820.595154 942.549622,823.384644 937.998291,826.174133 
	C936.570557,826.439880 935.142883,826.705566 933.053955,827.000671 
	C931.917358,827.317200 931.441895,827.604309 930.966431,827.891418 
	C928.928223,827.869690 926.890015,827.848022 924.095154,827.855957 
	C922.892395,827.948914 922.446228,828.012207 922.000122,828.075562 
	C917.652954,828.050049 913.305786,828.024597 908.300720,827.593140 
	C900.633484,826.912537 894.830017,823.548767 889.116455,819.954834 
	C888.371155,819.025940 887.625854,818.096985 886.579834,816.655884 
	C884.972351,813.712952 883.665588,811.282288 882.358887,808.851624 
	C881.945312,807.480469 881.531738,806.109314 881.137085,803.996704 
	C881.053162,802.503357 880.950439,801.751465 880.847656,800.999634 
z"/>
<path fill="#4B4847" opacity="1.000000" stroke="none" 
	d="
M1113.907227,806.892944 
	C1109.048096,817.427612 1108.848267,819.259277 1111.745117,826.376099 
	C1102.813232,826.376099 1093.909302,826.376099 1083.852173,826.376099 
	C1086.270020,824.869019 1087.987183,823.685425 1089.805420,822.685608 
	C1096.565063,818.968567 1099.139526,812.258972 1101.879150,805.732361 
	C1106.410522,794.936951 1110.752075,784.061890 1115.207520,773.234314 
	C1120.026855,761.522034 1125.039795,749.886230 1129.650513,738.092712 
	C1131.501465,733.358154 1128.271118,729.654724 1125.626953,726.191833 
	C1124.133423,724.235779 1122.031982,722.743713 1119.582275,720.463501 
	C1128.128418,720.463501 1135.834473,720.463501 1144.002319,720.463501 
	C1150.266357,736.164062 1156.649780,752.129822 1163.006348,768.106384 
	C1168.797607,782.662415 1174.516479,797.247375 1180.357300,811.783325 
	C1182.423584,816.925781 1185.417114,821.390625 1190.584839,824.018250 
	C1191.200806,824.331482 1191.586548,825.097534 1192.395508,826.011230 
	C1180.672485,826.011230 1169.477661,826.011230 1157.664551,826.011230 
	C1158.366333,824.243103 1159.523682,822.195007 1159.963745,820.002869 
	C1160.534790,817.157471 1161.421631,813.920776 1160.615479,811.338562 
	C1158.185303,803.553467 1155.163696,795.934814 1151.975708,788.419617 
	C1151.328735,786.894470 1148.988037,785.210510 1147.354370,785.131836 
	C1140.048096,784.780396 1132.708374,784.825623 1125.397705,785.131470 
	C1124.080444,785.186646 1122.288940,786.885681 1121.663696,788.257568 
	C1118.929077,794.257629 1116.543335,800.416748 1113.907227,806.892944 
M1129.901001,767.382141 
	C1128.565186,770.811401 1127.229492,774.240662 1125.775024,777.974670 
	C1133.648193,777.974670 1140.740112,777.974670 1147.782959,777.974670 
	C1147.885254,777.335449 1148.068970,776.963318 1147.969604,776.696716 
	C1144.560669,767.560059 1141.125244,758.433289 1137.491333,748.767395 
	C1134.906738,755.049133 1132.520508,760.848572 1129.901001,767.382141 
z"/>
<path fill="#4A4645" opacity="1.000000" stroke="none" 
	d="
M1474.000000,720.012329 
	C1475.638428,720.822205 1477.276978,721.632080 1478.952148,723.058472 
	C1479.207886,727.777893 1479.426880,731.880737 1479.645874,735.983521 
	C1477.738037,736.095337 1475.830322,736.207153 1473.467163,735.788330 
	C1470.443237,732.539978 1468.838867,728.469482 1464.048462,728.869080 
	C1459.665161,728.204712 1455.281860,727.540405 1450.009033,726.890442 
	C1445.774170,727.192139 1442.428833,727.479492 1438.496460,727.817261 
	C1438.496460,735.427917 1438.496460,742.220459 1438.496460,749.013000 
	C1438.430298,749.454590 1438.364014,749.896240 1438.291016,751.115845 
	C1438.284180,757.151184 1438.284180,762.408508 1438.284180,767.981140 
	C1444.921387,767.981140 1450.801147,768.515564 1456.520386,767.788269 
	C1460.174194,767.323730 1464.677368,765.888733 1466.836060,763.270020 
	C1469.489868,760.050598 1471.668823,760.118164 1474.936157,760.815063 
	C1474.525513,767.852783 1474.130249,774.624756 1473.726440,781.545898 
	C1471.204224,782.674316 1468.532837,783.986084 1466.948364,779.811523 
	C1466.680176,779.105286 1465.479370,778.679321 1464.636597,778.276367 
	C1456.211670,774.248901 1447.258423,775.046082 1439.073730,774.949341 
	C1439.073730,786.717224 1438.786133,797.997681 1439.304199,809.241028 
	C1439.414551,811.632690 1441.981201,814.861511 1444.262451,815.982727 
	C1447.792603,817.717896 1452.051025,817.971252 1456.000732,818.852905 
	C1459.104858,818.764954 1462.208984,818.677002 1466.043213,818.420898 
	C1474.367798,816.735596 1478.113892,810.182800 1483.061157,805.374939 
	C1486.096191,802.425842 1488.141479,802.826111 1491.119141,805.163879 
	C1488.333496,811.182739 1485.608887,817.069580 1482.884399,822.956482 
	C1482.302490,823.391785 1481.720703,823.827087 1480.566162,824.580078 
	C1476.849121,825.031433 1473.705566,825.195496 1470.560059,825.294006 
	C1452.253174,825.867310 1433.944824,826.396912 1415.639648,827.017456 
	C1412.719482,827.116455 1411.835693,825.801697 1412.236938,823.161438 
	C1412.236938,823.161438 1412.135742,823.131531 1412.486816,823.110962 
	C1414.879883,820.726868 1416.921875,818.363342 1418.963867,815.999878 
	C1418.963867,815.999878 1419.221802,815.879211 1419.500488,815.430908 
	C1420.330322,813.272461 1421.348877,811.565308 1421.359985,809.851562 
	C1421.472412,792.533691 1421.420166,775.214722 1421.414307,757.896057 
	C1421.447021,756.522766 1421.479858,755.149536 1421.454712,752.925659 
	C1421.276489,747.111572 1421.162598,742.147949 1421.034912,737.184692 
	C1420.840210,729.610413 1417.300171,724.656128 1410.068604,721.817139 
	C1410.062622,721.425476 1410.056641,721.033752 1410.536865,720.336914 
	C1415.682739,720.297852 1420.342285,720.563965 1425.001831,720.830078 
	C1429.693481,720.881958 1434.385254,720.933777 1439.989990,720.984497 
	C1451.935425,720.659607 1462.967773,720.335938 1474.000000,720.012329 
z"/>
<path fill="#4B4847" opacity="1.000000" stroke="none" 
	d="
M1341.044434,721.111816 
	C1341.944092,720.987183 1342.843872,720.862488 1344.317627,720.372803 
	C1354.496826,719.699402 1364.104126,719.448059 1373.704834,719.039062 
	C1375.853638,718.947510 1378.500000,721.585388 1380.138550,718.061646 
	C1383.837158,719.395508 1387.535645,720.729309 1391.984619,722.116211 
	C1393.490234,722.057007 1394.245605,721.944763 1395.000977,721.832458 
	C1396.420410,722.158447 1397.839966,722.484436 1399.655396,723.367310 
	C1400.420044,726.949890 1400.788574,729.975525 1401.157227,733.001099 
	C1400.886597,735.718567 1400.615967,738.435974 1399.765869,741.545532 
	C1396.813721,740.433228 1393.963257,739.354492 1392.166260,737.337463 
	C1388.221680,732.909180 1384.271606,728.818237 1377.999146,728.095337 
	C1377.215088,727.744690 1376.431030,727.394104 1374.916260,726.962158 
	C1364.386230,725.104004 1354.864746,725.690613 1345.806519,730.217773 
	C1344.542236,730.880737 1343.277954,731.543701 1341.489990,732.559204 
	C1340.217163,733.565369 1339.467896,734.219116 1338.718750,734.872864 
	C1338.162842,735.233398 1337.606934,735.593872 1336.625854,736.357666 
	C1329.907837,742.899231 1325.947632,750.259094 1324.568604,758.970886 
	C1324.094971,761.727051 1323.621460,764.483154 1323.134888,768.051270 
	C1323.320190,784.833435 1328.458740,798.794556 1340.367676,809.747742 
	C1349.663574,818.297668 1360.667114,821.009338 1373.002930,818.133301 
	C1374.175903,818.002502 1375.348755,817.871765 1377.219482,817.549561 
	C1381.990723,815.684265 1386.064209,814.010254 1390.137695,812.336182 
	C1390.683594,812.101562 1391.229492,811.866882 1392.231934,811.267944 
	C1394.681274,808.923645 1396.712402,806.980469 1398.656372,804.953674 
	C1400.851562,802.664734 1403.097046,801.641052 1406.105103,804.327942 
	C1402.658447,811.269348 1401.249268,819.454712 1392.348022,822.118591 
	C1388.821167,823.174011 1385.389648,824.548584 1381.914795,825.777832 
	C1380.420654,825.885803 1378.926636,825.993774 1376.699463,826.366943 
	C1370.310913,827.088623 1364.655518,827.545105 1359.000000,828.001587 
	C1358.246094,827.913208 1357.492065,827.824768 1355.940918,827.802002 
	C1349.560059,826.567688 1343.704712,825.944031 1338.447510,823.831360 
	C1326.355835,818.972168 1316.965820,810.732788 1311.069214,798.906555 
	C1308.935913,794.627869 1307.051758,790.225037 1305.053955,785.878784 
	C1305.053955,785.878784 1304.994141,785.427734 1304.985718,784.796021 
	C1304.593262,781.775879 1304.209351,779.387512 1303.825439,776.999084 
	C1303.873047,775.608154 1303.920654,774.217285 1303.969482,771.992859 
	C1305.348511,765.423645 1306.195557,759.493408 1308.211060,753.991272 
	C1312.885498,741.230957 1321.056519,731.255737 1333.437622,725.079590 
	C1335.996338,723.803223 1338.510010,722.436768 1341.044434,721.111816 
z"/>
<path fill="#4B4847" opacity="1.000000" stroke="none" 
	d="
M470.835632,769.526672 
	C470.933868,769.798340 471.122498,769.971436 471.728973,770.347534 
	C473.194153,771.522217 474.331909,772.395264 475.469666,773.268311 
	C476.321381,774.141235 477.173126,775.014099 478.450562,776.319336 
	C480.476898,778.543762 482.077576,780.335938 483.678223,782.128052 
	C488.986572,791.259888 489.584656,800.607849 484.580566,810.717529 
	C482.979614,812.879211 481.764038,814.518555 480.548492,816.157837 
	C480.548492,816.157837 480.306763,816.311523 480.002441,816.598511 
	C478.649750,817.972351 477.601379,819.059143 476.552979,820.145935 
	C476.552979,820.145935 476.293884,820.261047 475.943024,820.516357 
	C474.797333,821.357971 474.002502,821.944336 473.207642,822.530762 
	C471.894989,823.066650 470.582336,823.602600 468.698639,824.457764 
	C466.085052,825.575989 464.042511,826.374878 461.999939,827.173828 
	C461.553833,827.080444 461.107727,826.986938 459.996826,826.923218 
	C458.887787,827.022339 458.443573,827.091797 457.999390,827.161194 
	C448.812653,830.056335 440.402191,826.219910 431.947968,823.775635 
	C429.723389,823.132568 427.313171,820.446045 426.509277,818.162415 
	C425.065948,814.062683 424.364532,809.571777 424.211365,805.214111 
	C424.153076,803.556030 426.109467,801.161255 427.773376,800.268311 
	C430.126373,799.005676 431.905487,800.546875 433.050171,803.061707 
	C436.788818,811.275574 442.396210,817.456238 451.657532,819.563782 
	C457.399139,820.870422 465.150879,817.883606 468.915466,812.660217 
	C473.114380,806.834229 473.033173,800.136719 469.930359,794.162415 
	C465.418945,785.475891 457.059296,781.328979 449.777222,775.952209 
	C442.540405,770.608887 435.833435,765.047241 430.834167,757.306885 
	C424.314728,747.212952 430.831696,731.044373 437.956207,726.119629 
	C440.849121,724.119995 444.146118,722.704956 448.047974,720.991882 
	C454.041687,720.766785 459.284546,720.102234 464.440826,720.515991 
	C469.376831,720.912109 474.219788,722.816101 479.132538,720.499573 
	C480.467499,720.726990 481.802460,720.954346 483.508148,721.697998 
	C484.294037,726.143127 484.709198,730.071899 485.124390,734.000732 
	C485.092590,734.447693 485.060760,734.894714 485.057556,736.089233 
	C484.373596,738.829712 483.661041,740.822693 482.948517,742.815674 
	C480.861298,741.575256 478.724487,740.408203 476.716309,739.050842 
	C476.090576,738.627808 475.748291,737.721497 475.386353,736.982544 
	C472.867889,731.840393 468.550598,729.189331 463.181793,727.717773 
	C455.402283,725.585449 449.118317,727.631042 445.522797,733.745789 
	C442.125061,739.524109 443.432678,746.509277 448.960052,752.107605 
	C449.417236,752.696716 449.874420,753.285828 450.750427,754.267639 
	C457.724701,759.615784 464.280151,764.571228 470.835632,769.526672 
z"/>
<path fill="#4A4645" opacity="1.000000" stroke="none" 
	d="
M865.887085,809.958496 
	C865.217468,810.645874 864.547913,811.333191 863.569824,812.498535 
	C861.174133,815.371704 859.086975,817.766846 856.999817,820.162048 
	C853.196228,821.986511 849.392639,823.810974 844.881226,825.822876 
	C839.166260,826.662354 834.101685,828.106079 829.167725,827.748230 
	C824.024841,827.375244 819.076965,824.726929 813.916626,824.065063 
	C808.710266,823.397278 806.603882,820.615784 805.838867,815.998901 
	C805.882202,815.244385 805.925476,814.489929 805.902344,812.962646 
	C805.740295,808.851074 805.644653,805.512268 805.549072,802.173523 
	C805.990417,801.661133 806.431763,801.148682 807.362061,800.362183 
	C812.961487,799.085205 813.301025,803.513794 814.702148,806.384827 
	C819.032532,815.258484 829.169800,821.045898 838.187073,819.507935 
	C838.599243,819.396362 839.011475,819.284790 840.047607,819.074219 
	C842.162842,818.096252 843.654053,817.217224 845.145264,816.338257 
	C846.854675,814.509644 848.564087,812.681091 850.574646,810.233154 
	C851.223328,808.075623 851.570862,806.537537 851.918457,804.999512 
	C852.009521,804.245300 852.100647,803.491028 852.186401,801.965210 
	C851.614136,798.809265 851.786072,795.757446 850.345154,794.162781 
	C845.541626,788.846313 840.159790,784.052368 834.999634,779.058105 
	C834.596008,778.703796 834.192444,778.349487 833.337280,777.656250 
	C823.992493,771.160706 814.690613,765.424072 809.948608,755.000793 
	C809.652100,753.888367 809.355591,752.776001 808.996826,750.997131 
	C808.863525,749.885803 808.792542,749.440918 808.721558,748.996033 
	C808.782104,747.281250 808.842651,745.566528 808.950989,743.055542 
	C810.835388,735.090637 813.991394,728.724915 820.039124,724.119080 
	C823.777588,722.797913 827.515991,721.476746 832.088623,720.081970 
	C838.615417,720.307373 844.307983,720.606445 850.000549,720.905518 
	C851.765686,720.972412 853.530823,721.039368 855.994690,721.044556 
	C858.463013,720.931763 860.232666,720.880737 862.002258,720.829712 
	C862.990479,722.153259 864.685730,723.402954 864.833191,724.814331 
	C865.258606,728.886658 865.060120,733.024170 865.133484,737.898682 
	C865.208923,739.108459 865.257568,739.555603 865.306213,740.002686 
	C864.719177,740.901489 864.132141,741.800293 862.900024,742.832581 
	C859.931458,740.891602 856.984497,739.206177 855.401794,736.669495 
	C850.709106,729.148743 843.815613,726.428223 835.544800,726.973755 
	C830.137939,727.330444 826.395874,730.901428 824.579956,735.889465 
	C822.382568,741.925354 823.911804,747.705688 828.516968,751.841309 
	C835.290405,757.924255 842.567200,763.472900 849.852478,768.952820 
	C858.257629,775.274963 865.381714,782.436279 868.121826,792.999756 
	C868.104309,795.043152 868.086731,797.086487 868.028381,799.945190 
	C867.287415,803.826538 866.587219,806.892578 865.887085,809.958496 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M696.679688,719.994019 
	C706.387695,726.431580 705.995972,736.304199 705.934143,745.856812 
	C705.787598,768.492920 705.366455,791.127258 705.046997,813.762146 
	C704.968506,819.319458 701.515930,822.587585 696.660706,824.883057 
	C696.832764,825.296448 697.004822,825.709900 697.176819,826.123291 
	C706.720642,826.123291 716.264465,826.123291 725.808289,826.123291 
	C726.147461,825.719421 726.486633,825.315552 726.825867,824.911682 
	C719.256592,821.714661 718.915222,815.130554 718.105774,808.398071 
	C718.974854,808.739319 720.243164,809.346375 720.499512,810.242920 
	C721.706543,814.463196 723.461182,817.781982 727.687561,820.170288 
	C731.625854,822.395935 730.408020,827.956970 725.945068,829.398926 
	C723.156921,830.299622 720.039612,831.173279 717.234863,830.804749 
	C712.719238,830.211365 709.128418,831.337158 704.839478,832.605103 
	C700.684265,833.833496 694.618042,832.133911 689.322998,832.038025 
	C687.243103,832.000366 685.210876,829.326843 683.515808,827.442200 
	C686.569214,826.866028 689.263733,826.701477 692.170288,826.523926 
	C691.832642,825.232849 691.862854,824.512878 691.563904,824.329468 
	C686.285767,821.090881 684.834045,816.197571 684.789307,810.303406 
	C684.630310,789.342590 684.109680,768.384277 684.010315,747.423584 
	C683.965393,737.937134 683.052429,728.055298 691.749939,720.331970 
	C689.568726,720.109680 688.283752,719.978760 686.998779,719.847778 
	C688.581604,719.370972 690.168396,718.510803 691.746094,718.527100 
	C693.264648,718.542664 694.773804,719.464661 696.679688,719.994019 
z"/>
<path fill="#4B4847" opacity="1.000000" stroke="none" 
	d="
M570.140015,836.265686 
	C566.861633,838.028748 563.930115,839.904114 560.724670,840.878723 
	C555.319519,842.522095 549.740784,843.594421 544.235046,844.906860 
	C543.892273,844.143127 543.549438,843.379456 543.206665,842.615723 
	C544.946289,841.492676 546.554321,840.021362 548.447937,839.305664 
	C557.622864,835.837830 562.255859,829.540283 564.268677,819.680725 
	C569.107239,795.979492 566.872314,772.171936 566.930847,748.387695 
	C566.941284,744.159851 567.064270,739.815857 566.170837,735.736694 
	C565.365295,732.059143 563.474548,728.538391 561.605408,725.204773 
	C560.471741,723.182922 558.469666,721.647949 556.484009,719.487793 
	C568.111389,719.487793 578.927917,719.487793 590.119263,719.487793 
	C582.390259,728.000366 584.155273,738.601746 584.022339,748.744324 
	C583.817383,764.391113 584.118042,780.045410 583.840820,795.690063 
	C583.721619,802.416870 582.855103,809.147644 582.034180,815.840576 
	C581.015198,824.148926 577.233521,830.989624 570.140015,836.265686 
z"/>
<path fill="#4A4645" opacity="1.000000" stroke="none" 
	d="
M535.764160,727.722473 
	C535.764160,727.722473 535.379578,727.850708 534.880005,728.067627 
	C533.976868,730.523682 533.573242,732.762756 533.169556,735.001831 
	C533.116699,738.697205 533.063782,742.392639 533.008484,746.874268 
	C533.052673,748.107239 533.099243,748.553894 533.145813,749.000610 
	C533.096375,760.691406 533.046936,772.382202 532.995911,784.998840 
	C532.240479,796.582886 531.486694,807.241089 530.732849,817.899292 
	C529.772766,820.655151 528.812744,823.411072 527.489868,826.757751 
	C527.013550,827.996643 527.134644,828.888672 526.751831,829.256897 
	C518.389587,837.300781 509.191711,843.718506 496.999756,844.104980 
	C496.555420,844.005066 496.111084,843.905090 495.110962,843.750061 
	C494.110107,843.437744 493.665009,843.180481 493.219910,842.923218 
	C494.065155,841.938354 494.910370,840.953552 496.337402,839.683716 
	C508.557770,836.767822 513.198730,827.796753 513.856262,817.540833 
	C515.211426,796.406006 515.200500,775.183594 515.751648,753.997253 
	C515.800537,753.551331 515.849365,753.105408 515.888733,751.874146 
	C515.658264,746.127991 515.285950,741.168091 515.253601,736.205994 
	C515.210632,729.607117 511.889099,724.983337 506.874512,721.236328 
	C506.248260,720.768433 505.651276,720.261475 505.040710,719.772583 
	C505.157806,719.439270 505.274933,719.105896 505.392029,718.772583 
	C510.261963,719.125305 515.131897,719.478027 520.001831,719.830750 
	C520.753113,719.877991 521.504456,719.925232 523.042053,719.973267 
	C527.219238,719.601807 530.610168,719.229553 534.001038,718.857300 
	C535.379639,718.907104 536.758301,718.956909 538.531189,719.450806 
	C537.871704,722.504089 536.817932,725.113281 535.764160,727.722473 
z"/>
<path fill="#4B4847" opacity="1.000000" stroke="none" 
	d="
M686.570801,719.940308 
	C688.283752,719.978760 689.568726,720.109680 691.749939,720.331970 
	C683.052429,728.055298 683.965393,737.937134 684.010315,747.423584 
	C684.109680,768.384277 684.630310,789.342590 684.789307,810.303406 
	C684.834045,816.197571 686.285767,821.090881 691.563904,824.329468 
	C691.862854,824.512878 691.832642,825.232849 692.170288,826.523926 
	C689.263733,826.701477 686.569214,826.866028 683.436646,827.101868 
	C682.563232,827.115234 682.127869,827.057373 681.130493,826.581787 
	C673.714233,826.164124 666.859924,826.164124 659.050720,826.164124 
	C660.828491,824.163818 662.450134,822.645874 663.680664,820.858765 
	C664.680542,819.406616 665.211304,817.631592 665.950134,815.999756 
	C666.423828,811.970337 667.296692,807.941589 667.303406,803.911377 
	C667.335876,784.477844 667.250488,765.042175 666.939026,745.611450 
	C666.856750,740.479675 666.394958,735.203796 665.030334,730.293396 
	C664.057617,726.793335 661.282593,723.794128 658.982544,720.032837 
	C668.228943,720.032837 677.185913,720.032837 686.570801,719.940308 
z"/>
<path fill="#404143" opacity="1.000000" stroke="none" 
	d="
M851.077271,873.490295 
	C851.089844,866.910278 851.089844,860.783081 851.089844,854.123413 
	C858.594238,854.123413 865.915527,853.434937 873.045166,854.309326 
	C880.787354,855.258911 884.708557,859.830627 885.845154,866.705261 
	C886.958740,873.440918 884.081421,878.566467 876.302917,883.022888 
	C879.580017,887.831726 882.838135,892.612732 886.139893,897.457764 
	C882.501770,898.874390 880.272583,897.786255 878.458374,894.886414 
	C876.481140,891.725952 874.222778,888.734863 871.971191,885.757446 
	C871.405762,885.009705 870.415100,884.138550 869.589783,884.106689 
	C865.305786,883.941589 861.011963,884.029907 856.384521,884.029907 
	C856.384521,888.696472 856.384521,892.960388 856.384521,897.622498 
	C854.552856,897.622498 853.057556,897.622498 851.969971,897.622498 
	C851.006714,893.710266 850.083740,889.979431 849.176392,886.244812 
	C849.099243,885.926819 849.060974,885.572388 849.114868,885.253601 
	C849.752686,881.481384 850.411499,877.712708 851.077271,873.490295 
M856.167175,860.813232 
	C856.167175,867.049927 856.167175,873.286621 856.167175,880.226318 
	C862.469177,879.775757 868.104431,879.752441 873.598022,878.858459 
	C877.888550,878.160095 880.401184,874.892700 880.957214,870.531555 
	C881.497009,866.296753 880.389404,862.420593 876.506165,860.238403 
	C870.231628,856.712463 863.380127,857.970581 856.670471,858.592041 
	C856.465149,858.611084 856.333923,859.430176 856.167175,860.813232 
z"/>
<path fill="#6BC1EC" opacity="1.000000" stroke="none" 
	d="
M188.051468,912.908752 
	C189.424103,917.241211 190.844360,921.314819 195.773453,923.246582 
	C199.243759,924.606812 199.658096,927.807617 198.183716,931.496460 
	C191.039398,926.051453 184.020721,920.287109 177.039993,914.477234 
	C175.130692,912.888123 173.335220,911.162292 171.245087,908.908691 
	C168.976395,906.274597 166.950119,904.231079 164.923843,902.187561 
	C164.923859,902.187561 164.936783,902.072632 164.783325,901.773438 
	C163.416992,900.327271 162.204086,899.180359 160.991196,898.033447 
	C160.499756,897.429504 160.008316,896.825623 159.183075,895.813965 
	C158.212891,894.670959 157.576477,893.935608 156.940063,893.200317 
	C156.760483,892.889954 156.580917,892.579590 156.092667,891.910400 
	C155.595734,891.264160 155.331177,891.098328 154.990341,891.054260 
	C154.990341,891.054260 155.000610,891.000183 154.872665,890.715820 
	C153.827957,889.376953 152.911179,888.322449 151.994400,887.267944 
	C150.315201,885.058777 148.636002,882.849670 146.828140,880.111572 
	C146.699478,879.582581 146.789948,879.155334 147.158630,879.067505 
	C148.322479,877.493164 149.241394,876.056702 149.871307,874.503174 
	C150.327637,873.377747 150.400879,872.096924 150.914688,871.011597 
	C163.473450,885.061462 175.762466,898.985107 188.051468,912.908752 
M150.601212,879.522217 
	C150.601212,879.522217 150.465714,879.609680 150.601212,879.522217 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1455.927246,818.501709 
	C1452.051025,817.971252 1447.792603,817.717896 1444.262451,815.982727 
	C1441.981201,814.861511 1439.414551,811.632690 1439.304199,809.241028 
	C1438.786133,797.997681 1439.073730,786.717224 1439.073730,774.949341 
	C1447.258423,775.046082 1456.211670,774.248901 1464.636597,778.276367 
	C1465.479370,778.679321 1466.680176,779.105286 1466.948364,779.811523 
	C1468.532837,783.986084 1471.204224,782.674316 1473.726440,781.545898 
	C1474.130249,774.624756 1474.525513,767.852783 1474.936157,760.815063 
	C1471.668823,760.118164 1469.489868,760.050598 1466.836060,763.270020 
	C1464.677368,765.888733 1460.174194,767.323730 1456.520386,767.788269 
	C1450.801147,768.515564 1444.921387,767.981140 1438.284180,767.981140 
	C1438.284180,762.408508 1438.284180,757.151184 1438.388916,751.440002 
	C1439.661621,752.651489 1441.187378,754.180359 1441.890381,756.023010 
	C1442.508057,757.642761 1441.830322,759.749756 1442.424561,761.387573 
	C1442.913574,762.735718 1444.285645,764.462585 1445.518677,764.697388 
	C1448.161865,765.200867 1451.263062,765.604553 1453.641235,764.676758 
	C1457.599854,763.132324 1461.148315,760.527344 1464.846802,758.330688 
	C1466.041748,757.621033 1467.069214,756.423035 1468.340942,756.091858 
	C1471.126465,755.366333 1474.019287,755.052185 1478.155273,754.352173 
	C1478.155273,757.139160 1478.172485,760.065063 1478.151489,762.990784 
	C1478.112671,768.384033 1477.948242,773.778748 1478.034302,779.169739 
	C1478.096436,783.064636 1476.458252,784.407349 1472.550537,785.200012 
	C1467.588501,786.206360 1464.522949,784.624756 1461.475708,781.097473 
	C1458.925659,778.145508 1448.087524,776.588196 1444.597778,778.432068 
	C1443.551514,778.984924 1442.452881,780.232422 1442.191895,781.351501 
	C1440.134155,790.171204 1440.258423,799.230652 1442.512573,807.784973 
	C1443.385132,811.096802 1448.412964,813.373901 1451.673218,815.964905 
	C1452.882202,816.925659 1454.449707,817.435303 1455.927246,818.501709 
z"/>
<path fill="#6BC1EC" opacity="1.000000" stroke="none" 
	d="
M329.391418,918.594360 
	C329.243896,917.260559 329.417877,915.841064 329.548737,914.417664 
	C329.740753,912.329163 329.901978,910.237732 329.917542,907.669617 
	C337.854065,897.930969 346.296936,888.946045 353.932037,879.320312 
	C359.790466,871.934570 364.630341,863.740845 369.962830,856.316895 
	C369.760101,860.278015 370.425629,863.114807 374.997864,863.225403 
	C375.134705,863.681763 375.174225,863.868652 375.213776,864.055542 
	C375.213776,864.055542 375.058624,864.121033 374.885132,864.228210 
	C374.489471,864.456543 374.416382,864.637878 374.492432,864.879395 
	C374.392090,865.070129 374.291748,865.260803 373.905548,865.829956 
	C373.350739,866.376404 373.251129,866.615051 373.320831,866.924316 
	C373.243774,867.084839 373.166748,867.245361 372.804443,867.769897 
	C372.390015,868.431152 372.260834,868.728394 372.131683,869.025696 
	C372.131714,869.025696 372.018921,869.054871 371.856720,869.168945 
	C371.466156,869.428223 371.372833,869.634460 371.414490,869.901855 
	C371.319763,870.065735 371.225067,870.229675 370.840485,870.777710 
	C370.275146,871.384033 370.153229,871.671387 370.184814,872.023865 
	C370.184814,872.023865 370.045471,872.092163 369.873474,872.205444 
	C369.471558,872.444275 369.383514,872.635193 369.437378,872.891541 
	C369.336182,873.058472 369.234985,873.225342 368.851013,873.786865 
	C368.314545,874.402893 368.187073,874.682007 368.185852,875.018799 
	C367.297272,876.328369 366.408661,877.637878 364.965668,879.293335 
	C361.192413,884.061890 357.973572,888.484558 354.754730,892.907227 
	C350.529053,897.386414 346.303345,901.865601 341.744080,906.780090 
	C341.190155,907.414734 341.049500,907.659912 340.988464,907.950806 
	C337.223511,911.469543 333.458527,914.988281 329.391418,918.594360 
z"/>
<path fill="#3187C7" opacity="1.000000" stroke="none" 
	d="
M392.037537,775.921265 
	C392.355591,773.043335 392.686096,770.166626 392.988556,767.287109 
	C393.365845,763.695374 393.591034,760.080322 394.167389,756.521606 
	C394.328094,755.529541 395.497559,754.700806 396.204254,753.797119 
	C396.711395,753.925964 397.218567,754.054810 397.725708,754.183655 
	C398.236298,763.236938 398.746857,772.290283 399.523193,782.055664 
	C399.828400,783.494507 399.867889,784.221191 399.907349,784.947876 
	C399.824341,785.582397 399.741333,786.216980 399.508362,787.502686 
	C398.884552,792.769897 398.410706,797.385864 397.936829,802.001892 
	C397.829712,802.321350 397.722565,802.640808 397.489380,803.436401 
	C397.303070,804.594971 397.242767,805.277344 397.182434,805.959778 
	C397.062225,806.391174 396.941986,806.822510 396.582550,807.853088 
	C396.224640,809.635071 396.105957,810.817810 395.987274,812.000610 
	C393.411377,820.353516 390.835510,828.706360 387.852081,837.463074 
	C387.444550,837.866882 387.015045,838.082397 387.010803,837.664429 
	C387.923065,833.613403 388.945770,830.002747 389.718353,826.339417 
	C390.224762,823.938110 390.610840,821.314575 386.850250,821.198120 
	C384.784668,825.223999 382.813995,829.065002 380.867859,832.515381 
	C382.962341,825.160828 385.648804,818.310974 386.962830,811.207275 
	C389.122437,799.531860 390.392426,787.691833 392.037537,775.921265 
z"/>
<path fill="#404143" opacity="1.000000" stroke="none" 
	d="
M724.186157,869.769409 
	C729.821045,871.987976 735.158630,873.985657 740.527893,875.894104 
	C747.383179,878.330688 749.474854,881.104126 749.025269,887.362183 
	C748.662720,892.408325 743.997314,897.439819 738.268860,897.835388 
	C731.973572,898.270142 725.525696,898.888367 719.521545,895.750671 
	C716.397339,894.118042 715.845581,892.334656 718.187012,888.816833 
	C723.838623,894.203125 730.775940,894.733826 737.764404,892.858643 
	C740.200806,892.204895 743.159912,889.648010 743.786743,887.381348 
	C744.246887,885.717529 741.781067,882.161804 739.759705,881.125244 
	C735.842529,879.116455 731.344238,878.201111 727.042114,876.991882 
	C720.693665,875.207336 716.157410,871.659302 716.942566,863.780457 
	C717.451782,858.670471 722.244873,854.045288 728.512634,854.100830 
	C733.921753,854.148743 739.343445,855.175476 744.701843,856.102783 
	C745.553711,856.250244 746.101868,858.152527 746.790405,859.243530 
	C745.590088,859.508911 744.348999,860.116333 743.196655,859.979004 
	C738.710510,859.444519 734.227600,857.989807 729.789917,858.151245 
	C723.159607,858.392578 720.589905,863.915649 724.186157,869.769409 
z"/>
<path fill="#404143" opacity="1.000000" stroke="none" 
	d="
M1194.547485,877.233643 
	C1203.856812,883.146912 1199.555786,895.905945 1189.825439,897.413696 
	C1180.201294,898.904968 1171.805786,898.821594 1166.013550,892.178589 
	C1167.334473,889.454407 1168.591675,889.357178 1171.664917,890.703186 
	C1176.033936,892.616699 1181.080322,893.723328 1185.843506,893.744202 
	C1189.163696,893.758728 1193.572998,892.688416 1193.988037,887.708374 
	C1194.346924,883.401062 1191.621216,880.350464 1186.614624,879.139893 
	C1183.339844,878.348145 1180.024414,877.673340 1176.818237,876.658752 
	C1169.453369,874.328430 1166.906860,870.238525 1167.679443,862.412781 
	C1168.127930,857.869385 1172.534790,854.935913 1179.283081,853.900391 
	C1185.755737,852.907227 1191.687256,853.922852 1197.375732,856.886475 
	C1196.348145,861.210815 1196.408569,860.960999 1192.705200,860.065918 
	C1188.686890,859.094727 1184.555542,858.247498 1180.446045,858.097473 
	C1176.711426,857.961182 1173.821411,860.072327 1172.975708,863.976929 
	C1172.026611,868.358154 1174.308472,870.815002 1178.307983,872.058228 
	C1183.615479,873.708069 1188.914551,875.385681 1194.547485,877.233643 
z"/>
<path fill="#404143" opacity="1.000000" stroke="none" 
	d="
M789.982178,893.785278 
	C797.464294,893.837341 804.949768,893.787598 812.425171,894.039368 
	C813.706970,894.082581 814.945496,895.411377 816.203979,896.146362 
	C815.983948,896.656738 815.763916,897.167175 815.543884,897.677551 
	C805.308899,897.677551 795.073914,897.677551 784.203857,897.677551 
	C784.203857,883.320679 784.203857,868.848999 784.203857,853.840271 
	C793.293091,853.840271 802.915466,853.757690 812.531250,853.971924 
	C813.460632,853.992615 814.348938,855.853088 815.256287,856.859497 
	C814.919861,857.272217 814.583496,857.684875 814.247131,858.097595 
	C806.466064,858.097595 798.685059,858.097595 790.200195,858.124146 
	C789.124023,858.332642 789.028137,858.610046 789.208740,858.983093 
	C789.208740,863.772705 789.208740,868.562378 789.208740,873.815857 
	C796.616577,873.815857 804.008606,873.815857 811.400696,873.815857 
	C811.674011,874.348145 811.947327,874.880493 812.220642,875.412781 
	C810.864258,876.190796 809.532593,877.585022 808.147339,877.640564 
	C802.015198,877.886108 795.867554,877.746887 789.020935,877.746887 
	C789.020935,882.603455 789.020935,887.346497 789.064697,892.804565 
	C789.399719,893.608154 789.690979,893.696716 789.982178,893.785278 
z"/>
<path fill="#404143" opacity="1.000000" stroke="none" 
	d="
M1109.981934,893.779663 
	C1117.289795,893.833435 1124.599854,894.009033 1131.904663,893.884766 
	C1135.102783,893.830383 1135.561157,895.093567 1134.612305,897.828918 
	C1124.481567,897.828918 1114.415039,897.828918 1103.869141,897.828918 
	C1103.869141,890.379578 1103.869141,883.120911 1103.869141,875.862305 
	C1103.869141,868.737122 1103.869141,861.611938 1103.869141,854.156494 
	C1113.821655,854.156494 1123.545898,854.156494 1133.574829,854.156494 
	C1134.531372,856.565186 1134.486694,858.190857 1130.841553,858.114197 
	C1124.197510,857.974487 1117.548096,858.087524 1110.204468,858.133667 
	C1109.146484,858.349915 1109.054443,858.619507 1109.231812,858.981079 
	C1109.562988,863.785645 1109.894287,868.590271 1110.973389,873.502075 
	C1112.817383,873.463501 1113.913574,873.317627 1115.009766,873.171753 
	C1118.972412,873.279297 1122.955078,873.191650 1126.887939,873.591797 
	C1128.430298,873.748657 1129.861572,874.998779 1131.343384,875.751099 
	C1129.930054,876.415283 1128.536377,877.598145 1127.099976,877.652649 
	C1121.314331,877.872437 1115.515503,877.743713 1109.046387,877.743713 
	C1109.046387,882.615417 1109.046387,887.352844 1109.088135,892.801697 
	C1109.413940,893.601929 1109.697876,893.690796 1109.981934,893.779663 
z"/>
<path fill="#404143" opacity="1.000000" stroke="none" 
	d="
M1067.634277,890.143188 
	C1067.828247,891.252991 1068.090820,892.460388 1067.617798,892.935608 
	C1058.185669,902.411255 1038.659668,899.062683 1032.230957,887.206360 
	C1025.658936,875.085754 1030.558960,863.637146 1037.937500,857.830627 
	C1045.713867,851.710999 1061.056519,851.334106 1068.910522,859.672058 
	C1067.336548,862.810303 1065.750366,863.216248 1062.421631,861.127258 
	C1055.217529,856.606323 1045.675537,856.941162 1039.540405,863.075012 
	C1033.677368,868.936890 1033.276489,880.492798 1038.184082,886.794922 
	C1043.429932,893.531494 1054.476318,896.630127 1061.584595,891.308716 
	C1063.043701,890.216492 1065.411499,890.337891 1067.634277,890.143188 
z"/>
<path fill="#24AAE1" opacity="1.000000" stroke="none" 
	d="
M150.644928,870.885437 
	C150.400879,872.096924 150.327637,873.377747 149.871307,874.503174 
	C149.241394,876.056702 148.322479,877.493164 146.945221,878.898193 
	C145.958878,878.220764 145.554626,877.624817 145.294235,876.905273 
	C145.211182,876.609314 144.984268,876.436951 144.815872,876.235474 
	C144.874390,876.206360 144.743668,876.203430 144.734146,875.933655 
	C144.438385,875.472961 144.152145,875.282104 143.623550,874.870361 
	C141.948334,872.729797 140.515488,870.810120 139.082642,868.890503 
	C139.082642,868.890503 139.039230,868.990051 139.038727,868.620972 
	C138.053635,866.796570 137.069031,865.341248 136.084427,863.885986 
	C136.084427,863.885986 136.044281,863.984802 136.033539,863.608521 
	C134.713089,861.071594 133.403397,858.910950 132.093704,856.750305 
	C132.093704,856.750305 132.028778,856.299255 131.881653,855.881470 
	C131.617355,855.133911 131.391327,854.918274 131.056458,854.816772 
	C131.056458,854.816772 131.012405,854.332275 130.864441,853.908691 
	C130.594864,853.168518 130.366623,852.983154 130.031738,852.929016 
	C130.031738,852.929016 130.002945,852.992249 130.012238,852.612854 
	C128.663956,849.528076 127.306396,846.822754 125.948822,844.117371 
	C125.948822,844.117371 125.985390,844.050720 125.945633,843.676758 
	C124.640747,840.489685 123.375610,837.676514 122.110481,834.863403 
	C122.110489,834.863403 122.130699,834.950073 122.206894,834.690857 
	C122.283096,834.431641 122.338646,833.964966 122.554420,833.688354 
	C121.880959,831.256287 120.991722,829.100891 119.996689,826.782104 
	C119.890892,826.618713 119.924171,826.230835 119.953018,825.777710 
	C120.624702,822.518127 118.449471,818.523743 122.080345,817.160828 
	C124.429588,820.965881 126.288330,823.976440 128.425873,827.196899 
	C134.874130,840.195435 141.043610,852.984070 147.143188,866.133057 
	C147.909760,867.388245 148.746216,868.283142 149.765472,869.458618 
	C150.180496,870.121216 150.412720,870.503357 150.644928,870.885437 
z"/>
<path fill="#404143" opacity="1.000000" stroke="none" 
	d="
M936.908691,898.024292 
	C935.051575,896.747253 932.994751,895.752197 932.231750,894.143433 
	C927.729309,884.651001 923.501648,875.027466 919.238586,865.422607 
	C917.685425,861.923218 916.289062,858.354126 914.700378,854.525757 
	C918.380005,853.507080 920.458923,853.836060 922.031494,857.785156 
	C926.253906,868.388428 931.068115,878.756287 935.686096,889.200500 
	C935.846130,889.562439 936.420593,889.741272 937.199341,890.280823 
	C941.847046,879.361755 946.532654,868.671082 950.921387,857.859985 
	C952.334839,854.377991 954.416260,853.396606 958.284912,854.400269 
	C952.105591,868.422913 946.025391,882.290039 939.831238,896.105957 
	C939.451904,896.952209 938.169189,897.393311 936.908691,898.024292 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M868.488770,792.910095 
	C865.381714,782.436279 858.257629,775.274963 849.852478,768.952820 
	C842.567200,763.472900 835.290405,757.924255 828.516968,751.841309 
	C823.911804,747.705688 822.382568,741.925354 824.579956,735.889465 
	C826.395874,730.901428 830.137939,727.330444 835.544800,726.973755 
	C843.815613,726.428223 850.709106,729.148743 855.401794,736.669495 
	C856.984497,739.206177 859.931458,740.891602 862.627319,743.020386 
	C861.199707,744.835449 852.978088,745.988953 851.807068,744.399780 
	C851.152588,743.511536 851.422058,741.953613 851.240967,740.702332 
	C851.041687,739.324829 851.295410,737.285767 850.495422,736.695557 
	C847.237183,734.291565 843.820312,731.941589 840.128540,730.340210 
	C837.477966,729.190308 834.697815,729.804749 832.988708,733.026917 
	C832.364197,734.204407 830.383301,734.662476 828.271667,735.881348 
	C826.203430,744.023254 829.979370,749.447021 837.176697,754.926636 
	C841.399841,758.141968 845.222778,761.882935 849.225525,765.387756 
	C849.714722,765.816101 850.180542,766.591858 850.693909,766.624207 
	C859.777527,767.196167 862.297119,774.770630 866.110962,780.963318 
	C866.973633,782.364136 868.281067,783.692566 868.559509,785.205994 
	C869.014343,787.678589 868.792236,790.275818 868.488770,792.910095 
z"/>
<path fill="#3187C7" opacity="1.000000" stroke="none" 
	d="
M128.147095,826.987000 
	C126.288330,823.976440 124.429588,820.965881 122.080345,817.160828 
	C118.449471,818.523743 120.624702,822.518127 119.710999,825.537842 
	C118.996490,824.725891 118.552841,823.700745 118.109192,822.675537 
	C118.109184,822.675537 118.167107,822.305481 118.083282,821.824951 
	C117.665604,820.563110 117.331741,819.781799 116.997879,819.000488 
	C116.994431,818.536377 116.990982,818.072327 116.878868,817.014160 
	C116.552246,816.150879 116.334297,815.881653 116.116356,815.612427 
	C114.784050,808.708496 113.451729,801.804626 112.214966,794.158020 
	C112.379547,793.209656 112.448563,793.003967 112.671097,792.461426 
	C112.512962,789.418335 112.201309,786.712158 111.762230,783.658325 
	C111.659515,782.575500 111.684242,781.840210 111.708969,781.104919 
	C113.254852,777.835144 114.800728,774.565369 116.346603,771.295593 
	C116.715256,771.304016 117.083900,771.312500 117.452553,771.320923 
	C118.081261,776.952515 118.709969,782.584106 119.801201,788.527954 
	C122.891518,801.555786 125.519310,814.271423 128.147095,826.987000 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M980.478516,800.079956 
	C980.867920,803.325256 980.781494,806.658630 980.968445,809.976501 
	C981.290833,815.697449 980.255432,820.528381 974.103394,822.832153 
	C973.126038,823.198181 972.528687,824.579041 970.937805,826.455322 
	C983.371399,826.455322 994.507751,826.455322 1004.916565,826.455322 
	C1002.937134,822.388428 1000.874573,818.150879 998.748291,813.514526 
	C1002.001099,814.896790 1005.364624,816.599548 1008.591370,818.530762 
	C1009.173706,818.879211 1009.503235,820.200256 1009.414734,821.014160 
	C1009.166382,823.296875 1008.632080,825.548096 1008.223389,827.814026 
	C1007.935181,829.411499 1007.667847,831.012756 1007.391357,832.612366 
	C1005.379272,832.016968 1003.383545,831.356750 1001.350891,830.842834 
	C998.903992,830.224243 996.440063,829.640564 993.951904,829.236755 
	C993.217590,829.117554 992.329712,829.962097 991.591064,829.849182 
	C984.933411,828.831055 978.687073,830.762085 972.375671,832.321228 
	C971.640503,832.502808 970.154541,832.432739 970.123718,832.269836 
	C969.402466,828.457886 968.230347,824.584656 968.433960,820.792114 
	C968.588501,817.912292 971.065796,816.726562 974.421692,817.541687 
	C977.380615,818.260376 979.342957,813.484985 978.937561,808.848022 
	C978.689270,806.008728 979.687439,803.060425 980.478516,800.079956 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M448.972015,751.667603 
	C443.432678,746.509277 442.125061,739.524109 445.522797,733.745789 
	C449.118317,727.631042 455.402283,725.585449 463.181793,727.717773 
	C468.550598,729.189331 472.867889,731.840393 475.386353,736.982544 
	C475.748291,737.721497 476.090576,738.627808 476.716309,739.050842 
	C478.724487,740.408203 480.861298,741.575256 482.948517,742.815674 
	C483.661041,740.822693 484.373596,738.829712 485.141846,736.416992 
	C487.100922,736.813110 489.004272,737.628967 490.907623,738.444824 
	C489.686737,740.418823 488.928772,743.132751 487.163788,744.236877 
	C480.018188,748.706909 474.574585,746.819458 470.901642,739.138794 
	C467.745667,732.539185 460.283234,729.063599 454.214600,731.697144 
	C454.681488,732.187683 455.023590,732.613708 455.434021,732.958252 
	C455.797485,733.263489 456.237091,733.477966 457.852631,734.490723 
	C455.316132,735.563904 453.636688,736.543762 451.825867,736.987915 
	C447.255798,738.108948 446.500580,739.578918 447.910217,743.975159 
	C448.646454,746.271301 448.649689,748.802551 448.972015,751.667603 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M961.249878,731.968018 
	C962.559814,728.196106 964.228271,724.393066 966.132263,720.053162 
	C963.841187,720.302734 960.823669,720.631409 957.402161,720.893921 
	C955.977600,716.601196 959.563110,715.971741 962.013428,714.716064 
	C965.885925,712.731628 975.218994,716.454773 976.000488,720.458252 
	C974.867615,720.964722 973.733398,721.096191 972.842773,721.199463 
	C975.087830,724.656250 978.157104,727.808228 979.300415,731.548767 
	C980.668457,736.025024 980.613647,740.996582 980.775513,745.767212 
	C981.038879,753.530212 980.977844,761.304199 980.977051,769.536804 
	C980.004456,767.587280 978.505432,765.220032 978.319153,762.753662 
	C977.594910,753.166809 977.694397,743.500427 976.571045,733.971741 
	C976.244507,731.201721 973.231995,728.253845 970.682190,726.513611 
	C969.811462,725.919312 966.579224,728.756592 964.444214,730.055847 
	C963.475891,730.645142 962.552246,731.307556 961.249878,731.968018 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M515.379395,754.067383 
	C515.200500,775.183594 515.211426,796.406006 513.856262,817.540833 
	C513.198730,827.796753 508.557770,836.767822 496.534637,839.424805 
	C495.423645,836.008911 496.356995,833.766296 500.177643,832.984558 
	C501.466400,832.720886 503.300751,831.559875 503.564606,830.484741 
	C504.558380,826.435669 510.178802,824.221680 508.086914,819.007935 
	C507.950562,818.668091 508.269196,817.775208 508.535095,817.699768 
	C513.024292,816.426208 512.035339,812.521057 512.236633,809.499146 
	C512.727844,802.124268 512.797913,794.721985 513.076050,787.332153 
	C513.293152,781.564453 513.725220,775.799866 513.761658,770.032043 
	C513.785461,766.265808 513.052002,762.492920 513.107178,758.729614 
	C513.129761,757.189880 514.338196,755.667603 515.379395,754.067383 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M953.989746,720.456177 
	C951.351562,720.875305 948.692383,721.076050 946.053528,720.924316 
	C943.501160,720.777588 940.969666,720.267883 937.947876,720.935425 
	C938.659119,721.601868 939.288147,722.396423 940.094971,722.913818 
	C945.334351,726.273499 946.943176,731.597107 947.007812,737.208557 
	C947.218018,755.451294 947.081482,773.698364 946.997437,791.943420 
	C946.990967,793.346375 946.352600,794.746399 945.964355,796.573853 
	C945.333008,794.369873 944.271790,791.745911 944.237427,789.108643 
	C944.067444,776.075989 944.219604,763.039551 944.149780,750.005005 
	C944.122498,744.910461 944.079956,739.786926 943.505188,734.737915 
	C943.256348,732.552307 942.149475,729.358459 940.545898,728.661133 
	C937.111938,727.167908 935.360046,724.981750 935.407715,721.606140 
	C935.462769,717.712830 937.291870,714.763184 941.529236,713.961060 
	C941.984314,713.874939 942.394043,713.549988 942.050049,713.721008 
	C945.130310,714.988953 947.677124,715.867432 950.054321,717.078979 
	C951.497620,717.814575 952.678711,719.064758 953.989746,720.456177 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1372.964111,817.800537 
	C1360.667114,821.009338 1349.663574,818.297668 1340.367676,809.747742 
	C1328.458740,798.794556 1323.320190,784.833435 1323.205688,768.429749 
	C1327.577393,769.680786 1326.268921,773.631897 1326.891846,776.818298 
	C1327.292847,778.869568 1327.765747,780.913025 1328.338745,782.922180 
	C1328.784180,784.484375 1329.449951,785.982727 1329.979004,787.522827 
	C1330.081421,787.821350 1329.863770,788.348389 1330.030640,788.489075 
	C1334.532715,792.284729 1335.485474,798.854980 1340.678833,802.094238 
	C1340.811523,802.176880 1341.107788,802.129395 1341.143066,802.216919 
	C1343.423706,807.882263 1350.341431,808.415222 1353.427124,813.347839 
	C1354.419434,814.934021 1356.768188,816.416565 1358.613525,816.574097 
	C1362.893188,816.939453 1367.243774,816.433228 1371.566895,816.386536 
	C1372.015747,816.381653 1372.472290,817.090271 1372.964111,817.800537 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1411.840088,823.151367 
	C1411.835693,825.801697 1412.719482,827.116455 1415.639648,827.017456 
	C1433.944824,826.396912 1452.253174,825.867310 1470.560059,825.294006 
	C1473.705566,825.195496 1476.849121,825.031433 1480.453613,824.833984 
	C1479.869995,829.652710 1475.759521,828.405212 1472.640015,828.676941 
	C1468.762207,829.014526 1464.836670,828.857483 1460.932617,828.821655 
	C1457.968994,828.794434 1454.991089,828.377747 1452.046997,828.565186 
	C1445.406250,828.988037 1438.791870,829.840027 1432.149536,830.214722 
	C1425.158203,830.609131 1418.146484,830.738831 1411.144775,830.712952 
	C1410.437134,830.710388 1409.032593,828.715942 1409.182373,827.861816 
	C1409.472778,826.207031 1410.639648,824.706055 1411.840088,823.151367 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1304.918335,786.204773 
	C1307.051758,790.225037 1308.935913,794.627869 1311.069214,798.906555 
	C1316.965820,810.732788 1326.355835,818.972168 1338.447510,823.831360 
	C1343.704712,825.944031 1349.560059,826.567688 1355.571777,827.899414 
	C1355.068604,828.618164 1354.206177,829.762878 1353.194946,829.914062 
	C1348.492920,830.617188 1343.749756,831.045166 1338.571045,831.621704 
	C1339.096680,823.635376 1331.290283,825.281677 1327.248657,822.361084 
	C1323.464233,819.626343 1318.678955,818.265747 1314.935059,815.490051 
	C1313.114502,814.140320 1312.793457,810.871460 1311.565918,808.594116 
	C1309.690918,805.115295 1306.955566,801.947876 1305.816895,798.267395 
	C1304.682129,794.599609 1305.065186,790.462219 1304.918335,786.204773 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1340.813477,720.818970 
	C1338.510010,722.436768 1335.996338,723.803223 1333.437622,725.079590 
	C1321.056519,731.255737 1312.885498,741.230957 1308.211060,753.991272 
	C1306.195557,759.493408 1305.348511,765.423645 1303.898438,771.580383 
	C1303.103760,770.869385 1301.677612,769.672119 1301.775391,768.616089 
	C1302.322754,762.712708 1302.883667,756.762024 1304.204468,751.002808 
	C1304.727173,748.724182 1307.485718,747.049316 1308.754150,744.829712 
	C1310.714233,741.399780 1312.340820,737.769897 1313.941772,734.150940 
	C1314.308594,733.321716 1313.995728,732.191895 1313.995728,731.022095 
	C1317.602905,729.030273 1322.845093,728.672302 1322.287231,723.712524 
	C1327.532471,722.555786 1332.383179,721.437195 1337.260376,720.449036 
	C1338.319092,720.234497 1339.472778,720.488098 1340.813477,720.818970 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M730.093384,763.936401 
	C743.972473,779.670288 757.785461,795.792114 771.626892,811.889404 
	C772.914612,813.387024 774.383850,814.728577 775.951660,816.410339 
	C775.622559,817.015320 774.752502,817.731873 774.650391,817.635376 
	C769.750427,813.006775 764.878906,808.346008 760.102722,803.589905 
	C758.914856,802.407166 758.088989,800.867371 757.043701,799.533325 
	C755.695923,797.813171 754.273926,796.151062 752.929382,794.428406 
	C752.535034,793.923279 752.334045,792.827271 751.979126,792.798157 
	C747.578430,792.437622 746.613525,788.407776 744.287781,785.824463 
	C740.245911,781.334839 735.796814,777.166382 732.167725,772.371826 
	C730.616821,770.322876 730.696411,767.039856 730.093384,763.936401 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1483.322510,822.968994 
	C1485.608887,817.069580 1488.333496,811.182739 1491.119141,805.163879 
	C1488.141479,802.826111 1486.096191,802.425842 1483.061157,805.374939 
	C1478.113892,810.182800 1474.367798,816.735596 1466.387573,818.197266 
	C1465.904419,813.294739 1468.010742,809.945251 1472.624390,808.211365 
	C1473.505127,807.880371 1474.474121,807.382629 1475.031128,806.671204 
	C1476.432739,804.881287 1477.275146,801.748474 1478.960571,801.251404 
	C1484.533813,799.607483 1490.312012,799.503906 1495.943604,803.048767 
	C1493.309326,809.389099 1490.687622,815.698975 1487.753174,822.761597 
	C1486.966553,822.804932 1485.363525,822.893250 1483.322510,822.968994 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M520.002197,719.442261 
	C515.131897,719.478027 510.261963,719.125305 505.392029,718.772583 
	C505.274933,719.105896 505.157806,719.439270 505.040710,719.772583 
	C505.651276,720.261475 506.248260,720.768433 506.874512,721.236328 
	C511.889099,724.983337 515.210632,729.607117 515.253601,736.205994 
	C515.285950,741.168091 515.658264,746.127991 515.806580,751.545593 
	C515.158020,751.149353 514.249451,750.363770 514.060791,749.432373 
	C512.925781,743.830383 512.042969,738.176392 510.859314,732.585693 
	C510.615417,731.433777 509.499481,730.441345 508.709167,729.435364 
	C506.965698,727.216003 504.554535,725.273865 503.586029,722.766663 
	C502.721375,720.528320 502.394745,716.813293 503.670105,715.297546 
	C505.901245,712.645813 509.321320,710.899536 513.418213,713.061829 
	C515.345032,714.078735 517.840271,714.018372 520.455627,714.518433 
	C520.312622,715.949768 520.157593,717.501831 520.002197,719.442261 
z"/>
<path fill="#4A4645" opacity="1.000000" stroke="none" 
	d="
M989.701904,894.834229 
	C989.700500,881.059692 989.700500,867.767395 989.700500,854.103455 
	C991.389587,854.018555 992.777771,853.948792 994.476868,853.863403 
	C994.476868,868.629761 994.476868,883.031982 994.476868,897.800232 
	C992.329590,897.794800 989.652100,899.559265 989.701904,894.834229 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1382.064453,826.104736 
	C1385.389648,824.548584 1388.821167,823.174011 1392.348022,822.118591 
	C1401.249268,819.454712 1402.658447,811.269348 1406.105103,804.327942 
	C1403.097046,801.641052 1400.851562,802.664734 1398.656372,804.953674 
	C1396.712402,806.980469 1394.681274,808.923645 1392.361938,810.999146 
	C1392.759277,808.060425 1393.338135,804.979004 1394.299316,802.021973 
	C1394.573120,801.179810 1395.877686,800.479248 1396.858643,800.117676 
	C1397.743530,799.791504 1398.831909,800.009338 1399.830811,800.001160 
	C1410.484497,799.914307 1410.577271,800.074585 1406.254395,809.532104 
	C1405.722046,810.696472 1404.948486,812.271118 1405.335205,813.235107 
	C1406.392822,815.871826 1405.581543,817.329407 1403.266724,818.469116 
	C1402.698486,818.748962 1401.941650,819.301575 1401.862183,819.819580 
	C1400.756836,827.017517 1395.291138,825.939880 1390.371704,826.019226 
	C1387.651001,826.063171 1384.933350,826.288208 1382.064453,826.104736 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M497.060791,844.446411 
	C509.191711,843.718506 518.389587,837.300781 526.751831,829.256897 
	C527.134644,828.888672 527.013550,827.996643 527.387939,827.121094 
	C528.271973,827.910767 529.493530,828.970886 529.424011,829.938171 
	C528.856323,837.831665 522.114990,839.319092 516.547058,842.006165 
	C515.430603,842.545044 514.143860,842.956421 513.304565,843.795654 
	C511.719421,845.380676 510.639252,848.377319 508.923523,848.732849 
	C505.542145,849.433533 501.576141,849.968323 498.827454,846.497986 
	C498.330841,845.870972 497.693970,845.355042 497.060791,844.446411 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M793.480591,784.899658 
	C793.092041,769.044189 792.857361,753.083069 793.221741,737.135620 
	C793.347229,731.641235 794.086304,725.831604 799.466431,721.954224 
	C800.403320,722.521851 801.546570,723.218018 801.459900,723.686707 
	C801.193604,725.125793 800.832947,726.895569 799.838074,727.792908 
	C794.944641,732.206787 796.445190,738.155090 796.128296,743.450134 
	C795.395508,755.696472 795.368835,767.984070 794.955627,780.251587 
	C794.904236,781.778015 794.246277,783.283936 793.480591,784.899658 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M837.985107,819.159180 
	C829.169800,821.045898 819.032532,815.258484 814.702148,806.384827 
	C813.301025,803.513794 812.961487,799.085205 807.455322,800.124023 
	C806.195312,798.826904 805.330872,797.493958 803.819336,795.163208 
	C808.078247,795.163208 811.734863,795.163208 815.465393,795.163208 
	C816.031616,798.695129 816.010742,801.990479 817.183594,804.784729 
	C818.102966,806.975098 820.500000,808.545288 822.719727,810.030396 
	C825.330322,816.994263 832.963074,815.707458 837.985107,819.159180 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1421.024170,757.962036 
	C1421.420166,775.214722 1421.472412,792.533691 1421.359985,809.851562 
	C1421.348877,811.565308 1420.330322,813.272461 1419.505859,815.288696 
	C1419.216675,809.589600 1419.107422,803.582642 1419.222778,797.580017 
	C1419.285889,794.297546 1419.880737,791.026367 1419.964966,787.743103 
	C1420.097046,782.591736 1420.031006,777.434143 1419.978149,772.279907 
	C1419.964722,770.975098 1420.178711,769.143616 1419.444214,768.456726 
	C1415.000977,764.301636 1418.857544,761.324463 1421.024170,757.962036 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M809.581299,755.079102 
	C814.690613,765.424072 823.992493,771.160706 833.068604,777.611206 
	C826.638794,778.987122 825.479675,778.715210 818.305603,774.291565 
	C819.953003,770.689697 818.125854,768.938477 814.659241,768.079590 
	C809.472046,766.794556 806.784119,760.337402 809.581299,755.079102 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M880.410034,752.999634 
	C880.717163,763.689575 880.643860,774.381775 880.450684,785.531250 
	C875.644531,784.093201 874.180847,780.286499 875.580872,775.866028 
	C876.330750,773.498596 875.613403,770.695740 875.755859,768.100159 
	C876.002563,763.605347 876.271057,759.101013 876.878967,754.648193 
	C876.971741,753.968750 878.932739,753.544312 880.410034,752.999634 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1379.814209,717.903259 
	C1378.500000,721.585388 1375.853638,718.947510 1373.704834,719.039062 
	C1364.104126,719.448059 1354.496826,719.699402 1344.465332,720.056763 
	C1343.777344,715.898499 1345.996216,714.879333 1349.854126,714.926392 
	C1356.927002,715.012878 1364.060425,715.097046 1371.060059,714.266052 
	C1374.991577,713.799316 1377.329834,715.006409 1379.814209,717.903259 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1473.994141,719.625671 
	C1462.967773,720.335938 1451.935425,720.659607 1440.450928,720.910706 
	C1440.972046,718.015076 1442.159424,716.189148 1445.950806,716.575745 
	C1451.592896,717.151123 1457.332764,716.840881 1463.028564,716.752075 
	C1464.068237,716.735840 1465.069092,715.881348 1466.134521,715.578430 
	C1469.778564,714.542480 1473.100830,714.311951 1473.994141,719.625671 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M805.466309,816.059937 
	C806.603882,820.615784 808.710266,823.397278 813.916626,824.065063 
	C819.076965,824.726929 824.024841,827.375244 829.167725,827.748230 
	C834.101685,828.106079 839.166260,826.662354 844.587097,826.047913 
	C844.639832,830.626709 840.728821,829.198303 838.253296,829.918640 
	C835.208130,830.804626 832.012939,831.195251 828.866211,831.697388 
	C828.115967,831.817078 827.264099,831.645508 826.520996,831.411316 
	C819.797119,829.292419 813.066650,827.189575 806.391235,824.925598 
	C805.175232,824.513245 803.237305,823.315369 803.292603,822.610168 
	C803.464661,820.413513 804.433716,818.279358 805.466309,816.059937 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M665.601624,816.038452 
	C665.211304,817.631592 664.680542,819.406616 663.680664,820.858765 
	C662.450134,822.645874 660.828491,824.163818 659.050720,826.164124 
	C666.859924,826.164124 673.714233,826.164124 680.804138,826.528442 
	C676.136780,830.888794 670.061890,830.136169 664.386597,830.976257 
	C662.152527,831.306885 659.893066,831.466187 657.675110,831.700317 
	C656.339478,824.416687 658.685608,819.199097 665.601624,816.038452 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M944.772400,801.048218 
	C944.077148,812.406067 939.612183,819.270691 924.995300,820.016113 
	C921.514587,820.193604 918.013245,819.966248 914.175842,819.680542 
	C915.142151,818.957581 916.528076,817.929199 917.753235,818.094360 
	C923.577881,818.879333 928.828552,816.990356 933.896118,814.706055 
	C935.318726,814.064819 935.893005,811.686523 937.034058,810.245728 
	C939.471619,807.167786 938.706299,801.522034 944.772400,801.048218 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M718.475403,784.912720 
	C718.105530,773.461853 718.105530,761.923706 718.105530,749.827148 
	C721.257874,753.574890 724.044495,756.887939 726.942871,760.517761 
	C725.500793,761.623718 723.947021,762.412842 721.897888,763.453552 
	C720.982056,769.865601 719.913635,777.345520 718.475403,784.912720 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M531.121277,817.898254 
	C531.486694,807.241089 532.240479,796.582886 533.071228,785.462036 
	C534.421326,788.322876 536.619263,791.605286 536.769104,794.978638 
	C537.053101,801.368164 536.391541,807.839233 535.577881,814.206787 
	C535.401428,815.587646 532.926147,816.674805 531.121277,817.898254 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M960.219727,787.938599 
	C959.897888,772.642395 959.963745,757.284241 960.103638,741.462463 
	C961.066467,743.342346 962.650879,745.664307 962.724548,748.033264 
	C963.052307,758.576355 963.111511,769.136353 962.888489,779.682190 
	C962.830444,782.428589 961.404846,785.145996 960.219727,787.938599 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1378.004639,728.457886 
	C1384.271606,728.818237 1388.221680,732.909180 1392.166260,737.337463 
	C1393.963257,739.354492 1396.813721,740.433228 1399.567383,741.897583 
	C1396.802368,748.104004 1392.475708,744.663391 1388.160278,743.286011 
	C1389.620605,739.044678 1385.797119,738.054443 1383.757568,735.855164 
	C1381.702515,733.639343 1379.914795,731.175537 1378.004639,728.457886 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M479.064575,720.096069 
	C474.219788,722.816101 469.376831,720.912109 464.440826,720.515991 
	C459.284546,720.102234 454.041687,720.766785 448.417542,720.907104 
	C447.808350,717.664795 449.665955,717.064697 452.410767,716.923462 
	C454.805573,716.800232 457.165985,716.008484 459.541626,715.512085 
	C459.587982,714.993652 459.634338,714.475220 459.680695,713.956848 
	C462.172333,715.333740 464.589752,716.884338 467.194183,717.997253 
	C468.159851,718.409973 469.596130,717.920227 470.762878,717.624939 
	C473.907593,716.829041 476.993103,716.035767 479.064575,720.096069 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M834.996826,779.398560 
	C840.159790,784.052368 845.541626,788.846313 850.345154,794.162781 
	C851.786072,795.757446 851.614136,798.809265 852.082153,801.596802 
	C850.664246,800.671509 849.146179,799.479370 848.105347,797.960266 
	C847.534424,797.127014 847.831238,794.760986 847.630615,794.748108 
	C841.101746,794.330994 842.361938,786.169983 837.180969,784.278503 
	C836.050293,783.865662 835.702454,781.308594 834.996826,779.398560 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1410.081543,722.197998 
	C1417.300171,724.656128 1420.840210,729.610413 1421.034912,737.184692 
	C1421.162598,742.147949 1421.276489,747.111572 1421.309326,752.537354 
	C1417.170044,750.397217 1418.024780,745.880249 1418.539795,742.629028 
	C1419.448364,736.894043 1418.466797,732.838745 1413.778076,729.225769 
	C1411.936401,727.806641 1411.286987,724.840454 1410.081543,722.197998 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M536.230957,728.107239 
	C536.817932,725.113281 537.871704,722.504089 538.942810,719.500854 
	C539.473877,717.434692 539.987610,715.762451 540.677612,713.516357 
	C548.571655,717.421509 541.761841,724.030457 545.949768,729.126038 
	C541.825928,728.843445 539.261841,728.667725 536.230957,728.107239 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1345.924316,730.608948 
	C1354.864746,725.690613 1364.386230,725.104004 1374.593018,727.006836 
	C1374.032837,727.707642 1372.924438,728.931030 1372.119751,728.756287 
	C1364.671021,727.138184 1358.029175,728.345032 1351.957520,733.202087 
	C1349.351807,735.286377 1347.432861,733.331055 1345.924316,730.608948 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1438.850342,748.991333 
	C1438.496460,742.220459 1438.496460,735.427917 1438.496460,727.817261 
	C1442.428833,727.479492 1445.774170,727.192139 1449.559937,726.983032 
	C1448.620850,727.948059 1447.114624,729.728821 1445.885864,729.554565 
	C1442.161499,729.026306 1442.295288,731.055420 1442.292358,733.576843 
	C1442.287720,737.505798 1442.285278,741.459656 1441.826050,745.349121 
	C1441.673584,746.641113 1440.118286,747.767456 1438.850342,748.991333 
z"/>
<path fill="#BFE0F5" opacity="1.000000" stroke="none" 
	d="
M400.205719,784.662476 
	C399.867889,784.221191 399.828400,783.494507 399.740753,782.408569 
	C399.785736,754.384766 399.878906,726.720276 399.950226,698.601929 
	C400.267822,699.356628 400.901367,700.564758 400.903473,701.773865 
	C400.950134,728.501282 400.930603,755.228699 400.899841,781.956177 
	C400.898895,782.763306 400.641785,783.570129 400.205719,784.662476 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M268.318726,957.978882 
	C279.028351,951.991333 290.143585,946.015869 301.608002,939.984375 
	C297.807861,943.184814 293.799194,946.644897 289.466919,949.636292 
	C285.625885,952.288391 281.119812,954.032166 277.478424,956.901672 
	C274.482056,959.262756 271.712555,958.317017 268.318726,957.978882 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M888.789673,820.091980 
	C894.830017,823.548767 900.633484,826.912537 907.840088,827.540649 
	C904.304016,831.241516 899.334412,830.703979 895.603943,827.623962 
	C892.737488,825.257202 888.975464,823.975159 885.161072,821.974365 
	C886.382812,821.328613 887.422852,820.778870 888.789673,820.091980 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M819.989502,723.787842 
	C813.991394,728.724915 810.835388,735.090637 808.889404,742.630127 
	C808.207764,741.518066 806.959473,739.916626 807.194580,738.575195 
	C807.810303,735.061462 808.932739,731.611450 810.124146,728.231567 
	C811.055969,725.588135 817.404968,722.674561 819.989502,723.787842 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M938.001099,826.564758 
	C942.549622,823.384644 947.100952,820.595154 951.913696,817.639160 
	C953.509033,821.236877 954.081909,824.383606 948.633972,825.470947 
	C946.616394,825.873657 945.103088,828.362671 943.084045,829.316406 
	C940.837036,830.377930 938.069885,831.204895 938.001099,826.564758 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M470.875732,769.118225 
	C464.280151,764.571228 457.724701,759.615784 451.021729,754.354004 
	C456.687042,754.926941 461.963989,756.671692 465.446564,761.972290 
	C467.026886,764.377625 469.078217,766.473511 470.875732,769.118225 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M777.884521,820.131165 
	C779.798279,821.683167 781.434387,823.428101 783.043396,825.197693 
	C785.262634,827.638550 787.467468,830.081055 791.597290,828.001343 
	C791.749756,828.882935 791.657227,830.725037 791.342651,830.763733 
	C787.122620,831.283203 782.871643,831.551025 779.083862,831.845886 
	C778.634521,828.372192 778.114685,824.353638 777.884521,820.131165 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1324.965454,758.945190 
	C1325.947632,750.259094 1329.907837,742.899231 1336.512207,736.586365 
	C1337.862061,741.223328 1335.797363,744.345459 1331.973267,747.238098 
	C1330.044922,748.696716 1329.390625,751.820435 1328.113403,754.165710 
	C1327.238037,755.773071 1326.282104,757.336426 1324.965454,758.945190 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M849.959717,720.560669 
	C844.307983,720.606445 838.615417,720.307373 832.461182,719.958984 
	C832.789062,716.805237 834.339722,715.339294 837.754700,716.747620 
	C839.367981,717.412842 840.590515,717.469971 842.676697,715.935181 
	C846.341675,713.238708 848.018005,717.738220 849.959717,720.560669 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1026.991821,722.465942 
	C1022.258545,722.020325 1017.514709,721.211792 1012.385925,720.269226 
	C1014.683350,714.372009 1019.064331,713.518127 1023.158203,717.960022 
	C1024.431763,719.341919 1025.706909,720.722107 1026.991821,722.465942 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M873.021301,722.356567 
	C878.115540,724.880554 880.089844,729.515076 880.081421,735.588135 
	C878.570007,735.922974 877.129944,735.845886 875.260925,735.745911 
	C874.492371,731.320435 873.752197,727.058228 873.021301,722.356567 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1389.948364,812.012573 
	C1386.064209,814.010254 1381.990723,815.684265 1377.522461,817.365906 
	C1377.531006,815.286560 1377.760864,811.457275 1378.366333,811.397034 
	C1382.116943,811.023315 1385.952026,811.496765 1389.948364,812.012573 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M485.485901,733.948975 
	C484.709198,730.071899 484.294037,726.143127 483.842712,721.786011 
	C486.188599,718.578796 488.117310,720.780823 488.479431,722.565430 
	C489.287628,726.548523 490.410583,731.001892 485.485901,733.948975 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1424.986084,720.448486 
	C1420.342285,720.563965 1415.682739,720.297852 1410.577026,720.045837 
	C1407.610229,717.344421 1410.501221,715.148560 1411.799561,715.440125 
	C1416.308838,716.452637 1420.597778,718.446350 1424.986084,720.448486 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M952.757324,817.331421 
	C954.586060,811.317749 956.732544,805.530029 959.011108,799.371094 
	C959.988708,801.185669 961.056580,803.316528 961.614929,805.573425 
	C962.133606,807.670349 955.372620,816.824707 952.757324,817.331421 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M533.956543,718.513245 
	C530.610168,719.229553 527.219238,719.601807 523.413208,719.902100 
	C523.214722,717.377014 521.941345,713.917664 525.648010,713.389343 
	C529.264221,712.873962 532.279358,714.629822 533.956543,718.513245 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M866.293701,809.970093 
	C866.587219,806.892578 867.287415,803.826538 868.089722,800.379211 
	C870.018372,801.496033 873.537476,803.277405 873.343384,804.437500 
	C872.831177,807.498840 871.051453,810.726807 866.293701,809.970093 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1359.065674,828.371094 
	C1364.655518,827.545105 1370.310913,827.088623 1376.411133,826.604004 
	C1376.813599,827.070740 1376.965088,827.742249 1376.699463,828.033447 
	C1373.874268,831.132324 1362.603394,831.550537 1359.065674,828.371094 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1480.066162,735.952759 
	C1479.426880,731.880737 1479.207886,727.777893 1479.059448,723.298584 
	C1482.112793,722.630310 1483.545654,724.065979 1482.943359,726.927612 
	C1482.304932,729.960693 1485.127563,733.991394 1480.066162,735.952759 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M857.042236,820.501648 
	C859.086975,817.766846 861.174133,815.371704 863.562012,812.801514 
	C863.452698,815.591003 863.714050,818.890076 862.448975,821.428528 
	C861.114319,824.106506 858.429871,825.187866 857.042236,820.501648 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M462.047974,827.522095 
	C464.042511,826.374878 466.085052,825.575989 468.494354,824.690857 
	C469.244965,826.634094 469.628815,828.663513 470.155579,831.448364 
	C466.779297,833.237915 464.100739,831.622559 462.047974,827.522095 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M355.123322,892.911133 
	C357.973572,888.484558 361.192413,884.061890 364.713379,879.536987 
	C365.145813,886.263000 359.768463,889.200195 355.123322,892.911133 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1464.074219,729.266357 
	C1468.838867,728.469482 1470.443237,732.539978 1473.199463,735.559692 
	C1469.071533,735.623535 1464.503540,735.763367 1464.074219,729.266357 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M351.927460,687.465088 
	C347.142151,686.379822 342.283844,684.953735 337.149353,683.287537 
	C341.866913,684.406372 346.860718,685.765320 351.927460,687.465088 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M805.118164,802.134888 
	C805.644653,805.512268 805.740295,808.851074 805.801819,812.595825 
	C801.224426,809.154663 800.707642,803.938599 805.118164,802.134888 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M384.103394,847.105164 
	C385.172943,852.329285 382.082825,855.672363 378.380615,858.957886 
	C377.997162,859.003723 377.909943,858.925781 377.962585,858.571716 
	C379.998718,854.470215 381.982269,850.722839 384.000732,847.007263 
	C384.035675,847.039124 384.103394,847.105164 384.103394,847.105164 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M484.019775,781.990723 
	C482.077576,780.335938 480.476898,778.543762 478.727905,776.448242 
	C481.580994,776.878906 484.582458,777.612976 488.869293,778.661377 
	C486.727905,780.177612 485.544617,781.015503 484.019775,781.990723 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1401.519531,732.944458 
	C1400.788574,729.975525 1400.420044,726.949890 1399.995605,723.529358 
	C1403.734375,721.731506 1402.240479,725.550720 1403.124756,726.746033 
	C1404.556274,728.681274 1405.015137,731.398621 1401.519531,732.944458 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1418.576416,816.000244 
	C1416.921875,818.363342 1414.879883,820.726868 1412.502686,823.161255 
	C1412.738647,819.625977 1413.127197,815.867676 1418.576416,816.000244 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M164.949738,902.578735 
	C166.950119,904.231079 168.976395,906.274597 171.037018,908.658081 
	C166.675385,909.379272 164.660583,907.352600 164.949738,902.578735 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M139.060165,869.272705 
	C140.515488,870.810120 141.948334,872.729797 143.676300,875.119385 
	C144.228836,875.794006 144.486252,875.998718 144.743683,876.203430 
	C144.743668,876.203430 144.874390,876.206360 144.854523,876.456726 
	C144.834656,876.707092 145.150375,877.028870 145.150360,877.028870 
	C145.554626,877.624817 145.958878,878.220764 146.576538,878.986023 
	C146.789948,879.155334 146.699478,879.582581 146.652206,879.796082 
	C144.082520,876.558044 141.560104,873.106506 139.060165,869.272705 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M219.064850,946.322876 
	C221.878983,947.452942 224.740189,948.938049 227.815399,950.681213 
	C226.769760,951.579224 225.510117,952.219055 224.470566,952.747131 
	C222.532043,950.551514 220.821976,948.614624 219.064850,946.322876 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M882.025635,809.078979 
	C883.665588,811.282288 884.972351,813.712952 886.317505,816.507568 
	C881.109436,816.271606 880.365845,815.065430 882.025635,809.078979 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M112.517586,792.798279 
	C112.448563,793.003967 112.379547,793.209656 112.188995,793.717285 
	C111.534439,789.851135 111.001411,785.682922 110.772125,781.235718 
	C111.075851,780.956604 111.392166,781.033203 111.550568,781.069092 
	C111.684242,781.840210 111.659515,782.575500 111.708954,784.100220 
	C112.027931,787.525879 112.272758,790.162048 112.517586,792.798279 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M211.011139,941.352539 
	C213.553345,942.467041 216.095978,943.952332 218.832794,945.709351 
	C215.075546,946.970703 211.763458,946.756836 211.011139,941.352539 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M492.836731,842.949463 
	C493.665009,843.180481 494.110107,843.437744 494.777588,843.834290 
	C495.212219,845.085632 495.424500,846.197632 495.982819,849.122498 
	C493.333221,847.368835 491.821136,846.368042 490.309082,845.367310 
	C491.023895,844.570129 491.738708,843.772949 492.836731,842.949463 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M480.901672,816.386597 
	C481.764038,814.518555 482.979614,812.879211 484.473145,811.080505 
	C485.449402,811.808228 486.147705,812.695435 486.846008,813.582581 
	C484.982300,814.593567 483.118591,815.604492 480.901672,816.386597 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1303.464111,777.093384 
	C1304.209351,779.387512 1304.593262,781.775879 1304.906372,784.582886 
	C1300.424683,783.246826 1301.519653,780.271362 1303.464111,777.093384 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M118.076202,823.132080 
	C118.552841,823.700745 118.996490,824.725891 119.682152,825.990967 
	C119.924171,826.230835 119.890892,826.618713 119.976967,827.156006 
	C120.821579,829.783875 121.580124,831.874451 122.338654,833.964966 
	C122.338646,833.964966 122.283096,834.431641 122.241013,834.662292 
	C118.018715,832.152344 117.881851,827.925354 118.076202,823.132080 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M398.338135,801.916504 
	C398.410706,797.385864 398.884552,792.769897 399.628479,787.801758 
	C399.512115,792.243408 399.125763,797.037231 398.338135,801.916504 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M861.995483,720.476624 
	C860.232666,720.880737 858.463013,720.931763 856.346375,720.935913 
	C857.118896,719.226135 858.238464,717.563171 860.074158,714.836609 
	C861.041931,717.509033 861.515320,718.816284 861.995483,720.476624 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M122.074524,835.298645 
	C123.375610,837.676514 124.640747,840.489685 125.908607,843.668213 
	C120.933792,842.987244 122.143188,839.054016 122.074524,835.298645 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M387.015045,838.082397 
	C387.015045,838.082397 387.444550,837.866882 387.663330,837.767212 
	C388.058777,841.148682 388.818756,844.824829 384.448914,847.003174 
	C384.103394,847.105164 384.035675,847.039124 384.006134,846.695312 
	C384.005768,845.938354 384.034943,845.525269 384.313965,844.880859 
	C384.777985,843.779419 384.992157,842.909119 385.146912,842.043884 
	C385.087494,842.048889 385.127747,842.161072 385.400391,842.003784 
	C385.861664,841.251709 386.050293,840.656799 386.466675,839.891418 
	C386.801300,839.174744 386.908173,838.628540 387.015045,838.082397 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M315.203430,930.942200 
	C316.652252,929.354858 318.507324,927.794678 320.681702,926.148315 
	C321.019867,929.692993 319.070587,931.161621 315.203430,930.942200 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M125.964462,844.513794 
	C127.306396,846.822754 128.663956,849.528076 130.044128,852.598999 
	C128.704514,850.279785 127.342308,847.595032 125.964462,844.513794 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M533.575989,734.981384 
	C533.573242,732.762756 533.976868,730.523682 534.717041,728.188232 
	C535.998230,730.584595 537.533203,733.169312 533.575989,734.981384 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M880.115356,789.889893 
	C880.644592,790.408386 880.784241,790.935486 880.853882,791.732666 
	C878.978882,791.629089 877.173828,791.255493 875.368774,790.881836 
	C875.431580,790.377075 875.494446,789.872314 875.557251,789.367554 
	C876.946716,789.544556 878.336243,789.721558 880.115356,789.889893 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M302.318542,939.974731 
	C303.366272,938.950562 304.793701,937.946716 306.554626,936.909912 
	C306.827301,938.079651 306.766541,939.282288 306.696899,940.659851 
	C305.120239,940.397766 303.909241,940.196411 302.318542,939.974731 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M132.066498,857.154785 
	C133.403397,858.910950 134.713089,861.071594 136.076263,863.576599 
	C134.766266,861.800354 133.402771,859.679810 132.066498,857.154785 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M844.963867,816.036133 
	C843.654053,817.217224 842.162842,818.096252 840.335449,818.931030 
	C840.751892,816.558838 841.517944,814.251221 844.963867,816.036133 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M794.219788,825.913208 
	C793.575195,824.544800 793.286743,823.138184 793.073242,821.365173 
	C796.088257,821.902710 797.325562,823.305176 794.219788,825.913208 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M930.976562,828.280762 
	C931.441895,827.604309 931.917358,827.317200 932.697144,827.093506 
	C933.184204,828.580811 933.366821,830.004761 933.549500,831.428650 
	C933.186768,831.617188 932.824036,831.805725 932.461304,831.994263 
	C931.969788,830.886230 931.478210,829.778137 930.976562,828.280762 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M475.807129,773.062866 
	C474.331909,772.395264 473.194153,771.522217 471.926758,770.363403 
	C473.393524,770.773987 477.204956,768.005981 475.807129,773.062866 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M851.554749,805.049683 
	C851.570862,806.537537 851.223328,808.075623 850.689453,809.899841 
	C848.026306,808.124573 848.601013,806.475952 851.554749,805.049683 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M793.409729,815.921753 
	C792.953186,814.282654 792.861694,812.565369 792.847168,810.423767 
	C796.106873,811.525513 795.643188,813.582275 793.409729,815.921753 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M959.664062,794.943115 
	C959.315674,793.834900 959.303650,792.665222 959.492981,791.207031 
	C963.092285,791.984985 962.461182,793.362610 959.664062,794.943115 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1339.066895,735.018738 
	C1339.467896,734.219116 1340.217163,733.565369 1341.260620,732.836304 
	C1341.851440,733.643494 1342.147949,734.526062 1342.444458,735.408691 
	C1341.434692,735.327332 1340.424927,735.245972 1339.066895,735.018738 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M476.889557,820.365479 
	C477.601379,819.059143 478.649750,817.972351 479.928009,816.720886 
	C481.339417,819.470093 479.812744,820.413208 476.889557,820.365479 
z"/>
<path fill="#93CEF0" opacity="1.000000" stroke="none" 
	d="
M1114.976685,872.895142 
	C1113.913574,873.317627 1112.817383,873.463501 1111.352051,873.397461 
	C1111.971191,870.678162 1113.264282,870.299133 1114.976685,872.895142 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M375.538513,863.968262 
	C375.174225,863.868652 375.134705,863.681763 375.066254,862.903992 
	C375.994843,861.183960 376.952362,860.054871 377.909912,858.925781 
	C377.909943,858.925781 377.997162,859.003723 378.040985,859.043640 
	C377.344269,860.682739 376.603760,862.281860 375.538513,863.968262 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M136.057953,864.280029 
	C137.069031,865.341248 138.053635,866.796570 139.081024,868.586914 
	C138.093033,867.505920 137.062241,866.089966 136.057953,864.280029 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M160.998993,898.401978 
	C162.204086,899.180359 163.416992,900.327271 164.725494,901.773438 
	C163.549667,900.971863 162.278229,899.871216 160.998993,898.401978 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M396.336731,811.941650 
	C396.105957,810.817810 396.224640,809.635071 396.585938,808.189941 
	C396.781097,809.245972 396.733643,810.564270 396.336731,811.941650 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M531.401611,822.998962 
	C532.066528,822.335144 532.780151,821.993958 533.493835,821.652832 
	C533.577332,822.091614 533.660828,822.530334 533.744324,822.969116 
	C532.979675,823.086609 532.215027,823.204102 531.401611,822.998962 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M980.561523,792.065796 
	C980.921753,793.069580 980.948792,794.139221 980.903320,795.604980 
	C980.629944,794.711182 980.429138,793.421448 980.561523,792.065796 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M205.037689,937.289795 
	C205.910187,937.455200 206.806564,937.948120 207.852753,938.718262 
	C207.022247,938.536072 206.041916,938.076660 205.037689,937.289795 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M151.997528,887.633545 
	C152.911179,888.322449 153.827957,889.376953 154.847107,890.725952 
	C153.966537,890.013367 152.983597,889.006287 151.997528,887.633545 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M808.398193,749.004395 
	C808.792542,749.440918 808.863525,749.885803 808.878784,750.666382 
	C808.030640,750.714844 807.238342,750.427612 806.445984,750.140442 
	C806.988953,749.764587 807.531860,749.388672 808.398193,749.004395 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M116.744659,819.197632 
	C117.331741,819.781799 117.665604,820.563110 117.974747,821.672302 
	C117.463829,821.131714 116.977631,820.263184 116.744659,819.197632 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1002.942749,720.516357 
	C1002.248352,720.884460 1001.495544,720.936462 1000.370972,720.916199 
	C1000.960876,720.629395 1001.922668,720.414856 1002.942749,720.516357 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1394.940308,721.512695 
	C1394.245605,721.944763 1393.490234,722.057007 1392.367310,722.056213 
	C1392.959717,721.693054 1393.919678,721.442932 1394.940308,721.512695 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M880.524902,801.060059 
	C880.950439,801.751465 881.053162,802.503357 881.074219,803.627563 
	C880.729004,803.040161 880.465576,802.080322 880.524902,801.060059 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M309.337524,934.983948 
	C309.767914,934.335815 310.558868,933.688171 311.661011,932.980469 
	C311.214203,933.608337 310.456177,934.296387 309.337524,934.983948 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M473.650574,822.674011 
	C474.002502,821.944336 474.797333,821.357971 475.846008,820.619690 
	C475.431030,821.250916 474.762238,822.034058 473.650574,822.674011 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M156.966187,893.532593 
	C157.576477,893.935608 158.212891,894.670959 158.901047,895.709534 
	C158.299301,895.296814 157.645813,894.580872 156.966187,893.532593 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M307.219208,936.893799 
	C307.377289,936.291138 307.870270,935.684937 308.673828,935.026489 
	C308.507660,935.612915 308.030884,936.251587 307.219208,936.893799 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1494.954590,815.604858 
	C1494.713135,815.209045 1494.714844,814.815247 1494.745117,814.423706 
	C1494.745972,814.412720 1495.051270,814.425293 1495.214600,814.426880 
	C1495.210327,814.820374 1495.206055,815.213806 1494.954590,815.604858 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M718.416931,791.956543 
	C718.076965,791.554138 718.021362,791.107910 718.041382,790.330750 
	C718.609253,790.316162 719.101501,790.632507 719.593750,790.948730 
	C719.296265,791.270081 718.998840,791.591370 718.416931,791.956543 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M458.046326,827.445557 
	C458.443573,827.091797 458.887787,827.022339 459.665985,827.011108 
	C459.695251,827.575562 459.390472,828.081787 459.085754,828.588013 
	C458.754913,828.301941 458.424072,828.015930 458.046326,827.445557 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M533.427673,748.956909 
	C533.099243,748.553894 533.052673,748.107239 533.081543,747.329895 
	C533.638672,747.319946 534.120361,747.640686 534.602051,747.961365 
	C534.304504,748.278625 534.007019,748.595886 533.427673,748.956909 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M922.041992,828.366821 
	C922.446228,828.012207 922.892395,827.948914 923.669189,827.966797 
	C923.685852,828.557129 923.371765,829.066162 923.057739,829.575195 
	C922.733093,829.269531 922.408508,828.963806 922.041992,828.366821 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M865.570862,739.952271 
	C865.257568,739.555603 865.208923,739.108459 865.229248,738.329224 
	C865.477356,738.632080 865.656433,739.266968 865.570862,739.952271 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M397.416748,805.708191 
	C397.242767,805.277344 397.303070,804.594971 397.612061,803.663696 
	C397.790894,804.095398 397.720978,804.776001 397.416748,805.708191 
z"/>
<path fill="#A5D5F3" opacity="1.000000" stroke="none" 
	d="
M1217.933594,750.441162 
	C1218.069824,750.263184 1218.484131,750.294556 1218.892700,750.572266 
	C1218.661865,750.762573 1218.436768,750.706543 1217.933594,750.441162 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M203.164642,935.411987 
	C203.361679,935.252502 203.594879,935.378418 203.832123,935.819214 
	C203.653549,935.920166 203.441772,935.774658 203.164642,935.411987 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M110.137772,743.022827 
	C110.372536,742.989868 110.666733,743.207703 110.937675,743.706421 
	C110.675346,743.749329 110.436279,743.511414 110.137772,743.022827 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M210.119934,940.363892 
	C210.319321,940.193848 210.590042,940.326721 210.909042,940.787476 
	C210.717987,940.918762 210.462646,940.769287 210.119934,940.363892 
z"/>
<path fill="#93CEF0" opacity="1.000000" stroke="none" 
	d="
M341.220306,907.884644 
	C341.049500,907.659912 341.190155,907.414734 341.586243,907.094116 
	C341.870758,907.332397 341.767487,907.614319 341.220306,907.884644 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1109.890869,893.616211 
	C1109.697876,893.690796 1109.413940,893.601929 1109.165771,893.264526 
	C1109.442993,893.104248 1109.642334,893.249756 1109.890869,893.616211 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M789.888550,893.619202 
	C789.690979,893.696716 789.399719,893.608154 789.144897,893.267029 
	C789.428528,893.101135 789.633057,893.247375 789.888550,893.619202 
z"/>
<path fill="#BFE0F5" opacity="1.000000" stroke="none" 
	d="
M780.500916,796.930725 
	C780.442932,797.090393 780.325562,797.188049 780.247864,797.115234 
	C780.287476,796.944702 780.441528,796.868652 780.500916,796.930725 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M116.135887,815.871216 
	C116.334297,815.881653 116.552246,816.150879 116.758453,816.685669 
	C116.549622,816.677551 116.352531,816.403809 116.135887,815.871216 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M130.089142,853.133423 
	C130.366623,852.983154 130.594864,853.168518 130.718750,853.713989 
	C130.460968,853.806274 130.269470,853.604614 130.089142,853.133423 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M789.369751,858.900879 
	C789.028137,858.610046 789.124023,858.332642 789.736328,858.204712 
	C789.882141,858.488586 789.733643,858.675232 789.369751,858.900879 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1109.387817,858.899292 
	C1109.054443,858.619507 1109.146484,858.349915 1109.741699,858.221191 
	C1109.883789,858.493713 1109.739990,858.676147 1109.387817,858.899292 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M374.595886,864.794434 
	C374.416382,864.637878 374.489471,864.456543 374.868835,864.310791 
	C374.929718,864.437012 374.820831,864.578125 374.595886,864.794434 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M373.473572,866.816772 
	C373.251129,866.615051 373.350739,866.376404 373.814606,866.140137 
	C373.934998,866.316345 373.807251,866.528809 373.473572,866.816772 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M372.326721,868.889160 
	C372.260834,868.728394 372.390015,868.431152 372.747437,868.030823 
	C372.914001,868.252075 372.762695,868.527039 372.326721,868.889160 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M371.542511,869.802979 
	C371.372833,869.634460 371.466156,869.428223 371.864929,869.226685 
	C371.942627,869.367920 371.821014,869.545898 371.542511,869.802979 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M370.367920,871.884521 
	C370.153229,871.671387 370.275146,871.384033 370.767242,871.052002 
	C370.920624,871.253601 370.776306,871.521179 370.367920,871.884521 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M155.096436,891.256836 
	C155.331177,891.098328 155.595734,891.264160 155.851227,891.782227 
	C155.626770,891.896973 155.388123,891.712524 155.096436,891.256836 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M369.554932,872.802795 
	C369.383514,872.635193 369.471558,872.444275 369.866699,872.282776 
	C369.930908,872.416992 369.811096,872.572754 369.554932,872.802795 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M368.368378,874.883301 
	C368.187073,874.682007 368.314545,874.402893 368.776764,874.070068 
	C368.920441,874.265747 368.775665,874.528748 368.368378,874.883301 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M131.102493,855.041992 
	C131.391327,854.918274 131.617355,855.133911 131.738174,855.704468 
	C131.461639,855.791382 131.263870,855.565369 131.102493,855.041992 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M128.425873,827.196899 
	C125.519310,814.271423 122.891518,801.555786 120.092850,788.501343 
	C119.921982,760.692871 119.921982,733.223328 119.921982,705.303284 
	C145.820190,701.988831 170.232803,693.810120 195.028458,683.901184 
	C194.558960,690.274536 194.196564,695.193848 193.688400,700.951050 
	C193.158981,705.235962 192.627411,708.673950 192.416870,712.131592 
	C191.422165,728.465637 192.995529,744.350952 201.028503,759.345093 
	C201.412567,760.082947 201.749557,760.530396 202.120544,761.283813 
	C202.411865,761.899963 202.669174,762.210083 202.943207,762.853882 
	C205.229172,766.840332 207.498413,770.493164 209.804199,774.441895 
	C210.231491,775.151611 210.622223,775.565491 211.005463,775.989136 
	C210.997971,775.998962 211.020798,775.992554 211.047638,776.254639 
	C211.349991,776.711853 211.625488,776.907043 211.912796,777.101318 
	C211.924622,777.100403 211.893112,777.117004 211.936371,777.459961 
	C216.601501,783.900513 221.223373,789.998108 225.845245,796.095703 
	C231.136688,803.536194 236.428116,810.976624 242.022064,819.010254 
	C244.873016,823.074585 247.421417,826.545776 249.994232,830.311035 
	C250.359131,831.046448 250.699631,831.487854 251.030121,831.955322 
	C251.020111,831.981384 251.071503,831.959290 251.175461,832.293274 
	C253.889511,838.347107 256.930328,843.919495 258.958008,849.838806 
	C260.305542,853.772827 262.082153,855.823792 266.095001,857.456116 
	C270.302216,859.167542 274.860352,862.223206 277.168762,865.979675 
	C283.958466,877.028320 279.490906,892.722412 264.854553,896.295898 
	C262.356232,896.905884 259.576477,898.722717 258.125916,900.813843 
	C254.082092,906.643555 250.668320,912.910278 246.710632,919.156982 
	C242.268097,922.849670 238.120728,926.389893 233.973358,929.930054 
	C230.029968,931.110962 225.868668,931.839661 222.206696,933.604431 
	C218.786438,935.252869 216.672485,934.587585 213.888092,932.344360 
	C205.656311,925.712219 197.135269,919.439087 188.389435,912.967163 
	C175.762466,898.985107 163.473450,885.061462 150.914673,871.011597 
	C150.412720,870.503357 150.180496,870.121216 149.734955,869.155273 
	C148.752121,867.638489 147.982605,866.705627 147.213074,865.772766 
	C141.043610,852.984070 134.874130,840.195435 128.425873,827.196899 
M177.025543,874.001099 
	C177.025543,874.001099 177.113907,873.934143 176.993729,873.310974 
	C176.341797,872.492371 175.689850,871.673706 174.912842,870.192688 
	C174.548599,869.639221 174.221741,869.056519 173.814636,868.536621 
	C160.269318,851.236816 149.987808,832.251343 144.618637,810.851562 
	C142.487915,802.359131 141.038254,793.695801 139.268219,784.276733 
	C139.163071,783.171326 139.057922,782.065857 139.227051,780.812683 
	C139.378006,780.468689 139.274033,780.234741 138.980148,779.161560 
	C138.980148,760.212769 138.980148,741.263916 138.980148,722.155823 
	C139.895355,721.851501 140.979980,721.427368 142.098129,721.128784 
	C154.921112,717.704224 167.721512,714.188843 180.590225,710.944824 
	C185.416748,709.728088 187.341690,707.318176 185.584396,702.211243 
	C182.877426,703.122253 180.257645,704.164124 177.552628,704.887085 
	C164.405350,708.400696 151.225769,711.793518 138.081177,715.317017 
	C135.448502,716.022705 132.780045,716.474060 132.838776,720.551331 
	C133.109756,739.361023 133.075394,758.175110 132.976303,777.906372 
	C132.904114,796.291199 137.142502,813.806702 144.016708,830.708435 
	C150.491882,846.629028 158.687561,861.588867 170.429459,875.218567 
	C185.484970,893.893311 203.143814,909.649902 223.162735,922.867432 
	C227.325455,925.615906 229.922012,924.490234 232.280960,922.043579 
	C220.015305,912.242615 207.735733,902.891174 196.013412,892.886780 
	C189.236115,887.102722 183.357147,880.265930 177.025543,874.001099 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M391.957886,775.466309 
	C390.392426,787.691833 389.122437,799.531860 386.962830,811.207275 
	C385.648804,818.310974 382.962341,825.160828 380.896484,832.530640 
	C380.900604,832.936462 380.908661,832.873596 380.649048,833.033203 
	C380.261505,833.773987 380.133545,834.355164 379.736053,835.158813 
	C376.285431,842.223083 373.104309,849.064758 369.923187,855.906433 
	C364.630341,863.740845 359.790466,871.934570 353.932037,879.320312 
	C346.296936,888.946045 337.854065,897.930969 329.561890,907.488770 
	C326.132782,910.172058 322.900604,912.558105 319.333679,914.970337 
	C318.998901,914.996582 319.027222,915.017700 319.027222,915.017700 
	C321.739716,907.398071 325.789520,899.968384 326.903748,892.121826 
	C329.779388,871.871338 329.531982,851.630249 318.987000,833.086792 
	C312.847931,822.291260 306.200287,811.784912 299.436707,800.685425 
	C298.807495,799.774841 298.523071,799.327209 298.174774,798.591064 
	C297.752441,797.860840 297.393951,797.419067 297.018555,796.988647 
	C297.001648,797.000000 297.029053,796.971008 296.968079,796.717285 
	C296.665771,796.218811 296.424469,795.973999 295.993683,795.442078 
	C289.929321,785.724976 284.054474,776.294983 278.171875,766.887817 
	C278.164185,766.910645 278.165619,766.877808 278.155151,766.575806 
	C277.799103,765.807922 277.453522,765.342041 277.019287,764.529846 
	C273.703674,756.459290 270.476654,748.735046 267.238403,740.582397 
	C266.447113,732.230835 265.339142,724.321838 264.996490,716.379822 
	C264.747162,710.601746 265.508667,704.779968 265.905121,698.577576 
	C266.051117,697.091675 266.111511,696.005981 266.346436,694.668579 
	C266.608429,693.624634 266.695862,692.832275 266.783264,692.039917 
	C268.007507,683.633240 271.332886,676.163147 276.508118,669.423218 
	C278.255554,667.147461 279.671265,666.766418 282.273071,668.221619 
	C309.981049,683.719727 339.427948,694.690063 370.406464,701.543152 
	C377.204742,703.047119 384.089447,704.160095 391.878235,705.631409 
	C391.878235,728.560425 391.878235,751.785889 391.957886,775.466309 
M366.712189,811.659485 
	C366.563538,812.464966 366.414886,813.270386 365.945831,814.750854 
	C360.020477,834.389832 350.430847,852.144531 337.817902,868.223633 
	C334.643585,872.270264 334.912750,876.135986 335.701019,881.159485 
	C337.274445,879.388367 338.531464,878.277100 339.420349,876.924011 
	C345.675049,867.402588 352.500336,858.178894 357.876160,848.178833 
	C363.300354,838.088867 367.262451,827.212830 372.386383,816.208984 
	C379.954803,792.911682 378.916016,768.838806 378.786865,744.851135 
	C378.783569,744.239258 378.392242,743.629456 378.254272,742.081482 
	C378.236725,735.141602 378.219147,728.201660 378.573669,720.748474 
	C378.448975,719.764587 378.324310,718.780701 377.758453,717.218872 
	C375.914032,716.521545 374.124390,715.551086 372.216858,715.168518 
	C350.127991,710.739502 328.709595,704.138306 308.055817,695.167297 
	C297.861786,690.739441 287.874298,685.836121 277.362335,680.947449 
	C276.579620,682.868896 275.816101,684.743164 274.502441,687.968018 
	C293.651306,695.774963 312.040222,703.957153 330.931396,710.740295 
	C344.168427,715.493225 358.091125,718.336548 371.608490,722.335632 
	C371.687744,722.576050 371.853638,722.684082 372.064331,723.582581 
	C372.124695,725.724426 372.185059,727.866272 372.101501,730.500122 
	C372.149811,730.664062 372.198090,730.828003 372.130920,731.862427 
	C372.171661,733.908386 372.212402,735.954285 372.033997,738.914062 
	C371.808105,753.011169 372.036011,767.135132 371.202972,781.196228 
	C370.609100,791.220459 368.588745,801.160156 367.112244,811.177673 
	C367.112244,811.177673 367.185730,811.247070 366.712189,811.659485 
z"/>
<path fill="#3187C7" opacity="1.000000" stroke="none" 
	d="
M265.819519,698.977722 
	C265.508667,704.779968 264.747162,710.601746 264.996490,716.379822 
	C265.339142,724.321838 266.447113,732.230835 266.899170,740.398865 
	C264.783630,739.755310 263.058258,738.334167 261.192444,738.116455 
	C258.980438,737.858398 256.631012,739.006409 254.369598,738.905762 
	C240.357834,738.282166 227.296463,742.537048 214.130127,746.381104 
	C210.305573,747.497681 206.258301,747.921936 202.536652,749.277344 
	C201.426971,749.681519 200.707031,752.119202 200.479553,753.720459 
	C200.235275,755.440125 200.780609,757.271912 200.981400,759.054810 
	C192.995529,744.350952 191.422165,728.465637 192.416870,712.131592 
	C192.627411,708.673950 193.158981,705.235962 193.718292,701.411255 
	C198.707840,699.059631 203.374161,696.501587 208.368011,695.239624 
	C217.287842,692.985596 226.398956,691.480835 235.444839,689.739441 
	C237.536041,689.336853 239.684845,689.061951 241.810394,689.039734 
	C249.636673,688.958069 257.464325,689.007324 264.592865,689.007324 
	C265.098267,689.983459 265.620453,690.992065 266.462982,692.020264 
	C266.695862,692.832275 266.608429,693.624634 266.060455,694.858276 
	C265.673126,696.525635 265.746338,697.751709 265.819519,698.977722 
z"/>
<path fill="#A5D5F3" opacity="1.000000" stroke="none" 
	d="
M234.221954,930.224731 
	C238.120728,926.389893 242.268097,922.849670 247.092102,919.327026 
	C256.139252,919.073364 265.142395,920.713745 272.767395,918.190063 
	C301.162872,908.791931 312.179474,875.208740 294.922729,852.023376 
	C289.159088,844.279602 282.384094,837.459900 272.051514,835.802795 
	C265.033234,834.677185 258.063171,833.250977 251.071503,831.959229 
	C251.071503,831.959290 251.020111,831.981384 251.002228,831.664062 
	C250.646164,830.903442 250.307999,830.460205 249.969818,830.016968 
	C247.421417,826.545776 244.873016,823.074585 242.215179,819.287964 
	C247.062408,818.660706 252.029022,817.973511 256.973877,818.104980 
	C274.160095,818.561951 289.806976,822.344482 302.051880,836.130859 
	C308.559631,843.457825 312.988708,851.392578 315.692291,860.526733 
	C321.395020,879.793396 317.505920,897.029175 305.588409,913.178894 
	C298.223358,923.159485 288.491089,929.572693 277.343903,933.021362 
	C265.043579,936.826904 252.070450,938.237244 239.755356,931.574280 
	C238.245499,930.757385 236.244141,930.848938 234.221954,930.224731 
z"/>
<path fill="#6BC1EC" opacity="1.000000" stroke="none" 
	d="
M278.179596,766.864990 
	C284.054474,776.294983 289.929321,785.724976 296.020599,795.714478 
	C296.501007,796.506409 296.765015,796.738708 297.029053,796.971008 
	C297.029053,796.971008 297.001648,797.000000 297.022980,797.303711 
	C297.442413,798.031494 297.840515,798.455505 298.238647,798.879578 
	C298.523071,799.327209 298.807495,799.774841 299.156128,800.484985 
	C298.435028,801.139343 297.500580,802.031006 296.886932,801.847900 
	C287.992920,799.193237 279.280243,795.720520 270.232697,793.864197 
	C264.069550,792.599731 257.385223,792.952881 251.056366,793.667297 
	C244.149933,794.446899 237.407257,796.602173 230.536545,797.844421 
	C229.347290,798.059387 227.876556,796.717346 226.190536,796.095093 
	C221.223373,789.998108 216.601501,783.900513 212.340103,777.455444 
	C215.115707,777.231384 218.674728,778.424500 219.740051,777.285461 
	C223.546371,773.215576 228.546783,774.206421 232.970139,773.067688 
	C246.207016,769.659973 259.510529,766.699158 273.312775,769.917847 
	C275.568939,770.444031 278.160156,770.423218 278.179596,766.864990 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M318.987671,914.982788 
	C318.903564,915.022583 318.830688,915.076172 318.892517,915.073730 
	C319.027222,915.017700 318.998901,914.996582 318.987671,914.982788 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M997.962769,747.002319 
	C997.963318,740.552917 997.963318,734.602905 997.963318,728.169617 
	C1007.960510,727.755066 1017.468506,725.428345 1024.010498,734.300659 
	C1030.795410,743.502441 1030.798706,753.982422 1025.761353,763.558472 
	C1019.860352,774.776550 1008.244812,771.035522 997.962158,772.192505 
	C997.962158,763.653442 997.962158,755.577576 997.962769,747.002319 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M1130.017700,767.015137 
	C1132.520508,760.848572 1134.906738,755.049133 1137.491333,748.767395 
	C1141.125244,758.433289 1144.560669,767.560059 1147.969604,776.696716 
	C1148.068970,776.963318 1147.885254,777.335449 1147.782959,777.974670 
	C1140.740112,777.974670 1133.648193,777.974670 1125.775024,777.974670 
	C1127.229492,774.240662 1128.565186,770.811401 1130.017700,767.015137 
z"/>
<path fill="#FCFDFD" opacity="1.000000" stroke="none" 
	d="
M856.167664,860.344727 
	C856.333923,859.430176 856.465149,858.611084 856.670471,858.592041 
	C863.380127,857.970581 870.231628,856.712463 876.506165,860.238403 
	C880.389404,862.420593 881.497009,866.296753 880.957214,870.531555 
	C880.401184,874.892700 877.888550,878.160095 873.598022,878.858459 
	C868.104431,879.752441 862.469177,879.775757 856.167175,880.226318 
	C856.167175,873.286621 856.167175,867.049927 856.167664,860.344727 
z"/>
<path fill="#24AAE1" opacity="1.000000" stroke="none" 
	d="
M150.533463,879.565918 
	C150.465714,879.609680 150.601212,879.522217 150.533463,879.565918 
z"/>
<path fill="#24AAE1" opacity="1.000000" stroke="none" 
	d="
M369.962830,856.316895 
	C373.104309,849.064758 376.285431,842.223083 379.989136,834.994263 
	C380.644012,834.029297 380.776337,833.451416 380.908661,832.873596 
	C380.908661,832.873596 380.900604,832.936462 380.871948,832.921265 
	C382.813995,829.065002 384.784668,825.223999 386.850250,821.198120 
	C390.610840,821.314575 390.224762,823.938110 389.718353,826.339417 
	C388.945770,830.002747 387.923065,833.613403 387.010803,837.664429 
	C386.908173,838.628540 386.801300,839.174744 386.166931,840.027344 
	C385.468872,840.942871 385.298309,841.551941 385.127747,842.161072 
	C385.127747,842.161072 385.087494,842.048889 384.836517,842.220276 
	C384.411713,843.298462 384.237915,844.205322 384.064087,845.112122 
	C384.034943,845.525269 384.005768,845.938354 383.971191,846.663452 
	C381.982269,850.722839 379.998718,854.470215 377.962555,858.571716 
	C376.952362,860.054871 375.994843,861.183960 374.968933,862.634521 
	C370.425629,863.114807 369.760101,860.278015 369.962830,856.316895 
z"/>
<path fill="#3187C7" opacity="1.000000" stroke="none" 
	d="
M122.554428,833.688354 
	C121.580124,831.874451 120.821579,829.783875 120.082764,827.319397 
	C120.991722,829.100891 121.880959,831.256287 122.554428,833.688354 
z"/>
<path fill="#6BC1EC" opacity="1.000000" stroke="none" 
	d="
M147.143188,866.133057 
	C147.982605,866.705627 148.752121,867.638489 149.552170,868.874695 
	C148.746216,868.283142 147.909760,867.388245 147.143188,866.133057 
z"/>
<path fill="#6BC1EC" opacity="1.000000" stroke="none" 
	d="
M144.734161,875.933655 
	C144.486252,875.998718 144.228836,875.794006 143.918671,875.340271 
	C144.152145,875.282104 144.438385,875.472961 144.734161,875.933655 
z"/>
<path fill="#6BC1EC" opacity="1.000000" stroke="none" 
	d="
M145.294250,876.905273 
	C145.150375,877.028870 144.834656,876.707092 144.796005,876.485840 
	C144.984268,876.436951 145.211182,876.609314 145.294250,876.905273 
z"/>
<path fill="#3C5DA7" opacity="1.000000" stroke="none" 
	d="
M112.671097,792.461426 
	C112.272758,790.162048 112.027931,787.525879 111.836388,784.447754 
	C112.201309,786.712158 112.512962,789.418335 112.671097,792.461426 
z"/>
<path fill="#3187C7" opacity="1.000000" stroke="none" 
	d="
M384.313965,844.880859 
	C384.237915,844.205322 384.411713,843.298462 384.895935,842.215271 
	C384.992157,842.909119 384.777985,843.779419 384.313965,844.880859 
z"/>
<path fill="#3187C7" opacity="1.000000" stroke="none" 
	d="
M385.400391,842.003784 
	C385.298309,841.551941 385.468872,840.942871 385.939148,840.197876 
	C386.050293,840.656799 385.861664,841.251709 385.400391,842.003784 
z"/>
<path fill="#BFE0F5" opacity="1.000000" stroke="none" 
	d="
M251.175461,832.293213 
	C258.063171,833.250977 265.033234,834.677185 272.051514,835.802795 
	C282.384094,837.459900 289.159088,844.279602 294.922729,852.023376 
	C312.179474,875.208740 301.162872,908.791931 272.767395,918.190063 
	C265.142395,920.713745 256.139252,919.073364 247.387268,919.174500 
	C250.668320,912.910278 254.082092,906.643555 258.125916,900.813843 
	C259.576477,898.722717 262.356232,896.905884 264.854553,896.295898 
	C279.490906,892.722412 283.958466,877.028320 277.168762,865.979675 
	C274.860352,862.223206 270.302216,859.167542 266.095001,857.456116 
	C262.082153,855.823792 260.305542,853.772827 258.958008,849.838806 
	C256.930328,843.919495 253.889511,838.347107 251.175461,832.293213 
z"/>
<path fill="#24AAE1" opacity="1.000000" stroke="none" 
	d="
M278.171875,766.887817 
	C278.160156,770.423218 275.568939,770.444031 273.312775,769.917847 
	C259.510529,766.699158 246.207016,769.659973 232.970139,773.067688 
	C228.546783,774.206421 223.546371,773.215576 219.740051,777.285461 
	C218.674728,778.424500 215.115707,777.231384 212.296844,777.112549 
	C211.893112,777.117004 211.924622,777.100403 211.873001,776.846619 
	C211.554520,776.392761 211.287643,776.192688 211.020782,775.992554 
	C211.020798,775.992554 210.997971,775.998962 211.006973,775.676025 
	C210.599869,774.950745 210.183762,774.548340 209.767639,774.145935 
	C207.498413,770.493164 205.229172,766.840332 202.894928,762.548889 
	C202.582123,761.599426 202.334351,761.288635 202.086563,760.977844 
	C201.749557,760.530396 201.412567,760.082947 201.028503,759.345093 
	C200.780609,757.271912 200.235275,755.440125 200.479553,753.720459 
	C200.707031,752.119202 201.426971,749.681519 202.536652,749.277344 
	C206.258301,747.921936 210.305573,747.497681 214.130127,746.381104 
	C227.296463,742.537048 240.357834,738.282166 254.369598,738.905762 
	C256.631012,739.006409 258.980438,737.858398 261.192444,738.116455 
	C263.058258,738.334167 264.783630,739.755310 266.910400,740.827271 
	C270.476654,748.735046 273.703674,756.459290 276.982819,764.849670 
	C277.411835,765.969849 277.788727,766.423828 278.165619,766.877808 
	C278.165619,766.877808 278.164185,766.910645 278.171875,766.887817 
z"/>
<path fill="#DA7F58" opacity="1.000000" stroke="none" 
	d="
M133.150497,776.987610 
	C133.075394,758.175110 133.109756,739.361023 132.838776,720.551331 
	C132.780045,716.474060 135.448502,716.022705 138.081177,715.317017 
	C151.225769,711.793518 164.405350,708.400696 177.552628,704.887085 
	C180.257645,704.164124 182.877426,703.122253 185.584396,702.211243 
	C187.341690,707.318176 185.416748,709.728088 180.590225,710.944824 
	C167.721512,714.188843 154.921112,717.704224 142.098129,721.128784 
	C140.979980,721.427368 139.895355,721.851501 138.980148,722.155823 
	C138.980148,741.263916 138.980148,760.212769 138.930786,779.849731 
	C138.881409,780.537842 138.952789,780.960449 138.952789,780.960449 
	C139.057922,782.065857 139.163071,783.171326 138.823135,784.650757 
	C135.013885,785.457336 133.651321,784.034668 133.966461,780.628113 
	C134.075470,779.449890 133.443832,778.203064 133.150497,776.987610 
z"/>
<path fill="#ECAE6E" opacity="1.000000" stroke="none" 
	d="
M133.063400,777.447021 
	C133.443832,778.203064 134.075470,779.449890 133.966461,780.628113 
	C133.651321,784.034668 135.013885,785.457336 138.828278,785.067566 
	C141.038254,793.695801 142.487915,802.359131 144.618637,810.851562 
	C149.987808,832.251343 160.269318,851.236816 173.814636,868.536621 
	C174.221741,869.056519 174.548599,869.639221 174.811401,870.796143 
	C173.184036,872.460449 171.658096,873.521362 170.132172,874.582275 
	C158.687561,861.588867 150.491882,846.629028 144.016708,830.708435 
	C137.142502,813.806702 132.904114,796.291199 133.063400,777.447021 
z"/>
<path fill="#DA7F58" opacity="1.000000" stroke="none" 
	d="
M170.280807,874.900391 
	C171.658096,873.521362 173.184036,872.460449 174.873947,871.127319 
	C175.689850,871.673706 176.341797,872.492371 176.683395,873.667725 
	C175.668915,874.673279 174.964767,875.322021 174.260651,875.970764 
	C175.067230,876.687683 175.873810,877.404602 177.699829,879.027710 
	C177.367722,876.308594 177.220795,875.105774 177.073883,873.902954 
	C183.357147,880.265930 189.236115,887.102722 196.013412,892.886780 
	C207.735733,902.891174 220.015305,912.242615 232.280960,922.043579 
	C229.922012,924.490234 227.325455,925.615906 223.162735,922.867432 
	C203.143814,909.649902 185.484970,893.893311 170.280807,874.900391 
z"/>
<path fill="#6BC1EC" opacity="1.000000" stroke="none" 
	d="
M209.804214,774.441895 
	C210.183762,774.548340 210.599869,774.950745 211.014465,775.666260 
	C210.622223,775.565491 210.231491,775.151611 209.804214,774.441895 
z"/>
<path fill="#BFE0F5" opacity="1.000000" stroke="none" 
	d="
M249.994232,830.311035 
	C250.307999,830.460205 250.646164,830.903442 251.012238,831.637939 
	C250.699631,831.487854 250.359131,831.046448 249.994232,830.311035 
z"/>
<path fill="#3187C7" opacity="1.000000" stroke="none" 
	d="
M202.120560,761.283813 
	C202.334351,761.288635 202.582123,761.599426 202.878189,762.215210 
	C202.669174,762.210083 202.411865,761.899963 202.120560,761.283813 
z"/>
<path fill="#6BC1EC" opacity="1.000000" stroke="none" 
	d="
M211.047638,776.254639 
	C211.287643,776.192688 211.554520,776.392761 211.861176,776.847534 
	C211.625488,776.907043 211.349991,776.711853 211.047638,776.254639 
z"/>
<path fill="#ECAE6E" opacity="1.000000" stroke="none" 
	d="
M139.089920,780.886597 
	C138.952789,780.960449 138.881409,780.537842 138.898270,780.324280 
	C139.274033,780.234741 139.378006,780.468689 139.089920,780.886597 
z"/>
<path fill="#DA7F58" opacity="1.000000" stroke="none" 
	d="
M372.245392,730.008118 
	C372.185059,727.866272 372.124695,725.724426 372.045105,723.001709 
	C371.948669,722.267822 371.842560,722.138428 371.707581,722.032715 
	C358.091125,718.336548 344.168427,715.493225 330.931396,710.740295 
	C312.040222,703.957153 293.651306,695.774963 274.502441,687.968018 
	C275.816101,684.743164 276.579620,682.868896 277.362335,680.947449 
	C287.874298,685.836121 297.861786,690.739441 308.055817,695.167297 
	C328.709595,704.138306 350.127991,710.739502 372.216858,715.168518 
	C374.124390,715.551086 375.914032,716.521545 377.888000,717.936279 
	C378.078857,719.523071 378.140228,720.392456 378.201599,721.261780 
	C378.219147,728.201660 378.236725,735.141602 377.914246,742.345337 
	C377.485748,739.127197 374.417114,739.085938 372.253174,738.000244 
	C372.212402,735.954285 372.171661,733.908386 372.324280,731.333008 
	C372.694153,730.461304 372.603424,730.196167 372.245392,730.008118 
z"/>
<path fill="#ECAE6E" opacity="1.000000" stroke="none" 
	d="
M372.143585,738.457153 
	C374.417114,739.085938 377.485748,739.127197 377.878052,742.813904 
	C378.392242,743.629456 378.783569,744.239258 378.786865,744.851135 
	C378.916016,768.838806 379.954803,792.911682 372.053406,816.133484 
	C369.902344,815.397278 368.084290,814.736572 366.266205,814.075867 
	C366.414886,813.270386 366.563538,812.464966 367.010437,811.540039 
	C367.308655,811.420532 367.554840,811.363281 367.554840,811.363281 
	C367.554840,811.363281 367.204987,811.137573 367.204987,811.137573 
	C368.588745,801.160156 370.609100,791.220459 371.202972,781.196228 
	C372.036011,767.135132 371.808105,753.011169 372.143585,738.457153 
z"/>
<path fill="#DA7F58" opacity="1.000000" stroke="none" 
	d="
M366.106018,814.413330 
	C368.084290,814.736572 369.902344,815.397278 371.792755,816.369629 
	C367.262451,827.212830 363.300354,838.088867 357.876160,848.178833 
	C352.500336,858.178894 345.675049,867.402588 339.420349,876.924011 
	C338.531464,878.277100 337.274445,879.388367 335.701019,881.159485 
	C334.912750,876.135986 334.643585,872.270264 337.817902,868.223633 
	C350.430847,852.144531 360.020477,834.389832 366.106018,814.413330 
z"/>
<path fill="#3C5DA7" opacity="1.000000" stroke="none" 
	d="
M265.905121,698.577576 
	C265.746338,697.751709 265.673126,696.525635 265.885925,695.109924 
	C266.111511,696.005981 266.051117,697.091675 265.905121,698.577576 
z"/>
<path fill="#ECAE6E" opacity="1.000000" stroke="none" 
	d="
M378.387634,721.005127 
	C378.140228,720.392456 378.078857,719.523071 378.108582,718.225281 
	C378.324310,718.780701 378.448975,719.764587 378.387634,721.005127 
z"/>
<path fill="#93CEF0" opacity="1.000000" stroke="none" 
	d="
M298.174805,798.591064 
	C297.840515,798.455505 297.442413,798.031494 297.039886,797.292419 
	C297.393951,797.419067 297.752441,797.860840 298.174805,798.591064 
z"/>
<path fill="#6BC1EC" opacity="1.000000" stroke="none" 
	d="
M278.155151,766.575806 
	C277.788727,766.423828 277.411835,765.969849 277.071472,765.196045 
	C277.453522,765.342041 277.799103,765.807922 278.155151,766.575806 
z"/>
<path fill="#3187C7" opacity="1.000000" stroke="none" 
	d="
M380.649048,833.033203 
	C380.776337,833.451416 380.644012,834.029297 380.258606,834.771729 
	C380.133545,834.355164 380.261505,833.773987 380.649048,833.033203 
z"/>
<path fill="#ECAE6E" opacity="1.000000" stroke="none" 
	d="
M372.173462,730.254150 
	C372.603424,730.196167 372.694153,730.461304 372.381989,730.897766 
	C372.198090,730.828003 372.149811,730.664062 372.173462,730.254150 
z"/>
<path fill="#ECAE6E" opacity="1.000000" stroke="none" 
	d="
M371.658020,722.184204 
	C371.842560,722.138428 371.948669,722.267822 372.066040,722.540283 
	C371.853638,722.684082 371.687744,722.576050 371.658020,722.184204 
z"/>
<path fill="#93CEF0" opacity="1.000000" stroke="none" 
	d="
M296.968079,796.717285 
	C296.765015,796.738708 296.501007,796.506409 296.210083,796.001587 
	C296.424469,795.973999 296.665771,796.218811 296.968079,796.717285 
z"/>
<path fill="#ECAE6E" opacity="1.000000" stroke="none" 
	d="
M177.049713,873.952026 
	C177.220795,875.105774 177.367722,876.308594 177.699829,879.027710 
	C175.873810,877.404602 175.067230,876.687683 174.260651,875.970764 
	C174.964767,875.322021 175.668915,874.673279 176.743484,873.979370 
	C177.113907,873.934143 177.025543,874.001099 177.049713,873.952026 
z"/>
<path fill="#DA7F58" opacity="1.000000" stroke="none" 
	d="
M367.158630,811.157593 
	C367.204987,811.137573 367.554840,811.363281 367.554840,811.363281 
	C367.554840,811.363281 367.308655,811.420532 367.247192,811.333801 
	C367.185730,811.247070 367.112244,811.177673 367.158630,811.157593 
z"/>
</g>
</svg>
`;

function generatePage2(data: ApplicationPacketData): string {

  console.log("Mail of agency:", data.agencyEmail);

  // ⭐ PASTE HERE
  const email = data.agencyEmail?.toLowerCase() || "";

  // let selectedLogo = data.capitalCoLogoSVG;
  let selectedLogo = data.capitalCoLogoSVG;

  if (email === "max@blueangelins.com") {
    selectedLogo = blueAngelLogoSVG;
  }

  if (email === "office@sjinsuranceservices.com") {
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
                General Liability Application ID: ${data.submissionNumber}
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

  if (email === "max@blueangelins.com") {
    selectedLogo = blueAngelLogoSVG;
  }

  if (email === "office@sjinsuranceservices.com") {
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
          <div>
            <div class="invoice-field-page12"><strong>Program:</strong> ${data.programName || 'Standard GL A-Rated'}</div>
            <div class="invoice-field-page12"><strong>Applicant Name:</strong> ${data.companyName}</div>
            <div class="invoice-field-page12"><strong>Application ID:</strong> ${data.submissionNumber}</div>
          </div>
          <div>
            <strong>Sterling Insurance Services</strong>
            <p>5455 Wilshire Blvd. #1816<br>Los Angeles CA 90036</p>

          </div>
        </div>
        
        <div class="invoice-section-page12">
          <div class="invoice-section-title-page12">TOTAL COST OF POLICY*</div>
          <div class="invoice-row-page12">
            <div class="invoice-label-page12">Premium</div>
            <div class="invoice-value-page12">${data.premium || '$0.00'}</div>
          </div>
          <div class="invoice-row-page12">
            <div class="invoice-label-page12">Surplus Lines Tax</div>
            <div class="invoice-value-page12">${data.surplusLinesTax || '$0.00'}</div>
          </div>
          <div class="invoice-row-page12">
            <div class="invoice-label-page12">Carrier Policy Fee</div>
            <div class="invoice-value-page12">${data.carrierPolicyFee || '$0.00'}</div>
          </div>
          <div class="invoice-row-page12">
            <div class="invoice-label-page12">Sterling Insurance Services Fees</div>
            <div class="invoice-value-page12">${data.sterlingFees || '$0.00'}</div>
          </div>
          ${data.stampingFee && parseFloat(data.stampingFee.replace(/[$,]/g, "")) > 0 ? `
            <div class="invoice-row-page12">
              <div class="invoice-label-page12">Stamping Fee</div>
              <div class="invoice-value-page12">${data.stampingFee}</div>
            </div>
          ` : ''}

          ${data.fireMarshalTax && parseFloat(data.fireMarshalTax.replace(/[$,]/g, "")) > 0 ? `
            <div class="invoice-row-page12">
              <div class="invoice-label-page12">Fire Marshal Tax</div>
              <div class="invoice-value-page12">${data.fireMarshalTax}</div>
            </div>
          ` : ''}

          <div class="invoice-row-total-page12">
            <div class="invoice-label-page12">TOTAL COST OF POLICY*</div>
            <div class="invoice-value-page12">${data.totalCostOfPolicy || '$0.00'}</div>
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
            <div class="invoice-label-page12">Sterling Insurance Services Fees</div>
            <div class="invoice-value-page12">${data.depositInspectionFee || '$0.00'}</div>
          </div>
          ${data.depositPolicyFee && parseFloat(data.depositPolicyFee.replace(/[$,]/g, "")) > 0 ? `
            <div class="invoice-row-page12">
              <div class="invoice-label-page12">Stamping Fee</div>
              <div class="invoice-value-page12">${data.depositPolicyFee}</div>
            </div>`
      : ''}

          ${data.depositFireMarshal && parseFloat(data.depositFireMarshal.replace(/[$,]/g, "")) > 0 ? `
            <div class="invoice-row-page12">
              <div class="invoice-label-page12">Fire Marshal Tax</div>
              <div class="invoice-value-page12">${data.depositFireMarshal}</div>
            </div>`
      : ''}
          <!--<div class="invoice-row-page12">
                <div class="invoice-label-page12">15% AI Processing Fee</div>
                <div class="invoice-value-page12">${data.aiProcessingFee || '$0.00'}</div>
              </div>-->

          <div class="invoice-row-total-page12">
            <div class="invoice-label-page12">TOTAL DEPOSIT*</div>
            <div class="invoice-value-page12">${data.totalDeposit || '$0.00'}</div>
          </div>
        </div>
        
        <div class="invoice-section-page12">
          <div class="invoice-section-title-page12">TOTAL TO RETAIN*</div>
          <div class="invoice-row-page12">
            <div class="invoice-label-page12">10% Commission on Premium (${data.premium || '$0.00'})</div>
            <div class="invoice-value-page12">${data.totalToRetain || '$0.00'}</div>
          </div>
          <div class="invoice-row-total-page12">
            <div class="invoice-label-page12">TOTAL TO RETAIN*</div>
            <div class="invoice-value-page12">${data.totalToRetain || '$0.00'}</div>
          </div>
        </div>
        
        <div class="invoice-section-page12">
          <div class="invoice-section-title-page12">TOTAL TO BE SENT</div>
          <div class="invoice-row-total-page12">
            <div class="invoice-label-page12">MAKE CHECK PAYABLE FOR from agency</div>
            <div class="invoice-value-page12">${data.totalToBeSent || '$0.00'}</div>
          </div>
          <div class="invoice-row-total-page12">
            <div class="invoice-label-page12"><finance>MAKE CHECK PAYABLE FOR finance company</div>
            <div class="invoice-value-page12">${data.totalToFinanceCompany || '$0.00'}</div>
          </div>
        </div>
        
        <div class="bottom-section">
          <div class="payment-option-page12"><strong>Payment Option:</strong> ${data.paymentOption}</div>
        
          <div class="binding-statement-page12">
            <p>The binding of this insurance policy is an agreement to the above-referenced prices and its terms and conditions</p>
            <div class="signature-field-page12">
              <div class="signature-label-page12">Signature of Producer (Agent or Broker):______________________________________</div>
              <div class="signature-line-page12">${data.invoiceProducerSignature || ' '}</div>
            </div>
          </div>
        
          <div class="invoice-disclaimer-page12">
            <p>*Please note that any added agency broker fee or other charge, fee or cost assessed to the insured is your sole responsibility. All such amounts added in connection with this policy shall be in compliance with all applicable state and federal law.</p>
          </div>
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
    paymentOption: formData.paymentOption,

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
    workCommercialOver20000SqFt: formData.workCommercialOver20000SqFt ?? formData.workOver20000SqFt,
    commercialOver20000SqFtPercent: formData.commercialOver20000SqFtPercent ?? formData.over20000SqFtPercent,
    commercialOver20000SqFtExplanation: formData.commercialOver20000SqFtExplanation ?? formData.over20000SqFtExplanation,
    licensingActionTaken: formData.licensingActionTaken,
    licensingActionExplanation: formData.licensingActionExplanation,
    allowedLicenseUseByOthers: formData.allowedLicenseUseByOthers ?? formData.licenseSharedWithOthers,
    allowedLicenseUseByOthersExplanation: formData.allowedLicenseUseByOthersExplanation ?? formData.licenseSharedWithOthersExplanation,
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


    // Page 12: Invoice Statement
    programName: formData.programName || submission?.programName || 'Standard GL A-Rated',
    submissionNumber: submission?.submissionNumber,
    premium: formData.premium || formatUSD(quote?.carrierQuoteUSD),
    stateTax: formData.stateTax || formatUSD(quote?.premiumTaxAmountUSD),
    associationDues: formData.associationDues || formatUSD(quote?.carrierFeesUSD),
    policyFee: formatUSD(quote?.sterlingInsuranceServicesFeesUSD),
    inspectionFee: formatUSD(quote?.stampingFeeAmountUSD),
    fireMarshalTax: formatUSD(quote?.fireMarshalTaxAmountUSD),
    totalCostOfPolicy: formatUSD(quote?.finalAmountUSD),

    surplusLinesTax: formatUSD(quote?.premiumTaxAmountUSD),
    carrierPolicyFee: formatUSD(quote?.carrierFeesUSD),
    sterlingFees: formatUSD(quote?.sterlingInsuranceServicesFeesUSD),
    stampingFee: formatUSD(quote?.stampingFeeAmountUSD),


    depositPremium: formatUSD(quote?.depositPremiumUSD),
    depositAssociationDues: formatUSD(quote?.depositCarrierFeesUSD),
    depositStateTax: formatUSD(quote?.depositTaxUSD),
    depositPolicyFee: formatUSD(quote?.depositStampingUSD),
    depositInspectionFee: formatUSD(quote?.depositSterlingFeesUSD),
    depositFireMarshal: formatUSD(quote?.depositFireMarshalUSD),
    totalDeposit: formatUSD(quote?.totalDepositUSD),
    totalToFinanceCompany: formatUSD(quote?.totalToFinanceCompanyUSD),

    totalToRetain: formatUSD(quote?.totalToRetainUSD),
    totalToBeSent: formatUSD(quote?.totalToBeSentUSD),
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
      margin-bottom: 16px;
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
      margin-bottom: 0.06in !important;
    }
    
    .page11-isc .logo-capital-co-page11-right {
      width: 2in;
      // height: 2in;
      margin-top: -0.15in; 
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
   PAGE 12 - ISC FORMAT (OPTIMIZED FIT)
   ============================================ */

    .page12-isc .invoice-section-page12 {
        margin-top: 0.06in;
        margin-bottom: 0.12in;
        /* reduced from 0.6in */
    }
    .page12-isc .extra-space {
      margin-bottom: 0.3in;
      margin-top: 0.5in;
    }

    /* Section Title */
    .page12-isc .invoice-section-title-page12 {
        font-size: 11pt;
        font-weight: 700;
        text-transform: uppercase;
        color: #1f2937;
        border-bottom: 1px solid #1f2937;
        padding-bottom: 0.04in;
        margin-bottom: 0.06in;
    }

    /* Rows */
    .page12-isc .invoice-row-page12 {
        display: flex;
        justify-content: space-between;
        padding: 0.025in 0;
        /* tighter */
        border-bottom: none;
    }

    .page12-isc .invoice-header-page12 {
      margin-bottom: 0.2in;
      font-size: 11pt;
      display: flex;
      justify-content: space-between; 
      align-items: flex-start;
    }

    /* Labels */
    .page12-isc .invoice-label-page12 {
        font-size: 10pt;
        color: #1f2937;
        font-weight: 400;
    }

    /* Values */
    .page12-isc .invoice-value-page12 {
        font-size: 10pt;
        font-weight: 400;
        text-align: right;
        min-width: 1.3in;
        color: #1f2937;
    }

    /* TOTAL ROW (Accounting Style) */
    .page12-isc .invoice-row-total-page12 {
        display: flex;
        justify-content: flex-end;
        gap: 0.7in;
        padding-top: 0.04in;
        margin-top: 0.06in;
    }

    .page12-isc .invoice-row-total-page12 .invoice-label-page12 {
        font-weight: 700;
        font-size: 10pt;
        text-transform: uppercase;
    }

    .page12-isc .invoice-row-total-page12 .invoice-value-page12 {
        font-weight: 800;
        font-size: 10pt;
        min-width: 1.3in;
        text-align: right;
    }

    /* Binding / Payment area tighter */
    .page12-isc .binding-statement-page12 {
        margin-top: 0.04in;
        font-size: 9pt;
    }

    .page12-isc .signature-field-page12 {
      margin-bottom: 0.2in;
      margin-top: 0.5in;
    }

    .page12-isc .bottom-section{
      margin-top: 1.5in;
    }

    /* Disclaimer — FIXED HUGE GAP */
    .page12-isc .invoice-disclaimer-page12 {
        margin-top: 0.1in;
        /* reduced from 0.6in */
        font-size: 8pt;
        font-style: italic;
    }

    .page12-isc .invoice-disclaimer-page12 p {
        margin: 0;
        color: #6b7280;
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