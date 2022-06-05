
const hre = require("hardhat");

const main= async()=>{
  const Tokens = await hre.ethers.getContractFactory("Token");
  const token = await Tokens.deploy("Token","TK",(10*18).toString());

  await token.deployed();

  const Exchange = await hre.ethers.getContractFactory("Exchange");
  const exchange = await Exchange.deploy(token.address);
  await exchange.deployed();

  console.log("Token deployed to: ",token.address) 
  console.log("Exchange deployed to: ",exchange.address) 


}

const runMain = async()=>{
  try{

    await main();
    process.exit(0)

  }catch(error){
    console.error(error);
    process.exit(1)
  }
}

runMain();