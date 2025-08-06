


var list = [];
var autoNumber = 1;
var totalAmount = 0;

document.getElementById("btn-product").addEventListener("click", function () {

    //GEt value
    // var inputValue = document.getElementById("no").value;
    var inputcustomer = document.getElementById("customer").value;
    var inputphone = document.getElementById("phone").value;
    var inputdesc = document.getElementById("desc").value;
    var inputqty = document.getElementById("qty").value;
    var inputprice = document.getElementById("price").value;
    var inputaddress = document.getElementById("address").value;
    // var inputamount = document.getElementById("amount").value;


    // var iteam2 = {no: inputValue, name: inputcustomer};
    //Set value
    document.getElementById("cust-address").innerHTML = inputaddress;
    document.getElementById("cust-phone").innerHTML = inputphone;
    document.getElementById("cust-name").innerHTML = inputcustomer;


    var inputamount = inputqty * inputprice;//20 45

    totalAmount = totalAmount + inputamount; // Total Last Amount

    document.getElementById("total").innerHTML = totalAmount;
    document.getElementById("grand-total").innerHTML = totalAmount;

    if (autoNumber > 10) {
        return;
    };

    var iteam = {
        no: autoNumber,
        name: inputcustomer,
        phone: inputphone,
        desc: inputdesc,
        qty: inputqty,
        price: inputprice,
        amount: inputamount,
    };

    autoNumber = autoNumber + 1;


    // autoNumber ++;
    //{no: 1, name: "sokho", phone: 032165, decription: "colagen casing",qty : 2, unitprice: 25, amount: 50}

    //Array - List
    //["No001","sokho",12]
    //[{no: inputValue, name: inputcustomer}]
    //[{no: inputValue, name: inputcustomer},{no: inputValue, name: inputcustomer},12]

    //[{no: 1, name: "sokho", phone: 032165, decription: "colagen casing",qty : 2, unitprice: 25, amount: 50},{no: 1, name: "sokho", phone: 032165, decription: "colagen casing",qty : 2, unitprice: 25, amount: 50}]


    list.push(iteam);

    // for(var j = 0; j < list.length; j++){
    //     var a = list[j]["amount"];
    //     totalAmount = totalAmount + a;
    // }

    renderTable();

    //tomorrow Get value from Array add into Table
    // togglePopup();

});

function renderTable() {
    var tbody = document.querySelector("#invoiceTable tbody");
    tbody.innerHTML = ""; // clear previous rows

    list.forEach(function (item) {
        var row = `<tr>
            <td>${item.no}</td>
            <td>${item.desc}</td>
            <td>${item.qty}</td>
            <td>${item.price}</td>
            <td>0</td>
            <td>${item.amount}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}


let today = new Date();
var currentDate = formatDate(today);
document.getElementById("date-today").innerHTML = currentDate;

var sdate = formatSignature(today);
document.getElementById("signature-date").innerHTML = sdate;

var invNumber = autoInvoiceNumber(today);//Parameter
document.getElementById("invoice-id").innerHTML = invNumber;

function formatDate(date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let dd = String(date.getDate()).padStart(2, '0');   // Day with leading zero
    let mmm = months[date.getMonth()];                  // Short month name
    let yyyy = date.getFullYear();                      // Year

    return `${dd}-${mmm}-${yyyy}`;
}

function formatSignature(date) {
    var dd = String(date.getDate()).padStart(2, '0');
    // var mmm = String(date.getMonth() + 1);//Convert 8 -> "8"
    var mmm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();
    return dd + "/" + mmm + "/" + yyyy;
}

function autoInvoiceNumber(date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mmm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();

    var currentSecond = date.getSeconds();

    return yyyy + "" + mmm + "" + dd + "" + currentSecond;
}

function togglePopup() {
    const overlay = document.getElementById('popupOverlay');
    overlay.classList.toggle('show');//Set class into element

}

function closePopup() {

    togglePopup();

    var fakeitem = {
        no: "",
        name: "",
        phone: "",
        desc: "",
        qty: "",
        price: "",
        amount: "",
    };
    debugger
    if (list.length == 1) {
        list.push(fakeitem);
        list.push(fakeitem);
        list.push(fakeitem);
        list.push(fakeitem);
        list.push(fakeitem);
        list.push(fakeitem);
        list.push(fakeitem);
        list.push(fakeitem);
        list.push(fakeitem);
    } else if (list.length == 2) {
        list.push(fakeitem);

    }
    

    renderTable();

}