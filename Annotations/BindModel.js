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
var ControllerAnnotation = require('./ControllerAnnotation.js');
var ModelChange = require('../Events/ModelChange.js');
class BindModel extends ControllerAnnotation{
	/**
	 * Init controller
	 */
	static initController(manager, annotation, controller){
		controller.addSignalOut(this.onChangeModel(manager, annotation, controller), (new Vector()).push("RuntimeUI.Events.ModelChange"));
	}
	/**
	 * On change
	 */
	static onChangeModel(manager, annotation, controller){
		return (event) => {
			var map = new Map();
			map.set(annotation.model, event.model.takeValue(annotation.component, null));
			/* Set new value */
			manager.updateModel(map);
		}
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "RuntimeUI.Annotations.BindModel";}
	static getCurrentClassName(){return "RuntimeUI.Annotations.BindModel";}
	static getParentClassName(){return "RuntimeUI.Annotations.ControllerAnnotation";}
	_init(){
		super._init();
		this.__model = "";
		Object.defineProperty(this, "model", { get: function() { return this.__model; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("model") }});
		this.__component = "";
		Object.defineProperty(this, "component", { get: function() { return this.__component; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("component") }});
	}
	assignObject(obj){
		if (obj instanceof BindModel){
			this.__model = obj.__model;
			this.__component = obj.__component;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "model")this.__model = rtl.convert(value,"string","","");
		else if (variable_name == "component")this.__component = rtl.convert(value,"string","","");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "model") return this.__model;
		else if (variable_name == "component") return this.__component;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("model");
			names.push("component");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
module.exports = BindModel;