import * as fs from 'fs';
import * as readline from 'readline';

import * as inquirer from 'inquirer';

import { Customer, ICustomer } from './models/customer';
import { CustomerList, ICustomerList } from './models/customerList';
import { IVehicle, Vehicle } from './models/vehicle';
import { VALID_HEADERS } from './validHeaders';

import {
  getDelimiter,
  objectFromLine,
  validateHeaders,
} from './utils';

type Answers = {
  filename: string;
  includesHeaders: boolean;
  sortBy: string;
  sortOrder: string;
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
  try {
    let answers: Answers;

    if (process.argv.length > 2) {
      const filenameIndex = process.argv.indexOf('-f') + 1;
      const includesHeadersIndex = process.argv.indexOf('-h') + 1;
      const sortByIndex = process.argv.indexOf('-s') + 1;

      const filename = process.argv[filenameIndex];
      const includesHeaders = process.argv[includesHeadersIndex].toLowerCase() === 'y' ? true : false;
      const sortBy = process.argv[sortByIndex] || CustomerList.sortByOptions.CUSTOMER_NAME;

      answers = {
        filename,
        includesHeaders,
        sortBy,
        sortOrder: 'asc',
      } as Answers;
    } else {
      answers = await askQuestions();
    }

    const input: fs.ReadStream = fs.createReadStream(answers.filename);
    const rl: readline.Interface = readline.createInterface({ input });

    const customerList: ICustomerList = new CustomerList();
    let headers: string[] | null = !answers.includesHeaders ? VALID_HEADERS : null;
    let delimiter: string;

    rl.on('line', (line: string): void => {
      if (!delimiter) {
        delimiter = getDelimiter(line);
      }

      const lineData: string[] = line.split(delimiter);

      if (!headers) {
        headers = lineData;
        validateHeaders(headers);
        return;
      }

      const rawData: RawCustomerData = objectFromLine(headers, lineData) as RawCustomerData;
      const vehicle: IVehicle = new Vehicle(rawData.vehicleName, rawData.vehicleType, rawData.vehicleLength);
      const customer: ICustomer = new Customer(rawData.firstName, rawData.lastName, rawData.email, vehicle);
      customerList.addCustomer(customer);
    });

    rl.on('close', (): void => {
      customerList.sort(answers.sortBy, answers.sortOrder === 'asc');
      customerList.printTable();
      process.exit(0);
    });
  } catch(_e) {
    process.exit(1);
  }
}


async function askQuestions(): Promise<Answers> {
  const questions = [
    {
      type: 'input',
      name: 'filename',
      message: 'What is the full path to the file?',
      validate: (filename: string): boolean | string => {
        if (fs.existsSync(filename)) {
          return true;
        }

        return 'Invalid filename';
      },
    },
    {
      type: 'confirm',
      name: 'includesHeaders',
      message: 'Is the first line of the file the headers?',
      default: false,
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
    {
      type: 'list',
      name: 'sortOrder',
      message: 'Sort ascending or descending:',
      choices: [
        { name: 'Ascending', value: 'asc' },
        { name: 'Descending', value: 'desc' },
      ],
    },
  ];

  return inquirer.prompt(questions);
};

main();
