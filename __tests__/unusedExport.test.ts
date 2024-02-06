import { ImportExportData } from '../src/type';
import getUnusedExports from '../src/utils/getUnusedExports';

describe('Unused export algo related tests', () => {
  const packages = [];

  it('unused named export test', async () => {
    const data: {
      file: string;
      imports: ImportExportData[];
      exports: ImportExportData[];
    }[] = [
      {
        file: 'testFile.ts',
        imports: [
          {
            file: 'src/test2.ts',
            name: 'func1',
            source: 'src/test1',
            type: 'named',
          },
        ],
        exports: [
          {
            file: 'src/test1.ts',
            name: 'unusedFunc',
            source: 'src/test1',
            type: 'named',
          },
        ],
      },
    ];
    const { unusedExports, unusedInstalledPackages } = await getUnusedExports(
      data,
      packages,
    );

    expect(unusedInstalledPackages).toEqual([]);
    expect(unusedExports).toEqual([
      {
        name: 'unusedFunc',
        file: 'src/test1.ts',
        type: 'named',
      },
    ]);
  });

  it('used named export test', async () => {
    const data: {
      file: string;
      imports: ImportExportData[];
      exports: ImportExportData[];
    }[] = [
      {
        file: 'testFile.ts',
        imports: [
          {
            file: 'src/test2.ts',
            name: 'usedFunc',
            source: 'src/test1',
            type: 'named',
          },
        ],
        exports: [
          {
            file: 'src/test1.ts',
            name: 'usedFunc',
            source: 'src/test1',
            type: 'named',
          },
        ],
      },
    ];
    const { unusedExports, unusedInstalledPackages } = await getUnusedExports(
      data,
      packages,
    );

    expect(unusedInstalledPackages).toEqual([]);
    expect(unusedExports).toEqual([]);
  });

  it('usused default export test', async () => {
    const data: {
      file: string;
      imports: ImportExportData[];
      exports: ImportExportData[];
    }[] = [
      {
        file: 'testFile.ts',
        imports: [
          {
            file: 'src/test2.ts',
            name: 'usedFun',
            source: 'src/test1',
            type: 'named',
          },
        ],
        exports: [
          {
            file: 'src/test1.ts',
            name: 'usedFunc',
            source: 'src/test1',
            type: 'default',
          },
          {
            file: 'src/test2.ts',
            name: 'usedFunc',
            source: 'src/test2',
            type: 'default',
          },
        ],
      },
    ];
    const { unusedExports, unusedInstalledPackages } = await getUnusedExports(
      data,
      packages,
    );

    expect(unusedInstalledPackages).toEqual([]);
    expect(unusedExports).toEqual([
      {
        file: 'src/test1.ts',
        name: 'usedFunc',
        type: 'default',
      },
      {
        file: 'src/test2.ts',
        name: 'usedFunc',
        type: 'default',
      },
    ]);
  });

  it('used default export test', async () => {
    const data: {
      file: string;
      imports: ImportExportData[];
      exports: ImportExportData[];
    }[] = [
      {
        file: 'testFile.ts',
        imports: [
          {
            file: 'src/test3.ts',
            name: 'usedFun',
            source: 'src/test1',
            type: 'default',
          },
          {
            file: 'src/test3.ts',
            name: 'usedFunc2',
            source: 'src/test2',
            type: 'default',
          },
        ],
        exports: [
          {
            file: 'src/test1.ts',
            name: 'usedFunc1',
            source: 'src/test1',
            type: 'default',
          },
          {
            file: 'src/test2.ts',
            name: 'usedFunc2',
            source: 'src/test2',
            type: 'default',
          },
        ],
      },
    ];
    const { unusedExports, unusedInstalledPackages } = await getUnusedExports(
      data,
      packages,
    );

    expect(unusedInstalledPackages).toEqual([]);
    expect(unusedExports).toEqual([]);
  });
});
