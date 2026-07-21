export interface MenuPage {
    title: string;
    url: string;
    category: string;
    tooltip?: string;
}

export interface MenuContact {
    url: string;
    network?: string;
    target?: string;
    label?: string;
}

export interface MenuData {
    menu_pages: MenuPage[];
    menu_contacts: MenuContact[];
}

export interface SectionMetaIcon {
    url: string;
    sizes: string;
    type: string;
}

export interface SectionMetaOpenGraphImage {
    url: string;
    width: number;
    height: number;
}

export interface SectionMetaOpenGraph {
    title: string;
    description: string;
    locale: string;
    type: string;
    url: string;
    siteName: string;
    images: SectionMetaOpenGraphImage[];
}

export interface SectionMetaRobots {
    index: boolean;
    follow: boolean;
    nocache: boolean;
    googleBot: {
        index: boolean;
        follow: boolean;
        noimageindex: boolean;
    };
}

export interface SectionMetaTwitter {
    card: string;
    title: string;
    description: string;
    images?: string[];
}

export interface SectionMetaIcons {
    icon: SectionMetaIcon[];
    apple: SectionMetaIcon[];
}

export interface SectionMetaOther {
    [key: string]: string;
    "dc.title": string;
    "dc.description": string;
    "dc.relation": string;
    "dc.source": string;
    "dc.language": string;
}

export interface SectionMeta {
    title: string;
    description: string;
    category: string;
    openGraph: SectionMetaOpenGraph;
    robots: SectionMetaRobots;
    icons?: SectionMetaIcons;
    twitter: SectionMetaTwitter;
    other: SectionMetaOther;
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
    sections: Record<string, SectionMeta>;
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
    "spacecadets",
    "theecrow",
    "radioshow",
    "discography",
] as const;
export type SectionCategory = (typeof SECTION_CATEGORIES)[number];

export interface SectionAboutConfig {
    image: string;
    image_alt: string;
    heading?: string;
    subheading?: string;
    "background-image"?: string;
}

/** Subsection config for posts (optional description). */
export interface SectionPostsConfig {
    description?: string;
    "background-image"?: string;
}

/** Subsection config for gigs (optional description). */
export interface SectionGigsConfig {
    label?: string;
    description?: string;
    "background-image"?: string;
}

/** Subsection config for videos (optional description). */
export interface SectionVideosConfig {
    description?: string;
    "background-image"?: string;
}

export interface SectionConfig {
    title: string;
    subtitle: string;
    description: string;
    about: SectionAboutConfig | null;
    posts?: SectionPostsConfig | null;
    gigs?: SectionGigsConfig | null;
    videos?: SectionVideosConfig | null;
}

export type SectionsConfig = Record<string, SectionConfig>;
