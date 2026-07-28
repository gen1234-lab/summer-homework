// ================================
// 夏休み宿題アプリ
// app.js
// ================================

const checkboxes = document.querySelectorAll("input[type='checkbox']");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const stars = document.getElementById("stars");
const finishArea = document.getElementById("finishArea");
const todayTask = document.getElementById("todayTask");

const STORAGE_KEY = "summer-homework-2026";

// ----------------------------
// 保存
// ----------------------------
function saveData() {

    const data = {};

    checkboxes.forEach(box => {
        data[box.id] = box.checked;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

}

// ----------------------------
// 読み込み
// ----------------------------
function loadData() {

    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if(!data) return;

    checkboxes.forEach(box => {

        if(data[box.id] !== undefined){

            box.checked = data[box.id];

        }

    });

}

// ----------------------------
// 星表示
// ----------------------------
function updateStars(done){

    const total = checkboxes.length;

    let text = "";

    for(let i=0;i<done;i++){

        text += "⭐";

    }

    for(let i=done;i<total;i++){

        text += "☆";

    }

    stars.textContent = text;

}

// ----------------------------
// 今日やること
// ----------------------------
function updateToday(){

    const remain = [];

    checkboxes.forEach(box=>{

        if(!box.checked){

            const label = box.parentElement.innerText.trim();

            remain.push(label);

        }

    });

    if(remain.length===0){

        todayTask.innerHTML="🎉 全部おわったよ！";

    }else{

        todayTask.innerHTML=
        "今日はこれをやろう！<br><br><b>" +
        remain[0] +
        "</b>";

    }

}

// ----------------------------
// 進捗更新
// ----------------------------
function updateProgress(){

    const total = checkboxes.length;

    const done =
    [...checkboxes].filter(c=>c.checked).length;

    const percent =
    Math.round(done/total*100);

    progressBar.style.width = percent + "%";

    progressText.textContent =
    `${done} / ${total} 完了 (${percent}%)`;

    updateStars(done);

    updateToday();

    if(done===total){

        finishArea.style.display="block";

        alert("🎉 おめでとう！全部終わったね！");

    }else{

        finishArea.style.display="none";

    }

}

// ----------------------------
// イベント
// ----------------------------
checkboxes.forEach(box=>{

    box.addEventListener("change",()=>{

        saveData();

        updateProgress();

    });

});

// ----------------------------
// 初期化
// ----------------------------
loadData();

updateProgress();
