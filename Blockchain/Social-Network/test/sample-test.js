const {expect} = require("chai");


describe("Status Contract",function(){
    let Status;
    let owner;
    let addr1
    let status;

    beforeEach("Start Before ",async()=>{
        Status = await ethers.getContractFactory("Status");
        [owner,...addr1] = await ethers.getSigners();
        
        status = await Status.deploy()
        
    })

    describe("deployment",function(){
        let result;
        const hash = "abc123"
        
        it("deploys successfully",async function(){
            result = await status.uploadStatus(hash,"No Caption");
            let StatusCount = await status.StatusCounts();
           
            expect(await StatusCount).to.equal(1);
            await expect(result).to.emit(status,"StatusCreated").withArgs(1,hash,"No Caption",owner.address)
        })

        
    })
    
})

