import * as React from 'react';
import { createUseStyles } from "react-jss";
import { useContext, useEffect, useState } from "react";
import { ProjectRepository } from "../repositories/ProjectRepository";
import { Project } from "../model/Project";
import { useParams } from 'react-router';
import { Button, message } from "antd";
import { imgUrl } from "../model";
import useContract from "../hooks/useContract";
import { ChainRepository } from "../repositories/ChainRepository";
import { useSelector } from "react-redux";
import { State } from "../redux/reducers";
import { Token } from "../model/Token";

export default function ProjectDetail() {

    const contractAddress = process.env.REACT_APP_ART_BLOCKS_ADDRESS as string;
    const repo = useContext(ProjectRepository.Context);
    const contract = useContract();
    const chainRepo = useContext(ChainRepository.Context);

    const classes = useStyles();
    const [ project, setProject ] = useState<Project | undefined>(undefined);
    const [ assets, setAssets ] = useState<Token[]>([]);
    const { id } = useParams<{id: string}>();

    useEffect(() => {
        if (id) {
            repo.find(+id).then(c => setProject(c));
        }
    }, [
        repo, id, setProject
    ]);

    useEffect(() => {
        if (id) {
            repo.findAssets(+id).then(c => setAssets(c))
        }
    }, [repo, setAssets, id]);

    const mint = async() => {
        contract.setProvider(chainRepo.instance);
        const c = await contract.at(contractAddress);
        if (!whoami || !project?.projectId) {
            return;
        }

         await c.mint(
            whoami, project?.projectId, {from: whoami}
        );
        message.success('minted succeed');

    }

    const whoami = useSelector(({ member }: State) => {
        return member;
    });

    return (
        <div className={classes.body}>
           <div>
               <h3>{project?.name}</h3>

               <div className={'img'}>
                   {project?.recommendToken?.image && <img
                        src={imgUrl(project.recommendToken.image)}
                        width={300}
                        alt={''}
                        style={{display: 'block', margin: '0 auto 20px'}}
                   />}
               </div>
               <div className={'content'}>
                   <div className={'info'}>
                       {project?.description}
                   </div>
                   <div className={'action'}>
                       <Button type={'primary'} onClick={() => mint()} disabled={whoami ? false: true}>Mint</Button>
                   </div>
               </div>
           </div>
           <div className={'tokens'}>
               <h3>Tokens</h3>
               <div>
                   {assets.map(c => (
                       <div className={'item'}>
                           <img src={imgUrl(c.image)} alt={''}/>
                           <p>
                               #{c.tokenId}
                           </p>
                           <p>
                               <a href={c.osLink} target={'_blank'} rel="noreferrer" >opensea</a>
                           </p>
                       </div>
                   ))}
               </div>
           </div>
        </div>
    );
}

const useStyles = createUseStyles(() => ({
    body: {
        width: '1200px',
        margin: '0px auto',
        fontSize: '16px',
        '&> div': {
            paddingTop: '30px',
            '&> .content': {
                display: 'flex',
                '&> .info': {
                    borderRight: '1px solid #e1e1e1',
                    paddingRight: '40px'
                },
                '&> .action': {
                    width: '200px',
                    paddingLeft: '40px',
                    paddingTop: '40px',
                    '&> button': {
                        width: '100px'
                    }
                }

            }
        },
        '&> .tokens' : {
            paddingBottom: '100px',
            '&> div': {
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 300px)',
                gridColumnGap: '30px',
                gridRowGap: '30px',
               '&> .item': {
                   '&> img' : {
                       maxWidth: '100%'
                   }
               }
            }
        }
    },
    h: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));
