import React from 'react'
import {render, screen, cleanup, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import MyProjects from '.';

afterEach(()=>{
    cleanup();
})

const windowOpen = jest.fn();
window.open = windowOpen;

const MyProjectsProps = {
    currentUser: { email: "newuser@gmail.com", name: "Team Master Test User" },
};


test('Matches Snapshot',()=>{
    const tree = renderer.create(<MyProjects/>).toJSON();
    expect(tree).toMatchSnapshot();
})

describe('Testing MyProjects page UI', () => {
    it('MyProject page static elements rendering correctly', async () => {
        const { getByRole, getByText } = render(<MyProjects {...MyProjectsProps}/>);

        // const title = getByText("My Projects");
        // expect(title).toBeInTheDocument();

        // const NewProjectButton = getByRole('button', { name: "New Project"});
        // expect(NewProjectButton).toBeInTheDocument();

    });  
});

// describe('Testing registration with different combinations of inputs', () => {

//     // This test case skipped because of trying to create a new user every time the test case run
//     it.skip('Sign in with correct / new credentials', async () => {
//         const { getByRole } = render(<Register {...RegisterFormPropsValid} />);
//         const RegisterButton = getByRole('button', { name: 'Register' });
//         fireEvent.click(RegisterButton);
//         await screen.findByText("Please wait...");
//         screen.findByText("Registration success");
//     });  

//     it('Trying to Sign in with correct an existing registered user', async () => {
//         const { getByRole } = render(<Register {...RegisterFormPropsWithExistingUsername} />);
//         const RegisterButton = getByRole('button', { name: 'Register' });
//         fireEvent.click(RegisterButton);
//         await screen.findByText("Please wait...");
//         screen.findByText("Registration fail");
//     });  
// })