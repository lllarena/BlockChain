import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, ethers } from "ethers"
import { SWRResponse } from "swr";

export type Web3Dependencies = {
    provider: ethers.BrowserProvider;
    contract: Contract;
    ethereum: MetaMaskInpageProvider;
}

export type CryptoHookFactory<D = any, P = any> = {
    (d: Partial<Web3Dependencies>): CryptoHandlerHook<D, P>
}

export type CryptoHandlerHook<D = any, P = any> = (params: P) => CryptoSWRRespnse<D>;

export type CryptoSWRRespnse<D = any> = SWRResponse<D>;


// export type CryptoHookFactory<D = any, P = any> = {
//     (d: Partial<Web3Dependencies>): (params: P) => SWRResponse<D>
// }
