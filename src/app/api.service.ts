import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ApiService {

    constructor( private httpClient: HttpClient ) {}

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

}
