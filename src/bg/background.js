chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
chrome.pageAction.show(sender.tab.id);

if (request.method == "setStatus")
{	
	chrome.storage.sync.set({'from_id': request.from_ids}, function() {
          // Notify that we saved.
         console.log("SET "+request.from_ids)
        });
	sendResponse({status: request.from_ids});
}
else if (request.method == "getStatus")
{
	chrome.storage.sync.get('from_id', function(value) {
		from_ids=value.from_id;
		
		console.log("GET "+from_ids)
	});
	sendResponse({status: from_ids});
}      
else if (request.method == "uservsid")
{
	chrome.storage.sync.set({'from_id': request.from_ids}, function() {
          // Notify that we saved.
          console.log('set')
        });
	sendResponse({status: from_ids});
}      
else
      sendResponse({}); // snub them.


});