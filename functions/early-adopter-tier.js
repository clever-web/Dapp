const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = async (event, context) => {
    try {
        const client = new faunadb.Client({
            secret: process.env.FAUNADB_SERVER_SECRET
        });

        const address = event && event.queryStringParameters && event.queryStringParameters.address;

        if (!address) {
            return {
                statusCode: 200,
                body: JSON.stringify({ statusCode: 201, message: 'Created', data: {  } }),
            }
        }

        const isAddressAlreadySignedUp = await client.query(q.Exists(q.Match(q.Index('wallet_address_index'), address)));
        if (isAddressAlreadySignedUp) {
            const document = await client.query(q.Get(q.Match(q.Index("wallet_address_index"), address)));
            return {
                statusCode: 200,
                body: JSON.stringify({ statusCode: 200, message: 'OK', data: document.data  }),
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ statusCode: 200, message: 'OK', data: { walletAddress: '', formTokenBalance: 0, chainId: null, status: null }  }),
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ statusCode: 500, message: 'Server error' }),
        }
    } 
}