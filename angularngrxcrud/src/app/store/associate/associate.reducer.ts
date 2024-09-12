import { createReducer, on } from "@ngrx/store";
import { loadassociatefail, loadassociatesuccess } from "./associate.action";
import { AssociateState } from "./associate.state";


const _associateReducer=createReducer(AssociateState,
    on(loadassociatesuccess,(state,action)=>{
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
    })
)

export function associateReducer(state:any,action:any){
    return _associateReducer(state,action);
}