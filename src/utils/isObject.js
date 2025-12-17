/**
 * Check if a value is an object.
 * @param {any} value - The value to check.
 * @returns {boolean} True if the value is an object, false otherwise.
 * @module
 * @private
 */
const isObject = value =>
    value !== null && typeof value === 'object' && !Array.isArray(value);

export default isObject;
