export default (actionMap, defaultReturn) =>
    (state, action) =>
        (actionMap[action.type] || ( d => () => (defaultReturn || d)))
            (state || null)
                (action.payload);
