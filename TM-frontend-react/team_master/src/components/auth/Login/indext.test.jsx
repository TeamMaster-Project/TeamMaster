import React from 'react'
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
    // fidp: 'google-choreo',
    // setRowsPerPage: jest.fn(),
};

test('Matches Snapshot',()=>{
    const tree = renderer.create(<LoginForm/>).toJSON();
    expect(tree).toMatchSnapshot();
})

describe('Testing UI', () => {
    it('Form elements rendering correctly', async () => {
        const { getByTestId } = render(<LoginForm/>);

        const emailInput = getByTestId("username");
        expect(emailInput).toBeInTheDocument();

        const passwordInput = getByTestId("password");
        expect(passwordInput).toBeInTheDocument()

        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });    
});

describe('Testing log in with different combinations of inputs', () => {
    it('Log in with correct credentials', async () => {
        const { getByRole } = render(<LoginForm {...LoginFormPropsValid} />);
        const LoginButton = getByRole('button', { name: 'Login' });
        fireEvent.click(LoginButton);
        await screen.findByText("Please wait...");
        screen.findByText("Log in success");
    });  

    it('Trying to login with correct username and incorrect password', async () => {
        const { getByRole } = render(<LoginForm {...LoginFormPropsWithInvalidUsername} />);
        const LoginButton = getByRole('button', { name: 'Login' });
        fireEvent.click(LoginButton);
        await screen.findByText("Please wait...");
        screen.findByText("Log in fail");
    });  

    it('Trying to login with correct password and incorrect username', async () => {
        const { getByRole } = render(<LoginForm {...LoginFormPropsWithInvalidPassword} />);
        const LoginButton = getByRole('button', { name: 'Login' });
        fireEvent.click(LoginButton);
        await screen.findByText("Please wait...");
        screen.findByText("Log in fail");
    });
})