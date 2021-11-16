/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-ignore

const getVersions = () => {
  const path = require('path');
  const fs = require('fs');

  const packagedata = fs.readFileSync('package.json');
  const packageJson = JSON.parse(packagedata);

  const versions = {
    bootstrap: packageJson.dependencies.bootstrap,
    hello: 'world',
    featureFlags: packageJson.dependencies['feature-flags'],
  };

  fs.writeFileSync(
    path.join(__dirname, '../public/versions.json'),
    JSON.stringify(versions)
  );
};

getVersions();
