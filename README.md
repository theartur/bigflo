# BigFlo: Precise Arithmetic for Numbers of Any Size in JavaScript

BigFlo is a cutting-edge JavaScript library designed for high precision arithmetic operations of numbers of any size. It enables working with extremely large integers and decimal numbers, overcoming the limitations and quirks of IEEE 754. You can expect stable, predictable, and exact results, limited only by your system's memory. Perfect for financial calculations, scientific computations, and any application demanding high numerical precision down to the last digit.

## Features and Benefits

- **Unlimited Number Size**: Handle extremely large integers and decimal numbers without limits other than your system's memory.
- **Fix for IEEE 754**: Overcome the quirks of IEEE 754 for total precision in every digit.
- **High Precision Arithmetic**: Perform addition, subtraction, multiplication, division, and power operations with absolute accuracy.
- **Number and Math Methods**: Includes Math and Number utility methods, tailored for large number operations.
- **Universal Numeric Input**: Accepts numbers in any format, as `String` (recommended for precision), `Number`, `BigInt`, `BigFlo` and even scientific notation.
- **Performance Optimized**: Efficient leveraging of native `BigInt` ensure fast computations, even with massive numbers.
- **No External Dependencies**: Seamlessly integrates with existing JavaScript projects, requiring no external dependencies.
- **Convenient Aliases**: Use short method aliases and symbolic names for operations (`multiplyBy`, `times`, `*`) for improved convenience.
- **Cross-platform Compatibility**: Compatible with both Node.js and browser environments, supporting `require()` and `import` syntax.
- **Developer-Friendly**: Designed with a straightforward API, making it accessible to developers of all skill levels.
- **Enhanced Accuracy**: Ideal for financial applications, scientific research, and any domain requiring precise and large numerical computations.


## Getting Started

**Installation**

```bash
	npm i bigflo
```

**CommonJS syntax**

```javascript
	const BigFlo = require('bigflo');

	const num1 = BigFlo(0.2); // Number
	const num2 = '0.1'; // String

	const result = num1.plus(num2);

	console.log(`Result: ${result}`);
	// Result: 0.3
```

**ES Modules syntax**

```javascript
	import BigFlo from 'bigflo';

	const a = 3n; // BigInt
	const b = '6e-1'; // Scientific Notation (0.6)

	const result = BigFlo(a)['*'](b);

	console.log(`Result: ${result}`);
	// Result: 1.8
```

### IEEE 754 QUIRKS: BE GONE!

```javascript
quirk = 0.1 + 0.2 // = 0.30000000000000004
bigflo = BigFlo(0.1)['+'](0.2); // = 0.3

quirk = 0.3 - 0.2 // = 0.09999999999999998
bigflo = BigFlo(0.3)['-'](0.2); // = 0.1

quirk = 0.6 * 3 // = 1.7999999999999998
bigflo = BigFlo(0.6)['*'](3); // = 1.8

quirk = 0.3 / 0.1 // = 2.9999999999999996
bigflo = BigFlo(0.3)['/'](0.1); // = 3

quirk = 0.1 / 0.3 // = 0.33333333333333337
bigflo = BigFlo(0.1)['/'](0.3); // = 0.333333333333333333333333333333333

quirk = 0.1 + 0.7 // = 0.7999999999999999
bigflo = BigFlo(0.1)['+'](0.7); // = 0.8

quirk = 0.2 * 0.2 // = 0.04000000000000001
bigflo = BigFlo(0.2)['*'](0.2); // = 0.04

quirk = 0.7 - 0.4 // = 0.29999999999999993
bigflo = BigFlo(0.7)['-'](0.4); // = 0.3

quirk = 0.3 / 0.2 // = 1.4999999999999998
bigflo = BigFlo(0.3)['/'](0.2); // = 1.5

quirk = 0.000000003 / 0.2 // = 1.5e-8
bigflo = BigFlo('0.000000003')['/'](0.2); // = 0.000000015
```


### Example: Financial calculation

```javascript
// Example: Precise financial calculations
const principal = BigFlo(10000);
const interestRate = BigFlo(0.05);
const years = 5;

// Compound interest calculation
const amount = principal['*'](interestRate['+'](1)['**'](years));
console.log(`Amount after ${years} years: ${amount.toFixed(2)}`);
// Amount after 5 years: 12762.81
```

### Example: Scientific computation

```javascript
// Example: Handling large numbers in scientific computations
const avogadroNumber = BigFlo('6.02214076e+23');
const molecules = avogadroNumber['*'](2);
console.log(`Molecules in 2 moles: ${molecules}`);
// Molecules in 2 moles: 1204428152000000000000000
```

### Example: Large decimals

```javascript
   import BigFlo from './BigFlo.js';

	let phi = "1.618033988749894848204586834365638117720309179805762862135448622705260462818902449707207204189391137484754088075386891752126633862223536931793180060766726354433389086595939582905638322661319928290267880675208766892501711696207032221043216269548626296313614438149758701220340805887954454749246185695364864449241044320771344947049565846788509874339442212544877066478091588460749988712400765217057517978834166256249407589069";
   let pi = "3.141592653589793238462643383279502884197169399375105820974944592307816";

   // phi multiplied by pi
   let result = BigFlo(phi)['*'](pi);

   console.log(`Result: ${result}`);
   // Result: 5.083203692315259815809509013242198841831839293221154120482332809249978486067803281742547878659541280894609381315647809652472437157002687253977448058691232075726017949776921866615084597175541994376144459229951222947905298133442989827323842164568914074255981755734191011699701938603520047801826678551521546780141772440935062394580909338082095329503034709027317362240861348968583169107439253654312137744324076177917817516717677490798664887072601885417667893466455668275014134080247511284863304
```


### API Reference

Check out complete examples available in BigFlo.test.js

```javascript
// number INPUT TYPES:

// String (recommended for exact precision of large numbers)
number = '1234567890.123234345456567678';

// Number (not recommended for large numbers to avoid precision loss)
number = 123456.789;

// BigInt
number = 1234567890n;
number = BigInt(1234567890);
number = BigInt('1234567890');

// BigFlo
number = BigFlo(123);

// scientific notation
number = 1e3; // 1000
number = '1e3'; // 1000
```

```javascript
// ADDITION
BigFlo(x).plus(number)
BigFlo(x)['+'](number) // symbolic alias
```

```javascript
// SUBTRACTION
BigFlo(x).minus(number)
BigFlo(x)['-'](number) // symbolic alias
```

```javascript
// MULTIPLICATION
BigFlo(x).multipliedBy(number)
BigFlo(x).times(number) // short alias
BigFlo(x)['*'](number) // symbolic alias
```

```javascript
// DIVISION
BigFlo(x).dividedBy(number)
BigFlo(x).div(number) // short alias
BigFlo(x)['/'](number) // symbolic alias
```

```javascript
// POWER
BigFlo(x).toThePowerOf(number)
BigFlo(x).pow(number) // short alias
BigFlo(x)['**'](number) // symbolic alias
```

```javascript
// boolean assertions
BigFlo(x).isFinite()
BigFlo(x).isInteger()
BigFlo(x).isNegative()
BigFlo(x).isPositive()
BigFlo(x).isNaN()
BigFlo(x).isSafeInteger()
```

```javascript
// EQUALITY COMPARISON OPERATOR 
BigFlo(x).isEqual(number)
BigFlo(x).eq(number) // short alias
BigFlo(x)['=='](number) // symbolic alias
```

```javascript
// INEQUALITY COMPARISON OPERATOR
BigFlo(x).isDifferent(number)
BigFlo(x).neq(number) // short alias
BigFlo(x)['!='](number) // symbolic alias
```

```javascript
// 'GREATER THAN' COMPARISON OPERATOR
BigFlo(x).isGreaterThan(number)
BigFlo(x).gt(number) // short alias
BigFlo(x)['>'](number) // symbolic alias
```

```javascript
// 'LESS THEN' COMPARISON OPERATOR
BigFlo(x).isLessThan(number)
BigFlo(x).lt(number) // short alias
BigFlo(x)['<'](number) // symbolic alias
```

```javascript
// 'GREATER THAN OR EQUAL' COMPARISON OPERATOR
BigFlo(x).isGreaterThanOrEqual(number)
BigFlo(x).gte(number) // short alias
BigFlo(x)['>='](number) // symbolic alias
```

```javascript
// 'LESS THAN OR EQUAL' COMPARISON OPERATOR
BigFlo(x).isLessThanOrEqual(number)
BigFlo(x).lte(number) // short alias
BigFlo(x)['<='](number) // symbolic alias
```

```javascript
// convertion methods
BigFlo(x).parseInt() // returns a Number integer (may affect precision, discards fractional part)
BigFlo(x).parseBigInt() // returns a BigInt integer (discards fractional part)
BigFlo(x).parseFloat() // returns a Number float (may affect precision)
```

```javascript
// utilities

// not chainable
BigFlo(x).toString() // returns String with the exact number
BigFlo(x).toFixed(precision) // returns String, equivalent to Number().toFixed(precision)

// chainable methods (returns BigFlo)
BigFlo(x).abs() // equivalent to Math.abs()
BigFlo(x).ceil() // equivalent to Math.ceil()
BigFlo(x).floor() // equivalent to Math.floor()
BigFlo(x).round() // equivalent to Math.round()
BigFlo(x).sign() // equivalent to Math.sign()
BigFlo(x).trunc() // equivalent to Math.trunc()
```

```javascript
setDivisionPrecision(precision)
// sets the max digits for the result of a division operation
// `precision` is a Number greater than or equal 0

// DEFAULT DIVISION PRECISION: 33
BigFlo(x).setDivisionPrecision(precision) // sets for the instance
BigFlo.setDivisionPrecision(precision) // STATIC: sets for all new instances

// example
BigFlo(1).setDivisionPrecision(5).dividedBy(3); // results 0.33333
BigFlo.setDivisionPrecision(9);
BigFlo(1).dividedBy(3); // results 0.333333333
```

```javascript
getDivisionPrecision()
// gets the configured division precision of an instance
BigFlo(x).getDivisionPrecision()
```

```javascript
setFractionalRoundingPrecision(precision)
// sets the minimum digits to enable fractional rounding of division and multiplication results
// `precision` is a Number greater than or equal 0, or a Boolean `false`

// DEFAULT FRACTIONAL ROUNDING PRECISION: 33
BigFlo(x).setFractionalRoundingPrecision(precision) // sets for the instance
BigFlo.setFractionalRoundingPrecision(precision) // STATIC: sets for all new instances

setFractionalRoundingPrecision(false) // turns off fractional rounding

// example
BigFlo('0.333333333').times(3); // results 0.999999999
BigFlo('0.333333333333333333333333333333333').times(3); // results 1
BigFlo('0.333333333').setFractionalRoundingPrecision(9).times(3); // results 1

BigFlo.setFractionalRoundingPrecision(false); // turns off fractional rounding for all new instances
BigFlo('0.333333333').times(3); // results 0.999999999
BigFlo('0.333333333333333333333333333333333').times(3); // results 0.999999999999999999999999999999999
```

```javascript
getFractionalRoundingPrecision()
// gets the configured fractional rounding precision of an instance
BigFlo(x).getFractionalRoundingPrecision()
```

## Contributing

Contributions are warmly welcomed. Please feel free to fork the repository, make changes, and submit a pull request.

## License

The project is open-source and free for any use. It is licensed under the MIT License.
