import fs from 'node:fs';

import getDeepFilesFromDir from '../getDeepFilesFromDir.js';

describe('getDeepFilesFromDir', () => {
  const mockReaddirSync = jest.spyOn(fs, 'readdirSync');
  const mockStatSync = jest.spyOn(fs, 'statSync');

  beforeEach(() => {
    mockReaddirSync.mockClear();
    mockStatSync.mockClear();
  });

  it('should return an empty array if the provided `dir` is empty', () => {
    mockReaddirSync.mockReturnValueOnce([]);

    const result = getDeepFilesFromDir('/path/to/empty/dir', /test\.js$/);

    expect(result).toEqual([]);
    expect(mockReaddirSync).toHaveBeenCalledWith('/path/to/empty/dir');
  });

  it('should return an array of file paths that match the provided `pattern`', () => {
    mockReaddirSync.mockReturnValueOnce(['file1.js', 'file2.txt', 'file3.test.js']);
    mockStatSync.mockReturnValueOnce({ isDirectory: () => false });
    mockStatSync.mockReturnValueOnce({ isDirectory: () => false });
    mockStatSync.mockReturnValueOnce({ isDirectory: () => false });

    const result = getDeepFilesFromDir('/path/to/dir', /\.test\.js$/, []);

    expect(result).toEqual(['/path/to/dir/file3.test.js']);
    expect(mockReaddirSync).toHaveBeenCalledWith('/path/to/dir');
    expect(mockStatSync).toHaveBeenCalledTimes(3);
    expect(mockStatSync).toHaveBeenCalledWith('/path/to/dir/file1.js');
    expect(mockStatSync).toHaveBeenCalledWith('/path/to/dir/file2.txt');
    expect(mockStatSync).toHaveBeenCalledWith('/path/to/dir/file3.test.js');
  });

  it('should recursively search directories and return an array of file paths that match the provided `pattern`', () => {
    mockReaddirSync.mockReturnValueOnce(['dir1', 'file1.js']);
    mockReaddirSync.mockReturnValueOnce(['file2.txt', 'file3.test.js']);
    mockStatSync.mockReturnValueOnce({ isDirectory: () => true });
    mockStatSync.mockReturnValueOnce({ isDirectory: () => false });
    mockStatSync.mockReturnValueOnce({ isDirectory: () => false });
    mockStatSync.mockReturnValueOnce({ isDirectory: () => false });

    const result = getDeepFilesFromDir('/path/to/root', /\.test\.js$/, []);

    expect(result).toEqual(['/path/to/root/dir1/file3.test.js']);
    expect(mockReaddirSync).toHaveBeenCalledTimes(2);
    expect(mockReaddirSync).toHaveBeenCalledWith('/path/to/root');
    expect(mockReaddirSync).toHaveBeenCalledWith('/path/to/root/dir1');
    expect(mockStatSync).toHaveBeenCalledTimes(4);
    expect(mockStatSync).toHaveBeenCalledWith('/path/to/root/file1.js');
    expect(mockStatSync).toHaveBeenCalledWith('/path/to/root/dir1');
    expect(mockStatSync).toHaveBeenCalledWith('/path/to/root/dir1/file2.txt');
    expect(mockStatSync).toHaveBeenCalledWith('/path/to/root/dir1/file3.test.js');
  });
});
