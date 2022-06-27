import { IList } from "../components/List"
import { ECategory, IBuyableItem, IListItem } from "../components/ListItem"

export const randomBoolean = (): boolean => Math.random() > 0.5

export const randomString = (length: number, prefix: string): string => {
    let returnString = ""
    for (let i = 0; i <= length; i++) {
        const randomCharCode = Math.floor(Math.random() * (122-65)) + 65 
        returnString += String.fromCharCode(randomCharCode)
    }

    if (prefix) {
        returnString = prefix + '-' + returnString
    }

    return returnString
}

export const randomInt = (max: number) => Math.floor(Math.random() * max)

export const mockBuyableItem = (): IBuyableItem => {
    return {
        category: ECategory.SNACKS,
        fluid: randomBoolean(),
        _id: randomString(5, "buyableItem-id"),
        name: randomString(30, "name"),
    }
}

export const mockListItem = (id?: string): IListItem => {
    return {
        bought: randomBoolean(),
        buyableItem: mockBuyableItem(),
        _id: id || randomString(5, "id"),
        quantity: randomInt(5),
        votes: randomInt(5)
    }
}

export const mockList: IList = {
    description: "Shopping list sarahs birthday",
    editable: false,
    _id: "TestList",
    lastEdited: new Date(Date.now()),
    items: [
        mockListItem("test1"),
        mockListItem("test2"),
        mockListItem("test3"),
        mockListItem("test4"),
        mockListItem("test5"),
    ]
}
