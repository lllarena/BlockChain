import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, ethers } from "ethers";

export type Web3Param = {
    ethereum: MetaMaskInpageProvider | null;
    provider: ethers.BrowserProvider | null;
    contract: Contract | null;
}

export type Web3State = {
    isLoading: boolean; //true while loading Web3
} & Web3Param

export const createDefaultState = () => {
    return {
        ethereum: null,
        provider: null,
        contract: null,
        isLoading: true,
    }
}