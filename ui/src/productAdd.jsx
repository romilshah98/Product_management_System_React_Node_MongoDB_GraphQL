/* eslint linebreak-style: ["error","windows"] */
import React from 'react';
import {
  Button, FormGroup,
  ControlLabel, Form,
} from 'react-bootstrap';
import Toast from './Toast.jsx';

export default class ProductAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      toastVisible: false,
      toastMessage: ' ',
      toastType: 'success',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.ProductAdd;
    const product = {
      Name: form.product.value,
      Price: form.price.value.slice(1),
      Category: form.category.value,
      Image: form.image.value,
    };
    const { createProduct } = this.props;
    this.showSuccess('Product Added Successfully');
    createProduct(product);
    // clearing the form for next inout
    form.price.value = '$';
    form.product.value = '';
    form.image.value = '';
  }

  showSuccess(message) {
    this.setState({
      toastVisible: true,
      toastMessage: message,
      toastType: 'success',
    });
  }

  showError(message) {
    this.setState({
      toastVisible: true,
      toastMessage: message,
      toastType: 'danger',
    });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  render() {
    const { toastVisible, toastMessage, toastType } = this.state;
    return (
      <div>
        <Form name="ProductAdd" onSubmit={this.handleSubmit}>
          <div>
            <FormGroup>
              <ControlLabel htmlFor="category">
                Category
              </ControlLabel>
              <select name="category">
                <option value="shirt">Shirts</option>
                <option value="jeans">Jeans</option>
                <option value="jacket">Jackets</option>
                <option value="sweater">Sweaters</option>
                <option value="accessories">Accessories</option>
              </select>
            </FormGroup>
            <FormGroup>
              <ControlLabel htmlFor="price">
                Price Per Unit
              </ControlLabel>
              <input type="text" name="price" />
            </FormGroup>
            <FormGroup>
              <ControlLabel htmlFor="product">
                Product
              </ControlLabel>
              <input type="text" name="product" />
            </FormGroup>
            <FormGroup>
              <ControlLabel htmlFor="image">
                Image
              </ControlLabel>
              <input type="text" name="image" />
            </FormGroup>
          </div>
          <Button bsStyle="primary" type="submit">Add Product</Button>
        </Form>
        <Toast
          showing={toastVisible}
          onDismiss={this.dismissToast}
          bsStyle={toastType}
        >
          {toastMessage}
        </Toast>
      </div>

    );
  }
}
