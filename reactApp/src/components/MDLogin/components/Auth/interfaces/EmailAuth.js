import React, { useEffect, useRef, useState } from 'react';
import {
  //RedirectTo,
  //ViewSignUp,
  //ViewSignIn,
  VIEWS,
  //ViewType,
} from '@supabase/auth-ui-shared';
import { Container, Input, Label, Message, Button, Anchor } from '../../UI/index.js';
import { Turnstile } from '@marsidev/react-turnstile'

export const EmailAuth = ({
  authView = 'sign_in',
  defaultEmail = '',
  defaultPassword = '',
  setAuthView = () => { },
  setDefaultEmail = (email) => { },
  setDefaultPassword = (password) => { },
  supabaseClient,
  showLinks = false,
  redirectTo,
  additionalData,
  magicLink,
  i18n,
  appearance,
  passwordLimit = false,
  children,
}) => {
  const isMounted = useRef(true);
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState()

  useEffect(() => {
    isMounted.current = true;
    setEmail(defaultEmail);
    setPassword(defaultPassword);

    return () => {
      isMounted.current = false;
    };
  }, [authView]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    switch (authView) {
      default:
      case 'sign_in':
        const { error: signInError } = await supabaseClient.auth.signInWithPassword({
          email,
          password,
          options: { captchaToken },
        });
        if (signInError) setError(signInError.message);
        break;
      case 'sign_up':
        if (passwordLimit && password.length > 72) {
          setError('Password exceeds maximum length of 72 characters');
          return;
        }
        let options = {
          emailRedirectTo: redirectTo,
        };
        if (additionalData) {
          options.data = additionalData;
        }
        const {
          data: { user: signUpUser, session: signUpSession },
          error: signUpError,
        } = await supabaseClient.auth.signUp({
          email,
          password,
          options: { captchaToken },
        });
        if (signUpError) setError(signUpError.message);
        else if (signUpUser && !signUpSession)
          setMessage(i18n?.sign_up?.confirmation_text);
        break;
    }

    if (isMounted.current) setLoading(false);
  };

  const handleViewChange = (newView) => {
    setDefaultEmail(email);
    setDefaultPassword(password);
    setAuthView(newView);
  };

  const labels = i18n?.[authView];

  return (
    <form
      id={authView === 'sign_in' ? 'auth-sign-in' : 'auth-sign-up'}
      onSubmit={handleSubmit}
      autoComplete="on"
      style={{ width: '100%' }}
    >
      <Container direction="vertical" gap="large" appearance={appearance}>
        <Container direction="vertical" gap="large" appearance={appearance}>
          <div>
            <Label htmlFor="email" appearance={appearance}>
              {labels?.email_label}
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder={labels?.email_input_placeholder}
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              appearance={appearance}
            />
          </div>
          <div>
            <Label htmlFor="password" appearance={appearance}>
              {labels?.password_label}
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder={labels?.password_input_placeholder}
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={
                authView === 'sign_in' ? 'current-password' : 'new-password'
              }
              appearance={appearance}
            />
          </div>
          {children}
        </Container>

        <Turnstile
          siteKey="0x4AAAAAAAX3GSTvuLDKoBLe"
          onSuccess={(token) => {
            setCaptchaToken(token)
          }}
        />

        <Button
          type="submit"
          color="primary"
          loading={loading}
          appearance={appearance}
        >
          {loading ? labels?.loading_button_label : labels?.button_label}
        </Button>

        {showLinks && (
          <Container direction="vertical" gap="small" appearance={appearance}>
            {authView === VIEWS.SIGN_IN && magicLink && (
              <Anchor
                href="#auth-magic-link"
                onClick={(e) => {
                  e.preventDefault();
                  setAuthView(VIEWS.MAGIC_LINK);
                }}
                appearance={appearance}
              >
                {i18n?.magic_link?.link_text}
              </Anchor>
            )}
            {authView === VIEWS.SIGN_IN && (
              <Anchor
                href="#auth-forgot-password"
                onClick={(e) => {
                  e.preventDefault();
                  setAuthView(VIEWS.FORGOTTEN_PASSWORD);
                }}
                appearance={appearance}
              >
                {i18n?.forgotten_password?.link_text}
              </Anchor>
            )}
            {authView === VIEWS.SIGN_IN ? (
              <Anchor
                href="#auth-sign-up"
                onClick={(e) => {
                  e.preventDefault();
                  handleViewChange(VIEWS.SIGN_UP);
                }}
                appearance={appearance}
              >
                {i18n?.sign_up?.link_text}
              </Anchor>
            ) : (
              <Anchor
                href="#auth-sign-in"
                onClick={(e) => {
                  e.preventDefault();
                  handleViewChange(VIEWS.SIGN_IN);
                }}
                appearance={appearance}
              >
                {i18n?.sign_in?.link_text}
              </Anchor>
            )}
          </Container>
        )}
      </Container>
      {message && <Message appearance={appearance}>{message}</Message>}
      {error && (
        <Message color="danger" appearance={appearance}>
          {error}
        </Message>
      )}
    </form>
  );
};

export default EmailAuth;
