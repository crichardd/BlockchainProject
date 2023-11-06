pragma solidity ^0.8.0;

contract DataStorage {
    address owner;
    mapping(address => mapping(bytes32 => string)) private userData;

    modifier onlyOwner() {
        require(msg.sender == owner, " ");
        _;
    }

    constructor() payable {
        owner = msg.sender;
    }

    function storeData (bytes32 dataKey, string memory dataValue) public {
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
}