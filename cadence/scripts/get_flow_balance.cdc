import FungibleToken from 0xFungibleToken

pub fun main(address: Address): UFix64? {
    let account = getAccount(address)
        if let vault = account.getCapability(/public/flowTokenBalance).borrow<&{FungibleToken.Balance}>() {
        return vault.balance
    } 
    return nil
}