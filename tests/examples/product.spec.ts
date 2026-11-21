import {test , expect} from '@playwright/test'; 

test("Sepetten ürün çıkartılması", async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button',{
        name: 'Login'
    }).click();

    await expect(page).toHaveURL(/inventory.html/);

    const products = page.locator('.inventory_item'); 
    const productCount = await products.count();
    console.log('Ürün sayısı:', productCount);

    const backpackProduct = page.locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Backpack' }); 

    await expect(backpackProduct).toBeVisible(); 
    
    const addCartButton= backpackProduct.getByRole('button', {
        name: 'Add to cart'
    });
    await addCartButton.click()

    await expect (backpackProduct.getByRole('button', { name :'Remove'})
        ).toBeVisible();

    await expect (page.locator('.shopping_cart_badge')).toHaveText('1'); // Sepette bir ürün olduğunu gösterdik

    //Ürünün sepetten çıkarılması için ilgili elementin alt sınıflarında bulunanan remove butonunun locatorunu bulup tıklama işlemini gerçekleştirdik
    const removeButton = backpackProduct.getByRole('button', { name: 'Remove'});
    await removeButton.click();
    
    await expect (page.locator('.shopping_cart_badge')).toBeHidden(); //Sayfada böyle bir elementin olmadığını doğruladık.
});