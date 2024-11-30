import { test, expect } from '@playwright/test';
const dotenv = require('dotenv');
dotenv.config();
const account = require('../data/account.json');
const username = account.standard_user.username;
const password = account.standard_user.password;

test('To Login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle(/Swag Labs/);

  //input username
  await page.waitForSelector("//input[@id='user-name']");
  await page.focus("//input[@id='user-name']");
  await page.keyboard.type(username);

  //input password
  await page.waitForSelector("//input[@id='password']");
  await page.focus("//input[@id='password']");
  await page.keyboard.type(password);

  //click login
  await page.keyboard.press('Enter');
  await page.close();

});


