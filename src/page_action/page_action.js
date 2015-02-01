chrome.runtime.sendMessage({method: "getStatus"}, function(response) {alert(9)
			alert('a'+response.toString())
		  console.log(response.status);
		});
