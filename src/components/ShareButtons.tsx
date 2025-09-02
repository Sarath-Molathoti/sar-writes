import { BlogPost } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { getShareUrl } from '@/lib/markdown';
import { Share2, Twitter, Linkedin, Facebook, Link2, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonsProps {
  post: BlogPost;
}

export function ShareButtons({ post }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: 'twitter' | 'linkedin' | 'facebook') => {
    const url = getShareUrl(post, platform);
    window.open(url, '_blank', 'width=600,height=400');
  };

  const copyToClipboard = async () => {
    const url = `${window.location.origin}/post/${post.slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center text-sm text-muted-foreground mr-2">
        <Share2 className="h-4 w-4 mr-1" />
        Share:
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('twitter')}
        className="h-8 px-3"
      >
        <Twitter className="h-3 w-3 mr-1" />
        Twitter
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('linkedin')}
        className="h-8 px-3"
      >
        <Linkedin className="h-3 w-3 mr-1" />
        LinkedIn
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('facebook')}
        className="h-8 px-3"
      >
        <Facebook className="h-3 w-3 mr-1" />
        Facebook
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={copyToClipboard}
        className="h-8 px-3"
      >
        {copied ? (
          <>
            <Check className="h-3 w-3 mr-1" />
            Copied!
          </>
        ) : (
          <>
            <Link2 className="h-3 w-3 mr-1" />
            Copy
          </>
        )}
      </Button>
    </div>
  );
}