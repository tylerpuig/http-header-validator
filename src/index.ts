/**
 * Thanks to https://github.com/SVasilev (https://github.com/SVasilev/http-headers-validation)
 * for the inspiration for this validator.
 * Performance improvements have made it about
 * 20x faster than the original.
 */

export type HTTPHeaderValidator = {
  validateHeaderKey: (headerKey: string) => boolean;
  validateHeaderValue: (headerValue: string) => boolean;
  validateHeader: (headerKey: string, headerValue: string) => boolean;
};

const validHeaderKeyCharCodes = new Set<number>([
  ...range(48, 58), // 0-9
  ...range(65, 91), // A-Z
  ...range(97, 123), // a-z
  94,
  95,
  96,
  124,
  126, // ^, _, `, |, ~
  33,
  35,
  36,
  37,
  38,
  39,
  42,
  43,
  45,
  46, // !, #, $, %, &, ', *, +, -, .
]);

/**
 * The HTTP header validator API.
 */
const httpHeaderValidator: HTTPHeaderValidator = {
  /**
   * Validates an HTTP header key.
   * @param {string} headerKey - The header key to validate.
   * @returns {boolean} True if the header key is valid, otherwise false.
   */
  validateHeaderKey(headerKey: string): boolean {
    if (invalidTypeOrLength(headerKey)) {
      return false;
    }

    for (let i = 0; i < headerKey.length; i++) {
      const charCode = headerKey.charCodeAt(i);
      if (!validHeaderKeyCharCodes.has(charCode)) {
        return false;
      }
    }

    return true;
  },

  /**
   * Validates an HTTP header value.
   * @param {string} headerValue - The header value to validate.
   * @returns {boolean} True if the header value is valid, otherwise false.
   */
  validateHeaderValue(headerValue: string): boolean {
    if (invalidTypeOrLength(headerValue)) {
      return false;
    }

    for (let i = 0; i < headerValue.length; i++) {
      const charCode = headerValue.charCodeAt(i);
      if (
        !(
          (charCode > 31 && charCode <= 255 && charCode !== 127) ||
          charCode === 9
        )
      ) {
        return false;
      }
    }
    return true;
  },

  /**
   * Validates both an HTTP header key and value.
   * @param {string} headerKey - The header key to validate.
   * @param {string} headerValue - The header value to validate.
   * @returns {boolean} True if both the header key and value are valid, otherwise false.
   */
  validateHeader(headerKey: string, headerValue: string): boolean {
    if (invalidTypeOrLength(headerKey) || invalidTypeOrLength(headerValue)) {
      return false;
    }

    return (
      this.validateHeaderKey(headerKey) && this.validateHeaderValue(headerValue)
    );
  },
};

// Helper functions
function isString(value: string): value is string {
  return typeof value === "string";
}

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start }, (_, i) => i + start);
}

function invalidTypeOrLength(value: string): boolean {
  return !isString(value) || value.length === 0;
}

export default httpHeaderValidator;
