class Main{
  constructor(){
    this.system = new System("wss://ws.taka.cf");
  }

  log(text){
    document.getElementById("log").innerText = text;
  }
}