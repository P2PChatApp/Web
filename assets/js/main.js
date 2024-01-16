const System = new System();

const NameForm = document.getElementById("NameForm");
const NameInput = document.getElementById("NameInput");
const NameButton = document.getElementById("NameButton");

//名前の変更処理
NameButton.addEventListener("click",()=>{
  if(NameInput.disabled){
    NameInput.disabled = false;
    NameButton.value = "保存";
  }else{
    NameInput.disabled = true;
    NameButton.value = "編集";
  }
});