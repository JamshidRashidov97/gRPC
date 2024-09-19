const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDefinition)
const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();
server.addService(todoPackage.Todo.service, {
    "createTodo": createTodo(),
    "readTodos": readTodos()
});

server.bindAsync(
    "0.0.0.0:40000",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
    if (error) {
        console.error("Server binding failed:", error);
    } else {
        console.log(`Server binding on port ${port}`);
    }
})



function createTodo (call, callback) {
    console.log(call);
    // callback(null, {});
}

function readTodos (call, callback) {
    // callback(null, { items: [] });
}

