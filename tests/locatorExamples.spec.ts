//Bu test sayfasında Playwright'ta kullanılan locator örneklerini görebilirsiniz.

import { test, expect } from '@playwright/test'; 

test('Başarılı Kullanıcı Girişi', async ({ page })  => {
    
    /*

    page.locator('#login-button') CSS seçici ile login butonunu seçmek için kullanılan bir Playwright fonksiyonudur. Bu fonksiyon, sayfa üzerinde belirtilen CSS seçiciye sahip olan elementi bulmak için kullanılır. Bu örnekte, '#login-button' CSS seçici ile login butonunu seçiyoruz.
    page.locator('[data-test="login-button"]'); Attribute seçici ile login butonunu seçmek için kullanılan bir Playwright fonksiyonudur. Bu fonksiyon, sayfa üzerinde belirtilen attribute değerine sahip olan elementi bulmak için kullanılır. Bu örnekte, '[data-test="login-button"]' attribute seçici ile login butonunu seçiyoruz.
    page.locator('button:has-text("Login")'); Text seçici ile login butonunu seçmek için kullanılan bir Playwright fonksiyonudur. Bu fonksiyon, sayfa üzerinde belirtilen metni içeren elementi bulmak için kullanılır. Bu örnekte, 'button:has-text("Login")' text seçici ile login butonunu seçiyoruz.
    page.getByTestId('login-button'); TestId seçici ile login butonunu seçmek için kullanılan bir Playwright fonksiyonudur. Bu fonksiyon, sayfa üzerinde belirtilen test id değerine sahip olan elementi bulmak için kullanılır. Bu örnekte, 'login-button' test id değerine sahip olan login butonunu seçiyoruz.
    
    getByRole() Erişilebilirlik olduğunda ilk tercih
    await page.getByRole('button', {
    name: 'Login'
    }).click();
    getByLabel() Form alanları için 
    getByPlaceholder() Placeholder üzerinden locator seçmek için
    getByTestId() Test için tanımlanmış stabil attribute üzerinden locator seçmek için
    getByText() Text üzerinden locator seçmek için
    page.getByText('Kaydet', { exact: true }); Tam metin eşleşmesi için exact: true kullanılır. Aksi takdirde, 'Kaydet' kelimesini içeren tüm elementler seçilir.
    */

    const username = 'standard_user';
    const password = 'secret_sauce';  

    await page.goto('https://www.saucedemo.com/');
    console.log('Login sayfasına gidildi.');

    await page.getByPlaceholder('Username').fill(username);
    console.log('Kullanıcı adı girildi.');

    await page.getByTestId('password').fill(password);
    console.log('Şifre girildi.');

    await page.getByRole('button',{
        name: 'Login'
    }).click();
    console.log('Login butonuna tıklandı.');


    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');
    console.log('Başarılı giriş yapıldı.');

});

test('Product sayfası açılması', async ({ page }) => {

    //Bu test senaryosunda product sayfasında birden fazla bulunana elementlerin nasıl filtrelenebileceğini öğreneceğiz.

    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button',{
        name: 'Login'
    }).click();

    await expect(page).toHaveURL(/inventory.html/);

    const products = page.locator('.inventory_item'); //Bu kod, sayfada bulunan tüm ürünleri seçmek için kullanılan bir Playwright fonksiyonudur. '.inventory_item' CSS seçici ile tüm ürünleri seçiyoruz.
    const productCount = await products.count(); //Bu kod, sayfada bulunan ürünlerin sayısını almak için kullanılan bir Playwright fonksiyonudur. products.count() ile ürünlerin sayısını alıyoruz.
    console.log('Ürün sayısı:', productCount);

    const firstProduct = products.first(); // İlk ürün locatoru
    const lastProduct = products.last(); // Son ürün locatoru
    const nthProduct = products.nth(3); // indeksi 0dan başlayan ürün listesinde 3.ürünü seçmek için kullanılır Ancak bu locatorlar kırılgandır yeni ürün eklemesinde vs locatorlar değişmiş olur


    //Belirli metne göre ürün locatoru filtreleme
    const backpackProduct = page.locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Backpack' }); // Burada .inventory_item class'ında 'Sauce Labs Backpack' metnini içeren ürünleri filtreliyoruz.

    await expect(backpackProduct).toBeVisible(); // Ürünün olduğunu doğruladık
    
    //Bir elementin içerisindeki başka elementi bulmak
    const addCartButton= backpackProduct.getByRole('button', {
        name: 'Add to cart'
    });
    await addCartButton.click()

    // Ürünü sepete ekledikten sonra add to cart butonunun remove butonuna dönmesini doğruladık
    await expect (backpackProduct.getByRole('button', { name :'Remove'})
        ).toBeVisible;

    await expect (page.locator('.shopping_cart_badge')).toHaveText('1'); // Sepette bir ürün olduğunu gösterdik

});