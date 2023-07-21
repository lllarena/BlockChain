                                                                                   +----------------------------+
                                                                                   |        ERC721 Contract     |
                                                                                   +----------------------------+
                                                                                   |                            |
                                                                                   +-----------+------------+---+
                                                                                               |            |
                                                                                               v            v
        +-------------------------------------------------+              +--------------------------+      +----------------------------------------+
        |                NFT Market Contract              |              |        NFT Item Struct     |      |              Counters                 |
        +-------------------------------------------------+              +--------------------------+      +----------------------------------------+
        |                                                 |              | - uint tokenId            |      | - uint public listingPrice            |
        | - mapping(string => bool) private _usedTokenURIs|              | - uint price               |      | - Counters.Counter private _listedItems|
        | - mapping(uint => NftItem) private _idToNftItem|              | - address creator          |      | - Counters.Counter private _tokenIds  |
        | - mapping(address => mapping(uint => uint))... |              | - bool isListed            |      |                                        |
        | - uint256[] private _allNfts                   |              +--------------------------+      |                                        |
        | - mapping(uint => uint) private _idToNftIndex  |                                              |                                        |
        | - event NftItemCreated(...)                    |                                              |                                        |
        +---------------------------+                     |                                              |                                        |
                                    |                     |                                              |                                        |
                                    v                     v                                              |                                        |
    +-----------------------+      +------------------------------------+                             |                                        |
    |       External        |      |           Public View Functions     |                             |                                        |
    +-----------------------+      +------------------------------------+                             |                                        |
    | - getNftItem(uint)    |      | - getNftItem(uint)                 |                             |                                        |
    | - listedItemsCount()  |      | - listedItemsCount()               |                             |                                        |
    | - tokenURIExists(...) |      | - tokenURIExists(string)           |                             |                                        |
    | - totalSupply()       |      | - totalSupply()                    |                             |                                        |
    | - tokenByIndex(uint)  |      | - tokenByIndex(uint)               |                             |                                        |
    | - tokenOfOwnerByIndex(... |  | - tokenOfOwnerByIndex(address,uint) |                             |                                        |
    | - getAllNftsOnSale()  |      | - getAllNftsOnSale()               |                             |                                        |
    | - getOwnedNfts()      |      | - getOwnedNfts()                   |                             |                                        |
    | - mintToken(...)      |      |                                    |                             |                                        |
    | - buyNft(...)         |      |                                    |                             |                                        |
    +-----------------------+      +------------------------------------+                             |                                        |
                                    |                             |                                      |                                        |
                                    |                             |                                      |                                        |
                                    v                             v                                      |                                        |
    +------------------------------------------------------------+                                      |                                        |
    |                 Private/Internal Functions                 |                                      |                                        |
    +------------------------------------------------------------+                                      |                                        |
    | - _createftItem(uint, uint)                             |                                      |                                        |
    | - _beforeTokenTransfer(address,address,uint,uint256)    |                                      |                                        |
    | - _addTokenToAllTokensEnumeration(uint)                 |                                      |                                        |
    | - _addTokenToOwnerEnumeration(address,uint)             |                                      |                                        |
    | - _removeTokenFromOwnerEnumeration(address,uint)        |                                      |                                        |
    | - _removeTokenFromAllTokensEnumeration(uint)            |                                      |                                        |
    +------------------------------------------------------------+                                      |                                        |
                                                                                                          |                                        |
                                                                                                          v                                        v
                                                                                    +----------------+---------------------+                +---------------+
                                                                                    |                 ERC721                |                |   Other Contracts/External Services |
                                                                                    +----------------+---------------------+                +---------------+
                                                                                    | - _mint(address,uint,string)          |                |                                    |
                                                                                    | - _burn(uint)                        |                |                                    |
                                                                                    | - _setTokenURI(uint,string)          |                |                                    |
                                                                                    +----------------+---------------------+                |                                    |
                                                                                                                                 |                                    |
                                                                                                                                 |                                    |
                                                                                                                                 v                                    v
                                                                                                           +----------------------------------------------------------+
                                                                                                           |                        Blockchain                       |
                                                                                                           +----------------------------------------------------------+

