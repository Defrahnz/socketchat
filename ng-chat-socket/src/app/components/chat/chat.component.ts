import { Component, OnInit } from '@angular/core';
import { ChatMessage } from 'src/app/models/chat-message';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
  constructor(private chatService:ChatService){

  }

  ngOnInit(): void {
      this.chatService.joinRoom("General");
  }
  sendMessage(){  
    const chatMessage={
      message:'Buenas',
      user:'1'
    }as ChatMessage
    this.chatService.sendMessage("General",chatMessage);
  }

}
