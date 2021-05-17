import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import {render, screen, cleanup, fireEvent} from '@testing-library/react';
import renderer from 'react-test-renderer';
import LoginForm from '.';

afterEach(()=>{
    cleanup();
})

const windowOpen = jest.fn();
window.open = windowOpen;

const LoginFormPropsValid = {
    data: { username: "user@gmail.com", password: "123456789" },
    doSubmit: jest.fn(),
};

const LoginFormPropsWithInvalidUsername = {
    data: { username: "invalidusername@gmail.com", password: "123456789" },
    doSubmit: jest.fn(),
};

const LoginFormPropsWithInvalidPassword = {
    data: { username: "user@gmail.com", password: "InvalidPassword" },
    doSubmit: jest.fn(),
};

test('Matches Snapshot',()=>{
    const tree = renderer.create(<Router><LoginForm/></Router>).toJSON();
    expect(tree).toMatchSnapshot();
})

describe('Testing UI', () => {
    it('Form elements rendering correctly', async () => {
        const { getByTestId } = render(<Router><LoginForm/></Router>);

        const emailInput = getByTestId("username");
        expect(emailInput).toBeInTheDocument();

        const passwordInput = getByTestId("password");
        expect(passwordInput).toBeInTheDocument()

        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });    
});

describe('Testing log in with different combinations of inputs', () => {
    it('Log in with correct credentials', async () => {
        const { getByRole } = render(<Router><LoginForm {...LoginFormPropsValid} /></Router>);
        const LoginButton = getByRole('button', { name: 'Login' });
        fireEvent.click(LoginButton);
        await screen.findByText("Please wait...");
        screen.findByText("Log in success");
    });  

    it('Trying to login with correct username and incorrect password', async () => {
        const { getByRole } = render(<Router><LoginForm {...LoginFormPropsWithInvalidUsername} /></Router>);
        const LoginButton = getByRole('button', { name: 'Login' });
        fireEvent.click(LoginButton);
        await screen.findByText("Please wait...");
        screen.findByText("Log in fail");
    });  

    it('Trying to login with correct password and incorrect username', async () => {
        const { getByRole } = render(<Router><LoginForm {...LoginFormPropsWithInvalidPassword} /></Router>);
        const LoginButton = getByRole('button', { name: 'Login' });
        fireEvent.click(LoginButton);
        await screen.findByText("Please wait...");
        screen.findByText("Log in fail");
    });
})