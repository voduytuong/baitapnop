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

  calcTotalSalary(position) {
    if (position === "Sếp") {
      this.salary *= 3;
    } else if (position === "Trưởng phòng") {
      this.salary *= 2;
    } else if (position === "Nhân viên") {
      this.salary *= 1;
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
