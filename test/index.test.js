import { expect } from 'chai';

import { StyleSheet, css, createTheme } from '../src/index.js';

describe('cssfun', () => {
    beforeEach(() => {
        StyleSheet.debug = false;
        StyleSheet.destroy();
        document.body.className = '';
        document.documentElement.removeAttribute('data-color-scheme', 'dark');
    });

    describe('StyleSheet', () => {
        it('must exists', () => {
            expect(StyleSheet).to.exist;
        });

        it('instance must be rendered as string', () => {
            const instance = css({ root : { color : 'red' } });
            expect(instance.toString()).to.be.equal(`<style data-fun-uid="${instance.uid}">.${instance.prefix}-${instance.uid}-1{color:red;}</style>`);
        });

        it('must add style element to the head', () => {
            const instance = css({ root : { color : 'red' } });
            const style = instance.el;
            expect(style).to.exist;
            expect(style.parentNode).to.be.equal(document.head);
            expect(document.querySelector(`style[data-fun-uid="${instance.uid}"]`)).to.be.equal(style);
        });

        it('must add style element once', () => {
            const instance = css({ root : { color : 'red' } });
            expect(document.querySelectorAll(`style[data-fun-uid="${instance.uid}"]`).length).to.be.equal(1);
            instance.attach();
            expect(document.querySelectorAll('style').length).to.be.equal(1);
            css({ root : { color : 'red' } });
            expect(document.querySelectorAll('style').length).to.be.equal(1);
        });

        it('must remove style element', () => {
            const instance = css({ root : { color : 'red' } });
            expect(document.querySelectorAll(`style[data-fun-uid="${instance.uid}"]`).length).to.be.equal(1);
            instance.destroy();
            expect(document.querySelectorAll('style').length).to.be.equal(0);
        });

        it('must be added to the registry', () => {
            const instance = css({ root : { color : 'red' } });
            expect(StyleSheet.registry).to.include(instance);
            expect(StyleSheet.registry.length).to.be.equal(1);
        });

        it('must be added to the registry once', () => {
            const instance = css({ root : { color : 'red' } });
            expect(StyleSheet.registry.length).to.be.equal(1);
            instance.attach();
            expect(StyleSheet.registry.length).to.be.equal(1);
            css({ root : { color : 'red' } });
            expect(StyleSheet.registry.length).to.be.equal(1);
        });

        it('must be removed registry', () => {
            const instance = css({ root : { color : 'red' } });
            expect(StyleSheet.registry).to.include(instance);
            instance.destroy();
            expect(StyleSheet.registry).to.not.include(instance);
            expect(StyleSheet.registry.length).to.be.equal(0);
        });

        it('must be rendered as element', () => {
            const instance = css({ root : { color : 'red' } });
            const style = instance.el;
            expect(style.outerHTML).to.be.equal(`<style data-fun-uid="${instance.uid}">.${instance.prefix}-${instance.uid}-1{color:red;}</style>`);
        });

        it('must be instantiated with custom attributes', () => {
            const instance = css({ root : { color : 'red' } }, { attributes : { id : 'test' } });
            expect(instance.el.id).to.be.equal('test');
        });

        it('must generate stable UIDs', () => {
            const instance = css({ root : { color : 'red' } });
            const instance2 = css({ root : { color : 'red' } });
            expect(instance.uid).to.be.equal(instance2.uid);
        });

        it('must override generateUid', () => {
            const instance = css({ root : { color : 'red' } }, { generateUid() { return this.prefix + '-1'; } });
            expect(instance.uid).to.be.equal('fun-1');
            expect(instance.el.outerHTML).to.be.equal(`<style data-fun-uid="fun-1">.${instance.prefix}-${instance.uid}-1{color:red;}</style>`);
        });

        it('must override generateClassName', () => {
            const instance = css({ root : { color : 'red' } }, { generateClassName(className) { return `${this.uid}-${className}-test`; } });
            expect(instance.el.outerHTML).to.be.equal(`<style data-fun-uid="${instance.uid}">.${instance.uid}-root-test{color:red;}</style>`);
        });

        it('must be instantiated with custom prefix', () => {
            const instance = css({ root : { color : 'red' } }, { prefix : 'test' });
            expect(instance.classes).to.have.property('root');
            expect(instance.classes.root).to.be.equal(`${instance.prefix}-${instance.uid}-1`);
            expect(instance.el.outerHTML).to.be.equal(`<style data-test-uid="${instance.uid}">.${instance.prefix}-${instance.uid}-1{color:red;}</style>`);
        });

        it('must use class references', () => {
            const instance = css({
                root : {},
                button : {},
                '$root $button' : { color : 'blue' }
            });
            const style = instance.el;
            expect(style.outerHTML).to.be.equal(`<style data-fun-uid="${instance.uid}">.${instance.prefix}-${instance.uid}-1 .${instance.prefix}-${instance.uid}-2{color:blue;}</style>`);
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
            expect(style.outerHTML).to.be.equal(`<style data-fun-uid="${instance.uid}">.${instance.prefix}-${instance.uid}-1{color:red;}.${instance.prefix}-${instance.uid}-1:hover{color:blue;}</style>`);
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
            expect(style.outerHTML).to.be.equal(`<style data-fun-uid="${instance.uid}">.${instance.prefix}-${instance.uid}-1{margin:5px;}.${instance.prefix}-${instance.uid}-2{color:red;}.${instance.prefix}-${instance.uid}-2:hover{color:blue;}.${instance.prefix}-${instance.uid}-2:hover:active{color:green;}</style>`);
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
            expect(style.outerHTML).to.be.equal(`<style data-fun-uid="${instance.uid}">body{margin:0;}.${instance.prefix}-${instance.uid}-1{color:black;}</style>`);
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
            expect(style.outerHTML).to.be.equal(`<style data-fun-uid="${instance.uid}">.${instance.prefix}-${instance.uid}-1{color:black;}.${instance.prefix}-${instance.uid}-1 a{color:red;}.${instance.prefix}-${instance.uid}-2{color:blue;}</style>`);
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
            expect(style.outerHTML).to.be.equal(`<style data-fun-uid="${instance.uid}">.${instance.prefix}-${instance.uid}-1{color:black;}.${instance.prefix}-${instance.uid}-1 a{color:red;}</style>`);
        });

        it('must support media queries', () => {
            const instance = css({
                root : {},
                '@media (min-width: 768px)' : {
                    '$root' : {
                        color : 'black',
                        '@global a' : {
                            color : 'green'
                        }
                    },
                    '@global a' : {
                        color : 'red'
                    },
                    '@global' : {
                        h1 : {
                            color : 'blue'
                        }
                    }
                }
            });
            const style = instance.el;
            expect(style.outerHTML).to.be.equal(`<style data-fun-uid="${instance.uid}">@media (min-width: 768px){.${instance.prefix}-${instance.uid}-1{color:black;}.${instance.prefix}-${instance.uid}-1 a{color:green;}a{color:red;}h1{color:blue;}}</style>`);
        });

        it('must render all instances in registry as CSS string', () => {
            const instance1 = css({ root : { color : 'red' } });
            const instance2 = css({ button : { color : 'blue' } });
            const cssString = StyleSheet.toCSS();
            expect(cssString).to.be.equal(`.${instance1.prefix}-${instance1.uid}-1{color:red;}.${instance2.prefix}-${instance2.uid}-1{color:blue;}`);
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

        it('must create a new theme with light color scheme', () => {
            const theme = createTheme({}, { colorScheme : 'light' });
            expect(theme).to.be.instanceOf(StyleSheet);
            document.body.classList.add(theme.classes.root);
            expect(getComputedStyle(document.body).getPropertyValue('color-scheme')).to.be.equal('light');
        });

        it('must create a new theme with light and dark color schemes', () => {
            const theme = createTheme({ light : { color : 'red' }, dark : { color : 'blue' } });
            expect(theme).to.be.instanceOf(StyleSheet);
            document.body.classList.add(theme.classes.root);
            expect(getComputedStyle(document.body).getPropertyValue('--fun-color')).to.be.equal('red');
            expect(getComputedStyle(document.body).getPropertyValue('color-scheme')).to.be.equal('light');
            document.documentElement.setAttribute('data-color-scheme', 'dark');
            expect(getComputedStyle(document.body).getPropertyValue('--fun-color')).to.be.equal('blue');
            expect(getComputedStyle(document.body).getPropertyValue('color-scheme')).to.be.equal('dark');
        });

        it('must create a new theme with normal color scheme', () => {
            const theme = createTheme({ normal : { color : 'red' } }, { colorScheme : 'normal' });
            expect(theme).to.be.instanceOf(StyleSheet);
            document.body.classList.add(theme.classes.root);
            expect(getComputedStyle(document.body).getPropertyValue('--fun-color')).to.be.equal('red');
            expect(getComputedStyle(document.body).getPropertyValue('color-scheme')).to.be.equal('normal');
        });
    });
});
