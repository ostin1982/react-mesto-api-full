(this["webpackJsonpmesto-react"]=this["webpackJsonpmesto-react"]||[]).push([[0],{19:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n(1),o=n.n(c),s=n(21),i=n.n(s),r=n(9),l=(n(19),n(2)),u=n(25),d=n(4),p=n(3),j=n.p+"static/media/logo.8724261e.svg",b=function(e){var t=e.email,n=e.loggedOut;return Object(a.jsxs)("header",{className:"header",children:[Object(a.jsx)("img",{className:"header__logo",src:j,alt:"\u041b\u043e\u0433\u043e\u0442\u0438\u043f \u043f\u0440\u043e\u0435\u043a\u0442\u0430. Mesto Russian"}),Object(a.jsxs)("nav",{className:"header__info",children:[Object(a.jsx)(p.b,{path:"/sign-up",children:Object(a.jsx)(r.b,{className:"header__link",to:"/sign-in",children:"\u0412\u043e\u0439\u0442\u0438"})}),Object(a.jsx)(p.b,{path:"/sign-in",children:Object(a.jsx)(r.b,{className:"header__link",to:"/sign-up",children:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"})}),Object(a.jsx)(p.b,{exact:!0,path:"/",children:Object(a.jsxs)("div",{className:"header__info",children:[Object(a.jsx)("p",{className:"header__link header__link_nothover",children:t}),Object(a.jsx)(r.b,{className:"header__link header__link_weight",onClick:n,to:"/sign-in",children:"\u0412\u044b\u0439\u0442\u0438"})]})})]})]})},h=o.a.createContext();var m=function(e){var t=e.card,n=e.onCardClick,o=e.onCardLike,s=e.onCardDelete,i=Object(c.useContext)(h),r=t.owner._id!==i._id,l="element__basket ".concat(r?"element__basket_active":"element__basket_inactive"),u=t.likes.some((function(e){return e._id===i._id})),d="element__like ".concat(u?"element__like_active":"");return Object(a.jsx)("li",{className:"element",children:Object(a.jsxs)("article",{className:"element__card",children:[Object(a.jsx)("img",{className:"element__img",src:t.link,alt:t.title,onClick:function(){n(t)}}),Object(a.jsx)("button",{type:"button",className:l,onClick:function(){s(t)}}),Object(a.jsxs)("div",{className:"element__info",children:[Object(a.jsx)("h2",{className:"element__name",children:t.name}),Object(a.jsxs)("div",{className:"element__like-conteiner",children:[Object(a.jsx)("button",{type:"button","aria-label":"\u041d\u0440\u0430\u0432\u0438\u0442\u0441\u044f",className:d,onClick:function(){o(t)}}),Object(a.jsx)("span",{className:"element__like-number",children:t.likes.length})]})]})]})})};var _=function(e){var t=e.cards,n=e.onEditAvatar,o=e.onEditProfile,s=e.onAddPlace,i=e.onCardClick,r=e.onCardLike,l=e.onCardDelete,u=Object(c.useContext)(h);return Object(a.jsxs)("main",{className:"content",children:[Object(a.jsxs)("section",{className:"profile",children:[Object(a.jsx)("div",{className:"profile__avatar",onClick:n,children:Object(a.jsx)("img",{className:"profile__avatar-img",alt:"\u0410\u0432\u0430\u0442\u0430\u0440",src:u.avatar})}),Object(a.jsxs)("div",{className:"profile__info",children:[Object(a.jsxs)("div",{className:"profile__edit",children:[Object(a.jsx)("h1",{className:"profile__name",children:u.name}),Object(a.jsx)("button",{className:"profile__edit-button",type:"button","aria-label":"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c",onClick:o})]}),Object(a.jsx)("p",{className:"profile__occupation",children:u.about})]}),Object(a.jsx)("button",{className:"profile__add-button",type:"button","aria-label":"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c",onClick:s})]}),Object(a.jsx)("section",{className:"element",children:Object(a.jsx)("ul",{className:"elements",children:t.map((function(e){return Object(a.jsx)(m,{card:e,onCardClick:i,onCardLike:r,onCardDelete:l},e._id)}))})})]})};var O=function(){return Object(a.jsx)("footer",{className:"footer",children:Object(a.jsx)("p",{className:"footer__copyright",children:"\xa9 2021 Mesto Russia"})})};var f=function(e){var t=e.card,n=e.onClose;return Object(a.jsx)("div",{className:"popup popup__photo-big-card ".concat(t&&"popup_is-open"),children:Object(a.jsxs)("div",{className:"popup__photo-element",children:[Object(a.jsx)("img",{className:"popup__photo-big",src:null===t||void 0===t?void 0:t.link,alt:null===t||void 0===t?void 0:t.name}),Object(a.jsx)("button",{className:"popup__close popup__photo-close",type:"button","aria-label":"\u0417\u0430\u043a\u0440\u044b\u0442\u044c",onClick:n}),Object(a.jsx)("p",{className:"popup__photo-edit",children:null===t||void 0===t?void 0:t.name})]})})};var g=function(e){var t=e.name,n=e.title,c=e.button,o=e.children,s=e.isOpen,i=e.onClose,r=e.onSubmit;return Object(a.jsx)("div",{className:s?"popup popup__input_".concat(t," popup_is-open"):"popup popup__input_".concat(t),children:Object(a.jsxs)("div",{className:"popup__container",children:[Object(a.jsx)("h2",{className:"popup__edit",children:n}),Object(a.jsxs)("form",{className:"popup__input popup__input_".concat(t," form"),method:"POST",name:"".concat(t),onSubmit:r,noValidate:!0,children:[Object(a.jsx)("div",{children:o}),Object(a.jsx)("input",{className:"popup__submit",type:"submit",value:c})]}),Object(a.jsx)("button",{className:"popup__close",type:"button",onClick:i})]})})};var x=function(e){var t=e.onUpdateUser,n=e.isOpen,o=e.onClose,s=Object(c.useContext)(h),i=Object(c.useState)(""),r=Object(d.a)(i,2),l=r[0],u=r[1],p=Object(c.useState)(""),j=Object(d.a)(p,2),b=j[0],m=j[1];return Object(c.useEffect)((function(){u(s.name||""),m(s.about||"")}),[s,n]),Object(a.jsx)(g,{title:"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u0440\u043e\u0444\u0438\u043b\u044c",name:"edit",button:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c",isOpen:n,onClose:o,onSubmit:function(e){e.preventDefault(),t({name:l,about:b})},children:Object(a.jsxs)("section",{children:[Object(a.jsx)("input",{className:"popup__about popup__about_grey-line popup__about_name",name:"name",type:"text",value:l,onChange:function(e){u(e.target.value)},required:!0,placeholder:"\u0418\u043c\u044f",id:"sign-in-name",minLength:2,maxLength:40,autoComplete:"off"}),Object(a.jsx)("span",{className:"",id:"sign-in-name-error"}),Object(a.jsx)("input",{className:"popup__about popup__about_grey-line popup__about_occupation_name",name:"description",type:"text",value:b,onChange:function(e){m(e.target.value)},required:!0,placeholder:"\u041e \u0441\u0435\u0431\u0435",id:"sign-in-occupation",minLength:2,maxLength:200,autoComplete:"off"}),Object(a.jsx)("span",{className:"",id:"sign-in-occupation-error"})]})})};var v=function(e){var t=e.onUpdateAvatar,n=e.isOpen,o=e.onClose,s=Object(c.useRef)();return Object(a.jsx)(g,{title:"\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c \u0430\u0432\u0430\u0442\u0430\u0440",name:"avatar",button:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c",isOpen:n,onClose:o,onSubmit:function(e){e.preventDefault(),t(s.current.value)},children:Object(a.jsxs)("section",{children:[Object(a.jsx)("input",{ref:s,className:"popup__about popup__about_grey-line popup__about_new-avatar",id:"sign-in-photo-card-occupation",type:"url",placeholder:"\u0421\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u0443",name:"avatar",required:!0,autoComplete:"off"}),Object(a.jsx)("span",{className:"",id:"sign-in-photo-card-occupation-error"})]})})};var C=function(e){var t=e.onAddPlace,n=e.isOpen,o=e.onClose,s=Object(c.useRef)(),i=Object(c.useRef)();return Object(a.jsx)(g,{name:"add",title:"\u041d\u043e\u0432\u043e\u0435 \u043c\u0435\u0441\u0442\u043e",button:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c",isOpen:n,onClose:o,onSubmit:function(e){e.preventDefault(),t({name:s.current.value,link:i.current.value})},children:Object(a.jsxs)("section",{children:[Object(a.jsx)("input",{ref:s,className:"popup__about popup__about_grey-line popup__about_photo-card",id:"sign-in-photo-card-name",type:"text",placeholder:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435",name:"name",required:!0,minLength:2,maxLength:30,autoComplete:"off"}),Object(a.jsx)("span",{className:"",id:"sign-in-photo-card-name-error"}),Object(a.jsx)("input",{ref:i,className:"popup__about popup__about_grey-line popup__about_occupation_photo-card",id:"sign-in-photo-card-occupation",type:"url",placeholder:"\u0421\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u0443",name:"link",required:!0,autoComplete:"off"}),Object(a.jsx)("span",{className:"",id:"sign-in-photo-card-occupation-error"})]})})};var N=function(e){var t=e.onDeleteCard,n=e.isOpen,c=e.onClose,o=e.card;return Object(a.jsx)(g,{title:"\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b?",name:"delete",button:"\u0414\u0430",isOpen:n,onClose:c,onSubmit:function(e){e.preventDefault(),t(o)}})},k=n(11),y=function(e){var t=e.handleRegister,n=Object(c.useState)({email:"",password:""}),o=Object(d.a)(n,2),s=o[0],i=o[1],u=function(e){var t=e.target,n=t.name,a=t.value;i(Object(l.a)(Object(l.a)({},s),{},Object(k.a)({},n,a)))};return Object(a.jsxs)("form",{className:"register",onSubmit:function(e){e.preventDefault(),t(s)},children:[Object(a.jsx)("h2",{className:"register__title",children:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"}),Object(a.jsx)("input",{className:"register__input",name:"email",type:"email",placeholder:"Email",minLength:"6",maxLength:"20",required:!0,value:s.email,onChange:u}),Object(a.jsx)("input",{className:"register__input",name:"password",type:"password",placeholder:"\u041f\u0430\u0440\u043e\u043b\u044c",minLength:"6",maxLength:"20",required:!0,value:s.password,onChange:u}),Object(a.jsx)("button",{className:"register__submit",type:"submit",children:"\u0417\u0430\u0440\u0435\u0433\u0435\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f"}),Object(a.jsxs)("p",{className:"register__link",children:["\u0423\u0436\u0435 \u0437\u0430\u0440\u0435\u0433\u0435\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u044b? ",Object(a.jsx)(r.b,{className:"register__link register__link_hover",to:"/sign-in",children:"\u0412\u043e\u0439\u0442\u0438"})]})]})},S=function(e){var t=e.handleLogin,n=Object(c.useState)({password:"",email:""}),o=Object(d.a)(n,2),s=o[0],i=o[1],r=function(e){var t=e.target,n=t.name,a=t.value;i(Object(l.a)(Object(l.a)({},s),{},Object(k.a)({},n,a)))};return Object(a.jsxs)("form",{className:"register",onSubmit:function(e){e.preventDefault(),t(s)},children:[Object(a.jsx)("h2",{className:"register__title",children:"\u0412\u0445\u043e\u0434"}),Object(a.jsx)("input",{className:"register__input",id:"email",name:"email",type:"text",placeholder:"Email",minLength:"6",required:!0,value:s.email,onChange:r}),Object(a.jsx)("input",{className:"register__input",id:"password",name:"password",type:"password",placeholder:"\u041f\u0430\u0440\u043e\u043b\u044c",minLength:"6",value:s.password,required:!0,onChange:r}),Object(a.jsx)("button",{className:"register__submit",type:"submit",children:"\u0412\u043e\u0439\u0442\u0438"})]})},A=n(26),w=function(e){var t=e.component,n=Object(A.a)(e,["component"]);return Object(a.jsx)(p.b,{children:function(){return n.loggedIn?Object(a.jsx)(t,Object(l.a)({},n)):Object(a.jsx)(p.a,{to:"/sign-in"})}})},L=n.p+"static/media/check_mark.1b6082f8.svg",I=n.p+"static/media/cross.df8eddf6.svg",U=function(e){var t=e.isOpen,n=e.onClose,c=e.isInfoTooltipStatus;return Object(a.jsx)("div",{className:"popup ".concat(t?"popup_is-open":" "),children:Object(a.jsxs)("div",{className:"popup__check",children:[Object(a.jsx)("img",{className:"popup__check-cross",src:c?L:I,alt:"\u0421\u0442\u0430\u0442\u0443\u0441 \u043f\u0440\u043e\u0432\u0435\u0434\u0435\u043d\u043d\u043e\u0439 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438"}),Object(a.jsx)("h2",{className:"popup__check-about",children:c?"\u0412\u044b \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043b\u0438\u0441\u044c!":"\u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a! \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437."}),Object(a.jsx)("button",{className:"popup__close",type:"reset",onClick:n})]})})},E="https://api.ostin.student.nomoredomains.club",F=function(e){return e.ok?e.json():Promise.reject("Error ".concat(e.statusText))},P=n(23),T=n(24),D=new(function(){function e(t){var n=t.baseUrl,a=t.headers;Object(P.a)(this,e),this._baseUrl=n,this._headers=a}return Object(T.a)(e,[{key:"_addCommonFetchForAllApis",value:function(e){return e.ok?e.json():Promise.reject("\u041e\u0448\u0438\u0431\u043a\u0430:".concat(e.status))}},{key:"getInitialCards",value:function(){return fetch("".concat(this._baseUrl,"/cards"),{headers:Object(l.a)(Object(l.a)({},this._headers),{},{authorization:"Bearer ".concat(localStorage.getItem("jwt"))})}).then(this._addCommonFetchForAllApis)}},{key:"addNewCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:Object(l.a)(Object(l.a)({},this._headers),{},{authorization:"Bearer ".concat(localStorage.getItem("jwt"))}),body:JSON.stringify({name:e.name,link:e.link})}).then(this._addCommonFetchForAllApis)}},{key:"deleteCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e._id),{method:"DELETE",headers:Object(l.a)(Object(l.a)({},this._headers),{},{authorization:"Bearer ".concat(localStorage.getItem("jwt"))})}).then(this._addCommonFetchForAllApis)}},{key:"addLikeCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/likes/").concat(e._id),{method:"PUT",headers:Object(l.a)(Object(l.a)({},this._headers),{},{authorization:"Bearer ".concat(localStorage.getItem("jwt"))}),body:JSON.stringify()}).then(this._addCommonFetchForAllApis)}},{key:"deleteLikeCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/likes/").concat(e._id),{method:"DELETE",headers:Object(l.a)(Object(l.a)({},this._headers),{},{authorization:"Bearer ".concat(localStorage.getItem("jwt"))}),body:JSON.stringify()}).then(this._addCommonFetchForAllApis)}},{key:"changeLikeCardStatus",value:function(e,t){return t?this.deleteLikeCard(e):this.addLikeCard(e)}},{key:"getUserInfoAbout",value:function(){return fetch("".concat(this._baseUrl,"/users/me"),{headers:Object(l.a)(Object(l.a)({},this._headers),{},{authorization:"Bearer ".concat(localStorage.getItem("jwt"))})}).then(this._addCommonFetchForAllApis)}},{key:"changeInfo",value:function(e){return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:Object(l.a)(Object(l.a)({},this._headers),{},{authorization:"Bearer ".concat(localStorage.getItem("jwt"))}),body:JSON.stringify({name:e.name,about:e.about})}).then(this._addCommonFetchForAllApis)}},{key:"changeUserAvatar",value:function(e){return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:Object(l.a)(Object(l.a)({},this._headers),{},{authorization:"Bearer ".concat(localStorage.getItem("jwt"))}),body:JSON.stringify({avatar:e})}).then(this._addCommonFetchForAllApis)}}]),e}())({baseUrl:"https://api.ostin.student.nomoredomains.club","Content-Type":"application/json"}),B=function(){var e=Object(c.useState)({}),t=Object(d.a)(e,2),n=t[0],o=t[1],s=Object(c.useState)([]),i=Object(d.a)(s,2),r=i[0],j=i[1],m=Object(c.useState)(),g=Object(d.a)(m,2),k=g[0],A=g[1],L=Object(c.useState)({}),I=Object(d.a)(L,2),P=I[0],T=I[1],B=Object(c.useState)(!1),q=Object(d.a)(B,2),z=q[0],J=q[1],R=Object(c.useState)(!1),M=Object(d.a)(R,2),H=M[0],G=M[1],V=Object(c.useState)(!1),K=Object(d.a)(V,2),Q=K[0],W=K[1],X=Object(c.useState)(!1),Y=Object(d.a)(X,2),Z=Y[0],$=Y[1],ee=Object(c.useState)(""),te=Object(d.a)(ee,2),ne=te[0],ae=te[1],ce=Object(c.useState)(!1),oe=Object(d.a)(ce,2),se=oe[0],ie=oe[1],re=Object(c.useState)(!1),le=Object(d.a)(re,2),ue=le[0],de=le[1],pe=Object(c.useState)(!1),je=Object(d.a)(pe,2),be=je[0],he=je[1],me=Object(p.g)();Object(c.useEffect)((function(){D.getUserInfoAbout().then((function(e){o(e)}))}),[se]),Object(c.useEffect)((function(){D.getInitialCards().then((function(e){j(e)}))}),[se]),Object(c.useEffect)((function(){var e=localStorage.getItem("jwt");e&&_e(e)}),[]);var _e=function(e){var t;(t=e,fetch("".concat(E,"/users/me"),{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(t)}}).then(F)).then((function(t){if(t&&(ie(!0),D.getUserInfoAbout().then((function(e){o(e)})),me.push("/")),400===t.statusCode)throw new Error({message:"\u0422\u043e\u043a\u0435\u043d: ".concat(e," \u043d\u0435 \u043f\u0435\u0440\u0435\u0434\u0430\u043d \u0438\u043b\u0438 \u043f\u0435\u0440\u0435\u0434\u0430\u043d \u043d\u0435 \u0432 \u0442\u043e\u043c \u0444\u043e\u0440\u043c\u0430\u0442\u0435")});if(401===t.statusCode)throw new Error({message:"\u041f\u0435\u0440\u0435\u0434\u0430\u043d\u043d\u044b\u0439 \u0442\u043e\u043a\u0435\u043d: ".concat(e," \u043d\u0435\u043a\u043e\u0440\u0440\u0435\u043a\u0442\u0435\u043d")})}))},Oe=function(){J(!1),G(!1),W(!1),$(!1),A(),de(!1)};return Object(a.jsx)(h.Provider,{value:n,children:Object(a.jsx)("div",{className:"body",children:Object(a.jsxs)("div",{className:"page",children:[Object(a.jsx)(b,{email:ne,loggedOut:function(){ie(!1),ae(ne),localStorage.removeItem("token"),me.push("/sign-in")},loggedIn:se}),Object(a.jsxs)(p.d,{children:[Object(a.jsx)(w,{exact:!0,path:"/",loggedIn:se,component:_,cards:r,onEditProfile:function(){J(!0)},onAddPlace:function(){G(!0)},onEditAvatar:function(){W(!0)},onCardClick:function(e){A(e)},onCardLike:function(e){var t=e.likes.some((function(e){return e._id===n._id}));D.changeLikeCardStatus(e,t).then((function(t){var n=r.map((function(n){return n._id===e._id?t:n}));j(n)})).catch((function(e){return console.error(e)}))},onCardDelete:function(e){$(!0),T(e)},closeAllPopups:Oe}),Object(a.jsx)(p.b,{path:"/sign-in",children:Object(a.jsx)(S,{handleLogin:function(e,t){(function(e){var t=e.email,n=e.password;return fetch("".concat(E,"/signin"),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({email:t,password:n})}).then(F)})(e).then((function(t){t.token&&(localStorage.setItem("jwt",t.token),ie(!0),ae(e),me.push("/"))})).catch((function(){de(!0),he(!1)}))},setEmail:ae})}),Object(a.jsx)(p.b,{path:"/sign-up",children:Object(a.jsx)(y,{handleRegister:function(e,t){(function(e){var t=e.email,n=e.password;return fetch("".concat(E,"/signup"),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({email:t,password:n})}).then(F)})(e).then((function(e){e&&(de(!0),he(!0),me.push("/sign-in"))})).catch((function(){de(!0),he(!1),me.push("/sign-up")}))}})}),Object(a.jsx)(p.b,{children:se?Object(a.jsx)(p.a,{to:"/"}):Object(a.jsx)(p.a,{to:"/sign-in"})})]}),Object(a.jsx)(O,{}),Object(a.jsx)(x,{isOpen:z,onClose:Oe,onUpdateUser:function(e){D.changeInfo(e).then((function(e){o(e),Oe()})).catch((function(e){return console.error(e)}))}}),Object(a.jsx)(C,{isOpen:H,onClose:Oe,onAddPlace:function(e){D.addNewCard(e).then((function(e){j([e].concat(Object(u.a)(r))),Oe()})).catch((function(e){return console.error(e)}))}}),Object(a.jsx)(v,{isOpen:Q,onClose:Oe,onUpdateAvatar:function(e){D.changeUserAvatar(e).then((function(e){o(e),Oe()})).catch((function(e){return console.error(e)}))}}),Object(a.jsx)(N,{isOpen:Z,onClose:Oe,onDeleteCard:function(e){D.deleteCard(e).then((function(){var t=r.filter((function(t){return t._id!==e._id}));j(t),Oe()})).catch((function(e){return console.error(e)}))},card:P}),Object(a.jsx)(f,Object(l.a)({card:k,onClose:Oe},k)),Object(a.jsx)(U,{isOpen:ue,onClose:Oe,isInfoTooltipStatus:be})]})})})},q=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,38)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,o=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),o(e),s(e)}))};i.a.render(Object(a.jsx)(o.a.StrictMode,{children:Object(a.jsx)(r.a,{children:Object(a.jsx)(B,{})})}),document.getElementById("root")),q()}},[[37,1,2]]]);
//# sourceMappingURL=main.6926b806.chunk.js.map