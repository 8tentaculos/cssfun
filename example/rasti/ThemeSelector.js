import { Component } from 'rasti';
import { css } from 'cssfun';

const { classes } = css({
    label : {
        fontSize : '1.2rem',
        color : 'var(--fun-fg1)',
        marginBottom : '10px'
    },
    selector : {
        display : 'flex',
        justifyContent : 'center',
        gap : '10px',
        '& label' : {
            display : 'inline-block',
            padding : '10px 20px',
            background : 'var(--fun-labelBg)',
            border : '2px solid var(--fun-labelBorderColor)',
            borderRadius : '25px',
            cursor : 'pointer',
            transition : 'all 0.3s ease'
        },
        '& input' : {
            display : 'none'
        },
        '& input:checked + label' : {
            backgroundColor : '#00aaff',
            borderColor : '#00aaff',
            color : '#fff'
        },
        '& label:hover' : {
            backgroundColor : 'var(--fun-labelHoverBg)',
            borderColor : 'var(--fun-labelHoverBorderColor)'
        }
    },
});

const ThemeSelector = Component.create`
    <div>
        <div class="${classes.label}">Theme</div>
        <div class="${classes.selector}">
            <input
                type="radio"
                id="system"
                name="theme"
                value=""
                checked="${({ props }) => props.theme === ''}"
                onChange="${({ props }) => (ev) => props.setTheme(ev.target.value)}"
            />
            <label for="system">System</label>
            <input
                type="radio"
                id="light"
                name="theme"
                value="light"
                checked="${({ props }) => props.theme === 'light'}"
                onChange="${({ props }) => (ev) => props.setTheme(ev.target.value)}"
            />
            <label for="light">Light</label>
            <input
                type="radio"
                id="dark"
                name="theme"
                value="dark"
                checked="${({ props }) => props.theme === 'dark'}"
                onChange="${({ props }) => (ev) => props.setTheme(ev.target.value)}"
            />
            <label for="dark">Dark</label>
        </div>
    </div>
`;

export default ThemeSelector;
