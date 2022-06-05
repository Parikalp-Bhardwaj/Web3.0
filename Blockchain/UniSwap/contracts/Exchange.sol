//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Exchange{
    address public tokenAddress;
    constructor(address _token){
        require(_token != address(0), "invalid token address");
        tokenAddress = _token;
    }

    function addLiquidity(uint _tokenAmount)public payable{
        IERC20 token = IERC20(tokenAddress);
        token.transferFrom(msg.sender,address(this),_tokenAmount);
    }

    function getReserve()public view returns(uint){
        return IERC20(tokenAddress).balanceOf(address(this));
    }

    
    function getTokenAmount(uint _ethSold)public view returns(uint){
        require(_ethSold > 0,"ethSold is too small");
        uint tokenReserve = getReserve();
        return getAmount(_ethSold,address(this).balance,tokenReserve);
    }

    function getEthAmount(uint _tokenSold)public view returns(uint){
        require(_tokenSold > 0,"Token Sold is too small");
        uint tokenReserve = getReserve();
        return getAmount(_tokenSold,tokenReserve,address(this).balance);
    }

    function ethToTokenSwap(uint _minToken)public payable{
        uint tokenReserve = getReserve();
        uint tokenBought = getAmount(msg.value,address(this).balance - msg.value,tokenReserve);
        require(tokenBought >= _minToken, "insufficient output amount");
        IERC20(tokenAddress).transfer(msg.sender,tokenBought);

    }

    function tokenToEthSwap(uint _tokenSold,uint _minEth)public{
        uint tokenReserve = getReserve();
        uint ethBought = getAmount(_tokenSold,tokenReserve,address(this).balance);
        require(ethBought >= _minEth,"Insufficient output amount");
        IERC20(tokenAddress).transferFrom(msg.sender,address(this),_tokenSold);
        payable(msg.sender).transfer(ethBought);
    }


    function getAmount(uint inputAmount,uint inputReserve,uint outputReserve)private pure returns(uint){
        require (inputAmount > 0 && outputReserve > 0,"invalid reserve");
        return (inputAmount * outputReserve) / (inputReserve + inputAmount);
    }


}