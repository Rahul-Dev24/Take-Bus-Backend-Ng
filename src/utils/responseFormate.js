
export const response = (success, message, data, totalrecords) => {
    return {
        success,
        message,
        data,
        totalrecords: totalrecords || 0
    }
}