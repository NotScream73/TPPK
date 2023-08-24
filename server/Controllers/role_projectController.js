const ApiError = require("../Error/ApiError")
const DB = require("../db.js");
class roleController {
    async update(req, res, next) {
        const {ChangeColumn} = req.query;
        const {ChangeValue} = req.query;
        const {RoleID} = req.query;
        const {ProjectID} = req.query;
        if ((!RoleID && !ProjectID) || !ChangeColumn || !ChangeValue) {
            return next(ApiError.badRequest('need more args'))
        }
        var updateQuery = `UPDATE \"Role_Project\" SET \"${ChangeColumn}\" = '${ChangeValue}' `;
        var updateCond = []
        if (RoleID || ProjectID) {
            updateQuery += "WHERE ";
        }
        var i = 0;
        if (RoleID) {
            updateCond.push(RoleID)
            updateQuery += `\"RoleID\" = $${updateCond.length} `;
            i++
        }
        if (ProjectID){
            updateCond.push(ProjectID);
            if (i > 0) {
                updateQuery += "AND ";
            }
            updateQuery += `\"ProjectID\" = $${updateCond.length} `;
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
        const {RoleID} = req.query;
        const {ProjectID} = req.query;
        if (!RoleID && !ProjectID) {
            return next(ApiError.badRequest('need more args'))
        }
        var deleteQuery = "DELETE FROM public.\"Role_Project\" WHERE "
        var deleteCond = []
        var i = 0
        if (ProjectID) {
            deleteCond.push(ProjectID);
            deleteQuery += `\"ProjectID\" = $${deleteCond.length} `;
            i++
        }
        if (RoleID) {
            deleteCond.push(RoleID);
            if (i > 0) {
                deleteQuery += "AND ";
            }
            deleteQuery += `\"RoleID\" = $${deleteCond.length} `;
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
        const {RoleID} = req.query;
        const {ProjectID} = req.query;
        if (!ProjectID || !RoleID) {
            return next(ApiError.badRequest('need more args'))
        }
        var selectRole = await DB.query("SELECT * FROM public.\"Role\" WHERE \"ID\" = $1", [RoleID]);
        if (!selectRole.rowCount) {
            return next(ApiError.badRequest('no RoleID in Role'))
        }
        var selectProject = await DB.query("SELECT * FROM public.\"Project\" WHERE \"ID\" = $1", [ProjectID]);
        if (!selectProject.rowCount) {
            return next(ApiError.badRequest('no ProjectID in Project'))
        }
        var insertQuery = "INSERT INTO public.\"Role_Project\" (\"RoleID\", \"ProjectID\") Values($1, $2)"
        var insertCond = [RoleID, ProjectID]
        try {
            var result
            if (insertCond.length != 0) {
                result = await DB.query(insertQuery, insertCond);
            } else {
                result = await DB.query(insertQuery);
            }
        } catch (error) {
            return next(ApiError.badRequest('error'))
        }
        res.json(result.rows)
    }

    async get(req, res, next) {
        const {Column} = req.query;
        const {OperatorProjectID} = req.query;
        const {OperatorRoleID} = req.query;
        const {RoleID} = req.query;
        const {ProjectID} = req.query;
        var selectQuery = "SELECT "
        var selectCond = []
        if (Column) {
            selectQuery += `\"${Column}\" FROM public.\"Role_Project\" `;
        } else {
            selectQuery += "* FROM public.\"Role_Project\" ";
        }
        if (ProjectID || RoleID) {
            selectQuery += "WHERE ";
        }
        var i = 0
        if (ProjectID) {
            selectCond.push(ProjectID);
            if (!OperatorProjectID) {
                selectQuery += `\"ProjectID\" = $${selectCond.length} `;
            } else {
                switch (OperatorProjectID) {
                    case ">":
                        selectQuery += `\"ProjectID\" > $${selectCond.length} `;
                        break;
                    case "<":
                        selectQuery += `\"ProjectID\" < $${selectCond.length} `;
                        break;
                    case "=":
                        selectQuery += `\"ProjectID\" = $${selectCond.length} `;
                        break;
                    case "!=":
                        selectQuery += `\"ProjectID\" != $${selectCond.length} `;
                        break;
                    default:
                        break;
                }
            }
            i++
        }
        if (RoleID) {
            selectCond.push(RoleID);
            if (i > 0) {
                selectQuery += "AND ";
            }
            if (!OperatorRoleID) {
                selectQuery += `\"RoleID\" = $${selectCond.length} `;
            } else {
                switch (OperatorRoleID) {
                    case ">":
                        selectQuery += `\"RoleID\" > $${selectCond.length} `;
                        break;
                    case "<":
                        selectQuery += `\"RoleID\" < $${selectCond.length} `;
                        break;
                    case "=":
                        selectQuery += `\"RoleID\" = $${selectCond.length} `;
                        break;
                    case "!=":
                        selectQuery += `\"RoleID\" != $${selectCond.length} `;
                        break;
                    default:
                        break;
                }
            }
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
module.exports = new roleController()