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

export const mapData = (fetchData: Person[], allData: AllData | null) => {
    return fetchData.map(function(item) {
        if ( allData?.ids.includes( getPersonId(item.url) ) ) {
            return allData.data[ allData.ids.indexOf( getPersonId(item.url) ) ]
        }
        return item
    });
}

/*Don't need the getDataFromStore and getSearchData functions anymore*/
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

export const getSearchData = (fetchData: Person[] | undefined, allData: AllData | null) => {
    let allSearchIds = fetchData ? fetchData?.map((item) => item.name) : []
    return allData?.data.filter((item) => {
        return allSearchIds.includes(item.name)
    });
}