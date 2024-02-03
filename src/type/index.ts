export type ExportType = 'named' | 'default';
export type ImportType = 'named' | 'default' | 'namespace';
export type ImportExportData = {
  file: string; // the file on which imports or exports are happening from, in case of export this will be same as source, this will have extension
  name: string; // name of the imported or exported variable/function
  type: ExportType | ImportType;
  source: string; // this is the file from where export is happening, or where imported function/variable is coming from
};
