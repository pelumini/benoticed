import React, { useEffect } from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import { StoreProvider } from 'src/utils/Store';

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);
  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <StoreProvider>
        <PayPalScriptProvider options={{ 'client-id': 'test' }} deferLoading>
          <Component {...pageProps} />
        </PayPalScriptProvider>
      </StoreProvider>
    </SnackbarProvider>
  );
};

export default App;
