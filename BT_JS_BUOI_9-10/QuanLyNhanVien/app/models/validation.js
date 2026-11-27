import { getId } from "./../controllers/main.js";

class Validation {
  //* Hiện thông báo lỗi
  showError(divId, message) {
    getId(divId).innerHTML = message;
    getId(divId).style.display = "block";
    return false;
  }

  //* Ẩn thông báo lỗi
  hideError(divId) {
    getId(divId).innerHTML = "";
    getId(divId).style.display = "none";
    return true;
  }

  //* Không để trống
  checkEmpty(value, divId, message) {
    if (value.trim() === "") {
      //! Không hợp lệ
      return this.showError(divId, message);
    }
    //! Hợp lệ
    return this.hideError(divId);
  }

  //* Tài khoản: 4 - 6 ký số
  checkAccount(value, divId, message) {
    const pattern = /^\d{4,6}$/;
    if (pattern.test(value)) {
      //! Hợp lệ
      return this.hideError(divId);
    }
    //! Không hợp lệ
    return this.showError(divId, message);
  }

  //* Tên nhân viên phải là chữ
  checkCharacterString(value, divId, message) {
    const letter =
      "^[a-zA-ZÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỂưăạảấầẩẫậắằẳẵặẹẻẽềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.trim() !== "" && value.match(letter)) {
      //! Hợp lệ
      return this.hideError(divId);
    }
    //! Không hợp lệ
    return this.showError(divId, message);
  }

  //* Email đúng định dạng
  checkEmail(value, divId, message) {
    const pattern =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
    if (pattern.test(value)) {
      //! Hợp lệ
      return this.hideError(divId);
    }
    //! Không hợp lệ
    return this.showError(divId, message);
  }

  /**
   * Mật khẩu: 6 - 10 ký tự, không có khoảng trắng, chứa ít nhất
   *  - 1 ký tự số         (?=.*\d)
   *  - 1 ký tự in hoa     (?=.*[A-Z])
   *  - 1 ký tự đặc biệt   (?=.*[^A-Za-z0-9\s])
   */
  checkPassword(value, divId, message) {
    const pattern = /^(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9\s])\S{6,10}$/;
    if (pattern.test(value)) {
      //! Hợp lệ
      return this.hideError(divId);
    }
    //! Không hợp lệ
    return this.showError(divId, message);
  }

  /**
   * Ngày làm: định dạng mm/dd/yyyy và phải là ngày có thật
   *  1. Kiểm tra định dạng bằng regex
   *  2. Tạo Date từ mm, dd, yyyy => so sánh lại với giá trị gốc
   *     (VD: 02/31/2023 => Date tự nhảy sang 03/03 => không khớp => sai)
   */
  checkDate(value, divId, message) {
    const pattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(\d{4})$/;
    const match = value.match(pattern);

    if (match) {
      const month = Number(match[1]);
      const day = Number(match[2]);
      const year = Number(match[3]);
      const date = new Date(year, month - 1, day);

      if (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      ) {
        //! Hợp lệ
        return this.hideError(divId);
      }
    }
    //! Không hợp lệ
    return this.showError(divId, message);
  }

  //* Giá trị phải là số và nằm trong khoảng [min, max]
  checkRange(value, divId, message, min, max) {
    const pattern = /^\d+(\.\d+)?$/;
    if (pattern.test(value.trim())) {
      const number = Number(value);
      if (number >= min && number <= max) {
        //! Hợp lệ
        return this.hideError(divId);
      }
    }
    //! Không hợp lệ
    return this.showError(divId, message);
  }

  //* Chức vụ phải nằm trong danh sách hợp lệ
  checkPosition(value, divId, message, listPosition) {
    if (listPosition.includes(value)) {
      //! Hợp lệ
      return this.hideError(divId);
    }
    //! Không hợp lệ
    return this.showError(divId, message);
  }

  /**
   *  Tìm xđ tài khoản tồn tại/k tồn tại
   *    1. Tạo flag exist = false
   *    2. Duyệt mảng
   *        2.1. Lấy item = data[i]
   *        2.2. Nếu item.account trùng với value
   *            => true => 2.3. Cập nhật lại exist = true; break
   *
   *  show/hide câu thông báo => return true/ false
   */
  checkExistAccount(value, divId, message, data) {
    let exist = false;

    for (let i = 0; i < data.length; i++) {
      let item = data[i];

      if (item.account === value) {
        exist = true;
        break;
      }
    }

    if (exist) {
      //! Không hợp lệ
      return this.showError(divId, message);
    }

    //! Hợp lệ
    return this.hideError(divId);
  }
}

export default Validation;
