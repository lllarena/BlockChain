import { Web3Dependencies } from "@_types/hooks";
import { Web3Hooks, setupHooks } from "@hooks/web3/setupHooks";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, ethers } from "ethers";

declare global {
    interface Window {
        ethereum: MetaMaskInpageProvider;
    }
}

type Nullable<T> = {
    [P in keyof T]: T[P] | null;
}

// export type Web3Params = {
//     ethereum: MetaMaskInpageProvider | null;
//     provider: ethers.BrowserProvider | null;
//     contract: Contract | null;
// }

export type Web3State = {
    isLoading: boolean; //true while loading Web3
    hooks: Web3Hooks;
} & Nullable<Web3Dependencies>


export const createDefaultState = () => {
    return {
        ethereum: null,
        provider: null,
        contract: null,
        isLoading: true,
        hooks: setupHooks({} as any)
    }
}

export const createWeb3State = ({
    ethereum, provider, contract, isLoading
}: Web3Dependencies & { isLoading: boolean }) => {
    return {
        ethereum,
        provider,
        contract,
        isLoading,
        hooks: setupHooks({ ethereum, provider, contract })
    }
}


const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

export const loadContract = async (
    name: string, //NftMarket
    provider: ethers.BrowserProvider
): Promise<Contract> => {

    if (!NETWORK_ID) {
        return Promise.reject("Network ID is not defined!");
    }

    const res = await fetch(`/contracts/${name}.json`)
    const Artifact = await res.json();

    if (Artifact.networks[NETWORK_ID].address) {
        const contract = new ethers.Contract(
            Artifact.networks[NETWORK_ID].address,
            Artifact.abi,
            provider
        )

        return contract;
    } else {
        return Promise.reject(`Contract: [${name}] cannot be loaded!`);
    }
}