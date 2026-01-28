//importing from .env file

export default (applicantId: string) => ({
  applicantId,
  domainId: import.meta.env.VITE_DIVEONLINE_DOMAIN_ID,
  publicKey: import.meta.env.VITE_DIVEONLINE_PUBLIC_KEY,
  domainApi: import.meta.env.VITE_DIVEONLINE_PROD_URL.slice(0, -1),
  callbacks: {},
});

