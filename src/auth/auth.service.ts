import { Injectable, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async register(email: string, password: string, tenantName: string) {
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) throw new BadRequestException('Email already registered');
    const tenantId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ email, password: hashedPassword, tenantId, tenantName });
    await this.userRepository.save(user);
    return { message: 'User registered successfully' };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }
    const payload = { email: user.email, tenantId: user.tenantId };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }

  async getTenants(): Promise<{ id: string; tenantName: string }[]> {
    const tenants = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.tenantId AS id', 'user.tenantName AS tenantName'])
      .groupBy('user.tenantId, user.tenantName')
      .getRawMany();
  
    return tenants;
  }
}