const fs = require("fs");
const path = require("path");

const SCRIPTFILE_TAG = "postinstall";

async function removeNodeModulesInSrcDeps() {
  const TAG = "removeNodeModulesInSrcDeps";

  const dirpathSrcDeps = path.join(__dirname, "..", "src-deps");
  if (!fs.existsSync(dirpathSrcDeps)) {
    return;
  }

  const listChildName = await fs.promises.readdir(dirpathSrcDeps);
  for (const childName of listChildName) {
    const dirpathChild = path.join(dirpathSrcDeps, childName);

    const dirpathChildNodeModules = path.join(dirpathChild, "node_modules");
    if (fs.existsSync(dirpathChildNodeModules)) {
      console.log(`${SCRIPTFILE_TAG}. ${TAG}. DirToRemove=${dirpathChildNodeModules}`);
      await fs.promises.rm(dirpathChildNodeModules, {recursive: true});
    }
  }
}

async function main() {
  await removeNodeModulesInSrcDeps();
}

// Main
main();
