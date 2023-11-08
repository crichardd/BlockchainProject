const Lotus = require('lotus-api');
const lotus = new Lotus('http://localhost:1234/rpc/v0', 'token'); 

async function sendToFilecoin(data) {
    const cid = await lotus.client.clientImport(data, {}); 
    const deal = await lotus.client.clientStartDeal({
        Data: { Root: cid },
        Wallet: "<your_wallet_address>",
        Miner: "<miner_address>",
        Price: "<deal_price>",
    });

    return deal;
}
