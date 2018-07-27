import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';

@Component({
    selector: 'app-catalog-load',
    templateUrl: './catalog-load.component.html',
    styleUrls: ['./catalog-load.component.css']
})


export class CatalogLoadComponent implements OnInit {

    public categories: Array<Category>;

    constructor () { }

    ngOnInit () {
        const root: Category = new Category();
        root.initAsRoot();
        this.categories = new Array<Category>();
        this.categories.push( root );
        console.log( this.categories );
    }

    createSubCategory ( category: Category ) {
        const index = this.categories.indexOf( category );
        this.categories.splice( index + 1, 0, category.createSubCategory() );

        // this.categories.push( category.createSubCategory() );
        // console.log( category );
    }

}
