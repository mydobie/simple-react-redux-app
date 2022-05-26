/* eslint-disable @typescript-eslint/no-var-requires */

const getVersions = () => {
  const path = require('path');
  const fs = require('fs');

  const packagedata = fs.readFileSync('package.json');
  const packageJson = JSON.parse(packagedata);

  const versions = {
    bootstrap: packageJson.dependencies.bootstrap,
    featureFlags: packageJson.dependencies['feature-flags'] || 'not in use',
  };

  fs.writeFileSync(
    path.join(__dirname, '../public/versions.json'),
    JSON.stringify(versions)
  );
};

getVersions();
