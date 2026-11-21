import{Page, Locator} from '@playwright/test';

export class LoginPage{

    private readonly page: Page;
    
    private readonly usernameInput: Locator; // Class dışından erişilemez ve ilk atamadan sonra değişkene yeni değer atanmasını engelleriz
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page){ //Class'tan nesne oluşturulduğunda otomatik olarak çalışır
        this.page= page;
        this.usernameInput= page.getByPlaceholder("Username");
        this.passwordInput= page.getByPlaceholder("Password");
        this.loginButton= page.getByRole('button',{name:'Login'});
    }

    async navigate(): Promise<void> { //Asenkron işlemdir dönüş değeri yoktur.
        await this.page.goto('https://www.saucedemo.com/');
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
}