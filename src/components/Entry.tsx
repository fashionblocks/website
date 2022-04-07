import * as React from 'react';
import { useHistory } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import ProjectDetail from "./ProjectDetail";
import { Button, Menu } from "antd";
import { createUseStyles } from "react-jss";
import { useContext, useState } from "react";
import { ChainRepository } from "../repositories/ChainRepository";
import ProjectIndex from "./ProjectIndex";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions";
import My from "./My";
import ProjectAdd from "./ProjectAdd";
import ScriptAdd from "./ScriptAdd";

export default function Entry() {

    const classes = useStyles();
    const [ address, setAddress ] = useState<undefined | string>(undefined);
    const repo = useContext(ChainRepository.Context);
    const dispatch = useDispatch();
    const history = useHistory();

    const connect = async () => {
        const accounts = await repo.instance.request({
            method: 'eth_requestAccounts'
        });
        setAddress(accounts[0]);
        dispatch(login(accounts[0]))
    }
    return (
        <div className={classes.body}>
            <div className={classes.h}>
                <Menu mode="horizontal">
                    <Menu.Item key="projects" onClick={() => history.push('/')} >
                        <span>Projects</span>
                    </Menu.Item>
                    <Menu.Item key="reg" onClick={() => history.push('/my')}>
                        <span>Reg</span>
                    </Menu.Item>

                </Menu>
                <Button onClick={() => connect() } type={'primary'}>
                    {address ? address : 'Connect'}
                </Button>
            </div>
            <Switch>
                <Route path={'/projects/:id/script'} component={ScriptAdd} />
                <Route path={'/projects/add'} component={ProjectAdd} />
                <Route path={"/projects/:id"} component={ProjectDetail}/>
                <Route path={'/my'} component={My}/>
                <Route path="/" component={ProjectIndex} />
            </Switch>
        </div>
    );
}

const useStyles = createUseStyles(() => ({
    body: {
        width: '1200px',
        margin: '0px auto',
        fontSize: '16px',
        paddingTop: '30px',
    },
    h: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));
