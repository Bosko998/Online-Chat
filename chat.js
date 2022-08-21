export class Chatroom {
    constructor(r,u){
        this.room = r;
        this.username = u;
        this.chats = db.collection("chats");
        this.unsub;
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
            mssage: messages,
            username: this.username,
            room:this.room, 
            created_at: new Date()
        };
        let response = await this.chats.add(payload);
        return response;
    }
getChats() {
    this.unsub = this.chats
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          console.log(change.doc.data());
        });
      });
    }
updateUn(un) {
        this.username = un
    };

    updateRoom(r) {
        this.room = r
        if(this.unsub) {
        this.unsub()
    }
    };
}