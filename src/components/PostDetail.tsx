import { BlogPost } from '@/types/blog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, Tag, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ShareButtons } from './ShareButtons';
import { TableOfContents } from './TableOfContents';
import { PostCard } from './PostCard';
import { Header } from './Header';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface PostDetailProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export function PostDetail({ post, relatedPosts }: PostDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Consistent Header */}
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Updated grid layout: 85% total width usage with increased TOC width */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content - Maintains width but adjusted for new layout */}
          <div className="lg:col-span-8">
            {/* Back Navigation */}
            <div className="mb-6">
              <Button variant="ghost" asChild className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                <Link to="/" className="flex items-center">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Posts
                </Link>
              </Button>
            </div>

            {/* Post Header - Enhanced */}
            <div className="mb-8 bg-white rounded-2xl p-8 shadow-sm border border-gray-200/50">
              <div className="space-y-6">
                {/* Category Badge */}
                <div>
                  <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 px-3 py-1">
                    {post.category}
                  </Badge>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {post.title}
                </h1>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-light">
                    {post.excerpt}
                  </p>
                )}

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span className="font-medium">Molathoti Sarath</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex items-start gap-2">
                    <Tag className="h-4 w-4 mt-1 text-gray-500 flex-shrink-0" />
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs hover:bg-gray-50 transition-colors">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share Buttons */}
                <div className="pt-4 border-t border-gray-100">
                  <ShareButtons post={post} />
                </div>
              </div>
            </div>

            {/* Post Content - Enhanced with better code block handling */}
            <div className="bg-white rounded-2xl p-8 lg:p-12 mb-8 shadow-sm border border-gray-200/50">
              <div className="prose prose-lg prose-gray max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight, rehypeRaw]}
                  components={{
                    h1: ({ children, ...props }) => (
                      <h1 
                        id={typeof children === 'string' ? children.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-') : undefined}
                        className="text-3xl lg:text-4xl font-bold mt-12 mb-6 text-gray-900 leading-tight border-b border-gray-200 pb-4" 
                        {...props}
                      >
                        {children}
                      </h1>
                    ),
                    h2: ({ children, ...props }) => (
                      <h2 
                        id={typeof children === 'string' ? children.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-') : undefined}
                        className="text-2xl lg:text-3xl font-bold mt-10 mb-5 text-gray-900 leading-tight" 
                        {...props}
                      >
                        {children}
                      </h2>
                    ),
                    h3: ({ children, ...props }) => (
                      <h3 
                        id={typeof children === 'string' ? children.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-') : undefined}
                        className="text-xl lg:text-2xl font-bold mt-8 mb-4 text-gray-900 leading-tight" 
                        {...props}
                      >
                        {children}
                      </h3>
                    ),
                    h4: ({ children, ...props }) => (
                      <h4 
                        id={typeof children === 'string' ? children.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-') : undefined}
                        className="text-lg lg:text-xl font-bold mt-6 mb-3 text-gray-900" 
                        {...props}
                      >
                        {children}
                      </h4>
                    ),
                    p: ({ children }) => (
                      <p className="mb-6 leading-relaxed text-gray-700 text-lg">
                        {children}
                      </p>
                    ),
                    code: ({ children, className, ...props }) => {
                      const isInline = !className;
                      return isInline ? (
                        <code 
                          className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-base font-mono break-words border border-gray-200" 
                          {...props}
                        >
                          {children}
                        </code>
                      ) : (
                        <code 
                          className={`${className} text-sm leading-relaxed block`} 
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children }) => (
                      <div className="relative mb-8 group">
                        <pre className="bg-gray-900 text-gray-100 rounded-xl p-0 overflow-x-auto shadow-lg border border-gray-800 text-sm leading-relaxed font-mono">
                          {children}
                        </pre>
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex space-x-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-indigo-500 pl-6 italic text-gray-600 my-8 bg-indigo-50 py-4 rounded-r-lg">
                        {children}
                      </blockquote>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-gray-700">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal pl-6 mb-6 space-y-2 text-lg text-gray-700">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="leading-relaxed">
                        {children}
                      </li>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-8">
                        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="border border-gray-300 px-4 py-3 bg-gray-100 text-left font-semibold text-gray-900">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">
                        {children}
                      </td>
                    ),
                    img: ({ src, alt }) => (
                      <img 
                        src={src} 
                        alt={alt} 
                        className="rounded-xl my-8 max-w-full h-auto shadow-lg border border-gray-200" 
                      />
                    ),
                    a: ({ href, children }) => (
                      <a 
                        href={href} 
                        className="text-indigo-600 hover:text-indigo-700 underline decoration-indigo-600/30 hover:decoration-indigo-700 transition-colors font-medium"
                        target={href?.startsWith('http') ? '_blank' : undefined}
                        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>

            {/* Related Posts - Enhanced */}
            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200/50">
                <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-gray-900">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.slice(0, 4).map((relatedPost) => (
                    <PostCard key={relatedPost.slug} post={relatedPost} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Increased width from lg:col-span-1 to lg:col-span-4 */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Table of Contents - Enhanced with more space */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200/50">
                <TableOfContents content={post.content} />
              </div>

              {/* Author Card - Enhanced */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200/50">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-indigo-100">
                    <img
                      src="/sarath.jpg"
                      alt="Molathoti Sarath"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/sarath.jpg";
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-xl">Molathoti Sarath</h3>
                    <p className="text-sm text-gray-600 font-medium mt-2">Senior Engineer & Full-Stack Developer</p>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Passionate about creating innovative solutions and sharing knowledge through technical writing and open-source contributions.
                  </p>
                  <div className="pt-4 border-t border-gray-100">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Posts
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}