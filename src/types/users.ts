export type Users = {
  id: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  is_active?: boolean | null;
};

export type UserCredentials = {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: number;
  is_active?: boolean;
  created_at?: Date | null;
  updated_at?: Date | null;
  token?: string;
};
