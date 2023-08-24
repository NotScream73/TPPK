const ApiError = require("../Error/ApiError")
const DB = require("../db.js");
class roleController {
    async update(req, res, next) {
        const {ChangeColumn} = req.query;
        const {ChangeValue} = req.query;
        const {WorkerID} = req.query;
        const {TechnologyID} = req.query;
        const {TimeSpended} = req.query;
        if ((!WorkerID && !TechnologyID && !TimeSpended) || !ChangeColumn || !ChangeValue) {
            return next(ApiError.badRequest('need more args'))
        }
        var updateQuery = `UPDATE \"Worker_Technology\" SET \"${ChangeColumn}\" = '${ChangeValue}' `;
        var updateCond = []
        if (WorkerID || TechnologyID || TimeSpended) {
            updateQuery += "WHERE ";
        }
        var i = 0;
        if (WorkerID) {
            updateCond.push(WorkerID)
            updateQuery += `\"WorkerID\" = $${updateCond.length} `;
            i++
        }
        if (TechnologyID){
            updateCond.push(TechnologyID);
            if (i > 0) {
                updateQuery += "AND ";
            }
            updateQuery += `\"TechnologyID\" = $${updateCond.length} `;
            i++
        }
        if (TimeSpended){
            updateCond.push(TimeSpended);
            if (i > 0) {
                updateQuery += "AND ";
            }
            updateQuery += `\"TimeSpended\" = $${updateCond.length} `;
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
        const {WorkerID} = req.query;
        const {TechnologyID} = req.query;
        const {TimeSpended} = req.query;
        if (!WorkerID && !TechnologyID && !TimeSpended) {
            return next(ApiError.badRequest('need more args'))
        }
        var deleteQuery = "DELETE FROM public.\"Worker_Technology\" WHERE "
        var deleteCond = []
        var i = 0
        if (WorkerID) {
            deleteCond.push(WorkerID);
            deleteQuery += `\"WorkerID\" = $${deleteCond.length} `;
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
        if (TimeSpended) {
            deleteCond.push(TimeSpended);
            if (i > 0) {
                deleteQuery += "AND ";
            }
            deleteQuery += `\"TimeSpended\" = $${deleteCond.length} `;
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
        const {WorkerID} = req.query;
        const {TechnologyID} = req.query;
        const {TimeSpended} = req.query;
        if (!TechnologyID || !WorkerID) {
            return next(ApiError.badRequest('need more args'))
        }
        var selectWorker = await DB.query("SELECT * FROM public.\"Worker\" WHERE \"ID\" = $1", [WorkerID]);
        if (!selectWorker.rowCount) {
            return next(ApiError.badRequest('no WorkerID in Worker'))
        }
        var selectTechnology = await DB.query("SELECT * FROM public.\"Technology\" WHERE \"ID\" = $1", [TechnologyID]);
        if (!selectTechnology.rowCount) {
            return next(ApiError.badRequest('no TechnologyID in Technology'))
        }
        var insertQuery = "INSERT INTO public.\"Worker_Technology\" "
        var insertCond
        if (!TimeSpended) {
            insertQuery += "(\"WorkerID\", \"TechnologyID\") Values($1, $2)"
            insertCond = [WorkerID, TechnologyID]
        } else {
            insertQuery += "(\"WorkerID\", \"TechnologyID\", \"TimeSpended\") Values($1, $2, $3)"
            insertCond = [WorkerID, TechnologyID, TimeSpended]
        }
        //try {
            var result
            if (insertCond.length != 0) {
                result = await DB.query(insertQuery, insertCond);
            } else {
                result = await DB.query(insertQuery);
            }
        //} catch (error) {
        //    return next(ApiError.badRequest('error'))
        //}
        res.json(result.rows)
    }

    async get(req, res, next) {
        const {Column} = req.query;
        const {OperatorWorkerID} = req.query;
        const {OperatorTechnologyID} = req.query;
        const {OperatorTimeSpended} = req.query;
        const {WorkerID} = req.query;
        const {TechnologyID} = req.query;
        const {TimeSpended} = req.query;
        var selectQuery = "SELECT "
        var selectCond = []
        if (Column) {
            selectQuery += `\"${Column}\" FROM public.\"Worker_Technology\" `;
        } else {
            selectQuery += "* FROM public.\"Worker_Technology\" ";
        }
        if (WorkerID || TechnologyID) {
            selectQuery += "WHERE ";
        }
        var i = 0
        if (WorkerID) {
            selectCond.push(WorkerID);
            if (!OperatorWorkerID) {
                selectQuery += `\"WorkerID\" = $${selectCond.length} `;
            } else {
                switch (OperatorWorkerID) {
                    case ">":
                        selectQuery += `\"WorkerID\" > $${selectCond.length} `;
                        break;
                    case "<":
                        selectQuery += `\"WorkerID\" < $${selectCond.length} `;
                        break;
                    case "=":
                        selectQuery += `\"WorkerID\" = $${selectCond.length} `;
                        break;
                    case "!=":
                        selectQuery += `\"WorkerID\" != $${selectCond.length} `;
                        break;
                    default:
                        break;
                }
            }
            i++
        }
        if (TimeSpended) {
            selectCond.push(TimeSpended);
            if (i > 0) {
                selectQuery += "AND ";
            }
            if (!OperatorTimeSpended) {
                selectQuery += `\"TimeSpended\" = $${selectCond.length} `;
            } else {
                switch (OperatorTimeSpended) {
                    case ">":
                        selectQuery += `\"TimeSpended\" > $${selectCond.length} `;
                        break;
                    case "<":
                        selectQuery += `\"TimeSpended\" < $${selectCond.length} `;
                        break;
                    case "=":
                        selectQuery += `\"TimeSpended\" = $${selectCond.length} `;
                        break;
                    case "!=":
                        selectQuery += `\"TimeSpended\" != $${selectCond.length} `;
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