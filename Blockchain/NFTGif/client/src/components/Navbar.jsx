import React from 'react'
import {Link} from "react-router-dom"



const Navbar = ({ConnectWeb3,accounts}) => {


  return (
         <nav className="w-full h-20 flex  p-4
         bg-slate-500">
            <ul className='flex flex-row ml-32'>
                <li className='cursor-pointer text-2xl mr-14'>
                    <Link to='/'>Home</Link></li>
                <li className='cursor-pointer text-2xl mr-14'>
                <Link to='/create'>Create</Link></li>
                <li className='cursor-pointer text-2xl mr-14'><Link to='/my-listed-items'>My Listed Items</Link></li>
                <li className='cursor-pointer text-2xl mr-14'><Link to='/my-purchases'>My Purchases</Link></li>
                {accounts ? (<li className="text-2xl ml-40">{accounts}</li>):
                <button className="text-lg  ml-44 bg-black text-white rounded-full 
                border-black p-2 border-solid hover:text-2xl active:text-lg" onClick={ConnectWeb3}>Connect Wallet</button>}
            </ul>
           
        </nav>
  
  )
}

export default Navbar