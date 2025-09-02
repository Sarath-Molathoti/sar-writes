import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <Select value={selectedCategory || 'all'} onValueChange={(value) => onCategoryChange(value === 'all' ? null : value)}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {selectedCategory && (
        <Badge variant="secondary" className="gap-1">
          {selectedCategory}
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => onCategoryChange(null)}
          />
        </Badge>
      )}
    </div>
  );
}