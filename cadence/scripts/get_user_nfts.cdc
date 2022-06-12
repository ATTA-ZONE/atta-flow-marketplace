
import ATTANFT from 0xATTANFT

pub fun main(address: Address) : [String] {
     let account = getAccount(address)
    let collection = account.getCapability<&{ATTANFT.ATTACollectionPublic}>(ATTANFT.CollectionPublicPath).borrow() ?? panic("Can not borrow user collection cap")
    let ids = collection.getIDs()
    let URIs:[String] = []
    let baseURI = ATTANFT.getBaseURI()
    for id in ids {
      URIs.append(baseURI.concat(id.toString()))
    }
    return URIs
}
 