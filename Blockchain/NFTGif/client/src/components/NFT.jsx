import React, { useState } from 'react'

import Create from './Create'
import {ethers} from "ethers"
import AddressJson from "../artifacts/Addresses.json"
import MarketPlace from "../artifacts/contracts/MarketPlace.sol/MarketPlace.json"
import Nfts from "../artifacts/contracts/Nfts.sol/NFT.json"
import Items from './Items'
import { Routes,Route } from 'react-router-dom';
import Navbar from "./Navbar"
import { Spinner } from '@chakra-ui/react'
import Home from "./Home"
import Purchases from "./Purchases"

const NFT = () => {
  const [accounts,setAccount] = useState(null)
  const [signers,setSigners] = useState(null)
  const [nfts,setNfts] = useState(null)
  const [marketplace,setMarketPlace] = useState(null);
  const [loading,setLoading] = useState(true)

  const ConnectWeb3 = async() =>{
    if(window.ethereum !== undefined){
        const provider = new ethers.providers.Web3Provider(window.ethereum,"any")
        const account = await window.ethereum.request({method:"eth_requestAccounts"})
        setAccount(account[0])
        window.ethereum.on("chainChanged",(chainId)=>{
          window.location.reload()
        })

        window.ethereum.on("accountsChanged",async()=>{
          setAccount(account[0])
          await ConnectWeb3()
        })

        const signer = provider.getSigner()
        setSigners(signer)


       loadContract(signer)


    }

    else{
      alert("Install MetaMask")
    }
}

const loadContract = (signer) =>{
  const marketplace = new ethers.Contract(AddressJson.marketplaceAddress,MarketPlace.abi,signer)
  setMarketPlace(marketplace)
  const nft = new ethers.Contract(AddressJson.nftAddress,Nfts.abi,signer)
  setNfts(nft)
  setLoading(false)
}

// useEffect(()=>{

//    ConnectWeb3()

// },[!loading])



  return (
    <div>


      <Navbar ConnectWeb3={ConnectWeb3} accounts={accounts} />
        {loading ? (
        <div className='flex justify-center items-center mt-80'>
          <Spinner size='xl' speed='0.65s' color='blue.500' />
        </div> ):
        (<Routes>
          <Route path='/' element={<Home marketplace={marketplace} nfts={nfts}/>} />
          <Route path='/create' element={<Create  marketplace={marketplace} nfts={nfts}  />} />
          <Route path='/my-listed-items' element={<Items marketplace={marketplace} nfts={nfts} accounts={accounts} />} />
          <Route path='/my-purchases' element={<Purchases marketplace={marketplace} nfts={nfts} accounts={accounts} />} />
        </Routes>
          )}






    </div>
  )
}

export default NFT