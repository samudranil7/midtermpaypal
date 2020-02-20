const fs = require('fs')

function addtofile(cid,sid,fid)
{
    fs.readFile('csst.txt',function(err,data){
        var alldata = data.toString().split('\n');
        var check = false;
        for(i=0;i<alldata.length;i++)
        {
            var linedata = alldata[i].split(',');
            if(linedata[0]==cid && linedata[1]==sid)
            {
                check = true;
                console.log("Already Registered");
            }
        }
        if(!check)
        {
            var tobeapp = '\n'+cid+','+sid+','+fid;
            fs.appendFile('csst.txt',tobeapp,function(err)
            {
                if(err) throw err
                console.log("appended student");
            })
        }
    })
}

addtofile(102,1001,10001)