import { AppPage } from "./app.page";

export class OrderPage extends AppPage {
  constructor(page) {
    super(page);
    this.page = page;
    this.newOrderPageHeader = this.page.getByRole("heading", {
      name: "Nová objednávka",
    });
    this.inputICO = this.page.locator("#ico");
    this.aresToast = this.page.getByText(
      "Data z ARESu se nepodařilo načíst, vyplňte je prosím ručně"
    );
    this.inputOdberatel = this.page.locator("#client");
    // this.odberatelPlaceholder = page
    //   .locator("#client")
    //   .locator('input[placeholder = "Hledání v ARESu"]');
    this.inputAddress = this.page.locator("#address");
    this.inputReditelka = this.page.locator("#substitute");
    this.inputContactPerson = this.page.locator("#contact_name");
    this.inputTelNumber = this.page.locator("#contact_tel");
    this.inputEmail = this.page.locator("#contact_mail");
    this.inputStartDate1 = this.page.locator("#start_date_1");
    this.inputEndDate1 = this.page.locator("#end_date_1");
    this.inputStartDate2 = this.page.locator("#start_date_2");
    this.inputEndDate2 = this.page.locator("#end_date_2");
    this.buttonCamp = this.page.getByRole("tab", { name: "Příměstský tábor" });
    this.selectCourse = this.page.locator("#camp-date_part");
    this.campChildrenCount = this.page.locator("#camp-students");
    this.campChildrenAge = this.page.locator("#camp-age");
    this.campAdultsCount = this.page.locator("#camp-adults");
    this.saveButton = this.page.getByRole("button", {
      name: "Uložit objednávku",
    });
    this.confirmationMessage = this.page.getByRole("heading", {
      name: "Děkujeme za objednávku",
    });
    this.successToast = this.page.getByText("Objednávka byla úspěšně uložena", {
      exact: true,
    });
    this.buttonSchool = this.page.locator("#nav-profile-tab");
    this.schoolChildrenCount = this.page.locator("#nature-students");
    this.schoolChildrenAge = this.page.locator("#nature-age");
    this.schoolAdultsCount = this.page.locator("#nature-adults");
    this.schoolStartTime = this.page.locator("#nature-start_time");
    this.selectStartFood = this.page.locator("#nature-start_food");
    this.schoolEndTime = this.page.locator("#nature-end_time");
    this.selectEndFood = this.page.locator("#nature-end_food");
  }

  async openOrderPage() {
    await this.page.goto("/objednavka/pridat");
  }
}
