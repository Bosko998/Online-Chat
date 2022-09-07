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
    templateUI(data) {
        
        const {created_At,message,username} = data // object distructuring
        const formatedDate = this.formatData(created_At.toDate());//toDate zbog timestamp da ga prebacimo kao date obj
        const html = `<div class="message">
                        <span class="user-name">${username}</span>
                        <span class="user-message">${message}</span>
                        <p class="date">${formatedDate}</p>
                        </div>`
        this.list.innerHTML =this.list.innerHTML +  html
    }
}