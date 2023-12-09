export default function (req, res, next) {
  res.locals.token = req.cookies.token ? true : false;
  next();
}
