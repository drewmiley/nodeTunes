export default (actionMap, initialReturn = null) =>
    (state, action) =>
        (actionMap[action.type] || ( d => () => d))
            (state !== undefined ? (state === Object(state) && !Array.isArray(state) ? Object.assign({}, state) : state) : initialReturn)
                (action.payload);
