
describe('End to end PaperId Flow', () => {
  before('Open Browser', () => {
    cy.visit('https://paper.id/webappv1/#/login')
    cy.url().should('include', 'paper')
    cy.title().should('include', 'Log In')
  })

  it('Automation Flow', {keystrokeDelay : 20 }, () => {
    cy.xpath("//div[text()='Masuk ke Paper.id']").should('be.visible').and('exist').should('have.text', 'Masuk ke Paper.id')
    cy.xpath("//div[text()='Email atau No. Handphone']").should('be.visible').and('exist').should('have.text', 'Email atau No. Handphone')
    cy.xpath("//input[@name='email']").should('be.visible').and('exist').type('kandidat@paper.id').should('have.value', 'kandidat@paper.id')
    cy.xpath("//button[@type='submit']").should('be.visible').click()
    cy.xpath("//div[text()='Masukkan Kata Sandi']").should('be.visible').and('exist').should('have.text', 'Masukkan Kata Sandi')
    cy.xpath("//input[@placeholder='Masukkan kata sandi Anda']").should('be.visible').and('exist').type('jakarta123').should('have.value', 'jakarta123')
    cy.xpath("//button[text()=' Masuk ']").should('be.visible').click()
    cy.wait(15000)
    cy.url().should('include', 'https://paper.id/webappv1/#/invoicer/dashboard')
    cy.reload()
    cy.xpath("//aside/perfect-scrollbar/div/div[1]/div/ul/div[1]/li[1]/a/span[text()='Penjualan']").should('be.visible').click()
    cy.xpath("//a[@href='#/invoicer/invoice']").should('be.visible').click()
    cy.xpath("//button[text()=' Buat Invoice Baru ']").should('be.visible').click()
    cy.wait(10000)
    cy.xpath("//h1[text()=' Buat Invoice Penjualan ']").should('contain.text', 'Buat Invoice Penjualan')
    cy.xpath("//div[text()='No Data Selected']").should('be.visible').click()
    cy.xpath("//div/span[text()='Acong']").should('be.visible').click()
    cy.xpath("//span[@class='ng-value-label ng-star-inserted']").should('have.text','Acong')
    cy.xpath("//button[text()=' Tambah Produk dari Stok ']").should('be.visible').click()
    cy.xpath("//p-table/div/div/table/tbody/tr/td").contains(' LED TV ').prev('td').click();
    cy.xpath("//button[text()=' Simpan ']").should('be.visible').click()
    cy.wait(2000)
    cy.xpath("//textarea[@id='quantity']").focus().type(2,{force: true})
    cy.xpath("//button[text()=' Simpan Invoice ']").should('be.visible').click()
    cy.xpath("//a[text()=' Simpan dan Konfirmasi ']").should('be.visible').click()
    cy.xpath("//button[text()='OKAY']").should('be.visible').click()
    cy.xpath("//div[contains(@class,'paper-document-title')]").should('be.visible').should('contain.text','INV')
    let txt= "";
    let subTxt="";
    cy.xpath("//div[contains(@class,'paper-document-title')]").then(($text) =>{
      txt = $text.text();
      subTxt = txt.split(" ")[1];
      cy.xpath("//div[contains(@class,'invoice-status')]").should('be.visible').should('have.text','Unpaid')
      cy.xpath("//aside/perfect-scrollbar/div/div[1]/div/ul/div[1]/li[1]/a/span[text()='Penjualan']").should('be.visible').click()
      cy.xpath("//a[@href='#/invoicer/invoice']").should('be.visible').click()
      cy.wait(1000)
      cy.xpath("//input[@placeholder='Search']").should('be.visible').type(subTxt)
    })
    
  })
})