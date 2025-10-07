export interface Lead {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  geo: string;
  source: string;
  description: string | "";
  created_time: string;
  user_id: string;
  ip: string;
  landing_name: string;
  landing: string;
  country: string;
  isDuplicate: boolean;
}

export interface FileData {
  file: File;
  id: string;
}
