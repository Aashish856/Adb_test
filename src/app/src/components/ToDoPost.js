function ToDoPost({ todo }) {
    // console.log(todo._id);
    return (
        <>
            <div
                style={{backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "10px", width: "48%", marginBottom: "30px"}}
            >
                {/* <div style={{ position: "relative" }}>
                    <i onClick={() => handleDeleteTodo(todo._id)} style={{ position: "absolute", top: "0", right: "0", cursor : "pointer" }} className="bi bi-trash"></i>
                </div> */}
                <div className="d-flex flex-column justify-content-center">
                    <p className="fs-5 fw-bold mb-0">{todo.title}</p>
                    <p className="fs-6">{todo.content}</p>
                </div>
            </div>
        </>
    );
}

export default ToDoPost;
