let input = document.querySelector("#input");
let addBtn = document.querySelector("#addBtn");
let list = document.querySelector("#list");

let allBtn = document.querySelector("#all");
let doneBtn = document.querySelector("#done");
let notDoneBtn = document.querySelector("#notDone");
let countText = document.querySelector("#count");

let mode = "all";                       // mode 변수 선언 및 초기값 설정
let todos = [];                       // let todos 는 변수선언 = [];는 빈 배열로 만들기

addBtn.addEventListener("click", addTodo);
                         // 화면 렌더링

allBtn.addEventListener("click", () => {
    mode = "all";
    render();
});

doneBtn.addEventListener("click", () => {
    mode = "done";
    render();
});

notDoneBtn.addEventListener("click", () => {
    mode = "notDone";
    render();
});



function addTodo() {
    let text = input.value.trim();     // 변수 선언 trim()은 공백 제거
    if (text === "") return;

    todos.push({
        id: Date.now(),
        text: text,
        done: false
    });

    input.value = "";                  // 입력값 초기화
    render();                          // 화면 렌더링

}

function render() {              // 함수 선언 
    list.innerHTML = "";        // 리스트 초기화

    let filtered = todos;
    let remaining = todos.filter(todo => !todo.done).length;    // 남은 할 일 개수 계산
    countText.textContent = remaining;

    if (mode === "done") filtered = todos.filter(t => t.done);          // mode가 "done"이면 완료된 할 일만 필터링
    else if (mode === "notDone") filtered = todos.filter(t => !t.done);

    filtered.forEach(todo => {                         // 배열의 각 요소에 대해 반복
        let li = document.createElement("li");      // li 요소 생성
        
        let span = document.createElement("span");    // span 요소 생성
        span.textContent = todo.text;

        li.appendChild(span);     // li 요소에 span 요소 추가

        li.addEventListener("click", () => {              // li 요소에 클릭 이벤트 리스너 추가
            todo.done = !todo.done;
            render();
    });  
         let delBtn = document.createElement("button");
         delBtn.textContent = "삭제";

         delBtn.addEventListener("click", (e) => {
         e.stopPropagation();
         todos = todos.filter((t) => t.id !== todo.id);
             render();
    });

    li.appendChild(delBtn);

    if (todo.done) li.classList.add("done");              // todo.done이 true이면 li 요소에 "done" 클래스 추가
    
    list.appendChild(li);                       // li 요소를 리스트에 추가
    });
}


