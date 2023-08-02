import React from 'react';
import { Button, Typography } from 'antd';
import classes from './PersonCard.module.scss';
import { Content } from "antd/lib/layout/layout";
import { Person } from "../../shared/lib/types/Person";
import { Link } from "react-router-dom";

const { Text } = Typography;

type PersonCardProps = {
    data: Person;
    personId: number;
};
export const PersonCard = ( {data, personId}: PersonCardProps ) => {

    return (
        <Content className={classes.card}>
            <Typography style={{ display: 'flex', flexDirection: 'column' }}>
                <Text className={classes.spanText}>Name: {data.name}</Text>
                <Text className={classes.spanText} type="secondary">Gender: {data.gender}</Text>
                <Text className={classes.spanText} type="secondary">Height: {data.height}</Text>
                <Text className={classes.spanText} type="secondary">Mass: {data.mass}</Text>
                <Text className={classes.spanText} type="secondary">Skin color: {data.skin_color}</Text>
            </Typography>
            <Link to={`/person/id=${personId}`} style={{ display: 'flex', justifyContent: 'center' }}>
                <Button style={{ margin: '10px' }} type='primary'>
                    Person Page
                </Button>
            </Link>
        </Content>
    );
}

export default PersonCard;
