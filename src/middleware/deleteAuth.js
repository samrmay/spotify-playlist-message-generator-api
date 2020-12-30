export default (req, res, next) => {
  if (req.body.deleteAuth !== process.env.DELETE_AUTH) {
    return res.status(401).send({ error: "unauthorized" });
  }
  next();
};
