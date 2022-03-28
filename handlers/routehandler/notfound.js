const handler={};
handler.notfoundhandler=(reqProperty,callback)=>{
    callback(404,{
            message:'this is not found'}
        );
    
};
module.exports=handler;