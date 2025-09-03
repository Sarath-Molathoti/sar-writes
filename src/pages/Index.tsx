import { useState, useMemo, useEffect } from 'react';
import { getAllPosts, getCategories, getAllTags, searchPosts } from '@/lib/posts';
import { PostList } from '@/components/PostList';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { TagFilter } from '@/components/TagFilter';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Filter, Mail, Code, Briefcase, Sparkles, ArrowRight, BookOpen, Users, Award, TrendingUp } from 'lucide-react';
import { usePosts } from '@/hooks/usePosts';

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Use the hook to get posts dynamically
  const { posts: dynamicPosts, loading, error } = usePosts();
  
  // Use dynamic posts only
  const allPosts = dynamicPosts;
  
  // Get categories and tags from loaded posts
  const categories = useMemo(() => {
    if (!allPosts || allPosts.length === 0) return [];
    const cats = new Set(allPosts.map(post => post.category));
    return Array.from(cats).sort();
  }, [allPosts]);
  
  const tags = useMemo(() => {
    if (!allPosts || allPosts.length === 0) return [];
    const allTagsSet = new Set(allPosts.flatMap(post => post.tags));
    return Array.from(allTagsSet).sort();
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    if (!allPosts || allPosts.length === 0) return [];
    
    let posts = allPosts;

    // Apply search filter
    if (searchQuery.trim()) {
      const lowercaseQuery = searchQuery.toLowerCase();
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.excerpt.toLowerCase().includes(lowercaseQuery) ||
        post.content.toLowerCase().includes(lowercaseQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );
    }

    // Apply category filter
    if (selectedCategory) {
      posts = posts.filter(post => post.category === selectedCategory);
    }

    // Apply tag filter
    if (selectedTags.length > 0) {
      posts = posts.filter(post =>
        selectedTags.some(tag => post.tags.includes(tag))
      );
    }

    return posts;
  }, [allPosts, searchQuery, selectedCategory, selectedTags]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedTags([]);
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedTags.length > 0;

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3 text-gray-900">Categories</h3>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>
      
      <Separator className="bg-gray-200" />
      
      <TagFilter
        tags={tags}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        onClearTags={() => setSelectedTags([])}
      />
      
      {hasActiveFilters && (
        <>
          <Separator className="bg-gray-200" />
          <Button variant="outline" onClick={clearAllFilters} className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
            Clear All Filters
          </Button>
        </>
      )}
    </div>
  );

  const stats = [
    { icon: BookOpen, label: 'Articles', value: allPosts.length.toString() },
    { icon: Users, label: 'Categories', value: categories.length.toString() },
    { icon: Award, label: 'Years Experience', value: '7+' },
    { icon: TrendingUp, label: 'Technologies', value: '15+' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section - Completely Redesigned */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-indigo-50/30 to-white">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(99, 102, 241, 0.05) 0%, transparent 50%)`
          }}></div>
        </div>

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Profile Content - Enhanced Layout */}
            <div className="lg:col-span-7 space-y-8">
              {/* Greeting with Animation */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="h-1 w-12 bg-gradient-to-r from-gray-900 to-indigo-600 rounded-full"></div>
                  <span className="text-indigo-600 font-medium tracking-wide uppercase text-sm">Welcome to my blog</span>
                </div>
                
                <div className="space-y-4">
                  <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-none">
                    Hi, I'm{' '}
                    <span className="bg-gradient-to-r from-gray-900 via-indigo-600 to-gray-900 bg-clip-text text-transparent">
                      Sarath
                    </span>
                    <div className="inline-block ml-4 text-5xl lg:text-7xl animate-bounce">👋</div>
                  </h1>
                  
                  <p className="text-2xl lg:text-3xl text-gray-600 font-light leading-relaxed">
                    Senior Engineer & Full-Stack Developer crafting innovative solutions
                  </p>
                </div>
              </div>

              {/* Enhanced Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-indigo-100 rounded-xl group-hover:bg-indigo-200 transition-colors">
                      <Briefcase className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Current Role</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Senior Engineer at BEL, contributing to innovative endeavors
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-indigo-100 rounded-xl group-hover:bg-indigo-200 transition-colors">
                      <Code className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Expertise</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Full-stack development with 7+ years of experience
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech Stack Highlight */}
              <div className="p-8 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-2xl border border-gray-200/50">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Sparkles className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Tech Stack & Focus</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Specialized in modern technologies including <span className="font-semibold text-gray-900">React, Java, Spring Boot, DevOps, Flutter, Figma, and Material UI</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Java', 'Spring Boot', 'Python', 'DevOps', 'Flutter'].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm font-medium border border-gray-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg"
                  onClick={() => document.getElementById('blog-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore My Writing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-xl font-medium transition-all duration-300"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Get In Touch
                </Button>
              </div>
            </div>

            {/* Profile Image - Enhanced */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative group">
                {/* Animated background elements */}
                <div className="absolute -inset-8 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-400 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                
                {/* Main image container */}
                <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-105">
                  <img
                    src="/sarath.jpg"
                    alt="Molathoti Sarath"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/sarath.jpg";
                    }}
                  />
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center animate-bounce">
                  <Code className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-indigo-600 rounded-full shadow-lg flex items-center justify-center animate-pulse">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>

        
        </div>
      </section>

      {/* Blog Posts Section - Enhanced */}
      <section id="blog-section" className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Section Header - Enhanced */}
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center space-x-3 px-4 py-2 bg-indigo-100 rounded-full">
              <BookOpen className="h-5 w-5 text-indigo-600" />
              <span className="text-indigo-600 font-medium text-sm uppercase tracking-wide">Latest Articles</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              {hasActiveFilters ? 'Search Results' : 'Knowledge Sharing'}
            </h2>
            
            <div className="h-1 w-24 bg-gradient-to-r from-gray-900 to-indigo-600 rounded mx-auto"></div>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Dive into my thoughts on web development, engineering practices, and cutting-edge technology trends. 
              Each article is crafted to share practical insights and real-world solutions.
            </p>
          </div>

          {/* Search and Filter Bar - Enhanced */}
          <div className="mb-12">
            <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                  <div className="flex-1 max-w-lg">
                    <SearchBar
                      value={searchQuery}
                      onChange={setSearchQuery}
                      placeholder="Search articles by title, content, or technology..."
                    />
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {/* Mobile Filter Button */}
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" className="lg:hidden border-gray-300 text-gray-700 hover:bg-gray-50">
                          <Filter className="h-4 w-4 mr-2" />
                          Filters
                          {(selectedCategory || selectedTags.length > 0) && (
                            <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                              {(selectedCategory ? 1 : 0) + selectedTags.length}
                            </span>
                          )}
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="bg-white border-gray-200">
                        <div className="mt-8">
                          <FilterSidebar />
                        </div>
                      </SheetContent>
                    </Sheet>
                    
                    {/* Results Count */}
                    <div className="flex items-center space-x-2 text-sm text-gray-700 bg-gray-100 px-6 py-3 rounded-full border border-gray-200">
                      <BookOpen className="h-4 w-4" />
                      <span className="font-medium">
                        {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Sidebar - Enhanced */}
            <div className="lg:col-span-1 hidden lg:block">
              <Card className="sticky top-24 bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                      <Filter className="h-5 w-5 text-indigo-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                  </div>
                  <FilterSidebar />
                </CardContent>
              </Card>
            </div>

            {/* Posts Grid */}
            <div className="lg:col-span-3">
              <PostList posts={filteredPosts} loading={loading} />
              {error && (
                <div className="text-center py-8">
                  <p className="text-red-600 mb-4">Failed to load posts: {error}</p>
                </div>
              )}
              {!loading && !error && filteredPosts.length === 0 && allPosts.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-2xl font-semibold mb-2 text-gray-900">No posts available</h3>
                  <p className="text-gray-600 text-lg">
                    Posts are being loaded from the markdown files.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Enhanced */}
      <footer className="border-t border-gray-200 py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-gray-900">Molathoti Sarath</h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                Senior Engineer at BEL • Full-Stack Developer • Tech Enthusiast
              </p>
              <div className="h-1 w-16 bg-gradient-to-r from-gray-900 to-indigo-600 rounded mx-auto"></div>
            </div>
            
            <div className="inline-flex items-center space-x-4 text-gray-700 bg-gray-50 px-8 py-4 rounded-2xl border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer group">
              <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                <Mail className="h-5 w-5 text-indigo-600" />
              </div>
              <span className="font-medium text-lg">molathoti.sarath@example.com</span>
            </div>
            
            <Separator className="bg-gray-200" />
            
            <div className="flex flex-col sm:flex-row items-center justify-between text-gray-500">
              <p className="text-sm">
                © 2024 SAR Writes. All rights reserved.
              </p>
              <p className="text-sm mt-2 sm:mt-0">
                Built with React & TailwindCSS
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}