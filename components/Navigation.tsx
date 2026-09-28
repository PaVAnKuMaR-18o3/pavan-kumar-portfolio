"use client";

import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { profile } from "@/lib/data";

const links = [
  ["Work", "#work"],
  ["Systems", "#systems"],
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Education", "#education"],
  ["Contact", "#contact"],
] as const;

export default function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-nav">
      <nav className="container-grid nav-inner">
        <a href="#top" className="brand"><span className="brand-mark">PK</span><span>PAVAN KUMAR B P</span></a>
        <div className="nav-links">
          {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          <a href={profile.resume} className="resume-link">Resume <ArrowUpRight size={12} /></a>
        </div>
        <button className="mobile-menu-button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={18} /> : <Menu size={18} />}</button>
      </nav>
      {open && <div className="mobile-nav"><div className="container-grid">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}<a href={profile.resume}>Resume</a></div></div>}
    </header>
  );
}
