import { expect, test } from "@playwright/test";

async function openRegistrationPage(page) {
  await page.goto("/registrace");
}

function getRegistrationPageHeader(page) {
  return page.getByRole("heading", { level: 1 });
}

function getInputName(page) {
  return page.locator("#name");
}

function getInputEmail(page) {
  return page.locator("#email");
}

function getInputPassword(page) {
  return page.locator("#password");
}

function getInputPasswordConfirmation(page) {
  return page.locator("#password-confirm");
}

function getSubmitButton(page) {
  return page.locator("button[type='submit']");
}

async function expectRegistrationForm(page) {
  await expect(getInputName(page)).toBeVisible();
  await expect(getInputEmail(page)).toBeVisible();
  await expect(getInputPassword(page)).toBeVisible();
  await expect(getInputPasswordConfirmation(page)).toBeVisible();
  await expect(getSubmitButton(page)).toBeVisible();
}

async function registration(page, name, username, password, confirmpassword) {
  // vím, že to není ideální, ale potřebovala bych naučit, jak vygenerovat random tyto data, abych to tam nemusela pokaždé psát :)
  await getInputName(page).fill(name);
  await getInputEmail(page).fill(username);
  await getInputPassword(page).fill(password);
  await getInputPasswordConfirmation(page).fill(confirmpassword);
  await getSubmitButton(page).click();
}

function getCurrentUser(page) {
  return page.locator("[data-toggle='dropdown'] strong");
}

function getErrorMessage(page) {
  return page.locator("span[role='alert']").locator("strong");
}

function getErrorToast(page) {
  return page.locator("script[type='text/javascript']");
}

test.describe("Testing the RegistrationPage", () => {
  test.beforeEach(async ({ page }) => {
    await openRegistrationPage(page);
  });

  test("Assuring we are on the registration page", async ({ page }) => {
    await expect(getRegistrationPageHeader(page)).toHaveText("Registrace"); // pouze assertace, že jsme na stránce Registrace, přechod proběhl v rámci bloku beforeEach

    await expectRegistrationForm(page);
  });

  test("Registration - Happy path", async ({ page }) => {
    await registration(
      page,
      "Aleš Krátký",
      "ales.kratky@seznam.cz",
      "Ales.01",
      "Ales.01"
    );

    await expect(getCurrentUser(page)).toHaveText("Aleš Krátký");
  });

  test("Registration - already existing email", async ({ page }) => {
    await test.step("Filling the registration form and clicking submit button", async () => {
      await registration(
        page,
        "Aleš Krátký",
        "ales.kratky@seznam.cz",
        "Ales.21",
        "Ales.21"
      );
    });

    await test.step("Checking the registration was not accomplished", async () => {
      await expect(getCurrentUser(page)).not.toBeVisible();
      await expect(getRegistrationPageHeader(page)).toHaveText("Registrace");
    });

    await test.step("Checking the invalid feedbacks", async () => {
      await expect(getErrorMessage(page)).toBeAttached();
      await expect(getErrorMessage(page)).toBeVisible();
      await expect(getErrorMessage(page)).toHaveText(
        "Účet s tímto emailem již existuje"
      );

      await expect(getErrorToast(page)).toBeAttached();
    });
  });

  test("Registration - only numbers password", async ({ page }) => {
    await test.step("Filling the registration form with only numbers password", async () => {
      await registration(
        page,
        "Aleš Krátký",
        "kratky.ales@seznam.cz",
        "123456",
        "123456"
      );
    });

    await test.step("Checking the registration was not accomplished", async () => {
      await expect(getCurrentUser(page)).not.toBeVisible();
      await expect(getRegistrationPageHeader(page)).toHaveText("Registrace");
    });

    await test.step("Checking the invalid feedbacks", async () => {
      await expect(getErrorMessage(page)).toBeAttached();
      await expect(getErrorMessage(page)).toBeVisible();
      await expect(getErrorMessage(page)).toHaveText(
        "Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici"
      );

      await expect(getErrorToast(page)).toBeAttached();
    });
  });
});
