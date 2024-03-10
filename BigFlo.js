(() => {
    const DEFAULT_PRECISION = 33;
    const bigIntFactor = precision => BigInt('1' + '0'.repeat(precision));
    const isFractionalRelevant = fractional => (
        typeof fractional !== 'undefined' &&
        fractional !== '' &&
        Number(fractional) !== 0
    );
    const isInfinity = number => /^[-+]?Infinity$/.test(number);
    const isNegative = number => /^-/.test(number);
    const isPositive = number => !isNegative(number);
    const isValidNumber = number => /^[-+]?(\d*\.?\d+)(e[-+]?\d+)?$/i.test(number);
    const isIntegerNaN = integer => integer === 'NaN';
    const isIntegerFinite = integer => !/^[-+]?Infinity$|^NaN$/.test(integer);
    const isInteger = fractional => !isFractionalRelevant(fractional);;
    const toAbsolute = number => isNegative(number) ? number.slice(1) : number;
    const removeLeadingZeros = number => number.replace(/^0+/, '');
    const removeTrailingZeros = number => number.replace(/0+$/, '');
    const isResultNaN = (leftInteger, rightInteger) => {
        const isConstructor = typeof leftInteger === 'undefined';
        return (!isConstructor && isNaN(leftInteger)) || isNaN(rightInteger);
    };
    const isParsedNumber = number => (
        typeof number === 'object' &&
        typeof number?.integer === 'string' &&
        typeof number?.fractional === 'string'
    );
    const parseScientificNotation = number => {
        const splitNumber = number.split(/e/i);
        const hasScientificNotation = splitNumber.length === 2;

        if (!hasScientificNotation) return number;

        let [base, exponent = 0] = splitNumber;
        exponent = parseInt(exponent, 10);

        const isBaseNegative = isNegative(base);
        base = toAbsolute(base);

        const decimalIndex = base.indexOf('.');
        if (decimalIndex !== -1) {
            base = base.replace('.', '');
            exponent -= (base.length - decimalIndex);
        }

        let result;
        if (exponent >= 0) {
            result = base.padEnd(base.length + exponent, '0');
            result = isBaseNegative ? `-${result}` : result;
            return `${result}.0`;

        } else {
            result = base.padStart(base.length - exponent, '0');
            let integerPart = removeLeadingZeros(result.slice(0, exponent));
            const fractionalPart = removeTrailingZeros(result.slice(exponent));

            integerPart = integerPart.length > 0 ? integerPart : '0';
            integerPart = isBaseNegative ? `-${integerPart}` : integerPart;

            return `${integerPart}.${fractionalPart}`;
        }
    };
    const parse = number => {
        if (isParsedNumber(number)) return number;

        number = String(number);

        if (isInfinity(number)) {
            return {
                integer: number,
                fractional: ''
            };
        }

        if (!isValidNumber(number)) {
            return { integer: 'NaN', fractional: '' };
        }

        const fullNumber = parseScientificNotation(number);
        let [ integer = 'NaN', fractional = '' ] = fullNumber.split('.');

        fractional = removeTrailingZeros(fractional);

        return {
            integer,
            fractional
        };
    };
    const parsedNumberToBigInt = ({ integer, fractional }) => BigInt(`${integer}${fractional}`);
    const fixTrailingPrecision = (fractional, precision) => fractional.padEnd(precision, '0').slice(0, precision);
    const print = (integer, fractional) => {
        if (isIntegerNaN(integer)) return 'NaN';
        if (!isIntegerFinite(integer)) return integer;
        const prettyFractional = removeTrailingZeros(isFractionalRelevant(fractional) ? `.${fractional}` : '');
        return `${integer}${prettyFractional}`;
    };
    const isResultInfinity = (leftOperand, rightOperand, operation) => {
        const leftIsInfinity = isInfinity(leftOperand.integer);
        const rightIsInfinity = isInfinity(rightOperand.integer);
        const leftIsZero = Number(leftOperand.integer) === 0 && Number(leftOperand.fractional) === 0;
        const rightIsZero = Number(rightOperand.integer) === 0 && Number(rightOperand.fractional) === 0;
        const leftIsNegative = isNegative(leftOperand.integer);
        const rightIsNegative = isNegative(rightOperand.integer);
        const isDivByZero = rightIsZero && operation === 'div';
        const bothHasEqualSigns = leftIsNegative === rightIsNegative;
        const isInfinityOperation = leftIsInfinity || rightIsInfinity;

        if (isInfinityOperation || isDivByZero) {
            const INFINITY = 9;
            const NUMBER = 1;
            const leftSimulacro = leftIsInfinity ? (leftIsNegative ? -INFINITY : INFINITY) : leftIsZero ? 0 : (leftIsNegative ? -NUMBER : NUMBER);
            const rightSimulacro = rightIsInfinity ? (rightIsNegative ? -INFINITY : INFINITY) : rightIsZero ? 0 : (rightIsNegative ? -NUMBER : NUMBER);

            let simulacroResult;

            switch (operation) {
                case 'plus':
                    simulacroResult = leftSimulacro + rightSimulacro;
                    break;

                case 'minus':
                    simulacroResult = leftSimulacro - rightSimulacro;
                    break;

                case 'times':
                    simulacroResult = leftSimulacro * rightSimulacro;
                    break;

                case 'div':
                    if (rightIsInfinity && !leftIsInfinity) {
                        simulacroResult = 0;

                    } else if (isDivByZero) {
                        simulacroResult = bothHasEqualSigns ? 1 : -1;

                    } else {
                        simulacroResult = leftSimulacro / rightSimulacro;
                    }
                    break;
            }

            let result = NaN;
            if (simulacroResult === 0) {
                result = 0;
            } else if (simulacroResult > 0) {
                result = Infinity;
            } else if (simulacroResult < 0) {
                result = -Infinity;
            }

            return result;
        }

        return false;
    };
    const nonNumericResult = (leftOperand, rightOperand, operation) => {
        const resultIsNaN = isResultNaN(leftOperand.integer, rightOperand.integer);
        if (resultIsNaN) {
            return { integer: `NaN`, fractional: '' };
        }

        const resultIsInfinity = isResultInfinity(leftOperand, rightOperand, operation);
        if (resultIsInfinity !== false) {
            return { integer: `${resultIsInfinity}`, fractional: '' };
        }
    };
    const roundFractional = (integer, fractional, fractionalRoundingPrecision) => {
        fractional = removeTrailingZeros(fractional);
        const isNegativeInteger = isNegative(integer);
        const lastDigit = fractional.slice(-1);
        const intLastDigit = Number(lastDigit);
        const mustCheckPrecision = (
            fractionalRoundingPrecision !== false &&
            fractional.length >= fractionalRoundingPrecision &&
            intLastDigit > 5
        );

        if (mustCheckPrecision) {
            const roundDigit = 10n - BigInt(intLastDigit);
            const bigintFractional = BigInt(fractional);
            const bigintFractionalLength = bigintFractional.toString().length;
            const rounded = bigintFractional + roundDigit;
            const strRounded = rounded.toString();
            const strRoundedLength = strRounded.length;
            const mustRoundInteger = strRoundedLength > bigintFractionalLength;
            const hasZerosOnTheRight = /0{2,}$/.test(strRounded);
            const truncatedFractional = hasZerosOnTheRight ? strRounded : fractional;
            const roundedFractional = mustRoundInteger ? truncatedFractional.slice(1) : truncatedFractional;
            let roundedInteger = integer;
            if (mustRoundInteger) {
                const absInteger = isNegativeInteger ? integer.slice(1) : integer;
                roundedInteger = BigInt(roundedInteger) + 1n;
                roundedInteger = roundedInteger.toString();
                roundedInteger = isNegativeInteger ? `-${roundedInteger}` : roundedInteger;
            }

            return {
                integer: roundedInteger,
                fractional: roundedFractional
            };
        }

        return { integer, fractional };
    };
    const equalizeFractionalDigits = (leftFractional, rightFractional) => {
        const longestFractional = Math.max(leftFractional.length, rightFractional.length);
        leftFractional = fixTrailingPrecision(leftFractional, longestFractional);
        rightFractional = fixTrailingPrecision(rightFractional, longestFractional);

        return {
            leftFractional: `${leftFractional}`,
            rightFractional: `${rightFractional}`
        };
    };
    const plus = (leftOperand, rightOperand) => {
        leftOperand = parse(leftOperand);
        rightOperand = parse(rightOperand);
        const {
            integer: leftInteger,
            fractional: leftFractional
        } = leftOperand;
        const {
            integer: rightInteger,
            fractional: rightFractional
        } = rightOperand;

        const isNonNumericResult = nonNumericResult(leftOperand, rightOperand, 'plus');
        if (isNonNumericResult) return isNonNumericResult;

        const adjustedPrecision = Math.max(leftFractional.length, rightFractional.length);
        const adjustedLeftFractional = fixTrailingPrecision(leftFractional, adjustedPrecision);
        const adjustedRightFractional = fixTrailingPrecision(rightFractional, adjustedPrecision);

        const result = BigInt(`${leftInteger}${adjustedLeftFractional}`) + BigInt(`${rightInteger}${adjustedRightFractional}`);

        let resultString = result.toString();

        const isIntegerNegative = result < 0n;
        resultString = isIntegerNegative ? resultString.slice(1) : resultString;

        const isIntegerZero = resultString.length <= adjustedPrecision || resultString === '0';

        let resultFractional, resultInteger;

        if (adjustedPrecision > 0) {
            resultFractional = resultString.padStart(adjustedPrecision, '0');
            resultFractional = resultFractional.slice(-adjustedPrecision);
        } else {
            resultFractional = '';
        }

        if (isIntegerZero) {
            resultInteger = '0';
        } else {
            if (adjustedPrecision > 0) {
                resultInteger = resultString.slice(0, -resultFractional.length);
            } else {
                resultInteger = resultString;
            }
        }

        resultInteger = isIntegerNegative ? `-${resultInteger}` : resultInteger;

        return { integer: resultInteger, fractional: resultFractional };
    };
    const minus = (leftOperand, rightOperand) => {
        leftOperand = parse(leftOperand);
        rightOperand = parse(rightOperand);
        const {
            integer: leftInteger,
            fractional: leftFractional
        } = leftOperand;
        const {
            integer: rightInteger,
            fractional: rightFractional
        } = rightOperand;

        const isNonNumericResult = nonNumericResult(leftOperand, rightOperand, 'minus');
        if (isNonNumericResult) return isNonNumericResult;

        const adjustedPrecision = Math.max(leftFractional.length, rightFractional.length);
        const adjustedLeftFractional = fixTrailingPrecision(leftFractional, adjustedPrecision);
        const adjustedRightFractional = fixTrailingPrecision(rightFractional, adjustedPrecision);

        const result = BigInt(`${leftInteger}${adjustedLeftFractional}`) - BigInt(`${rightInteger}${adjustedRightFractional}`);

        let resultString = result.toString();

        const isIntegerNegative = result < 0n;
        resultString = isIntegerNegative ? resultString.slice(1) : resultString;

        const isIntegerZero = resultString.length <= adjustedPrecision || resultString === '0';

        let resultFractional, resultInteger;

        if (adjustedPrecision > 0) {
            resultFractional = resultString.padStart(adjustedPrecision, '0');
            resultFractional = resultFractional.slice(-adjustedPrecision);
        } else {
            resultFractional = '';
        }

        if (isIntegerZero) {
            resultInteger = '0';
        } else {
            if (adjustedPrecision > 0) {
                resultInteger = resultString.slice(0, -resultFractional.length);
            } else {
                resultInteger = resultString;
            }
        }

        resultInteger = isIntegerNegative ? `-${resultInteger}` : resultInteger;

        return { integer: resultInteger, fractional: resultFractional };
    };
    const times = (leftOperand, rightOperand, fractionalRoundingPrecision) => {
        leftOperand = parse(leftOperand);
        rightOperand = parse(rightOperand);
        const {
            integer: leftInteger,
            fractional: leftFractional
        } = leftOperand;
        const {
            integer: rightInteger,
            fractional: rightFractional
        } = rightOperand;

        const isNonNumericResult = nonNumericResult(leftOperand, rightOperand, 'times');
        if (isNonNumericResult) return isNonNumericResult;

        const parsedMultiplicandFractional = removeTrailingZeros(leftFractional);
        const parsedMultiplierFractional = removeTrailingZeros(rightFractional);
        const totalFractionalLength = `${parsedMultiplicandFractional}${parsedMultiplierFractional}`.length;

        const adjustedLeftFractional = fixTrailingPrecision(leftFractional, totalFractionalLength);
        const adjustedRightFractional = fixTrailingPrecision(rightFractional, totalFractionalLength);
        const adjustedPrecision = totalFractionalLength * 2;

        const result = BigInt(`${leftInteger}${adjustedLeftFractional}`) * BigInt(`${rightInteger}${adjustedRightFractional}`);

        let resultString = result.toString();

        const isIntegerNegative = result < 0n;
        resultString = isIntegerNegative ? resultString.slice(1) : resultString;

        const isIntegerZero = resultString.length <= adjustedPrecision || resultString === '0';

        let resultFractional, resultInteger;

        if (adjustedPrecision > 0) {
            resultFractional = resultString.padStart(adjustedPrecision, '0');
            resultFractional = resultFractional.slice(-adjustedPrecision);
        } else {
            resultFractional = '';
        }

        if (isIntegerZero) {
            resultInteger = '0';
        } else {
            if (adjustedPrecision > 0) {
                resultInteger = resultString.slice(0, -resultFractional.length);
            } else {
                resultInteger = resultString;
            }
        }

        resultInteger = isIntegerNegative ? `-${resultInteger}` : resultInteger;

        const rounded = roundFractional(resultInteger, resultFractional, fractionalRoundingPrecision);

        return { integer: rounded.integer, fractional: rounded.fractional };
    };
    const div = (leftOperand, rightOperand, divisionPrecision, divisionPrecisionFactor, fractionalRoundingPrecision) => {
        leftOperand = parse(leftOperand);
        rightOperand = parse(rightOperand);
        const {
            integer: leftInteger,
            fractional: leftFractional
        } = leftOperand;
        const {
            integer: rightInteger,
            fractional: rightFractional
        } = rightOperand;

        const isNonNumericResult = nonNumericResult(leftOperand, rightOperand, 'div');
        if (isNonNumericResult) return isNonNumericResult;

        const equalizedDigits = equalizeFractionalDigits(leftFractional, rightFractional);
        const equalizedDigitsLength = equalizedDigits.leftFractional.length;

        const dividend = parsedNumberToBigInt({
            integer: leftInteger,
            fractional: equalizedDigits.leftFractional
        });
        const divisor = parsedNumberToBigInt({
            integer: rightInteger,
            fractional: equalizedDigits.rightFractional
        });

        let result = (dividend * divisionPrecisionFactor) / divisor;

        let resultString = String(result);

        const isIntegerNegative = result < 0n;
        resultString = isIntegerNegative ? resultString.slice(1) : resultString;

        let recoveredFractional = divisionPrecision === 0 ? '' : resultString.padStart(divisionPrecision, '0').slice(-divisionPrecision);
        let recoveredInteger = divisionPrecision === 0 ? resultString : resultString.slice(0, -recoveredFractional.length);
        recoveredFractional = removeTrailingZeros(recoveredFractional);

        if (recoveredInteger === '') {
            recoveredInteger = '0';
        }

        if (isIntegerNegative) {
            recoveredInteger = `-${recoveredInteger}`
        }

        const rounded = roundFractional(recoveredInteger, recoveredFractional, fractionalRoundingPrecision);

        return { integer: rounded.integer, fractional: rounded.fractional };
    };
    const pow = (leftOperand, rightOperand, fractionalRoundingPrecision) => {
        leftOperand = parse(leftOperand);
        rightOperand = parse(rightOperand);
        const {
            integer: leftInteger,
            fractional: leftFractional
        } = leftOperand;
        const {
            integer: rightInteger
        } = rightOperand;

        const isNonNumericResult = nonNumericResult(leftOperand, rightOperand, 'times');
        if (isNonNumericResult) return isNonNumericResult;

        const originalNumber = { integer: leftInteger, fractional: leftFractional };
        const exponent = BigInt(rightInteger);

        let result = { integer: leftInteger, fractional: leftFractional };
        for (let i = 1n; i < exponent; i++) {
            result = times(result, originalNumber, fractionalRoundingPrecision);
        }

        if (exponent === 0n) {
            result = { integer: '1', fractional: '' };
        }

        return result;
    };
    const isEqual = (leftOperand, rightOperand) => {
        leftOperand = parse(leftOperand);
        rightOperand = parse(rightOperand);
        const {
            integer: leftInteger,
            fractional: leftFractional
        } = leftOperand;
        const {
            integer: rightInteger,
            fractional: rightFractional
        } = rightOperand;
        const left = print(leftInteger, leftFractional);
        const right = print(rightInteger, rightFractional);
        return left === right;
    };
    const isGreaterThan = (leftOperand, rightOperand) => {
        leftOperand = parse(leftOperand);
        rightOperand = parse(rightOperand);
        const difference = minus(leftOperand, rightOperand);
        const isNotZero = !isEqual(difference, 0);
        return isNotZero && isPositive(difference.integer);
    };
    const isLessThan = (leftOperand, rightOperand) => {
        return isGreaterThan(rightOperand, leftOperand);
    };
    const isGreaterThanOrEqual = (leftOperand, rightOperand) => {
        return isGreaterThan(leftOperand, rightOperand) || isEqual(leftOperand, rightOperand);
    };
    const isLessThanOrEqual = (leftOperand, rightOperand) => {
        return isLessThan(leftOperand, rightOperand) || isEqual(leftOperand, rightOperand);
    };
    const isDifferent = (leftOperand, rightOperand) => {
        return !isEqual(leftOperand, rightOperand);
    };
    const isSafeInteger = ({ integer, fractional }) => {
        return Number.isSafeInteger(Number(print(integer, fractional)));
    };
    const toFixed = ({ integer, fractional }, precision = 0) => {
        if (isIntegerNaN(integer)) return 'NaN';
        if (!isIntegerFinite(integer)) return `${integer}`;
        const fixed = fixTrailingPrecision(fractional, precision);
        return `${integer}${fixed ? `.${fixed}` : ''}`;
    };

    class BigFlo {

        #divisionPrecision = Core.divisionPrecision ?? DEFAULT_PRECISION;
        #divisionPrecisionFactor = bigIntFactor(this.#divisionPrecision);
        #fractionalRoundingPrecision = Core.fractionalRoundingPrecision ?? DEFAULT_PRECISION;
        #integer;
        #fractional;

        constructor(number) {
            const {
                integer,
                fractional
            } = parse(number);

            this.#update(integer, fractional);
        }

        #update(integer, fractional) {
            const cleanFractional = removeTrailingZeros(fractional);

            if (integer === '-0' && cleanFractional === '') {
                integer = '0';
            }

            this.#integer = integer;
            this.#fractional = cleanFractional;

            return this;
        }

        #parsed() {
            return { integer: this.#integer, fractional: this.#fractional };
        }

        toString() {
            return print(this.#integer, this.#fractional);
        }

        toJSON() {
            return this.toString();
        }

        setDivisionPrecision(precision) {
            precision = parseInt(precision);

            if (isNaN(precision) || precision < 0) throw new TypeError("Division precision must be an integer greater than or equal 0");
            if (precision === this.#divisionPrecision) return this;

            this.#divisionPrecision = precision;
            this.#divisionPrecisionFactor = bigIntFactor(precision);

            return this;
        }

        getDivisionPrecision() {
            return this.#divisionPrecision;
        }

        setFractionalRoundingPrecision(precision) {
            if (precision === false) {
                this.#fractionalRoundingPrecision = precision;
                return;
            }
            precision = parseInt(precision);

            if (isNaN(precision) || precision < 0) throw new TypeError("Fractional rounding precision must be an integer greater than or equal 0. Set to false to disable.");

            this.#fractionalRoundingPrecision = precision;
            return this;
        }

        getFractionalRoundingPrecision() {
            return this.#fractionalRoundingPrecision;
        }

        plus(number) {
            const { integer, fractional } = plus(this.#parsed(), number);
            return this.#update(integer, fractional);
        }

        ['+'](number) {
            return this.plus(number);
        }

        minus(number) {
            const { integer, fractional } = minus(this.#parsed(), number);
            return this.#update(integer, fractional);
        }

        ['-'](number) {
            return this.minus(number);
        }

        times(number) {
            const { integer, fractional } = times(this.#parsed(), number, this.#fractionalRoundingPrecision);
            return this.#update(integer, fractional);
        }

        ['*'](number) {
            return this.times(number);
        }

        multipliedBy(number) {
            return this.times(number);
        }

        div(number) {
            const { integer, fractional } = div(
                this.#parsed(),
                number,
                this.#divisionPrecision,
                this.#divisionPrecisionFactor,
                this.#fractionalRoundingPrecision
            );
            return this.#update(integer, fractional);
        }

        ['/'](number) {
            return this.div(number);
        }

        dividedBy(number) {
            return this.div(number);
        }

        pow(number) {
            const { integer, fractional } = pow(this.#parsed(), number, this.#fractionalRoundingPrecision);
            return this.#update(integer, fractional);
        }

        ['**'](number) {
            return this.pow(number);
        }

        toThePowerOf(number) {
            return this.pow(number);
        }

        isFinite() {
            return !/^[-+]?Infinity$|^NaN$/.test(this.#integer);
        }

        isInteger() {
            return isInteger(this.#fractional);
        }

        isNegative() {
            return isNegative(this.#integer);
        }

        isPositive() {
            return isPositive(this.#integer);
        }

        isEqual(number) {
            return isEqual(this.#parsed(), number);
        }

        eq(number) {
            return this.isEqual(number);
        }

        ['=='](number) {
            return this.isEqual(number);
        }

        isGreaterThan(number) {
            return isGreaterThan(this.#parsed(), number);
        }

        ['>'](number) {
            return this.isGreaterThan(number);
        }

        gt(number) {
            return this.isGreaterThan(number);
        }

        isLessThan(number) {
            return isLessThan(this.#parsed(), number);
        }

        ['<'](number) {
            return this.isLessThan(number);
        }

        lt(number) {
            return this.isLessThan(number);
        }

        isGreaterThanOrEqual(number) {
            return isGreaterThanOrEqual(this.#parsed(), number);
        }

        ['>='](number) {
            return this.isGreaterThanOrEqual(number);
        }

        gte(number) {
            return this.isGreaterThanOrEqual(number);
        }

        isLessThanOrEqual(number) {
            return isLessThanOrEqual(this.#parsed(), number);
        }

        ['<='](number) {
            return this.isLessThanOrEqual(number);
        }

        lte(number) {
            return this.isLessThanOrEqual(number);
        }

        isDifferent(number) {
            return !isEqual(this.#parsed(), number);
        }

        ['!='](number) {
            return this.isDifferent(number);
        }

        neq(number) {
            return this.isDifferent(number);
        }

        isNaN() {
            return this.#integer === 'NaN';
        }

        isSafeInteger() {
            return isSafeInteger(this.#parsed());
        }

        parseInt() {
            return Number.parseInt(this.#integer);
        }

        parseBigInt() {
            return BigInt(this.#integer);
        }

        parseFloat() {
            return Number.parseFloat(this.toString());
        }

        toFixed(precision) {
            return toFixed(this.#parsed(), precision);
        }

        abs() {
            if (isIntegerNaN(this.#integer)) return 'NaN';
            if (!isIntegerFinite(this.#integer)) return 'Infinity';

            if (this.isNegative()) {
                this.#update(this.#integer.slice(1), this.#fractional);
            }

            return this;
        }

        ceil() {
            if (isIntegerNaN(this.#integer)) return 'NaN';
            if (!isIntegerFinite(this.#integer)) return `${this.#integer}`;
            if (isFractionalRelevant(this.#fractional)) {
                if (this.isPositive()) {
                    this.plus(1);
                }
                this.#update(this.#integer, '');
            }

            return this;
        }

        floor() {
            if (isIntegerNaN(this.#integer)) return 'NaN';
            if (!isIntegerFinite(this.#integer)) return `${this.#integer}`;
            if (isFractionalRelevant(this.#fractional)) {
                if (this.isNegative()) {
                    this.minus(1);
                }
                this.#update(this.#integer, '');
            }

            return this;
        }

        round() {
            if (isIntegerNaN(this.#integer)) return 'NaN';
            if (!isIntegerFinite(this.#integer)) return `${this.#integer}`;

            const integerPart = this.#integer;
            const fractionalPart = { integer: (isPositive(integerPart) ? '0' : '-0'), fractional: this.#fractional };
            let result = parse(integerPart);

            if (isPositive(integerPart) && isGreaterThanOrEqual(fractionalPart, 0.5)) {
                result = plus(integerPart, 1);
            } else if (isLessThanOrEqual(fractionalPart, -0.5)) {
                result = minus(integerPart, (isEqual(fractionalPart, -0.5) ? 0 : 1));
            }

            this.#update(result.integer, '');

            return this;
        }

        sign() {
            if (isIntegerNaN(this.#integer)) return 'NaN';

            if (isEqual(this.#parsed(), 0)) {
                this.#update('0', '');
            } else if (this.isNegative()) {
                this.#update('-1', '');
            } else {
                this.#update('1', '');
            }

            return this;
        }

        trunc() {
            this.#update(this.#integer, '');
            return this;
        }
    }

    const Core = number => {
        return new BigFlo(number);
    };

    Core.setDivisionPrecision = (precision) => {
        precision = parseInt(precision);

        if (isNaN(precision) || precision < 0) throw new TypeError("Division precision must be an integer greater than or equal 0");

        Core.divisionPrecision = precision;
    };

    Core.setFractionalRoundingPrecision = (precision) => {
        if (precision === false) {
            Core.fractionalRoundingPrecision = precision;
            return;
        }
        precision = parseInt(precision);

        if (isNaN(precision) || precision < 0) throw new TypeError("Fractional rounding precision must be an integer greater than or equal 0. Set to false to disable.");

        Core.fractionalRoundingPrecision = precision;
    };

    const canExport = typeof module !== 'undefined' && typeof module.exports !== 'undefined';
    if (canExport) {
        module.exports = Core;
    } else {
        const global = (
            typeof globalThis !== 'undefined' ? globalThis :
            typeof window !== 'undefined' ? window :
            typeof global !== 'undefined' ? global :
            typeof self !== 'undefined' ? self :
            this
        );
        global.BigFlo = Core;
    }
})();