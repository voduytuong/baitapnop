class PersonnelManagement {
  constructor() {
    this.arr = [];
  }

  add(staff) {
    this.arr.push(staff);
  }

  findEmail(email) {
    let index = -1;
    for (let i = 0; i < this.arr.length; i++) {
      const staff = this.arr[i];
      if (staff.email === email) {
        index = i;
        break;
      }
    }
    return index;
  }

  deleteStaff(email) {
    //* Tìm vị trí email staff cần xóa
    const index = this.findEmail(email);

    //* Xóa nhân viên ở vị trí tìm thấy
    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  }

  updateStaff(staff) {
    //* Tìm vị trí email staff cần cập nhật
    const index = this.findEmail(staff.email);

    //* Cập nhật nhân viên
    if (index !== -1) {
      this.arr[index] = staff;
    }
  }

  // filterStaff(type) {}

  searchTypeStaff(keyword) {
    //* Tạo mảng mới
    let listTypeStaff = [];

    //* Duyệt mảng
    for (let i = 0; i < this.arr.length; i++) {
      let staff = this.arr[i];

      //* Convert staff.type => lowercase
      const staffTypeLowerCase = staff.type.toLowerCase();

      //* Convert staff.type => lowercase
      const staffKeyLowerCase = keyword.toLowerCase();

      if (staffTypeLowerCase.includes(staffKeyLowerCase)) {
        listTypeStaff.push(staff);
      }
    }
    return listTypeStaff;
  }
}

export default PersonnelManagement;
