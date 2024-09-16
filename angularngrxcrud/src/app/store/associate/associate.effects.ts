import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { AssociateService } from "../../services/associate.service";
import { showalert } from "../common/app.action";
import { addassociate, addassociatesuccess, deleteassociate, getassociate, getassociatesuccess, loadassociate, loadassociatefail, loadassociatesuccess, updateassociate, updateassociatesuccess } from "./associate.action";

@Injectable()
export class AssociateEffects{

    constructor(private actin$:Actions,private service:AssociateService){}


    _loadassociate=createEffect(()=>
        this.actin$.pipe(
            ofType(loadassociate),
            exhaustMap((action)=>{
                return this.service.getAll().pipe(
                    map((data)=>{
                        return loadassociatesuccess({list:data})
                    }),
                    catchError((_error)=>of(loadassociatefail({errormessage:_error.message})))
                );
            })
        )
    )

    _addassociate=createEffect(()=>
        this.actin$.pipe(
            ofType(addassociate),
            map((action) => {
                const updatedInputData = {
                    ...action.inputdata,
                    id: action.length+1 // Assigning action.length to inputdata.id
                  };
                  
                  // Return the updated action with the modified inputdata
                  return { ...action, inputdata: updatedInputData };
            }),
            switchMap((action)=>{
                return this.service.create(action.inputdata).pipe(
                    switchMap((data)=>{
                        return of(addassociatesuccess({inputdata:action.inputdata}),
                    showalert({message:'Created Successfully',resulttype:'pass'}))
                    }),
                    catchError((_error)=>of(showalert({message:'Failed to create associate',resulttype:'fail'})))
                );
            })
        )
    )

    _getassociate = createEffect(() =>
        this.actin$.pipe(
            ofType(getassociate),
            exhaustMap((action) => {
                return this.service.getbycode(action.id).pipe(
                    map((data) => {
                        return getassociatesuccess({ obj: data })
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to fetch data :' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

    _updateassociate=createEffect(()=>
        this.actin$.pipe(
            ofType(updateassociate),
            switchMap((action)=>{
                return this.service.update(action.inputdata).pipe(
                    switchMap((data)=>{
                        return of(updateassociatesuccess({inputdata:action.inputdata}),
                    showalert({message:'Updated Successfully',resulttype:'pass'}))
                    }),
                    catchError((_error)=>of(showalert({message:'Failed to update associate',resulttype:'fail'})))
                );
            })
        )
    )

    _deleteassociate=createEffect(()=>
        this.actin$.pipe(
            ofType(deleteassociate),
            switchMap((action)=>{
                return this.service.delete(action.code).pipe(
                    switchMap((data)=>{
                        return of(deleteassociate({code:action.code}),
                    showalert({message:'Deleted Successfully',resulttype:'pass'}))
                    }),
                    catchError((_error)=>of(showalert({message:'Failed to deleted associate',resulttype:'fail'})))
                );
            })
        )
    )
        

}