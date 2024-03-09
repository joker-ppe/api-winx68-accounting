import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDTO } from './dto';

@Injectable({})
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signJwtToken(userId: number, userName: string): Promise<string> {
    const payload = {
      sub: userId,
      userName,
    };
    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: 24 * 3600, // 24 hours
      secret: await this.getSecretFromDatabase(),
    });

    return jwtString;
  }

  private async getSecretFromDatabase() {
    const config = await this.prismaService.key.findUnique({
      where: { name: 'JWT_SECRET' },
    });
    return config.key;
  }

  async hashPassword(password: string) {
    //generate password to hashedPassword
    const hashedPassword = await argon.hash(password);
    //insert dat to database
    return hashedPassword;
  }

  async login(apiKey: string, authDTO: AuthDTO) {
    // find user with input email

    const apiKeyOnSystem = await this.prismaService.key.findUnique({
      where: {
        name: 'API_KEY',
      },
    });

    if (apiKey !== apiKeyOnSystem.key) {
      throw new NotFoundException('Wrong API key');
    }

    try {
      const user = await this.prismaService.admin.findUnique({
        where: {
          username: authDTO.userName,
        },
      });

      if (!user) {
        throw new ForbiddenException('User not found');
      }

      const passwordMatched = await argon.verify(
        user.password,
        authDTO.password,
      );

      if (!passwordMatched) {
        throw new ForbiddenException('Incorrect password');
      }

      delete user.password; //remove a field in the object
      //it doesn't affect to the database

      const accessToken = await this.signJwtToken(user.id, user.username);

      return {
        accessToken: accessToken,
        userName: user.username,
        createAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
