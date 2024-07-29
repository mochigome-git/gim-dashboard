import React, { useState } from 'react';
//import { SupabaseClient } from '@supabase/supabase-js';
import { VIEWS, /*I18nVariables, RedirectTo*/ } from '@supabase/auth-ui-shared';
//import { Appearance } from '../../../types.js';
import {
  Anchor,
  Button,
  Container,
  Input,
  Label,
  Message,
} from '../../UI/index.js';
import { Turnstile } from '@marsidev/react-turnstile'

function ForgottenPassword({
  setAuthView = () => { },
  supabaseClient,
  redirectTo,
  i18n,
  appearance,
  showLinks = false,
}) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState()

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo,
      captchaToken,
    });
    if (error) setError(error.message);
    else setMessage(i18n?.forgotten_password?.confirmation_text);
    setLoading(false);
  };

  const labels = i18n?.forgotten_password;

  return (
    <form id="auth-forgot-password" onSubmit={handlePasswordReset}>
      <Container direction="vertical" gap="large" appearance={appearance}>
        <Container gap="large" direction="vertical" appearance={appearance}>
          <div>
            <Label htmlFor="email" appearance={appearance}>
              {labels?.email_label}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoFocus
              placeholder={labels?.email_input_placeholder}
              onChange={(e) => setEmail(e.target.value)}
              appearance={appearance}
            />
          </div>
          <Button
            type="submit"
            color="primary"
            loading={loading}
            appearance={appearance}
          >
            {loading ? labels?.loading_button_label : labels?.button_label}
          </Button>
          <Turnstile
            siteKey="0x4AAAAAAAX3GSTvuLDKoBLe"
            onSuccess={(token) => {
              setCaptchaToken(token)
            }}
          />
          {showLinks && (
            <Anchor
              href="#auth-sign-in"
              onClick={(e) => {
                e.preventDefault();
                setAuthView(VIEWS.SIGN_IN);
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
      </Container>
    </form>
  );
}

export { ForgottenPassword };
