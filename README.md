{JSON.stringify(createCategoryList(categoriesData.categories))}
JSON.stringify方法可以将数组直接打印到网页上面 

add category这个功能还没有完全搞定，
还不知道如何使用递归添加新的category到redux的store里面去。先留着。

因为modal在很多页面都有被用到，所以我将modal单独抽出来放在ui文件夹里了，
我在category页面 使用了抽出来的modal
但是product页面没有使用抽离的modal，用的就是react-bootstrap原本的modal为了方便比较。


categories
app.js 里的getInitialData 方法触发后，
使用的是categoryReducer.js文件里的categoryReducer方法。
来获取 categories


这一节做了在modal里面显示product数据一览功能。怎么实现的看product.js component
点击记录可以看到该商品详细信息的功能。