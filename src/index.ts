import * as fs from 'fs';
import * as readline from 'readline';

import * as inquirer from 'inquirer';

import { Customer, ICustomer } from './models/customer';
import { CustomerList, ICustomerList } from './models/customerList';
import { IVehicle, Vehicle } from './models/vehicle';

const DEFAULT_HEADERS = [
  'firstName',
  'lastName',
  'email',
  'vehicleType',
  'vehicleName',
  'vehicleLength',
];

const VALID_DELIMITERS = [',', '|'];

type Answers = {
  filename: string;
  sortBy: string;
};

type RawCustomerData = {
  firstName: string;
  lastName: string;
  email: string;
  vehicleType: string;
  vehicleName: string;
  vehicleLength: string;
};

async function main(): Promise<void> {
  const answers: Answers = await askQuestions();
  const input: fs.ReadStream = fs.createReadStream(answers.filename);
  const rl: readline.Interface = readline.createInterface({ input });

  const customerList: ICustomerList = new CustomerList();
  let delimiter: string;

  rl.on('line', (line: string): void => {
    if (!delimiter) {
      delimiter = getDelimiter(line);
    }

    const lineData: string[] = line.split(delimiter);
    const rawData: RawCustomerData = customerDataFromLineData(lineData);
    const vehicle: IVehicle = new Vehicle(rawData.vehicleName, rawData.vehicleType, rawData.vehicleLength);
    const customer: ICustomer = new Customer(rawData.firstName, rawData.lastName, rawData.email, vehicle);
    customerList.addCustomer(customer);
  });

  rl.on('close', (): void => {
    customerList.sort(answers.sortBy);
    customerList.printTable();
    process.exit(0);
  });
}

function getFilename(args: string[]): string {
  const filename: string = args[2];

  if (!filename.endsWith('.txt')) {
    throw `Filename must end with '.txt': ${filename}`;
  }

  return filename;
}

function getDelimiter(line: string): string {
  const delimiter = VALID_DELIMITERS.find((d) => line.includes(d));

  if (!delimiter) {
    throw 'Valid data delimiter not found';
  }

  return delimiter;
}

function customerDataFromLineData(lineData: string[], headers: string[] = DEFAULT_HEADERS): RawCustomerData {
  if (lineData.length !== headers.length) {
    throw `Invalid data: ${lineData}`;
  }

  return lineData.reduce((obj, data, i) => {
    return {
      ...obj,
      [headers[i]]: data,
    };
  }, {}) as RawCustomerData;
}

async function askQuestions(): Promise<Answers> {
  const questions = [
    {
      name: 'filename',
      type: 'input',
      message: 'What is the full path to the file?',
    },
    {
      type: 'list',
      name: 'sortBy',
      message: 'Sort customers by:',
      choices: [
        { name: 'Customer Name', value: 'customerName' },
        { name: 'Customer Email', value: 'customerEmail' },
        { name: 'Vehicle Type', value: 'vehicleType' },
        { name: 'Vehicle Name', value: 'vehicleName' },
        { name: 'Vehicle Length', value: 'vehicleLength' },
      ],
    },
  ];

  return inquirer.prompt(questions);
};

main();
