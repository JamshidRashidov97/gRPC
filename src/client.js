const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDefinition)
const todoPackage = grpcObject.todoPackage;

const text = process.argv[2];
const client = new todoPackage.Todo("localhost:7777",
    grpc.credentials.createInsecure()
);

client.createTodo({
    "id": -1,
    "text": text,
}, (error, response) => {
    if (!error) {
    console.log("Received from the server: " + JSON.stringify(response));
    } else {
        console.error(error);
    }
})

client.readTodos(null, (error, response) => {
    console.log("Received from the server >>>>>>>>>>" + JSON.stringify(response));
    if (!response.items)
        response.items.forEach(a => console.log(a.text));
});


const call = client.readTodosStream();
call.on("data", item => {
    console.log("Received streamed data >>>>>>>> " + JSON.stringify(item));
});

call.on("end", e => console.log("Server done sending data"));
