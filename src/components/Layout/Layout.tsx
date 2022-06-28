import React, { ReactNode } from 'react';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import Head from 'next/head';
import useStyles from 'utils/styles';

interface LayoutProps {
  children: any;
}

export function Layout({ children }: LayoutProps) {
  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>BeNoticed</title>
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar className={classes.toolbar}>
          <Typography>BeNoticed</Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>All rights reserved. Next Amazona.</Typography>
      </footer>
    </div>
  );
}
