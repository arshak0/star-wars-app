import { createStore, createEvent } from 'effector';
import type {AllData, AddData, ChangeData, Person } from "../lib/types/Person";
import { getPersonId } from "../lib/utils/allUtils";

export const addDataEvent = createEvent<AddData>();
export const changeDataEvent = createEvent<ChangeData>();
export const resetAllDataEvent = createEvent();
export const $allData = createStore<AllData | null>(null)
    .on(addDataEvent, (store: AllData | null, { page, data }) => {
        let newStore = store ? {...store} : {ids: [], data: [], pages: []}
        for ( let i=0; i<data.length; i++ ) {
            let id = getPersonId(data[i].url)
            if (id>16) {
                id=id-1
            }
            data[i].id=id;
            if ( store && store.ids.includes(id) ) {
                break;
            }
            newStore.ids.push(id)
            newStore.data.push(data[i])
        }
        if ( !newStore.pages.includes(page) ) newStore.pages.push(page)

        newStore.ids.sort((a,b) => a-b)
        newStore.data.sort((a,b) => getPersonId(a.url)-getPersonId(b.url) )
        newStore.pages.sort((a,b) => a-b)
        return newStore
    })
    .on(changeDataEvent, (store: AllData | null, { id,value,field}) => {
        let newStore = store ? {...store} : {ids: [], data: [], pages: []}
        let person = newStore?.data.filter((item: Person) => {
            return item.id===id
        })[0];

        if (field && person) {
            person[field]=value
        }
        return newStore
    })
    .reset(resetAllDataEvent);;