import { Checkbox, Input, message } from 'antd'
import React, { ChangeEvent, useEffect, useState } from 'react'
import todoModel from "./todoModel"

const Todo = () => {
    const [task, setTask] = useState<string>("");
    const [taskList, setTaskList] = useState<todoModel[]>([]);
    const [filterList, setFilterList] = useState<todoModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selected, setSelected] = useState<string>("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetch("https://dummyjson.com/todos?limit=5");
                const resData = await data.json()
                setFilterList(resData.todos || []);
                setTaskList(resData.todos || []);

            } catch (err) {
                console.log({ message: err })
            } finally {
                setLoading(false)
            }

        }
        fetchData()
    }, [])



    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    }

    const handleAdd = () => {
        let tempList = [...taskList];
        const value = {
            id: taskList.length + 1,
            todo: task,
            userId: String(Math.random()),
            completed: false
        }
        tempList.push(value)

        setTaskList(tempList);
        setTask("");
    }

    const checkBoxChange = (todo: todoModel) => {
        setTaskList(prevTasks =>
            prevTasks.map(task =>
                task.id === todo.id ? { ...task, completed: !task.completed } : task
            )
        );
        console.log("taskList", taskList);
    }

    const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelected(value);
        if (value === "completed") {
            setFilterList(taskList.filter(task => task.completed === true));
        } else if (value === "pending") {
            setFilterList(taskList.filter(task => task.completed  === false));
        } else {
            setFilterList(taskList); 
        }
    };

    const handleDelete = (id: number) => {
        const filterList = taskList.filter(item => item.id !== id)
        setTaskList(filterList)
    }


    if (loading) return <p>Loading...</p>



    return (
        <>
            <div>
                <div>My Todo List</div>
                <input type="text" onChange={(e) => handleChange(e)} />
                <button onClick={handleAdd} style={{marginInline:5}}>Add</button>
                <select onChange={handleSelect} value={selected}>
                    <option value="showAll">showAll</option>
                    <option value="completed">completed</option>
                    <option value="pending">pending</option>
                </select>
            </div>
            <div>
                {filterList.length > 0 ? filterList.map((item: todoModel) => (
                    <div key={item.id}>
                        <span>
                            <input type="checkbox" onChange={() => checkBoxChange(item)} checked={item.completed} />
                        </span>
                        <span>{item.todo}</span>
                        <span style={{ color: "red", paddingLeft: 10, cursor: "pointer" }} onClick={() => handleDelete(item.id)}>Remove</span>
                    </div>
                )) : <p>No data Found</p>}
            </div>
        </>
    )
}

export default Todo

// const handleChange = (id: number) => {
//     setTaskList(prevTasks =>
//         prevTasks.map(task =>
//             task.id === id ? { ...task, completed: !task.completed } : task
//         )
//     );
// };
