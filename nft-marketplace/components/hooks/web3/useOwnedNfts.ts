
import { CryptoHookFactory } from "@_types/hooks";
import { Nft } from "@_types/nft";
import { ethers } from "ethers";
import useSWR from "swr";

type UseOwnedNftsResponse = {}
type OwnedNftsHookFactory = CryptoHookFactory<Nft[], UseOwnedNftsResponse>

export type UseOwnedNftsHook = ReturnType<OwnedNftsHookFactory>

export const hookFactory: OwnedNftsHookFactory = ({ contract }) => () => {
    const { data, ...swr } = useSWR(
        contract ? "web3/useOwnedNfts" : null,
        async () => {
            const nfts = [] as Nft[];
            if (window.ethereum && window.ethereum?.isMetaMask) {
                try {
                    // Request account access to get the current user's address
                    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
                    const signer = provider.getSigner();
                    const userAddress = await signer.getAddress();

                    // Call the contract's getOwnedNfts function with the user's address
                    const coreNfts = await contract!.getOwnedNfts({ from: userAddress });
                    console.log(userAddress);
                    for (let i = 0; i < coreNfts.length; i++) {
                        const item = coreNfts[i];
                        const tokenURI = await contract!.tokenURI(item.tokenId);
                        const metaRes = await fetch(tokenURI);
                        const meta = await metaRes.json();

                        nfts.push({
                            price: parseFloat(ethers.utils.formatEther(item.price)),
                            tokenId: item.tokenId.toNumber(),
                            creator: item.creator,
                            isListed: item.isListed,
                            meta
                        });
                    }

                } catch (error) {
                    // Handle any errors
                    console.error("Error fetching NFTs:", error);
                }
            }

            return nfts;
        }
    )

    return {
        ...swr,
        data: data || [],
    };
}