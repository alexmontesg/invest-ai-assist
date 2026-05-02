import { Money } from './money';

describe('money', () => {
  describe('creation', () => {
    it('creates a money object from the smallest unit', () => {
      const money = Money.fromMinor(100);

      expect(money.amount).toEqual(1);
    });

    it('creates a money object from unit', () => {
      const money = Money.fromUnit(100);

      expect(money.amount).toEqual(100);
    });
  });

  describe('operations', () => {
    it('adds amounts correctly', () => {
      const money1 = Money.fromUnit(100);
      const money2 = Money.fromUnit(50);

      expect(money1.add(money2).amount).toEqual(150);
    });

    it('subtracts amounts correctly', () => {
      const money1 = Money.fromUnit(100);
      const money2 = Money.fromUnit(50);

      expect(money1.subtract(money2).amount).toEqual(50);
    });

    it('multiplies correctly', () => {
      const money = Money.fromUnit(100);

      expect(money.multiply(5).amount).toEqual(500);
    });
  });

  describe('comparisons', () => {
    it('returns a positive number when this > other', () => {
      const money1 = Money.fromUnit(100);
      const money2 = Money.fromUnit(50);

      expect(money1.compare(money2)).toBeGreaterThan(0);
    });

    it('returns a negative number when this < other', () => {
      const money1 = Money.fromUnit(100);
      const money2 = Money.fromUnit(500);

      expect(money1.compare(money2)).toBeLessThan(0);
    });

    it('returns zero when this = other', () => {
      const money1 = Money.fromUnit(100);
      const money2 = Money.fromUnit(100);

      expect(money1.compare(money2)).toBe(0);
    });
  });

  describe('equality', () => {
    it('returns true when this = other', () => {
      const money1 = Money.fromUnit(100);
      const money2 = Money.fromUnit(100);

      expect(money1.equals(money2)).toBeTruthy();
    });

    it('returns false when this != other', () => {
      const money1 = Money.fromUnit(100);
      const money2 = Money.fromUnit(50);

      expect(money1.equals(money2)).toBeFalsy();
    });
  });
});
