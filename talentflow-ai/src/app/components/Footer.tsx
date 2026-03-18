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
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "API", href: "#" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" }
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Support", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "Case Studies", href: "#" },
      { label: "Community", href: "#" }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="py-12 border-t border-[#E2E8F0] bg-[#F7FFF7]">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#006EB8] flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="text-xl font-bold text-[#2C3E50]">TalentsFlow.ai</span>
            </div>
            <p className="text-[#95A5A6] text-sm">
              Revolutionizing tech hiring with AI-powered interviews and data-driven insights.
            </p>
          </div>

          {/* Links */}
          {footerColumns.map((column, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4 text-[#2C3E50]">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href}
                      className="text-sm text-[#95A5A6] hover:text-[#006EB8] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-[#E2E8F0] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-[#95A5A6]">© 2025 TalentsFlow.ai. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-[#95A5A6] hover:text-[#006EB8] transition-colors">Privacy</a>
              <a href="#" className="text-sm text-[#95A5A6] hover:text-[#006EB8] transition-colors">Terms</a>
              <a href="#" className="text-sm text-[#95A5A6] hover:text-[#006EB8] transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
