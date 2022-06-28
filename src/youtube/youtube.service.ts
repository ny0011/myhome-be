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
    const YOUTUBE_CHANNEL_URL = `https://www.youtube.com/channel/${uid}`;
    const UPDATED_VIDEO_URL =
      YOUTUBE_CHANNEL_URL + '/videos?view=0&sort=dd&shelf_id=0';

    const browser = await chromium.launch({
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(YOUTUBE_CHANNEL_URL);
    const youtuber = await page.$$eval(
      '#channel-header-container',
      (all_items) => {
        const img = all_items[0].querySelector('img').getAttribute('src');
        return { img: img };
      },
    );
    await page.goto(UPDATED_VIDEO_URL);
    const elements = page.locator('#items #dismissible >> nth=0');
    const new_video_data = await elements.evaluate((item) => {
      const thumbnail_tag = item.querySelector('a#thumbnail');
      const link = thumbnail_tag.getAttribute('href');
      const img = thumbnail_tag.querySelector('#img').getAttribute('src');
      const title = item.querySelector('#details h3 a').innerHTML;
      /*const time = item.querySelector(
        '#details #metadata-line span:nth-child(2)',
      );*/
      const YOUTUBE_URL = 'https://www.youtube.com';
      return {
        new_video_link: `${YOUTUBE_URL}${link}`,
        thumbnail: img,
        title: title,
      };
    });

    await page.waitForTimeout(1000);
    await browser.close();

    return {
      youtuber: youtuber,
      new_video: new_video_data,
    };
  }

  create(youtuberData) {
    this.youtubes.push({
      id: this.youtubes.length + 1,
      ...youtuberData,
    });
  }
}
