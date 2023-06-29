import React, { useCallback, useState, useEffect } from 'react';
import { ConfigAppSDK } from '@contentful/app-sdk';
import { Form, FormControl, Flex, TextInput, Paragraph } from '@contentful/f36-components';
import { css } from 'emotion';
import { useSDK } from '@contentful/react-apps-toolkit';
import imgScreenshot from '../assets/tinymce-scr.png'

export interface AppInstallationParameters {
 apiKey: string | undefined;
}

const ConfigScreen = () => {
  const sdk = useSDK<ConfigAppSDK>();
  const [parameters, setParameters] = useState<AppInstallationParameters>({apiKey: ''});

  const onConfigure = useCallback(async () => {
    const currentState = await sdk.app.getCurrentState();

    return {
      parameters,
      targetState: currentState,
    };
  }, [parameters, sdk]);

  useEffect(() => {
    sdk.app.onConfigure(() => onConfigure());
  }, [sdk, onConfigure]);

  useEffect(() => {
    (async () => {
      const currentParameters: AppInstallationParameters | null = await sdk.app.getParameters();

      if (currentParameters) {
        setParameters(currentParameters);
      }
      sdk.app.setReady();
    })();
  }, [sdk]);

  return (
    <Flex flexDirection="column" className={css({ margin: '80px auto', maxWidth: '660px' })}>
      <Form>
        <FormControl>
          <FormControl.Label>TinyMCE API Key</FormControl.Label>
          <TextInput
            value={parameters.apiKey}
            type='password'
            onChange={(e) => setParameters({...parameters, apiKey:e.target.value})}
          />
        </FormControl>
      </Form>
      <Paragraph>Register <a href="https://www.tiny.cloud/" target="_blank">TinyMCE</a> and go to the dashboard and get the key.</Paragraph>
      <img src={imgScreenshot} />
    </Flex>
  );
};

export default ConfigScreen;