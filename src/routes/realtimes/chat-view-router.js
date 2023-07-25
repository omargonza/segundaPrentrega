import express from "express";
import { chatRealtimeController } from "../../controller/realtime/chat-realtime-controller.js";

export const routerViewChat = express.Router();

//ver todo el chat
routerViewChat.get("/", chatRealtimeController.index);
  
  