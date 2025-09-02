import { BlogPost } from '@/types/blog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link to={`/post/${post.slug}`} className="group block">
      <Card className="h-full bg-white hover:shadow-lg transition-all duration-300 border-0 shadow-sm hover:shadow-xl hover:-translate-y-1">
        <CardContent className="p-6 h-full flex flex-col">
          {/* Category Badge */}
          <div className="mb-4">
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 text-xs">
              {post.category}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 mb-4 line-clamp-3 flex-grow leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{post.readTime} min</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs text-gray-600">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs text-gray-500">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Read More */}
          <div className="flex items-center text-indigo-600 font-medium text-sm group-hover:text-indigo-700">
            Read more
            <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}