import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { ThemeProvider } from "@/components/providers/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://kmmediatraininginstitute.com"),
  title: {
    default: "Kmmedia Training Institute | Leading Media School in Ghana",
    template: "%s | Kmmedia Training Institute",
  },
  description: "Kmmedia Training Institute is a leading media training institute in Ghana, offering a wide range of courses in media, film production, sound engineering, digital marketing, and more.",
  keywords: [
    "Media training in Ghana",
    "Film production school Accra",
    "Broadcast Journalism course",
    "Sound Engineering school",
    "Digital Marketing training",
    "Graphic Design classes",
    "Web Development course Ghana",
    "Video Editing training",
    "Fashion Designing school",
    "Kmmedia Training Institute",
    "kmmedia",
    
  ],
  authors: [{ name: "Kmmedia Training Institute" }],
  creator: "Kmmedia Training Institute",
  publisher: "Kmmedia Training Institute",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Kmmedia Training Institute | Leading Media School in Ghana",
    description: "Join hundreds of successful graduates who have transformed their careers with Kmmedia Training Institute. Apply now for our practical courses.",
    url: "https://kmmediatraininginstitute.com",
    siteName: "Kmmedia Training Institute",
    images: [
      {
        url: "/images/logo.jpeg",
        width: 800,
        height: 600,
        alt: "Kmmedia Training Institute Logo",
      },
    ],
    locale: "en_GH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kmmedia Training Institute",
    description: "Ghana's leading media training institute, dedicated to shaping the next generation of storytellers and media professionals.",
    images: ["/images/logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://kmmediatraininginstitute.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Kmmedia Training Institute",
              "url": "https://kmmediatraininginstitute.com",
              "logo": "https://kmmediatraininginstitute.com/images/logo.jpeg",
              "description": "Ghana's leading media training institute, dedicated to shaping the next generation of storytellers and media professionals.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Akatsi",
                "addressRegion": "Volta Region",
                "addressCountry": "GH"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+233555587754",
                "contactType": "admissions",
                "email": "kmradioonline2@gmail.com"
              },
              "sameAs": [
                "https://www.facebook.com/share/18ZjHvfLLU/",
                "https://www.instagram.com/kmmedia_gh/"
              ]
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
