const system = new System();

const log = document.getElementById("log");

const NameInput = document.getElementById("NameInput");
const NameButton = document.getElementById("NameButton");

const JoinCode = document.getElementById("JoinCode");
const LeaveButton = document.getElementById("LeaveButton");

const GroupInput = document.getElementById("GroupInput");
const GroupButton = document.getElementById("GroupButton");

//名前の処理
NameInput.value = system.client.name;

NameButton.addEventListener("click",(event)=>{
  event.preventDefault();

  log.innerText = "";

  if(NameInput.disabled){
    NameInput.disabled = false;
    NameButton.classList.replace("btn-success","btn-primary")
    NameButton.value = "保存";
  }else{
    if(
      NameInput.value.length < 4||
      NameInput.value.length > 8
    ) return log.innerText = "名前は4以上8文字以内に指定してください";

    system.client.name = NameInput.value;

    NameInput.disabled = true;
    NameButton.classList.replace("btn-primary","btn-success")
    NameButton.value = "編集";
  }
});

//グループ情報

//グループに参加
GroupButton.addEventListener("click",async(event)=>{
  event.preventDefault();

  log.innerText = "";

  if(Object.keys(system.client.group).length !== 0) return;

  try{
    system.joinGroup(GroupInput.value);
    system.connect();

    JoinCode.innerText = GroupInput.value;
    GroupInput.value = "";
    GroupInput.disabled = true;
    GroupButton.disabled = true;
    LeaveButton.disabled = false;
  }catch(error){
    log.innerText = error.message;
  }
});