import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { ProductImage } from '../../models/productimage.model';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Util } from '../../util';
import { ApiService } from '../../api.service';
import * as Handsontable from 'handsontable';

import { HotTableRegisterer } from '@handsontable/angular';


declare const cloudinary: any;
let productImagesGlobal;




@Component({
    selector: 'app-catalog-load',
    templateUrl: './catalog-load.component.html',
    styleUrls: ['./catalog-load.component.css']
})


export class CatalogLoadComponent implements OnInit {

    public categories: Array<Category>;
    public productImages: Array<ProductImage>;
    public catalogDetail = {
        host: null,
        name: null,
        id: null,
        bmUserName: null,
        bmPassword: null,
        email: null
    };
    public products: Array<any>;
    private hotTable: any;
    public priceBoundary = {
        min: 100,
        max: 1000,
        decimalPlaces: null
    };
    public imageRandomConfig = {
        imagesPerProduct: 2
    };
    public sites: Array<any>;
    public selectedSiteForAssignment = '';
    public showSiteIdInput = true;
    public selectedProductForImage: String;
    public isRebuildSearchIndex = true;
    public selectedPricebookCurrency = '';


    constructor ( private hotRegisterer: HotTableRegisterer, private util: Util, private apiService: ApiService ) { }

    getValidProducts () {
        const products = new Array<any>();
        for ( const product of this.products ) {
            if ( product.id && product.name ) {
                products.push( product );
            }
        }
        return products;
    }



    onAfterInit = (hotInstance) => {
        this.hotTable = hotInstance;
        this.addRows(); // add 10 rows
    }

    onRandomizeProductId = () => {
        for ( const product of this.products ) {
            if ( !product.id && product.name ) {
                product.id = this.util.makeId();
            }
        }
        this.hotTable.render();
    }

    onRandomizeCategoryAssignment = () => {
        console.log( 'random category assignment triggered' );
        const lowLevelCategories = new Array<Category>();
        let rerender = false;
        for ( const category of this.categories ) {
            if ( category.subcategories.length === 0 ) {
                lowLevelCategories.push( category );
            }
        }

        for ( const product of this.products ) {
            if ( !product.category && product.name ) {
                const randomIndex = Math.floor( Math.random() * lowLevelCategories.length );
                product.category = lowLevelCategories[randomIndex].id;
                rerender = true;
            }
        }
        if ( rerender ) {
            this.hotTable.render();
        }

    }


    onRandomizePrice = ( min: number, max: number, precision?: number) => {

        let rerender = false;
        for ( const product of this.products ) {
            if ( !product.price && product.name ) {
                const price = this.util.round( Math.random() * ( max - min ) + min, precision || 0 );
                // const  = Math.floor( Math.random() * lowLevelCategories.length );
                product.price = price;
                rerender = true;
            }
        }
        if ( rerender ) {
            this.hotTable.render();
        }

    }


    onCategoryBlur = (category: Category) => {
        if ( category.name && !category.id ) {
            // try to autopopulate id
            this.apiService.getMcabParse( category.name ).subscribe(
                (mecabResponse: any) => {
                    const pronounceableWords = new Array<String>();
                    for ( const word of mecabResponse.result ) {
                        // console.log( word );
                        if ( word.features[7] !== '*' && word.features[7] !== undefined ) {
                            pronounceableWords.push( word.features[7] );
                        } else if ( word.features[0] === '名詞' ) {
                            pronounceableWords.push( word.surface );
                        }
                    }
                    const kana = pronounceableWords.join('-');
                    this.apiService.getRomji( kana ).subscribe(
                        (romajiResponse: any) => {
                            category.id = romajiResponse.result.romaji;
                        }
                    );
                },
                (error) => {
                    alert( 'oops something went wrong' );
                }
            );
        }
    }


    onAssignImagesToProduct = (productId: String) => {
        for ( const product of this.products ) {
            if ( product.id === productId && productId !== null && productId !== undefined ) {
                product.imagesHtml = '';
                product.images = new Array<ProductImage>();
                for ( const image of this.productImages ) {
                    if ( image.isSelected ) {
                        product.imagesHtml += '<img style="height:25px;" src="' + image.url + '"/>';
                        product.images.push( image );
                    }
                }
                break;
            }
        }
        this.hotTable.render();

    }

    onRandomizeImageAssignment = () => {
        if ( !(this.imageRandomConfig.imagesPerProduct > 0) ) {
            return; // do nothing
        }

        for ( const product of this.getValidProducts() ) {
            if ( product.images.length === 0 ) {
                // add images
                for ( let i = 0; i < this.imageRandomConfig.imagesPerProduct; i++ ) {
                    const index = Math.floor( this.productImages.length * Math.random() );
                    const image = this.productImages[index];
                    product.imagesHtml += '<img style="height:25px;" src="' + image.url + '"/>';
                    product.images.push( image );
                }
            }
        }
        this.hotTable.render();
    }


    onSubmitCatalogPopulate = () => {
        // vaidate form
        if ( !this.catalogDetail.name ) {
            alert( 'Please enter catalog name' );
        } else if ( !this.catalogDetail.id ) {
            alert( 'Please enter catalog ID' );
        } else if ( !this.catalogDetail.bmUserName ) {
            alert( 'Please enter BM user name' );
        } else if ( !this.catalogDetail.bmPassword ) {
            alert( 'Please enter BM password' );
        } else if ( !this.catalogDetail.host ) {
            alert( 'Please enter CC host name' );
        }

        const categories = new Array<any>();
        for ( const category of this.categories ) {
            categories.push( category.toObject() );
        }

        const catalogObject = {
            host: this.catalogDetail.host,
            id: this.catalogDetail.id,
            name: this.catalogDetail.name,
            bmUserName: this.catalogDetail.bmUserName,
            bmPassword: this.catalogDetail.bmPassword,
            email: this.catalogDetail.email,
            categories: categories,
            images: this.productImages,
            products: this.getValidProducts(),
            pricebookCurrency: this.selectedPricebookCurrency
        };

        if ( this.selectedSiteForAssignment !== '' ) {
            catalogObject['siteAssignment'] = this.selectedSiteForAssignment;
            catalogObject['rebuildSearchIndex'] = this.isRebuildSearchIndex;
        }

        this.apiService.submitCatalog({catalog: catalogObject}).subscribe(
            ( result ) => {
                console.log( result );
                alert('Request was successfully put in a queue! Please wait patiently while we process your request!');
            },
            ( error ) => {
                console.log( error );
            }
        );
    }

    onGetSites = ( catalogDetail ) => {

        const getSites = ( host, accessToken ) => {
            this.apiService.getSites( host, accessToken ).subscribe(
                ( result: any ) => {
                    console.log( result );
                    this.sites = result.result.data;
                    this.showSiteIdInput = false;
                },
                ( error ) => {
                    console.log( error );
                    this.showSiteIdInput = true;
                }
            );
        };


        if ( catalogDetail.host && catalogDetail.bmUserName && catalogDetail.bmPassword ) {

            if ( this.apiService.getAccessToken() === undefined || this.apiService.getAccessToken() === '' ) {
                const params = {
                    'host': catalogDetail.host,
                    'bmUserName': catalogDetail.bmUserName,
                    'bmPassword': catalogDetail.bmPassword
                };
                this.apiService.login( params ).subscribe(
                    ( result ) => {
                        console.log( result );
                        this.apiService.setAccessToken( result['access_token'] );
                        getSites( catalogDetail.host, result['access_token'] );
                    },
                    ( error ) => {
                        console.log( error );
                        alert('Login failed with the given credential! Please look at the console log for more detail');
                    }
                );
            } else {
                getSites( catalogDetail.host, this.apiService.getAccessToken() );
            }


        } else {
            console.log( 'waiting for all hosts, id and password to be entered' );
        }

    }


    ngOnInit () {


        this.productImages = new Array<ProductImage>();
        productImagesGlobal = this.productImages;
        const root: Category = new Category();
        root.initAsRoot();
        this.categories = new Array<Category>();
        this.categories.push( root );

        this.products = new Array<any>();

        document.getElementById('upload_widget_opener').addEventListener('click', () => {

            cloudinary.openUploadWidget(
                {
                    cloud_name: this.apiService.getEnv().CLOUDINARY_CLOUD_NAME,
                    upload_preset: this.apiService.getEnv().CLOUDINARY_UPLOAD_PRESET,
                    sources: [ 'local', 'url', 'image_search'],
                    google_api_key: this.apiService.getEnv().GOOGLE_IMAGE_API_KEY

                },
                function (error, result) {
                    if ( result instanceof Array ) {
                        for ( let i = 0; i < result.length; i++) {
                            productImagesGlobal.push( new ProductImage( result[i] ) );
                        }
                    }
                }

            );
        }, false);

    }


    addRows (rows?: number) {
        if ( rows === undefined ) {
            rows = 10;
        }
        for ( let i = 0; i < rows; i++ ) {
            this.products.push({
                id: '',
                name: '',
                category: '',
                price: null,
                imagesHtml: '',
                images: new Array<ProductImage>()
            });
        }
        this.hotTable.render();
    }

    createSubCategory ( category: Category ) {
        const index = this.categories.indexOf( category );
        this.categories.splice( index + 1, 0, category.createSubCategory() );
    }

    deleteSubcategory ( category: Category ) {
        const index = this.categories.indexOf( category );
        this.categories.splice( index, 1 );

    }




}
