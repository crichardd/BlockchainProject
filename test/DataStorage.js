const DataStorage = artifacts.require("DataStorage"); // Assurez-vous que le nom du contrat correspond au fichier de votre contrat

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
});
