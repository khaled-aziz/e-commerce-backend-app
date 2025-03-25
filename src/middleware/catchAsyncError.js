// export const catchError = (fn) => {
//     return (req, res, next) => {
//         fn(req, res, next).catch((err) => {
//             next(err)
//         })
//     }
// }
export const catchError = (fn) => {
    return (req, res, next) => {
        const result = fn(req, res, next);
        if (result && typeof result.catch === 'function') {
            result.catch((err) => {
                next(err);
            });
        } else {
            next(new Error('fn did not return a promise'));
        }
    };
};