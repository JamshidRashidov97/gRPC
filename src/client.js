const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDefinition)
const todoPackage = grpcObject.todoPackage;

const text = process.argv[2];
const client = new todoPackage.Todo("localhost:40000",
    grpc.credentials.createInsecure()
);

client.createTodo({
    "id": -1,
    "text": text,
}, (error, response) => {
    // if (!error) {
    console.log("Received from the server: " + JSON.stringify(response));
    // } else {
    //     console.error(error);
    // }
})

client.readTodos({}, (error, response) => {
    console.log("Received from the server: " + JSON.stringify(response));
});