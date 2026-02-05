export interface MenuPage {
  title: string;
  url: string;
  category: string;
  tooltip?: string;
}

export interface MenuContact {
  faicon: string;
  url: string;
  target: string;
}

export interface MenuData {
  menu_pages: MenuPage[];
  menu_contacts: MenuContact[];
}

export interface MetaData {
  author: string;
  logo: string;
  clickToEnlargeImages: boolean;
  lang: string;
  cookies: {
    enabled: boolean;
    message: string;
    agreeButtonText: string;
    disagreeButtonText: string;
    agreeButtonFnName: string;
    disagreeButtonFnName: string;
    header: string;
  };
}

export interface LinkItem {
  url: string;
  name: string;
}

export interface PostFrontMatter {
  layout?: string;
  title: string;
  categories?: string[];
  subcategory?: string;
  type?: string;
  image?: string;
  image_alt?: string;
  responsiveImage?: { src: string; size: string }[];
  description?: string;
  external_url?: string;
  external_name?: string;
  date?: string;
  buy?: LinkItem[];
  play?: LinkItem[];
  download?: LinkItem[];
  other?: LinkItem[];
  embed_player?: {
    type: string;
    src?: string;
    is_relative_url?: boolean;
    name?: string;
  };
}

export interface Post {
  slug: string;
  category: string;
  frontMatter: PostFrontMatter;
  content: string;
  excerpt?: string;
}

export const SECTION_CATEGORIES = [
  "home",
  "dubbal",
  "sonicarcana",
  "bubbledubble",
  "collaborations",
  "discography",
] as const;
export type SectionCategory = (typeof SECTION_CATEGORIES)[number];

export interface SectionHeroConfig {
  image: string;
  image_alt: string;
  heading?: string;
  subheading?: string;
}

export interface SectionConfig {
  title: string;
  subtitle: string;
  description: string;
  hero: SectionHeroConfig | null;
}

export type SectionsConfig = Record<string, SectionConfig>;
