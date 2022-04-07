import * as React from 'react';
import { Button, Menu } from 'antd';
import { createUseStyles } from "react-jss";
import { useContext, useState } from "react";
import { ChainRepository } from "../repositories/ChainRepository";
import ProjectIndex from "./ProjectIndex";

export default function Index() {
    const repo = useContext(ChainRepository.Context);

    const classes = useStyles();
    const [ tab, setTab ] = useState('projects');
    const [ address, setAddress ] = useState<undefined | string>(undefined);

    const connect = async () => {
        const accounts = await repo.instance.request({
            method: 'eth_requestAccounts'
        });
        setAddress(accounts[0]);
    }
    return (
        <div className={classes.body}>
            {/*<div className={classes.h}>*/}
            {/*    <Menu mode="horizontal" selectedKeys={[tab]}>*/}
            {/*        <Menu.Item key="projects" onClick={()=> setTab('projects')}>*/}
            {/*            <span>项目</span>*/}
            {/*        </Menu.Item>*/}
            {/*        <Menu.Item key="reg" onClick={() => setTab('reg')}>*/}
            {/*            <span>注册项目</span>*/}
            {/*        </Menu.Item>*/}
            {/*        <Menu.Item key="mint" onClick={() => setTab('mint')}>*/}
            {/*            <span>Mint</span>*/}
            {/*        </Menu.Item>*/}
            {/*    </Menu>*/}

            {/*    <Button onClick={() => connect() } type={'primary'}>*/}
            {/*        {address ? address : 'Connect'}*/}
            {/*    </Button>*/}
            {/*</div>*/}

            {/*{tab === 'projects' && <ProjectIndex/>}*/}
            {/*{tab === 'reg' && <Reg address={address}/>}*/}

        </div>
    );
}


const useStyles = createUseStyles(() => ({
    body: {
        width: '1200px',
        margin: '0px auto',
        fontSize: '16px'
    },
    h: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));
