export class Course{
    code?:number;
    name?:string;
    category?:number;
    countLesson?:number;
    date:Date;
    sillibos:string[];
    wayLearning:Type;
    codeLecturer?:number;
    image:string;
    constructor(){
        this.name=undefined
        this.category=1;
        this.countLesson=undefined;
        this.date=new Date();
        this.sillibos=[]
        this.wayLearning=Type.ZOOM;
        this.codeLecturer=undefined;
        this.image="";

    }
}
export enum Type {
    frontal = "frontal",
    ZOOM = "ZOOM",
}