const jwt = require('jsonwebtoken');

export type Token = {
  sub: string;
  auth: string;
  provider: string;
  id: number;
  exp: number;
};

export default function createDecodedToken(token: string): Token {
  const secretKey = process.env.SECRET_KEY;
  const decodedToken = jwt.verify(token, secretKey);

  return decodedToken;
}
