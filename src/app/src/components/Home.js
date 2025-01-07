import { useState } from "react";
import ToDoPost from "./ToDoPost";
import { useEffect } from "react";
import axios from "axios";


function Home(){
    const [todos, setTodos] = useState([]);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");


    const handleAddTodo = () => {
        axios.post("http://localhost:8000/todos/", {
            title : title,
            content : content
        }).then((res) => {
            axios.get("http://localhost:8000/todos/?format=json").then((res) => {
                setTodos(res.data);
            });
            setTitle("");
            setContent("");
            alert("Todo Added Successfully");
        });
    }

    useEffect(() => {
        axios.get("http://localhost:8000/todos/?format=json").then((res) => {
            setTodos(res.data);
        });
    }, []);

    return (
        <>
            <div className="d-flex justify-content-between">
                <div style={{width : "30%", height : "80vh"}}>
                    <div className="d-flex flex-column justify-content-center align-items-center" style={{height : "100%"}}>
                        <p className="fs-3 fw-bold mb-0">Add a New TODO</p>
                        <div className="d-flex flex-column justify-content-around align-items-center mt-4">
                            <input onChange={(e) => setTitle(e.target.value)} style={{borderRadius : "10px", padding : "10px", border : "1px solid #000"}} type="text" placeholder="Title" value={title} />
                            <textarea onChange={(e) => setContent(e.target.value)} style={{width : "100%", borderRadius : "10px", padding : "10px", border : "1px solid #000"}} rows={5} className="mt-3" type="text" placeholder="Content" value={content} />
                            <button onClick={handleAddTodo} style={{borderRadius : "10px", padding : "10px", backgroundColor: "#000", color : "#fff", width : "100%"}} className="mt-3">Add</button>
                        </div>
                    </div>
                </div>
                <div style={{width : "65%", height : "90vh", overflowY : "scroll", scrollbarWidth : "none"}} >
                    <div className="d-flex flex-wrap justify-content-between">
                        {todos.map((todo) => (
                            <ToDoPost key={todo.id} todo={todo} />
                        ))}
                    </div>
                </div>
            </div>

        </>
    )

}

export default Home;