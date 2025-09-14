// Error handler middleware
function errorHandler(err, req, res, next) {
    console.error(err.stack); // log error for debugging

    // Set default status code
    const status = err.status || 500;

    // Render an error page (views/error.ejs, error.pug, or plain HTML)
    res.status(status).render("error", {
        status: status,
        message: status === 500 
            ? "Oops! Something went wrong on our side." 
            : err.message,
    });
}

module.exports = errorHandler;
