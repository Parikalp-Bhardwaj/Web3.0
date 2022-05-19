import React, { useState,useEffect } from 'react'
import { Box,Image  } from '@chakra-ui/react'
import {ethers} from "ethers"


const Purchases = ({marketplace,nfts,accounts}) => {
  const [purchases,setPurchases] = useState([])


  const loadPurchasedItem = async()=>{
  const filter = marketplace.filters.Bought(null,null,null,null,null,accounts)
  const result = await marketplace.queryFilter(filter)
  const purchase = await Promise.all(result.map(async i =>{
    i = i.args
    const url = await nfts.tokenURI(i.tokenId)
    const respone = await fetch(url)
    const metadata = await respone.json()
    const totalPrice = await marketplace.getTotalPrice(i.itemId)
    let purchasedItem = {
      totalPrice,
      price:i.price,
      itemId:i.itemId,
      name:metadata.name,
      description:metadata.description,
      video:metadata.video
    }
    return purchasedItem
  }))
  setPurchases(purchase)

}

useEffect(()=>{
  loadPurchasedItem()
},[])


  return (
    <div>
      
      {purchases.length > 0 ? 
      <div>
          {purchases.map((item,index)=>{
          return (
              <Box  key={index} className="ml-2" maxW='sm' borderWidth='1px' borderRadius='md' overflow='hidden' boxSize="250px" height="320px" >
                  <Image src={item.video} alt={''} boxSize='245px'  />

              <Box p='6' className="flex justify-center items-center flex-col bg-gray-500 text-white">
                   <hr></hr>
                   <p className="mt-2
                    text-white border-solid">
                      {ethers.utils.formatEther(item.totalPrice)} ETH
                      </p>
                  
              </Box>
             </Box>)})}
        </div>
      :(
        <div className="flex justify-center items-center">
          <h1 className="text-3xl mt-5">No Purchases</h1>
        </div>
      )}

    </div>
  )
}

export default Purchases