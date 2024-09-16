
import { Component, Model } from 'rasti';
import { css } from 'cssfun';

import ThemeSelector from './ThemeSelector.js';

const { classes } = css({
    '@global': {
        body: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'var(--fun-bg1)',
            margin: 0,
            fontFamily: 'Arial, sans-serif',
            color: 'var(--fun-fg2)'
        },
    },
    root: {
        textAlign: 'center',
        position: 'relative'
    },
    title: {
        fontSize: '2.5rem',
        color: 'var(--fun-fg1)',
        marginBottom: '20px'
    },
    catWrapper: {
        position: 'relative',
        display: 'inline-block',
        padding: '20px',
        background: 'var(--fun-cat-wrapper-bg)',
        borderRadius: '15px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        marginBottom: '60px'
    },
    cat: {
        fontSize: '5rem',
        display: 'inline-block',
        transformOrigin: 'bottom center',
        animation: 'wave 2s infinite ease-in-out'
    },
    '@keyframes wave': {
        '0%, 100%': {
            transform: 'rotate(10deg)'
        },
        '50%': {
            transform: 'rotate(-10deg)'
        }
    },
    text: {
        marginTop: '10px',
        fontSize: '1.5rem',
        color: 'var(--fun-fg3)'
    },
}).attach();

const App = Component.create`
    <div class="${classes.root}">
        <div class="${classes.title}">Hello from the Waving Cat!</div>
        <div class="${classes.catWrapper}">
            <div class="${classes.cat}">🐱</div>
            <div class="${classes.text}">*waves paw*</div>
        </div>
        ${() => ThemeSelector.mount({
            theme : document.documentElement.getAttribute('data-color-scheme') || 'system',
            setTheme : (theme) => {
                document.documentElement.setAttribute('data-color-scheme', theme);
            }
        })}
    </div>
`;

export default App;