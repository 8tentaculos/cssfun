import { expectType } from 'tsd';
import * as cssfun from 'cssfun';
import StyleSheet from 'cssfun/StyleSheet';
import StyleSheetJs from 'cssfun/StyleSheet.js';
import css from 'cssfun/css';
import cssJs from 'cssfun/css.js';
import createTheme from 'cssfun/createTheme';
import createThemeJs from 'cssfun/createTheme.js';

/*
 * Public subpaths resolve, with and without `.js`, to the same types as the root entry
 */
expectType<typeof cssfun.StyleSheet>(StyleSheet);
expectType<typeof cssfun.StyleSheet>(StyleSheetJs);
expectType<typeof cssfun.css>(css);
expectType<typeof cssfun.css>(cssJs);
expectType<typeof cssfun.createTheme>(createTheme);
expectType<typeof cssfun.createTheme>(createThemeJs);
