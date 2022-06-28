/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
module.exports = nextConfig


const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'nonce-script-ga' 'nonce-script-ga2'; script-src-elem 'self' https://www.googletagmanager.com 'nonce-script-ga';
  style-src 'self' 'unsafe-inline';
  font-src 'self';  
`

const securityHeaders = [
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=26298000; includeSubDomains'
  },
  {
    key: 'Content-Security-Policy',
    value: process.env.NODE_ENV === "production" ? ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim() : ""
  }
]



module.exports = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

