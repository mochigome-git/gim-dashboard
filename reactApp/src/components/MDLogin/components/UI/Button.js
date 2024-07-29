import { css } from '@stitches/core'
import { generateClassNames } from '@supabase/auth-ui-shared'
//import { Appearance } from '../../types'
import React from 'react';

const buttonDefaultStyles = css({
  fontFamily: '$buttonFontFamily',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  borderRadius: '$borderRadiusButton',
  fontSize: '$baseButtonSize',
  padding: '$buttonPadding',
  cursor: 'pointer',
  borderWidth: '$buttonBorderWidth',
  borderStyle: 'solid',
  width: '100%',

  transitionProperty: 'background-color',
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  transitionDuration: '100ms',
  '&:disabled': {
    opacity: 0.7,
    cursor: 'unset',
  },
  variants: {
    color: {
      default: {
        backgroundColor: '$defaultButtonBackground',
        color: '$defaultButtonText',
        borderColor: '$defaultButtonBorder',
        '&:hover:not(:disabled)': {
          backgroundColor: '$defaultButtonBackgroundHover',
        },
      },
      primary: {
        backgroundColor: '$brand',
        color: '$brandButtonText',
        borderColor: '$brandAccent',
        '&:hover:not(:disabled)': {
          backgroundColor: '$brandAccent',
        },
      },
    },
  },
})


const Button = ({
  children,
  color = 'default',
  appearance,
  icon,
  loading = false,
  ...props
}) => {
  const classNames = generateClassNames(
    'button',
    buttonDefaultStyles({ color: color }),
    appearance
  )

  return (
    <button
      {...props}
      style={appearance?.style?.button}
      className={classNames.join(' ')}
      disabled={loading}
    >
      {icon}
      {children}
    </button>
  )
}

export { Button }
