const fs = require("fs")
const hre = require("hardhat");
const { ethers } = require("hardhat");
async function main() {

  // We get the contract to deploy
  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy();

  await nft.deployed();

  const MarketPlace = await ethers.getContractFactory("MarketPlace");
  const marketplace = await MarketPlace.deploy(1);

  console.log("NFT deployed to:", nft.address);
  console.log("MarketPlace deployed to: ",marketplace.address);

  let addresses = {
    nftAddress:nft.address,
    marketplaceAddress:marketplace.address
  }

  let addressJson = JSON.stringify(addresses)
  fs.writeFileSync("./client/src/artifacts/Addresses.json",addressJson)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
