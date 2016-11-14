const COMPANY_DOCUMENT_SECTIONS = [
    {
        name: 'Partner Enquiry Form',
        description: 'Signed document to commerce partnership with Merlin Group',
        tag: 'company.document.PartnerEnquiryForm',
        required: true
    },
    {
        name: 'Accountant\'s Letter',
        description: 'Supporting this application',
        tag: 'company.document.AccountantLetter',
        required: true
    },
    {
        name: 'Last 2 Years Financials',
        description: 'Including P&L and Balance Sheet',
        tag: 'company.document.Last2YearsFinancials',
        required: true
    },
    {
        name: 'BAS Statement',
        description: 'Last 4 quarter',
        tag: 'company.document.BASStatement',
        required: true
    },
    {
        name: 'Lease Agreement',
        description: '',
        tag: 'company.document.LeaseAgreement',
        required: true
    },
    {
        name: 'Any Immigration Paperwork for Previous Applications',
        description: '',
        tag: 'company.document.ImmigrationPaperworkForPreviousApplications',
        required: false
    },
    {
        name: 'Evidence of Customers',
        description: 'Customer invoices, jobs in-progress, tender documents, project drawings, growth plans/financial forecasts',
        tag: 'company.document.EvidenceOfCustomers',
        required: true
    },
    {
        name: 'Company Trust Deed',
        description: 'If you have a TRUST',
        tag: 'company.document.CompanyTrustDeed',
        required: false
    },
    {
        name: 'Examples of Employment Contracts and Staff Payroll Data',
        description: '',
        tag: 'company.document.ExamplesOfEmploymentContractsAndStaffPayrollData',
        required: true
    },
    {
        name: 'Any Previous Labour Agreements',
        description: '',
        tag: 'company.document.PreviousLabourAgreements',
        required: false
    }
]

export default COMPANY_DOCUMENT_SECTIONS
