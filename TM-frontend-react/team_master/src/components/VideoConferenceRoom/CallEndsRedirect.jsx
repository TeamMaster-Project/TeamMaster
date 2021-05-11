import React, { Component } from 'react';
import auth from '../../services/authService';
import { Link } from "react-router-dom";
import { getProjects } from '../../services/projectService';
import PreLoader from '../PreLoader/PreLoader';
import './index.css'

class CallEndsThankYou extends Component {

    state = {
    
  };

    async componentDidMount() {

    }

    render() {

            return (
                <div className="newproject-container">
                    <h1>Thank You For Joining</h1>
                         <h1>
                            <Link
                            to="/videoroom/"
                            className="btn btn-warning m-3"
                            >
                            My Conference Rooms
                            </Link>
                        </h1>
                </div>
                );
    }
}

export default CallEndsThankYou;
