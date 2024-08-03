export type Cards = Card[]

export interface Card {
  aliases: string[]
  faces: Face[]
  formats: Formats
  id: number
  number: string
  rarity: string
  set: Set
  version: number
}

export interface Face {
  abilities: string[]
  colors?: string[]
  cost?: number
  flavor?: string
  image: string
  name: string
  orientation: string
  play_requirements?: PlayRequirements
  power?: number
  subtitle?: string
  title: string
  traits: string[]
  type: string
  home_limit?: number
  side?: string
  points?: number
  bonus_points?: number
  opponents_requirements?: OpponentsRequirements
  your_requirements?: YourRequirements
}

export interface PlayRequirements {
  required?: Required
}

export interface Required {
  Purple?: number
  Blue?: number
  White?: number
  Orange?: number
  Yellow?: number
  Pink?: number
}

export interface OpponentsRequirements {
  required: Required2
}

export interface Required2 {
  Wild?: number
  Blue?: number
  Orange?: number
  Pink?: number
  Purple?: number
  White?: number
  Yellow?: number
}

export interface YourRequirements {
  prohibited?: Prohibited
  required: Required3
}

export interface Prohibited {
  White?: number
  Yellow?: number
  Purple?: number
  Orange?: number
  Blue?: number
  Pink?: number
}

export interface Required3 {
  White?: number
  Yellow?: number
  Wild?: number
  Purple?: number
  Pink?: number
  Orange?: number
  Blue?: number
}

export interface Formats {
  Adventure: string
  Core: string
  "DE Block": string
  "EO Block": string
  Harmony: string
  "LL Block": string
  "NG Block": string
  "PR Block": string
}

export interface Set {
  code: string
  name: string
}
