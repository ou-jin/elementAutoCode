// 当children存在时将生成折叠侧边栏
//请在/static/icon准备对应url名称的svg格式的图标 
//请在/view/准备对应url名称的页面文件 
export default [
    {
        url: '/descriptPage',
                meta:{
                    requiresAuth:false,
                    title:"项目描述页面"
                }
    },
    {
        url: '/autoForm',
                meta:{
                    requiresAuth:false,
                    title:"表单生成页面"
                }
    },
    
    {
        url: '/autoTable',
                meta:{
                    requiresAuth:false,
                    title:"表格生成页面"
                }
    },
    {
        url: '/testPage',
                meta:{
                    requiresAuth:false,
                    title:"测试页面"
                }
    },
  

    

]


