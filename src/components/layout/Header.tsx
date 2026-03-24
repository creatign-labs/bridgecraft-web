"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "HOME", href: "/" },
  {
    label: "ABOUT US",
    href: "/about",
    dropdown: [
      { label: "Introduction", href: "/about/introduction" },
      { label: "Our Vision & Values", href: "/about/vision-values" },
      { label: "Mission Statement", href: "/about/mission-statement" },
      { label: "Corporate Strategy", href: "/about/corporate-strategy" },
      { label: "Team", href: "/about/team" },
    ],
  },
  {
    label: "SERVICES",
    href: "/services",
    dropdown: [
      {
        label: "Structural Engineering",
        href: "/services/structural-engineering",
      },
      {
        label: "Bridge Engineering",
        href: "/services/bridge-engineering",
      },
      {
        label: "Transportation Engineering",
        href: "/services/transportation-engineering",
      },
      {
        label: "Project Management Consultancy",
        href: "/services/project-management-consultancy",
      },
    ],
  },
  { label: "PROJECTS", href: "/projects" },
  { label: "SECTORS", href: "/sectors" },
  { label: "CLIENTS", href: "/clients" },
  {
    label: "CAREERS",
    href: "/careers",
    dropdown: [{ label: "Current Openings", href: "/careers" }],
  },
  { label: "BROCHURE", href: "/brochure" },
];

function DesktopDropdown({
  items,
  isOpen,
  pathname,
}: {
  items: DropdownItem[];
  isOpen: boolean;
  pathname: string;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 top-full mt-1 min-w-[240px] rounded-lg bg-white py-2 shadow-lg"
        >
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 font-body text-sm transition-colors hover:bg-[#F8F9FA] ${
                  isActive ? "text-[#4ecbcc]" : "text-[#333333]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface HeaderProps {
  logoUrl?: string | null;
}

export default function Header({ logoUrl }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(
    null
  );
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleMouseEnter = (label: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const toggleMobileExpanded = (label: string) => {
    setMobileExpandedItem((prev) => (prev === label ? null : label));
  };

  const isNavActive = (item: NavItem): boolean => {
    if (item.href === "/") return pathname === "/";
    return pathname.startsWith(item.href);
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt="BridgeCraft"
              width={160}
              height={40}
              className="h-10 w-auto"
              priority
            />
          ) : (
            <span
              className={`font-heading text-2xl font-bold transition-colors duration-300 ${
                scrolled ? "text-primary-dark" : "text-primary"
              }`}
            >
              BridgeCraft
            </span>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = isNavActive(item);
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.dropdown ? handleMouseEnter(item.label) : undefined
                }
                onMouseLeave={item.dropdown ? handleMouseLeave : undefined}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 rounded-md px-3 py-2 font-body text-sm font-medium transition-colors ${
                    active
                      ? "text-[#4ecbcc]"
                      : scrolled
                        ? "text-[#333333] hover:text-[#4ecbcc]"
                        : "text-white hover:text-primary"
                  }`}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="h-3.5 w-3.5" />}
                </Link>

                {item.dropdown && (
                  <DesktopDropdown
                    items={item.dropdown}
                    isOpen={openDropdown === item.label}
                    pathname={pathname}
                  />
                )}
              </div>
            );
          })}

          <Link
            href="/contact"
            className="ml-3 rounded-md bg-[#eb8380] px-5 py-2 font-body text-sm font-semibold text-white transition-colors hover:bg-[#d66e6b]"
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden ${scrolled ? "text-charcoal" : "text-white"}`}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-0 z-40 bg-black/40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed bottom-0 right-0 top-0 z-50 w-80 overflow-y-auto bg-white p-6 shadow-xl lg:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-heading text-xl font-bold text-primary-dark">
                  BridgeCraft
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 text-charcoal" />
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => {
                  const active = isNavActive(item);
                  return (
                    <div key={item.label}>
                      {item.dropdown ? (
                        <>
                          <button
                            onClick={() => toggleMobileExpanded(item.label)}
                            className={`flex w-full items-center justify-between rounded-md px-3 py-3 font-body text-sm font-medium transition-colors hover:bg-[#F8F9FA] ${
                              active ? "text-[#4ecbcc]" : "text-[#333333]"
                            }`}
                          >
                            {item.label}
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${
                                mobileExpandedItem === item.label
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </button>
                          <AnimatePresence>
                            {mobileExpandedItem === item.label && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="ml-4 border-l-2 border-primary/30 pl-3">
                                  {item.dropdown.map((sub) => {
                                    const subActive = pathname === sub.href;
                                    return (
                                      <Link
                                        key={sub.href}
                                        href={sub.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`block py-2 font-body text-sm transition-colors hover:text-[#4ecbcc] ${
                                          subActive
                                            ? "text-[#4ecbcc]"
                                            : "text-[#333333]/80"
                                        }`}
                                      >
                                        {sub.label}
                                      </Link>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`block rounded-md px-3 py-3 font-body text-sm font-medium transition-colors hover:bg-[#F8F9FA] ${
                            active ? "text-[#4ecbcc]" : "text-[#333333]"
                          }`}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  );
                })}

                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 block w-full rounded-md bg-[#eb8380] px-5 py-3 text-center font-body text-sm font-semibold text-white transition-colors hover:bg-[#d66e6b]"
                >
                  Contact Us
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
