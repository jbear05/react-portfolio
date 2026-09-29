import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { useActiveSection } from "../hooks/useActiveSection";
import { Close, Menu, Moon, Sun } from "./Icons";
import "./Navbar.css";

const LINKS = [
  { id: "experience", number: "01", label: "Experience" },
  { id: "work", number: "02", label: "Projects" },
  { id: "about", number: "03", label: "About" },
  { id: "contact", number: "04", label: "Contact" },
];

const SECTION_IDS = ["top", ...LINKS.map((link) => link.id)];

export const Navbar = ({ theme, onToggleTheme }) => {
  const active = useActiveSection(SECTION_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event) => event.key === "Escape" && setMenuOpen(false);
    const desktop = window.matchMedia("(min-width: 760px)");
    const onResize = () => desktop.matches && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [menuOpen]);

  const nextTheme = theme === "dark" ? "paper" : "blueprint";

  return (
    <header className={`nav ${scrolled || menuOpen ? "nav--scrolled" : ""}`}>
      <m.div
        className="nav__inner container"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <a className="nav__brand" href="#top" onClick={() => setMenuOpen(false)}>
          <span className="nav__mark" aria-hidden="true">
            JGF
          </span>
          <span className="nav__name">Jair Garcia Fonseca</span>
        </a>

        <nav aria-label="Primary" className="nav__primary">
          <ul className="nav__links">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="nav__link"
                  aria-current={active === link.id ? "location" : undefined}
                >
                  <span className="nav__num">{link.number}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          <button
            type="button"
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${nextTheme} theme`}
            title={`Switch to ${nextTheme} theme`}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>
          <button
            type="button"
            className="icon-btn nav__menu-btn"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <Close /> : <Menu />}
          </button>
        </div>
      </m.div>

      <AnimatePresence>
        {menuOpen && (
          <m.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="nav__sheet"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="container">
              {LINKS.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} onClick={() => setMenuOpen(false)}>
                    <span className="mono">{link.number}</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
