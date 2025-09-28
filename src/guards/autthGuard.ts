import { BadRequestException, CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.cookies?.['authToken'];

    if (!token) {
      throw new BadRequestException("Token not found");
    }

    try {
      const decoded: any = await this.jwt.verifyAsync(token);
      req.user = decoded;
      return true;
    } catch (error) {
      throw new HttpException("Token expired. Please relogin", HttpStatus.UNAUTHORIZED);
    }
  }
}

export default AuthGuard;
