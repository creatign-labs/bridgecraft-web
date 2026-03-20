'use client';

import { useState, type FormEvent } from 'react';
import PageHero from '@/components/layout/PageHero';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { companyInfo } from '@/lib/seed-data';

// Note: metadata cannot be exported from "use client" pages.
// To add metadata, create a layout.tsx in this directory.

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialFormState: FormState = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Replace with actual form submission logic
    console.log('Contact form submitted:', form);
    setSubmitted(true);
    setForm(initialFormState);
  };

  const contactDetails = [
    {
      icon: MapPin,
      label: 'Office Address',
      value: companyInfo.address,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: companyInfo.phone,
      href: `tel:${companyInfo.phone.replace(/\s/g, '')}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: companyInfo.email,
      href: `mailto:${companyInfo.email}`,
    },
  ];

  const inputClasses =
    'block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary';

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We would love to hear about your project"
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <h2 className="font-heading text-2xl font-bold text-charcoal">
                  Send Us a Message
                </h2>
                <div className="mt-2 h-1 w-12 rounded-full bg-primary" />

                {submitted ? (
                  <div className="mt-8 rounded-lg bg-primary/10 p-8 text-center">
                    <p className="font-heading text-lg font-semibold text-primary-dark">
                      Thank you for reaching out!
                    </p>
                    <p className="mt-2 text-sm text-charcoal/70">
                      We have received your message and will get back to you
                      within 1-2 business days.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 text-sm font-medium text-primary-dark hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-1.5 block text-sm font-medium text-charcoal"
                        >
                          Full Name <span className="text-accent-coral">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-1.5 block text-sm font-medium text-charcoal"
                        >
                          Email Address <span className="text-accent-coral">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@company.com"
                          className={inputClasses}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="phone"
                          className="mb-1.5 block text-sm font-medium text-charcoal"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="subject"
                          className="mb-1.5 block text-sm font-medium text-charcoal"
                        >
                          Subject <span className="text-accent-coral">*</span>
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          required
                          value={form.subject}
                          onChange={handleChange}
                          placeholder="Project enquiry"
                          className={inputClasses}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-1.5 block text-sm font-medium text-charcoal"
                      >
                        Message <span className="text-accent-coral">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project..."
                        className={inputClasses}
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-accent-coral px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-coral/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <Send className="h-4 w-4" />
                      Send Message
                    </button>
                  </form>
                )}
              </AnimatedSection>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2">
              <AnimatedSection delay={0.15}>
                <h2 className="font-heading text-2xl font-bold text-charcoal">
                  Get in Touch
                </h2>
                <div className="mt-2 h-1 w-12 rounded-full bg-primary" />

                <div className="mt-8 space-y-6">
                  {contactDetails.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary-dark" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/50">
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            className="mt-0.5 text-sm text-charcoal hover:text-primary-dark transition-colors"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="mt-0.5 text-sm text-charcoal">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map placeholder */}
                <div className="mt-8 h-64 rounded-lg bg-off-white flex items-center justify-center border border-gray-200">
                  <div className="text-center">
                    <MapPin className="mx-auto h-8 w-8 text-charcoal/30" />
                    <p className="mt-2 text-sm text-charcoal/40">
                      Google Maps embed
                    </p>
                    <p className="text-xs text-charcoal/30">
                      HITEC City, Hyderabad
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
