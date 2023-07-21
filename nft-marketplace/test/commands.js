

const instance = await NftMarket.deployed();

instance.mintToken("https://gateway.pinata.cloud/ipfs/QmXwXujwTBFbP5MjnCX7xZzrCstWmseJr9wwmBCdMDYa6p?_gl=1*brcdpk*_ga*ODk2MTI1Njc4LjE2ODk5MzcxODM.*_ga_5RMPXG14TE*MTY4OTkzNzE4My4xLjEuMTY4OTkzNzY4Ni4yOS4wLjA.", "500000000000000000", { from: accounts[0], value: "25000000000000000" })
instance.mintToken("https://gateway.pinata.cloud/ipfs/QmWLztCaVRz25GhTF3voKsAckYHWToBnWJPXU6eok5dtca?_gl=1*1qq9vq4*_ga*ODk2MTI1Njc4LjE2ODk5MzcxODM.*_ga_5RMPXG14TE*MTY4OTkzNzE4My4xLjEuMTY4OTkzNzY4Ni4yOS4wLjA.", "300000000000000000", { from: accounts[0], value: "25000000000000000" })