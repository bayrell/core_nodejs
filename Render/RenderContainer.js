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
class RenderContainer extends CoreStruct{
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "RuntimeUI.Render.RenderContainer";}
	static getCurrentClassName(){return "RuntimeUI.Render.RenderContainer";}
	static getParentClassName(){return "Runtime.CoreStruct";}
	_init(){
		super._init();
		this.__title = "";
		Object.defineProperty(this, "title", { get: function() { return this.__title; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("title") }});
		this.__content = "";
		Object.defineProperty(this, "content", { get: function() { return this.__content; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("content") }});
		this.__assets = null;
		Object.defineProperty(this, "assets", { get: function() { return this.__assets; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("assets") }});
		this.__components = null;
		Object.defineProperty(this, "components", { get: function() { return this.__components; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("components") }});
		this.__css_vars = new Dict();
		Object.defineProperty(this, "css_vars", { get: function() { return this.__css_vars; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("css_vars") }});
		this.__view = "";
		Object.defineProperty(this, "view", { get: function() { return this.__view; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("view") }});
		this.__model = null;
		Object.defineProperty(this, "model", { get: function() { return this.__model; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("model") }});
	}
	assignObject(obj){
		if (obj instanceof RenderContainer){
			this.__title = obj.__title;
			this.__content = obj.__content;
			this.__assets = obj.__assets;
			this.__components = obj.__components;
			this.__css_vars = obj.__css_vars;
			this.__view = obj.__view;
			this.__model = obj.__model;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "title")this.__title = rtl.convert(value,"string","","");
		else if (variable_name == "content")this.__content = rtl.convert(value,"string","","");
		else if (variable_name == "assets")this.__assets = rtl.convert(value,"Collection",null,"string");
		else if (variable_name == "components")this.__components = rtl.convert(value,"Collection",null,"string");
		else if (variable_name == "css_vars")this.__css_vars = rtl.convert(value,"Dict",new Dict(),"string");
		else if (variable_name == "view")this.__view = rtl.convert(value,"string","","");
		else if (variable_name == "model")this.__model = rtl.convert(value,"Runtime.CoreStruct",null,"");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "title") return this.__title;
		else if (variable_name == "content") return this.__content;
		else if (variable_name == "assets") return this.__assets;
		else if (variable_name == "components") return this.__components;
		else if (variable_name == "css_vars") return this.__css_vars;
		else if (variable_name == "view") return this.__view;
		else if (variable_name == "model") return this.__model;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("title");
			names.push("content");
			names.push("assets");
			names.push("components");
			names.push("css_vars");
			names.push("view");
			names.push("model");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
module.exports = RenderContainer;