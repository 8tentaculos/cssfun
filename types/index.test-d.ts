import { expectType, expectError, expectAssignable } from 'tsd';
import { css, StyleSheet, createTheme } from './index';
import type { CSSValue, StyleRule, Styles, StyleSheetOptions, ThemeDefinition, CreateThemeOptions } from './index';

/*
 * css(): generic classes inference
 */
const sheet = css({
    link : { color : 'blue' },
    button : { padding : '10px' }
});

expectType<string>(sheet.classes.link);
expectType<string>(sheet.classes.button);
// typo on a key that doesn't exist should error
expectError(sheet.classes.typo);

/*
 * css(): real-world style patterns
 */
css({
    // nested selectors
    root : {
        color : 'black',
        '&:hover' : { color : 'blue' },
        '&:active' : { backgroundColor : 'red' },
        '& span' : { fontSize : 14 },
    },
    // null values are valid (filtered at runtime)
    card : {
        color : 'red',
        backgroundColor : null,
        margin : undefined,
    },
    // CSS variables as values
    button : {
        color : 'var(--fun-colorPrimary)',
        backgroundColor : 'var(--fun-bg1)',
    },
    // at-rules at top level
    '@global' : { body : { margin : 0 } },
    '@keyframes wave' : {
        '0%, 100%' : { transform : 'rotate(10deg)' },
        '50%'      : { transform : 'rotate(-10deg)' },
    },
    '@media (min-width: 768px)' : {
        '$root' : { color : 'black' },
    },
});

/*
 * css(): options
 */
css({ root : { color : 'red' } }, {
    prefix : 'app',
    attributes : { id : 'my-styles' },
    generateUid() { return this.prefix + '-uid'; },
    generateClassName(className, index) { return `${this.uid}-${className}-${index}`; },
    shouldAttachToDOM() { return !this.uid.startsWith('test'); },
});

// custom option keys allowed (index signature)
css({ root : {} }, { prefix : 'app', myCustomOption : 'value' });

/*
 * StyleSheet instance
 */
const instance = new StyleSheet({ root : { color : 'black' } });

expectType<string>(instance.uid);
expectType<string>(instance.prefix);
expectType<string>(instance.render());
expectType<string>(instance.toString());
expectType<boolean>(instance.shouldAttachToDOM());
expectAssignable<HTMLStyleElement | null | undefined>(instance.el);

// attach/destroy return this (chainable)
expectType<typeof instance>(instance.attach());
expectType<typeof instance>(instance.destroy());

/*
 * StyleSheet static members
 */
expectType<string>(StyleSheet.prefix);
expectType<string>(StyleSheet.indent);
expectType<boolean>(StyleSheet.debug);
expectType<StyleSheet<any>[]>(StyleSheet.registry);
expectType<string>(StyleSheet.toCSS());
expectType<string>(StyleSheet.toString());

// static setters
StyleSheet.prefix = 'myapp';
StyleSheet.debug = false;

/*
 * createTheme()
 */
const theme = createTheme({
    light : {
        colorPrimary : 'black',
        backgroundLevel1 : 'white',
        // nested keys become --fun-palette-common-black
        palette : { common : { black : '#000' } },
    },
    dark : {
        colorPrimary : 'white',
        backgroundLevel1 : 'black',
        palette : { common : { black : '#fff' } },
    },
});

// classes.root is always available from createTheme
expectType<string>(theme.classes.root);

// single color scheme
createTheme({ normal : { color : 'red' } }, { colorScheme : 'normal' });
createTheme({ light : { color : 'black' } }, { colorScheme : 'light' });
createTheme({ dark : { color : 'white' } }, { colorScheme : 'dark' });

// empty string or null prefix (no CSS var prefix)
createTheme({ light : { color : 'black' } }, { cssVarsPrefix : null });
createTheme({ light : { color : 'black' } }, { cssVarsPrefix : '' });

// invalid colorScheme should error
expectError(createTheme({}, { colorScheme : 'invalid' }));

/*
 * type exports are usable
 */
const styles : Styles = { root : { color : 'red' } };
const rule : StyleRule = { color : 'blue', '&:hover' : { color : 'red' } };
const value : CSSValue = 'blue';
const opts : StyleSheetOptions = { prefix : 'test' };
const themeDef : ThemeDefinition = { light : { color : 'white' }, dark : { color : 'black' } };
const themeOpts : CreateThemeOptions = { colorScheme : 'dark' };

/*
 * real-world: combining multiple classes
 */
const multi = css({ a : {}, b : {} });
const combined : string = [multi.classes.a, multi.classes.b].join(' ');

/*
 * real-world: SSR pattern
 */
const allStyles : string = StyleSheet.toString();
const allCss : string = StyleSheet.toCSS();
