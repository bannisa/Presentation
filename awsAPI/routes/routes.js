import query from '../handler/handler.js'


const routes = [
    {
        method: 'get',
        path: '/inventory',
        handler: async (req,res) => {
            let values = await query("SELECT * FROM INVENTORY;");
            res.status(200).json(values);
        }
    },
    {
        method: 'get',
        path: '/order_item',
        handler: async (req,res) => {
            const values = await query("SELECT * FROM ORDER_ITEM;");
            res.status(200).json(values);
        }
    },
    {
        method: 'get',
        path: '/retail_order',
        handler: async (req,res) => {
            const values = await query("SELECT * FROM RETAIL_ORDER;");
            res.status(200).json(values);
            res.end();
        }
        
    },
    {
        method: 'get',
        path: '/sku_data',
        handler: async (req,res) => {
            const values = await query("SELECT * FROM SKU_DATA;");
            res.status(200).json(values);
            res.end();
        },
        
    },
    {
        method: 'get',
        path: '/warehouse',
        handler: async (req,res) => {
            const values = await query("SELECT * FROM WAREHOUSE;");
            res.status(200).json(values);
            res.end();
        },
    },
    {
        method: 'get',
        path: '/inventory/:warehouseID(\\d+)',
        handler: async (req,res) => {
            const {warehouseID} = req.params;
            let values = await query(`SELECT * FROM INVENTORY WHERE WarehouseID = ${warehouseID} ;`);
            res.status(200).json(values);
        }
    },
    {
        method: 'get',
        path: '/order_item/:orderID(\\d+)',
        handler: async (req,res) => {
            const {orderID} = req.params;
            const values = await query(`SELECT * FROM ORDER_ITEM WHERE OrderNumber = ${orderID};`);
            res.status(200).json(values);
            res.end();
        }
    },
    {
        method: 'get',
        path: '/retail_order/:orderID(\\d+)',
        handler: async (req,res) => {
            const {orderID} = req.params;
            const values = await query(`SELECT * FROM RETAIL_ORDER WHERE OrderNumber = ${orderID};`);
            res.status(200).json(values);
            res.end();
        }
        
    },
    {
        method: 'get',
        path: '/sku_data/:sku(\\d+)',
        handler: async (req,res) => {
            const {sku} = req.params;
            const values = await query(`SELECT * FROM SKU_DATA WHERE SKU = ${sku};`);
            res.status(200).json(values);
            res.end();
        },
        
    },
    {
        method: 'get',
        path: '/warehouse/:id(\\d+)',
        handler: async (req,res) => {
            const {id} = req.params;
            const values = await query(`SELECT * FROM WAREHOUSE WHERE WarehouseID = ${id};`)
            res.status(200).json(values);
            res.end();
        }
    },
    {
        method: 'put',
        path: '/warehouse/:warehouseCity([a-zA-Z]+)/:warehouseState([a-zA-Z][a-zA-Z])/:warehouseMan([a-zA-Z]+)/:sqFeet(\\d+)',
        handler: async (req,res) => {
            const {warehouseCity,warehouseState,warehouseMan,sqFeet} = req.params;

            if(parseInt(sqFeet) > 0) {
                const values = await query(`INSERT INTO WAREHOUSE (WarehouseCity,WarehouseState,Manager,SquareFeet) VALUES ('${warehouseCity}','${warehouseState}','${warehouseMan}','${sqFeet}')`);
                console.log(values);
                res.status(200).json(values);
            }
        }
    },
    {
        method: 'put',
        path: '/inventory/:warehouseID(\\d+)/:SKU(\\d+)/:description([a-zA-Z]+)/:quanity(\\d+)/:quanityOnOrder(\\d+)',
        handler: async (req,res) => {
            const {warehouseID,SKU,description,quanity,quanityOnOrder} = req.params;
            const check = await query(`SELECT WarehouseID FROM WAREHOUSE WHERE WarehouseID = ${warehouseID}`)
            if(check.length > 0) {
                const check = await query(`SELECT SKU FROM SKU_DATA WHERE SKU = '${SKU}'`);
                if(check.length > 0) {
                    let values = await query(`INSERT INTO INVENTORY (WarehouseID,SKU,SKU_Description,QuantityOnHand,QuantityOnOrder) VALUES ('${warehouseID}','${SKU}','${description}','${quanity}','${quanityOnOrder}')`);
                    res.status(200).json(values);
                }
                res.status(404).json({message: "Bad SKU"});
                res.end();
            }
            res.status(404).json({message: "Bad warehouseID"});
            res.end();
        }
    },
    {
        method: 'delete',
        path: '/warehouse/:warehouseID(\\d+)',
        handler: async (req,res) => {
            const {warehouseID} = req.params;
            let results = await query(`SELECT WarehouseID FROM INVENTORY WHERE WarehouseID = '${warehouseID}'`);
            if(results.length > 0) {
                await query(`DELETE FROM INVENTORY WHERE WarehouseID = ${warehouseID}`);
            }
            results = await query(`DELETE FROM WAREHOUSE WHERE WarehouseID = ${warehouseID}`)
            res.status(200).json(results);

            res.end(); 
        }
    }
]

export default routes;