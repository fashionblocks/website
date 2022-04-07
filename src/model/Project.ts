import { Token, TokenJSON } from "./Token";


export class Project {

    static fromJSON(data: ProjectJSON) {

        return new Project(
            data.id,
            data.name,
            data.project_id,
            data.website,
            data.description,
            data.recommend_token ? Token.fromJSON(data.recommend_token) : undefined,
            data.script
        );
    }

    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly projectId?: number,
        public readonly website?: string,
        public readonly description?: string,
        public readonly recommendToken?: Token,
        public readonly script?: string
    ) {
    }
}

export interface ProjectJSON {
    readonly id: string;
    readonly name: string;
    readonly project_id: number;
    readonly website?: string;
    readonly description?: string;
    readonly recommend_token?: TokenJSON;
    readonly script?: string;
}
