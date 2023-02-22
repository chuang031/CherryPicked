from flask import Blueprint, jsonify, render_template, redirect, request
from flask_login import login_required, current_user
from app.models.review import Review, db
from app.forms.review_form import ReviewForm

review_routes = Blueprint('reviews', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@review_routes.route('/', methods = ['GET'])
@login_required
def get_all_reviews():
    reviews = Review.query.all()
    return jsonify([review.to_dict() for review in reviews])

@review_routes.route('/<int:id>')
@login_required
def get_review(id):
    review = Review.query.get(id)
    return review.to_dict()

@review_routes.route('/', methods = ['POST'])
@login_required
def create_review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_review = Review(customerId = current_user.get_id(),
                     review = data['review'], stars = data['stars'], imageUrl = data['imageUrl'])
        form.populate_obj(new_review)

        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@review_routes.route('/<int:id>', methods=["PATCH", "PUT"])
@login_required
def edit_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        review = Review.query.get(id)
        for key, value in data.items():
            setattr(review, key, value)
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    db.session.delete(review)
    db.session.commit()
    return "Successfully Deleted Review"                            