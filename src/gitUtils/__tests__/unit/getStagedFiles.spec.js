import childProcess from 'node:child_process';

import getStagedFiles from '../../getStagedFiles.js';

jest.mock('node:util', () => ({
  ...jest.requireActual('node:util'),
  promisify: jest.fn((value) => value)
}));
jest.mock('node:child_process', () => ({
  exec: jest.fn()
}));

describe('getStagedFiles', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an empty array if no staged files are found', async () => {
    const mockExecResult = { stdout: '' };
    jest.spyOn(childProcess, 'exec').mockReturnValueOnce(Promise.resolve(mockExecResult));
    const result = await getStagedFiles();
    expect(result).toEqual([]);
    expect(childProcess.exec).toHaveBeenCalledWith(
      'git diff --diff-filter=ACM --cached --name-only'
    );
  });

  it('should return an array of staged file paths', async () => {
    const mockExecResult = { stdout: 'file1.js\nfile2.txt\nfile3.test.js\n' };
    jest.spyOn(childProcess, 'exec').mockReturnValueOnce(Promise.resolve(mockExecResult));
    const result = await getStagedFiles();
    expect(result).toEqual(['file1.js', 'file2.txt', 'file3.test.js']);
    expect(childProcess.exec).toHaveBeenCalledWith(
      'git diff --diff-filter=ACM --cached --name-only'
    );
  });
});
