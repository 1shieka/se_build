import { useState, useEffect, useRef, useCallback, useMemo } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600;700&display=swap');`;

const CSS = `
*{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#07090f;--bg1:#0c1020;--bg2:#101628;--bg3:#151d35;
  --border:#1a2540;--border2:#243050;
  --cyan:#38bdf8;--green:#34d399;--red:#f87171;--yellow:#fbbf24;--purple:#a78bfa;
  --text:#c8d6f0;--text2:#7a94b8;--text3:#3a4f70;
  --mono:'Share Tech Mono',monospace;--sans:'Rajdhani',sans-serif;
}
body{background:var(--bg);color:var(--text);font-family:var(--sans);min-height:100vh;}
.app{max-width:1260px;margin:0 auto;padding:18px 12px;}
.hdr{text-align:center;margin-bottom:22px;}
.hdr h1{font-size:1.9rem;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#e8f4fd;}
.hdr-sub{font-family:var(--mono);font-size:.65rem;letter-spacing:6px;color:#64ffda;display:block;margin-top:4px;}
.hdr-rule{display:flex;align-items:center;gap:10px;justify-content:center;margin-top:8px;}
.hdr-rule div{height:1px;width:90px;background:linear-gradient(90deg,transparent,var(--cyan));}
.hdr-rule div:last-child{background:linear-gradient(270deg,transparent,var(--cyan));}
.hdr-rule span{font-family:var(--mono);font-size:.58rem;color:var(--cyan);letter-spacing:2px;}
.tabs{display:flex;gap:3px;margin-bottom:16px;background:var(--bg1);padding:3px;border-radius:8px;border:1px solid var(--border);}
.tab{flex:1;padding:7px 4px;border:none;background:transparent;color:var(--text2);font-family:var(--sans);font-size:.82rem;font-weight:600;letter-spacing:.5px;cursor:pointer;border-radius:5px;transition:all .15s;}
.tab:hover{color:var(--text);}
.tab.active{background:var(--bg3);color:var(--cyan);border:1px solid var(--border2);}
.card{background:var(--bg1);border:1px solid var(--border);border-radius:8px;padding:14px;position:relative;overflow:hidden;margin-bottom:10px;}
.card::before{content:'';position:absolute;top:0;left:0;width:2px;height:100%;background:linear-gradient(180deg,var(--cyan),var(--purple));}
.clabel{font-family:var(--mono);font-size:.58rem;letter-spacing:3px;text-transform:uppercase;color:var(--cyan);margin-bottom:10px;display:flex;align-items:center;gap:6px;}
.clabel::after{content:'';flex:1;height:1px;background:var(--border);}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;}
.g5{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;}
.btn{padding:8px 10px;border-radius:5px;border:1px solid var(--border);background:var(--bg);color:var(--text2);font-family:var(--sans);font-size:.88rem;font-weight:600;cursor:pointer;letter-spacing:.5px;transition:all .15s;text-align:left;display:flex;align-items:flex-start;gap:7px;width:100%;margin-bottom:5px;}
.btn:last-child{margin-bottom:0;}
.btn:hover{border-color:var(--cyan);color:var(--text);}
.btn.sel{background:#0a1e32;border-color:var(--cyan);color:#64ffda;box-shadow:0 0 8px rgba(56,189,248,.1);}
.dot{width:6px;height:6px;border-radius:50%;background:var(--border2);flex-shrink:0;margin-top:5px;transition:all .15s;}
.btn.sel .dot{background:#64ffda;box-shadow:0 0 5px #64ffda;}
.bdesc{font-size:.68rem;color:var(--text3);font-weight:400;margin-top:2px;font-family:var(--mono);line-height:1.3;}
.btn.sel .bdesc{color:#2a6a50;}
.tile{padding:9px 7px;border-radius:6px;border:1px solid var(--border);background:var(--bg);color:var(--text2);font-family:var(--sans);font-size:.8rem;font-weight:600;cursor:pointer;transition:all .15s;text-align:center;display:flex;flex-direction:column;align-items:center;gap:2px;}
.tile:hover{border-color:var(--cyan);color:var(--text);}
.tile.sel{background:#0a1e32;border-color:var(--cyan);color:#64ffda;}
.tile.bad{border-color:var(--red)!important;color:var(--red)!important;box-shadow:0 0 8px rgba(248,113,113,.12)!important;}
.tico{font-size:1.1rem;}
.tcost{font-size:.58rem;color:var(--text3);font-family:var(--mono);}
.tile.sel .tcost{color:#1a5a3a;}
.run-btn{width:100%;padding:13px;border-radius:8px;border:1px solid var(--cyan);background:linear-gradient(135deg,#0a1e32,#07131f);color:#64ffda;font-family:var(--sans);font-size:1rem;font-weight:700;cursor:pointer;letter-spacing:3px;text-transform:uppercase;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:8px;}
.run-btn:hover{box-shadow:0 0 18px rgba(56,189,248,.18);transform:translateY(-1px);}
.run-btn:disabled{opacity:.45;cursor:not-allowed;transform:none;}
.sbanner{text-align:center;padding:13px;border-radius:8px;font-family:var(--mono);font-size:1.1rem;letter-spacing:5px;margin-bottom:10px;border:1px solid;}
.s-healthy{background:#040f08;border-color:var(--green);color:var(--green);box-shadow:0 0 18px rgba(52,211,153,.1);}
.s-degraded{background:#0f0d04;border-color:var(--yellow);color:var(--yellow);}
.s-critical{background:#0f0804;border-color:#f97316;color:#f97316;}
.s-crashed{background:#0f0404;border-color:var(--red);color:var(--red);box-shadow:0 0 18px rgba(248,113,113,.12);}
.mc{background:var(--bg1);border:1px solid var(--border);border-radius:8px;padding:12px;text-align:center;}
.mlbl{font-family:var(--mono);font-size:.53rem;letter-spacing:2px;text-transform:uppercase;color:var(--text3);margin-bottom:5px;}
.mval{font-family:var(--mono);font-size:1.4rem;color:#64ffda;}
.mval.cr{color:var(--red);}.mval.cy{color:var(--yellow);}.mval.cg{color:var(--green);}
.msub{font-size:.62rem;color:var(--text3);margin-top:2px;font-family:var(--mono);}
.bar{height:4px;background:var(--border);border-radius:2px;margin-top:5px;overflow:hidden;}
.bf{height:100%;border-radius:2px;transition:width .5s ease;}
.fb{padding:8px 11px;border-radius:5px;font-size:.86rem;font-weight:600;display:flex;align-items:flex-start;gap:7px;line-height:1.4;margin-bottom:5px;}
.fb-bad{background:#110505;border:1px solid #5a1d1d;color:#fca5a5;}
.fb-good{background:#040e08;border:1px solid #145228;color:#86efac;}
.fb-warn{background:#0e0a02;border:1px solid #6b3a0a;color:#fde68a;}
.fb-info{background:#040a14;border:1px solid #1a3a5c;color:#93c5fd;}
.log-panel{background:#050810;border:1px solid var(--border);border-radius:8px;padding:10px;height:220px;overflow-y:auto;font-family:var(--mono);font-size:.7rem;line-height:1.9;}
.log-panel::-webkit-scrollbar{width:3px;}
.log-panel::-webkit-scrollbar-thumb{background:var(--border2);}
.li{color:#64ffda;}.lw{color:var(--yellow);}.le{color:var(--red);}.lr{color:var(--green);}
.lts{color:var(--text3);margin-right:5px;}
.arch-pre{font-family:var(--mono);font-size:.7rem;line-height:1.9;background:#050810;border:1px solid var(--border);border-radius:8px;padding:14px;white-space:pre-wrap;}
.an{color:#64ffda;}.ab{color:var(--yellow);}.ai{color:var(--text3);}
.sc-card{border-radius:8px;border:1px solid var(--border);padding:11px;cursor:pointer;transition:all .15s;background:var(--bg);}
.sc-card:hover{border-color:var(--cyan);}
.sc-card.sel{border-color:var(--cyan);background:#0a1e32;}
.sc-ico{font-size:1.6rem;margin-bottom:4px;}
.sc-name{font-weight:700;font-size:.9rem;color:var(--text);}
.sc-desc{font-size:.68rem;color:var(--text2);margin-top:2px;line-height:1.35;}
.sc-meta{display:flex;gap:4px;margin-top:6px;flex-wrap:wrap;}
.badge{font-family:var(--mono);font-size:.55rem;padding:2px 6px;border-radius:3px;letter-spacing:1px;}
.bc{background:#0a2030;border:1px solid #1a4060;color:var(--cyan);}
.br{background:#1a0808;border:1px solid #4a1818;color:var(--red);}
.by{background:#140d00;border:1px solid #3a2500;color:var(--yellow);}
.bg{background:#041208;border:1px solid #0a3018;color:var(--green);}
.bp{background:#120a20;border:1px solid #2a1850;color:var(--purple);}
.cpip{width:26px;height:26px;border-radius:50%;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:.62rem;color:var(--text3);}
.cpip.done{border-color:var(--green);color:var(--green);background:#041208;}
.cpip.fail{border-color:var(--red);color:var(--red);background:#110404;}
.cpip.cur{border-color:var(--cyan);color:var(--cyan);background:#0a1e32;}
.ctrack{display:flex;gap:5px;align-items:center;margin-bottom:12px;}
.clbl2{font-family:var(--mono);font-size:.58rem;color:var(--text3);margin-left:6px;}
.scale-btn{padding:9px 12px;border-radius:6px;border:1px solid var(--border2);background:var(--bg2);color:var(--text2);font-family:var(--sans);font-size:.82rem;font-weight:600;cursor:pointer;transition:all .15s;}
.scale-btn:hover{border-color:var(--purple);color:var(--purple);}
.scale-btn:disabled{opacity:.35;cursor:not-allowed;}
.cost-row{display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid var(--border);font-size:.83rem;}
.cost-row:last-child{border-bottom:none;}
.tbar{height:38px;background:#050810;border:1px solid var(--border);border-radius:5px;overflow:hidden;position:relative;margin-bottom:8px;}
.tfill{height:100%;border-radius:5px;transition:width .4s;display:flex;align-items:center;padding-left:10px;font-family:var(--mono);font-size:.62rem;letter-spacing:1px;}
.sr{position:relative;display:inline-flex;align-items:center;justify-content:center;}
.sr svg{transform:rotate(-90deg);}
.sc{position:absolute;text-align:center;}
.sn{font-family:var(--mono);font-size:1.35rem;}
.sl{font-family:var(--mono);font-size:.48rem;letter-spacing:2px;color:var(--text3);}
@media(max-width:780px){.g2,.g3,.g4,.g5{grid-template-columns:1fr 1fr;}}
@media(max-width:480px){.g2,.g3,.g4,.g5{grid-template-columns:1fr;}}
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SCENARIOS = [
  {id:"instagram",icon:"📸",name:"Instagram",    desc:"Media-heavy social — high read traffic",          type:"Read-heavy",      diff:"Medium", tb:"bc",db_:"bg"},
  {id:"chat",     icon:"💬",name:"Chat App",     desc:"Real-time messaging + heavy writes",              type:"Write-heavy",     diff:"Medium", tb:"by",db_:"bg"},
  {id:"ecommerce",icon:"🛒",name:"E-Commerce",   desc:"Product browsing + checkout — mixed load",        type:"Balanced",        diff:"Hard",   tb:"bp",db_:"br"},
  {id:"streaming",icon:"▶️",name:"Video Stream", desc:"High bandwidth — CDN critical",                   type:"Read + CDN",      diff:"Hard",   tb:"bc",db_:"br"},
  {id:"rideshare",icon:"🚗",name:"Ride Sharing", desc:"Real-time location + matching system",            type:"Write-heavy + RT",diff:"Hard",   tb:"by",db_:"br"},
];
const SDLC_MODELS = [
  {id:"waterfall",icon:"🌊",name:"Waterfall",      desc:"Sequential — stable but slow to adapt",       bugD:-0.08,latD:0.05, adapt:0.4},
  {id:"agile_s",  icon:"🔄",name:"Agile (Scrum)",  desc:"Iterative sprints — flexible delivery",       bugD:-0.05,latD:0,    adapt:0.7},
  {id:"agile_k",  icon:"📋",name:"Agile (Kanban)", desc:"Continuous flow — visual task tracking",      bugD:-0.04,latD:0,    adapt:0.75},
  {id:"devops",   icon:"⚙️",name:"DevOps",         desc:"CI/CD automation — fastest deployment",       bugD:-0.1, latD:-0.1, adapt:0.9},
  {id:"spiral",   icon:"🌀",name:"Spiral Model",   desc:"Risk-driven cycles — safer but complex",      bugD:-0.12,latD:0.02, adapt:0.6},
];
const REQUIREMENTS = [
  {id:"performance", icon:"⚡",name:"Performance",    desc:"Minimize latency at cost of resources",  latD:-0.2,capD:0,   bugD:0,    ctD:0},
  {id:"cost",        icon:"💰",name:"Cost Efficiency",desc:"Reduce infra spend — limits capacity",   latD:0,   capD:-100,bugD:0.05, ctD:0},
  {id:"reliability", icon:"🔒",name:"Reliability",    desc:"Raise crash threshold + redundancy",     latD:0,   capD:0,   bugD:-0.05,ctD:0.3},
  {id:"scalability", icon:"📈",name:"Scalability",    desc:"Handle growth — may raise cost",         latD:0,   capD:200, bugD:0,    ctD:0.2},
  {id:"security",    icon:"🛡️",name:"Security",       desc:"Auth + encryption — slight latency hit", latD:0.05,capD:0,   bugD:-0.05,ctD:0},
];
const ARCH_COMPS = [
  {id:"loadBalancer", icon:"⚖️",name:"Load Balancer",cost:50, desc:"Distributes traffic across servers"},
  {id:"cache",        icon:"⚡",name:"Cache",         cost:40, desc:"Reduces DB hits — boosts read speed"},
  {id:"cdn",          icon:"🌐",name:"CDN",           cost:60, desc:"Global static asset delivery"},
  {id:"apiGateway",   icon:"🔀",name:"API Gateway",   cost:50, desc:"Rate-limiting + unified entry point"},
  {id:"msgQueue",     icon:"📨",name:"Msg Queue",     cost:45, desc:"Async processing — absorbs write spikes"},
  {id:"microservices",icon:"🧩",name:"Microservices", cost:80, desc:"Resilient independent services"},
];
const DB_OPTIONS = [
  {id:"sql",   icon:"🗄️",name:"SQL",           cost:70, desc:"Strong consistency — slower writes"},
  {id:"nosql", icon:"📦",name:"NoSQL",         cost:80, desc:"Fast writes — eventual consistency"},
  {id:"distdb",icon:"🌍",name:"Distributed DB",cost:100,desc:"Massive scale — high complexity"},
];
const TEST_OPTIONS = [
  {id:"basic", icon:"🧪",name:"Basic Testing",      desc:"Minimal coverage — high risk",      bugD:0.2, rec:0.3},
  {id:"medium",icon:"🔬",name:"Unit + Integration", desc:"Moderate coverage — balanced risk", bugD:0,   rec:0.5},
  {id:"full",  icon:"✅",name:"Full Suite + Load",  desc:"Production-level coverage",         bugD:-0.2,rec:0.7},
  {id:"chaos", icon:"💥",name:"Chaos Testing",      desc:"Tests random failures — elite",     bugD:-0.3,rec:0.9},
];
const DEPLOY_OPTIONS = [
  {id:"manual",    icon:"🖐️",name:"Manual Deploy",    desc:"Error-prone — raises bug risk",           latD:0,    bugD:0.2, rec:0.3},
  {id:"cicd",      icon:"🚀",name:"CI/CD Pipeline",   desc:"Automated — reduces latency + bugs",      latD:-0.1, bugD:-0.1,rec:0.6},
  {id:"bluegreen", icon:"🔵",name:"Blue-Green",       desc:"Zero-downtime switch — doubles infra",    latD:-0.05,bugD:-0.05,rec:0.8},
  {id:"canary",    icon:"🐦",name:"Canary Deploy",    desc:"Gradual rollout — minimises blast radius",latD:-0.05,bugD:-0.15,rec:0.85},
];

// ─── CALC COST ────────────────────────────────────────────────────────────────
function calcCost(arch, db) {
  let c = 0;
  arch.forEach(id => { const a = ARCH_COMPS.find(x=>x.id===id); if(a) c+=a.cost; });
  const d = DB_OPTIONS.find(x=>x.id===db); if(d) c+=d.cost;
  return c;
}

// ─── SIMULATION ENGINE ────────────────────────────────────────────────────────
function runSim(cfg, scaling, cycle) {
  const {scenario,sdlc,requirements,architecture,db,testing,deployment} = cfg;
  const sm = SDLC_MODELS.find(x=>x.id===sdlc);
  const tm = TEST_OPTIONS.find(x=>x.id===testing);
  const dm = DEPLOY_OPTIONS.find(x=>x.id===deployment);
  const isRead  = ["instagram","streaming"].includes(scenario);
  const isWrite = ["chat","rideshare"].includes(scenario);
  const isHard  = ["ecommerce","streaming","rideshare"].includes(scenario);

  let capacity=500+scaling.capacity, latency=1+scaling.latency, bugRisk=0.2, ct=1.2;

  bugRisk += sm.bugD; latency += sm.latD;
  requirements.forEach(r=>{ const rm=REQUIREMENTS.find(x=>x.id===r); if(!rm)return; latency+=rm.latD; capacity+=rm.capD; bugRisk+=rm.bugD; ct+=rm.ctD; });

  if(architecture.includes("loadBalancer")) capacity*=1.5;
  if(architecture.includes("cache"))        latency*=0.65;
  if(architecture.includes("cdn"))          latency*=0.8;
  if(architecture.includes("apiGateway"))   { latency*=0.95; bugRisk-=0.03; }
  if(architecture.includes("msgQueue"))     bugRisk-=0.05;
  if(architecture.includes("microservices")){ capacity*=1.3; bugRisk-=0.05; latency*=1.05; }

  let dbMs=80;
  if(db==="sql")   { if(isWrite){bugRisk+=0.25;latency+=0.15;dbMs=200;} else dbMs=100; }
  if(db==="nosql") { if(isWrite){latency-=0.05;dbMs=60;} if(isRead){latency-=0.1;dbMs=50;} }
  if(db==="distdb"){ capacity*=1.4; dbMs=40; bugRisk+=0.03; }

  bugRisk+=tm.bugD; latency+=dm.latD; bugRisk+=dm.bugD;
  if(isHard){ ct-=0.1; bugRisk+=0.03; }

  const spike   = Math.round(200*(isHard?1.3:1)*(1+cycle*0.15));
  const users   = 1000+spike;
  const load    = users/capacity;
  const finLat  = Math.max(0.1, latency*load);
  bugRisk       = Math.max(0, Math.min(1, bugRisk));

  let cacheHit=0;
  if(architecture.includes("cache")){
    cacheHit=60; if(architecture.includes("cdn")) cacheHit+=15; if(isRead) cacheHit+=10; cacheHit=Math.min(95,cacheHit);
  }
  const errRate  = Math.min(100, bugRisk*80+(load>ct?20:0));
  const queueLen = architecture.includes("msgQueue")?Math.round(Math.max(0,(load-0.7)*120)):0;
  const reqSec   = Math.round(users/(finLat*2));
  const uptime   = load>ct||bugRisk>0.6?70:bugRisk>0.45||load>ct*0.9?91:bugRisk>0.3||load>ct*0.75?97:99.9;

  let status="HEALTHY";
  if(load>ct||bugRisk>0.6) status="CRASHED";
  else if(bugRisk>0.45||load>ct*0.9) status="CRITICAL";
  else if(bugRisk>0.3||load>ct*0.75) status="DEGRADED";

  const costTotal=calcCost(architecture,db);
  const effScore=Math.max(0,100-costTotal/8);
  const score=Math.max(0,Math.min(100,Math.round(
    (uptime/99.9)*40+Math.max(0,1-finLat/3)*30+Math.max(0,1-errRate/40)*20+effScore/100*10
  )));

  const bad=[];
  if(isRead&&!architecture.includes("cache")) bad.push("cache");
  if(scenario==="streaming"&&!architecture.includes("cdn")) bad.push("cdn");
  if(isWrite&&db==="sql") bad.push("sql");
  if(!architecture.includes("loadBalancer")&&isHard) bad.push("loadBalancer");

  return {load,latency:finLat,bugRisk,score,status,capacity,crashThreshold:ct,cacheHit,errRate,queueLen,reqSec,dbMs,uptime,spike,users,costTotal,bad};
}

// ─── FEEDBACK ENGINE ──────────────────────────────────────────────────────────
function genFeedback(cfg, res) {
  const {scenario,sdlc,requirements,architecture,db,testing,deployment}=cfg;
  const isRead  = ["instagram","streaming"].includes(scenario);
  const isWrite = ["chat","rideshare"].includes(scenario);
  const fb=[];
  const add=(t,m)=>fb.push({t,m});
  if(sdlc==="waterfall") add("bad","Waterfall slowed adaptation — traffic spikes hit before changes deployed.");
  if(sdlc==="devops")    add("good","DevOps CI/CD reduced latency and accelerated release cycles.");
  if(sdlc==="spiral")    add("good","Spiral model risk assessments reduced unexpected failures.");
  if(sdlc==="agile_k")   add("info","Kanban continuous flow minimised feature delivery bottlenecks.");
  if(isRead&&!architecture.includes("cache")) add("bad","Performance: No cache on read-heavy system — latency unnecessarily high.");
  if(scenario==="streaming"&&!architecture.includes("cdn")) add("bad","Architecture: Video streaming without CDN causes bandwidth saturation.");
  if(!architecture.includes("loadBalancer")&&res.load>0.8) add("bad","Architecture: No Load Balancer — single point of failure under high load.");
  if(architecture.includes("msgQueue")&&isWrite) add("good","Message Queue absorbed write spikes — burst load handled efficiently.");
  if(architecture.includes("apiGateway")) add("good","API Gateway added rate-limiting and reduced bug exposure.");
  if(db==="sql"&&isWrite) add("bad","Reliability: SQL under write-heavy load causes queue buildup + latency spikes.");
  if(db==="nosql"&&isWrite) add("good","NoSQL handled write-heavy workload efficiently.");
  if(requirements.includes("cost")&&!architecture.includes("loadBalancer")) add("warn","Cost optimisation cut capacity without a Load Balancer — risky tradeoff.");
  if(testing==="basic") add("bad","Reliability: Basic testing left critical bugs — error rate dangerously high.");
  if(testing==="chaos") add("good","Chaos testing prepared system for real-world random failures.");
  if(deployment==="manual") add("bad","DevOps: Manual deploy introduced human errors and raised bug risk.");
  if(deployment==="canary") add("good","Canary deployment reduced risk via gradual traffic routing.");
  if(res.cacheHit>80) add("good",`Cache hit rate ${res.cacheHit}% — effectively offloading the database.`);
  if(res.errRate>40)  add("bad",`Error rate ${res.errRate.toFixed(0)}% — system critically unstable.`);
  return fb.slice(0,8);
}

// ─── LOG ENGINE ───────────────────────────────────────────────────────────────
function genLogs(res, cycle) {
  const ts=()=>{const d=new Date();return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`;};
  const L=[];
  const a=(t,m)=>L.push({t,m,s:ts()});
  a("i",`Cycle ${cycle+1} started — ${res.users} concurrent users`);
  a("i",`Traffic spike injected: +${res.spike} users`);
  if(res.load>1.0)       a("w",`Load ${res.load.toFixed(2)} exceeds normal threshold`);
  if(res.cacheHit>0)     a("i",`Cache hit rate: ${res.cacheHit}%`);
  if(res.queueLen>0)     a("w",`Message queue: ${res.queueLen} items pending`);
  if(res.dbMs>150)       a("w",`DB response elevated: ${res.dbMs}ms`);
  if(res.bugRisk>0.5)    a("e",`Bug risk critical: ${(res.bugRisk*100).toFixed(0)}%`);
  if(res.status==="CRASHED")   a("e","System CRASHED — all services unreachable");
  else if(res.status==="CRITICAL") a("w","System CRITICAL — partial degradation detected");
  else if(res.status==="DEGRADED") a("w","System DEGRADED — performance below SLA");
  else a("r","All systems nominal — healthy operation");
  return L;
}

// ─── ARCH PREVIEW ─────────────────────────────────────────────────────────────
function buildArch(cfg, res) {
  const {scenario,architecture,db}=cfg;
  const has=id=>architecture.includes(id);
  const A=s=>`<an>${s}</an>`, B=s=>`<ab>${s}</ab>`, I=s=>`<ai>${s}</ai>`;
  const scName=SCENARIOS.find(x=>x.id===scenario)?.name||scenario;
  const dbName=DB_OPTIONS.find(x=>x.id===db)?.name||db;
  let lines=[`  [ ${A(scName+" Users")} ]`];
  lines.push(`         ↓`);
  if(has("cdn")) lines.push(`  [ ${A("CDN 🌐")} ] ${B("← static cache")}`);
  else           lines.push(`  ${I("[ no CDN — static latency high ]")}`);
  if(has("apiGateway")) lines.push(`         ↓\n  [ ${A("API Gateway 🔀")} ]`);
  lines.push(`         ↓`);
  if(has("loadBalancer")) lines.push(`  [ ${A("Load Balancer ⚖️")} ]`);
  else                    lines.push(`  ${B("⚠ no load balancer — single point of failure")}`);
  if(has("microservices")) lines.push(`         ↓\n  [ ${A("Microservices 🧩")} ]`);
  else                     lines.push(`         ↓\n  [ ${A("App Servers")} ]`);
  if(has("msgQueue")) lines.push(`         ↓\n  [ ${A("Message Queue 📨")} ]`);
  if(has("cache")) lines.push(`         ↓\n  [ ${A("Cache ⚡")} ] ${B(`← hit rate ${res?res.cacheHit:60}%`)}`);
  lines.push(`         ↓\n  [ ${A(dbName+" DB")} ]`);
  if(res) lines.push(`\n  Cap: ${Math.round(res.capacity)} req/s  Threshold: ${res.crashThreshold.toFixed(2)}\n  Load: ${res.load.toFixed(2)}  Latency: ${res.latency.toFixed(2)}s  DB: ${res.dbMs}ms`);
  return lines.join("\n");
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function ScoreRing({score}) {
  const r=40,circ=2*Math.PI*r,pct=Math.max(0,Math.min(100,score));
  const col=pct>70?"#34d399":pct>40?"#fbbf24":"#f87171";
  return (
    <div className="sr" style={{width:100,height:100}}>
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#1a2540" strokeWidth="7"/>
        <circle cx="50" cy="50" r={r} fill="none" stroke={col} strokeWidth="7"
          strokeDasharray={circ} strokeDashoffset={circ-(pct/100)*circ}
          strokeLinecap="round" style={{transition:"stroke-dashoffset .6s ease"}}/>
      </svg>
      <div className="sc"><div className="sn" style={{color:col}}>{pct}</div><div className="sl">SCORE</div></div>
    </div>
  );
}

function Met({label,val,sub,col,bp,bc}) {
  return (
    <div className="mc">
      <div className="mlbl">{label}</div>
      <div className={`mval ${col||""}`}>{val}</div>
      {sub&&<div className="msub">{sub}</div>}
      {bp!==undefined&&<div className="bar"><div className="bf" style={{width:`${bp}%`,background:bc||"#64ffda"}}/></div>}
    </div>
  );
}

function LogPanel({logs}) {
  const ref=useRef(null);
  useEffect(()=>{if(ref.current)ref.current.scrollTop=ref.current.scrollHeight;},[logs]);
  const cls={i:"li",w:"lw",e:"le",r:"lr"};
  const lbl={i:"INFO",w:"WARN",e:"ERROR",r:"RECOVERY"};
  return (
    <div className="log-panel" ref={ref}>
      {logs.length===0&&<span style={{color:"var(--text3)"}}>{"// run simulation to see event log"}</span>}
      {logs.map((l,i)=>(
        <div key={i} className={cls[l.t]||"li"}>
          <span className="lts">[{l.s}]</span>
          <span>[{lbl[l.t]||"INFO"}]</span> {l.m}
        </div>
      ))}
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [scenario,    setScenario]    = useState("instagram");
  const [sdlc,        setSdlc]        = useState("agile_s");
  const [reqs,        setReqs]        = useState(["performance"]);
  const [arch,        setArch]        = useState(["loadBalancer","cache"]);
  const [db,          setDb]          = useState("nosql");
  const [testing,     setTesting]     = useState("medium");
  const [deploy,      setDeploy]      = useState("cicd");
  const [result,      setResult]      = useState(null);
  const [logs,        setLogs]        = useState([]);
  const [feedback,    setFeedback]    = useState([]);
  const [cycle,       setCycle]       = useState(0);
  const [cycles,      setCycles]      = useState([]);
  const [gameOver,    setGameOver]    = useState(false);
  const [gameWon,     setGameWon]     = useState(false);
  const [scaling,     setScaling]     = useState({capacity:0,latency:0});
  const [tab,         setTab]         = useState("configure");
  const [autoRun,     setAutoRun]     = useState(false);
  const autoRef = useRef(null);
  const MAX = 5;

  const cfg = useMemo(()=>({scenario,sdlc,requirements:reqs,architecture:arch,db,testing,deployment:deploy}),[scenario,sdlc,reqs,arch,db,testing,deploy]);
  const toggleReq  = id => setReqs(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const toggleArch = id => setArch(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);

  const handleRun = useCallback(() => {
    if(gameOver||gameWon) return;
    const res = runSim(cfg, scaling, cycle);
    const newLogs = genLogs(res, cycle);
    const fb = genFeedback(cfg, res);
    const survived = res.status!=="CRASHED" && res.errRate<=40;
    const nc = [...cycles, survived];
    setResult(res); setLogs(p=>[...p,...newLogs].slice(-80));
    setFeedback(fb); setCycles(nc);
    if(!survived){ setGameOver(true); setAutoRun(false); }
    else if(nc.length>=MAX){ setGameWon(true); setAutoRun(false); }
    else setCycle(c=>c+1);
    setTab("results");
  }, [cfg, scaling, cycle, cycles, gameOver, gameWon]);

  useEffect(()=>{
    if(autoRun&&!gameOver&&!gameWon) autoRef.current=setInterval(()=>handleRun(),2800);
    else clearInterval(autoRef.current);
    return ()=>clearInterval(autoRef.current);
  },[autoRun,handleRun,gameOver,gameWon]);

  const handleReset = () => {
    setResult(null);setLogs([]);setFeedback([]);setCycle(0);setCycles([]);
    setGameOver(false);setGameWon(false);setScaling({capacity:0,latency:0});setAutoRun(false);setTab("configure");
  };

  const archHtml = buildArch(cfg, result);
  const costTotal = calcCost(arch,db)+(scaling.capacity/150)*30;

  const s班= !result?"":result.status==="HEALTHY"?"s-healthy":result.status==="DEGRADED"?"s-degraded":result.status==="CRITICAL"?"s-critical":"s-crashed";

  return (
    <>
      <style>{FONTS}</style><style>{CSS}</style>
      <div className="app">

        <div className="hdr">
          <h1>System Design Builder<span className="hdr-sub">SDLC SIMULATION ENGINE v2.0</span></h1>
          <div className="hdr-rule"><div/><span>INDUSTRY SIMULATION PLATFORM</span><div/></div>
        </div>

        {gameWon&&<div className="sbanner s-healthy">🏆 VICTORY — SURVIVED {MAX} CYCLES — SYSTEM ARCHITECT CERTIFIED</div>}
        {gameOver&&<div className="sbanner s-crashed">💥 SYSTEM FAILURE — GAME OVER — PRESS RESET</div>}

        {/* Cycle tracker */}
        <div className="ctrack">
          {Array.from({length:MAX}).map((_,i)=>{
            const cl=i<cycles.length?(cycles[i]?"done":"fail"):i===cycles.length?"cur":"";
            return <div key={i} className={`cpip ${cl}`}>{i+1}</div>;
          })}
          <span className="clbl2">{"// SURVIVE "}{MAX}{" CYCLES TO WIN"}</span>
        </div>

        <div className="tabs">
          {[["configure","⚙ Configure"],["results","📊 Results"],["logs","📋 Event Log"],["arch","🏗 Architecture"],["costs","💰 Cost Model"]].map(([id,lbl])=>(
            <button key={id} className={`tab ${tab===id?"active":""}`} onClick={()=>setTab(id)}>{lbl}</button>
          ))}
        </div>

        {/* ── CONFIGURE ─────────────────────────────────────────────── */}
        {tab==="configure"&&<>
          <div className="card">
            <div className="clabel">{"01 // Scenario"}</div>
            <div className="g5">
              {SCENARIOS.map(s=>(
                <div key={s.id} className={`sc-card ${scenario===s.id?"sel":""}`} onClick={()=>setScenario(s.id)}>
                  <div className="sc-ico">{s.icon}</div>
                  <div className="sc-name">{s.name}</div>
                  <div className="sc-desc">{s.desc}</div>
                  <div className="sc-meta">
                    <span className={`badge ${s.tb}`}>{s.type}</span>
                    <span className={`badge ${s.db_}`}>{s.diff}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="g2">
            <div className="card">
              <div className="clabel">{"02 // SDLC Model"}</div>
              {SDLC_MODELS.map(m=>(
                <button key={m.id} className={`btn ${sdlc===m.id?"sel":""}`} onClick={()=>setSdlc(m.id)}>
                  <span className="dot"/><div><div>{m.icon} {m.name}</div><div className="bdesc">{m.desc}</div></div>
                </button>
              ))}
            </div>
            <div className="card">
              <div className="clabel">{"03 // Requirements"}<span style={{color:"var(--text3)",fontSize:".55rem"}}>(multi-select)</span></div>
              {REQUIREMENTS.map(r=>(
                <button key={r.id} className={`btn ${reqs.includes(r.id)?"sel":""}`} onClick={()=>toggleReq(r.id)}>
                  <span className="dot"/><div><div>{r.icon} {r.name}</div><div className="bdesc">{r.desc}</div></div>
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="clabel">{"04 // Architecture Components"}<span style={{color:"var(--text3)",fontSize:".55rem"}}>(multi-select)</span></div>
            <div className="g4" style={{marginBottom:8}}>
              {ARCH_COMPS.map(a=>{
                const isBad=result?.bad?.includes(a.id)&&arch.includes(a.id);
                return (
                  <div key={a.id} className={`tile ${arch.includes(a.id)?"sel":""} ${isBad?"bad":""}`} onClick={()=>toggleArch(a.id)}>
                    <span className="tico">{a.icon}</span>{a.name}
                    <span className="tcost">${a.cost}/mo</span>
                    {isBad&&<span style={{fontSize:".55rem",color:"var(--red)"}}>⚠ BAD CHOICE</span>}
                  </div>
                );
              })}
            </div>
            <div className="clabel" style={{marginTop:8}}>Database Layer</div>
            <div className="g3">
              {DB_OPTIONS.map(d=>{
                const isBad=result?.bad?.includes(d.id)&&db===d.id;
                return (
                  <div key={d.id} className={`tile ${db===d.id?"sel":""} ${isBad?"bad":""}`} onClick={()=>setDb(d.id)}>
                    <span className="tico">{d.icon}</span>{d.name}
                    <span className="tcost">${d.cost}/mo</span>
                    <span style={{fontSize:".62rem",color:"var(--text3)",textAlign:"center"}}>{d.desc}</span>
                    {isBad&&<span style={{fontSize:".55rem",color:"var(--red)"}}>⚠ BAD CHOICE</span>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="g2">
            <div className="card">
              <div className="clabel">{"05 // Testing Strategy"}</div>
              {TEST_OPTIONS.map(t=>(
                <button key={t.id} className={`btn ${testing===t.id?"sel":""}`} onClick={()=>setTesting(t.id)}>
                  <span className="dot"/><div><div>{t.icon} {t.name}</div><div className="bdesc">{t.desc}</div></div>
                </button>
              ))}
            </div>
            <div className="card">
              <div className="clabel">{"06 // Deployment Strategy"}</div>
              {DEPLOY_OPTIONS.map(d=>(
                <button key={d.id} className={`btn ${deploy===d.id?"sel":""}`} onClick={()=>setDeploy(d.id)}>
                  <span className="dot"/><div><div>{d.icon} {d.name}</div><div className="bdesc">{d.desc}</div></div>
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="clabel">{"07 // Scaling Options"}</div>
            <div className="g3">
              <button className="scale-btn" disabled={gameOver||gameWon} onClick={()=>setScaling(p=>({...p,capacity:p.capacity+150}))}>
                📡 Scale Servers<br/><span style={{fontSize:".7rem",color:"var(--text3)"}}>+150 cap · +$30/mo</span>
              </button>
              <button className="scale-btn" disabled={gameOver||gameWon} onClick={()=>setScaling(p=>({...p,latency:Math.max(-0.4,p.latency-0.05)}))}>
                🔼 Upgrade DB<br/><span style={{fontSize:".7rem",color:"var(--text3)"}}>-0.05s latency · +$50/mo</span>
              </button>
              <button className="scale-btn" disabled={gameOver||gameWon||arch.includes("microservices")} onClick={()=>toggleArch("microservices")}>
                🧩 Add Microservices<br/><span style={{fontSize:".7rem",color:"var(--text3)"}}>+capacity +resilience</span>
              </button>
            </div>
            {(scaling.capacity>0||scaling.latency<0)&&
              <div style={{marginTop:8,fontFamily:"var(--mono)",fontSize:".66rem",color:"var(--green)"}}>
                Scaling active: +{scaling.capacity} capacity · {scaling.latency.toFixed(2)}s latency bonus
              </div>
            }
          </div>

          <div className="g2">
            <button className="run-btn" disabled={gameOver||gameWon} onClick={handleRun}>
              🚀 Run Simulation — Cycle {cycle+1}
            </button>
            <button className="run-btn" style={{borderColor:autoRun?"var(--red)":"var(--purple)",color:autoRun?"var(--red)":"var(--purple)"}}
              disabled={gameOver||gameWon} onClick={()=>setAutoRun(p=>!p)}>
              {autoRun?"⏹ Stop Auto-Run":"⏵ Auto-Run Mode"}
            </button>
          </div>
          {(gameOver||gameWon)&&
            <button className="run-btn" style={{borderColor:"var(--yellow)",color:"var(--yellow)"}} onClick={handleReset}>
              🔁 Reset Simulation
            </button>
          }
        </>}

        {/* ── RESULTS ───────────────────────────────────────────────── */}
        {tab==="results"&&<>
          {!result
            ?<div className="card" style={{textAlign:"center",padding:40,color:"var(--text3)",fontFamily:"var(--mono)",fontSize:".78rem"}}>{"// run simulation to see results"}</div>
            :<>
              <div className={`sbanner ${s班}`}>
                {result.status==="HEALTHY"&&"✓ SYSTEM HEALTHY"}
                {result.status==="DEGRADED"&&"⚠ SYSTEM DEGRADED"}
                {result.status==="CRITICAL"&&"⚡ SYSTEM CRITICAL"}
                {result.status==="CRASHED"&&"✗ SYSTEM CRASHED"}
                {" "}&nbsp;·&nbsp; CYCLE {cycle}/{MAX}
              </div>

              {/* Traffic bar */}
              <div className="tbar">
                <div className="tfill" style={{
                  width:`${Math.min(100,(result.load/result.crashThreshold)*100)}%`,
                  background:result.load>result.crashThreshold?"#f87171":result.load>result.crashThreshold*0.8?"#fbbf24":"#34d399"
                }}>
                  {result.users} users — load {result.load.toFixed(2)} / threshold {result.crashThreshold.toFixed(2)}
                </div>
              </div>

              <div className="g4" style={{marginBottom:10}}>
                <Met label="Req / sec"   val={result.reqSec}            sub={`${result.users} users`} col={result.reqSec<150?"cr":""} bp={Math.min(100,result.reqSec/5)} bc="#38bdf8"/>
                <Met label="Latency (s)" val={result.latency.toFixed(2)} col={result.latency>2?"cr":result.latency>1?"cy":""} bp={Math.min(100,result.latency/3*100)} bc={result.latency>2?"#f87171":"#fbbf24"}/>
                <Met label="Error Rate"  val={`${result.errRate.toFixed(1)}%`} col={result.errRate>40?"cr":result.errRate>20?"cy":"cg"} bp={result.errRate} bc={result.errRate>40?"#f87171":"#fbbf24"}/>
                <Met label="Bug Risk"    val={`${(result.bugRisk*100).toFixed(0)}%`} col={result.bugRisk>0.6?"cr":result.bugRisk>0.4?"cy":"cg"} bp={result.bugRisk*100} bc="#f87171"/>
              </div>
              <div className="g4" style={{marginBottom:10}}>
                <Met label="Cache Hit %"  val={result.cacheHit>0?`${result.cacheHit}%`:"—"} col={result.cacheHit>75?"cg":result.cacheHit>0?"cy":"cr"} bp={result.cacheHit} bc="#34d399"/>
                <Met label="DB Response"  val={`${result.dbMs}ms`} col={result.dbMs>150?"cr":result.dbMs>100?"cy":"cg"} bp={Math.min(100,result.dbMs/2)} bc="#f87171"/>
                <Met label="Queue Length" val={result.queueLen>0?result.queueLen:"—"} col={result.queueLen>50?"cy":""} bp={Math.min(100,result.queueLen)} bc="#fbbf24"/>
                <Met label="Uptime"       val={`${result.uptime}%`} col={result.uptime>99?"cg":result.uptime>95?"cy":"cr"} bp={result.uptime} bc="#34d399"/>
              </div>

              <div className="card">
                <div className="clabel">{"// System Score"}</div>
                <div style={{display:"flex",alignItems:"center",gap:22,flexWrap:"wrap"}}>
                  <ScoreRing score={result.score}/>
                  <div style={{flex:1,fontFamily:"var(--mono)",fontSize:".68rem",color:"var(--text3)",lineHeight:2.1}}>
                    <div>UPTIME SCORE&nbsp;&nbsp;&nbsp;&nbsp;{((result.uptime/99.9)*40).toFixed(1)}/40</div>
                    <div>LATENCY SCORE&nbsp;&nbsp;{(Math.max(0,1-result.latency/3)*30).toFixed(1)}/30</div>
                    <div>ERROR SCORE&nbsp;&nbsp;&nbsp;&nbsp;{(Math.max(0,1-result.errRate/40)*20).toFixed(1)}/20</div>
                    <div>COST SCORE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{(Math.max(0,100-result.costTotal/8)/100*10).toFixed(1)}/10</div>
                  </div>
                  <div style={{textAlign:"center"}}>
                    <div style={{fontFamily:"var(--mono)",fontSize:".58rem",color:"var(--text3)",marginBottom:4}}>INFRA COST</div>
                    <div style={{fontFamily:"var(--mono)",fontSize:"1.2rem",color:"var(--yellow)"}}>${costTotal}/mo</div>
                  </div>
                </div>
              </div>

              {feedback.length>0&&<div className="card">
                <div className="clabel">{"// Smart Feedback Engine"}</div>
                {feedback.map((f,i)=>(
                  <div key={i} className={`fb fb-${f.t}`}>
                    <span>{f.t==="bad"?"❌":f.t==="good"?"✅":f.t==="warn"?"⚠️":"ℹ️"}</span>{f.m}
                  </div>
                ))}
              </div>}
            </>
          }
        </>}

        {/* ── LOGS ──────────────────────────────────────────────────── */}
        {tab==="logs"&&<div className="card">
          <div className="clabel">{"// Event Log — Real-time System Events"}</div>
          <LogPanel logs={logs}/>
          {logs.length>0&&<button onClick={()=>setLogs([])} style={{marginTop:7,background:"transparent",border:"1px solid var(--border)",color:"var(--text3)",padding:"3px 10px",borderRadius:4,cursor:"pointer",fontFamily:"var(--mono)",fontSize:".62rem"}}>CLEAR</button>}
        </div>}

        {/* ── ARCHITECTURE ──────────────────────────────────────────── */}
        {tab==="arch"&&<div className="card">
          <div className="clabel">{"// Architecture Preview"}</div>
          <div className="arch-pre" dangerouslySetInnerHTML={{__html:archHtml
            .replace(/<an>/g,'<span class="an">').replace(/<\/an>/g,'</span>')
            .replace(/<ab>/g,'<span class="ab">').replace(/<\/ab>/g,'</span>')
            .replace(/<ai>/g,'<span class="ai">').replace(/<\/ai>/g,'</span>')}}/>
        </div>}

        {/* ── COSTS ─────────────────────────────────────────────────── */}
        {tab==="costs"&&<div className="card">
          <div className="clabel">{"// Cost Model — Monthly Infrastructure"}</div>
          {[...ARCH_COMPS,...DB_OPTIONS].filter(c=>ARCH_COMPS.find(x=>x.id===c.id)?arch.includes(c.id):db===c.id).map(c=>(
            <div key={c.id} className="cost-row"><span>{c.icon} {c.name}</span><span style={{fontFamily:"var(--mono)",color:"var(--cyan)"}}>${c.cost}/mo</span></div>
          ))}
          {scaling.capacity>0&&<div className="cost-row"><span>📡 Scaled Servers ({Math.round(scaling.capacity/150)}x)</span><span style={{fontFamily:"var(--mono)",color:"var(--cyan)"}}>${(scaling.capacity/150)*30}/mo</span></div>}
          <div className="cost-row" style={{marginTop:8,paddingTop:8,borderTop:"1px solid var(--border2)"}}>
            <span style={{fontWeight:700,color:"var(--text)"}}>TOTAL MONTHLY COST</span>
            <span style={{fontFamily:"var(--mono)",fontSize:"1.1rem",color:"#64ffda"}}>${costTotal}/mo</span>
          </div>
          {result&&<div style={{marginTop:10,fontFamily:"var(--mono)",fontSize:".66rem",color:"var(--text3)"}}>
            Cost Efficiency Score: <span style={{color:"var(--cyan)"}}>{Math.max(0,Math.round(100-result.costTotal/8))}/100</span> — lower cost with high performance = better efficiency
          </div>}
        </div>}

      </div>
    </>
  );
}
