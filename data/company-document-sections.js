import ENV_VARS from '../env-vars'

const COMPANY_DOCUMENT_SECTIONS = [
    {
        name: 'Partner Enquiry Form',
        description: 'Signed document to commerce partnership with Merlin Group',
        tag: ENV_VARS.DOCUMENT_TAG.company_document + '.PartnerEnquiryForm',
        required: true
    },
    {
        name: 'Accountant\'s Letter',
        description: 'Supporting this application',
        tag: ENV_VARS.DOCUMENT_TAG.company_document + '.AccountantLetter',
        required: true
    },
    {
        name: 'Last 2 Years Financials',
        description: 'Including P&L and Balance Sheet',
        tag: ENV_VARS.DOCUMENT_TAG.company_document + '.Last2YearsFinancials',
        required: true
    },
    {
        name: 'BAS Statement',
        description: 'Last 4 quarter',
        tag: ENV_VARS.DOCUMENT_TAG.company_document + '.BASStatement',
        required: true
    },
    {
        name: 'Lease Agreement / Title Deed',
        description: '',
        tag: ENV_VARS.DOCUMENT_TAG.company_document + '.LeaseAgreement',
        required: true
    },
    {
        name: 'Any Immigration Paperwork for Previous Applications',
        description: '',
        tag: ENV_VARS.DOCUMENT_TAG.company_document + '.ImmigrationPaperworkForPreviousApplications',
        required: false
    },
    {
        name: 'Evidence of Customers',
        description: 'Customer invoices, jobs in-progress, tender documents, project drawings, growth plans/financial forecasts',
        tag: ENV_VARS.DOCUMENT_TAG.company_document + '.EvidenceOfCustomers',
        required: true
    },
    {
        name: 'Company Trust Deed',
        description: 'If you have a TRUST',
        tag: ENV_VARS.DOCUMENT_TAG.company_document + '.CompanyTrustDeed',
        required: false
    },
    {
        name: 'Examples of Employment Contracts and Staff Payroll Data',
        description: '',
        tag: ENV_VARS.DOCUMENT_TAG.company_document + '.ExamplesOfEmploymentContractsAndStaffPayrollData',
        required: true
    },
    {
        name: 'Any Previous Labour Agreements',
        description: '',
        tag: ENV_VARS.DOCUMENT_TAG.company_document + '.PreviousLabourAgreements',
        required: false
    }
]

export default COMPANY_DOCUMENT_SECTIONS
