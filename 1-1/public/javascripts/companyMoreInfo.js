$(async function(){
  try {
  const idInput = $("#_id");
  const nameInput= $("#name");
  const registrationNumberInput = $("#registrationNumber");
  const provinceInput = $("#province");
  const cityInput = $("#city");
  const registrationDateInput = $("#registrationDate");
  const phoneNumberInput = $("#phone_number");
  
  
  //get data of target company
  const companyId = window.location.search.split("=")[1];
  const responsebject = await fetch(`http://localhost:4000/company/${companyId}`);
  const targetCompany = await responsebject.json();
  //filling inputs with targetCompany data
  idInput.val(targetCompany._id);
  nameInput.val(targetCompany.name);
  registrationNumberInput.val(targetCompany.registration_number);
  registrationDateInput.val(
    convertDateToyymmdd(targetCompany.registrationDate)
  );
  provinceInput.val(targetCompany.province);
  cityInput.val(targetCompany.city);
  phoneNumberInput.val(targetCompany.phone_number)
console.log(targetCompany);



  } catch (error) {
    console.log(error);
  }

});

function convertDateToyymmdd(dateStr) {
  const date = new Date(dateStr);
  const year = date.getUTCFullYear();
  const month = ("0" + (date.getUTCMonth() + 1)).slice(-2); // add leading zero if month is single digit
  const day = ("0" + date.getUTCDate()).slice(-2); // add leading zero if day is single digit
  const yymmdd = `${year}-${month}-${day}`;
  return yymmdd;
}