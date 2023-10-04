import { useState, useEffect, useRef } from "react";
import { supabase } from "./lib/supabase";
import Home from "./Home";
import Login from "./layouts/authentication/login"
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Dashboard 2 Custom component
import MDSnackbar from "./components/MDSnackbar";

// Material Dashboard 2 React example components
import Configurator from "./examples/Configurator";

// Material Dashboard 2 React themes
import theme from "./assets/theme";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "./assets/theme-dark";

// Material Dashboard 2 React contexts
import { useMaterialUIController} from "./context";

const App = () => {
  const [controller] = useMaterialUIController();
  const { layout, darkMode } = controller;
  const [session, setSession] = useState(null);
  const [showLogoutNotification, setShowLogoutNotification] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const Timenow = new Date(Date.now()).toLocaleString();
  const lastActivityRef = useRef(Date.now());


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    let interval;

    const checkLastActivity = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const signIn = new Date(user.last_sign_in_at).toLocaleDateString();
        const today = new Date().toLocaleDateString();

        if (signIn !== today) {
          //logoutUser();
        } else if (signIn === today) {
          const now = Date.now();
          const diff = now - lastActivityRef.current;

          if (diff > 30 * 60 * 1000) { //30 Minute x 60 Second x 1000 millisecond
            //logoutUser();
          } else {
            localStorage.setItem("lastActivity", now.toString());
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    const startInterval = () => {
      interval = setInterval(checkLastActivity, 30 * 60 * 1000);
    };

    const stopInterval = () => {
      clearInterval(interval);
    };

    /*const logoutUser = async () => {
      try {
        //await supabase.auth.signOut();
        setSession(null);
        openErrorSB();
        localStorage.clear();
        sessionStorage.setItem("signedOut", "true");
        // Show the logout notification window when the user logs out
        setShowLogoutNotification(true);
      } catch (error) {
        console.error(error);
      }
    };*/

    startInterval();

    // Add global event listeners for user activity
    document.addEventListener("mousemove", handleActivity);
    document.addEventListener("keydown", handleActivity);

    return () => {
      stopInterval();
      // Remove the global event listeners when the component unmounts
      document.removeEventListener("mousemove", handleActivity);
      document.removeEventListener("keydown", handleActivity);
    };
  }, []);

  // Handle activity function to update the ref
  const handleActivity = () => {
    lastActivityRef.current = Date.now();
  };
  
  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {showLogoutNotification && (
        <MDSnackbar
        color="error"
        icon={<NotificationsActiveIcon/>}
        icon2={<NotificationsActiveIcon/>}
        inlineColor="transparent"
        title="Session Timeout:"
        content="Inactive for more than 30 minutes."
        content2="You have been logged out."
        dateTime={Timenow}
        open={errorSB}
        onClose={closeErrorSB}
        close={closeErrorSB}
        bgWhite
      />
      )}
      {layout === "vr" && <Configurator />}
      {!session ? <Login /> : <Home key={session.user.id} session={session} />}
    </ThemeProvider>
  );
};

export default App;