import React from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import App from 'next/app';
import '../styles/globals.css';
import { SnackbarProvider } from 'notistack';
import { StoreProvider } from '../utils/Store';

export default class MyApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <SnackbarProvider
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <StoreProvider>
          <PayPalScriptProvider options={{ 'client-id': 'test' }} deferLoading>
            <Component {...pageProps} />
          </PayPalScriptProvider>
        </StoreProvider>
      </SnackbarProvider>
    );
  }
}
