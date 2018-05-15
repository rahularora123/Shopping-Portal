var products=[];
var productId=1;
var flag=0;
//get the address of three division
var divAddProduct=document.getElementById("divAddProduct");
var aAddProduct=document.getElementById("aAddProduct");
var divListProducts=document.getElementById("divListProducts");

products=getStoredProducts();
//console.log(products);
//console.log(products.length);
	for(var i=0;i<products.length;i++)
	{
	productId=products[i].Id;
	//console.log(products[i]);
	addProducttoDom(products[i]);
	}
	productId++;
function getStoredProducts()
{
if (!localStorage.products)
{
localStorage.products = JSON.stringify([]);
}
return JSON.parse(localStorage.products);
}

aAddProduct.addEventListener("click",function(event)
{
	createNewProductPanel(); 
});
function addProductArray()
{
	var objProduct=new Object();
	objProduct.Id=productId;
	//console.log(productId);
	objProduct.Name=document.getElementById("txtProductName").value;
	objProduct.Desc=document.getElementById("txtProductDesc").value;
	objProduct.Price=document.getElementById("txtProductPrice").value;
	objProduct.Quantity=document.getElementById("txtProductQuantity").value;
	products.push(objProduct);
	addProducttoDom(objProduct);
	deleteNewProductPanel();
	storeProducts(products);
	productId++;
}
function deleteNewProductPanel()
{
	var childNodes=divAddProduct.childNodes;
	for(var i=0;childNodes.length>0;)
	{
		divAddProduct.removeChild(childNodes[i]);
	}
}
function addProducttoDom(objProduct)
{
	var divProduct=document.createElement("div");
	divProduct.setAttribute("id",productId);
		
	var aProductName=document.createElement("label");
	aProductName.innerHTML=objProduct.Name+" ";
	divProduct.appendChild(aProductName);
	
	var aProductDesc=document.createElement("label");
	aProductDesc.innerHTML=objProduct.Desc+ " ";
	divProduct.appendChild(aProductDesc);
	
	var aProductPrice=document.createElement("label");
	aProductPrice.innerHTML=objProduct.Price+ " ";
	divProduct.appendChild(aProductPrice);
	
	var aProductQuantity=document.createElement("label");
	aProductQuantity.innerHTML=objProduct.Quantity+" ";
	divProduct.appendChild(aProductQuantity);
	
	var aDelete=document.createElement("button");
	aDelete.setAttribute("type","submit");
	aDelete.innerHTML="Delete";
	divProduct.appendChild(aDelete);
	
	var abc=document.createElement("label");
	abc.innerHTML=" ";
	divProduct.appendChild(abc);
	
	var aEdit=document.createElement("button");
	aEdit.setAttribute("type","submit");
	aEdit.innerHTML="Edit";
	divProduct.appendChild(aEdit);
	
	aDelete.addEventListener("click",function(event){
		
		var targetParent=event.target.parentNode;
		//console.log(targetParent.id);
		var selectProductIndex=getProductIndex(parseInt(targetParent.id));
		removeFromProductsArray(selectProductIndex);//remove from the array
		targetParent.parentNode.removeChild(targetParent);//remove from the dom
		
	});
	
	aEdit.addEventListener("click",function(event){
		flag=1;
		 var targetParent=event.target.parentNode;
		var selectProductIndex=getProductIndex(parseInt(targetParent.id));
		createNewProductPanel();
	document.getElementById("txtProductName").value=products[selectProductIndex].Name;
	document.getElementById("txtProductDesc").value=products[selectProductIndex].Desc;
	document.getElementById("txtProductPrice").value=products[selectProductIndex].Price;
	document.getElementById("txtProductQuantity").value=products[selectProductIndex].Quantity;
	
	var editbtn=document.getElementById("editButton");
	editbtn.addEventListener("click",function(event){
		products[selectProductIndex].Name=document.getElementById("txtProductName").value;
		products[selectProductIndex].Desc=document.getElementById("txtProductDesc").value;
		products[selectProductIndex].Price=document.getElementById("txtProductPrice").value;
		products[selectProductIndex].Quantity=document.getElementById("txtProductQuantity").value;
		
		var a=document.getElementById(products[selectProductIndex].Id);
		a.childNodes[0].innerHTML=products[selectProductIndex].Name+" ";
		a.childNodes[1].innerHTML=products[selectProductIndex].Desc+ " ";
		a.childNodes[2].innerHTML=products[selectProductIndex].Price+" ";
		a.childNodes[3].innerHTML=products[selectProductIndex].Quantity+" ";
		storeProducts(products);
		unHideAddNewProductLink();
		deleteNewProductPanel();
		flag=0;
	});
	
		//removeFromProductsArray(selectProductIndex);
		
		//targetParent.parentNode.removeChild(targetParent);
	});
	
	divListProducts.appendChild(divProduct);
	//storeProducts(products);
	insertBlankLine(divProduct,2);
	
	unHideAddNewProductLink();
}
function storeProducts(products)
		{
			localStorage.products = JSON.stringify(products);
		}
function unHideAddNewProductLink()
{
	aAddProduct.setAttribute("style","visibility:visible");
}
function removeFromProductsArray(selectProductIndex)
{
	products.splice(selectProductIndex,1);
	storeProducts(products);
}
function getProductIndex(id)
{
	for(var i=0;i<products.length;i++)
	{
		if(products[i].Id==id)
			return i;
	}
}

function hideAddNewProductLink()
{
	aAddProduct.setAttribute("style","visibility:hidden");
}
function insertBlankLine(targetElement,numberOfBreak)
{
	for(var i=0;i<numberOfBreak;i++)
	{
		var br=document.createElement("BR");
		targetElement.appendChild(br);
	}
}
function createNewProductPanel()
{
	hideAddNewProductLink();
	
	var Label=document.createElement("label");
	Label.innerHTML="Add New Product";
	Label.setAttribute("style","font-weight:bold");
	divAddProduct.appendChild(Label);
	
	insertBlankLine(divAddProduct,2);
	
	var txtProductName=document.createElement("input");
	txtProductName.setAttribute("type","text");
	txtProductName.setAttribute("id","txtProductName");
	txtProductName.setAttribute("placeholder","Enter Product Name");
	divAddProduct.appendChild(txtProductName);

	insertBlankLine(divAddProduct,2);
	
	var txtProductDesc=document.createElement("textarea");
	txtProductDesc.setAttribute("id","txtProductDesc");
	txtProductDesc.setAttribute("rows","3");
	txtProductDesc.setAttribute("placeholder","Enter the Product description")
	divAddProduct.appendChild(txtProductDesc);
	
	insertBlankLine(divAddProduct,2);
	
	var txtProductPrice=document.createElement("input");
	txtProductPrice.setAttribute("type","number");
	txtProductPrice.setAttribute("placeholder","Enter the Product Price");
	txtProductPrice.setAttribute("id","txtProductPrice");
	divAddProduct.appendChild(txtProductPrice);
	
	insertBlankLine(divAddProduct,2);
	
	var txtProductQuantity=document.createElement("input");
	txtProductQuantity.setAttribute("type","number");
	txtProductQuantity.setAttribute("id","txtProductQuantity");
	txtProductQuantity.setAttribute("placeholder","Enter the Product Quantity");
	divAddProduct.appendChild(txtProductQuantity);
	
	insertBlankLine(divAddProduct,2);
	
	var btnAddButton=document.createElement("button");
	
	if(flag==0)
	{
	btnAddButton.innerHTML="Add Product";
	btnAddButton.setAttribute("id","btnAddButton");
	divAddProduct.appendChild(btnAddButton);
	btnAddButton.addEventListener("click",function(event)
	{
		addProductArray();
	});
	}
	else if(flag==1)
	{
		btnAddButton.innerHTML="Update";
		btnAddButton.setAttribute("id","editButton");
		divAddProduct.appendChild(btnAddButton);		
	}
	
	
}