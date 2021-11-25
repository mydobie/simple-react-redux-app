/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-ignore

const addVersionToReadMe = () => {
  const path = require('path');
  const fs = require('fs');

  const packageJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8')
  );

  const { version } = packageJson;
  const readMe = fs.readFileSync(path.join(__dirname, '../README.md'), 'utf8');

  const newReadMeArray = readMe.toString().split('\n');
  newReadMeArray[
    newReadMeArray.length - 1
  ] = `Based on template version ${version}`;

  const newReadMe = newReadMeArray.join('\n');

  fs.writeFileSync(path.join(__dirname, '../README.md'), newReadMe);

  process.exitCode = 0;
};

addVersionToReadMe();
