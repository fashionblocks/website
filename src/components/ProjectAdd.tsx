import * as React from 'react';
import { Button, Form, Input, InputNumber, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useContext, useState } from "react";
import { ChainRepository } from "../repositories/ChainRepository";
import { ProjectForm } from "../form/ProjectForm";
import useContract from "../hooks/useContract";
import { useSelector } from "react-redux";
import { State } from "../redux/reducers";
import { useHistory } from "react-router";


export default function ProjectAdd() {
    const repo = useContext(ChainRepository.Context);

    const [form , setForm] = useState<ProjectForm>(new ProjectForm());
    const contract = useContract();
    const contractAddress = process.env.REACT_APP_ART_BLOCKS_ADDRESS as string;
    const history = useHistory();
    const whoami = useSelector(({ member }: State) => {
        return member;
    });

    const submit = async () => {
        contract.setProvider(repo.instance);
        if (!form.projectName || !form.price || !form.artistAddress || !whoami || !form.website || !form.description) {
            return;
        }
        const c = await contract.at(contractAddress);
       await c.addProject(
            form.projectName , form.artistAddress, form.website, form.description, (form.price * 1000000000000000000).toString(), true,
            {from: whoami}
        );
        message.success('succeed');
        history.push('/my');
    }

    return (
       <div style={{padding: '30px 0'}}>
           <Form
               name="basic"
               autoComplete="off"
               labelCol={{ span: 4 }}
           >
               <Form.Item
                   label="项目名称"
                   name="username"
               >
                   <Input
                       value={form.projectName}
                       onChange={(e) => setForm(form.amend('projectName', e.target.value))}
                   />
               </Form.Item>

               <Form.Item
                   label="艺术家地址"
                   name="address"
               >
                   <Input
                       value={form.artistAddress}
                       onChange={(e) => setForm(form.amend('artistAddress', e.target.value))}
                   />
               </Form.Item>

               <Form.Item
                   label="网站链接"
                   name="website"
               >
                   <Input
                       value={form.website}
                       onChange={(e) => setForm(form.amend('website', e.target.value))}
                   />
               </Form.Item>

               <Form.Item
                   label="项目描述"
                   name="description"
               >
                   <TextArea
                       value={form.description}
                       onChange={(e) => setForm(form.amend('description', e.target.value))}
                   />
               </Form.Item>

               <Form.Item
                   label="价格"
                   name="price"
               >
                   <InputNumber
                       value={form.price}
                       onChange={(e) => setForm(form.amend('price', e))}
                   />
               </Form.Item>

               <Form.Item wrapperCol={{ offset: 4 }}>
                   <Button type="primary" onClick={() => submit()}>
                       Submit
                   </Button>
               </Form.Item>
           </Form>
       </div>
    );
}
