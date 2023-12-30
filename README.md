# BlockchainProject
https://docs.bnbchain.org/docs/hardhat-new


npm install 

npx hardhat compile

# deployer le contract
npx hardhat run --network sepolia scripts/deploy.js

# avoir l'adresse du contract
npx hardhat verify --network sepolia 0xbfb8C117d92a56Fc652d818f098F06542aec47A9   


# Info after deploy
Adress send Deploying contracts with the account: 0xf7E4Dd8Df7Bfce6de7B9A4DC4e2cDa6a7Df31210

Adress receive Lock with 0.001ETH and unlock timestamp 1699648275 deployed to 0xbfb8C117d92a56Fc652d818f098F06542aec47A9

# adresse du contract
https://sepolia.etherscan.io/address/0xbfb8C117d92a56Fc652d818f098F06542aec47A9#code

# run test 
npx hardhat test