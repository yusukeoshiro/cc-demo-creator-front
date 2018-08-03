export class ProductImage {
    public url: string;
    public id: string;
    public isSelected: boolean;

    constructor ( response: any ) {
        this.url = response.secure_url;
        this.id = response.public_id;
        this.isSelected = false;
    }

    toggleIsSelected () {
        this.isSelected = !this.isSelected;
    }


}
