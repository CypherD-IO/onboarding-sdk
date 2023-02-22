
const esbuild = require('esbuild');
const cssModulesPlugin = require("esbuild-css-modules-plugin");

(async function () {
  await esbuild.build({
    entryPoints: ['src/browser.ts'],
    bundle: true,
    minify: true,
    sourcemap: 'external',
    outfile: 'dist/esbuild/browser.js',
    plugins: [cssModulesPlugin()],
  });
  console.log('esbuild.browser.config.js: Done.');
})();
