export interface Profile {
  name: string;
  tagline: string;
  vision: string;
  mission: string;
  founding_year: number;
  city: string;
}

export interface Pengurus {
  name: string;
  role: string;
  photo: string;
}

export interface Meeting {
  meeting_number: number;
  date: string;
}

export interface GalleryPhoto {
  url: string;
  caption: string;
}

export interface Config {
  profile: Profile;
  pengurus: Pengurus[];
  meetings: Meeting[];
  admin: Record<string, string>;
  gallery: GalleryPhoto[];
}

export interface Database {
  public: {
    Tables: {
      members: {
        Row: {
          id: number;
          name: string;
          created_at: string;
        };
        Insert: {
          name: string;
        };
        Update: {
          name?: string;
        };
      };
      kas: {
        Row: {
          id: number;
          member_id: number;
          meeting_number: number;
          is_paid: boolean;
          paid_at: string | null;
        };
        Insert: {
          member_id: number;
          meeting_number: number;
          is_paid: boolean;
        };
        Update: {
          is_paid?: boolean;
          paid_at?: string | null;
        };
      };
      attendance: {
        Row: {
          id: number;
          name: string;
          meeting_number: number;
          attended_at: string;
        };
        Insert: {
          name: string;
          meeting_number: number;
        };
        Update: {
          name?: string;
        };
      };
    };
  };
}
