import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './ChatFeed';
import React, { Component } from 'react';
import './Chat.css';

const IndexApp = () => {
	// if (!localStorage.getItem('username')) return <LoginForm />;

	return (
		<ChatEngine
			height='100vh'
			projectID='5d514e59-2de9-4fa3-a915-764ea74ad722'
			userName='Mihindu'
			userSecret='12345'
			renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
		/>
	);
};

export default IndexApp;
