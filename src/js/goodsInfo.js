require('../css/goodsInfo.less');
require('./goodsCover.js')

function getId(){
    // location.search 获取跳转页面的地址后面连接的 page=3?id=1
    var optionList= location.search.slice(1).split('&');
    // console.log(optionList);  // ["page=3","id=1"]
    var idNum;
    optionList.forEach(function(ele,index){
        // indexOf('id=') 判断字符串中是否存在'id=',无返回-1,有返回对应字符串的索引位
        if(ele.indexOf('id=') !== -1){
            idNum=ele.slice(3);
        }
    });
    return idNum;
}

function getGoodList(){
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/api/goodsList.json',
        success: function(data){
            createGoodsInfo(data)
        }
    })
}
getGoodList();

function createGoodsInfo(data){
    var idNum =getId(),
        dataList =data.list,
        len =dataList.length,
        str ='',
        liStr ='';
        // console.log(dataList);
    for(var i=0;i<len;i++){
        if(dataList[i].id==idNum){
            $('.infor_one_img').html('<img src="'+ dataList[i].imgurl[0] +'">');
            $('.one_name').html(dataList[i].name);
            dataList[i].spectList.sort(findPrice('price'))  //调用findPrice()
            // sort() 对指定一个对象的某一属性排序
            console.log(dataList)
            $('.one_price').html('￥' + dataList[i].spectList[0].price + '-' + dataList[i].spectList[dataList[i].spectList.length-1].price );
            dataList[i].imgurl.forEach(function(ele,index){
                str += '<img src="'+ ele +'">';
            });
            $('.infor_th').append($(str));
            dataList[i].spectList.forEach(function(ele,index){
                // console.log(ele.price)  //相应的规格对应的价格
                liStr += '<li class="buy_spect_li" data-price="'+ ele.price +'">'+ ele.spect +'</li>'
            })
            $('.buy_spect_wrap ul').html($(liStr));
        }
    }   
}
function findPrice(str){
    return function (a,b){
        return a[str] - b[str];
    }
}

function bindEvent(){
    $('.infor_two').on('click',function(){
        $('.buy_wrap').css('display','block');
        $('html').css({height:'100%',overflow:'hidden'});
    })
    $('.buy_gray').on('click',function(){
        $('.buy_wrap').css('display','none');
        $('html').css({height:'100%',overflow:'visible'});        
    })
}
bindEvent();



