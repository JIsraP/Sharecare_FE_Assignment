import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Button, Grid2 as Grid, useMediaQuery } from "@mui/material";
import { HowItWorks } from './HowItWorks';

export const NavBar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <Grid
        container
        height='10vh'
        justifyContent='space-between'
        alignItems='flex-end'
        paddingX={2}
        paddingBottom={isSmallScreen ? 1 : 0}
        width={isSmallScreen ? '100%' : '50%'}
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          bgcolor: '#fff',
        }}
      >
        <Grid sx={{ mt: 1 }} >
          <img src="./sharecare.png" width='150em' />
        </Grid>
        <Grid>
          <Button
            variant='outlined'
            sx={{
              textTransform: 'none',
              color: '#2B3649',
              borderColor: '#00bfa5',
              fontSize: '1rem',
            }}
            onClick={handleDrawerOpen}
          >
            How it works
          </Button>
        </Grid>
      </Grid>

      {/* Drawer Component */}
      <HowItWorks open={drawerOpen} onClose={handleDrawerClose} />
    </>
  );
};
