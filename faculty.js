const uid = require('uniqid')

const fs = require('fs')

function checkloginfac(usr,pwd)
{
    return new Promise((resolve,reject)=>{

        fs.readFile('faculty.txt',function(err,data){
            var alldata = data.toString().split('\n');
            for(i=0;i<alldata.length;i++)
            {
                var newarr = alldata[i].split(',');
                console.log(newarr)
                newarr[3] = newarr[3].replace('\r','');
                if(newarr[2]==usr && newarr[3]==pwd)
                {
                    console.log('Validated');
                    resolve();
                }
            }
            reject();
        })
    });
}

function facultyadd(name,usr,pwd)
{
    checkloginfac(usr,pwd).then(()=>
    {
        console.log("already Regitserted");
    }).catch(()=>
    {
        var tobeapp = '\n'+uid()+','+name+','+usr+','+pwd;
        fs.appendFile('faculty.txt',tobeapp,function(err)
        {
            if(err) throw err
            console.log("appended faculty");
        })
    })   
}


function courseShow()
{
    return new Promise((resolve,reject)=>{
        fs.readFile('course.txt',(err,data)=>{
            var alldata = data.toString().split('\n');
            var courses=[]
            var ids=[];
            for(i=0;i<alldata.length;i++)
            {
                var newarr = alldata[i].split(',');
                courses.push(newarr[1].replace('\r',''));
                ids.push(newarr[0]);
            }
            var obj={courses,ids}
            resolve(obj);
        })
    })
}



module.exports = {checkloginfac,facultyadd,courseShow}