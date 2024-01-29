import {
  createTheme,
  defaultVariantColorsResolver,
  VariantColorsResolver,
  parseThemeColor,
} from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'green',
  colors: {
    green: ['#76A18C', '#689881', '#598E74', '#488366', '#367757', '#2D6349', '#244F3A', '#1A3829', '#132A1F', '#0D1C15'],
    yellow: ['#FCF5E2', '#FBEDCA', '#FAE4B2', '#FFD780', '#FFCB59', '#FFC039', '#F4B020', '#E4A319', '#D49612', '#C4890B'],
  },
  defaultRadius: '10px',
  fontFamily: '\'Inter\', Roboto, -apple-system, Segoe UI, sans-serif',
});

export const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);
  const parsedColor = parseThemeColor({
    color: input.color || input.theme.primaryColor,
    theme: input.theme,
  });

  if (parsedColor.isThemeColor && parsedColor.color === 'yellow' && input.variant === 'filled') {
    return {
      ...defaultResolvedColors,
      color: 'black',
    };
  }

  return defaultResolvedColors;
}