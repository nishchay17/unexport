import { builtinModules } from 'module';

export function isNodeCoreModule(importPath: string): boolean {
  return builtinModules.includes(importPath);
}
