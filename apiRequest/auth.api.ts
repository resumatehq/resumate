import http from '@/lib/http';
import {
  LoginBodyType,
  LoginResType,
  SignUpBodyType,
  SignUpResType,
  SlideSessionResType,
} from '@/schemas/auth.schema';
import { MessageResType } from '@/schemas/common.schema';

const authApiRequest = {
  // Login API Request
  login: async (body: LoginBodyType) => {
    try {
      const response = await http.post<LoginResType>('/auth/login', body);
      return response;
    } catch (error) {
      throw error; // Bạn có thể tuỳ chỉnh thêm cách xử lý lỗi
    }
  },

  // Register API Request
  register: async (body: SignUpBodyType) => {
    try {
      const response = await http.post<SignUpResType>('/auth/register', body);
      return response;
    } catch (error) {
      throw error; // Xử lý lỗi cho request đăng ký
    }
  },

  // Verify session (using JWT)
  auth: async (body: { sessionToken: string; expiresAt: string }) => {
    try {
      const response = await http.post('/api/auth', body, {
        baseUrl: '', // Cấu hình baseUrl tại đây nếu cần
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  logout: async (body: { access_token: string; refresh_token: string }) => {
    try {
      const response = await http.post<MessageResType>('/auth/logout', body, {
        baseUrl: '', // Cấu hình baseUrl tại đây nếu cần
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default authApiRequest;
