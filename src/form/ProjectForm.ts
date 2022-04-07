
export class ProjectForm {

    constructor(
        public readonly projectName?: string,
        public readonly artistAddress?: string,
        public readonly price?: number,
        public readonly dynamic?: boolean,
        public readonly website?: string,
        public readonly description?: string
    ) {
    }

    amend<K extends keyof ProjectForm>(key: K, value: ProjectForm[K]) {
        const {
           projectName, artistAddress, price, dynamic, website, description
        } = Object.assign({}, this, { [key]: value });
        return new ProjectForm(
            projectName, artistAddress, price, dynamic , website, description
        );
    }
}
