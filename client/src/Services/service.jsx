import axios from "axios";

const service = axios.create({
    baseURL : "http://localhost:3000"
});

export const startMeeting = (data) =>{
    return service.post("/joinMeeting",data);
}