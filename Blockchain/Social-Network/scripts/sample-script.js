const fs = require('fs')
const hre = require("hardhat");


async function status(){
  const Status = await hre.ethers.getContractFactory("Status");
  const status = await Status.deploy();

  await status.deployed()

  console.log("address ",status.address)

  let Statusaddress = {
    stsAddr:status.address
  }

 let addresJson = JSON.stringify(Statusaddress)

 fs.writeFileSync("./client/src/artifacts/address.json",addresJson)

}



const runMain=async()=>{
  try{
    await status()
    process.exit(0);
  }

  catch(err){
    console.error(err);
    process.exit(1)
  }
}

runMain();
