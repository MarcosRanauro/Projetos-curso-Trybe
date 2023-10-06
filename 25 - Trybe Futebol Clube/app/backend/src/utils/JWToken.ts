import { JwtPayload, Secret, sign, SignOptions, verify } from 'jsonwebtoken';

export default class JWToken {
  private static secret: Secret = process.env.JWT_SECRET || 'super_secret';

  private static jwtConfig: SignOptions = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  static sign(payload: JwtPayload): string {
    return sign(payload, JWToken.secret, JWToken.jwtConfig);
  }

  static verify(token: string): JwtPayload {
    return verify(token, JWToken.secret) as JwtPayload;
  }
}
