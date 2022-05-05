import React,{useEffect,useState} from 'react'
// import getWeb3 from "../../getWeb3"
import {useNavigate } from "react-router-dom";
import MainContract from "../../artifacts/contracts/Main.sol/Main.json";
import "./style.css"

import {ethers} from "ethers"


const First = () => {
    const history = useNavigate ();
    const [next,setNext] = useState(false);
    const [data,setData] = useState({web3:null,accounts:null,contract:null})
    const [user,setUser] = useState({name:"",lname:"",email:"",password:"",cpassword:""})
    const [con,setCon] = useState({StorageVal:[]})
    const [loading,setLoading] = useState(true);
    const [account,setAccount] = useState(null)
    const [signer,setSigner] = useState(null)
    const [main,setMain] = useState(null)
    

    
    const my_address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
    const web3Connection=async() =>{
        

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await window.ethereum.request({method:"eth_requestAccounts"})
        console.log("account ",accounts[0])
        setAccount(accounts[0])
        
        window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload();
        })
      
        window.ethereum.on('accountsChanged', async function (accounts) {
            
            await web3Connection()
        })

        const signer = provider.getSigner();
        setSigner(signer);
        console.log("acc- ",account)

        loadWeb3()

  }

    const loadWeb3 =async()=>{
        const main = new ethers.Contract(my_address,MainContract.abi,signer)
        console.log("main ",main)
        setMain(main)
        setLoading(false)

        



    }

    const handleClick = (e) =>{
        setUser({...user,[e.target.name]:e.target.value});
        
        
    }

   

    const PostData = async(e)=>{
        e.preventDefault();
        const {name,lname,email,password,cpassword} = user


        if(user.password === user.cpassword){ 

            const res = await fetch("/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({
                    name,
                    lname,
                    email,
                    password,
                    cpassword
                })
            })
        

            const info = await res.json()

        

            if(info.status === 422){
                alert("Invalid Registration")
                console.log("Invalid Registration")
            }

                
            
        
         }

            
            const main_Call = main.connect(signer)

            console.log("Data ",name,lname,email,password,cpassword)
            
           

            main_Call.Set(name,lname,email,password,cpassword).then(async(res,err)=>{
                console.log("res ",res)
                // history(`/next/:${user.email}`,{state:{name,lname}})
                setUser({name:"",lname:"",email:"",password:"",cpassword:""})
                alert("Registration Successful")
          
                        
             })
        
      
             

    
        



        // else{
        //     alert("Invalid Password");
        // }

        


        
    }

    
    return (
        <div>
            {loading ? 
           <div>
                <button className="connectToMeta" onClick={web3Connection}>Connect To Meta Mask</button>
            </div>
            :
            (
            <div className='container'>
                <div className='left-container'>
                    <h2>{account}</h2>
                    <h2>Welcome to MI6.</h2>
                    <h3>Are you ready to join the elite?</h3>
                </div>
                <div className='right-container'>
                <form onSubmit={PostData} methods="POST">
                    <div className='name-field'>
                        <label>Name</label>
                        <input type='text' name='name' placeholder='Name' value={user.name} onChange={handleClick} />
                    </div>
                    <br></br>
                    
                    <div className='lname-field'>
                        <label>Last Name</label>
                        <input type='text' name='lname' placeholder='Last Name' value={user.lname} onChange={handleClick}  />
                    </div>
                    <br></br>
                    <div className='email-field'>
                        <label>Email</label>
                        <input type='email' name='email' placeholder='Email' value={user.email}  onChange={handleClick} />
                    </div>
                    <br></br>
                    <div className='password-field'>
                        <label>Password</label>
                        <input type='password' name='password' placeholder='Password' value={user.password} onChange={handleClick}  />
                    </div>
                    <br></br>
                    <div className='cpassword-field'>
                        <label>Comform Password</label>
                        <input type='password' name='cpassword' placeholder='Comform Password' value={user.cpassword} onChange={handleClick}  />
                    </div>
                    <br></br>
                    <input className='btn' type="submit"  />
                </form>
                </div>
                

            </div>

    

            )}
            
        </div>
    )
}

 {/* <h1>Hello</h1>
            <h1>{data.accounts}</h1> */}

export default First
