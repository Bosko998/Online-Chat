export class UI {
    constructor(l) {
        this.list = l;
      
    }
    set list(r) {
        this._list = r
    }
    get list() {
        return this._list
    }
  
    clear() {
        this.list.innerHTML = ""
    }
    formatData(date) {
        const d = date.getDate();
        const m = date.getMonth() + 1;
        const y = date.getFullYear();
        const h = date.getHours();
        const min = date.getMinutes();

        const dateString = d + "/" + m + "/" + y + "-" + h + ":" + min;
        
        return dateString;
    }
    
    templateUI(data,type) {
    const { created_At, message, username,id } = data // object distructuring
        if (type === "removed") {
            const allMessages = document.querySelectorAll(".message");
            allMessages.forEach((message) => {
                const messageAttribute = message.getAttribute("data-id")
                if (messageAttribute === id) {
                    message.remove();
                }
            })
        } else {
            const messageContainer = document.createElement("div");
            const containerWrapper = document.createElement("div");
            const user_name = document.createElement("span");
            const user_message = document.createElement("span");
            const date = document.createElement("p");
            messageContainer.classList.add("message");
            containerWrapper.classList.add("div-wrapper");
            messageContainer.setAttribute("data-id", id)
            user_name.classList.add("user-name");
            user_message.classList.add("user-message");
            date.classList.add("date")
            messageContainer.append(containerWrapper)
            containerWrapper.append(user_name)
            containerWrapper.append(user_message)
            containerWrapper.append(date)
            user_name.innerHTML = username
            user_message.innerHTML = message
            const formatedDate = this.formatData(created_At.toDate());//toDate zbog timestamp da ga prebacimo kao date obj
            date.innerHTML = formatedDate;
            let currentUser = localStorage.getItem("Name:")
            if (currentUser === username) {
                const deleteItem = document.createElement("div")
                deleteItem.classList.add("image")
                deleteItem.innerHTML = "x"
                containerWrapper.append(deleteItem)
                messageContainer.classList.add("currentEl")
                messageContainer.style.background = "grey"
                messageContainer.style.background = "grey"
                messageContainer.style.alignSelf = "flex-end"
                containerWrapper.append(deleteItem)
                deleteItem.addEventListener("click", this.deleteMsg) 
            } 
          this.list.append(messageContainer)
        // const html = `<div class="message">
        //                 <div class="div-wrapper">
        //                 <span class="user-name">${username}</span>&nbsp
        //                 <span class="user-message">${message}</span>
        //                 <div class="image" onclick="deleteMessage()">x</div>
        //                 </div>
        //                 <p class="date">${formatedDate}</p>
        //                 </div>`

        }
    }
    deleteMsg(elem) {
        let elemAttribute =elem.target.parentElement.parentElement.getAttribute("data-id")
        
        db.collection("chats")
            .doc(elemAttribute)
            .delete()
            .then(() => { console.log("succesfully!") }) 
    }
}