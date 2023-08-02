import React from 'react';
import { Input, Typography } from "antd";
import { Content } from "antd/lib/layout/layout";
import { getKeyIndex } from "../../shared/lib/utils/allUtils";

import classes from './DataRow.module.scss';

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
            <Paragraph  className={classes.paragraph}style={{ color: `${red && 'red'}` }} >
                {name}:
            </Paragraph>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {data?.map((item: string) =>
                    <Input className={classes.input}
                        key={getKeyIndex(item)}
                        type={type}
                        defaultValue={item}
                    />
                )}
                {data.length===0 &&
                    <Input className={classes.input}
                        type={type}
                    />
                }
            </div>

        </Content>
    );
}

export default DataRow;
