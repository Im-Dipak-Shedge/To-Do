//always change your images extension to webp
//always change your fonts extension to woff2
//cloud converter website
function deleted(itemIndex) {
  console.log("deleted", itemIndex);
  itemJsonArraystr = localStorage.getItem("itemJson");
  itemJsonArray = JSON.parse(itemJsonArraystr);
  //deleting item index from the array
  itemJsonArray.splice(itemIndex, 1);
  localStorage.setItem("itemJson", JSON.stringify(itemJsonArray));
  update();
}

function getAndUpdate() {
  tit = document.getElementById("title").value;
  desc = document.getElementById("description").value;
  if (localStorage.getItem("itemJson") == null) {
    itemJsonArray = [];
    itemJsonArray.push([tit, desc]);
    localStorage.setItem("itemJson", JSON.stringify(itemJsonArray));
    location.reload();
  } else {
    itemJsonArraystr = localStorage.getItem("itemJson");
    itemJsonArray = JSON.parse(itemJsonArraystr);
    itemJsonArray.push([tit, desc]);
    localStorage.setItem("itemJson", JSON.stringify(itemJsonArray));
    location.reload();
  }

  update();
}

function update() {
  if (localStorage.getItem("itemJson") == null) {
    itemJsonArray = [];
    localStorage.setItem("itemJson", JSON.stringify(itemJsonArray));
    console.log("Item added");
  } else {
    itemJsonArraystr = localStorage.getItem("itemJson");
    itemJsonArray = JSON.parse(itemJsonArraystr);
  }
  // populate the table
  tableBody = document.getElementById("tableBody");
  str = "";
  itemJsonArray.forEach((element, index) => {
    str += `
    <tr class="">
    <th scope="row">${index + 1}</th>
    <td>${element[0]}</td>
    <td>${element[1]}</td>
    <td><button class="btn btn-primary" onclick="deleted(${index})" >Delete</button></td>
  </tr>
    `;
  });
  tableBody.innerHTML = str;
  // tit = document.getElementById("title");
  // desc = document.getElementById("description");
}

function cleared() {
  warning = confirm("Do you really want to clear list?");
  if (warning == true) {
    localStorage.clear();
    update();
  } else {
    return;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  add = document.getElementById("add");
  add.addEventListener("click", getAndUpdate);
  update();

  //search funcationality
  let searchBTN = document.getElementById("searchbtn");
  searchBTN.addEventListener("click", () => {
    let searchInput = document.querySelector(".searchinp").value;
    let searchResult = itemJsonArray.filter((item) =>
      item[0].includes(searchInput)
    );
    console.log(searchResult[0][0]);
    let ths = document.getElementsByTagName("td");

    //removes highlights of the rows
    function clearHighlights() {
      let highlightedElements = document.querySelectorAll(
        ".highlighted, .leftborder, .rightborder"
      );
      highlightedElements.forEach((element) => {
        element.classList.remove("highlighted", "leftborder", "rightborder");
      });
    }
    for (element of ths) {
      if (element.innerText == searchResult[0][0]) {
        clearHighlights();
        let fullrow = element.parentNode;
        fullrow.children[0].classList.add("leftborder");
        fullrow.children[3].classList.add("rightborder");
        for (let i = 0; i <= 3; i++)
          fullrow.children[i].classList.add("highlighted");
      }
    }
  });
});
