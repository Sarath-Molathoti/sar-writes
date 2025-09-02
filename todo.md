# SAR Writes Blog Updates - MVP Implementation

## Files to Create/Update:

1. /images/Profile.jpg** - Profile photo (to be added by user)
2. **posts/** - New posts directory structure
   - posts/react/getting-started-with-react.md
   - posts/javascript/modern-javascript-features.md
3. **src/components/Header.tsx** - Update blog name, remove About/Contact nav
4. **src/pages/Index.tsx** - Complete homepage redesign with profile
5. **src/App.tsx** - Remove About/Contact routes
6. **src/components/PostDetail.tsx** - Fix code block rendering and TOC
7. **src/lib/posts.ts** - Update to handle new posts structure and optional cover images
8. **src/types/blog.ts** - Already supports optional coverImage

## Key Features:
- Blog name changed to "SAR Writes"
- Homepage shows profile info with photo
- Remove About/Contact sections
- Email contact at bottom
- Fix code block rendering issues
- Optional cover images for posts
- New posts folder structure with categories
- Responsive design maintained

## Implementation Priority:
1. Update header and navigation
2. Redesign homepage with profile
3. Create new posts structure
4. Fix post detail rendering issues
5. Update routing