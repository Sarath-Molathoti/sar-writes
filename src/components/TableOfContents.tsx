import { useEffect, useState } from 'react';
import { generateTableOfContents } from '@/lib/markdown';
import { List } from 'lucide-react';

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [toc, setToc] = useState<Array<{ id: string; title: string; level: number }>>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const tocItems = generateTableOfContents(content);
    // Filter to only include H2 headings (## headings only)
    const mainHeadings = tocItems.filter(item => item.level === 2);
    setToc(mainHeadings);
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
      const headings = document.querySelectorAll('h2[id]');
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
        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg mr-3">
          <List className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white text-base">Contents</h3>
      </div>
      
      <nav className="space-y-1">
        {toc.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToHeading(item.id)}
            className={`group flex items-center w-full text-left text-sm py-2 px-3 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${
              activeId === item.id
                ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-medium border-l-2 border-indigo-500'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <div 
              className={`w-2 h-2 rounded-full mr-3 flex-shrink-0 transition-colors ${
                activeId === item.id ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-gray-400 dark:bg-gray-500 group-hover:bg-gray-600 dark:group-hover:bg-gray-300'
              }`} 
            />
            <span className="leading-relaxed break-words">{item.title}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}