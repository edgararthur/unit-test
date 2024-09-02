const path = require("path");
const fs = require("fs");

const SCRIPTFILE_TAG = "metro-extend";

function getSymLinkDependencyList() {
  const filepathPackageJson = path.join(__dirname, "package.json");
  const strPackageJson = fs.readFileSync(filepathPackageJson);
  const jsonPackage = JSON.parse(strPackageJson);

  const listObjDep = [];

  const setSymLinkDep = new Set();

  if (jsonPackage.dependencies) {
    listObjDep.push(jsonPackage.dependencies);
  }
  if (jsonPackage.devDependencies) {
    listObjDep.push(jsonPackage.devDependencies);
  }

  for (const objDep of listObjDep) {
    for (const libName in objDep) {
      const libVer = objDep[libName];
      if (libVer.startsWith("file:")) {
        setSymLinkDep.add(libName);
      }
    }
  }

  return [...setSymLinkDep];
}

function supportSymLinkedModule(config) {
  const TAG = "supportSymLinkedModule";

  const listSymLinkDep = getSymLinkDependencyList();

  if (!config.resolver) {
    config.resolver = {};
  }
  if (!config.resolver.extraNodeModules) {
    config.resolver.extraNodeModules = {};
  }
  if (!config.resolver.nodeModulesPaths) {
    config.resolver.nodeModulesPaths = [];
  }
  if (!config.watchFolders) {
    config.watchFolders = [];
  }

  for (const moduleName of listSymLinkDep) {
    const dirpathModule = path.resolve(".", "node_modules", moduleName);
    let dirpathModuleReal;

    try {
      dirpathModuleReal = fs.realpathSync(dirpathModule);
    } catch (err) {
      console.warn(
        `${SCRIPTFILE_TAG}. ${TAG}. Fail to resolve symlink, thus skip module. ModuleName=${moduleName}`,
        err,
      );

      continue;
    }

    config.resolver.extraNodeModules[moduleName] = dirpathModuleReal;
    config.watchFolders.push(dirpathModuleReal);

    console.log(
      `${SCRIPTFILE_TAG}. ${TAG}. moduleName=${moduleName}. moduleDirpathReal=${dirpathModuleReal}`,
    );
  }
}

module.exports = {
  supportSymLinkedModule,
};
