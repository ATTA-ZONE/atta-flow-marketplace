import ATTANFT from 0xATTANFT

transaction(uri: String) {
    let admin: &ATTANFT.Admin?
    prepare(signer: AuthAccount) {
        self.admin = signer.borrow<&ATTANFT.Admin>(from: ATTANFT.AdminStoragePath) ?? panic("Could not borrow admin client")
    }
    
    execute {
        self.admin!.setBaseURI(uri)
    }
}

