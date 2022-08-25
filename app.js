import {Chatroom} from "./chat.js";
import { UI } from "./ui.js"
let selectedChatroom = new Chatroom("general", "Bosko")
let listHTML = document.querySelector(".messages-content")

let chatRoomUI = new UI(listHTML)
let sendMessageBtn = document.querySelector("#send-msg");
let changeUsernameBtn = document.querySelector("#update-msg");
let chatRoomButtons = document.querySelectorAll(".chatroom-btn");


// generalChatroom.addMessage('neka druga poruka')

selectedChatroom.getChats((messageData)=>chatRoomUI.templateUI(messageData))


let sendMessage  = async () => {
    let message = document.querySelector("#messages");
    selectedChatroom.addMessage(message.value).then(() => { console.log("Message sent sucsesfully") })
    message.value = "Your message";
    localStorage.setItem("Name:", selectedChatroom.username)
    
}

let updateUsername = async () => {
    let updatedUserName = document.querySelector("#updated-username");
    selectedChatroom.updateUn(updatedUserName.value);
    updatedUserName.value = "Username";
}

let changeChatRoom = (value) => {
    selectedChatroom.updateRoom(value);
    chatRoomButtons.forEach((button) => {
       console.log(button)
        button.classList.remove("active");
        let buttonvalue = button.getAttribute("data-value");
        if (value === buttonvalue) {
            button.classList.add("active");    
            localStorage.setItem("Room:", buttonvalue)
        }

       
    })
     chatRoomUI.clear()
        selectedChatroom.getChats((messageData)=>chatRoomUI.templateUI(messageData))
}

sendMessageBtn.addEventListener("click", sendMessage);
changeUsernameBtn.addEventListener("click", updateUsername);
chatRoomButtons.forEach((button) => {
    let buttonvalue = button.getAttribute("data-value");
    
    button.addEventListener("click", () => changeChatRoom(buttonvalue));
})
// local storidzuj ime korisnika i sobu u kojoj sam bio zadnji put

