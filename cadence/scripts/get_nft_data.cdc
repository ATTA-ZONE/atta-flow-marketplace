import ATTANFT from 0xATTANFT

pub fun main(address: Address, id: UInt64): &ATTANFT.NFT?{
  return ATTANFT.fetch(address, itemID: id)
}
