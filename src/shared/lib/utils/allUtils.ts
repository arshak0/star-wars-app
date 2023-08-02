import { AllData, Person } from "../types/Person";

export const getPersonId = (url: string) => {
    return Number(url.replace(`https://swapi.dev/api/people/`,'').replace('/',''))
}

export const getKeyIndex = (item: string) => {
    return item.split('/')[item.split('/').length-2]
}

export const getPageId = (params: string | undefined) => {
    return params ? Number(params.replace('id=','')) : 0;
};

export const getSearchData = (fetchData: Person[] | undefined, allData: AllData | null) => {
    let allSearchIds = fetchData ? fetchData?.map((item) => item.name) : []
    return allData?.data.filter((item) => {
        return allSearchIds.includes(item.name)
    });
}

export const getPaginatedData = (value: number, allData: AllData) => {
    let minValue = (value-1)*10+1;
    let maxValue = (value-1)*10+10;
    return allData.data.filter((item) => {
        return item?.id ? item.id >= minValue && item.id <= maxValue : false
    });
}

export const getDataFromStore = ( fetchData: Person[] | undefined, allData: AllData | null) => {
    if (fetchData && allData) {
        let newData=[...fetchData]
        let startName=[...fetchData][0].name
        let startIndex = allData.data.findIndex((item) => item.name===startName);
        for (let i=0; i<fetchData.length; i++) {
            newData[i]=allData.data[startIndex+i]
        }
        return newData
    } else return fetchData
}