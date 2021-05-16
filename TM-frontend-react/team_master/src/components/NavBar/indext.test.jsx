import React from 'react'
import { Link, MemoryRouter as Router } from 'react-router-dom';
import {render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import NavBar from '.';

afterEach(()=>{
    cleanup();
})

const windowOpen = jest.fn();
window.open = windowOpen;

const NavBarProps = {
    currentUser: { 
        username: "mihindu@gmail.com",
        name: "Mihindu Ranasinghe"
     }
};

test('Matches Snapshot',()=>{
    const tree = renderer.create(<Router><NavBar/></Router>).toJSON();
    expect(tree).toMatchSnapshot();
})

describe('Testing Navigation items based on the autherization', () => {
    it('NavBar items testing for a logged in user', async () => {
        const { getByText } = render(<Router><NavBar {...NavBarProps} /></Router>);

        const NewProject = getByText("New Project");
        expect(NewProject).toBeInTheDocument();

        const MyProjects = getByText("My Projects");
        expect(MyProjects).toBeInTheDocument();

        const MyChatRooms = getByText("My Chat Rooms");
        expect(MyChatRooms).toBeInTheDocument();

        const MyConferenceRooms = getByText("My Conference Rooms");
        expect(MyConferenceRooms).toBeInTheDocument();

        const ContactUs = getByText("Contact Us");
        expect(ContactUs).toBeInTheDocument();

        const Greeting = getByText("Hi Mihindu Ranasinghe !");
        expect(Greeting).toBeInTheDocument();

        const LogOut = getByText("Log out");
        expect(LogOut).toBeInTheDocument();
    });  

    it('NavBar items testing for a logged out user', async () => {
        const { getByTestId, getByText } = render(<Router><NavBar/></Router>);

        const NewProject = getByText("New Project");
        expect(NewProject).toBeInTheDocument();

        const MyProjects = getByText("My Projects");
        expect(MyProjects).toBeInTheDocument();

        const MyChatRooms = getByText("My Chat Rooms");
        expect(MyChatRooms).toBeInTheDocument();

        const MyConferenceRooms = getByText("My Conference Rooms");
        expect(MyConferenceRooms).toBeInTheDocument();

        const ContactUs = getByText("Contact Us");
        expect(ContactUs).toBeInTheDocument();

        const LogIn = getByText("Log In");
        expect(LogIn).toBeInTheDocument();

        const Register = getByText("Register");
        expect(Register).toBeInTheDocument();
    });
});
