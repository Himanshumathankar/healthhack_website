export const event = {
  name: 'Health Hackathon 3.0',
  subtitle: 'Global Health Access Innovation Challenge – Next Generation',
  hackathon: '28th & 29th January 2027',
  workshop: '27th January 2027',
  venue: 'VIT Bhopal University',
  email: 'healthhack@vitbhopal.ac.in',
  registrationUrl: 'https://forms.gle/wxTCu2gxwcBePpDD8',
  qrDestination: 'https://www.canvaqr.com/RGK9lxDFrM',
  brochure: '/health-hackathon-3-brochure.pdf',
  portalUrl: 'https://vitbhopal.ac.in/health-hackathon-2026-d/',
  fee: '₹2,000',
  feeUsd: '$21',
  maxMembers: 6,
  address: 'Bhopal–Indore Highway, Kothrikalan, Sehore, Madhya Pradesh 466 114',
  universityPhone: '+91-7560 350 900 / 901 / 902',
  universityWebsite: 'https://vitbhopal.ac.in',
  initiative: "Institution's Innovation Council (Ministry of Education Initiative)",
  abstract: [
    'The Next-Gen Global Health Access Innovation Challenge is an interdisciplinary platform uniting data scientists, engineers, healthcare professionals, innovators, and students worldwide to address critical barriers in healthcare delivery. Jointly organized by VIT Bhopal University and Johns Hopkins University, the challenge focuses on developing transformative, scalable solutions that enhance accessibility, equity, and efficiency for rural, and resource-limited communities.',
    'Participants will explore key areas including equitable telehealth, predictive and preventive health intelligence, affordable diagnostics and devices, personalized care, chronic disease and elderly care, maternal and child health, mental health accessibility, secure data systems, community empowerment tools, supply-chain optimization, and climate-resilient health strategies. Emphasis is placed on responsible AI, frugal innovation, digital health literacy, and ethical frameworks that protect patient privacy.',
    'Through collaboration, access to datasets, APIs, and mentorship, the challenge aims to produce practical prototypes that can be deployed at scale. The goal is to bridge geographical, economic, and technological gaps, advancing a future where quality healthcare is a universal right powered by next-generation technologies and human-centered design.'
  ],
};
export const tracks = [
  ['Equitable Access & Telehealth','Bring healthcare closer to underserved communities.','Video'],
  ['Predictive & Preventive Health Intelligence','Help turn health insights into earlier action.','Activity'],
  ['Affordable & Scalable Health Technologies','Make diagnostics and devices accessible at scale.','Cpu'],
  ['Personalized & Precision Care','Build care around individual needs.','Dna'],
  ['Chronic Disease & Elderly Care Solutions','Support better care across the course of life.','HeartPulse'],
  ['Maternal, Child & Mental Health Access','Expand access to essential care and wellbeing.','HeartHandshake'],
  ['Secure, Interoperable & Ethical Health Systems','Connect health systems while protecting privacy.','ShieldCheck'],
  ['Community Empowerment & Digital Health Literacy','Give communities the tools to shape their health.','Users'],
  ['Supply Chain, Resource & Emergency Optimization','Get resources and care where they are needed.','Cross'],
  ['Environmental & Climate-Resilient Health','Build healthier futures in a changing climate.','Leaf'],
] as const;
export const milestones = [
  {label:'Date of Registration Starts',date:'5th October 2026',start:'2026-10-05',end:'2026-10-05'},
  {label:'Idea Submission Date',date:'31st October 2026',start:'2026-10-31',end:'2026-10-31'},
  {label:'Review/Shortlisting of Ideas',date:'20th November 2026',start:'2026-11-20',end:'2026-11-20'},
  {label:'Revised idea submission',date:'27th November 2026',start:'2026-11-27',end:'2026-11-27'},
  {label:'Registration for final phase',date:'28th Nov 2026 to 31st Dec 2026',start:'2026-11-28',end:'2026-12-31'},
  {label:'Workshop',date:'27th January 2027',start:'2027-01-27',end:'2027-01-27'},
  {label:'Hackathon',date:'28th & 29th January 2027',start:'2027-01-28',end:'2027-01-29'},
];
export const prizes = [
  {place:'1st',inr:'₹1,00,000',usd:'$1,055'}, {place:'2nd',inr:'₹50,000',usd:'$528'},
  {place:'3rd',inr:'₹25,000',usd:'$264'}, {place:'4th',inr:'₹10,000',usd:'$106'},
  {place:'5th',inr:'₹5,000',usd:'$53'},
];
export type Person = {name:string;role:string;portrait?:{src:string;width:number;height:number;objectPosition:string}};
export const committee: {title:string;people:Person[]}[] = [
  {title:'Chief Patron',people:[{name:"Hon’ble Dr. G. Viswanathan",role:'Founder & Chancellor, VIT Bhopal University',portrait:{src:'/assets/committee/g-viswanathan.webp',width:275,height:275,objectPosition:'50% 50%'}}]},
  {title:'Patrons',people:[
  {name:'Dr. Sankar Viswanathan',role:'Vice President, VIT Bhopal University',portrait:{src:'/assets/committee/sankar-viswanathan.webp',width:275,height:275,objectPosition:'50% 50%'}},
  {name:'Ms. Kadhambari S. Viswanathan',role:'Assistant Vice President, VIT Bhopal University',portrait:{src:'/assets/committee/kadhambari-s-viswanathan.webp',width:275,height:275,objectPosition:'50% 50%'}},
  {name:'Ms. Ramani Balasundaram',role:'Trustee, VIT Bhopal University',portrait:{src:'/assets/committee/ramani-balasundaram.webp',width:255,height:255,objectPosition:'50% 50%'}}]},
  {title:'Co-Patrons',people:[
  {name:'Dr. Satish Kumar Modh',role:'Vice Chancellor, VIT Bhopal University',portrait:{src:'/assets/committee/satish-kumar-modh.webp',width:600,height:600,objectPosition:'50% 50%'}},
  {name:'Dr. Sridevi Sarma',role:'Vice Dean for Graduate Education, Whiting School of Engineering | Professor, Biomedical Engineering | Associate Director, Institute for Computational Medicine | Johns Hopkins University, USA',portrait:{src:'/assets/committee/sridevi-sarma.webp',width:600,height:600,objectPosition:'50% 50%'}},
  {name:'Dr. T. B. Sridharan',role:'Pro-Vice Chancellor, VIT Bhopal University',portrait:{src:'/assets/committee/t-b-sridharan.webp',width:275,height:275,objectPosition:'50% 50%'}},
  {name:'Dr. Gyan Prakash Mishra',role:'Registrar, VIT Bhopal University',portrait:{src:'/assets/committee/gyan-prakash-mishra.webp',width:762,height:1024,objectPosition:'50% 0%'}},
  {name:'Dr. Prabakar S.',role:'Director Operations, VIT Bhopal University',portrait:{src:'/assets/committee/prabakar-s.webp',width:800,height:800,objectPosition:'50% 50%'}}]},
  {title:'Convenors',people:[
  {name:'Dr. Siddhartha Maiti',role:'Associate Professor & Programme Chair, School of Biosciences Engineering & Technology, VIT Bhopal University',portrait:{src:'/assets/committee/siddhartha-maiti.webp',width:768,height:768,objectPosition:'50% 50%'}},
  {name:'Dr. Siddharth Singh Chouhan',role:'Assistant Professor Senior & Programme Chair, School of Computing Science Engineering and Artificial Intelligence, VIT Bhopal University',portrait:{src:'/assets/committee/siddharth-singh-chouhan.webp',width:600,height:600,objectPosition:'50% 50%'}},
  {name:'Dr. Youseph Yazdi',role:'Associate Professor, Biomedical Engineering | Executive Director, Center for Bioengineering Innovation and Design (CBID) | Johns Hopkins University, USA',portrait:{src:'/assets/committee/youseph-yazdi.webp',width:300,height:300,objectPosition:'50% 50%'}},
  {name:'Dr. Hedy Alavi',role:'Associate Dean for Global Partnerships, Whiting School of Engineering | Johns Hopkins University, USA',portrait:{src:'/assets/committee/hedy-alavi.webp',width:300,height:300,objectPosition:'50% 50%'}}]},
  {title:'Co-Convenors',people:[{name:'Dr. Seenivasan R',role:'Director – International Relations Office | Professor, Center for Nanobiotechnology, VIT Vellore',portrait:{src:'/assets/committee/seenivasan-r.webp',width:326,height:326,objectPosition:'50% 50%'}}]},
];
export const coordinators = [
  'Dr. Rajneesh Kumar Patel','Dr. Suresh Dara','Dr. Anju Shukla','Dr. Rajdeep Singh Payal','Dr. Ankur Beohar',
  'Dr. Saravanan D','Dr. Lakshmi D','Dr. V. Sivasankaran','Dr. Harshlata Vishwakarma','Dr. Thiyagu Priyadharsan',
  'Dr. Hemraj Lamkuche','Dr. Jastin Samuel','Dr. Kannan S','Dr. Karthik G L','Dr. Rohit Sharma','Dr. Deep Chandra Upadhyay',
  'Dr. Devaraju S','Prof. Pavithra','Dr. Evangeline Christina','Dr. Nella Anvesh Kumar','Dr. E. Nirmala',
  'Dr. Sumit Mittal','Dr. Biswajit Saha','Dr. Neeraj Sharma','Dr. N D Patel','Dr. Ajit Singh','Dr. Harish G',
  'Dr. Suresh Kumar R S','Dr. Divya Mishra','Dr. Popuri Sai Krishnan','Dr. Mayank Sharma','Dr. Rudra Kalyan Nayak',
  'Dr. Arunkumar K','Dr. Afzal Hussain','Dr. Trapti Sharma','Dr. Rajit Nair','Dr. Mayur Kumar Rajak','Dr. Ramraj Dangi','Dr. Ajay Sharma',
];
export const partners:Person[] = [
  {name:'Ms. Damini Agarwal',role:'Chief Technology Officer at IbT, USA'},
  {name:'Mr. Kunal Pal',role:'Executive Director, Gupta-Klinsky India Institute (GKII), Johns Hopkins University'},
];
export const institutions = [
 {name:'VIT Bhopal University',image:'/assets/vit-campus.webp',url:'https://vitbhopal.ac.in/',paragraphs:[
 'VIT Bhopal University, a legacy of VIT Vellore, was established in 2017 with a global perspective, dedicated to shaping the leaders of future generations. The university is led by Dr. G. Viswanathan, Founder and Chancellor; Dr. Sankar Viswanathan, Vice President; Ms. Kadhambari S. Viswanathan, Assistant Vice President and Ms. Ramani Balasundaram, Trustee.',
 'It is a lush green campus covering over 350 acres situated at the heart of India, between the two cleanest cities, Indore and Bhopal. VIT Bhopal is the first private university to boast a 100% doctoral faculty, with members hailing from all over India.',
 'VIT has signed over 500 Memorandums of Understanding (MoUs) with partner foreign universities around the world. Currently, over 17,000 students are enrolled in 26 engineering and non-engineering undergraduate, postgraduate, and PhD programs from 32 states and union territories of India.'
 ]},
 {name:'Johns Hopkins University',image:'/assets/jhu-campus.webp',url:'https://www.jhu.edu/',paragraphs:[
 'Johns Hopkins University is a private institution in Baltimore, Md, United States. Founded in 1876, it was America’s first research university and today has influence around the globe. Johns Hopkins enrolls more than 30,000 full- and part-time students across nine academic divisions. JHU is ranked #9 among national universities and #12 in UG engineering.'
 ]},
 {name:'Johns Hopkins Whiting School of Engineering',image:'/assets/whiting-school.webp',url:'https://engineering.jhu.edu/',paragraphs:[
 'At the Johns Hopkins Whiting School of Engineering, we advance data- and science-driven engineering discovery, innovation, and systems applications to help everyone live longer and healthier lives and empower communities and society to thrive even in extreme environments.',
 'Hopkins Engineering has more than 10,000 full-time and part-time students, has 40,000 living alumni across the globe, and boasts the #1 Ranked Biomedical Engineering program in the country. With ten academic departments and more than 26 research centers and institutes – including the Data Science and AI Institute – and through strong community, university, and industry partnerships, Hopkins Engineering is a driving force in the future of technology, health care, and engineering education.'
 ]},
];
export function kolkataDate(now = new Date()):string {
 return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
}
export function nextMilestone(today:string){ return milestones.findIndex(m=>m.end>=today); }
