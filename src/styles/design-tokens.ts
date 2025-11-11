// Design Tokens do Sistema Acadêmico
// Tokens semânticos para garantir consistência visual

export const designTokens = {
  colors: {
    primary: 'hsl(var(--primary))',
    primaryForeground: 'hsl(var(--primary-foreground))',
    primaryHover: 'hsl(var(--primary-hover))',
    primaryLight: 'hsl(var(--primary-light))',
    
    secondary: 'hsl(var(--secondary))',
    secondaryForeground: 'hsl(var(--secondary-foreground))',
    secondaryHover: 'hsl(var(--secondary-hover))',
    secondaryLight: 'hsl(var(--secondary-light))',
    
    success: 'hsl(var(--success))',
    successForeground: 'hsl(var(--success-foreground))',
    successLight: 'hsl(var(--success-light))',
    
    warning: 'hsl(var(--warning))',
    warningForeground: 'hsl(var(--warning-foreground))',
    warningLight: 'hsl(var(--warning-light))',
    
    destructive: 'hsl(var(--destructive))',
    destructiveForeground: 'hsl(var(--destructive-foreground))',
    destructiveLight: 'hsl(var(--destructive-light))',
    
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    
    muted: 'hsl(var(--muted))',
    mutedForeground: 'hsl(var(--muted-foreground))',
    mutedDark: 'hsl(var(--muted-dark))',
    
    border: 'hsl(var(--border))',
    input: 'hsl(var(--input))',
    ring: 'hsl(var(--ring))',
  },
  
  gradients: {
    primary: 'var(--gradient-primary)',
    secondary: 'var(--gradient-secondary)',
    hero: 'var(--gradient-hero)',
  },
  
  shadows: {
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    xl: 'var(--shadow-xl)',
  },
  
  transitions: {
    smooth: 'var(--transition-smooth)',
    bounce: 'var(--transition-bounce)',
  },
  
  radius: {
    sm: 'calc(var(--radius) - 4px)',
    md: 'calc(var(--radius) - 2px)',
    lg: 'var(--radius)',
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
} as const;

export type DesignTokens = typeof designTokens;
