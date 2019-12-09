// entry point : app.js inside the src folder
// output: the final bundle: where we put it : inside the public folder of this proyect

// We require path module to use join method
const path = require("path");


module.exports = {
    entry: "./src/app.js",
    output: {
        // joining absolute path to our proyect with the local path of public folder
        path: path.join(__dirname, "public"), 
        filename: "bundle.js"
    },
    // We set up the loader
    module: {
        rules: [{
            loader: "babel-loader",
            // What file do we want to run this loader, in all the .js files
            test: /\.js$/,
            // Exclude the entire node_modules folder, we dont want to run babel for that folder.
            exclude: /node_modules/
        },{
            // Target all file that end in .css
            test: /\.s?css$/, // questio mark is for support css and scss files
            // We use "use" because we want to an array of loaders . this three:
            // css-loader: This its going to allow webpack to load in our css assets , take css and convert it into a js representation
            // style-loader: it takes that css thats in javascript and adds it to the DOM by inserting a style tag
            // sass-loader: behind the scenes sass-loader its going to use node-sass to convert the file into regular css
            use: [
                "style-loader",
                "css-loader",
                "sass-loader"
            ]
        }]
    },
    devtool: "cheap-module-eval-source-map",
    devServer: {
        contentBase: path.join(__dirname, "public")
    }
};