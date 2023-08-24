const ApiError = require("../Error/ApiError")
const DB = require("../db.js")
class usersController {
    async update(req, res, next) {
        const {ChangeColumn} = req.query;
        const {ChangeValue} = req.query;
        const {ID} = req.query;
        const {Name} = req.query;
        const {Email} = req.query;
        const {Password} = req.query;
        if ((!ID && !Name && !Email && !Password) || !ChangeColumn || !ChangeValue) {
            return next(ApiError.badRequest('need more args'))
        }
        var updateQuery = `UPDATE \"Users\" SET \"${ChangeColumn}\" = '${ChangeValue}' `;
        var updateCond = []
        if (ID || Name || Email || Password) {
            updateQuery += "WHERE ";
        }
        var i = 0;
        if (ID) {
            updateCond.push(ID)
            updateQuery += `\"ID\" = $${updateCond.length} `;
            i++
        }
        if (Name){
            updateCond.push(Name);
            if (i > 0) {
                updateQuery += "AND ";
            }
            updateQuery += `\"Name\" = $${updateCond.length} `;
            i++
        }
        if (Email){
            updateCond.push(Email);
            if (i > 0) {
                updateQuery += "AND ";
            }
            updateQuery += `\"Email\" = $${updateCond.length} `;
            i++
        }
        if (Password){
            updateCond.push(Password);
            if (i > 0) {
                updateQuery += "AND ";
            }
            updateQuery += `\"Password\" = $${updateCond.length} `;
            i++
        }
        try {
            var result
            if (updateCond.length != 0) {
                result = await DB.query(updateQuery, updateCond);
            } else {
                result = await DB.query(updateQuery);
            }
        } catch (error) {
            return next(ApiError.badRequest('not found'))
        }
        if (!result.rowCount) {
            return next(ApiError.badRequest('not found'))
        }
        res.json(result.rows)
    }

    async delete(req, res, next) {
        const {ID} = req.query;
        const {Name} = req.query;
        const {Email} = req.query;
        const {Password} = req.query;
        if (!ID && !Name && !Email && !Password) {
            return next(ApiError.badRequest('need more args'))
        }
        var deleteQuery = "DELETE FROM public.\"Users\" WHERE "
        var deleteCond = []
        var i = 0
        if (ID) {
            deleteCond.push(ID);
            deleteQuery += `\"ID\" = $${deleteCond.length} `;
            i++
        }
        if (Name) {
            deleteCond.push(Name);
            if (i > 0) {
                deleteQuery += "AND ";
            }
            deleteQuery += `\"Name\" = $${deleteCond.length} `;
            i++
        }
        if (Email) {
            deleteCond.push(Email);
            if (i > 0) {
                deleteQuery += "AND ";
            }
            deleteQuery += `\"Email\" = $${deleteCond.length} `;
            i++
        }
        if (Password) {
            deleteCond.push(Password);
            if (i > 0) {
                deleteQuery += "AND ";
            }
            deleteQuery += `\"Password\" = $${deleteCond.length} `;
            i++
        }
        deleteQuery += "RETURNING *"
        try {
            var result
            if (deleteCond.length != 0) {
                result = await DB.query(deleteQuery, deleteCond);
            } else {
                result = await DB.query(deleteQuery);
            }
        } catch (error) {
            return next(ApiError.badRequest('not found'))
        }
        if (!result.rowCount) {
            return next(ApiError.badRequest('not found'))
        }
        res.json(result.rows)
    }

    async add(req, res, next) {
        const {Name} = req.query;
        const {Email} = req.query;
        const {Password} = req.query;
        if (!Name || !Email || !Password) {
            return next(ApiError.badRequest('need more args'))
        }
        var selectName = await DB.query("SELECT * FROM public.\"Users\" WHERE \"Name\" = $1", [Name]);
        var selectEmail = await DB.query("SELECT * FROM public.\"Users\" WHERE \"Email\" = $1", [Email]);
        if (selectName.rowCount) {
            return next(ApiError.badRequest('not unique Name'))
        }
        if (selectEmail.rowCount) {
            return next(ApiError.badRequest('not unique Email'))
        }
        var insertQuery = "INSERT INTO public.\"Users\" (\"ID\", \"Name\", \"Email\", \"Password\") Values(nextval('\"UsersID\"'), $1, $2, $3)"
        var insertCond = [Name, Email, Password]
        try {
            var result
            if (insertCond.length != 0) {
                result = await DB.query(insertQuery, insertCond);
            } else {
                result = await DB.query(insertQuery);
            }
        } catch (error) {
            return next(ApiError.badRequest('not unique'))
        }
        res.json(result.rows)
    }

    async get(req, res, next) {
        const {Column} = req.query;
        const {OperatorID} = req.query;
        const {ID} = req.query;
        const {Name} = req.query;
        const {Email} = req.query;
        const {Password} = req.query;
        var selectQuery = "SELECT "
        var selectCond = []
        if (Column) {
            selectQuery += `\"${Column}\" FROM public.\"Users\" `;
        } else {
            selectQuery += "* FROM public.\"Users\" ";
        }
        if (ID || Name || Password || Email) {
            selectQuery += "WHERE ";
        }
        var i = 0
        if (ID) {
            selectCond.push(ID);
            if (!OperatorID) {
                selectQuery += `\"ID\" = $${selectCond.length} `;
            } else {
                switch (OperatorID) {
                    case ">":
                        selectQuery += `\"ID\" > $${selectCond.length} `;
                        break;
                    case "<":
                        selectQuery += `\"ID\" < $${selectCond.length} `;
                        break;
                    case "=":
                        selectQuery += `\"ID\" = $${selectCond.length} `;
                        break;
                    case "!=":
                        selectQuery += `\"ID\" != $${selectCond.length} `;
                        break;
                    default:
                        break;
                }
            }
            i++
        }
        if (Name) {
            selectCond.push(Name);
            if (i > 0) {
                selectQuery += "AND ";
            }
            selectQuery += `\"Name\" = $${selectCond.length} `;
            i++
        }
        if (Email) {
            selectCond.push(Email);
            if (i > 0) {
                selectQuery += "AND ";
            }
            selectQuery += `\"Email\" = $${selectCond.length} `;
            i++
        }
        if (Password) {
            selectCond.push(Password);
            if (i > 0) {
                selectQuery += "AND ";
            }
            selectQuery += `\"Password\" = $${selectCond.length} `;
            i++
        }
        try {
            var result
            if (selectCond.length != 0) {
                result = await DB.query(selectQuery, selectCond);
            } else {
                result = await DB.query(selectQuery);
            }
        } catch (error) {
            return next(ApiError.badRequest('not found'))
        }
        if (!result.rowCount) {
            return next(ApiError.badRequest('not found'))
        }
        res.json(result.rows)
    }
}
module.exports = new usersController()