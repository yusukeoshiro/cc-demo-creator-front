import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { ProductImage } from '../../models/productimage.model';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


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
    public dataset: Array<any>;




    constructor () { }

    ngOnInit () {


        this.productImages = new Array<ProductImage>();
        productImagesGlobal = this.productImages;
        const root: Category = new Category();
        root.initAsRoot();
        this.categories = new Array<Category>();
        this.categories.push( root );

        this.dataset = new Array<any>();


        document.getElementById('upload_widget_opener').addEventListener('click', function() {
            cloudinary.openUploadWidget(
                {
                    cloud_name: 'hj0hjpsip',
                    upload_preset: 'jjiavbmj',
                    sources: [ 'local', 'url', 'image_search'],
                    google_api_key: 'AIzaSyD9_yc3mD-MJaTIk470spkm93hZPO_CS0E'

                },
                function (error, result) {
                    console.log( '----' );
                    console.log( this );
                    console.log(error, result);
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
        console.log( rows );
        if ( rows === undefined ) {
            rows = 10;
        }
        for ( let i = 0; i < rows; i++ ) {
            console.log('test');
            this.dataset.push({
                name: '',
                category: 'root',
                price: 1000
            });
        }
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
