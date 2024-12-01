// import paginateServices from "../services/paginateServices";
// const getPaginate = async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const pageSize = parseInt(req.query.pageSize) || 10;
//   try {
//     const data = await paginateServices.getPaginate(page, pageSize);
//     if (data) {
//       return res.status(200).json({
//         errCode: 0,
//         message: "Get Paginate is the success",
//       });
//     } else {
//       return res.status(400).json({
//         errCode: 1,
//         message: "Get Paginate is the fails",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       errCode: -1,
//       message: "Server error, Get Paginate is the fails",
//     });
//   }
// };

// module.exports = {
//   getPaginate,
// };
