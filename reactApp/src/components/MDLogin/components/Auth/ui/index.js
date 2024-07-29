import React from 'react';
import Auth from '../Auth';
import { PREPENDED_CLASS_NAMES } from '@supabase/auth-ui-shared';
import { css } from '@stitches/core';

const containerDefaultStyles = css({
  borderRadius: '12px',
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  width: '360px',
  padding: '28px 32px',
});

export const AuthCard = ({ children, appearance }) => {
  const classNames = [
    `${PREPENDED_CLASS_NAMES}_ui-card`,
    containerDefaultStyles(),
    appearance?.className,
  ];
  return <div className={classNames.join(' ')}>{children}</div>;
};

export const SignUp = (props) => {
  return (
    <Auth
      showLinks={false}
      {...props}
      onlyThirdPartyProviders={false}
      view="sign_up"
    />
  );
};

export const SignIn = (props) => {
  return (
    <Auth
      showLinks={false}
      {...props}
      onlyThirdPartyProviders={false}
      view="sign_in"
    />
  );
};

export const MagicLink = (props) => {
  return <Auth {...props} view="magic_link" showLinks={false} />;
};

export const SocialAuth = (props) => {
  return (
    <Auth
      {...props}
      view="sign_in"
      showLinks={false}
      onlyThirdPartyProviders={true}
    />
  );
};

export const ForgottenPassword = (props) => {
  return <Auth showLinks={false} {...props} view="forgotten_password" />;
};

export const UpdatePassword = (props) => {
  return <Auth {...props} view="update_password" />;
};

export const VerifyOtp = (props) => {
  return <Auth {...props} view="verify_otp" />;
};
