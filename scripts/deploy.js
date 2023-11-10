const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = ethers.utils.parseEther("0.000");

  const lock = await ethers.getContractFactory("DataStorage");
  const lockInstance = await lock.deploy({
    value: lockedAmount,
  });

  await lockInstance.deployed();

  console.log(
    `Lock with ${ethers.utils.formatEther(
      lockedAmount
    )} ETH and unlock timestamp ${unlockTime} deployed to ${lockInstance.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
