export type ExportType = 'named' | 'default';
export type ImportType = 'named' | 'default' | 'namespace';
export type ImportExportData = {
  name: string;
  type: ExportType | ImportType;
  source: string;
};
