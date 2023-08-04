import React, {useEffect, useState} from 'react';
import { Pagination, Input, Spin, Typography } from 'antd';
import { API_URL} from "../../shared/lib/constants";
import PersonCard from "../../features/PersonCard/PersonCard";
import classes from './PeopleList.module.scss';
import { Content } from "antd/lib/layout/layout";
import { useFetchPeople } from "../../shared/lib/hooks/useFetch";
import { Person } from "../../shared/lib/types/Person";
import { getDataFromStore, getPaginatedData, getPersonId } from "../../shared/lib/utils/allUtils";
import { useUnit } from "effector-react";
import { $allData, addDataEvent, resetAllDataEvent } from "../../shared/api/model";

const { Title, Text } = Typography;

export const PeopleList = () => {
    const { allData, addData, resetAllData } = useUnit({
        allData: $allData,
        addData: addDataEvent,
        resetAllData: resetAllDataEvent
    });

    const [searchValue, setSearchValue] = useState<string>("");
    const [isSearch, setIsSearch] = useState<boolean>();
    const [paginationValue, setPaginationValue] = useState<number>(1);
    const [fetchUrl, setFetchUrl] = useState<string>(`${API_URL}/people/?page=1`);
    const { fetchData, error, isLoading, dataCount } = useFetchPeople(fetchUrl);
    const [data, setData] = useState<Person[]>()

    useEffect(()=> {
        if ( fetchData ) {
            addData({
                page: paginationValue || 1,
                data: fetchData
            })
        }
        if (searchValue) {
            setData( fetchData )
        }
        else {
            setData(getDataFromStore( fetchData, allData) )
        }
    },[ fetchData ])

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const onSearch = (value: string) => {
        setPaginationValue(1)
        if (value!=='') {
            setIsSearch(true)
            resetAllData();
        }
        else setIsSearch(false)
        setFetchUrl(`${API_URL}/people/?search=${value}&page=1`);
    };

    const handlePaginationClick = (value: number) => {
        if (!isSearch) {
            setSearchValue('')
            setPaginationValue(value)
            if (!allData?.pages.includes(value)) {
                setFetchUrl(`${API_URL}/people/?page=${value}`);
            } else {
                setData(getPaginatedData(value, allData))
            }
        } else {
            setPaginationValue(value);
            setFetchUrl(`${API_URL}/people/?search=${searchValue}&page=${value}`);
        }
    }

    if (error) {
        return (
            <Typography>
                <Text>There is an error with getting the data from API. Please try again later or refresh the page</Text>
            </Typography>
        )
    }

    return (
        <>
            <Content className={classes.top}>
                <Typography>
                    <Title level={2} style={{margin: 0}}>People List</Title>
                </Typography>
                <Input.Search className={classes.search}
                    placeholder="Type and press the button"
                    value={searchValue}
                    onChange={onSearchChange}
                    onSearch={onSearch}
                    enterButton
                    style={{ width: "250px" }}
                />
            </Content>
            {!isLoading &&
                <div className={classes.cardLayoutWrapper}>
                    <ul className={classes.cardLayout}>
                        {data?.map((item: Person) =>
                            <PersonCard key={getPersonId(item?.url)} personId={getPersonId(item?.url)} data={item}/>
                        )}
                        {data?.length===0 &&
                            <Typography>
                                <Text>No data with your search parameters. Please search something else</Text>
                            </Typography>
                        }
                    </ul>
                </div>
            }
            {isLoading &&
                <Content style={{ padding: '10px', display: 'flex', justifyContent: 'center' }}>
                    <Spin />
                </Content>
            }
            {!isLoading && <Content style={{margin: '40px'}}>
                <Pagination onChange={handlePaginationClick} defaultCurrent={paginationValue} showSizeChanger={false} total={dataCount} />
            </Content> }
        </>
    );
}

export default PeopleList;
