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
var RouteInfo = require('../Annotations/RouteInfo.js');
var Request = require('../Http/Request.js');
var Response = require('../Http/Response.js');
var Session = require('../Http/Session.js');
var WebFile = require('../Http/WebFile.js');
var RenderContainer = require('./RenderContainer.js');
var RenderHelper = require('./RenderHelper.js');
class WebContainer extends CoreStruct{
	/**
	 * Returns assets
	 * @param string layout_class_name
	 * @param CoreLayoutModel layout_data
	 * @param string view_class_name
	 * @param CoreStruct view_data
	 * @return Response
	 */
	static responsePage(layout_class_name, layout_data, view_class_name, view_data){
		/* Render view */
		var content = RenderHelper.render(view_class_name, view_data);
		/* Render layout */
		if (layout_class_name != "" && layout_data != null && layout_data instanceof RenderContainer){
			var components = RenderHelper.getAllComponents((new Vector()).push(layout_class_name).push(view_class_name));
			var assets = RenderHelper.loadAssetsFromComponents(components, layout_data);
			layout_data = RenderHelper.initRenderContainer(layout_data);
			layout_data = layout_data.copy((new Map()).set("assets", assets).set("components", components).set("content", content).set("view", view_class_name).set("model", view_data));
			content = RenderHelper.render(layout_class_name, layout_data);
		}
		return new Response((new Map()).set("content", content));
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "RuntimeUI.Render.WebContainer";}
	static getCurrentClassName(){return "RuntimeUI.Render.WebContainer";}
	static getParentClassName(){return "Runtime.CoreStruct";}
	_init(){
		super._init();
		this.__request = null;
		Object.defineProperty(this, "request", { get: function() { return this.__request; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("request") }});
		this.__response = null;
		Object.defineProperty(this, "response", { get: function() { return this.__response; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("response") }});
		this.__route_info = null;
		Object.defineProperty(this, "route_info", { get: function() { return this.__route_info; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("route_info") }});
		this.__cookies = null;
		Object.defineProperty(this, "cookies", { get: function() { return this.__cookies; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("cookies") }});
		this.__params = null;
		Object.defineProperty(this, "params", { get: function() { return this.__params; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("params") }});
	}
	assignObject(obj){
		if (obj instanceof WebContainer){
			this.__request = obj.__request;
			this.__response = obj.__response;
			this.__route_info = obj.__route_info;
			this.__cookies = obj.__cookies;
			this.__params = obj.__params;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "request")this.__request = rtl.convert(value,"RuntimeUI.Http.Request",null,"");
		else if (variable_name == "response")this.__response = rtl.convert(value,"RuntimeUI.Http.Response",null,"");
		else if (variable_name == "route_info")this.__route_info = rtl.convert(value,"RuntimeUI.Annotations.RouteInfo",null,"");
		else if (variable_name == "cookies")this.__cookies = rtl.convert(value,"Collection",null,"Cookie");
		else if (variable_name == "params")this.__params = rtl.convert(value,"Map",null,"string");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "request") return this.__request;
		else if (variable_name == "response") return this.__response;
		else if (variable_name == "route_info") return this.__route_info;
		else if (variable_name == "cookies") return this.__cookies;
		else if (variable_name == "params") return this.__params;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("request");
			names.push("response");
			names.push("route_info");
			names.push("cookies");
			names.push("params");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
module.exports = WebContainer;