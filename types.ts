/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


export interface SpotlightProfile {
  id: string;
  name: string;
  category: 'Music' | 'Business';
  location: string; // e.g., "Charlotte, NC"
  image: string;
  tagline: string; // Short catchphrase
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  SPOTLIGHT = 'spotlight',
  VALUE = 'value',
  SUBMIT = 'submit',
}