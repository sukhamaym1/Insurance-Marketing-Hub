export type UserRole = 'guest' | 'agent' | 'admin';

export interface BrandKit {
  id: string;
  userId: string;
  photoUrl: string;
  logoUrl: string;
  fullName: string;
  designation: string;
  companyName: string;
  branchName: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  socials: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
    linkedin?: string;
    telegram?: string;
  };
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  subscriptionPlan: 'Free' | 'Pro' | 'Agency' | 'Enterprise';
  createdAt: string;
  brandKit?: BrandKit;
  favorites: string[]; // Template IDs
  downloadsCount: number;
}

export type LayerType = 'text' | 'image' | 'photo' | 'logo' | 'shape' | 'background';

export interface BaseLayer {
  id: string;
  name: string;
  type: LayerType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  opacity?: number;
  visible?: boolean;
  locked?: boolean;
  zIndex: number;
}

export interface TextLayer extends BaseLayer {
  type: 'text';
  text: string;
  fontSize: number;
  fontFamily: string;
  fill: string;
  align?: 'left' | 'center' | 'right';
  fontStyle?: string; // e.g. 'bold', 'italic', 'normal'
  isBrandBinding?: 'fullName' | 'designation' | 'phone' | 'email' | 'website' | 'companyName' | 'address';
}

export interface ImageLayer extends BaseLayer {
  type: 'image' | 'photo' | 'logo';
  url: string;
  isBrandBinding?: 'photo' | 'logo';
  borderRadius?: number;
}

export interface ShapeLayer extends BaseLayer {
  type: 'shape';
  shapeType: 'rect' | 'circle' | 'line';
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  borderRadius?: number;
  isBrandColorBinding?: 'primary' | 'secondary' | 'accent';
}

export interface BackgroundLayer extends BaseLayer {
  type: 'background';
  url?: string;
  color?: string;
}

export type KonvaLayer = TextLayer | ImageLayer | ShapeLayer | BackgroundLayer;

export interface TemplateSizePreset {
  id: string;
  label: string;
  width: number;
  height: number;
  aspectRatio: string;
}

export interface Template {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string; // e.g., 'Life Insurance', 'Health Insurance', etc.
  categorySlug: string;
  tags: string[];
  thumbnail: string;
  previewUrl: string;
  canvasWidth: number;
  canvasHeight: number;
  layers: KonvaLayer[];
  isPremium: boolean;
  isNew?: boolean;
  isTrending?: boolean;
  downloadsCount: number;
  viewsCount: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  templateCount: number;
  color: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  readTime: string;
  coverImage: string;
  tags: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Personalization' | 'Downloads' | 'Billing' | 'Technical';
}

export interface CareerJob {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Remote';
  experience: string;
  description: string;
}

export interface SavedPersonalization {
  id: string;
  templateId: string;
  templateTitle: string;
  thumbnail: string;
  layers: KonvaLayer[];
  updatedAt: string;
}

export interface DownloadHistory {
  id: string;
  templateId: string;
  templateTitle: string;
  format: 'PNG' | 'JPG' | 'PDF';
  downloadedAt: string;
  thumbnailUrl: string;
}

export interface AdminAnalytics {
  totalUsers: number;
  totalTemplates: number;
  totalDownloads: number;
  monthlyRevenue: number;
  activeProUsers: number;
  recentActivity: Array<{
    id: string;
    type: string;
    user: string;
    timestamp: string;
    details: string;
  }>;
}

export interface AuditLog {
  id: string;
  actor: string;
  action: string;
  target: string;
  ip: string;
  timestamp: string;
}
