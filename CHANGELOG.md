# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- TypeScript type definitions for the public API (`css`, `createTheme`, `StyleSheet`).
  - Bundled `.d.ts` files under `types/` and wired up via the `types`/`exports` fields in `package.json`.
  - CSS property autocomplete and type checking via `csstype`.
  - Class name inference from the styles object passed to `css()`.
  - Exported types: `CSSValue`, `CSSProperties`, `StyleRule`, `Styles`, `StyleSheetOptions`, `ThemeVars`, `ThemeDefinition`, `CreateThemeOptions`.

### Changed

- Documented TypeScript usage in the README (class name inference, CSS property autocomplete, exported types).
- Added type tests (`tsd`) to the `posttest` step so types are checked on every test run.
- Added test coverage for empty string values and CSS variables.
- Updated modules.

## [0.0.14] - 2026-03-30

### Changed

- Added tests for `createTheme()`: no-prefix behaviour (`cssVarsPrefix: null` and `''`) and custom prefix.

### Fixed

- Fixed `createTheme()` so CSS variables can be generated without a prefix.
  - Passing `options.cssVarsPrefix: null` or `options.cssVarsPrefix: ''` now correctly produces variables like `--color` instead of `--fun-color`.

## [0.0.13] - 2025-12-17

### Changed

- Added null value filtering in styles.
  - Properties with `null` values are now automatically filtered and not rendered in the CSS output.

- Added null value filtering in theme CSS variables.
  - CSS variables with `null` values in `createTheme()` are now filtered and not rendered.


- Added test coverage for null value handling in styles.
- Added test coverage for null value handling in theme CSS variables.

## [0.0.12] - 2025-12-09

### Changed

- Added `StyleSheet.toCSS()` static method.
  - Returns CSS string without style tags for external CSS files.

- Shorter class names in production.
  - Dev: `.fun-9qkk9s-root` (override with `StyleSheet.debug = false`).
  - Prod: `.f-9qkk9s-1`.

- Introduced build-time `__DEV__` flag.
  - Enabled by default in development.
  - Automatically stripped in production builds.
  - Runtime toggle via `StyleSheet.debug` remains available in development.


- Updated Node.js version to v24.
- Migrated to ESLint flat config (`eslint.config.js`).
- Added version bump script to automatically update CDN links in README and examples.
- Enabled sourcemap generation for all build outputs (CJS, ESM, and UMD formats).

### Fixed

- Fixed nesting of at-rules when using `@global`.
  - At-rules now maintain proper nesting structure within `@global` blocks.

## [0.0.11] - 2025-04-15

### Changed

- **BREAKING:** Renamed `shouldAddToDOM` to `shouldAttachToDOM`.
- Improved docs.

## [0.0.10] - 2025-04-15

### Changed

- Minor changes related to color schemes in `createTheme`.
- Minor changes in `css` arguments pass.
- Documentation.

## [0.0.9] - 2025-04-13

### Changed

- Exposed `this.shouldAddToDOM` so it can be overridden in subclasses.
- Added a registry check using `this.uid` to determine if a `StyleSheet` is already registered.
- **BREAKING:** `system` default color scheme option is now `light dark` for consistency with `color-scheme` property.
- Improved docs.

## [0.0.8] - 2025-04-06

### Changed

- Introduced stable class names generated using hashes.
- Replaced `id` with a data attribute for identifying style elements.

- **BREAKING:** Renamed the `id` property and `generateId` method to `uid` and `generateUid`, respectively.
- **BREAKING:** Removed the `attach` static method.

- Added comprehensive tests.
- Updated documentation for clarity and accuracy.

## [0.0.7] - 2024-10-08

### Changed

- Added nested global prefix.

    ```javascript
    css({
        root : {
            '@global a' : {
                color : 'black'
            }
        }
    }).toString();
    ```

    ##### Renders to:
    ```html
    <style id="fun-1">
        .fun-1-root-1 a {
            color : black;
        }
    </style>
    ```

## [0.0.6] - 2024-10-03

### Changed

- Migrated to ES6.
- Updated docs.

## [0.0.5] - 2024-09-26

### Fixed

- Fixed package exports for Node and bundlers.

## [0.0.4] - 2024-09-24

### Changed

- Improved code for `StyleSheet` parse and render.
- Improved `createTheme` code.

## [0.0.3] - 2024-09-22

### Changed

- Updated docs.
- Improved `parseStyles`.

### Fixed

- Fixed deep nested parent reference in `parseStyles`.

## [0.0.2] - 2024-09-21

### Changed

#### `StyleSheet`
- Made prefix for ids configurable as `options.idPrefix`.
#### `createTheme`
- Added `options.createStyleSheet` to configure `StyleSheet` creation. Defaults to `css`.
#### `StyleSheet`
- **BREAKING:** `StyleSheet.classPrefix` is now `StyleSheet.prefix`
#### `createTheme`
- **BREAKING:** `createTheme` is no longer a higher-order function. It now receives a themes object and an options object and returns a theme `StyleSheet`.
- **BREAKING:** Fixed CSS vars to use dashes for nested objects and preserve camelized keys. `{ palette : { backgroundColor : 'black' } }` will be transformed into `--fun-palette-backgroundColor` instead of `--fun-palette-background-color`.

## [0.0.1] - 2024-09-19

### Added

- Initial release.

[unreleased]: https://github.com/8tentaculos/cssfun/compare/v0.0.14...HEAD
[0.0.14]: https://github.com/8tentaculos/cssfun/compare/v0.0.13...v0.0.14
[0.0.13]: https://github.com/8tentaculos/cssfun/compare/v0.0.12...v0.0.13
[0.0.12]: https://github.com/8tentaculos/cssfun/compare/v0.0.11...v0.0.12
[0.0.11]: https://github.com/8tentaculos/cssfun/compare/v0.0.10...v0.0.11
[0.0.10]: https://github.com/8tentaculos/cssfun/compare/v0.0.9...v0.0.10
[0.0.9]: https://github.com/8tentaculos/cssfun/compare/v0.0.8...v0.0.9
[0.0.8]: https://github.com/8tentaculos/cssfun/compare/v0.0.7...v0.0.8
[0.0.7]: https://github.com/8tentaculos/cssfun/compare/v0.0.6...v0.0.7
[0.0.6]: https://github.com/8tentaculos/cssfun/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/8tentaculos/cssfun/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/8tentaculos/cssfun/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/8tentaculos/cssfun/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/8tentaculos/cssfun/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/8tentaculos/cssfun/releases/tag/v0.0.1
