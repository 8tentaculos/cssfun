import { expect } from 'chai';

import { css, StyleSheet } from '../src/index.js';

describe('cssfun', () => {
    beforeEach(() => {
        StyleSheet.destroy();
        StyleSheet.uid = 0; 
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
            instance.attach();
            const style = instance.el;
            expect(style).to.exist;
        });

        it('must be rendered as element', () => {
            const instance = css({ root : { color : 'red' } });
            instance.attach();
            const style = instance.el;
            expect(style.outerHTML).to.be.equal('<style id="fun-1">.fun-1-root-1{color:red;}</style>');
        });
 
        it('must be added to the registry', () => {
            const instance = css({ root : { color : 'red' } });
            instance.attach();
            expect(StyleSheet.registry).to.include(instance);
        });

        it('must be removed from head and registry', () => {
            const instance = css({ root : { color : 'red' } });
            instance.attach();
            instance.destroy();
            const style = instance.el;
            expect(style).to.not.exist;
            expect(StyleSheet.registry).to.not.include(instance);
        });

        it('must use class references', () => {
            const instance = css({
                root : {},
                button : {},
                '$root $button' : { color : 'blue' }
            });
            instance.attach();
            const style = instance.el;
            expect(style.outerHTML).to.be.equal('<style id="fun-1">.fun-1-root-1{}.fun-1-button-2{}.fun-1-root-1 .fun-1-button-2{color:blue;}</style>');
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
            instance.attach();
            const style = instance.el;
            expect(style.outerHTML).to.be.equal('<style id="fun-1">.fun-1-root-1{color:red;}.fun-1-root-1:hover{color:blue;}</style>');
        });

        it('must use global styles', () => {
            const instance = css({
                '@global' : {
                    body : {
                        margin : 0
                    }
                }
            });
            instance.attach();
            const style = instance.el;
            expect(style.outerHTML).to.be.equal('<style id="fun-1">body{margin:0;}</style>');
        });

        it('must use nested global styles', () => {
            const instance = css({
                root : {
                    '@global' : {
                        a : {
                            color : 'red'
                        }
                    }
                },
            });
            instance.attach();
            const style = instance.el;
            expect(style.outerHTML).to.be.equal('<style id="fun-1">.fun-1-root-1{}.fun-1-root-1 a{color:red;}</style>');
        });

        it('must support media queries', () => {
            const instance = css({
                '@media (min-width: 768px)' : {
                    a : {
                        color : 'red'
                    }
                }
            });
            instance.attach();
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
            instance.attach();
            const style = instance.el;
            expect(style.outerHTML).to.be.equal('<style id="fun-1">.fun-1-root-1{}@media (min-width: 768px){.fun-1-root-1{color:red;}}</style>');
        });
    });
});