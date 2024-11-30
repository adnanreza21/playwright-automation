import { test, expect } from '@playwright/test';
const dotenv = require('dotenv');
dotenv.config();
const account = require('../data/account.json');
const information = require('../data/information.json');
const username = account.standard_user.username;
const password = account.standard_user.password;
const first_name = information.address.first_name;
const last_name = information.address.last_name;
const postal_code = information.address.postal_code;

test('To Checkout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

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
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');


    //add to cart
    await page.click("//button[@id='add-to-cart-sauce-labs-backpack']");
    await page.click("//button[@id='add-to-cart-sauce-labs-bolt-t-shirt']");

    //go to cart
    await page.click("//a[@class='shopping_cart_link']");
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    await page.click("//button[@id='remove-sauce-labs-backpack']");

    //checkout
    await page.click("//button[@id='checkout']");

    //input first_name
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    await page.waitForSelector("//input[@id='first-name']");
    await page.focus("//input[@id='first-name']");
    await page.keyboard.type(first_name);

    //input last_name
    await page.waitForSelector("//input[@id='last-name']");
    await page.focus("//input[@id='last-name']");
    await page.keyboard.type(last_name);

    //input postal_code
    await page.waitForSelector("//input[@id='postal-code']");
    await page.focus("//input[@id='postal-code']");
    await page.keyboard.type(postal_code);
   
    //continue button
    await page.click("//input[@id='continue']");

    //finish button
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    await page.click("//button[@id='finish']");
    await page.click("//button[@id='back-to-products']");
});


