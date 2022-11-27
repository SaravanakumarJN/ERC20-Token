const hre = require("hardhat");

// Deployed contract address : 0x4EEdAfa3e571A157BC98441beb131a4E187879e5
async function main() {
  const Erc20 = await hre.ethers.getContractFactory("Erc20")
  const erc20 = await Erc20.deploy("Crypto Rupee Index", "CRE8", 18, 1000000)
  await erc20.deployed()

  console.log("Contract Address", erc20.address)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
