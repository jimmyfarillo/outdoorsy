import { VALID_HEADERS } from './validHeaders';
import { VALID_DELIMITERS } from './validDelimiters';

const defaultHeadersSet = new Set(VALID_HEADERS);

// Takes a string and returns the first supported delimiter found. Throws an
// exception if a supported delimiter is not found.
export function getDelimiter(line: string): string {
  const delimiter = VALID_DELIMITERS.find((d) => line.includes(d));

  if (!delimiter) {
    throw 'Valid data delimiter not found';
  }

  return delimiter;
}

// Takes an array of headers and an array of data and zips them into an object.
export function objectFromLine(
  headers: string[],
  lineData: string[],
): { [key: string]: any } {
  if (lineData.length !== headers.length) {
    throw `Invalid data: ${lineData}`;
  }

  return lineData.reduce((obj, data, i) => {
    if (!defaultHeadersSet.has(headers[i])) {
      return obj;
    }

    return {
      ...obj,
      [headers[i]]: data,
    };
  }, {});
}

// Takes an array of headers and throws if the headers do not contain all of
// the valid headers.
export function validateHeaders(headers: string[]): void {
  const headersSet = new Set(headers);

  if (defaultHeadersSet.size > headersSet.size) {
    throw 'Invalid headers';
  }

  for (const header of defaultHeadersSet) {
    if (!headersSet.has(header)) {
      throw 'Invalid headers';
    }
  }
}
