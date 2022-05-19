import logo from './logo.svg';
import './App.css';
import NFT from './components/NFT';
import { ChakraProvider } from '@chakra-ui/react'
import {
  BrowserRouter 
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <BrowserRouter>
          <NFT />
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
