import React from 'react'

function PeopleSettings({creds, chat}) {

    const renderMenbers = () => {
        console.log("Creds", creds, "Chat", chat)
        return(
            chat.people.map((item) => {
                return(
                   <div key={item.person.username}>{item.person.username}</div>
                )
            })
        )
    }
    return (
        <div>
           <h6 className="text-center pt-1">Members</h6>
           {renderMenbers()}
        </div>
    )
}

export default PeopleSettings
