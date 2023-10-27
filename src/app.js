const Slider = require('./slider');
const { Client } = require('touchportal-api');
const TPClient = new Client();
const pluginId = 'TPGenericSlider';
const sliders = {};
const createdStates = [];

TPClient.on("Info", (data) => {
    console.log("TP-GenericSlider Started");
});

TPClient.on("ConnectorShortIdNotification", (data) => {
    let idBits = data.connectorId.split("|");

    if (!(
        idBits[0].endsWith("tpgenericslider_range_connector") && idBits.length === 4
    )) {
        console.log("Invalid Generic Slider ID (contains the | character, or too long)");
        return;
    }

    let sliderIdBits = idBits[1].split("=");
    let sliderId = "";
    if (sliderIdBits.length > 2) {
        console.log("Invalid Generic Slider ID (contains the = character)");
        return;
    } else {
        sliderId = sliderIdBits[1];
    }

    switch(idBits.length) {
        case 2:
            sliders[sliderId] = new Slider(data.shortId, sliderId);
            break;
        case 4:
            minBits = idBits[2].split("=");
            maxBits = idBits[3].split("=");
            sliders[sliderId] = new Slider(data.shortId, sliderId, Number(minBits[1]), Number(maxBits[1]));

            if (!createdStates.includes(sliderId)) {
                createdStates.push(sliderId);
                TPClient.createState("tpgenericslider_" + sliderId, sliderId, Number(minBits[1]), undefined);
            }

            break;
    }
});

TPClient.on("ConnectorChange", (data) => {
    console.log("TP-GenericSlider Connector Change");
    switch(data.connectorId) {
        case "tpgenericslider_range_connector":
            let params = {};
            data.data.forEach((item) => { params[item.id] = item.value; });

            if(sliders.hasOwnProperty(params.tpsliderId)) {
                let stateValue =  sliders[params.tpsliderId].valueFromSlider(data.value);
                TPClient.stateUpdate("tpgenericslider_%s" + params.tpsliderId, stateValue);
            }
            break;
    }
});

TPClient.on("Action", (data) => {
    console.log("TP-GenericSlider Action");

    switch(data.actionId) {
        case "tpgenericslider_set_value":
            let params = {};
            data.data.forEach((item) => { params[item.id] = item.value; });
            if(sliders.hasOwnProperty(params.tpsliderId)) {
                let sliderValue =  sliders[params.tpsliderId].valueToSlider(params.tpsliderValue);
                TPClient.stateUpdate("tpgenericslider_%s" + params.tpsliderId, params.tpsliderValue);
                TPClient.connectorUpdate(sliders[params.tpsliderId].shortId, sliderValue, undefined, true);
            }
            break;
    }
});

TPClient.on("Close", (data) => {
    console.log("TP-GenericSlider Closing");
    createdStates.forEach((item) => { TPClient.removeState("tpgenericslider_%s" + item); });
    process.exit(0);
});

//Connects and Pairs to Touch Portal via Socket
TPClient.connect({ pluginId });
