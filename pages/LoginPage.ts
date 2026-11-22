import{Page, Locator} from '@playwright/test';
import { BasePage } from "./BasePage"; 

export class LoginPage extends BasePage{
 
    private readonly usernameInput: Locator; // Class dışından erişilemez ve ilk atamadan sonra değişkene yeni değer atanmasını engelleriz
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page){ //Class'tan nesne oluşturulduğunda otomatik olarak çalışır
        super(page);
        this.usernameInput= page.getByPlaceholder("Username");
        this.passwordInput= page.getByPlaceholder("Password");
        this.loginButton= page.getByRole('button',{name:'Login'});
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async open(): Promise<void> { //Asenkron işlemdir dönüş değeri yoktur.
        await this.navigate('https://www.saucedemo.com/');
    }

    async enterUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    async login(username: string, password: string): Promise<void> {

        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    getErrorMessage(): Locator{
        return this.errorMessage;
    }
}