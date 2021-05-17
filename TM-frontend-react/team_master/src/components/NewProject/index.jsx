import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PreLoader from '../PreLoader/PreLoader';
import Logo from "../../assets/images/Logo/TMLogo1.png"
import './index.css';

class NewForm extends Component {
	state = {
		isLoading: false,
	};

	async componentDidMount() {
		this.setState({ isLoading: true });
		setTimeout(() => {
			this.setState({ isLoading: false });
		}, 1000);
	}

	render() {
		if (this.state.isLoading) return <PreLoader />;

		return (
			<div className='container'>
				<div className='shadow-box'></div>
				<div className='pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center'>
					<h3><img src={Logo} width="110px" height="100px"/></h3>
					<h1 className='display-4 mx-5'>Welcome to TeamMaster</h1>
					<p className='lead'>
						It is time to quickly build an effective team working environment
						with TeamMaster tne one task management platform for all your
						project planning needs and professional team communication and video
						conferencing.
					</p>
					<Link
						to='/myprojects/new'
						className='btn btn-lg btn-block btn-outline-primary my-2 shadow'
						style={{ marginBottom: 20 }}
					>
						Create New Project
						{/* <button type="button" className="btn btn-lg btn-block btn-outline-primary mt-5">Create New Project</button> */}
					</Link>
				</div>

				<div className='card-deck my-3 text-center'>
					<div className='card mb-4 box-shadow shadow story-board-con'>
						<div className='card-header'>
							<h5 className='my-0 font-weight-normal projects-headings'>
								Story Boards
							</h5>
						</div>
						<div className='card-body'>
							<h5 className='card-title pricing-card-title pt-4 px-2'>
								You only need to create a project for your team
							</h5>
							<i>
								<p className='py-3'>
									Manage your strory boards with Team Master
								</p>
							</i>
							<Link
								to='/myprojects/'
								className='btn btn-lg btn-block btn-primary'
								style={{ marginBottom: 20 }}
							>
								My Projects Dashboard
							</Link>
						</div>
					</div>

					<div className='card mb-4 box-shadow shadow chat-room-con'>
						<div className='card-header'>
							<h5 className='my-0 font-weight-normal projects-headings'>
								Chat Rooms
							</h5>
						</div>
						<div className='card-body'>
							<h5 className='card-title pricing-card-title pt-4 px-2'>
								All your team members will be added to a team chat rooms
								automatically
							</h5>
							<p className='py-3'>
								<i>Chat your team members at any time</i>
							</p>
							<Link
								to='/chatroom/'
								className='btn btn-lg btn-block btn-primary'
								style={{ marginBottom: 20 }}
							>
								My Chat Rooms
							</Link>
						</div>
					</div>

					<div className='card mb-4 box-shadow shadow video-room-con'>
						<div className='card-header'>
							<h5 className='my-0 font-weight-normal projects-headings'>
								Video Rooms
							</h5>
						</div>
						<div className='card-body'>
							<h5 className='card-title pricing-card-title pt-4 px-2'>
								All your team members will be added to a video rooms
								automatically
							</h5>
							<p className='py-3'>
								<i>Join the team call at any time</i>
							</p>
							<Link
								to='/videoroom/'
								className='btn btn-lg btn-block btn-primary'
								style={{ marginBottom: 20 }}
							>
								My Conferencing Rooms
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default NewForm;
