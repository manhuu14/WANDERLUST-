const Listing = require("./models/listing");
const {listingSchema, reviewSchema}=require("./schema.js");
const ExpressError=require("./utils/ExpressError.js"); 
const Review= require("./models/review");
module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){ 
        //informationUrl save
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be logged in to create listing"); 
        return res.redirect("/login");
    } 
    next();
} 
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.redirectUrl = req.session.returnTo; // ✅ correct
    }
    next();
};


module.exports.isOwner=async(req,res,next)=>{
    let { id } = req.params; 
         await Listing.findById(id); 
         if(!req.user && listing.owner._id.equals(res.locals.curUser._id)){
            req.flash("error","You are not the owner of the listing"); 
            return res.redirect(`/listings/${id}`);
         } 
         next();
} 
module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    next();
};


module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body); 
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(404,errMsg);
    }else{
        next();
    
}  
}; 

module.exports.isReviewAuthor = async (req,res,next)=>{
    let{id, reviewId} = req.params; 
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.curUser._id)){
        req.flash("error","You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();

}