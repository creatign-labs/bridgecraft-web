'use client';

import { useState, type FormEvent } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { MapPin, Phone, Mail, Send, Loader2 } from 'lucide-react';

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

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

export default function ContactClient({
  contactInfo,
}: {
  contactInfo: ContactInfo;
}) {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'Something went wrong. Please try again.');
      }

      setStatus('success');
      setForm(initialFormState);
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      );
    }
  };

  const contactDetails = [
    {
      icon: MapPin,
      label: 'Office Address',
      value: contactInfo.address,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone.replace(/\s/g, '')}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    },
  ];

  const inputClasses =
    'w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#7bfbfc] focus:border-transparent outline-none transition text-sm text-charcoal placeholder:text-charcoal/40';

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Contact Form — 60% */}
          <div className="lg:col-span-3">
            <AnimatedSection>
              <h2 className="font-heading text-2xl font-bold text-charcoal">
                Send Us a Message
              </h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-primary" />

              {/* Success banner */}
              {status === 'success' && (
                <div className="mt-8 rounded-lg bg-green-50 border border-green-200 p-6 text-center">
                  <p className="font-heading text-lg font-semibold text-green-800">
                    Thank you! We&apos;ll get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-3 text-sm font-medium text-green-700 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              )}

              {/* Error banner */}
              {status === 'error' && (
                <div className="mt-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3">
                  <p className="text-sm text-red-800">
                    {errorMessage || 'Something went wrong. Please try again.'}
                  </p>
                </div>
              )}

              {status !== 'success' && (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1 block text-sm font-medium text-charcoal"
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
                        className="mb-1 block text-sm font-medium text-charcoal"
                      >
                        Email Address{' '}
                        <span className="text-accent-coral">*</span>
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
                        className="mb-1 block text-sm font-medium text-charcoal"
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
                        className="mb-1 block text-sm font-medium text-charcoal"
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
                      className="mb-1 block text-sm font-medium text-charcoal"
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
                      className={`${inputClasses} min-h-[150px]`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="inline-flex items-center justify-center gap-2 bg-[#eb8380] text-white px-8 py-3 rounded-lg hover:bg-[#d66e6b] transition font-heading font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatedSection>
          </div>

          {/* Contact Info Sidebar — 40% */}
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

              {/* Google Maps placeholder */}
              <div className="mt-8 overflow-hidden rounded-lg border border-gray-200">
                <iframe
                  title="Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2!2d78.3816!3d17.4435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI2JzM2LjYiTiA3OMKwMjInNTMuOCJF!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="256"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="bg-off-white"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
