const models = require('./models');

//예약 확인 -> router.get('/checkreservation')
exports.checkreservationGet=(req,res)=>{
    var sess;
    sess = req.session;
    models.Reservation.findAndCountAll({
        where:{
            name:sess.name
        }
    }).then(function(info){
        if(!info){
            res.render('index',
                {
                    title:'Airport API with Nodejs',
                    name : sess.name
                });
        }
        console.log("나와라 : "+JSON.stringify(info.rows));
        res.render('checkreserv',{
            reservation:info.rows,
            count:info.count,
            name:sess.name
        });

    })
};
exports.checkreservationPost=(req,res)=>{
    var sess;
    sess = req.session;
    console.log("나오나 ? "+req.body.choosedepart);
    console.log("나오나 ? "+req.body.choosearrive);
    models.Reservation.create(
        {
            name:sess.name,
            departInfo:req.body.choosedepart,
            arriveInfo:req.body.choosearrive
        }).then(function(){
        res.render('index',
            {
                title:'Airport API with Nodejs',
                name : sess.name
            });
    })
};
