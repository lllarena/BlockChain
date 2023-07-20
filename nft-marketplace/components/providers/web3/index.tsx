import { FunctionComponent, ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { Web3State, createDefaultState, createWeb3State, loadContract } from "./utils";
import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";



interface Web3ProviderProps {
    children?: ReactNode;
}

const pageReload = () => {
    window.location.reload();
}

const handleAccount = (ethereum: MetaMaskInpageProvider) => async () => {
    const isLocked = !(await ethereum._metamask.isUnlocked());
    if (isLocked) { pageReload(); }
}

const setGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
    ethereum.on("chainChanged", pageReload);
    ethereum.on("accountChanged", handleAccount(ethereum));
}

const removeGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
    ethereum?.removeListener("chainChanged", pageReload);
    ethereum?.removeListener("accountChanged", handleAccount);
}

const Web3Context = createContext<Web3State>(createDefaultState());

const Web3Provider: FunctionComponent<Web3ProviderProps> = ({ children }: Web3ProviderProps) => {
    const [Web3Api, setWeb3Api] = useState<Web3State>(createDefaultState());

    useEffect(() => {
        async function initWeb3() {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum as any);
                const contract = await loadContract("NftMarket", provider);

                setGlobalListeners(window.ethereum);
                setWeb3Api(createWeb3State({
                    ethereum: window.ethereum,
                    provider,
                    contract,
                    isLoading: false
                }))
            } catch (e: any) {
                console.error("Please, install web3 wallet");
                setWeb3Api((api) => createWeb3State({
                    ...api as any,
                    isLoading: false,
                }))
            }
        }

        initWeb3();
        return () => removeGlobalListeners(window.ethereum);
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

export function useHooks() {
    const { hooks } = useWeb3();
    return hooks;
}

export default Web3Provider;