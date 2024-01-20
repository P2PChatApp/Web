class Main{
  constructor(){
    this.system = new System("wss://ws.taka.cf");
  }

  log(text){
    document.getElementById("log").innerText = text;
  }

  addMessage(text){
    document.getElementById("Messages").insertAdjacentHTML("beforeend",`
      <div class="card">
        <div class="card-body">
          ${text}
        </div>
      </div>
    `);
  }
}