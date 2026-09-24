export type SocialLink = { name: string; href: string };

export type GlobalSettings = {
  id: number;
  phone: string;
  whatsapp: string;
  email: string;
  address_ar: string;
  address_en: string;
  social_links: SocialLink[];
  logo_url: string | null;
  seo_default_title_ar: string;
  seo_default_title_en: string;
  seo_default_description_ar: string;
  seo_default_description_en: string;
  updated_at: string;
};

export type Page = {
  id: string;
  slug: string;
  title_ar: string;
  title_en: string;
  meta_title_ar: string;
  meta_title_en: string;
  meta_description_ar: string;
  meta_description_en: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type PageSection = {
  id: string;
  page_id: string;
  section_key: string;
  section_title_ar: string;
  section_title_en: string;
  content: Record<string, unknown>;
  order_index: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
};

export type DynamicItem = {
  id: string;
  section_id: string;
  item_key: string | null;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  image_url: string | null;
  link_url: string | null;
  extra: Record<string, unknown>;
  order_index: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
};

/** A bilingual string field stored inside a `page_sections.content` blob. */
export type Localized = { ar: string; en: string };

export type Database = {
  public: {
    Tables: {
      global_settings: {
        Row: GlobalSettings;
        Insert: Partial<GlobalSettings>;
        Update: Partial<GlobalSettings>;
        Relationships: [];
      };
      pages: {
        Row: Page;
        Insert: Partial<Page> & { slug: string };
        Update: Partial<Page>;
        Relationships: [];
      };
      page_sections: {
        Row: PageSection;
        Insert: Partial<PageSection> & { page_id: string; section_key: string };
        Update: Partial<PageSection>;
        Relationships: [];
      };
      dynamic_items_collections: {
        Row: DynamicItem;
        Insert: Partial<DynamicItem> & { section_id: string };
        Update: Partial<DynamicItem>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
