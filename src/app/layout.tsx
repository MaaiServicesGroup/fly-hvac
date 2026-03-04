import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmergencyBanner from "@/components/EmergencyBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FLY HVAC | Houston's #1 Rated AC Repair & Installation | 5.0 Stars",
  description:
    "FLY HVAC: Houston's top-rated HVAC contractor. 25+ years experience, perfect 5-star rating, 62+ reviews. AC repair, installation, heating, duct work, whole-house dehumidifiers. TACLA#26688C. Call (832) 605-6239.",
  keywords:
    "AC repair Houston, HVAC Houston, air conditioning repair Houston TX, heating repair Houston, duct cleaning Houston, emergency AC repair, FLY HVAC, whole house dehumidifier Houston",
  openGraph: {
    title: "FLY HVAC | Houston's 5-Star HVAC Experts",
    description:
      "25+ years of expert AC repair, installation & maintenance in Houston. Perfect 5.0 Google rating. Licensed TACLA#26688C.",
    url: "https://flyhvac.com",
    siteName: "FLY HVAC",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FLY HVAC | Houston's 5-Star HVAC Experts",
    description:
      "25+ years of expert AC repair, installation & maintenance in Houston. Perfect 5.0 Google rating.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HVACBusiness",
              name: "FLY HVAC",
              image: "https://flyhvac.com/og-image.jpg",
              "@id": "https://flyhvac.com",
              url: "https://flyhvac.com",
              telephone: "832-605-6239",
              address: {
                "@type": "PostalAddress",
                streetAddress: "8339 Carvel Lane",
                addressLocality: "Houston",
                addressRegion: "TX",
                postalCode: "77036",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 29.6858,
                longitude: -95.5271,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  opens: "08:00",
                  closes: "20:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Sunday",
                  opens: "00:00",
                  closes: "23:59",
                  description: "Emergency Service Only",
                },
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                reviewCount: "62",
              },
              priceRange: "$$",
              areaServed: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: 29.7604,
                  longitude: -95.3698,
                },
                geoRadius: "50",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "HVAC Services",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "AC Repair" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "AC Installation" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Heating Repair" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Duct Cleaning" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Whole House Dehumidifiers" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Home Energy Audits" } },
                ],
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <EmergencyBanner />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
