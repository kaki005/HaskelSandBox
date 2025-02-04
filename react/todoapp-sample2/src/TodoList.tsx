import { stringify } from "querystring";
import React, { useState } from "react";
import TodoTask from "./models/TodoTask"
import JsonManager from "./models/JsonManager";
import { json } from "stream/consumers";

const TodoList : React.FC = () =>  {
    const jsonManager = new JsonManager();

    const [TaskList, setTaskList] = useState(jsonManager.GetTasks())
    const [FormState, setFormState] = useState({
        editingIndex : -1,
        name : "", 
        dateYear : 2022,
        dateMonth : 0,
        dateDay : 1,
    })

    const onCheckboxChanged = (item : TodoTask) => {
        item.ChangeValue(item.Name(), !item.IsChecked(), item.Date())
        setTaskList(TaskList.slice(0, TaskList.length));
    }

    const DeleteTask = (index: number) => {
        var rep = window.confirm(`タスク ${TaskList[index].Name()} を消去しますか？`);
        if(!rep) { return; }
        TaskList.splice(index, 1);
        setTaskList(TaskList.slice(0, TaskList.length));
    }

    // 値の変化時
    const onChanged= (e :(React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>))=>{
        const name :string = e.target.name;
        let value = e.target.value;
        setFormState
        ({
            ...FormState,
           [name] : value
        });
    }

    const AddTask = () =>{
        TaskList.push(new TodoTask(FormState.name, false, new Date(FormState.dateYear, FormState.dateMonth-1, FormState.dateDay)));
        setTaskList(TaskList.slice(0, TaskList.length));
        setFormState({
            editingIndex : -1,
            name : "", 
            dateYear : 2022,
            dateMonth : 0,
            dateDay : 1,
        });
    }

    const StartEdit = (index :number, item :TodoTask) => {
        item = TaskList[index];
        console.log(item.Date().getMonth()+1);
        
        setFormState({
            editingIndex : index,

            name : item.Name(), 
            dateYear : item.Date().getFullYear(),
            dateMonth : item.Date().getMonth()+1,
            dateDay : item.Date().getDate(),
        });
        console.log(`${FormState.dateYear}/${FormState.dateMonth}/${FormState.dateDay}`);
    }

    const CancelEdit =() => {
        setFormState({
            editingIndex : -1,
            name : "", 
            dateYear : 2022,
            dateMonth : 0,
            dateDay : 1,
        });
    }

    const UpdateTask = (index :number) => {
        TaskList[index].ChangeValue(FormState.name, TaskList[index].IsChecked(), new Date(FormState.dateYear, FormState.dateMonth-1, FormState.dateDay));
        CancelEdit();
    }

    const SaveTasks = (e: any) => { jsonManager.SaveTasks(TaskList); }
    window.addEventListener("beforeunload", SaveTasks);


    return (<div className="TodoListContainer">
        <table className="table table-original">
            <thead className="table-dark">
                <tr >
                    <td >Todo</td>
                    <td>期限</td>
                    <td ></td>
                </tr>
            </thead>
            <tbody className="table-striped">
                {TaskList.map((item, index) => <tr>
                    <td onClick={() => StartEdit(index, item)}> 
                        {FormState.editingIndex === index 
                        ?
                            <input className="form-control form-original" name="name" onChange={onChanged} value={FormState.name}></input>
                        :
                            <span>
                                <input type="checkbox" checked={item.IsChecked()} onChange={(e) =>onCheckboxChanged(item)}/>
                                {item.Name()}
                            </span>
                        }
                    </td>
                    <td>
                        {FormState.editingIndex === index 
                        ?
                        <span>
                            <select className="form-control form-inline marginRight" style={{width: "80px"}} name="dateYear" onChange={onChanged} value={FormState.dateYear}>
                                {range(1900, 2030).map( idx =>
                                    <option value={idx}>{idx}</option>
                                )}
                            </select>年
                            <select className="form-control form-inline marginRight"style={{width: "60px"}}  name="dateMonth" onChange={onChanged} value={FormState.dateMonth}>
                                {range(1, 12).map( idx =>
                                    <option value={idx}>{idx}</option>
                                )}
                            </select>月
                            <select className="form-control form-inline marginRight" style={{width: "60px"}} name="dateDay" onChange={onChanged} value={FormState.dateDay}>
                                {range(1, 31).map( idx =>
                                    <option value={idx}>{idx}</option>
                                )}
                            </select>日
                        </span>
                        :
                            item.Date().toLocaleDateString()}
                    </td>
                    <td>
                        {FormState.editingIndex === index 
                        ?
                        <span>
                            <button className="btn btn-primary marginRight" onClick={() => UpdateTask(index)}>変更</button>
                            <button className="btn btn-danger" onClick={CancelEdit}>キャンセル</button>
                        </span>
                        :
                        <span>
                            <button className="btn btn-danger" onClick={() => DeleteTask(index)}>✗</button>
                        </span>
                        }
                        
                    </td>
                </tr>)}
                    

                {FormState.editingIndex === -1 ?
                <tr>
                    <td>
                        <input className="form-control form-original" name="name" onChange={onChanged} value={FormState.name}></input>
                    </td>
                    <td>
                        <select className="form-control form-inline marginRight" style={{width: "80px"}} name="dateYear" onChange={onChanged} value={FormState.dateYear}>
                            {range(1900, 2030).map( idx =>
                                <option>{idx}</option>
                            )}
                        </select>年
                        <select className="form-control form-inline marginRight"style={{width: "60px"}}  name="dateMonth" onChange={onChanged} value={FormState.dateMonth}>
                            {range(1, 12).map( idx =>
                                <option>{idx}</option>
                            )}
                        </select>月
                        <select className="form-control form-inline marginRight" style={{width: "60px"}} name="dateDay" onChange={onChanged} value={FormState.dateDay}>
                            {range(1, 31).map( idx =>
                                <option>{idx}</option>
                            )}
                        </select>日
                    </td>
                    <td>
                        <button className="btn btn-primary" onClick={AddTask}>+</button>
                    </td>
                </tr>
                : null
            }
            </tbody>
        </table>
    </div>);
}


function range(start :number, end :number) : Array<number> {
    let arr = new Array<number>();
    for (let i = start; i < end+1; i++) {
        arr.push(i);
    }
    return arr;
}

export default TodoList;