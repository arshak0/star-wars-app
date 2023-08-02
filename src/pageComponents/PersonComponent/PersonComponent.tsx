import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import classes from './PersonComponent.module.scss';
import { Spin, Typography } from "antd";
import { Content } from "antd/lib/layout/layout";
import { API_URL } from "../../shared/lib/constants";
import { useFetchPerson } from "../../shared/lib/hooks/useFetch";
import DataRow from "./DataRow";
import DataRowArray from "./DataRowArray";
import { getPageId } from '../../shared/lib/utils/allUtils';
import { useUnit } from "effector-react";
import { $allData } from "../../shared/api/model";
import { Person } from "../../shared/lib/types/Person";

const { Title, Text } = Typography;

export const PersonComponent = () => {
    const { allData } = useUnit({
        allData: $allData
    });

    let params = useParams();
    const [id, setId] = useState<number>(getPageId(params?.id))

    const [fetchUrl, setFetchUrl] = useState<string>(`${API_URL}/people/${id}`)
    const { fetchData, error, isLoading } = useFetchPerson(fetchUrl)
    const [data, setData] = useState<Person>()

    useEffect(()=> {
        let newPageId = getPageId(params?.id);
        setId(newPageId)
        setFetchUrl(`${API_URL}/people/${newPageId}`)
    },[params?.id])

    useEffect(()=> {
        if ( fetchData && allData ) {
            setData(
                allData.data.filter((item) => item?.name === fetchData.name )[0]
            )
        } else if (fetchData) setData(fetchData)
    },[fetchData, allData])

    if (error) {
        return (
            <Typography style={{textAlign: 'center'}}>
                <Text>There is an error with getting the data from API. Please try again later or refresh the page</Text>
            </Typography>
        )
    }

    if (data) {
        return (
            <Content style={{justifyContent: 'center'}}>
                <Typography style={{textAlign: 'center'}}>
                    <Title style={{marginTop: '0'}} level={1}>Person id: {id}</Title>
                </Typography>
                <Content className={classes.content}>
                    <Typography style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
                        <Title level={2} style={{paddingBottom: '10px'}}>Name: {data.name}</Title>
                        <DataRow id={id} field='height' type='number' name='Height' data={data.height}/>
                        <DataRow id={id} field='mass' type='number' name='Mass' data={data.mass}/>
                        <DataRow id={id} field='hair_color' type='text' name='Hair color' data={data.hair_color}/>
                        <DataRow id={id} field='skin_color' type='text' name='Skin color' data={data.skin_color}/>
                        <DataRow id={id} field='eye_color' type='text' name='Eye color' data={data.eye_color}/>
                        <DataRow id={id} field='birth_year' type='text' name='Birth year' data={data.birth_year}/>
                        <DataRow id={id} field='gender' type='text' name='Gender' data={data.gender}/>
                        <DataRow id={id} field='homeworld' type='text' name='Homeworld' data={data.homeworld}/>

                        <DataRowArray type='text' name='Films' red={!data.films?.length} data={data.films}/>
                        <DataRowArray type='text' name='Species' red={!data.species?.length} data={data.species}/>
                        <DataRowArray type='text' name='Vehicles' red={!data.vehicles?.length} data={data.vehicles}/>
                        <DataRowArray type='text' name='Starships' red={!data.starships?.length} data={data.starships}/>

                        <DataRow id={id} field='created' type='text' name='Created' data={data.created}/>
                        <DataRow id={id} field='edited' type='text' name='Edited' data={data.edited}/>
                        <DataRow id={id} field='url' type='text' name='URL' data={data.url}/>
                    </Typography>
                </Content>
            </Content>
        );
    }

    if (isLoading) {
        return (
            <>
                <Typography style={{textAlign: 'center'}}>
                    <Title>Person id: {id}</Title>
                </Typography>
                <Content style={{display: 'flex', justifyContent: 'center'}}>
                    <Spin />
                </Content>
            </>
        )
    }

    return (
        <Content style={{display: 'flex', justifyContent: 'center'}}>
            <Spin />
        </Content>
    )
}

export default PersonComponent;
