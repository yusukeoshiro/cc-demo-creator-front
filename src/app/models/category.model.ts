export class Category {
    public name: string;
    public id: string;
    public parent: Category;
    public subcategories: Category[];
    public level: number;
    public isRoot: boolean;

    constructor () {
        this.parent = null;
        this.subcategories = new Array<Category>();
        this.isRoot = false;
    }

    initAsRoot () {
        this.isRoot = true;
        this.name = 'root';
        this.level = 0;
    }

    createSubCategory () {
        const subcategory = new Category();
        subcategory.parent = this;
        subcategory.level = this.level + 1;

        if ( !(subcategory.parent.subcategories instanceof Array) ) {
            subcategory.parent.subcategories = new Array<Category>();
        }
        subcategory.parent.subcategories.push(subcategory);
        return subcategory;

    }



}
