const batteries =
    [{
        "batteryName": "WKL-78",
        "capacityAh": 2.3,
        "voltage": 14.4,
        "maxDraw": 3.2,
        "endVoltage": 10,
    },
    {
        "batteryName": "WKL-140",
        "capacityAh": 4.5,
        "voltage": 14.4,
        "maxDraw": 9.2,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-78",
        "capacityAh": 2.5,
        "voltage": 14.5,
        "maxDraw": 10,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-140",
        "capacityAh": 3.6,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 5,
    },
    {
        "batteryName": "IOP-E78",
        "capacityAh": 6.6,
        "voltage": 14.4,
        "maxDraw": 10.5,
        "endVoltage": 8,
    },
    {
        "batteryName": "IOP-E140",
        "capacityAh": 9.9,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 10,
    },
    {
        "batteryName": "IOP-E188",
        "capacityAh": 13.2,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C65",
        "capacityAh": 4.9,
        "voltage": 14.8,
        "maxDraw": 4.9,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C85",
        "capacityAh": 6.3,
        "voltage": 14.4,
        "maxDraw": 6.3,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C140",
        "capacityAh": 9.8,
        "voltage": 14.8,
        "maxDraw": 10,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C290",
        "capacityAh": 19.8,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 12,
    }]
;

const camera =
    [{
        "brand": "Cakon",
        "model": "ABC 3000M",
        "powerConsumptionWh": 35.5,
    },
    {
        "brand": "Cakon",
        "model": "ABC 5000M",
        "powerConsumptionWh": 37.2,
    },
    {
        "brand": "Cakon",
        "model": "ABC 7000M",
        "powerConsumptionWh": 39.7,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9000M",
        "powerConsumptionWh": 10.9,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9900M",
        "powerConsumptionWh": 15.7,
    },
    {
        "brand": "Go MN",
        "model": "UIK 110C",
        "powerConsumptionWh": 62.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 210C",
        "powerConsumptionWh": 64.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 230C",
        "powerConsumptionWh": 26.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 250C",
        "powerConsumptionWh": 15.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 270C",
        "powerConsumptionWh": 20.3,
    },
    {
        "brand": "VANY",
        "model": "CEV 1100P",
        "powerConsumptionWh": 22,
    },
    {
        "brand": "VANY",
        "model": "CEV 1300P",
        "powerConsumptionWh": 23,
    },
    {
        "brand": "VANY",
        "model": "CEV 1500P",
        "powerConsumptionWh": 24,
    },
    {
        "brand": "VANY",
        "model": "CEV 1700P",
        "powerConsumptionWh": 25,
    },
    {
        "brand": "VANY",
        "model": "CEV 1900P",
        "powerConsumptionWh": 26,
    }]
    ;
    
    // console.log(battery);
    // console.log(camera);
    
    config = {
        appTitle : 'Battery Finder Program'
    }
const target = document.getElementById('target');
let cameraBrand = Array.from(new Set(camera.map((c) => c.brand)))
let cameraModel = Array.from(new Set(camera.map((c) => c.model)))
console.log(cameraModel)

// Viewクラス
// 画面描画のクラス
class View {

    static getTitleHTMLString() {
        let divContainer = document.createElement("div");
        divContainer.classList.add("container")
        divContainer.innerHTML = 
        `
        <nav class="navbar navbar-dark bg-primary">
            <div class="container-fluid d-flex justify-content-center">
                <span class="navbar-brand fs-1">${config.appTitle}</span>
            </div>
        </nav>
        `
        return divContainer;
    }

    static getHTMLString() {
        
        let mainDiv = document.createElement("div");
        mainDiv.classList.add("container")
        mainDiv.innerHTML = 
        `
        <div class="step1 container p-2">
            <h3>Step1: Select your brand</h3>
            <div class="input-group mb-3">
                <select class="form-select" id="input-brand" onchange="Controller.onChangeBrand()">
                    ${cameraBrand.map((camera, index) => '<option value='+ index + '>' + camera + '</option>')}
                </select>
            </div>
        </div>
        <div class="step2 container p-2">
            <h3>Step2: Select your Model</h3>
            <div class="input-group mb-3">
                <select class="form-select" id="input-model" onchange="Controller.onChangeModel()">
                    ${cameraModel.map((camera, index) => '<option value='+ index + '>' + camera + '</option>')}
                </select>
            </div>
        </div>
        <div class="step3 container p-2">
            <h3>Step3: Input Accessory Power Consumption</h3>
            <div class="mb-3 d-flex align-items-end">
                <label class="form-label px-2">
                    <input 
                        id="power-consumption" 
                        type="number" 
                        class="form-control" 
                        value=0
                        max="100"
                        min="0"
                        onchange="Controller.searchBattery()"
                    />
                </label>
                <p>W</p>
            </div>
        </div>
        <div class="step4 container p-2">
            <h3>Step4: Choose Your Batery</h3>
            <div id="card-target"></div>
            <div class="card" id="battery-card"></div>
        </div>
        <div class="py-2">
            <button type="button" class="btn btn-primary btn-lg" onclick="Controller.reset()">リセット</button>
        </div>
        `

        return mainDiv;
    }
    static getBatteryCardHTMLString(batteryList, userCamera) {
        console.log(batteryList)
        let cardId = document.getElementById("card-target");
        cardId.innerHTML = ''
        for(let battery of batteryList) {
            let estimateTime = battery.getEstimateTime(userCamera)
            let cardDiv = document.createElement("div");
            cardDiv.classList.add("card")
            cardDiv.innerHTML = 
            `
            <div class="card-body d-flex justify-content-between">
                <h5 id="battery-name" class="card-title mx-2">${battery.batteryName}</h5>
                <p class="card-text mx-2">Estimated <span>${estimateTime}</span> hours on selected setup</p>
            </div>
            
            `
            cardId.append(cardDiv);
        }
        console.log(cardId)
    }
}
// Controllerクラス
// 入力を受け取ってインスタンス作成
// 
class Controller {
    constructor(inputBrand, inputModel, inputAccesaryPower) {
        this.inputBrand = inputBrand;
        this.inputModel = inputModel;
        this.inputAccesaryPower = inputAccesaryPower;
    }

    static onChangeBrand() {
        console.log("onChangeBrand")
        const inputBrand = document.getElementById("input-brand");
        const inputModel = document.getElementById("input-model");
        // 選択したブランドで絞ったモデルの配列をcameraModelに代入し、STEP2のoptionに入れる
        cameraModel = Array.from(new Set(camera.filter((c)=>c.brand === cameraBrand[inputBrand.value]).map((c)=>c.model)))
        inputModel.innerHTML = `${cameraModel.map((camera, index) => '<option value='+ index + '>' + camera + '</option>')}`

        this.searchBattery();
    }
    static onChangeModel() {
        console.log("onChangeModel")
        const inputBrand = document.getElementById("input-brand");
        const inputModel = document.getElementById("input-model");

        // 選択したモデルのブランドの配列をcameraBrandへ代入し、STEP1のoptionに入れる
        cameraBrand = Array.from(new Set(camera.filter((c)=>cameraModel[inputModel.value] === c.model).map((c)=>c.brand)))
        inputBrand.innerHTML = `${cameraBrand.map((camera, index) => '<option value='+ index + '>' + camera + '</option>')}`

        this.searchBattery();
    }

    static searchBattery() {
        const inputBrand = document.getElementById("input-brand");
        const inputModel = document.getElementById("input-model");
        const inputAccesaryPower = document.getElementById("power-consumption");

        let userInput = new Controller(
            cameraBrand[inputBrand.value],
            cameraModel[inputModel.value],
            inputAccesaryPower.value,
        );
        let powerConsumptionWh = camera.filter((c) => c.brand===userInput.inputBrand && c.model == userInput.inputModel)[0]["powerConsumptionWh"]

        let userCamera = new Camera(
            userInput.inputBrand,
            userInput.inputModel,
            powerConsumptionWh
        )
        console.log(userInput)
        let batteryList = batteries
            .filter((b)=>userCamera.powerConsumptionWh <= b.maxDraw * b.endVoltage + userInput.inputAccesaryPower)
            .map((b)=>new Battery(b.batteryName, b.capacityAh, b.voltage, b.maxDraw, b.endVoltage));
        
        if (batteryList) {
            View.getBatteryCardHTMLString(batteryList, userCamera)
        }

    }
    static reset() {
        console.log("reset")
        cameraBrand = Array.from(new Set(camera.map((c) => c.brand)))
        cameraModel = Array.from(new Set(camera.map((c) => c.model)))
        target.innerHTML = ''
        target.append(View.getTitleHTMLString(), View.getHTMLString());
    }

}
// カメラとアクセサリーの合計消費電力を受け取ってその電池の持続時間を返す関数
// 電池クラス
// 合計消費電力が電池の終止電圧時の最大消費電力を上回る場合、その電池は使用できない
class Battery {
    constructor(batteryName, capacityAh, voltage, maxDraw, endVoltage) {
        this.batteryName = batteryName;
        this.capacityAh = capacityAh;
        this.voltage = voltage;
        this.maxDraw = maxDraw;
        this.endVoltage = endVoltage;
    }

    getEstimateTime(usercamera) {
        let time = this.voltage * this.capacityAh / usercamera.powerConsumptionWh
        return Math.floor(time * 100) / 100
    }


}

// カメラクラス
class Camera {

    constructor(brand, model, powerConsumptionWh) {
        this.brand = brand;
        this.model = model;
        this.powerConsumptionWh = powerConsumptionWh;
    }

}

console.log(target)
target.append(View.getTitleHTMLString(), View.getHTMLString());