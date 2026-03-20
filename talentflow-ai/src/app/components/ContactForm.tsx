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
    { value: "1-5", label: "1-5" },
    { value: "6-15", label: "6-15" },
    { value: "16-30", label: "16-30" },
    { value: "30+", label: "30+" }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
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
    } catch {
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
        <div 
          className="rounded-2xl p-8 md:p-12 border border-[rgba(255,255,255,0.08)] shadow-lg"
          style={{ 
            background: "linear-gradient(135deg, rgba(0, 210, 255, 0.1), rgba(124, 58, 237, 0.1))"
          }}
        >
          <div className="text-center">
            <div 
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #00D2FF, #7c3aed)" }}
            >
              <span className="text-3xl">✓</span>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Thank You for Reaching Out!
            </h3>
            
            <p className="text-[#94a3b8] mb-8 leading-relaxed">
              We've received your message and our team will get back to you within 24 hours.
            </p>
            
            <button
              onClick={resetForm}
              className="inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-medium border-2 text-white transition-all duration-300 hover:border-[#00D2FF]"
              style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto" id="contact">
      <div className="text-center mb-12">
        <div 
          className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium mb-6"
          style={{ 
            background: "linear-gradient(135deg, rgba(0, 210, 255, 0.1), rgba(124, 58, 237, 0.1))",
            color: "#00D2FF"
          }}
        >
          <span className="mr-2">📧</span>
          Get in Touch
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Ready to Transform Your Hiring?
        </h2>
        
        <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
          Schedule a personalized demo or ask our team any questions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-2">
            <label 
              htmlFor="name" 
              className="text-sm font-medium text-[#94a3b8] block"
            >
              Full Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => handleFocus('name')}
              onBlur={handleBlur}
              className={`
                w-full bg-[rgba(10,10,10,0.5)] backdrop-blur-sm
                border-2 rounded-xl px-4 py-3
                text-white placeholder-[#64748b]
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-offset-0
                ${errors.name 
                  ? 'border-red-500 focus:ring-red-500/50' 
                  : 'border-[rgba(255,255,255,0.1)] focus:border-[#00D2FF] focus:ring-[#00D2FF]/20 hover:border-[rgba(255,255,255,0.2)]'
                }
              `}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-sm text-red-400 flex items-center mt-1">
                <span className="mr-1">⚠️</span>
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="email" 
              className="text-sm font-medium text-[#94a3b8] block"
            >
              Work Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
              className={`
                w-full bg-[rgba(10,10,10,0.5)] backdrop-blur-sm
                border-2 rounded-xl px-4 py-3
                text-white placeholder-[#64748b]
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-offset-0
                ${errors.email 
                  ? 'border-red-500 focus:ring-red-500/50' 
                  : 'border-[rgba(255,255,255,0.1)] focus:border-[#00D2FF] focus:ring-[#00D2FF]/20 hover:border-[rgba(255,255,255,0.2)]'
                }
              `}
              placeholder="john@company.com"
            />
            {errors.email && (
              <p className="text-sm text-red-400 flex items-center mt-1">
                <span className="mr-1">⚠️</span>
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="company" 
              className="text-sm font-medium text-[#94a3b8] block"
            >
              Company Name *
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              onFocus={() => handleFocus('company')}
              onBlur={handleBlur}
              className={`
                w-full bg-[rgba(10,10,10,0.5)] backdrop-blur-sm
                border-2 rounded-xl px-4 py-3
                text-white placeholder-[#64748b]
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-offset-0
                ${errors.company 
                  ? 'border-red-500 focus:ring-red-500/50' 
                  : 'border-[rgba(255,255,255,0.1)] focus:border-[#00D2FF] focus:ring-[#00D2FF]/20 hover:border-[rgba(255,255,255,0.2)]'
                }
              `}
              placeholder="Acme Inc."
            />
            {errors.company && (
              <p className="text-sm text-red-400 flex items-center mt-1">
                <span className="mr-1">⚠️</span>
                {errors.company}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="role" 
              className="text-sm font-medium text-[#94a3b8] block"
            >
              Your Role
            </label>
            <input
              id="role"
              name="role"
              type="text"
              value={formData.role}
              onChange={handleChange}
              onFocus={() => handleFocus('role')}
              onBlur={handleBlur}
              className={`
                w-full bg-[rgba(10,10,10,0.5)] backdrop-blur-sm
                border-2 border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3
                text-white placeholder-[#64748b]
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-offset-0 focus:border-[#00D2FF] focus:ring-[#00D2FF]/20 hover:border-[rgba(255,255,255,0.2)]
              `}
              placeholder="HR Manager"
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium text-[#94a3b8] block">
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
                  min-h-[48px]
                  ${formData.hiringNeeds === option.value
                    ? 'text-white shadow-lg'
                    : 'text-[#94a3b8] hover:text-white'
                  }
                `}
                style={{
                  background: formData.hiringNeeds === option.value
                    ? "linear-gradient(135deg, #00D2FF, #7c3aed)"
                    : "rgba(10, 10, 10, 0.5)",
                  border: formData.hiringNeeds === option.value
                    ? "none"
                    : "1px solid rgba(255, 255, 255, 0.1)"
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label 
            htmlFor="message" 
            className="text-sm font-medium text-[#94a3b8] block"
          >
            Your Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => handleFocus('message')}
            onBlur={handleBlur}
            rows={4}
            className={`
              w-full bg-[rgba(10,10,10,0.5)] backdrop-blur-sm
              border-2 rounded-xl px-4 py-3
              text-white placeholder-[#64748b]
              transition-all duration-300
              resize-none
              focus:outline-none focus:ring-2 focus:ring-offset-0
              ${errors.message 
                ? 'border-red-500 focus:ring-red-500/50' 
                : 'border-[rgba(255,255,255,0.1)] focus:border-[#00D2FF] focus:ring-[#00D2FF]/20 hover:border-[rgba(255,255,255,0.2)]'
              }
            `}
            placeholder="Tell us about your hiring challenges..."
          />
          {errors.message && (
            <p className="text-sm text-red-400 flex items-center mt-1">
              <span className="mr-1">⚠️</span>
              {errors.message}
            </p>
          )}
          <div className="text-right">
            <span className="text-xs text-[#64748b]">
              {formData.message.length}/500 characters
            </span>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full md:w-auto md:inline-flex items-center justify-center
              rounded-full px-10 py-4
              text-base font-medium text-white
              transition-all duration-500
              disabled:opacity-70 disabled:cursor-not-allowed
              min-h-[52px]
              shadow-lg hover:shadow-xl
              ${isSubmitting 
                ? 'opacity-70' 
                : 'hover:-translate-y-1 hover:scale-105'
              }
            `}
            style={{
              background: "linear-gradient(135deg, #00D2FF, #7c3aed)"
            }}
          >
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
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </>
            )}
          </button>

          {errors.submit && (
            <p className="mt-4 text-sm text-red-400 text-center">
              {errors.submit}
            </p>
          )}

          <p className="mt-6 text-center text-sm text-[#64748b]">
            By submitting, you agree to our{" "}
            <a href="#" className="text-[#00D2FF] hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </form>

      <div className="mt-16 pt-12 border-t border-[rgba(255,255,255,0.08)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-3">
            <div 
              className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, rgba(0, 210, 255, 0.1), rgba(124, 58, 237, 0.1))" }}
            >
              <span className="text-xl">📞</span>
            </div>
            <div className="text-lg font-medium text-white">Call Us</div>
            <div className="text-[#94a3b8]">+1 (555) 123-4567</div>
          </div>
          
          <div className="space-y-3">
            <div 
              className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, rgba(0, 210, 255, 0.1), rgba(124, 58, 237, 0.1))" }}
            >
              <span className="text-xl">✉️</span>
            </div>
            <div className="text-lg font-medium text-white">Email Us</div>
            <div className="text-[#94a3b8]">hello@talentsflow.ai</div>
          </div>
          
          <div className="space-y-3">
            <div 
              className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, rgba(0, 210, 255, 0.1), rgba(124, 58, 237, 0.1))" }}
            >
              <span className="text-xl">💬</span>
            </div>
            <div className="text-lg font-medium text-white">Live Chat</div>
            <div className="text-[#94a3b8]">Available 9AM-6PM EST</div>
          </div>
        </div>
      </div>
    </div>
  );
}
