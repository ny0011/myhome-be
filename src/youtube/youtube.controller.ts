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

@Controller('youtube')
export class YoutubeController {
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
    return `youtuber ${uid}`;
  }

  @Post()
  create(@Body() youtuberData) {
    console.log(youtuberData);
    return youtuberData;
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
