import { Injectable } from '@angular/core';

@Injectable()
export class AppService{
    constructor(){}

    getLocal(store){
        return JSON.parse(localStorage.getItem(store));
    }

    setLocal(store, value){
        localStorage.setItem(store, JSON.stringify(value));
    }

    removeLocal(store){
        localStorage.removeItem(store);
    }
}