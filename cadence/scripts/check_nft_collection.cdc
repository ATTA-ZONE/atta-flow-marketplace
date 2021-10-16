import ATTANFT from 0xATTANFT

pub fun main(address: Address) : Bool {
    return getAccount(address).getCapability<&{ATTANFT.ATTACollectionPublic}>(ATTANFT.CollectionPublicPath).check()
}
 
 
 
