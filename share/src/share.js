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
			imgUrl:"images/share/bottom_banner.png"
		},
		"o_t":{
			imgUrl:"images/share/bottom_banner_500.png"
		}
	}
	var currentData = dataMap[kl_state];
	if(!currentData){
		currentData = dataMap["f_h"];
	}
	var HeaderComponent  = React.createClass({
		render:function(){
			return (
				<div id="logo">
					<img src="images/share/logo.png" />
				</div>
			);
		}
	}); 
	var ShareTipComponent = React.createClass({
		render:function(){
			return(
				<div className="shareTipDiv" onClick={this.closeTip}>
					<img src="images/share/android_share_tip.png" />
				</div>
			)
		},
		closeTip:function(){
			var node = this.getDOMNode().parentNode;
			React.unmountComponentAtNode(node); 
		}
	});
	React.render(
		<HeaderComponent />,
		document.getElementById('AppHeader')
	);
	var ContainerComponent = React.createClass({
		render:function(){
			return(
				<div>
					<div className="title">
						开启懒人理财生活
					</div>
					<div className="iconList">
						<div className="one list">
							<span>
								<img src="images/share/icon_1.png" />
							</span>
							<b>余额宝2倍收益</b>
						</div>
						<div className="two list">
							<span>
								<img src="images/share/icon_2.png" />
							</span>
							<b>1元理财</b>
						</div>
						<div className="three list">
							<span>
								<img src="images/share/icon_3.png" />
							</span>
							<b>随存随取</b>
						</div>
					</div>
					<div className="actionBanner">
						<div className="top_banner" onClick={this.downLoadClick}>
							<img src={this.props.contentData.imgUrl} />
						</div>
					</div>
				</div>
			);
		},
		downLoadClick:function(){
			// React.render(<ShareTipComponent />,document.getElementById('shareTipContainer'));
			sendGa({text:"考拉理财APP-分享页面-点击我要领取"});
			//tood
			//alert('敬请期待');
			if(isIOS()){
				window.location.href = 'https://itunes.apple.com/us/app/kao-la-li-cai/id962314981?l=zh&ls=1&mt=8';
				// window.location.href = "http://mp.weixin.qq.com/s?__biz=MzAwNDEyMzgyMA==&mid=203946186&idx=1&sn=18889718f515579272cf83266e1cb696#rd";
				//todo,attension link
			}else{
				if(is_weixin()){
					React.render(<ShareTipComponent />,document.getElementById('shareTipContainer'));
					// var tipDiv = document.createElement("div");
					// tipDiv.setAttribute('class','shareTipDiv');
					// var img = document.createElement('img');
					// img.setAttribute('src','images/share/android_share_tip.png');
					// tipDiv.appendChild(img);
					// document.body.appendChild(tipDiv);
				}else{
					window.location.href = "http://7vigz5.com1.z0.glb.clouddn.com/kllc_share.apk";//todo,app download link
				}
			}
		}
	});
	React.render(
		<ContainerComponent contentData = {currentData}  />,
		document.getElementById('AppContainer')
	);
	var FooterComponent = React.createClass({
		render:function(){
			return(
				<div className="footer">
					
					<div className="bottom_banner">
					</div>
				</div>
			)
		}
	});
	React.render(
		<FooterComponent />,
		document.getElementById('AppFooter')
	);
})();