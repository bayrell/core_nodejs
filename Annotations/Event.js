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
var ChangeEvent = require('../Events/UserEvent/ChangeEvent.js');
class Event extends ControllerAnnotation{
	/**
	 * Init controller
	 */
	static initController(manager, annotation, controller){
		controller.addSignalOut(rtl.method(manager, annotation.method_name), (new Vector()).push(annotation.event));
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "RuntimeUI.Annotations.Event";}
	static getCurrentClassName(){return "RuntimeUI.Annotations.Event";}
	static getParentClassName(){return "RuntimeUI.Annotations.ControllerAnnotation";}
	_init(){
		super._init();
		this.__event = "";
		Object.defineProperty(this, "event", { get: function() { return this.__event; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("event") }});
		this.__method_name = "";
		Object.defineProperty(this, "method_name", { get: function() { return this.__method_name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("method_name") }});
	}
	assignObject(obj){
		if (obj instanceof Event){
			this.__event = obj.__event;
			this.__method_name = obj.__method_name;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "event")this.__event = rtl.convert(value,"string","","");
		else if (variable_name == "method_name")this.__method_name = rtl.convert(value,"string","","");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "event") return this.__event;
		else if (variable_name == "method_name") return this.__method_name;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("event");
			names.push("method_name");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
module.exports = Event;