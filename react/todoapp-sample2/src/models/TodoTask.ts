
export default class TodoTask {
    constructor(private name:string, private isChecked:boolean, private date:Date ) {};

    public Name () : string {
        return this.name;
    }

    public IsChecked() : boolean {
        return this.isChecked;
    }

    public Date(): Date {
        return this.date;
    }

    public ChangeValue(name :string, isChecked : boolean, date :Date) {
        this.name = name;
        this.isChecked = isChecked;
        this.date = date;
    }
    
}