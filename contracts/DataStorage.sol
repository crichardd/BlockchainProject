pragma solidity ^0.8.0;

contract DataStorage {
    address owner;
    mapping(address => mapping(bytes32 => string)) private userData;

    struct PersonalData {
        string lastname;
        string firstname;
        string birthday;
        string mail;
        string phone;
        string adresse;
        string accountkey;
    }

    mapping(address => PersonalData) private personalData;

    modifier onlyOwner() {
        require(msg.sender == owner, " ");
        _;
    }

    constructor() payable {
        owner = msg.sender;
    }

    function storeData(bytes32 dataKey, string memory dataValue) public {
        userData[msg.sender][dataKey] = dataValue;
    }

    function getData(address userAddress, bytes32 dataKey) public view returns (string memory){
        return userData[userAddress][dataKey];
    }

    function grantAccess(address userAddress, bytes32 dataKey, address thirdParty) public onlyOwner {
        require(msg.sender != thirdParty, " ");
        string memory data = userData[userAddress][dataKey];
        userData[thirdParty][dataKey] = data;
    }

    function storePersonalData(string memory lastname, string memory firstname, string memory birthday, string memory mail, string memory phone, string memory adresse, string memory accountkey) public {
        personalData[msg.sender] = PersonalData(lastname, firstname, birthday, mail, phone, adresse, accountkey);
    }

    function getPersonalData(address userAddress) public view returns (string memory lastname, string memory firstname, string memory birthday, string memory mail, string memory phone, string memory adresse, string memory accountkey) {
        PersonalData storage data = personalData[userAddress];
        return (data.lastname, data.firstname, data.birthday, data.mail, data.phone, data.adresse, data.accountkey);
    }

    function grantAccessPersonalData(address userAddress, address thirdParty) public onlyOwner {
        require(msg.sender != thirdParty, "Permission denied");
        personalData[thirdParty] = personalData[userAddress];
    }

    function revokeAccessPersonalData(address adresse, address thirdParty) public onlyOwner {
        require(msg.sender != thirdParty, "Permission denied");
        personalData[thirdParty] = PersonalData("", "", "", "", "", "", "");
        personalData[adresse] = PersonalData("", "", "", "", "", "", "");
    }
}