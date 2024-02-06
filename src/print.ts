import clc from 'cli-color';

export default function print({
  unusedInstalledPackages,
  unusedExports,
}: {
  unusedInstalledPackages: string[];
  unusedExports: {
    name: string;
    file: string;
    type: string;
  }[];
}) {
  const groupedByFile = unusedExports.reduce((acc, item) => {
    return {
      ...acc,
      [item.file]: [
        ...(acc[item.file] || []),
        { name: item.name, type: item.type },
      ],
    };
  }, {});

  console.log(clc.green.bold('Unused installed packages: '));
  if (unusedInstalledPackages.length === 0) {
    console.log('  No unused installed packages');
  } else {
    unusedInstalledPackages.forEach((pkg) =>
      console.log(clc.red(`  - ${pkg}`)),
    );
  }

  console.log(clc.green.bold('\nUnused file exports: '));
  if (Object.keys(groupedByFile).length === 0) {
    console.log('  No unused file exports');
  } else {
    Object.keys(groupedByFile).map((file) => {
      console.log(clc.blue.bold(`  ${file}: `));
      groupedByFile[file].forEach((item) =>
        console.log(clc.red(`    - ${item.name} (${item.type} export)`)),
      );
    });
  }
}
