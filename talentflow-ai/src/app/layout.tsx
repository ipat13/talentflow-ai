import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./visual-improvements.css";
import { Providers } from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TalentFlow AI",
  description: "Sistema de recrutamento inteligente com matching de candidatos baseado em IA",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function ensureDropdownVisibility() {
                const dropdowns = document.querySelectorAll('[data-profile-menu], .profile-dropdown');
                
                dropdowns.forEach(dropdown => {
                  if (dropdown && window.getComputedStyle(dropdown).display !== 'none') {
                    if (dropdown.parentElement !== document.body) {
                      document.body.appendChild(dropdown);
                    }
                    
                    dropdown.style.cssText = 
                      'position: fixed !important;' +
                      'z-index: 2147483647 !important;' +
                      'background: #1e293b !important;' +
                      'border: 2px solid #10b981 !important;' +
                      'border-radius: 0.75rem !important;' +
                      'box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;' +
                      'display: block !important;' +
                      'visibility: visible !important;' +
                      'opacity: 1 !important;';
                    
                    const header = document.querySelector('header');
                    if (header) {
                      const headerRect = header.getBoundingClientRect();
                      dropdown.style.top = (headerRect.bottom + 8) + 'px !important';
                      dropdown.style.right = '20px !important';
                    }
                  }
                });
              }
              
              ensureDropdownVisibility();
              setInterval(ensureDropdownVisibility, 100);
              
              document.addEventListener('click', ensureDropdownVisibility);
              document.addEventListener('mouseover', ensureDropdownVisibility);
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg"
        >
          Saltar para conteúdo principal
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}