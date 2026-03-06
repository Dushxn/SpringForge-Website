import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class FeedbackService {
  constructor(private readonly db: DatabaseService) {}

  async submitFeedback(
    userId: number,
    rating: number,
    comment: string,
    module?: string,
  ): Promise<{ success: boolean; message: string }> {
    await this.db.query(
      `INSERT INTO user_feedback (user_id, module, rating, comment)
       VALUES ($1, $2, $3, $4)`,
      [userId, module || null, rating, comment],
    );
    return { success: true, message: 'Thank you for your feedback!' };
  }

  async getUserFeedback(userId: number) {
    const result = await this.db.query(
      `SELECT id, module, rating, comment, created_at
       FROM user_feedback WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId],
    );
    return result.rows;
  }
}
