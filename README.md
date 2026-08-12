# currency-cents

Money as integer cents: parsing, formatting, arithmetic, and fair allocation without rounding loss.

## What & Why

Work with money using integers (cents) instead of floats to avoid precision errors. Parse "19.99" to 1999 cents, allocate amounts fairly across recipients (no lost pennies), format back to strings. Suitable for financial calculations, invoicing, and payments.

## API

```typescript
export function fromDecimal(str: string): number
export function format(cents: number, opts?: {locale?, currency?}): string
export function add(a: number, b: number): number
export function subtract(a: number, b: number): number
export function multiply(cents: number, scalar: number): number
export function allocate(total: number, ratios: number[]): number[]
export function applyPercent(cents: number, percent: number): number
```

## Install

```bash
npm install currency-cents
```

## Quick Start

```typescript
import { fromDecimal, allocate, format } from 'currency-cents';

const price = fromDecimal('19.99'); // 1999 cents

// Split 100 cents fairly across 3 recipients
const [a, b, c] = allocate(100, [1, 1, 1]);
console.log([a, b, c]); // [34, 33, 33] — sum is 100

console.log(format(1999)); // "19.99"
```

## Limits

- No currency conversion or exchange rates.
- Allocate uses banker's rounding; order of recipients matters for remainder cents.
- Maximum safe integer cents is Number.MAX_SAFE_INTEGER (9007199254740991).

---
Part of the [ferrow-toolkit](https://github.com/Ruzylo-cloud/ferrow-toolkit) collection · Sponsored by [Ferrow](https://ferrow.ai)
