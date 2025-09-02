import { BlogPost } from '@/types/blog';

export function generateTableOfContents(content: string): Array<{ id: string; title: string; level: number }> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc: Array<{ id: string; title: string; level: number }> = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    toc.push({ id, title, level });
  }

  return toc;
}

export function addHeadingIds(content: string): string {
  return content.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, title) => {
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    return `${hashes} ${title} {#${id}}`;
  });
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function getShareUrl(post: BlogPost, platform: 'twitter' | 'linkedin' | 'facebook'): string {
  const url = encodeURIComponent(`${window.location.origin}/post/${post.slug}`);
  const title = encodeURIComponent(post.title);
  const text = encodeURIComponent(post.excerpt);

  switch (platform) {
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    default:
      return '';
  }
}