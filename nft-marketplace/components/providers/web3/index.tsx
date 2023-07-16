import { FunctionComponent, ReactNode, createContext, useCallback, useContext, useState } from "react";
import { Web3State, createDefaultState } from "./utils";



interface Web3ProviderProps {
    children?: ReactNode;
}


const Web3Context = createContext<Web3State>(createDefaultState());

const Web3Provider: FunctionComponent<Web3ProviderProps> = ({ children }: Web3ProviderProps) => {
    const [Web3Api, setWeb3Api] = useState<Web3State>(createDefaultState())
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