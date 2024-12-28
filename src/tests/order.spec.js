import { expect, test } from "@playwright/test";
import {
  adresa,
  casKonce,
  casZacatku,
  contactPerson,
  email,
  endDate1,
  endDate2,
  ico,
  number,
  odberatel,
  pocet,
  pocetDospelych,
  reditelka,
  startDate1,
  startDate2,
  vek,
} from "../fixtures.orderpage/fixtures";
import { OrderPage } from "./pages.2homework/order.page";

test.describe("Testing having the posibility to reach the order form for schools", async () => {
  test.beforeEach(async ({ page }) => {
    const orderPage = new OrderPage(page);
    await orderPage.openHomePage();
  });

  test("Aplikace umožňuje uživateli v menu Pro učitele vytvoření nové Objednávky pro MŠ/ZŠ", async ({
    page,
  }) => {
    const orderPage = new OrderPage(page);
    await expect(orderPage.forTeacherButton).toBeVisible();

    await orderPage.forTeacherButton.click();

    await expect(orderPage.newOrderButton).toBeVisible();
  });

  test("Po kliknutí na Pro učitele > Objednávka pro MŠ/ZŠ se otevře formulář, kde může uživatel vyplnit detail objednávky", async ({
    page,
  }) => {
    const orderPage = new OrderPage(page);
    await orderPage.forTeacherButton.click();
    await orderPage.newOrderButton.click();

    await expect(orderPage.newOrderPageHeader).toBeVisible();
  });
});

test.describe("Filling the order form", async () => {
  test.beforeEach(async ({ page }) => {
    const orderPage = new OrderPage(page);
    await orderPage.openOrderPage();
  });

  test("Pokud vyplněné IČO neodpovídá žádnému záznamu v ARESu, vyhodí systém chybovou hlášku", async ({
    page,
  }) => {
    const orderPage = new OrderPage(page);

    await orderPage.inputICO.fill(ico);
    await page.keyboard.press("Enter");

    await page.waitForTimeout(5000);

    await expect(orderPage.aresToast).toBeVisible();
  });

  test("Uživatel může odeslat vyplněnou objednávku na příměstský tábor", async ({
    page,
  }) => {
    const orderPage = new OrderPage(page);

    await orderPage.inputICO.fill(ico);
    await orderPage.inputReditelka.fill(reditelka);
    await orderPage.inputContactPerson.fill(contactPerson);
    await orderPage.inputTelNumber.fill(number);
    await orderPage.inputEmail.fill(email);
    await orderPage.inputOdberatel.fill(odberatel);
    await orderPage.inputAddress.fill(adresa);
    await orderPage.inputStartDate1.fill(startDate1);
    await orderPage.inputEndDate1.fill(endDate1);
    await orderPage.inputStartDate2.fill(startDate2);
    await orderPage.inputEndDate2.fill(endDate2);
    await orderPage.buttonCamp.click();
    await orderPage.selectCourse.selectOption("afternoon");
    await orderPage.campChildrenCount.fill(pocet);
    await orderPage.campChildrenAge.fill(vek);
    await orderPage.campAdultsCount.fill(pocetDospelych);
    await orderPage.saveButton.click();

    await expect(orderPage.confirmationMessage).toBeVisible();
    await expect(orderPage.successToast).toBeVisible();
  });

  test("Objednávku pro Příměstský tábor nelze odeslat, pokud není řádně vyplněna - chybí vyplnit pole Odběratel", async ({
    page,
  }) => {
    const orderPage = new OrderPage(page);

    await orderPage.inputICO.fill(ico);
    await orderPage.inputReditelka.fill(reditelka);
    await orderPage.inputContactPerson.fill(contactPerson);
    await orderPage.inputTelNumber.fill(number);
    await orderPage.inputEmail.fill(email);
    await orderPage.inputAddress.fill(adresa);
    await orderPage.inputStartDate1.fill(startDate1);
    await orderPage.inputEndDate1.fill(endDate1);
    await orderPage.inputStartDate2.fill(startDate2);
    await orderPage.inputEndDate2.fill(endDate2);
    await orderPage.buttonCamp.click();
    await orderPage.campChildrenCount.fill(pocet);
    await orderPage.campChildrenAge.fill(vek);
    await orderPage.campAdultsCount.fill(pocetDospelych);
    await orderPage.saveButton.click();

    await expect(orderPage.saveButton).toBeVisible();
  });

  test("Řádně vyplněná přihláška na Školu v přírodě lze odeslat", async ({
    page,
  }) => {
    const orderPage = new OrderPage(page);

    await orderPage.inputICO.fill(ico);
    await orderPage.inputReditelka.fill(reditelka);
    await orderPage.inputContactPerson.fill(contactPerson);
    await orderPage.inputTelNumber.fill(number);
    await orderPage.inputEmail.fill(email);
    await orderPage.inputOdberatel.fill(odberatel);
    await orderPage.inputAddress.fill(adresa);
    await orderPage.inputStartDate1.fill(startDate1);
    await orderPage.inputEndDate1.fill(endDate1);
    await orderPage.inputStartDate2.fill(startDate2);
    await orderPage.inputEndDate2.fill(endDate2);
    await orderPage.buttonSchool.click();
    await orderPage.schoolChildrenCount.fill(pocet);
    await orderPage.schoolChildrenAge.fill(vek);
    await orderPage.schoolAdultsCount.fill(pocetDospelych);
    await orderPage.schoolStartTime.fill(casZacatku);
    await orderPage.selectStartFood.selectOption("dinner");
    await orderPage.schoolEndTime.fill(casKonce);
    await orderPage.selectEndFood.selectOption("lunch");
    await orderPage.saveButton.click();

    await expect(orderPage.confirmationMessage).toBeVisible();
    await expect(orderPage.successToast).toBeVisible();
  });
});
