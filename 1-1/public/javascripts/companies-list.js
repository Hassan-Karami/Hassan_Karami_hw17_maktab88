$(async() => {
    try {
      //get all companies with fetch
      const responseObject = await fetch("http://localhost:4000/company", {});
      const allCompanies = await responseObject.json();
      console.log(allCompanies);
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

      
      console.log(allCompanies.length);

      for(let i=0; i<allCompanies.length;i++){
        $("tbody").append(
          `
                <tr>
                <th scope="row">${i + 1}</th>
                <td>${allCompanies[i].name}</td>
                <td>${allCompanies[i].province}</td>
                <td>${convertDateToyymmdd(allCompanies[i].createdAt)}</td>
                <td><button onclick="HandleMoreInfoButtonOnClick('${
                  allCompanies[i]._id
                }')" type="button" class="btn btn-primary">More Info</button></td>
                </tr>
                `
        );
      }

    } catch (error) {
        console.log(error);
    }
})


function convertDateToyymmdd(dateStr) {
  const date = new Date(dateStr);
  const year = date.getUTCFullYear();
  const month = ("0" + (date.getUTCMonth() + 1)).slice(-2); // add leading zero if month is single digit
  const day = ("0" + date.getUTCDate()).slice(-2); // add leading zero if day is single digit
  const yymmdd = `${year}-${month}-${day}`;
  return yymmdd;
}