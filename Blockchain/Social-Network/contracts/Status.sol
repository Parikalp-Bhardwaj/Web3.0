//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;
contract Status{
    struct Status_{
        uint id;
        string hash;
        string description;
        address payable author;
    }
    mapping(uint => Status_) public status;
    uint public StatusCounts;

    event StatusCreated(uint id,string,string,address);
    
    function uploadStatus(string memory _hash,string memory _description)public{
        require(bytes(_hash).length > 0,"hash is undefined");
        require(bytes(_description).length > 0,"description is undefined");
        require(msg.sender != address(0x0));
        StatusCounts++;
        status[StatusCounts] = Status_(StatusCounts,_hash,_description,payable(msg.sender));
        emit StatusCreated(StatusCounts,_hash,_description,msg.sender);
    }

  

}

