import * as React from 'react';
import { Button, Form, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router';
import { ChainRepository } from "../repositories/ChainRepository";
import useContract from "../hooks/useContract";
import { useSelector } from "react-redux";
import { State } from "../redux/reducers";
import { ProjectRepository } from "../repositories/ProjectRepository";
import { Project } from "../model/Project";

export default function ScriptAdd() {

    const repo = useContext(ChainRepository.Context);
    const projectRepo = useContext(ProjectRepository.Context);

    const contract = useContract();
    const contractAddress = process.env.REACT_APP_ART_BLOCKS_ADDRESS as string;
    const [ project, setProject ] = useState<Project | undefined>(undefined);

    const { id } = useParams<{id: string}>();
    const whoami = useSelector(({ member }: State) => {
        return member;
    });

    const history = useHistory();

    const [script, setScript] = useState('');

    useEffect(() => {
        if (id) {
            projectRepo.find(+id).then(c => setProject(c))
        }
    }, [
        projectRepo, id, setProject
    ]);
    const addScript = async() => {
        contract.setProvider(repo.instance);
        const c = await contract.at(contractAddress);
        if (!project?.projectId || !script || !whoami) {
            return;
        }
        await c.addProjectScript(project?.projectId, script, {from: whoami});

        message.success('add succeed');
        history.push('/my');
    }
    return (
        <div style={{padding: '30px 0'}}>
            <Form
                name="basic"
                autoComplete="off"
            >
                <Form.Item
                    label="project"
                    name="projectId"
                >
                    {project?.name}
                </Form.Item>

                <Form.Item
                    label="script"
                    name="script"
                >
                    <TextArea
                        value={script}
                        onChange={(e) => setScript(e.target.value)}
                    />
                </Form.Item>

                <Form.Item >
                    <Button type="primary" onClick={() => addScript()}>
                        Submit
                    </Button>
                </Form.Item>

            </Form>
        </div>
    );
}
