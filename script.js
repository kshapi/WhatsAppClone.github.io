const inputs = document.querySelectorAll('.item input');
const line = document.querySelector('.scroll');
const content = document.querySelector('.content');
const page = document.querySelector('.page');


//Top Navigation
const change = (e) => {
  const id = e.target.id;
  
  if (id === 'chat') {
    line.style.width = '88px';
    content.scrollLeft = '300';
  }else if (id === 'status') {
    line.style.width = '88px';
    content.scrollLeft = '600';
  }else if (id === 'calls') {
    line.style.width = '88px';
    content.scrollLeft = '900';
  }else if (id === 'icon') {
    line.style.width = '35px';
    content.scrollLeft = '0';
  };
  
};
//Checkbuxs
inputs.forEach( input => {
  input.addEventListener('change',change);
});


//When User Scroll Pages
const scroll = function() {
  const scrollLeft = parseInt(this.scrollLeft);
  if (scrollLeft < 150) {
    line.style.left = '0px';
    line.style.width = '35px';
  };
  if(scrollLeft > 150) {
    line.style.left = '35px';
    line.style.width = '88px';
  }
  if (scrollLeft > 450) {
    line.style.left = '124px';
  };
  if (scrollLeft > 750) {
    line.style.left = '212px';
  };
  
};
content.addEventListener('scroll',scroll);

//Default Scroll On Chats page
window.addEventListener('load',()=>{
  content.scrollLeft = 300;
});




//Fetch Dummy Chats 
const userChats = (user) => {
  const imgUrl = user.querySelector('.pic img').getAttribute('src');
  const userName = user.querySelector('.text .name').innerText;

//Animation Page come from right side
const myAnimation = anim(page, ['270', '0']);
myAnimation.play();

//All Dummy Chats
  document.querySelector('.page').style.display = 'block';
  page.innerHTML = `
  <!-- Page Navbar -->
  <nav class="page-nav">
    <div class="row-1">
      <i class="fa-solid fa-arrow-left"></i>
      <div class="pic">
        <img src='${imgUrl}'/>
      </div>
      <h4 class="user-name">${userName}</h4>
    </div>
    <div class="row-2">
      <i class="fa-solid fa-video"></i>
      <i class="fa-solid fa-phone"></i>
      <i class="bi bi-three-dots-vertical"></i>
    </div>
  </nav>
  
  <div class="chat-list">
    <div class="user-chats">
      <img src="encripted.png"/>
 <!-- Incoming Message -->
      <div class="incoming-msg">
        <h4 class="msg">Hey
          <span class="send-time">1:00 pm
          </span>
        </h4>
      </div>
 <!-- Outgoing Message -->
      <div class="outgoing-msg">
        <h4 class="msg">Hello
          <div class="dd">
            <span>1:10 pm</span>
            <img src="ticks.png" class="ticks"/>
          </div>
        </h4>
      </div>
 <!-- Incoming Record -->
      <div class="incoming-msg">
        <div class="record">
          <img src="voice.png" />
          <div class="pic">
            <img src="3.jpeg" />
            <i class="fa-solid fa-microphone"></i>
          </div>
        </div>
        <div class="length-date">
          <p>0:12</p>
          <p>1:15 pm</p>
        </div>
      </div>
 <!-- Outgoing Record -->
      <div class="outgoing-msg">
        <div class="record">
          <div class="pic">
            <img src="${imgUrl}" />
            <i class="fa-solid fa-microphone"></i>
          </div>
          <img src="voice.png" />
        </div>
              
        <div class="length">
          <p>0:20</p>
          <div class="date">
            <p>1:20 pm</p>
            <img src="ticks.png" class="ticks" />
          </div>
        </div>
      </div>
      
    </div>
  </div>
 <!-- Text And Message Area -->
  <div class="text-area">
    <div class="input">
      <i class="fa-regular fa-face-smile"></i>
      <input type="text" placeholder="Massege"/>
      <i class="fa-solid fa-paperclip"></i>
      <i class="bi bi-camera"></i>
    </div>
    <div class="rec">
      <i class="fa-solid fa-microphone"></i>
    </div>
  </div>
  `;
  
  //Back Arrow Btn
  const backBtn = document.querySelector('.fa-arrow-left');
  backBtn.addEventListener('click',back);
  
  //When User Write Something
  //Then change microphone icon to send
  const write = document.querySelector('.text-area input');
  write.addEventListener('input', changeIcon);
  
};

//Lestner for Each User
const userList = document.querySelectorAll('.freind');

userList.forEach(user => {
  user.addEventListener('click', () => {
    userChats(user);
  });
});




//When Uset Click On Back Arrow
const back = () => {
  //Animation 
  const animation = anim(page, ['0', '270']);
  animation.play();
  
  //When Animation Will End
  animation.onfinish = () => {
    page.style.display = 'none';
  };
  
};



//When User Write Something in msg
const changeIcon = (e) => {
  const msg = e.target;
  const rec = document.querySelector('.text-area .rec i');
  
  if (msg.value.length > 0) {
    rec.className = 'bi bi-send';
    
    //Send Button
    const sendBtn = document.querySelector('.bi-send')
    sendBtn.addEventListener('click', sendMessage);
  } else {
    rec.className = 'fa-solid fa-microphone';
  };
  
};



//Animation Or KeyFrames
const anim = (page, [start, end]) => {
  //Effect
  const effect = new KeyframeEffect(page, [
     {transform: `translate(${start}px)`},
     {transform: `translate(${end}px)`}
    ], {
    duration: 100,
    iterations: 1
  });
  return new Animation(effect, document.timeline);
  
};




//Send Temp Message
const  sendMessage = () => {
  const msg = document.querySelector('.text-area input');
  //chats list
  const list = page.querySelector('.user-chats');
  //Time 
  let date = new Date();
  let now = date.toLocaleTimeString([], { hour12: true }).split('');
  now.splice(4, 4, ' ');
  let time = now.join('')
  
  if (msg.value < 1) return;
  //Fetch Msg an chats
  list.innerHTML += `
    <div class="outgoing-msg">
      <h4 class="msg">${msg.value}
        <div class="dd">
          <span>${time}</span>
          <img src="ticks.png" class="ticks"/>
        </div>
      </h4>
    </div>
  `;
  msg.value = '';
  
  //Change send Icon to microphone after sending msg
  document.querySelector('.text-area .rec i').className = 'fa-solid fa-microphone';
  
};


//Kshapi