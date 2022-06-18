import { Injectable } from '@nestjs/common';
import { Youtube } from './entities/youtube.entity';
import { chromium } from 'playwright-chromium';

@Injectable()
export class YoutubeService {
  private youtubes: Youtube[] = [];

  async getOne(uid: string) {
    const data = this.youtubes.find((youtube) => youtube.uid === uid);
    if (data !== undefined) {
      return data;
    } else {
      const tmp = await this.getYoutuber(uid).then((response) => response);
      return { uid: uid, id: 1, data: tmp };
    }
  }

  async getYoutuber(uid: string) {
    const YOUTUBE_URL = `https://www.youtube.com/channel/${uid}`;
    const UPDATED_VIDEO_URL = YOUTUBE_URL + '/videos?view=0&sort=dd&shelf_id=0';

    const browser = await chromium.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(YOUTUBE_URL);
    const youtuber = await page.$$eval(
      '#channel-header-container',
      (all_items) => {
        console.log(all_items);
        const data = [];
        all_items.forEach((info) => {
          const img = info.querySelector('img').getAttribute('src');
          data.push({ img: img });
        });
        return data;
      },
    );
    await page.waitForTimeout(1000);
    await browser.close();
    return youtuber;
  }

  create(youtuberData) {
    this.youtubes.push({
      id: this.youtubes.length + 1,
      ...youtuberData,
    });
  }
}
