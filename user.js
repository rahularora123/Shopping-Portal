var products=[];
var pId=1;
var cartId=1;
var products1=[];
var k=0;
var check=0;
var qtyval=0;
var showP=document.getElementById("showProduct");
var userName=[];
userName=getStoredProductsSession();
if(userName.Name!=null)
{check=0;
var userComment=document.createElement("h2");
userComment.innerHTML="Hi "+userName.Name;
showP.appendChild(userComment);
console.log("Admin="+userName.Admin);
if(userName.Admin===2)
{
	/*var access=document.createElement("button");
	access.innerHTML="Edit Product";
	showP.appendChild(access);
	insertBlankLine(showP,2);
	access.addEventListener("click",function(event){
	userName.Admin=1;});*/
	window.location.assign("MyShop.html");
}

var logout=document.createElement("button");
logout.innerHTML="Logout";
showP.appendChild(logout);
insertBlankLine(showP,2);
checkCart();
}
else{
	check=1;
	var logout=document.createElement("button");
logout.innerHTML="Login";
showP.appendChild(logout);
}
logout.addEventListener("click",function(event){
	sessionStorage.setItem("temp",null);
	sessionStorage.clear();
	window.location.assign("login.html");
	
});

products=getStoredProducts();
products1=getStoredProducts1();
if(products1.length)
{
cartId=products1.length;
cartId++;
}
function getStoredProductsSession()
{
	if(!sessionStorage.user)
	{
		sessionStorage.user=JSON.stringify([]);
	}
	return JSON.parse(sessionStorage.user);
}
function checkCart()
{
	var form1=document.createElement("form");
	showP.appendChild(form1);
	var btn=document.createElement("input");
	btn.setAttribute("type","submit");
	btn.value="Check Cart";
	form1.appendChild(btn);
	btn.addEventListener("click",function(event){
		form1.setAttribute("action","bill.html");
	});
}
for(var i=0;i<products.length;i++)
{
	pId=products[i].Id;
	//console.log(products[i].Id);
	addProductToDom(products[i]);
}
function getStoredProducts()
{
if (!localStorage.products)
{
localStorage.products = JSON.stringify([]);
}
return JSON.parse(localStorage.products);
}
function getStoredProducts1()
{
if (!localStorage.products1)
{
localStorage.products1 = JSON.stringify([]);
}
return JSON.parse(localStorage.products1);
}
function addProductToDom(objProduct)
{
	var divProduct=document.createElement("div");
	divProduct.setAttribute("id",pId);
	var aProductName=document.createElement("label");
	aProductName.innerHTML="<br>Product Name: "+objProduct.Name+"<br>";
	divProduct.appendChild(aProductName);
	var aProductdesc=document.createElement("label");
	aProductdesc.innerHTML="Product desc.: "+objProduct.Desc+"<br>";
	divProduct.appendChild(aProductdesc);
	var aProductprice=document.createElement("label");
	aProductprice.innerHTML="Product Price: "+objProduct.Price+"<br>";
	divProduct.appendChild(aProductprice);
	var aProductquant=document.createElement("label");
	aProductquant.innerHTML="Product Quantity: "+objProduct.Quantity+"<br><br>";
	divProduct.appendChild(aProductquant);
	var aProductqty=document.createElement("input");
	aProductqty.setAttribute("type","number");
	aProductqty.setAttribute("id","pQty");
	aProductqty.setAttribute("placeholder","Qty");
	aProductqty.style.width="40px";
	divProduct.appendChild(aProductqty);
	var addCartbtn=document.createElement("button");
	addCartbtn.innerHTML="Add To Cart";
	divProduct.appendChild(addCartbtn);
	showP.appendChild(divProduct);
	addCartbtn.addEventListener("click",function(event){
	if(aProductqty.value<=0)
	{
			window.alert("Enter Correct Quantity");
			aProductqty.value="";
	}
	else{
		var targetParent=event.target.parentNode;
		var selectProductIndex=getProductIndex(parseInt(targetParent.id));
		if(products[selectProductIndex].Quantity>=1)
		{
			if(products[selectProductIndex].Quantity-aProductqty.value<=-1)
			{
				window.alert("!!!!!!!only "+products[selectProductIndex].Quantity+ " products are available!!!!!!!");
			}
			else{
				
		products[selectProductIndex].Quantity-=aProductqty.value;
		//console.log(products[selectProductIndex]);
		var getDiv=document.getElementById(products[selectProductIndex].Id);
		getDiv.childNodes[3].innerHTML="Product Quantity: "+products[selectProductIndex].Quantity+"<br><br>";
		qtyval=parseInt(aProductqty.value);
		if(check==0)
		{
		makeArrayObject(selectProductIndex);
		}
		if(check==1)
		{
			
			var obj=new Object();
			obj.Email="temp";
			obj.Id=products[selectProductIndex].Id;
			obj.Name=products[selectProductIndex].Name;
			obj.Desc=products[selectProductIndex].Desc;
			obj.Price=products[selectProductIndex].Price;
			obj.Quantity=qtyval;
			storeSession(obj);
			check=0;
			//sessionStorage.setItem("temp","Idh:0");
			window.location.assign("login.html");
			
		}
		//console.log(products[selectProductIndex].Quantity);
			/*if(qtyval!=0)
			{
				var j=searchElement(selectProductIndex);
				console.log("j= "+j);
				console.log("selectProductIndex= ",selectProductIndex);
					if(products[j].Id===products[selectProductIndex].Id)
					{
						products1[j].Id=products[selectProductIndex].Id;
						products1[j].Name=products[selectProductIndex].Name;
						products1[j].Desc=products[selectProductIndex].Desc;
						products1[j].Price=products[selectProductIndex].Price;
						qtyval+=parseInt(aProductqty.value);
						products1[j].Quantity=qtyval;
						//break;
					}
				}
			else
			{
				
			}*/
		}		
			storeProducts(products);
			storeProducts1(products1);
			}
		else if(products[selectProductIndex].Quantity==0){
			addCartbtn.setAttribute("style","visibility:hidden");
			var outOfStock=document.createElement("label");
			outOfStock.innerHTML="OUT OF STOCK";
			outOfStock.setAttribute("style","color:red");
			divProduct.appendChild(outOfStock);
		}
	}
	});
}
function makeArrayObject(selectProductIndex)
{
	
	var obj=new Object();
	obj.cId=cartId;
	if(userName.Email!=null)
	obj.Email=userName.Email;
	obj.Id=products[selectProductIndex].Id;
	obj.Name=products[selectProductIndex].Name;
	obj.Desc=products[selectProductIndex].Desc;
	obj.Price=products[selectProductIndex].Price;
	obj.Quantity=qtyval;
	products1.push(obj);
	cartId++;
	
}
function getProductIndex(id)
{
	for(var i=0;i<products.length;i++)
	{
		if(products[i].Id==id)
			return i;
	}
}
function searchElement(index)
{
	for(var i=0;i<products1.length;i++)
	{
		if(products1[i].Id==products[index].Id)
			return i;
	}
	k++;
	qtyval=0;
	return i;
}
function storeProducts(products)
		{
			localStorage.products = JSON.stringify(products);
			//console.log(localStorage.products);
		}
function storeProducts1(products1)
		{
			localStorage.products1 = JSON.stringify(products1);
			//console.log(localStorage.products);
		}
function storeSession(obj)
{
	sessionStorage.temp=JSON.stringify(obj);
}
function insertBlankLine(targetElement,numberOfBreak)
{
	for(var i=0;i<numberOfBreak;i++)
	{
		var br=document.createElement("BR");
		targetElement.appendChild(br);
	}
}