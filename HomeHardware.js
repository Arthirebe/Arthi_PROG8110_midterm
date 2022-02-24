const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    SELECTION: Symbol("selection"),
    APPLIANCE: Symbol("appliance"),
    CLEANING: Symbol("cleaning"),
    KITCHEN: Symbol("kitchen"),
    EXTRAS: Symbol("extras"),
    CHOOSEONE: Symbol("chooseone"),
    ALL: Symbol("all"),
    CONFIRMATION: Symbol("confirmation")
});

module.exports = class HomeHardware extends Order {
    constructor(sNumber, sUrl) {
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.sSelection = "";
        this.sAppliance = "";
        this.sCleaning = "";
        this.sKitchen = "";
        this.sExtras = "";
        this.nPrice = 0;
    }
    handleInput(sInput) {
        let aReturn = [];
        switch (this.stateCur) {
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SELECTION;
                aReturn.push("Welcome to Home Hardware");
                aReturn.push(`For a list of what we sell tap:`);
                aReturn.push(`${this.sUrl}/flyer/${this.sNumber}/`);
                aReturn.push(`Type a value or name 
                                1. Appliance
                                2. Cleaning
                                3. Kitchen`);
                this.sSelection = sInput;
                this.stateCur = OrderState.SELECTION;
                aReturn.push("");
                break;
            case OrderState.SELECTION:
                if ((sInput.toLowerCase() == "1") || (sInput.toLowerCase() == "appliance")) {
                    this.stateCur = OrderState.APPLIANCE;
                    this.sAppliance = "Applicance product: ";
                    aReturn.push(`Which ${this.sAppliance} would you like to order? Toaster (or) Countertop oven (or) Can opener`);
                    console.log("SELECTION 1" + sInput);
                }
                else if ((sInput.toLowerCase() == "2") || (sInput.toLowerCase() == "cleaning")) {
                    this.stateCur = OrderState.KITCHEN;
                    this.sCleaning = "Cleaning product: ";
                    aReturn.push(`Which  ${this.sCleaning} would you like to order? Wastebasket (or) Garbage bag (or) Dish soap (or) Broom`);
                }
                else if ((sInput.toLowerCase() == "3") || (sInput.toLowerCase() == "kitchen")) {
                    this.stateCur = OrderState.CHOOSEONE;
                    this.sKitchen = "Kitchen product: ";
                    aReturn.push(`Which ${this.sKitchen} would you like to order? Bakeware, Cookware, Serving bowl, Tray`);
                }
                else if (sInput.toLowerCase() == "no") {
                    this.stateCur = OrderState.EXTRAS;
                    aReturn.push(`Which one you would like to add to this purchase geeky headlamps or ear buds. Type no if you are not interested`);
                }
                else {
                    aReturn.push(`${sInput} is not valid, please type 1 or 2 or 3`);
                }
                break;

            case OrderState.APPLIANCE:
                this.sSelection = sInput;
                if (this.sSelection == "toaster") {
                    console.log("Toaster");
                    this.nPrice = this.nPrice + 29.99;
                    console.log(this.nPrice);
                    this.stateCur = OrderState.CLEANING;
                    this.sAppliance = this.sAppliance + ` 2 Slice Toaster with Extra Wide Slots  White and Chrome`;
                    aReturn.push(`2 Slice Toaster with Extra Wide Slots  White and Chrome ADDED`);
                    aReturn.push(`Would you like to pick some cleaning product`);

                }
                else if (this.sSelection == "countertop oven") {
                    console.log("Countertop ovens");
                    aReturn.push(`Natural 4-Slice Convection Toaster Oven (TO1755SBC) - Grey, 1150W ADDED`);
                    this.nPrice = this.nPrice + 54.99;
                    this.stateCur = OrderState.CLEANING;
                    this.sAppliance = this.sAppliance + ` Natural 4-Slice Convection Toaster Oven (TO1755SBC) - Grey, 1150W`;
                    aReturn.push("Would you like to pick some cleaning product");
                }
                else if (this.sSelection == "can opener") {
                    console.log("Can openers");
                    aReturn.push("Countertop Electric Can Opener with Knife Sharpener (75224PS) - White ADDED");
                    this.nPrice = this.nPrice + 24.99;
                    this.stateCur = OrderState.CLEANING;
                    this.sAppliance = this.sAppliance + ` Countertop Electric Can Opener with Knife Sharpener (75224PS) - White`;
                    aReturn.push("Would you like to pick some cleaning product");
                }
                else {
                    this.stateCur = OrderState.ALL;
                    aReturn.push(`Which one you would like to add to this purchase geeky headlamps or ear buds. Type no if you are not interested`);
                }
                // aReturn.push(`To add more products 
                //                 Type a value or name 
                //                 1. Appliance
                //                 2. Cleaning
                //                 3. Kitchen`);
                break;
            case OrderState.CLEANING:
                console.log("This is cleaning sinput " + sInput);
                if (sInput.toLowerCase() != "no") {
                    this.stateCur = OrderState.KITCHEN;
                    this.sCleaning = "Cleaning product: ";
                    aReturn.push(`Which ${this.sCleaning} would you like to order? Wastebasket (or) Garbage bag (or) dish soap (or) broom`);
                }
                else {
                    this.stateCur = OrderState.EXTRAS;
                    aReturn.push(`Would you like to order some Kitchen products?`);
                }
                break;

            case OrderState.KITCHEN:
                if (sInput.toLowerCase() == "wastebasket") {
                    console.log("Waste Basket");
                    aReturn.push("Vanity Wastebasket - Black / Stainless Steel, 14 L")
                    this.nPrice = this.nPrice + 14.49;
                    console.log(this.nPrice);
                    this.sCleaning = this.sCleaning + ` Vanity Wastebasket - Black / Stainless Steel, 14 L`;
                    this.stateCur = OrderState.EXTRAS;
                    aReturn.push("Would you like to buy some Kitchen Products");
                }
                else if (sInput.toLowerCase() == "garbage bag") {
                    console.log("Garbage bag");
                    aReturn.push(`10 Pack 28" x 30" Tall Bin Compostable Bags`);
                    this.nPrice = this.nPrice + 6.69;
                    this.sCleaning = this.sCleaning + ` 10 Pack 28" x 30" Tall Bin Compostable Bags`;
                    this.stateCur = OrderState.EXTRAS;
                    aReturn.push("Would you like to buy some Kitchen Products");
                }
                else if (sInput.toLowerCase() == "dish soap") {
                    console.log("Dish soap");
                    aReturn.push(`4L Dish Soap`);
                    this.nPrice = this.nPrice + 13.97;
                    this.sCleaning = this.sCleaning + ` 4L Dish Soap`;
                    this.stateCur = OrderState.EXTRAS;
                    // this.sKitchen = sInput;
                    aReturn.push("Would you like to buy some Kitchen Products");
                }
                else if (sInput.toLowerCase() == "broom") {
                    console.log("Broom");
                    aReturn.push(`Angle Broom, with Dust Pan`);
                    this.nPrice = this.nPrice + 19.99;
                    this.sCleaning = this.sCleaning + ` Angle Broom, with Dust Pan`;
                    this.stateCur = OrderState.EXTRAS;
                    aReturn.push("Would you like to buy some Kitchen Products");
                }
                // else if(sInput.toLowerCase() == "mop") 
                // {
                //     console.log("Mop" +sInput);          
                //     aReturn.push("EasyWring Rinse Clean Spin Mop & Bucket System");
                //     this.nPrice = this.nPrice + 59.99;
                //     this.sCleaning = this.sCleaning + ` EasyWring Rinse Clean Spin Mop & Bucket System`;
                //     this.stateCur = OrderState.EXTRAS;                    
                //     aReturn.push(`Would you like to buy some Kitchen Products`);
                // }
                else {
                    aReturn.push(`${sInput} is not valid, please type Wastebasket (or) Garbage bag (or) dish soap (or) broom (or) mop`);
                }
                break;

            case OrderState.EXTRAS:
                console.log("This is extras or kitchen sinput " + sInput);
                if (sInput.toLowerCase() != "no") {
                    this.stateCur = OrderState.CHOOSEONE;
                    this.sKitchen = "Kitchen product: ";
                    aReturn.push(`Which ${this.sKitchen} would you like to order? Bakeware, Cookware, Serving bowl, Tray`);
                }
                else {
                    this.stateCur = OrderState.ALL;
                    aReturn.push(`Which one you would like to add to this purchase geeky headlamps or ear buds. Type no if you are not interested`);
                }
                break;

            case OrderState.CHOOSEONE:
                if (sInput.toLowerCase() == "bakeware") {
                    console.log("Bakeware");
                    aReturn.push(`Silicone Muffin Pan - White Confetti, 12 Cup`);
                    this.nPrice = this.nPrice + 24.99;
                    console.log(this.nPrice);
                    this.stateCur = OrderState.ALL;
                    this.sKitchen = this.sKitchen + ` Silicone Muffin Pan - White Confetti, 12 Cup`;
                    aReturn.push("Which one you would like to add to this purchase geeky headlamps or ear buds. Type no if you are not interested");
                }
                else if (sInput.toLowerCase() == "cookware") {
                    console.log("Cookware");
                    aReturn.push(`Cast Iron Skillet - 10.25"/26 cm`);
                    this.sKitchen = this.sKitchen + ` Cast Iron Skillet - 10.25"/26 cm`;
                    this.nPrice = this.nPrice + 46.99;
                    this.stateCur = OrderState.ALL;
                    aReturn.push("Would you like to include ear bud or geeky headlamps with");
                }
                else if (sInput.toLowerCase() == "serving bowl") {
                    console.log("Serving bowl");
                    aReturn.push(`8 Piece Round Casserole Dish Set with Lids - French White`);
                    this.nPrice = this.nPrice + 59.99;
                    this.stateCur = OrderState.ALL;
                    this.sKitchen = this.sKitchen + ` 8 Piece Round Casserole Dish Set with Lids - French White`;
                    aReturn.push("Which one you would like to add to this purchase geeky headlamps or ear buds. Type no if you are not interested");
                }
                else if (sInput.toLowerCase() == "tray") {
                    console.log("Tray");
                    aReturn.push(`Cutlery Tray - White, 12" x 14"`);
                    this.nPrice = this.nPrice + 5.99;
                    this.stateCur = OrderState.ALL;
                    this.sKitchen = this.sKitchen + ` Cutlery Tray - White, 12" x 14"`;
                    aReturn.push("Which one you would like to add to this purchase geeky headlamps or ear buds. Type no if you are not interested");
                }
                else {
                    aReturn.push(`${sInput} is not valid, please type Bakeware, Cookware, Serving bowl, Tray`);
                }
                break;

            case OrderState.ALL:
                console.log("This is extra" + sInput);
                if (sInput.toLowerCase() != "no") {
                    if (sInput.toLowerCase() == "ear buds") {
                        this.sExtras = sInput;
                        this.nPrice = this.nPrice + 5.99;
                        this.stateCur = OrderState.CONFIRMATION;
                        aReturn.push("Enter your name to view Total");
                    }
                    else if (sInput.toLowerCase() == "geeky headlamps") {
                        this.sExtras = sInput;
                        this.nPrice = this.nPrice + 6.99;
                        this.stateCur = OrderState.CONFIRMATION;
                        aReturn.push("Enter your name to view Total");
                    }
                    else {
                        aReturn.push(`${sInput} is invalid entry. Type ear buds or geeky headlamps`);
                    }
                }
                else {
                    this.stateCur = OrderState.CONFIRMATION;
                    aReturn.push("Enter your name to view Total");
                }
                break;

            case OrderState.CONFIRMATION:
                aReturn.push(`Hi ${sInput} Thank-you for your order of`);
                if (this.sAppliance) {
                    aReturn.push(`${this.sAppliance}`);
                }
                if (this.sCleaning) {
                    aReturn.push(`${this.sCleaning}`);
                }
                if (this.sKitchen) {
                    aReturn.push(`${this.sKitchen}`);
                }
                if (this.sExtras) {
                    aReturn.push(`with ${this.sExtras}`);
                }
                this.ntax=this.nPrice*0.13;
                this.ntotal=this.nPrice+this.ntax;
                aReturn.push(`SubTotal is $ ${this.nPrice.toFixed(2)}`);
                aReturn.push(`Tax is $${this.ntax.toFixed(2)}`);
                aReturn.push(`Total(including tax) is $${this.ntotal.toFixed(2)}`);
                aReturn.push(`We will text you from 519-222-2222 when we are ready with your order to meet you at curbside.`)
                this.isDone(true);
                break;
        }
        return aReturn;
    }
    renderForm() {
        // your client id should be kept private
        return (`
      <html>

<head>
    <meta content="text/html; charset=UTF-8" http-equiv="content-type">
    <style type="text/css">
        ol {
            margin: 0;
            padding: 0
        }

        table td,
        table th {
            padding: 0
        }

        .c7 {
            border-right-style: solid;
            padding: 5pt 5pt 5pt 5pt;
            border-bottom-color: #000000;
            border-top-width: 1pt;
            border-right-width: 1pt;
            border-left-color: #000000;
            vertical-align: top;
            border-right-color: #000000;
            border-left-width: 1pt;
            border-top-style: solid;
            border-left-style: solid;
            border-bottom-width: 1pt;
            width: 234pt;
            border-top-color: #000000;
            border-bottom-style: solid
        }

        .c8 {
            color: #000000;
            font-weight: 700;
            text-decoration: none;
            vertical-align: baseline;
            font-size: 20pt;
            font-family: "Arial";
            font-style: normal
        }

        .c1 {
            color: #000000;
            font-weight: 700;
            text-decoration: none;
            vertical-align: baseline;
            font-size: 11pt;
            font-family: "Arial";
            font-style: normal
        }

        .c9 {
            color: #000000;
            font-weight: 400;
            text-decoration: none;
            vertical-align: baseline;
            font-size: 11pt;
            font-family: "Arial";
            font-style: normal
        }

        .c0 {
            color: #000000;
            font-weight: 700;
            text-decoration: none;
            vertical-align: baseline;
            font-size: 14pt;
            font-family: "Arial";
            font-style: normal
        }

        .c11 {
            padding-top: 0pt;
            padding-bottom: 0pt;
            line-height: 1.15;
            orphans: 2;
            widows: 2;
            text-align: center
        }

        .c5 {
            padding-top: 0pt;
            padding-bottom: 0pt;
            line-height: 1.15;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        .c2 {
            border-spacing: 0;
            border-collapse: collapse;
            margin-right: auto
        }

        .c4 {
            padding-top: 0pt;
            padding-bottom: 0pt;
            line-height: 1.0;
            text-align: left
        }

        .c12 {
            background-color: #ffffff;
            max-width: 468pt;
            padding: 72pt 72pt 72pt 72pt
        }

        .c10 {
            font-weight: 700
        }

        .c6 {
            height: 11pt
        }

        .c3 {
            height: 0pt
        }

        .title {
            padding-top: 0pt;
            color: #000000;
            font-size: 26pt;
            padding-bottom: 3pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        .subtitle {
            padding-top: 0pt;
            color: #666666;
            font-size: 15pt;
            padding-bottom: 16pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        li {
            color: #000000;
            font-size: 11pt;
            font-family: "Arial"
        }

        p {
            margin: 0;
            color: #000000;
            font-size: 11pt;
            font-family: "Arial"
        }

        h1 {
            padding-top: 20pt;
            color: #000000;
            font-size: 20pt;
            padding-bottom: 6pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h2 {
            padding-top: 18pt;
            color: #000000;
            font-size: 16pt;
            padding-bottom: 6pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h3 {
            padding-top: 16pt;
            color: #434343;
            font-size: 14pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h4 {
            padding-top: 14pt;
            color: #666666;
            font-size: 12pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h5 {
            padding-top: 12pt;
            color: #666666;
            font-size: 11pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h6 {
            padding-top: 12pt;
            color: #666666;
            font-size: 11pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            font-style: italic;
            orphans: 2;
            widows: 2;
            text-align: left
        }
    </style>
</head>

<body class="c12">
    <p class="c11"><span class="c8">Home Hardware</span></p>
    <p class="c11"><span class="c1">Contact: 511-111-1111</span></p>
    <p class="c11"><span class="c1">Email: homehardware@hh.com</span></p>
    <p class="c6 c11"><span class="c8"></span></p>
    <p class="c5"><span class="c0">Appliances:</span></p>
    <p class="c5 c6"><span class="c1"></span></p><a id="t.fbcf0cae14e5d148e5db66e112ca1ee2978b2428"></a><a id="t.0"></a>
    <table class="c2">
        <tbody>
            <tr class="c3">
                <td class="c7" colspan="1" rowspan="1">
                    <p class="c4"><span class="c10">Toasters:</span></p>
                    <p class="c4"><span>2-Slice Toaster with Extra Wide Slots - White &amp; Chrome</span></p>
                </td>
                <td class="c7" colspan="1" rowspan="1">
                    <p class="c4"><span class="c1">$ 29.99</span></p>
                </td>
            </tr>
            <tr class="c3">
                <td class="c7" colspan="1" rowspan="1">
                    <p class="c5"><span class="c1">Countertop ovens:</span></p>
                    <p class="c4"><span>Natural 4-Slice Convection Toaster Oven (TO1755SBC) - Grey, 1150W</span></p>
                </td>
                <td class="c7" colspan="1" rowspan="1">
                    <p class="c4"><span class="c1">$ 54.99</span></p>
                </td>
            </tr>
            <tr class="c3">
                <td class="c7" colspan="1" rowspan="1">
                    <p class="c5"><span class="c1">Can openers:</span></p>
                    <p class="c4"><span>Countertop Electric Can Opener with Knife Sharpener (75224PS) - White</span></p>
                </td>
                <td class="c7" colspan="1" rowspan="1">
                    <p class="c5"><span class="c1">$ 24.99</span></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p class="c5 c6"><span class="c1"></span></p>
    <p class="c5 c6"><span class="c1"></span></p>
    <p class="c5 c6"><span class="c9"></span></p>
    <p class="c5 c6"><span class="c0"></span></p>
    <p class="c5"><span class="c0">Cleaning:</span></p>
    <p class="c5 c6"><span class="c0"></span></p><a id="t.9433376ee2a2a1fea774f49c2976027a5a79bb41"></a><a id="t.1"></a>
    <table class="c2">
        <tbody>
            <tr class="c3">
                <td class="c7" colspan="1" rowspan="1">
                    <p class="c5"><span class="c10">Wastebaskets</span><span class="c9">:</span></p>
                    <p class="c4"><span>Vanity Wastebasket - Black / Stainless Steel, 14 L</span></p>
                </td>
                <td class="c7" colspan="1" rowspan="1">
                    <p class="c4"><span class="c10">$ 14.49</span></p>
                </td>
            </tr>
            <tr class="c3">
                <td class="c7" colspan="1" rowspan="1">
                    <p class="c5"><span class="c1">Garbage bags:</span></p>
                    <p class="c4"><span>10 Pack 28&quot; x 30&quot; Tall Bin Compostable Bags </span></p>
                </td>
                <td class="c7" colspan="1" rowspan="1">
                    <p class="c4"><span class="c10">$ 6.69</span></p>
                </td>
            </tr>
            <tr class="c3">
                <td class="c7" colspan="1" rowspan="1">
                    <p class="c5"><span class="c1">Dish soap:</span></p>
                    <p class="c4"><span>4L Dish Soap </span></p>
                </td>
                <td class="c7" colspan="1" rowspan="1">
                    <p class="c4"><span class="c10">$ 13.97</span></p>
                </td>
            </tr>
            <tr class="c3">
                <td class="c7" colspan="1" rowspan="1">
                    <p class="c5"><span class="c1">Brooms:</span></p>
                    <p class="c4"><span>Angle Broom, with Dust Pan </span></p>
                </td>
                <td class="c7" colspan="1" rowspan="1">
                    <p class="c4"><span class="c10">$ 19.99</span></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p class="c5 c6"><span class="c1"></span></p>
    <p class="c5 c6"><span class="c9"></span></p>
    <p class="c5 c6"><span class="c0"></span></p>
    <p class="c5 c6"><span class="c0"></span></p>
    <p class="c5 c6"><span class="c0"></span></p>
    <p class="c5"><span class="c0">Kitchen:</span></p>
    <p class="c5 c6"><span class="c0"></span></p><a id="t.dedcea7a6afc68de56080b4a8d7c1faecf9cf9ef"></a><a id="t.2"></a>
    <table class="c2">
        <tbody>
            <tr class="c3">
                <td class="c7" colspan="1" rowspan="1">
                    <p class="c5"><span class="c1">Bakeware:</span></p>
                    <p class="c4"><span>Silicone Muffin Pan - White Confetti, 12 Cup</span></p>
                </td>
                <td class="c7" colspan="1" rowspan="1">
                    <p class="c4"><span class="c10">$ 24.99</span></p>
                </td>
            </tr>
            <tr class="c3">
                <td class="c7" colspan="1" rowspan="1">
                    <p class="c5"><span class="c1">Cookware:</span></p>
                    <p class="c4"><span>Cast Iron Skillet - 10.25&quot;/26 cm</span></p>
                </td>
                <td class="c7" colspan="1" rowspan="1">
                    <p class="c4"><span class="c10">$ 46.99</span></p>
                </td>
            </tr>
            <tr class="c3">
                <td class="c7" colspan="1" rowspan="1">
                    <p class="c5"><span class="c1">Serving bowls:</span></p>
                    <p class="c4"><span>8 Piece Round Casserole Dish Set with Lids - French White</span></p>
                </td>
                <td class="c7" colspan="1" rowspan="1">
                    <p class="c4"><span class="c10">$ 59.99</span></p>
                </td>
            </tr>
            <tr class="c3">
                <td class="c7" colspan="1" rowspan="1">
                    <p class="c5"><span class="c1">Trays:</span></p>
                    <p class="c4"><span>Cutlery Tray - White, 12&quot; x 14&quot;</span></p>
                </td>
                <td class="c7" colspan="1" rowspan="1">
                    <p class="c4"><span class="c10">$ 5.99</span></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p class="c5 c6"><span class="c9"></span></p>
</body>

</html>`);

    }
}
