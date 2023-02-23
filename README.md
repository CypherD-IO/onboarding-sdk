# Onboarding SDK ⚡
 SDK from CypherWallet for DAPP Developers to easliy onboard thier new users with necessary tokens





* [TypeScript 4](https://www.typescriptlang.org/)
* Optionally [esbuild](https://esbuild.github.io/) to bundle for browsers (and Node.js)
* Linting with [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) ([tslint](https://palantir.github.io/tslint/) is deprecated)
* Testing with [Jest](https://jestjs.io/docs/getting-started) (and [ts-jest](https://www.npmjs.com/package/ts-jest))
* Publishing to npm
* Continuous integration ([GitHub Actions](https://docs.github.com/en/actions) / [GitLab CI](https://docs.gitlab.com/ee/ci/))
* Automatic API documentation with [TypeDoc](https://typedoc.org/guides/doccomments/)


## Getting Started

### To Integrate 


#### Web 

Inject the CypherWallet Signon-SDK from the CDN link `https://public.cypherd.io/js/signon-sdk.js` 

```


```

### Npm

1. Install the singon-sdk 
`npm i -S @cypher` 
2. Import the Cypher into Code 





### To Contribute 



```bash

# Install dependencies
npm install

# Now you can run various yarn commands:
npm run cli
npm run lint
npm run test
npm run build-all
npm run ts-node <filename>
npm run esbuild-browser
...
```

* For publishing to npm, use  `npm publish`

## esbuild

[esbuild](https://esbuild.github.io/) is an extremely fast bundler that supports a [large part of the TypeScript syntax](https://esbuild.github.io/content-types/#typescript). This project uses it to bundle for browsers (and Node.js if you want).

```bash
# Build for browsers
yarn esbuild-browser:dev
yarn esbuild-browser:watch

# Build the cli for node
yarn esbuild-node:dev
yarn esbuild-node:watch
```

You can generate a full clean build with `npm run build-all` (which uses both `tsc` and `esbuild`).

* `package.json` includes `scripts` for various esbuild commands
* `esbuild` has a `--global-name=xyz` flag, to store the exports from the entry point in a global variable. See also the [esbuild "Global name" docs](https://esbuild.github.io/api/#global-name).

* esbuild for the browser uses the IIFE (immediately-invoked function expression) format, which executes the bundled code on load (see also https://github.com/evanw/esbuild/issues/29)


## Tests with Jest

You can write [Jest tests](https://jestjs.io/docs/getting-started)

```typescript
import { greet } from './main'

test('the data is peanut butter', () => {
  expect(1).toBe(1)
});

test('greeting', () => {
  expect(greet('Foo')).toBe('Hello Foo')
});
```

Run the tests with `yarn test`, no separate compile step is necessary.

* See also the [Jest documentation](https://jestjs.io/docs/getting-started).
* The tests can be automatically run in CI (GitHub Actions, GitLab CI): [`.github/workflows/lint-and-test.yml`], [`.gitlab-ci.yml`]
* Take a look at other modern test runners such as [ava](https://github.com/avajs/ava), [uvu](https://github.com/lukeed/uvu) and [tape](https://github.com/substack/tape)

## Documentation, published with CI

You can auto-generate API documentation from the TypeScript source files using [TypeDoc](https://typedoc.org/guides/doccomments/). The generated documentation can be published to GitHub / GitLab pages through the CI.

Generate the documentation, using `src/main.ts` as entrypoint (configured in package.json):

```bash
yarn docs
```

The resulting HTML is saved in `docs/`.

You can publish the documentation through CI:
* [GitHub pages](https://pages.github.com/): See [`.github/workflows/deploy-gh-pages.yml`]
* [GitLab pages](https://docs.gitlab.com/ee/user/project/pages/): [`.gitlab-ci.yml`]()


## References

* [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
* [tsconfig docs](https://www.typescriptlang.org/tsconfig)
* [esbuild docs](https://esbuild.github.io/)
* [typescript-eslint docs](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md)
* [Jest docs](https://jestjs.io/docs/getting-started)
* [GitHub Actions](https://docs.github.com/en/actions), [GitLab CI](https://docs.gitlab.com/ee/ci/)


## Feedback
