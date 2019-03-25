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
var CoreEvent = require('bayrell-runtime-nodejs').CoreEvent;
var CoreStruct = require('bayrell-runtime-nodejs').CoreStruct;
class ModelChange extends CoreEvent{
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "RuntimeUI.Events.ModelChange";}
	static getCurrentClassName(){return "RuntimeUI.Events.ModelChange";}
	static getParentClassName(){return "Runtime.CoreEvent";}
	_init(){
		super._init();
		this.__model = null;
		Object.defineProperty(this, "model", { get: function() { return this.__model; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("model") }});
	}
	assignObject(obj){
		if (obj instanceof ModelChange){
			this.__model = obj.__model;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "model")this.__model = rtl.convert(value,"Runtime.CoreStruct",null,"");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "model") return this.__model;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("model");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
module.exports = ModelChange;