(async()=>{
    const newEmployee={}
    const responseObject= await fetch("http://localhost:4000/employee", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(newEmployee),
    });
    const response = await responseObject.json();
})()