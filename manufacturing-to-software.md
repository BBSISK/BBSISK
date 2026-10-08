# From fab to pipeline: manufacturing disciplines mapped to software delivery

I spent 30 years in high-volume semiconductor manufacturing at Intel Ireland (1994–2024) before moving into software. The disciplines that kept a 24/7 fab safe, stable and improving are the same ones that keep software reliable. This page pairs each one with its software equivalent and the evidence in my own projects.

> **What this page is.** The "What I did at Intel" column is self-reported career history, like [career.md](career.md). The evidence for my software work is in the project repositories linked in the last column. Detail about Intel is kept general for confidentiality: no internal names, tool or vendor names, figures or results.

## The mapping

| Manufacturing practice | What I did at Intel | Software equivalent | Evidence in my projects |
|---|---|---|---|
| **Strategic planning** | Programme lead on factory-wide planning for the 7nm production ramp; translated factory objectives into SMART MBOs for every team member; PMP certified (2019) | Product roadmap, architecture and release planning; OKRs and SMART sprint goals | Ask Barry built in planned stages, each with a written goal and a measured result; sprints planned in Jira |
| **Tactical planning** | 7:30 daily review of the last 24 hours; tracked improvement projects on safety, quality, cost and output; weekly cross-functional yield and cost reviews; task forces on line stops and quality events | Backlog, sprint planning, stand-ups, cross-team reviews; incident response for production outages | Solo two-week sprints in Jira on my own project (since Oct 2026), not yet in a Scrum team; a High-priority bug logged and fixed within the sprint |
| **Data and metric management** | Owned safety, quality, output and cost metrics for a 24/7 area; led a factory-wide real-time machine sensor data programme for fault detection and variation reduction; statistical analysis in JMP | Observability, KPIs, evaluation metrics, dashboards; real-time telemetry and anomaly detection | 47-question evaluation set and search metrics; nightly job alerts when search quality drops |
| **Problem solving and root cause** | Model-Based Problem Solving (MBPS) with Pareto, Ishikawa (fishbone), 5 Whys, fault tree analysis and DMAIC (Define, Measure, Analyse, Improve, Control) | Hypothesis-driven debugging, incident response, postmortems; ranking bugs by impact | Scheduling bug traced to its root cause and rebuilt; search regression measured, three fixes compared, simplest shipped |
| **Quality systems** | Outgoing Quality Engineer and Process Quality Team Lead; Statistical Process Control (SPC) control charts | Automated testing and CI quality gates; monitoring dashboards and alert thresholds | 300+ automated tests; GitHub Actions blocks any deploy that fails |
| **Change control** | Strict, multi-level change control based on risk assessment; stepped approvals for controlled experiments, with Watch It plans after release | Code review and pull requests; risk-based approvals; staged rollouts; post-release monitoring with rollback | Every change reviewed and tested before merge; deploys only when CI passes, then health checks on the live site |
| **Equipment qualification** | Led the 7nm start-up equipment qualification programme | Release validation, acceptance tests, staging before production | Health and readiness checks; full evaluation re-run before switching AI model |
| **Risk management (FMEA)** | FMEA and risk quantification to drive process improvement and stability | Threat modelling, security reviews, guardrails | AI agent guardrails against prompt injection enforced in code; EU AI Act self-assessment |
| **Lean and continuous improvement** | Kaizen and value stream mapping events; 5S, PDCA (Plan, Do, Check, Act), Gemba walks and spaghetti diagrams | CI/CD flow, removing manual steps, retrospectives, code hygiene, architecture and data-flow diagrams | Push to live in minutes through an automated pipeline; architecture diagrams in project READMEs |
| **Supplier management** | Managed OEM service contracts for lithography and dry etch suppliers | Third-party APIs, cloud vendors, service levels, avoiding lock-in | One interface runs Azure OpenAI, Claude, Gemini or AWS Bedrock |
| **Capital and ROI decisions** | ROI analyses for equipment selection; led the sale of obsolete 14nm tools | Build-versus-buy; cloud and AI model cost trade-offs | AI models compared on accuracy, speed and cost; cloud budget alerts |
| **People and training** | Led engineering and technician teams; designed structured technical training; built a pipeline of technicians and engineers | Mentoring, documentation, onboarding, growing junior engineers | A README and model card for every project; two years teaching; IT and AI training for 300+ students in Tanzania |

## Real-time fault detection at factory scale

At Intel I was responsible for the factory-wide real-time machine sensor data programme: live analysis of equipment sensor data to detect faults early and reduce process variation. Platforms like this are standard across semiconductor manufacturing. They typically cover fault detection and classification, run-to-run control, equipment performance tracking, and out-of-control action plans (a defined response when a signal goes out of limits).

| Capability | My role | Software and data equivalent | Evidence in my projects |
|---|---|---|---|
| **Real-time sensor data collection, factory-wide** | Responsible for the programme across the whole factory | Data pipelines, ingestion, streaming telemetry | Ask Barry's nightly ingestion re-processes only what changed |
| **Fault detection on sensor data (models and limits)** | Real-time fault detection on machine sensor data | Anomaly detection, monitoring and alerting | Nightly job fails and emails me when quality drops below its limit |
| **Fault classification** | Part of the programme I ran | Triage and labelling; machine-learning classification | Labelled evaluation sets; every failure classified by type |
| **Out-of-control action plans** | Part of the programme I ran | Runbooks and automated incident response | Readable errors and fallbacks instead of crashes; readiness check names the failed dependency |
| **Variation reduction and yield** | Fault detection and variation reduction programme to drive yield improvement | Model and system tuning against measured metrics | Search tuned against a test set: three fixes compared, best shipped, guard added |
| **Factory-wide rollout** | Responsible for deployment and adoption across the factory's engineering teams | Platform rollout and change management: the core of forward-deployed engineering | Next: a live public-data project (Housing Pipeline Ireland) |

Real-time anomaly detection on live industrial data is what "AI in manufacturing" means in practice. I have run it at factory scale, and I now build the software side: data pipelines, evaluation, monitoring and AI agents.

## Where the software evidence lives

- [Ask Barry](https://github.com/BBSISK/ask-barry): retrieval-augmented assistant, job-ad evidence agent, evaluation, CI/CD, Terraform, Azure and AWS Bedrock
- [Wall Inspector](https://github.com/BBSISK/wall_inspector): AI agents with human-in-the-loop provenance, Docker, PostgreSQL, CI/CD
- Live: [ask-barry.onrender.com](https://ask-barry.onrender.com)
