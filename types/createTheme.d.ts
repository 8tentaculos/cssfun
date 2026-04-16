import StyleSheet from './StyleSheet';
import type { StyleRule, Styles, StyleSheetOptions } from './StyleSheet';

/** A recursive theme variables object. Nested keys are joined with `-` to form CSS variable names. */
export interface ThemeVars {
    [key: string]: string | number | ThemeVars;
}

/** Theme definition object mapping color schemes to theme variables. */
export interface ThemeDefinition {
    light?: ThemeVars;
    dark?: ThemeVars;
    normal?: ThemeVars;
}

/** Options for the `createTheme` function. */
export interface CreateThemeOptions {
    /**
     * Specifies the color scheme(s) to use.
     * - `'light'`: uses the `light` theme only
     * - `'dark'`: uses the `dark` theme only
     * - `'light dark'`: (default) supports both, adapting to system preferences
     * - `'normal'`: uses the `normal` theme only
     */
    colorScheme?: 'light' | 'dark' | 'light dark' | 'normal';
    /**
     * Prefix for the generated CSS variables. Defaults to `StyleSheet.prefix`.
     * Pass `null` or `''` to generate variables without a prefix.
     */
    cssVarsPrefix?: string | null;
    /** A function used to create a new StyleSheet instance. By default, uses the `css` function. */
    createStyleSheet?: <S extends Styles>(styles: S, options?: StyleSheetOptions) => StyleSheet<S>;
    /** Options to pass when creating the StyleSheet instance. */
    styleSheetOptions?: StyleSheetOptions;
}

/**
 * Generates a theme StyleSheet instance with CSS variables based on the provided
 * themes and options. Supports multiple color schemes including `light`, `dark`,
 * `light dark`, and `normal`.
 *
 * @param themes - An object defining styles for color schemes. Each key corresponds to a
 *   color scheme, and its value is an object of key-value pairs converted to CSS variables.
 *   Nested keys are concatenated with `-` to form variable names.
 * @param options - An optional object to customize the theme generation.
 * @returns The theme StyleSheet instance. Use `classes.root` to get the theme class name.
 */
declare function createTheme(themes?: ThemeDefinition, options?: CreateThemeOptions): StyleSheet<{ root: StyleRule }>;

export default createTheme;
