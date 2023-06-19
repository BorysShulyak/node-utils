import childProcess from 'node:child_process';
import util from 'node:util';

const childProcessExec = childProcess.exec;

const exec = util.promisify(childProcessExec);

const getStagedFiles = async () => {
  const gitStagedFiles = await exec('git diff --diff-filter=ACM --cached --name-only');
  return gitStagedFiles.stdout.split('\n').filter((file) => file);
};

export default getStagedFiles;
