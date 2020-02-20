const fs = require('fs')

const uid = require('uniqid')

function courseshow()
{
    fs.readFileSync('course.txt',function(err,data)
    {   
        var alldata = data.toString().split('\n');
        for(i=0;i<alldata.length;i++)
        {
            var news = alldata[i].split(',');
            console.log(news);
        }
    })
}

function appendcourse(name)
{
    var tobeapp = '\n'+uid()+','+name;
    fs.appendFile('course.txt',tobeapp,function(err){
        if(err) throw err
        console.log("appended");
    })
}

appendcourse("COA");
appendcourse("Sex Education")