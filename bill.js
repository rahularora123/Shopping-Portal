var billDiv=document.getElementById("bill");
var products1=[];
var pId=[];
var orderHeader=[];
var orderDetails=[];
var oId=1;
var odId=1;
var Total=0;
var f=0;
var userName=[];
var tempUserName=[];

tempUserName=getStoredProductsSession1();
userName=getStoredProductsSession();
var userComment=document.createElement("h2");
userComment.innerHTML="Hi "+userName.Name+"<br>";
billDiv.appendChild(userComment);

var orderProduct=document.createElement("button");
orderProduct.innerHTML="Order";
orderProduct.setAttribute("id","order");


function getStoredProductsSession()
{
	if(!sessionStorage.user)
	{
		sessionStorage.user=JSON.stringify([]);
	}
	return JSON.parse(sessionStorage.user);
}
function getStoredProductsSession1()
{
	if(!sessionStorage.temp)
	{
		sessionStorage.temp=JSON.stringify([]);
	}
	return JSON.parse(sessionStorage.temp);
}
products1=getStoredProducts();
//orderHeader=getStoredOrderHeader();
//orderDetails=getStoredOrderDetails();
if(orderHeader)
{
oId=orderHeader.length;
oId++;
}
if(orderDetails)
{
odId=orderDetails.length;
odId++;
}
for(var i=0;i<products1.length;i++)
{
	if(products1[i].Email==userName.Email)
	{
		f=1;
	pId.push(i);
	addProductToDom(products1[i]);
	}
	
}

if(tempUserName.Email=="temp")
	{
		tempUserName.Email=userName.Email;
		pId=tempUserName.Id;
		products1.push(tempUserName);
		console.log(products1);
	addProductToDom(products1[products1.length-1]);
	storeProducts(products1);
	}
function getStoredProducts()
{
if (!localStorage.products1)
{
localStorage.products1= JSON.stringify([]);
}
return JSON.parse(localStorage.products1);
}
function addProductToDom(objProduct)
{
	var divProduct=document.createElement("div");
	divProduct.setAttribute("id",pId);
	//console.log(pId);
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
	var total=document.createElement("label");
	total.innerHTML="Total = "+objProduct.Price*objProduct.Quantity+"  ";
	divProduct.appendChild(total);
	Total+=objProduct.Price*objProduct.Quantity;
	var aRemoveBtn=document.createElement("button");
	aRemoveBtn.innerHTML="Remove Product";
	divProduct.appendChild(aRemoveBtn);
	
	aRemoveBtn.addEventListener("click",function(event){
		var targetParent=event.target.parentNode;
		var selectProductIndex=getProductIndex(parseInt(targetParent.id));
		removeFromProductsArray(selectProductIndex);
		targetParent.parentNode.removeChild(targetParent);
	});
	billDiv.appendChild(divProduct);
}
var ttl=document.createElement("label");
ttl.innerHTML="<br><h1>Total Rs= "+Total+"</h1>";
billDiv.appendChild(ttl);
if(f==1)
{
	billDiv.appendChild(orderProduct);
	f=0;
}
orderProduct.addEventListener("click",function(event){
	console.log(pId.length);
	for(var i=0;i<pId.length;i++)
	{
		addOrderToArray(i);
	}
});
function addOrderToArray(index)
{
	var d=new Date();
	var obj=new Object();
	obj.oId=oId;
	obj.oDate=d.toDateString();
	obj.uId=userName.Email;
	obj.orderStatus=0;
	obj.shippedDate=null;
	orderHeader.push(obj);
	
	var obj1=new Object();
	obj1.odId=odId;
	obj1.oId=oId;
	obj1.pId=products1[index].Id;
	obj1.pName=products1[index].Name;
	obj1.Price=products1[index].Price;
	obj1.Quantity=products1[index].Quantity;
	orderDetails.push(obj1);
	storeOrderHeader(orderHeader);
	storeOrderDetails(orderDetails)
	odId++;
	oId++;
}
function getStoredOrderDetails()
{
	if(!localStorage.orderDetails)
	{
		localStorage.orderDetails=JSON.stringify([]);
	}
	return JSON.parse(localStorage.orderDetails);
}
function getStoredOrderHeader()
{
	if(localStorage.orderHeader)
	{
		localStorage.orderHeader=JSON.stringify([]);
	}
	return JSON.parse(localStorage.orderHeader);
}
function storeOrderHeader(orderHeader)
{
	localStorage.orderHeader=JSON.stringify(orderHeader);
}
function storeOrderDetails(orderDetails)
{
	localStorage.orderDetails=JSON.stringify(orderDetails);
}
function getProductIndex(id)
{
	for(var i=0;i<products1.length;i++)
	{
		if(products1[i].Id==id)
			return i;
	}
}
function removeFromProductsArray(selectProductIndex)
{
	if(products1[selectProductIndex].Email==userName.Email)
	{
	products1.splice(selectProductIndex,1);
	storeProducts(products1);
	}
}
function storeProducts(products1)
{
	localStorage.products1=JSON.stringify(products1);
}