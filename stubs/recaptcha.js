// Playwright network stub for Google reCAPTCHA resources
window.grecaptcha={
  _cbs:[],
  ready:function(cb){this._cbs.push(cb);cb();},
  execute:function(){return Promise.resolve('testtoken');},
  getResponse:function(){return 'testtoken';}
};
// signal script load for inline form JS
window.dispatchEvent(new Event('grecaptcha-loaded')); 