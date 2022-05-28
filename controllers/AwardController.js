const { Award } = require('../models')
const { getPagination, getPagingData } = require('../helpers/pagination')
const { Op } = require("sequelize");

class AwardController {
  static async getAll(req, res, next) {
    const { page, size, poinFrom, poinTo, type } = req.query;
    const { limit, offset } = getPagination(page, size);
    let condition = {};
    if (poinFrom && poinTo) condition.poin = {[Op.between]: [poinFrom, poinTo]}
    
    let filterType = type ? type.split(',') : null

    if (filterType) condition.type = filterType

    try {
      const awards = await Award.findAndCountAll({
        limit,
        offset,
        where: condition
      });

      if (awards.count < 1) {
        res.status(404).json({ status: true, data: 'No Awards Found' })
      } else {
        const response = getPagingData(awards, page, limit);
        res.status(200).json({ status: true, data: response })
      }
    } catch (err) {
      next(err)
    }
  }

}

module.exports = AwardController