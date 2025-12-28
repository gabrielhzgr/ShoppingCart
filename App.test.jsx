import { render, screen } from '@testing-library/react';
import App from './src/App.jsx';
describe('something truthy and falsy',()=>{
     it('true to be true', () => {
        expect(true).toBe(true);
    });

    it('false to be false', () => {
        expect(false).toBe(false);
    });

    it('renders headline', () => {
        render(<App />);
        screen.debug();
        // check if App components renders headline
    });
  


})