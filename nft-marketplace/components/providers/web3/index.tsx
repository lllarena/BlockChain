import { FunctionComponent, ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { Web3State, createDefaultState, loadContract } from "./utils";
import { ethers } from "ethers";



interface Web3ProviderProps {
    children?: ReactNode;
}


const Web3Context = createContext<Web3State>(createDefaultState());

const Web3Provider: FunctionComponent<Web3ProviderProps> = ({ children }: Web3ProviderProps) => {
    const [Web3Api, setWeb3Api] = useState<Web3State>(createDefaultState())

    useEffect(() => {
        async function initWeb3() {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = await loadContract("NftMarket", provider);

            setWeb3Api({
                ethereum: window.ethereum,
                provider,
                contract,
                isLoading: false
            })

        }

        initWeb3();
    }, [])

    return (
        <Web3Context.Provider value={Web3Api}>
            {children}
        </Web3Context.Provider>
    )
}

export function useWeb3() {
    return useContext(Web3Context);
}


export default Web3Provider;