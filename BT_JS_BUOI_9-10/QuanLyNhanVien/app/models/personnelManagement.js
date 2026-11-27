class PersonnelManagement {
  constructor() {
    this.arr = [];
  }

  add(staff) {
    this.arr.push(staff);
  }

  /**
   * 1. Tạo biến index = -1
   * 2. Duyệt mảng
   *  2.1. Lấy staff = arr[i]
   *  2.2. Nếu account trùng với staff.account
   *    => true => Cập nhật lại index = i
   *        => break // dừng vòng lặp
   * 3. Trả về index
   */
  findAccount(account) {
    let index = -1;
    for (let i = 0; i < this.arr.length; i++) {
      const staff = this.arr[i];
      if (staff.account === account) {
        index = i;
        break; // dừng vòng lặp
      }
    }
    return index;
  }

  deleteStaff(account) {
    //* Tìm vị trí tài khoản staff cần xóa
    const index = this.findAccount(account);

    //* Xóa nhân viên ở vị trí tìm thấy
    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  }

  getStaffByAccount(account) {
    const index = this.findAccount(account);
    if (index !== -1) {
      return this.arr[index];
    }
    return null;
  }

  updateStaff(staff) {
    //* Tìm vị trí tài khoản staff cần cập nhật
    const index = this.findAccount(staff.account);

    //* Cập nhật nhân viên
    if (index !== -1) {
      this.arr[index] = staff;
    }
  }

  /**
   *  1. Tạo mảng mới listTypeStaff = []
   *  2. Duyệt mảng
   *    2.1. Lấy staff = this.arr[i]
   *    2.2. Nếu staff.type có chứa keyword (không phân biệt hoa/thường)
   *        => true => 2.3. Thêm staff vô listTypeStaff
   *  3. Trả về listTypeStaff
   */
  searchTypeStaff(keyword) {
    //* Tạo mảng mới
    let listTypeStaff = [];

    //* Convert keyword => lowercase (bỏ khoảng trắng 2 đầu)
    const staffKeyLowerCase = keyword.trim().toLowerCase();

    //* Duyệt mảng
    for (let i = 0; i < this.arr.length; i++) {
      let staff = this.arr[i];

      //* Convert staff.type => lowercase
      const staffTypeLowerCase = staff.type.toLowerCase();

      if (staffTypeLowerCase.includes(staffKeyLowerCase)) {
        listTypeStaff.push(staff);
      }
    }
    return listTypeStaff;
  }
}

export default PersonnelManagement;
