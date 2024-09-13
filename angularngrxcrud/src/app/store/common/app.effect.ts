import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { emptyaction, showalert } from "./app.action";
import { exhaustMap, map } from "rxjs";

@Injectable()
export class AppEffects{

    constructor(private $action:Actions,private _sanckbar:MatSnackBar){}


    _showalert=createEffect(()=>
        this.$action.pipe(
            ofType(showalert),
            exhaustMap((action)=>{
                return this.shownackalert(action.message,action.resulttype).afterDismissed().pipe(
                    map(()=>{
                        return emptyaction();
                    })
                )
            })
        )        
    )


    shownackalert(message:string,resultytpe:string=''){
        let _class=resultytpe==='pass'?'green-snackbar':'red-snackbar';
        return this._sanckbar.open(message,'OK',{
            verticalPosition:'top',
            horizontalPosition:'end',
            duration:5000,
            panelClass:[_class]
        });

    }

}