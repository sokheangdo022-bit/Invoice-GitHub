
var list = [];
var autoNumber = 1;
var totalAmount = 0;
var isDelivery = false;

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
                    for (var j = 0; j < list.length; j++) {
                        var item = list[j];
                        var tempAmount = item.amount;
                        if (tempAmount != "") {
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

generateTable();

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
    generateTable();
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
});


function generateTable() {
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
    } else {
        if (isDelivery == true) {
            var boxDelivery = document.getElementById("box-deliveryid").value;
            list[9].disc = "Delivery";
            list[9].amount = parseFloat(boxDelivery);
        } else {
            list[9].disc = "";
            list[9].amount = "";
        }
    }

    renderTable();
}