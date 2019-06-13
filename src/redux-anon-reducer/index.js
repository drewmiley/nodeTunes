export default (actionMap, initialReturn = null, defaultReturn = undefined) =>
    (state, action) =>
        (actionMap[action.type] || ( d => () => (defaultReturn === undefined ? d : defaultReturn)))
        //             (state === Object(state) ? Object.assign({}, state) : state)
            (state || initialReturn)
                (action.payload);
