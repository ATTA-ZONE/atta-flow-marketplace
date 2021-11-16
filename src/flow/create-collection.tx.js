export const CREATE_COLLECTION = `
  import ATTANFT from 0xATTANFT
  import NonFungibleToken from 0xNonFungibleToken

  transaction() {
      prepare(account: AuthAccount) {
          account.save<@NonFungibleToken.Collection>(<- ATTANFT.createEmptyCollection(), to: ATTANFT.CollectionStoragePath)
          account.link<&ATTANFT.Collection{NonFungibleToken.CollectionPublic, NonFungibleToken.Receiver, ATTANFT.ATTACollectionPublic}>(ATTANFT.CollectionPublicPath, target: ATTANFT.CollectionStoragePath)
      }
  }
`