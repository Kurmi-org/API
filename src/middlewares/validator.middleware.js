
export const validatorSchema = (schema) =>(req, res, next) => {
    try{
        schema.parse(req.body);
        next();
    }catch(error){
        console.log(error);
        res.status(500).json({error: error.errors.map((err) => err.message)});
    }
}