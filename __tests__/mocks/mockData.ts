import { Card } from '../../src/types/card.types';

export const mockCards: Card[] = [
  {
    cardId: '1',
    name: 'Fireball',
    type: 'Spell',
    cardSet: 'Basic',
    img: 'https://example.com/cards/fireball.png',
  },
  {
    cardId: '2',
    name: 'Frostbolt',
    type: 'Spell',
    cardSet: 'Basic',
    img: 'https://example.com/cards/frostbolt.png',
  },
  {
    cardId: '3',
    name: 'Mountain Giant',
    type: 'Minion',
    cardSet: 'Classic',
    img: 'https://example.com/cards/mountain_giant.png',
  },
  {
    cardId: '4',
    name: 'Fiery War Axe',
    type: 'Weapon',
    cardSet: 'Basic',
    img: 'https://example.com/cards/fiery_war_axe.png',
  },
];

export const mockCardTypes = ['Spell', 'Minion', 'Weapon'];

export const mockCardsByType: Record<string, Card[]> = {
  Spell: mockCards.filter(card => card.type === 'Spell'),
  Minion: mockCards.filter(card => card.type === 'Minion'),
  Weapon: mockCards.filter(card => card.type === 'Weapon'),
};

export const mockApiResponse = {
  Basic: mockCards.filter(card => card.cardSet === 'Basic'),
  Classic: mockCards.filter(card => card.cardSet === 'Classic'),
};

export const largeCardSet: Card[] = Array.from({ length: 20 }, (_, index) => ({
  cardId: `${index + 1}`,
  name: `Card ${index + 1}`,
  cardSet: index % 2 === 0 ? 'Basic' : 'Classic',
  type: 'Spell',
  img: `https://example.com/cards/card_${index + 1}.png`,
}));

export const mockSearchResults: Card[] = [
  { cardId: '1', name: 'Fireball', cardSet: 'Basic', type: 'Spell', img: 'img1' },
  { cardId: '2', name: 'Frostbolt', cardSet: 'Classic', type: 'Spell', img: 'img2' },
];

describe('Mock Data Validation', () => {
  it('should have valid mock cards data structure', () => {
    expect(Array.isArray(mockCards)).toBe(true);
    expect(mockCards.length).toBeGreaterThan(0);
    mockCards.forEach(card => {
      expect(card).toHaveProperty('cardId');
      expect(card).toHaveProperty('name');
      expect(card).toHaveProperty('type');
      expect(card).toHaveProperty('cardSet');
      expect(card).toHaveProperty('img');
    });
  });

  it('should have valid card types', () => {
    expect(Array.isArray(mockCardTypes)).toBe(true);
    expect(mockCardTypes).toContain('Spell');
    expect(mockCardTypes).toContain('Minion');
    expect(mockCardTypes).toContain('Weapon');
  });

  it('should have valid mockCardsByType structure', () => {
    expect(mockCardsByType).toHaveProperty('Spell');
    expect(mockCardsByType).toHaveProperty('Minion');
    expect(mockCardsByType).toHaveProperty('Weapon');
    expect(Array.isArray(mockCardsByType.Spell)).toBe(true);
    expect(Array.isArray(mockCardsByType.Minion)).toBe(true);
    expect(Array.isArray(mockCardsByType.Weapon)).toBe(true);
  });

  it('should have valid largeCardSet structure', () => {
    expect(Array.isArray(largeCardSet)).toBe(true);
    expect(largeCardSet.length).toBe(20);
    largeCardSet.forEach((card, index) => {
      expect(card).toHaveProperty('cardId', `${index + 1}`);
      expect(card).toHaveProperty('name', `Card ${index + 1}`);
      expect(card).toHaveProperty('cardSet');
      expect(card).toHaveProperty('type', 'Spell');
      expect(card).toHaveProperty('img');
    });
  });

  it('should have valid mockSearchResults structure', () => {
    expect(Array.isArray(mockSearchResults)).toBe(true);
    expect(mockSearchResults.length).toBe(2);
    mockSearchResults.forEach(card => {
      expect(card).toHaveProperty('cardId');
      expect(card).toHaveProperty('name');
      expect(card).toHaveProperty('type');
      expect(card).toHaveProperty('cardSet');
      expect(card).toHaveProperty('img');
    });
  });
});
