export enum VehicleLengthUnitEnum {
  FEET = 'ft',
  METERS = 'm',
}

const VEHICLE_LENGTH_UNIT_MAP = new Map([
  ["'", VehicleLengthUnitEnum.FEET],
  ["’", VehicleLengthUnitEnum.FEET],
  ['feet', VehicleLengthUnitEnum.FEET],
  ['foot', VehicleLengthUnitEnum.FEET],
  ['ft', VehicleLengthUnitEnum.FEET],
  ['m', VehicleLengthUnitEnum.METERS],
  ['meters', VehicleLengthUnitEnum.METERS],
  ['meter', VehicleLengthUnitEnum.METERS],
]);

export enum VehicleTypeEnum {
  BICYCLE = 'bicycle',
  CAMPERVAN = 'campervan',
  MOTORBOAT = 'motorboat',
  RV = 'RV',
  SAILBOAT = 'sailboat',
}

const VEHICLE_TYPE_MAP = new Map([
  ['bicycle', VehicleTypeEnum.BICYCLE],
  ['campervan', VehicleTypeEnum.CAMPERVAN],
  ['motorboat', VehicleTypeEnum.MOTORBOAT],
  ['rv', VehicleTypeEnum.RV],
  ['sailboat', VehicleTypeEnum.SAILBOAT],
]);

export interface IVehicle {
  name: string;
  typeName: string;
  length: string;
  lengthQuantity: number;
  lengthUnit: string;
}

export class Vehicle implements IVehicle {
  name: string;
  typeName: string;
  lengthQuantity: number;
  lengthUnit: string;

  constructor(name: string, typeName: string, lengthString: string) {
    this.name = name;
    this.typeName = VEHICLE_TYPE_MAP.get(typeName.toLowerCase()) || typeName;
    this.lengthQuantity = this.parseLengthQuantity(lengthString);
    this.lengthUnit = this.parseLengthUnit(lengthString);
  }

  get length() {
    return `${this.lengthQuantity}${this.lengthUnit ? ` ${this.lengthUnit}` : ''}`;
  }

  // Parses and returns the length number from the length string. Supports
  // integers and floats.
  private parseLengthQuantity(lengthString: string): number {
    return Number.parseFloat(lengthString);
  }

  // Parse and returns the length unit from the length string. If the unit
  // marking is not supported, retains the original unit marking. If no unit
  // marking is present, return and empty string.
  private parseLengthUnit(lengthString: string): string {
    const unitRegex = /[^\d\s\.]+/;
    const unitMatch = lengthString.match(unitRegex);
    const unit = unitMatch ? unitMatch[0] : '';
    return VEHICLE_LENGTH_UNIT_MAP.get(unit) || unit;
  }
}
