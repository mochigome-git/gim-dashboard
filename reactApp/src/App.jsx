import { useState, useEffect} from "react";
import { supabase } from "./lib/supabase";
import Home from "./Home";
import Login from "./layouts/authentication/login"

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

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
  const {layout,darkMode} = controller;

  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
 
    // Set the timestamp of the user's last activity in the localStorage object
    localStorage.setItem('lastActivity', Date.now().toString());
  }, [])
  
  useEffect(() => {
    const checkLastActivity = () => {
      const lastActivity = localStorage.getItem('lastActivity');
      const now = Date.now();
      const diff = now - lastActivity;
        
      // If the time difference is more than 15 minutes, log out the user and set a flag in sessionStorage
      if (diff > 15 * 60 * 1000 && !sessionStorage.getItem('signedOut')) {
        supabase.auth.signOut().then(() => {
          setSession(null);
          localStorage.clear();
          sessionStorage.setItem('signedOut', 'true');
        });
      } else {
        // Set the timestamp of the user's current activity in the localStorage object
        localStorage.setItem('lastActivity', now.toString());
      }
    }
      
    const interval = setInterval(checkLastActivity, 60 * 1000);
      
    return () => clearInterval(interval);
  }, [session]);

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "vr" && <Configurator />}
      {!session ? (<Login />) : (<Home key={session.user.id} session={session} />)}
    </ThemeProvider>
  );
}

export default App;
