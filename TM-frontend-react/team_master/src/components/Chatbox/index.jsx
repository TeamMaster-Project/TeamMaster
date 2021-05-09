import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './ChatFeed';
import React, { Component } from 'react';
import './Chat.css';
import auth from '../../services/authService';

const IndexApp = () => {
	// if (!localStorage.getItem('username')) return <LoginForm />;
	const currentUser = auth.getCurrentUser();
	return (
		<ChatEngine
			height='94vh'
			projectID='5d514e59-2de9-4fa3-a915-764ea74ad722'
			userName= {currentUser.email}
			userSecret= {currentUser._id}
			renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
		/>
	);
};

export default IndexApp;
