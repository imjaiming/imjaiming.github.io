let myBut = document.querySelector("form button");
let myList = document.querySelector("section");

myBut.addEventListener("click", (e) => {
  e.preventDefault();

  // get the input value
  let form = e.target.parentElement;
  let text = form.children[0].value;
  let month = form.children[1].value;
  let date = form.children[2].value;
  let time = month + " / " + date;

  // 清空 form 裡面的 input
  form.children[0].value = " ";

  // input 不可是空白
  if (text.length == 1) {
    alert("請輸入完整資訊 ! ");
    return;
  }

  // 生成 text & date
  let todo = document.createElement("div");
  myList.appendChild(todo);
  todo.classList.add("todo");
  let box1 = document.createElement("div");
  box1.classList.add("left");
  todo.appendChild(box1);
  let box2 = document.createElement("div");
  box2.classList.add("right");
  todo.appendChild(box2);
  let myText = document.createElement("p");
  myText.classList.add("text");
  myText.innerText = text;
  box1.appendChild(myText);
  let myTime = document.createElement("p");
  myTime.classList.add("date");
  myTime.innerText = time;
  box2.appendChild(myTime);

  // 生成 icon
  let check = document.createElement("i");
  box2.appendChild(check);
  check.classList.add("fa-solid");
  check.classList.add("fa-check");
  let trashCan = document.createElement("i");
  box2.appendChild(trashCan);
  trashCan.classList.add("fa-solid");
  trashCan.classList.add("fa-trash-can");

  // 生成動畫
  todo.style = "animation:jump 0.3s forwards;";

  // done element
  check.addEventListener("click", (e) => {
    let done = e.target.parentElement.parentElement;
    done.classList.toggle("done");
  });
  // delete element
  trashCan.addEventListener("click", (e) => {
    let del = e.target.parentElement.parentElement;
    del.style = "animation:jump2 0.3s forwards;";
    del.addEventListener("animationend", (e) => {
      // 連同 localStorage 一起刪除
      /// myList_data_arr 是後面才會放入 localstorage 所以要先 let 才能用
      let myList_data_arr = JSON.parse(localStorage.getItem("list"));
      myList_data_arr.forEach((item, index) => {
        if (text == item.text) {
          myList_data_arr.splice(index, 1);
          localStorage.setItem("list", JSON.stringify(myList_data_arr));
        } else {
          console.log(item.text);
          console.log(text);
        }
      });
      del.remove();
    });
  });

  // store data into an array object
  let myTodo_data = {
    text: text,
    month: month,
    date: date,
  };

  let myList_data = localStorage.getItem("list");
  if (myList_data == null) {
    // 把上面新增的 object 以 array 的資料型態放進去
    localStorage.setItem("list", JSON.stringify([myTodo_data]));
  } else {
    // 因為 stringify 進去時候是 array，所以 parse 出來也是 array
    let myList_data_arr = JSON.parse(myList_data);
    // 故可以使用 .push() 來新增新的 myTodo_data
    myList_data_arr.push(myTodo_data);
    // 最後再把最 myList_data_array 覆蓋過去舊的 storage
    localStorage.setItem("list", JSON.stringify(myList_data_arr));
  }
});

lodeData();

function lodeData() {
  // 瀏覽器打開時，將原本 localstorage 裡面的東西顯示出來
  // 因為不需要按按鈕所以在最外層編寫
  let myList_data = localStorage.getItem("list");
  if (myList_data !== null) {
    let myList_data_arr = JSON.parse(myList_data);
    myList_data_arr.forEach((item) => {
      // get the localstorage value
      let text = item.text;
      let month = item.month;
      let date = item.date;
      let time = month + " / " + date;

      // 還原 done 在

      // 生成 text & date
      let todo = document.createElement("div");
      myList.appendChild(todo);
      todo.classList.add("todo");
      let box1 = document.createElement("div");
      box1.classList.add("left");
      todo.appendChild(box1);
      let box2 = document.createElement("div");
      box2.classList.add("right");
      todo.appendChild(box2);
      let myText = document.createElement("p");
      myText.classList.add("text");
      myText.innerText = text;
      box1.appendChild(myText);
      let myTime = document.createElement("p");
      myTime.classList.add("date");
      myTime.innerText = time;
      box2.appendChild(myTime);

      // 生成 icon
      let check = document.createElement("i");
      box2.appendChild(check);
      check.classList.add("fa-solid");
      check.classList.add("fa-check");
      let trashCan = document.createElement("i");
      box2.appendChild(trashCan);
      trashCan.classList.add("fa-solid");
      trashCan.classList.add("fa-trash-can");

      // 生成動畫
      todo.style = "animation:jump 0.3s forwards;";

      // done element
      check.addEventListener("click", (e) => {
        let done = e.target.parentElement.parentElement;
        done.classList.toggle("done");
      });

      // delete element
      trashCan.addEventListener("click", (e) => {
        let del = e.target.parentElement.parentElement;
        del.style = "animation:jump2 0.3s forwards;";
        del.addEventListener("animationend", (e) => {
          // 連同 localStorage 一起刪除
          myList_data_arr.forEach((item, index) => {
            if (text == item.text) {
              myList_data_arr.splice(index, 1);
              localStorage.setItem("list", JSON.stringify(myList_data_arr));
            }
          });
          del.remove();
        });
      });
    });
  }
}

// bubble soft
function soft(arr1, arr2) {
  let i = 0;
  let j = 0;
  let result = [];

  while (i < arr1.length && j < arr2.length) {
    if (Number(arr1[i].month) > Number(arr2[j].month)) {
      result.push(arr2[j]);
      j++;
    } else if (Number(arr1[i].month) < Number(arr2[j].month)) {
      result.push(arr1[i]);
      i++;
    } else if (Number(arr1[i].month) == Number(arr2[j].month)) {
      if (Number(arr1[i].date) > Number(arr2[j].date)) {
        result.push(arr2[j]);
        j++;
      } else {
        result.push(arr1[i]);
        i++;
      }
    }
  }

  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }
  return result;
}

// merge soft
function merge(arr) {
  if (arr.length === 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
    return soft(merge(left), merge(right));
  }
}

// console.log(merge(JSON.parse(localStorage.getItem("list"))));

// soft button
let softButton = document.querySelector("button.soft");
softButton.addEventListener("click", (e) => {
  // 重置 list
  let softList = merge(JSON.parse(localStorage.getItem("list")));
  localStorage.setItem("list", JSON.stringify(softList));

  // 刪除再生成- > 省掉 F5 刷新的麻煩
  // 刪除
  let len = myList.children.length;
  for (let i = 0; i < len; i++) {
    // 當 childen 裡面的 [0] 被刪除時，所有 childen 都會被刪除
    myList.children[0].remove();
  }
  // 再生
  lodeData();
});
