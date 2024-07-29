import React, { useState } from 'react';
//import { SupabaseClient } from '@supabase/supabase-js';
import {
  //I18nVariables,
  //ProviderScopes,
  //SocialLayout,
  template,
} from '@supabase/auth-ui-shared';
//import { Appearance } from '../../../types.js';
import { Button, Container, Divider } from '../../UI/index.js';
import { Icons } from '../Icons.js';

function SocialAuth({
  supabaseClient,
  socialLayout = 'vertical',
  providers = ['github', 'google', 'azure'],
  providerScopes,
  queryParams,
  redirectTo,
  onlyThirdPartyProviders = true,
  view = 'sign_in',
  i18n,
  appearance,
}) {
  const [loading, setLoading] = useState(false);
  const [, setError] = useState('');

  const verticalSocialLayout = socialLayout === 'vertical' ? true : false;

  const currentView = view === 'magic_link' ? 'sign_in' : view;

  const handleProviderSignIn = async (provider) => {
    setLoading(true);
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
        scopes: providerScopes?.[provider],
        queryParams,
      },
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  function handleProviderNameEdgeCases(provider) {
    if (provider === 'linkedin_oidc') {
      return 'LinkedIn';
    }
    return provider;
  }

  function capitalize(word) {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
  }

  return (
    <>
      {providers && providers.length > 0 && (
        <>
          <Container gap="large" direction="vertical" appearance={appearance}>
            <Container
              direction={verticalSocialLayout ? 'vertical' : 'horizontal'}
              gap={verticalSocialLayout ? 'small' : 'medium'}
              appearance={appearance}
            >
              {providers.map((provider) => {
                return (
                  <Button
                    key={provider}
                    color="default"
                    loading={loading}
                    onClick={() => handleProviderSignIn(provider)}
                    appearance={appearance}
                  >
                    <Icons provider={provider} />
                    {verticalSocialLayout &&
                      template(
                        i18n?.[currentView]?.social_provider_text,
                        {
                          provider: capitalize(
                            handleProviderNameEdgeCases(provider)
                          ),
                        }
                      )}
                  </Button>
                );
              })}
            </Container>
          </Container>
          {!onlyThirdPartyProviders && <Divider appearance={appearance} />}
        </>
      )}
    </>
  );
}

export { SocialAuth };
