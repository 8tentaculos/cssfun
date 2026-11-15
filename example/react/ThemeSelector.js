import { createElement, Fragment } from 'react';
import htm from 'htm';
import { css } from 'cssfun';

const h = htm.bind(createElement);

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

function ThemeSelector({ theme, onChange }) {
    return h`
        <div>
            <div className=${classes.label}>Theme</div>
            <div className=${classes.selector}>
                ${options.map(({ id, value, label }) => h`
                    <${Fragment} key=${id}>
                        <input
                            type="radio"
                            id=${id}
                            name="theme"
                            value=${value}
                            checked=${theme === value}
                            onChange=${() => onChange(value)}
                        />
                        <label htmlFor=${id}>${label}</label>
                    <//>
                `)}
            </div>
        </div>
    `;
}

export default ThemeSelector;
