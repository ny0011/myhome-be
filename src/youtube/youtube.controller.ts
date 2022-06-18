import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { YoutubeService } from './youtube.service';

@Controller('youtube')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get()
  getAll() {
    return 'hi';
  }
  @Get('search')
  search(@Query('img') img: string) {
    return `search for : ${img}`;
  }

  @Get(':id')
  getYoutubeInfo(@Param('id') uid: string) {
    return this.youtubeService.getOne(uid);
  }

  @Post()
  create(@Body() youtuberData) {
    return this.youtubeService.create(youtuberData);
  }

  @Delete(':id')
  remove(@Param('id') uid: string) {
    return `delete youtuber ${uid}`;
  }

  @Patch(':id')
  patch(@Param('id') uid: string, @Body() updateData) {
    return {
      updatedId: uid,
      ...updateData,
    };
  }
}
