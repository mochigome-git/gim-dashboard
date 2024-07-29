import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import MDBox from '../../../../components/MDBox';
import MDTypography from '../../../../components/MDTypography';
import CoverLayout from '../../../../layouts/authentication/components/CoverLayout';
import bgImage from '../../../../assets/images/bg-sign-in-basic.jpeg';
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from "@supabase/auth-ui-shared";

const ResetPassword = () => {
  const [authTitle,] = useState('Reset Password');
  const [authSubTitle,] = useState('Reset your new password.');
  //const [countdown, setCountdown] = useState(3);
  //const [signoutCountdownActive, setSignoutCountdownActive] = useState(false);
  const navigate = useNavigate();

  //const startCountdown = () => {
  //  setSignoutCountdownActive(true);
  //  const timer = setTimeout(() => {
  //    setSignoutCountdownActive(false);
  //    supabase.auth.signOut();
  //    redirectToLogin();
  //  }, countdown * 1000);
  //
  //  const interval = setInterval(() => {
  //    setCountdown((prevCountdown) => Math.max(0, prevCountdown - 1));
  //  }, 1000);
  //
  //  return () => {
  //    clearTimeout(timer);
  //    clearInterval(interval);
  //  };
  //};
  //
  //const redirectToLogin = () => {
  //  navigate('/');
  //};

  //useEffect(() => {
  //  const checkSessionValidity = (session, event) => {
  //    if (session && session.user && (session.user.updated_at || event)) {
  //      const userUpdatedAt = new Date(session.user.updated_at).toLocaleTimeString();
  //      const currentTime = new Date().toLocaleTimeString();
  //
  //      if (userUpdatedAt === currentTime && event === 'USER_UPDATED') {
  //        startCountdown();
  //      }
  //    }
  //  };

  //const handleAuthStateChange = (event, session) => {
  //  checkSessionValidity(session, event);
  //};
  //
  //// Subscribe to the onAuthStateChange event
  //supabase.auth.onAuthStateChange(handleAuthStateChange);
  //// eslint-disable-next-line react-hooks/exhaustive-deps
  // []);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'USER_UPDATED') {
        supabase.auth.signOut();
        setTimeout(() => {
          navigate('/');
           }, 100);
      }
    });
  }, []);

  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card variant="outlined" sx={{ width: 400 }} style={{ backgroundColor: '#212121' }}>
        <MDBox borderRadius="lg" mx={2} mt={3} py={2} mb={-4} textAlign="center">
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            {authTitle}
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            {authSubTitle}
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <Auth
            supabaseClient={supabase}
            view="update_password"
            appearance={{ theme: ThemeSupa, style: { anchor: { color: 'grey' } } }}
            theme="dark"
          />
        </MDBox>
        {/*{signoutCountdownActive && (
        <MDBox textAlign="center" fontSize="14px" fontFamily="sans-serif">
          Your password has been updated
        </MDBox>
      )}
      {signoutCountdownActive && (
        <MDBox textAlign="center" my={2} position="relative">
          <MDTypography color="white" my={1}>
            Redirecting in {countdown} seconds...
          </MDTypography>
        </MDBox>
      )}*/}
      </Card>
    </CoverLayout>
  );
};

export default ResetPassword;
