import React, { useState } from 'react';
import { Input, Typography } from "antd";
import { Content } from "antd/lib/layout/layout";
import {useUnit} from "effector-react";
import { $allData, changeDataEvent } from "../../shared/api/model";

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
            <Paragraph style={{ width: "100px", margin: '0', textAlign: 'start' }}>{name}:</Paragraph>
            <Input
                type={type}
                defaultValue={data}
                value={value}
                onChange={handleChange}
                style={{ width: '300px' }}
            />
        </Content>
    );
}

export default DataRow;
