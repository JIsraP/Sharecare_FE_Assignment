import React from 'react';
import { Drawer, Typography, Button, useMediaQuery, Grid2 as Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const HowItWorks = ({ open, onClose }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: isSmallScreen ? '100%' : '400px',
                    height: '100vh',
                    padding: 3,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Grid container height='100vh' sx={{ overflowY: 'auto' }} >
                <Grid size={12} align='right'>
                    <Button onClick={onClose} sx={{color: 'rgb(0, 191, 165)', textTransform: 'none'}}>
                        Close
                    </Button>
                </Grid>

                <Grid>
                    <Typography gutterBottom fontFamily='Helvetica Neue' color='rgb(147, 153, 158)' fontSize='0.875rem'>
                        HOW IT WORKS
                    </Typography>

                    <Typography gutterBottom fontFamily='Tiempos Headline Regular' color='rgb(0, 102, 88)' fontSize='2.25rem'>
                        Joining is simple
                    </Typography>
                    <Typography gutterBottom fontFamily='Helvetica Neue' fontSize='0.875rem'>
                        By simply registering and answering a few questions, you’ll unlock a personalized health experience to start your health journey.
                    </Typography>
                </Grid>

                <Grid>
                    <Typography fontFamily='Helvetica Neue' color='rgb(0, 102, 88)' fontSize='0.875rem' fontWeight='500' width='20%' align='center' borderRadius={3} sx={{bgcolor: 'rgb(224, 247, 250)'}}>STEP 1</Typography>
                    <Typography gutterBottom fontFamily='Tiempos Headline Regular' color='rgb(0, 102, 88)' fontSize='1.5rem'>
                        Register and create your FREE account.
                    </Typography>
                </Grid>

                <Grid>
                    <Typography fontFamily='Helvetica Neue' color='rgb(0, 102, 88)' fontSize='0.875rem' fontWeight='500' width='20%' align='center' borderRadius={3} sx={{bgcolor: 'rgb(224, 247, 250)'}}>STEP 2</Typography>
                    <Typography gutterBottom fontFamily='Tiempos Headline Regular' color='rgb(0, 102, 88)' fontSize='1.5rem'>
                        Tell us about your lifestyle and health. Receive personalized health offers and content.
                    </Typography>
                </Grid>

                <Grid>
                    <Typography fontFamily='Helvetica Neue' color='rgb(0, 102, 88)' fontSize='0.875rem' fontWeight='500' width='20%' align='center' borderRadius={3} sx={{bgcolor: 'rgb(224, 247, 250)'}}>STEP 3</Typography>
                    <Typography fontFamily='Tiempos Headline Regular' color='rgb(0, 102, 88)' fontSize='1.5rem'>
                        Confirm your mobile phone number, then install the app to access your reward!
                    </Typography>
                </Grid>
            </Grid>
        </Drawer>
    );
};