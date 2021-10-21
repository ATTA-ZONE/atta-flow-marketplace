// export const MINT_DAPPY = `
//   import DappyContract from 0xDappy
//   import FUSD from 0xFUSD
//   import FungibleToken from 0xFungibleToken


//   transaction(templateID: UInt32, amount: UFix64) {
//     let receiverReference: &DappyContract.Collection{DappyContract.Receiver}
//     let sentVault: @FungibleToken.Vault

//     prepare(acct: AuthAccount) {
//       self.receiverReference = acct.borrow<&DappyContract.Collection>(from: DappyContract.CollectionStoragePath) 
//           ?? panic("Cannot borrow")
//       let vaultRef = acct.borrow<&FUSD.Vault>(from: /storage/fusdVault) ?? panic("Could not borrow FUSD vault")
//       self.sentVault <- vaultRef.withdraw(amount: amount)
//     }

//     execute {
//       let newDappy <- DappyContract.mintDappy(templateID: templateID, paymentVault: <-self.sentVault)
//       self.receiverReference.deposit(token: <-newDappy)
//     }
//   }
// `
export const MINT_DAPPY = `
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


`
