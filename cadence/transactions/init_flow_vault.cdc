
import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken

transaction() {

    prepare(signer: AuthAccount) {
    
        signer.save(<-FlowToken.createEmptyVault(), to: /storage/flowTokenVault)

        signer.link<&FlowToken.Vault{FungibleToken.Receiver}>(
        /public/flowTokenReceiver,  target: /storage/flowTokenVault)
         
        signer.link<&FlowToken.Vault{FungibleToken.Balance}>(
           /public/flowTokenBalance,
          target: /storage/flowTokenVault
        )

    }

}

