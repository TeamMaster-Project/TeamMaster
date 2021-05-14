import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './ChatFeed';
import React, { Component } from 'react';
import './Chat.css';
import auth from '../../services/authService';
import NewChatForm from './NewChatForm';
import ChatSettingsTop from './ChatSettingsTop';
import PreLoader from '../PreLoader/PreLoader';

class IndexApp extends Component {
	state = {
              isLoading: false,
			  currentUser: {}
      };

	  async componentDidMount() {
		  this.setState({isLoading: true});
		  const currentUser = auth.getCurrentUser();
		  this.setState({currentUser: currentUser})
        setTimeout(()=>{
            this.setState({isLoading: false});
        },5000)
    };
	
	render () {
		if(this.state.isLoading)
			return <PreLoader/>

		return (
			<div>
				<ChatEngine
					height='94vh'
					projectID='5d514e59-2de9-4fa3-a915-764ea74ad722'
					userName= {this.state.currentUser.email}
					userSecret= {this.state.currentUser._id}
					renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
					renderNewChatForm={(creds) => <NewChatForm {...creds}/>}
					renderChatSettingsTop={(creds, chat) => <ChatSettingsTop creds={creds} chat={chat}/>}
					renderPhotosSettings={(chat) => {}}
					renderOptionsSettings={(creds, chat) => {}}
				/>
			</div>
		);
	}
};

export default IndexApp;
