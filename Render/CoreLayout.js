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
var Assets = require('../Assets.js');
var CoreLayoutModel = require('./CoreLayoutModel.js');
var CoreView = require('./CoreView.js');
var RenderHelper = require('./RenderHelper.js');
class CoreLayout extends CoreView{
	/**
	 * Required Assets
	 */
	static assets(){
		return (new Vector()).push("RuntimeUI.Assets");
	}
	/**
	 * Required components
	 */
	static components(){
		return (new Vector());
	}
	/**
	 * Component css
	 */
	static css(vars){
		return "";
	}
	/**
	 * Render head
	 */
	static head(data){
		return rtl.normalizeUIVector((new Vector())
		.push(new UIStruct(new Map({
		"space":"8f09",
		"class_name":this.getCurrentClassName(),
		"name":"meta",
		"props": (new Map())
			.set("name", "Content-Type")
			.set("content", "text/html; charset=utf-8")
		,
		})))
		.push(new UIStruct(new Map({
		"space":"8f09",
		"class_name":this.getCurrentClassName(),
		"name":"title",
		"children": rtl.normalizeUIVector(new Vector(
			rs.htmlEscape(data.title)
		))
		}))));
	}
	/**
	 * Render assets in header
	 */
	static assetsHeader(data){
		var css = RenderHelper.getCSSFromComponents(data.components, data.css_vars);
		return new UIStruct((new Map()).set("kind", UIStruct.TYPE_ELEMENT).set("name", "style").set("props", (new Map()).set("type", "text/css")).set("children", (new Vector()).push(rtl.normalizeUI(css))));
	}
	/**
	 * Render assets in body
	 */
	static assetsBody(data){
		var js = RenderHelper.loadAsyncResources(data.assets);
		var res = new Vector();
		for (var i = 0; i < js.count(); i++){
			res.push(new UIStruct((new Map()).set("kind", UIStruct.TYPE_ELEMENT).set("name", "script").set("props", (new Map()).set("src", js.item(i)))));
		}
		res.push(new UIStruct((new Map()).set("kind", UIStruct.TYPE_ELEMENT).set("name", "script").set("props", (new Map()).set("src", "/assets/bayrell-runtime-ui-es6/Drivers/RenderDriver.js"))));
		return res.toCollection();
	}
	/**
	 * Content render
	 */
	static content(data){
		return data.content;
	}
	/**
	 * Component render
	 */
	static render(data){
		return rtl.normalizeUIVector((new Vector())
		.push("<!DOCTYPE html>")
		.push(new UIStruct(new Map({
		"space":"8f09",
		"class_name":this.getCurrentClassName(),
		"name":"html",
		"children": rtl.normalizeUIVector(new Vector(
			new UIStruct(new Map({
			"space":"8f09",
			"class_name":this.getCurrentClassName(),
			"name":"head",
			"children": rtl.normalizeUIVector(new Vector(
				rs.htmlEscape(this.head(data)),
				rs.htmlEscape(this.assetsHeader(data))
			))
			})),
			new UIStruct(new Map({
			"space":"8f09",
			"class_name":this.getCurrentClassName(),
			"name":"body",
			"children": rtl.normalizeUIVector(new Vector(
				new UIStruct(new Map({
				"space":"8f09",
				"class_name":this.getCurrentClassName(),
				"name":"div",
				"props": (new Map())
					.set("id", "root")
				,
				"children": rtl.normalizeUIVector(new Vector(
					this.content(data)
				))
				})),
				new UIStruct(new Map({
				"space":"8f09",
				"class_name":this.getCurrentClassName(),
				"name":"input",
				"props": (new Map())
					.set("id", "view")
					.set("value", data.view)
					.set("style", "display: none;")
				,
				})),
				new UIStruct(new Map({
				"space":"8f09",
				"class_name":this.getCurrentClassName(),
				"name":"input",
				"props": (new Map())
					.set("id", "model")
					.set("value", rtl.json_encode(data.model))
					.set("style", "display: none;")
				,
				})),
				new UIStruct(new Map({
				"space":"8f09",
				"class_name":this.getCurrentClassName(),
				"name":"div",
				"props": (new Map())
					.set("id", "scripts")
				,
				"children": rtl.normalizeUIVector(new Vector(
					rs.htmlEscape(this.assetsBody(data))
				))
				}))
			))
			}))
		))
		}))));
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "RuntimeUI.Render.CoreLayout";}
	static getCurrentClassName(){return "RuntimeUI.Render.CoreLayout";}
	static getParentClassName(){return "RuntimeUI.Render.CoreView";}
	assignObject(obj){
		if (obj instanceof CoreLayout){
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
module.exports = CoreLayout;