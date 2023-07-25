//@ts-check

export const sessionsApiController = {
    show: async function (req, res) {
      try {
        return res.json({
          status: "Success",
          msg: "Mostrando los datos de la session",
          data: req.session.user,
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