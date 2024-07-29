import { css } from '@stitches/core'
import { generateClassNames } from '@supabase/auth-ui-shared'
//import { Appearance } from '../../types'

const labelDefaultStyles = css({
  fontFamily: '$labelFontFamily',
  fontSize: '$baseLabelSize',
  marginBottom: '$labelBottomMargin',
  color: '$inputLabelText',
  display: 'block',
})

const Label = ({ children, appearance, ...props }) => {
  const classNames = generateClassNames(
    'label',
    labelDefaultStyles(),
    appearance
  )

  return (
    <label
      {...props}
      style={appearance?.style?.label}
      className={classNames.join(' ')}
    >
      {children}
    </label>
  )
}

export { Label }
