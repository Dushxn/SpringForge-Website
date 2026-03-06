import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { DatabaseService } from '../database/database.service';

export interface UserPayload {
  id: number;
  email: string;
  fullName: string;
}

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;

  constructor(private readonly db: DatabaseService) {
    this.jwtSecret = process.env.JWT_SECRET ?? 'springforge-fallback-secret';
  }

  async register(
    fullName: string,
    email: string,
    password: string,
    organization?: string,
  ): Promise<{ token: string; user: UserPayload }> {
    const existing = await this.db.query(
      `SELECT id FROM users WHERE email = $1`,
      [email.toLowerCase().trim()],
    );
    if (existing.rows.length > 0) {
      throw new BadRequestException('An account with this email already exists.');
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const result = await this.db.query(
      `INSERT INTO users (full_name, email, password_hash, organization)
       VALUES ($1, $2, $3, $4) RETURNING id, full_name, email`,
      [fullName.trim(), email.toLowerCase().trim(), passwordHash, organization?.trim() || null],
    );

    const user = result.rows[0];
    const payload: UserPayload = {
      id: user.id,
      email: user.email,
      fullName: user.full_name,
    };

    return { token: this.signToken(payload), user: payload };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; user: UserPayload }> {
    const result = await this.db.query(
      `SELECT id, full_name, email, password_hash FROM users WHERE email = $1`,
      [email.toLowerCase().trim()],
    );

    const user = result.rows[0];
    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    // Update last_login
    await this.db.query(`UPDATE users SET last_login = NOW() WHERE id = $1`, [
      user.id,
    ]);

    const payload: UserPayload = {
      id: user.id,
      email: user.email,
      fullName: user.full_name,
    };

    return { token: this.signToken(payload), user: payload };
  }

  async getProfile(userId: number): Promise<UserPayload> {
    const result = await this.db.query(
      `SELECT id, full_name, email FROM users WHERE id = $1`,
      [userId],
    );
    if (!result.rows[0]) {
      throw new UnauthorizedException('User not found.');
    }
    const u = result.rows[0];
    return { id: u.id, email: u.email, fullName: u.full_name };
  }

  verifyToken(token: string): UserPayload {
    try {
      return jwt.verify(token, this.jwtSecret) as UserPayload;
    } catch {
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }

  private signToken(payload: UserPayload): string {
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '7d' });
  }
}
