"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronRight,
  CircleDot,
  FileText,
  Github,
  Linkedin,
  LockKeyhole,
  Radar,
} from "lucide-react";
import {
  azureProject,
  eventMatrix,
  experience,
  education,
  certifications,
  miniSiemProject,
  profile,
  secureCloudProject,
  signals,
  skillCategories,
} from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionMarker({ index, eyebrow, title, description }: { index: string; eyebrow: string; title: string; description?: string }) {
  return (
    <div className="section-marker">
      <span className="section-index">{index}</span>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
    </div>
  );
}

function MiniLabel({ children, accent = "neutral" }: { children: React.ReactNode; accent?: "neutral" | "lime" | "amber" | "blue" | "teal" }) {
  return <span className={`mini-label mini-${accent}`}>{children}</span>;
}

function SignalRegister() {
  return (
    <section className="proof-strip" aria-label="Project evidence register">
      <div className="container-grid">
        <div className="proof-head">
          <MiniLabel accent="lime">01 / Evidence register</MiniLabel>
          <span>Measured project work — not simulated telemetry</span>
        </div>
        <div className="proof-grid">
          {signals.map((signal, index) => (
            <Reveal key={signal.value} delay={index * 0.05} className="proof-cell">
              <span className="proof-number">0{index + 1}</span>
              <strong>{signal.value}</strong>
              <span>{signal.label.join(" ")}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section id="top" className="hero-new">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="container-grid hero-inner">
        <div className="hero-copy">
          <Reveal>
            <MiniLabel accent="lime">Security engineering / detection / investigation</MiniLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h1>
              I build systems that turn <span>security signals</span> into decisions.
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="hero-lede">
              Entry-level cybersecurity analyst focused on security operations, detection engineering and secure systems — with hands-on work across Azure, SIEM engineering and application security.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="hero-actions">
            <a href="#work" className="btn-primary">Enter the case study <ArrowDownRight size={16} /></a>
            <a href={profile.resume} className="btn-secondary"><FileText size={15} /> Resume</a>
          </Reveal>
          <Reveal delay={0.26} className="hero-meta">
            <span>{profile.location}</span>
            <span className="status-dot" />
            <span>{profile.status}</span>
          </Reveal>
        </div>

        <Reveal className="hero-console" delay={0.16}>
          <div className="console-chrome">
            <div className="chrome-dots"><i /><i /><i /></div>
            <span>INVESTIGATION / ACTIVE CASE</span>
            <span>CASE 01</span>
          </div>
          <div className="console-main">
            <div className="console-side">
              <MiniLabel accent="amber">Signal</MiniLabel>
              <div className="event-big">4625</div>
              <div className="event-name">FAILED AUTHENTICATION</div>
              <div className="console-rule" />
              <div className="console-side-row"><span>Source</span><b>Windows</b></div>
              <div className="console-side-row"><span>Analysis</span><b>KQL</b></div>
              <div className="console-side-row"><span>Mapping</span><b className="amber-text">T1110</b></div>
            </div>
            <div className="console-graph">
              <div className="graph-top">
                <MiniLabel>Correlation path</MiniLabel>
                <span>4625 → KQL → T1110</span>
              </div>
              <div className="correlation-map">
                <div className="map-node active"><span>01</span><b>FAILED LOGIN</b><small>Event 4625</small></div>
                <div className="map-line"><span /></div>
                <div className="map-node"><span>02</span><b>SOURCE</b><small>IpAddress</small></div>
                <div className="map-line"><span /></div>
                <div className="map-node"><span>03</span><b>TARGET</b><small>TargetUserName</small></div>
                <div className="map-line"><span /></div>
                <div className="map-node final"><span>04</span><b>DETECT</b><small>T1110</small></div>
              </div>
              <div className="console-foot">
                <span><CircleDot size={11} /> investigation path</span>
                <span>01 / 04</span>
              </div>
            </div>
          </div>
          <div className="console-bottom">
            <span>WINDOWS SECURITY EVENTS</span>
            <span>AZURE MONITOR → LOG ANALYTICS → SENTINEL</span>
            <span className="green-status">● INVESTIGATED</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AzureEvidenceView() {
  const [active, setActive] = useState("4625");
  const views: Record<string, { title: string; tag: string; rows: string[] }> = {
    "4625": { title: "Authentication investigation", tag: "FAILED LOGON", rows: ["TargetUserName", "IpAddress", "WorkstationName", "FailureReason", "LogonType"] },
    "4688": { title: "Process creation analysis", tag: "PROCESS CREATE", rows: ["NewProcessName", "ParentProcessName", "SubjectUserName", "CommandLine", "Computer"] },
    "4720": { title: "Account creation review", tag: "ACCOUNT CREATE", rows: ["TargetUserName", "SubjectUserName", "PrivilegeList", "Computer"] },
  };
  const view = views[active];
  return (
    <div className="evidence-console">
      <div className="evidence-toolbar">
        <div className="toolbar-left"><Radar size={15} /><span>CASE EVIDENCE VIEW</span></div>
        <span>WINDOWS SECURITY / LOG ANALYTICS</span>
      </div>
      <div className="evidence-tabs">
        {Object.keys(views).map((id) => (
          <button key={id} onClick={() => setActive(id)} className={active === id ? "active" : ""}>
            <span>EVENT</span><b>{id}</b>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="evidence-body">
          <div className="evidence-title-row">
            <div><MiniLabel accent="amber">{view.tag}</MiniLabel><h3>{view.title}</h3></div>
            <span className="evidence-count">{active === "4625" ? "1,480+" : active === "4688" ? "4,640+" : "EVENT SET"}</span>
          </div>
          <div className="query-block">
            <div className="query-top"><span>KQL / investigation query</span><span>LOG ANALYTICS</span></div>
            <code>{active === "4625" ? `SecurityEvent | where EventID == 4625\n| project TimeGenerated, TargetUserName, IpAddress, WorkstationName, FailureReason` : active === "4688" ? `SecurityEvent | where EventID == 4688\n| project TimeGenerated, NewProcessName, ParentProcessName, SubjectUserName` : `SecurityEvent | where EventID == 4720\n| project TimeGenerated, TargetUserName, SubjectUserName, PrivilegeList`}</code>
          </div>
          <div className="evidence-table">
            <div className="table-head"><span>FIELD</span><span>OBSERVATION</span><span>ROLE</span></div>
            {view.rows.map((row, i) => (
              <div className="table-row" key={row}><span>{row}</span><b>{i === 0 ? "REVIEWED" : i === 1 ? "CORRELATED" : "PARSED"}</b><small>{active === "4625" && i === 1 ? "source" : i === 0 ? "identity" : "context"}</small></div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function AzureCase() {
  const timeline = ["Event 4625", "Source IP", "Target account", "Multiple failures", "Successful login", "Investigation"];
  return (
    <section id="work" className="case-section">
      <div className="container-grid">
        <SectionMarker index="02" eyebrow="Flagship case / Security operations" title="Azure SOC Monitoring Lab" description="A hands-on Windows security monitoring pipeline built from event collection through KQL investigation and detection." />
        <div className="case-hero-grid">
          <Reveal className="case-identity">
            <div className="case-number">01</div>
            <h3>Investigate the signal.<br /><span>Prove the path.</span></h3>
            <p>{azureProject.description}</p>
            <div className="case-specs">
              {azureProject.caseFile.map((item) => <div key={item.label}><MiniLabel>{item.label}</MiniLabel><strong className={item.label === "Mapping" ? "amber-text" : ""}>{item.value}</strong></div>)}
            </div>
            <div className="tech-row">{azureProject.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>
          </Reveal>
          <Reveal className="case-evidence" delay={0.1}><AzureEvidenceView /></Reveal>
        </div>
        <Reveal className="case-metrics" delay={0.1}>
          <div><span>AUTHENTICATION EVENTS</span><strong>1,480+</strong><small>Event ID 4625 investigated</small></div>
          <div><span>PROCESS EVENTS</span><strong>4,640+</strong><small>Event ID 4688 analyzed</small></div>
          <div><span>ACCOUNT EVENTS</span><strong>4720</strong><small>Account creation monitored</small></div>
          <div><span>DETECTION MAP</span><strong>T1110</strong><small>Brute force / credential guessing</small></div>
        </Reveal>
        <div className="investigation-rail">
          <div className="rail-head"><MiniLabel accent="amber">Investigation sequence</MiniLabel><span>Signal → evidence → correlation</span></div>
          <div className="rail-track">
            {timeline.map((step, i) => <div key={step} className="rail-step"><span>0{i + 1}</span><i /><b>{step}</b>{i < timeline.length - 1 && <em />}</div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function EventMatrix() {
  const [selected, setSelected] = useState("4625");
  const event = eventMatrix.find((item) => item.id === selected) ?? eventMatrix[1];
  return (
    <section className="matrix-section">
      <div className="container-grid">
        <SectionMarker index="03" eyebrow="Event intelligence" title="The event IDs become a working investigation language." description="Select a Windows security event to inspect the fields, chain and ATT&CK mapping used in the project." />
        <div className="matrix-shell">
          <div className="matrix-nav">
            {eventMatrix.map((item) => <button key={item.id} onClick={() => setSelected(item.id)} className={selected === item.id ? "active" : ""}><span>{item.id}</span><small>{item.label}</small><ChevronRight size={14} /></button>)}
          </div>
          <div className="matrix-readout">
            <div className="readout-top"><MiniLabel accent={event.id === "4625" || event.mitre ? "amber" : "blue"}>EVENT {event.id}</MiniLabel><span>{event.mitre ?? "BASELINE / CONTEXT"}</span></div>
            <h3>{event.label}</h3>
            <p>{event.context}</p>
            <div className="readout-columns">
              <div><MiniLabel>Investigation chain</MiniLabel><div className="chain">{event.chain.map((step, i) => <div key={step}><span>{String(i + 1).padStart(2, "0")}</span><b>{step}</b>{i < event.chain.length - 1 && <i />}</div>)}</div></div>
              <div><MiniLabel>Fields reviewed</MiniLabel><div className="field-grid">{event.fields.map((field) => <span key={field}>{field}</span>)}</div>{event.interpreters && <><MiniLabel>Interpreters</MiniLabel><div className="field-grid">{event.interpreters.map((field) => <span key={field}>{field}</span>)}</div></>}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniSiem() {
  const [active, setActive] = useState(0);
  const rule = miniSiemProject.rules[active];
  return (
    <section className="build-section">
      <div className="container-grid">
        <SectionMarker index="04" eyebrow="Detection engineering" title="Mini-SIEM" description="A full-stack security monitoring system that turns log streams into detection rules and real-time alerts." />
        <div className="build-layout">
          <Reveal className="pipeline-board">
            <div className="board-head"><MiniLabel accent="blue">System pipeline</MiniLabel><span>FastAPI / React / MongoDB / WebSockets</span></div>
            <div className="pipeline-visual">
              {miniSiemProject.pipeline.map((step, i) => <div key={step} className={`pipeline-node ${i === 2 ? "active" : ""}`}><span>0{i + 1}</span><b>{step}</b>{i < miniSiemProject.pipeline.length - 1 && <i />}</div>)}
            </div>
            <div className="pipeline-foot"><span>9 REST endpoints</span><span>JWT auth</span><span>WebSocket delivery</span></div>
          </Reveal>
          <Reveal className="rule-panel" delay={0.08}>
            <div className="rule-list">
              {miniSiemProject.rules.map((item, i) => <button key={item.name} onClick={() => setActive(i)} className={active === i ? "active" : ""}><span>0{i + 1}</span><b>{item.name}</b><small>{item.threshold}</small></button>)}
            </div>
            <div className="rule-detail">
              <div className="rule-detail-head"><MiniLabel accent="blue">Detection rule / 0{active + 1}</MiniLabel><span>TRIGGER LOGIC</span></div>
              <h3>{rule.name}</h3>
              <div className="threshold">{rule.threshold}</div>
              <div className="logic-flow">{rule.logic.map((step, i) => <div key={step}><span>{String(i + 1).padStart(2, "0")}</span><b>{step}</b>{i < rule.logic.length - 1 && <ArrowRight size={13} />}</div>)}</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SecureCloud() {
  return (
    <section className="protect-section">
      <div className="container-grid">
        <SectionMarker index="05" eyebrow="Secure systems" title="Secure Cloud File Sharing & Audit Logging" description="A security-focused MERN application built around authentication, least privilege, recipient validation and persistent auditability." />
        <div className="protect-layout">
          <Reveal className="architecture-board">
            <div className="board-head"><MiniLabel accent="teal">Access architecture</MiniLabel><span>MERN / JWT / RBAC</span></div>
            <div className="architecture-stack">
              {secureCloudProject.workflow.map((step, i) => <div key={step} className={`arch-step ${i === 2 || i === 4 ? "accent" : ""}`}><span>0{i + 1}</span><div><b>{step}</b>{i === 2 && <small>2-role access model</small>}{i === 4 && <small>Recipient-only validation</small>}</div>{i < secureCloudProject.workflow.length - 1 && <ArrowDownRight size={15} />}</div>)}
            </div>
          </Reveal>
          <Reveal className="protect-copy" delay={0.08}>
            <div className="protect-icon"><LockKeyhole size={22} /></div>
            <h3>Protect access.<br /><span>Keep the evidence.</span></h3>
            <p>Security controls are part of the product flow: authentication, authorization, recipient validation, revocation and persistent audit logging.</p>
            <div className="feature-list">{secureCloudProject.features.map((feature) => <div key={feature}><Check size={14} />{feature}</div>)}</div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Systems() {
  return (
    <section id="systems" className="systems-section">
      <div className="container-grid">
        <SectionMarker index="06" eyebrow="One engineering approach" title="Detect → Build → Protect" />
        <div className="system-line">
          <div><span>01</span><strong>DETECT</strong><small>Azure SOC</small></div>
          <i /><div><span>02</span><strong>BUILD</strong><small>Mini-SIEM</small></div>
          <i /><div><span>03</span><strong>PROTECT</strong><small>Secure file sharing</small></div>
        </div>
      </div>
    </section>
  );
}

function SkillsAndProfile() {
  const [active, setActive] = useState(0);
  return (
    <section id="about" className="profile-section">
      <div className="container-grid">
        <div className="profile-grid">
          <div>
            <SectionMarker index="07" eyebrow="Technical profile" title="The stack behind the work." />
            <div className="skill-tabs">{skillCategories.map((group, i) => <button key={group.title} onClick={() => setActive(i)} className={active === i ? "active" : ""}>{group.title}</button>)}</div>
            <div className="skill-display"><MiniLabel accent={active === 0 ? "lime" : active === 1 ? "blue" : active === 2 ? "amber" : "teal"}>{skillCategories[active].title}</MiniLabel><div>{skillCategories[active].items.map((skill) => <span key={skill}>{skill}</span>)}</div></div>
          </div>
          <div className="profile-note">
            <MiniLabel>About</MiniLabel>
            <p>Cybersecurity graduate building practical security operations, detection engineering and secure application projects.</p>
            <div className="contact-block"><span>Based in</span><strong>{profile.location}</strong><span>Contact</span><a href={profile.email}>{profile.emailDisplay}</a></div>
            <div className="socials"><a href={profile.linkedin}><Linkedin size={15} /> LinkedIn</a><a href={profile.github}><Github size={15} /> GitHub</a></div>
          </div>
        </div>

        <div id="experience" className="history-grid">
          <div><MiniLabel>Experience</MiniLabel><h3>{experience.role}</h3><p>{experience.company} · {experience.location} · {experience.period}</p><div className="history-points">{experience.metrics.map((item) => <div key={item.label}><span />{item.value} — {item.label}</div>)}</div></div>
          <div id="education"><MiniLabel>Education</MiniLabel><h3>{education[0].program}</h3><p>{education[0].institution} · {education[0].period}</p><h3 className="second-degree">{education[1].program}</h3><p>{education[1].institution} · {education[1].period}</p></div>
          <div><MiniLabel>Certifications</MiniLabel><div className="cert-list">{certifications.map((cert) => <div key={cert.name}><span>{cert.year}</span><b>{cert.name}</b><small>{cert.issuer}</small></div>)}</div></div>
        </div>
      </div>
    </section>
  );
}

export default function PortfolioExperience() {
  return (
    <>
      <Hero />
      <SignalRegister />
      <AzureCase />
      <EventMatrix />
      <MiniSiem />
      <SecureCloud />
      <Systems />
      <SkillsAndProfile />
      <section id="contact" className="final-new">
        <div className="container-grid">
          <Reveal className="final-panel">
            <MiniLabel accent="lime">Open to opportunities</MiniLabel>
            <h2>Ready for the next<br /><span>investigation.</span></h2>
            <p>Looking for entry-level security operations, security analyst and detection-focused roles.</p>
            <div className="final-actions"><a href={profile.email} className="btn-primary">Start a conversation <ArrowRight size={15} /></a><a href={profile.resume} className="btn-secondary">Download resume</a></div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
