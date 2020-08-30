import puppeteer from 'puppeteer';

import { getRepository } from "typeorm";
import { InstagramUser } from "./../infrastructure/bd/entities/InstagramUser.entity";
import { InstagramLink } from "./../infrastructure/bd/entities/InstagramLink.entity";

import { InstagramResponse } from '../domain/InstagramResponse';
import { InstagramUser as IUser } from "../domain/InstagramUser";

interface IInstagramRepository {
  getUrlImages(username: string): Promise<InstagramResponse>;
  storeUserInstagram(username: string, avatarUrl: string, links: string []): Promise<void>;
  getUser(username: string): Promise<InstagramUser>;
  getLinksByUser(username: string): Promise<InstagramLink[]>;
}

export class InstagramRepository implements IInstagramRepository {
  getLinksByUser(username: string): Promise<InstagramLink[]> {
    throw new Error("Method not implemented.");
  }

  async getUrlImages(username: string): Promise<InstagramResponse> {
    const URL_ENDPOINTS = `https://www.instagram.com/${username}`;

    const browser = await puppeteer.launch({
      headless: false,
      args: [
        "--headless",
        "--no-sandbox",
        "--window-size=1920,920",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
      defaultViewport: null,
      ignoreDefaultArgs: ["--disable-extensions"],
    });

    const page = await browser.newPage();
    await page.goto(URL_ENDPOINTS);

    const data: InstagramResponse = await page.evaluate(() => {
      const urlImages: string[] = [];

      const headerContainer = document.querySelector("header > .XjzKX > div");
      const avatarUrl: string =
        headerContainer?.querySelector("img")?.src || "";

      const containerImagesSelector = document.querySelector(
        ".ySN3v > div > div"
      )?.children;

      if (!containerImagesSelector || containerImagesSelector.length === 0) {
        const response: InstagramResponse = {
          avatarUrl,
          imagesUrl: [],
        };

        return response;
      }

      const containerImages = Array.from(
        document.querySelector(".ySN3v > div > div")?.children || []
      );

      for (const row of containerImages) {
        const rowImages = Array.from(row.children);

        for (const imageContainer of rowImages) {
          const url = imageContainer.querySelector("img")?.src || null;

          if (url) {
            urlImages.push(url);
          }
        }
      }

      const response: InstagramResponse = {
        imagesUrl: urlImages,
        avatarUrl,
      };

      return response;
    });

    await page.close();
    await browser.close();

    return data;
  }

  async storeUserInstagram(
    username: string,
    avatarUrl: string,
    links: string[]
  ): Promise<void> {
    const instagramUser = new InstagramUser();
    instagramUser.avatarUrl = avatarUrl;
    instagramUser.username = username;

    await getRepository(InstagramUser).save(instagramUser);

    const instagramLinks = links.map((link) => {
      const oLink = new InstagramLink();
      oLink.link = link;
      oLink.user = instagramUser;

      return getRepository(InstagramLink).save(oLink);
    });

    await Promise.all(instagramLinks);
  }

  async getUser(username: string): Promise<InstagramUser> {
    return getRepository(InstagramUser).findOne({
      where: {
        username,
      },
    });
  }

  async getTotalLinksByUser(id: number): Promise<number> {
    return getRepository(InstagramLink).count({
      where: {
        user: {
          id,
        },
      },
    });
  }

  async getFirstUserLinkId(userId: number): Promise<number> {
    const instagramLink = await getRepository(InstagramLink).findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });

    return instagramLink.id;
  }

  async getLinksById(userId: number, id: number): Promise<InstagramLink> {
    return getRepository(InstagramLink).findOne({
      where: {
        id,
        user: {
          id: userId,
        },
      },
    });
  }
}
