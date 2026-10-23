"use strict";var s=function(e,r){return function(){try{return r||e((r={exports:{}}).exports,r),r.exports}catch(a){throw (r=0, a)}};};var t=s(function(w,n){
var f=require('@stdlib/stats-strided-dvariancech/dist').ndarray,h=require('@stdlib/math-base-special-sqrt/dist');function p(e,r,a,i,y){return h(f(e,r,a,i,y)/e)}n.exports=p
});var q=s(function(z,v){
var x=require('@stdlib/strided-base-stride2offset/dist'),j=t();function l(e,r,a,i){return j(e,r,a,i,x(e,i))}v.exports=l
});var o=s(function(A,d){
var R=require('@stdlib/utils-define-nonenumerable-read-only-property/dist'),c=q(),_=t();R(c,"ndarray",_);d.exports=c
});var E=require("path").join,O=require('@stdlib/utils-try-require/dist'),b=require('@stdlib/assert-is-error/dist'),g=o(),u,m=O(E(__dirname,"./native.js"));b(m)?u=g:u=m;module.exports=u;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
