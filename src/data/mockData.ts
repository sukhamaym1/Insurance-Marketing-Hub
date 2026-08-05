import { Template, Category, BlogPost, FAQItem, CareerJob, BrandKit, UserProfile, AdminAnalytics, AuditLog } from '../types';

export const INITIAL_BRAND_KIT: BrandKit = {
  id: 'bk-default',
  userId: 'user-agent-1',
  photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
  fullName: 'Sukhamay Adhikary',
  designation: 'Senior Life Insurance Advisor',
  companyName: 'Star Secure Financial Services',
  branchName: 'Kolkata Main Branch',
  phone: '+91 98765 43210',
  email: 'sukhamay.agent@insurancehub.com',
  website: 'www.sukhamayinsurance.com',
  address: 'Suite 402, Financial Tower, Kolkata',
  socials: {
    facebook: 'facebook.com/sukhamay.insurance',
    instagram: 'instagram.com/sukhamay_advisor',
    whatsapp: '+919876543210',
    linkedin: 'linkedin.com/in/sukhamay-adhikary',
    telegram: 't.me/sukhamay_insurance'
  },
  primaryColor: '#2563EB',
  secondaryColor: '#0B1220',
  accentColor: '#16A34A',
  fontFamily: 'Inter'
};

export const INITIAL_USER: UserProfile = {
  uid: 'user-agent-1',
  email: 'agent@insurancemarketinghub.com',
  displayName: 'Sukhamay Adhikary',
  photoURL: INITIAL_BRAND_KIT.photoUrl,
  role: 'agent',
  subscriptionPlan: 'Pro',
  createdAt: '2026-01-15',
  brandKit: INITIAL_BRAND_KIT,
  favorites: ['tpl-life-01', 'tpl-health-01', 'tpl-fest-01'],
  downloadsCount: 56
};

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'cat-life',
    name: 'Life Insurance',
    slug: 'life-insurance',
    iconName: 'Shield',
    description: 'Protect your family\'s future with comprehensive life cover templates.',
    templateCount: 245,
    color: '#2563EB'
  },
  {
    id: 'cat-health',
    name: 'Health Insurance',
    slug: 'health-insurance',
    iconName: 'Heart',
    description: 'Medical coverage, hospital cash, and wellness promotion posts.',
    templateCount: 189,
    color: '#16A34A'
  },
  {
    id: 'cat-investment',
    name: 'Investment',
    slug: 'investment',
    iconName: 'TrendingUp',
    description: 'Grow wealth with smart financial planning and ULIP posters.',
    templateCount: 156,
    color: '#8B5CF6'
  },
  {
    id: 'cat-motivation',
    name: 'Motivation',
    slug: 'motivation',
    iconName: 'Award',
    description: 'Inspiring quotes, leadership thoughts, and success mindset.',
    templateCount: 132,
    color: '#F59E0B'
  },
  {
    id: 'cat-festival',
    name: 'Festival',
    slug: 'festival',
    iconName: 'Gift',
    description: 'Diwali, New Year, Eid, Christmas, and national celebration wishes.',
    templateCount: 98,
    color: '#EC4899'
  },
  {
    id: 'cat-recruitment',
    name: 'Recruitment',
    slug: 'recruitment',
    iconName: 'Users',
    description: 'Build your agency team and hire motivated POSP advisors.',
    templateCount: 87,
    color: '#06B6D4'
  },
  {
    id: 'cat-savings',
    name: 'Savings',
    slug: 'savings',
    iconName: 'PiggyBank',
    description: 'Tax saving schemes, guaranteed return plans, and piggy bank goals.',
    templateCount: 76,
    color: '#10B981'
  },
  {
    id: 'cat-tips',
    name: 'Financial Tips',
    slug: 'financial-tips',
    iconName: 'Lightbulb',
    description: 'Educational graphics on money management and inflation protection.',
    templateCount: 64,
    color: '#F97316'
  },
  {
    id: 'cat-claim',
    name: 'Claim Support',
    slug: 'claim-support',
    iconName: 'FileCheck',
    description: 'Assurance banners on 24x7 claim settlement assistance.',
    templateCount: 58,
    color: '#3B82F6'
  },
  {
    id: 'cat-retirement',
    name: 'Retirement',
    slug: 'retirement',
    iconName: 'Sun',
    description: 'Pension plans, golden year freedom, and senior security graphics.',
    templateCount: 45,
    color: '#EAB308'
  }
];

export const MOCK_TEMPLATES: Template[] = [
  {
    id: 'tpl-life-01',
    title: 'Life Insurance - Family Security Promise',
    slug: 'life-insurance-family-security-promise',
    description: 'Perfect post to create awareness about the importance of life insurance for complete family protection.',
    category: 'Life Insurance',
    categorySlug: 'life-insurance',
    tags: ['Life Insurance', 'Family', 'Protection', 'Security', 'Advisors'],
    thumbnail: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
    previewUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
    canvasWidth: 1080,
    canvasHeight: 1080,
    isPremium: false,
    isTrending: true,
    downloadsCount: 1420,
    viewsCount: 5320,
    createdAt: '2026-02-01',
    layers: [
      {
        id: 'bg-1',
        name: 'Background Color',
        type: 'background',
        color: '#0F172A',
        x: 0,
        y: 0,
        width: 1080,
        height: 1080,
        zIndex: 0
      },
      {
        id: 'img-main',
        name: 'Main Family Photo',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
        x: 60,
        y: 60,
        width: 960,
        height: 520,
        borderRadius: 24,
        zIndex: 1
      },
      {
        id: 'title-txt',
        name: 'Main Headline',
        type: 'text',
        text: 'Life Insurance is a promise of love and security.',
        fontSize: 44,
        fontFamily: 'Outfit',
        fill: '#FFFFFF',
        fontStyle: 'bold',
        x: 60,
        y: 610,
        width: 960,
        height: 100,
        zIndex: 2
      },
      {
        id: 'sub-txt',
        name: 'Subtitle',
        type: 'text',
        text: 'Secure your family\'s future today. Small steps today for a better tomorrow.',
        fontSize: 24,
        fontFamily: 'Inter',
        fill: '#94A3B8',
        x: 60,
        y: 720,
        width: 960,
        height: 60,
        zIndex: 3
      },
      // Agent Footer Bar Card
      {
        id: 'footer-card',
        name: 'Agent Footer Card',
        type: 'shape',
        shapeType: 'rect',
        fill: '#1E293B',
        stroke: '#2563EB',
        strokeWidth: 2,
        x: 60,
        y: 860,
        width: 960,
        height: 160,
        isBrandColorBinding: 'primary',
        zIndex: 4
      },
      {
        id: 'agent-photo',
        name: 'Agent Photo Layer',
        type: 'photo',
        url: INITIAL_BRAND_KIT.photoUrl,
        x: 90,
        y: 880,
        width: 120,
        height: 120,
        borderRadius: 60,
        isBrandBinding: 'photo',
        zIndex: 5
      },
      {
        id: 'agent-name',
        name: 'Agent Name Layer',
        type: 'text',
        text: INITIAL_BRAND_KIT.fullName,
        fontSize: 30,
        fontFamily: 'Outfit',
        fill: '#FFFFFF',
        fontStyle: 'bold',
        x: 230,
        y: 890,
        width: 500,
        height: 40,
        isBrandBinding: 'fullName',
        zIndex: 6
      },
      {
        id: 'agent-desig',
        name: 'Agent Designation',
        type: 'text',
        text: INITIAL_BRAND_KIT.designation,
        fontSize: 20,
        fontFamily: 'Inter',
        fill: '#60A5FA',
        x: 230,
        y: 935,
        width: 500,
        height: 30,
        isBrandBinding: 'designation',
        zIndex: 7
      },
      {
        id: 'agent-phone',
        name: 'Agent Phone',
        type: 'text',
        text: INITIAL_BRAND_KIT.phone,
        fontSize: 22,
        fontFamily: 'Inter',
        fill: '#38BDF8',
        fontStyle: 'bold',
        x: 230,
        y: 970,
        width: 500,
        height: 30,
        isBrandBinding: 'phone',
        zIndex: 8
      }
    ]
  },
  {
    id: 'tpl-health-01',
    title: 'Health is Wealth - Secure it with Insurance',
    slug: 'health-is-wealth-secure-with-insurance',
    description: 'High-impact medical cover poster highlighting cashless hospitalization and family health protection.',
    category: 'Health Insurance',
    categorySlug: 'health-insurance',
    tags: ['Health Insurance', 'Medical', 'Hospitalization', 'Wellness'],
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    previewUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    canvasWidth: 1080,
    canvasHeight: 1080,
    isPremium: true,
    isNew: true,
    downloadsCount: 980,
    viewsCount: 3100,
    createdAt: '2026-02-05',
    layers: [
      {
        id: 'bg-1',
        name: 'Background Color',
        type: 'background',
        color: '#064E3B',
        x: 0,
        y: 0,
        width: 1080,
        height: 1080,
        zIndex: 0
      },
      {
        id: 'img-main',
        name: 'Main Doctor Photo',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
        x: 60,
        y: 60,
        width: 960,
        height: 520,
        borderRadius: 24,
        zIndex: 1
      },
      {
        id: 'title-txt',
        name: 'Main Headline',
        type: 'text',
        text: 'Health is Wealth. Secure it with Cashless Health Insurance.',
        fontSize: 42,
        fontFamily: 'Outfit',
        fill: '#FFFFFF',
        fontStyle: 'bold',
        x: 60,
        y: 610,
        width: 960,
        height: 100,
        zIndex: 2
      },
      {
        id: 'sub-txt',
        name: 'Subtitle',
        type: 'text',
        text: 'Stay Healthy, Stay Happy with 24/7 Claim Support.',
        fontSize: 24,
        fontFamily: 'Inter',
        fill: '#6EE7B7',
        x: 60,
        y: 720,
        width: 960,
        height: 60,
        zIndex: 3
      },
      {
        id: 'footer-card',
        name: 'Agent Footer Card',
        type: 'shape',
        shapeType: 'rect',
        fill: '#065F46',
        stroke: '#10B981',
        strokeWidth: 2,
        x: 60,
        y: 860,
        width: 960,
        height: 160,
        zIndex: 4
      },
      {
        id: 'agent-photo',
        name: 'Agent Photo Layer',
        type: 'photo',
        url: INITIAL_BRAND_KIT.photoUrl,
        x: 90,
        y: 880,
        width: 120,
        height: 120,
        borderRadius: 60,
        isBrandBinding: 'photo',
        zIndex: 5
      },
      {
        id: 'agent-name',
        name: 'Agent Name Layer',
        type: 'text',
        text: INITIAL_BRAND_KIT.fullName,
        fontSize: 30,
        fontFamily: 'Outfit',
        fill: '#FFFFFF',
        fontStyle: 'bold',
        x: 230,
        y: 890,
        width: 500,
        height: 40,
        isBrandBinding: 'fullName',
        zIndex: 6
      },
      {
        id: 'agent-desig',
        name: 'Agent Designation',
        type: 'text',
        text: INITIAL_BRAND_KIT.designation,
        fontSize: 20,
        fontFamily: 'Inter',
        fill: '#A7F3D0',
        x: 230,
        y: 935,
        width: 500,
        height: 30,
        isBrandBinding: 'designation',
        zIndex: 7
      },
      {
        id: 'agent-phone',
        name: 'Agent Phone',
        type: 'text',
        text: INITIAL_BRAND_KIT.phone,
        fontSize: 22,
        fontFamily: 'Inter',
        fill: '#FFFFFF',
        fontStyle: 'bold',
        x: 230,
        y: 970,
        width: 500,
        height: 30,
        isBrandBinding: 'phone',
        zIndex: 8
      }
    ]
  },
  {
    id: 'tpl-invest-01',
    title: 'Small Investment, Big Dreams & Wealth Growth',
    slug: 'small-investment-big-dreams-wealth-growth',
    description: 'Financial growth template for ULIP, SIP, and compounding returns promotion.',
    category: 'Investment',
    categorySlug: 'investment',
    tags: ['Investment', 'Savings', 'Wealth', 'SIP', 'Financial Growth'],
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    previewUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    canvasWidth: 1080,
    canvasHeight: 1080,
    isPremium: false,
    isTrending: true,
    downloadsCount: 1850,
    viewsCount: 6100,
    createdAt: '2026-01-20',
    layers: []
  },
  {
    id: 'tpl-fest-01',
    title: 'Happy Diwali Wishes & Safe Family Protection',
    slug: 'happy-diwali-wishes-safe-family-protection',
    description: 'Festive wish template combined with insurance security message for social media.',
    category: 'Festival',
    categorySlug: 'festival',
    tags: ['Festival', 'Diwali', 'Wishes', 'Celebration', 'Greetings'],
    thumbnail: 'https://images.unsplash.com/photo-1605826832916-d0ea9d6fe71e?auto=format&fit=crop&w=800&q=80',
    previewUrl: 'https://images.unsplash.com/photo-1605826832916-d0ea9d6fe71e?auto=format&fit=crop&w=800&q=80',
    canvasWidth: 1080,
    canvasHeight: 1080,
    isPremium: true,
    isNew: true,
    downloadsCount: 2300,
    viewsCount: 8400,
    createdAt: '2026-02-10',
    layers: []
  },
  {
    id: 'tpl-recruitment-01',
    title: 'Join Our Team - Build Your Career as POSP Agent',
    slug: 'join-our-team-build-career-posp-agent',
    description: 'Agency recruitment poster to attract ambitious financial advisors and agents.',
    category: 'Recruitment',
    categorySlug: 'recruitment',
    tags: ['Recruitment', 'Career', 'POSP Agent', 'Hiring', 'Business Opportunity'],
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    previewUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    canvasWidth: 1080,
    canvasHeight: 1080,
    isPremium: false,
    downloadsCount: 760,
    viewsCount: 2100,
    createdAt: '2026-01-10',
    layers: []
  },
  {
    id: 'tpl-retire-01',
    title: 'Retirement Freedom - Pension for Golden Years',
    slug: 'retirement-freedom-pension-golden-years',
    description: 'Ensure stress-free retirement with guaranteed lifelong pension plans.',
    category: 'Retirement',
    categorySlug: 'retirement',
    tags: ['Retirement', 'Pension', 'Golden Years', 'Senior Care'],
    thumbnail: 'https://images.unsplash.com/photo-1532635241-17e820acc59f?auto=format&fit=crop&w=800&q=80',
    previewUrl: 'https://images.unsplash.com/photo-1532635241-17e820acc59f?auto=format&fit=crop&w=800&q=80',
    canvasWidth: 1080,
    canvasHeight: 1080,
    isPremium: true,
    downloadsCount: 1120,
    viewsCount: 3900,
    createdAt: '2026-01-25',
    layers: []
  }
];

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: '10 Proven Social Media Strategies for Insurance Agents in 2026',
    slug: '10-proven-social-media-strategies-insurance-agents',
    excerpt: 'Learn how to generate high-quality leads on WhatsApp, Facebook, and Instagram by personalizing branded posters.',
    content: 'Insurance is built on trust and personal relationships. In today\'s digital world, posting unbranded generic images will not convert prospects into clients...',
    category: 'Marketing Strategies',
    author: {
      name: 'Sukhamay Adhikary',
      avatar: INITIAL_BRAND_KIT.photoUrl,
      role: 'Growth Strategist'
    },
    publishedAt: '2026-02-01',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    tags: ['Social Media', 'Lead Generation', 'Branding']
  },
  {
    id: 'blog-2',
    title: 'How to Build an Unstoppable POSP Agency Team with Visual Ads',
    slug: 'build-posp-agency-team-visual-ads',
    excerpt: 'Recruiting agents is all about presenting a lucrative business opportunity clearly.',
    content: 'Building a team of POSP agents requires clear messaging on commission structure, flexible working hours, and career growth...',
    category: 'Recruitment',
    author: {
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      role: 'Agency Manager'
    },
    publishedAt: '2026-01-28',
    readTime: '7 min read',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    tags: ['Recruitment', 'POSP', 'Team Growth']
  }
];

export const MOCK_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How does automatic Brand Kit personalization work?',
    answer: 'Once you set up your Brand Kit (Photo, Logo, Name, Designation, Phone, Social handles), every template you open automatically injects your credentials onto the poster in one click!',
    category: 'Personalization'
  },
  {
    id: 'faq-2',
    question: 'Can I download images in high definition (HD)?',
    answer: 'Yes! All templates can be exported in crystal clear 1080x1080 PNG, JPG, and print-ready PDF formats without watermarks.',
    category: 'Downloads'
  },
  {
    id: 'faq-3',
    question: 'Can I use this application on my mobile phone?',
    answer: 'Absolutely. Insurance Marketing Hub is a Progressive Web App (PWA). You can use it in any mobile browser or install it directly to your home screen.',
    category: 'Technical'
  },
  {
    id: 'faq-4',
    question: 'Is there a free trial available for Pro plans?',
    answer: 'Yes, our Free tier gives access to 100+ basic templates. Upgrading to Pro unlocks all 1000+ premium designs, custom fonts, and multi-format exports.',
    category: 'Billing'
  }
];

export const MOCK_JOBS: CareerJob[] = [
  {
    id: 'job-1',
    title: 'Senior Graphic Designer (Template Creator)',
    department: 'Design',
    location: 'Remote / Kolkata',
    type: 'Full-time',
    experience: '3+ Years',
    description: 'We are looking for creative poster designers with deep expertise in Canva, Figma, and Photoshop to build insurance templates.'
  },
  {
    id: 'job-2',
    title: 'Frontend React & Canvas Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    experience: '2+ Years',
    description: 'Join our dev team to build world-class canvas editing experiences with React-Konva and TypeScript.'
  }
];

export const MOCK_ADMIN_STATS: AdminAnalytics = {
  totalUsers: 14820,
  totalTemplates: 1250,
  totalDownloads: 184500,
  monthlyRevenue: 428000,
  activeProUsers: 3890,
  recentActivity: [
    {
      id: 'act-1',
      type: 'user_register',
      user: 'Rakesh Roy (Agency Manager)',
      timestamp: '10 mins ago',
      details: 'Signed up for Pro Monthly Plan'
    },
    {
      id: 'act-2',
      type: 'template_download',
      user: 'Puja Das (Advisor)',
      timestamp: '25 mins ago',
      details: 'Downloaded Life Insurance 01 in HD PNG'
    },
    {
      id: 'act-3',
      type: 'template_created',
      user: 'Admin Design Team',
      timestamp: '1 hour ago',
      details: 'Uploaded 5 new Festive Diwali Templates'
    }
  ]
};

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    actor: 'admin@insurancemarketinghub.com',
    action: 'UPDATE_TEMPLATE',
    target: 'tpl-life-01',
    ip: '103.22.45.12',
    timestamp: '2026-02-15 14:22:10'
  },
  {
    id: 'log-2',
    actor: 'system@insurancemarketinghub.com',
    action: 'BACKUP_FIRESTORE',
    target: 'database_main',
    ip: '10.0.0.1',
    timestamp: '2026-02-15 03:00:00'
  }
];
