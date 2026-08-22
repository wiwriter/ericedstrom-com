import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.ericedstrom.com',
  output: 'static',
  trailingSlash: 'always',
  redirects: {
    '/contact': '/contact-me/',
    '/got-it': '/thank-you/',
    '/newsletter-sign-up': '/newsletter/',
  },
});
