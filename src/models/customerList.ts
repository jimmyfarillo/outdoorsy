import { Table } from 'console-table-printer';

import { ICustomer } from './customer';

export interface ICustomerList {
  customers: ICustomer[];
  addCustomer: (customer: ICustomer) => void;
  sort: (sortBy?: string, asc?: boolean) => void;
  printTable: () => void;
}

export class CustomerList implements ICustomerList {
  customers: ICustomer[];

  constructor() {
    this.customers = [];
  }

  addCustomer(customer: ICustomer): void {
    this.customers.push(customer);
  }

  sort(sortBy: string = 'customerName', asc = true): void {
    const comparePropFn = (customer: ICustomer) => {
      if (sortBy === 'vehicleType') {
        return customer.vehicle.typeName.toLowerCase();
      } else if (sortBy === 'vehicleName') {
        return customer.vehicle.name.toLowerCase();
      } else if (sortBy === 'vehicleLength') {
        // Currently only able to reliably sort by vehicle length when all
        // vehicle lengths use the same unit of measurement.
        return customer.vehicle.lengthQuantity;
      } else if (sortBy === 'customerEmail') {
        return customer.email.toLowerCase();
      } else {
        return customer.fullName.toLowerCase();
      }
    };

    this.customers.sort((customerA: ICustomer, customerB: ICustomer) => {
      const a = comparePropFn(customerA);
      const b = comparePropFn(customerB);

      if (a < b) {
        return asc ? -1 : 1;
      } else if (a > b) {
        return asc ? 1 : -1;
      }

      return 0;
    });
  }

  printTable(): void {
    const table = new Table();

    for (const customer of this.customers) {
      table.addRow({
        'Name': customer.fullName,
        'Email': customer.email,
        'Vehicle Type': customer.vehicle.typeName,
        'Vehicle Name': customer.vehicle.name,
        'Vehicle Length': customer.vehicle.length,
      });
    }

    table.printTable();
  }

}
