import { expect } from 'chai';

import { Customer, ICustomer } from '../../src/models/customer';
import { IVehicle, Vehicle } from '../../src/models/vehicle';

describe('Customer', () => {
  const firstName = 'Mindy';
  const lastName = 'Kaling';
  const email = 'mkaling@gmail.com';
  const vehicle: IVehicle = new Vehicle('SS Mindy', 'sailboat', '15ft');

  it('has first name', () => {
    const customer: ICustomer = new Customer(firstName, lastName, email, vehicle);
    expect(customer.firstName).to.eq(firstName);
  });

  it('has last name', () => {
    const customer: ICustomer = new Customer(firstName, lastName, email, vehicle);
    expect(customer.lastName).to.eq(lastName);
  });

  it('has email', () => {
    const customer: ICustomer = new Customer(firstName, lastName, email, vehicle);
    expect(customer.email).to.eq(email);
  });

  it('has full name', () => {
    const customer: ICustomer = new Customer(firstName, lastName, email, vehicle);
    expect(customer.fullName).to.eq(`${firstName} ${lastName}`);
  });

  it('has vehicle', () => {
    const customer: ICustomer = new Customer(firstName, lastName, email, vehicle);
    expect(customer.vehicle).to.eq(vehicle);
  });
});
