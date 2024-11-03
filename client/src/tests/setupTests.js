import '@testing-library/jest-dom'; // Extensiones de Jest para el DOM
import { cleanup } from '@testing-library/react'; // Cleanup después de cada prueba

afterEach(cleanup); // Limpia el DOM después de cada prueba