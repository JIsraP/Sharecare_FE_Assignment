import React, { useState } from 'react'
import { Box, Button, Collapse, Divider, Grid2 as Grid, Link, MenuItem, Paper, TextField, Typography, useMediaQuery } from '@mui/material'
import { Badge, Email } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles';
import { NavBar, SuccessModal } from '../../components';
import '../styles'

export const Registration = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [label, setLabel] = useState({
    fullName: 'Full name',
    address: 'Address',
    phoneNumber: 'Mobile number',
    dateOfBirth: 'Date of birth',
    gender: 'Gender',
    email: 'Email',
  });

  const [expanded, setExpanded] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleToggleExpand = (event) => {
    event.preventDefault();
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const [formValues, setFormValues] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    email: '',
  });

  const formatName = (input) => {
    // Remove non-alphabetic characters
    const cleaned = input.replace(/[^a-zA-Z\s]/g, '');

    // Capitalize the first letter of each word
    return cleaned
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };


  const formatDateOfBirth = (input) => {
    // Remove all non-digit and non-slash characters
    const cleaned = input.replace(/[^\d/]/g, '');

    // Automatically add slashes after the month and day
    let formatted = cleaned;
    if (cleaned.length > 2 && cleaned[2] !== '/') {
      formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    }
    if (cleaned.length > 5 && cleaned[5] !== '/') {
      formatted = formatted.slice(0, 5) + '/' + formatted.slice(5);
    }

    // Limit to 10 characters (MM/DD/YYYY)
    return formatted.slice(0, 10);
  };

  const formatPhoneNumber = (input) => {
    // Remove all non-digit characters
    let cleaned = input.replace(/\D/g, '');

    // Limit the cleaned input to 10 digits
    if (cleaned.length > 10) {
      cleaned = cleaned.slice(0, 10);
    }

    // Format the number as (XXX) XXX-XXXX
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (!match) return input;

    const [, areaCode, centralOfficeCode, lineNumber] = match;
    if (lineNumber) {
      return `(${areaCode}) ${centralOfficeCode}-${lineNumber}`;
    } else if (centralOfficeCode) {
      return `(${areaCode}) ${centralOfficeCode}`;
    } else if (areaCode) {
      return `(${areaCode}`;
    }

    return '';
  };

  const validateEmail = (email) => {
    // Regex to validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{1,4}/;
    return emailRegex.test(email);
  };



  const handleInputChange = (field) => (event) => {
    let value = event.target.value;

    if (field === 'fullName') {
      value = formatName(value);
    }

    if (field === 'phoneNumber') {
      value = formatPhoneNumber(value);
    }


    if (field === 'dateOfBirth') {
      value = formatDateOfBirth(value);
    }

    // Update the value of the corresponding field
    setFormValues({
      ...formValues,
      [field]: value,
    });

    // Change the label depending on the input
    if (value && label[field].length === 0 && errors[field].length === 0) {
      setLabel((prevLabels) => ({
        ...prevLabels,
        [field]: `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}`
      }));
    } else {
      setLabel((prevLabels) => ({
        ...prevLabels,
        [field]: `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required.`,
      }));
    }

     // Validate the field on each change
     validateField(field, value);
  };

  const validateField = (fieldName, value) => {
    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/([A-Z])/g, ' $1')} is required.`,
      }));
      setLabel((prevLabels) => ({
        ...prevLabels,
        [fieldName]: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/([A-Z])/g, ' $1')} is required.`,
      }));
      return;
    }

    if (fieldName === 'fullName') {
      const names = value.trim().split(' ');
      if (names.length < 2) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: 'Add both first and last name.',
        }));
        setLabel((prevLabels) => ({
          ...prevLabels,
          [fieldName]: 'Add both first and last name.',
        }));
        return;
      }
    }

    if (fieldName === 'phoneNumber') {
      const digitsOnly = value.replace(/\D/g, ''); // Remove non-digit characters
      if (digitsOnly.length !== 10) {
        setLabel((prevErrors) => ({
          ...prevErrors,
          [fieldName]: 'Phone number must be exactly 10 digits.',
        }));
        setErrors((prevLabels) => ({
          ...prevLabels,
          [fieldName]: 'Phone number must be exactly 10 digits.',
        }));
        return;
      }
    }

    if (fieldName === 'dateOfBirth') {
      const date = new Date(value); 
      const today = new Date();
    
      // Check if the date is in the future
      if (date > today) {
        setLabel((prevLabels) => ({
          ...prevLabels,
          [fieldName]: 'Date of birth cannot be in the future.',
        }));
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: 'Date of birth cannot be in the future.',
        }));
        return;
      }
    
      // Check if the date is reasonable, not before 1900
      if (date.getFullYear() < 1900) {
        setLabel((prevLabels) => ({
          ...prevLabels,
          [fieldName]: 'Please enter a date after 1900.',
        }));
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: 'Please enter a date after 1900.',
        }));
        return;
      }

      if(value.length !== 10){
        setLabel((prevLabels) => ({
          ...prevLabels,
          [fieldName]: 'Please enter a valid date.',
        }));
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: 'Please enter a valid date.',
        }));
        return;
      }
    
      setLabel((prevErrors) => ({
        ...prevErrors,
        [fieldName]: '', 
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: '', 
      }));
    }
    

    if (fieldName === 'email') {
      if (!validateEmail(value)) {
        setLabel((prevErrors) => ({
          ...prevErrors,
          [fieldName]: 'Invalid email address.',
        }));
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: 'Invalid email address.',
        }));
        return;
      }
    }

    setLabel((prevErrors) => ({
      ...prevErrors,
      [fieldName]: '',
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: '',
    }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {
      fullName: formValues.fullName ? '' : 'Full name is required.',
      address: formValues.address ? '' : 'Address is required.',
      phoneNumber: formValues.phoneNumber ? '' : 'Mobile number is required.',
      dateOfBirth: formValues.dateOfBirth ? '' : 'Date of birth is required.',
      gender: formValues.gender ? '' : 'Gender is required.',
      email: formValues.email ? '' : 'Email is required.',
    };

    setErrors(newErrors);

    const newLabels = {
      fullName: newErrors.fullName,
      address: newErrors.address,
      phoneNumber: newErrors.phoneNumber,
      dateOfBirth: newErrors.dateOfBirth,
      gender: newErrors.gender,
      email: newErrors.email,
    };

    setLabel(newLabels); 

    const hasErrors = Object.values(newErrors).some((error) => error !== '');

    if (!hasErrors) {
      handleRegister(formValues);
      setIsSuccessModalOpen(true);
    }

  };

  const handleRegister = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message); // Success message
        console.log('User ID:', data.userId); // User ID from response
        // setIsSuccessModalOpen(true);
      } else {
        console.error('Registration failed:', data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <Grid
      container
      margin={0}
      padding={0}
      height='100vh'
      display="flex"
      flexDirection={isSmallScreen ? 'row' : 'column'}
    >

      <SuccessModal
        open={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        fullName={formValues.fullName}
      />

      {isSmallScreen ?
        <NavBar />
        :
        <></>
      }

      {/* Banner */}
      <Grid height={isSmallScreen ? '50%' : '100%'} size={{ xs: 12, md: 6 }} padding={3}>
        <Box
          component='img'
          src='./banner.png'
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: 2
          }}
        />
      </Grid>

      {isSmallScreen ?
        <></>
        :
        <NavBar />
      }

      {/* Form */}
      <Grid container height='90vh' justifyContent='center' alignContent='flex-start' size={{ xs: 12, md: 6 }} padding={0} sx={{ overflowY: 'auto' }}>
        <Box maxWidth='320px' component='form' onSubmit={handleSubmit}>
          <Typography gutterBottom align='center' fontFamily='Tiempos Headline Regular' fontSize='3rem' lineHeight={2} color='#006658'>
            Sign up
          </Typography>

          <Paper variant="outlined" sx={{ borderRadius: 2, boxShadow: 0 }}>
            <Grid container>
              <Grid size={12} sx={{ display: 'flex', alignItems: 'center', height: '8vh' }}>
                <Badge sx={{ paddingLeft: '5%' }} />
                <Typography variant="subtitle1" fontWeight="bold" sx={{ ml: 1 }}>
                  Your information
                </Typography>
              </Grid>

              <Grid size={12}>
                <Divider variant='fullWidth' />
              </Grid>

              <Grid size={12}>
                <TextField
                  label={label.fullName}
                  variant="standard"
                  fullWidth
                  autoComplete='off'
                  value={formValues.fullName}
                  onChange={handleInputChange('fullName')}
                  onBlur={() => validateField('fullName', formValues.fullName)}
                  error={!!errors.fullName}
                  slotProps={{
                    input: {
                      className: 'indentedInput',
                    },
                  }}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  label={label.address}
                  variant="standard"
                  fullWidth
                  autoComplete='off'
                  value={formValues.address}
                  onChange={handleInputChange('address')}
                  onBlur={() => validateField('address', formValues.address)}
                  error={!!errors.address}
                  slotProps={{
                    input: {
                      className: 'indentedInput'
                    },
                  }}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  label={label.phoneNumber}
                  variant="standard"
                  fullWidth
                  autoComplete='off'
                  type='tel'
                  value={formValues.phoneNumber}
                  onChange={handleInputChange('phoneNumber')}
                  onBlur={() => validateField('phoneNumber', formValues.phoneNumber)}
                  error={!!errors.phoneNumber}
                  slotProps={{
                    input: {
                      className: 'indentedInput',
                    },
                  }}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  label={label.dateOfBirth}
                  variant="standard"
                  placeholder='MM/DD/YYYY'
                  fullWidth
                  autoComplete='off'
                  value={formValues.dateOfBirth}
                  onChange={handleInputChange('dateOfBirth')}
                  onBlur={() => validateField('dateOfBirth', formValues.dateOfBirth)}
                  error={!!errors.dateOfBirth}
                  slotProps={{
                    input: {
                      className: 'indentedInput'
                    },
                  }}
                  sx={{
                    '& input': {
                      color: formValues.dateOfBirth ? 'inherit' : 'transparent',
                      caretColor: 'transparent',
                    },
                    '& input:focus': {
                      color: 'inherit',
                      caretColor: 'auto',
                    },
                  }}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  label={label.gender}
                  variant="standard"
                  fullWidth
                  autoComplete='off'
                  select
                  value={formValues.gender}
                  onChange={handleInputChange('gender')}
                  onBlur={() => validateField('gender', formValues.gender)}
                  error={!!errors.gender}
                  slotProps={{
                    input: {
                      className: 'indentedInput',
                    },
                  }}
                  sx={{
                    '& .MuiInputBase-root': {
                      '&:before': {
                        display: 'none', // Hide the bottom line in normal state
                      },
                      '&:after': {
                        display: 'none', // OOculta la línea de abajo en estado normal
                      },
                      '&.Mui-focused:before': {
                        display: 'block', // Shows the line below when in focus
                      },
                      '&.Mui-focused:after': {
                        display: 'block', // Shows the line below when in focus
                      },
                    },
                  }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Paper>

          <TextField
            label={label.email}
            variant="outlined"
            fullWidth
            autoComplete='off'
            value={formValues.email}
            onChange={handleInputChange('email')}
            onBlur={() => validateField('email', formValues.email)}
            error={!!errors.email}
            sx={{
              my: 2
            }}

          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            className='submitButton'
            startIcon={<Email />}
            type="submit"
          >
            Continue with email
          </Button>

          <Typography variant="body2" color="textSecondary" align="center">
            By signing up, I agree to the{' '}
            <Link
              component="button"
              onClick={handleToggleExpand}
              underline="none"
              color="#00bfa5"
            >
              Offer Terms
            </Link>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Box mt={2} px={2}>
                <Typography variant="body2" color="textSecondary" align="center">
                  I agree to the Offer Terms and understand I am creating a Sharecare consumer account.
                  I agree to the Sharecare Privacy Policy, Terms, Consumer Health Data Privacy Policy,
                  and, if applicable to me, the Privacy Notice for California Residents. I consent to
                  Sharecare’s collecting and sharing of any health information I may provide, for the
                  purposes listed in the Consumer Health Data Privacy Policy and Privacy Policy. I agree
                  to receive emails, offers, alerts, and other notices. I understand that I can opt-out
                  of marketing communications at any time.
                </Typography>
              </Box>
            </Collapse>
          </Typography>
        </Box>

      </Grid>
    </Grid >
  )
}