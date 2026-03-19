"use client";

import { useState, FormEvent, ChangeEvent } from "react";

type FormData = {
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
  hiringNeeds: string;
};

type FormErrors = Partial<Record<keyof FormData | "submit", string>>;

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    role: "",
    message: "",
    hiringNeeds: "1-5"
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<keyof FormData | null>(null);

  const hiringOptions = [
    { value: "1-5", label: "1-5 hires per month" },
    { value: "6-15", label: "6-15 hires per month" },
    { value: "16-30", label: "16-30 hires per month" },
    { value: "30+", label: "30+ hires per month" }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFocus = (fieldName: keyof FormData) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // For production, replace YOUR_FORMSPREE_ID with your actual Formspree ID
      // Register at https://formspree.io to get your free endpoint
      const formspreeEndpoint = "https://formspree.io/f/YOUR_FORMSPREE_ID";
      
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          role: formData.role,
          message: formData.message,
          hiringNeeds: formData.hiringNeeds,
        }),
      });

      if (response.ok) {
        console.log("Form submitted successfully:", formData);
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          role: "",
          message: "",
          hiringNeeds: "1-5"
        });
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({ submit: "Failed to submit form. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setErrors({});
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-[#112240] to-[#0A192F] rounded-2xl p-8 md:p-12 border border-[#233554] shadow-lg">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00D2FF]/10 to-[#64DFFF]/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">✅</span>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">
              Thank You for Reaching Out!
            </h3>
            
            <p className="text-[#8892B0] mb-8 leading-relaxed">
              We've received your message and our team will get back to you within 24 hours. 
              In the meantime, feel free to explore our platform features.
            </p>
            
            <button
              onClick={resetForm}
              className="inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-medium border-2 border-[#233554] text-white hover:border-[#00D2FF] hover:text-[#00D2FF] transition-all duration-300"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header do Formulário */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-gradient-to-r from-[#00D2FF]/10 to-[#64DFFF]/10 text-[#00D2FF] mb-6">
          <span className="mr-2">📧</span>
          Get in Touch
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Ready to Transform Your Hiring?
        </h2>
        
        <p className="text-lg text-[#8892B0] max-w-2xl mx-auto">
          Schedule a personalized demo or ask our team any questions about 
          how TalentsFlow.ai can streamline your tech hiring process.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Grid de Campos Principais */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Campo Nome */}
          <div className="space-y-2">
            <label 
              htmlFor="name" 
              className={`text-sm font-medium transition-all duration-300 ${
                focusedField === 'name' || formData.name 
                  ? 'text-[#00D2FF]' 
                  : 'text-[#8892B0]'
              }`}
            >
              Full Name *
            </label>
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                className={`
                  w-full bg-transparent pb-3
                  border-b-2 transition-all duration-300
                  focus:outline-none text-white
                  ${errors.name 
                    ? 'border-red-400 text-red-400' 
                    : focusedField === 'name' || formData.name
                      ? 'border-[#00D2FF] text-white'
                      : 'border-[#233554] text-[#8892B0] hover:border-[#8892B0]'
                  }
                `}
                placeholder="Enter your full name"
              />
              {/* Linha Animada */}
              <div className={`
                absolute bottom-0 left-0 right-0 h-0.5
                bg-gradient-to-r from-[#00D2FF] to-[#64DFFF]
                transition-transform duration-300
                ${focusedField === 'name' ? 'scale-x-100' : 'scale-x-0'}
              `} />
            </div>
            {errors.name && (
              <p className="text-sm text-red-500 flex items-center">
                <span className="mr-1">⚠️</span>
                {errors.name}
              </p>
            )}
          </div>

          {/* Campo Email */}
          <div className="space-y-2">
            <label 
              htmlFor="email" 
              className={`text-sm font-medium transition-all duration-300 ${
                focusedField === 'email' || formData.email 
                  ? 'text-[#006EB8]' 
                  : 'text-[#95A5A6]'
              }`}
            >
              Work Email *
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                className={`
                  w-full bg-transparent pb-3
                  border-b-2 transition-all duration-300
                  focus:outline-none
                  ${errors.email 
                    ? 'border-red-400 text-red-600' 
                    : focusedField === 'email' || formData.email
                      ? 'border-[#006EB8] text-[#2C3E50]'
                      : 'border-[#E2E8F0] text-[#95A5A6] hover:border-[#95A5A6]'
                  }
                `}
                placeholder="name@company.com"
              />
              <div className={`
                absolute bottom-0 left-0 right-0 h-0.5
                bg-gradient-to-r from-[#006EB8] to-[#4ECDC4]
                transition-transform duration-300
                ${focusedField === 'email' ? 'scale-x-100' : 'scale-x-0'}
              `} />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 flex items-center">
                <span className="mr-1">⚠️</span>
                {errors.email}
              </p>
            )}
          </div>

          {/* Campo Empresa */}
          <div className="space-y-2">
            <label 
              htmlFor="company" 
              className={`text-sm font-medium transition-all duration-300 ${
                focusedField === 'company' || formData.company 
                  ? 'text-[#006EB8]' 
                  : 'text-[#95A5A6]'
              }`}
            >
              Company Name *
            </label>
            <div className="relative">
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                onFocus={() => handleFocus('company')}
                onBlur={handleBlur}
                className={`
                  w-full bg-transparent pb-3
                  border-b-2 transition-all duration-300
                  focus:outline-none
                  ${errors.company 
                    ? 'border-red-400 text-red-600' 
                    : focusedField === 'company' || formData.company
                      ? 'border-[#006EB8] text-[#2C3E50]'
                      : 'border-[#E2E8F0] text-[#95A5A6] hover:border-[#95A5A6]'
                  }
                `}
                placeholder="Your company name"
              />
              <div className={`
                absolute bottom-0 left-0 right-0 h-0.5
                bg-gradient-to-r from-[#006EB8] to-[#4ECDC4]
                transition-transform duration-300
                ${focusedField === 'company' ? 'scale-x-100' : 'scale-x-0'}
              `} />
            </div>
            {errors.company && (
              <p className="text-sm text-red-500 flex items-center">
                <span className="mr-1">⚠️</span>
                {errors.company}
              </p>
            )}
          </div>

          {/* Campo Cargo */}
          <div className="space-y-2">
            <label 
              htmlFor="role" 
              className={`text-sm font-medium transition-all duration-300 ${
                focusedField === 'role' || formData.role 
                  ? 'text-[#006EB8]' 
                  : 'text-[#95A5A6]'
              }`}
            >
              Your Role
            </label>
            <div className="relative">
              <input
                id="role"
                name="role"
                type="text"
                value={formData.role}
                onChange={handleChange}
                onFocus={() => handleFocus('role')}
                onBlur={handleBlur}
                className={`
                  w-full bg-transparent pb-3
                  border-b-2 transition-all duration-300
                  focus:outline-none
                  ${focusedField === 'role' || formData.role
                    ? 'border-[#006EB8] text-[#2C3E50]'
                    : 'border-[#E2E8F0] text-[#95A5A6] hover:border-[#95A5A6]'
                  }
                `}
                placeholder="e.g., HR Manager, Tech Lead"
              />
              <div className={`
                absolute bottom-0 left-0 right-0 h-0.5
                bg-gradient-to-r from-[#006EB8] to-[#4ECDC4]
                transition-transform duration-300
                ${focusedField === 'role' ? 'scale-x-100' : 'scale-x-0'}
              `} />
            </div>
          </div>
        </div>

        {/* Campo Hiring Needs - Estilo Alternativo */}
        <div className="space-y-4">
          <label className="text-sm font-medium text-[#95A5A6]">
            Monthly Hiring Needs
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {hiringOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, hiringNeeds: option.value }))}
                className={`
                  py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300
                  ${formData.hiringNeeds === option.value
                    ? 'bg-gradient-to-r from-[#006EB8]/10 to-[#4ECDC4]/10 border border-[#006EB8]/30 text-[#006EB8]'
                    : 'bg-white border border-[#E2E8F0] text-[#95A5A6] hover:border-[#95A5A6]'
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Campo Mensagem */}
        <div className="space-y-2">
          <label 
            htmlFor="message" 
            className={`text-sm font-medium transition-all duration-300 ${
              focusedField === 'message' || formData.message 
                ? 'text-[#006EB8]' 
                : 'text-[#95A5A6]'
            }`}
          >
            Your Message *
          </label>
          <div className="relative">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => handleFocus('message')}
              onBlur={handleBlur}
              rows={4}
              className={`
                w-full bg-transparent pb-3
                border-b-2 transition-all duration-300 resize-none
                focus:outline-none
                ${errors.message 
                  ? 'border-red-400 text-red-600' 
                  : focusedField === 'message' || formData.message
                    ? 'border-[#006EB8] text-[#2C3E50]'
                    : 'border-[#E2E8F0] text-[#95A5A6] hover:border-[#95A5A6]'
                }
              `}
              placeholder="Tell us about your hiring challenges and how we can help..."
            />
            <div className={`
              absolute bottom-0 left-0 right-0 h-0.5
              bg-gradient-to-r from-[#006EB8] to-[#4ECDC4]
              transition-transform duration-300
              ${focusedField === 'message' ? 'scale-x-100' : 'scale-x-0'}
            `} />
          </div>
          {errors.message && (
            <p className="text-sm text-red-500 flex items-center">
              <span className="mr-1">⚠️</span>
              {errors.message}
            </p>
          )}
          <div className="text-right">
            <span className={`text-xs ${
              formData.message.length > 10 ? 'text-green-500' : 'text-[#95A5A6]'
            }`}>
              {formData.message.length}/500 characters
            </span>
          </div>
        </div>

        {/* Botão de Submissão com Gradiente */}
        <div className="pt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              relative w-full md:w-auto
              inline-flex items-center justify-center
              rounded-full px-10 py-4
              text-base font-medium text-white
              transition-all duration-500
              overflow-hidden
              disabled:opacity-70 disabled:cursor-not-allowed
              ${isSubmitting 
                ? 'bg-gradient-to-r from-[#006EB8] to-[#4ECDC4]' 
                : 'bg-gradient-to-r from-[#006EB8] via-[#45B7D1] to-[#4ECDC4] hover:shadow-2xl hover:-translate-y-1'
              }
              shadow-lg
            `}
          >
            {/* Efeito de Brilho no Hover */}
            <div className="
              absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0
              -translate-x-full group-hover:translate-x-full
              transition-transform duration-1000
            " />
            
            {/* Conteúdo do Botão */}
            <span className="relative flex items-center">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </>
              )}
            </span>
          </button>

          {errors.submit && (
            <p className="mt-4 text-sm text-red-500 text-center">
              {errors.submit}
            </p>
          )}

          {/* Texto de Ajuda */}
          <p className="mt-6 text-center text-sm text-[#95A5A6]">
            By submitting this form, you agree to our{" "}
            <a href="#" className="text-[#006EB8] hover:underline">Privacy Policy</a>. 
            We'll get back to you within 24 hours.
          </p>
        </div>
      </form>

      {/* Informações de Contacto Alternativas */}
      <div className="mt-16 pt-12 border-t border-[#E2E8F0]">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#006EB8]/10 to-[#45B7D1]/10 flex items-center justify-center mx-auto">
              <span className="text-xl">📞</span>
            </div>
            <div className="text-lg font-medium text-[#2C3E50]">Call Us</div>
            <div className="text-[#95A5A6]">+1 (555) 123-4567</div>
          </div>
          
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#45B7D1]/10 to-[#4ECDC4]/10 flex items-center justify-center mx-auto">
              <span className="text-xl">✉️</span>
            </div>
            <div className="text-lg font-medium text-[#2C3E50]">Email Us</div>
            <div className="text-[#95A5A6]">hello@talentsflow.ai</div>
          </div>
          
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4ECDC4]/10 to-[#006EB8]/10 flex items-center justify-center mx-auto">
              <span className="text-xl">💬</span>
            </div>
            <div className="text-lg font-medium text-[#2C3E50]">Live Chat</div>
            <div className="text-[#95A5A6]">Available 9AM-6PM EST</div>
          </div>
        </div>
      </div>
    </div>
  );
}