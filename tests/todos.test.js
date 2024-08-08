import {expect, test} from "@playwright/test";

test("Testing for input field", async ({ page }) => {
    // goes to page at this url
    await page.goto('http://localhost:3000');
    // trying to find input on the page
    const locator = page.getByRole('textbox');
    await locator.fill("Dummy Data");

  await expect(locator).toHaveValue("Dummy Data");
});