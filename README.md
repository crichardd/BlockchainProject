# BlockchainProject
https://docs.bnbchain.org/docs/hardhat-new


npm install 

npx hardhat compile

# deployer le contract
npx hardhat run --network sepolia scripts/deploy.js

# avoir l'adresse du contract
npx hardhat verify --network sepolia 0x42b42511a928A45894b560f8245909753c330979   


# Info after deploy
Adress send Deploying contracts with the account: 0xf7E4Dd8Df7Bfce6de7B9A4DC4e2cDa6a7Df31210

Adress receive Lock with 0.001ETH and unlock timestamp 1699648275 deployed to 0x42b42511a928A45894b560f8245909753c330979

# adresse du contract
https://sepolia.etherscan.io/address/0x42b42511a928A45894b560f8245909753c330979#code

# run test 
npx hardhat test

# run local
npx hardhat node
npx hardhat run --network localhost scripts/deploy.js