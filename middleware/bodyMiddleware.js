const bodyValidate = (joiSchema) => {
    return (req, res, next) => {
        let { value:passingValue,error} = joiSchema(req.body)
        if (error) {
            next(error);
        }else{
            req.body = passingValue
            next()
        }
    }
}

module.exports = bodyValidate
