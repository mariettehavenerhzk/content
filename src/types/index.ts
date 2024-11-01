export interface Content {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface GenerationResponse {
  success: boolean;
  data?: string;
  error?: string;
}

export interface ContentRecord {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
}