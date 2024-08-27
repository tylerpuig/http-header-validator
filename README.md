# HTTP Header Validator

[![npm version](https://badge.fury.io/js/http-header-validator.svg)](https://badge.fury.io/js/http-header-validator)

HTTP Header Validator is a lightweight, high-performance library for validating HTTP header keys and values as defined in [RFC 7230, Section 3.2.6](https://datatracker.ietf.org/doc/html/rfc7230#section-3.2.6).

## Installation

```bash
npm install http-header-validator
```

## Usage

This package is available for both ESM and CJS.

```javascript
// ESM
import httpHeaderValidator from "http-header-validator";

// CJS
const httpHeaderValidator = require("http-header-validator");

const isValidKey = httpHeaderValidator.validateHeaderKey("Accept");
const isValidValue =
  httpHeaderValidator.validateHeaderValue("application/json");
const isValidHeader = httpHeaderValidator.validateHeader(
  "Accept",
  "application/json"
);

console.log(isValidKey); // true
console.log(isValidValue); // true
console.log(isValidHeader); // true
```

## API

### `validateHeaderKey(headerKey: string): boolean`

Validates an HTTP header key.

- **headerKey**: The header key to validate.
- **Returns**: `true` if the header key is valid, otherwise `false`.

### `validateHeaderValue(headerValue: string): boolean`

Validates an HTTP header value.

- **headerValue**: The header value to validate.
- **Returns**: `true` if the header value is valid, otherwise `false`.

### `validateHeader(headerKey: string, headerValue: string): boolean`

Validates both an HTTP header key and value.

- **headerKey**: The header key to validate.
- **headerValue**: The header value to validate.
- **Returns**: `true` if both the header key and value are valid, otherwise `false`.
