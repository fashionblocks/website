
import NFTJSON from '../contract_artifacts/GenArt721Core.json';
import contract from 'truffle-contract'

export interface From {
    from: string,
    value?: number
}
export interface NFT {
    tokenURI: (id: string) => {},
    new: (name: string, symbol: string, from?: From) => {address: string},
    mint: (to: string, projectId: number, from: From) => {},
    projectScriptInfo: (id: number) => any;
    projectScriptByIndex: (id: number, index: number) => any;
    addProject: (name: string, address: string,  website: string, description: string, price: string, dynamic: boolean, from: From) => any;
    addProjectScript: (projectId: number, script: string,  from: From) => any;
}


export default function useContract (
) {
    return (contract<NFT>(NFTJSON))
}
