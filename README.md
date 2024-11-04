# Sharecare FrontEnd Assignment - Israel Pérez

## Page
https://sharecare-f5e62.web.app/

## Description
This Registration App allows users to register by filling out a form with their personal information. The app includes validation for the input fields, ensuring the data entered is correct before submission. Upon successful registration, users receive a confirmation message.

### Features
- **User Registration**: Users can fill out their personal information, including full name, address, mobile number, date of birth, gender, and email.
- **Input Validation**: The app validates each input field, ensuring that all form fields are valid before submitting.
- **Error Handling**: Users receive feedback for any input errors, with error messages displayed directly on the input fields.
- **Success Message**: After successful registration, a confirmation message is displayed to the user.

## Visuals
Here´s a short video of the Registration App in action:
[Video Example](https://drive.google.com/file/d/1MTa8DHvyo1M4JNMT_y93ZmWJHtHXZhLf/view?usp=sharing)

## Installation
### Requirements
- **Node.js** (v14 or higher)
- **Yarn** (latest version)

### Steps to run local

1. Clone the repository:
    ```
    git clone https://github.com/JIsraP/Sharecare_FE_Assignment.git
    ```
2. Navigate to the client project directory:
    ```
    cd Sharecare_FE_Assignment/client
    ```
3. Install dependencies for the client:
    ```
    yarn install
    ```
4. Open a new terminal window and navigate to the server project directory:
    ```
    cd Sharecare_FE_Assignment/server
    ```
5. Install dependencies for the server:
    ```
    yarn install
    ```
6. In the first terminal (client), start the development server:
    ```
    yarn dev
    ```
7. In the second terminal (server), run the backend server:
    ```
    node server.js
    ```

## Usage

### Registering a User

- Fill in the registration form with your personal information.
- Ensure all fields are validated before submission.
- Click the submit button to register.
- Upon successful registration, a message will confirm your registration.

## Support
If you encounter any issues or have questions, feel free to open an issue in the [issue tracker](https://github.com/JIsraP/Sharecare_FE_Assignment/issues) or contact the author directly at `israonti@hotmail.com`.

## Roadmap
Planned features for future releases:
- **Enhanced Testing**: Implement more comprehensive test cases to ensure robustness and reliability of the application.
- **Backend Integration**: Develop a database to store user registration, allowing better data management and retrieval.

## Authors and acknowledgment
- **José Israel Pérez Ontiveros** - Initial work

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Project status
This project is actively maintained. New features and improvements are planned for future releases.

## Technologies Used

- React.js
- Node.js
- JEST
- Material-UI
- Firebase Hosting (for deployment)
- Github