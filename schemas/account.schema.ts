export interface AccountResType {
  message: string;
  status: number;
  data: User;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  date_of_birth: string;
  avatar_url: string;
  tier: 'free' | 'premium'; // Giả sử chỉ có 2 loại
  subscription: Subscription;
  permissions: Permissions;
  usage: Usage;
  verify: 'verified' | 'unverified';
  role: 'user' | 'admin'; // hoặc mở rộng nếu có role khác
  created_at: string;
  updated_at: string;
  last_login_time: string;
  status: 'online' | 'offline'; // giả định 2 trạng thái
}

export interface Subscription {
  plan: string;
  status: 'active' | 'inactive' | 'cancelled'; // tùy theo trạng thái có thể có
  paymentId: string;
  paymentProvider: 'stripe' | 'paypal'; // mở rộng nếu có thêm provider khác
  startDate: string;
  expiryDate: string;
}

export interface Permissions {
  maxResumes: number;
  maxCustomSections: number;
  allowedTemplates: string[];
  allowedSections: string[];
  allowedFeatures: string[];
  allowedExportFormats: Array<'pdf' | 'docx' | 'png' | 'json'>;
  aiRequests: {
    maxPerDay: number;
    maxPerMonth: number;
  };
}

export interface Usage {
  exportsCount: {
    pdf: number;
    docx: number;
    png: number;
  };
  createdResumes: number;
  aiRequestsCount: number;
  premiumAccessLog: string[]; // hoặc object nếu log chứa thông tin chi tiết
}
