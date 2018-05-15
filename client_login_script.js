var user_name_t=document.getElementById("user_name_text");
var pass_t=document.getElementById("password_text");
var log_but=document.getElementById("login_button");
var client_infoer=[];
var flag=0;
if (!localStorage.client_info)
{
	localStorage.client_info = JSON.stringify([]);
}
client_infoer = JSON.parse(localStorage.client_info);
log_but.addEventListener("click",function(event){
	event.preventDefault();
	for(var i=0;i<client_infoer.length;i++)
	{
		if(user_name_t.value==client_infoer[i].email_id)
		{
			flag=1;
			if(pass_t.value==client_infoer[i].pass_word)
			{
				window.alert("entered details are matched");
			}
			else 
			{
				window.alert("entered password is wrong");
				pass_t.value="";
			}
		}
	}
	if(flag==0)
	{
		window.alert("entered username is wrong ");
		pass_t.value="";
		user_name_t.value="";
	}
});