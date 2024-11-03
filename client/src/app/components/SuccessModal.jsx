// SuccessModal.js
import React from 'react';
import { Box, Button, Dialog, DialogContent, Typography } from '@mui/material';

export const SuccessModal = ({ open, onClose, fullName }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                <Box display="flex" justifyContent="flex-end">
                    <Button
                        onClick={onClose}
                        sx={{color: 'rgb(0, 191, 165)', textTransform: 'none'}}
                    >
                        Close
                    </Button>
                </Box>

                <Typography gutterBottom fontFamily='Tiempos Headline Regular' color='rgb(0, 102, 88)' fontSize='2.25rem' align='center'>
                    Registration Successful!
                </Typography>
                <Typography fontFamily='Helvetica Neue' fontSize='0.875rem' align="center">
                    Welcome to Sharecare {fullName}!
                </Typography>
            </DialogContent>
        </Dialog>
    );
};