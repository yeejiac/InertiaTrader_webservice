var serialNum = 1

function generateMsg(side, price, volumn)
{
    return "88|" + serialNum + "|" + price + "|" + volumn + "|1|KKC|&"
}

// function parseMsg()
// {

// }

module.exports = new generateMsg();