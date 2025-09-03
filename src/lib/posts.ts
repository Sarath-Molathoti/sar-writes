import { BlogPost, BlogMetadata } from '@/types/blog';

// Function to calculate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Type for frontmatter data
interface FrontmatterData {
  title?: string;
  slug?: string;
  date?: string;
  author?: string;
  category?: string;
  tags?: string[];
  excerpt?: string;
  [key: string]: unknown;
}

// Simple frontmatter parser for browser environment
function parseFrontmatter(content: string): { data: FrontmatterData; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const frontmatterText = match[1];
  const bodyContent = match[2];
  
  // Parse YAML-like frontmatter
  const data: FrontmatterData = {};
  const lines = frontmatterText.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = trimmed.substring(0, colonIndex).trim();
    let value: string = trimmed.substring(colonIndex + 1).trim();
    
    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    
    // Handle arrays (tags)
    if (value.startsWith('[') && value.endsWith(']')) {
      const arrayValue = value.slice(1, -1)
        .split(',')
        .map(item => item.trim().replace(/['"]/g, ''))
        .filter(item => item.length > 0);
      data[key] = arrayValue;
    } else {
      data[key] = value;
    }
  }
  
  return { data, content: bodyContent };
}

// Function to get all available post files
function getAvailablePostFiles(): string[] {
  return [
    '/posts/javascript/modern-javascript-features.md',
    '/posts/react/getting-started-with-react.md',
    '/posts/security/ethical-hacking-fundamentals.md',
    '/posts/security/penetration-testing-basics.md',
    '/posts/system-design/caching-comprehensive-guide.md'
  ];
}

// Function to fetch and parse a markdown file
async function fetchAndParsePost(filePath: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      console.warn(`Failed to fetch ${filePath}: ${response.status}`);
      return null;
    }
    
    const fileContent = await response.text();
    const { data, content } = parseFrontmatter(fileContent);
    
    // Extract slug from file path
    const slug = filePath.split('/').pop()?.replace('.md', '') || '';
    
    // Validate required frontmatter fields
    if (!data.title || !data.date || !data.category) {
      console.warn(`Missing required frontmatter in ${filePath}`, data);
      return null;
    }
    
    return {
      slug: data.slug || slug,
      title: data.title,
      date: data.date,
      author: data.author || 'Molathoti Sarath',
      category: data.category,
      tags: Array.isArray(data.tags) ? data.tags : [],
      excerpt: data.excerpt || '',
      content: content.trim(),
      readingTime: calculateReadingTime(content)
    };
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error);
    return null;
  }
}

// Cache for posts to avoid repeated fetching
let postsCache: BlogPost[] | null = null;
let cachePromise: Promise<BlogPost[]> | null = null;

// Function to load all posts dynamically
async function loadAllPosts(): Promise<BlogPost[]> {
  if (postsCache) {
    return postsCache;
  }
  
  if (cachePromise) {
    return cachePromise;
  }
  
  cachePromise = (async () => {
    try {
      const markdownFiles = getAvailablePostFiles();
      const postPromises = markdownFiles.map(fetchAndParsePost);
      const posts = await Promise.all(postPromises);
      
      // Filter out null results and sort by date
      const validPosts = posts
        .filter((post): post is BlogPost => post !== null)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      console.log(`Loaded ${validPosts.length} posts dynamically`);
      postsCache = validPosts;
      return validPosts;
    } catch (error) {
      console.error('Error loading posts:', error);
      // Return empty array instead of sample posts
      return [];
    }
  })();
  
  return cachePromise;
}

// Public API functions
export function getAllPosts(): BlogPost[] {
  // Return cached posts if available, otherwise return empty array
  if (postsCache) {
    return postsCache;
  }
  
  // Trigger loading but return empty array for initial render
  loadAllPosts();
  return [];
}

export async function getAllPostsAsync(): Promise<BlogPost[]> {
  return await loadAllPosts();
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find(post => post.slug === slug);
}

export async function getPostBySlugAsync(slug: string): Promise<BlogPost | undefined> {
  const posts = await loadAllPosts();
  return posts.find(post => post.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getAllPosts();
  return posts.filter(post => post.category.toLowerCase() === category.toLowerCase());
}

export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getAllPosts();
  return posts.filter(post => post.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
}

export function searchPosts(query: string): BlogPost[] {
  const posts = getAllPosts();
  const lowercaseQuery = query.toLowerCase();
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

export function getCategories(): string[] {
  const posts = getAllPosts();
  if (!posts || posts.length === 0) {
    return [];
  }
  const categories = new Set(posts.map(post => post.category));
  return Array.from(categories).sort();
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  if (!posts || posts.length === 0) {
    return [];
  }
  const tags = new Set(posts.flatMap(post => post.tags));
  return Array.from(tags).sort();
}

export function getRelatedPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
  const posts = getAllPosts();
  if (!posts || posts.length === 0) {
    return [];
  }
  return posts
    .filter(post => post.slug !== currentPost.slug)
    .filter(post => 
      post.category === currentPost.category ||
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .slice(0, limit);
}