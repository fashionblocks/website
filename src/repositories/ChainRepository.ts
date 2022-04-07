import * as React from "react";
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from "web3";

export class ChainRepository {

    public static readonly $ = new ChainRepository();
    public static readonly Context = React.createContext(ChainRepository.$);
    private p: any;
    private web3?: Web3;
    private Chain_Id = process.env.REACT_APP_CHAIN_ID;

    constructor() {
        detectEthereumProvider().then(p => {
            this.p = p;
            this.p.on('chainChanged', () => window.location.reload());
        });
    }

    public get instance() {
        return this.p;
    }

    public get web3Instance() {
        if (this.web3) {
            return this.web3;
        }
        this.web3 = new Web3(this.p);
        return this.web3;
    }

    public async isIp0Chain(): Promise<boolean> {
        const id = await this.findChainId();
        console.log(id);
        return id === this.Chain_Id;
    }

    public async findChainId() {
        return await this.p.request({ method: 'eth_chainId' });
    }

    public findTokenUri(id: number) {
        // return id + '';
       return '';
    }

    public generateNonce() {
        return (new Date()).valueOf();
    }
}
