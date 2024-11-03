import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Registration } from '../app/pages'

describe('Registration Component', () => {

  test('renders all input fields and labels correctly', () => {
    render(<Registration />)

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/mobile number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/date of birth/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  test('displays validation error when required fields are left empty and form is submitted', () => {
    render(<Registration />);

    // Simulate form submission
    const submitButton = screen.getByRole('button', { name: /continue with email/i });
    fireEvent.click(submitButton);

    // Assert that error messages are displayed
    expect(screen.getByLabelText(/full name is required/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address is required/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mobile number is required/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of birth is required/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender is required/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email is required/i)).toBeInTheDocument();
  })


  test('removes error when valid input is provided for "Full name"', () => {
    render(<Registration />)

    const fullNameInput = screen.getByLabelText(/Full name/i)
    fireEvent.blur(fullNameInput) // Trigger validation
    expect(screen.getByText('Full Name is required.')).toBeInTheDocument()

    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } })
    fireEvent.blur(fullNameInput)

    expect(screen.queryByText('Full Name is required.')).not.toBeInTheDocument()
  })

  test('formats the phone number correctly on change', () => {
    render(<Registration />)

    const phoneInput = screen.getByLabelText(/Mobile number/i)
    fireEvent.change(phoneInput, { target: { value: '1234567890' } })

    expect(phoneInput.value).toBe('(123) 456-7890')
  })

  test('shows error for invalid phone number format', () => {
    render(<Registration />);

    const phoneInput = screen.getByLabelText(/Mobile number/i);
    fireEvent.change(phoneInput, { target: { value: '1234' } })
    fireEvent.blur(phoneInput);

    waitFor(() => {
      expect(screen.getByText(/Phone number must be exactly 10 digits./i)).toBeInTheDocument();
    });
  });


  test('displays validation errors only after form submission', () => {
    render(<Registration />)

    fireEvent.change(screen.getByLabelText(/Full name/i), { target: { value: '' } })
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: '' } })
    expect(screen.queryByLabelText('Full name is required.')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Email is required.')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /continue with email/i }))
    expect(screen.getByLabelText('Full name is required.')).toBeInTheDocument()
    expect(screen.getByLabelText('Email is required.')).toBeInTheDocument()
  })

  test('submits form when all fields are filled correctly', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');

    render(<Registration />)
    fireEvent.change(screen.getByLabelText(/Full name/i), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText(/Address/i), { target: { value: '123 Main St' } })
    fireEvent.change(screen.getByLabelText(/Mobile number/i), { target: { value: '(123) 456-7890' } })
    fireEvent.change(screen.getByLabelText(/Date of birth/i), { target: { value: '01/29/2002' } })

    // Abre el menú y selecciona una opción para Gender
    fireEvent.mouseDown(screen.getByLabelText(/Gender/i))
    waitFor(() => {
      const genderOption = screen.getByRole('option', { name: /male/i });
      fireEvent.click(genderOption);
    });

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } })

    fireEvent.click(screen.getByText('Continue with email'));

    waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith('Form submitted:', {
        fullName: 'John Doe',
        address: '123 Main St',
        phoneNumber: '(123) 456-7890',
        dateOfBirth: '01/29/2002',
        gender: 'male',
        email: 'john@example.com',
      })
    });
    consoleLogSpy.mockRestore()
  })
})
