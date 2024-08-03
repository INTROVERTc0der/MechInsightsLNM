import Faculty from "../models/Faculty.model.js";

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await Faculty.findById(req.user.id);
    //check admin
    if (user?.role !== "Admin") {
      return res.status(401).send({
        success: false,
        message: "Auth Failed not admin",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Auth Failed, ADMIN API",
      error,
    });
  }
};
export {adminMiddleware}