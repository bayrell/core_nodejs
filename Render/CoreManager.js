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
var CoreObject = require('bayrell-runtime-nodejs').CoreObject;
var Emitter = require('bayrell-runtime-nodejs').Emitter;
var Reference = require('bayrell-runtime-nodejs').Reference;
var RuntimeUtils = require('bayrell-runtime-nodejs').RuntimeUtils;
var ControllerAnnotation = require('../Annotations/ControllerAnnotation.js');
var ModelChange = require('../Events/ModelChange.js');
class CoreManager extends CoreObject{
	/**
	 * Constructor
	 */
	constructor(){
		super();
		/* Analyze controllers annotaions */
		var introspection = RuntimeUtils.getIntrospection(this.getClassName());
		introspection.each((info) => {
			var annotations = (rtl.method(info.getClassName(), "filterAnnotations"))("RuntimeUI.Annotations.ControllerAnnotation", info);
			annotations.each((annotation) => {
				this.initAnnotation(info, annotation);
			});
		});
	}
	/**
	 * Set parent manager
	 */
	setParentManager(parent_manager, parent_controller_name){
		if (this.parent_controller_name != "" && this.parent_manager != null){
			var controller = this.parent_manager.takeValue(this.parent_controller_name, null);
			if (controller != null){
				controller.signal_in.removeEmitter(this.signal_in);
				this.signal_out.removeEmitter(controller.signal_out);
			}
		}
		this.parent_controller_name = parent_controller_name;
		this.parent_manager = parent_manager;
		if (parent_manager != null && parent_controller_name != ""){
			var parent_controller = parent_manager.takeValue(parent_controller_name, null);
			if (parent_controller != null){
				parent_controller.signal_in.addEmitter(this.signal_in);
				this.signal_out.addEmitter(parent_controller.signal_out);
			}
		}
	}
	/**
	 * Init Annotation
	 */
	initAnnotation(info, annotation){
		if (info.kind != IntrospectionInfo.ITEM_FIELD){
			return ;
		}
		var field_name = info.name;
		var controller = this.takeValue(field_name);
		controller.manager = this;
		(rtl.method(annotation.getClassName(), "initController"))(this, annotation, controller);
	}
	/**
	 * Update current model
	 * @param Dict map
	 */
	updateModel(map){
		this.model = this.model.copy(map);
		this.signal_out.dispatch(new ModelChange((new Map()).set("model", this.model)));
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "RuntimeUI.Render.CoreManager";}
	static getCurrentClassName(){return "RuntimeUI.Render.CoreManager";}
	static getParentClassName(){return "Runtime.CoreObject";}
	_init(){
		super._init();
		this.signal_in = new Emitter();
		this.signal_out = new Emitter();
		this.parent_controller_name = "";
		this.parent_manager = null;
	}
}
module.exports = CoreManager;