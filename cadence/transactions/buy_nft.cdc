import FungibleToken from 0xFungibleToken
import NonFungibleToken from 0xNonFungibleToken
import FlowToken from 0xFlowToken
import ATTANFT from 0xATTANFT

transaction(amount: UFix64, receiver: Address) {
    let vault: @FungibleToken.Vault
    let receiverCap: &{NonFungibleToken.CollectionPublic}?
    prepare(signer: AuthAccount) {
        let vaultRef = signer.borrow<&FungibleToken.Vault>(from: /storage/flowTokenVault) ?? panic("Could not borrow owner's Vault reference")
        self.vault <- vaultRef.withdraw(amount: amount)

        self.receiverCap = getAccount(receiver).getCapability<&{NonFungibleToken.CollectionPublic}>(ATTANFT.CollectionPublicPath).borrow() ?? panic("Can not borrow user's collection ")
    }
    
    execute {
        self.receiverCap!.deposit(token: <- ATTANFT.buyATTA(paymentVault: <-self.vault))
    }
}

