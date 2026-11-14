import { test, expect } from '@playwright/test';  //Burada test ve expect fonksiyonlarını import ediyoruz.

test('Login sayfası açılabilmeli', async ({ page }) => { //Burada test fonksiyonu ile bir test tanımlıyoruz. Testin adı 'Login sayfası açılabilmeli' ve async bir fonksiyon alıyor. Bu fonksiyon, test sırasında kullanılacak olan page nesnesini parametre olarak alıyor.

    await page.goto('https://www.saucedemo.com/'); //Burada page nesnesinin goto fonksiyonu ile belirtilen URL'ye gidiyoruz. Selenium karşılığı -> driver.get("https://www.saucedemo.com/");
                                                   //await, ilgili asenkron işlemin tamamlanmasını bekler.
    
    //Asertions (Doğrulamalar) yapıyoruz. Burada sayfanın başlığının 'Swag Labs' olduğunu doğruluyoruz.
    await expect(page).toHaveTitle('Swag Labs');

});

test('Başarılı Kullanıcı Girişi', async ({ page })  => { //Burada test fonksiyonu ile bir test tanımlıyoruz. Testin adı 'Başarılı Kullanıcı Girişi' ve async bir fonksiyon alıyor.
    
    const username = 'standard_user'; //Burada username değişkenine 'standard_user' değerini atıyoruz. Bu kullanıcı adı, test sırasında kullanılacak olan geçerli bir kullanıcı adıdır.
    const password = 'secret_sauce';  //Burada password değişkenine 'secret_sauce' değerini atıyoruz. Bu şifre, test sırasında kullanılacak olan geçerli bir şifredir.

    // Login sayfasına git
    await page.goto('https://www.saucedemo.com/');
    console.log('Login sayfasına gidildi.'); //Burada console.log ile 'Login sayfasına gidildi.' mesajını konsola yazdırıyoruz.
    /*
    Burada page.goto() bir Promise döndürür.
    Promise, asenkron bir işlemin gelecekte tamamlanacağını veya hata vereceğini temsil eder.
    await, ilgili asenkron işlemin tamamlanmasını bekler.
    */

    // Kullanıcı adını gir
    await page.locator('#user-name').fill(username);
    console.log('Kullanıcı adı girildi.'); //Burada console.log ile 'Kullanıcı adı girildi.' mesajını konsola yazdırıyoruz.
    // Şifreyi gir
    await page.locator('#password').fill(password);
    console.log('Şifre girildi.'); //Burada console.log ile 'Şifre girildi.' mesajını konsola yazdırıyoruz.
    // Login butonuna tıkla
    await page.locator('#login-button').click();
    console.log('Login butonuna tıklandı.'); //Burada console.log ile 'Login butonuna tıklandı.' mesajını konsola yazdırıyoruz.
    // Başarılı giriş kontrolü
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');
    console.log('Başarılı giriş yapıldı.'); //Burada console.log ile 'Başarılı giriş yapıldı.' mesajını konsola yazdırıyoruz.

});

test('Başarısız Kullanıcı Girişi', async ({ page }) => { //Burada test fonksiyonu ile bir test tanımlıyoruz. Testin adı 'Başarısız Kullanıcı Girişi' ve async bir fonksiyon alıyor.

    const username = 'standard_user'; //Burada username değişkenine 'standard_user' değerini atıyoruz. Bu kullanıcı adı, test sırasında kullanılacak olan geçerli bir kullanıcı adıdır.
    const password = 'invalid_password'; //Burada password değişkenine 'invalid_password' değerini atıyoruz. Bu şifre, test sırasında kullanılacak olan geçersiz bir şifredir.
    const loginButton = page.locator('#login-button'); //Bu kod yalnızca elementi bulmak için kullanılacak Locator nesnesini oluşturur. DOM üzerinde gerçek sorgulama, click() veya textContent() gibi bir işlem gerçekleştirildiğinde yapılır.
    const errorMessage = page.locator('[data-test="error"]'); //Burada errorMessage değişkenine, sayfada hata mesajını içeren elementi seçiyoruz.

    await page.goto('https://www.saucedemo.com/');
    console.log('Login sayfasına gidildi.'); //Burada console.log ile 'Login sayfasına gidildi.' mesajını konsola yazdırıyoruz.
    await page.locator('#user-name').fill(username);
    console.log('Kullanıcı adı girildi.'); //Burada console.log ile 'Kullanıcı adı girildi.' mesajını konsola yazdırıyoruz.
    await page.locator('#password').fill(password);
    console.log('Şifre girildi.'); //Burada console.log ile 'Şifre girildi.' mesajını konsola yazdırıyoruz.
    await loginButton.click();
    console.log('Login butonuna tıklandı.'); //Burada console.log ile 'Login butonuna tıklandı.' mesajını konsola yazdırıyoruz.

    // Başarısız giriş kontrolü
    await expect(errorMessage).toBeVisible(); //Burada expect fonksiyonu ile errorMessage değişkeninin görünür olduğunu doğruluyoruz.
    await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service'); //Burada expect fonksiyonu ile errorMessage değişkeninin içeriğinin belirtilen metin olduğunu doğruluyoruz.
    await expect(page).toHaveURL('https://www.saucedemo.com/'); //Burada expect fonksiyonu ile sayfanın URL'sinin belirtilen URL olduğunu doğruluyoruz.

    //NOT: Temel kural: Bir metodun Promise döndürüp döndürmediğine bakarak await kullanıp kullanmayacağımıza karar veririz.
});