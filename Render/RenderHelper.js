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
var StringInterface = require('bayrell-runtime-nodejs').Interfaces.StringInterface;
var RenderContainer = require('./RenderContainer.js');
class RenderHelper{
	/**
	 * Render class with data
	 */
	static render(class_name, data){
		var st = null;
		if (data instanceof CoreStruct){
			var st = new UIStruct((new Map()).set("name", class_name).set("kind", UIStruct.TYPE_COMPONENT).set("model", data));
		}
		else {
			var st = new UIStruct((new Map()).set("name", class_name).set("kind", UIStruct.TYPE_COMPONENT).set("props", data));
		}
		return RenderHelper.getUIString(st);
	}
	/**
	 * Returns if tag name is double token
	 */
	static isDoubleToken(tag_name){
		var __memorize_value = rtl._memorizeValue("RuntimeUI.Render.RenderHelper::isDoubleToken", arguments);
		if (__memorize_value != rtl._memorize_not_found) return __memorize_value;
		var tokens = (new Vector()).push("img").push("meta").push("input").push("link").push("br");
		if (tokens.indexOf(tag_name) == -1){
			var __memorize_value = true;
			rtl._memorizeSave("RuntimeUI.Render.RenderHelper::isDoubleToken", arguments, __memorize_value);
			return __memorize_value;
		}
		var __memorize_value = false;
		rtl._memorizeSave("RuntimeUI.Render.RenderHelper::isDoubleToken", arguments, __memorize_value);
		return __memorize_value;
	}
	/**
	 * Retuns css hash 
	 * @param string component class name
	 * @return string hash
	 */
	static getCssHash(s){
		var __memorize_value = rtl._memorizeValue("RuntimeUI.Render.RenderHelper::getCssHash", arguments);
		if (__memorize_value != rtl._memorize_not_found) return __memorize_value;
		var sz = (rtl.method(rs.getClassName(), "strlen"))(s);
		var h = 0;
		for (var i = 0; i < sz; i++){
			var ch = (rtl.method(rs.getClassName(), "ord"))(s[i]);
			h = (h << 2) + (h >> 14) + ch & 65535;
		}
		var arr = "1234567890abcdef";
		var res = "";
		while (h != 0){
			var c = h & 15;
			h = h >> 4;
			res += arr[c];
		}
		var __memorize_value = res;
		rtl._memorizeSave("RuntimeUI.Render.RenderHelper::getCssHash", arguments, __memorize_value);
		return __memorize_value;
	}
	/**
	 * Returns attrs
	 */
	static getUIAttrs(st){
		var attrs = new Map();
		if (st == null){
			return attrs.toDict();
		}
		if (st.props == null){
			return attrs.toDict();
		}
		var props = (rtl.method(UIStruct.getClassName(), "getAttrs"))(st);
		var keys = props.keys();
		for (var ki = 0; ki < keys.count(); ki++){
			var key = keys.item(ki);
			var item = props.item(key);
			var value = "";
			if ((rtl.method(rs.getClassName(), "strlen"))(key) == 0){
				continue;
			}
			if (key == "style" && item instanceof Map){
				value = item.reduce((res, key, value) => {
					return rtl.toString(res)+rtl.toString(key)+":"+rtl.toString(value)+";";
				}, "");
			}
			else if (rtl.implements(item, StringInterface)){
				value = rtl.toString(item);
			}
			else if (rtl.isString(item)){
				value = rtl.toString(item);
			}
			if (key == "@class"){
				var css_arr = (rtl.method(rs.getClassName(), "explode"))(" ", value);
				css_arr = css_arr.map((item) => {
					return rtl.toString(item)+"-"+rtl.toString(st.space);
				});
				key = "class";
				value = (rtl.method(rs.getClassName(), "implode"))(" ", css_arr);
			}
			else if (key[0] == "@"){
				continue;
			}
			else if (key == "dangerouslySetInnerHTML"){
				continue;
			}
			else if (key == "defaultValue"){
				key = "value";
			}
			else if (key == "className"){
				key = "class";
			}
			else if (key == "selected"){
				if (item == true){
					value = "selected";
				}
				else if (item == false){
					return ;
				}
				value = "selected";
			}
			else if (key == "checked"){
				if (item == true){
					value = "checked";
				}
				else if (item == false){
					return ;
				}
				value = "checked";
			}
			if (value != ""){
				if (attrs.has(key)){
					value = rtl.toString(attrs.item(key))+" "+rtl.toString(value);
				}
				attrs.set(key, value);
			}
		}
		return attrs;
	}
	/**
	 * Returns attrs
	 */
	static getUIStringAttrs(st){
		var attrs = this.getUIAttrs(st);
		attrs = attrs.map((key, value) => {
			return rtl.toString(key)+"='"+rtl.toString(value)+"'";
		});
		return (rtl.method(rs.getClassName(), "implode"))(" ", attrs.values());
	}
	/**
	 * Convert UI to string
	 */
	static getUIStringVector(arr){
		if (arr == null){
			return "";
		}
		var content = "";
		for (var i = 0; i < arr.count(); i++){
			content += this.getUIString(arr.item(i));
		}
		return content;
	}
	/**
	 * Convert UI to string
	 */
	static getUIString(st){
		if (st == null){
			return "";
		}
		if ((rtl.method(UIStruct.getClassName(), "isString"))(st)){
			return st.content;
		}
		if ((rtl.method(UIStruct.getClassName(), "isComponent"))(st)){
			var render = rtl.method(st.name, "render");
			var res = render((rtl.method(UIStruct.getClassName(), "getModel"))(st));
			if (!(res instanceof Collection)){
				res = rtl.normalizeUIVector(res);
			}
			return this.getUIStringVector(res, st.name);
		}
		var attrs = this.getUIStringAttrs(st);
		var content = "";
		if (this.isDoubleToken(st.name)){
			content = "<"+rtl.toString(st.name)+rtl.toString((attrs != "") ? (" "+rtl.toString(attrs)) : (""))+">";
			content += this.getUIStringVector(st.children);
			content += "</"+rtl.toString(st.name)+">";
		}
		else {
			content = "<"+rtl.toString(st.name)+rtl.toString((attrs != "") ? (" "+rtl.toString(attrs)) : (""))+"/>";
		}
		return content;
	}
	/**
	 * Add unique items to collection
	 * @param Collection<string> res
	 * @param Collection<string> items
	 * @return Collection<string>
	 */
	static addUniqueItems(res, items){
		var r = new Vector();
		for (var i = 0; i < items.count(); i++){
			var item_name = items.item(i);
			if (res.indexOf(item_name) == -1){
				r.push(item_name);
			}
		}
		return res.appendCollectionIm(r);
	}
	/**
	 * Returns all components
	 * @param Collection<string> views
	 * @return Collection<string>
	 */
	static getAllComponents(views){
		/* Add components from views */
		var res = new Collection(views);
		/* Add require components */
		var w = null;
		while (w != res){
			w = res;
			for (var i = 0; i < w.count(); i++){
				var class_name = w.item(i);
				var components = rtl.method(class_name, "components")();
				res = this.addUniqueItems(res, components);
			}
		}
		return res;
	}
	/**
	 * Returns assets by views
	 * @param Collection<string> views
	 * @return Collection<string>
	 */
	static loadAssetsFromComponents(components, container){
		if (container == undefined) container=null;
		/* Add assets from components */
		var res = new Collection();
		if (components == null){
			return res;
		}
		for (var i = 0; i < components.count(); i++){
			var class_name = components.item(i);
			var assets = rtl.method(class_name, "assets")();
			res = this.addUniqueItems(res, assets);
		}
		/* Add require assets */
		var w = null;
		while (w != res){
			w = res;
			for (var i = 0; i < w.count(); i++){
				var class_name = w.item(i);
				var assets = rtl.method(class_name, "getRequiredAssets")(container);
				res = this.addUniqueItems(res, assets);
			}
		}
		return res;
	}
	/**
	 * Returns assets
	 * @param Collection<string> assets
	 * @return Collection<string>
	 */
	static loadAsyncResources(assets){
		var __memorize_value = rtl._memorizeValue("RuntimeUI.Render.RenderHelper::loadAsyncResources", arguments);
		if (__memorize_value != rtl._memorize_not_found) return __memorize_value;
		var res = new Collection();
		if (assets == null){
			var __memorize_value = res;
			rtl._memorizeSave("RuntimeUI.Render.RenderHelper::loadAsyncResources", arguments, __memorize_value);
			return __memorize_value;
		}
		for (var i = 0; i < assets.count(); i++){
			var assets_name = assets.item(i);
			var r = rtl.method(assets_name, "assetsAsyncLoad")(null);
			for (var j = 0; j < r.count(); j++){
				var arr = r.item(j);
				res = this.addUniqueItems(res, arr);
			}
		}
		var __memorize_value = res;
		rtl._memorizeSave("RuntimeUI.Render.RenderHelper::loadAsyncResources", arguments, __memorize_value);
		return __memorize_value;
	}
	/**
	 * Returns css string
	 * @param Collection<string> components
	 * @param Dict<string> css_vars
	 * @return string
	 */
	static getCSSFromComponents(components, css_vars){
		var __memorize_value = rtl._memorizeValue("RuntimeUI.Render.RenderHelper::getCSSFromComponents", arguments);
		if (__memorize_value != rtl._memorize_not_found) return __memorize_value;
		var res = new Vector();
		for (var i = 0; i < components.count(); i++){
			var component_name = components.item(i);
			var css = rtl.method(component_name, "css")(css_vars);
			res.push(css);
		}
		var s = res.reduce((res, s) => {
			return rtl.toString(res)+rtl.toString(s);
		}, "");
		var __memorize_value = s;
		rtl._memorizeSave("RuntimeUI.Render.RenderHelper::getCSSFromComponents", arguments, __memorize_value);
		return __memorize_value;
	}
	/**
	 * Init render container
	 * @param RenderContainer container
	 * @return RenderContainer
	 */
	static initRenderContainer(container){
		return container;
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "RuntimeUI.Render.RenderHelper";}
	static getCurrentClassName(){return "RuntimeUI.Render.RenderHelper";}
	static getParentClassName(){return "";}
}
module.exports = RenderHelper;