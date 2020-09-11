export const initialState = {
    user:null
};

export const actionTypes = {
    SET_USER: "SET_USER"
};

const reducer =(state,actions)=>{
    console.log("[reducer]actions",actions);
    switch(actions.type){
        case actionTypes.SET_USER:
            console.log("[reducer]state");
            return{
                ...state,
                user:actions.user,
            };
        default:
            return state;
    }
};

export default reducer;