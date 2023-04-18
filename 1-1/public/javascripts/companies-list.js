$(() => {
  const creationModal = $("#creationModal");
  const creationModalSubmitButton = $("#creationModal-submitButton");
  const creationModalCloseButton = $("#creationModal-CloseButton");

  const creationModal_nameInput = $("#creationModal-nameInput");
  const creationModal_registrationNumberInput = $("#creationModal-registrationNumberInput");
  const creationModal_provinceInput = $("#creationModal-provinceInput");
  const creationModal_cityInput = $("#creationModal-cityInput");
  const creationModal_phoneInput = $("#creationModal-phoneInput");
  (async()=>{
    
    try {
      //get all companies with fetch
      const responseObject = await fetch("http://localhost:4000/company", {});
      const allCompanies = await responseObject.json();
      //sort companies based on registration_number
      allCompanies.sort(function (a, b) {
        return a.registration_number.localeCompare(
          b.registration_number,
          "en",
          {
            sensitivity: "base",
          }
        );
      });

      for (let i = 0; i < allCompanies.length; i++) {
        $("tbody").append(
          `
                <tr>
                <th scope="row">${i + 1}</th>
                <td>${allCompanies[i].name}</td>
                <td>${allCompanies[i].province}</td>
                <td>${convertDateToyymmdd(
                  allCompanies[i].registrationDate
                )}</td>
                <td><button onclick="HandleMoreInfoButtonOnClick('${
                  allCompanies[i]._id
                }')" type="button" class="btn btn-primary">More Info</button></td>
                </tr>
                `
        );
        this.HandleMoreInfoButtonOnClick = (id) => {
          window.location.href = `http://localhost:4000/companyMoreInfo?id=${id}`;
        };
      }
    } catch (error) {
      console.log(error);
    }
  })()

  creationModalSubmitButton.on("click",async(e)=>{
    const newCompany = {
      name: creationModal_nameInput.val(),
      registration_number: creationModal_registrationNumberInput.val(),
      province: creationModal_provinceInput.val(),
      city: creationModal_cityInput.val(),
      phone_number: [creationModal_phoneInput.val()]
    };

    const responseObject = await fetch("http://localhost:4000/company", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(newCompany),
    });
    const createdCompany = await responseObject.json();
    console.log(responseObject);
    if(responseObject.status===201){
       setTimeout(() => {
         window.location.reload();
       }, 200);
    }
    
   
    

  })

})


function convertDateToyymmdd(dateStr) {
  const date = new Date(dateStr);
  const year = date.getUTCFullYear();
  const month = ("0" + (date.getUTCMonth() + 1)).slice(-2); // add leading zero if month is single digit
  const day = ("0" + date.getUTCDate()).slice(-2); // add leading zero if day is single digit
  const yymmdd = `${year}-${month}-${day}`;
  return yymmdd;
}