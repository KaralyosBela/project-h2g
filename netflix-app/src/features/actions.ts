export const customAction = (data: string) => {
    return {
        type: "CUSTOM_ACTION",
        payload: data
    }
}

// Use the initialState as a default value
export default function (state: any = null, action: any) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        case "CUSTOM_ACTION":
        console.log("Custom action finished.");
        return null;
        break;
        default:
            return null;
    }
  }