export function AsyncHandler(requestFn) {
    return (req,res,next)=>{
        Promise.resolve(requestFn(req,res,next)).catch(err=>{
            next(err)
        })
    }
}