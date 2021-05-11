import React, { Component } from 'react';
import auth from '../../services/authService';
import { Link } from "react-router-dom";
import { getProjects } from '../../services/projectService';
import PreLoader from '../PreLoader/PreLoader';
import './index.css'

class VideoConferenceArea extends Component {

    state = {
    projects: [],
    currentUser: "",

    myProjectsWithModeratorAccess: [],
    myProjectsWithMemberAccess: [],

    isLoading: true
  };

    async componentDidMount() {
        const { data: projects } = await getProjects();
        const currentUser = auth.getCurrentUser();
        this.setState({ isLoading: false});

        var filteredProjects = [];
        var myProjectsWithModeratorAccess = [];
        var myProjectsWithMemberAccess = [];

        await projects.map((project) => {
        project.moderators.map((moderator) => {
            if (moderator.email == currentUser.email) {
            filteredProjects.push(project);
            myProjectsWithModeratorAccess.push(project);
            }
        });
        project.members.map((member) => {
            if (member.email == currentUser.email) {
            filteredProjects.push(project);
            myProjectsWithMemberAccess.push(project);
            }
        });
        });

        this.setState({
        projects: filteredProjects, //Projects Replace with personalized projects
        currentUser: currentUser,
        myProjectsWithModeratorAccess: myProjectsWithModeratorAccess,
        myProjectsWithMemberAccess: myProjectsWithMemberAccess,
        });
    }

    render() {
            if(this.state.isLoading){
                return(
                    <PreLoader/>
                )
            }

            if (this.state.projects.length === 0)
            return (
                <div className="newproject newproject-container">
                <h2>You have no any projects.</h2>
                <h3>Create Your first Project And Manage It Easily With TEAM MASTER</h3>
                <h1>
                    <Link
                    to="/myprojects/new"
                    className="btn btn-primary"
                    style={{ marginBottom: 20 }}
                    >
                    New Project
                    </Link>
                </h1>
                </div>
            );

            return (
                <div className="mt-5">
                    <h2>Video Conferencing</h2>
                    <h1>
                    <Link
                        to="/videoroom/new/Instant-Meeting"
                        className="btn btn-info"
                        style={{ marginBottom: 20 }}
                    >
                        Create a new instant meeting
                        <i class="fa fa-video-camera m-2" aria-hidden="true"></i>
                    </Link>
                    </h1>
                    <h6>Stay connected with your teams 24/7 with Team Master</h6>
                    <div className="container mt-5">
                            <table className="table">
                                <tbody className="mt-3">
                                {this.state.projects.map((project) => (
                                    // <tr key={project._id} className="project-card card">
                                    <tr key={project._id}>
                                        <td  className="project-name card btn btn-warning">
                                            <Link
                                            to={{
                                                pathname: `/myprojects/${project._id}/${project.name}`,
                                                projectName: `${project.name}`,
                                                description: `${project.description}`,
                                            }}
                                            >
                                                {project.name}
                                            </Link>
                                        </td>
                                        <td>{project.description}</td>
                                        <td>
                                            <Link
                                            to={{
                                                pathname: `/videoroom/${project._id}/${project.name}`,
                                                projectName: `${project.name}`,
                                                description: `${project.description}`,
                                            }}
                                            target="_blank"
                                            >
                                            <p className="btn btn-danger">
                                            <i class="fa fa-phone-square m-1" aria-hidden="true"></i> 
                                            Join Team Call
                                            </p>
                                            </Link>
                                        </td>
                                        </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                </div>
                );
    }
}

export default VideoConferenceArea;
