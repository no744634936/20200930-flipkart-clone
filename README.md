npx create-react-app flipkart-clone

cd flipkart-clone

npm install --save react-router-dom redux react-redux redux-thunk axios redux-devtools-extension
-------------------------------------------------------------------------------


cd backend
npm run both 


cd flipkart-clone
npm start
http://localhost:5501/


---------------------------------------------------

Access to XMLHttpRequest at 'http://localhost:3000/api/admin/signin' from origin 'http://localhost:5500' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.


解决 这个错误需要在backend 文件夹里面 $ npm install @koa/cors --save 并在app.js里面使用






