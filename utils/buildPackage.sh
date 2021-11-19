# This builds the application and gets it ready to be packaged as an NPM package
distFolder=lib #IF this changes ... also change minifyFilesInDir.js and restPackageJson.js

NODE_ENV=production
rm -rf $distFolder
# mkdir $distFolder
npm run buildts
node utils/resetPackageJson.ts
node utils/minifyFilesInDir.ts

npm pack ./$distFolder