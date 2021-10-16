import ATTANFT from 0xATTANFT

transaction(price: UFix64) {
    let admin: &ATTANFT.Admin?
    prepare(signer: AuthAccount) {
        self.admin = signer.borrow<&ATTANFT.Admin>(from: ATTANFT.AdminStoragePath) ?? panic("Could not borrow admin client")
    }
    
    execute {
        self.admin!.setPrice(price)
    }
}

