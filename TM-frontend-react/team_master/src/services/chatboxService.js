import http from "./httpService";
import config from "./config.json";
import { getJwt } from "./authService";

const chatEngineApiEndPoint = config.chatEngineApiEndPointUrl;
const projectID = '5d514e59-2de9-4fa3-a915-764ea74ad722';

export function addUsers (user) {
        let configs = {
            headers: {
                "PRIVATE-KEY": "b591fdd0-5264-41a2-b73e-3aebeb51dea8",
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
        let res = http.post(chatEngineApiEndPoint + "/chats/", data, configs);
        http.setJwt(getJwt());
        console.log("res", res)
}


export function getChats(username, secret) {
  return http.get(chatEngineApiEndPoint + "/chats/", {
      headers: {
            'Project-ID': projectID,
			"username": username,
            "secret": secret,
      },
  });
}

