
const esbuild = require('esbuild');
// const postcss = require('esbuild-postcss');
const postcss = require('esbuild-postcss-plugin');
// const stylePlugin = require('esbuild-style-plugin');
const { rimraf, rimrafSync, native, nativeSync } = require('rimraf');

(async function () {
  await rimrafSync("./dist");
  await esbuild.build({
    entryPoints: ['src/browser.ts'],
    bundle: true,
    minify: false,
    sourcemap: 'external',
    outfile: 'dist/esbuild/onboardingsdk.js',
    // plugins: [postcss()],
    plugins: [
      postcss({
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
          // Add any additional PostCSS plugins here...
        ],
        inject: true, // Inject CSS into JavaScript bundle
        minimize: true,
        sourceMap: false,
      }),
    ],
  });
  console.log('esbuild.browser.config.js: Done.');
})();
