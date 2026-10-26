import { createTheme, type MantineColorsTuple } from '@mantine/core';

// mantine нужно 10 оттенков на цвет, наши цвета из гаммы стоят на 7 и 9 месте
const olive: MantineColorsTuple = [
  '#f4f5e7', '#e6e8c9', '#d1d5a0', '#b9bf74', '#a3ab52',
  '#8b9440', '#6f7633', '#5A5E27', '#474a1f', '#343617',
];

const wine: MantineColorsTuple = [
  '#ffe9ee', '#f7ccd4', '#ea97a6', '#de5f76', '#d4324f',
  '#c21b3b', '#a30f2b', '#870722', '#73031c', '#640017',
];

export const theme = createTheme({
  colors: { olive, wine },
  primaryColor: 'olive',
  primaryShade: 7,
  fontFamily: 'Manrope, system-ui, sans-serif',
  headings: { fontFamily: 'Unbounded, Manrope, sans-serif', fontWeight: '600' },
  defaultRadius: 'md',
});
