export const getIDFromModel = (model) => {
    return model.replace(/-/g, "");
}

export const getSSIDFromID = (id) => {
    return "BOXROOM-" + id;
}

export const getIDFromSSID = (ssid) => {
    return ssid.slice(8);
}

export const isBoxroomSSID = (ssid) => {
    return ssid.slice(0, 8) === "BOXROOM-";
}