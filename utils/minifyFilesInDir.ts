/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-ignore

const minifyFilesInDir = () => {
  const distFolder = './lib/';
  const fs = require('fs');
  const { exec } = require('child_process');

  fs.readdirSync(distFolder).forEach((file: string) => {
    const regExp = /.*\.jsx?$/gim;
    if (regExp.test(file)) {
      exec(
        `npm run uglify -- ${distFolder}${file} -o ${distFolder}${file}`,
        (error: string, stdout: string, stderr: string) => {
          if (!error && !stderr) {
            console.log('Minifying ', file);
          } else {
            console.log('ERROR minifying ', file, stderr);
          }
        }
      );
    }
  });
};

minifyFilesInDir();
