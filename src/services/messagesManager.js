import { MsgModel } from "../models/msgs.model.js";


/*
export class msgsManagerMongo {
  async getAllMessages() {
    try {
      const messages = await MsgModel.find();
      return messages;
    } catch (error) {
      throw new Error("Unable to get messages");
    }
  }

  async getMessageById(id) {
    try {
      const message = await MsgModel.findById(id);
      if (!message) {
        throw new Error("Message not found");
      }
      return message;
    } catch (error) {
      throw new Error("Unable to get message");
    }
  }

  async createMessage(user, message) {
    try {
      const newMsg = await MsgModel.create({ user, message });
      return newMsg;
    } catch (error) {
      throw new Error("Unable to create message");
    }
  }

  async updateMessage(id, user, message) {
    try {
      const updatedMsg = await MsgModel.findByIdAndUpdate(
        id,
        { user, message },
        { new: true }
      );
      if (!updatedMsg) {
        throw new Error("Message not found");
      }
      return updatedMsg;
    } catch (error) {
      throw new Error("Unable to update message");
    }
  }

  async deleteMessage(id) {
    try {
      const deletedMsg = await MsgModel.findByIdAndDelete(id);
      if (!deletedMsg) {
        throw new Error("Message not found");
      }
      return deletedMsg;
    } catch (error) {
      throw new Error("Unable to delete message");
    }
  }
}
*/
import { MsgModel } from "../models/msgs.model.js";

export class msgsManagermongo {
  constructor(socketServer) {
    this.socketServer = socketServer;
  }

  async getAllMessages() {
    try {
      const messages = await MsgModel.find();
      return messages;
    } catch (error) {
      throw new Error("Unable to get messages");
    }
  }

  async getMessageById(id) {
    try {
      const message = await MsgModel.findById(id);
      if (!message) {
        throw new Error("Message not found");
      }
      return message;
    } catch (error) {
      throw new Error("Unable to get message");
    }
  }

  async createMessage(user, message) {
    try {
      const newMsg = await MsgModel.create({ user, message });
      this.socketServer.sockets.emit("new_message", newMsg);
      return newMsg;
    } catch (error) {
      throw new Error("Unable to create message");
    }
  }

  async updateMessage(id, user, message) {
    try {
      const updatedMsg = await MsgModel.findByIdAndUpdate(
        id,
        { user, message },
        { new: true }
      );
      if (!updatedMsg) {
        throw new Error("Message not found");
      }
      return updatedMsg;
    } catch (error) {
      throw new Error("Unable to update message");
    }
  }

  async deleteMessage(id) {
    try {
      const deletedMsg = await MsgModel.findByIdAndDelete(id);
      if (!deletedMsg) {
        throw new Error("Message not found");
      }
      return deletedMsg;
    } catch (error) {
      throw new Error("Unable to delete message");
    }
  }
}
