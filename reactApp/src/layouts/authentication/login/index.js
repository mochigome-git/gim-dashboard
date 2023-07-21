
// @mui material components
import Card from "@mui/material/Card";
import DashboardIcon from '@mui/icons-material/Dashboard';

// Material Dashboard 2 React components
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import Grid from "@material-ui/core/Grid";

// Authentication layout components
import CoverLayout from "../components/CoverLayout";

// Supabase ccomponents
import { supabase } from "../../../lib/supabase";
import { Auth,ThemeSupa } from '@supabase/auth-ui-react'

// Images
import bgImage from "../../../assets/images/bg-sign-up-cover.jpeg";
import Helmet from 'react-helmet';

function Login() {
  return (
    <CoverLayout image={bgImage}>
      <Helmet bodyAttributes={{style: 'background-color : #262626'}}/>
      <Card variant="outlined" sx={{ width: 350 }} style={{backgroundColor: "#212121"}}>
        <MDBox
          variant="contained"
          bgColor="#212121"
          borderRadius="lg"
          coloredShadow="none"
          mx={1}
          mt={3}
          p={3}
        >
          <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
            <Grid style={{ display: "flex" }}>
              <DashboardIcon style={{ marginRight: '5px' }} fontSize="medium"/> 実績ダッシュボード
            </Grid>
          </MDTypography>
        </MDBox>
        <MDBox pt={0} pb={3} px={3}>
            <MDBox display="flex" alignItems="center" ml={-1}>
            </MDBox>
            <Auth
              supabaseClient={supabase}
              redirectTo="http://192.168.0.6:3001/authentication/reset-password"
              //highlight-start
              appearance={{ theme: ThemeSupa, style:{anchor:{color: 'grey' }}}}
              theme="dark"
              localization={{
              variables: {
              sign_in: {
                        email_label: 'Login',
                        email_input_placeholder: "email address",
                        password_input_placeholder: "password",
                        password_label: '',
                      },
              sign_up: {
                        email_label: 'Sign up',
                        password_label: '',
                        email_input_placeholder: 'new email address',
                        password_input_placeholder: 'new password',
                      },
                    },
                  }}
              //highlight-end
            />
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Login;

