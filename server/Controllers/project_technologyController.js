const ApiError = require("../Error/ApiError")
const DB = require("../db.js");
class roleController {
    async update(req, res, next) {
        const {ChangeColumn} = req.query;
        const {ChangeValue} = req.query;
        const {ProjectID} = req.query;
        const {TechnologyID} = req.query;
        if ((!TechnologyID && !ProjectID) || !ChangeColumn || !ChangeValue) {
            return next(ApiError.badRequest('need more args'))
        }
        var updateQuery = `UPDATE \"Role_Project\" SET \"${ChangeColumn}\" = '${ChangeValue}' `;
        var updateCond = []
        if (TechnologyID || ProjectID) {
            updateQuery += "WHERE ";
        }
        var i = 0;
        if (TechnologyID) {
            updateCond.push(TechnologyID)
            updateQuery += `\"TechnologyID\" = $${updateCond.length} `;
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
        const {ProjectID} = req.query;
        const {TechnologyID} = req.query;
        if (!ProjectID && !TechnologyID) {
            return next(ApiError.badRequest('need more args'))
        }
        var deleteQuery = "DELETE FROM public.\"Project_Technology\" WHERE "
        var deleteCond = []
        var i = 0
        if (ProjectID) {
            deleteCond.push(ProjectID);
            deleteQuery += `\"ProjectID\" = $${deleteCond.length} `;
            i++
        }
        if (TechnologyID) {
            deleteCond.push(TechnologyID);
            if (i > 0) {
                deleteQuery += "AND ";
            }
            deleteQuery += `\"TechnologyID\" = $${deleteCond.length} `;
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
        const {ProjectID} = req.query;
        const {TechnologyID} = req.query;
        if (!ProjectID || !TechnologyID) {
            return next(ApiError.badRequest('need more args'))
        }
        var selectProject = await DB.query("SELECT * FROM public.\"Project\" WHERE \"ID\" = $1", [ProjectID]);
        if (!selectProject.rowCount) {
            return next(ApiError.badRequest('no ProjectID in Project'))
        }
        var selectTechnology = await DB.query("SELECT * FROM public.\"Technology\" WHERE \"ID\" = $1", [TechnologyID]);
        if (!selectTechnology.rowCount) {
            return next(ApiError.badRequest('no TechnologyID in Technology'))
        }
        var insertQuery = "INSERT INTO public.\"Project_Technology\" (\"ProjectID\", \"TechnologyID\") Values($1, $2)"
        var insertCond = [ProjectID, TechnologyID]
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
        const {OperatorTechnologyID} = req.query;
        const {ProjectID} = req.query;
        const {TechnologyID} = req.query;
        var selectQuery = "SELECT "
        var selectCond = []
        if (Column) {
            selectQuery += `\"${Column}\" FROM public.\"Project_Technology\" `;
        } else {
            selectQuery += "* FROM public.\"Project_Technology\" ";
        }
        if (ProjectID || TechnologyID) {
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
        if (TechnologyID) {
            selectCond.push(TechnologyID);
            if (i > 0) {
                selectQuery += "AND ";
            }
            if (!OperatorTechnologyID) {
                selectQuery += `\"TechnologyID\" = $${selectCond.length} `;
            } else {
                switch (OperatorTechnologyID) {
                    case ">":
                        selectQuery += `\"TechnologyID\" > $${selectCond.length} `;
                        break;
                    case "<":
                        selectQuery += `\"TechnologyID\" < $${selectCond.length} `;
                        break;
                    case "=":
                        selectQuery += `\"TechnologyID\" = $${selectCond.length} `;
                        break;
                    case "!=":
                        selectQuery += `\"TechnologyID\" != $${selectCond.length} `;
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