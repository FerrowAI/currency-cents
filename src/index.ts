/**
 * Money as integer cents. All operations work with integers to avoid float precision loss.
 */

/**
 * Parse decimal string (e.g., "19.99") to cents (1999).
 */
export function fromDecimal(str: string): number {
  const parts = str.split('.');
  const dollars = parseInt(parts[0], 10) || 0;
  const fractional = (parts[1] || '0').padEnd(2, '0').substring(0, 2);
  const cents = parseInt(fractional, 10) || 0;
  return dollars * 100 + cents;
}

/**
 * Format cents to decimal string with locale/currency.
 */
export function format(cents: number, opts?: { locale?: string; currency?: string }): string {
  const dollars = Math.floor(cents / 100);
  const remainder = Math.abs(cents % 100);
  const sign = cents < 0 ? '-' : '';
  return `${sign}${dollars}.${String(remainder).padStart(2, '0')}`;
}

/**
 * Add two amounts in cents.
 */
export function add(a: number, b: number): number {
  return a + b;
}

/**
 * Subtract b from a.
 */
export function subtract(a: number, b: number): number {
  return a - b;
}

/**
 * Multiply cents by a scalar.
 */
export function multiply(cents: number, scalar: number): number {
  return Math.round(cents * scalar);
}

/**
 * Allocate total cents across ratios without losing pennies.
 * Returns array of allocations that sum to total.
 */
export function allocate(total: number, ratios: number[]): number[] {
  if (ratios.length === 0) return [];

  const sum = ratios.reduce((a, b) => a + b, 0);
  if (sum === 0) return ratios.map(() => 0);

  const allocated: number[] = [];
  let distributed = 0;

  for (let i = 0; i < ratios.length; i++) {
    const share = Math.floor((total * ratios[i]) / sum);
    allocated[i] = share;
    distributed += share;
  }

  // Distribute remainder pennies to highest ratios
  let remainder = total - distributed;
  const indices = ratios
    .map((r, i) => ({ ratio: r, index: i }))
    .sort((a, b) => b.ratio - a.ratio)
    .map(x => x.index);

  for (let i = 0; i < remainder; i++) {
    allocated[indices[i % indices.length]]++;
  }

  return allocated;
}

/**
 * Apply a percentage to cents.
 */
export function applyPercent(cents: number, percent: number): number {
  return Math.round((cents * percent) / 100);
}
