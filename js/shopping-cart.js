var productList=[],categoryProductList=[],productsToCheckout=[],listOfCategory=["Books & Audible","Electronics","Household care","Snacks and Beverages","Home Appliances","Mobiles, Computers","Women's Fashion","Men's Fashion","Sports & Fitness"],newProductImage=null,updateProductImage=null;function checkOutAvalibality(t){0==t.length?(document.getElementById("no-products-found-cart").className="text-center show",document.getElementById("products-found-cart").className="container hidden"):(document.getElementById("no-products-found-cart").className="text-center hidden",document.getElementById("products-found-cart").className="container show")}function checkProductAvalibality(t){0==t.length?(document.getElementById("no-products-found").className="show",document.getElementById("product-list-wrapper").className="hidden"):(document.getElementById("no-products-found").className="hidden",document.getElementById("product-list-wrapper").className="show")}function checkProductAvalibality(t){0==t.length?(document.getElementById("no-products-found").className="show",document.getElementById("product-list-wrapper").className="hidden"):(document.getElementById("no-products-found").className="hidden",document.getElementById("product-list-wrapper").className="show")}function addNewProduct(){var t=document.getElementById("new-product-name").value,e=document.getElementById("product-list-category").value,n=document.getElementById("new-product-price").value,a=document.getElementById("new-product-description").value;if(validateString(t)||alert("Kindly enter the product name"),validateString(e)&&"Select any Category"!=e||alert("Kindly select the product category"),validateNumber(n)||alert("Kindly enter the product price"),validateString(newProductImage)||alert("Kindly select the product cover image"),validateString(a)||alert("Kindly enter the product description"),validateString(t)&&validateString(e)&&"Select any Category"!==e&&validateNumber(n)&&validateString(newProductImage)&&validateString(a)){var o={id:generateGuid(),name:t,category:e,price:parseInt(n),coverImage:newProductImage,description:a,date:currentDate()};productList.push(o),changeCateogryCount(),displayTotalProducts();var r=document.createElement("div");r.className="col-md-4 text-center col-sm-6 col-xs-6",r.innerHTML='\n\t\t<div class="thumbnail product-box">\n\t        <img src="'+newProductImage+'" alt="'+t+'" />\n\t        <div class="caption">\n\t            <h3><a>'+t+"</a></h3>\n\t            <p>Price : <strong>&#x20b9; "+n+'</strong> </p>\n\t            <p><a id="add-cart-'+o.id+'" class="btn btn-success" role="button" onclick="addToCart(this.id)">Add To Cart</a> <a id="edit-product-'+o.id+'" class="btn btn-primary" role="button" data-toggle="modal" data-target="#product-detail-model" onclick="showProductInfo(this.id)" >Edit Details</a></p>\n\t        </div>\n\t    </div>',checkProductAvalibality(productList),document.getElementById("product-list-wrapper").appendChild(r),newProductImage=null,document.getElementById("new-product-name").value="",document.getElementById("product-list-category").value="",document.getElementById("new-product-price").value="",document.getElementById("new-product-image").value="",document.getElementById("new-product-description").value="",$("#add-cart-model").modal("toggle")}}function sort(t,e,n){return t.sort(function(t,a){if(t[e]||a[e]){if(t[e]&&!a[e])return-1;if(!t[e]&&a[e])return 1;{const o=t[e].toString().toUpperCase(),r=a[e].toString().toUpperCase();return o<r?0===n?-1:1:o>r?0===n?1:-1:0}}return 0})}function sortBy(t){var e;"low-price"==t?e=productList.sort((t,e)=>Number(t.price)-Number(e.price)):"high-price"==t&&(e=productList.sort((t,e)=>Number(e.price)-Number(t.price))),updateProductList(e)}function updateProductList(t){document.getElementById("product-list-wrapper").innerHTML="",t.forEach(function(t,e){var n=document.createElement("div");n.className="col-md-4 text-center col-sm-6 col-xs-6",n.innerHTML='\n\t\t<div class="thumbnail product-box">\n\t        <img id="image-'+t.id+'" src="'+t.coverImage+'" alt="'+t.name+'" />\n\t        <div class="caption">\n\t            <h3><a>'+t.name+"</a></h3>\n\t            <p>Price : <strong>&#x20b9; "+t.price+'</strong> </p>\n\t            <p><a id="add-cart-'+t.id+'" class="btn btn-success" role="button" onclick="addToCart(this.id)">Add To Cart</a> <a id="edit-product-'+t.id+'" class="btn btn-primary" role="button" data-toggle="modal" data-target="#product-detail-model" onclick="showProductInfo(this.id)" >Edit Details</a></p>\n\t        </div>\n\t    </div>',document.getElementById("product-list-wrapper").appendChild(n)}),checkProductAvalibality(t)}function updateCheckoutCart(t){document.getElementById("checkout-product-list").innerHTML="",t.forEach(function(t,e){var n=document.createElement("tr");n.innerHTML='\n        <td data-th="Product">\n            <div class="row">\n                <div class="col-sm-2 hidden-xs"><img src="'+t.coverImage+'" alt="'+t.name+'" class="img-responsive" /></div>\n                <div class="col-sm-10">\n                    <h4 class="nomargin">'+t.name+"</h4>\n                    <p>"+t.description+'</p>\n                </div>\n            </div>\n        </td>\n        <td data-th="Price">&#x20b9; '+t.price+'</td>\n        <td data-th="Quantity">\n            <input type="number" id="quantity-'+t.id+'" class="form-control text-center" value="1" onchange="calculateSubTotal(this)">\n        </td>\n        <td data-th="Subtotal" class="text-center" >&#x20b9; <span id="each-subtotal-'+t.id+'" >'+t.price+'</span></td>\n        <td class="actions" data-th="">\n        </td>',document.getElementById("checkout-product-list").appendChild(n),setTimeout(function(){calculateOverallTotal()},500)})}function percentCalculation(t,e){var n=parseFloat(t)*parseFloat(e)/100;return parseFloat(n)}function calculateOverallTotal(){var t=0;productsToCheckout.forEach(function(e,n){t+=parseInt(e.price)*(e.quantity?e.quantity:1)});var e=percentCalculation(t,5),n=t+e+70;document.getElementById("overall-cart-subtotal").innerText=t,document.getElementById("overall-cart-tax").innerText=e,document.getElementById("overall-cart-total").innerText=n}function calculateSubTotal(t){var e=t.id.replace("quantity-",""),n=productsToCheckout.filter(function(t,n){return t.id==e})[0].price;productsToCheckout.forEach(function(n,a){n.id==e&&(n.quantity=parseInt(t.value))}),document.getElementById("each-subtotal-"+e).innerText=n*parseInt(t.value),setTimeout(function(){calculateOverallTotal()},500)}function showCheckoutCount(){document.getElementById("checkout-product-count").innerText=productsToCheckout.length}function addToCart(t){document.getElementById(t).className="btn btn-default disabled";var e=t.replace("add-cart-",""),n=productList.filter(function(t,n){return t.id==e});productsToCheckout.push(n[0]),showCheckoutCount(),checkOutAvalibality(productsToCheckout)}function showProductInfo(t){setTimeout(function(){var e=t.replace("edit-product-",""),n=productList.filter(function(t,n){return t.id==e});document.getElementById("edit-product-name").value=n[0].name,document.getElementById("edit-product-category").value=n[0].category,document.getElementById("edit-product-price").value=n[0].price,document.getElementById("edit-product-description").value=n[0].description,document.getElementById("show-product-date-time").innerHTML=n[0].date,document.getElementById("product-list-wrapper").setAttribute("data-product-index",t)})}function updateProduct(){var t=document.getElementById("edit-product-name").value,e=document.getElementById("edit-product-category").value,n=document.getElementById("edit-product-price").value,a=document.getElementById("edit-product-name").value;if(validateString(t)||alert("Kindly enter the product name"),validateString(e)&&"Select any Category"!=e||alert("Kindly select the product category"),validateNumber(n)||alert("Kindly enter the product price"),validateString(a)||alert("Kindly enter the product description"),validateString(t)&&validateString(e)&&"Select any Category"!==e&&validateNumber(n)&&validateString(a)){var o=document.getElementById("product-list-wrapper").getAttribute("data-product-index").replace("edit-product-","");productList.forEach(function(r,c){r.id==o&&(r.name=t,r.category=e,r.price=parseInt(n),r.coverImage=updateProductImage||r.coverImage,r.description=a,r.date=currentDate())}),updateProductImage=null,changeCateogryCount(),updateProductList(productList),$("#product-detail-model").modal("toggle")}}function listAllProducts(){updateProductList(productList)}function sortByCategory(t){var e=listOfCategory[t];updateProductList(categoryProductList=productList.filter(function(t,n){return t.category==e}))}function displayTotalProducts(){document.getElementById("total-product-count").innerText=productList.length}function changeCateogryCount(){var t=0,e={0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0};for(var n in productList.forEach(function(t,n){var a=listOfCategory.indexOf(t.category);e[a]=e[a]+1}),e)document.getElementById("category-count-"+t).innerText=e[n],t++}function currentDate(){var t=new Date;return String(t.getDate()).padStart(2,"0")+"/"+String(t.getMonth()+1).padStart(2,"0")+"/"+t.getFullYear()+" - "+(t.getHours()+":"+t.getMinutes()+":"+t.getSeconds())}function loadCoverImage(t){newProductImage=URL.createObjectURL(t.target.files[0])}function updateCoverImage(t){updateProductImage=URL.createObjectURL(t.target.files[0])}function generateGuid(){var t,e;for(t="",e=0;e<32;e++)8!=e&&12!=e&&16!=e&&20!=e||(t+="-"),t+=Math.floor(16*Math.random()).toString(16).toUpperCase();return t}function validateString(t){return!(!t||0==t.length||"string"!=typeof t)}function validateNumber(t){return!(!(t="string"==typeof t?parseInt(t):t)||"number"!=typeof t)}checkProductAvalibality(productList),$("#checkout-model").on("shown.bs.modal",function(t){checkOutAvalibality(productsToCheckout),updateCheckoutCart(productsToCheckout)});