export interface Card {
  cardId: string;
  name: string;
  cardSet: string;
  type: string;
  faction?: string;
  rarity?: string;
  cost?: number;
  attack?: number;
  health?: number;
  text?: string;
  flavor?: string;
  artist?: string;
  collectible?: boolean;
  elite?: boolean;
  race?: string;
  playerClass?: string;
  howToGet?: string;
  howToGetGold?: string;
  img?: string;
  imgGold?: string;
  locale?: string;
}

export interface CardResponse {
  [key: string]: Card[];
}
