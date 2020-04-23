/* eslint linebreak-style: ["error","windows"] */
import React from 'react';
import {
  Button, Form,
  FormGroup, ControlLabel,
  Panel,
} from 'react-bootstrap';
import NumInput from './NumInput.jsx';
import TextInput from './TextInput.jsx';
import Toast from './Toast.jsx';

export default class ProductEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      product: [],
      toastVisible: false,
      toastMessage: ' ',
      toastType: 'success',
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { match: { params: { id } } } = this.props;
    if (id !== prevId) {
      this.loadData();
    }
  }

  onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;
    this.setState(prevState => ({
      product: { ...prevState.product, [name]: value },
    }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { product } = this.state;
    const { id, ...changes } = product;
    const variables = { id, changes };
    const query = `mutation productUpdate($id: Int!, $changes: productUpdateInputs!) {  
      productUpdate(id: $id, changes: $changes) {    
        id Name Price Image Category  
      } 
    }`;
    await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    this.showSuccess('Product Updated Successfully');
    this.loadData();
  }

  async loadData() {
    const { match: { params: { id } } } = this.props;
    const query = `query product($id: Int!){
      product (id: $id) {
        id Name Price Image Category
      }
    }`;
    const variables = { id };
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const result = await response.json();
    this.setState({ product: result.data.product });
  }

  showSuccess(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'success',
    });
  }

  showError(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'danger',
    });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  render() {
    const { product: { id } } = this.state;
    const { toastVisible, toastMessage, toastType } = this.state;
    const { product: { Name, Price } } = this.state;
    const { product: { Image, Category } } = this.state;
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title>{`Editing issue: ${id}`}</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <ControlLabel htmlFor="category">
                Category
              </ControlLabel>
              <select name="Category" value={Category} onChange={this.onChange}>
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
              <NumInput name="Price" value={Price} onChange={this.onChange} key={id} />
            </FormGroup>
            <FormGroup>
              <ControlLabel htmlFor="product">
                Product
              </ControlLabel>
              <TextInput name="Name" value={Name} onChange={this.onChange} key={id} />
            </FormGroup>
            <FormGroup>
              <ControlLabel htmlFor="image">
                Image
              </ControlLabel>
              <TextInput name="Image" value={Image} onChange={this.onChange} key={id} />
            </FormGroup>
            <Button bsStyle="primary" type="submit">Submit</Button>
          </Form>
        </Panel.Body>
        <Toast
          showing={toastVisible}
          onDismiss={this.dismissToast}
          bsStyle={toastType}
        >
          {toastMessage}
        </Toast>
      </Panel>
    );
  }
}
