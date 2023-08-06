import { createStore, createEvent } from 'effector';
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
    .reset(resetAllDataEvent);;