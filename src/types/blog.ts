export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  excerpt: string;
  coverImage?: string;
  content: string;
  readingTime: number;
}

export interface BlogMetadata {
  title: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  excerpt: string;
  coverImage?: string;
}

export interface CategoryCount {
  [key: string]: number;
}

export interface TagCount {
  [key: string]: number;
}