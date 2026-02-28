export interface Credential {
  id: string;
  type: 'certificate' | 'registration';
  title: string;
  issuer: string;
  date: string;
  regNo?: string;
  taxId?: string;
  description: string;
  certFile: string;
  verifyUrl?: string;
  verifyLabel?: string;
}

export const credentials: Credential[] = [
  {
    id: 'cac',
    type: 'registration',
    title: 'Business Registration',
    issuer: 'Corporate Affairs Commission, Nigeria',
    date: 'January 29, 2026',
    regNo: 'BN 9256243',
    taxId: '2622467885447',
    description: 'The Catalyst Strategic Ventures — Computer Programming, Consultancy and Related Activities. Registered under the Companies and Allied Matters Act 2020.',
    certFile: '/certs/cac-certificate.pdf',
    verifyUrl: 'https://search.cac.gov.ng',
    verifyLabel: 'Verify on CAC',
  },
  {
    id: 'coursera-python',
    type: 'certificate',
    title: 'Python for Data Science and AI',
    issuer: 'IBM',
    date: 'October 31, 2025',
    description: 'Professional certificate covering Python fundamentals for data science, AI, and machine learning applications.',
    certFile: '/certs/coursera-python-ds-ai.pdf',
    verifyUrl: 'https://www.credly.com/badges/27067478-2b75-4bc5-a6ef-e6e1ebed6141',
    verifyLabel: 'Verify on Credly',
  },
];
