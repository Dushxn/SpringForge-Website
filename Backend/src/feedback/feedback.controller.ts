import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  submit(
    @Req() req: Request,
    @Body() body: { rating: number; comment: string; module?: string },
  ) {
    if (!body.rating || body.rating < 1 || body.rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5.');
    }
    if (!body.comment?.trim()) {
      throw new BadRequestException('Comment is required.');
    }
    return this.feedbackService.submitFeedback(
      (req as any).user.id,
      body.rating,
      body.comment.trim(),
      body.module,
    );
  }

  @Get('mine')
  @UseGuards(JwtAuthGuard)
  getMyFeedback(@Req() req: Request) {
    return this.feedbackService.getUserFeedback((req as any).user.id);
  }
}
