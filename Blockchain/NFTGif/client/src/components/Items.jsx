import React,{useState,useEffect} from 'react'
import { Box,Image  } from '@chakra-ui/react'
import {ethers} from "ethers"

function renderSoldItems(items) {
    return (
      <div>
        <h2 className="text-3xl m-12 bg-black text-white mt-10 w-full:md">Sold</h2>
        {items.map((item,index)=>{
            return (

           <Box key={index} className="ml-2" maxW='sm' borderWidth='1px' borderRadius='md' overflow='hidden' boxSize="250px" height="410px" >
           <Image src={item.video}  boxSize='245px'  />
  
            <Box p='6' className="flex justify-center items-center flex-col bg-gray-500 text-white">
           <Box display='flex' alignItems='baseline'>
           
         
           </Box>
           <Box
               mt='1'
               fontWeight='semibold'
               as='h4'
               lineHeight='tight'
               className="text-lg"
               isTruncated
               >
                For {ethers.utils.formatEther(item.totalPrice)} ETH - Recieved {ethers.utils.formatEther(item.price)} ETH
            </Box>
         </Box>
         </Box>
         )
        })}
      </div>
    )
  
  }
  



const Items = ({marketplace,nfts,accounts}) => {
  const [listedItems,setListedItems] = useState([])
  const [soldItems,setSolidItems] = useState([])

  const loadListedItems = async()=>{
    const itemCount = await marketplace.itemCount();
    const listedItems = []
    const soldItem = []

    for(let index = 1;index <= itemCount;index++){
  
      const i = await marketplace.Items(index);
      if (i.seller.toLowerCase() === accounts){
   

        const url = await nfts.tokenURI(i.tokenId)
        //get url url from nfts contract
        const response = await fetch(url);
        const metadata = await response.json()
        //get total price of item 
        const totalPrice = await marketplace.getTotalPrice(i.itemId)

        let item = {
          totalPrice,
          price:i.price,
          itemId:i.itemId,
          name:metadata.name,
          description:metadata.description,
          video:metadata.video
        }
        listedItems.push(item)
        //Add listed item to sold items array if sold
  
        if (i.sold)soldItem.push(item)
      }

    }

    setListedItems(listedItems)
    setSolidItems(soldItem);
   

  }
  useEffect(()=>{
      loadListedItems();
  },[])



  return (
    <div>
   {listedItems.length > 0 ? 
      <div>
          {listedItems.map((item,index)=>{
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
             </Box>
            
                  )


          })}
          {soldItems.length > 0 && renderSoldItems(soldItems)}
        </div>
      :(
        <div className="flex justify-center items-center">
          <h1 className="text-3xl mt-5">No Listed Items</h1>
        </div>
      )}
        
    </div>
  )
}

export default Items