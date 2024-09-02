import {createNativeStackNavigator} from "@react-navigation/native-stack";

import ImportedModuleSight from "../src-deps/appmodule-sight/src";
import ImportedModuleEpermit from "../src-deps/appmodule-epermit/src";

export function initAllAppModuleTranslation() {
  ImportedModuleSight.initTranslation();
  ImportedModuleEpermit.initTranslation();
}

export async function initializeAllModuleStore() {
  ImportedModuleEpermit.initializeModuleStore();
}

export function createAllAppModuleStack(
  Stack: ReturnType<typeof createNativeStackNavigator>,
) {
  const SightStack = ImportedModuleSight.getAppModuleStack(Stack);
  const EpermitStack = ImportedModuleEpermit.getAppModuleStack(Stack);

  return [SightStack, EpermitStack];
}
