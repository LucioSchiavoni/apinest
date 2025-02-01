import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { USER_REPOSITORY, UserRepository } from 'src/domain/interfaces/user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
   @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) throw new UnauthorizedException('Invalid credentials');
     
    const isMatch = await bcrypt.compare(password, user.getPassword());
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const { getPassword, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
