const btnCalculate = document.getElementById("btnCalculate");
btnCalculate.onclick = function () {
  // Dom tới thẻ #SALARY lấy value
  // Dom tới thẻ #workingDays lấy value

  const salary = document.getElementById("salary").value;
  const workingDays = document.getElementById("workingDays").value;

  let totalSalary = 0;
  totalSalary = salary * workingDays;

  //& convert vnd
  const FORMATTER = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  totalSalary = FORMATTER.format(totalSalary);

  const result = "Tổng tiền lương nhân viên là: " + totalSalary;
  const pNotice = document.getElementById("pNotice");
  pNotice.innerHTML = result;

  // style cho thẻ #pNotice
  pNotice.style.backgroundColor = "red";
  pNotice.style.color = "white";
  pNotice.style.textAlign = "center";
  pNotice.style.fontSize = "50px";
  pNotice.className = "info test";
};