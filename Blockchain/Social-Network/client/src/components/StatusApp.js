import React,{useState,useEffect} from 'react'
import {ethers} from "ethers"
import Status from "../artifacts/contracts/Status.sol/Status.json"
import addresJson from "../artifacts/address.json"
import {create as ipfsHttpClient} from "ipfs-http-client"
import { Image } from '@chakra-ui/react'
import { Box,Flex,Text,Center } from '@chakra-ui/react'
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0")

const StatusApp = () => {
    const [contract, setContract] = useState(null);
    const [account,setAccount] = useState(null);
    const [text,setText] = useState('');
    const [files,setFile] = useState('')
    const [mapping,setMapping] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        async function loadMetaMask() {
        await ConnectToMetaMask();
        }
        loadMetaMask();
    },[])


   const ConnectToMetaMask = async () => {
      if(typeof window.ethereum !== "undefined"){
        const accounts = await window.ethereum.request({method:"eth_requestAccounts"})
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setAccount(accounts[0])

        const signer = provider.getSigner();
        const network = new ethers.Contract(addresJson.stsAddr,Status.abi,signer);
        setContract(network)
        setLoading(false)
        }
    }

   
    const uploadIpfs = async(event)=>{
        event.preventDefault();
        const file = event.target.files[0]
        if (typeof file !== "undefined"){
            try{
                const result = await client.add(file)
                setFile(`https://ipfs.infura.io/ipfs/${result.path}`)
                
            }
            catch(err){
                console.log("ipfs image upload error: ", err)
            }
        }

        
    }

    const submitFile = async(event) =>{
        event.preventDefault();
        const status = await contract.uploadStatus(files,text);
        await status.wait()
        setText('')
        loadData()
    }

    const loadData = async()=>{
        const statusCount = await contract.StatusCounts();
        const listedItem = []
        for(let i = 1;i <= statusCount;i++){
            const item = await contract.status(i);
            console.log("item ",item)
            const hash = item.hash;
            const desc = item.description;
            const auth = item.author;
            let items = {
                id:item.id.toString(),
                hash,
                desc,
                auth
            }
            listedItem.push(items)
        }
        setMapping(listedItem)

    }
    




  return (
    <div >
        <div className="flex justify-center pt-10">
            {loading?"":(<p className="text-3xl">{account.slice(0,4)+"..."+account.slice(38,42)}</p>)}
        </div>
    <form onSubmit={submitFile} method="POST" className="flex justify-center items-center mr-24 mt-10 flex-col">

    <input type="file" accept='.jpg, .jpeg, .png, .bmp, .gif, .jfif' onChange={uploadIpfs} />
    <input className='w-96 mt-5 ml-20 h-12 p-5 border-2 border-gray-700	 border-solid rounded '
     type="text" name='text' value={text} onChange={(e) =>setText(e.target.value)}  />
    <button type='submit' className='mt-4 border-2 ml-20 bg-blue-700 text-white h-12 w-96 hover:bg-blue-600 active:bg-blue-800 
    ' >Submit</button>
    <br></br>
    <div>
    {mapping.map((item,idx)=>{
        return (
        <div key={idx}>
                    <Box w="500px" borderWidth='2px' borderRadius='lg' className="ml-28">
                    <Center w='500px' bg='green.500'>
                        <Text>{item.auth}</Text>
                    </Center>
                    
                    <Flex>
                        <Image borderWidth='2px' borderRadius='full' src={item.hash} boxSize='70px'  />
                 
                        <Box  flex='1' w='170px' h='10' bg='red.500' className="ml" />
                        <Box w='500px' bg='green.500'>
                        <Text className="flex justify-center mr-72 mt-2">{item.desc}</Text>
                        </Box>
                    </Flex>
                    </Box>
                </div>
            )
    })}
    </div>
    
    </form>
  </div>
  )
}

export default StatusApp