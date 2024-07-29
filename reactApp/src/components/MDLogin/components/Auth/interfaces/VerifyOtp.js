//import {
//  EmailOtpType,
//  MobileOtpType,
//  SupabaseClient,
//  VerifyOtpParams,
//} from '@supabase/supabase-js'
import React, { useState } from 'react'
import { VIEWS, /*I18nVariables, OtpType*/ } from '@supabase/auth-ui-shared'
//import { Appearance } from '../../../types.js'
import {
  Anchor,
  Button,
  Container,
  Input,
  Label,
  Message,
} from '../../UI/index.js'

function VerifyOtp({
  setAuthView = () => {},
  supabaseClient,
  otpType = 'email',
  i18n,
  appearance,
  showLinks = false,
}) {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    let verifyOpts = {
      email,
      token,
      type: otpType,
    }
    if (['sms', 'phone_change'].includes(otpType)) {
      verifyOpts = {
        phone,
        token,
        type: otpType,
      }
    }
    const { error } = await supabaseClient.auth.verifyOtp(verifyOpts)
    if (error) setError(error.message)
    setLoading(false)
  }

  const labels = i18n?.verify_otp

  return (
    <form id="auth-magic-link" onSubmit={handleSubmit}>
      <Container gap="large" direction="vertical" appearance={appearance}>
        {['sms', 'phone_change'].includes(otpType) ? (
          <div>
            <Label htmlFor="phone" appearance={appearance}>
              {labels?.phone_input_label}
            </Label>
            <Input
              id="phone"
              name="phone"
              type="text"
              autoFocus
              placeholder={labels?.phone_input_placeholder}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              appearance={appearance}
            />
          </div>
        ) : (
          <div>
            <Label htmlFor="email" appearance={appearance}>
              {labels?.email_input_label}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoFocus
              placeholder={labels?.email_input_placeholder}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              appearance={appearance}
            />
          </div>
        )}
        <div>
          <Label htmlFor="token" appearance={appearance}>
            {labels?.token_input_label}
          </Label>
          <Input
            id="token"
            name="token"
            type="text"
            placeholder={labels?.token_input_placeholder}
            onChange={(e) =>
              setToken(e.target.value)
            }
            appearance={appearance}
          />
        </div>
        <Button
          color="primary"
          type="submit"
          loading={loading}
          appearance={appearance}
        >
          {loading ? labels?.loading_button_label : labels?.button_label}
        </Button>
        {showLinks && (
          <Anchor
            href="#auth-sign-in"
            onClick={(e) => {
              e.preventDefault()
              setAuthView(VIEWS.SIGN_IN)
            }}
            appearance={appearance}
          >
            {i18n?.sign_in?.link_text}
          </Anchor>
        )}
        {message && <Message appearance={appearance}>{message}</Message>}
        {error && (
          <Message color="danger" appearance={appearance}>
            {error}
          </Message>
        )}
      </Container>
    </form>
  )
}

export { VerifyOtp }
