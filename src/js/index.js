require('../css/index.less');
require('jquery');

function getGoodList(){
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/api/goodsList.json',
        success: function(data){
            createList(data)
        },
        error:function(){
            console.log('err')
        }
    })
}
getGoodList();

function createList(data){
    var str='';
    console.log(data)
    data.list.forEach(function(ele,index){
        str +='<a href="http://localhost:8080/goodsInfo.html?id=' + ele.id +'"><div class="goods_item">\
                    <img src="'+ ele.imgurl[0] +'" alt="">\
                    <p class="item_name">\
                        '+ ele.name +'\
                    </p>\
                    <p class="item_price">\
                        '+ ele.spectList[0].price + '\
                    </p>\
                </div></a>';
    })
    $('.tab_content').html(str);
}

