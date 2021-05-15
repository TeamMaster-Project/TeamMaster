import React from 'react'
import {render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import LoginForm from '.';


afterEach(()=>{
    cleanup();
})

// test("Should Render Todo Component", () => { 
//     // expect(true).toBe(true);
//     render(<LoginForm/>);
//     const todoElement = screen.getByTestId('todo-1');
//     expect(todoElement).toBeInTheDocument();
//     expect(todoElement).toHaveTextContent('Hello');
// })

test('Matches Snapshot',()=>{
    const tree = renderer.create(<LoginForm/>).toJSON();
    expect(tree).toMatchSnapshot();
})

describe('Testing UI', () => {
    it('Form elements rendering correctly', async () => {
        const { getByRole, getByTestId } = render(<LoginForm/>);

        const emailInput = getByTestId("username");
        expect(emailInput).toBeInTheDocument();

        const passwordInput = getByTestId("password");
        expect(passwordInput).toBeInTheDocument()

        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();

        // expect(screen.getByText("Email / Username")).toBeInTheDocument();
    });  
});