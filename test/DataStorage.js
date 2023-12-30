const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DataStorage Contract", function () {
  let dataStorage;
  let user1;
  let user2;

  this.beforeEach(async () => {
    [user1, user2] = await ethers.getSigners();

    // Deploy the contract and assign the deployed instance to dataStorage
    const DataStorage = await ethers.getContractFactory("DataStorage");
    dataStorage = await DataStorage.deploy();
    await dataStorage.waitForDeployment();

    console.log("Deploying contracts with the user2:", user2.address);
    console.log("Deploying contracts with the user1:", user1.address);

    await dataStorage.enregistrerUtilisateur(
      user1.address,
      "User3",
      "Doe3 ",
      "01/01/1998",
      "ali@example.com",
      "654 Main St",
      "1234567897"
    );
  });

  it("Enregistre un nouvel utilisateur", async function () {
    const nom = "John";
    const prenom = "Doe";
    const dateNaissance = "01/01/1990";
    const email = "john@example.com";
    const adresse = "123 Main St";
    const telephone = "1234567890";

    // Call the enregistrerUtilisateur function with new user data
    await dataStorage.enregistrerUtilisateur(
      user1.address,
      nom,
      prenom,
      dateNaissance,
      email,
      adresse,
      telephone
    );

    // // Fetch the user data after the transaction is mined
    const userData = await dataStorage.recupererOwnerDonneeUtilisateur(
      user1.address
    );
    // Verify that the user's data was correctly registered
    expect(userData.nom).to.equal(nom);
    expect(userData.prenom).to.equal(prenom);
    expect(userData.dateNaissance).to.equal(dateNaissance);
    expect(userData.email).to.equal(email);
    expect(userData.adresse).to.equal(adresse);
    expect(userData.telephone).to.equal(telephone);
    expect(userData.autorisationOwner).to.equal(true);

    // Verify the emitted event
    const event = (
      await dataStorage.queryFilter("NouvelUtilisateurEnregistre")
    )[0];
    expect(event.args[0]).to.equal(user1.address);
  });

  it("Récupère les données en tant que propriétaire", async function () {
    const ownerData = await dataStorage.recupererOwnerDonneeUtilisateur(
      user1.address
    );
    expect(ownerData[0]).to.equal("User3");
    expect(ownerData[1]).to.equal("Doe3 ");
    expect(ownerData[2]).to.equal("01/01/1998");
    expect(ownerData[3]).to.equal("ali@example.com");
    expect(ownerData[4]).to.equal("654 Main St");
    expect(ownerData[5]).to.equal("1234567897");
  });

  it("Accorde une autorisation à un utilisateur", async function () {
    await dataStorage.accorderAutorisation(user1.address, user2.address);
    const hasAuthorization = await dataStorage.getAccesAuthorisation(
      user1.address,
      user2.address
    );
    expect(hasAuthorization).to.equal(true);

    const event = (await dataStorage.queryFilter("AutorisationAccordee"))[0];
    expect(event.args[0]).to.equal(user1.address);
    expect(event.args[1]).to.equal(user2.address);

    const authorizedAddresses = await dataStorage.getAuthorizations(
      user1.address
    );
    expect(authorizedAddresses).to.deep.include(user2.address);
  });

  it("Récupère les données autorisées par un utilisateur", async function () {
    await dataStorage.accorderAutorisation(user1.address, user2.address);
    const authorizedData = await dataStorage.recupererDonneesAutorisees(
      user1.address,
      user2.address
    );

    // Vérifiez que les données récupérées correspondent aux données de l'utilisateur
    const userData = await dataStorage.recupererOwnerDonneeUtilisateur(
      user1.address
    );

    expect(authorizedData[0]).to.equal(userData.nom);
    expect(authorizedData[1]).to.equal(userData.prenom);
    expect(authorizedData[2]).to.equal(userData.dateNaissance);
    expect(authorizedData[3]).to.equal(userData.email);
    expect(authorizedData[4]).to.equal(userData.adresse);
    expect(authorizedData[5]).to.equal(userData.telephone);
  });

  it("Révoque une autorisation à un utilisateur", async function () {
    // Accorde d'abord une autorisation
    await dataStorage.accorderAutorisation(user1.address, user2.address);

    // Révoque l'autorisation
    await dataStorage.revoquerAutorisation(user1.address, user2.address);

    const hasAuthorization = await dataStorage.getAccesAuthorisation(
      user1.address,
      user2.address
    );
    expect(hasAuthorization).to.equal(false);

    const event = (await dataStorage.queryFilter("AutorisationRevoquee"))[0];
    expect(event.args[0]).to.equal(user1.address);
    expect(event.args[1]).to.equal(user2.address);
  });
});
