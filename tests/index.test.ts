import httpHeaderValidator from "../src/index";

const headerKeyTests: { input: string; expectedOutput: boolean }[] = [
  {
    input: "Cache-Control",
    expectedOutput: true,
  },
  {
    input: "Cookie",
    expectedOutput: true,
  },
  {
    input: "Host",
    expectedOutput: true,
  },
  {
    input: "Content-Type",
    expectedOutput: true,
  },
  // More obscure keys
  {
    input: "If-Unmodified-Since",
    expectedOutput: true,
  },
  {
    input: "TE",
    expectedOutput: true,
  },
  {
    input: "Proxy-Authenticate",
    expectedOutput: true,
  },
  {
    input: "Strict-Transport-Security",
    expectedOutput: true,
  },
  // Invalid keys
  {
    input: "Front-End-[]",
    expectedOutput: false,
  },
  {
    input: "My-Invalid-Header-;",
    expectedOutput: false,
  },
  {
    input: "X-Forwarded-\\",
    expectedOutput: false,
  },
  {
    input: "(X,N)",
    expectedOutput: false,
  },
  // Custom keys
  {
    input: "Front-End-Https",
    expectedOutput: true,
  },
  {
    input: "X-Csrf-Token",
    expectedOutput: true,
  },
  {
    input: "X-Forwarded-Host",
    expectedOutput: true,
  },
  {
    input: "My-Custom-Header-05^_`|~!#$%&'*+-.",
    expectedOutput: true,
  },
];

const headerValueTests: { input: string; expectedOutput: boolean }[] = [
  {
    input: "public, max-age=2000",
    expectedOutput: true,
  },
  {
    input: "Secure",
    expectedOutput: true,
  },
  {
    input: "localhost",
    expectedOutput: true,
  },
  {
    input: "application/json",
    expectedOutput: true,
  },
  // More obscure values
  {
    input: "valueWithTabulation\t",
    expectedOutput: true,
  },
  {
    input: "-05:00",
    expectedOutput: true,
  },
  {
    input: "VQcFUFFRCBABUFhaAwQOVw==",
    expectedOutput: true,
  },
  {
    input: "okhttp/2.5.0",
    expectedOutput: true,
  },
  // Invalid values
  {
    input: "",
    expectedOutput: false,
  },
  {
    input: "\n\b",
    expectedOutput: false,
  },
  {
    input: "⌂",
    expectedOutput: false,
  },
  {
    input: "withˆ",
    expectedOutput: false,
  },
];

const headerKeyValuePairTests: {
  input: { key: any; value: any };
  expectedOutput: boolean;
}[] = [
  {
    input: { key: "Accept", value: "application/json" },
    expectedOutput: true,
  },
  {
    input: { key: "Accept-Charset", value: "utf-8" },
    expectedOutput: true,
  },
  {
    input: { key: "Accept-Encoding", value: "gzip" },
    expectedOutput: true,
  },
  {
    input: { key: null, value: "gzip" },
    expectedOutput: false,
  },
  {
    input: { key: "Accept", value: null },
    expectedOutput: false,
  },
  {
    input: { key: "Cookie", value: "" },
    expectedOutput: false,
  },
];

const incorrectInputTests: { input: any; expectedOutput: boolean }[] = [
  {
    input: {},
    expectedOutput: false,
  },
  {
    input: null,
    expectedOutput: false,
  },
  {
    input: undefined,
    expectedOutput: false,
  },
  {
    input: 3,
    expectedOutput: false,
  },
  {
    input: [],
    expectedOutput: false,
  },
];

test.each(headerKeyTests)(
  'should validate header key "%s"',
  ({ input, expectedOutput }) => {
    expect(httpHeaderValidator.validateHeaderKey(input)).toBe(expectedOutput);
  }
);

test.each(headerValueTests)(
  'should validate header value "%s"',
  ({ input, expectedOutput }) => {
    expect(httpHeaderValidator.validateHeaderValue(input)).toBe(expectedOutput);
  }
);

test.each(headerKeyValuePairTests)(
  'should validate header key value pair "%s"',
  ({ input, expectedOutput }) => {
    expect(httpHeaderValidator.validateHeader(input.key, input.value)).toBe(
      expectedOutput
    );
  }
);

test.each(incorrectInputTests)(
  'should not validate incorrect input "%s"',
  ({ input, expectedOutput }) => {
    expect(httpHeaderValidator.validateHeaderKey(input)).toBe(expectedOutput);
  }
);

test.each(incorrectInputTests)(
  'should not validate incorrect input "%s"',
  ({ input, expectedOutput }) => {
    expect(httpHeaderValidator.validateHeaderValue(input)).toBe(expectedOutput);
  }
);
