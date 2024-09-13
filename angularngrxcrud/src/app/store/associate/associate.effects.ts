import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { AssociateService } from "../../services/associate.service";
import { addassociate, addassociatesuccess, loadassociate, loadassociatefail, loadassociatesuccess } from "./associate.action";

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
            exhaustMap((action)=>{
                return this.service.create(action.inputdata).pipe(
                    map((data)=>{
                        return addassociatesuccess({inputdata:action.inputdata})
                    }),
                    catchError((_error)=>of(loadassociatefail({errormessage:_error.message})))
                );
            })
        )
    )
}