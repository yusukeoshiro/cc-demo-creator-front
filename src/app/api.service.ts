import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ApiService {

    private env: any;
    envReceived = new EventEmitter<any>(); // fired when environmental variables are received


    constructor( private httpClient: HttpClient ) {
        this.httpClient.get('/api/env').subscribe(
            ( data: any ) => {
                if ( data.SERVER_URL ) {
                    console.log( 'environmental variable obtained successfully!' );
                    this.env = data;
                    this.envReceived.emit( this.env );
                } else {
                    alert( 'error occured while getting environmental variables' );
                }
            },
            ( error ) => {
                alert( 'error occured while getting environmental variables' );
            }
        );
    }

    getEnv () {
        return this.env;
    }


    getMcabParse ( text: String ) {

        const url = 'https://text-util-service.herokuapp.com/api/mecab/parse?t=' + text;
        console.log( 'getting mecab parse:' + url );
        return this.httpClient.get(url);
    }

    getRomji ( text: String ) {
        const url = 'https://text-util-service.herokuapp.com/api/romajize?t=' + text;
        console.log( 'getting romaji:' + url );
        return this.httpClient.get(url);

    }

    submitCatalog( params ) {
        const url = this.env.SERVER_URL + '/api/v1/catalog';
        return this.httpClient.post(url, params);
    }

}
