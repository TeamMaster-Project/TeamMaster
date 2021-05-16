import React from 'react'
import { WechatOutlined } from '@ant-design/icons';

function NewChatForm() {
    return (
        <div>
            <div className="new-chat-form">
                <h3 className="chat-form-heading">Chat Rooms</h3>
                <WechatOutlined className='chat-icon' />
            </div>
        </div>
    )
}

export default NewChatForm
