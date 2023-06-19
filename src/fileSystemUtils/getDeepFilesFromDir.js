import fs from 'node:fs';
import path from 'node:path';

const getDeepFilesFromDir = (dir, pattern, filesList = []) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getDeepFilesFromDir(filePath, pattern, filesList);
    } else if (pattern && pattern.test(file)) {
      filesList.push(filePath);
    }
  });

  return filesList;
};

export default getDeepFilesFromDir;
