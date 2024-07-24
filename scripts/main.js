import { Player, world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { config } from "./config";
import { getPathByName } from "./items";

const defaultData = {
    DEVFEV360: {
        diamond: { price: 32, amount: 5 },
    },
    /*
    DEVFEV3602: {
        dirt: { price: 32, amount: 5 },
    },
    DEVFEV3603: {
        diamond: { price: 32, amount: 5 },
    },
    */
};

const loadData = () => {
    const data = JSON.parse(world.getDynamicProperty("auctionhouse"));
    if (!data) {
        saveData(defaultData);
    } else {
        // console.warn(data);
        const users = Object.keys(data);
        const items = Object.values(data);

        console.warn(users);
        console.warn(JSON.stringify(items));
        console.warn(JSON.stringify(data));

        return { users, items, data };
    }
};

const saveData = (value) => {
    const data = world.setDynamicProperty(
        "auctionhouse",
        JSON.stringify(value)
    );
};

world.afterEvents.worldInitialize.subscribe((ev) => {
    const data = loadData();
    // console.warn(data.length);
    if (!data) {
        console.warn("No default Data \n Created One");
        saveData(defaultData);
    } else {
        return data;
    }
});

/**
 *
 * @param {Player} source
 *
 */
const AcHouse = (source) => {
    const { data, items, users } = loadData();
    const form = new ActionFormData().title("§eAuction House").button("first");

    console.warn(JSON.stringify(firstValue));

    for (let i = 0; i < users.length; i++) {
        const path = getPathByName(items[0]);
        console.warn(path);
        form.button("", path);
    }
    form.show(source);
};

/**
 *
 * @param {Player} source
 */
const mainGui = (source) => {
    AcHouse(source);
};
world.afterEvents.chatSend.subscribe((ev) => {
    const data = ev.message;
    const source = ev.sender;

    // console.warn("first")
    if (!data.startsWith(config.prefix)) return;
    // console.warn("pass")
    const formated = data.replace(config.prefix, "");
    // console.warn(formated);
    // console.warn(data)

    switch (formated) {
        case "test":
            //no good
            while (source.onScreenDisplay) {}
            mainGui(source);
            break;

        case "data":
            console.warn("data reset");
            saveData(defaultData);
            break;

        default:
            break;
    }
});

world.afterEvents.itemUse.subscribe((ev) => {
    const item = ev.itemStack;
    const entity = ev.source;

    if (item.typeId == "minecraft:stick") mainGui(entity);
});
