import React from 'react'

function ChatSettingsTop({ creds, chat}) {
    return (
        <div className="text-center pt-1 pb-1">
            <h3>{chat.title}</h3>
        </div>
    )
}

export default ChatSettingsTop
