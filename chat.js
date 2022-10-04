
export class Chatroom {
    constructor(r, u) {
        this.room = r;
        this.username = u;
        this.chats = db.collection("chats");
        this.unsub;
        this.delete;
    }
    set room(r) {
        this._room = r
    }
    set username(u) {
        this._username = u
    }

    get room() {
        return this._room
    }
    get username() {
        return this._username
    }
    async addMessage(messages) {
        let payload = {
            message: messages,
            username: this.username,
            room: this.room,
            created_At: new Date()
        };
       
        let response = await this.chats.add(payload);
        return response;
    }
    getChats(callback) {
        let messageData;
        let changeType;
        let clientScrollHeight
        let scrollHeight;
        let loaclId
        let userName
        this.unsub = this.chats
        
    
            .where("room", "==", this.room)
            .orderBy("created_At")
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    changeType = change.type;
                    messageData = change.doc.data();
                    messageData.id = change.doc.id
                    loaclId =localStorage.setItem("id:",messageData.id)
                    callback(messageData, changeType)
                    
                });
   
                let AllMessages = document.querySelector(".messages");
                let counterDiv = document.querySelector("#counter");
                console.log(counterDiv)
                
                this.LoadingScreen(AllMessages);
                if (messageData) {

                loaclId = localStorage.getItem("id:")
                userName = localStorage.getItem("Name:")
        
                AllMessages.addEventListener("scroll", () => {
                    clientScrollHeight = AllMessages.scrollTop
                    scrollHeight = AllMessages.scrollHeight -550
                    if (scrollHeight === clientScrollHeight) {
                        
                        counterDiv.innerHTML = 0
                }
                   
                })  
                if (clientScrollHeight < scrollHeight - 100 && messageData.id === loaclId && messageData.username !== userName) {
                    let numberOfMessages = Number(counterDiv.innerHTML)
                        numberOfMessages++
                    counterDiv.innerHTML = numberOfMessages
                    AllMessages.scrollTo(0, clientScrollHeight);
                } else{
                    counterDiv.innerHTML = 0
                    // AllMessages.scrollTo(5, AllMessages.scrollHeight);
                }
                 
                }
      });
    }
    updateUn(un, notAlert) {
        if (!notAlert) {
        alert("Username is updated")
    }
    this.username = un
    };

    updateRoom(r) {
        this.room = r
        if (this.unsub) {
            this.unsub()
        }
        
    };
    LoadingScreen(allMsgs) {
        let loaderHide = document.querySelector(".loader");
        allMsgs.scrollTo(5, allMsgs.scrollHeight);
        loaderHide.classList.add("loader-hidden");
        
        
        }
   
 
}