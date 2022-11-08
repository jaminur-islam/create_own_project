//unit testing
//integration testing

const puppeteer = require("puppeteer");
let browser, page;
beforeEach(async () => {
  browser = await puppeteer.launch({ headless: false, slowMo: 200 });
  page = await browser.newPage();
  await page.goto("http://localhost:3000");
});
afterEach(async () => {
  // await browser.close();
});

test("The header is a correct text ", async () => {
  const text = await page.$eval("h1", (el) => el.innerHTML);
  expect(text).toEqual("Login");
});

test("Clicking login button", async () => {
  await page.click("input.mt-2");
  const url = await page.url();
  await page.expect(url).toMatch(/localhost\:3000/);
});

test.only("login to redirect route", async () => {
  await page.evaluate(() => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: 1,
        email: "sagor@gmail.com",
        name: "sagor",
      })
    );
  });
  await page.click("input.mt-2");
  const url = await page.url();
  console.log(url);
});
