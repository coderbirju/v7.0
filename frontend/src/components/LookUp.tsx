// import { AbstractConnector } from '@web3-react/abstract-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError
} from '@web3-react/injected-connector';
import { Contract, ethers } from 'ethers';
import {  ChangeEvent, ReactElement, useState } from 'react';
import styled from 'styled-components';
// import styled from 'styled-components';
// import { injected } from '../utils/connectors';
// import { useEagerConnect, useInactiveListener } from '../utils/hooks';
import { Provider } from '../utils/provider';
import BasicDutchAuctionArtifact from '../../../artifacts/contracts/BasicDutchAuction.sol/BasicDutchAuction.json';



// type ActivateFunction = (
//     connector: AbstractConnector,
//     onError?: (error: Error) => void,
//     throwErrors?: boolean
//   ) => Promise<void>;

  function getErrorMessage(error: Error): string {
    let errorMessage: string;
  
    switch (error.constructor) {
      case NoEthereumProviderError:
        errorMessage = `No Ethereum browser extension detected. Please install MetaMask extension.`;
        break;
      case UnsupportedChainIdError:
        errorMessage = `You're connected to an unsupported network.`;
        break;
      case UserRejectedRequestError:
        errorMessage = `Please authorize this website to access your Ethereum account.`;
        break;
      default:
        errorMessage = error.message;
    }
  
    return errorMessage;
  }

  const StyledButton = styled.button`
  width: 150px;
  height: 2rem;
  border-radius: 1rem;
  border-color: blue;
  cursor: pointer;
  place-self: center;
`;

  export function LookUpContract(): ReactElement {
    const context = useWeb3React<Provider>();
    const { account, active, library, error } = context;
    let [reservePrice, setReservePrice] = useState<number>(0);
    let [auctionBlocks, setAuctionBlocks] = useState<number>(0);
    let [priceDecrement, setPriceDecrement] = useState<number>(0);
    let [contractAddress, setContractAddress] = useState<string>('');
    let [currentPrice, setCurrentPrice] = useState<number>(0);
    let [winner, setWinner] = useState<string>('');
   
    const handleContractAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
      setContractAddress(event.target.value);
    }

    const handleGetInfo = async () => {
      const basicDutchAuction = new ethers.Contract(contractAddress, BasicDutchAuctionArtifact.abi, library);
      const reservePrice = await basicDutchAuction.reservePrice();
      const auctionBlocks = await basicDutchAuction.auctionBlocks();
      const priceDecrement = await basicDutchAuction.priceDecrement();
      const currentPrice = await basicDutchAuction.currentPrice();
      const winner = await basicDutchAuction.winner();
      setReservePrice(reservePrice.toNumber());
      setAuctionBlocks(auctionBlocks.toNumber());
      setPriceDecrement(priceDecrement.toNumber());
      setCurrentPrice(currentPrice.toNumber());
      setWinner(winner);
    }
  
    if (!!error) {
      window.alert(getErrorMessage(error));
    }
  
    return (
        <>
            <>
                <>
                    <h1> Look Up Contract Details: </h1>
                </>
                <div>
                        <label> Deployed contract address: </label>
                        <input onChange={handleContractAddressChange} type="text" value={contractAddress}/>
                        <span>
                            <StyledButton
                              onClick={handleGetInfo}
                            > Show Info</StyledButton>
                        </span>
                </div>          
            </>
            <>
                <>
                    <h3> Auction Details: </h3>
                </>

                <div>
                    <label> Winner: </label>
                    <input type="text" value={winner} readOnly/>
                    <label> Current Price: </label>
                    <input type="text" value={currentPrice} readOnly/>
                    <label> Reserve Price: </label>
                    <input type="text" value={reservePrice} readOnly/>
                    <label> Auction Blocks: </label>
                    <input type="text" value={auctionBlocks} readOnly/>
                    <label> Price Decrement: </label>
                    <input type="text" value={priceDecrement} readOnly/>
                </div>
            </>
        </>
    );
  }