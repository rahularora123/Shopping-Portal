var client_info=[];
var inp1=document.getElementById("first_name_text");
var inp2=document.getElementById("last_name_text");
var inp3=document.getElementById("contact_number_text");
var inp4=document.getElementById("email_id_text");
var inp5=document.getElementById("password_text");
var inp6=document.getElementById("confirm_password_text");
var sub=document.getElementById("submit_button");
if (!localStorage.client_info)
{
	localStorage.client_info = JSON.stringify([]);
}
client_info = JSON.parse(localStorage.client_info);
sub.addEventListener("click",function(event){
	event.preventDefault();

		if(inp1.value=="")
		{
			window.alert("Please fill your first name box");
			inp1.value="";
		}
		else if(inp2.value=="")
		{
			window.alert("Please fill your last name box");
			inp2.value="";
		}
		else if(inp3.value==""||(inp3.value.length>10)||(inp3.value.length<10))
		{
			window.alert("Please enter the valid phone number");
			inp3.value="";
		}
		else if(inp4.value=="")
		{
			window.alert("Please fill the email box");
			inp4.value="";
		}
		else if(!(inp4.value.includes("@")))
		{
			window.alert("Enter a valid email address ");
			inp4.value="";
		}
		else if(inp5.value=="")
		{
			window.alert("Please fill the password box");
			inp5.value="";
		}
		else if((check_password(inp5)))
		{
			window.alert("Please enter the valid password box");
			inp5.value="";
		}
		else if(inp6.value=="")
		{
			window.alert("Please enter the valid confirm password box");
			inp6.value="";
		}
		else if(inp6.value!=inp5.value)
		{
			window.alert("Please enter the same password in confirm password box");
			inp6.value="";
		}
		else
		{
			 var var_obj=new Object();
			 var_obj.first_name=inp1.value;
			 var_obj.last_name=inp2.value;
			 var_obj.phone_number=inp3.value;
			 var_obj.email_id=inp4.value;
			 var_obj.pass_word=inp5.value;
			 client_info.push(var_obj);
			 localStorage.client_info = JSON.stringify(client_info);
			 for(var i=0;i<client_info.length;i++)
			 {
				 window.alert(client_info[i].first_name);
			 }
		}
});
function check_password(elementer)
{
	 var mediumRegex = new RegExp(("^(?=.{0,8}$)(?=.+[a-z])(?=.+[A-Z])(?=.+[0-9])(?=.+[!@#$%^&*])"));
	if(!(elementer.value.match(mediumRegex)))
	return true;
	else 
	return false;
}