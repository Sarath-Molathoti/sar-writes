import { useParams, Navigate } from 'react-router-dom';
import { getPostBySlug, getRelatedPosts } from '@/lib/posts';
import { PostDetail } from '@/components/PostDetail';

export default function PostDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/" replace />;
  }

  const post = getPostBySlug(slug);
  
  if (!post) {
    return <Navigate to="/" replace />;
  }

  const relatedPosts = getRelatedPosts(post);

  return <PostDetail post={post} relatedPosts={relatedPosts} />;
}