package com.chat.socket.mschatsocket.controller;

import org.slf4j.*;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.chat.socket.mschatsocket.dto.ChatMessage;

@Controller
@CrossOrigin("*")
public class WebSocketController {
    private final Logger log=LoggerFactory.getLogger(WebSocketController.class);
    
    @MessageMapping("/chat/{roomId}")
    @SendTo("/topic/{roomId}")
    public ChatMessage chat(@DestinationVariable String roomId, ChatMessage message){
        log.info("Mensaje: {}", message);
        return new ChatMessage(message.getMessage(),message.getUser());
    }
}
