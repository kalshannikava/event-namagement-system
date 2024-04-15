import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  hashData(data: string) {
    return bcrypt.hashSync(data, 10);
  }

  comparePasswords(data: string, hash: string) {
    return bcrypt.compareSync(data, hash);
  }

  async validateCredentials(login: string, password: string): Promise<User> {
    const user = await this.usersService.findOneBy({ login });
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    const passwordMatches = this.comparePasswords(password, user.password);
    if (!passwordMatches) {
      throw new BadRequestException('Invalid credentials');
    }
    return user;
  }

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const login = createUserDto.login;
    const userExists = await this.usersService.findOneBy({ login });
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const hash = await this.hashData(createUserDto.password);
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hash,
    });
    return await this.getTokens(newUser.id, newUser.login);
  }

  async signIn({ login, password }: AuthDto) {
    const user = await this.validateCredentials(login, password);
    return await this.getTokens(user.id, user.login);
  }

  async updateRefreshToken() {
    // TODO: implement
  }

  async getTokens(
    userId: number,
    username: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, username },
        {
          secret: this.configService.get('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRATION_TIME'),
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, username },
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRATION_TIME'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
