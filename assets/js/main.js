const system = new System("wss://ws.taka.cf");

const log = document.getElementById("log");

const NameInput = document.getElementById("NameInput");
const NameButton = document.getElementById("NameButton");

const JoinCode = document.getElementById("JoinCode");
const LeaveButton = document.getElementById("LeaveButton");

const GroupInput = document.getElementById("GroupInput");
const GroupButton = document.getElementById("GroupButton");

const CreateInput = document.getElementById("CreateInput");
const CreateButton = document.getElementById("CreateButton");
const PublicCheck= document.getElementById("PublicCheck");

const Groups = document.getElementById("Groups");

const MessageInput = document.getElementById("MessageInput");
const MessageButton = document.getElementById("MessageButton");
const Messages = document.getElementById("Messages");

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
system.addEventListener("update",()=>{
  Groups.innerText = "";

  system.getGroups()
    .filter(group=>group.isPublic||group.id !== system.client.group.id)
    .forEach(group=>{
      Groups.insertAdjacentHTML("beforeend",`
        <tr>
          <th scope="row">${group.name}</th>
          <th scope="row">${group.id}</th>
          <td>
            <input type="button" class="btn btn-sm btn-primary" id="${group.id}" value="参加">
          </td>
        </tr>
      `);

      document.getElementById(group.id).addEventListener("click",(event)=>{
        event.preventDefault();

        if(Object.keys(system.client.group).length !== 0) return;

        try{
          system.joinGroup(group.id);
          system.connect();

          JoinCode.innerText = group.id;
          GroupInput.value = "";
          CreateInput.value = "";
          GroupInput.disabled = true;
          GroupButton.disabled = true;
          CreateInput.disabled = true;
          CreateButton.disabled = true;
          PublicCheck.disabled = true;
          LeaveButton.disabled = false;
          MessageInput.disabled = false;
          MessageButton.disabled = false;
        }catch(error){
          log.innerText = error.message;
        }
      });
    });
});

//グループに参加
GroupButton.addEventListener("click",(event)=>{
  event.preventDefault();

  log.innerText = "";

  if(!GroupInput.value) return log.innerText = "参加コードを入力してください";

  if(Object.keys(system.client.group).length !== 0) return;

  try{
    system.joinGroup(GroupInput.value);
    system.connect();

    JoinCode.innerText = GroupInput.value;
    GroupInput.value = "";
    CreateInput.value = "";
    GroupInput.disabled = true;
    GroupButton.disabled = true;
    CreateInput.disabled = true;
    CreateButton.disabled = true;
    PublicCheck.disabled = true;
    LeaveButton.disabled = false;
    MessageInput.disabled = false;
    MessageButton.disabled = false;
  }catch(error){
    log.innerText = error.message;
  }
});

//グループを作成
CreateButton.addEventListener("click",async(event)=>{
  event.preventDefault();

  log.innerText = "";

  if(
    CreateInput.value.length < 4||
    CreateInput.value.length > 12
  ) return log.innerText = "グループ名は4以上12文字以内に指定してください";

  if(Object.keys(system.client.group).length !== 0) return;

  const id = await system.createGroup(CreateInput.value,PublicCheck.checked);

  JoinCode.innerText = id;
  GroupInput.value = "";
  CreateInput.value = "";
  GroupInput.disabled = true;
  GroupButton.disabled = true;
  CreateInput.disabled = true;
  CreateButton.disabled = true;
  PublicCheck.disabled = true;
  LeaveButton.disabled = false;
  MessageInput.disabled = false;
  MessageButton.disabled = false;
});

//グループから脱退
LeaveButton.addEventListener("click",(event)=>{
  event.preventDefault();

  system.leaveGroup();

  JoinCode.innerHTML = "&nbsp";
  GroupInput.disabled = false;
  GroupButton.disabled = false;
  CreateInput.disabled = false;
  CreateButton.disabled = false;
  PublicCheck.disabled = false;
  LeaveButton.disabled = true;
  MessageInput.disabled = true;
  MessageButton.disabled = true;
  Messages.innerText = "";
});

//メッセージの送信
MessageButton.addEventListener("click",(event)=>{
  event.preventDefault();

  if(!MessageInput.value) return;

  system.peers.send({
    content: MessageInput.value
  });

  Messages.insertAdjacentHTML("beforeend",`
    <div class="card">
      <div class="card-body">
        ${system.client.name}(${system.client.id}): ${MessageInput.value}
      </div>
    </div>
  `);

  MessageInput.value = "";
});

//メッセージの受信
system.peers.addEventListener("message",(event)=>{
  Messages.insertAdjacentHTML("beforeend",`
    <div class="card">
      <div class="card-body">
        ${event.peer.client.name}(${event.peer.client.id}): ${event.data.content}
      </div>
    </div>
  `);
});

Messages.scrollTop = Messages.scrollHeight;