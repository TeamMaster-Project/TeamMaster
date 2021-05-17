import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import {render, screen, cleanup, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Register from '.';

afterEach(()=>{
    cleanup();
})

const windowOpen = jest.fn();
window.open = windowOpen;

const RegisterFormPropsValid = {
    data: { username: "newuser@gmail.com", password: "123456789", name: "Team Master Test User" },
    doSubmit: jest.fn(),
};

const RegisterFormPropsWithExistingUsername = {
    data: { username: "user@gmail.com", password: "123456789", name: "Team Master Test User" },
    doSubmit: jest.fn(),
};


test('Matches Snapshot',()=>{
    const tree = renderer.create(<Router><Register/></Router>).toJSON();
    expect(tree).toMatchSnapshot();
})

describe('Testing UI', () => {
    it('Form elements rendering correctly', async () => {
        const { getByTestId } = render(<Router><Register/></Router>);

        const emailInput = getByTestId("username");
        expect(emailInput).toBeInTheDocument();

        const passwordInput = getByTestId("password");
        expect(passwordInput).toBeInTheDocument()

        const nameInput = getByTestId("name");
        expect(nameInput).toBeInTheDocument()

        expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();

    });  
});

describe('Testing registration with different combinations of inputs', () => {

    // This test case skipped because of trying to create a new user every time the test case run
    it.skip('Sign in with correct / new credentials', async () => {
        const { getByRole } = render(<Router><Register {...RegisterFormPropsValid} /></Router>);
        const RegisterButton = getByRole('button', { name: 'Register' });
        fireEvent.click(RegisterButton);
        await screen.findByText("Please wait...");
        screen.findByText("Registration success");
    });  

    it('Trying to Sign in with correct an existing registered user', async () => {
        const { getByRole } = render(<Router><Register {...RegisterFormPropsWithExistingUsername} /></Router>);
        const RegisterButton = getByRole('button', { name: 'Register' });
        fireEvent.click(RegisterButton);
        await screen.findByText("Please wait...");
        screen.findByText("Registration fail");
    });  
})