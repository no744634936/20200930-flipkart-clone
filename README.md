
router.post("/api/cart/addtocart",requireSigin,requireUser,CartController.addItemToCart)

这个路由用postman来传递数据的时候要使用row，选JSON(json/application) 格式
而且json里面的最后一个元素后面不能打逗号。


错误型
{
	"cartItems":[
		{
			"product":"5f7d0e66a60cd50db8904001",
			"quantity":2,
			"price":18000
		}
	],
}


正确型
{
	"cartItems":[
		{
			"product":"5f7d0e66a60cd50db8904001",
			"quantity":2,
			"price":18000
		}
	]
}

---------------------------------------------------
//一个人只有一个cart
// 当用户点击添加到购物车按钮的时候，
// 第一次添加，要新建一个cart记录
// 第二次添加商品要就要将商品添加到原来的cart的记录里面去。
// add to cart　是一个一个往里加商品一次只添加一个。
// 当用回添加了A商品，过后又添加了A产品，那么cart里面的A产品数量要变化
