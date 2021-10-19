import NonFungibleToken from 0xNonFungibleToken
import ATTANFT from 0xATTANFT

transaction(receiver: Address) {
    let admin: &ATTANFT.Admin?
    let receiverCap: &{NonFungibleToken.CollectionPublic}?
    prepare(signer: AuthAccount) {
        self.admin = signer.borrow<&ATTANFT.Admin>(from: ATTANFT.AdminStoragePath) ?? panic("Could not borrow admin client")
        self.receiverCap = getAccount(receiver).getCapability<&{NonFungibleToken.CollectionPublic}>(ATTANFT.CollectionPublicPath).borrow() ?? panic("Can not borrow user's collection")
    }
    
    execute {
        self.admin!.mintNFT(recipient: self.receiverCap!, metadata: {"test":"test"})
    }
}

