// Imprt Staff from models
import Staff from "./../models/personnelManagement.js";

// Imprt PersonnelManagement from models
import PersonnelManagement from "./../models/personnelManagement.js";
const personnelManagement = new PersonnelManagement();

// Imprt Validation from models
import Validation from "./../models/validation.js";
const validation = new Validation();

export function getId(id) {
  return document.getElementById(id);
}

function getInfoStaff() {
  //* Dom tới thẻ input lấy value
  const account = getId("tknv").value;
  const fullName = getId("name").value;
  const email = getId("email").value;
  const password = getId("password").value;
  const workingDate = getId("datepicker").value;
  const salary = getId("luongCB").value;
  const position = getId("chucvu").value;
  const workingHours = getId("gioLam").value;
  const totalSalary = getId("").value;
  const type = getId("").value;

  //* Flag (cờ): boolean
  // let isValid = true;

  // if (!isValid) return null;

  //* Tạo đối tượng staff từ lớp đối tượng Staff
  const staff = new Staff(
    account,
    fullName,
    email,
    password,
    workingDate,
    salary,
    position,
    workingHours,
    totalSalary,
    type,
  );

  //* Tính lương nhân viên
  staff.calcTotalSalary(staff.position);

  //* Tính xếp loại nhân viên
  staff.calcTypeStaff(staff.workingHours);
}

function renderListStaff(data) {
  let content = "";
  for (let i = 0; i < data.length; i++) {
    const staff = data[i];
    content += `<tr>
    <td> ${staff.account} </td>
    <td> ${staff.fullName} </td>
    <td> ${staff.email} </td>
    <td> ${staff.workingDate} </td>
    <td> ${staff.position} </td>
    <td> ${staff.totalSalary} </td>
    <td> ${staff.type} </td>
    <td>
      <button data-toggle="modal" data-target="#exampleModal" onclick="handleEdit('${staff.email}')" class="btn btn-info"> Edit </button>
      <button onclick="handleDelete('${staff.email}')" class="btn btn-danger"> Delete </button>
    </td>
    </tr>`;
  }

  getId("tableDanhSach").innerHTML = content;
}

function setLocalStorage() {
  //* convert restaurant.arr => string
  const dataString = JSON.stringify(personnelManagement.arr);
  //* Lưu xuống localStorage
  localStorage.setItem("LIST_STAFF", dataString);
}

function getLocalStorage() {
  const dataString = localStorage.getItem("LIST_STAFF");
  //* Nếu chưa có dữ liệu thì dừng
  if (!dataString) return;
  //* convert string => json
  personnelManagement.arr = JSON.parse(dataString);
  renderListFood(personnelManagement.arr);
}

getLocalStorage();

/**
 ** Add Staff
 */
getId("btnThem").onclick = function () {
  const staff = getInfoStaff();
  if (!food) return; // có nghĩa là phủ định của null sẽ -> stop

  //* Thêm food vô danh sách Restaurant
  personnelManagement.add(staff);
  console.log(personnelManagement.arr);

  //* Gọi hàm renderListFood để hiển thị danh sách
  renderListFood(personnelManagement.arr);

  //* Gọi hàm setLocalStorge => để lưu data xuống localStorge
  setLocalStorage();
};

/**
 ** Filter Staff
 */
getId("searchName").addEventListener("keyup", function () {
  const keyword = getId("searchName").value;
  const listSearch = personnelManagement.searchTypeStaff(keyword);
  renderListStaff(listSearch);
});
