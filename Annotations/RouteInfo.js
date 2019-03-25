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
var re = require('bayrell-runtime-nodejs').re;
var CoreStruct = require('bayrell-runtime-nodejs').CoreStruct;
class RouteInfo extends CoreStruct{
	/**
	 * Init struct data
	 */
	initData(){
		var uri_match = this.uri;
		uri_match = re.replace("\\/", "\\/", uri_match);
		var matches = re.matchAll("{(.*?)}", this.uri);
		if (matches){
			var params = matches.get(0, null);
			params.each((name) => {
				uri_match = re.replace("{"+rtl.toString(name)+"}", "([^\\/]*?)", uri_match);
			});
			this.assignValue("params", params.toCollection());
			obj = obj.setIm("params", params.toCollection());
		}
		else {
			this.assignValue("params", null);
		}
		this.assignValue("uri_match", uri_match);
	}
	/**
	 * Get params
	 * @return Map<string>
	 */
	static getParams(matches, info){
		if (info.params == null){
			return null;
		}
		var res = new Map();
		info.params.each((name, pos) => {
			var match = matches.get(pos, null);
			if (match){
				res.set(name, match);
			}
		});
		return res.toDict();
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "RuntimeUI.Annotations.RouteInfo";}
	static getCurrentClassName(){return "RuntimeUI.Annotations.RouteInfo";}
	static getParentClassName(){return "Runtime.CoreStruct";}
	_init(){
		super._init();
		this.__uri = "";
		Object.defineProperty(this, "uri", { get: function() { return this.__uri; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("uri") }});
		this.__name = "";
		Object.defineProperty(this, "name", { get: function() { return this.__name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("name") }});
		this.__class_name = "";
		Object.defineProperty(this, "class_name", { get: function() { return this.__class_name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("class_name") }});
		this.__method_name = "";
		Object.defineProperty(this, "method_name", { get: function() { return this.__method_name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("method_name") }});
		this.__uri_match = "";
		Object.defineProperty(this, "uri_match", { get: function() { return this.__uri_match; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("uri_match") }});
		this.__params = null;
		Object.defineProperty(this, "params", { get: function() { return this.__params; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("params") }});
	}
	assignObject(obj){
		if (obj instanceof RouteInfo){
			this.__uri = obj.__uri;
			this.__name = obj.__name;
			this.__class_name = obj.__class_name;
			this.__method_name = obj.__method_name;
			this.__uri_match = obj.__uri_match;
			this.__params = obj.__params;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "uri")this.__uri = rtl.convert(value,"string","","");
		else if (variable_name == "name")this.__name = rtl.convert(value,"string","","");
		else if (variable_name == "class_name")this.__class_name = rtl.convert(value,"string","","");
		else if (variable_name == "method_name")this.__method_name = rtl.convert(value,"string","","");
		else if (variable_name == "uri_match")this.__uri_match = rtl.convert(value,"string","","");
		else if (variable_name == "params")this.__params = rtl.convert(value,"Collection",null,"string");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "uri") return this.__uri;
		else if (variable_name == "name") return this.__name;
		else if (variable_name == "class_name") return this.__class_name;
		else if (variable_name == "method_name") return this.__method_name;
		else if (variable_name == "uri_match") return this.__uri_match;
		else if (variable_name == "params") return this.__params;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("uri");
			names.push("name");
			names.push("class_name");
			names.push("method_name");
			names.push("uri_match");
			names.push("params");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
module.exports = RouteInfo;