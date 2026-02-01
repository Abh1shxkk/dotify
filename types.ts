export interface ParsedEmail {
  username: string;
  domain: string;
  isValid: boolean;
}

export interface GeneratorState {
  parsed: ParsedEmail | null;
  totalVariations: number;
  currentPage: number;
}

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'error';
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}
