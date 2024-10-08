import { expect } from 'chai';

import { StyleSheet, css, createTheme } from '../src/index.js';

describe('cssfun', () => {
    beforeEach(() => {
        StyleSheet.destroy();
        StyleSheet.uid = 0; 
    });

    describe('StyleSheet', () => {
        it('must exists', () => {
            expect(StyleSheet).to.exist;
        });

        it('instance must be rendered as string', () => {
            const instance = css({ root : { color : 'red' } });
            expect(instance.toString()).to.be.equal('<style id="fun-1">.fun-1-root-1{color:red;}</style>');
        });

        it('must attach style element to the head', () => {
            const instance = css({ root : { color : 'red' } });
            const style = instance.el;
            expect(style).to.exist;
            expect(style.parentNode).to.be.equal(document.head);
            expect(document.getElementById(instance.id)).to.exist;
        });

        it('must be rendered as element', () => {
            const instance = css({ root : { color : 'red' } });
            const style = instance.el;
            expect(style.outerHTML).to.be.equal('<style id="fun-1">.fun-1-root-1{color:red;}</style>');
        });
 
        it('must be added to the registry', () => {
            const instance = css({ root : { color : 'red' } });
            expect(StyleSheet.registry).to.include(instance);
        });

        it('must be removed from head and registry', () => {
            const instance = css({ root : { color : 'red' } });
            instance.destroy();
            expect(document.getElementById(instance.id)).to.not.exist;
            expect(instance.el).to.not.exist;
            expect(StyleSheet.registry).to.not.include(instance);
        });

        it('must use class references', () => {
            const instance = css({
                root : {},
                button : {},
                '$root $button' : { color : 'blue' }
            });
            const style = instance.el;
            expect(style.outerHTML).to.be.equal('<style id="fun-1">.fun-1-root-1 .fun-1-button-2{color:blue;}</style>');
        });

        it('must use nested styles', () => {
            const instance = css({
                root : {
                    color : 'red',
                    '&:hover' : {
                        color : 'blue'
                    }
                }
            });
            const style = instance.el;
            expect(style.outerHTML).to.be.equal('<style id="fun-1">.fun-1-root-1{color:red;}.fun-1-root-1:hover{color:blue;}</style>');
        });

        it('must use deep nested styles', () => {
            const instance = css({
                root : {
                    margin : '5px'
                },
                button : {
                    color : 'red',
                    '&:hover' : {
                        color : 'blue',
                        '&:active' : {
                            color : 'green'
                        }
                    }
                }
            });
            const style = instance.el;
            expect(style.outerHTML).to.be.equal('<style id="fun-1">.fun-1-root-1{margin:5px;}.fun-1-button-2{color:red;}.fun-1-button-2:hover{color:blue;}.fun-1-button-2:hover:active{color:green;}</style>');
        });

        it('must use global styles', () => {
            const instance = css({
                '@global' : {
                    body : {
                        margin : 0
                    }
                },
                root : {
                    color : 'black'
                }
            });
            const style = instance.el;
            expect(style.outerHTML).to.be.equal('<style id="fun-1">body{margin:0;}.fun-1-root-1{color:black;}</style>');
        });

        it('must use nested global styles', () => {
            const instance = css({
                root : {
                    '@global' : {
                        a : {
                            color : 'red'
                        }
                    },
                    color : 'black'
                },
                button : {
                    color : 'blue'
                }
            });
            const style = instance.el;
            expect(style.outerHTML).to.be.equal('<style id="fun-1">.fun-1-root-1{color:black;}.fun-1-root-1 a{color:red;}.fun-1-button-2{color:blue;}</style>');
        });

        it('must use goblal prefix', () => {
            const instance = css({
                '@global body' : {
                    margin : 0
                }
            });
            const style = instance.el;
            expect(style.outerHTML).to.be.equal('<style id="fun-1">body{margin:0;}</style>');
        });

        it('must use nested global prefix', () => {
            const instance = css({
                root : {
                    color : 'black',
                    '@global a' : {
                        color : 'red'
                    }
                }
            });
            const style = instance.el;
            expect(style.outerHTML).to.be.equal('<style id="fun-1">.fun-1-root-1{color:black;}.fun-1-root-1 a{color:red;}</style>');
        });

        it('must support media queries', () => {
            const instance = css({
                '@media (min-width: 768px)' : {
                    a : {
                        color : 'red'
                    }
                }
            });
            const style = instance.el;
            expect(style.outerHTML).to.be.equal('<style id="fun-1">@media (min-width: 768px){a{color:red;}}</style>');
        });

        it('must support classes in media queries', () => {
            const instance = css({
                root : {},
                '@media (min-width: 768px)' : {
                    '$root' : {
                        color : 'red'
                    }
                }
            });
            const style = instance.el;
            expect(style.outerHTML).to.be.equal('<style id="fun-1">@media (min-width: 768px){.fun-1-root-1{color:red;}}</style>');
        });
    });

    describe('css', () => {
        it('must exists', () => {
            expect(css).to.exist;
        });

        it('must instantiate a new StyleSheet', () => {
            const instance = css({ root : { color : 'red' } });
            expect(instance).to.be.instanceOf(StyleSheet);
        });
    });

    describe('createTheme', () => {
        it('must exists', () => {
            expect(createTheme).to.exist;
        });

        it('must create a new theme', () => {
            const theme = createTheme();
            expect(theme).to.be.instanceOf(StyleSheet);
        });

        it('must create a new theme with options', () => {
            const theme = createTheme({}, { colorScheme : 'light' });
            expect(theme).to.be.instanceOf(StyleSheet);
        });

        it('must create a new theme with light and dark themes', () => {
            const theme = createTheme({ light : { color : 'red' }, dark : { color : 'blue' } });
            expect(theme).to.be.instanceOf(StyleSheet);
        });
    });
});
