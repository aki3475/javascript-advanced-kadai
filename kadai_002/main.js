let jsuntyped = '';
let jstyped = '';
let score = 0;


// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const jswrap = document.getElementById('wrap');
const jsstart = document.getElementById('start');
const jscount = document.getElementById('count');
const jsscorecount=document.getElementById('score-count');




// 複数のテキストを格納する配列
const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];

// ランダムなテキストを表示
const createText = () => {

  // 正タイプした文字列をクリア
  jstyped = '';
  typedfield.textContent = jstyped;

  // 配列のインデックス数からランダムな数値を生成する
  let random = Math.floor(Math.random() * textLists.length);

  // 配列からランダムにテキストを取得し画面に表示する
  jsuntyped = textLists[random];
  untypedfield.textContent = jsuntyped;
};



// キー入力の判定
const keyPress = e => {

  // 誤タイプの場合
  if(e.key !== jsuntyped.substring(0, 1)) {
    jswrap.classList.add('mistyped');
    // 100ms後に背景色を元に戻す
    setTimeout(() => {
      jswrap.classList.remove('mistyped');
    }, 100);
    return;
  }

  // 正タイプの場合
 // スコアのインクリメント
 score++;
  jstyped += jsuntyped.substring(0, 1);
  jsuntyped = jsuntyped.substring(1);
  typedfield.textContent = jstyped;
  untypedfield.textContent = jsuntyped;
    increaseScore();

  // テキストがなくなったら新しいテキストを表示
  if(jsuntyped === '') {
    createText();
  }
};

// タイピングスキルのランクを判定
const rankCheck = score => {
 
 // テキストを格納する変数を作る
 let text = '';
  
 // スコアに応じて異なるメッセージを変数textに格納する
 if(score < 100) {
   text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
 }
 else if(score < 200) {
  text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
} else if(score < 300) {
  text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
} else if(score >= 300) {
  text = `あなたのランクはSです。\nおめでとうございます!`;    
}

// 生成したメッセージと一緒に文字列を返す
return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};  

// ゲームを終了
const gameOver = id => {
  clearInterval(id);
  untypedfield.textContent = 'タイムアップ！'; 

  const result = confirm(rankCheck(score));
  // OKボタンをクリックされたらリロードする
  if(result == true) {
    window.location.reload();
  }
};

// カウントダウンタイマー
const timer = () => {
// タイマー部分のHTML要素（p要素）を取得する
let time=jscount.textContent;
const id=setInterval(()=>{
  // カウントダウンする
  time--;
  jscount.textContent=time;
  // カウントが0になったらタイマーを停止する
  if(time <= 0) {
    gameOver(id);
  }
},1000);
};
const timeUp =()=>{untypedfield.textContent = 'タイムアップ！';
setTimeout(timeUp,62000);}
timeUp();




//ゲームスタート時の処理//
jsstart.addEventListener('click',()=>{
 // カウントダウンタイマーを開始する
 timer();

  // ランダムなテキストを表示する 
  createText();
   // 「スタート」ボタンを非表示にする
   jsstart.style.display='none';
   // キーボードのイベント処理
   document.addEventListener('keypress', keyPress);

});
untypedfield.textContent = 'スタートボタンで開始';

// 正しいタイプでスコアを増やす関数
const increaseScore=()=>{ 
  jsscorecount.textContent=score; 
};

