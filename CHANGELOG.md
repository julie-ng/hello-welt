# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.5.0](https://github.com/julie-ng/hello-welt/compare/v0.4.0...v0.5.0) (2024-07-13)


### Features

* **actions:** add icons to more easily see which workflows are running ([db15f8f](https://github.com/julie-ng/hello-welt/commit/db15f8f7980815a6c406a0d1b4eaa845b433fba0))
* **ci:** use node v20 ([259c827](https://github.com/julie-ng/hello-welt/commit/259c827d407f2676cf42d194f7e26ba120d36a7e))
* **security:** update dependencies ([257ca61](https://github.com/julie-ng/hello-welt/commit/257ca61049d380a0ab4a4c35396b330e36be308a))


### Bug Fixes

* **ci:** ignore tap's ridiculous coverage requirement ([30c96a1](https://github.com/julie-ng/hello-welt/commit/30c96a17fc75fd0b48fe351d70295dfffea61dad))
* **dockerfile:** vulnerabilities, update image versions ([961219b](https://github.com/julie-ng/hello-welt/commit/961219b3e9db53d2f3f6817a5f51242f4291f408))
* **pipeline:** only fail docker high severity ([82a4b3d](https://github.com/julie-ng/hello-welt/commit/82a4b3d8ef75b29d1752efdc8f53f2813732ca11))

## [0.4.0](https://github.com/julie-ng/hello-welt/compare/v0.3.0...v0.4.0) (2023-03-27)

## [0.3.0](https://github.com/julie-ng/hello-welt/compare/v0.2.1...v0.3.0) (2023-03-27)


### Features

* add '/crash' to simulate crash for liveness probes ([a5df3d3](https://github.com/julie-ng/hello-welt/commit/a5df3d37be81dbdb713d1e9fbc3719ab24757dce))
* add '/slow' to simulate memory leak ([df84511](https://github.com/julie-ng/hello-welt/commit/df845115fa68e0eca4b00862f69039919ca7d968))
* **ci:** tag docker latest on main branch ([5f0015b](https://github.com/julie-ng/hello-welt/commit/5f0015b51178d9ba2b5c46ea01da35b1b4e64a3c))

### [0.2.1](https://github.com/julie-ng/hello-welt/compare/v0.2.0...v0.2.1) (2021-04-24)


### Bug Fixes

* **docker:** startup command 🤦‍♀️ ([d428924](https://github.com/julie-ng/hello-welt/commit/d428924163249599594c7b3a17870c2a5d76dad2))

## [0.2.0](https://github.com/julie-ng/hello-welt/compare/v0.1.0...v0.2.0) (2021-04-09)


### Features

* **ci:** add docker workflow ([8c574a5](https://github.com/julie-ng/hello-welt/commit/8c574a5f4fd7ea65be1fb70b49bdbce7f72b048f))
* **ci:** add linting ([b046765](https://github.com/julie-ng/hello-welt/commit/b046765c130945f9015b337b9555509b16bac40b))
* **ci:** add pipeline ([a7b1e3b](https://github.com/julie-ng/hello-welt/commit/a7b1e3badf79403a13de1c11b89521e39ea0222d))
* **ci:** add snyk container scanning, closes [#2](https://github.com/julie-ng/hello-welt/issues/2) ([7608345](https://github.com/julie-ng/hello-welt/commit/7608345093a0319721c84b9e9c6ef0f152fb4830))
* **ci:** add tests ([1846c94](https://github.com/julie-ng/hello-welt/commit/1846c9437486c1c7ab12b95fe94cbfc05f58ede4))
* **healthcheck:** add /health endpoint ([bb68332](https://github.com/julie-ng/hello-welt/commit/bb68332ef19c72ece0807c07be1bcbca78c79875))


### Bug Fixes

* **app:** unhandled rejection message ([6bbe2e1](https://github.com/julie-ng/hello-welt/commit/6bbe2e18b8d665a7334cc73fc6cd46a8238f1ed8))

## 0.1.0 (2021-03-17)


### Features

* **ci:** add docker workflow ([6df48e5](https://github.com/julie-ng/hello-welt/commit/6df48e574e8d3680b9146def95b73628146903ad))
* add logging, include error handling ([77ffff0](https://github.com/julie-ng/hello-welt/commit/77ffff0f565eb88fc4ceb272ad71e5064858302b))
* dockerize app ([cda0baf](https://github.com/julie-ng/hello-welt/commit/cda0baf815b9c2daca3d70eee21521ed10fb4185))
