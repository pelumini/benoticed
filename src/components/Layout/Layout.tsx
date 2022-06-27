import React, { ReactNode } from 'react';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import Head from 'next/head';

interface LayoutProps {
  children: any;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Head>
        <title>BeNoticed</title>
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography>BeNoticed</Typography>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
      <footer>
        <Typography>All rights reserved. BeNoticed</Typography>
      </footer>
    </div>
  );
}
