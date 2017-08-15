const conn = require('./db.js')

function getAllItems() {
    let sql = `
    SELECT i.iditems, i.item_name, i.item_cost, i.item_description, (i.item_quantity - COALESCE(COUNT(t.transaction_item),0)) as item_quantity
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
    let action = verifyItemPurchase(item_id,debit_amount)
    action.then(postItemPurchase)
    .then(resolve)
    .catch(reject)
    })
}

function verifyItemPurchase(purchaseItem,money_given){
    return new Promise(function(resolve, reject){
        let sql = `
        SELECT i.iditems, i.item_name, i.item_cost, i.item_description, (i.item_quantity - COALESCE(COUNT(t.transaction_item),0)) as item_quantity
        FROM vending.items i
        LEFT JOIN transactions t ON i.iditems=t.transaction_item
        WHERE i.item_active = 1 AND i.iditems = ?
        GROUP BY i.iditems`
        conn.query(sql,[purchaseItem], function(err, results, fields){
            if(!err){
                if(results[0] && results[0].item_quantity > 0){
                    if(results[0].item_cost <= money_given){
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
                } else if(results[0]){
                    {
                        reject ({
                        status: 'Failure',
                        errorMessage: ['Insufficent item quantity']
                    })
                    }
                } else{
                    reject ( {
                        status: 'Failure',
                        errorMessage: ['Item not found']
                    })
                }
            } else {
                reject ({status: 'Failure',
                        errorMessage : [{'dbError':err}]})
            }
        })
    })
    
}

function postItemPurchase(item_obj){
    return new Promise(function(resolve,reject){
        let sql = `
        INSERT INTO transactions (transaction_item,transaction_debit)
        VALUES (?,?); 
        `
        conn.query(sql,[item_obj.item.iditems,item_obj.item.item_cost],function(err,results,fields){
            if(!err){
                item_obj.vend_action = 'Dispense product'
                item_obj.money_returned = item_obj.money_given - item_obj.item.item_cost
                item_obj.item.item_quantity -= 1
                resolve (item_obj)
            } else {
                reject( {status:'Failure',
                        errorMessage:['DB Failure'],
                        err: err})
            }
        })
    })
}

module.exports = {
    getAllItems: getAllItems,
    purchaseItem: purchaseItem
}