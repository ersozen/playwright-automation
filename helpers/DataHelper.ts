import {randomUUID} from 'node:crypto';

export class DataHelper{
    static generateRandomNumber(min: number, max: number): number{
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    static generateUniqueId(): string{
        return randomUUID();
    }

    static generateRandomEmail(): string{
        return `test_${randomUUID()}@example.com`;
    }
    static getCurrentDate(): string{
        return new Date().toISOString().split('T')[0];
    }
}