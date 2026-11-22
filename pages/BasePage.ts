import {Page} from '@playwright/test';

export abstract class BasePage{
    protected readonly page: Page;

    constructor(page:Page){
        this.page= page;
    } 

    async navigate(url: string): Promise<void>{
        await this.page.goto(url);
    }
    async refresh(): Promise<void>{
        await this.page.reload();
    }
    getCurrentUrl(): string{
        return this.page.url();
    }
    async getTitle(): Promise<string>{
        return await this.page.title();
    }
    async goBack(): Promise<void>{
        await this.page.goBack();
    }
    async goForward(): Promise<void>{
        await this.page.goForward();
    }
}