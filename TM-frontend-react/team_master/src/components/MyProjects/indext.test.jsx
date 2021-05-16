import React from 'react'
import { Route, MemoryRouter as Router } from 'react-router-dom';
import {render, screen, cleanup, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import MyProjects from '.';

afterEach(()=>{
    cleanup();
})

const windowOpen = jest.fn();
window.open = windowOpen;

const MyProjectsProps = {
    currentUser: { email: "user@gmail.com", name: "Mihindu Ranasinghe" },
    projects: {}
};


test('Matches Snapshot',()=>{
    const tree = renderer.create(<Router><MyProjects/></Router>).toJSON();
    expect(tree).toMatchSnapshot();
})

describe('Testing MyProjects page UI', () => {
    it('MyProject page static elements rendering correctly', async () => {
        const { getByRole, getByText, findByText } = render(
        <Router>
                <MyProjects {...MyProjectsProps} />
        </Router>
        );
        // expect(await screen.findByText("My Projects")).toBeInTheDocument();

    });  
});
