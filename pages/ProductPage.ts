import {Page, Locator} from '@playwright/test';

export class ProductPage{
    
    private readonly product: Locator;
    private readonly cartBadge: Locator;
    private readonly pageTitle: Locator;

    constructor(page: Page){
        this.product= page.locator('.inventory_item');
        this.cartBadge= page.locator('.shopping_cart_badge');
        this.pageTitle= page.locator('.title');
    }

    getProduct(productName: string): Locator{
        return this.product.filter({hasText: productName}); 
    }
    
    getProductButton(productName:string, buttonName:string): Locator{
        return this.getProduct(productName).getByRole('button', {
            name: buttonName,
            exact: true
        });
    }

    getCartBadge(): Locator{
        return this.cartBadge;
    }

    getPageTitle(): Locator{
        return this.pageTitle;
    }

    async clickProductButton(productName: string, buttonName:string): Promise<void>{
        await this.getProductButton(productName,buttonName).click();
    }
}