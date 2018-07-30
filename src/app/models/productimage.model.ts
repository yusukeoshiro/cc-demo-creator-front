export class ProductImage {
    public url: string;
    public id: string;

    constructor ( response: any ) {
        this.url = response.secure_url;
        this.id = response.public_id;
    }


}
