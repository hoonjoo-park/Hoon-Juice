export const LIGHT = {
  bgColor: '#ffffff',
  fontColor: '#191f28',
  footerColor: `#eaeaea`,
  quoteColor: '#eaeaea',
  codeBG: '#ececec',
  HR: '#bababa',
};

export const DARK = {
  bgColor: '#191B1F',
  fontColor: '#ffffff',
  footerColor: `#000000`,
  quoteColor: '#303030',
  codeBG: '2d2d2d',
  HR: '#3b4049',
};
export interface themeType {
  bgColor: string;
  fontColor: string;
  footerColor: string;
  quoteColor: string;
  codeBG: string;
  HR: string;
}
interface modeType {
  [key: string]: themeType;
}

export const MODE: modeType = {
  LIGHT,
  DARK,
};
