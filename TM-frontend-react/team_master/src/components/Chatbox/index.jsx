import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './ChatFeed';
import React, { Component } from 'react';
import './Chat.css';
import auth from '../../services/authService';
import NewChatForm from './NewChatForm';
import ChatSettingsTop from './ChatSettingsTop';
import PreLoader from '../PreLoader';

const IndexApp = () => {
	// if (!localStorage.getItem('username')) return <LoginForm />;
	let isLoading = true;
	const currentUser = auth.getCurrentUser();
	isLoading = false;

	if(isLoading)
		return <PreLoader/>

	return (
		<ChatEngine
			height='94vh'
			projectID='5d514e59-2de9-4fa3-a915-764ea74ad722'
			userName= {currentUser.email}
			userSecret= {currentUser._id}
			renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
			renderNewChatForm={(creds) => <NewChatForm {...creds}/>}
			renderChatSettingsTop={(creds, chat) => <ChatSettingsTop creds={creds} chat={chat}/>}
			renderPhotosSettings={(chat) => {}}
			renderOptionsSettings={(creds, chat) => {}}
		/>
	);
};

export default IndexApp;
