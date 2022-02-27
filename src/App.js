import './App.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Coins from './Components/Coins';

function App() {
  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchWord, setSearchWord] = useState('');

  useEffect(() => {
    Axios.get('https://api.coinstats.app/public/v1/coins?skip=0').then(
      (response) => {
        setListOfCoins(response.data.coins);
      }
    );
  }, []);

  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  });

  return (
    <div className='App'>
      <div className='cryptoHeader'>
        <input
          type='text'
          placeholder='Cryptocurrency...'
          onChange={(event) => setSearchWord(event.target.value)}
        />
      </div>
      <div className='cryptoList'>
        {filteredCoins.map((coin) => {
          return (
            <Coins
              name={coin.name}
              icon={coin.icon}
              price={coin.price}
              symbol={coin.symbol}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
