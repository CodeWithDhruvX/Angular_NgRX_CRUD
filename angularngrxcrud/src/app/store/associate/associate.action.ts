import { createAction, props } from "@ngrx/store";
import { Associates } from "../model/associate.model";

export const LOAD_ASSOCIATE='[associate Page]'
export const LOAD_ASSOCIATE_SUCCESS='[associate Page] load asscoiate success'
export const LOAD_ASSOCIATE_FAIL='[associate Page] load asscoiate fail'

export const loadassociate=createAction(LOAD_ASSOCIATE)
export const loadassociatesuccess=createAction(LOAD_ASSOCIATE_SUCCESS,props<{list:Associates[]}>())
export const loadassociatefail=createAction(LOAD_ASSOCIATE_FAIL,props<{errormessage:string}>())