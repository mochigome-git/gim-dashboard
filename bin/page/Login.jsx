// src/Login.jsx
import { supabase } from "./lib/supabase";
import { Auth,ThemeSupa } from '@supabase/auth-ui-react'

const Login = () => (
    <div style={{ textAlign: "center" }}>
      <div>
        <h1>ログイン</h1>
      </div>
          <div>
            <Auth
              supabaseClient={supabase}
              //highlight-start
              appearance={{ theme: ThemeSupa, style:{anchor:{color: 'black' }}}}
              theme="dark"
              localization={{
              variables: {
              sign_in: {
                        email_label: '',
                        email_input_placeholder: "email address",
                        password_input_placeholder: "password",
                        password_label: '',
                      },
                    },
                  }}
              //highlight-end
            />
      </div>
    </div>
)

export default Login;
