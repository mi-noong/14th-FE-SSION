let input = document.querySelector("#input");
let addBtn = document.querySelector("#addBtn");
let list = document.querySelector("#list");

let allBtn = document.querySelector("#all");
let doneBtn = document.querySelector("#done");
let notDoneBtn = document.querySelector("#notDone");

// HTML의 ID인 "completeAll"과 "count"에 맞춰 수정했습니다.
let completeAllBtn = document.querySelector("#completeAll");
let countText = document.querySelector("#count b"); // b 태그 안의 숫자만 바꾸기 위해

let mode = "all";
let todos = [];

// 버튼 클릭 시 activ 클래스를 관리하는 함수.
function changeActiveTab(targetBtn){
    //1. 모든 필터 버튼에서 'active' 클래스 제거
    allBtn.classList.remove("active");
    doneBtn.classList.remove("active");
    notDoneBtn.classList.remove("active");

    //2. 클릭된 버튼에만 'active'클래스 추가. 
    targetBtn.classList.add("active");
}

// 필터 버튼 이벤트
allBtn.addEventListener("click", function() {
    mode = "all";
    changeActiveTab(allBtn);
    render();
});

doneBtn.addEventListener("click", function() {
    mode = "done";
    changeActiveTab(doneBtn);
    render();
});

notDoneBtn.addEventListener("click", function() {
    mode = "notDone";
    changeActiveTab(notDoneBtn);
    render();
});



// 전체 완료 버튼
completeAllBtn.addEventListener("click", function() {
    todos.forEach(function(todo) {
        todo.done = true;
    });
    render();
});

// 추가 버튼 클릭 및 엔터 키 지원
addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        addTodo();
    }
});

function addTodo() {
    let text = input.value.trim();
    if (text === "") return;

    todos.push({
        text: text,
        done: false
    });

    mode = "all"; // 새 할 일을 추가하면 '전체' 목록으로 이동
    input.value = "";
    input.focus(); // 입력창에 다시 커서 깜빡이게 하기
    render();
}

function render() {
    list.innerHTML = '';

    // 남은 할 일 개수 업데이트
    let remaining = todos.filter(t => !t.done).length;
    countText.textContent = remaining;

    // 필터링 처리
    let filtered = todos;
    if (mode === "done") {
        filtered = todos.filter(t => t.done);
    } else if (mode === "notDone") {
        filtered = todos.filter(t => !t.done);
    }

    // index 번호와 함께 가져와서 삭제 할때 이용.
    filtered.forEach(function(todo, index) {
        let li = document.createElement('li');
        
        //checkbox
        let check = document.createElement("div");
        check.className = `check ${todo.done ? "checked" : ""}`;

        check.addEventListener('click', function() {
            todo.done = !todo.done;
            render();
        });

        let span = document.createElement("span");
        span.textContent = todo.text;

        if (todo.done) {
            li.classList.add('done');
        }

        //new => 삭제 버튼
        let delBtn = document.createElement("button");
        delBtn.textContent = "삭제";

        delBtn.addEventListener("click", function(e){
            //이벤트 전파 방지 (li 클릭 이벤트가 실행되지 않게)
            e.stopPropagation();

            //배열에 해당 아이템 삭제.
            const delIndex = todos.indexOf(todo);
            todos.splice(delIndex,1);
            //splice(시작위치, 삭제할 갯수): 배열의 요소를 삭제하는 명령어.

            render();
        })
        li.append(check, span, delBtn); // check와 span을 동시에 추가
        list.appendChild(li);
    });
}