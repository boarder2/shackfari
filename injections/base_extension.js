function ShacknewsExtension(extensionName) {
	this.extension = extensionName;
	this.username = null;
}

ShacknewsExtension.LOL = {URL: "http://www.lmnopc.com/greasemonkey/shacklol/", VERSION: "20090513"};

ShacknewsExtension.prototype.extended = function(event) {
		//Your code would extend from here
		alert('Extension ' + this.extension + ' unimplemented');
	}

ShacknewsExtension.prototype.extendShacknews = function(allPages) {
	
	var curExtension = this;
	
	//Since scripts will run on all calls in shacknews, let's only register and run on the top window by default.
	if (allPages || window == window.top) {
		safari.self.tab.dispatchMessage("canExtendShacknews", curExtension.extension);
		safari.self.addEventListener("message", function (eventMessage) { curExtension.checkExtended(eventMessage) }, false);
	}
}

ShacknewsExtension.prototype.checkExtended = function(eventMessage) {
	var messageName = eventMessage.name;
	var curExtension = this;
	if ("canExtendShacknews" + this.extension != messageName) {
		return;
	}
	
	
	$(document).ready(function() {
		curExtension.extended(eventMessage);
	});
}

ShacknewsExtension.prototype.getUsername = function() {
	if (this.username == null) {
		this.username = $("a.username:first").text();
	}
	return this.username;
}

ShacknewsExtension.prototype.isNewChatty = function(checkVar) {
	return checkVar == null || this.getChattyPost() > checkVar || parseInt(checkVar) != checkVar;
}

ShacknewsExtension.prototype.getChattyPost = function() {
	var chattyUrl = $("div.story a[href*=story]").attr("href");
	return chattyUrl.substr(chattyUrl.indexOf("story") + 6);
}