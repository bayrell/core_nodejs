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
class Response extends CoreStruct{
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "RuntimeUI.Http.Response";}
	static getCurrentClassName(){return "RuntimeUI.Http.Response";}
	static getParentClassName(){return "Runtime.CoreStruct";}
	_init(){
		super._init();
		this.__http_code = 200;
		Object.defineProperty(this, "http_code", { get: function() { return this.__http_code; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("http_code") }});
		this.__content = "";
		Object.defineProperty(this, "content", { get: function() { return this.__content; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("content") }});
		this.__cookies = null;
		Object.defineProperty(this, "cookies", { get: function() { return this.__cookies; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("cookies") }});
		this.__headers = null;
		Object.defineProperty(this, "headers", { get: function() { return this.__headers; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("headers") }});
	}
	assignObject(obj){
		if (obj instanceof Response){
			this.__http_code = obj.__http_code;
			this.__content = obj.__content;
			this.__cookies = obj.__cookies;
			this.__headers = obj.__headers;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "http_code")this.__http_code = rtl.convert(value,"int",200,"");
		else if (variable_name == "content")this.__content = rtl.convert(value,"string","","");
		else if (variable_name == "cookies")this.__cookies = rtl.convert(value,"Dict",null,"Cookie");
		else if (variable_name == "headers")this.__headers = rtl.convert(value,"Dict",null,"string");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "http_code") return this.__http_code;
		else if (variable_name == "content") return this.__content;
		else if (variable_name == "cookies") return this.__cookies;
		else if (variable_name == "headers") return this.__headers;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("http_code");
			names.push("content");
			names.push("cookies");
			names.push("headers");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
module.exports = Response;