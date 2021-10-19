import FungibleToken from 0xFungibleToken
import NonFungibleToken from 0xNonFungibleToken
import ATTANFT from 0xATTANFT

transaction(amount: UFix64) {
    let admin: &ATTANFT.Admin?
    let receiverCap: &{FungibleToken.Receiver}
    prepare(signer: AuthAccount) {
        self.admin = signer.borrow<&ATTANFT.Admin>(from: ATTANFT.AdminStoragePath) ?? panic("Could not borrow admin client")
        self.receiverCap = signer.getCapability<&{FungibleToken.Receiver}>(/public/flowTokenReceiver).borrow() ?? panic("Can not borrow receiver vault cap")
    }
    
    execute {
        self.receiverCap.deposit(from: <- self.admin!.withdrawVault(amount: amount))
    }
}

