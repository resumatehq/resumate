import http from '@/lib/http';
import { CreateResumeType, ResumeType, ShareResumeType, UpdateResumeType, UpdateShareResumeType, ResumeResponse } from '@/schemas/resume.schema';

const resumeApiRequest = {
  // Client -> Next Server APIs
  getResumes: () =>
    http.get<ResumeType[]>('api/resume', {
      baseUrl: '',
    }),

  getResumeById: (resumeId: string) =>
    http.get<ResumeResponse>(`api/resume/${resumeId}`, {
      baseUrl: '',
    }),

  createResume: (data: CreateResumeType) =>
    http.post<ResumeType>('api/resume', data, {
      baseUrl: '',
    }),

  updateResume: (resumeId: string, data: UpdateResumeType) =>
    http.put<ResumeType>(`api/resume/${resumeId}`, data, {
      baseUrl: '',
    }),

  deleteResume: (resumeId: string) =>
    http.delete(`api/resume/${resumeId}`, {
      baseUrl: '',
    }),

  // Next Server -> Backend APIs
  sGetResumes: (token: string) =>
    http.get<ResumeType[]>('resumes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  sGetResumeById: (resumeId: string, token: string) =>
    http.get<ResumeResponse>(`resumes/${resumeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  sCreateResume: (data: CreateResumeType, token: string) =>
    http.post<ResumeType>('resumes', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }),

  sUpdateResume: (resumeId: string, data: UpdateResumeType, token: string) =>
    http.put<ResumeType>(`resumes/${resumeId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }),

  sDeleteResume: (resumeId: string, token: string) =>
    http.delete(`resumes/${resumeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  // Section Operations
  getAllSections: (resumeId: string) =>
    http.get(`/resumes/${resumeId}/sections`),

  createSection: (resumeId: string, sectionData: any) =>
    http.post(`/resumes/${resumeId}/sections`, { sectionData }),

  getSectionByType: (resumeId: string, sectionType: string) =>
    http.get(`/resumes/${resumeId}/sections/${sectionType}`),

  updateSection: (resumeId: string, sectionId: string, data: any) =>
    http.put(`/resumes/${resumeId}/sections/${sectionId}`, data),

  deleteSection: (resumeId: string, sectionId: string) =>
    http.delete(`/resumes/${resumeId}/sections/${sectionId}`),
  toggleSectionVisibility: (resumeId: string, sectionId: string, enabled: boolean) =>
    http.put(`/resumes/${resumeId}/sections/${sectionId}/visibility`, { enabled }),

  reorderSections: (resumeId: string, sectionOrders: { sectionId: string; order: number }[]) =>
    http.post(`/resumes/${resumeId}/sections/reorder`, { sectionOrders }),
  saveContinueSection: (resumeId: string, sectionId: string) =>
    http.put(`/resumes/${resumeId}/sections/${sectionId}/save-continue`, {}),

  // Version Control
  getVersions: (resumeId: string) =>
    http.get(`/resumes/${resumeId}/versions`),

  createVersion: (resumeId: string, data: { versionName: string; description: string }) =>
    http.post(`/resumes/${resumeId}/versions`, data),
  restoreVersion: (resumeId: string, versionNumber: number) =>
    http.post(`/resumes/${resumeId}/versions/${versionNumber}/restore`, {}),

  // Resume Sharing
  createShareResume: (resumeId: string, data: ShareResumeType) =>
    http.post(`/resumes/${resumeId}/share`, data),

  updateShareResume: (resumeId: string, data: UpdateShareResumeType) =>
    http.put(`/resumes/${resumeId}/share`, data),

  deleteShareResume: (resumeId: string) =>
    http.delete(`/resumes/${resumeId}/share`),

  generateQRCode: (resumeId: string, size?: number) =>
    http.get(`/resumes/${resumeId}/share/qrcode${size ? `?size=${size}` : ''}`),

};

export default resumeApiRequest; 