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
var AssetsInterface = require('./Interfaces/AssetsInterface.js');
var RenderContainer = require('./Render/RenderContainer.js');
class Assets{
	/**
	 * Returns required assets
	 * @return Map<string, string>
	 */
	static getRequiredAssets(context){
		return (new Vector());
	}
	/**
	 * Returns sync loaded files
	 */
	static assetsSyncLoad(context){
		return (new Vector());
	}
	/**
	 * Returns async loaded files
	 */
	static assetsAsyncLoad(context){
		return (new Vector()).push((new Vector()).push("/assets/bayrell-runtime-es6/rs.js").push("/assets/bayrell-runtime-es6/re.js").push("/assets/bayrell-runtime-es6/rtl.js").push("/assets/bayrell-runtime-es6/Collection.js").push("/assets/bayrell-runtime-es6/Container.js").push("/assets/bayrell-runtime-es6/CoreObject.js").push("/assets/bayrell-runtime-es6/Dict.js").push("/assets/bayrell-runtime-es6/Emitter.js").push("/assets/bayrell-runtime-es6/RuntimeConstant.js").push("/assets/bayrell-runtime-es6/RuntimeUtils.js").push("/assets/bayrell-runtime-es6/Exceptions/RuntimeException.js").push("/assets/bayrell-runtime-es6/Interfaces/CloneableInterface.js").push("/assets/bayrell-runtime-es6/Interfaces/ContextInterface.js").push("/assets/bayrell-runtime-es6/Interfaces/FactoryInterface.js").push("/assets/bayrell-runtime-es6/Interfaces/ModuleDescriptionInterface.js").push("/assets/bayrell-runtime-es6/Interfaces/SerializeInterface.js").push("/assets/bayrell-runtime-es6/Interfaces/StringInterface.js").push("/assets/bayrell-runtime-es6/Interfaces/SubscribeInterface.js")).push((new Vector()).push("/assets/bayrell-runtime-es6/AsyncTask.js").push("/assets/bayrell-runtime-es6/AsyncThread.js").push("/assets/bayrell-runtime-es6/Context.js").push("/assets/bayrell-runtime-es6/ContextObject.js").push("/assets/bayrell-runtime-es6/CoreStruct.js").push("/assets/bayrell-runtime-es6/CoreEvent.js").push("/assets/bayrell-runtime-es6/Map.js").push("/assets/bayrell-runtime-es6/Maybe.js").push("/assets/bayrell-runtime-es6/ModuleDescription.js").push("/assets/bayrell-runtime-es6/Reference.js").push("/assets/bayrell-runtime-es6/Vector.js").push("/assets/bayrell-runtime-es6/Exceptions/IndexOutOfRange.js").push("/assets/bayrell-runtime-es6/Exceptions/KeyNotFound.js").push("/assets/bayrell-runtime-es6/Exceptions/UnknownError.js")).push((new Vector()).push("/assets/bayrell-runtime-es6/DateTime.js").push("/assets/bayrell-runtime-es6/IntrospectionInfo.js").push("/assets/bayrell-runtime-es6/UIStruct.js").push("/assets/bayrell-runtime-es6/VectorStruct.js")).push((new Vector()).push("/assets/bayrell-runtime-ui-es6/UIController.js").push("/assets/bayrell-runtime-ui-es6/Annotations/ControllerAnnotation.js").push("/assets/bayrell-runtime-ui-es6/Annotations/RouteInfo.js").push("/assets/bayrell-runtime-ui-es6/Events/CommandEvent.js").push("/assets/bayrell-runtime-ui-es6/Events/ComponentEvent.js").push("/assets/bayrell-runtime-ui-es6/Events/ModelChange.js").push("/assets/bayrell-runtime-ui-es6/Events/MountEvent.js").push("/assets/bayrell-runtime-ui-es6/Events/UpdateStateEvent.js").push("/assets/bayrell-runtime-ui-es6/Events/UserEvent/UserEvent.js").push("/assets/bayrell-runtime-ui-es6/Http/ApiRequest.js").push("/assets/bayrell-runtime-ui-es6/Http/ApiResult.js").push("/assets/bayrell-runtime-ui-es6/Http/Cookie.js").push("/assets/bayrell-runtime-ui-es6/Http/Request.js").push("/assets/bayrell-runtime-ui-es6/Http/Response.js").push("/assets/bayrell-runtime-ui-es6/Interfaces/ApiDeclaringInterface.js").push("/assets/bayrell-runtime-ui-es6/Interfaces/AssetsInterface.js").push("/assets/bayrell-runtime-ui-es6/Interfaces/FrontendInterface.js").push("/assets/bayrell-runtime-ui-es6/Interfaces/RoutesDeclaringInterface.js").push("/assets/bayrell-runtime-ui-es6/Interfaces/RoutesInterface.js").push("/assets/bayrell-runtime-ui-es6/Render/CoreManager.js").push("/assets/bayrell-runtime-ui-es6/Render/CoreRoute.js").push("/assets/bayrell-runtime-ui-es6/Render/CoreView.js").push("/assets/bayrell-runtime-ui-es6/Render/RenderContainer.js").push("/assets/bayrell-runtime-ui-es6/Render/RenderHelper.js").push("/assets/bayrell-runtime-ui-es6/Render/WebContainer.js")).push((new Vector()).push("/assets/bayrell-runtime-ui-es6/Assets.js").push("/assets/bayrell-runtime-ui-es6/Animations/FadeIn.js").push("/assets/bayrell-runtime-ui-es6/Animations/FadeOut.js").push("/assets/bayrell-runtime-ui-es6/Annotations/BindModel.js").push("/assets/bayrell-runtime-ui-es6/Annotations/BindValue.js").push("/assets/bayrell-runtime-ui-es6/Annotations/Event.js").push("/assets/bayrell-runtime-ui-es6/Events/KeyboardEvent/KeyboardEvent.js").push("/assets/bayrell-runtime-ui-es6/Events/MouseEvent/MouseEvent.js").push("/assets/bayrell-runtime-ui-es6/Events/UserEvent/BlurEvent.js").push("/assets/bayrell-runtime-ui-es6/Events/UserEvent/ChangeEvent.js").push("/assets/bayrell-runtime-ui-es6/Events/UserEvent/FocusEvent.js").push("/assets/bayrell-runtime-ui-es6/Http/JsonResponse.js").push("/assets/bayrell-runtime-ui-es6/Render/CoreLayout.js")).push((new Vector()).push("/assets/bayrell-runtime-ui-es6/Events/MouseEvent/MouseClickEvent.js").push("/assets/bayrell-runtime-ui-es6/Events/MouseEvent/MouseDoubleClickEvent.js").push("/assets/bayrell-runtime-ui-es6/Events/MouseEvent/MouseDownEvent.js").push("/assets/bayrell-runtime-ui-es6/Events/MouseEvent/MouseEnterEvent.js").push("/assets/bayrell-runtime-ui-es6/Events/MouseEvent/MouseLeaveEvent.js").push("/assets/bayrell-runtime-ui-es6/Events/MouseEvent/MouseMoveEvent.js").push("/assets/bayrell-runtime-ui-es6/Events/MouseEvent/MouseOutEvent.js").push("/assets/bayrell-runtime-ui-es6/Events/MouseEvent/MouseOverEvent.js").push("/assets/bayrell-runtime-ui-es6/Events/MouseEvent/MouseUpEvent.js"));
	}
	/**
	 * Init render container
	 */
	static initContainer(container){
		return container;
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "RuntimeUI.Assets";}
	static getCurrentClassName(){return "RuntimeUI.Assets";}
	static getParentClassName(){return "";}
	_init(){
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(AssetsInterface);
	}
}
Assets.__static_implements__ = [];
Assets.__static_implements__.push(AssetsInterface)
module.exports = Assets;