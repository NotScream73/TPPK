const ApiError = require("../Error/ApiError")
const DB = require("../db.js")
class workerController {
    async update(req, res, next) {
        const {ChangeColumn} = req.query;
        const {ChangeValue} = req.query;
        const {ID} = req.query;
        const {Name} = req.query;
        const {AllWorkExp} = req.query;
        const {Email} = req.query;
        const {MainTechID} = req.query;
        const {MainRoleID} = req.query;
        const {ProjectID} = req.query;
        const {RoleInProjectID} = req.query;
        if ((!ID && !Name && !AllWorkExp && !Email && !MainTechID && !MainRoleID && !ProjectID && !RoleInProjectID) || !ChangeColumn || !ChangeValue) {
            return next(ApiError.badRequest('need more args'))
        }
        var updateQuery = `UPDATE \"Worker\" SET \"${ChangeColumn}\" = '${ChangeValue}' `;
        var updateCond = []
        if (ID || Name || AllWorkExp || Email || MainTechID || MainRoleID || ProjectID || RoleInProjectID) {
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
        if (AllWorkExp){
            updateCond.push(Email);
            if (i > 0) {
                updateQuery += "AND ";
            }
            updateQuery += `\"Email\" = $${updateCond.length} `;
            i++
        }
        if (Email){
            updateCond.push(Password);
            if (i > 0) {
                updateQuery += "AND ";
            }
            updateQuery += `\"Password\" = $${updateCond.length} `;
            i++
        }
        if (MainTechID){
            updateCond.push(MainTechID);
            if (i > 0) {
                updateQuery += "AND ";
            }
            updateQuery += `\"MainTechID\" = $${updateCond.length} `;
            i++
        }
        if (MainRoleID){
            updateCond.push(MainRoleID);
            if (i > 0) {
                updateQuery += "AND ";
            }
            updateQuery += `\"MainRoleID\" = $${updateCond.length} `;
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
        if (RoleInProjectID){
            updateCond.push(RoleInProjectID);
            if (i > 0) {
                updateQuery += "AND ";
            }
            updateQuery += `\"RoleInProjectID\" = $${updateCond.length} `;
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
        const {AllWorkExp} = req.query;
        const {Email} = req.query;
        const {MainTechID} = req.query;
        const {MainRoleID} = req.query;
        const {ProjectID} = req.query;
        const {RoleInProjectID} = req.query;
        if (!ID && !Name && !AllWorkExp && !Email && !MainTechID && !MainRoleID && !ProjectID && !RoleInProjectID) {
            return next(ApiError.badRequest('need more args'))
        }
        var deleteQuery = "DELETE FROM public.\"Worker\" WHERE "
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
        if (AllWorkExp) {
            deleteCond.push(AllWorkExp);
            if (i > 0) {
                deleteQuery += "AND ";
            }
            deleteQuery += `\"AllWorkExp\" = $${selectCond.length} `;
            i++
        }
        if (Email) {
            deleteCond.push(Email);
            if (i > 0) {
                deleteQuery += "AND ";
            }
            deleteQuery += `\"Email\" = $${selectCond.length} `;
            i++
        }
        if (MainTechID) {
            deleteCond.push(MainTechID);
            if (i > 0) {
                deleteQuery += "AND ";
            }
            deleteQuery += `\"MainTechID\" = $${selectCond.length} `;
            i++
        }
        if (MainRoleID) {
            deleteCond.push(MainRoleID);
            if (i > 0) {
                deleteQuery += "AND ";
            }
            deleteQuery += `\"MainRoleID\" = $${selectCond.length} `;
            i++
        }
        if (ProjectID) {
            deleteCond.push(ProjectID);
            if (i > 0) {
                deleteQuery += "AND ";
            }
            deleteQuery += `\"ProjectID\" = $${selectCond.length} `;
            i++
        }
        if (RoleInProjectID) {
            deleteCond.push(RoleInProjectID);
            if (i > 0) {
                deleteQuery += "AND ";
            }
            deleteQuery += `\"RoleInProjectID\" = $${selectCond.length} `;
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
        const {AllWorkExp} = req.query;
        const {Email} = req.query;
        const {MainTechID} = req.query;
        const {MainRoleID} = req.query;
        const {ProjectID} = req.query;
        const {RoleInProjectID} = req.query;
        if (!Name || !AllWorkExp || !Email || !MainTechID || !MainRoleID) {
            return next(ApiError.badRequest('need more args'))
        }
        var selectTechnology = await DB.query("SELECT * FROM public.\"Technology\" WHERE \"ID\" = $1", [MainTechID]);
        if (!selectTechnology.rowCount) {
            return next(ApiError.badRequest('no MainTechID in Technology'))
        }
        var selectRole = await DB.query("SELECT * FROM public.\"Role\" WHERE \"ID\" = $1", [MainRoleID]);
        if (!selectRole.rowCount) {
            return next(ApiError.badRequest('no MainRoleID in Role'))
        }
        var selectProject;
        var selectRoleInProject;
        if (ProjectID) {
            selectProject = await DB.query("SELECT * FROM public.\"Project\" WHERE \"ID\" = $1", [ProjectID]);
            if (!selectProject.rowCount) {
                return next(ApiError.badRequest('no ProjectID in Project'))
            }
        }
        if (RoleInProjectID) {
            selectRoleInProject = await DB.query("SELECT * FROM public.\"Role\" WHERE \"ID\" = $1", [RoleInProjectID]);
            if (!selectRoleInProject.rowCount) {
                return next(ApiError.badRequest('no RoleInProjectID in Role'))
            }
        }
        
        var insertQuery = "INSERT INTO public.\"Worker\" (\"ID\", \"Name\", \"AllWorkExp\", \"Email\", \"MainTechID\", \"MainRoleID\", \"ProjectID\", \"RoleInProjectID\") Values(nextval('\"ProjectID\"'), $1, $2, $3, $4, $5, $6, $7)"
        var insertCond = [Name, AllWorkExp, Email, MainTechID, MainRoleID, ProjectID, RoleInProjectID]
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
    
    async getRoles(req, res, next) {
        const {Email} = req.query;
        var selectQuery = 'SELECT "Role"."Name" FROM public."Worker", public."Role" WHERE "Worker"."Email" = $1 AND "Role"."ID" = "Worker"."MainRoleID"'
        var selectCond = [Email]
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

    async get(req, res, next) {
        const {Column} = req.query;
        const {OperatorID} = req.query;
        const {OperatorAllWorkExp} = req.query;
        const {OperatorMainTechID} = req.query;
        const {OperatorMainRoleID} = req.query;
        const {OperatorProjectID} = req.query;
        const {OperatorRoleInProjectID} = req.query;
        const {ID} = req.query;
        const {Name} = req.query;
        const {AllWorkExp} = req.query;
        const {Email} = req.query;
        const {MainTechID} = req.query;
        const {MainRoleID} = req.query;
        const {ProjectID} = req.query;
        const {RoleInProjectID} = req.query;
        var selectQuery = "SELECT "
        var selectCond = []
        if (Column) {
            selectQuery += `\"${Column}\" FROM public.\"Worker\" `;
        } else {
            selectQuery += "* FROM public.\"Worker\" ";
        }
        if (ID || Name || AllWorkExp || Email || MainTechID || MainRoleID || ProjectID || RoleInProjectID) {
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
        if (AllWorkExp) {
            selectCond.push(AllWorkExp);
            if (i > 0) {
                selectQuery += "AND ";
            }
            if (!OperatorAllWorkExp) {
                selectQuery += `\"AllWorkExp\" = $${selectCond.length} `;
            } else {
                switch (OperatorAllWorkExp) {
                    case ">":
                        selectQuery += `\"AllWorkExp\" > $${selectCond.length} `;
                        break;
                    case "<":
                        selectQuery += `\"AllWorkExp\" < $${selectCond.length} `;
                        break;
                    case "=":
                        selectQuery += `\"AllWorkExp\" = $${selectCond.length} `;
                        break;
                    case "!=":
                        selectQuery += `\"AllWorkExp\" != $${selectCond.length} `;
                        break;
                    default:
                        break;
                }
            }
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
        if (MainTechID) {
            selectCond.push(MainTechID);
            if (i > 0) {
                selectQuery += "AND ";
            }
            if (!OperatorMainTechID) {
                selectQuery += `\"MainTechID\" = $${selectCond.length} `;
            } else {
                switch (OperatorMainTechID) {
                    case ">":
                        selectQuery += `\"MainTechID\" > $${selectCond.length} `;
                        break;
                    case "<":
                        selectQuery += `\"MainTechID\" < $${selectCond.length} `;
                        break;
                    case "=":
                        selectQuery += `\"MainTechID\" = $${selectCond.length} `;
                        break;
                    case "!=":
                        selectQuery += `\"MainTechID\" != $${selectCond.length} `;
                        break;
                    default:
                        break;
                }
            }
            i++
        }
        if (MainRoleID) {
            selectCond.push(MainRoleID);
            if (i > 0) {
                selectQuery += "AND ";
            }
            if (!OperatorMainRoleID) {
                selectQuery += `\"MainRoleID\" = $${selectCond.length} `;
            } else {
                switch (OperatorMainRoleID) {
                    case ">":
                        selectQuery += `\"MainRoleID\" > $${selectCond.length} `;
                        break;
                    case "<":
                        selectQuery += `\"MainRoleID\" < $${selectCond.length} `;
                        break;
                    case "=":
                        selectQuery += `\"MainRoleID\" = $${selectCond.length} `;
                        break;
                    case "!=":
                        selectQuery += `\"MainRoleID\" != $${selectCond.length} `;
                        break;
                    default:
                        break;
                }
            }
            i++
        }
        if (ProjectID) {
            if (i > 0) {
                selectQuery += "AND ";
            }
            if (ProjectID == "null") {
                if (!OperatorProjectID) { 
                    selectQuery += `\"ProjectID\" IS NULL `;
                    console.log(selectQuery)
                    console.log(selectCond)
                } else {
                    switch (OperatorProjectID) { 
                        case "=":
                            selectQuery += `\"ProjectID\" IS NULL `;
                            break;
                        case "!=":
                            selectQuery += `\"ProjectID\" IS NOT NULL `;
                            break;
                        default:
                            break;
                    }
                }
            } else {
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
            }
            i++
        }
        if (RoleInProjectID) {
            if (i > 0) {
                selectQuery += "AND ";
            }
            if (RoleInProjectID == "null") {
                if (!OperatorRoleInProjectID) { 
                    selectQuery += `\"RoleInProjectID\" IS NULL `;
                    console.log(selectQuery)
                    console.log(selectCond)
                } else {
                    switch (OperatorRoleInProjectID) { 
                        case "=":
                            selectQuery += `\"RoleInProjectID\" IS NULL `;
                            break;
                        case "!=":
                            selectQuery += `\"RoleInProjectID\" IS NOT NULL `;
                            break;
                        default:
                            break;
                    }
                }
            } else {
                selectCond.push(RoleInProjectID);
                if (!OperatorRoleInProjectID) {
                    selectQuery += `\"RoleInProjectID\" = $${selectCond.length} `;
                } else {
                    switch (OperatorRoleInProjectID) {
                        case ">":
                            selectQuery += `\"RoleInProjectID\" > $${selectCond.length} `;
                            break;
                        case "<":
                            selectQuery += `\"RoleInProjectID\" < $${selectCond.length} `;
                            break;
                        case "=":
                            selectQuery += `\"RoleInProjectID\" = $${selectCond.length} `;
                            break;
                        case "!=":
                            selectQuery += `\"RoleInProjectID\" != $${selectCond.length} `;
                            break;
                        default:
                            break;
                    }
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
module.exports = new workerController()