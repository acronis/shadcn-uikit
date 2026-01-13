export const themes = [
  { name: 'Default Light', className: '', icon: '☀️' },
  { name: 'Default Dark', className: 'dark', icon: '🌙' },
  { name: 'Acronis Blue', className: 'theme-acronis-blue', icon: '🔵' },
  { name: 'Acronis Orange', className: 'theme-acronis-orange', icon: '🟠' },
  { name: 'Green', className: 'theme-green', icon: '🟢' },
  { name: 'Purple', className: 'theme-purple', icon: '🟣' },
] as const;

export type Theme = typeof themes[number];
