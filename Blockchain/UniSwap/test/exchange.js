const { expect } = require("chai");
const { ethers } = require("hardhat");
const toWei = (value) => ethers.utils.parseEther(value.toString());
const fromWei = (num) => ethers.utils.formatEther(num)

const getBalance = ethers.provider.getBalance;
describe("Exchange", function () {
  let token
  let exchange
  let owner,user,allAddrs;
  beforeEach(async()=>{
    const Tokens = await hre.ethers.getContractFactory("Token");
    token = await Tokens.deploy("Token","TK",toWei(1000000));

    await token.deployed();

    const Exchange = await hre.ethers.getContractFactory("Exchange");
    exchange = await Exchange.deploy(token.address);
    await exchange.deployed();
    [owner,user,...allAddrs] = await ethers.getSigners()
  })
  it("deployed ",async()=>{
    expect(await exchange.deployed()).to.equal(exchange)
  })
  describe("Development ",async()=>{
    it("adds liquidity",async()=>{
      await token.approve(exchange.address,toWei(2000))
      await exchange.addLiquidity(toWei(2000),{value:toWei(1000)})

      expect(await token.balanceOf(exchange.address)).to.equal(toWei(2000));
      expect(await exchange.getReserve()).to.equal(toWei(2000));

    })
  })

  describe("getTokenAmount",()=>{
    it("should return the amount of token",async()=>{
      await token.approve(exchange.address,toWei(2000))
      await exchange.addLiquidity(toWei(2000),{value:toWei(1000)})

      const tokenAmount = await exchange.getTokenAmount(toWei(10));
      expect(await fromWei(tokenAmount)).to.equal("19.80198019801980198")

      const tokenAmount2 = await exchange.getTokenAmount(toWei(1000));
      expect(await fromWei(tokenAmount2)).to.equal("1000.0")


    })
  })
  describe("getEtherAmount ",()=>{
    const oneEth = ethers.utils.parseEther("2.0")
    it("should return amount of ether",async()=>{
      await token.approve(exchange.address,toWei(2000))
      await exchange.addLiquidity(toWei(2000),{value:toWei(1000)})

      let ethAmount = await exchange.getEthAmount(oneEth);
      expect(await fromWei(ethAmount)).to.equal("0.999000999000999")
      
      ethAmount = await exchange.getEthAmount(ethers.utils.parseEther("2000.0"));
      expect(await fromWei(ethAmount)).to.equal("500.0")
    })
  })

  describe("ethToTokenSwap",async()=>{
    beforeEach(async()=>{
      await token.approve(exchange.address, toWei(2000));
      await exchange.addLiquidity(toWei(2000), { value: toWei(1000) });
    })
    it("transfers at least min amount of tokens", async () => {
      const userBalanceBefore = await getBalance(user.address);

      await exchange
        .connect(user)
        .ethToTokenSwap(toWei(1.99), { value: toWei(1) });

      const userBalanceAfter = await getBalance(user.address);

      expect(toWei(userBalanceAfter - userBalanceBefore)).to.equal("-1000066146751217700000000000000000000")

     
    });
    
  })


});
