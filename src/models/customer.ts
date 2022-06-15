import { IVehicle } from './vehicle';

export interface ICustomer {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  vehicle: IVehicle;
}

export class Customer implements ICustomer {
  firstName: string;
  lastName: string;
  email: string;
  vehicle: IVehicle;

  constructor(firstName: string, lastName: string, email: string, vehicle: IVehicle) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.vehicle = vehicle;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
