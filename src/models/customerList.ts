import { Table } from 'console-table-printer';

import { ICustomer } from './customer';

export interface ICustomerList {
  customers: ICustomer[];
  addCustomer: (customer: ICustomer) => void;
  sort: (sortBy?: string, asc?: boolean) => void;
  printTable: () => void;
}

export class CustomerList implements ICustomerList {
  static sortByOptions = {
    CUSTOMER_NAME: 'customerName',
    CUSTOMER_EMAIL: 'customerEmail',
    VEHICLE_TYPE: 'vehicleType',
    VEHICLE_NAME: 'vehicleName',
    VEHICLE_LENGTH: 'vehicleLength',
  };

  customers: ICustomer[];

  constructor() {
    this.customers = [];
  }

  addCustomer(customer: ICustomer): void {
    this.customers.push(customer);
  }

  // Sorts the array of customers based on the column and whether ascending
  // or descending.
  sort(sortBy: string = 'customerName', asc = true): void {
    const comparePropFn = (customer: ICustomer) => {
      if (sortBy === CustomerList.sortByOptions.VEHICLE_TYPE) {
        return customer.vehicle.typeName.toLowerCase();
      }

      if (sortBy === CustomerList.sortByOptions.VEHICLE_NAME) {
        return customer.vehicle.name.toLowerCase();
      }

      if (sortBy === CustomerList.sortByOptions.VEHICLE_LENGTH) {
        // Currently only able to reliably sort by vehicle length when all
        // vehicle lengths use the same unit of measurement.
        return customer.vehicle.lengthQuantity;
      }

      if (sortBy === CustomerList.sortByOptions.CUSTOMER_EMAIL) {
        return customer.email.toLowerCase();
      }

      return customer.fullName.toLowerCase();
    };

    this.customers.sort((customerA: ICustomer, customerB: ICustomer) => {
      const a = comparePropFn(customerA);
      const b = comparePropFn(customerB);

      if (a < b) {
        return asc ? -1 : 1;
      }

      if (a > b) {
        return asc ? 1 : -1;
      }

      return 0;
    });
  }

  // Creates a table of the customer data and prints to STDOUT.
  printTable(): void {
    const table = new Table();

    this.customers.forEach((customer) => {
      table.addRow({
        Name: customer.fullName,
        Email: customer.email,
        'Vehicle Type': customer.vehicle.typeName,
        'Vehicle Name': customer.vehicle.name,
        'Vehicle Length': customer.vehicle.length,
      });
    });

    table.printTable();
  }

}
