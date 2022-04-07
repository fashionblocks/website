import React, { PropsWithChildren } from 'react';
import { createUseStyles } from 'react-jss';

import classnames from 'classnames';
import Color from 'color';

import Theming, { DefaultTheme } from '../../Theming';

type P = PropsWithChildren<Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> & {
    fluid?: boolean,
    primary?: boolean,
    size?: 'm' | 'l',
    disabled?: boolean | 'shallow',
}>;

function Button({ className, fluid, primary, size, disabled, children, ...rest }: P) {
    const classes = useStyles({ theme: Theming.useTheme(), fluid, primary, size, disabled, ...rest });

    return (
        <button className={classnames(className, classes.c)} disabled={disabled && 'shallow' !== disabled} {...rest}>
            {children}
        </button>
    );
}

export default Button;

const useStyles = createUseStyles(({ fontSize, color }: typeof DefaultTheme) => ({
    c: {
        width: ({ fluid }: P) => fluid && '100%',
        minWidth: ({ size }: P) => ({ 'm': '104px', 'l': '120px' }[size || 'm']),
        height: ({ size }: P) => ({ 'm': '40px', 'l': '48px' }[size || 'm']),
        background: ({ disabled, primary }: P) => {
            const c = disabled ? color.disabled.background : color.primary;

            return primary ? c : Color(c).mix(Color('white'), .85).hex();
        },
        border: 'none',
        borderRadius: '1000px',
        outline: 'none',
        fontSize: fontSize.text,
        fontWeight: 'bold',
        color: ({ disabled, primary }: P) => primary ? color.inverse : (disabled ? color.disabled.foreground : color.primary),
        cursor: 'pointer',
    },
}), { theming: Theming });
