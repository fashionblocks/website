import * as React from "react";
import axios, { AxiosInstance } from "axios";
import { Pagination, PaginationJSON } from "../utils/Pagination";
import { Project, ProjectJSON } from "../model/Project";
import { Token } from "../model/Token";

export class ProjectRepository {

    public static readonly $ = new ProjectRepository(axios);
    public static readonly Context = React.createContext(ProjectRepository.$);

    constructor(private a: AxiosInstance) {
    }

    async findAll(page: number, size: number, artist?: string) {
        const { data } = await this.a.get<PaginationJSON<ProjectJSON>>('/projects', {
            params: {
                page, size, artist
            }
        });

        return new Pagination(page, data.total, data.data.map(Project.fromJSON))
    }

    async find(id: number) {
        const { data } = await this.a.get(`/projects/${id}`);

        return Project.fromJSON(data);
    }

    async findAssets(id: number) {
        const { data } = await this.a.get(`/projects/${id}/assets`);

        return data.map(Token.fromJSON);
    }

}
