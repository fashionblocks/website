import * as React from 'react';
import { useContext, useEffect, useState } from "react";
import { ProjectRepository } from "../repositories/ProjectRepository";
import { Pagination } from "../utils/Pagination";
import { Project } from "../model/Project";
import { useSelector } from "react-redux";
import { State } from "../redux/reducers";
import { Link } from 'react-router-dom';
import { createUseStyles } from "react-jss";

export default function My() {

    const classes = useStyles();

    const repo = useContext(ProjectRepository.Context);
    const [ projects, setProjects ] = useState<Pagination<Project>>();

    const whoami = useSelector(({ member }: State) => {
        return member;
    });

    useEffect(() => {
       if (whoami) {
           repo.findAll(1, 20, whoami).then(c => setProjects(c));
       }
    }, [
        repo, whoami, setProjects
    ]);

    return (
        <div>
            <h4 className={classes.h4}>
                My Projects

                <Link to={'/projects/add'}>Add Project</Link>
            </h4>

            <div className={classes.projects}>
                {projects?.data.map((c => (
                    <div>
                        <div className={'title'}>{c.name}</div>


                        {!c.script &&  <div className={'a'}>
                            <Link to={`/projects/${c.id}/script`}>Add Scripts</Link>
                        </div>}
                    </div>
                )))}
            </div>
        </div>
    );
}

const useStyles = createUseStyles(() => ({
    h4: {
        padding: '20px 0 20px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    projects: {
        '&> div': {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
            '&> a': {
                width: '200px'
            }
        }
    }
}));
