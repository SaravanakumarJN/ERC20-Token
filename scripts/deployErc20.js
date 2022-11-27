const hre = require("hardhat");

async function main() {
  /*
    user1 => receiver1
    user2 => spender
    user3 => receiver2
  */
  const [contractOwner, user1, user2, user3] = await hre.ethers.getSigners()

  const Erc20 = await hre.ethers.getContractFactory("Erc20")
  const erc20 = await Erc20.deploy("Crypto Rupee Index", "CRE8", 18, 1000000)
  await erc20.deployed()

  console.log("Contract Address", erc20.address)

  // check name, symbol, total supply
  const tokenName = await erc20.name()
  const tokenSymbol = await erc20.symbol()
  const tokenTotalSupply = await erc20.totalSupply()
  console.log(tokenName, tokenSymbol, tokenTotalSupply)

  const contractOwnerBalance1 = await erc20.balanceOf(contractOwner.address)
  const receiver1Balance1 = await erc20.balanceOf(user1.address)

  // owner transfer
  await erc20.transfer(user1.address, 2)

  const receiver1Balance2 = await erc20.balanceOf(user1.address)
  const contractOwnerBalance2 = await erc20.balanceOf(contractOwner.address)
  console.log("Sender Balance Before: ", contractOwnerBalance1, " - Receiver Balance Before: ", receiver1Balance1)
  console.log("Sender Balance After: ", contractOwnerBalance2, " - Receiver Balance After: ", receiver1Balance2)

  // approval 
  await erc20.approve(user2.address, 100)
  const spenderAllowance = await erc20.allowance(contractOwner.address, user2.address)
  console.log("Spender allowance: ", spenderAllowance)

  const contractOwnerBalance3 = await erc20.balanceOf(contractOwner.address)
  const receiver2Balance1 = await erc20.balanceOf(user3.address)

  // spender transfer
  await erc20.connect(user2).transferFrom(contractOwner.address, user3.address, 50)

  const contractOwnerBalance4 = await erc20.balanceOf(contractOwner.address)
  const receiver2Balance2 = await erc20.balanceOf(user3.address)
  console.log("Sender Balance Before: ", contractOwnerBalance3, " - Receiver Balance Before: ", receiver2Balance1)
  console.log("Sender Balance After: ", contractOwnerBalance4, " - Receiver Balance After: ", receiver2Balance2)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
