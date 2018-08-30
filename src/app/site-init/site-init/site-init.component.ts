import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
    selector: 'app-site-init',
    templateUrl: './site-init.component.html',
    styleUrls: ['./site-init.component.css']
})
export class SiteInitComponent implements OnInit {
    public locales = ['en_US', 'en_CA', 'en_GB', 'en',  'fr', 'fr_CA', 'fr_FR',
        'de', 'de_DE', 'it', 'it_IT', 'ja', 'ja_JP', 'es', 'zh', 'zh_CN', 'nl'];

    public instanceDetail = {
        host: null,
        bmUserName: null,
        bmPassword: null
    };

    public siteDetail = {
        id: null,
        name: null,
        defualtLocale: this.locales[0],
        defaultCurrency: null,
        allowedCurrencies: [],
        mainColor: null,
        brandLogoUrl: null,
        email: null,
        isRebuildSearchIndex: false
    };

    public currencies;
    public selectedItems;
    public dropdownSettings: any;

    constructor( private apiService: ApiService ) { }

    ngOnInit() {
        this.apiService.envReceived.subscribe(
            ( data: any ) => {
                this.siteDetail.defaultCurrency = data.CURRENCIES[0].code;
                this.currencies = data.CURRENCIES;
                this.selectedItems = [];
                this.dropdownSettings = {
                    singleSelection: false,
                    idField: 'code',
                    textField: 'code',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    itemsShowLimit: 4,
                    allowSearchFilter: true
                };

            },
            ( error ) => {
                alert( 'error occured while getting environmental variables' );
            }
        );
    }

    onItemSelect (item:any) {
        console.log(item);
    }
    onSelectAll (items: any) {
        console.log(items);
    }

    onSubmitSiteInit = () => {
        const params = {
            'instanceDetail': this.instanceDetail,
            'siteDetail': Object.assign(this.siteDetail, { allowedCurrencies: this.siteDetail.allowedCurrencies.join(':')})
        };

        this.apiService.submitSite( params ).subscribe(
            ( result ) => {
                console.log( result );
                alert('Request was successfully put in a queue! Please wait patiently while we process your request!');
            },
            ( error ) => {
                console.log( error );
                alert('error occured! Look at console for more detail');
            }
        );
    }
}
