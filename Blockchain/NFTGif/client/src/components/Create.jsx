import React,{useState} from 'react'
import {Input} from '@chakra-ui/react'

import AddressJson  from "../artifacts/Addresses.json"
import { ethers } from 'ethers'
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react'
import axios from "axios"
import {create as ipfsHttpClient} from "ipfs-http-client"
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0")



const Create = ({marketplace,nfts}) => {
    const format = (val) =>  val
    const parse = (val) => val.replace(/^\$/, '')
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState(0.0)
    const [video,setVideo] = useState('')

   


    const uploadToIPFS = async(event)=>{
        event.preventDefault();
        
        
        const files = event.target.files[0]
        if (typeof files !== "undefined"){
            try{
                const result = await client.add(files)
                setVideo(`https://ipfs.infura.io/ipfs/${result.path}`)
     
            }

            catch(error){
                console.log("ipfs image upload error: ",error)
            }
            
            
        }
        



    }

    const createNFT = async() =>{
        if (!name || !description || !video || !price)return

        try{
            const result = await client.add(JSON.stringify({name,description,video,price}))
           
            mintTheList(result)
        }
        catch(error){
            console.log("ipfs uri upload error: ", error)
        }
    }

    const mintTheList = async(result) =>{
        const url = `https://ipfs.infura.io/ipfs/${result.path}`
        
        await(await nfts.mint(url)).wait()
        
        const id = await nfts.tokenCount()

        await (await nfts.setApprovalForAll(AddressJson.marketplaceAddress,true)).wait()

        const listingPrice = ethers.utils.parseEther(price.toString())

        await(await marketplace.makeItem(AddressJson.nftAddress,id,listingPrice)).wait()

        axios.post("http://127.0.0.1:8000/api/nfts",{"video":video,"name":name,"description":description,"price":price})
        .then((res)=>{
            console.log("res ",res.data)
        })

        setName('')
        setVideo('')
        setDescription('')
        setPrice(0.0)

    }

    return (
        <div className="flex flex-row justify-center items-center flex-col">
         
          <Input width={'620px'} size='lg'
            fontSize="2xl" 
           errorBorderColor='red.300' type="file" name=".gif file" className="mb-2 mt-2"  onChange={uploadToIPFS}/>
           
           <br></br>
           <Input width={'620px'} placeholder='Name' size='lg'className="mb-2"
          fontSize="2xl"
           errorBorderColor='red.300' type="text" onChange={(e) => setName(e.target.value)} />
           <br></br>
           <Input width={'620px'} placeholder='Description' size='lg' className="mb-2"
          fontSize="2xl"
           errorBorderColor='red.300' type="text" onChange={(e) => setDescription(e.target.value)} />
           <br></br>


            <NumberInput  size='lg' className="mb-2"
                fontSize="2xl" width={'620px'}
                errorBorderColor='red.300'
                value={format(price)}
                onChange={(valueString) => setPrice(parse(valueString))}
                 step={0.1} 
                 defaultValue={0.0}
                >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>


          
          <button className="rounded-full bg:teal p-3 w-[620px] hover:bg-teal-700 active:bg-teal-500
           bg-teal-600 text-black mt-2" onClick={createNFT} >Submit</button>

     
    </div>
    )
}

export default Create