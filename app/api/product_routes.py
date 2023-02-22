from flask import Blueprint, jsonify, render_template, redirect, request
from flask_login import login_required, current_user

from ..models.product import Product, db
from ..forms.product_form import ProductForm


product_routes = Blueprint('products', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@product_routes.route('/', methods=['GET'])
@login_required
def get_all_products():
    products = Product.query.all()
    # print('********GET ALL PINS********')
    return jsonify([product.to_dict() for product in products])

@product_routes.route('/<int:id>')
@login_required
def get_product(id):
    # print('************GET 1 PIN********************')
    product = Product.query.get(id)
    return product.to_dict()


@product_routes.route('/', methods=['POST'])
@login_required
def create_product():
    # print("************CREATE NEW PIN********************")
    form = ProductForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_product = Product(brandId=current_user.get_id(),
                      title = data['title'], detail=data['detail'], url=data['url'], imageUrl=data['imageUrl'], price = data['price'])
        form.populate_obj(new_product)
        # print('*********************CREATED*******************************')
        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400



@product_routes.route('/<int:id>', methods=["PATCH", "PUT"])
@login_required
def edit_product(id):

    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        product = Product.query.get(id)

        for key, value in data.items():
            setattr(product, key, value)
        # print('*********************UPDATED PIN*******************************')
        db.session.commit()
        return product.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@product_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    product = Product.query.get(id)
    db.session.delete(product)
    db.session.commit()
    return "Successfully Deleted Product"
