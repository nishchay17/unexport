import { ImportExportData } from '../type';

export default function getUnusedExports(
  importExportData: {
    file: string;
    imports: ImportExportData[];
    exports: ImportExportData[];
  }[],
) {
  return importExportData;
}
