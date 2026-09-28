"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight, ArrowUpRight, ExternalLink, Github, Linkedin, Mail, Shield,
  Radar, Network, LockKeyhole, Search, Terminal, Database, Code2, Smartphone,
  ChevronRight, Eye, Crosshair, FileSearch, Cpu, Server, Layers3, Activity, GraduationCap, BriefcaseBusiness, ShieldCheck
} from "lucide-react";
import {
  profile, signals, eventMatrix, miniSiemProject, secureCloudProject,
  skillCategories, experience, education, certifications, azureProject
} from "@/lib/data";

const fade = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .12 }, transition: { duration: .65 } };

function Label({ children, accent = "lime" }: { children: React.ReactNode; accent?: string }) {
  return <span className={`label ${accent}`}><i />{children}</span>;
}

function LinkedInMark({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V8.999h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.602 0 4.267 2.37 4.267 5.455v6.287ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM3.559 20.452h3.558V8.999H3.559v11.453Z"/></svg>;
}

function GitHubMark({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.467-2.38 1.235-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.289-1.552 3.295-1.23 3.295-1.23.653 1.653.242 2.873.118 3.176.77.841 1.233 1.911 1.233 3.221 0 4.61-2.805 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.216.696.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12Z"/></svg>;
}

function BrandIcon({ domain, fallback, alt }: { domain?: string; fallback: React.ReactNode; alt: string }) {
  const [failed, setFailed] = useState(false);
  return <span className="brand-icon" aria-label={alt}>
    {domain && !failed ? <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`} alt="" onError={() => setFailed(true)} /> : fallback}
  </span>;
}


const skillIconMap: Record<string, React.ReactNode> = {
  SIEM:<Radar/>, "Security monitoring":<Activity/>, "Alert triage":<ShieldCheck/>, "Incident investigation":<Search/>, "Log analysis":<FileSearch/>, "Event correlation":<Network/>, "Incident response":<Shield/>,
  "Microsoft Azure":<CloudIcon/>, "Azure Monitor":<Activity/>, "Log Analytics":<Database/>, "Azure Monitor Agent":<Cpu/>, KQL:<Terminal/>, "Windows Security Events":<Server/>,
  Python:<Code2/>, FastAPI:<Server/>, "REST APIs":<Network/>, MongoDB:<Database/>, Docker:<Layers3/>, React:<Code2/>, Git:<Github/>, "Linux/Bash":<Terminal/>,
  "MITRE ATT&CK":<Crosshair/>, "Digital forensics":<Search/>, "Threat modeling":<Radar/>, "Cloud security":<CloudIcon/>, IAM:<LockKeyhole/>, RBAC:<Layers3/>, "Access control":<ShieldCheck/>, "Audit logging":<FileSearch/>,
  "Burp Suite":<Bug/>, Wireshark:<Activity/>, Nmap:<Network/>, "OWASP Top 10":<Shield/>, "Network security":<Network/>, "Vulnerability assessment":<Search/>, "Web application security":<Code2/>,
  Ghidra:<Cpu/>, Frida:<Smartphone/>, MobSF:<Smartphone/>, APKTool:<Smartphone/>, "AFL++":<Activity/>, "Firmware analysis":<Cpu/>, Fuzzing:<Radar/>, "Static analysis":<Search/>,
  Cryptography:<LockKeyhole/>, "Buffer overflows":<AlertTriangle/>, "Memory safety":<ShieldCheck/>, "Side-channel attacks":<Activity/>, "Fault injection":<Zap/>, "IoT security":<Cpu/>, "Mobile security":<Smartphone/>
};
function CloudIcon(){ return <Cloud/>; }
function Cloud(){ return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 18a5.5 5.5 0 0 1-.7-10.95A6.5 6.5 0 0 1 19 9.5h.5a4.5 4.5 0 0 1 0 9H7.5Z" fill="none" stroke="currentColor" strokeWidth="1.6"/></svg>; }
function Bug(){ return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 8h6v8a3 3 0 0 1-6 0V8Zm0-2a3 3 0 0 1 6 0M5 10h4m6 0h4M5 14h4m6 0h4M7 5 5 3m12 2 2-2M7 19l-2 2m12-2 2 2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>; }
function AlertTriangle(){ return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 9 17H3L12 3Zm0 6v5m0 3h.01" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>; }
function Zap(){ return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>; }

const skillLogoMap: Record<string, [string, string]> = {
  "Microsoft Azure":["https://cdn.simpleicons.org/microsoftazure/0078D4","Azure"],
  "Azure Monitor":["https://cdn.simpleicons.org/microsoftazure/0078D4","Azure"],
  "Log Analytics":["https://cdn.simpleicons.org/microsoftazure/0078D4","Logs"],
  "Azure Monitor Agent":["https://cdn.simpleicons.org/microsoftazure/0078D4","AMA"],
  "Microsoft Sentinel":["https://cdn.simpleicons.org/microsoftsentinel/0078D4","Sentinel"],
  Python:["https://cdn.simpleicons.org/python/3776AB","Python"],
  FastAPI:["https://cdn.simpleicons.org/fastapi/009688","FastAPI"],
  MongoDB:["https://cdn.simpleicons.org/mongodb/47A248","MongoDB"],
  Docker:["https://cdn.simpleicons.org/docker/2496ED","Docker"],
  React:["https://cdn.simpleicons.org/react/61DAFB","React"],
  Git:["https://cdn.simpleicons.org/git/F05032","Git"],
  "Linux/Bash":["https://cdn.simpleicons.org/linux/FCC624","Linux"],
  "MITRE ATT&CK":["https://cdn.simpleicons.org/mitre/EF3B2D","MITRE"],
  "Burp Suite":["https://cdn.simpleicons.org/burpsuite/FF6633","Burp"],
  Wireshark:["https://cdn.simpleicons.org/wireshark/1679A7","Wireshark"],
  Nmap:["https://cdn.simpleicons.org/nmap/4EAA25","Nmap"],
  "OWASP Top 10":["https://cdn.simpleicons.org/owasp/FFFFFF","OWASP"],
  Ghidra:["https://cdn.simpleicons.org/ghidra/FF6B35","Ghidra"],
  Frida:["https://cdn.simpleicons.org/frida/FFCA28","Frida"],
  MobSF:["https://cdn.simpleicons.org/mobsf/4CAF50","MobSF"],
  APKTool:["https://cdn.simpleicons.org/android/3DDC84","APK"],
  "AFL++":["https://cdn.simpleicons.org/afl/FF6B35","AFL"],
  "Node.js":["https://cdn.simpleicons.org/nodedotjs/339933","Node.js"],
  "Express.js":["https://cdn.simpleicons.org/express/FFFFFF","Express"],
  JavaScript:["https://cdn.simpleicons.org/javascript/F7DF1E","JavaScript"],
  TypeScript:["https://cdn.simpleicons.org/typescript/3178C6","TypeScript"],
  "Microsoft Defender XDR":["https://cdn.simpleicons.org/microsoftdefender/0078D4","Defender"],
  Cryptography:["https://cdn.simpleicons.org/letsencrypt/003A70","Crypto"],
};

function SkillLogo({ skill, fallback }: { skill:string; fallback:React.ReactNode }) {
  const official = skillLogoMap[skill];
  const [failed, setFailed] = useState(false);
  return <span className={`skill-glyph ${official && !failed ? "has-official" : "has-fallback"}`} aria-label={skill}>
    {official && !failed ? <img className="skill-logo" src={official[0]} alt="" onError={() => setFailed(true)} /> : fallback}
  </span>;
}

function Button({ href, children, primary = false, external = false }: { href: string; children: React.ReactNode; primary?: boolean; external?: boolean }) {
  return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={`button ${primary ? "primary" : ""}`}>{children}</a>;
}

function Hero() {
  const [event, setEvent] = useState("4625");
  const data = eventMatrix.find(x => x.id === event)!;
  return (
    <section className="hero-v2" id="top">
      <div className="hero-noise" />
      <div className="hero-grid" />
      <div className="hero-content wrap">
        <div className="hero-intro">
          <div className="hero-brandline"><span>SECURITY</span><b>DETECTION / INVESTIGATION / ENGINEERING</b><small>BENGALURU · INDIA</small></div>
          <Label>Security / Detection / Application Security</Label>
          <h1 className="hero-mantra"><span className="m-detect">Detect.</span><span className="m-investigate">Investigate.</span><span className="m-build">Build.</span><span className="m-secure">Secure.</span></h1>
          <p>I turn security signals into investigations, investigations into detections, and detections into secure systems.</p>
          <div className="hero-actions"><Button href="#work" primary>Explore the work <ArrowDownRight size={17} /></Button><Button href={profile.resume} external>View CV <ArrowUpRight size={16} /></Button></div>
          <div className="hero-socials"><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={13}/></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={13}/></a><a href={profile.email}>Email <ArrowUpRight size={13}/></a></div>
        </div>

        <div className="hero-scene" aria-label="Interactive security event visual">
          <div className="scene-glow glow-a"/><div className="scene-glow glow-b"/>
          <div className="scene-orbit orbit-a"/><div className="scene-orbit orbit-b"/><div className="scene-orbit orbit-c"/>
          <div className="scene-core"><div className="core-inner"><Shield size={34}/><span>SECURITY<br/>SIGNAL</span></div></div>
          <div className="scene-line line-a"/><div className="scene-line line-b"/><div className="scene-line line-c"/>
          <button className="scene-chip chip-a" onClick={() => setEvent("4625")}><b>4625</b><span>FAILED AUTH</span></button>
          <button className="scene-chip chip-b" onClick={() => setEvent("4688")}><b>4688</b><span>PROCESS</span></button>
          <button className="scene-chip chip-c" onClick={() => setEvent("4720")}><b>4720</b><span>ACCOUNT</span></button>
          <div className="scene-console">
            <div className="console-top"><span>EVENT EXPLORER</span><b>LIVE MODEL</b></div>
            <div className="console-main"><div className="console-event"><small>WINDOWS SECURITY EVENT</small><strong>{data.id}</strong><span>{data.label}</span></div><div className="console-fields">{data.fields.slice(0,4).map(f => <div key={f}><small>FIELD</small><b>{f}</b></div>)}</div></div>
            <div className="console-bottom"><span>{data.mitre || "CORRELATION"}</span><span>INVESTIGATION PATH →</span></div>
          </div>
        </div>
      </div>
      <div className="hero-bottom wrap"><span>BASED IN BENGALURU, INDIA</span><span>OPEN TO CYBERSECURITY OPPORTUNITIES</span><span>01 / 05 — SYSTEMS OF INTEREST</span></div>
    </section>
  );
}

function MetricIcon({ kind }: { kind: string }) {
  const icons: Record<string, React.ReactNode> = {
    auth: <ShieldCheck size={17} />,
    process: <Terminal size={17} />,
    rules: <Crosshair size={17} />,
    events: <Server size={17} />,
  };
  return <span className={`metric-icon ${kind}`}>{icons[kind]}</span>;
}

function Metrics() {
  const metricMeta = [
    { kind:"auth", eyebrow:"AUTHENTICATION", value:"1,480+", label:"events investigated", accent:"lime", note:"4625 / failed auth" },
    { kind:"process", eyebrow:"PROCESS CREATION", value:"4,640+", label:"events analyzed", accent:"cyan", note:"4688 / execution telemetry" },
    { kind:"rules", eyebrow:"DETECTION ENGINEERING", value:"4", label:"Mini-SIEM rules", accent:"violet", note:"brute force / scan / SQLi / root" },
    { kind:"events", eyebrow:"WINDOWS TELEMETRY", value:"4624 / 4625 / 4688 / 4720", label:"event IDs worked", accent:"amber", note:"auth / process / account activity" },
  ];
  return <section className="proof-strip wrap" aria-label="Measured project work">
    <motion.div {...fade} className="proof-title">
      <div className="proof-title-head"><Label>Measured project work</Label><span className="proof-live">FIELD NOTES / 2026</span></div>
      <strong>Evidence, not decoration.</strong>
      <span>Signals traced from Windows telemetry to investigation, detection and response.</span>
      <div className="signal-register">
        <b>4625</b><i>→</i><b>4688</b><i>→</i><b>4720</b><i>→</i><b>T1110</b>
      </div>
    </motion.div>
    {metricMeta.map((m,i)=><motion.div {...fade} transition={{duration:.55,delay:i*.06}} className={`proof proof-${m.accent}`} key={m.value}>
      <div className="proof-top"><small>0{i+1}</small><MetricIcon kind={m.kind}/></div>
      <small className="proof-eyebrow">{m.eyebrow}</small>
      <strong>{m.value}</strong>
      <span>{m.label}</span>
      <small className="proof-note">{m.note}</small>
      <i className="proof-scan" aria-hidden="true" />
    </motion.div>)}
  </section>;
}

function WorkIndex() {
  const projects: Array<{n:string; type:string; title:string; desc:string; color:string; href:string; repo?:string; icon: React.ComponentType<{className?: string; size?: number}>}> = [
    { n:"01", type:"SECURITY OPERATIONS", title:"Azure SOC Monitoring Lab", desc:"Windows event collection, KQL investigation, correlation and detection engineering in Azure.", color:"lime", href:"#azure", repo:"https://github.com/PaVAnKuMaR-18o3/Azure-soc-security-monitoring-lab", icon:Radar },
    { n:"02", type:"DETECTION ENGINEERING", title:"Mini-SIEM", desc:"Full-stack security monitoring with four detection rules and real-time alert delivery.", color:"cyan", href:"#siem", repo:"https://github.com/PaVAnKuMaR-18o3/mini-siem", icon:Activity },
    { n:"03", type:"SECURE APPLICATION", title:"Secure Cloud File Sharing", desc:"JWT, RBAC, recipient-only downloads and blockchain-ready persistent audit logging.", color:"teal", href:"#cloud", repo:"https://github.com/PaVAnKuMaR-18o3/secure-cloud-file-sharing-with-blockchain-based-audit-logs", icon:LockKeyhole },
    { n:"04", type:"PENETRATION / IOT SECURITY", title:"Wansview Q3 Security Assessment", desc:"Network reconnaissance, traffic analysis, web/API review and firmware-oriented investigation of an IoT camera.", color:"amber", href:"#pentest", icon:Crosshair },
  ];
  return <section className="work-index wrap" id="work"><motion.div {...fade} className="section-intro"><Label>Selected work</Label><h2>Four different security problems.<br/><em>Four different ways in.</em></h2><p>My cybersecurity work spans blue-team operations, detection engineering, secure application design and hands-on offensive / IoT assessment.</p></motion.div><div className="project-index">{projects.map(p=>{const Icon=p.icon;return <a href={p.href} className={`project-index-row ${p.color}`} key={p.n}><span className="row-number">{p.n}</span><Icon className="row-icon" size={25}/><div><small>{p.type}</small><h3>{p.title}</h3><p>{p.desc}</p></div><div className="row-actions">{p.repo && <button className="repo-hover" onClick={(ev)=>{ev.preventDefault();ev.stopPropagation();window.open(p.repo,"_blank","noopener,noreferrer");}}><Github size={13}/> GitHub repo</button>}<ArrowUpRight className="row-arrow"/></div></a>})}</div></section>;
}

function AzureCase() {
  const [tab,setTab]=useState(0);
  const evidence = [
    {title:"Authentication investigation", event:"4625", note:"Failed authentication events parsed and investigated in Log Analytics using KQL fields such as TargetUserName, IpAddress, FailureReason and LogonType.", color:"lime"},
    {title:"Process creation analysis", event:"4688", note:"Event ID 4688 process-creation telemetry reviewed for execution patterns, parent-child relationships and command/scripting interpreters.", color:"cyan"},
    {title:"Account creation monitoring", event:"4720", note:"Event ID 4720 activity reviewed for newly created accounts and mapped to T1136.001.", color:"amber"},
  ];
  const e=evidence[tab];
  return <section className="case-v2 wrap" id="azure"><div className="case-top"><div><Label>01 / flagship case</Label><h2>Azure SOC<br/><em>Monitoring Lab</em></h2></div><div className="case-summary"><span>SECURITY OPERATIONS</span><p>Windows Security Events collected with Azure Monitor Agent and a Data Collection Rule, then investigated in Log Analytics / Microsoft Sentinel with KQL.</p><div className="case-metrics"><b>1,480+<small>AUTH EVENTS</small></b><b>4,640+<small>PROCESS EVENTS</small></b><b>4624 / 4625 / 4688 / 4720<small>EVENT TYPES</small></b></div></div></div>
    <div className="azure-board"><div className="board-head"><span>INVESTIGATION / SIGNAL MODEL</span><span>EVENT {e.event} · {e.color === "lime" ? "T1110" : e.event === "4720" ? "T1136.001" : "WINDOWS EVENT"}</span></div><div className="board-grid"><div className="board-left"><div className="event-big"><small>PRIMARY SIGNAL</small><strong>{e.event}</strong><span>{e.title}</span></div><div className="evidence-path"><span>01 SIGNAL</span><span>02 SOURCE</span><span>03 TARGET</span><span>04 CORRELATE</span><span>05 DETECT</span></div><div className="azure-signal-visual"><div className="signal-node node-source">WINDOWS<br/><small>SECURITY EVENT</small></div><div className="signal-node node-kql">KQL<br/><small>LOG ANALYTICS</small></div><div className="signal-node node-sentinel">SENTINEL<br/><small>INVESTIGATION</small></div><div className="signal-core">{e.event}<small>{e.title.toUpperCase()}</small></div><div className="signal-path path-1"/><div className="signal-path path-2"/><div className="signal-path path-3"/></div><div className="kql-card"><div className="kql-head"><span>KQL / LOG ANALYTICS</span><b>QUERY</b></div><code>SecurityEvent | where EventID == {e.event}<br/>| summarize Events=count() by Computer<br/>| order by Events desc</code></div></div><div className="board-right"><div className="right-stat"><span>ANALYSIS</span><b>KQL</b></div><div className="right-stat"><span>PLATFORM</span><b>MICROSOFT SENTINEL</b></div><div className="right-stat"><span>MAPPING</span><b>{e.event === "4625" ? "T1110" : e.event === "4720" ? "T1136.001" : "EVENT ANALYSIS"}</b></div><div className="right-stat"><span>STATUS</span><b className="green">INVESTIGATED</b></div><a className="github-mini" href="https://github.com/PaVAnKuMaR-18o3/Azure-soc-security-monitoring-lab" target="_blank" rel="noopener noreferrer"><Github size={13}/> Azure lab repository <ExternalLink size={13}/></a></div></div></div>
    <div className="azure-tabs">{evidence.map((x,i)=><button key={x.event} onClick={()=>setTab(i)} className={tab===i?"active":""}><span>0{i+1}</span><b>EVENT {x.event}</b><small>{x.title}</small></button>)}</div><div className="azure-note"><Label accent={e.color}>Investigation evidence</Label><p>{e.note}</p></div>
  </section>;
}

function Detection() {
  const [rule,setRule]=useState(0); const r=miniSiemProject.rules[rule];
  return <section className="detection-v2 wrap" id="siem"><div className="section-intro"><Label accent="cyan">02 / detection engineering</Label><h2>Build the detector.<br/><em>Then make it explainable.</em></h2><p>Mini-SIEM built with FastAPI, MongoDB, React, Docker, JWT and WebSockets. Four detection rules transform authentication, connection and request activity into real-time alerts.</p></div><div className="det-grid"><div className="det-system"><div className="real-evidence-card mini-real"><div className="real-evidence-head"><span>ORIGINAL PROJECT SCREENSHOT</span><b>MINI-SIEM / DASHBOARD</b></div><div className="real-evidence-image"><img src="/evidence/minisiem/dashboard.png" alt="Original Mini-SIEM dashboard screenshot"/></div><div className="real-evidence-foot"><span>FastAPI · React · MongoDB · WebSockets · Docker</span><a href="https://github.com/PaVAnKuMaR-18o3/mini-siem" target="_blank" rel="noopener noreferrer">SOURCE REPOSITORY <ArrowUpRight size={12}/></a></div></div><div className="det-pipeline">{miniSiemProject.pipeline.map((x,i)=><div key={x}><small>0{i+1}</small><b>{x}</b>{i<4&&<ChevronRight size={13}/>}</div>)}</div></div><div className="rule-interface"><div className="rule-tabs-v2">{miniSiemProject.rules.map((x,i)=><button key={x.name} onClick={()=>setRule(i)} className={i===rule?"active":""}><span>0{i+1}</span>{x.name}</button>)}</div><div className="rule-detail"><Label accent="cyan">Detection rule</Label><h3>{r.name}</h3><div className="threshold">{r.threshold}</div><div className="logic-flow">{r.logic.map((x,i)=><div key={x}><span>{String(i+1).padStart(2,"0")}</span><b>{x}</b>{i<r.logic.length-1&&<ChevronRight size={13}/>}</div>)}</div><a className="repo-inline" href="https://github.com/PaVAnKuMaR-18o3/mini-siem" target="_blank" rel="noopener noreferrer"><Github size={14}/> View Mini-SIEM repository <ArrowUpRight size={14}/></a></div></div></div></section>;
}

function CloudCase(){return <section className="cloud-v2 wrap" id="cloud"><div className="section-intro"><Label accent="teal">03 / secure application</Label><h2>Protect the path<br/><em>to sensitive data.</em></h2><p>A MERN-based secure file-sharing platform using JWT authentication, role-based access control, recipient-only authenticated downloads, revocable share links and persistent audit logging.</p></div><div className="cloud-layout"><div className="cloud-visual"><img src="/evidence/cloud/dashboard.webp" alt="Secure cloud file sharing application dashboard"/><div className="visual-badge">ORIGINAL UI / PROJECT REPORT</div></div><div className="cloud-side"><div className="arch-stack"><div><span>01</span><b>AUTHENTICATE</b><small>JWT-based session</small></div><div><span>02</span><b>AUTHORIZE</b><small>2-role RBAC</small></div><div><span>03</span><b>VALIDATE</b><small>Recipient-only access</small></div><div><span>04</span><b>RECORD</b><small>Persistent audit log</small></div></div><div className="cloud-evidence"><img src="/evidence/cloud/secure-download-flow.webp" alt="Secure download flow diagram"/><div><b>Share → Authenticate → Download → Revoke</b><span>Original architecture evidence</span></div></div><div className="repo-links"><a href="https://github.com/PaVAnKuMaR-18o3/secure-cloud-file-sharing-with-blockchain-based-audit-logs" target="_blank" rel="noopener noreferrer">Repository <Github size={14}/></a><a href="/evidence/cloud/hybrid-architecture.webp" target="_blank">Architecture evidence <ExternalLink size={14}/></a></div></div></div><div className="performance-row"><span>5MB upload <b>~2.1s</b></span><span>Core API response <b>~145–180ms</b></span><span>API target <b>&lt;500ms</b></span><span>Access control <b>JWT + RBAC</b></span></div></section>}

function Pentest(){return <section className="pentest-v2 wrap" id="pentest"><div className="pentest-head"><div><Label accent="amber">04 / offensive + IoT security</Label><h2>Wansview Q3<br/><em>security assessment.</em></h2></div><p>The project assessed an IoT camera through network reconnaissance, service enumeration, traffic analysis, web/API review and device-oriented investigation. The report documents open services, insecure communications, exposed interfaces and authentication risks.</p></div><div className="pentest-hero"><div className="pentest-screen"><img src="/evidence/iot/network-topology.webp" alt="Wansview Q3 assessment network topology"/><div className="screen-overlay"><span>LAB TOPOLOGY</span><b>CAMERA / LAPTOP / MOBILE</b></div></div><div className="findings"><div className="finding"><span>RECON</span><b>Nmap / service enumeration</b><small>Identified Telnet, HTTP, RTSP, UPnP and an unknown high-numbered service.</small></div><div className="finding"><span>TRAFFIC</span><b>Wireshark / Bettercap</b><small>Captured and examined camera traffic and setup behaviour.</small></div><div className="finding"><span>WEB / API</span><b>Portal and endpoint analysis</b><small>Reviewed management interfaces and exposed operations.</small></div><div className="finding"><span>DEVICE</span><b>Firmware / certificate analysis</b><small>Investigated device artefacts and exposed service behaviour.</small></div></div></div><div className="pentest-evidence"><div className="pentest-card large"><img src="/evidence/iot/wireshark-traffic.webp" alt="Wireshark traffic capture from Wansview assessment"/><span>NETWORK TRAFFIC</span></div><div className="pentest-card"><img src="/evidence/iot/web-portal.webp" alt="Wansview web portal evidence"/><span>WEB PORTAL</span></div><div className="pentest-card"><img src="/evidence/iot/cert-analysis.webp" alt="Certificate analysis evidence"/><span>DEVICE ANALYSIS</span></div></div><div className="pentest-footer"><div><b>Observed security themes</b><span>Default credential risk</span><span>Plain HTTP during setup</span><span>Exposed / insecure services</span><span>RTSP security concerns</span><span>Remote administrative interface risk</span></div><span className="assessment-note">Academic assessment — evidence presented for context</span></div></section>}

function EvidenceVault(){const items=[
  {img:"/evidence/minisiem/dashboard.png",label:"MINI-SIEM / ORIGINAL DASHBOARD",tone:"cyan",wide:true},
  {img:"/evidence/azure/brute-force-detection.png",label:"AZURE SOC / BRUTE-FORCE DETECTION",tone:"lime"},
  {img:"/evidence/azure/process-creation.png",label:"AZURE SOC / PROCESS CREATION",tone:"cyan"},
  {img:"/evidence/azure/failed-to-success.png",label:"AZURE SOC / FAILED → SUCCESS CORRELATION",tone:"violet"},
  {img:"/evidence/minisiem/swagger.png",label:"MINI-SIEM / API DOCUMENTATION",tone:"cyan"},
  {img:"/evidence/minisiem/docker.png",label:"MINI-SIEM / DOCKER RUNTIME",tone:"cyan"},
  {img:"/evidence/cloud/hybrid-architecture.webp",label:"SECURE CLOUD / HYBRID ARCHITECTURE",tone:"teal"},
  {img:"/evidence/cloud/three-tier.webp",label:"SECURE CLOUD / THREE-TIER DESIGN",tone:"teal"},
  {img:"/evidence/cloud/secure-download-flow.webp",label:"SECURE CLOUD / DOWNLOAD FLOW",tone:"teal"},
  {img:"/evidence/cloud/dashboard.webp",label:"SECURE CLOUD / APPLICATION UI",tone:"teal"},
  {img:"/evidence/cloud/attacker-model.webp",label:"SECURE CLOUD / THREAT MODEL",tone:"teal"},
  {img:"/evidence/iot/network-topology.webp",label:"IOT / TEST TOPOLOGY",tone:"amber"},
  {img:"/evidence/iot/wireshark-traffic.webp",label:"IOT / TRAFFIC ANALYSIS",tone:"amber"},
  {img:"/evidence/iot/web-portal.webp",label:"IOT / WEB PORTAL",tone:"amber"},
  {img:"/evidence/iot/web-analysis.webp",label:"IOT / NETWORK EVIDENCE",tone:"amber"},
  {img:"/evidence/iot/web-analysis-2.webp",label:"IOT / PORTAL ANALYSIS",tone:"amber"},
  {img:"/evidence/iot/cert-analysis.webp",label:"IOT / DEVICE ANALYSIS",tone:"amber"},
];return <section className="evidence-vault wrap" id="evidence"><div className="section-intro"><Label accent="cyan">Evidence vault</Label><h2>The work is<br/><em>inspectable.</em></h2><p>Look inside the work, not just the finished result. Original project captures, investigations and technical artifacts are collected here.</p></div><div className="vault-grid">{items.map((x,i)=><a href={x.img} target="_blank" rel="noopener noreferrer" className={`vault-item ${x.wide || i===0 || i===6 ? "wide" : ""}`} key={x.img}><img src={x.img} alt={x.label}/><span className={x.tone}>{x.label}</span><b>0{i+1}</b></a>)}</div></section>}

function Skills(){const [active,setActive]=useState(0);const cats=[...skillCategories,{title:"Offensive / reverse engineering",items:["Ghidra","Frida","MobSF","APKTool","AFL++","Firmware analysis","Fuzzing","Static analysis"]},{title:"Security foundations",items:["Cryptography","Network security","Buffer overflows","Memory safety","Side-channel attacks","Fault injection","IoT security","Mobile security"]}];return <section className="skills-v2 wrap" id="skills"><div className="section-intro"><Label>Cybersecurity toolkit</Label><h2>Security, from telemetry<br/><em>to firmware.</em></h2><p>Security work that moves from telemetry and detection into applications, infrastructure, networks, IoT and low-level systems.</p></div><div className="skills-layout"><div className="skill-nav">{cats.map((c,i)=><button key={c.title} onClick={()=>setActive(i)} className={i===active?"active":""}><span>0{i+1}</span>{c.title}<ChevronRight size={15}/></button>)}</div><div className="skill-cloud">{cats[active].items.map((x,i)=><motion.div initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} transition={{delay:i*.025}} key={x} className="skill-tile"><div className="skill-top"><small>{String(i+1).padStart(2,"0")}</small><span>{<SkillLogo skill={x} fallback={skillIconMap[x] || <Shield/>}/>}</span></div><b>{x}</b></motion.div>)}</div></div></section>}

function About(){return <><section className="profile-v2 wrap" id="about"><div className="profile-card"><div className="profile-mark"><img src="/avatar.png" alt="Illustrated cybersecurity engineer" /></div><div><Label>About / profile</Label><h2>I investigate what can go wrong — then build, test and document what makes it harder to break.</h2><p>My work moves across security operations, detection engineering, application and cloud security, network and IoT assessment, mobile and reverse engineering, and secure software development. I focus on work that leaves something concrete behind: a detection, a finding, a control, an architecture, a tested workflow or evidence.</p><div className="profile-links"><a className="social-link linkedin" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><span className="social-logo linkedin-mark"><LinkedInMark /></span> LinkedIn <ArrowUpRight size={14}/></a><a className="social-link github" href={profile.github} target="_blank" rel="noopener noreferrer"><span className="social-logo github-mark"><GitHubMark /></span> GitHub <ArrowUpRight size={14}/></a><a className="social-link email" href={profile.email}><span className="social-logo">@</span> Email <ArrowUpRight size={14}/></a></div></div></div></section><section className="credentials wrap" id="experience"><div className="credential-block experience-block"><Label>Experience</Label><div className="credential-title"><BrandIcon domain="phonepe.com" fallback={<BriefcaseBusiness/>} alt="PhonePe"/><div><h3>{experience.role}</h3><span>{experience.company} · {experience.location} · {experience.period}</span></div></div><div className="credential-metrics">{experience.metrics.map(m=><div key={m.value}><b>{m.value}</b><small>{m.label}</small></div>)}</div></div><div className="credential-block" id="education"><Label>Education</Label>{education.map(e=><div className="edu" key={e.institution}><div className="credential-title compact"><BrandIcon domain={e.institution.includes("Birmingham") ? "birmingham.ac.uk" : "newhorizonindia.edu"} fallback={<GraduationCap/>} alt={e.institution}/><div><b>{e.program}</b><span>{e.institution}</span><small>{e.period} · {e.location}</small></div></div></div>)}</div><div className="credential-block"><Label>Certifications</Label>{certifications.map(c=><div className="cert" key={c.name}><div className="credential-title compact"><BrandIcon domain={c.issuer.includes("Cisco") ? "cisco.com" : "microsoft.com"} fallback={<ShieldCheck/>} alt={c.issuer}/><div><b>{c.name}</b><span>{c.issuer} · {c.year}</span></div></div></div>)}</div></section></>}

function Footer(){return <footer className="footer-v2" id="contact"><div className="wrap footer-inner"><div><Label>Next investigation</Label><h2>Let's build something<br/><em>worth securing.</em></h2><p className="footer-kicker">Open to cybersecurity roles spanning SOC, security analysis, application security, cloud security and security engineering.</p></div><div className="footer-contact"><a className="footer-social email-social" href={profile.email}><span className="footer-social-icon email-icon">@</span> {profile.emailDisplay}</a><a className="footer-social linkedin-social" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><span className="footer-social-icon"><LinkedInMark /></span> LinkedIn <ArrowUpRight size={14}/></a><a className="footer-social github-social" href={profile.github} target="_blank" rel="noopener noreferrer"><span className="footer-social-icon"><GitHubMark /></span> GitHub <ArrowUpRight size={14}/></a><a className="footer-social resume-social" href={profile.resume} target="_blank" rel="noopener noreferrer"><span className="footer-social-icon"><FileSearch size={15}/></span> CV / Resume <ArrowUpRight size={14}/></a></div></div><div className="wrap footer-base"><span>© 2026 Pavan Kumar B P</span><span>BENGALURU, INDIA</span><span>CYBERSECURITY · SECURITY ENGINEERING · BENGALURU</span></div></footer>}

export default function Home(){return <div className="site-v2"><nav className="nav-v2"><div className="wrap nav-inner-v2"><a className="brand-v2" href="#top"><span className="brand-avatar"><img src="/avatar.png" alt="" /></span><strong>PAVAN KUMAR B P</strong></a><div className="nav-links-v2"><a href="#work">WORK</a><a href="#skills">SKILLS</a><a href="#about">ABOUT</a><a href="#experience">EXPERIENCE</a><a href="#contact">CONTACT</a><a href={profile.resume} target="_blank" rel="noopener noreferrer">CV</a></div><a className="nav-cta" href="https://github.com/PaVAnKuMaR-18o3" target="_blank" rel="noopener noreferrer"><Github size={13}/> GITHUB <ArrowUpRight size={13}/></a></div></nav><main><Hero/><Metrics/><WorkIndex/><AzureCase/><Detection/><CloudCase/><Pentest/><EvidenceVault/><Skills/><About/><Footer/></main></div>}
