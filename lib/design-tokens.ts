/**
 * LendGuard AI Design System Tokens
 * Centralized design tokens for consistent theming
 */

export const designTokens = {
  colors: {
    primary: {
      hex: "#0EA5E9",
      rgb: "rgb(14, 165, 233)",
      hsl: "hsl(199, 89%, 48%)",
      name: "Sky Blue",
    },
    secondary: {
      hex: "#10B981",
      rgb: "rgb(16, 185, 129)",
      hsl: "hsl(158, 84%, 39%)",
      name: "Emerald",
    },
    destructive: {
      hex: "#EF4444",
      rgb: "rgb(239, 68, 68)",
      hsl: "hsl(0, 84%, 60%)",
      name: "Red",
    },
    warning: {
      hex: "#F59E0B",
      rgb: "rgb(245, 158, 11)",
      hsl: "hsl(38, 92%, 50%)",
      name: "Amber",
    },
    success: {
      hex: "#22C55E",
      rgb: "rgb(34, 197, 94)",
      hsl: "hsl(142, 71%, 45%)",
      name: "Green",
    },
    background: {
      dark: "#0F172A",
      light: "#F8FAFC",
    },
    text: {
      primary: "#18181B",
      secondary: "#71717A",
    },
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
  },

  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
  },

  typography: {
    fontFamily: {
      sans: "Inter, system-ui, sans-serif",
      mono: "Fira Code, monospace",
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
      "3xl": "30px",
      "4xl": "36px",
      "5xl": "48px",
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.625,
    },
  },

  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },

  animations: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
    },
    easing: {
      linear: "linear",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },

  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  iconSizes: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 48,
  },
} as const

/**
 * Export design tokens as JSON for external tools
 */
export function exportDesignTokensAsJSON() {
  return JSON.stringify(designTokens, null, 2)
}

/**
 * Export design tokens as CSS variables
 */
export function exportDesignTokensAsCSS() {
  return `
:root {
  /* Colors */
  --color-primary: ${designTokens.colors.primary.hex};
  --color-secondary: ${designTokens.colors.secondary.hex};
  --color-destructive: ${designTokens.colors.destructive.hex};
  --color-warning: ${designTokens.colors.warning.hex};
  --color-success: ${designTokens.colors.success.hex};

  /* Spacing */
  --spacing-xs: ${designTokens.spacing.xs};
  --spacing-sm: ${designTokens.spacing.sm};
  --spacing-md: ${designTokens.spacing.md};
  --spacing-lg: ${designTokens.spacing.lg};
  --spacing-xl: ${designTokens.spacing.xl};
  --spacing-2xl: ${designTokens.spacing["2xl"]};

  /* Border Radius */
  --radius-sm: ${designTokens.borderRadius.sm};
  --radius-md: ${designTokens.borderRadius.md};
  --radius-lg: ${designTokens.borderRadius.lg};
  --radius-xl: ${designTokens.borderRadius.xl};
  --radius-full: ${designTokens.borderRadius.full};

  /* Typography */
  --font-sans: ${designTokens.typography.fontFamily.sans};
  --font-mono: ${designTokens.typography.fontFamily.mono};
}
  `.trim()
}
