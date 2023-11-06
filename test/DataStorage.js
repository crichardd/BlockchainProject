const DataStorage = artifacts.require("DataStorage"); 

contract("DataStorage", (accounts) => {
    let dataStorageInstance;

    beforeEach(async () => {
        dataStorageInstance = await DataStorage.new({ from: accounts[0] });
    });

    it("devrait stocker et récupérer des données", async () => {
        const dataKey = web3.utils.fromAscii("name");
        const dataValue = "John Doe";

        await dataStorageInstance.storeData(dataKey, dataValue, { from: accounts[0] });
        const storedValue = await dataStorageInstance.getData(accounts[0], dataKey);

        assert.equal(storedValue, dataValue, "La valeur stockée devrait être égale à la valeur d'origine.");
    });

    it("devrait accorder l'accès et récupérer des données accordées", async () => {
        const dataKey = web3.utils.fromAscii("name");
        const dataValue = "John Doe";
        const thirdParty = accounts[1];

        await dataStorageInstance.storeData(dataKey, dataValue, { from: accounts[0] });
        await dataStorageInstance.grantAccess(accounts[0], dataKey, thirdParty, { from: accounts[0] });

        const grantedValue = await dataStorageInstance.getData(thirdParty, dataKey);

        assert.equal(grantedValue, dataValue, "La valeur accordée devrait être égale à la valeur d'origine.");
    });

    it("devrait stocker et récupérer des données personnelles", async () => {
        const lastname = "John";
        const firstname = "Doe";
        const birthday = "15/04/1998";
        const mail = "John.Doe@gmal.com";
        const phone = "06 08 06 08 06";
        const adresse = "1 bis avenue des Doe, 11 111, DoeVille";
    
        await dataStorageInstance.storePersonalData(lastname, firstname, birthday, mail, phone, adresse, { from: accounts[0] });
        const { lastname: storedLastname, firstname: storedFirstname, birthday: storedBirthday, mail: storedMail, phone: storedPhone, address: storedAdresse } = await dataStorageInstance.getPersonalData(accounts[0]);
    
        assert.equal(storedLastname, lastname, "Le nom stocké doit être égal au nom d'origine.");
        assert.equal(storedFirstname, firstname, "Le prénom stocké doit être égal au prénom d'origine.");
        assert.equal(storedBirthday, birthday, "Le prénom stocké doit être égal au prénom d'origine.");
        assert.equal(storedMail, mail, "Le prénom stocké doit être égal au prénom d'origine.");
        assert.equal(storedPhone, phone, "Le prénom stocké doit être égal au prénom d'origine.");
        assert.equal(storedAdresse, adresse, "Le prénom stocké doit être égal au prénom d'origine.");


    });
    
    it("devrait accorder l'accès et récupérer des données personnelles accordées", async () => {
        const lastname = "John";
        const firstname = "Doe";
        const birthday = "15/04/1998";
        const mail = "John.Doe@gmal.com";
        const phone = "06 08 06 08 06";
        const adresse = "1 bis avenue des Doe, 11 111, DoeVille";

        const thirdParty = accounts[1];
    
        await dataStorageInstance.storePersonalData(lastname, firstname, birthday, mail, phone, adresse, { from: accounts[0] });
        await dataStorageInstance.grantAccessPersonalData(accounts[0], thirdParty, { from: accounts[0] });
    
        const { lastname: grantedLastname, firstname: grantedFirstname, birthday : grantedBirthday, mail: grantedMail, phone: grantedPhone, adresse: grantedAdresse } = await dataStorageInstance.getPersonalData(thirdParty);
    
        assert.equal(grantedLastname, lastname, "Le nom accordé doit être égal au nom d'origine.");
        assert.equal(grantedFirstname, firstname, "Le prénom accordé doit être égal au prénom d'origine.");
        assert.equal(grantedBirthday, birthday, "Le prénom accordé doit être égal au prénom d'origine.");
        assert.equal(grantedMail, mail, "Le prénom accordé doit être égal au prénom d'origine.");
        assert.equal(grantedPhone, phone, "Le prénom accordé doit être égal au prénom d'origine.");
        assert.equal(grantedAdresse, adresse, "Le prénom accordé doit être égal au prénom d'origine.");

    });
    
});
