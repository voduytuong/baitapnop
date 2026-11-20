import { getId } from "./../controllers/main.js";

class Validation {
  checkEmpty(value, divId, message) {
    if (value.length >= 4 && value.length <= 6) {
      //! Hợp lệ
      getId(divId).innerHTML = "";
      getId(divId).style.display = "none";
      return true;
    }
    //! Không hợp lệ
    getId(divId).innerHTML = message;
    getId(divId).style.display = "block";
    return false;
  }

  checkCharacterString(value, divId, message) {
    const letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letter)) {
      //! Hợp lệ
      getId(divId).innerHTML = "";
      getId(divId).style.display = "none";
      return true;
    }
    //! Không hợp lệ
    getId(divId).innerHTML = message;
    getId(divId).style.display = "block";
    return false;
  }

  checkExistId(value, divId, message, data) {
    let exist = false;

    for (let i = 0; i < data.length; i++) {
      let item = data[i];

      if (item.email === value) {
        exist = true;
        break;
      }
    }

    if (exist) {
      //! Không hợp lệ
      getId(divId).innerHTML = message;
      getId(divId).style.display = "block";
      return false;
    }

    //! Hợp lệ
    getId(divId).innerHTML = "";
    getId(divId).style.display = "none";
    return true;
  }
}

export default Validation;
