import React from "react";
import htm from "htm";
import { css } from 'cssfun';

const h = htm.bind(React.createElement);

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
}).attach();

function ThemeSelector({ theme, setTheme }) {
    return h`
        <div>
            <div class="${classes.label}">Theme</div>
            <div class="${classes.selector}">
                <input
                    type="radio"
                    id="system"
                    name="theme"
                    value="system"
                    checked=${theme === 'system'}
                    onChange=${() => setTheme('system')}
                />
                <label for="system">System</label>
                
                <input
                    type="radio"
                    id="light"
                    name="theme"
                    value="light"
                    checked=${theme === 'light'}
                    onChange=${() => setTheme('light')}
                />
                <label for="light">Light</label>
                
                <input
                    type="radio"
                    id="dark"
                    name="theme"
                    value="dark"
                    checked=${theme === 'dark'}
                    onChange=${() => setTheme('dark')}
                />
                <label for="dark">Dark</label>
            </div>
        </div>
    `;
}

export default ThemeSelector;
