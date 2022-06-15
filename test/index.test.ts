import { spawn, spawnSync } from 'child_process';

import { expect } from 'chai';

// These tests call the main script with extra command line arguments that
// cause the script to not enter interactive mode.
describe('Main function', () => {
  it('prints the customer data for comma-delimited files', function (done) {
    this.timeout(10000);

    spawnSync('tsc');
    const scriptRun = spawn(
      'node',
      [
        './dist/index.js',
        '-f',
        './test/data/commas.txt',
        '-h',
        'n',
        '-s',
        'customerName',
      ],
    );

    let table = '';

    scriptRun.stdout.on('data', (data) => {
      table += data;
    });

    scriptRun.on('close', () => {
      expect(table).to.include('Greta Thunberg');
      expect(table).to.include('greta@future.com');
      expect(table).to.include('sailboat');
      expect(table).to.include('Fridays For Future');
      expect(table).to.include('32 ft');
      expect(table).to.include('Xiuhtezcatl Martinez');
      expect(table).to.include('martinez@earthguardian.org');
      expect(table).to.include('campervan');
      expect(table).to.include('Earth Guardian');
      expect(table).to.include('28 ft');
      expect(table).to.include('Mandip Singh Soin');
      expect(table).to.include('mandip@ecotourism.net');
      expect(table).to.include('motorboat');
      expect(table).to.include('Frozen Trekker');
      expect(table).to.include('32 ft');
      expect(table).to.include('Jimmy Buffet');
      expect(table).to.include('jb@sailor.com');
      expect(table).to.include('sailboat');
      expect(table).to.include('Margaritaville');
      expect(table).to.include('40 ft');
      done();
    });
  });

  it('prints the customer data for pipe-delimited files', function (done) {
    this.timeout(10000);

    spawnSync('tsc');
    const scriptRun = spawn('node', ['./dist/index.js', '-f', './test/data/pipes.txt', '-h', 'n', '-s', 'customerName']);

    let table = '';

    scriptRun.stdout.on('data', (data) => {
      table += data;
    });

    scriptRun.on('close', () => {
      expect(table).to.include('Ansel Adams');
      expect(table).to.include('a@adams.com');
      expect(table).to.include('motorboat');
      expect(table).to.include('Rushing Water');
      expect(table).to.include('24 ft');
      expect(table).to.include('Steve Irwin');
      expect(table).to.include('steve@crocodiles.com');
      expect(table).to.include('RV');
      expect(table).to.include('G’Day For Adventure');
      expect(table).to.include('32 ft');
      expect(table).to.include('Isatou Ceesay');
      expect(table).to.include('isatou@recycle.com');
      expect(table).to.include('campervan');
      expect(table).to.include('Plastic To Purses');
      expect(table).to.include('20 ft');
      expect(table).to.include('Naomi Uemura');
      expect(table).to.include('n.uemura@gmail.com');
      expect(table).to.include('bicycle');
      expect(table).to.include('Glacier Glider');
      expect(table).to.include('5 ft');
      done();
    });
  });

  it('prints the customer data for files with headers', function (done) {
    this.timeout(10000);

    spawnSync('tsc');
    const scriptRun = spawn(
      'node',
      [
        './dist/index.js',
        '-f',
        './test/data/with-headers.txt',
        '-h',
        'y',
        '-s',
        'customerName',
      ],
    );

    let table = '';

    scriptRun.stdout.on('data', (data) => {
      table += data;
    });

    scriptRun.on('close', () => {
      expect(table).to.include('Greta Thunberg');
      expect(table).to.include('greta@future.com');
      expect(table).to.include('sailboat');
      expect(table).to.include('Fridays For Future');
      expect(table).to.include('32 ft');
      expect(table).to.include('Xiuhtezcatl Martinez');
      expect(table).to.include('martinez@earthguardian.org');
      expect(table).to.include('campervan');
      expect(table).to.include('Earth Guardian');
      expect(table).to.include('28 ft');
      done();
    });
  });

  it('exits with success code for valid files', function(done) {
    this.timeout(10000);

    spawnSync('tsc');
    const scriptRun = spawn('node', ['./dist/index.js', '-f', './test/data/pipes.txt', '-h', 'n', '-s', 'customerName']);

    scriptRun.on('close', (exitCode) => {
      expect(exitCode).to.eq(0);
      done();
    });
  });

  it('exits with error code for files with mixed delimiters', function (done) {
    this.timeout(10000);

    spawnSync('tsc');
    const scriptRun = spawn('node', ['./dist/index.js', '-f', './test/data/mixed.txt', '-h', 'n', '-s', 'customerName']);

    scriptRun.on('close', (exitCode) => {
      expect(exitCode).to.eq(1);
      done();
    });
  });

  it('exits with error code for files with an invalid row', function (done) {
    this.timeout(10000);

    spawnSync('tsc');
    const scriptRun = spawn('node', ['./dist/index.js', '-f', './test/data/invalid-line.txt', '-h', 'n', '-s', 'customerName']);

    scriptRun.on('close', (exitCode) => {
      expect(exitCode).to.eq(1);
      done();
    });
  });
});
