import { VALID_HEADERS } from './validHeaders';
import { VALID_DELIMITERS } from './validDelimiters';

const defaultHeadersSet = new Set(VALID_HEADERS);

export function getDelimiter(line: string): string {
  const delimiter = VALID_DELIMITERS.find((d) => line.includes(d));

  if (!delimiter) {
    throw 'Valid data delimiter not found';
  }

  return delimiter;
}

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
