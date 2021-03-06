import {
  isArray as lodashIsArray,
  isString as lodashIsString,
  isBoolean as lodashIsBoolean,
  isPlainObject as lodashIsPlainObject,
  isFunction as lodashIsFunction,
  isRegExp as lodashIsRegExp
} from 'lodash';

import isProm from 'is-promise';

import { isValid } from './index.js';

/**
 * Validates an array using a validator.
 *
 * @param {function|RegExp} validator - The validator to use on the elements in the array.
 * @return {function} - A function that takes a value and that returns true or false if valid or not.
 */
export function isArray(validator) {
    return (input, info) => {
        if (info) {
            return infoObject(validator, (wrap) => (`[${wrap}]`));
        }

        if (!lodashIsArray(input)) {
            return 'Was not an array!';
        }

        return isArrayOrSingle(validator)(input);
    };
}

/**
 * Validates an object using a validator.
 *
 * @param {function|RegExp} validator - The validator to use on the elements in the object
 * @return {function} - A function that takes a value and that returns true or false if valid or not.
 */
export function isObject(validator) {
    return (input, info) => {
        if (info) {
            return infoObject(validator, (wrap) => `{${wrap}}`);
        }

        if (!lodashIsPlainObject(input)) {
            return 'Was not an object!';
        }

        if (!validator) {
            return true;
        }

        return Object.keys(input).map((key) => isValid(input[key], validator))
            .reduce((a, b) => a === true && b === true, true);
    };
}

/**
 * Validates an pontential array using a validator.
 *
 * Allows that a single value is given.
 *
 * @param {function|RegExp} validator - The validator to use on the elements in the array.
 * @return {function} - A function that takes a value and that returns true or false if valid or not.
 */
export function isArrayOrSingle(validator) {
    return (input, info) => {
        if (info) {
            return infoObject(validator, (wrap) => (`${wrap} / [${wrap}]`));
        }

        const array = [].concat(input);
        for (const value of array) {
            const result = isValid(value, validator);
            if (result !== true) {
                return result;
            }
        }

        return true;
    };
}

/**
 * Validates a promise.
 *
 * @param {object} value - Something to validate.
 * @param {boolean} info - If type information should be returned.
 * @return {infoObject|boolean|string} - Type information or if it is valid.
 */
export function isPromise(value, info) {
    if (info) {
        return infoObject('Promise');
    }

    if (!isProm(value)) {
        return 'Was not a Promise!';
    }

    return true;
}

/**
 * Validates a RegExp.
 *
 * @param {object} value - Something to validate.
 * @param {boolean} info - If type information should be returned.
 * @return {infoObject|boolean|string} - Type information or if it is valid.
 */
export function isRegExp(value, info) {
    if (info) {
        return infoObject('RegExp');
    }

    if (!lodashIsRegExp(value)) {
        return 'Was not a RegExp!';
    }

    return true;
}

/**
 * Validates an string.
 *
 * @param {object} value - Something to validate.
 * @param {boolean} info - If type information should be returned.
 * @return {infoObject|boolean|string} - Type information or if it is valid.
 */
export function isString(value, info) {
    if (info) {
        return infoObject('String');
    }

    if (!lodashIsString(value)) {
        return 'Was not a string!';
    }

    return true;
}

/**
 * Validates an boolean.
 *
 * @param {object} value - Something to validate.
 * @param {boolean} info - If type information should be returned.
 * @return {infoObject|boolean|string} - Type information or if it is valid.
 */
export function isBoolean(value, info) {
    if (info) {
        return infoObject('Boolean');
    }

    if (value !== null && !lodashIsBoolean(value)) {
        return 'Was not a boolean!';
    }

    return true;
}

/**
 * Validates an integer.
 *
 * @param {object} value - Something to validate.
 * @param {boolean} info - If type information should be returned.
 * @return {infoObject|boolean|string} - Type information or if it is valid.
 */
export function isInteger(value, info) {
    if (info) {
        return infoObject('Integer');
    }

    if (!Number.isInteger(value)) {
        return 'Was not an integer!';
    }

    return true;
}

/**
 * Validates an path.
 *
 * @param {object} value - Something to validate.
 * @param {boolean} info - If type information should be returned.
 * @return {infoObject|boolean|string} - Type information or if it is valid.
 */
export function isPath(value, info) {
    if (info) {
        return infoObject('Filepath');
    }

    if (isString(value) !== true) {
        return 'Was not a filepath!';
    }

    return true;
}

/**
 * Validates an function.
 *
 * @param {object} value - Something to validate.
 * @param {boolean} info - If type information should be returned.
 * @return {infoObject|boolean|string} - Type information or if it is valid.
 */
export function isFunction(value, info) {
    if (info) {
        return infoObject('Function');
    }

    if (value !== null && !lodashIsFunction(value)) {
        return 'Was not a function!';
    }

    return true;
}

/**
 * Validates against a list of validators.
 *
 * @param {...function} validators - Validators to validate against.
 * @return {function} - A function that takes a value and that returns true or false if valid or not.
 */
export function oneOf(...validators) {
    if (!validators.length) {
        throw new Error('You need to use at least one validator.');
    }

    return (input, info) => {
        if (info) {
            let types = [];
            for (const validator of validators) {
                types.push(infoObject(validator).type);
            }
            return infoObject(types.join(' / '));
        }

        const invalid = [];
        for (const validator of validators) {
            const result = isValid(input, validator);
            if (result === true) {
                return true;
            }
            invalid.push(validator(null, true).type);
        }

        return 'Was not any of the possible types:\n' +
            invalid.reduce((prev, next) => prev + '\n' + next, '');
    };
}

/**
 * Marks that the value is required
 *
 * @param {function} validator - Validator to validate against
 * @return {function} - A function that takes a value and that returns true or false if valid or not.
 */
export function required(validator) {
    return (input, info) => {
        if (info) {
            return infoObject(validator, null, true);
        }

        if (
            !input && input !== false ||
            (lodashIsArray(input) || lodashIsString(input)) && input.length === 0 ||
            lodashIsPlainObject(input) && Object.keys(input).length === 0
        ) {
            return 'A value was required but none was given!';
        }

        if (!validator) {
            return true;
        }

        return validator(input);
    };
}

export function infoObject(validator = () => ({type: ''}), wrapper, req = false) {
    const info = lodashIsFunction(validator) ? validator(null, true).type : validator.toString();
    const type = wrapper ? wrapper(info) : info;
    return {
        type,
        required: req
    };
}
