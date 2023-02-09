import axios from "axios";
// @ts-check
const { test, expect } = require("@playwright/test");

const url = "http://localhost:3000/";
const api = "http://localhost:4000";
const screenshotsFolder = "screenshots";
const newColleague = "Trinity";

const deleteUserById = async id => {
  const response = await axios.delete(`${api}/colleagues/${id}`);
  return response.data;
};

const deleteUserByName = async name => {
  const response = await axios.get(`${api}/colleagues`);
  const colleagues = response.data;
  const colleague = colleagues.find(c => c.name === name);
  if (colleague) {
    await deleteUserById(colleague.id);
  }
};

test("It is ALIVE 💓", async ({ page }) => {
  await page.goto(url);
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/React App/);
});

test("There is a header! 🥳", async ({ page }) => {
  await page.goto(url);
  // Expect the page to contain a header with the text "My Colleagues".
  const header = page.getByText("My Colleagues");
  await expect(header).toBeVisible();
  await header.screenshot({ path: `${screenshotsFolder}/header.png` });
});

test("We got some colleagues! 🤝", async ({ page }) => {
  await page.goto(url);
  // Expect the page to contain a list of colleagues.
  const list = page.getByRole("list");
  await expect(list).toBeVisible();
  await list.screenshot({ path: `${screenshotsFolder}/list.png` });
});

test("We got style! 💄", async ({ page }) => {
  await page.goto(url);
  // Expect that we have a style tag with the text "main", "h1", "ul" and "li".
  const styleTag = await page.innerHTML("head > style:last-of-type");
  await expect(styleTag).toContain("main");
  await expect(styleTag).toContain("h1");
  await expect(styleTag).toContain("ul");
  await expect(styleTag).toContain("li");
});

test("We got a form! 📝", async ({ page }) => {
  await page.goto(url);
  // Expect the page to contain a form.
  const form = page.getByTestId("add-colleague-form");
  await expect(form).toBeVisible();
  await form.screenshot({ path: `${screenshotsFolder}/form.png` });
});

test("We can add a colleague! ➕", async ({ page }) => {
  await page.goto(url);
  // Get input field and button.
  const input = page.getByPlaceholder("Neo");
  const button = page.getByText("Add Colleague");
  // Type into input field.
  await input.fill(newColleague);
  // Click button.
  await button.click();
  // Expect the page to contain a list of colleagues.

  const list = await page.getByRole("list");
  await expect(list).toBeVisible();
  const colleagues = await list.innerText();
  await expect(colleagues).toContain(newColleague);

  await list.screenshot({ path: `${screenshotsFolder}/list-with-trinity.png` });
  await deleteUserByName(newColleague);
});

test("We can remove a colleague! ➖", async ({ page }) => {
  await page.goto(url);
  // Get input field and button.
  const input = page.getByPlaceholder("Neo");
  const button = page.getByText("Add Colleague");
  // Type into input field.
  await input.fill(newColleague);
  // Click button.
  await button.click();
  // Expect the page to contain a list of colleagues.
  const list = page.getByRole("list");
  await expect(list).toBeVisible();
  const colleagues = await list.innerText();
  await expect(colleagues).toContain(newColleague);
  // Get list item with the new colleague.
  const removeButton = list.locator(`li:last-child > button.button-secondary`);
  // Click remove button.
  await removeButton.click();
  // Expect the page to contain a list of colleagues.
  const newColleagues = await list.innerText();
  await expect(newColleagues).not.toContain(newColleague);
  await list.screenshot({
    path: `${screenshotsFolder}/list-without-trinity.png`
  });
});

test("We can edit a colleague! ✏️", async ({ page }) => {
  await page.goto(url);
  // Get input field and button.
  const input = page.getByPlaceholder("Neo");
  const button = page.getByText("Add Colleague");
  // Type into input field.
  await input.fill(newColleague);
  // Click button.
  await button.click();
  // Expect the page to contain a list of colleagues.
  const list = page.getByRole("list");
  await expect(list).toBeVisible();
  const colleagues = await list.innerText();
  await expect(colleagues).toContain(newColleague);
  // Get list item with the new colleague.
  const editButton = list.locator(`li:last-child > button.button-primary`);
  // Click edit button.
  await editButton.click();
  // Expect the list to contain an input field.
  const inputField = list.locator(`li:last-child > input`);
  await expect(inputField).toBeVisible();
  // Type into input field.
  await inputField.fill("Morpheus");
  // Clicks the save button.
  const saveButton = list.locator(`li:last-child > button.button-primary`);
  await saveButton.click();
  // Expect the page to contain a list of colleagues.
  const newColleagues = await list.innerText();
  await expect(newColleagues).toContain("Morpheus");
  await expect(newColleagues).not.toContain(newColleague);
  await list.screenshot({
    path: `${screenshotsFolder}/list-with-morpheus.png`
  });
  await deleteUserByName("Morpheus");
});
