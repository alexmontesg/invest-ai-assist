import Currency from 'currency.js';

export class Money {
  private value: Currency;
  private currencyCode: string;
  private scale: number;

  private constructor(value: Currency, currencyCode: string, scale: number) {
    this.value = value;
    this.currencyCode = currencyCode;
    this.scale = scale;
  }

  /**
   * Create Money from the smallest unit (e.g., cents for USD, yen for JPY).
   * @param amount The amount in minor units (cents, etc.)
   * @param currencyCode ISO 4217 currency code (default: 'USD')
   */
  static fromMinor(amount: number, currencyCode = 'USD', scale = 100): Money {
    const value = new Currency(amount / scale, { fromCents: true });
    return new Money(value, currencyCode, scale);
  }

  /**
   * Create Money from major units (e.g., 12.34 for $12.34, 1000 for ¥1000).
   * @param amount The amount in major units
   * @param currencyCode ISO 4217 currency code (default: 'USD')
   */
  static fromUnit(
    amount: number | string,
    currencyCode = 'USD',
    scale = 100,
  ): Money {
    const value = new Currency(amount);
    return new Money(value, currencyCode, scale);
  }

  /**
   * Get the ISO 4217 currency code.
   */
  get currency(): string {
    return this.currencyCode;
  }

  /**
   * Get the amount as a number.
   */
  get amount(): number {
    return this.value.value;
  }

  /**
   * Get the amount as a string (precise representation).
   */
  toString(): string {
    return this.value.toString();
  }

  /**
   * Multiply this amount by a factor (e.g., price * quantity).
   * Returns a new Money instance.
   */
  multiply(factor: number | string): Money {
    const result = this.value.multiply(factor as number);
    return new Money(result, this.currencyCode, this.scale);
  }

  /**
   * Add another Money amount (currencies must match).
   */
  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error(
        `Cannot add money of different currencies: ${this.currency} + ${other.currency}`,
      );
    }
    const result = this.value.add(other.value);
    return new Money(result, this.currencyCode, this.scale);
  }

  /**
   * Subtract another Money amount (currencies must match).
   */
  subtract(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error(
        `Cannot subtract money of different currencies: ${this.currency} - ${other.currency}`,
      );
    }
    const result = this.value.subtract(other.value);
    return new Money(result, this.currencyCode, this.scale);
  }

  /**
   * Compare this amount with another (currencies must match).
   * Returns: -1 if less, 0 if equal, 1 if greater.
   */
  compare(other: Money): -1 | 0 | 1 {
    if (this.currency !== other.currency) {
      throw new Error(
        `Cannot compare money of different currencies: ${this.currency} vs ${other.currency}`,
      );
    }
    if (this.value.value < other.value.value) return -1;
    if (this.value.value > other.value.value) return 1;
    return 0;
  }

  /**
   * Check equality with another Money amount.
   */
  equals(other: Money): boolean {
    return (
      this.currency === other.currency && this.value.value === other.value.value
    );
  }
}
