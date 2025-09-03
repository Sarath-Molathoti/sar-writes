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
      <div className="flex items-center mb-6">
        <div className="p-3 bg-indigo-100 rounded-lg mr-4">
          <List className="h-5 w-5 text-indigo-600" />
        </div>
        <h3 className="font-bold text-gray-900 text-lg">Table of Contents</h3>
      </div>
      
      <nav className="space-y-2">
        {toc.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToHeading(item.id)}
            className={`group flex items-start w-full text-left text-sm py-3 px-4 rounded-lg transition-all duration-200 hover:bg-gray-50 ${
              activeId === item.id
                ? 'bg-indigo-100 text-indigo-700 font-semibold border-l-3 border-indigo-500 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            style={{ paddingLeft: `${(item.level - 1) * 16 + 16}px` }}
          >
            <ChevronRight 
              className={`h-4 w-4 mr-3 mt-0.5 flex-shrink-0 transition-transform ${
                activeId === item.id ? 'rotate-90 text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'
              }`} 
            />
            <span className="leading-relaxed break-words">{item.title}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}