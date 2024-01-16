const system = new System();

const log = document.getElementById("log");

const NameInput = document.getElementById("NameInput");
const NameButton = document.getElementById("NameButton");

//名前の変更処理
NameButton.addEventListener("click",(event)=>{
  event.preventDefault();

  log.innerText = "";

  if(NameInput.disabled){
    if(
      NameInput.value.length < 4||
      NameInput.value.length > 8
    ) return log.innerText = "名前は4以上8文字以内に指定してください";

    NameInput.disabled = false;
    NameButton.value = "保存";
  }else{
    NameInput.disabled = true;
    NameButton.value = "編集";
  }
});