
const SuccessResponse = async (res, message, data, statusCode) => {
    return res.status(statusCode).json({
        success:true, 
        mesasge: message,
        data: data
    }); 
};
module.exports = SuccessResponse;




