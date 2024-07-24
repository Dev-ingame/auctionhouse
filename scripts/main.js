import { world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

const defaultData = {};

const loadData = () => {
    const data = world.getDynamicProperty("auctionhouse");
    if (!data) {
        saveData(defaultData);
    } else {
        return data;
    }
};

const saveData = (value) => {
    const data = world.setDynamicProperty(
        "auctionhouse",
        JSON.stringify(value)
    );
};



const mainGui = () => {
    new ActionFormData()
    .title("")
}