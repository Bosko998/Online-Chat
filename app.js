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
    let messageValue = document.querySelector("#messages").value;
    selectedChatroom.addMessage(messageValue).then(() => { console.log("Message sent sucsesfully") })
    console.log(messageValue)
}

let updateUsername = async () => {
    let messageValue = document.querySelector("#updated-username").value;
    selectedChatroom.updateUn(messageValue)
}

let changeChatRoom = (value) => {
    selectedChatroom.updateRoom(value);
    console.log("1")
    chatRoomButtons.forEach((button) => {
        button.classList.remove("active");
        let buttonvalue = button.getAttribute("data-value");
        if (value === buttonvalue) {
            button.classList.add("active");
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

