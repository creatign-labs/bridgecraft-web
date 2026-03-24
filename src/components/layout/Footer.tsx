import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const SERVICES_LINKS = [
  { label: "Structural Engineering", href: "/services/structural-engineering" },
  { label: "Bridge Engineering", href: "/services/bridge-engineering" },
  {
    label: "Transportation Engineering",
    href: "/services/transportation-engineering",
  },
  {
    label: "Project Management",
    href: "/services/project-management-consultancy",
  },
];

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about/introduction" },
  { label: "Projects", href: "/projects" },
  { label: "Sectors", href: "/sectors" },
  { label: "Clients", href: "/clients" },
  { label: "Careers", href: "/careers" },
  { label: "Brochure", href: "/brochure" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block">
              <span className="font-heading text-2xl font-bold text-primary">
                BridgeCraft
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Engineering excellence that builds lasting infrastructure.
              BridgeCraft Engineers delivers innovative structural, geotechnical,
              and geophysical engineering solutions across the globe.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white">
              Services
            </h3>
            <div className="mt-1 mb-4 h-1 w-10 rounded-full bg-primary" />
            <ul className="space-y-2.5">
              {SERVICES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white">
              Quick Links
            </h3>
            <div className="mt-1 mb-4 h-1 w-10 rounded-full bg-primary" />
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white">
              Contact Info
            </h3>
            <div className="mt-1 mb-4 h-1 w-10 rounded-full bg-primary" />
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-white/70">
                  4th Floor, Meridian Tower,
                  <br />
                  HITEC City, Hyderabad 500081, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <a
                  href="tel:+914023123456"
                  className="text-sm text-white/70 transition-colors hover:text-primary"
                >
                  +91 40 2312 3456
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <a
                  href="mailto:info@bridgecraft.in"
                  className="text-sm text-white/70 transition-colors hover:text-primary"
                >
                  info@bridgecraft.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-white/50">
            &copy; {currentYear} BridgeCraft Engineers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
