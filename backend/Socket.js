module.exports = function (socket) {
    socket.on("connection", (id) => {
        socket.join(id)
        console.log("user has joined", id)
    })

    socket.on("open chat", (chat) => {
        socket.join(chat);
        console.log("user has joined chat", chat)
    })

    socket.on("send message", (message, usersIds) => {
        console.log("msg received", message)
        let chat = message.chatID;
        if (!chat.members) return;
        usersIds.forEach((id) => {
            if (id === message.senderID._id) return;
            socket.in(id).emit("receive message", message);
            console.log("uId: ",id);
        });
    });
}