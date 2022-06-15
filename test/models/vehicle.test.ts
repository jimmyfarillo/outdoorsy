import { expect } from 'chai';

import {
  IVehicle,
  Vehicle,
  VehicleLengthUnitEnum,
  VehicleTypeEnum,
} from '../../src/models/vehicle';

describe('Vehicle', () => {
  const name = 'SS Mindy';
  const typeName = 'sailboat';
  const length = '15ft';

  it('has name', () => {
    const vehicle: IVehicle = new Vehicle(name, typeName, length);
    expect(vehicle.name).to.eq(name);
  });

  describe('typeName', () => {
    it('has typeName', () => {
      const vehicle: IVehicle = new Vehicle(name, typeName, length);
      expect(vehicle.typeName).to.eq(VehicleTypeEnum.SAILBOAT);
    });

    it('treats provided type as case-insensitive', () => {
      const vehicle: IVehicle = new Vehicle(name, 'SaIlBoAt', length);
      expect(vehicle.typeName).to.eq(VehicleTypeEnum.SAILBOAT);
    });

    it('handles unsupported vehicle type', () => {
      const vehicle: IVehicle = new Vehicle(name, 'automobile', length);
      expect(vehicle.typeName).to.eq('automobile');
    });
  });

  describe('length', () => {
    it('has length quantity', () => {
      const vehicle: IVehicle = new Vehicle(name, typeName, length);
      expect(vehicle.lengthQuantity).to.eq(15);
    });

    it('has length unit', () => {
      const vehicle: IVehicle = new Vehicle(name, typeName, length);
      expect(vehicle.lengthUnit).to.eq(VehicleLengthUnitEnum.FEET);
    });

    it('has length', () => {
      const vehicle: IVehicle = new Vehicle(name, typeName, length);
      expect(vehicle.length).to.eq('15 ft');
    });

    it('handles floats', () => {
      const vehicle: IVehicle = new Vehicle(name, typeName, '12.5ft');
      expect(vehicle.length).to.eq('12.5 ft');
      expect(vehicle.lengthQuantity).to.eq(12.5);
    });

    it('handles multiple feet markings', () => {
      let vehicle: IVehicle = new Vehicle(name, typeName, "15'");
      expect(vehicle.length).to.eq('15 ft');

      vehicle = new Vehicle(name, typeName, '20 feet');
      expect(vehicle.length).to.eq('20 ft');

      vehicle = new Vehicle(name, typeName, '10ft');
      expect(vehicle.length).to.eq('10 ft');

      vehicle = new Vehicle(name, typeName, '1 foot');
      expect(vehicle.length).to.eq('1 ft');
    });

    it('handles multiple meter markings', () => {
      let vehicle: IVehicle = new Vehicle(name, typeName, '15m');
      expect(vehicle.length).to.eq('15 m');

      vehicle = new Vehicle(name, typeName, '20 meters');
      expect(vehicle.length).to.eq('20 m');

      vehicle = new Vehicle(name, typeName, '1 meter');
      expect(vehicle.length).to.eq('1 m');
    });

    it('handles unsupported unit', () => {
      const vehicle: IVehicle = new Vehicle(name, typeName, '15oz');
      expect(vehicle.length).to.eq('15 oz');
      expect(vehicle.lengthUnit).to.eq('oz');
    });

    it('handles no unit', () => {
      const vehicle: IVehicle = new Vehicle(name, typeName, '15');
      expect(vehicle.length).to.eq('15');
      expect(vehicle.lengthUnit).to.eq('');
    });
  });
});
