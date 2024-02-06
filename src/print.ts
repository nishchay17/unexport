export default function print(data: {
  unusedInstalledPackages: string[];
  unusedExports: {
    name: string;
    file: string;
  }[];
}) {
  const groupedByFile = data.unusedExports.reduce((acc, item) => {
    return {
      ...acc,
      [item.file]: [...(acc[item.file] || []), item.name],
    };
  }, {});
  console.log(data.unusedInstalledPackages);
  console.log(groupedByFile);
}
