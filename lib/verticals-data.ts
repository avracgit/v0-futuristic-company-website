export interface Vertical {
  id: string
  title: string
  tagline: string
  shortDesc: string
  fullDesc: string[]
  services: { name: string; desc: string }[]
  stats: { value: string; label: string }[]
  color: 'red' | 'blue'
}

export const verticals: Vertical[] = [
  {
    id: 'technology',
    title: 'Technology',
    tagline: 'Engineering the Future',
    shortDesc:
      'Cutting-edge software development, cloud infrastructure, AI solutions, and enterprise IT services that power businesses at scale.',
    fullDesc: [
      'Our Technology vertical is the backbone of ConglomerateIT — a team of engineers, architects, and product thinkers who build the platforms, tools, and systems that keep enterprises moving forward.',
      'From bespoke enterprise software to fully managed cloud migrations, we deliver technology that is robust, scalable, and built to last. Our AI and automation practice helps clients eliminate friction, cut costs, and unlock new revenue streams.',
      'We work across every layer of the stack — infrastructure, backend, frontend, mobile, and data — so clients get a single partner who owns the entire technology journey.',
    ],
    services: [
      { name: 'Cloud & DevOps', desc: 'End-to-end cloud strategy, migration, and managed infrastructure on AWS, Azure, and GCP.' },
      { name: 'Enterprise Software', desc: 'Custom platforms and integrations built for scale, security, and long-term maintainability.' },
      { name: 'AI & Automation', desc: 'Machine learning models, intelligent automation, and data pipelines that create real business value.' },
      { name: 'Cybersecurity', desc: 'Penetration testing, compliance advisory, and 24/7 security operations center services.' },
      { name: 'Data Engineering', desc: 'Data warehousing, analytics platforms, and real-time reporting dashboards.' },
      { name: 'Product Development', desc: 'From MVP to market — full-cycle product development with design, engineering, and launch support.' },
    ],
    stats: [
      { value: '200+', label: 'Projects Delivered' },
      { value: '50+', label: 'Enterprise Clients' },
      { value: '99.9%', label: 'Uptime SLA' },
      { value: '12+', label: 'Years in Tech' },
    ],
    color: 'red',
  },
  {
    id: 'consulting',
    title: 'Business Consulting',
    tagline: 'Strategy at Every Scale',
    shortDesc:
      'End-to-end business transformation services — from organizational design to process optimization and market expansion strategies.',
    fullDesc: [
      'ConglomerateIT Consulting partners with leadership teams to solve their most complex business challenges. We bring sharp analytical rigor and decades of cross-industry experience to every engagement.',
      'Whether you are entering a new market, restructuring for efficiency, or navigating a major digital transformation, our consultants embed alongside your teams to drive measurable outcomes — not slide decks.',
      'Our methodology centers on pragmatic strategy: clear diagnostics, realistic roadmaps, and hands-on execution support that gets results.',
    ],
    services: [
      { name: 'Digital Transformation', desc: 'Roadmaps and execution for companies moving from legacy to modern operating models.' },
      { name: 'Process Optimization', desc: 'Lean and Six Sigma-driven analysis to eliminate waste and boost throughput.' },
      { name: 'Market Strategy', desc: 'Competitive intelligence, market entry analysis, and growth strategy development.' },
      { name: 'Change Management', desc: 'People-first programs that ensure organizational changes stick and deliver ROI.' },
      { name: 'Operating Model Design', desc: 'Structuring teams, governance, and workflows for maximum performance.' },
      { name: 'M&A Advisory', desc: 'Due diligence, integration planning, and synergy realization for mergers and acquisitions.' },
    ],
    stats: [
      { value: '150+', label: 'Engagements' },
      { value: '$2B+', label: 'Value Created' },
      { value: '40+', label: 'Industries Served' },
      { value: '95%', label: 'Client Retention' },
    ],
    color: 'blue',
  },
  {
    id: 'staffing',
    title: 'Staffing & HR',
    tagline: 'Human Capital, Amplified',
    shortDesc:
      'Talent acquisition, workforce management, and HR solutions that connect the right people to the right opportunities, at the right time.',
    fullDesc: [
      'The Staffing & HR vertical of ConglomerateIT exists to solve the most persistent challenge every organization faces: finding and retaining exceptional talent. We operate with speed, precision, and a deep understanding of what makes a great hire.',
      'Our recruiters are domain specialists — meaning a technology search is run by someone who understands code, and a finance search is run by someone who understands capital markets. This vertical expertise cuts time-to-hire dramatically.',
      'Beyond recruitment, we offer full HR outsourcing, workforce planning, and training and development programs that help organizations build cultures where people thrive.',
    ],
    services: [
      { name: 'Executive Search', desc: 'C-suite and VP-level placements with discreet, high-touch search methodology.' },
      { name: 'Contract Staffing', desc: 'Flexible workforce solutions for project-based or surge demand hiring needs.' },
      { name: 'HR Outsourcing', desc: 'Full-service HR administration, payroll, and compliance management.' },
      { name: 'Workforce Planning', desc: 'Strategic headcount modeling and succession planning aligned to business goals.' },
      { name: 'Training & Development', desc: 'Leadership programs, soft skills workshops, and technical upskilling.' },
      { name: 'Employer Branding', desc: 'Positioning your organization as a destination employer to attract top talent.' },
    ],
    stats: [
      { value: '10k+', label: 'Placements Made' },
      { value: '300+', label: 'Client Companies' },
      { value: '28 Days', label: 'Avg. Time-to-Hire' },
      { value: '92%', label: 'Retention Rate' },
    ],
    color: 'red',
  },
  {
    id: 'realestate',
    title: 'Real Estate',
    tagline: 'Building Tomorrow',
    shortDesc:
      'Strategic real estate investments, property development, and smart space management solutions redefining urban landscapes.',
    fullDesc: [
      'ConglomerateIT Real Estate brings a technology-first mindset to property — identifying opportunities where others see only buildings, and creating spaces where people genuinely want to live, work, and invest.',
      'Our development pipeline spans commercial, mixed-use, and residential projects. We leverage data analytics and smart building technology to maximize asset performance and long-term value creation.',
      'From acquisition and development through to property management and exit, we manage the full asset lifecycle with institutional discipline and entrepreneurial agility.',
    ],
    services: [
      { name: 'Commercial Development', desc: 'Office, retail, and industrial projects delivered on time and within budget.' },
      { name: 'Smart Infrastructure', desc: 'IoT-enabled buildings with energy management, access control, and occupancy analytics.' },
      { name: 'Property Management', desc: 'Day-to-day operations, tenant relations, and maintenance management.' },
      { name: 'Investment Advisory', desc: 'Market research, asset valuation, and portfolio strategy for real estate investors.' },
      { name: 'Residential Projects', desc: 'Premium residential developments with curated amenities and community design.' },
      { name: 'Lease & Transactions', desc: 'Brokerage services for commercial leasing and property transactions.' },
    ],
    stats: [
      { value: '2M+', label: 'Sq Ft Developed' },
      { value: '45+', label: 'Projects Completed' },
      { value: '$800M+', label: 'Assets Under Mgmt' },
      { value: '18', label: 'Cities Active' },
    ],
    color: 'blue',
  },
  {
    id: 'education',
    title: 'Education & Training',
    tagline: "Shaping Tomorrow's Leaders",
    shortDesc:
      'World-class educational programs, corporate training, and skill development platforms that prepare professionals for an evolving world.',
    fullDesc: [
      'The Education & Training vertical of ConglomerateIT is built on a simple belief: the greatest investment any organization or individual can make is in knowledge. We design programs that are practical, measurable, and immediately applicable.',
      'We partner with corporations to upskill workforces at scale, and with individual professionals seeking certification, advancement, or career transitions. Our instructors are practitioners — not just academics.',
      'Our digital learning platform supports self-paced and cohort-based learning, with live mentorship, project-based assessments, and industry-recognized certifications.',
    ],
    services: [
      { name: 'Corporate Training', desc: 'Customized learning programs designed around your organization\'s strategic priorities.' },
      { name: 'E-Learning Platform', desc: 'Scalable digital learning infrastructure with LMS integration and progress tracking.' },
      { name: 'Certification Programs', desc: 'Industry-recognized credentials in technology, leadership, finance, and more.' },
      { name: 'Leadership Development', desc: 'High-potential leadership programs combining coaching, curriculum, and peer learning.' },
      { name: 'Bootcamps', desc: 'Intensive, immersive programs that build job-ready skills in weeks, not years.' },
      { name: 'University Partnerships', desc: 'Collaborative degree and diploma programs with accredited academic institutions.' },
    ],
    stats: [
      { value: '50k+', label: 'Learners Trained' },
      { value: '180+', label: 'Programs Offered' },
      { value: '96%', label: 'Completion Rate' },
      { value: '85%', label: 'Career Advancement' },
    ],
    color: 'red',
  },
  {
    id: 'finance',
    title: 'Finance & Fintech',
    tagline: 'Capital Intelligence',
    shortDesc:
      'Financial advisory, investment management, and fintech solutions that bring clarity to complex financial landscapes.',
    fullDesc: [
      'ConglomerateIT Finance & Fintech combines deep capital markets expertise with technology innovation to help clients navigate financial complexity with confidence.',
      'Our advisory practice serves mid-market and enterprise clients on everything from fundraising and treasury management to risk frameworks and regulatory compliance. We are trusted because we take accountability for outcomes, not just advice.',
      'On the fintech side, we build and deploy financial technology products — from payment infrastructure and lending platforms to wealth management tools and regulatory reporting systems.',
    ],
    services: [
      { name: 'Investment Advisory', desc: 'Portfolio strategy, asset allocation, and capital deployment guidance for institutions and HNIs.' },
      { name: 'Fintech Products', desc: 'Payment platforms, lending engines, and wealth management applications built to scale.' },
      { name: 'Risk Management', desc: 'Quantitative risk modeling, stress testing, and enterprise risk frameworks.' },
      { name: 'Regulatory Compliance', desc: 'Navigating financial regulations with structured compliance programs and reporting.' },
      { name: 'Corporate Finance', desc: 'Capital raising, M&A advisory, and financial restructuring for growing companies.' },
      { name: 'Wealth Planning', desc: 'Comprehensive financial planning for high-net-worth individuals and family offices.' },
    ],
    stats: [
      { value: '$5B+', label: 'Assets Advised' },
      { value: '120+', label: 'Clients Served' },
      { value: '18+', label: 'Fintech Products' },
      { value: '100%', label: 'Compliance Record' },
    ],
    color: 'blue',
  },
]
