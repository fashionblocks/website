
const address = process.env.REACT_APP_ART_BLOCKS_ADDRESS
export class Token {

    static fromJSON(data: TokenJSON) {

        return new Token(
            data.id,
            data.image,
            data.token_id,
            data.token_hash
        );
    }

    constructor(
        public readonly id: number,
        public readonly image: string,
        public readonly tokenId: string,
        public readonly tokenHash: string
    ) {
    }

    get osLink() {
        return [
            'https://testnets.opensea.io/assets',
            address,
            this.tokenId
        ].join('/');
    }
}

export interface TokenJSON {
    readonly id: number;
    readonly image: string;
    readonly token_id: string;
    readonly token_hash: string;
}
