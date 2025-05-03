/* Do not change, this code is generated from Golang structs */


export class Link {
    link_id: number;
    name: string;
    url: string;
    cc: number;

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);
        this.link_id = source["link_id"];
        this.name = source["name"];
        this.url = source["url"];
        this.cc = source["cc"];
    }
}