export class Chatroom {
    constructor(r,u){
        this.room = r;
        this.username = u;
        this.chats = db.collection("chats");
        this.unsub;
        this.delete;
    }
    set room(r){
        this._room = r
    }
    set username(u){
        this._username = u
    }

    get room(){
        return this._room
    }
    get username(){
        return this._username
    }
    async addMessage(messages){
        let payload = {
            message: messages,
            username: this.username,
            room:this.room, 
            created_At: new Date()
        };
        let response = await this.chats.add(payload);
        return response;
    }
getChats(callback) {
        this.unsub = this.chats
      .where("room", "==", this.room)
      .orderBy("created_At")
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
            const changeType = change.type;
            const messageData = change.doc.data();
            messageData.id = change.doc.id
            callback(messageData,changeType)
            
        });
      });
    }
    updateUn(un, notAlert) {
        console.log(notAlert)
        if (!notAlert) {
        alert("Username is updated")
    }
    this.username = un
    };

    updateRoom(r) {
        this.room = r
        if(this.unsub) {
        this.unsub()
    }
    };
 
}