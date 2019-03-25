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
var ContextInterface = require('bayrell-runtime-nodejs').Interfaces.ContextInterface;
var ModuleDescriptionInterface = require('bayrell-runtime-nodejs').Interfaces.ModuleDescriptionInterface;
var CssDriver = require('./Drivers/CssDriver.js');
var WebDriver = require('./Drivers/WebDriver.js');
var FrontendInterface = require('./Interfaces/FrontendInterface.js');
class ModuleDescription{
	/**
	 * Returns module name
	 * @return string
	 */
	static getName(){
		return "RuntimeUI";
	}
	/**
	 * Returns module name
	 * @return string
	 */
	static getModuleVersion(){
		return "0.7.0";
	}
	/**
	 * Init context
	 * @param ContextInterface context
	 */
	static initContext(context){
	}
	/**
	 * Called then module registed in context
	 * @param ContextInterface context
	 */
	static onRegister(context){
		/* Register Drivers */
		/*context.registerDriver("driver.web.core", new WebDriver( context ));*/
	}
	/**
	 * Returns required modules
	 * @return Map<string, string>
	 */
	static getRequiredModules(context){
		return (new Map()).set("Runtime", ">=0.3");
	}
	/**
	 * Called then context read config
	 * @param ContextInterface context
	 * @param Map<mixed> config
	 */
	static onReadConfig(context, config){
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "RuntimeUI.ModuleDescription";}
	static getCurrentClassName(){return "RuntimeUI.ModuleDescription";}
	static getParentClassName(){return "";}
	_init(){
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(ModuleDescriptionInterface);
		this.__implements__.push(FrontendInterface);
	}
}
ModuleDescription.__static_implements__ = [];
ModuleDescription.__static_implements__.push(ModuleDescriptionInterface)
ModuleDescription.__static_implements__.push(FrontendInterface)
module.exports = ModuleDescription;