import { test } from "@playwright/test";

test("Practice test", async ({ page }) => {
    await page.goto('http://localhost:3000');
});