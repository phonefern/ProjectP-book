google.charts.load("current", {
  packages: ["corechart", "bar"],
});
google.charts.setOnLoadCallback(loadTable);

function loadTable() {
  const xhttp = new XMLHttpRequest();
  const uri = "http://localhost:3000/slist";
  xhttp.open("GET", uri);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var trHTML = "";
      var num = 1;
      const objects = JSON.parse(this.responseText);
      console.log(objects); 

      for (let object of objects) {
        trHTML += "<tr>";
        trHTML += "<td>" + num + "</td>";
        trHTML += "<td>" + object["age"] + "</td>";
        trHTML += "<td>" + object["sex"] + "</td>";
        trHTML += "<td>" + object["cp"] + "</td>";
        trHTML += "<td>" + object["trestbps"] + "</td>";
        trHTML += "<td>" + object["chol"] + "</td>";
        trHTML += "<td>" + object["fbs"] + "</td>";
        trHTML += "<td>" + object["restecg"] + "</td>";
        trHTML += "<td>" + object["thalach"] + "</td>";
        trHTML += "<td>" + object["exang"] + "</td>";
        trHTML += "<td>" + object["oldpeak"] + "</td>";
        trHTML += "<td>" + object["slope"] + "</td>";
        trHTML += "<td>" + object["ca"] + "</td>";
        trHTML += "<td>" + object["thal"] + "</td>";
        trHTML += "<td>" + object["num"] + "</td>";
        trHTML += "<td>";
        trHTML += '<a type="button" class="btn btn-outline-secondary me-2" onclick="showStudentUpdateBox(\'' + object["_id"] + '\')"><i class="fas fa-edit"></i></a>';
        trHTML += '<a type="button" class="btn btn-outline-danger" onclick="showStudentDeleteBox(\'' + object["_id"] + '\')"><i class="fas fa-trash"></i></a>';
        trHTML += "<tr>";

        num++;
      }
      document.getElementById("mytable").innerHTML = trHTML;

      loadGraph(objects);
    }
  };
}

function loadQueryTable() {
  document.getElementById("mytable").innerHTML = '<tr><th scope="row" colspan="5">Loading...</th></tr>';
  const searchText = document.getElementById("searchTextBox").value;

  const xhttp = new XMLHttpRequest();
  const uri = "http://localhost:3000/slist/field/" + searchText;
  xhttp.open("GET", uri);

  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var trHTML = "";
      var num = 1;
      const objects = JSON.parse(this.responseText).Complaint;
      for (let object of objects) {
        trHTML += "<tr>";
        trHTML += "<td>" + num + "</td>";
        trHTML += "<td>" + object["age"] + "</td>";
        trHTML += "<td>" + object["sex"] + "</td>";
        trHTML += "<td>" + object["cp"] + "</td>";
        trHTML += "<td>" + object["trestbps"] + "</td>";
        trHTML += "<td>" + object["chol"] + "</td>";
        trHTML += "<td>" + object["fbs"] + "</td>";
        trHTML += "<td>" + object["restecg"] + "</td>";
        trHTML += "<td>" + object["thalach"] + "</td>";
        trHTML += "<td>" + object["exang"] + "</td>";
        trHTML += "<td>" + object["oldpeak"] + "</td>";
        trHTML += "<td>" + object["slope"] + "</td>";
        trHTML += "<td>" + object["ca"] + "</td>";
        trHTML += "<td>" + object["thal"] + "</td>";
        trHTML += "<td>" + object["num"] + "</td>";
        trHTML += "<td>";
        trHTML +=
          '<a type="button" class="btn btn-outline-secondary" onclick="showStudentUpdateBox(\'' +
          object["_id"] +
          '\')"><i class="fas fa-edit"></i></a>';
        trHTML +=
          '<a type="button" class="btn btn-outline-danger" onclick="studentDelete(\'' +
          object["_id"] +
          '\')"><i class="fas fa-trash"></i></a></td>';
        trHTML += "<tr>";
        num++;
      }
      console.log(trHTML);
      document.getElementById("mytable").innerHTML = trHTML;

      loadGraph(objects);
    }
  };
}

function loadGraph(objects) {
  var mlCount = 0;
  var fullsCount = 0;
  var sysCount = 0;
  var netwCount = 0;

  var mrCount = 0;
  var missCount = 0;
  var drCount = 0;
  var pfCount = 0;

  for (let object of objects) {
    switch (object["sex"]) {
      case "0":
        mlCount = mlCount + 1;
        break;
      case "1":
        fullsCount = fullsCount + 1;
        break;

    }

    switch (object["cp"]) {
      case "1":
        mrCount = mrCount + 1;
        break;
      case "2":
        missCount = missCount + 1;
        break;

      case "3":
        drCount = drCount + 1;
        break;

      case "4":
        pfCount = pfCount + 1;
        break;
    }
  }

  var TimelyResponseData = google.visualization.arrayToDataTable([
    ["sex", "Field"],
    ["Men", mlCount],
    ["Woman", fullsCount],
   
  ]);

  var optionsTimelyResponse = {
    Titil: "Overall chol Fields",
    legentFontSize: 15,
    fontSize: 15,
    sexFontSize: 15,
    tooltipFontSize: 15
  };
  var chartTimelyResponse = new google.visualization.PieChart(
    document.getElementById("piechartTimelyResponse")
  );
  chartTimelyResponse.draw(TimelyResponseData, optionsTimelyResponse);

  var dataSubmitted = google.visualization.arrayToDataTable([
    [
      "Student Titile",
      "Number",
      {
        role: "style",
      },
      {
        role: "annotation",
      },
    ],
    ["typical angina", mrCount, "gold", "typical angina"],
    ["atypical angina", missCount, "color: #F65A83", "atypical angina"],
    ["non-anginal pain.", drCount, "color: #F9F5EB", "non-anginal pain."],
    ["asymptomatic", pfCount, "color: #607EAA", "asymptomatic"],
  ]);

  var optionSubmitted = {
    sex: "Staff' sex",
    legend: { position: "none" },
    legentFontSize: 15,
    fontSize: 15,
    sexFontSize: 15,
    tooltipFontSize: 15
  };

  var chartSubmitted = new google.visualization.BarChart(
    document.getElementById("barchartSubmitted")
  );
  chartSubmitted.draw(dataSubmitted, optionSubmitted);
}

function showStudentCreateBox() {
  var d = new Date();
  const date = d.toISOString().split("T")[0];

  Swal.fire({
    sex: "Create Student Transaction",
    html:
      '<div class="mb-3"><label for="Created_Date" class="form-label">Created Date</label>' +
      '<input id="Created_Date" class="swal2-input" placeholder="Created_Date" type="hidden" value="' + date + '">' +

      '<div class="mb-3"><label for="age" class="form-label">Student ID</label>' +
      '<input class="form-control" id="age" placeholder="age"></div>' +

      '<div class="mb-3"><label for="sex" class="form-label">sex</label>' +
      '<input class="form-control" id="sex" placeholder="sex"></div>' +

      '<div class="mb-3"><label for="cp" class="form-label">cp</label>' +
      '<input class="form-control" id="cp" placeholder="cp"></div>' +

      '<div class="mb-3"><label for="trestbps" class="form-label">trestbps</label>' +
      '<input class="form-control" id="trestbps" placeholder="trestbps"></div>' +

      '<div class="mb-3"><label for="chol" class="form-label">chol</label>' +
      '<input class="form-control" id="chol" placeholder="chol"></div>' +

      '<div class="mb-3"><label for="fbs" class="form-label">fbs</label>' +
      '<input class="form-control" id="fbs" placeholder="fbs"></div>' +

      '<div class="mb-3"><label for="restecg" class="form-label">restecg</label>' +
      '<input class="form-control" id="restecg" placeholder="restecg"></div>' +

      '<div class="mb-3"><label for="thalach" class="form-label">thalach</label>' +
      '<input class="form-control" id="thalach" placeholder="thalach"></div>' +

      '<div class="mb-3"><label for="exang" class="form-label">exang</label>' +
      '<input class="form-control" id="exang" placeholder="exang"></div>' +

      '<div class="mb-3"><label for="oldpeak" class="form-label">oldpeak</label>' +
      '<input class="form-control" id="oldpeak" placeholder="oldpeak"></div>' +

      '<div class="mb-3"><label for="slope" class="form-label">slope</label>' +
      '<input class="form-control" id="slope" placeholder="slope"></div>' +

      '<div class="mb-3"><label for="ca" class="form-label">ca</label>' +
      '<input class="form-control" id="ca" placeholder="ca"></div>' +

      '<div class="mb-3"><label for="thal" class="form-label">thal</label>' +
      '<input class="form-control" id="thal" placeholder="thal"></div>' +

      '<div class="mb-3"><label for="num" class="form-label">num</label>' +
      '<input class="form-control" id="num" placeholder="num"></div>',

    focusConfirm: false,
    preConfirm: () => {
      slistCreate();
    },
  });
}

function slistCreate() {
  const Created_Date = document.getElementById("Created_Date").value;
  const age = document.getElementById("age").value;
  const sex = document.getElementById("sex").value;
  const cp = document.getElementById("cp").value;
  const trestbps = document.getElementById("trestbps").value;
  const Field = document.getElementById("Field").value;
  const chol = document.getElementById("chol").value;
  const fbs = document.getElementById("fbs").value;
  const restecg = document.getElementById("restecg").value;
  const thalach = document.getElementById("thalach").value;
  const exang = document.getElementById("exang").value;
  const oldpeak = document.getElementById("oldpeak").value;
  const slope = document.getElementById("slope").value;
  const ca = document.getElementById("ca").value;
  const thal = document.getElementById("thal").value;
  const num = document.getElementById("num").value;

  console.log(
    JSON.stringify({
      Created_Date: Created_Date,
      age: age,
      sex: sex,
      cp: cp,
      trestbps: trestbps,
      Field: Field,
      chol: chol,
      fbs: fbs,
      restecg: restecg,
      thalach: thalach,
      exang: exang,
      oldpeak: oldpeak,
      slope: slope,
      ca: ca,
      thal: thal,
      num: num,

    })
  );

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/slist/create");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      Created_Date: Created_Date,
      age: age,
      sex: sex,
      cp: cp,
      trestbps: trestbps,
      Field: Field,
      chol: chol,
      fbs: fbs,
      restecg: restecg,
      thalach: thalach,
      exang: exang,
      oldpeak: oldpeak,
      slope: slope,
      ca: ca,
      thal: thal,
      num: num,
    })
  );

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(
        "Good job!",
        "Create Student Information Successfully!",
        "success"
      );
      loadTable();
    }
  };
}

function showStudentDeleteBox(id) {
  Swal.fire({
    sex: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      studentDelete(id);
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })

}

function studentDelete(id) {
  console.log("Delete: ", id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://localhost:3000/slist/delete");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      _id: id,
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(
        "Good job!",
        "Delete Heart Attack Information Successfully!",
        "success"
      );
      loadTable();
    }
  };
}

function showStudentUpdateBox(id) {
  console.log("edit", id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/slist/" + id);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const object = JSON.parse(this.responseText).Complaint;
      console.log("showStudentUpdateBox", object);
      Swal.fire({
        sex: "Update Student Transaction",
        html:
          '<input id="id" class="swal2-input" placeholder="OID" type="hidden" value="' + object["_id"] + '"><br>' +
          '<div class="mb-3"><label for="Created_Date" class="form-label">Created Date</label>' +
          '<input class="form-control" id="Created_Date" placeholder="Created_Date" value="' + object["Created_Date"] + '"></div>' +

          '<div class="mb-3"><label for="age" class="form-label">Student ID</label>' +
          '<input class="form-control" id="age" placeholder="age" value="' + object["age"] + '"></div>' +

          '<div class="mb-3"><label for="sex" class="form-label">sex</label>' +
          '<input class="form-control" id="sex" placeholder="sex" value="' + object["sex"] + '"></div>' +

          '<div class="mb-3"><label for="cp" class="form-label">cp</label>' +
          '<input class="form-control" id="cp" placeholder="cp" value="' + object["cp"] + '"></div>' +

          '<div class="mb-3"><label for="trestbps" class="form-label">trestbps</label>' +
          '<input class="form-control" id="trestbps" placeholder="trestbps" value="' + object["trestbps"] + '"></div>' +

          '<div class="mb-3"><label for="chol" class="form-label">chol</label>' +
          '<input class="form-control" id="chol" placeholder="chol" value="' + object["chol"] + '"></div>' +

          '<div class="mb-3"><label for="fbs" class="form-label">fbs</label>' +
          '<input class="form-control" id="fbs" placeholder="fbs" value="' + object["fbs"] + '"></div>' +

          '<div class="mb-3"><label for="restecg" class="form-label">restecg</label>' +
          '<input class="form-control" id="restecg" placeholder="restecg" value="' + object["restecg"] + '"></div>' +

          '<div class="mb-3"><label for="thalach" class="form-label">thalach</label>' +
          '<input class="form-control" id="thalach" placeholder="thalach" value="' + object["thalach"] + '"></div>' +

          '<div class="mb-3"><label for="exang" class="form-label">exang</label>' +
          '<input class="form-control" id="exang" placeholder="exang" value="' + object["exang"] + '"></div>' +

          '<div class="mb-3"><label for="oldpeak" class="form-label">oldpeak</label>' +
          '<input class="form-control" id="oldpeak" placeholder="oldpeak" value="' + object["oldpeak"] + '"></div>' +

          '<div class="mb-3"><label for="slope" class="form-label">slope</label>' +
          '<input class="form-control" id="slope" placeholder="" value="' + object["slope"] + '"></div>' +

          '<div class="mb-3"><label for="ca" class="form-label">ca</label>' +
          '<input class="form-control" id="ca" placeholder="" value="' + object["ca"] + '"></div>' +

          '<div class="mb-3"><label for="thal" class="form-label">thal</label>' +
          '<input class="form-control" id="thal" placeholder="thal" value="' + object["thal"] + '"></div>' +

          '<div class="mb-3"><label for="num" class="form-label">num</label>' +
          '<input class="form-control" id="num" placeholder="num" value="' + object["num"] + '"></div>',

        focusConfirm: false,
        preConfirm: () => {
          studentUpdate();
        },
      });
    }
  };
}

function studentUpdate() {
  const id = document.getElementById("id").value;
  const Created_Date = document.getElementById("Created_Date").value;
  const age = document.getElementById("age").value;
  const sex = document.getElementById("sex").value;
  const cp = document.getElementById("cp").value;
  const trestbps = document.getElementById("trestbps").value;
  const chol = document.getElementById("chol").value;
  const fbs = document.getElementById("fbs").value;
  const restecg = document.getElementById("restecg").value;
  const thalach = document.getElementById("thalach").value;
  const exang = document.getElementById("exang").value;
  const oldpeak = document.getElementById("oldpeak").value;
  const slope = document.getElementById("slope").value;
  const ca = document.getElementById("ca").value;
  const thal = document.getElementById("thal").value;
  const num = document.getElementById("num").value;

  console.log(
    JSON.stringify({
      _id: id,
      Created_Date: Created_Date,
      age: age,
      sex: sex,
      cp: cp,
      trestbps: trestbps,
      chol: chol,
      fbs: fbs,
      restecg: restecg,
      thalach: thalach,
      exang: exang,
      oldpeak: oldpeak,
      slope: slope,
      ca: ca,
      thal: thal,
      num: num,
    })
  );

  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://localhost:3000/slist/update");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      _id: id,
      Created_Date: Created_Date,
      age: age,
      sex: sex,
      cp: cp,
      trestbps: trestbps,
      chol: chol,
      fbs: fbs,
      restecg: restecg,
      thalach: thalach,
      exang: exang,
      oldpeak: oldpeak,
      slope: slope,
      ca: ca,
      thal: thal,
      num: num,
    })
  );

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(
        "Good job!",
        "Update Heart Attack Information Successfully!",
        "success"
      );
      loadTable();
    }
  };
}
