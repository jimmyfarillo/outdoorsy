import { expect } from 'chai';
import * as sinon from 'sinon';

import { Customer, ICustomer } from '../../src/models/customer';
import { CustomerList, ICustomerList } from '../../src/models/customerList';
import { IVehicle, Vehicle } from '../../src/models/vehicle';

describe('CustomerList', () => {
  const vehicle1: IVehicle = new Vehicle('SS Mindy', 'motorboat', '15ft');
  const customer1: ICustomer = new Customer('Mindy', 'Kaling', 'mkaling@gmail.com', vehicle1);
  const vehicle2: IVehicle = new Vehicle('SS Issa', 'sailboat', '20 feet');
  const customer2: ICustomer = new Customer('Issa', 'Rae', 'irae@gmail.com', vehicle2);

  it('initializes empty customers', () => {
    const customerList: ICustomerList = new CustomerList();
    expect(customerList.customers).to.deep.equal([]);
  });

  describe('#addCustomer', () => {
    it('adds customer', () => {
      const customerList: ICustomerList = new CustomerList();

      customerList.addCustomer(customer1);
      expect(customerList.customers).to.have.lengthOf(1);
      expect(customerList.customers[0]).to.eq(customer1);

      customerList.addCustomer(customer2);
      expect(customerList.customers).to.have.lengthOf(2);
      expect(customerList.customers[1]).to.eq(customer2);
    });
  });

  describe('#sort', () => {
    let customerList: ICustomerList;

    beforeEach(() => {
      customerList = new CustomerList();
      customerList.addCustomer(customer1);
      customerList.addCustomer(customer2);
    });

    it('default sorts by customer name ascending', () => {
      customerList.sort();

      expect(customerList.customers[0]).to.eq(customer2);
      expect(customerList.customers[1]).to.eq(customer1);
    });

    it('can sort by customer name descending', () => {
      customerList.sort('customerName', false);

      expect(customerList.customers[0]).to.eq(customer1);
      expect(customerList.customers[1]).to.eq(customer2);
    });

    it('can sort by vehicle type', () => {
      customerList.sort('vehicleType');

      expect(customerList.customers[0]).to.eq(customer1);
      expect(customerList.customers[1]).to.eq(customer2);

      customerList.sort('vehicleType', false);

      expect(customerList.customers[0]).to.eq(customer2);
      expect(customerList.customers[1]).to.eq(customer1);
    });

    it('can sort by vehicle name', () => {
      customerList.sort('vehicleName');

      expect(customerList.customers[0]).to.eq(customer2);
      expect(customerList.customers[1]).to.eq(customer1);

      customerList.sort('vehicleName', false);

      expect(customerList.customers[0]).to.eq(customer1);
      expect(customerList.customers[1]).to.eq(customer2);
    });

    it('can sort by vehicle length (when all vehicles use same unit of measurement)', () => {
      customerList.sort('vehicleLength');

      expect(customerList.customers[0]).to.eq(customer1);
      expect(customerList.customers[1]).to.eq(customer2);

      customerList.sort('vehicleLength', false);

      expect(customerList.customers[0]).to.eq(customer2);
      expect(customerList.customers[1]).to.eq(customer1);
    });
  });

  describe('#printTable', () => {
    const consoleLog = console.log;

    before(() => {
      console.log = () => null;
    });

    after(() => {
      console.log = consoleLog;
    });

    // This test only asserts that the console.log function was called but does
    // not assert the contents that were printed.
    it('prints a table of all customers', () => {
      const customerList: ICustomerList = new CustomerList();
      customerList.addCustomer(customer1);
      customerList.addCustomer(customer2);

      const spy = sinon.spy(console, 'log');
      customerList.printTable();

      expect(spy.called).to.be.true;
    });
  });
});
