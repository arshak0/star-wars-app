import React from 'react';
import { Input, Typography } from "antd";
import { Content } from "antd/lib/layout/layout";
import { getKeyIndex } from "../../shared/lib/utils/allUtils";

const { Paragraph } = Typography;

type DataRowArrayProps = {
    type: string
    name: string;
    data: string[];
    red?: boolean;
}
export const DataRow = ({type, name, data, red }: DataRowArrayProps) => {

    return (
        <Content style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <Paragraph style={{
                width: "100px",
                margin: '0',
                color: `${red && 'red'}`,
                textAlign: 'start' }} >
                {name}:
            </Paragraph>

            <Content style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {data?.map((item: string) =>
                    <Input
                        key={getKeyIndex(item)}
                        type={type}
                        defaultValue={item}
                        style={{ width: '300px' }}
                    />
                )}
                {data.length===0 &&
                    <Input
                        type={type}
                        style={{ width: '300px' }}
                    />
                }
            </Content>

        </Content>
    );
}

export default DataRow;
