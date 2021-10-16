import NonFungibleToken from 0xNonFungibleToken
import ATTANFT from 0xATTANFT

pub fun main(address: Address): [UInt64]{
  let account = getAccount(address)
  let collection = account.getCapability<&{ATTANFT.ATTACollectionPublic}>(ATTANFT.CollectionPublicPath).borrow() ?? panic("Can not borrow user collection cap")
  return collection.getIDs()
}
