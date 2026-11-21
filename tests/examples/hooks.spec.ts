/* Bu sayfada tekrar eden işlemleri azaltmaya ve testleri düzenli yönetmeye
   yardımcı fonksiyonları öğreneceğiz.
*/

import {test, expect} from '@playwright/test';

/*
    Hook, testlerin öncesinde veya sonrasında otomatik çalışan fonskiyonlardır.
    playwright 4 temel hook sağlar.
    test.beforeEach() -> Her testten önce
    test.afterEach() -> Her testten sonra    
    test.beforeAll() -> İlgili worker'daki testlerden önce
    test.afterAll() -> İlgili worker'daki testlerden sonra
    test.describe() -> Testler gruplanır

    beforeEach() -> test1 -> afterEach() -> beforeEach() -> test2 -> afterEach()
*/
test.describe("Ürün Yönetimi", () => {
    
    test.beforeEach("Oturum açılması", async ({page})=> {
        await page.goto('https://www.saucedemo.com/');
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button',{
            name: 'Login'
        }).click();

        await expect(page).toHaveURL(/inventory.html/)
    });

    test.afterEach(async({},testInfo)=>{
        console.log("Test:", testInfo.title);
        console.log("Status:", testInfo.status);
    });

    test("Ürünün sepete eklenebilmesi", async ({page})=>{
        const backpackProduct = page.locator('.inventory_item')
            .filter({ hasText: 'Sauce Labs Backpack' }); 

        await expect(backpackProduct).toBeVisible(); 
        
        const addCartButton= backpackProduct.getByRole('button', {
            name: 'Add to cart'
        });
        await addCartButton.click()

        await expect (backpackProduct.getByRole('button', { name :'Remove'})
            ).toBeVisible;

        await expect (page.locator('.shopping_cart_badge')).toHaveText('1');    
    });

    test("Ürünün sepetten çıkarılabilmesi", async ({page})=>{
        const backpackProduct = page.locator('.inventory_item')
            .filter({ hasText: 'Sauce Labs Backpack' }); 

        await expect(backpackProduct).toBeVisible(); 
        
        const addCartButton= backpackProduct.getByRole('button', {
            name: 'Add to cart'
        });
        await addCartButton.click()

        await expect (backpackProduct.getByRole('button', { name :'Remove'})
            ).toBeVisible();

        await expect (page.locator('.shopping_cart_badge')).toHaveText('1'); 
        
        const removeButton = backpackProduct.getByRole('button', { name: 'Remove'});
        await removeButton.click();
        
        await expect (page.locator('.shopping_cart_badge')).toBeHidden();       
    });
});

