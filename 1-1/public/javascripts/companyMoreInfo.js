
$(function(){
  
  const idInput = $("#_id");
  const nameInput= $("#name");
  const registrationNumberInput = $("#registrationNumber");
  const provinceInput = $("#province");
  const cityInput = $("#city");
  const registrationDateInput = $("#registrationDate");
  const phoneNumberInput = $("#phone_number");
  const companyId = window.location.search.split("=")[1];

  (async()=>{
    try {
      //get data of target company
      const responsebject = await fetch(
        `http://localhost:4000/company/${companyId}`
      );
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
      phoneNumberInput.val(targetCompany.phone_number);
    } catch (error) {
        console.log(error);
    }
  
  })()
 
  
  //update button action
  $("#update_btn").on("click", async (e) => {
    try {
             let updateBody = {
               _id: companyId,
               name: nameInput.val(),
               registration_number: registrationNumberInput.val(),
               province: provinceInput.val(),
               city: cityInput.val(),
               phone_number: phoneNumberInput.val(),
             };
             const patchResponseObject = await fetch(
               "http://localhost:4000/company",
               {
                 method: "PATCH",
                 headers: {
                   "Content-Type": "application/json",
                 },
                 body: JSON.stringify(updateBody),
               }
             );
             const updatedCompany = await patchResponseObject.json();
             console.log(updatedCompany);
    } catch (error) {
        console.log(error);
    }
           
    })

    $("#delete_btn").on("click", async () => {
      const responseObject = await fetch("http://localhost:4000/company", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({_id: companyId})
      }); 
      const deletedCompany = await responseObject.json();
      console.log(deletedCompany);
        setTimeout(() => {
          window.location.href = "http://localhost:4000/companies-list";
        }, 200);
    });


});

function convertDateToyymmdd(dateStr) {
  const date = new Date(dateStr);
  const year = date.getUTCFullYear();
  const month = ("0" + (date.getUTCMonth() + 1)).slice(-2); // add leading zero if month is single digit
  const day = ("0" + date.getUTCDate()).slice(-2); // add leading zero if day is single digit
  const yymmdd = `${year}-${month}-${day}`;
  return yymmdd;
}