"use client";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const footerColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
      { label: "API", href: "#api" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Blog", href: "#blog" },
      { label: "Careers", href: "#careers" },
      { label: "Contact", href: "#contact" }
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Support", href: "#support" },
      { label: "Documentation", href: "#docs" },
      { label: "Case Studies", href: "#case-studies" },
      { label: "Community", href: "#community" }
    ]
  }
];

export default function Footer() {
  return (
    <footer 
      className="py-12 border-t border-[rgba(255,255,255,0.08)]"
      style={{ backgroundColor: "#020617" }}
    >
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/logo.png" 
                alt="TalentsFlow.ai Logo" 
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-xl font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                TalentsFlow.ai
              </span>
            </div>
            <p className="text-[#94a3b8] text-sm leading-relaxed">
              Revolutionizing tech hiring with AI-powered interviews and data-driven insights.
            </p>
          </div>

          {footerColumns.map((column, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4 text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {column.title}
              </h4>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href}
                      className="text-sm text-[#94a3b8] hover:text-[#00D2FF] transition-colors duration-300 inline-block py-1"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[rgba(255,255,255,0.08)] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-sm text-[#94a3b8] mb-4 md:mb-0">
              © 2025 TalentsFlow.ai. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-[#94a3b8] hover:text-[#00D2FF] transition-colors duration-300">
                Privacy
              </a>
              <a href="#" className="text-sm text-[#94a3b8] hover:text-[#00D2FF] transition-colors duration-300">
                Terms
              </a>
              <a href="#" className="text-sm text-[#94a3b8] hover:text-[#00D2FF] transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
