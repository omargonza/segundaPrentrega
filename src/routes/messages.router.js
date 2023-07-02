import { Router } from "express";
import { MsgModel } from "../dao/models/messages.model.js";



export const msgsRouter = Router();

//msgsRouter.use(express.json());
//msgsRouter.use(express.urlencoded({ extended: true }));



// Obtener todos los mensajes
msgsRouter.get("/messages", async (req, res) => {
  try {
    const messages = await MsgModel.find();
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Obtener un mensaje por ID
msgsRouter.get("/messages/:id", async (req, res) => {
  try {
    const messageId = req.params.id;
    const message = await MsgModel.findById(messageId);
    if (!message) {
      return res.status(404).json({ success: false, error: "Message not found" });
    }
    res.json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Crear un nuevo mensaje
msgsRouter.post("/messages", async (req, res) => {
  try {
    const { user, message } = req.body;
    const newMsg = new MsgModel({ user, message });
    const msgCreated = await newMsg.save();
    res.status(201).json({ success: true, data: msgCreated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Actualizar un mensaje
msgsRouter.put("/messages/:id", async (req, res) => {
  try {
    const messageId = req.params.id;
    const { user, message } = req.body;
    const updatedMsg = await MsgModel.findByIdAndUpdate(
      messageId,
      { user, message },
      { new: true }
    );
    if (!updatedMsg) {
      return res.status(404).json({ success: false, error: "Message not found" });
    }
    res.json({ success: true, data: updatedMsg });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Eliminar un mensaje
msgsRouter.delete("/messages/:id", async (req, res) => {
  try {
    const messageId = req.params.id;
    const deletedMsg = await MsgModel.findByIdAndDelete(messageId);
    if (!deletedMsg) {
      return res.status(404).json({ success: false, error: "Message not found" });
    }
    res.json({ success: true, data: deletedMsg });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


