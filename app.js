import {Chatroom} from "./chat.js";
import { UI } from "./ui.js"
let selectedChatroom = new Chatroom("general", "Bosko")
let currentRoom = localStorage.getItem("Room:")
let listHTML = document.querySelector(".messages-content")
let messages = document.querySelector(".messages")
let chatRoomUI = new UI(listHTML);
let sendMessageBtn = document.querySelector("#send-msg");
let changeUsernameBtn = document.querySelector("#update-msg");
let chatRoomButtons = document.querySelectorAll(".chatroom-btn");
let loader = document.querySelector(".loader")
let LoadingSpinner = () => {
    setTimeout(() => {
        messages.scrollTo(5,messages.scrollHeight);  
        loader.classList.add("loader-hidden");
        
     },1000); 
}

let messageCounter = () => {
     chatRoomButtons.forEach((btn) => {
                if (btn.classList.contains("active")) {
                    let counter = btn.querySelector(".counter")
                    let counterValue = Number(counter.innerText);
                    counter.innerText = counterValue + 1
                } 
               
            })
}

selectedChatroom.getChats((messageData, changeType) => chatRoomUI.templateUI(messageData, changeType))

    let soba = localStorage.getItem("Room:")
    let username = localStorage.getItem("Name:")
    let sendMessage = async () => {
    let message = document.querySelector("#messages");
        selectedChatroom.addMessage(message.value)
            .then(() => {
            messageCounter()    
                console.log("Message sent sucsesfully")
            })
      
    message.value = "Your message";
    console.log(selectedChatroom._username)
}

let updateUsername = async (notAlert) => {
    let updatedUserName = document.querySelector("#updated-username").value;
    selectedChatroom.updateUn(updatedUserName,notAlert);
    localStorage.setItem("Name:", updatedUserName);
}

let changeChatRoom = (value) => {
    loader.classList.remove("loader-hidden");
    LoadingSpinner();
    selectedChatroom.updateRoom(value);
    chatRoomButtons.forEach((button) => {
        button.classList.remove("active");
        let buttonvalue = button.getAttribute("data-value");
        if (value === buttonvalue) {
            
            button.classList.add("active");    
            localStorage.setItem("Room:", buttonvalue)
            
        }
   
    })
     chatRoomUI.clear()
        selectedChatroom.getChats((messageData,changeType)=>chatRoomUI.templateUI(messageData,changeType))
}
if (soba) {
    changeChatRoom(soba)
    
}
if (username) {
    document.querySelector("#updated-username").value = username; 
    updateUsername(true);
} else {
    let randomNumber = "Guest" + Math.floor(100000 + Math.random() * 900000);
    document.querySelector("#updated-username").value = randomNumber;
    updateUsername(true)

}

window.addEventListener("load",LoadingSpinner)
sendMessageBtn.addEventListener("click", sendMessage);
changeUsernameBtn.addEventListener("click", () => updateUsername(false));
chatRoomButtons.forEach((button) => {
    let buttonvalue = button.getAttribute("data-value");
     
    button.addEventListener("click", () =>changeChatRoom(buttonvalue));
   
})




