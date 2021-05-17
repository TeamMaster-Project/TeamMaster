import React from 'react';

const TheirMessage = ({ lastMessage, message }) => {
	const isFirstMessageByUser =
		!lastMessage || lastMessage.sender.username !== message.sender.username;

	return (
		<div>
			<div
				className='message'
				style={{
					float: 'left',
					backgroundColor: '#CABCDC',
					marginLeft: isFirstMessageByUser ? '8px' : '8px',
				}}
			>
				{ isFirstMessageByUser && <div className='chat-username'>{message.sender.username}</div>}
				{message.text}
			</div>
		</div>
	);
};

export default TheirMessage;
