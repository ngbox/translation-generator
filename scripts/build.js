const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs/promises');

const FILES_TO_COPY_AFTER_BUILD = [
  'src/commands/json/schema.json',
  'src/collection.json',
  'package.json',
  'README.md',
];

async function* copyFiles() {
  for (const src of FILES_TO_COPY_AFTER_BUILD) {
    yield* copy(src);
  }
}

async function* copy(src) {
  const dest = `dist/${src.replace(/^src\//, '')}`;
  await fs.copyFile(src, dest);
  yield { src, dest };
}

(async () => {
  try {
    await fs.rmdir('dist', { recursive: true });

    await exec('npx ./node_modules/.bin/tsc');

    for await (const _filecopy of copyFiles()) {
      // do nothing
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
