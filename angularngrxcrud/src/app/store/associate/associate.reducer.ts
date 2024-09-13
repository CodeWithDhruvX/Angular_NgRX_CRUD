import { createReducer, on } from "@ngrx/store";
import { addassociatesuccess, loadassociatefail, loadassociatesuccess } from "./associate.action";
import { AssociateState } from "./associate.state";


const _associateReducer=createReducer(AssociateState,
    on(loadassociatesuccess,(state,action)=>{
        debugger
        return {
            ...state,
            list:[...action.list],
            errormessage:''
        }
    }),
    on(loadassociatefail,(state,action)=>{
        return {
            ...state,
            list:[],
            errormessage:action.errormessage
        }
    }),
    on(addassociatesuccess,(state,action)=>{
        const _maxid=Math.max(...state.list.map(o=>o.id));
        const _newdata={...action.inputdata};
        _newdata.id=_maxid+1;
        state.associateobj.id=_maxid+1;
        return {
            ...state,
            list:[...state.list,_newdata],
            errormessage:''
        }
    })
)

export function associateReducer(state:any,action:any){
    return _associateReducer(state,action);
}