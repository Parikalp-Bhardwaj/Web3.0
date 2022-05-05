const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Main", function () {
  let main,add1,add2
  beforeEach(async()=>{

    const Main = await ethers.getContractFactory("Main");
    main = await Main.deploy();

    [deployer,add1] = await ethers.getSigners(); 
  });

  describe("Deploy Contract",()=>{
    let set;
    beforeEach(async()=>{
       set = await main.Set("abc","def","abcde@gmail.com","12345","12345")
    });
    it("should deploy function",async()=>{
      
      await set.wait()
      console.log("address ",deployer.address)
      expect(await main.id()).to.equal(1)
      await expect(set).to.emit(main,"str").withArgs("abc","def","abcde@gmail.com","12345","12345")
    });

    it("should track struct value",async()=>{

      const info = await main.informations(1);
       expect(info.name).to.equal("abc");
       expect(info.lname).to.equal("def");
       expect(info.email).to.equal("abcde@gmail.com");
       expect(info.password).to.equal("12345");
       expect(info.conPassword).to.equal("12345");


    })
  })

  
});
