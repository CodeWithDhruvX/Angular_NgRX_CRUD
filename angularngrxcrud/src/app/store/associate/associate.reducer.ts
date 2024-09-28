import { createReducer, on } from "@ngrx/store";
import { addassociatesuccess, deleteassociate, deleteassociatesuccess, getassociatesuccess, loadassociatefail, loadassociatesuccess, openpopup, updateassociatesuccess } from "./associate.action";
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
    }),
    on(getassociatesuccess,(state,action)=>{
        return {
            ...state,
            associateobj:action.obj,
            errormessage:''
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
    }),
    on(updateassociatesuccess,(state,action)=>{
        const _newdata=state.list.map(o=>{
            return o.id===action.inputdata.id?action.inputdata:o
        });

        return {
            ...state,
            list:_newdata,
            errormessage:''
        }
    }),
    on(deleteassociatesuccess,(state,action)=>{
        const _newdata=state.list.filter(o=>o.id!==action.code)

        return {
            ...state,
            list:_newdata,
            errormessage:''
        }
    }),
    on(openpopup,(state,action)=>{
        return {
            ...state,
            associateobj:{
                id: 0,
                name: "",
                email: "",
                phone: "",
                type: "CUSTOMER",
                address: "",
                associategroup: "level1",
                status: true
            }
        }
    }),
)

export function associateReducer(state:any,action:any){
    return _associateReducer(state,action);
}