// import { AbstractConnector } from '@web3-react/abstract-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError
} from '@web3-react/injected-connector';
import {  ReactElement, useState } from 'react';
import { Provider } from '../utils/provider';
import styled from 'styled-components';


// type ActivateFunction = (
//     connector: AbstractConnector,
//     onError?: (error: Error) => void,
//     throwErrors?: boolean
//   ) => Promise<void>;

//   function getErrorMessage(error: Error): string {
//     let errorMessage: string;
  
//     switch (error.constructor) {
//       case NoEthereumProviderError:
//         errorMessage = `No Ethereum browser extension detected. Please install MetaMask extension.`;
//         break;
//       case UnsupportedChainIdError:
//         errorMessage = `You're connected to an unsupported network.`;
//         break;
//       case UserRejectedRequestError:
//         errorMessage = `Please authorize this website to access your Ethereum account.`;
//         break;
//       default:
//         errorMessage = error.message;
//     }
  
//     return errorMessage;
//   }

const StyledLine = styled.hr`
  border: 3px solid #000;
`;

  export function Bid(): ReactElement {
    // const context = useWeb3React<Provider>();
    let [contractAddress, setContractAddress] = useState<string>('');
    let [winner, setWinner] = useState<string>('');
    let [bidAmount, setBidAmount] = useState<number>(0);
    // console.log('context: ', context);
    // const { error } = context;
    // setContractAddress('0x000000');
    // setWinner('');
    
  
    // if (!!error) {
    //   window.alert(getErrorMessage(error));
    // }
  
    return (
        <>
        <StyledLine></StyledLine>
            <>
                <>
                    <h1> Contract Details: </h1>
                </>
                <div>
                    <label> Deployed contract address</label>
                    <input onChange={() => setContractAddress(contractAddress)} type="text" value={contractAddress}/>
                    <label> Bid Amount </label>
                    <input type="text" pattern="[0-9]*" onChange={() => setBidAmount(bidAmount)} value={bidAmount} />
                    <span> <button>Bid</button> </span>
                </div>          
                <>
                    <h3> Auction Details: </h3>
                </>

                <div>
                    <label> Winner</label>
                    <input type="text" value={winner} readOnly/>
                </div>
            </>
        </>
    );
  }