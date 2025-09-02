import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearTags: () => void;
}

export function TagFilter({ tags, selectedTags, onTagToggle, onClearTags }: TagFilterProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Filter by Tags</h3>
        {selectedTags.length > 0 && (
          <button
            onClick={onClearTags}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Clear all
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <Badge
              key={tag}
              variant={isSelected ? "default" : "outline"}
              className={`cursor-pointer transition-colors ${
                isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              }`}
              onClick={() => onTagToggle(tag)}
            >
              {tag}
              {isSelected && <X className="ml-1 h-3 w-3" />}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}