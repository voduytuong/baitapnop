// Imprt Staff from models
import Staff from "./../models/staff.js";

// Imprt PersonnelManagement from models
import PersonnelManagement from "./../models/personnelManagement.js";
const personnelManagement = new PersonnelManagement();

// Imprt Validation from models
import Validation from "./../models/validation.js";
const validation = new Validation();

// Danh sách chức vụ
const LIST_POSITION = ["Sếp", "Trưởng phòng", "Nhân viên"];

const LIST_ERROR_ID = [
  "tbTKNV",
  "tbTen",
  "tbEmail",
  "tbMatKhau",
  "tbNgay",
  "tbLuongCB",
  "tbChucVu",
  "tbGiolam",
];

export function getId(id) {
  return document.getElementById(id);
}

function getInfoStaff(isAdd) {
  //* Dom tới thẻ input lấy value
  const account = getId("tknv").value.trim();
  const fullName = getId("name").value.trim();
  const email = getId("email").value.trim();
  const password = getId("password").value;
  const workingDate = getId("datepicker").value.trim();
  const salary = getId("luongCB").value.trim();
  const position = getId("chucvu").value;
  const workingHours = getId("gioLam").value.trim();

  //* Flag (cờ): boolean
  let isValid = true;

  //* Check validation account
  isValid &=
    validation.checkEmpty(account, "tbTKNV", "(*) Vui lòng nhập tài khoản") &&
    validation.checkAccount(
      account,
      "tbTKNV",
      "(*) Tài khoản phải từ 4 - 6 ký số",
    ) &&
    (!isAdd ||
      validation.checkExistAccount(
        account,
        "tbTKNV",
        "(*) Tài khoản đã tồn tại",
        personnelManagement.arr,
      ));

  //* Check validation name
  isValid &=
    validation.checkEmpty(fullName, "tbTen", "(*) Vui lòng nhập họ tên") &&
    validation.checkCharacterString(
      fullName,
      "tbTen",
      "(*) Họ tên phải là chữ",
    );

  //* Check validation email
  isValid &=
    validation.checkEmpty(email, "tbEmail", "(*) Vui lòng nhập email") &&
    validation.checkEmail(email, "tbEmail", "(*) Email không đúng định dạng");

  //* Check validation password
  isValid &=
    validation.checkEmpty(
      password,
      "tbMatKhau",
      "(*) Vui lòng nhập mật khẩu",
    ) &&
    validation.checkPassword(
      password,
      "tbMatKhau",
      "(*) Mật khẩu từ 6 - 10 ký tự (ít nhất 1 số, 1 chữ in hoa, 1 ký tự đặc biệt)",
    );

  //* Check validation workingDate
  isValid &=
    validation.checkEmpty(
      workingDate,
      "tbNgay",
      "(*) Vui lòng nhập ngày làm",
    ) &&
    validation.checkDate(
      workingDate,
      "tbNgay",
      "(*) Ngày làm không đúng định dạng mm/dd/yyyy",
    );

  //* Check validation salary
  isValid &=
    validation.checkEmpty(
      salary,
      "tbLuongCB",
      "(*) Vui lòng nhập lương cơ bản",
    ) &&
    validation.checkRange(
      salary,
      "tbLuongCB",
      "(*) Lương cơ bản từ 1.000.000 - 20.000.000",
      1000000,
      20000000,
    );

  //* Check validation position
  isValid &= validation.checkPosition(
    position,
    "tbChucVu",
    "(*) Vui lòng chọn chức vụ hợp lệ",
    LIST_POSITION,
  );

  //* Check validation workingHours
  isValid &=
    validation.checkEmpty(
      workingHours,
      "tbGiolam",
      "(*) Vui lòng nhập số giờ làm",
    ) &&
    validation.checkRange(
      workingHours,
      "tbGiolam",
      "(*) Số giờ làm từ 80 - 200 giờ",
      80,
      200,
    );

  if (!isValid) return null;

  //* Tạo đối tượng staff
  const staff = new Staff(
    account,
    fullName,
    email,
    password,
    workingDate,
    Number(salary),
    position,
    Number(workingHours),
    0,
    "",
  );

  //* Tính lương nhân viên
  staff.calcTotalSalary(staff.position);

  //* Tính xếp loại nhân viên
  staff.calcTypeStaff(staff.workingHours);

  return staff;
}

/**
 * 1. Khai báo content rỗng
 * 2. Duyệt qua data
 *      2.1. staff = data[i]
 *      2.2. Tích lũy <tr> <td></td> </tr>
 * 3. Dom tới #tableDanhSach gắn content
 */
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
    <td> ${Number(staff.totalSalary).toLocaleString("vi-VN")} </td>
    <td> ${staff.type} </td>
    <td>
      <button data-toggle="modal" data-target="#myModal" onclick="handleEdit('${staff.account}')" class="btn btn-info"> Edit </button>
      <button onclick="handleDelete('${staff.account}')" class="btn btn-danger"> Delete </button>
    </td>
    </tr>`;
  }

  getId("tableDanhSach").innerHTML = content;
}

function resetForm() {
  getId("tknv").value = "";
  getId("name").value = "";
  getId("email").value = "";
  getId("password").value = "";
  getId("datepicker").value = "";
  getId("luongCB").value = "";
  getId("chucvu").selectedIndex = 0; // "Chọn chức vụ"
  getId("gioLam").value = "";

  for (let i = 0; i < LIST_ERROR_ID.length; i++) {
    getId(LIST_ERROR_ID[i]).innerHTML = "";
    getId(LIST_ERROR_ID[i]).style.display = "none";
  }
}

/**
 ** Lưu danh sách nhân viên xuống localStorage
 */
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
  renderListStaff(personnelManagement.arr);
}

getLocalStorage();

getId("btnThem").onclick = function () {
  //* Dom tới modal title => "Thêm nhân viên"
  getId("header-title").innerHTML = "Thêm Nhân Viên";

  //* Dom tới tài khoản => gỡ disabled
  getId("tknv").disabled = false;

  //* Dom tới nút "Thêm người dùng" => Hiện
  getId("btnThemNV").style.display = "inline-block";

  //* Dom tới nút "Cập nhật" => ẩn
  getId("btnCapNhat").style.display = "none";

  //* reset form
  resetForm();
};

/**
 ** Add Staff
 */
getId("btnThemNV").onclick = function () {
  const staff = getInfoStaff(true);
  if (!staff) return; // có nghĩa là phủ định của null sẽ -> stop

  //* Thêm staff vô danh sách personnelManagement
  personnelManagement.add(staff);

  //* Gọi hàm renderListStaff để hiển thị danh sách
  renderListStaff(personnelManagement.arr);

  //* Gọi hàm setLocalStorge => để lưu data xuống localStorge
  setLocalStorage();

  //* Đóng modal
  $("#myModal").modal("hide");
};

/**
 ** Edit staff
 *  1. onclick handleEdit
 *  2. Mở modal
 *  3. populate data lên từng field của modal
 */
function handleEdit(account) {
  // Cập nhật lại title của modal
  getId("header-title").innerHTML = "Cập Nhật Nhân Viên";

  // Xóa thông báo lỗi cũ
  resetForm();

  // Lấy thông tin chi tiết của nhân viên
  const staff = personnelManagement.getStaffByAccount(account);
  if (staff) {
    // populate ra modal
    getId("tknv").value = staff.account;
    // disabled #tknv (khóa cứng tài khoản lại không cho sửa)
    getId("tknv").disabled = true;

    getId("name").value = staff.fullName;
    getId("email").value = staff.email;
    getId("password").value = staff.password;
    getId("datepicker").value = staff.workingDate;
    getId("luongCB").value = staff.salary;
    getId("chucvu").value = staff.position;
    getId("gioLam").value = staff.workingHours;
  }

  //* Ẩn nút "Thêm người dùng"
  getId("btnThemNV").style.display = "none";

  //* Hiện nút "Cập nhật"
  getId("btnCapNhat").style.display = "inline-block";
}

window.handleEdit = handleEdit;

/**
 * Cập nhật staff
 */
getId("btnCapNhat").onclick = function () {
  // lấy thông tin từ user mới nhất (isAdd = false => không kiểm tra trùng tài khoản)
  const staff = getInfoStaff(false);
  if (!staff) return;

  personnelManagement.updateStaff(staff);

  renderListStaff(personnelManagement.arr);

  setLocalStorage();

  $("#myModal").modal("hide");
};

/**
 * Xóa staff
 */
function handleDelete(account) {
  // Gọi tới phương thức deleteStaff bên PersonnelManagement
  personnelManagement.deleteStaff(account);

  renderListStaff(personnelManagement.arr);

  setLocalStorage();
}
window.handleDelete = handleDelete;

/**
 ** Search staff theo loại (xuất sắc, giỏi, khá, trung bình...)
 */
function handleSearch() {
  const keyword = getId("searchName").value;
  const listSearch = personnelManagement.searchTypeStaff(keyword);
  renderListStaff(listSearch);
}

//! Lắng nghe sự kiện gõ phím trong ô tìm kiếm
getId("searchName").addEventListener("keyup", handleSearch);

//! Lắng nghe sự kiện click vào icon kính lúp
getId("btnTimNV").addEventListener("click", handleSearch);
