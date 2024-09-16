import { Component } from 'rasti';
import { css } from 'cssfun';

const { classes } = css({
    label: {
        fontSize: '1.2rem',
        color: 'var(--fun-fg1)',
        marginBottom: '10px'
    },
    selector: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        '& label': {
            display: 'inline-block',
            padding: '10px 20px',
            background: 'var(--fun-label-bg)',
            border: '2px solid var(--fun-label-border-color)',
            borderRadius: '25px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        },
        '& input': {
            display: 'none'
        },
        '& input:checked + label': {
            backgroundColor: '#00aaff',
            borderColor: '#00aaff',
            color: '#fff'
        },
        '& label:hover': {
            backgroundColor: 'var(--fun-label-hover-bg)',
            borderColor: 'var(--fun-label-hover-border-color)'
        }
    },
}).attach();

const ThemeSelector = Component.create`
    <div onChange=${{ 'input' : function(ev) { this.options.setTheme(ev.target.value) } }}>
        <div class="${classes.label}">Theme</div>
        <div class="${classes.selector}">
            <input
                type="radio"
                id="system"
                name="theme"
                value="system"
                checked=${({ options }) => options.theme === 'system'}
            />
            <label for="system">System</label>
            
            <input
                type="radio"
                id="light"
                name="theme"
                value="light"
                checked=${({ options }) => options.theme === 'light'}
            />
            <label for="light">Light</label>
            
            <input
                type="radio"
                id="dark"
                name="theme"
                value="dark"
                checked=${({ options }) => options.theme === 'dark'}
            />
            <label for="dark">Dark</label>
        </div>
    </div>
`.extend({
    onChange(){}
});

export default ThemeSelector;
