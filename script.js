// ======================================
// TRADING PLAN CALCULATOR
// Gold & Oil
// ======================================

function hitungTrading() {

    const modal = parseFloat(document.getElementById("modal").value);
    const lot = parseFloat(document.getElementById("lot").value);

    const instrument = document.getElementById("instrument").value;

    if (isNaN(modal) || modal <= 0) {

        alert("Masukkan Modal terlebih dahulu.");

        return;
    }

    if (isNaN(lot) || lot <= 0) {

        alert("Masukkan Jumlah Lot.");

        return;
    }

    //------------------------------------
    // DATA
    //------------------------------------

    let margin = 0;
    let normal = 0;
    let hectic = 0;
    let cs = 0;
    let sp = 0;

    if (instrument == "gold") {

        margin = 1500;
        normal = 150;
        hectic = 300;
        cs = 100;
        sp = 5;

    }

    else {

        margin = 3000;
        normal = 7;
        hectic = 15;
        cs = 1000;
        sp = 0.3;

    }

    //------------------------------------
    // PROFIT
    //------------------------------------

    let profit = (cs * sp * lot) - (50 * lot);

    //------------------------------------
    // MODAL YANG DIGUNAKAN
    //------------------------------------
    
    let modalNormal =
        modal - ((margin * lot) / normal);

    let modalHectic =
        modal - ((margin * lot) / hectic);

    //------------------------------------
    // KETAHANAN DANA
    //------------------------------------

    let ketahananDana =
        (modal - (lot * margin)) / (lot * cs);

    //------------------------------------
    // RETURN
    //------------------------------------

    let returnNormal =
        (profit / modalNormal) * 100;

    let returnHectic =
        (profit / modalHectic) * 100;

    //------------------------------------
    // RANGE
    //------------------------------------

    let kecil =
        Math.min(returnNormal, returnHectic);

    let besar =
        Math.max(returnNormal, returnHectic);

//------------------------------------
// RISK LEVEL
//------------------------------------

let risk = "";

if (instrument == "gold") {

    if (ketahananDana >= 300) {

        risk = "🟢 Aman";

    }

    else if (150> ketahananDana >300) {

        risk = "🟡 Waspada";

    }

    else {

        risk = "🔴 Berisiko";

    }

}

else {

    if (ketahananDana >= 15) {

        risk = "🟢 Aman";

    }

    else if (7 > ketahananDana >= 15) {

        risk = "🟡 Waspada";

    }

    else {

        risk = "🔴 Berisiko";

    }

}
    //------------------------------------
    // FORMAT ANGKA
    //------------------------------------

    const usd = new Intl.NumberFormat("en-US", {

        minimumFractionDigits:2,
        maximumFractionDigits:2

    });

    //------------------------------------
    // OUTPUT
    //------------------------------------

    document.getElementById("profit").innerHTML =
        "$ " + usd.format(profit);

    document.getElementById("margin").innerHTML =
        "$ " + usd.format(margin * lot);

    document.getElementById("ketahananDana").innerHTML =
        ketahananDana.toFixed(2) + " Point";

    document.getElementById("cs").innerHTML =
        cs;

    document.getElementById("sp").innerHTML =
        sp;

    document.getElementById("normal").innerHTML =
        normal + " Point";

    document.getElementById("hectic").innerHTML =
        hectic + " Point";

    document.getElementById("returnNormal").innerHTML =
        returnNormal.toFixed(2) + "%";

    document.getElementById("returnHectic").innerHTML =
        returnHectic.toFixed(2) + "%";

    document.getElementById("range").innerHTML =
        kecil.toFixed(2) + "% - " + besar.toFixed(2) + "%";

    document.getElementById("risk").innerHTML =
        risk;

    //------------------------------------
    // WARNA RISK
    //------------------------------------

    const riskElement = document.getElementById("risk");

    riskElement.className = "";

    if (risk.includes("Aman")) {

        riskElement.classList.add("success");

    }

    else if (risk.includes("Waspada")) {

        riskElement.classList.add("warning");

    }

    else {

        riskElement.classList.add("danger");

    }

}
