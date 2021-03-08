(function(e){function t(t){for(var n,r,l=t[0],o=t[1],c=t[2],u=0,v=[];u<l.length;u++)r=l[u],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&v.push(i[r][0]),i[r]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n]);d&&d(t);while(v.length)v.shift()();return s.push.apply(s,c||[]),a()}function a(){for(var e,t=0;t<s.length;t++){for(var a=s[t],n=!0,l=1;l<a.length;l++){var o=a[l];0!==i[o]&&(n=!1)}n&&(s.splice(t--,1),e=r(r.s=a[0]))}return e}var n={},i={index:0},s=[];function r(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=n,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(a,n,function(t){return e[t]}.bind(null,n));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],o=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var d=o;s.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[a("v-main",[a("v-container",[a("v-tabs",{on:{change:e.tabChange},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},e._l(e.items,(function(t){return a("v-tab",{key:t},[e._v(" "+e._s(t)+" ")])})),1),a("v-tabs-items",{model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[a("v-tab-item",[a("users")],1),a("v-tab-item",[a("pending")],1),a("v-tab-item",[a("sent")],1),a("v-tab-item",[a("received")],1)],1),a("snackbar")],1)],1)],1)},s=[],r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.users,expanded:e.expanded,"show-expand":""},on:{"update:expanded":function(t){e.expanded=t}},scopedSlots:e._u([{key:"top",fn:function(){return[a("v-toolbar",{attrs:{flat:""}},[a("v-spacer"),a("v-dialog",{attrs:{"max-width":"500px"},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on,i=t.attrs;return[a("v-btn",e._g(e._b({staticClass:"mb-2",attrs:{color:"primary",dark:""}},"v-btn",i,!1),n),[e._v(" New Item ")])]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[e._v(e._s(e.formTitle))])]),a("v-card-text",[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{label:"Email"},model:{value:e.editedItem.email,callback:function(t){e.$set(e.editedItem,"email",t)},expression:"editedItem.email"}})],1),a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{label:"Phone"},model:{value:e.editedItem.phone,callback:function(t){e.$set(e.editedItem,"phone",t)},expression:"editedItem.phone"}})],1),e.editedItem.api_key?a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{label:"API Key"},model:{value:e.editedItem.api_key,callback:function(t){e.$set(e.editedItem,"api_key",t)},expression:"editedItem.api_key"}})],1):e._e()],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.close}},[e._v(" Cancel ")]),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.save}},[e._v(" Save ")])],1)],1)],1),a("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialogDelete,callback:function(t){e.dialogDelete=t},expression:"dialogDelete"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[e._v("Are you sure you want to delete this item?")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.closeDelete}},[e._v("Cancel")]),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.deleteItemConfirm}},[e._v("OK")]),a("v-spacer")],1)],1)],1)],1)]},proxy:!0},{key:"item.actions",fn:function(t){var n=t.item;return[a("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(t){return e.editItem(n)}}},[e._v(" mdi-pencil ")]),a("v-icon",{attrs:{small:""},on:{click:function(t){return e.deleteItem(n)}}},[e._v(" mdi-delete ")])]}},{key:"expanded-item",fn:function(e){var t=e.headers,n=e.item;return[a("td",{attrs:{colspan:t.length}},[a("procedures",{attrs:{user:n}})],1)]}}])})},l=[],o=(a("a434"),a("bc3a")),c=a.n(o),d=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",[e.procedures.length?a("v-simple-table",{staticClass:"mb-3",scopedSlots:e._u([{key:"default",fn:function(){return[a("thead",[a("tr",[a("th",[e._v("Type")]),a("th",[e._v("Recipient")]),a("th",{attrs:{width:"1"}})])]),a("tbody",e._l(e.procedures,(function(t){return a("tr",{key:t.id},[a("td",[e._v(e._s(t.type))]),a("td",[e._v(e._s(t.recipient))]),a("td",[a("v-icon",{attrs:{small:""},on:{click:function(a){return e.deleteItem(t)}}},[e._v(" mdi-delete ")])],1)])})),0)]},proxy:!0}],null,!1,1505749256)}):e._e(),a("v-form",{ref:"form"},[a("v-row",[a("v-col",{attrs:{cols:"12",md:"6"}},[a("v-select",{attrs:{items:e.types,"item-value":"val","item-text":"text",label:"Type"},model:{value:e.type,callback:function(t){e.type=t},expression:"type"}})],1),a("v-col",{attrs:{cols:"12",md:"6"}},[a("v-text-field",{attrs:{label:"Recipient"},model:{value:e.recipient,callback:function(t){e.recipient=t},expression:"recipient"}})],1)],1),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.submit}},[e._v(" Save ")])],1),a("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialogDelete,callback:function(t){e.dialogDelete=t},expression:"dialogDelete"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[e._v("Are you sure you want to delete this item?")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.closeDelete}},[e._v("Cancel")]),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.deleteItemConfirm}},[e._v("OK")]),a("v-spacer")],1)],1)],1)],1)},u=[],v={props:["user"],data:function(){return{dialogDelete:!1,types:["sms","email"],type:null,recipient:null,procedures:[],editedIndex:-1,editedItem:{id:null,type:null,recipient:null},defaultItem:{id:null,type:null,recipient:null}}},watch:{dialogDelete:function(e){e||this.closeDelete()}},created:function(){this.getProcedures()},methods:{getProcedures:function(){var e=this;c.a.get("/user/procedure/list/".concat(this.user.id)).then((function(t){e.procedures=t.data})).catch(this.axiosError)},submit:function(){var e=this,t={type:this.type,recipient:this.recipient,user_id:this.user.id};c.a.post("/user/procedure/create",t).then((function(a){t.id=a.data.id,e.procedures.push(t),e.clear()})).catch(this.axiosError)},clear:function(){this.$refs.form.reset()},deleteItem:function(e){this.editedIndex=this.procedures.indexOf(e),this.editedItem=Object.assign({},e),this.dialogDelete=!0},deleteItemConfirm:function(){var e=this;c.a.get("/user/procedure/delete/".concat(this.editedItem.id)).then((function(){e.procedures.splice(e.editedIndex,1),e.closeDelete()})).catch(this.axiosError)},closeDelete:function(){var e=this;this.dialogDelete=!1,this.$nextTick((function(){e.editedItem=Object.assign({},e.defaultItem),e.editedIndex=-1}))}}},m=v,p=a("2877"),h=a("6544"),f=a.n(h),b=a("8336"),x=a("b0af"),g=a("99d9"),I=a("62ad"),k=a("a523"),_=a("169a"),y=a("4bd4"),D=a("132d"),V=a("0fd9"),C=a("b974"),O=a("1f4f"),w=a("2fa4"),$=a("8654"),T=Object(p["a"])(m,d,u,!1,null,null,null),j=T.exports;f()(T,{VBtn:b["a"],VCard:x["a"],VCardActions:g["a"],VCardTitle:g["c"],VCol:I["a"],VContainer:k["a"],VDialog:_["a"],VForm:y["a"],VIcon:D["a"],VRow:V["a"],VSelect:C["a"],VSimpleTable:O["a"],VSpacer:w["a"],VTextField:$["a"]});var S={components:{Procedures:j},data:function(){return{expanded:[],dialog:!1,dialogDelete:!1,headers:[{text:"ID",value:"id"},{text:"Email",value:"email"},{text:"Phone",value:"phone"},{text:"API Key",value:"api_key"},{text:"Actions",value:"actions",sortable:!1},{text:"",value:"data-table-expand"}],users:[],editedIndex:-1,editedItem:{id:null,email:null,phone:null,api_key:null},defaultItem:{id:null,email:null,phone:null,api_key:null}}},computed:{formTitle:function(){return-1===this.editedIndex?"New Item":"Edit Item"}},watch:{dialog:function(e){e||this.close()},dialogDelete:function(e){e||this.closeDelete()}},mounted:function(){this.getUsers(),this.$root.$on("update-users",this.getUsers)},methods:{getUsers:function(){var e=this;c.a.get("/user/list").then((function(t){e.users=t.data})).catch(this.axiosError)},editItem:function(e){this.editedIndex=this.users.indexOf(e),this.editedItem=Object.assign({},e),this.dialog=!0},deleteItem:function(e){this.editedIndex=this.users.indexOf(e),this.editedItem=Object.assign({},e),this.dialogDelete=!0},deleteItemConfirm:function(){var e=this;c.a.get("/user/delete/".concat(this.editedItem.id)).then((function(){e.users.splice(e.editedIndex,1),e.closeDelete()})).catch(this.axiosError)},close:function(){var e=this;this.dialog=!1,this.$nextTick((function(){e.editedItem=Object.assign({},e.defaultItem),e.editedIndex=-1}))},closeDelete:function(){var e=this;this.dialogDelete=!1,this.$nextTick((function(){e.editedItem=Object.assign({},e.defaultItem),e.editedIndex=-1}))},save:function(){var e=this;this.editedIndex>-1?c.a.post("/user/update",this.editedItem).then((function(){Object.assign(e.users[e.editedIndex],e.editedItem),e.close()})).catch(this.axiosError):c.a.post("/user/create",this.editedItem).then((function(t){e.editedItem.id=t.data.id,e.editedItem.api_key=t.data.api_key,e.users.unshift(e.editedItem),e.close()})).catch(this.axiosError)}}},E=S,M=a("8fea"),P=a("71d9"),A=Object(p["a"])(E,r,l,!1,null,null,null),R=A.exports;f()(A,{VBtn:b["a"],VCard:x["a"],VCardActions:g["a"],VCardText:g["b"],VCardTitle:g["c"],VCol:I["a"],VContainer:k["a"],VDataTable:M["a"],VDialog:_["a"],VIcon:D["a"],VRow:V["a"],VSpacer:w["a"],VTextField:$["a"],VToolbar:P["a"]});var K=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.messages},scopedSlots:e._u([{key:"top",fn:function(){return[a("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialogDelete,callback:function(t){e.dialogDelete=t},expression:"dialogDelete"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[e._v("Are you sure you want to delete this item?")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.closeDelete}},[e._v("Cancel")]),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.deleteItemConfirm}},[e._v("OK")]),a("v-spacer")],1)],1)],1)]},proxy:!0},{key:"item.actions",fn:function(t){var n=t.item;return[a("v-icon",{attrs:{small:""},on:{click:function(t){return e.deleteItem(n)}}},[e._v(" mdi-delete ")])]}}])})},U=[],B={data:function(){return{dialogDelete:!1,headers:[{text:"ID",value:"id"},{text:"Sender",value:"sender"},{text:"Recipient",value:"recipient"},{text:"Message",value:"message"},{text:"Delete",value:"actions",sortable:!1}],messages:[],editedIndex:-1,editedItem:{id:null,sender:null,recipient:null,message:null},defaultItem:{id:null,sender:null,recipient:null,message:null}}},watch:{dialogDelete:function(e){e||this.closeDelete()}},mounted:function(){this.getMessages(),this.$root.$on("update-pending",this.getMessages)},methods:{getMessages:function(){var e=this;c.a.get("/message/pending").then((function(t){e.messages=t.data})).catch(this.axiosError)},deleteItem:function(e){this.editedIndex=this.messages.indexOf(e),this.editedItem=Object.assign({},e),this.dialogDelete=!0},deleteItemConfirm:function(){var e=this;c.a.get("/message/delete/pending/".concat(this.editedItem.id)).then((function(){e.messages.splice(e.editedIndex,1),e.closeDelete()})).catch(this.axiosError)},closeDelete:function(){var e=this;this.dialogDelete=!1,this.$nextTick((function(){e.editedItem=Object.assign({},e.defaultItem),e.editedIndex=-1}))}}},F=B,J=Object(p["a"])(F,K,U,!1,null,null,null),L=J.exports;f()(J,{VBtn:b["a"],VCard:x["a"],VCardActions:g["a"],VCardTitle:g["c"],VDataTable:M["a"],VDialog:_["a"],VIcon:D["a"],VSpacer:w["a"]});var N=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.messages}})},q=[],z={data:function(){return{headers:[{text:"ID",value:"id"},{text:"Sender",value:"sender"},{text:"Recipient",value:"recipient"},{text:"Message",value:"message"},{text:"Date",value:"date"},{text:"Status",value:"status"}],messages:[]}},mounted:function(){this.getMessages(),this.$root.$on("update-sent",this.getMessages)},methods:{getMessages:function(){var e=this;c.a.get("/message/sent").then((function(t){e.messages=t.data})).catch(this.axiosError)}}},G=z,H=Object(p["a"])(G,N,q,!1,null,null,null),Q=H.exports;f()(H,{VDataTable:M["a"]});var W=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.messages}})},X=[],Y={data:function(){return{headers:[{text:"ID",value:"id"},{text:"Sender",value:"sender"},{text:"Message",value:"message"},{text:"Date",value:"date"}],messages:[]}},mounted:function(){this.getMessages(),this.$root.$on("update-received",this.getMessages)},methods:{getMessages:function(){var e=this;c.a.get("/message/received").then((function(t){e.messages=t.data})).catch(this.axiosError)}}},Z=Y,ee=Object(p["a"])(Z,W,X,!1,null,null,null),te=ee.exports;f()(ee,{VDataTable:M["a"]});var ae=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-snackbar",{attrs:{"multi-line":e.multiLine,color:"error",top:""},model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[e._v(" "+e._s(e.text)+" ")])},ne=[],ie={data:function(){return{multiLine:!0,snackbar:!1,text:null}},mounted:function(){var e=this;this.$root.$on("axios-error",(function(t){e.text=t.response.data,e.snackbar=!0}))}},se=ie,re=a("2db4"),le=Object(p["a"])(se,ae,ne,!1,null,null,null),oe=le.exports;f()(le,{VSnackbar:re["a"]});var ce={name:"App",components:{Users:R,Pending:L,Sent:Q,Received:te,Snackbar:oe},data:function(){return{tab:null,items:["users","pending","sent","received"]}},methods:{tabChange:function(e){this.$root.$emit("update-".concat(this.items[e]))}}},de=ce,ue=a("7496"),ve=a("f6c4"),me=a("71a3"),pe=a("c671"),he=a("fe57"),fe=a("aac8"),be=Object(p["a"])(de,i,s,!1,null,null,null),xe=be.exports;f()(be,{VApp:ue["a"],VContainer:k["a"],VMain:ve["a"],VTab:me["a"],VTabItem:pe["a"],VTabs:he["a"],VTabsItems:fe["a"]});var ge=a("f309");n["a"].use(ge["a"]);var Ie=new ge["a"]({});n["a"].config.productionTip=!1,n["a"].mixin({methods:{axiosError:function(e){this.$root.$emit("axios-error",e)}}}),new n["a"]({vuetify:Ie,render:function(e){return e(xe)}}).$mount("#app")}});
//# sourceMappingURL=index.fcb590ff.js.map