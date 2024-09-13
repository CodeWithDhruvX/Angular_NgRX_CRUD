import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { AssociateService } from "../../services/associate.service";
import { addassociate, addassociatesuccess, getassociate, getassociatesuccess, loadassociate, loadassociatefail, loadassociatesuccess } from "./associate.action";
import { showalert } from "../common/app.action";

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

    _getassociate=createEffect(()=>
        this.actin$.pipe(
            ofType(getassociate),
            switchMap((action)=>{
                return this.service.create(action.inputdata).pipe(
                    switchMap((data)=>{
                        return of(getassociatesuccess({inputdata:action.inputdata}),
                    showalert({message:'Created Successfully',resulttype:'pass'}))
                    }),
                    catchError((_error)=>of(showalert({message:'Failed to create associate'+_error.message,resulttype:'fail'})))
                );
            })
        )
    )


}