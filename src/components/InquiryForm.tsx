"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function InquiryForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const data = {
      companyName: formData.get("companyName") as string,
      contactName: formData.get("contactName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      country: formData.get("country") as string,
      inquiryType: formData.get("inquiryType") as string,
      productInterest: formData.get("productInterest") as string,
      estimatedQuantity: formData.get("estimatedQuantity") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to submit");
      }

      setFormState("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <section id="inquire" className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-emerald-600" />
          </div>
          <h2 className="text-3xl font-black text-charcoal-900 mb-4">
            Inquiry Submitted Successfully
          </h2>
          <p className="text-charcoal-500 text-lg mb-8">
            Thank you for your interest. Our export team will respond within 24
            business hours with a detailed quote and sample timeline.
          </p>
          <button
            onClick={() => setFormState("idle")}
            className="px-8 py-3 bg-indus-600 text-white rounded-lg font-bold hover:bg-indus-700 transition-colors"
          >
            Submit Another Inquiry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="inquire" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left info panel */}
          <div className="lg:col-span-2">
            <span className="inline-block px-4 py-1.5 bg-indus-100 text-indus-700 rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
              Get Started
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-charcoal-900 tracking-tight mb-4">
              Request a
              <br />
              <span className="text-indus-600">Digital Sample</span>
            </h2>
            <p className="text-charcoal-500 mb-8 leading-relaxed">
              Fill out the form to receive a digital knit sample, spec sheet, or
              custom quote. Our export team typically responds within 24 business
              hours.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-gold-600 font-bold text-sm">01</span>
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-900 text-sm">
                    Submit Your Requirements
                  </h4>
                  <p className="text-sm text-charcoal-500">
                    Tell us about your product needs, quantities, and timeline.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-gold-600 font-bold text-sm">02</span>
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-900 text-sm">
                    Receive Digital Sample
                  </h4>
                  <p className="text-sm text-charcoal-500">
                    We&apos;ll send a digital knit-count render within 7 days.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-gold-600 font-bold text-sm">03</span>
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-900 text-sm">
                    Approve &amp; Produce
                  </h4>
                  <p className="text-sm text-charcoal-500">
                    Approve the sample and we begin production — 20-30 days FOB.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-charcoal-50 border border-charcoal-100 rounded-2xl p-8"
            >
              {formState === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
                  <AlertCircle size={20} />
                  <span className="text-sm font-medium">{errorMsg}</span>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-charcoal-700 mb-1.5">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indus-400 focus:border-transparent transition-shadow"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal-700 mb-1.5">
                    Contact Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    required
                    className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indus-400 focus:border-transparent transition-shadow"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal-700 mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indus-400 focus:border-transparent transition-shadow"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal-700 mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indus-400 focus:border-transparent transition-shadow"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal-700 mb-1.5">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indus-400 focus:border-transparent transition-shadow"
                    placeholder="United States"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal-700 mb-1.5">
                    Inquiry Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="inquiryType"
                    required
                    className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indus-400 focus:border-transparent transition-shadow"
                  >
                    <option value="">Select type...</option>
                    <option value="digital_sample">Request Digital Sample</option>
                    <option value="spec_sheet">Download Spec Sheet</option>
                    <option value="quote">Get a Quote</option>
                    <option value="custom_order">Custom Order</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal-700 mb-1.5">
                    Product Interest
                  </label>
                  <select
                    name="productInterest"
                    className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indus-400 focus:border-transparent transition-shadow"
                  >
                    <option value="">Select category...</option>
                    <option value="crew_ankle">Crew & Ankle Socks</option>
                    <option value="sports_compression">
                      Sports & Compression
                    </option>
                    <option value="dress">Dress Socks</option>
                    <option value="kids_infant">Kids & Infant Socks</option>
                    <option value="wool_bamboo">Wool & Bamboo Blends</option>
                    <option value="custom_jacquard">
                      Custom Jacquard Branding
                    </option>
                    <option value="multiple">Multiple Categories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal-700 mb-1.5">
                    Estimated Quantity
                  </label>
                  <select
                    name="estimatedQuantity"
                    className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indus-400 focus:border-transparent transition-shadow"
                  >
                    <option value="">Select range...</option>
                    <option value="3000-5000">3,000 – 5,000 pairs</option>
                    <option value="5000-10000">5,000 – 10,000 pairs</option>
                    <option value="10000-25000">10,000 – 25,000 pairs</option>
                    <option value="25000-50000">25,000 – 50,000 pairs</option>
                    <option value="50000+">50,000+ pairs</option>
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-semibold text-charcoal-700 mb-1.5">
                  Message / Additional Details
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indus-400 focus:border-transparent transition-shadow resize-none"
                  placeholder="Tell us about your project, specific requirements, yarn preferences, or any custom needs..."
                />
              </div>

              <button
                type="submit"
                disabled={formState === "submitting"}
                className="mt-6 w-full sm:w-auto px-10 py-4 bg-indus-600 text-white rounded-xl font-bold text-base hover:bg-indus-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-indus-600/20"
              >
                {formState === "submitting" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Inquiry
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
