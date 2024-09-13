import { createAction, props } from "@ngrx/store";
import { Associates } from "../model/associate.model";

export const LOAD_ASSOCIATE='[associate Page]'
export const LOAD_ASSOCIATE_SUCCESS='[associate Page] load asscoiate success'
export const LOAD_ASSOCIATE_FAIL='[associate Page] load asscoiate fail'
export const ADD_ASSOCIATE='[associate Page]add associate'
export const ADD_ASSOCIATE_SUCCESS='[associate Page] add asscoiate success'

export const loadassociate=createAction(LOAD_ASSOCIATE)
export const loadassociatesuccess=createAction(LOAD_ASSOCIATE_SUCCESS,props<{list:Associates[]}>())
export const loadassociatefail=createAction(LOAD_ASSOCIATE_FAIL,props<{errormessage:string}>())

export const addassociate=createAction(ADD_ASSOCIATE,props<{inputdata:Associates}>())
export const addassociatesuccess=createAction(ADD_ASSOCIATE_SUCCESS,props<{inputdata:Associates}>())


