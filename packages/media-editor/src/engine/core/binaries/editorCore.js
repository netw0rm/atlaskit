/* eslint-disable */
exports["Core"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, module) {var Module=function(Module){Module=Module||{};var Module={ENVIRONMENT:"NODE",setContext:function(context){GLctx=Module.ctx=context;},handleScrollChanged:null,handleShapeParametersChanged:null,bitmapProvider:null,bitmapExporter:null,browserTypesetter:null,timerFactory:null,handleTextInputStarted:null,handleTextInputEnded:null};var Module;if(!Module)Module=(typeof Module!=="undefined"?Module:null)||{};var moduleOverrides={};for(var key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key];}}var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_IS_SHELL=false;if(Module["ENVIRONMENT"]){if(Module["ENVIRONMENT"]==="WEB"){ENVIRONMENT_IS_WEB=true;}else if(Module["ENVIRONMENT"]==="WORKER"){ENVIRONMENT_IS_WORKER=true;}else if(Module["ENVIRONMENT"]==="NODE"){ENVIRONMENT_IS_NODE=true;}else if(Module["ENVIRONMENT"]==="SHELL"){ENVIRONMENT_IS_SHELL=true;}else{throw new Error("The provided Module['ENVIRONMENT'] value is not valid. It must be one of: WEB|WORKER|NODE|SHELL.");}}else{ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_IS_NODE=typeof process==="object"&&"function"==="function"&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;}if(ENVIRONMENT_IS_NODE){if(!Module["print"])Module["print"]=console.log;if(!Module["printErr"])Module["printErr"]=console.warn;var nodeFS;var nodePath;Module["read"]=function read(filename,binary){if(!nodeFS)nodeFS=__webpack_require__(4);if(!nodePath)nodePath=__webpack_require__(5);filename=nodePath["normalize"](filename);var ret=nodeFS["readFileSync"](filename);return binary?ret:ret.toString();};Module["readBinary"]=function readBinary(filename){var ret=Module["read"](filename,true);if(!ret.buffer){ret=new Uint8Array(ret);}assert(ret.buffer);return ret;};Module["load"]=function load(f){globalEval(read(f));};if(!Module["thisProgram"]){if(process["argv"].length>1){Module["thisProgram"]=process["argv"][1].replace(/\\/g,"/");}else{Module["thisProgram"]="unknown-program";}}Module["arguments"]=process["argv"].slice(2);if(true){module["exports"]=Module;}process["on"]("uncaughtException",function(ex){if(!(ex instanceof ExitStatus)){throw ex;}});Module["inspect"]=function(){return"[Emscripten Module object]";};}else if(ENVIRONMENT_IS_SHELL){if(!Module["print"])Module["print"]=print;if(typeof printErr!="undefined")Module["printErr"]=printErr;if(typeof read!="undefined"){Module["read"]=read;}else{Module["read"]=function read(){throw"no read() available";};}Module["readBinary"]=function readBinary(f){if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f));}var data=read(f,"binary");assert(typeof data==="object");return data;};if(typeof scriptArgs!="undefined"){Module["arguments"]=scriptArgs;}else if(typeof arguments!="undefined"){Module["arguments"]=arguments;}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){Module["read"]=function read(url){var xhr=new XMLHttpRequest();xhr.open("GET",url,false);xhr.send(null);return xhr.responseText;};Module["readAsync"]=function readAsync(url,onload,onerror){var xhr=new XMLHttpRequest();xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function xhr_onload(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);}else{onerror();}};xhr.onerror=onerror;xhr.send(null);};if(typeof arguments!="undefined"){Module["arguments"]=arguments;}if(typeof console!=="undefined"){if(!Module["print"])Module["print"]=function print(x){console.log(x);};if(!Module["printErr"])Module["printErr"]=function printErr(x){console.warn(x);};}else{var TRY_USE_DUMP=false;if(!Module["print"])Module["print"]=TRY_USE_DUMP&&typeof dump!=="undefined"?function(x){dump(x);}:function(x){};}if(ENVIRONMENT_IS_WORKER){Module["load"]=importScripts;}if(typeof Module["setWindowTitle"]==="undefined"){Module["setWindowTitle"]=function(title){document.title=title;};}}else{throw"Unknown runtime environment. Where are we?";}function globalEval(x){eval.call(null,x);}if(!Module["load"]&&Module["read"]){Module["load"]=function load(f){globalEval(Module["read"](f));};}if(!Module["print"]){Module["print"]=function(){};}if(!Module["printErr"]){Module["printErr"]=Module["print"];}if(!Module["arguments"]){Module["arguments"]=[];}if(!Module["thisProgram"]){Module["thisProgram"]="./this.program";}Module.print=Module["print"];Module.printErr=Module["printErr"];Module["preRun"]=[];Module["postRun"]=[];for(var key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key];}}moduleOverrides=undefined;var Runtime={setTempRet0:function(value){tempRet0=value;},getTempRet0:function(){return tempRet0;},stackSave:function(){return STACKTOP;},stackRestore:function(stackTop){STACKTOP=stackTop;},getNativeTypeSize:function(type){switch(type){case"i1":case"i8":return 1;case"i16":return 2;case"i32":return 4;case"i64":return 8;case"float":return 4;case"double":return 8;default:{if(type[type.length-1]==="*"){return Runtime.QUANTUM_SIZE;}else if(type[0]==="i"){var bits=parseInt(type.substr(1));assert(bits%8===0);return bits/8;}else{return 0;}}}},getNativeFieldSize:function(type){return Math.max(Runtime.getNativeTypeSize(type),Runtime.QUANTUM_SIZE);},STACK_ALIGN:16,prepVararg:function(ptr,type){if(type==="double"||type==="i64"){if(ptr&7){assert((ptr&7)===4);ptr+=4;}}else{assert((ptr&3)===0);}return ptr;},getAlignSize:function(type,size,vararg){if(!vararg&&(type=="i64"||type=="double"))return 8;if(!type)return Math.min(size,8);return Math.min(size||(type?Runtime.getNativeFieldSize(type):0),Runtime.QUANTUM_SIZE);},dynCall:function(sig,ptr,args){if(args&&args.length){return Module["dynCall_"+sig].apply(null,[ptr].concat(args));}else{return Module["dynCall_"+sig].call(null,ptr);}},functionPointers:[],addFunction:function(func){for(var i=0;i<Runtime.functionPointers.length;i++){if(!Runtime.functionPointers[i]){Runtime.functionPointers[i]=func;return 2*(1+i);}}throw"Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.";},removeFunction:function(index){Runtime.functionPointers[(index-2)/2]=null;},warnOnce:function(text){if(!Runtime.warnOnce.shown)Runtime.warnOnce.shown={};if(!Runtime.warnOnce.shown[text]){Runtime.warnOnce.shown[text]=1;Module.printErr(text);}},funcWrappers:{},getFuncWrapper:function(func,sig){assert(sig);if(!Runtime.funcWrappers[sig]){Runtime.funcWrappers[sig]={};}var sigCache=Runtime.funcWrappers[sig];if(!sigCache[func]){if(sig.length===1){sigCache[func]=function dynCall_wrapper(){return Runtime.dynCall(sig,func);};}else if(sig.length===2){sigCache[func]=function dynCall_wrapper(arg){return Runtime.dynCall(sig,func,[arg]);};}else{sigCache[func]=function dynCall_wrapper(){return Runtime.dynCall(sig,func,Array.prototype.slice.call(arguments));};}}return sigCache[func];},getCompilerSetting:function(name){throw"You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work";},stackAlloc:function(size){var ret=STACKTOP;STACKTOP=STACKTOP+size|0;STACKTOP=STACKTOP+15&-16;return ret;},staticAlloc:function(size){var ret=STATICTOP;STATICTOP=STATICTOP+size|0;STATICTOP=STATICTOP+15&-16;return ret;},dynamicAlloc:function(size){var ret=HEAP32[DYNAMICTOP_PTR>>2];var end=(ret+size+15|0)&-16;HEAP32[DYNAMICTOP_PTR>>2]=end;if(end>=TOTAL_MEMORY){var success=enlargeMemory();if(!success){HEAP32[DYNAMICTOP_PTR>>2]=ret;return 0;}}return ret;},alignMemory:function(size,quantum){var ret=size=Math.ceil(size/(quantum?quantum:16))*(quantum?quantum:16);return ret;},makeBigInt:function(low,high,unsigned){var ret=unsigned?+(low>>>0)+ +(high>>>0)*+4294967296:+(low>>>0)+ +(high|0)*+4294967296;return ret;},GLOBAL_BASE:8,QUANTUM_SIZE:4,__dummy__:0};Module["Runtime"]=Runtime;var ABORT=false;var EXITSTATUS=0;function assert(condition,text){if(!condition){abort("Assertion failed: "+text);}}function getCFunc(ident){var func=Module["_"+ident];if(!func){try{func=eval("_"+ident);}catch(e){}}assert(func,"Cannot call unknown function "+ident+" (perhaps LLVM optimizations or closure removed it?)");return func;}var cwrap,ccall;(function(){var JSfuncs={"stackSave":function(){Runtime.stackSave();},"stackRestore":function(){Runtime.stackRestore();},"arrayToC":function(arr){var ret=Runtime.stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret;},"stringToC":function(str){var ret=0;if(str!==null&&str!==undefined&&str!==0){var len=(str.length<<2)+1;ret=Runtime.stackAlloc(len);stringToUTF8(str,ret,len);}return ret;}};var toC={"string":JSfuncs["stringToC"],"array":JSfuncs["arrayToC"]};ccall=function ccallFunc(ident,returnType,argTypes,args,opts){var func=getCFunc(ident);var cArgs=[];var stack=0;if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=Runtime.stackSave();cArgs[i]=converter(args[i]);}else{cArgs[i]=args[i];}}}var ret=func.apply(null,cArgs);if(returnType==="string")ret=Pointer_stringify(ret);if(stack!==0){if(opts&&opts.async){EmterpreterAsync.asyncFinalizers.push(function(){Runtime.stackRestore(stack);});return;}Runtime.stackRestore(stack);}return ret;};var sourceRegex=/^function\s*[a-zA-Z$_0-9]*\s*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/;function parseJSFunc(jsfunc){var parsed=jsfunc.toString().match(sourceRegex).slice(1);return{arguments:parsed[0],body:parsed[1],returnValue:parsed[2]};}var JSsource=null;function ensureJSsource(){if(!JSsource){JSsource={};for(var fun in JSfuncs){if(JSfuncs.hasOwnProperty(fun)){JSsource[fun]=parseJSFunc(JSfuncs[fun]);}}}}cwrap=function cwrap(ident,returnType,argTypes){argTypes=argTypes||[];var cfunc=getCFunc(ident);var numericArgs=argTypes.every(function(type){return type==="number";});var numericRet=returnType!=="string";if(numericRet&&numericArgs){return cfunc;}var argNames=argTypes.map(function(x,i){return"$"+i;});var funcstr="(function("+argNames.join(",")+") {";var nargs=argTypes.length;if(!numericArgs){ensureJSsource();funcstr+="var stack = "+JSsource["stackSave"].body+";";for(var i=0;i<nargs;i++){var arg=argNames[i],type=argTypes[i];if(type==="number")continue;var convertCode=JSsource[type+"ToC"];funcstr+="var "+convertCode.arguments+" = "+arg+";";funcstr+=convertCode.body+";";funcstr+=arg+"=("+convertCode.returnValue+");";}}var cfuncname=parseJSFunc(function(){return cfunc;}).returnValue;funcstr+="var ret = "+cfuncname+"("+argNames.join(",")+");";if(!numericRet){var strgfy=parseJSFunc(function(){return Pointer_stringify;}).returnValue;funcstr+="ret = "+strgfy+"(ret);";}if(!numericArgs){ensureJSsource();funcstr+=JSsource["stackRestore"].body.replace("()","(stack)")+";";}funcstr+="return ret})";return eval(funcstr);};})();Module["ccall"]=ccall;Module["cwrap"]=cwrap;function setValue(ptr,value,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":HEAP8[ptr>>0]=value;break;case"i8":HEAP8[ptr>>0]=value;break;case"i16":HEAP16[ptr>>1]=value;break;case"i32":HEAP32[ptr>>2]=value;break;case"i64":tempI64=[value>>>0,(tempDouble=value,+Math_abs(tempDouble)>=+1?tempDouble>+0?(Math_min(+Math_floor(tempDouble/+4294967296),+4294967295)|0)>>>0:~~+Math_ceil((tempDouble-+(~~tempDouble>>>0))/+4294967296)>>>0:0)],HEAP32[ptr>>2]=tempI64[0],HEAP32[ptr+4>>2]=tempI64[1];break;case"float":HEAPF32[ptr>>2]=value;break;case"double":HEAPF64[ptr>>3]=value;break;default:abort("invalid type for setValue: "+type);}}Module["setValue"]=setValue;function getValue(ptr,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":return HEAP8[ptr>>0];case"i8":return HEAP8[ptr>>0];case"i16":return HEAP16[ptr>>1];case"i32":return HEAP32[ptr>>2];case"i64":return HEAP32[ptr>>2];case"float":return HEAPF32[ptr>>2];case"double":return HEAPF64[ptr>>3];default:abort("invalid type for setValue: "+type);}return null;}Module["getValue"]=getValue;var ALLOC_NORMAL=0;var ALLOC_STACK=1;var ALLOC_STATIC=2;var ALLOC_DYNAMIC=3;var ALLOC_NONE=4;Module["ALLOC_NORMAL"]=ALLOC_NORMAL;Module["ALLOC_STACK"]=ALLOC_STACK;Module["ALLOC_STATIC"]=ALLOC_STATIC;Module["ALLOC_DYNAMIC"]=ALLOC_DYNAMIC;Module["ALLOC_NONE"]=ALLOC_NONE;function allocate(slab,types,allocator,ptr){var zeroinit,size;if(typeof slab==="number"){zeroinit=true;size=slab;}else{zeroinit=false;size=slab.length;}var singleType=typeof types==="string"?types:null;var ret;if(allocator==ALLOC_NONE){ret=ptr;}else{ret=[typeof _malloc==="function"?_malloc:Runtime.staticAlloc,Runtime.stackAlloc,Runtime.staticAlloc,Runtime.dynamicAlloc][allocator===undefined?ALLOC_STATIC:allocator](Math.max(size,singleType?1:types.length));}if(zeroinit){var ptr=ret,stop;assert((ret&3)==0);stop=ret+(size&~3);for(;ptr<stop;ptr+=4){HEAP32[ptr>>2]=0;}stop=ret+size;while(ptr<stop){HEAP8[ptr++>>0]=0;}return ret;}if(singleType==="i8"){if(slab.subarray||slab.slice){HEAPU8.set(slab,ret);}else{HEAPU8.set(new Uint8Array(slab),ret);}return ret;}var i=0,type,typeSize,previousType;while(i<size){var curr=slab[i];if(typeof curr==="function"){curr=Runtime.getFunctionIndex(curr);}type=singleType||types[i];if(type===0){i++;continue;}if(type=="i64")type="i32";setValue(ret+i,curr,type);if(previousType!==type){typeSize=Runtime.getNativeTypeSize(type);previousType=type;}i+=typeSize;}return ret;}Module["allocate"]=allocate;function getMemory(size){if(!staticSealed)return Runtime.staticAlloc(size);if(!runtimeInitialized)return Runtime.dynamicAlloc(size);return _malloc(size);}Module["getMemory"]=getMemory;function Pointer_stringify(ptr,length){if(length===0||!ptr)return"";var hasUtf=0;var t;var i=0;while(1){t=HEAPU8[ptr+i>>0];hasUtf|=t;if(t==0&&!length)break;i++;if(length&&i==length)break;}if(!length)length=i;var ret="";if(hasUtf<128){var MAX_CHUNK=1024;var curr;while(length>0){curr=String.fromCharCode.apply(String,HEAPU8.subarray(ptr,ptr+Math.min(length,MAX_CHUNK)));ret=ret?ret+curr:curr;ptr+=MAX_CHUNK;length-=MAX_CHUNK;}return ret;}return Module["UTF8ToString"](ptr);}Module["Pointer_stringify"]=Pointer_stringify;function AsciiToString(ptr){var str="";while(1){var ch=HEAP8[ptr++>>0];if(!ch)return str;str+=String.fromCharCode(ch);}}Module["AsciiToString"]=AsciiToString;function stringToAscii(str,outPtr){return writeAsciiToMemory(str,outPtr,false);}Module["stringToAscii"]=stringToAscii;var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(u8Array,idx){var endPtr=idx;while(u8Array[endPtr])++endPtr;if(endPtr-idx>16&&u8Array.subarray&&UTF8Decoder){return UTF8Decoder.decode(u8Array.subarray(idx,endPtr));}else{var u0,u1,u2,u3,u4,u5;var str="";while(1){u0=u8Array[idx++];if(!u0)return str;if(!(u0&128)){str+=String.fromCharCode(u0);continue;}u1=u8Array[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue;}u2=u8Array[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2;}else{u3=u8Array[idx++]&63;if((u0&248)==240){u0=(u0&7)<<18|u1<<12|u2<<6|u3;}else{u4=u8Array[idx++]&63;if((u0&252)==248){u0=(u0&3)<<24|u1<<18|u2<<12|u3<<6|u4;}else{u5=u8Array[idx++]&63;u0=(u0&1)<<30|u1<<24|u2<<18|u3<<12|u4<<6|u5;}}}if(u0<65536){str+=String.fromCharCode(u0);}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023);}}}}Module["UTF8ArrayToString"]=UTF8ArrayToString;function UTF8ToString(ptr){return UTF8ArrayToString(HEAPU8,ptr);}Module["UTF8ToString"]=UTF8ToString;function stringToUTF8Array(str,outU8Array,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){if(outIdx>=endIdx)break;outU8Array[outIdx++]=u;}else if(u<=2047){if(outIdx+1>=endIdx)break;outU8Array[outIdx++]=192|u>>6;outU8Array[outIdx++]=128|u&63;}else if(u<=65535){if(outIdx+2>=endIdx)break;outU8Array[outIdx++]=224|u>>12;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63;}else if(u<=2097151){if(outIdx+3>=endIdx)break;outU8Array[outIdx++]=240|u>>18;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63;}else if(u<=67108863){if(outIdx+4>=endIdx)break;outU8Array[outIdx++]=248|u>>24;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63;}else{if(outIdx+5>=endIdx)break;outU8Array[outIdx++]=252|u>>30;outU8Array[outIdx++]=128|u>>24&63;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63;}}outU8Array[outIdx]=0;return outIdx-startIdx;}Module["stringToUTF8Array"]=stringToUTF8Array;function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite);}Module["stringToUTF8"]=stringToUTF8;function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){++len;}else if(u<=2047){len+=2;}else if(u<=65535){len+=3;}else if(u<=2097151){len+=4;}else if(u<=67108863){len+=5;}else{len+=6;}}return len;}Module["lengthBytesUTF8"]=lengthBytesUTF8;var UTF16Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf-16le"):undefined;function UTF32ToString(ptr){var i=0;var str="";while(1){var utf32=HEAP32[ptr+i*4>>2];if(utf32==0)return str;++i;if(utf32>=65536){var ch=utf32-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023);}else{str+=String.fromCharCode(utf32);}}}function demangle(func){var hasLibcxxabi=!!Module["___cxa_demangle"];if(hasLibcxxabi){try{var s=func.substr(1);var len=lengthBytesUTF8(s)+1;var buf=_malloc(len);stringToUTF8(s,buf,len);var status=_malloc(4);var ret=Module["___cxa_demangle"](buf,0,0,status);if(getValue(status,"i32")===0&&ret){return Pointer_stringify(ret);}}catch(e){}finally{if(buf)_free(buf);if(status)_free(status);if(ret)_free(ret);}return func;}Runtime.warnOnce("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling");return func;}function demangleAll(text){return text.replace(/__Z[\w\d_]+/g,function(x){var y=demangle(x);return x===y?x:x+" ["+y+"]";});}function jsStackTrace(){var err=new Error();if(!err.stack){try{throw new Error(0);}catch(e){err=e;}if(!err.stack){return"(no stack trace available)";}}return err.stack.toString();}function stackTrace(){var js=jsStackTrace();if(Module["extraStackTrace"])js+="\n"+Module["extraStackTrace"]();return demangleAll(js);}Module["stackTrace"]=stackTrace;function alignMemoryPage(x){if(x%4096>0){x+=4096-x%4096;}return x;}var HEAP;var buffer;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBuffer(buf){Module["buffer"]=buffer=buf;}function updateGlobalBufferViews(){Module["HEAP8"]=HEAP8=new Int8Array(buffer);Module["HEAP16"]=HEAP16=new Int16Array(buffer);Module["HEAP32"]=HEAP32=new Int32Array(buffer);Module["HEAPU8"]=HEAPU8=new Uint8Array(buffer);Module["HEAPU16"]=HEAPU16=new Uint16Array(buffer);Module["HEAPU32"]=HEAPU32=new Uint32Array(buffer);Module["HEAPF32"]=HEAPF32=new Float32Array(buffer);Module["HEAPF64"]=HEAPF64=new Float64Array(buffer);}var STATIC_BASE,STATICTOP,staticSealed;var STACK_BASE,STACKTOP,STACK_MAX;var DYNAMIC_BASE,DYNAMICTOP_PTR;STATIC_BASE=STATICTOP=STACK_BASE=STACKTOP=STACK_MAX=DYNAMIC_BASE=DYNAMICTOP_PTR=0;staticSealed=false;function abortOnCannotGrowMemory(){abort("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value "+TOTAL_MEMORY+", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which adjusts the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ");}if(!Module["reallocBuffer"])Module["reallocBuffer"]=function(size){var ret;try{if(ArrayBuffer.transfer){ret=ArrayBuffer.transfer(buffer,size);}else{var oldHEAP8=HEAP8;ret=new ArrayBuffer(size);var temp=new Int8Array(ret);temp.set(oldHEAP8);}}catch(e){return false;}var success=_emscripten_replace_memory(ret);if(!success)return false;return ret;};function enlargeMemory(){var LIMIT=Math.pow(2,31);if(HEAP32[DYNAMICTOP_PTR>>2]>=LIMIT)return false;while(TOTAL_MEMORY<HEAP32[DYNAMICTOP_PTR>>2]){if(TOTAL_MEMORY<LIMIT/2){TOTAL_MEMORY=alignMemoryPage(2*TOTAL_MEMORY);}else{var last=TOTAL_MEMORY;TOTAL_MEMORY=alignMemoryPage((3*TOTAL_MEMORY+LIMIT)/4);if(TOTAL_MEMORY<=last)return false;}}TOTAL_MEMORY=Math.max(TOTAL_MEMORY,16*1024*1024);if(TOTAL_MEMORY>=LIMIT)return false;var replacement=Module["reallocBuffer"](TOTAL_MEMORY);if(!replacement)return false;updateGlobalBuffer(replacement);updateGlobalBufferViews();return true;}var byteLength;try{byteLength=Function.prototype.call.bind(Object.getOwnPropertyDescriptor(ArrayBuffer.prototype,"byteLength").get);byteLength(new ArrayBuffer(4));}catch(e){byteLength=function(buffer){return buffer.byteLength;};}var TOTAL_STACK=Module["TOTAL_STACK"]||5242880;var TOTAL_MEMORY=Module["TOTAL_MEMORY"]||16777216;var totalMemory=64*1024;while(totalMemory<TOTAL_MEMORY||totalMemory<2*TOTAL_STACK){if(totalMemory<16*1024*1024){totalMemory*=2;}else{totalMemory+=16*1024*1024;}}totalMemory=Math.max(totalMemory,16*1024*1024);if(totalMemory!==TOTAL_MEMORY){TOTAL_MEMORY=totalMemory;}if(Module["buffer"]){buffer=Module["buffer"];}else{buffer=new ArrayBuffer(TOTAL_MEMORY);}updateGlobalBufferViews();function getTotalMemory(){return TOTAL_MEMORY;}HEAP32[0]=1668509029;HEAP16[1]=25459;if(HEAPU8[2]!==115||HEAPU8[3]!==99)throw"Runtime error: expected the system to be little-endian!";Module["HEAP"]=HEAP;Module["buffer"]=buffer;Module["HEAP8"]=HEAP8;Module["HEAP16"]=HEAP16;Module["HEAP32"]=HEAP32;Module["HEAPU8"]=HEAPU8;Module["HEAPU16"]=HEAPU16;Module["HEAPU32"]=HEAPU32;Module["HEAPF32"]=HEAPF32;Module["HEAPF64"]=HEAPF64;function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback();continue;}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){Runtime.dynCall("v",func);}else{Runtime.dynCall("vi",func,[callback.arg]);}}else{func(callback.arg===undefined?null:callback.arg);}}}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATEXIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift());}}callRuntimeCallbacks(__ATPRERUN__);}function ensureInitRuntime(){if(runtimeInitialized)return;runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__);}function preMain(){callRuntimeCallbacks(__ATMAIN__);}function exitRuntime(){callRuntimeCallbacks(__ATEXIT__);runtimeExited=true;}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift());}}callRuntimeCallbacks(__ATPOSTRUN__);}function addOnPreRun(cb){__ATPRERUN__.unshift(cb);}Module["addOnPreRun"]=addOnPreRun;function addOnInit(cb){__ATINIT__.unshift(cb);}Module["addOnInit"]=addOnInit;function addOnPreMain(cb){__ATMAIN__.unshift(cb);}Module["addOnPreMain"]=addOnPreMain;function addOnExit(cb){__ATEXIT__.unshift(cb);}Module["addOnExit"]=addOnExit;function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb);}Module["addOnPostRun"]=addOnPostRun;function intArrayFromString(stringy,dontAddNull,length){var len=length>0?length:lengthBytesUTF8(stringy)+1;var u8array=new Array(len);var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);if(dontAddNull)u8array.length=numBytesWritten;return u8array;}Module["intArrayFromString"]=intArrayFromString;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){chr&=255;}ret.push(String.fromCharCode(chr));}return ret.join("");}Module["intArrayToString"]=intArrayToString;function writeStringToMemory(string,buffer,dontAddNull){Runtime.warnOnce("writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!");var lastChar,end;if(dontAddNull){end=buffer+lengthBytesUTF8(string);lastChar=HEAP8[end];}stringToUTF8(string,buffer,Infinity);if(dontAddNull)HEAP8[end]=lastChar;}Module["writeStringToMemory"]=writeStringToMemory;function writeArrayToMemory(array,buffer){HEAP8.set(array,buffer);}Module["writeArrayToMemory"]=writeArrayToMemory;function writeAsciiToMemory(str,buffer,dontAddNull){for(var i=0;i<str.length;++i){HEAP8[buffer++>>0]=str.charCodeAt(i);}if(!dontAddNull)HEAP8[buffer>>0]=0;}Module["writeAsciiToMemory"]=writeAsciiToMemory;if(!Math["imul"]||Math["imul"](4294967295,5)!==-5)Math["imul"]=function imul(a,b){var ah=a>>>16;var al=a&65535;var bh=b>>>16;var bl=b&65535;return al*bl+(ah*bl+al*bh<<16)|0;};Math.imul=Math["imul"];if(!Math["clz32"])Math["clz32"]=function(x){x=x>>>0;for(var i=0;i<32;i++){if(x&1<<31-i)return i;}return 32;};Math.clz32=Math["clz32"];if(!Math["trunc"])Math["trunc"]=function(x){return x<0?Math.ceil(x):Math.floor(x);};Math.trunc=Math["trunc"];var Math_abs=Math.abs;var Math_cos=Math.cos;var Math_sin=Math.sin;var Math_tan=Math.tan;var Math_acos=Math.acos;var Math_asin=Math.asin;var Math_atan=Math.atan;var Math_atan2=Math.atan2;var Math_exp=Math.exp;var Math_log=Math.log;var Math_sqrt=Math.sqrt;var Math_ceil=Math.ceil;var Math_floor=Math.floor;var Math_pow=Math.pow;var Math_imul=Math.imul;var Math_fround=Math.fround;var Math_min=Math.min;var Math_clz32=Math.clz32;var Math_trunc=Math.trunc;var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies);}}Module["addRunDependency"]=addRunDependency;function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies);}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null;}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback();}}}Module["removeRunDependency"]=removeRunDependency;Module["preloadedImages"]={};Module["preloadedAudios"]={};var ASM_CONSTS=[function($0,$1){{return Module.bitmapExporter.prepare($0,$1);}},function($0,$1,$2,$3,$4,$5){{Module.bitmapExporter.putImagePart($0,$1,$2,$3,$4,$5);}},function(){{Module.bitmapProvider.handleContextLost();}},function(){{Module.bitmapProvider.handleContextRestored();}},function($0){{return Module.bitmapProvider.getBitmapIndex(Pointer_stringify($0));}},function($0){{return Module.bitmapProvider.getBitmapWidth($0);}},function($0){{return Module.bitmapProvider.getBitmapHeight($0);}},function($0){{return Module.bitmapProvider.getNumberOfFragments($0);}},function($0,$1){{return Module.bitmapProvider.queryFragmentCoordinates($0,$1);}},function(){{return Module.bitmapProvider.getX();}},function(){{return Module.bitmapProvider.getY();}},function(){{return Module.bitmapProvider.getWidth();}},function(){{return Module.bitmapProvider.getHeight();}},function(){{return Module.bitmapProvider.getUTopLeft();}},function(){{return Module.bitmapProvider.getVTopLeft();}},function(){{return Module.bitmapProvider.getUBottomRight();}},function(){{return Module.bitmapProvider.getVBottomRight();}},function($0,$1){{return Module.bitmapProvider.bind($0,$1);}},function(){{Module.browserTypesetter.handleContextLost();}},function(){{Module.browserTypesetter.handleContextRestored();}},function(){{return Module.timerFactory.createTimer();}},function($0){{Module.timerFactory.stopTimer($0);}},function($0,$1){{Module.timerFactory.startTimer($0,$1);}},function($0){{Module.browserTypesetter.deleteTypeset($0);}},function(){{return Module.browserTypesetter.createTypeset();}},function($0,$1,$2,$3,$4,$5){{const typeset=Module.browserTypesetter.getTypeset($0);if(!typeset){return false;}return typeset.update(UTF32ToString($1),$2,$3===0?"ltr":"rtl",$4,$5);}},function($0){{return Module.browserTypesetter.getTypeset($0).getFragmentCount();}},function($0,$1){{return Module.browserTypesetter.getTypeset($0).getXBase($1);}},function($0,$1){{return Module.browserTypesetter.getTypeset($0).getYBase($1);}},function($0,$1){{return Module.browserTypesetter.getTypeset($0).getXOpposite($1);}},function($0,$1){{return Module.browserTypesetter.getTypeset($0).getYOpposite($1);}},function($0){{return Module.browserTypesetter.getTypeset($0).getLineHeight();}},function($0){{return Module.browserTypesetter.getTypeset($0).getDescent();}},function($0,$1,$2){{const typeset=Module.browserTypesetter.getTypeset($0);if(!typeset){return false;}if($2){return typeset.bindStroke($1);}else{return typeset.bindNormal($1);}}},function($0,$1,$2,$3,$4,$5){{Module.handleScrollChanged($0,$1,$2,$3,$4,$5);}},function(){{Module.handleTextInputEnded();}},function(){{Module.handleTextInputStarted();}},function($0,$1,$2,$3,$4){{Module.handleShapeParametersChanged($0,$1,$2,$3,$4);}}];function _emscripten_asm_const_iiiiii(code,a0,a1,a2,a3,a4){return ASM_CONSTS[code](a0,a1,a2,a3,a4);}function _emscripten_asm_const_dii(code,a0,a1){return ASM_CONSTS[code](a0,a1);}function _emscripten_asm_const_i(code){return ASM_CONSTS[code]();}function _emscripten_asm_const_iiiiiii(code,a0,a1,a2,a3,a4,a5){return ASM_CONSTS[code](a0,a1,a2,a3,a4,a5);}function _emscripten_asm_const_ii(code,a0){return ASM_CONSTS[code](a0);}function _emscripten_asm_const_iiddidd(code,a0,a1,a2,a3,a4,a5){return ASM_CONSTS[code](a0,a1,a2,a3,a4,a5);}function _emscripten_asm_const_iiii(code,a0,a1,a2){return ASM_CONSTS[code](a0,a1,a2);}function _emscripten_asm_const_v(code){return ASM_CONSTS[code]();}function _emscripten_asm_const_iii(code,a0,a1){return ASM_CONSTS[code](a0,a1);}function _emscripten_asm_const_d(code){return ASM_CONSTS[code]();}STATIC_BASE=8;STATICTOP=STATIC_BASE+39952;__ATINIT__.push({func:function(){__GLOBAL__sub_I_duplicator_cpp();}},{func:function(){__GLOBAL__sub_I_bindings_cpp();}},{func:function(){__GLOBAL__sub_I_bind_cpp();}});allocate([232,35,0,0,212,36,0,0,16,36,0,0,192,36,0,0,8,0,0,0,0,0,0,0,16,36,0,0,234,36,0,0,64,11,0,0,0,0,0,0,16,36,0,0,252,37,0,0,8,0,0,0,0,0,0,0,16,36,0,0,159,37,0,0,64,11,0,0,0,0,0,0,16,36,0,0,154,38,0,0,8,0,0,0,0,0,0,0,16,36,0,0,59,38,0,0,64,11,0,0,0,0,0,0,16,36,0,0,53,39,0,0,8,0,0,0,0,0,0,0,16,36,0,0,216,38,0,0,64,11,0,0,0,0,0,0,16,36,0,0,207,39,0,0,8,0,0,0,0,0,0,0,16,36,0,0,114,39,0,0,64,11,0,0,0,0,0,0,16,36,0,0,117,40,0,0,8,0,0,0,0,0,0,0,16,36,0,0,18,40,0,0,64,11,0,0,0,0,0,0,16,36,0,0,20,41,0,0,240,0,0,0,0,0,0,0,16,36,0,0,183,40,0,0,64,11,0,0,0,0,0,0,232,35,0,0,38,41,0,0,16,36,0,0,57,41,0,0,8,1,0,0,0,0,0,0,232,35,0,0,81,41,0,0,16,36,0,0,124,41,0,0,48,1,0,0,0,0,0,0,16,36,0,0,96,41,0,0,88,11,0,0,0,0,0,0,232,35,0,0,138,41,0,0,16,36,0,0,153,41,0,0,8,1,0,0,0,0,0,0,16,36,0,0,180,41,0,0,8,1,0,0,0,0,0,0,16,36,0,0,199,41,0,0,8,1,0,0,0,0,0,0,16,36,0,0,221,41,0,0,8,1,0,0,0,0,0,0,16,36,0,0,247,41,0,0,136,1,0,0,0,0,0,0,232,35,0,0,12,42,0,0,16,36,0,0,81,42,0,0,64,11,0,0,0,0,0,0,16,36,0,0,229,42,0,0,64,11,0,0,0,0,0,0,16,36,0,0,121,43,0,0,64,11,0,0,0,0,0,0,16,36,0,0,9,44,0,0,64,11,0,0,0,0,0,0,16,36,0,0,188,44,0,0,64,11,0,0,0,0,0,0,16,36,0,0,64,45,0,0,136,1,0,0,0,0,0,0,16,36,0,0,197,45,0,0,64,11,0,0,0,0,0,0,16,36,0,0,71,46,0,0,136,1,0,0,0,0,0,0,16,36,0,0,123,46,0,0,136,1,0,0,0,0,0,0,16,36,0,0,143,46,0,0,136,1,0,0,0,0,0,0,16,36,0,0,168,46,0,0,136,1,0,0,0,0,0,0,16,36,0,0,188,46,0,0,80,2,0,0,0,0,0,0,232,35,0,0,216,46,0,0,16,36,0,0,0,51,0,0,80,2,0,0,0,0,0,0,16,36,0,0,23,47,0,0,64,11,0,0,0,0,0,0,160,36,0,0,118,47,0,0,0,0,0,0,2,0,0,0,8,1,0,0,2,0,0,0,152,2,0,0,0,4,0,0,232,35,0,0,136,47,0,0,16,36,0,0,214,47,0,0,64,11,0,0,0,0,0,0,16,36,0,0,104,48,0,0,64,11,0,0,0,0,0,0,16,36,0,0,246,48,0,0,64,11,0,0,0,0,0,0,16,36,0,0,133,49,0,0,64,11,0,0,0,0,0,0,16,36,0,0,19,50,0,0,64,11,0,0,0,0,0,0,16,36,0,0,160,50,0,0,64,11,0,0,0,0,0,0,16,36,0,0,32,51,0,0,80,2,0,0,0,0,0,0,16,36,0,0,236,55,0,0,80,2,0,0,0,0,0,0,16,36,0,0,107,51,0,0,64,11,0,0,0,0,0,0,16,36,0,0,8,52,0,0,64,11,0,0,0,0,0,0,16,36,0,0,115,52,0,0,80,3,0,0,0,0,0,0,16,36,0,0,145,52,0,0,8,1,0,0,0,0,0,0,16,36,0,0,3,53,0,0,64,11,0,0,0,0,0,0,16,36,0,0,110,53,0,0,128,3,0,0,0,0,0,0,16,36,0,0,140,53,0,0,8,1,0,0,0,0,0,0,16,36,0,0,250,53,0,0,64,11,0,0,0,0,0,0,16,36,0,0,97,54,0,0,176,3,0,0,0,0,0,0,16,36,0,0,123,54,0,0,8,1,0,0,0,0,0,0,16,36,0,0,247,54,0,0,64,11,0,0,0,0,0,0,16,36,0,0,140,55,0,0,64,11,0,0,0,0,0,0,16,36,0,0,36,57,0,0,16,4,0,0,0,0,0,0,16,36,0,0,50,56,0,0,64,11,0,0,0,0,0,0,16,36,0,0,193,56,0,0,64,11,0,0,0,0,0,0,232,35,0,0,56,57,0,0,16,36,0,0,131,57,0,0,64,11,0,0,0,0,0,0,16,36,0,0,32,58,0,0,64,11,0,0,0,0,0,0,16,36,0,0,187,58,0,0,64,11,0,0,0,0,0,0,16,36,0,0,92,59,0,0,64,11,0,0,0,0,0,0,16,36,0,0,252,59,0,0,64,11,0,0,0,0,0,0,16,36,0,0,140,62,0,0,80,2,0,0,0,0,0,0,16,36,0,0,150,60,0,0,64,11,0,0,0,0,0,0,16,36,0,0,44,61,0,0,64,11,0,0,0,0,0,0,160,36,0,0,142,61,0,0,0,0,0,0,2,0,0,0,8,1,0,0,2,0,0,0,152,2,0,0,0,4,0,0,16,36,0,0,236,61,0,0,208,4,0,0,0,0,0,0,232,35,0,0,163,61,0,0,232,35,0,0,106,62,0,0,160,36,0,0,166,62,0,0,0,0,0,0,2,0,0,0,248,4,0,0,2,0,0,0,0,5,0,0,2,4,0,0,232,35,0,0,201,62,0,0,232,35,0,0,179,62,0,0,16,36,0,0,254,62,0,0,208,4,0,0,0,0,0,0,232,35,0,0,215,62,0,0,16,36,0,0,128,63,0,0,56,5,0,0,0,0,0,0,232,35,0,0,89,63,0,0,232,35,0,0,237,63,0,0,16,36,0,0,72,64,0,0,88,5,0,0,0,0,0,0,232,35,0,0,33,64,0,0,232,35,0,0,197,64,0,0,16,36,0,0,48,65,0,0,208,4,0,0,0,0,0,0,232,35,0,0,9,65,0,0,16,36,0,0,188,65,0,0,64,11,0,0,0,0,0,0,16,36,0,0,71,66,0,0,64,11,0,0,0,0,0,0,16,36,0,0,161,66,0,0,168,5,0,0,0,0,0,0,16,36,0,0,176,66,0,0,184,5,0,0,0,0,0,0,232,35,0,0,198,66,0,0,232,35,0,0,214,66,0,0,16,36,0,0,236,66,0,0,216,5,0,0,0,0,0,0,232,35,0,0,13,67,0,0,16,36,0,0,40,67,0,0,240,5,0,0,0,0,0,0,160,36,0,0,66,67,0,0,0,0,0,0,2,0,0,0,216,5,0,0,2,0,0,0,16,6,0,0,2,4,0,0,232,35,0,0,97,67,0,0,160,36,0,0,119,67,0,0,0,0,0,0,2,0,0,0,56,6,0,0,2,0,0,0,64,6,0,0,2,4,0,0,232,35,0,0,181,67,0,0,232,35,0,0,147,67,0,0,232,35,0,0,210,67,0,0,232,35,0,0,231,67,0,0,16,36,0,0,5,68,0,0,64,6,0,0,0,0,0,0,160,36,0,0,17,82,0,0,0,0,0,0,2,0,0,0,168,6,0,0,2,0,0,0,64,6,0,0,2,4,0,0,160,36,0,0,225,81,0,0,0,0,0,0,1,0,0,0,160,6,0,0,2,4,0,0,232,35,0,0,252,81,0,0,232,35,0,0,46,82,0,0,16,36,0,0,130,96,0,0,192,6,0,0,0,0,0,0,232,35,0,0,152,96,0,0,16,36,0,0,175,96,0,0,184,5,0,0,0,0,0,0,160,36,0,0,204,96,0,0,0,0,0,0,2,0,0,0,248,6,0,0,2,0,0,0,64,6,0,0,2,4,0,0,232,35,0,0,236,96,0,0,16,36,0,0,65,97,0,0,64,11,0,0,0,0,0,0,16,36,0,0,168,97,0,0,32,7,0,0,0,0,0,0,232,35,0,0,194,97,0,0,16,36,0,0,215,97,0,0,56,7,0,0,0,0,0,0,16,36,0,0,251,97,0,0,72,7,0,0,0,0,0,0,232,35,0,0,19,98,0,0,16,36,0,0,113,98,0,0,104,7,0,0,0,0,0,0,232,35,0,0,45,98,0,0,232,35,0,0,29,99,0,0,16,36,0,0,190,99,0,0,208,4,0,0,0,0,0,0,232,35,0,0,122,99,0,0,16,36,0,0,103,100,0,0,64,11,0,0,0,0,0,0,16,36,0,0,2,101,0,0,64,11,0,0,0,0,0,0,16,36,0,0,162,101,0,0,64,11,0,0,0,0,0,0,16,36,0,0,69,102,0,0,64,11,0,0,0,0,0,0,16,36,0,0,240,102,0,0,64,11,0,0,0,0,0,0,16,36,0,0,97,103,0,0,232,7,0,0,0,0,0,0,232,35,0,0,109,103,0,0,16,36,0,0,160,103,0,0,64,11,0,0,0,0,0,0,16,36,0,0,37,104,0,0,64,11,0,0,0,0,0,0,132,36,0,0,129,108,0,0,132,36,0,0,108,108,0,0,132,36,0,0,84,108,0,0,232,35,0,0,23,108,0,0,104,36,0,0,5,108,0,0,0,0,0,0,40,8,0,0,104,36,0,0,242,107,0,0,1,0,0,0,40,8,0,0,160,36,0,0,66,107,0,0,0,0,0,0,1,0,0,0,104,8,0,0,0,0,0,0,232,35,0,0,129,107,0,0,232,35,0,0,167,107,0,0,232,35,0,0,181,107,0,0,232,35,0,0,201,107,0,0,232,35,0,0,215,107,0,0,232,35,0,0,45,108,0,0,232,35,0,0,58,108,0,0,16,36,0,0,7,109,0,0,192,5,0,0,0,0,0,0,16,36,0,0,153,113,0,0,88,6,0,0,0,0,0,0,16,36,0,0,140,111,0,0,64,11,0,0,0,0,0,0,16,36,0,0,32,112,0,0,80,6,0,0,0,0,0,0,16,36,0,0,204,112,0,0,64,11,0,0,0,0,0,0,16,36,0,0,40,113,0,0,72,6,0,0,0,0,0,0,16,36,0,0,160,114,0,0,32,9,0,0,0,0,0,0,16,36,0,0,219,113,0,0,64,11,0,0,0,0,0,0,16,36,0,0,187,114,0,0,64,6,0,0,0,0,0,0,16,36,0,0,244,115,0,0,104,9,0,0,0,0,0,0,16,36,0,0,43,115,0,0,64,11,0,0,0,0,0,0,16,36,0,0,217,115,0,0,96,9,0,0,0,0,0,0,232,35,0,0,231,115,0,0,232,35,0,0,10,116,0,0,16,36,0,0,79,116,0,0,128,9,0,0,0,0,0,0,232,35,0,0,95,116,0,0,16,36,0,0,97,119,0,0,64,11,0,0,0,0,0,0,16,36,0,0,116,120,0,0,168,9,0,0,0,0,0,0,232,35,0,0,138,120,0,0,16,36,0,0,166,120,0,0,192,9,0,0,0,0,0,0,232,35,0,0,189,120,0,0,16,36,0,0,98,121,0,0,208,4,0,0,0,0,0,0,232,35,0,0,11,121,0,0,16,36,0,0,35,122,0,0,208,4,0,0,0,0,0,0,232,35,0,0,202,121,0,0,16,36,0,0,252,122,0,0,208,4,0,0,0,0,0,0,232,35,0,0,139,122,0,0,16,36,0,0,152,123,0,0,208,4,0,0,0,0,0,0,232,35,0,0,100,123,0,0,16,36,0,0,52,124,0,0,208,4,0,0,0,0,0,0,232,35,0,0,0,124,0,0,16,36,0,0,49,125,0,0,64,11,0,0,0,0,0,0,16,36,0,0,143,126,0,0,64,11,0,0,0,0,0,0,16,36,0,0,41,127,0,0,64,11,0,0,0,0,0,0,16,36,0,0,197,127,0,0,64,11,0,0,0,0,0,0,16,36,0,0,47,128,0,0,32,7,0,0,0,0,0,0,16,36,0,0,25,129,0,0,64,11,0,0,0,0,0,0,160,36,0,0,193,135,0,0,0,0,0,0,1,0,0,0,104,8,0,0,0,0,0,0,160,36,0,0,130,135,0,0,0,0,0,0,1,0,0,0,104,8,0,0,0,0,0,0,232,35,0,0,111,135,0,0,232,35,0,0,80,135,0,0,232,35,0,0,119,134,0,0,232,35,0,0,88,134,0,0,232,35,0,0,57,134,0,0,232,35,0,0,26,134,0,0,232,35,0,0,251,133,0,0,232,35,0,0,150,134,0,0,232,35,0,0,181,134,0,0,232,35,0,0,212,134,0,0,232,35,0,0,243,134,0,0,232,35,0,0,18,135,0,0,232,35,0,0,49,135,0,0,232,35,0,0,186,145,0,0,160,36,0,0,211,145,0,0,0,0,0,0,1,0,0,0,56,11,0,0,0,0,0,0,232,35,0,0,18,147,0,0,16,36,0,0,114,147,0,0,112,11,0,0,0,0,0,0,16,36,0,0,31,147,0,0,128,11,0,0,0,0,0,0,232,35,0,0,64,147,0,0,16,36,0,0,77,147,0,0,96,11,0,0,0,0,0,0,16,36,0,0,99,148,0,0,88,11,0,0,0,0,0,0,16,36,0,0,163,148,0,0,112,11,0,0,0,0,0,0,16,36,0,0,127,148,0,0,168,11,0,0,0,0,0,0,16,36,0,0,197,148,0,0,112,11,0,0,0,0,0,0,76,36,0,0,237,148,0,0,76,36,0,0,239,148,0,0,76,36,0,0,242,148,0,0,76,36,0,0,244,148,0,0,76,36,0,0,246,148,0,0,76,36,0,0,248,148,0,0,76,36,0,0,250,148,0,0,76,36,0,0,53,86,0,0,76,36,0,0,252,148,0,0,76,36,0,0,254,148,0,0,76,36,0,0,0,149,0,0,76,36,0,0,2,149,0,0,76,36,0,0,4,149,0,0,76,36,0,0,6,149,0,0,16,36,0,0,8,149,0,0,112,11,0,0,0,0,0,0,16,36,0,0,41,149,0,0,96,11,0,0,0,0,0,0,0,0,0,0,16,0,0,0,1,0,0,0,2,0,0,0,1,0,0,0,1,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,32,0,0,0,3,0,0,0,4,0,0,0,5,0,0,0,1,0,0,0,6,0,0,0,0,0,0,0,48,0,0,0,7,0,0,0,8,0,0,0,3,0,0,0,3,0,0,0,4,0,0,0,4,0,0,0,0,0,0,0,64,0,0,0,3,0,0,0,9,0,0,0,10,0,0,0,2,0,0,0,11,0,0,0,0,0,0,0,80,0,0,0,12,0,0,0,13,0,0,0,5,0,0,0,5,0,0,0,6,0,0,0,6,0,0,0,0,0,0,0,96,0,0,0,3,0,0,0,14,0,0,0,15,0,0,0,3,0,0,0,16,0,0,0,0,0,0,0,112,0,0,0,17,0,0,0,18,0,0,0,7,0,0,0,7,0,0,0,8,0,0,0,8,0,0,0,0,0,0,0,128,0,0,0,3,0,0,0,19,0,0,0,20,0,0,0,4,0,0,0,21,0,0,0,0,0,0,0,144,0,0,0,22,0,0,0,23,0,0,0,9,0,0,0,9,0,0,0,10,0,0,0,10,0,0,0,0,0,0,0,160,0,0,0,3,0,0,0,24,0,0,0,25,0,0,0,5,0,0,0,26,0,0,0,0,0,0,0,176,0,0,0,27,0,0,0,28,0,0,0,11,0,0,0,11,0,0,0,12,0,0,0,12,0,0,0,0,0,0,0,192,0,0,0,3,0,0,0,29,0,0,0,30,0,0,0,6,0,0,0,31,0,0,0,0,0,0,0,208,0,0,0,32,0,0,0,33,0,0,0,13,0,0,0,14,0,0,0,13,0,0,0,34,0,0,0,35,0,0,0,36,0,0,0,15,0,0,0,14,0,0,0,16,0,0,0,15,0,0,0,16,0,0,0,1,0,0,0,17,0,0,0,18,0,0,0,0,0,0,0,224,0,0,0,3,0,0,0,37,0,0,0,38,0,0,0,7,0,0,0,39,0,0,0,0,0,0,0,248,0,0,0,40,0,0,0,41,0,0,0,19,0,0,0,20,0,0,0,0,0,0,0,16,1,0,0,42,0,0,0,43,0,0,0,21,0,0,0,0,0,0,0,32,1,0,0,44,0,0,0,45,0,0,0,17,0,0,0,0,0,0,0,56,1,0,0,46,0,0,0,47,0,0,0,22,0,0,0,23,0,0,0,0,0,0,0,72,1,0,0,48,0,0,0,49,0,0,0,24,0,0,0,25,0,0,0,0,0,0,0,88,1,0,0,50,0,0,0,51,0,0,0,26,0,0,0,27,0,0,0,0,0,0,0,104,1,0,0,52,0,0,0,53,0,0,0,28,0,0,0,29,0,0,0,0,0,0,0,120,1,0,0,54,0,0,0,55,0,0,0,18,0,0,0,30,0,0,0,31,0,0,0,56,0,0,0,19,0,0,0,20,0,0,0,32,0,0,0,33,0,0,0,2,0,0,0,34,0,0,0,35,0,0,0,0,0,0,0,144,1,0,0,3,0,0,0,57,0,0,0,58,0,0,0,8,0,0,0,59,0,0,0,0,0,0,0,160,1,0,0,3,0,0,0,60,0,0,0,61,0,0,0,9,0,0,0,62,0,0,0,0,0,0,0,176,1,0,0,3,0,0,0,63,0,0,0,64,0,0,0,10,0,0,0,65,0,0,0,0,0,0,0,192,1,0,0,3,0,0,0,66,0,0,0,67,0,0,0,11,0,0,0,68,0,0,0,0,0,0,0,208,1,0,0,3,0,0,0,69,0,0,0,70,0,0,0,12,0,0,0,71,0,0,0,0,0,0,0,224,1,0,0,72,0,0,0,73,0,0,0,21,0,0,0,36,0,0,0,37,0,0,0,74,0,0,0,22,0,0,0,23,0,0,0,38,0,0,0,39,0,0,0,3,0,0,0,40,0,0,0,41,0,0,0,0,0,0,0,240,1,0,0,3,0,0,0,75,0,0,0,76,0,0,0,13,0,0,0,77,0,0,0,0,0,0,0,0,2,0,0,78,0,0,0,79,0,0,0,24,0,0,0,42,0,0,0,43,0,0,0,80,0,0,0,25,0,0,0,26,0,0,0,44,0,0,0,45,0,0,0,4,0,0,0,46,0,0,0,47,0,0,0,0,0,0,0,16,2,0,0,81,0,0,0,82,0,0,0,27,0,0,0,48,0,0,0,49,0,0,0,83,0,0,0,28,0,0,0,29,0,0,0,50,0,0,0,51,0,0,0,5,0,0,0,52,0,0,0,53,0,0,0,0,0,0,0,32,2,0,0,84,0,0,0,85,0,0,0,30,0,0,0,54,0,0,0,55,0,0,0,86,0,0,0,31,0,0,0,32,0,0,0,56,0,0,0,57,0,0,0,6,0,0,0,58,0,0,0,59,0,0,0,0,0,0,0,48,2,0,0,87,0,0,0,88,0,0,0,33,0,0,0,60,0,0,0,61,0,0,0,89,0,0,0,34,0,0,0,35,0,0,0,62,0,0,0,63,0,0,0,7,0,0,0,64,0,0,0,65,0,0,0,0,0,0,0,64,2,0,0,90,0,0,0,91,0,0,0,66,0,0,0,67,0,0,0,1,0,0,0,2,0,0,0,3,0,0,0,4,0,0,0,1,0,0,0,5,0,0,0,6,0,0,0,7,0,0,0,8,0,0,0,9,0,0,0,0,0,0,0,88,2,0,0,90,0,0,0,92,0,0,0,68,0,0,0,69,0,0,0,10,0,0,0,11,0,0,0,12,0,0,0,13,0,0,0,2,0,0,0,14,0,0,0,15,0,0,0,16,0,0,0,17,0,0,0,18,0,0,0,0,0,0,0,104,2,0,0,3,0,0,0,93,0,0,0,94,0,0,0,14,0,0,0,95,0,0,0,0,0,0,0,8,1,0,0,96,0,0,0,97,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,120,2,0,0,98,0,0,0,99,0,0,0,70,0,0,0,71,0,0,0,0,0,0,0,160,2,0,0,3,0,0,0,100,0,0,0,101,0,0,0,15,0,0,0,102,0,0,0,0,0,0,0,176,2,0,0,3,0,0,0,103,0,0,0,104,0,0,0,16,0,0,0,105,0,0,0,0,0,0,0,192,2,0,0,3,0,0,0,106,0,0,0,107,0,0,0,17,0,0,0,108,0,0,0,0,0,0,0,208,2,0,0,3,0,0,0,109,0,0,0,110,0,0,0,18,0,0,0,111,0,0,0,0,0,0,0,224,2,0,0,3,0,0,0,112,0,0,0,113,0,0,0,19,0,0,0,114,0,0,0,0,0,0,0,240,2,0,0,3,0,0,0,115,0,0,0,116,0,0,0,20,0,0,0,117,0,0,0,0,0,0,0,0,3,0,0,90,0,0,0,118,0,0,0,72,0,0,0,73,0,0,0,19,0,0,0,20,0,0,0,21,0,0,0,22,0,0,0,3,0,0,0,23,0,0,0,24,0,0,0,25,0,0,0,26,0,0,0,27,0,0,0,0,0,0,0,16,3,0,0,119,0,0,0,120,0,0,0,74,0,0,0,75,0,0,0,28,0,0,0,29,0,0,0,30,0,0,0,31,0,0,0,4,0,0,0,32,0,0,0,33,0,0,0,34,0,0,0,35,0,0,0,36,0,0,0,0,0,0,0,32,3,0,0,3,0,0,0,121,0,0,0,122,0,0,0,21,0,0,0,123,0,0,0,0,0,0,0,48,3,0,0,3,0,0,0,124,0,0,0,125,0,0,0,22,0,0,0,126,0,0,0,0,0,0,0,80,3,0,0,127,0,0,0,128,0,0,0,76,0,0,0,77,0,0,0,0,0,0,0,64,3,0,0,127,0,0,0,129,0,0,0,76,0,0,0,77,0,0,0,0,0,0,0,96,3,0,0,3,0,0,0,130,0,0,0,131,0,0,0,23,0,0,0,132,0,0,0,0,0,0,0,128,3,0,0,133,0,0,0,134,0,0,0,78,0,0,0,79,0,0,0,0,0,0,0,112,3,0,0,133,0,0,0,135,0,0,0,78,0,0,0,79,0,0,0,0,0,0,0,144,3,0,0,3,0,0,0,136,0,0,0,137,0,0,0,24,0,0,0,138,0,0,0,0,0,0,0,176,3,0,0,139,0,0,0,140,0,0,0,80,0,0,0,81,0,0,0,0,0,0,0,160,3,0,0,139,0,0,0,141,0,0,0,80,0,0,0,81,0,0,0,0,0,0,0,192,3,0,0,3,0,0,0,142,0,0,0,143,0,0,0,25,0,0,0,144,0,0,0,0,0,0,0,208,3,0,0,3,0,0,0,145,0,0,0,146,0,0,0,26,0,0,0,147,0,0,0,0,0,0,0,224,3,0,0,148,0,0,0,149,0,0,0,36,0,0,0,37,0,0,0,38,0,0,0,39,0,0,0,40,0,0,0,41,0,0,0,42,0,0,0,43,0,0,0,44,0,0,0,45,0,0,0,46,0,0,0,47,0,0,0,48,0,0,0,49,0,0,0,1,0,0,0,82,0,0,0,50,0,0,0,27,0,0,0,150,0,0,0,28,0,0,0,151,0,0,0,51,0,0,0,29,0,0,0,52,0,0,0,30,0,0,0,31,0,0,0,0,0,0,0,240,3,0,0,3,0,0,0,152,0,0,0,153,0,0,0,32,0,0,0,154,0,0,0,0,0,0,0,0,4,0,0,3,0,0,0,155,0,0,0,156,0,0,0,33,0,0,0,157,0,0,0,0,0,0,0,24,4,0,0,3,0,0,0,158,0,0,0,159,0,0,0,34,0,0,0,160,0,0,0,0,0,0,0,40,4,0,0,3,0,0,0,161,0,0,0,162,0,0,0,35,0,0,0,163,0,0,0,0,0,0,0,56,4,0,0,3,0,0,0,164,0,0,0,165,0,0,0,36,0,0,0,166,0,0,0,0,0,0,0,72,4,0,0,3,0,0,0,167,0,0,0,168,0,0,0,37,0,0,0,169,0,0,0,0,0,0,0,88,4,0,0,3,0,0,0,170,0,0,0,171,0,0,0,38,0,0,0,172,0,0,0,0,0,0,0,104,4,0,0,173,0,0,0,174,0,0,0,83,0,0,0,84,0,0,0,37,0,0,0,38,0,0,0,39,0,0,0,40,0,0,0,5,0,0,0,41,0,0,0,42,0,0,0,43,0,0,0,44,0,0,0,45,0,0,0,0,0,0,0,120,4,0,0,3,0,0,0,175,0,0,0,176,0,0,0,39,0,0,0,177,0,0,0,0,0,0,0,136,4,0,0,3,0,0,0,178,0,0,0,179,0,0,0,40,0,0,0,180,0,0,0,0,0,0,0,152,4,0,0,181,0,0,0,182,0,0,0,85,0,0,0,86,0,0,0,0,0,0,0,184,4,0,0,183,0,0,0,184,0,0,0,53,0,0,0,87,0,0,0,185,0,0,0,186,0,0,0,187,0,0,0,41,0,0,0,54,0,0,0,0,0,0,0,216,4,0,0,188,0,0,0,189,0,0,0,55,0,0,0,56,0,0,0,42,0,0,0,1,0,0,0,57,0,0,0,1,0,0,0,2,0,0,0,88,0,0,0,58,0,0,0,1,0,0,0,2,0,0,0,43,0,0,0,44,0,0,0,45,0,0,0,46,0,0,0,59,0,0,0,47,0,0,0,48,0,0,0,60,0,0,0,61,0,0,0,62,0,0,0,49,0,0,0,50,0,0,0,51,0,0,0,63,0,0,0,64,0,0,0,52,0,0,0,65,0,0,0,66,0,0,0,89,0,0,0,67,0,0,0,53,0,0,0,90,0,0,0,252,255,255,255,216,4,0,0,190,0,0,0,191,0,0,0,91,0,0,0,0,0,0,0,96,5,0,0,192,0,0,0,193,0,0,0,68,0,0,0,92,0,0,0,194,0,0,0,195,0,0,0,196,0,0,0,54,0,0,0,69,0,0,0,0,0,0,0,64,5,0,0,197,0,0,0,198,0,0,0,70,0,0,0,93,0,0,0,199,0,0,0,200,0,0,0,1,0,0,0,55,0,0,0,71,0,0,0,0,0,0,0,32,5,0,0,201,0,0,0,202,0,0,0,72,0,0,0,94,0,0,0,203,0,0,0,204,0,0,0,95,0,0,0,56,0,0,0,73,0,0,0,0,0,0,0,8,5,0,0,192,0,0,0,205,0,0,0,74,0,0,0,96,0,0,0,206,0,0,0,207,0,0,0,208,0,0,0,57,0,0,0,75,0,0,0,0,0,0,0,120,5,0,0,3,0,0,0,209,0,0,0,210,0,0,0,58,0,0,0,211,0,0,0,0,0,0,0,136,5,0,0,3,0,0,0,212,0,0,0,213,0,0,0,59,0,0,0,214,0,0,0,0,0,0,0,152,5,0,0,215,0,0,0,216,0,0,0,76,0,0,0,77,0,0,0,78,0,0,0,2,0,0,0,2,0,0,0,3,0,0,0,79,0,0,0,1,0,0,0,0,0,0,0,200,5,0,0,217,0,0,0,218,0,0,0,219,0,0,0,0,0,0,0,224,5,0,0,220,0,0,0,221,0,0,0,222,0,0,0,80,0,0,0,223,0,0,0,224,0,0,0,225,0,0,0,81,0,0,0,82,0,0,0,252,255,255,255,224,5,0,0,226,0,0,0,227,0,0,0,228,0,0,0,83,0,0,0,84,0,0,0,0,0,0,0,24,6,0,0,229,0,0,0,230,0,0,0,85,0,0,0,86,0,0,0,87,0,0,0,231,0,0,0,6,0,0,0,252,255,255,255,24,6,0,0,232,0,0,0,233,0,0,0,234,0,0,0,7,0,0,0,0,0,0,0,104,6,0,0,235,0,0,0,236,0,0,0,88,0,0,0,89,0,0,0,90,0,0,0,91,0,0,0,92,0,0,0,93,0,0,0,94,0,0,0,95,0,0,0,237,0,0,0,8,0,0,0,252,255,255,255,104,6,0,0,238,0,0,0,239,0,0,0,240,0,0,0,9,0,0,0,0,0,0,0,136,6,0,0,241,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,0,0,0,0,176,6,0,0,242,0,0,0,243,0,0,0,1,0,0,0,244,0,0,0,0,0,0,0,200,6,0,0,245,0,0,0,246,0,0,0,96,0,0,0,97,0,0,0,98,0,0,0,3,0,0,0,4,0,0,0,5,0,0,0,0,0,0,0,216,6,0,0,247,0,0,0,248,0,0,0,99,0,0,0,100,0,0,0,101,0,0,0,97,0,0,0,98,0,0,0,99,0,0,0,100,0,0,0,101,0,0,0,102,0,0,0,249,0,0,0,10,0,0,0,252,255,255,255,216,6,0,0,250,0,0,0,251,0,0,0,252,0,0,0,11,0,0,0,0,0,0,0,16,7,0,0,253,0,0,0,254,0,0,0,102,0,0,0,103,0,0,0,6,0,0,0,7,0,0,0,8,0,0,0,9,0,0,0,10,0,0,0,2,0,0,0,3,0,0,0,60,0,0,0,103,0,0,0,1,0,0,0,104,0,0,0,104,0,0,0,61,0,0,0,11,0,0,0,12,0,0,0,105,0,0,0,13,0,0,0,106,0,0,0,14,0,0,0,15,0,0,0,107,0,0,0,108,0,0,0,4,0,0,0,109,0,0,0,110,0,0,0,5,0,0,0,1,0,0,0,16,0,0,0,17,0,0,0,18,0,0,0,19,0,0,0,12,0,0,0,105,0,0,0,20,0,0,0,6,0,0,0,2,0,0,0,7,0,0,0,3,0,0,0,13,0,0,0,62,0,0,0,111,0,0,0,21,0,0,0,1,0,0,0,8,0,0,0,9,0,0,0,1,0,0,0,4,0,0,0,2,0,0,0,1,0,0,0,5,0,0,0,6,0,0,0,10,0,0,0,112,0,0,0,1,0,0,0,11,0,0,0,0,0,0,0,0,7,0,0,3,0,0,0,255,0,0,0,0,1,0,0,63,0,0,0,1,1,0,0,0,0,0,0,40,7,0,0,2,1,0,0,3,1,0,0,1,0,0,0,2,0,0,0,1,0,0,0,2,0,0,0,4,1,0,0,64,0,0,0,22,0,0,0,106,0,0,0,46,0,0,0,0,0,0,0,112,7,0,0,192,0,0,0,5,1,0,0,107,0,0,0,113,0,0,0,6,1,0,0,7,1,0,0,8,1,0,0,65,0,0,0,108,0,0,0,0,0,0,0,80,7,0,0,9,1,0,0,10,1,0,0,109,0,0,0,114,0,0,0,11,1,0,0,12,1,0,0,7,0,0,0,66,0,0,0,110,0,0,0,0,0,0,0,136,7,0,0,3,0,0,0,13,1,0,0,14,1,0,0,67,0,0,0,15,1,0,0,0,0,0,0,152,7,0,0,3,0,0,0,16,1,0,0,17,1,0,0,68,0,0,0,18,1,0,0,0,0,0,0,168,7,0,0,3,0,0,0,19,1,0,0,20,1,0,0,69,0,0,0,21,1,0,0,0,0,0,0,184,7,0,0,3,0,0,0,22,1,0,0,23,1,0,0,70,0,0,0,24,1,0,0,0,0,0,0,200,7,0,0,3,0,0,0,25,1,0,0,26,1,0,0,71,0,0,0,27,1,0,0,0,0,0,0,216,7,0,0,28,1,0,0,29,1,0,0,111,0,0,0,112,0,0,0,113,0,0,0,114,0,0,0,23,0,0,0,24,0,0,0,115,0,0,0,25,0,0,0,26,0,0,0,27,0,0,0,116,0,0,0,115,0,0,0,116,0,0,0,0,0,0,0,240,7,0,0,3,0,0,0,30,1,0,0,31,1,0,0,72,0,0,0,32,1,0,0,0,0,0,0,0,8,0,0,3,0,0,0,33,1,0,0,34,1,0,0,73,0,0,0,35,1,0,0,48,8,0,0,232,11,0,0,48,8,0,0,136,8,0,0,232,11,0,0,48,8,0,0,232,11,0,0,48,8,0,0,16,8,0,0,232,11,0,0,48,8,0,0,16,12,0,0,232,11,0,0,48,8,0,0,128,8,0,0,232,11,0,0,48,8,0,0,120,8,0,0,232,11,0,0,48,8,0,0,112,8,0,0,56,12,0,0,232,11,0,0,48,8,0,0,56,12,0,0,232,11,0,0,48,8,0,0,112,8,0,0,232,11,0,0,48,8,0,0,32,12,0,0,232,11,0,0,48,8,0,0,32,8,0,0,232,11,0,0,48,8,0,0,24,12,0,0,0,0,0,0,160,8,0,0,36,1,0,0,37,1,0,0,14,0,0,0,28,0,0,0,29,0,0,0,117,0,0,0,0,0,0,0,176,8,0,0,38,1,0,0,39,1,0,0,40,1,0,0,15,0,0,0,30,0,0,0,118,0,0,0,0,0,0,0,240,8,0,0,41,1,0,0,42,1,0,0,117,0,0,0,118,0,0,0,119,0,0,0,0,0,0,0,208,8,0,0,43,1,0,0,44,1,0,0,120,0,0,0,121,0,0,0,0,0,0,0,192,8,0,0,3,0,0,0,45,1,0,0,46,1,0,0,74,0,0,0,47,1,0,0,0,0,0,0,224,8,0,0,3,0,0,0,48,1,0,0,49,1,0,0,75,0,0,0,50,1,0,0,0,0,0,0,0,9,0,0,51,1,0,0,52,1,0,0,53,1,0,0,16,0,0,0,1,0,0,0,119,0,0,0,0,0,0,0,16,9,0,0,3,0,0,0,54,1,0,0,55,1,0,0,76,0,0,0,56,1,0,0,0,0,0,0,48,9,0,0,57,1,0,0,58,1,0,0,8,0,0,0,0,0,0,0,64,9,0,0,3,0,0,0,59,1,0,0,60,1,0,0,77,0,0,0,61,1,0,0,0,0,0,0,80,9,0,0,62,1,0,0,63,1,0,0,64,1,0,0,65,1,0,0,66,1,0,0,0,0,0,0,112,9,0,0,67,1,0,0,68,1,0,0,122,0,0,0,123,0,0,0,124,0,0,0,125,0,0,0,4,0,0,0,0,0,0,0,152,9,0,0,69,1,0,0,70,1,0,0,31,0,0,0,0,0,0,0,136,9,0,0,3,0,0,0,71,1,0,0,72,1,0,0,78,0,0,0,73,1,0,0,0,0,0,0,176,9,0,0,74,1,0,0,75,1,0,0,120,0,0,0,0,0,0,0,40,10,0,0,192,0,0,0,76,1,0,0,126,0,0,0,121,0,0,0,77,1,0,0,78,1,0,0,79,1,0,0,79,0,0,0,127,0,0,0,0,0,0,0,16,10,0,0,192,0,0,0,80,1,0,0,128,0,0,0,122,0,0,0,81,1,0,0,82,1,0,0,83,1,0,0,80,0,0,0,129,0,0,0,0,0,0,0,248,9,0,0,192,0,0,0,84,1,0,0,130,0,0,0,123,0,0,0,85,1,0,0,86,1,0,0,87,1,0,0,81,0,0,0,131,0,0,0,0,0,0,0,224,9,0,0,192,0,0,0,88,1,0,0,132,0,0,0,124,0,0,0,89,1,0,0,90,1,0,0,91,1,0,0,82,0,0,0,133,0,0,0,0,0,0,0,200,9,0,0,192,0,0,0,92,1,0,0,134,0,0,0,125,0,0,0,93,1,0,0,94,1,0,0,95,1,0,0,83,0,0,0,135,0,0,0,0,0,0,0,64,10,0,0,3,0,0,0,96,1,0,0,97,1,0,0,84,0,0,0,98,1,0,0,0,0,0,0,128,10,0,0,99,1,0,0,100,1,0,0,136,0,0,0,137,0,0,0,32,0,0,0,33,0,0,0,34,0,0,0,35,0,0,0,36,0,0,0,12,0,0,0,13,0,0,0,85,0,0,0,126,0,0,0,2,0,0,0,127,0,0,0,138,0,0,0,86,0,0,0,37,0,0,0,38,0,0,0,128,0,0,0,39,0,0,0,129,0,0,0,40,0,0,0,41,0,0,0,130,0,0,0,131,0,0,0,14,0,0,0,132,0,0,0,133,0,0,0,15,0,0,0,2,0,0,0,42,0,0,0,43,0,0,0,44,0,0,0,45,0,0,0,17,0,0,0,139,0,0,0,46,0,0,0,16,0,0,0,9,0,0,0,17,0,0,0,10,0,0,0,18,0,0,0,87,0,0,0,134,0,0,0,47,0,0,0,2,0,0,0,18,0,0,0,19,0,0,0,3,0,0,0,11,0,0,0,4,0,0,0,2,0,0,0,12,0,0,0,13,0,0,0,20,0,0,0,135,0,0,0,2,0,0,0,21,0,0,0,0,0,0,0,80,10,0,0,3,0,0,0,101,1,0,0,102,1,0,0,88,0,0,0,103,1,0,0,0,0,0,0,96,10,0,0,3,0,0,0,104,1,0,0,105,1,0,0,89,0,0,0,106,1,0,0,0,0,0,0,112,10,0,0,3,0,0,0,107,1,0,0,108,1,0,0,90,0,0,0,109,1,0,0,0,0,0,0,144,10,0,0,3,0,0,0,110,1,0,0,111,1,0,0,91,0,0,0,112,1,0,0,4,33,0,0,5,0,0,0,0,0,0,0,0,0,0,0,140,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,19,0,0,0,20,0,0,0,251,151,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,140,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21,0,0,0,20,0,0,0,3,152,0,0,0,4,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,116,33,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,3,0,0,0,5,0,0,0,7,0,0,0,11,0,0,0,13,0,0,0,17,0,0,0,19,0,0,0,23,0,0,0,29,0,0,0,31,0,0,0,37,0,0,0,41,0,0,0,43,0,0,0,47,0,0,0,53,0,0,0,59,0,0,0,61,0,0,0,67,0,0,0,71,0,0,0,73,0,0,0,79,0,0,0,83,0,0,0,89,0,0,0,97,0,0,0,101,0,0,0,103,0,0,0,107,0,0,0,109,0,0,0,113,0,0,0,127,0,0,0,131,0,0,0,137,0,0,0,139,0,0,0,149,0,0,0,151,0,0,0,157,0,0,0,163,0,0,0,167,0,0,0,173,0,0,0,179,0,0,0,181,0,0,0,191,0,0,0,193,0,0,0,197,0,0,0,199,0,0,0,211,0,0,0,1,0,0,0,11,0,0,0,13,0,0,0,17,0,0,0,19,0,0,0,23,0,0,0,29,0,0,0,31,0,0,0,37,0,0,0,41,0,0,0,43,0,0,0,47,0,0,0,53,0,0,0,59,0,0,0,61,0,0,0,67,0,0,0,71,0,0,0,73,0,0,0,79,0,0,0,83,0,0,0,89,0,0,0,97,0,0,0,101,0,0,0,103,0,0,0,107,0,0,0,109,0,0,0,113,0,0,0,121,0,0,0,127,0,0,0,131,0,0,0,137,0,0,0,139,0,0,0,143,0,0,0,149,0,0,0,151,0,0,0,157,0,0,0,163,0,0,0,167,0,0,0,169,0,0,0,173,0,0,0,179,0,0,0,181,0,0,0,187,0,0,0,191,0,0,0,193,0,0,0,197,0,0,0,199,0,0,0,209,0,0,0,2,0,0,0,9,147,0,0,0,0,0,0,96,11,0,0,113,1,0,0,114,1,0,0,115,1,0,0,116,1,0,0,23,0,0,0,3,0,0,0,22,0,0,0,14,0,0,0,0,0,0,0,136,11,0,0,113,1,0,0,117,1,0,0,115,1,0,0,116,1,0,0,23,0,0,0,4,0,0,0,23,0,0,0,15,0,0,0,0,0,0,0,152,11,0,0,118,1,0,0,119,1,0,0,141,0,0,0,0,0,0,0,200,11,0,0,113,1,0,0,120,1,0,0,115,1,0,0,116,1,0,0,24,0,0,0,0,0,0,0,184,11,0,0,113,1,0,0,121,1,0,0,115,1,0,0,116,1,0,0,25,0,0,0,0,0,0,0,72,12,0,0,113,1,0,0,122,1,0,0,115,1,0,0,116,1,0,0,26,0,0,0,0,0,0,0,88,12,0,0,113,1,0,0,123,1,0,0,115,1,0,0,116,1,0,0,23,0,0,0,5,0,0,0,24,0,0,0,16,0,0,0,78,50,118,101,49,50,67,114,101,97,116,101,100,65,114,114,111,119,69,0,78,50,118,101,49,52,73,67,114,101,97,116,101,100,79,98,106,101,99,116,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,48,65,114,114,111,119,77,111,100,101,108,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,48,65,114,114,111,119,77,111,100,101,108,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,57,66,108,117,114,77,111,100,101,108,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,57,66,108,117,114,77,111,100,101,108,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,49,49,67,114,101,97,116,101,100,66,108,117,114,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,48,66,114,117,115,104,77,111,100,101,108,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,48,66,114,117,115,104,77,111,100,101,108,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,49,50,67,114,101,97,116,101,100,66,114,117,115,104,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,57,76,105,110,101,77,111,100,101,108,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,57,76,105,110,101,77,111,100,101,108,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,49,49,67,114,101,97,116,101,100,76,105,110,101,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,57,79,118,97,108,77,111,100,101,108,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,57,79,118,97,108,77,111,100,101,108,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,49,49,67,114,101,97,116,101,100,79,118,97,108,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,52,82,101,99,116,97,110,103,108],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE);allocate([101,77,111,100,101,108,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,52,82,101,99,116,97,110,103,108,101,77,111,100,101,108,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,49,54,67,114,101,97,116,101,100,82,101,99,116,97,110,103,108,101,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,57,84,101,120,116,77,111,100,101,108,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,57,84,101,120,116,77,111,100,101,108,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,49,48,69,100,105,116,101,100,84,101,120,116,69,0,78,50,118,101,49,49,73,69,100,105,116,101,100,84,101,120,116,69,0,78,50,118,101,49,54,67,111,109,112,111,115,105,116,101,67,111,109,109,97,110,100,69,0,78,50,118,101,56,73,67,111,109,109,97,110,100,69,0,78,83,116,51,95,95,50,49,55,98,97,100,95,102,117,110,99,116,105,111,110,95,99,97,108,108,69,0,78,50,118,101,55,72,105,115,116,111,114,121,69,0,78,50,118,101,56,73,72,105,115,116,111,114,121,69,0,78,50,118,101,49,57,77,111,100,101,108,67,104,97,110,103,101,100,67,111,109,109,97,110,100,69,0,78,50,118,101,49,49,77,111,118,101,67,111,109,109,97,110,100,69,0,78,50,118,101,49,52,82,101,111,114,100,101,114,67,111,109,109,97,110,100,69,0,78,50,118,101,49,56,84,101,120,116,67,104,97,110,103,101,100,67,111,109,109,97,110,100,69,0,78,50,118,101,49,51,83,101,108,101,99,116,101,100,66,114,117,115,104,69,0,78,50,118,101,49,53,73,83,101,108,101,99,116,101,100,79,98,106,101,99,116,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,50,83,101,108,101,99,116,101,100,84,101,120,116,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,50,83,101,108,101,99,116,101,100,84,101,120,116,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,55,83,101,108,101,99,116,101,100,82,101,99,116,97,110,103,108,101,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,55,83,101,108,101,99,116,101,100,82,101,99,116,97,110,103,108,101,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,50,83,101,108,101,99,116,101,100,79,118,97,108,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,50,83,101,108,101,99,116,101,100,79,118,97,108,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,51,83,101,108,101,99,116,101,100,66,114,117,115,104,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,51,83,101,108,101,99,116,101,100,66,114,117,115,104,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,50,48,83,101,108,101,99,116,101,100,76,105,110,101,97,114,79,98,106,101,99,116,73,78,83,49,95,49,48,65,114,114,111,119,77,111,100,101,108,69,76,104,49,69,76,104,50,69,69,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,50,48,83,101,108,101,99,116,101,100,76,105,110,101,97,114,79,98,106,101,99,116,73,78,83,49,95,49,48,65,114,114,111,119,77,111,100,101,108,69,76,104,49,69,76,104,50,69,69,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,52,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,52,95,69,69,69,69,0,78,50,118,101,50,48,83,101,108,101,99,116,101,100,76,105,110,101,97,114,79,98,106,101,99,116,73,78,83,95,49,48,65,114,114,111,119,77,111,100,101,108,69,76,104,49,69,76,104,50,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,50,48,83,101,108,101,99,116,101,100,76,105,110,101,97,114,79,98,106,101,99,116,73,78,83,49,95,57,76,105,110,101,77,111,100,101,108,69,76,104,49,69,76,104,50,69,69,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,50,48,83,101,108,101,99,116,101,100,76,105,110,101,97,114,79,98,106,101,99,116,73,78,83,49,95,57,76,105,110,101,77,111,100,101,108,69,76,104,49,69,76,104,50,69,69,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,52,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,52,95,69,69,69,69,0,78,50,118,101,50,48,83,101,108,101,99,116,101,100,76,105,110,101,97,114,79,98,106,101,99,116,73,78,83,95,57,76,105,110,101,77,111,100,101,108,69,76,104,49,69,76,104,50,69,69,69,0,78,50,118,101,49,50,83,101,108,101,99,116,101,100,79,118,97,108,69,0,78,50,118,101,49,55,83,101,108,101,99,116,101,100,82,101,99,116,97,110,103,108,101,69,0,78,50,118,101,49,50,83,101,108,101,99,116,101,100,84,101,120,116,69,0,78,50,118,101,50,48,67,97,109,101,114,97,77,111,118,101,73,110,112,117,116,83,116,97,116,101,69,0,78,50,118,101,49,49,73,73,110,112,117,116,83,116,97,116,101,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,48,65,100,100,67,111,109,109,97,110,100,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,48,65,100,100,67,111,109,109,97,110,100,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,49,48,65,100,100,67,111,109,109,97,110,100,69,0,78,50,118,101,50,48,65,100,100,82,101,109,111,118,101,67,111,109,109,97,110,100,66,97,115,101,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,54,67,114,101,97,116,101,100,82,101,99,116,97,110,103,108,101,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,54,67,114,101,97,116,101,100,82,101,99,116,97,110,103,108,101,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,49,67,114,101,97,116,101,100,79,118,97,108,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,49,67,114,101,97,116,101,100,79,118,97,108,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,50,67,114,101,97,116,101,100,66,114,117,115,104,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,50,67,114,101,97,116,101,100,66,114,117,115,104,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,50,67,114,101,97,116,101,100,65,114,114,111,119,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,50,67,114,101,97,116,101,100,65,114,114,111,119,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,49,67,114,101,97,116,101,100,66,108,117,114,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,49,67,114,101,97,116,101,100,66,108,117,114,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,49,67,114,101,97,116,101,100,76,105,110,101,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,49,67,114,101,97,116,101,100,76,105,110,101,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,50,52,67,114,101,97,116,101,87,105,116,104,68,114,97,103,73,110,112,117,116,83,116,97,116,101,69,0,78,50,118,101,49,55,68,101,102,97,117,108,116,73,110,112,117,116,83,116,97,116,101,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,54,67,111,109,112,111,115,105,116,101,67,111,109,109,97,110,100,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,54,67,111,109,112,111,115,105,116,101,67,111,109,109,97,110,100,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,50,50,67,104,97,110,103,101,72,97,115,83,104,97,100,111,119,67,111,109,109,97,110,100,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,50,50,67,104,97,110,103,101,72,97,115,83,104,97,100,111,119,67,111,109,109,97,110,100,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,50,50,67,104,97,110,103,101,72,97,115,83,104,97,100,111,119,67,111,109,109,97,110,100,69,0,78,50,118,101,50,49,67,104,97,110,103,101,80,114,111,112,101,114,116,121,67,111,109,109,97,110,100,73,98,77,78,83,95,49,53,73,83,101,108,101,99,116,101,100,79,98,106,101,99,116,69,70,118,98,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,50,50,67,104,97,110,103,101,84,104,105,99,107,110,101,115,115,67,111,109,109,97,110,100,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,50,50,67,104,97,110,103,101,84,104,105,99,107,110,101,115,115,67,111,109,109,97,110,100,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,50,50,67,104,97,110,103,101,84,104,105,99,107,110,101,115,115,67,111,109,109,97,110,100,69,0,78,50,118,101,50,49,67,104,97,110,103,101,80,114,111,112,101,114,116,121,67,111,109,109,97,110,100,73,102,77,78,83,95,49,53,73,83,101,108,101,99,116,101,100,79,98,106,101,99,116,69,70,118,102,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,56,67,104,97,110,103,101,67,111,108,111,114,67,111,109,109,97,110,100,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,56,67,104,97,110,103,101,67,111,108,111,114,67,111,109,109,97,110,100,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,49,56,67,104,97,110,103,101,67,111,108,111,114,67,111,109,109,97,110,100,69,0,78,50,118,101,50,49,67,104,97,110,103,101,80,114,111,112,101,114,116,121,67,111,109,109,97,110,100,73,78,83,95,53,67,111,108,111,114,69,77,78,83,95,49,53,73,83,101,108,101,99,116,101,100,79,98,106,101,99,116,69,70,118,82,75,83,49,95,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,57,77,111,100,101,108,67,104,97,110,103,101,100,67,111,109,109,97,110,100,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,57,77,111,100,101,108,67,104,97,110,103,101,100,67,111,109,109,97,110,100,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,49,77,111,118,101,67,111,109,109,97,110,100,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,49,77,111,118,101,67,111,109,109,97,110,100,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,49,56,83,101,108,101,99,116,101,100,73,110,112,117,116,83,116,97,116,101,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,48,69,100,105,116,101,100,84,101,120,116,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,48,69,100,105,116,101,100,84,101,120,116,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,52,82,101,111,114,100,101,114,67,111,109,109,97,110,100,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,52,82,101,111,114,100,101,114,67,111,109,109,97,110,100,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,49,50,83,116,97,116,101,67,111,110,116,101,120,116,69,0,78,50,118,101,49,51,73,83,116,97,116,101,67,111,110,116,101,120,116,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,50,48,67,97,109,101,114,97,77,111,118,101,73,110,112,117,116,83,116,97,116,101,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,50,48,67,97,109,101,114,97,77,111,118,101,73,110,112,117,116,83,116,97,116,101,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,56,84,101,120,116,69,100,105,116,73,110,112,117,116,83,116,97,116,101,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,56,84,101,120,116,69,100,105,116,73,110,112,117,116,83,116,97,116,101,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,56,83,101,108,101,99,116,101,100,73,110,112,117,116,83,116,97,116,101,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,56,83,101,108,101,99,116,101,100,73,110,112,117,116,83,116,97,116,101,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,50,52,67,114,101,97,116,101,87,105,116,104,68,114,97,103,73,110,112,117,116,83,116,97,116,101,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,50,52,67,114,101,97,116,101,87,105,116,104,68,114,97,103,73,110,112,117,116,83,116,97,116,101,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,55,68,101,102,97,117,108,116,73,110,112,117,116,83,116,97,116,101,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,55,68,101,102,97,117,108,116,73,110,112,117,116,83,116,97,116,101,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,56,84,101,120,116,67,104,97,110,103,101,100,67,111,109,109,97,110,100,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,56,84,101,120,116,67,104,97,110,103,101,100,67,111,109,109,97,110,100,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,51,82,101,109,111,118,101,67,111,109,109,97,110,100,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,51,82,101,109,111,118,101,67,111,109,109,97,110,100,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,49,51,82,101,109,111,118,101,67,111,109,109,97,110,100,69,0,90,78,50,118,101,49,56,84,101,120,116,69,100,105,116,73,110,112,117,116,83,116,97,116,101,49,57,83,116,97,114,116,67,117,114,115,111,114,66,108,105,110,107,105,110,103,69,82,78,83,95,49,51,73,83,116,97,116,101,67,111,110,116,101,120,116,69,69,51,36,95,48,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,102,117,110,99,73,90,78,50,118,101,49,56,84,101,120,116,69,100,105,116,73,110,112,117,116,83,116,97,116,101,49,57,83,116,97,114,116,67,117,114,115,111,114,66,108,105,110,107,105,110,103,69,82,78,83,50,95,49,51,73,83,116,97,116,101,67,111,110,116,101,120,116,69,69,51,36,95,48,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,54,95,69,69,70,118,118,69,69,69,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,98,97,115,101,73,70,118,118,69,69,69,0,78,50,118,101,49,56,84,101,120,116,69,100,105,116,73,110,112,117,116,83,116,97,116,101,69,0,78,50,118,101,54,69,100,105,116,111,114,69,0,78,50,118,101,49,52,73,83,116,97,116,101,83,119,105,116,99,104,101,114,69,0,78,50,118,101,55,73,69,100,105,116,111,114,69,0,90,78,50,118,101,54,69,100,105,116,111,114,49,55,83,117,98,115,99,114,105,98,101,84,111,69,118,101,110,116,115,69,118,69,51,36,95,51,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,102,117,110,99,73,90,78,50,118,101,54,69,100,105,116,111,114,49,55,83,117,98,115,99,114,105,98,101,84,111,69,118,101,110,116,115,69,118,69,51,36,95,51,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,52,95,69,69,70,118,118,69,69,69,0,90,78,50,118,101,54,69,100,105,116,111,114,49,55,83,117,98,115,99,114,105,98,101,84,111,69,118,101,110,116,115,69,118,69,51,36,95,50,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,102,117,110,99,73,90,78,50,118,101,54,69,100,105,116,111,114,49,55,83,117,98,115,99,114,105,98,101,84,111,69,118,101,110,116,115,69,118,69,51,36,95,50,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,52,95,69,69,70,118,82,75,78,83,50,95,49,48,79,117,116,112,117,116,83,105,122,101,69,69,69,69,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,98,97,115,101,73,70,118,82,75,78,50,118,101,49,48,79,117,116,112,117,116,83,105,122,101,69,69,69,69,0,90,78,50,118,101,54,69,100,105,116,111,114,49,55,83,117,98,115,99,114,105,98,101,84,111,69,118,101,110,116,115,69,118,69,51,36,95,49,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,102,117,110,99,73,90,78,50,118,101,54,69,100,105,116,111,114,49,55,83,117,98,115,99,114,105,98,101,84,111,69,118,101,110,116,115,69,118,69,51,36,95,49,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,52,95,69,69,70,118,82,75,78,83,50,95,57,84,101,120,116,77,111,100,101,108,69,82,98,82,78,83,50,95,57,82,101,99,116,97,110,103,108,101,69,69,69,69,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,98,97,115,101,73,70,118,82,75,78,50,118,101,57,84,101,120,116,77,111,100,101,108,69,82,98,82,78,83,50,95,57,82,101,99,116,97,110,103,108,101,69,69,69,69,0,90,78,50,118,101,54,69,100,105,116,111,114,49,55,83,117,98,115,99,114,105,98,101,84,111,69,118,101,110,116,115,69,118,69,51,36,95,48,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,102,117,110,99,73,90,78,50,118,101,54,69,100,105,116,111,114,49,55,83,117,98,115,99,114,105,98,101,84,111,69,118,101,110,116,115,69,118,69,51,36,95,48,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,52,95,69,69,70,118,118,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,53,69,100,105,116,111,114,67,97,108,108,98,97,99,107,115,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,53,69,100,105,116,111,114,67,97,108,108,98,97,99,107,115,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,54,69,100,105,116,111,114,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,54,69,100,105,116,111,114,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,50,118,101,56,77,101,97,115,117,114,101,115,69,0,78,50,118,101,49,52,73,83,116,97,116,101,77,101,97,115,117,114,101,115,69,0,78,50,118,101,57,73,77,101,97,115,117,114,101,115,69,0,78,50,118,101,49,52,73,73,109,97,103,101,82,101,99,101,105,118,101,114,69,0,78,50,118,101,54,111,112,101,110,103,108,49,56,68,101,102,97,117,108,116,70,114,97,109,101,66,117,102,102,101,114,69,0,78,50,118,101,54,111,112,101,110,103,108,49,50,73,70,114,97,109,101,66,117,102,102,101,114,69,0,78,50,118,101,54,111,112,101,110,103,108,49,49,70,114,97,109,101,66,117,102,102,101,114,69,0,78,50,118,101,54,111,112,101,110,103,108,49,54,73,79,102,102,115,99,114,101,101,110,66,117,102,102,101,114,69,0,78,50,118,101,54,111,112,101,110,103,108,56,73,84,101,120,116,117,114,101,69,0,78,50,118,101,54,111,112,101,110,103,108,49,51,79,112,101,110,71,76,66,117,102,102,101,114,115,69,0,78,50,118,101,54,111,112,101,110,103,108,49,57,73,67,111,110,116,101,120,116,76,111,115,115,72,97,110,100,108,101,114,69,0,78,50,118,101,54,111,112,101,110,103,108,49,52,73,79,112,101,110,71,76,66,117,102,102,101,114,115,69,0,78,50,118,101,54,111,112,101,110,103,108,55,73,66,105,116,109,97,112,69,0,78,50,118,101,54,111,112,101,110,103,108,49,53,73,66,105,116,109,97,112,70,114,97,103,109,101,110,116,69,0,78,50,118,101,54,111,112,101,110,103,108,49,53,73,66,105,116,109,97,112,80,114,111,118,105,100,101,114,69,0,10,117,110,105,102,111,114,109,32,109,97,116,52,32,112,114,111,106,101,99,116,105,111,110,59,10,117,110,105,102,111,114,109,32,109,97,116,52,32,118,105,101,119,95,109,111,100,101,108,59,10,10,97,116,116,114,105,98,117,116,101,32,118,101,99,50,32,112,111,115,105,116,105,111,110,59,10,97,116,116,114,105,98,117,116,101,32,118,101,99,50,32,116,101,120,116,117,114,101,95,99,111,111,114,100,59,10,10,118,97,114,121,105,110,103,32,118,101,99,50,32,111,117,116,95,116,101,120,116,117,114,101,95,99,111,111,114,100,59,10,118,97,114,121,105,110,103,32,118,101,99,52,32,111,117,116,95,115,99,114,101,101,110,95,99,111,111,114,100,59,10,10,118,111,105,100,32,109,97,105,110,40,118,111,105,100,41,10,123,10,32,32,32,32,111,117,116,95,116,101,120,116,117,114,101,95,99,111,111,114,100,32,61,32,116,101,120,116,117,114,101,95,99,111,111,114,100,59,10,10,32,32,32,32,118,101,99,52,32,112,111,115,32,61,32,118,101,99,52,40,112,111,115,105,116,105,111,110,44,32,48,46,48,44,32,49,46,48,41,59,10,32,32,32,32,111,117,116,95,115,99,114,101,101,110,95,99,111,111,114,100,32,61,32,118,105,101,119,95,109,111,100,101,108,32,42,32,112,111,115,59,10,32,32,32,32,103,108,95,80,111,115,105,116,105,111,110,32,61,32,112,114,111,106,101,99,116,105,111,110,32,42,32,118,105,101,119,95,109,111,100,101,108,32,42,32,112,111,115,59,10,125,10,0,10,35,105,102,110,100,101,102,32,71,76,95,69,83,10,35,100,101,102,105,110,101,32,104,105,103,104,112,10,35,100,101,102,105,110,101,32,109,101,100,105,117,109,112,10,35,100,101,102,105,110,101,32,108,111,119,112,10,35,101,110,100,105,102,10,10,117,110,105,102,111,114,109,32,115,97,109,112,108,101,114,50,68,32,115,97,109,112,108,101,114,59,10,117,110,105,102,111,114,109,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,98,108,117,114,95,115,105,122,101,59,32,32,32,32,47,47,32,116,104,101,32,115,105,122,101,32,111,102,32,116,104,101,32,98,108,117,114,32,115,113,117,97,114,101,44,32,105,110,32,115,99,114,101,101,110,32,99,111,111,114,100,105,110,97,116,101,115,10,117,110,105,102,111,114,109,32,109,101,100,105,117,109,112,32,118,101,99,50,32,119,105,110,100,111,119,95,115,105,122,101,59,32,32,32,47,47,32,116,104,101,32,115,105,122,101,32,111,102,32,116,104,101,32,111,117,116,112,117,116,32,119,105,110,100,111,119,10,117,110,105,102,111,114,109,32,109,101,100,105,117,109,112,32,118,101,99,50,32,100,105,114,59,32,32,32,32,32,32,32,32,32,32,32,47,47,32,116,104,101,32,100,105,114,101,99,116,105,111,110,32,111,102,32,116,104,101,32,111,102,102,115,101,116,32,40,49,46,48,44,32,48,46,48,41,32,45,32,104,111,114,105,122,111,110,116,97,108,44,32,40,48,46,48,44,32,49,46,48,41,32,45,32,118,101,114,116,105,99,97,108,10,10,118,97,114,121,105,110,103,32,109,101,100,105,117,109,112,32,118,101,99,50,32,111,117,116,95,116,101,120,116,117,114,101,95,99,111,111,114,100,59,10,118,97,114,121,105,110,103,32,109,101,100,105,117,109,112,32,118,101,99,52,32,111,117,116,95,115,99,114,101,101,110,95,99,111,111,114,100,59,10,10,118,111,105,100,32,109,97,105,110,40,118,111,105,100,41,10,123,10,32,32,32,32,47,47,32,68,101,116,101,99,116,32,116,104,101,32,115,116,97,114,116,105,110,103,32,112,111,105,110,116,32,105,110,32,115,99,114,101,101,110,32,99,111,111,114,100,105,110,97,116,101,115,32,102,111,114,32,116,104,101,32,98,108,117,114,32,115,113,117,97,114,101,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,114,111,117,110,100,101,100,95,98,108,117,114,95,115,105,122,101,32,61,32,102,108,111,111,114,40,98,108,117,114,95,115,105,122,101,32,43,32,48,46,53,41,59,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,120,95,115,116,97,114,116,32,61,32,102,108,111,111,114,40,111,117,116,95,115,99,114,101,101,110,95,99,111,111,114,100,46,120,32,47,32,114,111,117,110,100,101,100,95,98,108,117,114,95,115,105,122,101,41,32,42,32,114,111,117,110,100,101,100,95,98,108,117,114,95,115,105,122,101,59,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,121,95,115,116,97,114,116,32,61,32,102,108,111,111,114,40,111,117,116,95,115,99,114,101,101,110,95,99,111,111,114,100,46,121,32,47,32,114,111,117,110,100,101,100,95,98,108,117,114,95,115,105,122,101,41,32,42,32,114,111,117,110,100,101,100,95,98,108,117,114,95,115,105,122,101,59,10,10,32,32,32,32,47,47,32,73,110,105,116,105,97,108,108,121,32,110,111,32,99,111,108,111,114,10,32,32,32,32,109,101,100,105,117,109,112,32,118,101,99,52,32,99,111,108,111,114,32,61,32,118,101,99,52,40,48,46,48,44,32,48,46,48,44,32,48,46,48,44,32,48,46,48,41,59,10,10,32,32,32,32,47,47,32,83,105,103,110,115,32,102,111,114,32,98,108,117,114,32,100,105,114,101,99,116,105,111,110,115,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,115,120,32,61,32,115,105,103,110,40,100,105,114,46,120,41,59,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,115,121,32,61,32,115,105,103,110,40,100,105,114,46,121,41,59,10,10,32,32,32,32,47,47,32,83,116,101,112,115,32,105,110,32,116,101,120,116,117,114,101,32,99,111,111,114,100,105,110,97,116,101,115,44,32,102,111,114,32,116,101,120,116,117,114,101,32,108,111,111,107,117,112,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,120,95,116,101,120,95,115,116,101,112,32,61,32,49,46,48,32,47,32,119,105,110,100,111,119,95,115,105,122,101,46,120,59,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,121,95,116,101,120,95,115,116,101,112,32,61,32,49,46,48,32,47,32,119,105,110,100,111,119,95,115,105,122,101,46,121,59,10,10,32,32,32,32,47,42,10,32,32,32,32,32,42,32,83,116,97,114,116,32,112,111,115,105,116,105,111,110,115,32,105,110,32,116,101,120,116,117,114,101,32,99,111,111,114,100,105,110,97,116,101,115,58,10,32,32,32,32,32,42,32,32,45,32,105,102,32,116,104,105,115,32,105,115,32,98,108,117,114,32,100,105,114,101,99,116,105,111,110,32,45,32,115,116,97,114,116,32,111,102,32,116,104,101,32,98,108,117,114,32,115,113,117,97,114,101,44,10,32,32,32,32,32,42,32,32,45,32,105,102,32,116,104,105,115,32,105,115,32,110,111,116,32,98,108,117,114,32,100,105,114,101,99,116,105,111,110,32,45,32,116,101,120,116,117,114,101,32,99,111,111,114,100,105,110,97,116,101,32,102,111,114,32,116,104,105,115,32,112,111,105,110,116,10,32,32,32,32,32,42,47,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,120,95,116,101,120,95,115,116,97,114,116,32,61,32,115,120,32,42,32,120,95,115,116,97,114,116,32,42,32,120,95,116,101,120,95,115,116,101,112,32,43,32,40,49,46,48,32,45,32,115,120,41,32,42,32,111,117,116,95,116,101,120,116,117,114,101,95,99,111,111,114,100,46,120,59,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,121,95,116,101,120,95,115,116,97,114,116,32,61,32,115,121,32,42,32,121,95,115,116,97,114,116,32,42,32,121,95,116,101,120,95,115,116,101,112,32,43,32,40,49,46,48,32,45,32,115,121,41,32,42,32,111,117,116,95,116,101,120,116,117,114,101,95,99,111,111,114,100,46,121,59,10,10,32,32,32,32,102,111,114,32,40,109,101,100,105,117,109,112,32,102,108,111,97,116,32,105,32,61,32,48,46,48,59,32,105,32,60,32,52,48,46,48,59,32,105,43,43,41,32,123,32,32,47,47,32,116,104,101,32,117,112,112,101,114,32,108,105,109,105,116,32,109,117,115,116,32,98,101,32,99,111,110,115,116,97,110,116,10,32,32,32,32,32,32,32,32,105,102,32,40,105,32,60,32,114,111,117,110,100,101,100,95,98,108,117,114,95,115,105,122,101,41,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,47,47,32,67,97,108,99,117,108,97,116,101,32,116,104,101,32,112,111,115,105,116,105,111,110,32,111,102,32,116,104,101,32,112,111,105,110,116,32,111,110,32,116,104,101,32,116,101,120,116,117,114,101,10,32,32,32,32,32,32,32,32,32,32,32,32,109,101,100,105,117,109,112,32,118,101,99,50,32,116,101,120,32,61,32,118,101,99,50,40,120,95,116,101,120,95,115,116,97,114,116,32,43,32,105,32,42,32,120,95,116,101,120,95,115,116,101,112,32,42,32,115,120,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,121,95,116,101,120,95,115,116,97,114,116,32,43,32,105,32,42,32,121,95,116,101,120,95,115,116,101,112,32,42,32,115,121,41,59,10,10,32,32,32,32,32,32,32,32,32,32,32,32,47,47,32,65,99,99,117,109,117,108,97,116,101,32,116,104,101,32,99,111,108,111,114,10,32,32,32,32,32,32,32,32,32,32,32,32,99,111,108,111,114,32,43,61,32,116,101,120,116,117,114,101,50,68,40,115,97,109,112,108,101,114,44,32,116,101,120,41,59,10,32,32,32,32,32,32,32,32,125,10,32,32,32,32,125,10,10,32,32,32,32,103,108,95,70,114,97,103,67,111,108,111,114,32,61,32,99,111,108,111,114,32,47,32,114,111,117,110,100,101,100,95,98,108,117,114,95,115,105,122,101,59,10,125,10,0,118,105,101,119,95,109,111,100,101,108,0,98,108,117,114,95,115,105,122,101,0,100,105,114,0,119,105,110,100,111,119,95,115,105,122,101,0,10,117,110,105,102,111,114,109,32,109,97,116,52,32,112,118,109,59,10,10,97,116,116,114,105,98,117,116,101,32,118,101,99,50,32,112,111,115,105,116,105,111,110,59,10,97,116,116,114,105,98,117,116,101,32,102,108,111,97,116,32,97,108,112,104,97,59,10,10,118,97,114,121,105,110,103,32,102,108,111,97,116,32,111,117,116,95,97,108,112,104,97,59,10,10,118,111,105,100,32,109,97,105,110,40,118,111,105,100,41,10,123,10,32,32,32,32,111,117,116,95,97,108,112,104,97,32,61,32,97,108,112,104,97,59,10,10,32,32,32,32,118,101,99,52,32,112,111,115,32,61,32,118,101,99,52,40,112,111,115,105,116,105,111,110,44,32,48,46,48,44,32,49,46,48,41,59,10,32,32,32,32,103,108,95,80,111,115,105,116,105,111,110,32,61,32,112,118,109,32,42,32,112,111,115,59,10,125,10,0,10,117,110,105,102,111,114,109,32,109,97,116,52,32,112,118,109,59,10,117,110,105,102,111,114,109,32,118,101,99,50,32,112,48,59,10,117,110,105,102,111,114,109,32,118,101,99,50,32,112,49,59,10,117,110,105,102,111,114,109,32,118,101,99,50,32,112,50,59,10,117,110,105,102,111,114,109,32,118,101,99,50,32,112,51,59,10,117,110,105,102,111,114,109,32,102,108,111,97,116,32,97,97,95,111,102,102,115,101,116,59,10,117,110,105,102,111,114,109,32,102,108,111,97,116,32,115,116,97,114,116,95,116,104,105,99,107,110,101,115,115,59,10,117,110,105,102,111,114,109,32,102,108,111,97,116,32,101,110,100,95,116,104,105,99,107,110,101,115,115,59,10,10,97,116,116,114,105,98,117,116,101,32,102,108,111,97,116,32,116,59,10,97,116,116,114,105,98,117,116,101,32,102,108,111,97,116,32,110,111,114,109,97,108,95,100,105,114,101,99,116,105,111,110,59,10,97,116,116,114,105,98,117,116,101,32,102,108,111,97,116,32,104,97,115,95,97,97,59,10,10,118,97,114,121,105,110,103,32,102,108,111,97,116,32,111,117,116,95,97,108,112,104,97,59,10,10,118,111,105,100,32,109,97,105,110,40,118,111,105,100,41,10,123,10,32,32,32,32,111,117,116,95,97,108,112,104,97,32,61,32,49,46,48,32,45,32,115,105,103,110,40,104,97,115,95,97,97,41,59,10,10,32,32,32,32,102,108,111,97,116,32,116,116,32,61,32,116,32,42,32,116,59,10,32,32,32,32,102,108,111,97,116,32,116,116,116,32,61,32,116,116,32,42,32,116,59,10,32,32,32,32,102,108,111,97,116,32,105,116,32,61,32,49,46,48,32,45,32,116,59,10,32,32,32,32,102,108,111,97,116,32,105,116,105,116,32,61,32,105,116,32,42,32],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE+10240);allocate([105,116,59,10,32,32,32,32,102,108,111,97,116,32,105,116,105,116,105,116,32,61,32,105,116,105,116,32,42,32,105,116,59,10,10,32,32,32,32,118,101,99,50,32,112,32,61,32,105,116,105,116,105,116,32,42,32,112,48,32,43,32,51,46,48,32,42,32,105,116,105,116,32,42,32,116,32,42,32,112,49,32,43,32,51,46,48,32,42,32,105,116,32,42,32,116,116,32,42,32,112,50,32,43,32,116,116,116,32,42,32,112,51,59,10,32,32,32,32,118,101,99,50,32,116,97,110,103,101,110,116,32,61,32,51,46,48,32,42,32,105,116,105,116,32,42,32,40,112,49,32,45,32,112,48,41,32,43,32,54,46,48,32,42,32,105,116,32,42,32,116,32,42,32,40,112,50,32,45,32,112,49,41,32,43,32,51,46,48,32,42,32,116,116,32,42,32,40,112,51,32,45,32,112,50,41,59,10,32,32,32,32,118,101,99,50,32,110,111,114,109,97,108,32,61,32,110,111,114,109,97,108,105,122,101,40,118,101,99,50,40,45,116,97,110,103,101,110,116,46,121,44,32,116,97,110,103,101,110,116,46,120,41,41,59,10,32,32,32,32,102,108,111,97,116,32,116,104,105,99,107,110,101,115,115,32,61,32,109,105,120,40,115,116,97,114,116,95,116,104,105,99,107,110,101,115,115,44,32,101,110,100,95,116,104,105,99,107,110,101,115,115,44,32,116,41,59,10,10,32,32,32,32,118,101,99,52,32,112,111,115,32,61,32,118,101,99,52,40,112,32,43,32,110,111,114,109,97,108,32,42,32,110,111,114,109,97,108,95,100,105,114,101,99,116,105,111,110,32,42,32,40,116,104,105,99,107,110,101,115,115,32,47,32,50,46,48,32,43,32,115,105,103,110,40,104,97,115,95,97,97,41,32,42,32,97,97,95,111,102,102,115,101,116,41,44,32,48,46,48,44,32,49,46,48,41,59,10,32,32,32,32,103,108,95,80,111,115,105,116,105,111,110,32,61,32,112,118,109,32,42,32,112,111,115,59,10,125,10,0,112,51,0,78,50,118,101,54,111,112,101,110,103,108,49,50,82,111,117,110,100,80,114,111,103,114,97,109,69,0,78,50,118,101,54,111,112,101,110,103,108,55,80,114,111,103,114,97,109,69,0,78,50,118,101,54,111,112,101,110,103,108,49,52,79,112,101,110,71,76,80,114,111,103,114,97,109,115,69,0,78,50,118,101,54,111,112,101,110,103,108,49,53,73,79,112,101,110,71,76,80,114,111,103,114,97,109,115,69,0,10,117,110,105,102,111,114,109,32,109,97,116,52,32,112,118,109,59,10,117,110,105,102,111,114,109,32,118,101,99,50,32,112,48,59,10,117,110,105,102,111,114,109,32,118,101,99,50,32,112,49,59,10,117,110,105,102,111,114,109,32,118,101,99,50,32,112,50,59,10,117,110,105,102,111,114,109,32,102,108,111,97,116,32,97,97,95,111,102,102,115,101,116,59,10,117,110,105,102,111,114,109,32,102,108,111,97,116,32,115,116,97,114,116,95,116,104,105,99,107,110,101,115,115,59,10,117,110,105,102,111,114,109,32,102,108,111,97,116,32,101,110,100,95,116,104,105,99,107,110,101,115,115,59,10,10,97,116,116,114,105,98,117,116,101,32,102,108,111,97,116,32,116,59,10,97,116,116,114,105,98,117,116,101,32,102,108,111,97,116,32,110,111,114,109,97,108,95,100,105,114,101,99,116,105,111,110,59,10,97,116,116,114,105,98,117,116,101,32,102,108,111,97,116,32,104,97,115,95,97,97,59,10,10,118,97,114,121,105,110,103,32,102,108,111,97,116,32,111,117,116,95,97,108,112,104,97,59,10,10,118,111,105,100,32,109,97,105,110,40,118,111,105,100,41,10,123,10,32,32,32,32,111,117,116,95,97,108,112,104,97,32,61,32,49,46,48,32,45,32,115,105,103,110,40,104,97,115,95,97,97,41,59,10,10,32,32,32,32,102,108,111,97,116,32,116,116,32,61,32,116,32,42,32,116,59,10,32,32,32,32,102,108,111,97,116,32,105,116,32,61,32,49,46,48,32,45,32,116,59,10,32,32,32,32,102,108,111,97,116,32,105,116,105,116,32,61,32,105,116,32,42,32,105,116,59,10,10,32,32,32,32,118,101,99,50,32,112,32,61,32,105,116,105,116,32,42,32,112,48,32,43,32,50,46,48,32,42,32,116,32,42,32,105,116,32,42,32,112,49,32,43,32,116,116,32,42,32,112,50,59,10,32,32,32,32,118,101,99,50,32,116,97,110,103,101,110,116,32,61,32,105,116,32,42,32,40,112,49,32,45,32,112,48,41,32,43,32,116,32,42,32,40,112,50,32,45,32,112,49,41,59,10,32,32,32,32,118,101,99,50,32,110,111,114,109,97,108,32,61,32,110,111,114,109,97,108,105,122,101,40,118,101,99,50,40,45,116,97,110,103,101,110,116,46,121,44,32,116,97,110,103,101,110,116,46,120,41,41,59,10,32,32,32,32,102,108,111,97,116,32,116,104,105,99,107,110,101,115,115,32,61,32,109,105,120,40,115,116,97,114,116,95,116,104,105,99,107,110,101,115,115,44,32,101,110,100,95,116,104,105,99,107,110,101,115,115,44,32,116,41,59,10,10,32,32,32,32,118,101,99,52,32,112,111,115,32,61,32,118,101,99,52,40,112,32,43,32,110,111,114,109,97,108,32,42,32,110,111,114,109,97,108,95,100,105,114,101,99,116,105,111,110,32,42,32,40,116,104,105,99,107,110,101,115,115,32,47,32,50,46,48,32,43,32,115,105,103,110,40,104,97,115,95,97,97,41,32,42,32,97,97,95,111,102,102,115,101,116,41,44,32,48,46,48,44,32,49,46,48,41,59,10,32,32,32,32,103,108,95,80,111,115,105,116,105,111,110,32,61,32,112,118,109,32,42,32,112,111,115,59,10,125,10,0,10,35,105,102,110,100,101,102,32,71,76,95,69,83,10,35,100,101,102,105,110,101,32,104,105,103,104,112,10,35,100,101,102,105,110,101,32,109,101,100,105,117,109,112,10,35,100,101,102,105,110,101,32,108,111,119,112,10,35,101,110,100,105,102,10,10,117,110,105,102,111,114,109,32,109,101,100,105,117,109,112,32,118,101,99,52,32,99,111,108,111,114,59,10,10,118,97,114,121,105,110,103,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,111,117,116,95,97,108,112,104,97,59,10,10,118,111,105,100,32,109,97,105,110,40,118,111,105,100,41,10,123,10,32,32,32,32,103,108,95,70,114,97,103,67,111,108,111,114,32,61,32,118,101,99,52,40,99,111,108,111,114,46,120,121,122,44,32,99,111,108,111,114,46,119,32,42,32,111,117,116,95,97,108,112,104,97,41,59,10,125,10,0,112,48,0,112,49,0,112,50,0,115,116,97,114,116,95,116,104,105,99,107,110,101,115,115,0,101,110,100,95,116,104,105,99,107,110,101,115,115,0,116,0,110,111,114,109,97,108,95,100,105,114,101,99,116,105,111,110,0,104,97,115,95,97,97,0,10,35,105,102,110,100,101,102,32,71,76,95,69,83,10,35,100,101,102,105,110,101,32,104,105,103,104,112,10,35,100,101,102,105,110,101,32,109,101,100,105,117,109,112,10,35,100,101,102,105,110,101,32,108,111,119,112,10,35,101,110,100,105,102,10,10,117,110,105,102,111,114,109,32,109,97,116,52,32,112,118,109,59,10,10,97,116,116,114,105,98,117,116,101,32,118,101,99,50,32,112,111,115,105,116,105,111,110,59,10,10,118,97,114,121,105,110,103,32,118,101,99,50,32,111,117,116,95,112,111,115,105,116,105,111,110,59,10,10,118,111,105,100,32,109,97,105,110,40,118,111,105,100,41,10,123,10,32,32,32,32,111,117,116,95,112,111,115,105,116,105,111,110,32,61,32,112,111,115,105,116,105,111,110,59,10,10,32,32,32,32,118,101,99,52,32,112,111,115,32,61,32,118,101,99,52,40,112,111,115,105,116,105,111,110,44,32,48,46,48,44,32,49,46,48,41,59,10,32,32,32,32,103,108,95,80,111,115,105,116,105,111,110,32,61,32,112,118,109,32,42,32,112,111,115,59,10,125,10,0,10,35,105,102,110,100,101,102,32,71,76,95,69,83,10,35,100,101,102,105,110,101,32,104,105,103,104,112,10,35,100,101,102,105,110,101,32,109,101,100,105,117,109,112,10,35,100,101,102,105,110,101,32,108,111,119,112,10,35,101,110,100,105,102,10,10,117,110,105,102,111,114,109,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,97,97,95,111,102,102,115,101,116,59,10,117,110,105,102,111,114,109,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,114,97,100,105,117,115,59,10,117,110,105,102,111,114,109,32,109,101,100,105,117,109,112,32,118,101,99,52,32,99,111,108,111,114,59,10,117,110,105,102,111,114,109,32,109,101,100,105,117,109,112,32,118,101,99,50,32,99,101,110,116,101,114,59,10,10,118,97,114,121,105,110,103,32,109,101,100,105,117,109,112,32,118,101,99,50,32,111,117,116,95,112,111,115,105,116,105,111,110,59,10,10,118,111,105,100,32,109,97,105,110,40,118,111,105,100,41,10,123,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,100,105,115,116,32,61,32,100,105,115,116,97,110,99,101,40,99,101,110,116,101,114,44,32,111,117,116,95,112,111,115,105,116,105,111,110,41,59,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,105,110,110,101,114,95,114,97,100,105,117,115,32,61,32,114,97,100,105,117,115,59,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,111,117,116,101,114,95,114,97,100,105,117,115,32,61,32,114,97,100,105,117,115,32,43,32,97,97,95,111,102,102,115,101,116,59,10,10,32,32,32,32,103,108,95,70,114,97,103,67,111,108,111,114,32,61,32,118,101,99,52,40,99,111,108,111,114,46,120,121,122,44,32,99,108,97,109,112,40,40,100,105,115,116,32,45,32,111,117,116,101,114,95,114,97,100,105,117,115,41,32,47,32,40,105,110,110,101,114,95,114,97,100,105,117,115,32,45,32,111,117,116,101,114,95,114,97,100,105,117,115,41,44,32,48,46,48,44,32,49,46,48,41,32,42,32,99,111,108,111,114,46,119,41,59,10,125,10,0,97,97,95,111,102,102,115,101,116,0,114,97,100,105,117,115,0,99,101,110,116,101,114,0,10,117,110,105,102,111,114,109,32,109,97,116,52,32,112,114,111,106,101,99,116,105,111,110,59,10,117,110,105,102,111,114,109,32,102,108,111,97,116,32,111,102,102,115,101,116,59,10,10,97,116,116,114,105,98,117,116,101,32,118,101,99,50,32,112,111,115,105,116,105,111,110,59,10,97,116,116,114,105,98,117,116,101,32,118,101,99,50,32,111,102,102,115,101,116,95,100,105,114,59,10,10,118,97,114,121,105,110,103,32,118,101,99,50,32,111,117,116,95,112,111,115,59,10,10,118,111,105,100,32,109,97,105,110,40,118,111,105,100,41,10,123,10,32,32,32,32,118,101,99,50,32,112,111,115,105,116,105,111,110,95,119,105,116,104,95,111,102,102,115,101,116,32,61,32,112,111,115,105,116,105,111,110,32,43,32,111,102,102,115,101,116,95,100,105,114,32,42,32,111,102,102,115,101,116,59,10,32,32,32,32,111,117,116,95,112,111,115,32,61,32,112,111,115,105,116,105,111,110,95,119,105,116,104,95,111,102,102,115,101,116,59,10,10,32,32,32,32,118,101,99,52,32,112,111,115,32,61,32,118,101,99,52,40,112,111,115,105,116,105,111,110,95,119,105,116,104,95,111,102,102,115,101,116,44,32,48,46,48,44,32,49,46,48,41,59,10,32,32,32,32,103,108,95,80,111,115,105,116,105,111,110,32,61,32,112,114,111,106,101,99,116,105,111,110,32,42,32,112,111,115,59,10,125,10,0,10,35,105,102,110,100,101,102,32,71,76,95,69,83,10,35,100,101,102,105,110,101,32,104,105,103,104,112,10,35,100,101,102,105,110,101,32,109,101,100,105,117,109,112,10,35,100,101,102,105,110,101,32,108,111,119,112,10,35,101,110,100,105,102,10,10,117,110,105,102,111,114,109,32,109,101,100,105,117,109,112,32,118,101,99,50,32,111,114,105,103,105,110,59,10,117,110,105,102,111,114,109,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,100,97,115,104,95,115,105,122,101,59,10,117,110,105,102,111,114,109,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,100,97,115,104,95,115,116,101,112,59,10,10,118,97,114,121,105,110,103,32,109,101,100,105,117,109,112,32,118,101,99,50,32,111,117,116,95,112,111,115,59,10,10,118,111,105,100,32,109,97,105,110,40,118,111,105,100,41,10,123,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,116,32,61,32,109,111,100,40,40,111,117,116,95,112,111,115,46,120,32,45,32,111,114,105,103,105,110,46,120,41,32,43,32,40,111,114,105,103,105,110,46,121,32,45,32,111,117,116,95,112,111,115,46,121,41,32,43,32,100,97,115,104,95,115,116,101,112,32,43,32,48,46,53,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,50,46,48,32,42,32,100,97,115,104,95,115,105,122,101,41,59,10,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,107,32,61,32,99,108,97,109,112,40,115,105,103,110,40,100,97,115,104,95,115,105,122,101,32,45,32,116,41,44,32,48,46,48,44,32,49,46,48,41,59,10,32,32,32,32,103,108,95,70,114,97,103,67,111,108,111,114,32,61,32,118,101,99,52,40,107,44,32,107,44,32,107,44,32,49,46,48,41,59,10,125,10,0,112,114,111,106,101,99,116,105,111,110,0,111,102,102,115,101,116,0,111,114,105,103,105,110,0,100,97,115,104,95,115,105,122,101,0,100,97,115,104,95,115,116,101,112,0,111,102,102,115,101,116,95,100,105,114,0,10,35,105,102,110,100,101,102,32,71,76,95,69,83,10,35,100,101,102,105,110,101,32,104,105,103,104,112,10,35,100,101,102,105,110,101,32,109,101,100,105,117,109,112,10,35,100,101,102,105,110,101,32,108,111,119,112,10,35,101,110,100,105,102,10,10,117,110,105,102,111,114,109,32,115,97,109,112,108,101,114,50,68,32,115,97,109,112,108,101,114,59,10,117,110,105,102,111,114,109,32,109,101,100,105,117,109,112,32,118,101,99,52,32,99,111,108,111,114,59,10,10,118,97,114,121,105,110,103,32,109,101,100,105,117,109,112,32,118,101,99,50,32,111,117,116,95,116,101,120,116,117,114,101,95,99,111,111,114,100,59,10,10,118,111,105,100,32,109,97,105,110,40,118,111,105,100,41,10,123,10,32,32,32,32,109,101,100,105,117,109,112,32,102,108,111,97,116,32,97,108,112,104,97,32,61,32,116,101,120,116,117,114,101,50,68,40,115,97,109,112,108,101,114,44,32,111,117,116,95,116,101,120,116,117,114,101,95,99,111,111,114,100,41,46,97,59,10,32,32,32,32,103,108,95,70,114,97,103,67,111,108,111,114,32,61,32,118,101,99,52,40,99,111,108,111,114,46,114,103,98,44,32,99,111,108,111,114,46,97,32,42,32,97,108,112,104,97,41,59,10,125,10,0,99,111,108,111,114,0,10,117,110,105,102,111,114,109,32,109,97,116,52,32,112,118,109,59,10,10,97,116,116,114,105,98,117,116,101,32,118,101,99,50,32,112,111,115,105,116,105,111,110,59,10,97,116,116,114,105,98,117,116,101,32,118,101,99,50,32,116,101,120,116,117,114,101,95,99,111,111,114,100,59,10,10,118,97,114,121,105,110,103,32,118,101,99,50,32,111,117,116,95,116,101,120,116,117,114,101,95,99,111,111,114,100,59,10,10,118,111,105,100,32,109,97,105,110,40,118,111,105,100,41,10,123,10,32,32,32,32,111,117,116,95,116,101,120,116,117,114,101,95,99,111,111,114,100,32,61,32,116,101,120,116,117,114,101,95,99,111,111,114,100,59,10,10,32,32,32,32,118,101,99,52,32,112,111,115,32,61,32,118,101,99,52,40,112,111,115,105,116,105,111,110,44,32,48,46,48,44,32,49,46,48,41,59,10,32,32,32,32,103,108,95,80,111,115,105,116,105,111,110,32,61,32,112,118,109,32,42,32,112,111,115,59,10,125,10,0,10,35,105,102,110,100,101,102,32,71,76,95,69,83,10,35,100,101,102,105,110,101,32,104,105,103,104,112,10,35,100,101,102,105,110,101,32,109,101,100,105,117,109,112,10,35,100,101,102,105,110,101,32,108,111,119,112,10,35,101,110,100,105,102,10,10,117,110,105,102,111,114,109,32,115,97,109,112,108,101,114,50,68,32,115,97,109,112,108,101,114,59,10,10,118,97,114,121,105,110,103,32,109,101,100,105,117,109,112,32,118,101,99,50,32,111,117,116,95,116,101,120,116,117,114,101,95,99,111,111,114,100,59,10,10,118,111,105,100,32,109,97,105,110,40,118,111,105,100,41,10,123,10,32,32,32,32,103,108,95,70,114,97,103,67,111,108,111,114,32,61,32,116,101,120,116,117,114,101,50,68,40,115,97,109,112,108,101,114,44,32,111,117,116,95,116,101,120,116,117,114,101,95,99,111,111,114,100,41,59,10,125,10,0,112,118,109,0,112,111,115,105,116,105,111,110,0,116,101,120,116,117,114,101,95,99,111,111,114,100,0,39,98,117,102,102,101,114,32,100,97,116,97,39,0,39,98,105,110,100,32,98,117,102,102,101,114,39,0,30,31,21,18,19,10,11,8,2,3,4,14,17,16,25,24,27,33,1,2,7,8,4,5,14,13,20,19,9,10,15,16,26,25,22,21,32,31,27,28,33,34,3,2,1,0,5,4,30,31,32,35,34,33,18,19,20,23,22,21,24,25,26,29,28,27,11,10,9,6,7,8,17,14,13,12,15,16,0,1,2,3,4,5,6,0,1,2,3,4,5,6,7,8,0,9,6,1,10,7,11,2,17,0,15,3,19,7,2,5,0,8,4,7,12,5,10,9,13,12,17,10,15,14,18,0,3,4,1,6,8,9,5,13,10,11,14,15,19,18,16,0,1,2,3,4,5,6,7,0,1,78,50,118,101,54,111,112,101,110,103,108,56,66,108,101,110,100,105,110,103,69,0,78,50,118,101,54,111,112,101,110,103,108,57,73,66,108,101,110,100,105,110,103,69,0,78,50,118,101,54,111,112,101,110,103,108,49,52,69,120,112,111,114,116,77,101,97,115,117,114,101,115,69,0,78,50,118,101,54,111,112,101,110,103,108,49,55,79,112,101,110,71,76,69,110,118,105,114,111,110,109,101,110,116,69,0,78,50,118,101,54,111,112,101,110,103,108,49,56,73,79,112,101,110,71,76,69,110,118,105,114,111,110,109,101,110,116,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,54,111,112,101,110,103,108,49,49,69,109,112,116,121,79,112,101,110,71,76,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,54,111,112,101,110,103,108,49,49,69,109,112,116,121,79,112,101,110,71,76,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,51,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,51,95,69,69,69,69,0,78,50,118,101,54,111,112,101,110,103,108,49,49,69,109,112,116,121,79,112,101,110,71,76,69,0,78,50,118,101,54,111,112,101,110,103,108,55,73,79,112,101,110,71,76,69,0,78,50,118,101,54,111,112,101,110,103,108,50,49,79,112,101,110,71,76,82,101,110,100,101,114,105,110,103,69,110,103,105,110,101,69,0,78,50,118,101,49,54,73,82,101,110,100,101,114,105,110,103,69,110,103,105,110,101,69,0,78,50,118,101,49,56,73,67,117,114,115,111,114,80,111,115,105,116,105,111,110,105,110,103,69,0,90,78,50,118,101,54,111,112,101,110,103,108,50,49,79,112,101,110,71,76,82,101,110,100,101,114,105,110,103,69,110,103,105,110,101,50,51,83,117,98,115,99,114,105,98,101,84,111,79,112,101,110,71,76,69,118,101,110,116,115,69,118,69,51,36,95,49,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,102,117,110,99,73,90,78,50,118,101,54,111,112,101,110,103,108,50,49,79,112,101,110,71,76,82,101,110,100,101,114,105,110,103,69,110,103,105,110,101,50,51,83,117,98,115,99,114,105,98,101,84,111,79,112,101,110,71,76,69,118,101,110,116,115,69,118,69,51,36,95,49,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,53,95,69,69,70,118,82,75,78,83,51,95,50,51,68,101,102,97,117,108,116,66,117,102,102,101,114,80,97,114,97,109,101,116,101,114,115,69,82,75,78,83,50,95,49,48,79,117,116,112,117,116,83,105,122,101,69,82,98,69,69,69,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,98,97,115,101,73,70,118,82,75,78,50,118,101,54,111,112,101,110,103,108,50,51,68,101,102,97,117,108,116,66,117,102,102,101,114,80,97,114,97,109,101,116,101,114,115,69,82,75,78,83,50,95,49,48,79,117,116,112,117,116,83,105,122,101,69,82,98,69,69,69,0,90,78,50,118,101,54,111,112,101,110,103,108,50,49,79,112,101,110,71,76,82,101,110,100,101,114,105,110,103,69,110,103,105,110,101,50,51,83,117,98,115,99,114,105,98,101,84,111,79,112,101,110,71,76,69,118,101,110,116,115,69,118,69,51,36,95,48,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,102,117,110,99,73,90,78,50,118,101,54,111,112,101,110,103,108,50,49,79,112,101,110,71,76,82,101,110,100,101,114,105,110,103,69,110,103,105,110,101,50,51,83,117,98,115,99,114,105,98,101,84,111,79,112,101,110,71,76,69,118,101,110,116,115,69,118,69,51,36,95,48,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,53,95,69,69,70,118,118,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,54,111,112,101,110,103,108,57,82,101,110,100,101,114,101,114,115,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,54,111,112,101,110,103,108,57,82,101,110,100,101,114,101,114,115,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,51,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,51,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,54,111,112,101,110,103,108,49,52,79,112,101,110,71,76,80,114,111,103,114,97,109,115,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,54,111,112,101,110,103,108,49,52,79,112,101,110,71,76,80,114,111,103,114,97,109,115,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,51,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,51,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,54,111,112,101,110,103,108,49,51,79,112,101,110,71,76,66,117,102,102,101,114,115,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,54,111,112,101,110,103,108,49,51,79,112,101,110,71,76,66,117,102,102,101,114,115,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,51,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,51,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,54,111,112,101,110,103,108,49,55,79,112,101,110,71,76,69,110,118,105,114,111,110,109,101,110,116,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,54,111,112,101,110,103,108,49,55,79,112,101,110,71,76,69,110,118,105,114,111,110,109,101,110,116,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,51,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,51,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,54,111,112,101,110,103,108,50,49,79,112,101,110,71,76,82,101,110,100,101,114,105,110,103,69,110,103,105,110,101,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,54,111,112,101,110,103,108,50,49,79,112,101,110,71,76,82,101,110,100,101,114,105,110,103,69,110,103,105,110,101,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,51,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,51,95,69,69,69,69,0,78,50,118,101,53,83,99,101,110,101,69,0,78,50,118,101,54,73,83,99,101,110,101,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,53,83,99,101,110,101,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,53,83,99,101,110,101,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,49,48,73,109,97,103,101,77,111,100,101,108,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,49,48,73,109,97,103,101,77,111,100,101,108,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,86,101,67,111,108,111,114,0,114,101,100,0,103,114,101,101,110,0,98,108,117,101,0,86,101,67,111,108,111,114,87,105,116,104,65,108,112,104,97,0,97,108,112,104,97,0,86,101,80,111,105,110,116,0,120,0,121,0,86,101,83,105,122,101,0,119,105,100,116,104,0,104,101,105,103,104,116,0,86,101,87,105,110,100,111,119,83,105,122,101,0,115,99,114,101,101,110,83,99,97,108,101,70,97,99,116,111,114,0,86,101,84,111,111,108,0,76,105,110,101,0,66,108,117,114,0,65,114,114,111,119,0,66,114,117,115,104,0,79,118,97,108,0,82,101,99,116,97,110,103,108,101,0,84,101,120,116,0,77,111,118,101,0,86,101,84,101,120,116,68,105,114,101,99,116,105,111,110,0,76,101,102,116,84,111,82,105,103,104,116,0,82,105,103,104,116,84,111,76,101,102,116,0,86,101,84,101,120,116,73,110,112,117,116,67,111,109,109,97,110,100,0,67,111,109,112,108,101,116,101,73,110,112,117,116,0,78,101,119,76,105,110,101,0,66,97,99,107,115,112,97,99,101,0,68,101,108,101,116,101,0,77,111,118,101,67,117,114,115,111,114,76,101,102,116,0,77,111,118,101,67,117,114,115,111,114,82,105,103,104,116,0,77,111,118,101,67,117,114,115,111,114,85,112,0,77,111,118,101,67,117,114,115,111,114,68,111,119,110,0,86,101,73,110,105,116,105,97,108,80,97,114,97,109,101,116,101,114,115,0,115,104,97,112,101,67,111,108,111,114,0,108,105,110,101,87,105,100,116,104,0,97,100,100,83,104,97,100,111,119,0,116,111,111,108,0,119,105,110,100,111,119,83,105,122,101,0,98,97,99,107,103,114,111,117,110,100,67,111,108,111,114,0,98,97,99,107,66,105,116,109,97,112,85,117,105,100,0,98,97,99,107,66,105,116,109,97,112,83,105,122,101,0,98,97,115,101,84,101,120,116,68,105,114,101,99,116,105,111,110,0,105,105,0,118,0,86,101,69,110,103,105,110,101,0,118,105,0,99,114,101,97,116,101,0,105,105,105,105,0,105,105,105,0,115,101,116,84,111,111,108,0,115,101,116,76,105,110,101,87,105,100,116,104,0,115,101,116,67,111,108,111,114,0,105,105,105,105,102,0,115,101,116,72,111,114,105,122,111,110,116,97,108,80,111,115,105,116,105,111,110,0,105,105,105,102,0,115,101,116,86,101,114,116,105,99,97,108,80,111,115,105,116,105,111,110,0,99,108,105,99,107,79,110,99,101,0,100,114,97,103,83,116,97,114,116,0,100,114,97,103,77,111,118,101,0,100,114,97,103,69,110,100,0,100,114,97,103,76,111,115,116,0,97,100,100,67,104,97,114,97,99,116,101,114,0,116,101,120,116,67,111,109,109,97,110,100,0,101,120,112,111,114,116,73,109,97,103,101,0,99,111,110,116,101,120,116,76,111,115,116,0,99,111,110,116,101,120,116,82,101,115,116,111,114,101,100,0,116,105,109,101,114,84,105,99,107,0,102,97,105,108,117,114,101,82,101,97,115,111,110,0,78,83,116,51,95,95,50,49,50,98,97,115,105,99,95,115,116,114,105,110,103,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,99,69,69,69,69,0,78,83,116,51,95,95,50,50,49,95,95,98,97,115,105,99,95,115,116,114,105,110,103,95,99,111,109,109,111,110,73,76,98,49,69,69,69,0,78,52,109,101,106,115,53,80,111,105,110,116,69,0,78,52,109,101,106,115,49,48,87,105,110,100,111,119,83,105,122,101,69,0,78,52,109,101,106,115,53,67,111,108,111,114,69,0,78,52,109,101,106,115,49,55,73,110,105,116,105,97,108,80,97,114,97,109,101,116,101,114,115,69,0,80,75,78,52,109,101,106,115,56,86,101,69,110,103,105,110,101,69,0,80,78,52,109,101,106,115,56,86,101,69,110,103,105,110,101,69,0,78,52,109,101,106,115,56,86,101,69,110,103,105,110,101,69,0,118,105,105,105,0,78,52,109,101,106,115,52,83,105,122,101,69,0,78,52,109,101,106,115,49,52,67,111,108,111,114,87,105,116,104,65,108,112,104,97,69,0,105,0,78,50,118,101,49,54,84,101,120,116,73,110,112,117,116,67,111,109,109,97,110,100,69,0,78,50,118,101,49,51,84,101,120,116,68,105,114,101,99,116,105,111,110,69,0,78,50,118,101,52,84,111,111,108,69,0,102,105,105,0,118,105,105,102,0,123,32,77,111,100,117,108,101,46,98,105,116,109,97,112,69,120,112,111,114,116,101,114,46,112,117,116,73,109,97,103,101,80,97,114,116,40,36,48,44,32,36,49,44,32,36,50,44,32,36,51,44,32,36,52,44,32,36,53,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,69,120,112,111,114,116,101,114,46,112,114,101,112,97,114,101,40,36,48,44,32,36,49,41,59,32,125,0,78,52,109,101,106,115,49,52,66,105,116,109,97,112,69,120,112,111,114,116,101,114,69,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,103,101,116,66,105,116,109,97,112,73,110,100,101,120,40,80,111,105,110,116,101,114,95,115,116,114,105,110,103,105,102,121,40,36,48,41,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,103,101,116,78,117,109,98,101,114,79,102,70,114,97,103,109,101,110,116,115,40,36,48,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,113,117,101,114,121,70,114,97,103,109,101,110,116,67,111,111,114,100,105,110,97,116,101,115,40,36,48,44,32,36,49,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,103,101,116,88,40,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,103,101,116,89,40,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,103,101,116,87,105,100,116,104,40,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,103,101,116,72,101,105,103,104,116,40,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,103,101,116,85,84,111,112,76,101,102,116,40,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,103,101,116,86,84,111,112,76,101,102,116,40,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,103,101,116,85,66,111,116,116,111,109,82,105,103,104,116,40,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,103,101,116,86,66,111,116,116,111,109,82,105,103,104,116,40,41,59,32,125,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,52,109,101,106,115,49,52,66,105,116,109,97,112,70,114,97,103,109,101,110,116,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,52,109,101,106,115,49,52,66,105,116,109,97,112,70,114,97,103,109,101,110,116,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,98,105,110,100,40,36,48,44,32,36,49,41,59,32,125,0,78,52,109,101,106,115,49,52,66,105,116,109,97,112,70,114,97,103,109,101,110,116,69,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,103,101,116,66,105,116,109,97,112,87,105,100,116,104,40,36,48,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,103,101,116,66,105,116,109,97,112,72,101,105,103,104,116,40,36,48,41,59,32,125,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,52,109,101,106,115,54,66,105,116,109,97,112,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,52,109,101,106,115,54,66,105,116,109,97,112,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,52,109,101,106,115,54,66,105,116,109,97,112,69,0,123,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,104,97,110,100,108,101,67,111,110,116,101,120,116,82,101,115,116,111,114,101,100,40,41,59,32,125,0,123,32,77,111,100,117,108,101,46,98,105,116,109,97,112,80,114,111,118,105,100,101,114,46,104,97,110,100,108,101,67,111,110,116,101,120,116,76,111,115,116,40,41,59,32,125,0,78,52,109,101,106,115,49,52,66,105,116,109,97,112,80,114,111,118,105,100,101,114,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,52,109,101,106,115,55,84,121,112,101,115,101,116,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,52,109,101,106,115,55,84,121,112,101,115,101,116,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,123,32,77,111,100,117,108,101,46,98,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,46,104,97,110,100,108,101,67,111,110,116,101,120,116,82,101,115,116,111,114,101,100,40,41,59,32,125,0,123,32,77,111,100,117,108,101,46,98,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,46,104,97,110,100,108,101,67,111,110,116,101,120,116,76,111,115,116,40,41,59,32,125,0,78,52,109,101,106,115,49,55,66,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,69,0,78,50,118,101,54,111,112,101,110,103,108,49,49,73,84,121,112,101,115,101,116,116,101,114,69,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,116,105,109,101,114,70,97,99,116,111,114,121,46,99,114,101,97,116,101,84,105,109,101,114,40,41,59,32,125,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,52,109,101,106,115,53,84,105,109,101,114,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,52,109,101,106,115,53,84,105,109,101,114,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,123,32,77,111,100,117,108,101,46,116,105,109,101,114,70,97,99,116,111,114,121,46,115,116,111,112,84,105,109,101,114,40,36,48,41,59,32,125,0,123,32,77,111,100,117,108,101,46,116,105,109,101,114,70,97,99,116,111,114,121,46,115,116,97,114,116,84,105,109,101,114,40,36,48,44,32,36,49,41,59,32,125,0,78,52,109,101,106,115,53,84,105,109,101,114,69,0,78,50,118,101,54,73,84,105,109,101,114,69,0,78,52,109,101,106,115,49,50,84,105,109,101,114,70,97,99,116,111,114,121,69,0,78,50,118,101,49,51,73,84,105,109,101,114,70,97,99,116,111,114,121,69,0,123,32,77,111,100,117,108,101,46,98,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,46,100,101,108,101,116,101,84,121,112,101,115,101,116,40,36,48,41,59,32,125,0,78,52,109,101,106,115,55,84,121,112,101,115,101,116,69,0,78,50,118,101,54,111,112,101,110,103,108,56,73,84,121,112,101,115,101,116,69,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,46,99,114,101,97,116,101,84,121,112,101,115,101,116,40,41,59,32,125,0,123,32,99,111,110,115,116,32,116,121,112,101,115,101,116,32,61,32,77,111,100,117,108,101,46,98,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,46,103,101,116,84,121,112,101,115,101,116,40,36,48,41,59,32,105,102,32,40,33,116,121,112,101,115,101,116,41,32,123,32,114,101,116,117,114,110,32,102,97,108,115,101,59,32,125,32,114,101,116,117,114,110,32,116,121,112,101,115,101,116,46,117,112,100,97,116,101,40,85,84,70,51,50,84,111,83,116,114,105,110,103,40,36,49,41,44,32,36,50,44,32,40,36,51,32,61,61,61,32,48,41,32,63,32,39,108,116,114,39,32,58,32,39,114,116,108,39,44,32,36,52,44,32,36,53,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,46,103,101,116,84,121,112,101,115,101,116,40,36,48,41,46,103,101,116,76,105,110,101,72,101,105,103,104,116,40,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,46,103,101,116,84,121,112,101,115,101,116,40,36,48,41,46,103,101,116,68,101,115,99,101,110,116,40,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,46,103,101,116,84,121,112,101,115,101,116,40,36,48,41,46,103,101,116,70,114,97,103,109,101,110,116,67,111,117,110,116,40,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,46,103,101,116,84,121,112,101,115,101,116,40,36,48,41,46,103,101,116,88,66,97,115,101,40,36,49,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,46,103,101,116,84,121,112,101,115,101,116,40,36,48,41,46,103,101,116,89,66,97,115,101,40,36,49,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,46,103,101,116,84,121,112,101,115,101,116,40,36,48,41,46,103,101,116,88,79,112,112,111,115,105,116,101,40,36,49,41,59,32,125,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,98,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,46,103,101,116,84,121,112,101,115,101,116,40,36,48,41,46,103,101,116,89,79,112,112,111,115,105,116,101,40,36,49,41,59,32,125,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,52,109,101,106,115,49,50,84,101,120,116,70,114,97,103,109,101,110,116,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,52,109,101,106,115,49,50,84,101,120,116,70,114,97,103,109,101,110,116,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,123,32,99,111,110,115,116,32,116,121,112,101,115,101,116,32,61,32,77,111,100,117,108,101,46,98,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,46,103,101,116,84,121,112,101,115,101,116,40,36,48,41,59,32,105,102,32,40,33,116,121,112,101],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE+20480);allocate([115,101,116,41,32,123,32,114,101,116,117,114,110,32,102,97,108,115,101,59,32,125,32,105,102,32,40,36,50,41,32,123,32,114,101,116,117,114,110,32,116,121,112,101,115,101,116,46,98,105,110,100,83,116,114,111,107,101,40,36,49,41,59,32,125,32,101,108,115,101,32,123,32,114,101,116,117,114,110,32,116,121,112,101,115,101,116,46,98,105,110,100,78,111,114,109,97,108,40,36,49,41,59,32,125,32,125,0,78,52,109,101,106,115,49,50,84,101,120,116,70,114,97,103,109,101,110,116,69,0,78,50,118,101,54,111,112,101,110,103,108,49,51,73,84,101,120,116,70,114,97,103,109,101,110,116,69,0,78,52,109,101,106,115,49,51,85,117,105,100,71,101,110,101,114,97,116,111,114,69,0,78,50,118,101,49,52,73,85,117,105,100,71,101,110,101,114,97,116,111,114,69,0,123,32,77,111,100,117,108,101,46,104,97,110,100,108,101,83,99,114,111,108,108,67,104,97,110,103,101,100,40,36,48,44,32,36,49,44,32,36,50,44,32,36,51,44,32,36,52,44,32,36,53,41,59,32,125,0,90,78,52,109,101,106,115,56,86,101,69,110,103,105,110,101,50,54,83,117,98,115,99,114,105,98,101,84,111,69,100,105,116,111,114,67,97,108,108,98,97,99,107,115,69,118,69,51,36,95,52,0,123,32,77,111,100,117,108,101,46,104,97,110,100,108,101,84,101,120,116,73,110,112,117,116,69,110,100,101,100,40,41,59,32,125,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,102,117,110,99,73,90,78,52,109,101,106,115,56,86,101,69,110,103,105,110,101,50,54,83,117,98,115,99,114,105,98,101,84,111,69,100,105,116,111,114,67,97,108,108,98,97,99,107,115,69,118,69,51,36,95,52,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,52,95,69,69,70,118,118,69,69,69,0,90,78,52,109,101,106,115,56,86,101,69,110,103,105,110,101,50,54,83,117,98,115,99,114,105,98,101,84,111,69,100,105,116,111,114,67,97,108,108,98,97,99,107,115,69,118,69,51,36,95,51,0,123,32,77,111,100,117,108,101,46,104,97,110,100,108,101,84,101,120,116,73,110,112,117,116,83,116,97,114,116,101,100,40,41,59,32,125,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,102,117,110,99,73,90,78,52,109,101,106,115,56,86,101,69,110,103,105,110,101,50,54,83,117,98,115,99,114,105,98,101,84,111,69,100,105,116,111,114,67,97,108,108,98,97,99,107,115,69,118,69,51,36,95,51,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,52,95,69,69,70,118,118,69,69,69,0,90,78,52,109,101,106,115,56,86,101,69,110,103,105,110,101,50,54,83,117,98,115,99,114,105,98,101,84,111,69,100,105,116,111,114,67,97,108,108,98,97,99,107,115,69,118,69,51,36,95,50,0,123,32,77,111,100,117,108,101,46,104,97,110,100,108,101,83,104,97,112,101,80,97,114,97,109,101,116,101,114,115,67,104,97,110,103,101,100,40,36,48,44,32,36,49,44,32,36,50,44,32,36,51,44,32,36,52,41,59,32,125,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,102,117,110,99,73,90,78,52,109,101,106,115,56,86,101,69,110,103,105,110,101,50,54,83,117,98,115,99,114,105,98,101,84,111,69,100,105,116,111,114,67,97,108,108,98,97,99,107,115,69,118,69,51,36,95,50,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,52,95,69,69,70,118,118,69,69,69,0,90,78,52,109,101,106,115,56,86,101,69,110,103,105,110,101,50,54,83,117,98,115,99,114,105,98,101,84,111,69,100,105,116,111,114,67,97,108,108,98,97,99,107,115,69,118,69,51,36,95,49,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,102,117,110,99,73,90,78,52,109,101,106,115,56,86,101,69,110,103,105,110,101,50,54,83,117,98,115,99,114,105,98,101,84,111,69,100,105,116,111,114,67,97,108,108,98,97,99,107,115,69,118,69,51,36,95,49,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,52,95,69,69,70,118,118,69,69,69,0,90,78,52,109,101,106,115,56,86,101,69,110,103,105,110,101,50,54,83,117,98,115,99,114,105,98,101,84,111,69,100,105,116,111,114,67,97,108,108,98,97,99,107,115,69,118,69,51,36,95,48,0,78,83,116,51,95,95,50,49,48,95,95,102,117,110,99,116,105,111,110,54,95,95,102,117,110,99,73,90,78,52,109,101,106,115,56,86,101,69,110,103,105,110,101,50,54,83,117,98,115,99,114,105,98,101,84,111,69,100,105,116,111,114,67,97,108,108,98,97,99,107,115,69,118,69,51,36,95,48,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,52,95,69,69,70,118,118,69,69,69,0,67,97,110,39,116,32,99,114,101,97,116,101,32,116,104,101,32,101,100,105,116,111,114,46,32,82,101,115,117,108,116,58,32,0,84,104,101,32,99,114,101,97,116,101,100,32,101,100,105,116,111,114,32,105,115,32,110,117,108,108,112,116,114,0,84,104,101,32,99,114,101,97,116,101,100,32,116,105,109,101,114,32,102,97,99,116,111,114,121,32,105,115,32,110,117,108,108,112,116,114,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,52,109,101,106,115,49,50,84,105,109,101,114,70,97,99,116,111,114,121,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,52,109,101,106,115,49,50,84,105,109,101,114,70,97,99,116,111,114,121,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,84,104,101,32,99,114,101,97,116,101,100,32,79,112,101,110,71,76,32,105,109,112,108,101,109,101,110,116,97,116,105,111,110,32,105,115,32,110,117,108,108,112,116,114,0,84,104,101,32,99,114,101,97,116,101,100,32,98,105,116,109,97,112,32,112,114,111,118,105,100,101,114,32,105,115,32,110,117,108,108,112,116,114,0,84,104,101,32,99,114,101,97,116,101,100,32,116,121,112,101,115,101,116,116,101,114,32,105,115,32,110,117,108,108,112,116,114,0,67,97,110,39,116,32,99,114,101,97,116,101,32,114,101,110,100,101,114,105,110,103,32,101,110,103,105,110,101,46,32,82,101,115,117,108,116,58,32,0,84,104,101,32,99,114,101,97,116,101,100,32,114,101,110,100,101,114,105,110,103,32,101,110,103,105,110,101,32,105,115,32,110,117,108,108,112,116,114,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,52,109,101,106,115,49,55,66,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,52,109,101,106,115,49,55,66,114,111,119,115,101,114,84,121,112,101,115,101,116,116,101,114,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,52,109,101,106,115,49,52,66,105,116,109,97,112,80,114,111,118,105,100,101,114,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,52,109,101,106,115,49,52,66,105,116,109,97,112,80,114,111,118,105,100,101,114,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,50,118,101,54,111,112,101,110,103,108,49,52,83,116,97,110,100,97,114,100,79,112,101,110,71,76,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,50,118,101,54,111,112,101,110,103,108,49,52,83,116,97,110,100,97,114,100,79,112,101,110,71,76,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,51,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,51,95,69,69,69,69,0,78,50,118,101,54,111,112,101,110,103,108,49,52,83,116,97,110,100,97,114,100,79,112,101,110,71,76,69,0,67,97,110,39,116,32,99,114,101,97,116,101,32,116,104,101,32,115,99,101,110,101,46,32,82,101,115,117,108,116,58,32,0,84,104,101,32,99,114,101,97,116,101,100,32,115,99,101,110,101,32,105,115,32,110,117,108,108,112,116,114,0,84,104,101,32,99,114,101,97,116,101,100,32,85,85,73,68,32,103,101,110,101,114,97,116,111,114,32,105,115,32,110,117,108,108,112,116,114,0,84,104,101,32,85,85,73,68,32,103,101,110,101,114,97,116,111,114,32,99,114,101,97,116,101,100,32,116,119,111,32,101,113,117,97,108,32,85,85,73,68,115,58,32,39,0,39,32,97,110,100,32,39,0,39,0,78,83,116,51,95,95,50,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,78,52,109,101,106,115,49,51,85,117,105,100,71,101,110,101,114,97,116,111,114,69,69,69,0,78,83,116,51,95,95,50,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,112,111,105,110,116,101,114,73,80,78,52,109,101,106,115,49,51,85,117,105,100,71,101,110,101,114,97,116,111,114,69,78,83,95,49,52,100,101,102,97,117,108,116,95,100,101,108,101,116,101,73,83,50,95,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,50,95,69,69,69,69,0,114,101,110,100,101,114,0,84,104,101,32,101,100,105,116,111,114,32,105,115,32,110,117,108,108,112,116,114,0,69,114,114,111,114,32,91,114,101,115,117,108,116,32,0,93,32,111,99,99,117,114,114,101,100,32,119,104,101,110,32,112,101,114,102,111,114,109,105,110,103,32,116,104,101,32,97,99,116,105,111,110,32,39,0,115,101,116,32,116,111,111,108,0,115,101,116,32,108,105,110,101,32,119,105,100,116,104,0,115,101,116,32,115,104,97,112,101,32,99,111,108,111,114,0,114,101,115,105,122,101,0,114,101,115,99,97,108,101,0,115,101,116,32,120,32,112,111,115,105,116,105,111,110,0,115,101,116,32,121,32,112,111,115,105,116,105,111,110,0,111,110,101,32,99,108,105,99,107,0,100,114,97,103,32,115,116,97,114,116,0,100,114,97,103,32,109,111,118,101,0,100,114,97,103,32,101,110,100,0,100,114,97,103,32,108,111,115,116,0,97,100,100,32,99,104,97,114,97,99,116,101,114,0,116,101,120,116,32,105,110,112,117,116,32,99,111,109,109,97,110,100,0,67,97,110,39,116,32,101,120,112,111,114,116,32,116,104,101,32,105,109,97,103,101,46,32,82,101,115,117,108,116,58,32,0,103,108,95,32,105,115,32,110,117,108,108,112,116,114,0,84,104,101,32,99,111,110,116,101,120,116,32,105,115,32,110,111,116,32,114,101,115,116,111,114,101,100,0,84,105,109,101,114,32,102,97,99,116,111,114,121,32,105,115,32,110,117,108,108,112,116,114,0,118,111,105,100,0,98,111,111,108,0,99,104,97,114,0,115,105,103,110,101,100,32,99,104,97,114,0,117,110,115,105,103,110,101,100,32,99,104,97,114,0,115,104,111,114,116,0,117,110,115,105,103,110,101,100,32,115,104,111,114,116,0,105,110,116,0,117,110,115,105,103,110,101,100,32,105,110,116,0,108,111,110,103,0,117,110,115,105,103,110,101,100,32,108,111,110,103,0,102,108,111,97,116,0,100,111,117,98,108,101,0,115,116,100,58,58,115,116,114,105,110,103,0,115,116,100,58,58,98,97,115,105,99,95,115,116,114,105,110,103,60,117,110,115,105,103,110,101,100,32,99,104,97,114,62,0,115,116,100,58,58,119,115,116,114,105,110,103,0,101,109,115,99,114,105,112,116,101,110,58,58,118,97,108,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,99,104,97,114,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,115,105,103,110,101,100,32,99,104,97,114,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,110,115,105,103,110,101,100,32,99,104,97,114,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,115,104,111,114,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,110,115,105,103,110,101,100,32,115,104,111,114,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,105,110,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,110,115,105,103,110,101,100,32,105,110,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,108,111,110,103,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,110,115,105,103,110,101,100,32,108,111,110,103,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,105,110,116,56,95,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,105,110,116,56,95,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,105,110,116,49,54,95,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,105,110,116,49,54,95,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,105,110,116,51,50,95,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,105,110,116,51,50,95,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,102,108,111,97,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,100,111,117,98,108,101,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,108,111,110,103,32,100,111,117,98,108,101,62,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,101,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,100,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,102,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,109,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,108,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,106,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,105,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,116,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,115,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,104,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,97,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,99,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,51,118,97,108,69,0,78,83,116,51,95,95,50,49,50,98,97,115,105,99,95,115,116,114,105,110,103,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,119,69,69,69,69,0,78,83,116,51,95,95,50,49,50,98,97,115,105,99,95,115,116,114,105,110,103,73,104,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,104,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,104,69,69,69,69,0,17,0,10,0,17,17,17,0,0,0,0,5,0,0,0,0,0,0,9,0,0,0,0,11,0,0,0,0,0,0,0,0,17,0,15,10,17,17,17,3,10,7,0,1,19,9,11,11,0,0,9,6,11,0,0,11,0,6,17,0,0,0,17,17,17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,17,0,10,10,17,17,17,0,10,0,0,2,0,9,11,0,0,0,9,0,11,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,12,0,0,0,0,9,12,0,0,0,0,0,12,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,0,0,0,0,0,0,0,0,0,0,0,13,0,0,0,4,13,0,0,0,0,9,14,0,0,0,0,0,14,0,0,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,0,15,0,0,0,0,9,16,0,0,0,0,0,16,0,0,16,0,0,18,0,0,0,18,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,18,0,0,0,18,18,18,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,10,0,0,0,0,9,11,0,0,0,0,0,11,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,12,0,0,0,0,9,12,0,0,0,0,0,12,0,0,12,0,0,48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70,45,43,32,32,32,48,88,48,120,0,40,110,117,108,108,41,0,45,48,88,43,48,88,32,48,88,45,48,120,43,48,120,32,48,120,0,105,110,102,0,73,78,70,0,110,97,110,0,78,65,78,0,46,0,84,33,34,25,13,1,2,3,17,75,28,12,16,4,11,29,18,30,39,104,110,111,112,113,98,32,5,6,15,19,20,21,26,8,22,7,40,36,23,24,9,10,14,27,31,37,35,131,130,125,38,42,43,60,61,62,63,67,71,74,77,88,89,90,91,92,93,94,95,96,97,99,100,101,102,103,105,106,107,108,114,115,116,121,122,123,124,0,73,108,108,101,103,97,108,32,98,121,116,101,32,115,101,113,117,101,110,99,101,0,68,111,109,97,105,110,32,101,114,114,111,114,0,82,101,115,117,108,116,32,110,111,116,32,114,101,112,114,101,115,101,110,116,97,98,108,101,0,78,111,116,32,97,32,116,116,121,0,80,101,114,109,105,115,115,105,111,110,32,100,101,110,105,101,100,0,79,112,101,114,97,116,105,111,110,32,110,111,116,32,112,101,114,109,105,116,116,101,100,0,78,111,32,115,117,99,104,32,102,105,108,101,32,111,114,32,100,105,114,101,99,116,111,114,121,0,78,111,32,115,117,99,104,32,112,114,111,99,101,115,115,0,70,105,108,101,32,101,120,105,115,116,115,0,86,97,108,117,101,32,116,111,111,32,108,97,114,103,101,32,102,111,114,32,100,97,116,97,32,116,121,112,101,0,78,111,32,115,112,97,99,101,32,108,101,102,116,32,111,110,32,100,101,118,105,99,101,0,79,117,116,32,111,102,32,109,101,109,111,114,121,0,82,101,115,111,117,114,99,101,32,98,117,115,121,0,73,110,116,101,114,114,117,112,116,101,100,32,115,121,115,116,101,109,32,99,97,108,108,0,82,101,115,111,117,114,99,101,32,116,101,109,112,111,114,97,114,105,108,121,32,117,110,97,118,97,105,108,97,98,108,101,0,73,110,118,97,108,105,100,32,115,101,101,107,0,67,114,111,115,115,45,100,101,118,105,99,101,32,108,105,110,107,0,82,101,97,100,45,111,110,108,121,32,102,105,108,101,32,115,121,115,116,101,109,0,68,105,114,101,99,116,111,114,121,32,110,111,116,32,101,109,112,116,121,0,67,111,110,110,101,99,116,105,111,110,32,114,101,115,101,116,32,98,121,32,112,101,101,114,0,79,112,101,114,97,116,105,111,110,32,116,105,109,101,100,32,111,117,116,0,67,111,110,110,101,99,116,105,111,110,32,114,101,102,117,115,101,100,0,72,111,115,116,32,105,115,32,100,111,119,110,0,72,111,115,116,32,105,115,32,117,110,114,101,97,99,104,97,98,108,101,0,65,100,100,114,101,115,115,32,105,110,32,117,115,101,0,66,114,111,107,101,110,32,112,105,112,101,0,73,47,79,32,101,114,114,111,114,0,78,111,32,115,117,99,104,32,100,101,118,105,99,101,32,111,114,32,97,100,100,114,101,115,115,0,66,108,111,99,107,32,100,101,118,105,99,101,32,114,101,113,117,105,114,101,100,0,78,111,32,115,117,99,104,32,100,101,118,105,99,101,0,78,111,116,32,97,32,100,105,114,101,99,116,111,114,121,0,73,115,32,97,32,100,105,114,101,99,116,111,114,121,0,84,101,120,116,32,102,105,108,101,32,98,117,115,121,0,69,120,101,99,32,102,111,114,109,97,116,32,101,114,114,111,114,0,73,110,118,97,108,105,100,32,97,114,103,117,109,101,110,116,0,65,114,103,117,109,101,110,116,32,108,105,115,116,32,116,111,111,32,108,111,110,103,0,83,121,109,98,111,108,105,99,32,108,105,110,107,32,108,111,111,112,0,70,105,108,101,110,97,109,101,32,116,111,111,32,108,111,110,103,0,84,111,111,32,109,97,110,121,32,111,112,101,110,32,102,105,108,101,115,32,105,110,32,115,121,115,116,101,109,0,78,111,32,102,105,108,101,32,100,101,115,99,114,105,112,116,111,114,115,32,97,118,97,105,108,97,98,108,101,0,66,97,100,32,102,105,108,101,32,100,101,115,99,114,105,112,116,111,114,0,78,111,32,99,104,105,108,100,32,112,114,111,99,101,115,115,0,66,97,100,32,97,100,100,114,101,115,115,0,70,105,108,101,32,116,111,111,32,108,97,114,103,101,0,84,111,111,32,109,97,110,121,32,108,105,110,107,115,0,78,111,32,108,111,99,107,115,32,97,118,97,105,108,97,98,108,101,0,82,101,115,111,117,114,99,101,32,100,101,97,100,108,111,99,107,32,119,111,117,108,100,32,111,99,99,117,114,0,83,116,97,116,101,32,110,111,116,32,114,101,99,111,118,101,114,97,98,108,101,0,80,114,101,118,105,111,117,115,32,111,119,110,101,114,32,100,105,101,100,0,79,112,101,114,97,116,105,111,110,32,99,97,110,99,101,108,101,100,0,70,117,110,99,116,105,111,110,32,110,111,116,32,105,109,112,108,101,109,101,110,116,101,100,0,78,111,32,109,101,115,115,97,103,101,32,111,102,32,100,101,115,105,114,101,100,32,116,121,112,101,0,73,100,101,110,116,105,102,105,101,114,32,114,101,109,111,118,101,100,0,68,101,118,105,99,101,32,110,111,116,32,97,32,115,116,114,101,97,109,0,78,111,32,100,97,116,97,32,97,118,97,105,108,97,98,108,101,0,68,101,118,105,99,101,32,116,105,109,101,111,117,116,0,79,117,116,32,111,102,32,115,116,114,101,97,109,115,32,114,101,115,111,117,114,99,101,115,0,76,105,110,107,32,104,97,115,32,98,101,101,110,32,115,101,118,101,114,101,100,0,80,114,111,116,111,99,111,108,32,101,114,114,111,114,0,66,97,100,32,109,101,115,115,97,103,101,0,70,105,108,101,32,100,101,115,99,114,105,112,116,111,114,32,105,110,32,98,97,100,32,115,116,97,116,101,0,78,111,116,32,97,32,115,111,99,107,101,116,0,68,101,115,116,105,110,97,116,105,111,110,32,97,100,100,114,101,115,115,32,114,101,113,117,105,114,101,100,0,77,101,115,115,97,103,101,32,116,111,111,32,108,97,114,103,101,0,80,114,111,116,111,99,111,108,32,119,114,111,110,103,32,116,121,112,101,32,102,111,114,32,115,111,99,107,101,116,0,80,114,111,116,111,99,111,108,32,110,111,116,32,97,118,97,105,108,97,98,108,101,0,80,114,111,116,111,99,111,108,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,83,111,99,107,101,116,32,116,121,112,101,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,78,111,116,32,115,117,112,112,111,114,116,101,100,0,80,114,111,116,111,99,111,108,32,102,97,109,105,108,121,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,65,100,100,114,101,115,115,32,102,97,109,105,108,121,32,110,111,116,32,115,117,112,112,111,114,116,101,100,32,98,121,32,112,114,111,116,111,99,111,108,0,65,100,100,114,101,115,115,32,110,111,116,32,97,118,97,105,108,97,98,108,101,0,78,101,116,119,111,114,107,32,105,115,32,100,111,119,110,0,78,101,116,119,111,114,107,32,117,110,114,101,97,99,104,97,98,108,101,0,67,111,110,110,101,99,116,105,111,110,32,114,101,115,101,116,32,98,121,32,110,101,116,119,111,114,107,0,67,111,110,110,101,99,116,105,111,110,32,97,98,111,114,116,101,100,0,78,111,32,98,117,102,102,101,114,32,115,112,97,99,101,32,97,118,97,105,108,97,98,108,101,0,83,111,99,107,101,116,32,105,115,32,99,111,110,110,101,99,116,101,100,0,83,111,99,107,101,116,32,110,111,116,32,99,111,110,110,101,99,116,101,100,0,67,97,110,110,111,116,32,115,101,110,100,32,97,102,116,101,114,32,115,111,99,107,101,116,32,115,104,117,116,100,111,119,110,0,79,112,101,114,97,116,105,111,110,32,97,108,114,101,97,100,121,32,105,110,32,112,114,111,103,114,101,115,115,0,79,112,101,114,97,116,105,111,110,32,105,110,32,112,114,111,103,114,101,115,115,0,83,116,97,108,101,32,102,105,108,101,32,104,97,110,100,108,101,0,82,101,109,111,116,101,32,73,47,79,32,101,114,114,111,114,0,81,117,111,116,97,32,101,120,99,101,101,100,101,100,0,78,111,32,109,101,100,105,117,109,32,102,111,117,110,100,0,87,114,111,110,103,32,109,101,100,105,117,109,32,116,121,112,101,0,78,111,32,101,114,114,111,114,32,105,110,102,111,114,109,97,116,105,111,110,0,0,33,34,118,101,99,116,111,114,32,108,101,110,103,116,104,95,101,114,114,111,114,34,0,47,101,109,115,99,114,105,112,116,101,110,47,115,121,115,116,101,109,47,105,110,99,108,117,100,101,47,108,105,98,99,120,120,47,118,101,99,116,111,114,0,78,83,116,51,95,95,50,49,52,95,95,115,104,97,114,101,100,95,99,111,117,110,116,69,0,78,83,116,51,95,95,50,49,57,95,95,115,104,97,114,101,100,95,119,101,97,107,95,99,111,117,110,116,69,0,33,34,98,97,115,105,99,95,115,116,114,105,110,103,32,108,101,110,103,116,104,95,101,114,114,111,114,34,0,47,101,109,115,99,114,105,112,116,101,110,47,115,121,115,116,101,109,47,105,110,99,108,117,100,101,47,108,105,98,99,120,120,47,115,116,114,105,110,103,0,95,95,116,104,114,111,119,95,108,101,110,103,116,104,95,101,114,114,111,114,0,33,34,98,97,115,105,99,95,115,116,114,105,110,103,32,111,117,116,95,111,102,95,114,97,110,103,101,34,0,95,95,116,104,114,111,119,95,111,117,116,95,111,102,95,114,97,110,103,101,0,37,100,0,116,101,114,109,105,110,97,116,105,110,103,32,119,105,116,104,32,37,115,32,101,120,99,101,112,116,105,111,110,32,111,102,32,116,121,112,101,32,37,115,58,32,37,115,0,116,101,114,109,105,110,97,116,105,110,103,32,119,105,116,104,32,37,115,32,101,120,99,101,112,116,105,111,110,32,111,102,32,116,121,112,101,32,37,115,0,116,101,114,109,105,110,97,116,105,110,103,32,119,105,116,104,32,37,115,32,102,111,114,101,105,103,110,32,101,120,99,101,112,116,105,111,110,0,116,101,114,109,105,110,97,116,105,110,103,0,117,110,99,97,117,103,104,116,0,83,116,57,101,120,99,101,112,116,105,111,110,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,54,95,95,115,104,105,109,95,116,121,112,101,95,105,110,102,111,69,0,83,116,57,116,121,112,101,95,105,110,102,111,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,48,95,95,115,105,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,55,95,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,112,116,104,114,101,97,100,95,111,110,99,101,32,102,97,105,108,117,114,101,32,105,110,32,95,95,99,120,97,95,103,101,116,95,103,108,111,98,97,108,115,95,102,97,115,116,40,41,0,99,97,110,110,111,116,32,99,114,101,97,116,101,32,112,116,104,114,101,97,100,32,107,101,121,32,102,111,114,32,95,95,99,120,97,95,103,101,116,95,103,108,111,98,97,108,115,40,41,0,99,97,110,110,111,116,32,122,101,114,111,32,111,117,116,32,116,104,114,101,97,100,32,118,97,108,117,101,32,102,111,114,32,95,95,99,120,97,95,103,101,116,95,103,108,111,98,97,108,115,40,41,0,116,101,114,109,105,110,97,116,101,95,104,97,110,100,108,101,114,32,117,110,101,120,112,101,99,116,101,100,108,121,32,114,101,116,117,114,110,101,100,0,115,116,100,58,58,98,97,100,95,97,108,108,111,99,0,83,116,57,98,97,100,95,97,108,108,111,99,0,115,116,100,58,58,101,120,99,101,112,116,105,111,110,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,57,95,95,112,111,105,110,116,101,114,95,116,121,112,101,95,105,110,102,111,69,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,55,95,95,112,98,97,115,101,95,116,121,112,101,95,105,110,102,111,69,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,51,95,95,102,117,110,100,97,109,101,110,116,97,108,95,116,121,112,101,95,105,110,102,111,69,0,118,0,68,110,0,98,0,99,0,104,0,97,0,115,0,105,0,106,0,108,0,109,0,102,0,100,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,54,95,95,101,110,117,109,95,116,121,112,101,95,105,110,102,111,69,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,49,95,95,118,109,105,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE+30720);var tempDoublePtr=STATICTOP;STATICTOP+=16;Module["_i64Subtract"]=_i64Subtract;var GL={counter:1,lastError:0,buffers:[],mappedBuffers:{},programs:[],framebuffers:[],renderbuffers:[],textures:[],uniforms:[],shaders:[],vaos:[],contexts:[],currentContext:null,offscreenCanvases:{},byteSizeByTypeRoot:5120,byteSizeByType:[1,1,2,2,4,4,4,2,3,4,8],programInfos:{},stringCache:{},packAlignment:4,unpackAlignment:4,init:function(){GL.miniTempBuffer=new Float32Array(GL.MINI_TEMP_BUFFER_SIZE);for(var i=0;i<GL.MINI_TEMP_BUFFER_SIZE;i++){GL.miniTempBufferViews[i]=GL.miniTempBuffer.subarray(0,i+1);}},recordError:function recordError(errorCode){if(!GL.lastError){GL.lastError=errorCode;}},getNewId:function(table){var ret=GL.counter++;for(var i=table.length;i<ret;i++){table[i]=null;}return ret;},MINI_TEMP_BUFFER_SIZE:256,miniTempBuffer:null,miniTempBufferViews:[0],getSource:function(shader,count,string,length){var source="";for(var i=0;i<count;++i){var frag;if(length){var len=HEAP32[length+i*4>>2];if(len<0){frag=Pointer_stringify(HEAP32[string+i*4>>2]);}else{frag=Pointer_stringify(HEAP32[string+i*4>>2],len);}}else{frag=Pointer_stringify(HEAP32[string+i*4>>2]);}source+=frag;}return source;},createContext:function(canvas,webGLContextAttributes){if(typeof webGLContextAttributes.majorVersion==="undefined"&&typeof webGLContextAttributes.minorVersion==="undefined"){webGLContextAttributes.majorVersion=1;webGLContextAttributes.minorVersion=0;}var ctx;var errorInfo="?";function onContextCreationError(event){errorInfo=event.statusMessage||errorInfo;}try{canvas.addEventListener("webglcontextcreationerror",onContextCreationError,false);try{if(webGLContextAttributes.majorVersion==1&&webGLContextAttributes.minorVersion==0){ctx=canvas.getContext("webgl",webGLContextAttributes)||canvas.getContext("experimental-webgl",webGLContextAttributes);}else if(webGLContextAttributes.majorVersion==2&&webGLContextAttributes.minorVersion==0){ctx=canvas.getContext("webgl2",webGLContextAttributes)||canvas.getContext("experimental-webgl2",webGLContextAttributes);}else{throw"Unsupported WebGL context version "+majorVersion+"."+minorVersion+"!";}}finally{canvas.removeEventListener("webglcontextcreationerror",onContextCreationError,false);}if(!ctx)throw":(";}catch(e){Module.print("Could not create canvas: "+[errorInfo,e,JSON.stringify(webGLContextAttributes)]);return 0;}if(!ctx)return 0;return GL.registerContext(ctx,webGLContextAttributes);},registerContext:function(ctx,webGLContextAttributes){var handle=GL.getNewId(GL.contexts);var context={handle:handle,attributes:webGLContextAttributes,version:webGLContextAttributes.majorVersion,GLctx:ctx};if(ctx.canvas)ctx.canvas.GLctxObject=context;GL.contexts[handle]=context;if(typeof webGLContextAttributes["enableExtensionsByDefault"]==="undefined"||webGLContextAttributes.enableExtensionsByDefault){GL.initExtensions(context);}return handle;},makeContextCurrent:function(contextHandle){var context=GL.contexts[contextHandle];if(!context)return false;GLctx=Module.ctx=context.GLctx;GL.currentContext=context;return true;},getContext:function(contextHandle){return GL.contexts[contextHandle];},deleteContext:function(contextHandle){if(GL.currentContext===GL.contexts[contextHandle])GL.currentContext=null;if(typeof JSEvents==="object")JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);if(GL.contexts[contextHandle]&&GL.contexts[contextHandle].GLctx.canvas)GL.contexts[contextHandle].GLctx.canvas.GLctxObject=undefined;GL.contexts[contextHandle]=null;},initExtensions:function(context){if(!context)context=GL.currentContext;if(context.initExtensionsDone)return;context.initExtensionsDone=true;var GLctx=context.GLctx;context.maxVertexAttribs=GLctx.getParameter(GLctx.MAX_VERTEX_ATTRIBS);if(context.version<2){var instancedArraysExt=GLctx.getExtension("ANGLE_instanced_arrays");if(instancedArraysExt){GLctx["vertexAttribDivisor"]=function(index,divisor){instancedArraysExt["vertexAttribDivisorANGLE"](index,divisor);};GLctx["drawArraysInstanced"]=function(mode,first,count,primcount){instancedArraysExt["drawArraysInstancedANGLE"](mode,first,count,primcount);};GLctx["drawElementsInstanced"]=function(mode,count,type,indices,primcount){instancedArraysExt["drawElementsInstancedANGLE"](mode,count,type,indices,primcount);};}var vaoExt=GLctx.getExtension("OES_vertex_array_object");if(vaoExt){GLctx["createVertexArray"]=function(){return vaoExt["createVertexArrayOES"]();};GLctx["deleteVertexArray"]=function(vao){vaoExt["deleteVertexArrayOES"](vao);};GLctx["bindVertexArray"]=function(vao){vaoExt["bindVertexArrayOES"](vao);};GLctx["isVertexArray"]=function(vao){return vaoExt["isVertexArrayOES"](vao);};}var drawBuffersExt=GLctx.getExtension("WEBGL_draw_buffers");if(drawBuffersExt){GLctx["drawBuffers"]=function(n,bufs){drawBuffersExt["drawBuffersWEBGL"](n,bufs);};}}var automaticallyEnabledExtensions=["OES_texture_float","OES_texture_half_float","OES_standard_derivatives","OES_vertex_array_object","WEBGL_compressed_texture_s3tc","WEBGL_depth_texture","OES_element_index_uint","EXT_texture_filter_anisotropic","ANGLE_instanced_arrays","OES_texture_float_linear","OES_texture_half_float_linear","WEBGL_compressed_texture_atc","WEBGL_compressed_texture_pvrtc","EXT_color_buffer_half_float","WEBGL_color_buffer_float","EXT_frag_depth","EXT_sRGB","WEBGL_draw_buffers","WEBGL_shared_resources","EXT_shader_texture_lod","EXT_color_buffer_float","EXT_disjoint_timer_query"];var exts=GLctx.getSupportedExtensions();if(exts&&exts.length>0){GLctx.getSupportedExtensions().forEach(function(ext){if(automaticallyEnabledExtensions.indexOf(ext)!=-1){GLctx.getExtension(ext);}});}},populateUniformTable:function(program){var p=GL.programs[program];GL.programInfos[program]={uniforms:{},maxUniformLength:0,maxAttributeLength:-1,maxUniformBlockNameLength:-1};var ptable=GL.programInfos[program];var utable=ptable.uniforms;var numUniforms=GLctx.getProgramParameter(p,GLctx.ACTIVE_UNIFORMS);for(var i=0;i<numUniforms;++i){var u=GLctx.getActiveUniform(p,i);var name=u.name;ptable.maxUniformLength=Math.max(ptable.maxUniformLength,name.length+1);if(name.indexOf("]",name.length-1)!==-1){var ls=name.lastIndexOf("[");name=name.slice(0,ls);}var loc=GLctx.getUniformLocation(p,name);var id=GL.getNewId(GL.uniforms);utable[name]=[u.size,id];GL.uniforms[id]=loc;for(var j=1;j<u.size;++j){var n=name+"["+j+"]";loc=GLctx.getUniformLocation(p,n);id=GL.getNewId(GL.uniforms);GL.uniforms[id]=loc;}}}};function _glClearColor(x0,x1,x2,x3){GLctx["clearColor"](x0,x1,x2,x3);}Module["_i64Add"]=_i64Add;Module["_roundf"]=_roundf;function __ZSt18uncaught_exceptionv(){return!!__ZSt18uncaught_exceptionv.uncaught_exception;}var EXCEPTIONS={last:0,caught:[],infos:{},deAdjust:function(adjusted){if(!adjusted||EXCEPTIONS.infos[adjusted])return adjusted;for(var ptr in EXCEPTIONS.infos){var info=EXCEPTIONS.infos[ptr];if(info.adjusted===adjusted){return ptr;}}return adjusted;},addRef:function(ptr){if(!ptr)return;var info=EXCEPTIONS.infos[ptr];info.refcount++;},decRef:function(ptr){if(!ptr)return;var info=EXCEPTIONS.infos[ptr];assert(info.refcount>0);info.refcount--;if(info.refcount===0){if(info.destructor){Runtime.dynCall("vi",info.destructor,[ptr]);}delete EXCEPTIONS.infos[ptr];___cxa_free_exception(ptr);}},clearRef:function(ptr){if(!ptr)return;var info=EXCEPTIONS.infos[ptr];info.refcount=0;}};function ___resumeException(ptr){if(!EXCEPTIONS.last){EXCEPTIONS.last=ptr;}EXCEPTIONS.clearRef(EXCEPTIONS.deAdjust(ptr));throw ptr+" - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";}function ___cxa_find_matching_catch(){var thrown=EXCEPTIONS.last;if(!thrown){return(asm["setTempRet0"](0),0)|0;}var info=EXCEPTIONS.infos[thrown];var throwntype=info.type;if(!throwntype){return(asm["setTempRet0"](0),thrown)|0;}var typeArray=Array.prototype.slice.call(arguments);var pointer=Module["___cxa_is_pointer_type"](throwntype);if(!___cxa_find_matching_catch.buffer)___cxa_find_matching_catch.buffer=_malloc(4);HEAP32[___cxa_find_matching_catch.buffer>>2]=thrown;thrown=___cxa_find_matching_catch.buffer;for(var i=0;i<typeArray.length;i++){if(typeArray[i]&&Module["___cxa_can_catch"](typeArray[i],throwntype,thrown)){thrown=HEAP32[thrown>>2];info.adjusted=thrown;return(asm["setTempRet0"](typeArray[i]),thrown)|0;}}thrown=HEAP32[thrown>>2];return(asm["setTempRet0"](throwntype),thrown)|0;}function ___cxa_throw(ptr,type,destructor){EXCEPTIONS.infos[ptr]={ptr:ptr,adjusted:ptr,type:type,destructor:destructor,refcount:0,caught:false};EXCEPTIONS.last=ptr;if(!("uncaught_exception"in __ZSt18uncaught_exceptionv)){__ZSt18uncaught_exceptionv.uncaught_exception=1;}else{__ZSt18uncaught_exceptionv.uncaught_exception++;}throw ptr+" - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";}function _glUseProgram(program){GLctx.useProgram(program?GL.programs[program]:null);}function _glDisableVertexAttribArray(index){GLctx.disableVertexAttribArray(index);}function _free(){}Module["_free"]=_free;function _malloc(bytes){var ptr=Runtime.dynamicAlloc(bytes+8);return ptr+8&4294967288;}Module["_malloc"]=_malloc;function embind_init_charCodes(){var codes=new Array(256);for(var i=0;i<256;++i){codes[i]=String.fromCharCode(i);}embind_charCodes=codes;}var embind_charCodes=undefined;function readLatin1String(ptr){var ret="";var c=ptr;while(HEAPU8[c]){ret+=embind_charCodes[HEAPU8[c++]];}return ret;}var awaitingDependencies={};var registeredTypes={};var typeDependencies={};var char_0=48;var char_9=57;function makeLegalFunctionName(name){if(undefined===name){return"_unknown";}name=name.replace(/[^a-zA-Z0-9_]/g,"$");var f=name.charCodeAt(0);if(f>=char_0&&f<=char_9){return"_"+name;}else{return name;}}function createNamedFunction(name,body){name=makeLegalFunctionName(name);return new Function("body","return function "+name+"() {\n"+'    "use strict";'+"    return body.apply(this, arguments);\n"+"};\n")(body);}function extendError(baseErrorType,errorName){var errorClass=createNamedFunction(errorName,function(message){this.name=errorName;this.message=message;var stack=new Error(message).stack;if(stack!==undefined){this.stack=this.toString()+"\n"+stack.replace(/^Error(:[^\n]*)?\n/,"");}});errorClass.prototype=Object.create(baseErrorType.prototype);errorClass.prototype.constructor=errorClass;errorClass.prototype.toString=function(){if(this.message===undefined){return this.name;}else{return this.name+": "+this.message;}};return errorClass;}var BindingError=undefined;function throwBindingError(message){throw new BindingError(message);}var InternalError=undefined;function throwInternalError(message){throw new InternalError(message);}function whenDependentTypesAreResolved(myTypes,dependentTypes,getTypeConverters){myTypes.forEach(function(type){typeDependencies[type]=dependentTypes;});function onComplete(typeConverters){var myTypeConverters=getTypeConverters(typeConverters);if(myTypeConverters.length!==myTypes.length){throwInternalError("Mismatched type converter count");}for(var i=0;i<myTypes.length;++i){registerType(myTypes[i],myTypeConverters[i]);}}var typeConverters=new Array(dependentTypes.length);var unregisteredTypes=[];var registered=0;dependentTypes.forEach(function(dt,i){if(registeredTypes.hasOwnProperty(dt)){typeConverters[i]=registeredTypes[dt];}else{unregisteredTypes.push(dt);if(!awaitingDependencies.hasOwnProperty(dt)){awaitingDependencies[dt]=[];}awaitingDependencies[dt].push(function(){typeConverters[i]=registeredTypes[dt];++registered;if(registered===unregisteredTypes.length){onComplete(typeConverters);}});}});if(0===unregisteredTypes.length){onComplete(typeConverters);}}function registerType(rawType,registeredInstance,options){options=options||{};if(!("argPackAdvance"in registeredInstance)){throw new TypeError("registerType registeredInstance requires argPackAdvance");}var name=registeredInstance.name;if(!rawType){throwBindingError('type "'+name+'" must have a positive integer typeid pointer');}if(registeredTypes.hasOwnProperty(rawType)){if(options.ignoreDuplicateRegistrations){return;}else{throwBindingError("Cannot register type '"+name+"' twice");}}registeredTypes[rawType]=registeredInstance;delete typeDependencies[rawType];if(awaitingDependencies.hasOwnProperty(rawType)){var callbacks=awaitingDependencies[rawType];delete awaitingDependencies[rawType];callbacks.forEach(function(cb){cb();});}}function simpleReadValueFromPointer(pointer){return this["fromWireType"](HEAPU32[pointer>>2]);}function __embind_register_std_string(rawType,name){name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":function(value){var length=HEAPU32[value>>2];var a=new Array(length);for(var i=0;i<length;++i){a[i]=String.fromCharCode(HEAPU8[value+4+i]);}_free(value);return a.join("");},"toWireType":function(destructors,value){if(value instanceof ArrayBuffer){value=new Uint8Array(value);}function getTAElement(ta,index){return ta[index];}function getStringElement(string,index){return string.charCodeAt(index);}var getElement;if(value instanceof Uint8Array){getElement=getTAElement;}else if(value instanceof Uint8ClampedArray){getElement=getTAElement;}else if(value instanceof Int8Array){getElement=getTAElement;}else if(typeof value==="string"){getElement=getStringElement;}else{throwBindingError("Cannot pass non-string to std::string");}var length=value.length;var ptr=_malloc(4+length);HEAPU32[ptr>>2]=length;for(var i=0;i<length;++i){var charCode=getElement(value,i);if(charCode>255){_free(ptr);throwBindingError("String has UTF-16 code units that do not fit in 8 bits");}HEAPU8[ptr+4+i]=charCode;}if(destructors!==null){destructors.push(_free,ptr);}return ptr;},"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:function(ptr){_free(ptr);}});}function _glLinkProgram(program){GLctx.linkProgram(GL.programs[program]);GL.programInfos[program]=null;GL.populateUniformTable(program);}function __embind_register_std_wstring(rawType,charSize,name){name=readLatin1String(name);var getHeap,shift;if(charSize===2){getHeap=function(){return HEAPU16;};shift=1;}else if(charSize===4){getHeap=function(){return HEAPU32;};shift=2;}registerType(rawType,{name:name,"fromWireType":function(value){var HEAP=getHeap();var length=HEAPU32[value>>2];var a=new Array(length);var start=value+4>>shift;for(var i=0;i<length;++i){a[i]=String.fromCharCode(HEAP[start+i]);}_free(value);return a.join("");},"toWireType":function(destructors,value){var HEAP=getHeap();var length=value.length;var ptr=_malloc(4+length*charSize);HEAPU32[ptr>>2]=length;var start=ptr+4>>shift;for(var i=0;i<length;++i){HEAP[start+i]=value.charCodeAt(i);}if(destructors!==null){destructors.push(_free,ptr);}return ptr;},"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:function(ptr){_free(ptr);}});}function _glBindTexture(target,texture){GLctx.bindTexture(target,texture?GL.textures[texture]:null);}function _glDeleteRenderbuffers(n,renderbuffers){for(var i=0;i<n;i++){var id=HEAP32[renderbuffers+i*4>>2];var renderbuffer=GL.renderbuffers[id];if(!renderbuffer)continue;GLctx.deleteRenderbuffer(renderbuffer);renderbuffer.name=0;GL.renderbuffers[id]=null;}}function _uuid_generate(out){var uuid=null;if(ENVIRONMENT_IS_NODE){try{var rb=__webpack_require__(6).randomBytes;uuid=rb(16);}catch(e){}}else if(ENVIRONMENT_IS_WEB&&typeof window.crypto!=="undefined"&&typeof window.crypto.getRandomValues!=="undefined"){uuid=new Uint8Array(16);window.crypto.getRandomValues(uuid);}if(!uuid){uuid=new Array(16);var d=new Date().getTime();for(var i=0;i<16;i++){var r=(d+Math.random()*256)%256|0;d=d/256|0;uuid[i]=r;}}uuid[6]=uuid[6]&15|64;uuid[8]=uuid[8]&127|128;writeArrayToMemory(uuid,out);}function _uuid_unparse(uu,out,upper){var i=0;var uuid="xxxx-xx-xx-xx-xxxxxx".replace(/[x]/g,function(c){var r=upper?HEAPU8[uu+i>>0].toString(16).toUpperCase():HEAPU8[uu+i>>0].toString(16);r=r.length===1?"0"+r:r;i++;return r;});stringToUTF8(uuid,out,37);}function _uuid_unparse_lower(uu,out){_uuid_unparse(uu,out);}function _glFramebufferRenderbuffer(target,attachment,renderbuffertarget,renderbuffer){GLctx.framebufferRenderbuffer(target,attachment,renderbuffertarget,GL.renderbuffers[renderbuffer]);}function ___assert_fail(condition,filename,line,func){ABORT=true;throw"Assertion failed: "+Pointer_stringify(condition)+", at: "+[filename?Pointer_stringify(filename):"unknown filename",line,func?Pointer_stringify(func):"unknown function"]+" at "+stackTrace();}var structRegistrations={};function runDestructors(destructors){while(destructors.length){var ptr=destructors.pop();var del=destructors.pop();del(ptr);}}function __embind_finalize_value_object(structType){var reg=structRegistrations[structType];delete structRegistrations[structType];var rawConstructor=reg.rawConstructor;var rawDestructor=reg.rawDestructor;var fieldRecords=reg.fields;var fieldTypes=fieldRecords.map(function(field){return field.getterReturnType;}).concat(fieldRecords.map(function(field){return field.setterArgumentType;}));whenDependentTypesAreResolved([structType],fieldTypes,function(fieldTypes){var fields={};fieldRecords.forEach(function(field,i){var fieldName=field.fieldName;var getterReturnType=fieldTypes[i];var getter=field.getter;var getterContext=field.getterContext;var setterArgumentType=fieldTypes[i+fieldRecords.length];var setter=field.setter;var setterContext=field.setterContext;fields[fieldName]={read:function(ptr){return getterReturnType["fromWireType"](getter(getterContext,ptr));},write:function(ptr,o){var destructors=[];setter(setterContext,ptr,setterArgumentType["toWireType"](destructors,o));runDestructors(destructors);}};});return[{name:reg.name,"fromWireType":function(ptr){var rv={};for(var i in fields){rv[i]=fields[i].read(ptr);}rawDestructor(ptr);return rv;},"toWireType":function(destructors,o){for(var fieldName in fields){if(!(fieldName in o)){throw new TypeError("Missing field");}}var ptr=rawConstructor();for(fieldName in fields){fields[fieldName].write(ptr,o[fieldName]);}if(destructors!==null){destructors.push(rawDestructor,ptr);}return ptr;},"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:rawDestructor}];});}function _glDetachShader(program,shader){GLctx.detachShader(GL.programs[program],GL.shaders[shader]);}function _glClear(x0){GLctx["clear"](x0);}var _llvm_pow_f32=Math_pow;function __embind_register_void(rawType,name){name=readLatin1String(name);registerType(rawType,{isVoid:true,name:name,"argPackAdvance":0,"fromWireType":function(){return undefined;},"toWireType":function(destructors,o){return undefined;}});}function _glUniform2fv(location,count,value){location=GL.uniforms[location];var view;if(2*count<=GL.MINI_TEMP_BUFFER_SIZE){view=GL.miniTempBufferViews[2*count-1];for(var i=0;i<2*count;i+=2){view[i]=HEAPF32[value+4*i>>2];view[i+1]=HEAPF32[value+(4*i+4)>>2];}}else{view=HEAPF32.subarray(value>>2,value+count*8>>2);}GLctx.uniform2fv(location,view);}function _glEnableVertexAttribArray(index){GLctx.enableVertexAttribArray(index);}function _glBindBuffer(target,buffer){var bufferObj=buffer?GL.buffers[buffer]:null;GLctx.bindBuffer(target,bufferObj);}function _glIsEnabled(x0){return GLctx["isEnabled"](x0);}function emscriptenWebGLComputeImageSize(width,height,sizePerPixel,alignment){function roundedToNextMultipleOf(x,y){return Math.floor((x+y-1)/y)*y;}var plainRowSize=width*sizePerPixel;var alignedRowSize=roundedToNextMultipleOf(plainRowSize,alignment);return height<=0?0:(height-1)*alignedRowSize+plainRowSize;}function emscriptenWebGLGetTexPixelData(type,format,width,height,pixels,internalFormat){var sizePerPixel;var numChannels;switch(format){case 6406:case 6409:case 6402:numChannels=1;break;case 6410:numChannels=2;break;case 6407:case 35904:numChannels=3;break;case 6408:case 35906:numChannels=4;break;default:GL.recordError(1280);return null;}switch(type){case 5121:sizePerPixel=numChannels*1;break;case 5123:case 36193:sizePerPixel=numChannels*2;break;case 5125:case 5126:sizePerPixel=numChannels*4;break;case 34042:sizePerPixel=4;break;case 33635:case 32819:case 32820:sizePerPixel=2;break;default:GL.recordError(1280);return null;}var bytes=emscriptenWebGLComputeImageSize(width,height,sizePerPixel,GL.unpackAlignment);switch(type){case 5121:return HEAPU8.subarray(pixels,pixels+bytes);case 5126:return HEAPF32.subarray(pixels>>2,pixels+bytes>>2);case 5125:case 34042:return HEAPU32.subarray(pixels>>2,pixels+bytes>>2);case 5123:case 33635:case 32819:case 32820:case 36193:return HEAPU16.subarray(pixels>>1,pixels+bytes>>1);default:GL.recordError(1280);return null;}}function _glReadPixels(x,y,width,height,format,type,pixels){var pixelData=emscriptenWebGLGetTexPixelData(type,format,width,height,pixels,format);if(!pixelData){GL.recordError(1280);return;}GLctx.readPixels(x,y,width,height,format,type,pixelData);}function _glCompileShader(shader){GLctx.compileShader(GL.shaders[shader]);}var SYSCALLS={varargs:0,get:function(varargs){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret;},getStr:function(){var ret=Pointer_stringify(SYSCALLS.get());return ret;},get64:function(){var low=SYSCALLS.get(),high=SYSCALLS.get();if(low>=0)assert(high===0);else assert(high===-1);return low;},getZero:function(){assert(SYSCALLS.get()===0);}};function ___syscall54(which,varargs){SYSCALLS.varargs=varargs;try{return 0;}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno;}}function _glFramebufferTexture2D(target,attachment,textarget,texture,level){GLctx.framebufferTexture2D(target,attachment,textarget,GL.textures[texture],level);}function _glDeleteTextures(n,textures){for(var i=0;i<n;i++){var id=HEAP32[textures+i*4>>2];var texture=GL.textures[id];if(!texture)continue;GLctx.deleteTexture(texture);texture.name=0;GL.textures[id]=null;}}Module["_bitshift64Lshr"]=_bitshift64Lshr;function _glBufferData(target,size,data,usage){switch(usage){case 35041:case 35042:usage=35040;break;case 35045:case 35046:usage=35044;break;case 35049:case 35050:usage=35048;break;}if(!data){GLctx.bufferData(target,size,usage);}else{GLctx.bufferData(target,HEAPU8.subarray(data,data+size),usage);}}function _pthread_cleanup_push(routine,arg){__ATEXIT__.push(function(){Runtime.dynCall("vi",routine,[arg]);});_pthread_cleanup_push.level=__ATEXIT__.length;}function _glGetError(){if(GL.lastError){var error=GL.lastError;GL.lastError=0;return error;}else{return GLctx.getError();}}function _pthread_cleanup_pop(){assert(_pthread_cleanup_push.level==__ATEXIT__.length,"cannot pop if something else added meanwhile!");__ATEXIT__.pop();_pthread_cleanup_push.level=__ATEXIT__.length;}function _emscripten_memcpy_big(dest,src,num){HEAPU8.set(HEAPU8.subarray(src,src+num),dest);return dest;}Module["_memcpy"]=_memcpy;function _glGenFramebuffers(n,ids){for(var i=0;i<n;++i){var framebuffer=GLctx.createFramebuffer();if(!framebuffer){GL.recordError(1282);while(i<n)HEAP32[ids+i++*4>>2]=0;return;}var id=GL.getNewId(GL.framebuffers);framebuffer.name=id;GL.framebuffers[id]=framebuffer;HEAP32[ids+i*4>>2]=id;}}function getTypeName(type){var ptr=___getTypeName(type);var rv=readLatin1String(ptr);_free(ptr);return rv;}function requireRegisteredType(rawType,humanName){var impl=registeredTypes[rawType];if(undefined===impl){throwBindingError(humanName+" has unknown type "+getTypeName(rawType));}return impl;}function __embind_register_enum_value(rawEnumType,name,enumValue){var enumType=requireRegisteredType(rawEnumType,"enum");name=readLatin1String(name);var Enum=enumType.constructor;var Value=Object.create(enumType.constructor.prototype,{value:{value:enumValue},constructor:{value:createNamedFunction(enumType.name+"_"+name,function(){})}});Enum.values[enumValue]=Value;Enum[name]=Value;}function ___setErrNo(value){if(Module["___errno_location"])HEAP32[Module["___errno_location"]()>>2]=value;return value;}Module["_sbrk"]=_sbrk;Module["_memmove"]=_memmove;function _glGenTextures(n,textures){for(var i=0;i<n;i++){var texture=GLctx.createTexture();if(!texture){GL.recordError(1282);while(i<n)HEAP32[textures+i++*4>>2]=0;return;}var id=GL.getNewId(GL.textures);texture.name=id;GL.textures[id]=texture;HEAP32[textures+i*4>>2]=id;}}function ___gxx_personality_v0(){}var cttz_i8=allocate([8,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,7,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0],"i8",ALLOC_STATIC);Module["_llvm_cttz_i32"]=_llvm_cttz_i32;Module["___udivmoddi4"]=___udivmoddi4;Module["___uremdi3"]=___uremdi3;function _glUniform1f(location,v0){location=GL.uniforms[location];GLctx.uniform1f(location,v0);}function __embind_register_memory_view(rawType,dataTypeIndex,name){var typeMapping=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array];var TA=typeMapping[dataTypeIndex];function decodeMemoryView(handle){handle=handle>>2;var heap=HEAPU32;var size=heap[handle];var data=heap[handle+1];return new TA(heap["buffer"],data,size);}name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":decodeMemoryView,"argPackAdvance":8,"readValueFromPointer":decodeMemoryView},{ignoreDuplicateRegistrations:true});}function _glDeleteBuffers(n,buffers){for(var i=0;i<n;i++){var id=HEAP32[buffers+i*4>>2];var buffer=GL.buffers[id];if(!buffer)continue;GLctx.deleteBuffer(buffer);buffer.name=0;GL.buffers[id]=null;if(id==GL.currArrayBuffer)GL.currArrayBuffer=0;if(id==GL.currElementArrayBuffer)GL.currElementArrayBuffer=0;}}function _glCreateShader(shaderType){var id=GL.getNewId(GL.shaders);GL.shaders[id]=GLctx.createShader(shaderType);return id;}function ensureOverloadTable(proto,methodName,humanName){if(undefined===proto[methodName].overloadTable){var prevFunc=proto[methodName];proto[methodName]=function(){if(!proto[methodName].overloadTable.hasOwnProperty(arguments.length)){throwBindingError("Function '"+humanName+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+proto[methodName].overloadTable+")!");}return proto[methodName].overloadTable[arguments.length].apply(this,arguments);};proto[methodName].overloadTable=[];proto[methodName].overloadTable[prevFunc.argCount]=prevFunc;}}function exposePublicSymbol(name,value,numArguments){if(Module.hasOwnProperty(name)){if(undefined===numArguments||undefined!==Module[name].overloadTable&&undefined!==Module[name].overloadTable[numArguments]){throwBindingError("Cannot register public name '"+name+"' twice");}ensureOverloadTable(Module,name,name);if(Module.hasOwnProperty(numArguments)){throwBindingError("Cannot register multiple overloads of a function with the same number of arguments ("+numArguments+")!");}Module[name].overloadTable[numArguments]=value;}else{Module[name]=value;if(undefined!==numArguments){Module[name].numArguments=numArguments;}}}function getShiftFromSize(size){switch(size){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+size);}}function enumReadValueFromPointer(name,shift,signed){switch(shift){case 0:return function(pointer){var heap=signed?HEAP8:HEAPU8;return this["fromWireType"](heap[pointer]);};case 1:return function(pointer){var heap=signed?HEAP16:HEAPU16;return this["fromWireType"](heap[pointer>>1]);};case 2:return function(pointer){var heap=signed?HEAP32:HEAPU32;return this["fromWireType"](heap[pointer>>2]);};default:throw new TypeError("Unknown integer type: "+name);}}function __embind_register_enum(rawType,name,size,isSigned){var shift=getShiftFromSize(size);name=readLatin1String(name);function ctor(){}ctor.values={};registerType(rawType,{name:name,constructor:ctor,"fromWireType":function(c){return this.constructor.values[c];},"toWireType":function(destructors,c){return c.value;},"argPackAdvance":8,"readValueFromPointer":enumReadValueFromPointer(name,shift,isSigned),destructorFunction:null});exposePublicSymbol(name,ctor);}function _glBindRenderbuffer(target,renderbuffer){GLctx.bindRenderbuffer(target,renderbuffer?GL.renderbuffers[renderbuffer]:null);}function _glGenRenderbuffers(n,renderbuffers){for(var i=0;i<n;i++){var renderbuffer=GLctx.createRenderbuffer();if(!renderbuffer){GL.recordError(1282);while(i<n)HEAP32[renderbuffers+i++*4>>2]=0;return;}var id=GL.getNewId(GL.renderbuffers);renderbuffer.name=id;GL.renderbuffers[id]=renderbuffer;HEAP32[renderbuffers+i*4>>2]=id;}}function requireFunction(signature,rawFunction){signature=readLatin1String(signature);function makeDynCaller(dynCall){var args=[];for(var i=1;i<signature.length;++i){args.push("a"+i);}var name="dynCall_"+signature+"_"+rawFunction;var body="return function "+name+"("+args.join(", ")+") {\n";body+="    return dynCall(rawFunction"+(args.length?", ":"")+args.join(", ")+");\n";body+="};\n";return new Function("dynCall","rawFunction",body)(dynCall,rawFunction);}var fp;if(Module["FUNCTION_TABLE_"+signature]!==undefined){fp=Module["FUNCTION_TABLE_"+signature][rawFunction];}else if(typeof FUNCTION_TABLE!=="undefined"){fp=FUNCTION_TABLE[rawFunction];}else{var dc=asm["dynCall_"+signature];if(dc===undefined){dc=asm["dynCall_"+signature.replace(/f/g,"d")];if(dc===undefined){throwBindingError("No dynCall invoker for signature: "+signature);}}fp=makeDynCaller(dc);}if(typeof fp!=="function"){throwBindingError("unknown function pointer with signature "+signature+": "+rawFunction);}return fp;}function __embind_register_value_object(rawType,name,constructorSignature,rawConstructor,destructorSignature,rawDestructor){structRegistrations[rawType]={name:readLatin1String(name),rawConstructor:requireFunction(constructorSignature,rawConstructor),rawDestructor:requireFunction(destructorSignature,rawDestructor),fields:[]};}function __embind_register_bool(rawType,name,size,trueValue,falseValue){var shift=getShiftFromSize(size);name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":function(wt){return!!wt;},"toWireType":function(destructors,o){return o?trueValue:falseValue;},"argPackAdvance":8,"readValueFromPointer":function(pointer){var heap;if(size===1){heap=HEAP8;}else if(size===2){heap=HEAP16;}else if(size===4){heap=HEAP32;}else{throw new TypeError("Unknown boolean type size: "+name);}return this["fromWireType"](heap[pointer>>shift]);},destructorFunction:null});}function _glTexSubImage2D(target,level,xoffset,yoffset,width,height,format,type,pixels){var pixelData=null;if(pixels)pixelData=emscriptenWebGLGetTexPixelData(type,format,width,height,pixels,0);GLctx.texSubImage2D(target,level,xoffset,yoffset,width,height,format,type,pixelData);}function _glTexImage2D(target,level,internalFormat,width,height,border,format,type,pixels){var pixelData=null;if(pixels)pixelData=emscriptenWebGLGetTexPixelData(type,format,width,height,pixels,internalFormat);GLctx.texImage2D(target,level,internalFormat,width,height,border,format,type,pixelData);}function _glDisable(x0){GLctx["disable"](x0);}function _glBlendFuncSeparate(x0,x1,x2,x3){GLctx["blendFuncSeparate"](x0,x1,x2,x3);}Module["_memset"]=_memset;function _glGetProgramiv(program,pname,p){if(!p){GL.recordError(1281);return;}if(program>=GL.counter){GL.recordError(1281);return;}var ptable=GL.programInfos[program];if(!ptable){GL.recordError(1282);return;}if(pname==35716){var log=GLctx.getProgramInfoLog(GL.programs[program]);if(log===null)log="(unknown error)";HEAP32[p>>2]=log.length+1;}else if(pname==35719){HEAP32[p>>2]=ptable.maxUniformLength;}else if(pname==35722){if(ptable.maxAttributeLength==-1){var program=GL.programs[program];var numAttribs=GLctx.getProgramParameter(program,GLctx.ACTIVE_ATTRIBUTES);ptable.maxAttributeLength=0;for(var i=0;i<numAttribs;++i){var activeAttrib=GLctx.getActiveAttrib(program,i);ptable.maxAttributeLength=Math.max(ptable.maxAttributeLength,activeAttrib.name.length+1);}}HEAP32[p>>2]=ptable.maxAttributeLength;}else if(pname==35381){if(ptable.maxUniformBlockNameLength==-1){var program=GL.programs[program];var numBlocks=GLctx.getProgramParameter(program,GLctx.ACTIVE_UNIFORM_BLOCKS);ptable.maxUniformBlockNameLength=0;for(var i=0;i<numBlocks;++i){var activeBlockName=GLctx.getActiveUniformBlockName(program,i);ptable.maxUniformBlockNameLength=Math.max(ptable.maxAttributeLength,activeBlockName.length+1);}}HEAP32[p>>2]=ptable.maxUniformBlockNameLength;}else{HEAP32[p>>2]=GLctx.getProgramParameter(GL.programs[program],pname);}}function _glVertexAttribPointer(index,size,type,normalized,stride,ptr){GLctx.vertexAttribPointer(index,size,type,normalized,stride,ptr);}function _glGetShaderInfoLog(shader,maxLength,length,infoLog){var log=GLctx.getShaderInfoLog(GL.shaders[shader]);if(log===null)log="(unknown error)";if(maxLength>0&&infoLog){var numBytesWrittenExclNull=stringToUTF8(log,infoLog,maxLength);if(length)HEAP32[length>>2]=numBytesWrittenExclNull;}else{if(length)HEAP32[length>>2]=0;}}Module["_bitshift64Shl"]=_bitshift64Shl;function _abort(){Module["abort"]();}var UnboundTypeError=undefined;function throwUnboundTypeError(message,types){var unboundTypes=[];var seen={};function visit(type){if(seen[type]){return;}if(registeredTypes[type]){return;}if(typeDependencies[type]){typeDependencies[type].forEach(visit);return;}unboundTypes.push(type);seen[type]=true;}types.forEach(visit);throw new UnboundTypeError(message+": "+unboundTypes.map(getTypeName).join([", "]));}function upcastPointer(ptr,ptrClass,desiredClass){while(ptrClass!==desiredClass){if(!ptrClass.upcast){throwBindingError("Expected null or instance of "+desiredClass.name+", got an instance of "+ptrClass.name);}ptr=ptrClass.upcast(ptr);ptrClass=ptrClass.baseClass;}return ptr;}function validateThis(this_,classType,humanName){if(!(this_ instanceof Object)){throwBindingError(humanName+' with invalid "this": '+this_);}if(!(this_ instanceof classType.registeredClass.constructor)){throwBindingError(humanName+' incompatible with "this" of type '+this_.constructor.name);}if(!this_.$$.ptr){throwBindingError("cannot call emscripten binding method "+humanName+" on deleted object");}return upcastPointer(this_.$$.ptr,this_.$$.ptrType.registeredClass,classType.registeredClass);}function __embind_register_class_property(classType,fieldName,getterReturnType,getterSignature,getter,getterContext,setterArgumentType,setterSignature,setter,setterContext){fieldName=readLatin1String(fieldName);getter=requireFunction(getterSignature,getter);whenDependentTypesAreResolved([],[classType],function(classType){classType=classType[0];var humanName=classType.name+"."+fieldName;var desc={get:function(){throwUnboundTypeError("Cannot access "+humanName+" due to unbound types",[getterReturnType,setterArgumentType]);},enumerable:true,configurable:true};if(setter){desc.set=function(){throwUnboundTypeError("Cannot access "+humanName+" due to unbound types",[getterReturnType,setterArgumentType]);};}else{desc.set=function(v){throwBindingError(humanName+" is a read-only property");};}Object.defineProperty(classType.registeredClass.instancePrototype,fieldName,desc);whenDependentTypesAreResolved([],setter?[getterReturnType,setterArgumentType]:[getterReturnType],function(types){var getterReturnType=types[0];var desc={get:function(){var ptr=validateThis(this,classType,humanName+" getter");return getterReturnType["fromWireType"](getter(getterContext,ptr));},enumerable:true};if(setter){setter=requireFunction(setterSignature,setter);var setterArgumentType=types[1];desc.set=function(v){var ptr=validateThis(this,classType,humanName+" setter");var destructors=[];setter(setterContext,ptr,setterArgumentType["toWireType"](destructors,v));runDestructors(destructors);};}Object.defineProperty(classType.registeredClass.instancePrototype,fieldName,desc);return[];});return[];});}function emscriptenWebGLGet(name_,p,type){if(!p){GL.recordError(1281);return;}var ret=undefined;switch(name_){case 36346:ret=1;break;case 36344:if(type!=="Integer"&&type!=="Integer64"){GL.recordError(1280);}return;case 36345:ret=0;break;case 34466:var formats=GLctx.getParameter(34467);ret=formats.length;break;}if(ret===undefined){var result=GLctx.getParameter(name_);switch(typeof result){case"number":ret=result;break;case"boolean":ret=result?1:0;break;case"string":GL.recordError(1280);return;case"object":if(result===null){switch(name_){case 34964:case 35725:case 34965:case 36006:case 36007:case 32873:case 34068:{ret=0;break;};default:{GL.recordError(1280);return;}}}else if(result instanceof Float32Array||result instanceof Uint32Array||result instanceof Int32Array||result instanceof Array){for(var i=0;i<result.length;++i){switch(type){case"Integer":HEAP32[p+i*4>>2]=result[i];break;case"Float":HEAPF32[p+i*4>>2]=result[i];break;case"Boolean":HEAP8[p+i>>0]=result[i]?1:0;break;default:throw"internal glGet error, bad type: "+type;}}return;}else if(result instanceof WebGLBuffer||result instanceof WebGLProgram||result instanceof WebGLFramebuffer||result instanceof WebGLRenderbuffer||result instanceof WebGLTexture){ret=result.name|0;}else{GL.recordError(1280);return;}break;default:GL.recordError(1280);return;}}switch(type){case"Integer64":tempI64=[ret>>>0,(tempDouble=ret,+Math_abs(tempDouble)>=+1?tempDouble>+0?(Math_min(+Math_floor(tempDouble/+4294967296),+4294967295)|0)>>>0:~~+Math_ceil((tempDouble-+(~~tempDouble>>>0))/+4294967296)>>>0:0)],HEAP32[p>>2]=tempI64[0],HEAP32[p+4>>2]=tempI64[1];break;case"Integer":HEAP32[p>>2]=ret;break;case"Float":HEAPF32[p>>2]=ret;break;case"Boolean":HEAP8[p>>0]=ret?1:0;break;default:throw"internal glGet error, bad type: "+type;}}function _glGetIntegerv(name_,p){emscriptenWebGLGet(name_,p,"Integer");}function _glGetUniformLocation(program,name){name=Pointer_stringify(name);var arrayOffset=0;if(name.indexOf("]",name.length-1)!==-1){var ls=name.lastIndexOf("[");var arrayIndex=name.slice(ls+1,-1);if(arrayIndex.length>0){arrayOffset=parseInt(arrayIndex);if(arrayOffset<0){return-1;}}name=name.slice(0,ls);}var ptable=GL.programInfos[program];if(!ptable){return-1;}var utable=ptable.uniforms;var uniformInfo=utable[name];if(uniformInfo&&arrayOffset<uniformInfo[0]){return uniformInfo[1]+arrayOffset;}else{return-1;}}function __embind_register_value_object_field(structType,fieldName,getterReturnType,getterSignature,getter,getterContext,setterArgumentType,setterSignature,setter,setterContext){structRegistrations[structType].fields.push({fieldName:readLatin1String(fieldName),getterReturnType:getterReturnType,getter:requireFunction(getterSignature,getter),getterContext:getterContext,setterArgumentType:setterArgumentType,setter:requireFunction(setterSignature,setter),setterContext:setterContext});}function ClassHandle_isAliasOf(other){if(!(this instanceof ClassHandle)){return false;}if(!(other instanceof ClassHandle)){return false;}var leftClass=this.$$.ptrType.registeredClass;var left=this.$$.ptr;var rightClass=other.$$.ptrType.registeredClass;var right=other.$$.ptr;while(leftClass.baseClass){left=leftClass.upcast(left);leftClass=leftClass.baseClass;}while(rightClass.baseClass){right=rightClass.upcast(right);rightClass=rightClass.baseClass;}return leftClass===rightClass&&left===right;}function shallowCopyInternalPointer(o){return{count:o.count,deleteScheduled:o.deleteScheduled,preservePointerOnDelete:o.preservePointerOnDelete,ptr:o.ptr,ptrType:o.ptrType,smartPtr:o.smartPtr,smartPtrType:o.smartPtrType};}function throwInstanceAlreadyDeleted(obj){function getInstanceTypeName(handle){return handle.$$.ptrType.registeredClass.name;}throwBindingError(getInstanceTypeName(obj)+" instance already deleted");}function ClassHandle_clone(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this);}if(this.$$.preservePointerOnDelete){this.$$.count.value+=1;return this;}else{var clone=Object.create(Object.getPrototypeOf(this),{$$:{value:shallowCopyInternalPointer(this.$$)}});clone.$$.count.value+=1;clone.$$.deleteScheduled=false;return clone;}}function runDestructor(handle){var $$=handle.$$;if($$.smartPtr){$$.smartPtrType.rawDestructor($$.smartPtr);}else{$$.ptrType.registeredClass.rawDestructor($$.ptr);}}function ClassHandle_delete(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this);}if(this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete){throwBindingError("Object already scheduled for deletion");}this.$$.count.value-=1;var toDelete=0===this.$$.count.value;if(toDelete){runDestructor(this);}if(!this.$$.preservePointerOnDelete){this.$$.smartPtr=undefined;this.$$.ptr=undefined;}}function ClassHandle_isDeleted(){return!this.$$.ptr;}var delayFunction=undefined;var deletionQueue=[];function flushPendingDeletes(){while(deletionQueue.length){var obj=deletionQueue.pop();obj.$$.deleteScheduled=false;obj["delete"]();}}function ClassHandle_deleteLater(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this);}if(this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete){throwBindingError("Object already scheduled for deletion");}deletionQueue.push(this);if(deletionQueue.length===1&&delayFunction){delayFunction(flushPendingDeletes);}this.$$.deleteScheduled=true;return this;}function init_ClassHandle(){ClassHandle.prototype["isAliasOf"]=ClassHandle_isAliasOf;ClassHandle.prototype["clone"]=ClassHandle_clone;ClassHandle.prototype["delete"]=ClassHandle_delete;ClassHandle.prototype["isDeleted"]=ClassHandle_isDeleted;ClassHandle.prototype["deleteLater"]=ClassHandle_deleteLater;}function ClassHandle(){}var registeredPointers={};function RegisteredClass(name,constructor,instancePrototype,rawDestructor,baseClass,getActualType,upcast,downcast){this.name=name;this.constructor=constructor;this.instancePrototype=instancePrototype;this.rawDestructor=rawDestructor;this.baseClass=baseClass;this.getActualType=getActualType;this.upcast=upcast;this.downcast=downcast;this.pureVirtualFunctions=[];}function constNoSmartPtrRawPointerToWireType(destructors,handle){if(handle===null){if(this.isReference){throwBindingError("null is not a valid "+this.name);}return 0;}if(!handle.$$){throwBindingError('Cannot pass "'+_embind_repr(handle)+'" as a '+this.name);}if(!handle.$$.ptr){throwBindingError("Cannot pass deleted object as a pointer of type "+this.name);}var handleClass=handle.$$.ptrType.registeredClass;var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);return ptr;}function genericPointerToWireType(destructors,handle){if(handle===null){if(this.isReference){throwBindingError("null is not a valid "+this.name);}if(this.isSmartPointer){var ptr=this.rawConstructor();if(destructors!==null){destructors.push(this.rawDestructor,ptr);}return ptr;}else{return 0;}}if(!handle.$$){throwBindingError('Cannot pass "'+_embind_repr(handle)+'" as a '+this.name);}if(!handle.$$.ptr){throwBindingError("Cannot pass deleted object as a pointer of type "+this.name);}if(!this.isConst&&handle.$$.ptrType.isConst){throwBindingError("Cannot convert argument of type "+(handle.$$.smartPtrType?handle.$$.smartPtrType.name:handle.$$.ptrType.name)+" to parameter type "+this.name);}var handleClass=handle.$$.ptrType.registeredClass;var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);if(this.isSmartPointer){if(undefined===handle.$$.smartPtr){throwBindingError("Passing raw pointer to smart pointer is illegal");}switch(this.sharingPolicy){case 0:if(handle.$$.smartPtrType===this){ptr=handle.$$.smartPtr;}else{throwBindingError("Cannot convert argument of type "+(handle.$$.smartPtrType?handle.$$.smartPtrType.name:handle.$$.ptrType.name)+" to parameter type "+this.name);}break;case 1:ptr=handle.$$.smartPtr;break;case 2:if(handle.$$.smartPtrType===this){ptr=handle.$$.smartPtr;}else{var clonedHandle=handle["clone"]();ptr=this.rawShare(ptr,__emval_register(function(){clonedHandle["delete"]();}));if(destructors!==null){destructors.push(this.rawDestructor,ptr);}}break;default:throwBindingError("Unsupporting sharing policy");}}return ptr;}function nonConstNoSmartPtrRawPointerToWireType(destructors,handle){if(handle===null){if(this.isReference){throwBindingError("null is not a valid "+this.name);}return 0;}if(!handle.$$){throwBindingError('Cannot pass "'+_embind_repr(handle)+'" as a '+this.name);}if(!handle.$$.ptr){throwBindingError("Cannot pass deleted object as a pointer of type "+this.name);}if(handle.$$.ptrType.isConst){throwBindingError("Cannot convert argument of type "+handle.$$.ptrType.name+" to parameter type "+this.name);}var handleClass=handle.$$.ptrType.registeredClass;var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);return ptr;}function RegisteredPointer_getPointee(ptr){if(this.rawGetPointee){ptr=this.rawGetPointee(ptr);}return ptr;}function RegisteredPointer_destructor(ptr){if(this.rawDestructor){this.rawDestructor(ptr);}}function RegisteredPointer_deleteObject(handle){if(handle!==null){handle["delete"]();}}function downcastPointer(ptr,ptrClass,desiredClass){if(ptrClass===desiredClass){return ptr;}if(undefined===desiredClass.baseClass){return null;}var rv=downcastPointer(ptr,ptrClass,desiredClass.baseClass);if(rv===null){return null;}return desiredClass.downcast(rv);}function getInheritedInstanceCount(){return Object.keys(registeredInstances).length;}function getLiveInheritedInstances(){var rv=[];for(var k in registeredInstances){if(registeredInstances.hasOwnProperty(k)){rv.push(registeredInstances[k]);}}return rv;}function setDelayFunction(fn){delayFunction=fn;if(deletionQueue.length&&delayFunction){delayFunction(flushPendingDeletes);}}function init_embind(){Module["getInheritedInstanceCount"]=getInheritedInstanceCount;Module["getLiveInheritedInstances"]=getLiveInheritedInstances;Module["flushPendingDeletes"]=flushPendingDeletes;Module["setDelayFunction"]=setDelayFunction;}var registeredInstances={};function getBasestPointer(class_,ptr){if(ptr===undefined){throwBindingError("ptr should not be undefined");}while(class_.baseClass){ptr=class_.upcast(ptr);class_=class_.baseClass;}return ptr;}function getInheritedInstance(class_,ptr){ptr=getBasestPointer(class_,ptr);return registeredInstances[ptr];}function makeClassHandle(prototype,record){if(!record.ptrType||!record.ptr){throwInternalError("makeClassHandle requires ptr and ptrType");}var hasSmartPtrType=!!record.smartPtrType;var hasSmartPtr=!!record.smartPtr;if(hasSmartPtrType!==hasSmartPtr){throwInternalError("Both smartPtrType and smartPtr must be specified");}record.count={value:1};return Object.create(prototype,{$$:{value:record}});}function RegisteredPointer_fromWireType(ptr){var rawPointer=this.getPointee(ptr);if(!rawPointer){this.destructor(ptr);return null;}var registeredInstance=getInheritedInstance(this.registeredClass,rawPointer);if(undefined!==registeredInstance){if(0===registeredInstance.$$.count.value){registeredInstance.$$.ptr=rawPointer;registeredInstance.$$.smartPtr=ptr;return registeredInstance["clone"]();}else{var rv=registeredInstance["clone"]();this.destructor(ptr);return rv;}}function makeDefaultHandle(){if(this.isSmartPointer){return makeClassHandle(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:rawPointer,smartPtrType:this,smartPtr:ptr});}else{return makeClassHandle(this.registeredClass.instancePrototype,{ptrType:this,ptr:ptr});}}var actualType=this.registeredClass.getActualType(rawPointer);var registeredPointerRecord=registeredPointers[actualType];if(!registeredPointerRecord){return makeDefaultHandle.call(this);}var toType;if(this.isConst){toType=registeredPointerRecord.constPointerType;}else{toType=registeredPointerRecord.pointerType;}var dp=downcastPointer(rawPointer,this.registeredClass,toType.registeredClass);if(dp===null){return makeDefaultHandle.call(this);}if(this.isSmartPointer){return makeClassHandle(toType.registeredClass.instancePrototype,{ptrType:toType,ptr:dp,smartPtrType:this,smartPtr:ptr});}else{return makeClassHandle(toType.registeredClass.instancePrototype,{ptrType:toType,ptr:dp});}}function init_RegisteredPointer(){RegisteredPointer.prototype.getPointee=RegisteredPointer_getPointee;RegisteredPointer.prototype.destructor=RegisteredPointer_destructor;RegisteredPointer.prototype["argPackAdvance"]=8;RegisteredPointer.prototype["readValueFromPointer"]=simpleReadValueFromPointer;RegisteredPointer.prototype["deleteObject"]=RegisteredPointer_deleteObject;RegisteredPointer.prototype["fromWireType"]=RegisteredPointer_fromWireType;}function RegisteredPointer(name,registeredClass,isReference,isConst,isSmartPointer,pointeeType,sharingPolicy,rawGetPointee,rawConstructor,rawShare,rawDestructor){this.name=name;this.registeredClass=registeredClass;this.isReference=isReference;this.isConst=isConst;this.isSmartPointer=isSmartPointer;this.pointeeType=pointeeType;this.sharingPolicy=sharingPolicy;this.rawGetPointee=rawGetPointee;this.rawConstructor=rawConstructor;this.rawShare=rawShare;this.rawDestructor=rawDestructor;if(!isSmartPointer&&registeredClass.baseClass===undefined){if(isConst){this["toWireType"]=constNoSmartPtrRawPointerToWireType;this.destructorFunction=null;}else{this["toWireType"]=nonConstNoSmartPtrRawPointerToWireType;this.destructorFunction=null;}}else{this["toWireType"]=genericPointerToWireType;}}function replacePublicSymbol(name,value,numArguments){if(!Module.hasOwnProperty(name)){throwInternalError("Replacing nonexistant public symbol");}if(undefined!==Module[name].overloadTable&&undefined!==numArguments){Module[name].overloadTable[numArguments]=value;}else{Module[name]=value;}}function __embind_register_class(rawType,rawPointerType,rawConstPointerType,baseClassRawType,getActualTypeSignature,getActualType,upcastSignature,upcast,downcastSignature,downcast,name,destructorSignature,rawDestructor){name=readLatin1String(name);getActualType=requireFunction(getActualTypeSignature,getActualType);if(upcast){upcast=requireFunction(upcastSignature,upcast);}if(downcast){downcast=requireFunction(downcastSignature,downcast);}rawDestructor=requireFunction(destructorSignature,rawDestructor);var legalFunctionName=makeLegalFunctionName(name);exposePublicSymbol(legalFunctionName,function(){throwUnboundTypeError("Cannot construct "+name+" due to unbound types",[baseClassRawType]);});whenDependentTypesAreResolved([rawType,rawPointerType,rawConstPointerType],baseClassRawType?[baseClassRawType]:[],function(base){base=base[0];var baseClass;var basePrototype;if(baseClassRawType){baseClass=base.registeredClass;basePrototype=baseClass.instancePrototype;}else{basePrototype=ClassHandle.prototype;}var constructor=createNamedFunction(legalFunctionName,function(){if(Object.getPrototypeOf(this)!==instancePrototype){throw new BindingError("Use 'new' to construct "+name);}if(undefined===registeredClass.constructor_body){throw new BindingError(name+" has no accessible constructor");}var body=registeredClass.constructor_body[arguments.length];if(undefined===body){throw new BindingError("Tried to invoke ctor of "+name+" with invalid number of parameters ("+arguments.length+") - expected ("+Object.keys(registeredClass.constructor_body).toString()+") parameters instead!");}return body.apply(this,arguments);});var instancePrototype=Object.create(basePrototype,{constructor:{value:constructor}});constructor.prototype=instancePrototype;var registeredClass=new RegisteredClass(name,constructor,instancePrototype,rawDestructor,baseClass,getActualType,upcast,downcast);var referenceConverter=new RegisteredPointer(name,registeredClass,true,false,false);var pointerConverter=new RegisteredPointer(name+"*",registeredClass,false,false,false);var constPointerConverter=new RegisteredPointer(name+" const*",registeredClass,false,true,false);registeredPointers[rawType]={pointerType:pointerConverter,constPointerType:constPointerConverter};replacePublicSymbol(legalFunctionName,constructor);return[referenceConverter,pointerConverter,constPointerConverter];});}function _glBindFramebuffer(target,framebuffer){GLctx.bindFramebuffer(target,framebuffer?GL.framebuffers[framebuffer]:null);}function ___lock(){}function ___unlock(){}var PTHREAD_SPECIFIC={};function _pthread_getspecific(key){return PTHREAD_SPECIFIC[key]||0;}function _glEnable(x0){GLctx["enable"](x0);}function _glUniform4fv(location,count,value){location=GL.uniforms[location];var view;if(4*count<=GL.MINI_TEMP_BUFFER_SIZE){view=GL.miniTempBufferViews[4*count-1];for(var i=0;i<4*count;i+=4){view[i]=HEAPF32[value+4*i>>2];view[i+1]=HEAPF32[value+(4*i+4)>>2];view[i+2]=HEAPF32[value+(4*i+8)>>2];view[i+3]=HEAPF32[value+(4*i+12)>>2];}}else{view=HEAPF32.subarray(value>>2,value+count*16>>2);}GLctx.uniform4fv(location,view);}function _glDeleteFramebuffers(n,framebuffers){for(var i=0;i<n;++i){var id=HEAP32[framebuffers+i*4>>2];var framebuffer=GL.framebuffers[id];if(!framebuffer)continue;GLctx.deleteFramebuffer(framebuffer);framebuffer.name=0;GL.framebuffers[id]=null;}}function _embind_repr(v){if(v===null){return"null";}var t=typeof v;if(t==="object"||t==="array"||t==="function"){return v.toString();}else{return""+v;}}function integerReadValueFromPointer(name,shift,signed){switch(shift){case 0:return signed?function readS8FromPointer(pointer){return HEAP8[pointer];}:function readU8FromPointer(pointer){return HEAPU8[pointer];};case 1:return signed?function readS16FromPointer(pointer){return HEAP16[pointer>>1];}:function readU16FromPointer(pointer){return HEAPU16[pointer>>1];};case 2:return signed?function readS32FromPointer(pointer){return HEAP32[pointer>>2];}:function readU32FromPointer(pointer){return HEAPU32[pointer>>2];};default:throw new TypeError("Unknown integer type: "+name);}}function __embind_register_integer(primitiveType,name,size,minRange,maxRange){name=readLatin1String(name);if(maxRange===-1){maxRange=4294967295;}var shift=getShiftFromSize(size);var fromWireType=function(value){return value;};if(minRange===0){var bitshift=32-8*size;fromWireType=function(value){return value<<bitshift>>>bitshift;};}registerType(primitiveType,{name:name,"fromWireType":fromWireType,"toWireType":function(destructors,value){if(typeof value!=="number"&&typeof value!=="boolean"){throw new TypeError('Cannot convert "'+_embind_repr(value)+'" to '+this.name);}if(value<minRange||value>maxRange){throw new TypeError('Passing a number "'+_embind_repr(value)+'" from JS side to C/C++ side to an argument of type "'+name+'", which is outside the valid range ['+minRange+", "+maxRange+"]!");}return value|0;},"argPackAdvance":8,"readValueFromPointer":integerReadValueFromPointer(name,shift,minRange!==0),destructorFunction:null});}function _glGenBuffers(n,buffers){for(var i=0;i<n;i++){var buffer=GLctx.createBuffer();if(!buffer){GL.recordError(1282);while(i<n)HEAP32[buffers+i++*4>>2]=0;return;}var id=GL.getNewId(GL.buffers);buffer.name=id;GL.buffers[id]=buffer;HEAP32[buffers+i*4>>2]=id;}}function _glDeleteProgram(id){if(!id)return;var program=GL.programs[id];if(!program){GL.recordError(1281);return;}GLctx.deleteProgram(program);program.name=0;GL.programs[id]=null;GL.programInfos[id]=null;}var emval_free_list=[];var emval_handle_array=[{},{value:undefined},{value:null},{value:true},{value:false}];function __emval_decref(handle){if(handle>4&&0===--emval_handle_array[handle].refcount){emval_handle_array[handle]=undefined;emval_free_list.push(handle);}}function count_emval_handles(){var count=0;for(var i=5;i<emval_handle_array.length;++i){if(emval_handle_array[i]!==undefined){++count;}}return count;}function get_first_emval(){for(var i=5;i<emval_handle_array.length;++i){if(emval_handle_array[i]!==undefined){return emval_handle_array[i];}}return null;}function init_emval(){Module["count_emval_handles"]=count_emval_handles;Module["get_first_emval"]=get_first_emval;}function __emval_register(value){switch(value){case undefined:{return 1;};case null:{return 2;};case true:{return 3;};case false:{return 4;};default:{var handle=emval_free_list.length?emval_free_list.pop():emval_handle_array.length;emval_handle_array[handle]={refcount:1,value:value};return handle;}}}function __embind_register_emval(rawType,name){name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":function(handle){var rv=emval_handle_array[handle].value;__emval_decref(handle);return rv;},"toWireType":function(destructors,value){return __emval_register(value);},"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:null});}function _glGetAttribLocation(program,name){program=GL.programs[program];name=Pointer_stringify(name);return GLctx.getAttribLocation(program,name);}var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};function _pthread_setspecific(key,value){if(!(key in PTHREAD_SPECIFIC)){return ERRNO_CODES.EINVAL;}PTHREAD_SPECIFIC[key]=value;return 0;}function _glRenderbufferStorage(x0,x1,x2,x3){GLctx["renderbufferStorage"](x0,x1,x2,x3);}function _glAttachShader(program,shader){GLctx.attachShader(GL.programs[program],GL.shaders[shader]);}function ___cxa_allocate_exception(size){return _malloc(size);}function _glDeleteShader(id){if(!id)return;var shader=GL.shaders[id];if(!shader){GL.recordError(1281);return;}GLctx.deleteShader(shader);GL.shaders[id]=null;}function _glViewport(x0,x1,x2,x3){GLctx["viewport"](x0,x1,x2,x3);}function _glCreateProgram(){var id=GL.getNewId(GL.programs);var program=GLctx.createProgram();program.name=id;GL.programs[id]=program;return id;}function ___cxa_pure_virtual(){ABORT=true;throw"Pure virtual function called!";}function _glPixelStorei(pname,param){if(pname==3333){GL.packAlignment=param;}else if(pname==3317){GL.unpackAlignment=param;}GLctx.pixelStorei(pname,param);}function _glCheckFramebufferStatus(x0){return GLctx["checkFramebufferStatus"](x0);}function floatReadValueFromPointer(name,shift){switch(shift){case 2:return function(pointer){return this["fromWireType"](HEAPF32[pointer>>2]);};case 3:return function(pointer){return this["fromWireType"](HEAPF64[pointer>>3]);};default:throw new TypeError("Unknown float type: "+name);}}function __embind_register_float(rawType,name,size){var shift=getShiftFromSize(size);name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":function(value){return value;},"toWireType":function(destructors,value){if(typeof value!=="number"&&typeof value!=="boolean"){throw new TypeError('Cannot convert "'+_embind_repr(value)+'" to '+this.name);}return value;},"argPackAdvance":8,"readValueFromPointer":floatReadValueFromPointer(name,shift),destructorFunction:null});}function _glDrawElements(mode,count,type,indices){GLctx.drawElements(mode,count,type,indices);}function ___cxa_begin_catch(ptr){var info=EXCEPTIONS.infos[ptr];if(info&&!info.caught){info.caught=true;__ZSt18uncaught_exceptionv.uncaught_exception--;}EXCEPTIONS.caught.push(ptr);EXCEPTIONS.addRef(EXCEPTIONS.deAdjust(ptr));return ptr;}function _glShaderSource(shader,count,string,length){var source=GL.getSource(shader,count,string,length);GLctx.shaderSource(GL.shaders[shader],source);}function _glUniformMatrix4fv(location,count,transpose,value){location=GL.uniforms[location];var view;if(16*count<=GL.MINI_TEMP_BUFFER_SIZE){view=GL.miniTempBufferViews[16*count-1];for(var i=0;i<16*count;i+=16){view[i]=HEAPF32[value+4*i>>2];view[i+1]=HEAPF32[value+(4*i+4)>>2];view[i+2]=HEAPF32[value+(4*i+8)>>2];view[i+3]=HEAPF32[value+(4*i+12)>>2];view[i+4]=HEAPF32[value+(4*i+16)>>2];view[i+5]=HEAPF32[value+(4*i+20)>>2];view[i+6]=HEAPF32[value+(4*i+24)>>2];view[i+7]=HEAPF32[value+(4*i+28)>>2];view[i+8]=HEAPF32[value+(4*i+32)>>2];view[i+9]=HEAPF32[value+(4*i+36)>>2];view[i+10]=HEAPF32[value+(4*i+40)>>2];view[i+11]=HEAPF32[value+(4*i+44)>>2];view[i+12]=HEAPF32[value+(4*i+48)>>2];view[i+13]=HEAPF32[value+(4*i+52)>>2];view[i+14]=HEAPF32[value+(4*i+56)>>2];view[i+15]=HEAPF32[value+(4*i+60)>>2];}}else{view=HEAPF32.subarray(value>>2,value+count*64>>2);}GLctx.uniformMatrix4fv(location,transpose,view);}function ___syscall6(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD();FS.close(stream);return 0;}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno;}}Module["___udivdi3"]=___udivdi3;function _glGetProgramInfoLog(program,maxLength,length,infoLog){var log=GLctx.getProgramInfoLog(GL.programs[program]);if(log===null)log="(unknown error)";if(maxLength>0&&infoLog){var numBytesWrittenExclNull=stringToUTF8(log,infoLog,maxLength);if(length)HEAP32[length>>2]=numBytesWrittenExclNull;}else{if(length)HEAP32[length>>2]=0;}}function _glTexParameteri(x0,x1,x2){GLctx["texParameteri"](x0,x1,x2);}function _pthread_once(ptr,func){if(!_pthread_once.seen)_pthread_once.seen={};if(ptr in _pthread_once.seen)return;Runtime.dynCall("v",func);_pthread_once.seen[ptr]=1;}function heap32VectorToArray(count,firstElement){var array=[];for(var i=0;i<count;i++){array.push(HEAP32[(firstElement>>2)+i]);}return array;}function __embind_register_class_constructor(rawClassType,argCount,rawArgTypesAddr,invokerSignature,invoker,rawConstructor){var rawArgTypes=heap32VectorToArray(argCount,rawArgTypesAddr);invoker=requireFunction(invokerSignature,invoker);whenDependentTypesAreResolved([],[rawClassType],function(classType){classType=classType[0];var humanName="constructor "+classType.name;if(undefined===classType.registeredClass.constructor_body){classType.registeredClass.constructor_body=[];}if(undefined!==classType.registeredClass.constructor_body[argCount-1]){throw new BindingError("Cannot register multiple constructors with identical number of parameters ("+(argCount-1)+") for class '"+classType.name+"'! Overload resolution is currently only performed using the parameter count, not actual type info!");}classType.registeredClass.constructor_body[argCount-1]=function unboundTypeHandler(){throwUnboundTypeError("Cannot construct "+classType.name+" due to unbound types",rawArgTypes);};whenDependentTypesAreResolved([],rawArgTypes,function(argTypes){classType.registeredClass.constructor_body[argCount-1]=function constructor_body(){if(arguments.length!==argCount-1){throwBindingError(humanName+" called with "+arguments.length+" arguments, expected "+(argCount-1));}var destructors=[];var args=new Array(argCount);args[0]=rawConstructor;for(var i=1;i<argCount;++i){args[i]=argTypes[i]["toWireType"](destructors,arguments[i-1]);}var ptr=invoker.apply(null,args);runDestructors(destructors);return argTypes[0]["fromWireType"](ptr);};return[];});return[];});}var PTHREAD_SPECIFIC_NEXT_KEY=1;function _pthread_key_create(key,destructor){if(key==0){return ERRNO_CODES.EINVAL;}HEAP32[key>>2]=PTHREAD_SPECIFIC_NEXT_KEY;PTHREAD_SPECIFIC[PTHREAD_SPECIFIC_NEXT_KEY]=0;PTHREAD_SPECIFIC_NEXT_KEY++;return 0;}function _glGetShaderiv(shader,pname,p){if(!p){GL.recordError(1281);return;}if(pname==35716){var log=GLctx.getShaderInfoLog(GL.shaders[shader]);if(log===null)log="(unknown error)";HEAP32[p>>2]=log.length+1;}else{HEAP32[p>>2]=GLctx.getShaderParameter(GL.shaders[shader],pname);}}Module["_pthread_self"]=_pthread_self;function ___syscall140(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD(),offset_high=SYSCALLS.get(),offset_low=SYSCALLS.get(),result=SYSCALLS.get(),whence=SYSCALLS.get();var offset=offset_low;assert(offset_high===0);FS.llseek(stream,offset,whence);HEAP32[result>>2]=stream.position;if(stream.getdents&&offset===0&&whence===0)stream.getdents=null;return 0;}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno;}}function ___syscall146(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.get(),iov=SYSCALLS.get(),iovcnt=SYSCALLS.get();var ret=0;if(!___syscall146.buffer){___syscall146.buffers=[null,[],[]];___syscall146.printChar=function(stream,curr){var buffer=___syscall146.buffers[stream];assert(buffer);if(curr===0||curr===10){(stream===1?Module["print"]:Module["printErr"])(UTF8ArrayToString(buffer,0));buffer.length=0;}else{buffer.push(curr);}};}for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov+i*8>>2];var len=HEAP32[iov+(i*8+4)>>2];for(var j=0;j<len;j++){___syscall146.printChar(stream,HEAPU8[ptr+j]);}ret+=len;}return ret;}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno;}}function new_(constructor,argumentList){if(!(constructor instanceof Function)){throw new TypeError("new_ called with constructor type "+typeof constructor+" which is not a function");}var dummy=createNamedFunction(constructor.name||"unknownFunctionName",function(){});dummy.prototype=constructor.prototype;var obj=new dummy();var r=constructor.apply(obj,argumentList);return r instanceof Object?r:obj;}function craftInvokerFunction(humanName,argTypes,classType,cppInvokerFunc,cppTargetFunc){var argCount=argTypes.length;if(argCount<2){throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");}var isClassMethodFunc=argTypes[1]!==null&&classType!==null;var argsList="";var argsListWired="";for(var i=0;i<argCount-2;++i){argsList+=(i!==0?", ":"")+"arg"+i;argsListWired+=(i!==0?", ":"")+"arg"+i+"Wired";}var invokerFnBody="return function "+makeLegalFunctionName(humanName)+"("+argsList+") {\n"+"if (arguments.length !== "+(argCount-2)+") {\n"+"throwBindingError('function "+humanName+" called with ' + arguments.length + ' arguments, expected "+(argCount-2)+" args!');\n"+"}\n";var needsDestructorStack=false;for(var i=1;i<argTypes.length;++i){if(argTypes[i]!==null&&argTypes[i].destructorFunction===undefined){needsDestructorStack=true;break;}}if(needsDestructorStack){invokerFnBody+="var destructors = [];\n";}var dtorStack=needsDestructorStack?"destructors":"null";var args1=["throwBindingError","invoker","fn","runDestructors","retType","classParam"];var args2=[throwBindingError,cppInvokerFunc,cppTargetFunc,runDestructors,argTypes[0],argTypes[1]];if(isClassMethodFunc){invokerFnBody+="var thisWired = classParam.toWireType("+dtorStack+", this);\n";}for(var i=0;i<argCount-2;++i){invokerFnBody+="var arg"+i+"Wired = argType"+i+".toWireType("+dtorStack+", arg"+i+"); // "+argTypes[i+2].name+"\n";args1.push("argType"+i);args2.push(argTypes[i+2]);}if(isClassMethodFunc){argsListWired="thisWired"+(argsListWired.length>0?", ":"")+argsListWired;}var returns=argTypes[0].name!=="void";invokerFnBody+=(returns?"var rv = ":"")+"invoker(fn"+(argsListWired.length>0?", ":"")+argsListWired+");\n";if(needsDestructorStack){invokerFnBody+="runDestructors(destructors);\n";}else{for(var i=isClassMethodFunc?1:2;i<argTypes.length;++i){var paramName=i===1?"thisWired":"arg"+(i-2)+"Wired";if(argTypes[i].destructorFunction!==null){invokerFnBody+=paramName+"_dtor("+paramName+"); // "+argTypes[i].name+"\n";args1.push(paramName+"_dtor");args2.push(argTypes[i].destructorFunction);}}}if(returns){invokerFnBody+="var ret = retType.fromWireType(rv);\n"+"return ret;\n";}else{}invokerFnBody+="}\n";args1.push(invokerFnBody);var invokerFunction=new_(Function,args1).apply(null,args2);return invokerFunction;}function __embind_register_class_function(rawClassType,methodName,argCount,rawArgTypesAddr,invokerSignature,rawInvoker,context,isPureVirtual){var rawArgTypes=heap32VectorToArray(argCount,rawArgTypesAddr);methodName=readLatin1String(methodName);rawInvoker=requireFunction(invokerSignature,rawInvoker);whenDependentTypesAreResolved([],[rawClassType],function(classType){classType=classType[0];var humanName=classType.name+"."+methodName;if(isPureVirtual){classType.registeredClass.pureVirtualFunctions.push(methodName);}function unboundTypesHandler(){throwUnboundTypeError("Cannot call "+humanName+" due to unbound types",rawArgTypes);}var proto=classType.registeredClass.instancePrototype;var method=proto[methodName];if(undefined===method||undefined===method.overloadTable&&method.className!==classType.name&&method.argCount===argCount-2){unboundTypesHandler.argCount=argCount-2;unboundTypesHandler.className=classType.name;proto[methodName]=unboundTypesHandler;}else{ensureOverloadTable(proto,methodName,humanName);proto[methodName].overloadTable[argCount-2]=unboundTypesHandler;}whenDependentTypesAreResolved([],rawArgTypes,function(argTypes){var memberFunction=craftInvokerFunction(humanName,argTypes,classType,rawInvoker,context);if(undefined===proto[methodName].overloadTable){proto[methodName]=memberFunction;}else{proto[methodName].overloadTable[argCount-2]=memberFunction;}return[];});return[];});}var GLctx;GL.init();embind_init_charCodes();BindingError=Module["BindingError"]=extendError(Error,"BindingError");InternalError=Module["InternalError"]=extendError(Error,"InternalError");UnboundTypeError=Module["UnboundTypeError"]=extendError(Error,"UnboundTypeError");init_ClassHandle();init_RegisteredPointer();init_embind();init_emval();__ATEXIT__.push(function(){var fflush=Module["_fflush"];if(fflush)fflush(0);var printChar=___syscall146.printChar;if(!printChar)return;var buffers=___syscall146.buffers;if(buffers[1].length)printChar(1,10);if(buffers[2].length)printChar(2,10);});DYNAMICTOP_PTR=allocate(1,"i32",ALLOC_STATIC);STACK_BASE=STACKTOP=Runtime.alignMemory(STATICTOP);STACK_MAX=STACK_BASE+TOTAL_STACK;DYNAMIC_BASE=Runtime.alignMemory(STACK_MAX);HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE;staticSealed=true;function invoke_viiiii(index,a1,a2,a3,a4,a5){try{Module["dynCall_viiiii"](index,a1,a2,a3,a4,a5);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0);}}function invoke_vid(index,a1,a2){try{Module["dynCall_vid"](index,a1,a2);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0);}}function invoke_vi(index,a1){try{Module["dynCall_vi"](index,a1);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0);}}function invoke_vii(index,a1,a2){try{Module["dynCall_vii"](index,a1,a2);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0);}}function invoke_iiiiiii(index,a1,a2,a3,a4,a5,a6){try{return Module["dynCall_iiiiiii"](index,a1,a2,a3,a4,a5,a6);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0);}}function invoke_ii(index,a1){try{return Module["dynCall_ii"](index,a1);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0);}}function invoke_iiiidii(index,a1,a2,a3,a4,a5,a6){try{return Module["dynCall_iiiidii"](index,a1,a2,a3,a4,a5,a6);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0);}}function invoke_iiii(index,a1,a2,a3){try{return Module["dynCall_iiii"](index,a1,a2,a3);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0);}}function invoke_viiiiidi(index,a1,a2,a3,a4,a5,a6,a7){try{Module["dynCall_viiiiidi"](index,a1,a2,a3,a4,a5,a6,a7);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0);}}function invoke_viiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8){try{Module["dynCall_viiiiiiii"](index,a1,a2,a3,a4,a5,a6,a7,a8);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0);}}function invoke_viiiiii(index,a1,a2,a3,a4,a5,a6){try{Module["dynCall_viiiiii"](index,a1,a2,a3,a4,a5,a6);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0);}}function invoke_iiid(index,a1,a2,a3){try{return Module["dynCall_iiid"](index,a1,a2,a3);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0);}}function invoke_di(index,a1){try{return Module["dynCall_di"](index,a1);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0);}}function invoke_vidddd(index,a1,a2,a3,a4,a5){try{Module["dynCall_vidddd"](index,a1,a2,a3,a4,a5);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0);}}function invoke_iid(index,a1,a2){try{return Module["dynCall_iid"](index,a1,a2);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0);}}function invoke_viiiiiii(index,a1,a2,a3,a4,a5,a6,a7){try{Module["dynCall_viiiiiii"](index,a1,a2,a3,a4,a5,a6,a7);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0);}}function invoke_viiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10){try{Module["dynCall_viiiiiiiiii"](index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0);}}function invoke_iii(index,a1,a2){try{return Module["dynCall_iii"](index,a1,a2);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0);}}function invoke_viidii(index,a1,a2,a3,a4,a5){try{Module["dynCall_viidii"](index,a1,a2,a3,a4,a5);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0);}}function invoke_dii(index,a1,a2){try{return Module["dynCall_dii"](index,a1,a2);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0);}}function invoke_i(index){try{return Module["dynCall_i"](index);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0);}}function invoke_iiiii(index,a1,a2,a3,a4){try{return Module["dynCall_iiiii"](index,a1,a2,a3,a4);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0);}}function invoke_viii(index,a1,a2,a3){try{Module["dynCall_viii"](index,a1,a2,a3);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0);}}function invoke_v(index){try{Module["dynCall_v"](index);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0);}}function invoke_viid(index,a1,a2,a3){try{Module["dynCall_viid"](index,a1,a2,a3);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0);}}function invoke_iiiid(index,a1,a2,a3,a4){try{return Module["dynCall_iiiid"](index,a1,a2,a3,a4);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0);}}function invoke_viiii(index,a1,a2,a3,a4){try{Module["dynCall_viiii"](index,a1,a2,a3,a4);}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0);}}Module.asmGlobalArg={"Math":Math,"Int8Array":Int8Array,"Int16Array":Int16Array,"Int32Array":Int32Array,"Uint8Array":Uint8Array,"Uint16Array":Uint16Array,"Uint32Array":Uint32Array,"Float32Array":Float32Array,"Float64Array":Float64Array,"NaN":NaN,"Infinity":Infinity,"byteLength":byteLength};Module.asmLibraryArg={"abort":abort,"assert":assert,"enlargeMemory":enlargeMemory,"getTotalMemory":getTotalMemory,"abortOnCannotGrowMemory":abortOnCannotGrowMemory,"invoke_viiiii":invoke_viiiii,"invoke_vid":invoke_vid,"invoke_vi":invoke_vi,"invoke_vii":invoke_vii,"invoke_iiiiiii":invoke_iiiiiii,"invoke_ii":invoke_ii,"invoke_iiiidii":invoke_iiiidii,"invoke_iiii":invoke_iiii,"invoke_viiiiidi":invoke_viiiiidi,"invoke_viiiiiiii":invoke_viiiiiiii,"invoke_viiiiii":invoke_viiiiii,"invoke_iiid":invoke_iiid,"invoke_di":invoke_di,"invoke_vidddd":invoke_vidddd,"invoke_iid":invoke_iid,"invoke_viiiiiii":invoke_viiiiiii,"invoke_viiiiiiiiii":invoke_viiiiiiiiii,"invoke_iii":invoke_iii,"invoke_viidii":invoke_viidii,"invoke_dii":invoke_dii,"invoke_i":invoke_i,"invoke_iiiii":invoke_iiiii,"invoke_viii":invoke_viii,"invoke_v":invoke_v,"invoke_viid":invoke_viid,"invoke_iiiid":invoke_iiiid,"invoke_viiii":invoke_viiii,"_glUseProgram":_glUseProgram,"_emscripten_asm_const_d":_emscripten_asm_const_d,"floatReadValueFromPointer":floatReadValueFromPointer,"simpleReadValueFromPointer":simpleReadValueFromPointer,"throwInternalError":throwInternalError,"get_first_emval":get_first_emval,"_glUniformMatrix4fv":_glUniformMatrix4fv,"getLiveInheritedInstances":getLiveInheritedInstances,"_glUniform2fv":_glUniform2fv,"___assert_fail":___assert_fail,"_glDeleteProgram":_glDeleteProgram,"__ZSt18uncaught_exceptionv":__ZSt18uncaught_exceptionv,"ClassHandle":ClassHandle,"_emscripten_asm_const_ii":_emscripten_asm_const_ii,"getShiftFromSize":getShiftFromSize,"_glBindBuffer":_glBindBuffer,"_glGetShaderInfoLog":_glGetShaderInfoLog,"_llvm_pow_f32":_llvm_pow_f32,"_glGetAttribLocation":_glGetAttribLocation,"_glDisableVertexAttribArray":_glDisableVertexAttribArray,"___cxa_begin_catch":___cxa_begin_catch,"_uuid_generate":_uuid_generate,"runDestructor":runDestructor,"throwInstanceAlreadyDeleted":throwInstanceAlreadyDeleted,"RegisteredPointer_fromWireType":RegisteredPointer_fromWireType,"__embind_register_class_constructor":__embind_register_class_constructor,"emscriptenWebGLComputeImageSize":emscriptenWebGLComputeImageSize,"init_RegisteredPointer":init_RegisteredPointer,"___lock":___lock,"ClassHandle_isAliasOf":ClassHandle_isAliasOf,"_glUniform4fv":_glUniform4fv,"flushPendingDeletes":flushPendingDeletes,"__embind_register_enum_value":__embind_register_enum_value,"makeClassHandle":makeClassHandle,"___resumeException":___resumeException,"whenDependentTypesAreResolved":whenDependentTypesAreResolved,"_glGenBuffers":_glGenBuffers,"_glShaderSource":_glShaderSource,"_glFramebufferRenderbuffer":_glFramebufferRenderbuffer,"_emscripten_asm_const_iiddidd":_emscripten_asm_const_iiddidd,"init_ClassHandle":init_ClassHandle,"_pthread_cleanup_push":_pthread_cleanup_push,"___syscall140":___syscall140,"constNoSmartPtrRawPointerToWireType":constNoSmartPtrRawPointerToWireType,"___syscall146":___syscall146,"_pthread_cleanup_pop":_pthread_cleanup_pop,"_glVertexAttribPointer":_glVertexAttribPointer,"__embind_register_std_wstring":__embind_register_std_wstring,"_glGetProgramInfoLog":_glGetProgramInfoLog,"RegisteredClass":RegisteredClass,"___cxa_find_matching_catch":___cxa_find_matching_catch,"__embind_register_value_object_field":__embind_register_value_object_field,"_glBindRenderbuffer":_glBindRenderbuffer,"_glDrawElements":_glDrawElements,"embind_init_charCodes":embind_init_charCodes,"_emscripten_asm_const_i":_emscripten_asm_const_i,"_glViewport":_glViewport,"___setErrNo":___setErrNo,"_glDeleteTextures":_glDeleteTextures,"__embind_register_bool":__embind_register_bool,"_emscripten_asm_const_v":_emscripten_asm_const_v,"createNamedFunction":createNamedFunction,"__embind_register_class_property":__embind_register_class_property,"__embind_register_emval":__embind_register_emval,"__embind_finalize_value_object":__embind_finalize_value_object,"__emval_decref":__emval_decref,"_glEnable":_glEnable,"_glGenTextures":_glGenTextures,"_glGetIntegerv":_glGetIntegerv,"init_embind":init_embind,"ClassHandle_clone":ClassHandle_clone,"emscriptenWebGLGet":emscriptenWebGLGet,"_glAttachShader":_glAttachShader,"ClassHandle_delete":ClassHandle_delete,"_glCreateProgram":_glCreateProgram,"RegisteredPointer_destructor":RegisteredPointer_destructor,"emscriptenWebGLGetTexPixelData":emscriptenWebGLGetTexPixelData,"___syscall6":___syscall6,"ensureOverloadTable":ensureOverloadTable,"_glBindFramebuffer":_glBindFramebuffer,"_glDetachShader":_glDetachShader,"new_":new_,"_glGenFramebuffers":_glGenFramebuffers,"downcastPointer":downcastPointer,"replacePublicSymbol":replacePublicSymbol,"__embind_register_class":__embind_register_class,"ClassHandle_deleteLater":ClassHandle_deleteLater,"_glDeleteFramebuffers":_glDeleteFramebuffers,"___syscall54":___syscall54,"RegisteredPointer_deleteObject":RegisteredPointer_deleteObject,"_glCheckFramebufferStatus":_glCheckFramebufferStatus,"ClassHandle_isDeleted":ClassHandle_isDeleted,"heap32VectorToArray":heap32VectorToArray,"__embind_register_integer":__embind_register_integer,"___cxa_allocate_exception":___cxa_allocate_exception,"_glBlendFuncSeparate":_glBlendFuncSeparate,"_emscripten_asm_const_dii":_emscripten_asm_const_dii,"_uuid_unparse":_uuid_unparse,"_glClearColor":_glClearColor,"_pthread_once":_pthread_once,"_glIsEnabled":_glIsEnabled,"_glBindTexture":_glBindTexture,"_glUniform1f":_glUniform1f,"__embind_register_value_object":__embind_register_value_object,"enumReadValueFromPointer":enumReadValueFromPointer,"getTypeName":getTypeName,"_pthread_getspecific":_pthread_getspecific,"_glReadPixels":_glReadPixels,"_emscripten_memcpy_big":_emscripten_memcpy_big,"_glGetError":_glGetError,"throwUnboundTypeError":throwUnboundTypeError,"craftInvokerFunction":craftInvokerFunction,"runDestructors":runDestructors,"requireRegisteredType":requireRegisteredType,"makeLegalFunctionName":makeLegalFunctionName,"_pthread_key_create":_pthread_key_create,"upcastPointer":upcastPointer,"init_emval":init_emval,"shallowCopyInternalPointer":shallowCopyInternalPointer,"_emscripten_asm_const_iii":_emscripten_asm_const_iii,"nonConstNoSmartPtrRawPointerToWireType":nonConstNoSmartPtrRawPointerToWireType,"_emscripten_asm_const_iiiiii":_emscripten_asm_const_iiiiii,"_uuid_unparse_lower":_uuid_unparse_lower,"genericPointerToWireType":genericPointerToWireType,"_glCompileShader":_glCompileShader,"_glEnableVertexAttribArray":_glEnableVertexAttribArray,"_abort":_abort,"throwBindingError":throwBindingError,"_glDeleteBuffers":_glDeleteBuffers,"_glBufferData":_glBufferData,"validateThis":validateThis,"_glTexImage2D":_glTexImage2D,"exposePublicSymbol":exposePublicSymbol,"__embind_register_std_string":__embind_register_std_string,"___cxa_pure_virtual":___cxa_pure_virtual,"_glDeleteShader":_glDeleteShader,"_glGetProgramiv":_glGetProgramiv,"__embind_register_memory_view":__embind_register_memory_view,"_emscripten_asm_const_iiiiiii":_emscripten_asm_const_iiiiiii,"getInheritedInstance":getInheritedInstance,"setDelayFunction":setDelayFunction,"___gxx_personality_v0":___gxx_personality_v0,"extendError":extendError,"_glDeleteRenderbuffers":_glDeleteRenderbuffers,"__embind_register_void":__embind_register_void,"_glDisable":_glDisable,"_glLinkProgram":_glLinkProgram,"_glGenRenderbuffers":_glGenRenderbuffers,"RegisteredPointer_getPointee":RegisteredPointer_getPointee,"__emval_register":__emval_register,"_glGetUniformLocation":_glGetUniformLocation,"_glClear":_glClear,"__embind_register_class_function":__embind_register_class_function,"_embind_repr":_embind_repr,"_glRenderbufferStorage":_glRenderbufferStorage,"RegisteredPointer":RegisteredPointer,"_glPixelStorei":_glPixelStorei,"_glGetShaderiv":_glGetShaderiv,"readLatin1String":readLatin1String,"getBasestPointer":getBasestPointer,"getInheritedInstanceCount":getInheritedInstanceCount,"__embind_register_float":__embind_register_float,"integerReadValueFromPointer":integerReadValueFromPointer,"___unlock":___unlock,"_glFramebufferTexture2D":_glFramebufferTexture2D,"_pthread_setspecific":_pthread_setspecific,"_emscripten_asm_const_iiii":_emscripten_asm_const_iiii,"registerType":registerType,"___cxa_throw":___cxa_throw,"__embind_register_enum":__embind_register_enum,"count_emval_handles":count_emval_handles,"requireFunction":requireFunction,"_glTexParameteri":_glTexParameteri,"_glCreateShader":_glCreateShader,"_glTexSubImage2D":_glTexSubImage2D,"STACKTOP":STACKTOP,"STACK_MAX":STACK_MAX,"DYNAMICTOP_PTR":DYNAMICTOP_PTR,"tempDoublePtr":tempDoublePtr,"ABORT":ABORT,"cttz_i8":cttz_i8};// EMSCRIPTEN_START_ASM
	var asm=function(global,env,buffer){"almost asm";var a=global.Int8Array;var b=global.Int16Array;var c=global.Int32Array;var d=global.Uint8Array;var e=global.Uint16Array;var f=global.Uint32Array;var g=global.Float32Array;var h=global.Float64Array;var i=new a(buffer);var j=new b(buffer);var k=new c(buffer);var l=new d(buffer);var m=new e(buffer);var n=new f(buffer);var o=new g(buffer);var p=new h(buffer);var q=global.byteLength;var r=env.STACKTOP|0;var s=env.STACK_MAX|0;var t=env.DYNAMICTOP_PTR|0;var u=env.tempDoublePtr|0;var v=env.ABORT|0;var w=env.cttz_i8|0;var x=0;var y=0;var z=0;var A=0;var B=global.NaN,C=global.Infinity;var D=0,E=0,F=0,G=0,H=0.0,I=0,J=0,K=0,L=0.0;var M=0;var N=global.Math.floor;var O=global.Math.abs;var P=global.Math.sqrt;var Q=global.Math.pow;var R=global.Math.cos;var S=global.Math.sin;var T=global.Math.tan;var U=global.Math.acos;var V=global.Math.asin;var W=global.Math.atan;var X=global.Math.atan2;var Y=global.Math.exp;var Z=global.Math.log;var _=global.Math.ceil;var $=global.Math.imul;var aa=global.Math.min;var ba=global.Math.max;var ca=global.Math.clz32;var da=env.abort;var ea=env.assert;var fa=env.enlargeMemory;var ga=env.getTotalMemory;var ha=env.abortOnCannotGrowMemory;var ia=env.invoke_viiiii;var ja=env.invoke_vid;var ka=env.invoke_vi;var la=env.invoke_vii;var ma=env.invoke_iiiiiii;var na=env.invoke_ii;var oa=env.invoke_iiiidii;var pa=env.invoke_iiii;var qa=env.invoke_viiiiidi;var ra=env.invoke_viiiiiiii;var sa=env.invoke_viiiiii;var ta=env.invoke_iiid;var ua=env.invoke_di;var va=env.invoke_vidddd;var wa=env.invoke_iid;var xa=env.invoke_viiiiiii;var ya=env.invoke_viiiiiiiiii;var za=env.invoke_iii;var Aa=env.invoke_viidii;var Ba=env.invoke_dii;var Ca=env.invoke_i;var Da=env.invoke_iiiii;var Ea=env.invoke_viii;var Fa=env.invoke_v;var Ga=env.invoke_viid;var Ha=env.invoke_iiiid;var Ia=env.invoke_viiii;var Ja=env._glUseProgram;var Ka=env._emscripten_asm_const_d;var La=env.floatReadValueFromPointer;var Ma=env.simpleReadValueFromPointer;var Na=env.throwInternalError;var Oa=env.get_first_emval;var Pa=env._glUniformMatrix4fv;var Qa=env.getLiveInheritedInstances;var Ra=env._glUniform2fv;var Sa=env.___assert_fail;var Ta=env._glDeleteProgram;var Ua=env.__ZSt18uncaught_exceptionv;var Va=env.ClassHandle;var Wa=env._emscripten_asm_const_ii;var Xa=env.getShiftFromSize;var Ya=env._glBindBuffer;var Za=env._glGetShaderInfoLog;var _a=env._llvm_pow_f32;var $a=env._glGetAttribLocation;var ab=env._glDisableVertexAttribArray;var bb=env.___cxa_begin_catch;var cb=env._uuid_generate;var db=env.runDestructor;var eb=env.throwInstanceAlreadyDeleted;var fb=env.RegisteredPointer_fromWireType;var gb=env.__embind_register_class_constructor;var hb=env.emscriptenWebGLComputeImageSize;var ib=env.init_RegisteredPointer;var jb=env.___lock;var kb=env.ClassHandle_isAliasOf;var lb=env._glUniform4fv;var mb=env.flushPendingDeletes;var nb=env.__embind_register_enum_value;var ob=env.makeClassHandle;var pb=env.___resumeException;var qb=env.whenDependentTypesAreResolved;var rb=env._glGenBuffers;var sb=env._glShaderSource;var tb=env._glFramebufferRenderbuffer;var ub=env._emscripten_asm_const_iiddidd;var vb=env.init_ClassHandle;var wb=env._pthread_cleanup_push;var xb=env.___syscall140;var yb=env.constNoSmartPtrRawPointerToWireType;var zb=env.___syscall146;var Ab=env._pthread_cleanup_pop;var Bb=env._glVertexAttribPointer;var Cb=env.__embind_register_std_wstring;var Db=env._glGetProgramInfoLog;var Eb=env.RegisteredClass;var Fb=env.___cxa_find_matching_catch;var Gb=env.__embind_register_value_object_field;var Hb=env._glBindRenderbuffer;var Ib=env._glDrawElements;var Jb=env.embind_init_charCodes;var Kb=env._emscripten_asm_const_i;var Lb=env._glViewport;var Mb=env.___setErrNo;var Nb=env._glDeleteTextures;var Ob=env.__embind_register_bool;var Pb=env._emscripten_asm_const_v;var Qb=env.createNamedFunction;var Rb=env.__embind_register_class_property;var Sb=env.__embind_register_emval;var Tb=env.__embind_finalize_value_object;var Ub=env.__emval_decref;var Vb=env._glEnable;var Wb=env._glGenTextures;var Xb=env._glGetIntegerv;var Yb=env.init_embind;var Zb=env.ClassHandle_clone;var _b=env.emscriptenWebGLGet;var $b=env._glAttachShader;var ac=env.ClassHandle_delete;var bc=env._glCreateProgram;var cc=env.RegisteredPointer_destructor;var dc=env.emscriptenWebGLGetTexPixelData;var ec=env.___syscall6;var fc=env.ensureOverloadTable;var gc=env._glBindFramebuffer;var hc=env._glDetachShader;var ic=env.new_;var jc=env._glGenFramebuffers;var kc=env.downcastPointer;var lc=env.replacePublicSymbol;var mc=env.__embind_register_class;var nc=env.ClassHandle_deleteLater;var oc=env._glDeleteFramebuffers;var pc=env.___syscall54;var qc=env.RegisteredPointer_deleteObject;var rc=env._glCheckFramebufferStatus;var sc=env.ClassHandle_isDeleted;var tc=env.heap32VectorToArray;var uc=env.__embind_register_integer;var vc=env.___cxa_allocate_exception;var wc=env._glBlendFuncSeparate;var xc=env._emscripten_asm_const_dii;var yc=env._uuid_unparse;var zc=env._glClearColor;var Ac=env._pthread_once;var Bc=env._glIsEnabled;var Cc=env._glBindTexture;var Dc=env._glUniform1f;var Ec=env.__embind_register_value_object;var Fc=env.enumReadValueFromPointer;var Gc=env.getTypeName;var Hc=env._pthread_getspecific;var Ic=env._glReadPixels;var Jc=env._emscripten_memcpy_big;var Kc=env._glGetError;var Lc=env.throwUnboundTypeError;var Mc=env.craftInvokerFunction;var Nc=env.runDestructors;var Oc=env.requireRegisteredType;var Pc=env.makeLegalFunctionName;var Qc=env._pthread_key_create;var Rc=env.upcastPointer;var Sc=env.init_emval;var Tc=env.shallowCopyInternalPointer;var Uc=env._emscripten_asm_const_iii;var Vc=env.nonConstNoSmartPtrRawPointerToWireType;var Wc=env._emscripten_asm_const_iiiiii;var Xc=env._uuid_unparse_lower;var Yc=env.genericPointerToWireType;var Zc=env._glCompileShader;var _c=env._glEnableVertexAttribArray;var $c=env._abort;var ad=env.throwBindingError;var bd=env._glDeleteBuffers;var cd=env._glBufferData;var dd=env.validateThis;var ed=env._glTexImage2D;var fd=env.exposePublicSymbol;var gd=env.__embind_register_std_string;var hd=env.___cxa_pure_virtual;var id=env._glDeleteShader;var jd=env._glGetProgramiv;var kd=env.__embind_register_memory_view;var ld=env._emscripten_asm_const_iiiiiii;var md=env.getInheritedInstance;var nd=env.setDelayFunction;var od=env.___gxx_personality_v0;var pd=env.extendError;var qd=env._glDeleteRenderbuffers;var rd=env.__embind_register_void;var sd=env._glDisable;var td=env._glLinkProgram;var ud=env._glGenRenderbuffers;var vd=env.RegisteredPointer_getPointee;var wd=env.__emval_register;var xd=env._glGetUniformLocation;var yd=env._glClear;var zd=env.__embind_register_class_function;var Ad=env._embind_repr;var Bd=env._glRenderbufferStorage;var Cd=env.RegisteredPointer;var Dd=env._glPixelStorei;var Ed=env._glGetShaderiv;var Fd=env.readLatin1String;var Gd=env.getBasestPointer;var Hd=env.getInheritedInstanceCount;var Id=env.__embind_register_float;var Jd=env.integerReadValueFromPointer;var Kd=env.___unlock;var Ld=env._glFramebufferTexture2D;var Md=env._pthread_setspecific;var Nd=env._emscripten_asm_const_iiii;var Od=env.registerType;var Pd=env.___cxa_throw;var Qd=env.__embind_register_enum;var Rd=env.count_emval_handles;var Sd=env.requireFunction;var Td=env._glTexParameteri;var Ud=env._glCreateShader;var Vd=env._glTexSubImage2D;var Wd=0.0;function Xd(newBuffer){if(q(newBuffer)&16777215||q(newBuffer)<=16777215||q(newBuffer)>2147483648)return false;i=new a(newBuffer);j=new b(newBuffer);k=new c(newBuffer);l=new d(newBuffer);m=new e(newBuffer);n=new f(newBuffer);o=new g(newBuffer);p=new h(newBuffer);buffer=newBuffer;return true;}// EMSCRIPTEN_START_FUNCS
	function xe(a){a=a|0;var b=0;b=r;r=r+a|0;r=r+15&-16;return b|0;}function ye(){return r|0;}function ze(a){a=a|0;r=a;}function Ae(a,b){a=a|0;b=b|0;r=a;s=b;}function Be(a,b){a=a|0;b=b|0;if(!x){x=a;y=b;}}function Ce(a){a=a|0;M=a;}function De(){return M|0;}function Ee(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a>>2]=3184;Fe(a+4|0,b,c,d,d);return;}function Fe(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;bO(a,b);k[a+12>>2]=4;b=a+16|0;k[b>>2]=k[c>>2];k[b+4>>2]=k[c+4>>2];k[b+8>>2]=k[c+8>>2];b=d;d=k[b+4>>2]|0;c=a+28|0;k[c>>2]=k[b>>2];k[c+4>>2]=d;c=e;d=k[c+4>>2]|0;e=a+36|0;k[e>>2]=k[c>>2];k[e+4>>2]=d;return;}function Ge(a,b){a=a|0;b=b|0;var c=0,d=0;d=b;c=k[d+4>>2]|0;b=a+40|0;k[b>>2]=k[d>>2];k[b+4>>2]=c;return;}function He(a){a=a|0;return qt(a+32|0,a+40|0)|0;}function Ie(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;f=r;r=r+16|0;d=f+4|0;e=f;c=VN(44,39939)|0;if(!c)c=0;else{Ne(c,b+4|0);g=c+16|0;b=b+20|0;k[g>>2]=k[b>>2];k[g+4>>2]=k[b+4>>2];k[g+8>>2]=k[b+8>>2];k[g+12>>2]=k[b+12>>2];k[g+16>>2]=k[b+16>>2];k[g+20>>2]=k[b+20>>2];k[g+24>>2]=k[b+24>>2];}k[e>>2]=0;k[d>>2]=k[e>>2];Je(a,c,d);r=f;return;}function Je(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3216;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Ke(a){a=a|0;k[a>>2]=3184;dO(a+4|0);return;}function Le(a){a=a|0;k[a>>2]=3184;dO(a+4|0);YN(a);return;}function Me(a){a=a|0;return a+4|0;}function Ne(a,b){a=a|0;b=b|0;bO(a,b);k[a+12>>2]=k[b+12>>2];return;}function Oe(a){a=a|0;NN(a);YN(a);return;}function Pe(a){a=a|0;a=k[a+12>>2]|0;if(a|0){dO(a);YN(a);}return;}function Qe(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==9545?a+12|0:0)|0;}function Re(a){a=a|0;YN(a);return;}function Se(a){a=a|0;k[a>>2]=3244;dO(a+4|0);return;}function Te(a){a=a|0;k[a>>2]=3244;dO(a+4|0);YN(a);return;}function Ue(a){a=a|0;return a+4|0;}function Ve(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=r;r=r+16|0;e=c;d=a+20|0;st(e,a+36|0,b);k[d>>2]=k[e>>2];k[d+4>>2]=k[e+4>>2];k[d+8>>2]=k[e+8>>2];k[d+12>>2]=k[e+12>>2];r=c;return;}function We(a){a=a|0;return(vt(a+20|0)|0)^1|0;}function Xe(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;f=r;r=r+16|0;d=f+4|0;e=f;c=VN(32,39939)|0;if(!c)c=0;else{Ne(c,b+4|0);g=c+16|0;b=b+20|0;k[g>>2]=k[b>>2];k[g+4>>2]=k[b+4>>2];k[g+8>>2]=k[b+8>>2];k[g+12>>2]=k[b+12>>2];}k[e>>2]=0;k[d>>2]=k[e>>2];Ye(a,c,d);r=f;return;}function Ye(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3276;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Ze(a){a=a|0;NN(a);YN(a);return;}function _e(a){a=a|0;a=k[a+12>>2]|0;if(a|0){dO(a);YN(a);}return;}function $e(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==9589?a+12|0:0)|0;}function af(a){a=a|0;YN(a);return;}function bf(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;d=r;r=r+16|0;f=d;k[a>>2]=3244;st(f,c,c);bO(a+4|0,b);k[a+16>>2]=2;e=a+20|0;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];k[e+8>>2]=k[f+8>>2];k[e+12>>2]=k[f+12>>2];e=c;b=k[e+4>>2]|0;c=a+36|0;k[c>>2]=k[e>>2];k[c+4>>2]=b;r=d;return;}function cf(a){a=a|0;k[a>>2]=3304;lf(a+4|0);return;}function df(a){a=a|0;k[a>>2]=3304;lf(a+4|0);YN(a);return;}function ef(a){a=a|0;return a+4|0;}function ff(a,b){a=a|0;b=b|0;var c=0,d=0;c=a+36|0;d=k[c>>2]|0;if((d|0)==(k[a+40>>2]|0))uf(a+32|0,b);else{a=b;b=k[a+4>>2]|0;k[d>>2]=k[a>>2];k[d+4>>2]=b;k[c>>2]=(k[c>>2]|0)+8;}return;}function gf(a){a=a|0;return 1;}function hf(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;f=r;r=r+16|0;d=f+4|0;e=f;c=VN(44,39939)|0;if(!c)c=0;else jf(c,b+4|0);k[e>>2]=0;k[d>>2]=k[e>>2];kf(a,c,d);r=f;return;}function jf(a,b){a=a|0;b=b|0;var c=0,d=0;Ne(a,b);c=a+16|0;d=b+16|0;k[c>>2]=k[d>>2];k[c+4>>2]=k[d+4>>2];k[c+8>>2]=k[d+8>>2];rf(a+28|0,b+28|0);k[a+40>>2]=k[b+40>>2];return;}function kf(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3336;k[c+12>>2]=b;k[a+4>>2]=c;return;}function lf(a){a=a|0;mf(a+28|0);dO(a);return;}function mf(a){a=a|0;var b=0,c=0,d=0;c=k[a>>2]|0;if(c|0){a=a+4|0;b=k[a>>2]|0;while(1){if((b|0)==(c|0))break;d=b+-8|0;k[a>>2]=d;b=d;}YN(c);}return;}function nf(a){a=a|0;NN(a);YN(a);return;}function of(a){a=a|0;a=k[a+12>>2]|0;if(a|0){lf(a);YN(a);}return;}function pf(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==9743?a+12|0:0)|0;}function qf(a){a=a|0;YN(a);return;}function rf(a,b){a=a|0;b=b|0;var c=0,d=0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;c=b+4|0;d=(k[c>>2]|0)-(k[b>>2]|0)>>3;if(d|0){sf(a,d);tf(a,k[b>>2]|0,k[c>>2]|0,d);}return;}function sf(a,b){a=a|0;b=b|0;var c=0;if(b>>>0>536870911)MN(a);else{c=UN(b<<3)|0;k[a+4>>2]=c;k[a>>2]=c;k[a+8>>2]=c+(b<<3);return;}}function tf(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;d=a+4|0;a=c-b|0;if((a|0)>0){qP(k[d>>2]|0,b|0,a|0)|0;k[d>>2]=(k[d>>2]|0)+(a>>3<<3);}return;}function uf(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;g=r;r=r+32|0;c=g;d=k[a+4>>2]|0;e=k[a>>2]|0;f=(d-e>>3)+1|0;if(f>>>0>536870911)MN(a);else{i=(k[a+8>>2]|0)-e|0;h=i>>2;vf(c,i>>3>>>0<268435455?h>>>0<f>>>0?f:h:536870911,d-e>>3,a+8|0);f=c+8|0;d=k[b+4>>2]|0;e=k[f>>2]|0;k[e>>2]=k[b>>2];k[e+4>>2]=d;k[f>>2]=(k[f>>2]|0)+8;wf(a,c);xf(c);r=g;return;}}function vf(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;do if(b){if(b>>>0>536870911){c=vc(4)|0;hP(c);Pd(c|0,2968,374);}else{d=UN(b<<3)|0;break;}}else d=0;while(0);k[a>>2]=d;c=d+(c<<3)|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+(b<<3);return;}function wf(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;d=k[a>>2]|0;g=a+4|0;f=b+4|0;e=(k[g>>2]|0)-d|0;c=(k[f>>2]|0)+(0-(e>>3)<<3)|0;k[f>>2]=c;if((e|0)>0){qP(c|0,d|0,e|0)|0;d=f;c=k[f>>2]|0;}else d=f;f=k[a>>2]|0;k[a>>2]=c;k[d>>2]=f;f=b+8|0;e=k[g>>2]|0;k[g>>2]=k[f>>2];k[f>>2]=e;f=a+8|0;g=b+12|0;a=k[f>>2]|0;k[f>>2]=k[g>>2];k[g>>2]=a;k[b>>2]=k[d>>2];return;}function xf(a){a=a|0;var b=0,c=0,d=0,e=0;b=k[a+4>>2]|0;c=a+8|0;d=k[c>>2]|0;while(1){if((d|0)==(b|0))break;e=d+-8|0;k[c>>2]=e;d=e;}a=k[a>>2]|0;if(a|0)YN(a);return;}function yf(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;var f=0,g=0,h=0,i=0,j=0,l=0,m=0;i=r;r=r+32|0;h=i+8|0;j=i;k[a>>2]=3304;g=k[d+4>>2]|0;f=j;k[f>>2]=k[d>>2];k[f+4>>2]=g;k[h>>2]=0;f=h+4|0;k[f>>2]=0;k[h+8>>2]=0;sf(h,1);g=j+8|0;d=j;while(1){if((d|0)==(g|0))break;m=d;l=k[m+4>>2]|0;j=k[f>>2]|0;k[j>>2]=k[m>>2];k[j+4>>2]=l;k[f>>2]=(k[f>>2]|0)+8;d=d+8|0;}zf(a+4|0,b,c,h,e);mf(h);r=i;return;}function zf(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;bO(a,b);k[a+12>>2]=5;b=a+16|0;k[b>>2]=k[c>>2];k[b+4>>2]=k[c+4>>2];k[b+8>>2]=k[c+8>>2];rf(a+28|0,d);o[a+40>>2]=e;return;}function Af(a){a=a|0;k[a>>2]=3364;dO(a+4|0);return;}function Bf(a){a=a|0;k[a>>2]=3364;dO(a+4|0);YN(a);return;}function Cf(a){a=a|0;return a+4|0;}function Df(a,b){a=a|0;b=b|0;var c=0,d=0;d=b;c=k[d+4>>2]|0;b=a+40|0;k[b>>2]=k[d>>2];k[b+4>>2]=c;return;}function Ef(a){a=a|0;return 1;}function Ff(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;f=r;r=r+16|0;d=f+4|0;e=f;c=VN(44,39939)|0;if(!c)c=0;else{Ne(c,b+4|0);g=c+16|0;b=b+20|0;k[g>>2]=k[b>>2];k[g+4>>2]=k[b+4>>2];k[g+8>>2]=k[b+8>>2];k[g+12>>2]=k[b+12>>2];k[g+16>>2]=k[b+16>>2];k[g+20>>2]=k[b+20>>2];k[g+24>>2]=k[b+24>>2];}k[e>>2]=0;k[d>>2]=k[e>>2];Gf(a,c,d);r=f;return;}function Gf(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3396;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Hf(a){a=a|0;NN(a);YN(a);return;}function If(a){a=a|0;a=k[a+12>>2]|0;if(a|0){dO(a);YN(a);}return;}function Jf(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==9902?a+12|0:0)|0;}function Kf(a){a=a|0;YN(a);return;}function Lf(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a>>2]=3364;Mf(a+4|0,b,c,d,d);return;}function Mf(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;bO(a,b);k[a+12>>2]=3;b=a+16|0;k[b>>2]=k[c>>2];k[b+4>>2]=k[c+4>>2];k[b+8>>2]=k[c+8>>2];b=d;d=k[b+4>>2]|0;c=a+28|0;k[c>>2]=k[b>>2];k[c+4>>2]=d;c=e;d=k[c+4>>2]|0;e=a+36|0;k[e>>2]=k[c>>2];k[e+4>>2]=d;return;}function Nf(a){a=a|0;k[a>>2]=3424;dO(a+4|0);return;}function Of(a){a=a|0;k[a>>2]=3424;dO(a+4|0);YN(a);return;}function Pf(a){a=a|0;return a+4|0;}function Qf(a,b){a=a|0;b=b|0;var c=0,d=0.0,e=0.0,f=0,g=0;c=r;r=r+16|0;g=c;f=a+48|0;e=+O(+(+o[b>>2]-+o[f>>2]));d=+O(+(+o[b+4>>2]-+o[a+52>>2]));_s(g,f,b);f=k[g+4>>2]|0;b=a+32|0;k[b>>2]=k[g>>2];k[b+4>>2]=f;o[a+40>>2]=e/1.4142135381698608;o[a+44>>2]=d/1.4142135381698608;r=c;return;}function Rf(a){a=a|0;return 1;}function Sf(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;f=r;r=r+16|0;d=f+4|0;e=f;c=VN(44,39939)|0;if(!c)c=0;else{Ne(c,b+4|0);g=c+16|0;b=b+20|0;k[g>>2]=k[b>>2];k[g+4>>2]=k[b+4>>2];k[g+8>>2]=k[b+8>>2];k[g+12>>2]=k[b+12>>2];k[g+16>>2]=k[b+16>>2];k[g+20>>2]=k[b+20>>2];k[g+24>>2]=k[b+24>>2];}k[e>>2]=0;k[d>>2]=k[e>>2];Tf(a,c,d);r=f;return;}function Tf(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3456;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Uf(a){a=a|0;NN(a);YN(a);return;}function Vf(a){a=a|0;a=k[a+12>>2]|0;if(a|0){dO(a);YN(a);}return;}function Wf(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==10056?a+12|0:0)|0;}function Xf(a){a=a|0;YN(a);return;}function Yf(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a>>2]=3424;Zf(a+4|0,b,c,d,0.0,0.0);b=d;c=k[b+4>>2]|0;d=a+48|0;k[d>>2]=k[b>>2];k[d+4>>2]=c;return;}function Zf(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;f=+f;bO(a,b);k[a+12>>2]=6;b=a+16|0;k[b>>2]=k[c>>2];k[b+4>>2]=k[c+4>>2];k[b+8>>2]=k[c+8>>2];b=d;c=k[b+4>>2]|0;d=a+28|0;k[d>>2]=k[b>>2];k[d+4>>2]=c;o[a+36>>2]=e;o[a+40>>2]=f;return;}function _f(a){a=a|0;k[a>>2]=3484;dO(a+4|0);return;}function $f(a){a=a|0;k[a>>2]=3484;dO(a+4|0);YN(a);return;}function ag(a){a=a|0;return a+4|0;}function bg(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=r;r=r+16|0;e=c;d=a+32|0;st(e,a+48|0,b);k[d>>2]=k[e>>2];k[d+4>>2]=k[e+4>>2];k[d+8>>2]=k[e+8>>2];k[d+12>>2]=k[e+12>>2];r=c;return;}function cg(a){a=a|0;return 1;}function dg(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;f=r;r=r+16|0;d=f+4|0;e=f;c=VN(44,39939)|0;if(!c)c=0;else{Ne(c,b+4|0);g=c+16|0;b=b+20|0;k[g>>2]=k[b>>2];k[g+4>>2]=k[b+4>>2];k[g+8>>2]=k[b+8>>2];k[g+12>>2]=k[b+12>>2];k[g+16>>2]=k[b+16>>2];k[g+20>>2]=k[b+20>>2];k[g+24>>2]=k[b+24>>2];}k[e>>2]=0;k[d>>2]=k[e>>2];eg(a,c,d);r=f;return;}function eg(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3516;k[c+12>>2]=b;k[a+4>>2]=c;return;}function fg(a){a=a|0;NN(a);YN(a);return;}function gg(a){a=a|0;a=k[a+12>>2]|0;if(a|0){dO(a);YN(a);}return;}function hg(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==10210?a+12|0:0)|0;}function ig(a){a=a|0;YN(a);return;}function jg(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=r;r=r+16|0;f=e;k[a>>2]=3484;st(f,d,d);bO(a+4|0,b);k[a+16>>2]=8;b=a+20|0;k[b>>2]=k[c>>2];k[b+4>>2]=k[c+4>>2];k[b+8>>2]=k[c+8>>2];b=a+32|0;k[b>>2]=k[f>>2];k[b+4>>2]=k[f+4>>2];k[b+8>>2]=k[f+8>>2];k[b+12>>2]=k[f+12>>2];b=d;c=k[b+4>>2]|0;d=a+48|0;k[d>>2]=k[b>>2];k[d+4>>2]=c;r=e;return;}function kg(a){a=a|0;k[a>>2]=3544;Cg(a+4|0);return;}function lg(a){a=a|0;k[a>>2]=3544;Cg(a+4|0);YN(a);return;}function mg(a){a=a|0;return(i[a+56>>0]|0)!=0|0;}function ng(a){a=a|0;return a+4|0;}function og(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=r;r=r+16|0;d=c+4|0;e=c;f=Kg(a)|0;k[e>>2]=f;k[d>>2]=k[e>>2];Mg(a+32|0,d,b)|0;$d[k[(k[a>>2]|0)+36>>2]&255](a,(k[a+60>>2]|0)+1|0);r=c;return;}function pg(a){a=a|0;$d[k[(k[a>>2]|0)+16>>2]&255](a,10);return;}function qg(a){a=a|0;var b=0,c=0,d=0,e=0;d=a+32|0;e=Kg(a)|0;b=(i[a+40+3>>0]|0)<0;if(b)c=k[d>>2]|0;else c=d;if((e|0)!=(c|0)){if(b)b=k[d>>2]|0;else b=d;Lg(d,e+-4-b>>2,1)|0;$d[k[(k[a>>2]|0)+36>>2]&255](a,(k[a+60>>2]|0)+-1|0);}return;}function rg(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0;f=a+32|0;d=Kg(a)|0;g=d;b=i[a+40+3>>0]|0;e=b<<24>>24<0;if(e){c=k[f>>2]|0;a=k[a+36>>2]|0;}else{c=f;a=b&255;}if((d|0)!=(c+(a<<2)|0)){if(e)a=k[f>>2]|0;else a=f;Lg(f,g-a>>2,1)|0;}return;}function sg(a){a=a|0;return k[a+60>>2]|0;}function tg(a,b){a=a|0;b=b|0;var c=0;c=i[a+40+3>>0]|0;if(c<<24>>24<0)c=k[a+36>>2]|0;else c=c&255;k[a+60>>2]=c>>>0<b>>>0?c:b;return;}function ug(a){a=a|0;return(i[a+57>>0]|0)!=0|0;}function vg(a,b){a=a|0;b=b|0;i[a+57>>0]=b&1;return;}function wg(a,b){a=a|0;b=b|0;a=a+20|0;i[a>>0]=i[b>>0]|0;i[a+1>>0]=i[b+1>>0]|0;i[a+2>>0]=i[b+2>>0]|0;return;}function xg(a,b){a=a|0;b=+b;o[a+24>>2]=b;return;}function yg(a,b){a=a|0;b=b|0;i[a+28>>0]=b&1;return;}function zg(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;f=r;r=r+16|0;d=f+4|0;e=f;c=VN(52,39939)|0;if(!c)c=0;else Ag(c,b+4|0);k[e>>2]=0;k[d>>2]=k[e>>2];Bg(a,c,d);r=f;return;}function Ag(a,b){a=a|0;b=b|0;var c=0,d=0;Ne(a,b);c=a+16|0;d=b+16|0;k[c>>2]=k[d>>2];k[c+4>>2]=k[d+4>>2];k[c+8>>2]=k[d+8>>2];Ig(a+28|0,b+28|0);a=a+40|0;b=b+40|0;k[a>>2]=k[b>>2];k[a+4>>2]=k[b+4>>2];k[a+8>>2]=k[b+8>>2];return;}function Bg(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3616;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Cg(a){a=a|0;Dg(a+28|0);dO(a);return;}function Dg(a){a=a|0;if((i[a+8+3>>0]|0)<0)YN(k[a>>2]|0);return;}function Eg(a){a=a|0;NN(a);YN(a);return;}function Fg(a){a=a|0;a=k[a+12>>2]|0;if(a|0){Cg(a);YN(a);}return;}function Gg(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==10381?a+12|0:0)|0;}function Hg(a){a=a|0;YN(a);return;}function Ig(a,b){a=a|0;b=b|0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;if((i[b+8+3>>0]|0)<0)Jg(a,k[b>>2]|0,k[b+4>>2]|0);else{k[a>>2]=k[b>>2];k[a+4>>2]=k[b+4>>2];k[a+8>>2]=k[b+8>>2];}return;}function Jg(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;if(c>>>0>1073741807)$N(a);do if(c>>>0>=2){d=c+4&-4;if(d>>>0>1073741823){c=vc(4)|0;hP(c);Pd(c|0,2968,374);}else{f=UN(d<<2)|0;k[a>>2]=f;k[a+8>>2]=d|-2147483648;k[a+4>>2]=c;a=f;break;}}else i[a+8+3>>0]=c;while(0);e=a;f=c;d=b;while(1){if(!f)break;k[e>>2]=k[d>>2];e=e+4|0;f=f+-1|0;d=d+4|0;}k[a+(c<<2)>>2]=0;return;}function Kg(a){a=a|0;var b=0,c=0;b=a+32|0;c=i[a+40+3>>0]|0;if(c<<24>>24<0){c=k[a+36>>2]|0;b=k[b>>2]|0;}else c=c&255;a=k[a+60>>2]|0;return b+((c>>>0<a>>>0?c:a)<<2)|0;}function Lg(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0;l=a+8+3|0;d=i[l>>0]|0;if(d<<24>>24<0)g=k[a+4>>2]|0;else g=d&255;if(g>>>0<b>>>0)aO(a);if(c|0){h=(i[l>>0]|0)<0;if(h)j=k[a>>2]|0;else j=a;e=g-b|0;f=e>>>0<c>>>0?e:c;e=e-f|0;a:do if(e|0){c=j+(b<<2)|0;d=c+(f<<2)|0;if((f|0)>0)while(1){if(!e)break a;k[c>>2]=k[d>>2];c=c+4|0;e=e+-1|0;d=d+4|0;}if((f|0)<0){c=c+(e<<2)|0;b=e;d=d+(e<<2)|0;while(1){if(!b)break a;m=c+-4|0;e=d+-4|0;k[m>>2]=k[e>>2];c=m;b=b+-1|0;d=e;}}}while(0);d=g-f|0;if(h)k[a+4>>2]=d;else i[l>>0]=d;k[j+(d<<2)>>2]=0;}return a|0;}function Mg(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0;e=a+8|0;l=e+3|0;d=i[l>>0]|0;f=d<<24>>24<0;if(f){b=(k[b>>2]|0)-(k[a>>2]|0)|0;e=(k[e>>2]&2147483647)+-1|0;h=k[a+4>>2]|0;}else{b=(k[b>>2]|0)-a|0;e=1;h=d&255;}j=b>>2;a:do if((e|0)!=(h|0)){if(f)e=k[a>>2]|0;else e=a;b=h-j|0;if(b){n=e+(j<<2)|0;f=n+4+(b<<2)|0;g=b;b=n+(b<<2)|0;while(1){if(!g)break a;o=f+-4|0;n=b+-4|0;k[o>>2]=k[n>>2];f=o;g=g+-1|0;b=n;}}}else{Ng(a,h,1,h,j,0,1);e=k[a>>2]|0;d=i[l>>0]|0;}while(0);k[e+(j<<2)>>2]=c;b=h+1|0;k[e+(b<<2)>>2]=0;if(d<<24>>24>=0){o=b&255;i[l>>0]=o;if(o<<24>>24<0)m=16;}else{k[a+4>>2]=b;m=16;}if((m|0)==16)a=k[a>>2]|0;return a+(j<<2)|0;}function Ng(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,l=0,m=0,n=0,o=0;if((1073741807-b|0)>>>0<c>>>0)$N(a);o=a+8|0;if((i[o+3>>0]|0)<0)n=k[a>>2]|0;else n=a;if(b>>>0<536870887){c=c+b|0;m=b<<1;c=c>>>0<m>>>0?m:c;c=c>>>0<2?2:c+4&-4;if(c>>>0>1073741823){o=vc(4)|0;hP(o);Pd(o|0,2968,374);}else l=c;}else l=1073741807;m=UN(l<<2)|0;a:do if(e|0){c=m;h=e;j=n;while(1){if(!h)break a;k[c>>2]=k[j>>2];c=c+4|0;h=h+-1|0;j=j+4|0;}}while(0);h=d-f-e|0;b:do if(h|0){j=m+(e<<2)+(g<<2)|0;c=n+(e<<2)+(f<<2)|0;while(1){if(!h)break b;k[j>>2]=k[c>>2];j=j+4|0;h=h+-1|0;c=c+4|0;}}while(0);if((b|0)!=1)YN(n);k[a>>2]=m;k[o>>2]=l|-2147483648;return;}function Og(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=3544;Ag(a+4|0,b);i[a+56>>0]=c&1;i[a+57>>0]=1;k[a+60>>2]=0;return;}function Pg(a,b){a=a|0;b=b|0;k[a>>2]=k[b>>2];b=k[b+4>>2]|0;k[a+4>>2]=b;if(b|0)PN(b);return;}function Qg(a,b){a=a|0;b=b|0;if(k[a>>2]|0)$d[k[(k[b>>2]|0)+32>>2]&255](b,a);return;}function Rg(a,b){a=a|0;b=b|0;var c=0,d=0;d=r;r=r+16|0;c=d;a=k[a>>2]|0;if(a|0){se[k[(k[b>>2]|0)+36>>2]&63](c,b,a);Sg(c);}r=d;return;}function Sg(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function Tg(a){a=a|0;k[a>>2]=3644;Yg(a+4|0);return;}function Ug(a){a=a|0;k[a>>2]=3644;Yg(a+4|0);YN(a);return;}function Vg(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;h=r;r=r+16|0;e=h;f=a+4|0;g=e+4|0;a=k[a+8>>2]|0;while(1){d=a;if((d|0)==(k[f>>2]|0))break;a=d+-8|0;c=k[a>>2]|0;k[e>>2]=c;d=k[d+-4>>2]|0;k[g>>2]=d;if(d){PN(d);c=k[e>>2]|0;}if(c|0)$d[k[(k[c>>2]|0)+8>>2]&255](c,b);Xg(e);}r=h;return;}function Wg(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;h=r;r=r+16|0;e=h;f=a+8|0;g=e+4|0;d=k[a+4>>2]|0;while(1){if((d|0)==(k[f>>2]|0))break;a=k[d>>2]|0;k[e>>2]=a;c=k[d+4>>2]|0;k[g>>2]=c;if(c){PN(c);a=k[e>>2]|0;}if(a|0)$d[k[(k[a>>2]|0)+12>>2]&255](a,b);Xg(e);d=d+8|0;}r=h;return;}function Xg(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function Yg(a){a=a|0;var b=0,c=0,d=0;b=k[a>>2]|0;if(b|0){c=a+4|0;while(1){d=k[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;k[c>>2]=d;Xg(d);}YN(k[a>>2]|0);}return;}function Zg(a,b){a=a|0;b=b|0;k[a>>2]=3644;_g(a+4|0,b);return;}function _g(a,b){a=a|0;b=b|0;var c=0,d=0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;c=b+4|0;d=(k[c>>2]|0)-(k[b>>2]|0)>>3;if(d|0){$g(a,d);ah(a,k[b>>2]|0,k[c>>2]|0,d);}return;}function $g(a,b){a=a|0;b=b|0;var c=0;if(b>>>0>536870911)MN(a);else{c=UN(b<<3)|0;k[a+4>>2]=c;k[a>>2]=c;k[a+8>>2]=c+(b<<3);return;}}function ah(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;d=a+4|0;while(1){if((b|0)==(c|0))break;e=k[d>>2]|0;k[e>>2]=k[b>>2];a=k[b+4>>2]|0;k[e+4>>2]=a;if(a|0)PN(a);k[d>>2]=(k[d>>2]|0)+8;b=b+8|0;}return;}function bh(a){a=a|0;k[a>>2]=3668;mh(a+24|0);Yg(a+4|0);return;}function ch(a){a=a|0;bh(a);YN(a);return;}function dh(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0;m=r;r=r+16|0;e=m+12|0;d=m+8|0;g=m+4|0;h=m;if(k[b>>2]|0?(i[a+20>>0]|0)==0:0){j=a+4|0;l=a+8|0;c=k[l>>2]|0;f=k[a+16>>2]|0;if((f|0)!=(c|0)){k[g>>2]=f;k[h>>2]=c;k[d>>2]=k[g>>2];k[e>>2]=k[h>>2];eh(j,d,e)|0;c=k[l>>2]|0;}if((c|0)==(k[a+12>>2]|0)){fh(j,b);c=k[l>>2]|0;}else{k[c>>2]=k[b>>2];d=k[b+4>>2]|0;k[c+4>>2]=d;if(d){PN(d);c=k[l>>2]|0;}c=c+8|0;k[l>>2]=c;}k[a+16>>2]=c;gh(a+24|0);}r=m;return;}function eh(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0;i=r;r=r+16|0;g=i;h=k[a>>2]|0;f=k[b>>2]|0;h=h+(f-h>>3<<3)|0;b=k[c>>2]|0;a:do if((f|0)!=(b|0)){e=a+4|0;c=k[e>>2]|0;a=g+4|0;d=h;b=h+(b-f>>3<<3)|0;while(1){if((b|0)==(c|0))break;f=k[b>>2]|0;l=b+4|0;j=k[l>>2]|0;k[b>>2]=0;k[l>>2]=0;k[g>>2]=k[d>>2];k[d>>2]=f;f=d+4|0;k[a>>2]=k[f>>2];k[f>>2]=j;Xg(g);d=d+8|0;b=b+8|0;}while(1){b=k[e>>2]|0;if((b|0)==(d|0))break a;l=b+-8|0;k[e>>2]=l;Xg(l);}}while(0);r=i;return h|0;}function fh(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;g=r;r=r+32|0;f=g;c=k[a+4>>2]|0;d=k[a>>2]|0;e=(c-d>>3)+1|0;if(e>>>0>536870911)MN(a);i=(k[a+8>>2]|0)-d|0;h=i>>2;jh(f,i>>3>>>0<268435455?h>>>0<e>>>0?e:h:536870911,c-d>>3,a+8|0);e=f+8|0;c=k[e>>2]|0;k[c>>2]=k[b>>2];d=k[b+4>>2]|0;k[c+4>>2]=d;if(d){PN(d);c=k[e>>2]|0;}k[e>>2]=c+8;kh(a,f);lh(f);r=g;return;}function gh(a){a=a|0;if(k[a+16>>2]|0)hh(a);return;}function hh(a){a=a|0;a=k[a+16>>2]|0;if(!a){a=vc(4)|0;k[a>>2]=3688;Pd(a|0,288,44);}else{_d[k[(k[a>>2]|0)+24>>2]&511](a);return;}}function ih(a){a=a|0;YN(a);return;}function jh(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;do if(b){if(b>>>0>536870911){c=vc(4)|0;hP(c);Pd(c|0,2968,374);}else{d=UN(b<<3)|0;break;}}else d=0;while(0);k[a>>2]=d;c=d+(c<<3)|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+(b<<3);return;}function kh(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;d=k[a>>2]|0;e=a+4|0;f=b+4|0;c=k[e>>2]|0;while(1){if((c|0)==(d|0))break;i=k[f>>2]|0;g=c+-8|0;k[i+-8>>2]=k[g>>2];h=c+-4|0;k[i+-4>>2]=k[h>>2];k[g>>2]=0;k[h>>2]=0;k[f>>2]=(k[f>>2]|0)+-8;c=g;}g=k[a>>2]|0;k[a>>2]=k[f>>2];k[f>>2]=g;g=b+8|0;i=k[e>>2]|0;k[e>>2]=k[g>>2];k[g>>2]=i;g=a+8|0;i=b+12|0;h=k[g>>2]|0;k[g>>2]=k[i>>2];k[i>>2]=h;k[b>>2]=k[f>>2];return;}function lh(a){a=a|0;var b=0,c=0,d=0;b=k[a+4>>2]|0;c=a+8|0;while(1){d=k[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;k[c>>2]=d;Xg(d);}a=k[a>>2]|0;if(a|0)YN(a);return;}function mh(a){a=a|0;var b=0;b=k[a+16>>2]|0;if((b|0)!=(a|0)){if(b|0)_d[k[(k[b>>2]|0)+20>>2]&511](b);}else _d[k[(k[b>>2]|0)+16>>2]&511](b);return;}function nh(a){a=a|0;var b=0;k[a>>2]=3668;b=a+4|0;k[a+40>>2]=0;k[b>>2]=0;k[b+4>>2]=0;k[b+8>>2]=0;k[b+12>>2]=0;i[b+16>>0]=0;return;}function oh(a){a=a|0;return(k[a+16>>2]|0)!=(k[a+4>>2]|0)|0;}function ph(a){a=a|0;return(k[a+16>>2]|0)!=(k[a+8>>2]|0)|0;}function qh(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=a+16|0;d=k[c>>2]|0;if((d|0)!=(k[a+4>>2]|0)?(e=a+20|0,(i[e>>0]|0)==0):0){i[e>>0]=1;d=d+-8|0;k[c>>2]=d;d=k[d>>2]|0;$d[k[(k[d>>2]|0)+8>>2]&255](d,b);gh(a+24|0);i[e>>0]=0;}return;}function rh(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=a+16|0;d=k[c>>2]|0;if((d|0)!=(k[a+8>>2]|0)?(e=a+20|0,(i[e>>0]|0)==0):0){i[e>>0]=1;d=k[d>>2]|0;$d[k[(k[d>>2]|0)+12>>2]&255](d,b);k[c>>2]=(k[c>>2]|0)+8;gh(a+24|0);i[e>>0]=0;}return;}function sh(a){a=a|0;k[a>>2]=3708;Sg(a+12|0);Sg(a+4|0);return;}function th(a){a=a|0;sh(a);YN(a);return;}function uh(a,b){a=a|0;b=b|0;a=a+4|0;if(k[a>>2]|0)$d[k[(k[b>>2]|0)+48>>2]&255](b,a);return;}function vh(a,b){a=a|0;b=b|0;a=a+12|0;if(k[a>>2]|0)$d[k[(k[b>>2]|0)+48>>2]&255](b,a);return;}function wh(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=3708;k[a+4>>2]=k[b>>2];b=k[b+4>>2]|0;k[a+8>>2]=b;if(b|0)PN(b);k[a+12>>2]=k[c>>2];b=k[c+4>>2]|0;k[a+16>>2]=b;if(b|0)PN(b);return;}function xh(a){a=a|0;k[a>>2]=3732;dO(a+4|0);return;}function yh(a){a=a|0;k[a>>2]=3732;dO(a+4|0);YN(a);return;}function zh(a,b){a=a|0;b=b|0;var c=0,d=0;c=r;r=r+16|0;d=c;nt(d,-1.0,a+16|0);Bh(a,b,d);r=c;return;}function Ah(a,b){a=a|0;b=b|0;Bh(a,b,a+16|0);return;}function Bh(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0;g=r;r=r+32|0;d=g+16|0;e=g+8|0;f=g;se[k[(k[b>>2]|0)+28>>2]&63](d,b,a+4|0);a=k[d>>2]|0;if(a|0){gi(e,a);a=k[e>>2]|0;if(a|0){$d[k[(k[a>>2]|0)+12>>2]&255](a,0);a=k[e>>2]|0;$d[k[(k[a>>2]|0)+16>>2]&255](a,c);c=k[e>>2]|0;_d[k[(k[c>>2]|0)+20>>2]&511](c);c=k[(k[b>>2]|0)+48>>2]|0;a=k[e>>2]|0;$d[k[(k[a>>2]|0)+48>>2]&255](f,a);$d[c&255](b,f);Sg(f);}Ch(e);}Sg(d);r=g;return;}function Ch(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function Dh(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;k[a>>2]=3732;bO(a+4|0,b);d=c;b=k[d+4>>2]|0;c=a+16|0;k[c>>2]=k[d>>2];k[c+4>>2]=b;return;}function Eh(a){a=a|0;k[a>>2]=3756;dO(a+4|0);return;}function Fh(a){a=a|0;k[a>>2]=3756;dO(a+4|0);YN(a);return;}function Gh(a,b){a=a|0;b=b|0;se[k[(k[b>>2]|0)+44>>2]&63](b,a+4|0,j[a+16>>1]|0);return;}function Hh(a,b){a=a|0;b=b|0;se[k[(k[b>>2]|0)+44>>2]&63](b,a+4|0,j[a+18>>1]|0);return;}function Ih(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a>>2]=3756;bO(a+4|0,b);j[a+16>>1]=c;j[a+18>>1]=d;return;}function Jh(a){a=a|0;k[a>>2]=3780;Dg(a+28|0);Dg(a+16|0);dO(a+4|0);return;}function Kh(a){a=a|0;Jh(a);YN(a);return;}function Lh(a,b){a=a|0;b=b|0;Nh(a,b,a+16|0);return;}function Mh(a,b){a=a|0;b=b|0;Nh(a,b,a+28|0);return;}function Nh(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0;i=r;r=r+32|0;f=i+24|0;g=i+16|0;h=i+8|0;e=i;se[k[(k[b>>2]|0)+28>>2]&63](g,b,a+4|0);d=k[g>>2]|0;if(d|0?(k[d+12>>2]|0)==7:0){a=VN(52,39939)|0;if(!a)a=0;else Ag(a,d);k[e>>2]=0;k[f>>2]=k[e>>2];Oh(h,a,f);a=k[h>>2]|0;if(a|0){Ph(a+28|0,c)|0;a=k[(k[b>>2]|0)+48>>2]|0;k[f>>2]=k[h>>2];d=k[h+4>>2]|0;k[f+4>>2]=d;if(d|0)PN(d);$d[a&255](b,f);Sg(f);}Qh(h);}Sg(g);r=i;return;}function Oh(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3616;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Ph(a,b){a=a|0;b=b|0;var c=0,d=0;if((a|0)!=(b|0)){c=i[b+8+3>>0]|0;d=c<<24>>24<0;Rh(a,d?k[b>>2]|0:b,d?k[b+4>>2]|0:c&255)|0;}return a|0;}function Qh(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function Rh(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,j=0,l=0;d=a+8|0;h=d+3|0;e=i[h>>0]|0;j=e<<24>>24<0;if(j)f=(k[d>>2]&2147483647)+-1|0;else f=1;do if(f>>>0>=c>>>0){if(j)g=k[a>>2]|0;else g=a;a:do if(g>>>0>=b>>>0){if(g>>>0>b>>>0){e=g+(c<<2)|0;f=c;d=b+(c<<2)|0;while(1){if(!f)break a;l=e+-4|0;b=d+-4|0;k[l>>2]=k[b>>2];e=l;f=f+-1|0;d=b;}}}else{e=g;f=c;d=b;while(1){if(!f)break a;k[e>>2]=k[d>>2];e=e+4|0;f=f+-1|0;d=d+4|0;}}while(0);k[g+(c<<2)>>2]=0;if(j){k[a+4>>2]=c;break;}else{i[h>>0]=c;break;}}else{if(j)d=k[a+4>>2]|0;else d=e&255;Sh(a,f,c-f|0,d,0,d,c,b);}while(0);return a|0;}function Sh(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,l=0,m=0,n=0,o=0,p=0;if((1073741806-b|0)>>>0<c>>>0)$N(a);o=a+8|0;if((i[o+3>>0]|0)<0)p=k[a>>2]|0;else p=a;if(b>>>0<536870887){c=c+b|0;n=b<<1;c=c>>>0<n>>>0?n:c;c=c>>>0<2?2:c+4&-4;if(c>>>0>1073741823){g=vc(4)|0;hP(g);Pd(g|0,2968,374);}}else c=1073741807;n=UN(c<<2)|0;a:do if(e|0){j=n;l=e;m=p;while(1){if(!l)break a;k[j>>2]=k[m>>2];j=j+4|0;l=l+-1|0;m=m+4|0;}}while(0);b:do if(g|0){j=n+(e<<2)|0;l=g;while(1){if(!l)break b;k[j>>2]=k[h>>2];j=j+4|0;l=l+-1|0;h=h+4|0;}}while(0);m=d-f|0;h=m-e|0;c:do if(h|0){l=n+(e<<2)+(g<<2)|0;j=h;h=p+(e<<2)+(f<<2)|0;while(1){if(!j)break c;k[l>>2]=k[h>>2];l=l+4|0;j=j+-1|0;h=h+4|0;}}while(0);if((b|0)!=1)YN(p);k[a>>2]=n;k[o>>2]=c|-2147483648;g=m+g|0;k[a+4>>2]=g;k[n+(g<<2)>>2]=0;return;}function Th(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a>>2]=3780;bO(a+4|0,b);Ig(a+16|0,c);Ig(a+28|0,d);return;}function Uh(a){a=a|0;k[a>>2]=3804;lf(a+4|0);return;}function Vh(a){a=a|0;k[a>>2]=3804;lf(a+4|0);YN(a);return;}function Wh(a){a=a|0;return a+4|0;}function Xh(a,b){a=a|0;b=b|0;return;}function Yh(a,b){a=a|0;b=b|0;var c=0,d=0;d=b;c=k[d+4>>2]|0;b=a+48|0;k[b>>2]=k[d>>2];k[b+4>>2]=c;return;}function Zh(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0;f=r;r=r+16|0;c=f;d=k[a+36>>2]|0;e=a+48|0;b=k[a+32>>2]|0;while(1){if((b|0)==(d|0))break;lt(c,b,e);i=c;h=k[i+4>>2]|0;g=b;k[g>>2]=k[i>>2];k[g+4>>2]=h;b=b+8|0;}k[e>>2]=0;k[a+52>>2]=0;r=f;return;}function _h(a){a=a|0;return a+48|0;}function $h(a){a=a|0;return 1;}function ai(a,b){a=a|0;b=b|0;b=b+20|0;k[a>>2]=k[b>>2];k[a+4>>2]=k[b+4>>2];k[a+8>>2]=k[b+8>>2];return;}function bi(a,b){a=a|0;b=b|0;a=a+20|0;i[a>>0]=i[b>>0]|0;i[a+1>>0]=i[b+1>>0]|0;i[a+2>>0]=i[b+2>>0]|0;return;}function ci(a,b){a=a|0;b=+b;o[a+24>>2]=b;return;}function di(a,b){a=a|0;b=b|0;i[a+28>>0]=b&1;return;}function ei(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;f=r;r=r+16|0;d=f+4|0;e=f;c=VN(44,39939)|0;if(!c)c=0;else jf(c,b+4|0);k[e>>2]=0;k[d>>2]=k[e>>2];kf(a,c,d);r=f;return;}function fi(a,b){a=a|0;b=b|0;k[a>>2]=3804;jf(a+4|0,b);o[a+48>>2]=0.0;o[a+52>>2]=0.0;return;}function gi(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;h=r;r=r+32|0;d=h+16|0;e=h+8|0;f=h;k[a>>2]=0;g=a+4|0;k[g>>2]=0;switch(k[b+12>>2]|0){case 3:{c=VN(80,39939)|0;if(!c)c=0;else hi(c,b);k[f>>2]=0;k[d>>2]=k[f>>2];ii(e,c,d);f=k[e>>2]|0;k[e>>2]=k[a>>2];k[a>>2]=f;a=e+4|0;f=k[a>>2]|0;k[a>>2]=k[g>>2];k[g>>2]=f;Ch(e);break;}case 4:{c=VN(80,39939)|0;if(!c)c=0;else ji(c,b);k[f>>2]=0;k[d>>2]=k[f>>2];ki(e,c,d);f=k[e>>2]|0;k[e>>2]=k[a>>2];k[a>>2]=f;a=e+4|0;f=k[a>>2]|0;k[a>>2]=k[g>>2];k[g>>2]=f;Ch(e);break;}case 5:{c=VN(56,39939)|0;if(!c)c=0;else fi(c,b);k[f>>2]=0;k[d>>2]=k[f>>2];li(e,c,d);f=k[e>>2]|0;k[e>>2]=k[a>>2];k[a>>2]=f;a=e+4|0;f=k[a>>2]|0;k[a>>2]=k[g>>2];k[g>>2]=f;Ch(e);break;}case 6:{c=VN(80,39939)|0;if(!c)c=0;else Pj(c,b);k[f>>2]=0;k[d>>2]=k[f>>2];mi(e,c,d);f=k[e>>2]|0;k[e>>2]=k[a>>2];k[a>>2]=f;a=e+4|0;f=k[a>>2]|0;k[a>>2]=k[g>>2];k[g>>2]=f;Ch(e);break;}case 8:{c=VN(88,39939)|0;if(!c)c=0;else fk(c,b);k[f>>2]=0;k[d>>2]=k[f>>2];ni(e,c,d);f=k[e>>2]|0;k[e>>2]=k[a>>2];k[a>>2]=f;a=e+4|0;f=k[a>>2]|0;k[a>>2]=k[g>>2];k[g>>2]=f;Ch(e);break;}case 7:{c=VN(64,39939)|0;if(!c)c=0;else tk(c,b);k[f>>2]=0;k[d>>2]=k[f>>2];oi(e,c,d);f=k[e>>2]|0;k[e>>2]=k[a>>2];k[a>>2]=f;a=e+4|0;f=k[a>>2]|0;k[a>>2]=k[g>>2];k[g>>2]=f;Ch(e);break;}default:{}}r=h;return;}function hi(a,b){a=a|0;b=b|0;var c=0;k[a>>2]=4092;Ne(a+4|0,b);c=a+20|0;b=b+16|0;k[c>>2]=k[b>>2];k[c+4>>2]=k[b+4>>2];k[c+8>>2]=k[b+8>>2];k[c+12>>2]=k[b+12>>2];k[c+16>>2]=k[b+16>>2];k[c+20>>2]=k[b+20>>2];k[c+24>>2]=k[b+24>>2];b=a+48|0;k[b>>2]=0;k[b+4>>2]=0;k[b+8>>2]=0;k[b+12>>2]=0;k[b+16>>2]=0;k[b+20>>2]=0;k[b+24>>2]=0;k[b+28>>2]=0;return;}function ii(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=4064;k[c+12>>2]=b;k[a+4>>2]=c;return;}function ji(a,b){a=a|0;b=b|0;var c=0;k[a>>2]=4004;Ne(a+4|0,b);c=a+20|0;b=b+16|0;k[c>>2]=k[b>>2];k[c+4>>2]=k[b+4>>2];k[c+8>>2]=k[b+8>>2];k[c+12>>2]=k[b+12>>2];k[c+16>>2]=k[b+16>>2];k[c+20>>2]=k[b+20>>2];k[c+24>>2]=k[b+24>>2];b=a+48|0;k[b>>2]=0;k[b+4>>2]=0;k[b+8>>2]=0;k[b+12>>2]=0;k[b+16>>2]=0;k[b+20>>2]=0;k[b+24>>2]=0;k[b+28>>2]=0;return;}function ki(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3976;k[c+12>>2]=b;k[a+4>>2]=c;return;}function li(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3948;k[c+12>>2]=b;k[a+4>>2]=c;return;}function mi(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3920;k[c+12>>2]=b;k[a+4>>2]=c;return;}function ni(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3892;k[c+12>>2]=b;k[a+4>>2]=c;return;}function oi(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3864;k[c+12>>2]=b;k[a+4>>2]=c;return;}function pi(a){a=a|0;NN(a);YN(a);return;}function qi(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function ri(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==10787?a+12|0:0)|0;}function si(a){a=a|0;YN(a);return;}function ti(a){a=a|0;NN(a);YN(a);return;}function ui(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function vi(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==10930?a+12|0:0)|0;}function wi(a){a=a|0;YN(a);return;}function xi(a){a=a|0;NN(a);YN(a);return;}function yi(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function zi(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==11083?a+12|0:0)|0;}function Ai(a){a=a|0;YN(a);return;}function Bi(a){a=a|0;NN(a);YN(a);return;}function Ci(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function Di(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==11226?a+12|0:0)|0;}function Ei(a){a=a|0;YN(a);return;}function Fi(a){a=a|0;NN(a);YN(a);return;}function Gi(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function Hi(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==11371?a+12|0:0)|0;}function Ii(a){a=a|0;YN(a);return;}function Ji(a){a=a|0;k[a>>2]=4004;dO(a+4|0);return;}function Ki(a){a=a|0;k[a>>2]=4004;dO(a+4|0);YN(a);return;}function Li(a){a=a|0;return a+4|0;}function Mi(a,b){a=a|0;b=b|0;var c=0,d=0;switch(b<<24>>24){case 1:{d=a+32|0;c=k[d+4>>2]|0;b=a+56|0;k[b>>2]=k[d>>2];k[b+4>>2]=c;k[a+64>>2]=136;k[a+68>>2]=0;k[a+72>>2]=0;k[a+76>>2]=0;break;}case 2:{b=a+40|0;c=k[b+4>>2]|0;d=a+56|0;k[d>>2]=k[b>>2];k[d+4>>2]=c;k[a+64>>2]=137;k[a+68>>2]=0;k[a+72>>2]=0;k[a+76>>2]=0;break;}default:{k[a+64>>2]=138;k[a+68>>2]=0;k[a+72>>2]=380;k[a+76>>2]=0;}}return;}function Ni(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=k[a+64>>2]|0;d=k[a+68>>2]|0;e=d&1;if((c|0)!=0|(d|0)!=0&(e|c|0)!=0){d=a+(d>>1)|0;if(e)c=k[(k[d>>2]|0)+c>>2]|0;$d[c&255](d,b);}return;}function Oi(a){a=a|0;var b=0,c=0,d=0;b=k[a+72>>2]|0;c=k[a+76>>2]|0;d=c&1;if((b|0)!=0|(c|0)!=0&(d|b|0)!=0){c=a+(c>>1)|0;if(d)b=k[(k[c>>2]|0)+b>>2]|0;_d[b&511](c);}a=a+64|0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;k[a+12>>2]=0;return;}function Pi(a){a=a|0;return a+48|0;}function Qi(a){a=a|0;return 1;}function Ri(a,b){a=a|0;b=b|0;b=b+20|0;k[a>>2]=k[b>>2];k[a+4>>2]=k[b+4>>2];k[a+8>>2]=k[b+8>>2];return;}function Si(a,b){a=a|0;b=b|0;a=a+20|0;i[a>>0]=i[b>>0]|0;i[a+1>>0]=i[b+1>>0]|0;i[a+2>>0]=i[b+2>>0]|0;return;}function Ti(a,b){a=a|0;b=+b;o[a+24>>2]=b;return;}function Ui(a,b){a=a|0;b=b|0;i[a+28>>0]=b&1;return;}function Vi(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;g=r;r=r+32|0;d=g+16|0;e=g+8|0;f=g;c=VN(44,39939)|0;if(!c)c=0;else{Ne(c,b+4|0);h=c+16|0;b=b+20|0;k[h>>2]=k[b>>2];k[h+4>>2]=k[b+4>>2];k[h+8>>2]=k[b+8>>2];k[h+12>>2]=k[b+12>>2];k[h+16>>2]=k[b+16>>2];k[h+20>>2]=k[b+20>>2];k[h+24>>2]=k[b+24>>2];}k[f>>2]=0;k[d>>2]=k[f>>2];Wi(e,c,d);k[a>>2]=k[e>>2];h=e+4|0;k[a+4>>2]=k[h>>2];k[e>>2]=0;k[h>>2]=0;Xi(e);r=g;return;}function Wi(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3216;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Xi(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function Yi(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=r;r=r+16|0;e=c;lt(e,a+56|0,b);d=k[e+4>>2]|0;b=a+32|0;k[b>>2]=k[e>>2];k[b+4>>2]=d;r=c;return;}function Zi(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=r;r=r+16|0;e=c;lt(e,a+56|0,b);d=k[e+4>>2]|0;b=a+40|0;k[b>>2]=k[e>>2];k[b+4>>2]=d;r=c;return;}function _i(a,b){a=a|0;b=b|0;var c=0,d=0;d=b;c=k[d+4>>2]|0;b=a+48|0;k[b>>2]=k[d>>2];k[b+4>>2]=c;return;}function $i(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0;b=r;r=r+16|0;f=b;d=a+32|0;c=a+48|0;lt(f,d,c);g=f;e=k[g+4>>2]|0;k[d>>2]=k[g>>2];k[d+4>>2]=e;d=a+40|0;lt(f,d,c);e=k[f+4>>2]|0;k[d>>2]=k[f>>2];k[d+4>>2]=e;k[c>>2]=0;k[a+52>>2]=0;r=b;return;}function aj(a){a=a|0;NN(a);YN(a);return;}function bj(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function cj(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==11638?a+12|0:0)|0;}function dj(a){a=a|0;YN(a);return;}function ej(a){a=a|0;k[a>>2]=4092;dO(a+4|0);return;}function fj(a){a=a|0;k[a>>2]=4092;dO(a+4|0);YN(a);return;}function gj(a){a=a|0;return a+4|0;}function hj(a,b){a=a|0;b=b|0;var c=0,d=0;switch(b<<24>>24){case 1:{d=a+32|0;c=k[d+4>>2]|0;b=a+56|0;k[b>>2]=k[d>>2];k[b+4>>2]=c;k[a+64>>2]=139;k[a+68>>2]=0;k[a+72>>2]=0;k[a+76>>2]=0;break;}case 2:{b=a+40|0;c=k[b+4>>2]|0;d=a+56|0;k[d>>2]=k[b>>2];k[d+4>>2]=c;k[a+64>>2]=140;k[a+68>>2]=0;k[a+72>>2]=0;k[a+76>>2]=0;break;}default:{k[a+64>>2]=141;k[a+68>>2]=0;k[a+72>>2]=381;k[a+76>>2]=0;}}return;}function ij(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=k[a+64>>2]|0;d=k[a+68>>2]|0;e=d&1;if((c|0)!=0|(d|0)!=0&(e|c|0)!=0){d=a+(d>>1)|0;if(e)c=k[(k[d>>2]|0)+c>>2]|0;$d[c&255](d,b);}return;}function jj(a){a=a|0;var b=0,c=0,d=0;b=k[a+72>>2]|0;c=k[a+76>>2]|0;d=c&1;if((b|0)!=0|(c|0)!=0&(d|b|0)!=0){c=a+(c>>1)|0;if(d)b=k[(k[c>>2]|0)+b>>2]|0;_d[b&511](c);}a=a+64|0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;k[a+12>>2]=0;return;}function kj(a){a=a|0;return a+48|0;}function lj(a){a=a|0;return 1;}function mj(a,b){a=a|0;b=b|0;b=b+20|0;k[a>>2]=k[b>>2];k[a+4>>2]=k[b+4>>2];k[a+8>>2]=k[b+8>>2];return;}function nj(a,b){a=a|0;b=b|0;a=a+20|0;i[a>>0]=i[b>>0]|0;i[a+1>>0]=i[b+1>>0]|0;i[a+2>>0]=i[b+2>>0]|0;return;}function oj(a,b){a=a|0;b=+b;o[a+24>>2]=b;return;}function pj(a,b){a=a|0;b=b|0;i[a+28>>0]=b&1;return;}function qj(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;g=r;r=r+32|0;d=g+16|0;e=g+8|0;f=g;c=VN(44,39939)|0;if(!c)c=0;else{Ne(c,b+4|0);h=c+16|0;b=b+20|0;k[h>>2]=k[b>>2];k[h+4>>2]=k[b+4>>2];k[h+8>>2]=k[b+8>>2];k[h+12>>2]=k[b+12>>2];k[h+16>>2]=k[b+16>>2];k[h+20>>2]=k[b+20>>2];k[h+24>>2]=k[b+24>>2];}k[f>>2]=0;k[d>>2]=k[f>>2];rj(e,c,d);k[a>>2]=k[e>>2];h=e+4|0;k[a+4>>2]=k[h>>2];k[e>>2]=0;k[h>>2]=0;sj(e);r=g;return;}function rj(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=3396;k[c+12>>2]=b;k[a+4>>2]=c;return;}function sj(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function tj(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=r;r=r+16|0;e=c;lt(e,a+56|0,b);d=k[e+4>>2]|0;b=a+32|0;k[b>>2]=k[e>>2];k[b+4>>2]=d;r=c;return;}function uj(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=r;r=r+16|0;e=c;lt(e,a+56|0,b);d=k[e+4>>2]|0;b=a+40|0;k[b>>2]=k[e>>2];k[b+4>>2]=d;r=c;return;}function vj(a,b){a=a|0;b=b|0;var c=0,d=0;d=b;c=k[d+4>>2]|0;b=a+48|0;k[b>>2]=k[d>>2];k[b+4>>2]=c;return;}function wj(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0;b=r;r=r+16|0;f=b;d=a+32|0;c=a+48|0;lt(f,d,c);g=f;e=k[g+4>>2]|0;k[d>>2]=k[g>>2];k[d+4>>2]=e;d=a+40|0;lt(f,d,c);e=k[f+4>>2]|0;k[d>>2]=k[f>>2];k[d+4>>2]=e;k[c>>2]=0;k[a+52>>2]=0;r=b;return;}function xj(a){a=a|0;k[a>>2]=4152;dO(a+4|0);return;}function yj(a){a=a|0;k[a>>2]=4152;dO(a+4|0);YN(a);return;}function zj(a){a=a|0;return a+4|0;}function Aj(a,b){a=a|0;b=b|0;var c=0.0,d=0.0;switch(b<<24>>24){case 1:{k[a+64>>2]=142;k[a+68>>2]=0;k[a+72>>2]=382;k[a+76>>2]=0;d=+o[a+36>>2];c=+o[a+44>>2];o[a+56>>2]=d-c;o[a+60>>2]=d+c;break;}case 2:{k[a+64>>2]=142;k[a+68>>2]=0;k[a+72>>2]=382;k[a+76>>2]=0;c=+o[a+36>>2];d=+o[a+44>>2];o[a+56>>2]=c+d;o[a+60>>2]=c-d;break;}case 3:{k[a+64>>2]=143;k[a+68>>2]=0;k[a+72>>2]=382;k[a+76>>2]=0;c=+o[a+32>>2];d=+o[a+40>>2];o[a+56>>2]=c+d;o[a+60>>2]=c-d;break;}case 4:{k[a+64>>2]=143;k[a+68>>2]=0;k[a+72>>2]=382;k[a+76>>2]=0;c=+o[a+32>>2];d=+o[a+40>>2];o[a+56>>2]=c-d;o[a+60>>2]=c+d;break;}default:{k[a+64>>2]=144;k[a+68>>2]=0;k[a+72>>2]=383;k[a+76>>2]=0;}}return;}function Bj(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=k[a+64>>2]|0;d=k[a+68>>2]|0;e=d&1;if((c|0)!=0|(d|0)!=0&(e|c|0)!=0){d=a+(d>>1)|0;if(e)c=k[(k[d>>2]|0)+c>>2]|0;$d[c&255](d,b);}return;}function Cj(a){a=a|0;var b=0,c=0,d=0;b=k[a+72>>2]|0;c=k[a+76>>2]|0;d=c&1;if((b|0)!=0|(c|0)!=0&(d|b|0)!=0){c=a+(c>>1)|0;if(d)b=k[(k[c>>2]|0)+b>>2]|0;_d[b&511](c);}a=a+64|0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;k[a+12>>2]=0;return;}function Dj(a){a=a|0;return a+48|0;}function Ej(a){a=a|0;return 1;}function Fj(a,b){a=a|0;b=b|0;b=b+20|0;k[a>>2]=k[b>>2];k[a+4>>2]=k[b+4>>2];k[a+8>>2]=k[b+8>>2];return;}function Gj(a,b){a=a|0;b=b|0;a=a+20|0;i[a>>0]=i[b>>0]|0;i[a+1>>0]=i[b+1>>0]|0;i[a+2>>0]=i[b+2>>0]|0;return;}function Hj(a,b){a=a|0;b=+b;o[a+24>>2]=b;return;}function Ij(a,b){a=a|0;b=b|0;i[a+28>>0]=b&1;return;}function Jj(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;f=r;r=r+16|0;d=f+4|0;e=f;c=VN(44,39939)|0;if(!c)c=0;else{Ne(c,b+4|0);g=c+16|0;b=b+20|0;k[g>>2]=k[b>>2];k[g+4>>2]=k[b+4>>2];k[g+8>>2]=k[b+8>>2];k[g+12>>2]=k[b+12>>2];k[g+16>>2]=k[b+16>>2];k[g+20>>2]=k[b+20>>2];k[g+24>>2]=k[b+24>>2];}k[e>>2]=0;k[d>>2]=k[e>>2];Tf(a,c,d);r=f;return;}function Kj(a,b){a=a|0;b=b|0;var c=0.0,d=0.0,e=0.0;d=+o[a+60>>2]+ +o[b+4>>2];e=+o[a+56>>2];c=+O(+(e-d))*.5;o[a+36>>2]=(e+d)*.5;o[a+44>>2]=c;return;}function Lj(a){a=a|0;return;}function Mj(a,b){a=a|0;b=b|0;var c=0.0,d=0.0,e=0.0;d=+o[a+60>>2]+ +o[b>>2];e=+o[a+56>>2];c=+O(+(e-d))*.5;o[a+32>>2]=(e+d)*.5;o[a+40>>2]=c;return;}function Nj(a,b){a=a|0;b=b|0;var c=0,d=0;d=b;c=k[d+4>>2]|0;b=a+48|0;k[b>>2]=k[d>>2];k[b+4>>2]=c;return;}function Oj(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;b=r;r=r+16|0;f=b;d=a+32|0;c=a+48|0;lt(f,d,c);e=k[f+4>>2]|0;k[d>>2]=k[f>>2];k[d+4>>2]=e;k[c>>2]=0;k[a+52>>2]=0;r=b;return;}function Pj(a,b){a=a|0;b=b|0;var c=0;k[a>>2]=4152;Ne(a+4|0,b);c=a+20|0;b=b+16|0;k[c>>2]=k[b>>2];k[c+4>>2]=k[b+4>>2];k[c+8>>2]=k[b+8>>2];k[c+12>>2]=k[b+12>>2];k[c+16>>2]=k[b+16>>2];k[c+20>>2]=k[b+20>>2];k[c+24>>2]=k[b+24>>2];o[a+48>>2]=0.0;o[a+52>>2]=0.0;b=a+64|0;k[b>>2]=0;k[b+4>>2]=0;k[b+8>>2]=0;k[b+12>>2]=0;return;}function Qj(a){a=a|0;k[a>>2]=4212;dO(a+4|0);return;}function Rj(a){a=a|0;k[a>>2]=4212;dO(a+4|0);YN(a);return;}function Sj(a){a=a|0;return a+4|0;}function Tj(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;g=a+32|0;c=a+72|0;k[c>>2]=145;d=a+76|0;k[d>>2]=0;e=a+80|0;k[e>>2]=384;f=a+84|0;k[f>>2]=0;switch(b<<24>>24){case 1:{b=k[a+36>>2]|0;k[a+56>>2]=k[a+40>>2];k[a+60>>2]=b;b=k[a+44>>2]|0;k[a+64>>2]=k[g>>2];k[a+68>>2]=b;break;}case 2:{b=k[a+36>>2]|0;k[a+56>>2]=k[g>>2];k[a+60>>2]=b;g=k[a+44>>2]|0;k[a+64>>2]=k[a+40>>2];k[a+68>>2]=g;break;}case 3:{b=k[a+44>>2]|0;k[a+56>>2]=k[a+40>>2];k[a+60>>2]=b;b=k[a+36>>2]|0;k[a+64>>2]=k[g>>2];k[a+68>>2]=b;break;}case 4:{b=k[a+44>>2]|0;k[a+56>>2]=k[g>>2];k[a+60>>2]=b;g=k[a+36>>2]|0;k[a+64>>2]=k[a+40>>2];k[a+68>>2]=g;break;}default:{k[c>>2]=146;k[d>>2]=0;k[e>>2]=385;k[f>>2]=0;}}return;}function Uj(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=k[a+72>>2]|0;d=k[a+76>>2]|0;e=d&1;if((c|0)!=0|(d|0)!=0&(e|c|0)!=0){d=a+(d>>1)|0;if(e)c=k[(k[d>>2]|0)+c>>2]|0;$d[c&255](d,b);}return;}function Vj(a){a=a|0;var b=0,c=0,d=0;b=k[a+80>>2]|0;c=k[a+84>>2]|0;d=c&1;if((b|0)!=0|(c|0)!=0&(d|b|0)!=0){c=a+(c>>1)|0;if(d)b=k[(k[c>>2]|0)+b>>2]|0;_d[b&511](c);}a=a+72|0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;k[a+12>>2]=0;return;}function Wj(a){a=a|0;return a+48|0;}function Xj(a){a=a|0;return 1;}function Yj(a,b){a=a|0;b=b|0;b=b+20|0;k[a>>2]=k[b>>2];k[a+4>>2]=k[b+4>>2];k[a+8>>2]=k[b+8>>2];return;}function Zj(a,b){a=a|0;b=b|0;a=a+20|0;i[a>>0]=i[b>>0]|0;i[a+1>>0]=i[b+1>>0]|0;i[a+2>>0]=i[b+2>>0]|0;return;}function _j(a,b){a=a|0;b=+b;o[a+24>>2]=b;return;}function $j(a,b){a=a|0;b=b|0;i[a+28>>0]=b&1;return;}function ak(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;f=r;r=r+16|0;d=f+4|0;e=f;c=VN(44,39939)|0;if(!c)c=0;else{Ne(c,b+4|0);g=c+16|0;b=b+20|0;k[g>>2]=k[b>>2];k[g+4>>2]=k[b+4>>2];k[g+8>>2]=k[b+8>>2];k[g+12>>2]=k[b+12>>2];k[g+16>>2]=k[b+16>>2];k[g+20>>2]=k[b+20>>2];k[g+24>>2]=k[b+24>>2];}k[e>>2]=0;k[d>>2]=k[e>>2];eg(a,c,d);r=f;return;}function bk(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=r;r=r+32|0;e=c+8|0;f=c;d=a+32|0;lt(f,a+64|0,b);st(e,a+56|0,f);k[d>>2]=k[e>>2];k[d+4>>2]=k[e+4>>2];k[d+8>>2]=k[e+8>>2];k[d+12>>2]=k[e+12>>2];r=c;return;}function ck(a){a=a|0;return;}function dk(a,b){a=a|0;b=b|0;var c=0,d=0;d=b;c=k[d+4>>2]|0;b=a+48|0;k[b>>2]=k[d>>2];k[b+4>>2]=c;return;}function ek(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0;b=r;r=r+48|0;i=b+40|0;h=b+32|0;e=b+16|0;g=b+8|0;f=b;d=a+32|0;c=k[a+36>>2]|0;k[i>>2]=k[d>>2];k[i+4>>2]=c;c=k[a+44>>2]|0;k[h>>2]=k[a+40>>2];k[h+4>>2]=c;c=a+48|0;lt(g,i,c);lt(f,h,c);st(e,g,f);k[d>>2]=k[e>>2];k[d+4>>2]=k[e+4>>2];k[d+8>>2]=k[e+8>>2];k[d+12>>2]=k[e+12>>2];k[c>>2]=0;k[a+52>>2]=0;r=b;return;}function fk(a,b){a=a|0;b=b|0;var c=0;k[a>>2]=4212;Ne(a+4|0,b);c=a+20|0;b=b+16|0;k[c>>2]=k[b>>2];k[c+4>>2]=k[b+4>>2];k[c+8>>2]=k[b+8>>2];k[c+12>>2]=k[b+12>>2];k[c+16>>2]=k[b+16>>2];k[c+20>>2]=k[b+20>>2];k[c+24>>2]=k[b+24>>2];a=a+48|0;b=a+40|0;do{k[a>>2]=0;a=a+4|0;}while((a|0)<(b|0));return;}function gk(a){a=a|0;k[a>>2]=4272;Cg(a+4|0);return;}function hk(a){a=a|0;k[a>>2]=4272;Cg(a+4|0);YN(a);return;}function ik(a){a=a|0;return a+4|0;}function jk(a,b){a=a|0;b=b|0;return;}function kk(a,b){a=a|0;b=b|0;var c=0,d=0;d=b;c=k[d+4>>2]|0;b=a+56|0;k[b>>2]=k[d>>2];k[b+4>>2]=c;return;}function lk(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;b=r;r=r+16|0;f=b;d=a+48|0;c=a+56|0;lt(f,d,c);e=k[f+4>>2]|0;k[d>>2]=k[f>>2];k[d+4>>2]=e;k[c>>2]=0;k[a+60>>2]=0;r=b;return;}function mk(a){a=a|0;return a+56|0;}function nk(a){a=a|0;return 1;}function ok(a,b){a=a|0;b=b|0;b=b+20|0;k[a>>2]=k[b>>2];k[a+4>>2]=k[b+4>>2];k[a+8>>2]=k[b+8>>2];return;}function pk(a,b){a=a|0;b=b|0;a=a+20|0;i[a>>0]=i[b>>0]|0;i[a+1>>0]=i[b+1>>0]|0;i[a+2>>0]=i[b+2>>0]|0;return;}function qk(a,b){a=a|0;b=+b;o[a+24>>2]=b;return;}function rk(a,b){a=a|0;b=b|0;i[a+28>>0]=b&1;return;}function sk(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;f=r;r=r+16|0;d=f+4|0;e=f;c=VN(52,39939)|0;if(!c)c=0;else Ag(c,b+4|0);k[e>>2]=0;k[d>>2]=k[e>>2];Bg(a,c,d);r=f;return;}function tk(a,b){a=a|0;b=b|0;k[a>>2]=4272;Ag(a+4|0,b);o[a+56>>2]=0.0;o[a+60>>2]=0.0;return;}function uk(a){a=a|0;return;}function vk(a){a=a|0;YN(a);return;}function wk(a,b){a=a|0;b=b|0;return;}function xk(a,b){a=a|0;b=b|0;return;}function yk(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;a=k[(k[c>>2]|0)+8>>2]|0;d=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;$d[a&255](c,d);return 10;}function zk(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0.0,f=0,g=0;c=be[k[(k[b>>2]|0)+36>>2]&255](b)|0;g=be[k[(k[c>>2]|0)+32>>2]&255](c)|0;b=k[g+4>>2]|0;f=a+4|0;k[f>>2]=k[g>>2];k[f+4>>2]=b;f=d;b=k[f+4>>2]|0;d=a+12|0;k[d>>2]=k[f>>2];k[d+4>>2]=b;e=+ie[k[(k[c>>2]|0)+20>>2]&7](c);o[a+20>>2]=e;return 0;}function Ak(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;c=be[k[(k[b>>2]|0)+36>>2]&255](b)|0;oe[k[(k[c>>2]|0)+36>>2]&1](c,a+4|0,+o[a+20>>2],a+12|0,d);return 0;}function Bk(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=be[k[(k[b>>2]|0)+36>>2]&255](b)|0;oe[k[(k[e>>2]|0)+36>>2]&1](e,a+4|0,+o[a+20>>2],a+12|0,d);a=k[(k[c>>2]|0)+8>>2]|0;d=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;$d[a&255](c,d);return 0;}function Ck(a,b,c){a=a|0;b=b|0;c=c|0;a=k[(k[c>>2]|0)+8>>2]|0;b=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;$d[a&255](c,b);return 0;}function Dk(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function Ek(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function Fk(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function Gk(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function Hk(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function Ik(a){a=a|0;YN(a);return;}function Jk(a,b){a=a|0;b=b|0;return;}function Kk(a,b){a=a|0;b=b|0;var c=0;a=r;r=r+16|0;c=a;b=be[k[(k[b>>2]|0)+60>>2]&255](b)|0;k[c>>2]=k[b>>2];k[b>>2]=0;b=b+4|0;k[c+4>>2]=k[b>>2];k[b>>2]=0;hl(c);r=a;return;}function Lk(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;a=k[(k[c>>2]|0)+8>>2]|0;d=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;$d[a&255](c,d);return 10;}function Mk(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0.0,h=0.0,i=0,j=0,l=0,m=0,n=0,p=0,q=0;q=r;r=r+64|0;m=q+56|0;i=q+48|0;j=q+40|0;e=q+28|0;n=q+16|0;f=q+8|0;p=q;l=be[k[(k[b>>2]|0)+36>>2]&255](b)|0;$d[k[(k[b>>2]|0)+68>>2]&255](e,b);a=be[k[(k[b>>2]|0)+44>>2]&255](b)|0;$d[k[(k[a>>2]|0)+8>>2]&255](n,a);se[k[(k[l>>2]|0)+24>>2]&63](f,l,d);g=+ie[k[(k[l>>2]|0)+20>>2]&7](l);l=(be[k[(k[l>>2]|0)+16>>2]&255](l)|0)+8|0;h=+o[l>>2];k[p>>2]=0;l=p+4|0;k[l>>2]=0;switch(be[k[(k[b>>2]|0)+92>>2]&255](b)|0){case 0:{a=VN(48,39939)|0;if(!a)a=0;else Lf(a,n,e,f);k[j>>2]=0;k[m>>2]=k[j>>2];gl(i,a,m);f=k[i>>2]|0;k[i>>2]=k[p>>2];k[p>>2]=f;f=i+4|0;j=k[f>>2]|0;k[f>>2]=k[l>>2];k[l>>2]=j;hl(i);break;}case 1:{a=VN(44,39939)|0;if(!a)a=0;else bf(a,n,f);k[j>>2]=0;k[m>>2]=k[j>>2];il(i,a,m);f=k[i>>2]|0;k[i>>2]=k[p>>2];k[p>>2]=f;f=i+4|0;j=k[f>>2]|0;k[f>>2]=k[l>>2];k[l>>2]=j;hl(i);break;}case 2:{a=VN(48,39939)|0;if(!a)a=0;else Ee(a,n,e,f);k[j>>2]=0;k[m>>2]=k[j>>2];jl(i,a,m);f=k[i>>2]|0;k[i>>2]=k[p>>2];k[p>>2]=f;f=i+4|0;j=k[f>>2]|0;k[f>>2]=k[l>>2];k[l>>2]=j;hl(i);break;}case 3:{a=VN(48,39939)|0;if(!a)a=0;else yf(a,n,e,f,g/h);k[j>>2]=0;k[m>>2]=k[j>>2];kl(i,a,m);f=k[i>>2]|0;k[i>>2]=k[p>>2];k[p>>2]=f;f=i+4|0;j=k[f>>2]|0;k[f>>2]=k[l>>2];k[l>>2]=j;hl(i);break;}case 4:{a=VN(56,39939)|0;if(!a)a=0;else Yf(a,n,e,f);k[j>>2]=0;k[m>>2]=k[j>>2];ll(i,a,m);f=k[i>>2]|0;k[i>>2]=k[p>>2];k[p>>2]=f;f=i+4|0;j=k[f>>2]|0;k[f>>2]=k[l>>2];k[l>>2]=j;hl(i);break;}case 5:{a=VN(56,39939)|0;if(!a)a=0;else jg(a,n,e,f);k[j>>2]=0;k[m>>2]=k[j>>2];ml(i,a,m);f=k[i>>2]|0;k[i>>2]=k[p>>2];k[p>>2]=f;f=i+4|0;j=k[f>>2]|0;k[f>>2]=k[l>>2];k[l>>2]=j;hl(i);break;}default:be[k[(k[b>>2]|0)+92>>2]&255](b)|0;}if(!(k[p>>2]|0)){m=k[(k[c>>2]|0)+8>>2]|0;a=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;$d[m&255](c,a);a=22;}else{d=be[k[(k[b>>2]|0)+60>>2]&255](b)|0;e=k[p>>2]|0;k[m>>2]=e;f=m+4|0;a=k[l>>2]|0;k[f>>2]=a;if(a|0)PN(a);k[m>>2]=k[d>>2];k[d>>2]=e;l=d+4|0;k[f>>2]=k[l>>2];k[l>>2]=a;hl(m);a=0;}hl(p);dO(n);r=q;return a|0;}function Nk(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=r;r=r+16|0;a=e;c=be[k[(k[b>>2]|0)+60>>2]&255](b)|0;if(k[c>>2]|0){b=be[k[(k[b>>2]|0)+36>>2]&255](b)|0;se[k[(k[b>>2]|0)+24>>2]&63](a,b,d);d=k[c>>2]|0;$d[k[(k[d>>2]|0)+12>>2]&255](d,a);}r=e;return 0;}function Ok(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,l=0;j=r;r=r+48|0;g=j+32|0;e=j+24|0;h=j+16|0;i=j+8|0;f=j;a=be[k[(k[b>>2]|0)+60>>2]&255](b)|0;if(k[a>>2]|0?(l=be[k[(k[b>>2]|0)+36>>2]&255](b)|0,se[k[(k[l>>2]|0)+24>>2]&63](e,l,d),d=k[a>>2]|0,$d[k[(k[d>>2]|0)+12>>2]&255](d,e),d=k[a>>2]|0,be[k[(k[d>>2]|0)+16>>2]&255](d)|0):0){l=k[a>>2]|0;$d[k[(k[l>>2]|0)+20>>2]&255](h,l);if(k[h>>2]|0){a=be[k[(k[b>>2]|0)+28>>2]&255](b)|0;$d[k[(k[a>>2]|0)+32>>2]&255](a,h);a=VN(12,39939)|0;if(!a)a=0;else Vk(a,h);k[f>>2]=0;k[g>>2]=k[f>>2];Wk(i,a,g);a=be[k[(k[b>>2]|0)+52>>2]&255](b)|0;e=k[(k[a>>2]|0)+8>>2]|0;k[g>>2]=k[i>>2];d=k[i+4>>2]|0;k[g+4>>2]=d;if(d|0)PN(d);$d[e&255](a,g);Xg(g);Xk(i);}Sg(h);}i=k[(k[c>>2]|0)+8>>2]|0;l=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;$d[i&255](c,l);r=j;return 0;}function Pk(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0;f=r;r=r+16|0;a=f;d=be[k[(k[b>>2]|0)+60>>2]&255](b)|0;e=k[d>>2]|0;if(e|0?be[k[(k[e>>2]|0)+16>>2]&255](e)|0:0){e=be[k[(k[b>>2]|0)+28>>2]&255](b)|0;g=k[(k[e>>2]|0)+32>>2]|0;d=k[d>>2]|0;$d[k[(k[d>>2]|0)+20>>2]&255](a,d);$d[g&255](e,a);Sg(a);}e=k[(k[c>>2]|0)+8>>2]|0;g=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;$d[e&255](c,g);r=f;return 0;}function Qk(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function Rk(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function Sk(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function Tk(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function Uk(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function Vk(a,b){a=a|0;b=b|0;k[a>>2]=4488;Pg(a+4|0,b);k[a>>2]=4512;return;}function Wk(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=4460;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Xk(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function Yk(a){a=a|0;NN(a);YN(a);return;}function Zk(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function _k(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==12011?a+12|0:0)|0;}function $k(a){a=a|0;YN(a);return;}function al(a){a=a|0;Sg(a+4|0);return;}function bl(a){a=a|0;Sg(a+4|0);YN(a);return;}function cl(a,b){a=a|0;b=b|0;Rg(a+4|0,b);return;}function dl(a,b){a=a|0;b=b|0;Qg(a+4|0,b);return;}function el(a){a=a|0;return;}function fl(a){a=a|0;YN(a);return;}function gl(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=4676;k[c+12>>2]=b;k[a+4>>2]=c;return;}function hl(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function il(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=4648;k[c+12>>2]=b;k[a+4>>2]=c;return;}function jl(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=4620;k[c+12>>2]=b;k[a+4>>2]=c;return;}function kl(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=4592;k[c+12>>2]=b;k[a+4>>2]=c;return;}function ll(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=4564;k[c+12>>2]=b;k[a+4>>2]=c;return;}function ml(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=4536;k[c+12>>2]=b;k[a+4>>2]=c;return;}function nl(a){a=a|0;NN(a);YN(a);return;}function ol(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function pl(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==12196?a+12|0:0)|0;}function ql(a){a=a|0;YN(a);return;}function rl(a){a=a|0;NN(a);YN(a);return;}function sl(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function tl(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==12347?a+12|0:0)|0;}function ul(a){a=a|0;YN(a);return;}function vl(a){a=a|0;NN(a);YN(a);return;}function wl(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function xl(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==12488?a+12|0:0)|0;}function yl(a){a=a|0;YN(a);return;}function zl(a){a=a|0;NN(a);YN(a);return;}function Al(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function Bl(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==12631?a+12|0:0)|0;}function Cl(a){a=a|0;YN(a);return;}function Dl(a){a=a|0;NN(a);YN(a);return;}function El(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function Fl(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==12774?a+12|0:0)|0;}function Gl(a){a=a|0;YN(a);return;}function Hl(a){a=a|0;NN(a);YN(a);return;}function Il(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function Jl(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==12915?a+12|0:0)|0;}function Kl(a){a=a|0;YN(a);return;}function Ll(a){a=a|0;YN(a);return;}function Ml(a,b){a=a|0;b=b|0;b=be[k[(k[b>>2]|0)+32>>2]&255](b)|0;_d[k[(k[b>>2]|0)+24>>2]&511](b);return;}function Nl(a,b){a=a|0;b=b|0;return;}function Ol(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0;h=r;r=r+32|0;f=h+8|0;g=h;se[k[(k[b>>2]|0)+64>>2]&63](f,b,d);a=k[f>>2]|0;k[g>>2]=a;e=k[f+4>>2]|0;k[g+4>>2]=e;if(e){PN(e);a=k[g>>2]|0;}if((a|0)!=0?(k[a+12>>2]|0)>>>0>2:0){d=k[(k[c>>2]|0)+8>>2]|0;a=be[k[(k[b>>2]|0)+16>>2]&255](b)|0;$d[d&255](c,a);a=1e3;}else if((be[k[(k[b>>2]|0)+92>>2]&255](b)|0)==6?ne[k[(k[b>>2]|0)+104>>2]&127](b,d)|0:0){d=k[(k[c>>2]|0)+8>>2]|0;a=be[k[(k[b>>2]|0)+20>>2]&255](b)|0;$d[d&255](c,a);a=0;}else a=1;Sg(g);Sg(f);r=h;return a|0;}function Pl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0;g=r;r=r+32|0;e=g+8|0;f=g;se[k[(k[b>>2]|0)+64>>2]&63](e,b,d);k[f>>2]=k[e>>2];a=k[e+4>>2]|0;k[f+4>>2]=a;if(a|0)PN(a);do if((be[k[(k[b>>2]|0)+92>>2]&255](b)|0)!=7){d=k[f>>2]|0;if(d|0?(k[d+12>>2]|0)>>>0>2:0){d=k[(k[c>>2]|0)+8>>2]|0;a=be[k[(k[b>>2]|0)+16>>2]&255](b)|0;$d[d&255](c,a);a=1e3;break;}if(((be[k[(k[b>>2]|0)+92>>2]&255](b)|0)&-2|0)==6)a=1;else{d=k[(k[c>>2]|0)+8>>2]|0;a=be[k[(k[b>>2]|0)+12>>2]&255](b)|0;$d[d&255](c,a);a=1e3;}}else{d=k[(k[c>>2]|0)+8>>2]|0;a=be[k[(k[b>>2]|0)+24>>2]&255](b)|0;$d[d&255](c,a);a=1e3;}while(0);Sg(f);Sg(e);r=g;return a|0;}function Ql(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function Rl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function Sl(a,b,c){a=a|0;b=b|0;c=c|0;return 1;}function Tl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;d=r;r=r+16|0;a=d;o[a>>2]=.5;o[a+4>>2]=.5;if(ne[k[(k[b>>2]|0)+104>>2]&127](b,a)|0){e=k[(k[c>>2]|0)+8>>2]|0;a=be[k[(k[b>>2]|0)+20>>2]&255](b)|0;$d[e&255](c,a);a=1e3;}else a=10;r=d;return a|0;}function Ul(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function Vl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function Wl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function Xl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function Yl(a){a=a|0;k[a>>2]=4768;Sg(a+28|0);return;}function Zl(a){a=a|0;k[a>>2]=4768;Sg(a+28|0);YN(a);return;}function _l(a,b){a=a|0;b=b|0;i[a+4>>0]=0;return;}function $l(a,b){a=a|0;b=b|0;var c=0,d=0;c=r;r=r+16|0;d=c;_d[k[(k[b>>2]|0)+80>>2]&511](b);b=a+28|0;k[d>>2]=k[b>>2];k[b>>2]=0;b=a+32|0;k[d+4>>2]=k[b>>2];k[b>>2]=0;Sg(d);r=c;return;}function am(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0;i=r;r=r+32|0;g=i+8|0;h=i;se[k[(k[b>>2]|0)+64>>2]&63](g,b,d);e=k[g>>2]|0;k[h>>2]=e;a=k[g+4>>2]|0;k[h+4>>2]=a;if(!a){d=h;a=e;}else{PN(a);d=h;a=k[h>>2]|0;}do if((a|0)!=0?(f=k[a+12>>2]|0,f>>>0>2):0){if((((f|0)==7?ne[k[(k[b>>2]|0)+84>>2]&127](b,a)|0:0)?(f=be[k[(k[b>>2]|0)+72>>2]&255](b)|0,((k[f+4>>2]|0)-(k[f>>2]|0)|0)==8):0)?ne[k[(k[b>>2]|0)+108>>2]&127](b,k[h>>2]|0)|0:0){f=k[(k[c>>2]|0)+8>>2]|0;a=be[k[(k[b>>2]|0)+20>>2]&255](b)|0;$d[f&255](c,a);a=1e3;break;}_d[k[(k[b>>2]|0)+80>>2]&511](b);if(ne[k[(k[b>>2]|0)+76>>2]&127](b,k[d>>2]|0)|0)a=0;else{f=k[(k[c>>2]|0)+8>>2]|0;a=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;$d[f&255](c,a);a=10;}}else j=6;while(0);if((j|0)==6){j=k[(k[c>>2]|0)+8>>2]|0;a=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;$d[j&255](c,a);a=0;}Sg(h);Sg(g);r=i;return a|0;}function bm(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0,m=0;m=r;r=r+32|0;h=m+8|0;j=m;se[k[(k[b>>2]|0)+64>>2]&63](h,b,d);f=k[h>>2]|0;k[j>>2]=f;e=k[h+4>>2]|0;k[j+4>>2]=e;if(!e)g=j;else{PN(e);g=j;f=k[j>>2]|0;}e=i[h+8>>0]|0;do if((f|0)!=0?(k[f+12>>2]|0)>>>0>2:0){if(!(e<<24>>24)){if(!(ne[k[(k[b>>2]|0)+84>>2]&127](b,f)|0)?(_d[k[(k[b>>2]|0)+80>>2]&511](b),!(ne[k[(k[b>>2]|0)+76>>2]&127](b,k[g>>2]|0)|0)):0){d=k[(k[c>>2]|0)+8>>2]|0;e=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;$d[d&255](c,e);e=10;break;}e=(En(a,b,0,d)|0)&1;i[a+4>>0]=e;e=0;break;}else{f=be[k[(k[b>>2]|0)+72>>2]&255](b)|0;if(((k[f+4>>2]|0)-(k[f>>2]|0)|0)!=8?(_d[k[(k[b>>2]|0)+80>>2]&511](b),!(ne[k[(k[b>>2]|0)+76>>2]&127](b,k[g>>2]|0)|0)):0){d=k[(k[c>>2]|0)+8>>2]|0;e=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;$d[d&255](c,e);e=10;break;}e=(En(a,b,e,d)|0)&1;i[a+4>>0]=e;e=0;break;}}else l=6;while(0);if((l|0)==6){l=k[(k[c>>2]|0)+8>>2]|0;e=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;$d[l&255](c,e);e=1e3;}Sg(j);Sg(h);r=m;return e|0;}function cm(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if(i[a+4>>0]|0)Cn(a,b,d);return 0;}function dm(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if(i[a+4>>0]|0){Cn(a,b,d);ln(a,b);}return 0;}function em(a,b,c){a=a|0;b=b|0;c=c|0;if(i[a+4>>0]|0)ln(a,b);return 0;}function fm(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function gm(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function hm(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;h=r;r=r+48|0;e=h+24|0;f=h+16|0;g=h;k[e>>2]=0;k[e+4>>2]=0;k[e+8>>2]=0;a=be[k[(k[b>>2]|0)+72>>2]&255](b)|0;c=k[a+4>>2]|0;a=k[a>>2]|0;while(1){if((a|0)==(c|0))break;j=k[a>>2]|0;$d[k[(k[j>>2]|0)+32>>2]&255](g,j);i[f>>0]=i[g>>0]|0;i[f+1>>0]=i[g+1>>0]|0;i[f+2>>0]=i[g+2>>0]|0;j=k[a>>2]|0;$d[k[(k[j>>2]|0)+36>>2]&255](j,d);j=k[a>>2]|0;Xm(e,be[k[(k[j>>2]|0)+8>>2]&255](j)|0,f,d);a=a+8|0;}_d[k[(k[b>>2]|0)+88>>2]&511](b);j=be[k[(k[b>>2]|0)+52>>2]&255](b)|0;d=k[(k[j>>2]|0)+8>>2]|0;lm(f,e);$d[d&255](j,f);Xg(f);Yg(e);r=h;return 0;}function im(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0.0,l=0;i=r;r=r+48|0;e=i+28|0;f=i+24|0;g=i+16|0;h=i;k[e>>2]=0;k[e+4>>2]=0;k[e+8>>2]=0;a=be[k[(k[b>>2]|0)+36>>2]&255](b)|0;j=+Hm(a,+((k[d>>2]|0)>>>0));o[f>>2]=j;a=be[k[(k[b>>2]|0)+72>>2]&255](b)|0;c=k[a+4>>2]|0;d=h+4|0;a=k[a>>2]|0;while(1){if((a|0)==(c|0))break;l=k[a>>2]|0;$d[k[(k[l>>2]|0)+32>>2]&255](h,l);k[g>>2]=k[d>>2];l=k[a>>2]|0;Zd[k[(k[l>>2]|0)+40>>2]&7](l,+o[f>>2]);l=k[a>>2]|0;Im(e,be[k[(k[l>>2]|0)+8>>2]&255](l)|0,g,f);a=a+8|0;}_d[k[(k[b>>2]|0)+88>>2]&511](b);l=be[k[(k[b>>2]|0)+52>>2]&255](b)|0;b=k[(k[l>>2]|0)+8>>2]|0;lm(g,e);$d[b&255](l,g);Xg(g);Yg(e);r=i;return 0;}function jm(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0;j=r;r=r+48|0;e=j+36|0;f=j+24|0;g=j+16|0;h=j;i[e>>0]=d&1;k[f>>2]=0;k[f+4>>2]=0;k[f+8>>2]=0;a=be[k[(k[b>>2]|0)+72>>2]&255](b)|0;c=k[a+4>>2]|0;d=h+8|0;a=k[a>>2]|0;while(1){if((a|0)==(c|0))break;l=k[a>>2]|0;$d[k[(k[l>>2]|0)+32>>2]&255](h,l);i[g>>0]=i[d>>0]|0;l=k[a>>2]|0;$d[k[(k[l>>2]|0)+44>>2]&255](l,(i[e>>0]|0)!=0);l=k[a>>2]|0;km(f,be[k[(k[l>>2]|0)+8>>2]&255](l)|0,g,e);a=a+8|0;}_d[k[(k[b>>2]|0)+88>>2]&511](b);l=be[k[(k[b>>2]|0)+52>>2]&255](b)|0;b=k[(k[l>>2]|0)+8>>2]|0;lm(g,f);$d[b&255](l,g);Xg(g);Yg(f);r=j;return 0;}function km(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;j=r;r=r+32|0;g=j+16|0;h=j+8|0;f=j;e=VN(28,39939)|0;if(!e)e=0;else sm(e,b,(i[c>>0]|0)!=0,(i[d>>0]|0)!=0);k[f>>2]=0;k[g>>2]=k[f>>2];tm(h,e,g);e=k[h>>2]|0;if(e|0){k[g>>2]=e;c=g+4|0;e=k[h+4>>2]|0;k[c>>2]=e;if(e|0)PN(e);e=a+4|0;b=k[e>>2]|0;if(b>>>0<(k[a+8>>2]|0)>>>0){k[b>>2]=k[g>>2];k[b+4>>2]=k[c>>2];k[g>>2]=0;k[c>>2]=0;k[e>>2]=b+8;}else um(a,g);Xg(g);}vm(h);r=j;return;}function lm(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;h=r;r=r+32|0;e=h+16|0;f=h+8|0;g=h;c=k[b>>2]|0;d=k[b+4>>2]|0;do if((c|0)==(d|0)){k[a>>2]=0;k[a+4>>2]=0;}else{if((d-c|0)==8){k[a>>2]=k[c>>2];c=k[c+4>>2]|0;k[a+4>>2]=c;if(!c)break;PN(c);break;}c=VN(16,39939)|0;if(!c)c=0;else Zg(c,b);k[g>>2]=0;k[e>>2]=k[g>>2];mm(f,c,e);k[a>>2]=k[f>>2];g=f+4|0;k[a+4>>2]=k[g>>2];k[f>>2]=0;k[g>>2]=0;nm(f);}while(0);r=h;return;}function mm(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=4832;k[c+12>>2]=b;k[a+4>>2]=c;return;}function nm(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function om(a){a=a|0;NN(a);YN(a);return;}function pm(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function qm(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==13113?a+12|0:0)|0;}function rm(a){a=a|0;YN(a);return;}function sm(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a>>2]=4888;bO(a+4|0,b);i[a+16>>0]=c&1;i[a+17>>0]=d&1;k[a+20>>2]=44;k[a+24>>2]=1;k[a>>2]=4912;return;}function tm(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=4860;k[c+12>>2]=b;k[a+4>>2]=c;return;}function um(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;g=r;r=r+32|0;c=g;d=k[a+4>>2]|0;e=k[a>>2]|0;f=(d-e>>3)+1|0;if(f>>>0>536870911)MN(a);else{i=(k[a+8>>2]|0)-e|0;h=i>>2;jh(c,i>>3>>>0<268435455?h>>>0<f>>>0?f:h:536870911,d-e>>3,a+8|0);f=c+8|0;e=k[f>>2]|0;k[e>>2]=k[b>>2];d=b+4|0;k[e+4>>2]=k[d>>2];k[b>>2]=0;k[d>>2]=0;k[f>>2]=e+8;kh(a,c);lh(c);r=g;return;}}function vm(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function wm(a){a=a|0;NN(a);YN(a);return;}function xm(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function ym(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==13264?a+12|0:0)|0;}function zm(a){a=a|0;YN(a);return;}function Am(a){a=a|0;k[a>>2]=4888;dO(a+4|0);return;}function Bm(a){a=a|0;k[a>>2]=4888;dO(a+4|0);YN(a);return;}function Cm(a,b){a=a|0;b=b|0;Em(a,b,a+16|0);return;}function Dm(a,b){a=a|0;b=b|0;Em(a,b,a+17|0);return;}function Em(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,j=0;h=r;r=r+16|0;f=h+8|0;g=h;Fm(f,a,b);e=k[f>>2]|0;if(e|0){d=k[a+20>>2]|0;j=k[a+24>>2]|0;a=e+(j>>1)|0;if(j&1)d=k[(k[a>>2]|0)+d>>2]|0;$d[d&255](a,(i[c>>0]|0)!=0);j=k[(k[b>>2]|0)+48>>2]|0;c=k[f>>2]|0;$d[k[(k[c>>2]|0)+48>>2]&255](g,c);$d[j&255](b,g);Sg(g);}Ch(f);r=h;return;}function Fm(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=r;r=r+16|0;d=e;se[k[(k[c>>2]|0)+28>>2]&63](d,c,b+4|0);b=k[d>>2]|0;if(!b){k[a>>2]=0;k[a+4>>2]=0;}else gi(a,b);Sg(d);r=e;return;}function Gm(a){a=a|0;k[a>>2]=4888;dO(a+4|0);YN(a);return;}function Hm(a,b){a=a|0;b=+b;var c=0;c=(be[k[(k[a>>2]|0)+16>>2]&255](a)|0)+8|0;b=+o[c>>2]*b;return+(b/+ie[k[(k[a>>2]|0)+20>>2]&7](a));}function Im(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;i=r;r=r+32|0;g=i+16|0;h=i+8|0;f=i;e=VN(32,39939)|0;if(!e)e=0;else Jm(e,b,+o[c>>2],+o[d>>2]);k[f>>2]=0;k[g>>2]=k[f>>2];Km(h,e,g);e=k[h>>2]|0;if(e|0){k[g>>2]=e;c=g+4|0;e=k[h+4>>2]|0;k[c>>2]=e;if(e|0)PN(e);e=a+4|0;b=k[e>>2]|0;if(b>>>0<(k[a+8>>2]|0)>>>0){k[b>>2]=k[g>>2];k[b+4>>2]=k[c>>2];k[g>>2]=0;k[c>>2]=0;k[e>>2]=b+8;}else um(a,g);Xg(g);}Lm(h);r=i;return;}function Jm(a,b,c,d){a=a|0;b=b|0;c=+c;d=+d;k[a>>2]=4964;bO(a+4|0,b);o[a+16>>2]=c;o[a+20>>2]=d;k[a+24>>2]=40;k[a+28>>2]=1;k[a>>2]=4988;return;}function Km(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=4936;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Lm(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function Mm(a){a=a|0;NN(a);YN(a);return;}function Nm(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function Om(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==13515?a+12|0:0)|0;}function Pm(a){a=a|0;YN(a);return;}function Qm(a){a=a|0;k[a>>2]=4964;dO(a+4|0);return;}function Rm(a){a=a|0;k[a>>2]=4964;dO(a+4|0);YN(a);return;}function Sm(a,b){a=a|0;b=b|0;Um(a,b,a+16|0);return;}function Tm(a,b){a=a|0;b=b|0;Um(a,b,a+20|0);return;}function Um(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0;h=r;r=r+16|0;f=h+8|0;g=h;Vm(f,a,b);e=k[f>>2]|0;if(e|0){d=k[a+24>>2]|0;i=k[a+28>>2]|0;a=e+(i>>1)|0;if(i&1)d=k[(k[a>>2]|0)+d>>2]|0;Zd[d&7](a,+o[c>>2]);i=k[(k[b>>2]|0)+48>>2]|0;c=k[f>>2]|0;$d[k[(k[c>>2]|0)+48>>2]&255](g,c);$d[i&255](b,g);Sg(g);}Ch(f);r=h;return;}function Vm(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=r;r=r+16|0;d=e;se[k[(k[c>>2]|0)+28>>2]&63](d,c,b+4|0);b=k[d>>2]|0;if(!b){k[a>>2]=0;k[a+4>>2]=0;}else gi(a,b);Sg(d);r=e;return;}function Wm(a){a=a|0;k[a>>2]=4964;dO(a+4|0);YN(a);return;}function Xm(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;i=r;r=r+32|0;g=i+16|0;h=i+8|0;f=i;e=VN(32,39939)|0;if(!e)e=0;else Ym(e,b,c,d);k[f>>2]=0;k[g>>2]=k[f>>2];Zm(h,e,g);e=k[h>>2]|0;if(e|0){k[g>>2]=e;c=g+4|0;e=k[h+4>>2]|0;k[c>>2]=e;if(e|0)PN(e);e=a+4|0;b=k[e>>2]|0;if(b>>>0<(k[a+8>>2]|0)>>>0){k[b>>2]=k[g>>2];k[b+4>>2]=k[c>>2];k[g>>2]=0;k[c>>2]=0;k[e>>2]=b+8;}else um(a,g);Xg(g);}_m(h);r=i;return;}function Ym(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a>>2]=5040;bO(a+4|0,b);b=a+16|0;i[b>>0]=i[c>>0]|0;i[b+1>>0]=i[c+1>>0]|0;i[b+2>>0]=i[c+2>>0]|0;c=a+19|0;i[c>>0]=i[d>>0]|0;i[c+1>>0]=i[d+1>>0]|0;i[c+2>>0]=i[d+2>>0]|0;k[a+24>>2]=36;k[a+28>>2]=1;k[a>>2]=5064;return;}function Zm(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=5012;k[c+12>>2]=b;k[a+4>>2]=c;return;}function _m(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function $m(a){a=a|0;NN(a);YN(a);return;}function an(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function bn(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==13766?a+12|0:0)|0;}function cn(a){a=a|0;YN(a);return;}function dn(a){a=a|0;k[a>>2]=5040;dO(a+4|0);return;}function en(a){a=a|0;k[a>>2]=5040;dO(a+4|0);YN(a);return;}function fn(a,b){a=a|0;b=b|0;hn(a,b,a+16|0);return;}function gn(a,b){a=a|0;b=b|0;hn(a,b,a+19|0);return;}function hn(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0;h=r;r=r+16|0;f=h+8|0;g=h;jn(f,a,b);e=k[f>>2]|0;if(e|0){d=k[a+24>>2]|0;i=k[a+28>>2]|0;a=e+(i>>1)|0;if(i&1)d=k[(k[a>>2]|0)+d>>2]|0;$d[d&255](a,c);i=k[(k[b>>2]|0)+48>>2]|0;c=k[f>>2]|0;$d[k[(k[c>>2]|0)+48>>2]&255](g,c);$d[i&255](b,g);Sg(g);}Ch(f);r=h;return;}function jn(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=r;r=r+16|0;d=e;se[k[(k[c>>2]|0)+28>>2]&63](d,c,b+4|0);b=k[d>>2]|0;if(!b){k[a>>2]=0;k[a+4>>2]=0;}else gi(a,b);Sg(d);r=e;return;}function kn(a){a=a|0;k[a>>2]=5040;dO(a+4|0);YN(a);return;}function ln(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;g=r;r=r+32|0;c=g+8|0;d=g;i[a+4>>0]=0;e=be[k[(k[b>>2]|0)+72>>2]&255](b)|0;f=k[e>>2]|0;if((f|0)!=(k[e+4>>2]|0)){k[c>>2]=0;k[c+4>>2]=0;k[c+8>>2]=0;if(!(i[a+16>>0]|0))mn(a,e,c);else nn(a,k[f>>2]|0,c);_d[k[(k[b>>2]|0)+88>>2]&511](b);f=be[k[(k[b>>2]|0)+52>>2]&255](b)|0;e=k[(k[f>>2]|0)+8>>2]|0;lm(d,c);$d[e&255](f,d);Xg(d);Yg(c);}r=g;return;}function mn(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=k[b+4>>2]|0;d=a+20|0;a=k[b>>2]|0;while(1){if((a|0)==(e|0))break;b=k[a>>2]|0;_d[k[(k[b>>2]|0)+20>>2]&511](b);b=k[a>>2]|0;vn(c,be[k[(k[b>>2]|0)+8>>2]&255](b)|0,d);a=a+8|0;}return;}function nn(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;d=r;r=r+16|0;e=d;_d[k[(k[b>>2]|0)+20>>2]&511](b);f=a+28|0;$d[k[(k[b>>2]|0)+48>>2]&255](e,b);on(c,f,e);Sg(e);k[e>>2]=k[f>>2];k[f>>2]=0;c=a+32|0;k[e+4>>2]=k[c>>2];k[c>>2]=0;Sg(e);r=d;return;}function on(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;h=r;r=r+32|0;f=h+16|0;g=h+8|0;e=h;d=VN(20,39939)|0;if(!d)d=0;else wh(d,b,c);k[e>>2]=0;k[f>>2]=k[e>>2];pn(g,d,f);d=k[g>>2]|0;if(d|0){k[f>>2]=d;c=f+4|0;d=k[g+4>>2]|0;k[c>>2]=d;if(d|0)PN(d);d=a+4|0;b=k[d>>2]|0;if(b>>>0<(k[a+8>>2]|0)>>>0){k[b>>2]=k[f>>2];k[b+4>>2]=k[c>>2];k[f>>2]=0;k[c>>2]=0;k[d>>2]=b+8;}else um(a,f);Xg(f);}qn(g);r=h;return;}function pn(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=5088;k[c+12>>2]=b;k[a+4>>2]=c;return;}function qn(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function rn(a){a=a|0;NN(a);YN(a);return;}function sn(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function tn(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==14018?a+12|0:0)|0;}function un(a){a=a|0;YN(a);return;}function vn(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;h=r;r=r+32|0;f=h+16|0;g=h+8|0;e=h;d=VN(24,39939)|0;if(!d)d=0;else Dh(d,b,c);k[e>>2]=0;k[f>>2]=k[e>>2];wn(g,d,f);d=k[g>>2]|0;if(d|0){k[f>>2]=d;c=f+4|0;d=k[g+4>>2]|0;k[c>>2]=d;if(d|0)PN(d);d=a+4|0;b=k[d>>2]|0;if(b>>>0<(k[a+8>>2]|0)>>>0){k[b>>2]=k[f>>2];k[b+4>>2]=k[c>>2];k[f>>2]=0;k[c>>2]=0;k[d>>2]=b+8;}else um(a,f);Xg(f);}xn(g);r=h;return;}function wn(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=5116;k[c+12>>2]=b;k[a+4>>2]=c;return;}function xn(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function yn(a){a=a|0;NN(a);YN(a);return;}function zn(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function An(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==14175?a+12|0:0)|0;}function Bn(a){a=a|0;YN(a);return;}function Cn(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0;e=r;r=r+16|0;f=e+8|0;g=e;d=be[k[(k[b>>2]|0)+72>>2]&255](b)|0;b=be[k[(k[b>>2]|0)+36>>2]&255](b)|0;se[k[(k[b>>2]|0)+24>>2]&63](f,b,c);b=a+20|0;mt(g,f,a+8|0);f=k[g+4>>2]|0;c=b;k[c>>2]=k[g>>2];k[c+4>>2]=f;c=k[d>>2]|0;do if((c|0)!=(k[d+4>>2]|0))if(!(i[a+16>>0]|0)){Dn(a,d);break;}else{g=k[c>>2]|0;$d[k[(k[g>>2]|0)+16>>2]&255](g,b);break;}while(0);r=e;return;}function Dn(a,b){a=a|0;b=b|0;var c=0,d=0;d=k[b+4>>2]|0;c=a+20|0;a=k[b>>2]|0;while(1){if((a|0)==(d|0))break;b=k[a>>2]|0;$d[k[(k[b>>2]|0)+16>>2]&255](b,c);a=a+8|0;}return;}function En(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0;j=r;r=r+16|0;g=j;h=j+8|0;e=be[k[(k[b>>2]|0)+72>>2]&255](b)|0;f=e+4|0;a:do if((k[e>>2]|0)==(k[f>>2]|0))b=0;else{i[a+4>>0]=1;l=be[k[(k[b>>2]|0)+36>>2]&255](b)|0;se[k[(k[l>>2]|0)+24>>2]&63](g,l,d);l=g;d=k[l+4>>2]|0;b=a+8|0;k[b>>2]=k[l>>2];k[b+4>>2]=d;i[a+16>>0]=c;b=k[e>>2]|0;if(c<<24>>24){f=k[b>>2]|0;$d[k[(k[f>>2]|0)+12>>2]&255](f,c);c=a+28|0;b=k[b>>2]|0;$d[k[(k[b>>2]|0)+48>>2]&255](h,b);b=k[h>>2]|0;f=h+4|0;l=k[f>>2]|0;k[h>>2]=0;k[f>>2]=0;k[g>>2]=k[c>>2];k[c>>2]=b;b=a+32|0;k[g+4>>2]=k[b>>2];k[b>>2]=l;Sg(g);Sg(h);b=1;break;}d=k[f>>2]|0;while(1){if((b|0)==(d|0)){b=1;break a;}l=k[b>>2]|0;$d[k[(k[l>>2]|0)+12>>2]&255](l,0);b=b+8|0;}}while(0);r=j;return b|0;}function Fn(a){a=a|0;k[a>>2]=5144;ho(a+124|0);Bo(a+112|0);hl(a+104|0);Co(a+96|0);Co(a+88|0);Co(a+80|0);Co(a+72|0);Co(a+64|0);Do(a+36|0);Eo(a+28|0);Fo(a+20|0);Go(a+12|0);Ho(a+4|0);return;}function Gn(a){a=a|0;Fn(a);YN(a);return;}function Hn(a){a=a|0;return a+64|0;}function In(a){a=a|0;return a+72|0;}function Jn(a){a=a|0;return a+80|0;}function Kn(a){a=a|0;return a+88|0;}function Ln(a){a=a|0;return a+96|0;}function Mn(a){a=a|0;return k[a+4>>2]|0;}function Nn(a){a=a|0;return k[a+12>>2]|0;}function On(a){a=a|0;return k[a+44>>2]|0;}function Pn(a){a=a|0;return k[a+48>>2]|0;}function Qn(a){a=a|0;return k[a+20>>2]|0;}function Rn(a){a=a|0;return k[a+28>>2]|0;}function Sn(a){a=a|0;return k[a+52>>2]|0;}function Tn(a){a=a|0;return a+36|0;}function Un(a){a=a|0;return a+104|0;}function Vn(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;d=r;r=r+16|0;e=d;f=k[b+12>>2]|0;se[k[(k[f>>2]|0)+32>>2]&63](e,f,c);c=k[b+4>>2]|0;se[k[(k[c>>2]|0)+24>>2]&63](a,c,e);i[a+8>>0]=i[e+4>>0]|0;r=d;return;}function Wn(a,b){a=a|0;b=b|0;var c=0.0,d=0,e=0;e=b+48|0;d=k[e>>2]|0;c=+Hm(k[b+44>>2]|0,+((k[d>>2]|0)>>>0));b=i[(k[e>>2]|0)+7>>0]|0;d=d+4|0;i[a>>0]=i[d>>0]|0;i[a+1>>0]=i[d+1>>0]|0;i[a+2>>0]=i[d+2>>0]|0;o[a+4>>2]=c;i[a+8>>0]=b;return;}function Xn(a){a=a|0;return a+112|0;}function Yn(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,l=0;l=r;r=r+48|0;f=l;h=l+40|0;g=l+24|0;e=l+16|0;d=l+8|0;if(ne[k[(k[a>>2]|0)+84>>2]&127](a,b)|0)c=1;else{gi(h,b);c=k[h>>2]|0;if(!c)c=0;else{if((k[b+12>>2]|0)>>>0>2){c=k[a+4>>2]|0;se[k[(k[c>>2]|0)+40>>2]&63](g,c,b);if(i[g>>0]|0){c=VN(20,39939)|0;if(!c)c=0;else Ih(c,b,j[g+2>>1]|0,j[g+4>>1]|0);k[d>>2]=0;k[f>>2]=k[d>>2];oo(e,c,f);c=k[a+52>>2]|0;b=k[(k[c>>2]|0)+8>>2]|0;k[f>>2]=k[e>>2];d=k[e+4>>2]|0;k[f+4>>2]=d;if(d|0)PN(d);$d[b&255](c,f);Xg(f);po(e);}c=k[h>>2]|0;}if(be[k[(k[c>>2]|0)+28>>2]&255](c)|0){d=k[a+48>>2]|0;e=k[h>>2]|0;$d[k[(k[e>>2]|0)+32>>2]&255](g,e);qo(f,a,g);e=f;f=k[e+4>>2]|0;g=d;k[g>>2]=k[e>>2];k[g+4>>2]=f;gh(k[a+36>>2]|0);}d=a+116|0;c=k[d>>2]|0;if((c|0)==(k[a+120>>2]|0))ro(a+112|0,h);else{k[c>>2]=k[h>>2];b=k[h+4>>2]|0;k[c+4>>2]=b;if(b){PN(b);c=k[d>>2]|0;}k[d>>2]=c+8;}c=k[a+12>>2]|0;_d[k[(k[c>>2]|0)+24>>2]&511](c);c=1;}Ch(h);}r=l;return c|0;}function Zn(a){a=a|0;var b=0,c=0,d=0;b=k[a+112>>2]|0;c=a+116|0;while(1){d=k[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;k[c>>2]=d;Ch(d);}d=k[a+12>>2]|0;_d[k[(k[d>>2]|0)+24>>2]&511](d);return;}function _n(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0;m=a+116|0;h=k[m>>2]|0;j=b+11|0;l=b+4|0;a=k[a+112>>2]|0;a:while(1){if((a|0)==(h|0)){a=h;break;}c=k[a>>2]|0;c=be[k[(k[c>>2]|0)+8>>2]&255](c)|0;e=i[c+11>>0]|0;f=e<<24>>24<0;e=e&255;g=f?k[c+4>>2]|0:e;n=i[j>>0]|0;d=n<<24>>24<0;b:do if((g|0)==((d?k[l>>2]|0:n&255)|0)){d=d?k[b>>2]|0:b;if(f)if(!(no(k[c>>2]|0,d,g)|0))break a;else break;while(1){if(!e)break a;if((i[c>>0]|0)!=(i[d>>0]|0))break b;e=e+-1|0;d=d+1|0;c=c+1|0;}}while(0);a=a+8|0;}return(a|0)!=(k[m>>2]|0)|0;}function $n(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0;e=r;r=r+16|0;b=e;c=k[a+116>>2]|0;d=a+4|0;a=k[a+112>>2]|0;while(1){if((a|0)==(c|0))break;f=k[d>>2]|0;g=k[(k[f>>2]|0)+48>>2]|0;h=k[a>>2]|0;$d[k[(k[h>>2]|0)+48>>2]&255](b,h);$d[g&255](f,b);Sg(b);a=a+8|0;}r=e;return;}function ao(a){a=a|0;return k[a+56>>2]|0;}function bo(a,b){a=a|0;b=b|0;k[a+56>>2]=b;return 0;}function co(a){a=a|0;return a+124|0;}function eo(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0;i=r;r=r+128|0;d=i+104|0;e=i+96|0;f=i+88|0;g=i+76|0;j=i+64|0;c=i+56|0;h=i;l=k[a+20>>2]|0;$d[k[(k[l>>2]|0)+8>>2]&255](g,l);$d[k[(k[a>>2]|0)+68>>2]&255](j,a);l=k[a+44>>2]|0;se[k[(k[l>>2]|0)+24>>2]&63](c,l,b);k[d>>2]=0;k[d+4>>2]=0;k[d+8>>2]=0;Jg(d,38232,0);mo(h,g,j,d,k[a+60>>2]|0,c);Dg(d);c=a+124|0;b=VN(64,39939)|0;if(!b)b=0;else Og(b,h,1);k[f>>2]=0;k[d>>2]=k[f>>2];go(e,b,d);f=k[e>>2]|0;k[e>>2]=k[c>>2];k[c>>2]=f;f=e+4|0;l=a+128|0;j=k[f>>2]|0;k[f>>2]=k[l>>2];k[l>>2]=j;ho(e);l=k[a+4>>2]|0;j=k[(k[l>>2]|0)+32>>2]|0;f=k[c>>2]|0;$d[k[(k[f>>2]|0)+60>>2]&255](d,f);$d[j&255](l,d);Sg(d);l=(k[c>>2]|0)!=0;Cg(h);dO(g);r=i;return l|0;}function fo(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;h=r;r=r+32|0;d=h+16|0;e=h+8|0;f=h;g=a+124|0;c=VN(64,39939)|0;if(!c)c=0;else Og(c,b,0);k[f>>2]=0;k[d>>2]=k[f>>2];go(e,c,d);d=k[e>>2]|0;k[e>>2]=k[g>>2];k[g>>2]=d;d=e+4|0;f=a+128|0;a=k[d>>2]|0;k[d>>2]=k[f>>2];k[f>>2]=a;ho(e);r=h;return(k[g>>2]|0)!=0|0;}function go(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=5264;k[c+12>>2]=b;k[a+4>>2]=c;return;}function ho(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function io(a){a=a|0;NN(a);YN(a);return;}function jo(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function ko(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==14342?a+12|0:0)|0;}function lo(a){a=a|0;YN(a);return;}function mo(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;bO(a,b);k[a+12>>2]=7;b=a+16|0;k[b>>2]=k[c>>2];k[b+4>>2]=k[c+4>>2];k[b+8>>2]=k[c+8>>2];Ig(a+28|0,d);k[a+40>>2]=e;d=f;e=k[d+4>>2]|0;f=a+44|0;k[f>>2]=k[d>>2];k[f+4>>2]=e;return;}function no(a,b,c){a=a|0;b=b|0;c=c|0;if(!c)a=0;else a=FN(a,b,c)|0;return a|0;}function oo(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=5292;k[c+12>>2]=b;k[a+4>>2]=c;return;}function po(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function qo(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;d=wo(+vo(k[b+44>>2]|0,+o[c+4>>2]))|0;b=i[c+8>>0]|0;k[a>>2]=d;d=a+4|0;i[d>>0]=i[c>>0]|0;i[d+1>>0]=i[c+1>>0]|0;i[d+2>>0]=i[c+2>>0]|0;i[a+7>>0]=b;return;}function ro(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;g=r;r=r+32|0;f=g;c=k[a+4>>2]|0;d=k[a>>2]|0;e=(c-d>>3)+1|0;if(e>>>0>536870911)MN(a);i=(k[a+8>>2]|0)-d|0;h=i>>2;so(f,i>>3>>>0<268435455?h>>>0<e>>>0?e:h:536870911,c-d>>3,a+8|0);e=f+8|0;c=k[e>>2]|0;k[c>>2]=k[b>>2];d=k[b+4>>2]|0;k[c+4>>2]=d;if(d){PN(d);c=k[e>>2]|0;}k[e>>2]=c+8;to(a,f);uo(f);r=g;return;}function so(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;do if(b){if(b>>>0>536870911){c=vc(4)|0;hP(c);Pd(c|0,2968,374);}else{d=UN(b<<3)|0;break;}}else d=0;while(0);k[a>>2]=d;c=d+(c<<3)|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+(b<<3);return;}function to(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;d=k[a>>2]|0;e=a+4|0;f=b+4|0;c=k[e>>2]|0;while(1){if((c|0)==(d|0))break;i=k[f>>2]|0;g=c+-8|0;k[i+-8>>2]=k[g>>2];h=c+-4|0;k[i+-4>>2]=k[h>>2];k[g>>2]=0;k[h>>2]=0;k[f>>2]=(k[f>>2]|0)+-8;c=g;}g=k[a>>2]|0;k[a>>2]=k[f>>2];k[f>>2]=g;g=b+8|0;i=k[e>>2]|0;k[e>>2]=k[g>>2];k[g>>2]=i;g=a+8|0;i=b+12|0;h=k[g>>2]|0;k[g>>2]=k[i>>2];k[i>>2]=h;k[b>>2]=k[f>>2];return;}function uo(a){a=a|0;var b=0,c=0,d=0;b=k[a+4>>2]|0;c=a+8|0;while(1){d=k[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;k[c>>2]=d;Ch(d);}a=k[a>>2]|0;if(a|0)YN(a);return;}function vo(a,b){a=a|0;b=+b;b=+ie[k[(k[a>>2]|0)+20>>2]&7](a)*b;a=(be[k[(k[a>>2]|0)+16>>2]&255](a)|0)+8|0;return+(b/+o[a>>2]);}function wo(a){a=+a;var b=0;if(!(a<=4.0)){if(!(a>=12.0))b=~~(a*2.0+2.0)>>>0>>>2<<1;else b=12;}else b=4;return b|0;}function xo(a){a=a|0;NN(a);YN(a);return;}function yo(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function zo(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==14481?a+12|0:0)|0;}function Ao(a){a=a|0;YN(a);return;}function Bo(a){a=a|0;var b=0,c=0,d=0;b=k[a>>2]|0;if(b|0){c=a+4|0;while(1){d=k[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;k[c>>2]=d;Ch(d);}YN(k[a>>2]|0);}return;}function Co(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function Do(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function Eo(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function Fo(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function Go(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function Ho(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function Io(a,b,c,d,e,f,g,h,i,j,l){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;l=l|0;var m=0,n=0,p=0,q=0,s=0,t=0,u=0;u=r;r=r+32|0;s=u+20|0;m=u+16|0;n=u+12|0;p=u+8|0;q=u+4|0;t=u;k[a>>2]=5144;k[a+4>>2]=k[b>>2];b=k[b+4>>2]|0;k[a+8>>2]=b;if(b|0)PN(b);k[a+12>>2]=k[c>>2];b=k[c+4>>2]|0;k[a+16>>2]=b;if(b|0)PN(b);k[a+20>>2]=k[d>>2];b=k[d+4>>2]|0;k[a+24>>2]=b;if(b|0)PN(b);k[a+28>>2]=k[e>>2];b=k[e+4>>2]|0;k[a+32>>2]=b;if(b|0)PN(b);k[a+36>>2]=k[f>>2];b=k[f+4>>2]|0;k[a+40>>2]=b;if(b|0)PN(b);k[a+44>>2]=g;k[a+48>>2]=h;k[a+52>>2]=i;k[a+56>>2]=j;k[a+60>>2]=l;b=VN(4,39939)|0;if(!b)b=0;else k[b>>2]=4704;k[m>>2]=0;k[s>>2]=k[m>>2];Jo(a+64|0,b,s);b=VN(4,39939)|0;if(!b)b=0;else k[b>>2]=4396;k[n>>2]=0;k[s>>2]=k[n>>2];Ko(a+72|0,b,s);b=VN(36,39939)|0;if(!b)b=0;else{n=b+4|0;k[n>>2]=0;k[n+4>>2]=0;k[n+8>>2]=0;k[n+12>>2]=0;k[b>>2]=4768;o[b+8>>2]=0.0;o[b+12>>2]=0.0;n=b+20|0;k[n>>2]=0;k[n+4>>2]=0;k[n+8>>2]=0;k[n+12>>2]=0;}k[p>>2]=0;k[s>>2]=k[p>>2];Lo(a+80|0,b,s);b=VN(32,39939)|0;if(!b)b=0;else{k[b>>2]=0;k[b+4>>2]=0;k[b+8>>2]=0;k[b+12>>2]=0;k[b+16>>2]=0;k[b+20>>2]=0;k[b+24>>2]=0;k[b+28>>2]=0;Mo(b);}k[q>>2]=0;k[s>>2]=k[q>>2];No(a+88|0,b,s);b=VN(24,39939)|0;if(!b)b=0;else{k[b+20>>2]=0;k[b>>2]=4332;q=b+4|0;k[q>>2]=0;k[q+4>>2]=0;k[q+8>>2]=0;k[q+12>>2]=0;}k[t>>2]=0;k[s>>2]=k[t>>2];Oo(a+96|0,b,s);t=a+104|0;k[t>>2]=0;k[t+4>>2]=0;k[t+8>>2]=0;k[t+12>>2]=0;k[t+16>>2]=0;k[t+20>>2]=0;k[t+24>>2]=0;r=u;return;}function Jo(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=5432;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Ko(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=5404;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Lo(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=5376;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Mo(a){a=a|0;var b=0,c=0;k[a>>2]=5460;k[a+4>>2]=0;k[a+8>>2]=0;i[a+12>>0]=0;c=a+16|0;b=a+20|0;k[c>>2]=0;k[c+4>>2]=0;k[c+8>>2]=0;k[c+12>>2]=0;a=0;while(1){if((a|0)==3)break;k[b+(a<<2)>>2]=0;a=a+1|0;}return;}function No(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=5348;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Oo(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=5320;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Po(a){a=a|0;NN(a);YN(a);return;}function Qo(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function Ro(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==14669?a+12|0:0)|0;}function So(a){a=a|0;YN(a);return;}function To(a){a=a|0;NN(a);YN(a);return;}function Uo(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function Vo(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==14828?a+12|0:0)|0;}function Wo(a){a=a|0;YN(a);return;}function Xo(a){a=a|0;NN(a);YN(a);return;}function Yo(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function Zo(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==14983?a+12|0:0)|0;}function _o(a){a=a|0;YN(a);return;}function $o(a){a=a|0;NN(a);YN(a);return;}function ap(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function bp(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==15138?a+12|0:0)|0;}function cp(a){a=a|0;YN(a);return;}function dp(a){a=a|0;NN(a);YN(a);return;}function ep(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function fp(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==15305?a+12|0:0)|0;}function gp(a){a=a|0;YN(a);return;}function hp(a){a=a|0;if((((((((k[a+4>>2]|0?k[a+12>>2]|0:0)?k[a+20>>2]|0:0)?k[a+28>>2]|0:0)?k[a+36>>2]|0:0)?k[a+64>>2]|0:0)?k[a+72>>2]|0:0)?k[a+80>>2]|0:0)?k[a+88>>2]|0:0)return(k[a+96>>2]|0)!=0|0;return 0;}function ip(a){a=a|0;k[a>>2]=5460;Dg(a+20|0);Xp(a+4|0);return;}function jp(a){a=a|0;ip(a);YN(a);return;}function kp(a,b){a=a|0;b=b|0;var c=0;c=be[k[(k[b>>2]|0)+56>>2]&255](b)|0;gh((k[c>>2]|0)+72|0);i[a+12>>0]=0;Yp(a,b);b=be[k[(k[b>>2]|0)+100>>2]&255](b)|0;b=k[b>>2]|0;Ph(a+20|0,(be[k[(k[b>>2]|0)+12>>2]&255](b)|0)+28|0)|0;return;}function lp(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=r;r=r+16|0;d=c;zp(a);e=be[k[(k[b>>2]|0)+56>>2]&255](b)|0;gh((k[e>>2]|0)+96|0);Ap(a,b);b=be[k[(k[b>>2]|0)+100>>2]&255](b)|0;k[d>>2]=k[b>>2];k[b>>2]=0;b=b+4|0;k[d+4>>2]=k[b>>2];k[b>>2]=0;ho(d);r=c;return;}function mp(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,p=0,q=0,s=0,t=0,u=0,v=0,w=0,x=0.0;v=r;r=r+48|0;p=v+32|0;q=v+24|0;s=v+8|0;t=v;l=be[k[(k[b>>2]|0)+36>>2]&255](b)|0;m=be[k[(k[b>>2]|0)+100>>2]&255](b)|0;m=k[m>>2]|0;n=be[k[(k[b>>2]|0)+32>>2]&255](b)|0;se[k[(k[b>>2]|0)+64>>2]&63](p,b,d);k[q>>2]=k[p>>2];e=k[p+4>>2]|0;k[q+4>>2]=e;if(e|0)PN(e);bO(s,be[k[(k[m>>2]|0)+12>>2]&255](m)|0);e=k[q>>2]|0;a:do if((e|0)!=0?(g=i[e+11>>0]|0,h=g<<24>>24<0,g=g&255,j=h?k[e+4>>2]|0:g,w=i[s+11>>0]|0,f=w<<24>>24<0,(j|0)==((f?k[s+4>>2]|0:w&255)|0)):0){f=f?k[s>>2]|0:s;b:do if(h){if(no(k[e>>2]|0,f,j)|0){u=11;break a;}}else while(1){if(!g)break b;if((i[e>>0]|0)!=(i[f>>0]|0)){u=11;break a;}g=g+-1|0;f=f+1|0;e=e+1|0;}while(0);w=(be[k[(k[l>>2]|0)+16>>2]&255](l)|0)+8|0;x=+o[w>>2];w=be[k[(k[m>>2]|0)+32>>2]&255](m)|0;se[k[(k[l>>2]|0)+24>>2]&63](t,l,d);c=k[(k[n>>2]|0)+12>>2]|0;d=be[k[(k[m>>2]|0)+12>>2]&255](m)|0;w=ce[c&3](n,t,d,x,w,a+12|0)|0;$d[k[(k[m>>2]|0)+36>>2]&255](m,w);yp(a,b);}else u=11;while(0);if((u|0)==11){u=k[(k[c>>2]|0)+8>>2]|0;w=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;$d[u&255](c,w);}dO(s);Sg(q);Sg(p);r=v;return 0;}function np(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function op(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function pp(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return 1;}function qp(a,b,c){a=a|0;b=b|0;c=c|0;return 1;}function rp(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0;c=r;r=r+16|0;e=c;g=be[k[(k[b>>2]|0)+100>>2]&255](b)|0;f=k[g>>2]|0;$d[k[(k[f>>2]|0)+16>>2]&255](f,d);d=be[k[(k[b>>2]|0)+28>>2]&255](b)|0;f=k[(k[d>>2]|0)+48>>2]|0;g=k[g>>2]|0;$d[k[(k[g>>2]|0)+60>>2]&255](e,g);$d[f&255](d,e);Sg(e);yp(a,b);i[a+12>>0]=0;r=c;return 0;}function sp(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0;h=r;r=r+16|0;f=h;e=be[k[(k[b>>2]|0)+100>>2]&255](b)|0;switch(d|0){case 0:{f=k[(k[c>>2]|0)+8>>2]|0;e=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;$d[f&255](c,e);e=0;break;}case 1:{g=k[e>>2]|0;_d[k[(k[g>>2]|0)+20>>2]&511](g);g=7;break;}case 2:{g=k[e>>2]|0;_d[k[(k[g>>2]|0)+24>>2]&511](g);g=7;break;}case 3:{g=k[e>>2]|0;_d[k[(k[g>>2]|0)+28>>2]&511](g);g=7;break;}case 6:case 5:case 4:case 7:{xp(a,b,d);yp(a,b);e=0;break;}default:e=1;}if((g|0)==7){g=be[k[(k[b>>2]|0)+28>>2]&255](b)|0;d=k[(k[g>>2]|0)+48>>2]|0;e=k[e>>2]|0;$d[k[(k[e>>2]|0)+60>>2]&255](f,e);$d[d&255](g,f);Sg(f);yp(a,b);i[a+12>>0]=0;e=0;}r=h;return e|0;}function tp(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;i=r;r=r+32|0;f=i+8|0;g=i;h=be[k[(k[b>>2]|0)+100>>2]&255](b)|0;e=k[h>>2]|0;e=be[k[(k[e>>2]|0)+12>>2]&255](e)|0;a=k[h>>2]|0;c=be[k[(k[b>>2]|0)+52>>2]&255](b)|0;e=e+16|0;if(!(be[k[(k[a>>2]|0)+8>>2]&255](a)|0)?!(wp(e,d)|0):0){k[f>>2]=0;k[f+4>>2]=0;k[f+8>>2]=0;Xm(f,be[k[(k[a>>2]|0)+12>>2]&255](a)|0,e,d);e=k[(k[c>>2]|0)+8>>2]|0;lm(g,f);$d[e&255](c,g);Xg(g);Yg(f);}g=k[h>>2]|0;$d[k[(k[g>>2]|0)+48>>2]&255](g,d);d=be[k[(k[b>>2]|0)+28>>2]&255](b)|0;b=k[(k[d>>2]|0)+48>>2]|0;h=k[h>>2]|0;$d[k[(k[h>>2]|0)+60>>2]&255](f,h);$d[b&255](d,f);Sg(f);r=i;return 0;}function up(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0.0,f=0,g=0,h=0,i=0,j=0,l=0;j=r;r=r+32|0;i=j+16|0;f=j+8|0;g=j;h=be[k[(k[b>>2]|0)+100>>2]&255](b)|0;l=k[h>>2]|0;l=be[k[(k[l>>2]|0)+12>>2]&255](l)|0;a=be[k[(k[b>>2]|0)+36>>2]&255](b)|0;e=+Hm(a,+((k[d>>2]|0)>>>0));o[g>>2]=e;a=k[h>>2]|0;c=be[k[(k[b>>2]|0)+52>>2]&255](b)|0;d=l+20|0;l=be[k[(k[a>>2]|0)+8>>2]&255](a)|0;if(!(l|+o[d>>2]==e)){k[i>>2]=0;k[i+4>>2]=0;k[i+8>>2]=0;Im(i,be[k[(k[a>>2]|0)+12>>2]&255](a)|0,d,g);l=k[(k[c>>2]|0)+8>>2]|0;lm(f,i);$d[l&255](c,f);Xg(f);Yg(i);e=+o[g>>2];}l=k[h>>2]|0;Zd[k[(k[l>>2]|0)+52>>2]&7](l,e);l=be[k[(k[b>>2]|0)+28>>2]&255](b)|0;b=k[(k[l>>2]|0)+48>>2]|0;h=k[h>>2]|0;$d[k[(k[h>>2]|0)+60>>2]&255](i,h);$d[b&255](l,i);Sg(i);r=j;return 0;}function vp(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0,m=0;l=r;r=r+32|0;j=l+8|0;g=l;h=l+20|0;a=d&1;i[h>>0]=a;f=be[k[(k[b>>2]|0)+100>>2]&255](b)|0;e=k[f>>2]|0;e=be[k[(k[e>>2]|0)+12>>2]&255](e)|0;c=k[f>>2]|0;d=be[k[(k[b>>2]|0)+52>>2]&255](b)|0;e=e+24|0;m=be[k[(k[c>>2]|0)+8>>2]&255](c)|0;if(!(m|(i[e>>0]|0)==a<<24>>24)){k[j>>2]=0;k[j+4>>2]=0;k[j+8>>2]=0;km(j,be[k[(k[c>>2]|0)+12>>2]&255](c)|0,e,h);a=k[(k[d>>2]|0)+8>>2]|0;lm(g,j);$d[a&255](d,g);Xg(g);Yg(j);a=i[h>>0]|0;}m=k[f>>2]|0;$d[k[(k[m>>2]|0)+56>>2]&255](m,a<<24>>24!=0);m=be[k[(k[b>>2]|0)+28>>2]&255](b)|0;b=k[(k[m>>2]|0)+48>>2]|0;h=k[f>>2]|0;$d[k[(k[h>>2]|0)+60>>2]&255](j,h);$d[b&255](m,j);Sg(j);r=l;return 0;}function wp(a,b){a=a|0;b=b|0;if((i[a>>0]|0)==(i[b>>0]|0)?(i[a+1>>0]|0)==(i[b+1>>0]|0):0)a=(i[a+2>>0]|0)==(i[b+2>>0]|0);else a=0;return a|0;}function xp(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0.0,g=0,h=0;g=be[k[(k[b>>2]|0)+32>>2]&255](b)|0;d=be[k[(k[b>>2]|0)+100>>2]&255](b)|0;d=k[d>>2]|0;e=be[k[(k[d>>2]|0)+32>>2]&255](d)|0;h=be[k[(k[b>>2]|0)+36>>2]&255](b)|0;h=(be[k[(k[h>>2]|0)+16>>2]&255](h)|0)+8|0;f=+o[h>>2];h=k[(k[g>>2]|0)+8>>2]|0;b=be[k[(k[d>>2]|0)+12>>2]&255](d)|0;c=ce[h&3](g,c,b,f,e,a+12|0)|0;$d[k[(k[d>>2]|0)+36>>2]&255](d,c);return;}function yp(a,b){a=a|0;b=b|0;a=k[a+4>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+12>>2]&511](a);b=be[k[(k[b>>2]|0)+100>>2]&255](b)|0;b=k[b>>2]|0;$d[k[(k[b>>2]|0)+44>>2]&255](b,1);return;}function zp(a){a=a|0;var b=0,c=0,d=0,e=0;e=r;r=r+16|0;b=e;c=a+4|0;d=k[c>>2]|0;if(d|0){_d[k[(k[d>>2]|0)+16>>2]&511](d);k[b>>2]=k[c>>2];k[c>>2]=0;d=a+8|0;k[b+4>>2]=k[d>>2];k[d>>2]=0;Xp(b);}r=e;return;}function Ap(a,b){a=a|0;b=b|0;var c=0;c=be[k[(k[b>>2]|0)+100>>2]&255](b)|0;c=k[c>>2]|0;if(be[k[(k[c>>2]|0)+8>>2]&255](c)|0)Bp(0,b);else Cp(a,b);return;}function Bp(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;g=r;r=r+32|0;c=g+8|0;d=g+16|0;e=g;f=be[k[(k[b>>2]|0)+100>>2]&255](b)|0;a=k[f>>2]|0;a=be[k[(k[a>>2]|0)+12>>2]&255](a)|0;h=i[a+36+3>>0]|0;if(!((h<<24>>24<0?k[a+32>>2]|0:h&255)|0)){h=be[k[(k[b>>2]|0)+28>>2]&255](b)|0;se[k[(k[h>>2]|0)+36>>2]&63](c,h,a);Sg(c);}else{k[d>>2]=0;k[d+4>>2]=0;k[d+8>>2]=0;h=k[f>>2]|0;$d[k[(k[h>>2]|0)+60>>2]&255](e,h);Wp(d,e);Sg(e);h=be[k[(k[b>>2]|0)+52>>2]&255](b)|0;b=k[(k[h>>2]|0)+8>>2]|0;lm(e,d);$d[b&255](h,e);Xg(e);Yg(d);}r=g;return;}function Cp(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0;n=r;r=r+48|0;l=n+40|0;m=n+24|0;c=n+8|0;f=n+16|0;d=n;j=be[k[(k[b>>2]|0)+100>>2]&255](b)|0;j=k[j>>2]|0;j=be[k[(k[j>>2]|0)+12>>2]&255](j)|0;h=j+28|0;k[m>>2]=0;k[m+4>>2]=0;k[m+8>>2]=0;e=i[j+36+3>>0]|0;g=e<<24>>24<0;e=g?k[j+32>>2]|0:e&255;a:do if(!e){h=be[k[(k[b>>2]|0)+28>>2]&255](b)|0;se[k[(k[h>>2]|0)+36>>2]&63](c,h,j);Sg(c);c=VN(52,39939)|0;if(!c)c=0;else Ag(c,j);k[d>>2]=0;k[l>>2]=k[d>>2];Oh(f,c,l);c=k[f>>2]|0;if(c|0){Ph(c+28|0,a+20|0)|0;Dp(m,f);}Qh(f);}else{f=a+20|0;d=i[a+28+3>>0]|0;c=d<<24>>24<0;b:do if((e|0)==((c?k[a+24>>2]|0:d&255)|0)){d=c?k[f>>2]|0:f;c=g?k[h>>2]|0:h;while(1){if(!e)break a;if((k[d>>2]|0)!=(k[c>>2]|0))break b;e=e+-1|0;d=d+4|0;c=c+4|0;}}while(0);Ep(m,j,f,h);}while(0);lm(l,m);if(k[l>>2]|0){b=be[k[(k[b>>2]|0)+52>>2]&255](b)|0;$d[k[(k[b>>2]|0)+8>>2]&255](b,l);}Xg(l);Yg(m);r=n;return;}function Dp(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;h=r;r=r+32|0;f=h+24|0;g=h+16|0;c=h;d=h+8|0;e=VN(12,39939)|0;if(!e){k[d>>2]=0;k[f>>2]=k[d>>2];Mp(g,0,f);}else{k[c>>2]=k[b>>2];b=k[b+4>>2]|0;k[c+4>>2]=b;if(b|0)PN(b);Lp(e,c);k[d>>2]=0;k[f>>2]=k[d>>2];Mp(g,e,f);Sg(c);}b=k[g>>2]|0;if(b|0){k[f>>2]=b;d=f+4|0;b=k[g+4>>2]|0;k[d>>2]=b;if(b|0)PN(b);b=a+4|0;c=k[b>>2]|0;if(c>>>0<(k[a+8>>2]|0)>>>0){k[c>>2]=k[f>>2];k[c+4>>2]=k[d>>2];k[f>>2]=0;k[d>>2]=0;k[b>>2]=c+8;}else um(a,f);Xg(f);}Np(g);r=h;return;}function Ep(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;i=r;r=r+32|0;g=i+16|0;h=i+8|0;f=i;e=VN(40,39939)|0;if(!e)e=0;else Th(e,b,c,d);k[f>>2]=0;k[g>>2]=k[f>>2];Fp(h,e,g);e=k[h>>2]|0;if(e|0){k[g>>2]=e;c=g+4|0;e=k[h+4>>2]|0;k[c>>2]=e;if(e|0)PN(e);e=a+4|0;b=k[e>>2]|0;if(b>>>0<(k[a+8>>2]|0)>>>0){k[b>>2]=k[g>>2];k[b+4>>2]=k[c>>2];k[g>>2]=0;k[c>>2]=0;k[e>>2]=b+8;}else um(a,g);Xg(g);}Gp(h);r=i;return;}function Fp(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=5524;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Gp(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function Hp(a){a=a|0;NN(a);YN(a);return;}function Ip(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function Jp(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==15458?a+12|0:0)|0;}function Kp(a){a=a|0;YN(a);return;}function Lp(a,b){a=a|0;b=b|0;k[a>>2]=4488;Pg(a+4|0,b);k[a>>2]=5580;return;}function Mp(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=5552;k[c+12>>2]=b;k[a+4>>2]=c;return;}function Np(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function Op(a){a=a|0;NN(a);YN(a);return;}function Pp(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function Qp(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==15613?a+12|0:0)|0;}function Rp(a){a=a|0;YN(a);return;}function Sp(a){a=a|0;Sg(a+4|0);return;}function Tp(a){a=a|0;Sg(a+4|0);YN(a);return;}function Up(a,b){a=a|0;b=b|0;Qg(a+4|0,b);return;}function Vp(a,b){a=a|0;b=b|0;Rg(a+4|0,b);return;}function Wp(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;g=r;r=r+32|0;e=g+16|0;f=g+8|0;d=g;c=VN(12,39939)|0;if(!c)c=0;else Vk(c,b);k[d>>2]=0;k[e>>2]=k[d>>2];Wk(f,c,e);c=k[f>>2]|0;if(c|0){k[e>>2]=c;d=e+4|0;c=k[f+4>>2]|0;k[d>>2]=c;if(c|0)PN(c);c=a+4|0;b=k[c>>2]|0;if(b>>>0<(k[a+8>>2]|0)>>>0){k[b>>2]=k[e>>2];k[b+4>>2]=k[d>>2];k[e>>2]=0;k[d>>2]=0;k[c>>2]=b+8;}else um(a,e);Xg(e);}Xk(f);r=g;return;}function Xp(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function Yp(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0,n=0,o=0,p=0;p=r;r=r+96|0;h=p+80|0;m=p+72|0;n=p+64|0;o=p+48|0;i=p+40|0;j=p;l=p+24|0;c=be[k[(k[b>>2]|0)+56>>2]&255](b)|0;k[m>>2]=k[c>>2];d=m+4|0;c=k[c+4>>2]|0;k[d>>2]=c;if(c|0)QN(c);f=be[k[(k[b>>2]|0)+100>>2]&255](b)|0;e=k[f>>2]|0;k[n>>2]=e;f=k[f+4>>2]|0;k[n+4>>2]=f;g=(f|0)==0;if(!g)QN(f);k[o>>2]=k[m>>2];c=k[d>>2]|0;k[o+4>>2]=c;if(c|0)QN(c);k[o+8>>2]=e;k[o+12>>2]=f;if(!g)QN(f);c=a+4|0;b=be[k[(k[b>>2]|0)+48>>2]&255](b)|0;f=k[(k[b>>2]|0)+8>>2]|0;Zp(l,o);g=UN(20)|0;k[g>>2]=5604;k[g+4>>2]=k[l>>2];d=l+4|0;k[g+8>>2]=k[d>>2];k[l>>2]=0;k[d>>2]=0;d=l+8|0;k[g+12>>2]=k[d>>2];e=l+12|0;k[g+16>>2]=k[e>>2];k[d>>2]=0;k[e>>2]=0;k[j+16>>2]=g;we[f&31](i,b,600,j);b=k[i>>2]|0;f=i+4|0;g=k[f>>2]|0;k[i>>2]=0;k[f>>2]=0;k[h>>2]=k[c>>2];k[c>>2]=b;b=a+8|0;k[h+4>>2]=k[b>>2];k[b>>2]=g;Xp(h);Xp(i);mh(j);_p(l);c=k[c>>2]|0;if(c|0)_d[k[(k[c>>2]|0)+8>>2]&511](c);_p(o);$p(n);aq(m);r=p;return;}function Zp(a,b){a=a|0;b=b|0;var c=0;k[a>>2]=k[b>>2];c=k[b+4>>2]|0;k[a+4>>2]=c;if(c|0)QN(c);k[a+8>>2]=k[b+8>>2];b=k[b+12>>2]|0;k[a+12>>2]=b;if(b|0)QN(b);return;}function _p(a){a=a|0;$p(a+8|0);aq(a);return;}function $p(a){a=a|0;a=k[a+4>>2]|0;if(a|0)SN(a);return;}function aq(a){a=a|0;a=k[a+4>>2]|0;if(a|0)SN(a);return;}function bq(a){a=a|0;k[a>>2]=5604;_p(a+4|0);return;}function cq(a){a=a|0;k[a>>2]=5604;_p(a+4|0);YN(a);return;}function dq(a){a=a|0;var b=0;b=UN(20)|0;k[b>>2]=5604;Zp(b+4|0,a+4|0);return b|0;}function eq(a,b){a=a|0;b=b|0;k[b>>2]=5604;Zp(b+4|0,a+4|0);return;}function fq(a){a=a|0;_p(a+4|0);return;}function gq(a){a=a|0;_p(a+4|0);YN(a);return;}function hq(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;e=r;r=r+16|0;c=e+8|0;d=e;kq(c,a+12|0);b=k[c>>2]|0;if(b|0){b=be[k[(k[b>>2]|0)+40>>2]&255](b)|0;f=k[c>>2]|0;$d[k[(k[f>>2]|0)+44>>2]&255](f,b^1);lq(d,a+4|0);a=k[d>>2]|0;if(a|0)gh(a+24|0);Do(d);}ho(c);r=e;return;}function iq(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==15779?a+4|0:0)|0;}function jq(a){a=a|0;return 1224;}function kq(a,b){a=a|0;b=b|0;var c=0,d=0;k[a>>2]=0;c=a+4|0;k[c>>2]=0;d=k[b+4>>2]|0;if(d){d=TN(d)|0;k[c>>2]=d;if(d|0)k[a>>2]=k[b>>2];}else k[c>>2]=0;return;}function lq(a,b){a=a|0;b=b|0;var c=0,d=0;k[a>>2]=0;c=a+4|0;k[c>>2]=0;d=k[b+4>>2]|0;if(d){d=TN(d)|0;k[c>>2]=d;if(d|0)k[a>>2]=k[b>>2];}else k[c>>2]=0;return;}function mq(a){a=a|0;k[a>>2]=5648;k[a+4>>2]=5796;fr(a);Fn(a+304|0);Co(a+296|0);bh(a+248|0);k[a+40>>2]=6048;mh(a+48|0);Do(a+32|0);Fo(a+24|0);Ho(a+16|0);Go(a+8|0);return;}function nq(a){a=a|0;mq(a);YN(a);return;}function oq(a){a=a|0;var b=0;b=k[a+8>>2]|0;return ae[k[(k[b>>2]|0)+16>>2]&3](b,a+40|0,k[a+16>>2]|0,a+408|0,a+416|0,a+428|0)|0;}function pq(a){a=a|0;return(k[a+32>>2]|0)+24|0;}function qq(a,b){a=a|0;b=b|0;var c=0;if(er(b)|0){Us(a+40|0,b);c=k[a+8>>2]|0;b=ne[k[(k[c>>2]|0)+28>>2]&127](c,b)|0;gh((k[a+32>>2]|0)+24|0);a=b;}else a=21;return a|0;}function rq(a,b,c){a=a|0;b=b|0;c=+c;if(!(c<=0.0)){Vs(a+40|0,b,c);gh((k[a+32>>2]|0)+24|0);a=0;}else a=21;return a|0;}function sq(a){a=a|0;Ks(a+40|0);gh((k[a+32>>2]|0)+24|0);return 0;}function tq(a){a=a|0;return+(+o[a+100>>2]/+o[a+80>>2]);}function uq(a,b,c){a=a|0;b=b|0;c=+c;if(!(c<=0.0)){Ws(a+40|0,b,+o[a+80>>2]*c);gh((k[a+32>>2]|0)+24|0);a=0;}else a=21;return a|0;}function vq(a,b){a=a|0;b=b|0;Rs(a,b+40|0);return;}function wq(a){a=a|0;return(k[a+32>>2]|0)+48|0;}function xq(a,b){a=a|0;b=+b;var c=0;c=a+32|0;i[(k[c>>2]|0)+120>>0]=0;Ss(a+40|0,b);a=k[c>>2]|0;i[a+120>>0]=1;gh(a+24|0);return 0;}function yq(a,b){a=a|0;b=+b;var c=0;c=a+32|0;i[(k[c>>2]|0)+120>>0]=0;Ts(a+40|0,b);a=k[c>>2]|0;i[a+120>>0]=1;gh(a+24|0);return 0;}function zq(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=r;r=r+16|0;d=c+8|0;e=c;k[e>>2]=16;k[e+4>>2]=1;k[d>>2]=k[e>>2];k[d+4>>2]=k[e+4>>2];b=dr(a,d,b)|0;gh((k[a+32>>2]|0)+24|0);r=c;return b|0;}function Aq(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=r;r=r+16|0;d=c+8|0;e=c;k[e>>2]=20;k[e+4>>2]=1;k[d>>2]=k[e>>2];k[d+4>>2]=k[e+4>>2];b=dr(a,d,b)|0;gh((k[a+32>>2]|0)+24|0);r=c;return b|0;}function Bq(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=r;r=r+16|0;d=c+8|0;e=c;k[e>>2]=24;k[e+4>>2]=1;k[d>>2]=k[e>>2];k[d+4>>2]=k[e+4>>2];b=dr(a,d,b)|0;gh((k[a+32>>2]|0)+24|0);r=c;return b|0;}function Cq(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=r;r=r+16|0;d=c+8|0;e=c;k[e>>2]=28;k[e+4>>2]=1;k[d>>2]=k[e>>2];k[d+4>>2]=k[e+4>>2];b=dr(a,d,b)|0;gh((k[a+32>>2]|0)+24|0);r=c;return b|0;}function Dq(a){a=a|0;var b=0,c=0,d=0;c=r;r=r+16|0;b=c+8|0;d=c;k[d>>2]=32;k[d+4>>2]=1;k[b>>2]=k[d>>2];k[b+4>>2]=k[d+4>>2];b=cr(a,b)|0;gh((k[a+32>>2]|0)+24|0);r=c;return b|0;}function Eq(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;f=r;r=r+32|0;c=f+16|0;d=f+8|0;e=f;k[d>>2]=b;if(b>>>0<32)c=21;else{k[e>>2]=36;k[e+4>>2]=1;k[c>>2]=k[e>>2];k[c+4>>2]=k[e+4>>2];c=br(a,c,d)|0;gh((k[a+32>>2]|0)+24|0);}r=f;return c|0;}function Fq(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=r;r=r+32|0;e=c+16|0;d=c+8|0;f=c;k[d>>2]=b;k[f>>2]=40;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];b=ar(a,e,d)|0;gh((k[a+32>>2]|0)+24|0);r=c;return b|0;}function Gq(a){a=a|0;return(k[a+32>>2]|0)+72|0;}function Hq(a){a=a|0;return(k[a+32>>2]|0)+96|0;}function Iq(a){a=a|0;return a+240|0;}function Jq(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=r;r=r+16|0;d=c+8|0;e=c;f=a+244|0;i[f>>0]=i[b>>0]|0;i[f+1>>0]=i[b+1>>0]|0;i[f+2>>0]=i[b+2>>0]|0;k[e>>2]=44;k[e+4>>2]=1;k[d>>2]=k[e>>2];k[d+4>>2]=k[e+4>>2];b=$q(a,d,b)|0;if(!(b<<16>>16))gh((k[a+32>>2]|0)+24|0);r=c;return b|0;}function Kq(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=r;r=r+16|0;d=c+8|0;e=c;k[a+240>>2]=k[b>>2];k[e>>2]=48;k[e+4>>2]=1;k[d>>2]=k[e>>2];k[d+4>>2]=k[e+4>>2];b=_q(a,d,b)|0;if(!(b<<16>>16))gh((k[a+32>>2]|0)+24|0);r=c;return b|0;}function Lq(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=r;r=r+32|0;e=c+8|0;d=c+16|0;f=c;b=b&1;i[d>>0]=b;i[a+247>>0]=b;k[f>>2]=52;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];b=Zq(a,e,d)|0;if(!(b<<16>>16))gh((k[a+32>>2]|0)+24|0);r=c;return b|0;}function Mq(a){a=a|0;return k[a+32>>2]|0;}function Nq(a){a=a|0;return k[a+360>>2]|0;}function Oq(a,b){a=a|0;b=b|0;k[a+360>>2]=b;return 0;}function Pq(a){a=a|0;var b=0;b=a+248|0;if(oh(b)|0){Yq(a);qh(b,k[a+16>>2]|0);gh((k[a+32>>2]|0)+24|0);a=0;}else a=1;return a|0;}function Qq(a){a=a|0;var b=0;b=a+248|0;if(ph(b)|0){Yq(a);rh(b,k[a+16>>2]|0);gh((k[a+32>>2]|0)+24|0);a=0;}else a=1;return a|0;}function Rq(a,b){a=a|0;b=b|0;var c=0;b=b+248|0;c=(oh(b)|0)&1;i[a>>0]=c;b=(ph(b)|0)&1;i[a+1>>0]=b;return;}function Sq(a){a=a|0;return a+272|0;}function Tq(a,b){a=a|0;b=b|0;var c=0;c=k[a+8>>2]|0;return ae[k[(k[c>>2]|0)+20>>2]&3](c,a+40|0,k[a+16>>2]|0,b,a+416|0,a+428|0)|0;}function Uq(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;h=r;r=r+16|0;f=h;c=k[b>>2]|0;if(c|0){g=a+296|0;d=k[g>>2]|0;if(!d)d=c;else{$d[k[(k[d>>2]|0)+12>>2]&255](d,a+304|0);d=k[b>>2]|0;}k[f>>2]=d;e=f+4|0;c=k[b+4>>2]|0;k[e>>2]=c;if(c|0)PN(c);k[f>>2]=k[g>>2];k[g>>2]=d;b=a+300|0;k[e>>2]=k[b>>2];k[b>>2]=c;Co(f);g=k[g>>2]|0;$d[k[(k[g>>2]|0)+8>>2]&255](g,a+304|0);}r=h;return;}function Vq(a){a=a|0;mq(a+-4|0);return;}function Wq(a){a=a|0;nq(a+-4|0);return;}function Xq(a,b){a=a|0;b=b|0;Uq(a+-4|0,b);return;}function Yq(a){a=a|0;var b=0;b=a+368|0;if((k[a+296>>2]|0)!=(k[b>>2]|0))$d[k[(k[a>>2]|0)+136>>2]&255](a,b);return;}function Zq(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0;n=k[b>>2]|0;m=k[b+4>>2]|0;j=a+296|0;l=m>>1;d=(k[j>>2]|0)+l|0;m=(m&1|0)!=0;if(m){g=n;b=k[(k[d>>2]|0)+n>>2]|0;}else{b=n;g=b;}h=a+304|0;f=a+4|0;e=10;b=re[b&63](d,h,f,(i[c>>0]|0)!=0)|0;while(1){if(b<<16>>16!=1e3)break;if(!e){b=23;break;}b=(k[j>>2]|0)+l|0;if(m)a=k[(k[b>>2]|0)+n>>2]|0;else a=g;e=e+-1|0;b=re[a&63](b,h,f,(i[c>>0]|0)!=0)|0;}return b|0;}function _q(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0,n=0,o=0,p=0;p=r;r=r+16|0;m=p+8|0;d=p+4|0;o=p;n=k[b>>2]|0;h=k[b+4>>2]|0;j=a+296|0;l=h>>1;e=(k[j>>2]|0)+l|0;h=(h&1|0)!=0;if(h){g=n;b=k[(k[e>>2]|0)+n>>2]|0;}else{b=n;g=b;}i=a+304|0;f=a+4|0;k[d>>2]=k[c>>2];k[m>>2]=k[d>>2];d=10;b=re[b&63](e,i,f,m)|0;while(1){if(b<<16>>16!=1e3)break;if(!d){b=23;break;}b=(k[j>>2]|0)+l|0;if(h)a=k[(k[b>>2]|0)+n>>2]|0;else a=g;k[o>>2]=k[c>>2];k[m>>2]=k[o>>2];d=d+-1|0;b=re[a&63](b,i,f,m)|0;}r=p;return b|0;}function $q(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0;m=k[b>>2]|0;l=k[b+4>>2]|0;i=a+296|0;j=l>>1;d=(k[i>>2]|0)+j|0;l=(l&1|0)!=0;if(l){g=m;b=k[(k[d>>2]|0)+m>>2]|0;}else{b=m;g=b;}h=a+304|0;f=a+4|0;e=10;b=re[b&63](d,h,f,c)|0;while(1){if(b<<16>>16!=1e3)break;if(!e){b=23;break;}b=(k[i>>2]|0)+j|0;if(l)a=k[(k[b>>2]|0)+m>>2]|0;else a=g;e=e+-1|0;b=re[a&63](b,h,f,c)|0;}return b|0;}function ar(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0;m=k[b>>2]|0;l=k[b+4>>2]|0;i=a+296|0;j=l>>1;d=(k[i>>2]|0)+j|0;l=(l&1|0)!=0;if(l){g=m;b=k[(k[d>>2]|0)+m>>2]|0;}else{b=m;g=b;}h=a+304|0;f=a+4|0;e=10;b=re[b&63](d,h,f,k[c>>2]|0)|0;while(1){if(b<<16>>16!=1e3)break;if(!e){b=23;break;}b=(k[i>>2]|0)+j|0;if(l)a=k[(k[b>>2]|0)+m>>2]|0;else a=g;e=e+-1|0;b=re[a&63](b,h,f,k[c>>2]|0)|0;}return b|0;}function br(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0;m=k[b>>2]|0;l=k[b+4>>2]|0;i=a+296|0;j=l>>1;d=(k[i>>2]|0)+j|0;l=(l&1|0)!=0;if(l){g=m;b=k[(k[d>>2]|0)+m>>2]|0;}else{b=m;g=b;}h=a+304|0;f=a+4|0;e=10;b=re[b&63](d,h,f,k[c>>2]|0)|0;while(1){if(b<<16>>16!=1e3)break;if(!e){b=23;break;}b=(k[i>>2]|0)+j|0;if(l)a=k[(k[b>>2]|0)+m>>2]|0;else a=g;e=e+-1|0;b=re[a&63](b,h,f,k[c>>2]|0)|0;}return b|0;}function cr(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0;l=k[b>>2]|0;j=k[b+4>>2]|0;h=a+296|0;i=j>>1;c=(k[h>>2]|0)+i|0;j=(j&1|0)!=0;if(j){f=l;b=k[(k[c>>2]|0)+l>>2]|0;}else{b=l;f=b;}g=a+304|0;e=a+4|0;d=10;b=de[b&63](c,g,e)|0;while(1){if(b<<16>>16!=1e3)break;if(!d){b=23;break;}b=(k[h>>2]|0)+i|0;if(j)a=k[(k[b>>2]|0)+l>>2]|0;else a=f;d=d+-1|0;b=de[a&63](b,g,e)|0;}return b|0;}function dr(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0;m=k[b>>2]|0;l=k[b+4>>2]|0;i=a+296|0;j=l>>1;d=(k[i>>2]|0)+j|0;l=(l&1|0)!=0;if(l){g=m;b=k[(k[d>>2]|0)+m>>2]|0;}else{b=m;g=b;}h=a+304|0;f=a+4|0;e=10;b=re[b&63](d,h,f,c)|0;while(1){if(b<<16>>16!=1e3)break;if(!e){b=23;break;}b=(k[i>>2]|0)+j|0;if(l)a=k[(k[b>>2]|0)+m>>2]|0;else a=g;e=e+-1|0;b=re[a&63](b,h,f,c)|0;}return b|0;}function er(a){a=a|0;var b=0.0;if(((k[a>>2]|0)!=0?(k[a+4>>2]|0)!=0:0)?(b=+o[a+8>>2],!(+O(+b)<9.99999993922529e-09)):0)a=b>0.0;else a=0;return a|0;}function fr(a){a=a|0;var b=0,c=0;b=a+16|0;c=k[b>>2]|0;if(c|0){ir(be[k[(k[c>>2]|0)+52>>2]&255](c)|0);c=k[b>>2]|0;jr(be[k[(k[c>>2]|0)+56>>2]&255](c)|0);}b=k[a+8>>2]|0;if(b|0)kr(be[k[(k[b>>2]|0)+36>>2]&255](b)|0);ir(a+48|0);return;}function gr(a){a=a|0;k[a>>2]=6048;mh(a+8|0);return;}function hr(a){a=a|0;bb(a|0)|0;MO();}function ir(a){a=a|0;var b=0,c=0;b=r;r=r+32|0;c=b;k[c+16>>2]=0;tr(a,c)|0;mh(c);r=b;return;}function jr(a){a=a|0;var b=0,c=0;b=r;r=r+32|0;c=b;k[c+16>>2]=0;pr(a,c)|0;qr(c);r=b;return;}function kr(a){a=a|0;var b=0,c=0;b=r;r=r+32|0;c=b;k[c+16>>2]=0;lr(a,c)|0;mr(c);r=b;return;}function lr(a,b){a=a|0;b=b|0;var c=0,d=0;c=r;r=r+32|0;d=c;nr(d,b);or(d,a);mr(d);r=c;return a|0;}function mr(a){a=a|0;var b=0;b=k[a+16>>2]|0;if((b|0)!=(a|0)){if(b|0)_d[k[(k[b>>2]|0)+20>>2]&511](b);}else _d[k[(k[b>>2]|0)+16>>2]&511](b);return;}function nr(a,b){a=a|0;b=b|0;var c=0,d=0;c=b+16|0;d=k[c>>2]|0;do if(d){if((d|0)==(b|0)){k[a+16>>2]=a;d=k[c>>2]|0;$d[k[(k[d>>2]|0)+12>>2]&255](d,a);break;}else{d=be[k[(k[d>>2]|0)+8>>2]&255](d)|0;k[a+16>>2]=d;break;}}else k[a+16>>2]=0;while(0);return;}function or(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;i=r;r=r+16|0;c=i;g=a+16|0;d=k[g>>2]|0;h=d;if((d|0)==(a|0)?(e=b+16|0,(k[e>>2]|0)==(b|0)):0){$d[k[(k[d>>2]|0)+12>>2]&255](d,c);h=k[g>>2]|0;_d[k[(k[h>>2]|0)+16>>2]&511](h);k[g>>2]=0;h=k[e>>2]|0;$d[k[(k[h>>2]|0)+12>>2]&255](h,a);h=k[e>>2]|0;_d[k[(k[h>>2]|0)+16>>2]&511](h);k[e>>2]=0;k[g>>2]=a;$d[k[(k[c>>2]|0)+12>>2]&255](c,b);_d[k[(k[c>>2]|0)+16>>2]&511](c);k[e>>2]=b;}else f=4;do if((f|0)==4){if((d|0)==(a|0)){$d[k[(k[d>>2]|0)+12>>2]&255](d,b);h=k[g>>2]|0;_d[k[(k[h>>2]|0)+16>>2]&511](h);h=b+16|0;k[g>>2]=k[h>>2];k[h>>2]=b;break;}c=b+16|0;d=k[c>>2]|0;if((d|0)==(b|0)){$d[k[(k[d>>2]|0)+12>>2]&255](d,a);h=k[c>>2]|0;_d[k[(k[h>>2]|0)+16>>2]&511](h);k[c>>2]=k[g>>2];k[g>>2]=a;break;}else{k[g>>2]=d;k[c>>2]=h;break;}}while(0);r=i;return;}function pr(a,b){a=a|0;b=b|0;var c=0,d=0;c=r;r=r+32|0;d=c;rr(d,b);sr(d,a);qr(d);r=c;return a|0;}function qr(a){a=a|0;var b=0;b=k[a+16>>2]|0;if((b|0)!=(a|0)){if(b|0)_d[k[(k[b>>2]|0)+20>>2]&511](b);}else _d[k[(k[b>>2]|0)+16>>2]&511](b);return;}function rr(a,b){a=a|0;b=b|0;var c=0,d=0;c=b+16|0;d=k[c>>2]|0;do if(d){if((d|0)==(b|0)){k[a+16>>2]=a;d=k[c>>2]|0;$d[k[(k[d>>2]|0)+12>>2]&255](d,a);break;}else{d=be[k[(k[d>>2]|0)+8>>2]&255](d)|0;k[a+16>>2]=d;break;}}else k[a+16>>2]=0;while(0);return;}function sr(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;i=r;r=r+16|0;c=i;g=a+16|0;d=k[g>>2]|0;h=d;if((d|0)==(a|0)?(e=b+16|0,(k[e>>2]|0)==(b|0)):0){$d[k[(k[d>>2]|0)+12>>2]&255](d,c);h=k[g>>2]|0;_d[k[(k[h>>2]|0)+16>>2]&511](h);k[g>>2]=0;h=k[e>>2]|0;$d[k[(k[h>>2]|0)+12>>2]&255](h,a);h=k[e>>2]|0;_d[k[(k[h>>2]|0)+16>>2]&511](h);k[e>>2]=0;k[g>>2]=a;$d[k[(k[c>>2]|0)+12>>2]&255](c,b);_d[k[(k[c>>2]|0)+16>>2]&511](c);k[e>>2]=b;}else f=4;do if((f|0)==4){if((d|0)==(a|0)){$d[k[(k[d>>2]|0)+12>>2]&255](d,b);h=k[g>>2]|0;_d[k[(k[h>>2]|0)+16>>2]&511](h);h=b+16|0;k[g>>2]=k[h>>2];k[h>>2]=b;break;}c=b+16|0;d=k[c>>2]|0;if((d|0)==(b|0)){$d[k[(k[d>>2]|0)+12>>2]&255](d,a);h=k[c>>2]|0;_d[k[(k[h>>2]|0)+16>>2]&511](h);k[c>>2]=k[g>>2];k[g>>2]=a;break;}else{k[g>>2]=d;k[c>>2]=h;break;}}while(0);r=i;return;}function tr(a,b){a=a|0;b=b|0;var c=0,d=0;c=r;r=r+32|0;d=c;ur(d,b);vr(d,a);mh(d);r=c;return a|0;}function ur(a,b){a=a|0;b=b|0;var c=0,d=0;c=b+16|0;d=k[c>>2]|0;do if(d){if((d|0)==(b|0)){k[a+16>>2]=a;d=k[c>>2]|0;$d[k[(k[d>>2]|0)+12>>2]&255](d,a);break;}else{d=be[k[(k[d>>2]|0)+8>>2]&255](d)|0;k[a+16>>2]=d;break;}}else k[a+16>>2]=0;while(0);return;}function vr(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;i=r;r=r+16|0;c=i;g=a+16|0;d=k[g>>2]|0;h=d;if((d|0)==(a|0)?(e=b+16|0,(k[e>>2]|0)==(b|0)):0){$d[k[(k[d>>2]|0)+12>>2]&255](d,c);h=k[g>>2]|0;_d[k[(k[h>>2]|0)+16>>2]&511](h);k[g>>2]=0;h=k[e>>2]|0;$d[k[(k[h>>2]|0)+12>>2]&255](h,a);h=k[e>>2]|0;_d[k[(k[h>>2]|0)+16>>2]&511](h);k[e>>2]=0;k[g>>2]=a;$d[k[(k[c>>2]|0)+12>>2]&255](c,b);_d[k[(k[c>>2]|0)+16>>2]&511](c);k[e>>2]=b;}else f=4;do if((f|0)==4){if((d|0)==(a|0)){$d[k[(k[d>>2]|0)+12>>2]&255](d,b);h=k[g>>2]|0;_d[k[(k[h>>2]|0)+16>>2]&511](h);h=b+16|0;k[g>>2]=k[h>>2];k[h>>2]=b;break;}c=b+16|0;d=k[c>>2]|0;if((d|0)==(b|0)){$d[k[(k[d>>2]|0)+12>>2]&255](d,a);h=k[c>>2]|0;_d[k[(k[h>>2]|0)+16>>2]&511](h);k[c>>2]=k[g>>2];k[g>>2]=a;break;}else{k[g>>2]=d;k[c>>2]=h;break;}}while(0);r=i;return;}function wr(a,b,c,d,e,f,g,h,j){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var l=0,m=0,n=0,p=0,q=0,s=0,t=0;t=r;r=r+48|0;p=t+32|0;s=t+16|0;m=t+24|0;q=t;k[a>>2]=5648;k[a+4>>2]=5796;k[a+8>>2]=k[b>>2];l=k[b+4>>2]|0;k[a+12>>2]=l;if(l|0)PN(l);k[a+16>>2]=k[c>>2];l=k[c+4>>2]|0;k[a+20>>2]=l;if(l|0)PN(l);k[a+24>>2]=k[d>>2];l=k[d+4>>2]|0;k[a+28>>2]=l;if(l|0)PN(l);n=a+32|0;l=VN(128,39939)|0;if(!l)l=0;else{k[l+16>>2]=0;k[l+40>>2]=0;k[l+64>>2]=0;k[l+88>>2]=0;k[l+112>>2]=0;i[l+120>>0]=1;}k[m>>2]=0;k[p>>2]=k[m>>2];xr(n,l,p);l=a+40|0;m=k[c>>2]|0;if(!m){o[p>>2]=0.0;o[p+4>>2]=0.0;o[s>>2]=0.0;o[s+4>>2]=0.0;st(q,p,s);}else{s=be[k[(k[m>>2]|0)+8>>2]&255](m)|0;k[q>>2]=k[s>>2];k[q+4>>2]=k[s+4>>2];k[q+8>>2]=k[s+8>>2];k[q+12>>2]=k[s+12>>2];}Js(l,f,q);f=a+240|0;q=g;g=k[q+4>>2]|0;s=f;k[s>>2]=k[q>>2];k[s+4>>2]=g;s=a+248|0;nh(s);k[a+296>>2]=0;k[a+300>>2]=0;Io(a+304|0,c,b,d,e,n,l,f,s,h,j);yr(a);r=t;return;}function xr(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=5992;k[c+12>>2]=b;k[a+4>>2]=c;return;}function yr(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0;h=r;r=r+96|0;b=h+72|0;c=h+48|0;f=h+24|0;g=h;d=a+16|0;e=k[d>>2]|0;if(e|0){e=be[k[(k[e>>2]|0)+52>>2]&255](e)|0;i=a;k[b>>2]=5816;k[b+4>>2]=i;k[b+16>>2]=b;tr(e,b)|0;mh(b);e=k[d>>2]|0;e=be[k[(k[e>>2]|0)+56>>2]&255](e)|0;k[c>>2]=5860;k[c+4>>2]=i;k[c+16>>2]=c;pr(e,c)|0;qr(c);}b=k[a+8>>2]|0;if(!b)b=a;else{i=be[k[(k[b>>2]|0)+36>>2]&255](b)|0;b=a;k[f>>2]=5904;k[f+4>>2]=b;k[f+16>>2]=f;lr(i,f)|0;mr(f);}k[g>>2]=5948;k[g+4>>2]=b;k[g+16>>2]=g;tr(a+48|0,g)|0;mh(g);r=h;return;}function zr(a){a=a|0;return;}function Ar(a){a=a|0;YN(a);return;}function Br(a){a=a|0;var b=0;b=UN(8)|0;k[b>>2]=5948;k[b+4>>2]=k[a+4>>2];return b|0;}function Cr(a,b){a=a|0;b=b|0;k[b>>2]=5948;k[b+4>>2]=k[a+4>>2];return;}function Dr(a){a=a|0;return;}function Er(a){a=a|0;YN(a);return;}function Fr(a){a=a|0;Ir(k[a+4>>2]|0);return;}function Gr(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==16087?a+4|0:0)|0;}function Hr(a){a=a|0;return 1304;}function Ir(a){a=a|0;var b=0;b=k[a+8>>2]|0;_d[k[(k[b>>2]|0)+24>>2]&511](b);a=k[a+32>>2]|0;if(i[a+120>>0]|0)gh(a+48|0);return;}function Jr(a){a=a|0;return;}function Kr(a){a=a|0;YN(a);return;}function Lr(a){a=a|0;var b=0;b=UN(8)|0;k[b>>2]=5904;k[b+4>>2]=k[a+4>>2];return b|0;}function Mr(a,b){a=a|0;b=b|0;k[b>>2]=5904;k[b+4>>2]=k[a+4>>2];return;}function Nr(a){a=a|0;return;}function Or(a){a=a|0;YN(a);return;}function Pr(a,b){a=a|0;b=b|0;Sr(k[a+4>>2]|0,b);return;}function Qr(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==16217?a+4|0:0)|0;}function Rr(a){a=a|0;return 1328;}function Sr(a,b){a=a|0;b=b|0;Us(a+40|0,b);gh((k[a+32>>2]|0)+24|0);return;}function Tr(a){a=a|0;return;}function Ur(a){a=a|0;YN(a);return;}function Vr(a){a=a|0;var b=0;b=UN(8)|0;k[b>>2]=5860;k[b+4>>2]=k[a+4>>2];return b|0;}function Wr(a,b){a=a|0;b=b|0;k[b>>2]=5860;k[b+4>>2]=k[a+4>>2];return;}function Xr(a){a=a|0;return;}function Yr(a){a=a|0;YN(a);return;}function Zr(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;a=k[a+4>>2]|0;e=k[a+8>>2]|0;if(e|0){d=(re[k[(k[e>>2]|0)+40>>2]&63](e,b,a+40|0,d)|0)&1;i[c>>0]=d;}return;}function _r(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==16417?a+4|0:0)|0;}function $r(a){a=a|0;return 1360;}function as(a){a=a|0;YN(a);return;}function bs(a){a=a|0;var b=0;b=UN(8)|0;k[b>>2]=5816;k[b+4>>2]=k[a+4>>2];return b|0;}function cs(a,b){a=a|0;b=b|0;k[b>>2]=5816;k[b+4>>2]=k[a+4>>2];return;}function ds(a){a=a|0;return;}function es(a){a=a|0;YN(a);return;}function fs(a){a=a|0;is(k[a+4>>2]|0);return;}function gs(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==16649?a+4|0:0)|0;}function hs(a){a=a|0;return 1392;}function is(a){a=a|0;var b=0,c=0;b=k[a+8>>2]|0;_d[k[(k[b>>2]|0)+24>>2]&511](b);b=a+16|0;c=k[b>>2]|0;if(ut(a+84|0,be[k[(k[c>>2]|0)+8>>2]&255](c)|0)|0){c=k[b>>2]|0;Qs(a+40|0,be[k[(k[c>>2]|0)+8>>2]&255](c)|0);}return;}function js(a){a=a|0;mh(a+96|0);mh(a+72|0);mh(a+48|0);mh(a+24|0);mh(a);return;}function ks(a){a=a|0;NN(a);YN(a);return;}function ls(a){a=a|0;a=k[a+12>>2]|0;if(a|0){js(a);YN(a);}return;}function ms(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==16779?a+12|0:0)|0;}function ns(a){a=a|0;YN(a);return;}function os(a){a=a|0;if((((k[a+8>>2]|0?k[a+16>>2]|0:0)?k[a+24>>2]|0:0)?k[a+32>>2]|0:0)?Ps(a+40|0)|0:0)return hp(a+304|0)|0;return 0;}function ps(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var l=0,m=0,n=0,o=0,p=0,q=0;q=r;r=r+32|0;m=q+16|0;o=q+8|0;n=q;if((((k[b>>2]|0)!=0?(k[c>>2]|0)!=0:0)?(k[d>>2]|0)!=0:0)?(k[e>>2]|0)!=0:0){l=VN(440,39939)|0;if(!l)l=0;else wr(l,b,c,d,e,f,g,h,i);k[n>>2]=0;k[m>>2]=k[n>>2];qs(o,l,m);l=k[o>>2]|0;do if((l|0)!=0?os(l)|0:0){n=k[o>>2]|0;$d[k[(k[n>>2]|0)+136>>2]&255](n,n+368|0);if(!(k[n+296>>2]|0)){j[a>>1]=10;k[a+4>>2]=0;k[a+8>>2]=0;break;}j[a>>1]=0;k[a+4>>2]=k[o>>2];l=k[o+4>>2]|0;k[a+8>>2]=l;if(l|0)PN(l);}else p=10;while(0);if((p|0)==10){j[a>>1]=22;k[a+4>>2]=0;k[a+8>>2]=0;}rs(o);}else{j[a>>1]=20;k[a+4>>2]=0;k[a+8>>2]=0;}r=q;return;}function qs(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=6020;k[c+12>>2]=b;k[a+4>>2]=c;return;}function rs(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function ss(a){a=a|0;NN(a);YN(a);return;}function ts(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function us(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==16928?a+12|0:0)|0;}function vs(a){a=a|0;YN(a);return;}function ws(a){a=a|0;k[a>>2]=6048;mh(a+8|0);YN(a);return;}function xs(a){a=a|0;return a+72|0;}function ys(a){a=a|0;return a+136|0;}function zs(a){a=a|0;return a+32|0;}function As(a){a=a|0;return+ +o[a+60>>2];}function Bs(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0,e=0.0;e=+o[b+60>>2];d=+o[b+68>>2]+(1.0-+o[c+4>>2])*+((k[b+36>>2]|0)>>>0)/e;o[a>>2]=+o[b+64>>2]+ +o[c>>2]*+((k[b+32>>2]|0)>>>0)/e;o[a+4>>2]=d;return;}function Cs(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0,e=0.0;e=+o[b+60>>2];d=1.0-e*(+o[c+4>>2]-+o[b+68>>2])/+((k[b+36>>2]|0)>>>0);o[a>>2]=(+o[c>>2]-+o[b+64>>2])*e/+((k[b+32>>2]|0)>>>0);o[a+4>>2]=d;return;}function Ds(a){a=a|0;return a+64|0;}function Es(a,b,c,d,e){a=a|0;b=b|0;c=+c;d=d|0;e=e|0;var f=0.0,g=0.0,h=0.0,i=0.0,j=0.0;i=+((k[a+36>>2]|0)>>>0);j=+o[b+4>>2];h=1.0-+o[d+4>>2];g=1.0-+o[e+4>>2];f=+o[a+60>>2];o[a+64>>2]=+o[b>>2]+ +((k[a+32>>2]|0)>>>0)*(+o[d>>2]/c-+o[e>>2]/f);o[a+68>>2]=j+i*(h/c-g/f);Fs(a);Gs(a);return;}function Fs(a){a=a|0;var b=0.0,c=0.0,d=0.0,e=0.0,f=0.0,g=0.0,h=0,i=0.0,j=0.0,k=0.0,l=0.0,m=0;m=r;r=r+16|0;h=m;Is(h,a);i=+o[a+52>>2];j=+o[a+44>>2];k=+o[h+8>>2];l=+o[h>>2];b=k-l;c=+o[a+56>>2];d=+o[a+48>>2];e=+o[h+12>>2];f=+o[h+4>>2];g=e-f;h=!(c-d<=g);if(!(i-j<=b)){if(l<j)o[a+64>>2]=j;if(k>i)o[a+64>>2]=i-b;}else o[a+64>>2]=(i+j)*.5-b*.5;if(h){if(e>c)o[a+68>>2]=c-g;if(f<d)o[a+68>>2]=d;}else o[a+68>>2]=(d+c)*.5-g*.5;r=m;return;}function Gs(a){a=a|0;Hs(a);gh(a+8|0);return;}function Hs(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0.0;f=r;r=r+192|0;b=f+128|0;c=f+64|0;d=f;ht(b,+((k[a+32>>2]|0)>>>0),+((k[a+36>>2]|0)>>>0));e=a+72|0;g=b;h=e+64|0;do{k[e>>2]=k[g>>2];e=e+4|0;g=g+4|0;}while((e|0)<(h|0));i=+o[a+60>>2];jt(c,i,i);it(d,-+o[a+64>>2],-+o[a+68>>2]);ft(b,c,d);e=a+136|0;g=b;h=e+64|0;do{k[e>>2]=k[g>>2];e=e+4|0;g=g+4|0;}while((e|0)<(h|0));r=f;return;}function Is(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0.0,g=0.0,h=0;c=r;r=r+16|0;e=c+8|0;d=c;f=+o[b+60>>2];g=+((k[b+32>>2]|0)>>>0)/f;f=+((k[b+36>>2]|0)>>>0)/f;h=k[b+64>>2]|0;b=k[b+68>>2]|0;k[e>>2]=h;k[e+4>>2]=b;g=g+(k[u>>2]=h,+o[u>>2]);f=f+(k[u>>2]=b,+o[u>>2]);o[d>>2]=g;o[d+4>>2]=f;st(a,e,d);r=c;return;}function Js(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;k[a>>2]=6048;k[a+24>>2]=0;d=a+32|0;k[d>>2]=k[b>>2];k[d+4>>2]=k[b+4>>2];k[d+8>>2]=k[b+8>>2];d=a+44|0;k[d>>2]=k[c>>2];k[d+4>>2]=k[c+4>>2];k[d+8>>2]=k[c+8>>2];k[d+12>>2]=k[c+12>>2];o[a+60>>2]=1.0;o[a+64>>2]=0.0;o[a+68>>2]=0.0;et(a+72|0);et(a+136|0);if(er(b)|0)Ks(a);return;}function Ks(a){a=a|0;Ls(a);Ms(a);Gs(a);return;}function Ls(a){a=a|0;var b=0.0,c=0.0,d=0.0;d=+o[a+40>>2];b=(+((k[a+32>>2]|0)>>>0)/d+-20.0)/(+o[a+52>>2]-+o[a+44>>2]);c=(+((k[a+36>>2]|0)>>>0)/d+-10.0)/(+o[a+56>>2]-+o[a+48>>2]);b=d*+Ns(a,c<b?c:b,1.0);o[a+60>>2]=b;return;}function Ms(a){a=a|0;var b=0.0,c=0.0,d=0.0;c=(+o[a+48>>2]+ +o[a+56>>2])*.5;d=+o[a+60>>2];b=+((k[a+36>>2]|0)>>>0)/d;o[a+64>>2]=(+o[a+44>>2]+ +o[a+52>>2])*.5-+((k[a+32>>2]|0)>>>0)/d*.5;o[a+68>>2]=c-b*.5;return;}function Ns(a,b,c){a=a|0;b=+b;c=+c;var d=0.0;d=+Os(a);b=d>b?d:b;return+(b>c?c:b);}function Os(a){a=a|0;var b=0.0,c=0.0;c=+o[a+40>>2];b=c*(100.0/(+o[a+52>>2]-+o[a+44>>2]));c=c*(100.0/(+o[a+56>>2]-+o[a+48>>2]));return+(c<b?c:b);}function Ps(a){a=a|0;if(er(a+32|0)|0)return(vt(a+44|0)|0)^1|0;else return 0;return 0;}function Qs(a,b){a=a|0;b=b|0;var c=0;if(!(vt(b)|0)){c=a+44|0;k[c>>2]=k[b>>2];k[c+4>>2]=k[b+4>>2];k[c+8>>2]=k[b+8>>2];k[c+12>>2]=k[b+12>>2];Fs(a);Gs(a);}return;}function Rs(a,b){a=a|0;b=b|0;var c=0.0,d=0.0,e=0.0,f=0.0,g=0.0,h=0.0,j=0.0,k=0.0,l=0,m=0.0,n=0;n=r;r=r+16|0;l=n;Is(l,b);e=+o[b+44>>2];f=+o[b+52>>2]-e;m=+o[b+56>>2];g=m-+o[b+48>>2];c=+o[l>>2];d=+o[l+8>>2]-c;h=+o[l+12>>2];j=h-+o[l+4>>2];b=f>d;l=g>j;if(b){k=d/f;e=(c-e)/(f-d);}else{k=0.0;e=0.0;}if(l){d=j/g;c=(m-h)/(g-j);}else{d=0.0;c=0.0;}i[a>>0]=b&1;o[a+4>>2]=e;o[a+8>>2]=k;i[a+12>>0]=l&1;o[a+16>>2]=c;o[a+20>>2]=d;r=n;return;}function Ss(a,b){a=a|0;b=+b;var c=0.0,d=0.0,e=0.0,f=0,g=0;f=r;r=r+16|0;g=f;Is(g,a);d=+o[a+44>>2];e=+o[a+52>>2]-d;c=+o[g+8>>2]-+o[g>>2];if(!(e<=c)){o[a+64>>2]=d+(e-c)*b;Fs(a);Gs(a);}r=f;return;}function Ts(a,b){a=a|0;b=+b;var c=0.0,d=0.0,e=0.0,f=0,g=0;f=r;r=r+16|0;g=f;Is(g,a);d=+o[a+56>>2];e=d-+o[a+48>>2];c=+o[g+12>>2]-+o[g+4>>2];if(!(e<=c)){o[a+68>>2]=d-c-(e-c)*b;Fs(a);Gs(a);}r=f;return;}function Us(a,b){a=a|0;b=b|0;var c=0,d=0.0,e=0.0,f=0.0,g=0.0,h=0,i=0.0,j=0,l=0;j=r;r=r+16|0;c=j;if(er(b)|0){Is(c,a);i=(+o[c>>2]+ +o[c+8>>2])*.5;g=(+o[c+4>>2]+ +o[c+12>>2])*.5;e=+o[b+8>>2];h=a+32|0;f=+o[a+40>>2];l=+O(+(e-f))<9.99999993922529e-09;c=a+60|0;d=+o[c>>2];if(!l){d=e/f*d;o[c>>2]=d;}f=d*2.0;o[a+64>>2]=i-+((k[b>>2]|0)>>>0)/f;o[a+68>>2]=g-+((k[b+4>>2]|0)>>>0)/f;k[h>>2]=k[b>>2];k[h+4>>2]=k[b+4>>2];k[h+8>>2]=k[b+8>>2];Fs(a);Gs(a);}r=j;return;}function Vs(a,b,c){a=a|0;b=b|0;c=+c;if(!(c<=0.0))Ws(a,b,+o[a+60>>2]*c);return;}function Ws(a,b,c){a=a|0;b=b|0;c=+c;var d=0.0,e=0;if(!(c<=0.0)){e=a+60|0;d=+o[e>>2];c=+Ns(a,c,+o[a+40>>2]*4.0);o[e>>2]=c;Xs(a,d,c,b);Fs(a);Gs(a);}return;}function Xs(a,b,c,d){a=a|0;b=+b;c=+c;d=d|0;var e=0;c=(c-b)/(b*c);e=a+64|0;o[e>>2]=+o[e>>2]+c*+o[d>>2]*+((k[a+32>>2]|0)>>>0);e=a+68|0;o[e>>2]=+o[e>>2]+c*(1.0-+o[d+4>>2])*+((k[a+36>>2]|0)>>>0);return;}function Ys(a,b){a=a|0;b=b|0;var c=0.0,d=0.0;d=+o[a>>2]-+o[b>>2];c=+o[a+4>>2]-+o[b+4>>2];return+(d*d+c*c);}function Zs(a,b){a=a|0;b=b|0;var c=0.0,d=0.0;d=+o[a>>2]-+o[b>>2];c=+o[a+4>>2]-+o[b+4>>2];return+ +P(+(d*d+c*c));}function _s(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0;d=(+o[b+4>>2]+ +o[c+4>>2])*.5;o[a>>2]=(+o[b>>2]+ +o[c>>2])*.5;o[a+4>>2]=d;return;}function $s(a,b){a=a|0;b=b|0;return+(+o[a>>2]*+o[b>>2]+ +o[a+4>>2]*+o[b+4>>2]);}function at(a,b){a=a|0;b=b|0;var c=0.0,d=0.0,e=0.0;e=+o[b>>2];d=+o[b+4>>2];c=+P(+(e*e+d*d));o[a>>2]=e/c;o[a+4>>2]=d/c;return;}function bt(a,b){a=a|0;b=b|0;var c=0;c=k[b>>2]|0;o[a>>2]=-+o[b+4>>2];k[a+4>>2]=c;return;}function ct(a,b){a=a|0;b=b|0;var c=0.0;c=-+o[b+4>>2];o[a>>2]=-+o[b>>2];o[a+4>>2]=c;return;}function dt(a,b,c){a=+a;b=+b;c=+c;var d=0,e=0,f=0;e=(o[u>>2]=b,k[u>>2]|0);f=(o[u>>2]=c,k[u>>2]|0);d=b>c;b=(k[u>>2]=d?f:e,+o[u>>2]);if(!(b>a)){b=(k[u>>2]=d?e:f,+o[u>>2]);b=b<a?b:a;}return+b;}function et(a){a=a|0;var b=0;b=a+64|0;do{k[a>>2]=0;a=a+4|0;}while((a|0)<(b|0));return;}function ft(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0.0,g=0,h=0,i=0.0;d=a;e=d+64|0;do{k[d>>2]=0;d=d+4|0;}while((d|0)<(e|0));d=0;while(1){if((d|0)==4)break;else g=0;while(1){if((g|0)==4)break;h=g<<2;e=0;f=0.0;while(1){if((e|0)==4)break;i=f+ +o[b+((e<<2)+d<<2)>>2]*+o[c+(e+h<<2)>>2];e=e+1|0;f=i;}o[a+(h+d<<2)>>2]=f;g=g+1|0;}d=d+1|0;}return;}function gt(a){a=a|0;var b=0,c=0;b=a+4|0;c=b+56|0;do{k[b>>2]=0;b=b+4|0;}while((b|0)<(c|0));o[a>>2]=1.0;o[a+20>>2]=1.0;o[a+40>>2]=1.0;o[a+60>>2]=1.0;return;}function ht(a,b,c){a=a|0;b=+b;c=+c;var d=0,e=0;d=a+4|0;e=d+56|0;do{k[d>>2]=0;d=d+4|0;}while((d|0)<(e|0));o[a>>2]=2.0/b;o[a+20>>2]=2.0/c;o[a+40>>2]=1.0;o[a+60>>2]=1.0;o[a+48>>2]=-1.0;o[a+52>>2]=-1.0;return;}function it(a,b,c){a=a|0;b=+b;c=+c;var d=0,e=0;d=a+4|0;e=d+56|0;do{k[d>>2]=0;d=d+4|0;}while((d|0)<(e|0));o[a>>2]=1.0;o[a+20>>2]=1.0;o[a+40>>2]=1.0;o[a+60>>2]=1.0;o[a+48>>2]=b;o[a+52>>2]=c;return;}function jt(a,b,c){a=a|0;b=+b;c=+c;var d=0,e=0;d=a+4|0;e=d+56|0;do{k[d>>2]=0;d=d+4|0;}while((d|0)<(e|0));o[a>>2]=b;o[a+20>>2]=c;o[a+40>>2]=1.0;o[a+60>>2]=1.0;return;}function kt(a,b,c,d){a=a|0;b=+b;c=+c;d=+d;var e=0,f=0,g=0.0;e=a+8|0;f=e+52|0;do{k[e>>2]=0;e=e+4|0;}while((e|0)<(f|0));g=+R(+b);b=+S(+b);o[a>>2]=g;o[a+4>>2]=b;o[a+16>>2]=-b;o[a+20>>2]=g;g=1.0-g;o[a+48>>2]=g*c+b*d+1.0;o[a+52>>2]=g*d-b*c+1.0;o[a+40>>2]=1.0;o[a+60>>2]=1.0;return;}function lt(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0;d=+o[b+4>>2]+ +o[c+4>>2];o[a>>2]=+o[b>>2]+ +o[c>>2];o[a+4>>2]=d;return;}function mt(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0;d=+o[b+4>>2]-+o[c+4>>2];o[a>>2]=+o[b>>2]-+o[c>>2];o[a+4>>2]=d;return;}function nt(a,b,c){a=a|0;b=+b;c=c|0;var d=0.0;d=+o[c+4>>2]*b;o[a>>2]=+o[c>>2]*b;o[a+4>>2]=d;return;}function ot(a,b,c){a=a|0;b=b|0;c=+c;var d=0.0;d=+o[b+4>>2]*c;o[a>>2]=+o[b>>2]*c;o[a+4>>2]=d;return;}function pt(a,b){a=a|0;b=b|0;if(+O(+(+o[a>>2]-+o[b>>2]))<9.99999993922529e-09)a=+O(+(+o[a+4>>2]-+o[b+4>>2]))<9.99999993922529e-09;else a=0;return a|0;}function qt(a,b){a=a|0;b=b|0;return(pt(a,b)|0)^1|0;}function rt(a){a=a|0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;k[a+12>>2]=0;return;}function st(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;k[a>>2]=k[(+o[c>>2]<+o[b>>2]?c:b)>>2];d=b+4|0;e=c+4|0;k[a+4>>2]=k[(+o[e>>2]<+o[d>>2]?e:d)>>2];k[a+8>>2]=k[(+o[b>>2]<+o[c>>2]?c:b)>>2];k[a+12>>2]=k[(+o[d>>2]<+o[e>>2]?e:d)>>2];return;}function tt(a,b){a=a|0;b=b|0;if((+O(+(+o[a>>2]-+o[b>>2]))<9.99999993922529e-09?+O(+(+o[a+8>>2]-+o[b+8>>2]))<9.99999993922529e-09:0)?+O(+(+o[a+4>>2]-+o[b+4>>2]))<9.99999993922529e-09:0)a=+O(+(+o[a+12>>2]-+o[b+12>>2]))<9.99999993922529e-09;else a=0;return a|0;}function ut(a,b){a=a|0;b=b|0;return(tt(a,b)|0)^1|0;}function vt(a){a=a|0;if(+O(+(+o[a>>2]-+o[a+8>>2]))<9.99999993922529e-09)a=1;else a=+O(+(+o[a+4>>2]-+o[a+12>>2]))<9.99999993922529e-09;return a|0;}function wt(a,b,c){a=a|0;b=b|0;c=+c;var d=0,e=0,f=0,g=0.0;d=r;r=r+16|0;f=d+8|0;e=d;g=+o[b+4>>2]-c;o[f>>2]=+o[b>>2]-c;o[f+4>>2]=g;g=+o[b+12>>2]+c;o[e>>2]=+o[b+8>>2]+c;o[e+4>>2]=g;st(a,f,e);r=d;return;}function xt(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;d=r;r=r+16|0;f=d+8|0;e=d;g=b+4|0;h=c+4|0;g=k[(+o[h>>2]<+o[g>>2]?h:g)>>2]|0;k[f>>2]=k[(+o[c>>2]<+o[b>>2]?c:b)>>2];k[f+4>>2]=g;g=b+8|0;h=c+8|0;b=b+12|0;c=c+12|0;c=k[(+o[b>>2]<+o[c>>2]?c:b)>>2]|0;k[e>>2]=k[(+o[g>>2]<+o[h>>2]?h:g)>>2];k[e+4>>2]=c;st(a,f,e);r=d;return;}function yt(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0.0,h=0.0,i=0.0,j=0.0,k=0.0,l=0.0;d=r;r=r+16|0;f=d+8|0;e=d;j=+o[c>>2];h=+o[c+8>>2];i=+o[c+4>>2];g=+o[c+12>>2];l=+dt(+o[b>>2],j,h);k=+dt(+o[b+4>>2],i,g);o[f>>2]=l;o[f+4>>2]=k;h=+dt(+o[b+8>>2],j,h);g=+dt(+o[b+12>>2],i,g);o[e>>2]=h;o[e+4>>2]=g;st(a,f,e);r=d;return;}function zt(a,b){a=a|0;b=b|0;if((+o[b>>2]>=+o[a>>2]?+o[b+4>>2]>=+o[a+4>>2]:0)?+o[b+8>>2]<=+o[a+8>>2]:0)a=+o[b+12>>2]<=+o[a+12>>2];else a=0;return a|0;}function At(a){a=a|0;k[a>>2]=6096;Dt(a+4|0);return;}function Bt(a){a=a|0;k[a>>2]=6096;Dt(a+4|0);YN(a);return;}function Ct(a){a=a|0;var b=0;b=k[a+4>>2]|0;b=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;se[k[(k[b>>2]|0)+24>>2]&63](b,36160,k[a+12>>2]|0);se[k[(k[b>>2]|0)+28>>2]&63](b,36161,k[a+16>>2]|0);return;}function Dt(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function Et(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a>>2]=6096;k[a+4>>2]=k[b>>2];b=k[b+4>>2]|0;k[a+8>>2]=b;if(b|0)PN(b);k[a+12>>2]=c;k[a+16>>2]=d;return;}function Ft(a){a=a|0;return(k[a+4>>2]|0)!=0|0;}function Gt(a){a=a|0;var b=0;k[a>>2]=6116;k[a+4>>2]=6160;b=a+8|0;if(k[b>>2]|0)Ut(a);Dt(b);return;}function Ht(a){a=a|0;Gt(a);YN(a);return;}function It(a){a=a|0;var b=0;b=k[a+8>>2]|0;b=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;se[k[(k[b>>2]|0)+24>>2]&63](b,36160,k[a+24>>2]|0);se[k[(k[b>>2]|0)+28>>2]&63](b,36161,k[a+32>>2]|0);return;}function Jt(a){a=a|0;return(i[a+46>>0]|0)!=0|0;}function Kt(a){a=a|0;i[a+46>>0]=1;return;}function Lt(a){a=a|0;i[a+46>>0]=0;return;}function Mt(a){a=a|0;var b=0;b=k[a+8>>2]|0;b=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;se[k[(k[b>>2]|0)+32>>2]&63](b,3553,k[a+40>>2]|0);return;}function Nt(a){a=a|0;return k[a+16>>2]|0;}function Ot(a){a=a|0;return k[a+20>>2]|0;}function Pt(a){a=a|0;Gt(a+-4|0);return;}function Qt(a){a=a|0;Ht(a+-4|0);return;}function Rt(a){a=a|0;Mt(a+-4|0);return;}function St(a){a=a|0;return k[a+-4+16>>2]|0;}function Tt(a){a=a|0;return k[a+-4+20>>2]|0;}function Ut(a){a=a|0;var b=0,c=0,d=0,e=0;b=a+44|0;if(i[b>>0]|0){d=k[a+8>>2]|0;$d[k[(k[d>>2]|0)+40>>2]&255](d,k[a+40>>2]|0);}c=a+36|0;if(i[c>>0]|0){d=k[a+8>>2]|0;$d[k[(k[d>>2]|0)+32>>2]&255](d,k[a+32>>2]|0);}d=a+28|0;if(i[d>>0]|0){e=k[a+8>>2]|0;$d[k[(k[e>>2]|0)+24>>2]&255](e,k[a+24>>2]|0);}i[b>>0]=0;i[c>>0]=0;i[d>>0]=0;i[a+45>>0]=0;return;}function Vt(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;k[a>>2]=6116;k[a+4>>2]=6160;f=a+8|0;e=k[b>>2]|0;k[f>>2]=e;b=k[b+4>>2]|0;k[a+12>>2]=b;if(b){PN(b);e=k[f>>2]|0;}k[a+16>>2]=c;k[a+20>>2]=d;k[a+24>>2]=0;i[a+28>>0]=0;k[a+32>>2]=0;i[a+36>>0]=0;f=a+40|0;k[f>>2]=0;j[f+4>>1]=0;i[f+6>>0]=0;if(!((e|0)==0|(c|0)==0|(d|0)==0))Wt(a);return;}function Wt(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;b=a+16|0;if((k[b>>2]|0?(c=a+20|0,k[c>>2]|0):0)?(d=k[a+8>>2]|0,d=be[k[(k[d>>2]|0)+8>>2]&255](d)|0,e=a+32|0,se[k[(k[d>>2]|0)+132>>2]&63](d,1,e),i[a+36>>0]=1,se[k[(k[d>>2]|0)+28>>2]&63](d,36161,k[e>>2]|0),Yd[k[(k[d>>2]|0)+188>>2]&31](d,36161,32854,k[b>>2]|0,k[c>>2]|0),f=a+24|0,se[k[(k[d>>2]|0)+128>>2]&63](d,1,f),i[a+28>>0]=1,se[k[(k[d>>2]|0)+24>>2]&63](d,36160,k[f>>2]|0),Yd[k[(k[d>>2]|0)+116>>2]&31](d,36160,36064,36161,k[e>>2]|0),e=a+40|0,se[k[(k[d>>2]|0)+136>>2]&63](d,1,e),i[a+44>>0]=1,se[k[(k[d>>2]|0)+32>>2]&63](d,3553,k[e>>2]|0),we[k[(k[d>>2]|0)+200>>2]&31](d,3553,10241,9729),we[k[(k[d>>2]|0)+200>>2]&31](d,3553,10240,9729),we[k[(k[d>>2]|0)+200>>2]&31](d,3553,10242,33071),we[k[(k[d>>2]|0)+200>>2]&31](d,3553,10243,33071),me[k[(k[d>>2]|0)+196>>2]&7](d,3553,0,6408,k[b>>2]|0,k[c>>2]|0,0,6408,5121,0),ge[k[(k[d>>2]|0)+120>>2]&7](d,36160,36064,3553,k[e>>2]|0,0),(ne[k[(k[d>>2]|0)+44>>2]&127](d,36160)|0)==36053):0){i[a+45>>0]=1;i[a+46>>0]=0;}return;}function Xt(a,b,c){a=a|0;b=b|0;c=c|0;Ut(a);k[a+16>>2]=b;k[a+20>>2]=c;Wt(a);return;}function Yt(a){a=a|0;return(i[a+45>>0]|0)!=0|0;}function Zt(a){a=a|0;var b=0,c=0;k[a>>2]=6188;k[a+4>>2]=6224;c=a+24|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0)_d[k[(k[b>>2]|0)+4>>2]&511](b);c=a+20|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0)_d[k[(k[b>>2]|0)+4>>2]&511](b);c=a+16|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0)_d[k[(k[b>>2]|0)+4>>2]&511](b);Dt(a+8|0);return;}function _t(a){a=a|0;Zt(a);YN(a);return;}function $t(a){a=a|0;return k[a+16>>2]|0;}function au(a){a=a|0;return k[a+20>>2]|0;}function bu(a){a=a|0;return k[a+24>>2]|0;}function cu(a){a=a|0;var b=0,c=0;c=a+16|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0)_d[k[(k[b>>2]|0)+4>>2]&511](b);c=a+20|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0)_d[k[(k[b>>2]|0)+4>>2]&511](b);c=a+24|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0)_d[k[(k[b>>2]|0)+4>>2]&511](b);return;}function du(a,b,c){a=a|0;b=b|0;c=c|0;iu(a,b);return ju(a)|0;}function eu(a){a=a|0;Zt(a+-4|0);return;}function fu(a){a=a|0;_t(a+-4|0);return;}function gu(a){a=a|0;cu(a+-4|0);return;}function hu(a,b,c){a=a|0;b=b|0;c=c|0;return du(a+-4|0,b,0)|0;}function iu(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=VN(20,39939)|0;if(!c)c=0;else Et(c,a+8|0,k[b+8>>2]|0,k[b+12>>2]|0);e=a+16|0;d=k[e>>2]|0;k[e>>2]=c;if(d|0)_d[k[(k[d>>2]|0)+4>>2]&511](d);c=VN(48,39939)|0;if(!c)c=0;else Vt(c,a+8|0,k[b>>2]|0,k[b+4>>2]|0);e=a+20|0;d=k[e>>2]|0;k[e>>2]=c;if(d|0)_d[k[(k[d>>2]|0)+4>>2]&511](d);c=VN(48,39939)|0;if(!c)d=0;else{Vt(c,a+8|0,k[b>>2]|0,k[b+4>>2]|0);d=c;}e=a+24|0;c=k[e>>2]|0;k[e>>2]=d;if(c|0)_d[k[(k[c>>2]|0)+4>>2]&511](c);return;}function ju(a){a=a|0;var b=0,c=0;do if(((((k[a+8>>2]|0)!=0?(b=k[a+16>>2]|0,(b|0)!=0):0)?Ft(b)|0:0)?(c=k[a+20>>2]|0,(c|0)!=0):0)?Yt(c)|0:0){a=k[a+24>>2]|0;if(a|0?Yt(a)|0:0){a=1;break;}a=0;}else a=0;while(0);return a|0;}function ku(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=6188;k[a+4>>2]=6224;k[a+8>>2]=k[b>>2];b=k[b+4>>2]|0;k[a+12>>2]=b;if(b|0)PN(b);k[a+16>>2]=0;k[a+20>>2]=0;k[a+24>>2]=0;iu(a,c);return;}function lu(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;d=a+20|0;Xt(k[d>>2]|0,b,c);a=a+24|0;Xt(k[a>>2]|0,b,c);if(Yt(k[d>>2]|0)|0)a=Yt(k[a>>2]|0)|0;else a=0;return a|0;}function iB(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0.0,l=0.0;i=r;r=r+64|0;g=i;k[a>>2]=6492;e=a+4|0;et(e);h=a+68|0;et(h);f=a+132|0;b=be[k[(k[b>>2]|0)+16>>2]&255](b)|0;k[f>>2]=k[b>>2];k[f+4>>2]=k[b+4>>2];k[f+8>>2]=k[b+8>>2];ht(g,+((k[f>>2]|0)>>>0),+((k[a+136>>2]|0)>>>0));b=e;e=g;f=b+64|0;do{k[b>>2]=k[e>>2];b=b+4|0;e=e+4|0;}while((b|0)<(f|0));b=be[k[(k[c>>2]|0)+8>>2]&255](c)|0;l=+(k[d>>2]|0);l=l+ +oP(+ +o[b>>2]);o[a+144>>2]=l;j=+oP(+ +o[b+12>>2]);j=j-+(((k[d+4>>2]|0)+(k[d+12>>2]|0)|0)>>>0);o[a+148>>2]=j;it(g,-l,-j);b=h;e=g;f=b+64|0;do{k[b>>2]=k[e>>2];b=b+4|0;e=e+4|0;}while((b|0)<(f|0));r=i;return;}function jB(a,b){a=a|0;b=b|0;var c=0;i[a>>0]=i[b>>0]|0;c=j[b+2>>1]|0;i[a+1>>0]=(c&65535)>>>8;i[a+2>>0]=c;i[a+3>>0]=i[b+4>>0]|0;return;}function kB(a,b){a=a|0;b=b|0;var c=0,d=0;c=i[b>>0]|0;if((c&255)>3){d=0;b=0;c=0;}else{d=i[b+3>>0]|0;b=((l[b+1>>0]|0)<<8|(l[b+2>>0]|0))&65535;}i[a>>0]=c;j[a+2>>1]=b;i[a+4>>0]=d;return;}function lB(a){a=a|0;k[a>>2]=6532;k[a+4>>2]=6592;CB(a+24|0);CB(a+16|0);CB(a+8|0);return;}function mB(a){a=a|0;lB(a);YN(a);return;}function nB(a){a=a|0;return k[a+8>>2]|0;}function oB(a){a=a|0;return j[a+32>>1]|0;}function pB(a){a=a|0;var b=0,c=0;c=r;r=r+16|0;b=c;k[b>>2]=0;a=k[a+8>>2]|0;se[k[(k[a>>2]|0)+148>>2]&63](a,3379,b);a=k[b>>2]|0;if(a>>>0<64){k[b>>2]=64;a=64;}r=c;return a|0;}function qB(a,b){a=a|0;b=b|0;var c=0,d=0;c=r;r=r+16|0;d=c;k[d>>2]=b;b=k[a+8>>2]|0;se[k[(k[b>>2]|0)+68>>2]&63](b,1,d);r=c;return;}function rB(a,b){a=a|0;b=b|0;var c=0,d=0;c=r;r=r+16|0;d=c;k[d>>2]=b;b=k[a+8>>2]|0;se[k[(k[b>>2]|0)+72>>2]&63](b,1,d);r=c;return;}function sB(a,b){a=a|0;b=b|0;a=k[a+8>>2]|0;$d[k[(k[a>>2]|0)+76>>2]&255](a,b);return;}function tB(a,b){a=a|0;b=b|0;var c=0,d=0;c=r;r=r+16|0;d=c;k[d>>2]=b;b=k[a+8>>2]|0;se[k[(k[b>>2]|0)+80>>2]&63](b,1,d);r=c;return;}function uB(a,b){a=a|0;b=b|0;a=k[a+8>>2]|0;$d[k[(k[a>>2]|0)+84>>2]&255](a,b);return;}function vB(a,b){a=a|0;b=b|0;var c=0,d=0;c=r;r=r+16|0;d=c;k[d>>2]=b;b=k[a+8>>2]|0;se[k[(k[b>>2]|0)+88>>2]&63](b,1,d);r=c;return;}function wB(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0;g=r;r=r+16|0;b=g;d=a+32|0;j[d>>1]=(j[d>>1]|0)+1<<16>>16;d=a+8|0;e=k[a+24>>2]|0;k[b>>2]=e;f=b+4|0;c=k[a+28>>2]|0;k[f>>2]=c;if(c|0)PN(c);k[b>>2]=k[d>>2];k[d>>2]=e;e=a+12|0;k[f>>2]=k[e>>2];k[e>>2]=c;CB(b);r=g;return;}function xB(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0;g=r;r=r+16|0;d=g;e=a+32|0;j[e>>1]=(j[e>>1]|0)+1<<16>>16;e=a+8|0;f=k[a+16>>2]|0;k[d>>2]=f;b=d+4|0;c=k[a+20>>2]|0;k[b>>2]=c;if(c|0)PN(c);k[d>>2]=k[e>>2];k[e>>2]=f;a=a+12|0;k[b>>2]=k[a>>2];k[a>>2]=c;CB(d);r=g;return 1;}function yB(a){a=a|0;lB(a+-4|0);return;}function zB(a){a=a|0;mB(a+-4|0);return;}function AB(a){a=a|0;wB(a+-4|0);return;}function BB(a,b,c){a=a|0;b=b|0;c=c|0;xB(a+-4|0,0,0)|0;return 1;}function CB(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function DB(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;h=r;r=r+16|0;f=h+4|0;g=h;k[a>>2]=6532;k[a+4>>2]=6592;k[a+8>>2]=k[b>>2];c=b+4|0;d=k[c>>2]|0;k[a+12>>2]=d;if(d|0)PN(d);k[a+16>>2]=k[b>>2];b=k[c>>2]|0;k[a+20>>2]=b;if(b|0)PN(b);e=a+24|0;b=VN(56,39939)|0;if(!b)b=0;else{c=b;d=c+56|0;do{k[c>>2]=0;c=c+4|0;}while((c|0)<(d|0));k[b>>2]=6616;k[b+24>>2]=0;k[b+48>>2]=0;}k[g>>2]=0;k[f>>2]=k[g>>2];EB(e,b,f);j[a+32>>1]=0;r=h;return;}function EB(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=6860;k[c+12>>2]=b;k[a+4>>2]=c;return;}function FB(a){a=a|0;NN(a);YN(a);return;}function GB(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function HB(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==24845?a+12|0:0)|0;}function IB(a){a=a|0;YN(a);return;}function JB(a){a=a|0;k[a>>2]=6616;OC(a+32|0);mh(a+8|0);return;}function KB(a){a=a|0;JB(a);YN(a);return;}function LB(a){a=a|0;return a+8|0;}function MB(a){a=a|0;return a+32|0;}function NB(a,b,c){a=a|0;b=b|0;c=c|0;return;}function OB(a,b,c){a=a|0;b=b|0;c=c|0;return;}function PB(a,b,c){a=a|0;b=b|0;c=c|0;return;}function QB(a,b,c){a=a|0;b=b|0;c=c|0;return;}function RB(a,b,c){a=a|0;b=b|0;c=c|0;return;}function SB(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return;}function TB(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return;}function UB(a,b){a=a|0;b=b|0;return 36061;}function VB(a,b){a=a|0;b=b|0;return;}function WB(a,b,c,d,e){a=a|0;b=+b;c=+c;d=+d;e=+e;return;}function XB(a,b){a=a|0;b=b|0;return;}function YB(a){a=a|0;return 0;}function ZB(a,b){a=a|0;b=b|0;return 0;}function _B(a,b,c){a=a|0;b=b|0;c=c|0;return;}function $B(a,b,c){a=a|0;b=b|0;c=c|0;return;}function aC(a,b){a=a|0;b=b|0;return;}function bC(a,b,c){a=a|0;b=b|0;c=c|0;return;}function cC(a,b){a=a|0;b=b|0;return;}function dC(a,b,c){a=a|0;b=b|0;c=c|0;return;}function eC(a,b,c){a=a|0;b=b|0;c=c|0;return;}function fC(a,b){a=a|0;b=b|0;return;}function gC(a,b){a=a|0;b=b|0;return;}function hC(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return;}function iC(a,b){a=a|0;b=b|0;return;}function jC(a,b){a=a|0;b=b|0;return;}function kC(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return;}function lC(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return;}function mC(a,b,c){a=a|0;b=b|0;c=c|0;return;}function nC(a,b,c){a=a|0;b=b|0;c=c|0;return;}function oC(a,b,c){a=a|0;b=b|0;c=c|0;return;}function pC(a,b,c){a=a|0;b=b|0;c=c|0;return;}function qC(a,b,c){a=a|0;b=b|0;c=c|0;return 0;}function rC(a){a=a|0;return 0;}function sC(a,b,c){a=a|0;b=b|0;c=c|0;return;}function tC(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return;}function uC(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return;}function vC(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return;}function wC(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return;}function xC(a,b,c){a=a|0;b=b|0;c=c|0;return 0;}function yC(a,b){a=a|0;b=b|0;return 0;}function zC(a,b){a=a|0;b=b|0;return;}function AC(a,b,c){a=a|0;b=b|0;c=c|0;return;}function BC(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;return;}function CC(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return;}function DC(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return;}function EC(a,b,c,d,e,f,g,h,i,j){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;return;}function FC(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return;}function GC(a,b,c,d,e,f,g,h,i,j){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;return;}function HC(a,b,c){a=a|0;b=b|0;c=+c;return;}function IC(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return;}function JC(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return;}function KC(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return;}function LC(a,b){a=a|0;b=b|0;return;}function MC(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return;}function NC(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return;}function OC(a){a=a|0;var b=0;b=k[a+16>>2]|0;if((b|0)!=(a|0)){if(b|0)_d[k[(k[b>>2]|0)+20>>2]&511](b);}else _d[k[(k[b>>2]|0)+16>>2]&511](b);return;}function PC(a){a=a|0;if(!(k[a+8>>2]|0))return 0;else return(k[a+16>>2]|0)!=0|0;return 0;}function QC(a){a=a|0;var b=0,c=0,d=0;k[a>>2]=6888;c=a+4|0;if(k[c>>2]|0)fD(a);mr(a+88|0);gD(a+76|0);d=a+52|0;b=k[d>>2]|0;k[d>>2]=0;if(b|0){hD(b);YN(b);}d=a+48|0;b=k[d>>2]|0;k[d>>2]=0;if(b|0){hD(b);YN(b);}d=a+44|0;b=k[d>>2]|0;k[d>>2]=0;if(b|0){hD(b);YN(b);}iD(a+36|0);jD(a+28|0);kD(a+20|0);lD(a+12|0);CB(c);return;}function RC(a){a=a|0;QC(a);YN(a);return;}function SC(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;f=f|0;return Kz((k[a+36>>2]|0)+620|0,b,c,d,e,f)|0;}function TC(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;f=f|0;return Lz((k[a+36>>2]|0)+620|0,b,c,d,e,f)|0;}function UC(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0;o=r;r=r+64|0;n=o+24|0;m=o;if(!(i[a+72>>0]|0))g=30;else{k[m>>2]=k[a+12>>2];g=k[a+16>>2]|0;k[m+4>>2]=g;if(g|0)PN(g);ZA(n,m);Dt(m);if($A(n)|0){g=a+20|0;h=k[g>>2]|0;h=be[k[(k[h>>2]|0)+8>>2]&255](h)|0;j=k[g>>2]|0;j=be[k[(k[j>>2]|0)+12>>2]&255](j)|0;l=k[g>>2]|0;l=be[k[(k[l>>2]|0)+16>>2]&255](l)|0;p=j+4|0;q=be[k[(k[p>>2]|0)+12>>2]&255](p)|0;p=be[k[(k[p>>2]|0)+16>>2]&255](p)|0;$C(a,h,q,p);$C(a,j,q,p);$C(a,l,q,p);gA(m,e,f);if(eD(a,d)|0)TA(k[a+52>>2]|0,b,d,e,f,n,h,j);else{q=a+44|0;$z(k[q>>2]|0,c,b,d,e,f,m,a+56|0,n,h,j,l);XA(n);aA(k[q>>2]|0,c,b,m,l);_d[k[(k[j>>2]|0)+16>>2]&511](j);_d[k[(k[l>>2]|0)+16>>2]&511](l);}g=k[g>>2]|0;g=be[k[(k[g>>2]|0)+8>>2]&255](g)|0;_d[k[(k[g>>2]|0)+8>>2]&511](g);jA(m);g=0;}else g=22;UA(n);}r=o;return g|0;}function VC(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,l=0,m=0,n=0,o=0;l=r;r=r+64|0;j=l+24|0;h=l;if(!(i[a+72>>0]|0))a=30;else{k[h>>2]=k[a+12>>2];g=k[a+16>>2]|0;k[h+4>>2]=g;if(g|0)PN(g);ZA(j,h);Dt(h);if($A(j)|0){g=a+20|0;m=k[g>>2]|0;m=be[k[(k[m>>2]|0)+12>>2]&255](m)|0;g=k[g>>2]|0;g=be[k[(k[g>>2]|0)+16>>2]&255](g)|0;n=m+4|0;o=be[k[(k[n>>2]|0)+12>>2]&255](n)|0;n=be[k[(k[n>>2]|0)+16>>2]&255](n)|0;$C(a,m,o,n);$C(a,g,o,n);d=aD(a,b,c,j,d)|0;_d[k[(k[m>>2]|0)+20>>2]&511](m);XA(j);gA(h,e,f);aA(k[a+44>>2]|0,c,b,h,g);_d[k[(k[g>>2]|0)+16>>2]&511](g);jA(h);a=d;}else a=22;UA(j);}r=l;return a|0;}function WC(a){a=a|0;if(i[a+72>>0]|0){a=k[a+20>>2]|0;a=be[k[(k[a>>2]|0)+12>>2]&255](a)|0;_d[k[(k[a>>2]|0)+20>>2]&511](a);}return;}function XC(a,b){a=a|0;b=b|0;if(i[a+72>>0]|0){if(er(b)|0){a=lu(k[a+20>>2]|0,k[b>>2]|0,k[b+4>>2]|0)|0;a=a?0:10;}else a=21;}else a=30;return a|0;}function YC(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,l=0,m=0,n=0.0;h=r;r=r+16|0;g=h+4|0;e=h;do if(!(i[b+72>>0]|0)){i[a>>0]=0;j[a+2>>1]=0;i[a+4>>0]=0;}else{f=k[b+12>>2]|0;f=be[k[(k[f>>2]|0)+8>>2]&255](f)|0;d=b+20|0;b=k[d>>2]|0;b=be[k[(k[b>>2]|0)+16>>2]&255](b)|0;d=k[d>>2]|0;d=be[k[(k[d>>2]|0)+8>>2]&255](d)|0;if(!(be[k[(k[b>>2]|0)+12>>2]&255](b)|0)){i[a>>0]=0;j[a+2>>1]=0;i[a+4>>0]=0;break;}n=+o[c>>2];m=b+4|0;l=~~+oP(+(n*+((be[k[(k[m>>2]|0)+12>>2]&255](m)|0)>>>0)));n=1.0-+o[c+4>>2];c=~~+oP(+(n*+((be[k[(k[m>>2]|0)+16>>2]&255](m)|0)>>>0)));_d[k[(k[b>>2]|0)+8>>2]&511](b);k[g>>2]=0;se[k[(k[f>>2]|0)+148>>2]&63](f,3333,e);se[k[(k[f>>2]|0)+180>>2]&63](f,3333,4);fe[k[(k[f>>2]|0)+184>>2]&3](f,l,c,1,1,6408,5121,g);b=k[e>>2]|0;if((b|0)!=4)se[k[(k[f>>2]|0)+180>>2]&63](f,3333,b);_d[k[(k[d>>2]|0)+8>>2]&511](d);kB(a,g);}while(0);r=h;return;}function ZC(a){a=a|0;return a+88|0;}function _C(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return Jz((k[a+36>>2]|0)+620|0,b,c,d)|0;}function $C(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;_d[k[(k[b>>2]|0)+8>>2]&511](b);b=k[a+12>>2]|0;b=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;Yd[k[(k[b>>2]|0)+232>>2]&31](b,0,0,c,d);return;}function aD(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,l=0,m=0,n=0,p=0,q=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;z=r;r=r+32|0;u=z+16|0;y=z;l=k[a+12>>2]|0;l=be[k[(k[l>>2]|0)+8>>2]&255](l)|0;m=be[k[(k[b>>2]|0)+16>>2]&255](b)|0;m=k[m>>2]|0;n=(be[k[(k[b>>2]|0)+16>>2]&255](b)|0)+4|0;n=k[n>>2]|0;t=be[k[(k[c>>2]|0)+8>>2]&255](c)|0;p=~~+oP(+ +o[t>>2]);q=~~+oP(+ +o[t+4>>2]);s=~~+oP(+ +o[t+8>>2]);t=~~+oP(+ +o[t+12>>2]);if(de[k[(k[e>>2]|0)+8>>2]&63](e,s-p|0,t-q|0)|0){se[k[(k[l>>2]|0)+148>>2]&63](l,3333,u);se[k[(k[l>>2]|0)+180>>2]&63](l,3333,4);v=y+4|0;w=y+8|0;x=y+12|0;f=1;j=p;while(1){if(!((s|0)>(j|0)&f))break;h=s-j|0;h=(h|0)<(m|0)?h:m;i=j-p|0;g=q;f=1;while(1){if(!((t|0)>(g|0)&f))break;f=t-g|0;k[y>>2]=i;k[v>>2]=g-q;k[w>>2]=h;k[x>>2]=(f|0)<(n|0)?f:n;g=g+n|0;f=bD(a,b,c,d,y,e)|0;}j=j+m|0;}se[k[(k[l>>2]|0)+180>>2]&63](l,3333,k[u>>2]|0);f=f?0:10;}else f=10;r=z;return f|0;}function bD(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;h=r;r=r+16|0;g=h;se[k[(k[f>>2]|0)+12>>2]&63](g,f,e);if(!(k[g>>2]|0))a=0;else{cD(a,b,c,d,e);a=dD(a,e,g)|0;se[k[(k[f>>2]|0)+16>>2]&63](f,e,g);$d[k[(k[f>>2]|0)+20>>2]&255](f,g);}r=h;return a|0;}function cD(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;f=r;r=r+176|0;g=f+152|0;h=f;o[g>>2]=1.0;o[g+4>>2]=1.0;o[g+8>>2]=1.0;o[g+12>>2]=0.0;iB(h,b,c,e);i=k[a+48>>2]|0;e=a+20|0;b=k[e>>2]|0;b=be[k[(k[b>>2]|0)+12>>2]&255](b)|0;e=k[e>>2]|0;dA(i,c,h,g,d,b,be[k[(k[e>>2]|0)+16>>2]&255](e)|0);r=f;return;}function dD(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;g=k[a+12>>2]|0;g=be[k[(k[g>>2]|0)+8>>2]&255](g)|0;h=b+8|0;f=c+4|0;a:do if((k[f>>2]|0)>>>0<k[h>>2]<<2>>>0)a=0;else{e=b+12|0;d=0;a=k[c>>2]|0;while(1){b=k[e>>2]|0;if(b>>>0<=d>>>0){a=1;break a;}fe[k[(k[g>>2]|0)+184>>2]&3](g,0,b+~d|0,k[h>>2]|0,1,6408,5121,a);d=d+1|0;a=a+(k[f>>2]|0)|0;}}while(0);return a|0;}function eD(a,b){a=a|0;b=b|0;b=k[b>>2]|0;if(!b)b=1;else{b=(be[k[(k[b>>2]|0)+8>>2]&255](b)|0)+12|0;b=(k[b>>2]|0)!=2;}a=k[a+20>>2]|0;a=be[k[(k[a>>2]|0)+12>>2]&255](a)|0;return b&(be[k[(k[a>>2]|0)+12>>2]&255](a)|0)|0;}function fD(a){a=a|0;var b=0;a=a+4|0;b=k[a>>2]|0;ir(be[k[(k[b>>2]|0)+8>>2]&255](b)|0);a=k[a>>2]|0;nD(be[k[(k[a>>2]|0)+12>>2]&255](a)|0);return;}function gD(a){a=a|0;var b=0,c=0,d=0;b=k[a>>2]|0;if(b|0){c=a+4|0;while(1){d=k[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;k[c>>2]=d;mD(d);}YN(k[a>>2]|0);}return;}function hD(a){a=a|0;Dt(a+8|0);iD(a);return;}function iD(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function jD(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function kD(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function lD(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function mD(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function nD(a){a=a|0;var b=0,c=0;b=r;r=r+32|0;c=b;k[c+16>>2]=0;oD(a,c)|0;OC(c);r=b;return;}function oD(a,b){a=a|0;b=b|0;var c=0,d=0;c=r;r=r+32|0;d=c;pD(d,b);qD(d,a);OC(d);r=c;return a|0;}function pD(a,b){a=a|0;b=b|0;var c=0,d=0;c=b+16|0;d=k[c>>2]|0;do if(d){if((d|0)==(b|0)){k[a+16>>2]=a;d=k[c>>2]|0;$d[k[(k[d>>2]|0)+12>>2]&255](d,a);break;}else{d=be[k[(k[d>>2]|0)+8>>2]&255](d)|0;k[a+16>>2]=d;break;}}else k[a+16>>2]=0;while(0);return;}function qD(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;i=r;r=r+16|0;c=i;g=a+16|0;d=k[g>>2]|0;h=d;if((d|0)==(a|0)?(e=b+16|0,(k[e>>2]|0)==(b|0)):0){$d[k[(k[d>>2]|0)+12>>2]&255](d,c);h=k[g>>2]|0;_d[k[(k[h>>2]|0)+16>>2]&511](h);k[g>>2]=0;h=k[e>>2]|0;$d[k[(k[h>>2]|0)+12>>2]&255](h,a);h=k[e>>2]|0;_d[k[(k[h>>2]|0)+16>>2]&511](h);k[e>>2]=0;k[g>>2]=a;$d[k[(k[c>>2]|0)+12>>2]&255](c,b);_d[k[(k[c>>2]|0)+16>>2]&511](c);k[e>>2]=b;}else f=4;do if((f|0)==4){if((d|0)==(a|0)){$d[k[(k[d>>2]|0)+12>>2]&255](d,b);h=k[g>>2]|0;_d[k[(k[h>>2]|0)+16>>2]&511](h);h=b+16|0;k[g>>2]=k[h>>2];k[h>>2]=b;break;}c=b+16|0;d=k[c>>2]|0;if((d|0)==(b|0)){$d[k[(k[d>>2]|0)+12>>2]&255](d,a);h=k[c>>2]|0;_d[k[(k[h>>2]|0)+16>>2]&511](h);k[c>>2]=k[g>>2];k[g>>2]=a;break;}else{k[g>>2]=d;k[c>>2]=h;break;}}while(0);r=i;return;}function rD(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0;G=r;r=r+64|0;F=G+48|0;q=G+40|0;s=G+32|0;l=G+24|0;m=G+16|0;o=G+8|0;p=G;k[a>>2]=6888;j=a+4|0;k[j>>2]=k[b>>2];b=k[b+4>>2]|0;k[a+8>>2]=b;if(b|0)PN(b);v=a+12|0;w=a+16|0;y=a+20|0;A=a+24|0;D=a+28|0;E=a+32|0;x=a+36|0;n=a+40|0;t=a+44|0;u=a+48|0;z=a+52|0;b=a+56|0;g=v;h=g+44|0;do{k[g>>2]=0;g=g+4|0;}while((g|0)<(h|0));sD(b,e);i[a+72>>0]=1;B=a+76|0;k[B>>2]=0;C=a+80|0;k[C>>2]=0;k[a+84>>2]=0;k[a+104>>2]=0;if(k[j>>2]|0){b=VN(36,39939)|0;if(!b)b=0;else DB(b,j);k[s>>2]=0;k[F>>2]=k[s>>2];tD(q,b,F);j=k[q>>2]|0;k[q>>2]=k[v>>2];k[v>>2]=j;j=q+4|0;b=k[j>>2]|0;k[j>>2]=k[w>>2];k[w>>2]=b;lD(q);b=k[v>>2]|0;if(b|0?PC(b)|0:0){g=k[v>>2]|0;k[F>>2]=(g|0)==0?0:g+4|0;g=F+4|0;b=k[w>>2]|0;k[g>>2]=b;if(b|0)PN(b);b=k[C>>2]|0;e=a+84|0;if(b>>>0<(k[e>>2]|0)>>>0){k[b>>2]=k[F>>2];k[b+4>>2]=k[g>>2];k[F>>2]=0;k[g>>2]=0;k[C>>2]=b+8;}else uD(B,F);mD(F);b=k[f>>2]|0;if(b|0){g=k[(k[b>>2]|0)+20>>2]|0;k[F>>2]=k[v>>2];h=k[w>>2]|0;k[F+4>>2]=h;if(h|0)PN(h);$d[g&255](b,F);Dt(F);k[F>>2]=k[f>>2];g=F+4|0;b=k[f+4>>2]|0;k[g>>2]=b;if(b|0)PN(b);b=k[C>>2]|0;if(b>>>0<(k[e>>2]|0)>>>0){k[b>>2]=k[F>>2];k[b+4>>2]=k[g>>2];k[F>>2]=0;k[g>>2]=0;k[C>>2]=b+8;}else uD(B,F);mD(F);}b=k[c>>2]|0;if(b|0){g=k[(k[b>>2]|0)+20>>2]|0;k[F>>2]=k[v>>2];h=k[w>>2]|0;k[F+4>>2]=h;if(h|0)PN(h);$d[g&255](b,F);Dt(F);k[F>>2]=k[c>>2];g=F+4|0;b=k[c+4>>2]|0;k[g>>2]=b;if(b|0)PN(b);b=k[C>>2]|0;if(b>>>0<(k[e>>2]|0)>>>0){k[b>>2]=k[F>>2];k[b+4>>2]=k[g>>2];k[F>>2]=0;k[g>>2]=0;k[C>>2]=b+8;}else uD(B,F);mD(F);}b=VN(28,39939)|0;if(!b){g=0;b=0;}else{k[l>>2]=k[v>>2];g=k[w>>2]|0;k[l+4>>2]=g;if(g|0)PN(g);ku(b,l,d);g=1;}k[s>>2]=0;k[F>>2]=k[s>>2];vD(q,b,F);j=k[q>>2]|0;k[q>>2]=k[y>>2];k[y>>2]=j;j=q+4|0;d=k[j>>2]|0;k[j>>2]=k[A>>2];k[A>>2]=d;kD(q);if(g)Dt(l);h=VN(48,39939)|0;if(!h){g=0;b=0;}else{k[m>>2]=k[v>>2];b=k[w>>2]|0;k[m+4>>2]=b;if(b|0)PN(b);kv(h,m);g=1;b=h;}k[s>>2]=0;k[F>>2]=k[s>>2];wD(q,b,F);d=k[q>>2]|0;k[q>>2]=k[D>>2];k[D>>2]=d;d=q+4|0;l=k[d>>2]|0;k[d>>2]=k[E>>2];k[E>>2]=l;jD(q);if(g)Dt(m);b=VN(744,39939)|0;if(!b){g=0;b=0;}else{k[o>>2]=k[v>>2];g=k[w>>2]|0;k[o+4>>2]=g;if(g|0)PN(g);k[p>>2]=k[D>>2];g=k[E>>2]|0;k[p+4>>2]=g;if(g|0)PN(g);Ly(b,o,p,c,f);g=1;}k[s>>2]=0;k[F>>2]=k[s>>2];xD(q,b,F);f=k[q>>2]|0;k[q>>2]=k[x>>2];k[x>>2]=f;f=q+4|0;s=k[f>>2]|0;k[f>>2]=k[n>>2];k[n>>2]=s;iD(q);if(g){Iv(p);Dt(o);}g=VN(16,39939)|0;if(!g){b=k[t>>2]|0;k[t>>2]=0;if(b|0){hD(b);YN(b);}}else{k[F>>2]=k[v>>2];b=k[w>>2]|0;k[F+4>>2]=b;if(b|0)PN(b);Zz(g,x,F);b=k[t>>2]|0;k[t>>2]=g;if(b|0){hD(b);YN(b);}Dt(F);}g=VN(16,39939)|0;if(!g){b=k[u>>2]|0;k[u>>2]=0;if(b|0){hD(b);YN(b);}}else{k[F>>2]=k[v>>2];b=k[w>>2]|0;k[F+4>>2]=b;if(b|0)PN(b);bA(g,x,F);b=k[u>>2]|0;k[u>>2]=g;if(b|0){hD(b);YN(b);}Dt(F);}g=VN(16,39939)|0;do if(!g){b=k[z>>2]|0;k[z>>2]=0;if(!b)break;hD(b);YN(b);}else{k[F>>2]=k[v>>2];b=k[w>>2]|0;k[F+4>>2]=b;if(b|0)PN(b);RA(g,x,F);b=k[z>>2]|0;k[z>>2]=g;if(b|0){hD(b);YN(b);}Dt(F);}while(0);g=k[y>>2]|0;k[F>>2]=(g|0)==0?0:g+4|0;g=F+4|0;b=k[A>>2]|0;k[g>>2]=b;if(b|0)PN(b);b=k[C>>2]|0;if(b>>>0<(k[e>>2]|0)>>>0){k[b>>2]=k[F>>2];k[b+4>>2]=k[g>>2];k[F>>2]=0;k[g>>2]=0;k[C>>2]=b+8;}else uD(B,F);mD(F);g=k[D>>2]|0;k[F>>2]=(g|0)==0?0:g+4|0;g=F+4|0;b=k[E>>2]|0;k[g>>2]=b;if(b|0)PN(b);b=k[C>>2]|0;if(b>>>0<(k[e>>2]|0)>>>0){k[b>>2]=k[F>>2];k[b+4>>2]=k[g>>2];k[F>>2]=0;k[g>>2]=0;k[C>>2]=b+8;}else uD(B,F);mD(F);yD(a);}}r=G;return;}function sD(a,b){a=a|0;b=b|0;o[a>>2]=+(l[b>>0]|0)/255.0;o[a+4>>2]=+(l[b+1>>0]|0)/255.0;o[a+8>>2]=+(l[b+2>>0]|0)/255.0;o[a+12>>2]=+(l[b+3>>0]|0)/255.0;return;}function tD(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=7112;k[c+12>>2]=b;k[a+4>>2]=c;return;}function uD(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;g=r;r=r+32|0;c=g;d=k[a+4>>2]|0;e=k[a>>2]|0;f=(d-e>>3)+1|0;if(f>>>0>536870911)MN(a);else{i=(k[a+8>>2]|0)-e|0;h=i>>2;gE(c,i>>3>>>0<268435455?h>>>0<f>>>0?f:h:536870911,d-e>>3,a+8|0);f=c+8|0;e=k[f>>2]|0;k[e>>2]=k[b>>2];d=b+4|0;k[e+4>>2]=k[d>>2];k[b>>2]=0;k[d>>2]=0;k[f>>2]=e+8;hE(a,c);iE(c);r=g;return;}}function vD(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=7084;k[c+12>>2]=b;k[a+4>>2]=c;return;}function wD(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=7056;k[c+12>>2]=b;k[a+4>>2]=c;return;}function xD(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=7028;k[c+12>>2]=b;k[a+4>>2]=c;return;}function yD(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0;b=r;r=r+48|0;f=b+24|0;c=b;e=a+4|0;g=k[e>>2]|0;g=be[k[(k[g>>2]|0)+8>>2]&255](g)|0;d=a;k[f>>2]=6940;k[f+4>>2]=d;k[f+16>>2]=f;tr(g,f)|0;mh(f);a=k[e>>2]|0;a=be[k[(k[a>>2]|0)+12>>2]&255](a)|0;k[c>>2]=6984;k[c+4>>2]=d;k[c+16>>2]=c;oD(a,c)|0;OC(c);r=b;return;}function zD(a){a=a|0;return;}function AD(a){a=a|0;YN(a);return;}function BD(a){a=a|0;var b=0;b=UN(8)|0;k[b>>2]=6984;k[b+4>>2]=k[a+4>>2];return b|0;}function CD(a,b){a=a|0;b=b|0;k[b>>2]=6984;k[b+4>>2]=k[a+4>>2];return;}function DD(a){a=a|0;return;}function ED(a){a=a|0;YN(a);return;}function FD(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;ID(k[a+4>>2]|0,b,c,d);return;}function GD(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==25133?a+4|0:0)|0;}function HD(a){a=a|0;return 1888;}function ID(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;i[d>>0]=1;g=a+72|0;if(!(i[g>>0]|0)){h=a+76|0;j=a+80|0;f=0;while(1){e=k[h>>2]|0;if(f>>>0>=(k[j>>2]|0)-e>>3>>>0)break;e=k[e+(f<<3)>>2]|0;if(e|0?!(de[k[(k[e>>2]|0)+12>>2]&63](e,b,c)|0):0)i[d>>0]=0;f=f+1|0;}j=i[d>>0]|0;i[g>>0]=j;if(j<<24>>24)JD(a+88|0,c);}return;}function JD(a,b){a=a|0;b=b|0;if(k[a+16>>2]|0)KD(a,b);return;}function KD(a,b){a=a|0;b=b|0;a=k[a+16>>2]|0;if(!a){b=vc(4)|0;k[b>>2]=3688;Pd(b|0,288,44);}else{$d[k[(k[a>>2]|0)+24>>2]&255](a,b);return;}}function LD(a){a=a|0;YN(a);return;}function MD(a){a=a|0;var b=0;b=UN(8)|0;k[b>>2]=6940;k[b+4>>2]=k[a+4>>2];return b|0;}function ND(a,b){a=a|0;b=b|0;k[b>>2]=6940;k[b+4>>2]=k[a+4>>2];return;}function OD(a){a=a|0;return;}function PD(a){a=a|0;YN(a);return;}function QD(a){a=a|0;TD(k[a+4>>2]|0);return;}function RD(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==25466?a+4|0:0)|0;}function SD(a){a=a|0;return 1920;}function TD(a){a=a|0;var b=0,c=0;b=a+72|0;a:do if(i[b>>0]|0){i[b>>0]=0;c=k[a+80>>2]|0;b=k[a+76>>2]|0;while(1){if((b|0)==(c|0))break a;a=k[b>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+8>>2]&511](a);b=b+8|0;}}while(0);return;}function UD(a){a=a|0;VD(a+696|0);My(a+620|0);Ny(a+572|0);Oy(a+524|0);Py(a+460|0);Qy(a+380|0);Ry(a+332|0);Sy(a+284|0);Ty(a+184|0);Uy(a+136|0);Vy(a+80|0);Wy(a);return;}function VD(a){a=a|0;Hv(a+32|0);Gv(a+16|0);Iv(a+8|0);Dt(a);return;}function WD(a){a=a|0;NN(a);YN(a);return;}function XD(a){a=a|0;a=k[a+12>>2]|0;if(a|0){UD(a);YN(a);}return;}function YD(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==25654?a+12|0:0)|0;}function ZD(a){a=a|0;YN(a);return;}function _D(a){a=a|0;NN(a);YN(a);return;}function $D(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function aE(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==25803?a+12|0:0)|0;}function bE(a){a=a|0;YN(a);return;}function cE(a){a=a|0;NN(a);YN(a);return;}function dE(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function eE(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==25964?a+12|0:0)|0;}function fE(a){a=a|0;YN(a);return;}function gE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;do if(b){if(b>>>0>536870911){c=vc(4)|0;hP(c);Pd(c|0,2968,374);}else{d=UN(b<<3)|0;break;}}else d=0;while(0);k[a>>2]=d;c=d+(c<<3)|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+(b<<3);return;}function hE(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;d=k[a>>2]|0;e=a+4|0;f=b+4|0;c=k[e>>2]|0;while(1){if((c|0)==(d|0))break;i=k[f>>2]|0;g=c+-8|0;k[i+-8>>2]=k[g>>2];h=c+-4|0;k[i+-4>>2]=k[h>>2];k[g>>2]=0;k[h>>2]=0;k[f>>2]=(k[f>>2]|0)+-8;c=g;}g=k[a>>2]|0;k[a>>2]=k[f>>2];k[f>>2]=g;g=b+8|0;i=k[e>>2]|0;k[e>>2]=k[g>>2];k[g>>2]=i;g=a+8|0;i=b+12|0;h=k[g>>2]|0;k[g>>2]=k[i>>2];k[i>>2]=h;k[b>>2]=k[f>>2];return;}function iE(a){a=a|0;var b=0,c=0,d=0;b=k[a+4>>2]|0;c=a+8|0;while(1){d=k[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;k[c>>2]=d;mD(d);}a=k[a>>2]|0;if(a|0)YN(a);return;}function jE(a){a=a|0;NN(a);YN(a);return;}function kE(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function lE(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==26123?a+12|0:0)|0;}function mE(a){a=a|0;YN(a);return;}function nE(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0;do if(((((((((((((k[a+4>>2]|0)!=0?(f=k[a+12>>2]|0,(f|0)!=0):0)?PC(f)|0:0)?(g=k[a+20>>2]|0,(g|0)!=0):0)?ju(g)|0:0)?(b=k[a+28>>2]|0,(b|0)!=0):0)?jv(b)|0:0)?(c=k[a+36>>2]|0,(c|0)!=0):0)?cz(c)|0:0)?(d=k[a+44>>2]|0,(d|0)!=0):0)?_z(d)|0:0)?(e=k[a+48>>2]|0,(e|0)!=0):0)?cA(e)|0:0){a=k[a+52>>2]|0;if(a|0?SA(a)|0:0){a=1;break;}a=0;}else a=0;while(0);return a|0;}function oE(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,l=0,m=0;m=r;r=r+32|0;h=m+16|0;l=m+8|0;i=m;if(((k[b>>2]|0)!=0?(k[c>>2]|0)!=0:0)?(k[f>>2]|0)!=0:0){g=VN(112,39939)|0;if(!g)g=0;else rD(g,b,c,d,e,f);k[i>>2]=0;k[h>>2]=k[i>>2];pE(l,g,h);g=k[l>>2]|0;if((g|0)!=0?nE(g)|0:0){j[a>>1]=0;k[a+4>>2]=k[l>>2];g=k[l+4>>2]|0;k[a+8>>2]=g;if(g|0)PN(g);}else{j[a>>1]=22;k[a+4>>2]=0;k[a+8>>2]=0;}qE(l);}else{j[a>>1]=20;k[a+4>>2]=0;k[a+8>>2]=0;}r=m;return;}function pE(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=7140;k[c+12>>2]=b;k[a+4>>2]=c;return;}function qE(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function rE(a){a=a|0;NN(a);YN(a);return;}function sE(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function tE(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==26290?a+12|0:0)|0;}function uE(a){a=a|0;YN(a);return;}function vE(a,b){a=a|0;b=b|0;var c=0.0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0.0,p=0,q=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0.0;x=r;r=r+128|0;d=x+104|0;m=x+96|0;p=x+88|0;q=x+80|0;s=x+72|0;t=x+64|0;u=x+56|0;v=x+40|0;w=x+24|0;e=x+16|0;f=x+8|0;g=x;h=b+28|0;j=b+36|0;if(pt(h,j)|0){o[d>>2]=0.0;o[d+4>>2]=0.0;o[m>>2]=0.0;o[m+4>>2]=0.0;st(a,d,m);}else{c=+Zs(h,j);l=b+20|0;n=+o[l>>2]*.699999988079071;c=c/(n*14.100000381469727);if(c>1.0)c=+Q(+c,.30000001192092896);y=n*3.5*c;n=n*6.099999904632568*c;mt(p,h,j);bt(d,p);at(q,d);at(s,p);ot(m,s,n);lt(d,j,m);ot(u,q,y);lt(t,d,u);ot(m,s,n);lt(d,j,m);ot(v,q,y);mt(u,d,v);k[v>>2]=k[t>>2];k[v+4>>2]=k[u>>2];k[v+8>>2]=k[h>>2];k[v+12>>2]=k[j>>2];k[w>>2]=k[t+4>>2];k[w+4>>2]=k[u+4>>2];k[w+8>>2]=k[b+32>>2];k[w+12>>2]=k[b+40>>2];i[d>>0]=i[m>>0]|0;wE(e,v,v+16|0,d);i[d>>0]=i[m>>0]|0;wE(f,w,w+16|0,d);w=k[k[f>>2]>>2]|0;k[m>>2]=k[k[e>>2]>>2];k[m+4>>2]=w;w=k[k[f+4>>2]>>2]|0;k[g>>2]=k[k[e+4>>2]>>2];k[g+4>>2]=w;st(d,m,g);wt(a,d,+o[l>>2]*.5);}r=x;return;}function wE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0.0,f=0,g=0,h=0,i=0.0,j=0.0,l=0,m=0,n=0;m=b;k[a>>2]=m;n=a+4|0;k[n>>2]=m;a:do if((b|0)!=(c|0)?(f=b+4|0,g=f,(f|0)!=(c|0)):0){if(+o[f>>2]<+o[b>>2]){k[a>>2]=g;m=b;h=f;b=f;d=g;}else{k[n>>2]=g;m=f;h=b;d=g;}b:while(1){f=h;c:while(1){while(1){l=d+4|0;if((l|0)==(c|0))break a;h=d+8|0;d=h;if((h|0)==(c|0))break b;i=+o[h>>2];j=+o[l>>2];e=+o[b>>2];if(i<j)break;if(j<e){k[a>>2]=l;f=l;b=l;}if(!(i<+o[m>>2])){g=22;break c;}}if(i<e){k[a>>2]=d;f=h;b=h;}if(!(j<+o[m>>2])){g=18;break;}}if((g|0)==18){k[n>>2]=l;m=l;h=f;continue;}else if((g|0)==22){k[n>>2]=d;m=h;h=f;continue;}}e=+o[l>>2];if(e<+o[f>>2]){k[a>>2]=l;break;}if(!(e<+o[m>>2]))k[n>>2]=l;}while(0);return;}function xE(a,b){a=a|0;b=b|0;var c=0,d=0,e=0.0,f=0.0,g=0.0,h=0.0,i=0,j=0,l=0,m=0,n=0,p=0.0,q=0.0;n=r;r=r+32|0;i=n+16|0;j=n+8|0;l=n;c=k[b+28>>2]|0;m=k[b+32>>2]|0;if((c|0)==(m|0)){o[i>>2]=0.0;o[i+4>>2]=0.0;o[j>>2]=0.0;o[j+4>>2]=0.0;st(a,i,j);}else{h=+o[c>>2];f=+o[c+4>>2];e=f;g=h;while(1){d=c+8|0;if((d|0)==(m|0))break;p=+o[d>>2];q=+o[c+12>>2];e=q>e?q:e;f=q<f?q:f;g=p>g?p:g;h=p<h?p:h;c=d;}o[j>>2]=h;o[j+4>>2]=f;o[l>>2]=g;o[l+4>>2]=e;st(i,j,l);wt(a,i,+o[b+20>>2]*1.5*.5);}r=n;return;}function yE(a,b){a=a|0;b=b|0;var c=0,d=0;c=r;r=r+16|0;d=c;st(d,b+28|0,b+36|0);wt(a,d,+o[b+20>>2]*.5);r=c;return;}function zE(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0.0,h=0.0,i=0.0,j=0.0;c=r;r=r+32|0;d=c+16|0;f=c+8|0;e=c;j=+o[b+28>>2];h=+o[b+32>>2];i=+o[b+36>>2];g=+o[b+40>>2];o[f>>2]=j-i;o[f+4>>2]=h-g;o[e>>2]=j+i;o[e+4>>2]=h+g;st(d,f,e);wt(a,d,+o[b+20>>2]*.5);r=c;return;}function AE(a,b){a=a|0;b=b|0;wt(a,b+28|0,+o[b+20>>2]*.5);return;}function BE(a){a=a|0;k[a>>2]=7168;qr(a+104|0);mh(a+80|0);aF(a+64|0);aF(a+52|0);aF(a+40|0);return;}function CE(a){a=a|0;BE(a);YN(a);return;}function DE(a){a=a|0;return a+8|0;}function EE(a){a=a|0;return a+40|0;}function FE(a){a=a|0;return a+52|0;}function GE(a){a=a|0;return a+64|0;}function HE(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;switch(i[c>>0]|0){case 0:{k[a>>2]=0;k[a+4>>2]=0;break;}case 1:{e=b+40|0;d=6;break;}case 2:{e=b+52|0;d=6;break;}default:{e=b+64|0;d=6;}}do if((d|0)==6){b=m[c+2>>1]|0;d=k[e>>2]|0;c=d;if(b>>>0>=(k[e+4>>2]|0)-d>>3>>>0){k[a>>2]=0;k[a+4>>2]=0;break;}k[a>>2]=k[c+(b<<3)>>2];b=k[c+(b<<3)+4>>2]|0;k[a+4>>2]=b;if(b|0)PN(b);}while(0);return;}function IE(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;f=r;r=r+16|0;d=f;k[d>>2]=0;e=d+4|0;k[e>>2]=0;if((!($E(b+64|0,c,d)|0)?!($E(b+52|0,c,d)|0):0)?!($E(b+40|0,c,d)|0):0){k[a>>2]=0;k[a+4>>2]=0;}else{k[a>>2]=k[d>>2];k[a+4>>2]=k[e>>2];k[d>>2]=0;k[e>>2]=0;}Sg(d);r=f;return;}function JE(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=k[b>>2]|0;if(c|0){switch(k[c+12>>2]|0){case 1:{d=a+40|0;break;}case 2:{d=a+52|0;break;}default:d=a+64|0;}c=QE(d,c)|0;e=d+4|0;if((c|0)==(k[e>>2]|0)){if((c|0)==(k[d+8>>2]|0))RE(d,b);else{k[c>>2]=k[b>>2];d=k[b+4>>2]|0;k[c+4>>2]=d;if(d){PN(d);c=k[e>>2]|0;}k[e>>2]=c+8;}SE(a);gh(a+80|0);}}return;}function KE(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=r;r=r+16|0;d=e;k[a>>2]=0;k[a+4>>2]=0;if(!(_E(b+64|0,c,a)|0)?!(_E(b+52|0,c,a)|0):0){bO(d,c);dO(d);}else{SE(b);gh(b+80|0);}r=e;return;}function LE(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,l=0,m=0,n=0,o=0,p=0,q=0,s=0;s=r;r=r+32|0;m=s+20|0;l=s+16|0;h=s+12|0;n=s+8|0;o=s+4|0;p=s;q=b+64|0;c=QE(q,c)|0;f=b+68|0;g=k[f>>2]|0;do if((c|0)==(g|0)){i[a>>0]=0;j[a+2>>1]=0;j[a+4>>1]=0;}else{d=c;e=(d-(k[q>>2]|0)|0)>>>3&65535;if((c|0)==(g+-8|0)){i[a>>0]=0;j[a+2>>1]=e;j[a+4>>1]=e;break;}c=c+8|0;if((c|0)!=(g|0)){k[n>>2]=d;k[o>>2]=c;k[p>>2]=g;k[h>>2]=k[n>>2];k[l>>2]=k[o>>2];k[m>>2]=k[p>>2];ZE(h,l,m)|0;}gh(b+80|0);q=(((k[f>>2]|0)-(k[q>>2]|0)|0)>>>3)+65535&65535;i[a>>0]=1;j[a+2>>1]=e;j[a+4>>1]=q;}while(0);r=s;return;}function ME(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0,n=0;n=r;r=r+32|0;h=n+20|0;g=n+16|0;f=n+12|0;j=n+8|0;l=n+4|0;m=n;c=c&65535;d=a+64|0;e=a+68|0;if(c>>>0<(k[e>>2]|0)-(k[d>>2]|0)>>3>>>0?(i=QE(d,b)|0,(i|0)!=(k[e>>2]|0)):0){c=(k[d>>2]|0)+(c<<3)|0;if(i>>>0>=c>>>0){if(c>>>0<i>>>0){k[j>>2]=c;k[l>>2]=i;k[m>>2]=i+8;k[f>>2]=k[j>>2];k[g>>2]=k[l>>2];k[h>>2]=k[m>>2];ZE(f,g,h)|0;}}else{k[j>>2]=i;k[l>>2]=i+8;k[m>>2]=c+8;k[f>>2]=k[j>>2];k[g>>2]=k[l>>2];k[h>>2]=k[m>>2];ZE(f,g,h)|0;}gh(a+80|0);}r=n;return;}function NE(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;h=r;r=r+16|0;g=h;c=k[b>>2]|0;if(c|0){switch(k[c+12>>2]|0){case 1:{d=a+40|0;break;}case 2:{d=a+52|0;break;}default:d=a+64|0;}c=QE(d,c)|0;e=d+4|0;do if((c|0)==(k[e>>2]|0)){if((c|0)==(k[d+8>>2]|0)){RE(d,b);break;}k[c>>2]=k[b>>2];d=k[b+4>>2]|0;k[c+4>>2]=d;if(d){PN(d);c=k[e>>2]|0;}k[e>>2]=c+8;}else{e=k[b>>2]|0;k[g>>2]=e;f=g+4|0;d=k[b+4>>2]|0;k[f>>2]=d;if(d|0)PN(d);k[g>>2]=k[c>>2];k[c>>2]=e;b=c+4|0;k[f>>2]=k[b>>2];k[b>>2]=d;Sg(g);}while(0);SE(a);gh(a+80|0);}r=h;return;}function OE(a){a=a|0;return a+80|0;}function PE(a){a=a|0;return a+104|0;}function QE(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0;h=k[a+4>>2]|0;j=b+11|0;l=b+4|0;a=k[a>>2]|0;a:while(1){if((a|0)==(h|0)){a=h;break;}c=k[a>>2]|0;e=i[c+11>>0]|0;f=e<<24>>24<0;e=e&255;g=f?k[c+4>>2]|0:e;m=i[j>>0]|0;d=m<<24>>24<0;b:do if((g|0)==((d?k[l>>2]|0:m&255)|0)){d=d?k[b>>2]|0:b;if(f)if(!(no(k[c>>2]|0,d,g)|0))break a;else break;while(1){if(!e)break a;if((i[c>>0]|0)!=(i[d>>0]|0))break b;e=e+-1|0;d=d+1|0;c=c+1|0;}}while(0);a=a+8|0;}return a|0;}function RE(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;g=r;r=r+32|0;f=g;c=k[a+4>>2]|0;d=k[a>>2]|0;e=(c-d>>3)+1|0;if(e>>>0>536870911)MN(a);i=(k[a+8>>2]|0)-d|0;h=i>>2;WE(f,i>>3>>>0<268435455?h>>>0<e>>>0?e:h:536870911,c-d>>3,a+8|0);e=f+8|0;c=k[e>>2]|0;k[c>>2]=k[b>>2];d=k[b+4>>2]|0;k[c+4>>2]=d;if(d){PN(d);c=k[e>>2]|0;}k[e>>2]=c+8;XE(a,f);YE(f);r=g;return;}function SE(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0;l=r;r=r+64|0;e=l+48|0;f=l+32|0;g=l+16|0;h=l;i=a+24|0;k[e>>2]=k[i>>2];k[e+4>>2]=k[i+4>>2];k[e+8>>2]=k[i+8>>2];k[e+12>>2]=k[i+12>>2];j=k[a+68>>2]|0;d=k[a+64>>2]|0;while(1){if((d|0)==(j|0))break;if(k[d>>2]|0){rt(f);b=k[d>>2]|0;switch(k[b+12>>2]|0){case 3:{yE(g,b);k[f>>2]=k[g>>2];k[f+4>>2]=k[g+4>>2];k[f+8>>2]=k[g+8>>2];k[f+12>>2]=k[g+12>>2];c=14;break;}case 4:{vE(g,b);k[f>>2]=k[g>>2];k[f+4>>2]=k[g+4>>2];k[f+8>>2]=k[g+8>>2];k[f+12>>2]=k[g+12>>2];c=14;break;}case 5:{xE(g,b);k[f>>2]=k[g>>2];k[f+4>>2]=k[g+4>>2];k[f+8>>2]=k[g+8>>2];k[f+12>>2]=k[g+12>>2];c=14;break;}case 6:{zE(g,b);k[f>>2]=k[g>>2];k[f+4>>2]=k[g+4>>2];k[f+8>>2]=k[g+8>>2];k[f+12>>2]=k[g+12>>2];c=14;break;}case 8:{AE(g,b);k[f>>2]=k[g>>2];k[f+4>>2]=k[g+4>>2];k[f+8>>2]=k[g+8>>2];k[f+12>>2]=k[g+12>>2];c=14;break;}case 7:{if(TE(a,b,f)|0)c=14;else{b=k[d>>2]|0;c=13;}break;}default:c=13;}if((c|0)==13){bO(h,b);dO(h);}else if((c|0)==14?(0,!(zt(i,f)|0)):0){wt(g,f,5.0);k[f>>2]=k[g>>2];k[f+4>>2]=k[g+4>>2];k[f+8>>2]=k[g+8>>2];k[f+12>>2]=k[g+12>>2];xt(g,e,f);k[e>>2]=k[g>>2];k[e+4>>2]=k[g+4>>2];k[e+8>>2]=k[g+8>>2];k[e+12>>2]=k[g+12>>2];}}d=d+8|0;}j=a+8|0;k[j>>2]=k[e>>2];k[j+4>>2]=k[e+4>>2];k[j+8>>2]=k[e+8>>2];k[j+12>>2]=k[e+12>>2];r=l;return;}function TE(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;e=r;r=r+32|0;f=e+16|0;d=e;i[f>>0]=0;rt(d);UE(a+104|0,b,f,d);if(!(i[f>>0]|0))a=0;else{k[c>>2]=k[d>>2];k[c+4>>2]=k[d+4>>2];k[c+8>>2]=k[d+8>>2];k[c+12>>2]=k[d+12>>2];a=1;}r=e;return a|0;}function UE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if(k[a+16>>2]|0)VE(a,b,c,d);return;}function VE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;a=k[a+16>>2]|0;if(!a){d=vc(4)|0;k[d>>2]=3688;Pd(d|0,288,44);}else{we[k[(k[a>>2]|0)+24>>2]&31](a,b,c,d);return;}}function WE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;do if(b){if(b>>>0>536870911){c=vc(4)|0;hP(c);Pd(c|0,2968,374);}else{d=UN(b<<3)|0;break;}}else d=0;while(0);k[a>>2]=d;c=d+(c<<3)|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+(b<<3);return;}function XE(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;d=k[a>>2]|0;e=a+4|0;f=b+4|0;c=k[e>>2]|0;while(1){if((c|0)==(d|0))break;i=k[f>>2]|0;g=c+-8|0;k[i+-8>>2]=k[g>>2];h=c+-4|0;k[i+-4>>2]=k[h>>2];k[g>>2]=0;k[h>>2]=0;k[f>>2]=(k[f>>2]|0)+-8;c=g;}g=k[a>>2]|0;k[a>>2]=k[f>>2];k[f>>2]=g;g=b+8|0;i=k[e>>2]|0;k[e>>2]=k[g>>2];k[g>>2]=i;g=a+8|0;i=b+12|0;h=k[g>>2]|0;k[g>>2]=k[i>>2];k[i>>2]=h;k[b>>2]=k[f>>2];return;}function YE(a){a=a|0;var b=0,c=0,d=0;b=k[a+4>>2]|0;c=a+8|0;while(1){d=k[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;k[c>>2]=d;Sg(d);}a=k[a>>2]|0;if(a|0)YN(a);return;}function ZE(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0;e=k[b>>2]|0;d=k[a>>2]|0;while(1){h=e;g=k[d>>2]|0;f=e;k[d>>2]=k[f>>2];k[f>>2]=g;f=d+4|0;d=h+4|0;e=k[f>>2]|0;k[f>>2]=k[d>>2];k[d>>2]=e;d=(k[a>>2]|0)+8|0;k[a>>2]=d;h=h+8|0;e=h;f=k[b>>2]|0;g=(d|0)==(f|0);if((h|0)==(k[c>>2]|0))break;if(!g)continue;k[b>>2]=e;}if(!g){e=d;while(1){i=f;h=k[e>>2]|0;g=f;k[e>>2]=k[g>>2];k[g>>2]=h;g=e+4|0;e=i+4|0;f=k[g>>2]|0;k[g>>2]=k[e>>2];k[e>>2]=f;e=(k[a>>2]|0)+8|0;k[a>>2]=e;i=i+8|0;f=i;g=k[b>>2]|0;h=(e|0)==(g|0);if((i|0)==(k[c>>2]|0))if(h)break;else{f=g;continue;}if(!h)continue;k[b>>2]=f;}}return d|0;}function _E(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;h=r;r=r+16|0;g=h;e=QE(a,b)|0;f=a+4|0;a:do if((e|0)==(k[f>>2]|0))b=0;else{a=k[e>>2]|0;k[g>>2]=a;d=g+4|0;b=k[e+4>>2]|0;k[d>>2]=b;if(b|0)PN(b);k[g>>2]=k[c>>2];k[c>>2]=a;c=c+4|0;k[d>>2]=k[c>>2];k[c>>2]=b;Sg(g);d=k[f>>2]|0;c=g+4|0;a=e;while(1){b=a+8|0;if((b|0)==(d|0))break;e=k[b>>2]|0;j=a+12|0;i=k[j>>2]|0;k[b>>2]=0;k[j>>2]=0;k[g>>2]=k[a>>2];k[a>>2]=e;e=a+4|0;k[c>>2]=k[e>>2];k[e>>2]=i;Sg(g);a=b;}while(1){b=k[f>>2]|0;if((b|0)==(a|0)){b=1;break a;}j=b+-8|0;k[f>>2]=j;Sg(j);}}while(0);r=h;return b|0;}function $E(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;f=r;r=r+16|0;e=f;b=QE(a,b)|0;if((b|0)==(k[a+4>>2]|0))b=0;else{a=k[b>>2]|0;k[e>>2]=a;d=e+4|0;b=k[b+4>>2]|0;k[d>>2]=b;if(b|0)PN(b);k[e>>2]=k[c>>2];k[c>>2]=a;c=c+4|0;k[d>>2]=k[c>>2];k[c>>2]=b;Sg(e);b=1;}r=f;return b|0;}function aF(a){a=a|0;var b=0,c=0,d=0;b=k[a>>2]|0;if(b|0){c=a+4|0;while(1){d=k[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;k[c>>2]=d;Sg(d);}YN(k[a>>2]|0);}return;}function bF(a,b){a=a|0;b=b|0;var c=0,d=0;k[a>>2]=7168;i[a+4>>0]=0;rt(a+8|0);rt(a+24|0);k[a+96>>2]=0;k[a+120>>2]=0;c=a+40|0;d=c+36|0;do{k[c>>2]=0;c=c+4|0;}while((c|0)<(d|0));if(k[b>>2]|0)cF(a,b);return;}function cF(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;h=r;r=r+16|0;e=h;g=a+24|0;f=(k[b>>2]|0)+28|0;k[g>>2]=k[f>>2];k[g+4>>2]=k[f+4>>2];k[g+8>>2]=k[f+8>>2];k[g+12>>2]=k[f+12>>2];sP(a+8|0,f|0,16)|0;f=k[b>>2]|0;k[e>>2]=f;g=e+4|0;b=k[b+4>>2]|0;k[g>>2]=b;if(b|0)PN(b);c=a+44|0;d=k[c>>2]|0;if(d>>>0<(k[a+48>>2]|0)>>>0){k[d>>2]=f;k[d+4>>2]=b;k[e>>2]=0;k[g>>2]=0;k[c>>2]=d+8;}else dF(a+40|0,e);Sg(e);i[a+4>>0]=1;r=h;return;}function dF(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;g=r;r=r+32|0;c=g;d=k[a+4>>2]|0;e=k[a>>2]|0;f=(d-e>>3)+1|0;if(f>>>0>536870911)MN(a);else{i=(k[a+8>>2]|0)-e|0;h=i>>2;WE(c,i>>3>>>0<268435455?h>>>0<f>>>0?f:h:536870911,d-e>>3,a+8|0);f=c+8|0;e=k[f>>2]|0;k[e>>2]=k[b>>2];d=b+4|0;k[e+4>>2]=k[d>>2];k[b>>2]=0;k[d>>2]=0;k[f>>2]=e+8;XE(a,c);YE(c);r=g;return;}}function eF(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,l=0,m=0,n=0,p=0,q=0,s=0;s=r;r=r+80|0;h=s+64|0;n=s+52|0;f=s+32|0;p=s+24|0;g=s+48|0;q=s+8|0;l=s;m=s+16|0;$d[k[(k[e>>2]|0)+8>>2]&255](n,e);o[h>>2]=0.0;o[h+4>>2]=0.0;o[p>>2]=+(c>>>0);o[p+4>>2]=+(d>>>0);st(f,h,p);c=VN(44,39939)|0;if(!c)c=0;else fF(c,n,b,f);k[g>>2]=0;k[h>>2]=k[g>>2];gF(p,c,h);g=k[p>>2]|0;c=g;if(!g){j[a>>1]=22;k[a+4>>2]=0;k[a+8>>2]=0;}else{d=VN(128,39939)|0;if(!d){k[m>>2]=0;k[h>>2]=k[m>>2];hF(q,0,h);}else{k[l>>2]=c;c=k[p+4>>2]|0;k[l+4>>2]=c;if(c|0)PN(c);bF(d,l);k[m>>2]=0;k[h>>2]=k[m>>2];hF(q,d,h);iF(l);}m=k[q>>2]|0;c=m;if((m|0)!=0?(i[m+4>>0]|0)!=0:0){j[a>>1]=0;k[a+4>>2]=c;c=k[q+4>>2]|0;k[a+8>>2]=c;if(c|0)PN(c);}else{j[a>>1]=22;k[a+4>>2]=0;k[a+8>>2]=0;}jF(q);}kF(p);dO(n);r=s;return;}function fF(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;bO(a,b);k[a+12>>2]=1;bO(a+16|0,c);c=a+28|0;k[c>>2]=k[d>>2];k[c+4>>2]=k[d+4>>2];k[c+8>>2]=k[d+8>>2];k[c+12>>2]=k[d+12>>2];return;}function gF(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=7264;k[c+12>>2]=b;k[a+4>>2]=c;return;}function hF(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=7236;k[c+12>>2]=b;k[a+4>>2]=c;return;}function iF(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function jF(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function kF(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function lF(a){a=a|0;NN(a);YN(a);return;}function mF(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function nF(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==26490?a+12|0:0)|0;}function oF(a){a=a|0;YN(a);return;}function pF(a){a=a|0;dO(a+16|0);dO(a);return;}function qF(a){a=a|0;NN(a);YN(a);return;}function rF(a){a=a|0;a=k[a+12>>2]|0;if(a|0){pF(a);YN(a);}return;}function sF(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==26617?a+12|0:0)|0;}function tF(a){a=a|0;YN(a);return;}function uF(){vF(0);return;}function vF(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0;a=r;r=r+32|0;b=a;h=a+16|0;g=a+15|0;f=a+14|0;e=a+13|0;d=a+12|0;c=a+8|0;wF(h,26756);xF(xF(xF(h,26764,0)|0,26768,1)|0,26774,2)|0;yF(h);zF(g,26779);AF(AF(AF(AF(g,26764,0)|0,26768,1)|0,26774,2)|0,26796,3)|0;BF(g);CF(f,26802);DF(DF(f,26810,0)|0,26812,4)|0;EF(f);FF(e,26814);GF(GF(e,26821,0)|0,26827,4)|0;HF(e);IF(d,26834);KF(JF(JF(d,26821,0)|0,26827,4)|0,26847,8)|0;LF(d);MF(a+11|0,26865);nb(2064,26872,0);nb(2064,26877,1);nb(2064,26882,2);nb(2064,26888,3);nb(2064,26894,4);nb(2064,26899,5);nb(2064,26909,6);nb(2064,26914,7);NF(a+10|0,26919);nb(2072,26935,0);nb(2072,26947,1);OF(a+9|0,26959);nb(2080,26978,0);nb(2080,26992,1);nb(2080,27e3,2);nb(2080,27010,3);nb(2080,27017,4);nb(2080,27032,5);nb(2080,27048,6);nb(2080,27061,7);PF(c,27076);YF(XF(WF(VF(UF(TF(SF(RF(QF(c,27096,0)|0,27107,4)|0,27117,6)|0,27127,8)|0,27132,12)|0,27143,24)|0,27159,28)|0,27174,40)|0,27189,48)|0;ZF(c);mc(2088,2096,2112,0,27207,142,27210,0,27210,0,27212,27221,386);gb(2088,1,7284,27207,143,1);k[b>>2]=92;k[b+4>>2]=0;zd(2088,27224,3,7288,27231,27,cG(b)|0,0);k[b>>2]=144;k[b+4>>2]=0;zd(2088,33149,2,7300,27236,93,eG(b)|0,0);k[b>>2]=94;k[b+4>>2]=0;zd(2088,27240,3,7308,27231,28,gG(b)|0,0);k[b>>2]=95;k[b+4>>2]=0;zd(2088,27248,3,7320,27231,29,iG(b)|0,0);k[b>>2]=96;k[b+4>>2]=0;zd(2088,27261,3,7332,27231,30,kG(b)|0,0);k[b>>2]=97;k[b+4>>2]=0;zd(2088,33273,3,7344,27231,31,mG(b)|0,0);k[b>>2]=3;k[b+4>>2]=0;zd(2088,33280,4,7356,27270,1,oG(b)|0,0);k[b>>2]=3;k[b+4>>2]=0;zd(2088,27276,3,7372,27298,4,qG(b)|0,0);k[b>>2]=4;k[b+4>>2]=0;zd(2088,27303,3,7372,27298,4,qG(b)|0,0);k[b>>2]=98;k[b+4>>2]=0;zd(2088,27323,3,7384,27231,32,sG(b)|0,0);k[b>>2]=99;k[b+4>>2]=0;zd(2088,27333,3,7384,27231,32,sG(b)|0,0);k[b>>2]=100;k[b+4>>2]=0;zd(2088,27343,3,7384,27231,32,sG(b)|0,0);k[b>>2]=101;k[b+4>>2]=0;zd(2088,27352,3,7384,27231,32,sG(b)|0,0);k[b>>2]=145;k[b+4>>2]=0;zd(2088,27360,2,7300,27236,93,eG(b)|0,0);k[b>>2]=102;k[b+4>>2]=0;zd(2088,27369,3,7396,27231,33,uG(b)|0,0);k[b>>2]=103;k[b+4>>2]=0;zd(2088,27382,3,7408,27231,34,wG(b)|0,0);k[b>>2]=146;k[b+4>>2]=0;zd(2088,27394,2,7300,27236,93,eG(b)|0,0);k[b>>2]=147;k[b+4>>2]=0;zd(2088,27406,2,7300,27236,93,eG(b)|0,0);k[b>>2]=104;k[b+4>>2]=0;zd(2088,27418,3,7344,27231,31,mG(b)|0,0);k[b>>2]=105;k[b+4>>2]=0;zd(2088,27434,3,7420,27231,35,yG(b)|0,0);k[b>>2]=147;k[b+4>>2]=0;Rb(2088,27444,2128,27236,106,BG(b)|0,0,0,0,0);r=a;return;}function wF(a,b){a=a|0;b=b|0;Ec(2176,b|0,27730,2,27221,387);return;}function xF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=UN(4)|0;k[e>>2]=c;d=UN(4)|0;k[d>>2]=c;Gb(2176,b|0,3064,27236,107,e|0,3064,27688,48,d|0);return a|0;}function yF(a){a=a|0;Tb(2176);return;}function zF(a,b){a=a|0;b=b|0;Ec(2200,b|0,27730,3,27221,388);return;}function AF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=UN(4)|0;k[e>>2]=c;d=UN(4)|0;k[d>>2]=c;Gb(2200,b|0,3064,27236,108,e|0,3064,27688,49,d|0);return a|0;}function BF(a){a=a|0;Tb(2200);return;}function CF(a,b){a=a|0;b=b|0;Ec(2160,b|0,27730,4,27221,389);return;}function DF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=UN(4)|0;k[e>>2]=c;d=UN(4)|0;k[d>>2]=c;Gb(2160,b|0,3128,27788,1,e|0,3128,27792,3,d|0);return a|0;}function EF(a){a=a|0;Tb(2160);return;}function FF(a,b){a=a|0;b=b|0;Ec(2192,b|0,27730,5,27221,390);return;}function GF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=UN(4)|0;k[e>>2]=c;d=UN(4)|0;k[d>>2]=c;Gb(2192,b|0,3104,27236,109,e|0,3104,27688,50,d|0);return a|0;}function HF(a){a=a|0;Tb(2192);return;}function IF(a,b){a=a|0;b=b|0;Ec(2168,b|0,27730,6,27221,391);return;}function JF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=UN(4)|0;k[e>>2]=c;d=UN(4)|0;k[d>>2]=c;Gb(2168,b|0,3104,27236,110,e|0,3104,27688,51,d|0);return a|0;}function KF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=UN(4)|0;k[e>>2]=c;d=UN(4)|0;k[d>>2]=c;Gb(2168,b|0,3128,27788,2,e|0,3128,27792,4,d|0);return a|0;}function LF(a){a=a|0;Tb(2168);return;}function MF(a,b){a=a|0;b=b|0;Qd(2064,b|0,4,1);return;}function NF(a,b){a=a|0;b=b|0;Qd(2072,b|0,4,1);return;}function OF(a,b){a=a|0;b=b|0;Qd(2080,b|0,4,1);return;}function PF(a,b){a=a|0;b=b|0;Ec(2184,b|0,27730,7,27221,392);return;}function QF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=UN(4)|0;k[e>>2]=c;d=UN(4)|0;k[d>>2]=c;Gb(2184,b|0,2176,27236,111,e|0,2176,27688,52,d|0);return a|0;}function RF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=UN(4)|0;k[e>>2]=c;d=UN(4)|0;k[d>>2]=c;Gb(2184,b|0,3088,27236,112,e|0,3088,27688,53,d|0);return a|0;}function SF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=UN(4)|0;k[e>>2]=c;d=UN(4)|0;k[d>>2]=c;Gb(2184,b|0,3048,27236,113,e|0,3048,27688,54,d|0);return a|0;}function TF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=UN(4)|0;k[e>>2]=c;d=UN(4)|0;k[d>>2]=c;Gb(2184,b|0,2064,27236,114,e|0,2064,27688,55,d|0);return a|0;}function UF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=UN(4)|0;k[e>>2]=c;d=UN(4)|0;k[d>>2]=c;Gb(2184,b|0,2168,27236,115,e|0,2168,27688,56,d|0);return a|0;}function VF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=UN(4)|0;k[e>>2]=c;d=UN(4)|0;k[d>>2]=c;Gb(2184,b|0,2200,27236,116,e|0,2200,27688,57,d|0);return a|0;}function WF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=UN(4)|0;k[e>>2]=c;d=UN(4)|0;k[d>>2]=c;Gb(2184,b|0,2128,27236,117,e|0,2128,27688,58,d|0);return a|0;}function XF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=UN(4)|0;k[e>>2]=c;d=UN(4)|0;k[d>>2]=c;Gb(2184,b|0,2192,27236,118,e|0,2192,27688,59,d|0);return a|0;}function YF(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=UN(4)|0;k[e>>2]=c;d=UN(4)|0;k[d>>2]=c;Gb(2184,b|0,2072,27236,119,e|0,2072,27688,60,d|0);return a|0;}function ZF(a){a=a|0;Tb(2184);return;}function _F(a){a=a|0;return 2088;}function $F(a){a=a|0;if(a|0){OJ(a);YN(a);}return;}function aG(a){a=a|0;return qe[a&7]()|0;}function bG(){var a=0;a=UN(36)|0;NJ(a);return a|0;}function cG(a){a=a|0;var b=0,c=0;b=UN(8)|0;c=k[a+4>>2]|0;k[b>>2]=k[a>>2];k[b+4>>2]=c;return b|0;}function dG(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=k[a>>2]|0;e=k[a+4>>2]|0;a=b+(e>>1)|0;if(e&1)d=k[(k[a>>2]|0)+d>>2]|0;return ne[d&127](a,c)|0;}function eG(a){a=a|0;var b=0,c=0;b=UN(8)|0;c=k[a+4>>2]|0;k[b>>2]=k[a>>2];k[b+4>>2]=c;return b|0;}function fG(a,b){a=a|0;b=b|0;var c=0,d=0;c=k[a>>2]|0;d=k[a+4>>2]|0;a=b+(d>>1)|0;if(d&1)c=k[(k[a>>2]|0)+c>>2]|0;return be[c&255](a)|0;}function gG(a){a=a|0;var b=0,c=0;b=UN(8)|0;c=k[a+4>>2]|0;k[b>>2]=k[a>>2];k[b+4>>2]=c;return b|0;}function hG(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=k[a>>2]|0;e=k[a+4>>2]|0;a=b+(e>>1)|0;if(e&1)d=k[(k[a>>2]|0)+d>>2]|0;return ne[d&127](a,c)|0;}function iG(a){a=a|0;var b=0,c=0;b=UN(8)|0;c=k[a+4>>2]|0;k[b>>2]=k[a>>2];k[b+4>>2]=c;return b|0;}function jG(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=k[a>>2]|0;e=k[a+4>>2]|0;a=b+(e>>1)|0;if(e&1)d=k[(k[a>>2]|0)+d>>2]|0;return ne[d&127](a,c)|0;}function kG(a){a=a|0;var b=0,c=0;b=UN(8)|0;c=k[a+4>>2]|0;k[b>>2]=k[a>>2];k[b+4>>2]=c;return b|0;}function lG(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=k[a>>2]|0;e=k[a+4>>2]|0;a=b+(e>>1)|0;if(e&1)d=k[(k[a>>2]|0)+d>>2]|0;return ne[d&127](a,c)|0;}function mG(a){a=a|0;var b=0,c=0;b=UN(8)|0;c=k[a+4>>2]|0;k[b>>2]=k[a>>2];k[b+4>>2]=c;return b|0;}function nG(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=k[a>>2]|0;e=k[a+4>>2]|0;a=b+(e>>1)|0;if(e&1)d=k[(k[a>>2]|0)+d>>2]|0;return ne[d&127](a,c)|0;}function oG(a){a=a|0;var b=0,c=0;b=UN(8)|0;c=k[a+4>>2]|0;k[b>>2]=k[a>>2];k[b+4>>2]=c;return b|0;}function pG(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;var e=0,f=0;e=k[a>>2]|0;f=k[a+4>>2]|0;a=b+(f>>1)|0;if(f&1)e=k[(k[a>>2]|0)+e>>2]|0;return he[e&7](a,c,d)|0;}function qG(a){a=a|0;var b=0,c=0;b=UN(8)|0;c=k[a+4>>2]|0;k[b>>2]=k[a>>2];k[b+4>>2]=c;return b|0;}function rG(a,b,c){a=a|0;b=b|0;c=+c;var d=0,e=0;d=k[a>>2]|0;e=k[a+4>>2]|0;a=b+(e>>1)|0;if(e&1)d=k[(k[a>>2]|0)+d>>2]|0;return ke[d&7](a,c)|0;}function sG(a){a=a|0;var b=0,c=0;b=UN(8)|0;c=k[a+4>>2]|0;k[b>>2]=k[a>>2];k[b+4>>2]=c;return b|0;}function tG(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=k[a>>2]|0;e=k[a+4>>2]|0;a=b+(e>>1)|0;if(e&1)d=k[(k[a>>2]|0)+d>>2]|0;return ne[d&127](a,c)|0;}function uG(a){a=a|0;var b=0,c=0;b=UN(8)|0;c=k[a+4>>2]|0;k[b>>2]=k[a>>2];k[b+4>>2]=c;return b|0;}function vG(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=k[a>>2]|0;e=k[a+4>>2]|0;a=b+(e>>1)|0;if(e&1)d=k[(k[a>>2]|0)+d>>2]|0;return ne[d&127](a,c)|0;}function wG(a){a=a|0;var b=0,c=0;b=UN(8)|0;c=k[a+4>>2]|0;k[b>>2]=k[a>>2];k[b+4>>2]=c;return b|0;}function xG(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=k[a>>2]|0;e=k[a+4>>2]|0;a=b+(e>>1)|0;if(e&1)d=k[(k[a>>2]|0)+d>>2]|0;return ne[d&127](a,c)|0;}function yG(a){a=a|0;var b=0,c=0;b=UN(8)|0;c=k[a+4>>2]|0;k[b>>2]=k[a>>2];k[b+4>>2]=c;return b|0;}function zG(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=k[a>>2]|0;e=k[a+4>>2]|0;a=b+(e>>1)|0;if(e&1)d=k[(k[a>>2]|0)+d>>2]|0;return ne[d&127](a,c)|0;}function AG(a,b){a=a|0;b=b|0;bO(a,b);return;}function BG(a){a=a|0;var b=0,c=0;b=UN(8)|0;c=k[a+4>>2]|0;k[b>>2]=k[a>>2];k[b+4>>2]=c;return b|0;}function CG(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;e=r;r=r+16|0;d=e;c=k[a>>2]|0;f=k[a+4>>2]|0;a=b+(f>>1)|0;if(f&1)c=k[(k[a>>2]|0)+c>>2]|0;$d[c&255](d,a);f=DG(d)|0;dO(d);r=e;return f|0;}function DG(a){a=a|0;var b=0,c=0,d=0;c=i[a+11>>0]|0;d=c<<24>>24<0;c=d?k[a+4>>2]|0:c&255;b=IN(c+4|0)|0;k[b>>2]=c;qP(b+4|0,(d?k[a>>2]|0:a)|0,c|0)|0;return b|0;}function EG(a,b){a=a|0;b=b|0;return k[b+(k[a>>2]|0)>>2]|0;}function FG(a,b,c){a=a|0;b=b|0;c=c|0;k[b+(k[a>>2]|0)>>2]=c;return;}function GG(a,b){a=a|0;b=b|0;return IG(b+(k[a>>2]|0)|0)|0;}function HG(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=c;d=k[e+4>>2]|0;c=b+(k[a>>2]|0)|0;k[c>>2]=k[e>>2];k[c+4>>2]=d;return;}function IG(a){a=a|0;var b=0,c=0,d=0;b=UN(8)|0;d=a;c=k[d+4>>2]|0;a=b;k[a>>2]=k[d>>2];k[a+4>>2]=c;return b|0;}function JG(a,b){a=a|0;b=b|0;return DG(b+(k[a>>2]|0)|0)|0;}function KG(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=r;r=r+16|0;d=e;b=b+(k[a>>2]|0)|0;LG(d,c);a=b+11|0;if((i[a>>0]|0)<0){i[k[b>>2]>>0]=0;k[b+4>>2]=0;}else{i[b>>0]=0;i[a>>0]=0;}gO(b,0);k[b>>2]=k[d>>2];k[b+4>>2]=k[d+4>>2];k[b+8>>2]=k[d+8>>2];a=0;while(1){if((a|0)==3)break;k[d+(a<<2)>>2]=0;a=a+1|0;}dO(d);r=e;return;}function LG(a,b){a=a|0;b=b|0;var c=0;c=k[b>>2]|0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;cO(a,b+4|0,c);return;}function MG(a,b){a=a|0;b=b|0;return OG(b+(k[a>>2]|0)|0)|0;}function NG(a,b,c){a=a|0;b=b|0;c=c|0;b=b+(k[a>>2]|0)|0;c=l[c>>0]|l[c+1>>0]<<8|l[c+2>>0]<<16|l[c+3>>0]<<24;i[b>>0]=c;i[b+1>>0]=c>>8;i[b+2>>0]=c>>16;i[b+3>>0]=c>>24;return;}function OG(a){a=a|0;var b=0;b=UN(4)|0;a=l[a>>0]|l[a+1>>0]<<8|l[a+2>>0]<<16|l[a+3>>0]<<24;i[b>>0]=a;i[b+1>>0]=a>>8;i[b+2>>0]=a>>16;i[b+3>>0]=a>>24;return b|0;}function PG(a,b){a=a|0;b=b|0;a=b+(k[a>>2]|0)|0;b=UN(12)|0;k[b>>2]=k[a>>2];k[b+4>>2]=k[a+4>>2];k[b+8>>2]=k[a+8>>2];return b|0;}function QG(a,b,c){a=a|0;b=b|0;c=c|0;b=b+(k[a>>2]|0)|0;k[b>>2]=k[c>>2];k[b+4>>2]=k[c+4>>2];k[b+8>>2]=k[c+8>>2];return;}function RG(a,b){a=a|0;b=b|0;return k[b+(k[a>>2]|0)>>2]|0;}function SG(a,b,c){a=a|0;b=b|0;c=c|0;k[b+(k[a>>2]|0)>>2]=c;return;}function TG(a,b){a=a|0;b=b|0;return(i[b+(k[a>>2]|0)>>0]|0)!=0|0;}function UG(a,b,c){a=a|0;b=b|0;c=c|0;i[b+(k[a>>2]|0)>>0]=c&1;return;}function VG(a,b){a=a|0;b=b|0;return j[b+(k[a>>2]|0)>>1]|0;}function WG(a,b,c){a=a|0;b=b|0;c=c|0;j[b+(k[a>>2]|0)>>1]=c;return;}function XG(a,b){a=a|0;b=b|0;a=b+(k[a>>2]|0)|0;b=UN(3)|0;i[b>>0]=i[a>>0]|0;i[b+1>>0]=i[a+1>>0]|0;i[b+2>>0]=i[a+2>>0]|0;return b|0;}function YG(a,b,c){a=a|0;b=b|0;c=c|0;b=b+(k[a>>2]|0)|0;i[b>>0]=i[c>>0]|0;i[b+1>>0]=i[c+1>>0]|0;i[b+2>>0]=i[c+2>>0]|0;return;}function ZG(){var a=0,b=0,c=0;a=UN(52)|0;b=a;c=b+52|0;do{k[b>>2]=0;b=b+4|0;}while((b|0)<(c|0));$G(a);return a|0;}function _G(a){a=a|0;if(a|0){dO(a+28|0);YN(a);}return;}function $G(a){a=a|0;var b=0;b=a+28|0;k[b>>2]=0;k[b+4>>2]=0;k[b+8>>2]=0;a=0;while(1){if((a|0)==3)break;k[b+(a<<2)>>2]=0;a=a+1|0;}return;}function aH(a,b){a=a|0;b=b|0;return+ +o[b+(k[a>>2]|0)>>2];}function bH(a,b,c){a=a|0;b=b|0;c=+c;o[b+(k[a>>2]|0)>>2]=c;return;}function cH(a,b){a=a|0;b=b|0;return k[b+(k[a>>2]|0)>>2]|0;}function dH(a,b,c){a=a|0;b=b|0;c=c|0;k[b+(k[a>>2]|0)>>2]=c;return;}function eH(){var a=0;a=UN(12)|0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;return a|0;}function fH(a){a=a|0;if(a|0)YN(a);return;}function gH(a,b){a=a|0;b=b|0;return k[b+(k[a>>2]|0)>>2]|0;}function hH(a,b,c){a=a|0;b=b|0;c=c|0;k[b+(k[a>>2]|0)>>2]=c;return;}function iH(){var a=0,b=0;a=UN(8)|0;b=a;k[b>>2]=0;k[b+4>>2]=0;return a|0;}function jH(a){a=a|0;if(a|0)YN(a);return;}function kH(a,b){a=a|0;b=b|0;return+ +o[b+(k[a>>2]|0)>>2];}function lH(a,b,c){a=a|0;b=b|0;c=+c;o[b+(k[a>>2]|0)>>2]=c;return;}function mH(){var a=0,b=0;a=UN(8)|0;b=a;k[b>>2]=0;k[b+4>>2]=0;return a|0;}function nH(a){a=a|0;if(a|0)YN(a);return;}function oH(a,b){a=a|0;b=b|0;return i[b+(k[a>>2]|0)>>0]|0;}function pH(a,b,c){a=a|0;b=b|0;c=c|0;i[b+(k[a>>2]|0)>>0]=c;return;}function qH(){var a=0;a=UN(4)|0;i[a>>0]=0;i[a+1>>0]=0;i[a+2>>0]=0;i[a+3>>0]=0;return a|0;}function rH(a){a=a|0;if(a|0)YN(a);return;}function sH(a,b){a=a|0;b=b|0;return i[b+(k[a>>2]|0)>>0]|0;}function tH(a,b,c){a=a|0;b=b|0;c=c|0;i[b+(k[a>>2]|0)>>0]=c;return;}function uH(){var a=0;a=UN(3)|0;i[a>>0]=0;i[a+1>>0]=0;i[a+2>>0]=0;return a|0;}function vH(a){a=a|0;if(a|0)YN(a);return;}function wH(a){a=a|0;var b=0;k[a>>2]=7440;b=a+4|0;a=k[b>>2]|0;k[b>>2]=0;_N(a);return;}function xH(a){a=a|0;wH(a);YN(a);return;}function yH(a,b,c){a=a|0;b=b|0;c=c|0;return(Uc(0,b|0,c|0)|0)!=0|0;}function zH(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;d=k[c+8>>2]<<2;if(CH(b,$(k[c+12>>2]|0,d)|0)|0)k[a>>2]=k[b+4>>2];else{k[a>>2]=0;d=0;}k[a+4>>2]=d;return;}function AH(a,b,c){a=a|0;b=b|0;c=c|0;a=k[b+12>>2]|0;ld(1,k[b>>2]|0,k[b+4>>2]|0,k[b+8>>2]|0,a|0,k[c>>2]|0,$(k[c+4>>2]|0,a)|0)|0;return;}function BH(a,b){a=a|0;b=b|0;return;}function CH(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=a+8|0;do if((k[c>>2]|0)>>>0<b>>>0){e=XN(b,39939)|0;a=a+4|0;d=k[a>>2]|0;k[a>>2]=e;_N(d);if(!(k[a>>2]|0)){k[c>>2]=0;a=0;break;}else{k[c>>2]=b;a=1;break;}}else a=1;while(0);return a|0;}function DH(a){a=a|0;k[a>>2]=7440;k[a+4>>2]=0;k[a+8>>2]=0;return;}function EH(a){a=a|0;k[a>>2]=7472;Cu(a+4|0);return;}function FH(a){a=a|0;k[a>>2]=7472;Cu(a+4|0);YN(a);return;}function GH(a){a=a|0;Au(a+4|0);Pb(2);return;}function HH(a,b,c){a=a|0;b=b|0;c=c|0;Pb(3);return 1;}function IH(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0;i=r;r=r+16|0;g=i+8|0;h=i;b=b+4|0;d=ru(b,c)|0;if(d){k[a>>2]=k[d+20>>2];b=k[d+24>>2]|0;k[a+4>>2]=b;if(b|0)PN(b);}else{KH(h,0,c);if(!(k[h>>2]|0)){k[a>>2]=0;k[a+4>>2]=0;}else{b=tu(b,c)|0;d=k[h>>2]|0;k[g>>2]=d;c=g+4|0;e=h+4|0;f=k[e>>2]|0;k[c>>2]=f;if(f|0)PN(f);k[g>>2]=k[b>>2];k[b>>2]=d;d=b+4|0;k[c>>2]=k[d>>2];k[d>>2]=f;su(g);k[a>>2]=k[h>>2];k[a+4>>2]=k[e>>2];k[h>>2]=0;k[e>>2]=0;}su(h);}r=i;return;}function JH(a,b){a=a|0;b=b|0;return;}function KH(a,b,c){a=a|0;b=b|0;c=c|0;b=Wa(4,((i[c+11>>0]|0)<0?k[c>>2]|0:c)|0)|0;if((b|0)==-1){k[a>>2]=0;k[a+4>>2]=0;}else LH(a,b);return;}function LH(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;g=r;r=r+32|0;d=g+16|0;f=g+8|0;e=g;c=VN(24,39939)|0;if(!c)c=0;else{h=c+4|0;k[h>>2]=0;k[h+4>>2]=0;k[h+8>>2]=0;k[h+12>>2]=0;k[c>>2]=7504;k[c+12>>2]=0;k[c+16>>2]=0;k[c+20>>2]=0;}k[e>>2]=0;k[d>>2]=k[e>>2];MH(f,c,d);c=k[f>>2]|0;do if(c){if(NH(c,b)|0){k[a>>2]=k[f>>2];h=f+4|0;k[a+4>>2]=k[h>>2];k[f>>2]=0;k[h>>2]=0;break;}else{k[a>>2]=0;k[a+4>>2]=0;break;}}else{k[a>>2]=0;k[a+4>>2]=0;}while(0);OH(f);r=g;return;}function MH(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=7584;k[c+12>>2]=b;k[a+4>>2]=c;return;}function NH(a,b){a=a|0;b=b|0;if(PH(a,b)|0)a=QH(a,b)|0;else a=0;return a|0;}function OH(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function PH(a,b){a=a|0;b=b|0;var c=0;c=Wa(5,b|0)|0;b=Wa(6,b|0)|0;if((b|c|0)<0)b=0;else{k[a+4>>2]=c;k[a+8>>2]=b;b=1;}return b|0;}function QH(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0;l=r;r=r+16|0;g=l;h=Wa(7,b|0)|0;a:do if((h|0)<1)a=0;else{i=a+16|0;j=a+20|0;e=a+12|0;f=g+4|0;d=0;while(1){if((d|0)>=(h|0)){a=1;break a;}RH(g,b,d);c=k[g>>2]|0;if(!c)break;a=k[i>>2]|0;if((a|0)==(k[j>>2]|0))SH(e,g);else{k[a>>2]=c;c=k[f>>2]|0;k[a+4>>2]=c;if(c){PN(c);a=k[i>>2]|0;}k[i>>2]=a+8;}nu(g);d=d+1|0;}nu(g);a=0;}while(0);r=l;return a|0;}function RH(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;h=r;r=r+32|0;e=h+16|0;g=h+8|0;f=h;d=VN(44,39939)|0;if(!d)d=0;else{k[d>>2]=7532;k[d+4>>2]=b;k[d+8>>2]=c;}k[f>>2]=0;k[e>>2]=k[f>>2];TH(g,d,e);d=k[g>>2]|0;do if(d){if(UH(d)|0){k[a>>2]=k[g>>2];f=g+4|0;k[a+4>>2]=k[f>>2];k[g>>2]=0;k[f>>2]=0;break;}else{k[a>>2]=0;k[a+4>>2]=0;break;}}else{k[a>>2]=0;k[a+4>>2]=0;}while(0);VH(g);r=h;return;}function SH(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;g=r;r=r+32|0;f=g;c=k[a+4>>2]|0;d=k[a>>2]|0;e=(c-d>>3)+1|0;if(e>>>0>536870911)MN(a);i=(k[a+8>>2]|0)-d|0;h=i>>2;ou(f,i>>3>>>0<268435455?h>>>0<e>>>0?e:h:536870911,c-d>>3,a+8|0);e=f+8|0;c=k[e>>2]|0;k[c>>2]=k[b>>2];d=k[b+4>>2]|0;k[c+4>>2]=d;if(d){PN(d);c=k[e>>2]|0;}k[e>>2]=c+8;pu(a,f);qu(f);r=g;return;}function TH(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=7556;k[c+12>>2]=b;k[a+4>>2]=c;return;}function UH(a){a=a|0;var b=0.0,c=0;if(!(Uc(8,k[a+4>>2]|0,k[a+8>>2]|0)|0))a=0;else{c=Kb(9)|0;k[a+12>>2]=c;c=Kb(10)|0;k[a+16>>2]=c;c=Kb(11)|0;k[a+20>>2]=c;c=Kb(12)|0;k[a+24>>2]=c;b=+Ka(13);o[a+28>>2]=b;b=+Ka(14);o[a+32>>2]=b;b=+Ka(15);o[a+36>>2]=b;b=+Ka(16);o[a+40>>2]=b;a=1;}return a|0;}function VH(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function WH(a){a=a|0;NN(a);YN(a);return;}function XH(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function YH(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==28506?a+12|0:0)|0;}function ZH(a){a=a|0;YN(a);return;}function _H(a){a=a|0;return;}function $H(a){a=a|0;YN(a);return;}function aI(a){a=a|0;return a+12|0;}function bI(a){a=a|0;return(Uc(17,k[a+4>>2]|0,k[a+8>>2]|0)|0)!=0|0;}function cI(a){a=a|0;NN(a);YN(a);return;}function dI(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function eI(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==28835?a+12|0:0)|0;}function fI(a){a=a|0;YN(a);return;}function gI(a){a=a|0;k[a>>2]=7504;mu(a+12|0);return;}function hI(a){a=a|0;k[a>>2]=7504;mu(a+12|0);YN(a);return;}function iI(a){a=a|0;return k[a+4>>2]|0;}function jI(a){a=a|0;return k[a+8>>2]|0;}function kI(a){a=a|0;return a+12|0;}function lI(a){a=a|0;return;}function mI(a){a=a|0;YN(a);return;}function nI(a){a=a|0;Pb(18);return;}function oI(a,b,c){a=a|0;b=b|0;c=c|0;Pb(19);return 1;}function pI(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=+f;g=g|0;var h=0,i=0,j=0,l=0,m=0,n=0,p=0;p=r;r=r+32|0;j=p+24|0;m=p+16|0;h=p+8|0;n=p;k[n>>2]=0;l=n+4|0;k[l>>2]=0;b=k[g>>2]|0;i=b;if(!b){b=VN(76,39939)|0;if(!b)b=0;else jJ(b);k[h>>2]=0;k[j>>2]=k[h>>2];sI(m,b,j);g=k[m>>2]|0;k[m>>2]=k[n>>2];k[n>>2]=g;g=m+4|0;j=k[g>>2]|0;k[g>>2]=k[l>>2];k[l>>2]=j;rI(m);}else{k[m>>2]=i;h=m+4|0;b=k[g+4>>2]|0;k[h>>2]=b;if(b|0)PN(b);k[m>>2]=0;k[h>>2]=0;k[j>>2]=0;k[n>>2]=i;k[j+4>>2]=0;k[l>>2]=b;rI(j);rI(m);}e=~~+oP(+(+(e&65535)*f))&65535;kJ(k[n>>2]|0,c,d,e);e=k[n>>2]|0;o[e+68>>2]=f;k[a>>2]=e;k[a+4>>2]=k[l>>2];k[n>>2]=0;k[l>>2]=0;rI(n);r=p;return;}function qI(a,b){a=a|0;b=b|0;return;}function rI(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function sI(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=7644;k[c+12>>2]=b;k[a+4>>2]=c;return;}function tI(a){a=a|0;NN(a);YN(a);return;}function uI(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function vI(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==29105?a+12|0:0)|0;}function wI(a){a=a|0;YN(a);return;}function xI(a){a=a|0;k[a>>2]=7672;SI(a+8|0);return;}function yI(a){a=a|0;k[a>>2]=7672;SI(a+8|0);YN(a);return;}function zI(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,l=0;l=r;r=r+32|0;i=l+16|0;g=l+12|0;j=l;h=l+8|0;f=Kb(20)|0;k[g>>2]=f;e=VN(40,39939)|0;if(!e)e=0;else AI(e,f,c,d);k[h>>2]=0;k[i>>2]=k[h>>2];BI(j,e,i);if(!(k[j>>2]|0)){k[a>>2]=0;k[a+4>>2]=0;}else{e=CI(b+8|0,g)|0;c=k[j>>2]|0;k[i>>2]=c;d=i+4|0;f=j+4|0;b=k[f>>2]|0;k[d>>2]=b;if(b|0)QN(b);k[i>>2]=k[e>>2];k[e>>2]=c;h=e+4|0;k[d>>2]=k[h>>2];k[h>>2]=b;DI(i);k[a>>2]=k[j>>2];k[a+4>>2]=k[f>>2];k[j>>2]=0;k[f>>2]=0;}EI(j);r=l;return;}function AI(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a>>2]=7720;k[a+4>>2]=b;k[a+8>>2]=c;i[a+12>>0]=0;ur(a+16|0,d);return;}function BI(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=7692;k[c+12>>2]=b;k[a+4>>2]=c;return;}function CI(a,b){a=a|0;b=b|0;var c=0,d=0,e=0.0,f=0.0,g=0,h=0,i=0,j=0,l=0,m=0,n=0,p=0,q=0;q=r;r=r+16|0;p=q;n=k[b>>2]|0;l=a+4|0;g=k[l>>2]|0;m=(g|0)==0;a:do if(!m){h=g+-1|0;i=(h&g|0)==0;if(i)c=h&n;else c=(n>>>0)%(g>>>0)|0;b=k[(k[a>>2]|0)+(c<<2)>>2]|0;if(!b)j=12;else do{b=k[b>>2]|0;if(!b){j=12;break a;}d=k[b+4>>2]|0;if(i)d=d&h;else d=(d>>>0)%(g>>>0)|0;if((d|0)!=(c|0)){j=12;break a;}}while((k[b+8>>2]|0)!=(n|0));}else{c=0;j=12;}while(0);if((j|0)==12){h=UN(20)|0;k[p>>2]=h;k[h+8>>2]=n;k[h+12>>2]=0;k[h+16>>2]=0;k[h+4>>2]=n;k[h>>2]=0;h=a+12|0;e=+(((k[h>>2]|0)+1|0)>>>0);f=+o[a+16>>2];do if(m|e>+(g>>>0)*f){b=(g>>>0>2&(g+-1&g|0)==0&1|g<<1)^1;c=~~+_(+(e/f))>>>0;FI(a,b>>>0<c>>>0?c:b);b=k[l>>2]|0;c=b+-1|0;if(!(c&b)){g=b;c=c&n;break;}else{g=b;c=(n>>>0)%(b>>>0)|0;break;}}while(0);b=k[(k[a>>2]|0)+(c<<2)>>2]|0;if(!b){n=a+8|0;b=k[p>>2]|0;k[b>>2]=k[n>>2];k[n>>2]=b;k[(k[a>>2]|0)+(c<<2)>>2]=n;c=k[b>>2]|0;if(c){c=k[c+4>>2]|0;d=g+-1|0;if(!(d&g))c=c&d;else c=(c>>>0)%(g>>>0)|0;k[(k[a>>2]|0)+(c<<2)>>2]=b;}}else{a=k[p>>2]|0;k[a>>2]=k[b>>2];k[b>>2]=a;b=a;}k[h>>2]=(k[h>>2]|0)+1;}r=q;return b+12|0;}function DI(a){a=a|0;a=k[a+4>>2]|0;if(a|0)SN(a);return;}function EI(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function FI(a,b){a=a|0;b=b|0;var c=0,d=0;if((b|0)!=1){if(b+-1&b)b=KN(b)|0;}else b=2;d=k[a+4>>2]|0;if(b>>>0<=d>>>0){if(b>>>0<d>>>0){c=~~+_(+(+((k[a+12>>2]|0)>>>0)/+o[a+16>>2]))>>>0;if(d>>>0>2&(d+-1&d|0)==0)c=1<<32-(ca(c+-1|0)|0);else c=KN(c)|0;b=b>>>0<c>>>0?c:b;if(b>>>0<d>>>0)GI(a,b);}}else GI(a,b);return;}function GI(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0;d=a+4|0;a:do if(b){if(b>>>0>1073741823){a=vc(4)|0;hP(a);Pd(a|0,2968,374);}l=UN(b<<2)|0;c=k[a>>2]|0;k[a>>2]=l;if(c|0)YN(c);k[d>>2]=b;c=0;while(1){if((c|0)==(b|0))break;k[(k[a>>2]|0)+(c<<2)>>2]=0;c=c+1|0;}e=a+8|0;c=k[e>>2]|0;if(c|0){d=k[c+4>>2]|0;j=b+-1|0;l=(j&b|0)==0;if(l)d=d&j;else d=(d>>>0)%(b>>>0)|0;k[(k[a>>2]|0)+(d<<2)>>2]=e;while(1){i=c;b:while(1)while(1){c=k[i>>2]|0;if(!c)break a;e=k[c+4>>2]|0;if(l)h=e&j;else h=(e>>>0)%(b>>>0)|0;if((h|0)==(d|0)){i=c;continue b;}e=(k[a>>2]|0)+(h<<2)|0;if(!(k[e>>2]|0))break b;f=c+8|0;e=c;while(1){g=k[e>>2]|0;if(!g)break;if((k[f>>2]|0)==(k[g+8>>2]|0))e=g;else break;}k[i>>2]=g;k[e>>2]=k[k[(k[a>>2]|0)+(h<<2)>>2]>>2];k[k[(k[a>>2]|0)+(h<<2)>>2]>>2]=c;}k[e>>2]=i;d=h;}}}else{c=k[a>>2]|0;k[a>>2]=0;if(c|0)YN(c);k[d>>2]=0;}while(0);return;}function HI(a){a=a|0;NN(a);YN(a);return;}function II(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function JI(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==29443?a+12|0:0)|0;}function KI(a){a=a|0;YN(a);return;}function LI(a){a=a|0;k[a>>2]=7720;if(i[a+12>>0]|0)QI(a);mh(a+16|0);return;}function MI(a){a=a|0;LI(a);YN(a);return;}function NI(a){a=a|0;if(!(i[a+12>>0]|0))RI(a);return;}function OI(a){a=a|0;if(i[a+12>>0]|0)QI(a);RI(a);return;}function PI(a){a=a|0;if(i[a+12>>0]|0)QI(a);return;}function QI(a){a=a|0;Wa(21,k[a+4>>2]|0)|0;i[a+12>>0]=0;return;}function RI(a){a=a|0;Uc(22,k[a+4>>2]|0,k[a+8>>2]|0)|0;i[a+12>>0]=1;return;}function SI(a){a=a|0;var b=0;TI(a,k[a+8>>2]|0);b=k[a>>2]|0;k[a>>2]=0;if(b|0)YN(b);return;}function TI(a,b){a=a|0;b=b|0;while(1){if(!b)break;a=k[b>>2]|0;DI(b+12|0);YN(b);b=a;}return;}function UI(a){a=a|0;var b=0;k[a>>2]=7672;b=a+4|0;k[b>>2]=0;k[b+4>>2]=0;k[b+8>>2]=0;k[b+12>>2]=0;k[b+16>>2]=0;o[a+24>>2]=1.0;return;}function VI(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;d=r;r=r+16|0;e=d;c=d+8|0;k[e>>2]=b;a=WI(a+8|0,e)|0;if(a|0){XI(c,a+12|0);a=k[c>>2]|0;if(a|0)YI(a);EI(c);}r=d;return;}function WI(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;d=k[b>>2]|0;e=k[a+4>>2]|0;a:do if(e){f=e+-1|0;g=(f&e|0)==0;if(g)c=f&d;else c=(d>>>0)%(e>>>0)|0;b=k[(k[a>>2]|0)+(c<<2)>>2]|0;if(b)do{b=k[b>>2]|0;if(!b){b=0;break a;}a=k[b+4>>2]|0;if(g)a=a&f;else a=(a>>>0)%(e>>>0)|0;if((a|0)!=(c|0)){b=0;break a;}}while((k[b+8>>2]|0)!=(d|0));else b=0;}else b=0;while(0);return b|0;}function XI(a,b){a=a|0;b=b|0;var c=0,d=0;k[a>>2]=0;c=a+4|0;k[c>>2]=0;d=k[b+4>>2]|0;if(d){d=TN(d)|0;k[c>>2]=d;if(d|0)k[a>>2]=k[b>>2];}else k[c>>2]=0;return;}function YI(a){a=a|0;if(k[a+32>>2]|0)hh(a+16|0);return;}function ZI(a){a=a|0;k[a>>2]=7748;Wa(23,k[a+72>>2]|0)|0;eJ(a+56|0);fJ(a+16|0);gJ(a+4|0);return;}function _I(a){a=a|0;ZI(a);YN(a);return;}function $I(a){a=a|0;return a+4|0;}function aJ(a){a=a|0;return a+16|0;}function bJ(a){a=a|0;return a+28|0;}function cJ(a){a=a|0;return a+48|0;}function dJ(a){a=a|0;return+ +o[a+68>>2];}function eJ(a){a=a|0;var b=0,c=0,d=0;c=k[a>>2]|0;if(c|0){a=a+4|0;b=k[a>>2]|0;while(1){if((b|0)==(c|0))break;d=b+-8|0;k[a>>2]=d;b=d;}YN(c);}return;}function fJ(a){a=a|0;var b=0,c=0,d=0;c=k[a>>2]|0;if(c|0){a=a+4|0;b=k[a>>2]|0;while(1){if((b|0)==(c|0))break;d=b+-16|0;k[a>>2]=d;b=d;}YN(c);}return;}function gJ(a){a=a|0;var b=0,c=0,d=0;b=k[a>>2]|0;if(b|0){c=a+4|0;while(1){d=k[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;k[c>>2]=d;iJ(d);}YN(k[a>>2]|0);}return;}function hJ(a){a=a|0;eJ(a+8|0);return;}function iJ(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function jJ(a){a=a|0;var b=0,c=0,d=0,e=0;k[a>>2]=7748;b=a+4|0;k[a+56>>2]=0;k[a+60>>2]=0;k[a+64>>2]=0;c=a+68|0;d=b;e=d+40|0;do{k[d>>2]=0;d=d+4|0;}while((d|0)<(e|0));i[b+40>>0]=0;o[c>>2]=1.0;e=Kb(24)|0;k[a+72>>2]=e;return;}function kJ(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0;e=b+8+3|0;g=i[e>>0]|0;f=b+4|0;lJ(a,g<<24>>24<0?k[f>>2]|0:g&255);e=i[e>>0]|0;g=e<<24>>24<0;if(ld(25,k[a+72>>2]|0,(g?k[b>>2]|0:b)|0,(g?k[f>>2]|0:e&255)|0,c|0,d&65535|0,k[a+56>>2]|0)|0){mJ(a);nJ(a);}return;}function lJ(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=k[a+4>>2]|0;d=a+8|0;while(1){e=k[d>>2]|0;if((e|0)==(c|0))break;e=e+-8|0;k[d>>2]=e;iJ(e);}e=k[a+16>>2]|0;c=a+20|0;d=k[c>>2]|0;while(1){if((d|0)==(e|0))break;f=d+-16|0;k[c>>2]=f;d=f;}f=a+28|0;k[f>>2]=0;k[f+4>>2]=0;k[f+8>>2]=0;k[f+12>>2]=0;i[a+44>>0]=0;k[a+48>>2]=0;k[a+52>>2]=0;FJ(a+56|0,b+1|0);return;}function mJ(a){a=a|0;var b=0,c=0.0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0,n=0,p=0,q=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;x=r;r=r+32|0;f=x+24|0;g=x+20|0;p=x+16|0;q=x+12|0;s=x+8|0;t=x+4|0;u=x;v=a+72|0;w=Wa(26,k[v>>2]|0)|0;h=a+4|0;i=a+8|0;j=a+12|0;l=a+20|0;m=a+24|0;n=a+16|0;e=0;while(1){if((e|0)>=(w|0))break;c=+xc(27,k[v>>2]|0,e|0);o[p>>2]=c;c=+xc(28,k[v>>2]|0,e|0);o[q>>2]=c;c=+xc(29,k[v>>2]|0,e|0);o[s>>2]=c;c=+xc(30,k[v>>2]|0,e|0);o[t>>2]=c;b=VN(28,39939)|0;if(!b)b=0;else{A=k[v>>2]|0;z=k[p>>2]|0;y=k[q>>2]|0;d=k[s>>2]|0;k[b>>2]=7784;k[b+4>>2]=A;k[b+8>>2]=e;k[b+12>>2]=z;k[b+16>>2]=y;k[b+20>>2]=d;o[b+24>>2]=c;}k[u>>2]=b;d=k[i>>2]|0;if(d>>>0<(k[j>>2]|0)>>>0){k[g>>2]=0;k[f>>2]=k[g>>2];oJ(d,b,f);k[i>>2]=(k[i>>2]|0)+8;}else pJ(h,u);b=k[l>>2]|0;if(b>>>0<(k[m>>2]|0)>>>0){y=k[q>>2]|0;z=k[s>>2]|0;A=k[t>>2]|0;k[b>>2]=k[p>>2];k[b+4>>2]=y;k[b+8>>2]=z;k[b+12>>2]=A;k[l>>2]=b+16;}else qJ(n,p,q,s,t);rJ(a,+o[p>>2],+o[q>>2],+o[s>>2],+o[t>>2]);e=e+1|0;}r=x;return;}function nJ(a){a=a|0;var b=0,c=0;b=a+72|0;c=Wa(31,k[b>>2]|0)|0;k[a+48>>2]=c;b=Wa(32,k[b>>2]|0)|0;k[a+52>>2]=b;return;}function oJ(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=7804;k[c+12>>2]=b;k[a+4>>2]=c;return;}function pJ(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0;i=r;r=r+32|0;c=i+24|0;e=i+20|0;f=i;g=k[a+4>>2]|0;h=k[a>>2]|0;d=(g-h>>3)+1|0;if(d>>>0>536870911)MN(a);else{l=(k[a+8>>2]|0)-h|0;j=l>>2;vJ(f,l>>3>>>0<268435455?j>>>0<d>>>0?d:j:536870911,g-h>>3,a+8|0);h=f+8|0;d=k[h>>2]|0;g=k[b>>2]|0;k[e>>2]=0;k[c>>2]=k[e>>2];oJ(d,g,c);k[h>>2]=(k[h>>2]|0)+8;wJ(a,f);xJ(f);r=i;return;}}function qJ(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,l=0,m=0;j=r;r=r+32|0;g=j;h=k[a+4>>2]|0;i=k[a>>2]|0;f=(h-i>>4)+1|0;if(f>>>0>268435455)MN(a);else{m=(k[a+8>>2]|0)-i|0;l=m>>3;sJ(g,m>>4>>>0<134217727?l>>>0<f>>>0?f:l:268435455,h-i>>4,a+8|0);i=g+8|0;h=k[i>>2]|0;c=k[c>>2]|0;d=k[d>>2]|0;e=k[e>>2]|0;k[h>>2]=k[b>>2];k[h+4>>2]=c;k[h+8>>2]=d;k[h+12>>2]=e;k[i>>2]=h+16;tJ(a,g);uJ(g);r=j;return;}}function rJ(a,b,c,d,e){a=a|0;b=+b;c=+c;d=+d;e=+e;var f=0,g=0,h=0,j=0,l=0,m=0,n=0,p=0,q=0,s=0,t=0;s=r;r=r+32|0;h=s+24|0;f=s+16|0;t=s+8|0;g=s;n=s+28|0;m=s+20|0;p=s+12|0;l=s+4|0;o[h>>2]=b;o[f>>2]=c;o[t>>2]=d;o[g>>2]=e;q=k[(d<b?t:h)>>2]|0;k[n>>2]=q;j=k[(e<c?g:f)>>2]|0;k[m>>2]=j;h=k[(b<d?t:h)>>2]|0;k[p>>2]=h;f=k[(c<e?g:f)>>2]|0;k[l>>2]=f;g=a+44|0;if(!(i[g>>0]|0)){k[a+28>>2]=q;k[a+32>>2]=j;k[a+36>>2]=h;k[a+40>>2]=f;i[g>>0]=1;}else{c=(k[u>>2]=f,+o[u>>2]);d=(k[u>>2]=h,+o[u>>2]);b=(k[u>>2]=j,+o[u>>2]);f=a+28|0;k[f>>2]=k[((k[u>>2]=q,+o[u>>2])<+o[f>>2]?n:f)>>2];t=a+32|0;k[t>>2]=k[(b<+o[t>>2]?m:t)>>2];t=a+36|0;k[t>>2]=k[(+o[t>>2]<d?p:t)>>2];t=a+40|0;k[t>>2]=k[(+o[t>>2]<c?l:t)>>2];}r=s;return;}function sJ(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;do if(b){if(b>>>0>268435455){c=vc(4)|0;hP(c);Pd(c|0,2968,374);}else{d=UN(b<<4)|0;break;}}else d=0;while(0);k[a>>2]=d;c=d+(c<<4)|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+(b<<4);return;}function tJ(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;d=k[a>>2]|0;g=a+4|0;f=b+4|0;e=(k[g>>2]|0)-d|0;c=(k[f>>2]|0)+(0-(e>>4)<<4)|0;k[f>>2]=c;if((e|0)>0){qP(c|0,d|0,e|0)|0;d=f;c=k[f>>2]|0;}else d=f;f=k[a>>2]|0;k[a>>2]=c;k[d>>2]=f;f=b+8|0;e=k[g>>2]|0;k[g>>2]=k[f>>2];k[f>>2]=e;f=a+8|0;g=b+12|0;a=k[f>>2]|0;k[f>>2]=k[g>>2];k[g>>2]=a;k[b>>2]=k[d>>2];return;}function uJ(a){a=a|0;var b=0,c=0,d=0,e=0;b=k[a+4>>2]|0;c=a+8|0;d=k[c>>2]|0;while(1){if((d|0)==(b|0))break;e=d+-16|0;k[c>>2]=e;d=e;}a=k[a>>2]|0;if(a|0)YN(a);return;}function vJ(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;do if(b){if(b>>>0>536870911){c=vc(4)|0;hP(c);Pd(c|0,2968,374);}else{d=UN(b<<3)|0;break;}}else d=0;while(0);k[a>>2]=d;c=d+(c<<3)|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+(b<<3);return;}function wJ(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;d=k[a>>2]|0;e=a+4|0;f=b+4|0;c=k[e>>2]|0;while(1){if((c|0)==(d|0))break;i=k[f>>2]|0;g=c+-8|0;k[i+-8>>2]=k[g>>2];h=c+-4|0;k[i+-4>>2]=k[h>>2];k[g>>2]=0;k[h>>2]=0;k[f>>2]=(k[f>>2]|0)+-8;c=g;}g=k[a>>2]|0;k[a>>2]=k[f>>2];k[f>>2]=g;g=b+8|0;i=k[e>>2]|0;k[e>>2]=k[g>>2];k[g>>2]=i;g=a+8|0;i=b+12|0;h=k[g>>2]|0;k[g>>2]=k[i>>2];k[i>>2]=h;k[b>>2]=k[f>>2];return;}function xJ(a){a=a|0;var b=0,c=0,d=0;b=k[a+4>>2]|0;c=a+8|0;while(1){d=k[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;k[c>>2]=d;iJ(d);}a=k[a>>2]|0;if(a|0)YN(a);return;}function yJ(a){a=a|0;NN(a);YN(a);return;}function zJ(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function AJ(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==30513?a+12|0:0)|0;}function BJ(a){a=a|0;YN(a);return;}function CJ(a){a=a|0;return;}function DJ(a){a=a|0;YN(a);return;}function EJ(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;if(!(Nd(33,k[b+4>>2]|0,k[b+8>>2]|0,(c|0)!=0|0)|0)){i[a>>0]=0;c=a+4|0;k[c>>2]=0;k[c+4>>2]=0;k[c+8>>2]=0;k[c+12>>2]=0;k[c+16>>2]=0;k[c+20>>2]=0;k[c+24>>2]=0;k[c+28>>2]=0;}else{i[a>>0]=1;e=k[b+16>>2]|0;d=k[b+20>>2]|0;c=k[b+24>>2]|0;k[a+4>>2]=k[b+12>>2];k[a+8>>2]=e;k[a+12>>2]=d;k[a+16>>2]=c;o[a+20>>2]=0.0;o[a+24>>2]=1.0;o[a+28>>2]=1.0;o[a+32>>2]=0.0;}return;}function FJ(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;f=a+4|0;c=k[f>>2]|0;e=k[a>>2]|0;d=c-e>>3;a:do if(d>>>0>=b>>>0){if(d>>>0>b>>>0){a=e+(b<<3)|0;while(1){if((c|0)==(a|0))break a;e=c+-8|0;k[f>>2]=e;c=e;}}}else GJ(a,b-d|0);while(0);return;}function GJ(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;h=r;r=r+32|0;e=h;f=k[a+8>>2]|0;c=a+4|0;g=k[c>>2]|0;do if(f-g>>3>>>0<b>>>0){c=k[a>>2]|0;d=(g-c>>3)+b|0;if(d>>>0>536870911)MN(a);else{i=f-c|0;f=i>>2;HJ(e,i>>3>>>0<268435455?f>>>0<d>>>0?d:f:536870911,g-c>>3,a+8|0);g=e+8|0;f=k[g>>2]|0;wP(f|0,0,b<<3|0)|0;k[g>>2]=f+(b<<3);IJ(a,e);JJ(e);break;}}else{wP(g|0,0,b<<3|0)|0;k[c>>2]=g+(b<<3);}while(0);r=h;return;}function HJ(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;do if(b){if(b>>>0>536870911){c=vc(4)|0;hP(c);Pd(c|0,2968,374);}else{d=UN(b<<3)|0;break;}}else d=0;while(0);k[a>>2]=d;c=d+(c<<3)|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+(b<<3);return;}function IJ(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;d=k[a>>2]|0;g=a+4|0;f=b+4|0;e=(k[g>>2]|0)-d|0;c=(k[f>>2]|0)+(0-(e>>3)<<3)|0;k[f>>2]=c;if((e|0)>0){qP(c|0,d|0,e|0)|0;d=f;c=k[f>>2]|0;}else d=f;f=k[a>>2]|0;k[a>>2]=c;k[d>>2]=f;f=b+8|0;e=k[g>>2]|0;k[g>>2]=k[f>>2];k[f>>2]=e;f=a+8|0;g=b+12|0;a=k[f>>2]|0;k[f>>2]=k[g>>2];k[g>>2]=a;k[b>>2]=k[d>>2];return;}function JJ(a){a=a|0;var b=0,c=0,d=0,e=0;b=k[a+4>>2]|0;c=a+8|0;d=k[c>>2]|0;while(1){if((d|0)==(b|0))break;e=d+-8|0;k[c>>2]=e;d=e;}a=k[a>>2]|0;if(a|0)YN(a);return;}function KJ(a){a=a|0;return;}function LJ(a){a=a|0;YN(a);return;}function MJ(a,b){a=a|0;b=b|0;var c=0,d=0;b=r;r=r+64|0;d=b+40|0;c=b;cb(d|0);Xc(d|0,c|0);k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;cO(a,c,lN(c)|0);r=b;return;}function NJ(a){a=a|0;var b=0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;b=0;while(1){if((b|0)==3)break;k[a+(b<<2)>>2]=0;b=b+1|0;}a=a+12|0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;k[a+12>>2]=0;k[a+16>>2]=0;k[a+20>>2]=0;return;}function OJ(a){a=a|0;PJ(a);QJ(a+28|0);RJ(a+20|0);CB(a+12|0);dO(a);return;}function PJ(a){a=a|0;var b=0;a=a+20|0;b=k[a>>2]|0;if(b|0){ir(be[k[(k[b>>2]|0)+12>>2]&255](b)|0);b=k[a>>2]|0;ir(be[k[(k[b>>2]|0)+40>>2]&255](b)|0);b=k[a>>2]|0;ir(be[k[(k[b>>2]|0)+104>>2]&255](b)|0);}return;}function QJ(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function RJ(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function SJ(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0;l=r;r=r+48|0;f=l+32|0;j=l+24|0;i=l+16|0;h=l+8|0;g=l;TJ(j,a);c=k[j>>2]|0;if(!c)b=0;else{UJ(i,a,b,c);if(!(k[i>>2]|0))b=0;else{VJ(h,a,b);if((k[h>>2]|0)!=0?(e=a+28|0,WJ(g,a),d=k[g>>2]|0,m=g+4|0,c=k[m>>2]|0,k[g>>2]=0,k[m>>2]=0,k[f>>2]=k[e>>2],k[e>>2]=d,d=a+32|0,k[f+4>>2]=k[d>>2],k[d>>2]=c,QJ(f),QJ(g),(k[e>>2]|0)!=0):0){XJ(g,a,b,j,i,h);m=k[g>>2]|0;b=m;if(!m)b=0;else{c=a+20|0;k[f>>2]=b;d=f+4|0;e=k[g+4>>2]|0;k[d>>2]=e;if(e|0)PN(e);k[f>>2]=k[c>>2];k[c>>2]=b;b=a+24|0;k[d>>2]=k[b>>2];k[b>>2]=e;RJ(f);YJ(a);ZJ(a);b=1;}RJ(g);}else b=0;Go(h);}Ho(i);}Fo(j);r=l;return b|0;}function TJ(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,s=0,t=0,u=0;t=r;r=r+96|0;j=t+72|0;l=t+64|0;d=t+60|0;m=t+48|0;n=t+36|0;o=t+24|0;p=t+12|0;q=t;c=VN(4,39939)|0;if(!c)c=0;else k[c>>2]=7832;k[d>>2]=0;k[j>>2]=k[d>>2];kM(l,c,j);c=k[l>>2]|0;if(!c){hO(b,32906)|0;k[a>>2]=0;k[a+4>>2]=0;}else{$d[k[(k[c>>2]|0)+8>>2]&255](j,c);e=k[l>>2]|0;$d[k[(k[e>>2]|0)+8>>2]&255](m,e);e=i[j+11>>0]|0;d=e<<24>>24<0;e=e&255;f=d?k[j+4>>2]|0:e;g=m+11|0;u=i[g>>0]|0;c=u<<24>>24<0;h=m+4|0;a:do if((f|0)==((c?k[h>>2]|0:u&255)|0)){c=c?k[m>>2]|0:m;b:do if(d){if(no(k[j>>2]|0,c,f)|0){s=27;break a;}}else{d=j;while(1){if(!e)break b;if((i[d>>0]|0)!=(i[c>>0]|0)){s=27;break a;}e=e+-1|0;c=c+1|0;d=d+1|0;}}while(0);lM(q,32944,j);d=mO(q,32990)|0;k[p>>2]=k[d>>2];k[p+4>>2]=k[d+4>>2];k[p+8>>2]=k[d+8>>2];c=0;while(1){if((c|0)==3)break;k[d+(c<<2)>>2]=0;c=c+1|0;}d=i[g>>0]|0;c=d<<24>>24<0;d=lO(p,c?k[m>>2]|0:m,c?k[h>>2]|0:d&255)|0;k[o>>2]=k[d>>2];k[o+4>>2]=k[d+4>>2];k[o+8>>2]=k[d+8>>2];c=0;while(1){if((c|0)==3)break;k[d+(c<<2)>>2]=0;c=c+1|0;}d=mO(o,32998)|0;k[n>>2]=k[d>>2];k[n+4>>2]=k[d+4>>2];k[n+8>>2]=k[d+8>>2];c=0;while(1){if((c|0)==3)break;k[d+(c<<2)>>2]=0;c=c+1|0;}c=b+11|0;if((i[c>>0]|0)<0){i[k[b>>2]>>0]=0;k[b+4>>2]=0;}else{i[b>>0]=0;i[c>>0]=0;}gO(b,0);k[b>>2]=k[n>>2];k[b+4>>2]=k[n+4>>2];k[b+8>>2]=k[n+8>>2];c=0;while(1){if((c|0)==3)break;k[n+(c<<2)>>2]=0;c=c+1|0;}dO(n);dO(o);dO(p);dO(q);k[a>>2]=0;k[a+4>>2]=0;}else s=27;while(0);if((s|0)==27){k[a>>2]=k[l>>2];u=l+4|0;k[a+4>>2]=k[u>>2];k[l>>2]=0;k[u>>2]=0;}dO(m);dO(j);}Fo(l);r=t;return;}function UJ(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0;h=r;r=r+48|0;g=h+24|0;e=h+12|0;f=h;eF(g,c+28|0,k[c+40>>2]|0,k[c+44>>2]|0,d);c=j[g>>1]|0;do if((c|1)<<16>>16==1){c=g+4|0;d=k[c>>2]|0;if(!d){hO(b,32877)|0;k[a>>2]=0;k[a+4>>2]=0;break;}k[a>>2]=d;d=k[g+8>>2]|0;k[a+4>>2]=d;if(d)PN(d);}else{qO(f,c&65535);d=oO(f,0,32844)|0;k[e>>2]=k[d>>2];k[e+4>>2]=k[d+4>>2];k[e+8>>2]=k[d+8>>2];c=0;while(1){if((c|0)==3)break;k[d+(c<<2)>>2]=0;c=c+1|0;}c=b+11|0;if((i[c>>0]|0)<0){i[k[b>>2]>>0]=0;k[b+4>>2]=0;}else{i[b>>0]=0;i[c>>0]=0;}gO(b,0);k[b>>2]=k[e>>2];k[b+4>>2]=k[e+4>>2];k[b+8>>2]=k[e+8>>2];c=0;while(1){if((c|0)==3)break;k[e+(c<<2)>>2]=0;c=c+1|0;}dO(e);dO(f);k[a>>2]=0;k[a+4>>2]=0;c=g+4|0;}while(0);Ho(c);r=h;return;}function VJ(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,l=0,m=0,n=0,p=0,q=0,s=0,t=0;t=r;r=r+80|0;p=t+60|0;q=t+48|0;s=t+32|0;g=t+56|0;h=t+40|0;m=t+16|0;n=t;l=b+12|0;d=VN(56,39939)|0;if(!d)d=0;else{e=d;f=e+56|0;do{k[e>>2]=0;e=e+4|0;}while((e|0)<(f|0));k[d>>2]=8100;k[d+24>>2]=0;k[d+48>>2]=0;}k[s>>2]=0;k[p>>2]=k[s>>2];SK(q,d,p);d=k[q>>2]|0;k[q>>2]=k[l>>2];k[l>>2]=d;d=q+4|0;f=b+16|0;e=k[d>>2]|0;k[d>>2]=k[f>>2];k[f>>2]=e;CB(q);if(!(k[l>>2]|0)){hO(b,32148)|0;k[a>>2]=0;k[a+4>>2]=0;}else{d=VN(24,39939)|0;if(!d)d=0;else{k[d>>2]=7472;f=d+4|0;k[f>>2]=0;k[f+4>>2]=0;k[f+8>>2]=0;k[f+12>>2]=0;o[d+20>>2]=1.0;}k[g>>2]=0;k[p>>2]=k[g>>2];TK(q,d,p);if(!(k[q>>2]|0)){hO(b,32193)|0;k[a>>2]=0;k[a+4>>2]=0;}else{d=VN(4,39939)|0;if(!d)d=0;else k[d>>2]=7612;k[h>>2]=0;k[p>>2]=k[h>>2];UK(s,d,p);if(!(k[s>>2]|0)){hO(b,32232)|0;k[a>>2]=0;k[a+4>>2]=0;}else{k[m>>2]=k[c+12>>2];k[m+4>>2]=k[c+16>>2];k[m+8>>2]=0;k[m+12>>2]=0;g=i[c+25>>0]|0;h=i[c+26>>0]|0;d=i[c+27>>0]|0;i[n>>0]=i[c+24>>0]|0;i[n+1>>0]=g;i[n+2>>0]=h;i[n+3>>0]=d;oE(p,l,q,m,n,s);d=j[p>>1]|0;do if((d|1)<<16>>16==1){d=p+4|0;e=k[d>>2]|0;if(!e){hO(b,32306)|0;k[a>>2]=0;k[a+4>>2]=0;break;}k[a>>2]=e;e=k[p+8>>2]|0;k[a+4>>2]=e;if(e)PN(e);}else{qO(n,d&65535);e=oO(n,0,32266)|0;k[m>>2]=k[e>>2];k[m+4>>2]=k[e+4>>2];k[m+8>>2]=k[e+8>>2];d=0;while(1){if((d|0)==3)break;k[e+(d<<2)>>2]=0;d=d+1|0;}d=b+11|0;if((i[d>>0]|0)<0){i[k[b>>2]>>0]=0;k[b+4>>2]=0;}else{i[b>>0]=0;i[d>>0]=0;}gO(b,0);k[b>>2]=k[m>>2];k[b+4>>2]=k[m+4>>2];k[b+8>>2]=k[m+8>>2];d=0;while(1){if((d|0)==3)break;k[m+(d<<2)>>2]=0;d=d+1|0;}dO(m);dO(n);k[a>>2]=0;k[a+4>>2]=0;d=p+4|0;}while(0);Go(d);}Yy(s);}pw(q);}r=t;return;}function WJ(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;g=r;r=r+32|0;d=g+16|0;f=g+8|0;e=g;c=VN(28,39939)|0;if(!c)c=0;else UI(c);k[e>>2]=0;k[d>>2]=k[e>>2];NK(f,c,d);c=k[f>>2]|0;if(!c){hO(b,31964)|0;k[a>>2]=0;k[a+4>>2]=0;}else{k[a>>2]=c;b=f+4|0;k[a+4>>2]=k[b>>2];k[f>>2]=0;k[b>>2]=0;}QJ(f);r=g;return;}function XJ(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,l=0,n=0,o=0,p=0,q=0,s=0,t=0,u=0;p=r;r=r+48|0;o=p+32|0;l=p+20|0;n=p+8|0;h=p;k[l>>2]=k[b+28>>2];g=k[b+32>>2]|0;k[l+4>>2]=g;if(g|0)PN(g);t=k[c+16>>2]|0;u=k[c+20>>2]|0;k[n>>2]=k[c+12>>2];k[n+4>>2]=t;k[n+8>>2]=u;u=wo(+(m[c+4>>1]|0))|0;t=i[c>>0]|0;s=i[c+1>>0]|0;q=i[c+2>>0]|0;g=i[c+6>>0]|0;k[h>>2]=u;i[h+4>>0]=t;i[h+5>>0]=s;i[h+6>>0]=q;i[h+7>>0]=g;ps(o,f,e,d,l,n,h,k[c+8>>2]|0,k[c+48>>2]|0);Eo(l);g=j[o>>1]|0;do if((g|1)<<16>>16==1){g=o+4|0;c=k[g>>2]|0;if(!c){hO(b,31934)|0;k[a>>2]=0;k[a+4>>2]=0;break;}k[a>>2]=c;c=k[o+8>>2]|0;k[a+4>>2]=c;if(c)PN(c);}else{qO(n,g&65535);c=oO(n,0,31900)|0;k[l>>2]=k[c>>2];k[l+4>>2]=k[c+4>>2];k[l+8>>2]=k[c+8>>2];g=0;while(1){if((g|0)==3)break;k[c+(g<<2)>>2]=0;g=g+1|0;}g=b+11|0;if((i[g>>0]|0)<0){i[k[b>>2]>>0]=0;k[b+4>>2]=0;}else{i[b>>0]=0;i[g>>0]=0;}gO(b,0);k[b>>2]=k[l>>2];k[b+4>>2]=k[l+4>>2];k[b+8>>2]=k[l+8>>2];g=0;while(1){if((g|0)==3)break;k[l+(g<<2)>>2]=0;g=g+1|0;}dO(l);dO(n);k[a>>2]=0;k[a+4>>2]=0;g=o+4|0;}while(0);RJ(g);r=p;return;}function YJ(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0;i=r;r=r+128|0;b=i+96|0;c=i+72|0;d=i+48|0;e=i+24|0;f=i;g=a+20|0;h=k[g>>2]|0;if(h|0){h=be[k[(k[h>>2]|0)+12>>2]&255](h)|0;k[b>>2]=7852;k[b+4>>2]=a;k[b+16>>2]=b;tr(h,b)|0;mh(b);h=k[g>>2]|0;h=be[k[(k[h>>2]|0)+40>>2]&255](h)|0;k[c>>2]=7896;k[c+4>>2]=a;k[c+16>>2]=c;tr(h,c)|0;mh(c);h=k[g>>2]|0;h=be[k[(k[h>>2]|0)+104>>2]&255](h)|0;k[d>>2]=7940;k[d+4>>2]=a;k[d+16>>2]=d;tr(h,d)|0;mh(d);h=k[g>>2]|0;h=be[k[(k[h>>2]|0)+80>>2]&255](h)|0;k[e>>2]=7984;k[e+4>>2]=a;k[e+16>>2]=e;tr(h,e)|0;mh(e);h=k[g>>2]|0;h=be[k[(k[h>>2]|0)+84>>2]&255](h)|0;k[f>>2]=8028;k[f+4>>2]=a;k[f+16>>2]=f;tr(h,f)|0;mh(f);}r=i;return;}function ZJ(a){a=a|0;var b=0,c=0;b=r;r=r+32|0;c=b;a=k[a+20>>2]|0;$d[k[(k[a>>2]|0)+36>>2]&255](c,a);ub(34,l[c>>0]|0|0,+ +o[c+4>>2],+ +o[c+8>>2],l[c+12>>0]|0|0,+ +o[c+16>>2],+ +o[c+20>>2])|0;r=b;return;}function _J(a){a=a|0;YN(a);return;}function $J(a){a=a|0;var b=0;b=UN(8)|0;k[b>>2]=8028;k[b+4>>2]=k[a+4>>2];return b|0;}function aK(a,b){a=a|0;b=b|0;k[b>>2]=8028;k[b+4>>2]=k[a+4>>2];return;}function bK(a){a=a|0;return;}function cK(a){a=a|0;YN(a);return;}function dK(a){a=a|0;Pb(35);return;}function eK(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==30987?a+4|0:0)|0;}function fK(a){a=a|0;return 2520;}function gK(a){a=a|0;YN(a);return;}function hK(a){a=a|0;var b=0;b=UN(8)|0;k[b>>2]=7984;k[b+4>>2]=k[a+4>>2];return b|0;}function iK(a,b){a=a|0;b=b|0;k[b>>2]=7984;k[b+4>>2]=k[a+4>>2];return;}function jK(a){a=a|0;return;}function kK(a){a=a|0;YN(a);return;}function lK(a){a=a|0;Pb(36);return;}function mK(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==31178?a+4|0:0)|0;}function nK(a){a=a|0;return 2544;}function oK(a){a=a|0;YN(a);return;}function pK(a){a=a|0;var b=0;b=UN(8)|0;k[b>>2]=7940;k[b+4>>2]=k[a+4>>2];return b|0;}function qK(a,b){a=a|0;b=b|0;k[b>>2]=7940;k[b+4>>2]=k[a+4>>2];return;}function rK(a){a=a|0;return;}function sK(a){a=a|0;YN(a);return;}function tK(a){a=a|0;wK(k[a+4>>2]|0);return;}function uK(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==31371?a+4|0:0)|0;}function vK(a){a=a|0;return 2568;}function wK(a){a=a|0;a=k[a+20>>2]|0;a=be[k[(k[a>>2]|0)+88>>2]&255](a)|0;Wc(37,l[a+4>>0]|0|0,l[a+5>>0]|0|0,l[a+6>>0]|0|0,k[a>>2]|0,l[a+7>>0]|0|0)|0;return;}function xK(a){a=a|0;YN(a);return;}function yK(a){a=a|0;var b=0;b=UN(8)|0;k[b>>2]=7896;k[b+4>>2]=k[a+4>>2];return b|0;}function zK(a,b){a=a|0;b=b|0;k[b>>2]=7896;k[b+4>>2]=k[a+4>>2];return;}function AK(a){a=a|0;return;}function BK(a){a=a|0;YN(a);return;}function CK(a){a=a|0;ZJ(k[a+4>>2]|0);return;}function DK(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==31588?a+4|0:0)|0;}function EK(a){a=a|0;return 2592;}function FK(a){a=a|0;YN(a);return;}function GK(a){a=a|0;var b=0;b=UN(8)|0;k[b>>2]=7852;k[b+4>>2]=k[a+4>>2];return b|0;}function HK(a,b){a=a|0;b=b|0;k[b>>2]=7852;k[b+4>>2]=k[a+4>>2];return;}function IK(a){a=a|0;return;}function JK(a){a=a|0;YN(a);return;}function KK(a){a=a|0;a=k[(k[a+4>>2]|0)+20>>2]|0;be[k[(k[a>>2]|0)+8>>2]&255](a)|0;return;}function LK(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==31744?a+4|0:0)|0;}function MK(a){a=a|0;return 2616;}function NK(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=8072;k[c+12>>2]=b;k[a+4>>2]=c;return;}function OK(a){a=a|0;NN(a);YN(a);return;}function PK(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function QK(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==32001?a+12|0:0)|0;}function RK(a){a=a|0;YN(a);return;}function SK(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=8400;k[c+12>>2]=b;k[a+4>>2]=c;return;}function TK(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=8372;k[c+12>>2]=b;k[a+4>>2]=c;return;}function UK(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=8344;k[c+12>>2]=b;k[a+4>>2]=c;return;}function VK(a){a=a|0;NN(a);YN(a);return;}function WK(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function XK(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==32346?a+12|0:0)|0;}function YK(a){a=a|0;YN(a);return;}function ZK(a){a=a|0;NN(a);YN(a);return;}function _K(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function $K(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==32503?a+12|0:0)|0;}function aL(a){a=a|0;YN(a);return;}function bL(a){a=a|0;NN(a);YN(a);return;}function cL(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function dL(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==32654?a+12|0:0)|0;}function eL(a){a=a|0;YN(a);return;}function fL(a){a=a|0;k[a>>2]=8100;OC(a+32|0);mh(a+8|0);return;}function gL(a){a=a|0;fL(a);YN(a);return;}function hL(a){a=a|0;return a+8|0;}function iL(a){a=a|0;return a+32|0;}function jL(a,b,c){a=a|0;b=b|0;c=c|0;$b(b|0,c|0);return;}function kL(a,b,c){a=a|0;b=b|0;c=c|0;Ya(b|0,c|0);return;}function lL(a,b,c){a=a|0;b=b|0;c=c|0;gc(b|0,c|0);return;}function mL(a,b,c){a=a|0;b=b|0;c=c|0;Hb(b|0,c|0);return;}function nL(a,b,c){a=a|0;b=b|0;c=c|0;Cc(b|0,c|0);return;}function oL(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;wc(b|0,c|0,d|0,e|0);return;}function pL(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;cd(b|0,c|0,d|0,e|0);return;}function qL(a,b){a=a|0;b=b|0;return rc(b|0)|0;}function rL(a,b){a=a|0;b=b|0;yd(b|0);return;}function sL(a,b,c,d,e){a=a|0;b=+b;c=+c;d=+d;e=+e;zc(+b,+c,+d,+e);return;}function tL(a,b){a=a|0;b=b|0;Zc(b|0);return;}function uL(a){a=a|0;return bc()|0;}function vL(a,b){a=a|0;b=b|0;return Ud(b|0)|0;}function wL(a,b,c){a=a|0;b=b|0;c=c|0;bd(b|0,c|0);return;}function xL(a,b,c){a=a|0;b=b|0;c=c|0;oc(b|0,c|0);return;}function yL(a,b){a=a|0;b=b|0;Ta(b|0);return;}function zL(a,b,c){a=a|0;b=b|0;c=c|0;qd(b|0,c|0);return;}function AL(a,b){a=a|0;b=b|0;id(b|0);return;}function BL(a,b,c){a=a|0;b=b|0;c=c|0;Nb(b|0,c|0);return;}function CL(a,b,c){a=a|0;b=b|0;c=c|0;hc(b|0,c|0);return;}function DL(a,b){a=a|0;b=b|0;sd(b|0);return;}function EL(a,b){a=a|0;b=b|0;ab(b|0);return;}function FL(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Ib(b|0,c|0,d|0,e|0);return;}function GL(a,b){a=a|0;b=b|0;Vb(b|0);return;}function HL(a,b){a=a|0;b=b|0;_c(b|0);return;}function IL(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;tb(b|0,c|0,d|0,e|0);return;}function JL(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;Ld(b|0,c|0,d|0,e|0,f|0);return;}function KL(a,b,c){a=a|0;b=b|0;c=c|0;rb(b|0,c|0);return;}function LL(a,b,c){a=a|0;b=b|0;c=c|0;jc(b|0,c|0);return;}function ML(a,b,c){a=a|0;b=b|0;c=c|0;ud(b|0,c|0);return;}function NL(a,b,c){a=a|0;b=b|0;c=c|0;Wb(b|0,c|0);return;}function OL(a,b,c){a=a|0;b=b|0;c=c|0;return $a(b|0,c|0)|0;}function PL(a){a=a|0;return Kc()|0;}function QL(a,b,c){a=a|0;b=b|0;c=c|0;Xb(b|0,c|0);return;}function RL(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Db(b|0,c|0,d|0,e|0);return;}function SL(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;jd(b|0,c|0,d|0);return;}function TL(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Za(b|0,c|0,d|0,e|0);return;}function UL(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Ed(b|0,c|0,d|0);return;}function VL(a,b,c){a=a|0;b=b|0;c=c|0;return xd(b|0,c|0)|0;}function WL(a,b){a=a|0;b=b|0;return Bc(b|0)|0;}function XL(a,b){a=a|0;b=b|0;td(b|0);return;}function YL(a,b,c){a=a|0;b=b|0;c=c|0;Dd(b|0,c|0);return;}function ZL(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;Ic(b|0,c|0,d|0,e|0,f|0,g|0,h|0);return;}function _L(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Bd(b|0,c|0,d|0,e|0);return;}function $L(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;sb(b|0,c|0,d|0,e|0);return;}function aM(a,b,c,d,e,f,g,h,i,j){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;ed(b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0,j|0);return;}function bM(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Td(b|0,c|0,d|0);return;}function cM(a,b,c,d,e,f,g,h,i,j){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;Vd(b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0,j|0);return;}function dM(a,b,c){a=a|0;b=b|0;c=+c;Dc(b|0,+c);return;}function eM(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Ra(b|0,c|0,d|0);return;}function fM(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;lb(b|0,c|0,d|0);return;}function gM(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Pa(b|0,c|0,d|0,e|0);return;}function hM(a,b){a=a|0;b=b|0;Ja(b|0);return;}function iM(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;Bb(b|0,c|0,d|0,e|0,f|0,g|0);return;}function jM(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Lb(b|0,c|0,d|0,e|0);return;}function kM(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=b;c=UN(16)|0;k[c+4>>2]=0;k[c+8>>2]=0;k[c>>2]=8428;k[c+12>>2]=b;k[a+4>>2]=c;return;}function lM(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;d=0;while(1){if((d|0)==3)break;k[a+(d<<2)>>2]=0;d=d+1|0;}f=lN(b)|0;e=c+11|0;d=i[e>>0]|0;d=d<<24>>24<0?k[c+4>>2]|0:d&255;pO(a,b,f,d+f|0);lO(a,(i[e>>0]|0)<0?k[c>>2]|0:c,d)|0;return;}function mM(a){a=a|0;NN(a);YN(a);return;}function nM(a){a=a|0;a=k[a+12>>2]|0;if(a|0)_d[k[(k[a>>2]|0)+4>>2]&511](a);return;}function oM(a,b){a=a|0;b=b|0;return((k[b+4>>2]|0)==33e3?a+12|0:0)|0;}function pM(a){a=a|0;YN(a);return;}function qM(a){a=a|0;var b=0,c=0,d=0;b=r;r=r+16|0;c=b+8|0;d=b;k[d>>2]=8;k[d+4>>2]=1;k[c>>2]=k[d>>2];k[c+4>>2]=k[d+4>>2];a=rM(a,c,33149)|0;r=b;return a|0;}function rM(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0;o=r;r=r+80|0;g=o+60|0;h=o+48|0;j=o+36|0;l=o+24|0;m=o+12|0;n=o;f=k[b>>2]|0;d=k[b+4>>2]|0;b=k[a+20>>2]|0;if(b){e=b+(d>>1)|0;if(!(d&1))b=f;else b=k[(k[e>>2]|0)+f>>2]|0;b=be[b&255](e)|0;if((b|1)<<16>>16==1)b=1;else{k[m>>2]=0;k[m+4>>2]=0;k[m+8>>2]=0;cO(m,33178,14);qO(n,b&65535);d=i[n+11>>0]|0;b=d<<24>>24<0;d=lO(m,b?k[n>>2]|0:n,b?k[n+4>>2]|0:d&255)|0;k[l>>2]=k[d>>2];k[l+4>>2]=k[d+4>>2];k[l+8>>2]=k[d+8>>2];b=0;while(1){if((b|0)==3)break;k[d+(b<<2)>>2]=0;b=b+1|0;}d=mO(l,33193)|0;k[j>>2]=k[d>>2];k[j+4>>2]=k[d+4>>2];k[j+8>>2]=k[d+8>>2];b=0;while(1){if((b|0)==3)break;k[d+(b<<2)>>2]=0;b=b+1|0;}d=mO(j,c|0?c:38898)|0;k[h>>2]=k[d>>2];k[h+4>>2]=k[d+4>>2];k[h+8>>2]=k[d+8>>2];b=0;while(1){if((b|0)==3)break;k[d+(b<<2)>>2]=0;b=b+1|0;}d=mO(h,32998)|0;k[g>>2]=k[d>>2];k[g+4>>2]=k[d+4>>2];k[g+8>>2]=k[d+8>>2];b=0;while(1){if((b|0)==3)break;k[d+(b<<2)>>2]=0;b=b+1|0;}b=a+11|0;if((i[b>>0]|0)<0){i[k[a>>2]>>0]=0;k[a+4>>2]=0;}else{i[a>>0]=0;i[b>>0]=0;}gO(a,0);k[a>>2]=k[g>>2];k[a+4>>2]=k[g+4>>2];k[a+8>>2]=k[g+8>>2];b=0;while(1){if((b|0)==3)break;k[g+(b<<2)>>2]=0;b=b+1|0;}dO(g);dO(h);dO(j);dO(l);dO(n);dO(m);b=0;}}else{hO(a,33156)|0;b=0;}r=o;return b|0;}function sM(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=r;r=r+32|0;e=c+16|0;d=c+8|0;f=c;k[d>>2]=b;k[f>>2]=112;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];b=tM(a,e,33233,d)|0;r=c;return b|0;}function tM(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0;p=r;r=r+80|0;h=p+60|0;j=p+48|0;l=p+36|0;m=p+24|0;n=p+12|0;o=p;g=k[b>>2]|0;e=k[b+4>>2]|0;b=k[a+20>>2]|0;if(b){f=b+(e>>1)|0;if(!(e&1))b=g;else b=k[(k[f>>2]|0)+g>>2]|0;b=ne[b&127](f,k[d>>2]|0)|0;if((b|1)<<16>>16==1)b=1;else{k[n>>2]=0;k[n+4>>2]=0;k[n+8>>2]=0;cO(n,33178,14);qO(o,b&65535);e=i[o+11>>0]|0;b=e<<24>>24<0;e=lO(n,b?k[o>>2]|0:o,b?k[o+4>>2]|0:e&255)|0;k[m>>2]=k[e>>2];k[m+4>>2]=k[e+4>>2];k[m+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=mO(m,33193)|0;k[l>>2]=k[e>>2];k[l+4>>2]=k[e+4>>2];k[l+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=mO(l,c|0?c:38898)|0;k[j>>2]=k[e>>2];k[j+4>>2]=k[e+4>>2];k[j+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=mO(j,32998)|0;k[h>>2]=k[e>>2];k[h+4>>2]=k[e+4>>2];k[h+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}b=a+11|0;if((i[b>>0]|0)<0){i[k[a>>2]>>0]=0;k[a+4>>2]=0;}else{i[a>>0]=0;i[b>>0]=0;}gO(a,0);k[a>>2]=k[h>>2];k[a+4>>2]=k[h+4>>2];k[a+8>>2]=k[h+8>>2];b=0;while(1){if((b|0)==3)break;k[h+(b<<2)>>2]=0;b=b+1|0;}dO(h);dO(j);dO(l);dO(m);dO(o);dO(n);b=0;}}else{hO(a,33156)|0;b=0;}r=p;return b|0;}function uM(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=r;r=r+32|0;e=c+8|0;d=c+16|0;f=c;j[d>>1]=b;k[f>>2]=96;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];b=vM(a,e,33242,d)|0;r=c;return b|0;}function vM(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0,n=0,o=0,p=0,q=0,s=0;s=r;r=r+80|0;j=s+64|0;h=s+60|0;l=s+48|0;n=s+36|0;o=s+24|0;p=s+12|0;q=s;g=k[b>>2]|0;e=k[b+4>>2]|0;b=k[a+20>>2]|0;if(b){f=b+(e>>1)|0;if(!(e&1))b=g;else b=k[(k[f>>2]|0)+g>>2]|0;d=wo(+(m[d>>1]|0))|0;k[h>>2]=d;k[j>>2]=k[h>>2];b=ne[b&127](f,j)|0;if((b|1)<<16>>16==1)b=1;else{k[p>>2]=0;k[p+4>>2]=0;k[p+8>>2]=0;cO(p,33178,14);qO(q,b&65535);e=i[q+11>>0]|0;b=e<<24>>24<0;e=lO(p,b?k[q>>2]|0:q,b?k[q+4>>2]|0:e&255)|0;k[o>>2]=k[e>>2];k[o+4>>2]=k[e+4>>2];k[o+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=mO(o,33193)|0;k[n>>2]=k[e>>2];k[n+4>>2]=k[e+4>>2];k[n+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=mO(n,c|0?c:38898)|0;k[l>>2]=k[e>>2];k[l+4>>2]=k[e+4>>2];k[l+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=mO(l,32998)|0;k[j>>2]=k[e>>2];k[j+4>>2]=k[e+4>>2];k[j+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}b=a+11|0;if((i[b>>0]|0)<0){i[k[a>>2]>>0]=0;k[a+4>>2]=0;}else{i[a>>0]=0;i[b>>0]=0;}gO(a,0);k[a>>2]=k[j>>2];k[a+4>>2]=k[j+4>>2];k[a+8>>2]=k[j+8>>2];b=0;while(1){if((b|0)==3)break;k[j+(b<<2)>>2]=0;b=b+1|0;}dO(j);dO(l);dO(n);dO(o);dO(q);dO(p);b=0;}}else{hO(a,33156)|0;b=0;}r=s;return b|0;}function wM(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;c=r;r=r+32|0;e=c+8|0;d=c+16|0;f=c;h=i[b+1>>0]|0;g=i[b+2>>0]|0;i[d>>0]=i[b>>0]|0;i[d+1>>0]=h;i[d+2>>0]=g;k[f>>2]=92;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];b=xM(a,e,33257,d)|0;r=c;return b|0;}function xM(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0;p=r;r=r+80|0;h=p+60|0;j=p+48|0;l=p+36|0;m=p+24|0;n=p+12|0;o=p;g=k[b>>2]|0;e=k[b+4>>2]|0;b=k[a+20>>2]|0;if(b){f=b+(e>>1)|0;if(!(e&1))b=g;else b=k[(k[f>>2]|0)+g>>2]|0;b=ne[b&127](f,d)|0;if((b|1)<<16>>16==1)b=1;else{k[n>>2]=0;k[n+4>>2]=0;k[n+8>>2]=0;cO(n,33178,14);qO(o,b&65535);e=i[o+11>>0]|0;b=e<<24>>24<0;e=lO(n,b?k[o>>2]|0:o,b?k[o+4>>2]|0:e&255)|0;k[m>>2]=k[e>>2];k[m+4>>2]=k[e+4>>2];k[m+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=mO(m,33193)|0;k[l>>2]=k[e>>2];k[l+4>>2]=k[e+4>>2];k[l+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=mO(l,c|0?c:38898)|0;k[j>>2]=k[e>>2];k[j+4>>2]=k[e+4>>2];k[j+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=mO(j,32998)|0;k[h>>2]=k[e>>2];k[h+4>>2]=k[e+4>>2];k[h+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}b=a+11|0;if((i[b>>0]|0)<0){i[k[a>>2]>>0]=0;k[a+4>>2]=0;}else{i[a>>0]=0;i[b>>0]=0;}gO(a,0);k[a>>2]=k[h>>2];k[a+4>>2]=k[h+4>>2];k[a+8>>2]=k[h+8>>2];b=0;while(1){if((b|0)==3)break;k[h+(b<<2)>>2]=0;b=b+1|0;}dO(h);dO(j);dO(l);dO(m);dO(o);dO(n);b=0;}}else{hO(a,33156)|0;b=0;}r=p;return b|0;}function yM(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;c=r;r=r+32|0;e=c+24|0;d=c+8|0;f=c;h=k[b+4>>2]|0;g=k[b+8>>2]|0;k[d>>2]=k[b>>2];k[d+4>>2]=h;k[d+8>>2]=g;k[f>>2]=16;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];b=zM(a,e,33273,d)|0;r=c;return b|0;}function zM(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0;p=r;r=r+80|0;h=p+60|0;j=p+48|0;l=p+36|0;m=p+24|0;n=p+12|0;o=p;g=k[b>>2]|0;e=k[b+4>>2]|0;b=k[a+20>>2]|0;if(b){f=b+(e>>1)|0;if(!(e&1))b=g;else b=k[(k[f>>2]|0)+g>>2]|0;b=ne[b&127](f,d)|0;if((b|1)<<16>>16==1)b=1;else{k[n>>2]=0;k[n+4>>2]=0;k[n+8>>2]=0;cO(n,33178,14);qO(o,b&65535);e=i[o+11>>0]|0;b=e<<24>>24<0;e=lO(n,b?k[o>>2]|0:o,b?k[o+4>>2]|0:e&255)|0;k[m>>2]=k[e>>2];k[m+4>>2]=k[e+4>>2];k[m+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=mO(m,33193)|0;k[l>>2]=k[e>>2];k[l+4>>2]=k[e+4>>2];k[l+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=mO(l,c|0?c:38898)|0;k[j>>2]=k[e>>2];k[j+4>>2]=k[e+4>>2];k[j+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=mO(j,32998)|0;k[h>>2]=k[e>>2];k[h+4>>2]=k[e+4>>2];k[h+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}b=a+11|0;if((i[b>>0]|0)<0){i[k[a>>2]>>0]=0;k[a+4>>2]=0;}else{i[a>>0]=0;i[b>>0]=0;}gO(a,0);k[a>>2]=k[h>>2];k[a+4>>2]=k[h+4>>2];k[a+8>>2]=k[h+8>>2];b=0;while(1){if((b|0)==3)break;k[h+(b<<2)>>2]=0;b=b+1|0;}dO(h);dO(j);dO(l);dO(m);dO(o);dO(n);b=0;}}else{hO(a,33156)|0;b=0;}r=p;return b|0;}function AM(a,b,c){a=a|0;b=b|0;c=+c;var d=0,e=0,f=0,g=0,h=0,i=0;d=r;r=r+32|0;g=d+24|0;e=d+8|0;f=d+16|0;h=d;o[e>>2]=c;i=k[b+4>>2]|0;k[f>>2]=k[b>>2];k[f+4>>2]=i;k[h>>2]=20;k[h+4>>2]=1;k[g>>2]=k[h>>2];k[g+4>>2]=k[h+4>>2];b=BM(a,g,33280,f,e)|0;r=d;return b|0;}function BM(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,l=0,m=0,n=0,p=0,q=0,s=0;s=r;r=r+80|0;l=s+60|0;m=s+48|0;n=s+36|0;p=s+24|0;q=s+12|0;j=s;h=k[b>>2]|0;f=k[b+4>>2]|0;b=k[a+20>>2]|0;if(b){g=b+(f>>1)|0;if(!(f&1))b=h;else b=k[(k[g>>2]|0)+h>>2]|0;b=he[b&7](g,d,+o[e>>2])|0;if((b|1)<<16>>16==1)b=1;else{k[q>>2]=0;k[q+4>>2]=0;k[q+8>>2]=0;cO(q,33178,14);qO(j,b&65535);f=i[j+11>>0]|0;b=f<<24>>24<0;f=lO(q,b?k[j>>2]|0:j,b?k[j+4>>2]|0:f&255)|0;k[p>>2]=k[f>>2];k[p+4>>2]=k[f+4>>2];k[p+8>>2]=k[f+8>>2];b=0;while(1){if((b|0)==3)break;k[f+(b<<2)>>2]=0;b=b+1|0;}f=mO(p,33193)|0;k[n>>2]=k[f>>2];k[n+4>>2]=k[f+4>>2];k[n+8>>2]=k[f+8>>2];b=0;while(1){if((b|0)==3)break;k[f+(b<<2)>>2]=0;b=b+1|0;}f=mO(n,c|0?c:38898)|0;k[m>>2]=k[f>>2];k[m+4>>2]=k[f+4>>2];k[m+8>>2]=k[f+8>>2];b=0;while(1){if((b|0)==3)break;k[f+(b<<2)>>2]=0;b=b+1|0;}f=mO(m,32998)|0;k[l>>2]=k[f>>2];k[l+4>>2]=k[f+4>>2];k[l+8>>2]=k[f+8>>2];b=0;while(1){if((b|0)==3)break;k[f+(b<<2)>>2]=0;b=b+1|0;}b=a+11|0;if((i[b>>0]|0)<0){i[k[a>>2]>>0]=0;k[a+4>>2]=0;}else{i[a>>0]=0;i[b>>0]=0;}gO(a,0);k[a>>2]=k[l>>2];k[a+4>>2]=k[l+4>>2];k[a+8>>2]=k[l+8>>2];b=0;while(1){if((b|0)==3)break;k[l+(b<<2)>>2]=0;b=b+1|0;}dO(l);dO(m);dO(n);dO(p);dO(j);dO(q);b=0;}}else{hO(a,33156)|0;b=0;}r=s;return b|0;}function CM(a,b){a=a|0;b=+b;var c=0,d=0,e=0,f=0;c=r;r=r+32|0;e=c+16|0;d=c+8|0;f=c;o[d>>2]=b;k[f>>2]=44;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];a=DM(a,e,33288,d)|0;r=c;return a|0;}function DM(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,p=0,q=0;q=r;r=r+80|0;h=q+60|0;j=q+48|0;l=q+36|0;m=q+24|0;n=q+12|0;p=q;g=k[b>>2]|0;e=k[b+4>>2]|0;b=k[a+20>>2]|0;if(b){f=b+(e>>1)|0;if(!(e&1))b=g;else b=k[(k[f>>2]|0)+g>>2]|0;b=ke[b&7](f,+o[d>>2])|0;if((b|1)<<16>>16==1)b=1;else{k[n>>2]=0;k[n+4>>2]=0;k[n+8>>2]=0;cO(n,33178,14);qO(p,b&65535);e=i[p+11>>0]|0;b=e<<24>>24<0;e=lO(n,b?k[p>>2]|0:p,b?k[p+4>>2]|0:e&255)|0;k[m>>2]=k[e>>2];k[m+4>>2]=k[e+4>>2];k[m+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=mO(m,33193)|0;k[l>>2]=k[e>>2];k[l+4>>2]=k[e+4>>2];k[l+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=mO(l,c|0?c:38898)|0;k[j>>2]=k[e>>2];k[j+4>>2]=k[e+4>>2];k[j+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=mO(j,32998)|0;k[h>>2]=k[e>>2];k[h+4>>2]=k[e+4>>2];k[h+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}b=a+11|0;if((i[b>>0]|0)<0){i[k[a>>2]>>0]=0;k[a+4>>2]=0;}else{i[a>>0]=0;i[b>>0]=0;}gO(a,0);k[a>>2]=k[h>>2];k[a+4>>2]=k[h+4>>2];k[a+8>>2]=k[h+8>>2];b=0;while(1){if((b|0)==3)break;k[h+(b<<2)>>2]=0;b=b+1|0;}dO(h);dO(j);dO(l);dO(m);dO(p);dO(n);b=0;}}else{hO(a,33156)|0;b=0;}r=q;return b|0;}function EM(a,b){a=a|0;b=+b;var c=0,d=0,e=0,f=0;c=r;r=r+32|0;e=c+16|0;d=c+8|0;f=c;o[d>>2]=b;k[f>>2]=48;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];a=DM(a,e,33303,d)|0;r=c;return a|0;}function FM(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;c=r;r=r+32|0;e=c+16|0;d=c+8|0;f=c;g=k[b+4>>2]|0;k[d>>2]=k[b>>2];k[d+4>>2]=g;k[f>>2]=52;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];b=GM(a,e,33318,d)|0;r=c;return b|0;}function GM(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0;p=r;r=r+80|0;h=p+60|0;j=p+48|0;l=p+36|0;m=p+24|0;n=p+12|0;o=p;g=k[b>>2]|0;e=k[b+4>>2]|0;b=k[a+20>>2]|0;if(b){f=b+(e>>1)|0;if(!(e&1))b=g;else b=k[(k[f>>2]|0)+g>>2]|0;b=ne[b&127](f,d)|0;if((b|1)<<16>>16==1)b=1;else{k[n>>2]=0;k[n+4>>2]=0;k[n+8>>2]=0;cO(n,33178,14);qO(o,b&65535);e=i[o+11>>0]|0;b=e<<24>>24<0;e=lO(n,b?k[o>>2]|0:o,b?k[o+4>>2]|0:e&255)|0;k[m>>2]=k[e>>2];k[m+4>>2]=k[e+4>>2];k[m+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=mO(m,33193)|0;k[l>>2]=k[e>>2];k[l+4>>2]=k[e+4>>2];k[l+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=mO(l,c|0?c:38898)|0;k[j>>2]=k[e>>2];k[j+4>>2]=k[e+4>>2];k[j+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=mO(j,32998)|0;k[h>>2]=k[e>>2];k[h+4>>2]=k[e+4>>2];k[h+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}b=a+11|0;if((i[b>>0]|0)<0){i[k[a>>2]>>0]=0;k[a+4>>2]=0;}else{i[a>>0]=0;i[b>>0]=0;}gO(a,0);k[a>>2]=k[h>>2];k[a+4>>2]=k[h+4>>2];k[a+8>>2]=k[h+8>>2];b=0;while(1){if((b|0)==3)break;k[h+(b<<2)>>2]=0;b=b+1|0;}dO(h);dO(j);dO(l);dO(m);dO(o);dO(n);b=0;}}else{hO(a,33156)|0;b=0;}r=p;return b|0;}function HM(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;c=r;r=r+32|0;e=c+16|0;d=c+8|0;f=c;g=k[b+4>>2]|0;k[d>>2]=k[b>>2];k[d+4>>2]=g;k[f>>2]=56;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];b=GM(a,e,33328,d)|0;r=c;return b|0;}function IM(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;c=r;r=r+32|0;e=c+16|0;d=c+8|0;f=c;g=k[b+4>>2]|0;k[d>>2]=k[b>>2];k[d+4>>2]=g;k[f>>2]=60;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];b=GM(a,e,33339,d)|0;r=c;return b|0;}function JM(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;c=r;r=r+32|0;e=c+16|0;d=c+8|0;f=c;g=k[b+4>>2]|0;k[d>>2]=k[b>>2];k[d+4>>2]=g;k[f>>2]=64;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];b=GM(a,e,33349,d)|0;r=c;return b|0;}function KM(a){a=a|0;var b=0,c=0,d=0;b=r;r=r+16|0;c=b+8|0;d=b;k[d>>2]=68;k[d+4>>2]=1;k[c>>2]=k[d>>2];k[c+4>>2]=k[d+4>>2];a=rM(a,c,33358)|0;r=b;return a|0;}function LM(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=r;r=r+32|0;e=c+16|0;d=c+8|0;f=c;k[d>>2]=b;k[f>>2]=72;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];b=MM(a,e,33368,d)|0;r=c;return b|0;}function MM(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0;p=r;r=r+80|0;h=p+60|0;j=p+48|0;l=p+36|0;m=p+24|0;n=p+12|0;o=p;g=k[b>>2]|0;e=k[b+4>>2]|0;b=k[a+20>>2]|0;if(b){f=b+(e>>1)|0;if(!(e&1))b=g;else b=k[(k[f>>2]|0)+g>>2]|0;b=ne[b&127](f,k[d>>2]|0)|0;if((b|1)<<16>>16==1)b=1;else{k[n>>2]=0;k[n+4>>2]=0;k[n+8>>2]=0;cO(n,33178,14);qO(o,b&65535);e=i[o+11>>0]|0;b=e<<24>>24<0;e=lO(n,b?k[o>>2]|0:o,b?k[o+4>>2]|0:e&255)|0;k[m>>2]=k[e>>2];k[m+4>>2]=k[e+4>>2];k[m+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=mO(m,33193)|0;k[l>>2]=k[e>>2];k[l+4>>2]=k[e+4>>2];k[l+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=mO(l,c|0?c:38898)|0;k[j>>2]=k[e>>2];k[j+4>>2]=k[e+4>>2];k[j+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=mO(j,32998)|0;k[h>>2]=k[e>>2];k[h+4>>2]=k[e+4>>2];k[h+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}b=a+11|0;if((i[b>>0]|0)<0){i[k[a>>2]>>0]=0;k[a+4>>2]=0;}else{i[a>>0]=0;i[b>>0]=0;}gO(a,0);k[a>>2]=k[h>>2];k[a+4>>2]=k[h+4>>2];k[a+8>>2]=k[h+8>>2];b=0;while(1){if((b|0)==3)break;k[h+(b<<2)>>2]=0;b=b+1|0;}dO(h);dO(j);dO(l);dO(m);dO(o);dO(n);b=0;}}else{hO(a,33156)|0;b=0;}r=p;return b|0;}function NM(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=r;r=r+32|0;e=c+16|0;d=c+8|0;f=c;k[d>>2]=b;k[f>>2]=76;k[f+4>>2]=1;k[e>>2]=k[f>>2];k[e+4>>2]=k[f+4>>2];b=OM(a,e,33382,d)|0;r=c;return b|0;}function OM(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0;p=r;r=r+80|0;h=p+60|0;j=p+48|0;l=p+36|0;m=p+24|0;n=p+12|0;o=p;g=k[b>>2]|0;e=k[b+4>>2]|0;b=k[a+20>>2]|0;if(b){f=b+(e>>1)|0;if(!(e&1))b=g;else b=k[(k[f>>2]|0)+g>>2]|0;b=ne[b&127](f,k[d>>2]|0)|0;if((b|1)<<16>>16==1)b=1;else{k[n>>2]=0;k[n+4>>2]=0;k[n+8>>2]=0;cO(n,33178,14);qO(o,b&65535);e=i[o+11>>0]|0;b=e<<24>>24<0;e=lO(n,b?k[o>>2]|0:o,b?k[o+4>>2]|0:e&255)|0;k[m>>2]=k[e>>2];k[m+4>>2]=k[e+4>>2];k[m+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=mO(m,33193)|0;k[l>>2]=k[e>>2];k[l+4>>2]=k[e+4>>2];k[l+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=mO(l,c|0?c:38898)|0;k[j>>2]=k[e>>2];k[j+4>>2]=k[e+4>>2];k[j+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}e=mO(j,32998)|0;k[h>>2]=k[e>>2];k[h+4>>2]=k[e+4>>2];k[h+8>>2]=k[e+8>>2];b=0;while(1){if((b|0)==3)break;k[e+(b<<2)>>2]=0;b=b+1|0;}b=a+11|0;if((i[b>>0]|0)<0){i[k[a>>2]>>0]=0;k[a+4>>2]=0;}else{i[a>>0]=0;i[b>>0]=0;}gO(a,0);k[a>>2]=k[h>>2];k[a+4>>2]=k[h+4>>2];k[a+8>>2]=k[h+8>>2];b=0;while(1){if((b|0)==3)break;k[h+(b<<2)>>2]=0;b=b+1|0;}dO(h);dO(j);dO(l);dO(m);dO(o);dO(n);b=0;}}else{hO(a,33156)|0;b=0;}r=p;return b|0;}function PM(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0;g=r;r=r+48|0;f=g+24|0;d=g+12|0;e=g;b=a+20|0;if(!(k[b>>2]|0)){hO(a,33156)|0;b=0;}else{DH(f);b=k[b>>2]|0;b=ne[k[(k[b>>2]|0)+132>>2]&127](b,f)|0;if((b|1)<<16>>16==1)b=1;else{qO(e,b&65535);c=oO(e,0,33401)|0;k[d>>2]=k[c>>2];k[d+4>>2]=k[c+4>>2];k[d+8>>2]=k[c+8>>2];b=0;while(1){if((b|0)==3)break;k[c+(b<<2)>>2]=0;b=b+1|0;}b=a+11|0;if((i[b>>0]|0)<0){i[k[a>>2]>>0]=0;k[a+4>>2]=0;}else{i[a>>0]=0;i[b>>0]=0;}gO(a,0);k[a>>2]=k[d>>2];k[a+4>>2]=k[d+4>>2];k[a+8>>2]=k[d+8>>2];b=0;while(1){if((b|0)==3)break;k[d+(b<<2)>>2]=0;b=b+1|0;}dO(d);dO(e);b=0;}k[f>>2]=7440;e=f+4|0;f=k[e>>2]|0;k[e>>2]=0;_N(f);}r=g;return b|0;}function QM(a){a=a|0;var b=0;b=k[a+12>>2]|0;if(!b){hO(a,33434)|0;a=0;}else{gh(be[k[(k[b>>2]|0)+8>>2]&255](b)|0);a=1;}return a|0;}function RM(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0;g=r;r=r+48|0;c=g+32|0;d=g+16|0;e=g;f=k[a+12>>2]|0;if(!f){hO(a,33434)|0;a=0;}else{f=be[k[(k[f>>2]|0)+12>>2]&255](f)|0;i[c>>0]=1;j=k[b>>2]|0;k[d>>2]=j;h=k[b+4>>2]|0;k[d+4>>2]=h;k[d+8>>2]=0;k[d+12>>2]=0;b=k[b+8>>2]|0;k[e>>2]=j;k[e+4>>2]=h;k[e+8>>2]=b;SM(f,d,e,c);if(!(i[c>>0]|0)){hO(a,33449)|0;a=0;}else a=1;}r=g;return a|0;}function SM(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if(k[a+16>>2]|0)TM(a,b,c,d);return;}function TM(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;a=k[a+16>>2]|0;if(!a){d=vc(4)|0;k[d>>2]=3688;Pd(d|0,288,44);}else{we[k[(k[a>>2]|0)+24>>2]&31](a,b,c,d);return;}}function UM(a,b){a=a|0;b=b|0;var c=0;c=k[a+28>>2]|0;if(!c){hO(a,33477)|0;a=0;}else{VI(c,b);a=1;}return a|0;}function VM(){WM(0);return;}function WM(a){a=a|0;rd(3032,33502);Ob(3048,33507,1,1,0);uc(3056,33512,1,-128,127);uc(3072,33517,1,-128,127);uc(3064,33529,1,0,255);uc(3080,33543,2,-32768,32767);uc(3088,33549,2,0,65535);uc(3096,33564,4,-2147483648,2147483647);uc(3104,33568,4,0,-1);uc(3112,33581,4,-2147483648,2147483647);uc(3120,33586,4,0,-1);Id(3128,33600,4);Id(3136,33606,8);gd(2128,33613);gd(2720,33625);Cb(2744,4,33658);Sb(2768,33671);kd(2776,0,33687);XM(33717);YM(33754);ZM(33793);_M(33824);$M(33864);aN(33893);kd(2784,4,33931);kd(2792,5,33961);XM(34e3);YM(34032);ZM(34065);_M(34098);$M(34132);aN(34165);kd(2800,6,34199);kd(2808,7,34230);kd(2816,7,34262);return;}function XM(a){a=a|0;kd(2864,0,a|0);return;}function YM(a){a=a|0;kd(2856,1,a|0);return;}function ZM(a){a=a|0;kd(2848,2,a|0);return;}function _M(a){a=a|0;kd(2840,3,a|0);return;}function $M(a){a=a|0;kd(2832,4,a|0);return;}function aN(a){a=a|0;kd(2824,5,a|0);return;}function bN(a){a=a|0;return kN(k[a+4>>2]|0)|0;}function cN(a){a=a|0;var b=0,c=0;b=r;r=r+16|0;c=b;k[c>>2]=k[a+60>>2];a=eN(ec(6,c|0)|0)|0;r=b;return a|0;}function dN(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;e=r;r=r+32|0;f=e;d=e+20|0;k[f>>2]=k[a+60>>2];k[f+4>>2]=0;k[f+8>>2]=b;k[f+12>>2]=d;k[f+16>>2]=c;if((eN(xb(140,f|0)|0)|0)<0){k[d>>2]=-1;a=-1;}else a=k[d>>2]|0;r=e;return a|0;}function eN(a){a=a|0;var b=0;if(a>>>0>4294963200){b=fN()|0;k[b>>2]=0-a;a=-1;}return a|0;}function fN(){var a=0;if(!(k[9585]|0))a=38384;else{a=(zP()|0)+64|0;a=k[a>>2]|0;}return a|0;}function gN(a){a=a|0;return;}function hN(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0,n=0,o=0,p=0;p=r;r=r+48|0;m=p+16|0;l=p;h=p+32|0;n=a+28|0;g=k[n>>2]|0;k[h>>2]=g;o=a+20|0;g=(k[o>>2]|0)-g|0;k[h+4>>2]=g;k[h+8>>2]=b;k[h+12>>2]=c;i=a+60|0;j=a+44|0;f=2;b=g+c|0;while(1){if(!(k[9585]|0)){k[m>>2]=k[i>>2];k[m+4>>2]=h;k[m+8>>2]=f;e=eN(zb(146,m|0)|0)|0;}else{wb(393,a|0);k[l>>2]=k[i>>2];k[l+4>>2]=h;k[l+8>>2]=f;e=eN(zb(146,l|0)|0)|0;Ab(0);}if((b|0)==(e|0)){b=6;break;}if((e|0)<0){b=8;break;}b=b-e|0;d=k[h+4>>2]|0;if(e>>>0<=d>>>0){if((f|0)==2){k[n>>2]=(k[n>>2]|0)+e;f=2;g=h;}else g=h;}else{g=k[j>>2]|0;k[n>>2]=g;k[o>>2]=g;e=e-d|0;f=f+-1|0;g=h+8|0;d=k[h+12>>2]|0;}k[g>>2]=(k[g>>2]|0)+e;k[g+4>>2]=d-e;h=g;}if((b|0)==6){m=k[j>>2]|0;k[a+16>>2]=m+(k[a+48>>2]|0);a=m;k[n>>2]=a;k[o>>2]=a;}else if((b|0)==8){k[a+16>>2]=0;k[n>>2]=0;k[o>>2]=0;k[a>>2]=k[a>>2]|32;if((f|0)==2)c=0;else c=c-(k[h+4>>2]|0)|0;}r=p;return c|0;}function iN(a){a=a|0;if(!(k[a+68>>2]|0))gN(a);return;}function jN(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=r;r=r+80|0;d=e;k[a+36>>2]=19;if((k[a>>2]&64|0)==0?(k[d>>2]=k[a+60>>2],k[d+4>>2]=21505,k[d+8>>2]=e+12,pc(54,d|0)|0):0)i[a+75>>0]=-1;d=hN(a,b,c)|0;r=e;return d|0;}function kN(a){a=a|0;var b=0,c=0;c=(lN(a)|0)+1|0;b=IN(c)|0;if(!b)b=0;else qP(b|0,a|0,c|0)|0;return b|0;}function lN(a){a=a|0;var b=0,c=0,d=0;d=a;a:do if(!(d&3))c=4;else{b=d;while(1){if(!(i[a>>0]|0)){a=b;break a;}a=a+1|0;b=a;if(!(b&3)){c=4;break;}}}while(0);if((c|0)==4){while(1){b=k[a>>2]|0;if(!((b&-2139062144^-2139062144)&b+-16843009))a=a+4|0;else break;}if((b&255)<<24>>24)do a=a+1|0;while((i[a>>0]|0)!=0);}return a-d|0;}function mN(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=r;r=r+16|0;f=e;k[f>>2]=d;d=nN(a,b,c,f)|0;r=e;return d|0;}function nN(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,l=0,m=0;m=r;r=r+128|0;e=m+112|0;l=m;f=l;g=8680;h=f+112|0;do{k[f>>2]=k[g>>2];f=f+4|0;g=g+4|0;}while((f|0)<(h|0));if((b+-1|0)>>>0>2147483646){if(!b){a=e;b=1;j=4;}else{b=fN()|0;k[b>>2]=75;b=-1;}}else j=4;if((j|0)==4){j=-2-a|0;j=b>>>0>j>>>0?j:b;k[l+48>>2]=j;e=l+20|0;k[e>>2]=a;k[l+44>>2]=a;b=a+j|0;a=l+16|0;k[a>>2]=b;k[l+28>>2]=b;b=oN(l,c,d)|0;if(j){l=k[e>>2]|0;i[l+(((l|0)==(k[a>>2]|0))<<31>>31)>>0]=0;}}r=m;return b|0;}function oN(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,s=0;s=r;r=r+224|0;m=s+120|0;o=s+80|0;p=s;q=s+136|0;d=o;e=d+40|0;do{k[d>>2]=0;d=d+4|0;}while((d|0)<(e|0));k[m>>2]=k[c>>2];if((pN(0,b,m,p,o)|0)<0)c=-1;else{if((k[a+76>>2]|0)>-1)n=qN(a)|0;else n=0;c=k[a>>2]|0;l=c&32;if((i[a+74>>0]|0)<1)k[a>>2]=c&-33;d=a+48|0;if(!(k[d>>2]|0)){e=a+44|0;f=k[e>>2]|0;k[e>>2]=q;g=a+28|0;k[g>>2]=q;h=a+20|0;k[h>>2]=q;k[d>>2]=80;j=a+16|0;k[j>>2]=q+80;c=pN(a,b,m,p,o)|0;if(f){de[k[a+36>>2]&63](a,0,0)|0;c=(k[h>>2]|0)==0?-1:c;k[e>>2]=f;k[d>>2]=0;k[j>>2]=0;k[g>>2]=0;k[h>>2]=0;}}else c=pN(a,b,m,p,o)|0;d=k[a>>2]|0;k[a>>2]=d|l;if(n|0)gN(a);c=(d&32|0)==0?c:-1;}r=s;return c|0;}function pN(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,m=0,n=0.0,o=0,q=0,s=0,t=0,v=0.0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0;ja=r;r=r+624|0;fa=ja+24|0;ga=ja+16|0;ha=ja+588|0;X=ja+576|0;ia=ja;S=ja+536|0;N=ja+8|0;O=ja+528|0;P=(a|0)!=0;Q=S+40|0;R=Q;S=S+39|0;T=N+4|0;U=ha;V=0-U|0;W=X+12|0;X=X+11|0;Y=W;Z=Y-U|0;_=-2-U|0;aa=Y+2|0;ba=fa+288|0;ca=ha+9|0;da=ca;ea=ha+8|0;g=0;f=0;q=0;a:while(1){do if((f|0)>-1)if((g|0)>(2147483647-f|0)){f=fN()|0;k[f>>2]=75;f=-1;break;}else{f=g+f|0;break;}while(0);g=i[b>>0]|0;if(!(g<<24>>24)){L=243;break;}else h=b;b:while(1){switch(g<<24>>24){case 37:{g=h;L=9;break b;}case 0:{g=h;break b;}default:{}}g=h+1|0;h=g;g=i[g>>0]|0;}c:do if((L|0)==9)while(1){L=0;if((i[h+1>>0]|0)!=37)break c;g=g+1|0;h=h+2|0;if((i[h>>0]|0)==37)L=9;else break;}while(0);g=g-b|0;if(P?(k[a>>2]&32|0)==0:0)rN(b,g,a)|0;if(g|0){b=h;continue;}o=h+1|0;m=i[o>>0]|0;g=(m<<24>>24)+-48|0;if(g>>>0<10){t=(i[h+2>>0]|0)==36;o=t?h+3|0:o;w=t?g:-1;t=t?1:q;g=i[o>>0]|0;}else{w=-1;t=q;g=m;}h=(g<<24>>24)+-32|0;d:do if(h>>>0<32){m=0;do{if(!(1<<h&75913))break d;m=1<<(g<<24>>24)+-32|m;o=o+1|0;g=i[o>>0]|0;h=(g<<24>>24)+-32|0;}while(h>>>0<32);}else m=0;while(0);do if(g<<24>>24!=42){h=(g<<24>>24)+-48|0;if(h>>>0<10){q=0;do{q=(q*10|0)+h|0;o=o+1|0;g=i[o>>0]|0;h=(g<<24>>24)+-48|0;}while(h>>>0<10);if((q|0)<0){f=-1;break a;}else K=t;}else{q=0;K=t;}}else{s=o+1|0;g=i[s>>0]|0;h=(g<<24>>24)+-48|0;if(h>>>0<10?(i[o+2>>0]|0)==36:0){k[e+(h<<2)>>2]=10;g=k[d+((i[s>>0]|0)+-48<<3)>>2]|0;h=1;s=o+3|0;}else{if(t|0){f=-1;break a;}if(!P){q=0;K=0;o=s;break;}h=(k[c>>2]|0)+(4-1)&~(4-1);g=k[h>>2]|0;k[c>>2]=h+4;h=0;}K=(g|0)<0;q=K?0-g|0:g;m=K?m|8192:m;K=h;o=s;g=i[s>>0]|0;}while(0);e:do if(g<<24>>24==46){g=o+1|0;h=i[g>>0]|0;if(h<<24>>24!=42){o=(h<<24>>24)+-48|0;if(o>>>0<10)h=0;else{x=0;break;}while(1){h=(h*10|0)+o|0;g=g+1|0;o=(i[g>>0]|0)+-48|0;if(o>>>0>=10){x=h;break e;}}}g=o+2|0;h=(i[g>>0]|0)+-48|0;if(h>>>0<10?(i[o+3>>0]|0)==36:0){k[e+(h<<2)>>2]=10;x=k[d+((i[g>>0]|0)+-48<<3)>>2]|0;g=o+4|0;break;}if(K|0){f=-1;break a;}if(P){J=(k[c>>2]|0)+(4-1)&~(4-1);x=k[J>>2]|0;k[c>>2]=J+4;}else x=0;}else{x=-1;g=o;}while(0);t=0;while(1){h=(i[g>>0]|0)+-65|0;if(h>>>0>57){f=-1;break a;}J=g+1|0;h=i[34816+(t*58|0)+h>>0]|0;o=h&255;if((o+-1|0)>>>0<8){t=o;g=J;}else break;}if(!(h<<24>>24)){f=-1;break;}s=(w|0)>-1;do if(h<<24>>24==19){if(s){f=-1;break a;}else L=51;}else{if(s){k[e+(w<<2)>>2]=o;H=d+(w<<3)|0;I=k[H+4>>2]|0;L=ia;k[L>>2]=k[H>>2];k[L+4>>2]=I;L=51;break;}if(!P){f=0;break a;}sN(ia,o,c);}while(0);if((L|0)==51?(L=0,!P):0){g=0;q=K;b=J;continue;}E=i[g>>0]|0;E=(t|0)!=0&(E&15|0)==3?E&-33:E;s=m&-65537;I=(m&8192|0)==0?m:s;f:do switch(E|0){case 110:switch((t&255)<<24>>24){case 0:{k[k[ia>>2]>>2]=f;g=0;q=K;b=J;continue a;}case 1:{k[k[ia>>2]>>2]=f;g=0;q=K;b=J;continue a;}case 2:{g=k[ia>>2]|0;k[g>>2]=f;k[g+4>>2]=((f|0)<0)<<31>>31;g=0;q=K;b=J;continue a;}case 3:{j[k[ia>>2]>>1]=f;g=0;q=K;b=J;continue a;}case 4:{i[k[ia>>2]>>0]=f;g=0;q=K;b=J;continue a;}case 6:{k[k[ia>>2]>>2]=f;g=0;q=K;b=J;continue a;}case 7:{g=k[ia>>2]|0;k[g>>2]=f;k[g+4>>2]=((f|0)<0)<<31>>31;g=0;q=K;b=J;continue a;}default:{g=0;q=K;b=J;continue a;}}case 112:{s=120;t=x>>>0>8?x:8;g=I|8;L=63;break;}case 88:case 120:{s=E;t=x;g=I;L=63;break;}case 111:{h=ia;g=k[h>>2]|0;h=k[h+4>>2]|0;if((g|0)==0&(h|0)==0)b=Q;else{b=Q;do{b=b+-1|0;i[b>>0]=g&7|48;g=pP(g|0,h|0,3)|0;h=M;}while(!((g|0)==0&(h|0)==0));}if(!(I&8)){h=0;m=35296;o=x;g=I;L=76;}else{o=R-b|0;h=0;m=35296;o=(x|0)>(o|0)?x:o+1|0;g=I;L=76;}break;}case 105:case 100:{b=ia;g=k[b>>2]|0;b=k[b+4>>2]|0;if((b|0)<0){g=mP(0,0,g|0,b|0)|0;b=M;h=ia;k[h>>2]=g;k[h+4>>2]=b;h=1;m=35296;L=75;break f;}if(!(I&2048)){m=I&1;h=m;m=(m|0)==0?35296:35298;L=75;}else{h=1;m=35297;L=75;}break;}case 117:{b=ia;h=0;m=35296;g=k[b>>2]|0;b=k[b+4>>2]|0;L=75;break;}case 99:{i[S>>0]=k[ia>>2];b=S;w=0;t=35296;h=Q;g=1;break;}case 109:{g=fN()|0;g=uN(k[g>>2]|0)|0;L=81;break;}case 115:{g=k[ia>>2]|0;g=g|0?g:35306;L=81;break;}case 67:{k[N>>2]=k[ia>>2];k[T>>2]=0;k[ia>>2]=N;s=-1;h=N;L=85;break;}case 83:{g=k[ia>>2]|0;if(!x){wN(a,32,q,0,I);g=0;L=96;}else{s=x;h=g;L=85;}break;}case 65:case 71:case 70:case 69:case 97:case 103:case 102:case 101:{n=+p[ia>>3];k[ga>>2]=0;p[u>>3]=n;if((k[u+4>>2]|0)>=0){g=I&1;if(!(I&2048)){G=g;H=(g|0)==0?35314:35319;}else{G=1;H=35316;}}else{n=-n;G=1;H=35313;}p[u>>3]=n;F=k[u+4>>2]&2146435072;do if(F>>>0<2146435072|(F|0)==2146435072&0<0){v=+yN(n,ga)*2.0;b=v!=0.0;if(b)k[ga>>2]=(k[ga>>2]|0)+-1;z=E|32;if((z|0)==97){o=E&32;w=(o|0)==0?H:H+9|0;t=G|2;g=12-x|0;do if(!(x>>>0>11|(g|0)==0)){n=8.0;do{g=g+-1|0;n=n*16.0;}while((g|0)!=0);if((i[w>>0]|0)==45){n=-(n+(-v-n));break;}else{n=v+n-n;break;}}else n=v;while(0);b=k[ga>>2]|0;g=(b|0)<0?0-b|0:b;g=tN(g,((g|0)<0)<<31>>31,W)|0;if((g|0)==(W|0)){i[X>>0]=48;g=X;}i[g+-1>>0]=(b>>31&2)+43;s=g+-2|0;i[s>>0]=E+15;m=(x|0)<1;h=(I&8|0)==0;g=ha;do{H=~~n;b=g+1|0;i[g>>0]=l[35280+H>>0]|o;n=(n-+(H|0))*16.0;do if((b-U|0)==1){if(h&(m&n==0.0)){g=b;break;}i[b>>0]=46;g=g+2|0;}else g=b;while(0);}while(n!=0.0);m=s;h=(x|0)!=0&(_+g|0)<(x|0)?aa+x-m|0:Z-m+g|0;o=h+t|0;wN(a,32,q,o,I);if(!(k[a>>2]&32))rN(w,t,a)|0;wN(a,48,q,o,I^65536);b=g-U|0;if(!(k[a>>2]&32))rN(ha,b,a)|0;g=Y-m|0;wN(a,48,h-(b+g)|0,0,0);if(!(k[a>>2]&32))rN(s,g,a)|0;wN(a,32,q,o,I^8192);g=(o|0)<(q|0)?q:o;break;}g=(x|0)<0?6:x;if(b){b=(k[ga>>2]|0)+-28|0;k[ga>>2]=b;n=v*268435456.0;}else{n=v;b=k[ga>>2]|0;}F=(b|0)<0?fa:ba;h=F;do{D=~~n>>>0;k[h>>2]=D;h=h+4|0;n=(n-+(D>>>0))*1.0e9;}while(n!=0.0);if((b|0)>0){m=F;s=h;while(1){o=(b|0)>29?29:b;b=s+-4|0;do if(b>>>0>=m>>>0){h=0;do{C=xP(k[b>>2]|0,0,o|0)|0;C=nP(C|0,M|0,h|0,0)|0;D=M;B=vP(C|0,D|0,1e9,0)|0;k[b>>2]=B;h=yP(C|0,D|0,1e9,0)|0;b=b+-4|0;}while(b>>>0>=m>>>0);if(!h)break;m=m+-4|0;k[m>>2]=h;}while(0);h=s;while(1){if(h>>>0<=m>>>0)break;b=h+-4|0;if(!(k[b>>2]|0))h=b;else break;}b=(k[ga>>2]|0)-o|0;k[ga>>2]=b;if((b|0)>0)s=h;else break;}}else m=F;if((b|0)<0){x=((g+25|0)/9|0)+1|0;y=(z|0)==102;do{w=0-b|0;w=(w|0)>9?9:w;do if(m>>>0<h>>>0){o=(1<<w)+-1|0;s=1e9>>>w;t=0;b=m;do{D=k[b>>2]|0;k[b>>2]=(D>>>w)+t;t=$(D&o,s)|0;b=b+4|0;}while(b>>>0<h>>>0);b=(k[m>>2]|0)==0?m+4|0:m;if(!t){m=b;b=h;break;}k[h>>2]=t;m=b;b=h+4|0;}else{m=(k[m>>2]|0)==0?m+4|0:m;b=h;}while(0);h=y?F:m;h=(b-h>>2|0)>(x|0)?h+(x<<2)|0:b;b=(k[ga>>2]|0)+w|0;k[ga>>2]=b;}while((b|0)<0);}D=F;do if(m>>>0<h>>>0){b=(D-m>>2)*9|0;s=k[m>>2]|0;if(s>>>0<10)break;else o=10;do{o=o*10|0;b=b+1|0;}while(s>>>0>=o>>>0);}else b=0;while(0);A=(z|0)==103;B=(g|0)!=0;o=g-((z|0)!=102?b:0)+((B&A)<<31>>31)|0;if((o|0)<(((h-D>>2)*9|0)+-9|0)){o=o+9216|0;t=F+4+(((o|0)/9|0)+-1024<<2)|0;o=((o|0)%9|0)+1|0;if((o|0)<9){s=10;do{s=s*10|0;o=o+1|0;}while((o|0)!=9);}else s=10;x=k[t>>2]|0;y=(x>>>0)%(s>>>0)|0;o=(t+4|0)==(h|0);do if(o&(y|0)==0)o=t;else{v=(((x>>>0)/(s>>>0)|0)&1|0)==0?9007199254740992.0:9007199254740994.0;w=(s|0)/2|0;if(y>>>0<w>>>0)n=.5;else n=o&(y|0)==(w|0)?1.0:1.5;do if(G){if((i[H>>0]|0)!=45)break;n=-n;v=-v;}while(0);o=x-y|0;k[t>>2]=o;if(!(v+n!=v)){o=t;break;}C=o+s|0;k[t>>2]=C;if(C>>>0>999999999){o=t;while(1){b=o+-4|0;k[o>>2]=0;if(b>>>0<m>>>0){m=m+-4|0;k[m>>2]=0;}C=(k[b>>2]|0)+1|0;k[b>>2]=C;if(C>>>0>999999999)o=b;else{t=b;break;}}}b=(D-m>>2)*9|0;s=k[m>>2]|0;if(s>>>0<10){o=t;break;}else o=10;do{o=o*10|0;b=b+1|0;}while(s>>>0>=o>>>0);o=t;}while(0);C=o+4|0;h=h>>>0>C>>>0?C:h;}y=0-b|0;C=h;while(1){if(C>>>0<=m>>>0){z=0;break;}h=C+-4|0;if(!(k[h>>2]|0))C=h;else{z=1;break;}}do if(A){g=(B&1^1)+g|0;if((g|0)>(b|0)&(b|0)>-5){t=E+-1|0;g=g+-1-b|0;}else{t=E+-2|0;g=g+-1|0;}h=I&8;if(h|0){w=h;break;}do if(z){s=k[C+-4>>2]|0;if(!s){o=9;break;}if(!((s>>>0)%10|0)){o=0;h=10;}else{o=0;break;}do{h=h*10|0;o=o+1|0;}while(!((s>>>0)%(h>>>0)|0|0));}else o=9;while(0);h=((C-D>>2)*9|0)+-9|0;if((t|32|0)==102){w=h-o|0;w=(w|0)<0?0:w;g=(g|0)<(w|0)?g:w;w=0;break;}else{w=h+b-o|0;w=(w|0)<0?0:w;g=(g|0)<(w|0)?g:w;w=0;break;}}else{t=E;w=I&8;}while(0);x=g|w;o=(x|0)!=0&1;s=(t|32|0)==102;if(s){y=0;b=(b|0)>0?b:0;}else{h=(b|0)<0?y:b;h=tN(h,((h|0)<0)<<31>>31,W)|0;if((Y-h|0)<2)do{h=h+-1|0;i[h>>0]=48;}while((Y-h|0)<2);i[h+-1>>0]=(b>>31&2)+43;b=h+-2|0;i[b>>0]=t;y=b;b=Y-b|0;}A=G+1+g+o+b|0;wN(a,32,q,A,I);if(!(k[a>>2]&32))rN(H,G,a)|0;wN(a,48,q,A,I^65536);do if(s){m=m>>>0>F>>>0?F:m;h=m;do{b=tN(k[h>>2]|0,0,ca)|0;do if((h|0)==(m|0)){if((b|0)!=(ca|0))break;i[ea>>0]=48;b=ea;}else{if(b>>>0<=ha>>>0)break;wP(ha|0,48,b-U|0)|0;do b=b+-1|0;while(b>>>0>ha>>>0);}while(0);if(!(k[a>>2]&32))rN(b,da-b|0,a)|0;h=h+4|0;}while(h>>>0<=F>>>0);do if(x|0){if(k[a>>2]&32|0)break;rN(35348,1,a)|0;}while(0);if((g|0)>0&h>>>0<C>>>0)while(1){b=tN(k[h>>2]|0,0,ca)|0;if(b>>>0>ha>>>0){wP(ha|0,48,b-U|0)|0;do b=b+-1|0;while(b>>>0>ha>>>0);}if(!(k[a>>2]&32))rN(b,(g|0)>9?9:g,a)|0;h=h+4|0;b=g+-9|0;if(!((g|0)>9&h>>>0<C>>>0)){g=b;break;}else g=b;}wN(a,48,g+9|0,9,0);}else{t=z?C:m+4|0;if((g|0)>-1){s=(w|0)==0;o=m;do{b=tN(k[o>>2]|0,0,ca)|0;if((b|0)==(ca|0)){i[ea>>0]=48;b=ea;}do if((o|0)==(m|0)){h=b+1|0;if(!(k[a>>2]&32))rN(b,1,a)|0;if(s&(g|0)<1){b=h;break;}if(k[a>>2]&32|0){b=h;break;}rN(35348,1,a)|0;b=h;}else{if(b>>>0<=ha>>>0)break;wP(ha|0,48,b+V|0)|0;do b=b+-1|0;while(b>>>0>ha>>>0);}while(0);h=da-b|0;if(!(k[a>>2]&32))rN(b,(g|0)>(h|0)?h:g,a)|0;g=g-h|0;o=o+4|0;}while(o>>>0<t>>>0&(g|0)>-1);}wN(a,48,g+18|0,18,0);if(k[a>>2]&32|0)break;rN(y,Y-y|0,a)|0;}while(0);wN(a,32,q,A,I^8192);g=(A|0)<(q|0)?q:A;}else{o=(E&32|0)!=0;m=n!=n|0.0!=0.0;b=m?0:G;h=b+3|0;wN(a,32,q,h,s);g=k[a>>2]|0;if(!(g&32)){rN(H,b,a)|0;g=k[a>>2]|0;}if(!(g&32))rN(m?o?35340:35344:o?35332:35336,3,a)|0;wN(a,32,q,h,I^8192);g=(h|0)<(q|0)?q:h;}while(0);q=K;b=J;continue a;}default:{w=0;t=35296;h=Q;g=x;s=I;}}while(0);g:do if((L|0)==63){m=ia;h=k[m>>2]|0;m=k[m+4>>2]|0;o=s&32;if((h|0)==0&(m|0)==0){b=Q;h=0;m=0;}else{b=Q;do{b=b+-1|0;i[b>>0]=l[35280+(h&15)>>0]|o;h=pP(h|0,m|0,4)|0;m=M;}while(!((h|0)==0&(m|0)==0));m=ia;h=k[m>>2]|0;m=k[m+4>>2]|0;}m=(g&8|0)==0|(h|0)==0&(m|0)==0;h=m?0:2;m=m?35296:35296+(s>>4)|0;o=t;L=76;}else if((L|0)==75){b=tN(g,b,Q)|0;o=x;g=I;L=76;}else if((L|0)==81){L=0;I=vN(g,0,x)|0;H=(I|0)==0;b=g;w=0;t=35296;h=H?g+x|0:I;g=H?x:I-g|0;}else if((L|0)==85){L=0;o=h;g=0;b=0;while(1){m=k[o>>2]|0;if(!m)break;b=xN(O,m)|0;if((b|0)<0|b>>>0>(s-g|0)>>>0)break;g=b+g|0;if(s>>>0>g>>>0)o=o+4|0;else break;}if((b|0)<0){f=-1;break a;}wN(a,32,q,g,I);if(!g){g=0;L=96;}else{m=0;while(1){b=k[h>>2]|0;if(!b){L=96;break g;}b=xN(O,b)|0;m=b+m|0;if((m|0)>(g|0)){L=96;break g;}if(!(k[a>>2]&32))rN(O,b,a)|0;if(m>>>0>=g>>>0){L=96;break;}else h=h+4|0;}}}while(0);if((L|0)==96){L=0;wN(a,32,q,g,I^8192);g=(q|0)>(g|0)?q:g;q=K;b=J;continue;}if((L|0)==76){L=0;s=(o|0)>-1?g&-65537:g;g=ia;g=(k[g>>2]|0)!=0|(k[g+4>>2]|0)!=0;if((o|0)!=0|g){g=(g&1^1)+(R-b)|0;w=h;t=m;h=Q;g=(o|0)>(g|0)?o:g;}else{b=Q;w=h;t=m;h=Q;g=0;}}o=h-b|0;h=(g|0)<(o|0)?o:g;m=h+w|0;g=(q|0)<(m|0)?m:q;wN(a,32,g,m,s);if(!(k[a>>2]&32))rN(t,w,a)|0;wN(a,48,g,m,s^65536);wN(a,48,h,o,0);if(!(k[a>>2]&32))rN(b,o,a)|0;wN(a,32,g,m,s^8192);q=K;b=J;}h:do if((L|0)==243)if(!a)if(!q)f=0;else{f=1;while(1){g=k[e+(f<<2)>>2]|0;if(!g)break;sN(d+(f<<3)|0,g,c);f=f+1|0;if((f|0)>=10){f=1;break h;}}while(1){if(k[e+(f<<2)>>2]|0){f=-1;break h;}f=f+1|0;if((f|0)>=10){f=1;break;}}}while(0);r=ja;return f|0;}function qN(a){a=a|0;return 0;}function rN(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0;d=c+16|0;e=k[d>>2]|0;if(!e){if(!(BN(c)|0)){d=k[d>>2]|0;f=5;}else d=0;}else{d=e;f=5;}a:do if((f|0)==5){g=c+20|0;f=k[g>>2]|0;e=f;if((d-f|0)>>>0<b>>>0){d=de[k[c+36>>2]&63](c,a,b)|0;break;}b:do if((i[c+75>>0]|0)>-1){d=b;while(1){if(!d){f=b;d=0;break b;}f=d+-1|0;if((i[a+f>>0]|0)==10)break;else d=f;}if((de[k[c+36>>2]&63](c,a,d)|0)>>>0<d>>>0)break a;f=b-d|0;a=a+d|0;e=k[g>>2]|0;}else{f=b;d=0;}while(0);qP(e|0,a|0,f|0)|0;k[g>>2]=(k[g>>2]|0)+f;d=d+f|0;}while(0);return d|0;}function mu(a){a=a|0;var b=0,c=0,d=0;b=k[a>>2]|0;if(b|0){c=a+4|0;while(1){d=k[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;k[c>>2]=d;nu(d);}YN(k[a>>2]|0);}return;}function nu(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function ou(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;do if(b){if(b>>>0>536870911){c=vc(4)|0;hP(c);Pd(c|0,2968,374);}else{d=UN(b<<3)|0;break;}}else d=0;while(0);k[a>>2]=d;c=d+(c<<3)|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+(b<<3);return;}function pu(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;d=k[a>>2]|0;e=a+4|0;f=b+4|0;c=k[e>>2]|0;while(1){if((c|0)==(d|0))break;i=k[f>>2]|0;g=c+-8|0;k[i+-8>>2]=k[g>>2];h=c+-4|0;k[i+-4>>2]=k[h>>2];k[g>>2]=0;k[h>>2]=0;k[f>>2]=(k[f>>2]|0)+-8;c=g;}g=k[a>>2]|0;k[a>>2]=k[f>>2];k[f>>2]=g;g=b+8|0;i=k[e>>2]|0;k[e>>2]=k[g>>2];k[g>>2]=i;g=a+8|0;i=b+12|0;h=k[g>>2]|0;k[g>>2]=k[i>>2];k[i>>2]=h;k[b>>2]=k[f>>2];return;}function qu(a){a=a|0;var b=0,c=0,d=0;b=k[a+4>>2]|0;c=a+8|0;while(1){d=k[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;k[c>>2]=d;nu(d);}a=k[a>>2]|0;if(a|0)YN(a);return;}function ru(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0;c=uu(a+12|0,b)|0;m=k[a+4>>2]|0;a:do if(m){n=m+-1|0;o=(n&m|0)==0;if(o)l=n&c;else l=(c>>>0)%(m>>>0)|0;c=k[(k[a>>2]|0)+(l<<2)>>2]|0;if(c){h=b+11|0;j=b+4|0;b:while(1){c=k[c>>2]|0;if(!c){c=0;break a;}a=k[c+4>>2]|0;if(o)a=a&n;else a=(a>>>0)%(m>>>0)|0;if((a|0)!=(l|0)){c=0;break a;}a=c+8|0;e=i[a+11>>0]|0;f=e<<24>>24<0;e=e&255;g=f?k[c+12>>2]|0:e;p=i[h>>0]|0;d=p<<24>>24<0;if((g|0)!=((d?k[j>>2]|0:p&255)|0))continue;d=d?k[b>>2]|0:b;if(f)if(!(no(k[a>>2]|0,d,g)|0))break;else continue;while(1){if(!e)break a;if((i[a>>0]|0)!=(i[d>>0]|0))continue b;e=e+-1|0;d=d+1|0;a=a+1|0;}}}else c=0;}else c=0;while(0);return c|0;}function su(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function tu(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0.0,g=0.0,h=0,j=0,l=0,m=0,n=0,p=0,q=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;B=r;r=r+32|0;A=B+4|0;u=B;v=B+16|0;k[u>>2]=b;z=uu(a+12|0,b)|0;x=a+4|0;h=k[x>>2]|0;y=(h|0)==0;a:do if(!y){n=h+-1|0;p=(n&h|0)==0;if(p)q=n&z;else q=(z>>>0)%(h>>>0)|0;c=k[(k[a>>2]|0)+(q<<2)>>2]|0;if(!c){c=q;w=19;}else{s=b+11|0;t=b+4|0;b:while(1){c=k[c>>2]|0;if(!c){c=q;w=19;break a;}d=k[c+4>>2]|0;if(p)d=d&n;else d=(d>>>0)%(h>>>0)|0;if((d|0)!=(q|0)){c=q;w=19;break a;}d=c+8|0;j=i[d+11>>0]|0;l=j<<24>>24<0;j=j&255;m=l?k[c+12>>2]|0:j;C=i[s>>0]|0;e=C<<24>>24<0;if((m|0)!=((e?k[t>>2]|0:C&255)|0))continue;e=e?k[b>>2]|0:b;if(l)if(!(no(k[d>>2]|0,e,m)|0))break;else continue;while(1){if(!j)break a;if((i[d>>0]|0)!=(i[e>>0]|0))continue b;j=j+-1|0;e=e+1|0;d=d+1|0;}}}}else{c=0;w=19;}while(0);if((w|0)==19){vu(A,a,z,38896,u,v);j=a+12|0;f=+(((k[j>>2]|0)+1|0)>>>0);g=+o[a+16>>2];do if(y|f>+(h>>>0)*g){c=(h>>>0>2&(h+-1&h|0)==0&1|h<<1)^1;d=~~+_(+(f/g))>>>0;wu(a,c>>>0<d>>>0?d:c);c=k[x>>2]|0;d=c+-1|0;if(!(d&c)){h=c;c=d&z;break;}else{h=c;c=(z>>>0)%(c>>>0)|0;break;}}while(0);d=k[(k[a>>2]|0)+(c<<2)>>2]|0;if(!d){e=a+8|0;k[k[A>>2]>>2]=k[e>>2];k[e>>2]=k[A>>2];k[(k[a>>2]|0)+(c<<2)>>2]=e;e=k[A>>2]|0;c=k[e>>2]|0;if(!c)c=A;else{c=k[c+4>>2]|0;d=h+-1|0;if(!(d&h))c=c&d;else c=(c>>>0)%(h>>>0)|0;k[(k[a>>2]|0)+(c<<2)>>2]=e;c=A;}}else{k[k[A>>2]>>2]=k[d>>2];k[d>>2]=k[A>>2];c=A;}C=k[c>>2]|0;k[j>>2]=(k[j>>2]|0)+1;k[c>>2]=0;c=C;}r=B;return c+20|0;}function uu(a,b){a=a|0;b=b|0;var c=0,d=0;a=r;r=r+16|0;c=i[b+11>>0]|0;d=c<<24>>24<0;b=zu(a,d?k[b>>2]|0:b,d?k[b+4>>2]|0:c&255)|0;r=a;return b|0;}function vu(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;d=UN(28)|0;k[a>>2]=d;k[a+4>>2]=b+8;f=a+8|0;i[f>>0]=0;bO(d+8|0,k[e>>2]|0);k[d+20>>2]=0;k[d+24>>2]=0;i[f>>0]=1;f=k[a>>2]|0;k[f+4>>2]=c;k[f>>2]=0;return;}function wu(a,b){a=a|0;b=b|0;var c=0,d=0;if((b|0)!=1){if(b+-1&b)b=KN(b)|0;}else b=2;d=k[a+4>>2]|0;if(b>>>0<=d>>>0){if(b>>>0<d>>>0){c=~~+_(+(+((k[a+12>>2]|0)>>>0)/+o[a+16>>2]))>>>0;if(d>>>0>2&(d+-1&d|0)==0)c=1<<32-(ca(c+-1|0)|0);else c=KN(c)|0;b=b>>>0<c>>>0?c:b;if(b>>>0<d>>>0)yu(a,b);}}else yu(a,b);return;}function xu(a){a=a|0;su(a+12|0);dO(a);return;}function yu(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;d=a+4|0;a:do if(b){if(b>>>0>1073741823){a=vc(4)|0;hP(a);Pd(a|0,2968,374);}t=UN(b<<2)|0;c=k[a>>2]|0;k[a>>2]=t;if(c|0)YN(c);k[d>>2]=b;c=0;while(1){if((c|0)==(b|0))break;k[(k[a>>2]|0)+(c<<2)>>2]=0;c=c+1|0;}e=a+8|0;c=k[e>>2]|0;if(c|0){d=k[c+4>>2]|0;s=b+-1|0;t=(s&b|0)==0;if(t)d=d&s;else d=(d>>>0)%(b>>>0)|0;k[(k[a>>2]|0)+(d<<2)>>2]=e;while(1){r=c;b:while(1)while(1){c=k[r>>2]|0;if(!c)break a;e=k[c+4>>2]|0;if(t)q=e&s;else q=(e>>>0)%(b>>>0)|0;if((q|0)==(d|0)){r=c;continue b;}e=(k[a>>2]|0)+(q<<2)|0;if(!(k[e>>2]|0))break b;m=c+8|0;n=m+11|0;o=c+12|0;p=c;c:while(1){e=k[p>>2]|0;if(!e){f=34;break;}f=e+8|0;h=i[n>>0]|0;j=h<<24>>24<0;h=h&255;l=j?k[o>>2]|0:h;u=i[f+11>>0]|0;g=u<<24>>24<0;if((l|0)!=((g?k[e+12>>2]|0:u&255)|0)){f=34;break;}f=g?k[f>>2]|0:f;if(j){if(no(k[m>>2]|0,f,l)|0){f=31;break;}p=k[p>>2]|0;continue;}else g=m;while(1){if(!h){p=e;continue c;}if((i[g>>0]|0)!=(i[f>>0]|0)){f=33;break c;}h=h+-1|0;f=f+1|0;g=g+1|0;}}if((f|0)==31)e=k[p>>2]|0;k[r>>2]=e;k[p>>2]=k[k[(k[a>>2]|0)+(q<<2)>>2]>>2];k[k[(k[a>>2]|0)+(q<<2)>>2]>>2]=c;}k[e>>2]=r;d=q;}}}else{c=k[a>>2]|0;k[a>>2]=0;if(c|0)YN(c);k[d>>2]=0;}while(0);return;}function zu(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;e=c+~(c>>>0<3?c:3)+4&-4;f=b+e|0;d=c;a=c;while(1){if(d>>>0<=3)break;h=$(l[b>>0]|l[b+1>>0]<<8|l[b+2>>0]<<16|l[b+3>>0]<<24,1540483477)|0;d=d+-4|0;b=b+4|0;a=($(h>>>24^h,1540483477)|0)^($(a,1540483477)|0);}switch(c-e|0){case 3:{a=(l[f+2>>0]|0)<<16^a;g=6;break;}case 2:{g=6;break;}case 1:{g=7;break;}default:{}}if((g|0)==6){a=(l[f+1>>0]|0)<<8^a;g=7;}if((g|0)==7)a=$((l[f>>0]|0)^a,1540483477)|0;h=$(a>>>13^a,1540483477)|0;return h>>>15^h|0;}function Au(a){a=a|0;var b=0,c=0,d=0;c=a+12|0;if(k[c>>2]|0){d=a+8|0;Bu(a,k[d>>2]|0);k[d>>2]=0;d=k[a+4>>2]|0;b=0;while(1){if((b|0)==(d|0))break;k[(k[a>>2]|0)+(b<<2)>>2]=0;b=b+1|0;}k[c>>2]=0;}return;}function Bu(a,b){a=a|0;b=b|0;while(1){if(!b)break;a=k[b>>2]|0;xu(b+8|0);YN(b);b=a;}return;}function Cu(a){a=a|0;var b=0;Bu(a,k[a+8>>2]|0);b=k[a>>2]|0;k[a>>2]=0;if(b|0)YN(b);return;}function Du(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=r;r=r+32|0;d=c+16|0;e=c;tv(d,b,17443,35633);tv(e,b,17807,35632);lv(a,b,d,e);vv(e);vv(d);Eu(a+48|0,k[a>>2]|0,b,23680);Eu(a+64|0,k[a>>2]|0,b,19817);Eu(a+80|0,k[a>>2]|0,b,19828);Eu(a+96|0,k[a>>2]|0,b,19838);Eu(a+112|0,k[a>>2]|0,b,19842);Fu(a+128|0,k[a>>2]|0,b,24504);Fu(a+144|0,k[a>>2]|0,b,24513);r=c;return;}function Eu(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a>>2]=b;k[a+4>>2]=k[c>>2];b=k[c+4>>2]|0;k[a+8>>2]=b;if(b|0)PN(b);k[a+12>>2]=d;return;}function Fu(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a>>2]=b;k[a+4>>2]=k[c>>2];b=k[c+4>>2]|0;k[a+8>>2]=b;if(b|0)PN(b);k[a+12>>2]=d;return;}function Gu(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=r;r=r+32|0;d=c+16|0;e=c;tv(d,b,19854,35633);tv(e,b,21823,35632);lv(a,b,d,e);vv(e);vv(d);Eu(a+48|0,k[a>>2]|0,b,24500);Eu(a+64|0,k[a>>2]|0,b,24040);Fu(a+80|0,k[a>>2]|0,b,24504);Hu(a+96|0,k[a>>2]|0,b,26796);r=c;return;}function Hu(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a>>2]=b;k[a+4>>2]=k[c>>2];b=k[c+4>>2]|0;k[a+8>>2]=b;if(b|0)PN(b);k[a+12>>2]=d;return;}function Iu(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=r;r=r+32|0;d=c+16|0;e=c;tv(d,b,20064,35633);tv(e,b,21823,35632);lv(a,b,d,e);vv(e);vv(d);Eu(a+48|0,k[a>>2]|0,b,24500);Eu(a+64|0,k[a>>2]|0,b,22030);Eu(a+80|0,k[a>>2]|0,b,22033);Eu(a+96|0,k[a>>2]|0,b,22036);Eu(a+112|0,k[a>>2]|0,b,20958);Eu(a+128|0,k[a>>2]|0,b,22869);Eu(a+144|0,k[a>>2]|0,b,22039);Eu(a+160|0,k[a>>2]|0,b,22055);Eu(a+176|0,k[a>>2]|0,b,24040);Hu(a+192|0,k[a>>2]|0,b,22069);Hu(a+208|0,k[a>>2]|0,b,22071);Hu(a+224|0,k[a>>2]|0,b,22088);r=c;return;}function Ju(a){a=a|0;var b=0,c=0;k[a>>2]=6248;k[a+4>>2]=6304;c=a+44|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){fv(b);YN(b);}c=a+40|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){ev(b);YN(b);}c=a+36|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){dv(b);YN(b);}c=a+32|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){cv(b);YN(b);}c=a+28|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){bv(b);YN(b);}c=a+24|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){av(b);YN(b);}c=a+20|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){$u(b);YN(b);}c=a+16|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){_u(b);YN(b);}Dt(a+8|0);return;}function Ku(a){a=a|0;Ju(a);YN(a);return;}function Lu(a){a=a|0;return k[a+16>>2]|0;}function Mu(a){a=a|0;return k[a+20>>2]|0;}function Nu(a){a=a|0;return k[a+24>>2]|0;}function Ou(a){a=a|0;return k[a+28>>2]|0;}function Pu(a){a=a|0;return k[a+32>>2]|0;}function Qu(a){a=a|0;return k[a+36>>2]|0;}function Ru(a){a=a|0;return k[a+40>>2]|0;}function Su(a){a=a|0;return k[a+44>>2]|0;}function Tu(a){a=a|0;Zu(a);return;}function Uu(a,b,c){a=a|0;b=b|0;c=c|0;iv(a);return jv(a)|0;}function Vu(a){a=a|0;Ju(a+-4|0);return;}function Wu(a){a=a|0;Ku(a+-4|0);return;}function Xu(a){a=a|0;Zu(a+-4|0);return;}function Yu(a,b,c){a=a|0;b=b|0;c=c|0;return Uu(a+-4|0,0,0)|0;}function Zu(a){a=a|0;var b=0,c=0;c=a+16|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){_u(b);YN(b);}c=a+20|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){$u(b);YN(b);}c=a+24|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){av(b);YN(b);}c=a+28|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){bv(b);YN(b);}c=a+32|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){cv(b);YN(b);}c=a+36|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){dv(b);YN(b);}c=a+40|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){ev(b);YN(b);}c=a+44|0;b=k[c>>2]|0;k[c>>2]=0;if(b|0){fv(b);YN(b);}return;}function _u(a){a=a|0;Dt(a+84|0);Dt(a+68|0);Dt(a+52|0);nv(a);return;}function $u(a){a=a|0;Dt(a+148|0);Dt(a+132|0);Dt(a+116|0);Dt(a+100|0);Dt(a+84|0);Dt(a+68|0);Dt(a+52|0);nv(a);return;}function av(a){a=a|0;Dt(a+100|0);Dt(a+84|0);Dt(a+68|0);Dt(a+52|0);nv(a);return;}function bv(a){a=a|0;k[a>>2]=6328;Dt(a+136|0);Dt(a+120|0);Dt(a+104|0);Dt(a+88|0);Dt(a+72|0);Dt(a+56|0);nv(a+4|0);return;}function cv(a){a=a|0;Dt(a+212|0);Dt(a+196|0);Dt(a+180|0);Dt(a+164|0);Dt(a+148|0);Dt(a+132|0);Dt(a+116|0);Dt(a+100|0);Dt(a+84|0);Dt(a+68|0);Dt(a+52|0);nv(a);return;}function dv(a){a=a|0;Dt(a+148|0);Dt(a+132|0);Dt(a+116|0);Dt(a+100|0);Dt(a+84|0);Dt(a+68|0);Dt(a+52|0);nv(a);return;}function ev(a){a=a|0;Dt(a+228|0);Dt(a+212|0);Dt(a+196|0);Dt(a+180|0);Dt(a+164|0);Dt(a+148|0);Dt(a+132|0);Dt(a+116|0);Dt(a+100|0);Dt(a+84|0);Dt(a+68|0);Dt(a+52|0);nv(a);return;}function fv(a){a=a|0;Dt(a+100|0);Dt(a+84|0);Dt(a+68|0);Dt(a+52|0);nv(a);return;}function gv(a){a=a|0;hv(a+132|0);return;}function hv(a){a=a|0;var b=0;b=k[a+4>>2]|0;b=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;a=de[k[(k[b>>2]|0)+140>>2]&63](b,k[a>>2]|0,k[a+12>>2]|0)|0;$d[k[(k[b>>2]|0)+100>>2]&255](b,a);return;}function iv(a){a=a|0;var b=0,c=0,d=0;b=VN(96,39939)|0;if(!b)b=0;else Cv(b,a+8|0);d=a+16|0;c=k[d>>2]|0;k[d>>2]=b;if(c|0){_u(c);YN(c);}b=VN(160,39939)|0;if(!b)b=0;else Du(b,a+8|0);d=a+20|0;c=k[d>>2]|0;k[d>>2]=b;if(c|0){$u(c);YN(c);}b=VN(112,39939)|0;if(!b)b=0;else Gu(b,a+8|0);d=a+24|0;c=k[d>>2]|0;k[d>>2]=b;if(c|0){av(c);YN(c);}b=VN(148,39939)|0;if(!b)b=0;else rv(b,a+8|0);d=a+28|0;c=k[d>>2]|0;k[d>>2]=b;if(c|0){bv(c);YN(c);}b=VN(224,39939)|0;if(!b)b=0;else qv(b,a+8|0);d=a+32|0;c=k[d>>2]|0;k[d>>2]=b;if(c|0){cv(c);YN(c);}b=VN(160,39939)|0;if(!b)b=0;else sv(b,a+8|0);d=a+36|0;c=k[d>>2]|0;k[d>>2]=b;if(c|0){dv(c);YN(c);}b=VN(240,39939)|0;if(!b)b=0;else Iu(b,a+8|0);d=a+40|0;c=k[d>>2]|0;k[d>>2]=b;if(c|0){ev(c);YN(c);}b=VN(112,39939)|0;if(!b)b=0;else Bv(b,a+8|0);d=a+44|0;c=k[d>>2]|0;k[d>>2]=b;if(c|0){fv(c);YN(c);}return;}function jv(a){a=a|0;var b=0,c=0,d=0;d=r;r=r+32|0;c=d;if(!(k[a+8>>2]|0))a=0;else{k[c>>2]=k[a+16>>2];k[c+4>>2]=k[a+20>>2];k[c+8>>2]=k[a+24>>2];b=k[a+28>>2]|0;k[c+12>>2]=(b|0)==0?0:b+4|0;k[c+16>>2]=k[a+32>>2];k[c+20>>2]=k[a+36>>2];k[c+24>>2]=k[a+40>>2];k[c+28>>2]=k[a+44>>2];a=0;while(1){if((a|0)>=8){a=1;break;}b=k[c+(a<<2)>>2]|0;if(!b){a=0;break;}if(ov(b)|0)a=a+1|0;else{a=0;break;}}}r=d;return a|0;}function kv(a,b){a=a|0;b=b|0;var c=0,d=0;k[a>>2]=6248;k[a+4>>2]=6304;d=a+8|0;c=k[b>>2]|0;k[d>>2]=c;b=k[b+4>>2]|0;k[a+12>>2]=b;if(b){PN(b);c=k[d>>2]|0;}d=a+16|0;k[d>>2]=0;k[d+4>>2]=0;k[d+8>>2]=0;k[d+12>>2]=0;k[d+16>>2]=0;k[d+20>>2]=0;k[d+24>>2]=0;k[d+28>>2]=0;if(c|0)iv(a);return;}function lv(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;k[a>>2]=0;f=a+4|0;k[f>>2]=k[b>>2];b=k[b+4>>2]|0;k[a+8>>2]=b;if(b|0)PN(b);e=a+12|0;xv(e,c);b=a+28|0;xv(b,d);i[a+44>>0]=0;if((k[f>>2]|0?zv(e)|0:0)?zv(b)|0:0)mv(a);return;}function mv(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0;g=r;r=r+272|0;c=g;e=g+8|0;f=k[a+4>>2]|0;f=be[k[(k[f>>2]|0)+8>>2]&255](f)|0;b=be[k[(k[f>>2]|0)+60>>2]&255](f)|0;k[a>>2]=b;if(b|0){j=k[(k[f>>2]|0)+16>>2]|0;d=a+12|0;l=Av(d)|0;se[j&63](f,b,l);l=k[(k[f>>2]|0)+16>>2]|0;j=k[a>>2]|0;b=a+28|0;h=Av(b)|0;se[l&63](f,j,h);$d[k[(k[f>>2]|0)+176>>2]&255](f,k[a>>2]|0);we[k[(k[f>>2]|0)+156>>2]&31](f,k[a>>2]|0,35714,c);if(!(k[c>>2]|0)){l=k[(k[f>>2]|0)+92>>2]|0;j=k[a>>2]|0;h=Av(d)|0;se[l&63](f,j,h);h=k[(k[f>>2]|0)+92>>2]|0;j=k[a>>2]|0;l=Av(b)|0;se[h&63](f,j,l);Yd[k[(k[f>>2]|0)+152>>2]&31](f,k[a>>2]|0,256,0,e);}else i[a+44>>0]=1;}r=g;return;}function nv(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;if(!(i[a+44>>0]|0))b=a;else{d=a+4|0;b=k[d>>2]|0;b=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;f=k[(k[b>>2]|0)+92>>2]|0;c=k[a>>2]|0;e=Av(a+12|0)|0;se[f&63](b,c,e);d=k[d>>2]|0;d=be[k[(k[d>>2]|0)+8>>2]&255](d)|0;e=k[(k[d>>2]|0)+92>>2]|0;c=k[a>>2]|0;b=Av(a+28|0)|0;se[e&63](d,c,b);b=a;}b=k[b>>2]|0;if(b|0){f=k[a+4>>2]|0;$d[k[(k[f>>2]|0)+28>>2]&255](f,b);}vv(a+28|0);vv(a+12|0);Dt(a+4|0);return;}function ov(a){a=a|0;return(i[a+44>>0]|0)!=0|0;}function pv(a){a=a|0;var b=0;b=k[a+4>>2]|0;b=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;$d[k[(k[b>>2]|0)+224>>2]&255](b,k[a>>2]|0);return;}function qv(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=r;r=r+32|0;d=c+16|0;e=c;tv(d,b,21068,35633);tv(e,b,21823,35632);lv(a,b,d,e);vv(e);vv(d);Eu(a+48|0,k[a>>2]|0,b,24500);Eu(a+64|0,k[a>>2]|0,b,22030);Eu(a+80|0,k[a>>2]|0,b,22033);Eu(a+96|0,k[a>>2]|0,b,22036);Eu(a+112|0,k[a>>2]|0,b,22869);Eu(a+128|0,k[a>>2]|0,b,22039);Eu(a+144|0,k[a>>2]|0,b,22055);Eu(a+160|0,k[a>>2]|0,b,24040);Hu(a+176|0,k[a>>2]|0,b,22069);Hu(a+192|0,k[a>>2]|0,b,22071);Hu(a+208|0,k[a>>2]|0,b,22088);r=c;return;}function rv(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=r;r=r+32|0;e=c+16|0;f=c;d=a+4|0;tv(e,b,22095,35633);tv(f,b,22355,35632);lv(d,b,e,f);vv(f);vv(e);k[a>>2]=6328;Eu(a+52|0,k[d>>2]|0,b,24500);Eu(a+68|0,k[d>>2]|0,b,22869);Eu(a+84|0,k[d>>2]|0,b,22879);Eu(a+100|0,k[d>>2]|0,b,24040);Eu(a+116|0,k[d>>2]|0,b,22886);Fu(a+132|0,k[d>>2]|0,b,24504);r=c;return;}function sv(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=r;r=r+32|0;d=c+16|0;e=c;tv(d,b,22893,35633);tv(e,b,23229,35632);lv(a,b,d,e);vv(e);vv(d);Eu(a+48|0,k[a>>2]|0,b,23680);Eu(a+64|0,k[a>>2]|0,b,23691);Eu(a+80|0,k[a>>2]|0,b,23698);Eu(a+96|0,k[a>>2]|0,b,23705);Eu(a+112|0,k[a>>2]|0,b,23715);Fu(a+128|0,k[a>>2]|0,b,24504);Fu(a+144|0,k[a>>2]|0,b,23725);r=c;return;}function tv(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=k[b>>2]|0;k[a>>2]=e;b=k[b+4>>2]|0;k[a+4>>2]=b;if(b){PN(b);e=k[a>>2]|0;}k[a+8>>2]=0;i[a+12>>0]=0;if(!((c|0)==0|(e|0)==0))uv(a,c,d);return;}function uv(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;h=r;r=r+272|0;e=h;f=h+4|0;g=h+8|0;k[e>>2]=b;d=k[a>>2]|0;d=be[k[(k[d>>2]|0)+8>>2]&255](d)|0;b=ne[k[(k[d>>2]|0)+64>>2]&127](d,c)|0;c=a+8|0;k[c>>2]=b;if(b|0){Yd[k[(k[d>>2]|0)+192>>2]&31](d,b,1,e,0);$d[k[(k[d>>2]|0)+56>>2]&255](d,k[c>>2]|0);we[k[(k[d>>2]|0)+164>>2]&31](d,k[c>>2]|0,35713,f);if(!(k[f>>2]|0))Yd[k[(k[d>>2]|0)+160>>2]&31](d,k[c>>2]|0,256,0,g);else i[a+12>>0]=1;}r=h;return;}function vv(a){a=a|0;wv(a);Dt(a);return;}function wv(a){a=a|0;var b=0,c=0;b=k[a+8>>2]|0;if(b|0?(c=k[a>>2]|0,c|0):0)$d[k[(k[c>>2]|0)+36>>2]&255](c,b);return;}function xv(a,b){a=a|0;b=b|0;k[a>>2]=0;k[a+4>>2]=0;yv(a,b);return;}function yv(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;c=r;r=r+16|0;d=c;f=b+8|0;k[a+8>>2]=k[f>>2];k[f>>2]=0;f=b+12|0;i[a+12>>0]=i[f>>0]|0;i[f>>0]=0;f=k[b>>2]|0;g=b+4|0;e=k[g>>2]|0;k[b>>2]=0;k[g>>2]=0;k[d>>2]=k[a>>2];k[a>>2]=f;b=a+4|0;k[d+4>>2]=k[b>>2];k[b>>2]=e;Dt(d);r=c;return;}function zv(a){a=a|0;return(i[a+12>>0]|0)!=0|0;}function Av(a){a=a|0;return k[a+8>>2]|0;}function Bv(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=r;r=r+32|0;d=c+16|0;e=c;tv(d,b,24046,35633);tv(e,b,23736,35632);lv(a,b,d,e);vv(e);vv(d);Eu(a+48|0,k[a>>2]|0,b,24500);Eu(a+64|0,k[a>>2]|0,b,24040);Fu(a+80|0,k[a>>2]|0,b,24504);Fu(a+96|0,k[a>>2]|0,b,24513);r=c;return;}function Cv(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=r;r=r+32|0;d=c+16|0;e=c;tv(d,b,24046,35633);tv(e,b,24286,35632);lv(a,b,d,e);vv(e);vv(d);Eu(a+48|0,k[a>>2]|0,b,24500);Fu(a+64|0,k[a>>2]|0,b,24504);Fu(a+80|0,k[a>>2]|0,b,24513);r=c;return;}function Dv(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;k[a>>2]=k[b>>2];d=k[b+4>>2]|0;k[a+4>>2]=d;if(d|0)PN(d);k[a+8>>2]=k[c>>2];c=k[c+4>>2]|0;k[a+12>>2]=c;if(c|0)PN(c);Ev(a+16|0,b);Ev(a+32|0,b);Fv(a+48|0,b);Fv(a+64|0,b);return;}function Ev(a,b){a=a|0;b=b|0;var c=0;c=k[b>>2]|0;k[a>>2]=c;b=k[b+4>>2]|0;k[a+4>>2]=b;if(b){PN(b);c=k[a>>2]|0;}i[a+14>>0]=0;if(c|0)Kv(a);return;}function Fv(a,b){a=a|0;b=b|0;var c=0;c=k[b>>2]|0;k[a>>2]=c;b=k[b+4>>2]|0;k[a+4>>2]=b;if(b){PN(b);c=k[a>>2]|0;}i[a+14>>0]=0;if(c|0)Jv(a);return;}function Gv(a){a=a|0;var b=0,c=0;b=k[a>>2]|0;if(b|0?(c=j[a+12>>1]|0,c<<16>>16==(be[k[(k[b>>2]|0)+12>>2]&255](b)|0)<<16>>16):0){c=k[a>>2]|0;$d[k[(k[c>>2]|0)+20>>2]&255](c,k[a+8>>2]|0);}Dt(a);return;}function Hv(a){a=a|0;var b=0,c=0;b=k[a>>2]|0;if(b|0?(c=j[a+12>>1]|0,c<<16>>16==(be[k[(k[b>>2]|0)+12>>2]&255](b)|0)<<16>>16):0){c=k[a>>2]|0;$d[k[(k[c>>2]|0)+20>>2]&255](c,k[a+8>>2]|0);}Dt(a);return;}function Iv(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function Jv(a){a=a|0;var b=0;b=k[a>>2]|0;b=be[k[(k[b>>2]|0)+12>>2]&255](b)|0;j[a+12>>1]=b;b=k[a>>2]|0;b=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;se[k[(k[b>>2]|0)+124>>2]&63](b,1,a+8|0);return;}function Kv(a){a=a|0;var b=0;b=k[a>>2]|0;b=be[k[(k[b>>2]|0)+12>>2]&255](b)|0;j[a+12>>1]=b;b=k[a>>2]|0;b=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;se[k[(k[b>>2]|0)+124>>2]&63](b,1,a+8|0);return;}function Lv(a){a=a|0;if(!(k[a>>2]|0))return 0;else return(k[a+8>>2]|0)!=0|0;return 0;}function Mv(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;var f=0.0,g=0.0;e=e*.699999988079071;o[a>>2]=e/6.0;o[a+4>>2]=e*1.5;o[a+8>>2]=e*2.5;o[a+12>>2]=e/5.0;f=e*6.099999904632568;o[a+16>>2]=f;o[a+20>>2]=e*1.2999999523162842;o[a+24>>2]=e/3.0;o[a+28>>2]=e*.25;g=+Zs(c,d);f=e*8.0+f;e=g/f;if(e>1.0){e=+Q(+e,.30000001192092896);f=g/e;}o[a+36>>2]=e;o[a+32>>2]=f;return;}function Nv(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0.0,g=0,h=0,j=0.0,m=0,n=0,p=0,q=0,s=0,t=0,u=0,v=0;v=r;r=r+304|0;m=v+256|0;n=v+192|0;p=v+128|0;q=v+64|0;s=v;g=c+28|0;h=c+36|0;if(pt(g,h)|0)a=0;else{Mv(m,0,g,h,+o[c+20>>2]);j=+o[m+36>>2];f=1.0/+ie[k[(k[b>>2]|0)+20>>2]&7](b)/j;f=f<.20000000298023224?.20000000298023224:f;t=n;u=t+48|0;do{k[t>>2]=0;t=t+4|0;}while((t|0)<(u|0));if(Ov(a)|0?Pv(a,m,f,n)|0:0){Qv(p,g,h,j,d);Yd[k[(k[e>>2]|0)+8>>2]&31](e,770,771,1,1);if(i[c+24>>0]|0){it(s,0.0,-1.0);ft(q,s,p);Rv(a,6332,q,b,f,n);}o[q>>2]=+(l[c+16>>0]|0)/255.0;o[q+4>>2]=+(l[c+17>>0]|0)/255.0;o[q+8>>2]=+(l[c+18>>0]|0)/255.0;o[q+12>>2]=1.0;Rv(a,q,p,b,f,n);a=1;}else a=0;}r=v;return a|0;}function Ov(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;f=r;r=r+80|0;e=f;a=a+16|0;if(fw(a)|0)a=1;else{b=e;c=24555;d=b+78|0;do{i[b>>0]=i[c>>0]|0;b=b+1|0;c=c+1|0;}while((b|0)<(d|0));a=gw(a,78,e,35044)|0;}r=f;return a|0;}function Pv(a,b,c,d){a=a|0;b=b|0;c=+c;d=d|0;var e=0,f=0,g=0,h=0,i=0.0,j=0,l=0,m=0,n=0.0,p=0,q=0,s=0,t=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0.0,I=0.0,J=0.0,K=0.0,L=0,M=0.0,N=0,O=0.0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0.0,W=0.0,X=0.0,Y=0.0,Z=0.0,_=0.0,$=0.0,aa=0.0,ba=0.0,ca=0.0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0;v=r;r=r+688|0;R=v+584|0;x=v+528|0;w=v+96|0;g=v+680|0;h=v+88|0;oa=v+80|0;fa=v+72|0;S=v+64|0;z=v+56|0;j=v+672|0;s=v+664|0;l=v+656|0;e=v+648|0;f=v+640|0;da=v;ba=+o[b+32>>2];ca=+o[b+16>>2];W=ba-ca;I=+o[b>>2];V=+o[b+4>>2];o[oa>>2]=-(W*I)/(V-I);o[oa+4>>2]=0.0;o[fa>>2]=W;o[fa+4>>2]=V;I=W-+o[b+20>>2];H=V+ +o[b+8>>2];o[S>>2]=I;o[S+4>>2]=H;p=b+12|0;n=+o[p>>2];o[z>>2]=ba+ca*n/(H-n);o[z+4>>2]=0.0;_s(j,oa,fa);P=j+4|0;n=-+o[P>>2];k[s>>2]=k[j>>2];o[s+4>>2]=n;_s(l,fa,S);_s(e,S,z);n=-+o[e+4>>2];k[f>>2]=k[e>>2];o[f+4>>2]=n;$v(da,j,s,oa,+o[b>>2],c);s=da;q=k[s>>2]|0;s=k[s+4>>2]|0;ja=da+16|0;ka=k[ja>>2]|0;ja=k[ja+4>>2]|0;la=da+24|0;ma=k[la>>2]|0;la=k[la+4>>2]|0;ha=da+32|0;ia=k[ha>>2]|0;ha=k[ha+4>>2]|0;da=da+40|0;ga=k[da>>2]|0;da=k[da+4>>2]|0;t=b+28|0;n=+o[t>>2];aw(R,j,fa,l);aw(x,l,fa,j);m=R+4|0;ca=+o[P>>2]+n*+o[m>>2];o[w>>2]=+o[j>>2]+n*+o[R>>2];o[w+4>>2]=ca;j=x+4|0;ca=+o[l+4>>2]+n*+o[j>>2];o[g>>2]=+o[l>>2]+n*+o[x>>2];o[g+4>>2]=ca;bw(h,w,R,g,x);g=k[h>>2]|0;h=k[h+4>>2]|0;ca=+o[R>>2];ba=+o[m>>2];_=+o[x>>2];Z=+o[j>>2];O=(k[u>>2]=g,+o[u>>2]);aa=O-n*ca;i=(k[u>>2]=h,+o[u>>2]);$=i-n*ba;Y=O-n*_;X=i-n*Z;n=n-c;ca=O-n*ca;ba=i-n*ba;_=O-n*_;Z=i-n*Z;i=-i;j=b+24|0;$v(R,l,e,S,+o[j>>2],c);l=k[R>>2]|0;m=k[R+4>>2]|0;n=-(k[u>>2]=m,+o[u>>2]);P=k[R+16>>2]|0;U=k[R+20>>2]|0;N=k[R+24>>2]|0;T=k[R+28>>2]|0;O=-(k[u>>2]=U,+o[u>>2]);M=-(k[u>>2]=T,+o[u>>2]);L=k[R+32>>2]|0;Q=k[R+36>>2]|0;y=k[R+40>>2]|0;R=k[R+44>>2]|0;K=-(k[u>>2]=Q,+o[u>>2]);J=-(k[u>>2]=R,+o[u>>2]);$v(x,e,f,z,+o[p>>2],c);f=x;e=k[f>>2]|0;f=k[f+4>>2]|0;F=x+16|0;G=k[F>>2]|0;F=k[F+4>>2]|0;D=x+24|0;E=k[D>>2]|0;D=k[D+4>>2]|0;B=x+32|0;C=k[B>>2]|0;B=k[B+4>>2]|0;x=x+40|0;A=k[x>>2]|0;x=k[x+4>>2]|0;na=k[oa+4>>2]|0;ea=w;k[ea>>2]=k[oa>>2];k[ea+4>>2]=na;o[w+8>>2]=0.0;ea=w+12|0;k[ea>>2]=ma;k[ea+4>>2]=la;o[w+20>>2]=0.0;ea=w+24|0;k[ea>>2]=ka;k[ea+4>>2]=ja;o[w+32>>2]=1.0;ea=w+36|0;k[ea>>2]=q;k[ea+4>>2]=s;o[w+44>>2]=1.0;ea=w+48|0;k[ea>>2]=ia;k[ea+4>>2]=ha;o[w+56>>2]=1.0;ea=w+60|0;k[ea>>2]=ga;k[ea+4>>2]=da;o[w+68>>2]=0.0;k[w+72>>2]=g;k[w+76>>2]=h;o[w+80>>2]=0.0;o[w+84>>2]=ca;o[w+88>>2]=ba;o[w+92>>2]=0.0;o[w+96>>2]=aa;o[w+100>>2]=$;o[w+104>>2]=1.0;o[w+108>>2]=_;o[w+112>>2]=Z;o[w+116>>2]=0.0;o[w+120>>2]=Y;o[w+124>>2]=X;o[w+128>>2]=1.0;ea=k[fa+4>>2]|0;da=w+132|0;k[da>>2]=k[fa>>2];k[da+4>>2]=ea;o[w+140>>2]=1.0;k[w+144>>2]=g;o[w+148>>2]=i;o[w+152>>2]=0.0;o[w+156>>2]=ca;o[w+160>>2]=-ba;o[w+164>>2]=0.0;o[w+168>>2]=aa;o[w+172>>2]=-$;o[w+176>>2]=1.0;o[w+180>>2]=_;o[w+184>>2]=-Z;o[w+188>>2]=0.0;o[w+192>>2]=Y;o[w+196>>2]=-X;o[w+200>>2]=1.0;o[w+204>>2]=W;o[w+208>>2]=-V;o[w+212>>2]=1.0;k[w+216>>2]=l;k[w+220>>2]=m;o[w+224>>2]=1.0;k[w+228>>2]=P;k[w+232>>2]=U;o[w+236>>2]=1.0;k[w+240>>2]=N;k[w+244>>2]=T;o[w+248>>2]=0.0;k[w+252>>2]=L;k[w+256>>2]=Q;o[w+260>>2]=1.0;k[w+264>>2]=y;k[w+268>>2]=R;o[w+272>>2]=0.0;R=k[S+4>>2]|0;Q=w+276|0;k[Q>>2]=k[S>>2];k[Q+4>>2]=R;o[w+284>>2]=0.0;k[w+288>>2]=l;o[w+292>>2]=n;o[w+296>>2]=1.0;k[w+300>>2]=P;o[w+304>>2]=O;o[w+308>>2]=1.0;k[w+312>>2]=N;o[w+316>>2]=M;o[w+320>>2]=0.0;k[w+324>>2]=L;o[w+328>>2]=K;o[w+332>>2]=1.0;k[w+336>>2]=y;o[w+340>>2]=J;o[w+344>>2]=0.0;o[w+348>>2]=I;o[w+352>>2]=-H;o[w+356>>2]=0.0;y=w+360|0;k[y>>2]=e;k[y+4>>2]=f;o[w+368>>2]=1.0;y=w+372|0;k[y>>2]=G;k[y+4>>2]=F;o[w+380>>2]=1.0;y=w+384|0;k[y>>2]=E;k[y+4>>2]=D;o[w+392>>2]=0.0;y=w+396|0;k[y>>2]=C;k[y+4>>2]=B;o[w+404>>2]=1.0;y=w+408|0;k[y>>2]=A;k[y+4>>2]=x;o[w+416>>2]=0.0;y=k[z+4>>2]|0;x=w+420|0;k[x>>2]=k[z>>2];k[x+4>>2]=y;o[w+428>>2]=0.0;if(cw(a+48|0,432,w,35044)|0){oa=d;k[oa>>2]=q;k[oa+4>>2]=s;oa=d+8|0;k[oa>>2]=e;k[oa+4>>2]=f;k[d+16>>2]=l;k[d+20>>2]=m;k[d+32>>2]=l;o[d+36>>2]=n;k[d+24>>2]=g;k[d+28>>2]=h;k[d+40>>2]=g;o[d+44>>2]=i;k[d+48>>2]=k[b>>2];k[d+52>>2]=k[p>>2];k[d+56>>2]=k[j>>2];k[d+60>>2]=k[t>>2];e=1;}else e=0;r=v;return e|0;}function Qv(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;var f=0.0,g=0.0,h=0.0,i=0.0,j=0,k=0,l=0,m=0,n=0;n=r;r=r+256|0;j=n+192|0;k=n+128|0;l=n+64|0;m=n;i=+o[b>>2];g=+o[c>>2]-i;h=+o[b+4>>2];f=+o[c+4>>2]-h;if(+O(+g)<9.99999993922529e-09){if(+O(+f)<9.99999993922529e-09)f=0.0;else f=f>0.0?1.570796251296997:-1.570796251296997;}else f=+X(+f,+g);it(k,i+ +o[e>>2]+-1.0,h+ +o[e+4>>2]+-1.0);kt(l,f,0.0,0.0);ft(j,k,l);jt(m,d,d);ft(a,j,m);r=n;return;}function Rv(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;f=f|0;var g=0,h=0,i=0,j=0,l=0,m=0;g=r;r=r+128|0;i=g+64|0;l=g;h=k[a>>2]|0;h=be[k[(k[h>>2]|0)+8>>2]&255](h)|0;a=a+8|0;j=k[a>>2]|0;j=be[k[(k[j>>2]|0)+16>>2]&255](j)|0;a=k[a>>2]|0;a=be[k[(k[a>>2]|0)+20>>2]&255](a)|0;m=be[k[(k[d>>2]|0)+8>>2]&255](d)|0;ft(l,m,be[k[(k[d>>2]|0)+12>>2]&255](d)|0);ft(i,l,c);pv(j);Sv(j+48|0,i);Tv(j+64|0,b);Uv(j+80|0,12,0);Vv(j+96|0,12,8);Yd[k[(k[h>>2]|0)+104>>2]&31](h,6,18,5121,0);Yd[k[(k[h>>2]|0)+104>>2]&31](h,5,4,5121,18);Yd[k[(k[h>>2]|0)+104>>2]&31](h,5,4,5121,22);Yd[k[(k[h>>2]|0)+104>>2]&31](h,5,4,5121,26);Yd[k[(k[h>>2]|0)+104>>2]&31](h,5,4,5121,30);Yd[k[(k[h>>2]|0)+104>>2]&31](h,5,4,5121,34);Yd[k[(k[h>>2]|0)+104>>2]&31](h,5,4,5121,38);Wv(j);pv(a+4|0);Sv(a+52|0,i);i=a+68|0;Xv(i,e);c=a+84|0;Xv(c,+o[f+48>>2]);Tv(a+100|0,b);d=a+116|0;Yv(d,f);Uv(a+132|0,12,0);Yd[k[(k[h>>2]|0)+104>>2]&31](h,6,6,5121,42);Xv(c,+o[f+52>>2]);Yv(d,f+8|0);Yd[k[(k[h>>2]|0)+104>>2]&31](h,6,6,5121,48);Xv(c,+o[f+56>>2]);Yv(d,f+16|0);Yd[k[(k[h>>2]|0)+104>>2]&31](h,6,6,5121,54);Yv(d,f+32|0);Yd[k[(k[h>>2]|0)+104>>2]&31](h,6,6,5121,60);Xv(i,-e);Xv(c,+o[f+60>>2]);Yv(d,f+24|0);Yd[k[(k[h>>2]|0)+104>>2]&31](h,6,6,5121,66);Yv(d,f+40|0);Yd[k[(k[h>>2]|0)+104>>2]&31](h,6,6,5121,72);_d[k[k[a>>2]>>2]&511](a);r=g;return;}function Sv(a,b){a=a|0;b=b|0;var c=0;c=Zv(a)|0;a=k[a+4>>2]|0;a=be[k[(k[a>>2]|0)+8>>2]&255](a)|0;Yd[k[(k[a>>2]|0)+220>>2]&31](a,c,1,0,b);return;}function Tv(a,b){a=a|0;b=b|0;var c=0;c=Zv(a)|0;a=k[a+4>>2]|0;a=be[k[(k[a>>2]|0)+8>>2]&255](a)|0;we[k[(k[a>>2]|0)+216>>2]&31](a,c,1,b);return;}function Uv(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;d=k[a+4>>2]|0;d=be[k[(k[d>>2]|0)+8>>2]&255](d)|0;a=de[k[(k[d>>2]|0)+140>>2]&63](d,k[a>>2]|0,k[a+12>>2]|0)|0;$d[k[(k[d>>2]|0)+112>>2]&255](d,a);le[k[(k[d>>2]|0)+228>>2]&3](d,a,2,5126,0,b,0+c|0);return;}function Vv(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;d=k[a+4>>2]|0;d=be[k[(k[d>>2]|0)+8>>2]&255](d)|0;a=de[k[(k[d>>2]|0)+140>>2]&63](d,k[a>>2]|0,k[a+12>>2]|0)|0;$d[k[(k[d>>2]|0)+112>>2]&255](d,a);le[k[(k[d>>2]|0)+228>>2]&3](d,a,1,5126,0,b,0+c|0);return;}function Wv(a){a=a|0;hv(a+80|0);_v(a+96|0);return;}function Xv(a,b){a=a|0;b=+b;var c=0;c=Zv(a)|0;a=k[a+4>>2]|0;a=be[k[(k[a>>2]|0)+8>>2]&255](a)|0;ue[k[(k[a>>2]|0)+208>>2]&7](a,c,b);return;}function Yv(a,b){a=a|0;b=b|0;var c=0;c=Zv(a)|0;a=k[a+4>>2]|0;a=be[k[(k[a>>2]|0)+8>>2]&255](a)|0;we[k[(k[a>>2]|0)+212>>2]&31](a,c,1,b);return;}function Zv(a){a=a|0;var b=0;b=k[a+4>>2]|0;b=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;return de[k[(k[b>>2]|0)+168>>2]&63](b,k[a>>2]|0,k[a+12>>2]|0)|0;}function _v(a){a=a|0;var b=0;b=k[a+4>>2]|0;b=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;a=de[k[(k[b>>2]|0)+140>>2]&63](b,k[a>>2]|0,k[a+12>>2]|0)|0;$d[k[(k[b>>2]|0)+100>>2]&255](b,a);return;}function $v(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;f=+f;var g=0,h=0.0,i=0.0,j=0.0,l=0.0,m=0.0,n=0.0,p=0,q=0,s=0,t=0,v=0,w=0,x=0,y=0,z=0;g=r;r=r+48|0;x=g+32|0;t=g+24|0;z=g+16|0;y=g+8|0;p=g;v=a+12+12|0;k[v>>2]=0;k[v+4>>2]=0;k[v+8>>2]=0;k[v+12>>2]=0;k[v+16>>2]=0;k[v+20>>2]=0;k[v+24>>2]=0;aw(x,b,d,c);aw(t,c,d,b);v=b+4|0;w=x+4|0;n=+o[v>>2]+ +o[w>>2]*e;o[z>>2]=+o[b>>2]+ +o[x>>2]*e;o[z+4>>2]=n;q=c+4|0;s=t+4|0;n=+o[q>>2]+ +o[s>>2]*e;o[y>>2]=+o[c>>2]+ +o[t>>2]*e;o[y+4>>2]=n;bw(p,z,x,y,t);d=p;p=k[d>>2]|0;d=k[d+4>>2]|0;y=a;k[y>>2]=p;k[y+4>>2]=d;n=+o[x>>2];m=+o[w>>2];j=+o[v>>2]-m*f;o[a+8>>2]=+o[b>>2]-n*f;o[a+12>>2]=j;j=+o[t>>2];h=+o[s>>2];l=+o[q>>2]-h*f;o[a+48>>2]=+o[c>>2]-j*f;o[a+52>>2]=l;l=(k[u>>2]=p,+o[u>>2]);i=(k[u>>2]=d,+o[u>>2]);o[a+16>>2]=l-n*e;o[a+20>>2]=i-m*e;o[a+32>>2]=l-j*e;o[a+36>>2]=i-h*e;f=e+f;o[a+24>>2]=l-f*n;o[a+28>>2]=i-f*m;o[a+40>>2]=l-f*j;o[a+44>>2]=i-f*h;r=g;return;}function aw(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0;f=r;r=r+32|0;h=f+16|0;g=f+8|0;e=f;mt(h,c,b);bt(g,h);at(a,g);mt(g,d,b);if(+$s(a,g)<0.0){ct(e,a);g=k[e+4>>2]|0;h=a;k[h>>2]=k[e>>2];k[h+4>>2]=g;}r=f;return;}function bw(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0.0,g=0.0,h=0.0,i=0.0,j=0.0,k=0.0,l=0.0;j=+o[c>>2];k=+o[c+4>>2];g=j*+o[b>>2]+k*+o[b+4>>2];h=+o[e>>2];l=+o[e+4>>2];i=h*+o[d>>2]+l*+o[d+4>>2];f=j*l-k*h;o[a>>2]=(g*l-k*i)/f;o[a+4>>2]=(j*i-h*g)/f;return;}function cw(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=k[a>>2]|0;if(e){f=j[a+12>>1]|0;if(f<<16>>16!=(be[k[(k[e>>2]|0)+12>>2]&255](e)|0)<<16>>16)Jv(a);if(dw(a)|0){f=k[a>>2]|0;f=be[k[(k[f>>2]|0)+8>>2]&255](f)|0;Yd[k[(k[f>>2]|0)+40>>2]&31](f,34962,b,c,d);f=ew(a,24527)|0;i[a+14>>0]=f&1;a=f;}else a=0;}else a=0;return a|0;}function dw(a){a=a|0;var b=0;b=k[a>>2]|0;b=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;se[k[(k[b>>2]|0)+20>>2]&63](b,34962,k[a+8>>2]|0);return ew(a,24541)|0;}function ew(a,b){a=a|0;b=b|0;var c=0;b=k[a>>2]|0;b=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;b=be[k[(k[b>>2]|0)+144>>2]&255](b)|0;c=1;while(1){if(!b)break;b=k[a>>2]|0;b=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;b=be[k[(k[b>>2]|0)+144>>2]&255](b)|0;c=0;}return c|0;}function fw(a){a=a|0;var b=0,c=0;b=k[a>>2]|0;if(((b|0)!=0?(i[a+14>>0]|0)!=0:0)?(c=j[a+12>>1]|0,c<<16>>16==(be[k[(k[b>>2]|0)+12>>2]&255](b)|0)<<16>>16):0)a=hw(a)|0;else a=0;return a|0;}function gw(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=k[a>>2]|0;if(e){f=j[a+12>>1]|0;if(f<<16>>16!=(be[k[(k[e>>2]|0)+12>>2]&255](e)|0)<<16>>16)Kv(a);if(hw(a)|0){f=k[a>>2]|0;f=be[k[(k[f>>2]|0)+8>>2]&255](f)|0;Yd[k[(k[f>>2]|0)+40>>2]&31](f,34963,b,c,d);f=iw(a,24527)|0;i[a+14>>0]=f&1;a=f;}else a=0;}else a=0;return a|0;}function hw(a){a=a|0;var b=0;b=k[a>>2]|0;b=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;se[k[(k[b>>2]|0)+20>>2]&63](b,34963,k[a+8>>2]|0);return iw(a,24541)|0;}function iw(a,b){a=a|0;b=b|0;var c=0;b=k[a>>2]|0;b=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;b=be[k[(k[b>>2]|0)+144>>2]&255](b)|0;c=1;while(1){if(!b)break;b=k[a>>2]|0;b=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;b=be[k[(k[b>>2]|0)+144>>2]&255](b)|0;c=0;}return c|0;}function jw(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,l=0,n=0,p=0,q=0;q=r;r=r+240|0;h=q+192|0;j=q+128|0;l=q+232|0;n=q+64|0;p=q;f=c+28|0;g=c+36|0;if(pt(f,g)|0)a=0;else{Mv(h,0,f,g,+o[c+20>>2]);if(kw(a)|0?lw(a,h)|0:0){Qv(j,f,g,+o[h+36>>2],d);k[n>>2]=m[e>>1]|m[e+2>>1]<<16;i[n+4>>0]=0;jB(l,n);h=k[a+8>>2]|0;h=be[k[(k[h>>2]|0)+16>>2]&255](h)|0;pv(h);e=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;ft(p,e,be[k[(k[b>>2]|0)+12>>2]&255](b)|0);ft(n,p,j);Sv(h+48|0,n);mw(n,l);Tv(h+64|0,n);Uv(h+80|0,12,0);Vv(h+96|0,12,8);a=k[a>>2]|0;a=be[k[(k[a>>2]|0)+8>>2]&255](a)|0;Yd[k[(k[a>>2]|0)+104>>2]&31](a,6,7,5121,0);Wv(h);a=1;}else a=0;}r=q;return a|0;}function kw(a){a=a|0;var b=0,c=0;c=r;r=r+16|0;b=c;a=a+32|0;if(fw(a)|0)a=1;else{i[b>>0]=i[24633]|0;i[b+1>>0]=i[24634]|0;i[b+2>>0]=i[24635]|0;i[b+3>>0]=i[24636]|0;i[b+4>>0]=i[24637]|0;i[b+5>>0]=i[24638]|0;i[b+6>>0]=i[24639]|0;a=gw(a,7,b,35044)|0;}r=c;return a|0;}function lw(a,b){a=a|0;b=b|0;var c=0,d=0,e=0.0,f=0.0,g=0.0,h=0.0,i=0.0,j=0,l=0.0,m=0.0,n=0.0;c=r;r=r+96|0;d=c;n=+o[b+32>>2];m=+o[b+16>>2];h=n-m;j=k[b>>2]|0;i=-(k[u>>2]=j,+o[u>>2]);g=+o[b+4>>2];f=h-+o[b+20>>2];e=g+ +o[b+8>>2];l=+o[b+12>>2];o[d>>2]=n+m*l/(e-l);k[d+4>>2]=0;o[d+8>>2]=1.0;o[d+12>>2]=f;o[d+16>>2]=e;o[d+20>>2]=1.0;o[d+24>>2]=h;o[d+28>>2]=g;o[d+32>>2]=1.0;k[d+36>>2]=0;k[d+40>>2]=j;o[d+44>>2]=1.0;k[d+48>>2]=0;o[d+52>>2]=i;o[d+56>>2]=1.0;o[d+60>>2]=h;o[d+64>>2]=-g;o[d+68>>2]=1.0;o[d+72>>2]=f;o[d+76>>2]=-e;o[d+80>>2]=1.0;b=cw(a+64|0,84,d,35044)|0;r=c;return b|0;}function mw(a,b){a=a|0;b=b|0;nw(a,+(l[b>>0]|0)/255.0,+(l[b+1>>0]|0)/255.0,+(l[b+2>>0]|0)/255.0,+(l[b+3>>0]|0)/255.0);return;}function nw(a,b,c,d,e){a=a|0;b=+b;c=+c;d=+d;e=+e;o[a>>2]=b<0.0?0.0:b>1.0?1.0:b;o[a+4>>2]=c<0.0?0.0:c>1.0?1.0:c;o[a+8>>2]=d<0.0?0.0:d>1.0?1.0:d;o[a+12>>2]=e<0.0?0.0:e>1.0?1.0:e;return;}function ow(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;k[a>>2]=k[b>>2];e=k[b+4>>2]|0;k[a+4>>2]=e;if(e|0)PN(e);k[a+8>>2]=k[c>>2];c=k[c+4>>2]|0;k[a+12>>2]=c;if(c|0)PN(c);k[a+16>>2]=k[d>>2];c=k[d+4>>2]|0;k[a+20>>2]=c;if(c|0)PN(c);Fv(a+24|0,b);Ev(a+40|0,b);return;}function pw(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function qw(a){a=a|0;if(k[a>>2]|0?k[a+8>>2]|0:0)return(k[a+16>>2]|0)!=0|0;return 0;}function rw(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0,n=0,p=0;n=r;r=r+256|0;m=n+240|0;e=n+224|0;f=n+144|0;l=n+160|0;g=n+80|0;h=n+16|0;i=n;j=c+16|0;p=k[a+16>>2]|0;se[k[(k[p>>2]|0)+16>>2]&63](m,p,j);c=c+28|0;k[e>>2]=k[c>>2];k[e+4>>2]=k[c+4>>2];k[e+8>>2]=k[c+8>>2];k[e+12>>2]=k[c+12>>2];c=k[m>>2]|0;if(c){if(((!(+O(+(+o[e+8>>2]-+o[e>>2]))<9.99999993922529e-09)?!(+O(+(+o[e+12>>2]-+o[e+4>>2]))<9.99999993922529e-09):0)?(be[k[(k[c>>2]|0)+8>>2]&255](c)|0)!=0:0)?(p=k[m>>2]|0,(be[k[(k[p>>2]|0)+12>>2]&255](p)|0)!=0):0){p=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;ft(g,p,be[k[(k[b>>2]|0)+12>>2]&255](b)|0);sw(h,0,k[m>>2]|0,e);ft(l,g,h);a:do if(tw(a)|0){Yd[k[(k[d>>2]|0)+8>>2]&31](d,770,771,1,1);c=k[m>>2]|0;c=be[k[(k[c>>2]|0)+16>>2]&255](c)|0;b=k[c+4>>2]|0;c=k[c>>2]|0;while(1){if((c|0)==(b|0)){c=1;break a;}d=k[c>>2]|0;if(!d){bO(i,j);dO(i);}else uw(a,d,l);c=c+8|0;}}else c=0;while(0);}else c=0;}else{bO(f,j);dO(f);c=0;}su(m);r=n;return c|0;}function sw(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0.0,f=0.0,g=0,h=0,i=0;h=r;r=r+128|0;b=h+64|0;g=h;i=d+12|0;it(a,+o[d>>2],+o[i>>2]);f=+o[d+8>>2]-+o[d>>2];f=f/+((be[k[(k[c>>2]|0)+8>>2]&255](c)|0)>>>0);e=+o[i>>2]-+o[d+4>>2];e=e/+((be[k[(k[c>>2]|0)+12>>2]&255](c)|0)>>>0);if(!(+O(+(f+-1.0))<9.99999993922529e-09?+O(+(e+-1.0))<9.99999993922529e-09:0)){jt(g,f,e);ft(b,a,g);c=a+64|0;do{k[a>>2]=k[b>>2];a=a+4|0;b=b+4|0;}while((a|0)<(c|0));}r=h;return;}function tw(a){a=a|0;var b=0,c=0;b=r;r=r+16|0;c=b;k[c>>2]=50462976;a=gw(a+40|0,4,c,35044)|0;r=b;return a|0;}function uw(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0.0,j=0.0,l=0,m=0.0,n=0,p=0.0;e=r;r=r+64|0;f=e;g=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;m=+(k[g>>2]|0);p=-+(k[g+4>>2]|0);j=m+ +(k[g+8>>2]|0);i=p-+(k[g+12>>2]|0);l=k[g+16>>2]|0;n=k[g+20>>2]|0;h=k[g+24>>2]|0;g=k[g+28>>2]|0;o[f>>2]=m;o[f+4>>2]=p;k[f+8>>2]=l;k[f+12>>2]=n;o[f+16>>2]=j;o[f+20>>2]=p;k[f+24>>2]=h;k[f+28>>2]=n;o[f+32>>2]=m;o[f+36>>2]=i;k[f+40>>2]=l;k[f+44>>2]=g;o[f+48>>2]=j;o[f+52>>2]=i;k[f+56>>2]=h;k[f+60>>2]=g;if(cw(a+24|0,64,f,35044)|0?(d=k[a+8>>2]|0,d=be[k[(k[d>>2]|0)+8>>2]&255](d)|0,pv(d),be[k[(k[b>>2]|0)+12>>2]&255](b)|0):0){Sv(d+48|0,c);Uv(d+64|0,16,0);Uv(d+80|0,16,8);n=k[a>>2]|0;n=be[k[(k[n>>2]|0)+8>>2]&255](n)|0;Yd[k[(k[n>>2]|0)+104>>2]&31](n,5,4,5121,0);vw(d);}r=e;return;}function vw(a){a=a|0;hv(a+64|0);hv(a+80|0);return;}function ww(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;k[a>>2]=k[b>>2];d=k[b+4>>2]|0;k[a+4>>2]=d;if(d|0)PN(d);k[a+8>>2]=k[c>>2];c=k[c+4>>2]|0;k[a+12>>2]=c;if(c|0)PN(c);Ev(a+16|0,b);Fv(a+32|0,b);return;}function xw(a){a=a|0;if(!(k[a>>2]|0))return 0;else return(k[a+8>>2]|0)!=0|0;return 0;}function yw(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0.0,l=0.0,m=0;i=r;r=r+112|0;e=i+88|0;f=i+72|0;g=i+8|0;h=i;if(zw(a)|0){o[f>>2]=0.0;o[f+4>>2]=0.0;m=be[k[(k[b>>2]|0)+16>>2]&255](b)|0;l=+((k[m>>2]|0)>>>0);m=(be[k[(k[b>>2]|0)+16>>2]&255](b)|0)+4|0;j=+((k[m>>2]|0)>>>0);o[g>>2]=l;o[g+4>>2]=j;st(e,f,g);o[g>>2]=0.0;o[g+4>>2]=0.0;o[h>>2]=1.0;o[h+4>>2]=1.0;st(f,g,h);if(Aw(a,e,f)|0){gt(g);o[h>>2]=1.0;o[h+4>>2]=0.0;Bw(a,g,h,b,c,d);a=1;}else a=0;}else a=0;r=i;return a|0;}function zw(a){a=a|0;var b=0,c=0;c=r;r=r+16|0;b=c;a=a+16|0;if(fw(a)|0)a=1;else{k[b>>2]=50462976;a=gw(a,4,b,35044)|0;}r=c;return a|0;}function Aw(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;d=r;r=r+64|0;e=d;f=k[b>>2]|0;i=k[b+12>>2]|0;k[e>>2]=f;k[e+4>>2]=i;j=k[c>>2]|0;h=k[c+12>>2]|0;k[e+8>>2]=j;k[e+12>>2]=h;g=k[b+4>>2]|0;k[e+16>>2]=f;k[e+20>>2]=g;f=k[c+4>>2]|0;k[e+24>>2]=j;k[e+28>>2]=f;b=k[b+8>>2]|0;k[e+32>>2]=b;k[e+36>>2]=i;c=k[c+8>>2]|0;k[e+40>>2]=c;k[e+44>>2]=h;k[e+48>>2]=b;k[e+52>>2]=g;k[e+56>>2]=c;k[e+60>>2]=f;c=cw(a+32|0,64,e,35044)|0;r=d;return c|0;}function Bw(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0.0,l=0.0,m=0.0;g=r;r=r+16|0;i=g;h=k[a+8>>2]|0;h=be[k[(k[h>>2]|0)+12>>2]&255](h)|0;pv(h);_d[k[(k[e>>2]|0)+8>>2]&511](e);j=+ie[k[(k[d>>2]|0)+20>>2]&7](d)*10.0;j=j<4.0?4.0:j;e=be[k[(k[d>>2]|0)+16>>2]&255](d)|0;m=+((k[e>>2]|0)>>>0);e=(be[k[(k[d>>2]|0)+16>>2]&255](d)|0)+4|0;l=+((k[e>>2]|0)>>>0);o[i>>2]=m;o[i+4>>2]=l;Sv(h+48|0,be[k[(k[d>>2]|0)+8>>2]&255](d)|0);Sv(h+64|0,b);Xv(h+80|0,j>40.0?40.0:j);Yv(h+96|0,c);Yv(h+112|0,i);Uv(h+128|0,16,0);Uv(h+144|0,16,8);Yd[k[(k[f>>2]|0)+8>>2]&31](f,1,0,1,0);f=k[a>>2]|0;f=be[k[(k[f>>2]|0)+8>>2]&255](f)|0;Yd[k[(k[f>>2]|0)+104>>2]&31](f,5,4,5121,0);Cw(h);r=g;return;}function Cw(a){a=a|0;hv(a+128|0);hv(a+144|0);return;}function Dw(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0;j=r;r=r+48|0;g=j+24|0;h=j+8|0;i=j;yt(g,c+16|0,e);if(!(vt(g)|0)){if(zw(a)|0){Ew(h,0,b,g);if(Aw(a,g,h)|0){o[i>>2]=0.0;o[i+4>>2]=1.0;Bw(a,be[k[(k[b>>2]|0)+12>>2]&255](b)|0,i,b,d,f);a=1;}else a=0;}else a=0;}else a=1;r=j;return a|0;}function Ew(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0.0,h=0,i=0,j=0,l=0;b=r;r=r+32|0;i=b+24|0;h=b+16|0;f=b+8|0;e=b;j=k[(k[c>>2]|0)+28>>2]|0;l=k[d+4>>2]|0;k[h>>2]=k[d>>2];k[h+4>>2]=l;se[j&63](i,c,h);j=k[(k[c>>2]|0)+28>>2]|0;l=k[d+12>>2]|0;k[f>>2]=k[d+8>>2];k[f+4>>2]=l;se[j&63](h,c,f);g=1.0-+o[i+4>>2];k[f>>2]=k[i>>2];o[f+4>>2]=g;g=1.0-+o[h+4>>2];k[e>>2]=k[h>>2];o[e+4>>2]=g;st(a,f,e);r=b;return;}function Fw(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;k[a>>2]=k[b>>2];d=k[b+4>>2]|0;k[a+4>>2]=d;if(d|0)PN(d);k[a+8>>2]=k[c>>2];c=k[c+4>>2]|0;k[a+12>>2]=c;if(c|0)PN(c);d=a+16|0;k[d>>2]=0;k[d+4>>2]=0;k[d+8>>2]=0;k[d+12>>2]=0;o[a+32>>2]=1.0;Ev(a+36|0,b);Fv(a+52|0,b);Ev(a+68|0,b);Fv(a+84|0,b);return;}function Gw(a){a=a|0;var b=0;Hw(a,k[a+8>>2]|0);b=k[a>>2]|0;k[a>>2]=0;if(b|0)YN(b);return;}function Hw(a,b){a=a|0;b=b|0;while(1){if(!b)break;a=k[b>>2]|0;Iw(b+8|0);YN(b);b=a;}return;}function Iw(a){a=a|0;Jw(a+12|0);dO(a);return;}function Jw(a){a=a|0;var b=0,c=0,d=0;c=k[a>>2]|0;if(c|0){a=a+4|0;b=k[a>>2]|0;while(1){if((b|0)==(c|0))break;d=b+-28|0;k[a>>2]=d;b=d;}YN(c);}return;}function Kw(a){a=a|0;if(!(k[a>>2]|0))return 0;else return(k[a+8>>2]|0)!=0|0;return 0;}function Lw(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,m=0;m=r;r=r+192|0;g=m+128|0;h=m+64|0;j=m;f=Mw(a,c)|0;if(!f)f=0;else{f=f+20|0;sx(f,c);Yd[k[(k[e>>2]|0)+8>>2]&31](e,770,771,1,1);it(g,+o[d>>2],+o[d+4>>2]);if(i[c+24>>0]|0){it(j,0.0,-1.0);ft(h,j,g);Nw(a,c,f,b,h,6348)|0;}o[h>>2]=+(l[c+16>>0]|0)/255.0;o[h+4>>2]=+(l[c+17>>0]|0)/255.0;o[h+8>>2]=+(l[c+18>>0]|0)/255.0;o[h+12>>2]=1.0;f=Nw(a,c,f,b,g,h)|0;}r=m;return f|0;}function Mw(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0.0,g=0.0,h=0,j=0,l=0,m=0,n=0,p=0,q=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0;D=r;r=r+128|0;y=D+104|0;C=D+64|0;A=D+12|0;B=D;z=a+16|0;x=fx(z,b)|0;c=x;if(!x){rx(C);bO(A,b);gx(A+12|0,C);x=A+24|0;u=C+12|0;k[x>>2]=k[u>>2];k[x+4>>2]=k[u+4>>2];k[x+8>>2]=k[u+8>>2];k[x+12>>2]=k[u+12>>2];k[x+16>>2]=k[u+16>>2];k[x+20>>2]=k[u+20>>2];k[x+24>>2]=k[u+24>>2];x=uu(a+28|0,A)|0;u=a+20|0;h=k[u>>2]|0;v=(h|0)==0;a:do if(!v){n=h+-1|0;p=(n&h|0)==0;if(p)q=n&x;else q=(x>>>0)%(h>>>0)|0;c=k[(k[z>>2]|0)+(q<<2)>>2]|0;if(!c){c=q;w=20;}else{s=A+11|0;t=A+4|0;b:while(1){c=k[c>>2]|0;if(!c){c=q;w=20;break a;}d=k[c+4>>2]|0;if(p)d=d&n;else d=(d>>>0)%(h>>>0)|0;if((d|0)!=(q|0)){c=q;w=20;break a;}d=c+8|0;j=i[d+11>>0]|0;l=j<<24>>24<0;j=j&255;m=l?k[c+12>>2]|0:j;E=i[s>>0]|0;e=E<<24>>24<0;if((m|0)!=((e?k[t>>2]|0:E&255)|0))continue;e=e?k[A>>2]|0:A;if(l)if(!(no(k[d>>2]|0,e,m)|0)){d=1;break;}else continue;while(1){if(!j){d=1;break a;}if((i[d>>0]|0)!=(i[e>>0]|0))continue b;j=j+-1|0;e=e+1|0;d=d+1|0;}}}}else{c=0;w=20;}while(0);if((w|0)==20){hx(y,z,x,A);j=a+28|0;f=+(((k[j>>2]|0)+1|0)>>>0);g=+o[a+32>>2];do if(v|f>+(h>>>0)*g){c=(h>>>0>2&(h+-1&h|0)==0&1|h<<1)^1;d=~~+_(+(f/g))>>>0;ix(z,c>>>0<d>>>0?d:c);c=k[u>>2]|0;d=c+-1|0;if(!(d&c)){h=c;c=d&x;break;}else{h=c;c=(x>>>0)%(c>>>0)|0;break;}}while(0);d=k[(k[z>>2]|0)+(c<<2)>>2]|0;if(!d){e=a+24|0;k[k[y>>2]>>2]=k[e>>2];k[e>>2]=k[y>>2];k[(k[z>>2]|0)+(c<<2)>>2]=e;e=k[y>>2]|0;c=k[e>>2]|0;if(!c)c=y;else{c=k[c+4>>2]|0;d=h+-1|0;if(!(d&h))c=c&d;else c=(c>>>0)%(h>>>0)|0;k[(k[z>>2]|0)+(c<<2)>>2]=e;c=y;}}else{k[k[y>>2]>>2]=k[d>>2];k[d>>2]=k[y>>2];c=y;}E=k[c>>2]|0;k[j>>2]=(k[j>>2]|0)+1;k[c>>2]=0;d=0;c=E;}jx(A);if(d){bO(B,b);dO(B);c=0;}Jw(C);}r=D;return c|0;}function Nw(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0;j=r;r=r+48|0;g=j+36|0;h=j+32|0;i=j;if((k[b+28>>2]|0)==(k[b+32>>2]|0))a=0;else if(Ow(a,b,c,d,e,f,1,g,h)|0){Pw(i,b,c);Qw(a,i,i+8|0,+o[g>>2],d,e,f)|0;Qw(a,i+16|0,i+24|0,+o[h>>2],d,e,f)|0;a=1;}else a=0;r=j;return a|0;}function Ow(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0.0,l=0.0,m=0.0,n=0,p=0,q=0,s=0,t=0,u=0,v=0,w=0,x=0;v=r;r=r+144|0;u=v+72|0;s=v+8|0;t=v;b=b+20|0;k[h>>2]=k[b>>2];k[i>>2]=k[b>>2];p=c+4|0;if(((k[c>>2]|0)!=(k[p>>2]|0)?Tw(a)|0:0)?Uw(a)|0:0){q=k[a>>2]|0;q=be[k[(k[q>>2]|0)+8>>2]&255](q)|0;j=1.0/+ie[k[(k[d>>2]|0)+20>>2]&7](d);j=j<.20000000298023224?.20000000298023224:j;n=k[a+8>>2]|0;n=be[k[(k[n>>2]|0)+24>>2]&255](n)|0;pv(n);a=be[k[(k[d>>2]|0)+8>>2]&255](d)|0;ft(s,a,be[k[(k[d>>2]|0)+12>>2]&255](d)|0);ft(u,s,e);Sv(n+48|0,u);Xv(n+112|0,j);Tv(n+160|0,f);Vv(n+176|0,12,0);Vv(n+192|0,12,4);Vv(n+208|0,12,8);m=+o[b>>2];m=g?m:j+m;b=k[c>>2]|0;j=+o[b+24>>2];o[h>>2]=j*m;a=n+64|0;d=n+80|0;e=n+96|0;f=n+128|0;c=n+144|0;while(1){if((b|0)==(k[p>>2]|0))break;x=b;w=k[x+4>>2]|0;h=u;k[h>>2]=k[x>>2];k[h+4>>2]=w;h=b+8|0;w=k[h+4>>2]|0;x=s;k[x>>2]=k[h>>2];k[x+4>>2]=w;x=b+16|0;w=k[x+4>>2]|0;h=t;k[h>>2]=k[x>>2];k[h+4>>2]=w;Yv(a,u);Yv(d,s);Yv(e,t);if((b|0)==((k[p>>2]|0)+-28|0))l=j;else l=+o[b+24>>2];Xv(f,m*j);Xv(c,m*l);Yd[k[(k[q>>2]|0)+104>>2]&31](q,5,34,5121,0);if(g){Yd[k[(k[q>>2]|0)+104>>2]&31](q,5,34,5121,34);Yd[k[(k[q>>2]|0)+104>>2]&31](q,5,34,5121,68);}j=l;b=b+28|0;}o[i>>2]=m*j;Vw(n);b=1;}else b=0;r=v;return b|0;}function Pw(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;g=r;r=r+16|0;d=g;e=g+8|0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;k[a+12>>2]=0;k[a+16>>2]=0;k[a+20>>2]=0;k[a+24>>2]=0;k[a+28>>2]=0;f=k[c>>2]|0;c=k[c+4>>2]|0;if((f|0)==(c|0)){e=k[b+28>>2]|0;d=k[e>>2]|0;e=k[e+4>>2]|0;f=a;k[f>>2]=d;k[f+4>>2]=e;f=a+16|0;k[f>>2]=d;k[f+4>>2]=e;k[a+8>>2]=1065353216;k[a+12>>2]=0;k[a+24>>2]=-1082130432;k[a+28>>2]=0;}else{h=f;j=k[h+4>>2]|0;b=a;k[b>>2]=k[h>>2];k[b+4>>2]=j;b=c+-12|0;j=b;h=k[j+4>>2]|0;i=a+16|0;k[i>>2]=k[j>>2];k[i+4>>2]=h;mt(e,f,f+8|0);at(d,e);i=d;h=k[i+4>>2]|0;f=a+8|0;k[f>>2]=k[i>>2];k[f+4>>2]=h;mt(e,b,c+-20|0);at(d,e);e=k[d+4>>2]|0;f=a+24|0;k[f>>2]=k[d>>2];k[f+4>>2]=e;}r=g;return;}function Qw(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;f=f|0;g=g|0;var h=0.0,i=0,j=0,l=0,m=0;m=r;r=r+144|0;i=m+128|0;j=m+64|0;l=m;if(Rw(a)|0){h=d*.5;d=1.0/+ie[k[(k[e>>2]|0)+20>>2]&7](e);d=d<.20000000298023224?.20000000298023224:d;bt(i,c);if(Sw(a,b,i,c,h+d)|0){i=k[a+8>>2]|0;i=be[k[(k[i>>2]|0)+20>>2]&255](i)|0;pv(i+4|0);c=be[k[(k[e>>2]|0)+8>>2]&255](e)|0;ft(l,c,be[k[(k[e>>2]|0)+12>>2]&255](e)|0);ft(j,l,f);Sv(i+52|0,j);Xv(i+68|0,d);Xv(i+84|0,h);Tv(i+100|0,g);Yv(i+116|0,b);Uv(i+132|0,12,0);a=k[a>>2]|0;a=be[k[(k[a>>2]|0)+8>>2]&255](a)|0;Yd[k[(k[a>>2]|0)+104>>2]&31](a,5,4,5121,0);_d[k[k[i>>2]>>2]&511](i);a=1;}else a=0;}else a=0;r=m;return a|0;}function Rw(a){a=a|0;var b=0,c=0;c=r;r=r+16|0;b=c;a=a+68|0;if(fw(a)|0)a=1;else{k[b>>2]=50462976;a=gw(a,4,b,35044)|0;}r=c;return a|0;}function Sw(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;var f=0,g=0,h=0,i=0,j=0,l=0,m=0;f=r;r=r+96|0;l=f+72|0;j=f+64|0;i=f+56|0;h=f+48|0;g=f;m=f+80|0;ot(j,c,e);lt(l,b,j);lt(h,c,d);ot(i,h,e);lt(j,b,i);ot(h,c,e);mt(i,b,h);mt(m,d,c);ot(g,m,e);lt(h,b,g);d=l;c=k[d+4>>2]|0;b=g;k[b>>2]=k[d>>2];k[b+4>>2]=c;o[g+8>>2]=1.0;b=j;c=k[b+4>>2]|0;d=g+12|0;k[d>>2]=k[b>>2];k[d+4>>2]=c;o[g+20>>2]=1.0;d=i;c=k[d+4>>2]|0;b=g+24|0;k[b>>2]=k[d>>2];k[b+4>>2]=c;o[g+32>>2]=1.0;b=h;c=k[b+4>>2]|0;d=g+36|0;k[d>>2]=k[b>>2];k[d+4>>2]=c;o[g+44>>2]=1.0;d=cw(a+84|0,48,g,35044)|0;r=f;return d|0;}function Tw(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0;l=r;r=r+16|0;h=l;j=l+12|0;e=a+36|0;if(fw(e)|0)a=1;else{k[h>>2]=0;f=h+4|0;k[f>>2]=0;k[h+8>>2]=0;g=h+8|0;d=0;while(1){if((d|0)>=17){d=0;break;}c=d<<2;a=c&255;i[j>>0]=a;b=k[f>>2]|0;if(b>>>0<(k[g>>2]|0)>>>0){i[b>>0]=a;b=(k[f>>2]|0)+1|0;k[f>>2]=b;}else{ax(h,j);b=k[f>>2]|0;}a=(c|2)&255;i[j>>0]=a;if(b>>>0<(k[g>>2]|0)>>>0){i[b>>0]=a;k[f>>2]=(k[f>>2]|0)+1;}else ax(h,j);d=d+1|0;}while(1){if((d|0)>=17){d=0;break;}c=d<<2;a=c&255;i[j>>0]=a;b=k[f>>2]|0;if(b>>>0<(k[g>>2]|0)>>>0){i[b>>0]=a;b=(k[f>>2]|0)+1|0;k[f>>2]=b;}else{ax(h,j);b=k[f>>2]|0;}a=(c|1)&255;i[j>>0]=a;if(b>>>0<(k[g>>2]|0)>>>0){i[b>>0]=a;k[f>>2]=(k[f>>2]|0)+1;}else ax(h,j);d=d+1|0;}while(1){if((d|0)>=17)break;c=d<<2;a=(c|2)&255;i[j>>0]=a;b=k[f>>2]|0;if(b>>>0<(k[g>>2]|0)>>>0){i[b>>0]=a;b=(k[f>>2]|0)+1|0;k[f>>2]=b;}else{ax(h,j);b=k[f>>2]|0;}a=(c|3)&255;i[j>>0]=a;if(b>>>0<(k[g>>2]|0)>>>0){i[b>>0]=a;k[f>>2]=(k[f>>2]|0)+1;}else ax(h,j);d=d+1|0;}a=k[h>>2]|0;a=gw(e,(k[f>>2]|0)-a|0,a,35044)|0;bx(h);}r=l;return a|0;}function Uw(a){a=a|0;var b=0.0,c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0,n=0,p=0,q=0,s=0;s=r;r=r+32|0;p=s+12|0;q=s;i=a+52|0;if(Ww(i)|0)a=1;else{k[p>>2]=0;j=p+4|0;k[j>>2]=0;k[p+8>>2]=0;l=q+4|0;m=q+8|0;n=p+8|0;c=q+4|0;d=q+8|0;e=q+4|0;f=q+8|0;g=q+4|0;h=q+8|0;b=0.0;while(1){if(!(b<=1.03125))break;o[q>>2]=b;o[l>>2]=1.0;o[m>>2]=0.0;a=k[j>>2]|0;if(a>>>0<(k[n>>2]|0)>>>0){k[a>>2]=k[q>>2];k[a+4>>2]=k[q+4>>2];k[a+8>>2]=k[q+8>>2];a=(k[j>>2]|0)+12|0;k[j>>2]=a;}else{Xw(p,q);a=k[j>>2]|0;}o[q>>2]=b;o[c>>2]=1.0;o[d>>2]=1.0;if(a>>>0<(k[n>>2]|0)>>>0){k[a>>2]=k[q>>2];k[a+4>>2]=k[q+4>>2];k[a+8>>2]=k[q+8>>2];a=(k[j>>2]|0)+12|0;k[j>>2]=a;}else{Xw(p,q);a=k[j>>2]|0;}o[q>>2]=b;o[e>>2]=-1.0;o[f>>2]=0.0;if(a>>>0<(k[n>>2]|0)>>>0){k[a>>2]=k[q>>2];k[a+4>>2]=k[q+4>>2];k[a+8>>2]=k[q+8>>2];a=(k[j>>2]|0)+12|0;k[j>>2]=a;}else{Xw(p,q);a=k[j>>2]|0;}o[q>>2]=b;o[g>>2]=-1.0;o[h>>2]=1.0;if(a>>>0<(k[n>>2]|0)>>>0){k[a>>2]=k[q>>2];k[a+4>>2]=k[q+4>>2];k[a+8>>2]=k[q+8>>2];k[j>>2]=(k[j>>2]|0)+12;}else Xw(p,q);b=b+.0625;}a=k[p>>2]|0;a=cw(i,(k[j>>2]|0)-a|0,a,35044)|0;Yw(p);}r=s;return a|0;}function Vw(a){a=a|0;_v(a+176|0);_v(a+192|0);_v(a+208|0);return;}function Ww(a){a=a|0;var b=0,c=0;b=k[a>>2]|0;if(((b|0)!=0?(i[a+14>>0]|0)!=0:0)?(c=j[a+12>>1]|0,c<<16>>16==(be[k[(k[b>>2]|0)+12>>2]&255](b)|0)<<16>>16):0)a=dw(a)|0;else a=0;return a|0;}function Xw(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;g=r;r=r+32|0;c=g;d=k[a+4>>2]|0;e=k[a>>2]|0;f=((d-e|0)/12|0)+1|0;if(f>>>0>357913941)MN(a);else{i=((k[a+8>>2]|0)-e|0)/12|0;h=i<<1;Zw(c,i>>>0<178956970?h>>>0<f>>>0?f:h:357913941,(d-e|0)/12|0,a+8|0);f=c+8|0;e=k[f>>2]|0;k[e>>2]=k[b>>2];k[e+4>>2]=k[b+4>>2];k[e+8>>2]=k[b+8>>2];k[f>>2]=(k[f>>2]|0)+12;_w(a,c);$w(c);r=g;return;}}function Yw(a){a=a|0;var b=0,c=0,d=0;c=k[a>>2]|0;if(c|0){a=a+4|0;b=k[a>>2]|0;while(1){if((b|0)==(c|0))break;d=b+-12|0;k[a>>2]=d;b=d;}YN(c);}return;}function Zw(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;do if(b){if(b>>>0>357913941){c=vc(4)|0;hP(c);Pd(c|0,2968,374);}else{d=UN(b*12|0)|0;break;}}else d=0;while(0);k[a>>2]=d;c=d+(c*12|0)|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+(b*12|0);return;}function _w(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;d=k[a>>2]|0;g=a+4|0;f=b+4|0;e=(k[g>>2]|0)-d|0;c=(k[f>>2]|0)+(((e|0)/-12|0)*12|0)|0;k[f>>2]=c;if((e|0)>0){qP(c|0,d|0,e|0)|0;d=f;c=k[f>>2]|0;}else d=f;f=k[a>>2]|0;k[a>>2]=c;k[d>>2]=f;f=b+8|0;e=k[g>>2]|0;k[g>>2]=k[f>>2];k[f>>2]=e;f=a+8|0;g=b+12|0;a=k[f>>2]|0;k[f>>2]=k[g>>2];k[g>>2]=a;k[b>>2]=k[d>>2];return;}function $w(a){a=a|0;var b=0,c=0,d=0,e=0;b=k[a+4>>2]|0;c=a+8|0;d=k[c>>2]|0;while(1){if((d|0)==(b|0))break;e=d+-12|0;k[c>>2]=e;d=e;}a=k[a>>2]|0;if(a|0)YN(a);return;}function ax(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0;g=r;r=r+32|0;c=g;d=k[a+4>>2]|0;e=k[a>>2]|0;f=d-e+1|0;if((f|0)<0)MN(a);else{j=(k[a+8>>2]|0)-e|0;h=j<<1;cx(c,j>>>0<1073741823?h>>>0<f>>>0?f:h:2147483647,d-e|0,a+8|0);f=c+8|0;i[k[f>>2]>>0]=i[b>>0]|0;k[f>>2]=(k[f>>2]|0)+1;dx(a,c);ex(c);r=g;return;}}function bx(a){a=a|0;var b=0,c=0,d=0;c=k[a>>2]|0;if(c|0){a=a+4|0;b=k[a>>2]|0;while(1){if((b|0)==(c|0))break;d=b+-1|0;k[a>>2]=d;b=d;}YN(c);}return;}function cx(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;if(!b)d=0;else d=UN(b)|0;k[a>>2]=d;c=d+c|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+b;return;}function dx(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;d=k[a>>2]|0;g=a+4|0;f=b+4|0;e=(k[g>>2]|0)-d|0;c=(k[f>>2]|0)+(0-e)|0;k[f>>2]=c;if((e|0)>0){qP(c|0,d|0,e|0)|0;d=f;c=k[f>>2]|0;}else d=f;f=k[a>>2]|0;k[a>>2]=c;k[d>>2]=f;f=b+8|0;e=k[g>>2]|0;k[g>>2]=k[f>>2];k[f>>2]=e;f=a+8|0;g=b+12|0;a=k[f>>2]|0;k[f>>2]=k[g>>2];k[g>>2]=a;k[b>>2]=k[d>>2];return;}function ex(a){a=a|0;var b=0,c=0,d=0,e=0;b=k[a+4>>2]|0;c=a+8|0;d=k[c>>2]|0;while(1){if((d|0)==(b|0))break;e=d+-1|0;k[c>>2]=e;d=e;}YN(k[a>>2]|0);return;}function fx(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0;c=uu(a+12|0,b)|0;m=k[a+4>>2]|0;a:do if(m){n=m+-1|0;o=(n&m|0)==0;if(o)l=n&c;else l=(c>>>0)%(m>>>0)|0;c=k[(k[a>>2]|0)+(l<<2)>>2]|0;if(c){h=b+11|0;j=b+4|0;b:while(1){c=k[c>>2]|0;if(!c){c=0;break a;}a=k[c+4>>2]|0;if(o)a=a&n;else a=(a>>>0)%(m>>>0)|0;if((a|0)!=(l|0)){c=0;break a;}a=c+8|0;e=i[a+11>>0]|0;f=e<<24>>24<0;e=e&255;g=f?k[c+12>>2]|0:e;p=i[h>>0]|0;d=p<<24>>24<0;if((g|0)!=((d?k[j>>2]|0:p&255)|0))continue;d=d?k[b>>2]|0:b;if(f)if(!(no(k[a>>2]|0,d,g)|0))break;else continue;while(1){if(!e)break a;if((i[a>>0]|0)!=(i[d>>0]|0))continue b;e=e+-1|0;d=d+1|0;a=a+1|0;}}}else c=0;}else c=0;while(0);return c|0;}function gx(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;c=b+4|0;e=(k[c>>2]|0)-(k[b>>2]|0)|0;d=(e|0)/28|0;if(e|0){mx(a,d);nx(a,k[b>>2]|0,k[c>>2]|0,d);}return;}function hx(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;f=UN(60)|0;k[a>>2]=f;k[a+4>>2]=b+8;e=a+8|0;i[e>>0]=0;b=f+8|0;k[b>>2]=k[d>>2];k[b+4>>2]=k[d+4>>2];k[b+8>>2]=k[d+8>>2];b=0;while(1){if((b|0)==3)break;k[d+(b<<2)>>2]=0;b=b+1|0;}lx(f+20|0,d+12|0);i[e>>0]=1;f=k[a>>2]|0;k[f+4>>2]=c;k[f>>2]=0;return;}function ix(a,b){a=a|0;b=b|0;var c=0,d=0;if((b|0)!=1){if(b+-1&b)b=KN(b)|0;}else b=2;d=k[a+4>>2]|0;if(b>>>0<=d>>>0){if(b>>>0<d>>>0){c=~~+_(+(+((k[a+12>>2]|0)>>>0)/+o[a+16>>2]))>>>0;if(d>>>0>2&(d+-1&d|0)==0)c=1<<32-(ca(c+-1|0)|0);else c=KN(c)|0;b=b>>>0<c>>>0?c:b;if(b>>>0<d>>>0)kx(a,b);}}else kx(a,b);return;}function jx(a){a=a|0;Jw(a+12|0);dO(a);return;}function kx(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;d=a+4|0;a:do if(b){if(b>>>0>1073741823){a=vc(4)|0;hP(a);Pd(a|0,2968,374);}t=UN(b<<2)|0;c=k[a>>2]|0;k[a>>2]=t;if(c|0)YN(c);k[d>>2]=b;c=0;while(1){if((c|0)==(b|0))break;k[(k[a>>2]|0)+(c<<2)>>2]=0;c=c+1|0;}e=a+8|0;c=k[e>>2]|0;if(c|0){d=k[c+4>>2]|0;s=b+-1|0;t=(s&b|0)==0;if(t)d=d&s;else d=(d>>>0)%(b>>>0)|0;k[(k[a>>2]|0)+(d<<2)>>2]=e;while(1){r=c;b:while(1)while(1){c=k[r>>2]|0;if(!c)break a;e=k[c+4>>2]|0;if(t)q=e&s;else q=(e>>>0)%(b>>>0)|0;if((q|0)==(d|0)){r=c;continue b;}e=(k[a>>2]|0)+(q<<2)|0;if(!(k[e>>2]|0))break b;m=c+8|0;n=m+11|0;o=c+12|0;p=c;c:while(1){e=k[p>>2]|0;if(!e){f=34;break;}f=e+8|0;h=i[n>>0]|0;j=h<<24>>24<0;h=h&255;l=j?k[o>>2]|0:h;u=i[f+11>>0]|0;g=u<<24>>24<0;if((l|0)!=((g?k[e+12>>2]|0:u&255)|0)){f=34;break;}f=g?k[f>>2]|0:f;if(j){if(no(k[m>>2]|0,f,l)|0){f=31;break;}p=k[p>>2]|0;continue;}else g=m;while(1){if(!h){p=e;continue c;}if((i[g>>0]|0)!=(i[f>>0]|0)){f=33;break c;}h=h+-1|0;f=f+1|0;g=g+1|0;}}if((f|0)==31)e=k[p>>2]|0;k[r>>2]=e;k[p>>2]=k[k[(k[a>>2]|0)+(q<<2)>>2]>>2];k[k[(k[a>>2]|0)+(q<<2)>>2]>>2]=c;}k[e>>2]=r;d=q;}}}else{c=k[a>>2]|0;k[a>>2]=0;if(c|0)YN(c);k[d>>2]=0;}while(0);return;}function lx(a,b){a=a|0;b=b|0;var c=0,d=0;k[a>>2]=0;d=a+4|0;k[d>>2]=0;k[a+8>>2]=0;k[a>>2]=k[b>>2];c=b+4|0;k[d>>2]=k[c>>2];d=b+8|0;k[a+8>>2]=k[d>>2];k[d>>2]=0;k[c>>2]=0;k[b>>2]=0;a=a+12|0;b=b+12|0;k[a>>2]=k[b>>2];k[a+4>>2]=k[b+4>>2];k[a+8>>2]=k[b+8>>2];k[a+12>>2]=k[b+12>>2];k[a+16>>2]=k[b+16>>2];k[a+20>>2]=k[b+20>>2];k[a+24>>2]=k[b+24>>2];return;}function mx(a,b){a=a|0;b=b|0;var c=0;if(b>>>0>153391689)MN(a);else{c=UN(b*28|0)|0;k[a+4>>2]=c;k[a>>2]=c;k[a+8>>2]=c+(b*28|0);return;}}function nx(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;d=a+4|0;a=c-b|0;if((a|0)>0){qP(k[d>>2]|0,b|0,a|0)|0;k[d>>2]=(k[d>>2]|0)+(((a>>>0)/28|0)*28|0);}return;}function ox(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,l=0;l=r;r=r+96|0;f=l+80|0;g=l+16|0;h=l;j=Mw(a,c)|0;if(!j)a=0;else{k[g>>2]=m[e>>1]|m[e+2>>1]<<16;i[g+4>>0]=0;jB(f,g);it(g,+o[d>>2],+o[d+4>>2]);mw(h,f);a=px(a,c,j+20|0,b,g,h)|0;}r=l;return a|0;}function px(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0;j=r;r=r+48|0;g=j+36|0;h=j+32|0;i=j;if((k[b+28>>2]|0)==(k[b+32>>2]|0))a=0;else if(Ow(a,b,c,d,e,f,0,g,h)|0){Pw(i,b,c);qx(a,i,i+8|0,+o[g>>2],d,e,f)|0;qx(a,i+16|0,i+24|0,+o[h>>2],d,e,f)|0;a=1;}else a=0;r=j;return a|0;}function qx(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,l=0,m=0.0;l=r;r=r+144|0;h=l+128|0;i=l+64|0;j=l;if(Rw(a)|0){m=1.0/+ie[k[(k[e>>2]|0)+20>>2]&7](e);bt(h,c);if(Sw(a,b,h,c,d*.5+(m<.20000000298023224?.20000000298023224:m))|0){h=k[a+8>>2]|0;h=be[k[(k[h>>2]|0)+16>>2]&255](h)|0;pv(h);c=be[k[(k[e>>2]|0)+8>>2]&255](e)|0;ft(j,c,be[k[(k[e>>2]|0)+12>>2]&255](e)|0);ft(i,j,f);Sv(h+48|0,i);Tv(h+64|0,g);Uv(h+80|0,12,0);Vv(h+96|0,12,8);a=k[a>>2]|0;a=be[k[(k[a>>2]|0)+8>>2]&255](a)|0;Yd[k[(k[a>>2]|0)+104>>2]&31](a,5,4,5121,0);Wv(h);a=1;}else a=0;}else a=0;r=l;return a|0;}function rx(a){a=a|0;var b=0;b=a+40|0;do{k[a>>2]=0;a=a+4|0;}while((a|0)<(b|0));return;}function sx(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;h=b+28|0;c=k[h>>2]|0;if((k[b+32>>2]|0)-c>>3>>>0>=3){g=a+16|0;i=qt(c,g)|0;d=k[a>>2]|0;e=a+4|0;c=k[e>>2]|0;if(!i){if((d|0)==(c|0))f=7;}else{while(1){if((c|0)==(d|0))break;i=c+-28|0;k[e>>2]=i;c=i;}k[a+12>>2]=0;h=k[h>>2]|0;i=k[h+4>>2]|0;f=g;k[f>>2]=k[h>>2];k[f+4>>2]=i;f=7;}if((f|0)==7)tx(a,b);if(k[a+12>>2]|0)ux(a,b);}return;}function tx(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0.0,i=0,j=0,l=0;f=r;r=r+32|0;c=f;i=f+16|0;l=f+12|0;j=f+8|0;d=b+28|0;k[l>>2]=(k[d>>2]|0)+8;g=b+32|0;k[j>>2]=k[g>>2];e=a+16|0;h=+o[b+40>>2];k[i>>2]=k[l>>2];k[c>>2]=k[j>>2];b=vx(i,c,e,h)|0;if((b|0)!=(k[g>>2]|0)){_s(c,e,b);l=c;j=k[l+4>>2]|0;i=a+24|0;k[i>>2]=k[l>>2];k[i+4>>2]=j;i=b;j=k[i+4>>2]|0;l=a+32|0;k[l>>2]=k[i>>2];k[l+4>>2]=j;k[a+12>>2]=b-(k[d>>2]|0)>>3;}r=f;return;}function ux(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0,n=0.0,p=0,q=0,s=0,t=0,u=0;q=r;r=r+32|0;g=q+28|0;f=q+24|0;s=q+20|0;e=q+16|0;i=q;j=q+12|0;l=q+8|0;m=b+40|0;n=+o[m>>2];p=b+28|0;h=a+12|0;k[s>>2]=(k[p>>2]|0)+(k[h>>2]<<3)+8;c=b+32|0;k[e>>2]=k[c>>2];d=a+32|0;k[f>>2]=k[s>>2];k[g>>2]=k[e>>2];e=a+24|0;b=vx(f,g,d,n)|0;while(1){if((b|0)==(k[c>>2]|0))break;_s(i,d,b);wx(a,e,d,i,+o[m>>2]);t=b;s=k[t+4>>2]|0;u=d;k[u>>2]=k[t>>2];k[u+4>>2]=s;u=i;s=k[u+4>>2]|0;t=e;k[t>>2]=k[u>>2];k[t+4>>2]=s;t=k[p>>2]|0;s=b-t>>3;k[h>>2]=s;k[j>>2]=t+(s<<3)+8;k[l>>2]=k[c>>2];k[f>>2]=k[j>>2];k[g>>2]=k[l>>2];b=vx(f,g,d,n)|0;}r=q;return;}function vx(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;var e=0;if(+O(+d)<9.99999993922529e-09)d=25.0;else d=25.0/(d*d);e=k[b>>2]|0;b=k[a>>2]|0;while(1){if((b|0)==(e|0)){b=e;break;}if(+Ys(c,b)>d)break;b=b+8|0;}return b|0;}function wx(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;var f=0,g=0.0,h=0,i=0,j=0,l=0;i=r;r=r+32|0;h=i;g=+Zs(b,d);if(+O(+g)<9.99999993922529e-09)e=1.5;else{g=15.0/g;f=+O(+e)<9.99999993922529e-09;e=f?g:g/e;e=e<.699999988079071?.699999988079071:e;e=e>1.5?1.5:e;}f=a+4|0;l=b;b=k[l+4>>2]|0;j=h;k[j>>2]=k[l>>2];k[j+4>>2]=b;j=c;b=k[j+4>>2]|0;c=h+8|0;k[c>>2]=k[j>>2];k[c+4>>2]=b;c=d;d=k[c+4>>2]|0;b=h+16|0;k[b>>2]=k[c>>2];k[b+4>>2]=d;o[h+24>>2]=e;b=k[f>>2]|0;if(b>>>0<(k[a+8>>2]|0)>>>0){k[b>>2]=k[h>>2];k[b+4>>2]=k[h+4>>2];k[b+8>>2]=k[h+8>>2];k[b+12>>2]=k[h+12>>2];k[b+16>>2]=k[h+16>>2];k[b+20>>2]=k[h+20>>2];k[b+24>>2]=k[h+24>>2];l=(k[f>>2]|0)+28|0;k[f>>2]=l;b=l;f=l;}else{xx(a,h);f=k[f>>2]|0;b=f;}if(((b-(k[a>>2]|0)|0)/28|0)>>>0>2){l=f+-32|0;o[l>>2]=(+o[f+-4>>2]+(+o[f+-60>>2]*1.5+ +o[l>>2]*1.2999999523162842))/3.799999952316284;}r=i;return;}function xx(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;g=r;r=r+32|0;c=g;d=k[a+4>>2]|0;e=k[a>>2]|0;f=((d-e|0)/28|0)+1|0;if(f>>>0>153391689)MN(a);else{i=((k[a+8>>2]|0)-e|0)/28|0;h=i<<1;yx(c,i>>>0<76695844?h>>>0<f>>>0?f:h:153391689,(d-e|0)/28|0,a+8|0);f=c+8|0;e=k[f>>2]|0;k[e>>2]=k[b>>2];k[e+4>>2]=k[b+4>>2];k[e+8>>2]=k[b+8>>2];k[e+12>>2]=k[b+12>>2];k[e+16>>2]=k[b+16>>2];k[e+20>>2]=k[b+20>>2];k[e+24>>2]=k[b+24>>2];k[f>>2]=e+28;zx(a,c);Ax(c);r=g;return;}}function yx(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;do if(b){if(b>>>0>153391689){c=vc(4)|0;hP(c);Pd(c|0,2968,374);}else{d=UN(b*28|0)|0;break;}}else d=0;while(0);k[a>>2]=d;c=d+(c*28|0)|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+(b*28|0);return;}function zx(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;d=k[a>>2]|0;g=a+4|0;f=b+4|0;e=(k[g>>2]|0)-d|0;c=(k[f>>2]|0)+(((e|0)/-28|0)*28|0)|0;k[f>>2]=c;if((e|0)>0){qP(c|0,d|0,e|0)|0;d=f;c=k[f>>2]|0;}else d=f;f=k[a>>2]|0;k[a>>2]=c;k[d>>2]=f;f=b+8|0;e=k[g>>2]|0;k[g>>2]=k[f>>2];k[f>>2]=e;f=a+8|0;g=b+12|0;a=k[f>>2]|0;k[f>>2]=k[g>>2];k[g>>2]=a;k[b>>2]=k[d>>2];return;}function Ax(a){a=a|0;var b=0,c=0,d=0,e=0;b=k[a+4>>2]|0;c=a+8|0;d=k[c>>2]|0;while(1){if((d|0)==(b|0))break;e=d+-28|0;k[c>>2]=e;d=e;}a=k[a>>2]|0;if(a|0)YN(a);return;}function Bx(){gt(38236);return;}function Cx(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;k[a>>2]=k[b>>2];d=k[b+4>>2]|0;k[a+4>>2]=d;if(d|0)PN(d);k[a+8>>2]=k[c>>2];c=k[c+4>>2]|0;k[a+12>>2]=c;if(c|0)PN(c);Fv(a+16|0,b);Ev(a+32|0,b);return;}function Dx(a){a=a|0;if(!(k[a>>2]|0))return 0;else return(k[a+8>>2]|0)!=0|0;return 0;}function Ex(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=k[a+8>>2]|0;e=be[k[(k[e>>2]|0)+8>>2]&255](e)|0;_d[k[(k[b>>2]|0)+8>>2]&511](b);_d[k[(k[c>>2]|0)+8>>2]&511](c);pv(e);_d[k[(k[d>>2]|0)+12>>2]&511](d);if(Fx(a)|0){Sv(e+48|0,38236);Uv(e+64|0,16,0);Uv(e+80|0,16,8);a=k[a>>2]|0;a=be[k[(k[a>>2]|0)+8>>2]&255](a)|0;Yd[k[(k[a>>2]|0)+104>>2]&31](a,5,4,5121,0);vw(e);a=1;}else a=0;return a|0;}function Fx(a){a=a|0;if(Gx(a)|0)a=Hx(a)|0;else a=0;return a|0;}function Gx(a){a=a|0;var b=0,c=0;c=r;r=r+64|0;b=c;a=a+16|0;if(Ww(a)|0)a=1;else{o[b>>2]=-1.0;o[b+4>>2]=1.0;o[b+8>>2]=0.0;o[b+12>>2]=1.0;o[b+16>>2]=-1.0;o[b+20>>2]=-1.0;o[b+24>>2]=0.0;o[b+28>>2]=0.0;o[b+32>>2]=1.0;o[b+36>>2]=1.0;o[b+40>>2]=1.0;o[b+44>>2]=1.0;o[b+48>>2]=1.0;o[b+52>>2]=-1.0;o[b+56>>2]=1.0;o[b+60>>2]=0.0;a=cw(a,64,b,35044)|0;}r=c;return a|0;}function Hx(a){a=a|0;var b=0,c=0;c=r;r=r+16|0;b=c;a=a+32|0;if(fw(a)|0)a=1;else{k[b>>2]=50462976;a=gw(a,4,b,35044)|0;}r=c;return a|0;}function Ix(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;k[a>>2]=k[b>>2];d=k[b+4>>2]|0;k[a+4>>2]=d;if(d|0)PN(d);k[a+8>>2]=k[c>>2];c=k[c+4>>2]|0;k[a+12>>2]=c;if(c|0)PN(c);Fv(a+16|0,b);Ev(a+32|0,b);return;}function Jx(a){a=a|0;if(!(k[a>>2]|0))return 0;else return(k[a+8>>2]|0)!=0|0;return 0;}function Kx(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,l=0;e=r;r=r+32|0;i=e+24|0;h=e+16|0;g=e+8|0;f=e;j=k[(k[b>>2]|0)+28>>2]|0;l=k[c+4>>2]|0;k[h>>2]=k[c>>2];k[h+4>>2]=l;se[j&63](i,b,h);j=k[(k[b>>2]|0)+28>>2]|0;l=k[c+12>>2]|0;k[g>>2]=k[c+8>>2];k[g+4>>2]=l;se[j&63](h,b,g);Yd[k[(k[d>>2]|0)+8>>2]&31](d,770,771,1,1);Lx(g,i,b);Lx(f,h,b);d=Mx(a,g,f,b)|0;r=e;return d|0;}function Lx(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0;c=be[k[(k[c>>2]|0)+16>>2]&255](c)|0;d=(1.0-+o[b+4>>2])*+((k[c+4>>2]|0)>>>0);o[a>>2]=+o[b>>2]*+((k[c>>2]|0)>>>0);o[a+4>>2]=d;return;}function Mx(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0.0,g=0.0,h=0.0,j=0,l=0.0,m=0,n=0.0;if((i[38224]|0)==0?fP(38224)|0:0){o[9575]=0.0;o[9576]=0.0;o[9577]=0.0;o[9578]=.20000000298023224;}a:do if(Nx(a)|0){j=k[a+8>>2]|0;j=be[k[(k[j>>2]|0)+16>>2]&255](j)|0;pv(j);Sv(j+48|0,be[k[(k[d>>2]|0)+8>>2]&255](d)|0);Tv(j+64|0,38300);l=+o[b>>2];g=+o[b+4>>2];h=+o[c>>2];f=+o[c+4>>2];c=(be[k[(k[d>>2]|0)+16>>2]&255](d)|0)+8|0;c=~~+oP(+ +o[c>>2]);d=j+80|0;e=j+96|0;b=0;while(1){if((b|0)>=(c|0)){b=1;break a;}n=+(b|0);Ox(a,l-n,g-n,h+n,f+n)|0;Uv(d,12,0);Vv(e,12,8);m=k[a>>2]|0;m=be[k[(k[m>>2]|0)+8>>2]&255](m)|0;Yd[k[(k[m>>2]|0)+104>>2]&31](m,2,4,5121,0);Wv(j);b=b+1|0;}}else b=0;while(0);return b|0;}function Nx(a){a=a|0;var b=0,c=0;c=r;r=r+16|0;b=c;a=a+32|0;if(fw(a)|0)a=1;else{k[b>>2]=50462976;a=gw(a,4,b,35044)|0;}r=c;return a|0;}function Ox(a,b,c,d,e){a=a|0;b=+b;c=+c;d=+d;e=+e;var f=0,g=0,h=0.0;f=r;r=r+48|0;g=f;h=b+-.5;c=c+-.5;o[g>>2]=h;o[g+4>>2]=c;o[g+8>>2]=1.0;b=e+.5;o[g+12>>2]=h;o[g+16>>2]=b;o[g+20>>2]=1.0;e=d+.5;o[g+24>>2]=e;o[g+28>>2]=b;o[g+32>>2]=1.0;o[g+36>>2]=e;o[g+40>>2]=c;o[g+44>>2]=1.0;a=cw(a+16|0,48,g,35044)|0;r=f;return a|0;}function Px(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;k[a>>2]=k[b>>2];d=k[b+4>>2]|0;k[a+4>>2]=d;if(d|0)PN(d);k[a+8>>2]=k[c>>2];c=k[c+4>>2]|0;k[a+12>>2]=c;if(c|0)PN(c);Ev(a+16|0,b);Fv(a+32|0,b);Ev(a+48|0,b);Fv(a+64|0,b);return;}function Qx(a){a=a|0;if(!(k[a>>2]|0))return 0;else return(k[a+8>>2]|0)!=0|0;return 0;}function Rx(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0.0,g=0.0,h=0,j=0,l=0,m=0,n=0,p=0.0,q=0,s=0,t=0,v=0,w=0,x=0,y=0,z=0;v=r;r=r+208|0;h=v+8|0;j=v;q=v+144|0;s=v+80|0;t=v+16|0;if(Sx(a)|0){x=c+28|0;z=k[x>>2]|0;x=k[x+4>>2]|0;w=h;k[w>>2]=z;k[w+4>>2]=x;w=c+36|0;y=k[w>>2]|0;w=k[w+4>>2]|0;n=j;k[n>>2]=y;k[n+4>>2]=w;n=i[c+24>>0]|0;p=+o[c+20>>2]*.5;l=i[c+16>>0]|0;m=i[c+17>>0]|0;c=i[c+18>>0]|0;f=(k[u>>2]=z,+o[u>>2]);f=f-(k[u>>2]=y,+o[u>>2]);g=(k[u>>2]=x,+o[u>>2]);g=g-(k[u>>2]=w,+o[u>>2]);g=+P(+(f*f+g*g))*.5;Tx(q,0,h,j,d);f=1.0/+ie[k[(k[b>>2]|0)+20>>2]&7](b);f=f<.20000000298023224?.20000000298023224:f;if(Ux(a,g,p,f)|0){Yd[k[(k[e>>2]|0)+8>>2]&31](e,770,771,1,1);if(n<<24>>24){it(t,0.0,-1.0);ft(s,t,q);Vx(a,b,s,g,p,6364,f);}o[s>>2]=+(l&255)/255.0;o[s+4>>2]=+(m&255)/255.0;o[s+8>>2]=+(c&255)/255.0;o[s+12>>2]=1.0;Vx(a,b,q,g,p,s,f);c=1;}else c=0;}else c=0;r=v;return c|0;}function Sx(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;f=r;r=r+16|0;e=f;a=a+16|0;if(fw(a)|0)a=1;else{b=e;c=24640;d=b+16|0;do{i[b>>0]=i[c>>0]|0;b=b+1|0;c=c+1|0;}while((b|0)<(d|0));a=gw(a,16,e,35044)|0;}r=f;return a|0;}function Tx(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0.0,g=0.0,h=0.0,i=0.0,j=0.0,k=0.0,l=0,m=0,n=0,p=0,q=0;q=r;r=r+256|0;l=q+192|0;m=q+128|0;n=q+64|0;p=q;j=+o[c>>2];k=+o[d>>2];b=!(j<=k);i=b?k:j;k=b?j:k;j=+o[(b?c:d)+4>>2];f=+o[(b?d:c)+4>>2];b=+O(+(f-j))<9.99999993922529e-09;do if(+O(+(i-k))<9.99999993922529e-09){if(b){g=f;h=i;f=0.0;}else{g=(j+f)*.5;h=i;f=1.570796251296997;}}else if(b){g=f;h=(i+k)*.5;f=0.0;break;}else{g=(j+f)*.5;h=(i+k)*.5;f=+X(+(j-f),+(k-i));break;}while(0);it(m,+o[e>>2]+-1.0,+o[e+4>>2]+-1.0);it(n,h,g);ft(l,m,n);kt(p,f,0.0,0.0);ft(a,l,p);r=q;return;}function Ux(a,b,c,d){a=a|0;b=+b;c=+c;d=+d;var e=0,f=0,g=0.0,h=0.0,i=0.0;e=r;r=r+144|0;f=e;h=c+d;g=b+c+d;i=-b;o[f>>2]=i;o[f+4>>2]=h;o[f+8>>2]=0.0;o[f+12>>2]=b;o[f+16>>2]=h;o[f+20>>2]=0.0;o[f+24>>2]=i;o[f+28>>2]=c;o[f+32>>2]=1.0;o[f+36>>2]=b;o[f+40>>2]=c;o[f+44>>2]=1.0;d=-c;o[f+48>>2]=i;o[f+52>>2]=d;o[f+56>>2]=1.0;o[f+60>>2]=b;o[f+64>>2]=d;o[f+68>>2]=1.0;d=-h;o[f+72>>2]=i;o[f+76>>2]=d;o[f+80>>2]=0.0;o[f+84>>2]=b;o[f+88>>2]=d;o[f+92>>2]=0.0;c=-g;o[f+96>>2]=c;o[f+100>>2]=h;o[f+104>>2]=0.0;o[f+108>>2]=c;o[f+112>>2]=d;o[f+116>>2]=0.0;o[f+120>>2]=g;o[f+124>>2]=h;o[f+128>>2]=0.0;o[f+132>>2]=g;o[f+136>>2]=d;o[f+140>>2]=0.0;a=cw(a+32|0,144,f,35044)|0;r=e;return a|0;}function Vx(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=+d;e=+e;f=f|0;g=+g;Wx(a,b,c,f);Xx(a,b,c,d,e,g,f);return;}function Wx(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=r;r=r+128|0;g=e+64|0;h=e;f=k[a+8>>2]|0;f=be[k[(k[f>>2]|0)+16>>2]&255](f)|0;pv(f);i=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;ft(h,i,be[k[(k[b>>2]|0)+12>>2]&255](b)|0);ft(g,h,c);Sv(f+48|0,g);Tv(f+64|0,d);Uv(f+80|0,12,0);Vv(f+96|0,12,8);d=k[a>>2]|0;d=be[k[(k[d>>2]|0)+8>>2]&255](d)|0;Yd[k[(k[d>>2]|0)+104>>2]&31](d,5,8,5121,0);Wv(f);r=e;return;}function Xx(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=+d;e=+e;f=+f;g=g|0;var h=0,i=0,j=0,l=0,m=0;h=r;r=r+128|0;j=h+64|0;l=h;i=k[a+8>>2]|0;i=be[k[(k[i>>2]|0)+20>>2]&255](i)|0;pv(i+4|0);m=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;ft(l,m,be[k[(k[b>>2]|0)+12>>2]&255](b)|0);ft(j,l,c);Sv(i+52|0,j);Xv(i+68|0,f);Xv(i+84|0,e);Tv(i+100|0,g);Uv(i+132|0,12,0);g=i+116|0;o[j>>2]=-d;o[j+4>>2]=0.0;Yv(g,j);c=k[a>>2]|0;c=be[k[(k[c>>2]|0)+8>>2]&255](c)|0;Yd[k[(k[c>>2]|0)+104>>2]&31](c,5,4,5121,8);o[j>>2]=d;o[j+4>>2]=0.0;Yv(g,j);g=k[a>>2]|0;g=be[k[(k[g>>2]|0)+8>>2]&255](g)|0;Yd[k[(k[g>>2]|0)+104>>2]&31](g,5,4,5121,12);_d[k[k[i>>2]>>2]&511](i);r=h;return;}function Yx(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,l=0,n=0,p=0,q=0.0,s=0.0,t=0.0,v=0,w=0,x=0,y=0,z=0;p=r;r=r+224|0;g=p+8|0;h=p;j=p+208|0;l=p+144|0;n=p+80|0;f=p+16|0;if(Zx(a)|0){w=c+28|0;y=k[w>>2]|0;w=k[w+4>>2]|0;v=g;k[v>>2]=y;k[v+4>>2]=w;v=c+36|0;x=k[v>>2]|0;v=k[v+4>>2]|0;z=h;k[z>>2]=x;k[z+4>>2]=v;k[l>>2]=m[e>>1]|m[e+2>>1]<<16;i[l+4>>0]=0;jB(j,l);Tx(l,0,g,h,d);s=+o[c+20>>2]*.5;q=(k[u>>2]=y,+o[u>>2]);q=q-(k[u>>2]=x,+o[u>>2]);t=(k[u>>2]=w,+o[u>>2]);t=t-(k[u>>2]=v,+o[u>>2]);t=+P(+(q*q+t*t))*.5;q=1.0/+ie[k[(k[b>>2]|0)+20>>2]&7](b);if(_x(a,t,s,q<.20000000298023224?.20000000298023224:q)|0){z=k[a+8>>2]|0;z=be[k[(k[z>>2]|0)+16>>2]&255](z)|0;pv(z);y=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;ft(f,y,be[k[(k[b>>2]|0)+12>>2]&255](b)|0);ft(n,f,l);Sv(z+48|0,n);mw(n,j);Tv(z+64|0,n);Uv(z+80|0,12,0);Vv(z+96|0,12,8);a=k[a>>2]|0;a=be[k[(k[a>>2]|0)+8>>2]&255](a)|0;Yd[k[(k[a>>2]|0)+104>>2]&31](a,5,4,5121,0);Wv(z);a=1;}else a=0;}else a=0;r=p;return a|0;}function Zx(a){a=a|0;var b=0,c=0;c=r;r=r+16|0;b=c;a=a+48|0;if(fw(a)|0)a=1;else{k[b>>2]=50462976;a=gw(a,4,b,35044)|0;}r=c;return a|0;}function _x(a,b,c,d){a=a|0;b=+b;c=+c;d=+d;var e=0,f=0;e=r;r=r+48|0;f=e;d=c+d;c=b+c;b=-c;o[f>>2]=b;o[f+4>>2]=d;o[f+8>>2]=1.0;o[f+12>>2]=c;o[f+16>>2]=d;o[f+20>>2]=1.0;d=-d;o[f+24>>2]=b;o[f+28>>2]=d;o[f+32>>2]=1.0;o[f+36>>2]=c;o[f+40>>2]=d;o[f+44>>2]=1.0;a=cw(a+64|0,48,f,35044)|0;r=e;return a|0;}function $x(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;k[a>>2]=k[b>>2];d=k[b+4>>2]|0;k[a+4>>2]=d;if(d|0)PN(d);k[a+8>>2]=k[c>>2];c=k[c+4>>2]|0;k[a+12>>2]=c;if(c|0)PN(c);Ev(a+16|0,a);Fv(a+32|0,b);Fv(a+48|0,b);return;}function ay(a){a=a|0;if(!(k[a>>2]|0))return 0;else return(k[a+8>>2]|0)!=0|0;return 0;}function by(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;var f=0.0,g=0,h=0,i=0,j=0,l=0,m=0,n=0;l=r;r=r+208|0;g=l;h=l+136|0;i=l+72|0;j=l+8|0;if(cy(a)|0){f=1.0/+ie[k[(k[b>>2]|0)+20>>2]&7](b);f=f<.20000000298023224?.20000000298023224:f;d=+dy(0,d,b);n=c;m=k[n+4>>2]|0;c=g;k[c>>2]=k[n>>2];k[c+4>>2]=m;if(ey(a,g,d+f)|0){it(h,0.0,-+Hm(b,1.0));n=k[a+8>>2]|0;n=be[k[(k[n>>2]|0)+20>>2]&255](n)|0;a=k[a>>2]|0;a=be[k[(k[a>>2]|0)+8>>2]&255](a)|0;pv(n+4|0);Yd[k[(k[e>>2]|0)+8>>2]&31](e,770,771,1,1);e=n+52|0;m=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;ft(j,m,be[k[(k[b>>2]|0)+12>>2]&255](b)|0);ft(i,j,h);Sv(e,i);Xv(n+68|0,f);Xv(n+84|0,d);j=n+100|0;Tv(j,6380);Yv(n+116|0,g);m=n+132|0;Uv(m,8,0);Yd[k[(k[a>>2]|0)+104>>2]&31](a,5,4,5121,0);_d[k[k[n>>2]>>2]&511](n);h=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;ft(i,h,be[k[(k[b>>2]|0)+12>>2]&255](b)|0);Sv(e,i);Tv(j,6396);Uv(m,8,0);Yd[k[(k[a>>2]|0)+104>>2]&31](a,5,4,5121,0);_d[k[k[n>>2]>>2]&511](n);a=1;}else a=0;}else a=0;r=l;return a|0;}function cy(a){a=a|0;var b=0,c=0;c=r;r=r+16|0;b=c;a=a+16|0;if(fw(a)|0)a=1;else{k[b>>2]=50462976;a=gw(a,4,b,35044)|0;}r=c;return a|0;}function dy(a,b,c){a=a|0;b=+b;c=c|0;if(+vo(c,b)<5.0)b=+Hm(c,5.0);return+b;}function ey(a,b,c){a=a|0;b=b|0;c=+c;var d=0,e=0,f=0.0,g=0.0,h=0.0,i=0.0;d=r;r=r+32|0;e=d;f=+o[b>>2];h=+o[b+4>>2];g=f-c;i=h+c;o[e>>2]=g;o[e+4>>2]=i;f=f+c;o[e+8>>2]=f;o[e+12>>2]=i;c=h-c;o[e+16>>2]=g;o[e+20>>2]=c;o[e+24>>2]=f;o[e+28>>2]=c;b=cw(a+32|0,32,e,35044)|0;r=d;return b|0;}function fy(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;f=f|0;var g=0,h=0,j=0,l=0,n=0.0;l=r;r=r+80|0;g=l+72|0;h=l;j=l+8|0;if(cy(a)|0){n=1.0/+ie[k[(k[b>>2]|0)+20>>2]&7](b);d=+dy(0,d,b);k[h>>2]=m[e>>1]|m[e+2>>1]<<16;i[h+4>>0]=f;jB(g,h);e=k[c+4>>2]|0;f=h;k[f>>2]=k[c>>2];k[f+4>>2]=e;if(gy(a,h,d+(n<.20000000298023224?.20000000298023224:n))|0){h=k[a+8>>2]|0;h=be[k[(k[h>>2]|0)+16>>2]&255](h)|0;pv(h);f=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;ft(j,f,be[k[(k[b>>2]|0)+12>>2]&255](b)|0);Sv(h+48|0,j);mw(j,g);Tv(h+64|0,j);Uv(h+80|0,12,0);Vv(h+96|0,12,8);a=k[a>>2]|0;a=be[k[(k[a>>2]|0)+8>>2]&255](a)|0;Yd[k[(k[a>>2]|0)+104>>2]&31](a,5,4,5121,0);Wv(h);a=1;}else a=0;}else a=0;r=l;return a|0;}function gy(a,b,c){a=a|0;b=b|0;c=+c;var d=0,e=0,f=0.0,g=0.0,h=0.0,i=0.0;d=r;r=r+48|0;e=d;f=+o[b>>2];h=+o[b+4>>2];g=f-c;i=h+c;o[e>>2]=g;o[e+4>>2]=i;o[e+8>>2]=1.0;f=f+c;o[e+12>>2]=f;o[e+16>>2]=i;o[e+20>>2]=1.0;c=h-c;o[e+24>>2]=g;o[e+28>>2]=c;o[e+32>>2]=1.0;o[e+36>>2]=f;o[e+40>>2]=c;o[e+44>>2]=1.0;b=cw(a+48|0,48,e,35044)|0;r=d;return b|0;}function hy(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;k[a>>2]=k[b>>2];d=k[b+4>>2]|0;k[a+4>>2]=d;if(d|0)PN(d);k[a+8>>2]=k[c>>2];c=k[c+4>>2]|0;k[a+12>>2]=c;if(c|0)PN(c);Ev(a+16|0,b);Fv(a+32|0,b);return;}function iy(a){a=a|0;if(!(k[a>>2]|0))return 0;else return(k[a+8>>2]|0)!=0|0;return 0;}function jy(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;j=r;r=r+192|0;f=j+128|0;g=j+64|0;h=j;if(ky(a)|0?ly(a)|0:0){it(f,+o[d>>2],+o[d+4>>2]);Yd[k[(k[e>>2]|0)+8>>2]&31](e,770,771,1,1);if(i[c+24>>0]|0){it(h,0.0,-1.0);ft(g,h,f);my(a,b,c,6412,g,0);}o[g>>2]=+(l[c+16>>0]|0)/255.0;o[g+4>>2]=+(l[c+17>>0]|0)/255.0;o[g+8>>2]=+(l[c+18>>0]|0)/255.0;o[g+12>>2]=1.0;my(a,b,c,g,f,0);a=1;}else a=0;r=j;return a|0;}function ky(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0,l=0,m=0,n=0;n=r;r=r+16|0;l=n;m=n+12|0;g=a+16|0;if(fw(g)|0)a=1;else{k[l>>2]=0;h=l+4|0;k[h>>2]=0;k[l+8>>2]=0;i=l+8|0;f=0;while(1){if((f|0)>=151)break;e=f<<2;a=e&65535;j[m>>1]=a;b=k[h>>2]|0;c=k[i>>2]|0;if(b>>>0<c>>>0){j[b>>1]=a;d=b+2|0;k[h>>2]=d;b=c;}else{uy(l,m);d=k[h>>2]|0;b=k[i>>2]|0;}a=(e|2)&65535;j[m>>1]=a;if(d>>>0<b>>>0){j[d>>1]=a;k[h>>2]=d+2;}else uy(l,m);f=f+1|0;}f=0;while(1){if((f|0)>=151)break;e=f<<2;a=e&65535;j[m>>1]=a;b=k[h>>2]|0;c=k[i>>2]|0;if(b>>>0<c>>>0){j[b>>1]=a;d=b+2|0;k[h>>2]=d;b=c;}else{uy(l,m);d=k[h>>2]|0;b=k[i>>2]|0;}a=(e|1)&65535;j[m>>1]=a;if(d>>>0<b>>>0){j[d>>1]=a;k[h>>2]=d+2;}else uy(l,m);f=f+1|0;}f=0;while(1){if((f|0)>=151)break;e=f<<2;a=(e|2)&65535;j[m>>1]=a;b=k[h>>2]|0;c=k[i>>2]|0;if(b>>>0<c>>>0){j[b>>1]=a;d=b+2|0;k[h>>2]=d;b=c;}else{uy(l,m);d=k[h>>2]|0;b=k[i>>2]|0;}a=(e|3)&65535;j[m>>1]=a;if(d>>>0<b>>>0){j[d>>1]=a;k[h>>2]=d+2;}else uy(l,m);f=f+1|0;}a=k[l>>2]|0;a=gw(g,(k[h>>2]|0)-a|0,a,35044)|0;vy(l);}r=n;return a|0;}function ly(a){a=a|0;var b=0,c=0.0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0,n=0,p=0,q=0,s=0,t=0;t=r;r=r+32|0;s=t+12|0;p=t;q=a+32|0;if(Ww(q)|0)a=1;else{k[s>>2]=0;m=s+4|0;k[m>>2]=0;k[s+8>>2]=0;j=p+4|0;l=p+8|0;n=s+8|0;d=p+4|0;e=p+8|0;f=p+4|0;g=p+8|0;h=p+4|0;i=p+8|0;b=0;c=0.0;while(1){if((b|0)>=150)break;o[p>>2]=c;o[j>>2]=1.0;o[l>>2]=0.0;a=k[m>>2]|0;if(a>>>0<(k[n>>2]|0)>>>0){k[a>>2]=k[p>>2];k[a+4>>2]=k[p+4>>2];k[a+8>>2]=k[p+8>>2];a=(k[m>>2]|0)+12|0;k[m>>2]=a;}else{py(s,p);a=k[m>>2]|0;}o[p>>2]=c;o[d>>2]=1.0;o[e>>2]=1.0;if(a>>>0<(k[n>>2]|0)>>>0){k[a>>2]=k[p>>2];k[a+4>>2]=k[p+4>>2];k[a+8>>2]=k[p+8>>2];a=(k[m>>2]|0)+12|0;k[m>>2]=a;}else{py(s,p);a=k[m>>2]|0;}o[p>>2]=c;o[f>>2]=-1.0;o[g>>2]=0.0;if(a>>>0<(k[n>>2]|0)>>>0){k[a>>2]=k[p>>2];k[a+4>>2]=k[p+4>>2];k[a+8>>2]=k[p+8>>2];a=(k[m>>2]|0)+12|0;k[m>>2]=a;}else{py(s,p);a=k[m>>2]|0;}o[p>>2]=c;o[h>>2]=-1.0;o[i>>2]=1.0;if(a>>>0<(k[n>>2]|0)>>>0){k[a>>2]=k[p>>2];k[a+4>>2]=k[p+4>>2];k[a+8>>2]=k[p+8>>2];k[m>>2]=(k[m>>2]|0)+12;}else py(s,p);b=b+1|0;c=c+.006666666828095913;}o[p>>2]=1.0;o[p+4>>2]=1.0;o[p+8>>2]=0.0;a=k[m>>2]|0;if(a>>>0<(k[n>>2]|0)>>>0){k[a>>2]=k[p>>2];k[a+4>>2]=k[p+4>>2];k[a+8>>2]=k[p+8>>2];a=(k[m>>2]|0)+12|0;k[m>>2]=a;}else{py(s,p);a=k[m>>2]|0;}o[p>>2]=1.0;o[p+4>>2]=1.0;o[p+8>>2]=1.0;if(a>>>0<(k[n>>2]|0)>>>0){k[a>>2]=k[p>>2];k[a+4>>2]=k[p+4>>2];k[a+8>>2]=k[p+8>>2];a=(k[m>>2]|0)+12|0;k[m>>2]=a;}else{py(s,p);a=k[m>>2]|0;}o[p>>2]=1.0;o[p+4>>2]=-1.0;o[p+8>>2]=0.0;if(a>>>0<(k[n>>2]|0)>>>0){k[a>>2]=k[p>>2];k[a+4>>2]=k[p+4>>2];k[a+8>>2]=k[p+8>>2];a=(k[m>>2]|0)+12|0;k[m>>2]=a;}else{py(s,p);a=k[m>>2]|0;}o[p>>2]=1.0;o[p+4>>2]=-1.0;o[p+8>>2]=1.0;if(a>>>0<(k[n>>2]|0)>>>0){k[a>>2]=k[p>>2];k[a+4>>2]=k[p+4>>2];k[a+8>>2]=k[p+8>>2];a=(k[m>>2]|0)+12|0;k[m>>2]=a;}else{py(s,p);a=k[m>>2]|0;}p=k[s>>2]|0;a=cw(q,a-p|0,p,35044)|0;qy(s);}r=t;return a|0;}function my(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0.0,j=0,l=0;f=r;r=r+128|0;h=f+64|0;j=f;g=k[a>>2]|0;g=be[k[(k[g>>2]|0)+8>>2]&255](g)|0;a=k[a+8>>2]|0;a=be[k[(k[a>>2]|0)+32>>2]&255](a)|0;pv(a);l=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;ft(j,l,be[k[(k[b>>2]|0)+12>>2]&255](b)|0);ft(h,j,e);Sv(a+48|0,h);i=1.0/+ie[k[(k[b>>2]|0)+20>>2]&7](b);Xv(a+128|0,i<.20000000298023224?.20000000298023224:i);e=c+20|0;Xv(a+144|0,+o[e>>2]);Xv(a+160|0,+o[e>>2]);Tv(a+176|0,d);Vv(a+192|0,12,0);Vv(a+208|0,12,4);Vv(a+224|0,12,8);ny(h,c);Yv(a+64|0,h);Yv(a+112|0,h+8|0);d=a+80|0;Yv(d,h+16|0);e=a+96|0;Yv(e,h+24|0);Yd[k[(k[g>>2]|0)+104>>2]&31](g,5,302,5123,0);Yd[k[(k[g>>2]|0)+104>>2]&31](g,5,302,5123,1208);Yd[k[(k[g>>2]|0)+104>>2]&31](g,5,302,5123,604);Yv(d,h+32|0);Yv(e,h+40|0);Yd[k[(k[g>>2]|0)+104>>2]&31](g,5,302,5123,0);Yd[k[(k[g>>2]|0)+104>>2]&31](g,5,302,5123,1208);Yd[k[(k[g>>2]|0)+104>>2]&31](g,5,302,5123,604);oy(a);r=f;return;}function ny(a,b){a=a|0;b=b|0;var c=0,d=0,e=0.0,f=0.0,g=0.0,h=0.0,i=0.0,j=0.0,l=0.0,m=0.0;c=a;d=c+48|0;do{k[c>>2]=0;c=c+4|0;}while((c|0)<(d|0));h=+o[b+36>>2];i=+o[b+40>>2];j=+o[b+28>>2];g=+o[b+32>>2];e=h<1.0?1.0:h;f=i<1.0?1.0:i;if(!(e>=f)){m=i+g;g=g-i;o[a>>2]=j;o[a+4>>2]=g;o[a+8>>2]=j;o[a+12>>2]=m;h=e*1.3333333730697632;l=j-h;o[a+16>>2]=l;o[a+20>>2]=g;h=h+j;e=m;f=h;i=m;j=l;}else{m=h+j;h=j-h;o[a>>2]=h;o[a+4>>2]=g;o[a+8>>2]=m;o[a+12>>2]=g;e=f*1.3333333730697632;i=e+g;o[a+16>>2]=h;o[a+20>>2]=i;g=g-e;e=g;f=m;j=m;}o[a+24>>2]=j;o[a+28>>2]=i;o[a+32>>2]=h;o[a+36>>2]=g;o[a+40>>2]=f;o[a+44>>2]=e;return;}function oy(a){a=a|0;_v(a+192|0);_v(a+208|0);_v(a+224|0);return;}function py(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0;g=r;r=r+32|0;c=g;d=k[a+4>>2]|0;e=k[a>>2]|0;f=((d-e|0)/12|0)+1|0;if(f>>>0>357913941)MN(a);else{i=((k[a+8>>2]|0)-e|0)/12|0;h=i<<1;ry(c,i>>>0<178956970?h>>>0<f>>>0?f:h:357913941,(d-e|0)/12|0,a+8|0);f=c+8|0;e=k[f>>2]|0;k[e>>2]=k[b>>2];k[e+4>>2]=k[b+4>>2];k[e+8>>2]=k[b+8>>2];k[f>>2]=(k[f>>2]|0)+12;sy(a,c);ty(c);r=g;return;}}function qy(a){a=a|0;var b=0,c=0,d=0;c=k[a>>2]|0;if(c|0){a=a+4|0;b=k[a>>2]|0;while(1){if((b|0)==(c|0))break;d=b+-12|0;k[a>>2]=d;b=d;}YN(c);}return;}function ry(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;do if(b){if(b>>>0>357913941){c=vc(4)|0;hP(c);Pd(c|0,2968,374);}else{d=UN(b*12|0)|0;break;}}else d=0;while(0);k[a>>2]=d;c=d+(c*12|0)|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+(b*12|0);return;}function sy(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;d=k[a>>2]|0;g=a+4|0;f=b+4|0;e=(k[g>>2]|0)-d|0;c=(k[f>>2]|0)+(((e|0)/-12|0)*12|0)|0;k[f>>2]=c;if((e|0)>0){qP(c|0,d|0,e|0)|0;d=f;c=k[f>>2]|0;}else d=f;f=k[a>>2]|0;k[a>>2]=c;k[d>>2]=f;f=b+8|0;e=k[g>>2]|0;k[g>>2]=k[f>>2];k[f>>2]=e;f=a+8|0;g=b+12|0;a=k[f>>2]|0;k[f>>2]=k[g>>2];k[g>>2]=a;k[b>>2]=k[d>>2];return;}function ty(a){a=a|0;var b=0,c=0,d=0,e=0;b=k[a+4>>2]|0;c=a+8|0;d=k[c>>2]|0;while(1){if((d|0)==(b|0))break;e=d+-12|0;k[c>>2]=e;d=e;}a=k[a>>2]|0;if(a|0)YN(a);return;}function uy(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;g=r;r=r+32|0;c=g;d=k[a+4>>2]|0;e=k[a>>2]|0;h=d-e|0;f=(h>>1)+1|0;if((h|0)<-2)MN(a);else{h=(k[a+8>>2]|0)-e|0;wy(c,h>>1>>>0<1073741823?h>>>0<f>>>0?f:h:2147483647,d-e>>1,a+8|0);h=c+8|0;f=k[h>>2]|0;j[f>>1]=j[b>>1]|0;k[h>>2]=f+2;xy(a,c);yy(c);r=g;return;}}function vy(a){a=a|0;var b=0,c=0,d=0;c=k[a>>2]|0;if(c|0){a=a+4|0;b=k[a>>2]|0;while(1){if((b|0)==(c|0))break;d=b+-2|0;k[a>>2]=d;b=d;}YN(c);}return;}function wy(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;k[a+12>>2]=0;k[a+16>>2]=d;do if(b){if((b|0)<0){c=vc(4)|0;hP(c);Pd(c|0,2968,374);}else{d=UN(b<<1)|0;break;}}else d=0;while(0);k[a>>2]=d;c=d+(c<<1)|0;k[a+8>>2]=c;k[a+4>>2]=c;k[a+12>>2]=d+(b<<1);return;}function xy(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;d=k[a>>2]|0;g=a+4|0;f=b+4|0;e=(k[g>>2]|0)-d|0;c=(k[f>>2]|0)+(0-(e>>1)<<1)|0;k[f>>2]=c;if((e|0)>0){qP(c|0,d|0,e|0)|0;d=f;c=k[f>>2]|0;}else d=f;f=k[a>>2]|0;k[a>>2]=c;k[d>>2]=f;f=b+8|0;e=k[g>>2]|0;k[g>>2]=k[f>>2];k[f>>2]=e;f=a+8|0;g=b+12|0;a=k[f>>2]|0;k[f>>2]=k[g>>2];k[g>>2]=a;k[b>>2]=k[d>>2];return;}function yy(a){a=a|0;var b=0,c=0,d=0,e=0;b=k[a+4>>2]|0;c=a+8|0;d=k[c>>2]|0;while(1){if((d|0)==(b|0))break;e=d+-2|0;k[c>>2]=e;d=e;}a=k[a>>2]|0;if(a|0)YN(a);return;}function zy(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;g=r;r=r+64|0;f=g;if(ky(a)|0?ly(a)|0:0){it(f,+o[d>>2],+o[d+4>>2]);Ay(a,b,c,f,e);a=1;}else a=0;r=g;return a|0;}function Ay(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,l=0;f=r;r=r+128|0;j=f+64|0;h=f;g=k[a>>2]|0;g=be[k[(k[g>>2]|0)+8>>2]&255](g)|0;a=k[a+8>>2]|0;a=be[k[(k[a>>2]|0)+32>>2]&255](a)|0;pv(a);l=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;ft(h,l,be[k[(k[b>>2]|0)+12>>2]&255](b)|0);ft(j,h,d);Sv(a+48|0,j);Xv(a+128|0,0.0);d=c+20|0;Xv(a+144|0,+o[d>>2]);Xv(a+160|0,+o[d>>2]);k[h>>2]=m[e>>1]|m[e+2>>1]<<16;i[h+4>>0]=0;jB(j,h);mw(h,j);Tv(a+176|0,h);Vv(a+192|0,12,0);Vv(a+208|0,12,4);Vv(a+224|0,12,8);ny(h,c);Yv(a+64|0,h);Yv(a+112|0,h+8|0);d=a+80|0;Yv(d,h+16|0);e=a+96|0;Yv(e,h+24|0);Yd[k[(k[g>>2]|0)+104>>2]&31](g,5,302,5123,0);Yv(d,h+32|0);Yv(e,h+40|0);Yd[k[(k[g>>2]|0)+104>>2]&31](g,5,302,5123,0);oy(a);r=f;return;}function By(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=k[b>>2];b=k[b+4>>2]|0;k[a+4>>2]=b;if(b|0)PN(b);k[a+8>>2]=k[c>>2];b=k[c+4>>2]|0;k[a+12>>2]=b;if(b|0)PN(b);Fv(a+16|0,a);Ev(a+32|0,a);return;}function Cy(a){a=a|0;if(!(k[a>>2]|0))return 0;else return(k[a+8>>2]|0)!=0|0;return 0;}function Dy(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0.0,g=0,h=0,j=0,m=0,n=0;n=r;r=r+192|0;g=n+128|0;h=n+64|0;j=n;m=c+28|0;f=+o[c+20>>2]*.5;it(g,+o[d>>2],+o[d+4>>2]);if(Ey(a,m,f)|0?Fy(a)|0:0){Yd[k[(k[e>>2]|0)+8>>2]&31](e,770,771,1,1);if(i[c+24>>0]|0){it(j,0.0,-1.0);ft(h,j,g);Gy(a,b,m,f,h,6428)|0;}o[h>>2]=+(l[c+16>>0]|0)/255.0;o[h+4>>2]=+(l[c+17>>0]|0)/255.0;o[h+8>>2]=+(l[c+18>>0]|0)/255.0;o[h+12>>2]=1.0;Gy(a,b,m,f,g,h)|0;a=1;}else a=0;r=n;return a|0;}function Ey(a,b,c){a=a|0;b=b|0;c=+c;var d=0,e=0,f=0.0,g=0.0,h=0.0,i=0.0,j=0.0,k=0.0,l=0.0,m=0.0,n=0.0,p=0.0,q=0.0;d=r;r=r+240|0;e=d;n=+o[b>>2];h=+o[b+4>>2];g=+o[b+8>>2];k=+o[b+12>>2];j=(g-n)*.5;j=j<c?j:c;m=(k-h)*.5;m=m<c?m:c;o[e>>2]=n;o[e+4>>2]=h;o[e+8>>2]=1.0;p=n-c;f=h-c;o[e+12>>2]=p;o[e+16>>2]=f;o[e+20>>2]=1.0;q=n+j;i=h+m;o[e+24>>2]=q;o[e+28>>2]=i;o[e+32>>2]=1.0;o[e+36>>2]=n;o[e+40>>2]=f;o[e+44>>2]=1.0;o[e+48>>2]=p;o[e+52>>2]=h;o[e+56>>2]=1.0;o[e+60>>2]=n;o[e+64>>2]=k;o[e+68>>2]=1.0;l=k+c;o[e+72>>2]=p;o[e+76>>2]=l;o[e+80>>2]=1.0;m=k-m;o[e+84>>2]=q;o[e+88>>2]=m;o[e+92>>2]=1.0;o[e+96>>2]=p;o[e+100>>2]=k;o[e+104>>2]=1.0;o[e+108>>2]=n;o[e+112>>2]=l;o[e+116>>2]=1.0;o[e+120>>2]=g;o[e+124>>2]=k;o[e+128>>2]=1.0;c=g+c;o[e+132>>2]=c;o[e+136>>2]=l;o[e+140>>2]=1.0;j=g-j;o[e+144>>2]=j;o[e+148>>2]=m;o[e+152>>2]=1.0;o[e+156>>2]=g;o[e+160>>2]=l;o[e+164>>2]=1.0;o[e+168>>2]=c;o[e+172>>2]=k;o[e+176>>2]=1.0;o[e+180>>2]=g;o[e+184>>2]=h;o[e+188>>2]=1.0;o[e+192>>2]=c;o[e+196>>2]=f;o[e+200>>2]=1.0;o[e+204>>2]=j;o[e+208>>2]=i;o[e+212>>2]=1.0;o[e+216>>2]=c;o[e+220>>2]=h;o[e+224>>2]=1.0;o[e+228>>2]=g;o[e+232>>2]=f;o[e+236>>2]=1.0;b=cw(a+16|0,240,e,35044)|0;r=d;return b|0;}function Fy(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;d=r;r=r+48|0;b=d;c=b;e=24656;f=c+40|0;do{i[c>>0]=i[e>>0]|0;c=c+1|0;e=e+1|0;}while((c|0)<(f|0));f=gw(a+32|0,40,b,35044)|0;r=d;return f|0;}function Gy(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,l=0,m=0.0,n=0;g=r;r=r+128|0;n=g+64|0;i=g;h=k[a>>2]|0;h=be[k[(k[h>>2]|0)+8>>2]&255](h)|0;l=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;ft(i,l,be[k[(k[b>>2]|0)+12>>2]&255](b)|0);ft(n,i,e);m=1.0/+ie[k[(k[b>>2]|0)+20>>2]&7](b);m=m<.20000000298023224?.20000000298023224:m;l=k[c>>2]|0;b=k[c+4>>2]|0;j=k[c+8>>2]|0;c=k[c+12>>2]|0;e=a+8|0;a=k[e>>2]|0;a=be[k[(k[a>>2]|0)+16>>2]&255](a)|0;pv(a);Sv(a+48|0,n);Tv(a+64|0,f);Uv(a+80|0,12,0);Vv(a+96|0,12,8);Yd[k[(k[h>>2]|0)+104>>2]&31](h,5,6,5121,0);Yd[k[(k[h>>2]|0)+104>>2]&31](h,5,6,5121,6);Yd[k[(k[h>>2]|0)+104>>2]&31](h,5,6,5121,12);Yd[k[(k[h>>2]|0)+104>>2]&31](h,5,6,5121,18);Wv(a);e=k[e>>2]|0;e=be[k[(k[e>>2]|0)+20>>2]&255](e)|0;pv(e+4|0);Sv(e+52|0,n);Xv(e+68|0,m);Xv(e+84|0,d-m*.5);Tv(e+100|0,f);Uv(e+132|0,12,0);f=e+116|0;k[i>>2]=l;k[i+4>>2]=b;Yv(f,i);Yd[k[(k[h>>2]|0)+104>>2]&31](h,5,4,5121,24);k[i>>2]=l;k[i+4>>2]=c;Yv(f,i);Yd[k[(k[h>>2]|0)+104>>2]&31](h,5,4,5121,28);k[i>>2]=j;k[i+4>>2]=c;Yv(f,i);Yd[k[(k[h>>2]|0)+104>>2]&31](h,5,4,5121,32);k[i>>2]=j;k[i+4>>2]=b;Yv(f,i);Yd[k[(k[h>>2]|0)+104>>2]&31](h,5,4,5121,36);_d[k[k[e>>2]>>2]&511](e);r=g;return 1;}function Hy(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0.0;g=r;r=r+32|0;d=g+16|0;f=g;h=+o[c+20>>2]*.5;k[f>>2]=m[e>>1]|m[e+2>>1]<<16;i[f+4>>0]=0;jB(d,f);if(Iy(a,c+28|0,h)|0?Jy(a)|0:0){mw(f,d);Ky(a,b,0,0.0,f)|0;d=1;}else d=0;r=g;return d|0;}function Iy(a,b,c){a=a|0;b=b|0;c=+c;var d=0,e=0,f=0.0,g=0.0,h=0.0,i=0.0,j=0.0,k=0.0,l=0.0;d=r;r=r+96|0;e=d;h=+o[b>>2];f=+o[b+4>>2];j=+o[b+8>>2];i=+o[b+12>>2];l=h-c;g=f-c;o[e>>2]=l;o[e+4>>2]=g;o[e+8>>2]=1.0;h=h+c;f=f+c;o[e+12>>2]=h;o[e+16>>2]=f;o[e+20>>2]=1.0;k=i+c;o[e+24>>2]=l;o[e+28>>2]=k;o[e+32>>2]=1.0;i=i-c;o[e+36>>2]=h;o[e+40>>2]=i;o[e+44>>2]=1.0;h=j+c;o[e+48>>2]=h;o[e+52>>2]=k;o[e+56>>2]=1.0;c=j-c;o[e+60>>2]=c;o[e+64>>2]=i;o[e+68>>2]=1.0;o[e+72>>2]=h;o[e+76>>2]=g;o[e+80>>2]=1.0;o[e+84>>2]=c;o[e+88>>2]=f;o[e+92>>2]=1.0;b=cw(a+16|0,96,e,35044)|0;r=d;return b|0;}function Jy(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;d=r;r=r+16|0;b=d;c=b;e=24696;f=c+10|0;do{i[c>>0]=i[e>>0]|0;c=c+1|0;e=e+1|0;}while((c|0)<(f|0));f=gw(a+32|0,10,b,35044)|0;r=d;return f|0;}function Ky(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;var f=0,g=0,h=0;c=r;r=r+64|0;g=c;f=k[a+8>>2]|0;f=be[k[(k[f>>2]|0)+16>>2]&255](f)|0;pv(f);h=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;ft(g,h,be[k[(k[b>>2]|0)+12>>2]&255](b)|0);Sv(f+48|0,g);Tv(f+64|0,e);Uv(f+80|0,12,0);Vv(f+96|0,12,8);e=k[a>>2]|0;e=be[k[(k[e>>2]|0)+8>>2]&255](e)|0;Yd[k[(k[e>>2]|0)+104>>2]&31](e,5,10,5121,0);Wv(f);r=c;return 1;}function Ly(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Dv(a,b,c);ow(a+80|0,b,c,d);ww(a+136|0,b,c);Fw(a+184|0,b,c);Cx(a+284|0,b,c);Ix(a+332|0,b,c);Px(a+380|0,b,c);$x(a+460|0,b,c);dz(a+524|0,b,c);hy(a+572|0,b,c);tz(a+620|0,b,c,e);By(a+696|0,b,c);return;}function My(a){a=a|0;Gv(a+60|0);Hv(a+44|0);Xy(a+16|0);Iv(a+8|0);Dt(a);return;}function Ny(a){a=a|0;Gv(a+32|0);Hv(a+16|0);Iv(a+8|0);Dt(a);return;}function Oy(a){a=a|0;Gv(a+32|0);Hv(a+16|0);Iv(a+8|0);Dt(a);return;}function Py(a){a=a|0;Gv(a+48|0);Gv(a+32|0);Hv(a+16|0);Iv(a+8|0);Dt(a);return;}function Qy(a){a=a|0;Gv(a+64|0);Hv(a+48|0);Gv(a+32|0);Hv(a+16|0);Iv(a+8|0);Dt(a);return;}function Ry(a){a=a|0;Hv(a+32|0);Gv(a+16|0);Iv(a+8|0);Dt(a);return;}function Sy(a){a=a|0;Hv(a+32|0);Gv(a+16|0);Iv(a+8|0);Dt(a);return;}function Ty(a){a=a|0;Gv(a+84|0);Hv(a+68|0);Gv(a+52|0);Hv(a+36|0);Gw(a+16|0);Iv(a+8|0);Dt(a);return;}function Uy(a){a=a|0;Gv(a+32|0);Hv(a+16|0);Iv(a+8|0);Dt(a);return;}function Vy(a){a=a|0;Hv(a+40|0);Gv(a+24|0);pw(a+16|0);Iv(a+8|0);Dt(a);return;}function Wy(a){a=a|0;Gv(a+64|0);Gv(a+48|0);Hv(a+32|0);Hv(a+16|0);Iv(a+8|0);Dt(a);return;}function Xy(a){a=a|0;Yy(a+20|0);Zy(a);return;}function Yy(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function Zy(a){a=a|0;var b=0;_y(a,k[a+8>>2]|0);b=k[a>>2]|0;k[a>>2]=0;if(b|0)YN(b);return;}function _y(a,b){a=a|0;b=b|0;while(1){if(!b)break;a=k[b>>2]|0;$y(b+8|0);YN(b);b=a;}return;}function $y(a){a=a|0;az(a+12|0);dO(a);return;}function az(a){a=a|0;bz(a+20|0);Dg(a);return;}function bz(a){a=a|0;a=k[a+4>>2]|0;if(a|0)RN(a);return;}function cz(a){a=a|0;if(((((((((Lv(a)|0?qw(a+80|0)|0:0)?xw(a+136|0)|0:0)?Kw(a+184|0)|0:0)?Dx(a+284|0)|0:0)?Jx(a+332|0)|0:0)?Qx(a+380|0)|0:0)?ay(a+460|0)|0:0)?ez(a+524|0)|0:0)?iy(a+572|0)|0:0)return Cy(a+696|0)|0;return 0;}function dz(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;k[a>>2]=k[b>>2];d=k[b+4>>2]|0;k[a+4>>2]=d;if(d|0)PN(d);k[a+8>>2]=k[c>>2];c=k[c+4>>2]|0;k[a+12>>2]=c;if(c|0)PN(c);Ev(a+16|0,b);Fv(a+32|0,b);return;}function ez(a){a=a|0;if(!(k[a>>2]|0))return 0;else return(k[a+8>>2]|0)!=0|0;return 0;}function fz(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,l=0.0,m=0.0,n=0.0;j=r;r=r+48|0;h=j+40|0;e=j+32|0;f=j+24|0;g=j+16|0;i=j;if(gz(a)|0){m=+o[c>>2];l=+o[c+4>>2];c=k[(k[d>>2]|0)+28>>2]|0;n=l+ +o[b+4>>2];o[e>>2]=m+ +o[b>>2];o[e+4>>2]=n;se[c&63](h,d,e);c=k[(k[d>>2]|0)+28>>2]|0;l=l+ +o[b+12>>2];o[f>>2]=m+ +o[b+8>>2];o[f+4>>2]=l;se[c&63](e,d,f);hz(f,h,d);hz(g,e,d);st(i,f,g);a:do if(iz(a,i)|0){f=k[a>>2]|0;f=be[k[(k[f>>2]|0)+8>>2]&255](f)|0;e=k[a+8>>2]|0;e=be[k[(k[e>>2]|0)+28>>2]&255](e)|0;pv(e);c=(be[k[(k[d>>2]|0)+16>>2]&255](d)|0)+8|0;n=+oP(+(+o[c>>2]*4.0));Sv(e+48|0,be[k[(k[d>>2]|0)+8>>2]&255](d)|0);c=k[i+12>>2]|0;k[h>>2]=k[i>>2];k[h+4>>2]=c;Yv(e+80|0,h);Xv(e+96|0,n);Xv(e+112|0,0.0);Uv(e+128|0,16,0);Uv(e+144|0,16,8);c=(be[k[(k[d>>2]|0)+16>>2]&255](d)|0)+8|0;c=~~+oP(+ +o[c>>2]);e=e+64|0;b=0;while(1){if((b|0)>=(c|0)){b=1;break a;}Xv(e,+(b|0));Yd[k[(k[f>>2]|0)+104>>2]&31](f,2,4,5121,0);b=b+1|0;}}else b=0;while(0);}else b=0;r=j;return b|0;}function gz(a){a=a|0;var b=0,c=0;c=r;r=r+16|0;b=c;a=a+16|0;if(fw(a)|0)a=1;else{k[b>>2]=50462976;a=gw(a,4,b,35044)|0;}r=c;return a|0;}function hz(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0,e=0.0,f=0;f=be[k[(k[c>>2]|0)+16>>2]&255](c)|0;f=k[f>>2]|0;c=(be[k[(k[c>>2]|0)+16>>2]&255](c)|0)+4|0;c=k[c>>2]|0;e=+oP(+(+(f>>>0)*+o[b>>2]))+.5;d=+oP(+(+(c>>>0)*(1.0-+o[b+4>>2])))+.5;o[a>>2]=e;o[a+4>>2]=d;return;}function iz(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;c=r;r=r+64|0;d=c;g=k[b>>2]|0;e=k[b+4>>2]|0;f=k[b+8>>2]|0;b=k[b+12>>2]|0;k[d>>2]=g;k[d+4>>2]=e;o[d+8>>2]=1.0;o[d+12>>2]=1.0;k[d+16>>2]=g;k[d+20>>2]=b;o[d+24>>2]=1.0;o[d+28>>2]=-1.0;k[d+32>>2]=f;k[d+36>>2]=b;o[d+40>>2]=-1.0;o[d+44>>2]=-1.0;k[d+48>>2]=f;k[d+52>>2]=e;o[d+56>>2]=-1.0;o[d+60>>2]=1.0;b=cw(a+32|0,64,d,35044)|0;r=c;return b|0;}function jz(a,b,c){a=a|0;b=b|0;c=c|0;return kz(a,b,c,-1)|0;}function kz(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0;g=a+8|0;f=k[g>>2]|0;e=f;do if((k[a+12>>2]|0)-f>>3>>>0>b>>>0){f=k[e+(b<<3)+4>>2]|0;e=lz(g,k[e+(b<<3)>>2]|0,f,d,b)|0;if((e|0)==(b|0)){e=$(k[a>>2]|0,d)|0;if((c|0)==1){b=mz(g,e+f|0,0-d|0,b)|0;break;}else{b=mz(g,f-e|0,0-d|0,b)|0;break;}}else b=e;}while(0);return b|0;}function lz(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,l=0,m=0;i=k[a>>2]|0;l=(k[a+4>>2]|0)-i>>3;j=(d|0)==0;g=0;a=0;h=0;while(1){if((h|0)==(l|0))break;m=(k[i+(h<<3)>>2]|0)-b|0;f=(m|0)>-1?m:0-m|0;if((k[i+(h<<3)+4>>2]|0)==(c|0)?j|($(m,d)|0)>0:0){m=(f|0)<(a|0)|g^1;g=1;a=m?f:a;e=m?h:e;}h=h+1|0;}return e|0;}function mz(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;h=k[a>>2]|0;i=(k[a+4>>2]|0)-h>>3;e=0;g=0;a=0;while(1){if((g|0)==(i|0))break;do if((k[h+(g<<3)+4>>2]|0)==(b|0)){f=k[h+(g<<3)>>2]|0;if(e?($(f-a|0,c)|0)<=0:0){e=1;break;}e=1;d=g;a=f;}while(0);g=g+1|0;}return d|0;}function nz(a,b,c){a=a|0;b=b|0;c=c|0;return kz(a,b,c,1)|0;}function oz(a,b,c){a=a|0;b=b|0;c=c|0;return pz(a,b,1,c)|0;}function pz(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0;f=a+8|0;g=k[f>>2]|0;e=g;if((k[a+12>>2]|0)-g>>3>>>0>b>>>0){if(!(i[d>>0]|0)){g=k[e+(b<<3)>>2]|0;i[d>>0]=1;k[d+4>>2]=g;d=g;}else d=k[d+4>>2]|0;b=lz(f,d,($(k[a>>2]|0,c)|0)+(k[e+(b<<3)+4>>2]|0)|0,0,b)|0;}return b|0;}function qz(a,b,c){a=a|0;b=b|0;c=c|0;return pz(a,b,-1,c)|0;}function rz(a,b){a=a|0;b=b|0;var c=0,d=0.0,e=0,f=0,g=0.0,h=0,i=0;f=k[a+8>>2]|0;a=k[a+12>>2]|0;a:do if((f|0)==(a|0))a=0;else{e=a-f>>3;c=1;a=0;d=+sz(f,b);while(1){if(c>>>0>=e>>>0)break a;g=+sz(f+(c<<3)|0,b);h=g<d;i=h?c:a;c=c+1|0;a=i;d=h?g:d;}}while(0);return a|0;}function sz(a,b){a=a|0;b=b|0;var c=0.0,d=0.0;d=+(k[a>>2]|0)-+o[b>>2];c=+(k[a+4>>2]|0)-+o[b+4>>2];return+(d*d+c*c);}function tz(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;k[a>>2]=k[b>>2];e=k[b+4>>2]|0;k[a+4>>2]=e;if(e|0)PN(e);k[a+8>>2]=k[c>>2];c=k[c+4>>2]|0;k[a+12>>2]=c;if(c|0)PN(c);Mz(a+16|0,d);Ev(a+44|0,b);Fv(a+60|0,b);return;}function uz(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,l=0,m=0.0;l=r;r=r+192|0;h=l+128|0;i=l+64|0;j=l;g=be[k[(k[a>>2]|0)+8>>2]&255](a)|0;ft(h,g,be[k[(k[a>>2]|0)+12>>2]&255](a)|0);a=h;g=e+64|0;do{k[e>>2]=k[a>>2];e=e+4|0;a=a+4|0;}while((e|0)<(g|0));lt(h,b,c);m=+oP(+ +o[h>>2]);it(i,m,+oP(+ +o[h+4>>2]));e=f;a=i;g=e+64|0;do{k[e>>2]=k[a>>2];e=e+4|0;a=a+4|0;}while((e|0)<(g|0));if(!(+O(+(d+-1.0))<9.99999993922529e-09)){m=1.0/d;jt(j,m,m);ft(i,f,j);e=f;a=i;g=e+64|0;do{k[e>>2]=k[a>>2];e=e+4|0;a=a+4|0;}while((e|0)<(g|0));}r=l;return;}function vz(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,m=0,n=0,p=0,q=0,s=0,t=0,u=0,v=0.0,w=0.0,x=0.0;t=r;r=r+384|0;s=t+368|0;f=t+288|0;n=t+304|0;p=t+224|0;q=t+160|0;g=t+144|0;h=t+128|0;j=t+64|0;m=t;u=(be[k[(k[b>>2]|0)+16>>2]&255](b)|0)+8|0;Nz(s,a+16|0,c,+o[u>>2]);if(k[s>>2]|0){if(wz(a)|0){et(n);et(p);u=k[s>>2]|0;uz(b,c+44|0,d,+ie[k[(k[u>>2]|0)+24>>2]&7](u),n,p);ft(q,n,p);x=+(l[c+16>>0]|0)/255.0;o[g>>2]=x;w=+(l[c+17>>0]|0)/255.0;o[g+4>>2]=w;v=+(l[c+18>>0]|0)/255.0;o[g+8>>2]=v;o[g+12>>2]=1.0;v=x*.30000001192092896+w*.5899999737739563+v*.10999999940395355>.75?0.0:1.0;o[h>>2]=v;o[h+4>>2]=v;o[h+8>>2]=v;o[h+12>>2]=1.0;b=k[s>>2]|0;b=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;d=k[a+8>>2]|0;d=be[k[(k[d>>2]|0)+36>>2]&255](d)|0;pv(d);Yd[k[(k[e>>2]|0)+8>>2]&31](e,770,771,1,1);if(i[c+24>>0]|0){it(m,0.0,-1.0);ft(j,m,p);ft(m,n,j);xz(a,m,6444,0,b,1,d)|0;xz(a,q,h,0,b,1,d)|0;}b=xz(a,q,g,0,b,0,d)|0;}else b=0;}else{bO(f,c);dO(f);b=0;}bz(s);r=t;return b|0;}function wz(a){a=a|0;var b=0,c=0;c=r;r=r+16|0;b=c;a=a+44|0;if(fw(a)|0)a=1;else{k[b>>2]=50462976;a=gw(a,4,b,35044)|0;}r=c;return a|0;}function xz(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0;Sv(g+48|0,b);Tv(g+64|0,c);h=k[e+4>>2]|0;b=1;d=k[e>>2]|0;while(1){if((d|0)==(h|0))break;c=k[d>>2]|0;if(c)b=b&(yz(a,c,f,g)|0);d=d+8|0;}return b|0;}function yz(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;f=r;r=r+48|0;e=f;se[k[(k[b>>2]|0)+8>>2]&63](e,b,c);if((i[e>>0]|0)!=0?zz(a,e)|0:0){Uv(d+80|0,16,0);Uv(d+96|0,16,8);a=k[a>>2]|0;a=be[k[(k[a>>2]|0)+8>>2]&255](a)|0;Yd[k[(k[a>>2]|0)+104>>2]&31](a,5,4,5121,0);Az(d);a=1;}else a=0;r=f;return a|0;}function zz(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0.0,g=0.0,h=0,i=0.0,j=0,l=0.0;c=r;r=r+64|0;d=c;i=+oP(+ +o[b+4>>2]);l=+oP(+ +o[b+8>>2]);g=+oP(+ +o[b+12>>2]);f=+oP(+ +o[b+16>>2]);h=k[b+20>>2]|0;j=k[b+24>>2]|0;e=k[b+28>>2]|0;b=k[b+32>>2]|0;o[d>>2]=i;o[d+4>>2]=l;k[d+8>>2]=h;k[d+12>>2]=j;o[d+16>>2]=g;o[d+20>>2]=l;k[d+24>>2]=e;k[d+28>>2]=j;o[d+32>>2]=i;o[d+36>>2]=f;k[d+40>>2]=h;k[d+44>>2]=b;o[d+48>>2]=g;o[d+52>>2]=f;k[d+56>>2]=e;k[d+60>>2]=b;b=cw(a+60|0,64,d,35044)|0;r=c;return b|0;}function Az(a){a=a|0;hv(a+80|0);hv(a+96|0);return;}function Bz(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,l=0,n=0,p=0,q=0;p=r;r=r+224|0;n=p+208|0;g=p+128|0;h=p+144|0;j=p+64|0;l=p+216|0;f=p;q=(be[k[(k[b>>2]|0)+16>>2]&255](b)|0)+8|0;Nz(n,a+16|0,c,+o[q>>2]);if(k[n>>2]|0){if(wz(a)|0){et(h);et(j);q=k[n>>2]|0;uz(b,c+44|0,d,+ie[k[(k[q>>2]|0)+24>>2]&7](q),h,j);k[f>>2]=m[e>>1]|m[e+2>>1]<<16;i[f+4>>0]=0;jB(l,f);q=k[a+8>>2]|0;q=be[k[(k[q>>2]|0)+16>>2]&255](q)|0;pv(q);ft(f,h,j);Sv(q+48|0,f);mw(f,l);Tv(q+64|0,f);l=k[n>>2]|0;a=Cz(a,be[k[(k[l>>2]|0)+12>>2]&255](l)|0,q)|0;}else a=0;}else{bO(g,c);dO(g);a=0;}bz(n);r=p;return a|0;}function Cz(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=k[b+4>>2]|0;d=1;b=k[b>>2]|0;while(1){if((b|0)==(e|0))break;d=d&(Dz(a,b,c)|0);b=b+16|0;}return d|0;}function Dz(a,b,c){a=a|0;b=b|0;c=c|0;if(Ez(a,b)|0){Uv(c+80|0,12,0);Vv(c+96|0,12,8);a=k[a>>2]|0;a=be[k[(k[a>>2]|0)+8>>2]&255](a)|0;Yd[k[(k[a>>2]|0)+104>>2]&31](a,5,4,5121,0);Wv(c);a=1;}else a=0;return a|0;}function Ez(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;c=r;r=r+48|0;d=c;f=k[b>>2]|0;g=k[b+4>>2]|0;e=k[b+8>>2]|0;b=k[b+12>>2]|0;k[d>>2]=f;k[d+4>>2]=g;o[d+8>>2]=1.0;k[d+12>>2]=e;k[d+16>>2]=g;o[d+20>>2]=1.0;k[d+24>>2]=f;k[d+28>>2]=b;o[d+32>>2]=1.0;k[d+36>>2]=e;k[d+40>>2]=b;o[d+44>>2]=1.0;b=cw(a+60|0,48,d,35044)|0;r=c;return b|0;}function Fz(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0.0,m=0,n=0,p=0,q=0,s=0,t=0.0,u=0.0,v=0.0,w=0.0,x=0;s=r;r=r+80|0;q=s+72|0;g=s+40|0;m=s+56|0;n=s+24|0;p=s+16|0;h=s+8|0;i=s;f=(be[k[(k[b>>2]|0)+16>>2]&255](b)|0)+8|0;j=+o[f>>2];Nz(q,a+16|0,c,j);f=k[q>>2]|0;if(f){f=be[k[(k[f>>2]|0)+20>>2]&255](f)|0;g=f+8|0;if((k[f+12>>2]|0)-(k[g>>2]|0)>>3>>>0>d>>>0?wz(a)|0:0){u=+(l[c+16>>0]|0)/255.0;o[m>>2]=u;t=+(l[c+17>>0]|0)/255.0;o[m+4>>2]=t;w=+(l[c+18>>0]|0)/255.0;o[m+8>>2]=w;o[m+12>>2]=1.0;w=u*.30000001192092896+t*.5899999737739563+w*.10999999940395355>.75?0.0:1.0;o[n>>2]=w;o[n+4>>2]=w;o[n+8>>2]=w;o[n+12>>2]=1.0;Yd[k[(k[e>>2]|0)+8>>2]&31](e,770,771,1,1);e=k[a+8>>2]|0;e=be[k[(k[e>>2]|0)+16>>2]&255](e)|0;pv(e);Sv(e+48|0,be[k[(k[b>>2]|0)+8>>2]&255](b)|0);x=k[q>>2]|0;w=+ie[k[(k[x>>2]|0)+24>>2]&7](x);x=k[f>>2]|0;f=k[f+4>>2]|0;t=+ie[k[(k[b>>2]|0)+20>>2]&7](b);u=+oP(+(+(x|0)/w*t));t=+oP(+(+(f|0)/w*t));j=+oP(+j);f=k[g>>2]|0;v=+o[c+48>>2]+ +(k[f+(d<<3)+4>>2]|0)/w;o[p>>2]=+o[c+44>>2]+ +(k[f+(d<<3)>>2]|0)/w;o[p+4>>2]=v;se[k[(k[b>>2]|0)+28>>2]&63](i,b,p);Gz(h,b,i);Hz(a,e,n,h,j*3.0,u,t)|0;f=Hz(a,e,m,h,j,u,t)|0;}else f=0;}else{bO(g,c);dO(g);f=0;}bz(q);r=s;return f|0;}function Gz(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0,e=0.0,f=0;e=+o[c>>2];f=be[k[(k[b>>2]|0)+16>>2]&255](b)|0;e=e*+((k[f>>2]|0)>>>0);d=1.0-+o[c+4>>2];c=(be[k[(k[b>>2]|0)+16>>2]&255](b)|0)+4|0;d=d*+((k[c>>2]|0)>>>0);o[a>>2]=e;o[a+4>>2]=d;return;}function Hz(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;f=+f;g=+g;Tv(b+64|0,c);if(Iz(a,d,e,f,g)|0){Uv(b+80|0,12,0);Vv(b+96|0,12,8);a=k[a>>2]|0;a=be[k[(k[a>>2]|0)+8>>2]&255](a)|0;Yd[k[(k[a>>2]|0)+104>>2]&31](a,5,4,5121,0);Wv(b);a=1;}else a=0;return a|0;}function Iz(a,b,c,d,e){a=a|0;b=b|0;c=+c;d=+d;e=+e;var f=0,g=0,h=0.0,i=0.0,j=0.0;f=r;r=r+48|0;g=f;j=c*.5;i=+oP(+(+o[b>>2]-j));h=+oP(+(i+c));j=+oP(+(+o[b+4>>2]-e-j));e=+oP(+(j+d+c));o[g>>2]=i;o[g+4>>2]=j;o[g+8>>2]=1.0;o[g+12>>2]=h;o[g+16>>2]=j;o[g+20>>2]=1.0;o[g+24>>2]=i;o[g+28>>2]=e;o[g+32>>2]=1.0;o[g+36>>2]=h;o[g+40>>2]=e;o[g+44>>2]=1.0;b=cw(a+60|0,48,g,35044)|0;r=f;return b|0;}function Jz(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,l=0.0,m=0.0,n=0.0,p=0.0,q=0.0;j=r;r=r+64|0;i=j+48|0;e=j+16|0;f=j+32|0;g=j+8|0;h=j;c=(be[k[(k[c>>2]|0)+16>>2]&255](c)|0)+8|0;Nz(i,a+16|0,b,+o[c>>2]);a=k[i>>2]|0;if(!a){bO(e,b);dO(e);a=0;}else{a=be[k[(k[a>>2]|0)+16>>2]&255](a)|0;e=k[i>>2]|0;m=+ie[k[(k[e>>2]|0)+24>>2]&7](e);p=+o[b+44>>2];q=+o[b+48>>2];n=p+ +o[a>>2]/m;l=q+ +o[a+4>>2]/m;p=p+ +o[a+8>>2]/m;m=q+ +o[a+12>>2]/m;o[g>>2]=(p<n?p:n)+-15.0;o[g+4>>2]=(m<l?m:l)+-7.0;o[h>>2]=(n<p?p:n)+15.0;o[h+4>>2]=(l<m?m:l)+7.0;st(f,g,h);k[d>>2]=k[f>>2];k[d+4>>2]=k[f+4>>2];k[d+8>>2]=k[f+8>>2];k[d+12>>2]=k[f+12>>2];a=1;}bz(i);r=j;return a|0;}function Kz(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;f=f|0;var g=0,h=0,j=0;j=r;r=r+32|0;h=j+16|0;g=j;Nz(h,a+16|0,c,d);a=k[h>>2]|0;a:do if(!a){bO(g,c);dO(g);}else switch(b|0){case 7:{e=qz(be[k[(k[a>>2]|0)+20>>2]&255](a)|0,e,f)|0;break a;}case 6:{e=oz(be[k[(k[a>>2]|0)+20>>2]&255](a)|0,e,f)|0;break a;}case 4:{e=jz(be[k[(k[a>>2]|0)+20>>2]&255](a)|0,e,k[c+40>>2]|0)|0;i[f>>0]=0;break a;}case 5:{e=nz(be[k[(k[a>>2]|0)+20>>2]&255](a)|0,e,k[c+40>>2]|0)|0;i[f>>0]=0;break a;}default:break a;}while(0);bz(h);r=j;return e|0;}function Lz(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;f=f|0;var g=0,h=0,j=0,l=0;l=r;r=r+32|0;j=l+24|0;g=l;h=l+16|0;Nz(j,a+16|0,c,d);a=k[j>>2]|0;if(!a){bO(g,c);dO(g);}else{i[f>>0]=0;e=be[k[(k[a>>2]|0)+20>>2]&255](a)|0;g=k[j>>2]|0;d=+ie[k[(k[g>>2]|0)+24>>2]&7](g);mt(h,b,c+44|0);o[h>>2]=d*+o[h>>2];g=h+4|0;o[g>>2]=d*+o[g>>2];e=rz(e,h)|0;}bz(j);r=l;return e|0;}function Mz(a,b){a=a|0;b=b|0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;k[a+12>>2]=0;o[a+16>>2]=1.0;k[a+20>>2]=k[b>>2];b=k[b+4>>2]|0;k[a+24>>2]=b;if(b|0)PN(b);return;}function Nz(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;var e=0,f=0,g=0,h=0,i=0,j=0;j=r;r=r+32|0;f=j+16|0;g=j+8|0;h=j;k[a>>2]=0;i=a+4|0;k[i>>2]=0;if(!(Oz(b,c,d,a)|0)){k[g>>2]=k[a>>2];e=k[i>>2]|0;k[g+4>>2]=e;if(e|0)PN(e);Pz(h,b,c,d,g);e=k[h>>2]|0;b=h+4|0;c=k[b>>2]|0;k[h>>2]=0;k[b>>2]=0;k[f>>2]=k[a>>2];k[a>>2]=e;k[f+4>>2]=k[i>>2];k[i>>2]=c;bz(f);bz(h);bz(g);}r=j;return;}function Oz(a,b,c,d){a=a|0;b=b|0;c=+c;d=d|0;var e=0,f=0,g=0,h=0,i=0;i=r;r=r+16|0;h=i;f=Xz(a,b)|0;if(!f)a=0;else{g=k[f+40>>2]|0;k[h>>2]=g;a=h+4|0;e=k[f+44>>2]|0;k[a>>2]=e;if(e|0)PN(e);k[h>>2]=k[d>>2];k[d>>2]=g;d=d+4|0;k[a>>2]=k[d>>2];k[d>>2]=e;bz(h);a=Yz(b,c,f+20|0)|0;}r=i;return a|0;}function Pz(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;var f=0,g=0,h=0,i=0,l=0,m=0;l=r;r=r+48|0;g=l;i=l+12|0;h=Qz(+o[c+20>>2])|0;m=k[b+20>>2]|0;f=c+28|0;ee[k[(k[m>>2]|0)+16>>2]&1](a,m,f,k[c+40>>2]|0,h,d,e);if(!(k[a>>2]|0)){bO(g,c);dO(g);}else{Ig(i,f);j[i+12>>1]=h;o[i+16>>2]=d;k[i+20>>2]=k[a>>2];a=k[a+4>>2]|0;k[i+24>>2]=a;if(a|0)PN(a);Sz(Rz(b,c)|0,i)|0;az(i);}r=l;return;}function Qz(a){a=+a;var b=0;b=~~+oP(+(a*4.0))&65535;b=(b&65535)<4?4:b;return((b&65535)>160?160:b)|0;}function Rz(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0.0,g=0.0,h=0,j=0,l=0,m=0,n=0,p=0,q=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;B=r;r=r+32|0;A=B+4|0;u=B;v=B+16|0;k[u>>2]=b;z=uu(a+12|0,b)|0;x=a+4|0;h=k[x>>2]|0;y=(h|0)==0;a:do if(!y){n=h+-1|0;p=(n&h|0)==0;if(p)q=n&z;else q=(z>>>0)%(h>>>0)|0;c=k[(k[a>>2]|0)+(q<<2)>>2]|0;if(!c){c=q;w=19;}else{s=b+11|0;t=b+4|0;b:while(1){c=k[c>>2]|0;if(!c){c=q;w=19;break a;}d=k[c+4>>2]|0;if(p)d=d&n;else d=(d>>>0)%(h>>>0)|0;if((d|0)!=(q|0)){c=q;w=19;break a;}d=c+8|0;j=i[d+11>>0]|0;l=j<<24>>24<0;j=j&255;m=l?k[c+12>>2]|0:j;C=i[s>>0]|0;e=C<<24>>24<0;if((m|0)!=((e?k[t>>2]|0:C&255)|0))continue;e=e?k[b>>2]|0:b;if(l)if(!(no(k[d>>2]|0,e,m)|0))break;else continue;while(1){if(!j)break a;if((i[d>>0]|0)!=(i[e>>0]|0))continue b;j=j+-1|0;e=e+1|0;d=d+1|0;}}}}else{c=0;w=19;}while(0);if((w|0)==19){Tz(A,a,z,38897,u,v);j=a+12|0;f=+(((k[j>>2]|0)+1|0)>>>0);g=+o[a+16>>2];do if(y|f>+(h>>>0)*g){c=(h>>>0>2&(h+-1&h|0)==0&1|h<<1)^1;d=~~+_(+(f/g))>>>0;Uz(a,c>>>0<d>>>0?d:c);c=k[x>>2]|0;d=c+-1|0;if(!(d&c)){h=c;c=d&z;break;}else{h=c;c=(z>>>0)%(c>>>0)|0;break;}}while(0);d=k[(k[a>>2]|0)+(c<<2)>>2]|0;if(!d){e=a+8|0;k[k[A>>2]>>2]=k[e>>2];k[e>>2]=k[A>>2];k[(k[a>>2]|0)+(c<<2)>>2]=e;e=k[A>>2]|0;c=k[e>>2]|0;if(!c)c=A;else{c=k[c+4>>2]|0;d=h+-1|0;if(!(d&h))c=c&d;else c=(c>>>0)%(h>>>0)|0;k[(k[a>>2]|0)+(c<<2)>>2]=e;c=A;}}else{k[k[A>>2]>>2]=k[d>>2];k[d>>2]=k[A>>2];c=A;}C=k[c>>2]|0;k[j>>2]=(k[j>>2]|0)+1;k[c>>2]=0;c=C;}r=B;return c+20|0;}function Sz(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;g=r;r=r+16|0;f=g;Ph(a,b)|0;e=b+12|0;d=k[e+4>>2]|0;c=a+12|0;k[c>>2]=k[e>>2];k[c+4>>2]=d;c=a+20|0;d=k[b+20>>2]|0;k[f>>2]=d;e=f+4|0;b=k[b+24>>2]|0;k[e>>2]=b;if(b|0)PN(b);k[f>>2]=k[c>>2];k[c>>2]=d;d=a+24|0;k[e>>2]=k[d>>2];k[d>>2]=b;bz(f);r=g;return a|0;}function Tz(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;d=UN(48)|0;k[a>>2]=d;k[a+4>>2]=b+8;f=a+8|0;i[f>>0]=0;bO(d+8|0,k[e>>2]|0);e=d+20|0;k[e>>2]=0;k[e+4>>2]=0;k[e+8>>2]=0;k[e+12>>2]=0;k[e+16>>2]=0;k[e+20>>2]=0;k[e+24>>2]=0;Wz(e);i[f>>0]=1;f=k[a>>2]|0;k[f+4>>2]=c;k[f>>2]=0;return;}function Uz(a,b){a=a|0;b=b|0;var c=0,d=0;if((b|0)!=1){if(b+-1&b)b=KN(b)|0;}else b=2;d=k[a+4>>2]|0;if(b>>>0<=d>>>0){if(b>>>0<d>>>0){c=~~+_(+(+((k[a+12>>2]|0)>>>0)/+o[a+16>>2]))>>>0;if(d>>>0>2&(d+-1&d|0)==0)c=1<<32-(ca(c+-1|0)|0);else c=KN(c)|0;b=b>>>0<c>>>0?c:b;if(b>>>0<d>>>0)Vz(a,b);}}else Vz(a,b);return;}function Vz(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;d=a+4|0;a:do if(b){if(b>>>0>1073741823){a=vc(4)|0;hP(a);Pd(a|0,2968,374);}t=UN(b<<2)|0;c=k[a>>2]|0;k[a>>2]=t;if(c|0)YN(c);k[d>>2]=b;c=0;while(1){if((c|0)==(b|0))break;k[(k[a>>2]|0)+(c<<2)>>2]=0;c=c+1|0;}e=a+8|0;c=k[e>>2]|0;if(c|0){d=k[c+4>>2]|0;s=b+-1|0;t=(s&b|0)==0;if(t)d=d&s;else d=(d>>>0)%(b>>>0)|0;k[(k[a>>2]|0)+(d<<2)>>2]=e;while(1){r=c;b:while(1)while(1){c=k[r>>2]|0;if(!c)break a;e=k[c+4>>2]|0;if(t)q=e&s;else q=(e>>>0)%(b>>>0)|0;if((q|0)==(d|0)){r=c;continue b;}e=(k[a>>2]|0)+(q<<2)|0;if(!(k[e>>2]|0))break b;m=c+8|0;n=m+11|0;o=c+12|0;p=c;c:while(1){e=k[p>>2]|0;if(!e){f=34;break;}f=e+8|0;h=i[n>>0]|0;j=h<<24>>24<0;h=h&255;l=j?k[o>>2]|0:h;u=i[f+11>>0]|0;g=u<<24>>24<0;if((l|0)!=((g?k[e+12>>2]|0:u&255)|0)){f=34;break;}f=g?k[f>>2]|0:f;if(j){if(no(k[m>>2]|0,f,l)|0){f=31;break;}p=k[p>>2]|0;continue;}else g=m;while(1){if(!h){p=e;continue c;}if((i[g>>0]|0)!=(i[f>>0]|0)){f=33;break c;}h=h+-1|0;f=f+1|0;g=g+1|0;}}if((f|0)==31)e=k[p>>2]|0;k[r>>2]=e;k[p>>2]=k[k[(k[a>>2]|0)+(q<<2)>>2]>>2];k[k[(k[a>>2]|0)+(q<<2)>>2]>>2]=c;}k[e>>2]=r;d=q;}}}else{c=k[a>>2]|0;k[a>>2]=0;if(c|0)YN(c);k[d>>2]=0;}while(0);return;}function Wz(a){a=a|0;var b=0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;b=0;while(1){if((b|0)==3)break;k[a+(b<<2)>>2]=0;b=b+1|0;}k[a+20>>2]=0;k[a+24>>2]=0;return;}function Xz(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0;c=uu(a+12|0,b)|0;m=k[a+4>>2]|0;a:do if(m){n=m+-1|0;o=(n&m|0)==0;if(o)l=n&c;else l=(c>>>0)%(m>>>0)|0;c=k[(k[a>>2]|0)+(l<<2)>>2]|0;if(c){h=b+11|0;j=b+4|0;b:while(1){c=k[c>>2]|0;if(!c){c=0;break a;}a=k[c+4>>2]|0;if(o)a=a&n;else a=(a>>>0)%(m>>>0)|0;if((a|0)!=(l|0)){c=0;break a;}a=c+8|0;e=i[a+11>>0]|0;f=e<<24>>24<0;e=e&255;g=f?k[c+12>>2]|0:e;p=i[h>>0]|0;d=p<<24>>24<0;if((g|0)!=((d?k[j>>2]|0:p&255)|0))continue;d=d?k[b>>2]|0:b;if(f)if(!(no(k[a>>2]|0,d,g)|0))break;else continue;while(1){if(!e)break a;if((i[a>>0]|0)!=(i[d>>0]|0))continue b;e=e+-1|0;d=d+1|0;a=a+1|0;}}}else c=0;}else c=0;while(0);return c|0;}function Yz(a,b,c){a=a|0;b=+b;c=c|0;var d=0,e=0,f=0,g=0,h=0,l=0;l=Qz(+o[a+20>>2])|0;a:do if((k[c+20>>2]|0)!=0?(g=a+28|0,d=i[c+8+3>>0]|0,h=d<<24>>24<0,d=h?k[c+4>>2]|0:d&255,e=i[a+36+3>>0]|0,f=e<<24>>24<0,(d|0)==((f?k[a+32>>2]|0:e&255)|0)):0){e=d;d=f?k[g>>2]|0:g;a=h?k[c>>2]|0:c;while(1){if(!e)break;if((k[d>>2]|0)!=(k[a>>2]|0)){a=0;break a;}e=e+-1|0;d=d+4|0;a=a+4|0;}if(+O(+(+o[c+16>>2]-b))<9.99999993922529e-09)a=(j[c+12>>1]|0)==l<<16>>16;else a=0;}else a=0;while(0);return a|0;}function Zz(a,b,c){a=a|0;b=b|0;c=c|0;eA(a,b,c);return;}function _z(a){a=a|0;return fA(a)|0;}function $z(a,b,c,d,e,f,g,h,i,j,l,m){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;l=l|0;m=m|0;var n=0,o=0,p=0;n=r;r=r+16|0;o=n;p=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;k[o>>2]=k[p>>2];k[o+4>>2]=k[p+4>>2];k[o+8>>2]=k[p+8>>2];k[o+12>>2]=k[p+12>>2];_d[k[(k[l>>2]|0)+8>>2]&511](l);mA(a,h);nA(a,be[k[(k[b>>2]|0)+12>>2]&255](b)|0,c,i);rA(a,be[k[(k[b>>2]|0)+16>>2]&255](b)|0,c,i,d,o,l,m);QA(a,o,c,i);pA(a,be[k[(k[b>>2]|0)+20>>2]&255](b)|0,c,i,g);_d[k[(k[j>>2]|0)+8>>2]&511](j);CA(a,j,l,i);sA(a,e,c,i);AA(a,d,c,i);BA(a,f,c,i);r=n;return;}function aA(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;_d[k[(k[e>>2]|0)+8>>2]&511](e);mA(a,38324);DA(a,be[k[(k[b>>2]|0)+20>>2]&255](b)|0,c,3,d);return;}function bA(a,b,c){a=a|0;b=b|0;c=c|0;eA(a,b,c);return;}function cA(a){a=a|0;return fA(a)|0;}function dA(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0;h=r;r=r+16|0;i=h;_d[k[(k[f>>2]|0)+8>>2]&511](f);mA(a,d);nA(a,be[k[(k[b>>2]|0)+12>>2]&255](b)|0,c,e);d=be[k[(k[b>>2]|0)+16>>2]&255](b)|0;k[i>>2]=0;k[i+4>>2]=0;rA(a,d,c,e,i,be[k[(k[b>>2]|0)+8>>2]&255](b)|0,f,g);hl(i);nA(a,be[k[(k[b>>2]|0)+20>>2]&255](b)|0,c,e);r=h;return;}function eA(a,b,c){a=a|0;b=b|0;c=c|0;k[a>>2]=k[b>>2];b=k[b+4>>2]|0;k[a+4>>2]=b;if(b|0)PN(b);k[a+8>>2]=k[c>>2];b=k[c+4>>2]|0;k[a+12>>2]=b;if(b|0)PN(b);return;}function fA(a){a=a|0;if(!(k[a>>2]|0))return 0;else return(k[a+8>>2]|0)!=0|0;return 0;}function gA(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0.0,h=0.0,j=0,l=0,m=0,n=0,p=0,q=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0;F=r;r=r+16|0;d=F;B=a+16|0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;k[a+12>>2]=0;o[B>>2]=1.0;z=k[b+4>>2]|0;A=a+12|0;C=a+4|0;E=a+12|0;D=a+8|0;y=k[b>>2]|0;while(1){if((y|0)==(z|0))break;b=k[y>>2]|0;a:do if(b|0){v=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;x=uu(A,v)|0;j=k[C>>2]|0;w=(j|0)==0;b:do if(!w){q=j+-1|0;s=(q&j|0)==0;if(s)b=q&x;else b=(x>>>0)%(j>>>0)|0;e=k[(k[a>>2]|0)+(b<<2)>>2]|0;if(e){t=v+11|0;u=v+4|0;c:while(1){e=k[e>>2]|0;if(!e)break b;f=k[e+4>>2]|0;if(s)f=f&q;else f=(f>>>0)%(j>>>0)|0;if((f|0)!=(b|0))break b;f=e+8|0;m=i[f+11>>0]|0;n=m<<24>>24<0;m=m&255;p=n?k[e+12>>2]|0:m;G=i[t>>0]|0;l=G<<24>>24<0;if((p|0)!=((l?k[u>>2]|0:G&255)|0))continue;l=l?k[v>>2]|0:v;if(n)if(!(no(k[f>>2]|0,l,p)|0))break a;else continue;while(1){if(!m)break a;if((i[f>>0]|0)!=(i[l>>0]|0))continue c;m=m+-1|0;l=l+1|0;f=f+1|0;}}}}else b=0;while(0);hA(d,a,x,v);g=+(((k[E>>2]|0)+1|0)>>>0);h=+o[B>>2];do if(w|g>+(j>>>0)*h){b=(j>>>0>2&(j+-1&j|0)==0&1|j<<1)^1;e=~~+_(+(g/h))>>>0;iA(a,b>>>0<e>>>0?e:b);b=k[C>>2]|0;e=b+-1|0;if(!(e&b)){j=b;b=e&x;break;}else{j=b;b=(x>>>0)%(b>>>0)|0;break;}}while(0);e=k[(k[a>>2]|0)+(b<<2)>>2]|0;if(!e){k[k[d>>2]>>2]=k[D>>2];k[D>>2]=k[d>>2];k[(k[a>>2]|0)+(b<<2)>>2]=D;f=k[d>>2]|0;b=k[f>>2]|0;if(b|0){b=k[b+4>>2]|0;e=j+-1|0;if(!(e&j))b=b&e;else b=(b>>>0)%(j>>>0)|0;k[(k[a>>2]|0)+(b<<2)>>2]=f;}}else{k[k[d>>2]>>2]=k[e>>2];k[e>>2]=k[d>>2];}k[E>>2]=(k[E>>2]|0)+1;}while(0);y=y+8|0;}b=k[c>>2]|0;d:do if(b|0){v=be[k[(k[b>>2]|0)+12>>2]&255](b)|0;x=uu(A,v)|0;j=k[C>>2]|0;w=(j|0)==0;e:do if(!w){q=j+-1|0;s=(q&j|0)==0;if(s)b=q&x;else b=(x>>>0)%(j>>>0)|0;e=k[(k[a>>2]|0)+(b<<2)>>2]|0;if(e){t=v+11|0;u=v+4|0;f:while(1){e=k[e>>2]|0;if(!e)break e;f=k[e+4>>2]|0;if(s)f=f&q;else f=(f>>>0)%(j>>>0)|0;if((f|0)!=(b|0))break e;f=e+8|0;m=i[f+11>>0]|0;n=m<<24>>24<0;m=m&255;p=n?k[e+12>>2]|0:m;G=i[t>>0]|0;l=G<<24>>24<0;if((p|0)!=((l?k[u>>2]|0:G&255)|0))continue;l=l?k[v>>2]|0:v;if(n)if(!(no(k[f>>2]|0,l,p)|0))break d;else continue;while(1){if(!m)break d;if((i[f>>0]|0)!=(i[l>>0]|0))continue f;m=m+-1|0;l=l+1|0;f=f+1|0;}}}}else b=0;while(0);hA(d,a,x,v);h=+(((k[E>>2]|0)+1|0)>>>0);g=+o[B>>2];do if(w|h>+(j>>>0)*g){b=(j>>>0>2&(j+-1&j|0)==0&1|j<<1)^1;e=~~+_(+(h/g))>>>0;iA(a,b>>>0<e>>>0?e:b);b=k[C>>2]|0;e=b+-1|0;if(!(e&b)){j=b;b=e&x;break;}else{j=b;b=(x>>>0)%(b>>>0)|0;break;}}while(0);e=k[(k[a>>2]|0)+(b<<2)>>2]|0;if(!e){k[k[d>>2]>>2]=k[D>>2];k[D>>2]=k[d>>2];k[(k[a>>2]|0)+(b<<2)>>2]=D;f=k[d>>2]|0;b=k[f>>2]|0;if(b){b=k[b+4>>2]|0;e=j+-1|0;if(!(e&j))b=b&e;else b=(b>>>0)%(j>>>0)|0;k[(k[a>>2]|0)+(b<<2)>>2]=f;}}else{k[k[d>>2]>>2]=k[e>>2];k[e>>2]=k[d>>2];}k[E>>2]=(k[E>>2]|0)+1;k[d>>2]=0;}while(0);r=F;return;}function hA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=UN(20)|0;k[a>>2]=e;k[a+4>>2]=b+8;b=a+8|0;i[b>>0]=0;bO(e+8|0,d);i[b>>0]=1;k[e+4>>2]=c;k[e>>2]=0;return;}function iA(a,b){a=a|0;b=b|0;var c=0,d=0;if((b|0)!=1){if(b+-1&b)b=KN(b)|0;}else b=2;d=k[a+4>>2]|0;if(b>>>0<=d>>>0){if(b>>>0<d>>>0){c=~~+_(+(+((k[a+12>>2]|0)>>>0)/+o[a+16>>2]))>>>0;if(d>>>0>2&(d+-1&d|0)==0)c=1<<32-(ca(c+-1|0)|0);else c=KN(c)|0;b=b>>>0<c>>>0?c:b;if(b>>>0<d>>>0)lA(a,b);}}else lA(a,b);return;}function jA(a){a=a|0;var b=0;kA(a,k[a+8>>2]|0);b=k[a>>2]|0;k[a>>2]=0;if(b|0)YN(b);return;}function kA(a,b){a=a|0;b=b|0;while(1){if(!b)break;a=k[b>>2]|0;dO(b+8|0);YN(b);b=a;}return;}function lA(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;d=a+4|0;a:do if(b){if(b>>>0>1073741823){a=vc(4)|0;hP(a);Pd(a|0,2968,374);}t=UN(b<<2)|0;c=k[a>>2]|0;k[a>>2]=t;if(c|0)YN(c);k[d>>2]=b;c=0;while(1){if((c|0)==(b|0))break;k[(k[a>>2]|0)+(c<<2)>>2]=0;c=c+1|0;}e=a+8|0;c=k[e>>2]|0;if(c|0){d=k[c+4>>2]|0;s=b+-1|0;t=(s&b|0)==0;if(t)d=d&s;else d=(d>>>0)%(b>>>0)|0;k[(k[a>>2]|0)+(d<<2)>>2]=e;while(1){r=c;b:while(1)while(1){c=k[r>>2]|0;if(!c)break a;e=k[c+4>>2]|0;if(t)q=e&s;else q=(e>>>0)%(b>>>0)|0;if((q|0)==(d|0)){r=c;continue b;}e=(k[a>>2]|0)+(q<<2)|0;if(!(k[e>>2]|0))break b;m=c+8|0;n=m+11|0;o=c+12|0;p=c;c:while(1){e=k[p>>2]|0;if(!e){f=34;break;}f=e+8|0;h=i[n>>0]|0;j=h<<24>>24<0;h=h&255;l=j?k[o>>2]|0:h;u=i[f+11>>0]|0;g=u<<24>>24<0;if((l|0)!=((g?k[e+12>>2]|0:u&255)|0)){f=34;break;}f=g?k[f>>2]|0:f;if(j){if(no(k[m>>2]|0,f,l)|0){f=31;break;}p=k[p>>2]|0;continue;}else g=m;while(1){if(!h){p=e;continue c;}if((i[g>>0]|0)!=(i[f>>0]|0)){f=33;break c;}h=h+-1|0;f=f+1|0;g=g+1|0;}}if((f|0)==31)e=k[p>>2]|0;k[r>>2]=e;k[p>>2]=k[k[(k[a>>2]|0)+(q<<2)>>2]>>2];k[k[(k[a>>2]|0)+(q<<2)>>2]>>2]=c;}k[e>>2]=r;d=q;}}}else{c=k[a>>2]|0;k[a>>2]=0;if(c|0)YN(c);k[d>>2]=0;}while(0);return;}function mA(a,b){a=a|0;b=b|0;a=k[a+8>>2]|0;a=be[k[(k[a>>2]|0)+8>>2]&255](a)|0;je[k[(k[a>>2]|0)+52>>2]&3](a,+o[b>>2],+o[b+4>>2],+o[b+8>>2],+o[b+12>>2]);$d[k[(k[a>>2]|0)+48>>2]&255](a,16384);return;}function nA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;f=k[b+4>>2]|0;b=k[b>>2]|0;while(1){if((b|0)==(f|0))break;e=k[b>>2]|0;if(e|0)oA(a,e,c,d,38316);b=b+8|0;}return;}function oA(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;switch(k[b+12>>2]|0){case 4:{Nv(k[a>>2]|0,c,b,e,d)|0;break;}case 5:{Lw((k[a>>2]|0)+184|0,c,b,e,d)|0;break;}case 1:{rw((k[a>>2]|0)+80|0,c,b,d)|0;break;}case 3:{Rx((k[a>>2]|0)+380|0,c,b,e,d)|0;break;}case 6:{jy((k[a>>2]|0)+572|0,c,b,e,d)|0;break;}case 7:{vz((k[a>>2]|0)+620|0,c,b,e,d)|0;break;}case 8:{Dy((k[a>>2]|0)+696|0,c,b,e,d)|0;break;}default:{}}return;}function pA(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;g=k[b+4>>2]|0;b=k[b>>2]|0;while(1){if((b|0)==(g|0))break;f=k[b>>2]|0;if(f|0?(qA(e,f)|0)==0:0)oA(a,k[b>>2]|0,c,d,38316);b=b+8|0;}return;}function qA(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0;c=uu(a+12|0,b)|0;m=k[a+4>>2]|0;a:do if(m){n=m+-1|0;o=(n&m|0)==0;if(o)l=n&c;else l=(c>>>0)%(m>>>0)|0;c=k[(k[a>>2]|0)+(l<<2)>>2]|0;if(c){h=b+11|0;j=b+4|0;b:while(1){c=k[c>>2]|0;if(!c){c=0;break a;}a=k[c+4>>2]|0;if(o)a=a&n;else a=(a>>>0)%(m>>>0)|0;if((a|0)!=(l|0)){c=0;break a;}a=c+8|0;e=i[a+11>>0]|0;f=e<<24>>24<0;e=e&255;g=f?k[c+12>>2]|0:e;p=i[h>>0]|0;d=p<<24>>24<0;if((g|0)!=((d?k[j>>2]|0:p&255)|0))continue;d=d?k[b>>2]|0:b;if(f)if(!(no(k[a>>2]|0,d,g)|0))break;else continue;while(1){if(!e)break a;if((i[a>>0]|0)!=(i[d>>0]|0))continue b;e=e+-1|0;d=d+1|0;a=a+1|0;}}}else c=0;}else c=0;while(0);return c|0;}function rA(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0,l=0;i=k[e>>2]|0;if(!i)l=0;else{l=(be[k[(k[i>>2]|0)+8>>2]&255](i)|0)+12|0;l=(k[l>>2]|0)==2;}i=b+4|0;if(l|(k[b>>2]|0)!=(k[i>>2]|0)){_d[k[(k[h>>2]|0)+8>>2]&511](h);mA(a,38324);yw((k[a>>2]|0)+136|0,c,g+4|0,d)|0;_d[k[(k[g>>2]|0)+8>>2]&511](g);j=k[i>>2]|0;h=h+4|0;i=k[b>>2]|0;while(1){if((i|0)==(j|0))break;g=k[i>>2]|0;if(g|0)Dw((k[a>>2]|0)+136|0,c,g,h,f,d)|0;i=i+8|0;}if(l){e=k[e>>2]|0;e=be[k[(k[e>>2]|0)+8>>2]&255](e)|0;Dw((k[a>>2]|0)+136|0,c,e,h,f,d)|0;}}return;}function sA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0;f=k[b+4>>2]|0;b=k[b>>2]|0;while(1){if((b|0)==(f|0))break;e=k[b>>2]|0;if(e|0){e=be[k[(k[e>>2]|0)+8>>2]&255](e)|0;g=k[b>>2]|0;oA(a,e,c,d,be[k[(k[g>>2]|0)+24>>2]&255](g)|0);g=k[b>>2]|0;g=be[k[(k[g>>2]|0)+8>>2]&255](g)|0;e=k[b>>2]|0;tA(a,g,c,d,be[k[(k[e>>2]|0)+24>>2]&255](e)|0);}b=b+8|0;}return;}function tA(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;switch(k[b+12>>2]|0){case 4:{uA(a,b,c,d,e);break;}case 5:{vA(a,b,c,0,e);break;}case 3:{wA(a,b,c,d,e);break;}case 6:{xA(a,b,c,d,e);break;}case 8:{yA(a,b,c,d,e);break;}case 7:{zA(a,b,c,0,e);break;}default:{}}return;}function uA(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0.0,h=0;f=r;r=r+16|0;h=f;a=(k[a>>2]|0)+460|0;g=+o[b+20>>2];lt(h,b+28|0,e);by(a,c,h,g,d)|0;lt(h,b+36|0,e);by(a,c,h,g,d)|0;r=f;return;}function vA(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;f=r;r=r+32|0;g=f+16|0;d=f;xE(g,b);wt(d,g,+Hm(c,3.0));if(!(vt(d)|0))fz((k[a>>2]|0)+524|0,d,e,c)|0;r=f;return;}function wA(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0.0,h=0;f=r;r=r+16|0;h=f;a=(k[a>>2]|0)+460|0;g=+o[b+20>>2];lt(h,b+28|0,e);by(a,c,h,g,d)|0;lt(h,b+36|0,e);by(a,c,h,g,d)|0;r=f;return;}function xA(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0.0,h=0,i=0,j=0,l=0,m=0,n=0,p=0.0,q=0;f=r;r=r+48|0;n=f+40|0;m=f+32|0;l=f+24|0;j=f+16|0;h=f+8|0;i=f;a=(k[a>>2]|0)+460|0;g=+o[b+20>>2];q=k[b+40>>2]|0;o[n>>2]=0.0;k[n+4>>2]=q;p=-(k[u>>2]=q,+o[u>>2]);o[m>>2]=0.0;o[m+4>>2]=p;p=+o[b+36>>2];o[l>>2]=-p;o[l+4>>2]=0.0;o[j>>2]=p;o[j+4>>2]=0.0;b=b+28|0;lt(i,b,n);lt(h,i,e);by(a,c,h,g,d)|0;lt(i,b,m);lt(h,i,e);by(a,c,h,g,d)|0;lt(i,b,l);lt(h,i,e);by(a,c,h,g,d)|0;lt(i,b,j);lt(h,i,e);by(a,c,h,g,d)|0;r=f;return;}function yA(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0.0,h=0,i=0,j=0,l=0,m=0,n=0,p=0,q=0;f=r;r=r+48|0;m=f+32|0;l=f+24|0;j=f+16|0;i=f+8|0;h=f;a=(k[a>>2]|0)+460|0;g=+o[b+20>>2];p=k[b+28>>2]|0;q=k[b+40>>2]|0;k[m>>2]=p;k[m+4>>2]=q;n=k[b+36>>2]|0;k[l>>2]=n;k[l+4>>2]=q;b=k[b+32>>2]|0;k[j>>2]=p;k[j+4>>2]=b;k[i>>2]=n;k[i+4>>2]=b;lt(h,m,e);by(a,c,h,g,d)|0;lt(h,l,e);by(a,c,h,g,d)|0;lt(h,j,e);by(a,c,h,g,d)|0;lt(h,i,e);by(a,c,h,g,d)|0;r=f;return;}function zA(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0;f=r;r=r+16|0;d=f;rt(d);if(Jz((k[a>>2]|0)+620|0,b,c,d)|0)fz((k[a>>2]|0)+524|0,d,e,c)|0;r=f;return;}function AA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=k[b>>2]|0;if(e|0?(e=(be[k[(k[e>>2]|0)+8>>2]&255](e)|0)+12|0,(k[e>>2]|0)!=2):0){e=k[b>>2]|0;oA(a,be[k[(k[e>>2]|0)+8>>2]&255](e)|0,c,d,38316);}return;}function BA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=k[b>>2]|0;if(e|0?(f=be[k[(k[e>>2]|0)+12>>2]&255](e)|0,oA(a,f,c,d,38316),zA(a,f,c,0,38316),e=k[b>>2]|0,be[k[(k[e>>2]|0)+40>>2]&255](e)|0):0){a=(k[a>>2]|0)+620|0;e=k[b>>2]|0;Fz(a,c,f,be[k[(k[e>>2]|0)+32>>2]&255](e)|0,d)|0;}return;}function CA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Ex((k[a>>2]|0)+284|0,b,c+4|0,d)|0;return;}function DA(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,l=0,m=0,n=0,o=0,p=0,q=0;q=r;r=r+16|0;m=q+8|0;n=q;o=b+4|0;p=m+2|0;l=n+4|0;h=k[b>>2]|0;while(1){if((h|0)==(k[o>>2]|0))break;i[m>>0]=d;j[p>>1]=(h-(k[b>>2]|0)|0)>>>3;f=k[h>>2]|0;k[n>>2]=f;g=k[h+4>>2]|0;k[l>>2]=g;if(g){PN(g);f=k[n>>2]|0;}if(f|0?(EA(a,f,c,m),qA(e,k[n>>2]|0)|0):0)FA(a,k[n>>2]|0,c,m);Sg(n);h=h+8|0;}r=q;return;}function EA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;switch(k[b+12>>2]|0){case 4:{KA(a,b,c,d);break;}case 5:{LA(a,b,c,d);break;}case 3:{MA(a,b,c,d);break;}case 6:{NA(a,b,c,d);break;}case 7:{OA(a,b,c,d);break;}case 8:{PA(a,b,c,d);break;}default:{}}return;}function FA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;switch(k[b+12>>2]|0){case 4:{GA(a,b,c,d);break;}case 3:{HA(a,b,c,d);break;}case 6:{IA(a,b,c,d);break;}case 8:{JA(a,b,c,d);break;}default:{}}return;}function GA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0.0;a=(k[a>>2]|0)+460|0;e=+o[b+20>>2];fy(a,c,b+28|0,e,d,1)|0;fy(a,c,b+36|0,e,d,2)|0;return;}function HA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0.0;a=(k[a>>2]|0)+460|0;e=+o[b+20>>2];fy(a,c,b+28|0,e,d,1)|0;fy(a,c,b+36|0,e,d,2)|0;return;}function IA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0.0,g=0,h=0,i=0,j=0,l=0,m=0.0,n=0;e=r;r=r+48|0;l=e+32|0;j=e+24|0;i=e+16|0;h=e+8|0;g=e;a=(k[a>>2]|0)+460|0;f=+o[b+20>>2];n=k[b+40>>2]|0;o[l>>2]=0.0;k[l+4>>2]=n;m=-(k[u>>2]=n,+o[u>>2]);o[j>>2]=0.0;o[j+4>>2]=m;m=+o[b+36>>2];o[i>>2]=-m;o[i+4>>2]=0.0;o[h>>2]=m;o[h+4>>2]=0.0;b=b+28|0;lt(g,b,l);fy(a,c,g,f,d,1)|0;lt(g,b,j);fy(a,c,g,f,d,2)|0;lt(g,b,i);fy(a,c,g,f,d,3)|0;lt(g,b,h);fy(a,c,g,f,d,4)|0;r=e;return;}function JA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0.0,g=0,h=0,i=0,j=0,l=0,m=0,n=0;e=r;r=r+32|0;j=e+24|0;i=e+16|0;h=e+8|0;g=e;a=(k[a>>2]|0)+460|0;f=+o[b+20>>2];m=k[b+28>>2]|0;n=k[b+40>>2]|0;k[j>>2]=m;k[j+4>>2]=n;l=k[b+36>>2]|0;k[i>>2]=l;k[i+4>>2]=n;b=k[b+32>>2]|0;k[h>>2]=m;k[h+4>>2]=b;k[g>>2]=l;k[g+4>>2]=b;fy(a,c,j,f,d,1)|0;fy(a,c,i,f,d,2)|0;fy(a,c,h,f,d,3)|0;fy(a,c,g,f,d,4)|0;r=e;return;}function KA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;jw(k[a>>2]|0,c,b,38316,d)|0;return;}function LA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;ox((k[a>>2]|0)+184|0,c,b,38316,d)|0;return;}function MA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Yx((k[a>>2]|0)+380|0,c,b,38316,d)|0;return;}function NA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;zy((k[a>>2]|0)+572|0,c,b,38316,d)|0;return;}function OA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Bz((k[a>>2]|0)+620|0,c,b,38316,d)|0;return;}function PA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Hy((k[a>>2]|0)+696|0,c,b,38316,d)|0;return;}function QA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Kx((k[a>>2]|0)+332|0,c,b,d)|0;return;}function RA(a,b,c){a=a|0;b=b|0;c=c|0;eA(a,b,c);return;}function SA(a){a=a|0;return fA(a)|0;}function TA(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;_d[k[(k[g>>2]|0)+8>>2]&511](g);CA(a,g,h,f);sA(a,d,b,f);AA(a,c,b,f);BA(a,e,b,f);return;}function UA(a){a=a|0;k[a>>2]=6468;YA(a);Dt(a+4|0);return;}function VA(a){a=a|0;UA(a);YN(a);return;}function WA(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;f=k[a+4>>2]|0;if(f|0){g=be[k[(k[f>>2]|0)+8>>2]&255](f)|0;f=a+13|0;if(!(i[f>>0]|0)){$d[k[(k[g>>2]|0)+108>>2]&255](g,3042);i[f>>0]=1;}f=a+14|0;if(!(i[f>>0]|0)){se[k[(k[g>>2]|0)+148>>2]&63](g,32969,a+16|0);se[k[(k[g>>2]|0)+148>>2]&63](g,32968,a+20|0);se[k[(k[g>>2]|0)+148>>2]&63](g,32971,a+24|0);se[k[(k[g>>2]|0)+148>>2]&63](g,32970,a+28|0);i[f>>0]=1;}Yd[k[(k[g>>2]|0)+36>>2]&31](g,b,c,d,e);}return;}function XA(a){a=a|0;var b=0,c=0;b=k[a+4>>2]|0;if(b|0?(c=a+13|0,i[c>>0]|0):0){b=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;$d[k[(k[b>>2]|0)+96>>2]&255](b,3042);i[c>>0]=0;}return;}function YA(a){a=a|0;var b=0,c=0,d=0,e=0;e=a+4|0;b=k[e>>2]|0;if(b|0){d=i[a+12>>0]|0;do if((i[a+13>>0]|0)!=d<<24>>24){b=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;c=k[b>>2]|0;if(!(d<<24>>24)){$d[k[c+96>>2]&255](b,3042);break;}else{$d[k[c+108>>2]&255](b,3042);break;}}while(0);b=a+14|0;if(i[b>>0]|0){e=k[e>>2]|0;e=be[k[(k[e>>2]|0)+8>>2]&255](e)|0;Yd[k[(k[e>>2]|0)+36>>2]&31](e,k[a+16>>2]|0,k[a+20>>2]|0,k[a+24>>2]|0,k[a+28>>2]|0);i[b>>0]=0;}}return;}function ZA(a,b){a=a|0;b=b|0;k[a>>2]=6468;k[a+4>>2]=k[b>>2];b=k[b+4>>2]|0;k[a+8>>2]=b;if(b|0)PN(b);i[a+12>>0]=0;i[a+13>>0]=0;i[a+14>>0]=0;_A(a);return;}function _A(a){a=a|0;var b=0;b=k[a+4>>2]|0;if(b|0){b=be[k[(k[b>>2]|0)+8>>2]&255](b)|0;b=(ne[k[(k[b>>2]|0)+172>>2]&127](b,3042)|0)<<24>>24==1&1;i[a+12>>0]=b;i[a+13>>0]=b;}return;}function $A(a){a=a|0;return(k[a+4>>2]|0)!=0|0;}function aB(a){a=a|0;return;}function bB(a){a=a|0;YN(a);return;}function cB(a){a=a|0;return a+4|0;}function dB(a){a=a|0;return a+68|0;}function eB(a){a=a|0;return a+132|0;}function fB(a){a=a|0;return 1.0;}function gB(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0;d=+o[b+148>>2]+(1.0-+o[c+4>>2])*+((k[b+136>>2]|0)>>>0);o[a>>2]=+o[b+144>>2]+ +o[c>>2]*+((k[b+132>>2]|0)>>>0);o[a+4>>2]=d;return;}function hB(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0;d=1.0-(+o[c+4>>2]-+o[b+148>>2])/+((k[b+136>>2]|0)>>>0);o[a>>2]=(+o[c>>2]-+o[b+144>>2])/+((k[b+132>>2]|0)>>>0);o[a+4>>2]=d;return;}function sN(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0.0;a:do if(b>>>0<=20)do switch(b|0){case 9:{d=(k[c>>2]|0)+(4-1)&~(4-1);b=k[d>>2]|0;k[c>>2]=d+4;k[a>>2]=b;break a;}case 10:{d=(k[c>>2]|0)+(4-1)&~(4-1);b=k[d>>2]|0;k[c>>2]=d+4;d=a;k[d>>2]=b;k[d+4>>2]=((b|0)<0)<<31>>31;break a;}case 11:{d=(k[c>>2]|0)+(4-1)&~(4-1);b=k[d>>2]|0;k[c>>2]=d+4;d=a;k[d>>2]=b;k[d+4>>2]=0;break a;}case 12:{d=(k[c>>2]|0)+(8-1)&~(8-1);b=d;e=k[b>>2]|0;b=k[b+4>>2]|0;k[c>>2]=d+8;d=a;k[d>>2]=e;k[d+4>>2]=b;break a;}case 13:{e=(k[c>>2]|0)+(4-1)&~(4-1);d=k[e>>2]|0;k[c>>2]=e+4;d=(d&65535)<<16>>16;e=a;k[e>>2]=d;k[e+4>>2]=((d|0)<0)<<31>>31;break a;}case 14:{e=(k[c>>2]|0)+(4-1)&~(4-1);d=k[e>>2]|0;k[c>>2]=e+4;e=a;k[e>>2]=d&65535;k[e+4>>2]=0;break a;}case 15:{e=(k[c>>2]|0)+(4-1)&~(4-1);d=k[e>>2]|0;k[c>>2]=e+4;d=(d&255)<<24>>24;e=a;k[e>>2]=d;k[e+4>>2]=((d|0)<0)<<31>>31;break a;}case 16:{e=(k[c>>2]|0)+(4-1)&~(4-1);d=k[e>>2]|0;k[c>>2]=e+4;e=a;k[e>>2]=d&255;k[e+4>>2]=0;break a;}case 17:{e=(k[c>>2]|0)+(8-1)&~(8-1);f=+p[e>>3];k[c>>2]=e+8;p[a>>3]=f;break a;}case 18:{e=(k[c>>2]|0)+(8-1)&~(8-1);f=+p[e>>3];k[c>>2]=e+8;p[a>>3]=f;break a;}default:break a;}while(0);while(0);return;}function tN(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;if(b>>>0>0|(b|0)==0&a>>>0>4294967295){while(1){d=vP(a|0,b|0,10,0)|0;c=c+-1|0;i[c>>0]=d|48;d=a;a=yP(a|0,b|0,10,0)|0;if(!(b>>>0>9|(b|0)==9&d>>>0>4294967295))break;else b=M;}b=a;}else b=a;if(b)while(1){c=c+-1|0;i[c>>0]=(b>>>0)%10|0|48;if(b>>>0<10)break;else b=(b>>>0)/10|0;}return c|0;}function uN(a){a=a|0;var b=0,c=0;c=0;while(1){if((l[35350+c>>0]|0)==(a|0)){a=2;break;}b=c+1|0;if((b|0)==87){b=35438;c=87;a=5;break;}else c=b;}if((a|0)==2)if(!c)b=35438;else{b=35438;a=5;}if((a|0)==5)while(1){do{a=b;b=b+1|0;}while((i[a>>0]|0)!=0);c=c+-1|0;if(!c)break;else a=5;}return b|0;}function vN(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0;f=b&255;d=(c|0)!=0;a:do if(d&(a&3|0)!=0){e=b&255;while(1){if((i[a>>0]|0)==e<<24>>24){g=6;break a;}a=a+1|0;c=c+-1|0;d=(c|0)!=0;if(!(d&(a&3|0)!=0)){g=5;break;}}}else g=5;while(0);if((g|0)==5)if(d)g=6;else c=0;b:do if((g|0)==6){e=b&255;if((i[a>>0]|0)!=e<<24>>24){d=$(f,16843009)|0;c:do if(c>>>0>3)while(1){f=k[a>>2]^d;if((f&-2139062144^-2139062144)&f+-16843009|0)break;a=a+4|0;c=c+-4|0;if(c>>>0<=3){g=11;break c;}}else g=11;while(0);if((g|0)==11)if(!c){c=0;break;}while(1){if((i[a>>0]|0)==e<<24>>24)break b;a=a+1|0;c=c+-1|0;if(!c){c=0;break;}}}}while(0);return(c|0?a:0)|0;}function wN(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0;h=r;r=r+256|0;g=h;do if((c|0)>(d|0)&(e&73728|0)==0){e=c-d|0;wP(g|0,b|0,(e>>>0>256?256:e)|0)|0;b=k[a>>2]|0;f=(b&32|0)==0;if(e>>>0>255){c=c-d|0;do{if(f){rN(g,256,a)|0;b=k[a>>2]|0;}e=e+-256|0;f=(b&32|0)==0;}while(e>>>0>255);if(f)e=c&255;else break;}else if(!f)break;rN(g,e,a)|0;}while(0);r=h;return;}function xN(a,b){a=a|0;b=b|0;if(!a)a=0;else a=AN(a,b,0)|0;return a|0;}function yN(a,b){a=+a;b=b|0;return+ +zN(a,b);}function zN(a,b){a=+a;b=b|0;var c=0,d=0,e=0;p[u>>3]=a;c=k[u>>2]|0;d=k[u+4>>2]|0;e=pP(c|0,d|0,52)|0;switch(e&2047){case 0:{if(a!=0.0){a=+zN(a*18446744073709551616.0,b);c=(k[b>>2]|0)+-64|0;}else c=0;k[b>>2]=c;break;}case 2047:break;default:{k[b>>2]=(e&2047)+-1022;k[u>>2]=c;k[u+4>>2]=d&-2146435073|1071644672;a=+p[u>>3];}}return+a;}function AN(a,b,c){a=a|0;b=b|0;c=c|0;do if(a){if(b>>>0<128){i[a>>0]=b;a=1;break;}if(b>>>0<2048){i[a>>0]=b>>>6|192;i[a+1>>0]=b&63|128;a=2;break;}if(b>>>0<55296|(b&-8192|0)==57344){i[a>>0]=b>>>12|224;i[a+1>>0]=b>>>6&63|128;i[a+2>>0]=b&63|128;a=3;break;}if((b+-65536|0)>>>0<1048576){i[a>>0]=b>>>18|240;i[a+1>>0]=b>>>12&63|128;i[a+2>>0]=b>>>6&63|128;i[a+3>>0]=b&63|128;a=4;break;}else{a=fN()|0;k[a>>2]=84;a=-1;break;}}else a=1;while(0);return a|0;}function BN(a){a=a|0;var b=0,c=0;b=a+74|0;c=i[b>>0]|0;i[b>>0]=c+255|c;b=k[a>>2]|0;if(!(b&8)){k[a+8>>2]=0;k[a+4>>2]=0;c=k[a+44>>2]|0;k[a+28>>2]=c;k[a+20>>2]=c;k[a+16>>2]=c+(k[a+48>>2]|0);a=0;}else{k[a>>2]=b|32;a=-1;}return a|0;}function CN(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=a+20|0;e=k[d>>2]|0;a=(k[a+16>>2]|0)-e|0;a=a>>>0>c>>>0?c:a;qP(e|0,b|0,a|0)|0;k[d>>2]=(k[d>>2]|0)+a;return c|0;}function DN(a){a=a|0;var b=0,c=0;do if(a){if((k[a+76>>2]|0)<=-1){b=EN(a)|0;break;}c=(qN(a)|0)==0;b=EN(a)|0;if(!c)gN(a);}else{if(!(k[2169]|0))b=0;else b=DN(k[2169]|0)|0;jb(38368);a=k[9591]|0;if(a)do{if((k[a+76>>2]|0)>-1)c=qN(a)|0;else c=0;if((k[a+20>>2]|0)>>>0>(k[a+28>>2]|0)>>>0)b=EN(a)|0|b;if(c|0)gN(a);a=k[a+56>>2]|0;}while((a|0)!=0);Kd(38368);}while(0);return b|0;}function EN(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0;b=a+20|0;g=a+28|0;if((k[b>>2]|0)>>>0>(k[g>>2]|0)>>>0?(de[k[a+36>>2]&63](a,0,0)|0,(k[b>>2]|0)==0):0)a=-1;else{c=a+4|0;d=k[c>>2]|0;e=a+8|0;f=k[e>>2]|0;if(d>>>0<f>>>0)de[k[a+40>>2]&63](a,d-f|0,1)|0;k[a+16>>2]=0;k[g>>2]=0;k[b>>2]=0;k[e>>2]=0;k[c>>2]=0;a=0;}return a|0;}function FN(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;a:do if(!c)a=0;else{while(1){d=i[a>>0]|0;e=i[b>>0]|0;if(d<<24>>24!=e<<24>>24)break;c=c+-1|0;if(!c){a=0;break a;}else{a=a+1|0;b=b+1|0;}}a=(d&255)-(e&255)|0;}while(0);return a|0;}function GN(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;if((k[b+76>>2]|0)>=0?(qN(b)|0)!=0:0){if((i[b+75>>0]|0)!=(a|0)?(e=b+20|0,f=k[e>>2]|0,f>>>0<(k[b+16>>2]|0)>>>0):0){k[e>>2]=f+1;i[f>>0]=a;a=a&255;}else a=HN(b,a)|0;gN(b);}else g=3;do if((g|0)==3){if((i[b+75>>0]|0)!=(a|0)?(c=b+20|0,d=k[c>>2]|0,d>>>0<(k[b+16>>2]|0)>>>0):0){k[c>>2]=d+1;i[d>>0]=a;a=a&255;break;}a=HN(b,a)|0;}while(0);return a|0;}function HN(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0;j=r;r=r+16|0;g=j;h=b&255;i[g>>0]=h;d=a+16|0;e=k[d>>2]|0;if(!e){if(!(BN(a)|0)){e=k[d>>2]|0;f=4;}else c=-1;}else f=4;do if((f|0)==4){f=a+20|0;d=k[f>>2]|0;if(d>>>0<e>>>0?(c=b&255,(c|0)!=(i[a+75>>0]|0)):0){k[f>>2]=d+1;i[d>>0]=h;break;}if((de[k[a+36>>2]&63](a,g,1)|0)==1)c=l[g>>0]|0;else c=-1;}while(0);r=j;return c|0;}function IN(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;L=r;r=r+16|0;o=L;do if(a>>>0<245){n=a>>>0<11?16:a+11&-8;a=n>>>3;t=k[9597]|0;c=t>>>a;if(c&3|0){a=(c&1^1)+a|0;c=38428+(a<<1<<2)|0;d=c+8|0;e=k[d>>2]|0;f=e+8|0;g=k[f>>2]|0;do if((c|0)!=(g|0)){if(g>>>0<(k[9601]|0)>>>0)$c();b=g+12|0;if((k[b>>2]|0)==(e|0)){k[b>>2]=c;k[d>>2]=g;break;}else $c();}else k[9597]=t&~(1<<a);while(0);K=a<<3;k[e+4>>2]=K|3;K=e+K+4|0;k[K>>2]=k[K>>2]|1;K=f;r=L;return K|0;}s=k[9599]|0;if(n>>>0>s>>>0){if(c|0){h=2<<a;a=c<<a&(h|0-h);a=(a&0-a)+-1|0;h=a>>>12&16;a=a>>>h;d=a>>>5&8;a=a>>>d;f=a>>>2&4;a=a>>>f;c=a>>>1&2;a=a>>>c;b=a>>>1&1;b=(d|h|f|c|b)+(a>>>b)|0;a=38428+(b<<1<<2)|0;c=a+8|0;f=k[c>>2]|0;h=f+8|0;d=k[h>>2]|0;do if((a|0)!=(d|0)){if(d>>>0<(k[9601]|0)>>>0)$c();e=d+12|0;if((k[e>>2]|0)==(f|0)){k[e>>2]=a;k[c>>2]=d;i=t;break;}else $c();}else{i=t&~(1<<b);k[9597]=i;}while(0);g=(b<<3)-n|0;k[f+4>>2]=n|3;d=f+n|0;k[d+4>>2]=g|1;k[d+g>>2]=g;if(s|0){e=k[9602]|0;b=s>>>3;c=38428+(b<<1<<2)|0;b=1<<b;if(i&b){b=c+8|0;a=k[b>>2]|0;if(a>>>0<(k[9601]|0)>>>0)$c();else{j=a;l=b;}}else{k[9597]=i|b;j=c;l=c+8|0;}k[l>>2]=e;k[j+12>>2]=e;k[e+8>>2]=j;k[e+12>>2]=c;}k[9599]=g;k[9602]=d;K=h;r=L;return K|0;}j=k[9598]|0;if(j){a=(j&0-j)+-1|0;J=a>>>12&16;a=a>>>J;I=a>>>5&8;a=a>>>I;K=a>>>2&4;a=a>>>K;h=a>>>1&2;a=a>>>h;i=a>>>1&1;i=k[38692+((I|J|K|h|i)+(a>>>i)<<2)>>2]|0;a=i;h=i;i=(k[i+4>>2]&-8)-n|0;while(1){b=k[a+16>>2]|0;if(!b){b=k[a+20>>2]|0;if(!b)break;}K=(k[b+4>>2]&-8)-n|0;J=K>>>0<i>>>0;a=b;h=J?b:h;i=J?K:i;}e=k[9601]|0;if(h>>>0<e>>>0)$c();g=h+n|0;if(h>>>0>=g>>>0)$c();f=k[h+24>>2]|0;c=k[h+12>>2]|0;do if((c|0)==(h|0)){a=h+20|0;b=k[a>>2]|0;if(!b){a=h+16|0;b=k[a>>2]|0;if(!b){m=0;break;}}while(1){c=b+20|0;d=k[c>>2]|0;if(d|0){b=d;a=c;continue;}c=b+16|0;d=k[c>>2]|0;if(!d)break;else{b=d;a=c;}}if(a>>>0<e>>>0)$c();else{k[a>>2]=0;m=b;break;}}else{d=k[h+8>>2]|0;if(d>>>0<e>>>0)$c();b=d+12|0;if((k[b>>2]|0)!=(h|0))$c();a=c+8|0;if((k[a>>2]|0)==(h|0)){k[b>>2]=c;k[a>>2]=d;m=c;break;}else $c();}while(0);do if(f|0){b=k[h+28>>2]|0;a=38692+(b<<2)|0;if((h|0)==(k[a>>2]|0)){k[a>>2]=m;if(!m){k[9598]=j&~(1<<b);break;}}else{if(f>>>0<(k[9601]|0)>>>0)$c();b=f+16|0;if((k[b>>2]|0)==(h|0))k[b>>2]=m;else k[f+20>>2]=m;if(!m)break;}a=k[9601]|0;if(m>>>0<a>>>0)$c();k[m+24>>2]=f;b=k[h+16>>2]|0;do if(b|0)if(b>>>0<a>>>0)$c();else{k[m+16>>2]=b;k[b+24>>2]=m;break;}while(0);b=k[h+20>>2]|0;if(b|0)if(b>>>0<(k[9601]|0)>>>0)$c();else{k[m+20>>2]=b;k[b+24>>2]=m;break;}}while(0);if(i>>>0<16){K=i+n|0;k[h+4>>2]=K|3;K=h+K+4|0;k[K>>2]=k[K>>2]|1;}else{k[h+4>>2]=n|3;k[g+4>>2]=i|1;k[g+i>>2]=i;if(s|0){d=k[9602]|0;b=s>>>3;c=38428+(b<<1<<2)|0;b=1<<b;if(t&b){b=c+8|0;a=k[b>>2]|0;if(a>>>0<(k[9601]|0)>>>0)$c();else{p=a;q=b;}}else{k[9597]=t|b;p=c;q=c+8|0;}k[q>>2]=d;k[p+12>>2]=d;k[d+8>>2]=p;k[d+12>>2]=c;}k[9599]=i;k[9602]=g;}K=h+8|0;r=L;return K|0;}}}else if(a>>>0<=4294967231){a=a+11|0;n=a&-8;j=k[9598]|0;if(j){d=0-n|0;a=a>>>8;if(a){if(n>>>0>16777215)i=31;else{q=(a+1048320|0)>>>16&8;D=a<<q;p=(D+520192|0)>>>16&4;D=D<<p;i=(D+245760|0)>>>16&2;i=14-(p|q|i)+(D<<i>>>15)|0;i=n>>>(i+7|0)&1|i<<1;}}else i=0;a=k[38692+(i<<2)>>2]|0;a:do if(!a){c=0;e=0;D=86;}else{e=0;h=a;g=n<<((i|0)==31?0:25-(i>>>1)|0);c=0;while(1){a=(k[h+4>>2]&-8)-n|0;if(a>>>0<d>>>0)if(!a){a=h;d=0;c=h;D=90;break a;}else{e=h;d=a;}a=k[h+20>>2]|0;h=k[h+16+(g>>>31<<2)>>2]|0;c=(a|0)==0|(a|0)==(h|0)?c:a;a=(h|0)==0;if(a){D=86;break;}else g=g<<(a&1^1);}}while(0);if((D|0)==86){if((c|0)==0&(e|0)==0){a=2<<i;a=j&(a|0-a);if(!a)break;q=(a&0-a)+-1|0;l=q>>>12&16;q=q>>>l;i=q>>>5&8;q=q>>>i;m=q>>>2&4;q=q>>>m;p=q>>>1&2;q=q>>>p;c=q>>>1&1;c=k[38692+((i|l|m|p|c)+(q>>>c)<<2)>>2]|0;}if(!c){i=e;h=d;}else{a=e;D=90;}}if((D|0)==90)while(1){D=0;q=(k[c+4>>2]&-8)-n|0;e=q>>>0<d>>>0;d=e?q:d;a=e?c:a;e=k[c+16>>2]|0;if(e|0){c=e;D=90;continue;}c=k[c+20>>2]|0;if(!c){i=a;h=d;break;}else D=90;}if((i|0)!=0?h>>>0<((k[9599]|0)-n|0)>>>0:0){e=k[9601]|0;if(i>>>0<e>>>0)$c();g=i+n|0;if(i>>>0>=g>>>0)$c();f=k[i+24>>2]|0;c=k[i+12>>2]|0;do if((c|0)==(i|0)){a=i+20|0;b=k[a>>2]|0;if(!b){a=i+16|0;b=k[a>>2]|0;if(!b){s=0;break;}}while(1){c=b+20|0;d=k[c>>2]|0;if(d|0){b=d;a=c;continue;}c=b+16|0;d=k[c>>2]|0;if(!d)break;else{b=d;a=c;}}if(a>>>0<e>>>0)$c();else{k[a>>2]=0;s=b;break;}}else{d=k[i+8>>2]|0;if(d>>>0<e>>>0)$c();b=d+12|0;if((k[b>>2]|0)!=(i|0))$c();a=c+8|0;if((k[a>>2]|0)==(i|0)){k[b>>2]=c;k[a>>2]=d;s=c;break;}else $c();}while(0);do if(f){b=k[i+28>>2]|0;a=38692+(b<<2)|0;if((i|0)==(k[a>>2]|0)){k[a>>2]=s;if(!s){t=j&~(1<<b);k[9598]=t;break;}}else{if(f>>>0<(k[9601]|0)>>>0)$c();b=f+16|0;if((k[b>>2]|0)==(i|0))k[b>>2]=s;else k[f+20>>2]=s;if(!s){t=j;break;}}a=k[9601]|0;if(s>>>0<a>>>0)$c();k[s+24>>2]=f;b=k[i+16>>2]|0;do if(b|0)if(b>>>0<a>>>0)$c();else{k[s+16>>2]=b;k[b+24>>2]=s;break;}while(0);b=k[i+20>>2]|0;if(b){if(b>>>0<(k[9601]|0)>>>0)$c();else{k[s+20>>2]=b;k[b+24>>2]=s;t=j;break;}}else t=j;}else t=j;while(0);do if(h>>>0>=16){k[i+4>>2]=n|3;k[g+4>>2]=h|1;k[g+h>>2]=h;b=h>>>3;if(h>>>0<256){c=38428+(b<<1<<2)|0;a=k[9597]|0;b=1<<b;if(a&b){b=c+8|0;a=k[b>>2]|0;if(a>>>0<(k[9601]|0)>>>0)$c();else{B=a;C=b;}}else{k[9597]=a|b;B=c;C=c+8|0;}k[C>>2]=g;k[B+12>>2]=g;k[g+8>>2]=B;k[g+12>>2]=c;break;}b=h>>>8;if(b){if(h>>>0>16777215)b=31;else{J=(b+1048320|0)>>>16&8;K=b<<J;I=(K+520192|0)>>>16&4;K=K<<I;b=(K+245760|0)>>>16&2;b=14-(I|J|b)+(K<<b>>>15)|0;b=h>>>(b+7|0)&1|b<<1;}}else b=0;c=38692+(b<<2)|0;k[g+28>>2]=b;a=g+16|0;k[a+4>>2]=0;k[a>>2]=0;a=1<<b;if(!(t&a)){k[9598]=t|a;k[c>>2]=g;k[g+24>>2]=c;k[g+12>>2]=g;k[g+8>>2]=g;break;}a=h<<((b|0)==31?0:25-(b>>>1)|0);d=k[c>>2]|0;while(1){if((k[d+4>>2]&-8|0)==(h|0)){D=148;break;}c=d+16+(a>>>31<<2)|0;b=k[c>>2]|0;if(!b){D=145;break;}else{a=a<<1;d=b;}}if((D|0)==145){if(c>>>0<(k[9601]|0)>>>0)$c();else{k[c>>2]=g;k[g+24>>2]=d;k[g+12>>2]=g;k[g+8>>2]=g;break;}}else if((D|0)==148){b=d+8|0;a=k[b>>2]|0;K=k[9601]|0;if(a>>>0>=K>>>0&d>>>0>=K>>>0){k[a+12>>2]=g;k[b>>2]=g;k[g+8>>2]=a;k[g+12>>2]=d;k[g+24>>2]=0;break;}else $c();}}else{K=h+n|0;k[i+4>>2]=K|3;K=i+K+4|0;k[K>>2]=k[K>>2]|1;}while(0);K=i+8|0;r=L;return K|0;}}}else n=-1;while(0);c=k[9599]|0;if(c>>>0>=n>>>0){b=c-n|0;a=k[9602]|0;if(b>>>0>15){K=a+n|0;k[9602]=K;k[9599]=b;k[K+4>>2]=b|1;k[K+b>>2]=b;k[a+4>>2]=n|3;}else{k[9599]=0;k[9602]=0;k[a+4>>2]=c|3;K=a+c+4|0;k[K>>2]=k[K>>2]|1;}K=a+8|0;r=L;return K|0;}h=k[9600]|0;if(h>>>0>n>>>0){I=h-n|0;k[9600]=I;K=k[9603]|0;J=K+n|0;k[9603]=J;k[J+4>>2]=I|1;k[K+4>>2]=n|3;K=K+8|0;r=L;return K|0;}if(!(k[9715]|0)){k[9717]=4096;k[9716]=4096;k[9718]=-1;k[9719]=-1;k[9720]=0;k[9708]=0;a=o&-16^1431655768;k[o>>2]=a;k[9715]=a;a=4096;}else a=k[9717]|0;i=n+48|0;j=n+47|0;g=a+j|0;e=0-a|0;l=g&e;if(l>>>0<=n>>>0){K=0;r=L;return K|0;}a=k[9707]|0;if(a|0?(B=k[9705]|0,C=B+l|0,C>>>0<=B>>>0|C>>>0>a>>>0):0){K=0;r=L;return K|0;}b:do if(!(k[9708]&4)){c=k[9603]|0;c:do if(c){d=38836;while(1){a=k[d>>2]|0;if(a>>>0<=c>>>0?(u=d+4|0,(a+(k[u>>2]|0)|0)>>>0>c>>>0):0)break;a=k[d+8>>2]|0;if(!a){D=172;break c;}else d=a;}c=g-h&e;if(c>>>0<2147483647){a=rP(c|0)|0;if((a|0)==((k[d>>2]|0)+(k[u>>2]|0)|0)){if((a|0)!=(-1|0)){g=c;f=a;D=190;break b;}}else{b=c;D=180;}}}else D=172;while(0);do if(((D|0)==172?(f=rP(0)|0,(f|0)!=(-1|0)):0)?(b=f,v=k[9716]|0,w=v+-1|0,b=((w&b|0)==0?0:(w+b&0-v)-b|0)+l|0,v=k[9705]|0,w=b+v|0,b>>>0>n>>>0&b>>>0<2147483647):0){C=k[9707]|0;if(C|0?w>>>0<=v>>>0|w>>>0>C>>>0:0)break;a=rP(b|0)|0;if((a|0)==(f|0)){g=b;D=190;break b;}else D=180;}while(0);d:do if((D|0)==180){c=0-b|0;do if(i>>>0>b>>>0&(b>>>0<2147483647&(a|0)!=(-1|0))?(x=k[9717]|0,x=j-b+x&0-x,x>>>0<2147483647):0)if((rP(x|0)|0)==(-1|0)){rP(c|0)|0;break d;}else{b=x+b|0;break;}while(0);if((a|0)!=(-1|0)){g=b;f=a;D=190;break b;}}while(0);k[9708]=k[9708]|4;D=187;}else D=187;while(0);if((((D|0)==187?l>>>0<2147483647:0)?(A=rP(l|0)|0,y=rP(0)|0,A>>>0<y>>>0&((A|0)!=(-1|0)&(y|0)!=(-1|0))):0)?(z=y-A|0,z>>>0>(n+40|0)>>>0):0){g=z;f=A;D=190;}if((D|0)==190){b=(k[9705]|0)+g|0;k[9705]=b;if(b>>>0>(k[9706]|0)>>>0)k[9706]=b;j=k[9603]|0;do if(j){b=38836;while(1){a=k[b>>2]|0;c=b+4|0;d=k[c>>2]|0;if((f|0)==(a+d|0)){D=200;break;}e=k[b+8>>2]|0;if(!e)break;else b=e;}if(((D|0)==200?(k[b+12>>2]&8|0)==0:0)?j>>>0<f>>>0&j>>>0>=a>>>0:0){k[c>>2]=d+g;K=j+8|0;K=(K&7|0)==0?0:0-K&7;J=j+K|0;K=g-K+(k[9600]|0)|0;k[9603]=J;k[9600]=K;k[J+4>>2]=K|1;k[J+K+4>>2]=40;k[9604]=k[9719];break;}b=k[9601]|0;if(f>>>0<b>>>0){k[9601]=f;h=f;}else h=b;a=f+g|0;b=38836;while(1){if((k[b>>2]|0)==(a|0)){D=208;break;}b=k[b+8>>2]|0;if(!b){a=38836;break;}}if((D|0)==208)if(!(k[b+12>>2]&8)){k[b>>2]=f;m=b+4|0;k[m>>2]=(k[m>>2]|0)+g;m=f+8|0;m=f+((m&7|0)==0?0:0-m&7)|0;b=a+8|0;b=a+((b&7|0)==0?0:0-b&7)|0;l=m+n|0;i=b-m-n|0;k[m+4>>2]=n|3;do if((b|0)!=(j|0)){if((b|0)==(k[9602]|0)){K=(k[9599]|0)+i|0;k[9599]=K;k[9602]=l;k[l+4>>2]=K|1;k[l+K>>2]=K;break;}a=k[b+4>>2]|0;if((a&3|0)==1){g=a&-8;e=a>>>3;e:do if(a>>>0>=256){f=k[b+24>>2]|0;d=k[b+12>>2]|0;do if((d|0)==(b|0)){d=b+16|0;c=d+4|0;a=k[c>>2]|0;if(!a){a=k[d>>2]|0;if(!a){I=0;break;}else c=d;}while(1){d=a+20|0;e=k[d>>2]|0;if(e|0){a=e;c=d;continue;}d=a+16|0;e=k[d>>2]|0;if(!e)break;else{a=e;c=d;}}if(c>>>0<h>>>0)$c();else{k[c>>2]=0;I=a;break;}}else{e=k[b+8>>2]|0;if(e>>>0<h>>>0)$c();a=e+12|0;if((k[a>>2]|0)!=(b|0))$c();c=d+8|0;if((k[c>>2]|0)==(b|0)){k[a>>2]=d;k[c>>2]=e;I=d;break;}else $c();}while(0);if(!f)break;a=k[b+28>>2]|0;c=38692+(a<<2)|0;do if((b|0)!=(k[c>>2]|0)){if(f>>>0<(k[9601]|0)>>>0)$c();a=f+16|0;if((k[a>>2]|0)==(b|0))k[a>>2]=I;else k[f+20>>2]=I;if(!I)break e;}else{k[c>>2]=I;if(I|0)break;k[9598]=k[9598]&~(1<<a);break e;}while(0);d=k[9601]|0;if(I>>>0<d>>>0)$c();k[I+24>>2]=f;a=b+16|0;c=k[a>>2]|0;do if(c|0)if(c>>>0<d>>>0)$c();else{k[I+16>>2]=c;k[c+24>>2]=I;break;}while(0);a=k[a+4>>2]|0;if(!a)break;if(a>>>0<(k[9601]|0)>>>0)$c();else{k[I+20>>2]=a;k[a+24>>2]=I;break;}}else{c=k[b+8>>2]|0;d=k[b+12>>2]|0;a=38428+(e<<1<<2)|0;do if((c|0)!=(a|0)){if(c>>>0<h>>>0)$c();if((k[c+12>>2]|0)==(b|0))break;$c();}while(0);if((d|0)==(c|0)){k[9597]=k[9597]&~(1<<e);break;}do if((d|0)==(a|0))F=d+8|0;else{if(d>>>0<h>>>0)$c();a=d+8|0;if((k[a>>2]|0)==(b|0)){F=a;break;}$c();}while(0);k[c+12>>2]=d;k[F>>2]=c;}while(0);b=b+g|0;e=g+i|0;}else e=i;b=b+4|0;k[b>>2]=k[b>>2]&-2;k[l+4>>2]=e|1;k[l+e>>2]=e;b=e>>>3;if(e>>>0<256){c=38428+(b<<1<<2)|0;a=k[9597]|0;b=1<<b;do if(!(a&b)){k[9597]=a|b;J=c;K=c+8|0;}else{b=c+8|0;a=k[b>>2]|0;if(a>>>0>=(k[9601]|0)>>>0){J=a;K=b;break;}$c();}while(0);k[K>>2]=l;k[J+12>>2]=l;k[l+8>>2]=J;k[l+12>>2]=c;break;}b=e>>>8;do if(!b)b=0;else{if(e>>>0>16777215){b=31;break;}J=(b+1048320|0)>>>16&8;K=b<<J;I=(K+520192|0)>>>16&4;K=K<<I;b=(K+245760|0)>>>16&2;b=14-(I|J|b)+(K<<b>>>15)|0;b=e>>>(b+7|0)&1|b<<1;}while(0);d=38692+(b<<2)|0;k[l+28>>2]=b;a=l+16|0;k[a+4>>2]=0;k[a>>2]=0;a=k[9598]|0;c=1<<b;if(!(a&c)){k[9598]=a|c;k[d>>2]=l;k[l+24>>2]=d;k[l+12>>2]=l;k[l+8>>2]=l;break;}a=e<<((b|0)==31?0:25-(b>>>1)|0);d=k[d>>2]|0;while(1){if((k[d+4>>2]&-8|0)==(e|0)){D=278;break;}c=d+16+(a>>>31<<2)|0;b=k[c>>2]|0;if(!b){D=275;break;}else{a=a<<1;d=b;}}if((D|0)==275){if(c>>>0<(k[9601]|0)>>>0)$c();else{k[c>>2]=l;k[l+24>>2]=d;k[l+12>>2]=l;k[l+8>>2]=l;break;}}else if((D|0)==278){b=d+8|0;a=k[b>>2]|0;K=k[9601]|0;if(a>>>0>=K>>>0&d>>>0>=K>>>0){k[a+12>>2]=l;k[b>>2]=l;k[l+8>>2]=a;k[l+12>>2]=d;k[l+24>>2]=0;break;}else $c();}}else{K=(k[9600]|0)+i|0;k[9600]=K;k[9603]=l;k[l+4>>2]=K|1;}while(0);K=m+8|0;r=L;return K|0;}else a=38836;while(1){b=k[a>>2]|0;if(b>>>0<=j>>>0?(E=b+(k[a+4>>2]|0)|0,E>>>0>j>>>0):0)break;a=k[a+8>>2]|0;}e=E+-47|0;a=e+8|0;a=e+((a&7|0)==0?0:0-a&7)|0;e=j+16|0;a=a>>>0<e>>>0?j:a;b=a+8|0;c=f+8|0;c=(c&7|0)==0?0:0-c&7;K=f+c|0;c=g+-40-c|0;k[9603]=K;k[9600]=c;k[K+4>>2]=c|1;k[K+c+4>>2]=40;k[9604]=k[9719];c=a+4|0;k[c>>2]=27;k[b>>2]=k[9709];k[b+4>>2]=k[9710];k[b+8>>2]=k[9711];k[b+12>>2]=k[9712];k[9709]=f;k[9710]=g;k[9712]=0;k[9711]=b;b=a+24|0;do{b=b+4|0;k[b>>2]=7;}while((b+4|0)>>>0<E>>>0);if((a|0)!=(j|0)){f=a-j|0;k[c>>2]=k[c>>2]&-2;k[j+4>>2]=f|1;k[a>>2]=f;b=f>>>3;if(f>>>0<256){c=38428+(b<<1<<2)|0;a=k[9597]|0;b=1<<b;if(a&b){b=c+8|0;a=k[b>>2]|0;if(a>>>0<(k[9601]|0)>>>0)$c();else{G=a;H=b;}}else{k[9597]=a|b;G=c;H=c+8|0;}k[H>>2]=j;k[G+12>>2]=j;k[j+8>>2]=G;k[j+12>>2]=c;break;}b=f>>>8;if(b){if(f>>>0>16777215)c=31;else{J=(b+1048320|0)>>>16&8;K=b<<J;I=(K+520192|0)>>>16&4;K=K<<I;c=(K+245760|0)>>>16&2;c=14-(I|J|c)+(K<<c>>>15)|0;c=f>>>(c+7|0)&1|c<<1;}}else c=0;d=38692+(c<<2)|0;k[j+28>>2]=c;k[j+20>>2]=0;k[e>>2]=0;b=k[9598]|0;a=1<<c;if(!(b&a)){k[9598]=b|a;k[d>>2]=j;k[j+24>>2]=d;k[j+12>>2]=j;k[j+8>>2]=j;break;}a=f<<((c|0)==31?0:25-(c>>>1)|0);d=k[d>>2]|0;while(1){if((k[d+4>>2]&-8|0)==(f|0)){D=304;break;}c=d+16+(a>>>31<<2)|0;b=k[c>>2]|0;if(!b){D=301;break;}else{a=a<<1;d=b;}}if((D|0)==301){if(c>>>0<(k[9601]|0)>>>0)$c();else{k[c>>2]=j;k[j+24>>2]=d;k[j+12>>2]=j;k[j+8>>2]=j;break;}}else if((D|0)==304){b=d+8|0;a=k[b>>2]|0;K=k[9601]|0;if(a>>>0>=K>>>0&d>>>0>=K>>>0){k[a+12>>2]=j;k[b>>2]=j;k[j+8>>2]=a;k[j+12>>2]=d;k[j+24>>2]=0;break;}else $c();}}}else{K=k[9601]|0;if((K|0)==0|f>>>0<K>>>0)k[9601]=f;k[9709]=f;k[9710]=g;k[9712]=0;k[9606]=k[9715];k[9605]=-1;b=0;do{K=38428+(b<<1<<2)|0;k[K+12>>2]=K;k[K+8>>2]=K;b=b+1|0;}while((b|0)!=32);K=f+8|0;K=(K&7|0)==0?0:0-K&7;J=f+K|0;K=g+-40-K|0;k[9603]=J;k[9600]=K;k[J+4>>2]=K|1;k[J+K+4>>2]=40;k[9604]=k[9719];}while(0);b=k[9600]|0;if(b>>>0>n>>>0){I=b-n|0;k[9600]=I;K=k[9603]|0;J=K+n|0;k[9603]=J;k[J+4>>2]=I|1;k[K+4>>2]=n|3;K=K+8|0;r=L;return K|0;}}K=fN()|0;k[K>>2]=12;K=0;r=L;return K|0;}function JN(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0;if(!a)return;c=a+-8|0;g=k[9601]|0;if(c>>>0<g>>>0)$c();a=k[a+-4>>2]|0;b=a&3;if((b|0)==1)$c();d=a&-8;n=c+d|0;do if(!(a&1)){a=k[c>>2]|0;if(!b)return;j=c+(0-a)|0;i=a+d|0;if(j>>>0<g>>>0)$c();if((j|0)==(k[9602]|0)){a=n+4|0;b=k[a>>2]|0;if((b&3|0)!=3){q=j;e=i;break;}k[9599]=i;k[a>>2]=b&-2;k[j+4>>2]=i|1;k[j+i>>2]=i;return;}d=a>>>3;if(a>>>0<256){b=k[j+8>>2]|0;c=k[j+12>>2]|0;a=38428+(d<<1<<2)|0;if((b|0)!=(a|0)){if(b>>>0<g>>>0)$c();if((k[b+12>>2]|0)!=(j|0))$c();}if((c|0)==(b|0)){k[9597]=k[9597]&~(1<<d);q=j;e=i;break;}if((c|0)!=(a|0)){if(c>>>0<g>>>0)$c();a=c+8|0;if((k[a>>2]|0)==(j|0))f=a;else $c();}else f=c+8|0;k[b+12>>2]=c;k[f>>2]=b;q=j;e=i;break;}f=k[j+24>>2]|0;c=k[j+12>>2]|0;do if((c|0)==(j|0)){c=j+16|0;b=c+4|0;a=k[b>>2]|0;if(!a){a=k[c>>2]|0;if(!a){h=0;break;}else b=c;}while(1){c=a+20|0;d=k[c>>2]|0;if(d|0){a=d;b=c;continue;}c=a+16|0;d=k[c>>2]|0;if(!d)break;else{a=d;b=c;}}if(b>>>0<g>>>0)$c();else{k[b>>2]=0;h=a;break;}}else{d=k[j+8>>2]|0;if(d>>>0<g>>>0)$c();a=d+12|0;if((k[a>>2]|0)!=(j|0))$c();b=c+8|0;if((k[b>>2]|0)==(j|0)){k[a>>2]=c;k[b>>2]=d;h=c;break;}else $c();}while(0);if(f){a=k[j+28>>2]|0;b=38692+(a<<2)|0;if((j|0)==(k[b>>2]|0)){k[b>>2]=h;if(!h){k[9598]=k[9598]&~(1<<a);q=j;e=i;break;}}else{if(f>>>0<(k[9601]|0)>>>0)$c();a=f+16|0;if((k[a>>2]|0)==(j|0))k[a>>2]=h;else k[f+20>>2]=h;if(!h){q=j;e=i;break;}}c=k[9601]|0;if(h>>>0<c>>>0)$c();k[h+24>>2]=f;a=j+16|0;b=k[a>>2]|0;do if(b|0)if(b>>>0<c>>>0)$c();else{k[h+16>>2]=b;k[b+24>>2]=h;break;}while(0);a=k[a+4>>2]|0;if(a){if(a>>>0<(k[9601]|0)>>>0)$c();else{k[h+20>>2]=a;k[a+24>>2]=h;q=j;e=i;break;}}else{q=j;e=i;}}else{q=j;e=i;}}else{q=c;e=d;}while(0);if(q>>>0>=n>>>0)$c();a=n+4|0;b=k[a>>2]|0;if(!(b&1))$c();if(!(b&2)){if((n|0)==(k[9603]|0)){p=(k[9600]|0)+e|0;k[9600]=p;k[9603]=q;k[q+4>>2]=p|1;if((q|0)!=(k[9602]|0))return;k[9602]=0;k[9599]=0;return;}if((n|0)==(k[9602]|0)){p=(k[9599]|0)+e|0;k[9599]=p;k[9602]=q;k[q+4>>2]=p|1;k[q+p>>2]=p;return;}e=(b&-8)+e|0;d=b>>>3;do if(b>>>0>=256){f=k[n+24>>2]|0;a=k[n+12>>2]|0;do if((a|0)==(n|0)){c=n+16|0;b=c+4|0;a=k[b>>2]|0;if(!a){a=k[c>>2]|0;if(!a){m=0;break;}else b=c;}while(1){c=a+20|0;d=k[c>>2]|0;if(d|0){a=d;b=c;continue;}c=a+16|0;d=k[c>>2]|0;if(!d)break;else{a=d;b=c;}}if(b>>>0<(k[9601]|0)>>>0)$c();else{k[b>>2]=0;m=a;break;}}else{b=k[n+8>>2]|0;if(b>>>0<(k[9601]|0)>>>0)$c();c=b+12|0;if((k[c>>2]|0)!=(n|0))$c();d=a+8|0;if((k[d>>2]|0)==(n|0)){k[c>>2]=a;k[d>>2]=b;m=a;break;}else $c();}while(0);if(f|0){a=k[n+28>>2]|0;b=38692+(a<<2)|0;if((n|0)==(k[b>>2]|0)){k[b>>2]=m;if(!m){k[9598]=k[9598]&~(1<<a);break;}}else{if(f>>>0<(k[9601]|0)>>>0)$c();a=f+16|0;if((k[a>>2]|0)==(n|0))k[a>>2]=m;else k[f+20>>2]=m;if(!m)break;}c=k[9601]|0;if(m>>>0<c>>>0)$c();k[m+24>>2]=f;a=n+16|0;b=k[a>>2]|0;do if(b|0)if(b>>>0<c>>>0)$c();else{k[m+16>>2]=b;k[b+24>>2]=m;break;}while(0);a=k[a+4>>2]|0;if(a|0)if(a>>>0<(k[9601]|0)>>>0)$c();else{k[m+20>>2]=a;k[a+24>>2]=m;break;}}}else{b=k[n+8>>2]|0;c=k[n+12>>2]|0;a=38428+(d<<1<<2)|0;if((b|0)!=(a|0)){if(b>>>0<(k[9601]|0)>>>0)$c();if((k[b+12>>2]|0)!=(n|0))$c();}if((c|0)==(b|0)){k[9597]=k[9597]&~(1<<d);break;}if((c|0)!=(a|0)){if(c>>>0<(k[9601]|0)>>>0)$c();a=c+8|0;if((k[a>>2]|0)==(n|0))l=a;else $c();}else l=c+8|0;k[b+12>>2]=c;k[l>>2]=b;}while(0);k[q+4>>2]=e|1;k[q+e>>2]=e;if((q|0)==(k[9602]|0)){k[9599]=e;return;}}else{k[a>>2]=b&-2;k[q+4>>2]=e|1;k[q+e>>2]=e;}a=e>>>3;if(e>>>0<256){c=38428+(a<<1<<2)|0;b=k[9597]|0;a=1<<a;if(b&a){a=c+8|0;b=k[a>>2]|0;if(b>>>0<(k[9601]|0)>>>0)$c();else{o=b;p=a;}}else{k[9597]=b|a;o=c;p=c+8|0;}k[p>>2]=q;k[o+12>>2]=q;k[q+8>>2]=o;k[q+12>>2]=c;return;}a=e>>>8;if(a){if(e>>>0>16777215)a=31;else{o=(a+1048320|0)>>>16&8;p=a<<o;n=(p+520192|0)>>>16&4;p=p<<n;a=(p+245760|0)>>>16&2;a=14-(n|o|a)+(p<<a>>>15)|0;a=e>>>(a+7|0)&1|a<<1;}}else a=0;d=38692+(a<<2)|0;k[q+28>>2]=a;k[q+20>>2]=0;k[q+16>>2]=0;b=k[9598]|0;c=1<<a;do if(b&c){b=e<<((a|0)==31?0:25-(a>>>1)|0);d=k[d>>2]|0;while(1){if((k[d+4>>2]&-8|0)==(e|0)){a=130;break;}c=d+16+(b>>>31<<2)|0;a=k[c>>2]|0;if(!a){a=127;break;}else{b=b<<1;d=a;}}if((a|0)==127){if(c>>>0<(k[9601]|0)>>>0)$c();else{k[c>>2]=q;k[q+24>>2]=d;k[q+12>>2]=q;k[q+8>>2]=q;break;}}else if((a|0)==130){a=d+8|0;b=k[a>>2]|0;p=k[9601]|0;if(b>>>0>=p>>>0&d>>>0>=p>>>0){k[b+12>>2]=q;k[a>>2]=q;k[q+8>>2]=b;k[q+12>>2]=d;k[q+24>>2]=0;break;}else $c();}}else{k[9598]=b|c;k[d>>2]=q;k[q+24>>2]=d;k[q+12>>2]=q;k[q+8>>2]=q;}while(0);q=(k[9605]|0)+-1|0;k[9605]=q;if(!q)a=38844;else return;while(1){a=k[a>>2]|0;if(!a)break;else a=a+8|0;}k[9605]=-1;return;}function KN(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0;j=r;r=r+16|0;b=j;h=j+8|0;c=j+4|0;k[h>>2]=a;do if(a>>>0>=212){g=(a>>>0)/210|0;e=g*210|0;k[c>>2]=a-e;d=(LN(8984,9176,c,b)|0)-8984>>2;a=0;f=d;e=(k[8984+(d<<2)>>2]|0)+e|0;a:while(1){b=5;while(1){if(b>>>0>=47){d=211;i=8;break;}c=k[8792+(b<<2)>>2]|0;d=(e>>>0)/(c>>>0)|0;if(d>>>0<c>>>0){i=107;break a;}if((e|0)==($(d,c)|0))break;else b=b+1|0;}b:do if((i|0)==8){c:while(1){i=0;b=(e>>>0)/(d>>>0)|0;do if(b>>>0>=d>>>0){if((e|0)!=($(b,d)|0)){b=d+10|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0>=b>>>0){if((e|0)!=($(c,b)|0)){b=d+12|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0>=b>>>0){if((e|0)!=($(c,b)|0)){b=d+16|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0>=b>>>0){if((e|0)!=($(c,b)|0)){b=d+18|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0>=b>>>0){if((e|0)!=($(c,b)|0)){b=d+22|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0>=b>>>0){if((e|0)!=($(c,b)|0)){b=d+28|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0>=b>>>0){if((e|0)==($(c,b)|0))c=9;else{b=d+30|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+36|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+40|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+42|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+46|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+52|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+58|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+60|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+66|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+70|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+72|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+78|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+82|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+88|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+96|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+100|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+102|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+106|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+108|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+112|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+120|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+126|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+130|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+136|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+138|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+142|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+148|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+150|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+156|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+162|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+166|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+168|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+172|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+178|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+180|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+186|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+190|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+192|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+196|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+198|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}if((e|0)==($(c,b)|0)){c=9;break;}b=d+208|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break;}c=(e|0)==($(c,b)|0);b=c?b:d+210|0;c=c?9:0;}}else{c=1;a=e;}}else c=9;}else{c=1;a=e;}}else c=9;}else{c=1;a=e;}}else c=9;}else{c=1;a=e;}}else c=9;}else{c=1;a=e;}}else c=9;}else{c=1;a=e;}}else{b=d;c=9;}}else{b=d;c=1;a=e;}while(0);switch(c&15){case 9:break b;case 0:{d=b;i=8;break;}default:break c;}}if(c){i=108;break a;}}while(0);d=f+1|0;c=(d|0)==48;e=(c&1)+g|0;d=c?0:d;f=d;g=e;e=(k[8984+(d<<2)>>2]|0)+(e*210|0)|0;}if((i|0)==107){k[h>>2]=e;a=e;break;}else if((i|0)==108){k[h>>2]=e;break;}}else{a=LN(8792,8984,h,b)|0;a=k[a>>2]|0;}while(0);r=j;return a|0;}function LN(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=k[c>>2]|0;d=a;c=b-a>>2;while(1){if(!c)break;b=(c|0)/2|0;f=d+(b<<2)|0;a=(k[f>>2]|0)>>>0<e>>>0;d=a?f+4|0:d;c=a?c+-1-b|0:b;}return d|0;}function MN(a){a=a|0;Sa(37242,37265,304,37431);}function NN(a){a=a|0;return;}function ON(a){a=a|0;var b=0,c=0;c=a+4|0;b=k[c>>2]|0;k[c>>2]=b+-1;if(!b){_d[k[(k[a>>2]|0)+8>>2]&511](a);a=1;}else a=0;return a|0;}function PN(a){a=a|0;a=a+4|0;k[a>>2]=(k[a>>2]|0)+1;return;}function QN(a){a=a|0;a=a+8|0;k[a>>2]=(k[a>>2]|0)+1;return;}function RN(a){a=a|0;if(ON(a)|0)SN(a);return;}function SN(a){a=a|0;var b=0,c=0;c=a+8|0;b=k[c>>2]|0;k[c>>2]=b+-1;if(!b)_d[k[(k[a>>2]|0)+16>>2]&511](a);return;}function TN(a){a=a|0;var b=0,c=0,d=0;c=a+4|0;b=k[c>>2]|0;while(1){if((b|0)==-1){a=0;break;}d=k[c>>2]|0;if((d|0)==(b|0))k[c>>2]=b+1;if((d|0)==(b|0))break;b=d;}return a|0;}function UN(a){a=a|0;var b=0;b=(a|0)==0?1:a;while(1){a=IN(b)|0;if(a|0)break;a=iP()|0;if(!a){a=0;break;}te[a&3]();}return a|0;}function VN(a,b){a=a|0;b=b|0;return UN(a)|0;}function WN(a){a=a|0;return UN(a)|0;}function XN(a,b){a=a|0;b=b|0;return WN(a)|0;}function YN(a){a=a|0;JN(a);return;}function ZN(a,b){a=a|0;b=b|0;YN(a);return;}function _N(a){a=a|0;YN(a);return;}function $N(a){a=a|0;Sa(37361,37390,1183,37431);}function aO(a){a=a|0;Sa(37452,37390,1194,37481);}function bO(a,b){a=a|0;b=b|0;k[a>>2]=0;k[a+4>>2]=0;k[a+8>>2]=0;if((i[b+11>>0]|0)<0)cO(a,k[b>>2]|0,k[b+4>>2]|0);else{k[a>>2]=k[b>>2];k[a+4>>2]=k[b+4>>2];k[a+8>>2]=k[b+8>>2];}return;}function cO(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;if(c>>>0>4294967279)$N(a);if(c>>>0<11){i[a+11>>0]=c;if(c)d=6;}else{e=c+16&-16;d=UN(e)|0;k[a>>2]=d;k[a+8>>2]=e|-2147483648;k[a+4>>2]=c;a=d;d=6;}if((d|0)==6)qP(a|0,b|0,c|0)|0;i[a+c>>0]=0;return;}function dO(a){a=a|0;if((i[a+11>>0]|0)<0)YN(k[a>>2]|0);return;}function eO(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0;f=a+11|0;d=i[f>>0]|0;e=d<<24>>24<0;if(e)g=(k[a+8>>2]&2147483647)+-1|0;else g=10;do if(g>>>0>=c>>>0){if(e)d=k[a>>2]|0;else d=a;if(c|0)sP(d|0,b|0,c|0)|0;i[d+c>>0]=0;if((i[f>>0]|0)<0){k[a+4>>2]=c;break;}else{i[f>>0]=c;break;}}else{if(e)d=k[a+4>>2]|0;else d=d&255;fO(a,g,c-g|0,d,0,d,c,b);}while(0);return a|0;}function fO(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,l=0,m=0;if((-18-b|0)>>>0<c>>>0)$N(a);if((i[a+11>>0]|0)<0)m=k[a>>2]|0;else m=a;if(b>>>0<2147483623){j=c+b|0;l=b<<1;j=j>>>0<l>>>0?l:j;j=j>>>0<11?11:j+16&-16;}else j=-17;l=UN(j)|0;if(e|0)qP(l|0,m|0,e|0)|0;if(g|0)qP(l+e|0,h|0,g|0)|0;c=d-f|0;d=c-e|0;if(d|0)qP(l+e+g|0,m+e+f|0,d|0)|0;if((b|0)!=10)YN(m);k[a>>2]=l;k[a+8>>2]=j|-2147483648;g=c+g|0;k[a+4>>2]=g;i[l+g>>0]=0;return;}function gO(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,l=0,m=0;if(b>>>0>4294967279)$N(a);m=a+11|0;h=i[m>>0]|0;e=h<<24>>24<0;if(e){l=k[a+4>>2]|0;c=(k[a+8>>2]&2147483647)+-1|0;}else{l=h&255;c=10;}j=l>>>0>b>>>0?l:b;b=j>>>0<11;j=b?10:(j+16&-16)+-1|0;do if((j|0)!=(c|0)){do if(b){c=k[a>>2]|0;if(e){b=0;d=a;g=12;}else{b=0;e=1;d=a;g=13;}}else{d=UN(j+1|0)|0;if(e){b=1;c=k[a>>2]|0;g=12;break;}else{b=1;e=0;c=a;g=13;break;}}while(0);if((g|0)==12){f=b;e=1;b=k[a+4>>2]|0;}else if((g|0)==13){f=b;b=h&255;}b=b+1|0;if(b|0)qP(d|0,c|0,b|0)|0;if(e)YN(c);if(f){k[a+8>>2]=j+1|-2147483648;k[a+4>>2]=l;k[a>>2]=d;break;}else{i[m>>0]=l;break;}}while(0);return;}function hO(a,b){a=a|0;b=b|0;return eO(a,b,lN(b)|0)|0;}function iO(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;e=a+11|0;d=i[e>>0]|0;f=d<<24>>24<0;if(f)d=k[a+4>>2]|0;else d=d&255;do if(d>>>0>=b>>>0){if(f){i[(k[a>>2]|0)+b>>0]=0;k[a+4>>2]=b;break;}else{i[a+b>>0]=0;i[e>>0]=b;break;}}else jO(a,b-d|0,c)|0;while(0);return;}function jO(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0;if(b|0){g=a+11|0;d=i[g>>0]|0;if(d<<24>>24<0){f=k[a+4>>2]|0;e=(k[a+8>>2]&2147483647)+-1|0;}else{f=d&255;e=10;}if((e-f|0)>>>0<b>>>0){kO(a,e,b-e+f|0,f,f,0,0);d=i[g>>0]|0;}if(d<<24>>24<0)e=k[a>>2]|0;else e=a;wP(e+f|0,c|0,b|0)|0;d=f+b|0;if((i[g>>0]|0)<0)k[a+4>>2]=d;else i[g>>0]=d;i[e+d>>0]=0;}return a|0;}function kO(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,l=0;if((-17-b|0)>>>0<c>>>0)$N(a);if((i[a+11>>0]|0)<0)l=k[a>>2]|0;else l=a;if(b>>>0<2147483623){h=c+b|0;j=b<<1;h=h>>>0<j>>>0?j:h;h=h>>>0<11?11:h+16&-16;}else h=-17;j=UN(h)|0;if(e|0)qP(j|0,l|0,e|0)|0;c=d-f-e|0;if(c|0)qP(j+e+g|0,l+e+f|0,c|0)|0;if((b|0)!=10)YN(l);k[a>>2]=j;k[a+8>>2]=h|-2147483648;return;}function lO(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0;g=a+11|0;d=i[g>>0]|0;e=d<<24>>24<0;if(e){f=k[a+4>>2]|0;d=(k[a+8>>2]&2147483647)+-1|0;}else{f=d&255;d=10;}if((d-f|0)>>>0>=c>>>0){if(c|0){if(e)e=k[a>>2]|0;else e=a;qP(e+f|0,b|0,c|0)|0;d=f+c|0;if((i[g>>0]|0)<0)k[a+4>>2]=d;else i[g>>0]=d;i[e+d>>0]=0;}}else fO(a,d,c-d+f|0,f,f,0,c,b);return a|0;}function mO(a,b){a=a|0;b=b|0;return lO(a,b,lN(b)|0)|0;}function nO(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;j=a+11|0;e=i[j>>0]|0;f=e<<24>>24<0;if(f)h=k[a+4>>2]|0;else h=e&255;if(h>>>0<b>>>0)aO(a);if(f)e=(k[a+8>>2]&2147483647)+-1|0;else e=10;if((e-h|0)>>>0>=d>>>0){if(d|0){if(f)g=k[a>>2]|0;else g=a;f=h-b|0;e=g+b|0;if(f){sP(e+d|0,e|0,f|0)|0;c=e>>>0<=c>>>0&(g+h|0)>>>0>c>>>0?c+d|0:c;}sP(e|0,c|0,d|0)|0;c=h+d|0;if((i[j>>0]|0)<0)k[a+4>>2]=c;else i[j>>0]=c;i[g+c>>0]=0;}}else fO(a,e,h+d-e|0,h,b,0,d,c);return a|0;}function oO(a,b,c){a=a|0;b=b|0;c=c|0;return nO(a,b,c,lN(c)|0)|0;}function pO(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;if(d>>>0>4294967279)$N(a);if(d>>>0<11)i[a+11>>0]=c;else{e=d+16&-16;d=UN(e)|0;k[a>>2]=d;k[a+8>>2]=e|-2147483648;k[a+4>>2]=c;a=d;}if(c|0)qP(a|0,b|0,c|0)|0;i[a+c>>0]=0;return;}function qO(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;h=r;r=r+16|0;f=h;g=h+4|0;k[g>>2]=0;k[g+4>>2]=0;k[g+8>>2]=0;c=0;while(1){if((c|0)==3)break;k[g+(c<<2)>>2]=0;c=c+1|0;}e=g+11|0;if((i[e>>0]|0)<0)c=(k[g+8>>2]&2147483647)+-1|0;else c=10;iO(g,c,0);d=i[e>>0]|0;c=d<<24>>24<0?k[g+4>>2]|0:d&255;while(1){d=d<<24>>24<0?k[g>>2]|0:g;k[f>>2]=b;d=mN(d,c+1|0,37502,f)|0;if((d|0)>-1){if(d>>>0>c>>>0)c=d;else break;}else c=c<<1|1;iO(g,c,0);d=i[e>>0]|0;}iO(g,d,0);k[a>>2]=k[g>>2];k[a+4>>2]=k[g+4>>2];k[a+8>>2]=k[g+8>>2];c=0;while(1){if((c|0)==3)break;k[g+(c<<2)>>2]=0;c=c+1|0;}dO(g);r=h;return;}function rO(){var a=0,b=0,c=0,d=0,e=0,f=0,g=0,h=0;e=r;r=r+48|0;g=e+32|0;c=e+24|0;h=e+16|0;f=e;e=e+36|0;a=sO()|0;if(a|0?(d=k[a>>2]|0,d|0):0){a=d+48|0;b=k[a>>2]|0;a=k[a+4>>2]|0;if(!((b&-256|0)==1126902528&(a|0)==1129074247)){k[c>>2]=k[2295];tO(37591,c);}if((b|0)==1126902529&(a|0)==1129074247)a=k[d+44>>2]|0;else a=d+80|0;k[e>>2]=a;d=k[d>>2]|0;a=k[d+4>>2]|0;if(de[k[(k[726]|0)+16>>2]&63](2904,d,e)|0){h=k[e>>2]|0;e=k[2295]|0;h=be[k[(k[h>>2]|0)+8>>2]&255](h)|0;k[f>>2]=e;k[f+4>>2]=a;k[f+8>>2]=h;tO(37505,f);}else{k[h>>2]=k[2295];k[h+4>>2]=a;tO(37550,h);}}tO(37629,g);}function sO(){var a=0,b=0;a=r;r=r+16|0;if(!(Ac(38884,3)|0)){b=Hc(k[9722]|0)|0;r=a;return b|0;}else tO(37780,a);return 0;}function tO(a,b){a=a|0;b=b|0;var c=0;c=r;r=r+16|0;k[c>>2]=b;b=k[2112]|0;oN(b,a,c)|0;GN(10,b)|0;$c();}function uO(a){a=a|0;return;}function vO(a){a=a|0;YN(a);return;}function wO(a){a=a|0;return;}function xO(a){a=a|0;return;}function yO(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0;g=r;r=r+64|0;e=g;if((a|0)!=(b|0)){if((b|0)!=0?(f=EO(b,2928,2912,0)|0,(f|0)!=0):0){b=e+4|0;d=b+52|0;do{k[b>>2]=0;b=b+4|0;}while((b|0)<(d|0));k[e>>2]=f;k[e+8>>2]=a;k[e+12>>2]=-1;k[e+48>>2]=1;we[k[(k[f>>2]|0)+28>>2]&31](f,e,k[c>>2]|0,1);if((k[e+24>>2]|0)==1){k[c>>2]=k[e+16>>2];b=1;}else b=0;}else b=0;}else b=1;r=g;return b|0;}function zO(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;if((a|0)==(k[b+8>>2]|0))DO(0,b,c,d,e);return;}function AO(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;do if((a|0)==(k[b+8>>2]|0)){if((k[b+4>>2]|0)==(c|0)?(f=b+28|0,(k[f>>2]|0)!=1):0)k[f>>2]=d;}else if((a|0)==(k[b>>2]|0)){if((k[b+16>>2]|0)!=(c|0)?(g=b+20|0,(k[g>>2]|0)!=(c|0)):0){k[b+32>>2]=d;k[g>>2]=c;e=b+40|0;k[e>>2]=(k[e>>2]|0)+1;if((k[b+36>>2]|0)==1?(k[b+24>>2]|0)==2:0)i[b+54>>0]=1;k[b+44>>2]=4;break;}if((d|0)==1)k[b+32>>2]=1;}while(0);return;}function BO(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if((a|0)==(k[b+8>>2]|0))CO(0,b,c,d);return;}function CO(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;a=b+16|0;e=k[a>>2]|0;do if(e){if((e|0)!=(c|0)){d=b+36|0;k[d>>2]=(k[d>>2]|0)+1;k[b+24>>2]=2;i[b+54>>0]=1;break;}a=b+24|0;if((k[a>>2]|0)==2)k[a>>2]=d;}else{k[a>>2]=c;k[b+24>>2]=d;k[b+36>>2]=1;}while(0);return;}function DO(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;i[b+53>>0]=1;do if((k[b+4>>2]|0)==(d|0)){i[b+52>>0]=1;a=b+16|0;d=k[a>>2]|0;if(!d){k[a>>2]=c;k[b+24>>2]=e;k[b+36>>2]=1;if(!((e|0)==1?(k[b+48>>2]|0)==1:0))break;i[b+54>>0]=1;break;}if((d|0)!=(c|0)){e=b+36|0;k[e>>2]=(k[e>>2]|0)+1;i[b+54>>0]=1;break;}d=b+24|0;a=k[d>>2]|0;if((a|0)==2){k[d>>2]=e;a=e;}if((a|0)==1?(k[b+48>>2]|0)==1:0)i[b+54>>0]=1;}while(0);return;}function EO(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,l=0,m=0,n=0,o=0,p=0,q=0;q=r;r=r+64|0;o=q;n=k[a>>2]|0;p=a+(k[n+-8>>2]|0)|0;n=k[n+-4>>2]|0;k[o>>2]=c;k[o+4>>2]=a;k[o+8>>2]=b;k[o+12>>2]=d;a=o+16|0;b=o+20|0;d=o+24|0;e=o+28|0;f=o+32|0;g=o+40|0;h=(n|0)==(c|0);l=a;m=l+36|0;do{k[l>>2]=0;l=l+4|0;}while((l|0)<(m|0));j[a+36>>1]=0;i[a+38>>0]=0;a:do if(h){k[o+48>>2]=1;ge[k[(k[c>>2]|0)+20>>2]&7](c,o,p,p,1,0);a=(k[d>>2]|0)==1?p:0;}else{Yd[k[(k[n>>2]|0)+24>>2]&31](n,o,p,1,0);switch(k[o+36>>2]|0){case 0:{a=(k[g>>2]|0)==1&(k[e>>2]|0)==1&(k[f>>2]|0)==1?k[b>>2]|0:0;break a;}case 1:break;default:{a=0;break a;}}if((k[d>>2]|0)!=1?!((k[g>>2]|0)==0&(k[e>>2]|0)==1&(k[f>>2]|0)==1):0){a=0;break;}a=k[a>>2]|0;}while(0);r=q;return a|0;}function FO(a){a=a|0;YN(a);return;}function GO(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;if((a|0)==(k[b+8>>2]|0))DO(0,b,c,d,e);else{a=k[a+8>>2]|0;ge[k[(k[a>>2]|0)+20>>2]&7](a,b,c,d,e,f);}return;}function HO(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0;do if((a|0)==(k[b+8>>2]|0)){if((k[b+4>>2]|0)==(c|0)?(f=b+28|0,(k[f>>2]|0)!=1):0)k[f>>2]=d;}else{if((a|0)!=(k[b>>2]|0)){h=k[a+8>>2]|0;Yd[k[(k[h>>2]|0)+24>>2]&31](h,b,c,d,e);break;}if((k[b+16>>2]|0)!=(c|0)?(h=b+20|0,(k[h>>2]|0)!=(c|0)):0){k[b+32>>2]=d;g=b+44|0;if((k[g>>2]|0)==4)break;f=b+52|0;i[f>>0]=0;d=b+53|0;i[d>>0]=0;a=k[a+8>>2]|0;ge[k[(k[a>>2]|0)+20>>2]&7](a,b,c,c,1,e);if(i[d>>0]|0){if(!(i[f>>0]|0)){f=1;d=13;}else d=17;}else{f=0;d=13;}do if((d|0)==13){k[h>>2]=c;c=b+40|0;k[c>>2]=(k[c>>2]|0)+1;if((k[b+36>>2]|0)==1?(k[b+24>>2]|0)==2:0){i[b+54>>0]=1;if(f){d=17;break;}else{f=4;break;}}if(f)d=17;else f=4;}while(0);if((d|0)==17)f=3;k[g>>2]=f;break;}if((d|0)==1)k[b+32>>2]=1;}while(0);return;}function IO(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if((a|0)==(k[b+8>>2]|0))CO(0,b,c,d);else{a=k[a+8>>2]|0;we[k[(k[a>>2]|0)+28>>2]&31](a,b,c,d);}return;}function JO(a){a=a|0;return;}function KO(){var a=0;a=r;r=r+16|0;if(!(Qc(38888,394)|0)){r=a;return;}else tO(37829,a);}function LO(a){a=a|0;var b=0;b=r;r=r+16|0;JN(a);if(!(Md(k[9722]|0,0)|0)){r=b;return;}else tO(37879,b);}function MO(){var a=0,b=0;a=sO()|0;if((a|0?(b=k[a>>2]|0,b|0):0)?(a=b+48|0,(k[a>>2]&-256|0)==1126902528?(k[a+4>>2]|0)==1129074247:0):0)NO(k[b+12>>2]|0);NO(OO()|0);}function NO(a){a=a|0;var b=0;b=r;r=r+16|0;te[a&3]();tO(37932,b);}function OO(){var a=0;a=k[2294]|0;k[2294]=a+0;return a|0;}function PO(a){a=a|0;return;}function QO(a){a=a|0;YN(a);return;}function RO(a){a=a|0;return 37972;}function SO(a){a=a|0;return;}function TO(a){a=a|0;return 38e3;}function UO(a){a=a|0;YN(a);return;}function VO(a,b,c){a=a|0;b=b|0;c=c|0;return(a|0)==(b|0)|0;}function WO(a){a=a|0;YN(a);return;}function XO(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,i=0;i=r;r=r+64|0;h=i;k[c>>2]=k[k[c>>2]>>2];if(!((a|0)==(b|0)|(b|0)==3040)){if(((b|0)!=0?(d=EO(b,2928,3e3,0)|0,(d|0)!=0):0)?(k[d+8>>2]&~k[a+8>>2]|0)==0:0){b=k[a+12>>2]|0;a=d+12|0;if(!((b|0)==3032?1:(b|0)==(k[a>>2]|0))){if((((b|0)!=0?(f=EO(b,2928,2912,0)|0,(f|0)!=0):0)?(e=k[a>>2]|0,(e|0)!=0):0)?(g=EO(e,2928,2912,0)|0,(g|0)!=0):0){a=h+4|0;b=a+52|0;do{k[a>>2]=0;a=a+4|0;}while((a|0)<(b|0));k[h>>2]=g;k[h+8>>2]=f;k[h+12>>2]=-1;k[h+48>>2]=1;we[k[(k[g>>2]|0)+28>>2]&31](g,h,k[c>>2]|0,1);if((k[h+24>>2]|0)==1){k[c>>2]=k[h+16>>2];a=1;}else a=0;}else a=0;}else a=1;}else a=0;}else a=1;r=i;return a|0;}function YO(a){a=a|0;YN(a);return;}function ZO(a,b,c){a=a|0;b=b|0;c=c|0;return(a|0)==(b|0)|0;}function _O(a){a=a|0;YN(a);return;}function $O(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;if((a|0)==(k[b+8>>2]|0))DO(0,b,c,d,e);else{r=b+52|0;m=j[r>>1]|0;h=m&255;l=b+53|0;m=(m&65535)>>>8&255;q=k[a+12>>2]|0;n=a+16+(q<<3)|0;i[r>>0]=0;i[l>>0]=0;dP(a+16|0,b,c,d,e,f);a:do if((q|0)>1){o=b+24|0;p=a+8|0;q=b+54|0;a=a+24|0;do{if(i[q>>0]|0)break a;g=j[r>>1]|0;if(!((g&255)<<24>>24)){if((g&65535)>=256?(k[p>>2]&1|0)==0:0)break a;}else{if((k[o>>2]|0)==1)break a;if(!(k[p>>2]&2))break a;}i[r>>0]=0;i[l>>0]=0;dP(a,b,c,d,e,f);a=a+8|0;}while(a>>>0<n>>>0);}while(0);i[r>>0]=h;i[l>>0]=m;}return;}function aP(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0;a:do if((a|0)==(k[b+8>>2]|0)){if((k[b+4>>2]|0)==(c|0)?(f=b+28|0,(k[f>>2]|0)!=1):0)k[f>>2]=d;}else{if((a|0)!=(k[b>>2]|0)){q=k[a+12>>2]|0;h=a+16+(q<<3)|0;eP(a+16|0,b,c,d,e);f=a+24|0;if((q|0)<=1)break;a=k[a+8>>2]|0;if((a&2|0)==0?(j=b+36|0,(k[j>>2]|0)!=1):0){if(!(a&1)){a=b+54|0;while(1){if(i[a>>0]|0)break a;if((k[j>>2]|0)==1)break a;eP(f,b,c,d,e);f=f+8|0;if(f>>>0>=h>>>0)break a;}}a=b+24|0;g=b+54|0;while(1){if(i[g>>0]|0)break a;if((k[j>>2]|0)==1?(k[a>>2]|0)==1:0)break a;eP(f,b,c,d,e);f=f+8|0;if(f>>>0>=h>>>0)break a;}}a=b+54|0;while(1){if(i[a>>0]|0)break a;eP(f,b,c,d,e);f=f+8|0;if(f>>>0>=h>>>0)break a;}}if((k[b+16>>2]|0)!=(c|0)?(q=b+20|0,(k[q>>2]|0)!=(c|0)):0){k[b+32>>2]=d;p=b+44|0;if((k[p>>2]|0)==4)break;j=a+16+(k[a+12>>2]<<3)|0;d=b+52|0;l=b+53|0;n=b+54|0;m=a+8|0;o=b+24|0;f=0;g=a+16|0;h=0;b:while(1){if(g>>>0>=j>>>0){a=20;break;}i[d>>0]=0;i[l>>0]=0;dP(g,b,c,c,1,e);if(i[n>>0]|0){a=20;break;}do if(i[l>>0]|0){if(!(i[d>>0]|0))if(!(k[m>>2]&1)){f=1;a=20;break b;}else{f=1;a=h;break;}if((k[o>>2]|0)==1){a=25;break b;}if(!(k[m>>2]&2)){a=25;break b;}else{f=1;a=1;}}else a=h;while(0);g=g+8|0;h=a;}do if((a|0)==20){if((!h?(k[q>>2]=c,c=b+40|0,k[c>>2]=(k[c>>2]|0)+1,(k[b+36>>2]|0)==1):0)?(k[o>>2]|0)==2:0){i[n>>0]=1;if(f){a=25;break;}else{f=4;break;}}if(f)a=25;else f=4;}while(0);if((a|0)==25)f=3;k[p>>2]=f;break;}if((d|0)==1)k[b+32>>2]=1;}while(0);return;}function bP(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;a:do if((a|0)!=(k[b+8>>2]|0)){f=k[a+12>>2]|0;e=a+16+(f<<3)|0;cP(a+16|0,b,c,d);if((f|0)>1){f=b+54|0;a=a+24|0;do{cP(a,b,c,d);if(i[f>>0]|0)break a;a=a+8|0;}while(a>>>0<e>>>0);}}else CO(0,b,c,d);while(0);return;}function cP(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;f=k[a+4>>2]|0;e=f>>8;if(f&1)e=k[(k[c>>2]|0)+e>>2]|0;a=k[a>>2]|0;we[k[(k[a>>2]|0)+28>>2]&31](a,b,c+e|0,f&2|0?d:2);return;}function dP(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;h=k[a+4>>2]|0;g=h>>8;if(h&1)g=k[(k[d>>2]|0)+g>>2]|0;a=k[a>>2]|0;ge[k[(k[a>>2]|0)+20>>2]&7](a,b,c,d+g|0,h&2|0?e:2,f);return;}function eP(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;g=k[a+4>>2]|0;f=g>>8;if(g&1)f=k[(k[c>>2]|0)+f>>2]|0;a=k[a>>2]|0;Yd[k[(k[a>>2]|0)+24>>2]&31](a,b,c+f|0,g&2|0?d:2,e);return;}function fP(a){a=a|0;if((i[a>>0]|0)==1)a=0;else{i[a>>0]=1;a=1;}return a|0;}function gP(a){a=a|0;return;}function hP(a){a=a|0;k[a>>2]=9272;return;}function iP(){var a=0;a=k[9723]|0;k[9723]=a+0;return a|0;}function jP(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=r;r=r+16|0;d=e;k[d>>2]=k[c>>2];a=de[k[(k[a>>2]|0)+16>>2]&63](a,b,d)|0;if(a)k[c>>2]=k[d>>2];r=e;return a&1|0;}function kP(a){a=a|0;if(!a)a=0;else a=(EO(a,2928,3e3,0)|0)!=0;return a&1|0;}function lP(){}function mP(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;d=b-d-(c>>>0>a>>>0|0)>>>0;return(M=d,a-c>>>0|0)|0;}function nP(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;c=a+c>>>0;return(M=b+d+(c>>>0<a>>>0|0)>>>0,c|0)|0;}function oP(a){a=+a;return a>=0.0?+N(a+.5):+_(a-.5);}function pP(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){M=b>>>c;return a>>>c|(b&(1<<c)-1)<<32-c;}M=0;return b>>>c-32|0;}function qP(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;if((c|0)>=4096)return Jc(a|0,b|0,c|0)|0;d=a|0;if((a&3)==(b&3)){while(a&3){if(!c)return d|0;i[a>>0]=i[b>>0]|0;a=a+1|0;b=b+1|0;c=c-1|0;}while((c|0)>=4){k[a>>2]=k[b>>2];a=a+4|0;b=b+4|0;c=c-4|0;}}while((c|0)>0){i[a>>0]=i[b>>0]|0;a=a+1|0;b=b+1|0;c=c-1|0;}return d|0;}function rP(a){a=a|0;var b=0,c=0;c=a+15&-16|0;b=k[t>>2]|0;a=b+c|0;if((c|0)>0&(a|0)<(b|0)|(a|0)<0){ha()|0;Mb(12);return-1;}k[t>>2]=a;if((a|0)>(ga()|0)?(fa()|0)==0:0){Mb(12);k[t>>2]=b;return-1;}return b|0;}function sP(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;if((b|0)<(a|0)&(a|0)<(b+c|0)){d=a;b=b+c|0;a=a+c|0;while((c|0)>0){a=a-1|0;b=b-1|0;c=c-1|0;i[a>>0]=i[b>>0]|0;}a=d;}else qP(a,b,c)|0;return a|0;}function tP(a){a=a|0;var b=0;b=i[w+(a&255)>>0]|0;if((b|0)<8)return b|0;b=i[w+(a>>8&255)>>0]|0;if((b|0)<8)return b+8|0;b=i[w+(a>>16&255)>>0]|0;if((b|0)<8)return b+16|0;return(i[w+(a>>>24)>>0]|0)+24|0;}function uP(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,l=0,m=0,n=0,o=0,p=0;l=a;i=b;j=i;g=c;n=d;h=n;if(!j){f=(e|0)!=0;if(!h){if(f){k[e>>2]=(l>>>0)%(g>>>0);k[e+4>>2]=0;}n=0;e=(l>>>0)/(g>>>0)>>>0;return(M=n,e)|0;}else{if(!f){n=0;e=0;return(M=n,e)|0;}k[e>>2]=a|0;k[e+4>>2]=b&0;n=0;e=0;return(M=n,e)|0;}}f=(h|0)==0;do if(g){if(!f){f=(ca(h|0)|0)-(ca(j|0)|0)|0;if(f>>>0<=31){m=f+1|0;h=31-f|0;b=f-31>>31;g=m;a=l>>>(m>>>0)&b|j<<h;b=j>>>(m>>>0)&b;f=0;h=l<<h;break;}if(!e){n=0;e=0;return(M=n,e)|0;}k[e>>2]=a|0;k[e+4>>2]=i|b&0;n=0;e=0;return(M=n,e)|0;}f=g-1|0;if(f&g|0){h=(ca(g|0)|0)+33-(ca(j|0)|0)|0;p=64-h|0;m=32-h|0;i=m>>31;o=h-32|0;b=o>>31;g=h;a=m-1>>31&j>>>(o>>>0)|(j<<m|l>>>(h>>>0))&b;b=b&j>>>(h>>>0);f=l<<p&i;h=(j<<p|l>>>(o>>>0))&i|l<<m&h-33>>31;break;}if(e|0){k[e>>2]=f&l;k[e+4>>2]=0;}if((g|0)==1){o=i|b&0;p=a|0|0;return(M=o,p)|0;}else{p=tP(g|0)|0;o=j>>>(p>>>0)|0;p=j<<32-p|l>>>(p>>>0)|0;return(M=o,p)|0;}}else{if(f){if(e|0){k[e>>2]=(j>>>0)%(g>>>0);k[e+4>>2]=0;}o=0;p=(j>>>0)/(g>>>0)>>>0;return(M=o,p)|0;}if(!l){if(e|0){k[e>>2]=0;k[e+4>>2]=(j>>>0)%(h>>>0);}o=0;p=(j>>>0)/(h>>>0)>>>0;return(M=o,p)|0;}f=h-1|0;if(!(f&h)){if(e|0){k[e>>2]=a|0;k[e+4>>2]=f&j|b&0;}o=0;p=j>>>((tP(h|0)|0)>>>0);return(M=o,p)|0;}f=(ca(h|0)|0)-(ca(j|0)|0)|0;if(f>>>0<=30){b=f+1|0;h=31-f|0;g=b;a=j<<h|l>>>(b>>>0);b=j>>>(b>>>0);f=0;h=l<<h;break;}if(!e){o=0;p=0;return(M=o,p)|0;}k[e>>2]=a|0;k[e+4>>2]=i|b&0;o=0;p=0;return(M=o,p)|0;}while(0);if(!g){j=h;i=0;h=0;}else{m=c|0|0;l=n|d&0;j=nP(m|0,l|0,-1,-1)|0;c=M;i=h;h=0;do{d=i;i=f>>>31|i<<1;f=h|f<<1;d=a<<1|d>>>31|0;n=a>>>31|b<<1|0;mP(j|0,c|0,d|0,n|0)|0;p=M;o=p>>31|((p|0)<0?-1:0)<<1;h=o&1;a=mP(d|0,n|0,o&m|0,(((p|0)<0?-1:0)>>31|((p|0)<0?-1:0)<<1)&l|0)|0;b=M;g=g-1|0;}while((g|0)!=0);j=i;i=0;}g=0;if(e|0){k[e>>2]=a;k[e+4>>2]=b;}o=(f|0)>>>31|(j|g)<<1|(g<<1|f>>>31)&0|i;p=(f<<1|0>>>31)&-2|h;return(M=o,p)|0;}function vP(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;f=r;r=r+16|0;e=f|0;uP(a,b,c,d,e)|0;r=f;return(M=k[e+4>>2]|0,k[e>>2]|0)|0;}function wP(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0;d=a+c|0;if((c|0)>=20){b=b&255;f=a&3;g=b|b<<8|b<<16|b<<24;e=d&~3;if(f){f=a+4-f|0;while((a|0)<(f|0)){i[a>>0]=b;a=a+1|0;}}while((a|0)<(e|0)){k[a>>2]=g;a=a+4|0;}}while((a|0)<(d|0)){i[a>>0]=b;a=a+1|0;}return a-c|0;}function xP(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){M=b<<c|(a&(1<<c)-1<<32-c)>>>32-c;return a<<c;}M=a<<c-32;return 0;}function yP(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return uP(a,b,c,d,0)|0;}function zP(){return 0;}function AP(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;Yd[a&31](b|0,c|0,d|0,e|0,f|0);}function BP(a,b,c){a=a|0;b=b|0;c=+c;Zd[a&7](b|0,+c);}function CP(a,b){a=a|0;b=b|0;_d[a&511](b|0);}function DP(a,b,c){a=a|0;b=b|0;c=c|0;$d[a&255](b|0,c|0);}function EP(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return ae[a&3](b|0,c|0,d|0,e|0,f|0,g|0)|0;}function FP(a,b){a=a|0;b=b|0;return be[a&255](b|0)|0;}function GP(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;f=f|0;g=g|0;return ce[a&3](b|0,c|0,d|0,+e,f|0,g|0)|0;}function HP(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return de[a&63](b|0,c|0,d|0)|0;}function IP(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=+g;h=h|0;ee[a&1](b|0,c|0,d|0,e|0,f|0,+g,h|0);}function JP(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;fe[a&3](b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0);}function KP(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;ge[a&7](b|0,c|0,d|0,e|0,f|0,g|0);}function LP(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;return he[a&7](b|0,c|0,+d)|0;}function MP(a,b){a=a|0;b=b|0;return+ie[a&7](b|0);}function NP(a,b,c,d,e,f){a=a|0;b=b|0;c=+c;d=+d;e=+e;f=+f;je[a&3](b|0,+c,+d,+e,+f);}function OP(a,b,c){a=a|0;b=b|0;c=+c;return ke[a&7](b|0,+c)|0;}function PP(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;le[a&3](b|0,c|0,d|0,e|0,f|0,g|0,h|0);}function QP(a,b,c,d,e,f,g,h,i,j,k){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;me[a&7](b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0,j|0,k|0);}function RP(a,b,c){a=a|0;b=b|0;c=c|0;return ne[a&127](b|0,c|0)|0;}function SP(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;f=f|0;oe[a&1](b|0,c|0,+d,e|0,f|0);}function TP(a,b,c){a=a|0;b=b|0;c=c|0;return+pe[a&3](b|0,c|0);}function UP(a){a=a|0;return qe[a&7]()|0;}function VP(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return re[a&63](b|0,c|0,d|0,e|0)|0;}function WP(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;se[a&63](b|0,c|0,d|0);}function XP(a){a=a|0;te[a&3]();}function YP(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;ue[a&7](b|0,c|0,+d);}function ZP(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;return ve[a&1](b|0,c|0,d|0,+e)|0;}function _P(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;we[a&31](b|0,c|0,d|0,e|0);}function $P(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;da(0);}function aQ(a,b){a=a|0;b=+b;da(1);}function bQ(a){a=a|0;da(2);}function cQ(a,b){a=a|0;b=b|0;da(3);}function dQ(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;da(4);return 0;}function eQ(a){a=a|0;da(5);return 0;}function fQ(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;f=f|0;da(6);return 0;}function gQ(a,b,c){a=a|0;b=b|0;c=c|0;da(7);return 0;}function hQ(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=+f;g=g|0;da(8);}function iQ(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;da(9);}function jQ(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;da(10);}function kQ(a,b,c){a=a|0;b=b|0;c=+c;da(11);return 0;}function lQ(a){a=a|0;da(12);return 0.0;}function mQ(a,b,c,d,e){a=a|0;b=+b;c=+c;d=+d;e=+e;da(13);}function nQ(a,b){a=a|0;b=+b;da(14);return 0;}function oQ(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;da(15);}function pQ(a,b,c,d,e,f,g,h,i,j){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;da(16);}function qQ(a,b){a=a|0;b=b|0;da(17);return 0;}function rQ(a,b,c,d,e){a=a|0;b=b|0;c=+c;d=d|0;e=e|0;da(18);}function sQ(a,b){a=a|0;b=b|0;da(19);return 0.0;}function tQ(){da(20);return 0;}function uQ(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;da(21);return 0;}function vQ(a,b,c){a=a|0;b=b|0;c=c|0;da(22);}function wQ(){da(23);}function xQ(){hd();}function yQ(a,b,c){a=a|0;b=b|0;c=+c;da(24);}function zQ(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;da(25);return 0;}function AQ(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;da(26);}// EMSCRIPTEN_END_FUNCS
	var Yd=[$P,WA,SB,TB,hC,kC,tC,vC,CC,DC,KC,NC,oL,pL,FL,IL,RL,TL,_L,$L,gM,jM,AO,HO,aP,$P,$P,$P,$P,$P,$P,$P];var Zd=[aQ,xg,ci,Ti,oj,Hj,_j,qk];var _d=[bQ,Ke,Le,NN,Oe,Pe,Re,Se,Te,Ze,_e,af,cf,df,nf,of,qf,Af,Bf,Hf,If,Kf,Nf,Of,Uf,Vf,Xf,_f,$f,fg,gg,ig,kg,lg,pg,qg,rg,Eg,Fg,Hg,Tg,Ug,bh,ch,SO,ih,sh,th,xh,yh,Eh,Fh,Jh,Kh,Uh,Vh,Zh,pi,qi,si,ti,ui,wi,xi,yi,Ai,Bi,Ci,Ei,Fi,Gi,Ii,Ji,Ki,Oi,aj,bj,dj,ej,fj,jj,xj,yj,Cj,Qj,Rj,Vj,gk,hk,lk,uk,vk,Ik,Yk,Zk,$k,el,fl,al,bl,nl,ol,ql,rl,sl,ul,vl,wl,yl,zl,Al,Cl,Dl,El,Gl,Hl,Il,Kl,Ll,Yl,Zl,om,pm,rm,wm,xm,zm,Am,Gm,Bm,Mm,Nm,Pm,Qm,Wm,Rm,$m,an,cn,dn,kn,en,rn,sn,un,yn,zn,Bn,Fn,Gn,Zn,$n,io,jo,lo,xo,yo,Ao,Po,Qo,So,To,Uo,Wo,Xo,Yo,_o,$o,ap,cp,dp,ep,gp,ip,jp,Hp,Ip,Kp,Op,Pp,Rp,Sp,Tp,bq,cq,fq,gq,hq,mq,nq,Vq,Wq,zr,as,ds,es,fs,Tr,Ur,Xr,Yr,Jr,Kr,Nr,Or,Ar,Dr,Er,Fr,ks,ls,ns,ss,ts,vs,gr,ws,At,Bt,Ct,Gt,Ht,It,Kt,Lt,Mt,Pt,Qt,Rt,Zt,_t,cu,eu,fu,gu,Ju,Ku,Tu,Vu,Wu,Xu,gv,UA,VA,XA,aB,bB,lB,mB,wB,yB,zB,AB,JB,KB,FB,GB,IB,QC,RC,WC,LD,OD,PD,QD,zD,AD,DD,ED,WD,XD,ZD,_D,$D,bE,cE,dE,fE,jE,kE,mE,rE,sE,uE,BE,CE,lF,mF,oF,qF,rF,tF,wH,xH,EH,FH,GH,gI,hI,_H,$H,WH,XH,ZH,cI,dI,fI,lI,mI,nI,tI,uI,wI,xI,yI,HI,II,KI,LI,MI,NI,OI,PI,ZI,_I,CJ,DJ,yJ,zJ,BJ,KJ,LJ,FK,IK,JK,KK,xK,AK,BK,CK,oK,rK,sK,tK,gK,jK,kK,lK,_J,bK,cK,dK,OK,PK,RK,fL,gL,VK,WK,YK,ZK,_K,aL,bL,cL,eL,mM,nM,pM,uO,vO,wO,xO,FO,PO,QO,UO,WO,YO,_O,$i,wj,Lj,Oj,ck,ek,$F,vH,rH,nH,jH,fH,_G,iN,LO,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ,bQ];var $d=[cQ,Ge,Ie,Ve,Xe,ff,hf,Df,Ff,Qf,Sf,bg,dg,og,tg,vg,wg,yg,zg,Vg,Wg,dh,uh,vh,zh,Ah,Gh,Hh,Lh,Mh,Xh,Yh,ai,bi,di,ei,Mi,Ni,Ri,Si,Ui,Vi,hj,ij,mj,nj,pj,qj,Aj,Bj,Fj,Gj,Ij,Jj,Tj,Uj,Yj,Zj,$j,ak,jk,kk,ok,pk,rk,sk,wk,xk,Jk,Kk,cl,dl,Ml,Nl,_l,$l,Cm,Dm,Sm,Tm,fn,gn,Wn,kp,lp,Up,Vp,eq,vq,Rq,Uq,Xq,cs,Wr,Mr,Pr,Cr,qB,rB,sB,tB,uB,vB,VB,XB,aC,cC,fC,gC,iC,jC,zC,LC,ND,CD,JE,NE,BH,JH,qI,MJ,HK,zK,qK,iK,aK,rL,tL,yL,AL,DL,EL,GL,HL,XL,hM,Yi,Zi,_i,tj,uj,vj,Kj,Mj,Nj,bk,dk,AG,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ,cQ];var ae=[dQ,UC,VC,dQ];var be=[eQ,Me,He,Ue,We,ef,gf,Cf,Ef,Pf,Rf,ag,cg,mg,ng,sg,ug,TO,Wh,_h,$h,Li,Pi,Qi,gj,kj,lj,zj,Dj,Ej,Sj,Wj,Xj,ik,mk,nk,Hn,In,Jn,Kn,Ln,Mn,Nn,On,Pn,Qn,Rn,Sn,Tn,Un,Xn,ao,co,dq,jq,oq,pq,sq,wq,Dq,Gq,Hq,Iq,Mq,Nq,Pq,Qq,Sq,bs,hs,Vr,$r,Lr,Rr,Br,Hr,xs,ys,zs,Ds,Jt,Nt,Ot,St,Tt,$t,au,bu,Lu,Mu,Nu,Ou,Pu,Qu,Ru,Su,cB,dB,eB,nB,oB,pB,LB,MB,YB,rC,ZC,MD,SD,BD,HD,DE,EE,FE,GE,OE,PE,iI,jI,kI,aI,bI,$I,aJ,bJ,cJ,GK,MK,yK,EK,pK,vK,hK,nK,$J,fK,hL,iL,uL,PL,cN,RO,_F,aG,qM,KM,PM,QM,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ,eQ];var ce=[fQ,SC,TC,fQ];var de=[gQ,Ck,Pk,Sl,em,qp,du,hu,Uu,Yu,xB,BB,qC,xC,yH,HH,oI,OL,VL,hN,dN,jN,CN,yO,VO,XO,ZO,dG,hG,jG,lG,nG,tG,vG,xG,zG,gQ,gQ,gQ,gQ,gQ,gQ,gQ,gQ,gQ,gQ,gQ,gQ,gQ,gQ,gQ,gQ,gQ,gQ,gQ,gQ,gQ,gQ,gQ,gQ,gQ,gQ,gQ,gQ];var ee=[hQ,pI];var fe=[iQ,BC,ZL,iQ];var ge=[jQ,lC,JL,zO,GO,$O,jQ,jQ];var he=[kQ,rq,uq,AM,rG,kQ,kQ,kQ];var ie=[lQ,tq,As,fB,dJ,lQ,lQ,lQ];var je=[mQ,WB,sL,mQ];var ke=[nQ,xq,yq,CM,EM,nQ,nQ,nQ];var le=[oQ,MC,iM,oQ];var me=[pQ,EC,GC,aM,cM,pQ,pQ,pQ];var ne=[qQ,Qe,$e,pf,Jf,Wf,hg,Gg,ri,vi,zi,Di,Hi,cj,_k,pl,tl,xl,Bl,Fl,Jl,qm,ym,Om,bn,tn,An,Yn,_n,bo,eo,fo,ko,zo,Ro,Vo,Zo,bp,fp,Jp,Qp,iq,qq,zq,Aq,Bq,Cq,Eq,Fq,Jq,Kq,Lq,Oq,Tq,gs,_r,Qr,Gr,ms,us,UB,ZB,yC,HB,XC,RD,GD,YD,aE,eE,lE,tE,nF,sF,YH,eI,vI,JI,AJ,LK,DK,uK,mK,eK,QK,qL,vL,WL,XK,$K,dL,oM,SJ,fG,sM,uM,wM,yM,FM,HM,IM,JM,LM,NM,RM,UM,CG,sH,oH,gH,cH,XG,VG,TG,RG,PG,MG,JG,GG,EG,qQ,qQ,qQ,qQ,qQ,qQ,qQ,qQ];var oe=[rQ,Es];var pe=[sQ,kH,aH,sQ];var qe=[tQ,bG,uH,qH,mH,iH,eH,ZG];var re=[uQ,yk,zk,Ak,Bk,Dk,Ek,Fk,Gk,Hk,Lk,Mk,Nk,Ok,Qk,Rk,Sk,Tk,Uk,Ol,Pl,Ql,Rl,Tl,Ul,Vl,Wl,Xl,am,bm,cm,dm,fm,gm,hm,im,jm,mp,np,op,pp,rp,sp,tp,up,vp,_C,uQ,uQ,uQ,uQ,uQ,uQ,uQ,uQ,uQ,uQ,uQ,uQ,uQ,uQ,uQ,uQ,uQ];var se=[vQ,Vn,Bs,Cs,gB,hB,NB,OB,PB,QB,RB,_B,$B,bC,dC,eC,mC,nC,oC,pC,sC,AC,YC,HE,IE,KE,LE,ME,zH,AH,IH,EJ,jL,kL,lL,mL,nL,wL,xL,zL,BL,CL,KL,LL,ML,NL,QL,YL,tH,pH,hH,dH,YG,WG,UG,SG,QG,NG,KG,HG,FG,vQ,vQ,vQ];var te=[wQ,xQ,rO,KO];var ue=[yQ,HC,dM,lH,bH,yQ,yQ,yQ];var ve=[zQ,pG];var we=[AQ,Zr,uC,wC,FC,IC,JC,FD,zI,SL,UL,bM,eM,fM,BO,IO,bP,AQ,AQ,AQ,AQ,AQ,AQ,AQ,AQ,AQ,AQ,AQ,AQ,AQ,AQ,AQ];return{___uremdi3:vP,_sbrk:rP,___cxa_can_catch:jP,_fflush:DN,___udivmoddi4:uP,___cxa_is_pointer_type:kP,_i64Add:nP,_memmove:sP,_pthread_self:zP,_memset:wP,_llvm_cttz_i32:tP,_malloc:IN,_memcpy:qP,___getTypeName:bN,_bitshift64Lshr:pP,_free:JN,_roundf:oP,___udivdi3:yP,_i64Subtract:mP,___errno_location:fN,_bitshift64Shl:xP,__GLOBAL__sub_I_duplicator_cpp:Bx,__GLOBAL__sub_I_bindings_cpp:uF,__GLOBAL__sub_I_bind_cpp:VM,runPostSets:lP,_emscripten_replace_memory:Xd,stackAlloc:xe,stackSave:ye,stackRestore:ze,establishStackSpace:Ae,setThrew:Be,setTempRet0:Ce,getTempRet0:De,dynCall_viiiii:AP,dynCall_vid:BP,dynCall_vi:CP,dynCall_vii:DP,dynCall_iiiiiii:EP,dynCall_ii:FP,dynCall_iiiidii:GP,dynCall_iiii:HP,dynCall_viiiiidi:IP,dynCall_viiiiiiii:JP,dynCall_viiiiii:KP,dynCall_iiid:LP,dynCall_di:MP,dynCall_vidddd:NP,dynCall_iid:OP,dynCall_viiiiiii:PP,dynCall_viiiiiiiiii:QP,dynCall_iii:RP,dynCall_viidii:SP,dynCall_dii:TP,dynCall_i:UP,dynCall_iiiii:VP,dynCall_viii:WP,dynCall_v:XP,dynCall_viid:YP,dynCall_iiiid:ZP,dynCall_viiii:_P};}(// EMSCRIPTEN_END_ASM
	Module.asmGlobalArg,Module.asmLibraryArg,buffer);var _roundf=Module["_roundf"]=asm["_roundf"];var _llvm_cttz_i32=Module["_llvm_cttz_i32"]=asm["_llvm_cttz_i32"];var _bitshift64Lshr=Module["_bitshift64Lshr"]=asm["_bitshift64Lshr"];var _bitshift64Shl=Module["_bitshift64Shl"]=asm["_bitshift64Shl"];var _fflush=Module["_fflush"]=asm["_fflush"];var ___cxa_is_pointer_type=Module["___cxa_is_pointer_type"]=asm["___cxa_is_pointer_type"];var _memset=Module["_memset"]=asm["_memset"];var _sbrk=Module["_sbrk"]=asm["_sbrk"];var _memcpy=Module["_memcpy"]=asm["_memcpy"];var ___uremdi3=Module["___uremdi3"]=asm["___uremdi3"];var _i64Subtract=Module["_i64Subtract"]=asm["_i64Subtract"];var __GLOBAL__sub_I_bind_cpp=Module["__GLOBAL__sub_I_bind_cpp"]=asm["__GLOBAL__sub_I_bind_cpp"];var ___udivmoddi4=Module["___udivmoddi4"]=asm["___udivmoddi4"];var _i64Add=Module["_i64Add"]=asm["_i64Add"];var __GLOBAL__sub_I_duplicator_cpp=Module["__GLOBAL__sub_I_duplicator_cpp"]=asm["__GLOBAL__sub_I_duplicator_cpp"];var _pthread_self=Module["_pthread_self"]=asm["_pthread_self"];var ___getTypeName=Module["___getTypeName"]=asm["___getTypeName"];var ___udivdi3=Module["___udivdi3"]=asm["___udivdi3"];var ___errno_location=Module["___errno_location"]=asm["___errno_location"];var ___cxa_can_catch=Module["___cxa_can_catch"]=asm["___cxa_can_catch"];var _free=Module["_free"]=asm["_free"];var runPostSets=Module["runPostSets"]=asm["runPostSets"];var _memmove=Module["_memmove"]=asm["_memmove"];var __GLOBAL__sub_I_bindings_cpp=Module["__GLOBAL__sub_I_bindings_cpp"]=asm["__GLOBAL__sub_I_bindings_cpp"];var _malloc=Module["_malloc"]=asm["_malloc"];var _emscripten_replace_memory=Module["_emscripten_replace_memory"]=asm["_emscripten_replace_memory"];var dynCall_viiiii=Module["dynCall_viiiii"]=asm["dynCall_viiiii"];var dynCall_vid=Module["dynCall_vid"]=asm["dynCall_vid"];var dynCall_vi=Module["dynCall_vi"]=asm["dynCall_vi"];var dynCall_vii=Module["dynCall_vii"]=asm["dynCall_vii"];var dynCall_iiiiiii=Module["dynCall_iiiiiii"]=asm["dynCall_iiiiiii"];var dynCall_ii=Module["dynCall_ii"]=asm["dynCall_ii"];var dynCall_iiiidii=Module["dynCall_iiiidii"]=asm["dynCall_iiiidii"];var dynCall_iiii=Module["dynCall_iiii"]=asm["dynCall_iiii"];var dynCall_viiiiidi=Module["dynCall_viiiiidi"]=asm["dynCall_viiiiidi"];var dynCall_viiiiiiii=Module["dynCall_viiiiiiii"]=asm["dynCall_viiiiiiii"];var dynCall_viiiiii=Module["dynCall_viiiiii"]=asm["dynCall_viiiiii"];var dynCall_iiid=Module["dynCall_iiid"]=asm["dynCall_iiid"];var dynCall_di=Module["dynCall_di"]=asm["dynCall_di"];var dynCall_vidddd=Module["dynCall_vidddd"]=asm["dynCall_vidddd"];var dynCall_iid=Module["dynCall_iid"]=asm["dynCall_iid"];var dynCall_viiiiiii=Module["dynCall_viiiiiii"]=asm["dynCall_viiiiiii"];var dynCall_viiiiiiiiii=Module["dynCall_viiiiiiiiii"]=asm["dynCall_viiiiiiiiii"];var dynCall_iii=Module["dynCall_iii"]=asm["dynCall_iii"];var dynCall_viidii=Module["dynCall_viidii"]=asm["dynCall_viidii"];var dynCall_dii=Module["dynCall_dii"]=asm["dynCall_dii"];var dynCall_i=Module["dynCall_i"]=asm["dynCall_i"];var dynCall_iiiii=Module["dynCall_iiiii"]=asm["dynCall_iiiii"];var dynCall_viii=Module["dynCall_viii"]=asm["dynCall_viii"];var dynCall_v=Module["dynCall_v"]=asm["dynCall_v"];var dynCall_viid=Module["dynCall_viid"]=asm["dynCall_viid"];var dynCall_iiiid=Module["dynCall_iiiid"]=asm["dynCall_iiiid"];var dynCall_viiii=Module["dynCall_viiii"]=asm["dynCall_viiii"];Runtime.stackAlloc=asm["stackAlloc"];Runtime.stackSave=asm["stackSave"];Runtime.stackRestore=asm["stackRestore"];Runtime.establishStackSpace=asm["establishStackSpace"];Runtime.setTempRet0=asm["setTempRet0"];Runtime.getTempRet0=asm["getTempRet0"];function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status;}ExitStatus.prototype=new Error();ExitStatus.prototype.constructor=ExitStatus;var initialStackTop;var preloadStartTime=null;var calledMain=false;dependenciesFulfilled=function runCaller(){if(!Module["calledRun"])run();if(!Module["calledRun"])dependenciesFulfilled=runCaller;};Module["callMain"]=Module.callMain=function callMain(args){args=args||[];ensureInitRuntime();var argc=args.length+1;function pad(){for(var i=0;i<4-1;i++){argv.push(0);}}var argv=[allocate(intArrayFromString(Module["thisProgram"]),"i8",ALLOC_NORMAL)];pad();for(var i=0;i<argc-1;i=i+1){argv.push(allocate(intArrayFromString(args[i]),"i8",ALLOC_NORMAL));pad();}argv.push(0);argv=allocate(argv,"i32",ALLOC_NORMAL);try{var ret=Module["_main"](argc,argv,0);exit(ret,true);}catch(e){if(e instanceof ExitStatus){return;}else if(e=="SimulateInfiniteLoop"){Module["noExitRuntime"]=true;return;}else{if(e&&typeof e==="object"&&e.stack)Module.printErr("exception thrown: "+[e,e.stack]);throw e;}}finally{calledMain=true;}};function run(args){args=args||Module["arguments"];if(preloadStartTime===null)preloadStartTime=Date.now();if(runDependencies>0){return;}preRun();if(runDependencies>0)return;if(Module["calledRun"])return;function doRun(){if(Module["calledRun"])return;Module["calledRun"]=true;if(ABORT)return;ensureInitRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(Module["_main"]&&shouldRunNow)Module["callMain"](args);postRun();}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("");},1);doRun();},1);}else{doRun();}}Module["run"]=Module.run=run;function exit(status,implicit){if(implicit&&Module["noExitRuntime"]){return;}if(Module["noExitRuntime"]){}else{ABORT=true;EXITSTATUS=status;STACKTOP=initialStackTop;exitRuntime();if(Module["onExit"])Module["onExit"](status);}if(ENVIRONMENT_IS_NODE){process["exit"](status);}else if(ENVIRONMENT_IS_SHELL&&typeof quit==="function"){quit(status);}throw new ExitStatus(status);}Module["exit"]=Module.exit=exit;var abortDecorators=[];function abort(what){if(what!==undefined){Module.print(what);Module.printErr(what);what=JSON.stringify(what);}else{what="";}ABORT=true;EXITSTATUS=1;var extra="\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";var output="abort("+what+") at "+stackTrace()+extra;if(abortDecorators){abortDecorators.forEach(function(decorator){output=decorator(output,what);});}throw output;}Module["abort"]=Module.abort=abort;if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()();}}var shouldRunNow=true;if(Module["noInitialRun"]){shouldRunNow=false;}run();return Module;};module.exports={createModule:function(){return Module(null);}};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)(module)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

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
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 3 */
/***/ (function(module, exports) {

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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	/* (ignored) */

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 8 */
/***/ (function(module, exports) {

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


/***/ }),
/* 9 */
/***/ (function(module, exports) {

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


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	/* (ignored) */

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 15 */
/***/ (function(module, exports) {

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


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ }),
/* 19 */
/***/ (function(module, exports) {

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


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	
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


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	var pbkdf2Export = __webpack_require__(27)

	module.exports = function (crypto, exports) {
	  exports = exports || {}

	  var exported = pbkdf2Export(crypto)

	  exports.pbkdf2 = exported.pbkdf2
	  exports.pbkdf2Sync = exported.pbkdf2Sync

	  return exports
	}


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = function (crypto, exports) {
	  exports = exports || {};
	  var ciphers = __webpack_require__(29)(crypto);
	  exports.createCipher = ciphers.createCipher;
	  exports.createCipheriv = ciphers.createCipheriv;
	  var deciphers = __webpack_require__(64)(crypto);
	  exports.createDecipher = deciphers.createDecipher;
	  exports.createDecipheriv = deciphers.createDecipheriv;
	  var modes = __webpack_require__(55);
	  function listCiphers () {
	    return Object.keys(modes);
	  }
	  exports.listCiphers = listCiphers;
	};



/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var aes = __webpack_require__(30);
	var Transform = __webpack_require__(31);
	var inherits = __webpack_require__(34);
	var modes = __webpack_require__(55);
	var ebtk = __webpack_require__(56);
	var StreamCipher = __webpack_require__(57);
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
	  ECB: __webpack_require__(58),
	  CBC: __webpack_require__(59),
	  CFB: __webpack_require__(61),
	  OFB: __webpack_require__(62),
	  CTR: __webpack_require__(63)
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

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

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
	Stream.Writable = __webpack_require__(51);
	Stream.Duplex = __webpack_require__(52);
	Stream.Transform = __webpack_require__(53);
	Stream.PassThrough = __webpack_require__(54);

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


/***/ }),
/* 33 */
/***/ (function(module, exports) {

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


/***/ }),
/* 34 */
/***/ (function(module, exports) {

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


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(36);
	exports.Stream = exports;
	exports.Readable = exports;
	exports.Writable = __webpack_require__(44);
	exports.Duplex = __webpack_require__(43);
	exports.Transform = __webpack_require__(49);
	exports.PassThrough = __webpack_require__(50);


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

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
	var Stream = __webpack_require__(38);
	/*</replacement>*/

	var Buffer = __webpack_require__(7).Buffer;
	/*<replacement>*/
	var bufferShim = __webpack_require__(39);
	/*</replacement>*/

	/*<replacement>*/
	var util = __webpack_require__(40);
	util.inherits = __webpack_require__(34);
	/*</replacement>*/

	/*<replacement>*/
	var debugUtil = __webpack_require__(41);
	var debug = void 0;
	if (debugUtil && debugUtil.debuglog) {
	  debug = debugUtil.debuglog('stream');
	} else {
	  debug = function () {};
	}
	/*</replacement>*/

	var BufferList = __webpack_require__(42);
	var StringDecoder;

	util.inherits(Readable, Stream);

	var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

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
	  Duplex = Duplex || __webpack_require__(43);

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
	    if (!StringDecoder) StringDecoder = __webpack_require__(48).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}

	function Readable(options) {
	  Duplex = Duplex || __webpack_require__(43);

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
	  if (!StringDecoder) StringDecoder = __webpack_require__(48).StringDecoder;
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
	  for (var n = 0; n < kProxyEvents.length; n++) {
	    stream.on(kProxyEvents[n], self.emit.bind(self, kProxyEvents[n]));
	  }

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

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(33).EventEmitter;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 41 */
/***/ (function(module, exports) {

	/* (ignored) */

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Buffer = __webpack_require__(7).Buffer;
	/*<replacement>*/
	var bufferShim = __webpack_require__(39);
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

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

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
	var util = __webpack_require__(40);
	util.inherits = __webpack_require__(34);
	/*</replacement>*/

	var Readable = __webpack_require__(36);
	var Writable = __webpack_require__(44);

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

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

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
	var util = __webpack_require__(40);
	util.inherits = __webpack_require__(34);
	/*</replacement>*/

	/*<replacement>*/
	var internalUtil = {
	  deprecate: __webpack_require__(47)
	};
	/*</replacement>*/

	/*<replacement>*/
	var Stream = __webpack_require__(38);
	/*</replacement>*/

	var Buffer = __webpack_require__(7).Buffer;
	/*<replacement>*/
	var bufferShim = __webpack_require__(39);
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
	  Duplex = Duplex || __webpack_require__(43);

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
	  Duplex = Duplex || __webpack_require__(43);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(45).setImmediate))

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

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
	__webpack_require__(46);
	exports.setImmediate = setImmediate;
	exports.clearImmediate = clearImmediate;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 47 */
/***/ (function(module, exports) {

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

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Buffer = __webpack_require__(7).Buffer;
	var bufferShim = __webpack_require__(39);

	var isEncoding = Buffer.isEncoding || function (encoding) {
	  encoding = '' + encoding;
	  switch (encoding && encoding.toLowerCase()) {
	    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
	      return true;
	    default:
	      return false;
	  }
	};

	function _normalizeEncoding(enc) {
	  if (!enc) return 'utf8';
	  var retried;
	  while (true) {
	    switch (enc) {
	      case 'utf8':
	      case 'utf-8':
	        return 'utf8';
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return 'utf16le';
	      case 'latin1':
	      case 'binary':
	        return 'latin1';
	      case 'base64':
	      case 'ascii':
	      case 'hex':
	        return enc;
	      default:
	        if (retried) return; // undefined
	        enc = ('' + enc).toLowerCase();
	        retried = true;
	    }
	  }
	};

	// Do not cache `Buffer.isEncoding` when checking encoding names as some
	// modules monkey-patch it to support additional encodings
	function normalizeEncoding(enc) {
	  var nenc = _normalizeEncoding(enc);
	  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
	  return nenc || enc;
	}

	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters.
	exports.StringDecoder = StringDecoder;
	function StringDecoder(encoding) {
	  this.encoding = normalizeEncoding(encoding);
	  var nb;
	  switch (this.encoding) {
	    case 'utf16le':
	      this.text = utf16Text;
	      this.end = utf16End;
	      nb = 4;
	      break;
	    case 'utf8':
	      this.fillLast = utf8FillLast;
	      nb = 4;
	      break;
	    case 'base64':
	      this.text = base64Text;
	      this.end = base64End;
	      nb = 3;
	      break;
	    default:
	      this.write = simpleWrite;
	      this.end = simpleEnd;
	      return;
	  }
	  this.lastNeed = 0;
	  this.lastTotal = 0;
	  this.lastChar = bufferShim.allocUnsafe(nb);
	}

	StringDecoder.prototype.write = function (buf) {
	  if (buf.length === 0) return '';
	  var r;
	  var i;
	  if (this.lastNeed) {
	    r = this.fillLast(buf);
	    if (r === undefined) return '';
	    i = this.lastNeed;
	    this.lastNeed = 0;
	  } else {
	    i = 0;
	  }
	  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
	  return r || '';
	};

	StringDecoder.prototype.end = utf8End;

	// Returns only complete characters in a Buffer
	StringDecoder.prototype.text = utf8Text;

	// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
	StringDecoder.prototype.fillLast = function (buf) {
	  if (this.lastNeed <= buf.length) {
	    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
	    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
	  }
	  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
	  this.lastNeed -= buf.length;
	};

	// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
	// continuation byte.
	function utf8CheckByte(byte) {
	  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
	  return -1;
	}

	// Checks at most 3 bytes at the end of a Buffer in order to detect an
	// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
	// needed to complete the UTF-8 character (if applicable) are returned.
	function utf8CheckIncomplete(self, buf, i) {
	  var j = buf.length - 1;
	  if (j < i) return 0;
	  var nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) self.lastNeed = nb - 1;
	    return nb;
	  }
	  if (--j < i) return 0;
	  nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) self.lastNeed = nb - 2;
	    return nb;
	  }
	  if (--j < i) return 0;
	  nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) {
	      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
	    }
	    return nb;
	  }
	  return 0;
	}

	// Validates as many continuation bytes for a multi-byte UTF-8 character as
	// needed or are available. If we see a non-continuation byte where we expect
	// one, we "replace" the validated continuation bytes we've seen so far with
	// UTF-8 replacement characters ('\ufffd'), to match v8's UTF-8 decoding
	// behavior. The continuation byte check is included three times in the case
	// where all of the continuation bytes for a character exist in the same buffer.
	// It is also done this way as a slight performance increase instead of using a
	// loop.
	function utf8CheckExtraBytes(self, buf, p) {
	  if ((buf[0] & 0xC0) !== 0x80) {
	    self.lastNeed = 0;
	    return '\ufffd'.repeat(p);
	  }
	  if (self.lastNeed > 1 && buf.length > 1) {
	    if ((buf[1] & 0xC0) !== 0x80) {
	      self.lastNeed = 1;
	      return '\ufffd'.repeat(p + 1);
	    }
	    if (self.lastNeed > 2 && buf.length > 2) {
	      if ((buf[2] & 0xC0) !== 0x80) {
	        self.lastNeed = 2;
	        return '\ufffd'.repeat(p + 2);
	      }
	    }
	  }
	}

	// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
	function utf8FillLast(buf) {
	  var p = this.lastTotal - this.lastNeed;
	  var r = utf8CheckExtraBytes(this, buf, p);
	  if (r !== undefined) return r;
	  if (this.lastNeed <= buf.length) {
	    buf.copy(this.lastChar, p, 0, this.lastNeed);
	    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
	  }
	  buf.copy(this.lastChar, p, 0, buf.length);
	  this.lastNeed -= buf.length;
	}

	// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
	// partial character, the character's bytes are buffered until the required
	// number of bytes are available.
	function utf8Text(buf, i) {
	  var total = utf8CheckIncomplete(this, buf, i);
	  if (!this.lastNeed) return buf.toString('utf8', i);
	  this.lastTotal = total;
	  var end = buf.length - (total - this.lastNeed);
	  buf.copy(this.lastChar, 0, end);
	  return buf.toString('utf8', i, end);
	}

	// For UTF-8, a replacement character for each buffered byte of a (partial)
	// character needs to be added to the output.
	function utf8End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) return r + '\ufffd'.repeat(this.lastTotal - this.lastNeed);
	  return r;
	}

	// UTF-16LE typically needs two bytes per character, but even if we have an even
	// number of bytes available, we need to check if we end on a leading/high
	// surrogate. In that case, we need to wait for the next two bytes in order to
	// decode the last character properly.
	function utf16Text(buf, i) {
	  if ((buf.length - i) % 2 === 0) {
	    var r = buf.toString('utf16le', i);
	    if (r) {
	      var c = r.charCodeAt(r.length - 1);
	      if (c >= 0xD800 && c <= 0xDBFF) {
	        this.lastNeed = 2;
	        this.lastTotal = 4;
	        this.lastChar[0] = buf[buf.length - 2];
	        this.lastChar[1] = buf[buf.length - 1];
	        return r.slice(0, -1);
	      }
	    }
	    return r;
	  }
	  this.lastNeed = 1;
	  this.lastTotal = 2;
	  this.lastChar[0] = buf[buf.length - 1];
	  return buf.toString('utf16le', i, buf.length - 1);
	}

	// For UTF-16LE we do not explicitly append special replacement characters if we
	// end on a partial character, we simply let v8 handle that.
	function utf16End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) {
	    var end = this.lastTotal - this.lastNeed;
	    return r + this.lastChar.toString('utf16le', 0, end);
	  }
	  return r;
	}

	function base64Text(buf, i) {
	  var n = (buf.length - i) % 3;
	  if (n === 0) return buf.toString('base64', i);
	  this.lastNeed = 3 - n;
	  this.lastTotal = 3;
	  if (n === 1) {
	    this.lastChar[0] = buf[buf.length - 1];
	  } else {
	    this.lastChar[0] = buf[buf.length - 2];
	    this.lastChar[1] = buf[buf.length - 1];
	  }
	  return buf.toString('base64', i, buf.length - n);
	}

	function base64End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
	  return r;
	}

	// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
	function simpleWrite(buf) {
	  return buf.toString(this.encoding);
	}

	function simpleEnd(buf) {
	  return buf && buf.length ? this.write(buf) : '';
	}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

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

	var Duplex = __webpack_require__(43);

	/*<replacement>*/
	var util = __webpack_require__(40);
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

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	// a passthrough stream.
	// basically just the most minimal sort of Transform stream.
	// Every written chunk gets output as-is.

	'use strict';

	module.exports = PassThrough;

	var Transform = __webpack_require__(49);

	/*<replacement>*/
	var util = __webpack_require__(40);
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

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(44);


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(43);


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(35).Transform


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(35).PassThrough


/***/ }),
/* 55 */
/***/ (function(module, exports) {

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

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 58 */
/***/ (function(module, exports) {

	exports.encrypt = function (self, block) {
	  return self._cipher.encryptBlock(block);
	};
	exports.decrypt = function (self, block) {
	  return self._cipher.decryptBlock(block);
	};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	var xor = __webpack_require__(60);
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

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var xor = __webpack_require__(60);
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

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var xor = __webpack_require__(60);
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

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var xor = __webpack_require__(60);
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

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var aes = __webpack_require__(30);
	var Transform = __webpack_require__(31);
	var inherits = __webpack_require__(34);
	var modes = __webpack_require__(55);
	var StreamCipher = __webpack_require__(57);
	var ebtk = __webpack_require__(56);

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
	  ECB: __webpack_require__(58),
	  CBC: __webpack_require__(59),
	  CFB: __webpack_require__(61),
	  OFB: __webpack_require__(62),
	  CTR: __webpack_require__(63)
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

/***/ })
/******/ ]);