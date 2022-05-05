
const hre = require("hardhat");

async function main() {
 
  const Main = await ethers.getContractFactory("Main")
  const main = await Main.deploy();
  await main.deployed()
  console.log("address ",main.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


  // 0x5FbDB2315678afecb367f032d93F642f64180aa3