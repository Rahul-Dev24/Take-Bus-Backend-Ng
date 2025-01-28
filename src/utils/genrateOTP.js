export const generateOtp = () => {
    const firstNum = Math.floor(Math.random() * 9) + 1;
    const remaindNum = Math.floor(Math.random() * 10000).toString().padStart(4, 0);
    return parseInt(firstNum + remaindNum);
}