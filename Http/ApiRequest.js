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
var Request = require('./Request.js');
class ApiRequest extends CoreStruct{
	/**
	 * Assing request
	 * @param Request request
	 * @param ApiRequest req
	 * @return ApiRequest
	 */
	static assignData(request, req){
		if (request == null){
			return ;
		}
		var data = new Map();
		/* Get data */
		request.payload.each((key, value) => {
			data.set(key, value);
		});
		return req.copy((new Map()).set("data", data));
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "RuntimeUI.Http.ApiRequest";}
	static getCurrentClassName(){return "RuntimeUI.Http.ApiRequest";}
	static getParentClassName(){return "Runtime.CoreStruct";}
	_init(){
		super._init();
		this.__data = null;
		Object.defineProperty(this, "data", { get: function() { return this.__data; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("data") }});
	}
	assignObject(obj){
		if (obj instanceof ApiRequest){
			this.__data = obj.__data;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "data")this.__data = rtl.convert(value,"Dict",null,"mixed");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "data") return this.__data;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("data");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
module.exports = ApiRequest;