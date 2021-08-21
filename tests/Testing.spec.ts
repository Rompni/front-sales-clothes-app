// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-var-requires
// @ts-ignore
const Webdriver = require('selenium-webdriver');

// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-var-requires
const script = require('jest');

const url = 'http://localhost:3000/es';

const time = 1000;

const driver = new Webdriver.Builder().forBrowser('firefox').build();

describe('Testing ', () => {
  test('it show a login process', async () => {
    await driver.get(url);

    await driver.sleep(time + 2000);

    await driver.findElement(Webdriver.By.id('user-item')).click();

    await driver.sleep(time + 2000);

    const form = driver.findElement(Webdriver.By.css('form'));
    const email = form.findElement(Webdriver.By.css('input[type=email]'));
    const password = form.findElement(Webdriver.By.css('input[type=password]'));

    await driver.sleep(time);

    await email.sendKeys(process.env.NEXT_PUBLIC_TEST_EMAIL);

    await driver.sleep(time);

    await password.sendKeys(
      process.env.NEXT_PUBLIC_TEST_PASSWORD,
      Webdriver.Key.RETURN
    );

    await driver.sleep(time);
  }, 20000);

  test('it show create product process from index', async () => {
    await driver.wait(Webdriver.until.urlIs(url), time);
    const user = driver.findElement(Webdriver.By.id('user-item'));

    await driver.sleep(time);
    user.click();

    await driver.sleep(time);
    user.findElement(Webdriver.By.css('li')).click();

    await driver.sleep(time + 2000);
    driver.findElement(Webdriver.By.id('create')).click();

    await driver.sleep(time + 2000);

    const form = driver.findElement(Webdriver.By.css('form'));
    const name = form.findElement(Webdriver.By.css("input[name='name']"));
    const description = form.findElement(Webdriver.By.css('textarea'));
    const price = form.findElement(Webdriver.By.css('input[type=number]'));
    const slug = form.findElement(Webdriver.By.css("input[name='slug']"));

    const file = driver.findElement(
      Webdriver.By.xpath("//input[@type='file']")
    );
    const submit = driver.findElement(Webdriver.By.css('button[type=submit]'));

    await driver.sleep(time);

    name.sendKeys(process.env.NEXT_PUBLIC_TEST_NAME);
    description.sendKeys(process.env.NEXT_PUBLIC_TEST_DESCRIPTION);
    price.sendKeys(process.env.NEXT_PUBLIC_TEST_PRICE);
    slug.sendKeys(process.env.NEXT_PUBLIC_TEST_SLUG);
    file.sendKeys(process.env.NEXT_PUBLIC_TEST_FILE);

    await driver.sleep(time + 3000);
    submit.click();

    await driver.sleep(time + 3000);
    driver
      .findElement(
        Webdriver.By.xpath("//button[@class='swal2-confirm swal2-styled']")
      )
      .click();

    await driver.sleep(time);
    driver.findElement(Webdriver.By.id('no-filed')).click();
  }, 20000);
});
