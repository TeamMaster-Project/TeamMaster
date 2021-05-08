import http from "./httpService";
import config from "./config.json";
import { getJwt } from "./authService";
import { toast } from "react-toastify";

const chatEngineApiEndPoint = config.chatEngineApiEndPointUrl;

const projectID = '5d514e59-2de9-4fa3-a915-764ea74ad722';
const PRIVATEKEY = "b591fdd0-5264-41a2-b73e-3aebeb51dea8";

export function addUsers (user) {
        let configs = {
            headers: {
                "PRIVATE-KEY": PRIVATEKEY
            }
        }   
        let data = {
        "username": user.email,
        "secret": user._id
        }

        http.removeJwt();
        let res = http.post(chatEngineApiEndPoint + "/users/", data, configs);
        http.setJwt(getJwt());
        console.log("res", res)
}

export const getChatRooms = async (member) => {
        let configs = {
            headers: {
                "Project-ID": projectID,
                "User-Name": member.email,
                "User-Secret": member._id
            }
        }   
        return http.get(chatEngineApiEndPoint + "/chats/", configs)
            .then((res) => res.data)
            .catch(function(error) {
                console.log(error.response.data);
      })
}

export function addChatRoom(chatboxTitle, member){
            let configs = {
            headers: {
                "Project-ID": projectID,
                "User-Name": member.email,
                "User-Secret": member._id
            }
        }   
        let data = {
            "title" : chatboxTitle
        }
        http.removeJwt();
        let ChatRooms = getChatRooms(member);
        console.log(ChatRooms)
        // ChatRooms.map( async (chatroom) =>{ 
        //    if(chatroom.title == chatboxTitle){
        //     //    updateChatRoom(chatboxTitle, member)
        //        toast("chatroom already exist")
        //    }
        //    else{
        //        http.post(chatEngineApiEndPoint + "/chats/", data, configs);
        //    }
        // });
        http.setJwt(getJwt());
}

export function updateChatRoom(chatboxTitle, member){
            let configs = {
            headers: {
                "Project-ID": projectID,
                "User-Name": member.email,
                "User-Secret": member._id
            }
        }   
        let data = {
            "title" : chatboxTitle
        }
        http.removeJwt();
        // http.put(chatEngineApiEndPoint + "/chats/" + chatRoomId, data, configs);
        http.setJwt(getJwt());
}




