import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { ChatMessage } from '../models/chat-message';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient:any
  constructor() {
    this.initConnectionSocket();
   }

  initConnectionSocket(){
    const url='//localhost:3000/chat-socket';
    const socket=new SockJS(url);
    this.stompClient = Stomp.over(socket);
  }

  joinRoom(roomId:string){
    this.stompClient.connect({},()=>{
      this.stompClient.subscribe(`/topic/${roomId}`,(messages:any)=>{
        const messageContent=JSON.parse(messages.body).content;
        console.log(messageContent);
      })
    })
  }

  sendMessage(roomId:string,chatMessage:ChatMessage){
    this.stompClient.send(`/app/rooms/${roomId}/chat`,{},JSON.stringify(chatMessage));  
  }
}
