
export const chatRealtimeController = {
    index: async function (req, res) {
      try {
        console.log("cliente conectado al chat");
  
        return res.render("realtime-views/chat-live-realtime.handlebars", {
          title: "Chat Live", 
          style: "realtime/chat.css" 
        });
      } catch (error) {
        return res.status(500).json({
          status: "error",
          msg: "something went wrong",
          data: { error },
        });
      }
    },
  };