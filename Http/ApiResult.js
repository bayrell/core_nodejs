"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2018 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.bayrell.org/licenses/APACHE-LICENSE-2.0.html
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
var rtl = require('bayrell-runtime-nodejs').rtl;
var Map = require('bayrell-runtime-nodejs').Map;
var Dict = require('bayrell-runtime-nodejs').Dict;
var Vector = require('bayrell-runtime-nodejs').Vector;
var Collection = require('bayrell-runtime-nodejs').Collection;
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var CoreStruct = require('bayrell-runtime-nodejs').CoreStruct;
var RuntimeConstant = require('bayrell-runtime-nodejs').RuntimeConstant;
class ApiResult extends CoreStruct{
	/**
	 * Returns true if success
	 * @param ApiResult res
	 * @return bool
	 */
	static isSuccess(res){
		return res.success && res.code >= RuntimeConstant.ERROR_OK;
	}
	/**
	 * Set error data
	 * @param int code
	 * @param string error
	 * @param ApiResult res
	 * @return ApiResult
	 */
	static setError(code, error, res){
		if (error == undefined) error="";
		var succes = false;
		if (code >= RuntimeConstant.ERROR_OK){
			succes = true;
		}
		return res.copy((new Map()).set("code", code).set("error", error).set("success", success));
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "RuntimeUI.Http.ApiResult";}
	static getCurrentClassName(){return "RuntimeUI.Http.ApiResult";}
	static getParentClassName(){return "Runtime.CoreStruct";}
	_init(){
		super._init();
		this.__success = false;
		Object.defineProperty(this, "success", { get: function() { return this.__success; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("success") }});
		this.__code = -1;
		Object.defineProperty(this, "code", { get: function() { return this.__code; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("code") }});
		this.__error = "";
		Object.defineProperty(this, "error", { get: function() { return this.__error; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("error") }});
		this.__class_name = "";
		Object.defineProperty(this, "class_name", { get: function() { return this.__class_name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("class_name") }});
		this.__method_name = "";
		Object.defineProperty(this, "method_name", { get: function() { return this.__method_name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("method_name") }});
		this.__text = "";
		Object.defineProperty(this, "text", { get: function() { return this.__text; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("text") }});
		this.__result = null;
		Object.defineProperty(this, "result", { get: function() { return this.__result; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("result") }});
	}
	assignObject(obj){
		if (obj instanceof ApiResult){
			this.__success = obj.__success;
			this.__code = obj.__code;
			this.__error = obj.__error;
			this.__class_name = obj.__class_name;
			this.__method_name = obj.__method_name;
			this.__text = obj.__text;
			this.__result = obj.__result;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "success")this.__success = rtl.convert(value,"bool",false,"");
		else if (variable_name == "code")this.__code = rtl.convert(value,"int",-1,"");
		else if (variable_name == "error")this.__error = rtl.convert(value,"string","","");
		else if (variable_name == "class_name")this.__class_name = rtl.convert(value,"string","","");
		else if (variable_name == "method_name")this.__method_name = rtl.convert(value,"string","","");
		else if (variable_name == "text")this.__text = rtl.convert(value,"string","","");
		else if (variable_name == "result")this.__result = rtl.convert(value,"primitive",null,"");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "success") return this.__success;
		else if (variable_name == "code") return this.__code;
		else if (variable_name == "error") return this.__error;
		else if (variable_name == "class_name") return this.__class_name;
		else if (variable_name == "method_name") return this.__method_name;
		else if (variable_name == "text") return this.__text;
		else if (variable_name == "result") return this.__result;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("success");
			names.push("code");
			names.push("error");
			names.push("class_name");
			names.push("method_name");
			names.push("text");
			names.push("result");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
module.exports = ApiResult;