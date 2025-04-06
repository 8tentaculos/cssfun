import { expect } from 'chai';

import { StyleSheet, css, createTheme } from '../src/index.js';

describe('cssfun', () => {
    beforeEach(() => {
        StyleSheet.destroy();
    });

    describe('StyleSheet', () => {
        it('must exists', () => {
            expect(StyleSheet).to.exist;
        });

        it('instance must be rendered as string', () => {
            const instance = css({ root : { color : 'red' } });
            expect(instance.toString()).to.be.equal(`<style data-fun-uid="${instance.uid}">.${instance.uid}-root{color:red;}</style>`);
        });

        it('must attach style element to the head', () => {
            const instance = css({ root : { color : 'red' } });
            const style = instance.el;
            expect(style).to.exist;
            expect(style.parentNode).to.be.equal(document.head);
            expect(document.querySelector(`style[data-fun-uid="${instance.uid}"]`)).to.be.equal(style);
        });

        it('must attach style element once', () => {
            const instance = css({ root : { color : 'red' } });
            const style = instance.el;
            expect(style).to.exist;
            expect(document.querySelectorAll(`style[data-fun-uid="${instance.uid}"]`).length).to.be.equal(1);
            instance.attach();
            expect(document.querySelectorAll('style').length).to.be.equal(1);
            instance.destroy();
            expect(document.querySelectorAll('style').length).to.be.equal(0);
        });

        it('must be rendered as element', () => {
            const instance = css({ root : { color : 'red' } });
            const style = instance.el;
            expect(style.outerHTML).to.be.equal(`<style data-fun-uid="${instance.uid}">.${instance.uid}-root{color:red;}</style>`);
        });

        it('must be instantiated with custom attributes', () => {
            const instance = css({ root : { color : 'red' } }, { attributes : { id : 'test' } });
            expect(instance.el.id).to.be.equal('test');
        });

        it('must override generateUid', () => {
            const instance = css({ root : { color : 'red' } }, { generateUid() { return this.prefix + '-1'; } });
            expect(instance.uid).to.be.equal('fun-1');
            expect(instance.el.outerHTML).to.be.equal(`<style data-fun-uid="fun-1">.${instance.uid}-root{color:red;}</style>`);
        });

        it('must override generateClassName', () => {
            const instance = css({ root : { color : 'red' } }, { generateClassName(className) { return `${this.uid}-${className}-test`; } });
            expect(instance.el.outerHTML).to.be.equal(`<style data-fun-uid="${instance.uid}">.${instance.uid}-root-test{color:red;}</style>`);
        });

        it('must be instantiated with custom prefix', () => {
            const instance = css({ root : { color : 'red' } }, { prefix : 'test' });
            expect(instance.uid).to.contain('test');
            expect(instance.el.outerHTML).to.be.equal(`<style data-test-uid="${instance.uid}">.${instance.uid}-root{color:red;}</style>`);
        });
 
        it('must be added to the registry', () => {
            const instance = css({ root : { color : 'red' } });
            expect(StyleSheet.registry).to.include(instance);
        });

        it('must be removed from head and registry', () => {
            const instance = css({ root : { color : 'red' } });
            expect(document.querySelector(`style[data-fun-uid="${instance.uid}"]`)).to.exist;
            expect(StyleSheet.registry).to.include(instance);
            instance.destroy();
            expect(document.querySelector(`style[data-fun-uid="${instance.uid}"]`)).to.not.exist;
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
            expect(style.outerHTML).to.be.equal(`<style data-fun-uid="${instance.uid}">.${instance.uid}-root .${instance.uid}-button{color:blue;}</style>`);
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
            expect(style.outerHTML).to.be.equal(`<style data-fun-uid="${instance.uid}">.${instance.uid}-root{color:red;}.${instance.uid}-root:hover{color:blue;}</style>`);
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
            expect(style.outerHTML).to.be.equal(`<style data-fun-uid="${instance.uid}">.${instance.uid}-root{margin:5px;}.${instance.uid}-button{color:red;}.${instance.uid}-button:hover{color:blue;}.${instance.uid}-button:hover:active{color:green;}</style>`);
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
            expect(style.outerHTML).to.be.equal(`<style data-fun-uid="${instance.uid}">body{margin:0;}.${instance.uid}-root{color:black;}</style>`);
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
            expect(style.outerHTML).to.be.equal(`<style data-fun-uid="${instance.uid}">.${instance.uid}-root{color:black;}.${instance.uid}-root a{color:red;}.${instance.uid}-button{color:blue;}</style>`);
        });

        it('must use goblal prefix', () => {
            const instance = css({
                '@global body' : {
                    margin : 0
                }
            });
            const style = instance.el;
            expect(style.outerHTML).to.be.equal(`<style data-fun-uid="${instance.uid}">body{margin:0;}</style>`);
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
            expect(style.outerHTML).to.be.equal(`<style data-fun-uid="${instance.uid}">.${instance.uid}-root{color:black;}.${instance.uid}-root a{color:red;}</style>`);
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
            expect(style.outerHTML).to.be.equal(`<style data-fun-uid="${instance.uid}">@media (min-width: 768px){a{color:red;}}</style>`);
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
            expect(style.outerHTML).to.be.equal(`<style data-fun-uid="${instance.uid}">@media (min-width: 768px){.${instance.uid}-root{color:red;}}</style>`);
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
