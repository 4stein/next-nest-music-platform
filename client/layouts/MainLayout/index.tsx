import { Container } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import Navbar from '../../components/Navbar';
import Player from '../../components/Player';

interface MainLayoutProps {
  children: any;
  title?: string;
  description?: string;
  keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = 'Music platform',
  description,
  keywords = 'Music. tracks, artists',
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={`Music platform. Here you can upload and listen your best tracks. ${description}`}
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <Container>{children}</Container>
      <Player />
    </>
  );
};

export default MainLayout;
