const { expect } = require("chai");
const { ethers } = require("hardhat");

const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num)

describe("Greeter", function () {
  let nft,marketplace,deployer,add1,add2,allAdd
  beforeEach(async()=>{
    const NFT = await ethers.getContractFactory("NFT")
    const MarketPlace = await ethers.getContractFactory("MarketPlace");

    [deployer,add1,add2,...allAdd] = await ethers.getSigners()
    nft = await NFT.deploy()
    marketplace = await MarketPlace.deploy(1);

  })
  describe("Development",()=>{
    it("Should track name and symbol of the nft collection",async()=>{
      expect(await nft.name()).to.equal("YOUR TOKEN");
      expect(await nft.symbol()).to.equal("TOKEN");
    })
    it("Should track feeAmount not feePercent",async()=>{
      expect(await marketplace.feeAccount()).to.equal(deployer.address);
      expect(await marketplace.feePercent()).to.equal(1)
    })

    it("Should trach each mint nft",async()=>{
      await nft.connect(add1).mint("Token")
      expect(await nft.tokenCount()).to.equal(1)
      expect(await nft.balanceOf(add1.address)).to.equal(1)
    })
  })

  describe("Making marketplace items",()=>{
    beforeEach(async ()=>{
      await nft.connect(add1).mint("Token");
      await nft.connect(add1).setApprovalForAll(marketplace.address,true)
  })
  it("Should track newly created item, transfer NFT from seller to marketplace and emit offered event",async()=>{
      await expect(marketplace.connect(add1).makeItem(nft.address,1,toWei(1)))
          .to.emit(marketplace,"Offered")
          .withArgs(1,nft.address,1,toWei(1),add1.address)
      
          expect(await nft.ownerOf(1)).to.equal(marketplace.address);
          expect(await marketplace.itemCount()).to.equal(1);
          const items =await marketplace.Items(1);
          expect(items.itemId).to.equal(1);
          expect(items.nft).to.equal(nft.address);
          expect(items.tokenId).to.equal(1)
          expect(items.price).to.equal(toWei(1))
          expect(items.sold).to.equal(false)
  })
  it("should fall if price is zero",async()=>{
      await expect(marketplace.connect(add1).makeItem(nft.address,1,0))
      .to.be.revertedWith("Price must be greater than zero");
  });
  });

  describe("Purchasing marketplace items ",async()=>{
    let price = 2;
    beforeEach(async ()=>{
        await nft.connect(add1).mint("Sample")

        await nft.connect(add1).setApprovalForAll(marketplace.address,true);

        await marketplace.connect(add1).makeItem(nft.address,1,toWei(price));
    })
    it("should update item as sold, pay seller, transfer NFT to buyer , charge fees and emit a bought event",async()=>{
        const sellerInitalEthBal = await add1.getBalance();
        const feeAccountInitialEthBal = await deployer.getBalance();


        totalPriceWei = await marketplace.getTotalPrice(1);

        await expect(marketplace.connect(add2).purchaseItem(1,{value:totalPriceWei}))
            .to.emit(marketplace,"Bought")
            .withArgs(1,nft.address,1,toWei(price),add1.address,add2.address)

        

    })
})


})

  

