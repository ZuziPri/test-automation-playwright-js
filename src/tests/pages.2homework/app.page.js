export class AppPage {
  constructor(page) {
    this.page = page;
    this.forTeacherButton = this.page.getByRole("button", {
      name: "Pro učitelé",
    });
    this.newOrderButton = this.page.getByRole("link", {
      name: "Objednávka pro MŠ/ZŠ",
    });
  }
  async openHomePage() {
    await this.page.goto("/");
  }
}
