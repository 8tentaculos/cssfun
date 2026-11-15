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

const options = [
    { id : 'theme-system', value : '', label : 'System' },
    { id : 'theme-light', value : 'light', label : 'Light' },
    { id : 'theme-dark', value : 'dark', label : 'Dark' }
];

const ThemeSelector = Component.create(({ props, html }) => html`
    <div>
        <div class="${classes.label}">Theme</div>
        <div class="${classes.selector}" onChange=${(ev) => props.handleChange(ev.target.value)}>
            ${options.map(({ id, value, label }) => html`
                <input type="radio" id="${id}" name="theme" value="${value}" checked="${props.theme === value}" />
                <label for="${id}">${label}</label>
            `)}
        </div>
    </div>
`);

export default ThemeSelector;
