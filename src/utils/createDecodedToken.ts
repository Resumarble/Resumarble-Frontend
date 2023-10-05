const jwt = require("jsonwebtoken");

export default function createDecodedToken(token: {
  sub: string;
  auth: string;
  provider: string;
  id: number;
  exp: number;
}) {
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
  const decodedToken = jwt.verify(token, secretKey);

  return decodedToken;
}
