import { faker } from "@faker-js/faker";
import ISetting from "../../components/setting/model/ISetting";
import SettingScope from "../../components/setting/model/SettingScope";
import SettingModel from "../../components/setting/model/Setting"

export const create = async (count: number = 1, params?: Partial<ISetting>) => {
    const Settings = []
    for (let index = 0; index < count; index++) {
        const defaultSettingParams = {
            key: faker.lorem.text(),
            value: faker.lorem.text(),
            scope: faker.helpers.arrayElement([
                SettingScope.PRIVATE,
                SettingScope.PUBLIC
            ]),
            version: faker.string.alphanumeric,
        }
        const settingParams = { ...defaultSettingParams, ...params }
        const newSetting = new SettingModel(settingParams)
        await newSetting.save()
        Settings.push(newSetting)
    }
    return Settings
}