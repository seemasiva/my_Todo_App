 export  default class Todo{
    public id:  number;
    public todo:string;
    public completed :boolean;
    public userId: string;

    public constructor(){
        this.id = 0,
        this.todo = "",
        this.completed = false
        this.userId=""
    }

 }
