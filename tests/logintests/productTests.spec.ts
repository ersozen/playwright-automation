import {test, expect} from '@playwright/test';
import { LoginPage } from "../../pages/LoginPage";
import { ProductPage } from "../../pages/ProductPage";

test.describe("Ürün Yönetimi Testleri",() => {
    let loginPage: LoginPage;
    let productPage: ProductPage;

    const productName= 'Sauce Labs Backpack';

    test.beforeEach("Başarılı giriş", async({page})=>{
        loginPage= new LoginPage(page);
        productPage= new ProductPage(page);
        await loginPage.open();
        await loginPage.login("standard_user","secret_sauce");
        await expect(page).toHaveURL(/inventory\.html/);
        await expect(page.locator(".title")).toHaveText("Products");
    });
    
    test.afterEach(async({},testInfo)=>{
        console.log("Test:", testInfo.title);
        console.log("Status:", testInfo.status);
    });    

    test("Ürünü sepete ekleyebilme",async()=>{
        
        await productPage.clickProductButton(productName,'Add to cart');
        await expect(productPage.getProductButton(productName,'Remove')).toBeVisible();
        await expect(productPage.getCartBadge()).toHaveText('1');
    });

    test("Ürünü sepetten çıkarabilme",async()=>{
        
        await productPage.clickProductButton(productName,'Add to cart');
        await expect(productPage.getProductButton(productName,'Remove')).toBeVisible();
        await expect(productPage.getCartBadge()).toHaveText('1');
        await productPage.clickProductButton(productName,'Remove');
        await expect(productPage.getProductButton(productName,'Add to cart')).toBeVisible();
        await expect(productPage.getCartBadge()).toBeHidden();
    });

    test("Sayfa yenilendiğinde sepetin korunması", async()=>{
        await productPage.clickProductButton(productName,'Add to cart');
        await expect(productPage.getProductButton(productName,'Remove')).toBeVisible();
        await expect(productPage.getCartBadge()).toHaveText('1');
        await productPage.refresh();
        await expect(productPage.getProductButton(productName,'Remove')).toBeVisible();
        await expect(productPage.getCartBadge()).toHaveText('1');
    })
});