(function(){
	function isIOS(){
		var ua = navigator.userAgent;
		return ua.match(/(iPhone\sOS)\s([\d_]+)/) || ua.match(/(iPad).*OS\s([\d_]+)/) || ua.match(/(iPod)(.*OS\s([\d_]+))?/);    
	} 
	function is_weixin(){
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i)=="micromessenger") {
			return true;
		} else {
			return false;
		}
	}
	function sendGa(json){
	    json = json || {}
	    ga && ga('send',{
	        'hitType': 'event',          // Required.
	        'eventCategory': json.cat || 'button',   // Required.
	        'eventAction': json.action || 'click',      // Required.
	        'eventLabel': json.text || 'buttons click',
	        'eventValue': json.pos || 0
	    });
	}
	function searchToJson(){
		var search = window.location.search;
		if (!search){
			return false;
		}else{
			search = search.substr(1);
			var searchJson = {};
			var searchArr = search.split('&');
			for(var i = 0 , len = searchArr.length ; i < len ; i++){
				var tempArr = searchArr[i].split('=');
				searchJson[tempArr[0]] = tempArr[1];
			}
			return searchJson;
		}
	};
	function getSearchParam(param){
		var searchJson = searchToJson();
		if(!searchJson || !(searchJson[param])){
			return undefined;
		}else{
			return searchJson[param];
		}
	}
	var kl_state = getSearchParam('kl_state');
	var dataMap = {
		"f_h":{
			imgUrl:"images/bottom_banner.png"
		},
		"o_t":{
			imgUrl:"images/bottom_banner_500.png"
		}
	}
	var currentData = dataMap[kl_state];
	if(!currentData){
		currentData = dataMap["f_h"];
	}
	var HeaderComponent  = React.createClass({displayName: "HeaderComponent",
		render:function(){
			return (
				React.createElement("div", {id: "logo"}, 
					React.createElement("img", {src: "images/logo.png"})
				)
			);
		}
	}); 
	var ShareTipComponent = React.createClass({displayName: "ShareTipComponent",
		render:function(){
			return(
				React.createElement("div", {className: "shareTipDiv", onClick: this.closeTip}, 
					React.createElement("img", {src: "images/android_share_tip.png"})
				)
			)
		},
		closeTip:function(){
			var node = this.getDOMNode().parentNode;
			React.unmountComponentAtNode(node); 
		}
	});
	React.render(
		React.createElement(HeaderComponent, null),
		document.getElementById('AppHeader')
	);
	var ContainerComponent = React.createClass({displayName: "ContainerComponent",
		render:function(){
			return(
				React.createElement("div", null, 
					React.createElement("div", {className: "title"}, 
						"开启懒人理财生活"
					), 
					React.createElement("div", {className: "iconList"}, 
						React.createElement("div", {className: "one list"}, 
							React.createElement("span", null, 
								React.createElement("img", {src: "images/icon_1.png"})
							), 
							React.createElement("b", null, "余额宝2倍收益")
						), 
						React.createElement("div", {className: "two list"}, 
							React.createElement("span", null, 
								React.createElement("img", {src: "images/icon_2.png"})
							), 
							React.createElement("b", null, "1元理财")
						), 
						React.createElement("div", {className: "three list"}, 
							React.createElement("span", null, 
								React.createElement("img", {src: "images/icon_3.png"})
							), 
							React.createElement("b", null, "随存随取")
						)
					), 
					React.createElement("div", {className: "actionBanner"}, 
						React.createElement("div", {className: "top_banner", onClick: this.downLoadClick}, 
							React.createElement("img", {src: this.props.contentData.imgUrl})
						)
					)
				)
			);
		},
		downLoadClick:function(){
			React.render(React.createElement(ShareTipComponent, null),document.getElementById('shareTipContainer'));
		}
	});
	React.render(
		React.createElement(ContainerComponent, {contentData: currentData}),
		document.getElementById('AppContainer')
	);
	var FooterComponent = React.createClass({displayName: "FooterComponent",
		render:function(){
			return(
				React.createElement("div", {className: "footer"}, 
					
					React.createElement("div", {className: "bottom_banner"}
					)
				)
			)
		}
	});
	React.render(
		React.createElement(FooterComponent, null),
		document.getElementById('AppFooter')
	);
})();