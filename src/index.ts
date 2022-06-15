import * as fs from 'fs';
import * as readline from 'readline';

const DEFAULT_HEADERS = [
  'firstName',
  'lastName',
  'email',
  'vehicleType',
  'vehicleName',
  'vehicleLength',
];

const VALID_DELIMITERS = [',', '|'];

type DataObject = { [key: string]: any };

function main(): void {
  const filename: string = process.argv[2];
  const input: fs.ReadStream = fs.createReadStream(filename);
  const rl: readline.Interface = readline.createInterface({ input });
  let delimiter: string;

  rl.on('line', (line: string): void => {
    if (!delimiter) {
      delimiter = determineDelimiter(line);
    }

    const lineData: string[] = line.split(delimiter);
    const rawData: DataObject = objectFromLineData(lineData, DEFAULT_HEADERS);
    console.log(rawData);
  });

  rl.on('close', (): void => {
    process.exit(0);
  });
}

function determineDelimiter(line: string) {
  const delimiter = VALID_DELIMITERS.find((d) => line.includes(d));

  if (!delimiter) {
    throw 'Invalid data file';
  }

  return delimiter;
}

function objectFromLineData(lineData: string[], headers: string[]): DataObject {
  if (lineData.length !== headers.length) {
    throw 'Invalid data file';
  }

  return lineData.reduce((obj, data, i) => {
    return {
      ...obj,
      [headers[i]]: data,
    };
  }, {});
}

main();
