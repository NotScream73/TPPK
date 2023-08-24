const ApiError = require("../Error/ApiError")
const DB = require("../db.js")
class technologyController {
    async update(req, res, next) {
        const {ChangeColumn} = req.query;
        const {ChangeValue} = req.query;
        const {ID} = req.query;
        const {Name} = req.query;
        if ((!ID && !Name) || !ChangeColumn || !ChangeValue) {
            return next(ApiError.badRequest('need more args'))
        }
        var updateQuery = `UPDATE \"Technology\" SET \"${ChangeColumn}\" = '${ChangeValue}' `;
        var updateCond = []
        if (ID || Name) {
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
        if (!ID && !Name) {
            return next(ApiError.badRequest('need more args'))
        }
        var selectRefs1 = await DB.query("SELECT * FROM \"Project_Technology\" WHERE \"TechnologyID\" = $1", [ID])
        var selectRefs2 = await DB.query("SELECT * FROM \"Worker\" WHERE \"MainTechID\" = $1", [ID])
        var selectRefs3 = await DB.query("SELECT * FROM \"Worker_Technology\" WHERE \"TechnologyID\" = $1", [ID])
        if (selectRefs1.rowCount) {
            return next(ApiError.badRequest('exist Project_Technology refs for ID'))
        } else if (selectRefs2.rowCount) {
            return next(ApiError.badRequest('exist Worker refs for ID'))
        } else if (selectRefs3.rowCount) {
            return next(ApiError.badRequest('exist Worker_Technology refs for ID'))
        }
        var deleteQuery = "DELETE FROM public.\"Technology\" WHERE "
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
        if (!Name) {
            return next(ApiError.badRequest('need more args'))
        }
        var insertQuery = "INSERT INTO public.\"Technology\" (\"ID\", \"Name\") Values(nextval('\"TechnologyID\"'), $1)"
        var insertCond = [Name]
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
        var selectQuery = "SELECT "
        var selectCond = []
        if (Column) {
            selectQuery += `\"${Column}\" FROM public.\"Technology\" `;
        } else {
            selectQuery += "* FROM public.\"Technology\" ";
        }
        if (ID || Name) {
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
module.exports = new technologyController()