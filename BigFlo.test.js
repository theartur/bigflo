const BigFlo = require('./BigFlo');

const tests = [

    // Correctly operates on IEEE 754 quirks

    ['0.1 + 0.2 = 0.30000000000000004', () => {
        const actual = BigFlo('0.1').plus('0.2').toString();
        const expect = '0.3';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['0.3 - 0.2 = 0.09999999999999998', () => {
        const actual = BigFlo('0.3').minus('0.2').toString();
        const expect = '0.1';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['0.6 * 3 = 1.7999999999999998', () => {
        const actual = BigFlo('0.6').times('3').toString();
        const expect = '1.8';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['3 * 0.6 = 1.7999999999999998', () => {
        const actual = BigFlo('3').times('0.6').toString();
        const expect = '1.8';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['0.3 / 0.1 = 2.9999999999999996', () => {
        const actual = BigFlo('0.3').div('0.1').toString();
        const expect = '3';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['0.1 / 0.3 = 0.33333333333333337', () => {
        const actual = BigFlo('0.1').div('0.3').toString();
        const expect = '0.333333333333333333333333333333333';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['0.1 + 0.7 = 0.7999999999999999', () => {
        const actual = BigFlo('0.1').plus('0.7').toString();
        const expect = '0.8';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['0.2 * 0.2 = 0.04000000000000001', () => {
        const actual = BigFlo('0.2').times('0.2').toString();
        const expect = '0.04';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['0.7 - 0.4 = 0.29999999999999993', () => {
        const actual = BigFlo('0.7').minus('0.4').toString();
        const expect = '0.3';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['0.3 / 0.2 = 1.4999999999999998', () => {
        const actual = BigFlo('0.3').div('0.2').toString();
        const expect = '1.5';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['0.000000003 / 0.2 = 1.5e-8', () => {
        const actual = BigFlo('0.000000003').div('0.2').toString();
        const expect = '0.000000015';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['0.0002 / 0.0000000017 = 117647.05882352943', () => {
        const actual = BigFlo('0.0002').div('0.0000000017').toString();
        const expect = '117647.05882352941176470588235294117647';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['0.0000000017 / 0.0002 = 0.0000085', () => {
        const actual = BigFlo('0.0000000017').div('0.0002').toString();
        const expect = '0.0000085';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1 / 17 = 0.058823529411764705', () => {
        const actual = BigFlo('1').div('17').toString();
        const expect = '0.05882352941176470588235294117647';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['999 * 0.0000 = 0', () => {
        const actual = BigFlo('999').times('0.0000').toString();
        const expect = '0';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-0.3 + 0.3 = 0', () => {
        const actual = BigFlo('-0.3').plus('0.3').toString();
        const expect = '0';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['0.3 - 0.3 = 0', () => {
        const actual = BigFlo('0.3').minus('0.3').toString();
        const expect = '0';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['(0.1 + 0.2) - 0.3 = 5.551115123125783e-17', () => {
        const actual = BigFlo('0.1').plus('0.2').minus('0.3').toString();
        const expect = '0';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ["BigFlo(0.1)['+'](0.2)", () => {
        const actual = BigFlo(0.1)['+'](0.2).toString();
        const expect = '0.3';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ["BigFlo(0.1)['-'](0.2)", () => {
        const actual = BigFlo(0.1)['-'](0.2).toString();
        const expect = '-0.1';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ["BigFlo(0.1)['*'](0.2)", () => {
        const actual = BigFlo(0.1)['*'](0.2).toString();
        const expect = '0.02';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ["BigFlo(0.1).multipliedBy(0.2)", () => {
        const actual = BigFlo(0.1).multipliedBy(0.2).toString();
        const expect = '0.02';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ["BigFlo(0.1)['/'](0.2)", () => {
        const actual = BigFlo(0.1)['/'](0.2).toString();
        const expect = '0.5';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ["STATIC PRECISION 0: BigFlo(22)['/'](17)", () => {
        const originalPrecision = BigFlo().getDivisionPrecision();
        BigFlo.setDivisionPrecision(0);
        const actual = BigFlo(22)['/'](17).toString();
        BigFlo.setDivisionPrecision(originalPrecision);
        const expect = '1';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ["STATIC PRECISION 1: BigFlo(22)['/'](17)", () => {
        const originalPrecision = BigFlo().getDivisionPrecision();
        BigFlo.setDivisionPrecision(1);
        const actual = BigFlo(22)['/'](17).toString();
        BigFlo.setDivisionPrecision(originalPrecision);
        const expect = '1.2';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ["STATIC PRECISION 2: BigFlo(22)['/'](17)", () => {
        const originalPrecision = BigFlo().getDivisionPrecision();
        BigFlo.setDivisionPrecision(2);
        const actual = BigFlo(22)['/'](17).toString();
        BigFlo.setDivisionPrecision(originalPrecision);
        const expect = '1.29';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ["STATIC PRECISION 3: BigFlo(22)['/'](17)", () => {
        const originalPrecision = BigFlo().getDivisionPrecision();
        BigFlo.setDivisionPrecision(3);
        const actual = BigFlo(22)['/'](17).toString();
        BigFlo.setDivisionPrecision(originalPrecision);
        const expect = '1.294';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ["INSTANCE PRECISION 4: BigFlo(22).setDivisionPrecision(4)['/'](17)", () => {
        const actual = BigFlo(22).setDivisionPrecision(4)['/'](17).toString();
        const expect = '1.2941';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ["BigFlo(0.1).dividedBy(0.2)", () => {
        const actual = BigFlo(0.1).dividedBy(0.2).toString();
        const expect = '0.5';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ["BigFlo(5)['**'](6)", () => {
        const actual = BigFlo(5)['**'](6).toString();
        const expect = '15625';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ["BigFlo(5).toThePowerOf(6)", () => {
        const actual = BigFlo(5).toThePowerOf(6).toString();
        const expect = '15625';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['9999999999999999999999999999999999999999999999999999999999999n + 0.1 = TypeError: Cannot mix BigInt and other types', () => {
        const actual = BigFlo(9999999999999999999999999999999999999999999999999999999999999n).plus(0.1).toString();
        const expect = '9999999999999999999999999999999999999999999999999999999999999.1';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Infinity + 1 = Infinity', () => {
        const actual = BigFlo('Infinity').plus('1').toString();
        const expect = 'Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1 + Infinity = Infinity', () => {
        const actual = BigFlo('1').plus('Infinity').toString();
        const expect = 'Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-Infinity + 1 = -Infinity', () => {
        const actual = BigFlo('-Infinity').plus('1').toString();
        const expect = '-Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Infinity + -1 = Infinity', () => {
        const actual = BigFlo('Infinity').plus('-1').toString();
        const expect = 'Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-Infinity + -1 = -Infinity', () => {
        const actual = BigFlo('-Infinity').plus('-1').toString();
        const expect = '-Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-1 + Infinity = Infinity', () => {
        const actual = BigFlo('-1').plus('Infinity').toString();
        const expect = 'Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1 + -Infinity = -Infinity', () => {
        const actual = BigFlo('1').plus('-Infinity').toString();
        const expect = '-Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-1 + -Infinity = -Infinity', () => {
        const actual = BigFlo('-1').plus('-Infinity').toString();
        const expect = '-Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Infinity - 1 = Infinity', () => {
        const actual = BigFlo('Infinity').minus('1').toString();
        const expect = 'Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Infinity - -1 = Infinity', () => {
        const actual = BigFlo('Infinity').minus('-1').toString();
        const expect = 'Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-Infinity - 1 = -Infinity', () => {
        const actual = BigFlo('-Infinity').minus('1').toString();
        const expect = '-Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-Infinity - -1 = -Infinity', () => {
        const actual = BigFlo('-Infinity').minus('-1').toString();
        const expect = '-Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1 - Infinity = -Infinity', () => {
        const actual = BigFlo('1').minus('Infinity').toString();
        const expect = '-Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1 - -Infinity = Infinity', () => {
        const actual = BigFlo('1').minus('-Infinity').toString();
        const expect = 'Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-1 - Infinity = -Infinity', () => {
        const actual = BigFlo('-1').minus('Infinity').toString();
        const expect = '-Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-1 - -Infinity = Infinity', () => {
        const actual = BigFlo('-1').minus('-Infinity').toString();
        const expect = 'Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Infinity / 999 = Infinity', () => {
        const actual = BigFlo('Infinity').div('999').toString();
        const expect = 'Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-Infinity / 999 = -Infinity', () => {
        const actual = BigFlo('-Infinity').div('999').toString();
        const expect = '-Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Infinity / -999 = -Infinity', () => {
        const actual = BigFlo('Infinity').div('-999').toString();
        const expect = '-Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-Infinity / -999 = Infinity', () => {
        const actual = BigFlo('-Infinity').div('-999').toString();
        const expect = 'Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['999 / Infinity = 0', () => {
        const actual = BigFlo('999').div('Infinity').toString();
        const expect = '0';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-999 / Infinity = 0', () => {
        const actual = BigFlo('-999').div('Infinity').toString();
        const expect = '0';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['999 / -Infinity = 0', () => {
        const actual = BigFlo('999').div('-Infinity').toString();
        const expect = '0';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-999 / -Infinity = 0', () => {
        const actual = BigFlo('-999').div('-Infinity').toString();
        const expect = '0';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Infinity * 999 = Infinity', () => {
        const actual = BigFlo('Infinity').times('999').toString();
        const expect = 'Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Infinity * -999 = -Infinity', () => {
        const actual = BigFlo('Infinity').times('-999').toString();
        const expect = '-Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-Infinity * 999 = -Infinity', () => {
        const actual = BigFlo('-Infinity').times('999').toString();
        const expect = '-Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-Infinity * -999 = Infinity', () => {
        const actual = BigFlo('-Infinity').times('-999').toString();
        const expect = 'Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['999 * Infinity = Infinity', () => {
        const actual = BigFlo('999').times('Infinity').toString();
        const expect = 'Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1 / 0 = Infinity', () => {
        const actual = BigFlo('1').div('0').toString();
        const expect = 'Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-1 / 0 = -Infinity', () => {
        const actual = BigFlo('-1').div('0').toString();
        const expect = '-Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Infinity + Infinity = Infinity', () => {
        const actual = BigFlo('Infinity').plus('Infinity').toString();
        const expect = 'Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Infinity - Infinity = NaN', () => {
        const actual = BigFlo('Infinity').minus('Infinity').toString();
        const expect = '0';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Infinity * Infinity = Infinity', () => {
        const actual = BigFlo('Infinity').times('Infinity').toString();
        const expect = 'Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Infinity / Infinity = NaN', () => {
        const actual = BigFlo('Infinity').div('Infinity').toString();
        const expect = 'Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1e20 + 2 = 100000000000000000000', () => {
        const actual = BigFlo('1e20').plus('2').toString();
        const expect = '100000000000000000002';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1.7976931348623157E+308 + 1E100 = 1.7976931348623157e+308', () => {
        // test uppercase E for scientific notation
        const actual = BigFlo('1.7976931348623157E+308').plus('1E100').toString();
        const expect = '179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1.7976931348623157e+308 + 1 = 1.7976931348623157e+308', () => {
        const actual = BigFlo('1.7976931348623157e+308').plus('1').toString();
        const expect = '179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1.7976931348623157e3 + 1 = 1798.6931348623157', () => {
        const actual = BigFlo('1.7976931348623157e3').plus('1').toString();
        const expect = '1798.6931348623157';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1.7976931348623157e-3 + 1 = 1.0017976931348622', () => {
        const actual = BigFlo('1.7976931348623157e-3').plus('1').toString();
        const expect = '1.0017976931348623157';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-1.7976931348623157e3 + 1 = -1796.6931348623157', () => {
        const actual = BigFlo('-1.7976931348623157e3').plus('1').toString();
        const expect = '-1796.6931348623157';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-1.7976931348623157e-3 + 1 = 0.9982023068651377', () => {
        const actual = BigFlo('-1.7976931348623157e-3').plus('1').toString();
        const expect = '0.9982023068651376843';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['+1.7976931348623157e+3 + 1 = 1798.6931348623157', () => {
        const actual = BigFlo('+1.7976931348623157e+3').plus('1').toString();
        const expect = '1798.6931348623157';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['5.210724853226596e+19 / -2.4665402933587313e+18 = -21.125642533619672', () => {
        const actual = BigFlo('5.210724853226596e+19').div('-2.4665402933587313e+18').toString();
        const expect = '-21.125642533619673080515665012187826';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1.0985079557484118e+19 * 5.27589707150934e+19 = 5.795614906762758e+38', () => {
        const actual = BigFlo('1.0985079557484118e+19').times('5.27589707150934e+19').toString();
        const expect = '579561490676275747070273386621200000000';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['4.317475246251447e+19 * -8.939481046292968e+19 = -3.859598813170388e+39', () => {
        const actual = BigFlo('4.317475246251447e+19').times('-8.939481046292968e+19').toString();
        const expect = '-3859598813170387509451735592469600000000';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-5.342924760212046e+18 * -6.6229222549858615e+19 = 3.538577530112335e+38', () => {
        const actual = BigFlo('-5.342924760212046e+18').times('-6.6229222549858615e+19').toString();
        const expect = '353857753011233570307614719876290000000';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-4.012297521931832e+19 / -6.061001654149693e+18 = 6.619858813575465', () => {
        const actual = BigFlo('-4.012297521931832e+19').div('-6.061001654149693e+18').toString();
        const expect = '6.619858813575465405180608429034145';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Handle NaN constructor', () => {
        const actual = BigFlo(NaN).toString();
        const expect = 'NaN';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Handle NaN constructor chain operations', () => {
        const actual = BigFlo(NaN).plus(9).minus(8).times(7).div(6).toString();
        const expect = 'NaN';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Handle NaN in chain operations', () => {
        const actual = BigFlo(10).plus(9).minus(NaN).times(7).div(6).toString();
        const expect = 'NaN';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Handle BigFlo NaN in chain operations', () => {
        const actual = BigFlo(10).plus(BigFlo(NaN)).minus(8).times(7).div(6).toString();
        const expect = 'NaN';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['(((10+9)-8)*7)/6 = 12.833333333333334', () => {
        const actual = BigFlo(10).plus(9).minus(8).times(7).div(6).toString();
        const expect = '12.833333333333333333333333333333333';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['((((((((10+9)-8)*7)/6)*6)/7)+8)-9) = 10', () => {
        const actual = BigFlo(10).plus(9).minus(8).times(7).div(6).times(6).div(7).plus(8).minus(9).toString();
        const expect = '10';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['(1 / 3) * 3 = 1', () => {
        const actual = BigFlo(1).div(3).times(3).toString();
        const expect = '1';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['0.3333333333333333 * 3 = 0.9999999999999999', () => {
        const actual = BigFlo('0.3333333333333333').times('3').toString();
        const expect = '0.9999999999999999';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['0.33333333333333333333 * 3 = 0.99999999999999999999', () => {
        const actual = BigFlo('0.33333333333333333333').times('3').toString();
        const expect = '0.99999999999999999999';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['FRACTIONAL ROUNDING PRECISION 0: 0.3 * 3 = 1', () => {
        const actual = BigFlo('0.3').setFractionalRoundingPrecision(0).times('3').toString();
        const expect = '1';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['FRACTIONAL ROUNDING PRECISION 1: 0.3 * 3 = 1', () => {
        const actual = BigFlo('0.3').setFractionalRoundingPrecision(1).times('3').toString();
        const expect = '1';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['FRACTIONAL ROUNDING PRECISION 2: 0.3 * 3 = 0.9', () => {
        const actual = BigFlo('0.3').setFractionalRoundingPrecision(2).times('3').toString();
        const expect = '0.9';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['FRACTIONAL ROUNDING PRECISION 2: 0.33 * 3 = 1', () => {
        const actual = BigFlo('0.33').setFractionalRoundingPrecision(2).times('3').toString();
        const expect = '1';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['STATIC FRACTIONAL ROUNDING PRECISION 5: 0.3333 * 3 = 0.9999', () => {
        const original = BigFlo().getFractionalRoundingPrecision();
        BigFlo.setFractionalRoundingPrecision(5);
        const actual = BigFlo('0.3333').times('3').toString();
        BigFlo.setFractionalRoundingPrecision(original);
        const expect = '0.9999';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['STATIC FRACTIONAL ROUNDING PRECISION 5: 0.33333 * 3 = 1', () => {
        const original = BigFlo().getFractionalRoundingPrecision();
        BigFlo.setFractionalRoundingPrecision(5);
        const actual = BigFlo('0.33333').times('3').toString();
        BigFlo.setFractionalRoundingPrecision(original);
        const expect = '1';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['STATIC FRACTIONAL ROUNDING PRECISION 5: 0.333333 * 3 = 1', () => {
        const original = BigFlo().getFractionalRoundingPrecision();
        BigFlo.setFractionalRoundingPrecision(5);
        const actual = BigFlo('0.333333').times('3').toString();
        BigFlo.setFractionalRoundingPrecision(original);
        const expect = '1';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['FRACTIONAL ROUNDING PRECISION 16: 0.3333333333333333 * 3 = 1', () => {
        const actual = BigFlo('0.3333333333333333').setFractionalRoundingPrecision(16).times('3').toString();
        const expect = '1';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['FRACTIONAL ROUNDING PRECISION 20: 0.33333333333333333333 * 3 = 1', () => {
        const actual = BigFlo('0.33333333333333333333').setFractionalRoundingPrecision(20).times('3').toString();
        const expect = '1';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['FRACTIONAL ROUNDING PRECISION 0: 9 / 10 = 1', () => {
        const actual = BigFlo('9').setFractionalRoundingPrecision(0)['/']('10').toString();
        const expect = '1';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['FRACTIONAL ROUNDING PRECISION 1: 99 / 100 = 1', () => {
        const actual = BigFlo('99').setFractionalRoundingPrecision(1)['/']('100').toString();
        const expect = '1';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['FRACTIONAL ROUNDING PRECISION 2: 9 / 10 = 0.9', () => {
        const actual = BigFlo('9').setFractionalRoundingPrecision(2)['/']('10').toString();
        const expect = '0.9';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['FRACTIONAL ROUNDING PRECISION 2: 99 / 100 = 1', () => {
        const actual = BigFlo('99').setFractionalRoundingPrecision(2)['/']('100').toString();
        const expect = '1';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['STATIC FRACTIONAL ROUNDING PRECISION 5: 9999 / 10000 = 0.9999', () => {
        const original = BigFlo().getFractionalRoundingPrecision();
        BigFlo.setFractionalRoundingPrecision(5);
        const actual = BigFlo('9999')['/']('10000').toString();
        BigFlo.setFractionalRoundingPrecision(original);
        const expect = '0.9999';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['STATIC FRACTIONAL ROUNDING PRECISION 5: 99999 / 100000 = 1', () => {
        const original = BigFlo().getFractionalRoundingPrecision();
        BigFlo.setFractionalRoundingPrecision(5);
        const actual = BigFlo('99999')['/']('100000').toString();
        BigFlo.setFractionalRoundingPrecision(original);
        const expect = '1';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['STATIC FRACTIONAL ROUNDING PRECISION 5: 999999 / 1000000 = 1', () => {
        const original = BigFlo().getFractionalRoundingPrecision();
        BigFlo.setFractionalRoundingPrecision(5);
        const actual = BigFlo('999999')['/']('1000000').toString();
        BigFlo.setFractionalRoundingPrecision(original);
        const expect = '1';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['FRACTIONAL ROUNDING PRECISION 16: 9999999999999999 / 10000000000000000 = 1', () => {
        const actual = BigFlo('9999999999999999').setFractionalRoundingPrecision(16)['/']('10000000000000000').toString();
        const expect = '1';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['FRACTIONAL ROUNDING PRECISION 20: 99999999999999999999 / 3 = 1', () => {
        const actual = BigFlo('99999999999999999999').setFractionalRoundingPrecision(20)['/']('100000000000000000000').toString();
        const expect = '1';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['0.333333333333333333333333333333333 * 3 = 1', () => {
        const actual = BigFlo('0.333333333333333333333333333333333').times('3').toString();
        const expect = '1';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['0.333333333333333333333333333333333333333333333333333333333333333333 * 3 = 1', () => {
        const actual = BigFlo('0.333333333333333333333333333333333333333333333333333333333333333333').times('3').toString();
        const expect = '1';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['(77 / 6) * 3 = 38.5', () => {
        const actual = BigFlo(77).div(6).times(3).toString();
        const expect = '38.5';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['4.5 * 0 = 0', () => {
        const actual = BigFlo('4.5').times('0').toString();
        const expect = '0';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-3.2 * 0 = 0', () => {
        const actual = BigFlo('-3.2').times('0').toString();
        const expect = '0';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-2.5 + -3.5 = -6', () => {
        const actual = BigFlo('-2.5').plus('-3.5').toString();
        const expect = '-6';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-4.1 - 2.1 = -6.2', () => {
        const actual = BigFlo('-4.1').minus('2.1').toString();
        const expect = '-6.2';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1e+30 + 1e+30 = 2e+30', () => {
        const actual = BigFlo('1e+30').plus('1e+30').toString();
        const expect = '2000000000000000000000000000000';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1e+30 + 0.0000000001 = 1e+30', () => {
        const actual = BigFlo('1e+30').plus('0.0000000001').toString();
        const expect = '1000000000000000000000000000000.0000000001';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['"abc" + 5 = NaN', () => {
        const actual = BigFlo('abc').plus('5').toString();
        const expect = 'NaN';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1e+308 * 1e+308 = Infinity', () => {
        const actual = BigFlo('1e+308').times('1e+308').toString();
        const expect = '10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1e-20 + -1e-20 = 0', () => {
        const actual = BigFlo('1e-20').plus('-1e-20').toString();
        const expect = '0';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-1e-20 + 1e-20 = 0', () => {
        const actual = BigFlo('-1e-20').plus('1e-20').toString();
        const expect = '0';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['123456789.987654321 + 987654321.123456789 = 1111111111.11111111', () => {
        const actual = BigFlo('123456789.987654321').plus('987654321.123456789').toString();
        const expect = '1111111111.11111111';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1234.5678 * 8765.4321 = 10821520.22374638', () => {
        const actual = BigFlo('1234.5678').times('8765.4321').toString();
        const expect = '10821520.22374638';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1000000 / 3 = 333333.33333333333333', () => {
        const actual = BigFlo('1000000').div('3').toString();
        const expect = '333333.333333333333333333333333333333333';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1e-20 / 2 = 5e-21', () => {
        const actual = BigFlo('1e-20').div('2').toString();
        const expect = '0.000000000000000000005';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1e+20 + 1e-20 = 100000000000000000000', () => {
        const actual = BigFlo('1e+20').plus('1e-20').toString();
        const expect = '100000000000000000000.00000000000000000001';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['((10.5 + 2.3) * 4.1) / 5.2 = 10.092307692307692', () => {
        const actual = BigFlo('10.5').plus('2.3').times('4.1').div('5.2').toString();
        const expect = '10.092307692307692307692307692307692';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-15.75 + 20.85 = 5.1', () => {
        const actual = BigFlo('-15.75').plus('20.85').toString();
        const expect = '5.1';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['MANUAL: (40 / 1) ^ 18', () => {
        const actual = BigFlo(40).div(1).times(40).times(40).times(40).times(40).times(40).times(40).times(40).times(40).times(40).times(40).times(40).times(40).times(40).times(40).times(40).times(40).times(40).toString();
        const expect = '68719476736000000000000000000';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['POW: (40 / 1) ^ 18', () => {
        const actual = BigFlo(40).div(1).pow(18).toString();
        const expect = '68719476736000000000000000000';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Math.pow(5.65685424949238, 0) = 1', () => {
        const actual = BigFlo(5.65685424949238).pow(0).toString();
        const expect = '1';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Math.pow(5.65685424949238, 1) = 5.65685424949238', () => {
        const actual = BigFlo(5.65685424949238).pow(1).toString();
        const expect = '5.65685424949238';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Math.pow(5.65685424949238, 7) = 185363.8000473662', () => {
        const actual = BigFlo(5.65685424949238).pow(7).toString();
        const expect = '185363.80004736626946079033324232335603915663809104542652073073276109355066551181403821697851805615352192';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Math.pow(5.65685424949238, 18) = 35184372088831.945', () => {
        const actual = BigFlo(5.65685424949238).pow(18).toString();
        // const expect = '35184372088831.945';

        // WOLFRAM (WRONG ANSWER)
        // const expect = '3.5184372088831978145435197507121869870426705698655780193239249483935807403435382104689929184504409359869186850841822700602404615906993535448455233249089697086507418550705756921909267129778787833636002449660646747499685608643574691484745238517515328868540770429435904e13';
        
        const expect = '35184372088831.97814543519750712186987042670569865578019323924948393580740343538210468992918450440935986918685084182271402417741590698890386242226136231780426300262084950260710074444596316180755051924395249010214968723909081514289403681649883773506332074803312992';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Math.pow(-10, 3) = -1000', () => {
        const actual = BigFlo(-10).pow(3).toString();
        const expect = '-1000';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Math.pow(-10, 4) = 10000', () => {
        const actual = BigFlo(-10).pow(4).toString();
        const expect = '10000';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Math.pow(-10, 600) = Infinity', () => {
        const actual = BigFlo(-10).pow(600).toString();
        const expect = '1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['0.1 ** 10 = 1.0000000000000006e-10', () => {
        const actual = BigFlo(0.1).pow(10).toString();
        const expect = '0.0000000001';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Number("123"); // 123', () => {
        const actual = +BigFlo('123');
        const expect = 123;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Number("123") === 123; // true', () => {
        const actual = +BigFlo("123") === 123;
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Number("12.3"); // 12.3', () => {
        const actual = +BigFlo('12.3');
        const expect = 12.3;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Number("12.00"); // 12', () => {
        const actual = +BigFlo('12.00');
        const expect = 12;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Number("123e-1"); // 12.3', () => {
        const actual = +BigFlo('123e-1');
        const expect = 12.3;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['Number("foo"); // NaN', () => {
        const actual = +BigFlo('foo');
        const expect = NaN;
        const result = isNaN(actual);
        return { result, expect, actual };
    }],

    ['Number("100a"); // NaN', () => {
        const actual = +BigFlo('100a');
        const expect = NaN;
        const result = isNaN(actual);
        return { result, expect, actual };
    }],

    ['Number("-Infinity"); // -Infinity', () => {
        const actual = +BigFlo('-Infinity');
        const expect = -Infinity;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-1 / 12 = -0.08333333333333333', () => {
        const actual = BigFlo('-1').div(12).toString();
        const expect = '-0.083333333333333333333333333333333';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1 / -12 = -0.08333333333333333', () => {
        const actual = BigFlo(1).div(-12).toString();
        const expect = '-0.083333333333333333333333333333333';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['123456789123456789 + 987654321987654321 = 1111111111111111110', () => {
        const actual = BigFlo('123456789123456789').plus('987654321987654321').toString();
        const expect = '1111111111111111110';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['0.000123 - 0.000456 = -0.000333', () => {
        const actual = BigFlo(0.000123).minus(0.000456).toString();
        const expect = '-0.000333';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['987654321 * 123456789 = 121932631112635269', () => {
        const actual = BigFlo('987654321').times('123456789').toString();
        const expect = '121932631112635269';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1000000000000000000 - 1 = 999999999999999999', () => {
        const actual = BigFlo('1000000000000000000').minus(1).toString();
        const expect = '999999999999999999';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-123456789123456789 * 2 = -246913578246913578', () => {
        const actual = BigFlo('-123456789123456789').times(2).toString();
        const expect = '-246913578246913578';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['0.1 / 0.02 = 5', () => {
        const actual = BigFlo(0.1).div(0.02).toString();
        const expect = '5';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1 / -123456789012345678901234567890 = -8.1000000729e-30', () => {
        const actual = BigFlo(1).setDivisionPrecision(200).div(-123456789012345678901234567890).toString();
        const expect = '-0.00000000000000000000000000000810000007290000059130000473850003791610030333690242670331941363465530908534247269083978153481825228664601830126814641824517135406137084059096673282773387072187097387496779';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['123456789012345678901234567890 + 987654321098765432109876543210 = 1111111110111111111011111111100', () => {
        const actual = BigFlo('123456789012345678901234567890').plus('987654321098765432109876543210').toString();
        const expect = '1111111110111111111011111111100';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['0.000000000123456789 - 0.000000000987654321 = -0.000000000864197532', () => {
        const actual = BigFlo(0.000000000123456789).minus(0.000000000987654321).toString();
        const expect = '-0.000000000864197532';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['98765432109876543210 * 12345678901234567890 = 1.219326311370218e+39', () => {
        const actual = BigFlo('98765432109876543210').times('12345678901234567890').toString();
        const expect = '1219326311370217952237463801111263526900';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1 / 3333333333333333333333333333333333 = 3e-34', () => {
        const actual = BigFlo(1).setDivisionPrecision(200).div(3333333333333333333333333333333333).toString();
        const expect = '0.0000000000000000000000000000000003000000000000000030000000000000000300000000000000003000000000000000030000000000000000300000000000000003000000000000000030000000000000000300000000000000003';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1000000000000000000000000000000000000 - 1 = 999999999999999999999999999999999999', () => {
        const actual = BigFlo('1000000000000000000000000000000000000').minus(1).toString();
        const expect = '999999999999999999999999999999999999';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['0.0000000001 + 0.0000000002 = 0.0000000003', () => {
        const actual = BigFlo(0.0000000001).plus(0.0000000002).toString();
        const expect = '0.0000000003';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-123456789012345678901234567890 * 2 = -246913578024691357802469135780', () => {
        const actual = BigFlo('-123456789012345678901234567890').times(2).toString();
        const expect = '-246913578024691357802469135780';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['0.000000001 / 0.000000002 = 0.5', () => {
        const actual = BigFlo(0.000000001).div(0.000000002).toString();
        const expect = '0.5';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123 + 9876543210987654321098765432109876543210987654321098765432109876543210987654321098765432109876543210987', () => {
        const actual = BigFlo('1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123').plus('9876543210987654321098765432109876543210987654321098765432109876543210987654321098765432109876543210987').toString();
        const expect = '11111111101111111110111111111011111111101111111110111111111011111111101111111110111111111011111111101110';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['9876543210987654321098765432109876543210987654321098765432109876543210987654321098765432109876543210987 - 1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123 = 8641975320864197532086419753208641975320864197532086419753208641975320864197532086419753208641975320864', () => {
        const actual = BigFlo('9876543210987654321098765432109876543210987654321098765432109876543210987654321098765432109876543210987').minus('1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123').toString();
        const expect = '8641975320864197532086419753208641975320864197532086419753208641975320864197532086419753208641975320864';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123 * 2 = 2469135780246913578024691357802469135780246913578024691357802469135780246913578024691357802469135780246', () => {
        const actual = BigFlo('1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123').times(2).toString();
        const expect = '2469135780246913578024691357802469135780246913578024691357802469135780246913578024691357802469135780246';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123 / 3 = 411522630041152263004115226300411522630041152263004115226300411522630041152263004115226300411522630041', () => {
        const actual = BigFlo('1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123').div(3).toString();
        const expect = '411522630041152263004115226300411522630041152263004115226300411522630041152263004115226300411522630041';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-9876543210987654321098765432109876543210987654321098765432109876543210987654321098765432109876543210987 + 1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123 = -8641975320864197532086419753208641975320864197532086419753208641975320864197532086419753208641975320864', () => {
        const actual = BigFlo('-9876543210987654321098765432109876543210987654321098765432109876543210987654321098765432109876543210987').plus('1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123').toString();
        const expect = '-8641975320864197532086419753208641975320864197532086419753208641975320864197532086419753208641975320864';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123 / -9876543210987654321098765432109876543210987654321098765432109876543210987654321098765432109876543210987', () => {
        const actual = BigFlo('1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123').setDivisionPrecision(200).div('-9876543210987654321098765432109876543210987654321098765432109876543210987654321098765432109876543210987').toString();
        const expect = '-0.12499999886093750001423828124982202148437722473144528469085693394136428832573294639592833817005089577283639516667412903198560983745556692140236307542783849078283491849989352727331784386215144553980975';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['-1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123 - 9876543210987654321098765432109876543210987654321098765432109876543210987654321098765432109876543210987', () => {
        const actual = BigFlo('-1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123').minus('9876543210987654321098765432109876543210987654321098765432109876543210987654321098765432109876543210987').toString();
        const expect = '-11111111101111111110111111111011111111101111111110111111111011111111101111111110111111111011111111101110';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['9876543210987654321098765432109876543210987654321098765432109876543210987654321098765432109876543210987 * -2 = -19753086421975308642197530864219753086421975308642197530864219753086421975308642197530864219753086421974', () => {
        const actual = BigFlo('9876543210987654321098765432109876543210987654321098765432109876543210987654321098765432109876543210987').times(-2).toString();
        const expect = '-19753086421975308642197530864219753086421975308642197530864219753086421975308642197530864219753086421974';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['12345678901234567890123456789012345678901234567.89012345678901234567890123456789012345678901234567890123 * -98765432109876.54321098765432109876543210987654321098765432109876543210987654321098765432109876543210987', () => {
        const actual = BigFlo('12345678901234567890123456789012345678901234567.89012345678901234567890123456789012345678901234567890123').times('-98765432109876.54321098765432109876543210987654321098765432109876543210987654321098765432109876543210987').toString();
        const expect = '-1219326311370217952261850327338667885945115073915636335923676.1164455788599298790108215200135650052126042539123615968591236768327011193979489871112627862282730673745419856126256664487797134336296860222381401';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['9876543210987654321098765432109876543210987654321098765432109876543210987654321098765432109876543210987 / 1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123', () => {
        const actual = BigFlo('9876543210987654321098765432109876543210987654321098765432109876543210987654321098765432109876543210987').setDivisionPrecision(200).div('1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123').toString();
        const expect = '8.00000007290000066339000603684905493532639991147023919437917666885050768653961994751054152234592785335037345822512840448142488593904974898391062689446369612160025628258598851334776818198367212177414946';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(123).isFinite()', () => {
        const actual = BigFlo(123).isFinite();
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(Infinity).isFinite()', () => {
        const actual = BigFlo(Infinity).isFinite();
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],


    ['BigFlo(-Infinity).isFinite()', () => {
        const actual = BigFlo(-Infinity).isFinite();
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(NaN).isFinite()', () => {
        const actual = BigFlo(NaN).isFinite();
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(0).isFinite()', () => {
        const actual = BigFlo(0).isFinite();
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(42).isInteger()', () => {
        const actual = BigFlo(42).isInteger();
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(42.3).isInteger()', () => {
        const actual = BigFlo(42.3).isInteger();
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo("100").isInteger()', () => {
        const actual = BigFlo("100").isInteger();
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(-1).isInteger()', () => {
        const actual = BigFlo(-1).isInteger();
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(0).isInteger()', () => {
        const actual = BigFlo(0).isInteger();
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(NaN).isNaN()', () => {
        const actual = BigFlo(NaN).isNaN();
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(5).isNaN()', () => {
        const actual = BigFlo(5).isNaN();
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(3.14).isNaN()', () => {
        const actual = BigFlo(3.14).isNaN();
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo("not-a-number").isNaN()', () => {
        const actual = BigFlo("not-a-number").isNaN();
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(Infinity).isNaN()', () => {
        const actual = BigFlo(Infinity).isNaN();
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(123456789).isSafeInteger()', () => {
        const actual = BigFlo(123456789).isSafeInteger();
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(Number.MAX_SAFE_INTEGER + 1).isSafeInteger()', () => {
        const actual = BigFlo(Number.MAX_SAFE_INTEGER + 1).isSafeInteger();
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(3.14).isSafeInteger()', () => {
        const actual = BigFlo(3.14).isSafeInteger();
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo("9007199254740993").isSafeInteger()', () => {
        const actual = BigFlo("9007199254740993").isSafeInteger();
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(0).isSafeInteger()', () => {
        const actual = BigFlo(0).isSafeInteger();
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(42).parseInt()', () => {
        const actual = BigFlo(42).parseInt();
        const expect = 42;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(42.99).parseInt()', () => {
        const actual = BigFlo(42.99).parseInt();
        const expect = 42;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(-123).parseInt()', () => {
        const actual = BigFlo(-123).parseInt();
        const expect = -123;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo("9007199254740991").parseInt()', () => {
        const actual = BigFlo("9007199254740991").parseInt();
        const expect = 9007199254740991;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo("42").parseInt()', () => {
        const actual = BigFlo("42").parseInt();
        const expect = 42;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo("123abc").parseInt()', () => {
        const actual = BigFlo("123abc").parseInt().toString();
        const expect = 'NaN';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo("0x1A").parseInt()', () => {
        const actual = BigFlo("0x1A").parseInt().toString();
        const expect = 'NaN';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo("1e3").parseInt()', () => {
        const actual = BigFlo("1e3").parseInt();
        const expect = 1000;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(0).parseInt()', () => {
        const actual = BigFlo(0).parseInt();
        const expect = 0;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(-123.45).parseInt()', () => {
        const actual = BigFlo(-123.45).parseInt();
        const expect = -123;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo("9007199254740993").parseBigInt()', () => {
        const actual = BigFlo("9007199254740993").parseBigInt();
        const expect = 9007199254740993n;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo("123456789012345678901234567890").parseBigInt()', () => {
        const actual = BigFlo("123456789012345678901234567890").parseBigInt();
        const expect = 123456789012345678901234567890n;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(123.456).parseBigInt()', () => {
        const actual = BigFlo(123.456).parseBigInt();
        const expect = 123n;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(-123456789).parseBigInt()', () => {
        const actual = BigFlo(-123456789).parseBigInt();
        const expect = -123456789n;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(123.456).parseFloat()', () => {
        const actual = BigFlo(123.456).parseFloat();
        const expect = 123.456;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo("12345678901234567890.123456789").parseFloat()', () => {
        const actual = BigFlo("12345678901234567890.123456789").parseFloat();
        const expect = 12345678901234567000;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo("1e-3").parseFloat()', () => {
        const actual = BigFlo("1e-3").parseFloat();
        const expect = 0.001;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(-123.456).parseFloat()', () => {
        const actual = BigFlo(-123.456).parseFloat();
        const expect = -123.456;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo("102.3abc").parseFloat()', () => {
        const actual = BigFlo("102.3abc").parseFloat().toString();
        const expect = 'NaN';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(Infinity).parseFloat()', () => {
        const actual = BigFlo(Infinity).parseFloat();
        const expect = Infinity;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(123.456).toFixed(2)', () => {
        const actual = BigFlo(123.456).toFixed(2);
        const expect = "123.45";
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(123.456).toFixed()', () => {
        const actual = BigFlo(123.456).toFixed();
        const expect = "123";
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo("12345678901234567890.123456").toFixed(3)', () => {
        const actual = BigFlo("12345678901234567890.123456").toFixed(3);
        const expect = "12345678901234567890.123";
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(-123.456).toFixed(2)', () => {
        const actual = BigFlo(-123.456).toFixed(2);
        const expect = "-123.45";
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(123.456789).toFixed(50)', () => {
        const actual = BigFlo(123.456789).toFixed(50);
        const expect = "123.45678900000000000000000000000000000000000000000000";
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(Infinity).toFixed(2)', () => {
        const actual = BigFlo(Infinity).toFixed(2);
        const expect = "Infinity";
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(-Infinity).toFixed(2)', () => {
        const actual = BigFlo(-Infinity).toFixed(2);
        const expect = "-Infinity";
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(NaN).toFixed(2)', () => {
        const actual = BigFlo(NaN).toFixed(2);
        const expect = "NaN";
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(123).abs()', () => {
        const actual = BigFlo(123).abs().toString();
        const expect = '123';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(-123).abs()', () => {
        const actual = BigFlo(-123).abs().toString();
        const expect = '123';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(0).abs()', () => {
        const actual = BigFlo(0).abs().toString();
        const expect = '0';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo("12345678901234567890").abs()', () => {
        const actual = BigFlo("12345678901234567890").abs().toString();
        const expect = '12345678901234567890';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(-123.456).abs()', () => {
        const actual = BigFlo(-123.456).abs().toString();
        const expect = '123.456';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo("-123456789012345678901234567890").abs()', () => {
        const actual = BigFlo("-123456789012345678901234567890").abs().toString();
        const expect = '123456789012345678901234567890';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(0.000001).abs()', () => {
        const actual = BigFlo(0.000001).abs().toString();
        const expect = '0.000001';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo("-0.1234567890123456789").abs()', () => {
        const actual = BigFlo('-0.1234567890123456789').abs().toString();
        const expect = '0.1234567890123456789';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo("-123").abs()', () => {
        const actual = BigFlo("-123").abs().toString();
        const expect = '123';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo("-1e3").abs()', () => {
        const actual = BigFlo("-1e3").abs().toString();
        const expect = '1000';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(-Infinity).ceil()', () => {
        const actual = BigFlo(-Infinity).ceil().toString();
        const expect = '-Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(-7.004).ceil()', () => {
        const actual = BigFlo(-7.004).ceil().toString();
        const expect = '-7';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(-4).ceil()', () => {
        const actual = BigFlo(-4).ceil().toString();
        const expect = '-4';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(-0.95).ceil()', () => {
        const actual = BigFlo(-0.95).ceil().toString();
        const expect = '0';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(-0).ceil()', () => {
        const actual = BigFlo(-0).ceil().toString();
        const expect = '0';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(0).ceil()', () => {
        const actual = BigFlo(0).ceil().toString();
        const expect = '0';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(0.95).ceil()', () => {
        const actual = BigFlo(0.95).ceil().toString();
        const expect = '1';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(4).ceil()', () => {
        const actual = BigFlo(4).ceil().toString();
        const expect = '4';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(7.004).ceil()', () => {
        const actual = BigFlo(7.004).ceil().toString();
        const expect = '8';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(Infinity).ceil()', () => {
        const actual = BigFlo(Infinity).ceil().toString();
        const expect = 'Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(-Infinity).floor()', () => {
        const actual = BigFlo(-Infinity).floor().toString();
        const expect = "-Infinity";
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(-45.95).floor()', () => {
        const actual = BigFlo(-45.95).floor().toString();
        const expect = "-46";
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(-45.05).floor()', () => {
        const actual = BigFlo(-45.05).floor().toString();
        const expect = "-46";
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(-0).floor()', () => {
        const actual = BigFlo(-0).floor().toString();
        const expect = "0";
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(0).floor()', () => {
        const actual = BigFlo(0).floor().toString();
        const expect = "0";
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(4).floor()', () => {
        const actual = BigFlo(4).floor().toString();
        const expect = "4";
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(45.05).floor()', () => {
        const actual = BigFlo(45.05).floor().toString();
        const expect = "45";
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(45.95).floor()', () => {
        const actual = BigFlo(45.95).floor().toString();
        const expect = "45";
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(Infinity).floor()', () => {
        const actual = BigFlo(Infinity).floor().toString();
        const expect = "Infinity";
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(7.004).floor()', () => {
        const actual = BigFlo(7.004).floor().toString();
        const expect = '7';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(-7.004).floor()', () => {
        const actual = BigFlo(-7.004).floor().toString();
        const expect = '-8';
        const result = actual === expect;
        return { result, expect, actual };
    }],


    ['BigFlo(-Infinity).round()', () => {
        const actual = BigFlo(-Infinity).round().toString();
        const expect = '-Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(-20.51).round()', () => {
        const actual = BigFlo(-20.51).round().toString();
        const expect = '-21';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(-20.5).round()', () => {
        const actual = BigFlo(-20.5).round().toString();
        const expect = '-20';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(-0.1).round()', () => {
        const actual = BigFlo(-0.1).round().toString();
        const expect = '0';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(0).round()', () => {
        const actual = BigFlo(0).round().toString();
        const expect = '0';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(20.49).round()', () => {
        const actual = BigFlo(20.49).round().toString();
        const expect = '20';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(20.5).round()', () => {
        const actual = BigFlo(20.5).round().toString();
        const expect = '21';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(42).round()', () => {
        const actual = BigFlo(42).round().toString();
        const expect = '42';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(Infinity).round()', () => {
        const actual = BigFlo(Infinity).round().toString();
        const expect = 'Infinity';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(3).sign()', () => {
        const actual = BigFlo(3).sign().toString();
        const expect = "1";
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(-3).sign()', () => {
        const actual = BigFlo(-3).sign().toString();
        const expect = "-1";
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo("-3").sign()', () => {
        const actual = BigFlo("-3").sign().toString();
        const expect = "-1";
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(0).sign()', () => {
        const actual = BigFlo(0).sign().toString();
        const expect = "0";
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(-0).sign()', () => {
        const actual = BigFlo(-0).sign().toString();
        const expect = "0";
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(NaN).sign()', () => {
        const actual = BigFlo(NaN).sign().toString();
        const expect = "NaN";
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo("foo").sign()', () => {
        const actual = BigFlo("foo").sign().toString();
        const expect = "NaN";
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo().sign()', () => {
        const actual = BigFlo().sign().toString();
        const expect = "NaN";
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(5).isEqual(5)', () => {
        const actual = BigFlo(5).isEqual(5);
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(5).isEqual(4)', () => {
        const actual = BigFlo(5).isEqual(4);
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(-1).isEqual(-1)', () => {
        const actual = BigFlo(-1).isEqual(-1);
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(0).isEqual(0)', () => {
        const actual = BigFlo(0).isEqual(0);
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(3.14).isEqual(2.71)', () => {
        const actual = BigFlo(3.14).isEqual(2.71);
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ["BigFlo(0).eq(0)", () => {
        const actual = BigFlo(0).eq(0);
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ["BigFlo(3.14).eq(2.71)", () => {
        const actual = BigFlo(3.14).eq(2.71);
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ["BigFlo(0)['=='](0)", () => {
        const actual = BigFlo(0)['=='](0);
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ["BigFlo(3.14)['=='](2.71)", () => {
        const actual = BigFlo(3.14)['=='](2.71);
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(5).isGreaterThan(4)', () => {
        const actual = BigFlo(5).isGreaterThan(4);
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(5).isGreaterThan(5)', () => {
        const actual = BigFlo(5).isGreaterThan(5);
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(-1).isGreaterThan(-2)', () => {
        const actual = BigFlo(-1).isGreaterThan(-2);
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(0).isGreaterThan(1)', () => {
        const actual = BigFlo(0).isGreaterThan(1);
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(3.14).isGreaterThan(3)', () => {
        const actual = BigFlo(3.14).isGreaterThan(3);
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ["BigFlo(0).gt(1)", () => {
        const actual = BigFlo(0).gt(1);
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ["BigFlo(3.14).gt(3)", () => {
        const actual = BigFlo(3.14).gt(3);
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ["BigFlo(0)['>'](1)", () => {
        const actual = BigFlo(0)['>'](1);
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ["BigFlo(3.14)['>'](3)", () => {
        const actual = BigFlo(3.14)['>'](3);
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(4).isLessThan(5)', () => {
        const actual = BigFlo(4).isLessThan(5);
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(6).isLessThan(5)', () => {
        const actual = BigFlo(6).isLessThan(5);
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(-2).isLessThan(-1)', () => {
        const actual = BigFlo(-2).isLessThan(-1);
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(-1).isLessThan(-1)', () => {
        const actual = BigFlo(-1).isLessThan(-1);
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(3.139).isLessThan(3.14)', () => {
        const actual = BigFlo(3.139).isLessThan(3.14);
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ["BigFlo(-1).lt(-1)", () => {
        const actual = BigFlo(-1).lt(-1);
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ["BigFlo(3.139).lt(3.14)", () => {
        const actual = BigFlo(3.139).lt(3.14);
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ["BigFlo(-1)['<'](-1)", () => {
        const actual = BigFlo(-1)['<'](-1);
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ["BigFlo(3.139)['<'](3.14)", () => {
        const actual = BigFlo(3.139)['<'](3.14);
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(5).isGreaterThanOrEqual(5)', () => {
        const actual = BigFlo(5).isGreaterThanOrEqual(5);
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(5).isGreaterThanOrEqual(6)', () => {
        const actual = BigFlo(5).isGreaterThanOrEqual(6);
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(-1).isGreaterThanOrEqual(-2)', () => {
        const actual = BigFlo(-1).isGreaterThanOrEqual(-2);
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(0).isGreaterThanOrEqual(0)', () => {
        const actual = BigFlo(0).isGreaterThanOrEqual(0);
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(3.14).isGreaterThanOrEqual(3.15)', () => {
        const actual = BigFlo(3.14).isGreaterThanOrEqual(3.15);
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ["BigFlo(0).gte(0)", () => {
        const actual = BigFlo(0).gte(0);
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ["BigFlo(3.14).gte(3.15)", () => {
        const actual = BigFlo(3.14).gte(3.15);
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ["BigFlo(0)['>='](0)", () => {
        const actual = BigFlo(0)['>='](0);
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ["BigFlo(3.14)['>='](3.15)", () => {
        const actual = BigFlo(3.14)['>='](3.15);
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(4).isLessThanOrEqual(5)', () => {
        const actual = BigFlo(4).isLessThanOrEqual(5);
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(5).isLessThanOrEqual(4)', () => {
        const actual = BigFlo(5).isLessThanOrEqual(4);
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(-2).isLessThanOrEqual(-1)', () => {
        const actual = BigFlo(-2).isLessThanOrEqual(-1);
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(0).isLessThanOrEqual(0)', () => {
        const actual = BigFlo(0).isLessThanOrEqual(0);
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(3.139).isLessThanOrEqual(3.138)', () => {
        const actual = BigFlo(3.139).isLessThanOrEqual(3.138);
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ["BigFlo(0).lte(0)", () => {
        const actual = BigFlo(0).lte(0);
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ["BigFlo(3.139).lte(3.138)", () => {
        const actual = BigFlo(3.139).lte(3.138);
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ["BigFlo(0)['<='](0)", () => {
        const actual = BigFlo(0)['<='](0);
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ["BigFlo(3.139)['<='](3.138)", () => {
        const actual = BigFlo(3.139)['<='](3.138);
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],

    ['BigFlo(5).isDifferent(4)', () => {
        const actual = BigFlo(5).isDifferent(4);
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(5).isDifferent(5)', () => {
        const actual = BigFlo(5).isDifferent(5);
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(-1).isDifferent(-2)', () => {
        const actual = BigFlo(-1).isDifferent(-2);
        const expect = true;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(0).isDifferent(-0)', () => {
        const actual = BigFlo(0).isDifferent(-0);
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ['BigFlo(3.14).isDifferent(3.14)', () => {
        const actual = BigFlo(3.14).isDifferent(3.14);
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ["BigFlo(0).neq(-0)", () => {
        const actual = BigFlo(0).neq(-0);
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ["BigFlo(3.14).neq(3.14)", () => {
        const actual = BigFlo(3.14).neq(3.14);
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ["BigFlo(0)['!='](-0)", () => {
        const actual = BigFlo(0)['!='](-0);
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ["BigFlo(3.14)['!='](3.14)", () => {
        const actual = BigFlo(3.14)['!='](3.14);
        const expect = false;
        const result = actual === expect;
        return { result, expect, actual };
    }],
    
    ["Planck volume count in the whole observable universe", () => {
        const PI = '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679';
        const planckLength = BigFlo('1.616255e-35');
        const planckVolume = planckLength['**'](3);
        const sphereVolume = r => BigFlo(4).setDivisionPrecision(100)['/'](3)['*'](PI)['*'](BigFlo(r)['**'](3));
        const observableUniverseDiameter = BigFlo('8.8e26');
        const observableUniverseRadius = observableUniverseDiameter['/'](2);
        const observableUniverseVolume = sphereVolume(observableUniverseRadius);
        const planckVolumeCountInObservableUniverse = observableUniverseVolume['/'](planckVolume).floor();

        const actual = planckVolumeCountInObservableUniverse.toString();
        const expect = '84511730484834131206881865680639113619647108892011465350695564305272555636684111446309955229141533316023379319781575896906672933616475618801242275287976816735193410571088873930085447368';
        const result = actual === expect;
        return { result, expect, actual };
    }],

    // heads up:
    // - no base convertion from strings (binary, hex, octal)
    // - empty strings and null are NaN instead of zero
    // - only toThePowerOf integers

];

function runTests(tests) {
    let passed = 0;
    let failed = [];
    let totalTime = 0;

    console.log(`---`);

    for (const [description, testFn] of tests) {

        console.log(`test: ${description}`);
        const startTime = performance.now();

        let testData;
        try {
            testData = testFn();

        } catch (err) {
            console.log(`ERROR: `, err.message, err.stack);
            testData = null;
        }
        const endTime = performance.now();
        const testDuration = endTime - startTime;

        totalTime += testDuration;

        const expected = `expect: ${testData?.expect}`;
        const actual = `actual: ${testData?.actual}`;
        const testResultDisplay = `\n${expected}\n${actual}`;
        console.log(testResultDisplay);

        if (testData?.result) {
            console.log(`\nOK`);
            passed++;
        } else {
            console.log(`\n !!! FAILED !!!`);
            failed.push([ description, expected, actual ]);
        }
        console.log(`---`);
    }

    console.log(`\nTest Results: ${passed} Passed, ${failed.length} Failed, ${tests.length} Total`);
    console.log(`Total Time: ${totalTime.toFixed(2)}ms`);

    if (failed.length) {
        console.log(`FAILED TESTS: ${JSON.stringify(failed, null, 1)}`);
    } else {
        console.log(`\nSUCCESS!!! No failed tests ;D`);
    }
}

runTests(tests);

