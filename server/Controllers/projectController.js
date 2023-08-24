const ApiError = require("../Error/ApiError")
const DB = require("../db.js")
class projectController {
    async update(req, res, next) {
        const {ID} = req.query;
        const {Name} = req.query;
        const {BeginDate} = req.query;
        const {EndDate} = req.query;
        const {TechAspectID} = req.query;
        const {TechSpecificationID} = req.query;
        if ((!ID && !Name && !BeginDate && !EndDate && !TechAspectID && !TechSpecificationID) || !ChangeColumn || !ChangeValue) {
            return next(ApiError.badRequest('need more args'))
        }
        var updateQuery = `UPDATE \"Role_Project\" SET \"${ChangeColumn}\" = '${ChangeValue}' `;
        var updateCond = []
        if (ID || Name || BeginDate || EndDate || TechAspectID || TechSpecificationID) {
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
        if (BeginDate){
            updateCond.push(BeginDate);
            if (i > 0) {
                updateQuery += "AND ";
            }
            updateQuery += `\"BeginDate\" = $${updateCond.length} `;
            i++
        }
        if (EndDate){
            updateCond.push(EndDate);
            if (i > 0) {
                updateQuery += "AND ";
            }
            updateQuery += `\"EndDate\" = $${updateCond.length} `;
            i++
        }
        if (TechAspectID){
            updateCond.push(TechAspectID);
            if (i > 0) {
                updateQuery += "AND ";
            }
            updateQuery += `\"TechAspectID\" = $${updateCond.length} `;
            i++
        }
        if (TechSpecificationID){
            updateCond.push(TechSpecificationID);
            if (i > 0) {
                updateQuery += "AND ";
            }
            updateQuery += `\"TechSpecificationID\" = $${updateCond.length} `;
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
        const {BeginDate} = req.query;
        const {EndDate} = req.query;
        const {TechAspectID} = req.query;
        const {TechSpecificationID} = req.query;
        if (!ID && !Name && !BeginDate && !EndDate && !TechAspectID && !TechSpecificationID) {
            return next(ApiError.badRequest('need more args'))
        }
        var deleteQuery = "DELETE FROM public.\"Project\" WHERE "
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
        if (BeginDate) {
            deleteCond.push(BeginDate);
            if (i > 0) {
                deleteQuery += "AND ";
            }
            deleteQuery += `\"BeginDate\" = $${selectCond.length} `;
            i++
        }
        if (EndDate) {
            deleteCond.push(EndDate);
            if (i > 0) {
                deleteQuery += "AND ";
            }
            deleteQuery += `\"EndDate\" = $${selectCond.length} `;
            i++
        }
        if (TechAspectID) {
            deleteCond.push(TechAspectID);
            if (i > 0) {
                deleteQuery += "AND ";
            }
            deleteQuery += `\"TechAspectID\" = $${selectCond.length} `;
            i++
        }
        if (TechSpecificationID) {
            deleteCond.push(TechSpecificationID);
            if (i > 0) {
                deleteQuery += "AND ";
            }
            deleteQuery += `\"TechSpecificationID\" = $${selectCond.length} `;
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
        const {BeginDate} = req.query;
        const {EndDate} = req.query;
        const {TechAspectID} = req.query;
        const {TechSpecificationID} = req.query;
        if (!Name || !BeginDate || !EndDate || !TechAspectID || !TechSpecificationID) {
            return next(ApiError.badRequest('need more args'))
        }
        var selectTechAspect = await DB.query("SELECT * FROM public.\"TechAspect\" WHERE \"ID\" = $1", [TechAspectID]);
        if (!selectTechAspect.rowCount) {
            return next(ApiError.badRequest('no TechAspectID in TechAspect'))
        }
        var selectTechSpecification = await DB.query("SELECT * FROM public.\"TechSpecification\" WHERE \"ID\" = $1", [TechSpecificationID]);
        if (!selectTechSpecification.rowCount) {
            return next(ApiError.badRequest('no TechSpecificationID in TechSpecification'))
        }
        var insertQuery = "INSERT INTO public.\"Project\" (\"ID\", \"Name\", \"BeginDate\", \"EndDate\", \"TechAspectID\", \"TechSpecificationID\") Values(nextval('\"ProjectID\"'), $1, $2, $3, $4, $5)"
        var insertCond = [Name, BeginDate, EndDate, TechAspectID, TechSpecificationID]
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
        const {OperatorID} = req.query;
        const {OperatorBeginDate} = req.query;
        const {OperatorEndDate} = req.query;
        const {ID} = req.query;
        const {Name} = req.query;
        const {BeginDate} = req.query;
        const {EndDate} = req.query;
        const {TechAspectID} = req.query;
        const {TechSpecificationID} = req.query;
        var selectQuery = "SELECT "
        var selectCond = []
        if (Column) {
            selectQuery += `\"${Column}\" FROM public.\"Project\" `;
        } else {
            selectQuery += "* FROM public.\"Project\" ";
        }
        if (Name || BeginDate || EndDate || TechAspectID || TechSpecificationID || ID) {
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
        if (BeginDate) {
            selectCond.push(BeginDate);
            if (i > 0) {
                selectQuery += "AND ";
            }
            if (!OperatorBeginDate) {
                selectQuery += `\"BeginDate\" = $${selectCond.length} `;
            } else {
                switch (OperatorBeginDate) {
                    case ">":
                        selectQuery += `\"BeginDate\" > $${selectCond.length} `;
                        break;
                    case "<":
                        selectQuery += `\"BeginDate\" < $${selectCond.length} `;
                        break;
                    case "=":
                        selectQuery += `\"BeginDate\" = $${selectCond.length} `;
                        break;
                    case "!=":
                        selectQuery += `\"BeginDate\" != $${selectCond.length} `;
                        break;
                    default:
                        break;
                }
            }
            i++
        }
        if (EndDate) {
            selectCond.push(EndDate);
            if (i > 0) {
                selectQuery += "AND ";
            }
            if (!OperatorEndDate) {
                selectQuery += `\"EndDate\" = $${selectCond.length} `;
            } else {
                switch (OperatorBeginDate) {
                    case ">":
                        selectQuery += `\"EndDate\" > $${selectCond.length} `;
                        break;
                    case "<":
                        selectQuery += `\"EndDate\" < $${selectCond.length} `;
                        break;
                    case "=":
                        selectQuery += `\"EndDate\" = $${selectCond.length} `;
                        break;
                    case "!=":
                        selectQuery += `\"EndDate\" != $${selectCond.length} `;
                        break;
                    default:
                        break;
                }
            }
            i++
        }
        if (TechAspectID) {
            selectCond.push(TechAspectID);
            if (i > 0) {
                selectQuery += "AND ";
            }
            selectQuery += `\"TechAspectID\" = $${selectCond.length} `;
            i++
        }
        if (TechSpecificationID) {
            selectCond.push(TechSpecificationID);
            if (i > 0) {
                selectQuery += "AND ";
            }
            selectQuery += `\"TechSpecificationID\" = $${selectCond.length} `;
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
module.exports = new projectController()