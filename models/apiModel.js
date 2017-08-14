const conn = require('./db.js')

function getAllItems() {
    let sql = `
    SELECT i.iditems, i.item_name, i.item_cost, i.item_description, (i.item_quantity - COALESCE(SUM(t.transaction_item),0)) as item_quantity
    FROM vending.items i
    LEFT JOIN transactions t ON i.iditems=t.transaction_item
    WHERE i.item_active = 1
    GROUP BY i.iditems;`

    return new Promise(function (resolve, reject){
        conn.query(sql, function (err, results, fields) {
            if (!err) {
                resolve ({ items: results })
            }
            else {
                console.log("getAllItems error", err)
                reject ( err )
            }
        })
})
}

function purchaseItem(item_id,debit_amount){
    return new Promise(function(resolve,reject){
    //Check if item is available
    let action = verifyItemPurchase()
    action.then(postItemPurchase)
    .catch(next)
    

    })
}

function verifyItemPurchase(item_id,money_given){
    return new Promise(function(resolve, reject){
        let sql = `
        SELECT *
        FROM items
        WHERE item_id = ?`
        conn.query(sql,[item_id], function(err, results, fields){
            if(!err){
                if(results[0]){
                    if(results[0].item_cost <= funds){
                        resolve ( {status : 'Success',
                                    item : results[0],
                                    money_given: money_given})
                    } else{
                        reject ( {status: 'Failure',
                                errorMessage: 'Insufficent funds',
                                money_given:money_given,
                                money_required: results[0].item_cost,
                                    item: results[0]
                                    })
                    }
                }else{
                    reject ( {
                        status: 'Failure',
                        errorMesage: ['Item not found']
                    })
                }
            } else {
                reject ({status: 'Failure',
                        errorMesage : [{'dbError':err}]})
            }
        })
    })
    
}
function postItemPurchase(item_obj){
    return new Promise(function(resolve,request){
        let sql = `
        `
    })
}
module.exports = {
    getAllItems: getAllItems
}