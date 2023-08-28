import {createStore, createEvent, sample, createEffect} from 'effector';
import type {AllData, ChangeData, Person } from "../lib/types/Person";
import { getPersonId } from "../lib/utils/allUtils";

export const addDataEvent = createEvent<Person[]>();
export const changeDataEvent = createEvent<ChangeData>();
export const resetAllDataEvent = createEvent();
export const $allData = createStore<AllData | null>(null)
    .on(addDataEvent, (store: AllData | null, data ) => {
        let newStore = store ? {...store} : {ids: [], data: []}
        for ( let i=0; i<data.length; i++ ) {
            let id = getPersonId(data[i].url)
            data[i].id=id;
            if ( store && store.ids.includes(id) ) {
                break;
            }
            newStore.ids.push(id)
            newStore.data.push(data[i])
        }

        newStore.ids.sort((a,b) => a-b)
        newStore.data.sort((a,b) => getPersonId(a.url)-getPersonId(b.url) )
        return newStore
    })
    .on(changeDataEvent, (store: AllData | null, { id,value,field}) => {
        let newStore = store ? {...store} : {ids: [], data: []}
        let person = newStore?.data.filter((item: Person) => {
            return item.id===id
        })[0];

        if (field && person) {
            person[field]=value
        }
        return newStore
    })
    .reset(resetAllDataEvent);

export const $peopleData = createStore<Person[] | null>(null)

export const fetchPeopleDataFx = createEffect((url: string) =>
    fetch(url)
        .then(response => response.json())
        .then(data => data?.results)
);

sample({
    clock: fetchPeopleDataFx.doneData,
    fn: (data: Person[]) => data,
    target: $peopleData
});

// return { fetchData, error, isLoading, dataCount };

/*
export const fetchPersonDataEvent = createEvent<string>();

export const $personData = createStore<Person | null>(null)
    .on(fetchPersonDataEvent, (store: AllData | null, url ) => {
        let newStore = store ? {...store} : {ids: [], data: []}
        for ( let i=0; i<data.length; i++ ) {
            let id = getPersonId(data[i].url)
            data[i].id=id;
            if ( store && store.ids.includes(id) ) {
                break;
            }
            newStore.ids.push(id)
            newStore.data.push(data[i])
        }

        newStore.ids.sort((a,b) => a-b)
        newStore.data.sort((a,b) => getPersonId(a.url)-getPersonId(b.url) )
        return newStore
    })
 */