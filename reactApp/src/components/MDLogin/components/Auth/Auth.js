import React, { useEffect, useState } from 'react';
import { createStitches, createTheme } from '@stitches/core';
import { /*I18nVariables,*/ merge, VIEWS, en } from '@supabase/auth-ui-shared';
import {
  EmailAuth,
  ForgottenPassword,
  MagicLink,
  SocialAuth,
  UpdatePassword,
  VerifyOtp,
} from './interfaces';
import { UserContextProvider, useUser } from './UserContext';

function Auth({
  supabaseClient,
  socialLayout = 'vertical',
  providers,
  providerScopes,
  queryParams,
  view = 'sign_in',
  redirectTo,
  onlyThirdPartyProviders = false,
  magicLink = false,
  showLinks = true,
  appearance,
  theme = 'default',
  localization = { variables: {} },
  otpType = 'email',
  additionalData,
  passwordLimit,
  children,
}) {
  const i18n = merge(en, localization.variables ?? {});
  //const [captchaToken, setCaptchaToken] = useState()
  const [authView, setAuthView] = useState(view);
  const [defaultEmail, setDefaultEmail] = useState('');
  const [defaultPassword, setDefaultPassword] = useState('');
  const SignView =
    authView === 'sign_in' ||
    authView === 'sign_up' ||
    authView === 'magic_link'

  useEffect(() => {
    createStitches({
      theme: merge(
        appearance?.theme?.default ?? {},
        appearance?.variables?.default ?? {}
      ),
    })
  }, [appearance])

  useEffect(() => {
    createStitches({
      theme: merge(appearance?.theme?.default ?? {}, appearance?.variables?.default ?? {}),
    });
  }, [appearance]);

  const Container = ({ children }) => (
    <div
      className={
        theme !== 'default'
          ? createTheme(merge(appearance?.theme[theme], appearance?.variables?.[theme] ?? {}))
          : ''
      }
    >
      {SignView && (
        <SocialAuth
          appearance={appearance}
          supabaseClient={supabaseClient}
          providers={providers}
          providerScopes={providerScopes}
          queryParams={queryParams}
          socialLayout={socialLayout}
          redirectTo={redirectTo}
          onlyThirdPartyProviders={onlyThirdPartyProviders}
          i18n={i18n}
          view={authView}
        />
      )}
      {!onlyThirdPartyProviders && children}
    </div>
  );

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setAuthView('update_password');
      } else if (event === 'USER_UPDATED') {
        setAuthView('sign_in');
      }
    });
    setAuthView(view);

    return () => authListener.subscription.unsubscribe();
  }, [view]);

  const emailProp = {
    supabaseClient,
    setAuthView,
    defaultEmail,
    defaultPassword,
    setDefaultEmail,
    setDefaultPassword,
    redirectTo,
    magicLink,
    showLinks,
    i18n,
    appearance,
    passwordLimit,
  };

  switch (authView) {
    case VIEWS.SIGN_IN:
      return (
        <Container>
          <EmailAuth {...emailProp} authView={'sign_in'} />
        </Container>
      );
    case VIEWS.SIGN_UP:
      return (
        <Container>
          <EmailAuth
            appearance={appearance}
            supabaseClient={supabaseClient}
            authView={'sign_up'}
            setAuthView={setAuthView}
            defaultEmail={defaultEmail}
            defaultPassword={defaultPassword}
            setDefaultEmail={setDefaultEmail}
            setDefaultPassword={setDefaultPassword}
            redirectTo={redirectTo}
            magicLink={magicLink}
            showLinks={showLinks}
            i18n={i18n}
            additionalData={additionalData}
            passwordLimit={passwordLimit}
            children={children}
          />
        </Container>
      );
    case VIEWS.FORGOTTEN_PASSWORD:
      return (
        <Container>
          <ForgottenPassword
            appearance={appearance}
            supabaseClient={supabaseClient}
            setAuthView={setAuthView}
            redirectTo={redirectTo}
            showLinks={showLinks}
            i18n={i18n}
          />
        </Container>
      );

    case VIEWS.MAGIC_LINK:
      return (
        <Container>
          <MagicLink
            appearance={appearance}
            supabaseClient={supabaseClient}
            setAuthView={setAuthView}
            redirectTo={redirectTo}
            showLinks={showLinks}
            i18n={i18n}
          />
        </Container>
      );

    case VIEWS.UPDATE_PASSWORD:
      return (
        <Container>
          <UpdatePassword
            appearance={appearance}
            supabaseClient={supabaseClient}
            i18n={i18n}
            passwordLimit={passwordLimit}
          />
        </Container>
      );
    case VIEWS.VERIFY_OTP:
      return (
        <Container>
          <VerifyOtp
            appearance={appearance}
            supabaseClient={supabaseClient}
            otpType={otpType}
            i18n={i18n}
          />
        </Container>
      );
    default:
      return null;
  }
}

Auth.ForgottenPassword = ForgottenPassword;
Auth.UpdatePassword = UpdatePassword;
Auth.MagicLink = MagicLink;
Auth.UserContextProvider = UserContextProvider;
Auth.useUser = useUser;

export default Auth;
