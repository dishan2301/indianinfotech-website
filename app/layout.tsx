import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://indianinfotech.org'),
  title: 'Workforce & Workplace Solutions | Indian Infotech',
  description:
    'Biometric attendance, access control, entrance management, and HRMS solutions from Indian Infotech, Ahmedabad.',
  applicationName: 'Indian Infotech',
  authors: [{ name: 'Indian Infotech' }],
  creator: 'Indian Infotech',
  publisher: 'Indian Infotech',
  formatDetection: { email: false, address: false, telephone: false },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  icons: { icon: '/favicon.svg' },
  openGraph: {
    siteName: 'Indian Infotech',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Indian Infotech workforce and workplace systems' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Indian Infotech',
  url: 'https://indianinfotech.org',
  logo: 'https://indianinfotech.org/indian-infotech-logo.png',
  foundingDate: '2011',
  email: 'sales@indianinfotech.org',
  telephone: '+91-76000-66770',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '429, 425, 403 Gala Empire, Opp. Doordarshan Kendra, Thaltej',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    postalCode: '380054',
    addressCountry: 'IN',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <div id="main-content">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
