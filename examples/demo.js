const { fromDecimal, format, allocate, multiply } = require('../dist/index');

console.log('=== currency-cents demo ===\n');

const price = fromDecimal('19.99');
console.log('Price "19.99" as cents:', price);
console.log('Formatted back:', format(price));

const doubled = multiply(price, 2);
console.log('Doubled:', format(doubled));

const split = allocate(100, [1, 1, 1]);
console.log('Allocate 100 cents across [1,1,1]:', split);
console.log('Sum check:', split.reduce((a, b) => a + b, 0) === 100);

const uneven = allocate(1000, [3, 2, 1]);
console.log('Allocate 1000 across [3,2,1]:', uneven);
console.log('Sum check:', uneven.reduce((a, b) => a + b, 0) === 1000);

console.log('✓ Demo complete');
