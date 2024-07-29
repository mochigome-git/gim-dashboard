import { css } from '@stitches/core'
import { generateClassNames } from '@supabase/auth-ui-shared'
//import { Appearance } from '../../types'
import React from 'react';

const dividerDefaultStyles = css({
  background: '$dividerBackground',
  display: 'block',
  margin: '16px 0',
  height: '1px',
  width: '100%',
})

const Divider = ({
  children,
  appearance,
  ...props
}) => {
  const classNames = generateClassNames(
    'divider',
    dividerDefaultStyles(),
    appearance
  )

  return (
    <div
      {...props}
      style={appearance?.style?.divider}
      className={classNames.join(' ')}
    ></div>
  )
}

export { Divider }
