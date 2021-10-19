import ATTANFT from 0xATTANFT
import NonFungibleToken from 0xNonFungibleToken

transaction(id: UInt64, receiver: Address) {
  var senderCollection: &ATTANFT.Collection
  var receiverCollection: &{NonFungibleToken.Receiver}
  prepare(account: AuthAccount) {
    self.senderCollection = account.borrow<&ATTANFT.Collection>(from: ATTANFT.CollectionStoragePath)!
    let receiverCollectionCap = getAccount(receiver).getCapability<&{NonFungibleToken.Receiver}>(ATTANFT.CollectionPublicPath)
    self.receiverCollection = receiverCollectionCap.borrow()?? panic("Canot borrow receiver's collection")
  }
  execute {
    self.receiverCollection.deposit(token: <- self.senderCollection.withdraw(withdrawID: id))
  }
}
