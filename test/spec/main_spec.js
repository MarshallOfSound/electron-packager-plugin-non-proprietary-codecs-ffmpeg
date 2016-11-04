import chai from 'chai';
import fs from 'fs';
import packager from 'electron-packager';
import safeFFMPEG from '../../';

chai.should();

const defaultPackageConf = {
  afterExtract: [safeFFMPEG],
  arch: 'x64',
  dir: '.',
  name: 'test-app',
  out: './test-out/',
  overwrite: true,
  version: '1.2.6',
};

const testPlatform = (platform) =>
  describe(`When using the hook on ${platform}`, () => {
    before((done) => {
      packager(Object.assign({}, defaultPackageConf, { platform }), done);
    });

    it('the packager should complete successfully', () => {
      fs.existsSync(`./test-out/test-app-${platform}-x64`).should.be.true;
    });
  });

testPlatform('linux');
testPlatform('darwin');
if (process.platform === 'win32') {
  testPlatform('win32');
}
