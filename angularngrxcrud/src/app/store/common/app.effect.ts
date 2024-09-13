import { Inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions } from "@ngrx/effects";

@Injectable()
export class AppEffects{

    constructor(private $action:Actions,private _sanckbar:MatSnackBar){}



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