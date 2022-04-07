import * as React from 'react';
import { useContext, useEffect, useState } from "react";
import { Pagination } from "../utils/Pagination";
import { Project } from "../model/Project";
import { ProjectRepository } from "../repositories/ProjectRepository";
import { List }  from 'antd';
import { createUseStyles } from "react-jss";
import { Link } from 'react-router-dom';
import { imgUrl } from "../model";

export default function ProjectIndex() {
    const repo = useContext(ProjectRepository.Context);
    const [ projects, setProjects ] = useState<Pagination<Project>>();

    const classes = useStyles();

    useEffect(() => {
        repo.findAll(1, 30).then(c => setProjects(c));
    }, [repo, setProjects]);

    return (<div className={classes.c}>
        <List
            itemLayout="vertical"
        >
            {projects?.data.map(c =>  <List.Item
                extra={<Link to={`/projects/${c.id}`}>View Project</Link>}
            >
                {c.recommendToken && c.recommendToken.image && <img
                    src={imgUrl(c.recommendToken.image)}
                    width={300}
                    height={200}
                    alt={''}
                    style={{marginBottom: '20px'}}
                />}
                <List.Item.Meta
                    title={c.name}
                    description={c.description}
                />
            </List.Item>)}
        </List>
    </div>);
}

const useStyles = createUseStyles(() => ({
    c : {
        padding: '20px'
    }
}))
