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

export async function getChatRooms (user) {
        let configs = {
            headers: {
                "Project-ID": projectID,
                "User-Name": user.email,
                "User-Secret": user._id
            }
        }  
        http.removeJwt(); 
        let res = await http.get(chatEngineApiEndPoint + "/chats/", configs)
        http.setJwt(getJwt());
        return res.data
}

export async function addChatRoom(chatboxTitle, user){
            let configs = {
            headers: {
                "Project-ID": projectID,
                "User-Name": user.email,
                "User-Secret": user._id
            }
        }   
        let data = {
            "title" : chatboxTitle
        }
        http.removeJwt();
        let res = await http.post(chatEngineApiEndPoint + "/chats/", data, configs);
        http.setJwt(getJwt());
        return res.data
}

export function updateChatRoom(chatboxTitle, user){
        let configs = {
            headers: {
                "Project-ID": projectID,
                "User-Name": user.email,
                "User-Secret": user._id
            }
        }   
        let data = {
            "title" : chatboxTitle
        }
        http.removeJwt();
        // http.put(chatEngineApiEndPoint + "/chats/" + chatRoomId, data, configs);
        http.setJwt(getJwt());
}

export async function addChatMembers(chatRoomId, currentUser, member){
    let configs = {
        headers: {
            "Project-ID": projectID,
            "User-Name": currentUser.email,
            "User-Secret": currentUser._id
        }
    }   
    let data = {
        "username": member.email
    }
    http.removeJwt();
    http.post(chatEngineApiEndPoint + "/chats/" + chatRoomId + "/people/", data, configs);
    http.setJwt(getJwt());
}

export async function deleteChatMembers(chatRoomId, currentUser, member){
    let configs = {
        headers: {
            "Project-ID": projectID,
            "User-Name": currentUser.email,
            "User-Secret": currentUser._id
        }
    }   
    let data = {
        "username": member.email
    }
    http.removeJwt();
    http.put(chatEngineApiEndPoint + "/chats/" + chatRoomId + "/people/", data, configs);
    http.setJwt(getJwt());
}




