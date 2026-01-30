# LendGuard AI Design System

Complete design system documentation for building consistent, accessible, and beautiful interfaces for LendGuard AI.

## 🎨 Color System

### Brand Colors
- **Primary (Sky Blue)**: `#0EA5E9` - Primary actions, links, brand elements
- **Secondary (Emerald)**: `#10B981` - Secondary actions, success states

### Semantic Colors
- **Destructive (Red)**: `#EF4444` - Errors, destructive actions, alerts
- **Warning (Amber)**: `#F59E0B` - Warnings, cautionary information
- **Success (Green)**: `#22C55E` - Success states, confirmations
- **Info (Sky Blue)**: `#0EA5E9` - Informational messages

### Neutral Colors
- **Background (Dark)**: `#0F172A` - Main background, dark mode base
- **Background (Light)**: `#F8FAFC` - Light mode background
- **Text Primary**: `#18181B` - Primary text content
- **Text Secondary**: `#71717A` - Secondary text, subtle elements

### Accessibility
All color combinations meet WCAG 2.1 AA standards with contrast ratios > 4.5:1.

## 📝 Typography

### Font Families
- **Sans Serif**: Inter - Headings (600-800 weight) and body text (400-500 weight)
- **Monospace**: Fira Code - Code snippets and technical content

### Type Scale
- **Heading 1**: 48px, Bold (font-extrabold)
- **Heading 2**: 36px, Bold (font-bold)
- **Heading 3**: 30px, Semibold (font-semibold)
- **Heading 4**: 24px, Semibold
- **Heading 5**: 20px, Semibold
- **Heading 6**: 18px, Semibold
- **Body**: 16px, Regular (font-normal) - Use `leading-relaxed` (1.625 line-height)
- **Small**: 14px, Regular
- **Extra Small**: 12px, Regular

### Best Practices
- Use `leading-relaxed` (1.625) or `leading-6` for body text readability
- Never use decorative fonts for body text or fonts smaller than 14px
- Wrap important copy in `text-balance` or `text-pretty` for optimal line breaks

## 📏 Spacing Scale

Based on 4px base unit:
- **XS**: 4px (`gap-1`, `p-1`)
- **SM**: 8px (`gap-2`, `p-2`)
- **MD**: 16px (`gap-4`, `p-4`) - Default spacing
- **LG**: 24px (`gap-6`, `p-6`)
- **XL**: 32px (`gap-8`, `p-8`)
- **2XL**: 48px (`gap-12`, `p-12`)

## 🔲 Border Radius

- **SM**: 4px (`rounded-sm`)
- **MD**: 8px (`rounded-md`)
- **LG**: 12px (`rounded-lg`) - Default radius
- **XL**: 16px (`rounded-xl`)
- **FULL**: 9999px (`rounded-full`) - Pills and circles

## 🧩 Component Library

### Buttons
Five variants for different contexts:
- **Primary** (`variant="default"`) - Main actions
- **Secondary** (`variant="secondary"`) - Alternative actions
- **Outline** (`variant="outline"`) - Subtle actions
- **Ghost** (`variant="ghost"`) - Minimal emphasis
- **Destructive** (`variant="destructive"`) - Delete, cancel actions

Sizes: `sm`, `default`, `lg`, `icon`

### Badges
Status indicators and labels:
- **Default** - General labels
- **Secondary** - Alternative status
- **Outline** - Subtle status
- **Destructive** - Error status
- **Success** - Success status (custom class)
- **Warning** - Warning status (custom class)

### Cards
Content containers:
- **Default** - Standard border style
- **Glassmorphic** (`.glass`) - Translucent blur effect
- **Elevated** (`.hover-lift`) - Shadow with hover effect

### Form Controls
- **Input** - Text, email, number fields
- **Textarea** - Multi-line text input
- **Select** - Dropdown selection
- **Switch** - Toggle on/off
- **Slider** - Range selection
- **Checkbox** - Multiple selection
- **Radio** - Single selection

### Feedback Components
- **Alert** - Contextual messages (info, success, warning, error)
- **Toast** - Temporary notifications via Sonner
- **Progress** - Loading progress indicators
- **Skeleton** - Loading placeholders

### Empty States
Use the `EmptyState` component for no-data scenarios with optional actions.

## 🎬 Animations

### Hover Effects
- **Lift** (`.hover-lift`) - Elevate on hover with shadow
- **Glow** (`.hover-glow`) - Glowing border effect
- **Scale** (`hover:scale-105`) - Slight scale up

### Entry Animations
- **Fade In** (`.animate-fade-in`) - Opacity + slide up
- **Slide In Left** (`.animate-slide-in-left`) - Slide from left
- **Slide In Right** (`.animate-slide-in-right`) - Slide from right
- **Bounce In** (`.animate-bounce-in`) - Bouncy entrance

### Feedback Animations
- **Shake** (`.animate-shake`) - Error indication
- **Pulse Glow** (`.animate-pulse-glow`) - Attention grabber
- **Spin** (`animate-spin`) - Loading indicator

### Continuous Animations
- **Float** (`.animate-float-slow/medium/fast`) - Floating elements
- **Glow Loop** (`.animate-glow`) - Continuous glow effect

## 🎯 Icons

Using **Lucide React** for all icons.

### Sizes
- 16px (`h-4 w-4`) - Inline with text, buttons
- 20px (`h-5 w-5`) - Standard UI elements
- 24px (`h-6 w-6`) - Section headers, cards
- 32px (`h-8 w-8`) - Feature highlights, empty states

### Best Practices
- Always pair icons with text labels for clarity
- Use semantic colors (success, warning, destructive)
- Maintain consistent sizing within components
- Add aria-labels for standalone icons

## 🌐 Accessibility

### Requirements
- **WCAG 2.1 AA compliant** - All interfaces meet accessibility standards
- **Color contrast** - Minimum 4.5:1 ratio for text
- **Keyboard navigation** - All interactive elements keyboard accessible
- **Screen readers** - Proper ARIA labels and semantic HTML
- **Focus visible** - Clear focus indicators (`.focus-ring`)

### Implementation
- Use semantic HTML elements (`<main>`, `<header>`, `<nav>`)
- Add proper ARIA roles and attributes
- Use `sr-only` class for screen reader only text
- Provide alt text for all meaningful images
- Test with keyboard navigation and screen readers

## 🎨 Glassmorphism

Use glassmorphism for modern, translucent UI elements:
- **Glass** (`.glass`) - Dark background with blur
- **Glass Light** (`.glass-light`) - Light background with blur

```tsx
<Card className="glass">
  <CardContent>Glassmorphic content</CardContent>
</Card>
```

## 📦 Exporting Design Tokens

Design tokens are available in multiple formats:
- **CSS Variables** - In `globals.css`
- **JSON** - Via `lib/design-tokens.ts` exports
- **TypeScript** - Strongly typed constants

```typescript
import { designTokens, exportDesignTokensAsJSON, exportDesignTokensAsCSS } from '@/lib/design-tokens'
```

## 🚀 Getting Started

1. **Review the design system page** at `/dashboard/design-system`
2. **Use design tokens** from `lib/design-tokens.ts`
3. **Import components** from `@/components/ui/*`
4. **Follow guidelines** in this documentation
5. **Test accessibility** with keyboard and screen readers

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
