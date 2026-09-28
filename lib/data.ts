export const profile = {
  name: "Pavan Kumar B P",
  location: "Bengaluru, India",
  status: "Open to opportunities",
  email: "mailto:pavankumarbp1845@gmail.com",
  emailDisplay: "pavankumarbp1845@gmail.com",
  // Real profile URLs were not present in the project source — placeholders only.
  linkedin: "https://www.linkedin.com/in/pavan-kumar-73ba0633b",
  github: "https://github.com/PaVAnKuMaR-18o3",
  linkedinIsPlaceholder: false,
  githubIsPlaceholder: false,
  resume: "/resume.pdf",
};

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Systems", href: "#systems" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const heroMetadata = [
  { label: "Event", value: "4625" },
  { label: "Source", value: "Windows" },
  { label: "Pipeline", value: "Azure" },
  { label: "Status", value: "Investigated" },
];

export const signals = [
  { value: "1,480+", label: ["Authentication events", "investigated"] },
  { value: "4,640+", label: ["Process creation events", "analyzed"] },
  { value: "4", label: ["Mini-SIEM", "detection rules"] },
  { value: "4624 / 4625 / 4688 / 4720", label: ["Windows security", "event types"] },
];

export const azureProject = {
  index: "01",
  category: "Security Operations",
  title: ["Azure SOC", "Monitoring Lab"],
  description:
    "Investigated Windows security events and built KQL-based detections for authentication, process creation and account activity.",
  technologies: [
    "Microsoft Azure",
    "Azure Monitor",
    "Log Analytics",
    "Microsoft Sentinel",
    "KQL",
    "Windows Security Events",
  ],
  caseFile: [
    { label: "Event", value: "4625" },
    { label: "Type", value: "Failed authentication" },
    { label: "Source", value: "Windows Security Events" },
    { label: "Analysis", value: "KQL" },
    { label: "Platform", value: "Azure Sentinel" },
    { label: "Mapping", value: "T1110" },
  ],
  metrics: [
    { value: "1,480+", label: "Failed authentication events investigated" },
    { value: "4,640+", label: "Process creation events analyzed" },
  ],
  eventIds: [
    { id: "4625", label: "Failed logon" },
    { id: "4688", label: "Process creation" },
    { id: "4720", label: "Account created" },
  ],
  architecture: [
    "Windows Security Events",
    "Azure Monitor Agent",
    "Data Collection Rule",
    "Log Analytics",
    "Microsoft Sentinel",
    "KQL Investigation",
  ],
  evidence: [
    {
      number: "02",
      title: "Authentication investigation",
      source: "Azure Sentinel",
      eventId: "4625",
      analysis: "KQL",
      mitre: "T1110",
    },
    {
      number: "03",
      title: "Process creation",
      source: "Log Analytics",
      eventId: "4688",
      analysis: "KQL",
      mitre: null as string | null,
    },
    {
      number: "04",
      title: "Account creation",
      source: "Azure Sentinel",
      eventId: "4720",
      analysis: "KQL",
      mitre: "T1136.001",
    },
  ],
};

export type EventMatrixItem = {
  id: string;
  label: string;
  context: string;
  mitre: string | null;
  fields: string[];
  chain: string[];
  interpreters?: string[];
};

export const eventMatrix: EventMatrixItem[] = [
  {
    id: "4624",
    label: "Successful logon",
    context: "Baseline used to correlate a successful session against prior failed attempts.",
    mitre: null,
    fields: ["TargetUserName", "Computer", "IpAddress", "LogonType"],
    chain: ["Logon event", "Session baseline", "Correlated against prior 4625s"],
  },
  {
    id: "4625",
    label: "Failed logon",
    context: "Investigated as the primary signal for brute-force and credential-guessing activity.",
    mitre: "T1110",
    fields: [
      "TargetUserName",
      "Computer",
      "IpAddress",
      "WorkstationName",
      "FailureReason",
      "Status",
      "SubStatus",
      "LogonType",
    ],
    chain: ["Failed authentication", "Source", "Target account", "Repeated attempts", "Successful-login correlation", "Investigation"],
  },
  {
    id: "4688",
    label: "Process creation",
    context: "Analyzed for anomalous process launches following an authentication event.",
    mitre: null,
    fields: ["NewProcessName", "ParentProcessName", "SubjectUserName", "CommandLine", "Computer"],
    chain: ["Process execution", "Account", "Parent process", "Child process", "Execution pattern"],
    interpreters: ["PowerShell", "CMD", "WScript", "CScript", "MSHTA"],
  },
  {
    id: "4720",
    label: "Account created",
    context: "Reviewed for unauthorized or unexpected account provisioning.",
    mitre: "T1136.001",
    fields: ["TargetUserName", "SubjectUserName", "PrivilegeList", "Computer"],
    chain: ["Account creation", "Identity", "Privilege", "Investigation"],
  },
];

export const investigationTimeline = [
  { step: "01", title: "Event 4625", detail: "Failed authentication" },
  { step: "02", title: "Source IP", detail: "Identified" },
  { step: "03", title: "Target account", detail: "Correlated" },
  { step: "04", title: "Multiple failures", detail: "Observed" },
  { step: "05", title: "Successful login", detail: "Correlated" },
  { step: "06", title: "Investigation", detail: "Completed" },
];

export const investigationFrames = [
  {
    frame: "01",
    heading: "Event detected",
    big: "4625",
    sub: "Failed authentication",
  },
  {
    frame: "02",
    heading: "Investigation",
    fields: ["Target user", "Source IP", "Workstation", "Failure reason", "Logon type"],
  },
  {
    frame: "03",
    heading: "Evidence",
    evidence: true,
  },
  {
    frame: "04",
    heading: "Correlation",
    chain: ["Failed login", "Successful login", "Timeline"],
  },
  {
    frame: "05",
    heading: "Detection",
    mitre: "T1110",
    technique: "Brute force",
  },
];

export const miniSiemProject = {
  index: "02",
  category: "Detection Engineering",
  title: ["Mini-SIEM"],
  description:
    "A full-stack security monitoring system with real-time detection and alert delivery.",
  technologies: ["FastAPI", "MongoDB", "React", "Docker", "JWT", "WebSockets"],
  pipeline: ["Ingest", "Analyze", "Detect", "Alert", "Deliver"],
  rules: [
    {
      name: "SSH brute force",
      threshold: "5+ failures / 60 seconds",
      logic: ["Auth log stream", "Group by source IP", "Count failures / 60s window", "≥ 5 → alert"],
    },
    {
      name: "Port scanning",
      threshold: "10+ distinct ports / 2 minutes",
      logic: ["Connection log stream", "Group by source IP", "Count distinct ports / 2m window", "≥ 10 → alert"],
    },
    {
      name: "SQL injection",
      threshold: "Pattern-matched payload detection",
      logic: ["Request payload stream", "Match against known injection patterns", "Flag matching payload", "Alert + log request"],
    },
    {
      name: "Suspicious root logins",
      threshold: "Root session from new source",
      logic: ["Auth log stream", "Filter root/privileged sessions", "Compare source against known hosts", "New source → alert"],
    },
  ],
};

export const secureCloudProject = {
  index: "03",
  category: "Secure Systems",
  title: ["Secure Cloud File", "Sharing & Audit Logging"],
  technologies: ["MERN", "JWT", "RBAC", "Persistent Audit Logging"],
  features: [
    "2-role RBAC",
    "Recipient-only authenticated downloads",
    "Share-link revocation",
    "Least-privilege access control",
  ],
  workflow: [
    "User",
    "Authentication",
    "RBAC",
    "File access",
    "Recipient validation",
    "Download",
    "Persistent audit log",
  ],
};

export const systemTransition = {
  eyebrow: "Three systems. Three problems. One engineering approach.",
  systems: [
    { index: "01", title: "Detect", subtitle: "Azure SOC", accent: "investigate" as const },
    { index: "02", title: "Build", subtitle: "Mini-SIEM", accent: "system" as const },
    { index: "03", title: "Protect", subtitle: "Secure file sharing", accent: "protect" as const },
  ],
};

export const heroSignalStages = [
  {
    id: "signal",
    label: "Signal",
    value: "4625",
    detail: "Failed authentication — Windows Security Events",
  },
  {
    id: "analyze",
    label: "Analyze",
    value: "KQL",
    detail: "Queried and filtered against Log Analytics",
  },
  {
    id: "correlate",
    label: "Correlate",
    value: "Source ↔ Account",
    detail: "Cross-referenced source IP against target account history",
  },
  {
    id: "detect",
    label: "Detect",
    value: "T1110",
    detail: "Brute force / authentication anomaly, Microsoft Sentinel",
  },
];

export const heroPanel = {
  label: "System / Security Operations",
  event: "4625",
  eventLabel: "Failed authentication",
  source: "Windows Security Events",
  pipeline: [
    "Windows",
    "Azure Monitor Agent",
    "Data Collection Rule",
    "Log Analytics",
    "Microsoft Sentinel",
  ],
  status: "Investigated",
  detection: "Brute force / authentication anomaly",
  mitre: "T1110",
};

export const workflowSteps = [
  { index: "01", title: "Collect", detail: "Security telemetry" },
  { index: "02", title: "Detect", detail: "KQL queries / detection rules" },
  { index: "03", title: "Correlate", detail: "Events, users, IPs, processes" },
  { index: "04", title: "Investigate", detail: "Timeline, context, evidence" },
  { index: "05", title: "Respond", detail: "Document, escalate, improve detection" },
];

export const skillCategories = [
  {
    title: "Security operations",
    items: [
      "SIEM", "Security monitoring", "Alert triage", "Incident investigation",
      "Log analysis", "Event correlation", "Incident response", "Security operations",
      "Threat detection", "Detection engineering", "SOC workflows", "Security analysis",
    ],
  },
  {
    title: "Cloud & SIEM",
    items: [
      "Microsoft Azure", "Azure Monitor", "Log Analytics", "Azure Monitor Agent",
      "Microsoft Sentinel", "KQL", "Windows Security Events", "Cloud security",
      "IAM", "Identity security", "Security monitoring",
    ],
  },
  {
    title: "Engineering",
    items: ["Python", "FastAPI", "REST APIs", "MongoDB", "Docker", "React", "Git", "Linux/Bash", "Node.js", "Express.js", "JavaScript", "TypeScript"],
  },
  {
    title: "Security & assessment",
    items: [
      "MITRE ATT&CK",
      "Digital forensics",
      "Threat modeling",
      "Cloud security",
      "IAM",
      "RBAC",
      "Access control",
      "Audit logging", "Digital forensics", "Threat hunting", "Vulnerability assessment",
      "Security testing", "IoT security", "Mobile security", "Firmware security",
    ],
  },
  {
    title: "Web & network security",
    items: [
      "Burp Suite",
      "Wireshark",
      "Nmap",
      "OWASP Top 10",
      "Network security",
      "Vulnerability assessment",
      "Web application security", "API security", "Network security", "IoT security", "Traffic analysis",
      "Reconnaissance", "Service enumeration", "Penetration testing", "Security assessment",
    ],
  },
];

export const experience = {
  company: "PhonePe",
  role: "CX Operations Intern",
  location: "Bengaluru, India",
  period: "Jan 2024 — May 2024",
  metrics: [
    { value: "5,000+", label: "Operational and customer records" },
    { value: "200+", label: "Operational tickets" },
    { value: "~5 hrs/week", label: "Reduction in manual reporting" },
  ],
};

export const education = [
  {
    institution: "University of Birmingham",
    program: "MSc Cybersecurity",
    period: "Sep 2024 — Jul 2026",
    location: "Edgbaston, UK",
  },
  {
    institution: "New Horizon College of Engineering",
    program: "B.E. Electrical & Electronics Engineering",
    period: "2020–2024",
    location: "Bengaluru, India",
  },
];

export const certifications = [
  { name: "Network Defense", issuer: "Cisco Networking Academy", year: "2026" },
  { name: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", year: "2025" },
  {
    name: "Configure SIEM Security Operations Using Microsoft Sentinel",
    issuer: "Microsoft Learn",
    year: "2026",
  },
  {
    name: "Secure Cloud Resources with Microsoft Security Technologies",
    issuer: "Microsoft Learn",
    year: "2026",
  },
];
