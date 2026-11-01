function tinhDiemUuTien(khuVuc, doiTuong) {
  let diemKhuVuc = 0;
  let diemDoiTuong = 0;

  if (khuVuc === "A") {
    diemKhuVuc = 2;
  } else if (khuVuc === "B") {
    diemKhuVuc = 1;
  } else if (khuVuc === "C") {
    diemKhuVuc = 0.5;
  } else if (khuVuc === "X") {
    diemKhuVuc = 0;
  }

  if (doiTuong === 1) {
    diemDoiTuong = 2.5;
  } else if (doiTuong === 2) {
    diemDoiTuong = 1.5;
  } else if (doiTuong === 3) {
    diemDoiTuong = 1;
  } else if (doiTuong === 0) {
    diemDoiTuong = 0;
  }

  return diemKhuVuc + diemDoiTuong;
}

function tongDiem(diemMon1, diemMon2, diemMon3, khuVuc, doiTuong) {
  const diemUuTien = tinhDiemUuTien(khuVuc, doiTuong);
  return diemMon1 + diemMon2 + diemMon3 + diemUuTien;
}

function xetDiemKhac0(diemMon1, diemMon2, diemMon3) {
  if (diemMon1 === 0 || diemMon2 === 0 || diemMon3 === 0) {
    return true;
  }
  return false;
}

document.getElementById("btnXetTuyen").onclick = function () {
  const diemChuan = document.getElementById("diemChuan").value * 1;
  const diemMon1 = parseFloat(document.getElementById("diemMon1").value);
  const diemMon2 = parseFloat(document.getElementById("diemMon2").value);
  const diemMon3 = parseFloat(document.getElementById("diemMon3").value);
  const khuVuc = document.getElementById("khuVuc").value;
  const doiTuong = document.getElementById("doiTuong").value * 1;

  let content = "";
  const diemTongKet = tongDiem(diemMon1, diemMon2, diemMon3, khuVuc, doiTuong);

  if (diemTongKet >= diemChuan) {
    if (xetDiemKhac0(diemMon1, diemMon2, diemMon3) === true) {
      content = `Bạn đã rớt, tổng điểm là: ${diemTongKet} nhưng môn có điểm bằng 0`;
    } else {
      content = `Bạn đã đậu, tổng điểm là: ${diemTongKet}`;
    }
  } else {
    content = `Bạn đã rớt vì thấp điểm hơn điểm chuẩn, tổng điểm là: ${diemTongKet}`;
  }
  document.getElementById("pThongBao").innerHTML = content;
};
