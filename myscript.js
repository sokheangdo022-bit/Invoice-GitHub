
var list = [];
var autoNumber = 1;
var totalAmount = 0;
var isDelivery = false;

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
        desc: inputdesc,
        qty: inputqty,
        price: inputprice,
        disc: "",
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

// function renderTable() {
//     var tbody = document.querySelector("#invoiceTable tbody");
//     tbody.innerHTML = ""; // clear previous rows

//     list.forEach(function (item) {
//         var row = `<tr>
//             <td>${item.no}</td>
//             <td>${item.desc}</td>
//             <td>${item.qty}</td>
//             <td>${item.price}</td>
//             <td>${item.disc}</td>
//             <td>${item.amount}</td>
//         </tr>`;
//         tbody.innerHTML += row;
//     });


// }

function renderTable() {
    const tbody = document.querySelector("#invoiceTable tbody");
    tbody.innerHTML = ""; // clear previous rows

    list.forEach((item, index) => {
        const row = document.createElement("tr");

        Object.keys(item).forEach((key) => {
            const cell = document.createElement("td");
            cell.textContent = item[key];
            cell.contentEditable = key !== "no"; // make all editable except 'no'
            cell.dataset.index = index;
            cell.dataset.field = key;

            // update list when edited
            cell.addEventListener("input", (e) => {
                const i = e.target.dataset.index;
                const f = e.target.dataset.field;
                let val = e.target.textContent.trim();

                // convert numeric fields
                if (["qty", "price", "disc", "amount"].includes(f)) {
                    val = parseFloat(val) || 0;
                }
                list[i][f] = val;

                // optional: auto recalc amount
                if (f === "qty" || f === "price" || f === "disc") {
                    const qty = parseFloat(list[i].qty) || 0;
                    const price = parseFloat(list[i].price) || 0;
                    const disc = parseFloat(list[i].disc) || 0;
                    list[i].amount = (qty * price) - disc;
                    debugger;
                    renderTable(); // re-render table

                    totalAmount = 0;
                    for(var j = 0; j < list.length; j ++){
                        var item = list[j];
                        var tempAmount = item.amount;
                        if(tempAmount != ""){
                            totalAmount = totalAmount + tempAmount;
                        }
                       
                    }

                    document.getElementById("total").innerHTML = totalAmount;
                    document.getElementById("grand-total").innerHTML = totalAmount;
                }
            });

            row.appendChild(cell);
        });

        tbody.appendChild(row);
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


function fakeObject(index) {
    var fakeitem = { //declare 
        no: autoNumber + index,
        desc: "",
        qty: "",
        price: "",
        disc: "",
        amount: "",
    };

    return fakeitem;
}

function closePopup() {

    togglePopup();
    // onClickDeliveryCheckbox();
    // var checkbox = document.getElementById("deliveryCheck");
    // isDelivery = checkbox.checked;

    var fakeCount = 10 - list.length;  // 10 -2 = 8

    if (fakeCount > 0) {
        for (var i = 0; i < fakeCount; i++) {// 8 round /0,1,2,3,4,5,6,7,8

            //var myfk = fakeObject(i);//paramenter
            //list.push(myfk);
            var continueNumber = autoNumber + i;

            var fakeitem = { //declare 
                no: continueNumber,
                desc: "",
                qty: "",
                price: "",
                disc: "",
                amount: "",
            };
            if (isDelivery == true) {
                var boxDelivery = document.getElementById("box-deliveryid").value;
                if (continueNumber == 10) {
                    fakeitem.disc = "Delivery";
                    fakeitem.amount = parseFloat(boxDelivery);
                    totalAmount = totalAmount + parseFloat(boxDelivery);

                    document.getElementById("total").innerHTML = totalAmount;
                    document.getElementById("grand-total").innerHTML = totalAmount;

                }
            }
            list.push(fakeitem);
        }
    }
    renderTable();
}
var checkbox = document.getElementById("deliveryCheck");

checkbox.addEventListener("change", function () {
    var boxDelivery = document.getElementById("box-deliveryid");
    if (checkbox.checked) {
        isDelivery = true;
        boxDelivery.style.display = "block";
    } else {
        isDelivery = false;
        boxDelivery.style.display = "none";
    }

});
function printInvoice() {

    var invoiceForm = document.getElementById("form-containerid");
    var buttonPrint = document.getElementById("buttonprint");
    invoiceForm.style.display = "none";
    buttonPrint.style.display = "none";

    window.print();

}
var titleInvoice = document.getElementsByClassName("title")[0];
titleInvoice.addEventListener("mouseover", function () {
    var buttonPrint = document.getElementById("buttonprint");

    buttonPrint.style.display = "block";

    console.log("mouse over")
});


