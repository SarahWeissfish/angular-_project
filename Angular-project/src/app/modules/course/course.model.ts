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
        // this.name="default"
        // this.category=1;
        // this.countLesson=10;
        // this.date=new Date();
        // this.sillibos=new String[4]
        // this.wayLearning=Type.ZOOM;
        // this.codeLecturer=2;
        // this.image="////"

    }
}
export enum Type {
    frontal = "frontal",
    ZOOM = "ZOOM",
}