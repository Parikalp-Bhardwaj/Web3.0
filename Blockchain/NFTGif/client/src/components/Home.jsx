import React,{useState,useEffect} from 'react'
import { Box,Badge,Image  } from '@chakra-ui/react'
import {ethers} from "ethers"



const Items = ({marketplace,nfts}) => {
    const [Item,setItem] = useState([])
 
    
    const loadMarketPlace = async()=>{
        const itemsCount = await marketplace.itemCount()
        const items = []
        for(let i = 1;i <= itemsCount;i++){
            const item = await marketplace.Items(i)
            if (!item.sold){
                const url = await nfts.tokenURI(item.tokenId);
                const respone = await fetch(url)
                const metadata = await respone.json()
                const totalPrice = await marketplace.getTotalPrice(item.itemId)
                items.push({
                    totalPrice,
                    itemId:item.itemId,
                    seller:item.seller,
                    name:metadata.name,
                    description:metadata.description,
                    video:metadata.video

                })
            }
        }
        setItem(items)


    }




    const buyMarketItem = async (item) => {
        await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
        loadMarketPlace()
      }
    

    useEffect(()=>{
        async function getData(){
            await loadMarketPlace()
        }
        
        getData()

    },[])

  return (
    <div>
        {Item.length > 0 ? 
        <div>
            {Item.map((item,index) =>{
        return (
            <Box key={index} className="ml-2" maxW='sm' borderWidth='1px' borderRadius='md' overflow='hidden' boxSize="250px" height="410px" >
                <Image src={item.video} alt={''} boxSize='245px'  />

                <Box p='6' className="flex justify-center items-center flex-col bg-gray-500 text-white">
                    <Box display='flex' alignItems='baseline'>
                    <Badge borderRadius='full' px='2' colorScheme='teal'>
                        <h2>{item.name}</h2>
                    </Badge>
                   
                        </Box>
                        <Box
                            mt='1'
                            fontWeight='semibold'
                            as='h4'
                            lineHeight='tight'
                            className="text-lg"
                            isTruncated
                            >
                            {item.description}
                        </Box>
                        <hr></hr>
                        <button className="mt-3 border-2 h-12 w-32 rounded-full bg-white
                        text-black border-solid hover:bg-[#1A1A1A] hover:text-white active:shadow-none 
                        active:translate-y-0 active:text-lg" onClick={() => buyMarketItem(item)}>
                            {ethers.utils.formatEther(item.totalPrice)} ETH
                            </button>
                        
                            </Box>
                            </Box>
                            )
                            })}



                    </div>
                    :(<p>No Nfts</p>)   
                    }
        </div>
  )
}

export default Items