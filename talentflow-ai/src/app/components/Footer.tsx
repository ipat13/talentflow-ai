import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-[#E2E8F0] bg-[#F7FFF7]">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#006EB8] flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="text-xl font-bold text-[#2C3E50] font-poppins">TalentsFlow.ai</span>
            </div>
            <p className="text-[#95A5A6] text-sm">
              Revolutionizing tech hiring with AI-powered interviews and data-driven insights.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#2C3E50] font-poppins">Product</h4>
            <ul className="space-y-2 text-[#95A5A6]">
              <li className="hover:text-[#006EB8] transition-colors cursor-pointer">Features</li>
              <li className="hover:text-[#006EB8] transition-colors cursor-pointer">Pricing</li>
              <li className="hover:text-[#006EB8] transition-colors cursor-pointer">FAQ</li>
              <li className="hover:text-[#006EB8] transition-colors cursor-pointer">API</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#2C3E50] font-poppins">Company</h4>
            <ul className="space-y-2 text-[#95A5A6]">
              <li className="hover:text-[#006EB8] transition-colors cursor-pointer">About</li>
              <li className="hover:text-[#006EB8] transition-colors cursor-pointer">Blog</li>
              <li className="hover:text-[#006EB8] transition-colors cursor-pointer">Careers</li>
              <li className="hover:text-[#006EB8] transition-colors cursor-pointer">Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#2C3E50] font-poppins">Resources</h4>
            <ul className="space-y-2 text-[#95A5A6]">
              <li className="hover:text-[#006EB8] transition-colors cursor-pointer">Support</li>
              <li className="hover:text-[#006EB8] transition-colors cursor-pointer">Documentation</li>
              <li className="hover:text-[#006EB8] transition-colors cursor-pointer">Case Studies</li>
              <li className="hover:text-[#006EB8] transition-colors cursor-pointer">Community</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#95A5A630] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#95A5A6] text-sm">© 2025 TalentsFlow.ai. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-[#95A5A6] text-sm">
              <span className="hover:text-[#006EB8] transition-colors cursor-pointer">Privacy</span>
              <span className="hover:text-[#006EB8] transition-colors cursor-pointer">Terms</span>
              <span className="hover:text-[#006EB8] transition-colors cursor-pointer">Cookie Policy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;