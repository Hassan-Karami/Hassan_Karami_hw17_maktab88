//START Jquery
$(async function(){
  const idInput = $("#_id");
  const first_nameInput = $("#first_name");
  const last_nameInput = $("#last_name");
  const genderInput = $("#gender");
  const birthdayInput = $("#birthday");
  const national_codeInput = $("#national_code");
  const provinceInput = $("#province");
  const companyInput = $("#company");
  const roleInput = $("#role");
  const phone_numberInput = $("#phone_number");

  const responseObject = await fetch("http://localhost:4000/company");
  const allCompanies = await responseObject.json();
  for (let i = 0; i < allCompanies.length; i++) {
    companyInput.append(
      `
      <option value="${allCompanies[i]._id}">${allCompanies[i].name}</option>

      `
    );
  }


  const queryString = window.location.search.split("=")[1];
  //get single employee then implement update and delete process in its success response
  $.ajax({
    url: "http://localhost:4000/employee/getSingleEmployee",
    method: "POST",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({ id: queryString }),
    success: function (data) {
      idInput.val(data._id);
      first_nameInput.val(data.first_name);
      last_nameInput.val(data.last_name);
      genderInput.val(data.gender);
      birthdayInput.val(formatDate(data.birthday));
      national_codeInput.val(data.national_code);
      provinceInput.val(data.province);
      companyInput.val(data.company);
      roleInput.val(data.role);
      phone_numberInput.val(data.phone_number);

      $("#update_btn").on("click", async (e) => {
        let updatedData = {
          first_name: $("#first_name").val(),
          last_name: $("#last_name").val(),
          gender: $("#gender").val(),
          birthday: $("#birthday").val(),
          national_code: $("#national_code").val(),
          province: $("#province").val(),
          company: $("#company").val(),
          role: $("#role").val(),
          phone_number: $("#phone_number").val()?.split(","),
        };
        const responsebject = await fetch("http://localhost:4000/employee", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([queryString, updatedData]),
        });
        const response = await responsebject.json();
          if (!!response) {
            console.log(response);
            setTimeout(() => {
              window.location.href = "http://localhost:4000/employees-list";
            }, 200);
          }
        console.log(response);

        
      });
      //end of update BUTTON

       $("#delete_btn").on("click",async(e)=>{
      
        try {
          const responsebject = await fetch(
            "http://localhost:4000/employee",
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({id:queryString})
            }
          );
          console.log(responsebject);
          const response = await responsebject.json();
          if(!!response){
            console.log(response);
            setTimeout(() => {
              window.location.href = "http://localhost:4000/employees-list";
            },200 );

          }
         



          
          

          
        } catch (error) {
          console.log(error);
        }

       })
    },
    error: function (error) {
      console.log(error);
    },
  });
  //End of primary ajax

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
});
