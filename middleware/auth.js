export function checkExistToken(req, res, next) {
  if (!req.cookies.token) {
    res.redirect("/login");
    return;
  }

  next();
}
export function checkDoesNotExistToken(req, res, next) {
  if (req.cookies.token) {
    res.redirect("/");
    return;
  }

  next();
}
