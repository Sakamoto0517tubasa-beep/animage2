export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      spots: {
        Row: {
          id: string;
          anime_title: string;
          location_name: string;
          address: string;
          lat: number;
          lng: number;
          description: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          anime_title: string;
          location_name: string;
          address: string;
          lat: number;
          lng: number;
          description: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          anime_title?: string;
          location_name?: string;
          address?: string;
          lat?: number;
          lng?: number;
          description?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          id: string;
          spot_id: string;
          user_id: string | null;
          nickname: string | null;
          score_reenactment: number;
          score_accessibility: number;
          score_satisfaction: number;
          score_photo: number;
          score_overall: number;
          score_crowding: number | null;
          comment: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          spot_id: string;
          user_id?: string | null;
          nickname?: string | null;
          score_reenactment: number;
          score_accessibility: number;
          score_satisfaction: number;
          score_photo: number;
          score_overall: number;
          score_crowding?: number | null;
          comment: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          spot_id?: string;
          user_id?: string | null;
          nickname?: string | null;
          score_reenactment?: number;
          score_accessibility?: number;
          score_satisfaction?: number;
          score_photo?: number;
          score_overall?: number;
          score_crowding?: number | null;
          comment?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reviews_spot_id_fkey";
            columns: ["spot_id"];
            isOneToOne: false;
            referencedRelation: "spots";
            referencedColumns: ["id"];
          },
        ];
      };
      photos: {
        Row: {
          id: string;
          spot_id: string;
          user_id: string;
          url: string;
          caption: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          spot_id: string;
          user_id: string;
          url: string;
          caption?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          spot_id?: string;
          user_id?: string;
          url?: string;
          caption?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "photos_spot_id_fkey";
            columns: ["spot_id"];
            isOneToOne: false;
            referencedRelation: "spots";
            referencedColumns: ["id"];
          },
        ];
      };
      posts: {
        Row: {
          id: string;
          title: string;
          body: string | null;
          category: string;
          nickname: string | null;
          user_id: string | null;
          upvotes: number;
          comment_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          body?: string | null;
          category?: string;
          nickname?: string | null;
          user_id?: string | null;
          upvotes?: number;
          comment_count?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          body?: string | null;
          category?: string;
          nickname?: string | null;
          user_id?: string | null;
          upvotes?: number;
          comment_count?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      post_comments: {
        Row: {
          id: string;
          post_id: string;
          parent_id: string | null;
          body: string;
          nickname: string | null;
          user_id: string | null;
          upvotes: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          parent_id?: string | null;
          body: string;
          nickname?: string | null;
          user_id?: string | null;
          upvotes?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          parent_id?: string | null;
          body?: string;
          nickname?: string | null;
          user_id?: string | null;
          upvotes?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          spot_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          spot_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          spot_id?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "favorites_spot_id_fkey";
            columns: ["spot_id"];
            isOneToOne: false;
            referencedRelation: "spots";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type Spot = Database["public"]["Tables"]["spots"]["Row"];
export type Review = Database["public"]["Tables"]["reviews"]["Row"];
export type Photo = Database["public"]["Tables"]["photos"]["Row"];
export type Favorite = Database["public"]["Tables"]["favorites"]["Row"];

export type SpotWithStats = Spot & {
  overall_score: number | null;
  review_count: number;
  thumbnail_url: string | null;
  thumbnail_fallback_url?: string | null;
  city?: string;
  train_minutes?: number | null;
  score_reenactment?: number | null;
  score_accessibility?: number | null;
  score_satisfaction?: number | null;
  score_photo?: number | null;
  score_crowding?: number | null;
};
