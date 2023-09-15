const jwt = require("jsonwebtoken");

// const auth = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const isCustomAuth = token.length < 500;
//     console.log(token + "// " + isCustomAuth);
//     let decodedToken;

//     if (token && isCustomAuth) {
//       decodedToken = jwt.verify(token, "test");
//       console.log(decodedToken);
//       req.userId = decodedToken?.id;
//       console.log("token " + decodedToken?.id);
//     } else {
//       decodedToken = jwt.decode(token);
//       console.log(decodedToken);
//       req.userId = decodedToken?.sub;
//       console.log("tokens " + decodedToken.sub);
//     }
//   } catch (err) {
//     console.log(err);
//   }
//   next();
// };

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("Access Denied");
  } else {
    const authToken = token.split(" ")[1];

    try {
      const decodedToken = jwt.verify(authToken, "test"); // config.get('jwtPrivateKey')
      req.userId = decodedToken?.id;
      next();
    } catch (error) {
      res.status(401).send("Invalid Token");
      console.log(error);
    }
  }
};

module.exports = auth;
