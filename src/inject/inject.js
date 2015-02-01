chrome.extension.sendMessage({}, function(response) {
if(location.href.length<500)
{
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);	
	
	qs = function () {
		  var query_string = {};
		  var query = window.location.search.substring(1);
		  var vars = query.split("&");
		  for (var i=0;i<vars.length;i++) {
			var pair = vars[i].split("=");
			if (typeof query_string[pair[0]] === "undefined") {
			  query_string[pair[0]] = pair[1];
			} else if (typeof query_string[pair[0]] === "string") {
			  var arr = [ query_string[pair[0]], pair[1] ];
			  query_string[pair[0]] = arr;
			} else {
			  query_string[pair[0]].push(pair[1]);
			}
		  } 
			return query_string;
		} ();
	
	//--------------------- CASUALITIES
	
		// reload Page after every half hour	
		window.setTimeout(function(){location.reload()},0.5*60*60*1000)
		$.ajaxSetup({error: function(r){
				console.log("fORBID> AJAX ERROR :: Reloading in 10 seconds... ")
				window.setTimeout(function(){location.reload()},10000)
			}
		})
	
	
	if(typeof(qs.start)!=="undefined")
	{
		chrome.storage.local.get('emails_queue', function(data) {console.log(data)})
		chrome.storage.local.get('emails_processed', function(data) {console.log(data)})
		chrome.storage.local.get('from_ids', function(data) {console.log(data)})
		chrome.storage.local.get('map_ids', function(data) {console.log(data)})
		chrome.storage.local.get('from_usernames', function(data) {console.log(data)})
		$('body').html('<br>fORBiD SYSTEM<br><br>STEP 01: WRITE ANY LOW_WEIGHT WEB PAGE like localhost (http)<br>')
		$('body').append('<input type="text" value="http://localhost"> <button id="generate">Generate</button><br><br>')
		$(document).on('click','#init',function(){
			chrome.storage.local.set({'emails_processed':''}, function() {})
			chrome.storage.local.set({'from_usernames':''}, function() {})
			chrome.storage.local.set({'from_ids':''}, function() {})
			chrome.storage.local.set({'map_ids':''}, function() {})
		})
		$(document).on('click','#generate',function(){
			$('body').append('<br><br>STEP 02: Open Sellmouse and login via facebook (Start fresh)<br>')
			$('body').append('<br><br>STEP 03: <button id="init">Initialize variables (Only once and in case of errors)</button><br>')
			$('body').append('<br><br>STEP 04: Click one by one<br>')

			$('body').append('<a href="'+$('input').val()+'/?newpc=1" target="_blank"><button>Start newpc</button></a>')
			$('body').append('<a href="'+$('input').val()+'/?unmapped_ids=1" target="_blank"><button>Start getting new ids</button></a>')
			$('body').append('<a href="https://www.facebook.com" target="_blank"><button>Open facebook</button></a>')
			$('body').append('<a href="'+$('input').val()+'/?map_ids=1" target="_blank"><button>Start mapping id</button></a>')
			$('body').append('<a href="'+$('input').val()+'/?email=1" target="_blank"><button>Start email</button></a>')
			$('body').append('<a href="https://mail.google.com/" target="_blank"><button>Open Gmail (MAKE SURE WE ARE LOGGED INTO our ACCOUNT)</button></a>')
		})
	}

	if(location.href.search("mail.google.com/mail/")>0 && location.href.length<95)
	{	
		console.log("MAILING")
			function mailing(un,desc,name,id,c_link,person_name,seller_email)
				{
					var t='';
					if(location.href.search("\\?")<=0)
					t='?'
					if(typeof(qs.v)=="undefined" || typeof(qs.pv)=="undefined" || typeof(qs.cs)=="undefined")
					location.href=location.href+t+"&v=b&pv=tl&cs=b"
					
					console.log("MAIL "+(j+1))
					window.setTimeout(function(){
						console.log('fORBiD -- > Waiting for compose to open...')
						$('textarea[name=to]').val(un+'@facebook.com')
						$('input[name=subject]').val('Click to Buy '+name)
						//$('textarea[name=body]').html('This is my statement one&#13;&#10;asdas')
						$('textarea[name=body]').html('Hey '+person_name+',&#13;&#10;&#13;&#10;Its really amazing to see you interested in Buying '+name+', here is the link where you confirm your claim to buy it:&#13;&#10;&#13;&#10;'+c_link+'&#13;&#10;&#13;&#10;More about '+name+': '+desc+'.&#13;&#10;&#13;&#10;For more info on product, Please contact: '+seller_email+' &#13;&#10;&#13;&#10;Sent by: &#13;&#10;Team Sellmouse&#13;&#10;http://www.sellmouse.com&#13;&#10;https://sellmouse.tumblr.com&#13;&#10;')
							//if(data.length>j)
							//mailing(data[j][0],data[j][1],data[j][2],data[j][3],data[j][4])
							//else
							//{
						
							//}
						data.splice(j,1)
						chrome.storage.local.set({'emails_queue':data}, function() {
							chrome.storage.local.get('emails_queue', function(data) {
								console.log("Queued Emails Now >")
								console.log(data)
								window.setTimeout(function(){mailing()},5000)
								console.log("fORBiD -- > Mail Send to "+un+'@facebook.com')
								ids+=','+id
								j++;
								
								chrome.storage.local.get('emails_processed', function(data) {
									ep=data.emails_processed
									if(ep!="")
									ep+=','
									ep+=id
									
									console.log("Resetting Processed Emails...")
									chrome.storage.local.set({'emails_processed':ep}, function() {
										console.log("PROCESSED >"+ep)
										console.log("fORBID > PROCESSING COMPLETE")
										$('input[type=submit][value=Send]').trigger('click')
									})
								})
							})
						})
					},7000)
				}

			//----------------------------------------------
			chrome.storage.local.get('emails_queue', function(d) {
				data=d.emails_queue
				ids='0'
				console.log("Queued Emails in this SESSION >")
				console.log(data)
				j=0;
				if(data.length>0)
				mailing(data[j][0],data[j][1],data[j][2],data[j][3],data[j][4],data[j][5],data[j][6])
				else
				{
					console.log("fORBID > Will Start nxt session after Page Reload in 20 seconds...")
					window.setTimeout(function(){location.reload()},20000)
				}
				
			})
			//----------------------------------------------
	}
	else if(typeof(qs.newpc)!="undefined")
	{	
		i=0;
		function process(start)
		{
			console.log("fORBiD> Iteration "+start)
			$.ajax({url:"http://sellmouse.com/server-exchange/background_process.php?add_comments=1&start="+start,success: function(result){
				if(result=="")
				{
					i++;
					window.setTimeout(function(){process(i)},1800);
				}
				else
				{
					console.log("fORBiD> Reloading Page......")
					window.setTimeout(function(){location.reload()},5000);
				}
			}
			})
		}
		process(i);
	}
	else if(typeof(qs.unmapped_ids)!="undefined")
	{
		console.log("UNMAPPED IDS")
		$.ajax({url:"http://sellmouse.com/server-exchange/background_process.php?unmapped_ids=1",success: function(data){
			if(data=='' || data==null)
			a=''
			else
			a=data
			chrome.storage.local.set({'from_ids': a}, function() {
				chrome.storage.local.get('from_ids', function(data) {
				console.log(data)
				if(data.length>0)
				{
				from_ids=JSON.parse("[" + data.from_ids.toString() + "]");
				console.log(from_ids)
				}
				console.log("fORBiD> Reloading Page in 8 seconds......")
				window.setTimeout(function(){location.reload()},8000);
			});
			});
		}
		})
	}
	else if(typeof(qs.map_ids)!="undefined")
	{
		function map_ids(){
			console.log("MAPPING IDS.....")
			chrome.storage.local.get('from_usernames', function(data) {
				if(typeof(data.from_usernames)!="undefined" && data.from_usernames.toString()!="" )
				{
					q=data.from_usernames.toString();
					chrome.storage.local.set({'from_usernames':''}, function() {})
					$.ajax({url:"http://sellmouse.com/server-exchange/background_process.php?map_ids=1",data:{q:q},
					success: function(){
						window.setTimeout(function(){map_ids()},3000)
					},
					error: function(){
						location.reload();
					}
					})
				}
				else
				{
					window.setTimeout(function(){map_ids()},3000)
				}
			})
		}
		map_ids()
		window.setTimeout(function(){location.reload()},1000*1800)
	}
	else if(typeof(qs.email)!="undefined")
	{
		function email(){
			chrome.storage.local.get('emails_processed', function(d) {
				aa=d.emails_processed;
				console.log("UPDATING PROCESSED EMAILS ("+aa+")")
				$.ajax({url:"http://sellmouse.com/server-exchange/background_process.php?p_email=1",
				data:{ids:aa},
				success: function(data){
					if(data=="ok")
					{
						chrome.storage.local.set({'emails_processed':""}, function() {
							console.log("GETTING NEW EMAILS.....")
							$.ajax({url:"http://sellmouse.com/server-exchange/background_process.php?email=1",
							dataType:"JSON",
							success: function(data){
								//data=$.parseJSON(data)
								b=new Array()
								for(var i=0;i<data.length;i++)
								{
									b.push(Array(data[i].email,data[i].description,data[i].name,data[i].id,data[i].c_link,data[i].person_name,data[i].seller_email))	
								}
								//b.toString()
								chrome.storage.local.set({'emails_queue':b}, function() {
									chrome.storage.local.get('emails_queue', function(data) {
									console.log(data)
								})
									$('body').append(data)
								})
								console.log("Will check again in 10 seconds...");
								window.setTimeout(function(){email()},10000)
							}
							})
						})
					}
					
				}
				})
				
			})
		}
		email()
		window.setTimeout(function(){location.reload()},1000*1800)
	}
	else if(typeof(qs.nex)=="undefined"  && location.href.search("www.facebook.com")>0)
	{
		chrome.storage.local.get('from_ids', function(data) {
			if(typeof(data.from_ids)=="undefined")
				chrome.storage.local.set({'from_ids':''}, function() {
					
					console.log('Will Check in 40 seconds....')
					window.setTimeout(function(){newids()},40000)
					})
		})
		console.log("< fORBiD >");
		//localStorage['from_id']=new Array(727753033928619,681936928510160,727753033928619,681936928510160)
			if(location.href.length<50 && location.href=="https://www.facebook.com/")
			{
				function newids()
				{
					console.log("CHECKING NEW IDS..........")
					chrome.storage.local.get('from_ids', function(data) {
					if(typeof(data.from_ids)!="undefined")
					{
							from_ids=JSON.parse("[\""+data.from_ids.toString()+"\"]")
							if(from_ids.length>0){
								first=from_ids[0]
								console.log("Loading "+first+" .....")	
								window.setTimeout(function(){
								location.href="https://www.facebook.com/"+first;
								},3000)
							}
							else
							{
								console.log('Will Check in 5 seconds....')
								window.setTimeout(function(){newids()},5000)
							}
					}
					else
					{
						console.log('Will Check in 25 seconds....')
						window.setTimeout(function(){newids()},25000)
					}
					})
				}
				newids()
			}
			else if(location.href.length<50)
			{	
				console.log(3)
				chrome.storage.local.get('from_ids', function(data) {
					from_ids=data.from_ids.toString()
					from_ids=JSON.parse("[\""+from_ids+"\"]")
					console.log(from_ids)
				if(from_ids.length>0)
				{
					first=from_ids[0]
					var a = document.querySelectorAll("a");
					if(a.length === 0) {
						location.href="https://www.facebook.com/"+first;
					} else {
						for(var i=0; i<a.length; i++)
						{
							if(a[i].getAttribute("rel")=="ignore")
							{
								var s = a[i].toString();
								if(s.indexOf("timeline")>-1)
								{
									if(a[i].toString().slice(25,-9)!=null && a[i].toString().slice(25,-9)!="undefined" && typeof(a[i].toString().slice(25,-9))!="undefined")
									{
										qw=a[i].toString().slice(25,-9)
									chrome.storage.local.get('from_usernames', function(data) {
										if(typeof(data.from_usernames)=="undefined")
										{
											chrome.storage.local.set({'from_usernames':''}, function() {
												location.reload()
											})
										}
										
										from_usernames=data.from_usernames.toString();
										if(from_usernames=='')
										tmp='';
										else
										tmp=',';
										
										from_usernames+=tmp+first+','+qw
										console.log(from_usernames)
										from_ids.splice(0,1);
										
										if(from_ids.length==0)
										data='';
										else
										data=from_ids.toString();
										console.log(from_ids)
										chrome.storage.local.set({'from_ids': data,'from_usernames':from_usernames}, function() {
											if(from_ids.length>0)
											{
												console.log("Reloading the page for Next id ("+from_ids[0]+").......");
												location.href="https://www.facebook.com/"+from_ids[0];
											}else
											{
												location.href="https://www.facebook.com/"
											}
											})
									})
									break;
									}
								}
							}
						}
					}
				}else
					{
					location.href="https://www.facebook.com/"
					}
				})
			}
	}
		}
	}, 10);
}

});