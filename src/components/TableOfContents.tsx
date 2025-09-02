import { useEffect, useState } from 'react';
import { generateTableOfContents } from '@/lib/markdown';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { List, ChevronRight } from 'lucide-react';

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [toc, setToc] = useState<Array<{ id: string; title: string; level: number }>>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const tocItems = generateTableOfContents(content);
    setToc(tocItems);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { 
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0.1
      }
    );

    // Wait for content to render then observe headings
    const timer = setTimeout(() => {
      const headings = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
      headings.forEach((heading) => observer.observe(heading));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [content]);

  if (toc.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="p-2 bg-indigo-100 rounded-lg mr-3">
          <List className="h-4 w-4 text-indigo-600" />
        </div>
        <h3 className="font-semibold text-gray-900">Table of Contents</h3>
      </div>
      
      <nav className="space-y-1">
        {toc.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToHeading(item.id)}
            className={`group flex items-center w-full text-left text-sm py-2 px-3 rounded-lg transition-all duration-200 ${
              activeId === item.id
                ? 'bg-indigo-100 text-indigo-700 font-medium border-l-2 border-indigo-500'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            style={{ paddingLeft: `${(item.level - 1) * 12 + 12}px` }}
          >
            <ChevronRight 
              className={`h-3 w-3 mr-2 transition-transform ${
                activeId === item.id ? 'rotate-90 text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'
              }`} 
            />
            <span className="truncate">{item.title}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}