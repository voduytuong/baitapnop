class Staff {
  constructor(
    account,
    fullName,
    email,
    password,
    workDate,
    salary,
    position,
    workingHours,
    totalSalary,
    type,
  ) {
    this.account = account; // string
    this.fullName = fullName; // string
    this.email = email; // string
    this.password = password; // string
    this.workingDate = workDate; // date
    this.salary = salary; // number
    this.position = position; // string (Chức vụ)
    this.workingHours = workingHours; // number
    this.totalSalary = totalSalary; // number
    this.type = type; // string
  }

  calcTotalSalary() {
    if (this.position === "Sếp") {
      this.totalSalary = this.salary * 3;
    } else if (this.position === "Trưởng phòng") {
      this.totalSalary = this.salary * 2;
    } else if (this.position === "Nhân viên") {
      this.totalSalary = this.salary * 1;
    } else {
      this.totalSalary = 0;
    }
  }

  calcTypeStaff(workingHours) {
    if (workingHours > 0 && workingHours < 160) {
      this.type = "nhân viên trung bình";
    } else if (workingHours >= 160 && workingHours < 176) {
      this.type = "nhân viên khá";
    } else if (workingHours >= 176 && workingHours < 192) {
      this.type = "nhân viên giỏi";
    } else if (workingHours >= 192) {
      this.type = "nhân viên xuất sắc";
    }
  }
}

export default Staff;
