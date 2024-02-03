export type ExportType = 'named' | 'default';
export type ImportType = 'named' | 'default' | 'namespace';
export type ImportExportData = {
  name: string; // name of the imported or exported variable/function
  type: ExportType | ImportType;
  source: string; // this is the file from where export is happening, or where imported function/variable is coming from
};
