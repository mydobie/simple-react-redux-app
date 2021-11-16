/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-ignore

const createArchive = () => {
  const { exec } = require('child_process');
  const fs = require('fs');

  const packagedata = fs.readFileSync('package.json');
  const packageJson = JSON.parse(packagedata);
  const { version /* , name */ } = packageJson;
  // const fileName = `${name.replace('/', '--')}-${version}.tgz`;

  const fileName = `simple-react-redux-app-built-files-${version}.tgz`;

  const archiveDirectory = 'archive/'; // Note, trailing / is required.  set to '' to save at the root of the project

  console.log('Starting archive process.  This can take a while.');

  exec(
    `npm run build && mkdir -p ${archiveDirectory} && cd build && tar --exclude='./__fixtures__' -cvzf ../${archiveDirectory}${fileName} .`,
    (err: string /* , stdout, stderr */) => {
      if (err) {
        // some err occurred
        console.error(`File not created. ERROR:${err}`);
        process.exitCode = 1;
      } else {
        // console.log(`stdout: ${stdout}`);
        // console.log(`stderr: ${stderr}`);
        console.log(`${archiveDirectory}${fileName} created.`);
        process.exitCode = 0;
      }
    }
  );
};

createArchive();

// How to manually un-tar an archive
// tar -zxvf myTar.tgz
