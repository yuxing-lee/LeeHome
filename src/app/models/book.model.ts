export class book {

    public title: string = "";
    public isbn: string = "";
    public author: string = "";
    public publisher: string = "";
    public published_year: string = "";
    public updated_date: string = "";
    public _id: string = "";

    constructor(title?: string, isbn?: string, author?: string, publisher?: string, published_year?: string, updated_date?: string, _id?: string)
    {
        this.title = title;
        this.isbn = isbn;
        this.author = author;
        this.publisher = publisher;
        this.published_year = published_year;
        this.updated_date = updated_date;
        this._id = _id;
    }
}