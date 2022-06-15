import { expect } from 'chai';

import {
  getDelimiter,
  objectFromLine,
  validateHeaders,
} from '../src/utils';

describe('utils', () => {
  describe('getDelimiter', () => {
    it('returns the delimiter of a line if the delimiter is supported', () => {
      let delimiter = getDelimiter('first,second,third');
      expect(delimiter).to.eq(',');

      delimiter = getDelimiter('first|second|third');
      expect(delimiter).to.eq('|');
    });

    it('throws if a supported delimiter is not found', () => {
      const fn = () => getDelimiter('first>second>third');
      expect(fn).to.throw('Valid data delimiter not found');
    });
  });

  describe('objectFromLine', () => {
    it('returns an object of the headers as keys and the line data as values', () => {
      const obj = objectFromLine(
        ['firstName', 'lastName', 'email'],
        ['Mindy', 'Kaling', 'mkaling@gmail.com'],
      );

      expect(obj).to.deep.equal({
        firstName: 'Mindy',
        lastName: 'Kaling',
        email: 'mkaling@gmail.com',
      });
    });

    it('only includes data for headers that are valid headers', () => {
      const obj = objectFromLine(
        ['firstName', 'lastName', 'email', 'occupation'],
        ['Mindy', 'Kaling', 'mkaling@gmail.com', 'writer'],
      );

      expect(obj).to.deep.equal({
        firstName: 'Mindy',
        lastName: 'Kaling',
        email: 'mkaling@gmail.com',
      });
    });

    it('throws if the headers and data arrays are not of the same length', () => {
      const fn = () => {
        objectFromLine(['firstName'], ['Mindy', 'Kaling']);
      };

      expect(fn).to.throw('Invalid data: Mindy');
    });
  });

  describe('validateHeaders', () => {
    it('does not throw if headers are valid', () => {
      const headers = [
        'email',
        'vehicleLength',
        'firstName',
        'vehicleType',
        'lastName',
        'vehicleName',
      ];

      const fn = () => validateHeaders(headers);
      expect(fn).not.to.throw();
    });

    it('does not throw if an extra header is provided', () => {
      const headers = [
        'email',
        'vehicleLength',
        'firstName',
        'vehicleType',
        'extraHeader',
        'lastName',
        'vehicleName',
      ];

      const fn = () => validateHeaders(headers);
      expect(fn).not.to.throw();
    });

    it('throws if a header is missing', () => {
      const headers = [
        'email',
        'vehicleLength',
        'firstName',
        'lastName',
        'vehicleName',
      ];

      const fn = () => validateHeaders(headers);
      expect(fn).to.throw('Invalid headers');
    });
  });
});
