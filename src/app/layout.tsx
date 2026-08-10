import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { SITE_CONFIG } from "@/config/site";
import { SiteProvider } from "@/context/SiteContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  icons: {
    icon: "/brand/Favicon.png",
    shortcut: "/brand/Favicon.png",
    apple: "/brand/Favicon.png",
  },
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.assets.openGraph.default,
        width: 1200,
        height: 1200,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.assets.openGraph.default],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaOrgData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_CONFIG.url}/#website`,
        url: SITE_CONFIG.url,
        name: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        publisher: {
          "@id": `${SITE_CONFIG.url}/#organization`
        },
        inLanguage: SITE_CONFIG.language
      },
      {
        "@type": ["AutoRental", "LocalBusiness", "Organization"],
        "@id": `${SITE_CONFIG.url}/#organization`,
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
        logo: `${SITE_CONFIG.url}/brand/logo-primary.png`,
        image: `${SITE_CONFIG.url}${SITE_CONFIG.assets.openGraph.default}`,
        description: SITE_CONFIG.description,
        address: {
          "@type": "PostalAddress",
          streetAddress: "44 Avenue Abdelkrim Al Khattabi, Agdal",
          addressLocality: SITE_CONFIG.city,
          addressCountry: "MA"
        },
        telephone: "+212661503446",
        email: "wimacar@gmail.com",
        areaServed: [
          {
            "@type": "City",
            name: "Rabat"
          },
          {
            "@type": "City",
            name: "Salé"
          },
          {
            "@type": "Airport",
            name: "Aéroport de Rabat-Salé"
          }
        ],
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          opens: "08:00",
          closes: "22:00"
        }
      }
    ]
  };

  return (
    <html
      lang={SITE_CONFIG.language}
      className={`${inter.variable} ${manrope.variable} h-full scroll-smooth antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgData) }}
        />
        <SiteProvider>{children}</SiteProvider>
      </body>
    </html>
  );
}
