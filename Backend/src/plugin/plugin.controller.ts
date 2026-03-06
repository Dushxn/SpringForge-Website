import { Controller, Get, Res, UseGuards, Req } from '@nestjs/common';
import { PluginService } from './plugin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response, Request } from 'express';

@Controller('plugin')
export class PluginController {
  constructor(private readonly pluginService: PluginService) {}

  @Get('info')
  getInfo() {
    return this.pluginService.getInfo();
  }

  @Get('download')
  @UseGuards(JwtAuthGuard)
  async download(@Req() req: Request, @Res() res: Response) {
    const userId = (req as any).user.id;
    const fileData = await this.pluginService.getFileData();
    await this.pluginService.logDownload(userId);
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="springforge-plugin.zip"');
    res.send(fileData);
  }
}
