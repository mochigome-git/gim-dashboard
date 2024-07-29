import { css } from '@stitches/core'
import { generateClassNames } from '@supabase/auth-ui-shared'
//import { Appearance } from '../../types'

const messageDefaultStyles = css({
  fontFamily: '$bodyFontFamily',
  fontSize: '$baseInputSize',
  marginBottom: '$labelBottomMargin',
  display: 'block',
  textAlign: 'center',
  borderRadius: '0.375rem',
  padding: '1.5rem 1rem',
  lineHeight: '1rem',
  color: '$messageText',
  backgroundColor: '$messageBackground',
  border: '1px solid $messageBorder',
  variants: {
    color: {
      danger: {
        color: '$messageTextDanger',
        backgroundColor: '$messageBackgroundDanger',
        border: '1px solid $messageBorderDanger',
      },
    },
  },
})

const Message = ({
  children,
  appearance,
  ...props
}) => {
  const classNames = generateClassNames(
    'message',
    messageDefaultStyles({ color: props.color }),
    appearance
  )

  return (
    <span
      {...props}
      style={appearance?.style?.message}
      className={classNames.join(' ')}
    >
      {children}
    </span>
  )
}

export { Message }
