/* eslint-disable */
exports["Core"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "lib/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, module) {var Module=function(Module){Module=Module||{};var Module=Module;var Module={ENVIRONMENT:"NODE",setContext:function(context){GLctx=Module.ctx=context;},handleScrollChanged:null,handleShapeParametersChanged:null,bitmapProvider:null,bitmapExporter:null,browserTypesetter:null,timerFactory:null,handleTextInputStarted:null,handleTextInputEnded:null};var Module;if(!Module)Module=(typeof Module!=="undefined"?Module:null)||{};var moduleOverrides={};for(var key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key];}}var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_IS_SHELL=false;if(Module["ENVIRONMENT"]){if(Module["ENVIRONMENT"]==="WEB"){ENVIRONMENT_IS_WEB=true;}else if(Module["ENVIRONMENT"]==="WORKER"){ENVIRONMENT_IS_WORKER=true;}else if(Module["ENVIRONMENT"]==="NODE"){ENVIRONMENT_IS_NODE=true;}else if(Module["ENVIRONMENT"]==="SHELL"){ENVIRONMENT_IS_SHELL=true;}else{throw new Error("The provided Module['ENVIRONMENT'] value is not valid. It must be one of: WEB|WORKER|NODE|SHELL.");}}else{ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_IS_NODE=typeof process==="object"&&"function"==="function"&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;}if(ENVIRONMENT_IS_NODE){if(!Module["print"])Module["print"]=console.log;if(!Module["printErr"])Module["printErr"]=console.warn;var nodeFS;var nodePath;Module["read"]=function read(filename,binary){if(!nodeFS)nodeFS=__webpack_require__(4);if(!nodePath)nodePath=__webpack_require__(5);filename=nodePath["normalize"](filename);var ret=nodeFS["readFileSync"](filename);return binary?ret:ret.toString();};Module["readBinary"]=function readBinary(filename){var ret=Module["read"](filename,true);if(!ret.buffer){ret=new Uint8Array(ret);}assert(ret.buffer);return ret;};Module["load"]=function load(f){globalEval(read(f));};if(!Module["thisProgram"]){if(process["argv"].length>1){Module["thisProgram"]=process["argv"][1].replace(/\\/g,"/");}else{Module["thisProgram"]="unknown-program";}}Module["arguments"]=process["argv"].slice(2);if(true){module["exports"]=Module;}process["on"]("uncaughtException",function(ex){if(!(ex instanceof ExitStatus)){throw ex;}});Module["inspect"]=function(){return"[Emscripten Module object]";};}else if(ENVIRONMENT_IS_SHELL){if(!Module["print"])Module["print"]=print;if(typeof printErr!="undefined")Module["printErr"]=printErr;if(typeof read!="undefined"){Module["read"]=read;}else{Module["read"]=function read(){throw"no read() available";};}Module["readBinary"]=function readBinary(f){if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f));}var data=read(f,"binary");assert(typeof data==="object");return data;};if(typeof scriptArgs!="undefined"){Module["arguments"]=scriptArgs;}else if(typeof arguments!="undefined"){Module["arguments"]=arguments;}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){Module["read"]=function read(url){var xhr=new XMLHttpRequest();xhr.open("GET",url,false);xhr.send(null);return xhr.responseText;};Module["readAsync"]=function readAsync(url,onload,onerror){var xhr=new XMLHttpRequest();xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function xhr_onload(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);}else{onerror();}};xhr.onerror=onerror;xhr.send(null);};if(typeof arguments!="undefined"){Module["arguments"]=arguments;}if(typeof console!=="undefined"){if(!Module["print"])Module["print"]=function print(x){console.log(x);};if(!Module["printErr"])Module["printErr"]=function printErr(x){console.warn(x);};}else{var TRY_USE_DUMP=false;if(!Module["print"])Module["print"]=TRY_USE_DUMP&&typeof dump!=="undefined"?function(x){dump(x);}:function(x){};}if(ENVIRONMENT_IS_WORKER){Module["load"]=importScripts;}if(typeof Module["setWindowTitle"]==="undefined"){Module["setWindowTitle"]=function(title){document.title=title;};}}else{throw"Unknown runtime environment. Where are we?";}function globalEval(x){eval.call(null,x);}if(!Module["load"]&&Module["read"]){Module["load"]=function load(f){globalEval(Module["read"](f));};}if(!Module["print"]){Module["print"]=function(){};}if(!Module["printErr"]){Module["printErr"]=Module["print"];}if(!Module["arguments"]){Module["arguments"]=[];}if(!Module["thisProgram"]){Module["thisProgram"]="./this.program";}Module.print=Module["print"];Module.printErr=Module["printErr"];Module["preRun"]=[];Module["postRun"]=[];for(var key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key];}}moduleOverrides=undefined;var Runtime={setTempRet0:function(value){tempRet0=value;return value;},getTempRet0:function(){return tempRet0;},stackSave:function(){return STACKTOP;},stackRestore:function(stackTop){STACKTOP=stackTop;},getNativeTypeSize:function(type){switch(type){case"i1":case"i8":return 1;case"i16":return 2;case"i32":return 4;case"i64":return 8;case"float":return 4;case"double":return 8;default:{if(type[type.length-1]==="*"){return Runtime.QUANTUM_SIZE;}else if(type[0]==="i"){var bits=parseInt(type.substr(1));assert(bits%8===0);return bits/8;}else{return 0;}}}},getNativeFieldSize:function(type){return Math.max(Runtime.getNativeTypeSize(type),Runtime.QUANTUM_SIZE);},STACK_ALIGN:16,prepVararg:function(ptr,type){if(type==="double"||type==="i64"){if(ptr&7){assert((ptr&7)===4);ptr+=4;}}else{assert((ptr&3)===0);}return ptr;},getAlignSize:function(type,size,vararg){if(!vararg&&(type=="i64"||type=="double"))return 8;if(!type)return Math.min(size,8);return Math.min(size||(type?Runtime.getNativeFieldSize(type):0),Runtime.QUANTUM_SIZE);},dynCall:function(sig,ptr,args){if(args&&args.length){return Module["dynCall_"+sig].apply(null,[ptr].concat(args));}else{return Module["dynCall_"+sig].call(null,ptr);}},functionPointers:[],addFunction:function(func){for(var i=0;i<Runtime.functionPointers.length;i++){if(!Runtime.functionPointers[i]){Runtime.functionPointers[i]=func;return 2*(1+i);}}throw"Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.";},removeFunction:function(index){Runtime.functionPointers[(index-2)/2]=null;},warnOnce:function(text){if(!Runtime.warnOnce.shown)Runtime.warnOnce.shown={};if(!Runtime.warnOnce.shown[text]){Runtime.warnOnce.shown[text]=1;Module.printErr(text);}},funcWrappers:{},getFuncWrapper:function(func,sig){assert(sig);if(!Runtime.funcWrappers[sig]){Runtime.funcWrappers[sig]={};}var sigCache=Runtime.funcWrappers[sig];if(!sigCache[func]){if(sig.length===1){sigCache[func]=function dynCall_wrapper(){return Runtime.dynCall(sig,func);};}else if(sig.length===2){sigCache[func]=function dynCall_wrapper(arg){return Runtime.dynCall(sig,func,[arg]);};}else{sigCache[func]=function dynCall_wrapper(){return Runtime.dynCall(sig,func,Array.prototype.slice.call(arguments));};}}return sigCache[func];},getCompilerSetting:function(name){throw"You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work";},stackAlloc:function(size){var ret=STACKTOP;STACKTOP=STACKTOP+size|0;STACKTOP=STACKTOP+15&-16;return ret;},staticAlloc:function(size){var ret=STATICTOP;STATICTOP=STATICTOP+size|0;STATICTOP=STATICTOP+15&-16;return ret;},dynamicAlloc:function(size){var ret=HEAP32[DYNAMICTOP_PTR>>2];var end=(ret+size+15|0)&-16;HEAP32[DYNAMICTOP_PTR>>2]=end;if(end>=TOTAL_MEMORY){var success=enlargeMemory();if(!success){HEAP32[DYNAMICTOP_PTR>>2]=ret;return 0;}}return ret;},alignMemory:function(size,quantum){var ret=size=Math.ceil(size/(quantum?quantum:16))*(quantum?quantum:16);return ret;},makeBigInt:function(low,high,unsigned){var ret=unsigned?+(low>>>0)+ +(high>>>0)*+4294967296:+(low>>>0)+ +(high|0)*+4294967296;return ret;},GLOBAL_BASE:8,QUANTUM_SIZE:4,__dummy__:0};Module["Runtime"]=Runtime;var ABORT=0;var EXITSTATUS=0;function assert(condition,text){if(!condition){abort("Assertion failed: "+text);}}function getCFunc(ident){var func=Module["_"+ident];if(!func){try{func=eval("_"+ident);}catch(e){}}assert(func,"Cannot call unknown function "+ident+" (perhaps LLVM optimizations or closure removed it?)");return func;}var cwrap,ccall;(function(){var JSfuncs={"stackSave":function(){Runtime.stackSave();},"stackRestore":function(){Runtime.stackRestore();},"arrayToC":function(arr){var ret=Runtime.stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret;},"stringToC":function(str){var ret=0;if(str!==null&&str!==undefined&&str!==0){var len=(str.length<<2)+1;ret=Runtime.stackAlloc(len);stringToUTF8(str,ret,len);}return ret;}};var toC={"string":JSfuncs["stringToC"],"array":JSfuncs["arrayToC"]};ccall=function ccallFunc(ident,returnType,argTypes,args,opts){var func=getCFunc(ident);var cArgs=[];var stack=0;if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=Runtime.stackSave();cArgs[i]=converter(args[i]);}else{cArgs[i]=args[i];}}}var ret=func.apply(null,cArgs);if(returnType==="string")ret=Pointer_stringify(ret);if(stack!==0){if(opts&&opts.async){EmterpreterAsync.asyncFinalizers.push(function(){Runtime.stackRestore(stack);});return;}Runtime.stackRestore(stack);}return ret;};var sourceRegex=/^function\s*[a-zA-Z$_0-9]*\s*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/;function parseJSFunc(jsfunc){var parsed=jsfunc.toString().match(sourceRegex).slice(1);return{arguments:parsed[0],body:parsed[1],returnValue:parsed[2]};}var JSsource=null;function ensureJSsource(){if(!JSsource){JSsource={};for(var fun in JSfuncs){if(JSfuncs.hasOwnProperty(fun)){JSsource[fun]=parseJSFunc(JSfuncs[fun]);}}}}cwrap=function cwrap(ident,returnType,argTypes){argTypes=argTypes||[];var cfunc=getCFunc(ident);var numericArgs=argTypes.every(function(type){return type==="number";});var numericRet=returnType!=="string";if(numericRet&&numericArgs){return cfunc;}var argNames=argTypes.map(function(x,i){return"$"+i;});var funcstr="(function("+argNames.join(",")+") {";var nargs=argTypes.length;if(!numericArgs){ensureJSsource();funcstr+="var stack = "+JSsource["stackSave"].body+";";for(var i=0;i<nargs;i++){var arg=argNames[i],type=argTypes[i];if(type==="number")continue;var convertCode=JSsource[type+"ToC"];funcstr+="var "+convertCode.arguments+" = "+arg+";";funcstr+=convertCode.body+";";funcstr+=arg+"=("+convertCode.returnValue+");";}}var cfuncname=parseJSFunc(function(){return cfunc;}).returnValue;funcstr+="var ret = "+cfuncname+"("+argNames.join(",")+");";if(!numericRet){var strgfy=parseJSFunc(function(){return Pointer_stringify;}).returnValue;funcstr+="ret = "+strgfy+"(ret);";}if(!numericArgs){ensureJSsource();funcstr+=JSsource["stackRestore"].body.replace("()","(stack)")+";";}funcstr+="return ret})";return eval(funcstr);};})();Module["ccall"]=ccall;Module["cwrap"]=cwrap;function setValue(ptr,value,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":HEAP8[ptr>>0]=value;break;case"i8":HEAP8[ptr>>0]=value;break;case"i16":HEAP16[ptr>>1]=value;break;case"i32":HEAP32[ptr>>2]=value;break;case"i64":tempI64=[value>>>0,(tempDouble=value,+Math_abs(tempDouble)>=+1?tempDouble>+0?(Math_min(+Math_floor(tempDouble/+4294967296),+4294967295)|0)>>>0:~~+Math_ceil((tempDouble-+(~~tempDouble>>>0))/+4294967296)>>>0:0)],HEAP32[ptr>>2]=tempI64[0],HEAP32[ptr+4>>2]=tempI64[1];break;case"float":HEAPF32[ptr>>2]=value;break;case"double":HEAPF64[ptr>>3]=value;break;default:abort("invalid type for setValue: "+type);}}Module["setValue"]=setValue;function getValue(ptr,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":return HEAP8[ptr>>0];case"i8":return HEAP8[ptr>>0];case"i16":return HEAP16[ptr>>1];case"i32":return HEAP32[ptr>>2];case"i64":return HEAP32[ptr>>2];case"float":return HEAPF32[ptr>>2];case"double":return HEAPF64[ptr>>3];default:abort("invalid type for setValue: "+type);}return null;}Module["getValue"]=getValue;var ALLOC_NORMAL=0;var ALLOC_STACK=1;var ALLOC_STATIC=2;var ALLOC_DYNAMIC=3;var ALLOC_NONE=4;Module["ALLOC_NORMAL"]=ALLOC_NORMAL;Module["ALLOC_STACK"]=ALLOC_STACK;Module["ALLOC_STATIC"]=ALLOC_STATIC;Module["ALLOC_DYNAMIC"]=ALLOC_DYNAMIC;Module["ALLOC_NONE"]=ALLOC_NONE;function allocate(slab,types,allocator,ptr){var zeroinit,size;if(typeof slab==="number"){zeroinit=true;size=slab;}else{zeroinit=false;size=slab.length;}var singleType=typeof types==="string"?types:null;var ret;if(allocator==ALLOC_NONE){ret=ptr;}else{ret=[typeof _malloc==="function"?_malloc:Runtime.staticAlloc,Runtime.stackAlloc,Runtime.staticAlloc,Runtime.dynamicAlloc][allocator===undefined?ALLOC_STATIC:allocator](Math.max(size,singleType?1:types.length));}if(zeroinit){var ptr=ret,stop;assert((ret&3)==0);stop=ret+(size&~3);for(;ptr<stop;ptr+=4){HEAP32[ptr>>2]=0;}stop=ret+size;while(ptr<stop){HEAP8[ptr++>>0]=0;}return ret;}if(singleType==="i8"){if(slab.subarray||slab.slice){HEAPU8.set(slab,ret);}else{HEAPU8.set(new Uint8Array(slab),ret);}return ret;}var i=0,type,typeSize,previousType;while(i<size){var curr=slab[i];if(typeof curr==="function"){curr=Runtime.getFunctionIndex(curr);}type=singleType||types[i];if(type===0){i++;continue;}if(type=="i64")type="i32";setValue(ret+i,curr,type);if(previousType!==type){typeSize=Runtime.getNativeTypeSize(type);previousType=type;}i+=typeSize;}return ret;}Module["allocate"]=allocate;function getMemory(size){if(!staticSealed)return Runtime.staticAlloc(size);if(!runtimeInitialized)return Runtime.dynamicAlloc(size);return _malloc(size);}Module["getMemory"]=getMemory;function Pointer_stringify(ptr,length){if(length===0||!ptr)return"";var hasUtf=0;var t;var i=0;while(1){t=HEAPU8[ptr+i>>0];hasUtf|=t;if(t==0&&!length)break;i++;if(length&&i==length)break;}if(!length)length=i;var ret="";if(hasUtf<128){var MAX_CHUNK=1024;var curr;while(length>0){curr=String.fromCharCode.apply(String,HEAPU8.subarray(ptr,ptr+Math.min(length,MAX_CHUNK)));ret=ret?ret+curr:curr;ptr+=MAX_CHUNK;length-=MAX_CHUNK;}return ret;}return Module["UTF8ToString"](ptr);}Module["Pointer_stringify"]=Pointer_stringify;function AsciiToString(ptr){var str="";while(1){var ch=HEAP8[ptr++>>0];if(!ch)return str;str+=String.fromCharCode(ch);}}Module["AsciiToString"]=AsciiToString;function stringToAscii(str,outPtr){return writeAsciiToMemory(str,outPtr,false);}Module["stringToAscii"]=stringToAscii;var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(u8Array,idx){var endPtr=idx;while(u8Array[endPtr])++endPtr;if(endPtr-idx>16&&u8Array.subarray&&UTF8Decoder){return UTF8Decoder.decode(u8Array.subarray(idx,endPtr));}else{var u0,u1,u2,u3,u4,u5;var str="";while(1){u0=u8Array[idx++];if(!u0)return str;if(!(u0&128)){str+=String.fromCharCode(u0);continue;}u1=u8Array[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue;}u2=u8Array[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2;}else{u3=u8Array[idx++]&63;if((u0&248)==240){u0=(u0&7)<<18|u1<<12|u2<<6|u3;}else{u4=u8Array[idx++]&63;if((u0&252)==248){u0=(u0&3)<<24|u1<<18|u2<<12|u3<<6|u4;}else{u5=u8Array[idx++]&63;u0=(u0&1)<<30|u1<<24|u2<<18|u3<<12|u4<<6|u5;}}}if(u0<65536){str+=String.fromCharCode(u0);}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023);}}}}Module["UTF8ArrayToString"]=UTF8ArrayToString;function UTF8ToString(ptr){return UTF8ArrayToString(HEAPU8,ptr);}Module["UTF8ToString"]=UTF8ToString;function stringToUTF8Array(str,outU8Array,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){if(outIdx>=endIdx)break;outU8Array[outIdx++]=u;}else if(u<=2047){if(outIdx+1>=endIdx)break;outU8Array[outIdx++]=192|u>>6;outU8Array[outIdx++]=128|u&63;}else if(u<=65535){if(outIdx+2>=endIdx)break;outU8Array[outIdx++]=224|u>>12;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63;}else if(u<=2097151){if(outIdx+3>=endIdx)break;outU8Array[outIdx++]=240|u>>18;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63;}else if(u<=67108863){if(outIdx+4>=endIdx)break;outU8Array[outIdx++]=248|u>>24;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63;}else{if(outIdx+5>=endIdx)break;outU8Array[outIdx++]=252|u>>30;outU8Array[outIdx++]=128|u>>24&63;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63;}}outU8Array[outIdx]=0;return outIdx-startIdx;}Module["stringToUTF8Array"]=stringToUTF8Array;function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite);}Module["stringToUTF8"]=stringToUTF8;function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){++len;}else if(u<=2047){len+=2;}else if(u<=65535){len+=3;}else if(u<=2097151){len+=4;}else if(u<=67108863){len+=5;}else{len+=6;}}return len;}Module["lengthBytesUTF8"]=lengthBytesUTF8;var UTF16Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf-16le"):undefined;function UTF32ToString(ptr){var i=0;var str="";while(1){var utf32=HEAP32[ptr+i*4>>2];if(utf32==0)return str;++i;if(utf32>=65536){var ch=utf32-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023);}else{str+=String.fromCharCode(utf32);}}}function demangle(func){var __cxa_demangle_func=Module["___cxa_demangle"]||Module["__cxa_demangle"];if(__cxa_demangle_func){try{var s=func.substr(1);var len=lengthBytesUTF8(s)+1;var buf=_malloc(len);stringToUTF8(s,buf,len);var status=_malloc(4);var ret=__cxa_demangle_func(buf,0,0,status);if(getValue(status,"i32")===0&&ret){return Pointer_stringify(ret);}}catch(e){}finally{if(buf)_free(buf);if(status)_free(status);if(ret)_free(ret);}return func;}Runtime.warnOnce("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling");return func;}function demangleAll(text){var regex=/__Z[\w\d_]+/g;return text.replace(regex,function(x){var y=demangle(x);return x===y?x:x+" ["+y+"]";});}function jsStackTrace(){var err=new Error();if(!err.stack){try{throw new Error(0);}catch(e){err=e;}if(!err.stack){return"(no stack trace available)";}}return err.stack.toString();}function stackTrace(){var js=jsStackTrace();if(Module["extraStackTrace"])js+="\n"+Module["extraStackTrace"]();return demangleAll(js);}Module["stackTrace"]=stackTrace;var WASM_PAGE_SIZE=65536;var ASMJS_PAGE_SIZE=16777216;var MIN_TOTAL_MEMORY=16777216;function alignUp(x,multiple){if(x%multiple>0){x+=multiple-x%multiple;}return x;}var HEAP;var buffer;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBuffer(buf){Module["buffer"]=buffer=buf;}function updateGlobalBufferViews(){Module["HEAP8"]=HEAP8=new Int8Array(buffer);Module["HEAP16"]=HEAP16=new Int16Array(buffer);Module["HEAP32"]=HEAP32=new Int32Array(buffer);Module["HEAPU8"]=HEAPU8=new Uint8Array(buffer);Module["HEAPU16"]=HEAPU16=new Uint16Array(buffer);Module["HEAPU32"]=HEAPU32=new Uint32Array(buffer);Module["HEAPF32"]=HEAPF32=new Float32Array(buffer);Module["HEAPF64"]=HEAPF64=new Float64Array(buffer);}var STATIC_BASE,STATICTOP,staticSealed;var STACK_BASE,STACKTOP,STACK_MAX;var DYNAMIC_BASE,DYNAMICTOP_PTR;STATIC_BASE=STATICTOP=STACK_BASE=STACKTOP=STACK_MAX=DYNAMIC_BASE=DYNAMICTOP_PTR=0;staticSealed=false;function abortOnCannotGrowMemory(){abort("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value "+TOTAL_MEMORY+", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which adjusts the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ");}if(!Module["reallocBuffer"])Module["reallocBuffer"]=function(size){var ret;try{if(ArrayBuffer.transfer){ret=ArrayBuffer.transfer(buffer,size);}else{var oldHEAP8=HEAP8;ret=new ArrayBuffer(size);var temp=new Int8Array(ret);temp.set(oldHEAP8);}}catch(e){return false;}var success=_emscripten_replace_memory(ret);if(!success)return false;return ret;};function enlargeMemory(){var PAGE_MULTIPLE=Module["usingWasm"]?WASM_PAGE_SIZE:ASMJS_PAGE_SIZE;var LIMIT=2147483648-PAGE_MULTIPLE;if(HEAP32[DYNAMICTOP_PTR>>2]>LIMIT){return false;}TOTAL_MEMORY=Math.max(TOTAL_MEMORY,MIN_TOTAL_MEMORY);while(TOTAL_MEMORY<HEAP32[DYNAMICTOP_PTR>>2]){if(TOTAL_MEMORY<=536870912){TOTAL_MEMORY=alignUp(2*TOTAL_MEMORY,PAGE_MULTIPLE);}else{TOTAL_MEMORY=Math.min(alignUp((3*TOTAL_MEMORY+2147483648)/4,PAGE_MULTIPLE),LIMIT);}}var replacement=Module["reallocBuffer"](TOTAL_MEMORY);if(!replacement||replacement.byteLength!=TOTAL_MEMORY){return false;}updateGlobalBuffer(replacement);updateGlobalBufferViews();return true;}var byteLength;try{byteLength=Function.prototype.call.bind(Object.getOwnPropertyDescriptor(ArrayBuffer.prototype,"byteLength").get);byteLength(new ArrayBuffer(4));}catch(e){byteLength=function(buffer){return buffer.byteLength;};}var TOTAL_STACK=Module["TOTAL_STACK"]||5242880;var TOTAL_MEMORY=Module["TOTAL_MEMORY"]||16777216;if(TOTAL_MEMORY<TOTAL_STACK)Module.printErr("TOTAL_MEMORY should be larger than TOTAL_STACK, was "+TOTAL_MEMORY+"! (TOTAL_STACK="+TOTAL_STACK+")");if(Module["buffer"]){buffer=Module["buffer"];}else{{buffer=new ArrayBuffer(TOTAL_MEMORY);}}updateGlobalBufferViews();function getTotalMemory(){return TOTAL_MEMORY;}HEAP32[0]=1668509029;HEAP16[1]=25459;if(HEAPU8[2]!==115||HEAPU8[3]!==99)throw"Runtime error: expected the system to be little-endian!";Module["HEAP"]=HEAP;Module["buffer"]=buffer;Module["HEAP8"]=HEAP8;Module["HEAP16"]=HEAP16;Module["HEAP32"]=HEAP32;Module["HEAPU8"]=HEAPU8;Module["HEAPU16"]=HEAPU16;Module["HEAPU32"]=HEAPU32;Module["HEAPF32"]=HEAPF32;Module["HEAPF64"]=HEAPF64;function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback();continue;}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){Module["dynCall_v"](func);}else{Module["dynCall_vi"](func,callback.arg);}}else{func(callback.arg===undefined?null:callback.arg);}}}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATEXIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift());}}callRuntimeCallbacks(__ATPRERUN__);}function ensureInitRuntime(){if(runtimeInitialized)return;runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__);}function preMain(){callRuntimeCallbacks(__ATMAIN__);}function exitRuntime(){callRuntimeCallbacks(__ATEXIT__);runtimeExited=true;}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift());}}callRuntimeCallbacks(__ATPOSTRUN__);}function addOnPreRun(cb){__ATPRERUN__.unshift(cb);}Module["addOnPreRun"]=addOnPreRun;function addOnInit(cb){__ATINIT__.unshift(cb);}Module["addOnInit"]=addOnInit;function addOnPreMain(cb){__ATMAIN__.unshift(cb);}Module["addOnPreMain"]=addOnPreMain;function addOnExit(cb){__ATEXIT__.unshift(cb);}Module["addOnExit"]=addOnExit;function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb);}Module["addOnPostRun"]=addOnPostRun;function intArrayFromString(stringy,dontAddNull,length){var len=length>0?length:lengthBytesUTF8(stringy)+1;var u8array=new Array(len);var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);if(dontAddNull)u8array.length=numBytesWritten;return u8array;}Module["intArrayFromString"]=intArrayFromString;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){chr&=255;}ret.push(String.fromCharCode(chr));}return ret.join("");}Module["intArrayToString"]=intArrayToString;function writeStringToMemory(string,buffer,dontAddNull){Runtime.warnOnce("writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!");var lastChar,end;if(dontAddNull){end=buffer+lengthBytesUTF8(string);lastChar=HEAP8[end];}stringToUTF8(string,buffer,Infinity);if(dontAddNull)HEAP8[end]=lastChar;}Module["writeStringToMemory"]=writeStringToMemory;function writeArrayToMemory(array,buffer){HEAP8.set(array,buffer);}Module["writeArrayToMemory"]=writeArrayToMemory;function writeAsciiToMemory(str,buffer,dontAddNull){for(var i=0;i<str.length;++i){HEAP8[buffer++>>0]=str.charCodeAt(i);}if(!dontAddNull)HEAP8[buffer>>0]=0;}Module["writeAsciiToMemory"]=writeAsciiToMemory;if(!Math["imul"]||Math["imul"](4294967295,5)!==-5)Math["imul"]=function imul(a,b){var ah=a>>>16;var al=a&65535;var bh=b>>>16;var bl=b&65535;return al*bl+(ah*bl+al*bh<<16)|0;};Math.imul=Math["imul"];if(!Math["clz32"])Math["clz32"]=function(x){x=x>>>0;for(var i=0;i<32;i++){if(x&1<<31-i)return i;}return 32;};Math.clz32=Math["clz32"];if(!Math["trunc"])Math["trunc"]=function(x){return x<0?Math.ceil(x):Math.floor(x);};Math.trunc=Math["trunc"];var Math_abs=Math.abs;var Math_cos=Math.cos;var Math_sin=Math.sin;var Math_tan=Math.tan;var Math_acos=Math.acos;var Math_asin=Math.asin;var Math_atan=Math.atan;var Math_atan2=Math.atan2;var Math_exp=Math.exp;var Math_log=Math.log;var Math_sqrt=Math.sqrt;var Math_ceil=Math.ceil;var Math_floor=Math.floor;var Math_pow=Math.pow;var Math_imul=Math.imul;var Math_fround=Math.fround;var Math_round=Math.round;var Math_min=Math.min;var Math_clz32=Math.clz32;var Math_trunc=Math.trunc;var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies);}}Module["addRunDependency"]=addRunDependency;function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies);}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null;}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback();}}}Module["removeRunDependency"]=removeRunDependency;Module["preloadedImages"]={};Module["preloadedAudios"]={};var ASM_CONSTS=[function($0,$1){{return Module.bitmapExporter.prepare($0,$1);}},function($0,$1,$2,$3,$4,$5){{Module.bitmapExporter.putImagePart($0,$1,$2,$3,$4,$5);}},function(){{Module.bitmapProvider.handleContextLost();}},function(){{Module.bitmapProvider.handleContextRestored();}},function($0){{return Module.bitmapProvider.getBitmapIndex(Pointer_stringify($0));}},function($0){{return Module.bitmapProvider.getBitmapWidth($0);}},function($0){{return Module.bitmapProvider.getBitmapHeight($0);}},function($0){{return Module.bitmapProvider.getNumberOfFragments($0);}},function($0,$1){{return Module.bitmapProvider.queryFragmentCoordinates($0,$1);}},function(){{return Module.bitmapProvider.getX();}},function(){{return Module.bitmapProvider.getY();}},function(){{return Module.bitmapProvider.getWidth();}},function(){{return Module.bitmapProvider.getHeight();}},function(){{return Module.bitmapProvider.getUTopLeft();}},function(){{return Module.bitmapProvider.getVTopLeft();}},function(){{return Module.bitmapProvider.getUBottomRight();}},function(){{return Module.bitmapProvider.getVBottomRight();}},function($0,$1){{return Module.bitmapProvider.bind($0,$1);}},function(){{Module.browserTypesetter.handleContextLost();}},function(){{Module.browserTypesetter.handleContextRestored();}},function(){{return Module.timerFactory.createTimer();}},function($0){{Module.timerFactory.stopTimer($0);}},function($0,$1){{Module.timerFactory.startTimer($0,$1);}},function($0){{Module.browserTypesetter.deleteTypeset($0);}},function(){{return Module.browserTypesetter.createTypeset();}},function($0,$1,$2,$3,$4,$5){{const typeset=Module.browserTypesetter.getTypeset($0);if(!typeset){return false;}return typeset.update(UTF32ToString($1),$2,$3===0?"ltr":"rtl",$4,$5);}},function($0){{return Module.browserTypesetter.getTypeset($0).getFragmentCount();}},function($0,$1){{return Module.browserTypesetter.getTypeset($0).getXBase($1);}},function($0,$1){{return Module.browserTypesetter.getTypeset($0).getYBase($1);}},function($0,$1){{return Module.browserTypesetter.getTypeset($0).getXOpposite($1);}},function($0,$1){{return Module.browserTypesetter.getTypeset($0).getYOpposite($1);}},function($0){{return Module.browserTypesetter.getTypeset($0).getLineHeight();}},function($0){{return Module.browserTypesetter.getTypeset($0).getDescent();}},function($0,$1){{const typeset=Module.browserTypesetter.getTypeset($0);if(!typeset){return false;}return typeset.bindStroke($1);}},function($0,$1){{const typeset=Module.browserTypesetter.getTypeset($0);if(!typeset){return false;}return typeset.bindNormal($1);}},function($0,$1,$2,$3,$4,$5){{Module.handleScrollChanged($0,$1,$2,$3,$4,$5);}},function(){{Module.handleTextInputEnded();}},function(){{Module.handleTextInputStarted();}},function($0,$1,$2,$3,$4){{Module.handleShapeParametersChanged($0,$1,$2,$3,$4);}}];function _emscripten_asm_const_iiiiii(code,a0,a1,a2,a3,a4){return ASM_CONSTS[code](a0,a1,a2,a3,a4);}function _emscripten_asm_const_dii(code,a0,a1){return ASM_CONSTS[code](a0,a1);}function _emscripten_asm_const_i(code){return ASM_CONSTS[code]();}function _emscripten_asm_const_iiiiiii(code,a0,a1,a2,a3,a4,a5){return ASM_CONSTS[code](a0,a1,a2,a3,a4,a5);}function _emscripten_asm_const_ii(code,a0){return ASM_CONSTS[code](a0);}function _emscripten_asm_const_iiddidd(code,a0,a1,a2,a3,a4,a5){return ASM_CONSTS[code](a0,a1,a2,a3,a4,a5);}function _emscripten_asm_const_v(code){return ASM_CONSTS[code]();}function _emscripten_asm_const_iii(code,a0,a1){return ASM_CONSTS[code](a0,a1);}function _emscripten_asm_const_d(code){return ASM_CONSTS[code]();}STATIC_BASE=8;STATICTOP=STATIC_BASE+40064;__ATINIT__.push({func:function(){__GLOBAL__sub_I_duplicator_cpp();}},{func:function(){__GLOBAL__sub_I_bindings_cpp();}},{func:function(){__GLOBAL__sub_I_bind_cpp();}});allocate([92,36,0,0,72,37,0,0,132,36,0,0,52,37,0,0,8,0,0,0,0,0,0,0,132,36,0,0,94,37,0,0,8,11,0,0,0,0,0,0,132,36,0,0,112,38,0,0,8,0,0,0,0,0,0,0,132,36,0,0,19,38,0,0,8,11,0,0,0,0,0,0,132,36,0,0,14,39,0,0,8,0,0,0,0,0,0,0,132,36,0,0,175,38,0,0,8,11,0,0,0,0,0,0,132,36,0,0,169,39,0,0,8,0,0,0,0,0,0,0,132,36,0,0,76,39,0,0,8,11,0,0,0,0,0,0,132,36,0,0,67,40,0,0,8,0,0,0,0,0,0,0,132,36,0,0,230,39,0,0,8,11,0,0,0,0,0,0,132,36,0,0,233,40,0,0,8,0,0,0,0,0,0,0,132,36,0,0,134,40,0,0,8,11,0,0,0,0,0,0,132,36,0,0,136,41,0,0,240,0,0,0,0,0,0,0,132,36,0,0,43,41,0,0,8,11,0,0,0,0,0,0,92,36,0,0,154,41,0,0,132,36,0,0,173,41,0,0,8,1,0,0,0,0,0,0,92,36,0,0,197,41,0,0,132,36,0,0,240,41,0,0,48,1,0,0,0,0,0,0,132,36,0,0,212,41,0,0,32,11,0,0,0,0,0,0,92,36,0,0,254,41,0,0,132,36,0,0,13,42,0,0,8,1,0,0,0,0,0,0,132,36,0,0,40,42,0,0,8,1,0,0,0,0,0,0,132,36,0,0,59,42,0,0,8,1,0,0,0,0,0,0,132,36,0,0,81,42,0,0,8,1,0,0,0,0,0,0,132,36,0,0,107,42,0,0,136,1,0,0,0,0,0,0,92,36,0,0,128,42,0,0,132,36,0,0,197,42,0,0,8,11,0,0,0,0,0,0,132,36,0,0,89,43,0,0,8,11,0,0,0,0,0,0,132,36,0,0,237,43,0,0,8,11,0,0,0,0,0,0,132,36,0,0,125,44,0,0,8,11,0,0,0,0,0,0,132,36,0,0,48,45,0,0,8,11,0,0,0,0,0,0,132,36,0,0,180,45,0,0,136,1,0,0,0,0,0,0,132,36,0,0,57,46,0,0,8,11,0,0,0,0,0,0,132,36,0,0,187,46,0,0,136,1,0,0,0,0,0,0,132,36,0,0,239,46,0,0,136,1,0,0,0,0,0,0,132,36,0,0,3,47,0,0,136,1,0,0,0,0,0,0,132,36,0,0,28,47,0,0,136,1,0,0,0,0,0,0,132,36,0,0,69,51,0,0,232,2,0,0,0,0,0,0,132,36,0,0,92,47,0,0,8,11,0,0,0,0,0,0,20,37,0,0,187,47,0,0,0,0,0,0,2,0,0,0,8,1,0,0,2,0,0,0,128,2,0,0,0,4,0,0,92,36,0,0,205,47,0,0,132,36,0,0,27,48,0,0,8,11,0,0,0,0,0,0,132,36,0,0,173,48,0,0,8,11,0,0,0,0,0,0,132,36,0,0,59,49,0,0,8,11,0,0,0,0,0,0,132,36,0,0,202,49,0,0,8,11,0,0,0,0,0,0,132,36,0,0,88,50,0,0,8,11,0,0,0,0,0,0,132,36,0,0,229,50,0,0,8,11,0,0,0,0,0,0,92,36,0,0,101,51,0,0,132,36,0,0,120,51,0,0,232,2,0,0,0,0,0,0,132,36,0,0,68,56,0,0,232,2,0,0,0,0,0,0,132,36,0,0,195,51,0,0,8,11,0,0,0,0,0,0,132,36,0,0,96,52,0,0,8,11,0,0,0,0,0,0,132,36,0,0,203,52,0,0,64,3,0,0,0,0,0,0,132,36,0,0,233,52,0,0,8,1,0,0,0,0,0,0,132,36,0,0,91,53,0,0,8,11,0,0,0,0,0,0,132,36,0,0,198,53,0,0,112,3,0,0,0,0,0,0,132,36,0,0,228,53,0,0,8,1,0,0,0,0,0,0,132,36,0,0,82,54,0,0,8,11,0,0,0,0,0,0,132,36,0,0,185,54,0,0,160,3,0,0,0,0,0,0,132,36,0,0,211,54,0,0,8,1,0,0,0,0,0,0,132,36,0,0,79,55,0,0,8,11,0,0,0,0,0,0,132,36,0,0,228,55,0,0,8,11,0,0,0,0,0,0,132,36,0,0,124,57,0,0,0,4,0,0,0,0,0,0,132,36,0,0,138,56,0,0,8,11,0,0,0,0,0,0,132,36,0,0,25,57,0,0,8,11,0,0,0,0,0,0,92,36,0,0,144,57,0,0,132,36,0,0,217,57,0,0,8,11,0,0,0,0,0,0,132,36,0,0,116,58,0,0,8,11,0,0,0,0,0,0,132,36,0,0,21,59,0,0,8,11,0,0,0,0,0,0,132,36,0,0,181,59,0,0,8,11,0,0,0,0,0,0,132,36,0,0,69,62,0,0,232,2,0,0,0,0,0,0,132,36,0,0,79,60,0,0,8,11,0,0,0,0,0,0,132,36,0,0,229,60,0,0,8,11,0,0,0,0,0,0,20,37,0,0,71,61,0,0,0,0,0,0,2,0,0,0,8,1,0,0,2,0,0,0,128,2,0,0,0,4,0,0,132,36,0,0,165,61,0,0,176,4,0,0,0,0,0,0,92,36,0,0,92,61,0,0,92,36,0,0,35,62,0,0,20,37,0,0,95,62,0,0,0,0,0,0,2,0,0,0,216,4,0,0,2,0,0,0,224,4,0,0,2,4,0,0,92,36,0,0,130,62,0,0,92,36,0,0,108,62,0,0,132,36,0,0,183,62,0,0,176,4,0,0,0,0,0,0,92,36,0,0,144,62,0,0,132,36,0,0,57,63,0,0,24,5,0,0,0,0,0,0,92,36,0,0,18,63,0,0,92,36,0,0,166,63,0,0,132,36,0,0,1,64,0,0,56,5,0,0,0,0,0,0,92,36,0,0,218,63,0,0,92,36,0,0,126,64,0,0,132,36,0,0,233,64,0,0,176,4,0,0,0,0,0,0,92,36,0,0,194,64,0,0,132,36,0,0,117,65,0,0,8,11,0,0,0,0,0,0,132,36,0,0,0,66,0,0,8,11,0,0,0,0,0,0,132,36,0,0,90,66,0,0,136,5,0,0,0,0,0,0,92,36,0,0,105,66,0,0,92,36,0,0,121,66,0,0,132,36,0,0,143,66,0,0,168,5,0,0,0,0,0,0,92,36,0,0,176,66,0,0,132,36,0,0,203,66,0,0,192,5,0,0,0,0,0,0,20,37,0,0,229,66,0,0,0,0,0,0,2,0,0,0,168,5,0,0,2,0,0,0,224,5,0,0,2,4,0,0,92,36,0,0,4,67,0,0,20,37,0,0,26,67,0,0,0,0,0,0,2,0,0,0,8,6,0,0,2,0,0,0,16,6,0,0,2,4,0,0,92,36,0,0,88,67,0,0,92,36,0,0,54,67,0,0,92,36,0,0,117,67,0,0,92,36,0,0,138,67,0,0,132,36,0,0,168,67,0,0,16,6,0,0,0,0,0,0,20,37,0,0,186,81,0,0,0,0,0,0,2,0,0,0,120,6,0,0,2,0,0,0,16,6,0,0,2,4,0,0,20,37,0,0,138,81,0,0,0,0,0,0,1,0,0,0,112,6,0,0,2,4,0,0,92,36,0,0,165,81,0,0,92,36,0,0,215,81,0,0,132,36,0,0,43,96,0,0,144,6,0,0,0,0,0,0,92,36,0,0,65,96,0,0,132,36,0,0,88,96,0,0,136,5,0,0,0,0,0,0,20,37,0,0,117,96,0,0,0,0,0,0,2,0,0,0,200,6,0,0,2,0,0,0,16,6,0,0,2,4,0,0,92,36,0,0,149,96,0,0,132,36,0,0,234,96,0,0,8,11,0,0,0,0,0,0,132,36,0,0,81,97,0,0,240,6,0,0,0,0,0,0,92,36,0,0,107,97,0,0,132,36,0,0,128,97,0,0,8,7,0,0,0,0,0,0,132,36,0,0,164,97,0,0,24,7,0,0,0,0,0,0,92,36,0,0,188,97,0,0,132,36,0,0,26,98,0,0,56,7,0,0,0,0,0,0,92,36,0,0,214,97,0,0,92,36,0,0,198,98,0,0,132,36,0,0,103,99,0,0,176,4,0,0,0,0,0,0,92,36,0,0,35,99,0,0,132,36,0,0,16,100,0,0,8,11,0,0,0,0,0,0,132,36,0,0,171,100,0,0,8,11,0,0,0,0,0,0,132,36,0,0,75,101,0,0,8,11,0,0,0,0,0,0,132,36,0,0,238,101,0,0,8,11,0,0,0,0,0,0,132,36,0,0,153,102,0,0,8,11,0,0,0,0,0,0,132,36,0,0,10,103,0,0,184,7,0,0,0,0,0,0,92,36,0,0,22,103,0,0,132,36,0,0,73,103,0,0,8,11,0,0,0,0,0,0,132,36,0,0,206,103,0,0,8,11,0,0,0,0,0,0,248,36,0,0,246,107,0,0,248,36,0,0,225,107,0,0,248,36,0,0,201,107,0,0,92,36,0,0,164,107,0,0,220,36,0,0,146,107,0,0,0,0,0,0,248,7,0,0,220,36,0,0,127,107,0,0,1,0,0,0,248,7,0,0,20,37,0,0,207,106,0,0,0,0,0,0,1,0,0,0,56,8,0,0,0,0,0,0,92,36,0,0,14,107,0,0,92,36,0,0,52,107,0,0,92,36,0,0,66,107,0,0,92,36,0,0,86,107,0,0,92,36,0,0,100,107,0,0,92,36,0,0,186,107,0,0,132,36,0,0,124,108,0,0,144,5,0,0,0,0,0,0,132,36,0,0,14,113,0,0,40,6,0,0,0,0,0,0,132,36,0,0,1,111,0,0,8,11,0,0,0,0,0,0,132,36,0,0,149,111,0,0,32,6,0,0,0,0,0,0,132,36,0,0,65,112,0,0,8,11,0,0,0,0,0,0,132,36,0,0,157,112,0,0,24,6,0,0,0,0,0,0,132,36,0,0,21,114,0,0,232,8,0,0,0,0,0,0,132,36,0,0,80,113,0,0,8,11,0,0,0,0,0,0,132,36,0,0,48,114,0,0,16,6,0,0,0,0,0,0,132,36,0,0,105,115,0,0,48,9,0,0,0,0,0,0,132,36,0,0,160,114,0,0,8,11,0,0,0,0,0,0,132,36,0,0,78,115,0,0,40,9,0,0,0,0,0,0,92,36,0,0,92,115,0,0,92,36,0,0,127,115,0,0,132,36,0,0,196,115,0,0,72,9,0,0,0,0,0,0,92,36,0,0,212,115,0,0,132,36,0,0,214,118,0,0,8,11,0,0,0,0,0,0,132,36,0,0,49,120,0,0,112,9,0,0,0,0,0,0,92,36,0,0,71,120,0,0,132,36,0,0,99,120,0,0,136,9,0,0,0,0,0,0,92,36,0,0,122,120,0,0,132,36,0,0,31,121,0,0,176,4,0,0,0,0,0,0,92,36,0,0,200,120,0,0,132,36,0,0,224,121,0,0,176,4,0,0,0,0,0,0,92,36,0,0,135,121,0,0,132,36,0,0,185,122,0,0,176,4,0,0,0,0,0,0,92,36,0,0,72,122,0,0,132,36,0,0,85,123,0,0,176,4,0,0,0,0,0,0,92,36,0,0,33,123,0,0,132,36,0,0,241,123,0,0,176,4,0,0,0,0,0,0,92,36,0,0,189,123,0,0,132,36,0,0,238,124,0,0,8,11,0,0,0,0,0,0,132,36,0,0,76,126,0,0,8,11,0,0,0,0,0,0,132,36,0,0,230,126,0,0,8,11,0,0,0,0,0,0,132,36,0,0,130,127,0,0,8,11,0,0,0,0,0,0,132,36,0,0,236,127,0,0,240,6,0,0,0,0,0,0,132,36,0,0,214,128,0,0,8,11,0,0,0,0,0,0,20,37,0,0,126,135,0,0,0,0,0,0,1,0,0,0,56,8,0,0,0,0,0,0,20,37,0,0,63,135,0,0,0,0,0,0,1,0,0,0,56,8,0,0,0,0,0,0,92,36,0,0,44,135,0,0,92,36,0,0,13,135,0,0,92,36,0,0,52,134,0,0,92,36,0,0,21,134,0,0,92,36,0,0,246,133,0,0,92,36,0,0,215,133,0,0,92,36,0,0,184,133,0,0,92,36,0,0,83,134,0,0,92,36,0,0,114,134,0,0,92,36,0,0,145,134,0,0,92,36,0,0,176,134,0,0,92,36,0,0,207,134,0,0,92,36,0,0,238,134,0,0,92,36,0,0,201,145,0,0,20,37,0,0,226,145,0,0,0,0,0,0,1,0,0,0,0,11,0,0,0,0,0,0,92,36,0,0,115,147,0,0,132,36,0,0,211,147,0,0,56,11,0,0,0,0,0,0,132,36,0,0,128,147,0,0,72,11,0,0,0,0,0,0,92,36,0,0,161,147,0,0,132,36,0,0,174,147,0,0,40,11,0,0,0,0,0,0,132,36,0,0,196,148,0,0,32,11,0,0,0,0,0,0,132,36,0,0,4,149,0,0,56,11,0,0,0,0,0,0,132,36,0,0,224,148,0,0,112,11,0,0,0,0,0,0,132,36,0,0,38,149,0,0,56,11,0,0,0,0,0,0,192,36,0,0,78,149,0,0,192,36,0,0,80,149,0,0,192,36,0,0,83,149,0,0,192,36,0,0,85,149,0,0,192,36,0,0,87,149,0,0,192,36,0,0,89,149,0,0,192,36,0,0,91,149,0,0,192,36,0,0,222,85,0,0,192,36,0,0,93,149,0,0,192,36,0,0,95,149,0,0,192,36,0,0,97,149,0,0,192,36,0,0,99,149,0,0,192,36,0,0,101,149,0,0,192,36,0,0,103,149,0,0,132,36,0,0,105,149,0,0,56,11,0,0,0,0,0,0,132,36,0,0,138,149,0,0,40,11,0,0,0,0,0,0,0,0,0,0,16,0,0,0,1,0,0,0,2,0,0,0,1,0,0,0,1,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,32,0,0,0,3,0,0,0,4,0,0,0,5,0,0,0,1,0,0,0,6,0,0,0,0,0,0,0,48,0,0,0,7,0,0,0,8,0,0,0,3,0,0,0,3,0,0,0,4,0,0,0,4,0,0,0,0,0,0,0,64,0,0,0,3,0,0,0,9,0,0,0,10,0,0,0,2,0,0,0,11,0,0,0,0,0,0,0,80,0,0,0,12,0,0,0,13,0,0,0,5,0,0,0,5,0,0,0,6,0,0,0,6,0,0,0,0,0,0,0,96,0,0,0,3,0,0,0,14,0,0,0,15,0,0,0,3,0,0,0,16,0,0,0,0,0,0,0,112,0,0,0,17,0,0,0,18,0,0,0,7,0,0,0,7,0,0,0,8,0,0,0,8,0,0,0,0,0,0,0,128,0,0,0,3,0,0,0,19,0,0,0,20,0,0,0,4,0,0,0,21,0,0,0,0,0,0,0,144,0,0,0,22,0,0,0,23,0,0,0,9,0,0,0,9,0,0,0,10,0,0,0,10,0,0,0,0,0,0,0,160,0,0,0,3,0,0,0,24,0,0,0,25,0,0,0,5,0,0,0,26,0,0,0,0,0,0,0,176,0,0,0,27,0,0,0,28,0,0,0,11,0,0,0,11,0,0,0,12,0,0,0,12,0,0,0,0,0,0,0,192,0,0,0,3,0,0,0,29,0,0,0,30,0,0,0,6,0,0,0,31,0,0,0,0,0,0,0,208,0,0,0,32,0,0,0,33,0,0,0,13,0,0,0,14,0,0,0,13,0,0,0,34,0,0,0,35,0,0,0,36,0,0,0,15,0,0,0,14,0,0,0,16,0,0,0,15,0,0,0,16,0,0,0,1,0,0,0,17,0,0,0,18,0,0,0,0,0,0,0,224,0,0,0,3,0,0,0,37,0,0,0,38,0,0,0,7,0,0,0,39,0,0,0,0,0,0,0,248,0,0,0,40,0,0,0,41,0,0,0,19,0,0,0,20,0,0,0,0,0,0,0,16,1,0,0,42,0,0,0,43,0,0,0,21,0,0,0,0,0,0,0,32,1,0,0,44,0,0,0,45,0,0,0,17,0,0,0,0,0,0,0,56,1,0,0,46,0,0,0,47,0,0,0,22,0,0,0,23,0,0,0,0,0,0,0,72,1,0,0,48,0,0,0,49,0,0,0,24,0,0,0,25,0,0,0,0,0,0,0,88,1,0,0,50,0,0,0,51,0,0,0,26,0,0,0,27,0,0,0,0,0,0,0,104,1,0,0,52,0,0,0,53,0,0,0,28,0,0,0,29,0,0,0,0,0,0,0,120,1,0,0,54,0,0,0,55,0,0,0,18,0,0,0,30,0,0,0,31,0,0,0,56,0,0,0,19,0,0,0,20,0,0,0,32,0,0,0,33,0,0,0,2,0,0,0,34,0,0,0,35,0,0,0,0,0,0,0,144,1,0,0,3,0,0,0,57,0,0,0,58,0,0,0,8,0,0,0,59,0,0,0,0,0,0,0,160,1,0,0,3,0,0,0,60,0,0,0,61,0,0,0,9,0,0,0,62,0,0,0,0,0,0,0,176,1,0,0,3,0,0,0,63,0,0,0,64,0,0,0,10,0,0,0,65,0,0,0,0,0,0,0,192,1,0,0,3,0,0,0,66,0,0,0,67,0,0,0,11,0,0,0,68,0,0,0,0,0,0,0,208,1,0,0,3,0,0,0,69,0,0,0,70,0,0,0,12,0,0,0,71,0,0,0,0,0,0,0,224,1,0,0,72,0,0,0,73,0,0,0,21,0,0,0,36,0,0,0,37,0,0,0,74,0,0,0,22,0,0,0,23,0,0,0,38,0,0,0,39,0,0,0,3,0,0,0,40,0,0,0,41,0,0,0,0,0,0,0,240,1,0,0,3,0,0,0,75,0,0,0,76,0,0,0,13,0,0,0,77,0,0,0,0,0,0,0,0,2,0,0,78,0,0,0,79,0,0,0,24,0,0,0,42,0,0,0,43,0,0,0,80,0,0,0,25,0,0,0,26,0,0,0,44,0,0,0,45,0,0,0,4,0,0,0,46,0,0,0,47,0,0,0,0,0,0,0,16,2,0,0,81,0,0,0,82,0,0,0,27,0,0,0,48,0,0,0,49,0,0,0,83,0,0,0,28,0,0,0,29,0,0,0,50,0,0,0,51,0,0,0,5,0,0,0,52,0,0,0,53,0,0,0,0,0,0,0,32,2,0,0,84,0,0,0,85,0,0,0,30,0,0,0,54,0,0,0,55,0,0,0,86,0,0,0,31,0,0,0,32,0,0,0,56,0,0,0,57,0,0,0,6,0,0,0,58,0,0,0,59,0,0,0,0,0,0,0,48,2,0,0,87,0,0,0,88,0,0,0,33,0,0,0,60,0,0,0,61,0,0,0,89,0,0,0,34,0,0,0,35,0,0,0,62,0,0,0,63,0,0,0,7,0,0,0,64,0,0,0,65,0,0,0,0,0,0,0,64,2,0,0,90,0,0,0,91,0,0,0,66,0,0,0,67,0,0,0,1,0,0,0,2,0,0,0,3,0,0,0,4,0,0,0,1,0,0,0,5,0,0,0,6,0,0,0,7,0,0,0,8,0,0,0,9,0,0,0,0,0,0,0,80,2,0,0,3,0,0,0,92,0,0,0,93,0,0,0,14,0,0,0,94,0,0,0,0,0,0,0,8,1,0,0,95,0,0,0,96,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,96,2,0,0,97,0,0,0,98,0,0,0,68,0,0,0,69,0,0,0,0,0,0,0,136,2,0,0,3,0,0,0,99,0,0,0,100,0,0,0,15,0,0,0,101,0,0,0,0,0,0,0,152,2,0,0,3,0,0,0,102,0,0,0,103,0,0,0,16,0,0,0,104,0,0,0,0,0,0,0,168,2,0,0,3,0,0,0,105,0,0,0,106,0,0,0,17,0,0,0,107,0,0,0,0,0,0,0,184,2,0,0,3,0,0,0,108,0,0,0,109,0,0,0,18,0,0,0,110,0,0,0,0,0,0,0,200,2,0,0,3,0,0,0,111,0,0,0,112,0,0,0,19,0,0,0,113,0,0,0,0,0,0,0,216,2,0,0,3,0,0,0,114,0,0,0,115,0,0,0,20,0,0,0,116,0,0,0,0,0,0,0,240,2,0,0,90,0,0,0,117,0,0,0,70,0,0,0,71,0,0,0,10,0,0,0,11,0,0,0,12,0,0,0,13,0,0,0,2,0,0,0,14,0,0,0,15,0,0,0,16,0,0,0,17,0,0,0,18,0,0,0,0,0,0,0,0,3,0,0,118,0,0,0,119,0,0,0,72,0,0,0,73,0,0,0,19,0,0,0,20,0,0,0,21,0,0,0,22,0,0,0,3,0,0,0,23,0,0,0,24,0,0,0,25,0,0,0,26,0,0,0,27,0,0,0,0,0,0,0,16,3,0,0,3,0,0,0,120,0,0,0,121,0,0,0,21,0,0,0,122,0,0,0,0,0,0,0,32,3,0,0,3,0,0,0,123,0,0,0,124,0,0,0,22,0,0,0,125,0,0,0,0,0,0,0,64,3,0,0,126,0,0,0,127,0,0,0,74,0,0,0,75,0,0,0,0,0,0,0,48,3,0,0,126,0,0,0,128,0,0,0,74,0,0,0,75,0,0,0,0,0,0,0,80,3,0,0,3,0,0,0,129,0,0,0,130,0,0,0,23,0,0,0,131,0,0,0,0,0,0,0,112,3,0,0,132,0,0,0,133,0,0,0,76,0,0,0,77,0,0,0,0,0,0,0,96,3,0,0,132,0,0,0,134,0,0,0,76,0,0,0,77,0,0,0,0,0,0,0,128,3,0,0,3,0,0,0,135,0,0,0,136,0,0,0,24,0,0,0,137,0,0,0,0,0,0,0,160,3,0,0,138,0,0,0,139,0,0,0,78,0,0,0,79,0,0,0,0,0,0,0,144,3,0,0,138,0,0,0,140,0,0,0,78,0,0,0,79,0,0,0,0,0,0,0,176,3,0,0,3,0,0,0,141,0,0,0,142,0,0,0,25,0,0,0,143,0,0,0,0,0,0,0,192,3,0,0,3,0,0,0,144,0,0,0,145,0,0,0,26,0,0,0,146,0,0,0,0,0,0,0,208,3,0,0,147,0,0,0,148,0,0,0,36,0,0,0,37,0,0,0,38,0,0,0,39,0,0,0,40,0,0,0,41,0,0,0,42,0,0,0,43,0,0,0,44,0,0,0,45,0,0,0,46,0,0,0,47,0,0,0,48,0,0,0,1,0,0,0,80,0,0,0,49,0,0,0,27,0,0,0,149,0,0,0,28,0,0,0,150,0,0,0,50,0,0,0,29,0,0,0,51,0,0,0,30,0,0,0,31,0,0,0,0,0,0,0,224,3,0,0,3,0,0,0,151,0,0,0,152,0,0,0,32,0,0,0,153,0,0,0,0,0,0,0,240,3,0,0,3,0,0,0,154,0,0,0,155,0,0,0,33,0,0,0,156,0,0,0,0,0,0,0,8,4,0,0,3,0,0,0,157,0,0,0,158,0,0,0,34,0,0,0,159,0,0,0,0,0,0,0,24,4,0,0,3,0,0,0,160,0,0,0,161,0,0,0,35,0,0,0,162,0,0,0,0,0,0,0,40,4,0,0,3,0,0,0,163,0,0,0,164,0,0,0,36,0,0,0,165,0,0,0,0,0,0,0,56,4,0,0,3,0,0,0,166,0,0,0,167,0,0,0,37,0,0,0,168,0,0,0,0,0,0,0,72,4,0,0,169,0,0,0,170,0,0,0,81,0,0,0,82,0,0,0,28,0,0,0,29,0,0,0,30,0,0,0,31,0,0,0,4,0,0,0,32,0,0,0,33,0,0,0,34,0,0,0,35,0,0,0,36,0,0,0,0,0,0,0,88,4,0,0,3,0,0,0,171,0,0,0,172,0,0,0,38,0,0,0,173,0,0,0,0,0,0,0,104,4,0,0,3,0,0,0,174,0,0,0,175,0,0,0,39,0,0,0,176,0,0,0,0,0,0,0,120,4,0,0,177,0,0,0,178,0,0,0,83,0,0,0,84,0,0,0,0,0,0,0,152,4,0,0,179,0,0,0,180,0,0,0,52,0,0,0,85,0,0,0,181,0,0,0,182,0,0,0,183,0,0,0,40,0,0,0,53,0,0,0,0,0,0,0,184,4,0,0,184,0,0,0,185,0,0,0,54,0,0,0,55,0,0,0,41,0,0,0,1,0,0,0,56,0,0,0,57,0,0,0,86,0,0,0,58,0,0,0,1,0,0,0,2,0,0,0,42,0,0,0,43,0,0,0,44,0,0,0,45,0,0,0,59,0,0,0,46,0,0,0,47,0,0,0,60,0,0,0,61,0,0,0,62,0,0,0,48,0,0,0,49,0,0,0,50,0,0,0,63,0,0,0,64,0,0,0,51,0,0,0,65,0,0,0,66,0,0,0,87,0,0,0,67,0,0,0,52,0,0,0,88,0,0,0,252,255,255,255,184,4,0,0,186,0,0,0,187,0,0,0,89,0,0,0,0,0,0,0,64,5,0,0,188,0,0,0,189,0,0,0,68,0,0,0,90,0,0,0,190,0,0,0,191,0,0,0,192,0,0,0,53,0,0,0,69,0,0,0,0,0,0,0,32,5,0,0,193,0,0,0,194,0,0,0,70,0,0,0,91,0,0,0,195,0,0,0,196,0,0,0,1,0,0,0,54,0,0,0,71,0,0,0,0,0,0,0,0,5,0,0,197,0,0,0,198,0,0,0,72,0,0,0,92,0,0,0,199,0,0,0,200,0,0,0,93,0,0,0,55,0,0,0,73,0,0,0,0,0,0,0,232,4,0,0,188,0,0,0,201,0,0,0,74,0,0,0,94,0,0,0,202,0,0,0,203,0,0,0,204,0,0,0,56,0,0,0,75,0,0,0,0,0,0,0,88,5,0,0,3,0,0,0,205,0,0,0,206,0,0,0,57,0,0,0,207,0,0,0,0,0,0,0,104,5,0,0,3,0,0,0,208,0,0,0,209,0,0,0,58,0,0,0,210,0,0,0,0,0,0,0,120,5,0,0,211,0,0,0,212,0,0,0,76,0,0,0,77,0,0,0,78,0,0,0,1,0,0,0,2,0,0,0,3,0,0,0,0,0,0,0,152,5,0,0,213,0,0,0,214,0,0,0,215,0,0,0,0,0,0,0,176,5,0,0,216,0,0,0,217,0,0,0,218,0,0,0,79,0,0,0,219,0,0,0,220,0,0,0,221,0,0,0,80,0,0,0,81,0,0,0,252,255,255,255,176,5,0,0,222,0,0,0,223,0,0,0,224,0,0,0,82,0,0,0,83,0,0,0,0,0,0,0,232,5,0,0,225,0,0,0,226,0,0,0,84,0,0,0,85,0,0,0,86,0,0,0,227,0,0,0,5,0,0,0,252,255,255,255,232,5,0,0,228,0,0,0,229,0,0,0,230,0,0,0,6,0,0,0,0,0,0,0,56,6,0,0,231,0,0,0,232,0,0,0,87,0,0,0,88,0,0,0,89,0,0,0,90,0,0,0,91,0,0,0,92,0,0,0,93,0,0,0,94,0,0,0,233,0,0,0,7,0,0,0,252,255,255,255,56,6,0,0,234,0,0,0,235,0,0,0,236,0,0,0,8,0,0,0,0,0,0,0,88,6,0,0,237,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,0,0,0,0,128,6,0,0,238,0,0,0,239,0,0,0,1,0,0,0,240,0,0,0,0,0,0,0,152,6,0,0,241,0,0,0,242,0,0,0,95,0,0,0,96,0,0,0,97,0,0,0,2,0,0,0,4,0,0,0,5,0,0,0,0,0,0,0,168,6,0,0,243,0,0,0,244,0,0,0,98,0,0,0,99,0,0,0,100,0,0,0,95,0,0,0,96,0,0,0,97,0,0,0,98,0,0,0,99,0,0,0,100,0,0,0,245,0,0,0,9,0,0,0,252,255,255,255,168,6,0,0,246,0,0,0,247,0,0,0,248,0,0,0,10,0,0,0,0,0,0,0,224,6,0,0,249,0,0,0,250,0,0,0,101,0,0,0,102,0,0,0,6,0,0,0,7,0,0,0,8,0,0,0,9,0,0,0,10,0,0,0,2,0,0,0,3,0,0,0,59,0,0,0,101,0,0,0,1,0,0,0,102,0,0,0,103,0,0,0,60,0,0,0,11,0,0,0,12,0,0,0,103,0,0,0,13,0,0,0,104,0,0,0,14,0,0,0,15,0,0,0,105,0,0,0,106,0,0,0,4,0,0,0,107,0,0,0,108,0,0,0,5,0,0,0,1,0,0,0,16,0,0,0,17,0,0,0,18,0,0,0,19,0,0,0,11,0,0,0,104,0,0,0,20,0,0,0,6,0,0,0,2,0,0,0,7,0,0,0,3,0,0,0,12,0,0,0,61,0,0,0,109,0,0,0,21,0,0,0,1,0,0,0,8,0,0,0,9,0,0,0,1,0,0,0,4,0,0,0,2,0,0,0,1,0,0,0,5,0,0,0,6,0,0,0,10,0,0,0,110,0,0,0,1,0,0,0,11,0,0,0,0,0,0,0,208,6,0,0,3,0,0,0,251,0,0,0,252,0,0,0,62,0,0,0,253,0,0,0,0,0,0,0,248,6,0,0,254,0,0,0,255,0,0,0,1,0,0,0,2,0,0,0,1,0,0,0,2,0,0,0,0,1,0,0,63,0,0,0,22,0,0,0,105,0,0,0,37,0,0,0,0,0,0,0,64,7,0,0,188,0,0,0,1,1,0,0,106,0,0,0,111,0,0,0,2,1,0,0,3,1,0,0,4,1,0,0,64,0,0,0,107,0,0,0,0,0,0,0,32,7,0,0,5,1,0,0,6,1,0,0,108,0,0,0,112,0,0,0,7,1,0,0,8,1,0,0,7,0,0,0,65,0,0,0,109,0,0,0,0,0,0,0,88,7,0,0,3,0,0,0,9,1,0,0,10,1,0,0,66,0,0,0,11,1,0,0,0,0,0,0,104,7,0,0,3,0,0,0,12,1,0,0,13,1,0,0,67,0,0,0,14,1,0,0,0,0,0,0,120,7,0,0,3,0,0,0,15,1,0,0,16,1,0,0,68,0,0,0,17,1,0,0,0,0,0,0,136,7,0,0,3,0,0,0,18,1,0,0,19,1,0,0,69,0,0,0,20,1,0,0,0,0,0,0,152,7,0,0,3,0,0,0,21,1,0,0,22,1,0,0,70,0,0,0,23,1,0,0,0,0,0,0,168,7,0,0,24,1,0,0,25,1,0,0,110,0,0,0,111,0,0,0,112,0,0,0,113,0,0,0,23,0,0,0,24,0,0,0,113,0,0,0,25,0,0,0,26,0,0,0,27,0,0,0,114,0,0,0,114,0,0,0,115,0,0,0,0,0,0,0,192,7,0,0,3,0,0,0,26,1,0,0,27,1,0,0,71,0,0,0,28,1,0,0,0,0,0,0,208,7,0,0,3,0,0,0,29,1,0,0,30,1,0,0,72,0,0,0,31,1,0,0,0,8,0,0,176,11,0,0,0,8,0,0,88,8,0,0,176,11,0,0,0,8,0,0,176,11,0,0,0,8,0,0,224,7,0,0,176,11,0,0,0,8,0,0,216,11,0,0,176,11,0,0,0,8,0,0,80,8,0,0,176,11,0,0,0,8,0,0,72,8,0,0,176,11,0,0,0,8,0,0,64,8,0,0,0,12,0,0,176,11,0,0,0,8,0,0,0,12,0,0,176,11,0,0,0,8,0,0,64,8,0,0,176,11,0,0,0,8,0,0,232,11,0,0,176,11,0,0,0,8,0,0,240,7,0,0,176,11,0,0,0,8,0,0,224,11,0,0,0,0,0,0,104,8,0,0,32,1,0,0,33,1,0,0,13,0,0,0,28,0,0,0,29,0,0,0,115,0,0,0,0,0,0,0,120,8,0,0,34,1,0,0,35,1,0,0,36,1,0,0,14,0,0,0,30,0,0,0,116,0,0,0,0,0,0,0,184,8,0,0,37,1,0,0,38,1,0,0,116,0,0,0,117,0,0,0,118,0,0,0,0,0,0,0,152,8,0,0,39,1,0,0,40,1,0,0,119,0,0,0,120,0,0,0,0,0,0,0,136,8,0,0,3,0,0,0,41,1,0,0,42,1,0,0,73,0,0,0,43,1,0,0,0,0,0,0,168,8,0,0,3,0,0,0,44,1,0,0,45,1,0,0,74,0,0,0,46,1,0,0,0,0,0,0,200,8,0,0,47,1,0,0,48,1,0,0,49,1,0,0,15,0,0,0,1,0,0,0,117,0,0,0,0,0,0,0,216,8,0,0,3,0,0,0,50,1,0,0,51,1,0,0,75,0,0,0,52,1,0,0,0,0,0,0,248,8,0,0,53,1,0,0,54,1,0,0,8,0,0,0,0,0,0,0,8,9,0,0,3,0,0,0,55,1,0,0,56,1,0,0,76,0,0,0,57,1,0,0,0,0,0,0,24,9,0,0,58,1,0,0,59,1,0,0,60,1,0,0,61,1,0,0,62,1,0,0,0,0,0,0,56,9,0,0,63,1,0,0,64,1,0,0,121,0,0,0,122,0,0,0,123,0,0,0,124,0,0,0,3,0,0,0,0,0,0,0,96,9,0,0,65,1,0,0,66,1,0,0,31,0,0,0,0,0,0,0,80,9,0,0,3,0,0,0,67,1,0,0,68,1,0,0,77,0,0,0,69,1,0,0,0,0,0,0,120,9,0,0,70,1,0,0,71,1,0,0,118,0,0,0,0,0,0,0,240,9,0,0,188,0,0,0,72,1,0,0,125,0,0,0,119,0,0,0,73,1,0,0,74,1,0,0,75,1,0,0,78,0,0,0,126,0,0,0,0,0,0,0,216,9,0,0,188,0,0,0,76,1,0,0,127,0,0,0,120,0,0,0,77,1,0,0,78,1,0,0,79,1,0,0,79,0,0,0,128,0,0,0,0,0,0,0,192,9,0,0,188,0,0,0,80,1,0,0,129,0,0,0,121,0,0,0,81,1,0,0,82,1,0,0,83,1,0,0,80,0,0,0,130,0,0,0,0,0,0,0,168,9,0,0,188,0,0,0,84,1,0,0,131,0,0,0,122,0,0,0,85,1,0,0,86,1,0,0,87,1,0,0,81,0,0,0,132,0,0,0,0,0,0,0,144,9,0,0,188,0,0,0,88,1,0,0,133,0,0,0,123,0,0,0,89,1,0,0,90,1,0,0,91,1,0,0,82,0,0,0,134,0,0,0,0,0,0,0,8,10,0,0,3,0,0,0,92,1,0,0,93,1,0,0,83,0,0,0,94,1,0,0,0,0,0,0,72,10,0,0,95,1,0,0,96,1,0,0,135,0,0,0,136,0,0,0,32,0,0,0,33,0,0,0,34,0,0,0,35,0,0,0,36,0,0,0,12,0,0,0,13,0,0,0,84,0,0,0,124,0,0,0,2,0,0,0,125,0,0,0,137,0,0,0,85,0,0,0,37,0,0,0,38,0,0,0,126,0,0,0,39,0,0,0,127,0,0,0,40,0,0,0,41,0,0,0,128,0,0,0,129,0,0,0,14,0,0,0,130,0,0,0,131,0,0,0,15,0,0,0,2,0,0,0,42,0,0,0,43,0,0,0,44,0,0,0,45,0,0,0,16,0,0,0,138,0,0,0,46,0,0,0,16,0,0,0,9,0,0,0,17,0,0,0,10,0,0,0,17,0,0,0,86,0,0,0,132,0,0,0,47,0,0,0,2,0,0,0,18,0,0,0,19,0,0,0,3,0,0,0,11,0,0,0,4,0,0,0,2,0,0,0,12,0,0,0,13,0,0,0,20,0,0,0,133,0,0,0,2,0,0,0,21,0,0,0,0,0,0,0,24,10,0,0,3,0,0,0,97,1,0,0,98,1,0,0,87,0,0,0,99,1,0,0,0,0,0,0,40,10,0,0,3,0,0,0,100,1,0,0,101,1,0,0,88,0,0,0,102,1,0,0,0,0,0,0,56,10,0,0,3,0,0,0,103,1,0,0,104,1,0,0,89,0,0,0,105,1,0,0,0,0,0,0,88,10,0,0,3,0,0,0,106,1,0,0,107,1,0,0,90,0,0,0,108,1,0,0,96,32,0,0,5,0,0,0,0,0,0,0,0,0,0,0,139,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,18,0,0,0,19,0,0,0,119,152,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,76,150,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,139,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,0,0,0,19,0,0,0,127,152,0,0,0,4,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,208,33,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,3,0,0,0,5,0,0,0,7,0,0,0,11,0,0,0,13,0,0,0,17,0,0,0,19,0,0,0,23,0,0,0,29,0,0,0,31,0,0,0,37,0,0,0,41,0,0,0,43,0,0,0,47,0,0,0,53,0,0,0,59,0,0,0,61,0,0,0,67,0,0,0,71,0,0,0,73,0,0,0,79,0,0,0,83,0,0,0,89,0,0,0,97,0,0,0,101,0,0,0,103,0,0,0,107,0,0,0,109,0,0,0,113,0,0,0,127,0,0,0,131,0,0,0,137,0,0,0,139,0,0,0,149,0,0,0,151,0,0,0,157,0,0,0,163,0,0,0,167,0,0,0,173,0,0,0,179,0,0,0,181,0,0,0,191,0,0,0,193,0,0,0,197,0,0,0,199,0,0,0,211,0,0,0,1,0,0,0,11,0,0,0,13,0,0,0,17,0,0,0,19,0,0,0,23,0,0,0,29,0,0,0,31,0,0,0,37,0,0,0,41,0,0,0,43,0,0,0,47,0,0,0,53,0,0,0,59,0,0,0,61,0,0,0,67,0,0,0,71,0,0,0,73,0,0,0,79,0,0,0,83,0,0,0,89,0,0,0,97,0,0,0,101,0,0,0,103,0,0,0,107,0,0,0,109,0,0,0,113,0,0,0,121,0,0,0,127,0,0,0,131,0,0,0,137,0,0,0,139,0,0,0,143,0,0,0,149,0,0,0,151,0,0,0,157,0,0,0,163,0,0,0,167,0,0,0,169,0,0,0,173,0,0,0,179,0,0,0,181,0,0,0,187,0,0,0,191,0,0,0,193,0,0,0,197,0,0,0,199,0,0,0,209,0,0,0,2,0,0,0,106,147,0,0,0,0,0,0,40,11,0,0,109,1,0,0,110,1,0,0,111,1,0,0,112,1,0,0,22,0,0,0,3,0,0,0,22,0,0,0,14,0,0,0,0,0,0,0,80,11,0,0,109,1,0,0,113,1,0,0,111,1,0,0,112,1,0,0,22,0,0,0,4,0,0,0,23,0,0,0,15,0,0,0,0,0,0,0,96,11,0,0,114,1,0,0,115,1,0,0,140,0,0,0,0,0,0,0,144,11,0,0,109,1,0,0,116,1,0,0,111,1,0,0,112,1,0,0,23,0,0,0,0,0,0,0,128,11,0,0,109,1,0,0,117,1,0,0,111,1,0,0,112,1,0,0,24,0,0,0,0,0,0,0,16,12,0,0,109,1,0,0,118,1,0,0,111,1,0,0,112,1,0,0,25,0,0,0,0,0,0,0,32,12,0,0,109,1,0,0,119,1,0,0,111,1,0,0,112,1,0,0,22,0,0,0,5,0,0,0,24,0,0,0,16,0,0,0,78,50,118,101,49,50,67,114,101,97,116,101,100,65,114,114,111,119,69,0,78,50,118,101,49,52,73,67,114,101,97,116,101,100,79,98,106,101,99,116,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,48,65,114,114,111,119,77,111,100,101,108,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,48,65,114,114,111,119,77,111,100,101,108,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,57,66,108,117,114,77,111,100,101,108,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,57,66,108,117,114,77,111,100,101,108,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,49,49,67,114,101,97,116,101,100,66,108,117,114,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,48,66,114,117,115,104,77,111,100,101,108,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,48,66,114,117,115,104,77,111,100,101,108,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,49,50,67,114,101,97,116,101,100,66,114,117,115,104,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,57,76,105,110,101,77,111,100,101,108,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,57,76,105,110,101,77,111,100,101,108,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,49,49,67,114,101,97,116,101,100,76,105,110,101,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,57,79,118,97,108,77,111,100,101,108,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE);allocate([101,57,79,118,97,108,77,111,100,101,108,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,49,49,67,114,101,97,116,101,100,79,118,97,108,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,52,82,101,99,116,97,110,103,108,101,77,111,100,101,108,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,52,82,101,99,116,97,110,103,108,101,77,111,100,101,108,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,49,54,67,114,101,97,116,101,100,82,101,99,116,97,110,103,108,101,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,57,84,101,120,116,77,111,100,101,108,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,57,84,101,120,116,77,111,100,101,108,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,49,48,69,100,105,116,101,100,84,101,120,116,69,0,78,50,118,101,49,49,73,69,100,105,116,101,100,84,101,120,116,69,0,78,50,118,101,49,54,67,111,109,112,111,115,105,116,101,67,111,109,109,97,110,100,69,0,78,50,118,101,56,73,67,111,109,109,97,110,100,69,0,78,83,116,51,95,95,50,49,55,98,97,100,95,102,117,110,99,116,105,111,110,95,99,97,108,108,69,0,78,50,118,101,55,72,105,115,116,111,114,121,69,0,78,50,118,101,56,73,72,105,115,116,111,114,121,69,0,78,50,118,101,49,57,77,111,100,101,108,67,104,97,110,103,101,100,67,111,109,109,97,110,100,69,0,78,50,118,101,49,49,77,111,118,101,67,111,109,109,97,110,100,69,0,78,50,118,101,49,52,82,101,111,114,100,101,114,67,111,109,109,97,110,100,69,0,78,50,118,101,49,56,84,101,120,116,67,104,97,110,103,101,100,67,111,109,109,97,110,100,69,0,78,50,118,101,49,51,83,101,108,101,99,116,101,100,66,114,117,115,104,69,0,78,50,118,101,49,53,73,83,101,108,101,99,116,101,100,79,98,106,101,99,116,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,50,83,101,108,101,99,116,101,100,84,101,120,116,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,50,83,101,108,101,99,116,101,100,84,101,120,116,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,55,83,101,108,101,99,116,101,100,82,101,99,116,97,110,103,108,101,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,55,83,101,108,101,99,116,101,100,82,101,99,116,97,110,103,108,101,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,50,83,101,108,101,99,116,101,100,79,118,97,108,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,50,83,101,108,101,99,116,101,100,79,118,97,108,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,51,83,101,108,101,99,116,101,100,66,114,117,115,104,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,51,83,101,108,101,99,116,101,100,66,114,117,115,104,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,50,48,83,101,108,101,99,116,101,100,76,105,110,101,97,114,79,98,106,101,99,116,73,78,83,49,95,49,48,65,114,114,111,119,77,111,100,101,108,69,76,104,49,69,76,104,50,69,69,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,50,48,83,101,108,101,99,116,101,100,76,105,110,101,97,114,79,98,106,101,99,116,73,78,83,49,95,49,48,65,114,114,111,119,77,111,100,101,108,69,76,104,49,69,76,104,50,69,69,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,52,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,52,95,69,69,69,69,0,78,50,118,101,50,48,83,101,108,101,99,116,101,100,76,105,110,101,97,114,79,98,106,101,99,116,73,78,83,95,49,48,65,114,114,111,119,77,111,100,101,108,69,76,104,49,69,76,104,50,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,50,48,83,101,108,101,99,116,101,100,76,105,110,101,97,114,79,98,106,101,99,116,73,78,83,49,95,57,76,105,110,101,77,111,100,101,108,69,76,104,49,69,76,104,50,69,69,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,50,48,83,101,108,101,99,116,101,100,76,105,110,101,97,114,79,98,106,101,99,116,73,78,83,49,95,57,76,105,110,101,77,111,100,101,108,69,76,104,49,69,76,104,50,69,69,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,52,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,52,95,69,69,69,69,0,78,50,118,101,50,48,83,101,108,101,99,116,101,100,76,105,110,101,97,114,79,98,106,101,99,116,73,78,83,95,57,76,105,110,101,77,111,100,101,108,69,76,104,49,69,76,104,50,69,69,69,0,78,50,118,101,49,50,83,101,108,101,99,116,101,100,79,118,97,108,69,0,78,50,118,101,49,55,83,101,108,101,99,116,101,100,82,101,99,116,97,110,103,108,101,69,0,78,50,118,101,49,50,83,101,108,101,99,116,101,100,84,101,120,116,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,48,65,100,100,67,111,109,109,97,110,100,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,48,65,100,100,67,111,109,109,97,110,100,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,49,48,65,100,100,67,111,109,109,97,110,100,69,0,78,50,118,101,50,48,65,100,100,82,101,109,111,118,101,67,111,109,109,97,110,100,66,97,115,101,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,54,67,114,101,97,116,101,100,82,101,99,116,97,110,103,108,101,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,54,67,114,101,97,116,101,100,82,101,99,116,97,110,103,108,101,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,49,67,114,101,97,116,101,100,79,118,97,108,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,49,67,114,101,97,116,101,100,79,118,97,108,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,50,67,114,101,97,116,101,100,66,114,117,115,104,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,50,67,114,101,97,116,101,100,66,114,117,115,104,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,50,67,114,101,97,116,101,100,65,114,114,111,119,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,50,67,114,101,97,116,101,100,65,114,114,111,119,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,49,67,114,101,97,116,101,100,66,108,117,114,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,49,67,114,101,97,116,101,100,66,108,117,114,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,49,67,114,101,97,116,101,100,76,105,110,101,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,49,67,114,101,97,116,101,100,76,105,110,101,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,50,52,67,114,101,97,116,101,87,105,116,104,68,114,97,103,73,110,112,117,116,83,116,97,116,101,69,0,78,50,118,101,49,49,73,73,110,112,117,116,83,116,97,116,101,69,0,78,50,118,101,49,55,68,101,102,97,117,108,116,73,110,112,117,116,83,116,97,116,101,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,54,67,111,109,112,111,115,105,116,101,67,111,109,109,97,110,100,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,54,67,111,109,112,111,115,105,116,101,67,111,109,109,97,110,100,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,50,50,67,104,97,110,103,101,72,97,115,83,104,97,100,111,119,67,111,109,109,97,110,100,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,50,50,67,104,97,110,103,101,72,97,115,83,104,97,100,111,119,67,111,109,109,97,110,100,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,50,50,67,104,97,110,103,101,72,97,115,83,104,97,100,111,119,67,111,109,109,97,110,100,69,0,78,50,118,101,50,49,67,104,97,110,103,101,80,114,111,112,101,114,116,121,67,111,109,109,97,110,100,73,98,77,78,83,95,49,53,73,83,101,108,101,99,116,101,100,79,98,106,101,99,116,69,70,118,98,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,50,50,67,104,97,110,103,101,84,104,105,99,107,110,101,115,115,67,111,109,109,97,110,100,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,50,50,67,104,97,110,103,101,84,104,105,99,107,110,101,115,115,67,111,109,109,97,110,100,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,50,50,67,104,97,110,103,101,84,104,105,99,107,110,101,115,115,67,111,109,109,97,110,100,69,0,78,50,118,101,50,49,67,104,97,110,103,101,80,114,111,112,101,114,116,121,67,111,109,109,97,110,100,73,102,77,78,83,95,49,53,73,83,101,108,101,99,116,101,100,79,98,106,101,99,116,69,70,118,102,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,56,67,104,97,110,103,101,67,111,108,111,114,67,111,109,109,97,110,100,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,56,67,104,97,110,103,101,67,111,108,111,114,67,111,109,109,97,110,100,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,49,56,67,104,97,110,103,101,67,111,108,111,114,67,111,109,109,97,110,100,69,0,78,50,118,101,50,49,67,104,97,110,103,101,80,114,111,112,101,114,116,121,67,111,109,109,97,110,100,73,78,83,95,53,67,111,108,111,114,69,77,78,83,95,49,53,73,83,101,108,101,99,116,101,100,79,98,106,101,99,116,69,70,118,82,75,83,49,95,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,57,77,111,100,101,108,67,104,97,110,103,101,100,67,111,109,109,97,110,100,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,57,77,111,100,101,108,67,104,97,110,103,101,100,67,111,109,109,97,110,100,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,49,77,111,118,101,67,111,109,109,97,110,100,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,49,77,111,118,101,67,111,109,109,97,110,100,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,49,56,83,101,108,101,99,116,101,100,73,110,112,117,116,83,116,97,116,101,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,48,69,100,105,116,101,100,84,101,120,116,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,48,69,100,105,116,101,100,84,101,120,116,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,52,82,101,111,114,100,101,114,67,111,109,109,97,110,100,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,52,82,101,111,114,100,101,114,67,111,109,109,97,110,100,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,49,50,83,116,97,116,101,67,111,110,116,101,120,116,69,0,78,50,118,101,49,51,73,83,116,97,116,101,67,111,110,116,101,120,116,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,56,84,101,120,116,69,100,105,116,73,110,112,117,116,83,116,97,116,101,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,56,84,101,120,116,69,100,105,116,73,110,112,117,116,83,116,97,116,101,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,56,83,101,108,101,99,116,101,100,73,110,112,117,116,83,116,97,116,101,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,56,83,101,108,101,99,116,101,100,73,110,112,117,116,83,116,97,116,101,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,50,52,67,114,101,97,116,101,87,105,116,104,68,114,97,103,73,110,112,117,116,83,116,97,116,101,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,50,52,67,114,101,97,116,101,87,105,116,104,68,114,97,103,73,110,112,117,116,83,116,97,116,101,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,55,68,101,102,97,117,108,116,73,110,112,117,116,83,116,97,116,101,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,55,68,101,102,97,117,108,116,73,110,112,117,116,83,116,97,116,101,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,56,84,101,120,116,67,104,97,110,103,101,100,67,111,109,109,97,110,100,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,56,84,101,120,116,67,104,97,110,103,101,100,67,111,109,109,97,110,100,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,51,82,101,109,111,118,101,67,111,109,109,97,110,100,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,51,82,101,109,111,118,101,67,111,109,109,97,110,100,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,49,51,82,101,109,111,118,101,67,111,109,109,97,110,100,69,0,90,78,50,118,101,49,56,84,101,120,116,69,100,105,116,73,110,112,117,116,83,116,97,116,101,49,57,83,116,97,114,116,67,117,114,115,111,114,66,108,105,110,107,105,110,103,69,82,78,83,95,49,51,73,83,116,97,116,101,67,111,110,116,101,120,116,69,69,51,36,95,48,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,102,117,110,99,73,90,78,50,118,101,49,56,84,101,120,116,69,100,105,116,73,110,112,117,116,83,116,97,116,101,49,57,83,116,97,114,116,67,117,114,115,111,114,66,108,105,110,107,105,110,103,69,82,78,83,50,95,49,51,73,83,116,97,116,101,67,111,110,116,101,120,116,69,69,51,36,95,48,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,54,95,69,69,70,118,118,69,69,69,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,98,97,115,101,73,70,118,118,69,69,69,0,78,50,118,101,49,56,84,101,120,116,69,100,105,116,73,110,112,117,116,83,116,97,116,101,69,0,78,50,118,101,54,69,100,105,116,111,114,69,0,78,50,118,101,49,52,73,83,116,97,116,101,83,119,105,116,99,104,101,114,69,0,78,50,118,101,55,73,69,100,105,116,111,114,69,0,90,78,50,118,101,54,69,100,105,116,111,114,49,55,83,117,98,115,99,114,105,98,101,84,111,69,118,101,110,116,115,69,118,69,51,36,95,51,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,102,117,110,99,73,90,78,50,118,101,54,69,100,105,116,111,114,49,55,83,117,98,115,99,114,105,98,101,84,111,69,118,101,110,116,115,69,118,69,51,36,95,51,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,52,95,69,69,70,118,118,69,69,69,0,90,78,50,118,101,54,69,100,105,116,111,114,49,55,83,117,98,115,99,114,105,98,101,84,111,69,118,101,110,116,115,69,118,69,51,36,95,50,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,102,117,110,99,73,90,78,50,118,101,54,69,100,105,116,111,114,49,55,83,117,98,115,99,114,105,98,101,84,111,69,118,101,110,116,115,69,118,69,51,36,95,50,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,52,95,69,69,70,118,82,75,78,83,50,95,49,48,79,117,116,112,117,116,83,105,122,101,69,69,69,69,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,98,97,115,101,73,70,118,82,75,78,50,118,101,49,48,79,117,116,112,117,116,83,105,122,101,69,69,69,69,0,90,78,50,118,101,54,69,100,105,116,111,114,49,55,83,117,98,115,99,114,105,98,101,84,111,69,118,101,110,116,115,69,118,69,51,36,95,49,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,102,117,110,99,73,90,78,50,118,101,54,69,100,105,116,111,114,49,55,83,117,98,115,99,114,105,98,101,84,111,69,118,101,110,116,115,69,118,69,51,36,95,49,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,52,95,69,69,70,118,82,75,78,83,50,95,57,84,101,120,116,77,111,100,101,108,69,82,98,82,78,83,50,95,57,82,101,99,116,97,110,103,108,101,69,69,69,69,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,98,97,115,101,73,70,118,82,75,78,50,118,101,57,84,101,120,116,77,111,100,101,108,69,82,98,82,78,83,50,95,57,82,101,99,116,97,110,103,108,101,69,69,69,69,0,90,78,50,118,101,54,69,100,105,116,111,114,49,55,83,117,98,115,99,114,105,98,101,84,111,69,118,101,110,116,115,69,118,69,51,36,95,48,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,102,117,110,99,73,90,78,50,118,101,54,69,100,105,116,111,114,49,55,83,117,98,115,99,114,105,98,101,84,111,69,118,101,110,116,115,69,118,69,51,36,95,48,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,52,95,69,69,70,118,118,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,53,69,100,105,116,111,114,67,97,108,108,98,97,99,107,115,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,53,69,100,105,116,111,114,67,97,108,108,98,97,99,107,115,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,54,69,100,105,116,111,114,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,54,69,100,105,116,111,114,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,56,77,101,97,115,117,114,101,115,69,0,78,50,118,101,57,73,77,101,97,115,117,114,101,115,69,0,78,50,118,101,49,52,73,73,109,97,103,101,82,101,99,101,105,118,101,114,69,0,78,50,118,101,54,111,112,101,110,103,108,49,56,68,101,102,97,117,108,116,70,114,97,109,101,66,117,102,102,101,114,69,0,78,50,118,101,54,111,112,101,110,103,108,49,50,73,70,114,97,109,101,66,117,102,102,101,114,69,0,78,50,118,101,54,111,112,101,110,103,108,49,49,70,114,97,109,101,66,117,102,102,101,114,69,0,78,50,118,101,54,111,112,101,110,103,108,49,54,73,79,102,102,115,99,114,101,101,110,66,117,102,102,101,114,69,0,78,50,118,101,54,111,112,101,110,103,108,56,73,84,101,120,116,117,114,101,69,0,78,50,118,101,54,111,112,101,110,103,108,49,51,79,112,101,110,71,76,66,117,102,102,101,114,115,69,0,78,50,118,101,54,111,112,101,110,103,108,49,57,73,67,111,110,116,101,120,116,76,111,115,115,72,97,110,100,108,101,114,69,0,78,50,118,101,54,111,112,101,110,103,108,49,52,73,79,112,101,110,71,76,66,117,102,102,101,114,115,69,0,78,50,118,101,54,111,112,101,110,103,108,55,73,66,105,116,109,97,112,69,0,78,50,118,101,54,111,112,101,110,103,108,49,53,73,66,105,116,109,97,112,70,114,97,103,109,101,110,116,69,0,78,50,118,101,54,111,112,101,110,103,108,49,53,73,66,105,116,109,97,112,80,114,111,118,105,100,101,114,69,0,10,117,110,105,102,111,114,109,32,109,97,116,52,32,112,114,111,106,101,99,116,105,111,110,59,10,117,110,105,102,111,114,109,32,109,97,116,52,32,118,105,101,119,95,109,111,100,101,108,59,10,10,97,116,116,114,105,98,117,116,101,32,118,101,99,50,32,112,111,115,105,116,105,111,110,59,10,97,116,116,114,105,98,117,116,101,32,118,101,99,50,32,116,101,120,116,117,114,101,95,99,111,111,114,100,59,10,10,118,97,114,121,105,110,103,32,118,101,99,50,32,111,117,116,95,116,101,120,116,117,114,101,95,99,111,111,114,100,59,10,118,97,114,121,105,110,103,32,118,101,99,52,32,111,117,116,95,115,99,114,101,101,110,95,99,111,111,114,100,59,10,10,118,111,105,100,32,109,97,105,110,40,118,111,105,100,41,10,123,10,32,32,32,32,111,117,116,95,116,101,120,116,117,114,101,95,99,111,111,114,100,32,61,32,116,101,120,116,117,114,101,95,99,111,111,114,100,59,10,10,32,32,32,32,118,101,99,52,32,112,111,115,32,61,32,118,101,99,52,40,112,111,115,105,116,105,111,110,44,32,48,46,48,44,32,49,46,48,41,59,10,32,32,32,32,111,117,116,95,115,99,114,101,101,110,95,99,111,111,114,100,32,61,32,118,105,101,119,95,109,111,100,101,108,32,42,32,112,111,115,59,10,32,32,32,32,103,108,95,80,111,115,105,116,105,111,110,32,61,32,112,114,111,106,101,99,116,105,111,110,32,42,32,118,105,101,119,95,109,111,100,101,108,32,42,32,112,111,115,59,10,125,10,0,10,35,105,102,110,100,101,102,32,71,76,95,69,83,10,35,100,101,102,105,110,101,32,104,105,103,104,112,10,35,100,101,102,105,110,101,32,109,101,100,105,117,109,112,10,35,100,101,102,105,110,101,32,108,111,119,112,10,35,101,110,100,105,102,10,10,117,110,105,102,111,114,109,32,115,97,109,112,108,101,114,50,68,32,115,97,109,112,108,101,114,59,10,117,110,105,102,111,114,109,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,98,108,117,114,95,115,105,122,101,59,32,32,32,32,47,47,32,116,104,101,32,115,105,122,101,32,111,102,32,116,104,101,32,98,108,117,114,32,115,113,117,97,114,101,44,32,105,110,32,115,99,114,101,101,110,32,99,111,111,114,100,105,110,97,116,101,115,10,117,110,105,102,111,114,109,32,109,101,100,105,117,109,112,32,118,101,99,50,32,119,105,110,100,111,119,95,115,105,122,101,59,32,32,32,47,47,32,116,104,101,32,115,105,122,101,32,111,102,32,116,104,101,32,111,117,116,112,117,116,32,119,105,110,100,111,119,10,117,110,105,102,111,114,109,32,109,101,100,105,117,109,112,32,118,101,99,50,32,100,105,114,59,32,32,32,32,32,32,32,32,32,32,32,47,47,32,116,104,101,32,100,105,114,101,99,116,105,111,110,32,111,102,32,116,104,101,32,111,102,102,115,101,116,32,40,49,46,48,44,32,48,46,48,41,32,45,32,104,111,114,105,122,111,110,116,97,108,44,32,40,48,46,48,44,32,49,46,48,41,32,45,32,118,101,114,116,105,99,97,108,10,10,118,97,114,121,105,110,103,32,109,101,100,105,117,109,112,32,118,101,99,50,32,111,117,116,95,116,101,120,116,117,114,101,95,99,111,111,114,100,59,10,118,97,114,121,105,110,103,32,109,101,100,105,117,109,112,32,118,101,99,52,32,111,117,116,95,115,99,114,101,101,110,95,99,111,111,114,100,59,10,10,118,111,105,100,32,109,97,105,110,40,118,111,105,100,41,10,123,10,32,32,32,32,47,47,32,68,101,116,101,99,116,32,116,104,101,32,115,116,97,114,116,105,110,103,32,112,111,105,110,116,32,105,110,32,115,99,114,101,101,110,32,99,111,111,114,100,105,110,97,116,101,115,32,102,111,114,32,116,104,101,32,98,108,117,114,32,115,113,117,97,114,101,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,114,111,117,110,100,101,100,95,98,108,117,114,95,115,105,122,101,32,61,32,102,108,111,111,114,40,98,108,117,114,95,115,105,122,101,32,43,32,48,46,53,41,59,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,120,95,115,116,97,114,116,32,61,32,102,108,111,111,114,40,111,117,116,95,115,99,114,101,101,110,95,99,111,111,114,100,46,120,32,47,32,114,111,117,110,100,101,100,95,98,108,117,114,95,115,105,122,101,41,32,42,32,114,111,117,110,100,101,100,95,98,108,117,114,95,115,105,122,101,59,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,121,95,115,116,97,114,116,32,61,32,102,108,111,111,114,40,111,117,116,95,115,99,114,101,101,110,95,99,111,111,114,100,46,121,32,47,32,114,111,117,110,100,101,100,95,98,108,117,114,95,115,105,122,101,41,32,42,32,114,111,117,110,100,101,100,95,98,108,117,114,95,115,105,122,101,59,10,10,32,32,32,32,47,47,32,73,110,105,116,105,97,108,108,121,32,110,111,32,99,111,108,111,114,10,32,32,32,32,109,101,100,105,117,109,112,32,118,101,99,52,32,99,111,108,111,114,32,61,32,118,101,99,52,40,48,46,48,44,32,48,46,48,44,32,48,46,48,44,32,48,46,48,41,59,10,10,32,32,32,32,47,47,32,83,105,103,110,115,32,102,111,114,32,98,108,117,114,32,100,105,114,101,99,116,105,111,110,115,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,115,120,32,61,32,115,105,103,110,40,100,105,114,46,120,41,59,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,115,121,32,61,32,115,105,103,110,40,100,105,114,46,121,41,59,10,10,32,32,32,32,47,47,32,83,116,101,112,115,32,105,110,32,116,101,120,116,117,114,101,32,99,111,111,114,100,105,110,97,116,101,115,44,32,102,111,114,32,116,101,120,116,117,114,101,32,108,111,111,107,117,112,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,120,95,116,101,120,95,115,116,101,112,32,61,32,49,46,48,32,47,32,119,105,110,100,111,119,95,115,105,122,101,46,120,59,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,121,95,116,101,120,95,115,116,101,112,32,61,32,49,46,48,32,47,32,119,105,110,100,111,119,95,115,105,122,101,46,121,59,10,10,32,32,32,32,47,42,10,32,32,32,32,32,42,32,83,116,97,114,116,32,112,111,115,105,116,105,111,110,115,32,105,110,32,116,101,120,116,117,114,101,32,99,111,111,114,100,105,110,97,116,101,115,58,10,32,32,32,32,32,42,32,32,45,32,105,102,32,116,104,105,115,32,105,115,32,98,108,117,114,32,100,105,114,101,99,116,105,111,110,32,45,32,115,116,97,114,116,32,111,102,32,116,104,101,32,98,108,117,114,32,115,113,117,97,114,101,44,10,32,32,32,32,32,42,32,32,45,32,105,102,32,116,104,105,115,32,105,115,32,110,111,116,32,98,108,117,114,32,100,105,114,101,99,116,105,111,110,32,45,32,116,101,120,116,117,114,101,32,99,111,111,114,100,105,110,97,116,101,32,102,111,114,32,116,104,105,115,32,112,111,105,110,116,10,32,32,32,32,32,42,47,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,120,95,116,101,120,95,115,116,97,114,116,32,61,32,115,120,32,42,32,120,95,115,116,97,114,116,32,42,32,120,95,116,101,120,95,115,116,101,112,32,43,32,40,49,46,48,32,45,32,115,120,41,32,42,32,111,117,116,95,116,101,120,116,117,114,101,95,99,111,111,114,100,46,120,59,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,121,95,116,101,120,95,115,116,97,114,116,32,61,32,115,121,32,42,32,121,95,115,116,97,114,116,32,42,32,121,95,116,101,120,95,115,116,101,112,32,43,32,40,49,46,48,32,45,32,115,121,41,32,42,32,111,117,116,95,116,101,120,116,117,114,101,95,99,111,111,114,100,46,121,59,10,10,32,32,32,32,102,111,114,32,40,109,101,100,105,117,109,112,32,102,108,111,97,116,32,105,32,61,32,48,46,48,59,32,105,32,60,32,52,48,46,48,59,32,105,43,43,41,32,123,32,32,47,47,32,116,104,101,32,117,112,112,101,114,32,108,105,109,105,116,32,109,117,115,116,32,98,101,32,99,111,110,115,116,97,110,116,10,32,32,32,32,32,32,32,32,105,102,32,40,105,32,60,32,114,111,117,110,100,101,100,95,98,108,117,114,95,115,105,122,101,41,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,47,47,32,67,97,108,99,117,108,97,116,101,32,116,104,101,32,112,111,115,105,116,105,111,110,32,111,102,32,116,104,101,32,112,111,105,110,116,32,111,110,32,116,104,101,32,116,101,120,116,117,114,101,10,32,32,32,32,32,32,32,32,32,32,32,32,109,101,100,105,117,109,112,32,118,101,99,50,32,116,101,120,32,61,32,118,101,99,50,40,120,95,116,101,120,95,115,116,97,114,116,32,43,32,105,32,42,32,120,95,116,101,120,95,115,116,101,112,32,42,32,115,120,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,121,95,116,101,120,95,115,116,97,114,116,32,43,32,105,32,42,32,121,95,116,101,120,95,115,116,101,112,32,42,32,115,121,41,59,10,10,32,32,32,32,32,32,32,32,32,32,32,32,47,47,32,65,99,99,117,109,117,108,97,116,101,32,116,104,101,32,99,111,108,111,114,10,32,32,32,32,32,32,32,32,32,32,32,32,99,111,108,111,114,32,43,61,32,116,101,120,116,117,114,101,50,68,40,115,97,109,112,108,101,114,44,32,116,101,120,41,59,10,32,32,32,32,32,32,32,32,125,10,32,32,32,32,125,10,10,32,32,32,32,103,108,95,70,114,97,103,67,111,108,111,114,32,61,32,99,111,108,111,114,32,47,32,114,111,117,110,100,101,100,95,98,108,117,114,95,115,105,122,101,59,10,125,10,0,118,105,101,119,95,109,111,100,101,108,0,98,108,117,114,95,115,105,122,101,0,100,105,114,0,119,105,110,100,111,119,95,115,105,122,101,0,10,117,110,105,102,111,114,109,32,109,97,116,52,32,112,118,109,59,10,10,97,116,116,114,105,98,117,116,101,32,118,101,99,50,32,112,111,115,105,116,105,111,110,59,10,97,116,116,114,105,98,117,116,101,32,102,108,111,97,116,32,97,108,112,104,97,59,10,10,118,97,114,121,105,110,103,32,102,108,111,97,116,32,111,117,116,95,97,108,112,104,97,59,10,10,118,111,105,100,32,109,97,105,110,40,118,111,105,100,41,10,123,10,32,32,32,32,111,117,116,95,97,108,112,104,97,32,61,32,97,108,112,104,97,59,10,10,32,32,32,32,118,101,99,52,32,112,111,115,32,61,32,118,101,99,52,40,112,111,115,105,116,105,111,110,44,32,48,46,48,44,32,49,46,48,41,59,10,32,32,32,32,103,108,95,80,111,115,105,116,105,111,110,32,61,32,112,118,109,32,42,32,112,111,115,59,10,125,10,0,97,108,112,104,97,0,10,117,110,105,102,111,114,109,32,109,97,116,52,32,112,118,109,59,10,117,110,105,102,111,114,109,32,118,101,99,50,32,112,48,59,10,117,110,105,102,111,114,109,32,118,101,99,50,32,112,49,59,10,117,110,105,102,111,114,109,32,118,101,99,50,32,112,50,59,10,117,110,105,102,111,114,109,32,118,101,99,50,32,112,51,59,10,117,110,105,102,111,114,109,32,102,108,111,97,116,32,97,97,95,111,102,102,115,101,116,59,10,117,110,105,102,111,114,109,32,102,108,111,97,116,32,115,116,97,114,116,95,116,104,105,99,107,110,101,115,115,59,10,117,110,105,102,111,114,109,32,102,108,111,97,116,32,101,110,100,95,116,104,105,99,107,110,101,115,115,59,10,10,97,116,116,114,105,98,117,116,101,32,102,108,111,97,116,32,116,59,10,97,116,116,114,105,98,117,116,101,32,102,108,111,97,116,32,110,111,114,109,97,108,95,100,105,114,101,99,116,105,111,110,59,10,97,116,116,114,105,98,117,116,101,32,102,108,111,97,116,32,104,97,115,95,97,97,59,10,10,118,97,114,121,105,110,103,32,102,108,111,97,116,32,111,117,116,95,97,108,112,104,97,59,10,10,118,111,105,100,32,109,97,105,110,40,118,111,105,100,41,10,123,10,32,32,32,32,111,117,116,95,97,108,112,104,97,32,61,32,49,46,48,32,45,32,115,105,103,110,40,104,97,115,95,97,97,41,59,10,10,32,32,32,32,102,108,111,97,116,32,116,116,32,61,32,116,32,42,32,116,59,10,32,32,32,32,102,108,111,97,116,32,116,116,116,32,61,32,116,116,32,42,32,116,59,10,32,32,32,32,102,108,111,97,116,32,105,116,32,61,32,49,46,48,32,45,32,116,59,10,32,32,32,32,102,108,111,97,116,32,105,116,105,116,32,61,32,105,116,32,42,32,105,116,59,10,32,32,32,32,102,108,111,97,116,32,105,116,105,116,105,116,32,61,32,105,116,105,116,32,42,32,105,116,59,10,10,32,32,32,32,118,101,99,50,32,112,32,61,32,105,116,105,116,105,116,32,42,32,112,48,32,43,32,51,46,48,32,42,32,105,116,105,116,32,42,32,116,32,42,32,112,49,32,43,32,51,46,48],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE+10240);allocate([32,42,32,105,116,32,42,32,116,116,32,42,32,112,50,32,43,32,116,116,116,32,42,32,112,51,59,10,32,32,32,32,118,101,99,50,32,116,97,110,103,101,110,116,32,61,32,51,46,48,32,42,32,105,116,105,116,32,42,32,40,112,49,32,45,32,112,48,41,32,43,32,54,46,48,32,42,32,105,116,32,42,32,116,32,42,32,40,112,50,32,45,32,112,49,41,32,43,32,51,46,48,32,42,32,116,116,32,42,32,40,112,51,32,45,32,112,50,41,59,10,32,32,32,32,118,101,99,50,32,110,111,114,109,97,108,32,61,32,110,111,114,109,97,108,105,122,101,40,118,101,99,50,40,45,116,97,110,103,101,110,116,46,121,44,32,116,97,110,103,101,110,116,46,120,41,41,59,10,32,32,32,32,102,108,111,97,116,32,116,104,105,99,107,110,101,115,115,32,61,32,109,105,120,40,115,116,97,114,116,95,116,104,105,99,107,110,101,115,115,44,32,101,110,100,95,116,104,105,99,107,110,101,115,115,44,32,116,41,59,10,10,32,32,32,32,118,101,99,52,32,112,111,115,32,61,32,118,101,99,52,40,112,32,43,32,110,111,114,109,97,108,32,42,32,110,111,114,109,97,108,95,100,105,114,101,99,116,105,111,110,32,42,32,40,116,104,105,99,107,110,101,115,115,32,47,32,50,46,48,32,43,32,115,105,103,110,40,104,97,115,95,97,97,41,32,42,32,97,97,95,111,102,102,115,101,116,41,44,32,48,46,48,44,32,49,46,48,41,59,10,32,32,32,32,103,108,95,80,111,115,105,116,105,111,110,32,61,32,112,118,109,32,42,32,112,111,115,59,10,125,10,0,112,51,0,78,50,118,101,54,111,112,101,110,103,108,49,50,82,111,117,110,100,80,114,111,103,114,97,109,69,0,78,50,118,101,54,111,112,101,110,103,108,55,80,114,111,103,114,97,109,69,0,78,50,118,101,54,111,112,101,110,103,108,49,52,79,112,101,110,71,76,80,114,111,103,114,97,109,115,69,0,78,50,118,101,54,111,112,101,110,103,108,49,53,73,79,112,101,110,71,76,80,114,111,103,114,97,109,115,69,0,10,117,110,105,102,111,114,109,32,109,97,116,52,32,112,118,109,59,10,117,110,105,102,111,114,109,32,118,101,99,50,32,112,48,59,10,117,110,105,102,111,114,109,32,118,101,99,50,32,112,49,59,10,117,110,105,102,111,114,109,32,118,101,99,50,32,112,50,59,10,117,110,105,102,111,114,109,32,102,108,111,97,116,32,97,97,95,111,102,102,115,101,116,59,10,117,110,105,102,111,114,109,32,102,108,111,97,116,32,115,116,97,114,116,95,116,104,105,99,107,110,101,115,115,59,10,117,110,105,102,111,114,109,32,102,108,111,97,116,32,101,110,100,95,116,104,105,99,107,110,101,115,115,59,10,10,97,116,116,114,105,98,117,116,101,32,102,108,111,97,116,32,116,59,10,97,116,116,114,105,98,117,116,101,32,102,108,111,97,116,32,110,111,114,109,97,108,95,100,105,114,101,99,116,105,111,110,59,10,97,116,116,114,105,98,117,116,101,32,102,108,111,97,116,32,104,97,115,95,97,97,59,10,10,118,97,114,121,105,110,103,32,102,108,111,97,116,32,111,117,116,95,97,108,112,104,97,59,10,10,118,111,105,100,32,109,97,105,110,40,118,111,105,100,41,10,123,10,32,32,32,32,111,117,116,95,97,108,112,104,97,32,61,32,49,46,48,32,45,32,115,105,103,110,40,104,97,115,95,97,97,41,59,10,10,32,32,32,32,102,108,111,97,116,32,116,116,32,61,32,116,32,42,32,116,59,10,32,32,32,32,102,108,111,97,116,32,105,116,32,61,32,49,46,48,32,45,32,116,59,10,32,32,32,32,102,108,111,97,116,32,105,116,105,116,32,61,32,105,116,32,42,32,105,116,59,10,10,32,32,32,32,118,101,99,50,32,112,32,61,32,105,116,105,116,32,42,32,112,48,32,43,32,50,46,48,32,42,32,116,32,42,32,105,116,32,42,32,112,49,32,43,32,116,116,32,42,32,112,50,59,10,32,32,32,32,118,101,99,50,32,116,97,110,103,101,110,116,32,61,32,105,116,32,42,32,40,112,49,32,45,32,112,48,41,32,43,32,116,32,42,32,40,112,50,32,45,32,112,49,41,59,10,32,32,32,32,118,101,99,50,32,110,111,114,109,97,108,32,61,32,110,111,114,109,97,108,105,122,101,40,118,101,99,50,40,45,116,97,110,103,101,110,116,46,121,44,32,116,97,110,103,101,110,116,46,120,41,41,59,10,32,32,32,32,102,108,111,97,116,32,116,104,105,99,107,110,101,115,115,32,61,32,109,105,120,40,115,116,97,114,116,95,116,104,105,99,107,110,101,115,115,44,32,101,110,100,95,116,104,105,99,107,110,101,115,115,44,32,116,41,59,10,10,32,32,32,32,118,101,99,52,32,112,111,115,32,61,32,118,101,99,52,40,112,32,43,32,110,111,114,109,97,108,32,42,32,110,111,114,109,97,108,95,100,105,114,101,99,116,105,111,110,32,42,32,40,116,104,105,99,107,110,101,115,115,32,47,32,50,46,48,32,43,32,115,105,103,110,40,104,97,115,95,97,97,41,32,42,32,97,97,95,111,102,102,115,101,116,41,44,32,48,46,48,44,32,49,46,48,41,59,10,32,32,32,32,103,108,95,80,111,115,105,116,105,111,110,32,61,32,112,118,109,32,42,32,112,111,115,59,10,125,10,0,10,35,105,102,110,100,101,102,32,71,76,95,69,83,10,35,100,101,102,105,110,101,32,104,105,103,104,112,10,35,100,101,102,105,110,101,32,109,101,100,105,117,109,112,10,35,100,101,102,105,110,101,32,108,111,119,112,10,35,101,110,100,105,102,10,10,117,110,105,102,111,114,109,32,109,101,100,105,117,109,112,32,118,101,99,52,32,99,111,108,111,114,59,10,10,118,97,114,121,105,110,103,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,111,117,116,95,97,108,112,104,97,59,10,10,118,111,105,100,32,109,97,105,110,40,118,111,105,100,41,10,123,10,32,32,32,32,103,108,95,70,114,97,103,67,111,108,111,114,32,61,32,118,101,99,52,40,99,111,108,111,114,46,120,121,122,44,32,99,111,108,111,114,46,119,32,42,32,111,117,116,95,97,108,112,104,97,41,59,10,125,10,0,112,48,0,112,49,0,112,50,0,115,116,97,114,116,95,116,104,105,99,107,110,101,115,115,0,101,110,100,95,116,104,105,99,107,110,101,115,115,0,116,0,110,111,114,109,97,108,95,100,105,114,101,99,116,105,111,110,0,104,97,115,95,97,97,0,10,35,105,102,110,100,101,102,32,71,76,95,69,83,10,35,100,101,102,105,110,101,32,104,105,103,104,112,10,35,100,101,102,105,110,101,32,109,101,100,105,117,109,112,10,35,100,101,102,105,110,101,32,108,111,119,112,10,35,101,110,100,105,102,10,10,117,110,105,102,111,114,109,32,109,97,116,52,32,112,118,109,59,10,10,97,116,116,114,105,98,117,116,101,32,118,101,99,50,32,112,111,115,105,116,105,111,110,59,10,10,118,97,114,121,105,110,103,32,118,101,99,50,32,111,117,116,95,112,111,115,105,116,105,111,110,59,10,10,118,111,105,100,32,109,97,105,110,40,118,111,105,100,41,10,123,10,32,32,32,32,111,117,116,95,112,111,115,105,116,105,111,110,32,61,32,112,111,115,105,116,105,111,110,59,10,10,32,32,32,32,118,101,99,52,32,112,111,115,32,61,32,118,101,99,52,40,112,111,115,105,116,105,111,110,44,32,48,46,48,44,32,49,46,48,41,59,10,32,32,32,32,103,108,95,80,111,115,105,116,105,111,110,32,61,32,112,118,109,32,42,32,112,111,115,59,10,125,10,0,10,35,105,102,110,100,101,102,32,71,76,95,69,83,10,35,100,101,102,105,110,101,32,104,105,103,104,112,10,35,100,101,102,105,110,101,32,109,101,100,105,117,109,112,10,35,100,101,102,105,110,101,32,108,111,119,112,10,35,101,110,100,105,102,10,10,117,110,105,102,111,114,109,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,97,97,95,111,102,102,115,101,116,59,10,117,110,105,102,111,114,109,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,114,97,100,105,117,115,59,10,117,110,105,102,111,114,109,32,109,101,100,105,117,109,112,32,118,101,99,52,32,99,111,108,111,114,59,10,117,110,105,102,111,114,109,32,109,101,100,105,117,109,112,32,118,101,99,50,32,99,101,110,116,101,114,59,10,10,118,97,114,121,105,110,103,32,109,101,100,105,117,109,112,32,118,101,99,50,32,111,117,116,95,112,111,115,105,116,105,111,110,59,10,10,118,111,105,100,32,109,97,105,110,40,118,111,105,100,41,10,123,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,100,105,115,116,32,61,32,100,105,115,116,97,110,99,101,40,99,101,110,116,101,114,44,32,111,117,116,95,112,111,115,105,116,105,111,110,41,59,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,105,110,110,101,114,95,114,97,100,105,117,115,32,61,32,114,97,100,105,117,115,59,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,111,117,116,101,114,95,114,97,100,105,117,115,32,61,32,114,97,100,105,117,115,32,43,32,97,97,95,111,102,102,115,101,116,59,10,10,32,32,32,32,103,108,95,70,114,97,103,67,111,108,111,114,32,61,32,118,101,99,52,40,99,111,108,111,114,46,120,121,122,44,32,99,108,97,109,112,40,40,100,105,115,116,32,45,32,111,117,116,101,114,95,114,97,100,105,117,115,41,32,47,32,40,105,110,110,101,114,95,114,97,100,105,117,115,32,45,32,111,117,116,101,114,95,114,97,100,105,117,115,41,44,32,48,46,48,44,32,49,46,48,41,32,42,32,99,111,108,111,114,46,119,41,59,10,125,10,0,97,97,95,111,102,102,115,101,116,0,114,97,100,105,117,115,0,99,101,110,116,101,114,0,10,117,110,105,102,111,114,109,32,109,97,116,52,32,112,114,111,106,101,99,116,105,111,110,59,10,117,110,105,102,111,114,109,32,102,108,111,97,116,32,111,102,102,115,101,116,59,10,10,97,116,116,114,105,98,117,116,101,32,118,101,99,50,32,112,111,115,105,116,105,111,110,59,10,97,116,116,114,105,98,117,116,101,32,118,101,99,50,32,111,102,102,115,101,116,95,100,105,114,59,10,10,118,97,114,121,105,110,103,32,118,101,99,50,32,111,117,116,95,112,111,115,59,10,10,118,111,105,100,32,109,97,105,110,40,118,111,105,100,41,10,123,10,32,32,32,32,118,101,99,50,32,112,111,115,105,116,105,111,110,95,119,105,116,104,95,111,102,102,115,101,116,32,61,32,112,111,115,105,116,105,111,110,32,43,32,111,102,102,115,101,116,95,100,105,114,32,42,32,111,102,102,115,101,116,59,10,32,32,32,32,111,117,116,95,112,111,115,32,61,32,112,111,115,105,116,105,111,110,95,119,105,116,104,95,111,102,102,115,101,116,59,10,10,32,32,32,32,118,101,99,52,32,112,111,115,32,61,32,118,101,99,52,40,112,111,115,105,116,105,111,110,95,119,105,116,104,95,111,102,102,115,101,116,44,32,48,46,48,44,32,49,46,48,41,59,10,32,32,32,32,103,108,95,80,111,115,105,116,105,111,110,32,61,32,112,114,111,106,101,99,116,105,111,110,32,42,32,112,111,115,59,10,125,10,0,10,35,105,102,110,100,101,102,32,71,76,95,69,83,10,35,100,101,102,105,110,101,32,104,105,103,104,112,10,35,100,101,102,105,110,101,32,109,101,100,105,117,109,112,10,35,100,101,102,105,110,101,32,108,111,119,112,10,35,101,110,100,105,102,10,10,117,110,105,102,111,114,109,32,109,101,100,105,117,109,112,32,118,101,99,50,32,111,114,105,103,105,110,59,10,117,110,105,102,111,114,109,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,100,97,115,104,95,115,105,122,101,59,10,117,110,105,102,111,114,109,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,100,97,115,104,95,115,116,101,112,59,10,10,118,97,114,121,105,110,103,32,109,101,100,105,117,109,112,32,118,101,99,50,32,111,117,116,95,112,111,115,59,10,10,118,111,105,100,32,109,97,105,110,40,118,111,105,100,41,10,123,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,116,32,61,32,109,111,100,40,40,111,117,116,95,112,111,115,46,120,32,45,32,111,114,105,103,105,110,46,120,41,32,43,32,40,111,114,105,103,105,110,46,121,32,45,32,111,117,116,95,112,111,115,46,121,41,32,43,32,100,97,115,104,95,115,116,101,112,32,43,32,48,46,53,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,50,46,48,32,42,32,100,97,115,104,95,115,105,122,101,41,59,10,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,107,32,61,32,99,108,97,109,112,40,115,105,103,110,40,100,97,115,104,95,115,105,122,101,32,45,32,116,41,44,32,48,46,48,44,32,49,46,48,41,59,10,32,32,32,32,103,108,95,70,114,97,103,67,111,108,111,114,32,61,32,118,101,99,52,40,107,44,32,107,44,32,107,44,32,49,46,48,41,59,10,125,10,0,112,114,111,106,101,99,116,105,111,110,0,111,102,102,115,101,116,0,111,114,105,103,105,110,0,100,97,115,104,95,115,105,122,101,0,100,97,115,104,95,115,116,101,112,0,111,102,102,115,101,116,95,100,105,114,0,10,35,105,102,110,100,101,102,32,71,76,95,69,83,10,35,100,101,102,105,110,101,32,104,105,103,104,112,10,35,100,101,102,105,110,101,32,109,101,100,105,117,109,112,10,35,100,101,102,105,110,101,32,108,111,119,112,10,35,101,110,100,105,102,10,10,117,110,105,102,111,114,109,32,115,97,109,112,108,101,114,50,68,32,115,97,109,112,108,101,114,59,10,117,110,105,102,111,114,109,32,109,101,100,105,117,109,112,32,118,101,99,52,32,99,111,108,111,114,59,10,10,118,97,114,121,105,110,103,32,109,101,100,105,117,109,112,32,118,101,99,50,32,111,117,116,95,116,101,120,116,117,114,101,95,99,111,111,114,100,59,10,10,118,111,105,100,32,109,97,105,110,40,118,111,105,100,41,10,123,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,97,108,112,104,97,32,61,32,116,101,120,116,117,114,101,50,68,40,115,97,109,112,108,101,114,44,32,111,117,116,95,116,101,120,116,117,114,101,95,99,111,111,114,100,41,46,97,59,10,32,32,32,32,103,108,95,70,114,97,103,67,111,108,111,114,32,61,32,118,101,99,52,40,99,111,108,111,114,46,114,103,98,44,32,99,111,108,111,114,46,97,32,42,32,97,108,112,104,97,41,59,10,125,10,0,99,111,108,111,114,0,10,117,110,105,102,111,114,109,32,109,97,116,52,32,112,118,109,59,10,10,97,116,116,114,105,98,117,116,101,32,118,101,99,50,32,112,111,115,105,116,105,111,110,59,10,97,116,116,114,105,98,117,116,101,32,118,101,99,50,32,116,101,120,116,117,114,101,95,99,111,111,114,100,59,10,10,118,97,114,121,105,110,103,32,118,101,99,50,32,111,117,116,95,116,101,120,116,117,114,101,95,99,111,111,114,100,59,10,10,118,111,105,100,32,109,97,105,110,40,118,111,105,100,41,10,123,10,32,32,32,32,111,117,116,95,116,101,120,116,117,114,101,95,99,111,111,114,100,32,61,32,116,101,120,116,117,114,101,95,99,111,111,114,100,59,10,10,32,32,32,32,118,101,99,52,32,112,111,115,32,61,32,118,101,99,52,40,112,111,115,105,116,105,111,110,44,32,48,46,48,44,32,49,46,48,41,59,10,32,32,32,32,103,108,95,80,111,115,105,116,105,111,110,32,61,32,112,118,109,32,42,32,112,111,115,59,10,125,10,0,10,35,105,102,110,100,101,102,32,71,76,95,69,83,10,35,100,101,102,105,110,101,32,104,105,103,104,112,10,35,100,101,102,105,110,101,32,109,101,100,105,117,109,112,10,35,100,101,102,105,110,101,32,108,111,119,112,10,35,101,110,100,105,102,10,10,117,110,105,102,111,114,109,32,115,97,109,112,108,101,114,50,68,32,115,97,109,112,108,101,114,59,10,10,118,97,114,121,105,110,103,32,109,101,100,105,117,109,112,32,118,101,99,50,32,111,117,116,95,116,101,120,116,117,114,101,95,99,111,111,114,100,59,10,10,118,111,105,100,32,109,97,105,110,40,118,111,105,100,41,10,123,10,32,32,32,32,103,108,95,70,114,97,103,67,111,108,111,114,32,61,32,116,101,120,116,117,114,101,50,68,40,115,97,109,112,108,101,114,44,32,111,117,116,95,116,101,120,116,117,114,101,95,99,111,111,114,100,41,59,10,125,10,0,112,118,109,0,112,111,115,105,116,105,111,110,0,116,101,120,116,117,114,101,95,99,111,111,114,100,0,39,98,117,102,102,101,114,32,100,97,116,97,39,0,39,98,105,110,100,32,98,117,102,102,101,114,39,0,30,31,21,18,19,10,11,8,2,3,4,14,17,16,25,24,27,33,1,2,7,8,4,5,14,13,20,19,9,10,15,16,26,25,22,21,32,31,27,28,33,34,3,2,1,0,5,4,30,31,32,35,34,33,18,19,20,23,22,21,24,25,26,29,28,27,11,10,9,6,7,8,17,14,13,12,15,16,0,1,2,3,4,5,6,0,1,2,3,4,5,6,7,8,0,9,6,1,10,7,11,2,17,0,15,3,19,7,2,5,0,8,4,7,12,5,10,9,13,12,17,10,15,14,18,0,3,4,1,6,8,9,5,13,10,11,14,15,19,18,16,0,1,2,3,4,5,6,7,0,1,78,50,118,101,54,111,112,101,110,103,108,56,66,108,101,110,100,105,110,103,69,0,78,50,118,101,54,111,112,101,110,103,108,57,73,66,108,101,110,100,105,110,103,69,0,78,50,118,101,54,111,112,101,110,103,108,49,52,69,120,112,111,114,116,77,101,97,115,117,114,101,115,69,0,78,50,118,101,54,111,112,101,110,103,108,49,55,79,112,101,110,71,76,69,110,118,105,114,111,110,109,101,110,116,69,0,78,50,118,101,54,111,112,101,110,103,108,49,56,73,79,112,101,110,71,76,69,110,118,105,114,111,110,109,101,110,116,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,54,111,112,101,110,103,108,49,49,69,109,112,116,121,79,112,101,110,71,76,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,54,111,112,101,110,103,108,49,49,69,109,112,116,121,79,112,101,110,71,76,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,51,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,51,95,69,69,69,69,0,78,50,118,101,54,111,112,101,110,103,108,49,49,69,109,112,116,121,79,112,101,110,71,76,69,0,78,50,118,101,54,111,112,101,110,103,108,55,73,79,112,101,110,71,76,69,0,78,50,118,101,54,111,112,101,110,103,108,50,49,79,112,101,110,71,76,82,101,110,100,101,114,105,110,103,69,110,103,105,110,101,69,0,78,50,118,101,49,54,73,82,101,110,100,101,114,105,110,103,69,110,103,105,110,101,69,0,78,50,118,101,49,56,73,67,117,114,115,111,114,80,111,115,105,116,105,111,110,105,110,103,69,0,90,78,50,118,101,54,111,112,101,110,103,108,50,49,79,112,101,110,71,76,82,101,110,100,101,114,105,110,103,69,110,103,105,110,101,50,51,83,117,98,115,99,114,105,98,101,84,111,79,112,101,110,71,76,69,118,101,110,116,115,69,118,69,51,36,95,49,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,102,117,110,99,73,90,78,50,118,101,54,111,112,101,110,103,108,50,49,79,112,101,110,71,76,82,101,110,100,101,114,105,110,103,69,110,103,105,110,101,50,51,83,117,98,115,99,114,105,98,101,84,111,79,112,101,110,71,76,69,118,101,110,116,115,69,118,69,51,36,95,49,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,53,95,69,69,70,118,82,75,78,83,51,95,50,51,68,101,102,97,117,108,116,66,117,102,102,101,114,80,97,114,97,109,101,116,101,114,115,69,82,75,78,83,50,95,49,48,79,117,116,112,117,116,83,105,122,101,69,82,98,69,69,69,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,98,97,115,101,73,70,118,82,75,78,50,118,101,54,111,112,101,110,103,108,50,51,68,101,102,97,117,108,116,66,117,102,102,101,114,80,97,114,97,109,101,116,101,114,115,69,82,75,78,83,50,95,49,48,79,117,116,112,117,116,83,105,122,101,69,82,98,69,69,69,0,90,78,50,118,101,54,111,112,101,110,103,108,50,49,79,112,101,110,71,76,82,101,110,100,101,114,105,110,103,69,110,103,105,110,101,50,51,83,117,98,115,99,114,105,98,101,84,111,79,112,101,110,71,76,69,118,101,110,116,115,69,118,69,51,36,95,48,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,102,117,110,99,73,90,78,50,118,101,54,111,112,101,110,103,108,50,49,79,112,101,110,71,76,82,101,110,100,101,114,105,110,103,69,110,103,105,110,101,50,51,83,117,98,115,99,114,105,98,101,84,111,79,112,101,110,71,76,69,118,101,110,116,115,69,118,69,51,36,95,48,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,53,95,69,69,70,118,118,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,54,111,112,101,110,103,108,57,82,101,110,100,101,114,101,114,115,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,54,111,112,101,110,103,108,57,82,101,110,100,101,114,101,114,115,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,51,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,51,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,54,111,112,101,110,103,108,49,52,79,112,101,110,71,76,80,114,111,103,114,97,109,115,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,54,111,112,101,110,103,108,49,52,79,112,101,110,71,76,80,114,111,103,114,97,109,115,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,51,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,51,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,54,111,112,101,110,103,108,49,51,79,112,101,110,71,76,66,117,102,102,101,114,115,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,54,111,112,101,110,103,108,49,51,79,112,101,110,71,76,66,117,102,102,101,114,115,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,51,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,51,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,54,111,112,101,110,103,108,49,55,79,112,101,110,71,76,69,110,118,105,114,111,110,109,101,110,116,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,54,111,112,101,110,103,108,49,55,79,112,101,110,71,76,69,110,118,105,114,111,110,109,101,110,116,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,51,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,51,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,54,111,112,101,110,103,108,50,49,79,112,101,110,71,76,82,101,110,100,101,114,105,110,103,69,110,103,105,110,101,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,54,111,112,101,110,103,108,50,49,79,112,101,110,71,76,82,101,110,100,101,114,105,110,103,69,110,103,105,110,101,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,51,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,51,95,69,69,69,69,0,78,50,118,101,53,83,99,101,110,101,69,0,78,50,118,101,54,73,83,99,101,110,101,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,53,83,99,101,110,101,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,53,83,99,101,110,101,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,48,73,109,97,103,101,77,111,100,101,108,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,48,73,109,97,103,101,77,111,100,101,108,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,86,101,67,111,108,111,114,0,114,101,100,0,103,114,101,101,110,0,98,108,117,101,0,86,101,80,111,105,110,116,0,120,0,121,0,86,101,83,105,122,101,0,119,105,100,116,104,0,104,101,105,103,104,116,0,86,101,87,105,110,100,111,119,83,105,122,101,0,115,99,114,101,101,110,83,99,97,108,101,70,97,99,116,111,114,0,86,101,84,111,111,108,0,76,105,110,101,0,66,108,117,114,0,65,114,114,111,119,0,66,114,117,115,104,0,79,118,97,108,0,82,101,99,116,97,110,103,108,101,0,84,101,120,116,0,86,101,84,101,120,116,68,105,114,101,99,116,105,111,110,0,76,101,102,116,84,111,82,105,103,104,116,0,82,105,103,104,116,84,111,76,101,102,116,0,86,101,84,101,120,116,73,110,112,117,116,67,111,109,109,97,110,100,0,67,111,109,112,108,101,116,101,73,110,112,117,116,0,78,101,119,76,105,110,101,0,66,97,99,107,115,112,97,99,101,0,68,101,108,101,116,101,0,77,111,118,101,67,117,114,115,111,114,76,101,102,116,0,77,111,118,101,67,117,114,115,111,114,82,105,103,104,116,0,77,111,118,101,67,117,114,115,111,114,85,112,0,77,111,118,101,67,117,114,115,111,114,68,111,119,110,0,86,101,73,110,105,116,105,97,108,80,97,114,97,109,101,116,101,114,115,0,115,104,97,112,101,67,111,108,111,114,0,108,105,110,101,87,105,100,116,104,0,97,100,100,83,104,97,100,111,119,0,116,111,111,108,0,119,105,110,100,111,119,83,105,122,101,0,98,97,99,107,103,114,111,117,110,100,67,111,108,111,114,0,98,97,99,107,66,105,116,109,97,112,85,117,105,100,0,98,97,99,107,66,105,116,109,97,112,83,105,122,101,0,98,97,115,101,84,101,120,116,68,105,114,101,99,116,105,111,110,0,105,105,0,118,0,86,101,69,110,103,105,110,101,0,118,105,0,99,114,101,97,116,101,0,105,105,105,105,0,105,105,105,0,115,101,116,84,111,111,108,0,115,101,116,76,105,110,101,87,105,100,116,104,0,115,101,116,67,111,108,111,114,0,105,105,105,105,102,0,115,101,116,72,111,114,105,122,111,110,116,97,108,80,111,115,105,116,105,111,110,0,105,105,105,102,0,115,101,116,86,101,114,116,105,99,97,108,80,111,115,105,116,105,111,110,0,99,108,105,99,107,79,110,99,101,0,100,114,97,103,83,116,97,114,116,0,100,114,97,103,77,111,118,101,0,100,114,97,103,69,110,100,0,100,114,97,103,76,111,115,116,0,97,100,100,67,104,97,114,97,99,116,101,114,0,116,101,120,116,67,111,109,109,97,110,100,0,101,120,112,111,114,116,73,109,97,103,101,0,99,111,110,116,101,120,116,76,111,115,116,0,99,111,110,116,101,120,116,82,101,115,116,111,114,101,100,0,116,105,109,101,114,84,105,99,107,0,102,97,105,108,117,114,101,82,101,97,115,111,110,0,78,83,116,51,95,95,50,49,50,98,97,115,105,99,95,115,116,114,105,110,103,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,99,69,69,69,69,0,78,83,116,51,95,95,50,50,49,95,95,98,97,115,105,99,95,115,116,114,105,110,103,95,99,111,109,109,111,110,73,76,98,49,69,69,69,0,78,52,109,101,106,115,53,80,111,105,110,116,69,0,78,52,109,101,106,115,49,48,87,105,110,100,111,119,83,105,122,101,69,0,78,52,109,101,106,115,53,67,111,108,111,114,69,0,78,52,109,101,106,115,49,55,73,110,105,116,105,97,108,80,97,114,97,109,101,116,101,114,115,69,0,80,75,78,52,109,101,106,115,56,86,101,69,110,103,105,110,101,69,0,80,78,52,109,101,106,115,56,86,101,69,110,103,105,110,101,69,0,78,52,109,101,106,115,56,86,101,69,110,103,105,110,101,69,0,118,105,105,105,0,78,52,109,101,106,115,52,83,105,122,101,69,0,105,0,78,50,118,101,49,54,84,101,120,116,73,110,112,117,116,67,111,109,109,97,110,100,69,0,78,50,118,101,49,51,84,101,120,116,68,105,114,101,99,116,105,111,110,69,0,78,50,118,101,52,84,111,111,108,69,0,102,105,105,0,118,105,105,102,0,123,32,77,111,100,117,108,101,46,98,105,116,109,97,112,69,120,112,111,114,116,101,114,46,112,117,116,73,109,97,103,101,80,97,114,116,40,36,48,44,32,36,49,44,32,36,50,44,32,36,51,44,32,36,52,44,32,36,53,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,69,120,112,111,114,116,101,114,46,112,114,101,112,97,114,101,40,36,48,44,32,36,49,41,59,32,125,0,78,52,109,101,106,115,49,52,66,105,116,109,97,112,69,120,112,111,114,116,101,114,69,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,103,101,116,66,105,116,109,97,112,73,110,100,101,120,40,80,111,105,110,116,101,114,95,115,116,114,105,110,103,105,102,121,40,36,48,41,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,103,101,116,78,117,109,98,101,114,79,102,70,114,97,103,109,101,110,116,115,40,36,48,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,113,117,101,114,121,70,114,97,103,109,101,110,116,67,111,111,114,100,105,110,97,116,101,115,40,36,48,44,32,36,49,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,103,101,116,88,40,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,103,101,116,89,40,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,103,101,116,87,105,100,116,104,40,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,103,101,116,72,101,105,103,104,116,40,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,103,101,116,85,84,111,112,76,101,102,116,40,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,103,101,116,86,84,111,112,76,101,102,116,40,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,103,101,116,85,66,111,116,116,111,109,82,105,103,104,116,40,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,103,101,116,86,66,111,116,116,111,109,82,105,103,104,116,40,41,59,32,125,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,52,109,101,106,115,49,52,66,105,116,109,97,112,70,114,97,103,109,101,110,116,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,52,109,101,106,115,49,52,66,105,116,109,97,112,70,114,97,103,109,101,110,116,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,98,105,110,100,40,36,48,44,32,36,49,41,59,32,125,0,78,52,109,101,106,115,49,52,66,105,116,109,97,112,70,114,97,103,109,101,110,116,69,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,103,101,116,66,105,116,109,97,112,87,105,100,116,104,40,36,48,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,103,101,116,66,105,116,109,97,112,72,101,105,103,104,116,40,36,48,41,59,32,125,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,52,109,101,106,115,54,66,105,116,109,97,112,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,52,109,101,106,115,54,66,105,116,109,97,112,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,52,109,101,106,115,54,66,105,116,109,97,112,69,0,123,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,104,97,110,100,108,101,67,111,110,116,101,120,116,82,101,115,116,111,114,101,100,40,41,59,32,125,0,123,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,104,97,110,100,108,101,67,111,110,116,101,120,116,76,111,115,116,40,41,59,32,125,0,78,52,109,101,106,115,49,52,66,105,116,109,97,112,80,114,111,118,105,100,101,114,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,52,109,101,106,115,55,84,121,112,101,115,101,116,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,52,109,101,106,115,55,84,121,112,101,115,101,116,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,123,32,77,111,100,117,108,101,46,98,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,46,104,97,110,100,108,101,67,111,110,116,101,120,116,82,101,115,116,111,114,101,100,40,41,59,32,125,0,123,32,77,111,100,117,108,101,46,98,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,46,104,97,110,100,108,101,67,111,110,116,101,120,116,76,111,115,116,40,41,59,32,125,0,78,52,109,101,106,115,49,55,66,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,69,0,78,50,118,101,54,111,112,101,110,103,108,49,49,73,84,121,112,101,115,101,116,116,101,114,69,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,116,105,109,101,114,70,97,99,116,111,114,121,46,99,114,101,97,116,101,84,105,109,101,114,40,41,59,32,125,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,52,109,101,106,115,53,84,105,109,101,114,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,52,109,101,106,115,53,84,105,109,101,114,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,123,32,77,111,100,117,108,101,46,116,105,109,101,114,70,97,99,116,111,114,121,46,115,116,111,112,84,105,109,101,114,40,36,48,41,59,32,125,0,123,32,77,111,100,117,108,101,46,116,105,109,101,114,70,97,99,116,111,114,121,46,115,116,97,114,116,84,105,109,101,114,40,36,48,44,32,36,49,41,59,32,125,0,78,52,109,101,106,115,53,84,105,109,101,114,69,0,78,50,118,101,54,73,84,105,109,101,114,69,0,78,52,109,101,106,115,49,50,84,105,109,101,114,70,97,99,116,111,114,121,69,0,78,50,118,101,49,51,73,84,105,109,101,114,70,97,99,116,111,114,121,69,0,123,32,77,111,100,117,108,101,46,98,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,46,100,101,108,101,116,101,84,121,112,101,115,101,116,40,36,48,41,59,32,125,0,78,52,109,101,106,115,55,84,121,112,101,115,101,116,69,0,78,50,118,101,54,111,112,101,110,103,108,56,73,84,121,112,101,115,101,116,69,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,46,99,114,101,97,116,101,84,121,112,101,115,101,116,40,41,59,32,125,0,123,32,99,111,110,115,116,32,116,121,112,101,115,101,116,32,61,32,77,111,100,117,108,101,46,98,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,46,103,101,116,84,121,112,101,115,101,116,40,36,48,41,59,32,105,102,32,40,33,116,121,112,101,115,101,116,41,32,123,32,114,101,116,117,114,110,32,102,97,108,115,101,59,32,125,32,114,101,116,117,114,110,32,116,121,112,101,115,101,116,46,117,112,100,97,116,101,40,85,84,70,51,50,84,111,83,116,114,105,110,103,40,36,49,41,44,32,36,50,44,32,40,36,51,32,61,61,61,32,48,41,32,63,32,39,108,116,114,39,32,58,32,39,114,116,108,39,44,32,36,52,44,32,36,53,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,46,103,101,116,84,121,112,101,115,101,116,40,36,48,41,46,103,101,116,76,105,110,101,72,101,105,103,104,116,40,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,46,103,101,116,84,121,112,101,115,101,116,40,36,48,41,46,103,101,116,68,101,115,99,101,110,116,40,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,46,103,101,116,84,121,112,101,115,101,116,40,36,48,41,46,103,101,116,70,114,97,103,109,101,110,116,67,111,117,110,116,40,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,46,103,101,116,84,121,112,101,115,101,116,40,36,48,41,46,103,101,116,88,66,97,115,101,40,36,49,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,46,103,101,116,84,121,112,101,115,101,116,40,36,48,41,46,103,101,116,89,66,97,115,101,40,36,49,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,46,103,101,116,84,121,112,101,115,101,116,40,36,48,41,46,103,101,116,88,79,112,112,111,115,105,116,101,40,36,49,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,46,103,101,116,84,121,112,101,115,101,116,40,36,48,41,46,103,101,116,89,79,112,112,111,115,105,116,101,40,36,49,41,59,32,125,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,52,109,101,106,115,49,50,84,101,120,116,70,114,97,103,109,101,110,116,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,52,109,101,106,115,49,50,84,101,120,116,70,114,97,103,109,101,110,116,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,123,32,99,111,110,115,116,32,116,121,112,101,115,101,116,32,61,32,77,111,100,117,108,101,46,98,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,46,103,101,116,84,121,112,101,115,101,116,40,36,48,41,59,32,105,102,32,40,33,116,121,112,101,115,101,116,41,32,123,32,114,101,116,117,114,110,32,102,97,108,115,101,59,32,125,32,114,101,116,117,114,110,32,116,121,112,101,115,101,116,46,98,105,110,100,83,116,114,111,107,101,40,36,49,41,59,32,125,0,123,32,99,111,110,115,116,32,116,121,112,101,115,101,116,32,61,32,77,111,100,117,108,101,46,98,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,46,103,101,116,84,121,112,101,115,101,116,40,36,48,41,59,32,105,102,32,40,33,116,121,112,101,115,101,116,41,32,123,32,114,101,116,117,114,110,32,102],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE+20480);allocate([97,108,115,101,59,32,125,32,114,101,116,117,114,110,32,116,121,112,101,115,101,116,46,98,105,110,100,78,111,114,109,97,108,40,36,49,41,59,32,125,0,78,52,109,101,106,115,49,50,84,101,120,116,70,114,97,103,109,101,110,116,69,0,78,50,118,101,54,111,112,101,110,103,108,49,51,73,84,101,120,116,70,114,97,103,109,101,110,116,69,0,78,52,109,101,106,115,49,51,85,117,105,100,71,101,110,101,114,97,116,111,114,69,0,78,50,118,101,49,52,73,85,117,105,100,71,101,110,101,114,97,116,111,114,69,0,123,32,77,111,100,117,108,101,46,104,97,110,100,108,101,83,99,114,111,108,108,67,104,97,110,103,101,100,40,36,48,44,32,36,49,44,32,36,50,44,32,36,51,44,32,36,52,44,32,36,53,41,59,32,125,0,90,78,52,109,101,106,115,56,86,101,69,110,103,105,110,101,50,54,83,117,98,115,99,114,105,98,101,84,111,69,100,105,116,111,114,67,97,108,108,98,97,99,107,115,69,118,69,51,36,95,52,0,123,32,77,111,100,117,108,101,46,104,97,110,100,108,101,84,101,120,116,73,110,112,117,116,69,110,100,101,100,40,41,59,32,125,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,102,117,110,99,73,90,78,52,109,101,106,115,56,86,101,69,110,103,105,110,101,50,54,83,117,98,115,99,114,105,98,101,84,111,69,100,105,116,111,114,67,97,108,108,98,97,99,107,115,69,118,69,51,36,95,52,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,52,95,69,69,70,118,118,69,69,69,0,90,78,52,109,101,106,115,56,86,101,69,110,103,105,110,101,50,54,83,117,98,115,99,114,105,98,101,84,111,69,100,105,116,111,114,67,97,108,108,98,97,99,107,115,69,118,69,51,36,95,51,0,123,32,77,111,100,117,108,101,46,104,97,110,100,108,101,84,101,120,116,73,110,112,117,116,83,116,97,114,116,101,100,40,41,59,32,125,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,102,117,110,99,73,90,78,52,109,101,106,115,56,86,101,69,110,103,105,110,101,50,54,83,117,98,115,99,114,105,98,101,84,111,69,100,105,116,111,114,67,97,108,108,98,97,99,107,115,69,118,69,51,36,95,51,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,52,95,69,69,70,118,118,69,69,69,0,90,78,52,109,101,106,115,56,86,101,69,110,103,105,110,101,50,54,83,117,98,115,99,114,105,98,101,84,111,69,100,105,116,111,114,67,97,108,108,98,97,99,107,115,69,118,69,51,36,95,50,0,123,32,77,111,100,117,108,101,46,104,97,110,100,108,101,83,104,97,112,101,80,97,114,97,109,101,116,101,114,115,67,104,97,110,103,101,100,40,36,48,44,32,36,49,44,32,36,50,44,32,36,51,44,32,36,52,41,59,32,125,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,102,117,110,99,73,90,78,52,109,101,106,115,56,86,101,69,110,103,105,110,101,50,54,83,117,98,115,99,114,105,98,101,84,111,69,100,105,116,111,114,67,97,108,108,98,97,99,107,115,69,118,69,51,36,95,50,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,52,95,69,69,70,118,118,69,69,69,0,90,78,52,109,101,106,115,56,86,101,69,110,103,105,110,101,50,54,83,117,98,115,99,114,105,98,101,84,111,69,100,105,116,111,114,67,97,108,108,98,97,99,107,115,69,118,69,51,36,95,49,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,102,117,110,99,73,90,78,52,109,101,106,115,56,86,101,69,110,103,105,110,101,50,54,83,117,98,115,99,114,105,98,101,84,111,69,100,105,116,111,114,67,97,108,108,98,97,99,107,115,69,118,69,51,36,95,49,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,52,95,69,69,70,118,118,69,69,69,0,90,78,52,109,101,106,115,56,86,101,69,110,103,105,110,101,50,54,83,117,98,115,99,114,105,98,101,84,111,69,100,105,116,111,114,67,97,108,108,98,97,99,107,115,69,118,69,51,36,95,48,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,102,117,110,99,73,90,78,52,109,101,106,115,56,86,101,69,110,103,105,110,101,50,54,83,117,98,115,99,114,105,98,101,84,111,69,100,105,116,111,114,67,97,108,108,98,97,99,107,115,69,118,69,51,36,95,48,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,52,95,69,69,70,118,118,69,69,69,0,67,97,110,39,116,32,99,114,101,97,116,101,32,116,104,101,32,101,100,105,116,111,114,46,32,82,101,115,117,108,116,58,32,0,84,104,101,32,99,114,101,97,116,101,100,32,101,100,105,116,111,114,32,105,115,32,110,117,108,108,112,116,114,0,84,104,101,32,99,114,101,97,116,101,100,32,116,105,109,101,114,32,102,97,99,116,111,114,121,32,105,115,32,110,117,108,108,112,116,114,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,52,109,101,106,115,49,50,84,105,109,101,114,70,97,99,116,111,114,121,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,52,109,101,106,115,49,50,84,105,109,101,114,70,97,99,116,111,114,121,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,84,104,101,32,99,114,101,97,116,101,100,32,79,112,101,110,71,76,32,105,109,112,108,101,109,101,110,116,97,116,105,111,110,32,105,115,32,110,117,108,108,112,116,114,0,84,104,101,32,99,114,101,97,116,101,100,32,98,105,116,109,97,112,32,112,114,111,118,105,100,101,114,32,105,115,32,110,117,108,108,112,116,114,0,84,104,101,32,99,114,101,97,116,101,100,32,116,121,112,101,115,101,116,116,101,114,32,105,115,32,110,117,108,108,112,116,114,0,67,97,110,39,116,32,99,114,101,97,116,101,32,114,101,110,100,101,114,105,110,103,32,101,110,103,105,110,101,46,32,82,101,115,117,108,116,58,32,0,84,104,101,32,99,114,101,97,116,101,100,32,114,101,110,100,101,114,105,110,103,32,101,110,103,105,110,101,32,105,115,32,110,117,108,108,112,116,114,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,52,109,101,106,115,49,55,66,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,52,109,101,106,115,49,55,66,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,52,109,101,106,115,49,52,66,105,116,109,97,112,80,114,111,118,105,100,101,114,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,52,109,101,106,115,49,52,66,105,116,109,97,112,80,114,111,118,105,100,101,114,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,54,111,112,101,110,103,108,49,52,83,116,97,110,100,97,114,100,79,112,101,110,71,76,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,54,111,112,101,110,103,108,49,52,83,116,97,110,100,97,114,100,79,112,101,110,71,76,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,51,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,51,95,69,69,69,69,0,78,50,118,101,54,111,112,101,110,103,108,49,52,83,116,97,110,100,97,114,100,79,112,101,110,71,76,69,0,67,97,110,39,116,32,99,114,101,97,116,101,32,116,104,101,32,115,99,101,110,101,46,32,82,101,115,117,108,116,58,32,0,84,104,101,32,99,114,101,97,116,101,100,32,115,99,101,110,101,32,105,115,32,110,117,108,108,112,116,114,0,84,104,101,32,99,114,101,97,116,101,100,32,85,85,73,68,32,103,101,110,101,114,97,116,111,114,32,105,115,32,110,117,108,108,112,116,114,0,84,104,101,32,85,85,73,68,32,103,101,110,101,114,97,116,111,114,32,99,114,101,97,116,101,100,32,116,119,111,32,101,113,117,97,108,32,85,85,73,68,115,58,32,39,0,39,32,97,110,100,32,39,0,39,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,52,109,101,106,115,49,51,85,117,105,100,71,101,110,101,114,97,116,111,114,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,52,109,101,106,115,49,51,85,117,105,100,71,101,110,101,114,97,116,111,114,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,114,101,110,100,101,114,0,84,104,101,32,101,100,105,116,111,114,32,105,115,32,110,117,108,108,112,116,114,0,69,114,114,111,114,32,91,114,101,115,117,108,116,32,0,93,32,111,99,99,117,114,114,101,100,32,119,104,101,110,32,112,101,114,102,111,114,109,105,110,103,32,116,104,101,32,97,99,116,105,111,110,32,39,0,115,101,116,32,116,111,111,108,0,115,101,116,32,108,105,110,101,32,119,105,100,116,104,0,115,101,116,32,115,104,97,112,101,32,99,111,108,111,114,0,114,101,115,105,122,101,0,114,101,115,99,97,108,101,0,115,101,116,32,120,32,112,111,115,105,116,105,111,110,0,115,101,116,32,121,32,112,111,115,105,116,105,111,110,0,111,110,101,32,99,108,105,99,107,0,100,114,97,103,32,115,116,97,114,116,0,100,114,97,103,32,109,111,118,101,0,100,114,97,103,32,101,110,100,0,100,114,97,103,32,108,111,115,116,0,97,100,100,32,99,104,97,114,97,99,116,101,114,0,116,101,120,116,32,105,110,112,117,116,32,99,111,109,109,97,110,100,0,67,97,110,39,116,32,101,120,112,111,114,116,32,116,104,101,32,105,109,97,103,101,46,32,82,101,115,117,108,116,58,32,0,103,108,95,32,105,115,32,110,117,108,108,112,116,114,0,84,104,101,32,99,111,110,116,101,120,116,32,105,115,32,110,111,116,32,114,101,115,116,111,114,101,100,0,84,105,109,101,114,32,102,97,99,116,111,114,121,32,105,115,32,110,117,108,108,112,116,114,0,118,111,105,100,0,98,111,111,108,0,99,104,97,114,0,115,105,103,110,101,100,32,99,104,97,114,0,117,110,115,105,103,110,101,100,32,99,104,97,114,0,115,104,111,114,116,0,117,110,115,105,103,110,101,100,32,115,104,111,114,116,0,105,110,116,0,117,110,115,105,103,110,101,100,32,105,110,116,0,108,111,110,103,0,117,110,115,105,103,110,101,100,32,108,111,110,103,0,102,108,111,97,116,0,100,111,117,98,108,101,0,115,116,100,58,58,115,116,114,105,110,103,0,115,116,100,58,58,98,97,115,105,99,95,115,116,114,105,110,103,60,117,110,115,105,103,110,101,100,32,99,104,97,114,62,0,115,116,100,58,58,119,115,116,114,105,110,103,0,101,109,115,99,114,105,112,116,101,110,58,58,118,97,108,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,99,104,97,114,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,115,105,103,110,101,100,32,99,104,97,114,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,110,115,105,103,110,101,100,32,99,104,97,114,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,115,104,111,114,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,110,115,105,103,110,101,100,32,115,104,111,114,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,105,110,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,110,115,105,103,110,101,100,32,105,110,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,108,111,110,103,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,110,115,105,103,110,101,100,32,108,111,110,103,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,105,110,116,56,95,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,105,110,116,56,95,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,105,110,116,49,54,95,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,105,110,116,49,54,95,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,105,110,116,51,50,95,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,105,110,116,51,50,95,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,102,108,111,97,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,100,111,117,98,108,101,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,108,111,110,103,32,100,111,117,98,108,101,62,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,101,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,100,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,102,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,109,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,108,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,106,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,105,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,116,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,115,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,104,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,97,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,99,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,51,118,97,108,69,0,78,83,116,51,95,95,50,49,50,98,97,115,105,99,95,115,116,114,105,110,103,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,119,69,69,69,69,0,78,83,116,51,95,95,50,49,50,98,97,115,105,99,95,115,116,114,105,110,103,73,104,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,104,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,104,69,69,69,69,0,17,0,10,0,17,17,17,0,0,0,0,5,0,0,0,0,0,0,9,0,0,0,0,11,0,0,0,0,0,0,0,0,17,0,15,10,17,17,17,3,10,7,0,1,19,9,11,11,0,0,9,6,11,0,0,11,0,6,17,0,0,0,17,17,17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,17,0,10,10,17,17,17,0,10,0,0,2,0,9,11,0,0,0,9,0,11,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,12,0,0,0,0,9,12,0,0,0,0,0,12,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,0,0,0,0,0,0,0,0,0,0,0,13,0,0,0,4,13,0,0,0,0,9,14,0,0,0,0,0,14,0,0,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,0,15,0,0,0,0,9,16,0,0,0,0,0,16,0,0,16,0,0,18,0,0,0,18,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,18,0,0,0,18,18,18,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,10,0,0,0,0,9,11,0,0,0,0,0,11,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,12,0,0,0,0,9,12,0,0,0,0,0,12,0,0,12,0,0,48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70,45,43,32,32,32,48,88,48,120,0,40,110,117,108,108,41,0,45,48,88,43,48,88,32,48,88,45,48,120,43,48,120,32,48,120,0,105,110,102,0,73,78,70,0,110,97,110,0,78,65,78,0,46,0,84,33,34,25,13,1,2,3,17,75,28,12,16,4,11,29,18,30,39,104,110,111,112,113,98,32,5,6,15,19,20,21,26,8,22,7,40,36,23,24,9,10,14,27,31,37,35,131,130,125,38,42,43,60,61,62,63,67,71,74,77,88,89,90,91,92,93,94,95,96,97,99,100,101,102,103,105,106,107,108,114,115,116,121,122,123,124,0,73,108,108,101,103,97,108,32,98,121,116,101,32,115,101,113,117,101,110,99,101,0,68,111,109,97,105,110,32,101,114,114,111,114,0,82,101,115,117,108,116,32,110,111,116,32,114,101,112,114,101,115,101,110,116,97,98,108,101,0,78,111,116,32,97,32,116,116,121,0,80,101,114,109,105,115,115,105,111,110,32,100,101,110,105,101,100,0,79,112,101,114,97,116,105,111,110,32,110,111,116,32,112,101,114,109,105,116,116,101,100,0,78,111,32,115,117,99,104,32,102,105,108,101,32,111,114,32,100,105,114,101,99,116,111,114,121,0,78,111,32,115,117,99,104,32,112,114,111,99,101,115,115,0,70,105,108,101,32,101,120,105,115,116,115,0,86,97,108,117,101,32,116,111,111,32,108,97,114,103,101,32,102,111,114,32,100,97,116,97,32,116,121,112,101,0,78,111,32,115,112,97,99,101,32,108,101,102,116,32,111,110,32,100,101,118,105,99,101,0,79,117,116,32,111,102,32,109,101,109,111,114,121,0,82,101,115,111,117,114,99,101,32,98,117,115,121,0,73,110,116,101,114,114,117,112,116,101,100,32,115,121,115,116,101,109,32,99,97,108,108,0,82,101,115,111,117,114,99,101,32,116,101,109,112,111,114,97,114,105,108,121,32,117,110,97,118,97,105,108,97,98,108,101,0,73,110,118,97,108,105,100,32,115,101,101,107,0,67,114,111,115,115,45,100,101,118,105,99,101,32,108,105,110,107,0,82,101,97,100,45,111,110,108,121,32,102,105,108,101,32,115,121,115,116,101,109,0,68,105,114,101,99,116,111,114,121,32,110,111,116,32,101,109,112,116,121,0,67,111,110,110,101,99,116,105,111,110,32,114,101,115,101,116,32,98,121,32,112,101,101,114,0,79,112,101,114,97,116,105,111,110,32,116,105,109,101,100,32,111,117,116,0,67,111,110,110,101,99,116,105,111,110,32,114,101,102,117,115,101,100,0,72,111,115,116,32,105,115,32,100,111,119,110,0,72,111,115,116,32,105,115,32,117,110,114,101,97,99,104,97,98,108,101,0,65,100,100,114,101,115,115,32,105,110,32,117,115,101,0,66,114,111,107,101,110,32,112,105,112,101,0,73,47,79,32,101,114,114,111,114,0,78,111,32,115,117,99,104,32,100,101,118,105,99,101,32,111,114,32,97,100,100,114,101,115,115,0,66,108,111,99,107,32,100,101,118,105,99,101,32,114,101,113,117,105,114,101,100,0,78,111,32,115,117,99,104,32,100,101,118,105,99,101,0,78,111,116,32,97,32,100,105,114,101,99,116,111,114,121,0,73,115,32,97,32,100,105,114,101,99,116,111,114,121,0,84,101,120,116,32,102,105,108,101,32,98,117,115,121,0,69,120,101,99,32,102,111,114,109,97,116,32,101,114,114,111,114,0,73,110,118,97,108,105,100,32,97,114,103,117,109,101,110,116,0,65,114,103,117,109,101,110,116,32,108,105,115,116,32,116,111,111,32,108,111,110,103,0,83,121,109,98,111,108,105,99,32,108,105,110,107,32,108,111,111,112,0,70,105,108,101,110,97,109,101,32,116,111,111,32,108,111,110,103,0,84,111,111,32,109,97,110,121,32,111,112,101,110,32,102,105,108,101,115,32,105,110,32,115,121,115,116,101,109,0,78,111,32,102,105,108,101,32,100,101,115,99,114,105,112,116,111,114,115,32,97,118,97,105,108,97,98,108,101,0,66,97,100,32,102,105,108,101,32,100,101,115,99,114,105,112,116,111,114,0,78,111,32,99,104,105,108,100,32,112,114,111,99,101,115,115,0,66,97,100,32,97,100,100,114,101,115,115,0,70,105,108,101,32,116,111,111,32,108,97,114,103,101,0,84,111,111,32,109,97,110,121,32,108,105,110,107,115,0,78,111,32,108,111,99,107,115,32,97,118,97,105,108,97,98,108,101,0,82,101,115,111,117,114,99,101,32,100,101,97,100,108,111,99,107,32,119,111,117,108,100,32,111,99,99,117,114,0,83,116,97,116,101,32,110,111,116,32,114,101,99,111,118,101,114,97,98,108,101,0,80,114,101,118,105,111,117,115,32,111,119,110,101,114,32,100,105,101,100,0,79,112,101,114,97,116,105,111,110,32,99,97,110,99,101,108,101,100,0,70,117,110,99,116,105,111,110,32,110,111,116,32,105,109,112,108,101,109,101,110,116,101,100,0,78,111,32,109,101,115,115,97,103,101,32,111,102,32,100,101,115,105,114,101,100,32,116,121,112,101,0,73,100,101,110,116,105,102,105,101,114,32,114,101,109,111,118,101,100,0,68,101,118,105,99,101,32,110,111,116,32,97,32,115,116,114,101,97,109,0,78,111,32,100,97,116,97,32,97,118,97,105,108,97,98,108,101,0,68,101,118,105,99,101,32,116,105,109,101,111,117,116,0,79,117,116,32,111,102,32,115,116,114,101,97,109,115,32,114,101,115,111,117,114,99,101,115,0,76,105,110,107,32,104,97,115,32,98,101,101,110,32,115,101,118,101,114,101,100,0,80,114,111,116,111,99,111,108,32,101,114,114,111,114,0,66,97,100,32,109,101,115,115,97,103,101,0,70,105,108,101,32,100,101,115,99,114,105,112,116,111,114,32,105,110,32,98,97,100,32,115,116,97,116,101,0,78,111,116,32,97,32,115,111,99,107,101,116,0,68,101,115,116,105,110,97,116,105,111,110,32,97,100,100,114,101,115,115,32,114,101,113,117,105,114,101,100,0,77,101,115,115,97,103,101,32,116,111,111,32,108,97,114,103,101,0,80,114,111,116,111,99,111,108,32,119,114,111,110,103,32,116,121,112,101,32,102,111,114,32,115,111,99,107,101,116,0,80,114,111,116,111,99,111,108,32,110,111,116,32,97,118,97,105,108,97,98,108,101,0,80,114,111,116,111,99,111,108,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,83,111,99,107,101,116,32,116,121,112,101,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,78,111,116,32,115,117,112,112,111,114,116,101,100,0,80,114,111,116,111,99,111,108,32,102,97,109,105,108,121,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,65,100,100,114,101,115,115,32,102,97,109,105,108,121,32,110,111,116,32,115,117,112,112,111,114,116,101,100,32,98,121,32,112,114,111,116,111,99,111,108,0,65,100,100,114,101,115,115,32,110,111,116,32,97,118,97,105,108,97,98,108,101,0,78,101,116,119,111,114,107,32,105,115,32,100,111,119,110,0,78,101,116,119,111,114,107,32,117,110,114,101,97,99,104,97,98,108,101,0,67,111,110,110,101,99,116,105,111,110,32,114,101,115,101,116,32,98,121,32,110,101,116,119,111,114,107,0,67,111,110,110,101,99,116,105,111,110,32,97,98,111,114,116,101,100,0,78,111,32,98,117,102,102,101,114,32,115,112,97,99,101,32,97,118,97,105,108,97,98,108,101,0,83,111,99,107,101,116,32,105,115,32,99,111,110,110,101,99,116,101,100,0,83,111,99,107,101,116,32,110,111,116,32,99,111,110,110,101,99,116,101,100,0,67,97,110,110,111,116,32,115,101,110,100,32,97,102,116,101,114,32,115,111,99,107,101,116,32,115,104,117,116,100,111,119,110,0,79,112,101,114,97,116,105,111,110,32,97,108,114,101,97,100,121,32,105,110,32,112,114,111,103,114,101,115,115,0,79,112,101,114,97,116,105,111,110,32,105,110,32,112,114,111,103,114,101,115,115,0,83,116,97,108,101,32,102,105,108,101,32,104,97,110,100,108,101,0,82,101,109,111,116,101,32,73,47,79,32,101,114,114,111,114,0,81,117,111,116,97,32,101,120,99,101,101,100,101,100,0,78,111,32,109,101,100,105,117,109,32,102,111,117,110,100,0,87,114,111,110,103,32,109,101,100,105,117,109,32,116,121,112,101,0,78,111,32,101,114,114,111,114,32,105,110,102,111,114,109,97,116,105,111,110,0,0,33,34,118,101,99,116,111,114,32,108,101,110,103,116,104,95,101,114,114,111,114,34,0,47,85,115,101,114,115,47,118,107,97,122,97,107,111,118,47,65,116,108,97,115,80,114,111,106,101,99,116,115,47,118,101,45,101,110,103,105,110,101,47,119,114,97,112,112,101,114,115,47,119,101,98,47,98,117,105,108,100,47,101,109,115,100,107,95,112,111,114,116,97,98,108,101,47,101,109,115,99,114,105,112,116,101,110,47,105,110,99,111,109,105,110,103,47,115,121,115,116,101,109,47,105,110,99,108,117,100,101,47,108,105,98,99,120,120,47,118,101,99,116,111,114,0,78,83,116,51,95,95,50,49,52,95,95,115,104,97,114,101,100,95,99,111,117,110,116,69,0,78,83,116,51,95,95,50,49,57,95,95,115,104,97,114,101,100,95,119,101,97,107,95,99,111,117,110,116,69,0,33,34,98,97,115,105,99,95,115,116,114,105,110,103,32,108,101,110,103,116,104,95,101,114,114,111,114,34,0,47,85,115,101,114,115,47,118,107,97,122,97,107,111,118,47,65,116,108,97,115,80,114,111,106,101,99,116,115,47,118,101,45,101,110,103,105,110,101,47,119,114,97,112,112,101,114,115,47,119,101,98,47,98,117,105,108,100,47,101,109,115,100,107,95,112,111,114,116,97,98,108,101,47,101,109,115,99,114,105,112,116,101,110,47,105,110,99,111,109,105,110,103,47,115,121,115,116,101,109,47,105,110,99,108,117,100,101,47,108,105,98,99,120,120,47,115,116,114,105,110,103,0,95,95,116,104,114,111,119,95,108,101,110,103,116,104,95,101,114,114,111,114,0,33,34,98,97,115,105,99,95,115,116,114,105,110,103,32,111,117,116,95,111,102,95,114,97,110,103,101,34,0,95,95,116,104,114,111,119,95,111,117,116,95,111,102,95,114,97,110,103,101,0,37,100,0,116,101,114,109,105,110,97,116,105,110,103,32,119,105,116,104,32,37,115,32,101,120,99,101,112,116,105,111,110,32,111,102,32,116,121,112,101,32,37,115,58,32,37,115,0,116,101,114,109,105,110,97,116,105,110,103,32,119,105,116,104,32,37,115,32,101,120,99,101,112,116,105,111,110,32,111,102,32,116,121,112,101,32,37,115,0,116,101,114,109,105,110,97,116,105,110,103,32,119,105,116,104,32,37,115,32,102,111,114,101,105,103,110,32,101,120,99,101,112,116,105,111,110,0,116,101,114,109,105,110,97,116,105,110,103,0,117,110,99,97,117,103,104,116,0,83,116,57,101,120,99,101,112,116,105,111,110,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,54,95,95,115,104,105,109,95,116,121,112,101,95,105,110,102,111,69,0,83,116,57,116,121,112,101,95,105,110,102,111,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,48,95,95,115,105,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,55,95,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,112,116,104,114,101,97,100,95,111,110,99,101,32,102,97,105,108,117,114,101,32,105,110,32,95,95,99,120,97,95,103,101,116,95,103,108,111,98,97,108,115,95,102,97,115,116,40,41,0,99,97,110,110,111,116,32,99,114,101,97,116,101,32,112,116,104,114,101,97,100,32,107,101,121,32,102,111,114,32,95,95,99,120,97,95,103,101,116,95,103,108,111,98,97,108,115,40,41,0,99,97,110,110,111,116,32,122,101,114,111,32,111,117,116,32,116,104,114,101,97,100,32,118,97,108,117,101,32,102,111,114,32,95,95,99,120,97,95,103,101,116,95,103,108,111,98,97,108,115,40,41,0,116,101,114,109,105,110,97,116,101,95,104,97,110,100,108,101,114,32,117,110,101,120,112,101,99,116,101,100,108,121,32,114,101,116,117,114,110,101,100,0,115,116,100,58,58,98,97,100,95,97,108,108,111,99,0,83,116,57,98,97,100,95,97,108,108,111,99,0,115,116,100,58,58,101,120,99,101,112,116,105,111,110,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,57,95,95,112,111,105,110,116,101,114,95,116,121,112,101,95,105,110,102,111,69,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,55,95,95,112,98,97,115,101,95,116,121,112,101,95,105,110,102,111,69,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,51,95,95,102,117,110,100,97,109,101,110,116,97,108,95,116,121,112,101,95,105,110,102,111,69,0,118,0,68,110,0,98,0,99,0,104,0,97,0,115,0,105,0,106,0,108,0,109,0,102,0,100,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,54,95,95,101,110,117,109,95,116,121,112,101,95,105,110,102,111,69,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,49,95,95,118,109,105,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE+30720);var tempDoublePtr=STATICTOP;STATICTOP+=16;Module["_i64Subtract"]=_i64Subtract;var GL={counter:1,lastError:0,buffers:[],mappedBuffers:{},programs:[],framebuffers:[],renderbuffers:[],textures:[],uniforms:[],shaders:[],vaos:[],contexts:[],currentContext:null,offscreenCanvases:{},timerQueriesEXT:[],byteSizeByTypeRoot:5120,byteSizeByType:[1,1,2,2,4,4,4,2,3,4,8],programInfos:{},stringCache:{},tempFixedLengthArray:[],packAlignment:4,unpackAlignment:4,init:function(){GL.miniTempBuffer=new Float32Array(GL.MINI_TEMP_BUFFER_SIZE);for(var i=0;i<GL.MINI_TEMP_BUFFER_SIZE;i++){GL.miniTempBufferViews[i]=GL.miniTempBuffer.subarray(0,i+1);}for(var i=0;i<32;i++){GL.tempFixedLengthArray.push(new Array(i));}},recordError:function recordError(errorCode){if(!GL.lastError){GL.lastError=errorCode;}},getNewId:function(table){var ret=GL.counter++;for(var i=table.length;i<ret;i++){table[i]=null;}return ret;},MINI_TEMP_BUFFER_SIZE:256,miniTempBuffer:null,miniTempBufferViews:[0],getSource:function(shader,count,string,length){var source="";for(var i=0;i<count;++i){var frag;if(length){var len=HEAP32[length+i*4>>2];if(len<0){frag=Pointer_stringify(HEAP32[string+i*4>>2]);}else{frag=Pointer_stringify(HEAP32[string+i*4>>2],len);}}else{frag=Pointer_stringify(HEAP32[string+i*4>>2]);}source+=frag;}return source;},createContext:function(canvas,webGLContextAttributes){if(typeof webGLContextAttributes["majorVersion"]==="undefined"&&typeof webGLContextAttributes["minorVersion"]==="undefined"){webGLContextAttributes["majorVersion"]=1;webGLContextAttributes["minorVersion"]=0;}var ctx;var errorInfo="?";function onContextCreationError(event){errorInfo=event.statusMessage||errorInfo;}try{canvas.addEventListener("webglcontextcreationerror",onContextCreationError,false);try{if(webGLContextAttributes["majorVersion"]==1&&webGLContextAttributes["minorVersion"]==0){ctx=canvas.getContext("webgl",webGLContextAttributes)||canvas.getContext("experimental-webgl",webGLContextAttributes);}else if(webGLContextAttributes["majorVersion"]==2&&webGLContextAttributes["minorVersion"]==0){ctx=canvas.getContext("webgl2",webGLContextAttributes)||canvas.getContext("experimental-webgl2",webGLContextAttributes);}else{throw"Unsupported WebGL context version "+majorVersion+"."+minorVersion+"!";}}finally{canvas.removeEventListener("webglcontextcreationerror",onContextCreationError,false);}if(!ctx)throw":(";}catch(e){Module.print("Could not create canvas: "+[errorInfo,e,JSON.stringify(webGLContextAttributes)]);return 0;}if(!ctx)return 0;return GL.registerContext(ctx,webGLContextAttributes);},registerContext:function(ctx,webGLContextAttributes){var handle=GL.getNewId(GL.contexts);var context={handle:handle,attributes:webGLContextAttributes,version:webGLContextAttributes["majorVersion"],GLctx:ctx};if(ctx.canvas)ctx.canvas.GLctxObject=context;GL.contexts[handle]=context;if(typeof webGLContextAttributes["enableExtensionsByDefault"]==="undefined"||webGLContextAttributes["enableExtensionsByDefault"]){GL.initExtensions(context);}return handle;},makeContextCurrent:function(contextHandle){var context=GL.contexts[contextHandle];if(!context)return false;GLctx=Module.ctx=context.GLctx;GL.currentContext=context;return true;},getContext:function(contextHandle){return GL.contexts[contextHandle];},deleteContext:function(contextHandle){if(GL.currentContext===GL.contexts[contextHandle])GL.currentContext=null;if(typeof JSEvents==="object")JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);if(GL.contexts[contextHandle]&&GL.contexts[contextHandle].GLctx.canvas)GL.contexts[contextHandle].GLctx.canvas.GLctxObject=undefined;GL.contexts[contextHandle]=null;},initExtensions:function(context){if(!context)context=GL.currentContext;if(context.initExtensionsDone)return;context.initExtensionsDone=true;var GLctx=context.GLctx;context.maxVertexAttribs=GLctx.getParameter(GLctx.MAX_VERTEX_ATTRIBS);if(context.version<2){var instancedArraysExt=GLctx.getExtension("ANGLE_instanced_arrays");if(instancedArraysExt){GLctx["vertexAttribDivisor"]=function(index,divisor){instancedArraysExt["vertexAttribDivisorANGLE"](index,divisor);};GLctx["drawArraysInstanced"]=function(mode,first,count,primcount){instancedArraysExt["drawArraysInstancedANGLE"](mode,first,count,primcount);};GLctx["drawElementsInstanced"]=function(mode,count,type,indices,primcount){instancedArraysExt["drawElementsInstancedANGLE"](mode,count,type,indices,primcount);};}var vaoExt=GLctx.getExtension("OES_vertex_array_object");if(vaoExt){GLctx["createVertexArray"]=function(){return vaoExt["createVertexArrayOES"]();};GLctx["deleteVertexArray"]=function(vao){vaoExt["deleteVertexArrayOES"](vao);};GLctx["bindVertexArray"]=function(vao){vaoExt["bindVertexArrayOES"](vao);};GLctx["isVertexArray"]=function(vao){return vaoExt["isVertexArrayOES"](vao);};}var drawBuffersExt=GLctx.getExtension("WEBGL_draw_buffers");if(drawBuffersExt){GLctx["drawBuffers"]=function(n,bufs){drawBuffersExt["drawBuffersWEBGL"](n,bufs);};}}GLctx.disjointTimerQueryExt=GLctx.getExtension("EXT_disjoint_timer_query");var automaticallyEnabledExtensions=["OES_texture_float","OES_texture_half_float","OES_standard_derivatives","OES_vertex_array_object","WEBGL_compressed_texture_s3tc","WEBGL_depth_texture","OES_element_index_uint","EXT_texture_filter_anisotropic","ANGLE_instanced_arrays","OES_texture_float_linear","OES_texture_half_float_linear","WEBGL_compressed_texture_atc","WEBGL_compressed_texture_pvrtc","EXT_color_buffer_half_float","WEBGL_color_buffer_float","EXT_frag_depth","EXT_sRGB","WEBGL_draw_buffers","WEBGL_shared_resources","EXT_shader_texture_lod","EXT_color_buffer_float"];var exts=GLctx.getSupportedExtensions();if(exts&&exts.length>0){GLctx.getSupportedExtensions().forEach(function(ext){if(automaticallyEnabledExtensions.indexOf(ext)!=-1){GLctx.getExtension(ext);}});}},populateUniformTable:function(program){var p=GL.programs[program];GL.programInfos[program]={uniforms:{},maxUniformLength:0,maxAttributeLength:-1,maxUniformBlockNameLength:-1};var ptable=GL.programInfos[program];var utable=ptable.uniforms;var numUniforms=GLctx.getProgramParameter(p,GLctx.ACTIVE_UNIFORMS);for(var i=0;i<numUniforms;++i){var u=GLctx.getActiveUniform(p,i);var name=u.name;ptable.maxUniformLength=Math.max(ptable.maxUniformLength,name.length+1);if(name.indexOf("]",name.length-1)!==-1){var ls=name.lastIndexOf("[");name=name.slice(0,ls);}var loc=GLctx.getUniformLocation(p,name);if(loc!=null){var id=GL.getNewId(GL.uniforms);utable[name]=[u.size,id];GL.uniforms[id]=loc;for(var j=1;j<u.size;++j){var n=name+"["+j+"]";loc=GLctx.getUniformLocation(p,n);id=GL.getNewId(GL.uniforms);GL.uniforms[id]=loc;}}}}};function _glClearColor(x0,x1,x2,x3){GLctx["clearColor"](x0,x1,x2,x3);}Module["_i64Add"]=_i64Add;Module["_roundf"]=_roundf;function __ZSt18uncaught_exceptionv(){return!!__ZSt18uncaught_exceptionv.uncaught_exception;}var EXCEPTIONS={last:0,caught:[],infos:{},deAdjust:function(adjusted){if(!adjusted||EXCEPTIONS.infos[adjusted])return adjusted;for(var ptr in EXCEPTIONS.infos){var info=EXCEPTIONS.infos[ptr];if(info.adjusted===adjusted){return ptr;}}return adjusted;},addRef:function(ptr){if(!ptr)return;var info=EXCEPTIONS.infos[ptr];info.refcount++;},decRef:function(ptr){if(!ptr)return;var info=EXCEPTIONS.infos[ptr];assert(info.refcount>0);info.refcount--;if(info.refcount===0&&!info.rethrown){if(info.destructor){Module["dynCall_vi"](info.destructor,ptr);}delete EXCEPTIONS.infos[ptr];___cxa_free_exception(ptr);}},clearRef:function(ptr){if(!ptr)return;var info=EXCEPTIONS.infos[ptr];info.refcount=0;}};function ___resumeException(ptr){if(!EXCEPTIONS.last){EXCEPTIONS.last=ptr;}throw ptr+" - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";}function ___cxa_find_matching_catch(){var thrown=EXCEPTIONS.last;if(!thrown){return(Runtime.setTempRet0(0),0)|0;}var info=EXCEPTIONS.infos[thrown];var throwntype=info.type;if(!throwntype){return(Runtime.setTempRet0(0),thrown)|0;}var typeArray=Array.prototype.slice.call(arguments);var pointer=Module["___cxa_is_pointer_type"](throwntype);if(!___cxa_find_matching_catch.buffer)___cxa_find_matching_catch.buffer=_malloc(4);HEAP32[___cxa_find_matching_catch.buffer>>2]=thrown;thrown=___cxa_find_matching_catch.buffer;for(var i=0;i<typeArray.length;i++){if(typeArray[i]&&Module["___cxa_can_catch"](typeArray[i],throwntype,thrown)){thrown=HEAP32[thrown>>2];info.adjusted=thrown;return(Runtime.setTempRet0(typeArray[i]),thrown)|0;}}thrown=HEAP32[thrown>>2];return(Runtime.setTempRet0(throwntype),thrown)|0;}function ___cxa_throw(ptr,type,destructor){EXCEPTIONS.infos[ptr]={ptr:ptr,adjusted:ptr,type:type,destructor:destructor,refcount:0,caught:false,rethrown:false};EXCEPTIONS.last=ptr;if(!("uncaught_exception"in __ZSt18uncaught_exceptionv)){__ZSt18uncaught_exceptionv.uncaught_exception=1;}else{__ZSt18uncaught_exceptionv.uncaught_exception++;}throw ptr+" - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";}function _glUseProgram(program){GLctx.useProgram(program?GL.programs[program]:null);}function _glDisableVertexAttribArray(index){GLctx.disableVertexAttribArray(index);}function _free(){}Module["_free"]=_free;function _malloc(bytes){var ptr=Runtime.dynamicAlloc(bytes+8);return ptr+8&4294967288;}Module["_malloc"]=_malloc;function embind_init_charCodes(){var codes=new Array(256);for(var i=0;i<256;++i){codes[i]=String.fromCharCode(i);}embind_charCodes=codes;}var embind_charCodes=undefined;function readLatin1String(ptr){var ret="";var c=ptr;while(HEAPU8[c]){ret+=embind_charCodes[HEAPU8[c++]];}return ret;}var awaitingDependencies={};var registeredTypes={};var typeDependencies={};var char_0=48;var char_9=57;function makeLegalFunctionName(name){if(undefined===name){return"_unknown";}name=name.replace(/[^a-zA-Z0-9_]/g,"$");var f=name.charCodeAt(0);if(f>=char_0&&f<=char_9){return"_"+name;}else{return name;}}function createNamedFunction(name,body){name=makeLegalFunctionName(name);return new Function("body","return function "+name+"() {\n"+'    "use strict";'+"    return body.apply(this, arguments);\n"+"};\n")(body);}function extendError(baseErrorType,errorName){var errorClass=createNamedFunction(errorName,function(message){this.name=errorName;this.message=message;var stack=new Error(message).stack;if(stack!==undefined){this.stack=this.toString()+"\n"+stack.replace(/^Error(:[^\n]*)?\n/,"");}});errorClass.prototype=Object.create(baseErrorType.prototype);errorClass.prototype.constructor=errorClass;errorClass.prototype.toString=function(){if(this.message===undefined){return this.name;}else{return this.name+": "+this.message;}};return errorClass;}var BindingError=undefined;function throwBindingError(message){throw new BindingError(message);}var InternalError=undefined;function throwInternalError(message){throw new InternalError(message);}function whenDependentTypesAreResolved(myTypes,dependentTypes,getTypeConverters){myTypes.forEach(function(type){typeDependencies[type]=dependentTypes;});function onComplete(typeConverters){var myTypeConverters=getTypeConverters(typeConverters);if(myTypeConverters.length!==myTypes.length){throwInternalError("Mismatched type converter count");}for(var i=0;i<myTypes.length;++i){registerType(myTypes[i],myTypeConverters[i]);}}var typeConverters=new Array(dependentTypes.length);var unregisteredTypes=[];var registered=0;dependentTypes.forEach(function(dt,i){if(registeredTypes.hasOwnProperty(dt)){typeConverters[i]=registeredTypes[dt];}else{unregisteredTypes.push(dt);if(!awaitingDependencies.hasOwnProperty(dt)){awaitingDependencies[dt]=[];}awaitingDependencies[dt].push(function(){typeConverters[i]=registeredTypes[dt];++registered;if(registered===unregisteredTypes.length){onComplete(typeConverters);}});}});if(0===unregisteredTypes.length){onComplete(typeConverters);}}function registerType(rawType,registeredInstance,options){options=options||{};if(!("argPackAdvance"in registeredInstance)){throw new TypeError("registerType registeredInstance requires argPackAdvance");}var name=registeredInstance.name;if(!rawType){throwBindingError('type "'+name+'" must have a positive integer typeid pointer');}if(registeredTypes.hasOwnProperty(rawType)){if(options.ignoreDuplicateRegistrations){return;}else{throwBindingError("Cannot register type '"+name+"' twice");}}registeredTypes[rawType]=registeredInstance;delete typeDependencies[rawType];if(awaitingDependencies.hasOwnProperty(rawType)){var callbacks=awaitingDependencies[rawType];delete awaitingDependencies[rawType];callbacks.forEach(function(cb){cb();});}}function simpleReadValueFromPointer(pointer){return this["fromWireType"](HEAPU32[pointer>>2]);}function __embind_register_std_string(rawType,name){name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":function(value){var length=HEAPU32[value>>2];var a=new Array(length);for(var i=0;i<length;++i){a[i]=String.fromCharCode(HEAPU8[value+4+i]);}_free(value);return a.join("");},"toWireType":function(destructors,value){if(value instanceof ArrayBuffer){value=new Uint8Array(value);}function getTAElement(ta,index){return ta[index];}function getStringElement(string,index){return string.charCodeAt(index);}var getElement;if(value instanceof Uint8Array){getElement=getTAElement;}else if(value instanceof Uint8ClampedArray){getElement=getTAElement;}else if(value instanceof Int8Array){getElement=getTAElement;}else if(typeof value==="string"){getElement=getStringElement;}else{throwBindingError("Cannot pass non-string to std::string");}var length=value.length;var ptr=_malloc(4+length);HEAPU32[ptr>>2]=length;for(var i=0;i<length;++i){var charCode=getElement(value,i);if(charCode>255){_free(ptr);throwBindingError("String has UTF-16 code units that do not fit in 8 bits");}HEAPU8[ptr+4+i]=charCode;}if(destructors!==null){destructors.push(_free,ptr);}return ptr;},"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:function(ptr){_free(ptr);}});}function _glLinkProgram(program){GLctx.linkProgram(GL.programs[program]);GL.programInfos[program]=null;GL.populateUniformTable(program);}function __embind_register_std_wstring(rawType,charSize,name){name=readLatin1String(name);var getHeap,shift;if(charSize===2){getHeap=function(){return HEAPU16;};shift=1;}else if(charSize===4){getHeap=function(){return HEAPU32;};shift=2;}registerType(rawType,{name:name,"fromWireType":function(value){var HEAP=getHeap();var length=HEAPU32[value>>2];var a=new Array(length);var start=value+4>>shift;for(var i=0;i<length;++i){a[i]=String.fromCharCode(HEAP[start+i]);}_free(value);return a.join("");},"toWireType":function(destructors,value){var HEAP=getHeap();var length=value.length;var ptr=_malloc(4+length*charSize);HEAPU32[ptr>>2]=length;var start=ptr+4>>shift;for(var i=0;i<length;++i){HEAP[start+i]=value.charCodeAt(i);}if(destructors!==null){destructors.push(_free,ptr);}return ptr;},"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:function(ptr){_free(ptr);}});}function _glBindTexture(target,texture){GLctx.bindTexture(target,texture?GL.textures[texture]:null);}function _glDeleteRenderbuffers(n,renderbuffers){for(var i=0;i<n;i++){var id=HEAP32[renderbuffers+i*4>>2];var renderbuffer=GL.renderbuffers[id];if(!renderbuffer)continue;GLctx.deleteRenderbuffer(renderbuffer);renderbuffer.name=0;GL.renderbuffers[id]=null;}}function _uuid_generate(out){var uuid=null;if(ENVIRONMENT_IS_NODE){try{var rb=__webpack_require__(6).randomBytes;uuid=rb(16);}catch(e){}}else if(ENVIRONMENT_IS_WEB&&typeof window.crypto!=="undefined"&&typeof window.crypto.getRandomValues!=="undefined"){uuid=new Uint8Array(16);window.crypto.getRandomValues(uuid);}if(!uuid){uuid=new Array(16);var d=new Date().getTime();for(var i=0;i<16;i++){var r=(d+Math.random()*256)%256|0;d=d/256|0;uuid[i]=r;}}uuid[6]=uuid[6]&15|64;uuid[8]=uuid[8]&127|128;writeArrayToMemory(uuid,out);}function _uuid_unparse(uu,out,upper){var i=0;var uuid="xxxx-xx-xx-xx-xxxxxx".replace(/[x]/g,function(c){var r=upper?HEAPU8[uu+i>>0].toString(16).toUpperCase():HEAPU8[uu+i>>0].toString(16);r=r.length===1?"0"+r:r;i++;return r;});stringToUTF8(uuid,out,37);}function _uuid_unparse_lower(uu,out){_uuid_unparse(uu,out);}function _glFramebufferRenderbuffer(target,attachment,renderbuffertarget,renderbuffer){GLctx.framebufferRenderbuffer(target,attachment,renderbuffertarget,GL.renderbuffers[renderbuffer]);}function ___assert_fail(condition,filename,line,func){ABORT=true;throw"Assertion failed: "+Pointer_stringify(condition)+", at: "+[filename?Pointer_stringify(filename):"unknown filename",line,func?Pointer_stringify(func):"unknown function"]+" at "+stackTrace();}var structRegistrations={};function runDestructors(destructors){while(destructors.length){var ptr=destructors.pop();var del=destructors.pop();del(ptr);}}function __embind_finalize_value_object(structType){var reg=structRegistrations[structType];delete structRegistrations[structType];var rawConstructor=reg.rawConstructor;var rawDestructor=reg.rawDestructor;var fieldRecords=reg.fields;var fieldTypes=fieldRecords.map(function(field){return field.getterReturnType;}).concat(fieldRecords.map(function(field){return field.setterArgumentType;}));whenDependentTypesAreResolved([structType],fieldTypes,function(fieldTypes){var fields={};fieldRecords.forEach(function(field,i){var fieldName=field.fieldName;var getterReturnType=fieldTypes[i];var getter=field.getter;var getterContext=field.getterContext;var setterArgumentType=fieldTypes[i+fieldRecords.length];var setter=field.setter;var setterContext=field.setterContext;fields[fieldName]={read:function(ptr){return getterReturnType["fromWireType"](getter(getterContext,ptr));},write:function(ptr,o){var destructors=[];setter(setterContext,ptr,setterArgumentType["toWireType"](destructors,o));runDestructors(destructors);}};});return[{name:reg.name,"fromWireType":function(ptr){var rv={};for(var i in fields){rv[i]=fields[i].read(ptr);}rawDestructor(ptr);return rv;},"toWireType":function(destructors,o){for(var fieldName in fields){if(!(fieldName in o)){throw new TypeError("Missing field");}}var ptr=rawConstructor();for(fieldName in fields){fields[fieldName].write(ptr,o[fieldName]);}if(destructors!==null){destructors.push(rawDestructor,ptr);}return ptr;},"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:rawDestructor}];});}function _glDetachShader(program,shader){GLctx.detachShader(GL.programs[program],GL.shaders[shader]);}function _glClear(x0){GLctx["clear"](x0);}var _llvm_pow_f32=Math_pow;function __embind_register_void(rawType,name){name=readLatin1String(name);registerType(rawType,{isVoid:true,name:name,"argPackAdvance":0,"fromWireType":function(){return undefined;},"toWireType":function(destructors,o){return undefined;}});}function _glUniform2fv(location,count,value){var view;if(2*count<=GL.MINI_TEMP_BUFFER_SIZE){view=GL.miniTempBufferViews[2*count-1];for(var i=0;i<2*count;i+=2){view[i]=HEAPF32[value+4*i>>2];view[i+1]=HEAPF32[value+(4*i+4)>>2];}}else{view=HEAPF32.subarray(value>>2,value+count*8>>2);}GLctx.uniform2fv(GL.uniforms[location],view);}function _glEnableVertexAttribArray(index){GLctx.enableVertexAttribArray(index);}function _glBindBuffer(target,buffer){var bufferObj=buffer?GL.buffers[buffer]:null;GLctx.bindBuffer(target,bufferObj);}function _glIsEnabled(x0){return GLctx["isEnabled"](x0);}function emscriptenWebGLComputeImageSize(width,height,sizePerPixel,alignment){function roundedToNextMultipleOf(x,y){return Math.floor((x+y-1)/y)*y;}var plainRowSize=width*sizePerPixel;var alignedRowSize=roundedToNextMultipleOf(plainRowSize,alignment);return height<=0?0:(height-1)*alignedRowSize+plainRowSize;}function emscriptenWebGLGetTexPixelData(type,format,width,height,pixels,internalFormat){var sizePerPixel;var numChannels;switch(format){case 6406:case 6409:case 6402:numChannels=1;break;case 6410:numChannels=2;break;case 6407:case 35904:numChannels=3;break;case 6408:case 35906:numChannels=4;break;default:GL.recordError(1280);return null;}switch(type){case 5121:sizePerPixel=numChannels*1;break;case 5123:case 36193:sizePerPixel=numChannels*2;break;case 5125:case 5126:sizePerPixel=numChannels*4;break;case 34042:sizePerPixel=4;break;case 33635:case 32819:case 32820:sizePerPixel=2;break;default:GL.recordError(1280);return null;}var bytes=emscriptenWebGLComputeImageSize(width,height,sizePerPixel,GL.unpackAlignment);switch(type){case 5121:return HEAPU8.subarray(pixels,pixels+bytes);case 5126:return HEAPF32.subarray(pixels>>2,pixels+bytes>>2);case 5125:case 34042:return HEAPU32.subarray(pixels>>2,pixels+bytes>>2);case 5123:case 33635:case 32819:case 32820:case 36193:return HEAPU16.subarray(pixels>>1,pixels+bytes>>1);default:GL.recordError(1280);return null;}}function _glReadPixels(x,y,width,height,format,type,pixels){var pixelData=emscriptenWebGLGetTexPixelData(type,format,width,height,pixels,format);if(!pixelData){GL.recordError(1280);return;}GLctx.readPixels(x,y,width,height,format,type,pixelData);}function _glCompileShader(shader){GLctx.compileShader(GL.shaders[shader]);}var SYSCALLS={varargs:0,get:function(varargs){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret;},getStr:function(){var ret=Pointer_stringify(SYSCALLS.get());return ret;},get64:function(){var low=SYSCALLS.get(),high=SYSCALLS.get();if(low>=0)assert(high===0);else assert(high===-1);return low;},getZero:function(){assert(SYSCALLS.get()===0);}};function ___syscall54(which,varargs){SYSCALLS.varargs=varargs;try{return 0;}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno;}}function _glFramebufferTexture2D(target,attachment,textarget,texture,level){GLctx.framebufferTexture2D(target,attachment,textarget,GL.textures[texture],level);}function _glDeleteTextures(n,textures){for(var i=0;i<n;i++){var id=HEAP32[textures+i*4>>2];var texture=GL.textures[id];if(!texture)continue;GLctx.deleteTexture(texture);texture.name=0;GL.textures[id]=null;}}Module["_bitshift64Lshr"]=_bitshift64Lshr;function _glBufferData(target,size,data,usage){if(!data){GLctx.bufferData(target,size,usage);}else{GLctx.bufferData(target,HEAPU8.subarray(data,data+size),usage);}}function _glGetError(){if(GL.lastError){var error=GL.lastError;GL.lastError=0;return error;}else{return GLctx.getError();}}function _emscripten_memcpy_big(dest,src,num){HEAPU8.set(HEAPU8.subarray(src,src+num),dest);return dest;}Module["_memcpy"]=_memcpy;function _glGenFramebuffers(n,ids){for(var i=0;i<n;++i){var framebuffer=GLctx.createFramebuffer();if(!framebuffer){GL.recordError(1282);while(i<n)HEAP32[ids+i++*4>>2]=0;return;}var id=GL.getNewId(GL.framebuffers);framebuffer.name=id;GL.framebuffers[id]=framebuffer;HEAP32[ids+i*4>>2]=id;}}function getTypeName(type){var ptr=___getTypeName(type);var rv=readLatin1String(ptr);_free(ptr);return rv;}function requireRegisteredType(rawType,humanName){var impl=registeredTypes[rawType];if(undefined===impl){throwBindingError(humanName+" has unknown type "+getTypeName(rawType));}return impl;}function __embind_register_enum_value(rawEnumType,name,enumValue){var enumType=requireRegisteredType(rawEnumType,"enum");name=readLatin1String(name);var Enum=enumType.constructor;var Value=Object.create(enumType.constructor.prototype,{value:{value:enumValue},constructor:{value:createNamedFunction(enumType.name+"_"+name,function(){})}});Enum.values[enumValue]=Value;Enum[name]=Value;}function ___setErrNo(value){if(Module["___errno_location"])HEAP32[Module["___errno_location"]()>>2]=value;return value;}Module["_sbrk"]=_sbrk;Module["_memmove"]=_memmove;function _glGenTextures(n,textures){for(var i=0;i<n;i++){var texture=GLctx.createTexture();if(!texture){GL.recordError(1282);while(i<n)HEAP32[textures+i++*4>>2]=0;return;}var id=GL.getNewId(GL.textures);texture.name=id;GL.textures[id]=texture;HEAP32[textures+i*4>>2]=id;}}function ___gxx_personality_v0(){}var cttz_i8=allocate([8,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,7,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0],"i8",ALLOC_STATIC);Module["_llvm_cttz_i32"]=_llvm_cttz_i32;Module["___udivmoddi4"]=___udivmoddi4;Module["___uremdi3"]=___uremdi3;function _glUniform1f(location,v0){GLctx.uniform1f(GL.uniforms[location],v0);}Module["_llvm_bswap_i32"]=_llvm_bswap_i32;function __embind_register_memory_view(rawType,dataTypeIndex,name){var typeMapping=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array];var TA=typeMapping[dataTypeIndex];function decodeMemoryView(handle){handle=handle>>2;var heap=HEAPU32;var size=heap[handle];var data=heap[handle+1];return new TA(heap["buffer"],data,size);}name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":decodeMemoryView,"argPackAdvance":8,"readValueFromPointer":decodeMemoryView},{ignoreDuplicateRegistrations:true});}function _glDeleteBuffers(n,buffers){for(var i=0;i<n;i++){var id=HEAP32[buffers+i*4>>2];var buffer=GL.buffers[id];if(!buffer)continue;GLctx.deleteBuffer(buffer);buffer.name=0;GL.buffers[id]=null;if(id==GL.currArrayBuffer)GL.currArrayBuffer=0;if(id==GL.currElementArrayBuffer)GL.currElementArrayBuffer=0;}}function _glCreateShader(shaderType){var id=GL.getNewId(GL.shaders);GL.shaders[id]=GLctx.createShader(shaderType);return id;}function ensureOverloadTable(proto,methodName,humanName){if(undefined===proto[methodName].overloadTable){var prevFunc=proto[methodName];proto[methodName]=function(){if(!proto[methodName].overloadTable.hasOwnProperty(arguments.length)){throwBindingError("Function '"+humanName+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+proto[methodName].overloadTable+")!");}return proto[methodName].overloadTable[arguments.length].apply(this,arguments);};proto[methodName].overloadTable=[];proto[methodName].overloadTable[prevFunc.argCount]=prevFunc;}}function exposePublicSymbol(name,value,numArguments){if(Module.hasOwnProperty(name)){if(undefined===numArguments||undefined!==Module[name].overloadTable&&undefined!==Module[name].overloadTable[numArguments]){throwBindingError("Cannot register public name '"+name+"' twice");}ensureOverloadTable(Module,name,name);if(Module.hasOwnProperty(numArguments)){throwBindingError("Cannot register multiple overloads of a function with the same number of arguments ("+numArguments+")!");}Module[name].overloadTable[numArguments]=value;}else{Module[name]=value;if(undefined!==numArguments){Module[name].numArguments=numArguments;}}}function getShiftFromSize(size){switch(size){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+size);}}function enumReadValueFromPointer(name,shift,signed){switch(shift){case 0:return function(pointer){var heap=signed?HEAP8:HEAPU8;return this["fromWireType"](heap[pointer]);};case 1:return function(pointer){var heap=signed?HEAP16:HEAPU16;return this["fromWireType"](heap[pointer>>1]);};case 2:return function(pointer){var heap=signed?HEAP32:HEAPU32;return this["fromWireType"](heap[pointer>>2]);};default:throw new TypeError("Unknown integer type: "+name);}}function __embind_register_enum(rawType,name,size,isSigned){var shift=getShiftFromSize(size);name=readLatin1String(name);function ctor(){}ctor.values={};registerType(rawType,{name:name,constructor:ctor,"fromWireType":function(c){return this.constructor.values[c];},"toWireType":function(destructors,c){return c.value;},"argPackAdvance":8,"readValueFromPointer":enumReadValueFromPointer(name,shift,isSigned),destructorFunction:null});exposePublicSymbol(name,ctor);}function _glBindRenderbuffer(target,renderbuffer){GLctx.bindRenderbuffer(target,renderbuffer?GL.renderbuffers[renderbuffer]:null);}function _glGenRenderbuffers(n,renderbuffers){for(var i=0;i<n;i++){var renderbuffer=GLctx.createRenderbuffer();if(!renderbuffer){GL.recordError(1282);while(i<n)HEAP32[renderbuffers+i++*4>>2]=0;return;}var id=GL.getNewId(GL.renderbuffers);renderbuffer.name=id;GL.renderbuffers[id]=renderbuffer;HEAP32[renderbuffers+i*4>>2]=id;}}function requireFunction(signature,rawFunction){signature=readLatin1String(signature);function makeDynCaller(dynCall){var args=[];for(var i=1;i<signature.length;++i){args.push("a"+i);}var name="dynCall_"+signature+"_"+rawFunction;var body="return function "+name+"("+args.join(", ")+") {\n";body+="    return dynCall(rawFunction"+(args.length?", ":"")+args.join(", ")+");\n";body+="};\n";return new Function("dynCall","rawFunction",body)(dynCall,rawFunction);}var fp;if(Module["FUNCTION_TABLE_"+signature]!==undefined){fp=Module["FUNCTION_TABLE_"+signature][rawFunction];}else if(typeof FUNCTION_TABLE!=="undefined"){fp=FUNCTION_TABLE[rawFunction];}else{var dc=Module["asm"]["dynCall_"+signature];if(dc===undefined){dc=Module["asm"]["dynCall_"+signature.replace(/f/g,"d")];if(dc===undefined){throwBindingError("No dynCall invoker for signature: "+signature);}}fp=makeDynCaller(dc);}if(typeof fp!=="function"){throwBindingError("unknown function pointer with signature "+signature+": "+rawFunction);}return fp;}function __embind_register_value_object(rawType,name,constructorSignature,rawConstructor,destructorSignature,rawDestructor){structRegistrations[rawType]={name:readLatin1String(name),rawConstructor:requireFunction(constructorSignature,rawConstructor),rawDestructor:requireFunction(destructorSignature,rawDestructor),fields:[]};}function __embind_register_bool(rawType,name,size,trueValue,falseValue){var shift=getShiftFromSize(size);name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":function(wt){return!!wt;},"toWireType":function(destructors,o){return o?trueValue:falseValue;},"argPackAdvance":8,"readValueFromPointer":function(pointer){var heap;if(size===1){heap=HEAP8;}else if(size===2){heap=HEAP16;}else if(size===4){heap=HEAP32;}else{throw new TypeError("Unknown boolean type size: "+name);}return this["fromWireType"](heap[pointer>>shift]);},destructorFunction:null});}function _glTexSubImage2D(target,level,xoffset,yoffset,width,height,format,type,pixels){var pixelData=null;if(pixels)pixelData=emscriptenWebGLGetTexPixelData(type,format,width,height,pixels,0);GLctx.texSubImage2D(target,level,xoffset,yoffset,width,height,format,type,pixelData);}function _glTexImage2D(target,level,internalFormat,width,height,border,format,type,pixels){var pixelData=null;if(pixels)pixelData=emscriptenWebGLGetTexPixelData(type,format,width,height,pixels,internalFormat);GLctx.texImage2D(target,level,internalFormat,width,height,border,format,type,pixelData);}function _glDisable(x0){GLctx["disable"](x0);}function _glBlendFuncSeparate(x0,x1,x2,x3){GLctx["blendFuncSeparate"](x0,x1,x2,x3);}Module["_memset"]=_memset;function _glGetProgramiv(program,pname,p){if(!p){GL.recordError(1281);return;}if(program>=GL.counter){GL.recordError(1281);return;}var ptable=GL.programInfos[program];if(!ptable){GL.recordError(1282);return;}if(pname==35716){var log=GLctx.getProgramInfoLog(GL.programs[program]);if(log===null)log="(unknown error)";HEAP32[p>>2]=log.length+1;}else if(pname==35719){HEAP32[p>>2]=ptable.maxUniformLength;}else if(pname==35722){if(ptable.maxAttributeLength==-1){var program=GL.programs[program];var numAttribs=GLctx.getProgramParameter(program,GLctx.ACTIVE_ATTRIBUTES);ptable.maxAttributeLength=0;for(var i=0;i<numAttribs;++i){var activeAttrib=GLctx.getActiveAttrib(program,i);ptable.maxAttributeLength=Math.max(ptable.maxAttributeLength,activeAttrib.name.length+1);}}HEAP32[p>>2]=ptable.maxAttributeLength;}else if(pname==35381){if(ptable.maxUniformBlockNameLength==-1){var program=GL.programs[program];var numBlocks=GLctx.getProgramParameter(program,GLctx.ACTIVE_UNIFORM_BLOCKS);ptable.maxUniformBlockNameLength=0;for(var i=0;i<numBlocks;++i){var activeBlockName=GLctx.getActiveUniformBlockName(program,i);ptable.maxUniformBlockNameLength=Math.max(ptable.maxUniformBlockNameLength,activeBlockName.length+1);}}HEAP32[p>>2]=ptable.maxUniformBlockNameLength;}else{HEAP32[p>>2]=GLctx.getProgramParameter(GL.programs[program],pname);}}function _glVertexAttribPointer(index,size,type,normalized,stride,ptr){GLctx.vertexAttribPointer(index,size,type,!!normalized,stride,ptr);}function _glGetShaderInfoLog(shader,maxLength,length,infoLog){var log=GLctx.getShaderInfoLog(GL.shaders[shader]);if(log===null)log="(unknown error)";if(maxLength>0&&infoLog){var numBytesWrittenExclNull=stringToUTF8(log,infoLog,maxLength);if(length)HEAP32[length>>2]=numBytesWrittenExclNull;}else{if(length)HEAP32[length>>2]=0;}}Module["_bitshift64Shl"]=_bitshift64Shl;function _abort(){Module["abort"]();}var UnboundTypeError=undefined;function throwUnboundTypeError(message,types){var unboundTypes=[];var seen={};function visit(type){if(seen[type]){return;}if(registeredTypes[type]){return;}if(typeDependencies[type]){typeDependencies[type].forEach(visit);return;}unboundTypes.push(type);seen[type]=true;}types.forEach(visit);throw new UnboundTypeError(message+": "+unboundTypes.map(getTypeName).join([", "]));}function upcastPointer(ptr,ptrClass,desiredClass){while(ptrClass!==desiredClass){if(!ptrClass.upcast){throwBindingError("Expected null or instance of "+desiredClass.name+", got an instance of "+ptrClass.name);}ptr=ptrClass.upcast(ptr);ptrClass=ptrClass.baseClass;}return ptr;}function validateThis(this_,classType,humanName){if(!(this_ instanceof Object)){throwBindingError(humanName+' with invalid "this": '+this_);}if(!(this_ instanceof classType.registeredClass.constructor)){throwBindingError(humanName+' incompatible with "this" of type '+this_.constructor.name);}if(!this_.$$.ptr){throwBindingError("cannot call emscripten binding method "+humanName+" on deleted object");}return upcastPointer(this_.$$.ptr,this_.$$.ptrType.registeredClass,classType.registeredClass);}function __embind_register_class_property(classType,fieldName,getterReturnType,getterSignature,getter,getterContext,setterArgumentType,setterSignature,setter,setterContext){fieldName=readLatin1String(fieldName);getter=requireFunction(getterSignature,getter);whenDependentTypesAreResolved([],[classType],function(classType){classType=classType[0];var humanName=classType.name+"."+fieldName;var desc={get:function(){throwUnboundTypeError("Cannot access "+humanName+" due to unbound types",[getterReturnType,setterArgumentType]);},enumerable:true,configurable:true};if(setter){desc.set=function(){throwUnboundTypeError("Cannot access "+humanName+" due to unbound types",[getterReturnType,setterArgumentType]);};}else{desc.set=function(v){throwBindingError(humanName+" is a read-only property");};}Object.defineProperty(classType.registeredClass.instancePrototype,fieldName,desc);whenDependentTypesAreResolved([],setter?[getterReturnType,setterArgumentType]:[getterReturnType],function(types){var getterReturnType=types[0];var desc={get:function(){var ptr=validateThis(this,classType,humanName+" getter");return getterReturnType["fromWireType"](getter(getterContext,ptr));},enumerable:true};if(setter){setter=requireFunction(setterSignature,setter);var setterArgumentType=types[1];desc.set=function(v){var ptr=validateThis(this,classType,humanName+" setter");var destructors=[];setter(setterContext,ptr,setterArgumentType["toWireType"](destructors,v));runDestructors(destructors);};}Object.defineProperty(classType.registeredClass.instancePrototype,fieldName,desc);return[];});return[];});}function emscriptenWebGLGet(name_,p,type){if(!p){GL.recordError(1281);return;}var ret=undefined;switch(name_){case 36346:ret=1;break;case 36344:if(type!=="Integer"&&type!=="Integer64"){GL.recordError(1280);}return;case 36345:ret=0;break;case 34466:var formats=GLctx.getParameter(34467);ret=formats.length;break;}if(ret===undefined){var result=GLctx.getParameter(name_);switch(typeof result){case"number":ret=result;break;case"boolean":ret=result?1:0;break;case"string":GL.recordError(1280);return;case"object":if(result===null){switch(name_){case 34964:case 35725:case 34965:case 36006:case 36007:case 32873:case 34068:{ret=0;break;};default:{GL.recordError(1280);return;}}}else if(result instanceof Float32Array||result instanceof Uint32Array||result instanceof Int32Array||result instanceof Array){for(var i=0;i<result.length;++i){switch(type){case"Integer":HEAP32[p+i*4>>2]=result[i];break;case"Float":HEAPF32[p+i*4>>2]=result[i];break;case"Boolean":HEAP8[p+i>>0]=result[i]?1:0;break;default:throw"internal glGet error, bad type: "+type;}}return;}else if(result instanceof WebGLBuffer||result instanceof WebGLProgram||result instanceof WebGLFramebuffer||result instanceof WebGLRenderbuffer||result instanceof WebGLTexture){ret=result.name|0;}else{GL.recordError(1280);return;}break;default:GL.recordError(1280);return;}}switch(type){case"Integer64":tempI64=[ret>>>0,(tempDouble=ret,+Math_abs(tempDouble)>=+1?tempDouble>+0?(Math_min(+Math_floor(tempDouble/+4294967296),+4294967295)|0)>>>0:~~+Math_ceil((tempDouble-+(~~tempDouble>>>0))/+4294967296)>>>0:0)],HEAP32[p>>2]=tempI64[0],HEAP32[p+4>>2]=tempI64[1];break;case"Integer":HEAP32[p>>2]=ret;break;case"Float":HEAPF32[p>>2]=ret;break;case"Boolean":HEAP8[p>>0]=ret?1:0;break;default:throw"internal glGet error, bad type: "+type;}}function _glGetIntegerv(name_,p){emscriptenWebGLGet(name_,p,"Integer");}function _glGetUniformLocation(program,name){name=Pointer_stringify(name);var arrayOffset=0;if(name.indexOf("]",name.length-1)!==-1){var ls=name.lastIndexOf("[");var arrayIndex=name.slice(ls+1,-1);if(arrayIndex.length>0){arrayOffset=parseInt(arrayIndex);if(arrayOffset<0){return-1;}}name=name.slice(0,ls);}var ptable=GL.programInfos[program];if(!ptable){return-1;}var utable=ptable.uniforms;var uniformInfo=utable[name];if(uniformInfo&&arrayOffset<uniformInfo[0]){return uniformInfo[1]+arrayOffset;}else{return-1;}}function __embind_register_value_object_field(structType,fieldName,getterReturnType,getterSignature,getter,getterContext,setterArgumentType,setterSignature,setter,setterContext){structRegistrations[structType].fields.push({fieldName:readLatin1String(fieldName),getterReturnType:getterReturnType,getter:requireFunction(getterSignature,getter),getterContext:getterContext,setterArgumentType:setterArgumentType,setter:requireFunction(setterSignature,setter),setterContext:setterContext});}function ClassHandle_isAliasOf(other){if(!(this instanceof ClassHandle)){return false;}if(!(other instanceof ClassHandle)){return false;}var leftClass=this.$$.ptrType.registeredClass;var left=this.$$.ptr;var rightClass=other.$$.ptrType.registeredClass;var right=other.$$.ptr;while(leftClass.baseClass){left=leftClass.upcast(left);leftClass=leftClass.baseClass;}while(rightClass.baseClass){right=rightClass.upcast(right);rightClass=rightClass.baseClass;}return leftClass===rightClass&&left===right;}function shallowCopyInternalPointer(o){return{count:o.count,deleteScheduled:o.deleteScheduled,preservePointerOnDelete:o.preservePointerOnDelete,ptr:o.ptr,ptrType:o.ptrType,smartPtr:o.smartPtr,smartPtrType:o.smartPtrType};}function throwInstanceAlreadyDeleted(obj){function getInstanceTypeName(handle){return handle.$$.ptrType.registeredClass.name;}throwBindingError(getInstanceTypeName(obj)+" instance already deleted");}function ClassHandle_clone(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this);}if(this.$$.preservePointerOnDelete){this.$$.count.value+=1;return this;}else{var clone=Object.create(Object.getPrototypeOf(this),{$$:{value:shallowCopyInternalPointer(this.$$)}});clone.$$.count.value+=1;clone.$$.deleteScheduled=false;return clone;}}function runDestructor(handle){var $$=handle.$$;if($$.smartPtr){$$.smartPtrType.rawDestructor($$.smartPtr);}else{$$.ptrType.registeredClass.rawDestructor($$.ptr);}}function ClassHandle_delete(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this);}if(this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete){throwBindingError("Object already scheduled for deletion");}this.$$.count.value-=1;var toDelete=0===this.$$.count.value;if(toDelete){runDestructor(this);}if(!this.$$.preservePointerOnDelete){this.$$.smartPtr=undefined;this.$$.ptr=undefined;}}function ClassHandle_isDeleted(){return!this.$$.ptr;}var delayFunction=undefined;var deletionQueue=[];function flushPendingDeletes(){while(deletionQueue.length){var obj=deletionQueue.pop();obj.$$.deleteScheduled=false;obj["delete"]();}}function ClassHandle_deleteLater(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this);}if(this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete){throwBindingError("Object already scheduled for deletion");}deletionQueue.push(this);if(deletionQueue.length===1&&delayFunction){delayFunction(flushPendingDeletes);}this.$$.deleteScheduled=true;return this;}function init_ClassHandle(){ClassHandle.prototype["isAliasOf"]=ClassHandle_isAliasOf;ClassHandle.prototype["clone"]=ClassHandle_clone;ClassHandle.prototype["delete"]=ClassHandle_delete;ClassHandle.prototype["isDeleted"]=ClassHandle_isDeleted;ClassHandle.prototype["deleteLater"]=ClassHandle_deleteLater;}function ClassHandle(){}var registeredPointers={};function RegisteredClass(name,constructor,instancePrototype,rawDestructor,baseClass,getActualType,upcast,downcast){this.name=name;this.constructor=constructor;this.instancePrototype=instancePrototype;this.rawDestructor=rawDestructor;this.baseClass=baseClass;this.getActualType=getActualType;this.upcast=upcast;this.downcast=downcast;this.pureVirtualFunctions=[];}function constNoSmartPtrRawPointerToWireType(destructors,handle){if(handle===null){if(this.isReference){throwBindingError("null is not a valid "+this.name);}return 0;}if(!handle.$$){throwBindingError('Cannot pass "'+_embind_repr(handle)+'" as a '+this.name);}if(!handle.$$.ptr){throwBindingError("Cannot pass deleted object as a pointer of type "+this.name);}var handleClass=handle.$$.ptrType.registeredClass;var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);return ptr;}function genericPointerToWireType(destructors,handle){if(handle===null){if(this.isReference){throwBindingError("null is not a valid "+this.name);}if(this.isSmartPointer){var ptr=this.rawConstructor();if(destructors!==null){destructors.push(this.rawDestructor,ptr);}return ptr;}else{return 0;}}if(!handle.$$){throwBindingError('Cannot pass "'+_embind_repr(handle)+'" as a '+this.name);}if(!handle.$$.ptr){throwBindingError("Cannot pass deleted object as a pointer of type "+this.name);}if(!this.isConst&&handle.$$.ptrType.isConst){throwBindingError("Cannot convert argument of type "+(handle.$$.smartPtrType?handle.$$.smartPtrType.name:handle.$$.ptrType.name)+" to parameter type "+this.name);}var handleClass=handle.$$.ptrType.registeredClass;var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);if(this.isSmartPointer){if(undefined===handle.$$.smartPtr){throwBindingError("Passing raw pointer to smart pointer is illegal");}switch(this.sharingPolicy){case 0:if(handle.$$.smartPtrType===this){ptr=handle.$$.smartPtr;}else{throwBindingError("Cannot convert argument of type "+(handle.$$.smartPtrType?handle.$$.smartPtrType.name:handle.$$.ptrType.name)+" to parameter type "+this.name);}break;case 1:ptr=handle.$$.smartPtr;break;case 2:if(handle.$$.smartPtrType===this){ptr=handle.$$.smartPtr;}else{var clonedHandle=handle["clone"]();ptr=this.rawShare(ptr,__emval_register(function(){clonedHandle["delete"]();}));if(destructors!==null){destructors.push(this.rawDestructor,ptr);}}break;default:throwBindingError("Unsupporting sharing policy");}}return ptr;}function nonConstNoSmartPtrRawPointerToWireType(destructors,handle){if(handle===null){if(this.isReference){throwBindingError("null is not a valid "+this.name);}return 0;}if(!handle.$$){throwBindingError('Cannot pass "'+_embind_repr(handle)+'" as a '+this.name);}if(!handle.$$.ptr){throwBindingError("Cannot pass deleted object as a pointer of type "+this.name);}if(handle.$$.ptrType.isConst){throwBindingError("Cannot convert argument of type "+handle.$$.ptrType.name+" to parameter type "+this.name);}var handleClass=handle.$$.ptrType.registeredClass;var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);return ptr;}function RegisteredPointer_getPointee(ptr){if(this.rawGetPointee){ptr=this.rawGetPointee(ptr);}return ptr;}function RegisteredPointer_destructor(ptr){if(this.rawDestructor){this.rawDestructor(ptr);}}function RegisteredPointer_deleteObject(handle){if(handle!==null){handle["delete"]();}}function downcastPointer(ptr,ptrClass,desiredClass){if(ptrClass===desiredClass){return ptr;}if(undefined===desiredClass.baseClass){return null;}var rv=downcastPointer(ptr,ptrClass,desiredClass.baseClass);if(rv===null){return null;}return desiredClass.downcast(rv);}function getInheritedInstanceCount(){return Object.keys(registeredInstances).length;}function getLiveInheritedInstances(){var rv=[];for(var k in registeredInstances){if(registeredInstances.hasOwnProperty(k)){rv.push(registeredInstances[k]);}}return rv;}function setDelayFunction(fn){delayFunction=fn;if(deletionQueue.length&&delayFunction){delayFunction(flushPendingDeletes);}}function init_embind(){Module["getInheritedInstanceCount"]=getInheritedInstanceCount;Module["getLiveInheritedInstances"]=getLiveInheritedInstances;Module["flushPendingDeletes"]=flushPendingDeletes;Module["setDelayFunction"]=setDelayFunction;}var registeredInstances={};function getBasestPointer(class_,ptr){if(ptr===undefined){throwBindingError("ptr should not be undefined");}while(class_.baseClass){ptr=class_.upcast(ptr);class_=class_.baseClass;}return ptr;}function getInheritedInstance(class_,ptr){ptr=getBasestPointer(class_,ptr);return registeredInstances[ptr];}function makeClassHandle(prototype,record){if(!record.ptrType||!record.ptr){throwInternalError("makeClassHandle requires ptr and ptrType");}var hasSmartPtrType=!!record.smartPtrType;var hasSmartPtr=!!record.smartPtr;if(hasSmartPtrType!==hasSmartPtr){throwInternalError("Both smartPtrType and smartPtr must be specified");}record.count={value:1};return Object.create(prototype,{$$:{value:record}});}function RegisteredPointer_fromWireType(ptr){var rawPointer=this.getPointee(ptr);if(!rawPointer){this.destructor(ptr);return null;}var registeredInstance=getInheritedInstance(this.registeredClass,rawPointer);if(undefined!==registeredInstance){if(0===registeredInstance.$$.count.value){registeredInstance.$$.ptr=rawPointer;registeredInstance.$$.smartPtr=ptr;return registeredInstance["clone"]();}else{var rv=registeredInstance["clone"]();this.destructor(ptr);return rv;}}function makeDefaultHandle(){if(this.isSmartPointer){return makeClassHandle(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:rawPointer,smartPtrType:this,smartPtr:ptr});}else{return makeClassHandle(this.registeredClass.instancePrototype,{ptrType:this,ptr:ptr});}}var actualType=this.registeredClass.getActualType(rawPointer);var registeredPointerRecord=registeredPointers[actualType];if(!registeredPointerRecord){return makeDefaultHandle.call(this);}var toType;if(this.isConst){toType=registeredPointerRecord.constPointerType;}else{toType=registeredPointerRecord.pointerType;}var dp=downcastPointer(rawPointer,this.registeredClass,toType.registeredClass);if(dp===null){return makeDefaultHandle.call(this);}if(this.isSmartPointer){return makeClassHandle(toType.registeredClass.instancePrototype,{ptrType:toType,ptr:dp,smartPtrType:this,smartPtr:ptr});}else{return makeClassHandle(toType.registeredClass.instancePrototype,{ptrType:toType,ptr:dp});}}function init_RegisteredPointer(){RegisteredPointer.prototype.getPointee=RegisteredPointer_getPointee;RegisteredPointer.prototype.destructor=RegisteredPointer_destructor;RegisteredPointer.prototype["argPackAdvance"]=8;RegisteredPointer.prototype["readValueFromPointer"]=simpleReadValueFromPointer;RegisteredPointer.prototype["deleteObject"]=RegisteredPointer_deleteObject;RegisteredPointer.prototype["fromWireType"]=RegisteredPointer_fromWireType;}function RegisteredPointer(name,registeredClass,isReference,isConst,isSmartPointer,pointeeType,sharingPolicy,rawGetPointee,rawConstructor,rawShare,rawDestructor){this.name=name;this.registeredClass=registeredClass;this.isReference=isReference;this.isConst=isConst;this.isSmartPointer=isSmartPointer;this.pointeeType=pointeeType;this.sharingPolicy=sharingPolicy;this.rawGetPointee=rawGetPointee;this.rawConstructor=rawConstructor;this.rawShare=rawShare;this.rawDestructor=rawDestructor;if(!isSmartPointer&&registeredClass.baseClass===undefined){if(isConst){this["toWireType"]=constNoSmartPtrRawPointerToWireType;this.destructorFunction=null;}else{this["toWireType"]=nonConstNoSmartPtrRawPointerToWireType;this.destructorFunction=null;}}else{this["toWireType"]=genericPointerToWireType;}}function replacePublicSymbol(name,value,numArguments){if(!Module.hasOwnProperty(name)){throwInternalError("Replacing nonexistant public symbol");}if(undefined!==Module[name].overloadTable&&undefined!==numArguments){Module[name].overloadTable[numArguments]=value;}else{Module[name]=value;Module[name].argCount=numArguments;}}function __embind_register_class(rawType,rawPointerType,rawConstPointerType,baseClassRawType,getActualTypeSignature,getActualType,upcastSignature,upcast,downcastSignature,downcast,name,destructorSignature,rawDestructor){name=readLatin1String(name);getActualType=requireFunction(getActualTypeSignature,getActualType);if(upcast){upcast=requireFunction(upcastSignature,upcast);}if(downcast){downcast=requireFunction(downcastSignature,downcast);}rawDestructor=requireFunction(destructorSignature,rawDestructor);var legalFunctionName=makeLegalFunctionName(name);exposePublicSymbol(legalFunctionName,function(){throwUnboundTypeError("Cannot construct "+name+" due to unbound types",[baseClassRawType]);});whenDependentTypesAreResolved([rawType,rawPointerType,rawConstPointerType],baseClassRawType?[baseClassRawType]:[],function(base){base=base[0];var baseClass;var basePrototype;if(baseClassRawType){baseClass=base.registeredClass;basePrototype=baseClass.instancePrototype;}else{basePrototype=ClassHandle.prototype;}var constructor=createNamedFunction(legalFunctionName,function(){if(Object.getPrototypeOf(this)!==instancePrototype){throw new BindingError("Use 'new' to construct "+name);}if(undefined===registeredClass.constructor_body){throw new BindingError(name+" has no accessible constructor");}var body=registeredClass.constructor_body[arguments.length];if(undefined===body){throw new BindingError("Tried to invoke ctor of "+name+" with invalid number of parameters ("+arguments.length+") - expected ("+Object.keys(registeredClass.constructor_body).toString()+") parameters instead!");}return body.apply(this,arguments);});var instancePrototype=Object.create(basePrototype,{constructor:{value:constructor}});constructor.prototype=instancePrototype;var registeredClass=new RegisteredClass(name,constructor,instancePrototype,rawDestructor,baseClass,getActualType,upcast,downcast);var referenceConverter=new RegisteredPointer(name,registeredClass,true,false,false);var pointerConverter=new RegisteredPointer(name+"*",registeredClass,false,false,false);var constPointerConverter=new RegisteredPointer(name+" const*",registeredClass,false,true,false);registeredPointers[rawType]={pointerType:pointerConverter,constPointerType:constPointerConverter};replacePublicSymbol(legalFunctionName,constructor);return[referenceConverter,pointerConverter,constPointerConverter];});}function _glBindFramebuffer(target,framebuffer){GLctx.bindFramebuffer(target,framebuffer?GL.framebuffers[framebuffer]:null);}function ___lock(){}function ___unlock(){}var PTHREAD_SPECIFIC={};function _pthread_getspecific(key){return PTHREAD_SPECIFIC[key]||0;}function _glEnable(x0){GLctx["enable"](x0);}function _glUniform4fv(location,count,value){var view;if(4*count<=GL.MINI_TEMP_BUFFER_SIZE){view=GL.miniTempBufferViews[4*count-1];for(var i=0;i<4*count;i+=4){view[i]=HEAPF32[value+4*i>>2];view[i+1]=HEAPF32[value+(4*i+4)>>2];view[i+2]=HEAPF32[value+(4*i+8)>>2];view[i+3]=HEAPF32[value+(4*i+12)>>2];}}else{view=HEAPF32.subarray(value>>2,value+count*16>>2);}GLctx.uniform4fv(GL.uniforms[location],view);}function _glDeleteFramebuffers(n,framebuffers){for(var i=0;i<n;++i){var id=HEAP32[framebuffers+i*4>>2];var framebuffer=GL.framebuffers[id];if(!framebuffer)continue;GLctx.deleteFramebuffer(framebuffer);framebuffer.name=0;GL.framebuffers[id]=null;}}function _embind_repr(v){if(v===null){return"null";}var t=typeof v;if(t==="object"||t==="array"||t==="function"){return v.toString();}else{return""+v;}}function integerReadValueFromPointer(name,shift,signed){switch(shift){case 0:return signed?function readS8FromPointer(pointer){return HEAP8[pointer];}:function readU8FromPointer(pointer){return HEAPU8[pointer];};case 1:return signed?function readS16FromPointer(pointer){return HEAP16[pointer>>1];}:function readU16FromPointer(pointer){return HEAPU16[pointer>>1];};case 2:return signed?function readS32FromPointer(pointer){return HEAP32[pointer>>2];}:function readU32FromPointer(pointer){return HEAPU32[pointer>>2];};default:throw new TypeError("Unknown integer type: "+name);}}function __embind_register_integer(primitiveType,name,size,minRange,maxRange){name=readLatin1String(name);if(maxRange===-1){maxRange=4294967295;}var shift=getShiftFromSize(size);var fromWireType=function(value){return value;};if(minRange===0){var bitshift=32-8*size;fromWireType=function(value){return value<<bitshift>>>bitshift;};}registerType(primitiveType,{name:name,"fromWireType":fromWireType,"toWireType":function(destructors,value){if(typeof value!=="number"&&typeof value!=="boolean"){throw new TypeError('Cannot convert "'+_embind_repr(value)+'" to '+this.name);}if(value<minRange||value>maxRange){throw new TypeError('Passing a number "'+_embind_repr(value)+'" from JS side to C/C++ side to an argument of type "'+name+'", which is outside the valid range ['+minRange+", "+maxRange+"]!");}return value|0;},"argPackAdvance":8,"readValueFromPointer":integerReadValueFromPointer(name,shift,minRange!==0),destructorFunction:null});}function _glGenBuffers(n,buffers){for(var i=0;i<n;i++){var buffer=GLctx.createBuffer();if(!buffer){GL.recordError(1282);while(i<n)HEAP32[buffers+i++*4>>2]=0;return;}var id=GL.getNewId(GL.buffers);buffer.name=id;GL.buffers[id]=buffer;HEAP32[buffers+i*4>>2]=id;}}function _glDeleteProgram(id){if(!id)return;var program=GL.programs[id];if(!program){GL.recordError(1281);return;}GLctx.deleteProgram(program);program.name=0;GL.programs[id]=null;GL.programInfos[id]=null;}var emval_free_list=[];var emval_handle_array=[{},{value:undefined},{value:null},{value:true},{value:false}];function __emval_decref(handle){if(handle>4&&0===--emval_handle_array[handle].refcount){emval_handle_array[handle]=undefined;emval_free_list.push(handle);}}function count_emval_handles(){var count=0;for(var i=5;i<emval_handle_array.length;++i){if(emval_handle_array[i]!==undefined){++count;}}return count;}function get_first_emval(){for(var i=5;i<emval_handle_array.length;++i){if(emval_handle_array[i]!==undefined){return emval_handle_array[i];}}return null;}function init_emval(){Module["count_emval_handles"]=count_emval_handles;Module["get_first_emval"]=get_first_emval;}function __emval_register(value){switch(value){case undefined:{return 1;};case null:{return 2;};case true:{return 3;};case false:{return 4;};default:{var handle=emval_free_list.length?emval_free_list.pop():emval_handle_array.length;emval_handle_array[handle]={refcount:1,value:value};return handle;}}}function __embind_register_emval(rawType,name){name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":function(handle){var rv=emval_handle_array[handle].value;__emval_decref(handle);return rv;},"toWireType":function(destructors,value){return __emval_register(value);},"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:null});}function _glGetAttribLocation(program,name){program=GL.programs[program];name=Pointer_stringify(name);return GLctx.getAttribLocation(program,name);}var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};function _pthread_setspecific(key,value){if(!(key in PTHREAD_SPECIFIC)){return ERRNO_CODES.EINVAL;}PTHREAD_SPECIFIC[key]=value;return 0;}function _glRenderbufferStorage(x0,x1,x2,x3){GLctx["renderbufferStorage"](x0,x1,x2,x3);}function _glAttachShader(program,shader){GLctx.attachShader(GL.programs[program],GL.shaders[shader]);}function ___cxa_allocate_exception(size){return _malloc(size);}function _glDeleteShader(id){if(!id)return;var shader=GL.shaders[id];if(!shader){GL.recordError(1281);return;}GLctx.deleteShader(shader);GL.shaders[id]=null;}function _glViewport(x0,x1,x2,x3){GLctx["viewport"](x0,x1,x2,x3);}function _glCreateProgram(){var id=GL.getNewId(GL.programs);var program=GLctx.createProgram();program.name=id;GL.programs[id]=program;return id;}function ___cxa_pure_virtual(){ABORT=true;throw"Pure virtual function called!";}function _glPixelStorei(pname,param){if(pname==3333){GL.packAlignment=param;}else if(pname==3317){GL.unpackAlignment=param;}GLctx.pixelStorei(pname,param);}function _glCheckFramebufferStatus(x0){return GLctx["checkFramebufferStatus"](x0);}function floatReadValueFromPointer(name,shift){switch(shift){case 2:return function(pointer){return this["fromWireType"](HEAPF32[pointer>>2]);};case 3:return function(pointer){return this["fromWireType"](HEAPF64[pointer>>3]);};default:throw new TypeError("Unknown float type: "+name);}}function __embind_register_float(rawType,name,size){var shift=getShiftFromSize(size);name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":function(value){return value;},"toWireType":function(destructors,value){if(typeof value!=="number"&&typeof value!=="boolean"){throw new TypeError('Cannot convert "'+_embind_repr(value)+'" to '+this.name);}return value;},"argPackAdvance":8,"readValueFromPointer":floatReadValueFromPointer(name,shift),destructorFunction:null});}function _glDrawElements(mode,count,type,indices){GLctx.drawElements(mode,count,type,indices);}function ___cxa_begin_catch(ptr){var info=EXCEPTIONS.infos[ptr];if(info&&!info.caught){info.caught=true;__ZSt18uncaught_exceptionv.uncaught_exception--;}if(info)info.rethrown=false;EXCEPTIONS.caught.push(ptr);EXCEPTIONS.addRef(EXCEPTIONS.deAdjust(ptr));return ptr;}function _glShaderSource(shader,count,string,length){var source=GL.getSource(shader,count,string,length);GLctx.shaderSource(GL.shaders[shader],source);}function _glUniformMatrix4fv(location,count,transpose,value){var view;if(16*count<=GL.MINI_TEMP_BUFFER_SIZE){view=GL.miniTempBufferViews[16*count-1];for(var i=0;i<16*count;i+=16){view[i]=HEAPF32[value+4*i>>2];view[i+1]=HEAPF32[value+(4*i+4)>>2];view[i+2]=HEAPF32[value+(4*i+8)>>2];view[i+3]=HEAPF32[value+(4*i+12)>>2];view[i+4]=HEAPF32[value+(4*i+16)>>2];view[i+5]=HEAPF32[value+(4*i+20)>>2];view[i+6]=HEAPF32[value+(4*i+24)>>2];view[i+7]=HEAPF32[value+(4*i+28)>>2];view[i+8]=HEAPF32[value+(4*i+32)>>2];view[i+9]=HEAPF32[value+(4*i+36)>>2];view[i+10]=HEAPF32[value+(4*i+40)>>2];view[i+11]=HEAPF32[value+(4*i+44)>>2];view[i+12]=HEAPF32[value+(4*i+48)>>2];view[i+13]=HEAPF32[value+(4*i+52)>>2];view[i+14]=HEAPF32[value+(4*i+56)>>2];view[i+15]=HEAPF32[value+(4*i+60)>>2];}}else{view=HEAPF32.subarray(value>>2,value+count*64>>2);}GLctx.uniformMatrix4fv(GL.uniforms[location],!!transpose,view);}function ___syscall6(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD();FS.close(stream);return 0;}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno;}}Module["___udivdi3"]=___udivdi3;function _glGetProgramInfoLog(program,maxLength,length,infoLog){var log=GLctx.getProgramInfoLog(GL.programs[program]);if(log===null)log="(unknown error)";if(maxLength>0&&infoLog){var numBytesWrittenExclNull=stringToUTF8(log,infoLog,maxLength);if(length)HEAP32[length>>2]=numBytesWrittenExclNull;}else{if(length)HEAP32[length>>2]=0;}}function _glTexParameteri(x0,x1,x2){GLctx["texParameteri"](x0,x1,x2);}function _pthread_once(ptr,func){if(!_pthread_once.seen)_pthread_once.seen={};if(ptr in _pthread_once.seen)return;Module["dynCall_v"](func);_pthread_once.seen[ptr]=1;}function heap32VectorToArray(count,firstElement){var array=[];for(var i=0;i<count;i++){array.push(HEAP32[(firstElement>>2)+i]);}return array;}function __embind_register_class_constructor(rawClassType,argCount,rawArgTypesAddr,invokerSignature,invoker,rawConstructor){var rawArgTypes=heap32VectorToArray(argCount,rawArgTypesAddr);invoker=requireFunction(invokerSignature,invoker);whenDependentTypesAreResolved([],[rawClassType],function(classType){classType=classType[0];var humanName="constructor "+classType.name;if(undefined===classType.registeredClass.constructor_body){classType.registeredClass.constructor_body=[];}if(undefined!==classType.registeredClass.constructor_body[argCount-1]){throw new BindingError("Cannot register multiple constructors with identical number of parameters ("+(argCount-1)+") for class '"+classType.name+"'! Overload resolution is currently only performed using the parameter count, not actual type info!");}classType.registeredClass.constructor_body[argCount-1]=function unboundTypeHandler(){throwUnboundTypeError("Cannot construct "+classType.name+" due to unbound types",rawArgTypes);};whenDependentTypesAreResolved([],rawArgTypes,function(argTypes){classType.registeredClass.constructor_body[argCount-1]=function constructor_body(){if(arguments.length!==argCount-1){throwBindingError(humanName+" called with "+arguments.length+" arguments, expected "+(argCount-1));}var destructors=[];var args=new Array(argCount);args[0]=rawConstructor;for(var i=1;i<argCount;++i){args[i]=argTypes[i]["toWireType"](destructors,arguments[i-1]);}var ptr=invoker.apply(null,args);runDestructors(destructors);return argTypes[0]["fromWireType"](ptr);};return[];});return[];});}var PTHREAD_SPECIFIC_NEXT_KEY=1;function _pthread_key_create(key,destructor){if(key==0){return ERRNO_CODES.EINVAL;}HEAP32[key>>2]=PTHREAD_SPECIFIC_NEXT_KEY;PTHREAD_SPECIFIC[PTHREAD_SPECIFIC_NEXT_KEY]=0;PTHREAD_SPECIFIC_NEXT_KEY++;return 0;}function _glGetShaderiv(shader,pname,p){if(!p){GL.recordError(1281);return;}if(pname==35716){var log=GLctx.getShaderInfoLog(GL.shaders[shader]);if(log===null)log="(unknown error)";HEAP32[p>>2]=log.length+1;}else{HEAP32[p>>2]=GLctx.getShaderParameter(GL.shaders[shader],pname);}}function ___syscall140(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD(),offset_high=SYSCALLS.get(),offset_low=SYSCALLS.get(),result=SYSCALLS.get(),whence=SYSCALLS.get();var offset=offset_low;assert(offset_high===0);FS.llseek(stream,offset,whence);HEAP32[result>>2]=stream.position;if(stream.getdents&&offset===0&&whence===0)stream.getdents=null;return 0;}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno;}}function ___syscall146(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.get(),iov=SYSCALLS.get(),iovcnt=SYSCALLS.get();var ret=0;if(!___syscall146.buffer){___syscall146.buffers=[null,[],[]];___syscall146.printChar=function(stream,curr){var buffer=___syscall146.buffers[stream];assert(buffer);if(curr===0||curr===10){(stream===1?Module["print"]:Module["printErr"])(UTF8ArrayToString(buffer,0));buffer.length=0;}else{buffer.push(curr);}};}for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov+i*8>>2];var len=HEAP32[iov+(i*8+4)>>2];for(var j=0;j<len;j++){___syscall146.printChar(stream,HEAPU8[ptr+j]);}ret+=len;}return ret;}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno;}}function new_(constructor,argumentList){if(!(constructor instanceof Function)){throw new TypeError("new_ called with constructor type "+typeof constructor+" which is not a function");}var dummy=createNamedFunction(constructor.name||"unknownFunctionName",function(){});dummy.prototype=constructor.prototype;var obj=new dummy();var r=constructor.apply(obj,argumentList);return r instanceof Object?r:obj;}function craftInvokerFunction(humanName,argTypes,classType,cppInvokerFunc,cppTargetFunc){var argCount=argTypes.length;if(argCount<2){throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");}var isClassMethodFunc=argTypes[1]!==null&&classType!==null;var argsList="";var argsListWired="";for(var i=0;i<argCount-2;++i){argsList+=(i!==0?", ":"")+"arg"+i;argsListWired+=(i!==0?", ":"")+"arg"+i+"Wired";}var invokerFnBody="return function "+makeLegalFunctionName(humanName)+"("+argsList+") {\n"+"if (arguments.length !== "+(argCount-2)+") {\n"+"throwBindingError('function "+humanName+" called with ' + arguments.length + ' arguments, expected "+(argCount-2)+" args!');\n"+"}\n";var needsDestructorStack=false;for(var i=1;i<argTypes.length;++i){if(argTypes[i]!==null&&argTypes[i].destructorFunction===undefined){needsDestructorStack=true;break;}}if(needsDestructorStack){invokerFnBody+="var destructors = [];\n";}var dtorStack=needsDestructorStack?"destructors":"null";var args1=["throwBindingError","invoker","fn","runDestructors","retType","classParam"];var args2=[throwBindingError,cppInvokerFunc,cppTargetFunc,runDestructors,argTypes[0],argTypes[1]];if(isClassMethodFunc){invokerFnBody+="var thisWired = classParam.toWireType("+dtorStack+", this);\n";}for(var i=0;i<argCount-2;++i){invokerFnBody+="var arg"+i+"Wired = argType"+i+".toWireType("+dtorStack+", arg"+i+"); // "+argTypes[i+2].name+"\n";args1.push("argType"+i);args2.push(argTypes[i+2]);}if(isClassMethodFunc){argsListWired="thisWired"+(argsListWired.length>0?", ":"")+argsListWired;}var returns=argTypes[0].name!=="void";invokerFnBody+=(returns?"var rv = ":"")+"invoker(fn"+(argsListWired.length>0?", ":"")+argsListWired+");\n";if(needsDestructorStack){invokerFnBody+="runDestructors(destructors);\n";}else{for(var i=isClassMethodFunc?1:2;i<argTypes.length;++i){var paramName=i===1?"thisWired":"arg"+(i-2)+"Wired";if(argTypes[i].destructorFunction!==null){invokerFnBody+=paramName+"_dtor("+paramName+"); // "+argTypes[i].name+"\n";args1.push(paramName+"_dtor");args2.push(argTypes[i].destructorFunction);}}}if(returns){invokerFnBody+="var ret = retType.fromWireType(rv);\n"+"return ret;\n";}else{}invokerFnBody+="}\n";args1.push(invokerFnBody);var invokerFunction=new_(Function,args1).apply(null,args2);return invokerFunction;}function __embind_register_class_function(rawClassType,methodName,argCount,rawArgTypesAddr,invokerSignature,rawInvoker,context,isPureVirtual){var rawArgTypes=heap32VectorToArray(argCount,rawArgTypesAddr);methodName=readLatin1String(methodName);rawInvoker=requireFunction(invokerSignature,rawInvoker);whenDependentTypesAreResolved([],[rawClassType],function(classType){classType=classType[0];var humanName=classType.name+"."+methodName;if(isPureVirtual){classType.registeredClass.pureVirtualFunctions.push(methodName);}function unboundTypesHandler(){throwUnboundTypeError("Cannot call "+humanName+" due to unbound types",rawArgTypes);}var proto=classType.registeredClass.instancePrototype;var method=proto[methodName];if(undefined===method||undefined===method.overloadTable&&method.className!==classType.name&&method.argCount===argCount-2){unboundTypesHandler.argCount=argCount-2;unboundTypesHandler.className=classType.name;proto[methodName]=unboundTypesHandler;}else{ensureOverloadTable(proto,methodName,humanName);proto[methodName].overloadTable[argCount-2]=unboundTypesHandler;}whenDependentTypesAreResolved([],rawArgTypes,function(argTypes){var memberFunction=craftInvokerFunction(humanName,argTypes,classType,rawInvoker,context);if(undefined===proto[methodName].overloadTable){memberFunction.argCount=argCount-2;proto[methodName]=memberFunction;}else{proto[methodName].overloadTable[argCount-2]=memberFunction;}return[];});return[];});}var GLctx;GL.init();embind_init_charCodes();BindingError=Module["BindingError"]=extendError(Error,"BindingError");InternalError=Module["InternalError"]=extendError(Error,"InternalError");UnboundTypeError=Module["UnboundTypeError"]=extendError(Error,"UnboundTypeError");init_ClassHandle();init_RegisteredPointer();init_embind();init_emval();__ATEXIT__.push(function(){var fflush=Module["_fflush"];if(fflush)fflush(0);var printChar=___syscall146.printChar;if(!printChar)return;var buffers=___syscall146.buffers;if(buffers[1].length)printChar(1,10);if(buffers[2].length)printChar(2,10);});DYNAMICTOP_PTR=allocate(1,"i32",ALLOC_STATIC);STACK_BASE=STACKTOP=Runtime.alignMemory(STATICTOP);STACK_MAX=STACK_BASE+TOTAL_STACK;DYNAMIC_BASE=Runtime.alignMemory(STACK_MAX);HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE;staticSealed=true;function invoke_viiiii(index,a1,a2,a3,a4,a5){try{Module["dynCall_viiiii"](index,a1,a2,a3,a4,a5);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0);}}function invoke_vid(index,a1,a2){try{Module["dynCall_vid"](index,a1,a2);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0);}}function invoke_vi(index,a1){try{Module["dynCall_vi"](index,a1);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0);}}function invoke_vii(index,a1,a2){try{Module["dynCall_vii"](index,a1,a2);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0);}}function invoke_iiiiiii(index,a1,a2,a3,a4,a5,a6){try{return Module["dynCall_iiiiiii"](index,a1,a2,a3,a4,a5,a6);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0);}}function invoke_ii(index,a1){try{return Module["dynCall_ii"](index,a1);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0);}}function invoke_iiiidii(index,a1,a2,a3,a4,a5,a6){try{return Module["dynCall_iiiidii"](index,a1,a2,a3,a4,a5,a6);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0);}}function invoke_iiii(index,a1,a2,a3){try{return Module["dynCall_iiii"](index,a1,a2,a3);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0);}}function invoke_viiiiidi(index,a1,a2,a3,a4,a5,a6,a7){try{Module["dynCall_viiiiidi"](index,a1,a2,a3,a4,a5,a6,a7);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0);}}function invoke_viiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8){try{Module["dynCall_viiiiiiii"](index,a1,a2,a3,a4,a5,a6,a7,a8);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0);}}function invoke_viiiiii(index,a1,a2,a3,a4,a5,a6){try{Module["dynCall_viiiiii"](index,a1,a2,a3,a4,a5,a6);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0);}}function invoke_iiid(index,a1,a2,a3){try{return Module["dynCall_iiid"](index,a1,a2,a3);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0);}}function invoke_di(index,a1){try{return Module["dynCall_di"](index,a1);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0);}}function invoke_vidddd(index,a1,a2,a3,a4,a5){try{Module["dynCall_vidddd"](index,a1,a2,a3,a4,a5);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0);}}function invoke_iid(index,a1,a2){try{return Module["dynCall_iid"](index,a1,a2);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0);}}function invoke_viiiiiii(index,a1,a2,a3,a4,a5,a6,a7){try{Module["dynCall_viiiiiii"](index,a1,a2,a3,a4,a5,a6,a7);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0);}}function invoke_viiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10){try{Module["dynCall_viiiiiiiiii"](index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0);}}function invoke_iii(index,a1,a2){try{return Module["dynCall_iii"](index,a1,a2);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0);}}function invoke_dii(index,a1,a2){try{return Module["dynCall_dii"](index,a1,a2);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0);}}function invoke_i(index){try{return Module["dynCall_i"](index);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0);}}function invoke_iiiii(index,a1,a2,a3,a4){try{return Module["dynCall_iiiii"](index,a1,a2,a3,a4);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0);}}function invoke_viii(index,a1,a2,a3){try{Module["dynCall_viii"](index,a1,a2,a3);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0);}}function invoke_v(index){try{Module["dynCall_v"](index);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0);}}function invoke_viid(index,a1,a2,a3){try{Module["dynCall_viid"](index,a1,a2,a3);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0);}}function invoke_iiiid(index,a1,a2,a3,a4){try{return Module["dynCall_iiiid"](index,a1,a2,a3,a4);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0);}}function invoke_viiii(index,a1,a2,a3,a4){try{Module["dynCall_viiii"](index,a1,a2,a3,a4);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0);}}Module.asmGlobalArg={"Math":Math,"Int8Array":Int8Array,"Int16Array":Int16Array,"Int32Array":Int32Array,"Uint8Array":Uint8Array,"Uint16Array":Uint16Array,"Uint32Array":Uint32Array,"Float32Array":Float32Array,"Float64Array":Float64Array,"NaN":NaN,"Infinity":Infinity,"byteLength":byteLength};Module.asmLibraryArg={"abort":abort,"assert":assert,"enlargeMemory":enlargeMemory,"getTotalMemory":getTotalMemory,"abortOnCannotGrowMemory":abortOnCannotGrowMemory,"invoke_viiiii":invoke_viiiii,"invoke_vid":invoke_vid,"invoke_vi":invoke_vi,"invoke_vii":invoke_vii,"invoke_iiiiiii":invoke_iiiiiii,"invoke_ii":invoke_ii,"invoke_iiiidii":invoke_iiiidii,"invoke_iiii":invoke_iiii,"invoke_viiiiidi":invoke_viiiiidi,"invoke_viiiiiiii":invoke_viiiiiiii,"invoke_viiiiii":invoke_viiiiii,"invoke_iiid":invoke_iiid,"invoke_di":invoke_di,"invoke_vidddd":invoke_vidddd,"invoke_iid":invoke_iid,"invoke_viiiiiii":invoke_viiiiiii,"invoke_viiiiiiiiii":invoke_viiiiiiiiii,"invoke_iii":invoke_iii,"invoke_dii":invoke_dii,"invoke_i":invoke_i,"invoke_iiiii":invoke_iiiii,"invoke_viii":invoke_viii,"invoke_v":invoke_v,"invoke_viid":invoke_viid,"invoke_iiiid":invoke_iiiid,"invoke_viiii":invoke_viiii,"_glUseProgram":_glUseProgram,"_emscripten_asm_const_d":_emscripten_asm_const_d,"floatReadValueFromPointer":floatReadValueFromPointer,"simpleReadValueFromPointer":simpleReadValueFromPointer,"throwInternalError":throwInternalError,"get_first_emval":get_first_emval,"_glUniformMatrix4fv":_glUniformMatrix4fv,"getLiveInheritedInstances":getLiveInheritedInstances,"_glUniform2fv":_glUniform2fv,"___assert_fail":___assert_fail,"_glDeleteProgram":_glDeleteProgram,"__ZSt18uncaught_exceptionv":__ZSt18uncaught_exceptionv,"ClassHandle":ClassHandle,"_emscripten_asm_const_ii":_emscripten_asm_const_ii,"getShiftFromSize":getShiftFromSize,"_glBindBuffer":_glBindBuffer,"_glGetShaderInfoLog":_glGetShaderInfoLog,"_llvm_pow_f32":_llvm_pow_f32,"_glGetAttribLocation":_glGetAttribLocation,"_glDisableVertexAttribArray":_glDisableVertexAttribArray,"___cxa_begin_catch":___cxa_begin_catch,"_uuid_generate":_uuid_generate,"runDestructor":runDestructor,"throwInstanceAlreadyDeleted":throwInstanceAlreadyDeleted,"RegisteredPointer_fromWireType":RegisteredPointer_fromWireType,"__embind_register_class_constructor":__embind_register_class_constructor,"emscriptenWebGLComputeImageSize":emscriptenWebGLComputeImageSize,"init_RegisteredPointer":init_RegisteredPointer,"___lock":___lock,"ClassHandle_isAliasOf":ClassHandle_isAliasOf,"flushPendingDeletes":flushPendingDeletes,"__embind_register_enum_value":__embind_register_enum_value,"makeClassHandle":makeClassHandle,"___resumeException":___resumeException,"whenDependentTypesAreResolved":whenDependentTypesAreResolved,"_glGenBuffers":_glGenBuffers,"_glShaderSource":_glShaderSource,"_glFramebufferRenderbuffer":_glFramebufferRenderbuffer,"_emscripten_asm_const_iiddidd":_emscripten_asm_const_iiddidd,"init_ClassHandle":init_ClassHandle,"___syscall140":___syscall140,"constNoSmartPtrRawPointerToWireType":constNoSmartPtrRawPointerToWireType,"___syscall146":___syscall146,"_glVertexAttribPointer":_glVertexAttribPointer,"__embind_register_std_wstring":__embind_register_std_wstring,"_glGetProgramInfoLog":_glGetProgramInfoLog,"RegisteredClass":RegisteredClass,"___cxa_find_matching_catch":___cxa_find_matching_catch,"__embind_register_value_object_field":__embind_register_value_object_field,"_glBindRenderbuffer":_glBindRenderbuffer,"_glDrawElements":_glDrawElements,"embind_init_charCodes":embind_init_charCodes,"_emscripten_asm_const_i":_emscripten_asm_const_i,"_glViewport":_glViewport,"___setErrNo":___setErrNo,"_glDeleteTextures":_glDeleteTextures,"__embind_register_bool":__embind_register_bool,"_emscripten_asm_const_v":_emscripten_asm_const_v,"createNamedFunction":createNamedFunction,"__embind_register_class_property":__embind_register_class_property,"__embind_register_emval":__embind_register_emval,"__embind_finalize_value_object":__embind_finalize_value_object,"__emval_decref":__emval_decref,"_glEnable":_glEnable,"_glGenTextures":_glGenTextures,"_glGetIntegerv":_glGetIntegerv,"init_embind":init_embind,"ClassHandle_clone":ClassHandle_clone,"emscriptenWebGLGet":emscriptenWebGLGet,"_glAttachShader":_glAttachShader,"ClassHandle_delete":ClassHandle_delete,"_glCreateProgram":_glCreateProgram,"RegisteredPointer_destructor":RegisteredPointer_destructor,"emscriptenWebGLGetTexPixelData":emscriptenWebGLGetTexPixelData,"___syscall6":___syscall6,"ensureOverloadTable":ensureOverloadTable,"_glBindFramebuffer":_glBindFramebuffer,"_glDetachShader":_glDetachShader,"new_":new_,"_glGenFramebuffers":_glGenFramebuffers,"downcastPointer":downcastPointer,"replacePublicSymbol":replacePublicSymbol,"__embind_register_class":__embind_register_class,"ClassHandle_deleteLater":ClassHandle_deleteLater,"_glDeleteFramebuffers":_glDeleteFramebuffers,"___syscall54":___syscall54,"RegisteredPointer_deleteObject":RegisteredPointer_deleteObject,"_glCheckFramebufferStatus":_glCheckFramebufferStatus,"ClassHandle_isDeleted":ClassHandle_isDeleted,"heap32VectorToArray":heap32VectorToArray,"__embind_register_integer":__embind_register_integer,"___cxa_allocate_exception":___cxa_allocate_exception,"_glBlendFuncSeparate":_glBlendFuncSeparate,"_emscripten_asm_const_dii":_emscripten_asm_const_dii,"_uuid_unparse":_uuid_unparse,"_glClearColor":_glClearColor,"_pthread_once":_pthread_once,"_glIsEnabled":_glIsEnabled,"_glBindTexture":_glBindTexture,"_glUniform1f":_glUniform1f,"__embind_register_value_object":__embind_register_value_object,"enumReadValueFromPointer":enumReadValueFromPointer,"getTypeName":getTypeName,"_pthread_getspecific":_pthread_getspecific,"_glReadPixels":_glReadPixels,"_emscripten_memcpy_big":_emscripten_memcpy_big,"_glGetError":_glGetError,"__embind_register_class_function":__embind_register_class_function,"throwUnboundTypeError":throwUnboundTypeError,"craftInvokerFunction":craftInvokerFunction,"runDestructors":runDestructors,"requireRegisteredType":requireRegisteredType,"makeLegalFunctionName":makeLegalFunctionName,"_pthread_key_create":_pthread_key_create,"upcastPointer":upcastPointer,"init_emval":init_emval,"shallowCopyInternalPointer":shallowCopyInternalPointer,"_emscripten_asm_const_iii":_emscripten_asm_const_iii,"nonConstNoSmartPtrRawPointerToWireType":nonConstNoSmartPtrRawPointerToWireType,"_emscripten_asm_const_iiiiii":_emscripten_asm_const_iiiiii,"_uuid_unparse_lower":_uuid_unparse_lower,"_glCompileShader":_glCompileShader,"_glEnableVertexAttribArray":_glEnableVertexAttribArray,"_abort":_abort,"throwBindingError":throwBindingError,"_glDeleteBuffers":_glDeleteBuffers,"_glBufferData":_glBufferData,"validateThis":validateThis,"_glTexImage2D":_glTexImage2D,"exposePublicSymbol":exposePublicSymbol,"__embind_register_std_string":__embind_register_std_string,"___cxa_pure_virtual":___cxa_pure_virtual,"_glDeleteShader":_glDeleteShader,"_glGetProgramiv":_glGetProgramiv,"__embind_register_memory_view":__embind_register_memory_view,"_emscripten_asm_const_iiiiiii":_emscripten_asm_const_iiiiiii,"getInheritedInstance":getInheritedInstance,"setDelayFunction":setDelayFunction,"___gxx_personality_v0":___gxx_personality_v0,"extendError":extendError,"_glDeleteRenderbuffers":_glDeleteRenderbuffers,"__embind_register_void":__embind_register_void,"_glDisable":_glDisable,"_glLinkProgram":_glLinkProgram,"_glGenRenderbuffers":_glGenRenderbuffers,"RegisteredPointer_getPointee":RegisteredPointer_getPointee,"__emval_register":__emval_register,"_glGetUniformLocation":_glGetUniformLocation,"_glClear":_glClear,"_glUniform4fv":_glUniform4fv,"_embind_repr":_embind_repr,"_glRenderbufferStorage":_glRenderbufferStorage,"RegisteredPointer":RegisteredPointer,"_glPixelStorei":_glPixelStorei,"_glGetShaderiv":_glGetShaderiv,"readLatin1String":readLatin1String,"getBasestPointer":getBasestPointer,"getInheritedInstanceCount":getInheritedInstanceCount,"__embind_register_float":__embind_register_float,"integerReadValueFromPointer":integerReadValueFromPointer,"___unlock":___unlock,"_glFramebufferTexture2D":_glFramebufferTexture2D,"_pthread_setspecific":_pthread_setspecific,"genericPointerToWireType":genericPointerToWireType,"registerType":registerType,"___cxa_throw":___cxa_throw,"__embind_register_enum":__embind_register_enum,"count_emval_handles":count_emval_handles,"requireFunction":requireFunction,"_glTexParameteri":_glTexParameteri,"_glCreateShader":_glCreateShader,"_glTexSubImage2D":_glTexSubImage2D,"DYNAMICTOP_PTR":DYNAMICTOP_PTR,"tempDoublePtr":tempDoublePtr,"ABORT":ABORT,"STACKTOP":STACKTOP,"STACK_MAX":STACK_MAX,"cttz_i8":cttz_i8};// EMSCRIPTEN_START_ASM
	var asm=function(global,env,buffer){"almost asm";var a=global.Int8Array;var b=global.Int16Array;var c=global.Int32Array;var d=global.Uint8Array;var e=global.Uint16Array;var f=global.Uint32Array;var g=global.Float32Array;var h=global.Float64Array;var i=new a(buffer);var j=new b(buffer);var k=new c(buffer);var l=new d(buffer);var m=new e(buffer);var n=new f(buffer);var o=new g(buffer);var p=new h(buffer);var q=global.byteLength;var r=env.DYNAMICTOP_PTR|0;var s=env.tempDoublePtr|0;var t=env.ABORT|0;var u=env.STACKTOP|0;var v=env.STACK_MAX|0;var w=env.cttz_i8|0;var x=0;var y=0;var z=0;var A=0;var B=global.NaN,C=global.Infinity;var D=0,E=0,F=0,G=0,H=0.0,I=0,J=0,K=0,L=0.0;var M=0;var N=global.Math.floor;var O=global.Math.abs;var P=global.Math.sqrt;var Q=global.Math.pow;var R=global.Math.cos;var S=global.Math.sin;var T=global.Math.tan;var U=global.Math.acos;var V=global.Math.asin;var W=global.Math.atan;var X=global.Math.atan2;var Y=global.Math.exp;var Z=global.Math.log;var _=global.Math.ceil;var $=global.Math.imul;var aa=global.Math.min;var ba=global.Math.max;var ca=global.Math.clz32;var da=env.abort;var ea=env.assert;var fa=env.enlargeMemory;var ga=env.getTotalMemory;var ha=env.abortOnCannotGrowMemory;var ia=env.invoke_viiiii;var ja=env.invoke_vid;var ka=env.invoke_vi;var la=env.invoke_vii;var ma=env.invoke_iiiiiii;var na=env.invoke_ii;var oa=env.invoke_iiiidii;var pa=env.invoke_iiii;var qa=env.invoke_viiiiidi;var ra=env.invoke_viiiiiiii;var sa=env.invoke_viiiiii;var ta=env.invoke_iiid;var ua=env.invoke_di;var va=env.invoke_vidddd;var wa=env.invoke_iid;var xa=env.invoke_viiiiiii;var ya=env.invoke_viiiiiiiiii;var za=env.invoke_iii;var Aa=env.invoke_dii;var Ba=env.invoke_i;var Ca=env.invoke_iiiii;var Da=env.invoke_viii;var Ea=env.invoke_v;var Fa=env.invoke_viid;var Ga=env.invoke_iiiid;var Ha=env.invoke_viiii;var Ia=env._glUseProgram;var Ja=env._emscripten_asm_const_d;var Ka=env.floatReadValueFromPointer;var La=env.simpleReadValueFromPointer;var Ma=env.throwInternalError;var Na=env.get_first_emval;var Oa=env._glUniformMatrix4fv;var Pa=env.getLiveInheritedInstances;var Qa=env._glUniform2fv;var Ra=env.___assert_fail;var Sa=env._glDeleteProgram;var Ta=env.__ZSt18uncaught_exceptionv;var Ua=env.ClassHandle;var Va=env._emscripten_asm_const_ii;var Wa=env.getShiftFromSize;var Xa=env._glBindBuffer;var Ya=env._glGetShaderInfoLog;var Za=env._llvm_pow_f32;var _a=env._glGetAttribLocation;var $a=env._glDisableVertexAttribArray;var ab=env.___cxa_begin_catch;var bb=env._uuid_generate;var cb=env.runDestructor;var db=env.throwInstanceAlreadyDeleted;var eb=env.RegisteredPointer_fromWireType;var fb=env.__embind_register_class_constructor;var gb=env.emscriptenWebGLComputeImageSize;var hb=env.init_RegisteredPointer;var ib=env.___lock;var jb=env.ClassHandle_isAliasOf;var kb=env.flushPendingDeletes;var lb=env.__embind_register_enum_value;var mb=env.makeClassHandle;var nb=env.___resumeException;var ob=env.whenDependentTypesAreResolved;var pb=env._glGenBuffers;var qb=env._glShaderSource;var rb=env._glFramebufferRenderbuffer;var sb=env._emscripten_asm_const_iiddidd;var tb=env.init_ClassHandle;var ub=env.___syscall140;var vb=env.constNoSmartPtrRawPointerToWireType;var wb=env.___syscall146;var xb=env._glVertexAttribPointer;var yb=env.__embind_register_std_wstring;var zb=env._glGetProgramInfoLog;var Ab=env.RegisteredClass;var Bb=env.___cxa_find_matching_catch;var Cb=env.__embind_register_value_object_field;var Db=env._glBindRenderbuffer;var Eb=env._glDrawElements;var Fb=env.embind_init_charCodes;var Gb=env._emscripten_asm_const_i;var Hb=env._glViewport;var Ib=env.___setErrNo;var Jb=env._glDeleteTextures;var Kb=env.__embind_register_bool;var Lb=env._emscripten_asm_const_v;var Mb=env.createNamedFunction;var Nb=env.__embind_register_class_property;var Ob=env.__embind_register_emval;var Pb=env.__embind_finalize_value_object;var Qb=env.__emval_decref;var Rb=env._glEnable;var Sb=env._glGenTextures;var Tb=env._glGetIntegerv;var Ub=env.init_embind;var Vb=env.ClassHandle_clone;var Wb=env.emscriptenWebGLGet;var Xb=env._glAttachShader;var Yb=env.ClassHandle_delete;var Zb=env._glCreateProgram;var _b=env.RegisteredPointer_destructor;var $b=env.emscriptenWebGLGetTexPixelData;var ac=env.___syscall6;var bc=env.ensureOverloadTable;var cc=env._glBindFramebuffer;var dc=env._glDetachShader;var ec=env.new_;var fc=env._glGenFramebuffers;var gc=env.downcastPointer;var hc=env.replacePublicSymbol;var ic=env.__embind_register_class;var jc=env.ClassHandle_deleteLater;var kc=env._glDeleteFramebuffers;var lc=env.___syscall54;var mc=env.RegisteredPointer_deleteObject;var nc=env._glCheckFramebufferStatus;var oc=env.ClassHandle_isDeleted;var pc=env.heap32VectorToArray;var qc=env.__embind_register_integer;var rc=env.___cxa_allocate_exception;var sc=env._glBlendFuncSeparate;var tc=env._emscripten_asm_const_dii;var uc=env._uuid_unparse;var vc=env._glClearColor;var wc=env._pthread_once;var xc=env._glIsEnabled;var yc=env._glBindTexture;var zc=env._glUniform1f;var Ac=env.__embind_register_value_object;var Bc=env.enumReadValueFromPointer;var Cc=env.getTypeName;var Dc=env._pthread_getspecific;var Ec=env._glReadPixels;var Fc=env._emscripten_memcpy_big;var Gc=env._glGetError;var Hc=env.__embind_register_class_function;var Ic=env.throwUnboundTypeError;var Jc=env.craftInvokerFunction;var Kc=env.runDestructors;var Lc=env.requireRegisteredType;var Mc=env.makeLegalFunctionName;var Nc=env._pthread_key_create;var Oc=env.upcastPointer;var Pc=env.init_emval;var Qc=env.shallowCopyInternalPointer;var Rc=env._emscripten_asm_const_iii;var Sc=env.nonConstNoSmartPtrRawPointerToWireType;var Tc=env._emscripten_asm_const_iiiiii;var Uc=env._uuid_unparse_lower;var Vc=env._glCompileShader;var Wc=env._glEnableVertexAttribArray;var Xc=env._abort;var Yc=env.throwBindingError;var Zc=env._glDeleteBuffers;var _c=env._glBufferData;var $c=env.validateThis;var ad=env._glTexImage2D;var bd=env.exposePublicSymbol;var cd=env.__embind_register_std_string;var dd=env.___cxa_pure_virtual;var ed=env._glDeleteShader;var fd=env._glGetProgramiv;var gd=env.__embind_register_memory_view;var hd=env._emscripten_asm_const_iiiiiii;var id=env.getInheritedInstance;var jd=env.setDelayFunction;var kd=env.___gxx_personality_v0;var ld=env.extendError;var md=env._glDeleteRenderbuffers;var nd=env.__embind_register_void;var od=env._glDisable;var pd=env._glLinkProgram;var qd=env._glGenRenderbuffers;var rd=env.RegisteredPointer_getPointee;var sd=env.__emval_register;var td=env._glGetUniformLocation;var ud=env._glClear;var vd=env._glUniform4fv;var wd=env._embind_repr;var xd=env._glRenderbufferStorage;var yd=env.RegisteredPointer;var zd=env._glPixelStorei;var Ad=env._glGetShaderiv;var Bd=env.readLatin1String;var Cd=env.getBasestPointer;var Dd=env.getInheritedInstanceCount;var Ed=env.__embind_register_float;var Fd=env.integerReadValueFromPointer;var Gd=env.___unlock;var Hd=env._glFramebufferTexture2D;var Id=env._pthread_setspecific;var Jd=env.genericPointerToWireType;var Kd=env.registerType;var Ld=env.___cxa_throw;var Md=env.__embind_register_enum;var Nd=env.count_emval_handles;var Od=env.requireFunction;var Pd=env._glTexParameteri;var Qd=env._glCreateShader;var Rd=env._glTexSubImage2D;var Sd=0.0;function Td(newBuffer){if(q(newBuffer)&16777215||q(newBuffer)<=16777215||q(newBuffer)>2147483648)return false;i=new a(newBuffer);j=new b(newBuffer);k=new c(newBuffer);l=new d(newBuffer);m=new e(newBuffer);n=new f(newBuffer);o=new g(newBuffer);p=new h(newBuffer);buffer=newBuffer;return true;}// EMSCRIPTEN_START_FUNCS
	function se(a){a=a|0;var b=0;b=u;u=u+a|0;u=u+15&-16;return b|0;}function te(){return u|0;}function ue(a){a=a|0;u=a;}function ve(a,b){a=a|0;b=b|0;u=a;v=b;}function we(a,b){a=a|0;b=b|0;if(!x){x=a;y=b;}}function xe(a){a=a|0;M=a;}function ye(){return M|0;}function ze(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a>>2]=3128;Ae(a+4|0,b,c,d,d);return;}function Ae(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;AN(a,b);k[a+12>>2]=4;b=a+16|0;k[b>>2]=k[c>>2];k[b+4>>2]=k[c+4>>2];k[b+8>>2]=k[c+8>>2];b=d;d=k[b+4>>2]|0;c=a+28|0;k[c>>2]=k[b>>2];k[c+4>>2]=d;c=e;d=k[c+4>>2]|0;e=a+36|0;k[e>>2]=k[c>>2];k[e+4>>2]=d;return;}function Be(a,b){a=a|0;b=b|0;var c=0,d=0;d=b;c=k[d+4>>2]|0;b=a+40|0;k[b>>2]=k[d>>2];k[b+4>>2]=c;return;}function Ce(a){a=a|0;return Rs(a+32|0,a+40|0)|0;}function De(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;f=u;u=u+16|0;d=f+4|0;e=f;c=sN(44,40063)|0;if(!c)c=0;else{Ie(c,b+4|0);g=c+16|0;b=b+20|0;k[g>>2]=k[b>>2];k[g+4>>2]=k[b+4>>2];k[g+8>>2]=k[b+8>>2];k[g+12>>2]=k[b+12>>2];k[g+16>>2]=k[b+16>>2];k[g+20>>2]=k[b+20>>2];k[g+24>>2]=k[b+24>>2];}k[e>>2]=0;k[d>>2]=k[e>>2];Ee(a,c,d);u=f;return;}function Ee(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3160;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Fe(a){a=a|0;k[a>>2]=3128;CN(a+4|0);return;}function Ge(a){a=a|0;k[a>>2]=3128;CN(a+4|0);vN(a);return;}function He(a){a=a|0;return a+4|0;}function Ie(a,b){a=a|0;b=b|0;AN(a,b);k[a+12>>2]=k[b+12>>2];return;}function Je(a){a=a|0;kN(a);vN(a);return;}function Ke(a){a=a|0;a=k[a+12>>2]|0;if(a|0){CN(a);vN(a);}return;}function Le(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==9661?a+12|0:0)|0;}function Me(a){a=a|0;vN(a);return;}function Ne(a){a=a|0;k[a>>2]=3188;CN(a+4|0);return;}function Oe(a){a=a|0;k[a>>2]=3188;CN(a+4|0);vN(a);return;}function Pe(a){a=a|0;return a+4|0;}function Qe(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+16|0;e=c;d=a+20|0;Ts(e,a+36|0,b);k[d>>2]=k[e>>2];k[d+4>>2]=k[e+4>>2];k[d+8>>2]=k[e+8>>2];k[d+12>>2]=k[e+12>>2];u=c;return;}function Re(a){a=a|0;return(Ws(a+20|0)|0)^1|0;}function Se(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;f=u;u=u+16|0;d=f+4|0;e=f;c=sN(32,40063)|0;if(!c)c=0;else{Ie(c,b+4|0);g=c+16|0;b=b+20|0;k[g>>2]=k[b>>2];k[g+4>>2]=k[b+4>>2];k[g+8>>2]=k[b+8>>2];k[g+12>>2]=k[b+12>>2];}k[e>>2]=0;k[d>>2]=k[e>>2];Te(a,c,d);u=f;return;}function Te(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3220;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Ue(a){a=a|0;kN(a);vN(a);return;}function Ve(a){a=a|0;a=k[a+12>>2]|0;if(a|0){CN(a);vN(a);}return;}function We(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==9705?a+12|0:0)|0;}function Xe(a){a=a|0;vN(a);return;}function Ye(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;d=u;u=u+16|0;f=d;k[a>>2]=3188;Ts(f,c,c);AN(a+4|0,b);k[a+16>>2]=2;e=a+20|0;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];k[e+8>>2]=k[f+8>>2];k[e+12>>2]=k[f+12>>2];e=c;b=k[e+4>>2]|0;c=a+36|0;k[c>>2]=k[e>>2];k[c+4>>2]=b;u=d;return;}function Ze(a){a=a|0;k[a>>2]=3248;ff(a+4|0);return;}function _e(a){a=a|0;k[a>>2]=3248;ff(a+4|0);vN(a);return;}function $e(a){a=a|0;return a+4|0;}function af(a,b){a=a|0;b=b|0;var c=0,d=0;c=a+36|0;d=k[c>>2]|0;if((d|0)==(k[a+40>>2]|0))pf(a+32|0,b);else{a=b;b=k[a+4>>2]|0;k[d>>2]=k[a>>2];k[d+4>>2]=b;k[c>>2]=(k[c>>2]|0)+8;}return;}function bf(a){a=a|0;return 1;}function cf(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;f=u;u=u+16|0;d=f+4|0;e=f;c=sN(44,40063)|0;if(!c)c=0;else df(c,b+4|0);k[e>>2]=0;k[d>>2]=k[e>>2];ef(a,c,d);u=f;return;}function df(a,b){a=a|0;b=b|0;var c=0,d=0;Ie(a,b);c=a+16|0;d=b+16|0;k[c>>2]=k[d>>2];k[c+4>>2]=k[d+4>>2];k[c+8>>2]=k[d+8>>2];mf(a+28|0,b+28|0);k[a+40>>2]=k[b+40>>2];return;}function ef(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3280;k[c+12>>2]=b;k[a+4>>2]=c;return;}function ff(a){a=a|0;gf(a+28|0);CN(a);return;}function gf(a){a=a|0;var b=0,c=0,d=0;c=k[a>>2]|0;if(c|0){a=a+4|0;b=k[a>>2]|0;while(1){if((b|0)==(c|0))break;d=b+-8|0;k[a>>2]=d;b=d;}vN(c);}return;}function hf(a){a=a|0;kN(a);vN(a);return;}function jf(a){a=a|0;a=k[a+12>>2]|0;if(a|0){ff(a);vN(a);}return;}function kf(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==9859?a+12|0:0)|0;}function lf(a){a=a|0;vN(a);return;}function mf(a,b){a=a|0;b=b|0;var c=0,d=0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;c=b+4|0;d=(k[c>>2]|0)-(k[b>>2]|0)>>3;if(d|0){nf(a,d);of(a,k[b>>2]|0,k[c>>2]|0,d);}return;}function nf(a,b){a=a|0;b=b|0;var c=0;if(b>>>0>536870911)jN(a);else{c=rN(b<<3)|0;k[a+4>>2]=c;k[a>>2]=c;k[a+8>>2]=c+(b<<3);return;}}function of(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;d=a+4|0;a=c-b|0;if((a|0)>0){PO(k[d>>2]|0,b|0,a|0)|0;k[d>>2]=(k[d>>2]|0)+(a>>3<<3);}return;}function pf(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;g=u;u=u+32|0;c=g;d=k[a+4>>2]|0;e=k[a>>2]|0;f=(d-e>>3)+1|0;if(f>>>0>536870911)jN(a);else{i=(k[a+8>>2]|0)-e|0;h=i>>2;qf(c,i>>3>>>0<268435455?h>>>0<f>>>0?f:h:536870911,d-e>>3,a+8|0);f=c+8|0;d=k[b+4>>2]|0;e=k[f>>2]|0;k[e>>2]=k[b>>2];k[e+4>>2]=d;k[f>>2]=(k[f>>2]|0)+8;rf(a,c);sf(c);u=g;return;}}function qf(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;do if(b){if(b>>>0>536870911){c=rc(4)|0;GO(c);Ld(c|0,2912,370);}else{d=rN(b<<3)|0;break;}}else d=0;while(0);k[a>>2]=d;c=d+(c<<3)|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+(b<<3);return;}function rf(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;d=k[a>>2]|0;g=a+4|0;f=b+4|0;e=(k[g>>2]|0)-d|0;c=(k[f>>2]|0)+(0-(e>>3)<<3)|0;k[f>>2]=c;if((e|0)>0){PO(c|0,d|0,e|0)|0;d=f;c=k[f>>2]|0;}else d=f;f=k[a>>2]|0;k[a>>2]=c;k[d>>2]=f;f=b+8|0;e=k[g>>2]|0;k[g>>2]=k[f>>2];k[f>>2]=e;f=a+8|0;g=b+12|0;a=k[f>>2]|0;k[f>>2]=k[g>>2];k[g>>2]=a;k[b>>2]=k[d>>2];return;}function sf(a){a=a|0;var b=0,c=0,d=0,e=0;b=k[a+4>>2]|0;c=a+8|0;d=k[c>>2]|0;while(1){if((d|0)==(b|0))break;e=d+-8|0;k[c>>2]=e;d=e;}a=k[a>>2]|0;if(a|0)vN(a);return;}function tf(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;var f=0,g=0,h=0,i=0,j=0,l=0,m=0;i=u;u=u+32|0;h=i+8|0;j=i;k[a>>2]=3248;g=k[d+4>>2]|0;f=j;k[f>>2]=k[d>>2];k[f+4>>2]=g;k[h>>2]=0;f=h+4|0;k[f>>2]=0;k[h+8>>2]=0;nf(h,1);g=j+8|0;d=j;while(1){if((d|0)==(g|0))break;m=d;l=k[m+4>>2]|0;j=k[f>>2]|0;k[j>>2]=k[m>>2];k[j+4>>2]=l;k[f>>2]=(k[f>>2]|0)+8;d=d+8|0;}uf(a+4|0,b,c,h,e);gf(h);u=i;return;}function uf(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;AN(a,b);k[a+12>>2]=5;b=a+16|0;k[b>>2]=k[c>>2];k[b+4>>2]=k[c+4>>2];k[b+8>>2]=k[c+8>>2];mf(a+28|0,d);o[a+40>>2]=e;return;}function vf(a){a=a|0;k[a>>2]=3308;CN(a+4|0);return;}function wf(a){a=a|0;k[a>>2]=3308;CN(a+4|0);vN(a);return;}function xf(a){a=a|0;return a+4|0;}function yf(a,b){a=a|0;b=b|0;var c=0,d=0;d=b;c=k[d+4>>2]|0;b=a+40|0;k[b>>2]=k[d>>2];k[b+4>>2]=c;return;}function zf(a){a=a|0;return 1;}function Af(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;f=u;u=u+16|0;d=f+4|0;e=f;c=sN(44,40063)|0;if(!c)c=0;else{Ie(c,b+4|0);g=c+16|0;b=b+20|0;k[g>>2]=k[b>>2];k[g+4>>2]=k[b+4>>2];k[g+8>>2]=k[b+8>>2];k[g+12>>2]=k[b+12>>2];k[g+16>>2]=k[b+16>>2];k[g+20>>2]=k[b+20>>2];k[g+24>>2]=k[b+24>>2];}k[e>>2]=0;k[d>>2]=k[e>>2];Bf(a,c,d);u=f;return;}function Bf(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3340;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Cf(a){a=a|0;kN(a);vN(a);return;}function Df(a){a=a|0;a=k[a+12>>2]|0;if(a|0){CN(a);vN(a);}return;}function Ef(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==10018?a+12|0:0)|0;}function Ff(a){a=a|0;vN(a);return;}function Gf(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a>>2]=3308;Hf(a+4|0,b,c,d,d);return;}function Hf(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;AN(a,b);k[a+12>>2]=3;b=a+16|0;k[b>>2]=k[c>>2];k[b+4>>2]=k[c+4>>2];k[b+8>>2]=k[c+8>>2];b=d;d=k[b+4>>2]|0;c=a+28|0;k[c>>2]=k[b>>2];k[c+4>>2]=d;c=e;d=k[c+4>>2]|0;e=a+36|0;k[e>>2]=k[c>>2];k[e+4>>2]=d;return;}function If(a){a=a|0;k[a>>2]=3368;CN(a+4|0);return;}function Jf(a){a=a|0;k[a>>2]=3368;CN(a+4|0);vN(a);return;}function Kf(a){a=a|0;return a+4|0;}function Lf(a,b){a=a|0;b=b|0;var c=0,d=0.0,e=0.0,f=0,g=0;c=u;u=u+16|0;g=c;f=a+48|0;e=+O(+(+o[b>>2]-+o[f>>2]));d=+O(+(+o[b+4>>2]-+o[a+52>>2]));zs(g,f,b);f=k[g+4>>2]|0;b=a+32|0;k[b>>2]=k[g>>2];k[b+4>>2]=f;o[a+40>>2]=e/1.4142135381698608;o[a+44>>2]=d/1.4142135381698608;u=c;return;}function Mf(a){a=a|0;return 1;}function Nf(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;f=u;u=u+16|0;d=f+4|0;e=f;c=sN(44,40063)|0;if(!c)c=0;else{Ie(c,b+4|0);g=c+16|0;b=b+20|0;k[g>>2]=k[b>>2];k[g+4>>2]=k[b+4>>2];k[g+8>>2]=k[b+8>>2];k[g+12>>2]=k[b+12>>2];k[g+16>>2]=k[b+16>>2];k[g+20>>2]=k[b+20>>2];k[g+24>>2]=k[b+24>>2];}k[e>>2]=0;k[d>>2]=k[e>>2];Of(a,c,d);u=f;return;}function Of(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3400;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Pf(a){a=a|0;kN(a);vN(a);return;}function Qf(a){a=a|0;a=k[a+12>>2]|0;if(a|0){CN(a);vN(a);}return;}function Rf(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==10172?a+12|0:0)|0;}function Sf(a){a=a|0;vN(a);return;}function Tf(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a>>2]=3368;Uf(a+4|0,b,c,d,0.0,0.0);b=d;c=k[b+4>>2]|0;d=a+48|0;k[d>>2]=k[b>>2];k[d+4>>2]=c;return;}function Uf(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;f=+f;AN(a,b);k[a+12>>2]=6;b=a+16|0;k[b>>2]=k[c>>2];k[b+4>>2]=k[c+4>>2];k[b+8>>2]=k[c+8>>2];b=d;c=k[b+4>>2]|0;d=a+28|0;k[d>>2]=k[b>>2];k[d+4>>2]=c;o[a+36>>2]=e;o[a+40>>2]=f;return;}function Vf(a){a=a|0;k[a>>2]=3428;CN(a+4|0);return;}function Wf(a){a=a|0;k[a>>2]=3428;CN(a+4|0);vN(a);return;}function Xf(a){a=a|0;return a+4|0;}function Yf(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+16|0;e=c;d=a+32|0;Ts(e,a+48|0,b);k[d>>2]=k[e>>2];k[d+4>>2]=k[e+4>>2];k[d+8>>2]=k[e+8>>2];k[d+12>>2]=k[e+12>>2];u=c;return;}function Zf(a){a=a|0;return 1;}function _f(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;f=u;u=u+16|0;d=f+4|0;e=f;c=sN(44,40063)|0;if(!c)c=0;else{Ie(c,b+4|0);g=c+16|0;b=b+20|0;k[g>>2]=k[b>>2];k[g+4>>2]=k[b+4>>2];k[g+8>>2]=k[b+8>>2];k[g+12>>2]=k[b+12>>2];k[g+16>>2]=k[b+16>>2];k[g+20>>2]=k[b+20>>2];k[g+24>>2]=k[b+24>>2];}k[e>>2]=0;k[d>>2]=k[e>>2];$f(a,c,d);u=f;return;}function $f(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3460;k[c+12>>2]=b;k[a+4>>2]=c;return;}function ag(a){a=a|0;kN(a);vN(a);return;}function bg(a){a=a|0;a=k[a+12>>2]|0;if(a|0){CN(a);vN(a);}return;}function cg(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==10326?a+12|0:0)|0;}function dg(a){a=a|0;vN(a);return;}function eg(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=u;u=u+16|0;f=e;k[a>>2]=3428;Ts(f,d,d);AN(a+4|0,b);k[a+16>>2]=8;b=a+20|0;k[b>>2]=k[c>>2];k[b+4>>2]=k[c+4>>2];k[b+8>>2]=k[c+8>>2];b=a+32|0;k[b>>2]=k[f>>2];k[b+4>>2]=k[f+4>>2];k[b+8>>2]=k[f+8>>2];k[b+12>>2]=k[f+12>>2];b=d;c=k[b+4>>2]|0;d=a+48|0;k[d>>2]=k[b>>2];k[d+4>>2]=c;u=e;return;}function fg(a){a=a|0;k[a>>2]=3488;xg(a+4|0);return;}function gg(a){a=a|0;k[a>>2]=3488;xg(a+4|0);vN(a);return;}function hg(a){a=a|0;return(i[a+56>>0]|0)!=0|0;}function ig(a){a=a|0;return a+4|0;}function jg(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=u;u=u+16|0;d=c+4|0;e=c;f=Fg(a)|0;k[e>>2]=f;k[d>>2]=k[e>>2];Hg(a+32|0,d,b)|0;Xd[k[(k[a>>2]|0)+36>>2]&255](a,(k[a+60>>2]|0)+1|0);u=c;return;}function kg(a){a=a|0;Xd[k[(k[a>>2]|0)+16>>2]&255](a,10);return;}function lg(a){a=a|0;var b=0,c=0,d=0,e=0;d=a+32|0;e=Fg(a)|0;b=(i[a+40+3>>0]|0)<0;if(b)c=k[d>>2]|0;else c=d;if((e|0)!=(c|0)){if(b)b=k[d>>2]|0;else b=d;Gg(d,e+-4-b>>2,1)|0;Xd[k[(k[a>>2]|0)+36>>2]&255](a,(k[a+60>>2]|0)+-1|0);}return;}function mg(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0;f=a+32|0;d=Fg(a)|0;g=d;b=i[a+40+3>>0]|0;e=b<<24>>24<0;if(e){c=k[f>>2]|0;a=k[a+36>>2]|0;}else{c=f;a=b&255;}if((d|0)!=(c+(a<<2)|0)){if(e)a=k[f>>2]|0;else a=f;Gg(f,g-a>>2,1)|0;}return;}function ng(a){a=a|0;return k[a+60>>2]|0;}function og(a,b){a=a|0;b=b|0;var c=0;c=i[a+40+3>>0]|0;if(c<<24>>24<0)c=k[a+36>>2]|0;else c=c&255;k[a+60>>2]=c>>>0<b>>>0?c:b;return;}function pg(a){a=a|0;return(i[a+57>>0]|0)!=0|0;}function qg(a,b){a=a|0;b=b|0;i[a+57>>0]=b&1;return;}function rg(a,b){a=a|0;b=b|0;a=a+20|0;i[a>>0]=i[b>>0]|0;i[a+1>>0]=i[b+1>>0]|0;i[a+2>>0]=i[b+2>>0]|0;return;}function sg(a,b){a=a|0;b=+b;o[a+24>>2]=b;return;}function tg(a,b){a=a|0;b=b|0;i[a+28>>0]=b&1;return;}function ug(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;f=u;u=u+16|0;d=f+4|0;e=f;c=sN(52,40063)|0;if(!c)c=0;else vg(c,b+4|0);k[e>>2]=0;k[d>>2]=k[e>>2];wg(a,c,d);u=f;return;}function vg(a,b){a=a|0;b=b|0;var c=0,d=0;Ie(a,b);c=a+16|0;d=b+16|0;k[c>>2]=k[d>>2];k[c+4>>2]=k[d+4>>2];k[c+8>>2]=k[d+8>>2];Dg(a+28|0,b+28|0);a=a+40|0;b=b+40|0;k[a>>2]=k[b>>2];k[a+4>>2]=k[b+4>>2];k[a+8>>2]=k[b+8>>2];return;}function wg(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3560;k[c+12>>2]=b;k[a+4>>2]=c;return;}function xg(a){a=a|0;yg(a+28|0);CN(a);return;}function yg(a){a=a|0;if((i[a+8+3>>0]|0)<0)vN(k[a>>2]|0);return;}function zg(a){a=a|0;kN(a);vN(a);return;}function Ag(a){a=a|0;a=k[a+12>>2]|0;if(a|0){xg(a);vN(a);}return;}function Bg(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==10497?a+12|0:0)|0;}function Cg(a){a=a|0;vN(a);return;}function Dg(a,b){a=a|0;b=b|0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;if((i[b+8+3>>0]|0)<0)Eg(a,k[b>>2]|0,k[b+4>>2]|0);else{k[a>>2]=k[b>>2];k[a+4>>2]=k[b+4>>2];k[a+8>>2]=k[b+8>>2];}return;}function Eg(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;if(c>>>0>1073741807)yN(a);do if(c>>>0>=2){d=c+4&-4;if(d>>>0>1073741823){c=rc(4)|0;GO(c);Ld(c|0,2912,370);}else{f=rN(d<<2)|0;k[a>>2]=f;k[a+8>>2]=d|-2147483648;k[a+4>>2]=c;a=f;break;}}else i[a+8+3>>0]=c;while(0);e=a;f=c;d=b;while(1){if(!f)break;k[e>>2]=k[d>>2];e=e+4|0;f=f+-1|0;d=d+4|0;}k[a+(c<<2)>>2]=0;return;}function Fg(a){a=a|0;var b=0,c=0;b=a+32|0;c=i[a+40+3>>0]|0;if(c<<24>>24<0){c=k[a+36>>2]|0;b=k[b>>2]|0;}else c=c&255;a=k[a+60>>2]|0;return b+((c>>>0<a>>>0?c:a)<<2)|0;}function Gg(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0;l=a+8+3|0;d=i[l>>0]|0;if(d<<24>>24<0)g=k[a+4>>2]|0;else g=d&255;if(g>>>0<b>>>0)zN(a);if(c|0){h=(i[l>>0]|0)<0;if(h)j=k[a>>2]|0;else j=a;e=g-b|0;f=e>>>0<c>>>0?e:c;e=e-f|0;a:do if(e|0){c=j+(b<<2)|0;d=c+(f<<2)|0;if((f|0)>0)while(1){if(!e)break a;k[c>>2]=k[d>>2];c=c+4|0;e=e+-1|0;d=d+4|0;}if((f|0)<0){c=c+(e<<2)|0;b=e;d=d+(e<<2)|0;while(1){if(!b)break a;m=c+-4|0;e=d+-4|0;k[m>>2]=k[e>>2];c=m;b=b+-1|0;d=e;}}}while(0);d=g-f|0;if(h)k[a+4>>2]=d;else i[l>>0]=d;k[j+(d<<2)>>2]=0;}return a|0;}function Hg(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0;e=a+8|0;l=e+3|0;d=i[l>>0]|0;f=d<<24>>24<0;if(f){b=(k[b>>2]|0)-(k[a>>2]|0)|0;e=(k[e>>2]&2147483647)+-1|0;h=k[a+4>>2]|0;}else{b=(k[b>>2]|0)-a|0;e=1;h=d&255;}j=b>>2;a:do if((e|0)!=(h|0)){if(f)e=k[a>>2]|0;else e=a;b=h-j|0;if(b){n=e+(j<<2)|0;f=n+4+(b<<2)|0;g=b;b=n+(b<<2)|0;while(1){if(!g)break a;o=f+-4|0;n=b+-4|0;k[o>>2]=k[n>>2];f=o;g=g+-1|0;b=n;}}}else{Ig(a,h,1,h,j,0,1);e=k[a>>2]|0;d=i[l>>0]|0;}while(0);k[e+(j<<2)>>2]=c;b=h+1|0;k[e+(b<<2)>>2]=0;if(d<<24>>24>=0){o=b&255;i[l>>0]=o;if(o<<24>>24<0)m=16;}else{k[a+4>>2]=b;m=16;}if((m|0)==16)a=k[a>>2]|0;return a+(j<<2)|0;}function Ig(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,l=0,m=0,n=0,o=0;if((1073741807-b|0)>>>0<c>>>0)yN(a);o=a+8|0;if((i[o+3>>0]|0)<0)n=k[a>>2]|0;else n=a;if(b>>>0<536870887){c=c+b|0;m=b<<1;c=c>>>0<m>>>0?m:c;c=c>>>0<2?2:c+4&-4;if(c>>>0>1073741823){o=rc(4)|0;GO(o);Ld(o|0,2912,370);}else l=c;}else l=1073741807;m=rN(l<<2)|0;a:do if(e|0){c=m;h=e;j=n;while(1){if(!h)break a;k[c>>2]=k[j>>2];c=c+4|0;h=h+-1|0;j=j+4|0;}}while(0);h=d-f-e|0;b:do if(h|0){j=m+(e<<2)+(g<<2)|0;c=n+(e<<2)+(f<<2)|0;while(1){if(!h)break b;k[j>>2]=k[c>>2];j=j+4|0;h=h+-1|0;c=c+4|0;}}while(0);if((b|0)!=1)vN(n);k[a>>2]=m;k[o>>2]=l|-2147483648;return;}function Jg(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=3488;vg(a+4|0,b);i[a+56>>0]=c&1;i[a+57>>0]=1;k[a+60>>2]=0;return;}function Kg(a,b){a=a|0;b=b|0;k[a>>2]=k[b>>2];b=k[b+4>>2]|0;k[a+4>>2]=b;if(b|0)mN(b);return;}function Lg(a,b){a=a|0;b=b|0;if(k[a>>2]|0)Xd[k[(k[b>>2]|0)+32>>2]&255](b,a);return;}function Mg(a,b){a=a|0;b=b|0;var c=0,d=0;d=u;u=u+16|0;c=d;a=k[a>>2]|0;if(a|0){ne[k[(k[b>>2]|0)+36>>2]&63](c,b,a);Ng(c);}u=d;return;}function Ng(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function Og(a){a=a|0;k[a>>2]=3588;Tg(a+4|0);return;}function Pg(a){a=a|0;k[a>>2]=3588;Tg(a+4|0);vN(a);return;}function Qg(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;h=u;u=u+16|0;e=h;f=a+4|0;g=e+4|0;a=k[a+8>>2]|0;while(1){d=a;if((d|0)==(k[f>>2]|0))break;a=d+-8|0;c=k[a>>2]|0;k[e>>2]=c;d=k[d+-4>>2]|0;k[g>>2]=d;if(d){mN(d);c=k[e>>2]|0;}if(c|0)Xd[k[(k[c>>2]|0)+8>>2]&255](c,b);Sg(e);}u=h;return;}function Rg(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;h=u;u=u+16|0;e=h;f=a+8|0;g=e+4|0;d=k[a+4>>2]|0;while(1){if((d|0)==(k[f>>2]|0))break;a=k[d>>2]|0;k[e>>2]=a;c=k[d+4>>2]|0;k[g>>2]=c;if(c){mN(c);a=k[e>>2]|0;}if(a|0)Xd[k[(k[a>>2]|0)+12>>2]&255](a,b);Sg(e);d=d+8|0;}u=h;return;}function Sg(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function Tg(a){a=a|0;var b=0,c=0,d=0;b=k[a>>2]|0;if(b|0){c=a+4|0;while(1){d=k[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;k[c>>2]=d;Sg(d);}vN(k[a>>2]|0);}return;}function Ug(a,b){a=a|0;b=b|0;k[a>>2]=3588;Vg(a+4|0,b);return;}function Vg(a,b){a=a|0;b=b|0;var c=0,d=0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;c=b+4|0;d=(k[c>>2]|0)-(k[b>>2]|0)>>3;if(d|0){Wg(a,d);Xg(a,k[b>>2]|0,k[c>>2]|0,d);}return;}function Wg(a,b){a=a|0;b=b|0;var c=0;if(b>>>0>536870911)jN(a);else{c=rN(b<<3)|0;k[a+4>>2]=c;k[a>>2]=c;k[a+8>>2]=c+(b<<3);return;}}function Xg(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;d=a+4|0;while(1){if((b|0)==(c|0))break;e=k[d>>2]|0;k[e>>2]=k[b>>2];a=k[b+4>>2]|0;k[e+4>>2]=a;if(a|0)mN(a);k[d>>2]=(k[d>>2]|0)+8;b=b+8|0;}return;}function Yg(a){a=a|0;k[a>>2]=3612;hh(a+24|0);Tg(a+4|0);return;}function Zg(a){a=a|0;Yg(a);vN(a);return;}function _g(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0;m=u;u=u+16|0;e=m+12|0;d=m+8|0;g=m+4|0;h=m;if(k[b>>2]|0?(i[a+20>>0]|0)==0:0){j=a+4|0;l=a+8|0;c=k[l>>2]|0;f=k[a+16>>2]|0;if((f|0)!=(c|0)){k[g>>2]=f;k[h>>2]=c;k[d>>2]=k[g>>2];k[e>>2]=k[h>>2];$g(j,d,e)|0;c=k[l>>2]|0;}if((c|0)==(k[a+12>>2]|0)){ah(j,b);c=k[l>>2]|0;}else{k[c>>2]=k[b>>2];d=k[b+4>>2]|0;k[c+4>>2]=d;if(d){mN(d);c=k[l>>2]|0;}c=c+8|0;k[l>>2]=c;}k[a+16>>2]=c;bh(a+24|0);}u=m;return;}function $g(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0;i=u;u=u+16|0;g=i;h=k[a>>2]|0;f=k[b>>2]|0;h=h+(f-h>>3<<3)|0;b=k[c>>2]|0;a:do if((f|0)!=(b|0)){e=a+4|0;c=k[e>>2]|0;a=g+4|0;d=h;b=h+(b-f>>3<<3)|0;while(1){if((b|0)==(c|0))break;f=k[b>>2]|0;l=b+4|0;j=k[l>>2]|0;k[b>>2]=0;k[l>>2]=0;k[g>>2]=k[d>>2];k[d>>2]=f;f=d+4|0;k[a>>2]=k[f>>2];k[f>>2]=j;Sg(g);d=d+8|0;b=b+8|0;}while(1){b=k[e>>2]|0;if((b|0)==(d|0))break a;l=b+-8|0;k[e>>2]=l;Sg(l);}}while(0);u=i;return h|0;}function ah(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;g=u;u=u+32|0;f=g;c=k[a+4>>2]|0;d=k[a>>2]|0;e=(c-d>>3)+1|0;if(e>>>0>536870911)jN(a);i=(k[a+8>>2]|0)-d|0;h=i>>2;eh(f,i>>3>>>0<268435455?h>>>0<e>>>0?e:h:536870911,c-d>>3,a+8|0);e=f+8|0;c=k[e>>2]|0;k[c>>2]=k[b>>2];d=k[b+4>>2]|0;k[c+4>>2]=d;if(d){mN(d);c=k[e>>2]|0;}k[e>>2]=c+8;fh(a,f);gh(f);u=g;return;}function bh(a){a=a|0;if(k[a+16>>2]|0)ch(a);return;}function ch(a){a=a|0;a=k[a+16>>2]|0;if(!a){a=rc(4)|0;k[a>>2]=3632;Ld(a|0,288,44);}else{Wd[k[(k[a>>2]|0)+24>>2]&511](a);return;}}function dh(a){a=a|0;vN(a);return;}function eh(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;do if(b){if(b>>>0>536870911){c=rc(4)|0;GO(c);Ld(c|0,2912,370);}else{d=rN(b<<3)|0;break;}}else d=0;while(0);k[a>>2]=d;c=d+(c<<3)|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+(b<<3);return;}function fh(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;d=k[a>>2]|0;e=a+4|0;f=b+4|0;c=k[e>>2]|0;while(1){if((c|0)==(d|0))break;i=k[f>>2]|0;g=c+-8|0;k[i+-8>>2]=k[g>>2];h=c+-4|0;k[i+-4>>2]=k[h>>2];k[g>>2]=0;k[h>>2]=0;k[f>>2]=(k[f>>2]|0)+-8;c=g;}g=k[a>>2]|0;k[a>>2]=k[f>>2];k[f>>2]=g;g=b+8|0;i=k[e>>2]|0;k[e>>2]=k[g>>2];k[g>>2]=i;g=a+8|0;i=b+12|0;h=k[g>>2]|0;k[g>>2]=k[i>>2];k[i>>2]=h;k[b>>2]=k[f>>2];return;}function gh(a){a=a|0;var b=0,c=0,d=0;b=k[a+4>>2]|0;c=a+8|0;while(1){d=k[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;k[c>>2]=d;Sg(d);}a=k[a>>2]|0;if(a|0)vN(a);return;}function hh(a){a=a|0;var b=0;b=k[a+16>>2]|0;if((b|0)!=(a|0)){if(b|0)Wd[k[(k[b>>2]|0)+20>>2]&511](b);}else Wd[k[(k[b>>2]|0)+16>>2]&511](b);return;}function ih(a){a=a|0;var b=0;k[a>>2]=3612;b=a+4|0;k[a+40>>2]=0;k[b>>2]=0;k[b+4>>2]=0;k[b+8>>2]=0;k[b+12>>2]=0;i[b+16>>0]=0;return;}function jh(a){a=a|0;return(k[a+16>>2]|0)!=(k[a+4>>2]|0)|0;}function kh(a){a=a|0;return(k[a+16>>2]|0)!=(k[a+8>>2]|0)|0;}function lh(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=a+16|0;d=k[c>>2]|0;if((d|0)!=(k[a+4>>2]|0)?(e=a+20|0,(i[e>>0]|0)==0):0){i[e>>0]=1;d=d+-8|0;k[c>>2]=d;d=k[d>>2]|0;Xd[k[(k[d>>2]|0)+8>>2]&255](d,b);bh(a+24|0);i[e>>0]=0;}return;}function mh(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=a+16|0;d=k[c>>2]|0;if((d|0)!=(k[a+8>>2]|0)?(e=a+20|0,(i[e>>0]|0)==0):0){i[e>>0]=1;d=k[d>>2]|0;Xd[k[(k[d>>2]|0)+12>>2]&255](d,b);k[c>>2]=(k[c>>2]|0)+8;bh(a+24|0);i[e>>0]=0;}return;}function nh(a){a=a|0;k[a>>2]=3652;Ng(a+12|0);Ng(a+4|0);return;}function oh(a){a=a|0;nh(a);vN(a);return;}function ph(a,b){a=a|0;b=b|0;a=a+4|0;if(k[a>>2]|0)Xd[k[(k[b>>2]|0)+48>>2]&255](b,a);return;}function qh(a,b){a=a|0;b=b|0;a=a+12|0;if(k[a>>2]|0)Xd[k[(k[b>>2]|0)+48>>2]&255](b,a);return;}function rh(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=3652;k[a+4>>2]=k[b>>2];b=k[b+4>>2]|0;k[a+8>>2]=b;if(b|0)mN(b);k[a+12>>2]=k[c>>2];b=k[c+4>>2]|0;k[a+16>>2]=b;if(b|0)mN(b);return;}function sh(a){a=a|0;k[a>>2]=3676;CN(a+4|0);return;}function th(a){a=a|0;k[a>>2]=3676;CN(a+4|0);vN(a);return;}function uh(a,b){a=a|0;b=b|0;var c=0,d=0;c=u;u=u+16|0;d=c;Os(d,-1.0,a+16|0);wh(a,b,d);u=c;return;}function vh(a,b){a=a|0;b=b|0;wh(a,b,a+16|0);return;}function wh(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0;g=u;u=u+32|0;d=g+16|0;e=g+8|0;f=g;ne[k[(k[b>>2]|0)+28>>2]&63](d,b,a+4|0);a=k[d>>2]|0;if(a|0){bi(e,a);a=k[e>>2]|0;if(a|0){Xd[k[(k[a>>2]|0)+12>>2]&255](a,0);a=k[e>>2]|0;Xd[k[(k[a>>2]|0)+16>>2]&255](a,c);c=k[e>>2]|0;Wd[k[(k[c>>2]|0)+20>>2]&511](c);c=k[(k[b>>2]|0)+48>>2]|0;a=k[e>>2]|0;Xd[k[(k[a>>2]|0)+48>>2]&255](f,a);Xd[c&255](b,f);Ng(f);}xh(e);}Ng(d);u=g;return;}function xh(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function yh(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;k[a>>2]=3676;AN(a+4|0,b);d=c;b=k[d+4>>2]|0;c=a+16|0;k[c>>2]=k[d>>2];k[c+4>>2]=b;return;}function zh(a){a=a|0;k[a>>2]=3700;CN(a+4|0);return;}function Ah(a){a=a|0;k[a>>2]=3700;CN(a+4|0);vN(a);return;}function Bh(a,b){a=a|0;b=b|0;ne[k[(k[b>>2]|0)+44>>2]&63](b,a+4|0,j[a+16>>1]|0);return;}function Ch(a,b){a=a|0;b=b|0;ne[k[(k[b>>2]|0)+44>>2]&63](b,a+4|0,j[a+18>>1]|0);return;}function Dh(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a>>2]=3700;AN(a+4|0,b);j[a+16>>1]=c;j[a+18>>1]=d;return;}function Eh(a){a=a|0;k[a>>2]=3724;yg(a+28|0);yg(a+16|0);CN(a+4|0);return;}function Fh(a){a=a|0;Eh(a);vN(a);return;}function Gh(a,b){a=a|0;b=b|0;Ih(a,b,a+16|0);return;}function Hh(a,b){a=a|0;b=b|0;Ih(a,b,a+28|0);return;}function Ih(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0;i=u;u=u+32|0;f=i+24|0;g=i+16|0;h=i+8|0;e=i;ne[k[(k[b>>2]|0)+28>>2]&63](g,b,a+4|0);d=k[g>>2]|0;if(d|0?(k[d+12>>2]|0)==7:0){a=sN(52,40063)|0;if(!a)a=0;else vg(a,d);k[e>>2]=0;k[f>>2]=k[e>>2];Jh(h,a,f);a=k[h>>2]|0;if(a|0){Kh(a+28|0,c)|0;a=k[(k[b>>2]|0)+48>>2]|0;k[f>>2]=k[h>>2];d=k[h+4>>2]|0;k[f+4>>2]=d;if(d|0)mN(d);Xd[a&255](b,f);Ng(f);}Lh(h);}Ng(g);u=i;return;}function Jh(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3560;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Kh(a,b){a=a|0;b=b|0;var c=0,d=0;if((a|0)!=(b|0)){c=i[b+8+3>>0]|0;d=c<<24>>24<0;Mh(a,d?k[b>>2]|0:b,d?k[b+4>>2]|0:c&255)|0;}return a|0;}function Lh(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function Mh(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,j=0,l=0;d=a+8|0;h=d+3|0;f=i[h>>0]|0;j=f<<24>>24<0;if(j)e=(k[d>>2]&2147483647)+-1|0;else e=1;do if(e>>>0>=c>>>0){if(j)g=k[a>>2]|0;else g=a;a:do if(g>>>0>=b>>>0){if(g>>>0>b>>>0){e=g+(c<<2)|0;f=c;d=b+(c<<2)|0;while(1){if(!f)break a;l=e+-4|0;b=d+-4|0;k[l>>2]=k[b>>2];e=l;f=f+-1|0;d=b;}}}else{e=g;f=c;d=b;while(1){if(!f)break a;k[e>>2]=k[d>>2];e=e+4|0;f=f+-1|0;d=d+4|0;}}while(0);k[g+(c<<2)>>2]=0;if(j){k[a+4>>2]=c;break;}else{i[h>>0]=c;break;}}else{if(j)d=k[a+4>>2]|0;else d=f&255;Nh(a,e,c-e|0,d,0,d,c,b);}while(0);return a|0;}function Nh(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,l=0,m=0,n=0,o=0,p=0;if((1073741806-b|0)>>>0<c>>>0)yN(a);o=a+8|0;if((i[o+3>>0]|0)<0)p=k[a>>2]|0;else p=a;if(b>>>0<536870887){c=c+b|0;n=b<<1;c=c>>>0<n>>>0?n:c;c=c>>>0<2?2:c+4&-4;if(c>>>0>1073741823){g=rc(4)|0;GO(g);Ld(g|0,2912,370);}}else c=1073741807;n=rN(c<<2)|0;a:do if(e|0){j=n;l=e;m=p;while(1){if(!l)break a;k[j>>2]=k[m>>2];j=j+4|0;l=l+-1|0;m=m+4|0;}}while(0);b:do if(g|0){j=n+(e<<2)|0;l=g;while(1){if(!l)break b;k[j>>2]=k[h>>2];j=j+4|0;l=l+-1|0;h=h+4|0;}}while(0);m=d-f|0;h=m-e|0;c:do if(h|0){l=n+(e<<2)+(g<<2)|0;j=h;h=p+(e<<2)+(f<<2)|0;while(1){if(!j)break c;k[l>>2]=k[h>>2];l=l+4|0;j=j+-1|0;h=h+4|0;}}while(0);if((b|0)!=1)vN(p);k[a>>2]=n;k[o>>2]=c|-2147483648;g=m+g|0;k[a+4>>2]=g;k[n+(g<<2)>>2]=0;return;}function Oh(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a>>2]=3724;AN(a+4|0,b);Dg(a+16|0,c);Dg(a+28|0,d);return;}function Ph(a){a=a|0;k[a>>2]=3748;ff(a+4|0);return;}function Qh(a){a=a|0;k[a>>2]=3748;ff(a+4|0);vN(a);return;}function Rh(a){a=a|0;return a+4|0;}function Sh(a,b){a=a|0;b=b|0;return;}function Th(a,b){a=a|0;b=b|0;var c=0,d=0;d=b;c=k[d+4>>2]|0;b=a+48|0;k[b>>2]=k[d>>2];k[b+4>>2]=c;return;}function Uh(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0;f=u;u=u+16|0;c=f;d=k[a+36>>2]|0;e=a+48|0;b=k[a+32>>2]|0;while(1){if((b|0)==(d|0))break;Ms(c,b,e);i=c;h=k[i+4>>2]|0;g=b;k[g>>2]=k[i>>2];k[g+4>>2]=h;b=b+8|0;}k[e>>2]=0;k[a+52>>2]=0;u=f;return;}function Vh(a){a=a|0;return a+48|0;}function Wh(a){a=a|0;return 1;}function Xh(a,b){a=a|0;b=b|0;b=b+20|0;k[a>>2]=k[b>>2];k[a+4>>2]=k[b+4>>2];k[a+8>>2]=k[b+8>>2];return;}function Yh(a,b){a=a|0;b=b|0;a=a+20|0;i[a>>0]=i[b>>0]|0;i[a+1>>0]=i[b+1>>0]|0;i[a+2>>0]=i[b+2>>0]|0;return;}function Zh(a,b){a=a|0;b=+b;o[a+24>>2]=b;return;}function _h(a,b){a=a|0;b=b|0;i[a+28>>0]=b&1;return;}function $h(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;f=u;u=u+16|0;d=f+4|0;e=f;c=sN(44,40063)|0;if(!c)c=0;else df(c,b+4|0);k[e>>2]=0;k[d>>2]=k[e>>2];ef(a,c,d);u=f;return;}function ai(a,b){a=a|0;b=b|0;k[a>>2]=3748;df(a+4|0,b);o[a+48>>2]=0.0;o[a+52>>2]=0.0;return;}function bi(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;h=u;u=u+32|0;d=h+16|0;e=h+8|0;f=h;k[a>>2]=0;g=a+4|0;k[g>>2]=0;switch(k[b+12>>2]|0){case 3:{c=sN(80,40063)|0;if(!c)c=0;else ci(c,b);k[f>>2]=0;k[d>>2]=k[f>>2];di(e,c,d);f=k[e>>2]|0;k[e>>2]=k[a>>2];k[a>>2]=f;a=e+4|0;f=k[a>>2]|0;k[a>>2]=k[g>>2];k[g>>2]=f;xh(e);break;}case 4:{c=sN(80,40063)|0;if(!c)c=0;else ei(c,b);k[f>>2]=0;k[d>>2]=k[f>>2];fi(e,c,d);f=k[e>>2]|0;k[e>>2]=k[a>>2];k[a>>2]=f;a=e+4|0;f=k[a>>2]|0;k[a>>2]=k[g>>2];k[g>>2]=f;xh(e);break;}case 5:{c=sN(56,40063)|0;if(!c)c=0;else ai(c,b);k[f>>2]=0;k[d>>2]=k[f>>2];gi(e,c,d);f=k[e>>2]|0;k[e>>2]=k[a>>2];k[a>>2]=f;a=e+4|0;f=k[a>>2]|0;k[a>>2]=k[g>>2];k[g>>2]=f;xh(e);break;}case 6:{c=sN(80,40063)|0;if(!c)c=0;else Kj(c,b);k[f>>2]=0;k[d>>2]=k[f>>2];hi(e,c,d);f=k[e>>2]|0;k[e>>2]=k[a>>2];k[a>>2]=f;a=e+4|0;f=k[a>>2]|0;k[a>>2]=k[g>>2];k[g>>2]=f;xh(e);break;}case 8:{c=sN(88,40063)|0;if(!c)c=0;else ak(c,b);k[f>>2]=0;k[d>>2]=k[f>>2];ii(e,c,d);f=k[e>>2]|0;k[e>>2]=k[a>>2];k[a>>2]=f;a=e+4|0;f=k[a>>2]|0;k[a>>2]=k[g>>2];k[g>>2]=f;xh(e);break;}case 7:{c=sN(64,40063)|0;if(!c)c=0;else ok(c,b);k[f>>2]=0;k[d>>2]=k[f>>2];ji(e,c,d);f=k[e>>2]|0;k[e>>2]=k[a>>2];k[a>>2]=f;a=e+4|0;f=k[a>>2]|0;k[a>>2]=k[g>>2];k[g>>2]=f;xh(e);break;}default:{}}u=h;return;}function ci(a,b){a=a|0;b=b|0;var c=0;k[a>>2]=4036;Ie(a+4|0,b);c=a+20|0;b=b+16|0;k[c>>2]=k[b>>2];k[c+4>>2]=k[b+4>>2];k[c+8>>2]=k[b+8>>2];k[c+12>>2]=k[b+12>>2];k[c+16>>2]=k[b+16>>2];k[c+20>>2]=k[b+20>>2];k[c+24>>2]=k[b+24>>2];b=a+48|0;k[b>>2]=0;k[b+4>>2]=0;k[b+8>>2]=0;k[b+12>>2]=0;k[b+16>>2]=0;k[b+20>>2]=0;k[b+24>>2]=0;k[b+28>>2]=0;return;}function di(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=4008;k[c+12>>2]=b;k[a+4>>2]=c;return;}function ei(a,b){a=a|0;b=b|0;var c=0;k[a>>2]=3948;Ie(a+4|0,b);c=a+20|0;b=b+16|0;k[c>>2]=k[b>>2];k[c+4>>2]=k[b+4>>2];k[c+8>>2]=k[b+8>>2];k[c+12>>2]=k[b+12>>2];k[c+16>>2]=k[b+16>>2];k[c+20>>2]=k[b+20>>2];k[c+24>>2]=k[b+24>>2];b=a+48|0;k[b>>2]=0;k[b+4>>2]=0;k[b+8>>2]=0;k[b+12>>2]=0;k[b+16>>2]=0;k[b+20>>2]=0;k[b+24>>2]=0;k[b+28>>2]=0;return;}function fi(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3920;k[c+12>>2]=b;k[a+4>>2]=c;return;}function gi(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3892;k[c+12>>2]=b;k[a+4>>2]=c;return;}function hi(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3864;k[c+12>>2]=b;k[a+4>>2]=c;return;}function ii(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3836;k[c+12>>2]=b;k[a+4>>2]=c;return;}function ji(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3808;k[c+12>>2]=b;k[a+4>>2]=c;return;}function ki(a){a=a|0;kN(a);vN(a);return;}function li(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function mi(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==10903?a+12|0:0)|0;}function ni(a){a=a|0;vN(a);return;}function oi(a){a=a|0;kN(a);vN(a);return;}function pi(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function qi(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==11046?a+12|0:0)|0;}function ri(a){a=a|0;vN(a);return;}function si(a){a=a|0;kN(a);vN(a);return;}function ti(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function ui(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==11199?a+12|0:0)|0;}function vi(a){a=a|0;vN(a);return;}function wi(a){a=a|0;kN(a);vN(a);return;}function xi(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function yi(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==11342?a+12|0:0)|0;}function zi(a){a=a|0;vN(a);return;}function Ai(a){a=a|0;kN(a);vN(a);return;}function Bi(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function Ci(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==11487?a+12|0:0)|0;}function Di(a){a=a|0;vN(a);return;}function Ei(a){a=a|0;k[a>>2]=3948;CN(a+4|0);return;}function Fi(a){a=a|0;k[a>>2]=3948;CN(a+4|0);vN(a);return;}function Gi(a){a=a|0;return a+4|0;}function Hi(a,b){a=a|0;b=b|0;var c=0,d=0;switch(b<<24>>24){case 1:{d=a+32|0;c=k[d+4>>2]|0;b=a+56|0;k[b>>2]=k[d>>2];k[b+4>>2]=c;k[a+64>>2]=134;k[a+68>>2]=0;k[a+72>>2]=0;k[a+76>>2]=0;break;}case 2:{b=a+40|0;c=k[b+4>>2]|0;d=a+56|0;k[d>>2]=k[b>>2];k[d+4>>2]=c;k[a+64>>2]=135;k[a+68>>2]=0;k[a+72>>2]=0;k[a+76>>2]=0;break;}default:{k[a+64>>2]=136;k[a+68>>2]=0;k[a+72>>2]=376;k[a+76>>2]=0;}}return;}function Ii(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=k[a+64>>2]|0;d=k[a+68>>2]|0;e=d&1;if((c|0)!=0|(d|0)!=0&(e|c|0)!=0){d=a+(d>>1)|0;if(e)c=k[(k[d>>2]|0)+c>>2]|0;Xd[c&255](d,b);}return;}function Ji(a){a=a|0;var b=0,c=0,d=0;b=k[a+72>>2]|0;c=k[a+76>>2]|0;d=c&1;if((b|0)!=0|(c|0)!=0&(d|b|0)!=0){c=a+(c>>1)|0;if(d)b=k[(k[c>>2]|0)+b>>2]|0;Wd[b&511](c);}a=a+64|0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;k[a+12>>2]=0;return;}function Ki(a){a=a|0;return a+48|0;}function Li(a){a=a|0;return 1;}function Mi(a,b){a=a|0;b=b|0;b=b+20|0;k[a>>2]=k[b>>2];k[a+4>>2]=k[b+4>>2];k[a+8>>2]=k[b+8>>2];return;}function Ni(a,b){a=a|0;b=b|0;a=a+20|0;i[a>>0]=i[b>>0]|0;i[a+1>>0]=i[b+1>>0]|0;i[a+2>>0]=i[b+2>>0]|0;return;}function Oi(a,b){a=a|0;b=+b;o[a+24>>2]=b;return;}function Pi(a,b){a=a|0;b=b|0;i[a+28>>0]=b&1;return;}function Qi(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;g=u;u=u+32|0;d=g+16|0;e=g+8|0;f=g;c=sN(44,40063)|0;if(!c)c=0;else{Ie(c,b+4|0);h=c+16|0;b=b+20|0;k[h>>2]=k[b>>2];k[h+4>>2]=k[b+4>>2];k[h+8>>2]=k[b+8>>2];k[h+12>>2]=k[b+12>>2];k[h+16>>2]=k[b+16>>2];k[h+20>>2]=k[b+20>>2];k[h+24>>2]=k[b+24>>2];}k[f>>2]=0;k[d>>2]=k[f>>2];Ri(e,c,d);k[a>>2]=k[e>>2];h=e+4|0;k[a+4>>2]=k[h>>2];k[e>>2]=0;k[h>>2]=0;Si(e);u=g;return;}function Ri(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3160;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Si(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function Ti(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+16|0;e=c;Ms(e,a+56|0,b);d=k[e+4>>2]|0;b=a+32|0;k[b>>2]=k[e>>2];k[b+4>>2]=d;u=c;return;}function Ui(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+16|0;e=c;Ms(e,a+56|0,b);d=k[e+4>>2]|0;b=a+40|0;k[b>>2]=k[e>>2];k[b+4>>2]=d;u=c;return;}function Vi(a,b){a=a|0;b=b|0;var c=0,d=0;d=b;c=k[d+4>>2]|0;b=a+48|0;k[b>>2]=k[d>>2];k[b+4>>2]=c;return;}function Wi(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0;b=u;u=u+16|0;f=b;d=a+32|0;c=a+48|0;Ms(f,d,c);g=f;e=k[g+4>>2]|0;k[d>>2]=k[g>>2];k[d+4>>2]=e;d=a+40|0;Ms(f,d,c);e=k[f+4>>2]|0;k[d>>2]=k[f>>2];k[d+4>>2]=e;k[c>>2]=0;k[a+52>>2]=0;u=b;return;}function Xi(a){a=a|0;kN(a);vN(a);return;}function Yi(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function Zi(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==11754?a+12|0:0)|0;}function _i(a){a=a|0;vN(a);return;}function $i(a){a=a|0;k[a>>2]=4036;CN(a+4|0);return;}function aj(a){a=a|0;k[a>>2]=4036;CN(a+4|0);vN(a);return;}function bj(a){a=a|0;return a+4|0;}function cj(a,b){a=a|0;b=b|0;var c=0,d=0;switch(b<<24>>24){case 1:{d=a+32|0;c=k[d+4>>2]|0;b=a+56|0;k[b>>2]=k[d>>2];k[b+4>>2]=c;k[a+64>>2]=137;k[a+68>>2]=0;k[a+72>>2]=0;k[a+76>>2]=0;break;}case 2:{b=a+40|0;c=k[b+4>>2]|0;d=a+56|0;k[d>>2]=k[b>>2];k[d+4>>2]=c;k[a+64>>2]=138;k[a+68>>2]=0;k[a+72>>2]=0;k[a+76>>2]=0;break;}default:{k[a+64>>2]=139;k[a+68>>2]=0;k[a+72>>2]=377;k[a+76>>2]=0;}}return;}function dj(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=k[a+64>>2]|0;d=k[a+68>>2]|0;e=d&1;if((c|0)!=0|(d|0)!=0&(e|c|0)!=0){d=a+(d>>1)|0;if(e)c=k[(k[d>>2]|0)+c>>2]|0;Xd[c&255](d,b);}return;}function ej(a){a=a|0;var b=0,c=0,d=0;b=k[a+72>>2]|0;c=k[a+76>>2]|0;d=c&1;if((b|0)!=0|(c|0)!=0&(d|b|0)!=0){c=a+(c>>1)|0;if(d)b=k[(k[c>>2]|0)+b>>2]|0;Wd[b&511](c);}a=a+64|0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;k[a+12>>2]=0;return;}function fj(a){a=a|0;return a+48|0;}function gj(a){a=a|0;return 1;}function hj(a,b){a=a|0;b=b|0;b=b+20|0;k[a>>2]=k[b>>2];k[a+4>>2]=k[b+4>>2];k[a+8>>2]=k[b+8>>2];return;}function ij(a,b){a=a|0;b=b|0;a=a+20|0;i[a>>0]=i[b>>0]|0;i[a+1>>0]=i[b+1>>0]|0;i[a+2>>0]=i[b+2>>0]|0;return;}function jj(a,b){a=a|0;b=+b;o[a+24>>2]=b;return;}function kj(a,b){a=a|0;b=b|0;i[a+28>>0]=b&1;return;}function lj(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;g=u;u=u+32|0;d=g+16|0;e=g+8|0;f=g;c=sN(44,40063)|0;if(!c)c=0;else{Ie(c,b+4|0);h=c+16|0;b=b+20|0;k[h>>2]=k[b>>2];k[h+4>>2]=k[b+4>>2];k[h+8>>2]=k[b+8>>2];k[h+12>>2]=k[b+12>>2];k[h+16>>2]=k[b+16>>2];k[h+20>>2]=k[b+20>>2];k[h+24>>2]=k[b+24>>2];}k[f>>2]=0;k[d>>2]=k[f>>2];mj(e,c,d);k[a>>2]=k[e>>2];h=e+4|0;k[a+4>>2]=k[h>>2];k[e>>2]=0;k[h>>2]=0;nj(e);u=g;return;}function mj(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3340;k[c+12>>2]=b;k[a+4>>2]=c;return;}function nj(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function oj(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+16|0;e=c;Ms(e,a+56|0,b);d=k[e+4>>2]|0;b=a+32|0;k[b>>2]=k[e>>2];k[b+4>>2]=d;u=c;return;}function pj(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+16|0;e=c;Ms(e,a+56|0,b);d=k[e+4>>2]|0;b=a+40|0;k[b>>2]=k[e>>2];k[b+4>>2]=d;u=c;return;}function qj(a,b){a=a|0;b=b|0;var c=0,d=0;d=b;c=k[d+4>>2]|0;b=a+48|0;k[b>>2]=k[d>>2];k[b+4>>2]=c;return;}function rj(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0;b=u;u=u+16|0;f=b;d=a+32|0;c=a+48|0;Ms(f,d,c);g=f;e=k[g+4>>2]|0;k[d>>2]=k[g>>2];k[d+4>>2]=e;d=a+40|0;Ms(f,d,c);e=k[f+4>>2]|0;k[d>>2]=k[f>>2];k[d+4>>2]=e;k[c>>2]=0;k[a+52>>2]=0;u=b;return;}function sj(a){a=a|0;k[a>>2]=4096;CN(a+4|0);return;}function tj(a){a=a|0;k[a>>2]=4096;CN(a+4|0);vN(a);return;}function uj(a){a=a|0;return a+4|0;}function vj(a,b){a=a|0;b=b|0;var c=0.0,d=0.0;switch(b<<24>>24){case 1:{k[a+64>>2]=140;k[a+68>>2]=0;k[a+72>>2]=378;k[a+76>>2]=0;d=+o[a+36>>2];c=+o[a+44>>2];o[a+56>>2]=d-c;o[a+60>>2]=d+c;break;}case 2:{k[a+64>>2]=140;k[a+68>>2]=0;k[a+72>>2]=378;k[a+76>>2]=0;c=+o[a+36>>2];d=+o[a+44>>2];o[a+56>>2]=c+d;o[a+60>>2]=c-d;break;}case 3:{k[a+64>>2]=141;k[a+68>>2]=0;k[a+72>>2]=378;k[a+76>>2]=0;c=+o[a+32>>2];d=+o[a+40>>2];o[a+56>>2]=c+d;o[a+60>>2]=c-d;break;}case 4:{k[a+64>>2]=141;k[a+68>>2]=0;k[a+72>>2]=378;k[a+76>>2]=0;c=+o[a+32>>2];d=+o[a+40>>2];o[a+56>>2]=c-d;o[a+60>>2]=c+d;break;}default:{k[a+64>>2]=142;k[a+68>>2]=0;k[a+72>>2]=379;k[a+76>>2]=0;}}return;}function wj(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=k[a+64>>2]|0;d=k[a+68>>2]|0;e=d&1;if((c|0)!=0|(d|0)!=0&(e|c|0)!=0){d=a+(d>>1)|0;if(e)c=k[(k[d>>2]|0)+c>>2]|0;Xd[c&255](d,b);}return;}function xj(a){a=a|0;var b=0,c=0,d=0;b=k[a+72>>2]|0;c=k[a+76>>2]|0;d=c&1;if((b|0)!=0|(c|0)!=0&(d|b|0)!=0){c=a+(c>>1)|0;if(d)b=k[(k[c>>2]|0)+b>>2]|0;Wd[b&511](c);}a=a+64|0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;k[a+12>>2]=0;return;}function yj(a){a=a|0;return a+48|0;}function zj(a){a=a|0;return 1;}function Aj(a,b){a=a|0;b=b|0;b=b+20|0;k[a>>2]=k[b>>2];k[a+4>>2]=k[b+4>>2];k[a+8>>2]=k[b+8>>2];return;}function Bj(a,b){a=a|0;b=b|0;a=a+20|0;i[a>>0]=i[b>>0]|0;i[a+1>>0]=i[b+1>>0]|0;i[a+2>>0]=i[b+2>>0]|0;return;}function Cj(a,b){a=a|0;b=+b;o[a+24>>2]=b;return;}function Dj(a,b){a=a|0;b=b|0;i[a+28>>0]=b&1;return;}function Ej(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;f=u;u=u+16|0;d=f+4|0;e=f;c=sN(44,40063)|0;if(!c)c=0;else{Ie(c,b+4|0);g=c+16|0;b=b+20|0;k[g>>2]=k[b>>2];k[g+4>>2]=k[b+4>>2];k[g+8>>2]=k[b+8>>2];k[g+12>>2]=k[b+12>>2];k[g+16>>2]=k[b+16>>2];k[g+20>>2]=k[b+20>>2];k[g+24>>2]=k[b+24>>2];}k[e>>2]=0;k[d>>2]=k[e>>2];Of(a,c,d);u=f;return;}function Fj(a,b){a=a|0;b=b|0;var c=0.0,d=0.0,e=0.0;d=+o[a+60>>2]+ +o[b+4>>2];e=+o[a+56>>2];c=+O(+(e-d))*.5;o[a+36>>2]=(e+d)*.5;o[a+44>>2]=c;return;}function Gj(a){a=a|0;return;}function Hj(a,b){a=a|0;b=b|0;var c=0.0,d=0.0,e=0.0;d=+o[a+60>>2]+ +o[b>>2];e=+o[a+56>>2];c=+O(+(e-d))*.5;o[a+32>>2]=(e+d)*.5;o[a+40>>2]=c;return;}function Ij(a,b){a=a|0;b=b|0;var c=0,d=0;d=b;c=k[d+4>>2]|0;b=a+48|0;k[b>>2]=k[d>>2];k[b+4>>2]=c;return;}function Jj(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;b=u;u=u+16|0;f=b;d=a+32|0;c=a+48|0;Ms(f,d,c);e=k[f+4>>2]|0;k[d>>2]=k[f>>2];k[d+4>>2]=e;k[c>>2]=0;k[a+52>>2]=0;u=b;return;}function Kj(a,b){a=a|0;b=b|0;var c=0;k[a>>2]=4096;Ie(a+4|0,b);c=a+20|0;b=b+16|0;k[c>>2]=k[b>>2];k[c+4>>2]=k[b+4>>2];k[c+8>>2]=k[b+8>>2];k[c+12>>2]=k[b+12>>2];k[c+16>>2]=k[b+16>>2];k[c+20>>2]=k[b+20>>2];k[c+24>>2]=k[b+24>>2];o[a+48>>2]=0.0;o[a+52>>2]=0.0;b=a+64|0;k[b>>2]=0;k[b+4>>2]=0;k[b+8>>2]=0;k[b+12>>2]=0;return;}function Lj(a){a=a|0;k[a>>2]=4156;CN(a+4|0);return;}function Mj(a){a=a|0;k[a>>2]=4156;CN(a+4|0);vN(a);return;}function Nj(a){a=a|0;return a+4|0;}function Oj(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;g=a+32|0;c=a+72|0;k[c>>2]=143;d=a+76|0;k[d>>2]=0;e=a+80|0;k[e>>2]=380;f=a+84|0;k[f>>2]=0;switch(b<<24>>24){case 1:{b=k[a+36>>2]|0;k[a+56>>2]=k[a+40>>2];k[a+60>>2]=b;b=k[a+44>>2]|0;k[a+64>>2]=k[g>>2];k[a+68>>2]=b;break;}case 2:{b=k[a+36>>2]|0;k[a+56>>2]=k[g>>2];k[a+60>>2]=b;g=k[a+44>>2]|0;k[a+64>>2]=k[a+40>>2];k[a+68>>2]=g;break;}case 3:{b=k[a+44>>2]|0;k[a+56>>2]=k[a+40>>2];k[a+60>>2]=b;b=k[a+36>>2]|0;k[a+64>>2]=k[g>>2];k[a+68>>2]=b;break;}case 4:{b=k[a+44>>2]|0;k[a+56>>2]=k[g>>2];k[a+60>>2]=b;g=k[a+36>>2]|0;k[a+64>>2]=k[a+40>>2];k[a+68>>2]=g;break;}default:{k[c>>2]=144;k[d>>2]=0;k[e>>2]=381;k[f>>2]=0;}}return;}function Pj(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=k[a+72>>2]|0;d=k[a+76>>2]|0;e=d&1;if((c|0)!=0|(d|0)!=0&(e|c|0)!=0){d=a+(d>>1)|0;if(e)c=k[(k[d>>2]|0)+c>>2]|0;Xd[c&255](d,b);}return;}function Qj(a){a=a|0;var b=0,c=0,d=0;b=k[a+80>>2]|0;c=k[a+84>>2]|0;d=c&1;if((b|0)!=0|(c|0)!=0&(d|b|0)!=0){c=a+(c>>1)|0;if(d)b=k[(k[c>>2]|0)+b>>2]|0;Wd[b&511](c);}a=a+72|0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;k[a+12>>2]=0;return;}function Rj(a){a=a|0;return a+48|0;}function Sj(a){a=a|0;return 1;}function Tj(a,b){a=a|0;b=b|0;b=b+20|0;k[a>>2]=k[b>>2];k[a+4>>2]=k[b+4>>2];k[a+8>>2]=k[b+8>>2];return;}function Uj(a,b){a=a|0;b=b|0;a=a+20|0;i[a>>0]=i[b>>0]|0;i[a+1>>0]=i[b+1>>0]|0;i[a+2>>0]=i[b+2>>0]|0;return;}function Vj(a,b){a=a|0;b=+b;o[a+24>>2]=b;return;}function Wj(a,b){a=a|0;b=b|0;i[a+28>>0]=b&1;return;}function Xj(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;f=u;u=u+16|0;d=f+4|0;e=f;c=sN(44,40063)|0;if(!c)c=0;else{Ie(c,b+4|0);g=c+16|0;b=b+20|0;k[g>>2]=k[b>>2];k[g+4>>2]=k[b+4>>2];k[g+8>>2]=k[b+8>>2];k[g+12>>2]=k[b+12>>2];k[g+16>>2]=k[b+16>>2];k[g+20>>2]=k[b+20>>2];k[g+24>>2]=k[b+24>>2];}k[e>>2]=0;k[d>>2]=k[e>>2];$f(a,c,d);u=f;return;}function Yj(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=u;u=u+32|0;e=c+8|0;f=c;d=a+32|0;Ms(f,a+64|0,b);Ts(e,a+56|0,f);k[d>>2]=k[e>>2];k[d+4>>2]=k[e+4>>2];k[d+8>>2]=k[e+8>>2];k[d+12>>2]=k[e+12>>2];u=c;return;}function Zj(a){a=a|0;return;}function _j(a,b){a=a|0;b=b|0;var c=0,d=0;d=b;c=k[d+4>>2]|0;b=a+48|0;k[b>>2]=k[d>>2];k[b+4>>2]=c;return;}function $j(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0;b=u;u=u+48|0;i=b+40|0;h=b+32|0;e=b+16|0;g=b+8|0;f=b;d=a+32|0;c=k[a+36>>2]|0;k[i>>2]=k[d>>2];k[i+4>>2]=c;c=k[a+44>>2]|0;k[h>>2]=k[a+40>>2];k[h+4>>2]=c;c=a+48|0;Ms(g,i,c);Ms(f,h,c);Ts(e,g,f);k[d>>2]=k[e>>2];k[d+4>>2]=k[e+4>>2];k[d+8>>2]=k[e+8>>2];k[d+12>>2]=k[e+12>>2];k[c>>2]=0;k[a+52>>2]=0;u=b;return;}function ak(a,b){a=a|0;b=b|0;var c=0;k[a>>2]=4156;Ie(a+4|0,b);c=a+20|0;b=b+16|0;k[c>>2]=k[b>>2];k[c+4>>2]=k[b+4>>2];k[c+8>>2]=k[b+8>>2];k[c+12>>2]=k[b+12>>2];k[c+16>>2]=k[b+16>>2];k[c+20>>2]=k[b+20>>2];k[c+24>>2]=k[b+24>>2];a=a+48|0;b=a+40|0;do{k[a>>2]=0;a=a+4|0;}while((a|0)<(b|0));return;}function bk(a){a=a|0;k[a>>2]=4216;xg(a+4|0);return;}function ck(a){a=a|0;k[a>>2]=4216;xg(a+4|0);vN(a);return;}function dk(a){a=a|0;return a+4|0;}function ek(a,b){a=a|0;b=b|0;return;}function fk(a,b){a=a|0;b=b|0;var c=0,d=0;d=b;c=k[d+4>>2]|0;b=a+56|0;k[b>>2]=k[d>>2];k[b+4>>2]=c;return;}function gk(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;b=u;u=u+16|0;f=b;d=a+48|0;c=a+56|0;Ms(f,d,c);e=k[f+4>>2]|0;k[d>>2]=k[f>>2];k[d+4>>2]=e;k[c>>2]=0;k[a+60>>2]=0;u=b;return;}function hk(a){a=a|0;return a+56|0;}function ik(a){a=a|0;return 1;}function jk(a,b){a=a|0;b=b|0;b=b+20|0;k[a>>2]=k[b>>2];k[a+4>>2]=k[b+4>>2];k[a+8>>2]=k[b+8>>2];return;}function kk(a,b){a=a|0;b=b|0;a=a+20|0;i[a>>0]=i[b>>0]|0;i[a+1>>0]=i[b+1>>0]|0;i[a+2>>0]=i[b+2>>0]|0;return;}function lk(a,b){a=a|0;b=+b;o[a+24>>2]=b;return;}function mk(a,b){a=a|0;b=b|0;i[a+28>>0]=b&1;return;}function nk(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;f=u;u=u+16|0;d=f+4|0;e=f;c=sN(52,40063)|0;if(!c)c=0;else vg(c,b+4|0);k[e>>2]=0;k[d>>2]=k[e>>2];wg(a,c,d);u=f;return;}function ok(a,b){a=a|0;b=b|0;k[a>>2]=4216;vg(a+4|0,b);o[a+56>>2]=0.0;o[a+60>>2]=0.0;return;}function pk(a){a=a|0;return;}function qk(a){a=a|0;vN(a);return;}function rk(a,b){a=a|0;b=b|0;return;}function sk(a,b){a=a|0;b=b|0;var c=0;a=u;u=u+16|0;c=a;b=Zd[k[(k[b>>2]|0)+56>>2]&255](b)|0;k[c>>2]=k[b>>2];k[b>>2]=0;b=b+4|0;k[c+4>>2]=k[b>>2];k[b>>2]=0;Rk(c);u=a;return;}function tk(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;a=k[(k[c>>2]|0)+8>>2]|0;d=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;Xd[a&255](c,d);return 10;}function uk(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0.0,h=0.0,i=0,j=0,l=0,m=0,n=0,p=0,q=0;q=u;u=u+64|0;m=q+56|0;i=q+48|0;j=q+40|0;e=q+28|0;n=q+16|0;f=q+8|0;p=q;l=Zd[k[(k[b>>2]|0)+32>>2]&255](b)|0;Xd[k[(k[b>>2]|0)+64>>2]&255](e,b);a=Zd[k[(k[b>>2]|0)+40>>2]&255](b)|0;Xd[k[(k[a>>2]|0)+8>>2]&255](n,a);ne[k[(k[l>>2]|0)+24>>2]&63](f,l,d);g=+ee[k[(k[l>>2]|0)+20>>2]&3](l);l=(Zd[k[(k[l>>2]|0)+16>>2]&255](l)|0)+8|0;h=+o[l>>2];k[p>>2]=0;l=p+4|0;k[l>>2]=0;switch(Zd[k[(k[b>>2]|0)+88>>2]&255](b)|0){case 0:{a=sN(48,40063)|0;if(!a)a=0;else Gf(a,n,e,f);k[j>>2]=0;k[m>>2]=k[j>>2];Qk(i,a,m);f=k[i>>2]|0;k[i>>2]=k[p>>2];k[p>>2]=f;f=i+4|0;j=k[f>>2]|0;k[f>>2]=k[l>>2];k[l>>2]=j;Rk(i);break;}case 1:{a=sN(44,40063)|0;if(!a)a=0;else Ye(a,n,f);k[j>>2]=0;k[m>>2]=k[j>>2];Sk(i,a,m);f=k[i>>2]|0;k[i>>2]=k[p>>2];k[p>>2]=f;f=i+4|0;j=k[f>>2]|0;k[f>>2]=k[l>>2];k[l>>2]=j;Rk(i);break;}case 2:{a=sN(48,40063)|0;if(!a)a=0;else ze(a,n,e,f);k[j>>2]=0;k[m>>2]=k[j>>2];Tk(i,a,m);f=k[i>>2]|0;k[i>>2]=k[p>>2];k[p>>2]=f;f=i+4|0;j=k[f>>2]|0;k[f>>2]=k[l>>2];k[l>>2]=j;Rk(i);break;}case 3:{a=sN(48,40063)|0;if(!a)a=0;else tf(a,n,e,f,g/h);k[j>>2]=0;k[m>>2]=k[j>>2];Uk(i,a,m);f=k[i>>2]|0;k[i>>2]=k[p>>2];k[p>>2]=f;f=i+4|0;j=k[f>>2]|0;k[f>>2]=k[l>>2];k[l>>2]=j;Rk(i);break;}case 4:{a=sN(56,40063)|0;if(!a)a=0;else Tf(a,n,e,f);k[j>>2]=0;k[m>>2]=k[j>>2];Vk(i,a,m);f=k[i>>2]|0;k[i>>2]=k[p>>2];k[p>>2]=f;f=i+4|0;j=k[f>>2]|0;k[f>>2]=k[l>>2];k[l>>2]=j;Rk(i);break;}case 5:{a=sN(56,40063)|0;if(!a)a=0;else eg(a,n,e,f);k[j>>2]=0;k[m>>2]=k[j>>2];Wk(i,a,m);f=k[i>>2]|0;k[i>>2]=k[p>>2];k[p>>2]=f;f=i+4|0;j=k[f>>2]|0;k[f>>2]=k[l>>2];k[l>>2]=j;Rk(i);break;}default:Zd[k[(k[b>>2]|0)+88>>2]&255](b)|0;}if(!(k[p>>2]|0)){m=k[(k[c>>2]|0)+8>>2]|0;a=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;Xd[m&255](c,a);a=22;}else{d=Zd[k[(k[b>>2]|0)+56>>2]&255](b)|0;e=k[p>>2]|0;k[m>>2]=e;f=m+4|0;a=k[l>>2]|0;k[f>>2]=a;if(a|0)mN(a);k[m>>2]=k[d>>2];k[d>>2]=e;l=d+4|0;k[f>>2]=k[l>>2];k[l>>2]=a;Rk(m);a=0;}Rk(p);CN(n);u=q;return a|0;}function vk(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=u;u=u+16|0;a=e;c=Zd[k[(k[b>>2]|0)+56>>2]&255](b)|0;if(k[c>>2]|0){b=Zd[k[(k[b>>2]|0)+32>>2]&255](b)|0;ne[k[(k[b>>2]|0)+24>>2]&63](a,b,d);d=k[c>>2]|0;Xd[k[(k[d>>2]|0)+12>>2]&255](d,a);}u=e;return 0;}function wk(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,l=0;j=u;u=u+48|0;g=j+32|0;e=j+24|0;h=j+16|0;i=j+8|0;f=j;a=Zd[k[(k[b>>2]|0)+56>>2]&255](b)|0;if(k[a>>2]|0?(l=Zd[k[(k[b>>2]|0)+32>>2]&255](b)|0,ne[k[(k[l>>2]|0)+24>>2]&63](e,l,d),d=k[a>>2]|0,Xd[k[(k[d>>2]|0)+12>>2]&255](d,e),d=k[a>>2]|0,Zd[k[(k[d>>2]|0)+16>>2]&255](d)|0):0){l=k[a>>2]|0;Xd[k[(k[l>>2]|0)+20>>2]&255](h,l);if(k[h>>2]|0){a=Zd[k[(k[b>>2]|0)+24>>2]&255](b)|0;Xd[k[(k[a>>2]|0)+32>>2]&255](a,h);a=sN(12,40063)|0;if(!a)a=0;else Dk(a,h);k[f>>2]=0;k[g>>2]=k[f>>2];Ek(i,a,g);a=Zd[k[(k[b>>2]|0)+48>>2]&255](b)|0;e=k[(k[a>>2]|0)+8>>2]|0;k[g>>2]=k[i>>2];d=k[i+4>>2]|0;k[g+4>>2]=d;if(d|0)mN(d);Xd[e&255](a,g);Sg(g);Fk(i);}Ng(h);}i=k[(k[c>>2]|0)+8>>2]|0;l=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;Xd[i&255](c,l);u=j;return 0;}function xk(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0;f=u;u=u+16|0;a=f;d=Zd[k[(k[b>>2]|0)+56>>2]&255](b)|0;e=k[d>>2]|0;if(e|0?Zd[k[(k[e>>2]|0)+16>>2]&255](e)|0:0){e=Zd[k[(k[b>>2]|0)+24>>2]&255](b)|0;g=k[(k[e>>2]|0)+32>>2]|0;d=k[d>>2]|0;Xd[k[(k[d>>2]|0)+20>>2]&255](a,d);Xd[g&255](e,a);Ng(a);}e=k[(k[c>>2]|0)+8>>2]|0;g=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;Xd[e&255](c,g);u=f;return 0;}function yk(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function zk(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function Ak(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function Bk(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function Ck(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function Dk(a,b){a=a|0;b=b|0;k[a>>2]=4368;Kg(a+4|0,b);k[a>>2]=4392;return;}function Ek(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=4340;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Fk(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function Gk(a){a=a|0;kN(a);vN(a);return;}function Hk(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function Ik(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==12080?a+12|0:0)|0;}function Jk(a){a=a|0;vN(a);return;}function Kk(a){a=a|0;Ng(a+4|0);return;}function Lk(a){a=a|0;Ng(a+4|0);vN(a);return;}function Mk(a,b){a=a|0;b=b|0;Mg(a+4|0,b);return;}function Nk(a,b){a=a|0;b=b|0;Lg(a+4|0,b);return;}function Ok(a){a=a|0;return;}function Pk(a){a=a|0;vN(a);return;}function Qk(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=4556;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Rk(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function Sk(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=4528;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Tk(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=4500;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Uk(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=4472;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Vk(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=4444;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Wk(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=4416;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Xk(a){a=a|0;kN(a);vN(a);return;}function Yk(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function Zk(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==12265?a+12|0:0)|0;}function _k(a){a=a|0;vN(a);return;}function $k(a){a=a|0;kN(a);vN(a);return;}function al(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function bl(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==12416?a+12|0:0)|0;}function cl(a){a=a|0;vN(a);return;}function dl(a){a=a|0;kN(a);vN(a);return;}function el(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function fl(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==12557?a+12|0:0)|0;}function gl(a){a=a|0;vN(a);return;}function hl(a){a=a|0;kN(a);vN(a);return;}function il(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function jl(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==12700?a+12|0:0)|0;}function kl(a){a=a|0;vN(a);return;}function ll(a){a=a|0;kN(a);vN(a);return;}function ml(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function nl(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==12843?a+12|0:0)|0;}function ol(a){a=a|0;vN(a);return;}function pl(a){a=a|0;kN(a);vN(a);return;}function ql(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function rl(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==12984?a+12|0:0)|0;}function sl(a){a=a|0;vN(a);return;}function tl(a){a=a|0;vN(a);return;}function ul(a,b){a=a|0;b=b|0;b=Zd[k[(k[b>>2]|0)+28>>2]&255](b)|0;Wd[k[(k[b>>2]|0)+24>>2]&511](b);return;}function vl(a,b){a=a|0;b=b|0;return;}function wl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0;h=u;u=u+32|0;f=h+8|0;g=h;ne[k[(k[b>>2]|0)+60>>2]&63](f,b,d);a=k[f>>2]|0;k[g>>2]=a;e=k[f+4>>2]|0;k[g+4>>2]=e;if(e){mN(e);a=k[g>>2]|0;}if((a|0)!=0?(k[a+12>>2]|0)>>>0>2:0){d=k[(k[c>>2]|0)+8>>2]|0;a=Zd[k[(k[b>>2]|0)+16>>2]&255](b)|0;Xd[d&255](c,a);a=1e3;}else if((Zd[k[(k[b>>2]|0)+88>>2]&255](b)|0)==6?je[k[(k[b>>2]|0)+100>>2]&127](b,d)|0:0){d=k[(k[c>>2]|0)+8>>2]|0;a=Zd[k[(k[b>>2]|0)+20>>2]&255](b)|0;Xd[d&255](c,a);a=0;}else a=1;Ng(g);Ng(f);u=h;return a|0;}function xl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0;g=u;u=u+32|0;e=g+8|0;f=g;ne[k[(k[b>>2]|0)+60>>2]&63](e,b,d);a=k[e>>2]|0;k[f>>2]=a;d=k[e+4>>2]|0;k[f+4>>2]=d;if(d){mN(d);a=k[f>>2]|0;}if((a|0)!=0?(k[a+12>>2]|0)>>>0>2:0){d=k[(k[c>>2]|0)+8>>2]|0;a=Zd[k[(k[b>>2]|0)+16>>2]&255](b)|0;Xd[d&255](c,a);a=1e3;}else if((Zd[k[(k[b>>2]|0)+88>>2]&255](b)|0)==6)a=1;else{d=k[(k[c>>2]|0)+8>>2]|0;a=Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0;Xd[d&255](c,a);a=1e3;}Ng(f);Ng(e);u=g;return a|0;}function yl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function zl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function Al(a,b,c){a=a|0;b=b|0;c=c|0;return 1;}function Bl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;d=u;u=u+16|0;a=d;o[a>>2]=.5;o[a+4>>2]=.5;if(je[k[(k[b>>2]|0)+100>>2]&127](b,a)|0){e=k[(k[c>>2]|0)+8>>2]|0;a=Zd[k[(k[b>>2]|0)+20>>2]&255](b)|0;Xd[e&255](c,a);a=1e3;}else a=10;u=d;return a|0;}function Cl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function Dl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function El(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function Fl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function Gl(a){a=a|0;k[a>>2]=4648;Ng(a+28|0);return;}function Hl(a){a=a|0;k[a>>2]=4648;Ng(a+28|0);vN(a);return;}function Il(a,b){a=a|0;b=b|0;i[a+4>>0]=0;return;}function Jl(a,b){a=a|0;b=b|0;var c=0,d=0;c=u;u=u+16|0;d=c;Wd[k[(k[b>>2]|0)+76>>2]&511](b);b=a+28|0;k[d>>2]=k[b>>2];k[b>>2]=0;b=a+32|0;k[d+4>>2]=k[b>>2];k[b>>2]=0;Ng(d);u=c;return;}function Kl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0;i=u;u=u+32|0;g=i+8|0;h=i;ne[k[(k[b>>2]|0)+60>>2]&63](g,b,d);e=k[g>>2]|0;k[h>>2]=e;a=k[g+4>>2]|0;k[h+4>>2]=a;if(!a){d=h;a=e;}else{mN(a);d=h;a=k[h>>2]|0;}do if((a|0)!=0?(f=k[a+12>>2]|0,f>>>0>2):0){if((((f|0)==7?je[k[(k[b>>2]|0)+80>>2]&127](b,a)|0:0)?(f=Zd[k[(k[b>>2]|0)+68>>2]&255](b)|0,((k[f+4>>2]|0)-(k[f>>2]|0)|0)==8):0)?je[k[(k[b>>2]|0)+104>>2]&127](b,k[h>>2]|0)|0:0){f=k[(k[c>>2]|0)+8>>2]|0;a=Zd[k[(k[b>>2]|0)+20>>2]&255](b)|0;Xd[f&255](c,a);a=1e3;break;}Wd[k[(k[b>>2]|0)+76>>2]&511](b);if(je[k[(k[b>>2]|0)+72>>2]&127](b,k[d>>2]|0)|0)a=0;else{f=k[(k[c>>2]|0)+8>>2]|0;a=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;Xd[f&255](c,a);a=10;}}else j=6;while(0);if((j|0)==6){j=k[(k[c>>2]|0)+8>>2]|0;a=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;Xd[j&255](c,a);a=0;}Ng(h);Ng(g);u=i;return a|0;}function Ll(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0,m=0;m=u;u=u+32|0;h=m+8|0;j=m;ne[k[(k[b>>2]|0)+60>>2]&63](h,b,d);f=k[h>>2]|0;k[j>>2]=f;e=k[h+4>>2]|0;k[j+4>>2]=e;if(!e)g=j;else{mN(e);g=j;f=k[j>>2]|0;}e=i[h+8>>0]|0;do if((f|0)!=0?(k[f+12>>2]|0)>>>0>2:0){if(!(e<<24>>24)){if(!(je[k[(k[b>>2]|0)+80>>2]&127](b,f)|0)?(Wd[k[(k[b>>2]|0)+76>>2]&511](b),!(je[k[(k[b>>2]|0)+72>>2]&127](b,k[g>>2]|0)|0)):0){d=k[(k[c>>2]|0)+8>>2]|0;e=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;Xd[d&255](c,e);e=10;break;}e=(mn(a,b,0,d)|0)&1;i[a+4>>0]=e;e=0;break;}else{f=Zd[k[(k[b>>2]|0)+68>>2]&255](b)|0;if(((k[f+4>>2]|0)-(k[f>>2]|0)|0)!=8?(Wd[k[(k[b>>2]|0)+76>>2]&511](b),!(je[k[(k[b>>2]|0)+72>>2]&127](b,k[g>>2]|0)|0)):0){d=k[(k[c>>2]|0)+8>>2]|0;e=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;Xd[d&255](c,e);e=10;break;}e=(mn(a,b,e,d)|0)&1;i[a+4>>0]=e;e=0;break;}}else l=6;while(0);if((l|0)==6){l=k[(k[c>>2]|0)+8>>2]|0;e=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;Xd[l&255](c,e);e=1e3;}Ng(j);Ng(h);u=m;return e|0;}function Ml(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if(i[a+4>>0]|0)kn(a,b,d);return 0;}function Nl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if(i[a+4>>0]|0){kn(a,b,d);Um(a,b);}return 0;}function Ol(a,b,c){a=a|0;b=b|0;c=c|0;if(i[a+4>>0]|0)Um(a,b);return 0;}function Pl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function Ql(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function Rl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;h=u;u=u+48|0;e=h+24|0;f=h+16|0;g=h;k[e>>2]=0;k[e+4>>2]=0;k[e+8>>2]=0;a=Zd[k[(k[b>>2]|0)+68>>2]&255](b)|0;c=k[a+4>>2]|0;a=k[a>>2]|0;while(1){if((a|0)==(c|0))break;j=k[a>>2]|0;Xd[k[(k[j>>2]|0)+32>>2]&255](g,j);i[f>>0]=i[g>>0]|0;i[f+1>>0]=i[g+1>>0]|0;i[f+2>>0]=i[g+2>>0]|0;j=k[a>>2]|0;Xd[k[(k[j>>2]|0)+36>>2]&255](j,d);j=k[a>>2]|0;Fm(e,Zd[k[(k[j>>2]|0)+8>>2]&255](j)|0,f,d);a=a+8|0;}Wd[k[(k[b>>2]|0)+84>>2]&511](b);j=Zd[k[(k[b>>2]|0)+48>>2]&255](b)|0;d=k[(k[j>>2]|0)+8>>2]|0;Vl(f,e);Xd[d&255](j,f);Sg(f);Tg(e);u=h;return 0;}function Sl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0.0,m=0;i=u;u=u+48|0;e=i+28|0;f=i+24|0;g=i+16|0;h=i;k[e>>2]=0;k[e+4>>2]=0;k[e+8>>2]=0;a=Zd[k[(k[b>>2]|0)+32>>2]&255](b)|0;j=+pm(a,+(l[d>>0]|0));o[f>>2]=j;a=Zd[k[(k[b>>2]|0)+68>>2]&255](b)|0;c=k[a+4>>2]|0;d=h+4|0;a=k[a>>2]|0;while(1){if((a|0)==(c|0))break;m=k[a>>2]|0;Xd[k[(k[m>>2]|0)+32>>2]&255](h,m);k[g>>2]=k[d>>2];m=k[a>>2]|0;Vd[k[(k[m>>2]|0)+40>>2]&7](m,+o[f>>2]);m=k[a>>2]|0;qm(e,Zd[k[(k[m>>2]|0)+8>>2]&255](m)|0,g,f);a=a+8|0;}Wd[k[(k[b>>2]|0)+84>>2]&511](b);m=Zd[k[(k[b>>2]|0)+48>>2]&255](b)|0;b=k[(k[m>>2]|0)+8>>2]|0;Vl(g,e);Xd[b&255](m,g);Sg(g);Tg(e);u=i;return 0;}function Tl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0;j=u;u=u+48|0;e=j+36|0;f=j+24|0;g=j+16|0;h=j;i[e>>0]=d&1;k[f>>2]=0;k[f+4>>2]=0;k[f+8>>2]=0;a=Zd[k[(k[b>>2]|0)+68>>2]&255](b)|0;c=k[a+4>>2]|0;d=h+8|0;a=k[a>>2]|0;while(1){if((a|0)==(c|0))break;l=k[a>>2]|0;Xd[k[(k[l>>2]|0)+32>>2]&255](h,l);i[g>>0]=i[d>>0]|0;l=k[a>>2]|0;Xd[k[(k[l>>2]|0)+44>>2]&255](l,(i[e>>0]|0)!=0);l=k[a>>2]|0;Ul(f,Zd[k[(k[l>>2]|0)+8>>2]&255](l)|0,g,e);a=a+8|0;}Wd[k[(k[b>>2]|0)+84>>2]&511](b);l=Zd[k[(k[b>>2]|0)+48>>2]&255](b)|0;b=k[(k[l>>2]|0)+8>>2]|0;Vl(g,f);Xd[b&255](l,g);Sg(g);Tg(f);u=j;return 0;}function Ul(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;j=u;u=u+32|0;g=j+16|0;h=j+8|0;f=j;e=sN(28,40063)|0;if(!e)e=0;else am(e,b,(i[c>>0]|0)!=0,(i[d>>0]|0)!=0);k[f>>2]=0;k[g>>2]=k[f>>2];bm(h,e,g);e=k[h>>2]|0;if(e|0){k[g>>2]=e;c=g+4|0;e=k[h+4>>2]|0;k[c>>2]=e;if(e|0)mN(e);e=a+4|0;b=k[e>>2]|0;if(b>>>0<(k[a+8>>2]|0)>>>0){k[b>>2]=k[g>>2];k[b+4>>2]=k[c>>2];k[g>>2]=0;k[c>>2]=0;k[e>>2]=b+8;}else cm(a,g);Sg(g);}dm(h);u=j;return;}function Vl(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;h=u;u=u+32|0;e=h+16|0;f=h+8|0;g=h;c=k[b>>2]|0;d=k[b+4>>2]|0;do if((c|0)==(d|0)){k[a>>2]=0;k[a+4>>2]=0;}else{if((d-c|0)==8){k[a>>2]=k[c>>2];c=k[c+4>>2]|0;k[a+4>>2]=c;if(!c)break;mN(c);break;}c=sN(16,40063)|0;if(!c)c=0;else Ug(c,b);k[g>>2]=0;k[e>>2]=k[g>>2];Wl(f,c,e);k[a>>2]=k[f>>2];g=f+4|0;k[a+4>>2]=k[g>>2];k[f>>2]=0;k[g>>2]=0;Xl(f);}while(0);u=h;return;}function Wl(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=4712;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Xl(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function Yl(a){a=a|0;kN(a);vN(a);return;}function Zl(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function _l(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==13201?a+12|0:0)|0;}function $l(a){a=a|0;vN(a);return;}function am(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a>>2]=4768;AN(a+4|0,b);i[a+16>>0]=c&1;i[a+17>>0]=d&1;k[a+20>>2]=44;k[a+24>>2]=1;k[a>>2]=4792;return;}function bm(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=4740;k[c+12>>2]=b;k[a+4>>2]=c;return;}function cm(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;g=u;u=u+32|0;c=g;d=k[a+4>>2]|0;e=k[a>>2]|0;f=(d-e>>3)+1|0;if(f>>>0>536870911)jN(a);else{i=(k[a+8>>2]|0)-e|0;h=i>>2;eh(c,i>>3>>>0<268435455?h>>>0<f>>>0?f:h:536870911,d-e>>3,a+8|0);f=c+8|0;e=k[f>>2]|0;k[e>>2]=k[b>>2];d=b+4|0;k[e+4>>2]=k[d>>2];k[b>>2]=0;k[d>>2]=0;k[f>>2]=e+8;fh(a,c);gh(c);u=g;return;}}function dm(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function em(a){a=a|0;kN(a);vN(a);return;}function fm(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function gm(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==13352?a+12|0:0)|0;}function hm(a){a=a|0;vN(a);return;}function im(a){a=a|0;k[a>>2]=4768;CN(a+4|0);return;}function jm(a){a=a|0;k[a>>2]=4768;CN(a+4|0);vN(a);return;}function km(a,b){a=a|0;b=b|0;mm(a,b,a+16|0);return;}function lm(a,b){a=a|0;b=b|0;mm(a,b,a+17|0);return;}function mm(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,j=0;h=u;u=u+16|0;f=h+8|0;g=h;nm(f,a,b);e=k[f>>2]|0;if(e|0){d=k[a+20>>2]|0;j=k[a+24>>2]|0;a=e+(j>>1)|0;if(j&1)d=k[(k[a>>2]|0)+d>>2]|0;Xd[d&255](a,(i[c>>0]|0)!=0);j=k[(k[b>>2]|0)+48>>2]|0;c=k[f>>2]|0;Xd[k[(k[c>>2]|0)+48>>2]&255](g,c);Xd[j&255](b,g);Ng(g);}xh(f);u=h;return;}function nm(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=u;u=u+16|0;d=e;ne[k[(k[c>>2]|0)+28>>2]&63](d,c,b+4|0);b=k[d>>2]|0;if(!b){k[a>>2]=0;k[a+4>>2]=0;}else bi(a,b);Ng(d);u=e;return;}function om(a){a=a|0;k[a>>2]=4768;CN(a+4|0);vN(a);return;}function pm(a,b){a=a|0;b=+b;var c=0;c=(Zd[k[(k[a>>2]|0)+16>>2]&255](a)|0)+8|0;b=+o[c>>2]*b;return+(b/+ee[k[(k[a>>2]|0)+20>>2]&3](a));}function qm(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;i=u;u=u+32|0;g=i+16|0;h=i+8|0;f=i;e=sN(32,40063)|0;if(!e)e=0;else rm(e,b,+o[c>>2],+o[d>>2]);k[f>>2]=0;k[g>>2]=k[f>>2];sm(h,e,g);e=k[h>>2]|0;if(e|0){k[g>>2]=e;c=g+4|0;e=k[h+4>>2]|0;k[c>>2]=e;if(e|0)mN(e);e=a+4|0;b=k[e>>2]|0;if(b>>>0<(k[a+8>>2]|0)>>>0){k[b>>2]=k[g>>2];k[b+4>>2]=k[c>>2];k[g>>2]=0;k[c>>2]=0;k[e>>2]=b+8;}else cm(a,g);Sg(g);}tm(h);u=i;return;}function rm(a,b,c,d){a=a|0;b=b|0;c=+c;d=+d;k[a>>2]=4844;AN(a+4|0,b);o[a+16>>2]=c;o[a+20>>2]=d;k[a+24>>2]=40;k[a+28>>2]=1;k[a>>2]=4868;return;}function sm(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=4816;k[c+12>>2]=b;k[a+4>>2]=c;return;}function tm(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function um(a){a=a|0;kN(a);vN(a);return;}function vm(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function wm(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==13603?a+12|0:0)|0;}function xm(a){a=a|0;vN(a);return;}function ym(a){a=a|0;k[a>>2]=4844;CN(a+4|0);return;}function zm(a){a=a|0;k[a>>2]=4844;CN(a+4|0);vN(a);return;}function Am(a,b){a=a|0;b=b|0;Cm(a,b,a+16|0);return;}function Bm(a,b){a=a|0;b=b|0;Cm(a,b,a+20|0);return;}function Cm(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0;h=u;u=u+16|0;f=h+8|0;g=h;Dm(f,a,b);e=k[f>>2]|0;if(e|0){d=k[a+24>>2]|0;i=k[a+28>>2]|0;a=e+(i>>1)|0;if(i&1)d=k[(k[a>>2]|0)+d>>2]|0;Vd[d&7](a,+o[c>>2]);i=k[(k[b>>2]|0)+48>>2]|0;c=k[f>>2]|0;Xd[k[(k[c>>2]|0)+48>>2]&255](g,c);Xd[i&255](b,g);Ng(g);}xh(f);u=h;return;}function Dm(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=u;u=u+16|0;d=e;ne[k[(k[c>>2]|0)+28>>2]&63](d,c,b+4|0);b=k[d>>2]|0;if(!b){k[a>>2]=0;k[a+4>>2]=0;}else bi(a,b);Ng(d);u=e;return;}function Em(a){a=a|0;k[a>>2]=4844;CN(a+4|0);vN(a);return;}function Fm(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;i=u;u=u+32|0;g=i+16|0;h=i+8|0;f=i;e=sN(32,40063)|0;if(!e)e=0;else Gm(e,b,c,d);k[f>>2]=0;k[g>>2]=k[f>>2];Hm(h,e,g);e=k[h>>2]|0;if(e|0){k[g>>2]=e;c=g+4|0;e=k[h+4>>2]|0;k[c>>2]=e;if(e|0)mN(e);e=a+4|0;b=k[e>>2]|0;if(b>>>0<(k[a+8>>2]|0)>>>0){k[b>>2]=k[g>>2];k[b+4>>2]=k[c>>2];k[g>>2]=0;k[c>>2]=0;k[e>>2]=b+8;}else cm(a,g);Sg(g);}Im(h);u=i;return;}function Gm(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a>>2]=4920;AN(a+4|0,b);b=a+16|0;i[b>>0]=i[c>>0]|0;i[b+1>>0]=i[c+1>>0]|0;i[b+2>>0]=i[c+2>>0]|0;c=a+19|0;i[c>>0]=i[d>>0]|0;i[c+1>>0]=i[d+1>>0]|0;i[c+2>>0]=i[d+2>>0]|0;k[a+24>>2]=36;k[a+28>>2]=1;k[a>>2]=4944;return;}function Hm(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=4892;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Im(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function Jm(a){a=a|0;kN(a);vN(a);return;}function Km(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function Lm(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==13854?a+12|0:0)|0;}function Mm(a){a=a|0;vN(a);return;}function Nm(a){a=a|0;k[a>>2]=4920;CN(a+4|0);return;}function Om(a){a=a|0;k[a>>2]=4920;CN(a+4|0);vN(a);return;}function Pm(a,b){a=a|0;b=b|0;Rm(a,b,a+16|0);return;}function Qm(a,b){a=a|0;b=b|0;Rm(a,b,a+19|0);return;}function Rm(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0;h=u;u=u+16|0;f=h+8|0;g=h;Sm(f,a,b);e=k[f>>2]|0;if(e|0){d=k[a+24>>2]|0;i=k[a+28>>2]|0;a=e+(i>>1)|0;if(i&1)d=k[(k[a>>2]|0)+d>>2]|0;Xd[d&255](a,c);i=k[(k[b>>2]|0)+48>>2]|0;c=k[f>>2]|0;Xd[k[(k[c>>2]|0)+48>>2]&255](g,c);Xd[i&255](b,g);Ng(g);}xh(f);u=h;return;}function Sm(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=u;u=u+16|0;d=e;ne[k[(k[c>>2]|0)+28>>2]&63](d,c,b+4|0);b=k[d>>2]|0;if(!b){k[a>>2]=0;k[a+4>>2]=0;}else bi(a,b);Ng(d);u=e;return;}function Tm(a){a=a|0;k[a>>2]=4920;CN(a+4|0);vN(a);return;}function Um(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;g=u;u=u+32|0;c=g+8|0;d=g;i[a+4>>0]=0;e=Zd[k[(k[b>>2]|0)+68>>2]&255](b)|0;f=k[e>>2]|0;if((f|0)!=(k[e+4>>2]|0)){k[c>>2]=0;k[c+4>>2]=0;k[c+8>>2]=0;if(!(i[a+16>>0]|0))Vm(a,e,c);else Wm(a,k[f>>2]|0,c);Wd[k[(k[b>>2]|0)+84>>2]&511](b);f=Zd[k[(k[b>>2]|0)+48>>2]&255](b)|0;e=k[(k[f>>2]|0)+8>>2]|0;Vl(d,c);Xd[e&255](f,d);Sg(d);Tg(c);}u=g;return;}function Vm(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=k[b+4>>2]|0;d=a+20|0;a=k[b>>2]|0;while(1){if((a|0)==(e|0))break;b=k[a>>2]|0;Wd[k[(k[b>>2]|0)+20>>2]&511](b);b=k[a>>2]|0;cn(c,Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0,d);a=a+8|0;}return;}function Wm(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;d=u;u=u+16|0;e=d;Wd[k[(k[b>>2]|0)+20>>2]&511](b);f=a+28|0;Xd[k[(k[b>>2]|0)+48>>2]&255](e,b);Xm(c,f,e);Ng(e);k[e>>2]=k[f>>2];k[f>>2]=0;c=a+32|0;k[e+4>>2]=k[c>>2];k[c>>2]=0;Ng(e);u=d;return;}function Xm(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;h=u;u=u+32|0;f=h+16|0;g=h+8|0;e=h;d=sN(20,40063)|0;if(!d)d=0;else rh(d,b,c);k[e>>2]=0;k[f>>2]=k[e>>2];Ym(g,d,f);d=k[g>>2]|0;if(d|0){k[f>>2]=d;c=f+4|0;d=k[g+4>>2]|0;k[c>>2]=d;if(d|0)mN(d);d=a+4|0;b=k[d>>2]|0;if(b>>>0<(k[a+8>>2]|0)>>>0){k[b>>2]=k[f>>2];k[b+4>>2]=k[c>>2];k[f>>2]=0;k[c>>2]=0;k[d>>2]=b+8;}else cm(a,f);Sg(f);}Zm(g);u=h;return;}function Ym(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=4968;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Zm(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function _m(a){a=a|0;kN(a);vN(a);return;}function $m(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function an(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==14106?a+12|0:0)|0;}function bn(a){a=a|0;vN(a);return;}function cn(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;h=u;u=u+32|0;f=h+16|0;g=h+8|0;e=h;d=sN(24,40063)|0;if(!d)d=0;else yh(d,b,c);k[e>>2]=0;k[f>>2]=k[e>>2];dn(g,d,f);d=k[g>>2]|0;if(d|0){k[f>>2]=d;c=f+4|0;d=k[g+4>>2]|0;k[c>>2]=d;if(d|0)mN(d);d=a+4|0;b=k[d>>2]|0;if(b>>>0<(k[a+8>>2]|0)>>>0){k[b>>2]=k[f>>2];k[b+4>>2]=k[c>>2];k[f>>2]=0;k[c>>2]=0;k[d>>2]=b+8;}else cm(a,f);Sg(f);}en(g);u=h;return;}function dn(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=4996;k[c+12>>2]=b;k[a+4>>2]=c;return;}function en(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function fn(a){a=a|0;kN(a);vN(a);return;}function gn(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function hn(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==14263?a+12|0:0)|0;}function jn(a){a=a|0;vN(a);return;}function kn(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0;e=u;u=u+16|0;f=e+8|0;g=e;d=Zd[k[(k[b>>2]|0)+68>>2]&255](b)|0;b=Zd[k[(k[b>>2]|0)+32>>2]&255](b)|0;ne[k[(k[b>>2]|0)+24>>2]&63](f,b,c);b=a+20|0;Ns(g,f,a+8|0);f=k[g+4>>2]|0;c=b;k[c>>2]=k[g>>2];k[c+4>>2]=f;c=k[d>>2]|0;do if((c|0)!=(k[d+4>>2]|0))if(!(i[a+16>>0]|0)){ln(a,d);break;}else{g=k[c>>2]|0;Xd[k[(k[g>>2]|0)+16>>2]&255](g,b);break;}while(0);u=e;return;}function ln(a,b){a=a|0;b=b|0;var c=0,d=0;d=k[b+4>>2]|0;c=a+20|0;a=k[b>>2]|0;while(1){if((a|0)==(d|0))break;b=k[a>>2]|0;Xd[k[(k[b>>2]|0)+16>>2]&255](b,c);a=a+8|0;}return;}function mn(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0;j=u;u=u+16|0;g=j;h=j+8|0;e=Zd[k[(k[b>>2]|0)+68>>2]&255](b)|0;f=e+4|0;a:do if((k[e>>2]|0)==(k[f>>2]|0))b=0;else{i[a+4>>0]=1;l=Zd[k[(k[b>>2]|0)+32>>2]&255](b)|0;ne[k[(k[l>>2]|0)+24>>2]&63](g,l,d);l=g;d=k[l+4>>2]|0;b=a+8|0;k[b>>2]=k[l>>2];k[b+4>>2]=d;i[a+16>>0]=c;b=k[e>>2]|0;if(c<<24>>24){f=k[b>>2]|0;Xd[k[(k[f>>2]|0)+12>>2]&255](f,c);c=a+28|0;b=k[b>>2]|0;Xd[k[(k[b>>2]|0)+48>>2]&255](h,b);b=k[h>>2]|0;f=h+4|0;l=k[f>>2]|0;k[h>>2]=0;k[f>>2]=0;k[g>>2]=k[c>>2];k[c>>2]=b;b=a+32|0;k[g+4>>2]=k[b>>2];k[b>>2]=l;Ng(g);Ng(h);b=1;break;}d=k[f>>2]|0;while(1){if((b|0)==(d|0)){b=1;break a;}l=k[b>>2]|0;Xd[k[(k[l>>2]|0)+12>>2]&255](l,0);b=b+8|0;}}while(0);u=j;return b|0;}function nn(a){a=a|0;k[a>>2]=5024;Pn(a+116|0);io(a+104|0);Rk(a+96|0);jo(a+88|0);jo(a+80|0);jo(a+72|0);jo(a+64|0);ko(a+36|0);lo(a+28|0);mo(a+20|0);no(a+12|0);oo(a+4|0);return;}function on(a){a=a|0;nn(a);vN(a);return;}function pn(a){a=a|0;return a+64|0;}function qn(a){a=a|0;return a+72|0;}function rn(a){a=a|0;return a+80|0;}function sn(a){a=a|0;return a+88|0;}function tn(a){a=a|0;return k[a+4>>2]|0;}function un(a){a=a|0;return k[a+12>>2]|0;}function vn(a){a=a|0;return k[a+44>>2]|0;}function wn(a){a=a|0;return k[a+48>>2]|0;}function xn(a){a=a|0;return k[a+20>>2]|0;}function yn(a){a=a|0;return k[a+28>>2]|0;}function zn(a){a=a|0;return k[a+52>>2]|0;}function An(a){a=a|0;return a+36|0;}function Bn(a){a=a|0;return a+96|0;}function Cn(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;d=u;u=u+16|0;e=d;f=k[b+12>>2]|0;ne[k[(k[f>>2]|0)+32>>2]&63](e,f,c);c=k[b+4>>2]|0;ne[k[(k[c>>2]|0)+24>>2]&63](a,c,e);i[a+8>>0]=i[e+4>>0]|0;u=d;return;}function Dn(a,b){a=a|0;b=b|0;var c=0.0,d=0,e=0;e=b+48|0;d=k[e>>2]|0;c=+pm(k[b+44>>2]|0,+(l[d>>0]|0));b=i[(k[e>>2]|0)+4>>0]|0;d=d+1|0;i[a>>0]=i[d>>0]|0;i[a+1>>0]=i[d+1>>0]|0;i[a+2>>0]=i[d+2>>0]|0;o[a+4>>2]=c;i[a+8>>0]=b;return;}function En(a){a=a|0;return a+104|0;}function Fn(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,l=0;l=u;u=u+48|0;f=l+40|0;h=l+32|0;g=l+16|0;e=l+8|0;d=l;if(je[k[(k[a>>2]|0)+80>>2]&127](a,b)|0)c=1;else{bi(h,b);c=k[h>>2]|0;if(!c)c=0;else{if((k[b+12>>2]|0)>>>0>2){c=k[a+4>>2]|0;ne[k[(k[c>>2]|0)+40>>2]&63](g,c,b);if(i[g>>0]|0){c=sN(20,40063)|0;if(!c)c=0;else Dh(c,b,j[g+2>>1]|0,j[g+4>>1]|0);k[d>>2]=0;k[f>>2]=k[d>>2];Wn(e,c,f);c=k[a+52>>2]|0;b=k[(k[c>>2]|0)+8>>2]|0;k[f>>2]=k[e>>2];d=k[e+4>>2]|0;k[f+4>>2]=d;if(d|0)mN(d);Xd[b&255](c,f);Sg(f);Xn(e);}c=k[h>>2]|0;}if(Zd[k[(k[c>>2]|0)+28>>2]&255](c)|0){e=k[a+48>>2]|0;d=k[h>>2]|0;Xd[k[(k[d>>2]|0)+32>>2]&255](g,d);Yn(f,a,g);i[e>>0]=i[f>>0]|0;i[e+1>>0]=i[f+1>>0]|0;i[e+2>>0]=i[f+2>>0]|0;i[e+3>>0]=i[f+3>>0]|0;i[e+4>>0]=i[f+4>>0]|0;bh(k[a+36>>2]|0);}d=a+108|0;c=k[d>>2]|0;if((c|0)==(k[a+112>>2]|0))Zn(a+104|0,h);else{k[c>>2]=k[h>>2];b=k[h+4>>2]|0;k[c+4>>2]=b;if(b){mN(b);c=k[d>>2]|0;}k[d>>2]=c+8;}c=k[a+12>>2]|0;Wd[k[(k[c>>2]|0)+24>>2]&511](c);c=1;}xh(h);}u=l;return c|0;}function Gn(a){a=a|0;var b=0,c=0,d=0;b=k[a+104>>2]|0;c=a+108|0;while(1){d=k[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;k[c>>2]=d;xh(d);}d=k[a+12>>2]|0;Wd[k[(k[d>>2]|0)+24>>2]&511](d);return;}function Hn(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0;m=a+108|0;h=k[m>>2]|0;j=b+11|0;l=b+4|0;a=k[a+104>>2]|0;a:while(1){if((a|0)==(h|0)){a=h;break;}c=k[a>>2]|0;c=Zd[k[(k[c>>2]|0)+8>>2]&255](c)|0;e=i[c+11>>0]|0;f=e<<24>>24<0;e=e&255;g=f?k[c+4>>2]|0:e;n=i[j>>0]|0;d=n<<24>>24<0;b:do if((g|0)==((d?k[l>>2]|0:n&255)|0)){d=d?k[b>>2]|0:b;if(f)if(!(Vn(k[c>>2]|0,d,g)|0))break a;else break;while(1){if(!e)break a;if((i[c>>0]|0)!=(i[d>>0]|0))break b;e=e+-1|0;d=d+1|0;c=c+1|0;}}while(0);a=a+8|0;}return(a|0)!=(k[m>>2]|0)|0;}function In(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0;e=u;u=u+16|0;b=e;c=k[a+108>>2]|0;d=a+4|0;a=k[a+104>>2]|0;while(1){if((a|0)==(c|0))break;f=k[d>>2]|0;g=k[(k[f>>2]|0)+48>>2]|0;h=k[a>>2]|0;Xd[k[(k[h>>2]|0)+48>>2]&255](b,h);Xd[g&255](f,b);Ng(b);a=a+8|0;}u=e;return;}function Jn(a){a=a|0;return k[a+56>>2]|0;}function Kn(a,b){a=a|0;b=b|0;k[a+56>>2]=b;return 0;}function Ln(a){a=a|0;return a+116|0;}function Mn(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0;i=u;u=u+128|0;d=i+104|0;e=i+96|0;f=i+88|0;g=i+76|0;j=i+64|0;c=i+56|0;h=i;l=k[a+20>>2]|0;Xd[k[(k[l>>2]|0)+8>>2]&255](g,l);Xd[k[(k[a>>2]|0)+64>>2]&255](j,a);l=k[a+44>>2]|0;ne[k[(k[l>>2]|0)+24>>2]&63](c,l,b);k[d>>2]=0;k[d+4>>2]=0;k[d+8>>2]=0;Eg(d,38328,0);Un(h,g,j,d,k[a+60>>2]|0,c);yg(d);c=a+116|0;b=sN(64,40063)|0;if(!b)b=0;else Jg(b,h,1);k[f>>2]=0;k[d>>2]=k[f>>2];On(e,b,d);f=k[e>>2]|0;k[e>>2]=k[c>>2];k[c>>2]=f;f=e+4|0;l=a+120|0;j=k[f>>2]|0;k[f>>2]=k[l>>2];k[l>>2]=j;Pn(e);l=k[a+4>>2]|0;j=k[(k[l>>2]|0)+32>>2]|0;f=k[c>>2]|0;Xd[k[(k[f>>2]|0)+60>>2]&255](d,f);Xd[j&255](l,d);Ng(d);l=(k[c>>2]|0)!=0;xg(h);CN(g);u=i;return l|0;}function Nn(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;h=u;u=u+32|0;d=h+16|0;e=h+8|0;f=h;g=a+116|0;c=sN(64,40063)|0;if(!c)c=0;else Jg(c,b,0);k[f>>2]=0;k[d>>2]=k[f>>2];On(e,c,d);d=k[e>>2]|0;k[e>>2]=k[g>>2];k[g>>2]=d;d=e+4|0;f=a+120|0;a=k[d>>2]|0;k[d>>2]=k[f>>2];k[f>>2]=a;Pn(e);u=h;return(k[g>>2]|0)!=0|0;}function On(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=5140;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Pn(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function Qn(a){a=a|0;kN(a);vN(a);return;}function Rn(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function Sn(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==14430?a+12|0:0)|0;}function Tn(a){a=a|0;vN(a);return;}function Un(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;AN(a,b);k[a+12>>2]=7;b=a+16|0;k[b>>2]=k[c>>2];k[b+4>>2]=k[c+4>>2];k[b+8>>2]=k[c+8>>2];Dg(a+28|0,d);k[a+40>>2]=e;d=f;e=k[d+4>>2]|0;f=a+44|0;k[f>>2]=k[d>>2];k[f+4>>2]=e;return;}function Vn(a,b,c){a=a|0;b=b|0;c=c|0;if(!c)a=0;else a=CM(a,b,c)|0;return a|0;}function Wn(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=5168;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Xn(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function Yn(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;d=co(+bo(k[b+44>>2]|0,+o[c+4>>2]))|0;b=i[c+8>>0]|0;i[a>>0]=d;d=a+1|0;i[d>>0]=i[c>>0]|0;i[d+1>>0]=i[c+1>>0]|0;i[d+2>>0]=i[c+2>>0]|0;i[a+4>>0]=b;return;}function Zn(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;g=u;u=u+32|0;f=g;c=k[a+4>>2]|0;d=k[a>>2]|0;e=(c-d>>3)+1|0;if(e>>>0>536870911)jN(a);i=(k[a+8>>2]|0)-d|0;h=i>>2;_n(f,i>>3>>>0<268435455?h>>>0<e>>>0?e:h:536870911,c-d>>3,a+8|0);e=f+8|0;c=k[e>>2]|0;k[c>>2]=k[b>>2];d=k[b+4>>2]|0;k[c+4>>2]=d;if(d){mN(d);c=k[e>>2]|0;}k[e>>2]=c+8;$n(a,f);ao(f);u=g;return;}function _n(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;do if(b){if(b>>>0>536870911){c=rc(4)|0;GO(c);Ld(c|0,2912,370);}else{d=rN(b<<3)|0;break;}}else d=0;while(0);k[a>>2]=d;c=d+(c<<3)|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+(b<<3);return;}function $n(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;d=k[a>>2]|0;e=a+4|0;f=b+4|0;c=k[e>>2]|0;while(1){if((c|0)==(d|0))break;i=k[f>>2]|0;g=c+-8|0;k[i+-8>>2]=k[g>>2];h=c+-4|0;k[i+-4>>2]=k[h>>2];k[g>>2]=0;k[h>>2]=0;k[f>>2]=(k[f>>2]|0)+-8;c=g;}g=k[a>>2]|0;k[a>>2]=k[f>>2];k[f>>2]=g;g=b+8|0;i=k[e>>2]|0;k[e>>2]=k[g>>2];k[g>>2]=i;g=a+8|0;i=b+12|0;h=k[g>>2]|0;k[g>>2]=k[i>>2];k[i>>2]=h;k[b>>2]=k[f>>2];return;}function ao(a){a=a|0;var b=0,c=0,d=0;b=k[a+4>>2]|0;c=a+8|0;while(1){d=k[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;k[c>>2]=d;xh(d);}a=k[a>>2]|0;if(a|0)vN(a);return;}function bo(a,b){a=a|0;b=+b;b=+ee[k[(k[a>>2]|0)+20>>2]&3](a)*b;a=(Zd[k[(k[a>>2]|0)+16>>2]&255](a)|0)+8|0;return+(b/+o[a>>2]);}function co(a){a=+a;var b=0;if(!(a<=4.0)){if(!(a>=12.0))b=((~~(a+1.0)&255)>>>1&255)<<1&255;else b=12;}else b=4;return b|0;}function eo(a){a=a|0;kN(a);vN(a);return;}function fo(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function go(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==14569?a+12|0:0)|0;}function ho(a){a=a|0;vN(a);return;}function io(a){a=a|0;var b=0,c=0,d=0;b=k[a>>2]|0;if(b|0){c=a+4|0;while(1){d=k[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;k[c>>2]=d;xh(d);}vN(k[a>>2]|0);}return;}function jo(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function ko(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function lo(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function mo(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function no(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function oo(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function po(a,b,c,d,e,f,g,h,i,j,l){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;l=l|0;var m=0,n=0,p=0,q=0,r=0,s=0;s=u;u=u+32|0;q=s+16|0;m=s+12|0;n=s+8|0;p=s+4|0;r=s;k[a>>2]=5024;k[a+4>>2]=k[b>>2];b=k[b+4>>2]|0;k[a+8>>2]=b;if(b|0)mN(b);k[a+12>>2]=k[c>>2];b=k[c+4>>2]|0;k[a+16>>2]=b;if(b|0)mN(b);k[a+20>>2]=k[d>>2];b=k[d+4>>2]|0;k[a+24>>2]=b;if(b|0)mN(b);k[a+28>>2]=k[e>>2];b=k[e+4>>2]|0;k[a+32>>2]=b;if(b|0)mN(b);k[a+36>>2]=k[f>>2];b=k[f+4>>2]|0;k[a+40>>2]=b;if(b|0)mN(b);k[a+44>>2]=g;k[a+48>>2]=h;k[a+52>>2]=i;k[a+56>>2]=j;k[a+60>>2]=l;b=sN(4,40063)|0;if(!b)b=0;else k[b>>2]=4584;k[m>>2]=0;k[q>>2]=k[m>>2];qo(a+64|0,b,q);b=sN(4,40063)|0;if(!b)b=0;else k[b>>2]=4276;k[n>>2]=0;k[q>>2]=k[n>>2];ro(a+72|0,b,q);b=sN(36,40063)|0;if(!b)b=0;else{n=b+4|0;k[n>>2]=0;k[n+4>>2]=0;k[n+8>>2]=0;k[n+12>>2]=0;k[b>>2]=4648;o[b+8>>2]=0.0;o[b+12>>2]=0.0;n=b+20|0;k[n>>2]=0;k[n+4>>2]=0;k[n+8>>2]=0;k[n+12>>2]=0;}k[p>>2]=0;k[q>>2]=k[p>>2];so(a+80|0,b,q);b=sN(32,40063)|0;if(!b)b=0;else{k[b>>2]=0;k[b+4>>2]=0;k[b+8>>2]=0;k[b+12>>2]=0;k[b+16>>2]=0;k[b+20>>2]=0;k[b+24>>2]=0;k[b+28>>2]=0;to(b);}k[r>>2]=0;k[q>>2]=k[r>>2];uo(a+88|0,b,q);r=a+96|0;k[r>>2]=0;k[r+4>>2]=0;k[r+8>>2]=0;k[r+12>>2]=0;k[r+16>>2]=0;k[r+20>>2]=0;k[r+24>>2]=0;u=s;return;}function qo(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=5280;k[c+12>>2]=b;k[a+4>>2]=c;return;}function ro(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=5252;k[c+12>>2]=b;k[a+4>>2]=c;return;}function so(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=5224;k[c+12>>2]=b;k[a+4>>2]=c;return;}function to(a){a=a|0;var b=0,c=0;k[a>>2]=5308;k[a+4>>2]=0;k[a+8>>2]=0;i[a+12>>0]=0;c=a+16|0;b=a+20|0;k[c>>2]=0;k[c+4>>2]=0;k[c+8>>2]=0;k[c+12>>2]=0;a=0;while(1){if((a|0)==3)break;k[b+(a<<2)>>2]=0;a=a+1|0;}return;}function uo(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=5196;k[c+12>>2]=b;k[a+4>>2]=c;return;}function vo(a){a=a|0;kN(a);vN(a);return;}function wo(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function xo(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==14757?a+12|0:0)|0;}function yo(a){a=a|0;vN(a);return;}function zo(a){a=a|0;kN(a);vN(a);return;}function Ao(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function Bo(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==14912?a+12|0:0)|0;}function Co(a){a=a|0;vN(a);return;}function Do(a){a=a|0;kN(a);vN(a);return;}function Eo(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function Fo(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==15067?a+12|0:0)|0;}function Go(a){a=a|0;vN(a);return;}function Ho(a){a=a|0;kN(a);vN(a);return;}function Io(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function Jo(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==15234?a+12|0:0)|0;}function Ko(a){a=a|0;vN(a);return;}function Lo(a){a=a|0;if(((((((k[a+4>>2]|0?k[a+12>>2]|0:0)?k[a+20>>2]|0:0)?k[a+28>>2]|0:0)?k[a+36>>2]|0:0)?k[a+64>>2]|0:0)?k[a+72>>2]|0:0)?k[a+80>>2]|0:0)return(k[a+88>>2]|0)!=0|0;return 0;}function Mo(a){a=a|0;k[a>>2]=5308;yg(a+20|0);zp(a+4|0);return;}function No(a){a=a|0;Mo(a);vN(a);return;}function Oo(a,b){a=a|0;b=b|0;var c=0;c=Zd[k[(k[b>>2]|0)+52>>2]&255](b)|0;bh((k[c>>2]|0)+72|0);i[a+12>>0]=0;Ap(a,b);b=Zd[k[(k[b>>2]|0)+96>>2]&255](b)|0;b=k[b>>2]|0;Kh(a+20|0,(Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0)+28|0)|0;return;}function Po(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+16|0;d=c;bp(a);e=Zd[k[(k[b>>2]|0)+52>>2]&255](b)|0;bh((k[e>>2]|0)+96|0);cp(a,b);b=Zd[k[(k[b>>2]|0)+96>>2]&255](b)|0;k[d>>2]=k[b>>2];k[b>>2]=0;b=b+4|0;k[d+4>>2]=k[b>>2];k[b>>2]=0;Pn(d);u=c;return;}function Qo(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,p=0,q=0,r=0,s=0,t=0,v=0,w=0,x=0.0;v=u;u=u+48|0;p=v+32|0;q=v+24|0;r=v+8|0;s=v;l=Zd[k[(k[b>>2]|0)+32>>2]&255](b)|0;m=Zd[k[(k[b>>2]|0)+96>>2]&255](b)|0;m=k[m>>2]|0;n=Zd[k[(k[b>>2]|0)+28>>2]&255](b)|0;ne[k[(k[b>>2]|0)+60>>2]&63](p,b,d);k[q>>2]=k[p>>2];e=k[p+4>>2]|0;k[q+4>>2]=e;if(e|0)mN(e);AN(r,Zd[k[(k[m>>2]|0)+12>>2]&255](m)|0);e=k[q>>2]|0;a:do if((e|0)!=0?(g=i[e+11>>0]|0,h=g<<24>>24<0,g=g&255,j=h?k[e+4>>2]|0:g,w=i[r+11>>0]|0,f=w<<24>>24<0,(j|0)==((f?k[r+4>>2]|0:w&255)|0)):0){f=f?k[r>>2]|0:r;b:do if(h){if(Vn(k[e>>2]|0,f,j)|0){t=11;break a;}}else while(1){if(!g)break b;if((i[e>>0]|0)!=(i[f>>0]|0)){t=11;break a;}g=g+-1|0;f=f+1|0;e=e+1|0;}while(0);w=(Zd[k[(k[l>>2]|0)+16>>2]&255](l)|0)+8|0;x=+o[w>>2];w=Zd[k[(k[m>>2]|0)+32>>2]&255](m)|0;ne[k[(k[l>>2]|0)+24>>2]&63](s,l,d);c=k[(k[n>>2]|0)+12>>2]|0;d=Zd[k[(k[m>>2]|0)+12>>2]&255](m)|0;w=_d[c&3](n,s,d,x,w,a+12|0)|0;Xd[k[(k[m>>2]|0)+36>>2]&255](m,w);ap(a,b);}else t=11;while(0);if((t|0)==11){t=k[(k[c>>2]|0)+8>>2]|0;w=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;Xd[t&255](c,w);}CN(r);Ng(q);Ng(p);u=v;return 0;}function Ro(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function So(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function To(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function Uo(a,b,c){a=a|0;b=b|0;c=c|0;return 1;}function Vo(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0;c=u;u=u+16|0;e=c;g=Zd[k[(k[b>>2]|0)+96>>2]&255](b)|0;f=k[g>>2]|0;Xd[k[(k[f>>2]|0)+16>>2]&255](f,d);d=Zd[k[(k[b>>2]|0)+24>>2]&255](b)|0;f=k[(k[d>>2]|0)+48>>2]|0;g=k[g>>2]|0;Xd[k[(k[g>>2]|0)+60>>2]&255](e,g);Xd[f&255](d,e);Ng(e);ap(a,b);i[a+12>>0]=0;u=c;return 0;}function Wo(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0;h=u;u=u+16|0;f=h;e=Zd[k[(k[b>>2]|0)+96>>2]&255](b)|0;switch(d|0){case 0:{f=k[(k[c>>2]|0)+8>>2]|0;e=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;Xd[f&255](c,e);e=0;break;}case 1:{g=k[e>>2]|0;Wd[k[(k[g>>2]|0)+20>>2]&511](g);g=7;break;}case 2:{g=k[e>>2]|0;Wd[k[(k[g>>2]|0)+24>>2]&511](g);g=7;break;}case 3:{g=k[e>>2]|0;Wd[k[(k[g>>2]|0)+28>>2]&511](g);g=7;break;}case 6:case 5:case 4:case 7:{$o(a,b,d);ap(a,b);e=0;break;}default:e=1;}if((g|0)==7){g=Zd[k[(k[b>>2]|0)+24>>2]&255](b)|0;d=k[(k[g>>2]|0)+48>>2]|0;e=k[e>>2]|0;Xd[k[(k[e>>2]|0)+60>>2]&255](f,e);Xd[d&255](g,f);Ng(f);ap(a,b);i[a+12>>0]=0;e=0;}u=h;return e|0;}function Xo(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;i=u;u=u+32|0;f=i+8|0;g=i;h=Zd[k[(k[b>>2]|0)+96>>2]&255](b)|0;e=k[h>>2]|0;e=Zd[k[(k[e>>2]|0)+12>>2]&255](e)|0;a=k[h>>2]|0;c=Zd[k[(k[b>>2]|0)+48>>2]&255](b)|0;e=e+16|0;if(!(Zd[k[(k[a>>2]|0)+8>>2]&255](a)|0)?!(_o(e,d)|0):0){k[f>>2]=0;k[f+4>>2]=0;k[f+8>>2]=0;Fm(f,Zd[k[(k[a>>2]|0)+12>>2]&255](a)|0,e,d);e=k[(k[c>>2]|0)+8>>2]|0;Vl(g,f);Xd[e&255](c,g);Sg(g);Tg(f);}g=k[h>>2]|0;Xd[k[(k[g>>2]|0)+48>>2]&255](g,d);d=Zd[k[(k[b>>2]|0)+24>>2]&255](b)|0;b=k[(k[d>>2]|0)+48>>2]|0;h=k[h>>2]|0;Xd[k[(k[h>>2]|0)+60>>2]&255](f,h);Xd[b&255](d,f);Ng(f);u=i;return 0;}function Yo(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0.0,f=0,g=0,h=0,i=0,j=0,m=0;j=u;u=u+32|0;i=j+16|0;f=j+8|0;g=j;h=Zd[k[(k[b>>2]|0)+96>>2]&255](b)|0;m=k[h>>2]|0;m=Zd[k[(k[m>>2]|0)+12>>2]&255](m)|0;a=Zd[k[(k[b>>2]|0)+32>>2]&255](b)|0;e=+pm(a,+(l[d>>0]|0));o[g>>2]=e;a=k[h>>2]|0;c=Zd[k[(k[b>>2]|0)+48>>2]&255](b)|0;d=m+20|0;m=Zd[k[(k[a>>2]|0)+8>>2]&255](a)|0;if(!(m|+o[d>>2]==e)){k[i>>2]=0;k[i+4>>2]=0;k[i+8>>2]=0;qm(i,Zd[k[(k[a>>2]|0)+12>>2]&255](a)|0,d,g);m=k[(k[c>>2]|0)+8>>2]|0;Vl(f,i);Xd[m&255](c,f);Sg(f);Tg(i);e=+o[g>>2];}m=k[h>>2]|0;Vd[k[(k[m>>2]|0)+52>>2]&7](m,e);m=Zd[k[(k[b>>2]|0)+24>>2]&255](b)|0;b=k[(k[m>>2]|0)+48>>2]|0;h=k[h>>2]|0;Xd[k[(k[h>>2]|0)+60>>2]&255](i,h);Xd[b&255](m,i);Ng(i);u=j;return 0;}function Zo(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0,m=0;l=u;u=u+32|0;j=l+8|0;g=l;h=l+20|0;a=d&1;i[h>>0]=a;f=Zd[k[(k[b>>2]|0)+96>>2]&255](b)|0;e=k[f>>2]|0;e=Zd[k[(k[e>>2]|0)+12>>2]&255](e)|0;c=k[f>>2]|0;d=Zd[k[(k[b>>2]|0)+48>>2]&255](b)|0;e=e+24|0;m=Zd[k[(k[c>>2]|0)+8>>2]&255](c)|0;if(!(m|(i[e>>0]|0)==a<<24>>24)){k[j>>2]=0;k[j+4>>2]=0;k[j+8>>2]=0;Ul(j,Zd[k[(k[c>>2]|0)+12>>2]&255](c)|0,e,h);a=k[(k[d>>2]|0)+8>>2]|0;Vl(g,j);Xd[a&255](d,g);Sg(g);Tg(j);a=i[h>>0]|0;}m=k[f>>2]|0;Xd[k[(k[m>>2]|0)+56>>2]&255](m,a<<24>>24!=0);m=Zd[k[(k[b>>2]|0)+24>>2]&255](b)|0;b=k[(k[m>>2]|0)+48>>2]|0;h=k[f>>2]|0;Xd[k[(k[h>>2]|0)+60>>2]&255](j,h);Xd[b&255](m,j);Ng(j);u=l;return 0;}function _o(a,b){a=a|0;b=b|0;if((i[a>>0]|0)==(i[b>>0]|0)?(i[a+1>>0]|0)==(i[b+1>>0]|0):0)a=(i[a+2>>0]|0)==(i[b+2>>0]|0);else a=0;return a|0;}function $o(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0.0,g=0,h=0;g=Zd[k[(k[b>>2]|0)+28>>2]&255](b)|0;d=Zd[k[(k[b>>2]|0)+96>>2]&255](b)|0;d=k[d>>2]|0;e=Zd[k[(k[d>>2]|0)+32>>2]&255](d)|0;h=Zd[k[(k[b>>2]|0)+32>>2]&255](b)|0;h=(Zd[k[(k[h>>2]|0)+16>>2]&255](h)|0)+8|0;f=+o[h>>2];h=k[(k[g>>2]|0)+8>>2]|0;b=Zd[k[(k[d>>2]|0)+12>>2]&255](d)|0;c=_d[h&3](g,c,b,f,e,a+12|0)|0;Xd[k[(k[d>>2]|0)+36>>2]&255](d,c);return;}function ap(a,b){a=a|0;b=b|0;a=k[a+4>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+12>>2]&511](a);b=Zd[k[(k[b>>2]|0)+96>>2]&255](b)|0;b=k[b>>2]|0;Xd[k[(k[b>>2]|0)+44>>2]&255](b,1);return;}function bp(a){a=a|0;var b=0,c=0,d=0,e=0;e=u;u=u+16|0;b=e;c=a+4|0;d=k[c>>2]|0;if(d|0){Wd[k[(k[d>>2]|0)+16>>2]&511](d);k[b>>2]=k[c>>2];k[c>>2]=0;d=a+8|0;k[b+4>>2]=k[d>>2];k[d>>2]=0;zp(b);}u=e;return;}function cp(a,b){a=a|0;b=b|0;var c=0;c=Zd[k[(k[b>>2]|0)+96>>2]&255](b)|0;c=k[c>>2]|0;if(Zd[k[(k[c>>2]|0)+8>>2]&255](c)|0)dp(0,b);else ep(a,b);return;}function dp(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;g=u;u=u+32|0;c=g+8|0;d=g+16|0;e=g;f=Zd[k[(k[b>>2]|0)+96>>2]&255](b)|0;a=k[f>>2]|0;a=Zd[k[(k[a>>2]|0)+12>>2]&255](a)|0;h=i[a+36+3>>0]|0;if(!((h<<24>>24<0?k[a+32>>2]|0:h&255)|0)){h=Zd[k[(k[b>>2]|0)+24>>2]&255](b)|0;ne[k[(k[h>>2]|0)+36>>2]&63](c,h,a);Ng(c);}else{k[d>>2]=0;k[d+4>>2]=0;k[d+8>>2]=0;h=k[f>>2]|0;Xd[k[(k[h>>2]|0)+60>>2]&255](e,h);yp(d,e);Ng(e);h=Zd[k[(k[b>>2]|0)+48>>2]&255](b)|0;b=k[(k[h>>2]|0)+8>>2]|0;Vl(e,d);Xd[b&255](h,e);Sg(e);Tg(d);}u=g;return;}function ep(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0;n=u;u=u+48|0;l=n+40|0;m=n+24|0;c=n+8|0;f=n+16|0;d=n;j=Zd[k[(k[b>>2]|0)+96>>2]&255](b)|0;j=k[j>>2]|0;j=Zd[k[(k[j>>2]|0)+12>>2]&255](j)|0;h=j+28|0;k[m>>2]=0;k[m+4>>2]=0;k[m+8>>2]=0;e=i[j+36+3>>0]|0;g=e<<24>>24<0;e=g?k[j+32>>2]|0:e&255;a:do if(!e){h=Zd[k[(k[b>>2]|0)+24>>2]&255](b)|0;ne[k[(k[h>>2]|0)+36>>2]&63](c,h,j);Ng(c);c=sN(52,40063)|0;if(!c)c=0;else vg(c,j);k[d>>2]=0;k[l>>2]=k[d>>2];Jh(f,c,l);c=k[f>>2]|0;if(c|0){Kh(c+28|0,a+20|0)|0;fp(m,f);}Lh(f);}else{f=a+20|0;d=i[a+28+3>>0]|0;c=d<<24>>24<0;b:do if((e|0)==((c?k[a+24>>2]|0:d&255)|0)){d=c?k[f>>2]|0:f;c=g?k[h>>2]|0:h;while(1){if(!e)break a;if((k[d>>2]|0)!=(k[c>>2]|0))break b;e=e+-1|0;d=d+4|0;c=c+4|0;}}while(0);gp(m,j,f,h);}while(0);Vl(l,m);if(k[l>>2]|0){b=Zd[k[(k[b>>2]|0)+48>>2]&255](b)|0;Xd[k[(k[b>>2]|0)+8>>2]&255](b,l);}Sg(l);Tg(m);u=n;return;}function fp(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;h=u;u=u+32|0;f=h+24|0;g=h+16|0;c=h;d=h+8|0;e=sN(12,40063)|0;if(!e){k[d>>2]=0;k[f>>2]=k[d>>2];op(g,0,f);}else{k[c>>2]=k[b>>2];b=k[b+4>>2]|0;k[c+4>>2]=b;if(b|0)mN(b);np(e,c);k[d>>2]=0;k[f>>2]=k[d>>2];op(g,e,f);Ng(c);}b=k[g>>2]|0;if(b|0){k[f>>2]=b;d=f+4|0;b=k[g+4>>2]|0;k[d>>2]=b;if(b|0)mN(b);b=a+4|0;c=k[b>>2]|0;if(c>>>0<(k[a+8>>2]|0)>>>0){k[c>>2]=k[f>>2];k[c+4>>2]=k[d>>2];k[f>>2]=0;k[d>>2]=0;k[b>>2]=c+8;}else cm(a,f);Sg(f);}pp(g);u=h;return;}function gp(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;i=u;u=u+32|0;g=i+16|0;h=i+8|0;f=i;e=sN(40,40063)|0;if(!e)e=0;else Oh(e,b,c,d);k[f>>2]=0;k[g>>2]=k[f>>2];hp(h,e,g);e=k[h>>2]|0;if(e|0){k[g>>2]=e;c=g+4|0;e=k[h+4>>2]|0;k[c>>2]=e;if(e|0)mN(e);e=a+4|0;b=k[e>>2]|0;if(b>>>0<(k[a+8>>2]|0)>>>0){k[b>>2]=k[g>>2];k[b+4>>2]=k[c>>2];k[g>>2]=0;k[c>>2]=0;k[e>>2]=b+8;}else cm(a,g);Sg(g);}ip(h);u=i;return;}function hp(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=5372;k[c+12>>2]=b;k[a+4>>2]=c;return;}function ip(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function jp(a){a=a|0;kN(a);vN(a);return;}function kp(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function lp(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==15387?a+12|0:0)|0;}function mp(a){a=a|0;vN(a);return;}function np(a,b){a=a|0;b=b|0;k[a>>2]=4368;Kg(a+4|0,b);k[a>>2]=5428;return;}function op(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=5400;k[c+12>>2]=b;k[a+4>>2]=c;return;}function pp(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function qp(a){a=a|0;kN(a);vN(a);return;}function rp(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function sp(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==15542?a+12|0:0)|0;}function tp(a){a=a|0;vN(a);return;}function up(a){a=a|0;Ng(a+4|0);return;}function vp(a){a=a|0;Ng(a+4|0);vN(a);return;}function wp(a,b){a=a|0;b=b|0;Lg(a+4|0,b);return;}function xp(a,b){a=a|0;b=b|0;Mg(a+4|0,b);return;}function yp(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;g=u;u=u+32|0;e=g+16|0;f=g+8|0;d=g;c=sN(12,40063)|0;if(!c)c=0;else Dk(c,b);k[d>>2]=0;k[e>>2]=k[d>>2];Ek(f,c,e);c=k[f>>2]|0;if(c|0){k[e>>2]=c;d=e+4|0;c=k[f+4>>2]|0;k[d>>2]=c;if(c|0)mN(c);c=a+4|0;b=k[c>>2]|0;if(b>>>0<(k[a+8>>2]|0)>>>0){k[b>>2]=k[e>>2];k[b+4>>2]=k[d>>2];k[e>>2]=0;k[d>>2]=0;k[c>>2]=b+8;}else cm(a,e);Sg(e);}Fk(f);u=g;return;}function zp(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function Ap(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0,n=0,o=0,p=0;p=u;u=u+96|0;h=p+80|0;m=p+72|0;n=p+64|0;o=p+48|0;i=p+40|0;j=p;l=p+24|0;c=Zd[k[(k[b>>2]|0)+52>>2]&255](b)|0;k[m>>2]=k[c>>2];d=m+4|0;c=k[c+4>>2]|0;k[d>>2]=c;if(c|0)nN(c);f=Zd[k[(k[b>>2]|0)+96>>2]&255](b)|0;e=k[f>>2]|0;k[n>>2]=e;f=k[f+4>>2]|0;k[n+4>>2]=f;g=(f|0)==0;if(!g)nN(f);k[o>>2]=k[m>>2];c=k[d>>2]|0;k[o+4>>2]=c;if(c|0)nN(c);k[o+8>>2]=e;k[o+12>>2]=f;if(!g)nN(f);c=a+4|0;b=Zd[k[(k[b>>2]|0)+44>>2]&255](b)|0;f=k[(k[b>>2]|0)+8>>2]|0;Bp(l,o);g=rN(20)|0;k[g>>2]=5452;k[g+4>>2]=k[l>>2];d=l+4|0;k[g+8>>2]=k[d>>2];k[l>>2]=0;k[d>>2]=0;d=l+8|0;k[g+12>>2]=k[d>>2];e=l+12|0;k[g+16>>2]=k[e>>2];k[d>>2]=0;k[e>>2]=0;k[j+16>>2]=g;re[f&31](i,b,600,j);b=k[i>>2]|0;f=i+4|0;g=k[f>>2]|0;k[i>>2]=0;k[f>>2]=0;k[h>>2]=k[c>>2];k[c>>2]=b;b=a+8|0;k[h+4>>2]=k[b>>2];k[b>>2]=g;zp(h);zp(i);hh(j);Cp(l);c=k[c>>2]|0;if(c|0)Wd[k[(k[c>>2]|0)+8>>2]&511](c);Cp(o);Dp(n);Ep(m);u=p;return;}function Bp(a,b){a=a|0;b=b|0;var c=0;k[a>>2]=k[b>>2];c=k[b+4>>2]|0;k[a+4>>2]=c;if(c|0)nN(c);k[a+8>>2]=k[b+8>>2];b=k[b+12>>2]|0;k[a+12>>2]=b;if(b|0)nN(b);return;}function Cp(a){a=a|0;Dp(a+8|0);Ep(a);return;}function Dp(a){a=a|0;a=k[a+4>>2]|0;if(a|0)pN(a);return;}function Ep(a){a=a|0;a=k[a+4>>2]|0;if(a|0)pN(a);return;}function Fp(a){a=a|0;k[a>>2]=5452;Cp(a+4|0);return;}function Gp(a){a=a|0;k[a>>2]=5452;Cp(a+4|0);vN(a);return;}function Hp(a){a=a|0;var b=0;b=rN(20)|0;k[b>>2]=5452;Bp(b+4|0,a+4|0);return b|0;}function Ip(a,b){a=a|0;b=b|0;k[b>>2]=5452;Bp(b+4|0,a+4|0);return;}function Jp(a){a=a|0;Cp(a+4|0);return;}function Kp(a){a=a|0;Cp(a+4|0);vN(a);return;}function Lp(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;e=u;u=u+16|0;c=e+8|0;d=e;Op(c,a+12|0);b=k[c>>2]|0;if(b|0){b=Zd[k[(k[b>>2]|0)+40>>2]&255](b)|0;f=k[c>>2]|0;Xd[k[(k[f>>2]|0)+44>>2]&255](f,b^1);Pp(d,a+4|0);a=k[d>>2]|0;if(a|0)bh(a+24|0);ko(d);}Pn(c);u=e;return;}function Mp(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==15708?a+4|0:0)|0;}function Np(a){a=a|0;return 1192;}function Op(a,b){a=a|0;b=b|0;var c=0,d=0;k[a>>2]=0;c=a+4|0;k[c>>2]=0;d=k[b+4>>2]|0;if(d){d=qN(d)|0;k[c>>2]=d;if(d|0)k[a>>2]=k[b>>2];}else k[c>>2]=0;return;}function Pp(a,b){a=a|0;b=b|0;var c=0,d=0;k[a>>2]=0;c=a+4|0;k[c>>2]=0;d=k[b+4>>2]|0;if(d){d=qN(d)|0;k[c>>2]=d;if(d|0)k[a>>2]=k[b>>2];}else k[c>>2]=0;return;}function Qp(a){a=a|0;k[a>>2]=5496;k[a+4>>2]=5640;Iq(a);nn(a+304|0);jo(a+296|0);Yg(a+248|0);k[a+40>>2]=5892;hh(a+48|0);ko(a+32|0);mo(a+24|0);oo(a+16|0);no(a+8|0);return;}function Rp(a){a=a|0;Qp(a);vN(a);return;}function Sp(a){a=a|0;var b=0;b=k[a+8>>2]|0;return Yd[k[(k[b>>2]|0)+16>>2]&3](b,a+40|0,k[a+16>>2]|0,a+400|0,a+408|0,a+420|0)|0;}function Tp(a){a=a|0;return(k[a+32>>2]|0)+24|0;}function Up(a,b){a=a|0;b=b|0;var c=0;if(Hq(b)|0){vs(a+40|0,b);c=k[a+8>>2]|0;b=je[k[(k[c>>2]|0)+28>>2]&127](c,b)|0;bh((k[a+32>>2]|0)+24|0);a=b;}else a=21;return a|0;}function Vp(a,b,c){a=a|0;b=b|0;c=+c;if(!(c<=0.0)){ws(a+40|0,b,c);bh((k[a+32>>2]|0)+24|0);a=0;}else a=21;return a|0;}function Wp(a){a=a|0;fs(a+40|0);bh((k[a+32>>2]|0)+24|0);return 0;}function Xp(a){a=a|0;ns(a+40|0);bh((k[a+32>>2]|0)+24|0);return 0;}function Yp(a,b){a=a|0;b=b|0;ss(a,b+40|0);return;}function Zp(a){a=a|0;return(k[a+32>>2]|0)+48|0;}function _p(a,b){a=a|0;b=+b;var c=0;c=a+32|0;i[(k[c>>2]|0)+120>>0]=0;ts(a+40|0,b);a=k[c>>2]|0;i[a+120>>0]=1;bh(a+24|0);return 0;}function $p(a,b){a=a|0;b=+b;var c=0;c=a+32|0;i[(k[c>>2]|0)+120>>0]=0;us(a+40|0,b);a=k[c>>2]|0;i[a+120>>0]=1;bh(a+24|0);return 0;}function aq(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+16|0;d=c+8|0;e=c;k[e>>2]=16;k[e+4>>2]=1;k[d>>2]=k[e>>2];k[d+4>>2]=k[e+4>>2];b=Gq(a,d,b)|0;bh((k[a+32>>2]|0)+24|0);u=c;return b|0;}function bq(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+16|0;d=c+8|0;e=c;k[e>>2]=20;k[e+4>>2]=1;k[d>>2]=k[e>>2];k[d+4>>2]=k[e+4>>2];b=Gq(a,d,b)|0;bh((k[a+32>>2]|0)+24|0);u=c;return b|0;}function cq(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+16|0;d=c+8|0;e=c;k[e>>2]=24;k[e+4>>2]=1;k[d>>2]=k[e>>2];k[d+4>>2]=k[e+4>>2];b=Gq(a,d,b)|0;bh((k[a+32>>2]|0)+24|0);u=c;return b|0;}function dq(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+16|0;d=c+8|0;e=c;k[e>>2]=28;k[e+4>>2]=1;k[d>>2]=k[e>>2];k[d+4>>2]=k[e+4>>2];b=Gq(a,d,b)|0;bh((k[a+32>>2]|0)+24|0);u=c;return b|0;}function eq(a){a=a|0;var b=0,c=0,d=0;c=u;u=u+16|0;b=c+8|0;d=c;k[d>>2]=32;k[d+4>>2]=1;k[b>>2]=k[d>>2];k[b+4>>2]=k[d+4>>2];b=Fq(a,b)|0;bh((k[a+32>>2]|0)+24|0);u=c;return b|0;}function fq(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;f=u;u=u+32|0;c=f+16|0;d=f+8|0;e=f;k[d>>2]=b;if(b>>>0<32)c=21;else{k[e>>2]=36;k[e+4>>2]=1;k[c>>2]=k[e>>2];k[c+4>>2]=k[e+4>>2];c=Eq(a,c,d)|0;bh((k[a+32>>2]|0)+24|0);}u=f;return c|0;}function gq(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=u;u=u+32|0;e=c+16|0;d=c+8|0;f=c;k[d>>2]=b;k[f>>2]=40;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];b=Dq(a,e,d)|0;bh((k[a+32>>2]|0)+24|0);u=c;return b|0;}function hq(a){a=a|0;return(k[a+32>>2]|0)+72|0;}function iq(a){a=a|0;return(k[a+32>>2]|0)+96|0;}function jq(a){a=a|0;return a+240|0;}function kq(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=u;u=u+16|0;d=c+8|0;e=c;f=a+241|0;i[f>>0]=i[b>>0]|0;i[f+1>>0]=i[b+1>>0]|0;i[f+2>>0]=i[b+2>>0]|0;k[e>>2]=44;k[e+4>>2]=1;k[d>>2]=k[e>>2];k[d+4>>2]=k[e+4>>2];b=Cq(a,d,b)|0;if(!(b<<16>>16))bh((k[a+32>>2]|0)+24|0);u=c;return b|0;}function lq(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+16|0;d=c+8|0;e=c;i[a+240>>0]=i[b>>0]|0;k[e>>2]=48;k[e+4>>2]=1;k[d>>2]=k[e>>2];k[d+4>>2]=k[e+4>>2];b=Bq(a,d,b)|0;if(!(b<<16>>16))bh((k[a+32>>2]|0)+24|0);u=c;return b|0;}function mq(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=u;u=u+32|0;e=c+8|0;d=c+16|0;f=c;b=b&1;i[d>>0]=b;i[a+244>>0]=b;k[f>>2]=52;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];b=Aq(a,e,d)|0;if(!(b<<16>>16))bh((k[a+32>>2]|0)+24|0);u=c;return b|0;}function nq(a){a=a|0;return k[a+32>>2]|0;}function oq(a){a=a|0;return k[a+360>>2]|0;}function pq(a,b){a=a|0;b=b|0;k[a+360>>2]=b;return 0;}function qq(a){a=a|0;var b=0;b=a+248|0;if(jh(b)|0){zq(a);lh(b,k[a+16>>2]|0);bh((k[a+32>>2]|0)+24|0);a=0;}else a=1;return a|0;}function rq(a){a=a|0;var b=0;b=a+248|0;if(kh(b)|0){zq(a);mh(b,k[a+16>>2]|0);bh((k[a+32>>2]|0)+24|0);a=0;}else a=1;return a|0;}function sq(a,b){a=a|0;b=b|0;var c=0;b=b+248|0;c=(jh(b)|0)&1;i[a>>0]=c;b=(kh(b)|0)&1;i[a+1>>0]=b;return;}function tq(a){a=a|0;return a+272|0;}function uq(a,b){a=a|0;b=b|0;var c=0;c=k[a+8>>2]|0;return Yd[k[(k[c>>2]|0)+20>>2]&3](c,a+40|0,k[a+16>>2]|0,b,a+408|0,a+420|0)|0;}function vq(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;h=u;u=u+16|0;f=h;c=k[b>>2]|0;if(c|0){g=a+296|0;d=k[g>>2]|0;if(!d)d=c;else{Xd[k[(k[d>>2]|0)+12>>2]&255](d,a+304|0);d=k[b>>2]|0;}k[f>>2]=d;e=f+4|0;c=k[b+4>>2]|0;k[e>>2]=c;if(c|0)mN(c);k[f>>2]=k[g>>2];k[g>>2]=d;b=a+300|0;k[e>>2]=k[b>>2];k[b>>2]=c;jo(f);g=k[g>>2]|0;Xd[k[(k[g>>2]|0)+8>>2]&255](g,a+304|0);}u=h;return;}function wq(a){a=a|0;Qp(a+-4|0);return;}function xq(a){a=a|0;Rp(a+-4|0);return;}function yq(a,b){a=a|0;b=b|0;vq(a+-4|0,b);return;}function zq(a){a=a|0;var b=0;b=a+368|0;if((k[a+296>>2]|0)!=(k[b>>2]|0))Xd[k[(k[a>>2]|0)+132>>2]&255](a,b);return;}function Aq(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0;n=k[b>>2]|0;m=k[b+4>>2]|0;j=a+296|0;l=m>>1;d=(k[j>>2]|0)+l|0;m=(m&1|0)!=0;if(m){g=n;b=k[(k[d>>2]|0)+n>>2]|0;}else{b=n;g=b;}h=a+304|0;f=a+4|0;e=10;b=me[b&63](d,h,f,(i[c>>0]|0)!=0)|0;while(1){if(b<<16>>16!=1e3)break;if(!e){b=23;break;}b=(k[j>>2]|0)+l|0;if(m)a=k[(k[b>>2]|0)+n>>2]|0;else a=g;e=e+-1|0;b=me[a&63](b,h,f,(i[c>>0]|0)!=0)|0;}return b|0;}function Bq(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0;q=u;u=u+16|0;n=q+2|0;d=q+1|0;p=q;o=k[b>>2]|0;h=k[b+4>>2]|0;l=a+296|0;m=h>>1;e=(k[l>>2]|0)+m|0;h=(h&1|0)!=0;if(h){g=o;b=k[(k[e>>2]|0)+o>>2]|0;}else{b=o;g=b;}j=a+304|0;f=a+4|0;i[d>>0]=i[c>>0]|0;i[n>>0]=i[d>>0]|0;d=10;b=me[b&63](e,j,f,n)|0;while(1){if(b<<16>>16!=1e3)break;if(!d){b=23;break;}b=(k[l>>2]|0)+m|0;if(h)a=k[(k[b>>2]|0)+o>>2]|0;else a=g;i[p>>0]=i[c>>0]|0;i[n>>0]=i[p>>0]|0;d=d+-1|0;b=me[a&63](b,j,f,n)|0;}u=q;return b|0;}function Cq(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0;m=k[b>>2]|0;l=k[b+4>>2]|0;i=a+296|0;j=l>>1;d=(k[i>>2]|0)+j|0;l=(l&1|0)!=0;if(l){g=m;b=k[(k[d>>2]|0)+m>>2]|0;}else{b=m;g=b;}h=a+304|0;f=a+4|0;e=10;b=me[b&63](d,h,f,c)|0;while(1){if(b<<16>>16!=1e3)break;if(!e){b=23;break;}b=(k[i>>2]|0)+j|0;if(l)a=k[(k[b>>2]|0)+m>>2]|0;else a=g;e=e+-1|0;b=me[a&63](b,h,f,c)|0;}return b|0;}function Dq(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0;m=k[b>>2]|0;l=k[b+4>>2]|0;i=a+296|0;j=l>>1;d=(k[i>>2]|0)+j|0;l=(l&1|0)!=0;if(l){g=m;b=k[(k[d>>2]|0)+m>>2]|0;}else{b=m;g=b;}h=a+304|0;f=a+4|0;e=10;b=me[b&63](d,h,f,k[c>>2]|0)|0;while(1){if(b<<16>>16!=1e3)break;if(!e){b=23;break;}b=(k[i>>2]|0)+j|0;if(l)a=k[(k[b>>2]|0)+m>>2]|0;else a=g;e=e+-1|0;b=me[a&63](b,h,f,k[c>>2]|0)|0;}return b|0;}function Eq(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0;m=k[b>>2]|0;l=k[b+4>>2]|0;i=a+296|0;j=l>>1;d=(k[i>>2]|0)+j|0;l=(l&1|0)!=0;if(l){g=m;b=k[(k[d>>2]|0)+m>>2]|0;}else{b=m;g=b;}h=a+304|0;f=a+4|0;e=10;b=me[b&63](d,h,f,k[c>>2]|0)|0;while(1){if(b<<16>>16!=1e3)break;if(!e){b=23;break;}b=(k[i>>2]|0)+j|0;if(l)a=k[(k[b>>2]|0)+m>>2]|0;else a=g;e=e+-1|0;b=me[a&63](b,h,f,k[c>>2]|0)|0;}return b|0;}function Fq(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0;l=k[b>>2]|0;j=k[b+4>>2]|0;h=a+296|0;i=j>>1;c=(k[h>>2]|0)+i|0;j=(j&1|0)!=0;if(j){f=l;b=k[(k[c>>2]|0)+l>>2]|0;}else{b=l;f=b;}g=a+304|0;e=a+4|0;d=10;b=$d[b&63](c,g,e)|0;while(1){if(b<<16>>16!=1e3)break;if(!d){b=23;break;}b=(k[h>>2]|0)+i|0;if(j)a=k[(k[b>>2]|0)+l>>2]|0;else a=f;d=d+-1|0;b=$d[a&63](b,g,e)|0;}return b|0;}function Gq(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0;m=k[b>>2]|0;l=k[b+4>>2]|0;i=a+296|0;j=l>>1;d=(k[i>>2]|0)+j|0;l=(l&1|0)!=0;if(l){g=m;b=k[(k[d>>2]|0)+m>>2]|0;}else{b=m;g=b;}h=a+304|0;f=a+4|0;e=10;b=me[b&63](d,h,f,c)|0;while(1){if(b<<16>>16!=1e3)break;if(!e){b=23;break;}b=(k[i>>2]|0)+j|0;if(l)a=k[(k[b>>2]|0)+m>>2]|0;else a=g;e=e+-1|0;b=me[a&63](b,h,f,c)|0;}return b|0;}function Hq(a){a=a|0;var b=0.0;if(((k[a>>2]|0)!=0?(k[a+4>>2]|0)!=0:0)?(b=+o[a+8>>2],!(+O(+b)<9.99999993922529e-09)):0)a=b>0.0;else a=0;return a|0;}function Iq(a){a=a|0;var b=0,c=0;b=a+16|0;c=k[b>>2]|0;if(c|0){Lq(Zd[k[(k[c>>2]|0)+52>>2]&255](c)|0);c=k[b>>2]|0;Mq(Zd[k[(k[c>>2]|0)+56>>2]&255](c)|0);}b=k[a+8>>2]|0;if(b|0)Nq(Zd[k[(k[b>>2]|0)+36>>2]&255](b)|0);Lq(a+48|0);return;}function Jq(a){a=a|0;k[a>>2]=5892;hh(a+8|0);return;}function Kq(a){a=a|0;ab(a|0)|0;jO();}function Lq(a){a=a|0;var b=0,c=0;b=u;u=u+32|0;c=b;k[c+16>>2]=0;Wq(a,c)|0;hh(c);u=b;return;}function Mq(a){a=a|0;var b=0,c=0;b=u;u=u+32|0;c=b;k[c+16>>2]=0;Sq(a,c)|0;Tq(c);u=b;return;}function Nq(a){a=a|0;var b=0,c=0;b=u;u=u+32|0;c=b;k[c+16>>2]=0;Oq(a,c)|0;Pq(c);u=b;return;}function Oq(a,b){a=a|0;b=b|0;var c=0,d=0;c=u;u=u+32|0;d=c;Qq(d,b);Rq(d,a);Pq(d);u=c;return a|0;}function Pq(a){a=a|0;var b=0;b=k[a+16>>2]|0;if((b|0)!=(a|0)){if(b|0)Wd[k[(k[b>>2]|0)+20>>2]&511](b);}else Wd[k[(k[b>>2]|0)+16>>2]&511](b);return;}function Qq(a,b){a=a|0;b=b|0;var c=0,d=0;c=b+16|0;d=k[c>>2]|0;do if(d){if((d|0)==(b|0)){k[a+16>>2]=a;d=k[c>>2]|0;Xd[k[(k[d>>2]|0)+12>>2]&255](d,a);break;}else{d=Zd[k[(k[d>>2]|0)+8>>2]&255](d)|0;k[a+16>>2]=d;break;}}else k[a+16>>2]=0;while(0);return;}function Rq(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;i=u;u=u+16|0;c=i;g=a+16|0;d=k[g>>2]|0;h=d;if((d|0)==(a|0)?(e=b+16|0,(k[e>>2]|0)==(b|0)):0){Xd[k[(k[d>>2]|0)+12>>2]&255](d,c);h=k[g>>2]|0;Wd[k[(k[h>>2]|0)+16>>2]&511](h);k[g>>2]=0;h=k[e>>2]|0;Xd[k[(k[h>>2]|0)+12>>2]&255](h,a);h=k[e>>2]|0;Wd[k[(k[h>>2]|0)+16>>2]&511](h);k[e>>2]=0;k[g>>2]=a;Xd[k[(k[c>>2]|0)+12>>2]&255](c,b);Wd[k[(k[c>>2]|0)+16>>2]&511](c);k[e>>2]=b;}else f=4;do if((f|0)==4){if((d|0)==(a|0)){Xd[k[(k[d>>2]|0)+12>>2]&255](d,b);h=k[g>>2]|0;Wd[k[(k[h>>2]|0)+16>>2]&511](h);h=b+16|0;k[g>>2]=k[h>>2];k[h>>2]=b;break;}c=b+16|0;d=k[c>>2]|0;if((d|0)==(b|0)){Xd[k[(k[d>>2]|0)+12>>2]&255](d,a);h=k[c>>2]|0;Wd[k[(k[h>>2]|0)+16>>2]&511](h);k[c>>2]=k[g>>2];k[g>>2]=a;break;}else{k[g>>2]=d;k[c>>2]=h;break;}}while(0);u=i;return;}function Sq(a,b){a=a|0;b=b|0;var c=0,d=0;c=u;u=u+32|0;d=c;Uq(d,b);Vq(d,a);Tq(d);u=c;return a|0;}function Tq(a){a=a|0;var b=0;b=k[a+16>>2]|0;if((b|0)!=(a|0)){if(b|0)Wd[k[(k[b>>2]|0)+20>>2]&511](b);}else Wd[k[(k[b>>2]|0)+16>>2]&511](b);return;}function Uq(a,b){a=a|0;b=b|0;var c=0,d=0;c=b+16|0;d=k[c>>2]|0;do if(d){if((d|0)==(b|0)){k[a+16>>2]=a;d=k[c>>2]|0;Xd[k[(k[d>>2]|0)+12>>2]&255](d,a);break;}else{d=Zd[k[(k[d>>2]|0)+8>>2]&255](d)|0;k[a+16>>2]=d;break;}}else k[a+16>>2]=0;while(0);return;}function Vq(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;i=u;u=u+16|0;c=i;g=a+16|0;d=k[g>>2]|0;h=d;if((d|0)==(a|0)?(e=b+16|0,(k[e>>2]|0)==(b|0)):0){Xd[k[(k[d>>2]|0)+12>>2]&255](d,c);h=k[g>>2]|0;Wd[k[(k[h>>2]|0)+16>>2]&511](h);k[g>>2]=0;h=k[e>>2]|0;Xd[k[(k[h>>2]|0)+12>>2]&255](h,a);h=k[e>>2]|0;Wd[k[(k[h>>2]|0)+16>>2]&511](h);k[e>>2]=0;k[g>>2]=a;Xd[k[(k[c>>2]|0)+12>>2]&255](c,b);Wd[k[(k[c>>2]|0)+16>>2]&511](c);k[e>>2]=b;}else f=4;do if((f|0)==4){if((d|0)==(a|0)){Xd[k[(k[d>>2]|0)+12>>2]&255](d,b);h=k[g>>2]|0;Wd[k[(k[h>>2]|0)+16>>2]&511](h);h=b+16|0;k[g>>2]=k[h>>2];k[h>>2]=b;break;}c=b+16|0;d=k[c>>2]|0;if((d|0)==(b|0)){Xd[k[(k[d>>2]|0)+12>>2]&255](d,a);h=k[c>>2]|0;Wd[k[(k[h>>2]|0)+16>>2]&511](h);k[c>>2]=k[g>>2];k[g>>2]=a;break;}else{k[g>>2]=d;k[c>>2]=h;break;}}while(0);u=i;return;}function Wq(a,b){a=a|0;b=b|0;var c=0,d=0;c=u;u=u+32|0;d=c;Xq(d,b);Yq(d,a);hh(d);u=c;return a|0;}function Xq(a,b){a=a|0;b=b|0;var c=0,d=0;c=b+16|0;d=k[c>>2]|0;do if(d){if((d|0)==(b|0)){k[a+16>>2]=a;d=k[c>>2]|0;Xd[k[(k[d>>2]|0)+12>>2]&255](d,a);break;}else{d=Zd[k[(k[d>>2]|0)+8>>2]&255](d)|0;k[a+16>>2]=d;break;}}else k[a+16>>2]=0;while(0);return;}function Yq(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;i=u;u=u+16|0;c=i;g=a+16|0;d=k[g>>2]|0;h=d;if((d|0)==(a|0)?(e=b+16|0,(k[e>>2]|0)==(b|0)):0){Xd[k[(k[d>>2]|0)+12>>2]&255](d,c);h=k[g>>2]|0;Wd[k[(k[h>>2]|0)+16>>2]&511](h);k[g>>2]=0;h=k[e>>2]|0;Xd[k[(k[h>>2]|0)+12>>2]&255](h,a);h=k[e>>2]|0;Wd[k[(k[h>>2]|0)+16>>2]&511](h);k[e>>2]=0;k[g>>2]=a;Xd[k[(k[c>>2]|0)+12>>2]&255](c,b);Wd[k[(k[c>>2]|0)+16>>2]&511](c);k[e>>2]=b;}else f=4;do if((f|0)==4){if((d|0)==(a|0)){Xd[k[(k[d>>2]|0)+12>>2]&255](d,b);h=k[g>>2]|0;Wd[k[(k[h>>2]|0)+16>>2]&511](h);h=b+16|0;k[g>>2]=k[h>>2];k[h>>2]=b;break;}c=b+16|0;d=k[c>>2]|0;if((d|0)==(b|0)){Xd[k[(k[d>>2]|0)+12>>2]&255](d,a);h=k[c>>2]|0;Wd[k[(k[h>>2]|0)+16>>2]&511](h);k[c>>2]=k[g>>2];k[g>>2]=a;break;}else{k[g>>2]=d;k[c>>2]=h;break;}}while(0);u=i;return;}function Zq(a,b,c,d,e,f,g,h,j){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var l=0,m=0,n=0,p=0,q=0,r=0,s=0;s=u;u=u+48|0;p=s+32|0;r=s+16|0;m=s+24|0;q=s;k[a>>2]=5496;k[a+4>>2]=5640;k[a+8>>2]=k[b>>2];l=k[b+4>>2]|0;k[a+12>>2]=l;if(l|0)mN(l);k[a+16>>2]=k[c>>2];l=k[c+4>>2]|0;k[a+20>>2]=l;if(l|0)mN(l);k[a+24>>2]=k[d>>2];l=k[d+4>>2]|0;k[a+28>>2]=l;if(l|0)mN(l);n=a+32|0;l=sN(128,40063)|0;if(!l)l=0;else{k[l+16>>2]=0;k[l+40>>2]=0;k[l+64>>2]=0;k[l+88>>2]=0;k[l+112>>2]=0;i[l+120>>0]=1;}k[m>>2]=0;k[p>>2]=k[m>>2];_q(n,l,p);l=a+40|0;m=k[c>>2]|0;if(!m){o[p>>2]=0.0;o[p+4>>2]=0.0;o[r>>2]=0.0;o[r+4>>2]=0.0;Ts(q,p,r);}else{r=Zd[k[(k[m>>2]|0)+8>>2]&255](m)|0;k[q>>2]=k[r>>2];k[q+4>>2]=k[r+4>>2];k[q+8>>2]=k[r+8>>2];k[q+12>>2]=k[r+12>>2];}es(l,f,q);f=a+240|0;i[f>>0]=i[g>>0]|0;i[f+1>>0]=i[g+1>>0]|0;i[f+2>>0]=i[g+2>>0]|0;i[f+3>>0]=i[g+3>>0]|0;i[f+4>>0]=i[g+4>>0]|0;r=a+248|0;ih(r);k[a+296>>2]=0;k[a+300>>2]=0;po(a+304|0,c,b,d,e,n,l,f,r,h,j);$q(a);u=s;return;}function _q(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=5836;k[c+12>>2]=b;k[a+4>>2]=c;return;}function $q(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0;h=u;u=u+96|0;b=h+72|0;c=h+48|0;f=h+24|0;g=h;d=a+16|0;e=k[d>>2]|0;if(e|0){e=Zd[k[(k[e>>2]|0)+52>>2]&255](e)|0;i=a;k[b>>2]=5660;k[b+4>>2]=i;k[b+16>>2]=b;Wq(e,b)|0;hh(b);e=k[d>>2]|0;e=Zd[k[(k[e>>2]|0)+56>>2]&255](e)|0;k[c>>2]=5704;k[c+4>>2]=i;k[c+16>>2]=c;Sq(e,c)|0;Tq(c);}b=k[a+8>>2]|0;if(!b)b=a;else{i=Zd[k[(k[b>>2]|0)+36>>2]&255](b)|0;b=a;k[f>>2]=5748;k[f+4>>2]=b;k[f+16>>2]=f;Oq(i,f)|0;Pq(f);}k[g>>2]=5792;k[g+4>>2]=b;k[g+16>>2]=g;Wq(a+48|0,g)|0;hh(g);u=h;return;}function ar(a){a=a|0;return;}function br(a){a=a|0;vN(a);return;}function cr(a){a=a|0;var b=0;b=rN(8)|0;k[b>>2]=5792;k[b+4>>2]=k[a+4>>2];return b|0;}function dr(a,b){a=a|0;b=b|0;k[b>>2]=5792;k[b+4>>2]=k[a+4>>2];return;}function er(a){a=a|0;return;}function fr(a){a=a|0;vN(a);return;}function gr(a){a=a|0;jr(k[a+4>>2]|0);return;}function hr(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==16016?a+4|0:0)|0;}function ir(a){a=a|0;return 1272;}function jr(a){a=a|0;var b=0;b=k[a+8>>2]|0;Wd[k[(k[b>>2]|0)+24>>2]&511](b);a=k[a+32>>2]|0;if(i[a+120>>0]|0)bh(a+48|0);return;}function kr(a){a=a|0;return;}function lr(a){a=a|0;vN(a);return;}function mr(a){a=a|0;var b=0;b=rN(8)|0;k[b>>2]=5748;k[b+4>>2]=k[a+4>>2];return b|0;}function nr(a,b){a=a|0;b=b|0;k[b>>2]=5748;k[b+4>>2]=k[a+4>>2];return;}function or(a){a=a|0;return;}function pr(a){a=a|0;vN(a);return;}function qr(a,b){a=a|0;b=b|0;tr(k[a+4>>2]|0,b);return;}function rr(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==16146?a+4|0:0)|0;}function sr(a){a=a|0;return 1296;}function tr(a,b){a=a|0;b=b|0;vs(a+40|0,b);bh((k[a+32>>2]|0)+24|0);return;}function ur(a){a=a|0;return;}function vr(a){a=a|0;vN(a);return;}function wr(a){a=a|0;var b=0;b=rN(8)|0;k[b>>2]=5704;k[b+4>>2]=k[a+4>>2];return b|0;}function xr(a,b){a=a|0;b=b|0;k[b>>2]=5704;k[b+4>>2]=k[a+4>>2];return;}function yr(a){a=a|0;return;}function zr(a){a=a|0;vN(a);return;}function Ar(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;a=k[a+4>>2]|0;e=k[a+8>>2]|0;if(e|0){d=(me[k[(k[e>>2]|0)+40>>2]&63](e,b,a+40|0,d)|0)&1;i[c>>0]=d;}return;}function Br(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==16346?a+4|0:0)|0;}function Cr(a){a=a|0;return 1328;}function Dr(a){a=a|0;vN(a);return;}function Er(a){a=a|0;var b=0;b=rN(8)|0;k[b>>2]=5660;k[b+4>>2]=k[a+4>>2];return b|0;}function Fr(a,b){a=a|0;b=b|0;k[b>>2]=5660;k[b+4>>2]=k[a+4>>2];return;}function Gr(a){a=a|0;return;}function Hr(a){a=a|0;vN(a);return;}function Ir(a){a=a|0;Lr(k[a+4>>2]|0);return;}function Jr(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==16578?a+4|0:0)|0;}function Kr(a){a=a|0;return 1360;}function Lr(a){a=a|0;var b=0,c=0;b=k[a+8>>2]|0;Wd[k[(k[b>>2]|0)+24>>2]&511](b);b=a+16|0;c=k[b>>2]|0;if(Vs(a+84|0,Zd[k[(k[c>>2]|0)+8>>2]&255](c)|0)|0){c=k[b>>2]|0;rs(a+40|0,Zd[k[(k[c>>2]|0)+8>>2]&255](c)|0);}return;}function Mr(a){a=a|0;hh(a+96|0);hh(a+72|0);hh(a+48|0);hh(a+24|0);hh(a);return;}function Nr(a){a=a|0;kN(a);vN(a);return;}function Or(a){a=a|0;a=k[a+12>>2]|0;if(a|0){Mr(a);vN(a);}return;}function Pr(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==16708?a+12|0:0)|0;}function Qr(a){a=a|0;vN(a);return;}function Rr(a){a=a|0;if((((k[a+8>>2]|0?k[a+16>>2]|0:0)?k[a+24>>2]|0:0)?k[a+32>>2]|0:0)?ms(a+40|0)|0:0)return Lo(a+304|0)|0;return 0;}function Sr(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var l=0,m=0,n=0,o=0,p=0,q=0;q=u;u=u+32|0;m=q+16|0;o=q+8|0;n=q;if((((k[b>>2]|0)!=0?(k[c>>2]|0)!=0:0)?(k[d>>2]|0)!=0:0)?(k[e>>2]|0)!=0:0){l=sN(432,40063)|0;if(!l)l=0;else Zq(l,b,c,d,e,f,g,h,i);k[n>>2]=0;k[m>>2]=k[n>>2];Tr(o,l,m);l=k[o>>2]|0;do if((l|0)!=0?Rr(l)|0:0){n=k[o>>2]|0;Xd[k[(k[n>>2]|0)+132>>2]&255](n,n+368|0);if(!(k[n+296>>2]|0)){j[a>>1]=10;k[a+4>>2]=0;k[a+8>>2]=0;break;}j[a>>1]=0;k[a+4>>2]=k[o>>2];l=k[o+4>>2]|0;k[a+8>>2]=l;if(l|0)mN(l);}else p=10;while(0);if((p|0)==10){j[a>>1]=22;k[a+4>>2]=0;k[a+8>>2]=0;}Ur(o);}else{j[a>>1]=20;k[a+4>>2]=0;k[a+8>>2]=0;}u=q;return;}function Tr(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=5864;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Ur(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function Vr(a){a=a|0;kN(a);vN(a);return;}function Wr(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function Xr(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==16857?a+12|0:0)|0;}function Yr(a){a=a|0;vN(a);return;}function Zr(a){a=a|0;k[a>>2]=5892;hh(a+8|0);vN(a);return;}function _r(a){a=a|0;return a+72|0;}function $r(a){a=a|0;return a+136|0;}function as(a){a=a|0;return a+32|0;}function bs(a){a=a|0;return+ +o[a+60>>2];}function cs(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0,e=0.0;e=+o[b+60>>2];d=+o[b+68>>2]+(1.0-+o[c+4>>2])*+((k[b+36>>2]|0)>>>0)/e;o[a>>2]=+o[b+64>>2]+ +o[c>>2]*+((k[b+32>>2]|0)>>>0)/e;o[a+4>>2]=d;return;}function ds(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0,e=0.0;e=+o[b+60>>2];d=1.0-e*(+o[c+4>>2]-+o[b+68>>2])/+((k[b+36>>2]|0)>>>0);o[a>>2]=(+o[c>>2]-+o[b+64>>2])*e/+((k[b+32>>2]|0)>>>0);o[a+4>>2]=d;return;}function es(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;k[a>>2]=5892;k[a+24>>2]=0;d=a+32|0;k[d>>2]=k[b>>2];k[d+4>>2]=k[b+4>>2];k[d+8>>2]=k[b+8>>2];d=a+44|0;k[d>>2]=k[c>>2];k[d+4>>2]=k[c+4>>2];k[d+8>>2]=k[c+8>>2];k[d+12>>2]=k[c+12>>2];o[a+60>>2]=1.0;o[a+64>>2]=0.0;o[a+68>>2]=0.0;Fs(a+72|0);Fs(a+136|0);if(Hq(b)|0)fs(a);return;}function fs(a){a=a|0;gs(a);hs(a);is(a);return;}function gs(a){a=a|0;var b=0.0,c=0.0,d=0.0;d=+o[a+40>>2];b=(+((k[a+32>>2]|0)>>>0)/d+-20.0)/(+o[a+52>>2]-+o[a+44>>2]);c=(+((k[a+36>>2]|0)>>>0)/d+-10.0)/(+o[a+56>>2]-+o[a+48>>2]);b=d*+ks(a,c<b?c:b,1.0);o[a+60>>2]=b;return;}function hs(a){a=a|0;var b=0.0,c=0.0,d=0.0;c=(+o[a+48>>2]+ +o[a+56>>2])*.5;d=+o[a+60>>2];b=+((k[a+36>>2]|0)>>>0)/d;o[a+64>>2]=(+o[a+44>>2]+ +o[a+52>>2])*.5-+((k[a+32>>2]|0)>>>0)/d*.5;o[a+68>>2]=c-b*.5;return;}function is(a){a=a|0;js(a);bh(a+8|0);return;}function js(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0.0;f=u;u=u+192|0;b=f+128|0;c=f+64|0;d=f;Is(b,+((k[a+32>>2]|0)>>>0),+((k[a+36>>2]|0)>>>0));e=a+72|0;g=b;h=e+64|0;do{k[e>>2]=k[g>>2];e=e+4|0;g=g+4|0;}while((e|0)<(h|0));i=+o[a+60>>2];Ks(c,i,i);Js(d,-+o[a+64>>2],-+o[a+68>>2]);Gs(b,c,d);e=a+136|0;g=b;h=e+64|0;do{k[e>>2]=k[g>>2];e=e+4|0;g=g+4|0;}while((e|0)<(h|0));u=f;return;}function ks(a,b,c){a=a|0;b=+b;c=+c;var d=0.0;d=+ls(a);b=d>b?d:b;return+(b>c?c:b);}function ls(a){a=a|0;var b=0.0,c=0.0;c=+o[a+40>>2];b=c*(100.0/(+o[a+52>>2]-+o[a+44>>2]));c=c*(100.0/(+o[a+56>>2]-+o[a+48>>2]));return+(c<b?c:b);}function ms(a){a=a|0;if(Hq(a+32|0)|0)return(Ws(a+44|0)|0)^1|0;else return 0;return 0;}function ns(a){a=a|0;var b=0,c=0,d=0,e=0.0,f=0;b=u;u=u+16|0;c=b;f=a+60|0;e=+o[f>>2];d=k[a+40>>2]|0;k[f>>2]=d;o[c>>2]=.5;o[c+4>>2]=.5;os(a,e,(k[s>>2]=d,+o[s>>2]),c);ps(a);is(a);u=b;return;}function os(a,b,c,d){a=a|0;b=+b;c=+c;d=d|0;var e=0;c=(c-b)/(b*c);e=a+64|0;o[e>>2]=+o[e>>2]+c*+o[d>>2]*+((k[a+32>>2]|0)>>>0);e=a+68|0;o[e>>2]=+o[e>>2]+c*(1.0-+o[d+4>>2])*+((k[a+36>>2]|0)>>>0);return;}function ps(a){a=a|0;var b=0.0,c=0.0,d=0.0,e=0.0,f=0.0,g=0.0,h=0,i=0.0,j=0.0,k=0.0,l=0.0,m=0;m=u;u=u+16|0;h=m;qs(h,a);i=+o[a+52>>2];j=+o[a+44>>2];k=+o[h+8>>2];l=+o[h>>2];b=k-l;c=+o[a+56>>2];d=+o[a+48>>2];e=+o[h+12>>2];f=+o[h+4>>2];g=e-f;h=!(c-d<=g);if(!(i-j<=b)){if(l<j)o[a+64>>2]=j;if(k>i)o[a+64>>2]=i-b;}else o[a+64>>2]=(i+j)*.5-b*.5;if(h){if(e>c)o[a+68>>2]=c-g;if(f<d)o[a+68>>2]=d;}else o[a+68>>2]=(d+c)*.5-g*.5;u=m;return;}function qs(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0.0,g=0.0,h=0;c=u;u=u+16|0;e=c+8|0;d=c;f=+o[b+60>>2];g=+((k[b+32>>2]|0)>>>0)/f;f=+((k[b+36>>2]|0)>>>0)/f;h=k[b+64>>2]|0;b=k[b+68>>2]|0;k[e>>2]=h;k[e+4>>2]=b;g=g+(k[s>>2]=h,+o[s>>2]);f=f+(k[s>>2]=b,+o[s>>2]);o[d>>2]=g;o[d+4>>2]=f;Ts(a,e,d);u=c;return;}function rs(a,b){a=a|0;b=b|0;var c=0;if(!(Ws(b)|0)){c=a+44|0;k[c>>2]=k[b>>2];k[c+4>>2]=k[b+4>>2];k[c+8>>2]=k[b+8>>2];k[c+12>>2]=k[b+12>>2];ps(a);is(a);}return;}function ss(a,b){a=a|0;b=b|0;var c=0.0,d=0.0,e=0.0,f=0.0,g=0.0,h=0.0,j=0.0,k=0.0,l=0,m=0.0,n=0;n=u;u=u+16|0;l=n;qs(l,b);e=+o[b+44>>2];f=+o[b+52>>2]-e;m=+o[b+56>>2];g=m-+o[b+48>>2];c=+o[l>>2];d=+o[l+8>>2]-c;h=+o[l+12>>2];j=h-+o[l+4>>2];b=f>d;l=g>j;if(b){k=d/f;e=(c-e)/(f-d);}else{k=0.0;e=0.0;}if(l){d=j/g;c=(m-h)/(g-j);}else{d=0.0;c=0.0;}i[a>>0]=b&1;o[a+4>>2]=e;o[a+8>>2]=k;i[a+12>>0]=l&1;o[a+16>>2]=c;o[a+20>>2]=d;u=n;return;}function ts(a,b){a=a|0;b=+b;var c=0.0,d=0.0,e=0.0,f=0,g=0;f=u;u=u+16|0;g=f;qs(g,a);d=+o[a+44>>2];e=+o[a+52>>2]-d;c=+o[g+8>>2]-+o[g>>2];if(!(e<=c)){o[a+64>>2]=d+(e-c)*b;ps(a);is(a);}u=f;return;}function us(a,b){a=a|0;b=+b;var c=0.0,d=0.0,e=0.0,f=0,g=0;f=u;u=u+16|0;g=f;qs(g,a);d=+o[a+56>>2];e=d-+o[a+48>>2];c=+o[g+12>>2]-+o[g+4>>2];if(!(e<=c)){o[a+68>>2]=d-c-(e-c)*b;ps(a);is(a);}u=f;return;}function vs(a,b){a=a|0;b=b|0;var c=0,d=0.0,e=0.0,f=0.0,g=0.0,h=0,i=0.0,j=0,l=0;j=u;u=u+16|0;c=j;if(Hq(b)|0){qs(c,a);i=(+o[c>>2]+ +o[c+8>>2])*.5;g=(+o[c+4>>2]+ +o[c+12>>2])*.5;e=+o[b+8>>2];h=a+32|0;f=+o[a+40>>2];l=+O(+(e-f))<9.99999993922529e-09;c=a+60|0;d=+o[c>>2];if(!l){d=e/f*d;o[c>>2]=d;}f=d*2.0;o[a+64>>2]=i-+((k[b>>2]|0)>>>0)/f;o[a+68>>2]=g-+((k[b+4>>2]|0)>>>0)/f;k[h>>2]=k[b>>2];k[h+4>>2]=k[b+4>>2];k[h+8>>2]=k[b+8>>2];ps(a);is(a);}u=j;return;}function ws(a,b,c){a=a|0;b=b|0;c=+c;var d=0.0,e=0;if(!(c<=0.0)){e=a+60|0;d=+o[e>>2];c=+ks(a,d*c,+o[a+40>>2]*4.0);o[e>>2]=c;os(a,d,c,b);ps(a);is(a);}return;}function xs(a,b){a=a|0;b=b|0;var c=0.0,d=0.0;d=+o[a>>2]-+o[b>>2];c=+o[a+4>>2]-+o[b+4>>2];return+(d*d+c*c);}function ys(a,b){a=a|0;b=b|0;var c=0.0,d=0.0;d=+o[a>>2]-+o[b>>2];c=+o[a+4>>2]-+o[b+4>>2];return+ +P(+(d*d+c*c));}function zs(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0;d=(+o[b+4>>2]+ +o[c+4>>2])*.5;o[a>>2]=(+o[b>>2]+ +o[c>>2])*.5;o[a+4>>2]=d;return;}function As(a,b){a=a|0;b=b|0;return+(+o[a>>2]*+o[b>>2]+ +o[a+4>>2]*+o[b+4>>2]);}function Bs(a,b){a=a|0;b=b|0;var c=0.0,d=0.0,e=0.0;e=+o[b>>2];d=+o[b+4>>2];c=+P(+(e*e+d*d));o[a>>2]=e/c;o[a+4>>2]=d/c;return;}function Cs(a,b){a=a|0;b=b|0;var c=0;c=k[b>>2]|0;o[a>>2]=-+o[b+4>>2];k[a+4>>2]=c;return;}function Ds(a,b){a=a|0;b=b|0;var c=0.0;c=-+o[b+4>>2];o[a>>2]=-+o[b>>2];o[a+4>>2]=c;return;}function Es(a,b,c){a=+a;b=+b;c=+c;var d=0,e=0,f=0;e=(o[s>>2]=b,k[s>>2]|0);f=(o[s>>2]=c,k[s>>2]|0);d=b>c;b=(k[s>>2]=d?f:e,+o[s>>2]);if(!(b>a)){b=(k[s>>2]=d?e:f,+o[s>>2]);b=b<a?b:a;}return+b;}function Fs(a){a=a|0;var b=0;b=a+64|0;do{k[a>>2]=0;a=a+4|0;}while((a|0)<(b|0));return;}function Gs(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0.0,g=0,h=0,i=0.0;d=a;e=d+64|0;do{k[d>>2]=0;d=d+4|0;}while((d|0)<(e|0));d=0;while(1){if((d|0)==4)break;else g=0;while(1){if((g|0)==4)break;h=g<<2;e=0;f=0.0;while(1){if((e|0)==4)break;i=f+ +o[b+((e<<2)+d<<2)>>2]*+o[c+(e+h<<2)>>2];e=e+1|0;f=i;}o[a+(h+d<<2)>>2]=f;g=g+1|0;}d=d+1|0;}return;}function Hs(a){a=a|0;var b=0,c=0;b=a+4|0;c=b+56|0;do{k[b>>2]=0;b=b+4|0;}while((b|0)<(c|0));o[a>>2]=1.0;o[a+20>>2]=1.0;o[a+40>>2]=1.0;o[a+60>>2]=1.0;return;}function Is(a,b,c){a=a|0;b=+b;c=+c;var d=0,e=0;d=a+4|0;e=d+56|0;do{k[d>>2]=0;d=d+4|0;}while((d|0)<(e|0));o[a>>2]=2.0/b;o[a+20>>2]=2.0/c;o[a+40>>2]=1.0;o[a+60>>2]=1.0;o[a+48>>2]=-1.0;o[a+52>>2]=-1.0;return;}function Js(a,b,c){a=a|0;b=+b;c=+c;var d=0,e=0;d=a+4|0;e=d+56|0;do{k[d>>2]=0;d=d+4|0;}while((d|0)<(e|0));o[a>>2]=1.0;o[a+20>>2]=1.0;o[a+40>>2]=1.0;o[a+60>>2]=1.0;o[a+48>>2]=b;o[a+52>>2]=c;return;}function Ks(a,b,c){a=a|0;b=+b;c=+c;var d=0,e=0;d=a+4|0;e=d+56|0;do{k[d>>2]=0;d=d+4|0;}while((d|0)<(e|0));o[a>>2]=b;o[a+20>>2]=c;o[a+40>>2]=1.0;o[a+60>>2]=1.0;return;}function Ls(a,b,c,d){a=a|0;b=+b;c=+c;d=+d;var e=0,f=0,g=0.0;e=a+8|0;f=e+52|0;do{k[e>>2]=0;e=e+4|0;}while((e|0)<(f|0));g=+R(+b);b=+S(+b);o[a>>2]=g;o[a+4>>2]=b;o[a+16>>2]=-b;o[a+20>>2]=g;g=1.0-g;o[a+48>>2]=g*c+b*d+1.0;o[a+52>>2]=g*d-b*c+1.0;o[a+40>>2]=1.0;o[a+60>>2]=1.0;return;}function Ms(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0;d=+o[b+4>>2]+ +o[c+4>>2];o[a>>2]=+o[b>>2]+ +o[c>>2];o[a+4>>2]=d;return;}function Ns(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0;d=+o[b+4>>2]-+o[c+4>>2];o[a>>2]=+o[b>>2]-+o[c>>2];o[a+4>>2]=d;return;}function Os(a,b,c){a=a|0;b=+b;c=c|0;var d=0.0;d=+o[c+4>>2]*b;o[a>>2]=+o[c>>2]*b;o[a+4>>2]=d;return;}function Ps(a,b,c){a=a|0;b=b|0;c=+c;var d=0.0;d=+o[b+4>>2]*c;o[a>>2]=+o[b>>2]*c;o[a+4>>2]=d;return;}function Qs(a,b){a=a|0;b=b|0;if(+O(+(+o[a>>2]-+o[b>>2]))<9.99999993922529e-09)a=+O(+(+o[a+4>>2]-+o[b+4>>2]))<9.99999993922529e-09;else a=0;return a|0;}function Rs(a,b){a=a|0;b=b|0;return(Qs(a,b)|0)^1|0;}function Ss(a){a=a|0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;k[a+12>>2]=0;return;}function Ts(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;k[a>>2]=k[(+o[c>>2]<+o[b>>2]?c:b)>>2];d=b+4|0;e=c+4|0;k[a+4>>2]=k[(+o[e>>2]<+o[d>>2]?e:d)>>2];k[a+8>>2]=k[(+o[b>>2]<+o[c>>2]?c:b)>>2];k[a+12>>2]=k[(+o[d>>2]<+o[e>>2]?e:d)>>2];return;}function Us(a,b){a=a|0;b=b|0;if((+O(+(+o[a>>2]-+o[b>>2]))<9.99999993922529e-09?+O(+(+o[a+8>>2]-+o[b+8>>2]))<9.99999993922529e-09:0)?+O(+(+o[a+4>>2]-+o[b+4>>2]))<9.99999993922529e-09:0)a=+O(+(+o[a+12>>2]-+o[b+12>>2]))<9.99999993922529e-09;else a=0;return a|0;}function Vs(a,b){a=a|0;b=b|0;return(Us(a,b)|0)^1|0;}function Ws(a){a=a|0;if(+O(+(+o[a>>2]-+o[a+8>>2]))<9.99999993922529e-09)a=1;else a=+O(+(+o[a+4>>2]-+o[a+12>>2]))<9.99999993922529e-09;return a|0;}function Xs(a,b,c){a=a|0;b=b|0;c=+c;var d=0,e=0,f=0,g=0.0;d=u;u=u+16|0;f=d+8|0;e=d;g=+o[b+4>>2]-c;o[f>>2]=+o[b>>2]-c;o[f+4>>2]=g;g=+o[b+12>>2]+c;o[e>>2]=+o[b+8>>2]+c;o[e+4>>2]=g;Ts(a,f,e);u=d;return;}function Ys(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;d=u;u=u+16|0;f=d+8|0;e=d;g=b+4|0;h=c+4|0;g=k[(+o[h>>2]<+o[g>>2]?h:g)>>2]|0;k[f>>2]=k[(+o[c>>2]<+o[b>>2]?c:b)>>2];k[f+4>>2]=g;g=b+8|0;h=c+8|0;b=b+12|0;c=c+12|0;c=k[(+o[b>>2]<+o[c>>2]?c:b)>>2]|0;k[e>>2]=k[(+o[g>>2]<+o[h>>2]?h:g)>>2];k[e+4>>2]=c;Ts(a,f,e);u=d;return;}function Zs(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0.0,h=0.0,i=0.0,j=0.0,k=0.0,l=0.0;d=u;u=u+16|0;f=d+8|0;e=d;j=+o[c>>2];h=+o[c+8>>2];i=+o[c+4>>2];g=+o[c+12>>2];l=+Es(+o[b>>2],j,h);k=+Es(+o[b+4>>2],i,g);o[f>>2]=l;o[f+4>>2]=k;h=+Es(+o[b+8>>2],j,h);g=+Es(+o[b+12>>2],i,g);o[e>>2]=h;o[e+4>>2]=g;Ts(a,f,e);u=d;return;}function _s(a,b){a=a|0;b=b|0;if((+o[b>>2]>=+o[a>>2]?+o[b+4>>2]>=+o[a+4>>2]:0)?+o[b+8>>2]<=+o[a+8>>2]:0)a=+o[b+12>>2]<=+o[a+12>>2];else a=0;return a|0;}function $s(a){a=a|0;k[a>>2]=5932;ct(a+4|0);return;}function at(a){a=a|0;k[a>>2]=5932;ct(a+4|0);vN(a);return;}function bt(a){a=a|0;var b=0;b=k[a+4>>2]|0;b=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;ne[k[(k[b>>2]|0)+24>>2]&63](b,36160,k[a+12>>2]|0);ne[k[(k[b>>2]|0)+28>>2]&63](b,36161,k[a+16>>2]|0);return;}function ct(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function dt(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a>>2]=5932;k[a+4>>2]=k[b>>2];b=k[b+4>>2]|0;k[a+8>>2]=b;if(b|0)mN(b);k[a+12>>2]=c;k[a+16>>2]=d;return;}function et(a){a=a|0;return(k[a+4>>2]|0)!=0|0;}function ft(a){a=a|0;var b=0;k[a>>2]=5952;k[a+4>>2]=5996;b=a+8|0;if(k[b>>2]|0)tt(a);ct(b);return;}function gt(a){a=a|0;ft(a);vN(a);return;}function ht(a){a=a|0;var b=0;b=k[a+8>>2]|0;b=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;ne[k[(k[b>>2]|0)+24>>2]&63](b,36160,k[a+24>>2]|0);ne[k[(k[b>>2]|0)+28>>2]&63](b,36161,k[a+32>>2]|0);return;}function it(a){a=a|0;return(i[a+46>>0]|0)!=0|0;}function jt(a){a=a|0;i[a+46>>0]=1;return;}function kt(a){a=a|0;i[a+46>>0]=0;return;}function lt(a){a=a|0;var b=0;b=k[a+8>>2]|0;b=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;ne[k[(k[b>>2]|0)+32>>2]&63](b,3553,k[a+40>>2]|0);return;}function mt(a){a=a|0;return k[a+16>>2]|0;}function nt(a){a=a|0;return k[a+20>>2]|0;}function ot(a){a=a|0;ft(a+-4|0);return;}function pt(a){a=a|0;gt(a+-4|0);return;}function qt(a){a=a|0;lt(a+-4|0);return;}function rt(a){a=a|0;return k[a+-4+16>>2]|0;}function st(a){a=a|0;return k[a+-4+20>>2]|0;}function tt(a){a=a|0;var b=0,c=0,d=0,e=0;b=a+44|0;if(i[b>>0]|0){d=k[a+8>>2]|0;Xd[k[(k[d>>2]|0)+40>>2]&255](d,k[a+40>>2]|0);}c=a+36|0;if(i[c>>0]|0){d=k[a+8>>2]|0;Xd[k[(k[d>>2]|0)+32>>2]&255](d,k[a+32>>2]|0);}d=a+28|0;if(i[d>>0]|0){e=k[a+8>>2]|0;Xd[k[(k[e>>2]|0)+24>>2]&255](e,k[a+24>>2]|0);}i[b>>0]=0;i[c>>0]=0;i[d>>0]=0;i[a+45>>0]=0;return;}function ut(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;k[a>>2]=5952;k[a+4>>2]=5996;f=a+8|0;e=k[b>>2]|0;k[f>>2]=e;b=k[b+4>>2]|0;k[a+12>>2]=b;if(b){mN(b);e=k[f>>2]|0;}k[a+16>>2]=c;k[a+20>>2]=d;k[a+24>>2]=0;i[a+28>>0]=0;k[a+32>>2]=0;i[a+36>>0]=0;f=a+40|0;k[f>>2]=0;j[f+4>>1]=0;i[f+6>>0]=0;if(!((e|0)==0|(c|0)==0|(d|0)==0))vt(a);return;}function vt(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;b=a+16|0;if((k[b>>2]|0?(c=a+20|0,k[c>>2]|0):0)?(d=k[a+8>>2]|0,d=Zd[k[(k[d>>2]|0)+8>>2]&255](d)|0,e=a+32|0,ne[k[(k[d>>2]|0)+132>>2]&63](d,1,e),i[a+36>>0]=1,ne[k[(k[d>>2]|0)+28>>2]&63](d,36161,k[e>>2]|0),Ud[k[(k[d>>2]|0)+188>>2]&31](d,36161,32854,k[b>>2]|0,k[c>>2]|0),f=a+24|0,ne[k[(k[d>>2]|0)+128>>2]&63](d,1,f),i[a+28>>0]=1,ne[k[(k[d>>2]|0)+24>>2]&63](d,36160,k[f>>2]|0),Ud[k[(k[d>>2]|0)+116>>2]&31](d,36160,36064,36161,k[e>>2]|0),e=a+40|0,ne[k[(k[d>>2]|0)+136>>2]&63](d,1,e),i[a+44>>0]=1,ne[k[(k[d>>2]|0)+32>>2]&63](d,3553,k[e>>2]|0),re[k[(k[d>>2]|0)+200>>2]&31](d,3553,10241,9729),re[k[(k[d>>2]|0)+200>>2]&31](d,3553,10240,9729),re[k[(k[d>>2]|0)+200>>2]&31](d,3553,10242,33071),re[k[(k[d>>2]|0)+200>>2]&31](d,3553,10243,33071),ie[k[(k[d>>2]|0)+196>>2]&7](d,3553,0,6408,k[b>>2]|0,k[c>>2]|0,0,6408,5121,0),ce[k[(k[d>>2]|0)+120>>2]&7](d,36160,36064,3553,k[e>>2]|0,0),(je[k[(k[d>>2]|0)+44>>2]&127](d,36160)|0)==36053):0){i[a+45>>0]=1;i[a+46>>0]=0;}return;}function wt(a,b,c){a=a|0;b=b|0;c=c|0;tt(a);k[a+16>>2]=b;k[a+20>>2]=c;vt(a);return;}function xt(a){a=a|0;return(i[a+45>>0]|0)!=0|0;}function yt(a){a=a|0;var b=0,c=0;k[a>>2]=6024;k[a+4>>2]=6060;c=a+24|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0)Wd[k[(k[b>>2]|0)+4>>2]&511](b);c=a+20|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0)Wd[k[(k[b>>2]|0)+4>>2]&511](b);c=a+16|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0)Wd[k[(k[b>>2]|0)+4>>2]&511](b);ct(a+8|0);return;}function zt(a){a=a|0;yt(a);vN(a);return;}function At(a){a=a|0;return k[a+16>>2]|0;}function Bt(a){a=a|0;return k[a+20>>2]|0;}function Ct(a){a=a|0;return k[a+24>>2]|0;}function Dt(a){a=a|0;var b=0,c=0;c=a+16|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0)Wd[k[(k[b>>2]|0)+4>>2]&511](b);c=a+20|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0)Wd[k[(k[b>>2]|0)+4>>2]&511](b);c=a+24|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0)Wd[k[(k[b>>2]|0)+4>>2]&511](b);return;}function Et(a,b,c){a=a|0;b=b|0;c=c|0;Jt(a,b);return Kt(a)|0;}function Ft(a){a=a|0;yt(a+-4|0);return;}function Gt(a){a=a|0;zt(a+-4|0);return;}function Ht(a){a=a|0;Dt(a+-4|0);return;}function It(a,b,c){a=a|0;b=b|0;c=c|0;return Et(a+-4|0,b,0)|0;}function Jt(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=sN(20,40063)|0;if(!c)c=0;else dt(c,a+8|0,k[b+8>>2]|0,k[b+12>>2]|0);e=a+16|0;d=k[e>>2]|0;k[e>>2]=c;if(d|0)Wd[k[(k[d>>2]|0)+4>>2]&511](d);c=sN(48,40063)|0;if(!c)c=0;else ut(c,a+8|0,k[b>>2]|0,k[b+4>>2]|0);e=a+20|0;d=k[e>>2]|0;k[e>>2]=c;if(d|0)Wd[k[(k[d>>2]|0)+4>>2]&511](d);c=sN(48,40063)|0;if(!c)d=0;else{ut(c,a+8|0,k[b>>2]|0,k[b+4>>2]|0);d=c;}e=a+24|0;c=k[e>>2]|0;k[e>>2]=d;if(c|0)Wd[k[(k[c>>2]|0)+4>>2]&511](c);return;}function Kt(a){a=a|0;var b=0,c=0;do if(((((k[a+8>>2]|0)!=0?(b=k[a+16>>2]|0,(b|0)!=0):0)?et(b)|0:0)?(c=k[a+20>>2]|0,(c|0)!=0):0)?xt(c)|0:0){a=k[a+24>>2]|0;if(a|0?xt(a)|0:0){a=1;break;}a=0;}else a=0;while(0);return a|0;}function Lt(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=6024;k[a+4>>2]=6060;k[a+8>>2]=k[b>>2];b=k[b+4>>2]|0;k[a+12>>2]=b;if(b|0)mN(b);k[a+16>>2]=0;k[a+20>>2]=0;k[a+24>>2]=0;Jt(a,c);return;}function Mt(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;d=a+20|0;wt(k[d>>2]|0,b,c);a=a+24|0;wt(k[a>>2]|0,b,c);if(xt(k[d>>2]|0)|0)a=xt(k[a>>2]|0)|0;else a=0;return a|0;}function Nt(a){a=a|0;var b=0,c=0,d=0;b=k[a>>2]|0;if(b|0){c=a+4|0;while(1){d=k[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;k[c>>2]=d;Ot(d);}vN(k[a>>2]|0);}return;}function Ot(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function Pt(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;do if(b){if(b>>>0>536870911){c=rc(4)|0;GO(c);Ld(c|0,2912,370);}else{d=rN(b<<3)|0;break;}}else d=0;while(0);k[a>>2]=d;c=d+(c<<3)|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+(b<<3);return;}function Qt(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;d=k[a>>2]|0;e=a+4|0;f=b+4|0;c=k[e>>2]|0;while(1){if((c|0)==(d|0))break;i=k[f>>2]|0;g=c+-8|0;k[i+-8>>2]=k[g>>2];h=c+-4|0;k[i+-4>>2]=k[h>>2];k[g>>2]=0;k[h>>2]=0;k[f>>2]=(k[f>>2]|0)+-8;c=g;}g=k[a>>2]|0;k[a>>2]=k[f>>2];k[f>>2]=g;g=b+8|0;i=k[e>>2]|0;k[e>>2]=k[g>>2];k[g>>2]=i;g=a+8|0;i=b+12|0;h=k[g>>2]|0;k[g>>2]=k[i>>2];k[i>>2]=h;k[b>>2]=k[f>>2];return;}function Rt(a){a=a|0;var b=0,c=0,d=0;b=k[a+4>>2]|0;c=a+8|0;while(1){d=k[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;k[c>>2]=d;Ot(d);}a=k[a>>2]|0;if(a|0)vN(a);return;}function St(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0;c=Vt(a+12|0,b)|0;m=k[a+4>>2]|0;a:do if(m){n=m+-1|0;o=(n&m|0)==0;if(o)l=n&c;else l=(c>>>0)%(m>>>0)|0;c=k[(k[a>>2]|0)+(l<<2)>>2]|0;if(c){h=b+11|0;j=b+4|0;b:while(1){c=k[c>>2]|0;if(!c){c=0;break a;}a=k[c+4>>2]|0;if(o)a=a&n;else a=(a>>>0)%(m>>>0)|0;if((a|0)!=(l|0)){c=0;break a;}a=c+8|0;e=i[a+11>>0]|0;f=e<<24>>24<0;e=e&255;g=f?k[c+12>>2]|0:e;p=i[h>>0]|0;d=p<<24>>24<0;if((g|0)!=((d?k[j>>2]|0:p&255)|0))continue;d=d?k[b>>2]|0:b;if(f)if(!(Vn(k[a>>2]|0,d,g)|0))break;else continue;while(1){if(!e)break a;if((i[a>>0]|0)!=(i[d>>0]|0))continue b;e=e+-1|0;d=d+1|0;a=a+1|0;}}}else c=0;}else c=0;while(0);return c|0;}function Tt(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function XA(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0;g=u;u=u+16|0;b=g;d=a+32|0;j[d>>1]=(j[d>>1]|0)+1<<16>>16;d=a+8|0;e=k[a+24>>2]|0;k[b>>2]=e;f=b+4|0;c=k[a+28>>2]|0;k[f>>2]=c;if(c|0)mN(c);k[b>>2]=k[d>>2];k[d>>2]=e;e=a+12|0;k[f>>2]=k[e>>2];k[e>>2]=c;bB(b);u=g;return;}function YA(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0;g=u;u=u+16|0;d=g;e=a+32|0;j[e>>1]=(j[e>>1]|0)+1<<16>>16;e=a+8|0;f=k[a+16>>2]|0;k[d>>2]=f;b=d+4|0;c=k[a+20>>2]|0;k[b>>2]=c;if(c|0)mN(c);k[d>>2]=k[e>>2];k[e>>2]=f;a=a+12|0;k[b>>2]=k[a>>2];k[a>>2]=c;bB(d);u=g;return 1;}function ZA(a){a=a|0;MA(a+-4|0);return;}function _A(a){a=a|0;NA(a+-4|0);return;}function $A(a){a=a|0;XA(a+-4|0);return;}function aB(a,b,c){a=a|0;b=b|0;c=c|0;YA(a+-4|0,0,0)|0;return 1;}function bB(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function cB(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;h=u;u=u+16|0;f=h+4|0;g=h;k[a>>2]=6368;k[a+4>>2]=6428;k[a+8>>2]=k[b>>2];c=b+4|0;d=k[c>>2]|0;k[a+12>>2]=d;if(d|0)mN(d);k[a+16>>2]=k[b>>2];b=k[c>>2]|0;k[a+20>>2]=b;if(b|0)mN(b);e=a+24|0;b=sN(56,40063)|0;if(!b)b=0;else{c=b;d=c+56|0;do{k[c>>2]=0;c=c+4|0;}while((c|0)<(d|0));k[b>>2]=6452;k[b+24>>2]=0;k[b+48>>2]=0;}k[g>>2]=0;k[f>>2]=k[g>>2];dB(e,b,f);j[a+32>>1]=0;u=h;return;}function dB(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=6696;k[c+12>>2]=b;k[a+4>>2]=c;return;}function eB(a){a=a|0;kN(a);vN(a);return;}function fB(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function gB(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==24758?a+12|0:0)|0;}function hB(a){a=a|0;vN(a);return;}function iB(a){a=a|0;k[a>>2]=6452;nC(a+32|0);hh(a+8|0);return;}function jB(a){a=a|0;iB(a);vN(a);return;}function kB(a){a=a|0;return a+8|0;}function lB(a){a=a|0;return a+32|0;}function mB(a,b,c){a=a|0;b=b|0;c=c|0;return;}function nB(a,b,c){a=a|0;b=b|0;c=c|0;return;}function oB(a,b,c){a=a|0;b=b|0;c=c|0;return;}function pB(a,b,c){a=a|0;b=b|0;c=c|0;return;}function qB(a,b,c){a=a|0;b=b|0;c=c|0;return;}function rB(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return;}function sB(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return;}function tB(a,b){a=a|0;b=b|0;return 36061;}function uB(a,b){a=a|0;b=b|0;return;}function vB(a,b,c,d,e){a=a|0;b=+b;c=+c;d=+d;e=+e;return;}function wB(a,b){a=a|0;b=b|0;return;}function xB(a){a=a|0;return 0;}function yB(a,b){a=a|0;b=b|0;return 0;}function zB(a,b,c){a=a|0;b=b|0;c=c|0;return;}function AB(a,b,c){a=a|0;b=b|0;c=c|0;return;}function BB(a,b){a=a|0;b=b|0;return;}function CB(a,b,c){a=a|0;b=b|0;c=c|0;return;}function DB(a,b){a=a|0;b=b|0;return;}function EB(a,b,c){a=a|0;b=b|0;c=c|0;return;}function FB(a,b,c){a=a|0;b=b|0;c=c|0;return;}function GB(a,b){a=a|0;b=b|0;return;}function HB(a,b){a=a|0;b=b|0;return;}function IB(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return;}function JB(a,b){a=a|0;b=b|0;return;}function KB(a,b){a=a|0;b=b|0;return;}function LB(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return;}function MB(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return;}function NB(a,b,c){a=a|0;b=b|0;c=c|0;return;}function OB(a,b,c){a=a|0;b=b|0;c=c|0;return;}function PB(a,b,c){a=a|0;b=b|0;c=c|0;return;}function QB(a,b,c){a=a|0;b=b|0;c=c|0;return;}function RB(a,b,c){a=a|0;b=b|0;c=c|0;return 0;}function SB(a){a=a|0;return 0;}function TB(a,b,c){a=a|0;b=b|0;c=c|0;return;}function UB(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return;}function VB(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return;}function WB(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return;}function XB(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return;}function YB(a,b,c){a=a|0;b=b|0;c=c|0;return 0;}function ZB(a,b){a=a|0;b=b|0;return 0;}function _B(a,b){a=a|0;b=b|0;return;}function $B(a,b,c){a=a|0;b=b|0;c=c|0;return;}function aC(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;return;}function bC(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return;}function cC(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return;}function dC(a,b,c,d,e,f,g,h,i,j){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;return;}function eC(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return;}function fC(a,b,c,d,e,f,g,h,i,j){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;return;}function gC(a,b,c){a=a|0;b=b|0;c=+c;return;}function hC(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return;}function iC(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return;}function jC(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return;}function kC(a,b){a=a|0;b=b|0;return;}function lC(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return;}function mC(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return;}function nC(a){a=a|0;var b=0;b=k[a+16>>2]|0;if((b|0)!=(a|0)){if(b|0)Wd[k[(k[b>>2]|0)+20>>2]&511](b);}else Wd[k[(k[b>>2]|0)+16>>2]&511](b);return;}function oC(a){a=a|0;if(!(k[a+8>>2]|0))return 0;else return(k[a+16>>2]|0)!=0|0;return 0;}function pC(a){a=a|0;var b=0,c=0,d=0;k[a>>2]=6724;c=a+4|0;if(k[c>>2]|0)GC(a);Pq(a+88|0);HC(a+76|0);d=a+52|0;b=k[d>>2]|0;k[d>>2]=0;if(b|0){IC(b);vN(b);}d=a+48|0;b=k[d>>2]|0;k[d>>2]=0;if(b|0){IC(b);vN(b);}d=a+44|0;b=k[d>>2]|0;k[d>>2]=0;if(b|0){IC(b);vN(b);}JC(a+36|0);KC(a+28|0);LC(a+20|0);MC(a+12|0);bB(c);return;}function qC(a){a=a|0;pC(a);vN(a);return;}function rC(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;f=f|0;return jz((k[a+36>>2]|0)+620|0,b,c,d,e,f)|0;}function sC(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;f=f|0;return kz((k[a+36>>2]|0)+620|0,b,c,d,e,f)|0;}function tC(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0;o=u;u=u+64|0;n=o+24|0;m=o;if(!(i[a+72>>0]|0))g=30;else{k[m>>2]=k[a+12>>2];g=k[a+16>>2]|0;k[m+4>>2]=g;if(g|0)mN(g);yA(n,m);ct(m);if(AA(n)|0){g=a+20|0;h=k[g>>2]|0;h=Zd[k[(k[h>>2]|0)+8>>2]&255](h)|0;j=k[g>>2]|0;j=Zd[k[(k[j>>2]|0)+12>>2]&255](j)|0;l=k[g>>2]|0;l=Zd[k[(k[l>>2]|0)+16>>2]&255](l)|0;p=j+4|0;q=Zd[k[(k[p>>2]|0)+12>>2]&255](p)|0;p=Zd[k[(k[p>>2]|0)+16>>2]&255](p)|0;AC(a,h,q,p);AC(a,j,q,p);AC(a,l,q,p);Hz(m,e,f);if(FC(a,d)|0)sA(k[a+52>>2]|0,b,d,e,f,n,h,j);else{q=a+44|0;Az(k[q>>2]|0,c,b,d,e,f,m,a+56|0,n,h,j,l);wA(n);Bz(k[q>>2]|0,c,b,m,l);Wd[k[(k[j>>2]|0)+16>>2]&511](j);Wd[k[(k[l>>2]|0)+16>>2]&511](l);}g=k[g>>2]|0;g=Zd[k[(k[g>>2]|0)+8>>2]&255](g)|0;Wd[k[(k[g>>2]|0)+8>>2]&511](g);Kz(m);g=0;}else g=22;tA(n);}u=o;return g|0;}function uC(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,l=0,m=0,n=0,o=0;l=u;u=u+64|0;j=l+24|0;h=l;if(!(i[a+72>>0]|0))a=30;else{k[h>>2]=k[a+12>>2];g=k[a+16>>2]|0;k[h+4>>2]=g;if(g|0)mN(g);yA(j,h);ct(h);if(AA(j)|0){g=a+20|0;m=k[g>>2]|0;m=Zd[k[(k[m>>2]|0)+12>>2]&255](m)|0;g=k[g>>2]|0;g=Zd[k[(k[g>>2]|0)+16>>2]&255](g)|0;n=m+4|0;o=Zd[k[(k[n>>2]|0)+12>>2]&255](n)|0;n=Zd[k[(k[n>>2]|0)+16>>2]&255](n)|0;AC(a,m,o,n);AC(a,g,o,n);d=BC(a,b,c,j,d)|0;Wd[k[(k[m>>2]|0)+20>>2]&511](m);wA(j);Hz(h,e,f);Bz(k[a+44>>2]|0,c,b,h,g);Wd[k[(k[g>>2]|0)+16>>2]&511](g);Kz(h);a=d;}else a=22;tA(j);}u=l;return a|0;}function vC(a){a=a|0;if(i[a+72>>0]|0){a=k[a+20>>2]|0;a=Zd[k[(k[a>>2]|0)+12>>2]&255](a)|0;Wd[k[(k[a>>2]|0)+20>>2]&511](a);}return;}function wC(a,b){a=a|0;b=b|0;if(i[a+72>>0]|0){if(Hq(b)|0){a=Mt(k[a+20>>2]|0,k[b>>2]|0,k[b+4>>2]|0)|0;a=a?0:10;}else a=21;}else a=30;return a|0;}function xC(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,l=0,m=0,n=0.0;h=u;u=u+16|0;g=h+4|0;e=h;do if(!(i[b+72>>0]|0)){i[a>>0]=0;j[a+2>>1]=0;i[a+4>>0]=0;}else{f=k[b+12>>2]|0;f=Zd[k[(k[f>>2]|0)+8>>2]&255](f)|0;d=b+20|0;b=k[d>>2]|0;b=Zd[k[(k[b>>2]|0)+16>>2]&255](b)|0;d=k[d>>2]|0;d=Zd[k[(k[d>>2]|0)+8>>2]&255](d)|0;if(!(Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0)){i[a>>0]=0;j[a+2>>1]=0;i[a+4>>0]=0;break;}n=+o[c>>2];m=b+4|0;l=~~+NO(+(n*+((Zd[k[(k[m>>2]|0)+12>>2]&255](m)|0)>>>0)));n=1.0-+o[c+4>>2];c=~~+NO(+(n*+((Zd[k[(k[m>>2]|0)+16>>2]&255](m)|0)>>>0)));Wd[k[(k[b>>2]|0)+8>>2]&511](b);k[g>>2]=0;ne[k[(k[f>>2]|0)+148>>2]&63](f,3333,e);ne[k[(k[f>>2]|0)+180>>2]&63](f,3333,4);be[k[(k[f>>2]|0)+184>>2]&3](f,l,c,1,1,6408,5121,g);b=k[e>>2]|0;if((b|0)!=4)ne[k[(k[f>>2]|0)+180>>2]&63](f,3333,b);Wd[k[(k[d>>2]|0)+8>>2]&511](d);LA(a,g);}while(0);u=h;return;}function yC(a){a=a|0;return a+88|0;}function zC(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return iz((k[a+36>>2]|0)+620|0,b,c,d)|0;}function AC(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Wd[k[(k[b>>2]|0)+8>>2]&511](b);b=k[a+12>>2]|0;b=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;Ud[k[(k[b>>2]|0)+232>>2]&31](b,0,0,c,d);return;}function BC(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,l=0,m=0,n=0,p=0,q=0,r=0,s=0,t=0,v=0,w=0,x=0,y=0,z=0;z=u;u=u+32|0;t=z+16|0;y=z;l=k[a+12>>2]|0;l=Zd[k[(k[l>>2]|0)+8>>2]&255](l)|0;m=Zd[k[(k[b>>2]|0)+16>>2]&255](b)|0;m=k[m>>2]|0;n=(Zd[k[(k[b>>2]|0)+16>>2]&255](b)|0)+4|0;n=k[n>>2]|0;s=Zd[k[(k[c>>2]|0)+8>>2]&255](c)|0;p=~~+NO(+ +o[s>>2]);q=~~+NO(+ +o[s+4>>2]);r=~~+NO(+ +o[s+8>>2]);s=~~+NO(+ +o[s+12>>2]);if($d[k[(k[e>>2]|0)+8>>2]&63](e,r-p|0,s-q|0)|0){ne[k[(k[l>>2]|0)+148>>2]&63](l,3333,t);ne[k[(k[l>>2]|0)+180>>2]&63](l,3333,4);v=y+4|0;w=y+8|0;x=y+12|0;f=1;j=p;while(1){if(!((r|0)>(j|0)&f))break;h=r-j|0;h=(h|0)<(m|0)?h:m;i=j-p|0;g=q;f=1;while(1){if(!((s|0)>(g|0)&f))break;f=s-g|0;k[y>>2]=i;k[v>>2]=g-q;k[w>>2]=h;k[x>>2]=(f|0)<(n|0)?f:n;g=g+n|0;f=CC(a,b,c,d,y,e)|0;}j=j+m|0;}ne[k[(k[l>>2]|0)+180>>2]&63](l,3333,k[t>>2]|0);f=f?0:10;}else f=10;u=z;return f|0;}function CC(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;h=u;u=u+16|0;g=h;ne[k[(k[f>>2]|0)+12>>2]&63](g,f,e);if(!(k[g>>2]|0))a=0;else{DC(a,b,c,d,e);a=EC(a,e,g)|0;ne[k[(k[f>>2]|0)+16>>2]&63](f,e,g);Xd[k[(k[f>>2]|0)+20>>2]&255](f,g);}u=h;return a|0;}function DC(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;f=u;u=u+176|0;g=f+152|0;h=f;o[g>>2]=1.0;o[g+4>>2]=1.0;o[g+8>>2]=1.0;o[g+12>>2]=0.0;JA(h,b,c,e);i=k[a+48>>2]|0;e=a+20|0;b=k[e>>2]|0;b=Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0;e=k[e>>2]|0;Ez(i,c,h,g,d,b,Zd[k[(k[e>>2]|0)+16>>2]&255](e)|0);u=f;return;}function EC(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;g=k[a+12>>2]|0;g=Zd[k[(k[g>>2]|0)+8>>2]&255](g)|0;h=b+8|0;f=c+4|0;a:do if((k[f>>2]|0)>>>0<k[h>>2]<<2>>>0)a=0;else{e=b+12|0;d=0;a=k[c>>2]|0;while(1){b=k[e>>2]|0;if(b>>>0<=d>>>0){a=1;break a;}be[k[(k[g>>2]|0)+184>>2]&3](g,0,b+~d|0,k[h>>2]|0,1,6408,5121,a);d=d+1|0;a=a+(k[f>>2]|0)|0;}}while(0);return a|0;}function FC(a,b){a=a|0;b=b|0;b=k[b>>2]|0;if(!b)b=1;else{b=(Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0)+12|0;b=(k[b>>2]|0)!=2;}a=k[a+20>>2]|0;a=Zd[k[(k[a>>2]|0)+12>>2]&255](a)|0;return b&(Zd[k[(k[a>>2]|0)+12>>2]&255](a)|0)|0;}function GC(a){a=a|0;var b=0;a=a+4|0;b=k[a>>2]|0;Lq(Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0);a=k[a>>2]|0;OC(Zd[k[(k[a>>2]|0)+12>>2]&255](a)|0);return;}function HC(a){a=a|0;var b=0,c=0,d=0;b=k[a>>2]|0;if(b|0){c=a+4|0;while(1){d=k[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;k[c>>2]=d;NC(d);}vN(k[a>>2]|0);}return;}function IC(a){a=a|0;ct(a+8|0);JC(a);return;}function JC(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function KC(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function LC(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function MC(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function NC(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function OC(a){a=a|0;var b=0,c=0;b=u;u=u+32|0;c=b;k[c+16>>2]=0;PC(a,c)|0;nC(c);u=b;return;}function PC(a,b){a=a|0;b=b|0;var c=0,d=0;c=u;u=u+32|0;d=c;QC(d,b);RC(d,a);nC(d);u=c;return a|0;}function QC(a,b){a=a|0;b=b|0;var c=0,d=0;c=b+16|0;d=k[c>>2]|0;do if(d){if((d|0)==(b|0)){k[a+16>>2]=a;d=k[c>>2]|0;Xd[k[(k[d>>2]|0)+12>>2]&255](d,a);break;}else{d=Zd[k[(k[d>>2]|0)+8>>2]&255](d)|0;k[a+16>>2]=d;break;}}else k[a+16>>2]=0;while(0);return;}function RC(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;i=u;u=u+16|0;c=i;g=a+16|0;d=k[g>>2]|0;h=d;if((d|0)==(a|0)?(e=b+16|0,(k[e>>2]|0)==(b|0)):0){Xd[k[(k[d>>2]|0)+12>>2]&255](d,c);h=k[g>>2]|0;Wd[k[(k[h>>2]|0)+16>>2]&511](h);k[g>>2]=0;h=k[e>>2]|0;Xd[k[(k[h>>2]|0)+12>>2]&255](h,a);h=k[e>>2]|0;Wd[k[(k[h>>2]|0)+16>>2]&511](h);k[e>>2]=0;k[g>>2]=a;Xd[k[(k[c>>2]|0)+12>>2]&255](c,b);Wd[k[(k[c>>2]|0)+16>>2]&511](c);k[e>>2]=b;}else f=4;do if((f|0)==4){if((d|0)==(a|0)){Xd[k[(k[d>>2]|0)+12>>2]&255](d,b);h=k[g>>2]|0;Wd[k[(k[h>>2]|0)+16>>2]&511](h);h=b+16|0;k[g>>2]=k[h>>2];k[h>>2]=b;break;}c=b+16|0;d=k[c>>2]|0;if((d|0)==(b|0)){Xd[k[(k[d>>2]|0)+12>>2]&255](d,a);h=k[c>>2]|0;Wd[k[(k[h>>2]|0)+16>>2]&511](h);k[c>>2]=k[g>>2];k[g>>2]=a;break;}else{k[g>>2]=d;k[c>>2]=h;break;}}while(0);u=i;return;}function SC(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0;G=u;u=u+64|0;F=G+48|0;q=G+40|0;r=G+32|0;l=G+24|0;m=G+16|0;o=G+8|0;p=G;k[a>>2]=6724;j=a+4|0;k[j>>2]=k[b>>2];b=k[b+4>>2]|0;k[a+8>>2]=b;if(b|0)mN(b);v=a+12|0;w=a+16|0;y=a+20|0;A=a+24|0;D=a+28|0;E=a+32|0;x=a+36|0;n=a+40|0;s=a+44|0;t=a+48|0;z=a+52|0;b=a+56|0;g=v;h=g+44|0;do{k[g>>2]=0;g=g+4|0;}while((g|0)<(h|0));TC(b,e);i[a+72>>0]=1;B=a+76|0;k[B>>2]=0;C=a+80|0;k[C>>2]=0;k[a+84>>2]=0;k[a+104>>2]=0;if(k[j>>2]|0){b=sN(36,40063)|0;if(!b)b=0;else cB(b,j);k[r>>2]=0;k[F>>2]=k[r>>2];UC(q,b,F);j=k[q>>2]|0;k[q>>2]=k[v>>2];k[v>>2]=j;j=q+4|0;b=k[j>>2]|0;k[j>>2]=k[w>>2];k[w>>2]=b;MC(q);b=k[v>>2]|0;if(b|0?oC(b)|0:0){g=k[v>>2]|0;k[F>>2]=(g|0)==0?0:g+4|0;g=F+4|0;b=k[w>>2]|0;k[g>>2]=b;if(b|0)mN(b);b=k[C>>2]|0;e=a+84|0;if(b>>>0<(k[e>>2]|0)>>>0){k[b>>2]=k[F>>2];k[b+4>>2]=k[g>>2];k[F>>2]=0;k[g>>2]=0;k[C>>2]=b+8;}else VC(B,F);NC(F);b=k[f>>2]|0;if(b|0){g=k[(k[b>>2]|0)+20>>2]|0;k[F>>2]=k[v>>2];h=k[w>>2]|0;k[F+4>>2]=h;if(h|0)mN(h);Xd[g&255](b,F);ct(F);k[F>>2]=k[f>>2];g=F+4|0;b=k[f+4>>2]|0;k[g>>2]=b;if(b|0)mN(b);b=k[C>>2]|0;if(b>>>0<(k[e>>2]|0)>>>0){k[b>>2]=k[F>>2];k[b+4>>2]=k[g>>2];k[F>>2]=0;k[g>>2]=0;k[C>>2]=b+8;}else VC(B,F);NC(F);}b=k[c>>2]|0;if(b|0){g=k[(k[b>>2]|0)+20>>2]|0;k[F>>2]=k[v>>2];h=k[w>>2]|0;k[F+4>>2]=h;if(h|0)mN(h);Xd[g&255](b,F);ct(F);k[F>>2]=k[c>>2];g=F+4|0;b=k[c+4>>2]|0;k[g>>2]=b;if(b|0)mN(b);b=k[C>>2]|0;if(b>>>0<(k[e>>2]|0)>>>0){k[b>>2]=k[F>>2];k[b+4>>2]=k[g>>2];k[F>>2]=0;k[g>>2]=0;k[C>>2]=b+8;}else VC(B,F);NC(F);}b=sN(28,40063)|0;if(!b){g=0;b=0;}else{k[l>>2]=k[v>>2];g=k[w>>2]|0;k[l+4>>2]=g;if(g|0)mN(g);Lt(b,l,d);g=1;}k[r>>2]=0;k[F>>2]=k[r>>2];WC(q,b,F);j=k[q>>2]|0;k[q>>2]=k[y>>2];k[y>>2]=j;j=q+4|0;d=k[j>>2]|0;k[j>>2]=k[A>>2];k[A>>2]=d;LC(q);if(g)ct(l);h=sN(48,40063)|0;if(!h){g=0;b=0;}else{k[m>>2]=k[v>>2];b=k[w>>2]|0;k[m+4>>2]=b;if(b|0)mN(b);Lu(h,m);g=1;b=h;}k[r>>2]=0;k[F>>2]=k[r>>2];XC(q,b,F);d=k[q>>2]|0;k[q>>2]=k[D>>2];k[D>>2]=d;d=q+4|0;l=k[d>>2]|0;k[d>>2]=k[E>>2];k[E>>2]=l;KC(q);if(g)ct(m);b=sN(744,40063)|0;if(!b){g=0;b=0;}else{k[o>>2]=k[v>>2];g=k[w>>2]|0;k[o+4>>2]=g;if(g|0)mN(g);k[p>>2]=k[D>>2];g=k[E>>2]|0;k[p+4>>2]=g;if(g|0)mN(g);ky(b,o,p,c,f);g=1;}k[r>>2]=0;k[F>>2]=k[r>>2];YC(q,b,F);f=k[q>>2]|0;k[q>>2]=k[x>>2];k[x>>2]=f;f=q+4|0;r=k[f>>2]|0;k[f>>2]=k[n>>2];k[n>>2]=r;JC(q);if(g){hv(p);ct(o);}g=sN(16,40063)|0;if(!g){b=k[s>>2]|0;k[s>>2]=0;if(b|0){IC(b);vN(b);}}else{k[F>>2]=k[v>>2];b=k[w>>2]|0;k[F+4>>2]=b;if(b|0)mN(b);yz(g,x,F);b=k[s>>2]|0;k[s>>2]=g;if(b|0){IC(b);vN(b);}ct(F);}g=sN(16,40063)|0;if(!g){b=k[t>>2]|0;k[t>>2]=0;if(b|0){IC(b);vN(b);}}else{k[F>>2]=k[v>>2];b=k[w>>2]|0;k[F+4>>2]=b;if(b|0)mN(b);Cz(g,x,F);b=k[t>>2]|0;k[t>>2]=g;if(b|0){IC(b);vN(b);}ct(F);}g=sN(16,40063)|0;do if(!g){b=k[z>>2]|0;k[z>>2]=0;if(!b)break;IC(b);vN(b);}else{k[F>>2]=k[v>>2];b=k[w>>2]|0;k[F+4>>2]=b;if(b|0)mN(b);qA(g,x,F);b=k[z>>2]|0;k[z>>2]=g;if(b|0){IC(b);vN(b);}ct(F);}while(0);g=k[y>>2]|0;k[F>>2]=(g|0)==0?0:g+4|0;g=F+4|0;b=k[A>>2]|0;k[g>>2]=b;if(b|0)mN(b);b=k[C>>2]|0;if(b>>>0<(k[e>>2]|0)>>>0){k[b>>2]=k[F>>2];k[b+4>>2]=k[g>>2];k[F>>2]=0;k[g>>2]=0;k[C>>2]=b+8;}else VC(B,F);NC(F);g=k[D>>2]|0;k[F>>2]=(g|0)==0?0:g+4|0;g=F+4|0;b=k[E>>2]|0;k[g>>2]=b;if(b|0)mN(b);b=k[C>>2]|0;if(b>>>0<(k[e>>2]|0)>>>0){k[b>>2]=k[F>>2];k[b+4>>2]=k[g>>2];k[F>>2]=0;k[g>>2]=0;k[C>>2]=b+8;}else VC(B,F);NC(F);ZC(a);}}u=G;return;}function TC(a,b){a=a|0;b=b|0;o[a>>2]=+(l[b>>0]|0)/255.0;o[a+4>>2]=+(l[b+1>>0]|0)/255.0;o[a+8>>2]=+(l[b+2>>0]|0)/255.0;o[a+12>>2]=1.0;return;}function UC(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=6948;k[c+12>>2]=b;k[a+4>>2]=c;return;}function VC(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;g=u;u=u+32|0;c=g;d=k[a+4>>2]|0;e=k[a>>2]|0;f=(d-e>>3)+1|0;if(f>>>0>536870911)jN(a);else{i=(k[a+8>>2]|0)-e|0;h=i>>2;HD(c,i>>3>>>0<268435455?h>>>0<f>>>0?f:h:536870911,d-e>>3,a+8|0);f=c+8|0;e=k[f>>2]|0;k[e>>2]=k[b>>2];d=b+4|0;k[e+4>>2]=k[d>>2];k[b>>2]=0;k[d>>2]=0;k[f>>2]=e+8;ID(a,c);JD(c);u=g;return;}}function WC(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=6920;k[c+12>>2]=b;k[a+4>>2]=c;return;}function XC(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=6892;k[c+12>>2]=b;k[a+4>>2]=c;return;}function YC(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=6864;k[c+12>>2]=b;k[a+4>>2]=c;return;}function ZC(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0;b=u;u=u+48|0;f=b+24|0;c=b;e=a+4|0;g=k[e>>2]|0;g=Zd[k[(k[g>>2]|0)+8>>2]&255](g)|0;d=a;k[f>>2]=6776;k[f+4>>2]=d;k[f+16>>2]=f;Wq(g,f)|0;hh(f);a=k[e>>2]|0;a=Zd[k[(k[a>>2]|0)+12>>2]&255](a)|0;k[c>>2]=6820;k[c+4>>2]=d;k[c+16>>2]=c;PC(a,c)|0;nC(c);u=b;return;}function _C(a){a=a|0;return;}function $C(a){a=a|0;vN(a);return;}function aD(a){a=a|0;var b=0;b=rN(8)|0;k[b>>2]=6820;k[b+4>>2]=k[a+4>>2];return b|0;}function bD(a,b){a=a|0;b=b|0;k[b>>2]=6820;k[b+4>>2]=k[a+4>>2];return;}function cD(a){a=a|0;return;}function dD(a){a=a|0;vN(a);return;}function eD(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;hD(k[a+4>>2]|0,b,c,d);return;}function fD(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==25046?a+4|0:0)|0;}function gD(a){a=a|0;return 1840;}function hD(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;i[d>>0]=1;g=a+72|0;if(!(i[g>>0]|0)){h=a+76|0;j=a+80|0;f=0;while(1){e=k[h>>2]|0;if(f>>>0>=(k[j>>2]|0)-e>>3>>>0)break;e=k[e+(f<<3)>>2]|0;if(e|0?!($d[k[(k[e>>2]|0)+12>>2]&63](e,b,c)|0):0)i[d>>0]=0;f=f+1|0;}j=i[d>>0]|0;i[g>>0]=j;if(j<<24>>24)iD(a+88|0,c);}return;}function iD(a,b){a=a|0;b=b|0;if(k[a+16>>2]|0)jD(a,b);return;}function jD(a,b){a=a|0;b=b|0;a=k[a+16>>2]|0;if(!a){b=rc(4)|0;k[b>>2]=3632;Ld(b|0,288,44);}else{Xd[k[(k[a>>2]|0)+24>>2]&255](a,b);return;}}function kD(a){a=a|0;vN(a);return;}function lD(a){a=a|0;var b=0;b=rN(8)|0;k[b>>2]=6776;k[b+4>>2]=k[a+4>>2];return b|0;}function mD(a,b){a=a|0;b=b|0;k[b>>2]=6776;k[b+4>>2]=k[a+4>>2];return;}function nD(a){a=a|0;return;}function oD(a){a=a|0;vN(a);return;}function pD(a){a=a|0;sD(k[a+4>>2]|0);return;}function qD(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==25379?a+4|0:0)|0;}function rD(a){a=a|0;return 1872;}function sD(a){a=a|0;var b=0,c=0;b=a+72|0;a:do if(i[b>>0]|0){i[b>>0]=0;c=k[a+80>>2]|0;b=k[a+76>>2]|0;while(1){if((b|0)==(c|0))break a;a=k[b>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+8>>2]&511](a);b=b+8|0;}}while(0);return;}function tD(a){a=a|0;uD(a+696|0);ly(a+620|0);my(a+572|0);ny(a+524|0);oy(a+460|0);py(a+380|0);qy(a+332|0);ry(a+284|0);sy(a+184|0);ty(a+136|0);uy(a+80|0);vy(a);return;}function uD(a){a=a|0;gv(a+32|0);fv(a+16|0);hv(a+8|0);ct(a);return;}function vD(a){a=a|0;kN(a);vN(a);return;}function wD(a){a=a|0;a=k[a+12>>2]|0;if(a|0){tD(a);vN(a);}return;}function xD(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==25567?a+12|0:0)|0;}function yD(a){a=a|0;vN(a);return;}function zD(a){a=a|0;kN(a);vN(a);return;}function AD(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function BD(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==25716?a+12|0:0)|0;}function CD(a){a=a|0;vN(a);return;}function DD(a){a=a|0;kN(a);vN(a);return;}function ED(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function FD(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==25877?a+12|0:0)|0;}function GD(a){a=a|0;vN(a);return;}function HD(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;do if(b){if(b>>>0>536870911){c=rc(4)|0;GO(c);Ld(c|0,2912,370);}else{d=rN(b<<3)|0;break;}}else d=0;while(0);k[a>>2]=d;c=d+(c<<3)|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+(b<<3);return;}function ID(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;d=k[a>>2]|0;e=a+4|0;f=b+4|0;c=k[e>>2]|0;while(1){if((c|0)==(d|0))break;i=k[f>>2]|0;g=c+-8|0;k[i+-8>>2]=k[g>>2];h=c+-4|0;k[i+-4>>2]=k[h>>2];k[g>>2]=0;k[h>>2]=0;k[f>>2]=(k[f>>2]|0)+-8;c=g;}g=k[a>>2]|0;k[a>>2]=k[f>>2];k[f>>2]=g;g=b+8|0;i=k[e>>2]|0;k[e>>2]=k[g>>2];k[g>>2]=i;g=a+8|0;i=b+12|0;h=k[g>>2]|0;k[g>>2]=k[i>>2];k[i>>2]=h;k[b>>2]=k[f>>2];return;}function JD(a){a=a|0;var b=0,c=0,d=0;b=k[a+4>>2]|0;c=a+8|0;while(1){d=k[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;k[c>>2]=d;NC(d);}a=k[a>>2]|0;if(a|0)vN(a);return;}function KD(a){a=a|0;kN(a);vN(a);return;}function LD(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function MD(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==26036?a+12|0:0)|0;}function ND(a){a=a|0;vN(a);return;}function OD(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0;do if(((((((((((((k[a+4>>2]|0)!=0?(f=k[a+12>>2]|0,(f|0)!=0):0)?oC(f)|0:0)?(g=k[a+20>>2]|0,(g|0)!=0):0)?Kt(g)|0:0)?(b=k[a+28>>2]|0,(b|0)!=0):0)?Ku(b)|0:0)?(c=k[a+36>>2]|0,(c|0)!=0):0)?Dy(c)|0:0)?(d=k[a+44>>2]|0,(d|0)!=0):0)?zz(d)|0:0)?(e=k[a+48>>2]|0,(e|0)!=0):0)?Dz(e)|0:0){a=k[a+52>>2]|0;if(a|0?rA(a)|0:0){a=1;break;}a=0;}else a=0;while(0);return a|0;}function PD(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,l=0,m=0;m=u;u=u+32|0;h=m+16|0;l=m+8|0;i=m;if(((k[b>>2]|0)!=0?(k[c>>2]|0)!=0:0)?(k[f>>2]|0)!=0:0){g=sN(112,40063)|0;if(!g)g=0;else SC(g,b,c,d,e,f);k[i>>2]=0;k[h>>2]=k[i>>2];QD(l,g,h);g=k[l>>2]|0;if((g|0)!=0?OD(g)|0:0){j[a>>1]=0;k[a+4>>2]=k[l>>2];g=k[l+4>>2]|0;k[a+8>>2]=g;if(g|0)mN(g);}else{j[a>>1]=22;k[a+4>>2]=0;k[a+8>>2]=0;}RD(l);}else{j[a>>1]=20;k[a+4>>2]=0;k[a+8>>2]=0;}u=m;return;}function QD(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=6976;k[c+12>>2]=b;k[a+4>>2]=c;return;}function RD(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function SD(a){a=a|0;kN(a);vN(a);return;}function TD(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function UD(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==26203?a+12|0:0)|0;}function VD(a){a=a|0;vN(a);return;}function WD(a,b){a=a|0;b=b|0;var c=0.0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0.0,p=0,q=0,r=0,s=0,t=0,v=0,w=0,x=0,y=0.0;x=u;u=u+128|0;d=x+104|0;m=x+96|0;p=x+88|0;q=x+80|0;r=x+72|0;s=x+64|0;t=x+56|0;v=x+40|0;w=x+24|0;e=x+16|0;f=x+8|0;g=x;h=b+28|0;j=b+36|0;if(Qs(h,j)|0){o[d>>2]=0.0;o[d+4>>2]=0.0;o[m>>2]=0.0;o[m+4>>2]=0.0;Ts(a,d,m);}else{c=+ys(h,j);l=b+20|0;n=+o[l>>2]*.699999988079071;c=c/(n*14.100000381469727);if(c>1.0)c=+Q(+c,.30000001192092896);y=n*3.5*c;n=n*6.099999904632568*c;Ns(p,h,j);Cs(d,p);Bs(q,d);Bs(r,p);Ps(m,r,n);Ms(d,j,m);Ps(t,q,y);Ms(s,d,t);Ps(m,r,n);Ms(d,j,m);Ps(v,q,y);Ns(t,d,v);k[v>>2]=k[s>>2];k[v+4>>2]=k[t>>2];k[v+8>>2]=k[h>>2];k[v+12>>2]=k[j>>2];k[w>>2]=k[s+4>>2];k[w+4>>2]=k[t+4>>2];k[w+8>>2]=k[b+32>>2];k[w+12>>2]=k[b+40>>2];i[d>>0]=i[m>>0]|0;XD(e,v,v+16|0,d);i[d>>0]=i[m>>0]|0;XD(f,w,w+16|0,d);w=k[k[f>>2]>>2]|0;k[m>>2]=k[k[e>>2]>>2];k[m+4>>2]=w;w=k[k[f+4>>2]>>2]|0;k[g>>2]=k[k[e+4>>2]>>2];k[g+4>>2]=w;Ts(d,m,g);Xs(a,d,+o[l>>2]*.5);}u=x;return;}function XD(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0.0,f=0,g=0,h=0,i=0.0,j=0.0,l=0,m=0,n=0;m=b;k[a>>2]=m;n=a+4|0;k[n>>2]=m;a:do if((b|0)!=(c|0)?(f=b+4|0,g=f,(f|0)!=(c|0)):0){if(+o[f>>2]<+o[b>>2]){k[a>>2]=g;m=b;h=f;b=f;d=g;}else{k[n>>2]=g;m=f;h=b;d=g;}b:while(1){f=h;c:while(1){while(1){l=d+4|0;if((l|0)==(c|0))break a;h=d+8|0;d=h;if((h|0)==(c|0))break b;i=+o[h>>2];j=+o[l>>2];e=+o[b>>2];if(i<j)break;if(j<e){k[a>>2]=l;f=l;b=l;}if(!(i<+o[m>>2])){g=22;break c;}}if(i<e){k[a>>2]=d;f=h;b=h;}if(!(j<+o[m>>2])){g=18;break;}}if((g|0)==18){k[n>>2]=l;m=l;h=f;continue;}else if((g|0)==22){k[n>>2]=d;m=h;h=f;continue;}}e=+o[l>>2];if(e<+o[f>>2]){k[a>>2]=l;break;}if(!(e<+o[m>>2]))k[n>>2]=l;}while(0);return;}function YD(a,b){a=a|0;b=b|0;var c=0,d=0,e=0.0,f=0.0,g=0.0,h=0.0,i=0,j=0,l=0,m=0,n=0,p=0.0,q=0.0;n=u;u=u+32|0;i=n+16|0;j=n+8|0;l=n;c=k[b+28>>2]|0;m=k[b+32>>2]|0;if((c|0)==(m|0)){o[i>>2]=0.0;o[i+4>>2]=0.0;o[j>>2]=0.0;o[j+4>>2]=0.0;Ts(a,i,j);}else{h=+o[c>>2];f=+o[c+4>>2];e=f;g=h;while(1){d=c+8|0;if((d|0)==(m|0))break;p=+o[d>>2];q=+o[c+12>>2];e=q>e?q:e;f=q<f?q:f;g=p>g?p:g;h=p<h?p:h;c=d;}o[j>>2]=h;o[j+4>>2]=f;o[l>>2]=g;o[l+4>>2]=e;Ts(i,j,l);Xs(a,i,+o[b+20>>2]*1.5*.5);}u=n;return;}function ZD(a,b){a=a|0;b=b|0;var c=0,d=0;c=u;u=u+16|0;d=c;Ts(d,b+28|0,b+36|0);Xs(a,d,+o[b+20>>2]*.5);u=c;return;}function _D(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0.0,h=0.0,i=0.0,j=0.0;c=u;u=u+32|0;d=c+16|0;f=c+8|0;e=c;j=+o[b+28>>2];h=+o[b+32>>2];i=+o[b+36>>2];g=+o[b+40>>2];o[f>>2]=j-i;o[f+4>>2]=h-g;o[e>>2]=j+i;o[e+4>>2]=h+g;Ts(d,f,e);Xs(a,d,+o[b+20>>2]*.5);u=c;return;}function $D(a,b){a=a|0;b=b|0;Xs(a,b+28|0,+o[b+20>>2]*.5);return;}function aE(a){a=a|0;k[a>>2]=7004;Tq(a+104|0);hh(a+80|0);BE(a+64|0);BE(a+52|0);BE(a+40|0);return;}function bE(a){a=a|0;aE(a);vN(a);return;}function cE(a){a=a|0;return a+8|0;}function dE(a){a=a|0;return a+40|0;}function eE(a){a=a|0;return a+52|0;}function fE(a){a=a|0;return a+64|0;}function gE(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;switch(i[c>>0]|0){case 0:{k[a>>2]=0;k[a+4>>2]=0;break;}case 1:{e=b+40|0;d=6;break;}case 2:{e=b+52|0;d=6;break;}default:{e=b+64|0;d=6;}}do if((d|0)==6){b=m[c+2>>1]|0;d=k[e>>2]|0;c=d;if(b>>>0>=(k[e+4>>2]|0)-d>>3>>>0){k[a>>2]=0;k[a+4>>2]=0;break;}k[a>>2]=k[c+(b<<3)>>2];b=k[c+(b<<3)+4>>2]|0;k[a+4>>2]=b;if(b|0)mN(b);}while(0);return;}function hE(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;f=u;u=u+16|0;d=f;k[d>>2]=0;e=d+4|0;k[e>>2]=0;if((!(AE(b+64|0,c,d)|0)?!(AE(b+52|0,c,d)|0):0)?!(AE(b+40|0,c,d)|0):0){k[a>>2]=0;k[a+4>>2]=0;}else{k[a>>2]=k[d>>2];k[a+4>>2]=k[e>>2];k[d>>2]=0;k[e>>2]=0;}Ng(d);u=f;return;}function iE(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=k[b>>2]|0;if(c|0){switch(k[c+12>>2]|0){case 1:{d=a+40|0;break;}case 2:{d=a+52|0;break;}default:d=a+64|0;}c=pE(d,c)|0;e=d+4|0;if((c|0)==(k[e>>2]|0)){if((c|0)==(k[d+8>>2]|0))qE(d,b);else{k[c>>2]=k[b>>2];d=k[b+4>>2]|0;k[c+4>>2]=d;if(d){mN(d);c=k[e>>2]|0;}k[e>>2]=c+8;}rE(a);bh(a+80|0);}}return;}function jE(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=u;u=u+16|0;d=e;k[a>>2]=0;k[a+4>>2]=0;if(!(zE(b+64|0,c,a)|0)?!(zE(b+52|0,c,a)|0):0){AN(d,c);CN(d);}else{rE(b);bh(b+80|0);}u=e;return;}function kE(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;r=u;u=u+32|0;m=r+20|0;l=r+16|0;h=r+12|0;n=r+8|0;o=r+4|0;p=r;q=b+64|0;c=pE(q,c)|0;f=b+68|0;g=k[f>>2]|0;do if((c|0)==(g|0)){i[a>>0]=0;j[a+2>>1]=0;j[a+4>>1]=0;}else{d=c;e=(d-(k[q>>2]|0)|0)>>>3&65535;if((c|0)==(g+-8|0)){i[a>>0]=0;j[a+2>>1]=e;j[a+4>>1]=e;break;}c=c+8|0;if((c|0)!=(g|0)){k[n>>2]=d;k[o>>2]=c;k[p>>2]=g;k[h>>2]=k[n>>2];k[l>>2]=k[o>>2];k[m>>2]=k[p>>2];yE(h,l,m)|0;}bh(b+80|0);q=(((k[f>>2]|0)-(k[q>>2]|0)|0)>>>3)+65535&65535;i[a>>0]=1;j[a+2>>1]=e;j[a+4>>1]=q;}while(0);u=r;return;}function lE(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0,n=0;n=u;u=u+32|0;h=n+20|0;g=n+16|0;f=n+12|0;j=n+8|0;l=n+4|0;m=n;c=c&65535;d=a+64|0;e=a+68|0;if(c>>>0<(k[e>>2]|0)-(k[d>>2]|0)>>3>>>0?(i=pE(d,b)|0,(i|0)!=(k[e>>2]|0)):0){c=(k[d>>2]|0)+(c<<3)|0;if(i>>>0>=c>>>0){if(c>>>0<i>>>0){k[j>>2]=c;k[l>>2]=i;k[m>>2]=i+8;k[f>>2]=k[j>>2];k[g>>2]=k[l>>2];k[h>>2]=k[m>>2];yE(f,g,h)|0;}}else{k[j>>2]=i;k[l>>2]=i+8;k[m>>2]=c+8;k[f>>2]=k[j>>2];k[g>>2]=k[l>>2];k[h>>2]=k[m>>2];yE(f,g,h)|0;}bh(a+80|0);}u=n;return;}function mE(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;h=u;u=u+16|0;g=h;c=k[b>>2]|0;if(c|0){switch(k[c+12>>2]|0){case 1:{d=a+40|0;break;}case 2:{d=a+52|0;break;}default:d=a+64|0;}c=pE(d,c)|0;e=d+4|0;do if((c|0)==(k[e>>2]|0)){if((c|0)==(k[d+8>>2]|0)){qE(d,b);break;}k[c>>2]=k[b>>2];d=k[b+4>>2]|0;k[c+4>>2]=d;if(d){mN(d);c=k[e>>2]|0;}k[e>>2]=c+8;}else{e=k[b>>2]|0;k[g>>2]=e;f=g+4|0;d=k[b+4>>2]|0;k[f>>2]=d;if(d|0)mN(d);k[g>>2]=k[c>>2];k[c>>2]=e;b=c+4|0;k[f>>2]=k[b>>2];k[b>>2]=d;Ng(g);}while(0);rE(a);bh(a+80|0);}u=h;return;}function nE(a){a=a|0;return a+80|0;}function oE(a){a=a|0;return a+104|0;}function pE(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0;h=k[a+4>>2]|0;j=b+11|0;l=b+4|0;a=k[a>>2]|0;a:while(1){if((a|0)==(h|0)){a=h;break;}c=k[a>>2]|0;e=i[c+11>>0]|0;f=e<<24>>24<0;e=e&255;g=f?k[c+4>>2]|0:e;m=i[j>>0]|0;d=m<<24>>24<0;b:do if((g|0)==((d?k[l>>2]|0:m&255)|0)){d=d?k[b>>2]|0:b;if(f)if(!(Vn(k[c>>2]|0,d,g)|0))break a;else break;while(1){if(!e)break a;if((i[c>>0]|0)!=(i[d>>0]|0))break b;e=e+-1|0;d=d+1|0;c=c+1|0;}}while(0);a=a+8|0;}return a|0;}function qE(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;g=u;u=u+32|0;f=g;c=k[a+4>>2]|0;d=k[a>>2]|0;e=(c-d>>3)+1|0;if(e>>>0>536870911)jN(a);i=(k[a+8>>2]|0)-d|0;h=i>>2;vE(f,i>>3>>>0<268435455?h>>>0<e>>>0?e:h:536870911,c-d>>3,a+8|0);e=f+8|0;c=k[e>>2]|0;k[c>>2]=k[b>>2];d=k[b+4>>2]|0;k[c+4>>2]=d;if(d){mN(d);c=k[e>>2]|0;}k[e>>2]=c+8;wE(a,f);xE(f);u=g;return;}function rE(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0;l=u;u=u+64|0;e=l+48|0;f=l+32|0;g=l+16|0;h=l;i=a+24|0;k[e>>2]=k[i>>2];k[e+4>>2]=k[i+4>>2];k[e+8>>2]=k[i+8>>2];k[e+12>>2]=k[i+12>>2];j=k[a+68>>2]|0;d=k[a+64>>2]|0;while(1){if((d|0)==(j|0))break;if(k[d>>2]|0){Ss(f);b=k[d>>2]|0;switch(k[b+12>>2]|0){case 3:{ZD(g,b);k[f>>2]=k[g>>2];k[f+4>>2]=k[g+4>>2];k[f+8>>2]=k[g+8>>2];k[f+12>>2]=k[g+12>>2];c=14;break;}case 4:{WD(g,b);k[f>>2]=k[g>>2];k[f+4>>2]=k[g+4>>2];k[f+8>>2]=k[g+8>>2];k[f+12>>2]=k[g+12>>2];c=14;break;}case 5:{YD(g,b);k[f>>2]=k[g>>2];k[f+4>>2]=k[g+4>>2];k[f+8>>2]=k[g+8>>2];k[f+12>>2]=k[g+12>>2];c=14;break;}case 6:{_D(g,b);k[f>>2]=k[g>>2];k[f+4>>2]=k[g+4>>2];k[f+8>>2]=k[g+8>>2];k[f+12>>2]=k[g+12>>2];c=14;break;}case 8:{$D(g,b);k[f>>2]=k[g>>2];k[f+4>>2]=k[g+4>>2];k[f+8>>2]=k[g+8>>2];k[f+12>>2]=k[g+12>>2];c=14;break;}case 7:{if(sE(a,b,f)|0)c=14;else{b=k[d>>2]|0;c=13;}break;}default:c=13;}if((c|0)==13){AN(h,b);CN(h);}else if((c|0)==14?(0,!(_s(i,f)|0)):0){Xs(g,f,5.0);k[f>>2]=k[g>>2];k[f+4>>2]=k[g+4>>2];k[f+8>>2]=k[g+8>>2];k[f+12>>2]=k[g+12>>2];Ys(g,e,f);k[e>>2]=k[g>>2];k[e+4>>2]=k[g+4>>2];k[e+8>>2]=k[g+8>>2];k[e+12>>2]=k[g+12>>2];}}d=d+8|0;}j=a+8|0;k[j>>2]=k[e>>2];k[j+4>>2]=k[e+4>>2];k[j+8>>2]=k[e+8>>2];k[j+12>>2]=k[e+12>>2];u=l;return;}function sE(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;e=u;u=u+32|0;f=e+16|0;d=e;i[f>>0]=0;Ss(d);tE(a+104|0,b,f,d);if(!(i[f>>0]|0))a=0;else{k[c>>2]=k[d>>2];k[c+4>>2]=k[d+4>>2];k[c+8>>2]=k[d+8>>2];k[c+12>>2]=k[d+12>>2];a=1;}u=e;return a|0;}function tE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if(k[a+16>>2]|0)uE(a,b,c,d);return;}function uE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;a=k[a+16>>2]|0;if(!a){d=rc(4)|0;k[d>>2]=3632;Ld(d|0,288,44);}else{re[k[(k[a>>2]|0)+24>>2]&31](a,b,c,d);return;}}function vE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;do if(b){if(b>>>0>536870911){c=rc(4)|0;GO(c);Ld(c|0,2912,370);}else{d=rN(b<<3)|0;break;}}else d=0;while(0);k[a>>2]=d;c=d+(c<<3)|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+(b<<3);return;}function wE(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;d=k[a>>2]|0;e=a+4|0;f=b+4|0;c=k[e>>2]|0;while(1){if((c|0)==(d|0))break;i=k[f>>2]|0;g=c+-8|0;k[i+-8>>2]=k[g>>2];h=c+-4|0;k[i+-4>>2]=k[h>>2];k[g>>2]=0;k[h>>2]=0;k[f>>2]=(k[f>>2]|0)+-8;c=g;}g=k[a>>2]|0;k[a>>2]=k[f>>2];k[f>>2]=g;g=b+8|0;i=k[e>>2]|0;k[e>>2]=k[g>>2];k[g>>2]=i;g=a+8|0;i=b+12|0;h=k[g>>2]|0;k[g>>2]=k[i>>2];k[i>>2]=h;k[b>>2]=k[f>>2];return;}function xE(a){a=a|0;var b=0,c=0,d=0;b=k[a+4>>2]|0;c=a+8|0;while(1){d=k[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;k[c>>2]=d;Ng(d);}a=k[a>>2]|0;if(a|0)vN(a);return;}function yE(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0;e=k[b>>2]|0;d=k[a>>2]|0;while(1){h=e;g=k[d>>2]|0;f=e;k[d>>2]=k[f>>2];k[f>>2]=g;f=d+4|0;d=h+4|0;e=k[f>>2]|0;k[f>>2]=k[d>>2];k[d>>2]=e;d=(k[a>>2]|0)+8|0;k[a>>2]=d;h=h+8|0;e=h;f=k[b>>2]|0;g=(d|0)==(f|0);if((h|0)==(k[c>>2]|0))break;if(!g)continue;k[b>>2]=e;}if(!g){e=d;while(1){i=f;h=k[e>>2]|0;g=f;k[e>>2]=k[g>>2];k[g>>2]=h;g=e+4|0;e=i+4|0;f=k[g>>2]|0;k[g>>2]=k[e>>2];k[e>>2]=f;e=(k[a>>2]|0)+8|0;k[a>>2]=e;i=i+8|0;f=i;g=k[b>>2]|0;h=(e|0)==(g|0);if((i|0)==(k[c>>2]|0))if(h)break;else{f=g;continue;}if(!h)continue;k[b>>2]=f;}}return d|0;}function zE(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;h=u;u=u+16|0;g=h;e=pE(a,b)|0;f=a+4|0;a:do if((e|0)==(k[f>>2]|0))b=0;else{a=k[e>>2]|0;k[g>>2]=a;d=g+4|0;b=k[e+4>>2]|0;k[d>>2]=b;if(b|0)mN(b);k[g>>2]=k[c>>2];k[c>>2]=a;c=c+4|0;k[d>>2]=k[c>>2];k[c>>2]=b;Ng(g);d=k[f>>2]|0;c=g+4|0;a=e;while(1){b=a+8|0;if((b|0)==(d|0))break;e=k[b>>2]|0;j=a+12|0;i=k[j>>2]|0;k[b>>2]=0;k[j>>2]=0;k[g>>2]=k[a>>2];k[a>>2]=e;e=a+4|0;k[c>>2]=k[e>>2];k[e>>2]=i;Ng(g);a=b;}while(1){b=k[f>>2]|0;if((b|0)==(a|0)){b=1;break a;}j=b+-8|0;k[f>>2]=j;Ng(j);}}while(0);u=h;return b|0;}function AE(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;f=u;u=u+16|0;e=f;b=pE(a,b)|0;if((b|0)==(k[a+4>>2]|0))b=0;else{a=k[b>>2]|0;k[e>>2]=a;d=e+4|0;b=k[b+4>>2]|0;k[d>>2]=b;if(b|0)mN(b);k[e>>2]=k[c>>2];k[c>>2]=a;c=c+4|0;k[d>>2]=k[c>>2];k[c>>2]=b;Ng(e);b=1;}u=f;return b|0;}function BE(a){a=a|0;var b=0,c=0,d=0;b=k[a>>2]|0;if(b|0){c=a+4|0;while(1){d=k[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;k[c>>2]=d;Ng(d);}vN(k[a>>2]|0);}return;}function CE(a,b){a=a|0;b=b|0;var c=0,d=0;k[a>>2]=7004;i[a+4>>0]=0;Ss(a+8|0);Ss(a+24|0);k[a+96>>2]=0;k[a+120>>2]=0;c=a+40|0;d=c+36|0;do{k[c>>2]=0;c=c+4|0;}while((c|0)<(d|0));if(k[b>>2]|0)DE(a,b);return;}function DE(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;h=u;u=u+16|0;e=h;g=a+24|0;f=(k[b>>2]|0)+28|0;k[g>>2]=k[f>>2];k[g+4>>2]=k[f+4>>2];k[g+8>>2]=k[f+8>>2];k[g+12>>2]=k[f+12>>2];RO(a+8|0,f|0,16)|0;f=k[b>>2]|0;k[e>>2]=f;g=e+4|0;b=k[b+4>>2]|0;k[g>>2]=b;if(b|0)mN(b);c=a+44|0;d=k[c>>2]|0;if(d>>>0<(k[a+48>>2]|0)>>>0){k[d>>2]=f;k[d+4>>2]=b;k[e>>2]=0;k[g>>2]=0;k[c>>2]=d+8;}else EE(a+40|0,e);Ng(e);i[a+4>>0]=1;u=h;return;}function EE(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;g=u;u=u+32|0;c=g;d=k[a+4>>2]|0;e=k[a>>2]|0;f=(d-e>>3)+1|0;if(f>>>0>536870911)jN(a);else{i=(k[a+8>>2]|0)-e|0;h=i>>2;vE(c,i>>3>>>0<268435455?h>>>0<f>>>0?f:h:536870911,d-e>>3,a+8|0);f=c+8|0;e=k[f>>2]|0;k[e>>2]=k[b>>2];d=b+4|0;k[e+4>>2]=k[d>>2];k[b>>2]=0;k[d>>2]=0;k[f>>2]=e+8;wE(a,c);xE(c);u=g;return;}}function FE(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,l=0,m=0,n=0,p=0,q=0,r=0;r=u;u=u+80|0;h=r+72|0;n=r+56|0;f=r+40|0;p=r+24|0;g=r+32|0;q=r+8|0;l=r;m=r+16|0;Xd[k[(k[e>>2]|0)+8>>2]&255](n,e);o[h>>2]=0.0;o[h+4>>2]=0.0;o[p>>2]=+(c>>>0);o[p+4>>2]=+(d>>>0);Ts(f,h,p);c=sN(44,40063)|0;if(!c)c=0;else GE(c,n,b,f);k[g>>2]=0;k[h>>2]=k[g>>2];HE(p,c,h);g=k[p>>2]|0;c=g;if(!g){j[a>>1]=22;k[a+4>>2]=0;k[a+8>>2]=0;}else{d=sN(128,40063)|0;if(!d){k[m>>2]=0;k[h>>2]=k[m>>2];IE(q,0,h);}else{k[l>>2]=c;c=k[p+4>>2]|0;k[l+4>>2]=c;if(c|0)mN(c);CE(d,l);k[m>>2]=0;k[h>>2]=k[m>>2];IE(q,d,h);JE(l);}m=k[q>>2]|0;c=m;if((m|0)!=0?(i[m+4>>0]|0)!=0:0){j[a>>1]=0;k[a+4>>2]=c;c=k[q+4>>2]|0;k[a+8>>2]=c;if(c|0)mN(c);}else{j[a>>1]=22;k[a+4>>2]=0;k[a+8>>2]=0;}KE(q);}LE(p);CN(n);u=r;return;}function GE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;AN(a,b);k[a+12>>2]=1;AN(a+16|0,c);c=a+28|0;k[c>>2]=k[d>>2];k[c+4>>2]=k[d+4>>2];k[c+8>>2]=k[d+8>>2];k[c+12>>2]=k[d+12>>2];return;}function HE(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=7100;k[c+12>>2]=b;k[a+4>>2]=c;return;}function IE(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=7072;k[c+12>>2]=b;k[a+4>>2]=c;return;}function JE(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function KE(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function LE(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function ME(a){a=a|0;kN(a);vN(a);return;}function NE(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function OE(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==26403?a+12|0:0)|0;}function PE(a){a=a|0;vN(a);return;}function QE(a){a=a|0;CN(a+16|0);CN(a);return;}function RE(a){a=a|0;kN(a);vN(a);return;}function SE(a){a=a|0;a=k[a+12>>2]|0;if(a|0){QE(a);vN(a);}return;}function TE(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==26530?a+12|0:0)|0;}function UE(a){a=a|0;vN(a);return;}function VE(){WE(0);return;}function WE(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0;a=u;u=u+16|0;b=a;g=a+15|0;f=a+14|0;e=a+13|0;d=a+12|0;c=a+8|0;XE(g,26669);YE(YE(YE(g,26677,0)|0,26681,1)|0,26687,2)|0;ZE(g);_E(f,26692);$E($E(f,26700,0)|0,26702,4)|0;aF(f);bF(e,26704);cF(cF(e,26711,0)|0,26717,4)|0;dF(e);eF(d,26724);gF(fF(fF(d,26711,0)|0,26717,4)|0,26737,8)|0;hF(d);iF(a+11|0,26755);lb(2016,26762,0);lb(2016,26767,1);lb(2016,26772,2);lb(2016,26778,3);lb(2016,26784,4);lb(2016,26789,5);lb(2016,26799,6);jF(a+10|0,26804);lb(2024,26820,0);lb(2024,26832,1);kF(a+9|0,26844);lb(2032,26863,0);lb(2032,26877,1);lb(2032,26885,2);lb(2032,26895,3);lb(2032,26902,4);lb(2032,26917,5);lb(2032,26933,6);lb(2032,26946,7);lF(c,26961);tF(sF(rF(mF(qF(pF(oF(nF(mF(c,26981,0)|0,26992,4)|0,27002,6)|0,27012,8)|0,27017,12)|0,27028,24)|0,27044,28)|0,27059,40)|0,27074,48)|0;uF(c);ic(2040,2048,2064,0,27092,141,27095,0,27095,0,27097,27106,382);fb(2040,1,7120,27092,142,1);k[b>>2]=91;k[b+4>>2]=0;Hc(2040,27109,3,7124,27116,26,zF(b)|0,0);k[b>>2]=143;k[b+4>>2]=0;Hc(2040,33082,2,7136,27121,92,BF(b)|0,0);k[b>>2]=93;k[b+4>>2]=0;Hc(2040,27125,3,7144,27116,27,DF(b)|0,0);k[b>>2]=94;k[b+4>>2]=0;Hc(2040,27133,3,7156,27116,28,FF(b)|0,0);k[b>>2]=95;k[b+4>>2]=0;Hc(2040,27146,3,7168,27116,29,HF(b)|0,0);k[b>>2]=96;k[b+4>>2]=0;Hc(2040,33206,3,7180,27116,30,JF(b)|0,0);k[b>>2]=2;k[b+4>>2]=0;Hc(2040,33213,4,7192,27155,1,LF(b)|0,0);k[b>>2]=3;k[b+4>>2]=0;Hc(2040,27161,3,7208,27183,3,NF(b)|0,0);k[b>>2]=4;k[b+4>>2]=0;Hc(2040,27188,3,7208,27183,3,NF(b)|0,0);k[b>>2]=97;k[b+4>>2]=0;Hc(2040,27208,3,7220,27116,31,PF(b)|0,0);k[b>>2]=98;k[b+4>>2]=0;Hc(2040,27218,3,7220,27116,31,PF(b)|0,0);k[b>>2]=99;k[b+4>>2]=0;Hc(2040,27228,3,7220,27116,31,PF(b)|0,0);k[b>>2]=100;k[b+4>>2]=0;Hc(2040,27237,3,7220,27116,31,PF(b)|0,0);k[b>>2]=144;k[b+4>>2]=0;Hc(2040,27245,2,7136,27121,92,BF(b)|0,0);k[b>>2]=101;k[b+4>>2]=0;Hc(2040,27254,3,7232,27116,32,RF(b)|0,0);k[b>>2]=102;k[b+4>>2]=0;Hc(2040,27267,3,7244,27116,33,TF(b)|0,0);k[b>>2]=145;k[b+4>>2]=0;Hc(2040,27279,2,7136,27121,92,BF(b)|0,0);k[b>>2]=146;k[b+4>>2]=0;Hc(2040,27291,2,7136,27121,92,BF(b)|0,0);k[b>>2]=103;k[b+4>>2]=0;Hc(2040,27303,3,7180,27116,30,JF(b)|0,0);k[b>>2]=104;k[b+4>>2]=0;Hc(2040,27319,3,7256,27116,34,VF(b)|0,0);k[b>>2]=145;k[b+4>>2]=0;Nb(2040,27329,2080,27121,105,YF(b)|0,0,0,0,0);u=a;return;}function XE(a,b){a=a|0;b=b|0;Ac(2128,b|0,27591,2,27106,383);return;}function YE(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=rN(4)|0;k[e>>2]=c;d=rN(4)|0;k[d>>2]=c;Cb(2128,b|0,3008,27121,106,e|0,3008,27573,48,d|0);return a|0;}function ZE(a){a=a|0;Pb(2128);return;}function _E(a,b){a=a|0;b=b|0;Ac(2112,b|0,27591,3,27106,384);return;}function $E(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=rN(4)|0;k[e>>2]=c;d=rN(4)|0;k[d>>2]=c;Cb(2112,b|0,3072,27649,1,e|0,3072,27653,3,d|0);return a|0;}function aF(a){a=a|0;Pb(2112);return;}function bF(a,b){a=a|0;b=b|0;Ac(2144,b|0,27591,4,27106,385);return;}function cF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=rN(4)|0;k[e>>2]=c;d=rN(4)|0;k[d>>2]=c;Cb(2144,b|0,3048,27121,107,e|0,3048,27573,49,d|0);return a|0;}function dF(a){a=a|0;Pb(2144);return;}function eF(a,b){a=a|0;b=b|0;Ac(2120,b|0,27591,5,27106,386);return;}function fF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=rN(4)|0;k[e>>2]=c;d=rN(4)|0;k[d>>2]=c;Cb(2120,b|0,3048,27121,108,e|0,3048,27573,50,d|0);return a|0;}function gF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=rN(4)|0;k[e>>2]=c;d=rN(4)|0;k[d>>2]=c;Cb(2120,b|0,3072,27649,2,e|0,3072,27653,4,d|0);return a|0;}function hF(a){a=a|0;Pb(2120);return;}function iF(a,b){a=a|0;b=b|0;Md(2016,b|0,4,1);return;}function jF(a,b){a=a|0;b=b|0;Md(2024,b|0,4,1);return;}function kF(a,b){a=a|0;b=b|0;Md(2032,b|0,4,1);return;}function lF(a,b){a=a|0;b=b|0;Ac(2136,b|0,27591,6,27106,387);return;}function mF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=rN(4)|0;k[e>>2]=c;d=rN(4)|0;k[d>>2]=c;Cb(2136,b|0,2128,27121,109,e|0,2128,27573,51,d|0);return a|0;}function nF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=rN(4)|0;k[e>>2]=c;d=rN(4)|0;k[d>>2]=c;Cb(2136,b|0,3032,27121,110,e|0,3032,27573,52,d|0);return a|0;}function oF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=rN(4)|0;k[e>>2]=c;d=rN(4)|0;k[d>>2]=c;Cb(2136,b|0,2992,27121,111,e|0,2992,27573,53,d|0);return a|0;}function pF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=rN(4)|0;k[e>>2]=c;d=rN(4)|0;k[d>>2]=c;Cb(2136,b|0,2016,27121,112,e|0,2016,27573,54,d|0);return a|0;}function qF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=rN(4)|0;k[e>>2]=c;d=rN(4)|0;k[d>>2]=c;Cb(2136,b|0,2120,27121,113,e|0,2120,27573,55,d|0);return a|0;}function rF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=rN(4)|0;k[e>>2]=c;d=rN(4)|0;k[d>>2]=c;Cb(2136,b|0,2080,27121,114,e|0,2080,27573,56,d|0);return a|0;}function sF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=rN(4)|0;k[e>>2]=c;d=rN(4)|0;k[d>>2]=c;Cb(2136,b|0,2144,27121,115,e|0,2144,27573,57,d|0);return a|0;}function tF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=rN(4)|0;k[e>>2]=c;d=rN(4)|0;k[d>>2]=c;Cb(2136,b|0,2024,27121,116,e|0,2024,27573,58,d|0);return a|0;}function uF(a){a=a|0;Pb(2136);return;}function vF(a){a=a|0;return 2040;}function wF(a){a=a|0;if(a|0){cJ(a);vN(a);}return;}function xF(a){a=a|0;return le[a&7]()|0;}function yF(){var a=0;a=rN(36)|0;bJ(a);return a|0;}function zF(a){a=a|0;var b=0,c=0;b=rN(8)|0;c=k[a+4>>2]|0;k[b>>2]=k[a>>2];k[b+4>>2]=c;return b|0;}function AF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=k[a>>2]|0;e=k[a+4>>2]|0;a=b+(e>>1)|0;if(e&1)d=k[(k[a>>2]|0)+d>>2]|0;return je[d&127](a,c)|0;}function BF(a){a=a|0;var b=0,c=0;b=rN(8)|0;c=k[a+4>>2]|0;k[b>>2]=k[a>>2];k[b+4>>2]=c;return b|0;}function CF(a,b){a=a|0;b=b|0;var c=0,d=0;c=k[a>>2]|0;d=k[a+4>>2]|0;a=b+(d>>1)|0;if(d&1)c=k[(k[a>>2]|0)+c>>2]|0;return Zd[c&255](a)|0;}function DF(a){a=a|0;var b=0,c=0;b=rN(8)|0;c=k[a+4>>2]|0;k[b>>2]=k[a>>2];k[b+4>>2]=c;return b|0;}function EF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=k[a>>2]|0;e=k[a+4>>2]|0;a=b+(e>>1)|0;if(e&1)d=k[(k[a>>2]|0)+d>>2]|0;return je[d&127](a,c)|0;}function FF(a){a=a|0;var b=0,c=0;b=rN(8)|0;c=k[a+4>>2]|0;k[b>>2]=k[a>>2];k[b+4>>2]=c;return b|0;}function GF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=k[a>>2]|0;e=k[a+4>>2]|0;a=b+(e>>1)|0;if(e&1)d=k[(k[a>>2]|0)+d>>2]|0;return je[d&127](a,c)|0;}function HF(a){a=a|0;var b=0,c=0;b=rN(8)|0;c=k[a+4>>2]|0;k[b>>2]=k[a>>2];k[b+4>>2]=c;return b|0;}function IF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=k[a>>2]|0;e=k[a+4>>2]|0;a=b+(e>>1)|0;if(e&1)d=k[(k[a>>2]|0)+d>>2]|0;return je[d&127](a,c)|0;}function JF(a){a=a|0;var b=0,c=0;b=rN(8)|0;c=k[a+4>>2]|0;k[b>>2]=k[a>>2];k[b+4>>2]=c;return b|0;}function KF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=k[a>>2]|0;e=k[a+4>>2]|0;a=b+(e>>1)|0;if(e&1)d=k[(k[a>>2]|0)+d>>2]|0;return je[d&127](a,c)|0;}function LF(a){a=a|0;var b=0,c=0;b=rN(8)|0;c=k[a+4>>2]|0;k[b>>2]=k[a>>2];k[b+4>>2]=c;return b|0;}function MF(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;var e=0,f=0;e=k[a>>2]|0;f=k[a+4>>2]|0;a=b+(f>>1)|0;if(f&1)e=k[(k[a>>2]|0)+e>>2]|0;return de[e&3](a,c,d)|0;}function NF(a){a=a|0;var b=0,c=0;b=rN(8)|0;c=k[a+4>>2]|0;k[b>>2]=k[a>>2];k[b+4>>2]=c;return b|0;}function OF(a,b,c){a=a|0;b=b|0;c=+c;var d=0,e=0;d=k[a>>2]|0;e=k[a+4>>2]|0;a=b+(e>>1)|0;if(e&1)d=k[(k[a>>2]|0)+d>>2]|0;return ge[d&7](a,c)|0;}function PF(a){a=a|0;var b=0,c=0;b=rN(8)|0;c=k[a+4>>2]|0;k[b>>2]=k[a>>2];k[b+4>>2]=c;return b|0;}function QF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=k[a>>2]|0;e=k[a+4>>2]|0;a=b+(e>>1)|0;if(e&1)d=k[(k[a>>2]|0)+d>>2]|0;return je[d&127](a,c)|0;}function RF(a){a=a|0;var b=0,c=0;b=rN(8)|0;c=k[a+4>>2]|0;k[b>>2]=k[a>>2];k[b+4>>2]=c;return b|0;}function SF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=k[a>>2]|0;e=k[a+4>>2]|0;a=b+(e>>1)|0;if(e&1)d=k[(k[a>>2]|0)+d>>2]|0;return je[d&127](a,c)|0;}function TF(a){a=a|0;var b=0,c=0;b=rN(8)|0;c=k[a+4>>2]|0;k[b>>2]=k[a>>2];k[b+4>>2]=c;return b|0;}function UF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=k[a>>2]|0;e=k[a+4>>2]|0;a=b+(e>>1)|0;if(e&1)d=k[(k[a>>2]|0)+d>>2]|0;return je[d&127](a,c)|0;}function VF(a){a=a|0;var b=0,c=0;b=rN(8)|0;c=k[a+4>>2]|0;k[b>>2]=k[a>>2];k[b+4>>2]=c;return b|0;}function WF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=k[a>>2]|0;e=k[a+4>>2]|0;a=b+(e>>1)|0;if(e&1)d=k[(k[a>>2]|0)+d>>2]|0;return je[d&127](a,c)|0;}function XF(a,b){a=a|0;b=b|0;AN(a,b);return;}function YF(a){a=a|0;var b=0,c=0;b=rN(8)|0;c=k[a+4>>2]|0;k[b>>2]=k[a>>2];k[b+4>>2]=c;return b|0;}function ZF(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;e=u;u=u+16|0;d=e;c=k[a>>2]|0;f=k[a+4>>2]|0;a=b+(f>>1)|0;if(f&1)c=k[(k[a>>2]|0)+c>>2]|0;Xd[c&255](d,a);f=_F(d)|0;CN(d);u=e;return f|0;}function _F(a){a=a|0;var b=0,c=0,d=0;c=i[a+11>>0]|0;d=c<<24>>24<0;c=d?k[a+4>>2]|0:c&255;b=fN(c+4|0)|0;k[b>>2]=c;PO(b+4|0,(d?k[a>>2]|0:a)|0,c|0)|0;return b|0;}function $F(a,b){a=a|0;b=b|0;return k[b+(k[a>>2]|0)>>2]|0;}function aG(a,b,c){a=a|0;b=b|0;c=c|0;k[b+(k[a>>2]|0)>>2]=c;return;}function bG(a,b){a=a|0;b=b|0;return dG(b+(k[a>>2]|0)|0)|0;}function cG(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=c;d=k[e+4>>2]|0;c=b+(k[a>>2]|0)|0;k[c>>2]=k[e>>2];k[c+4>>2]=d;return;}function dG(a){a=a|0;var b=0,c=0,d=0;b=rN(8)|0;d=a;c=k[d+4>>2]|0;a=b;k[a>>2]=k[d>>2];k[a+4>>2]=c;return b|0;}function eG(a,b){a=a|0;b=b|0;return _F(b+(k[a>>2]|0)|0)|0;}function fG(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=u;u=u+16|0;d=e;b=b+(k[a>>2]|0)|0;gG(d,c);a=b+11|0;if((i[a>>0]|0)<0){i[k[b>>2]>>0]=0;k[b+4>>2]=0;}else{i[b>>0]=0;i[a>>0]=0;}FN(b,0);k[b>>2]=k[d>>2];k[b+4>>2]=k[d+4>>2];k[b+8>>2]=k[d+8>>2];a=0;while(1){if((a|0)==3)break;k[d+(a<<2)>>2]=0;a=a+1|0;}CN(d);u=e;return;}function gG(a,b){a=a|0;b=b|0;var c=0;c=k[b>>2]|0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;BN(a,b+4|0,c);return;}function hG(a,b){a=a|0;b=b|0;a=b+(k[a>>2]|0)|0;b=rN(12)|0;k[b>>2]=k[a>>2];k[b+4>>2]=k[a+4>>2];k[b+8>>2]=k[a+8>>2];return b|0;}function iG(a,b,c){a=a|0;b=b|0;c=c|0;b=b+(k[a>>2]|0)|0;k[b>>2]=k[c>>2];k[b+4>>2]=k[c+4>>2];k[b+8>>2]=k[c+8>>2];return;}function jG(a,b){a=a|0;b=b|0;return k[b+(k[a>>2]|0)>>2]|0;}function kG(a,b,c){a=a|0;b=b|0;c=c|0;k[b+(k[a>>2]|0)>>2]=c;return;}function lG(a,b){a=a|0;b=b|0;return(i[b+(k[a>>2]|0)>>0]|0)!=0|0;}function mG(a,b,c){a=a|0;b=b|0;c=c|0;i[b+(k[a>>2]|0)>>0]=c&1;return;}function nG(a,b){a=a|0;b=b|0;return j[b+(k[a>>2]|0)>>1]|0;}function oG(a,b,c){a=a|0;b=b|0;c=c|0;j[b+(k[a>>2]|0)>>1]=c;return;}function pG(a,b){a=a|0;b=b|0;a=b+(k[a>>2]|0)|0;b=rN(3)|0;i[b>>0]=i[a>>0]|0;i[b+1>>0]=i[a+1>>0]|0;i[b+2>>0]=i[a+2>>0]|0;return b|0;}function qG(a,b,c){a=a|0;b=b|0;c=c|0;b=b+(k[a>>2]|0)|0;i[b>>0]=i[c>>0]|0;i[b+1>>0]=i[c+1>>0]|0;i[b+2>>0]=i[c+2>>0]|0;return;}function rG(){var a=0,b=0,c=0;a=rN(52)|0;b=a;c=b+52|0;do{k[b>>2]=0;b=b+4|0;}while((b|0)<(c|0));tG(a);return a|0;}function sG(a){a=a|0;if(a|0){CN(a+28|0);vN(a);}return;}function tG(a){a=a|0;var b=0;b=a+28|0;k[b>>2]=0;k[b+4>>2]=0;k[b+8>>2]=0;a=0;while(1){if((a|0)==3)break;k[b+(a<<2)>>2]=0;a=a+1|0;}return;}function uG(a,b){a=a|0;b=b|0;return+ +o[b+(k[a>>2]|0)>>2];}function vG(a,b,c){a=a|0;b=b|0;c=+c;o[b+(k[a>>2]|0)>>2]=c;return;}function wG(a,b){a=a|0;b=b|0;return k[b+(k[a>>2]|0)>>2]|0;}function xG(a,b,c){a=a|0;b=b|0;c=c|0;k[b+(k[a>>2]|0)>>2]=c;return;}function yG(){var a=0;a=rN(12)|0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;return a|0;}function zG(a){a=a|0;if(a|0)vN(a);return;}function AG(a,b){a=a|0;b=b|0;return k[b+(k[a>>2]|0)>>2]|0;}function BG(a,b,c){a=a|0;b=b|0;c=c|0;k[b+(k[a>>2]|0)>>2]=c;return;}function CG(){var a=0,b=0;a=rN(8)|0;b=a;k[b>>2]=0;k[b+4>>2]=0;return a|0;}function DG(a){a=a|0;if(a|0)vN(a);return;}function EG(a,b){a=a|0;b=b|0;return+ +o[b+(k[a>>2]|0)>>2];}function FG(a,b,c){a=a|0;b=b|0;c=+c;o[b+(k[a>>2]|0)>>2]=c;return;}function GG(){var a=0,b=0;a=rN(8)|0;b=a;k[b>>2]=0;k[b+4>>2]=0;return a|0;}function HG(a){a=a|0;if(a|0)vN(a);return;}function IG(a,b){a=a|0;b=b|0;return i[b+(k[a>>2]|0)>>0]|0;}function JG(a,b,c){a=a|0;b=b|0;c=c|0;i[b+(k[a>>2]|0)>>0]=c;return;}function KG(){var a=0;a=rN(3)|0;i[a>>0]=0;i[a+1>>0]=0;i[a+2>>0]=0;return a|0;}function LG(a){a=a|0;if(a|0)vN(a);return;}function MG(a){a=a|0;var b=0;k[a>>2]=7276;b=a+4|0;a=k[b>>2]|0;k[b>>2]=0;xN(a);return;}function NG(a){a=a|0;MG(a);vN(a);return;}function OG(a,b,c){a=a|0;b=b|0;c=c|0;return(Rc(0,b|0,c|0)|0)!=0|0;}function PG(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;d=k[c+8>>2]<<2;if(SG(b,$(k[c+12>>2]|0,d)|0)|0)k[a>>2]=k[b+4>>2];else{k[a>>2]=0;d=0;}k[a+4>>2]=d;return;}function QG(a,b,c){a=a|0;b=b|0;c=c|0;a=k[b+12>>2]|0;hd(1,k[b>>2]|0,k[b+4>>2]|0,k[b+8>>2]|0,a|0,k[c>>2]|0,$(k[c+4>>2]|0,a)|0)|0;return;}function RG(a,b){a=a|0;b=b|0;return;}function SG(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=a+8|0;do if((k[c>>2]|0)>>>0<b>>>0){e=uN(b,40063)|0;a=a+4|0;d=k[a>>2]|0;k[a>>2]=e;xN(d);if(!(k[a>>2]|0)){k[c>>2]=0;a=0;break;}else{k[c>>2]=b;a=1;break;}}else a=1;while(0);return a|0;}function TG(a){a=a|0;k[a>>2]=7276;k[a+4>>2]=0;k[a+8>>2]=0;return;}function UG(a){a=a|0;k[a>>2]=7308;bu(a+4|0);return;}function VG(a){a=a|0;k[a>>2]=7308;bu(a+4|0);vN(a);return;}function WG(a){a=a|0;$t(a+4|0);Lb(2);return;}function XG(a,b,c){a=a|0;b=b|0;c=c|0;Lb(3);return 1;}function YG(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0;i=u;u=u+16|0;g=i+8|0;h=i;b=b+4|0;d=St(b,c)|0;if(d){k[a>>2]=k[d+20>>2];b=k[d+24>>2]|0;k[a+4>>2]=b;if(b|0)mN(b);}else{_G(h,0,c);if(!(k[h>>2]|0)){k[a>>2]=0;k[a+4>>2]=0;}else{b=Ut(b,c)|0;d=k[h>>2]|0;k[g>>2]=d;c=g+4|0;e=h+4|0;f=k[e>>2]|0;k[c>>2]=f;if(f|0)mN(f);k[g>>2]=k[b>>2];k[b>>2]=d;d=b+4|0;k[c>>2]=k[d>>2];k[d>>2]=f;Tt(g);k[a>>2]=k[h>>2];k[a+4>>2]=k[e>>2];k[h>>2]=0;k[e>>2]=0;}Tt(h);}u=i;return;}function ZG(a,b){a=a|0;b=b|0;return;}function _G(a,b,c){a=a|0;b=b|0;c=c|0;b=Va(4,((i[c+11>>0]|0)<0?k[c>>2]|0:c)|0)|0;if((b|0)==-1){k[a>>2]=0;k[a+4>>2]=0;}else $G(a,b);return;}function $G(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;g=u;u=u+32|0;d=g+16|0;f=g+8|0;e=g;c=sN(24,40063)|0;if(!c)c=0;else{h=c+4|0;k[h>>2]=0;k[h+4>>2]=0;k[h+8>>2]=0;k[h+12>>2]=0;k[c>>2]=7340;k[c+12>>2]=0;k[c+16>>2]=0;k[c+20>>2]=0;}k[e>>2]=0;k[d>>2]=k[e>>2];aH(f,c,d);c=k[f>>2]|0;do if(c){if(bH(c,b)|0){k[a>>2]=k[f>>2];h=f+4|0;k[a+4>>2]=k[h>>2];k[f>>2]=0;k[h>>2]=0;break;}else{k[a>>2]=0;k[a+4>>2]=0;break;}}else{k[a>>2]=0;k[a+4>>2]=0;}while(0);cH(f);u=g;return;}function aH(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=7420;k[c+12>>2]=b;k[a+4>>2]=c;return;}function bH(a,b){a=a|0;b=b|0;if(dH(a,b)|0)a=eH(a,b)|0;else a=0;return a|0;}function cH(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function dH(a,b){a=a|0;b=b|0;var c=0;c=Va(5,b|0)|0;b=Va(6,b|0)|0;if((b|c|0)<0)b=0;else{k[a+4>>2]=c;k[a+8>>2]=b;b=1;}return b|0;}function eH(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0;l=u;u=u+16|0;g=l;h=Va(7,b|0)|0;a:do if((h|0)<1)a=0;else{i=a+16|0;j=a+20|0;e=a+12|0;f=g+4|0;d=0;while(1){if((d|0)>=(h|0)){a=1;break a;}fH(g,b,d);c=k[g>>2]|0;if(!c)break;a=k[i>>2]|0;if((a|0)==(k[j>>2]|0))gH(e,g);else{k[a>>2]=c;c=k[f>>2]|0;k[a+4>>2]=c;if(c){mN(c);a=k[i>>2]|0;}k[i>>2]=a+8;}Ot(g);d=d+1|0;}Ot(g);a=0;}while(0);u=l;return a|0;}function fH(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;h=u;u=u+32|0;e=h+16|0;g=h+8|0;f=h;d=sN(44,40063)|0;if(!d)d=0;else{k[d>>2]=7368;k[d+4>>2]=b;k[d+8>>2]=c;}k[f>>2]=0;k[e>>2]=k[f>>2];hH(g,d,e);d=k[g>>2]|0;do if(d){if(iH(d)|0){k[a>>2]=k[g>>2];f=g+4|0;k[a+4>>2]=k[f>>2];k[g>>2]=0;k[f>>2]=0;break;}else{k[a>>2]=0;k[a+4>>2]=0;break;}}else{k[a>>2]=0;k[a+4>>2]=0;}while(0);jH(g);u=h;return;}function gH(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;g=u;u=u+32|0;f=g;c=k[a+4>>2]|0;d=k[a>>2]|0;e=(c-d>>3)+1|0;if(e>>>0>536870911)jN(a);i=(k[a+8>>2]|0)-d|0;h=i>>2;Pt(f,i>>3>>>0<268435455?h>>>0<e>>>0?e:h:536870911,c-d>>3,a+8|0);e=f+8|0;c=k[e>>2]|0;k[c>>2]=k[b>>2];d=k[b+4>>2]|0;k[c+4>>2]=d;if(d){mN(d);c=k[e>>2]|0;}k[e>>2]=c+8;Qt(a,f);Rt(f);u=g;return;}function hH(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=7392;k[c+12>>2]=b;k[a+4>>2]=c;return;}function iH(a){a=a|0;var b=0.0,c=0;if(!(Rc(8,k[a+4>>2]|0,k[a+8>>2]|0)|0))a=0;else{c=Gb(9)|0;k[a+12>>2]=c;c=Gb(10)|0;k[a+16>>2]=c;c=Gb(11)|0;k[a+20>>2]=c;c=Gb(12)|0;k[a+24>>2]=c;b=+Ja(13);o[a+28>>2]=b;b=+Ja(14);o[a+32>>2]=b;b=+Ja(15);o[a+36>>2]=b;b=+Ja(16);o[a+40>>2]=b;a=1;}return a|0;}function jH(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function kH(a){a=a|0;kN(a);vN(a);return;}function lH(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function mH(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==28367?a+12|0:0)|0;}function nH(a){a=a|0;vN(a);return;}function oH(a){a=a|0;return;}function pH(a){a=a|0;vN(a);return;}function qH(a){a=a|0;return a+12|0;}function rH(a){a=a|0;return(Rc(17,k[a+4>>2]|0,k[a+8>>2]|0)|0)!=0|0;}function sH(a){a=a|0;kN(a);vN(a);return;}function tH(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function uH(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==28696?a+12|0:0)|0;}function vH(a){a=a|0;vN(a);return;}function wH(a){a=a|0;k[a>>2]=7340;Nt(a+12|0);return;}function xH(a){a=a|0;k[a>>2]=7340;Nt(a+12|0);vN(a);return;}function yH(a){a=a|0;return k[a+4>>2]|0;}function zH(a){a=a|0;return k[a+8>>2]|0;}function AH(a){a=a|0;return a+12|0;}function BH(a){a=a|0;return;}function CH(a){a=a|0;vN(a);return;}function DH(a){a=a|0;Lb(18);return;}function EH(a,b,c){a=a|0;b=b|0;c=c|0;Lb(19);return 1;}function FH(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=+f;g=g|0;var h=0,i=0,j=0,l=0,m=0,n=0,p=0;p=u;u=u+32|0;j=p+24|0;m=p+16|0;h=p+8|0;n=p;k[n>>2]=0;l=n+4|0;k[l>>2]=0;b=k[g>>2]|0;i=b;if(!b){b=sN(76,40063)|0;if(!b)b=0;else zI(b);k[h>>2]=0;k[j>>2]=k[h>>2];IH(m,b,j);g=k[m>>2]|0;k[m>>2]=k[n>>2];k[n>>2]=g;g=m+4|0;j=k[g>>2]|0;k[g>>2]=k[l>>2];k[l>>2]=j;HH(m);}else{k[m>>2]=i;h=m+4|0;b=k[g+4>>2]|0;k[h>>2]=b;if(b|0)mN(b);k[m>>2]=0;k[h>>2]=0;k[j>>2]=0;k[n>>2]=i;k[j+4>>2]=0;k[l>>2]=b;HH(j);HH(m);}e=~~+NO(+(+(e&65535)*f))&65535;AI(k[n>>2]|0,c,d,e);e=k[n>>2]|0;o[e+68>>2]=f;k[a>>2]=e;k[a+4>>2]=k[l>>2];k[n>>2]=0;k[l>>2]=0;HH(n);u=p;return;}function GH(a,b){a=a|0;b=b|0;return;}function HH(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function IH(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=7480;k[c+12>>2]=b;k[a+4>>2]=c;return;}function JH(a){a=a|0;kN(a);vN(a);return;}function KH(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function LH(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==28966?a+12|0:0)|0;}function MH(a){a=a|0;vN(a);return;}function NH(a){a=a|0;k[a>>2]=7508;gI(a+8|0);return;}function OH(a){a=a|0;k[a>>2]=7508;gI(a+8|0);vN(a);return;}function PH(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,l=0;l=u;u=u+32|0;i=l+16|0;g=l+12|0;j=l;h=l+8|0;f=Gb(20)|0;k[g>>2]=f;e=sN(40,40063)|0;if(!e)e=0;else QH(e,f,c,d);k[h>>2]=0;k[i>>2]=k[h>>2];RH(j,e,i);if(!(k[j>>2]|0)){k[a>>2]=0;k[a+4>>2]=0;}else{e=SH(b+8|0,g)|0;c=k[j>>2]|0;k[i>>2]=c;d=i+4|0;f=j+4|0;b=k[f>>2]|0;k[d>>2]=b;if(b|0)nN(b);k[i>>2]=k[e>>2];k[e>>2]=c;h=e+4|0;k[d>>2]=k[h>>2];k[h>>2]=b;TH(i);k[a>>2]=k[j>>2];k[a+4>>2]=k[f>>2];k[j>>2]=0;k[f>>2]=0;}UH(j);u=l;return;}function QH(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a>>2]=7556;k[a+4>>2]=b;k[a+8>>2]=c;i[a+12>>0]=0;Xq(a+16|0,d);return;}function RH(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=7528;k[c+12>>2]=b;k[a+4>>2]=c;return;}function SH(a,b){a=a|0;b=b|0;var c=0,d=0,e=0.0,f=0.0,g=0,h=0,i=0,j=0,l=0,m=0,n=0,p=0,q=0;q=u;u=u+16|0;p=q;n=k[b>>2]|0;l=a+4|0;g=k[l>>2]|0;m=(g|0)==0;a:do if(!m){h=g+-1|0;i=(h&g|0)==0;if(i)c=h&n;else c=(n>>>0)%(g>>>0)|0;b=k[(k[a>>2]|0)+(c<<2)>>2]|0;if(!b)j=12;else do{b=k[b>>2]|0;if(!b){j=12;break a;}d=k[b+4>>2]|0;if(i)d=d&h;else d=(d>>>0)%(g>>>0)|0;if((d|0)!=(c|0)){j=12;break a;}}while((k[b+8>>2]|0)!=(n|0));}else{c=0;j=12;}while(0);if((j|0)==12){h=rN(20)|0;k[p>>2]=h;k[h+8>>2]=n;k[h+12>>2]=0;k[h+16>>2]=0;k[h+4>>2]=n;k[h>>2]=0;h=a+12|0;e=+(((k[h>>2]|0)+1|0)>>>0);f=+o[a+16>>2];do if(m|e>+(g>>>0)*f){b=(g>>>0>2&(g+-1&g|0)==0&1|g<<1)^1;c=~~+_(+(e/f))>>>0;VH(a,b>>>0<c>>>0?c:b);b=k[l>>2]|0;c=b+-1|0;if(!(c&b)){g=b;c=c&n;break;}else{g=b;c=(n>>>0)%(b>>>0)|0;break;}}while(0);b=k[(k[a>>2]|0)+(c<<2)>>2]|0;if(!b){n=a+8|0;b=k[p>>2]|0;k[b>>2]=k[n>>2];k[n>>2]=b;k[(k[a>>2]|0)+(c<<2)>>2]=n;c=k[b>>2]|0;if(c){c=k[c+4>>2]|0;d=g+-1|0;if(!(d&g))c=c&d;else c=(c>>>0)%(g>>>0)|0;k[(k[a>>2]|0)+(c<<2)>>2]=b;}}else{a=k[p>>2]|0;k[a>>2]=k[b>>2];k[b>>2]=a;b=a;}k[h>>2]=(k[h>>2]|0)+1;}u=q;return b+12|0;}function TH(a){a=a|0;a=k[a+4>>2]|0;if(a|0)pN(a);return;}function UH(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function VH(a,b){a=a|0;b=b|0;var c=0,d=0;if((b|0)!=1){if(b+-1&b)b=hN(b)|0;}else b=2;d=k[a+4>>2]|0;if(b>>>0<=d>>>0){if(b>>>0<d>>>0){c=~~+_(+(+((k[a+12>>2]|0)>>>0)/+o[a+16>>2]))>>>0;if(d>>>0>2&(d+-1&d|0)==0)c=1<<32-(ca(c+-1|0)|0);else c=hN(c)|0;b=b>>>0<c>>>0?c:b;if(b>>>0<d>>>0)WH(a,b);}}else WH(a,b);return;}function WH(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0;d=a+4|0;a:do if(b){if(b>>>0>1073741823){a=rc(4)|0;GO(a);Ld(a|0,2912,370);}l=rN(b<<2)|0;c=k[a>>2]|0;k[a>>2]=l;if(c|0)vN(c);k[d>>2]=b;c=0;while(1){if((c|0)==(b|0))break;k[(k[a>>2]|0)+(c<<2)>>2]=0;c=c+1|0;}e=a+8|0;c=k[e>>2]|0;if(c|0){d=k[c+4>>2]|0;j=b+-1|0;l=(j&b|0)==0;if(l)d=d&j;else d=(d>>>0)%(b>>>0)|0;k[(k[a>>2]|0)+(d<<2)>>2]=e;while(1){i=c;b:while(1)while(1){c=k[i>>2]|0;if(!c)break a;e=k[c+4>>2]|0;if(l)h=e&j;else h=(e>>>0)%(b>>>0)|0;if((h|0)==(d|0)){i=c;continue b;}e=(k[a>>2]|0)+(h<<2)|0;if(!(k[e>>2]|0))break b;f=c+8|0;e=c;while(1){g=k[e>>2]|0;if(!g)break;if((k[f>>2]|0)==(k[g+8>>2]|0))e=g;else break;}k[i>>2]=g;k[e>>2]=k[k[(k[a>>2]|0)+(h<<2)>>2]>>2];k[k[(k[a>>2]|0)+(h<<2)>>2]>>2]=c;}k[e>>2]=i;d=h;}}}else{c=k[a>>2]|0;k[a>>2]=0;if(c|0)vN(c);k[d>>2]=0;}while(0);return;}function XH(a){a=a|0;kN(a);vN(a);return;}function YH(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function ZH(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==29304?a+12|0:0)|0;}function _H(a){a=a|0;vN(a);return;}function $H(a){a=a|0;k[a>>2]=7556;if(i[a+12>>0]|0)eI(a);hh(a+16|0);return;}function aI(a){a=a|0;$H(a);vN(a);return;}function bI(a){a=a|0;if(!(i[a+12>>0]|0))fI(a);return;}function cI(a){a=a|0;if(i[a+12>>0]|0)eI(a);fI(a);return;}function dI(a){a=a|0;if(i[a+12>>0]|0)eI(a);return;}function eI(a){a=a|0;Va(21,k[a+4>>2]|0)|0;i[a+12>>0]=0;return;}function fI(a){a=a|0;Rc(22,k[a+4>>2]|0,k[a+8>>2]|0)|0;i[a+12>>0]=1;return;}function gI(a){a=a|0;var b=0;hI(a,k[a+8>>2]|0);b=k[a>>2]|0;k[a>>2]=0;if(b|0)vN(b);return;}function hI(a,b){a=a|0;b=b|0;while(1){if(!b)break;a=k[b>>2]|0;TH(b+12|0);vN(b);b=a;}return;}function iI(a){a=a|0;var b=0;k[a>>2]=7508;b=a+4|0;k[b>>2]=0;k[b+4>>2]=0;k[b+8>>2]=0;k[b+12>>2]=0;k[b+16>>2]=0;o[a+24>>2]=1.0;return;}function jI(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;d=u;u=u+16|0;e=d;c=d+8|0;k[e>>2]=b;a=kI(a+8|0,e)|0;if(a|0){lI(c,a+12|0);a=k[c>>2]|0;if(a|0)mI(a);UH(c);}u=d;return;}function kI(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;d=k[b>>2]|0;e=k[a+4>>2]|0;a:do if(e){f=e+-1|0;g=(f&e|0)==0;if(g)c=f&d;else c=(d>>>0)%(e>>>0)|0;b=k[(k[a>>2]|0)+(c<<2)>>2]|0;if(b)do{b=k[b>>2]|0;if(!b){b=0;break a;}a=k[b+4>>2]|0;if(g)a=a&f;else a=(a>>>0)%(e>>>0)|0;if((a|0)!=(c|0)){b=0;break a;}}while((k[b+8>>2]|0)!=(d|0));else b=0;}else b=0;while(0);return b|0;}function lI(a,b){a=a|0;b=b|0;var c=0,d=0;k[a>>2]=0;c=a+4|0;k[c>>2]=0;d=k[b+4>>2]|0;if(d){d=qN(d)|0;k[c>>2]=d;if(d|0)k[a>>2]=k[b>>2];}else k[c>>2]=0;return;}function mI(a){a=a|0;if(k[a+32>>2]|0)ch(a+16|0);return;}function nI(a){a=a|0;k[a>>2]=7584;Va(23,k[a+72>>2]|0)|0;uI(a+56|0);vI(a+16|0);wI(a+4|0);return;}function oI(a){a=a|0;nI(a);vN(a);return;}function pI(a){a=a|0;return a+4|0;}function qI(a){a=a|0;return a+16|0;}function rI(a){a=a|0;return a+28|0;}function sI(a){a=a|0;return a+48|0;}function tI(a){a=a|0;return+ +o[a+68>>2];}function uI(a){a=a|0;var b=0,c=0,d=0;c=k[a>>2]|0;if(c|0){a=a+4|0;b=k[a>>2]|0;while(1){if((b|0)==(c|0))break;d=b+-8|0;k[a>>2]=d;b=d;}vN(c);}return;}function vI(a){a=a|0;var b=0,c=0,d=0;c=k[a>>2]|0;if(c|0){a=a+4|0;b=k[a>>2]|0;while(1){if((b|0)==(c|0))break;d=b+-16|0;k[a>>2]=d;b=d;}vN(c);}return;}function wI(a){a=a|0;var b=0,c=0,d=0;b=k[a>>2]|0;if(b|0){c=a+4|0;while(1){d=k[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;k[c>>2]=d;yI(d);}vN(k[a>>2]|0);}return;}function xI(a){a=a|0;uI(a+8|0);return;}function yI(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function zI(a){a=a|0;var b=0,c=0,d=0,e=0;k[a>>2]=7584;b=a+4|0;k[a+56>>2]=0;k[a+60>>2]=0;k[a+64>>2]=0;c=a+68|0;d=b;e=d+40|0;do{k[d>>2]=0;d=d+4|0;}while((d|0)<(e|0));i[b+40>>0]=0;o[c>>2]=1.0;e=Gb(24)|0;k[a+72>>2]=e;return;}function AI(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0;e=b+8+3|0;g=i[e>>0]|0;f=b+4|0;BI(a,g<<24>>24<0?k[f>>2]|0:g&255);e=i[e>>0]|0;g=e<<24>>24<0;if(hd(25,k[a+72>>2]|0,(g?k[b>>2]|0:b)|0,(g?k[f>>2]|0:e&255)|0,c|0,d&65535|0,k[a+56>>2]|0)|0){CI(a);DI(a);}return;}function BI(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=k[a+4>>2]|0;d=a+8|0;while(1){e=k[d>>2]|0;if((e|0)==(c|0))break;e=e+-8|0;k[d>>2]=e;yI(e);}e=k[a+16>>2]|0;c=a+20|0;d=k[c>>2]|0;while(1){if((d|0)==(e|0))break;f=d+-16|0;k[c>>2]=f;d=f;}f=a+28|0;k[f>>2]=0;k[f+4>>2]=0;k[f+8>>2]=0;k[f+12>>2]=0;i[a+44>>0]=0;k[a+48>>2]=0;k[a+52>>2]=0;VI(a+56|0,b+1|0);return;}function CI(a){a=a|0;var b=0,c=0.0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0,n=0,p=0,q=0,r=0,s=0,t=0,v=0,w=0,x=0,y=0,z=0,A=0;x=u;u=u+32|0;f=x+24|0;g=x+20|0;p=x+16|0;q=x+12|0;r=x+8|0;s=x+4|0;t=x;v=a+72|0;w=Va(26,k[v>>2]|0)|0;h=a+4|0;i=a+8|0;j=a+12|0;l=a+20|0;m=a+24|0;n=a+16|0;e=0;while(1){if((e|0)>=(w|0))break;c=+tc(27,k[v>>2]|0,e|0);o[p>>2]=c;c=+tc(28,k[v>>2]|0,e|0);o[q>>2]=c;c=+tc(29,k[v>>2]|0,e|0);o[r>>2]=c;c=+tc(30,k[v>>2]|0,e|0);o[s>>2]=c;b=sN(28,40063)|0;if(!b)b=0;else{A=k[v>>2]|0;z=k[p>>2]|0;y=k[q>>2]|0;d=k[r>>2]|0;k[b>>2]=7620;k[b+4>>2]=A;k[b+8>>2]=e;k[b+12>>2]=z;k[b+16>>2]=y;k[b+20>>2]=d;o[b+24>>2]=c;}k[t>>2]=b;d=k[i>>2]|0;if(d>>>0<(k[j>>2]|0)>>>0){k[g>>2]=0;k[f>>2]=k[g>>2];EI(d,b,f);k[i>>2]=(k[i>>2]|0)+8;}else FI(h,t);b=k[l>>2]|0;if(b>>>0<(k[m>>2]|0)>>>0){y=k[q>>2]|0;z=k[r>>2]|0;A=k[s>>2]|0;k[b>>2]=k[p>>2];k[b+4>>2]=y;k[b+8>>2]=z;k[b+12>>2]=A;k[l>>2]=b+16;}else GI(n,p,q,r,s);HI(a,+o[p>>2],+o[q>>2],+o[r>>2],+o[s>>2]);e=e+1|0;}u=x;return;}function DI(a){a=a|0;var b=0,c=0;b=a+72|0;c=Va(31,k[b>>2]|0)|0;k[a+48>>2]=c;b=Va(32,k[b>>2]|0)|0;k[a+52>>2]=b;return;}function EI(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=7640;k[c+12>>2]=b;k[a+4>>2]=c;return;}function FI(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0;i=u;u=u+32|0;c=i+24|0;e=i+20|0;f=i;g=k[a+4>>2]|0;h=k[a>>2]|0;d=(g-h>>3)+1|0;if(d>>>0>536870911)jN(a);else{l=(k[a+8>>2]|0)-h|0;j=l>>2;LI(f,l>>3>>>0<268435455?j>>>0<d>>>0?d:j:536870911,g-h>>3,a+8|0);h=f+8|0;d=k[h>>2]|0;g=k[b>>2]|0;k[e>>2]=0;k[c>>2]=k[e>>2];EI(d,g,c);k[h>>2]=(k[h>>2]|0)+8;MI(a,f);NI(f);u=i;return;}}function GI(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,l=0,m=0;j=u;u=u+32|0;g=j;h=k[a+4>>2]|0;i=k[a>>2]|0;f=(h-i>>4)+1|0;if(f>>>0>268435455)jN(a);else{m=(k[a+8>>2]|0)-i|0;l=m>>3;II(g,m>>4>>>0<134217727?l>>>0<f>>>0?f:l:268435455,h-i>>4,a+8|0);i=g+8|0;h=k[i>>2]|0;c=k[c>>2]|0;d=k[d>>2]|0;e=k[e>>2]|0;k[h>>2]=k[b>>2];k[h+4>>2]=c;k[h+8>>2]=d;k[h+12>>2]=e;k[i>>2]=h+16;JI(a,g);KI(g);u=j;return;}}function HI(a,b,c,d,e){a=a|0;b=+b;c=+c;d=+d;e=+e;var f=0,g=0,h=0,j=0,l=0,m=0,n=0,p=0,q=0,r=0,t=0;r=u;u=u+32|0;h=r+28|0;f=r+16|0;t=r+12|0;g=r+4|0;n=r+24|0;m=r+20|0;p=r+8|0;l=r;o[h>>2]=b;o[f>>2]=c;o[t>>2]=d;o[g>>2]=e;q=k[(d<b?t:h)>>2]|0;k[n>>2]=q;j=k[(e<c?g:f)>>2]|0;k[m>>2]=j;h=k[(b<d?t:h)>>2]|0;k[p>>2]=h;f=k[(c<e?g:f)>>2]|0;k[l>>2]=f;g=a+44|0;if(!(i[g>>0]|0)){k[a+28>>2]=q;k[a+32>>2]=j;k[a+36>>2]=h;k[a+40>>2]=f;i[g>>0]=1;}else{c=(k[s>>2]=f,+o[s>>2]);d=(k[s>>2]=h,+o[s>>2]);b=(k[s>>2]=j,+o[s>>2]);f=a+28|0;k[f>>2]=k[((k[s>>2]=q,+o[s>>2])<+o[f>>2]?n:f)>>2];t=a+32|0;k[t>>2]=k[(b<+o[t>>2]?m:t)>>2];t=a+36|0;k[t>>2]=k[(+o[t>>2]<d?p:t)>>2];t=a+40|0;k[t>>2]=k[(+o[t>>2]<c?l:t)>>2];}u=r;return;}function II(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;do if(b){if(b>>>0>268435455){c=rc(4)|0;GO(c);Ld(c|0,2912,370);}else{d=rN(b<<4)|0;break;}}else d=0;while(0);k[a>>2]=d;c=d+(c<<4)|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+(b<<4);return;}function JI(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;d=k[a>>2]|0;g=a+4|0;f=b+4|0;e=(k[g>>2]|0)-d|0;c=(k[f>>2]|0)+(0-(e>>4)<<4)|0;k[f>>2]=c;if((e|0)>0){PO(c|0,d|0,e|0)|0;d=f;c=k[f>>2]|0;}else d=f;f=k[a>>2]|0;k[a>>2]=c;k[d>>2]=f;f=b+8|0;e=k[g>>2]|0;k[g>>2]=k[f>>2];k[f>>2]=e;f=a+8|0;g=b+12|0;a=k[f>>2]|0;k[f>>2]=k[g>>2];k[g>>2]=a;k[b>>2]=k[d>>2];return;}function KI(a){a=a|0;var b=0,c=0,d=0,e=0;b=k[a+4>>2]|0;c=a+8|0;d=k[c>>2]|0;while(1){if((d|0)==(b|0))break;e=d+-16|0;k[c>>2]=e;d=e;}a=k[a>>2]|0;if(a|0)vN(a);return;}function LI(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;do if(b){if(b>>>0>536870911){c=rc(4)|0;GO(c);Ld(c|0,2912,370);}else{d=rN(b<<3)|0;break;}}else d=0;while(0);k[a>>2]=d;c=d+(c<<3)|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+(b<<3);return;}function MI(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;d=k[a>>2]|0;e=a+4|0;f=b+4|0;c=k[e>>2]|0;while(1){if((c|0)==(d|0))break;i=k[f>>2]|0;g=c+-8|0;k[i+-8>>2]=k[g>>2];h=c+-4|0;k[i+-4>>2]=k[h>>2];k[g>>2]=0;k[h>>2]=0;k[f>>2]=(k[f>>2]|0)+-8;c=g;}g=k[a>>2]|0;k[a>>2]=k[f>>2];k[f>>2]=g;g=b+8|0;i=k[e>>2]|0;k[e>>2]=k[g>>2];k[g>>2]=i;g=a+8|0;i=b+12|0;h=k[g>>2]|0;k[g>>2]=k[i>>2];k[i>>2]=h;k[b>>2]=k[f>>2];return;}function NI(a){a=a|0;var b=0,c=0,d=0;b=k[a+4>>2]|0;c=a+8|0;while(1){d=k[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;k[c>>2]=d;yI(d);}a=k[a>>2]|0;if(a|0)vN(a);return;}function OI(a){a=a|0;kN(a);vN(a);return;}function PI(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function QI(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==30374?a+12|0:0)|0;}function RI(a){a=a|0;vN(a);return;}function SI(a){a=a|0;return;}function TI(a){a=a|0;vN(a);return;}function UI(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;switch(c|0){case 0:{if(!(Rc(34,k[b+4>>2]|0,k[b+8>>2]|0)|0)){c=a;d=5;}else{c=a;d=6;}break;}case 1:{if(!(Rc(33,k[b+4>>2]|0,k[b+8>>2]|0)|0)){c=a;d=5;}else{c=a;d=6;}break;}default:{c=a;d=5;}}if((d|0)==5){i[c>>0]=0;a=a+4|0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;k[a+12>>2]=0;k[a+16>>2]=0;k[a+20>>2]=0;k[a+24>>2]=0;k[a+28>>2]=0;}else if((d|0)==6){i[c>>0]=1;e=k[b+16>>2]|0;c=k[b+20>>2]|0;d=k[b+24>>2]|0;k[a+4>>2]=k[b+12>>2];k[a+8>>2]=e;k[a+12>>2]=c;k[a+16>>2]=d;o[a+20>>2]=0.0;o[a+24>>2]=1.0;o[a+28>>2]=1.0;o[a+32>>2]=0.0;}return;}function VI(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;f=a+4|0;c=k[f>>2]|0;e=k[a>>2]|0;d=c-e>>3;a:do if(d>>>0>=b>>>0){if(d>>>0>b>>>0){a=e+(b<<3)|0;while(1){if((c|0)==(a|0))break a;e=c+-8|0;k[f>>2]=e;c=e;}}}else WI(a,b-d|0);while(0);return;}function WI(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;h=u;u=u+32|0;e=h;f=k[a+8>>2]|0;c=a+4|0;g=k[c>>2]|0;do if(f-g>>3>>>0<b>>>0){c=k[a>>2]|0;d=(g-c>>3)+b|0;if(d>>>0>536870911)jN(a);else{i=f-c|0;f=i>>2;XI(e,i>>3>>>0<268435455?f>>>0<d>>>0?d:f:536870911,g-c>>3,a+8|0);g=e+8|0;f=k[g>>2]|0;WO(f|0,0,b<<3|0)|0;k[g>>2]=f+(b<<3);YI(a,e);ZI(e);break;}}else{WO(g|0,0,b<<3|0)|0;k[c>>2]=g+(b<<3);}while(0);u=h;return;}function XI(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;do if(b){if(b>>>0>536870911){c=rc(4)|0;GO(c);Ld(c|0,2912,370);}else{d=rN(b<<3)|0;break;}}else d=0;while(0);k[a>>2]=d;c=d+(c<<3)|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+(b<<3);return;}function YI(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;d=k[a>>2]|0;g=a+4|0;f=b+4|0;e=(k[g>>2]|0)-d|0;c=(k[f>>2]|0)+(0-(e>>3)<<3)|0;k[f>>2]=c;if((e|0)>0){PO(c|0,d|0,e|0)|0;d=f;c=k[f>>2]|0;}else d=f;f=k[a>>2]|0;k[a>>2]=c;k[d>>2]=f;f=b+8|0;e=k[g>>2]|0;k[g>>2]=k[f>>2];k[f>>2]=e;f=a+8|0;g=b+12|0;a=k[f>>2]|0;k[f>>2]=k[g>>2];k[g>>2]=a;k[b>>2]=k[d>>2];return;}function ZI(a){a=a|0;var b=0,c=0,d=0,e=0;b=k[a+4>>2]|0;c=a+8|0;d=k[c>>2]|0;while(1){if((d|0)==(b|0))break;e=d+-8|0;k[c>>2]=e;d=e;}a=k[a>>2]|0;if(a|0)vN(a);return;}function _I(a){a=a|0;return;}function $I(a){a=a|0;vN(a);return;}function aJ(a,b){a=a|0;b=b|0;var c=0,d=0;b=u;u=u+64|0;d=b+40|0;c=b;bb(d|0);Uc(d|0,c|0);k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;BN(a,c,YM(c)|0);u=b;return;}function bJ(a){a=a|0;var b=0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;b=0;while(1){if((b|0)==3)break;k[a+(b<<2)>>2]=0;b=b+1|0;}a=a+12|0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;k[a+12>>2]=0;k[a+16>>2]=0;k[a+20>>2]=0;return;}function cJ(a){a=a|0;dJ(a);eJ(a+28|0);fJ(a+20|0);bB(a+12|0);CN(a);return;}function dJ(a){a=a|0;var b=0;a=a+20|0;b=k[a>>2]|0;if(b|0){Lq(Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0);b=k[a>>2]|0;Lq(Zd[k[(k[b>>2]|0)+36>>2]&255](b)|0);b=k[a>>2]|0;Lq(Zd[k[(k[b>>2]|0)+100>>2]&255](b)|0);}return;}function eJ(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function fJ(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function gJ(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0;l=u;u=u+48|0;f=l+32|0;j=l+24|0;i=l+16|0;h=l+8|0;g=l;hJ(j,a);c=k[j>>2]|0;if(!c)b=0;else{iJ(i,a,b,c);if(!(k[i>>2]|0))b=0;else{jJ(h,a,b);if((k[h>>2]|0)!=0?(e=a+28|0,kJ(g,a),d=k[g>>2]|0,m=g+4|0,c=k[m>>2]|0,k[g>>2]=0,k[m>>2]=0,k[f>>2]=k[e>>2],k[e>>2]=d,d=a+32|0,k[f+4>>2]=k[d>>2],k[d>>2]=c,eJ(f),eJ(g),(k[e>>2]|0)!=0):0){lJ(g,a,b,j,i,h);m=k[g>>2]|0;b=m;if(!m)b=0;else{c=a+20|0;k[f>>2]=b;d=f+4|0;e=k[g+4>>2]|0;k[d>>2]=e;if(e|0)mN(e);k[f>>2]=k[c>>2];k[c>>2]=b;b=a+24|0;k[d>>2]=k[b>>2];k[b>>2]=e;fJ(f);mJ(a);nJ(a);b=1;}fJ(g);}else b=0;no(h);}oo(i);}mo(j);u=l;return b|0;}function hJ(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;s=u;u=u+96|0;j=s+72|0;l=s+64|0;d=s+60|0;m=s+48|0;n=s+36|0;o=s+24|0;p=s+12|0;q=s;c=sN(4,40063)|0;if(!c)c=0;else k[c>>2]=7668;k[d>>2]=0;k[j>>2]=k[d>>2];AL(l,c,j);c=k[l>>2]|0;if(!c){GN(b,32839)|0;k[a>>2]=0;k[a+4>>2]=0;}else{Xd[k[(k[c>>2]|0)+8>>2]&255](j,c);e=k[l>>2]|0;Xd[k[(k[e>>2]|0)+8>>2]&255](m,e);e=i[j+11>>0]|0;d=e<<24>>24<0;e=e&255;f=d?k[j+4>>2]|0:e;g=m+11|0;t=i[g>>0]|0;c=t<<24>>24<0;h=m+4|0;a:do if((f|0)==((c?k[h>>2]|0:t&255)|0)){c=c?k[m>>2]|0:m;b:do if(d){if(Vn(k[j>>2]|0,c,f)|0){r=27;break a;}}else{d=j;while(1){if(!e)break b;if((i[d>>0]|0)!=(i[c>>0]|0)){r=27;break a;}e=e+-1|0;c=c+1|0;d=d+1|0;}}while(0);BL(q,32877,j);d=LN(q,32923)|0;k[p>>2]=k[d>>2];k[p+4>>2]=k[d+4>>2];k[p+8>>2]=k[d+8>>2];c=0;while(1){if((c|0)==3)break;k[d+(c<<2)>>2]=0;c=c+1|0;}d=i[g>>0]|0;c=d<<24>>24<0;d=KN(p,c?k[m>>2]|0:m,c?k[h>>2]|0:d&255)|0;k[o>>2]=k[d>>2];k[o+4>>2]=k[d+4>>2];k[o+8>>2]=k[d+8>>2];c=0;while(1){if((c|0)==3)break;k[d+(c<<2)>>2]=0;c=c+1|0;}d=LN(o,32931)|0;k[n>>2]=k[d>>2];k[n+4>>2]=k[d+4>>2];k[n+8>>2]=k[d+8>>2];c=0;while(1){if((c|0)==3)break;k[d+(c<<2)>>2]=0;c=c+1|0;}c=b+11|0;if((i[c>>0]|0)<0){i[k[b>>2]>>0]=0;k[b+4>>2]=0;}else{i[b>>0]=0;i[c>>0]=0;}FN(b,0);k[b>>2]=k[n>>2];k[b+4>>2]=k[n+4>>2];k[b+8>>2]=k[n+8>>2];c=0;while(1){if((c|0)==3)break;k[n+(c<<2)>>2]=0;c=c+1|0;}CN(n);CN(o);CN(p);CN(q);k[a>>2]=0;k[a+4>>2]=0;}else r=27;while(0);if((r|0)==27){k[a>>2]=k[l>>2];t=l+4|0;k[a+4>>2]=k[t>>2];k[l>>2]=0;k[t>>2]=0;}CN(m);CN(j);}mo(l);u=s;return;}function iJ(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0;h=u;u=u+48|0;g=h+24|0;e=h+12|0;f=h;FE(g,c+28|0,k[c+40>>2]|0,k[c+44>>2]|0,d);c=j[g>>1]|0;do if((c|1)<<16>>16==1){c=g+4|0;d=k[c>>2]|0;if(!d){GN(b,32810)|0;k[a>>2]=0;k[a+4>>2]=0;break;}k[a>>2]=d;d=k[g+8>>2]|0;k[a+4>>2]=d;if(d)mN(d);}else{PN(f,c&65535);d=NN(f,0,32777)|0;k[e>>2]=k[d>>2];k[e+4>>2]=k[d+4>>2];k[e+8>>2]=k[d+8>>2];c=0;while(1){if((c|0)==3)break;k[d+(c<<2)>>2]=0;c=c+1|0;}c=b+11|0;if((i[c>>0]|0)<0){i[k[b>>2]>>0]=0;k[b+4>>2]=0;}else{i[b>>0]=0;i[c>>0]=0;}FN(b,0);k[b>>2]=k[e>>2];k[b+4>>2]=k[e+4>>2];k[b+8>>2]=k[e+8>>2];c=0;while(1){if((c|0)==3)break;k[e+(c<<2)>>2]=0;c=c+1|0;}CN(e);CN(f);k[a>>2]=0;k[a+4>>2]=0;c=g+4|0;}while(0);oo(c);u=h;return;}function jJ(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,l=0,m=0,n=0,p=0,q=0,r=0,s=0;s=u;u=u+80|0;p=s+64|0;q=s+56|0;r=s+40|0;g=s+48|0;h=s+32|0;m=s+16|0;n=s;l=b+12|0;d=sN(56,40063)|0;if(!d)d=0;else{e=d;f=e+56|0;do{k[e>>2]=0;e=e+4|0;}while((e|0)<(f|0));k[d>>2]=7936;k[d+24>>2]=0;k[d+48>>2]=0;}k[r>>2]=0;k[p>>2]=k[r>>2];gK(q,d,p);d=k[q>>2]|0;k[q>>2]=k[l>>2];k[l>>2]=d;d=q+4|0;f=b+16|0;e=k[d>>2]|0;k[d>>2]=k[f>>2];k[f>>2]=e;bB(q);if(!(k[l>>2]|0)){GN(b,32081)|0;k[a>>2]=0;k[a+4>>2]=0;}else{d=sN(24,40063)|0;if(!d)d=0;else{k[d>>2]=7308;f=d+4|0;k[f>>2]=0;k[f+4>>2]=0;k[f+8>>2]=0;k[f+12>>2]=0;o[d+20>>2]=1.0;}k[g>>2]=0;k[p>>2]=k[g>>2];hK(q,d,p);if(!(k[q>>2]|0)){GN(b,32126)|0;k[a>>2]=0;k[a+4>>2]=0;}else{d=sN(4,40063)|0;if(!d)d=0;else k[d>>2]=7448;k[h>>2]=0;k[p>>2]=k[h>>2];iK(r,d,p);if(!(k[r>>2]|0)){GN(b,32165)|0;k[a>>2]=0;k[a+4>>2]=0;}else{k[m>>2]=k[c+12>>2];k[m+4>>2]=k[c+16>>2];k[m+8>>2]=0;k[m+12>>2]=0;h=i[c+25>>0]|0;d=i[c+26>>0]|0;i[n>>0]=i[c+24>>0]|0;i[n+1>>0]=h;i[n+2>>0]=d;PD(p,l,q,m,n,r);d=j[p>>1]|0;do if((d|1)<<16>>16==1){d=p+4|0;e=k[d>>2]|0;if(!e){GN(b,32239)|0;k[a>>2]=0;k[a+4>>2]=0;break;}k[a>>2]=e;e=k[p+8>>2]|0;k[a+4>>2]=e;if(e)mN(e);}else{PN(n,d&65535);e=NN(n,0,32199)|0;k[m>>2]=k[e>>2];k[m+4>>2]=k[e+4>>2];k[m+8>>2]=k[e+8>>2];d=0;while(1){if((d|0)==3)break;k[e+(d<<2)>>2]=0;d=d+1|0;}d=b+11|0;if((i[d>>0]|0)<0){i[k[b>>2]>>0]=0;k[b+4>>2]=0;}else{i[b>>0]=0;i[d>>0]=0;}FN(b,0);k[b>>2]=k[m>>2];k[b+4>>2]=k[m+4>>2];k[b+8>>2]=k[m+8>>2];d=0;while(1){if((d|0)==3)break;k[m+(d<<2)>>2]=0;d=d+1|0;}CN(m);CN(n);k[a>>2]=0;k[a+4>>2]=0;d=p+4|0;}while(0);no(d);}xy(r);}Qv(q);}u=s;return;}function kJ(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;g=u;u=u+32|0;d=g+16|0;f=g+8|0;e=g;c=sN(28,40063)|0;if(!c)c=0;else iI(c);k[e>>2]=0;k[d>>2]=k[e>>2];bK(f,c,d);c=k[f>>2]|0;if(!c){GN(b,31897)|0;k[a>>2]=0;k[a+4>>2]=0;}else{k[a>>2]=c;b=f+4|0;k[a+4>>2]=k[b>>2];k[f>>2]=0;k[b>>2]=0;}eJ(f);u=g;return;}function lJ(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,l=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;p=u;u=u+48|0;o=p+24|0;l=p+12|0;n=p;h=p+36|0;k[l>>2]=k[b+28>>2];g=k[b+32>>2]|0;k[l+4>>2]=g;if(g|0)mN(g);s=k[c+16>>2]|0;t=k[c+20>>2]|0;k[n>>2]=k[c+12>>2];k[n+4>>2]=s;k[n+8>>2]=t;t=co(+(m[c+4>>1]|0))|0;s=i[c>>0]|0;r=i[c+1>>0]|0;q=i[c+2>>0]|0;g=i[c+6>>0]|0;i[h>>0]=t;i[h+1>>0]=s;i[h+2>>0]=r;i[h+3>>0]=q;i[h+4>>0]=g;Sr(o,f,e,d,l,n,h,k[c+8>>2]|0,k[c+48>>2]|0);lo(l);g=j[o>>1]|0;do if((g|1)<<16>>16==1){g=o+4|0;c=k[g>>2]|0;if(!c){GN(b,31867)|0;k[a>>2]=0;k[a+4>>2]=0;break;}k[a>>2]=c;c=k[o+8>>2]|0;k[a+4>>2]=c;if(c)mN(c);}else{PN(n,g&65535);c=NN(n,0,31833)|0;k[l>>2]=k[c>>2];k[l+4>>2]=k[c+4>>2];k[l+8>>2]=k[c+8>>2];g=0;while(1){if((g|0)==3)break;k[c+(g<<2)>>2]=0;g=g+1|0;}g=b+11|0;if((i[g>>0]|0)<0){i[k[b>>2]>>0]=0;k[b+4>>2]=0;}else{i[b>>0]=0;i[g>>0]=0;}FN(b,0);k[b>>2]=k[l>>2];k[b+4>>2]=k[l+4>>2];k[b+8>>2]=k[l+8>>2];g=0;while(1){if((g|0)==3)break;k[l+(g<<2)>>2]=0;g=g+1|0;}CN(l);CN(n);k[a>>2]=0;k[a+4>>2]=0;g=o+4|0;}while(0);fJ(g);u=p;return;}function mJ(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0;i=u;u=u+128|0;b=i+96|0;c=i+72|0;d=i+48|0;e=i+24|0;f=i;g=a+20|0;h=k[g>>2]|0;if(h|0){h=Zd[k[(k[h>>2]|0)+12>>2]&255](h)|0;k[b>>2]=7688;k[b+4>>2]=a;k[b+16>>2]=b;Wq(h,b)|0;hh(b);h=k[g>>2]|0;h=Zd[k[(k[h>>2]|0)+36>>2]&255](h)|0;k[c>>2]=7732;k[c+4>>2]=a;k[c+16>>2]=c;Wq(h,c)|0;hh(c);h=k[g>>2]|0;h=Zd[k[(k[h>>2]|0)+100>>2]&255](h)|0;k[d>>2]=7776;k[d+4>>2]=a;k[d+16>>2]=d;Wq(h,d)|0;hh(d);h=k[g>>2]|0;h=Zd[k[(k[h>>2]|0)+76>>2]&255](h)|0;k[e>>2]=7820;k[e+4>>2]=a;k[e+16>>2]=e;Wq(h,e)|0;hh(e);h=k[g>>2]|0;h=Zd[k[(k[h>>2]|0)+80>>2]&255](h)|0;k[f>>2]=7864;k[f+4>>2]=a;k[f+16>>2]=f;Wq(h,f)|0;hh(f);}u=i;return;}function nJ(a){a=a|0;var b=0,c=0;b=u;u=u+32|0;c=b;a=k[a+20>>2]|0;Xd[k[(k[a>>2]|0)+32>>2]&255](c,a);sb(35,l[c>>0]|0|0,+ +o[c+4>>2],+ +o[c+8>>2],l[c+12>>0]|0|0,+ +o[c+16>>2],+ +o[c+20>>2])|0;u=b;return;}function oJ(a){a=a|0;vN(a);return;}function pJ(a){a=a|0;var b=0;b=rN(8)|0;k[b>>2]=7864;k[b+4>>2]=k[a+4>>2];return b|0;}function qJ(a,b){a=a|0;b=b|0;k[b>>2]=7864;k[b+4>>2]=k[a+4>>2];return;}function rJ(a){a=a|0;return;}function sJ(a){a=a|0;vN(a);return;}function tJ(a){a=a|0;Lb(36);return;}function uJ(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==30920?a+4|0:0)|0;}function vJ(a){a=a|0;return 2464;}function wJ(a){a=a|0;vN(a);return;}function xJ(a){a=a|0;var b=0;b=rN(8)|0;k[b>>2]=7820;k[b+4>>2]=k[a+4>>2];return b|0;}function yJ(a,b){a=a|0;b=b|0;k[b>>2]=7820;k[b+4>>2]=k[a+4>>2];return;}function zJ(a){a=a|0;return;}function AJ(a){a=a|0;vN(a);return;}function BJ(a){a=a|0;Lb(37);return;}function CJ(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==31111?a+4|0:0)|0;}function DJ(a){a=a|0;return 2488;}function EJ(a){a=a|0;vN(a);return;}function FJ(a){a=a|0;var b=0;b=rN(8)|0;k[b>>2]=7776;k[b+4>>2]=k[a+4>>2];return b|0;}function GJ(a,b){a=a|0;b=b|0;k[b>>2]=7776;k[b+4>>2]=k[a+4>>2];return;}function HJ(a){a=a|0;return;}function IJ(a){a=a|0;vN(a);return;}function JJ(a){a=a|0;MJ(k[a+4>>2]|0);return;}function KJ(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==31304?a+4|0:0)|0;}function LJ(a){a=a|0;return 2512;}function MJ(a){a=a|0;a=k[a+20>>2]|0;a=Zd[k[(k[a>>2]|0)+84>>2]&255](a)|0;Tc(38,l[a+1>>0]|0|0,l[a+2>>0]|0|0,l[a+3>>0]|0|0,l[a>>0]|0|0,l[a+4>>0]|0|0)|0;return;}function NJ(a){a=a|0;vN(a);return;}function OJ(a){a=a|0;var b=0;b=rN(8)|0;k[b>>2]=7732;k[b+4>>2]=k[a+4>>2];return b|0;}function PJ(a,b){a=a|0;b=b|0;k[b>>2]=7732;k[b+4>>2]=k[a+4>>2];return;}function QJ(a){a=a|0;return;}function RJ(a){a=a|0;vN(a);return;}function SJ(a){a=a|0;nJ(k[a+4>>2]|0);return;}function TJ(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==31521?a+4|0:0)|0;}function UJ(a){a=a|0;return 2536;}function VJ(a){a=a|0;vN(a);return;}function WJ(a){a=a|0;var b=0;b=rN(8)|0;k[b>>2]=7688;k[b+4>>2]=k[a+4>>2];return b|0;}function XJ(a,b){a=a|0;b=b|0;k[b>>2]=7688;k[b+4>>2]=k[a+4>>2];return;}function YJ(a){a=a|0;return;}function ZJ(a){a=a|0;vN(a);return;}function _J(a){a=a|0;a=k[(k[a+4>>2]|0)+20>>2]|0;Zd[k[(k[a>>2]|0)+8>>2]&255](a)|0;return;}function $J(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==31677?a+4|0:0)|0;}function aK(a){a=a|0;return 2560;}function bK(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=7908;k[c+12>>2]=b;k[a+4>>2]=c;return;}function cK(a){a=a|0;kN(a);vN(a);return;}function dK(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function eK(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==31934?a+12|0:0)|0;}function fK(a){a=a|0;vN(a);return;}function gK(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=8236;k[c+12>>2]=b;k[a+4>>2]=c;return;}function hK(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=8208;k[c+12>>2]=b;k[a+4>>2]=c;return;}function iK(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=8180;k[c+12>>2]=b;k[a+4>>2]=c;return;}function jK(a){a=a|0;kN(a);vN(a);return;}function kK(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function lK(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==32279?a+12|0:0)|0;}function mK(a){a=a|0;vN(a);return;}function nK(a){a=a|0;kN(a);vN(a);return;}function oK(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function pK(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==32436?a+12|0:0)|0;}function qK(a){a=a|0;vN(a);return;}function rK(a){a=a|0;kN(a);vN(a);return;}function sK(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function tK(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==32587?a+12|0:0)|0;}function uK(a){a=a|0;vN(a);return;}function vK(a){a=a|0;k[a>>2]=7936;nC(a+32|0);hh(a+8|0);return;}function wK(a){a=a|0;vK(a);vN(a);return;}function xK(a){a=a|0;return a+8|0;}function yK(a){a=a|0;return a+32|0;}function zK(a,b,c){a=a|0;b=b|0;c=c|0;Xb(b|0,c|0);return;}function AK(a,b,c){a=a|0;b=b|0;c=c|0;Xa(b|0,c|0);return;}function BK(a,b,c){a=a|0;b=b|0;c=c|0;cc(b|0,c|0);return;}function CK(a,b,c){a=a|0;b=b|0;c=c|0;Db(b|0,c|0);return;}function DK(a,b,c){a=a|0;b=b|0;c=c|0;yc(b|0,c|0);return;}function EK(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;sc(b|0,c|0,d|0,e|0);return;}function FK(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;_c(b|0,c|0,d|0,e|0);return;}function GK(a,b){a=a|0;b=b|0;return nc(b|0)|0;}function HK(a,b){a=a|0;b=b|0;ud(b|0);return;}function IK(a,b,c,d,e){a=a|0;b=+b;c=+c;d=+d;e=+e;vc(+b,+c,+d,+e);return;}function JK(a,b){a=a|0;b=b|0;Vc(b|0);return;}function KK(a){a=a|0;return Zb()|0;}function LK(a,b){a=a|0;b=b|0;return Qd(b|0)|0;}function MK(a,b,c){a=a|0;b=b|0;c=c|0;Zc(b|0,c|0);return;}function NK(a,b,c){a=a|0;b=b|0;c=c|0;kc(b|0,c|0);return;}function OK(a,b){a=a|0;b=b|0;Sa(b|0);return;}function PK(a,b,c){a=a|0;b=b|0;c=c|0;md(b|0,c|0);return;}function QK(a,b){a=a|0;b=b|0;ed(b|0);return;}function RK(a,b,c){a=a|0;b=b|0;c=c|0;Jb(b|0,c|0);return;}function SK(a,b,c){a=a|0;b=b|0;c=c|0;dc(b|0,c|0);return;}function TK(a,b){a=a|0;b=b|0;od(b|0);return;}function UK(a,b){a=a|0;b=b|0;$a(b|0);return;}function VK(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Eb(b|0,c|0,d|0,e|0);return;}function WK(a,b){a=a|0;b=b|0;Rb(b|0);return;}function XK(a,b){a=a|0;b=b|0;Wc(b|0);return;}function YK(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;rb(b|0,c|0,d|0,e|0);return;}function ZK(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;Hd(b|0,c|0,d|0,e|0,f|0);return;}function _K(a,b,c){a=a|0;b=b|0;c=c|0;pb(b|0,c|0);return;}function $K(a,b,c){a=a|0;b=b|0;c=c|0;fc(b|0,c|0);return;}function aL(a,b,c){a=a|0;b=b|0;c=c|0;qd(b|0,c|0);return;}function bL(a,b,c){a=a|0;b=b|0;c=c|0;Sb(b|0,c|0);return;}function cL(a,b,c){a=a|0;b=b|0;c=c|0;return _a(b|0,c|0)|0;}function dL(a){a=a|0;return Gc()|0;}function eL(a,b,c){a=a|0;b=b|0;c=c|0;Tb(b|0,c|0);return;}function fL(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;zb(b|0,c|0,d|0,e|0);return;}function gL(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;fd(b|0,c|0,d|0);return;}function hL(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Ya(b|0,c|0,d|0,e|0);return;}function iL(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Ad(b|0,c|0,d|0);return;}function jL(a,b,c){a=a|0;b=b|0;c=c|0;return td(b|0,c|0)|0;}function kL(a,b){a=a|0;b=b|0;return xc(b|0)|0;}function lL(a,b){a=a|0;b=b|0;pd(b|0);return;}function mL(a,b,c){a=a|0;b=b|0;c=c|0;zd(b|0,c|0);return;}function nL(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;Ec(b|0,c|0,d|0,e|0,f|0,g|0,h|0);return;}function oL(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;xd(b|0,c|0,d|0,e|0);return;}function pL(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;qb(b|0,c|0,d|0,e|0);return;}function qL(a,b,c,d,e,f,g,h,i,j){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;ad(b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0,j|0);return;}function rL(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Pd(b|0,c|0,d|0);return;}function sL(a,b,c,d,e,f,g,h,i,j){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;Rd(b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0,j|0);return;}function tL(a,b,c){a=a|0;b=b|0;c=+c;zc(b|0,+c);return;}function uL(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Qa(b|0,c|0,d|0);return;}function vL(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;vd(b|0,c|0,d|0);return;}function wL(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Oa(b|0,c|0,d|0,e|0);return;}function xL(a,b){a=a|0;b=b|0;Ia(b|0);return;}function yL(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;xb(b|0,c|0,d|0,e|0,f|0,g|0);return;}function zL(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Hb(b|0,c|0,d|0,e|0);return;}function AL(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=rN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=8264;k[c+12>>2]=b;k[a+4>>2]=c;return;}function BL(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;d=0;while(1){if((d|0)==3)break;k[a+(d<<2)>>2]=0;d=d+1|0;}f=YM(b)|0;e=c+11|0;d=i[e>>0]|0;d=d<<24>>24<0?k[c+4>>2]|0:d&255;ON(a,b,f,d+f|0);KN(a,(i[e>>0]|0)<0?k[c>>2]|0:c,d)|0;return;}function CL(a){a=a|0;kN(a);vN(a);return;}function DL(a){a=a|0;a=k[a+12>>2]|0;if(a|0)Wd[k[(k[a>>2]|0)+4>>2]&511](a);return;}function EL(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==32933?a+12|0:0)|0;}function FL(a){a=a|0;vN(a);return;}function GL(a){a=a|0;var b=0,c=0,d=0;b=u;u=u+16|0;c=b+8|0;d=b;k[d>>2]=8;k[d+4>>2]=1;k[c>>2]=k[d>>2];k[c+4>>2]=k[d+4>>2];a=HL(a,c,33082)|0;u=b;return a|0;}function HL(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0;o=u;u=u+80|0;g=o+60|0;h=o+48|0;j=o+36|0;l=o+24|0;m=o+12|0;n=o;f=k[b>>2]|0;d=k[b+4>>2]|0;b=k[a+20>>2]|0;if(b){e=b+(d>>1)|0;if(!(d&1))b=f;else b=k[(k[e>>2]|0)+f>>2]|0;b=Zd[b&255](e)|0;if((b|1)<<16>>16==1)b=1;else{k[m>>2]=0;k[m+4>>2]=0;k[m+8>>2]=0;BN(m,33111,14);PN(n,b&65535);d=i[n+11>>0]|0;b=d<<24>>24<0;d=KN(m,b?k[n>>2]|0:n,b?k[n+4>>2]|0:d&255)|0;k[l>>2]=k[d>>2];k[l+4>>2]=k[d+4>>2];k[l+8>>2]=k[d+8>>2];b=0;while(1){if((b|0)==3)break;k[d+(b<<2)>>2]=0;b=b+1|0;}d=LN(l,33126)|0;k[j>>2]=k[d>>2];k[j+4>>2]=k[d+4>>2];k[j+8>>2]=k[d+8>>2];b=0;while(1){if((b|0)==3)break;k[d+(b<<2)>>2]=0;b=b+1|0;}d=LN(j,c|0?c:39022)|0;k[h>>2]=k[d>>2];k[h+4>>2]=k[d+4>>2];k[h+8>>2]=k[d+8>>2];b=0;while(1){if((b|0)==3)break;k[d+(b<<2)>>2]=0;b=b+1|0;}d=LN(h,32931)|0;k[g>>2]=k[d>>2];k[g+4>>2]=k[d+4>>2];k[g+8>>2]=k[d+8>>2];b=0;while(1){if((b|0)==3)break;k[d+(b<<2)>>2]=0;b=b+1|0;}b=a+11|0;if((i[b>>0]|0)<0){i[k[a>>2]>>0]=0;k[a+4>>2]=0;}else{i[a>>0]=0;i[b>>0]=0;}FN(a,0);k[a>>2]=k[g>>2];k[a+4>>2]=k[g+4>>2];k[a+8>>2]=k[g+8>>2];b=0;while(1){if((b|0)==3)break;k[g+(b<<2)>>2]=0;b=b+1|0;}CN(g);CN(h);CN(j);CN(l);CN(n);CN(m);b=0;}}else{GN(a,33089)|0;b=0;}u=o;return b|0;}function IL(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=u;u=u+32|0;e=c+16|0;d=c+8|0;f=c;k[d>>2]=b;k[f>>2]=108;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];b=JL(a,e,33166,d)|0;u=c;return b|0;}function JL(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0;p=u;u=u+80|0;h=p+60|0;j=p+48|0;l=p+36|0;m=p+24|0;n=p+12|0;o=p;g=k[b>>2]|0;e=k[b+4>>2]|0;b=k[a+20>>2]|0;if(b){f=b+(e>>1)|0;if(!(e&1))b=g;else b=k[(k[f>>2]|0)+g>>2]|0;b=je[b&127](f,k[d>>2]|0)|0;if((b|1)<<16>>16==1)b=1;else{k[n>>2]=0;k[n+4>>2]=0;k[n+8>>2]=0;BN(n,33111,14);PN(o,b&65535);e=i[o+11>>0]|0;b=e<<24>>24<0;e=KN(n,b?k[o>>2]|0:o,b?k[o+4>>2]|0:e&255)|0;k[m>>2]=k[e>>2];k[m+4>>2]=k[e+4>>2];k[m+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=LN(m,33126)|0;k[l>>2]=k[e>>2];k[l+4>>2]=k[e+4>>2];k[l+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=LN(l,c|0?c:39022)|0;k[j>>2]=k[e>>2];k[j+4>>2]=k[e+4>>2];k[j+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=LN(j,32931)|0;k[h>>2]=k[e>>2];k[h+4>>2]=k[e+4>>2];k[h+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}b=a+11|0;if((i[b>>0]|0)<0){i[k[a>>2]>>0]=0;k[a+4>>2]=0;}else{i[a>>0]=0;i[b>>0]=0;}FN(a,0);k[a>>2]=k[h>>2];k[a+4>>2]=k[h+4>>2];k[a+8>>2]=k[h+8>>2];b=0;while(1){if((b|0)==3)break;k[h+(b<<2)>>2]=0;b=b+1|0;}CN(h);CN(j);CN(l);CN(m);CN(o);CN(n);b=0;}}else{GN(a,33089)|0;b=0;}u=p;return b|0;}function KL(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=u;u=u+32|0;e=c+8|0;d=c+16|0;f=c;j[d>>1]=b;k[f>>2]=92;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];b=LL(a,e,33175,d)|0;u=c;return b|0;}function LL(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0,n=0,o=0,p=0,q=0,r=0;r=u;u=u+80|0;j=r+60|0;h=r+72|0;l=r+48|0;n=r+36|0;o=r+24|0;p=r+12|0;q=r;g=k[b>>2]|0;e=k[b+4>>2]|0;b=k[a+20>>2]|0;if(b){f=b+(e>>1)|0;if(!(e&1))b=g;else b=k[(k[f>>2]|0)+g>>2]|0;d=co(+(m[d>>1]|0))|0;i[h>>0]=d;i[j>>0]=i[h>>0]|0;b=je[b&127](f,j)|0;if((b|1)<<16>>16==1)b=1;else{k[p>>2]=0;k[p+4>>2]=0;k[p+8>>2]=0;BN(p,33111,14);PN(q,b&65535);e=i[q+11>>0]|0;b=e<<24>>24<0;e=KN(p,b?k[q>>2]|0:q,b?k[q+4>>2]|0:e&255)|0;k[o>>2]=k[e>>2];k[o+4>>2]=k[e+4>>2];k[o+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=LN(o,33126)|0;k[n>>2]=k[e>>2];k[n+4>>2]=k[e+4>>2];k[n+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=LN(n,c|0?c:39022)|0;k[l>>2]=k[e>>2];k[l+4>>2]=k[e+4>>2];k[l+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=LN(l,32931)|0;k[j>>2]=k[e>>2];k[j+4>>2]=k[e+4>>2];k[j+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}b=a+11|0;if((i[b>>0]|0)<0){i[k[a>>2]>>0]=0;k[a+4>>2]=0;}else{i[a>>0]=0;i[b>>0]=0;}FN(a,0);k[a>>2]=k[j>>2];k[a+4>>2]=k[j+4>>2];k[a+8>>2]=k[j+8>>2];b=0;while(1){if((b|0)==3)break;k[j+(b<<2)>>2]=0;b=b+1|0;}CN(j);CN(l);CN(n);CN(o);CN(q);CN(p);b=0;}}else{GN(a,33089)|0;b=0;}u=r;return b|0;}function ML(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;c=u;u=u+32|0;e=c+8|0;d=c+16|0;f=c;h=i[b+1>>0]|0;g=i[b+2>>0]|0;i[d>>0]=i[b>>0]|0;i[d+1>>0]=h;i[d+2>>0]=g;k[f>>2]=88;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];b=NL(a,e,33190,d)|0;u=c;return b|0;}function NL(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0;p=u;u=u+80|0;h=p+60|0;j=p+48|0;l=p+36|0;m=p+24|0;n=p+12|0;o=p;g=k[b>>2]|0;e=k[b+4>>2]|0;b=k[a+20>>2]|0;if(b){f=b+(e>>1)|0;if(!(e&1))b=g;else b=k[(k[f>>2]|0)+g>>2]|0;b=je[b&127](f,d)|0;if((b|1)<<16>>16==1)b=1;else{k[n>>2]=0;k[n+4>>2]=0;k[n+8>>2]=0;BN(n,33111,14);PN(o,b&65535);e=i[o+11>>0]|0;b=e<<24>>24<0;e=KN(n,b?k[o>>2]|0:o,b?k[o+4>>2]|0:e&255)|0;k[m>>2]=k[e>>2];k[m+4>>2]=k[e+4>>2];k[m+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=LN(m,33126)|0;k[l>>2]=k[e>>2];k[l+4>>2]=k[e+4>>2];k[l+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=LN(l,c|0?c:39022)|0;k[j>>2]=k[e>>2];k[j+4>>2]=k[e+4>>2];k[j+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=LN(j,32931)|0;k[h>>2]=k[e>>2];k[h+4>>2]=k[e+4>>2];k[h+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}b=a+11|0;if((i[b>>0]|0)<0){i[k[a>>2]>>0]=0;k[a+4>>2]=0;}else{i[a>>0]=0;i[b>>0]=0;}FN(a,0);k[a>>2]=k[h>>2];k[a+4>>2]=k[h+4>>2];k[a+8>>2]=k[h+8>>2];b=0;while(1){if((b|0)==3)break;k[h+(b<<2)>>2]=0;b=b+1|0;}CN(h);CN(j);CN(l);CN(m);CN(o);CN(n);b=0;}}else{GN(a,33089)|0;b=0;}u=p;return b|0;}function OL(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;c=u;u=u+32|0;e=c+24|0;d=c+8|0;f=c;h=k[b+4>>2]|0;g=k[b+8>>2]|0;k[d>>2]=k[b>>2];k[d+4>>2]=h;k[d+8>>2]=g;k[f>>2]=16;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];b=PL(a,e,33206,d)|0;u=c;return b|0;}function PL(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0;p=u;u=u+80|0;h=p+60|0;j=p+48|0;l=p+36|0;m=p+24|0;n=p+12|0;o=p;g=k[b>>2]|0;e=k[b+4>>2]|0;b=k[a+20>>2]|0;if(b){f=b+(e>>1)|0;if(!(e&1))b=g;else b=k[(k[f>>2]|0)+g>>2]|0;b=je[b&127](f,d)|0;if((b|1)<<16>>16==1)b=1;else{k[n>>2]=0;k[n+4>>2]=0;k[n+8>>2]=0;BN(n,33111,14);PN(o,b&65535);e=i[o+11>>0]|0;b=e<<24>>24<0;e=KN(n,b?k[o>>2]|0:o,b?k[o+4>>2]|0:e&255)|0;k[m>>2]=k[e>>2];k[m+4>>2]=k[e+4>>2];k[m+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=LN(m,33126)|0;k[l>>2]=k[e>>2];k[l+4>>2]=k[e+4>>2];k[l+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=LN(l,c|0?c:39022)|0;k[j>>2]=k[e>>2];k[j+4>>2]=k[e+4>>2];k[j+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=LN(j,32931)|0;k[h>>2]=k[e>>2];k[h+4>>2]=k[e+4>>2];k[h+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}b=a+11|0;if((i[b>>0]|0)<0){i[k[a>>2]>>0]=0;k[a+4>>2]=0;}else{i[a>>0]=0;i[b>>0]=0;}FN(a,0);k[a>>2]=k[h>>2];k[a+4>>2]=k[h+4>>2];k[a+8>>2]=k[h+8>>2];b=0;while(1){if((b|0)==3)break;k[h+(b<<2)>>2]=0;b=b+1|0;}CN(h);CN(j);CN(l);CN(m);CN(o);CN(n);b=0;}}else{GN(a,33089)|0;b=0;}u=p;return b|0;}function QL(a,b,c){a=a|0;b=b|0;c=+c;var d=0,e=0,f=0,g=0,h=0,i=0;d=u;u=u+32|0;g=d+24|0;e=d+8|0;f=d+16|0;h=d;o[e>>2]=c;i=k[b+4>>2]|0;k[f>>2]=k[b>>2];k[f+4>>2]=i;k[h>>2]=20;k[h+4>>2]=1;k[g>>2]=k[h>>2];k[g+4>>2]=k[h+4>>2];b=RL(a,g,33213,f,e)|0;u=d;return b|0;}function RL(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,l=0,m=0,n=0,p=0,q=0,r=0;r=u;u=u+80|0;l=r+60|0;m=r+48|0;n=r+36|0;p=r+24|0;q=r+12|0;j=r;h=k[b>>2]|0;f=k[b+4>>2]|0;b=k[a+20>>2]|0;if(b){g=b+(f>>1)|0;if(!(f&1))b=h;else b=k[(k[g>>2]|0)+h>>2]|0;b=de[b&3](g,d,+o[e>>2])|0;if((b|1)<<16>>16==1)b=1;else{k[q>>2]=0;k[q+4>>2]=0;k[q+8>>2]=0;BN(q,33111,14);PN(j,b&65535);f=i[j+11>>0]|0;b=f<<24>>24<0;f=KN(q,b?k[j>>2]|0:j,b?k[j+4>>2]|0:f&255)|0;k[p>>2]=k[f>>2];k[p+4>>2]=k[f+4>>2];k[p+8>>2]=k[f+8>>2];b=0;while(1){if((b|0)==3)break;k[f+(b<<2)>>2]=0;b=b+1|0;}f=LN(p,33126)|0;k[n>>2]=k[f>>2];k[n+4>>2]=k[f+4>>2];k[n+8>>2]=k[f+8>>2];b=0;while(1){if((b|0)==3)break;k[f+(b<<2)>>2]=0;b=b+1|0;}f=LN(n,c|0?c:39022)|0;k[m>>2]=k[f>>2];k[m+4>>2]=k[f+4>>2];k[m+8>>2]=k[f+8>>2];b=0;while(1){if((b|0)==3)break;k[f+(b<<2)>>2]=0;b=b+1|0;}f=LN(m,32931)|0;k[l>>2]=k[f>>2];k[l+4>>2]=k[f+4>>2];k[l+8>>2]=k[f+8>>2];b=0;while(1){if((b|0)==3)break;k[f+(b<<2)>>2]=0;b=b+1|0;}b=a+11|0;if((i[b>>0]|0)<0){i[k[a>>2]>>0]=0;k[a+4>>2]=0;}else{i[a>>0]=0;i[b>>0]=0;}FN(a,0);k[a>>2]=k[l>>2];k[a+4>>2]=k[l+4>>2];k[a+8>>2]=k[l+8>>2];b=0;while(1){if((b|0)==3)break;k[l+(b<<2)>>2]=0;b=b+1|0;}CN(l);CN(m);CN(n);CN(p);CN(j);CN(q);b=0;}}else{GN(a,33089)|0;b=0;}u=r;return b|0;}function SL(a,b){a=a|0;b=+b;var c=0,d=0,e=0,f=0;c=u;u=u+32|0;e=c+16|0;d=c+8|0;f=c;o[d>>2]=b;k[f>>2]=40;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];a=TL(a,e,33221,d)|0;u=c;return a|0;}function TL(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,p=0,q=0;q=u;u=u+80|0;h=q+60|0;j=q+48|0;l=q+36|0;m=q+24|0;n=q+12|0;p=q;g=k[b>>2]|0;e=k[b+4>>2]|0;b=k[a+20>>2]|0;if(b){f=b+(e>>1)|0;if(!(e&1))b=g;else b=k[(k[f>>2]|0)+g>>2]|0;b=ge[b&7](f,+o[d>>2])|0;if((b|1)<<16>>16==1)b=1;else{k[n>>2]=0;k[n+4>>2]=0;k[n+8>>2]=0;BN(n,33111,14);PN(p,b&65535);e=i[p+11>>0]|0;b=e<<24>>24<0;e=KN(n,b?k[p>>2]|0:p,b?k[p+4>>2]|0:e&255)|0;k[m>>2]=k[e>>2];k[m+4>>2]=k[e+4>>2];k[m+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=LN(m,33126)|0;k[l>>2]=k[e>>2];k[l+4>>2]=k[e+4>>2];k[l+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=LN(l,c|0?c:39022)|0;k[j>>2]=k[e>>2];k[j+4>>2]=k[e+4>>2];k[j+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=LN(j,32931)|0;k[h>>2]=k[e>>2];k[h+4>>2]=k[e+4>>2];k[h+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}b=a+11|0;if((i[b>>0]|0)<0){i[k[a>>2]>>0]=0;k[a+4>>2]=0;}else{i[a>>0]=0;i[b>>0]=0;}FN(a,0);k[a>>2]=k[h>>2];k[a+4>>2]=k[h+4>>2];k[a+8>>2]=k[h+8>>2];b=0;while(1){if((b|0)==3)break;k[h+(b<<2)>>2]=0;b=b+1|0;}CN(h);CN(j);CN(l);CN(m);CN(p);CN(n);b=0;}}else{GN(a,33089)|0;b=0;}u=q;return b|0;}function UL(a,b){a=a|0;b=+b;var c=0,d=0,e=0,f=0;c=u;u=u+32|0;e=c+16|0;d=c+8|0;f=c;o[d>>2]=b;k[f>>2]=44;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];a=TL(a,e,33236,d)|0;u=c;return a|0;}function VL(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;c=u;u=u+32|0;e=c+16|0;d=c+8|0;f=c;g=k[b+4>>2]|0;k[d>>2]=k[b>>2];k[d+4>>2]=g;k[f>>2]=48;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];b=WL(a,e,33251,d)|0;u=c;return b|0;}function WL(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0;p=u;u=u+80|0;h=p+60|0;j=p+48|0;l=p+36|0;m=p+24|0;n=p+12|0;o=p;g=k[b>>2]|0;e=k[b+4>>2]|0;b=k[a+20>>2]|0;if(b){f=b+(e>>1)|0;if(!(e&1))b=g;else b=k[(k[f>>2]|0)+g>>2]|0;b=je[b&127](f,d)|0;if((b|1)<<16>>16==1)b=1;else{k[n>>2]=0;k[n+4>>2]=0;k[n+8>>2]=0;BN(n,33111,14);PN(o,b&65535);e=i[o+11>>0]|0;b=e<<24>>24<0;e=KN(n,b?k[o>>2]|0:o,b?k[o+4>>2]|0:e&255)|0;k[m>>2]=k[e>>2];k[m+4>>2]=k[e+4>>2];k[m+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=LN(m,33126)|0;k[l>>2]=k[e>>2];k[l+4>>2]=k[e+4>>2];k[l+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=LN(l,c|0?c:39022)|0;k[j>>2]=k[e>>2];k[j+4>>2]=k[e+4>>2];k[j+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=LN(j,32931)|0;k[h>>2]=k[e>>2];k[h+4>>2]=k[e+4>>2];k[h+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}b=a+11|0;if((i[b>>0]|0)<0){i[k[a>>2]>>0]=0;k[a+4>>2]=0;}else{i[a>>0]=0;i[b>>0]=0;}FN(a,0);k[a>>2]=k[h>>2];k[a+4>>2]=k[h+4>>2];k[a+8>>2]=k[h+8>>2];b=0;while(1){if((b|0)==3)break;k[h+(b<<2)>>2]=0;b=b+1|0;}CN(h);CN(j);CN(l);CN(m);CN(o);CN(n);b=0;}}else{GN(a,33089)|0;b=0;}u=p;return b|0;}function XL(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;c=u;u=u+32|0;e=c+16|0;d=c+8|0;f=c;g=k[b+4>>2]|0;k[d>>2]=k[b>>2];k[d+4>>2]=g;k[f>>2]=52;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];b=WL(a,e,33261,d)|0;u=c;return b|0;}function YL(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;c=u;u=u+32|0;e=c+16|0;d=c+8|0;f=c;g=k[b+4>>2]|0;k[d>>2]=k[b>>2];k[d+4>>2]=g;k[f>>2]=56;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];b=WL(a,e,33272,d)|0;u=c;return b|0;}function ZL(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;c=u;u=u+32|0;e=c+16|0;d=c+8|0;f=c;g=k[b+4>>2]|0;k[d>>2]=k[b>>2];k[d+4>>2]=g;k[f>>2]=60;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];b=WL(a,e,33282,d)|0;u=c;return b|0;}function _L(a){a=a|0;var b=0,c=0,d=0;b=u;u=u+16|0;c=b+8|0;d=b;k[d>>2]=64;k[d+4>>2]=1;k[c>>2]=k[d>>2];k[c+4>>2]=k[d+4>>2];a=HL(a,c,33291)|0;u=b;return a|0;}function $L(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=u;u=u+32|0;e=c+16|0;d=c+8|0;f=c;k[d>>2]=b;k[f>>2]=68;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];b=aM(a,e,33301,d)|0;u=c;return b|0;}function aM(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0;p=u;u=u+80|0;h=p+60|0;j=p+48|0;l=p+36|0;m=p+24|0;n=p+12|0;o=p;g=k[b>>2]|0;e=k[b+4>>2]|0;b=k[a+20>>2]|0;if(b){f=b+(e>>1)|0;if(!(e&1))b=g;else b=k[(k[f>>2]|0)+g>>2]|0;b=je[b&127](f,k[d>>2]|0)|0;if((b|1)<<16>>16==1)b=1;else{k[n>>2]=0;k[n+4>>2]=0;k[n+8>>2]=0;BN(n,33111,14);PN(o,b&65535);e=i[o+11>>0]|0;b=e<<24>>24<0;e=KN(n,b?k[o>>2]|0:o,b?k[o+4>>2]|0:e&255)|0;k[m>>2]=k[e>>2];k[m+4>>2]=k[e+4>>2];k[m+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=LN(m,33126)|0;k[l>>2]=k[e>>2];k[l+4>>2]=k[e+4>>2];k[l+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=LN(l,c|0?c:39022)|0;k[j>>2]=k[e>>2];k[j+4>>2]=k[e+4>>2];k[j+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=LN(j,32931)|0;k[h>>2]=k[e>>2];k[h+4>>2]=k[e+4>>2];k[h+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}b=a+11|0;if((i[b>>0]|0)<0){i[k[a>>2]>>0]=0;k[a+4>>2]=0;}else{i[a>>0]=0;i[b>>0]=0;}FN(a,0);k[a>>2]=k[h>>2];k[a+4>>2]=k[h+4>>2];k[a+8>>2]=k[h+8>>2];b=0;while(1){if((b|0)==3)break;k[h+(b<<2)>>2]=0;b=b+1|0;}CN(h);CN(j);CN(l);CN(m);CN(o);CN(n);b=0;}}else{GN(a,33089)|0;b=0;}u=p;return b|0;}function bM(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=u;u=u+32|0;e=c+16|0;d=c+8|0;f=c;k[d>>2]=b;k[f>>2]=72;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];b=cM(a,e,33315,d)|0;u=c;return b|0;}function cM(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0;p=u;u=u+80|0;h=p+60|0;j=p+48|0;l=p+36|0;m=p+24|0;n=p+12|0;o=p;g=k[b>>2]|0;e=k[b+4>>2]|0;b=k[a+20>>2]|0;if(b){f=b+(e>>1)|0;if(!(e&1))b=g;else b=k[(k[f>>2]|0)+g>>2]|0;b=je[b&127](f,k[d>>2]|0)|0;if((b|1)<<16>>16==1)b=1;else{k[n>>2]=0;k[n+4>>2]=0;k[n+8>>2]=0;BN(n,33111,14);PN(o,b&65535);e=i[o+11>>0]|0;b=e<<24>>24<0;e=KN(n,b?k[o>>2]|0:o,b?k[o+4>>2]|0:e&255)|0;k[m>>2]=k[e>>2];k[m+4>>2]=k[e+4>>2];k[m+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=LN(m,33126)|0;k[l>>2]=k[e>>2];k[l+4>>2]=k[e+4>>2];k[l+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=LN(l,c|0?c:39022)|0;k[j>>2]=k[e>>2];k[j+4>>2]=k[e+4>>2];k[j+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=LN(j,32931)|0;k[h>>2]=k[e>>2];k[h+4>>2]=k[e+4>>2];k[h+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}b=a+11|0;if((i[b>>0]|0)<0){i[k[a>>2]>>0]=0;k[a+4>>2]=0;}else{i[a>>0]=0;i[b>>0]=0;}FN(a,0);k[a>>2]=k[h>>2];k[a+4>>2]=k[h+4>>2];k[a+8>>2]=k[h+8>>2];b=0;while(1){if((b|0)==3)break;k[h+(b<<2)>>2]=0;b=b+1|0;}CN(h);CN(j);CN(l);CN(m);CN(o);CN(n);b=0;}}else{GN(a,33089)|0;b=0;}u=p;return b|0;}function dM(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0;g=u;u=u+48|0;f=g+24|0;d=g+12|0;e=g;b=a+20|0;if(!(k[b>>2]|0)){GN(a,33089)|0;b=0;}else{TG(f);b=k[b>>2]|0;b=je[k[(k[b>>2]|0)+128>>2]&127](b,f)|0;if((b|1)<<16>>16==1)b=1;else{PN(e,b&65535);c=NN(e,0,33334)|0;k[d>>2]=k[c>>2];k[d+4>>2]=k[c+4>>2];k[d+8>>2]=k[c+8>>2];b=0;while(1){if((b|0)==3)break;k[c+(b<<2)>>2]=0;b=b+1|0;}b=a+11|0;if((i[b>>0]|0)<0){i[k[a>>2]>>0]=0;k[a+4>>2]=0;}else{i[a>>0]=0;i[b>>0]=0;}FN(a,0);k[a>>2]=k[d>>2];k[a+4>>2]=k[d+4>>2];k[a+8>>2]=k[d+8>>2];b=0;while(1){if((b|0)==3)break;k[d+(b<<2)>>2]=0;b=b+1|0;}CN(d);CN(e);b=0;}k[f>>2]=7276;e=f+4|0;f=k[e>>2]|0;k[e>>2]=0;xN(f);}u=g;return b|0;}function eM(a){a=a|0;var b=0;b=k[a+12>>2]|0;if(!b){GN(a,33367)|0;a=0;}else{bh(Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0);a=1;}return a|0;}function fM(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0;g=u;u=u+48|0;c=g+32|0;d=g+16|0;e=g;f=k[a+12>>2]|0;if(!f){GN(a,33367)|0;a=0;}else{f=Zd[k[(k[f>>2]|0)+12>>2]&255](f)|0;i[c>>0]=1;j=k[b>>2]|0;k[d>>2]=j;h=k[b+4>>2]|0;k[d+4>>2]=h;k[d+8>>2]=0;k[d+12>>2]=0;b=k[b+8>>2]|0;k[e>>2]=j;k[e+4>>2]=h;k[e+8>>2]=b;gM(f,d,e,c);if(!(i[c>>0]|0)){GN(a,33382)|0;a=0;}else a=1;}u=g;return a|0;}function gM(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if(k[a+16>>2]|0)hM(a,b,c,d);return;}function hM(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;a=k[a+16>>2]|0;if(!a){d=rc(4)|0;k[d>>2]=3632;Ld(d|0,288,44);}else{re[k[(k[a>>2]|0)+24>>2]&31](a,b,c,d);return;}}function iM(a,b){a=a|0;b=b|0;var c=0;c=k[a+28>>2]|0;if(!c){GN(a,33410)|0;a=0;}else{jI(c,b);a=1;}return a|0;}function jM(){kM(0);return;}function kM(a){a=a|0;nd(2976,33435);Kb(2992,33440,1,1,0);qc(3e3,33445,1,-128,127);qc(3016,33450,1,-128,127);qc(3008,33462,1,0,255);qc(3024,33476,2,-32768,32767);qc(3032,33482,2,0,65535);qc(3040,33497,4,-2147483648,2147483647);qc(3048,33501,4,0,-1);qc(3056,33514,4,-2147483648,2147483647);qc(3064,33519,4,0,-1);Ed(3072,33533,4);Ed(3080,33539,8);cd(2080,33546);cd(2664,33558);yb(2688,4,33591);Ob(2712,33604);gd(2720,0,33620);lM(33650);mM(33687);nM(33726);oM(33757);pM(33797);qM(33826);gd(2728,4,33864);gd(2736,5,33894);lM(33933);mM(33965);nM(33998);oM(34031);pM(34065);qM(34098);gd(2744,6,34132);gd(2752,7,34163);gd(2760,7,34195);return;}function lM(a){a=a|0;gd(2808,0,a|0);return;}function mM(a){a=a|0;gd(2800,1,a|0);return;}function nM(a){a=a|0;gd(2792,2,a|0);return;}function oM(a){a=a|0;gd(2784,3,a|0);return;}function pM(a){a=a|0;gd(2776,4,a|0);return;}function qM(a){a=a|0;gd(2768,5,a|0);return;}function rM(a){a=a|0;return _M(k[a+4>>2]|0)|0;}function sM(){return 38436;}function tM(a){a=a|0;var b=0,c=0;b=u;u=u+16|0;c=b;a=zM(k[a+60>>2]|0)|0;k[c>>2]=a;a=wM(ac(6,c|0)|0)|0;u=b;return a|0;}function uM(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0,n=0,o=0;m=u;u=u+48|0;j=m+16|0;f=m;e=m+32|0;h=a+28|0;d=k[h>>2]|0;k[e>>2]=d;i=a+20|0;d=(k[i>>2]|0)-d|0;k[e+4>>2]=d;k[e+8>>2]=b;k[e+12>>2]=c;d=d+c|0;g=a+60|0;k[f>>2]=k[g>>2];k[f+4>>2]=e;k[f+8>>2]=2;f=wM(wb(146,f|0)|0)|0;a:do if((d|0)!=(f|0)){b=2;while(1){if((f|0)<0)break;d=d-f|0;o=k[e+4>>2]|0;n=f>>>0>o>>>0;e=n?e+8|0:e;b=(n<<31>>31)+b|0;o=f-(n?o:0)|0;k[e>>2]=(k[e>>2]|0)+o;n=e+4|0;k[n>>2]=(k[n>>2]|0)-o;k[j>>2]=k[g>>2];k[j+4>>2]=e;k[j+8>>2]=b;f=wM(wb(146,j|0)|0)|0;if((d|0)==(f|0)){l=3;break a;}}k[a+16>>2]=0;k[h>>2]=0;k[i>>2]=0;k[a>>2]=k[a>>2]|32;if((b|0)==2)c=0;else c=c-(k[e+4>>2]|0)|0;}else l=3;while(0);if((l|0)==3){o=k[a+44>>2]|0;k[a+16>>2]=o+(k[a+48>>2]|0);k[h>>2]=o;k[i>>2]=o;}u=m;return c|0;}function vM(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;e=u;u=u+32|0;f=e;d=e+20|0;k[f>>2]=k[a+60>>2];k[f+4>>2]=0;k[f+8>>2]=b;k[f+12>>2]=d;k[f+16>>2]=c;if((wM(ub(140,f|0)|0)|0)<0){k[d>>2]=-1;a=-1;}else a=k[d>>2]|0;u=e;return a|0;}function wM(a){a=a|0;var b=0;if(a>>>0>4294963200){b=xM()|0;k[b>>2]=0-a;a=-1;}return a|0;}function xM(){return(yM()|0)+64|0;}function yM(){return 8412;}function zM(a){a=a|0;return a|0;}function AM(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=u;u=u+32|0;d=e;k[a+36>>2]=18;if((k[a>>2]&64|0)==0?(k[d>>2]=k[a+60>>2],k[d+4>>2]=21523,k[d+8>>2]=e+16,lc(54,d|0)|0):0)i[a+75>>0]=-1;d=uM(a,b,c)|0;u=e;return d|0;}function BM(a,b){a=a|0;b=b|0;var c=0,d=0;c=i[a>>0]|0;d=i[b>>0]|0;if(c<<24>>24==0?1:c<<24>>24!=d<<24>>24)a=d;else{do{a=a+1|0;b=b+1|0;c=i[a>>0]|0;d=i[b>>0]|0;}while(!(c<<24>>24==0?1:c<<24>>24!=d<<24>>24));a=d;}return(c&255)-(a&255)|0;}function CM(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;a:do if(!c)a=0;else{while(1){d=i[a>>0]|0;e=i[b>>0]|0;if(d<<24>>24!=e<<24>>24)break;c=c+-1|0;if(!c){a=0;break a;}else{a=a+1|0;b=b+1|0;}}a=(d&255)-(e&255)|0;}while(0);return a|0;}function DM(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0,m=0;m=u;u=u+128|0;e=m+124|0;l=m;f=l;g=8784;h=f+124|0;do{k[f>>2]=k[g>>2];f=f+4|0;g=g+4|0;}while((f|0)<(h|0));if((b+-1|0)>>>0>2147483646){if(!b){a=e;b=1;j=4;}else{b=xM()|0;k[b>>2]=75;b=-1;}}else j=4;if((j|0)==4){j=-2-a|0;j=b>>>0>j>>>0?j:b;k[l+48>>2]=j;e=l+20|0;k[e>>2]=a;k[l+44>>2]=a;b=a+j|0;a=l+16|0;k[a>>2]=b;k[l+28>>2]=b;b=EM(l,c,d)|0;if(j){l=k[e>>2]|0;i[l+(((l|0)==(k[a>>2]|0))<<31>>31)>>0]=0;}}u=m;return b|0;}function EM(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;r=u;u=u+224|0;m=r+120|0;n=r+80|0;p=r;q=r+136|0;d=n;e=d+40|0;do{k[d>>2]=0;d=d+4|0;}while((d|0)<(e|0));k[m>>2]=k[c>>2];if((FM(0,b,m,p,n)|0)<0)c=-1;else{if((k[a+76>>2]|0)>-1)o=GM(a)|0;else o=0;c=k[a>>2]|0;l=c&32;if((i[a+74>>0]|0)<1)k[a>>2]=c&-33;d=a+48|0;if(!(k[d>>2]|0)){e=a+44|0;f=k[e>>2]|0;k[e>>2]=q;g=a+28|0;k[g>>2]=q;h=a+20|0;k[h>>2]=q;k[d>>2]=80;j=a+16|0;k[j>>2]=q+80;c=FM(a,b,m,p,n)|0;if(f){$d[k[a+36>>2]&63](a,0,0)|0;c=(k[h>>2]|0)==0?-1:c;k[e>>2]=f;k[d>>2]=0;k[j>>2]=0;k[g>>2]=0;k[h>>2]=0;}}else c=FM(a,b,m,p,n)|0;d=k[a>>2]|0;k[a>>2]=d|l;if(o|0)HM(a);c=(d&32|0)==0?c:-1;}u=r;return c|0;}function FM(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,m=0,n=0.0,o=0,q=0,r=0,t=0,v=0.0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0;ja=u;u=u+624|0;fa=ja+24|0;ga=ja+16|0;ha=ja+588|0;X=ja+576|0;ia=ja;S=ja+536|0;N=ja+8|0;O=ja+528|0;P=(a|0)!=0;Q=S+40|0;R=Q;S=S+39|0;T=N+4|0;U=ha;V=0-U|0;W=X+12|0;X=X+11|0;Y=W;Z=Y-U|0;_=-2-U|0;aa=Y+2|0;ba=fa+288|0;ca=ha+9|0;da=ca;ea=ha+8|0;g=0;f=0;q=0;a:while(1){do if((f|0)>-1)if((g|0)>(2147483647-f|0)){f=xM()|0;k[f>>2]=75;f=-1;break;}else{f=g+f|0;break;}while(0);g=i[b>>0]|0;if(!(g<<24>>24)){L=243;break;}else h=b;b:while(1){switch(g<<24>>24){case 37:{g=h;L=9;break b;}case 0:{g=h;break b;}default:{}}g=h+1|0;h=g;g=i[g>>0]|0;}c:do if((L|0)==9)while(1){L=0;if((i[h+1>>0]|0)!=37)break c;g=g+1|0;h=h+2|0;if((i[h>>0]|0)==37)L=9;else break;}while(0);g=g-b|0;if(P?(k[a>>2]&32|0)==0:0)IM(b,g,a)|0;if(g|0){b=h;continue;}o=h+1|0;m=i[o>>0]|0;g=(m<<24>>24)+-48|0;if(g>>>0<10){t=(i[h+2>>0]|0)==36;o=t?h+3|0:o;w=t?g:-1;t=t?1:q;g=i[o>>0]|0;}else{w=-1;t=q;g=m;}h=(g<<24>>24)+-32|0;d:do if(h>>>0<32){m=0;do{if(!(1<<h&75913))break d;m=1<<(g<<24>>24)+-32|m;o=o+1|0;g=i[o>>0]|0;h=(g<<24>>24)+-32|0;}while(h>>>0<32);}else m=0;while(0);do if(g<<24>>24!=42){h=(g<<24>>24)+-48|0;if(h>>>0<10){q=0;do{q=(q*10|0)+h|0;o=o+1|0;g=i[o>>0]|0;h=(g<<24>>24)+-48|0;}while(h>>>0<10);if((q|0)<0){f=-1;break a;}else K=t;}else{q=0;K=t;}}else{r=o+1|0;g=i[r>>0]|0;h=(g<<24>>24)+-48|0;if(h>>>0<10?(i[o+2>>0]|0)==36:0){k[e+(h<<2)>>2]=10;g=k[d+((i[r>>0]|0)+-48<<3)>>2]|0;h=1;r=o+3|0;}else{if(t|0){f=-1;break a;}if(!P){q=0;K=0;o=r;break;}h=(k[c>>2]|0)+(4-1)&~(4-1);g=k[h>>2]|0;k[c>>2]=h+4;h=0;}K=(g|0)<0;q=K?0-g|0:g;m=K?m|8192:m;K=h;o=r;g=i[r>>0]|0;}while(0);e:do if(g<<24>>24==46){g=o+1|0;h=i[g>>0]|0;if(h<<24>>24!=42){o=(h<<24>>24)+-48|0;if(o>>>0<10)h=0;else{x=0;break;}while(1){h=(h*10|0)+o|0;g=g+1|0;o=(i[g>>0]|0)+-48|0;if(o>>>0>=10){x=h;break e;}}}g=o+2|0;h=(i[g>>0]|0)+-48|0;if(h>>>0<10?(i[o+3>>0]|0)==36:0){k[e+(h<<2)>>2]=10;x=k[d+((i[g>>0]|0)+-48<<3)>>2]|0;g=o+4|0;break;}if(K|0){f=-1;break a;}if(P){J=(k[c>>2]|0)+(4-1)&~(4-1);x=k[J>>2]|0;k[c>>2]=J+4;}else x=0;}else{x=-1;g=o;}while(0);t=0;while(1){h=(i[g>>0]|0)+-65|0;if(h>>>0>57){f=-1;break a;}J=g+1|0;h=i[34749+(t*58|0)+h>>0]|0;o=h&255;if((o+-1|0)>>>0<8){t=o;g=J;}else break;}if(!(h<<24>>24)){f=-1;break;}r=(w|0)>-1;do if(h<<24>>24==19){if(r){f=-1;break a;}else L=51;}else{if(r){k[e+(w<<2)>>2]=o;H=d+(w<<3)|0;I=k[H+4>>2]|0;L=ia;k[L>>2]=k[H>>2];k[L+4>>2]=I;L=51;break;}if(!P){f=0;break a;}JM(ia,o,c);}while(0);if((L|0)==51?(L=0,!P):0){g=0;q=K;b=J;continue;}E=i[g>>0]|0;E=(t|0)!=0&(E&15|0)==3?E&-33:E;r=m&-65537;I=(m&8192|0)==0?m:r;f:do switch(E|0){case 110:switch((t&255)<<24>>24){case 0:{k[k[ia>>2]>>2]=f;g=0;q=K;b=J;continue a;}case 1:{k[k[ia>>2]>>2]=f;g=0;q=K;b=J;continue a;}case 2:{g=k[ia>>2]|0;k[g>>2]=f;k[g+4>>2]=((f|0)<0)<<31>>31;g=0;q=K;b=J;continue a;}case 3:{j[k[ia>>2]>>1]=f;g=0;q=K;b=J;continue a;}case 4:{i[k[ia>>2]>>0]=f;g=0;q=K;b=J;continue a;}case 6:{k[k[ia>>2]>>2]=f;g=0;q=K;b=J;continue a;}case 7:{g=k[ia>>2]|0;k[g>>2]=f;k[g+4>>2]=((f|0)<0)<<31>>31;g=0;q=K;b=J;continue a;}default:{g=0;q=K;b=J;continue a;}}case 112:{r=120;t=x>>>0>8?x:8;g=I|8;L=63;break;}case 88:case 120:{r=E;t=x;g=I;L=63;break;}case 111:{h=ia;g=k[h>>2]|0;h=k[h+4>>2]|0;if((g|0)==0&(h|0)==0)b=Q;else{b=Q;do{b=b+-1|0;i[b>>0]=g&7|48;g=OO(g|0,h|0,3)|0;h=M;}while(!((g|0)==0&(h|0)==0));}if(!(I&8)){h=0;m=35229;o=x;g=I;L=76;}else{o=R-b|0;h=0;m=35229;o=(x|0)>(o|0)?x:o+1|0;g=I;L=76;}break;}case 105:case 100:{b=ia;g=k[b>>2]|0;b=k[b+4>>2]|0;if((b|0)<0){g=LO(0,0,g|0,b|0)|0;b=M;h=ia;k[h>>2]=g;k[h+4>>2]=b;h=1;m=35229;L=75;break f;}if(!(I&2048)){m=I&1;h=m;m=(m|0)==0?35229:35231;L=75;}else{h=1;m=35230;L=75;}break;}case 117:{b=ia;h=0;m=35229;g=k[b>>2]|0;b=k[b+4>>2]|0;L=75;break;}case 99:{i[S>>0]=k[ia>>2];b=S;w=0;t=35229;h=Q;g=1;break;}case 109:{g=xM()|0;g=LM(k[g>>2]|0)|0;L=81;break;}case 115:{g=k[ia>>2]|0;g=g|0?g:35239;L=81;break;}case 67:{k[N>>2]=k[ia>>2];k[T>>2]=0;k[ia>>2]=N;r=-1;h=N;L=85;break;}case 83:{g=k[ia>>2]|0;if(!x){NM(a,32,q,0,I);g=0;L=96;}else{r=x;h=g;L=85;}break;}case 65:case 71:case 70:case 69:case 97:case 103:case 102:case 101:{n=+p[ia>>3];k[ga>>2]=0;p[s>>3]=n;if((k[s+4>>2]|0)>=0){g=I&1;if(!(I&2048)){H=g;G=(g|0)==0?35247:35252;}else{H=1;G=35249;}}else{n=-n;H=1;G=35246;}p[s>>3]=n;F=k[s+4>>2]&2146435072;do if(F>>>0<2146435072|(F|0)==2146435072&0<0){v=+PM(n,ga)*2.0;b=v!=0.0;if(b)k[ga>>2]=(k[ga>>2]|0)+-1;z=E|32;if((z|0)==97){o=E&32;w=(o|0)==0?G:G+9|0;t=H|2;g=12-x|0;do if(!(x>>>0>11|(g|0)==0)){n=8.0;do{g=g+-1|0;n=n*16.0;}while((g|0)!=0);if((i[w>>0]|0)==45){n=-(n+(-v-n));break;}else{n=v+n-n;break;}}else n=v;while(0);b=k[ga>>2]|0;g=(b|0)<0?0-b|0:b;g=KM(g,((g|0)<0)<<31>>31,W)|0;if((g|0)==(W|0)){i[X>>0]=48;g=X;}i[g+-1>>0]=(b>>31&2)+43;r=g+-2|0;i[r>>0]=E+15;m=(x|0)<1;h=(I&8|0)==0;g=ha;do{H=~~n;b=g+1|0;i[g>>0]=l[35213+H>>0]|o;n=(n-+(H|0))*16.0;do if((b-U|0)==1){if(h&(m&n==0.0)){g=b;break;}i[b>>0]=46;g=g+2|0;}else g=b;while(0);}while(n!=0.0);m=r;h=(x|0)!=0&(_+g|0)<(x|0)?aa+x-m|0:Z-m+g|0;o=h+t|0;NM(a,32,q,o,I);if(!(k[a>>2]&32))IM(w,t,a)|0;NM(a,48,q,o,I^65536);b=g-U|0;if(!(k[a>>2]&32))IM(ha,b,a)|0;g=Y-m|0;NM(a,48,h-(b+g)|0,0,0);if(!(k[a>>2]&32))IM(r,g,a)|0;NM(a,32,q,o,I^8192);g=(o|0)<(q|0)?q:o;break;}g=(x|0)<0?6:x;if(b){b=(k[ga>>2]|0)+-28|0;k[ga>>2]=b;n=v*268435456.0;}else{n=v;b=k[ga>>2]|0;}F=(b|0)<0?fa:ba;h=F;do{D=~~n>>>0;k[h>>2]=D;h=h+4|0;n=(n-+(D>>>0))*1.0e9;}while(n!=0.0);if((b|0)>0){m=F;r=h;while(1){o=(b|0)>29?29:b;b=r+-4|0;do if(b>>>0>=m>>>0){h=0;do{C=XO(k[b>>2]|0,0,o|0)|0;C=MO(C|0,M|0,h|0,0)|0;D=M;B=UO(C|0,D|0,1e9,0)|0;k[b>>2]=B;h=YO(C|0,D|0,1e9,0)|0;b=b+-4|0;}while(b>>>0>=m>>>0);if(!h)break;m=m+-4|0;k[m>>2]=h;}while(0);h=r;while(1){if(h>>>0<=m>>>0)break;b=h+-4|0;if(!(k[b>>2]|0))h=b;else break;}b=(k[ga>>2]|0)-o|0;k[ga>>2]=b;if((b|0)>0)r=h;else break;}}else m=F;if((b|0)<0){x=((g+25|0)/9|0)+1|0;y=(z|0)==102;do{w=0-b|0;w=(w|0)>9?9:w;do if(m>>>0<h>>>0){o=(1<<w)+-1|0;r=1e9>>>w;t=0;b=m;do{D=k[b>>2]|0;k[b>>2]=(D>>>w)+t;t=$(D&o,r)|0;b=b+4|0;}while(b>>>0<h>>>0);b=(k[m>>2]|0)==0?m+4|0:m;if(!t){m=b;b=h;break;}k[h>>2]=t;m=b;b=h+4|0;}else{m=(k[m>>2]|0)==0?m+4|0:m;b=h;}while(0);h=y?F:m;h=(b-h>>2|0)>(x|0)?h+(x<<2)|0:b;b=(k[ga>>2]|0)+w|0;k[ga>>2]=b;}while((b|0)<0);}D=F;do if(m>>>0<h>>>0){b=(D-m>>2)*9|0;r=k[m>>2]|0;if(r>>>0<10)break;else o=10;do{o=o*10|0;b=b+1|0;}while(r>>>0>=o>>>0);}else b=0;while(0);A=(z|0)==103;B=(g|0)!=0;o=g-((z|0)!=102?b:0)+((B&A)<<31>>31)|0;if((o|0)<(((h-D>>2)*9|0)+-9|0)){o=o+9216|0;t=F+4+(((o|0)/9|0)+-1024<<2)|0;o=((o|0)%9|0)+1|0;if((o|0)<9){r=10;do{r=r*10|0;o=o+1|0;}while((o|0)!=9);}else r=10;x=k[t>>2]|0;y=(x>>>0)%(r>>>0)|0;o=(t+4|0)==(h|0);do if(o&(y|0)==0)o=t;else{v=(((x>>>0)/(r>>>0)|0)&1|0)==0?9007199254740992.0:9007199254740994.0;w=(r|0)/2|0;if(y>>>0<w>>>0)n=.5;else n=o&(y|0)==(w|0)?1.0:1.5;do if(H){if((i[G>>0]|0)!=45)break;n=-n;v=-v;}while(0);o=x-y|0;k[t>>2]=o;if(!(v+n!=v)){o=t;break;}C=o+r|0;k[t>>2]=C;if(C>>>0>999999999){o=t;while(1){b=o+-4|0;k[o>>2]=0;if(b>>>0<m>>>0){m=m+-4|0;k[m>>2]=0;}C=(k[b>>2]|0)+1|0;k[b>>2]=C;if(C>>>0>999999999)o=b;else{t=b;break;}}}b=(D-m>>2)*9|0;r=k[m>>2]|0;if(r>>>0<10){o=t;break;}else o=10;do{o=o*10|0;b=b+1|0;}while(r>>>0>=o>>>0);o=t;}while(0);C=o+4|0;h=h>>>0>C>>>0?C:h;}y=0-b|0;C=h;while(1){if(C>>>0<=m>>>0){z=0;break;}h=C+-4|0;if(!(k[h>>2]|0))C=h;else{z=1;break;}}do if(A){g=(B&1^1)+g|0;if((g|0)>(b|0)&(b|0)>-5){t=E+-1|0;g=g+-1-b|0;}else{t=E+-2|0;g=g+-1|0;}h=I&8;if(h|0){w=h;break;}do if(z){r=k[C+-4>>2]|0;if(!r){o=9;break;}if(!((r>>>0)%10|0)){o=0;h=10;}else{o=0;break;}do{h=h*10|0;o=o+1|0;}while(!((r>>>0)%(h>>>0)|0|0));}else o=9;while(0);h=((C-D>>2)*9|0)+-9|0;if((t|32|0)==102){w=h-o|0;w=(w|0)<0?0:w;g=(g|0)<(w|0)?g:w;w=0;break;}else{w=h+b-o|0;w=(w|0)<0?0:w;g=(g|0)<(w|0)?g:w;w=0;break;}}else{t=E;w=I&8;}while(0);x=g|w;o=(x|0)!=0&1;r=(t|32|0)==102;if(r){y=0;b=(b|0)>0?b:0;}else{h=(b|0)<0?y:b;h=KM(h,((h|0)<0)<<31>>31,W)|0;if((Y-h|0)<2)do{h=h+-1|0;i[h>>0]=48;}while((Y-h|0)<2);i[h+-1>>0]=(b>>31&2)+43;b=h+-2|0;i[b>>0]=t;y=b;b=Y-b|0;}A=H+1+g+o+b|0;NM(a,32,q,A,I);if(!(k[a>>2]&32))IM(G,H,a)|0;NM(a,48,q,A,I^65536);do if(r){m=m>>>0>F>>>0?F:m;h=m;do{b=KM(k[h>>2]|0,0,ca)|0;do if((h|0)==(m|0)){if((b|0)!=(ca|0))break;i[ea>>0]=48;b=ea;}else{if(b>>>0<=ha>>>0)break;WO(ha|0,48,b-U|0)|0;do b=b+-1|0;while(b>>>0>ha>>>0);}while(0);if(!(k[a>>2]&32))IM(b,da-b|0,a)|0;h=h+4|0;}while(h>>>0<=F>>>0);do if(x|0){if(k[a>>2]&32|0)break;IM(35281,1,a)|0;}while(0);if((g|0)>0&h>>>0<C>>>0)while(1){b=KM(k[h>>2]|0,0,ca)|0;if(b>>>0>ha>>>0){WO(ha|0,48,b-U|0)|0;do b=b+-1|0;while(b>>>0>ha>>>0);}if(!(k[a>>2]&32))IM(b,(g|0)>9?9:g,a)|0;h=h+4|0;b=g+-9|0;if(!((g|0)>9&h>>>0<C>>>0)){g=b;break;}else g=b;}NM(a,48,g+9|0,9,0);}else{t=z?C:m+4|0;if((g|0)>-1){r=(w|0)==0;o=m;do{b=KM(k[o>>2]|0,0,ca)|0;if((b|0)==(ca|0)){i[ea>>0]=48;b=ea;}do if((o|0)==(m|0)){h=b+1|0;if(!(k[a>>2]&32))IM(b,1,a)|0;if(r&(g|0)<1){b=h;break;}if(k[a>>2]&32|0){b=h;break;}IM(35281,1,a)|0;b=h;}else{if(b>>>0<=ha>>>0)break;WO(ha|0,48,b+V|0)|0;do b=b+-1|0;while(b>>>0>ha>>>0);}while(0);h=da-b|0;if(!(k[a>>2]&32))IM(b,(g|0)>(h|0)?h:g,a)|0;g=g-h|0;o=o+4|0;}while(o>>>0<t>>>0&(g|0)>-1);}NM(a,48,g+18|0,18,0);if(k[a>>2]&32|0)break;IM(y,Y-y|0,a)|0;}while(0);NM(a,32,q,A,I^8192);g=(A|0)<(q|0)?q:A;}else{b=(E&32|0)!=0;h=H+3|0;NM(a,32,q,h,r);g=k[a>>2]|0;if(!(g&32)){IM(G,H,a)|0;g=k[a>>2]|0;}if(!(g&32))IM(n!=n|0.0!=0.0?b?35273:35277:b?35265:35269,3,a)|0;NM(a,32,q,h,I^8192);g=(h|0)<(q|0)?q:h;}while(0);q=K;b=J;continue a;}default:{w=0;t=35229;h=Q;g=x;r=I;}}while(0);g:do if((L|0)==63){m=ia;h=k[m>>2]|0;m=k[m+4>>2]|0;o=r&32;if((h|0)==0&(m|0)==0){b=Q;h=0;m=0;}else{b=Q;do{b=b+-1|0;i[b>>0]=l[35213+(h&15)>>0]|o;h=OO(h|0,m|0,4)|0;m=M;}while(!((h|0)==0&(m|0)==0));m=ia;h=k[m>>2]|0;m=k[m+4>>2]|0;}m=(g&8|0)==0|(h|0)==0&(m|0)==0;h=m?0:2;m=m?35229:35229+(r>>4)|0;o=t;L=76;}else if((L|0)==75){b=KM(g,b,Q)|0;o=x;g=I;L=76;}else if((L|0)==81){L=0;I=MM(g,0,x)|0;H=(I|0)==0;b=g;w=0;t=35229;h=H?g+x|0:I;g=H?x:I-g|0;}else if((L|0)==85){L=0;o=h;g=0;b=0;while(1){m=k[o>>2]|0;if(!m)break;b=OM(O,m)|0;if((b|0)<0|b>>>0>(r-g|0)>>>0)break;g=b+g|0;if(r>>>0>g>>>0)o=o+4|0;else break;}if((b|0)<0){f=-1;break a;}NM(a,32,q,g,I);if(!g){g=0;L=96;}else{m=0;while(1){b=k[h>>2]|0;if(!b){L=96;break g;}b=OM(O,b)|0;m=b+m|0;if((m|0)>(g|0)){L=96;break g;}if(!(k[a>>2]&32))IM(O,b,a)|0;if(m>>>0>=g>>>0){L=96;break;}else h=h+4|0;}}}while(0);if((L|0)==96){L=0;NM(a,32,q,g,I^8192);g=(q|0)>(g|0)?q:g;q=K;b=J;continue;}if((L|0)==76){L=0;r=(o|0)>-1?g&-65537:g;g=ia;g=(k[g>>2]|0)!=0|(k[g+4>>2]|0)!=0;if((o|0)!=0|g){g=(g&1^1)+(R-b)|0;w=h;t=m;h=Q;g=(o|0)>(g|0)?o:g;}else{b=Q;w=h;t=m;h=Q;g=0;}}o=h-b|0;h=(g|0)<(o|0)?o:g;m=h+w|0;g=(q|0)<(m|0)?m:q;NM(a,32,g,m,r);if(!(k[a>>2]&32))IM(t,w,a)|0;NM(a,48,g,m,r^65536);NM(a,48,h,o,0);if(!(k[a>>2]&32))IM(b,o,a)|0;NM(a,32,g,m,r^8192);q=K;b=J;}h:do if((L|0)==243)if(!a)if(!q)f=0;else{f=1;while(1){g=k[e+(f<<2)>>2]|0;if(!g)break;JM(d+(f<<3)|0,g,c);f=f+1|0;if((f|0)>=10){f=1;break h;}}while(1){if(k[e+(f<<2)>>2]|0){f=-1;break h;}f=f+1|0;if((f|0)>=10){f=1;break;}}}while(0);u=ja;return f|0;}function GM(a){a=a|0;return 0;}function HM(a){a=a|0;return;}function IM(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;d=c+16|0;e=k[d>>2]|0;if(!e){if(!(WM(c)|0)){e=k[d>>2]|0;f=5;}else d=0;}else f=5;a:do if((f|0)==5){h=c+20|0;g=k[h>>2]|0;d=g;if((e-g|0)>>>0<b>>>0){d=$d[k[c+36>>2]&63](c,a,b)|0;break;}b:do if((i[c+75>>0]|0)>-1){g=b;while(1){if(!g){f=0;e=a;break b;}e=g+-1|0;if((i[a+e>>0]|0)==10)break;else g=e;}d=$d[k[c+36>>2]&63](c,a,g)|0;if(d>>>0<g>>>0)break a;f=g;e=a+g|0;b=b-g|0;d=k[h>>2]|0;}else{f=0;e=a;}while(0);PO(d|0,e|0,b|0)|0;k[h>>2]=(k[h>>2]|0)+b;d=f+b|0;}while(0);return d|0;}function JM(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0.0;a:do if(b>>>0<=20)do switch(b|0){case 9:{d=(k[c>>2]|0)+(4-1)&~(4-1);b=k[d>>2]|0;k[c>>2]=d+4;k[a>>2]=b;break a;}case 10:{d=(k[c>>2]|0)+(4-1)&~(4-1);b=k[d>>2]|0;k[c>>2]=d+4;d=a;k[d>>2]=b;k[d+4>>2]=((b|0)<0)<<31>>31;break a;}case 11:{d=(k[c>>2]|0)+(4-1)&~(4-1);b=k[d>>2]|0;k[c>>2]=d+4;d=a;k[d>>2]=b;k[d+4>>2]=0;break a;}case 12:{d=(k[c>>2]|0)+(8-1)&~(8-1);b=d;e=k[b>>2]|0;b=k[b+4>>2]|0;k[c>>2]=d+8;d=a;k[d>>2]=e;k[d+4>>2]=b;break a;}case 13:{e=(k[c>>2]|0)+(4-1)&~(4-1);d=k[e>>2]|0;k[c>>2]=e+4;d=(d&65535)<<16>>16;e=a;k[e>>2]=d;k[e+4>>2]=((d|0)<0)<<31>>31;break a;}case 14:{e=(k[c>>2]|0)+(4-1)&~(4-1);d=k[e>>2]|0;k[c>>2]=e+4;e=a;k[e>>2]=d&65535;k[e+4>>2]=0;break a;}case 15:{e=(k[c>>2]|0)+(4-1)&~(4-1);d=k[e>>2]|0;k[c>>2]=e+4;d=(d&255)<<24>>24;e=a;k[e>>2]=d;k[e+4>>2]=((d|0)<0)<<31>>31;break a;}case 16:{e=(k[c>>2]|0)+(4-1)&~(4-1);d=k[e>>2]|0;k[c>>2]=e+4;e=a;k[e>>2]=d&255;k[e+4>>2]=0;break a;}case 17:{e=(k[c>>2]|0)+(8-1)&~(8-1);f=+p[e>>3];k[c>>2]=e+8;p[a>>3]=f;break a;}case 18:{e=(k[c>>2]|0)+(8-1)&~(8-1);f=+p[e>>3];k[c>>2]=e+8;p[a>>3]=f;break a;}default:break a;}while(0);while(0);return;}function KM(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;if(b>>>0>0|(b|0)==0&a>>>0>4294967295){while(1){d=UO(a|0,b|0,10,0)|0;c=c+-1|0;i[c>>0]=d|48;d=a;a=YO(a|0,b|0,10,0)|0;if(!(b>>>0>9|(b|0)==9&d>>>0>4294967295))break;else b=M;}b=a;}else b=a;if(b)while(1){c=c+-1|0;i[c>>0]=(b>>>0)%10|0|48;if(b>>>0<10)break;else b=(b>>>0)/10|0;}return c|0;}function LM(a){a=a|0;var b=0;b=(yM()|0)+188|0;return SM(a,k[b>>2]|0)|0;}function MM(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0;f=b&255;d=(c|0)!=0;a:do if(d&(a&3|0)!=0){e=b&255;while(1){if((i[a>>0]|0)==e<<24>>24){g=6;break a;}a=a+1|0;c=c+-1|0;d=(c|0)!=0;if(!(d&(a&3|0)!=0)){g=5;break;}}}else g=5;while(0);if((g|0)==5)if(d)g=6;else c=0;b:do if((g|0)==6){e=b&255;if((i[a>>0]|0)!=e<<24>>24){d=$(f,16843009)|0;c:do if(c>>>0>3)while(1){f=k[a>>2]^d;if((f&-2139062144^-2139062144)&f+-16843009|0)break;a=a+4|0;c=c+-4|0;if(c>>>0<=3){g=11;break c;}}else g=11;while(0);if((g|0)==11)if(!c){c=0;break;}while(1){if((i[a>>0]|0)==e<<24>>24)break b;a=a+1|0;c=c+-1|0;if(!c){c=0;break;}}}}while(0);return(c|0?a:0)|0;}function Ut(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0.0,g=0.0,h=0,j=0,l=0,m=0,n=0,p=0,q=0,r=0,s=0,t=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;B=u;u=u+32|0;A=B+4|0;t=B;v=B+16|0;k[t>>2]=b;z=Vt(a+12|0,b)|0;x=a+4|0;h=k[x>>2]|0;y=(h|0)==0;a:do if(!y){n=h+-1|0;p=(n&h|0)==0;if(p)q=n&z;else q=(z>>>0)%(h>>>0)|0;c=k[(k[a>>2]|0)+(q<<2)>>2]|0;if(!c){c=q;w=19;}else{r=b+11|0;s=b+4|0;b:while(1){c=k[c>>2]|0;if(!c){c=q;w=19;break a;}d=k[c+4>>2]|0;if(p)d=d&n;else d=(d>>>0)%(h>>>0)|0;if((d|0)!=(q|0)){c=q;w=19;break a;}d=c+8|0;j=i[d+11>>0]|0;l=j<<24>>24<0;j=j&255;m=l?k[c+12>>2]|0:j;C=i[r>>0]|0;e=C<<24>>24<0;if((m|0)!=((e?k[s>>2]|0:C&255)|0))continue;e=e?k[b>>2]|0:b;if(l)if(!(Vn(k[d>>2]|0,e,m)|0))break;else continue;while(1){if(!j)break a;if((i[d>>0]|0)!=(i[e>>0]|0))continue b;j=j+-1|0;e=e+1|0;d=d+1|0;}}}}else{c=0;w=19;}while(0);if((w|0)==19){Wt(A,a,z,39020,t,v);j=a+12|0;f=+(((k[j>>2]|0)+1|0)>>>0);g=+o[a+16>>2];do if(y|f>+(h>>>0)*g){c=(h>>>0>2&(h+-1&h|0)==0&1|h<<1)^1;d=~~+_(+(f/g))>>>0;Xt(a,c>>>0<d>>>0?d:c);c=k[x>>2]|0;d=c+-1|0;if(!(d&c)){h=c;c=d&z;break;}else{h=c;c=(z>>>0)%(c>>>0)|0;break;}}while(0);d=k[(k[a>>2]|0)+(c<<2)>>2]|0;if(!d){e=a+8|0;k[k[A>>2]>>2]=k[e>>2];k[e>>2]=k[A>>2];k[(k[a>>2]|0)+(c<<2)>>2]=e;e=k[A>>2]|0;c=k[e>>2]|0;if(!c)c=A;else{c=k[c+4>>2]|0;d=h+-1|0;if(!(d&h))c=c&d;else c=(c>>>0)%(h>>>0)|0;k[(k[a>>2]|0)+(c<<2)>>2]=e;c=A;}}else{k[k[A>>2]>>2]=k[d>>2];k[d>>2]=k[A>>2];c=A;}C=k[c>>2]|0;k[j>>2]=(k[j>>2]|0)+1;k[c>>2]=0;c=C;}u=B;return c+20|0;}function Vt(a,b){a=a|0;b=b|0;var c=0,d=0;a=u;u=u+16|0;c=i[b+11>>0]|0;d=c<<24>>24<0;b=_t(a,d?k[b>>2]|0:b,d?k[b+4>>2]|0:c&255)|0;u=a;return b|0;}function Wt(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;d=rN(28)|0;k[a>>2]=d;k[a+4>>2]=b+8;f=a+8|0;i[f>>0]=0;AN(d+8|0,k[e>>2]|0);k[d+20>>2]=0;k[d+24>>2]=0;i[f>>0]=1;f=k[a>>2]|0;k[f+4>>2]=c;k[f>>2]=0;return;}function Xt(a,b){a=a|0;b=b|0;var c=0,d=0;if((b|0)!=1){if(b+-1&b)b=hN(b)|0;}else b=2;d=k[a+4>>2]|0;if(b>>>0<=d>>>0){if(b>>>0<d>>>0){c=~~+_(+(+((k[a+12>>2]|0)>>>0)/+o[a+16>>2]))>>>0;if(d>>>0>2&(d+-1&d|0)==0)c=1<<32-(ca(c+-1|0)|0);else c=hN(c)|0;b=b>>>0<c>>>0?c:b;if(b>>>0<d>>>0)Zt(a,b);}}else Zt(a,b);return;}function Yt(a){a=a|0;Tt(a+12|0);CN(a);return;}function Zt(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;d=a+4|0;a:do if(b){if(b>>>0>1073741823){a=rc(4)|0;GO(a);Ld(a|0,2912,370);}t=rN(b<<2)|0;c=k[a>>2]|0;k[a>>2]=t;if(c|0)vN(c);k[d>>2]=b;c=0;while(1){if((c|0)==(b|0))break;k[(k[a>>2]|0)+(c<<2)>>2]=0;c=c+1|0;}e=a+8|0;c=k[e>>2]|0;if(c|0){d=k[c+4>>2]|0;s=b+-1|0;t=(s&b|0)==0;if(t)d=d&s;else d=(d>>>0)%(b>>>0)|0;k[(k[a>>2]|0)+(d<<2)>>2]=e;while(1){r=c;b:while(1)while(1){c=k[r>>2]|0;if(!c)break a;e=k[c+4>>2]|0;if(t)q=e&s;else q=(e>>>0)%(b>>>0)|0;if((q|0)==(d|0)){r=c;continue b;}e=(k[a>>2]|0)+(q<<2)|0;if(!(k[e>>2]|0))break b;m=c+8|0;n=m+11|0;o=c+12|0;p=c;c:while(1){e=k[p>>2]|0;if(!e){f=34;break;}f=e+8|0;h=i[n>>0]|0;j=h<<24>>24<0;h=h&255;l=j?k[o>>2]|0:h;u=i[f+11>>0]|0;g=u<<24>>24<0;if((l|0)!=((g?k[e+12>>2]|0:u&255)|0)){f=34;break;}f=g?k[f>>2]|0:f;if(j){if(Vn(k[m>>2]|0,f,l)|0){f=31;break;}p=k[p>>2]|0;continue;}else g=m;while(1){if(!h){p=e;continue c;}if((i[g>>0]|0)!=(i[f>>0]|0)){f=33;break c;}h=h+-1|0;f=f+1|0;g=g+1|0;}}if((f|0)==31)e=k[p>>2]|0;k[r>>2]=e;k[p>>2]=k[k[(k[a>>2]|0)+(q<<2)>>2]>>2];k[k[(k[a>>2]|0)+(q<<2)>>2]>>2]=c;}k[e>>2]=r;d=q;}}}else{c=k[a>>2]|0;k[a>>2]=0;if(c|0)vN(c);k[d>>2]=0;}while(0);return;}function _t(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;e=c+~(c>>>0<3?c:3)+4&-4;f=b+e|0;d=c;a=c;while(1){if(d>>>0<=3)break;h=$(l[b>>0]|l[b+1>>0]<<8|l[b+2>>0]<<16|l[b+3>>0]<<24,1540483477)|0;d=d+-4|0;b=b+4|0;a=($(h>>>24^h,1540483477)|0)^($(a,1540483477)|0);}switch(c-e|0){case 3:{a=(l[f+2>>0]|0)<<16^a;g=6;break;}case 2:{g=6;break;}case 1:{g=7;break;}default:{}}if((g|0)==6){a=(l[f+1>>0]|0)<<8^a;g=7;}if((g|0)==7)a=$((l[f>>0]|0)^a,1540483477)|0;h=$(a>>>13^a,1540483477)|0;return h>>>15^h|0;}function $t(a){a=a|0;var b=0,c=0,d=0;c=a+12|0;if(k[c>>2]|0){d=a+8|0;au(a,k[d>>2]|0);k[d>>2]=0;d=k[a+4>>2]|0;b=0;while(1){if((b|0)==(d|0))break;k[(k[a>>2]|0)+(b<<2)>>2]=0;b=b+1|0;}k[c>>2]=0;}return;}function au(a,b){a=a|0;b=b|0;while(1){if(!b)break;a=k[b>>2]|0;Yt(b+8|0);vN(b);b=a;}return;}function bu(a){a=a|0;var b=0;au(a,k[a+8>>2]|0);b=k[a>>2]|0;k[a>>2]=0;if(b|0)vN(b);return;}function cu(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+32|0;d=c+16|0;e=c;Uu(d,b,17350,35633);Uu(e,b,17714,35632);Mu(a,b,d,e);Wu(e);Wu(d);du(a+48|0,k[a>>2]|0,b,23593);du(a+64|0,k[a>>2]|0,b,19724);du(a+80|0,k[a>>2]|0,b,19735);du(a+96|0,k[a>>2]|0,b,19745);du(a+112|0,k[a>>2]|0,b,19749);eu(a+128|0,k[a>>2]|0,b,24417);eu(a+144|0,k[a>>2]|0,b,24426);u=c;return;}function du(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a>>2]=b;k[a+4>>2]=k[c>>2];b=k[c+4>>2]|0;k[a+8>>2]=b;if(b|0)mN(b);k[a+12>>2]=d;return;}function eu(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a>>2]=b;k[a+4>>2]=k[c>>2];b=k[c+4>>2]|0;k[a+8>>2]=b;if(b|0)mN(b);k[a+12>>2]=d;return;}function fu(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+32|0;d=c+16|0;e=c;Uu(d,b,19761,35633);Uu(e,b,21736,35632);Mu(a,b,d,e);Wu(e);Wu(d);du(a+48|0,k[a>>2]|0,b,24413);du(a+64|0,k[a>>2]|0,b,23953);eu(a+80|0,k[a>>2]|0,b,24417);gu(a+96|0,k[a>>2]|0,b,19971);u=c;return;}function gu(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a>>2]=b;k[a+4>>2]=k[c>>2];b=k[c+4>>2]|0;k[a+8>>2]=b;if(b|0)mN(b);k[a+12>>2]=d;return;}function hu(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+32|0;d=c+16|0;e=c;Uu(d,b,19977,35633);Uu(e,b,21736,35632);Mu(a,b,d,e);Wu(e);Wu(d);du(a+48|0,k[a>>2]|0,b,24413);du(a+64|0,k[a>>2]|0,b,21943);du(a+80|0,k[a>>2]|0,b,21946);du(a+96|0,k[a>>2]|0,b,21949);du(a+112|0,k[a>>2]|0,b,20871);du(a+128|0,k[a>>2]|0,b,22782);du(a+144|0,k[a>>2]|0,b,21952);du(a+160|0,k[a>>2]|0,b,21968);du(a+176|0,k[a>>2]|0,b,23953);gu(a+192|0,k[a>>2]|0,b,21982);gu(a+208|0,k[a>>2]|0,b,21984);gu(a+224|0,k[a>>2]|0,b,22001);u=c;return;}function iu(a){a=a|0;var b=0,c=0;k[a>>2]=6084;k[a+4>>2]=6140;c=a+44|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){Gu(b);vN(b);}c=a+40|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){Fu(b);vN(b);}c=a+36|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){Eu(b);vN(b);}c=a+32|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){Du(b);vN(b);}c=a+28|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){Cu(b);vN(b);}c=a+24|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){Bu(b);vN(b);}c=a+20|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){Au(b);vN(b);}c=a+16|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){zu(b);vN(b);}ct(a+8|0);return;}function ju(a){a=a|0;iu(a);vN(a);return;}function ku(a){a=a|0;return k[a+16>>2]|0;}function lu(a){a=a|0;return k[a+20>>2]|0;}function mu(a){a=a|0;return k[a+24>>2]|0;}function nu(a){a=a|0;return k[a+28>>2]|0;}function ou(a){a=a|0;return k[a+32>>2]|0;}function pu(a){a=a|0;return k[a+36>>2]|0;}function qu(a){a=a|0;return k[a+40>>2]|0;}function ru(a){a=a|0;return k[a+44>>2]|0;}function su(a){a=a|0;yu(a);return;}function tu(a,b,c){a=a|0;b=b|0;c=c|0;Ju(a);return Ku(a)|0;}function uu(a){a=a|0;iu(a+-4|0);return;}function vu(a){a=a|0;ju(a+-4|0);return;}function wu(a){a=a|0;yu(a+-4|0);return;}function xu(a,b,c){a=a|0;b=b|0;c=c|0;return tu(a+-4|0,0,0)|0;}function yu(a){a=a|0;var b=0,c=0;c=a+16|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){zu(b);vN(b);}c=a+20|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){Au(b);vN(b);}c=a+24|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){Bu(b);vN(b);}c=a+28|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){Cu(b);vN(b);}c=a+32|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){Du(b);vN(b);}c=a+36|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){Eu(b);vN(b);}c=a+40|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){Fu(b);vN(b);}c=a+44|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){Gu(b);vN(b);}return;}function zu(a){a=a|0;ct(a+84|0);ct(a+68|0);ct(a+52|0);Ou(a);return;}function Au(a){a=a|0;ct(a+148|0);ct(a+132|0);ct(a+116|0);ct(a+100|0);ct(a+84|0);ct(a+68|0);ct(a+52|0);Ou(a);return;}function Bu(a){a=a|0;ct(a+100|0);ct(a+84|0);ct(a+68|0);ct(a+52|0);Ou(a);return;}function Cu(a){a=a|0;k[a>>2]=6164;ct(a+136|0);ct(a+120|0);ct(a+104|0);ct(a+88|0);ct(a+72|0);ct(a+56|0);Ou(a+4|0);return;}function Du(a){a=a|0;ct(a+212|0);ct(a+196|0);ct(a+180|0);ct(a+164|0);ct(a+148|0);ct(a+132|0);ct(a+116|0);ct(a+100|0);ct(a+84|0);ct(a+68|0);ct(a+52|0);Ou(a);return;}function Eu(a){a=a|0;ct(a+148|0);ct(a+132|0);ct(a+116|0);ct(a+100|0);ct(a+84|0);ct(a+68|0);ct(a+52|0);Ou(a);return;}function Fu(a){a=a|0;ct(a+228|0);ct(a+212|0);ct(a+196|0);ct(a+180|0);ct(a+164|0);ct(a+148|0);ct(a+132|0);ct(a+116|0);ct(a+100|0);ct(a+84|0);ct(a+68|0);ct(a+52|0);Ou(a);return;}function Gu(a){a=a|0;ct(a+100|0);ct(a+84|0);ct(a+68|0);ct(a+52|0);Ou(a);return;}function Hu(a){a=a|0;Iu(a+132|0);return;}function Iu(a){a=a|0;var b=0;b=k[a+4>>2]|0;b=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;a=$d[k[(k[b>>2]|0)+140>>2]&63](b,k[a>>2]|0,k[a+12>>2]|0)|0;Xd[k[(k[b>>2]|0)+100>>2]&255](b,a);return;}function Ju(a){a=a|0;var b=0,c=0,d=0;b=sN(96,40063)|0;if(!b)b=0;else bv(b,a+8|0);d=a+16|0;c=k[d>>2]|0;k[d>>2]=b;if(c|0){zu(c);vN(c);}b=sN(160,40063)|0;if(!b)b=0;else cu(b,a+8|0);d=a+20|0;c=k[d>>2]|0;k[d>>2]=b;if(c|0){Au(c);vN(c);}b=sN(112,40063)|0;if(!b)b=0;else fu(b,a+8|0);d=a+24|0;c=k[d>>2]|0;k[d>>2]=b;if(c|0){Bu(c);vN(c);}b=sN(148,40063)|0;if(!b)b=0;else Su(b,a+8|0);d=a+28|0;c=k[d>>2]|0;k[d>>2]=b;if(c|0){Cu(c);vN(c);}b=sN(224,40063)|0;if(!b)b=0;else Ru(b,a+8|0);d=a+32|0;c=k[d>>2]|0;k[d>>2]=b;if(c|0){Du(c);vN(c);}b=sN(160,40063)|0;if(!b)b=0;else Tu(b,a+8|0);d=a+36|0;c=k[d>>2]|0;k[d>>2]=b;if(c|0){Eu(c);vN(c);}b=sN(240,40063)|0;if(!b)b=0;else hu(b,a+8|0);d=a+40|0;c=k[d>>2]|0;k[d>>2]=b;if(c|0){Fu(c);vN(c);}b=sN(112,40063)|0;if(!b)b=0;else av(b,a+8|0);d=a+44|0;c=k[d>>2]|0;k[d>>2]=b;if(c|0){Gu(c);vN(c);}return;}function Ku(a){a=a|0;var b=0,c=0,d=0;d=u;u=u+32|0;c=d;if(!(k[a+8>>2]|0))a=0;else{k[c>>2]=k[a+16>>2];k[c+4>>2]=k[a+20>>2];k[c+8>>2]=k[a+24>>2];b=k[a+28>>2]|0;k[c+12>>2]=(b|0)==0?0:b+4|0;k[c+16>>2]=k[a+32>>2];k[c+20>>2]=k[a+36>>2];k[c+24>>2]=k[a+40>>2];k[c+28>>2]=k[a+44>>2];a=0;while(1){if((a|0)>=8){a=1;break;}b=k[c+(a<<2)>>2]|0;if(!b){a=0;break;}if(Pu(b)|0)a=a+1|0;else{a=0;break;}}}u=d;return a|0;}function Lu(a,b){a=a|0;b=b|0;var c=0,d=0;k[a>>2]=6084;k[a+4>>2]=6140;d=a+8|0;c=k[b>>2]|0;k[d>>2]=c;b=k[b+4>>2]|0;k[a+12>>2]=b;if(b){mN(b);c=k[d>>2]|0;}d=a+16|0;k[d>>2]=0;k[d+4>>2]=0;k[d+8>>2]=0;k[d+12>>2]=0;k[d+16>>2]=0;k[d+20>>2]=0;k[d+24>>2]=0;k[d+28>>2]=0;if(c|0)Ju(a);return;}function Mu(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;k[a>>2]=0;f=a+4|0;k[f>>2]=k[b>>2];b=k[b+4>>2]|0;k[a+8>>2]=b;if(b|0)mN(b);e=a+12|0;Yu(e,c);b=a+28|0;Yu(b,d);i[a+44>>0]=0;if((k[f>>2]|0?_u(e)|0:0)?_u(b)|0:0)Nu(a);return;}function Nu(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0;g=u;u=u+272|0;c=g;e=g+8|0;f=k[a+4>>2]|0;f=Zd[k[(k[f>>2]|0)+8>>2]&255](f)|0;b=Zd[k[(k[f>>2]|0)+60>>2]&255](f)|0;k[a>>2]=b;if(b|0){j=k[(k[f>>2]|0)+16>>2]|0;d=a+12|0;l=$u(d)|0;ne[j&63](f,b,l);l=k[(k[f>>2]|0)+16>>2]|0;j=k[a>>2]|0;b=a+28|0;h=$u(b)|0;ne[l&63](f,j,h);Xd[k[(k[f>>2]|0)+176>>2]&255](f,k[a>>2]|0);re[k[(k[f>>2]|0)+156>>2]&31](f,k[a>>2]|0,35714,c);if(!(k[c>>2]|0)){l=k[(k[f>>2]|0)+92>>2]|0;j=k[a>>2]|0;h=$u(d)|0;ne[l&63](f,j,h);h=k[(k[f>>2]|0)+92>>2]|0;j=k[a>>2]|0;l=$u(b)|0;ne[h&63](f,j,l);Ud[k[(k[f>>2]|0)+152>>2]&31](f,k[a>>2]|0,256,0,e);}else i[a+44>>0]=1;}u=g;return;}function Ou(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;if(!(i[a+44>>0]|0))b=a;else{d=a+4|0;b=k[d>>2]|0;b=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;f=k[(k[b>>2]|0)+92>>2]|0;c=k[a>>2]|0;e=$u(a+12|0)|0;ne[f&63](b,c,e);d=k[d>>2]|0;d=Zd[k[(k[d>>2]|0)+8>>2]&255](d)|0;e=k[(k[d>>2]|0)+92>>2]|0;c=k[a>>2]|0;b=$u(a+28|0)|0;ne[e&63](d,c,b);b=a;}b=k[b>>2]|0;if(b|0){f=k[a+4>>2]|0;Xd[k[(k[f>>2]|0)+28>>2]&255](f,b);}Wu(a+28|0);Wu(a+12|0);ct(a+4|0);return;}function Pu(a){a=a|0;return(i[a+44>>0]|0)!=0|0;}function Qu(a){a=a|0;var b=0;b=k[a+4>>2]|0;b=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;Xd[k[(k[b>>2]|0)+224>>2]&255](b,k[a>>2]|0);return;}function Ru(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+32|0;d=c+16|0;e=c;Uu(d,b,20981,35633);Uu(e,b,21736,35632);Mu(a,b,d,e);Wu(e);Wu(d);du(a+48|0,k[a>>2]|0,b,24413);du(a+64|0,k[a>>2]|0,b,21943);du(a+80|0,k[a>>2]|0,b,21946);du(a+96|0,k[a>>2]|0,b,21949);du(a+112|0,k[a>>2]|0,b,22782);du(a+128|0,k[a>>2]|0,b,21952);du(a+144|0,k[a>>2]|0,b,21968);du(a+160|0,k[a>>2]|0,b,23953);gu(a+176|0,k[a>>2]|0,b,21982);gu(a+192|0,k[a>>2]|0,b,21984);gu(a+208|0,k[a>>2]|0,b,22001);u=c;return;}function Su(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=u;u=u+32|0;e=c+16|0;f=c;d=a+4|0;Uu(e,b,22008,35633);Uu(f,b,22268,35632);Mu(d,b,e,f);Wu(f);Wu(e);k[a>>2]=6164;du(a+52|0,k[d>>2]|0,b,24413);du(a+68|0,k[d>>2]|0,b,22782);du(a+84|0,k[d>>2]|0,b,22792);du(a+100|0,k[d>>2]|0,b,23953);du(a+116|0,k[d>>2]|0,b,22799);eu(a+132|0,k[d>>2]|0,b,24417);u=c;return;}function Tu(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+32|0;d=c+16|0;e=c;Uu(d,b,22806,35633);Uu(e,b,23142,35632);Mu(a,b,d,e);Wu(e);Wu(d);du(a+48|0,k[a>>2]|0,b,23593);du(a+64|0,k[a>>2]|0,b,23604);du(a+80|0,k[a>>2]|0,b,23611);du(a+96|0,k[a>>2]|0,b,23618);du(a+112|0,k[a>>2]|0,b,23628);eu(a+128|0,k[a>>2]|0,b,24417);eu(a+144|0,k[a>>2]|0,b,23638);u=c;return;}function Uu(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=k[b>>2]|0;k[a>>2]=e;b=k[b+4>>2]|0;k[a+4>>2]=b;if(b){mN(b);e=k[a>>2]|0;}k[a+8>>2]=0;i[a+12>>0]=0;if(!((c|0)==0|(e|0)==0))Vu(a,c,d);return;}function Vu(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;h=u;u=u+272|0;e=h;f=h+4|0;g=h+8|0;k[e>>2]=b;d=k[a>>2]|0;d=Zd[k[(k[d>>2]|0)+8>>2]&255](d)|0;b=je[k[(k[d>>2]|0)+64>>2]&127](d,c)|0;c=a+8|0;k[c>>2]=b;if(b|0){Ud[k[(k[d>>2]|0)+192>>2]&31](d,b,1,e,0);Xd[k[(k[d>>2]|0)+56>>2]&255](d,k[c>>2]|0);re[k[(k[d>>2]|0)+164>>2]&31](d,k[c>>2]|0,35713,f);if(!(k[f>>2]|0))Ud[k[(k[d>>2]|0)+160>>2]&31](d,k[c>>2]|0,256,0,g);else i[a+12>>0]=1;}u=h;return;}function Wu(a){a=a|0;Xu(a);ct(a);return;}function Xu(a){a=a|0;var b=0,c=0;b=k[a+8>>2]|0;if(b|0?(c=k[a>>2]|0,c|0):0)Xd[k[(k[c>>2]|0)+36>>2]&255](c,b);return;}function Yu(a,b){a=a|0;b=b|0;k[a>>2]=0;k[a+4>>2]=0;Zu(a,b);return;}function Zu(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;c=u;u=u+16|0;d=c;f=b+8|0;k[a+8>>2]=k[f>>2];k[f>>2]=0;f=b+12|0;i[a+12>>0]=i[f>>0]|0;i[f>>0]=0;f=k[b>>2]|0;g=b+4|0;e=k[g>>2]|0;k[b>>2]=0;k[g>>2]=0;k[d>>2]=k[a>>2];k[a>>2]=f;b=a+4|0;k[d+4>>2]=k[b>>2];k[b>>2]=e;ct(d);u=c;return;}function _u(a){a=a|0;return(i[a+12>>0]|0)!=0|0;}function $u(a){a=a|0;return k[a+8>>2]|0;}function av(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+32|0;d=c+16|0;e=c;Uu(d,b,23959,35633);Uu(e,b,23649,35632);Mu(a,b,d,e);Wu(e);Wu(d);du(a+48|0,k[a>>2]|0,b,24413);du(a+64|0,k[a>>2]|0,b,23953);eu(a+80|0,k[a>>2]|0,b,24417);eu(a+96|0,k[a>>2]|0,b,24426);u=c;return;}function bv(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+32|0;d=c+16|0;e=c;Uu(d,b,23959,35633);Uu(e,b,24199,35632);Mu(a,b,d,e);Wu(e);Wu(d);du(a+48|0,k[a>>2]|0,b,24413);eu(a+64|0,k[a>>2]|0,b,24417);eu(a+80|0,k[a>>2]|0,b,24426);u=c;return;}function cv(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;k[a>>2]=k[b>>2];d=k[b+4>>2]|0;k[a+4>>2]=d;if(d|0)mN(d);k[a+8>>2]=k[c>>2];c=k[c+4>>2]|0;k[a+12>>2]=c;if(c|0)mN(c);dv(a+16|0,b);dv(a+32|0,b);ev(a+48|0,b);ev(a+64|0,b);return;}function dv(a,b){a=a|0;b=b|0;var c=0;c=k[b>>2]|0;k[a>>2]=c;b=k[b+4>>2]|0;k[a+4>>2]=b;if(b){mN(b);c=k[a>>2]|0;}i[a+14>>0]=0;if(c|0)jv(a);return;}function ev(a,b){a=a|0;b=b|0;var c=0;c=k[b>>2]|0;k[a>>2]=c;b=k[b+4>>2]|0;k[a+4>>2]=b;if(b){mN(b);c=k[a>>2]|0;}i[a+14>>0]=0;if(c|0)iv(a);return;}function fv(a){a=a|0;var b=0,c=0;b=k[a>>2]|0;if(b|0?(c=j[a+12>>1]|0,c<<16>>16==(Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0)<<16>>16):0){c=k[a>>2]|0;Xd[k[(k[c>>2]|0)+20>>2]&255](c,k[a+8>>2]|0);}ct(a);return;}function gv(a){a=a|0;var b=0,c=0;b=k[a>>2]|0;if(b|0?(c=j[a+12>>1]|0,c<<16>>16==(Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0)<<16>>16):0){c=k[a>>2]|0;Xd[k[(k[c>>2]|0)+20>>2]&255](c,k[a+8>>2]|0);}ct(a);return;}function hv(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function iv(a){a=a|0;var b=0;b=k[a>>2]|0;b=Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0;j[a+12>>1]=b;b=k[a>>2]|0;b=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;ne[k[(k[b>>2]|0)+124>>2]&63](b,1,a+8|0);return;}function jv(a){a=a|0;var b=0;b=k[a>>2]|0;b=Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0;j[a+12>>1]=b;b=k[a>>2]|0;b=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;ne[k[(k[b>>2]|0)+124>>2]&63](b,1,a+8|0);return;}function kv(a){a=a|0;if(!(k[a>>2]|0))return 0;else return(k[a+8>>2]|0)!=0|0;return 0;}function lv(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;var f=0.0,g=0.0;e=e*.699999988079071;o[a>>2]=e/6.0;o[a+4>>2]=e*1.5;o[a+8>>2]=e*2.5;o[a+12>>2]=e/5.0;f=e*6.099999904632568;o[a+16>>2]=f;o[a+20>>2]=e*1.2999999523162842;o[a+24>>2]=e/3.0;o[a+28>>2]=e*.25;g=+ys(c,d);f=e*8.0+f;e=g/f;if(e>1.0){e=+Q(+e,.30000001192092896);f=g/e;}o[a+36>>2]=e;o[a+32>>2]=f;return;}function mv(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0.0,g=0,h=0,j=0.0,m=0,n=0,p=0,q=0,r=0,s=0,t=0,v=0;v=u;u=u+304|0;m=v+256|0;n=v+192|0;p=v+128|0;q=v+64|0;r=v;g=c+28|0;h=c+36|0;if(Qs(g,h)|0)a=0;else{lv(m,0,g,h,+o[c+20>>2]);j=+o[m+36>>2];f=1.0/+ee[k[(k[b>>2]|0)+20>>2]&3](b)/j;f=f<.20000000298023224?.20000000298023224:f;s=n;t=s+48|0;do{k[s>>2]=0;s=s+4|0;}while((s|0)<(t|0));if(nv(a)|0?ov(a,m,f,n)|0:0){pv(p,g,h,j,d);Ud[k[(k[e>>2]|0)+8>>2]&31](e,770,771,1,1);if(i[c+24>>0]|0){Js(r,0.0,-1.0);Gs(q,r,p);qv(a,6168,q,b,f,n);}o[q>>2]=+(l[c+16>>0]|0)/255.0;o[q+4>>2]=+(l[c+17>>0]|0)/255.0;o[q+8>>2]=+(l[c+18>>0]|0)/255.0;o[q+12>>2]=1.0;qv(a,q,p,b,f,n);a=1;}else a=0;}u=v;return a|0;}function nv(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;f=u;u=u+80|0;e=f;a=a+16|0;if(Gv(a)|0)a=1;else{b=e;c=24468;d=b+78|0;do{i[b>>0]=i[c>>0]|0;b=b+1|0;c=c+1|0;}while((b|0)<(d|0));a=Hv(a,78,e,35044)|0;}u=f;return a|0;}function ov(a,b,c,d){a=a|0;b=b|0;c=+c;d=d|0;var e=0,f=0,g=0,h=0,i=0.0,j=0,l=0,m=0,n=0.0,p=0,q=0,r=0,t=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0.0,I=0.0,J=0.0,K=0.0,L=0,M=0.0,N=0,O=0.0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0.0,W=0.0,X=0.0,Y=0.0,Z=0.0,_=0.0,$=0.0,aa=0.0,ba=0.0,ca=0.0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0;v=u;u=u+688|0;R=v+584|0;x=v+528|0;w=v+96|0;g=v+680|0;h=v+88|0;oa=v+80|0;fa=v+72|0;S=v+64|0;z=v+56|0;j=v+672|0;r=v+664|0;l=v+656|0;e=v+648|0;f=v+640|0;da=v;ba=+o[b+32>>2];ca=+o[b+16>>2];W=ba-ca;I=+o[b>>2];V=+o[b+4>>2];o[oa>>2]=-(W*I)/(V-I);o[oa+4>>2]=0.0;o[fa>>2]=W;o[fa+4>>2]=V;I=W-+o[b+20>>2];H=V+ +o[b+8>>2];o[S>>2]=I;o[S+4>>2]=H;p=b+12|0;n=+o[p>>2];o[z>>2]=ba+ca*n/(H-n);o[z+4>>2]=0.0;zs(j,oa,fa);P=j+4|0;n=-+o[P>>2];k[r>>2]=k[j>>2];o[r+4>>2]=n;zs(l,fa,S);zs(e,S,z);n=-+o[e+4>>2];k[f>>2]=k[e>>2];o[f+4>>2]=n;Av(da,j,r,oa,+o[b>>2],c);r=da;q=k[r>>2]|0;r=k[r+4>>2]|0;ja=da+16|0;ka=k[ja>>2]|0;ja=k[ja+4>>2]|0;la=da+24|0;ma=k[la>>2]|0;la=k[la+4>>2]|0;ha=da+32|0;ia=k[ha>>2]|0;ha=k[ha+4>>2]|0;da=da+40|0;ga=k[da>>2]|0;da=k[da+4>>2]|0;t=b+28|0;n=+o[t>>2];Bv(R,j,fa,l);Bv(x,l,fa,j);m=R+4|0;ca=+o[P>>2]+n*+o[m>>2];o[w>>2]=+o[j>>2]+n*+o[R>>2];o[w+4>>2]=ca;j=x+4|0;ca=+o[l+4>>2]+n*+o[j>>2];o[g>>2]=+o[l>>2]+n*+o[x>>2];o[g+4>>2]=ca;Cv(h,w,R,g,x);g=k[h>>2]|0;h=k[h+4>>2]|0;ca=+o[R>>2];ba=+o[m>>2];_=+o[x>>2];Z=+o[j>>2];O=(k[s>>2]=g,+o[s>>2]);aa=O-n*ca;i=(k[s>>2]=h,+o[s>>2]);$=i-n*ba;Y=O-n*_;X=i-n*Z;n=n-c;ca=O-n*ca;ba=i-n*ba;_=O-n*_;Z=i-n*Z;i=-i;j=b+24|0;Av(R,l,e,S,+o[j>>2],c);l=k[R>>2]|0;m=k[R+4>>2]|0;n=-(k[s>>2]=m,+o[s>>2]);P=k[R+16>>2]|0;U=k[R+20>>2]|0;N=k[R+24>>2]|0;T=k[R+28>>2]|0;O=-(k[s>>2]=U,+o[s>>2]);M=-(k[s>>2]=T,+o[s>>2]);L=k[R+32>>2]|0;Q=k[R+36>>2]|0;y=k[R+40>>2]|0;R=k[R+44>>2]|0;K=-(k[s>>2]=Q,+o[s>>2]);J=-(k[s>>2]=R,+o[s>>2]);Av(x,e,f,z,+o[p>>2],c);f=x;e=k[f>>2]|0;f=k[f+4>>2]|0;F=x+16|0;G=k[F>>2]|0;F=k[F+4>>2]|0;D=x+24|0;E=k[D>>2]|0;D=k[D+4>>2]|0;B=x+32|0;C=k[B>>2]|0;B=k[B+4>>2]|0;x=x+40|0;A=k[x>>2]|0;x=k[x+4>>2]|0;na=k[oa+4>>2]|0;ea=w;k[ea>>2]=k[oa>>2];k[ea+4>>2]=na;o[w+8>>2]=0.0;ea=w+12|0;k[ea>>2]=ma;k[ea+4>>2]=la;o[w+20>>2]=0.0;ea=w+24|0;k[ea>>2]=ka;k[ea+4>>2]=ja;o[w+32>>2]=1.0;ea=w+36|0;k[ea>>2]=q;k[ea+4>>2]=r;o[w+44>>2]=1.0;ea=w+48|0;k[ea>>2]=ia;k[ea+4>>2]=ha;o[w+56>>2]=1.0;ea=w+60|0;k[ea>>2]=ga;k[ea+4>>2]=da;o[w+68>>2]=0.0;k[w+72>>2]=g;k[w+76>>2]=h;o[w+80>>2]=0.0;o[w+84>>2]=ca;o[w+88>>2]=ba;o[w+92>>2]=0.0;o[w+96>>2]=aa;o[w+100>>2]=$;o[w+104>>2]=1.0;o[w+108>>2]=_;o[w+112>>2]=Z;o[w+116>>2]=0.0;o[w+120>>2]=Y;o[w+124>>2]=X;o[w+128>>2]=1.0;ea=k[fa+4>>2]|0;da=w+132|0;k[da>>2]=k[fa>>2];k[da+4>>2]=ea;o[w+140>>2]=1.0;k[w+144>>2]=g;o[w+148>>2]=i;o[w+152>>2]=0.0;o[w+156>>2]=ca;o[w+160>>2]=-ba;o[w+164>>2]=0.0;o[w+168>>2]=aa;o[w+172>>2]=-$;o[w+176>>2]=1.0;o[w+180>>2]=_;o[w+184>>2]=-Z;o[w+188>>2]=0.0;o[w+192>>2]=Y;o[w+196>>2]=-X;o[w+200>>2]=1.0;o[w+204>>2]=W;o[w+208>>2]=-V;o[w+212>>2]=1.0;k[w+216>>2]=l;k[w+220>>2]=m;o[w+224>>2]=1.0;k[w+228>>2]=P;k[w+232>>2]=U;o[w+236>>2]=1.0;k[w+240>>2]=N;k[w+244>>2]=T;o[w+248>>2]=0.0;k[w+252>>2]=L;k[w+256>>2]=Q;o[w+260>>2]=1.0;k[w+264>>2]=y;k[w+268>>2]=R;o[w+272>>2]=0.0;R=k[S+4>>2]|0;Q=w+276|0;k[Q>>2]=k[S>>2];k[Q+4>>2]=R;o[w+284>>2]=0.0;k[w+288>>2]=l;o[w+292>>2]=n;o[w+296>>2]=1.0;k[w+300>>2]=P;o[w+304>>2]=O;o[w+308>>2]=1.0;k[w+312>>2]=N;o[w+316>>2]=M;o[w+320>>2]=0.0;k[w+324>>2]=L;o[w+328>>2]=K;o[w+332>>2]=1.0;k[w+336>>2]=y;o[w+340>>2]=J;o[w+344>>2]=0.0;o[w+348>>2]=I;o[w+352>>2]=-H;o[w+356>>2]=0.0;y=w+360|0;k[y>>2]=e;k[y+4>>2]=f;o[w+368>>2]=1.0;y=w+372|0;k[y>>2]=G;k[y+4>>2]=F;o[w+380>>2]=1.0;y=w+384|0;k[y>>2]=E;k[y+4>>2]=D;o[w+392>>2]=0.0;y=w+396|0;k[y>>2]=C;k[y+4>>2]=B;o[w+404>>2]=1.0;y=w+408|0;k[y>>2]=A;k[y+4>>2]=x;o[w+416>>2]=0.0;y=k[z+4>>2]|0;x=w+420|0;k[x>>2]=k[z>>2];k[x+4>>2]=y;o[w+428>>2]=0.0;if(Dv(a+48|0,432,w,35044)|0){oa=d;k[oa>>2]=q;k[oa+4>>2]=r;oa=d+8|0;k[oa>>2]=e;k[oa+4>>2]=f;k[d+16>>2]=l;k[d+20>>2]=m;k[d+32>>2]=l;o[d+36>>2]=n;k[d+24>>2]=g;k[d+28>>2]=h;k[d+40>>2]=g;o[d+44>>2]=i;k[d+48>>2]=k[b>>2];k[d+52>>2]=k[p>>2];k[d+56>>2]=k[j>>2];k[d+60>>2]=k[t>>2];e=1;}else e=0;u=v;return e|0;}function pv(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;var f=0.0,g=0.0,h=0.0,i=0.0,j=0,k=0,l=0,m=0,n=0;n=u;u=u+256|0;j=n+192|0;k=n+128|0;l=n+64|0;m=n;i=+o[b>>2];g=+o[c>>2]-i;h=+o[b+4>>2];f=+o[c+4>>2]-h;if(+O(+g)<9.99999993922529e-09){if(+O(+f)<9.99999993922529e-09)f=0.0;else f=f>0.0?1.570796251296997:-1.570796251296997;}else f=+X(+f,+g);Js(k,i+ +o[e>>2]+-1.0,h+ +o[e+4>>2]+-1.0);Ls(l,f,0.0,0.0);Gs(j,k,l);Ks(m,d,d);Gs(a,j,m);u=n;return;}function qv(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;f=f|0;var g=0,h=0,i=0,j=0,l=0,m=0;g=u;u=u+128|0;i=g+64|0;l=g;h=k[a>>2]|0;h=Zd[k[(k[h>>2]|0)+8>>2]&255](h)|0;a=a+8|0;j=k[a>>2]|0;j=Zd[k[(k[j>>2]|0)+16>>2]&255](j)|0;a=k[a>>2]|0;a=Zd[k[(k[a>>2]|0)+20>>2]&255](a)|0;m=Zd[k[(k[d>>2]|0)+8>>2]&255](d)|0;Gs(l,m,Zd[k[(k[d>>2]|0)+12>>2]&255](d)|0);Gs(i,l,c);Qu(j);rv(j+48|0,i);sv(j+64|0,b);tv(j+80|0,12,0);uv(j+96|0,12,8);Ud[k[(k[h>>2]|0)+104>>2]&31](h,6,18,5121,0);Ud[k[(k[h>>2]|0)+104>>2]&31](h,5,4,5121,18);Ud[k[(k[h>>2]|0)+104>>2]&31](h,5,4,5121,22);Ud[k[(k[h>>2]|0)+104>>2]&31](h,5,4,5121,26);Ud[k[(k[h>>2]|0)+104>>2]&31](h,5,4,5121,30);Ud[k[(k[h>>2]|0)+104>>2]&31](h,5,4,5121,34);Ud[k[(k[h>>2]|0)+104>>2]&31](h,5,4,5121,38);vv(j);Qu(a+4|0);rv(a+52|0,i);i=a+68|0;wv(i,e);c=a+84|0;wv(c,+o[f+48>>2]);sv(a+100|0,b);d=a+116|0;xv(d,f);tv(a+132|0,12,0);Ud[k[(k[h>>2]|0)+104>>2]&31](h,6,6,5121,42);wv(c,+o[f+52>>2]);xv(d,f+8|0);Ud[k[(k[h>>2]|0)+104>>2]&31](h,6,6,5121,48);wv(c,+o[f+56>>2]);xv(d,f+16|0);Ud[k[(k[h>>2]|0)+104>>2]&31](h,6,6,5121,54);xv(d,f+32|0);Ud[k[(k[h>>2]|0)+104>>2]&31](h,6,6,5121,60);wv(i,-e);wv(c,+o[f+60>>2]);xv(d,f+24|0);Ud[k[(k[h>>2]|0)+104>>2]&31](h,6,6,5121,66);xv(d,f+40|0);Ud[k[(k[h>>2]|0)+104>>2]&31](h,6,6,5121,72);Wd[k[k[a>>2]>>2]&511](a);u=g;return;}function rv(a,b){a=a|0;b=b|0;var c=0;c=yv(a)|0;a=k[a+4>>2]|0;a=Zd[k[(k[a>>2]|0)+8>>2]&255](a)|0;Ud[k[(k[a>>2]|0)+220>>2]&31](a,c,1,0,b);return;}function sv(a,b){a=a|0;b=b|0;var c=0;c=yv(a)|0;a=k[a+4>>2]|0;a=Zd[k[(k[a>>2]|0)+8>>2]&255](a)|0;re[k[(k[a>>2]|0)+216>>2]&31](a,c,1,b);return;}function tv(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;d=k[a+4>>2]|0;d=Zd[k[(k[d>>2]|0)+8>>2]&255](d)|0;a=$d[k[(k[d>>2]|0)+140>>2]&63](d,k[a>>2]|0,k[a+12>>2]|0)|0;Xd[k[(k[d>>2]|0)+112>>2]&255](d,a);he[k[(k[d>>2]|0)+228>>2]&3](d,a,2,5126,0,b,0+c|0);return;}function uv(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;d=k[a+4>>2]|0;d=Zd[k[(k[d>>2]|0)+8>>2]&255](d)|0;a=$d[k[(k[d>>2]|0)+140>>2]&63](d,k[a>>2]|0,k[a+12>>2]|0)|0;Xd[k[(k[d>>2]|0)+112>>2]&255](d,a);he[k[(k[d>>2]|0)+228>>2]&3](d,a,1,5126,0,b,0+c|0);return;}function vv(a){a=a|0;Iu(a+80|0);zv(a+96|0);return;}function wv(a,b){a=a|0;b=+b;var c=0;c=yv(a)|0;a=k[a+4>>2]|0;a=Zd[k[(k[a>>2]|0)+8>>2]&255](a)|0;pe[k[(k[a>>2]|0)+208>>2]&7](a,c,b);return;}function xv(a,b){a=a|0;b=b|0;var c=0;c=yv(a)|0;a=k[a+4>>2]|0;a=Zd[k[(k[a>>2]|0)+8>>2]&255](a)|0;re[k[(k[a>>2]|0)+212>>2]&31](a,c,1,b);return;}function yv(a){a=a|0;var b=0;b=k[a+4>>2]|0;b=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;return $d[k[(k[b>>2]|0)+168>>2]&63](b,k[a>>2]|0,k[a+12>>2]|0)|0;}function zv(a){a=a|0;var b=0;b=k[a+4>>2]|0;b=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;a=$d[k[(k[b>>2]|0)+140>>2]&63](b,k[a>>2]|0,k[a+12>>2]|0)|0;Xd[k[(k[b>>2]|0)+100>>2]&255](b,a);return;}function Av(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;f=+f;var g=0,h=0.0,i=0.0,j=0.0,l=0.0,m=0.0,n=0.0,p=0,q=0,r=0,t=0,v=0,w=0,x=0,y=0,z=0;g=u;u=u+48|0;x=g+32|0;t=g+24|0;z=g+16|0;y=g+8|0;p=g;v=a+12+12|0;k[v>>2]=0;k[v+4>>2]=0;k[v+8>>2]=0;k[v+12>>2]=0;k[v+16>>2]=0;k[v+20>>2]=0;k[v+24>>2]=0;Bv(x,b,d,c);Bv(t,c,d,b);v=b+4|0;w=x+4|0;n=+o[v>>2]+ +o[w>>2]*e;o[z>>2]=+o[b>>2]+ +o[x>>2]*e;o[z+4>>2]=n;q=c+4|0;r=t+4|0;n=+o[q>>2]+ +o[r>>2]*e;o[y>>2]=+o[c>>2]+ +o[t>>2]*e;o[y+4>>2]=n;Cv(p,z,x,y,t);d=p;p=k[d>>2]|0;d=k[d+4>>2]|0;y=a;k[y>>2]=p;k[y+4>>2]=d;n=+o[x>>2];m=+o[w>>2];j=+o[v>>2]-m*f;o[a+8>>2]=+o[b>>2]-n*f;o[a+12>>2]=j;j=+o[t>>2];h=+o[r>>2];l=+o[q>>2]-h*f;o[a+48>>2]=+o[c>>2]-j*f;o[a+52>>2]=l;l=(k[s>>2]=p,+o[s>>2]);i=(k[s>>2]=d,+o[s>>2]);o[a+16>>2]=l-n*e;o[a+20>>2]=i-m*e;o[a+32>>2]=l-j*e;o[a+36>>2]=i-h*e;f=e+f;o[a+24>>2]=l-f*n;o[a+28>>2]=i-f*m;o[a+40>>2]=l-f*j;o[a+44>>2]=i-f*h;u=g;return;}function Bv(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0;f=u;u=u+32|0;h=f+16|0;g=f+8|0;e=f;Ns(h,c,b);Cs(g,h);Bs(a,g);Ns(g,d,b);if(+As(a,g)<0.0){Ds(e,a);g=k[e+4>>2]|0;h=a;k[h>>2]=k[e>>2];k[h+4>>2]=g;}u=f;return;}function Cv(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0.0,g=0.0,h=0.0,i=0.0,j=0.0,k=0.0,l=0.0;j=+o[c>>2];k=+o[c+4>>2];g=j*+o[b>>2]+k*+o[b+4>>2];h=+o[e>>2];l=+o[e+4>>2];i=h*+o[d>>2]+l*+o[d+4>>2];f=j*l-k*h;o[a>>2]=(g*l-k*i)/f;o[a+4>>2]=(j*i-h*g)/f;return;}function Dv(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=k[a>>2]|0;if(e){f=j[a+12>>1]|0;if(f<<16>>16!=(Zd[k[(k[e>>2]|0)+12>>2]&255](e)|0)<<16>>16)iv(a);if(Ev(a)|0){f=k[a>>2]|0;f=Zd[k[(k[f>>2]|0)+8>>2]&255](f)|0;Ud[k[(k[f>>2]|0)+40>>2]&31](f,34962,b,c,d);f=Fv(a,24440)|0;i[a+14>>0]=f&1;a=f;}else a=0;}else a=0;return a|0;}function Ev(a){a=a|0;var b=0;b=k[a>>2]|0;b=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;ne[k[(k[b>>2]|0)+20>>2]&63](b,34962,k[a+8>>2]|0);return Fv(a,24454)|0;}function Fv(a,b){a=a|0;b=b|0;var c=0;b=k[a>>2]|0;b=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;b=Zd[k[(k[b>>2]|0)+144>>2]&255](b)|0;c=1;while(1){if(!b)break;b=k[a>>2]|0;b=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;b=Zd[k[(k[b>>2]|0)+144>>2]&255](b)|0;c=0;}return c|0;}function Gv(a){a=a|0;var b=0,c=0;b=k[a>>2]|0;if(((b|0)!=0?(i[a+14>>0]|0)!=0:0)?(c=j[a+12>>1]|0,c<<16>>16==(Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0)<<16>>16):0)a=Iv(a)|0;else a=0;return a|0;}function Hv(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=k[a>>2]|0;if(e){f=j[a+12>>1]|0;if(f<<16>>16!=(Zd[k[(k[e>>2]|0)+12>>2]&255](e)|0)<<16>>16)jv(a);if(Iv(a)|0){f=k[a>>2]|0;f=Zd[k[(k[f>>2]|0)+8>>2]&255](f)|0;Ud[k[(k[f>>2]|0)+40>>2]&31](f,34963,b,c,d);f=Jv(a,24440)|0;i[a+14>>0]=f&1;a=f;}else a=0;}else a=0;return a|0;}function Iv(a){a=a|0;var b=0;b=k[a>>2]|0;b=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;ne[k[(k[b>>2]|0)+20>>2]&63](b,34963,k[a+8>>2]|0);return Jv(a,24454)|0;}function Jv(a,b){a=a|0;b=b|0;var c=0;b=k[a>>2]|0;b=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;b=Zd[k[(k[b>>2]|0)+144>>2]&255](b)|0;c=1;while(1){if(!b)break;b=k[a>>2]|0;b=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;b=Zd[k[(k[b>>2]|0)+144>>2]&255](b)|0;c=0;}return c|0;}function Kv(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,l=0,n=0,p=0,q=0;q=u;u=u+240|0;h=q+192|0;j=q+128|0;l=q+232|0;n=q+64|0;p=q;f=c+28|0;g=c+36|0;if(Qs(f,g)|0)a=0;else{lv(h,0,f,g,+o[c+20>>2]);if(Lv(a)|0?Mv(a,h)|0:0){pv(j,f,g,+o[h+36>>2],d);k[n>>2]=m[e>>1]|m[e+2>>1]<<16;i[n+4>>0]=0;KA(l,n);h=k[a+8>>2]|0;h=Zd[k[(k[h>>2]|0)+16>>2]&255](h)|0;Qu(h);e=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;Gs(p,e,Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0);Gs(n,p,j);rv(h+48|0,n);Nv(n,l);sv(h+64|0,n);tv(h+80|0,12,0);uv(h+96|0,12,8);a=k[a>>2]|0;a=Zd[k[(k[a>>2]|0)+8>>2]&255](a)|0;Ud[k[(k[a>>2]|0)+104>>2]&31](a,6,7,5121,0);vv(h);a=1;}else a=0;}u=q;return a|0;}function Lv(a){a=a|0;var b=0,c=0;c=u;u=u+16|0;b=c;a=a+32|0;if(Gv(a)|0)a=1;else{i[b>>0]=i[24546]|0;i[b+1>>0]=i[24547]|0;i[b+2>>0]=i[24548]|0;i[b+3>>0]=i[24549]|0;i[b+4>>0]=i[24550]|0;i[b+5>>0]=i[24551]|0;i[b+6>>0]=i[24552]|0;a=Hv(a,7,b,35044)|0;}u=c;return a|0;}function Mv(a,b){a=a|0;b=b|0;var c=0,d=0,e=0.0,f=0.0,g=0.0,h=0.0,i=0.0,j=0,l=0.0,m=0.0,n=0.0;c=u;u=u+96|0;d=c;n=+o[b+32>>2];m=+o[b+16>>2];h=n-m;j=k[b>>2]|0;i=-(k[s>>2]=j,+o[s>>2]);g=+o[b+4>>2];f=h-+o[b+20>>2];e=g+ +o[b+8>>2];l=+o[b+12>>2];o[d>>2]=n+m*l/(e-l);k[d+4>>2]=0;o[d+8>>2]=1.0;o[d+12>>2]=f;o[d+16>>2]=e;o[d+20>>2]=1.0;o[d+24>>2]=h;o[d+28>>2]=g;o[d+32>>2]=1.0;k[d+36>>2]=0;k[d+40>>2]=j;o[d+44>>2]=1.0;k[d+48>>2]=0;o[d+52>>2]=i;o[d+56>>2]=1.0;o[d+60>>2]=h;o[d+64>>2]=-g;o[d+68>>2]=1.0;o[d+72>>2]=f;o[d+76>>2]=-e;o[d+80>>2]=1.0;b=Dv(a+64|0,84,d,35044)|0;u=c;return b|0;}function Nv(a,b){a=a|0;b=b|0;Ov(a,+(l[b>>0]|0)/255.0,+(l[b+1>>0]|0)/255.0,+(l[b+2>>0]|0)/255.0,+(l[b+3>>0]|0)/255.0);return;}function Ov(a,b,c,d,e){a=a|0;b=+b;c=+c;d=+d;e=+e;o[a>>2]=b<0.0?0.0:b>1.0?1.0:b;o[a+4>>2]=c<0.0?0.0:c>1.0?1.0:c;o[a+8>>2]=d<0.0?0.0:d>1.0?1.0:d;o[a+12>>2]=e<0.0?0.0:e>1.0?1.0:e;return;}function Pv(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;k[a>>2]=k[b>>2];e=k[b+4>>2]|0;k[a+4>>2]=e;if(e|0)mN(e);k[a+8>>2]=k[c>>2];c=k[c+4>>2]|0;k[a+12>>2]=c;if(c|0)mN(c);k[a+16>>2]=k[d>>2];c=k[d+4>>2]|0;k[a+20>>2]=c;if(c|0)mN(c);ev(a+24|0,b);dv(a+40|0,b);return;}function Qv(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function Rv(a){a=a|0;if(k[a>>2]|0?k[a+8>>2]|0:0)return(k[a+16>>2]|0)!=0|0;return 0;}function Sv(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0,n=0,p=0;n=u;u=u+256|0;m=n+240|0;e=n+224|0;f=n+208|0;l=n+144|0;g=n+80|0;h=n+16|0;i=n;j=c+16|0;p=k[a+16>>2]|0;ne[k[(k[p>>2]|0)+16>>2]&63](m,p,j);c=c+28|0;k[e>>2]=k[c>>2];k[e+4>>2]=k[c+4>>2];k[e+8>>2]=k[c+8>>2];k[e+12>>2]=k[c+12>>2];c=k[m>>2]|0;if(c){if(((!(+O(+(+o[e+8>>2]-+o[e>>2]))<9.99999993922529e-09)?!(+O(+(+o[e+12>>2]-+o[e+4>>2]))<9.99999993922529e-09):0)?(Zd[k[(k[c>>2]|0)+8>>2]&255](c)|0)!=0:0)?(p=k[m>>2]|0,(Zd[k[(k[p>>2]|0)+12>>2]&255](p)|0)!=0):0){p=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;Gs(g,p,Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0);Tv(h,0,k[m>>2]|0,e);Gs(l,g,h);a:do if(Uv(a)|0){Ud[k[(k[d>>2]|0)+8>>2]&31](d,770,771,1,1);c=k[m>>2]|0;c=Zd[k[(k[c>>2]|0)+16>>2]&255](c)|0;b=k[c+4>>2]|0;c=k[c>>2]|0;while(1){if((c|0)==(b|0)){c=1;break a;}d=k[c>>2]|0;if(!d){AN(i,j);CN(i);}else Vv(a,d,l);c=c+8|0;}}else c=0;while(0);}else c=0;}else{AN(f,j);CN(f);c=0;}Tt(m);u=n;return c|0;}function Tv(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0.0,f=0.0,g=0,h=0,i=0;h=u;u=u+128|0;b=h+64|0;g=h;i=d+12|0;Js(a,+o[d>>2],+o[i>>2]);f=+o[d+8>>2]-+o[d>>2];f=f/+((Zd[k[(k[c>>2]|0)+8>>2]&255](c)|0)>>>0);e=+o[i>>2]-+o[d+4>>2];e=e/+((Zd[k[(k[c>>2]|0)+12>>2]&255](c)|0)>>>0);if(!(+O(+(f+-1.0))<9.99999993922529e-09?+O(+(e+-1.0))<9.99999993922529e-09:0)){Ks(g,f,e);Gs(b,a,g);c=a+64|0;do{k[a>>2]=k[b>>2];a=a+4|0;b=b+4|0;}while((a|0)<(c|0));}u=h;return;}function Uv(a){a=a|0;var b=0,c=0;b=u;u=u+16|0;c=b;k[c>>2]=50462976;a=Hv(a+40|0,4,c,35044)|0;u=b;return a|0;}function Vv(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0.0,j=0.0,l=0,m=0.0,n=0,p=0.0;e=u;u=u+64|0;f=e;g=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;m=+(k[g>>2]|0);p=-+(k[g+4>>2]|0);j=m+ +(k[g+8>>2]|0);i=p-+(k[g+12>>2]|0);l=k[g+16>>2]|0;n=k[g+20>>2]|0;h=k[g+24>>2]|0;g=k[g+28>>2]|0;o[f>>2]=m;o[f+4>>2]=p;k[f+8>>2]=l;k[f+12>>2]=n;o[f+16>>2]=j;o[f+20>>2]=p;k[f+24>>2]=h;k[f+28>>2]=n;o[f+32>>2]=m;o[f+36>>2]=i;k[f+40>>2]=l;k[f+44>>2]=g;o[f+48>>2]=j;o[f+52>>2]=i;k[f+56>>2]=h;k[f+60>>2]=g;if(Dv(a+24|0,64,f,35044)|0?(d=k[a+8>>2]|0,d=Zd[k[(k[d>>2]|0)+8>>2]&255](d)|0,Qu(d),Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0):0){rv(d+48|0,c);tv(d+64|0,16,0);tv(d+80|0,16,8);n=k[a>>2]|0;n=Zd[k[(k[n>>2]|0)+8>>2]&255](n)|0;Ud[k[(k[n>>2]|0)+104>>2]&31](n,5,4,5121,0);Wv(d);}u=e;return;}function Wv(a){a=a|0;Iu(a+64|0);Iu(a+80|0);return;}function Xv(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;k[a>>2]=k[b>>2];d=k[b+4>>2]|0;k[a+4>>2]=d;if(d|0)mN(d);k[a+8>>2]=k[c>>2];c=k[c+4>>2]|0;k[a+12>>2]=c;if(c|0)mN(c);dv(a+16|0,b);ev(a+32|0,b);return;}function Yv(a){a=a|0;if(!(k[a>>2]|0))return 0;else return(k[a+8>>2]|0)!=0|0;return 0;}function Zv(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0.0,l=0.0,m=0;i=u;u=u+112|0;e=i+88|0;f=i+72|0;g=i+8|0;h=i;if(_v(a)|0){o[f>>2]=0.0;o[f+4>>2]=0.0;m=Zd[k[(k[b>>2]|0)+16>>2]&255](b)|0;l=+((k[m>>2]|0)>>>0);m=(Zd[k[(k[b>>2]|0)+16>>2]&255](b)|0)+4|0;j=+((k[m>>2]|0)>>>0);o[g>>2]=l;o[g+4>>2]=j;Ts(e,f,g);o[g>>2]=0.0;o[g+4>>2]=0.0;o[h>>2]=1.0;o[h+4>>2]=1.0;Ts(f,g,h);if($v(a,e,f)|0){Hs(g);o[h>>2]=1.0;o[h+4>>2]=0.0;aw(a,g,h,b,c,d);a=1;}else a=0;}else a=0;u=i;return a|0;}function _v(a){a=a|0;var b=0,c=0;c=u;u=u+16|0;b=c;a=a+16|0;if(Gv(a)|0)a=1;else{k[b>>2]=50462976;a=Hv(a,4,b,35044)|0;}u=c;return a|0;}function $v(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;d=u;u=u+64|0;e=d;f=k[b>>2]|0;i=k[b+12>>2]|0;k[e>>2]=f;k[e+4>>2]=i;j=k[c>>2]|0;h=k[c+12>>2]|0;k[e+8>>2]=j;k[e+12>>2]=h;g=k[b+4>>2]|0;k[e+16>>2]=f;k[e+20>>2]=g;f=k[c+4>>2]|0;k[e+24>>2]=j;k[e+28>>2]=f;b=k[b+8>>2]|0;k[e+32>>2]=b;k[e+36>>2]=i;c=k[c+8>>2]|0;k[e+40>>2]=c;k[e+44>>2]=h;k[e+48>>2]=b;k[e+52>>2]=g;k[e+56>>2]=c;k[e+60>>2]=f;c=Dv(a+32|0,64,e,35044)|0;u=d;return c|0;}function aw(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0.0,l=0.0,m=0.0;g=u;u=u+16|0;i=g;h=k[a+8>>2]|0;h=Zd[k[(k[h>>2]|0)+12>>2]&255](h)|0;Qu(h);Wd[k[(k[e>>2]|0)+8>>2]&511](e);j=+ee[k[(k[d>>2]|0)+20>>2]&3](d)*10.0;j=j<4.0?4.0:j;e=Zd[k[(k[d>>2]|0)+16>>2]&255](d)|0;m=+((k[e>>2]|0)>>>0);e=(Zd[k[(k[d>>2]|0)+16>>2]&255](d)|0)+4|0;l=+((k[e>>2]|0)>>>0);o[i>>2]=m;o[i+4>>2]=l;rv(h+48|0,Zd[k[(k[d>>2]|0)+8>>2]&255](d)|0);rv(h+64|0,b);wv(h+80|0,j>40.0?40.0:j);xv(h+96|0,c);xv(h+112|0,i);tv(h+128|0,16,0);tv(h+144|0,16,8);Ud[k[(k[f>>2]|0)+8>>2]&31](f,1,0,1,0);f=k[a>>2]|0;f=Zd[k[(k[f>>2]|0)+8>>2]&255](f)|0;Ud[k[(k[f>>2]|0)+104>>2]&31](f,5,4,5121,0);bw(h);u=g;return;}function bw(a){a=a|0;Iu(a+128|0);Iu(a+144|0);return;}function cw(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0;j=u;u=u+48|0;g=j+24|0;h=j+8|0;i=j;Zs(g,c+16|0,e);if(!(Ws(g)|0)){if(_v(a)|0){dw(h,0,b,g);if($v(a,g,h)|0){o[i>>2]=0.0;o[i+4>>2]=1.0;aw(a,Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0,i,b,d,f);a=1;}else a=0;}else a=0;}else a=1;u=j;return a|0;}function dw(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0.0,h=0,i=0,j=0,l=0;b=u;u=u+32|0;i=b+24|0;h=b+16|0;f=b+8|0;e=b;j=k[(k[c>>2]|0)+28>>2]|0;l=k[d+4>>2]|0;k[h>>2]=k[d>>2];k[h+4>>2]=l;ne[j&63](i,c,h);j=k[(k[c>>2]|0)+28>>2]|0;l=k[d+12>>2]|0;k[f>>2]=k[d+8>>2];k[f+4>>2]=l;ne[j&63](h,c,f);g=1.0-+o[i+4>>2];k[f>>2]=k[i>>2];o[f+4>>2]=g;g=1.0-+o[h+4>>2];k[e>>2]=k[h>>2];o[e+4>>2]=g;Ts(a,f,e);u=b;return;}function ew(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;k[a>>2]=k[b>>2];d=k[b+4>>2]|0;k[a+4>>2]=d;if(d|0)mN(d);k[a+8>>2]=k[c>>2];c=k[c+4>>2]|0;k[a+12>>2]=c;if(c|0)mN(c);d=a+16|0;k[d>>2]=0;k[d+4>>2]=0;k[d+8>>2]=0;k[d+12>>2]=0;o[a+32>>2]=1.0;dv(a+36|0,b);ev(a+52|0,b);dv(a+68|0,b);ev(a+84|0,b);return;}function fw(a){a=a|0;var b=0;gw(a,k[a+8>>2]|0);b=k[a>>2]|0;k[a>>2]=0;if(b|0)vN(b);return;}function gw(a,b){a=a|0;b=b|0;while(1){if(!b)break;a=k[b>>2]|0;hw(b+8|0);vN(b);b=a;}return;}function hw(a){a=a|0;iw(a+12|0);CN(a);return;}function iw(a){a=a|0;var b=0,c=0,d=0;c=k[a>>2]|0;if(c|0){a=a+4|0;b=k[a>>2]|0;while(1){if((b|0)==(c|0))break;d=b+-28|0;k[a>>2]=d;b=d;}vN(c);}return;}function jw(a){a=a|0;if(!(k[a>>2]|0))return 0;else return(k[a+8>>2]|0)!=0|0;return 0;}function kw(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,m=0;m=u;u=u+192|0;g=m+128|0;h=m+64|0;j=m;f=lw(a,c)|0;if(!f)f=0;else{f=f+20|0;Tw(f,c);Ud[k[(k[e>>2]|0)+8>>2]&31](e,770,771,1,1);Js(g,+o[d>>2],+o[d+4>>2]);if(i[c+24>>0]|0){Js(j,0.0,-1.0);Gs(h,j,g);mw(a,c,f,b,h,6184)|0;}o[h>>2]=+(l[c+16>>0]|0)/255.0;o[h+4>>2]=+(l[c+17>>0]|0)/255.0;o[h+8>>2]=+(l[c+18>>0]|0)/255.0;o[h+12>>2]=1.0;f=mw(a,c,f,b,g,h)|0;}u=m;return f|0;}function lw(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0.0,g=0.0,h=0,j=0,l=0,m=0,n=0,p=0,q=0,r=0,s=0,t=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0;D=u;u=u+128|0;y=D+104|0;C=D+64|0;A=D+12|0;B=D;z=a+16|0;x=Gw(z,b)|0;c=x;if(!x){Sw(C);AN(A,b);Hw(A+12|0,C);x=A+24|0;t=C+12|0;k[x>>2]=k[t>>2];k[x+4>>2]=k[t+4>>2];k[x+8>>2]=k[t+8>>2];k[x+12>>2]=k[t+12>>2];k[x+16>>2]=k[t+16>>2];k[x+20>>2]=k[t+20>>2];k[x+24>>2]=k[t+24>>2];x=Vt(a+28|0,A)|0;t=a+20|0;h=k[t>>2]|0;v=(h|0)==0;a:do if(!v){n=h+-1|0;p=(n&h|0)==0;if(p)q=n&x;else q=(x>>>0)%(h>>>0)|0;c=k[(k[z>>2]|0)+(q<<2)>>2]|0;if(!c){c=q;w=20;}else{r=A+11|0;s=A+4|0;b:while(1){c=k[c>>2]|0;if(!c){c=q;w=20;break a;}d=k[c+4>>2]|0;if(p)d=d&n;else d=(d>>>0)%(h>>>0)|0;if((d|0)!=(q|0)){c=q;w=20;break a;}d=c+8|0;j=i[d+11>>0]|0;l=j<<24>>24<0;j=j&255;m=l?k[c+12>>2]|0:j;E=i[r>>0]|0;e=E<<24>>24<0;if((m|0)!=((e?k[s>>2]|0:E&255)|0))continue;e=e?k[A>>2]|0:A;if(l)if(!(Vn(k[d>>2]|0,e,m)|0)){d=1;break;}else continue;while(1){if(!j){d=1;break a;}if((i[d>>0]|0)!=(i[e>>0]|0))continue b;j=j+-1|0;e=e+1|0;d=d+1|0;}}}}else{c=0;w=20;}while(0);if((w|0)==20){Iw(y,z,x,A);j=a+28|0;f=+(((k[j>>2]|0)+1|0)>>>0);g=+o[a+32>>2];do if(v|f>+(h>>>0)*g){c=(h>>>0>2&(h+-1&h|0)==0&1|h<<1)^1;d=~~+_(+(f/g))>>>0;Jw(z,c>>>0<d>>>0?d:c);c=k[t>>2]|0;d=c+-1|0;if(!(d&c)){h=c;c=d&x;break;}else{h=c;c=(x>>>0)%(c>>>0)|0;break;}}while(0);d=k[(k[z>>2]|0)+(c<<2)>>2]|0;if(!d){e=a+24|0;k[k[y>>2]>>2]=k[e>>2];k[e>>2]=k[y>>2];k[(k[z>>2]|0)+(c<<2)>>2]=e;e=k[y>>2]|0;c=k[e>>2]|0;if(!c)c=y;else{c=k[c+4>>2]|0;d=h+-1|0;if(!(d&h))c=c&d;else c=(c>>>0)%(h>>>0)|0;k[(k[z>>2]|0)+(c<<2)>>2]=e;c=y;}}else{k[k[y>>2]>>2]=k[d>>2];k[d>>2]=k[y>>2];c=y;}E=k[c>>2]|0;k[j>>2]=(k[j>>2]|0)+1;k[c>>2]=0;d=0;c=E;}Kw(A);if(d){AN(B,b);CN(B);c=0;}iw(C);}u=D;return c|0;}function mw(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0;j=u;u=u+48|0;g=j+36|0;h=j+32|0;i=j;if((k[b+28>>2]|0)==(k[b+32>>2]|0))a=0;else if(nw(a,b,c,d,e,f,1,g,h)|0){ow(i,b,c);pw(a,i,i+8|0,+o[g>>2],d,e,f)|0;pw(a,i+16|0,i+24|0,+o[h>>2],d,e,f)|0;a=1;}else a=0;u=j;return a|0;}function nw(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0.0,l=0.0,m=0.0,n=0,p=0,q=0,r=0,s=0,t=0,v=0,w=0,x=0;v=u;u=u+144|0;t=v+72|0;r=v+8|0;s=v;b=b+20|0;k[h>>2]=k[b>>2];k[i>>2]=k[b>>2];p=c+4|0;if(((k[c>>2]|0)!=(k[p>>2]|0)?sw(a)|0:0)?tw(a)|0:0){q=k[a>>2]|0;q=Zd[k[(k[q>>2]|0)+8>>2]&255](q)|0;j=1.0/+ee[k[(k[d>>2]|0)+20>>2]&3](d);j=j<.20000000298023224?.20000000298023224:j;n=k[a+8>>2]|0;n=Zd[k[(k[n>>2]|0)+24>>2]&255](n)|0;Qu(n);a=Zd[k[(k[d>>2]|0)+8>>2]&255](d)|0;Gs(r,a,Zd[k[(k[d>>2]|0)+12>>2]&255](d)|0);Gs(t,r,e);rv(n+48|0,t);wv(n+112|0,j);sv(n+160|0,f);uv(n+176|0,12,0);uv(n+192|0,12,4);uv(n+208|0,12,8);m=+o[b>>2];m=g?m:j+m;b=k[c>>2]|0;j=+o[b+24>>2];o[h>>2]=j*m;a=n+64|0;d=n+80|0;e=n+96|0;f=n+128|0;c=n+144|0;while(1){if((b|0)==(k[p>>2]|0))break;x=b;w=k[x+4>>2]|0;h=t;k[h>>2]=k[x>>2];k[h+4>>2]=w;h=b+8|0;w=k[h+4>>2]|0;x=r;k[x>>2]=k[h>>2];k[x+4>>2]=w;x=b+16|0;w=k[x+4>>2]|0;h=s;k[h>>2]=k[x>>2];k[h+4>>2]=w;xv(a,t);xv(d,r);xv(e,s);if((b|0)==((k[p>>2]|0)+-28|0))l=j;else l=+o[b+24>>2];wv(f,m*j);wv(c,m*l);Ud[k[(k[q>>2]|0)+104>>2]&31](q,5,34,5121,0);if(g){Ud[k[(k[q>>2]|0)+104>>2]&31](q,5,34,5121,34);Ud[k[(k[q>>2]|0)+104>>2]&31](q,5,34,5121,68);}j=l;b=b+28|0;}o[i>>2]=m*j;uw(n);b=1;}else b=0;u=v;return b|0;}function ow(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;g=u;u=u+16|0;d=g;e=g+8|0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;k[a+12>>2]=0;k[a+16>>2]=0;k[a+20>>2]=0;k[a+24>>2]=0;k[a+28>>2]=0;f=k[c>>2]|0;c=k[c+4>>2]|0;if((f|0)==(c|0)){e=k[b+28>>2]|0;d=k[e>>2]|0;e=k[e+4>>2]|0;f=a;k[f>>2]=d;k[f+4>>2]=e;f=a+16|0;k[f>>2]=d;k[f+4>>2]=e;k[a+8>>2]=1065353216;k[a+12>>2]=0;k[a+24>>2]=-1082130432;k[a+28>>2]=0;}else{h=f;j=k[h+4>>2]|0;b=a;k[b>>2]=k[h>>2];k[b+4>>2]=j;b=c+-12|0;j=b;h=k[j+4>>2]|0;i=a+16|0;k[i>>2]=k[j>>2];k[i+4>>2]=h;Ns(e,f,f+8|0);Bs(d,e);i=d;h=k[i+4>>2]|0;f=a+8|0;k[f>>2]=k[i>>2];k[f+4>>2]=h;Ns(e,b,c+-20|0);Bs(d,e);e=k[d+4>>2]|0;f=a+24|0;k[f>>2]=k[d>>2];k[f+4>>2]=e;}u=g;return;}function pw(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;f=f|0;g=g|0;var h=0.0,i=0,j=0,l=0,m=0;m=u;u=u+144|0;i=m+128|0;j=m+64|0;l=m;if(qw(a)|0){h=d*.5;d=1.0/+ee[k[(k[e>>2]|0)+20>>2]&3](e);d=d<.20000000298023224?.20000000298023224:d;Cs(i,c);if(rw(a,b,i,c,h+d)|0){i=k[a+8>>2]|0;i=Zd[k[(k[i>>2]|0)+20>>2]&255](i)|0;Qu(i+4|0);c=Zd[k[(k[e>>2]|0)+8>>2]&255](e)|0;Gs(l,c,Zd[k[(k[e>>2]|0)+12>>2]&255](e)|0);Gs(j,l,f);rv(i+52|0,j);wv(i+68|0,d);wv(i+84|0,h);sv(i+100|0,g);xv(i+116|0,b);tv(i+132|0,12,0);a=k[a>>2]|0;a=Zd[k[(k[a>>2]|0)+8>>2]&255](a)|0;Ud[k[(k[a>>2]|0)+104>>2]&31](a,5,4,5121,0);Wd[k[k[i>>2]>>2]&511](i);a=1;}else a=0;}else a=0;u=m;return a|0;}function qw(a){a=a|0;var b=0,c=0;c=u;u=u+16|0;b=c;a=a+68|0;if(Gv(a)|0)a=1;else{k[b>>2]=50462976;a=Hv(a,4,b,35044)|0;}u=c;return a|0;}function rw(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;var f=0,g=0,h=0,i=0,j=0,l=0,m=0;f=u;u=u+96|0;l=f+72|0;j=f+64|0;i=f+56|0;h=f+48|0;g=f;m=f+80|0;Ps(j,c,e);Ms(l,b,j);Ms(h,c,d);Ps(i,h,e);Ms(j,b,i);Ps(h,c,e);Ns(i,b,h);Ns(m,d,c);Ps(g,m,e);Ms(h,b,g);d=l;c=k[d+4>>2]|0;b=g;k[b>>2]=k[d>>2];k[b+4>>2]=c;o[g+8>>2]=1.0;b=j;c=k[b+4>>2]|0;d=g+12|0;k[d>>2]=k[b>>2];k[d+4>>2]=c;o[g+20>>2]=1.0;d=i;c=k[d+4>>2]|0;b=g+24|0;k[b>>2]=k[d>>2];k[b+4>>2]=c;o[g+32>>2]=1.0;b=h;c=k[b+4>>2]|0;d=g+36|0;k[d>>2]=k[b>>2];k[d+4>>2]=c;o[g+44>>2]=1.0;d=Dv(a+84|0,48,g,35044)|0;u=f;return d|0;}function sw(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0;l=u;u=u+16|0;h=l;j=l+12|0;e=a+36|0;if(Gv(e)|0)a=1;else{k[h>>2]=0;f=h+4|0;k[f>>2]=0;k[h+8>>2]=0;g=h+8|0;d=0;while(1){if((d|0)>=17){d=0;break;}c=d<<2;a=c&255;i[j>>0]=a;b=k[f>>2]|0;if(b>>>0<(k[g>>2]|0)>>>0){i[b>>0]=a;b=(k[f>>2]|0)+1|0;k[f>>2]=b;}else{Bw(h,j);b=k[f>>2]|0;}a=(c|2)&255;i[j>>0]=a;if(b>>>0<(k[g>>2]|0)>>>0){i[b>>0]=a;k[f>>2]=(k[f>>2]|0)+1;}else Bw(h,j);d=d+1|0;}while(1){if((d|0)>=17){d=0;break;}c=d<<2;a=c&255;i[j>>0]=a;b=k[f>>2]|0;if(b>>>0<(k[g>>2]|0)>>>0){i[b>>0]=a;b=(k[f>>2]|0)+1|0;k[f>>2]=b;}else{Bw(h,j);b=k[f>>2]|0;}a=(c|1)&255;i[j>>0]=a;if(b>>>0<(k[g>>2]|0)>>>0){i[b>>0]=a;k[f>>2]=(k[f>>2]|0)+1;}else Bw(h,j);d=d+1|0;}while(1){if((d|0)>=17)break;c=d<<2;a=(c|2)&255;i[j>>0]=a;b=k[f>>2]|0;if(b>>>0<(k[g>>2]|0)>>>0){i[b>>0]=a;b=(k[f>>2]|0)+1|0;k[f>>2]=b;}else{Bw(h,j);b=k[f>>2]|0;}a=(c|3)&255;i[j>>0]=a;if(b>>>0<(k[g>>2]|0)>>>0){i[b>>0]=a;k[f>>2]=(k[f>>2]|0)+1;}else Bw(h,j);d=d+1|0;}a=k[h>>2]|0;a=Hv(e,(k[f>>2]|0)-a|0,a,35044)|0;Cw(h);}u=l;return a|0;}function tw(a){a=a|0;var b=0.0,c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0,n=0,p=0,q=0,r=0;r=u;u=u+32|0;p=r+12|0;q=r;i=a+52|0;if(vw(i)|0)a=1;else{k[p>>2]=0;j=p+4|0;k[j>>2]=0;k[p+8>>2]=0;l=q+4|0;m=q+8|0;n=p+8|0;c=q+4|0;d=q+8|0;e=q+4|0;f=q+8|0;g=q+4|0;h=q+8|0;b=0.0;while(1){if(!(b<=1.03125))break;o[q>>2]=b;o[l>>2]=1.0;o[m>>2]=0.0;a=k[j>>2]|0;if(a>>>0<(k[n>>2]|0)>>>0){k[a>>2]=k[q>>2];k[a+4>>2]=k[q+4>>2];k[a+8>>2]=k[q+8>>2];a=(k[j>>2]|0)+12|0;k[j>>2]=a;}else{ww(p,q);a=k[j>>2]|0;}o[q>>2]=b;o[c>>2]=1.0;o[d>>2]=1.0;if(a>>>0<(k[n>>2]|0)>>>0){k[a>>2]=k[q>>2];k[a+4>>2]=k[q+4>>2];k[a+8>>2]=k[q+8>>2];a=(k[j>>2]|0)+12|0;k[j>>2]=a;}else{ww(p,q);a=k[j>>2]|0;}o[q>>2]=b;o[e>>2]=-1.0;o[f>>2]=0.0;if(a>>>0<(k[n>>2]|0)>>>0){k[a>>2]=k[q>>2];k[a+4>>2]=k[q+4>>2];k[a+8>>2]=k[q+8>>2];a=(k[j>>2]|0)+12|0;k[j>>2]=a;}else{ww(p,q);a=k[j>>2]|0;}o[q>>2]=b;o[g>>2]=-1.0;o[h>>2]=1.0;if(a>>>0<(k[n>>2]|0)>>>0){k[a>>2]=k[q>>2];k[a+4>>2]=k[q+4>>2];k[a+8>>2]=k[q+8>>2];k[j>>2]=(k[j>>2]|0)+12;}else ww(p,q);b=b+.0625;}a=k[p>>2]|0;a=Dv(i,(k[j>>2]|0)-a|0,a,35044)|0;xw(p);}u=r;return a|0;}function uw(a){a=a|0;zv(a+176|0);zv(a+192|0);zv(a+208|0);return;}function vw(a){a=a|0;var b=0,c=0;b=k[a>>2]|0;if(((b|0)!=0?(i[a+14>>0]|0)!=0:0)?(c=j[a+12>>1]|0,c<<16>>16==(Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0)<<16>>16):0)a=Ev(a)|0;else a=0;return a|0;}function ww(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;g=u;u=u+32|0;c=g;d=k[a+4>>2]|0;e=k[a>>2]|0;f=((d-e|0)/12|0)+1|0;if(f>>>0>357913941)jN(a);else{i=((k[a+8>>2]|0)-e|0)/12|0;h=i<<1;yw(c,i>>>0<178956970?h>>>0<f>>>0?f:h:357913941,(d-e|0)/12|0,a+8|0);f=c+8|0;e=k[f>>2]|0;k[e>>2]=k[b>>2];k[e+4>>2]=k[b+4>>2];k[e+8>>2]=k[b+8>>2];k[f>>2]=(k[f>>2]|0)+12;zw(a,c);Aw(c);u=g;return;}}function xw(a){a=a|0;var b=0,c=0,d=0;c=k[a>>2]|0;if(c|0){a=a+4|0;b=k[a>>2]|0;while(1){if((b|0)==(c|0))break;d=b+-12|0;k[a>>2]=d;b=d;}vN(c);}return;}function yw(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;do if(b){if(b>>>0>357913941){c=rc(4)|0;GO(c);Ld(c|0,2912,370);}else{d=rN(b*12|0)|0;break;}}else d=0;while(0);k[a>>2]=d;c=d+(c*12|0)|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+(b*12|0);return;}function zw(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;d=k[a>>2]|0;g=a+4|0;f=b+4|0;e=(k[g>>2]|0)-d|0;c=(k[f>>2]|0)+(((e|0)/-12|0)*12|0)|0;k[f>>2]=c;if((e|0)>0){PO(c|0,d|0,e|0)|0;d=f;c=k[f>>2]|0;}else d=f;f=k[a>>2]|0;k[a>>2]=c;k[d>>2]=f;f=b+8|0;e=k[g>>2]|0;k[g>>2]=k[f>>2];k[f>>2]=e;f=a+8|0;g=b+12|0;a=k[f>>2]|0;k[f>>2]=k[g>>2];k[g>>2]=a;k[b>>2]=k[d>>2];return;}function Aw(a){a=a|0;var b=0,c=0,d=0,e=0;b=k[a+4>>2]|0;c=a+8|0;d=k[c>>2]|0;while(1){if((d|0)==(b|0))break;e=d+-12|0;k[c>>2]=e;d=e;}a=k[a>>2]|0;if(a|0)vN(a);return;}function Bw(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0;g=u;u=u+32|0;c=g;d=k[a+4>>2]|0;e=k[a>>2]|0;f=d-e+1|0;if((f|0)<0)jN(a);else{j=(k[a+8>>2]|0)-e|0;h=j<<1;Dw(c,j>>>0<1073741823?h>>>0<f>>>0?f:h:2147483647,d-e|0,a+8|0);f=c+8|0;i[k[f>>2]>>0]=i[b>>0]|0;k[f>>2]=(k[f>>2]|0)+1;Ew(a,c);Fw(c);u=g;return;}}function Cw(a){a=a|0;var b=0,c=0,d=0;c=k[a>>2]|0;if(c|0){a=a+4|0;b=k[a>>2]|0;while(1){if((b|0)==(c|0))break;d=b+-1|0;k[a>>2]=d;b=d;}vN(c);}return;}function Dw(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;if(!b)d=0;else d=rN(b)|0;k[a>>2]=d;c=d+c|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+b;return;}function Ew(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;d=k[a>>2]|0;g=a+4|0;f=b+4|0;e=(k[g>>2]|0)-d|0;c=(k[f>>2]|0)+(0-e)|0;k[f>>2]=c;if((e|0)>0){PO(c|0,d|0,e|0)|0;d=f;c=k[f>>2]|0;}else d=f;f=k[a>>2]|0;k[a>>2]=c;k[d>>2]=f;f=b+8|0;e=k[g>>2]|0;k[g>>2]=k[f>>2];k[f>>2]=e;f=a+8|0;g=b+12|0;a=k[f>>2]|0;k[f>>2]=k[g>>2];k[g>>2]=a;k[b>>2]=k[d>>2];return;}function Fw(a){a=a|0;var b=0,c=0,d=0,e=0;b=k[a+4>>2]|0;c=a+8|0;d=k[c>>2]|0;while(1){if((d|0)==(b|0))break;e=d+-1|0;k[c>>2]=e;d=e;}vN(k[a>>2]|0);return;}function Gw(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0;c=Vt(a+12|0,b)|0;m=k[a+4>>2]|0;a:do if(m){n=m+-1|0;o=(n&m|0)==0;if(o)l=n&c;else l=(c>>>0)%(m>>>0)|0;c=k[(k[a>>2]|0)+(l<<2)>>2]|0;if(c){h=b+11|0;j=b+4|0;b:while(1){c=k[c>>2]|0;if(!c){c=0;break a;}a=k[c+4>>2]|0;if(o)a=a&n;else a=(a>>>0)%(m>>>0)|0;if((a|0)!=(l|0)){c=0;break a;}a=c+8|0;e=i[a+11>>0]|0;f=e<<24>>24<0;e=e&255;g=f?k[c+12>>2]|0:e;p=i[h>>0]|0;d=p<<24>>24<0;if((g|0)!=((d?k[j>>2]|0:p&255)|0))continue;d=d?k[b>>2]|0:b;if(f)if(!(Vn(k[a>>2]|0,d,g)|0))break;else continue;while(1){if(!e)break a;if((i[a>>0]|0)!=(i[d>>0]|0))continue b;e=e+-1|0;d=d+1|0;a=a+1|0;}}}else c=0;}else c=0;while(0);return c|0;}function Hw(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;c=b+4|0;e=(k[c>>2]|0)-(k[b>>2]|0)|0;d=(e|0)/28|0;if(e|0){Nw(a,d);Ow(a,k[b>>2]|0,k[c>>2]|0,d);}return;}function Iw(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;f=rN(60)|0;k[a>>2]=f;k[a+4>>2]=b+8;e=a+8|0;i[e>>0]=0;b=f+8|0;k[b>>2]=k[d>>2];k[b+4>>2]=k[d+4>>2];k[b+8>>2]=k[d+8>>2];b=0;while(1){if((b|0)==3)break;k[d+(b<<2)>>2]=0;b=b+1|0;}Mw(f+20|0,d+12|0);i[e>>0]=1;f=k[a>>2]|0;k[f+4>>2]=c;k[f>>2]=0;return;}function Jw(a,b){a=a|0;b=b|0;var c=0,d=0;if((b|0)!=1){if(b+-1&b)b=hN(b)|0;}else b=2;d=k[a+4>>2]|0;if(b>>>0<=d>>>0){if(b>>>0<d>>>0){c=~~+_(+(+((k[a+12>>2]|0)>>>0)/+o[a+16>>2]))>>>0;if(d>>>0>2&(d+-1&d|0)==0)c=1<<32-(ca(c+-1|0)|0);else c=hN(c)|0;b=b>>>0<c>>>0?c:b;if(b>>>0<d>>>0)Lw(a,b);}}else Lw(a,b);return;}function Kw(a){a=a|0;iw(a+12|0);CN(a);return;}function Lw(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;d=a+4|0;a:do if(b){if(b>>>0>1073741823){a=rc(4)|0;GO(a);Ld(a|0,2912,370);}t=rN(b<<2)|0;c=k[a>>2]|0;k[a>>2]=t;if(c|0)vN(c);k[d>>2]=b;c=0;while(1){if((c|0)==(b|0))break;k[(k[a>>2]|0)+(c<<2)>>2]=0;c=c+1|0;}e=a+8|0;c=k[e>>2]|0;if(c|0){d=k[c+4>>2]|0;s=b+-1|0;t=(s&b|0)==0;if(t)d=d&s;else d=(d>>>0)%(b>>>0)|0;k[(k[a>>2]|0)+(d<<2)>>2]=e;while(1){r=c;b:while(1)while(1){c=k[r>>2]|0;if(!c)break a;e=k[c+4>>2]|0;if(t)q=e&s;else q=(e>>>0)%(b>>>0)|0;if((q|0)==(d|0)){r=c;continue b;}e=(k[a>>2]|0)+(q<<2)|0;if(!(k[e>>2]|0))break b;m=c+8|0;n=m+11|0;o=c+12|0;p=c;c:while(1){e=k[p>>2]|0;if(!e){f=34;break;}f=e+8|0;h=i[n>>0]|0;j=h<<24>>24<0;h=h&255;l=j?k[o>>2]|0:h;u=i[f+11>>0]|0;g=u<<24>>24<0;if((l|0)!=((g?k[e+12>>2]|0:u&255)|0)){f=34;break;}f=g?k[f>>2]|0:f;if(j){if(Vn(k[m>>2]|0,f,l)|0){f=31;break;}p=k[p>>2]|0;continue;}else g=m;while(1){if(!h){p=e;continue c;}if((i[g>>0]|0)!=(i[f>>0]|0)){f=33;break c;}h=h+-1|0;f=f+1|0;g=g+1|0;}}if((f|0)==31)e=k[p>>2]|0;k[r>>2]=e;k[p>>2]=k[k[(k[a>>2]|0)+(q<<2)>>2]>>2];k[k[(k[a>>2]|0)+(q<<2)>>2]>>2]=c;}k[e>>2]=r;d=q;}}}else{c=k[a>>2]|0;k[a>>2]=0;if(c|0)vN(c);k[d>>2]=0;}while(0);return;}function Mw(a,b){a=a|0;b=b|0;var c=0,d=0;k[a>>2]=0;d=a+4|0;k[d>>2]=0;k[a+8>>2]=0;k[a>>2]=k[b>>2];c=b+4|0;k[d>>2]=k[c>>2];d=b+8|0;k[a+8>>2]=k[d>>2];k[d>>2]=0;k[c>>2]=0;k[b>>2]=0;a=a+12|0;b=b+12|0;k[a>>2]=k[b>>2];k[a+4>>2]=k[b+4>>2];k[a+8>>2]=k[b+8>>2];k[a+12>>2]=k[b+12>>2];k[a+16>>2]=k[b+16>>2];k[a+20>>2]=k[b+20>>2];k[a+24>>2]=k[b+24>>2];return;}function Nw(a,b){a=a|0;b=b|0;var c=0;if(b>>>0>153391689)jN(a);else{c=rN(b*28|0)|0;k[a+4>>2]=c;k[a>>2]=c;k[a+8>>2]=c+(b*28|0);return;}}function Ow(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;d=a+4|0;a=c-b|0;if((a|0)>0){PO(k[d>>2]|0,b|0,a|0)|0;k[d>>2]=(k[d>>2]|0)+(((a>>>0)/28|0)*28|0);}return;}function Pw(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,l=0;l=u;u=u+96|0;f=l+80|0;g=l+16|0;h=l;j=lw(a,c)|0;if(!j)a=0;else{k[g>>2]=m[e>>1]|m[e+2>>1]<<16;i[g+4>>0]=0;KA(f,g);Js(g,+o[d>>2],+o[d+4>>2]);Nv(h,f);a=Qw(a,c,j+20|0,b,g,h)|0;}u=l;return a|0;}function Qw(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0;j=u;u=u+48|0;g=j+36|0;h=j+32|0;i=j;if((k[b+28>>2]|0)==(k[b+32>>2]|0))a=0;else if(nw(a,b,c,d,e,f,0,g,h)|0){ow(i,b,c);Rw(a,i,i+8|0,+o[g>>2],d,e,f)|0;Rw(a,i+16|0,i+24|0,+o[h>>2],d,e,f)|0;a=1;}else a=0;u=j;return a|0;}function Rw(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,l=0,m=0.0;l=u;u=u+144|0;h=l+128|0;i=l+64|0;j=l;if(qw(a)|0){m=1.0/+ee[k[(k[e>>2]|0)+20>>2]&3](e);Cs(h,c);if(rw(a,b,h,c,d*.5+(m<.20000000298023224?.20000000298023224:m))|0){h=k[a+8>>2]|0;h=Zd[k[(k[h>>2]|0)+16>>2]&255](h)|0;Qu(h);c=Zd[k[(k[e>>2]|0)+8>>2]&255](e)|0;Gs(j,c,Zd[k[(k[e>>2]|0)+12>>2]&255](e)|0);Gs(i,j,f);rv(h+48|0,i);sv(h+64|0,g);tv(h+80|0,12,0);uv(h+96|0,12,8);a=k[a>>2]|0;a=Zd[k[(k[a>>2]|0)+8>>2]&255](a)|0;Ud[k[(k[a>>2]|0)+104>>2]&31](a,5,4,5121,0);vv(h);a=1;}else a=0;}else a=0;u=l;return a|0;}function Sw(a){a=a|0;var b=0;b=a+40|0;do{k[a>>2]=0;a=a+4|0;}while((a|0)<(b|0));return;}function Tw(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;h=b+28|0;c=k[h>>2]|0;if((k[b+32>>2]|0)-c>>3>>>0>=3){g=a+16|0;i=Rs(c,g)|0;d=k[a>>2]|0;e=a+4|0;c=k[e>>2]|0;if(!i){if((d|0)==(c|0))f=7;}else{while(1){if((c|0)==(d|0))break;i=c+-28|0;k[e>>2]=i;c=i;}k[a+12>>2]=0;h=k[h>>2]|0;i=k[h+4>>2]|0;f=g;k[f>>2]=k[h>>2];k[f+4>>2]=i;f=7;}if((f|0)==7)Uw(a,b);if(k[a+12>>2]|0)Vw(a,b);}return;}function Uw(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0.0,i=0,j=0,l=0;f=u;u=u+32|0;c=f;i=f+16|0;l=f+12|0;j=f+8|0;d=b+28|0;k[l>>2]=(k[d>>2]|0)+8;g=b+32|0;k[j>>2]=k[g>>2];e=a+16|0;h=+o[b+40>>2];k[i>>2]=k[l>>2];k[c>>2]=k[j>>2];b=Ww(i,c,e,h)|0;if((b|0)!=(k[g>>2]|0)){zs(c,e,b);l=c;j=k[l+4>>2]|0;i=a+24|0;k[i>>2]=k[l>>2];k[i+4>>2]=j;i=b;j=k[i+4>>2]|0;l=a+32|0;k[l>>2]=k[i>>2];k[l+4>>2]=j;k[a+12>>2]=b-(k[d>>2]|0)>>3;}u=f;return;}function Vw(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0,n=0.0,p=0,q=0,r=0,s=0,t=0;q=u;u=u+32|0;g=q+28|0;f=q+24|0;r=q+20|0;e=q+16|0;i=q;j=q+12|0;l=q+8|0;m=b+40|0;n=+o[m>>2];p=b+28|0;h=a+12|0;k[r>>2]=(k[p>>2]|0)+(k[h>>2]<<3)+8;c=b+32|0;k[e>>2]=k[c>>2];d=a+32|0;k[f>>2]=k[r>>2];k[g>>2]=k[e>>2];e=a+24|0;b=Ww(f,g,d,n)|0;while(1){if((b|0)==(k[c>>2]|0))break;zs(i,d,b);Xw(a,e,d,i,+o[m>>2]);s=b;r=k[s+4>>2]|0;t=d;k[t>>2]=k[s>>2];k[t+4>>2]=r;t=i;r=k[t+4>>2]|0;s=e;k[s>>2]=k[t>>2];k[s+4>>2]=r;s=k[p>>2]|0;r=b-s>>3;k[h>>2]=r;k[j>>2]=s+(r<<3)+8;k[l>>2]=k[c>>2];k[f>>2]=k[j>>2];k[g>>2]=k[l>>2];b=Ww(f,g,d,n)|0;}u=q;return;}function Ww(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;var e=0;if(+O(+d)<9.99999993922529e-09)d=25.0;else d=25.0/(d*d);e=k[b>>2]|0;b=k[a>>2]|0;while(1){if((b|0)==(e|0)){b=e;break;}if(+xs(c,b)>d)break;b=b+8|0;}return b|0;}function Xw(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;var f=0,g=0.0,h=0,i=0,j=0,l=0;i=u;u=u+32|0;h=i;g=+ys(b,d);if(+O(+g)<9.99999993922529e-09)e=1.5;else{g=15.0/g;f=+O(+e)<9.99999993922529e-09;e=f?g:g/e;e=e<.699999988079071?.699999988079071:e;e=e>1.5?1.5:e;}f=a+4|0;l=b;b=k[l+4>>2]|0;j=h;k[j>>2]=k[l>>2];k[j+4>>2]=b;j=c;b=k[j+4>>2]|0;c=h+8|0;k[c>>2]=k[j>>2];k[c+4>>2]=b;c=d;d=k[c+4>>2]|0;b=h+16|0;k[b>>2]=k[c>>2];k[b+4>>2]=d;o[h+24>>2]=e;b=k[f>>2]|0;if(b>>>0<(k[a+8>>2]|0)>>>0){k[b>>2]=k[h>>2];k[b+4>>2]=k[h+4>>2];k[b+8>>2]=k[h+8>>2];k[b+12>>2]=k[h+12>>2];k[b+16>>2]=k[h+16>>2];k[b+20>>2]=k[h+20>>2];k[b+24>>2]=k[h+24>>2];l=(k[f>>2]|0)+28|0;k[f>>2]=l;b=l;f=l;}else{Yw(a,h);f=k[f>>2]|0;b=f;}if(((b-(k[a>>2]|0)|0)/28|0)>>>0>2){l=f+-32|0;o[l>>2]=(+o[f+-4>>2]+(+o[f+-60>>2]*1.5+ +o[l>>2]*1.2999999523162842))/3.799999952316284;}u=i;return;}function Yw(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;g=u;u=u+32|0;c=g;d=k[a+4>>2]|0;e=k[a>>2]|0;f=((d-e|0)/28|0)+1|0;if(f>>>0>153391689)jN(a);else{i=((k[a+8>>2]|0)-e|0)/28|0;h=i<<1;Zw(c,i>>>0<76695844?h>>>0<f>>>0?f:h:153391689,(d-e|0)/28|0,a+8|0);f=c+8|0;e=k[f>>2]|0;k[e>>2]=k[b>>2];k[e+4>>2]=k[b+4>>2];k[e+8>>2]=k[b+8>>2];k[e+12>>2]=k[b+12>>2];k[e+16>>2]=k[b+16>>2];k[e+20>>2]=k[b+20>>2];k[e+24>>2]=k[b+24>>2];k[f>>2]=e+28;_w(a,c);$w(c);u=g;return;}}function Zw(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;do if(b){if(b>>>0>153391689){c=rc(4)|0;GO(c);Ld(c|0,2912,370);}else{d=rN(b*28|0)|0;break;}}else d=0;while(0);k[a>>2]=d;c=d+(c*28|0)|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+(b*28|0);return;}function _w(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;d=k[a>>2]|0;g=a+4|0;f=b+4|0;e=(k[g>>2]|0)-d|0;c=(k[f>>2]|0)+(((e|0)/-28|0)*28|0)|0;k[f>>2]=c;if((e|0)>0){PO(c|0,d|0,e|0)|0;d=f;c=k[f>>2]|0;}else d=f;f=k[a>>2]|0;k[a>>2]=c;k[d>>2]=f;f=b+8|0;e=k[g>>2]|0;k[g>>2]=k[f>>2];k[f>>2]=e;f=a+8|0;g=b+12|0;a=k[f>>2]|0;k[f>>2]=k[g>>2];k[g>>2]=a;k[b>>2]=k[d>>2];return;}function $w(a){a=a|0;var b=0,c=0,d=0,e=0;b=k[a+4>>2]|0;c=a+8|0;d=k[c>>2]|0;while(1){if((d|0)==(b|0))break;e=d+-28|0;k[c>>2]=e;d=e;}a=k[a>>2]|0;if(a|0)vN(a);return;}function ax(){Hs(38332);return;}function bx(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;k[a>>2]=k[b>>2];d=k[b+4>>2]|0;k[a+4>>2]=d;if(d|0)mN(d);k[a+8>>2]=k[c>>2];c=k[c+4>>2]|0;k[a+12>>2]=c;if(c|0)mN(c);ev(a+16|0,b);dv(a+32|0,b);return;}function cx(a){a=a|0;if(!(k[a>>2]|0))return 0;else return(k[a+8>>2]|0)!=0|0;return 0;}function dx(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=k[a+8>>2]|0;e=Zd[k[(k[e>>2]|0)+8>>2]&255](e)|0;Wd[k[(k[b>>2]|0)+8>>2]&511](b);Wd[k[(k[c>>2]|0)+8>>2]&511](c);Qu(e);Wd[k[(k[d>>2]|0)+12>>2]&511](d);if(ex(a)|0){rv(e+48|0,38332);tv(e+64|0,16,0);tv(e+80|0,16,8);a=k[a>>2]|0;a=Zd[k[(k[a>>2]|0)+8>>2]&255](a)|0;Ud[k[(k[a>>2]|0)+104>>2]&31](a,5,4,5121,0);Wv(e);a=1;}else a=0;return a|0;}function ex(a){a=a|0;if(fx(a)|0)a=gx(a)|0;else a=0;return a|0;}function fx(a){a=a|0;var b=0,c=0;c=u;u=u+64|0;b=c;a=a+16|0;if(vw(a)|0)a=1;else{o[b>>2]=-1.0;o[b+4>>2]=1.0;o[b+8>>2]=0.0;o[b+12>>2]=1.0;o[b+16>>2]=-1.0;o[b+20>>2]=-1.0;o[b+24>>2]=0.0;o[b+28>>2]=0.0;o[b+32>>2]=1.0;o[b+36>>2]=1.0;o[b+40>>2]=1.0;o[b+44>>2]=1.0;o[b+48>>2]=1.0;o[b+52>>2]=-1.0;o[b+56>>2]=1.0;o[b+60>>2]=0.0;a=Dv(a,64,b,35044)|0;}u=c;return a|0;}function gx(a){a=a|0;var b=0,c=0;c=u;u=u+16|0;b=c;a=a+32|0;if(Gv(a)|0)a=1;else{k[b>>2]=50462976;a=Hv(a,4,b,35044)|0;}u=c;return a|0;}function hx(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;k[a>>2]=k[b>>2];d=k[b+4>>2]|0;k[a+4>>2]=d;if(d|0)mN(d);k[a+8>>2]=k[c>>2];c=k[c+4>>2]|0;k[a+12>>2]=c;if(c|0)mN(c);ev(a+16|0,b);dv(a+32|0,b);return;}function ix(a){a=a|0;if(!(k[a>>2]|0))return 0;else return(k[a+8>>2]|0)!=0|0;return 0;}function jx(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,l=0;e=u;u=u+32|0;i=e+24|0;h=e+16|0;g=e+8|0;f=e;j=k[(k[b>>2]|0)+28>>2]|0;l=k[c+4>>2]|0;k[h>>2]=k[c>>2];k[h+4>>2]=l;ne[j&63](i,b,h);j=k[(k[b>>2]|0)+28>>2]|0;l=k[c+12>>2]|0;k[g>>2]=k[c+8>>2];k[g+4>>2]=l;ne[j&63](h,b,g);Ud[k[(k[d>>2]|0)+8>>2]&31](d,770,771,1,1);kx(g,i,b);kx(f,h,b);d=lx(a,g,f,b)|0;u=e;return d|0;}function kx(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0;c=Zd[k[(k[c>>2]|0)+16>>2]&255](c)|0;d=(1.0-+o[b+4>>2])*+((k[c+4>>2]|0)>>>0);o[a>>2]=+o[b>>2]*+((k[c>>2]|0)>>>0);o[a+4>>2]=d;return;}function lx(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0.0,g=0.0,h=0.0,j=0,l=0.0,m=0,n=0.0;if((i[38320]|0)==0?EO(38320)|0:0){o[9599]=0.0;o[9600]=0.0;o[9601]=0.0;o[9602]=.20000000298023224;}a:do if(mx(a)|0){j=k[a+8>>2]|0;j=Zd[k[(k[j>>2]|0)+16>>2]&255](j)|0;Qu(j);rv(j+48|0,Zd[k[(k[d>>2]|0)+8>>2]&255](d)|0);sv(j+64|0,38396);l=+o[b>>2];g=+o[b+4>>2];h=+o[c>>2];f=+o[c+4>>2];c=(Zd[k[(k[d>>2]|0)+16>>2]&255](d)|0)+8|0;c=~~+NO(+ +o[c>>2]);d=j+80|0;e=j+96|0;b=0;while(1){if((b|0)>=(c|0)){b=1;break a;}n=+(b|0);nx(a,l-n,g-n,h+n,f+n)|0;tv(d,12,0);uv(e,12,8);m=k[a>>2]|0;m=Zd[k[(k[m>>2]|0)+8>>2]&255](m)|0;Ud[k[(k[m>>2]|0)+104>>2]&31](m,2,4,5121,0);vv(j);b=b+1|0;}}else b=0;while(0);return b|0;}function mx(a){a=a|0;var b=0,c=0;c=u;u=u+16|0;b=c;a=a+32|0;if(Gv(a)|0)a=1;else{k[b>>2]=50462976;a=Hv(a,4,b,35044)|0;}u=c;return a|0;}function nx(a,b,c,d,e){a=a|0;b=+b;c=+c;d=+d;e=+e;var f=0,g=0,h=0.0;f=u;u=u+48|0;g=f;h=b+-.5;c=c+-.5;o[g>>2]=h;o[g+4>>2]=c;o[g+8>>2]=1.0;b=e+.5;o[g+12>>2]=h;o[g+16>>2]=b;o[g+20>>2]=1.0;e=d+.5;o[g+24>>2]=e;o[g+28>>2]=b;o[g+32>>2]=1.0;o[g+36>>2]=e;o[g+40>>2]=c;o[g+44>>2]=1.0;a=Dv(a+16|0,48,g,35044)|0;u=f;return a|0;}function ox(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;k[a>>2]=k[b>>2];d=k[b+4>>2]|0;k[a+4>>2]=d;if(d|0)mN(d);k[a+8>>2]=k[c>>2];c=k[c+4>>2]|0;k[a+12>>2]=c;if(c|0)mN(c);dv(a+16|0,b);ev(a+32|0,b);dv(a+48|0,b);ev(a+64|0,b);return;}function px(a){a=a|0;if(!(k[a>>2]|0))return 0;else return(k[a+8>>2]|0)!=0|0;return 0;}function qx(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0.0,g=0.0,h=0,j=0,l=0,m=0,n=0,p=0.0,q=0,r=0,t=0,v=0,w=0,x=0,y=0,z=0;v=u;u=u+208|0;h=v+8|0;j=v;q=v+144|0;r=v+80|0;t=v+16|0;if(rx(a)|0){x=c+28|0;z=k[x>>2]|0;x=k[x+4>>2]|0;w=h;k[w>>2]=z;k[w+4>>2]=x;w=c+36|0;y=k[w>>2]|0;w=k[w+4>>2]|0;n=j;k[n>>2]=y;k[n+4>>2]=w;n=i[c+24>>0]|0;p=+o[c+20>>2]*.5;l=i[c+16>>0]|0;m=i[c+17>>0]|0;c=i[c+18>>0]|0;f=(k[s>>2]=z,+o[s>>2]);f=f-(k[s>>2]=y,+o[s>>2]);g=(k[s>>2]=x,+o[s>>2]);g=g-(k[s>>2]=w,+o[s>>2]);g=+P(+(f*f+g*g))*.5;sx(q,0,h,j,d);f=1.0/+ee[k[(k[b>>2]|0)+20>>2]&3](b);f=f<.20000000298023224?.20000000298023224:f;if(tx(a,g,p,f)|0){Ud[k[(k[e>>2]|0)+8>>2]&31](e,770,771,1,1);if(n<<24>>24){Js(t,0.0,-1.0);Gs(r,t,q);ux(a,b,r,g,p,6200,f);}o[r>>2]=+(l&255)/255.0;o[r+4>>2]=+(m&255)/255.0;o[r+8>>2]=+(c&255)/255.0;o[r+12>>2]=1.0;ux(a,b,q,g,p,r,f);c=1;}else c=0;}else c=0;u=v;return c|0;}function rx(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;f=u;u=u+16|0;e=f;a=a+16|0;if(Gv(a)|0)a=1;else{b=e;c=24553;d=b+16|0;do{i[b>>0]=i[c>>0]|0;b=b+1|0;c=c+1|0;}while((b|0)<(d|0));a=Hv(a,16,e,35044)|0;}u=f;return a|0;}function sx(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0.0,g=0.0,h=0.0,i=0.0,j=0.0,k=0.0,l=0,m=0,n=0,p=0,q=0;q=u;u=u+256|0;l=q+192|0;m=q+128|0;n=q+64|0;p=q;j=+o[c>>2];k=+o[d>>2];b=!(j<=k);i=b?k:j;k=b?j:k;j=+o[(b?c:d)+4>>2];f=+o[(b?d:c)+4>>2];b=+O(+(f-j))<9.99999993922529e-09;do if(+O(+(i-k))<9.99999993922529e-09){if(b){g=f;h=i;f=0.0;}else{g=(j+f)*.5;h=i;f=1.570796251296997;}}else if(b){g=f;h=(i+k)*.5;f=0.0;break;}else{g=(j+f)*.5;h=(i+k)*.5;f=+X(+(j-f),+(k-i));break;}while(0);Js(m,+o[e>>2]+-1.0,+o[e+4>>2]+-1.0);Js(n,h,g);Gs(l,m,n);Ls(p,f,0.0,0.0);Gs(a,l,p);u=q;return;}function tx(a,b,c,d){a=a|0;b=+b;c=+c;d=+d;var e=0,f=0,g=0.0,h=0.0,i=0.0;e=u;u=u+144|0;f=e;h=c+d;g=b+c+d;i=-b;o[f>>2]=i;o[f+4>>2]=h;o[f+8>>2]=0.0;o[f+12>>2]=b;o[f+16>>2]=h;o[f+20>>2]=0.0;o[f+24>>2]=i;o[f+28>>2]=c;o[f+32>>2]=1.0;o[f+36>>2]=b;o[f+40>>2]=c;o[f+44>>2]=1.0;d=-c;o[f+48>>2]=i;o[f+52>>2]=d;o[f+56>>2]=1.0;o[f+60>>2]=b;o[f+64>>2]=d;o[f+68>>2]=1.0;d=-h;o[f+72>>2]=i;o[f+76>>2]=d;o[f+80>>2]=0.0;o[f+84>>2]=b;o[f+88>>2]=d;o[f+92>>2]=0.0;c=-g;o[f+96>>2]=c;o[f+100>>2]=h;o[f+104>>2]=0.0;o[f+108>>2]=c;o[f+112>>2]=d;o[f+116>>2]=0.0;o[f+120>>2]=g;o[f+124>>2]=h;o[f+128>>2]=0.0;o[f+132>>2]=g;o[f+136>>2]=d;o[f+140>>2]=0.0;a=Dv(a+32|0,144,f,35044)|0;u=e;return a|0;}function ux(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=+d;e=+e;f=f|0;g=+g;vx(a,b,c,f);wx(a,b,c,d,e,g,f);return;}function vx(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=u;u=u+128|0;g=e+64|0;h=e;f=k[a+8>>2]|0;f=Zd[k[(k[f>>2]|0)+16>>2]&255](f)|0;Qu(f);i=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;Gs(h,i,Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0);Gs(g,h,c);rv(f+48|0,g);sv(f+64|0,d);tv(f+80|0,12,0);uv(f+96|0,12,8);d=k[a>>2]|0;d=Zd[k[(k[d>>2]|0)+8>>2]&255](d)|0;Ud[k[(k[d>>2]|0)+104>>2]&31](d,5,8,5121,0);vv(f);u=e;return;}function wx(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=+d;e=+e;f=+f;g=g|0;var h=0,i=0,j=0,l=0,m=0;h=u;u=u+128|0;j=h+64|0;l=h;i=k[a+8>>2]|0;i=Zd[k[(k[i>>2]|0)+20>>2]&255](i)|0;Qu(i+4|0);m=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;Gs(l,m,Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0);Gs(j,l,c);rv(i+52|0,j);wv(i+68|0,f);wv(i+84|0,e);sv(i+100|0,g);tv(i+132|0,12,0);g=i+116|0;o[j>>2]=-d;o[j+4>>2]=0.0;xv(g,j);c=k[a>>2]|0;c=Zd[k[(k[c>>2]|0)+8>>2]&255](c)|0;Ud[k[(k[c>>2]|0)+104>>2]&31](c,5,4,5121,8);o[j>>2]=d;o[j+4>>2]=0.0;xv(g,j);g=k[a>>2]|0;g=Zd[k[(k[g>>2]|0)+8>>2]&255](g)|0;Ud[k[(k[g>>2]|0)+104>>2]&31](g,5,4,5121,12);Wd[k[k[i>>2]>>2]&511](i);u=h;return;}function xx(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,l=0,n=0,p=0,q=0.0,r=0.0,t=0.0,v=0,w=0,x=0,y=0,z=0;p=u;u=u+224|0;g=p+8|0;h=p;j=p+208|0;l=p+144|0;n=p+80|0;f=p+16|0;if(yx(a)|0){w=c+28|0;y=k[w>>2]|0;w=k[w+4>>2]|0;v=g;k[v>>2]=y;k[v+4>>2]=w;v=c+36|0;x=k[v>>2]|0;v=k[v+4>>2]|0;z=h;k[z>>2]=x;k[z+4>>2]=v;k[l>>2]=m[e>>1]|m[e+2>>1]<<16;i[l+4>>0]=0;KA(j,l);sx(l,0,g,h,d);r=+o[c+20>>2]*.5;q=(k[s>>2]=y,+o[s>>2]);q=q-(k[s>>2]=x,+o[s>>2]);t=(k[s>>2]=w,+o[s>>2]);t=t-(k[s>>2]=v,+o[s>>2]);t=+P(+(q*q+t*t))*.5;q=1.0/+ee[k[(k[b>>2]|0)+20>>2]&3](b);if(zx(a,t,r,q<.20000000298023224?.20000000298023224:q)|0){z=k[a+8>>2]|0;z=Zd[k[(k[z>>2]|0)+16>>2]&255](z)|0;Qu(z);y=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;Gs(f,y,Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0);Gs(n,f,l);rv(z+48|0,n);Nv(n,j);sv(z+64|0,n);tv(z+80|0,12,0);uv(z+96|0,12,8);a=k[a>>2]|0;a=Zd[k[(k[a>>2]|0)+8>>2]&255](a)|0;Ud[k[(k[a>>2]|0)+104>>2]&31](a,5,4,5121,0);vv(z);a=1;}else a=0;}else a=0;u=p;return a|0;}function yx(a){a=a|0;var b=0,c=0;c=u;u=u+16|0;b=c;a=a+48|0;if(Gv(a)|0)a=1;else{k[b>>2]=50462976;a=Hv(a,4,b,35044)|0;}u=c;return a|0;}function zx(a,b,c,d){a=a|0;b=+b;c=+c;d=+d;var e=0,f=0;e=u;u=u+48|0;f=e;d=c+d;c=b+c;b=-c;o[f>>2]=b;o[f+4>>2]=d;o[f+8>>2]=1.0;o[f+12>>2]=c;o[f+16>>2]=d;o[f+20>>2]=1.0;d=-d;o[f+24>>2]=b;o[f+28>>2]=d;o[f+32>>2]=1.0;o[f+36>>2]=c;o[f+40>>2]=d;o[f+44>>2]=1.0;a=Dv(a+64|0,48,f,35044)|0;u=e;return a|0;}function Ax(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;k[a>>2]=k[b>>2];d=k[b+4>>2]|0;k[a+4>>2]=d;if(d|0)mN(d);k[a+8>>2]=k[c>>2];c=k[c+4>>2]|0;k[a+12>>2]=c;if(c|0)mN(c);dv(a+16|0,a);ev(a+32|0,b);ev(a+48|0,b);return;}function Bx(a){a=a|0;if(!(k[a>>2]|0))return 0;else return(k[a+8>>2]|0)!=0|0;return 0;}function Cx(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;var f=0.0,g=0,h=0,i=0,j=0,l=0,m=0,n=0;l=u;u=u+208|0;g=l;h=l+136|0;i=l+72|0;j=l+8|0;if(Dx(a)|0){f=1.0/+ee[k[(k[b>>2]|0)+20>>2]&3](b);f=f<.20000000298023224?.20000000298023224:f;d=+Ex(0,d,b);n=c;m=k[n+4>>2]|0;c=g;k[c>>2]=k[n>>2];k[c+4>>2]=m;if(Fx(a,g,d+f)|0){Js(h,0.0,-+pm(b,1.0));n=k[a+8>>2]|0;n=Zd[k[(k[n>>2]|0)+20>>2]&255](n)|0;a=k[a>>2]|0;a=Zd[k[(k[a>>2]|0)+8>>2]&255](a)|0;Qu(n+4|0);Ud[k[(k[e>>2]|0)+8>>2]&31](e,770,771,1,1);e=n+52|0;m=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;Gs(j,m,Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0);Gs(i,j,h);rv(e,i);wv(n+68|0,f);wv(n+84|0,d);j=n+100|0;sv(j,6216);xv(n+116|0,g);m=n+132|0;tv(m,8,0);Ud[k[(k[a>>2]|0)+104>>2]&31](a,5,4,5121,0);Wd[k[k[n>>2]>>2]&511](n);h=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;Gs(i,h,Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0);rv(e,i);sv(j,6232);tv(m,8,0);Ud[k[(k[a>>2]|0)+104>>2]&31](a,5,4,5121,0);Wd[k[k[n>>2]>>2]&511](n);a=1;}else a=0;}else a=0;u=l;return a|0;}function Dx(a){a=a|0;var b=0,c=0;c=u;u=u+16|0;b=c;a=a+16|0;if(Gv(a)|0)a=1;else{k[b>>2]=50462976;a=Hv(a,4,b,35044)|0;}u=c;return a|0;}function Ex(a,b,c){a=a|0;b=+b;c=c|0;if(+bo(c,b)<5.0)b=+pm(c,5.0);return+b;}function Fx(a,b,c){a=a|0;b=b|0;c=+c;var d=0,e=0,f=0.0,g=0.0,h=0.0,i=0.0;d=u;u=u+32|0;e=d;f=+o[b>>2];h=+o[b+4>>2];g=f-c;i=h+c;o[e>>2]=g;o[e+4>>2]=i;f=f+c;o[e+8>>2]=f;o[e+12>>2]=i;c=h-c;o[e+16>>2]=g;o[e+20>>2]=c;o[e+24>>2]=f;o[e+28>>2]=c;b=Dv(a+32|0,32,e,35044)|0;u=d;return b|0;}function Gx(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;f=f|0;var g=0,h=0,j=0,l=0,n=0.0;l=u;u=u+80|0;g=l+72|0;h=l;j=l+8|0;if(Dx(a)|0){n=1.0/+ee[k[(k[b>>2]|0)+20>>2]&3](b);d=+Ex(0,d,b);k[h>>2]=m[e>>1]|m[e+2>>1]<<16;i[h+4>>0]=f;KA(g,h);e=k[c+4>>2]|0;f=h;k[f>>2]=k[c>>2];k[f+4>>2]=e;if(Hx(a,h,d+(n<.20000000298023224?.20000000298023224:n))|0){h=k[a+8>>2]|0;h=Zd[k[(k[h>>2]|0)+16>>2]&255](h)|0;Qu(h);f=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;Gs(j,f,Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0);rv(h+48|0,j);Nv(j,g);sv(h+64|0,j);tv(h+80|0,12,0);uv(h+96|0,12,8);a=k[a>>2]|0;a=Zd[k[(k[a>>2]|0)+8>>2]&255](a)|0;Ud[k[(k[a>>2]|0)+104>>2]&31](a,5,4,5121,0);vv(h);a=1;}else a=0;}else a=0;u=l;return a|0;}function Hx(a,b,c){a=a|0;b=b|0;c=+c;var d=0,e=0,f=0.0,g=0.0,h=0.0,i=0.0;d=u;u=u+48|0;e=d;f=+o[b>>2];h=+o[b+4>>2];g=f-c;i=h+c;o[e>>2]=g;o[e+4>>2]=i;o[e+8>>2]=1.0;f=f+c;o[e+12>>2]=f;o[e+16>>2]=i;o[e+20>>2]=1.0;c=h-c;o[e+24>>2]=g;o[e+28>>2]=c;o[e+32>>2]=1.0;o[e+36>>2]=f;o[e+40>>2]=c;o[e+44>>2]=1.0;b=Dv(a+48|0,48,e,35044)|0;u=d;return b|0;}function Ix(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;k[a>>2]=k[b>>2];d=k[b+4>>2]|0;k[a+4>>2]=d;if(d|0)mN(d);k[a+8>>2]=k[c>>2];c=k[c+4>>2]|0;k[a+12>>2]=c;if(c|0)mN(c);dv(a+16|0,b);ev(a+32|0,b);return;}function Jx(a){a=a|0;if(!(k[a>>2]|0))return 0;else return(k[a+8>>2]|0)!=0|0;return 0;}function Kx(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;j=u;u=u+192|0;f=j+128|0;g=j+64|0;h=j;if(Lx(a)|0?Mx(a)|0:0){Js(f,+o[d>>2],+o[d+4>>2]);Ud[k[(k[e>>2]|0)+8>>2]&31](e,770,771,1,1);if(i[c+24>>0]|0){Js(h,0.0,-1.0);Gs(g,h,f);Nx(a,b,c,6248,g,0);}o[g>>2]=+(l[c+16>>0]|0)/255.0;o[g+4>>2]=+(l[c+17>>0]|0)/255.0;o[g+8>>2]=+(l[c+18>>0]|0)/255.0;o[g+12>>2]=1.0;Nx(a,b,c,g,f,0);a=1;}else a=0;u=j;return a|0;}function Lx(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0,l=0,m=0,n=0;n=u;u=u+16|0;l=n;m=n+12|0;g=a+16|0;if(Gv(g)|0)a=1;else{k[l>>2]=0;h=l+4|0;k[h>>2]=0;k[l+8>>2]=0;i=l+8|0;f=0;while(1){if((f|0)>=151)break;e=f<<2;a=e&65535;j[m>>1]=a;b=k[h>>2]|0;c=k[i>>2]|0;if(b>>>0<c>>>0){j[b>>1]=a;d=b+2|0;k[h>>2]=d;b=c;}else{Vx(l,m);d=k[h>>2]|0;b=k[i>>2]|0;}a=(e|2)&65535;j[m>>1]=a;if(d>>>0<b>>>0){j[d>>1]=a;k[h>>2]=d+2;}else Vx(l,m);f=f+1|0;}f=0;while(1){if((f|0)>=151)break;e=f<<2;a=e&65535;j[m>>1]=a;b=k[h>>2]|0;c=k[i>>2]|0;if(b>>>0<c>>>0){j[b>>1]=a;d=b+2|0;k[h>>2]=d;b=c;}else{Vx(l,m);d=k[h>>2]|0;b=k[i>>2]|0;}a=(e|1)&65535;j[m>>1]=a;if(d>>>0<b>>>0){j[d>>1]=a;k[h>>2]=d+2;}else Vx(l,m);f=f+1|0;}f=0;while(1){if((f|0)>=151)break;e=f<<2;a=(e|2)&65535;j[m>>1]=a;b=k[h>>2]|0;c=k[i>>2]|0;if(b>>>0<c>>>0){j[b>>1]=a;d=b+2|0;k[h>>2]=d;b=c;}else{Vx(l,m);d=k[h>>2]|0;b=k[i>>2]|0;}a=(e|3)&65535;j[m>>1]=a;if(d>>>0<b>>>0){j[d>>1]=a;k[h>>2]=d+2;}else Vx(l,m);f=f+1|0;}a=k[l>>2]|0;a=Hv(g,(k[h>>2]|0)-a|0,a,35044)|0;Wx(l);}u=n;return a|0;}function Mx(a){a=a|0;var b=0,c=0.0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0,n=0,p=0,q=0,r=0,s=0;s=u;u=u+32|0;r=s+12|0;p=s;q=a+32|0;if(vw(q)|0)a=1;else{k[r>>2]=0;m=r+4|0;k[m>>2]=0;k[r+8>>2]=0;j=p+4|0;l=p+8|0;n=r+8|0;d=p+4|0;e=p+8|0;f=p+4|0;g=p+8|0;h=p+4|0;i=p+8|0;b=0;c=0.0;while(1){if((b|0)>=150)break;o[p>>2]=c;o[j>>2]=1.0;o[l>>2]=0.0;a=k[m>>2]|0;if(a>>>0<(k[n>>2]|0)>>>0){k[a>>2]=k[p>>2];k[a+4>>2]=k[p+4>>2];k[a+8>>2]=k[p+8>>2];a=(k[m>>2]|0)+12|0;k[m>>2]=a;}else{Qx(r,p);a=k[m>>2]|0;}o[p>>2]=c;o[d>>2]=1.0;o[e>>2]=1.0;if(a>>>0<(k[n>>2]|0)>>>0){k[a>>2]=k[p>>2];k[a+4>>2]=k[p+4>>2];k[a+8>>2]=k[p+8>>2];a=(k[m>>2]|0)+12|0;k[m>>2]=a;}else{Qx(r,p);a=k[m>>2]|0;}o[p>>2]=c;o[f>>2]=-1.0;o[g>>2]=0.0;if(a>>>0<(k[n>>2]|0)>>>0){k[a>>2]=k[p>>2];k[a+4>>2]=k[p+4>>2];k[a+8>>2]=k[p+8>>2];a=(k[m>>2]|0)+12|0;k[m>>2]=a;}else{Qx(r,p);a=k[m>>2]|0;}o[p>>2]=c;o[h>>2]=-1.0;o[i>>2]=1.0;if(a>>>0<(k[n>>2]|0)>>>0){k[a>>2]=k[p>>2];k[a+4>>2]=k[p+4>>2];k[a+8>>2]=k[p+8>>2];k[m>>2]=(k[m>>2]|0)+12;}else Qx(r,p);b=b+1|0;c=c+.006666666828095913;}o[p>>2]=1.0;o[p+4>>2]=1.0;o[p+8>>2]=0.0;a=k[m>>2]|0;if(a>>>0<(k[n>>2]|0)>>>0){k[a>>2]=k[p>>2];k[a+4>>2]=k[p+4>>2];k[a+8>>2]=k[p+8>>2];a=(k[m>>2]|0)+12|0;k[m>>2]=a;}else{Qx(r,p);a=k[m>>2]|0;}o[p>>2]=1.0;o[p+4>>2]=1.0;o[p+8>>2]=1.0;if(a>>>0<(k[n>>2]|0)>>>0){k[a>>2]=k[p>>2];k[a+4>>2]=k[p+4>>2];k[a+8>>2]=k[p+8>>2];a=(k[m>>2]|0)+12|0;k[m>>2]=a;}else{Qx(r,p);a=k[m>>2]|0;}o[p>>2]=1.0;o[p+4>>2]=-1.0;o[p+8>>2]=0.0;if(a>>>0<(k[n>>2]|0)>>>0){k[a>>2]=k[p>>2];k[a+4>>2]=k[p+4>>2];k[a+8>>2]=k[p+8>>2];a=(k[m>>2]|0)+12|0;k[m>>2]=a;}else{Qx(r,p);a=k[m>>2]|0;}o[p>>2]=1.0;o[p+4>>2]=-1.0;o[p+8>>2]=1.0;if(a>>>0<(k[n>>2]|0)>>>0){k[a>>2]=k[p>>2];k[a+4>>2]=k[p+4>>2];k[a+8>>2]=k[p+8>>2];a=(k[m>>2]|0)+12|0;k[m>>2]=a;}else{Qx(r,p);a=k[m>>2]|0;}p=k[r>>2]|0;a=Dv(q,a-p|0,p,35044)|0;Rx(r);}u=s;return a|0;}function Nx(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0.0,j=0,l=0;f=u;u=u+128|0;h=f+64|0;j=f;g=k[a>>2]|0;g=Zd[k[(k[g>>2]|0)+8>>2]&255](g)|0;a=k[a+8>>2]|0;a=Zd[k[(k[a>>2]|0)+32>>2]&255](a)|0;Qu(a);l=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;Gs(j,l,Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0);Gs(h,j,e);rv(a+48|0,h);i=1.0/+ee[k[(k[b>>2]|0)+20>>2]&3](b);wv(a+128|0,i<.20000000298023224?.20000000298023224:i);e=c+20|0;wv(a+144|0,+o[e>>2]);wv(a+160|0,+o[e>>2]);sv(a+176|0,d);uv(a+192|0,12,0);uv(a+208|0,12,4);uv(a+224|0,12,8);Ox(h,c);xv(a+64|0,h);xv(a+112|0,h+8|0);d=a+80|0;xv(d,h+16|0);e=a+96|0;xv(e,h+24|0);Ud[k[(k[g>>2]|0)+104>>2]&31](g,5,302,5123,0);Ud[k[(k[g>>2]|0)+104>>2]&31](g,5,302,5123,1208);Ud[k[(k[g>>2]|0)+104>>2]&31](g,5,302,5123,604);xv(d,h+32|0);xv(e,h+40|0);Ud[k[(k[g>>2]|0)+104>>2]&31](g,5,302,5123,0);Ud[k[(k[g>>2]|0)+104>>2]&31](g,5,302,5123,1208);Ud[k[(k[g>>2]|0)+104>>2]&31](g,5,302,5123,604);Px(a);u=f;return;}function Ox(a,b){a=a|0;b=b|0;var c=0,d=0,e=0.0,f=0.0,g=0.0,h=0.0,i=0.0,j=0.0,l=0.0,m=0.0;c=a;d=c+48|0;do{k[c>>2]=0;c=c+4|0;}while((c|0)<(d|0));h=+o[b+36>>2];i=+o[b+40>>2];j=+o[b+28>>2];g=+o[b+32>>2];e=h<1.0?1.0:h;f=i<1.0?1.0:i;if(!(e>=f)){m=i+g;g=g-i;o[a>>2]=j;o[a+4>>2]=g;o[a+8>>2]=j;o[a+12>>2]=m;h=e*1.3333333730697632;l=j-h;o[a+16>>2]=l;o[a+20>>2]=g;h=h+j;e=m;f=h;i=m;j=l;}else{m=h+j;h=j-h;o[a>>2]=h;o[a+4>>2]=g;o[a+8>>2]=m;o[a+12>>2]=g;e=f*1.3333333730697632;i=e+g;o[a+16>>2]=h;o[a+20>>2]=i;g=g-e;e=g;f=m;j=m;}o[a+24>>2]=j;o[a+28>>2]=i;o[a+32>>2]=h;o[a+36>>2]=g;o[a+40>>2]=f;o[a+44>>2]=e;return;}function Px(a){a=a|0;zv(a+192|0);zv(a+208|0);zv(a+224|0);return;}function Qx(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;g=u;u=u+32|0;c=g;d=k[a+4>>2]|0;e=k[a>>2]|0;f=((d-e|0)/12|0)+1|0;if(f>>>0>357913941)jN(a);else{i=((k[a+8>>2]|0)-e|0)/12|0;h=i<<1;Sx(c,i>>>0<178956970?h>>>0<f>>>0?f:h:357913941,(d-e|0)/12|0,a+8|0);f=c+8|0;e=k[f>>2]|0;k[e>>2]=k[b>>2];k[e+4>>2]=k[b+4>>2];k[e+8>>2]=k[b+8>>2];k[f>>2]=(k[f>>2]|0)+12;Tx(a,c);Ux(c);u=g;return;}}function Rx(a){a=a|0;var b=0,c=0,d=0;c=k[a>>2]|0;if(c|0){a=a+4|0;b=k[a>>2]|0;while(1){if((b|0)==(c|0))break;d=b+-12|0;k[a>>2]=d;b=d;}vN(c);}return;}function Sx(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;do if(b){if(b>>>0>357913941){c=rc(4)|0;GO(c);Ld(c|0,2912,370);}else{d=rN(b*12|0)|0;break;}}else d=0;while(0);k[a>>2]=d;c=d+(c*12|0)|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+(b*12|0);return;}function Tx(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;d=k[a>>2]|0;g=a+4|0;f=b+4|0;e=(k[g>>2]|0)-d|0;c=(k[f>>2]|0)+(((e|0)/-12|0)*12|0)|0;k[f>>2]=c;if((e|0)>0){PO(c|0,d|0,e|0)|0;d=f;c=k[f>>2]|0;}else d=f;f=k[a>>2]|0;k[a>>2]=c;k[d>>2]=f;f=b+8|0;e=k[g>>2]|0;k[g>>2]=k[f>>2];k[f>>2]=e;f=a+8|0;g=b+12|0;a=k[f>>2]|0;k[f>>2]=k[g>>2];k[g>>2]=a;k[b>>2]=k[d>>2];return;}function Ux(a){a=a|0;var b=0,c=0,d=0,e=0;b=k[a+4>>2]|0;c=a+8|0;d=k[c>>2]|0;while(1){if((d|0)==(b|0))break;e=d+-12|0;k[c>>2]=e;d=e;}a=k[a>>2]|0;if(a|0)vN(a);return;}function Vx(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;g=u;u=u+32|0;c=g;d=k[a+4>>2]|0;e=k[a>>2]|0;h=d-e|0;f=(h>>1)+1|0;if((h|0)<-2)jN(a);else{h=(k[a+8>>2]|0)-e|0;Xx(c,h>>1>>>0<1073741823?h>>>0<f>>>0?f:h:2147483647,d-e>>1,a+8|0);h=c+8|0;f=k[h>>2]|0;j[f>>1]=j[b>>1]|0;k[h>>2]=f+2;Yx(a,c);Zx(c);u=g;return;}}function Wx(a){a=a|0;var b=0,c=0,d=0;c=k[a>>2]|0;if(c|0){a=a+4|0;b=k[a>>2]|0;while(1){if((b|0)==(c|0))break;d=b+-2|0;k[a>>2]=d;b=d;}vN(c);}return;}function Xx(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;do if(b){if((b|0)<0){c=rc(4)|0;GO(c);Ld(c|0,2912,370);}else{d=rN(b<<1)|0;break;}}else d=0;while(0);k[a>>2]=d;c=d+(c<<1)|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+(b<<1);return;}function Yx(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;d=k[a>>2]|0;g=a+4|0;f=b+4|0;e=(k[g>>2]|0)-d|0;c=(k[f>>2]|0)+(0-(e>>1)<<1)|0;k[f>>2]=c;if((e|0)>0){PO(c|0,d|0,e|0)|0;d=f;c=k[f>>2]|0;}else d=f;f=k[a>>2]|0;k[a>>2]=c;k[d>>2]=f;f=b+8|0;e=k[g>>2]|0;k[g>>2]=k[f>>2];k[f>>2]=e;f=a+8|0;g=b+12|0;a=k[f>>2]|0;k[f>>2]=k[g>>2];k[g>>2]=a;k[b>>2]=k[d>>2];return;}function Zx(a){a=a|0;var b=0,c=0,d=0,e=0;b=k[a+4>>2]|0;c=a+8|0;d=k[c>>2]|0;while(1){if((d|0)==(b|0))break;e=d+-2|0;k[c>>2]=e;d=e;}a=k[a>>2]|0;if(a|0)vN(a);return;}function _x(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;g=u;u=u+64|0;f=g;if(Lx(a)|0?Mx(a)|0:0){Js(f,+o[d>>2],+o[d+4>>2]);$x(a,b,c,f,e);a=1;}else a=0;u=g;return a|0;}function $x(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,l=0;f=u;u=u+128|0;j=f+64|0;h=f;g=k[a>>2]|0;g=Zd[k[(k[g>>2]|0)+8>>2]&255](g)|0;a=k[a+8>>2]|0;a=Zd[k[(k[a>>2]|0)+32>>2]&255](a)|0;Qu(a);l=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;Gs(h,l,Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0);Gs(j,h,d);rv(a+48|0,j);wv(a+128|0,0.0);d=c+20|0;wv(a+144|0,+o[d>>2]);wv(a+160|0,+o[d>>2]);k[h>>2]=m[e>>1]|m[e+2>>1]<<16;i[h+4>>0]=0;KA(j,h);Nv(h,j);sv(a+176|0,h);uv(a+192|0,12,0);uv(a+208|0,12,4);uv(a+224|0,12,8);Ox(h,c);xv(a+64|0,h);xv(a+112|0,h+8|0);d=a+80|0;xv(d,h+16|0);e=a+96|0;xv(e,h+24|0);Ud[k[(k[g>>2]|0)+104>>2]&31](g,5,302,5123,0);xv(d,h+32|0);xv(e,h+40|0);Ud[k[(k[g>>2]|0)+104>>2]&31](g,5,302,5123,0);Px(a);u=f;return;}function ay(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=k[b>>2];b=k[b+4>>2]|0;k[a+4>>2]=b;if(b|0)mN(b);k[a+8>>2]=k[c>>2];b=k[c+4>>2]|0;k[a+12>>2]=b;if(b|0)mN(b);ev(a+16|0,a);dv(a+32|0,a);return;}function by(a){a=a|0;if(!(k[a>>2]|0))return 0;else return(k[a+8>>2]|0)!=0|0;return 0;}function cy(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0.0,g=0,h=0,j=0,m=0,n=0;n=u;u=u+192|0;g=n+128|0;h=n+64|0;j=n;m=c+28|0;f=+o[c+20>>2]*.5;Js(g,+o[d>>2],+o[d+4>>2]);if(dy(a,m,f)|0?ey(a)|0:0){Ud[k[(k[e>>2]|0)+8>>2]&31](e,770,771,1,1);if(i[c+24>>0]|0){Js(j,0.0,-1.0);Gs(h,j,g);fy(a,b,m,f,h,6264)|0;}o[h>>2]=+(l[c+16>>0]|0)/255.0;o[h+4>>2]=+(l[c+17>>0]|0)/255.0;o[h+8>>2]=+(l[c+18>>0]|0)/255.0;o[h+12>>2]=1.0;fy(a,b,m,f,g,h)|0;a=1;}else a=0;u=n;return a|0;}function dy(a,b,c){a=a|0;b=b|0;c=+c;var d=0,e=0,f=0.0,g=0.0,h=0.0,i=0.0,j=0.0,k=0.0,l=0.0,m=0.0,n=0.0,p=0.0,q=0.0;d=u;u=u+240|0;e=d;n=+o[b>>2];h=+o[b+4>>2];g=+o[b+8>>2];k=+o[b+12>>2];j=(g-n)*.5;j=j<c?j:c;m=(k-h)*.5;m=m<c?m:c;o[e>>2]=n;o[e+4>>2]=h;o[e+8>>2]=1.0;p=n-c;f=h-c;o[e+12>>2]=p;o[e+16>>2]=f;o[e+20>>2]=1.0;q=n+j;i=h+m;o[e+24>>2]=q;o[e+28>>2]=i;o[e+32>>2]=1.0;o[e+36>>2]=n;o[e+40>>2]=f;o[e+44>>2]=1.0;o[e+48>>2]=p;o[e+52>>2]=h;o[e+56>>2]=1.0;o[e+60>>2]=n;o[e+64>>2]=k;o[e+68>>2]=1.0;l=k+c;o[e+72>>2]=p;o[e+76>>2]=l;o[e+80>>2]=1.0;m=k-m;o[e+84>>2]=q;o[e+88>>2]=m;o[e+92>>2]=1.0;o[e+96>>2]=p;o[e+100>>2]=k;o[e+104>>2]=1.0;o[e+108>>2]=n;o[e+112>>2]=l;o[e+116>>2]=1.0;o[e+120>>2]=g;o[e+124>>2]=k;o[e+128>>2]=1.0;c=g+c;o[e+132>>2]=c;o[e+136>>2]=l;o[e+140>>2]=1.0;j=g-j;o[e+144>>2]=j;o[e+148>>2]=m;o[e+152>>2]=1.0;o[e+156>>2]=g;o[e+160>>2]=l;o[e+164>>2]=1.0;o[e+168>>2]=c;o[e+172>>2]=k;o[e+176>>2]=1.0;o[e+180>>2]=g;o[e+184>>2]=h;o[e+188>>2]=1.0;o[e+192>>2]=c;o[e+196>>2]=f;o[e+200>>2]=1.0;o[e+204>>2]=j;o[e+208>>2]=i;o[e+212>>2]=1.0;o[e+216>>2]=c;o[e+220>>2]=h;o[e+224>>2]=1.0;o[e+228>>2]=g;o[e+232>>2]=f;o[e+236>>2]=1.0;b=Dv(a+16|0,240,e,35044)|0;u=d;return b|0;}function ey(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;d=u;u=u+48|0;b=d;c=b;e=24569;f=c+40|0;do{i[c>>0]=i[e>>0]|0;c=c+1|0;e=e+1|0;}while((c|0)<(f|0));f=Hv(a+32|0,40,b,35044)|0;u=d;return f|0;}function fy(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,l=0,m=0.0,n=0;g=u;u=u+128|0;n=g+64|0;i=g;h=k[a>>2]|0;h=Zd[k[(k[h>>2]|0)+8>>2]&255](h)|0;l=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;Gs(i,l,Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0);Gs(n,i,e);m=1.0/+ee[k[(k[b>>2]|0)+20>>2]&3](b);m=m<.20000000298023224?.20000000298023224:m;l=k[c>>2]|0;b=k[c+4>>2]|0;j=k[c+8>>2]|0;c=k[c+12>>2]|0;e=a+8|0;a=k[e>>2]|0;a=Zd[k[(k[a>>2]|0)+16>>2]&255](a)|0;Qu(a);rv(a+48|0,n);sv(a+64|0,f);tv(a+80|0,12,0);uv(a+96|0,12,8);Ud[k[(k[h>>2]|0)+104>>2]&31](h,5,6,5121,0);Ud[k[(k[h>>2]|0)+104>>2]&31](h,5,6,5121,6);Ud[k[(k[h>>2]|0)+104>>2]&31](h,5,6,5121,12);Ud[k[(k[h>>2]|0)+104>>2]&31](h,5,6,5121,18);vv(a);e=k[e>>2]|0;e=Zd[k[(k[e>>2]|0)+20>>2]&255](e)|0;Qu(e+4|0);rv(e+52|0,n);wv(e+68|0,m);wv(e+84|0,d-m*.5);sv(e+100|0,f);tv(e+132|0,12,0);f=e+116|0;k[i>>2]=l;k[i+4>>2]=b;xv(f,i);Ud[k[(k[h>>2]|0)+104>>2]&31](h,5,4,5121,24);k[i>>2]=l;k[i+4>>2]=c;xv(f,i);Ud[k[(k[h>>2]|0)+104>>2]&31](h,5,4,5121,28);k[i>>2]=j;k[i+4>>2]=c;xv(f,i);Ud[k[(k[h>>2]|0)+104>>2]&31](h,5,4,5121,32);k[i>>2]=j;k[i+4>>2]=b;xv(f,i);Ud[k[(k[h>>2]|0)+104>>2]&31](h,5,4,5121,36);Wd[k[k[e>>2]>>2]&511](e);u=g;return 1;}function gy(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0.0;g=u;u=u+32|0;d=g+16|0;f=g;h=+o[c+20>>2]*.5;k[f>>2]=m[e>>1]|m[e+2>>1]<<16;i[f+4>>0]=0;KA(d,f);if(hy(a,c+28|0,h)|0?iy(a)|0:0){Nv(f,d);jy(a,b,0,0.0,f)|0;d=1;}else d=0;u=g;return d|0;}function hy(a,b,c){a=a|0;b=b|0;c=+c;var d=0,e=0,f=0.0,g=0.0,h=0.0,i=0.0,j=0.0,k=0.0,l=0.0;d=u;u=u+96|0;e=d;h=+o[b>>2];f=+o[b+4>>2];j=+o[b+8>>2];i=+o[b+12>>2];l=h-c;g=f-c;o[e>>2]=l;o[e+4>>2]=g;o[e+8>>2]=1.0;h=h+c;f=f+c;o[e+12>>2]=h;o[e+16>>2]=f;o[e+20>>2]=1.0;k=i+c;o[e+24>>2]=l;o[e+28>>2]=k;o[e+32>>2]=1.0;i=i-c;o[e+36>>2]=h;o[e+40>>2]=i;o[e+44>>2]=1.0;h=j+c;o[e+48>>2]=h;o[e+52>>2]=k;o[e+56>>2]=1.0;c=j-c;o[e+60>>2]=c;o[e+64>>2]=i;o[e+68>>2]=1.0;o[e+72>>2]=h;o[e+76>>2]=g;o[e+80>>2]=1.0;o[e+84>>2]=c;o[e+88>>2]=f;o[e+92>>2]=1.0;b=Dv(a+16|0,96,e,35044)|0;u=d;return b|0;}function iy(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;d=u;u=u+16|0;b=d;c=b;e=24609;f=c+10|0;do{i[c>>0]=i[e>>0]|0;c=c+1|0;e=e+1|0;}while((c|0)<(f|0));f=Hv(a+32|0,10,b,35044)|0;u=d;return f|0;}function jy(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;var f=0,g=0,h=0;c=u;u=u+64|0;g=c;f=k[a+8>>2]|0;f=Zd[k[(k[f>>2]|0)+16>>2]&255](f)|0;Qu(f);h=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;Gs(g,h,Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0);rv(f+48|0,g);sv(f+64|0,e);tv(f+80|0,12,0);uv(f+96|0,12,8);e=k[a>>2]|0;e=Zd[k[(k[e>>2]|0)+8>>2]&255](e)|0;Ud[k[(k[e>>2]|0)+104>>2]&31](e,5,10,5121,0);vv(f);u=c;return 1;}function ky(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;cv(a,b,c);Pv(a+80|0,b,c,d);Xv(a+136|0,b,c);ew(a+184|0,b,c);bx(a+284|0,b,c);hx(a+332|0,b,c);ox(a+380|0,b,c);Ax(a+460|0,b,c);Ey(a+524|0,b,c);Ix(a+572|0,b,c);Uy(a+620|0,b,c,e);ay(a+696|0,b,c);return;}function ly(a){a=a|0;fv(a+60|0);gv(a+44|0);wy(a+16|0);hv(a+8|0);ct(a);return;}function my(a){a=a|0;fv(a+32|0);gv(a+16|0);hv(a+8|0);ct(a);return;}function ny(a){a=a|0;fv(a+32|0);gv(a+16|0);hv(a+8|0);ct(a);return;}function oy(a){a=a|0;fv(a+48|0);fv(a+32|0);gv(a+16|0);hv(a+8|0);ct(a);return;}function py(a){a=a|0;fv(a+64|0);gv(a+48|0);fv(a+32|0);gv(a+16|0);hv(a+8|0);ct(a);return;}function qy(a){a=a|0;gv(a+32|0);fv(a+16|0);hv(a+8|0);ct(a);return;}function ry(a){a=a|0;gv(a+32|0);fv(a+16|0);hv(a+8|0);ct(a);return;}function sy(a){a=a|0;fv(a+84|0);gv(a+68|0);fv(a+52|0);gv(a+36|0);fw(a+16|0);hv(a+8|0);ct(a);return;}function ty(a){a=a|0;fv(a+32|0);gv(a+16|0);hv(a+8|0);ct(a);return;}function uy(a){a=a|0;gv(a+40|0);fv(a+24|0);Qv(a+16|0);hv(a+8|0);ct(a);return;}function vy(a){a=a|0;fv(a+64|0);fv(a+48|0);gv(a+32|0);gv(a+16|0);hv(a+8|0);ct(a);return;}function wy(a){a=a|0;xy(a+20|0);yy(a);return;}function xy(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function yy(a){a=a|0;var b=0;zy(a,k[a+8>>2]|0);b=k[a>>2]|0;k[a>>2]=0;if(b|0)vN(b);return;}function zy(a,b){a=a|0;b=b|0;while(1){if(!b)break;a=k[b>>2]|0;Ay(b+8|0);vN(b);b=a;}return;}function Ay(a){a=a|0;By(a+12|0);CN(a);return;}function By(a){a=a|0;Cy(a+20|0);yg(a);return;}function Cy(a){a=a|0;a=k[a+4>>2]|0;if(a|0)oN(a);return;}function Dy(a){a=a|0;if(((((((((kv(a)|0?Rv(a+80|0)|0:0)?Yv(a+136|0)|0:0)?jw(a+184|0)|0:0)?cx(a+284|0)|0:0)?ix(a+332|0)|0:0)?px(a+380|0)|0:0)?Bx(a+460|0)|0:0)?Fy(a+524|0)|0:0)?Jx(a+572|0)|0:0)return by(a+696|0)|0;return 0;}function Ey(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;k[a>>2]=k[b>>2];d=k[b+4>>2]|0;k[a+4>>2]=d;if(d|0)mN(d);k[a+8>>2]=k[c>>2];c=k[c+4>>2]|0;k[a+12>>2]=c;if(c|0)mN(c);dv(a+16|0,b);ev(a+32|0,b);return;}function Fy(a){a=a|0;if(!(k[a>>2]|0))return 0;else return(k[a+8>>2]|0)!=0|0;return 0;}function Gy(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,l=0.0,m=0.0,n=0.0;j=u;u=u+48|0;h=j+40|0;e=j+32|0;f=j+24|0;g=j+16|0;i=j;if(Hy(a)|0){m=+o[c>>2];l=+o[c+4>>2];c=k[(k[d>>2]|0)+28>>2]|0;n=l+ +o[b+4>>2];o[e>>2]=m+ +o[b>>2];o[e+4>>2]=n;ne[c&63](h,d,e);c=k[(k[d>>2]|0)+28>>2]|0;l=l+ +o[b+12>>2];o[f>>2]=m+ +o[b+8>>2];o[f+4>>2]=l;ne[c&63](e,d,f);Iy(f,h,d);Iy(g,e,d);Ts(i,f,g);a:do if(Jy(a,i)|0){f=k[a>>2]|0;f=Zd[k[(k[f>>2]|0)+8>>2]&255](f)|0;e=k[a+8>>2]|0;e=Zd[k[(k[e>>2]|0)+28>>2]&255](e)|0;Qu(e);c=(Zd[k[(k[d>>2]|0)+16>>2]&255](d)|0)+8|0;n=+NO(+(+o[c>>2]*4.0));rv(e+48|0,Zd[k[(k[d>>2]|0)+8>>2]&255](d)|0);c=k[i+12>>2]|0;k[h>>2]=k[i>>2];k[h+4>>2]=c;xv(e+80|0,h);wv(e+96|0,n);wv(e+112|0,0.0);tv(e+128|0,16,0);tv(e+144|0,16,8);c=(Zd[k[(k[d>>2]|0)+16>>2]&255](d)|0)+8|0;c=~~+NO(+ +o[c>>2]);e=e+64|0;b=0;while(1){if((b|0)>=(c|0)){b=1;break a;}wv(e,+(b|0));Ud[k[(k[f>>2]|0)+104>>2]&31](f,2,4,5121,0);b=b+1|0;}}else b=0;while(0);}else b=0;u=j;return b|0;}function Hy(a){a=a|0;var b=0,c=0;c=u;u=u+16|0;b=c;a=a+16|0;if(Gv(a)|0)a=1;else{k[b>>2]=50462976;a=Hv(a,4,b,35044)|0;}u=c;return a|0;}function Iy(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0,e=0.0,f=0;f=Zd[k[(k[c>>2]|0)+16>>2]&255](c)|0;f=k[f>>2]|0;c=(Zd[k[(k[c>>2]|0)+16>>2]&255](c)|0)+4|0;c=k[c>>2]|0;e=+NO(+(+(f>>>0)*+o[b>>2]))+.5;d=+NO(+(+(c>>>0)*(1.0-+o[b+4>>2])))+.5;o[a>>2]=e;o[a+4>>2]=d;return;}function Jy(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;c=u;u=u+64|0;d=c;g=k[b>>2]|0;e=k[b+4>>2]|0;f=k[b+8>>2]|0;b=k[b+12>>2]|0;k[d>>2]=g;k[d+4>>2]=e;o[d+8>>2]=1.0;o[d+12>>2]=1.0;k[d+16>>2]=g;k[d+20>>2]=b;o[d+24>>2]=1.0;o[d+28>>2]=-1.0;k[d+32>>2]=f;k[d+36>>2]=b;o[d+40>>2]=-1.0;o[d+44>>2]=-1.0;k[d+48>>2]=f;k[d+52>>2]=e;o[d+56>>2]=-1.0;o[d+60>>2]=1.0;b=Dv(a+32|0,64,d,35044)|0;u=c;return b|0;}function Ky(a,b,c){a=a|0;b=b|0;c=c|0;return Ly(a,b,c,-1)|0;}function Ly(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0;g=a+8|0;f=k[g>>2]|0;e=f;do if((k[a+12>>2]|0)-f>>3>>>0>b>>>0){f=k[e+(b<<3)+4>>2]|0;e=My(g,k[e+(b<<3)>>2]|0,f,d,b)|0;if((e|0)==(b|0)){e=$(k[a>>2]|0,d)|0;if((c|0)==1){b=Ny(g,e+f|0,0-d|0,b)|0;break;}else{b=Ny(g,f-e|0,0-d|0,b)|0;break;}}else b=e;}while(0);return b|0;}function My(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,l=0,m=0;i=k[a>>2]|0;l=(k[a+4>>2]|0)-i>>3;j=(d|0)==0;g=0;a=0;h=0;while(1){if((h|0)==(l|0))break;m=(k[i+(h<<3)>>2]|0)-b|0;f=(m|0)>-1?m:0-m|0;if((k[i+(h<<3)+4>>2]|0)==(c|0)?j|($(m,d)|0)>0:0){m=(f|0)<(a|0)|g^1;g=1;a=m?f:a;e=m?h:e;}h=h+1|0;}return e|0;}function Ny(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;h=k[a>>2]|0;i=(k[a+4>>2]|0)-h>>3;e=0;g=0;a=0;while(1){if((g|0)==(i|0))break;do if((k[h+(g<<3)+4>>2]|0)==(b|0)){f=k[h+(g<<3)>>2]|0;if(e?($(f-a|0,c)|0)<=0:0){e=1;break;}e=1;d=g;a=f;}while(0);g=g+1|0;}return d|0;}function Oy(a,b,c){a=a|0;b=b|0;c=c|0;return Ly(a,b,c,1)|0;}function Py(a,b,c){a=a|0;b=b|0;c=c|0;return Qy(a,b,1,c)|0;}function Qy(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0;f=a+8|0;g=k[f>>2]|0;e=g;if((k[a+12>>2]|0)-g>>3>>>0>b>>>0){if(!(i[d>>0]|0)){g=k[e+(b<<3)>>2]|0;i[d>>0]=1;k[d+4>>2]=g;d=g;}else d=k[d+4>>2]|0;b=My(f,d,($(k[a>>2]|0,c)|0)+(k[e+(b<<3)+4>>2]|0)|0,0,b)|0;}return b|0;}function Ry(a,b,c){a=a|0;b=b|0;c=c|0;return Qy(a,b,-1,c)|0;}function Sy(a,b){a=a|0;b=b|0;var c=0,d=0.0,e=0,f=0,g=0.0,h=0,i=0;f=k[a+8>>2]|0;a=k[a+12>>2]|0;a:do if((f|0)==(a|0))a=0;else{e=a-f>>3;c=1;a=0;d=+Ty(f,b);while(1){if(c>>>0>=e>>>0)break a;g=+Ty(f+(c<<3)|0,b);h=g<d;i=h?c:a;c=c+1|0;a=i;d=h?g:d;}}while(0);return a|0;}function Ty(a,b){a=a|0;b=b|0;var c=0.0,d=0.0;d=+(k[a>>2]|0)-+o[b>>2];c=+(k[a+4>>2]|0)-+o[b+4>>2];return+(d*d+c*c);}function Uy(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;k[a>>2]=k[b>>2];e=k[b+4>>2]|0;k[a+4>>2]=e;if(e|0)mN(e);k[a+8>>2]=k[c>>2];c=k[c+4>>2]|0;k[a+12>>2]=c;if(c|0)mN(c);lz(a+16|0,d);dv(a+44|0,b);ev(a+60|0,b);return;}function Vy(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,l=0,m=0.0;l=u;u=u+192|0;h=l+128|0;i=l+64|0;j=l;g=Zd[k[(k[a>>2]|0)+8>>2]&255](a)|0;Gs(h,g,Zd[k[(k[a>>2]|0)+12>>2]&255](a)|0);a=h;g=e+64|0;do{k[e>>2]=k[a>>2];e=e+4|0;a=a+4|0;}while((e|0)<(g|0));Ms(h,b,c);m=+NO(+ +o[h>>2]);Js(i,m,+NO(+ +o[h+4>>2]));e=f;a=i;g=e+64|0;do{k[e>>2]=k[a>>2];e=e+4|0;a=a+4|0;}while((e|0)<(g|0));if(!(+O(+(d+-1.0))<9.99999993922529e-09)){m=1.0/d;Ks(j,m,m);Gs(i,f,j);e=f;a=i;g=e+64|0;do{k[e>>2]=k[a>>2];e=e+4|0;a=a+4|0;}while((e|0)<(g|0));}u=l;return;}function Wy(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,m=0,n=0,p=0,q=0,r=0,s=0,t=0,v=0.0,w=0.0,x=0.0;s=u;u=u+384|0;r=s+368|0;f=s+352|0;n=s+288|0;p=s+224|0;q=s+160|0;g=s+144|0;h=s+128|0;j=s+64|0;m=s;t=(Zd[k[(k[b>>2]|0)+16>>2]&255](b)|0)+8|0;mz(r,a+16|0,c,+o[t>>2]);if(k[r>>2]|0){if(Xy(a)|0){Fs(n);Fs(p);t=k[r>>2]|0;Vy(b,c+44|0,d,+ee[k[(k[t>>2]|0)+24>>2]&3](t),n,p);Gs(q,n,p);x=+(l[c+16>>0]|0)/255.0;o[g>>2]=x;w=+(l[c+17>>0]|0)/255.0;o[g+4>>2]=w;v=+(l[c+18>>0]|0)/255.0;o[g+8>>2]=v;o[g+12>>2]=1.0;v=x*.30000001192092896+w*.5899999737739563+v*.10999999940395355>.75?0.0:1.0;o[h>>2]=v;o[h+4>>2]=v;o[h+8>>2]=v;o[h+12>>2]=1.0;b=k[r>>2]|0;b=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;d=k[a+8>>2]|0;d=Zd[k[(k[d>>2]|0)+36>>2]&255](d)|0;Qu(d);Ud[k[(k[e>>2]|0)+8>>2]&31](e,770,771,1,1);if(i[c+24>>0]|0){Js(m,0.0,-1.0);Gs(j,m,p);Gs(m,n,j);Yy(a,m,6280,0,b,1,d)|0;Yy(a,q,h,0,b,1,d)|0;}b=Yy(a,q,g,0,b,0,d)|0;}else b=0;}else{AN(f,c);CN(f);b=0;}Cy(r);u=s;return b|0;}function Xy(a){a=a|0;var b=0,c=0;c=u;u=u+16|0;b=c;a=a+44|0;if(Gv(a)|0)a=1;else{k[b>>2]=50462976;a=Hv(a,4,b,35044)|0;}u=c;return a|0;}function Yy(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0;rv(g+48|0,b);sv(g+64|0,c);h=k[e+4>>2]|0;b=1;d=k[e>>2]|0;while(1){if((d|0)==(h|0))break;c=k[d>>2]|0;if(c)b=b&(Zy(a,c,f,g)|0);d=d+8|0;}return b|0;}function Zy(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;f=u;u=u+48|0;e=f;ne[k[(k[b>>2]|0)+8>>2]&63](e,b,c);if((i[e>>0]|0)!=0?_y(a,e)|0:0){tv(d+80|0,16,0);tv(d+96|0,16,8);a=k[a>>2]|0;a=Zd[k[(k[a>>2]|0)+8>>2]&255](a)|0;Ud[k[(k[a>>2]|0)+104>>2]&31](a,5,4,5121,0);$y(d);a=1;}else a=0;u=f;return a|0;}function _y(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0.0,g=0.0,h=0,i=0.0,j=0,l=0.0;c=u;u=u+64|0;d=c;i=+NO(+ +o[b+4>>2]);l=+NO(+ +o[b+8>>2]);g=+NO(+ +o[b+12>>2]);f=+NO(+ +o[b+16>>2]);h=k[b+20>>2]|0;j=k[b+24>>2]|0;e=k[b+28>>2]|0;b=k[b+32>>2]|0;o[d>>2]=i;o[d+4>>2]=l;k[d+8>>2]=h;k[d+12>>2]=j;o[d+16>>2]=g;o[d+20>>2]=l;k[d+24>>2]=e;k[d+28>>2]=j;o[d+32>>2]=i;o[d+36>>2]=f;k[d+40>>2]=h;k[d+44>>2]=b;o[d+48>>2]=g;o[d+52>>2]=f;k[d+56>>2]=e;k[d+60>>2]=b;b=Dv(a+60|0,64,d,35044)|0;u=c;return b|0;}function $y(a){a=a|0;Iu(a+80|0);Iu(a+96|0);return;}function az(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,l=0,n=0,p=0,q=0;p=u;u=u+224|0;n=p+208|0;g=p+128|0;h=p+144|0;j=p+64|0;l=p+216|0;f=p;q=(Zd[k[(k[b>>2]|0)+16>>2]&255](b)|0)+8|0;mz(n,a+16|0,c,+o[q>>2]);if(k[n>>2]|0){if(Xy(a)|0){Fs(h);Fs(j);q=k[n>>2]|0;Vy(b,c+44|0,d,+ee[k[(k[q>>2]|0)+24>>2]&3](q),h,j);k[f>>2]=m[e>>1]|m[e+2>>1]<<16;i[f+4>>0]=0;KA(l,f);q=k[a+8>>2]|0;q=Zd[k[(k[q>>2]|0)+16>>2]&255](q)|0;Qu(q);Gs(f,h,j);rv(q+48|0,f);Nv(f,l);sv(q+64|0,f);l=k[n>>2]|0;a=bz(a,Zd[k[(k[l>>2]|0)+12>>2]&255](l)|0,q)|0;}else a=0;}else{AN(g,c);CN(g);a=0;}Cy(n);u=p;return a|0;}function bz(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=k[b+4>>2]|0;d=1;b=k[b>>2]|0;while(1){if((b|0)==(e|0))break;d=d&(cz(a,b,c)|0);b=b+16|0;}return d|0;}function cz(a,b,c){a=a|0;b=b|0;c=c|0;if(dz(a,b)|0){tv(c+80|0,12,0);uv(c+96|0,12,8);a=k[a>>2]|0;a=Zd[k[(k[a>>2]|0)+8>>2]&255](a)|0;Ud[k[(k[a>>2]|0)+104>>2]&31](a,5,4,5121,0);vv(c);a=1;}else a=0;return a|0;}function dz(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;c=u;u=u+48|0;d=c;f=k[b>>2]|0;g=k[b+4>>2]|0;e=k[b+8>>2]|0;b=k[b+12>>2]|0;k[d>>2]=f;k[d+4>>2]=g;o[d+8>>2]=1.0;k[d+12>>2]=e;k[d+16>>2]=g;o[d+20>>2]=1.0;k[d+24>>2]=f;k[d+28>>2]=b;o[d+32>>2]=1.0;k[d+36>>2]=e;k[d+40>>2]=b;o[d+44>>2]=1.0;b=Dv(a+60|0,48,d,35044)|0;u=c;return b|0;}function ez(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0.0,m=0,n=0,p=0,q=0,r=0,s=0.0,t=0.0,v=0.0,w=0.0,x=0;r=u;u=u+80|0;q=r+72|0;g=r+56|0;m=r+40|0;n=r+24|0;p=r+16|0;h=r+8|0;i=r;f=(Zd[k[(k[b>>2]|0)+16>>2]&255](b)|0)+8|0;j=+o[f>>2];mz(q,a+16|0,c,j);f=k[q>>2]|0;if(f){f=Zd[k[(k[f>>2]|0)+20>>2]&255](f)|0;g=f+8|0;if((k[f+12>>2]|0)-(k[g>>2]|0)>>3>>>0>d>>>0?Xy(a)|0:0){t=+(l[c+16>>0]|0)/255.0;o[m>>2]=t;s=+(l[c+17>>0]|0)/255.0;o[m+4>>2]=s;w=+(l[c+18>>0]|0)/255.0;o[m+8>>2]=w;o[m+12>>2]=1.0;w=t*.30000001192092896+s*.5899999737739563+w*.10999999940395355>.75?0.0:1.0;o[n>>2]=w;o[n+4>>2]=w;o[n+8>>2]=w;o[n+12>>2]=1.0;Ud[k[(k[e>>2]|0)+8>>2]&31](e,770,771,1,1);e=k[a+8>>2]|0;e=Zd[k[(k[e>>2]|0)+16>>2]&255](e)|0;Qu(e);rv(e+48|0,Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0);x=k[q>>2]|0;w=+ee[k[(k[x>>2]|0)+24>>2]&3](x);x=k[f>>2]|0;f=k[f+4>>2]|0;s=+ee[k[(k[b>>2]|0)+20>>2]&3](b);t=+NO(+(+(x|0)/w*s));s=+NO(+(+(f|0)/w*s));j=+NO(+j);f=k[g>>2]|0;v=+o[c+48>>2]+ +(k[f+(d<<3)+4>>2]|0)/w;o[p>>2]=+o[c+44>>2]+ +(k[f+(d<<3)>>2]|0)/w;o[p+4>>2]=v;ne[k[(k[b>>2]|0)+28>>2]&63](i,b,p);fz(h,b,i);gz(a,e,n,h,j*3.0,t,s)|0;f=gz(a,e,m,h,j,t,s)|0;}else f=0;}else{AN(g,c);CN(g);f=0;}Cy(q);u=r;return f|0;}function fz(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0,e=0.0,f=0;e=+o[c>>2];f=Zd[k[(k[b>>2]|0)+16>>2]&255](b)|0;e=e*+((k[f>>2]|0)>>>0);d=1.0-+o[c+4>>2];c=(Zd[k[(k[b>>2]|0)+16>>2]&255](b)|0)+4|0;d=d*+((k[c>>2]|0)>>>0);o[a>>2]=e;o[a+4>>2]=d;return;}function gz(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;f=+f;g=+g;sv(b+64|0,c);if(hz(a,d,e,f,g)|0){tv(b+80|0,12,0);uv(b+96|0,12,8);a=k[a>>2]|0;a=Zd[k[(k[a>>2]|0)+8>>2]&255](a)|0;Ud[k[(k[a>>2]|0)+104>>2]&31](a,5,4,5121,0);vv(b);a=1;}else a=0;return a|0;}function hz(a,b,c,d,e){a=a|0;b=b|0;c=+c;d=+d;e=+e;var f=0,g=0,h=0.0,i=0.0,j=0.0;f=u;u=u+48|0;g=f;j=c*.5;i=+NO(+(+o[b>>2]-j));h=+NO(+(i+c));j=+NO(+(+o[b+4>>2]-e-j));e=+NO(+(j+d+c));o[g>>2]=i;o[g+4>>2]=j;o[g+8>>2]=1.0;o[g+12>>2]=h;o[g+16>>2]=j;o[g+20>>2]=1.0;o[g+24>>2]=i;o[g+28>>2]=e;o[g+32>>2]=1.0;o[g+36>>2]=h;o[g+40>>2]=e;o[g+44>>2]=1.0;b=Dv(a+60|0,48,g,35044)|0;u=f;return b|0;}function iz(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,l=0.0,m=0.0,n=0.0,p=0.0,q=0.0;j=u;u=u+64|0;i=j+48|0;e=j+16|0;f=j+32|0;g=j+8|0;h=j;c=(Zd[k[(k[c>>2]|0)+16>>2]&255](c)|0)+8|0;mz(i,a+16|0,b,+o[c>>2]);a=k[i>>2]|0;if(!a){AN(e,b);CN(e);a=0;}else{a=Zd[k[(k[a>>2]|0)+16>>2]&255](a)|0;e=k[i>>2]|0;m=+ee[k[(k[e>>2]|0)+24>>2]&3](e);p=+o[b+44>>2];q=+o[b+48>>2];n=p+ +o[a>>2]/m;l=q+ +o[a+4>>2]/m;p=p+ +o[a+8>>2]/m;m=q+ +o[a+12>>2]/m;o[g>>2]=(p<n?p:n)+-15.0;o[g+4>>2]=(m<l?m:l)+-7.0;o[h>>2]=(n<p?p:n)+15.0;o[h+4>>2]=(l<m?m:l)+7.0;Ts(f,g,h);k[d>>2]=k[f>>2];k[d+4>>2]=k[f+4>>2];k[d+8>>2]=k[f+8>>2];k[d+12>>2]=k[f+12>>2];a=1;}Cy(i);u=j;return a|0;}function jz(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;f=f|0;var g=0,h=0,j=0;j=u;u=u+32|0;h=j+16|0;g=j;mz(h,a+16|0,c,d);a=k[h>>2]|0;a:do if(!a){AN(g,c);CN(g);}else switch(b|0){case 7:{e=Ry(Zd[k[(k[a>>2]|0)+20>>2]&255](a)|0,e,f)|0;break a;}case 6:{e=Py(Zd[k[(k[a>>2]|0)+20>>2]&255](a)|0,e,f)|0;break a;}case 4:{e=Ky(Zd[k[(k[a>>2]|0)+20>>2]&255](a)|0,e,k[c+40>>2]|0)|0;i[f>>0]=0;break a;}case 5:{e=Oy(Zd[k[(k[a>>2]|0)+20>>2]&255](a)|0,e,k[c+40>>2]|0)|0;i[f>>0]=0;break a;}default:break a;}while(0);Cy(h);u=j;return e|0;}function kz(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;f=f|0;var g=0,h=0,j=0,l=0;l=u;u=u+32|0;j=l+24|0;g=l;h=l+16|0;mz(j,a+16|0,c,d);a=k[j>>2]|0;if(!a){AN(g,c);CN(g);}else{i[f>>0]=0;e=Zd[k[(k[a>>2]|0)+20>>2]&255](a)|0;g=k[j>>2]|0;d=+ee[k[(k[g>>2]|0)+24>>2]&3](g);Ns(h,b,c+44|0);o[h>>2]=d*+o[h>>2];g=h+4|0;o[g>>2]=d*+o[g>>2];e=Sy(e,h)|0;}Cy(j);u=l;return e|0;}function lz(a,b){a=a|0;b=b|0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;k[a+12>>2]=0;o[a+16>>2]=1.0;k[a+20>>2]=k[b>>2];b=k[b+4>>2]|0;k[a+24>>2]=b;if(b|0)mN(b);return;}function mz(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;var e=0,f=0,g=0,h=0,i=0,j=0;j=u;u=u+32|0;f=j+16|0;g=j+8|0;h=j;k[a>>2]=0;i=a+4|0;k[i>>2]=0;if(!(nz(b,c,d,a)|0)){k[g>>2]=k[a>>2];e=k[i>>2]|0;k[g+4>>2]=e;if(e|0)mN(e);oz(h,b,c,d,g);e=k[h>>2]|0;b=h+4|0;c=k[b>>2]|0;k[h>>2]=0;k[b>>2]=0;k[f>>2]=k[a>>2];k[a>>2]=e;k[f+4>>2]=k[i>>2];k[i>>2]=c;Cy(f);Cy(h);Cy(g);}u=j;return;}function nz(a,b,c,d){a=a|0;b=b|0;c=+c;d=d|0;var e=0,f=0,g=0,h=0,i=0;i=u;u=u+16|0;h=i;f=wz(a,b)|0;if(!f)a=0;else{g=k[f+40>>2]|0;k[h>>2]=g;a=h+4|0;e=k[f+44>>2]|0;k[a>>2]=e;if(e|0)mN(e);k[h>>2]=k[d>>2];k[d>>2]=g;d=d+4|0;k[a>>2]=k[d>>2];k[d>>2]=e;Cy(h);a=xz(b,c,f+20|0)|0;}u=i;return a|0;}function oz(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;var f=0,g=0,h=0,i=0,l=0,m=0;l=u;u=u+48|0;g=l;i=l+12|0;h=pz(+o[c+20>>2])|0;m=k[b+20>>2]|0;f=c+28|0;ae[k[(k[m>>2]|0)+16>>2]&1](a,m,f,k[c+40>>2]|0,h,d,e);if(!(k[a>>2]|0)){AN(g,c);CN(g);}else{Dg(i,f);j[i+12>>1]=h;o[i+16>>2]=d;k[i+20>>2]=k[a>>2];a=k[a+4>>2]|0;k[i+24>>2]=a;if(a|0)mN(a);rz(qz(b,c)|0,i)|0;By(i);}u=l;return;}function pz(a){a=+a;var b=0;b=~~+NO(+(a*4.0))&65535;b=(b&65535)<4?4:b;return((b&65535)>160?160:b)|0;}function qz(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0.0,g=0.0,h=0,j=0,l=0,m=0,n=0,p=0,q=0,r=0,s=0,t=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;B=u;u=u+32|0;A=B+4|0;t=B;v=B+16|0;k[t>>2]=b;z=Vt(a+12|0,b)|0;x=a+4|0;h=k[x>>2]|0;y=(h|0)==0;a:do if(!y){n=h+-1|0;p=(n&h|0)==0;if(p)q=n&z;else q=(z>>>0)%(h>>>0)|0;c=k[(k[a>>2]|0)+(q<<2)>>2]|0;if(!c){c=q;w=19;}else{r=b+11|0;s=b+4|0;b:while(1){c=k[c>>2]|0;if(!c){c=q;w=19;break a;}d=k[c+4>>2]|0;if(p)d=d&n;else d=(d>>>0)%(h>>>0)|0;if((d|0)!=(q|0)){c=q;w=19;break a;}d=c+8|0;j=i[d+11>>0]|0;l=j<<24>>24<0;j=j&255;m=l?k[c+12>>2]|0:j;C=i[r>>0]|0;e=C<<24>>24<0;if((m|0)!=((e?k[s>>2]|0:C&255)|0))continue;e=e?k[b>>2]|0:b;if(l)if(!(Vn(k[d>>2]|0,e,m)|0))break;else continue;while(1){if(!j)break a;if((i[d>>0]|0)!=(i[e>>0]|0))continue b;j=j+-1|0;e=e+1|0;d=d+1|0;}}}}else{c=0;w=19;}while(0);if((w|0)==19){sz(A,a,z,39021,t,v);j=a+12|0;f=+(((k[j>>2]|0)+1|0)>>>0);g=+o[a+16>>2];do if(y|f>+(h>>>0)*g){c=(h>>>0>2&(h+-1&h|0)==0&1|h<<1)^1;d=~~+_(+(f/g))>>>0;tz(a,c>>>0<d>>>0?d:c);c=k[x>>2]|0;d=c+-1|0;if(!(d&c)){h=c;c=d&z;break;}else{h=c;c=(z>>>0)%(c>>>0)|0;break;}}while(0);d=k[(k[a>>2]|0)+(c<<2)>>2]|0;if(!d){e=a+8|0;k[k[A>>2]>>2]=k[e>>2];k[e>>2]=k[A>>2];k[(k[a>>2]|0)+(c<<2)>>2]=e;e=k[A>>2]|0;c=k[e>>2]|0;if(!c)c=A;else{c=k[c+4>>2]|0;d=h+-1|0;if(!(d&h))c=c&d;else c=(c>>>0)%(h>>>0)|0;k[(k[a>>2]|0)+(c<<2)>>2]=e;c=A;}}else{k[k[A>>2]>>2]=k[d>>2];k[d>>2]=k[A>>2];c=A;}C=k[c>>2]|0;k[j>>2]=(k[j>>2]|0)+1;k[c>>2]=0;c=C;}u=B;return c+20|0;}function rz(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;g=u;u=u+16|0;f=g;Kh(a,b)|0;e=b+12|0;d=k[e+4>>2]|0;c=a+12|0;k[c>>2]=k[e>>2];k[c+4>>2]=d;c=a+20|0;d=k[b+20>>2]|0;k[f>>2]=d;e=f+4|0;b=k[b+24>>2]|0;k[e>>2]=b;if(b|0)mN(b);k[f>>2]=k[c>>2];k[c>>2]=d;d=a+24|0;k[e>>2]=k[d>>2];k[d>>2]=b;Cy(f);u=g;return a|0;}function sz(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;d=rN(48)|0;k[a>>2]=d;k[a+4>>2]=b+8;f=a+8|0;i[f>>0]=0;AN(d+8|0,k[e>>2]|0);e=d+20|0;k[e>>2]=0;k[e+4>>2]=0;k[e+8>>2]=0;k[e+12>>2]=0;k[e+16>>2]=0;k[e+20>>2]=0;k[e+24>>2]=0;vz(e);i[f>>0]=1;f=k[a>>2]|0;k[f+4>>2]=c;k[f>>2]=0;return;}function tz(a,b){a=a|0;b=b|0;var c=0,d=0;if((b|0)!=1){if(b+-1&b)b=hN(b)|0;}else b=2;d=k[a+4>>2]|0;if(b>>>0<=d>>>0){if(b>>>0<d>>>0){c=~~+_(+(+((k[a+12>>2]|0)>>>0)/+o[a+16>>2]))>>>0;if(d>>>0>2&(d+-1&d|0)==0)c=1<<32-(ca(c+-1|0)|0);else c=hN(c)|0;b=b>>>0<c>>>0?c:b;if(b>>>0<d>>>0)uz(a,b);}}else uz(a,b);return;}function uz(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;d=a+4|0;a:do if(b){if(b>>>0>1073741823){a=rc(4)|0;GO(a);Ld(a|0,2912,370);}t=rN(b<<2)|0;c=k[a>>2]|0;k[a>>2]=t;if(c|0)vN(c);k[d>>2]=b;c=0;while(1){if((c|0)==(b|0))break;k[(k[a>>2]|0)+(c<<2)>>2]=0;c=c+1|0;}e=a+8|0;c=k[e>>2]|0;if(c|0){d=k[c+4>>2]|0;s=b+-1|0;t=(s&b|0)==0;if(t)d=d&s;else d=(d>>>0)%(b>>>0)|0;k[(k[a>>2]|0)+(d<<2)>>2]=e;while(1){r=c;b:while(1)while(1){c=k[r>>2]|0;if(!c)break a;e=k[c+4>>2]|0;if(t)q=e&s;else q=(e>>>0)%(b>>>0)|0;if((q|0)==(d|0)){r=c;continue b;}e=(k[a>>2]|0)+(q<<2)|0;if(!(k[e>>2]|0))break b;m=c+8|0;n=m+11|0;o=c+12|0;p=c;c:while(1){e=k[p>>2]|0;if(!e){f=34;break;}f=e+8|0;h=i[n>>0]|0;j=h<<24>>24<0;h=h&255;l=j?k[o>>2]|0:h;u=i[f+11>>0]|0;g=u<<24>>24<0;if((l|0)!=((g?k[e+12>>2]|0:u&255)|0)){f=34;break;}f=g?k[f>>2]|0:f;if(j){if(Vn(k[m>>2]|0,f,l)|0){f=31;break;}p=k[p>>2]|0;continue;}else g=m;while(1){if(!h){p=e;continue c;}if((i[g>>0]|0)!=(i[f>>0]|0)){f=33;break c;}h=h+-1|0;f=f+1|0;g=g+1|0;}}if((f|0)==31)e=k[p>>2]|0;k[r>>2]=e;k[p>>2]=k[k[(k[a>>2]|0)+(q<<2)>>2]>>2];k[k[(k[a>>2]|0)+(q<<2)>>2]>>2]=c;}k[e>>2]=r;d=q;}}}else{c=k[a>>2]|0;k[a>>2]=0;if(c|0)vN(c);k[d>>2]=0;}while(0);return;}function vz(a){a=a|0;var b=0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;b=0;while(1){if((b|0)==3)break;k[a+(b<<2)>>2]=0;b=b+1|0;}k[a+20>>2]=0;k[a+24>>2]=0;return;}function wz(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0;c=Vt(a+12|0,b)|0;m=k[a+4>>2]|0;a:do if(m){n=m+-1|0;o=(n&m|0)==0;if(o)l=n&c;else l=(c>>>0)%(m>>>0)|0;c=k[(k[a>>2]|0)+(l<<2)>>2]|0;if(c){h=b+11|0;j=b+4|0;b:while(1){c=k[c>>2]|0;if(!c){c=0;break a;}a=k[c+4>>2]|0;if(o)a=a&n;else a=(a>>>0)%(m>>>0)|0;if((a|0)!=(l|0)){c=0;break a;}a=c+8|0;e=i[a+11>>0]|0;f=e<<24>>24<0;e=e&255;g=f?k[c+12>>2]|0:e;p=i[h>>0]|0;d=p<<24>>24<0;if((g|0)!=((d?k[j>>2]|0:p&255)|0))continue;d=d?k[b>>2]|0:b;if(f)if(!(Vn(k[a>>2]|0,d,g)|0))break;else continue;while(1){if(!e)break a;if((i[a>>0]|0)!=(i[d>>0]|0))continue b;e=e+-1|0;d=d+1|0;a=a+1|0;}}}else c=0;}else c=0;while(0);return c|0;}function xz(a,b,c){a=a|0;b=+b;c=c|0;var d=0,e=0,f=0,g=0,h=0,l=0;l=pz(+o[a+20>>2])|0;a:do if((k[c+20>>2]|0)!=0?(g=a+28|0,d=i[c+8+3>>0]|0,h=d<<24>>24<0,d=h?k[c+4>>2]|0:d&255,e=i[a+36+3>>0]|0,f=e<<24>>24<0,(d|0)==((f?k[a+32>>2]|0:e&255)|0)):0){e=d;d=f?k[g>>2]|0:g;a=h?k[c>>2]|0:c;while(1){if(!e)break;if((k[d>>2]|0)!=(k[a>>2]|0)){a=0;break a;}e=e+-1|0;d=d+4|0;a=a+4|0;}if(+O(+(+o[c+16>>2]-b))<9.99999993922529e-09)a=(j[c+12>>1]|0)==l<<16>>16;else a=0;}else a=0;while(0);return a|0;}function yz(a,b,c){a=a|0;b=b|0;c=c|0;Fz(a,b,c);return;}function zz(a){a=a|0;return Gz(a)|0;}function Az(a,b,c,d,e,f,g,h,i,j,l,m){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;l=l|0;m=m|0;var n=0,o=0,p=0;n=u;u=u+16|0;o=n;p=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;k[o>>2]=k[p>>2];k[o+4>>2]=k[p+4>>2];k[o+8>>2]=k[p+8>>2];k[o+12>>2]=k[p+12>>2];Wd[k[(k[l>>2]|0)+8>>2]&511](l);Nz(a,h);Oz(a,Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0,c,i);Sz(a,Zd[k[(k[b>>2]|0)+16>>2]&255](b)|0,c,i,d,o,l,m);pA(a,o,c,i);Qz(a,Zd[k[(k[b>>2]|0)+20>>2]&255](b)|0,c,i,g);Wd[k[(k[j>>2]|0)+8>>2]&511](j);bA(a,j,l,i);Tz(a,e,c,i);$z(a,d,c,i);aA(a,f,c,i);u=n;return;}function Bz(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Wd[k[(k[e>>2]|0)+8>>2]&511](e);Nz(a,38420);cA(a,Zd[k[(k[b>>2]|0)+20>>2]&255](b)|0,c,3,d);return;}function Cz(a,b,c){a=a|0;b=b|0;c=c|0;Fz(a,b,c);return;}function Dz(a){a=a|0;return Gz(a)|0;}function Ez(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0;h=u;u=u+16|0;i=h;Wd[k[(k[f>>2]|0)+8>>2]&511](f);Nz(a,d);Oz(a,Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0,c,e);d=Zd[k[(k[b>>2]|0)+16>>2]&255](b)|0;k[i>>2]=0;k[i+4>>2]=0;Sz(a,d,c,e,i,Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0,f,g);Rk(i);Oz(a,Zd[k[(k[b>>2]|0)+20>>2]&255](b)|0,c,e);u=h;return;}function Fz(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=k[b>>2];b=k[b+4>>2]|0;k[a+4>>2]=b;if(b|0)mN(b);k[a+8>>2]=k[c>>2];b=k[c+4>>2]|0;k[a+12>>2]=b;if(b|0)mN(b);return;}function Gz(a){a=a|0;if(!(k[a>>2]|0))return 0;else return(k[a+8>>2]|0)!=0|0;return 0;}function Hz(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0.0,h=0.0,j=0,l=0,m=0,n=0,p=0,q=0,r=0,s=0,t=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0;F=u;u=u+16|0;d=F;B=a+16|0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;k[a+12>>2]=0;o[B>>2]=1.0;z=k[b+4>>2]|0;A=a+12|0;C=a+4|0;E=a+12|0;D=a+8|0;y=k[b>>2]|0;while(1){if((y|0)==(z|0))break;b=k[y>>2]|0;a:do if(b|0){v=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;x=Vt(A,v)|0;j=k[C>>2]|0;w=(j|0)==0;b:do if(!w){q=j+-1|0;r=(q&j|0)==0;if(r)b=q&x;else b=(x>>>0)%(j>>>0)|0;e=k[(k[a>>2]|0)+(b<<2)>>2]|0;if(e){s=v+11|0;t=v+4|0;c:while(1){e=k[e>>2]|0;if(!e)break b;f=k[e+4>>2]|0;if(r)f=f&q;else f=(f>>>0)%(j>>>0)|0;if((f|0)!=(b|0))break b;f=e+8|0;m=i[f+11>>0]|0;n=m<<24>>24<0;m=m&255;p=n?k[e+12>>2]|0:m;G=i[s>>0]|0;l=G<<24>>24<0;if((p|0)!=((l?k[t>>2]|0:G&255)|0))continue;l=l?k[v>>2]|0:v;if(n)if(!(Vn(k[f>>2]|0,l,p)|0))break a;else continue;while(1){if(!m)break a;if((i[f>>0]|0)!=(i[l>>0]|0))continue c;m=m+-1|0;l=l+1|0;f=f+1|0;}}}}else b=0;while(0);Iz(d,a,x,v);g=+(((k[E>>2]|0)+1|0)>>>0);h=+o[B>>2];do if(w|g>+(j>>>0)*h){b=(j>>>0>2&(j+-1&j|0)==0&1|j<<1)^1;e=~~+_(+(g/h))>>>0;Jz(a,b>>>0<e>>>0?e:b);b=k[C>>2]|0;e=b+-1|0;if(!(e&b)){j=b;b=e&x;break;}else{j=b;b=(x>>>0)%(b>>>0)|0;break;}}while(0);e=k[(k[a>>2]|0)+(b<<2)>>2]|0;if(!e){k[k[d>>2]>>2]=k[D>>2];k[D>>2]=k[d>>2];k[(k[a>>2]|0)+(b<<2)>>2]=D;f=k[d>>2]|0;b=k[f>>2]|0;if(b|0){b=k[b+4>>2]|0;e=j+-1|0;if(!(e&j))b=b&e;else b=(b>>>0)%(j>>>0)|0;k[(k[a>>2]|0)+(b<<2)>>2]=f;}}else{k[k[d>>2]>>2]=k[e>>2];k[e>>2]=k[d>>2];}k[E>>2]=(k[E>>2]|0)+1;}while(0);y=y+8|0;}b=k[c>>2]|0;d:do if(b|0){v=Zd[k[(k[b>>2]|0)+12>>2]&255](b)|0;x=Vt(A,v)|0;j=k[C>>2]|0;w=(j|0)==0;e:do if(!w){q=j+-1|0;r=(q&j|0)==0;if(r)b=q&x;else b=(x>>>0)%(j>>>0)|0;e=k[(k[a>>2]|0)+(b<<2)>>2]|0;if(e){s=v+11|0;t=v+4|0;f:while(1){e=k[e>>2]|0;if(!e)break e;f=k[e+4>>2]|0;if(r)f=f&q;else f=(f>>>0)%(j>>>0)|0;if((f|0)!=(b|0))break e;f=e+8|0;m=i[f+11>>0]|0;n=m<<24>>24<0;m=m&255;p=n?k[e+12>>2]|0:m;G=i[s>>0]|0;l=G<<24>>24<0;if((p|0)!=((l?k[t>>2]|0:G&255)|0))continue;l=l?k[v>>2]|0:v;if(n)if(!(Vn(k[f>>2]|0,l,p)|0))break d;else continue;while(1){if(!m)break d;if((i[f>>0]|0)!=(i[l>>0]|0))continue f;m=m+-1|0;l=l+1|0;f=f+1|0;}}}}else b=0;while(0);Iz(d,a,x,v);h=+(((k[E>>2]|0)+1|0)>>>0);g=+o[B>>2];do if(w|h>+(j>>>0)*g){b=(j>>>0>2&(j+-1&j|0)==0&1|j<<1)^1;e=~~+_(+(h/g))>>>0;Jz(a,b>>>0<e>>>0?e:b);b=k[C>>2]|0;e=b+-1|0;if(!(e&b)){j=b;b=e&x;break;}else{j=b;b=(x>>>0)%(b>>>0)|0;break;}}while(0);e=k[(k[a>>2]|0)+(b<<2)>>2]|0;if(!e){k[k[d>>2]>>2]=k[D>>2];k[D>>2]=k[d>>2];k[(k[a>>2]|0)+(b<<2)>>2]=D;f=k[d>>2]|0;b=k[f>>2]|0;if(b){b=k[b+4>>2]|0;e=j+-1|0;if(!(e&j))b=b&e;else b=(b>>>0)%(j>>>0)|0;k[(k[a>>2]|0)+(b<<2)>>2]=f;}}else{k[k[d>>2]>>2]=k[e>>2];k[e>>2]=k[d>>2];}k[E>>2]=(k[E>>2]|0)+1;k[d>>2]=0;}while(0);u=F;return;}function Iz(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=rN(20)|0;k[a>>2]=e;k[a+4>>2]=b+8;b=a+8|0;i[b>>0]=0;AN(e+8|0,d);i[b>>0]=1;k[e+4>>2]=c;k[e>>2]=0;return;}function Jz(a,b){a=a|0;b=b|0;var c=0,d=0;if((b|0)!=1){if(b+-1&b)b=hN(b)|0;}else b=2;d=k[a+4>>2]|0;if(b>>>0<=d>>>0){if(b>>>0<d>>>0){c=~~+_(+(+((k[a+12>>2]|0)>>>0)/+o[a+16>>2]))>>>0;if(d>>>0>2&(d+-1&d|0)==0)c=1<<32-(ca(c+-1|0)|0);else c=hN(c)|0;b=b>>>0<c>>>0?c:b;if(b>>>0<d>>>0)Mz(a,b);}}else Mz(a,b);return;}function Kz(a){a=a|0;var b=0;Lz(a,k[a+8>>2]|0);b=k[a>>2]|0;k[a>>2]=0;if(b|0)vN(b);return;}function Lz(a,b){a=a|0;b=b|0;while(1){if(!b)break;a=k[b>>2]|0;CN(b+8|0);vN(b);b=a;}return;}function Mz(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;d=a+4|0;a:do if(b){if(b>>>0>1073741823){a=rc(4)|0;GO(a);Ld(a|0,2912,370);}t=rN(b<<2)|0;c=k[a>>2]|0;k[a>>2]=t;if(c|0)vN(c);k[d>>2]=b;c=0;while(1){if((c|0)==(b|0))break;k[(k[a>>2]|0)+(c<<2)>>2]=0;c=c+1|0;}e=a+8|0;c=k[e>>2]|0;if(c|0){d=k[c+4>>2]|0;s=b+-1|0;t=(s&b|0)==0;if(t)d=d&s;else d=(d>>>0)%(b>>>0)|0;k[(k[a>>2]|0)+(d<<2)>>2]=e;while(1){r=c;b:while(1)while(1){c=k[r>>2]|0;if(!c)break a;e=k[c+4>>2]|0;if(t)q=e&s;else q=(e>>>0)%(b>>>0)|0;if((q|0)==(d|0)){r=c;continue b;}e=(k[a>>2]|0)+(q<<2)|0;if(!(k[e>>2]|0))break b;m=c+8|0;n=m+11|0;o=c+12|0;p=c;c:while(1){e=k[p>>2]|0;if(!e){f=34;break;}f=e+8|0;h=i[n>>0]|0;j=h<<24>>24<0;h=h&255;l=j?k[o>>2]|0:h;u=i[f+11>>0]|0;g=u<<24>>24<0;if((l|0)!=((g?k[e+12>>2]|0:u&255)|0)){f=34;break;}f=g?k[f>>2]|0:f;if(j){if(Vn(k[m>>2]|0,f,l)|0){f=31;break;}p=k[p>>2]|0;continue;}else g=m;while(1){if(!h){p=e;continue c;}if((i[g>>0]|0)!=(i[f>>0]|0)){f=33;break c;}h=h+-1|0;f=f+1|0;g=g+1|0;}}if((f|0)==31)e=k[p>>2]|0;k[r>>2]=e;k[p>>2]=k[k[(k[a>>2]|0)+(q<<2)>>2]>>2];k[k[(k[a>>2]|0)+(q<<2)>>2]>>2]=c;}k[e>>2]=r;d=q;}}}else{c=k[a>>2]|0;k[a>>2]=0;if(c|0)vN(c);k[d>>2]=0;}while(0);return;}function Nz(a,b){a=a|0;b=b|0;a=k[a+8>>2]|0;a=Zd[k[(k[a>>2]|0)+8>>2]&255](a)|0;fe[k[(k[a>>2]|0)+52>>2]&3](a,+o[b>>2],+o[b+4>>2],+o[b+8>>2],+o[b+12>>2]);Xd[k[(k[a>>2]|0)+48>>2]&255](a,16384);return;}function Oz(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;f=k[b+4>>2]|0;b=k[b>>2]|0;while(1){if((b|0)==(f|0))break;e=k[b>>2]|0;if(e|0)Pz(a,e,c,d,38412);b=b+8|0;}return;}function Pz(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;switch(k[b+12>>2]|0){case 4:{mv(k[a>>2]|0,c,b,e,d)|0;break;}case 5:{kw((k[a>>2]|0)+184|0,c,b,e,d)|0;break;}case 1:{Sv((k[a>>2]|0)+80|0,c,b,d)|0;break;}case 3:{qx((k[a>>2]|0)+380|0,c,b,e,d)|0;break;}case 6:{Kx((k[a>>2]|0)+572|0,c,b,e,d)|0;break;}case 7:{Wy((k[a>>2]|0)+620|0,c,b,e,d)|0;break;}case 8:{cy((k[a>>2]|0)+696|0,c,b,e,d)|0;break;}default:{}}return;}function Qz(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;g=k[b+4>>2]|0;b=k[b>>2]|0;while(1){if((b|0)==(g|0))break;f=k[b>>2]|0;if(f|0?(Rz(e,f)|0)==0:0)Pz(a,k[b>>2]|0,c,d,38412);b=b+8|0;}return;}function Rz(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0;c=Vt(a+12|0,b)|0;m=k[a+4>>2]|0;a:do if(m){n=m+-1|0;o=(n&m|0)==0;if(o)l=n&c;else l=(c>>>0)%(m>>>0)|0;c=k[(k[a>>2]|0)+(l<<2)>>2]|0;if(c){h=b+11|0;j=b+4|0;b:while(1){c=k[c>>2]|0;if(!c){c=0;break a;}a=k[c+4>>2]|0;if(o)a=a&n;else a=(a>>>0)%(m>>>0)|0;if((a|0)!=(l|0)){c=0;break a;}a=c+8|0;e=i[a+11>>0]|0;f=e<<24>>24<0;e=e&255;g=f?k[c+12>>2]|0:e;p=i[h>>0]|0;d=p<<24>>24<0;if((g|0)!=((d?k[j>>2]|0:p&255)|0))continue;d=d?k[b>>2]|0:b;if(f)if(!(Vn(k[a>>2]|0,d,g)|0))break;else continue;while(1){if(!e)break a;if((i[a>>0]|0)!=(i[d>>0]|0))continue b;e=e+-1|0;d=d+1|0;a=a+1|0;}}}else c=0;}else c=0;while(0);return c|0;}function Sz(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0,l=0;i=k[e>>2]|0;if(!i)l=0;else{l=(Zd[k[(k[i>>2]|0)+8>>2]&255](i)|0)+12|0;l=(k[l>>2]|0)==2;}i=b+4|0;if(l|(k[b>>2]|0)!=(k[i>>2]|0)){Wd[k[(k[h>>2]|0)+8>>2]&511](h);Nz(a,38420);Zv((k[a>>2]|0)+136|0,c,g+4|0,d)|0;Wd[k[(k[g>>2]|0)+8>>2]&511](g);j=k[i>>2]|0;h=h+4|0;i=k[b>>2]|0;while(1){if((i|0)==(j|0))break;g=k[i>>2]|0;if(g|0)cw((k[a>>2]|0)+136|0,c,g,h,f,d)|0;i=i+8|0;}if(l){e=k[e>>2]|0;e=Zd[k[(k[e>>2]|0)+8>>2]&255](e)|0;cw((k[a>>2]|0)+136|0,c,e,h,f,d)|0;}}return;}function Tz(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0;f=k[b+4>>2]|0;b=k[b>>2]|0;while(1){if((b|0)==(f|0))break;e=k[b>>2]|0;if(e|0){e=Zd[k[(k[e>>2]|0)+8>>2]&255](e)|0;g=k[b>>2]|0;Pz(a,e,c,d,Zd[k[(k[g>>2]|0)+24>>2]&255](g)|0);g=k[b>>2]|0;g=Zd[k[(k[g>>2]|0)+8>>2]&255](g)|0;e=k[b>>2]|0;Uz(a,g,c,d,Zd[k[(k[e>>2]|0)+24>>2]&255](e)|0);}b=b+8|0;}return;}function Uz(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;switch(k[b+12>>2]|0){case 4:{Vz(a,b,c,d,e);break;}case 5:{Wz(a,b,c,0,e);break;}case 3:{Xz(a,b,c,d,e);break;}case 6:{Yz(a,b,c,d,e);break;}case 8:{Zz(a,b,c,d,e);break;}case 7:{_z(a,b,c,0,e);break;}default:{}}return;}function Vz(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0.0,h=0;f=u;u=u+16|0;h=f;a=(k[a>>2]|0)+460|0;g=+o[b+20>>2];Ms(h,b+28|0,e);Cx(a,c,h,g,d)|0;Ms(h,b+36|0,e);Cx(a,c,h,g,d)|0;u=f;return;}function Wz(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;f=u;u=u+32|0;g=f+16|0;d=f;YD(g,b);Xs(d,g,+pm(c,3.0));if(!(Ws(d)|0))Gy((k[a>>2]|0)+524|0,d,e,c)|0;u=f;return;}function Xz(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0.0,h=0;f=u;u=u+16|0;h=f;a=(k[a>>2]|0)+460|0;g=+o[b+20>>2];Ms(h,b+28|0,e);Cx(a,c,h,g,d)|0;Ms(h,b+36|0,e);Cx(a,c,h,g,d)|0;u=f;return;}function Yz(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0.0,h=0,i=0,j=0,l=0,m=0,n=0,p=0.0,q=0;f=u;u=u+48|0;n=f+40|0;m=f+32|0;l=f+24|0;j=f+16|0;h=f+8|0;i=f;a=(k[a>>2]|0)+460|0;g=+o[b+20>>2];q=k[b+40>>2]|0;o[n>>2]=0.0;k[n+4>>2]=q;p=-(k[s>>2]=q,+o[s>>2]);o[m>>2]=0.0;o[m+4>>2]=p;p=+o[b+36>>2];o[l>>2]=-p;o[l+4>>2]=0.0;o[j>>2]=p;o[j+4>>2]=0.0;b=b+28|0;Ms(i,b,n);Ms(h,i,e);Cx(a,c,h,g,d)|0;Ms(i,b,m);Ms(h,i,e);Cx(a,c,h,g,d)|0;Ms(i,b,l);Ms(h,i,e);Cx(a,c,h,g,d)|0;Ms(i,b,j);Ms(h,i,e);Cx(a,c,h,g,d)|0;u=f;return;}function Zz(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0.0,h=0,i=0,j=0,l=0,m=0,n=0,p=0,q=0;f=u;u=u+48|0;m=f+32|0;l=f+24|0;j=f+16|0;i=f+8|0;h=f;a=(k[a>>2]|0)+460|0;g=+o[b+20>>2];p=k[b+28>>2]|0;q=k[b+40>>2]|0;k[m>>2]=p;k[m+4>>2]=q;n=k[b+36>>2]|0;k[l>>2]=n;k[l+4>>2]=q;b=k[b+32>>2]|0;k[j>>2]=p;k[j+4>>2]=b;k[i>>2]=n;k[i+4>>2]=b;Ms(h,m,e);Cx(a,c,h,g,d)|0;Ms(h,l,e);Cx(a,c,h,g,d)|0;Ms(h,j,e);Cx(a,c,h,g,d)|0;Ms(h,i,e);Cx(a,c,h,g,d)|0;u=f;return;}function _z(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0;f=u;u=u+16|0;d=f;Ss(d);if(iz((k[a>>2]|0)+620|0,b,c,d)|0)Gy((k[a>>2]|0)+524|0,d,e,c)|0;u=f;return;}function $z(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=k[b>>2]|0;if(e|0?(e=(Zd[k[(k[e>>2]|0)+8>>2]&255](e)|0)+12|0,(k[e>>2]|0)!=2):0){e=k[b>>2]|0;Pz(a,Zd[k[(k[e>>2]|0)+8>>2]&255](e)|0,c,d,38412);}return;}function aA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=k[b>>2]|0;if(e|0?(f=Zd[k[(k[e>>2]|0)+12>>2]&255](e)|0,Pz(a,f,c,d,38412),_z(a,f,c,0,38412),e=k[b>>2]|0,Zd[k[(k[e>>2]|0)+40>>2]&255](e)|0):0){a=(k[a>>2]|0)+620|0;e=k[b>>2]|0;ez(a,c,f,Zd[k[(k[e>>2]|0)+32>>2]&255](e)|0,d)|0;}return;}function bA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;dx((k[a>>2]|0)+284|0,b,c+4|0,d)|0;return;}function cA(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,l=0,m=0,n=0,o=0,p=0,q=0;q=u;u=u+16|0;m=q+8|0;n=q;o=b+4|0;p=m+2|0;l=n+4|0;h=k[b>>2]|0;while(1){if((h|0)==(k[o>>2]|0))break;i[m>>0]=d;j[p>>1]=(h-(k[b>>2]|0)|0)>>>3;f=k[h>>2]|0;k[n>>2]=f;g=k[h+4>>2]|0;k[l>>2]=g;if(g){mN(g);f=k[n>>2]|0;}if(f|0?(dA(a,f,c,m),Rz(e,k[n>>2]|0)|0):0)eA(a,k[n>>2]|0,c,m);Ng(n);h=h+8|0;}u=q;return;}function dA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;switch(k[b+12>>2]|0){case 4:{jA(a,b,c,d);break;}case 5:{kA(a,b,c,d);break;}case 3:{lA(a,b,c,d);break;}case 6:{mA(a,b,c,d);break;}case 7:{nA(a,b,c,d);break;}case 8:{oA(a,b,c,d);break;}default:{}}return;}function eA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;switch(k[b+12>>2]|0){case 4:{fA(a,b,c,d);break;}case 3:{gA(a,b,c,d);break;}case 6:{hA(a,b,c,d);break;}case 8:{iA(a,b,c,d);break;}default:{}}return;}function fA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0.0;a=(k[a>>2]|0)+460|0;e=+o[b+20>>2];Gx(a,c,b+28|0,e,d,1)|0;Gx(a,c,b+36|0,e,d,2)|0;return;}function gA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0.0;a=(k[a>>2]|0)+460|0;e=+o[b+20>>2];Gx(a,c,b+28|0,e,d,1)|0;Gx(a,c,b+36|0,e,d,2)|0;return;}function hA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0.0,g=0,h=0,i=0,j=0,l=0,m=0.0,n=0;e=u;u=u+48|0;l=e+32|0;j=e+24|0;i=e+16|0;h=e+8|0;g=e;a=(k[a>>2]|0)+460|0;f=+o[b+20>>2];n=k[b+40>>2]|0;o[l>>2]=0.0;k[l+4>>2]=n;m=-(k[s>>2]=n,+o[s>>2]);o[j>>2]=0.0;o[j+4>>2]=m;m=+o[b+36>>2];o[i>>2]=-m;o[i+4>>2]=0.0;o[h>>2]=m;o[h+4>>2]=0.0;b=b+28|0;Ms(g,b,l);Gx(a,c,g,f,d,1)|0;Ms(g,b,j);Gx(a,c,g,f,d,2)|0;Ms(g,b,i);Gx(a,c,g,f,d,3)|0;Ms(g,b,h);Gx(a,c,g,f,d,4)|0;u=e;return;}function iA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0.0,g=0,h=0,i=0,j=0,l=0,m=0,n=0;e=u;u=u+32|0;j=e+24|0;i=e+16|0;h=e+8|0;g=e;a=(k[a>>2]|0)+460|0;f=+o[b+20>>2];m=k[b+28>>2]|0;n=k[b+40>>2]|0;k[j>>2]=m;k[j+4>>2]=n;l=k[b+36>>2]|0;k[i>>2]=l;k[i+4>>2]=n;b=k[b+32>>2]|0;k[h>>2]=m;k[h+4>>2]=b;k[g>>2]=l;k[g+4>>2]=b;Gx(a,c,j,f,d,1)|0;Gx(a,c,i,f,d,2)|0;Gx(a,c,h,f,d,3)|0;Gx(a,c,g,f,d,4)|0;u=e;return;}function jA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Kv(k[a>>2]|0,c,b,38412,d)|0;return;}function kA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Pw((k[a>>2]|0)+184|0,c,b,38412,d)|0;return;}function lA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;xx((k[a>>2]|0)+380|0,c,b,38412,d)|0;return;}function mA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;_x((k[a>>2]|0)+572|0,c,b,38412,d)|0;return;}function nA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;az((k[a>>2]|0)+620|0,c,b,38412,d)|0;return;}function oA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;gy((k[a>>2]|0)+696|0,c,b,38412,d)|0;return;}function pA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;jx((k[a>>2]|0)+332|0,c,b,d)|0;return;}function qA(a,b,c){a=a|0;b=b|0;c=c|0;Fz(a,b,c);return;}function rA(a){a=a|0;return Gz(a)|0;}function sA(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;Wd[k[(k[g>>2]|0)+8>>2]&511](g);bA(a,g,h,f);Tz(a,d,b,f);$z(a,c,b,f);aA(a,e,b,f);return;}function tA(a){a=a|0;k[a>>2]=6304;xA(a);ct(a+4|0);return;}function uA(a){a=a|0;tA(a);vN(a);return;}function vA(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;f=k[a+4>>2]|0;if(f|0){g=Zd[k[(k[f>>2]|0)+8>>2]&255](f)|0;f=a+13|0;if(!(i[f>>0]|0)){Xd[k[(k[g>>2]|0)+108>>2]&255](g,3042);i[f>>0]=1;}f=a+14|0;if(!(i[f>>0]|0)){ne[k[(k[g>>2]|0)+148>>2]&63](g,32969,a+16|0);ne[k[(k[g>>2]|0)+148>>2]&63](g,32968,a+20|0);ne[k[(k[g>>2]|0)+148>>2]&63](g,32971,a+24|0);ne[k[(k[g>>2]|0)+148>>2]&63](g,32970,a+28|0);i[f>>0]=1;}Ud[k[(k[g>>2]|0)+36>>2]&31](g,b,c,d,e);}return;}function wA(a){a=a|0;var b=0,c=0;b=k[a+4>>2]|0;if(b|0?(c=a+13|0,i[c>>0]|0):0){b=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;Xd[k[(k[b>>2]|0)+96>>2]&255](b,3042);i[c>>0]=0;}return;}function xA(a){a=a|0;var b=0,c=0,d=0,e=0;e=a+4|0;b=k[e>>2]|0;if(b|0){d=i[a+12>>0]|0;do if((i[a+13>>0]|0)!=d<<24>>24){b=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;c=k[b>>2]|0;if(!(d<<24>>24)){Xd[k[c+96>>2]&255](b,3042);break;}else{Xd[k[c+108>>2]&255](b,3042);break;}}while(0);b=a+14|0;if(i[b>>0]|0){e=k[e>>2]|0;e=Zd[k[(k[e>>2]|0)+8>>2]&255](e)|0;Ud[k[(k[e>>2]|0)+36>>2]&31](e,k[a+16>>2]|0,k[a+20>>2]|0,k[a+24>>2]|0,k[a+28>>2]|0);i[b>>0]=0;}}return;}function yA(a,b){a=a|0;b=b|0;k[a>>2]=6304;k[a+4>>2]=k[b>>2];b=k[b+4>>2]|0;k[a+8>>2]=b;if(b|0)mN(b);i[a+12>>0]=0;i[a+13>>0]=0;i[a+14>>0]=0;zA(a);return;}function zA(a){a=a|0;var b=0;b=k[a+4>>2]|0;if(b|0){b=Zd[k[(k[b>>2]|0)+8>>2]&255](b)|0;b=(je[k[(k[b>>2]|0)+172>>2]&127](b,3042)|0)<<24>>24==1&1;i[a+12>>0]=b;i[a+13>>0]=b;}return;}function AA(a){a=a|0;return(k[a+4>>2]|0)!=0|0;}function BA(a){a=a|0;return;}function CA(a){a=a|0;vN(a);return;}function DA(a){a=a|0;return a+4|0;}function EA(a){a=a|0;return a+68|0;}function FA(a){a=a|0;return a+132|0;}function GA(a){a=a|0;return 1.0;}function HA(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0;d=+o[b+148>>2]+(1.0-+o[c+4>>2])*+((k[b+136>>2]|0)>>>0);o[a>>2]=+o[b+144>>2]+ +o[c>>2]*+((k[b+132>>2]|0)>>>0);o[a+4>>2]=d;return;}function IA(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0;d=1.0-(+o[c+4>>2]-+o[b+148>>2])/+((k[b+136>>2]|0)>>>0);o[a>>2]=(+o[c>>2]-+o[b+144>>2])/+((k[b+132>>2]|0)>>>0);o[a+4>>2]=d;return;}function JA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0.0,l=0.0;i=u;u=u+64|0;g=i;k[a>>2]=6328;e=a+4|0;Fs(e);h=a+68|0;Fs(h);f=a+132|0;b=Zd[k[(k[b>>2]|0)+16>>2]&255](b)|0;k[f>>2]=k[b>>2];k[f+4>>2]=k[b+4>>2];k[f+8>>2]=k[b+8>>2];Is(g,+((k[f>>2]|0)>>>0),+((k[a+136>>2]|0)>>>0));b=e;e=g;f=b+64|0;do{k[b>>2]=k[e>>2];b=b+4|0;e=e+4|0;}while((b|0)<(f|0));b=Zd[k[(k[c>>2]|0)+8>>2]&255](c)|0;l=+(k[d>>2]|0);l=l+ +NO(+ +o[b>>2]);o[a+144>>2]=l;j=+NO(+ +o[b+12>>2]);j=j-+(((k[d+4>>2]|0)+(k[d+12>>2]|0)|0)>>>0);o[a+148>>2]=j;Js(g,-l,-j);b=h;e=g;f=b+64|0;do{k[b>>2]=k[e>>2];b=b+4|0;e=e+4|0;}while((b|0)<(f|0));u=i;return;}function KA(a,b){a=a|0;b=b|0;var c=0;i[a>>0]=i[b>>0]|0;c=j[b+2>>1]|0;i[a+1>>0]=(c&65535)>>>8;i[a+2>>0]=c;i[a+3>>0]=i[b+4>>0]|0;return;}function LA(a,b){a=a|0;b=b|0;var c=0,d=0;c=i[b>>0]|0;if((c&255)>3){d=0;b=0;c=0;}else{d=i[b+3>>0]|0;b=((l[b+1>>0]|0)<<8|(l[b+2>>0]|0))&65535;}i[a>>0]=c;j[a+2>>1]=b;i[a+4>>0]=d;return;}function MA(a){a=a|0;k[a>>2]=6368;k[a+4>>2]=6428;bB(a+24|0);bB(a+16|0);bB(a+8|0);return;}function NA(a){a=a|0;MA(a);vN(a);return;}function OA(a){a=a|0;return k[a+8>>2]|0;}function PA(a){a=a|0;return j[a+32>>1]|0;}function QA(a){a=a|0;var b=0,c=0;c=u;u=u+16|0;b=c;k[b>>2]=0;a=k[a+8>>2]|0;ne[k[(k[a>>2]|0)+148>>2]&63](a,3379,b);a=k[b>>2]|0;if(a>>>0<64){k[b>>2]=64;a=64;}u=c;return a|0;}function RA(a,b){a=a|0;b=b|0;var c=0,d=0;c=u;u=u+16|0;d=c;k[d>>2]=b;b=k[a+8>>2]|0;ne[k[(k[b>>2]|0)+68>>2]&63](b,1,d);u=c;return;}function SA(a,b){a=a|0;b=b|0;var c=0,d=0;c=u;u=u+16|0;d=c;k[d>>2]=b;b=k[a+8>>2]|0;ne[k[(k[b>>2]|0)+72>>2]&63](b,1,d);u=c;return;}function TA(a,b){a=a|0;b=b|0;a=k[a+8>>2]|0;Xd[k[(k[a>>2]|0)+76>>2]&255](a,b);return;}function UA(a,b){a=a|0;b=b|0;var c=0,d=0;c=u;u=u+16|0;d=c;k[d>>2]=b;b=k[a+8>>2]|0;ne[k[(k[b>>2]|0)+80>>2]&63](b,1,d);u=c;return;}function VA(a,b){a=a|0;b=b|0;a=k[a+8>>2]|0;Xd[k[(k[a>>2]|0)+84>>2]&255](a,b);return;}function WA(a,b){a=a|0;b=b|0;var c=0,d=0;c=u;u=u+16|0;d=c;k[d>>2]=b;b=k[a+8>>2]|0;ne[k[(k[b>>2]|0)+88>>2]&63](b,1,d);u=c;return;}function NM(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0;h=u;u=u+256|0;g=h;do if((c|0)>(d|0)&(e&73728|0)==0){e=c-d|0;WO(g|0,b|0,(e>>>0>256?256:e)|0)|0;b=k[a>>2]|0;f=(b&32|0)==0;if(e>>>0>255){c=c-d|0;do{if(f){IM(g,256,a)|0;b=k[a>>2]|0;}e=e+-256|0;f=(b&32|0)==0;}while(e>>>0>255);if(f)e=c&255;else break;}else if(!f)break;IM(g,e,a)|0;}while(0);u=h;return;}function OM(a,b){a=a|0;b=b|0;if(!a)a=0;else a=RM(a,b,0)|0;return a|0;}function PM(a,b){a=+a;b=b|0;return+ +QM(a,b);}function QM(a,b){a=+a;b=b|0;var c=0,d=0,e=0;p[s>>3]=a;c=k[s>>2]|0;d=k[s+4>>2]|0;e=OO(c|0,d|0,52)|0;switch(e&2047){case 0:{if(a!=0.0){a=+QM(a*18446744073709551616.0,b);c=(k[b>>2]|0)+-64|0;}else c=0;k[b>>2]=c;break;}case 2047:break;default:{k[b>>2]=(e&2047)+-1022;k[s>>2]=c;k[s+4>>2]=d&-2146435073|1071644672;a=+p[s>>3];}}return+a;}function RM(a,b,c){a=a|0;b=b|0;c=c|0;do if(a){if(b>>>0<128){i[a>>0]=b;a=1;break;}c=(yM()|0)+188|0;if(!(k[k[c>>2]>>2]|0))if((b&-128|0)==57216){i[a>>0]=b;a=1;break;}else{a=xM()|0;k[a>>2]=84;a=-1;break;}if(b>>>0<2048){i[a>>0]=b>>>6|192;i[a+1>>0]=b&63|128;a=2;break;}if(b>>>0<55296|(b&-8192|0)==57344){i[a>>0]=b>>>12|224;i[a+1>>0]=b>>>6&63|128;i[a+2>>0]=b&63|128;a=3;break;}if((b+-65536|0)>>>0<1048576){i[a>>0]=b>>>18|240;i[a+1>>0]=b>>>12&63|128;i[a+2>>0]=b>>>6&63|128;i[a+3>>0]=b&63|128;a=4;break;}else{a=xM()|0;k[a>>2]=84;a=-1;break;}}else a=1;while(0);return a|0;}function SM(a,b){a=a|0;b=b|0;var c=0,d=0;d=0;while(1){if((l[35283+d>>0]|0)==(a|0)){a=2;break;}c=d+1|0;if((c|0)==87){c=35371;d=87;a=5;break;}else d=c;}if((a|0)==2)if(!d)c=35371;else{c=35371;a=5;}if((a|0)==5)while(1){do{a=c;c=c+1|0;}while((i[a>>0]|0)!=0);d=d+-1|0;if(!d)break;else a=5;}return TM(c,k[b+20>>2]|0)|0;}function TM(a,b){a=a|0;b=b|0;return UM(a,b)|0;}function UM(a,b){a=a|0;b=b|0;if(!b)b=0;else b=VM(k[b>>2]|0,k[b+4>>2]|0,a)|0;return(b|0?b:a)|0;}function VM(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0;n=k[a+8>>2]|0;o=(k[a>>2]|0)==-1794895138;f=VO(n|0)|0;f=o?n:f;n=k[a+12>>2]|0;d=VO(n|0)|0;d=o?n:d;n=k[a+16>>2]|0;e=VO(n|0)|0;e=o?n:e;a:do if((f>>>0<b>>>2>>>0?(n=b-(f<<2)|0,d>>>0<n>>>0&e>>>0<n>>>0):0)?((e|d)&3|0)==0:0){n=d>>>2;m=e>>>2;l=0;while(1){g=f>>>1;h=l+g|0;j=h<<1;p=j+n|0;d=k[a+(p<<2)>>2]|0;e=VO(d|0)|0;e=o?d:e;p=k[a+(p+1<<2)>>2]|0;d=VO(p|0)|0;d=o?p:d;if(!(d>>>0<b>>>0&e>>>0<(b-d|0)>>>0)){d=0;break a;}if(i[a+(d+e)>>0]|0){d=0;break a;}d=BM(c,a+d|0)|0;if(!d)break;if((f|0)==1){d=0;break a;}p=(d|0)<0;l=p?l:h;f=p?g:f-g|0;}p=j+m|0;d=k[a+(p<<2)>>2]|0;e=VO(d|0)|0;e=o?d:e;p=k[a+(p+1<<2)>>2]|0;d=VO(p|0)|0;d=o?p:d;if(d>>>0<b>>>0&e>>>0<(b-d|0)>>>0)d=(i[a+(d+e)>>0]|0)==0?a+d|0:0;else d=0;}else d=0;while(0);return d|0;}function WM(a){a=a|0;var b=0,c=0;b=a+74|0;c=i[b>>0]|0;i[b>>0]=c+255|c;b=k[a>>2]|0;if(!(b&8)){k[a+8>>2]=0;k[a+4>>2]=0;c=k[a+44>>2]|0;k[a+28>>2]=c;k[a+20>>2]=c;k[a+16>>2]=c+(k[a+48>>2]|0);a=0;}else{k[a>>2]=b|32;a=-1;}return a|0;}function XM(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=a+20|0;e=k[d>>2]|0;a=(k[a+16>>2]|0)-e|0;a=a>>>0>c>>>0?c:a;PO(e|0,b|0,a|0)|0;k[d>>2]=(k[d>>2]|0)+a;return c|0;}function YM(a){a=a|0;var b=0,c=0,d=0;d=a;a:do if(!(d&3))c=4;else{b=d;while(1){if(!(i[a>>0]|0)){a=b;break a;}a=a+1|0;b=a;if(!(b&3)){c=4;break;}}}while(0);if((c|0)==4){while(1){b=k[a>>2]|0;if(!((b&-2139062144^-2139062144)&b+-16843009))a=a+4|0;else break;}if((b&255)<<24>>24)do a=a+1|0;while((i[a>>0]|0)!=0);}return a-d|0;}function ZM(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=u;u=u+16|0;f=e;k[f>>2]=d;d=DM(a,b,c,f)|0;u=e;return d|0;}function _M(a){a=a|0;var b=0,c=0;c=(YM(a)|0)+1|0;b=fN(c)|0;if(!b)b=0;else PO(b|0,a|0,c|0)|0;return b|0;}function $M(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0;j=u;u=u+16|0;g=j;h=b&255;i[g>>0]=h;d=a+16|0;e=k[d>>2]|0;if(!e){if(!(WM(a)|0)){e=k[d>>2]|0;f=4;}else c=-1;}else f=4;do if((f|0)==4){f=a+20|0;d=k[f>>2]|0;if(d>>>0<e>>>0?(c=b&255,(c|0)!=(i[a+75>>0]|0)):0){k[f>>2]=d+1;i[d>>0]=h;break;}if(($d[k[a+36>>2]&63](a,g,1)|0)==1)c=l[g>>0]|0;else c=-1;}while(0);u=j;return c|0;}function aN(){ib(38500);return 38508;}function bN(){Gd(38500);return;}function cN(a){a=a|0;var b=0,c=0;do if(a){if((k[a+76>>2]|0)<=-1){b=dN(a)|0;break;}c=(GM(a)|0)==0;b=dN(a)|0;if(!c)HM(a);}else{if(!(k[2195]|0))b=0;else b=cN(k[2195]|0)|0;a=aN()|0;a=k[a>>2]|0;if(a)do{if((k[a+76>>2]|0)>-1)c=GM(a)|0;else c=0;if((k[a+20>>2]|0)>>>0>(k[a+28>>2]|0)>>>0)b=dN(a)|0|b;if(c|0)HM(a);a=k[a+56>>2]|0;}while((a|0)!=0);bN();}while(0);return b|0;}function dN(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0;b=a+20|0;g=a+28|0;if((k[b>>2]|0)>>>0>(k[g>>2]|0)>>>0?($d[k[a+36>>2]&63](a,0,0)|0,(k[b>>2]|0)==0):0)a=-1;else{c=a+4|0;d=k[c>>2]|0;e=a+8|0;f=k[e>>2]|0;if(d>>>0<f>>>0)$d[k[a+40>>2]&63](a,d-f|0,1)|0;k[a+16>>2]=0;k[g>>2]=0;k[b>>2]=0;k[e>>2]=0;k[c>>2]=0;a=0;}return a|0;}function eN(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0;if((k[b+76>>2]|0)>=0?(GM(b)|0)!=0:0){d=a&255;c=a&255;if((c|0)!=(i[b+75>>0]|0)?(g=b+20|0,h=k[g>>2]|0,h>>>0<(k[b+16>>2]|0)>>>0):0){k[g>>2]=h+1;i[h>>0]=d;}else c=$M(b,a)|0;HM(b);}else j=3;do if((j|0)==3){d=a&255;c=a&255;if((c|0)!=(i[b+75>>0]|0)?(e=b+20|0,f=k[e>>2]|0,f>>>0<(k[b+16>>2]|0)>>>0):0){k[e>>2]=f+1;i[f>>0]=d;break;}c=$M(b,a)|0;}while(0);return c|0;}function fN(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;L=u;u=u+16|0;o=L;do if(a>>>0<245){n=a>>>0<11?16:a+11&-8;a=n>>>3;s=k[9628]|0;c=s>>>a;if(c&3|0){a=(c&1^1)+a|0;c=38552+(a<<1<<2)|0;d=c+8|0;e=k[d>>2]|0;f=e+8|0;g=k[f>>2]|0;do if((c|0)!=(g|0)){if(g>>>0<(k[9632]|0)>>>0)Xc();b=g+12|0;if((k[b>>2]|0)==(e|0)){k[b>>2]=c;k[d>>2]=g;break;}else Xc();}else k[9628]=s&~(1<<a);while(0);K=a<<3;k[e+4>>2]=K|3;K=e+K+4|0;k[K>>2]=k[K>>2]|1;K=f;u=L;return K|0;}r=k[9630]|0;if(n>>>0>r>>>0){if(c|0){h=2<<a;a=c<<a&(h|0-h);a=(a&0-a)+-1|0;h=a>>>12&16;a=a>>>h;d=a>>>5&8;a=a>>>d;f=a>>>2&4;a=a>>>f;c=a>>>1&2;a=a>>>c;b=a>>>1&1;b=(d|h|f|c|b)+(a>>>b)|0;a=38552+(b<<1<<2)|0;c=a+8|0;f=k[c>>2]|0;h=f+8|0;d=k[h>>2]|0;do if((a|0)!=(d|0)){if(d>>>0<(k[9632]|0)>>>0)Xc();e=d+12|0;if((k[e>>2]|0)==(f|0)){k[e>>2]=a;k[c>>2]=d;i=s;break;}else Xc();}else{i=s&~(1<<b);k[9628]=i;}while(0);g=(b<<3)-n|0;k[f+4>>2]=n|3;d=f+n|0;k[d+4>>2]=g|1;k[d+g>>2]=g;if(r|0){e=k[9633]|0;b=r>>>3;c=38552+(b<<1<<2)|0;b=1<<b;if(i&b){b=c+8|0;a=k[b>>2]|0;if(a>>>0<(k[9632]|0)>>>0)Xc();else{j=a;l=b;}}else{k[9628]=i|b;j=c;l=c+8|0;}k[l>>2]=e;k[j+12>>2]=e;k[e+8>>2]=j;k[e+12>>2]=c;}k[9630]=g;k[9633]=d;K=h;u=L;return K|0;}j=k[9629]|0;if(j){a=(j&0-j)+-1|0;J=a>>>12&16;a=a>>>J;I=a>>>5&8;a=a>>>I;K=a>>>2&4;a=a>>>K;h=a>>>1&2;a=a>>>h;i=a>>>1&1;i=k[38816+((I|J|K|h|i)+(a>>>i)<<2)>>2]|0;a=i;h=i;i=(k[i+4>>2]&-8)-n|0;while(1){b=k[a+16>>2]|0;if(!b){b=k[a+20>>2]|0;if(!b)break;}K=(k[b+4>>2]&-8)-n|0;J=K>>>0<i>>>0;a=b;h=J?b:h;i=J?K:i;}e=k[9632]|0;if(h>>>0<e>>>0)Xc();g=h+n|0;if(h>>>0>=g>>>0)Xc();f=k[h+24>>2]|0;c=k[h+12>>2]|0;do if((c|0)==(h|0)){a=h+20|0;b=k[a>>2]|0;if(!b){a=h+16|0;b=k[a>>2]|0;if(!b){m=0;break;}}while(1){c=b+20|0;d=k[c>>2]|0;if(d|0){b=d;a=c;continue;}c=b+16|0;d=k[c>>2]|0;if(!d)break;else{b=d;a=c;}}if(a>>>0<e>>>0)Xc();else{k[a>>2]=0;m=b;break;}}else{d=k[h+8>>2]|0;if(d>>>0<e>>>0)Xc();b=d+12|0;if((k[b>>2]|0)!=(h|0))Xc();a=c+8|0;if((k[a>>2]|0)==(h|0)){k[b>>2]=c;k[a>>2]=d;m=c;break;}else Xc();}while(0);do if(f|0){b=k[h+28>>2]|0;a=38816+(b<<2)|0;if((h|0)==(k[a>>2]|0)){k[a>>2]=m;if(!m){k[9629]=j&~(1<<b);break;}}else{if(f>>>0<(k[9632]|0)>>>0)Xc();b=f+16|0;if((k[b>>2]|0)==(h|0))k[b>>2]=m;else k[f+20>>2]=m;if(!m)break;}a=k[9632]|0;if(m>>>0<a>>>0)Xc();k[m+24>>2]=f;b=k[h+16>>2]|0;do if(b|0)if(b>>>0<a>>>0)Xc();else{k[m+16>>2]=b;k[b+24>>2]=m;break;}while(0);b=k[h+20>>2]|0;if(b|0)if(b>>>0<(k[9632]|0)>>>0)Xc();else{k[m+20>>2]=b;k[b+24>>2]=m;break;}}while(0);if(i>>>0<16){K=i+n|0;k[h+4>>2]=K|3;K=h+K+4|0;k[K>>2]=k[K>>2]|1;}else{k[h+4>>2]=n|3;k[g+4>>2]=i|1;k[g+i>>2]=i;if(r|0){d=k[9633]|0;b=r>>>3;c=38552+(b<<1<<2)|0;b=1<<b;if(s&b){b=c+8|0;a=k[b>>2]|0;if(a>>>0<(k[9632]|0)>>>0)Xc();else{p=a;q=b;}}else{k[9628]=s|b;p=c;q=c+8|0;}k[q>>2]=d;k[p+12>>2]=d;k[d+8>>2]=p;k[d+12>>2]=c;}k[9630]=i;k[9633]=g;}K=h+8|0;u=L;return K|0;}}}else if(a>>>0<=4294967231){a=a+11|0;n=a&-8;j=k[9629]|0;if(j){d=0-n|0;a=a>>>8;if(a){if(n>>>0>16777215)i=31;else{q=(a+1048320|0)>>>16&8;D=a<<q;p=(D+520192|0)>>>16&4;D=D<<p;i=(D+245760|0)>>>16&2;i=14-(p|q|i)+(D<<i>>>15)|0;i=n>>>(i+7|0)&1|i<<1;}}else i=0;a=k[38816+(i<<2)>>2]|0;a:do if(!a){c=0;e=0;D=86;}else{e=0;h=a;g=n<<((i|0)==31?0:25-(i>>>1)|0);c=0;while(1){a=(k[h+4>>2]&-8)-n|0;if(a>>>0<d>>>0)if(!a){a=h;d=0;c=h;D=90;break a;}else{e=h;d=a;}a=k[h+20>>2]|0;h=k[h+16+(g>>>31<<2)>>2]|0;c=(a|0)==0|(a|0)==(h|0)?c:a;a=(h|0)==0;if(a){D=86;break;}else g=g<<(a&1^1);}}while(0);if((D|0)==86){if((c|0)==0&(e|0)==0){a=2<<i;a=j&(a|0-a);if(!a)break;q=(a&0-a)+-1|0;l=q>>>12&16;q=q>>>l;i=q>>>5&8;q=q>>>i;m=q>>>2&4;q=q>>>m;p=q>>>1&2;q=q>>>p;c=q>>>1&1;c=k[38816+((i|l|m|p|c)+(q>>>c)<<2)>>2]|0;}if(!c){i=e;h=d;}else{a=e;D=90;}}if((D|0)==90)while(1){D=0;q=(k[c+4>>2]&-8)-n|0;e=q>>>0<d>>>0;d=e?q:d;a=e?c:a;e=k[c+16>>2]|0;if(e|0){c=e;D=90;continue;}c=k[c+20>>2]|0;if(!c){i=a;h=d;break;}else D=90;}if((i|0)!=0?h>>>0<((k[9630]|0)-n|0)>>>0:0){e=k[9632]|0;if(i>>>0<e>>>0)Xc();g=i+n|0;if(i>>>0>=g>>>0)Xc();f=k[i+24>>2]|0;c=k[i+12>>2]|0;do if((c|0)==(i|0)){a=i+20|0;b=k[a>>2]|0;if(!b){a=i+16|0;b=k[a>>2]|0;if(!b){r=0;break;}}while(1){c=b+20|0;d=k[c>>2]|0;if(d|0){b=d;a=c;continue;}c=b+16|0;d=k[c>>2]|0;if(!d)break;else{b=d;a=c;}}if(a>>>0<e>>>0)Xc();else{k[a>>2]=0;r=b;break;}}else{d=k[i+8>>2]|0;if(d>>>0<e>>>0)Xc();b=d+12|0;if((k[b>>2]|0)!=(i|0))Xc();a=c+8|0;if((k[a>>2]|0)==(i|0)){k[b>>2]=c;k[a>>2]=d;r=c;break;}else Xc();}while(0);do if(f){b=k[i+28>>2]|0;a=38816+(b<<2)|0;if((i|0)==(k[a>>2]|0)){k[a>>2]=r;if(!r){s=j&~(1<<b);k[9629]=s;break;}}else{if(f>>>0<(k[9632]|0)>>>0)Xc();b=f+16|0;if((k[b>>2]|0)==(i|0))k[b>>2]=r;else k[f+20>>2]=r;if(!r){s=j;break;}}a=k[9632]|0;if(r>>>0<a>>>0)Xc();k[r+24>>2]=f;b=k[i+16>>2]|0;do if(b|0)if(b>>>0<a>>>0)Xc();else{k[r+16>>2]=b;k[b+24>>2]=r;break;}while(0);b=k[i+20>>2]|0;if(b){if(b>>>0<(k[9632]|0)>>>0)Xc();else{k[r+20>>2]=b;k[b+24>>2]=r;s=j;break;}}else s=j;}else s=j;while(0);do if(h>>>0>=16){k[i+4>>2]=n|3;k[g+4>>2]=h|1;k[g+h>>2]=h;b=h>>>3;if(h>>>0<256){c=38552+(b<<1<<2)|0;a=k[9628]|0;b=1<<b;if(a&b){b=c+8|0;a=k[b>>2]|0;if(a>>>0<(k[9632]|0)>>>0)Xc();else{B=a;C=b;}}else{k[9628]=a|b;B=c;C=c+8|0;}k[C>>2]=g;k[B+12>>2]=g;k[g+8>>2]=B;k[g+12>>2]=c;break;}b=h>>>8;if(b){if(h>>>0>16777215)b=31;else{J=(b+1048320|0)>>>16&8;K=b<<J;I=(K+520192|0)>>>16&4;K=K<<I;b=(K+245760|0)>>>16&2;b=14-(I|J|b)+(K<<b>>>15)|0;b=h>>>(b+7|0)&1|b<<1;}}else b=0;c=38816+(b<<2)|0;k[g+28>>2]=b;a=g+16|0;k[a+4>>2]=0;k[a>>2]=0;a=1<<b;if(!(s&a)){k[9629]=s|a;k[c>>2]=g;k[g+24>>2]=c;k[g+12>>2]=g;k[g+8>>2]=g;break;}a=h<<((b|0)==31?0:25-(b>>>1)|0);d=k[c>>2]|0;while(1){if((k[d+4>>2]&-8|0)==(h|0)){D=148;break;}c=d+16+(a>>>31<<2)|0;b=k[c>>2]|0;if(!b){D=145;break;}else{a=a<<1;d=b;}}if((D|0)==145){if(c>>>0<(k[9632]|0)>>>0)Xc();else{k[c>>2]=g;k[g+24>>2]=d;k[g+12>>2]=g;k[g+8>>2]=g;break;}}else if((D|0)==148){b=d+8|0;a=k[b>>2]|0;K=k[9632]|0;if(a>>>0>=K>>>0&d>>>0>=K>>>0){k[a+12>>2]=g;k[b>>2]=g;k[g+8>>2]=a;k[g+12>>2]=d;k[g+24>>2]=0;break;}else Xc();}}else{K=h+n|0;k[i+4>>2]=K|3;K=i+K+4|0;k[K>>2]=k[K>>2]|1;}while(0);K=i+8|0;u=L;return K|0;}}}else n=-1;while(0);c=k[9630]|0;if(c>>>0>=n>>>0){b=c-n|0;a=k[9633]|0;if(b>>>0>15){K=a+n|0;k[9633]=K;k[9630]=b;k[K+4>>2]=b|1;k[K+b>>2]=b;k[a+4>>2]=n|3;}else{k[9630]=0;k[9633]=0;k[a+4>>2]=c|3;K=a+c+4|0;k[K>>2]=k[K>>2]|1;}K=a+8|0;u=L;return K|0;}h=k[9631]|0;if(h>>>0>n>>>0){I=h-n|0;k[9631]=I;K=k[9634]|0;J=K+n|0;k[9634]=J;k[J+4>>2]=I|1;k[K+4>>2]=n|3;K=K+8|0;u=L;return K|0;}if(!(k[9746]|0)){k[9748]=4096;k[9747]=4096;k[9749]=-1;k[9750]=-1;k[9751]=0;k[9739]=0;a=o&-16^1431655768;k[o>>2]=a;k[9746]=a;a=4096;}else a=k[9748]|0;i=n+48|0;j=n+47|0;g=a+j|0;e=0-a|0;l=g&e;if(l>>>0<=n>>>0){K=0;u=L;return K|0;}a=k[9738]|0;if(a|0?(B=k[9736]|0,C=B+l|0,C>>>0<=B>>>0|C>>>0>a>>>0):0){K=0;u=L;return K|0;}b:do if(!(k[9739]&4)){c=k[9634]|0;c:do if(c){d=38960;while(1){a=k[d>>2]|0;if(a>>>0<=c>>>0?(t=d+4|0,(a+(k[t>>2]|0)|0)>>>0>c>>>0):0)break;a=k[d+8>>2]|0;if(!a){D=172;break c;}else d=a;}c=g-h&e;if(c>>>0<2147483647){a=QO(c|0)|0;if((a|0)==((k[d>>2]|0)+(k[t>>2]|0)|0)){if((a|0)!=(-1|0)){g=c;f=a;D=190;break b;}}else{b=c;D=180;}}}else D=172;while(0);do if(((D|0)==172?(f=QO(0)|0,(f|0)!=(-1|0)):0)?(b=f,v=k[9747]|0,w=v+-1|0,b=((w&b|0)==0?0:(w+b&0-v)-b|0)+l|0,v=k[9736]|0,w=b+v|0,b>>>0>n>>>0&b>>>0<2147483647):0){C=k[9738]|0;if(C|0?w>>>0<=v>>>0|w>>>0>C>>>0:0)break;a=QO(b|0)|0;if((a|0)==(f|0)){g=b;D=190;break b;}else D=180;}while(0);d:do if((D|0)==180){c=0-b|0;do if(i>>>0>b>>>0&(b>>>0<2147483647&(a|0)!=(-1|0))?(x=k[9748]|0,x=j-b+x&0-x,x>>>0<2147483647):0)if((QO(x|0)|0)==(-1|0)){QO(c|0)|0;break d;}else{b=x+b|0;break;}while(0);if((a|0)!=(-1|0)){g=b;f=a;D=190;break b;}}while(0);k[9739]=k[9739]|4;D=187;}else D=187;while(0);if((((D|0)==187?l>>>0<2147483647:0)?(A=QO(l|0)|0,y=QO(0)|0,A>>>0<y>>>0&((A|0)!=(-1|0)&(y|0)!=(-1|0))):0)?(z=y-A|0,z>>>0>(n+40|0)>>>0):0){g=z;f=A;D=190;}if((D|0)==190){b=(k[9736]|0)+g|0;k[9736]=b;if(b>>>0>(k[9737]|0)>>>0)k[9737]=b;j=k[9634]|0;do if(j){b=38960;while(1){a=k[b>>2]|0;c=b+4|0;d=k[c>>2]|0;if((f|0)==(a+d|0)){D=200;break;}e=k[b+8>>2]|0;if(!e)break;else b=e;}if(((D|0)==200?(k[b+12>>2]&8|0)==0:0)?j>>>0<f>>>0&j>>>0>=a>>>0:0){k[c>>2]=d+g;K=j+8|0;K=(K&7|0)==0?0:0-K&7;J=j+K|0;K=g-K+(k[9631]|0)|0;k[9634]=J;k[9631]=K;k[J+4>>2]=K|1;k[J+K+4>>2]=40;k[9635]=k[9750];break;}b=k[9632]|0;if(f>>>0<b>>>0){k[9632]=f;h=f;}else h=b;a=f+g|0;b=38960;while(1){if((k[b>>2]|0)==(a|0)){D=208;break;}b=k[b+8>>2]|0;if(!b){a=38960;break;}}if((D|0)==208)if(!(k[b+12>>2]&8)){k[b>>2]=f;m=b+4|0;k[m>>2]=(k[m>>2]|0)+g;m=f+8|0;m=f+((m&7|0)==0?0:0-m&7)|0;b=a+8|0;b=a+((b&7|0)==0?0:0-b&7)|0;l=m+n|0;i=b-m-n|0;k[m+4>>2]=n|3;do if((b|0)!=(j|0)){if((b|0)==(k[9633]|0)){K=(k[9630]|0)+i|0;k[9630]=K;k[9633]=l;k[l+4>>2]=K|1;k[l+K>>2]=K;break;}a=k[b+4>>2]|0;if((a&3|0)==1){g=a&-8;e=a>>>3;e:do if(a>>>0>=256){f=k[b+24>>2]|0;d=k[b+12>>2]|0;do if((d|0)==(b|0)){d=b+16|0;c=d+4|0;a=k[c>>2]|0;if(!a){a=k[d>>2]|0;if(!a){I=0;break;}else c=d;}while(1){d=a+20|0;e=k[d>>2]|0;if(e|0){a=e;c=d;continue;}d=a+16|0;e=k[d>>2]|0;if(!e)break;else{a=e;c=d;}}if(c>>>0<h>>>0)Xc();else{k[c>>2]=0;I=a;break;}}else{e=k[b+8>>2]|0;if(e>>>0<h>>>0)Xc();a=e+12|0;if((k[a>>2]|0)!=(b|0))Xc();c=d+8|0;if((k[c>>2]|0)==(b|0)){k[a>>2]=d;k[c>>2]=e;I=d;break;}else Xc();}while(0);if(!f)break;a=k[b+28>>2]|0;c=38816+(a<<2)|0;do if((b|0)!=(k[c>>2]|0)){if(f>>>0<(k[9632]|0)>>>0)Xc();a=f+16|0;if((k[a>>2]|0)==(b|0))k[a>>2]=I;else k[f+20>>2]=I;if(!I)break e;}else{k[c>>2]=I;if(I|0)break;k[9629]=k[9629]&~(1<<a);break e;}while(0);d=k[9632]|0;if(I>>>0<d>>>0)Xc();k[I+24>>2]=f;a=b+16|0;c=k[a>>2]|0;do if(c|0)if(c>>>0<d>>>0)Xc();else{k[I+16>>2]=c;k[c+24>>2]=I;break;}while(0);a=k[a+4>>2]|0;if(!a)break;if(a>>>0<(k[9632]|0)>>>0)Xc();else{k[I+20>>2]=a;k[a+24>>2]=I;break;}}else{c=k[b+8>>2]|0;d=k[b+12>>2]|0;a=38552+(e<<1<<2)|0;do if((c|0)!=(a|0)){if(c>>>0<h>>>0)Xc();if((k[c+12>>2]|0)==(b|0))break;Xc();}while(0);if((d|0)==(c|0)){k[9628]=k[9628]&~(1<<e);break;}do if((d|0)==(a|0))F=d+8|0;else{if(d>>>0<h>>>0)Xc();a=d+8|0;if((k[a>>2]|0)==(b|0)){F=a;break;}Xc();}while(0);k[c+12>>2]=d;k[F>>2]=c;}while(0);b=b+g|0;e=g+i|0;}else e=i;b=b+4|0;k[b>>2]=k[b>>2]&-2;k[l+4>>2]=e|1;k[l+e>>2]=e;b=e>>>3;if(e>>>0<256){c=38552+(b<<1<<2)|0;a=k[9628]|0;b=1<<b;do if(!(a&b)){k[9628]=a|b;J=c;K=c+8|0;}else{b=c+8|0;a=k[b>>2]|0;if(a>>>0>=(k[9632]|0)>>>0){J=a;K=b;break;}Xc();}while(0);k[K>>2]=l;k[J+12>>2]=l;k[l+8>>2]=J;k[l+12>>2]=c;break;}b=e>>>8;do if(!b)b=0;else{if(e>>>0>16777215){b=31;break;}J=(b+1048320|0)>>>16&8;K=b<<J;I=(K+520192|0)>>>16&4;K=K<<I;b=(K+245760|0)>>>16&2;b=14-(I|J|b)+(K<<b>>>15)|0;b=e>>>(b+7|0)&1|b<<1;}while(0);d=38816+(b<<2)|0;k[l+28>>2]=b;a=l+16|0;k[a+4>>2]=0;k[a>>2]=0;a=k[9629]|0;c=1<<b;if(!(a&c)){k[9629]=a|c;k[d>>2]=l;k[l+24>>2]=d;k[l+12>>2]=l;k[l+8>>2]=l;break;}a=e<<((b|0)==31?0:25-(b>>>1)|0);d=k[d>>2]|0;while(1){if((k[d+4>>2]&-8|0)==(e|0)){D=278;break;}c=d+16+(a>>>31<<2)|0;b=k[c>>2]|0;if(!b){D=275;break;}else{a=a<<1;d=b;}}if((D|0)==275){if(c>>>0<(k[9632]|0)>>>0)Xc();else{k[c>>2]=l;k[l+24>>2]=d;k[l+12>>2]=l;k[l+8>>2]=l;break;}}else if((D|0)==278){b=d+8|0;a=k[b>>2]|0;K=k[9632]|0;if(a>>>0>=K>>>0&d>>>0>=K>>>0){k[a+12>>2]=l;k[b>>2]=l;k[l+8>>2]=a;k[l+12>>2]=d;k[l+24>>2]=0;break;}else Xc();}}else{K=(k[9631]|0)+i|0;k[9631]=K;k[9634]=l;k[l+4>>2]=K|1;}while(0);K=m+8|0;u=L;return K|0;}else a=38960;while(1){b=k[a>>2]|0;if(b>>>0<=j>>>0?(E=b+(k[a+4>>2]|0)|0,E>>>0>j>>>0):0)break;a=k[a+8>>2]|0;}e=E+-47|0;a=e+8|0;a=e+((a&7|0)==0?0:0-a&7)|0;e=j+16|0;a=a>>>0<e>>>0?j:a;b=a+8|0;c=f+8|0;c=(c&7|0)==0?0:0-c&7;K=f+c|0;c=g+-40-c|0;k[9634]=K;k[9631]=c;k[K+4>>2]=c|1;k[K+c+4>>2]=40;k[9635]=k[9750];c=a+4|0;k[c>>2]=27;k[b>>2]=k[9740];k[b+4>>2]=k[9741];k[b+8>>2]=k[9742];k[b+12>>2]=k[9743];k[9740]=f;k[9741]=g;k[9743]=0;k[9742]=b;b=a+24|0;do{b=b+4|0;k[b>>2]=7;}while((b+4|0)>>>0<E>>>0);if((a|0)!=(j|0)){f=a-j|0;k[c>>2]=k[c>>2]&-2;k[j+4>>2]=f|1;k[a>>2]=f;b=f>>>3;if(f>>>0<256){c=38552+(b<<1<<2)|0;a=k[9628]|0;b=1<<b;if(a&b){b=c+8|0;a=k[b>>2]|0;if(a>>>0<(k[9632]|0)>>>0)Xc();else{G=a;H=b;}}else{k[9628]=a|b;G=c;H=c+8|0;}k[H>>2]=j;k[G+12>>2]=j;k[j+8>>2]=G;k[j+12>>2]=c;break;}b=f>>>8;if(b){if(f>>>0>16777215)c=31;else{J=(b+1048320|0)>>>16&8;K=b<<J;I=(K+520192|0)>>>16&4;K=K<<I;c=(K+245760|0)>>>16&2;c=14-(I|J|c)+(K<<c>>>15)|0;c=f>>>(c+7|0)&1|c<<1;}}else c=0;d=38816+(c<<2)|0;k[j+28>>2]=c;k[j+20>>2]=0;k[e>>2]=0;b=k[9629]|0;a=1<<c;if(!(b&a)){k[9629]=b|a;k[d>>2]=j;k[j+24>>2]=d;k[j+12>>2]=j;k[j+8>>2]=j;break;}a=f<<((c|0)==31?0:25-(c>>>1)|0);d=k[d>>2]|0;while(1){if((k[d+4>>2]&-8|0)==(f|0)){D=304;break;}c=d+16+(a>>>31<<2)|0;b=k[c>>2]|0;if(!b){D=301;break;}else{a=a<<1;d=b;}}if((D|0)==301){if(c>>>0<(k[9632]|0)>>>0)Xc();else{k[c>>2]=j;k[j+24>>2]=d;k[j+12>>2]=j;k[j+8>>2]=j;break;}}else if((D|0)==304){b=d+8|0;a=k[b>>2]|0;K=k[9632]|0;if(a>>>0>=K>>>0&d>>>0>=K>>>0){k[a+12>>2]=j;k[b>>2]=j;k[j+8>>2]=a;k[j+12>>2]=d;k[j+24>>2]=0;break;}else Xc();}}}else{K=k[9632]|0;if((K|0)==0|f>>>0<K>>>0)k[9632]=f;k[9740]=f;k[9741]=g;k[9743]=0;k[9637]=k[9746];k[9636]=-1;b=0;do{K=38552+(b<<1<<2)|0;k[K+12>>2]=K;k[K+8>>2]=K;b=b+1|0;}while((b|0)!=32);K=f+8|0;K=(K&7|0)==0?0:0-K&7;J=f+K|0;K=g+-40-K|0;k[9634]=J;k[9631]=K;k[J+4>>2]=K|1;k[J+K+4>>2]=40;k[9635]=k[9750];}while(0);b=k[9631]|0;if(b>>>0>n>>>0){I=b-n|0;k[9631]=I;K=k[9634]|0;J=K+n|0;k[9634]=J;k[J+4>>2]=I|1;k[K+4>>2]=n|3;K=K+8|0;u=L;return K|0;}}K=xM()|0;k[K>>2]=12;K=0;u=L;return K|0;}function gN(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0;if(!a)return;c=a+-8|0;g=k[9632]|0;if(c>>>0<g>>>0)Xc();a=k[a+-4>>2]|0;b=a&3;if((b|0)==1)Xc();d=a&-8;n=c+d|0;do if(!(a&1)){a=k[c>>2]|0;if(!b)return;j=c+(0-a)|0;i=a+d|0;if(j>>>0<g>>>0)Xc();if((j|0)==(k[9633]|0)){a=n+4|0;b=k[a>>2]|0;if((b&3|0)!=3){q=j;e=i;break;}k[9630]=i;k[a>>2]=b&-2;k[j+4>>2]=i|1;k[j+i>>2]=i;return;}d=a>>>3;if(a>>>0<256){b=k[j+8>>2]|0;c=k[j+12>>2]|0;a=38552+(d<<1<<2)|0;if((b|0)!=(a|0)){if(b>>>0<g>>>0)Xc();if((k[b+12>>2]|0)!=(j|0))Xc();}if((c|0)==(b|0)){k[9628]=k[9628]&~(1<<d);q=j;e=i;break;}if((c|0)!=(a|0)){if(c>>>0<g>>>0)Xc();a=c+8|0;if((k[a>>2]|0)==(j|0))f=a;else Xc();}else f=c+8|0;k[b+12>>2]=c;k[f>>2]=b;q=j;e=i;break;}f=k[j+24>>2]|0;c=k[j+12>>2]|0;do if((c|0)==(j|0)){c=j+16|0;b=c+4|0;a=k[b>>2]|0;if(!a){a=k[c>>2]|0;if(!a){h=0;break;}else b=c;}while(1){c=a+20|0;d=k[c>>2]|0;if(d|0){a=d;b=c;continue;}c=a+16|0;d=k[c>>2]|0;if(!d)break;else{a=d;b=c;}}if(b>>>0<g>>>0)Xc();else{k[b>>2]=0;h=a;break;}}else{d=k[j+8>>2]|0;if(d>>>0<g>>>0)Xc();a=d+12|0;if((k[a>>2]|0)!=(j|0))Xc();b=c+8|0;if((k[b>>2]|0)==(j|0)){k[a>>2]=c;k[b>>2]=d;h=c;break;}else Xc();}while(0);if(f){a=k[j+28>>2]|0;b=38816+(a<<2)|0;if((j|0)==(k[b>>2]|0)){k[b>>2]=h;if(!h){k[9629]=k[9629]&~(1<<a);q=j;e=i;break;}}else{if(f>>>0<(k[9632]|0)>>>0)Xc();a=f+16|0;if((k[a>>2]|0)==(j|0))k[a>>2]=h;else k[f+20>>2]=h;if(!h){q=j;e=i;break;}}c=k[9632]|0;if(h>>>0<c>>>0)Xc();k[h+24>>2]=f;a=j+16|0;b=k[a>>2]|0;do if(b|0)if(b>>>0<c>>>0)Xc();else{k[h+16>>2]=b;k[b+24>>2]=h;break;}while(0);a=k[a+4>>2]|0;if(a){if(a>>>0<(k[9632]|0)>>>0)Xc();else{k[h+20>>2]=a;k[a+24>>2]=h;q=j;e=i;break;}}else{q=j;e=i;}}else{q=j;e=i;}}else{q=c;e=d;}while(0);if(q>>>0>=n>>>0)Xc();a=n+4|0;b=k[a>>2]|0;if(!(b&1))Xc();if(!(b&2)){if((n|0)==(k[9634]|0)){p=(k[9631]|0)+e|0;k[9631]=p;k[9634]=q;k[q+4>>2]=p|1;if((q|0)!=(k[9633]|0))return;k[9633]=0;k[9630]=0;return;}if((n|0)==(k[9633]|0)){p=(k[9630]|0)+e|0;k[9630]=p;k[9633]=q;k[q+4>>2]=p|1;k[q+p>>2]=p;return;}e=(b&-8)+e|0;d=b>>>3;do if(b>>>0>=256){f=k[n+24>>2]|0;a=k[n+12>>2]|0;do if((a|0)==(n|0)){c=n+16|0;b=c+4|0;a=k[b>>2]|0;if(!a){a=k[c>>2]|0;if(!a){m=0;break;}else b=c;}while(1){c=a+20|0;d=k[c>>2]|0;if(d|0){a=d;b=c;continue;}c=a+16|0;d=k[c>>2]|0;if(!d)break;else{a=d;b=c;}}if(b>>>0<(k[9632]|0)>>>0)Xc();else{k[b>>2]=0;m=a;break;}}else{b=k[n+8>>2]|0;if(b>>>0<(k[9632]|0)>>>0)Xc();c=b+12|0;if((k[c>>2]|0)!=(n|0))Xc();d=a+8|0;if((k[d>>2]|0)==(n|0)){k[c>>2]=a;k[d>>2]=b;m=a;break;}else Xc();}while(0);if(f|0){a=k[n+28>>2]|0;b=38816+(a<<2)|0;if((n|0)==(k[b>>2]|0)){k[b>>2]=m;if(!m){k[9629]=k[9629]&~(1<<a);break;}}else{if(f>>>0<(k[9632]|0)>>>0)Xc();a=f+16|0;if((k[a>>2]|0)==(n|0))k[a>>2]=m;else k[f+20>>2]=m;if(!m)break;}c=k[9632]|0;if(m>>>0<c>>>0)Xc();k[m+24>>2]=f;a=n+16|0;b=k[a>>2]|0;do if(b|0)if(b>>>0<c>>>0)Xc();else{k[m+16>>2]=b;k[b+24>>2]=m;break;}while(0);a=k[a+4>>2]|0;if(a|0)if(a>>>0<(k[9632]|0)>>>0)Xc();else{k[m+20>>2]=a;k[a+24>>2]=m;break;}}}else{b=k[n+8>>2]|0;c=k[n+12>>2]|0;a=38552+(d<<1<<2)|0;if((b|0)!=(a|0)){if(b>>>0<(k[9632]|0)>>>0)Xc();if((k[b+12>>2]|0)!=(n|0))Xc();}if((c|0)==(b|0)){k[9628]=k[9628]&~(1<<d);break;}if((c|0)!=(a|0)){if(c>>>0<(k[9632]|0)>>>0)Xc();a=c+8|0;if((k[a>>2]|0)==(n|0))l=a;else Xc();}else l=c+8|0;k[b+12>>2]=c;k[l>>2]=b;}while(0);k[q+4>>2]=e|1;k[q+e>>2]=e;if((q|0)==(k[9633]|0)){k[9630]=e;return;}}else{k[a>>2]=b&-2;k[q+4>>2]=e|1;k[q+e>>2]=e;}a=e>>>3;if(e>>>0<256){c=38552+(a<<1<<2)|0;b=k[9628]|0;a=1<<a;if(b&a){a=c+8|0;b=k[a>>2]|0;if(b>>>0<(k[9632]|0)>>>0)Xc();else{o=b;p=a;}}else{k[9628]=b|a;o=c;p=c+8|0;}k[p>>2]=q;k[o+12>>2]=q;k[q+8>>2]=o;k[q+12>>2]=c;return;}a=e>>>8;if(a){if(e>>>0>16777215)a=31;else{o=(a+1048320|0)>>>16&8;p=a<<o;n=(p+520192|0)>>>16&4;p=p<<n;a=(p+245760|0)>>>16&2;a=14-(n|o|a)+(p<<a>>>15)|0;a=e>>>(a+7|0)&1|a<<1;}}else a=0;d=38816+(a<<2)|0;k[q+28>>2]=a;k[q+20>>2]=0;k[q+16>>2]=0;b=k[9629]|0;c=1<<a;do if(b&c){b=e<<((a|0)==31?0:25-(a>>>1)|0);d=k[d>>2]|0;while(1){if((k[d+4>>2]&-8|0)==(e|0)){a=130;break;}c=d+16+(b>>>31<<2)|0;a=k[c>>2]|0;if(!a){a=127;break;}else{b=b<<1;d=a;}}if((a|0)==127){if(c>>>0<(k[9632]|0)>>>0)Xc();else{k[c>>2]=q;k[q+24>>2]=d;k[q+12>>2]=q;k[q+8>>2]=q;break;}}else if((a|0)==130){a=d+8|0;b=k[a>>2]|0;p=k[9632]|0;if(b>>>0>=p>>>0&d>>>0>=p>>>0){k[b+12>>2]=q;k[a>>2]=q;k[q+8>>2]=b;k[q+12>>2]=d;k[q+24>>2]=0;break;}else Xc();}}else{k[9629]=b|c;k[d>>2]=q;k[q+24>>2]=d;k[q+12>>2]=q;k[q+8>>2]=q;}while(0);q=(k[9636]|0)+-1|0;k[9636]=q;if(!q)a=38968;else return;while(1){a=k[a>>2]|0;if(!a)break;else a=a+8|0;}k[9636]=-1;return;}function hN(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0;j=u;u=u+16|0;b=j;h=j+8|0;c=j+4|0;k[h>>2]=a;do if(a>>>0>=212){g=(a>>>0)/210|0;e=g*210|0;k[c>>2]=a-e;d=(iN(9100,9292,c,b)|0)-9100>>2;a=0;f=d;e=(k[9100+(d<<2)>>2]|0)+e|0;a:while(1){b=5;while(1){if(b>>>0>=47){d=211;i=8;break;}c=k[8908+(b<<2)>>2]|0;d=(e>>>0)/(c>>>0)|0;if(d>>>0<c>>>0){i=107;break a;}if((e|0)==($(d,c)|0))break;else b=b+1|0;}b:do if((i|0)==8){c:while(1){i=0;b=(e>>>0)/(d>>>0)|0;do if(b>>>0>=d>>>0){if((e|0)!=($(b,d)|0)){b=d+10|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0>=b>>>0){if((e|0)!=($(c,b)|0)){b=d+12|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0>=b>>>0){if((e|0)!=($(c,b)|0)){b=d+16|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0>=b>>>0){if((e|0)!=($(c,b)|0)){b=d+18|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0>=b>>>0){if((e|0)!=($(c,b)|0)){b=d+22|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0>=b>>>0){if((e|0)!=($(c,b)|0)){b=d+28|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0>=b>>>0){if((e|0)==($(c,b)|0))c=9;else{b=d+30|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+36|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+40|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+42|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+46|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+52|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+58|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+60|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+66|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+70|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+72|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+78|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+82|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+88|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+96|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+100|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+102|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+106|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+108|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+112|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+120|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+126|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+130|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+136|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+138|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+142|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+148|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+150|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+156|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+162|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+166|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+168|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+172|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+178|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+180|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+186|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+190|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+192|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+196|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+198|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+208|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}c=(e|0)==($(c,b)|0);b=c?b:d+210|0;c=c?9:0;}}else{c=1;a=e;}}else c=9;}else{c=1;a=e;}}else c=9;}else{c=1;a=e;}}else c=9;}else{c=1;a=e;}}else c=9;}else{c=1;a=e;}}else c=9;}else{c=1;a=e;}}else{b=d;c=9;}}else{b=d;c=1;a=e;}while(0);switch(c&15){case 9:break b;case 0:{d=b;i=8;break;}default:break c;}}if(c){i=108;break a;}}while(0);d=f+1|0;c=(d|0)==48;e=(c&1)+g|0;d=c?0:d;f=d;g=e;e=(k[9100+(d<<2)>>2]|0)+(e*210|0)|0;}if((i|0)==107){k[h>>2]=e;a=e;break;}else if((i|0)==108){k[h>>2]=e;break;}}else{a=iN(8908,9100,h,b)|0;a=k[a>>2]|0;}while(0);u=j;return a|0;}function iN(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=k[c>>2]|0;d=a;c=b-a>>2;while(1){if(!c)break;b=(c|0)/2|0;f=d+(b<<2)|0;a=(k[f>>2]|0)>>>0<e>>>0;d=a?f+4|0:d;c=a?c+-1-b|0:b;}return d|0;}function jN(a){a=a|0;Ra(37175,37198,304,37528);}function kN(a){a=a|0;return;}function lN(a){a=a|0;var b=0,c=0;c=a+4|0;b=k[c>>2]|0;k[c>>2]=b+-1;if(!b){Wd[k[(k[a>>2]|0)+8>>2]&511](a);a=1;}else a=0;return a|0;}function mN(a){a=a|0;a=a+4|0;k[a>>2]=(k[a>>2]|0)+1;return;}function nN(a){a=a|0;a=a+8|0;k[a>>2]=(k[a>>2]|0)+1;return;}function oN(a){a=a|0;if(lN(a)|0)pN(a);return;}function pN(a){a=a|0;var b=0,c=0;c=a+8|0;b=k[c>>2]|0;k[c>>2]=b+-1;if(!b)Wd[k[(k[a>>2]|0)+16>>2]&511](a);return;}function qN(a){a=a|0;var b=0,c=0,d=0;c=a+4|0;b=k[c>>2]|0;while(1){if((b|0)==-1){a=0;break;}d=k[c>>2]|0;if((d|0)==(b|0))k[c>>2]=b+1;if((d|0)==(b|0))break;b=d;}return a|0;}function rN(a){a=a|0;var b=0;b=(a|0)==0?1:a;while(1){a=fN(b)|0;if(a|0)break;a=HO()|0;if(!a){a=0;break;}oe[a&3]();}return a|0;}function sN(a,b){a=a|0;b=b|0;return rN(a)|0;}function tN(a){a=a|0;return rN(a)|0;}function uN(a,b){a=a|0;b=b|0;return tN(a)|0;}function vN(a){a=a|0;gN(a);return;}function wN(a,b){a=a|0;b=b|0;vN(a);return;}function xN(a){a=a|0;vN(a);return;}function yN(a){a=a|0;Ra(37376,37405,1183,37528);}function zN(a){a=a|0;Ra(37549,37405,1194,37578);}function AN(a,b){a=a|0;b=b|0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;if((i[b+11>>0]|0)<0)BN(a,k[b>>2]|0,k[b+4>>2]|0);else{k[a>>2]=k[b>>2];k[a+4>>2]=k[b+4>>2];k[a+8>>2]=k[b+8>>2];}return;}function BN(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;if(c>>>0>4294967279)yN(a);if(c>>>0<11){i[a+11>>0]=c;if(c)d=6;}else{e=c+16&-16;d=rN(e)|0;k[a>>2]=d;k[a+8>>2]=e|-2147483648;k[a+4>>2]=c;a=d;d=6;}if((d|0)==6)PO(a|0,b|0,c|0)|0;i[a+c>>0]=0;return;}function CN(a){a=a|0;if((i[a+11>>0]|0)<0)vN(k[a>>2]|0);return;}function DN(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0;g=a+11|0;d=i[g>>0]|0;e=d<<24>>24<0;if(e)f=(k[a+8>>2]&2147483647)+-1|0;else f=10;do if(f>>>0>=c>>>0){if(e)d=k[a>>2]|0;else d=a;if(c|0)RO(d|0,b|0,c|0)|0;i[d+c>>0]=0;if((i[g>>0]|0)<0){k[a+4>>2]=c;break;}else{i[g>>0]=c;break;}}else{if(e)d=k[a+4>>2]|0;else d=d&255;EN(a,f,c-f|0,d,0,d,c,b);}while(0);return a|0;}function EN(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,l=0,m=0;if((-18-b|0)>>>0<c>>>0)yN(a);if((i[a+11>>0]|0)<0)m=k[a>>2]|0;else m=a;if(b>>>0<2147483623){j=c+b|0;l=b<<1;j=j>>>0<l>>>0?l:j;j=j>>>0<11?11:j+16&-16;}else j=-17;l=rN(j)|0;if(e|0)PO(l|0,m|0,e|0)|0;if(g|0)PO(l+e|0,h|0,g|0)|0;c=d-f|0;d=c-e|0;if(d|0)PO(l+e+g|0,m+e+f|0,d|0)|0;if((b|0)!=10)vN(m);k[a>>2]=l;k[a+8>>2]=j|-2147483648;g=c+g|0;k[a+4>>2]=g;i[l+g>>0]=0;return;}function FN(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0;if(b>>>0>4294967279)yN(a);m=a+11|0;h=i[m>>0]|0;e=h<<24>>24<0;if(e){l=k[a+4>>2]|0;c=(k[a+8>>2]&2147483647)+-1|0;}else{l=h&255;c=10;}j=l>>>0>b>>>0?l:b;b=j>>>0<11;j=b?10:(j+16&-16)+-1|0;do if((j|0)!=(c|0)){do if(b){c=k[a>>2]|0;if(e){b=0;d=a;g=12;}else{b=0;e=1;d=a;g=13;}}else{d=rN(j+1|0)|0;if(e){b=1;c=k[a>>2]|0;g=12;break;}else{b=1;e=0;c=a;g=13;break;}}while(0);if((g|0)==12){f=b;e=1;b=k[a+4>>2]|0;}else if((g|0)==13){f=b;b=h&255;}b=b+1|0;if(b|0)PO(d|0,c|0,b|0)|0;if(e)vN(c);if(f){k[a+8>>2]=j+1|-2147483648;k[a+4>>2]=l;k[a>>2]=d;break;}else{i[m>>0]=l;break;}}while(0);return;}function GN(a,b){a=a|0;b=b|0;return DN(a,b,YM(b)|0)|0;}function HN(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;e=a+11|0;d=i[e>>0]|0;f=d<<24>>24<0;if(f)d=k[a+4>>2]|0;else d=d&255;do if(d>>>0>=b>>>0){if(f){i[(k[a>>2]|0)+b>>0]=0;k[a+4>>2]=b;break;}else{i[a+b>>0]=0;i[e>>0]=b;break;}}else IN(a,b-d|0,c)|0;while(0);return;}function IN(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0;if(b|0){g=a+11|0;d=i[g>>0]|0;if(d<<24>>24<0){e=(k[a+8>>2]&2147483647)+-1|0;f=k[a+4>>2]|0;}else{e=10;f=d&255;}if((e-f|0)>>>0<b>>>0){JN(a,e,b-e+f|0,f,f,0,0);d=i[g>>0]|0;}if(d<<24>>24<0)e=k[a>>2]|0;else e=a;WO(e+f|0,c|0,b|0)|0;d=f+b|0;if((i[g>>0]|0)<0)k[a+4>>2]=d;else i[g>>0]=d;i[e+d>>0]=0;}return a|0;}function JN(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,l=0;if((-17-b|0)>>>0<c>>>0)yN(a);if((i[a+11>>0]|0)<0)l=k[a>>2]|0;else l=a;if(b>>>0<2147483623){h=c+b|0;j=b<<1;h=h>>>0<j>>>0?j:h;h=h>>>0<11?11:h+16&-16;}else h=-17;j=rN(h)|0;if(e|0)PO(j|0,l|0,e|0)|0;c=d-f-e|0;if(c|0)PO(j+e+g|0,l+e+f|0,c|0)|0;if((b|0)!=10)vN(l);k[a>>2]=j;k[a+8>>2]=h|-2147483648;return;}function KN(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0;g=a+11|0;d=i[g>>0]|0;f=d<<24>>24<0;if(f){e=(k[a+8>>2]&2147483647)+-1|0;d=k[a+4>>2]|0;}else{e=10;d=d&255;}if((e-d|0)>>>0>=c>>>0){if(c|0){if(f)e=k[a>>2]|0;else e=a;PO(e+d|0,b|0,c|0)|0;d=d+c|0;if((i[g>>0]|0)<0)k[a+4>>2]=d;else i[g>>0]=d;i[e+d>>0]=0;}}else EN(a,e,c-e+d|0,d,d,0,c,b);return a|0;}function LN(a,b){a=a|0;b=b|0;return KN(a,b,YM(b)|0)|0;}function MN(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;j=a+11|0;e=i[j>>0]|0;f=e<<24>>24<0;if(f)h=k[a+4>>2]|0;else h=e&255;if(h>>>0<b>>>0)zN(a);if(f)e=(k[a+8>>2]&2147483647)+-1|0;else e=10;if((e-h|0)>>>0>=d>>>0){if(d|0){if(f)g=k[a>>2]|0;else g=a;f=h-b|0;e=g+b|0;if(f){RO(e+d|0,e|0,f|0)|0;c=e>>>0<=c>>>0&(g+h|0)>>>0>c>>>0?c+d|0:c;}RO(e|0,c|0,d|0)|0;c=h+d|0;if((i[j>>0]|0)<0)k[a+4>>2]=c;else i[j>>0]=c;i[g+c>>0]=0;}}else EN(a,e,h+d-e|0,h,b,0,d,c);return a|0;}function NN(a,b,c){a=a|0;b=b|0;c=c|0;return MN(a,b,c,YM(c)|0)|0;}function ON(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;if(d>>>0>4294967279)yN(a);if(d>>>0<11)i[a+11>>0]=c;else{e=d+16&-16;d=rN(e)|0;k[a>>2]=d;k[a+8>>2]=e|-2147483648;k[a+4>>2]=c;a=d;}if(c|0)PO(a|0,b|0,c|0)|0;i[a+c>>0]=0;return;}function PN(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;h=u;u=u+16|0;f=h;g=h+4|0;k[g>>2]=0;k[g+4>>2]=0;k[g+8>>2]=0;c=0;while(1){if((c|0)==3)break;k[g+(c<<2)>>2]=0;c=c+1|0;}e=g+11|0;if((i[e>>0]|0)<0)c=(k[g+8>>2]&2147483647)+-1|0;else c=10;HN(g,c,0);d=i[e>>0]|0;c=d<<24>>24<0?k[g+4>>2]|0:d&255;while(1){d=d<<24>>24<0?k[g>>2]|0:g;k[f>>2]=b;d=ZM(d,c+1|0,37599,f)|0;if((d|0)>-1){if(d>>>0>c>>>0)c=d;else break;}else c=c<<1|1;HN(g,c,0);d=i[e>>0]|0;}HN(g,d,0);k[a>>2]=k[g>>2];k[a+4>>2]=k[g+4>>2];k[a+8>>2]=k[g+8>>2];c=0;while(1){if((c|0)==3)break;k[g+(c<<2)>>2]=0;c=c+1|0;}CN(g);u=h;return;}function QN(){var a=0,b=0,c=0,d=0,e=0,f=0,g=0,h=0;e=u;u=u+48|0;g=e+32|0;c=e+24|0;h=e+16|0;f=e;e=e+36|0;a=RN()|0;if(a|0?(d=k[a>>2]|0,d|0):0){a=d+48|0;b=k[a>>2]|0;a=k[a+4>>2]|0;if(!((b&-256|0)==1126902528&(a|0)==1129074247)){k[c>>2]=k[2324];SN(37688,c);}if((b|0)==1126902529&(a|0)==1129074247)a=k[d+44>>2]|0;else a=d+80|0;k[e>>2]=a;d=k[d>>2]|0;a=k[d+4>>2]|0;if($d[k[(k[712]|0)+16>>2]&63](2848,d,e)|0){h=k[e>>2]|0;e=k[2324]|0;h=Zd[k[(k[h>>2]|0)+8>>2]&255](h)|0;k[f>>2]=e;k[f+4>>2]=a;k[f+8>>2]=h;SN(37602,f);}else{k[h>>2]=k[2324];k[h+4>>2]=a;SN(37647,h);}}SN(37726,g);}function RN(){var a=0,b=0;a=u;u=u+16|0;if(!(wc(39008,3)|0)){b=Dc(k[9753]|0)|0;u=a;return b|0;}else SN(37877,a);return 0;}function SN(a,b){a=a|0;b=b|0;var c=0;c=u;u=u+16|0;k[c>>2]=b;b=k[2071]|0;EM(b,a,c)|0;eN(10,b)|0;Xc();}function TN(a){a=a|0;return;}function UN(a){a=a|0;vN(a);return;}function VN(a){a=a|0;return;}function WN(a){a=a|0;return;}function XN(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0;g=u;u=u+64|0;e=g;if((a|0)!=(b|0)){if((b|0)!=0?(f=bO(b,2872,2856,0)|0,(f|0)!=0):0){b=e+4|0;d=b+52|0;do{k[b>>2]=0;b=b+4|0;}while((b|0)<(d|0));k[e>>2]=f;k[e+8>>2]=a;k[e+12>>2]=-1;k[e+48>>2]=1;re[k[(k[f>>2]|0)+28>>2]&31](f,e,k[c>>2]|0,1);if((k[e+24>>2]|0)==1){k[c>>2]=k[e+16>>2];b=1;}else b=0;}else b=0;}else b=1;u=g;return b|0;}function YN(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;if((a|0)==(k[b+8>>2]|0))aO(0,b,c,d,e);return;}function ZN(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;do if((a|0)==(k[b+8>>2]|0)){if((k[b+4>>2]|0)==(c|0)?(f=b+28|0,(k[f>>2]|0)!=1):0)k[f>>2]=d;}else if((a|0)==(k[b>>2]|0)){if((k[b+16>>2]|0)!=(c|0)?(g=b+20|0,(k[g>>2]|0)!=(c|0)):0){k[b+32>>2]=d;k[g>>2]=c;e=b+40|0;k[e>>2]=(k[e>>2]|0)+1;if((k[b+36>>2]|0)==1?(k[b+24>>2]|0)==2:0)i[b+54>>0]=1;k[b+44>>2]=4;break;}if((d|0)==1)k[b+32>>2]=1;}while(0);return;}function _N(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if((a|0)==(k[b+8>>2]|0))$N(0,b,c,d);return;}function $N(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;a=b+16|0;e=k[a>>2]|0;do if(e){if((e|0)!=(c|0)){d=b+36|0;k[d>>2]=(k[d>>2]|0)+1;k[b+24>>2]=2;i[b+54>>0]=1;break;}a=b+24|0;if((k[a>>2]|0)==2)k[a>>2]=d;}else{k[a>>2]=c;k[b+24>>2]=d;k[b+36>>2]=1;}while(0);return;}function aO(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;i[b+53>>0]=1;do if((k[b+4>>2]|0)==(d|0)){i[b+52>>0]=1;a=b+16|0;d=k[a>>2]|0;if(!d){k[a>>2]=c;k[b+24>>2]=e;k[b+36>>2]=1;if(!((e|0)==1?(k[b+48>>2]|0)==1:0))break;i[b+54>>0]=1;break;}if((d|0)!=(c|0)){e=b+36|0;k[e>>2]=(k[e>>2]|0)+1;i[b+54>>0]=1;break;}d=b+24|0;a=k[d>>2]|0;if((a|0)==2){k[d>>2]=e;a=e;}if((a|0)==1?(k[b+48>>2]|0)==1:0)i[b+54>>0]=1;}while(0);return;}function bO(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,l=0,m=0,n=0,o=0,p=0,q=0;q=u;u=u+64|0;o=q;n=k[a>>2]|0;p=a+(k[n+-8>>2]|0)|0;n=k[n+-4>>2]|0;k[o>>2]=c;k[o+4>>2]=a;k[o+8>>2]=b;k[o+12>>2]=d;a=o+16|0;b=o+20|0;d=o+24|0;e=o+28|0;f=o+32|0;g=o+40|0;h=(n|0)==(c|0);l=a;m=l+36|0;do{k[l>>2]=0;l=l+4|0;}while((l|0)<(m|0));j[a+36>>1]=0;i[a+38>>0]=0;a:do if(h){k[o+48>>2]=1;ce[k[(k[c>>2]|0)+20>>2]&7](c,o,p,p,1,0);a=(k[d>>2]|0)==1?p:0;}else{Ud[k[(k[n>>2]|0)+24>>2]&31](n,o,p,1,0);switch(k[o+36>>2]|0){case 0:{a=(k[g>>2]|0)==1&(k[e>>2]|0)==1&(k[f>>2]|0)==1?k[b>>2]|0:0;break a;}case 1:break;default:{a=0;break a;}}if((k[d>>2]|0)!=1?!((k[g>>2]|0)==0&(k[e>>2]|0)==1&(k[f>>2]|0)==1):0){a=0;break;}a=k[a>>2]|0;}while(0);u=q;return a|0;}function cO(a){a=a|0;vN(a);return;}function dO(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;if((a|0)==(k[b+8>>2]|0))aO(0,b,c,d,e);else{a=k[a+8>>2]|0;ce[k[(k[a>>2]|0)+20>>2]&7](a,b,c,d,e,f);}return;}function eO(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0;do if((a|0)==(k[b+8>>2]|0)){if((k[b+4>>2]|0)==(c|0)?(f=b+28|0,(k[f>>2]|0)!=1):0)k[f>>2]=d;}else{if((a|0)!=(k[b>>2]|0)){h=k[a+8>>2]|0;Ud[k[(k[h>>2]|0)+24>>2]&31](h,b,c,d,e);break;}if((k[b+16>>2]|0)!=(c|0)?(h=b+20|0,(k[h>>2]|0)!=(c|0)):0){k[b+32>>2]=d;g=b+44|0;if((k[g>>2]|0)==4)break;f=b+52|0;i[f>>0]=0;d=b+53|0;i[d>>0]=0;a=k[a+8>>2]|0;ce[k[(k[a>>2]|0)+20>>2]&7](a,b,c,c,1,e);if(i[d>>0]|0){if(!(i[f>>0]|0)){f=1;d=13;}else d=17;}else{f=0;d=13;}do if((d|0)==13){k[h>>2]=c;c=b+40|0;k[c>>2]=(k[c>>2]|0)+1;if((k[b+36>>2]|0)==1?(k[b+24>>2]|0)==2:0){i[b+54>>0]=1;if(f){d=17;break;}else{f=4;break;}}if(f)d=17;else f=4;}while(0);if((d|0)==17)f=3;k[g>>2]=f;break;}if((d|0)==1)k[b+32>>2]=1;}while(0);return;}function fO(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if((a|0)==(k[b+8>>2]|0))$N(0,b,c,d);else{a=k[a+8>>2]|0;re[k[(k[a>>2]|0)+28>>2]&31](a,b,c,d);}return;}function gO(a){a=a|0;return;}function hO(){var a=0;a=u;u=u+16|0;if(!(Nc(39012,388)|0)){u=a;return;}else SN(37926,a);}function iO(a){a=a|0;var b=0;b=u;u=u+16|0;gN(a);if(!(Id(k[9753]|0,0)|0)){u=b;return;}else SN(37976,b);}function jO(){var a=0,b=0;a=RN()|0;if((a|0?(b=k[a>>2]|0,b|0):0)?(a=b+48|0,(k[a>>2]&-256|0)==1126902528?(k[a+4>>2]|0)==1129074247:0):0)kO(k[b+12>>2]|0);kO(lO()|0);}function kO(a){a=a|0;var b=0;b=u;u=u+16|0;oe[a&3]();SN(38029,b);}function lO(){var a=0;a=k[2323]|0;k[2323]=a+0;return a|0;}function mO(a){a=a|0;return;}function nO(a){a=a|0;vN(a);return;}function oO(a){a=a|0;return 38069;}function pO(a){a=a|0;return;}function qO(a){a=a|0;return 38097;}function rO(a){a=a|0;vN(a);return;}function sO(a,b,c){a=a|0;b=b|0;c=c|0;return(a|0)==(b|0)|0;}function tO(a){a=a|0;vN(a);return;}function uO(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0;i=u;u=u+64|0;h=i;k[c>>2]=k[k[c>>2]>>2];if(!((a|0)==(b|0)|(b|0)==2984)){if(((b|0)!=0?(d=bO(b,2872,2944,0)|0,(d|0)!=0):0)?(k[d+8>>2]&~k[a+8>>2]|0)==0:0){b=k[a+12>>2]|0;a=d+12|0;if(!((b|0)==2976?1:(b|0)==(k[a>>2]|0))){if((((b|0)!=0?(f=bO(b,2872,2856,0)|0,(f|0)!=0):0)?(e=k[a>>2]|0,(e|0)!=0):0)?(g=bO(e,2872,2856,0)|0,(g|0)!=0):0){a=h+4|0;b=a+52|0;do{k[a>>2]=0;a=a+4|0;}while((a|0)<(b|0));k[h>>2]=g;k[h+8>>2]=f;k[h+12>>2]=-1;k[h+48>>2]=1;re[k[(k[g>>2]|0)+28>>2]&31](g,h,k[c>>2]|0,1);if((k[h+24>>2]|0)==1){k[c>>2]=k[h+16>>2];a=1;}else a=0;}else a=0;}else a=1;}else a=0;}else a=1;u=i;return a|0;}function vO(a){a=a|0;vN(a);return;}function wO(a,b,c){a=a|0;b=b|0;c=c|0;return(a|0)==(b|0)|0;}function xO(a){a=a|0;vN(a);return;}function yO(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;if((a|0)==(k[b+8>>2]|0))aO(0,b,c,d,e);else{r=b+52|0;m=j[r>>1]|0;h=m&255;l=b+53|0;m=(m&65535)>>>8&255;q=k[a+12>>2]|0;n=a+16+(q<<3)|0;i[r>>0]=0;i[l>>0]=0;CO(a+16|0,b,c,d,e,f);a:do if((q|0)>1){o=b+24|0;p=a+8|0;q=b+54|0;a=a+24|0;do{if(i[q>>0]|0)break a;g=j[r>>1]|0;if(!((g&255)<<24>>24)){if((g&65535)>=256?(k[p>>2]&1|0)==0:0)break a;}else{if((k[o>>2]|0)==1)break a;if(!(k[p>>2]&2))break a;}i[r>>0]=0;i[l>>0]=0;CO(a,b,c,d,e,f);a=a+8|0;}while(a>>>0<n>>>0);}while(0);i[r>>0]=h;i[l>>0]=m;}return;}function zO(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0;a:do if((a|0)==(k[b+8>>2]|0)){if((k[b+4>>2]|0)==(c|0)?(f=b+28|0,(k[f>>2]|0)!=1):0)k[f>>2]=d;}else{if((a|0)!=(k[b>>2]|0)){q=k[a+12>>2]|0;h=a+16+(q<<3)|0;DO(a+16|0,b,c,d,e);f=a+24|0;if((q|0)<=1)break;a=k[a+8>>2]|0;if((a&2|0)==0?(j=b+36|0,(k[j>>2]|0)!=1):0){if(!(a&1)){a=b+54|0;while(1){if(i[a>>0]|0)break a;if((k[j>>2]|0)==1)break a;DO(f,b,c,d,e);f=f+8|0;if(f>>>0>=h>>>0)break a;}}a=b+24|0;g=b+54|0;while(1){if(i[g>>0]|0)break a;if((k[j>>2]|0)==1?(k[a>>2]|0)==1:0)break a;DO(f,b,c,d,e);f=f+8|0;if(f>>>0>=h>>>0)break a;}}a=b+54|0;while(1){if(i[a>>0]|0)break a;DO(f,b,c,d,e);f=f+8|0;if(f>>>0>=h>>>0)break a;}}if((k[b+16>>2]|0)!=(c|0)?(q=b+20|0,(k[q>>2]|0)!=(c|0)):0){k[b+32>>2]=d;p=b+44|0;if((k[p>>2]|0)==4)break;j=a+16+(k[a+12>>2]<<3)|0;d=b+52|0;l=b+53|0;n=b+54|0;m=a+8|0;o=b+24|0;f=0;g=a+16|0;h=0;b:while(1){if(g>>>0>=j>>>0){a=20;break;}i[d>>0]=0;i[l>>0]=0;CO(g,b,c,c,1,e);if(i[n>>0]|0){a=20;break;}do if(i[l>>0]|0){if(!(i[d>>0]|0))if(!(k[m>>2]&1)){f=1;a=20;break b;}else{f=1;a=h;break;}if((k[o>>2]|0)==1){a=25;break b;}if(!(k[m>>2]&2)){a=25;break b;}else{f=1;a=1;}}else a=h;while(0);g=g+8|0;h=a;}do if((a|0)==20){if((!h?(k[q>>2]=c,c=b+40|0,k[c>>2]=(k[c>>2]|0)+1,(k[b+36>>2]|0)==1):0)?(k[o>>2]|0)==2:0){i[n>>0]=1;if(f){a=25;break;}else{f=4;break;}}if(f)a=25;else f=4;}while(0);if((a|0)==25)f=3;k[p>>2]=f;break;}if((d|0)==1)k[b+32>>2]=1;}while(0);return;}function AO(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;a:do if((a|0)!=(k[b+8>>2]|0)){f=k[a+12>>2]|0;e=a+16+(f<<3)|0;BO(a+16|0,b,c,d);if((f|0)>1){f=b+54|0;a=a+24|0;do{BO(a,b,c,d);if(i[f>>0]|0)break a;a=a+8|0;}while(a>>>0<e>>>0);}}else $N(0,b,c,d);while(0);return;}function BO(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;f=k[a+4>>2]|0;e=f>>8;if(f&1)e=k[(k[c>>2]|0)+e>>2]|0;a=k[a>>2]|0;re[k[(k[a>>2]|0)+28>>2]&31](a,b,c+e|0,f&2|0?d:2);return;}function CO(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;h=k[a+4>>2]|0;g=h>>8;if(h&1)g=k[(k[d>>2]|0)+g>>2]|0;a=k[a>>2]|0;ce[k[(k[a>>2]|0)+20>>2]&7](a,b,c,d+g|0,h&2|0?e:2,f);return;}function DO(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;g=k[a+4>>2]|0;f=g>>8;if(g&1)f=k[(k[c>>2]|0)+f>>2]|0;a=k[a>>2]|0;Ud[k[(k[a>>2]|0)+24>>2]&31](a,b,c+f|0,g&2|0?d:2,e);return;}function EO(a){a=a|0;if((i[a>>0]|0)==1)a=0;else{i[a>>0]=1;a=1;}return a|0;}function FO(a){a=a|0;return;}function GO(a){a=a|0;k[a>>2]=9388;return;}function HO(){var a=0;a=k[9754]|0;k[9754]=a+0;return a|0;}function IO(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=u;u=u+16|0;d=e;k[d>>2]=k[c>>2];a=$d[k[(k[a>>2]|0)+16>>2]&63](a,b,d)|0;if(a)k[c>>2]=k[d>>2];u=e;return a&1|0;}function JO(a){a=a|0;if(!a)a=0;else a=(bO(a,2872,2944,0)|0)!=0;return a&1|0;}function KO(){}function LO(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;d=b-d-(c>>>0>a>>>0|0)>>>0;return(M=d,a-c>>>0|0)|0;}function MO(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;c=a+c>>>0;return(M=b+d+(c>>>0<a>>>0|0)>>>0,c|0)|0;}function NO(a){a=+a;return a>=0.0?+N(a+.5):+_(a-.5);}function OO(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){M=b>>>c;return a>>>c|(b&(1<<c)-1)<<32-c;}M=0;return b>>>c-32|0;}function PO(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;if((c|0)>=8192)return Fc(a|0,b|0,c|0)|0;f=a|0;e=a+c|0;if((a&3)==(b&3)){while(a&3){if(!c)return f|0;i[a>>0]=i[b>>0]|0;a=a+1|0;b=b+1|0;c=c-1|0;}c=e&-4|0;d=c-64|0;while((a|0)<=(d|0)){k[a>>2]=k[b>>2];k[a+4>>2]=k[b+4>>2];k[a+8>>2]=k[b+8>>2];k[a+12>>2]=k[b+12>>2];k[a+16>>2]=k[b+16>>2];k[a+20>>2]=k[b+20>>2];k[a+24>>2]=k[b+24>>2];k[a+28>>2]=k[b+28>>2];k[a+32>>2]=k[b+32>>2];k[a+36>>2]=k[b+36>>2];k[a+40>>2]=k[b+40>>2];k[a+44>>2]=k[b+44>>2];k[a+48>>2]=k[b+48>>2];k[a+52>>2]=k[b+52>>2];k[a+56>>2]=k[b+56>>2];k[a+60>>2]=k[b+60>>2];a=a+64|0;b=b+64|0;}while((a|0)<(c|0)){k[a>>2]=k[b>>2];a=a+4|0;b=b+4|0;}}else{c=e-4|0;while((a|0)<(c|0)){i[a>>0]=i[b>>0]|0;i[a+1>>0]=i[b+1>>0]|0;i[a+2>>0]=i[b+2>>0]|0;i[a+3>>0]=i[b+3>>0]|0;a=a+4|0;b=b+4|0;}}while((a|0)<(e|0)){i[a>>0]=i[b>>0]|0;a=a+1|0;b=b+1|0;}return f|0;}function QO(a){a=a|0;var b=0,c=0;c=a+15&-16|0;b=k[r>>2]|0;a=b+c|0;if((c|0)>0&(a|0)<(b|0)|(a|0)<0){ha()|0;Ib(12);return-1;}k[r>>2]=a;if((a|0)>(ga()|0)?(fa()|0)==0:0){Ib(12);k[r>>2]=b;return-1;}return b|0;}function RO(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;if((b|0)<(a|0)&(a|0)<(b+c|0)){d=a;b=b+c|0;a=a+c|0;while((c|0)>0){a=a-1|0;b=b-1|0;c=c-1|0;i[a>>0]=i[b>>0]|0;}a=d;}else PO(a,b,c)|0;return a|0;}function SO(a){a=a|0;var b=0;b=i[w+(a&255)>>0]|0;if((b|0)<8)return b|0;b=i[w+(a>>8&255)>>0]|0;if((b|0)<8)return b+8|0;b=i[w+(a>>16&255)>>0]|0;if((b|0)<8)return b+16|0;return(i[w+(a>>>24)>>0]|0)+24|0;}function TO(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,l=0,m=0,n=0,o=0,p=0;l=a;i=b;j=i;g=c;n=d;h=n;if(!j){f=(e|0)!=0;if(!h){if(f){k[e>>2]=(l>>>0)%(g>>>0);k[e+4>>2]=0;}n=0;e=(l>>>0)/(g>>>0)>>>0;return(M=n,e)|0;}else{if(!f){n=0;e=0;return(M=n,e)|0;}k[e>>2]=a|0;k[e+4>>2]=b&0;n=0;e=0;return(M=n,e)|0;}}f=(h|0)==0;do if(g){if(!f){f=(ca(h|0)|0)-(ca(j|0)|0)|0;if(f>>>0<=31){m=f+1|0;h=31-f|0;b=f-31>>31;g=m;a=l>>>(m>>>0)&b|j<<h;b=j>>>(m>>>0)&b;f=0;h=l<<h;break;}if(!e){n=0;e=0;return(M=n,e)|0;}k[e>>2]=a|0;k[e+4>>2]=i|b&0;n=0;e=0;return(M=n,e)|0;}f=g-1|0;if(f&g|0){h=(ca(g|0)|0)+33-(ca(j|0)|0)|0;p=64-h|0;m=32-h|0;i=m>>31;o=h-32|0;b=o>>31;g=h;a=m-1>>31&j>>>(o>>>0)|(j<<m|l>>>(h>>>0))&b;b=b&j>>>(h>>>0);f=l<<p&i;h=(j<<p|l>>>(o>>>0))&i|l<<m&h-33>>31;break;}if(e|0){k[e>>2]=f&l;k[e+4>>2]=0;}if((g|0)==1){o=i|b&0;p=a|0|0;return(M=o,p)|0;}else{p=SO(g|0)|0;o=j>>>(p>>>0)|0;p=j<<32-p|l>>>(p>>>0)|0;return(M=o,p)|0;}}else{if(f){if(e|0){k[e>>2]=(j>>>0)%(g>>>0);k[e+4>>2]=0;}o=0;p=(j>>>0)/(g>>>0)>>>0;return(M=o,p)|0;}if(!l){if(e|0){k[e>>2]=0;k[e+4>>2]=(j>>>0)%(h>>>0);}o=0;p=(j>>>0)/(h>>>0)>>>0;return(M=o,p)|0;}f=h-1|0;if(!(f&h)){if(e|0){k[e>>2]=a|0;k[e+4>>2]=f&j|b&0;}o=0;p=j>>>((SO(h|0)|0)>>>0);return(M=o,p)|0;}f=(ca(h|0)|0)-(ca(j|0)|0)|0;if(f>>>0<=30){b=f+1|0;h=31-f|0;g=b;a=j<<h|l>>>(b>>>0);b=j>>>(b>>>0);f=0;h=l<<h;break;}if(!e){o=0;p=0;return(M=o,p)|0;}k[e>>2]=a|0;k[e+4>>2]=i|b&0;o=0;p=0;return(M=o,p)|0;}while(0);if(!g){j=h;i=0;h=0;}else{m=c|0|0;l=n|d&0;j=MO(m|0,l|0,-1,-1)|0;c=M;i=h;h=0;do{d=i;i=f>>>31|i<<1;f=h|f<<1;d=a<<1|d>>>31|0;n=a>>>31|b<<1|0;LO(j|0,c|0,d|0,n|0)|0;p=M;o=p>>31|((p|0)<0?-1:0)<<1;h=o&1;a=LO(d|0,n|0,o&m|0,(((p|0)<0?-1:0)>>31|((p|0)<0?-1:0)<<1)&l|0)|0;b=M;g=g-1|0;}while((g|0)!=0);j=i;i=0;}g=0;if(e|0){k[e>>2]=a;k[e+4>>2]=b;}o=(f|0)>>>31|(j|g)<<1|(g<<1|f>>>31)&0|i;p=(f<<1|0>>>31)&-2|h;return(M=o,p)|0;}function UO(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;f=u;u=u+16|0;e=f|0;TO(a,b,c,d,e)|0;u=f;return(M=k[e+4>>2]|0,k[e>>2]|0)|0;}function VO(a){a=a|0;return(a&255)<<24|(a>>8&255)<<16|(a>>16&255)<<8|a>>>24|0;}function WO(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0;f=a+c|0;b=b&255;if((c|0)>=67){while(a&3){i[a>>0]=b;a=a+1|0;}d=f&-4|0;e=d-64|0;g=b|b<<8|b<<16|b<<24;while((a|0)<=(e|0)){k[a>>2]=g;k[a+4>>2]=g;k[a+8>>2]=g;k[a+12>>2]=g;k[a+16>>2]=g;k[a+20>>2]=g;k[a+24>>2]=g;k[a+28>>2]=g;k[a+32>>2]=g;k[a+36>>2]=g;k[a+40>>2]=g;k[a+44>>2]=g;k[a+48>>2]=g;k[a+52>>2]=g;k[a+56>>2]=g;k[a+60>>2]=g;a=a+64|0;}while((a|0)<(d|0)){k[a>>2]=g;a=a+4|0;}}while((a|0)<(f|0)){i[a>>0]=b;a=a+1|0;}return f-c|0;}function XO(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){M=b<<c|(a&(1<<c)-1<<32-c)>>>32-c;return a<<c;}M=a<<c-32;return 0;}function YO(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return TO(a,b,c,d,0)|0;}function ZO(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;Ud[a&31](b|0,c|0,d|0,e|0,f|0);}function _O(a,b,c){a=a|0;b=b|0;c=+c;Vd[a&7](b|0,+c);}function $O(a,b){a=a|0;b=b|0;Wd[a&511](b|0);}function aP(a,b,c){a=a|0;b=b|0;c=c|0;Xd[a&255](b|0,c|0);}function bP(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return Yd[a&3](b|0,c|0,d|0,e|0,f|0,g|0)|0;}function cP(a,b){a=a|0;b=b|0;return Zd[a&255](b|0)|0;}function dP(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;f=f|0;g=g|0;return _d[a&3](b|0,c|0,d|0,+e,f|0,g|0)|0;}function eP(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return $d[a&63](b|0,c|0,d|0)|0;}function fP(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=+g;h=h|0;ae[a&1](b|0,c|0,d|0,e|0,f|0,+g,h|0);}function gP(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;be[a&3](b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0);}function hP(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;ce[a&7](b|0,c|0,d|0,e|0,f|0,g|0);}function iP(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;return de[a&3](b|0,c|0,+d)|0;}function jP(a,b){a=a|0;b=b|0;return+ee[a&3](b|0);}function kP(a,b,c,d,e,f){a=a|0;b=b|0;c=+c;d=+d;e=+e;f=+f;fe[a&3](b|0,+c,+d,+e,+f);}function lP(a,b,c){a=a|0;b=b|0;c=+c;return ge[a&7](b|0,+c)|0;}function mP(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;he[a&3](b|0,c|0,d|0,e|0,f|0,g|0,h|0);}function nP(a,b,c,d,e,f,g,h,i,j,k){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;ie[a&7](b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0,j|0,k|0);}function oP(a,b,c){a=a|0;b=b|0;c=c|0;return je[a&127](b|0,c|0)|0;}function pP(a,b,c){a=a|0;b=b|0;c=c|0;return+ke[a&3](b|0,c|0);}function qP(a){a=a|0;return le[a&7]()|0;}function rP(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return me[a&63](b|0,c|0,d|0,e|0)|0;}function sP(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;ne[a&63](b|0,c|0,d|0);}function tP(a){a=a|0;oe[a&3]();}function uP(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;pe[a&7](b|0,c|0,+d);}function vP(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;return qe[a&1](b|0,c|0,d|0,+e)|0;}function wP(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;re[a&31](b|0,c|0,d|0,e|0);}function xP(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;da(0);}function yP(a,b){a=a|0;b=+b;da(1);}function zP(a){a=a|0;da(2);}function AP(a,b){a=a|0;b=b|0;da(3);}function BP(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;da(4);return 0;}function CP(a){a=a|0;da(5);return 0;}function DP(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;f=f|0;da(6);return 0;}function EP(a,b,c){a=a|0;b=b|0;c=c|0;da(7);return 0;}function FP(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=+f;g=g|0;da(8);}function GP(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;da(9);}function HP(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;da(10);}function IP(a,b,c){a=a|0;b=b|0;c=+c;da(11);return 0;}function JP(a){a=a|0;da(12);return 0.0;}function KP(a,b,c,d,e){a=a|0;b=+b;c=+c;d=+d;e=+e;da(13);}function LP(a,b){a=a|0;b=+b;da(14);return 0;}function MP(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;da(15);}function NP(a,b,c,d,e,f,g,h,i,j){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;da(16);}function OP(a,b){a=a|0;b=b|0;da(17);return 0;}function PP(a,b){a=a|0;b=b|0;da(18);return 0.0;}function QP(){da(19);return 0;}function RP(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;da(20);return 0;}function SP(a,b,c){a=a|0;b=b|0;c=c|0;da(21);}function TP(){da(22);}function UP(){dd();}function VP(a,b,c){a=a|0;b=b|0;c=+c;da(23);}function WP(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;da(24);return 0;}function XP(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;da(25);}// EMSCRIPTEN_END_FUNCS
	var Ud=[xP,vA,rB,sB,IB,LB,UB,WB,bC,cC,jC,mC,EK,FK,VK,YK,fL,hL,oL,pL,wL,zL,ZN,eO,zO,xP,xP,xP,xP,xP,xP,xP];var Vd=[yP,sg,Zh,Oi,jj,Cj,Vj,lk];var Wd=[zP,Fe,Ge,kN,Je,Ke,Me,Ne,Oe,Ue,Ve,Xe,Ze,_e,hf,jf,lf,vf,wf,Cf,Df,Ff,If,Jf,Pf,Qf,Sf,Vf,Wf,ag,bg,dg,fg,gg,kg,lg,mg,zg,Ag,Cg,Og,Pg,Yg,Zg,pO,dh,nh,oh,sh,th,zh,Ah,Eh,Fh,Ph,Qh,Uh,ki,li,ni,oi,pi,ri,si,ti,vi,wi,xi,zi,Ai,Bi,Di,Ei,Fi,Ji,Xi,Yi,_i,$i,aj,ej,sj,tj,xj,Lj,Mj,Qj,bk,ck,gk,pk,qk,Gk,Hk,Jk,Ok,Pk,Kk,Lk,Xk,Yk,_k,$k,al,cl,dl,el,gl,hl,il,kl,ll,ml,ol,pl,ql,sl,tl,Gl,Hl,Yl,Zl,$l,em,fm,hm,im,om,jm,um,vm,xm,ym,Em,zm,Jm,Km,Mm,Nm,Tm,Om,_m,$m,bn,fn,gn,jn,nn,on,Gn,In,Qn,Rn,Tn,eo,fo,ho,vo,wo,yo,zo,Ao,Co,Do,Eo,Go,Ho,Io,Ko,Mo,No,jp,kp,mp,qp,rp,tp,up,vp,Fp,Gp,Jp,Kp,Lp,Qp,Rp,wq,xq,ar,Dr,Gr,Hr,Ir,ur,vr,yr,zr,kr,lr,or,pr,br,er,fr,gr,Nr,Or,Qr,Vr,Wr,Yr,Jq,Zr,$s,at,bt,ft,gt,ht,jt,kt,lt,ot,pt,qt,yt,zt,Dt,Ft,Gt,Ht,iu,ju,su,uu,vu,wu,Hu,tA,uA,wA,BA,CA,MA,NA,XA,ZA,_A,$A,iB,jB,eB,fB,hB,pC,qC,vC,kD,nD,oD,pD,_C,$C,cD,dD,vD,wD,yD,zD,AD,CD,DD,ED,GD,KD,LD,ND,SD,TD,VD,aE,bE,ME,NE,PE,RE,SE,UE,MG,NG,UG,VG,WG,wH,xH,oH,pH,kH,lH,nH,sH,tH,vH,BH,CH,DH,JH,KH,MH,NH,OH,XH,YH,_H,$H,aI,bI,cI,dI,nI,oI,SI,TI,OI,PI,RI,_I,$I,VJ,YJ,ZJ,_J,NJ,QJ,RJ,SJ,EJ,HJ,IJ,JJ,wJ,zJ,AJ,BJ,oJ,rJ,sJ,tJ,cK,dK,fK,vK,wK,jK,kK,mK,nK,oK,qK,rK,sK,uK,CL,DL,FL,TN,UN,VN,WN,cO,mO,nO,rO,tO,vO,xO,Wi,rj,Gj,Jj,Zj,$j,wF,LG,HG,DG,zG,sG,iO,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP,zP];var Xd=[AP,Be,De,Qe,Se,af,cf,yf,Af,Lf,Nf,Yf,_f,jg,og,qg,rg,tg,ug,Qg,Rg,_g,ph,qh,uh,vh,Bh,Ch,Gh,Hh,Sh,Th,Xh,Yh,_h,$h,Hi,Ii,Mi,Ni,Pi,Qi,cj,dj,hj,ij,kj,lj,vj,wj,Aj,Bj,Dj,Ej,Oj,Pj,Tj,Uj,Wj,Xj,ek,fk,jk,kk,mk,nk,rk,sk,Mk,Nk,ul,vl,Il,Jl,km,lm,Am,Bm,Pm,Qm,Dn,Oo,Po,wp,xp,Ip,Yp,sq,vq,yq,Fr,xr,nr,qr,dr,RA,SA,TA,UA,VA,WA,uB,wB,BB,DB,GB,HB,JB,KB,_B,kC,mD,bD,iE,mE,RG,ZG,GH,aJ,XJ,PJ,GJ,yJ,qJ,HK,JK,OK,QK,TK,UK,WK,XK,lL,xL,Ti,Ui,Vi,oj,pj,qj,Fj,Hj,Ij,Yj,_j,XF,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP,AP];var Yd=[BP,tC,uC,BP];var Zd=[CP,He,Ce,Pe,Re,$e,bf,xf,zf,Kf,Mf,Xf,Zf,hg,ig,ng,pg,qO,Rh,Vh,Wh,Gi,Ki,Li,bj,fj,gj,uj,yj,zj,Nj,Rj,Sj,dk,hk,ik,pn,qn,rn,sn,tn,un,vn,wn,xn,yn,zn,An,Bn,En,Jn,Ln,Hp,Np,Sp,Tp,Wp,Xp,Zp,eq,hq,iq,jq,nq,oq,qq,rq,tq,Er,Kr,wr,Cr,mr,sr,cr,ir,_r,$r,as,it,mt,nt,rt,st,At,Bt,Ct,ku,lu,mu,nu,ou,pu,qu,ru,DA,EA,FA,OA,PA,QA,kB,lB,xB,SB,yC,lD,rD,aD,gD,cE,dE,eE,fE,nE,oE,yH,zH,AH,qH,rH,pI,qI,rI,sI,WJ,aK,OJ,UJ,FJ,LJ,xJ,DJ,pJ,vJ,xK,yK,KK,dL,tM,oO,vF,xF,GL,_L,dM,eM,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP,CP];var _d=[DP,rC,sC,DP];var $d=[EP,xk,Al,Ol,Uo,Et,It,tu,xu,YA,aB,RB,YB,OG,XG,EH,cL,jL,uM,vM,AM,XM,XN,sO,uO,wO,AF,EF,GF,IF,KF,QF,SF,UF,WF,EP,EP,EP,EP,EP,EP,EP,EP,EP,EP,EP,EP,EP,EP,EP,EP,EP,EP,EP,EP,EP,EP,EP,EP,EP,EP,EP,EP,EP];var ae=[FP,FH];var be=[GP,aC,nL,GP];var ce=[HP,MB,ZK,YN,dO,yO,HP,HP];var de=[IP,Vp,QL,OF];var ee=[JP,bs,GA,tI];var fe=[KP,vB,IK,KP];var ge=[LP,_p,$p,SL,UL,LP,LP,LP];var he=[MP,lC,yL,MP];var ie=[NP,dC,fC,qL,sL,NP,NP,NP];var je=[OP,Le,We,kf,Ef,Rf,cg,Bg,mi,qi,ui,yi,Ci,Zi,Ik,Zk,bl,fl,jl,nl,rl,_l,gm,wm,Lm,an,hn,Fn,Hn,Kn,Mn,Nn,Sn,go,xo,Bo,Fo,Jo,lp,sp,Mp,Up,aq,bq,cq,dq,fq,gq,kq,lq,mq,pq,uq,Jr,Br,rr,hr,Pr,Xr,tB,yB,ZB,gB,wC,qD,fD,xD,BD,FD,MD,UD,OE,TE,mH,uH,LH,ZH,QI,$J,TJ,KJ,CJ,uJ,eK,GK,LK,kL,lK,pK,tK,EL,gJ,CF,IL,KL,ML,OL,VL,XL,YL,ZL,$L,bM,fM,iM,ZF,IG,AG,wG,pG,nG,lG,jG,hG,eG,bG,$F,OP,OP,OP,OP,OP,OP,OP,OP,OP,OP,OP];var ke=[PP,EG,uG,PP];var le=[QP,yF,KG,GG,CG,yG,rG,QP];var me=[RP,tk,uk,vk,wk,yk,zk,Ak,Bk,Ck,wl,xl,yl,zl,Bl,Cl,Dl,El,Fl,Kl,Ll,Ml,Nl,Pl,Ql,Rl,Sl,Tl,Qo,Ro,So,To,Vo,Wo,Xo,Yo,Zo,zC,RP,RP,RP,RP,RP,RP,RP,RP,RP,RP,RP,RP,RP,RP,RP,RP,RP,RP,RP,RP,RP,RP,RP,RP,RP,RP];var ne=[SP,Cn,cs,ds,HA,IA,mB,nB,oB,pB,qB,zB,AB,CB,EB,FB,NB,OB,PB,QB,TB,$B,xC,gE,hE,jE,kE,lE,PG,QG,YG,UI,zK,AK,BK,CK,DK,MK,NK,PK,RK,SK,_K,$K,aL,bL,eL,mL,JG,BG,xG,qG,oG,mG,kG,iG,fG,cG,aG,SP,SP,SP,SP,SP];var oe=[TP,UP,QN,hO];var pe=[VP,gC,tL,FG,vG,VP,VP,VP];var qe=[WP,MF];var re=[XP,Ar,VB,XB,eC,hC,iC,eD,PH,gL,iL,rL,uL,vL,_N,fO,AO,XP,XP,XP,XP,XP,XP,XP,XP,XP,XP,XP,XP,XP,XP,XP];return{_roundf:NO,_llvm_cttz_i32:SO,_bitshift64Lshr:OO,_bitshift64Shl:XO,_fflush:cN,___cxa_is_pointer_type:JO,_memset:WO,_sbrk:QO,_memcpy:PO,___errno_location:xM,___uremdi3:UO,_i64Subtract:LO,___udivmoddi4:TO,_i64Add:MO,_emscripten_get_global_libc:sM,___getTypeName:rM,___udivdi3:YO,_llvm_bswap_i32:VO,___cxa_can_catch:IO,_free:gN,_memmove:RO,_malloc:fN,__GLOBAL__sub_I_duplicator_cpp:ax,__GLOBAL__sub_I_bindings_cpp:VE,__GLOBAL__sub_I_bind_cpp:jM,runPostSets:KO,_emscripten_replace_memory:Td,stackAlloc:se,stackSave:te,stackRestore:ue,establishStackSpace:ve,setTempRet0:xe,getTempRet0:ye,setThrew:we,stackAlloc:se,stackSave:te,stackRestore:ue,establishStackSpace:ve,setThrew:we,setTempRet0:xe,getTempRet0:ye,dynCall_viiiii:ZO,dynCall_vid:_O,dynCall_vi:$O,dynCall_vii:aP,dynCall_iiiiiii:bP,dynCall_ii:cP,dynCall_iiiidii:dP,dynCall_iiii:eP,dynCall_viiiiidi:fP,dynCall_viiiiiiii:gP,dynCall_viiiiii:hP,dynCall_iiid:iP,dynCall_di:jP,dynCall_vidddd:kP,dynCall_iid:lP,dynCall_viiiiiii:mP,dynCall_viiiiiiiiii:nP,dynCall_iii:oP,dynCall_dii:pP,dynCall_i:qP,dynCall_iiiii:rP,dynCall_viii:sP,dynCall_v:tP,dynCall_viid:uP,dynCall_iiiid:vP,dynCall_viiii:wP};}(// EMSCRIPTEN_END_ASM
	Module.asmGlobalArg,Module.asmLibraryArg,buffer);var _roundf=Module["_roundf"]=asm["_roundf"];var stackSave=Module["stackSave"]=asm["stackSave"];var getTempRet0=Module["getTempRet0"]=asm["getTempRet0"];var _memset=Module["_memset"]=asm["_memset"];var setThrew=Module["setThrew"]=asm["setThrew"];var _bitshift64Lshr=Module["_bitshift64Lshr"]=asm["_bitshift64Lshr"];var _bitshift64Shl=Module["_bitshift64Shl"]=asm["_bitshift64Shl"];var _fflush=Module["_fflush"]=asm["_fflush"];var ___cxa_is_pointer_type=Module["___cxa_is_pointer_type"]=asm["___cxa_is_pointer_type"];var _llvm_cttz_i32=Module["_llvm_cttz_i32"]=asm["_llvm_cttz_i32"];var _sbrk=Module["_sbrk"]=asm["_sbrk"];var _memcpy=Module["_memcpy"]=asm["_memcpy"];var ___errno_location=Module["___errno_location"]=asm["___errno_location"];var ___uremdi3=Module["___uremdi3"]=asm["___uremdi3"];var stackAlloc=Module["stackAlloc"]=asm["stackAlloc"];var _i64Subtract=Module["_i64Subtract"]=asm["_i64Subtract"];var __GLOBAL__sub_I_bind_cpp=Module["__GLOBAL__sub_I_bind_cpp"]=asm["__GLOBAL__sub_I_bind_cpp"];var ___udivmoddi4=Module["___udivmoddi4"]=asm["___udivmoddi4"];var setTempRet0=Module["setTempRet0"]=asm["setTempRet0"];var _i64Add=Module["_i64Add"]=asm["_i64Add"];var __GLOBAL__sub_I_duplicator_cpp=Module["__GLOBAL__sub_I_duplicator_cpp"]=asm["__GLOBAL__sub_I_duplicator_cpp"];var _emscripten_get_global_libc=Module["_emscripten_get_global_libc"]=asm["_emscripten_get_global_libc"];var ___getTypeName=Module["___getTypeName"]=asm["___getTypeName"];var ___udivdi3=Module["___udivdi3"]=asm["___udivdi3"];var _llvm_bswap_i32=Module["_llvm_bswap_i32"]=asm["_llvm_bswap_i32"];var ___cxa_can_catch=Module["___cxa_can_catch"]=asm["___cxa_can_catch"];var _free=Module["_free"]=asm["_free"];var runPostSets=Module["runPostSets"]=asm["runPostSets"];var establishStackSpace=Module["establishStackSpace"]=asm["establishStackSpace"];var _memmove=Module["_memmove"]=asm["_memmove"];var __GLOBAL__sub_I_bindings_cpp=Module["__GLOBAL__sub_I_bindings_cpp"]=asm["__GLOBAL__sub_I_bindings_cpp"];var stackRestore=Module["stackRestore"]=asm["stackRestore"];var _malloc=Module["_malloc"]=asm["_malloc"];var _emscripten_replace_memory=Module["_emscripten_replace_memory"]=asm["_emscripten_replace_memory"];var dynCall_viiiii=Module["dynCall_viiiii"]=asm["dynCall_viiiii"];var dynCall_vid=Module["dynCall_vid"]=asm["dynCall_vid"];var dynCall_vi=Module["dynCall_vi"]=asm["dynCall_vi"];var dynCall_vii=Module["dynCall_vii"]=asm["dynCall_vii"];var dynCall_iiiiiii=Module["dynCall_iiiiiii"]=asm["dynCall_iiiiiii"];var dynCall_ii=Module["dynCall_ii"]=asm["dynCall_ii"];var dynCall_iiiidii=Module["dynCall_iiiidii"]=asm["dynCall_iiiidii"];var dynCall_iiii=Module["dynCall_iiii"]=asm["dynCall_iiii"];var dynCall_viiiiidi=Module["dynCall_viiiiidi"]=asm["dynCall_viiiiidi"];var dynCall_viiiiiiii=Module["dynCall_viiiiiiii"]=asm["dynCall_viiiiiiii"];var dynCall_viiiiii=Module["dynCall_viiiiii"]=asm["dynCall_viiiiii"];var dynCall_iiid=Module["dynCall_iiid"]=asm["dynCall_iiid"];var dynCall_di=Module["dynCall_di"]=asm["dynCall_di"];var dynCall_vidddd=Module["dynCall_vidddd"]=asm["dynCall_vidddd"];var dynCall_iid=Module["dynCall_iid"]=asm["dynCall_iid"];var dynCall_viiiiiii=Module["dynCall_viiiiiii"]=asm["dynCall_viiiiiii"];var dynCall_viiiiiiiiii=Module["dynCall_viiiiiiiiii"]=asm["dynCall_viiiiiiiiii"];var dynCall_iii=Module["dynCall_iii"]=asm["dynCall_iii"];var dynCall_dii=Module["dynCall_dii"]=asm["dynCall_dii"];var dynCall_i=Module["dynCall_i"]=asm["dynCall_i"];var dynCall_iiiii=Module["dynCall_iiiii"]=asm["dynCall_iiiii"];var dynCall_viii=Module["dynCall_viii"]=asm["dynCall_viii"];var dynCall_v=Module["dynCall_v"]=asm["dynCall_v"];var dynCall_viid=Module["dynCall_viid"]=asm["dynCall_viid"];var dynCall_iiiid=Module["dynCall_iiiid"]=asm["dynCall_iiiid"];var dynCall_viiii=Module["dynCall_viiii"]=asm["dynCall_viiii"];Runtime.stackAlloc=Module["stackAlloc"];Runtime.stackSave=Module["stackSave"];Runtime.stackRestore=Module["stackRestore"];Runtime.establishStackSpace=Module["establishStackSpace"];Runtime.setTempRet0=Module["setTempRet0"];Runtime.getTempRet0=Module["getTempRet0"];Module["asm"]=asm;function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status;}ExitStatus.prototype=new Error();ExitStatus.prototype.constructor=ExitStatus;var initialStackTop;var preloadStartTime=null;var calledMain=false;dependenciesFulfilled=function runCaller(){if(!Module["calledRun"])run();if(!Module["calledRun"])dependenciesFulfilled=runCaller;};Module["callMain"]=Module.callMain=function callMain(args){args=args||[];ensureInitRuntime();var argc=args.length+1;function pad(){for(var i=0;i<4-1;i++){argv.push(0);}}var argv=[allocate(intArrayFromString(Module["thisProgram"]),"i8",ALLOC_NORMAL)];pad();for(var i=0;i<argc-1;i=i+1){argv.push(allocate(intArrayFromString(args[i]),"i8",ALLOC_NORMAL));pad();}argv.push(0);argv=allocate(argv,"i32",ALLOC_NORMAL);try{var ret=Module["_main"](argc,argv,0);exit(ret,true);}catch(e){if(e instanceof ExitStatus){return;}else if(e=="SimulateInfiniteLoop"){Module["noExitRuntime"]=true;return;}else{if(e&&typeof e==="object"&&e.stack)Module.printErr("exception thrown: "+[e,e.stack]);throw e;}}finally{calledMain=true;}};function run(args){args=args||Module["arguments"];if(preloadStartTime===null)preloadStartTime=Date.now();if(runDependencies>0){return;}preRun();if(runDependencies>0)return;if(Module["calledRun"])return;function doRun(){if(Module["calledRun"])return;Module["calledRun"]=true;if(ABORT)return;ensureInitRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(Module["_main"]&&shouldRunNow)Module["callMain"](args);postRun();}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("");},1);doRun();},1);}else{doRun();}}Module["run"]=Module.run=run;function exit(status,implicit){if(implicit&&Module["noExitRuntime"]){return;}if(Module["noExitRuntime"]){}else{ABORT=true;EXITSTATUS=status;STACKTOP=initialStackTop;exitRuntime();if(Module["onExit"])Module["onExit"](status);}if(ENVIRONMENT_IS_NODE){process["exit"](status);}else if(ENVIRONMENT_IS_SHELL&&typeof quit==="function"){quit(status);}throw new ExitStatus(status);}Module["exit"]=Module.exit=exit;var abortDecorators=[];function abort(what){if(what!==undefined){Module.print(what);Module.printErr(what);what=JSON.stringify(what);}else{what="";}ABORT=true;EXITSTATUS=1;var extra="\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";var output="abort("+what+") at "+stackTrace()+extra;if(abortDecorators){abortDecorators.forEach(function(decorator){output=decorator(output,what);});}throw output;}Module["abort"]=Module.abort=abort;if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()();}}var shouldRunNow=true;if(Module["noInitialRun"]){shouldRunNow=false;}run();return Module;};module.exports={createModule:function(){return Module(null);}};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)(module)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }
	
	  return parts;
	}
	
	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};
	
	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;
	
	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();
	
	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }
	
	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }
	
	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)
	
	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');
	
	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};
	
	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';
	
	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');
	
	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }
	
	  return (isAbsolute ? '/' : '') + path;
	};
	
	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};
	
	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};
	
	
	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);
	
	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }
	
	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }
	
	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }
	
	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));
	
	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }
	
	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }
	
	  outputParts = outputParts.concat(toParts.slice(samePartsLength));
	
	  return outputParts.join('/');
	};
	
	exports.sep = '/';
	exports.delimiter = ':';
	
	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];
	
	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }
	
	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }
	
	  return root + dir;
	};
	
	
	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};
	
	
	exports.extname = function(path) {
	  return splitPath(path)[3];
	};
	
	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}
	
	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var rng = __webpack_require__(11)
	
	function error () {
	  var m = [].slice.call(arguments).join(' ')
	  throw new Error([
	    m,
	    'we accept pull requests',
	    'http://github.com/dominictarr/crypto-browserify'
	    ].join('\n'))
	}
	
	exports.createHash = __webpack_require__(13)
	
	exports.createHmac = __webpack_require__(25)
	
	exports.randomBytes = function(size, callback) {
	  if (callback && callback.call) {
	    try {
	      callback.call(this, undefined, new Buffer(rng(size)))
	    } catch (err) { callback(err) }
	  } else {
	    return new Buffer(rng(size))
	  }
	}
	
	function each(a, f) {
	  for(var i in a)
	    f(a[i], i)
	}
	
	exports.getHashes = function () {
	  return ['sha1', 'sha256', 'sha512', 'md5', 'rmd160']
	}
	
	var p = __webpack_require__(26)(exports)
	exports.pbkdf2 = p.pbkdf2
	exports.pbkdf2Sync = p.pbkdf2Sync
	__webpack_require__(28)(exports, module.exports);
	
	// the least I can do is make error messages for the rest of the node.js/crypto api.
	each(['createCredentials'
	, 'createSign'
	, 'createVerify'
	, 'createDiffieHellman'
	], function (name) {
	  exports[name] = function () {
	    error('sorry,', name, 'is not implemented yet')
	  }
	})
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */
	
	'use strict'
	
	var base64 = __webpack_require__(8)
	var ieee754 = __webpack_require__(9)
	var isArray = __webpack_require__(10)
	
	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	
	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.
	
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()
	
	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()
	
	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}
	
	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}
	
	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }
	
	  return that
	}
	
	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */
	
	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }
	
	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}
	
	Buffer.poolSize = 8192 // not used by this implementation
	
	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}
	
	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }
	
	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }
	
	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }
	
	  return fromObject(that, value)
	}
	
	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}
	
	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}
	
	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}
	
	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}
	
	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}
	
	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}
	
	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}
	
	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }
	
	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }
	
	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)
	
	  var actual = that.write(string, encoding)
	
	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }
	
	  return that
	}
	
	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer
	
	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }
	
	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }
	
	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }
	
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}
	
	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)
	
	    if (that.length === 0) {
	      return that
	    }
	
	    obj.copy(that, 0, 0, len)
	    return that
	  }
	
	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }
	
	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }
	
	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}
	
	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	
	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}
	
	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}
	
	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }
	
	  if (a === b) return 0
	
	  var x = a.length
	  var y = b.length
	
	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}
	
	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }
	
	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }
	
	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }
	
	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}
	
	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }
	
	  var len = string.length
	  if (len === 0) return 0
	
	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength
	
	function slowToString (encoding, start, end) {
	  var loweredCase = false
	
	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.
	
	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }
	
	  if (end === undefined || end > this.length) {
	    end = this.length
	  }
	
	  if (end <= 0) {
	    return ''
	  }
	
	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0
	
	  if (end <= start) {
	    return ''
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)
	
	      case 'ascii':
	        return asciiSlice(this, start, end)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)
	
	      case 'base64':
	        return base64Slice(this, start, end)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true
	
	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}
	
	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}
	
	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}
	
	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}
	
	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}
	
	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}
	
	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}
	
	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }
	
	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }
	
	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }
	
	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }
	
	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0
	
	  if (this === target) return 0
	
	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)
	
	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)
	
	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1
	
	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }
	
	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }
	
	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }
	
	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }
	
	  throw new TypeError('val must be string, number or Buffer')
	}
	
	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length
	
	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }
	
	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }
	
	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }
	
	  return -1
	}
	
	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}
	
	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}
	
	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}
	
	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	
	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')
	
	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}
	
	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}
	
	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}
	
	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}
	
	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }
	
	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining
	
	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)
	
	      case 'ascii':
	        return asciiWrite(this, string, offset, length)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)
	
	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}
	
	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}
	
	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []
	
	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1
	
	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint
	
	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }
	
	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }
	
	    res.push(codePoint)
	    i += bytesPerSequence
	  }
	
	  return decodeCodePointsArray(res)
	}
	
	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000
	
	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }
	
	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}
	
	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}
	
	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}
	
	function hexSlice (buf, start, end) {
	  var len = buf.length
	
	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len
	
	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}
	
	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}
	
	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end
	
	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }
	
	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }
	
	  if (end < start) end = start
	
	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }
	
	  return newBuf
	}
	
	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}
	
	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }
	
	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}
	
	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}
	
	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}
	
	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}
	
	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}
	
	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}
	
	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}
	
	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}
	
	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}
	
	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}
	
	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}
	
	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}
	
	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}
	
	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}
	
	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}
	
	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}
	
	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}
	
	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}
	
	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}
	
	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}
	
	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start
	
	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0
	
	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')
	
	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }
	
	  var len = end - start
	  var i
	
	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }
	
	  return len
	}
	
	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }
	
	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }
	
	  if (end <= start) {
	    return this
	  }
	
	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0
	
	  if (!val) val = 0
	
	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }
	
	  return this
	}
	
	// HELPER FUNCTIONS
	// ================
	
	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g
	
	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}
	
	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}
	
	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}
	
	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	
	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)
	
	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }
	
	        // valid lead
	        leadSurrogate = codePoint
	
	        continue
	      }
	
	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }
	
	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }
	
	    leadSurrogate = null
	
	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }
	
	  return bytes
	}
	
	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}
	
	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break
	
	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }
	
	  return byteArray
	}
	
	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}
	
	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}
	
	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict'
	
	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray
	
	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array
	
	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}
	
	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63
	
	function placeHoldersCount (b64) {
	  var len = b64.length
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }
	
	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	}
	
	function byteLength (b64) {
	  // base64 is 4/3 + up to two characters of the original data
	  return b64.length * 3 / 4 - placeHoldersCount(b64)
	}
	
	function toByteArray (b64) {
	  var i, j, l, tmp, placeHolders, arr
	  var len = b64.length
	  placeHolders = placeHoldersCount(b64)
	
	  arr = new Arr(len * 3 / 4 - placeHolders)
	
	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len
	
	  var L = 0
	
	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }
	
	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }
	
	  return arr
	}
	
	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}
	
	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}
	
	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3
	
	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }
	
	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }
	
	  parts.push(output)
	
	  return parts.join('')
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]
	
	  i += d
	
	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}
	
	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
	
	  value = Math.abs(value)
	
	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }
	
	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }
	
	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
	
	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
	
	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, Buffer) {(function() {
	  var g = ('undefined' === typeof window ? global : window) || {}
	  _crypto = (
	    g.crypto || g.msCrypto || __webpack_require__(12)
	  )
	  module.exports = function(size) {
	    // Modern Browsers
	    if(_crypto.getRandomValues) {
	      var bytes = new Buffer(size); //in browserify, this is an extended Uint8Array
	      /* This will not work in older browsers.
	       * See https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
	       */
	    
	      _crypto.getRandomValues(bytes);
	      return bytes;
	    }
	    else if (_crypto.randomBytes) {
	      return _crypto.randomBytes(size)
	    }
	    else
	      throw new Error(
	        'secure random number generation not supported by this browser\n'+
	        'use chrome, FireFox or Internet Explorer 11'
	      )
	  }
	}())
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(7).Buffer))

/***/ },
/* 12 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var createHash = __webpack_require__(14)
	
	var md5 = toConstructor(__webpack_require__(22))
	var rmd160 = toConstructor(__webpack_require__(24))
	
	function toConstructor (fn) {
	  return function () {
	    var buffers = []
	    var m= {
	      update: function (data, enc) {
	        if(!Buffer.isBuffer(data)) data = new Buffer(data, enc)
	        buffers.push(data)
	        return this
	      },
	      digest: function (enc) {
	        var buf = Buffer.concat(buffers)
	        var r = fn(buf)
	        buffers = null
	        return enc ? r.toString(enc) : r
	      }
	    }
	    return m
	  }
	}
	
	module.exports = function (alg) {
	  if('md5' === alg) return new md5()
	  if('rmd160' === alg) return new rmd160()
	  return createHash(alg)
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var exports = module.exports = function (alg) {
	  var Alg = exports[alg]
	  if(!Alg) throw new Error(alg + ' is not supported (we accept pull requests)')
	  return new Alg()
	}
	
	var Buffer = __webpack_require__(7).Buffer
	var Hash   = __webpack_require__(15)(Buffer)
	
	exports.sha1 = __webpack_require__(16)(Buffer, Hash)
	exports.sha256 = __webpack_require__(20)(Buffer, Hash)
	exports.sha512 = __webpack_require__(21)(Buffer, Hash)


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function (Buffer) {
	
	  //prototype class for hash functions
	  function Hash (blockSize, finalSize) {
	    this._block = new Buffer(blockSize) //new Uint32Array(blockSize/4)
	    this._finalSize = finalSize
	    this._blockSize = blockSize
	    this._len = 0
	    this._s = 0
	  }
	
	  Hash.prototype.init = function () {
	    this._s = 0
	    this._len = 0
	  }
	
	  Hash.prototype.update = function (data, enc) {
	    if ("string" === typeof data) {
	      enc = enc || "utf8"
	      data = new Buffer(data, enc)
	    }
	
	    var l = this._len += data.length
	    var s = this._s = (this._s || 0)
	    var f = 0
	    var buffer = this._block
	
	    while (s < l) {
	      var t = Math.min(data.length, f + this._blockSize - (s % this._blockSize))
	      var ch = (t - f)
	
	      for (var i = 0; i < ch; i++) {
	        buffer[(s % this._blockSize) + i] = data[i + f]
	      }
	
	      s += ch
	      f += ch
	
	      if ((s % this._blockSize) === 0) {
	        this._update(buffer)
	      }
	    }
	    this._s = s
	
	    return this
	  }
	
	  Hash.prototype.digest = function (enc) {
	    // Suppose the length of the message M, in bits, is l
	    var l = this._len * 8
	
	    // Append the bit 1 to the end of the message
	    this._block[this._len % this._blockSize] = 0x80
	
	    // and then k zero bits, where k is the smallest non-negative solution to the equation (l + 1 + k) === finalSize mod blockSize
	    this._block.fill(0, this._len % this._blockSize + 1)
	
	    if (l % (this._blockSize * 8) >= this._finalSize * 8) {
	      this._update(this._block)
	      this._block.fill(0)
	    }
	
	    // to this append the block which is equal to the number l written in binary
	    // TODO: handle case where l is > Math.pow(2, 29)
	    this._block.writeInt32BE(l, this._blockSize - 4)
	
	    var hash = this._update(this._block) || this._hash()
	
	    return enc ? hash.toString(enc) : hash
	  }
	
	  Hash.prototype._update = function () {
	    throw new Error('_update must be implemented by subclass')
	  }
	
	  return Hash
	}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
	 * in FIPS PUB 180-1
	 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for details.
	 */
	
	var inherits = __webpack_require__(17).inherits
	
	module.exports = function (Buffer, Hash) {
	
	  var A = 0|0
	  var B = 4|0
	  var C = 8|0
	  var D = 12|0
	  var E = 16|0
	
	  var W = new (typeof Int32Array === 'undefined' ? Array : Int32Array)(80)
	
	  var POOL = []
	
	  function Sha1 () {
	    if(POOL.length)
	      return POOL.pop().init()
	
	    if(!(this instanceof Sha1)) return new Sha1()
	    this._w = W
	    Hash.call(this, 16*4, 14*4)
	
	    this._h = null
	    this.init()
	  }
	
	  inherits(Sha1, Hash)
	
	  Sha1.prototype.init = function () {
	    this._a = 0x67452301
	    this._b = 0xefcdab89
	    this._c = 0x98badcfe
	    this._d = 0x10325476
	    this._e = 0xc3d2e1f0
	
	    Hash.prototype.init.call(this)
	    return this
	  }
	
	  Sha1.prototype._POOL = POOL
	  Sha1.prototype._update = function (X) {
	
	    var a, b, c, d, e, _a, _b, _c, _d, _e
	
	    a = _a = this._a
	    b = _b = this._b
	    c = _c = this._c
	    d = _d = this._d
	    e = _e = this._e
	
	    var w = this._w
	
	    for(var j = 0; j < 80; j++) {
	      var W = w[j] = j < 16 ? X.readInt32BE(j*4)
	        : rol(w[j - 3] ^ w[j -  8] ^ w[j - 14] ^ w[j - 16], 1)
	
	      var t = add(
	        add(rol(a, 5), sha1_ft(j, b, c, d)),
	        add(add(e, W), sha1_kt(j))
	      )
	
	      e = d
	      d = c
	      c = rol(b, 30)
	      b = a
	      a = t
	    }
	
	    this._a = add(a, _a)
	    this._b = add(b, _b)
	    this._c = add(c, _c)
	    this._d = add(d, _d)
	    this._e = add(e, _e)
	  }
	
	  Sha1.prototype._hash = function () {
	    if(POOL.length < 100) POOL.push(this)
	    var H = new Buffer(20)
	    //console.log(this._a|0, this._b|0, this._c|0, this._d|0, this._e|0)
	    H.writeInt32BE(this._a|0, A)
	    H.writeInt32BE(this._b|0, B)
	    H.writeInt32BE(this._c|0, C)
	    H.writeInt32BE(this._d|0, D)
	    H.writeInt32BE(this._e|0, E)
	    return H
	  }
	
	  /*
	   * Perform the appropriate triplet combination function for the current
	   * iteration
	   */
	  function sha1_ft(t, b, c, d) {
	    if(t < 20) return (b & c) | ((~b) & d);
	    if(t < 40) return b ^ c ^ d;
	    if(t < 60) return (b & c) | (b & d) | (c & d);
	    return b ^ c ^ d;
	  }
	
	  /*
	   * Determine the appropriate additive constant for the current iteration
	   */
	  function sha1_kt(t) {
	    return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
	           (t < 60) ? -1894007588 : -899497514;
	  }
	
	  /*
	   * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	   * to work around bugs in some JS interpreters.
	   * //dominictarr: this is 10 years old, so maybe this can be dropped?)
	   *
	   */
	  function add(x, y) {
	    return (x + y ) | 0
	  //lets see how this goes on testling.
	  //  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  //  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  //  return (msw << 16) | (lsw & 0xFFFF);
	  }
	
	  /*
	   * Bitwise rotate a 32-bit number to the left.
	   */
	  function rol(num, cnt) {
	    return (num << cnt) | (num >>> (32 - cnt));
	  }
	
	  return Sha1
	}


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }
	
	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};
	
	
	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }
	
	  if (process.noDeprecation === true) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	};
	
	
	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};
	
	
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;
	
	
	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};
	
	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};
	
	
	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];
	
	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}
	
	
	function stylizeNoColor(str, styleType) {
	  return str;
	}
	
	
	function arrayToHash(array) {
	  var hash = {};
	
	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });
	
	  return hash;
	}
	
	
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }
	
	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }
	
	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);
	
	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }
	
	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }
	
	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	
	  var base = '', array = false, braces = ['{', '}'];
	
	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }
	
	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }
	
	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }
	
	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }
	
	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }
	
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	
	  ctx.seen.push(value);
	
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	
	  ctx.seen.pop();
	
	  return reduceToSingleString(output, base, braces);
	}
	
	
	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}
	
	
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	
	
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}
	
	
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	
	  return name + ': ' + str;
	}
	
	
	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);
	
	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }
	
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}
	
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = __webpack_require__(18);
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	
	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}
	
	
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];
	
	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}
	
	
	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};
	
	
	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(19);
	
	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;
	
	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};
	
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(2)))

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 19 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
	 * in FIPS 180-2
	 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 *
	 */
	
	var inherits = __webpack_require__(17).inherits
	
	module.exports = function (Buffer, Hash) {
	
	  var K = [
	      0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
	      0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
	      0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
	      0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
	      0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
	      0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
	      0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
	      0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
	      0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
	      0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
	      0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
	      0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
	      0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
	      0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
	      0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
	      0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
	    ]
	
	  var W = new Array(64)
	
	  function Sha256() {
	    this.init()
	
	    this._w = W //new Array(64)
	
	    Hash.call(this, 16*4, 14*4)
	  }
	
	  inherits(Sha256, Hash)
	
	  Sha256.prototype.init = function () {
	
	    this._a = 0x6a09e667|0
	    this._b = 0xbb67ae85|0
	    this._c = 0x3c6ef372|0
	    this._d = 0xa54ff53a|0
	    this._e = 0x510e527f|0
	    this._f = 0x9b05688c|0
	    this._g = 0x1f83d9ab|0
	    this._h = 0x5be0cd19|0
	
	    this._len = this._s = 0
	
	    return this
	  }
	
	  function S (X, n) {
	    return (X >>> n) | (X << (32 - n));
	  }
	
	  function R (X, n) {
	    return (X >>> n);
	  }
	
	  function Ch (x, y, z) {
	    return ((x & y) ^ ((~x) & z));
	  }
	
	  function Maj (x, y, z) {
	    return ((x & y) ^ (x & z) ^ (y & z));
	  }
	
	  function Sigma0256 (x) {
	    return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
	  }
	
	  function Sigma1256 (x) {
	    return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
	  }
	
	  function Gamma0256 (x) {
	    return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
	  }
	
	  function Gamma1256 (x) {
	    return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
	  }
	
	  Sha256.prototype._update = function(M) {
	
	    var W = this._w
	    var a, b, c, d, e, f, g, h
	    var T1, T2
	
	    a = this._a | 0
	    b = this._b | 0
	    c = this._c | 0
	    d = this._d | 0
	    e = this._e | 0
	    f = this._f | 0
	    g = this._g | 0
	    h = this._h | 0
	
	    for (var j = 0; j < 64; j++) {
	      var w = W[j] = j < 16
	        ? M.readInt32BE(j * 4)
	        : Gamma1256(W[j - 2]) + W[j - 7] + Gamma0256(W[j - 15]) + W[j - 16]
	
	      T1 = h + Sigma1256(e) + Ch(e, f, g) + K[j] + w
	
	      T2 = Sigma0256(a) + Maj(a, b, c);
	      h = g; g = f; f = e; e = d + T1; d = c; c = b; b = a; a = T1 + T2;
	    }
	
	    this._a = (a + this._a) | 0
	    this._b = (b + this._b) | 0
	    this._c = (c + this._c) | 0
	    this._d = (d + this._d) | 0
	    this._e = (e + this._e) | 0
	    this._f = (f + this._f) | 0
	    this._g = (g + this._g) | 0
	    this._h = (h + this._h) | 0
	
	  };
	
	  Sha256.prototype._hash = function () {
	    var H = new Buffer(32)
	
	    H.writeInt32BE(this._a,  0)
	    H.writeInt32BE(this._b,  4)
	    H.writeInt32BE(this._c,  8)
	    H.writeInt32BE(this._d, 12)
	    H.writeInt32BE(this._e, 16)
	    H.writeInt32BE(this._f, 20)
	    H.writeInt32BE(this._g, 24)
	    H.writeInt32BE(this._h, 28)
	
	    return H
	  }
	
	  return Sha256
	
	}


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var inherits = __webpack_require__(17).inherits
	
	module.exports = function (Buffer, Hash) {
	  var K = [
	    0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
	    0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
	    0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
	    0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
	    0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
	    0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
	    0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
	    0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
	    0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
	    0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
	    0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
	    0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
	    0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
	    0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
	    0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
	    0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
	    0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
	    0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
	    0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
	    0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
	    0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
	    0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
	    0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
	    0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
	    0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
	    0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
	    0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
	    0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
	    0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
	    0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
	    0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
	    0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
	    0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
	    0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
	    0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
	    0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
	    0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
	    0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
	    0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
	    0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
	  ]
	
	  var W = new Array(160)
	
	  function Sha512() {
	    this.init()
	    this._w = W
	
	    Hash.call(this, 128, 112)
	  }
	
	  inherits(Sha512, Hash)
	
	  Sha512.prototype.init = function () {
	
	    this._a = 0x6a09e667|0
	    this._b = 0xbb67ae85|0
	    this._c = 0x3c6ef372|0
	    this._d = 0xa54ff53a|0
	    this._e = 0x510e527f|0
	    this._f = 0x9b05688c|0
	    this._g = 0x1f83d9ab|0
	    this._h = 0x5be0cd19|0
	
	    this._al = 0xf3bcc908|0
	    this._bl = 0x84caa73b|0
	    this._cl = 0xfe94f82b|0
	    this._dl = 0x5f1d36f1|0
	    this._el = 0xade682d1|0
	    this._fl = 0x2b3e6c1f|0
	    this._gl = 0xfb41bd6b|0
	    this._hl = 0x137e2179|0
	
	    this._len = this._s = 0
	
	    return this
	  }
	
	  function S (X, Xl, n) {
	    return (X >>> n) | (Xl << (32 - n))
	  }
	
	  function Ch (x, y, z) {
	    return ((x & y) ^ ((~x) & z));
	  }
	
	  function Maj (x, y, z) {
	    return ((x & y) ^ (x & z) ^ (y & z));
	  }
	
	  Sha512.prototype._update = function(M) {
	
	    var W = this._w
	    var a, b, c, d, e, f, g, h
	    var al, bl, cl, dl, el, fl, gl, hl
	
	    a = this._a | 0
	    b = this._b | 0
	    c = this._c | 0
	    d = this._d | 0
	    e = this._e | 0
	    f = this._f | 0
	    g = this._g | 0
	    h = this._h | 0
	
	    al = this._al | 0
	    bl = this._bl | 0
	    cl = this._cl | 0
	    dl = this._dl | 0
	    el = this._el | 0
	    fl = this._fl | 0
	    gl = this._gl | 0
	    hl = this._hl | 0
	
	    for (var i = 0; i < 80; i++) {
	      var j = i * 2
	
	      var Wi, Wil
	
	      if (i < 16) {
	        Wi = W[j] = M.readInt32BE(j * 4)
	        Wil = W[j + 1] = M.readInt32BE(j * 4 + 4)
	
	      } else {
	        var x  = W[j - 15*2]
	        var xl = W[j - 15*2 + 1]
	        var gamma0  = S(x, xl, 1) ^ S(x, xl, 8) ^ (x >>> 7)
	        var gamma0l = S(xl, x, 1) ^ S(xl, x, 8) ^ S(xl, x, 7)
	
	        x  = W[j - 2*2]
	        xl = W[j - 2*2 + 1]
	        var gamma1  = S(x, xl, 19) ^ S(xl, x, 29) ^ (x >>> 6)
	        var gamma1l = S(xl, x, 19) ^ S(x, xl, 29) ^ S(xl, x, 6)
	
	        // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
	        var Wi7  = W[j - 7*2]
	        var Wi7l = W[j - 7*2 + 1]
	
	        var Wi16  = W[j - 16*2]
	        var Wi16l = W[j - 16*2 + 1]
	
	        Wil = gamma0l + Wi7l
	        Wi  = gamma0  + Wi7 + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0)
	        Wil = Wil + gamma1l
	        Wi  = Wi  + gamma1  + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0)
	        Wil = Wil + Wi16l
	        Wi  = Wi  + Wi16 + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0)
	
	        W[j] = Wi
	        W[j + 1] = Wil
	      }
	
	      var maj = Maj(a, b, c)
	      var majl = Maj(al, bl, cl)
	
	      var sigma0h = S(a, al, 28) ^ S(al, a, 2) ^ S(al, a, 7)
	      var sigma0l = S(al, a, 28) ^ S(a, al, 2) ^ S(a, al, 7)
	      var sigma1h = S(e, el, 14) ^ S(e, el, 18) ^ S(el, e, 9)
	      var sigma1l = S(el, e, 14) ^ S(el, e, 18) ^ S(e, el, 9)
	
	      // t1 = h + sigma1 + ch + K[i] + W[i]
	      var Ki = K[j]
	      var Kil = K[j + 1]
	
	      var ch = Ch(e, f, g)
	      var chl = Ch(el, fl, gl)
	
	      var t1l = hl + sigma1l
	      var t1 = h + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0)
	      t1l = t1l + chl
	      t1 = t1 + ch + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0)
	      t1l = t1l + Kil
	      t1 = t1 + Ki + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0)
	      t1l = t1l + Wil
	      t1 = t1 + Wi + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0)
	
	      // t2 = sigma0 + maj
	      var t2l = sigma0l + majl
	      var t2 = sigma0h + maj + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0)
	
	      h  = g
	      hl = gl
	      g  = f
	      gl = fl
	      f  = e
	      fl = el
	      el = (dl + t1l) | 0
	      e  = (d + t1 + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0
	      d  = c
	      dl = cl
	      c  = b
	      cl = bl
	      b  = a
	      bl = al
	      al = (t1l + t2l) | 0
	      a  = (t1 + t2 + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0
	    }
	
	    this._al = (this._al + al) | 0
	    this._bl = (this._bl + bl) | 0
	    this._cl = (this._cl + cl) | 0
	    this._dl = (this._dl + dl) | 0
	    this._el = (this._el + el) | 0
	    this._fl = (this._fl + fl) | 0
	    this._gl = (this._gl + gl) | 0
	    this._hl = (this._hl + hl) | 0
	
	    this._a = (this._a + a + ((this._al >>> 0) < (al >>> 0) ? 1 : 0)) | 0
	    this._b = (this._b + b + ((this._bl >>> 0) < (bl >>> 0) ? 1 : 0)) | 0
	    this._c = (this._c + c + ((this._cl >>> 0) < (cl >>> 0) ? 1 : 0)) | 0
	    this._d = (this._d + d + ((this._dl >>> 0) < (dl >>> 0) ? 1 : 0)) | 0
	    this._e = (this._e + e + ((this._el >>> 0) < (el >>> 0) ? 1 : 0)) | 0
	    this._f = (this._f + f + ((this._fl >>> 0) < (fl >>> 0) ? 1 : 0)) | 0
	    this._g = (this._g + g + ((this._gl >>> 0) < (gl >>> 0) ? 1 : 0)) | 0
	    this._h = (this._h + h + ((this._hl >>> 0) < (hl >>> 0) ? 1 : 0)) | 0
	  }
	
	  Sha512.prototype._hash = function () {
	    var H = new Buffer(64)
	
	    function writeInt64BE(h, l, offset) {
	      H.writeInt32BE(h, offset)
	      H.writeInt32BE(l, offset + 4)
	    }
	
	    writeInt64BE(this._a, this._al, 0)
	    writeInt64BE(this._b, this._bl, 8)
	    writeInt64BE(this._c, this._cl, 16)
	    writeInt64BE(this._d, this._dl, 24)
	    writeInt64BE(this._e, this._el, 32)
	    writeInt64BE(this._f, this._fl, 40)
	    writeInt64BE(this._g, this._gl, 48)
	    writeInt64BE(this._h, this._hl, 56)
	
	    return H
	  }
	
	  return Sha512
	
	}


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
	 * Digest Algorithm, as defined in RFC 1321.
	 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for more info.
	 */
	
	var helpers = __webpack_require__(23);
	
	/*
	 * Calculate the MD5 of an array of little-endian words, and a bit length
	 */
	function core_md5(x, len)
	{
	  /* append padding */
	  x[len >> 5] |= 0x80 << ((len) % 32);
	  x[(((len + 64) >>> 9) << 4) + 14] = len;
	
	  var a =  1732584193;
	  var b = -271733879;
	  var c = -1732584194;
	  var d =  271733878;
	
	  for(var i = 0; i < x.length; i += 16)
	  {
	    var olda = a;
	    var oldb = b;
	    var oldc = c;
	    var oldd = d;
	
	    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
	    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
	    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
	    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
	    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
	    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
	    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
	    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
	    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
	    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
	    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
	    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
	    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
	    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
	    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
	    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);
	
	    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
	    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
	    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
	    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
	    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
	    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
	    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
	    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
	    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
	    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
	    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
	    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
	    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
	    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
	    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
	    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);
	
	    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
	    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
	    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
	    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
	    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
	    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
	    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
	    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
	    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
	    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
	    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
	    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
	    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
	    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
	    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
	    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);
	
	    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
	    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
	    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
	    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
	    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
	    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
	    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
	    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
	    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
	    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
	    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
	    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
	    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
	    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
	    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
	    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);
	
	    a = safe_add(a, olda);
	    b = safe_add(b, oldb);
	    c = safe_add(c, oldc);
	    d = safe_add(d, oldd);
	  }
	  return Array(a, b, c, d);
	
	}
	
	/*
	 * These functions implement the four basic operations the algorithm uses.
	 */
	function md5_cmn(q, a, b, x, s, t)
	{
	  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
	}
	function md5_ff(a, b, c, d, x, s, t)
	{
	  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	}
	function md5_gg(a, b, c, d, x, s, t)
	{
	  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	}
	function md5_hh(a, b, c, d, x, s, t)
	{
	  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}
	function md5_ii(a, b, c, d, x, s, t)
	{
	  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	}
	
	/*
	 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	 * to work around bugs in some JS interpreters.
	 */
	function safe_add(x, y)
	{
	  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  return (msw << 16) | (lsw & 0xFFFF);
	}
	
	/*
	 * Bitwise rotate a 32-bit number to the left.
	 */
	function bit_rol(num, cnt)
	{
	  return (num << cnt) | (num >>> (32 - cnt));
	}
	
	module.exports = function md5(buf) {
	  return helpers.hash(buf, core_md5, 16);
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var intSize = 4;
	var zeroBuffer = new Buffer(intSize); zeroBuffer.fill(0);
	var chrsz = 8;
	
	function toArray(buf, bigEndian) {
	  if ((buf.length % intSize) !== 0) {
	    var len = buf.length + (intSize - (buf.length % intSize));
	    buf = Buffer.concat([buf, zeroBuffer], len);
	  }
	
	  var arr = [];
	  var fn = bigEndian ? buf.readInt32BE : buf.readInt32LE;
	  for (var i = 0; i < buf.length; i += intSize) {
	    arr.push(fn.call(buf, i));
	  }
	  return arr;
	}
	
	function toBuffer(arr, size, bigEndian) {
	  var buf = new Buffer(size);
	  var fn = bigEndian ? buf.writeInt32BE : buf.writeInt32LE;
	  for (var i = 0; i < arr.length; i++) {
	    fn.call(buf, arr[i], i * 4, true);
	  }
	  return buf;
	}
	
	function hash(buf, fn, hashSize, bigEndian) {
	  if (!Buffer.isBuffer(buf)) buf = new Buffer(buf);
	  var arr = fn(toArray(buf, bigEndian), buf.length * chrsz);
	  return toBuffer(arr, hashSize, bigEndian);
	}
	
	module.exports = { hash: hash };
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {
	module.exports = ripemd160
	
	
	
	/*
	CryptoJS v3.1.2
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	/** @preserve
	(c) 2012 by Cédric Mesnil. All rights reserved.
	
	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	
	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	
	// Constants table
	var zl = [
	    0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,
	    7,  4, 13,  1, 10,  6, 15,  3, 12,  0,  9,  5,  2, 14, 11,  8,
	    3, 10, 14,  4,  9, 15,  8,  1,  2,  7,  0,  6, 13, 11,  5, 12,
	    1,  9, 11, 10,  0,  8, 12,  4, 13,  3,  7, 15, 14,  5,  6,  2,
	    4,  0,  5,  9,  7, 12,  2, 10, 14,  1,  3,  8, 11,  6, 15, 13];
	var zr = [
	    5, 14,  7,  0,  9,  2, 11,  4, 13,  6, 15,  8,  1, 10,  3, 12,
	    6, 11,  3,  7,  0, 13,  5, 10, 14, 15,  8, 12,  4,  9,  1,  2,
	    15,  5,  1,  3,  7, 14,  6,  9, 11,  8, 12,  2, 10,  0,  4, 13,
	    8,  6,  4,  1,  3, 11, 15,  0,  5, 12,  2, 13,  9,  7, 10, 14,
	    12, 15, 10,  4,  1,  5,  8,  7,  6,  2, 13, 14,  0,  3,  9, 11];
	var sl = [
	     11, 14, 15, 12,  5,  8,  7,  9, 11, 13, 14, 15,  6,  7,  9,  8,
	    7, 6,   8, 13, 11,  9,  7, 15,  7, 12, 15,  9, 11,  7, 13, 12,
	    11, 13,  6,  7, 14,  9, 13, 15, 14,  8, 13,  6,  5, 12,  7,  5,
	      11, 12, 14, 15, 14, 15,  9,  8,  9, 14,  5,  6,  8,  6,  5, 12,
	    9, 15,  5, 11,  6,  8, 13, 12,  5, 12, 13, 14, 11,  8,  5,  6 ];
	var sr = [
	    8,  9,  9, 11, 13, 15, 15,  5,  7,  7,  8, 11, 14, 14, 12,  6,
	    9, 13, 15,  7, 12,  8,  9, 11,  7,  7, 12,  7,  6, 15, 13, 11,
	    9,  7, 15, 11,  8,  6,  6, 14, 12, 13,  5, 14, 13, 13,  7,  5,
	    15,  5,  8, 11, 14, 14,  6, 14,  6,  9, 12,  9, 12,  5, 15,  8,
	    8,  5, 12,  9, 12,  5, 14,  6,  8, 13,  6,  5, 15, 13, 11, 11 ];
	
	var hl =  [ 0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E];
	var hr =  [ 0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000];
	
	var bytesToWords = function (bytes) {
	  var words = [];
	  for (var i = 0, b = 0; i < bytes.length; i++, b += 8) {
	    words[b >>> 5] |= bytes[i] << (24 - b % 32);
	  }
	  return words;
	};
	
	var wordsToBytes = function (words) {
	  var bytes = [];
	  for (var b = 0; b < words.length * 32; b += 8) {
	    bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
	  }
	  return bytes;
	};
	
	var processBlock = function (H, M, offset) {
	
	  // Swap endian
	  for (var i = 0; i < 16; i++) {
	    var offset_i = offset + i;
	    var M_offset_i = M[offset_i];
	
	    // Swap
	    M[offset_i] = (
	        (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	        (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	    );
	  }
	
	  // Working variables
	  var al, bl, cl, dl, el;
	  var ar, br, cr, dr, er;
	
	  ar = al = H[0];
	  br = bl = H[1];
	  cr = cl = H[2];
	  dr = dl = H[3];
	  er = el = H[4];
	  // Computation
	  var t;
	  for (var i = 0; i < 80; i += 1) {
	    t = (al +  M[offset+zl[i]])|0;
	    if (i<16){
	        t +=  f1(bl,cl,dl) + hl[0];
	    } else if (i<32) {
	        t +=  f2(bl,cl,dl) + hl[1];
	    } else if (i<48) {
	        t +=  f3(bl,cl,dl) + hl[2];
	    } else if (i<64) {
	        t +=  f4(bl,cl,dl) + hl[3];
	    } else {// if (i<80) {
	        t +=  f5(bl,cl,dl) + hl[4];
	    }
	    t = t|0;
	    t =  rotl(t,sl[i]);
	    t = (t+el)|0;
	    al = el;
	    el = dl;
	    dl = rotl(cl, 10);
	    cl = bl;
	    bl = t;
	
	    t = (ar + M[offset+zr[i]])|0;
	    if (i<16){
	        t +=  f5(br,cr,dr) + hr[0];
	    } else if (i<32) {
	        t +=  f4(br,cr,dr) + hr[1];
	    } else if (i<48) {
	        t +=  f3(br,cr,dr) + hr[2];
	    } else if (i<64) {
	        t +=  f2(br,cr,dr) + hr[3];
	    } else {// if (i<80) {
	        t +=  f1(br,cr,dr) + hr[4];
	    }
	    t = t|0;
	    t =  rotl(t,sr[i]) ;
	    t = (t+er)|0;
	    ar = er;
	    er = dr;
	    dr = rotl(cr, 10);
	    cr = br;
	    br = t;
	  }
	  // Intermediate hash value
	  t    = (H[1] + cl + dr)|0;
	  H[1] = (H[2] + dl + er)|0;
	  H[2] = (H[3] + el + ar)|0;
	  H[3] = (H[4] + al + br)|0;
	  H[4] = (H[0] + bl + cr)|0;
	  H[0] =  t;
	};
	
	function f1(x, y, z) {
	  return ((x) ^ (y) ^ (z));
	}
	
	function f2(x, y, z) {
	  return (((x)&(y)) | ((~x)&(z)));
	}
	
	function f3(x, y, z) {
	  return (((x) | (~(y))) ^ (z));
	}
	
	function f4(x, y, z) {
	  return (((x) & (z)) | ((y)&(~(z))));
	}
	
	function f5(x, y, z) {
	  return ((x) ^ ((y) |(~(z))));
	}
	
	function rotl(x,n) {
	  return (x<<n) | (x>>>(32-n));
	}
	
	function ripemd160(message) {
	  var H = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0];
	
	  if (typeof message == 'string')
	    message = new Buffer(message, 'utf8');
	
	  var m = bytesToWords(message);
	
	  var nBitsLeft = message.length * 8;
	  var nBitsTotal = message.length * 8;
	
	  // Add padding
	  m[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	  m[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	      (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |
	      (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)
	  );
	
	  for (var i=0 ; i<m.length; i += 16) {
	    processBlock(H, m, i);
	  }
	
	  // Swap endian
	  for (var i = 0; i < 5; i++) {
	      // Shortcut
	    var H_i = H[i];
	
	    // Swap
	    H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	          (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	  }
	
	  var digestbytes = wordsToBytes(H);
	  return new Buffer(digestbytes);
	}
	
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var createHash = __webpack_require__(13)
	
	var zeroBuffer = new Buffer(128)
	zeroBuffer.fill(0)
	
	module.exports = Hmac
	
	function Hmac (alg, key) {
	  if(!(this instanceof Hmac)) return new Hmac(alg, key)
	  this._opad = opad
	  this._alg = alg
	
	  var blocksize = (alg === 'sha512') ? 128 : 64
	
	  key = this._key = !Buffer.isBuffer(key) ? new Buffer(key) : key
	
	  if(key.length > blocksize) {
	    key = createHash(alg).update(key).digest()
	  } else if(key.length < blocksize) {
	    key = Buffer.concat([key, zeroBuffer], blocksize)
	  }
	
	  var ipad = this._ipad = new Buffer(blocksize)
	  var opad = this._opad = new Buffer(blocksize)
	
	  for(var i = 0; i < blocksize; i++) {
	    ipad[i] = key[i] ^ 0x36
	    opad[i] = key[i] ^ 0x5C
	  }
	
	  this._hash = createHash(alg).update(ipad)
	}
	
	Hmac.prototype.update = function (data, enc) {
	  this._hash.update(data, enc)
	  return this
	}
	
	Hmac.prototype.digest = function (enc) {
	  var h = this._hash.digest()
	  return createHash(this._alg).update(this._opad).update(h).digest(enc)
	}
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var pbkdf2Export = __webpack_require__(27)
	
	module.exports = function (crypto, exports) {
	  exports = exports || {}
	
	  var exported = pbkdf2Export(crypto)
	
	  exports.pbkdf2 = exported.pbkdf2
	  exports.pbkdf2Sync = exported.pbkdf2Sync
	
	  return exports
	}


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {module.exports = function(crypto) {
	  function pbkdf2(password, salt, iterations, keylen, digest, callback) {
	    if ('function' === typeof digest) {
	      callback = digest
	      digest = undefined
	    }
	
	    if ('function' !== typeof callback)
	      throw new Error('No callback provided to pbkdf2')
	
	    setTimeout(function() {
	      var result
	
	      try {
	        result = pbkdf2Sync(password, salt, iterations, keylen, digest)
	      } catch (e) {
	        return callback(e)
	      }
	
	      callback(undefined, result)
	    })
	  }
	
	  function pbkdf2Sync(password, salt, iterations, keylen, digest) {
	    if ('number' !== typeof iterations)
	      throw new TypeError('Iterations not a number')
	
	    if (iterations < 0)
	      throw new TypeError('Bad iterations')
	
	    if ('number' !== typeof keylen)
	      throw new TypeError('Key length not a number')
	
	    if (keylen < 0)
	      throw new TypeError('Bad key length')
	
	    digest = digest || 'sha1'
	
	    if (!Buffer.isBuffer(password)) password = new Buffer(password)
	    if (!Buffer.isBuffer(salt)) salt = new Buffer(salt)
	
	    var hLen, l = 1, r, T
	    var DK = new Buffer(keylen)
	    var block1 = new Buffer(salt.length + 4)
	    salt.copy(block1, 0, 0, salt.length)
	
	    for (var i = 1; i <= l; i++) {
	      block1.writeUInt32BE(i, salt.length)
	
	      var U = crypto.createHmac(digest, password).update(block1).digest()
	
	      if (!hLen) {
	        hLen = U.length
	        T = new Buffer(hLen)
	        l = Math.ceil(keylen / hLen)
	        r = keylen - (l - 1) * hLen
	
	        if (keylen > (Math.pow(2, 32) - 1) * hLen)
	          throw new TypeError('keylen exceeds maximum length')
	      }
	
	      U.copy(T, 0, 0, hLen)
	
	      for (var j = 1; j < iterations; j++) {
	        U = crypto.createHmac(digest, password).update(U).digest()
	
	        for (var k = 0; k < hLen; k++) {
	          T[k] ^= U[k]
	        }
	      }
	
	      var destPos = (i - 1) * hLen
	      var len = (i == l ? r : hLen)
	      T.copy(DK, destPos, 0, len)
	    }
	
	    return DK
	  }
	
	  return {
	    pbkdf2: pbkdf2,
	    pbkdf2Sync: pbkdf2Sync
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function (crypto, exports) {
	  exports = exports || {};
	  var ciphers = __webpack_require__(29)(crypto);
	  exports.createCipher = ciphers.createCipher;
	  exports.createCipheriv = ciphers.createCipheriv;
	  var deciphers = __webpack_require__(63)(crypto);
	  exports.createDecipher = deciphers.createDecipher;
	  exports.createDecipheriv = deciphers.createDecipheriv;
	  var modes = __webpack_require__(54);
	  function listCiphers () {
	    return Object.keys(modes);
	  }
	  exports.listCiphers = listCiphers;
	};
	


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var aes = __webpack_require__(30);
	var Transform = __webpack_require__(31);
	var inherits = __webpack_require__(34);
	var modes = __webpack_require__(54);
	var ebtk = __webpack_require__(55);
	var StreamCipher = __webpack_require__(56);
	inherits(Cipher, Transform);
	function Cipher(mode, key, iv) {
	  if (!(this instanceof Cipher)) {
	    return new Cipher(mode, key, iv);
	  }
	  Transform.call(this);
	  this._cache = new Splitter();
	  this._cipher = new aes.AES(key);
	  this._prev = new Buffer(iv.length);
	  iv.copy(this._prev);
	  this._mode = mode;
	}
	Cipher.prototype._transform = function (data, _, next) {
	  this._cache.add(data);
	  var chunk;
	  var thing;
	  while ((chunk = this._cache.get())) {
	    thing = this._mode.encrypt(this, chunk);
	    this.push(thing);
	  }
	  next();
	};
	Cipher.prototype._flush = function (next) {
	  var chunk = this._cache.flush();
	  this.push(this._mode.encrypt(this, chunk));
	  this._cipher.scrub();
	  next();
	};
	
	
	function Splitter() {
	   if (!(this instanceof Splitter)) {
	    return new Splitter();
	  }
	  this.cache = new Buffer('');
	}
	Splitter.prototype.add = function (data) {
	  this.cache = Buffer.concat([this.cache, data]);
	};
	
	Splitter.prototype.get = function () {
	  if (this.cache.length > 15) {
	    var out = this.cache.slice(0, 16);
	    this.cache = this.cache.slice(16);
	    return out;
	  }
	  return null;
	};
	Splitter.prototype.flush = function () {
	  var len = 16 - this.cache.length;
	  var padBuff = new Buffer(len);
	
	  var i = -1;
	  while (++i < len) {
	    padBuff.writeUInt8(len, i);
	  }
	  var out = Buffer.concat([this.cache, padBuff]);
	  return out;
	};
	var modelist = {
	  ECB: __webpack_require__(57),
	  CBC: __webpack_require__(58),
	  CFB: __webpack_require__(60),
	  OFB: __webpack_require__(61),
	  CTR: __webpack_require__(62)
	};
	module.exports = function (crypto) {
	  function createCipheriv(suite, password, iv) {
	    var config = modes[suite];
	    if (!config) {
	      throw new TypeError('invalid suite type');
	    }
	    if (typeof iv === 'string') {
	      iv = new Buffer(iv);
	    }
	    if (typeof password === 'string') {
	      password = new Buffer(password);
	    }
	    if (password.length !== config.key/8) {
	      throw new TypeError('invalid key length ' + password.length);
	    }
	    if (iv.length !== config.iv) {
	      throw new TypeError('invalid iv length ' + iv.length);
	    }
	    if (config.type === 'stream') {
	      return new StreamCipher(modelist[config.mode], password, iv);
	    }
	    return new Cipher(modelist[config.mode], password, iv);
	  }
	  function createCipher (suite, password) {
	    var config = modes[suite];
	    if (!config) {
	      throw new TypeError('invalid suite type');
	    }
	    var keys = ebtk(crypto, password, config.key, config.iv);
	    return createCipheriv(suite, keys.key, keys.iv);
	  }
	  return {
	    createCipher: createCipher,
	    createCipheriv: createCipheriv
	  };
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var uint_max = Math.pow(2, 32);
	function fixup_uint32(x) {
	    var ret, x_pos;
	    ret = x > uint_max || x < 0 ? (x_pos = Math.abs(x) % uint_max, x < 0 ? uint_max - x_pos : x_pos) : x;
	    return ret;
	}
	function scrub_vec(v) {
	  var i, _i, _ref;
	  for (i = _i = 0, _ref = v.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
	    v[i] = 0;
	  }
	  return false;
	}
	
	function Global() {
	  var i;
	  this.SBOX = [];
	  this.INV_SBOX = [];
	  this.SUB_MIX = (function() {
	    var _i, _results;
	    _results = [];
	    for (i = _i = 0; _i < 4; i = ++_i) {
	      _results.push([]);
	    }
	    return _results;
	  })();
	  this.INV_SUB_MIX = (function() {
	    var _i, _results;
	    _results = [];
	    for (i = _i = 0; _i < 4; i = ++_i) {
	      _results.push([]);
	    }
	    return _results;
	  })();
	  this.init();
	  this.RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];
	}
	
	Global.prototype.init = function() {
	  var d, i, sx, t, x, x2, x4, x8, xi, _i;
	  d = (function() {
	    var _i, _results;
	    _results = [];
	    for (i = _i = 0; _i < 256; i = ++_i) {
	      if (i < 128) {
	        _results.push(i << 1);
	      } else {
	        _results.push((i << 1) ^ 0x11b);
	      }
	    }
	    return _results;
	  })();
	  x = 0;
	  xi = 0;
	  for (i = _i = 0; _i < 256; i = ++_i) {
	    sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
	    sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
	    this.SBOX[x] = sx;
	    this.INV_SBOX[sx] = x;
	    x2 = d[x];
	    x4 = d[x2];
	    x8 = d[x4];
	    t = (d[sx] * 0x101) ^ (sx * 0x1010100);
	    this.SUB_MIX[0][x] = (t << 24) | (t >>> 8);
	    this.SUB_MIX[1][x] = (t << 16) | (t >>> 16);
	    this.SUB_MIX[2][x] = (t << 8) | (t >>> 24);
	    this.SUB_MIX[3][x] = t;
	    t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
	    this.INV_SUB_MIX[0][sx] = (t << 24) | (t >>> 8);
	    this.INV_SUB_MIX[1][sx] = (t << 16) | (t >>> 16);
	    this.INV_SUB_MIX[2][sx] = (t << 8) | (t >>> 24);
	    this.INV_SUB_MIX[3][sx] = t;
	    if (x === 0) {
	      x = xi = 1;
	    } else {
	      x = x2 ^ d[d[d[x8 ^ x2]]];
	      xi ^= d[d[xi]];
	    }
	  }
	  return true;
	};
	
	var G = new Global();
	
	
	AES.blockSize = 4 * 4;
	
	AES.prototype.blockSize = AES.blockSize;
	
	AES.keySize = 256 / 8;
	
	AES.prototype.keySize = AES.keySize;
	
	AES.ivSize = AES.blockSize;
	
	AES.prototype.ivSize = AES.ivSize;
	
	 function bufferToArray(buf) {
	  var len = buf.length/4;
	  var out = new Array(len);
	  var i = -1;
	  while (++i < len) {
	    out[i] = buf.readUInt32BE(i * 4);
	  }
	  return out;
	 }
	function AES(key) {
	  this._key = bufferToArray(key);
	  this._doReset();
	}
	
	AES.prototype._doReset = function() {
	  var invKsRow, keySize, keyWords, ksRow, ksRows, t, _i, _j;
	  keyWords = this._key;
	  keySize = keyWords.length;
	  this._nRounds = keySize + 6;
	  ksRows = (this._nRounds + 1) * 4;
	  this._keySchedule = [];
	  for (ksRow = _i = 0; 0 <= ksRows ? _i < ksRows : _i > ksRows; ksRow = 0 <= ksRows ? ++_i : --_i) {
	    this._keySchedule[ksRow] = ksRow < keySize ? keyWords[ksRow] : (t = this._keySchedule[ksRow - 1], (ksRow % keySize) === 0 ? (t = (t << 8) | (t >>> 24), t = (G.SBOX[t >>> 24] << 24) | (G.SBOX[(t >>> 16) & 0xff] << 16) | (G.SBOX[(t >>> 8) & 0xff] << 8) | G.SBOX[t & 0xff], t ^= G.RCON[(ksRow / keySize) | 0] << 24) : keySize > 6 && ksRow % keySize === 4 ? t = (G.SBOX[t >>> 24] << 24) | (G.SBOX[(t >>> 16) & 0xff] << 16) | (G.SBOX[(t >>> 8) & 0xff] << 8) | G.SBOX[t & 0xff] : void 0, this._keySchedule[ksRow - keySize] ^ t);
	  }
	  this._invKeySchedule = [];
	  for (invKsRow = _j = 0; 0 <= ksRows ? _j < ksRows : _j > ksRows; invKsRow = 0 <= ksRows ? ++_j : --_j) {
	    ksRow = ksRows - invKsRow;
	    t = this._keySchedule[ksRow - (invKsRow % 4 ? 0 : 4)];
	    this._invKeySchedule[invKsRow] = invKsRow < 4 || ksRow <= 4 ? t : G.INV_SUB_MIX[0][G.SBOX[t >>> 24]] ^ G.INV_SUB_MIX[1][G.SBOX[(t >>> 16) & 0xff]] ^ G.INV_SUB_MIX[2][G.SBOX[(t >>> 8) & 0xff]] ^ G.INV_SUB_MIX[3][G.SBOX[t & 0xff]];
	  }
	  return true;
	};
	
	AES.prototype.encryptBlock = function(M) {
	  M = bufferToArray(new Buffer(M));
	  var out = this._doCryptBlock(M, this._keySchedule, G.SUB_MIX, G.SBOX);
	  var buf = new Buffer(16);
	  buf.writeUInt32BE(out[0], 0);
	  buf.writeUInt32BE(out[1], 4);
	  buf.writeUInt32BE(out[2], 8);
	  buf.writeUInt32BE(out[3], 12);
	  return buf;
	};
	
	AES.prototype.decryptBlock = function(M) {
	  M = bufferToArray(new Buffer(M));
	  var temp = [M[3], M[1]];
	  M[1] = temp[0];
	  M[3] = temp[1];
	  var out = this._doCryptBlock(M, this._invKeySchedule, G.INV_SUB_MIX, G.INV_SBOX);
	  var buf = new Buffer(16);
	  buf.writeUInt32BE(out[0], 0);
	  buf.writeUInt32BE(out[3], 4);
	  buf.writeUInt32BE(out[2], 8);
	  buf.writeUInt32BE(out[1], 12);
	  return buf;
	};
	
	AES.prototype.scrub = function() {
	  scrub_vec(this._keySchedule);
	  scrub_vec(this._invKeySchedule);
	  scrub_vec(this._key);
	};
	
	AES.prototype._doCryptBlock = function(M, keySchedule, SUB_MIX, SBOX) {
	  var ksRow, round, s0, s1, s2, s3, t0, t1, t2, t3, _i, _ref;
	
	  s0 = M[0] ^ keySchedule[0];
	  s1 = M[1] ^ keySchedule[1];
	  s2 = M[2] ^ keySchedule[2];
	  s3 = M[3] ^ keySchedule[3];
	  ksRow = 4;
	  for (round = _i = 1, _ref = this._nRounds; 1 <= _ref ? _i < _ref : _i > _ref; round = 1 <= _ref ? ++_i : --_i) {
	    t0 = SUB_MIX[0][s0 >>> 24] ^ SUB_MIX[1][(s1 >>> 16) & 0xff] ^ SUB_MIX[2][(s2 >>> 8) & 0xff] ^ SUB_MIX[3][s3 & 0xff] ^ keySchedule[ksRow++];
	    t1 = SUB_MIX[0][s1 >>> 24] ^ SUB_MIX[1][(s2 >>> 16) & 0xff] ^ SUB_MIX[2][(s3 >>> 8) & 0xff] ^ SUB_MIX[3][s0 & 0xff] ^ keySchedule[ksRow++];
	    t2 = SUB_MIX[0][s2 >>> 24] ^ SUB_MIX[1][(s3 >>> 16) & 0xff] ^ SUB_MIX[2][(s0 >>> 8) & 0xff] ^ SUB_MIX[3][s1 & 0xff] ^ keySchedule[ksRow++];
	    t3 = SUB_MIX[0][s3 >>> 24] ^ SUB_MIX[1][(s0 >>> 16) & 0xff] ^ SUB_MIX[2][(s1 >>> 8) & 0xff] ^ SUB_MIX[3][s2 & 0xff] ^ keySchedule[ksRow++];
	    s0 = t0;
	    s1 = t1;
	    s2 = t2;
	    s3 = t3;
	  }
	  t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
	  t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
	  t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
	  t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];
	  return [
	    fixup_uint32(t0),
	    fixup_uint32(t1),
	    fixup_uint32(t2),
	    fixup_uint32(t3)
	  ];
	
	};
	
	
	
	
	  exports.AES = AES;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var Transform = __webpack_require__(32).Transform;
	var inherits = __webpack_require__(34);
	
	module.exports = CipherBase;
	inherits(CipherBase, Transform);
	function CipherBase() {
	  Transform.call(this);
	}
	CipherBase.prototype.update = function (data, inputEnd, outputEnc) {
	  this.write(data, inputEnd);
	  var outData = new Buffer('');
	  var chunk;
	  while ((chunk = this.read())) {
	    outData = Buffer.concat([outData, chunk]);
	  }
	  if (outputEnc) {
	    outData = outData.toString(outputEnc);
	  }
	  return outData;
	};
	CipherBase.prototype.final = function (outputEnc) {
	  this.end();
	  var outData = new Buffer('');
	  var chunk;
	  while ((chunk = this.read())) {
	    outData = Buffer.concat([outData, chunk]);
	  }
	  if (outputEnc) {
	    outData = outData.toString(outputEnc);
	  }
	  return outData;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	module.exports = Stream;
	
	var EE = __webpack_require__(33).EventEmitter;
	var inherits = __webpack_require__(34);
	
	inherits(Stream, EE);
	Stream.Readable = __webpack_require__(35);
	Stream.Writable = __webpack_require__(50);
	Stream.Duplex = __webpack_require__(51);
	Stream.Transform = __webpack_require__(52);
	Stream.PassThrough = __webpack_require__(53);
	
	// Backwards-compat with node 0.4.x
	Stream.Stream = Stream;
	
	
	
	// old-style streams.  Note that the pipe method (the only relevant
	// part of this class) is overridden in the Readable class.
	
	function Stream() {
	  EE.call(this);
	}
	
	Stream.prototype.pipe = function(dest, options) {
	  var source = this;
	
	  function ondata(chunk) {
	    if (dest.writable) {
	      if (false === dest.write(chunk) && source.pause) {
	        source.pause();
	      }
	    }
	  }
	
	  source.on('data', ondata);
	
	  function ondrain() {
	    if (source.readable && source.resume) {
	      source.resume();
	    }
	  }
	
	  dest.on('drain', ondrain);
	
	  // If the 'end' option is not supplied, dest.end() will be called when
	  // source gets the 'end' or 'close' events.  Only dest.end() once.
	  if (!dest._isStdio && (!options || options.end !== false)) {
	    source.on('end', onend);
	    source.on('close', onclose);
	  }
	
	  var didOnEnd = false;
	  function onend() {
	    if (didOnEnd) return;
	    didOnEnd = true;
	
	    dest.end();
	  }
	
	
	  function onclose() {
	    if (didOnEnd) return;
	    didOnEnd = true;
	
	    if (typeof dest.destroy === 'function') dest.destroy();
	  }
	
	  // don't leave dangling pipes when there are errors.
	  function onerror(er) {
	    cleanup();
	    if (EE.listenerCount(this, 'error') === 0) {
	      throw er; // Unhandled stream error in pipe.
	    }
	  }
	
	  source.on('error', onerror);
	  dest.on('error', onerror);
	
	  // remove all the event listeners that were added.
	  function cleanup() {
	    source.removeListener('data', ondata);
	    dest.removeListener('drain', ondrain);
	
	    source.removeListener('end', onend);
	    source.removeListener('close', onclose);
	
	    source.removeListener('error', onerror);
	    dest.removeListener('error', onerror);
	
	    source.removeListener('end', cleanup);
	    source.removeListener('close', cleanup);
	
	    dest.removeListener('close', cleanup);
	  }
	
	  source.on('end', cleanup);
	  source.on('close', cleanup);
	
	  dest.on('close', cleanup);
	
	  dest.emit('pipe', source);
	
	  // Allow for unix-like usage: A.pipe(B).pipe(C)
	  return dest;
	};


/***/ },
/* 33 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 34 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var Stream = (function (){
	  try {
	    return __webpack_require__(32); // hack to fix a circular dependency issue when used with browserify
	  } catch(_){}
	}());
	exports = module.exports = __webpack_require__(36);
	exports.Stream = Stream || exports;
	exports.Readable = exports;
	exports.Writable = __webpack_require__(43);
	exports.Duplex = __webpack_require__(42);
	exports.Transform = __webpack_require__(48);
	exports.PassThrough = __webpack_require__(49);
	
	if (!process.browser && process.env.READABLE_STREAM === 'disable' && Stream) {
	  module.exports = Stream;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	module.exports = Readable;
	
	/*<replacement>*/
	var processNextTick = __webpack_require__(37);
	/*</replacement>*/
	
	/*<replacement>*/
	var isArray = __webpack_require__(10);
	/*</replacement>*/
	
	/*<replacement>*/
	var Duplex;
	/*</replacement>*/
	
	Readable.ReadableState = ReadableState;
	
	/*<replacement>*/
	var EE = __webpack_require__(33).EventEmitter;
	
	var EElistenerCount = function (emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/
	
	/*<replacement>*/
	var Stream;
	(function () {
	  try {
	    Stream = __webpack_require__(32);
	  } catch (_) {} finally {
	    if (!Stream) Stream = __webpack_require__(33).EventEmitter;
	  }
	})();
	/*</replacement>*/
	
	var Buffer = __webpack_require__(7).Buffer;
	/*<replacement>*/
	var bufferShim = __webpack_require__(38);
	/*</replacement>*/
	
	/*<replacement>*/
	var util = __webpack_require__(39);
	util.inherits = __webpack_require__(34);
	/*</replacement>*/
	
	/*<replacement>*/
	var debugUtil = __webpack_require__(40);
	var debug = void 0;
	if (debugUtil && debugUtil.debuglog) {
	  debug = debugUtil.debuglog('stream');
	} else {
	  debug = function () {};
	}
	/*</replacement>*/
	
	var BufferList = __webpack_require__(41);
	var StringDecoder;
	
	util.inherits(Readable, Stream);
	
	function prependListener(emitter, event, fn) {
	  // Sadly this is not cacheable as some libraries bundle their own
	  // event emitter implementation with them.
	  if (typeof emitter.prependListener === 'function') {
	    return emitter.prependListener(event, fn);
	  } else {
	    // This is a hack to make sure that our error handler is attached before any
	    // userland ones.  NEVER DO THIS. This is here only because this code needs
	    // to continue to work with older versions of Node.js that do not include
	    // the prependListener() method. The goal is to eventually remove this hack.
	    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
	  }
	}
	
	function ReadableState(options, stream) {
	  Duplex = Duplex || __webpack_require__(42);
	
	  options = options || {};
	
	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;
	
	  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;
	
	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
	
	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;
	
	  // A linked list is used to store data chunks instead of an array because the
	  // linked list can remove elements from the beginning faster than
	  // array.shift()
	  this.buffer = new BufferList();
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;
	
	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;
	
	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;
	  this.resumeScheduled = false;
	
	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';
	
	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;
	
	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;
	
	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;
	
	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder) StringDecoder = __webpack_require__(47).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}
	
	function Readable(options) {
	  Duplex = Duplex || __webpack_require__(42);
	
	  if (!(this instanceof Readable)) return new Readable(options);
	
	  this._readableState = new ReadableState(options, this);
	
	  // legacy
	  this.readable = true;
	
	  if (options && typeof options.read === 'function') this._read = options.read;
	
	  Stream.call(this);
	}
	
	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function (chunk, encoding) {
	  var state = this._readableState;
	
	  if (!state.objectMode && typeof chunk === 'string') {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = bufferShim.from(chunk, encoding);
	      encoding = '';
	    }
	  }
	
	  return readableAddChunk(this, state, chunk, encoding, false);
	};
	
	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function (chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};
	
	Readable.prototype.isPaused = function () {
	  return this._readableState.flowing === false;
	};
	
	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (chunk === null) {
	    state.reading = false;
	    onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var _e = new Error('stream.unshift() after end event');
	      stream.emit('error', _e);
	    } else {
	      var skipAdd;
	      if (state.decoder && !addToFront && !encoding) {
	        chunk = state.decoder.write(chunk);
	        skipAdd = !state.objectMode && chunk.length === 0;
	      }
	
	      if (!addToFront) state.reading = false;
	
	      // Don't add to the buffer if we've decoded to an empty string chunk and
	      // we're not in object mode
	      if (!skipAdd) {
	        // if we want the data now, just emit it.
	        if (state.flowing && state.length === 0 && !state.sync) {
	          stream.emit('data', chunk);
	          stream.read(0);
	        } else {
	          // update the buffer info.
	          state.length += state.objectMode ? 1 : chunk.length;
	          if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
	
	          if (state.needReadable) emitReadable(stream);
	        }
	      }
	
	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }
	
	  return needMoreData(state);
	}
	
	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
	}
	
	// backwards compatibility.
	Readable.prototype.setEncoding = function (enc) {
	  if (!StringDecoder) StringDecoder = __webpack_require__(47).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	  return this;
	};
	
	// Don't raise the hwm > 8MB
	var MAX_HWM = 0x800000;
	function computeNewHighWaterMark(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2 to prevent increasing hwm excessively in
	    // tiny amounts
	    n--;
	    n |= n >>> 1;
	    n |= n >>> 2;
	    n |= n >>> 4;
	    n |= n >>> 8;
	    n |= n >>> 16;
	    n++;
	  }
	  return n;
	}
	
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function howMuchToRead(n, state) {
	  if (n <= 0 || state.length === 0 && state.ended) return 0;
	  if (state.objectMode) return 1;
	  if (n !== n) {
	    // Only flow one buffer at a time
	    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
	  }
	  // If we're asking for more than the current hwm, then raise the hwm.
	  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
	  if (n <= state.length) return n;
	  // Don't have enough
	  if (!state.ended) {
	    state.needReadable = true;
	    return 0;
	  }
	  return state.length;
	}
	
	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function (n) {
	  debug('read', n);
	  n = parseInt(n, 10);
	  var state = this._readableState;
	  var nOrig = n;
	
	  if (n !== 0) state.emittedReadable = false;
	
	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
	    return null;
	  }
	
	  n = howMuchToRead(n, state);
	
	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0) endReadable(this);
	    return null;
	  }
	
	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.
	
	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;
	  debug('need readable', doRead);
	
	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }
	
	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  } else if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0) state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	    // If _read pushed data synchronously, then `reading` will be false,
	    // and we need to re-evaluate how much data we can return to the user.
	    if (!state.reading) n = howMuchToRead(nOrig, state);
	  }
	
	  var ret;
	  if (n > 0) ret = fromList(n, state);else ret = null;
	
	  if (ret === null) {
	    state.needReadable = true;
	    n = 0;
	  } else {
	    state.length -= n;
	  }
	
	  if (state.length === 0) {
	    // If we have nothing in the buffer, then we want to know
	    // as soon as we *do* get something into the buffer.
	    if (!state.ended) state.needReadable = true;
	
	    // If we tried to read() past the EOF, then emit end on the next tick.
	    if (nOrig !== n && state.ended) endReadable(this);
	  }
	
	  if (ret !== null) this.emit('data', ret);
	
	  return ret;
	};
	
	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}
	
	function onEofChunk(stream, state) {
	  if (state.ended) return;
	  if (state.decoder) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;
	
	  // emit 'readable' now to make sure it gets picked up.
	  emitReadable(stream);
	}
	
	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
	  }
	}
	
	function emitReadable_(stream) {
	  debug('emit readable');
	  stream.emit('readable');
	  flow(stream);
	}
	
	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    processNextTick(maybeReadMore_, stream, state);
	  }
	}
	
	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;else len = state.length;
	  }
	  state.readingMore = false;
	}
	
	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function (n) {
	  this.emit('error', new Error('_read() is not implemented'));
	};
	
	Readable.prototype.pipe = function (dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;
	
	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
	
	  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
	
	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);
	
	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    debug('onunpipe');
	    if (readable === src) {
	      cleanup();
	    }
	  }
	
	  function onend() {
	    debug('onend');
	    dest.end();
	  }
	
	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);
	
	  var cleanedUp = false;
	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);
	    src.removeListener('data', ondata);
	
	    cleanedUp = true;
	
	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
	  }
	
	  // If the user pushes more data while we're writing to dest then we'll end up
	  // in ondata again. However, we only want to increase awaitDrain once because
	  // dest will only emit one 'drain' event for the multiple writes.
	  // => Introduce a guard on increasing awaitDrain.
	  var increasedAwaitDrain = false;
	  src.on('data', ondata);
	  function ondata(chunk) {
	    debug('ondata');
	    increasedAwaitDrain = false;
	    var ret = dest.write(chunk);
	    if (false === ret && !increasedAwaitDrain) {
	      // If the user unpiped during `dest.write()`, it is possible
	      // to get stuck in a permanently paused state if that write
	      // also returned false.
	      // => Check whether `dest` is still a piping destination.
	      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
	        debug('false write response, pause', src._readableState.awaitDrain);
	        src._readableState.awaitDrain++;
	        increasedAwaitDrain = true;
	      }
	      src.pause();
	    }
	  }
	
	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
	  }
	
	  // Make sure our error handler is attached before userland ones.
	  prependListener(dest, 'error', onerror);
	
	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);
	
	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  }
	
	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);
	
	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }
	
	  return dest;
	};
	
	function pipeOnDrain(src) {
	  return function () {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain) state.awaitDrain--;
	    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}
	
	Readable.prototype.unpipe = function (dest) {
	  var state = this._readableState;
	
	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0) return this;
	
	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes) return this;
	
	    if (!dest) dest = state.pipes;
	
	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest) dest.emit('unpipe', this);
	    return this;
	  }
	
	  // slow case. multiple pipe destinations.
	
	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	
	    for (var i = 0; i < len; i++) {
	      dests[i].emit('unpipe', this);
	    }return this;
	  }
	
	  // try to find the right one.
	  var index = indexOf(state.pipes, dest);
	  if (index === -1) return this;
	
	  state.pipes.splice(index, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1) state.pipes = state.pipes[0];
	
	  dest.emit('unpipe', this);
	
	  return this;
	};
	
	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function (ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);
	
	  if (ev === 'data') {
	    // Start flowing on next tick if stream isn't explicitly paused
	    if (this._readableState.flowing !== false) this.resume();
	  } else if (ev === 'readable') {
	    var state = this._readableState;
	    if (!state.endEmitted && !state.readableListening) {
	      state.readableListening = state.needReadable = true;
	      state.emittedReadable = false;
	      if (!state.reading) {
	        processNextTick(nReadingNextTick, this);
	      } else if (state.length) {
	        emitReadable(this, state);
	      }
	    }
	  }
	
	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;
	
	function nReadingNextTick(self) {
	  debug('readable nexttick read 0');
	  self.read(0);
	}
	
	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function () {
	  var state = this._readableState;
	  if (!state.flowing) {
	    debug('resume');
	    state.flowing = true;
	    resume(this, state);
	  }
	  return this;
	};
	
	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    processNextTick(resume_, stream, state);
	  }
	}
	
	function resume_(stream, state) {
	  if (!state.reading) {
	    debug('resume read 0');
	    stream.read(0);
	  }
	
	  state.resumeScheduled = false;
	  state.awaitDrain = 0;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading) stream.read(0);
	}
	
	Readable.prototype.pause = function () {
	  debug('call pause flowing=%j', this._readableState.flowing);
	  if (false !== this._readableState.flowing) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }
	  return this;
	};
	
	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);
	  while (state.flowing && stream.read() !== null) {}
	}
	
	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function (stream) {
	  var state = this._readableState;
	  var paused = false;
	
	  var self = this;
	  stream.on('end', function () {
	    debug('wrapped end');
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length) self.push(chunk);
	    }
	
	    self.push(null);
	  });
	
	  stream.on('data', function (chunk) {
	    debug('wrapped data');
	    if (state.decoder) chunk = state.decoder.write(chunk);
	
	    // don't skip over falsy values in objectMode
	    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;
	
	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });
	
	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (this[i] === undefined && typeof stream[i] === 'function') {
	      this[i] = function (method) {
	        return function () {
	          return stream[method].apply(stream, arguments);
	        };
	      }(i);
	    }
	  }
	
	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function (ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });
	
	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function (n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };
	
	  return self;
	};
	
	// exposed for testing purposes only.
	Readable._fromList = fromList;
	
	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function fromList(n, state) {
	  // nothing buffered
	  if (state.length === 0) return null;
	
	  var ret;
	  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
	    // read it all, truncate the list
	    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
	    state.buffer.clear();
	  } else {
	    // read part of list
	    ret = fromListPartial(n, state.buffer, state.decoder);
	  }
	
	  return ret;
	}
	
	// Extracts only enough buffered data to satisfy the amount requested.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function fromListPartial(n, list, hasStrings) {
	  var ret;
	  if (n < list.head.data.length) {
	    // slice is the same for buffers and strings
	    ret = list.head.data.slice(0, n);
	    list.head.data = list.head.data.slice(n);
	  } else if (n === list.head.data.length) {
	    // first chunk is a perfect match
	    ret = list.shift();
	  } else {
	    // result spans more than one buffer
	    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
	  }
	  return ret;
	}
	
	// Copies a specified amount of characters from the list of buffered data
	// chunks.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function copyFromBufferString(n, list) {
	  var p = list.head;
	  var c = 1;
	  var ret = p.data;
	  n -= ret.length;
	  while (p = p.next) {
	    var str = p.data;
	    var nb = n > str.length ? str.length : n;
	    if (nb === str.length) ret += str;else ret += str.slice(0, n);
	    n -= nb;
	    if (n === 0) {
	      if (nb === str.length) {
	        ++c;
	        if (p.next) list.head = p.next;else list.head = list.tail = null;
	      } else {
	        list.head = p;
	        p.data = str.slice(nb);
	      }
	      break;
	    }
	    ++c;
	  }
	  list.length -= c;
	  return ret;
	}
	
	// Copies a specified amount of bytes from the list of buffered data chunks.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function copyFromBuffer(n, list) {
	  var ret = bufferShim.allocUnsafe(n);
	  var p = list.head;
	  var c = 1;
	  p.data.copy(ret);
	  n -= p.data.length;
	  while (p = p.next) {
	    var buf = p.data;
	    var nb = n > buf.length ? buf.length : n;
	    buf.copy(ret, ret.length - n, 0, nb);
	    n -= nb;
	    if (n === 0) {
	      if (nb === buf.length) {
	        ++c;
	        if (p.next) list.head = p.next;else list.head = list.tail = null;
	      } else {
	        list.head = p;
	        p.data = buf.slice(nb);
	      }
	      break;
	    }
	    ++c;
	  }
	  list.length -= c;
	  return ret;
	}
	
	function endReadable(stream) {
	  var state = stream._readableState;
	
	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');
	
	  if (!state.endEmitted) {
	    state.ended = true;
	    processNextTick(endReadableNT, state, stream);
	  }
	}
	
	function endReadableNT(state, stream) {
	  // Check that we didn't get one last unshift.
	  if (!state.endEmitted && state.length === 0) {
	    state.endEmitted = true;
	    stream.readable = false;
	    stream.emit('end');
	  }
	}
	
	function forEach(xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}
	
	function indexOf(xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	if (!process.version ||
	    process.version.indexOf('v0.') === 0 ||
	    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
	  module.exports = nextTick;
	} else {
	  module.exports = process.nextTick;
	}
	
	function nextTick(fn, arg1, arg2, arg3) {
	  if (typeof fn !== 'function') {
	    throw new TypeError('"callback" argument must be a function');
	  }
	  var len = arguments.length;
	  var args, i;
	  switch (len) {
	  case 0:
	  case 1:
	    return process.nextTick(fn);
	  case 2:
	    return process.nextTick(function afterTickOne() {
	      fn.call(null, arg1);
	    });
	  case 3:
	    return process.nextTick(function afterTickTwo() {
	      fn.call(null, arg1, arg2);
	    });
	  case 4:
	    return process.nextTick(function afterTickThree() {
	      fn.call(null, arg1, arg2, arg3);
	    });
	  default:
	    args = new Array(len - 1);
	    i = 0;
	    while (i < args.length) {
	      args[i++] = arguments[i];
	    }
	    return process.nextTick(function afterTick() {
	      fn.apply(null, args);
	    });
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var buffer = __webpack_require__(7);
	var Buffer = buffer.Buffer;
	var SlowBuffer = buffer.SlowBuffer;
	var MAX_LEN = buffer.kMaxLength || 2147483647;
	exports.alloc = function alloc(size, fill, encoding) {
	  if (typeof Buffer.alloc === 'function') {
	    return Buffer.alloc(size, fill, encoding);
	  }
	  if (typeof encoding === 'number') {
	    throw new TypeError('encoding must not be number');
	  }
	  if (typeof size !== 'number') {
	    throw new TypeError('size must be a number');
	  }
	  if (size > MAX_LEN) {
	    throw new RangeError('size is too large');
	  }
	  var enc = encoding;
	  var _fill = fill;
	  if (_fill === undefined) {
	    enc = undefined;
	    _fill = 0;
	  }
	  var buf = new Buffer(size);
	  if (typeof _fill === 'string') {
	    var fillBuf = new Buffer(_fill, enc);
	    var flen = fillBuf.length;
	    var i = -1;
	    while (++i < size) {
	      buf[i] = fillBuf[i % flen];
	    }
	  } else {
	    buf.fill(_fill);
	  }
	  return buf;
	}
	exports.allocUnsafe = function allocUnsafe(size) {
	  if (typeof Buffer.allocUnsafe === 'function') {
	    return Buffer.allocUnsafe(size);
	  }
	  if (typeof size !== 'number') {
	    throw new TypeError('size must be a number');
	  }
	  if (size > MAX_LEN) {
	    throw new RangeError('size is too large');
	  }
	  return new Buffer(size);
	}
	exports.from = function from(value, encodingOrOffset, length) {
	  if (typeof Buffer.from === 'function' && (!global.Uint8Array || Uint8Array.from !== Buffer.from)) {
	    return Buffer.from(value, encodingOrOffset, length);
	  }
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number');
	  }
	  if (typeof value === 'string') {
	    return new Buffer(value, encodingOrOffset);
	  }
	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    var offset = encodingOrOffset;
	    if (arguments.length === 1) {
	      return new Buffer(value);
	    }
	    if (typeof offset === 'undefined') {
	      offset = 0;
	    }
	    var len = length;
	    if (typeof len === 'undefined') {
	      len = value.byteLength - offset;
	    }
	    if (offset >= value.byteLength) {
	      throw new RangeError('\'offset\' is out of bounds');
	    }
	    if (len > value.byteLength - offset) {
	      throw new RangeError('\'length\' is out of bounds');
	    }
	    return new Buffer(value.slice(offset, offset + len));
	  }
	  if (Buffer.isBuffer(value)) {
	    var out = new Buffer(value.length);
	    value.copy(out, 0, 0, value.length);
	    return out;
	  }
	  if (value) {
	    if (Array.isArray(value) || (typeof ArrayBuffer !== 'undefined' && value.buffer instanceof ArrayBuffer) || 'length' in value) {
	      return new Buffer(value);
	    }
	    if (value.type === 'Buffer' && Array.isArray(value.data)) {
	      return new Buffer(value.data);
	    }
	  }
	
	  throw new TypeError('First argument must be a string, Buffer, ' + 'ArrayBuffer, Array, or array-like object.');
	}
	exports.allocUnsafeSlow = function allocUnsafeSlow(size) {
	  if (typeof Buffer.allocUnsafeSlow === 'function') {
	    return Buffer.allocUnsafeSlow(size);
	  }
	  if (typeof size !== 'number') {
	    throw new TypeError('size must be a number');
	  }
	  if (size >= MAX_LEN) {
	    throw new RangeError('size is too large');
	  }
	  return new SlowBuffer(size);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	
	function isArray(arg) {
	  if (Array.isArray) {
	    return Array.isArray(arg);
	  }
	  return objectToString(arg) === '[object Array]';
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = Buffer.isBuffer;
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 40 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Buffer = __webpack_require__(7).Buffer;
	/*<replacement>*/
	var bufferShim = __webpack_require__(38);
	/*</replacement>*/
	
	module.exports = BufferList;
	
	function BufferList() {
	  this.head = null;
	  this.tail = null;
	  this.length = 0;
	}
	
	BufferList.prototype.push = function (v) {
	  var entry = { data: v, next: null };
	  if (this.length > 0) this.tail.next = entry;else this.head = entry;
	  this.tail = entry;
	  ++this.length;
	};
	
	BufferList.prototype.unshift = function (v) {
	  var entry = { data: v, next: this.head };
	  if (this.length === 0) this.tail = entry;
	  this.head = entry;
	  ++this.length;
	};
	
	BufferList.prototype.shift = function () {
	  if (this.length === 0) return;
	  var ret = this.head.data;
	  if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
	  --this.length;
	  return ret;
	};
	
	BufferList.prototype.clear = function () {
	  this.head = this.tail = null;
	  this.length = 0;
	};
	
	BufferList.prototype.join = function (s) {
	  if (this.length === 0) return '';
	  var p = this.head;
	  var ret = '' + p.data;
	  while (p = p.next) {
	    ret += s + p.data;
	  }return ret;
	};
	
	BufferList.prototype.concat = function (n) {
	  if (this.length === 0) return bufferShim.alloc(0);
	  if (this.length === 1) return this.head.data;
	  var ret = bufferShim.allocUnsafe(n >>> 0);
	  var p = this.head;
	  var i = 0;
	  while (p) {
	    p.data.copy(ret, i);
	    i += p.data.length;
	    p = p.next;
	  }
	  return ret;
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.
	
	'use strict';
	
	/*<replacement>*/
	
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    keys.push(key);
	  }return keys;
	};
	/*</replacement>*/
	
	module.exports = Duplex;
	
	/*<replacement>*/
	var processNextTick = __webpack_require__(37);
	/*</replacement>*/
	
	/*<replacement>*/
	var util = __webpack_require__(39);
	util.inherits = __webpack_require__(34);
	/*</replacement>*/
	
	var Readable = __webpack_require__(36);
	var Writable = __webpack_require__(43);
	
	util.inherits(Duplex, Readable);
	
	var keys = objectKeys(Writable.prototype);
	for (var v = 0; v < keys.length; v++) {
	  var method = keys[v];
	  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
	}
	
	function Duplex(options) {
	  if (!(this instanceof Duplex)) return new Duplex(options);
	
	  Readable.call(this, options);
	  Writable.call(this, options);
	
	  if (options && options.readable === false) this.readable = false;
	
	  if (options && options.writable === false) this.writable = false;
	
	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;
	
	  this.once('end', onend);
	}
	
	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended) return;
	
	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  processNextTick(onEndNT, this);
	}
	
	function onEndNT(self) {
	  self.end();
	}
	
	function forEach(xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, setImmediate) {// A bit simpler than readable streams.
	// Implement an async ._write(chunk, encoding, cb), and it'll handle all
	// the drain event emission and buffering.
	
	'use strict';
	
	module.exports = Writable;
	
	/*<replacement>*/
	var processNextTick = __webpack_require__(37);
	/*</replacement>*/
	
	/*<replacement>*/
	var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
	/*</replacement>*/
	
	/*<replacement>*/
	var Duplex;
	/*</replacement>*/
	
	Writable.WritableState = WritableState;
	
	/*<replacement>*/
	var util = __webpack_require__(39);
	util.inherits = __webpack_require__(34);
	/*</replacement>*/
	
	/*<replacement>*/
	var internalUtil = {
	  deprecate: __webpack_require__(46)
	};
	/*</replacement>*/
	
	/*<replacement>*/
	var Stream;
	(function () {
	  try {
	    Stream = __webpack_require__(32);
	  } catch (_) {} finally {
	    if (!Stream) Stream = __webpack_require__(33).EventEmitter;
	  }
	})();
	/*</replacement>*/
	
	var Buffer = __webpack_require__(7).Buffer;
	/*<replacement>*/
	var bufferShim = __webpack_require__(38);
	/*</replacement>*/
	
	util.inherits(Writable, Stream);
	
	function nop() {}
	
	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	  this.next = null;
	}
	
	function WritableState(options, stream) {
	  Duplex = Duplex || __webpack_require__(42);
	
	  options = options || {};
	
	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;
	
	  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;
	
	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
	
	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;
	
	  // drain event flag.
	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;
	
	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;
	
	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';
	
	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;
	
	  // a flag to see when we're in the middle of a write.
	  this.writing = false;
	
	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;
	
	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;
	
	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;
	
	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function (er) {
	    onwrite(stream, er);
	  };
	
	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;
	
	  // the amount that is being written when _write is called.
	  this.writelen = 0;
	
	  this.bufferedRequest = null;
	  this.lastBufferedRequest = null;
	
	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;
	
	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;
	
	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;
	
	  // count buffered requests
	  this.bufferedRequestCount = 0;
	
	  // allocate the first CorkedRequest, there is always
	  // one allocated and free to use, and we maintain at most two
	  this.corkedRequestsFree = new CorkedRequest(this);
	}
	
	WritableState.prototype.getBuffer = function getBuffer() {
	  var current = this.bufferedRequest;
	  var out = [];
	  while (current) {
	    out.push(current);
	    current = current.next;
	  }
	  return out;
	};
	
	(function () {
	  try {
	    Object.defineProperty(WritableState.prototype, 'buffer', {
	      get: internalUtil.deprecate(function () {
	        return this.getBuffer();
	      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
	    });
	  } catch (_) {}
	})();
	
	// Test _writableState for inheritance to account for Duplex streams,
	// whose prototype chain only points to Readable.
	var realHasInstance;
	if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
	  realHasInstance = Function.prototype[Symbol.hasInstance];
	  Object.defineProperty(Writable, Symbol.hasInstance, {
	    value: function (object) {
	      if (realHasInstance.call(this, object)) return true;
	
	      return object && object._writableState instanceof WritableState;
	    }
	  });
	} else {
	  realHasInstance = function (object) {
	    return object instanceof this;
	  };
	}
	
	function Writable(options) {
	  Duplex = Duplex || __webpack_require__(42);
	
	  // Writable ctor is applied to Duplexes, too.
	  // `realHasInstance` is necessary because using plain `instanceof`
	  // would return false, as no `_writableState` property is attached.
	
	  // Trying to use the custom `instanceof` for Writable here will also break the
	  // Node.js LazyTransform implementation, which has a non-trivial getter for
	  // `_writableState` that would lead to infinite recursion.
	  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
	    return new Writable(options);
	  }
	
	  this._writableState = new WritableState(options, this);
	
	  // legacy.
	  this.writable = true;
	
	  if (options) {
	    if (typeof options.write === 'function') this._write = options.write;
	
	    if (typeof options.writev === 'function') this._writev = options.writev;
	  }
	
	  Stream.call(this);
	}
	
	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function () {
	  this.emit('error', new Error('Cannot pipe, not readable'));
	};
	
	function writeAfterEnd(stream, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  processNextTick(cb, er);
	}
	
	// Checks that a user-supplied chunk is valid, especially for the particular
	// mode the stream is in. Currently this means that `null` is never accepted
	// and undefined/non-string values are only allowed in object mode.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  var er = false;
	
	  if (chunk === null) {
	    er = new TypeError('May not write null values to stream');
	  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  if (er) {
	    stream.emit('error', er);
	    processNextTick(cb, er);
	    valid = false;
	  }
	  return valid;
	}
	
	Writable.prototype.write = function (chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;
	  var isBuf = Buffer.isBuffer(chunk);
	
	  if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }
	
	  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
	
	  if (typeof cb !== 'function') cb = nop;
	
	  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
	  }
	
	  return ret;
	};
	
	Writable.prototype.cork = function () {
	  var state = this._writableState;
	
	  state.corked++;
	};
	
	Writable.prototype.uncork = function () {
	  var state = this._writableState;
	
	  if (state.corked) {
	    state.corked--;
	
	    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
	  }
	};
	
	Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
	  // node::ParseEncoding() requires lower case.
	  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
	  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
	  this._writableState.defaultEncoding = encoding;
	  return this;
	};
	
	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
	    chunk = bufferShim.from(chunk, encoding);
	  }
	  return chunk;
	}
	
	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
	  if (!isBuf) {
	    chunk = decodeChunk(state, chunk, encoding);
	    if (Buffer.isBuffer(chunk)) encoding = 'buffer';
	  }
	  var len = state.objectMode ? 1 : chunk.length;
	
	  state.length += len;
	
	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret) state.needDrain = true;
	
	  if (state.writing || state.corked) {
	    var last = state.lastBufferedRequest;
	    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
	    if (last) {
	      last.next = state.lastBufferedRequest;
	    } else {
	      state.bufferedRequest = state.lastBufferedRequest;
	    }
	    state.bufferedRequestCount += 1;
	  } else {
	    doWrite(stream, state, false, len, chunk, encoding, cb);
	  }
	
	  return ret;
	}
	
	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}
	
	function onwriteError(stream, state, sync, er, cb) {
	  --state.pendingcb;
	  if (sync) processNextTick(cb, er);else cb(er);
	
	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}
	
	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}
	
	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;
	
	  onwriteStateUpdate(state);
	
	  if (er) onwriteError(stream, state, sync, er, cb);else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(state);
	
	    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
	      clearBuffer(stream, state);
	    }
	
	    if (sync) {
	      /*<replacement>*/
	      asyncWrite(afterWrite, stream, state, finished, cb);
	      /*</replacement>*/
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}
	
	function afterWrite(stream, state, finished, cb) {
	  if (!finished) onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	}
	
	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}
	
	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;
	  var entry = state.bufferedRequest;
	
	  if (stream._writev && entry && entry.next) {
	    // Fast case, write everything using _writev()
	    var l = state.bufferedRequestCount;
	    var buffer = new Array(l);
	    var holder = state.corkedRequestsFree;
	    holder.entry = entry;
	
	    var count = 0;
	    while (entry) {
	      buffer[count] = entry;
	      entry = entry.next;
	      count += 1;
	    }
	
	    doWrite(stream, state, true, state.length, buffer, '', holder.finish);
	
	    // doWrite is almost always async, defer these to save a bit of time
	    // as the hot path ends with doWrite
	    state.pendingcb++;
	    state.lastBufferedRequest = null;
	    if (holder.next) {
	      state.corkedRequestsFree = holder.next;
	      holder.next = null;
	    } else {
	      state.corkedRequestsFree = new CorkedRequest(state);
	    }
	  } else {
	    // Slow case, write chunks one-by-one
	    while (entry) {
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;
	
	      doWrite(stream, state, false, len, chunk, encoding, cb);
	      entry = entry.next;
	      // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.
	      if (state.writing) {
	        break;
	      }
	    }
	
	    if (entry === null) state.lastBufferedRequest = null;
	  }
	
	  state.bufferedRequestCount = 0;
	  state.bufferedRequest = entry;
	  state.bufferProcessing = false;
	}
	
	Writable.prototype._write = function (chunk, encoding, cb) {
	  cb(new Error('_write() is not implemented'));
	};
	
	Writable.prototype._writev = null;
	
	Writable.prototype.end = function (chunk, encoding, cb) {
	  var state = this._writableState;
	
	  if (typeof chunk === 'function') {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }
	
	  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);
	
	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }
	
	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished) endWritable(this, state, cb);
	};
	
	function needFinish(state) {
	  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
	}
	
	function prefinish(stream, state) {
	  if (!state.prefinished) {
	    state.prefinished = true;
	    stream.emit('prefinish');
	  }
	}
	
	function finishMaybe(stream, state) {
	  var need = needFinish(state);
	  if (need) {
	    if (state.pendingcb === 0) {
	      prefinish(stream, state);
	      state.finished = true;
	      stream.emit('finish');
	    } else {
	      prefinish(stream, state);
	    }
	  }
	  return need;
	}
	
	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
	  }
	  state.ended = true;
	  stream.writable = false;
	}
	
	// It seems a linked list but it is not
	// there will be only 2 of these for each stream
	function CorkedRequest(state) {
	  var _this = this;
	
	  this.next = null;
	  this.entry = null;
	  this.finish = function (err) {
	    var entry = _this.entry;
	    _this.entry = null;
	    while (entry) {
	      var cb = entry.callback;
	      state.pendingcb--;
	      cb(err);
	      entry = entry.next;
	    }
	    if (state.corkedRequestsFree) {
	      state.corkedRequestsFree.next = _this;
	    } else {
	      state.corkedRequestsFree = _this;
	    }
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(44).setImmediate))

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var apply = Function.prototype.apply;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) {
	  if (timeout) {
	    timeout.close();
	  }
	};
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// setimmediate attaches itself to the global object
	__webpack_require__(45);
	exports.setImmediate = setImmediate;
	exports.clearImmediate = clearImmediate;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
	    "use strict";
	
	    if (global.setImmediate) {
	        return;
	    }
	
	    var nextHandle = 1; // Spec says greater than zero
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var registerImmediate;
	
	    function setImmediate(callback) {
	      // Callback can either be a function or a string
	      if (typeof callback !== "function") {
	        callback = new Function("" + callback);
	      }
	      // Copy function arguments
	      var args = new Array(arguments.length - 1);
	      for (var i = 0; i < args.length; i++) {
	          args[i] = arguments[i + 1];
	      }
	      // Store and register the task
	      var task = { callback: callback, args: args };
	      tasksByHandle[nextHandle] = task;
	      registerImmediate(nextHandle);
	      return nextHandle++;
	    }
	
	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }
	
	    function run(task) {
	        var callback = task.callback;
	        var args = task.args;
	        switch (args.length) {
	        case 0:
	            callback();
	            break;
	        case 1:
	            callback(args[0]);
	            break;
	        case 2:
	            callback(args[0], args[1]);
	            break;
	        case 3:
	            callback(args[0], args[1], args[2]);
	            break;
	        default:
	            callback.apply(undefined, args);
	            break;
	        }
	    }
	
	    function runIfPresent(handle) {
	        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // "too much recursion" error.
	            setTimeout(runIfPresent, 0, handle);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    run(task);
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }
	
	    function installNextTickImplementation() {
	        registerImmediate = function(handle) {
	            process.nextTick(function () { runIfPresent(handle); });
	        };
	    }
	
	    function canUsePostMessage() {
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `global.postMessage` means something completely different and can't be used for this purpose.
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function() {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }
	
	    function installPostMessageImplementation() {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
	
	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function(event) {
	            if (event.source === global &&
	                typeof event.data === "string" &&
	                event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };
	
	        if (global.addEventListener) {
	            global.addEventListener("message", onGlobalMessage, false);
	        } else {
	            global.attachEvent("onmessage", onGlobalMessage);
	        }
	
	        registerImmediate = function(handle) {
	            global.postMessage(messagePrefix + handle, "*");
	        };
	    }
	
	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function(event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };
	
	        registerImmediate = function(handle) {
	            channel.port2.postMessage(handle);
	        };
	    }
	
	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        registerImmediate = function(handle) {
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	        };
	    }
	
	    function installSetTimeoutImplementation() {
	        registerImmediate = function(handle) {
	            setTimeout(runIfPresent, 0, handle);
	        };
	    }
	
	    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;
	
	    // Don't get fooled by e.g. browserify environments.
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();
	
	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();
	
	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();
	
	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();
	
	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }
	
	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(2)))

/***/ },
/* 46 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/**
	 * Module exports.
	 */
	
	module.exports = deprecate;
	
	/**
	 * Mark that a method should not be used.
	 * Returns a modified function which warns once by default.
	 *
	 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
	 *
	 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
	 * will throw an Error when invoked.
	 *
	 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
	 * will invoke `console.trace()` instead of `console.error()`.
	 *
	 * @param {Function} fn - the function to deprecate
	 * @param {String} msg - the string to print to the console when `fn` is invoked
	 * @returns {Function} a new "deprecated" version of `fn`
	 * @api public
	 */
	
	function deprecate (fn, msg) {
	  if (config('noDeprecation')) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (config('throwDeprecation')) {
	        throw new Error(msg);
	      } else if (config('traceDeprecation')) {
	        console.trace(msg);
	      } else {
	        console.warn(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	}
	
	/**
	 * Checks `localStorage` for boolean values for the given `name`.
	 *
	 * @param {String} name
	 * @returns {Boolean}
	 * @api private
	 */
	
	function config (name) {
	  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
	  try {
	    if (!global.localStorage) return false;
	  } catch (_) {
	    return false;
	  }
	  var val = global.localStorage[name];
	  if (null == val) return false;
	  return String(val).toLowerCase() === 'true';
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var Buffer = __webpack_require__(7).Buffer;
	
	var isBufferEncoding = Buffer.isEncoding
	  || function(encoding) {
	       switch (encoding && encoding.toLowerCase()) {
	         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
	         default: return false;
	       }
	     }
	
	
	function assertEncoding(encoding) {
	  if (encoding && !isBufferEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	}
	
	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters. CESU-8 is handled as part of the UTF-8 encoding.
	//
	// @TODO Handling all encodings inside a single object makes it very difficult
	// to reason about this code, so it should be split up in the future.
	// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
	// points as used by CESU-8.
	var StringDecoder = exports.StringDecoder = function(encoding) {
	  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
	  assertEncoding(encoding);
	  switch (this.encoding) {
	    case 'utf8':
	      // CESU-8 represents each of Surrogate Pair by 3-bytes
	      this.surrogateSize = 3;
	      break;
	    case 'ucs2':
	    case 'utf16le':
	      // UTF-16 represents each of Surrogate Pair by 2-bytes
	      this.surrogateSize = 2;
	      this.detectIncompleteChar = utf16DetectIncompleteChar;
	      break;
	    case 'base64':
	      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
	      this.surrogateSize = 3;
	      this.detectIncompleteChar = base64DetectIncompleteChar;
	      break;
	    default:
	      this.write = passThroughWrite;
	      return;
	  }
	
	  // Enough space to store all bytes of a single character. UTF-8 needs 4
	  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
	  this.charBuffer = new Buffer(6);
	  // Number of bytes received for the current incomplete multi-byte character.
	  this.charReceived = 0;
	  // Number of bytes expected for the current incomplete multi-byte character.
	  this.charLength = 0;
	};
	
	
	// write decodes the given buffer and returns it as JS string that is
	// guaranteed to not contain any partial multi-byte characters. Any partial
	// character found at the end of the buffer is buffered up, and will be
	// returned when calling write again with the remaining bytes.
	//
	// Note: Converting a Buffer containing an orphan surrogate to a String
	// currently works, but converting a String to a Buffer (via `new Buffer`, or
	// Buffer#write) will replace incomplete surrogates with the unicode
	// replacement character. See https://codereview.chromium.org/121173009/ .
	StringDecoder.prototype.write = function(buffer) {
	  var charStr = '';
	  // if our last write ended with an incomplete multibyte character
	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var available = (buffer.length >= this.charLength - this.charReceived) ?
	        this.charLength - this.charReceived :
	        buffer.length;
	
	    // add the new bytes to the char buffer
	    buffer.copy(this.charBuffer, this.charReceived, 0, available);
	    this.charReceived += available;
	
	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    }
	
	    // remove bytes belonging to the current character from the buffer
	    buffer = buffer.slice(available, buffer.length);
	
	    // get the character that was split
	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
	
	    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	    var charCode = charStr.charCodeAt(charStr.length - 1);
	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }
	    this.charReceived = this.charLength = 0;
	
	    // if there are no more bytes in this buffer, just emit our char
	    if (buffer.length === 0) {
	      return charStr;
	    }
	    break;
	  }
	
	  // determine and set charLength / charReceived
	  this.detectIncompleteChar(buffer);
	
	  var end = buffer.length;
	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
	    end -= this.charReceived;
	  }
	
	  charStr += buffer.toString(this.encoding, 0, end);
	
	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end);
	  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    buffer.copy(this.charBuffer, 0, 0, size);
	    return charStr.substring(0, end);
	  }
	
	  // or just emit the charStr
	  return charStr;
	};
	
	// detectIncompleteChar determines if there is an incomplete UTF-8 character at
	// the end of the given buffer. If so, it sets this.charLength to the byte
	// length that character, and sets this.charReceived to the number of bytes
	// that are available for this character.
	StringDecoder.prototype.detectIncompleteChar = function(buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = (buffer.length >= 3) ? 3 : buffer.length;
	
	  // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.
	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i];
	
	    // See http://en.wikipedia.org/wiki/UTF-8#Description
	
	    // 110XXXXX
	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    }
	
	    // 1110XXXX
	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    }
	
	    // 11110XXX
	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }
	  this.charReceived = i;
	};
	
	StringDecoder.prototype.end = function(buffer) {
	  var res = '';
	  if (buffer && buffer.length)
	    res = this.write(buffer);
	
	  if (this.charReceived) {
	    var cr = this.charReceived;
	    var buf = this.charBuffer;
	    var enc = this.encoding;
	    res += buf.slice(0, cr).toString(enc);
	  }
	
	  return res;
	};
	
	function passThroughWrite(buffer) {
	  return buffer.toString(this.encoding);
	}
	
	function utf16DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 2;
	  this.charLength = this.charReceived ? 2 : 0;
	}
	
	function base64DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 3;
	  this.charLength = this.charReceived ? 3 : 0;
	}


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.
	
	'use strict';
	
	module.exports = Transform;
	
	var Duplex = __webpack_require__(42);
	
	/*<replacement>*/
	var util = __webpack_require__(39);
	util.inherits = __webpack_require__(34);
	/*</replacement>*/
	
	util.inherits(Transform, Duplex);
	
	function TransformState(stream) {
	  this.afterTransform = function (er, data) {
	    return afterTransform(stream, er, data);
	  };
	
	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	  this.writeencoding = null;
	}
	
	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;
	
	  var cb = ts.writecb;
	
	  if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));
	
	  ts.writechunk = null;
	  ts.writecb = null;
	
	  if (data !== null && data !== undefined) stream.push(data);
	
	  cb(er);
	
	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}
	
	function Transform(options) {
	  if (!(this instanceof Transform)) return new Transform(options);
	
	  Duplex.call(this, options);
	
	  this._transformState = new TransformState(this);
	
	  var stream = this;
	
	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;
	
	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;
	
	  if (options) {
	    if (typeof options.transform === 'function') this._transform = options.transform;
	
	    if (typeof options.flush === 'function') this._flush = options.flush;
	  }
	
	  // When the writable side finishes, then flush out anything remaining.
	  this.once('prefinish', function () {
	    if (typeof this._flush === 'function') this._flush(function (er, data) {
	      done(stream, er, data);
	    });else done(stream);
	  });
	}
	
	Transform.prototype.push = function (chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};
	
	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function (chunk, encoding, cb) {
	  throw new Error('_transform() is not implemented');
	};
	
	Transform.prototype._write = function (chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
	  }
	};
	
	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function (n) {
	  var ts = this._transformState;
	
	  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};
	
	function done(stream, er, data) {
	  if (er) return stream.emit('error', er);
	
	  if (data !== null && data !== undefined) stream.push(data);
	
	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var ts = stream._transformState;
	
	  if (ws.length) throw new Error('Calling transform done when ws.length != 0');
	
	  if (ts.transforming) throw new Error('Calling transform done when still transforming');
	
	  return stream.push(null);
	}

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// a passthrough stream.
	// basically just the most minimal sort of Transform stream.
	// Every written chunk gets output as-is.
	
	'use strict';
	
	module.exports = PassThrough;
	
	var Transform = __webpack_require__(48);
	
	/*<replacement>*/
	var util = __webpack_require__(39);
	util.inherits = __webpack_require__(34);
	/*</replacement>*/
	
	util.inherits(PassThrough, Transform);
	
	function PassThrough(options) {
	  if (!(this instanceof PassThrough)) return new PassThrough(options);
	
	  Transform.call(this, options);
	}
	
	PassThrough.prototype._transform = function (chunk, encoding, cb) {
	  cb(null, chunk);
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(43)


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(42)


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(48)


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(49)


/***/ },
/* 54 */
/***/ function(module, exports) {

	exports['aes-128-ecb'] = {
	  cipher: 'AES',
	  key: 128,
	  iv: 0,
	  mode: 'ECB',
	  type: 'block'
	};
	exports['aes-192-ecb'] = {
	  cipher: 'AES',
	  key: 192,
	  iv: 0,
	  mode: 'ECB',
	  type: 'block'
	};
	exports['aes-256-ecb'] = {
	  cipher: 'AES',
	  key: 256,
	  iv: 0,
	  mode: 'ECB',
	  type: 'block'
	};
	exports['aes-128-cbc'] = {
	  cipher: 'AES',
	  key: 128,
	  iv: 16,
	  mode: 'CBC',
	  type: 'block'
	};
	exports['aes-192-cbc'] = {
	  cipher: 'AES',
	  key: 192,
	  iv: 16,
	  mode: 'CBC',
	  type: 'block'
	};
	exports['aes-256-cbc'] = {
	  cipher: 'AES',
	  key: 256,
	  iv: 16,
	  mode: 'CBC',
	  type: 'block'
	};
	exports['aes128'] = exports['aes-128-cbc'];
	exports['aes192'] = exports['aes-192-cbc'];
	exports['aes256'] = exports['aes-256-cbc'];
	exports['aes-128-cfb'] = {
	  cipher: 'AES',
	  key: 128,
	  iv: 16,
	  mode: 'CFB',
	  type: 'stream'
	};
	exports['aes-192-cfb'] = {
	  cipher: 'AES',
	  key: 192,
	  iv: 16,
	  mode: 'CFB',
	  type: 'stream'
	};
	exports['aes-256-cfb'] = {
	  cipher: 'AES',
	  key: 256,
	  iv: 16,
	  mode: 'CFB',
	  type: 'stream'
	};
	exports['aes-128-ofb'] = {
	  cipher: 'AES',
	  key: 128,
	  iv: 16,
	  mode: 'OFB',
	  type: 'stream'
	};
	exports['aes-192-ofb'] = {
	  cipher: 'AES',
	  key: 192,
	  iv: 16,
	  mode: 'OFB',
	  type: 'stream'
	};
	exports['aes-256-ofb'] = {
	  cipher: 'AES',
	  key: 256,
	  iv: 16,
	  mode: 'OFB',
	  type: 'stream'
	};
	exports['aes-128-ctr'] = {
	  cipher: 'AES',
	  key: 128,
	  iv: 16,
	  mode: 'CTR',
	  type: 'stream'
	};
	exports['aes-192-ctr'] = {
	  cipher: 'AES',
	  key: 192,
	  iv: 16,
	  mode: 'CTR',
	  type: 'stream'
	};
	exports['aes-256-ctr'] = {
	  cipher: 'AES',
	  key: 256,
	  iv: 16,
	  mode: 'CTR',
	  type: 'stream'
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {
	module.exports = function (crypto, password, keyLen, ivLen) {
	  keyLen = keyLen/8;
	  ivLen = ivLen || 0;
	  var ki = 0;
	  var ii = 0;
	  var key = new Buffer(keyLen);
	  var iv = new Buffer(ivLen);
	  var addmd = 0;
	  var md, md_buf;
	  var i;
	  while (true) {
	    md = crypto.createHash('md5');
	    if(addmd++ > 0) {
	       md.update(md_buf);
	    }
	    md.update(password);
	    md_buf = md.digest();
	    i = 0;
	    if(keyLen > 0) {
	      while(true) {
	        if(keyLen === 0) {
	          break;
	        }
	        if(i === md_buf.length) {
	          break;
	        }
	        key[ki++] = md_buf[i];
	        keyLen--;
	        i++;
	       }
	    }
	    if(ivLen > 0 && i !== md_buf.length) {
	      while(true) {
	        if(ivLen === 0) {
	          break;
	        }
	        if(i === md_buf.length) {
	          break;
	        }
	       iv[ii++] = md_buf[i];
	       ivLen--;
	       i++;
	     }
	   }
	   if(keyLen === 0 && ivLen === 0) {
	      break;
	    }
	  }
	  for(i=0;i<md_buf.length;i++) {
	    md_buf[i] = 0;
	  }
	  return {
	    key: key,
	    iv: iv
	  };
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var aes = __webpack_require__(30);
	var Transform = __webpack_require__(31);
	var inherits = __webpack_require__(34);
	
	inherits(StreamCipher, Transform);
	module.exports = StreamCipher;
	function StreamCipher(mode, key, iv, decrypt) {
	  if (!(this instanceof StreamCipher)) {
	    return new StreamCipher(mode, key, iv);
	  }
	  Transform.call(this);
	  this._cipher = new aes.AES(key);
	  this._prev = new Buffer(iv.length);
	  this._cache = new Buffer('');
	  this._secCache = new Buffer('');
	  this._decrypt = decrypt;
	  iv.copy(this._prev);
	  this._mode = mode;
	}
	StreamCipher.prototype._transform = function (chunk, _, next) {
	  next(null, this._mode.encrypt(this, chunk, this._decrypt));
	};
	StreamCipher.prototype._flush = function (next) {
	  this._cipher.scrub();
	  next();
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 57 */
/***/ function(module, exports) {

	exports.encrypt = function (self, block) {
	  return self._cipher.encryptBlock(block);
	};
	exports.decrypt = function (self, block) {
	  return self._cipher.decryptBlock(block);
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var xor = __webpack_require__(59);
	exports.encrypt = function (self, block) {
	  var data = xor(block, self._prev);
	  self._prev = self._cipher.encryptBlock(data);
	  return self._prev;
	};
	exports.decrypt = function (self, block) {
	  var pad = self._prev;
	  self._prev = block;
	  var out = self._cipher.decryptBlock(block);
	  return xor(out, pad);
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {module.exports = xor;
	function xor(a, b) {
	  var len = Math.min(a.length, b.length);
	  var out = new Buffer(len);
	  var i = -1;
	  while (++i < len) {
	    out.writeUInt8(a[i] ^ b[i], i);
	  }
	  return out;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var xor = __webpack_require__(59);
	exports.encrypt = function (self, data, decrypt) {
	  var out = new Buffer('');
	  var len;
	  while (data.length) {
	    if (self._cache.length === 0) {
	      self._cache = self._cipher.encryptBlock(self._prev);
	      self._prev = new Buffer('');
	    }
	    if (self._cache.length <= data.length) {
	      len = self._cache.length;
	      out = Buffer.concat([out, encryptStart(self, data.slice(0, len), decrypt)]);
	      data = data.slice(len);
	    } else {
	      out = Buffer.concat([out, encryptStart(self, data, decrypt)]);
	      break;
	    }
	  }
	  return out;
	};
	function encryptStart(self, data, decrypt) {
	  var len = data.length;
	  var out = xor(data, self._cache);
	  self._cache = self._cache.slice(len);
	  self._prev = Buffer.concat([self._prev, decrypt?data:out]);
	  return out;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var xor = __webpack_require__(59);
	function getBlock(self) {
	  self._prev = self._cipher.encryptBlock(self._prev);
	  return self._prev;
	}
	exports.encrypt = function (self, chunk) {
	  while (self._cache.length < chunk.length) {
	    self._cache = Buffer.concat([self._cache, getBlock(self)]);
	  }
	  var pad = self._cache.slice(0, chunk.length);
	  self._cache = self._cache.slice(chunk.length);
	  return xor(chunk, pad);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var xor = __webpack_require__(59);
	function getBlock(self) {
	  var out = self._cipher.encryptBlock(self._prev);
	  incr32(self._prev);
	  return out;
	}
	exports.encrypt = function (self, chunk) {
	  while (self._cache.length < chunk.length) {
	    self._cache = Buffer.concat([self._cache, getBlock(self)]);
	  }
	  var pad = self._cache.slice(0, chunk.length);
	  self._cache = self._cache.slice(chunk.length);
	  return xor(chunk, pad);
	};
	function incr32(iv) {
	  var len = iv.length;
	  var item;
	  while (len--) {
	    item = iv.readUInt8(len);
	    if (item === 255) {
	      iv.writeUInt8(0, len);
	    } else {
	      item++;
	      iv.writeUInt8(item, len);
	      break;
	    }
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var aes = __webpack_require__(30);
	var Transform = __webpack_require__(31);
	var inherits = __webpack_require__(34);
	var modes = __webpack_require__(54);
	var StreamCipher = __webpack_require__(56);
	var ebtk = __webpack_require__(55);
	
	inherits(Decipher, Transform);
	function Decipher(mode, key, iv) {
	  if (!(this instanceof Decipher)) {
	    return new Decipher(mode, key, iv);
	  }
	  Transform.call(this);
	  this._cache = new Splitter();
	  this._last = void 0;
	  this._cipher = new aes.AES(key);
	  this._prev = new Buffer(iv.length);
	  iv.copy(this._prev);
	  this._mode = mode;
	}
	Decipher.prototype._transform = function (data, _, next) {
	  this._cache.add(data);
	  var chunk;
	  var thing;
	  while ((chunk = this._cache.get())) {
	    thing = this._mode.decrypt(this, chunk);
	    this.push(thing);
	  }
	  next();
	};
	Decipher.prototype._flush = function (next) {
	  var chunk = this._cache.flush();
	  if (!chunk) {
	    return next;
	  }
	
	  this.push(unpad(this._mode.decrypt(this, chunk)));
	
	  next();
	};
	
	function Splitter() {
	   if (!(this instanceof Splitter)) {
	    return new Splitter();
	  }
	  this.cache = new Buffer('');
	}
	Splitter.prototype.add = function (data) {
	  this.cache = Buffer.concat([this.cache, data]);
	};
	
	Splitter.prototype.get = function () {
	  if (this.cache.length > 16) {
	    var out = this.cache.slice(0, 16);
	    this.cache = this.cache.slice(16);
	    return out;
	  }
	  return null;
	};
	Splitter.prototype.flush = function () {
	  if (this.cache.length) {
	    return this.cache;
	  }
	};
	function unpad(last) {
	  var padded = last[15];
	  if (padded === 16) {
	    return;
	  }
	  return last.slice(0, 16 - padded);
	}
	
	var modelist = {
	  ECB: __webpack_require__(57),
	  CBC: __webpack_require__(58),
	  CFB: __webpack_require__(60),
	  OFB: __webpack_require__(61),
	  CTR: __webpack_require__(62)
	};
	
	module.exports = function (crypto) {
	  function createDecipheriv(suite, password, iv) {
	    var config = modes[suite];
	    if (!config) {
	      throw new TypeError('invalid suite type');
	    }
	    if (typeof iv === 'string') {
	      iv = new Buffer(iv);
	    }
	    if (typeof password === 'string') {
	      password = new Buffer(password);
	    }
	    if (password.length !== config.key/8) {
	      throw new TypeError('invalid key length ' + password.length);
	    }
	    if (iv.length !== config.iv) {
	      throw new TypeError('invalid iv length ' + iv.length);
	    }
	    if (config.type === 'stream') {
	      return new StreamCipher(modelist[config.mode], password, iv, true);
	    }
	    return new Decipher(modelist[config.mode], password, iv);
	  }
	
	  function createDecipher (suite, password) {
	    var config = modes[suite];
	    if (!config) {
	      throw new TypeError('invalid suite type');
	    }
	    var keys = ebtk(crypto, password, config.key, config.iv);
	    return createDecipheriv(suite, keys.key, keys.iv);
	  }
	  return {
	    createDecipher: createDecipher,
	    createDecipheriv: createDecipheriv
	  };
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer))

/***/ }
/******/ ]);
//# sourceMappingURL=core.js.map