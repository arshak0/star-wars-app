import React, { useState } from 'react';
import { Input, Typography } from "antd";
import { Content } from "antd/lib/layout/layout";
import {useUnit} from "effector-react";
import { changeDataEvent } from "../../shared/api/model";

import classes from './DataRow.module.scss';

const { Paragraph } = Typography;

type DataRowProps = {
    type: string
    name: string;
    data: string;
    id: number;
    field: string;
}
export const DataRow = ({type, name, data, id, field }: DataRowProps) => {
    const { changeData } = useUnit({
        changeData: changeDataEvent
    });

    const [value, setValue] = useState<string>(data);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        changeData( {
            id: id,
            value: e.target.value,
            field: field
        } )
    }

    return (
        <Content style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <Paragraph className={classes.paragraph}>{name}:</Paragraph>
            <div>
                <Input className={classes.input}
                    type={type}
                    defaultValue={data}
                    value={value}
                    onChange={handleChange}
                />
            </div>
        </Content>
    );
}

export default DataRow;
