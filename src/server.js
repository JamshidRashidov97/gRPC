const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDefinition)
const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();
server.bindAsync(
    "0.0.0.0:7777",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
    if (error) {
        console.error("Server binding failed:", error);
    } else {
        console.log(`Server binding on port ${port}`);
    }
})

server.addService(todoPackage.Todo.service, {
    "createTodo": createTodo,
    "readTodos": readTodos,
    "readTodosStream": readTodosStream
});


const todos = []
function createTodo (call, callback) {
    const todoItem = {
        "id": todos.length + 1,
        "text": call.request.text
    }
    todos.push(todoItem)
    callback(null, todoItem)
}

function readTodos (call, callback) {
    callback(null, {"items": todos})
}

function readTodosStream (call, callback) {
    todos.forEach(t => call.write(t))
    call.end();
}