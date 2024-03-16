import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import {Stomp} from  '@stomp/stompjs';
import { ChatMessage } from '../models/chat-message';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient: any
  constructor() { 
    this.initConectionSocket();
  }

  initConectionSocket(){
    /* const url= "http://localhost:3000/chat-socket"; */
    const url= "chat-socket/";
    const socket= new SockJS(url)
    this.stompClient = Stomp.over(socket);
  }

  joinRoom(roomId:String){
    this.stompClient.connect({},()=>{
      this.stompClient.subscribe(`/topic/${roomId}`,(messages:any)=>{
        const messageContent=JSON.parse(messages.body);
        console.log(messageContent);
      })
    })
  }
  sendMessage(roomId:String, ChatMessage: ChatMessage){
      this.stompClient.send(`/app/chat/${roomId}`,{},JSON.stringify(ChatMessage));
  }
}
