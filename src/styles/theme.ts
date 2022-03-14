export const LIGHT = {
  bgColor: '#ffffff',
  fontColor: '#000000',
};

export const DARK = {
  bgColor: '#191B1F',
  fontColor: '#ffffff',
};
export interface themeType {
  bgColor: string;
  fontColor: string;
}
interface modeType {
  [key: string]: themeType;
}

export const MODE: modeType = {
  LIGHT,
  DARK,
};
