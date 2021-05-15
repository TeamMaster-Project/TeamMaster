import React from 'react'
import {render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Todo from '../todo';

afterEach(()=>{
    cleanup();
})

test("Should Render Todo Component", () => { 
    // expect(true).toBe(true);
    render(<Todo/>);
    const todoElement = screen.getByTestId('todo-1');
    expect(todoElement).toBeInTheDocument();
    expect(todoElement).toHaveTextContent('Hello');
})

test('Matches Snapshot',()=>{
    const tree = renderer.create(<Todo/>).toJSON();
    // console.log(tree)
    expect(tree).toMatchSnapshot();
})