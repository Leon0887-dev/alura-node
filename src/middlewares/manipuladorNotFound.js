import NaoEncontrado from "../err/NaoEncontrado.js";

function manipuladorNotFound(req, res, next) {
  const error = new NaoEncontrado();
  next(error);
}

export default manipuladorNotFound;