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
                ${({ options }) => options.theme === 'system' ? 'checked' : ''}
            />
            <label for="system">System</label>
            
            <input
                type="radio"
                id="light"
                name="theme"
                value="light"
                ${({ options }) => options.theme === 'light' ? 'checked' : ''}
            />
            <label for="light">Light</label>
            
            <input
                type="radio"
                id="dark"
                name="theme"
                value="dark"
                ${({ options }) => options.theme === 'dark' ? 'checked' : ''}
            />
            <label for="dark">Dark</label>
        </div>
    </div>
`.extend({
    onChange(){}
});

export default ThemeSelector;
