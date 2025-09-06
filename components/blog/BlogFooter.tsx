"use client";
import Link from "next/link";
import { FaEnvelope, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const pageGroups = [
    {
      title: "Main",
      links: [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/services", label: "Services" },
        { href: "/projects", label: "Projects" },
      ],
    },
    {
      title: "Extras",
      links: [
        { href: "/guestbook", label: "Guestbook" },
        { href: "/links", label: "Links" },
        { href: "/attributions", label: "Attribution" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-[#002919] to-[#001a10] relative border-t border-emerald-500/10 text-white py-12 px-4 md:px-8 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-emerald-400/5 rounded-full"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Background Name */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] overflow-hidden">
        <motion.p
          className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-bold whitespace-nowrap text-emerald-400"
          animate={{ rotate: [-6, 0, -6] }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          Ishimwe Jean Baptiste
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <motion.p
              className="text-2xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Where{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                aesthetics
              </span>{" "}
              & <span className="text-emerald-400">functionality</span> meet
            </motion.p>

            <motion.div
              className="flex gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {[
                { icon: FaGithub, href: "https://github.com", label: "Github" },
                {
                  icon: FaXTwitter,
                  href: "https://twitter.com",
                  label: "Twitter / X",
                },
                {
                  icon: FaLinkedin,
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-white/80 hover:text-emerald-400 transition-colors transform hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-6 h-6" />
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </motion.div>
          </div>

          {/* Navigation Links */}
          <nav className="col-span-2 grid  sm:grid-cols-3 gap-8">
            {pageGroups.map((group, groupIndex) => (
              <ul key={group.title} className="space-y-2 ">
                <motion.p
                  className="text-lg  font-semibold text-emerald-400"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + groupIndex * 0.1 }}
                >
                  {group.title}
                </motion.p>
                {group.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + groupIndex * 0.1 + linkIndex * 0.05,
                    }}
                  >
                    <Link
                      href={link.href}
                      className="text-white/80 hover:text-emerald-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            ))}

            {/* Contact & Social */}
            <motion.div
              className=""
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p className="text-white/80 mb-2">
                Feel free to reach out to me for any inquiries or collaboration
                opportunities.
              </p>
              <a
                href="mailto:ijbapte@gmail.com"
                className="text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-2  font-semibold"
              >
                <FaEnvelope className="w-5 h-5" />
                ijbapte@gmail.com
              </a>
            </motion.div>
          </nav>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-emerald-500/10 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-white/60 text-sm">
            &copy; {currentYear} hbapte. All rights Reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/terms"
              className="text-white/60 hover:text-emerald-400 text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-white/60 hover:text-emerald-400 text-sm transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
