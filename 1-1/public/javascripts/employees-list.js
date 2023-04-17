
$(async() => {

  const creationModal = $("#creationModal");
  const creationModalSubmitButton = $("#creationModal-submitButton");
  const creationModalCloseButton = $("#creationModal-CloseButton");

  const creationModalFirstnameINput = $("#creationModal-fnameInput");
  const creationModalLastnameINput = $("#creationModal-lnameInput");
  const creationModalGenderINput = $("#creationModal-genderInput");
  const creationModalBirthdayINput = $("#creationModal-birthdayInput");
  const creationModalProvinceINput = $("#creationModal-provinceInput");
  const creationModalRoleINput = $("#creationModal-roleInput");
  const creationModalCompanyINput = $("#creationModal-companyInput");
  const creationModalPhonenumberINput = $("#creationModal-phoneInput");
  const creationModalNationalcodeINput = $("#creationModal-nationalcodeInput");

  //get companies from Company collection and append them to Creational company input
  const responseObject = await fetch("http://localhost:4000/company");
  const allCompanies =await responseObject.json();
  for(let i=0;i<allCompanies.length;i++){
    creationModalCompanyINput.append(
      `
      <option value="${allCompanies[i]._id}">${allCompanies[i].name}</option>

      `
    );
  }

  //get all Employees by AJAX 
    $.ajax({
      url: "http://localhost:4000/employee",
      success: function (data) {
        //sort by lastname
        data.sort(function (a, b) {
          return a.last_name.localeCompare(b.last_name, "en", {
            sensitivity: "base",
          });
        });
        

        for (let i = 0; i < data.length; i++) {
          // Calculate the age of each employee
          const currentYear = new Date().getFullYear();
          const birthYear = new Date(data[i].birthday).getFullYear();
          const age = Math.abs(currentYear - birthYear);


          $("tbody").append(
            `
                <tr>
                <th scope="row">${i + 1}</th>
                <td>${data[i].first_name}</td>
                <td>${data[i].last_name}</td>
                <td>${data[i].gender}</td>
                <td>${age}</td>
                <td>${data[i].company.name}</td>
                <td>${data[i].province}</td>
                <td><button onclick="HandleMoreInfoButtonOnClick('${
                  data[i]._id
                }')" type="button" class="btn btn-primary">More Info</button></td>
                </tr>
                `
          );
        }
      },
    });
    this.HandleMoreInfoButtonOnClick = (id) => {
      window.location.href = `http://localhost:4000/more-info?id=${id}`;
    };
  
  creationModalSubmitButton.on("click",async()=>{
      
    try {
      //client-Side validation
      
      //empty required fields
      if(!creationModalFirstnameINput.val()?.trim()){
        alert("first name is required")
        return console.log({ message: "first name  is required", status: 400 });
      }

       if (!creationModalLastnameINput.val()?.trim()) {
         alert("last name is required");
         return console.log({ message: "last name  is required", status: 400 });
       }

       if (!creationModalCompanyINput.val()?.trim()) {
         alert("company is required");
         return console.log({ message: "company  is required", status: 400 });
       }

       if (!creationModalBirthdayINput.val()?.trim()) {
         alert("Birthday is required");
         return console.log({ message: "Birthday is required", status: 400 });
       }
       if(!creationModalNationalcodeINput.val()?.trim()){
          alert("national_code is required")
          return console.log({message:"national_code is required", status:400})
       }

       if(!creationModalPhonenumberINput.val()?.trim()){
        alert("phone_number is required(invalid)");
        return console.log({
          message: "phone number is required",
          status: 400,
        });
       }



      const newEmployee = {
        first_name: creationModalFirstnameINput.val(),
        last_name: creationModalLastnameINput.val(),
        gender: creationModalGenderINput.val(),
        birthday: creationModalBirthdayINput.val(),
        phone_number: creationModalPhonenumberINput.val()?.split(","),
        national_code: creationModalNationalcodeINput.val(),
        role: creationModalRoleINput.val(),
        province: creationModalProvinceINput.val(),
        company: creationModalCompanyINput.val(),
      };
      const responseObject = await fetch("http://localhost:4000/employee", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(newEmployee),
      });
      const response = await responseObject.json();

      if(responseObject.status===201){
        
        alert(`${newEmployee.first_name} Information created successfully`);
        console.log(response);

        
      }

      else{
        alert(`${response?.message}`)
        console.log(response);  
      }
      
    } catch (error) {
      console.log(error);
    }
    
  })

  creationModalCloseButton.on("click",()=>{
    creationModalFirstnameINput.val("");
    creationModalLastnameINput.val("");
    creationModalGenderINput.val("");
    creationModalBirthdayINput.val("");
    creationModalPhonenumberINput.val("");
    creationModalNationalcodeINput.val("");
    creationModalRoleINput.val("");
    creationModalProvinceINput.val("");
    creationModalCompanyINput.val("");
  })

  



})
